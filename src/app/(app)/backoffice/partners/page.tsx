import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVerifiedUser } from "@/lib/auth";
import { isInternalUser } from "@/lib/internalAccounts";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMissingSchemaError } from "@/lib/dbErrors";
import { PARTNER_CODES } from "@/lib/campaigns";
import {
  summarizePartnerSignups,
  type PartnerAccountRow,
  type PartnerWaitlistRow,
} from "@/lib/partnerSignups";

// Back office: who each partner has actually sent us. Until now the answer
// lived only in the Supabase SQL editor (docs/REFERRALS.md lists the five
// service-role views), which means the two people who need it have to open the
// database to answer a question about a business arrangement.
//
// NOT ADVERTISED, AND NOT A PRODUCT SURFACE. No nav links here, no sitemap
// entry, robots index:false, and a signed-in account that is not an OakTend
// team account gets a 404 - not a redirect and not "you don't have access",
// because either of those confirms the page exists. There is deliberately no
// admin area in the app; this is one page behind one gate, and it should stay
// the smallest thing that answers the question.
//
// THE GATE IS THE WHOLE SECURITY STORY. Everything below it reads through the
// ADMIN client, which is service_role and bypasses RLS - public.partner_signups
// is other people's names and email addresses, and public.pro_waitlist is a
// list of contractors' email addresses. So the gate runs FIRST and the admin
// client is not even constructed until it has passed.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partner signups",
  // Nothing links here and it 404s for almost everyone, but a crawler that
  // guesses the path while a team session is open should still not index it.
  robots: { index: false, follow: false },
};

// FIXED locale and zone, not the server's. A date on this page gets quoted in
// a partner conversation, so "Sep 16" has to mean the same day whichever
// machine rendered it - a serverless region change must not move a sign-up
// into a different day. OakTend runs on Pacific time (src/lib/localTime.ts
// uses the same zone as its fallback).
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDate(at: string | null): string {
  if (!at) return "-";
  const parsed = new Date(at);
  return Number.isNaN(parsed.getTime()) ? "-" : DATE_FORMAT.format(parsed);
}

export default async function BackofficePartnersPage() {
  // getVerifiedUser, not getUser: this is an access decision, so the session
  // is re-verified against the auth server rather than read off the cookie.
  const user = await getVerifiedUser();
  if (!user || !(await isInternalUser(user.id))) notFound();

  // Only now. See the comment at the top of the file.
  const admin = createAdminClient();

  // `(admin as any)` because neither the view nor the table is in
  // src/lib/database.types.ts - the same cast src/app/pros/actions.ts uses.
  //
  // public.partner_signups (migration 0169) is service-role only, and already
  // one row per attributed ACCOUNT. The order is re-stated rather than trusted
  // to the view's own ORDER BY, which PostgREST is free to ignore.
  const { data: accountRows, error: accountsError } = await (admin as any)
    .from("partner_signups")
    .select("partner, full_name, email, signed_up")
    .order("signed_up", { ascending: false });

  if (accountsError) {
    console.error("backoffice/partners: partner_signups read failed", accountsError);
  }

  // The pro waitlist's half of the same question (migration 0171): contractors
  // who followed a partner link while the pro side was closed and could not
  // create an account at all. Tolerant of the column not being there yet -
  // 0171 is pasted by hand, and until it is this half is simply empty.
  const { data: waitlistRows, error: waitlistError } = await (admin as any)
    .from("pro_waitlist")
    .select("email, created_at, campaign_code")
    .not("campaign_code", "is", null)
    .order("created_at", { ascending: false });

  if (waitlistError && !isMissingSchemaError(waitlistError)) {
    console.error("backoffice/partners: pro_waitlist read failed", waitlistError);
  }
  const waitlist: PartnerWaitlistRow[] =
    waitlistError || !waitlistRows ? [] : (waitlistRows as PartnerWaitlistRow[]);

  const partners = Object.entries(PARTNER_CODES).map(([code, link]) => ({
    code,
    label: link.label,
  }));
  const summaries = summarizePartnerSignups(
    partners,
    (accountRows ?? []) as PartnerAccountRow[],
    waitlist
  );
  const withRows = summaries.filter((s) => s.entries.length > 0);

  return (
    <div className="space-y-8">
      <p className="text-sm">
        <Link
          href="/dashboard"
          className="text-stone-500 hover:text-bark-700 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:text-base dark:text-stone-400 dark:hover:text-stone-300"
        >
          &lt; Home
        </Link>
      </p>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Partner signups
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Accounts and pro waitlist emails by partner code. OakTend team only.
        </p>
      </header>

      {/* Every partner, including the ones at zero - "nobody yet" is an answer
          a summary built from rows alone cannot give. Waitlist emails are
          counted in their own column and never added to accounts: a lead and
          a sign-up are not the same number. */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-stone-500 dark:text-stone-400">
              <th className="pb-2 pr-3 font-medium">Partner</th>
              <th className="pb-2 pr-3 text-right font-medium">Accounts</th>
              <th className="pb-2 pr-3 text-right font-medium">Pro waitlist</th>
              <th className="pb-2 text-right font-medium">Last signup</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-white/10">
            {summaries.map((s) => (
              <tr key={s.code}>
                <td className="py-2 pr-3">
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {s.label ?? "Not a partner code"}
                  </span>{" "}
                  <span className="text-stone-500 dark:text-stone-400">
                    {s.code}
                  </span>
                </td>
                <td className="py-2 pr-3 text-right text-stone-600 dark:text-stone-300">
                  {s.accounts}
                </td>
                <td className="py-2 pr-3 text-right text-stone-600 dark:text-stone-300">
                  {s.waitlist}
                </td>
                <td className="py-2 text-right text-stone-600 dark:text-stone-300">
                  {formatDate(s.lastSignup)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {withRows.length === 0 && (
        <p className="text-sm text-stone-500 dark:text-stone-400">
          No signups through a partner link yet.
        </p>
      )}

      {withRows.map((s) => (
        <section key={s.code} className="space-y-3">
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {s.label ?? "Not a partner code"}{" "}
            <span className="font-normal text-stone-500 dark:text-stone-400">
              {s.code}
            </span>
          </h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-stone-500 dark:text-stone-400">
                  <th className="pb-2 pr-3 font-medium">Name</th>
                  <th className="pb-2 pr-3 font-medium">Email</th>
                  <th className="pb-2 text-right font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-white/10">
                {s.entries.map((entry, i) => (
                  <tr key={`${entry.email ?? "no-email"}-${i}`}>
                    <td className="py-2 pr-3 text-stone-900 dark:text-stone-100">
                      {entry.name ?? "-"}
                      {/* A waitlist row is a contractor who never got to make
                          an account, so it is marked rather than mixed in. */}
                      {entry.waitlist && (
                        <span className="chip-muted ml-2">waitlist</span>
                      )}
                    </td>
                    <td className="py-2 pr-3 text-stone-600 dark:text-stone-300">
                      {entry.email ?? "-"}
                    </td>
                    <td className="py-2 text-right text-stone-600 dark:text-stone-300">
                      {formatDate(entry.at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
