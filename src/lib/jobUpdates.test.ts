import { describe, it, expect, vi } from "vitest";

// EMAIL_TRANSACTIONAL_KINDS lives in notify.ts, which imports "server-only"
// and the service-role client - neither resolves in a test process. Stubbed
// the same way src/lib/notify.test.ts stubs them; nothing here calls a
// function that would touch the client.
vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => ({}) }));

import {
  JOB_POSTED_KIND,
  JOB_POSTED_TEAM_KIND,
  JOB_UPDATE_KIND,
  JOB_UPDATE_MAX_LEN,
  jobPostedReceipt,
  jobUpdateUrl,
  leadIdFromJobUrl,
  normalizeJobUpdate,
  teamJobAlert,
} from "./jobUpdates";
import { isTransactionalKind, isPushKind } from "./notifyGating";
import { EMAIL_TRANSACTIONAL_KINDS } from "./notify";

const LEAD = "3f1a7c2e-8b04-4d5e-9a11-6c2f0e7b4d33";

describe("jobUpdates: the url carries the lead id", () => {
  it("round-trips", () => {
    expect(leadIdFromJobUrl(jobUpdateUrl(LEAD))).toBe(LEAD);
  });

  // The hash is what scrolls the owner to their jobs; the query string is the
  // half a server read can actually see, which is why the id lives there.
  it("keeps the id where the server can read it", () => {
    expect(jobUpdateUrl(LEAD)).toContain(`?job=${LEAD}`);
    expect(jobUpdateUrl(LEAD).endsWith("#your-jobs")).toBe(true);
  });

  // These rows live in the same table as every other notification, some of
  // them years old. Anything that isn't one of ours is simply not a job.
  it("answers null for anything else", () => {
    expect(leadIdFromJobUrl(null)).toBeNull();
    expect(leadIdFromJobUrl("")).toBeNull();
    expect(leadIdFromJobUrl("/contractors#your-jobs")).toBeNull();
    expect(leadIdFromJobUrl("/pro/leads?job=not-a-uuid")).toBeNull();
    expect(leadIdFromJobUrl("/account/help?digest=2026-09-22")).toBeNull();
  });
});

describe("jobUpdates: normalizeJobUpdate", () => {
  it("refuses an empty or blank update", () => {
    expect(normalizeJobUpdate(null)).toBeNull();
    expect(normalizeJobUpdate("")).toBeNull();
    expect(normalizeJobUpdate("   ")).toBeNull();
  });

  it("trims and caps", () => {
    expect(normalizeJobUpdate("  called them  ")).toBe("called them");
    expect(normalizeJobUpdate("x".repeat(5000))).toHaveLength(JOB_UPDATE_MAX_LEN);
  });
});

describe("jobUpdates: the receipt keeps the preview's promise small", () => {
  // The preview wording everywhere else on the product (PREVIEW_JOB_POSTED_COPY
  // in src/lib/previewMode.ts, softened deliberately on 2026-09-20) says the
  // team MAY look by hand and cannot promise a match. A receipt that lands in
  // an inbox must not quietly upgrade that to a commitment.
  it("never promises a pro while pros are closed", () => {
    const body = jobPostedReceipt({
      categoryLabel: "Plumbing",
      preview: true,
    }).body;
    expect(body).toContain("may look");
    expect(body).toContain("can't promise");
    expect(body.toLowerCase()).not.toContain("pros will");
  });

  it("says what actually happened once pros are open", () => {
    const live = jobPostedReceipt({ categoryLabel: "Plumbing", preview: false });
    expect(live.title).toContain("posted");
    expect(live.body).toContain("notified");
  });
});

describe("jobUpdates: the team alert is worth waking up for", () => {
  it("marks an asap job urgent and names the city", () => {
    const alert = teamJobAlert({
      categoryLabel: "Plumbing",
      timing: "asap",
      city: "Fountain Valley",
      homeownerName: "Dana R.",
      description: "Water heater leaking into the garage",
    });
    expect(alert.title).toContain("(urgent)");
    expect(alert.title).toContain("Fountain Valley");
    expect(alert.body).toContain("Dana R.");
    expect(alert.body).toContain("Water heater");
  });

  it("still reads when the posting is missing everything optional", () => {
    const alert = teamJobAlert({
      categoryLabel: "Roofing",
      timing: null,
      city: null,
      homeownerName: null,
      description: null,
    });
    expect(alert.title).not.toContain("(urgent)");
    expect(alert.title).not.toContain("null");
    expect(alert.body).not.toContain("null");
  });
});

describe("jobUpdates: the kinds are registered as transactional", () => {
  // All three are replies to something a person just did, so none of them may
  // be dropped by the two-a-week marketing cap (withinMarketingBudget) or held
  // back by an email opt-out. A kind that is not on those lists is silently
  // swallowed the week a homeowner has already had two nudges, which is
  // exactly the silence this feature exists to end.
  for (const kind of [JOB_POSTED_KIND, JOB_POSTED_TEAM_KIND, JOB_UPDATE_KIND]) {
    it(`${kind} bypasses the frequency cap and the email opt-out`, () => {
      expect(isTransactionalKind(kind)).toBe(true);
      expect(EMAIL_TRANSACTIONAL_KINDS.has(kind)).toBe(true);
    });
  }

  it("buzzes a phone only for the two that somebody is waiting on", () => {
    expect(isPushKind(JOB_UPDATE_KIND)).toBe(true);
    expect(isPushKind(JOB_POSTED_TEAM_KIND)).toBe(true);
    // The owner is standing in the app looking at the job they just posted.
    expect(isPushKind(JOB_POSTED_KIND)).toBe(false);
  });
});
