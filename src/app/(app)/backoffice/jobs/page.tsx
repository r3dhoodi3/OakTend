import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVerifiedUser } from "@/lib/auth";
import { isInternalUser } from "@/lib/internalAccounts";
import { createAdminClient } from "@/lib/supabase/admin";
import { labelFor, JOB_CATEGORIES, TIMING_OPTIONS } from "@/lib/constants";
import { JOB_UPDATE_KIND, leadIdFromJobUrl } from "@/lib/jobUpdates";
import { postJobUpdateAction } from "./actions";
import JobUpdateForm from "./JobUpdateForm";

// Back office: the jobs homeowners have actually posted, and a box to answer
// them in. The sibling page (./partners) explains the posture this one copies
// wholesale - not advertised, no nav entry, robots index:false, a 404 for
// anyone who is not a flagged team account, and the gate runs BEFORE the admin
// client is constructed because everything below it bypasses RLS.
//
// WHY IT EXISTS. During the preview the pro network is closed, so a posted job
// is matched by hand - and until this page there was no way to see the queue
// without opening the Supabase table, and no way at all to tell the homeowner
// what came of it. The 2026-09-19 audit called that out as the single worst
// hole in the product: a job posted into silence, in both directions.
//
// SO IT IS A WORKLIST, NOT A DASHBOARD. Newest first, open jobs at the top,
// every field somebody needs to make a phone call, and one box per job. No
// counts, no charts, nothing that has to be maintained.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Posted jobs",
  robots: { index: false, follow: false },
};

// FIXED locale and zone, for the same reason ./partners fixes them: a date on
// this page gets quoted to a homeowner on the phone, so it has to mean the
// same day whichever serverless region rendered it. OakTend runs on Pacific.
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function formatWhen(at: string | null): string {
  if (!at) return "-";
  const parsed = new Date(at);
  return Number.isNaN(parsed.getTime()) ? "-" : DATE_FORMAT.format(parsed);
}

// How far back the worklist goes. A hand-matching queue is a this-week
// question; older rows are history and live in the database.
const MAX_JOBS = 60;

type LeadRow = {
  id: string;
  created_at: string;
  category: string;
  timing: string | null;
  status: string;
  contractor_id: string | null;
  owner_closed_at: string | null;
  issue_description: string | null;
  homeowner_name: string | null;
  homeowner_email: string | null;
  homeowner_phone: string | null;
  property_address: string | null;
};

