import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { safeNextPath } from "@/lib/safeNext";
import { isInviteToken } from "@/lib/pendingJoin";
import { QR_SCAN_GRACE_SECONDS } from "@/lib/householdQr";
import { formatAddressLine } from "@/lib/addressLine";
import SubmitButton from "@/components/SubmitButton";
import { redeemHouseholdInviteAction } from "@/app/(app)/account/household/actions";

export const metadata: Metadata = {
  title: "Join a home",
  description: "Join a household on OakTend.",
};

// Household QR join page. READ ONLY: rendering this page never creates a
// membership. It shows one of four states and, for a live code, a "Join this
// home" button that posts to redeemHouseholdInviteAction, which re-checks the
// token in the database under the joiner's own session at the moment they
// tap. A reload, a link preview, or a prefetch of this URL can therefore never
// grant access, and a page that says "this code isn't working" stays that way.
//
// Public route (see the middleware), so a signed-out scanner sees the
// sign-in-or-sign-up chooser. The middleware also drops the invite breadcrumb
// cookie (src/lib/pendingJoin.ts) and refreshes a signed-in visitor's session
// before this renders.
export default async function JoinHouseholdPage(props: {
  params: Promise<{ token: string }>;
  searchParams?: Promise<{ failed?: string }>;
}) {
  const [{ token: rawToken }, searchParams] = await Promise.all([
    props.params,
    props.searchParams ?? Promise.resolve(undefined),
  ]);
  const token = rawToken.toLowerCase();
  const failed =
    typeof searchParams?.failed === "string" ? searchParams.failed : null;

  if (!isInviteToken(token)) {
    return <InvalidState />;
  }

  const admin = createAdminClient();

  // Scan grace (migration 0099): the first open of a still-live code gives it
  // 30 minutes from now, once, so a new account has time to finish signing
  // up. A single conditional update: scanned_at must still be null AND the
  // code must still be live, so a repeat open can never re-extend it and an
  // expired code can never be revived. This only moves an expiry time; it
  // grants nothing.
  const nowIso = new Date().toISOString();
  await admin
    .from("household_invite_tokens")
    .update({
      scanned_at: nowIso,
      expires_at: new Date(Date.now() + QR_SCAN_GRACE_SECONDS * 1000).toISOString(),
    })
    .eq("token", token)
    .is("scanned_at", null)
    .gt("expires_at", nowIso);

  // Read-only validity check. Service role because the token table has no
  // client policies at all (migration 0097). What this reads is shown only to
  // someone holding the token, who could join the home with it anyway.
  const { data: invite } = await admin
    .from("household_invite_tokens")
    .select("property_id, created_by, expires_at")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (failed === "home_full") return <InvalidState reason="home_full" />;
  if (failed === "rate_limited") return <InvalidState reason="rate_limited" />;
  if (!invite) return <InvalidState />;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: property }, { data: inviter }] = await Promise.all([
    admin
      .from("properties")
      .select("address_line1, unit, city")
      .eq("id", invite.property_id)
      .maybeSingle(),
    admin
      .from("users")
      .select("full_name")
      .eq("id", invite.created_by)
      .maybeSingle(),
  ]);
  const firstName = inviter?.full_name?.trim().split(/\s+/)[0] || null;
  const homeLine = property
    ? [formatAddressLine(property), property.city].filter(Boolean).join(", ")
    : null;
  const intro = firstName
    ? `${firstName} invited you to share their home on OakTend.`
    : "You've been invited to share a home on OakTend.";

  if (!user) {
    const nextPath = safeNextPath(`/join/household/${token}`);
    const nextQuery = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
    return (
      <Shell>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Join a home
        </h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{intro}</p>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
          Sign in or create a free account first. You&apos;ll come right back
          here to join.
        </p>
        <Link
          href={`/homeowner-signup${nextQuery}`}
          className="btn-primary mt-6 flex w-full"
        >
          Create your account
        </Link>
        <Link
          href={`/signin${nextQuery}`}
          className="btn-secondary mt-3 flex w-full"
        >
          I have an account
        </Link>
      </Shell>
    );
  }

  // Already the owner or an active member: nothing to join. Read under the
  // caller's own session (RLS), so this only ever sees their own rows.
  const [{ data: ownHome }, { data: membership }] = await Promise.all([
    supabase
      .from("properties")
      .select("id")
      .eq("id", invite.property_id)
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("household_members")
      .select("id")
      .eq("property_id", invite.property_id)
      .eq("member_user_id", user.id)
      .eq("status", "active")
      .maybeSingle(),
  ]);

  if (ownHome || membership) {
    return (
      <Shell>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          {ownHome ? "This is your home" : "You're already in"}
        </h1>
        {homeLine && (
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{homeLine}</p>
        )}
        <Link href="/dashboard" className="btn-primary mt-6 flex w-full">
          Go to your home
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
        Join this home?
      </h1>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{intro}</p>
      {homeLine && (
        <p className="mt-3 rounded-lg bg-stone-100 px-3 py-2 text-sm font-medium text-stone-900 dark:bg-white/10 dark:text-stone-100">
          {homeLine}
        </p>
      )}
      {failed === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">
          Something went wrong. Try again.
        </p>
      )}
      <form action={redeemHouseholdInviteAction} className="mt-6">
        <input type="hidden" name="token" value={token} />
        <SubmitButton className="btn-primary flex w-full" pendingLabel="Joining...">
          Join this home
        </SubmitButton>
      </form>
      <Link href="/dashboard" className="btn-secondary mt-3 flex w-full">
        Not now
      </Link>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <div className="card text-center">{children}</div>
    </main>
  );
}

// Failure state. An expired code and a made-up one look the same to the person
// holding the phone, so they share one message; a full home gets its own line
// because a fresh code will not fix it.
function InvalidState({ reason }: { reason?: "home_full" | "rate_limited" }) {
  const subtext =
    reason === "home_full"
      ? "This home already has the most members it can have. Ask the owner to remove someone first."
      : reason === "rate_limited"
        ? "Too many tries. Wait a minute, then ask for a fresh code."
        : "This code has expired or isn't valid. Codes last 10 minutes. Ask the owner for a fresh one.";

  return (
    <Shell>
      <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
        This code isn&apos;t working
      </h1>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{subtext}</p>
    </Shell>
  );
}
