// What the two "you have jobs" entry points say.
//
// WHY IT IS SHARED. The dashboard card and the strip at the top of
// /contractors are the only ways into /contractors/jobs, and they must never
// disagree about how many pros are waiting on you. They also both used to say
// the boring half: "1 open job". The count worth opening the app for is how
// many pros have APPLIED - it is the number that moves between visits, which
// is exactly what the 2026-09-19 audit found the product was missing.
//
// PURE. Takes rows the caller already has and returns a sentence. No Supabase,
// no "server-only": both callers fetch differently (the dashboard reads
// id + contractor_id for the whole property; /contractors reads the full lead
// rows it needs anyway), and a unit test can drive the wording without either.
//
// EXTENDING THIS (phase 2+): add fields to the returned object and a branch to
// the label. Every surface picks the change up at once, which is the point -
// when estimates land, "3 pros applied" can become "3 applied, from $1,200"
// in one edit rather than three.

export type OpenJobLead = {
  id: string;
  contractor_id?: string | null;
};

export type OpenJobsSummary = {
  /** Postings with no pro picked yet. The same definition both surfaces used. */
  openJobs: number;
  /** Live applications across those jobs - never counting a refunded or withdrawn one. */
  applicants: number;
  /** The sentence to print. Empty string when there is nothing to say. */
  label: string;
};

/**
 * `applicantsByLead` is optional: a caller that has not fetched applications
 * gets the old open-jobs wording rather than a wrong number. That keeps the
 * helper safe to adopt one surface at a time.
 */
export function openJobsSummary(
  leads: readonly OpenJobLead[],
  applicantsByLead?: ReadonlyMap<string, number>
): OpenJobsSummary {
  const open = leads.filter((l) => !l.contractor_id);
  const openJobs = open.length;
  const applicants = applicantsByLead
    ? open.reduce((sum, l) => sum + (applicantsByLead.get(l.id) ?? 0), 0)
    : 0;

  if (openJobs === 0) return { openJobs: 0, applicants: 0, label: "" };

  // The applicant count wins whenever there is one: "3 pros applied" is a
  // reason to tap, "1 open job" is a status. Singular/plural spelled out
  // rather than an "(s)" - this is the first line a homeowner reads.
  if (applicants > 0) {
    return {
      openJobs,
      applicants,
      label:
        applicants === 1 ? "1 pro applied" : `${applicants} pros applied`,
    };
  }

  return {
    openJobs,
    applicants: 0,
    label: openJobs === 1 ? "1 open job" : `${openJobs} open jobs`,
  };
}

/**
 * Live applications per lead, from rows shaped like lead_applications.
 *
 * "Live" mirrors what the job card itself counts (see /contractors/jobs): an
 * application that is still 'applied' and has not been refunded. A withdrawn
 * or ghost-refunded row must not inflate a number the homeowner is being
 * pulled in to look at.
 */
export function liveApplicantsByLead(
  rows: readonly {
    lead_id: string;
    status?: string | null;
    refunded_at?: string | null;
  }[]
): Map<string, number> {
  const byLead = new Map<string, number>();
  for (const r of rows) {
    if (r.status !== "applied" || r.refunded_at) continue;
    byLead.set(r.lead_id, (byLead.get(r.lead_id) ?? 0) + 1);
  }
  return byLead;
}