export default async function BackofficeJobsPage() {
  // getVerifiedUser, not getUser: this is an access decision, so the session is
  // re-verified against the auth server rather than read off the cookie.
  const user = await getVerifiedUser();
  if (!user || !(await isInternalUser(user.id))) notFound();

  // Only now. See the comment at the top of the file.
  const admin = createAdminClient();

  // `(admin as any)` for owner_closed_at, which migration 0092 added and
  // src/lib/database.types.ts has never carried - the same cast the homeowner
  // page uses to read it.
  const { data: leadRows, error: leadsError } = await (admin as any)
    .from("contractor_leads")
    .select(
      "id, created_at, category, timing, status, contractor_id, owner_closed_at, issue_description, homeowner_name, homeowner_email, homeowner_phone, property_address"
    )
    .order("created_at", { ascending: false })
    .limit(MAX_JOBS);

  if (leadsError) {
    console.error("backoffice/jobs: contractor_leads read failed", leadsError);
  }
  const leads: LeadRow[] = (leadRows ?? []) as LeadRow[];

  // How many pros have applied to each of these. One query for the whole page
  // rather than one per job; an empty or failed read simply shows zeros, which
  // is the truth during the preview anyway.
  const { data: appRows } = await (admin as any)
    .from("lead_applications")
    .select("lead_id, status, refunded_at")
    .in("lead_id", leads.map((l) => l.id).slice(0, MAX_JOBS));
  const liveApplicants = new Map<string, number>();
  for (const a of (appRows ?? []) as {
    lead_id: string;
    status: string | null;
    refunded_at: string | null;
  }[]) {
    if (a.status !== "applied" || a.refunded_at) continue;
    liveApplicants.set(a.lead_id, (liveApplicants.get(a.lead_id) ?? 0) + 1);
  }

  // What we have already told each homeowner. The updates are notification rows
  // (see src/lib/jobUpdates.ts for why there is no separate table): the lead id
  // rides in the row's url, so one descending read gives the latest update per
  // job without a join. Read newest-first and keep the FIRST hit per lead.
  const { data: updateRows } = await (admin as any)
    .from("notifications")
    .select("url, body, created_at")
    .eq("kind", JOB_UPDATE_KIND)
    .order("created_at", { ascending: false })
    .limit(400);
  const lastUpdate = new Map<string, { body: string | null; at: string }>();
  for (const row of (updateRows ?? []) as {
    url: string | null;
    body: string | null;
    created_at: string;
  }[]) {
    const leadId = leadIdFromJobUrl(row.url);
    if (!leadId || lastUpdate.has(leadId)) continue;
    lastUpdate.set(leadId, { body: row.body, at: row.created_at });
  }

  // Open jobs first, newest first inside each half: the queue is the point, and
  // a closed job is only here so a follow-up question has somewhere to land.
  const isOpen = (l: LeadRow) => !l.contractor_id && !l.owner_closed_at;
  const open = leads.filter(isOpen);
  const done = leads.filter((l) => !isOpen(l));

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
          Posted jobs
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          The last {MAX_JOBS} jobs homeowners posted, and the updates we sent
          back. OakTend team only.
        </p>
      </header>

      {leads.length === 0 && (
        <p className="text-sm text-stone-500 dark:text-stone-400">
          No jobs posted yet.
        </p>
      )}

      {[
        { key: "open", title: "Waiting on us", rows: open },
        { key: "done", title: "Closed or matched", rows: done },
      ]
        .filter((section) => section.rows.length > 0)
        .map((section) => (
          <section key={section.key} className="space-y-3">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              {section.title}{" "}
              <span className="font-normal text-stone-500 dark:text-stone-400">
                {section.rows.length}
              </span>
            </h2>
            <ul className="space-y-3">
              {section.rows.map((l) => {
                const update = lastUpdate.get(l.id);
                const applicants = liveApplicants.get(l.id) ?? 0;
                return (
                  <li key={l.id} className="card space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          {labelFor(JOB_CATEGORIES, l.category)}
                          {l.timing && (
                            <span className="text-stone-500 dark:text-stone-400">
                              {" · "}
                              {labelFor(TIMING_OPTIONS, l.timing)}
                            </span>
                          )}
                        </p>
                        {l.issue_description && (
                          <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
                            {l.issue_description}
                          </p>
                        )}
                        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                          Posted {formatWhen(l.created_at)}
                          {" · "}
                          {applicants} applicant{applicants === 1 ? "" : "s"}
                        </p>
                      </div>
                      {l.timing === "asap" && !l.contractor_id && (
                        <span className="chip-warn shrink-0">Urgent</span>
                      )}
                    </div>

                    {/* Everything needed to pick up the phone, in one place.
                        This is the whole reason the page exists, so it is
                        plain text rather than a table: it gets copied out. */}
                    <div className="rounded-lg border border-dashed border-stone-300 p-3 text-sm text-stone-600 dark:border-stone-700 dark:text-stone-300">
                      <p>{l.homeowner_name ?? "No name on the posting"}</p>
                      {l.property_address && (
                        <p className="text-stone-500 dark:text-stone-400">
                          {l.property_address}
                        </p>
                      )}
                      <p className="text-stone-500 dark:text-stone-400">
                        {[l.homeowner_email, l.homeowner_phone]
                          .filter(Boolean)
                          .join(" · ") || "No contact details on the posting"}
                      </p>
                    </div>

                    {update && (
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Last update {formatWhen(update.at)}:{" "}
                        <span className="text-stone-600 dark:text-stone-300">
                          {update.body}
                        </span>
                      </p>
                    )}

                    <JobUpdateForm leadId={l.id} action={postJobUpdateAction} />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
    </div>
  );
}
