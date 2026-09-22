// The three notification kinds that make a posted job say something back.
//
// THE HOLE THIS FILLS. postJobAction wrote a contractor_leads row, fanned the
// job out to matching pros, and told the homeowner nothing at all - no bell
// row, no email, no receipt. During the preview it is worse than quiet: the
// pro network is closed, so the fan-out reaches nobody, the team is supposed
// to look for a pro by hand, and nothing anywhere told the team a job had been
// posted either. A homeowner posted into silence and the founders found out by
// opening Supabase.
//
// So: one receipt to the person who posted (job_posted), one alert to the
// OakTend team (job_posted_team), and one channel for the team to answer on
// (job_update, written from /backoffice/jobs). All three ride the existing
// notification stack - bell row now, email once RESEND_API_KEY is set - so
// there is no new delivery machinery here, only kinds and copy.
//
// PURE ON PURPOSE. No "server-only", no Supabase, no env reads: the page, the
// posting action and the back-office action all need the same url shape and
// the same words, and a unit test needs to be able to drive them without a
// server component render. The delivery itself stays in sendNotification
// (src/lib/notify.ts), the one door every send already goes through.

// The receipt the homeowner gets for their own posting.
export const JOB_POSTED_KIND = "job_posted";

// The alert every OakTend team account gets when anyone posts a job. Internal
// only: it carries the homeowner's name and the job's city, so it must never
// be sent to anyone but a flagged team account (see internalTeamRecipients in
// src/lib/internalAccounts.ts, which is the only thing that picks recipients).
export const JOB_POSTED_TEAM_KIND = "job_posted_team";

// A note the team writes back on a specific job from /backoffice/jobs. This is
// the in-product way to say "we found someone" - before it existed, a hand
// match had no way to reach the homeowner inside OakTend at all.
export const JOB_UPDATE_KIND = "job_update";

// Where a job_update points, and how the homeowner's job card finds the update
// again. The lead id rides in the query string rather than only in the hash so
// it survives a server read of the notification row (a hash never reaches the
// server), and the hash still scrolls to the right section on arrival.
export function jobUpdateUrl(leadId: string): string {
  return `/contractors?job=${leadId}#your-jobs`;
}

// The inverse, for reading a stored notification row back into a lead id. Any
// url that isn't one of ours answers null rather than throwing: these rows are
// months old in production and nothing guarantees the shape of an old one.
export function leadIdFromJobUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = /[?&]job=([0-9a-f-]{36})(?:[&#]|$)/i.exec(url);
  return match ? match[1] : null;
}

// How long a single team update can be. Long enough for "Called Ruiz Plumbing,
// they'll reach out this afternoon - here's the number", short enough that it
// still reads as a line in a bell row and fits an email without a layout.
export const JOB_UPDATE_MAX_LEN = 600;

// One place that decides whether a typed update is sendable. Returns the
// trimmed text, or null when there is nothing worth sending - the caller turns
// that into its own error, since a server action and a test want different
// things from a refusal.
export function normalizeJobUpdate(raw: string | null | undefined): string | null {
  const text = (raw ?? "").trim();
  if (!text) return null;
  return text.slice(0, JOB_UPDATE_MAX_LEN);
}

// ---------------------------------------------------------------------------
// Copy
// ---------------------------------------------------------------------------
//
// PREVIEW WORDING IS DELIBERATELY HEDGED and matches PREVIEW_JOB_POSTED_COPY
// in src/lib/previewMode.ts word for word in what it promises: the team MAY
// look, there is no promise of a match. The one thing this receipt does
// promise is the thing the back office now makes true - that an answer, either
// way, arrives here.

export function jobPostedReceipt(input: {
  categoryLabel: string;
  preview: boolean;
}): { title: string; body: string } {
  if (input.preview) {
    return {
      title: `Your ${input.categoryLabel.toLowerCase()} job is saved`,
      body:
        "It's on your home's record. Our pro network isn't open yet, so our team may look for a local pro by hand - we can't promise to find one. Either way, you'll hear back from us here.",
    };
  }
  return {
    title: `Your ${input.categoryLabel.toLowerCase()} job is posted`,
    body:
      "Local pros who cover this trade have been notified. We'll tell you the moment one applies.",
  };
}

// The team's alert. Everything in it is already on the lead row; it is
// assembled here so the bell row, the email subject and the back-office page
// can't drift apart.
export function teamJobAlert(input: {
  categoryLabel: string;
  timing: string | null;
  city: string | null;
  homeownerName: string | null;
  description: string | null;
}): { title: string; body: string } {
  const urgent = input.timing === "asap";
  const where = input.city?.trim() || "an unknown city";
  const who = input.homeownerName?.trim() || "A homeowner";
  const what = input.description?.trim();
  return {
    title: `New job: ${input.categoryLabel}${urgent ? " (urgent)" : ""} in ${where}`,
    body: what
      ? `${who}: ${what.slice(0, 300)}`
      : `${who} posted it with no description.`,
  };
}

export function jobUpdateNotification(input: {
  categoryLabel: string;
  message: string;
}): { title: string; body: string } {
  return {
    title: `Update on your ${input.categoryLabel.toLowerCase()} job`,
    body: input.message,
  };
}
