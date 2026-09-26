import { describe, it, expect } from "vitest";
import { openJobsSummary, liveApplicantsByLead } from "./openJobsSummary";

const open = [{ id: "a", contractor_id: null }, { id: "b", contractor_id: null }];

describe("openJobsSummary", () => {
  it("says nothing when there are no open jobs", () => {
    expect(openJobsSummary([])).toEqual({ openJobs: 0, applicants: 0, label: "" });
    // A job with a pro already picked is not open.
    expect(openJobsSummary([{ id: "a", contractor_id: "pro-1" }]).label).toBe("");
  });

  // The applicant count is the whole point: it is the number that changes
  // between visits, so it wins over the job count whenever there is one.
  it("prefers the applicant count over the job count", () => {
    const byLead = new Map([["a", 3]]);
    expect(openJobsSummary(open, byLead)).toMatchObject({
      openJobs: 2,
      applicants: 3,
      label: "3 pros applied",
    });
  });

  it("sums applicants across every open job", () => {
    const byLead = new Map([["a", 2], ["b", 1]]);
    expect(openJobsSummary(open, byLead).applicants).toBe(3);
  });

  it("uses singular wording for exactly one", () => {
    expect(openJobsSummary(open, new Map([["a", 1]])).label).toBe("1 pro applied");
    expect(openJobsSummary([open[0]]).label).toBe("1 open job");
  });

  it("falls back to the job count when nobody has applied", () => {
    expect(openJobsSummary(open, new Map()).label).toBe("2 open jobs");
  });

  // Adoptable one surface at a time: a caller that has not fetched
  // applications must get the old wording, never a wrong number.
  it("says open jobs when no applicant map is passed at all", () => {
    expect(openJobsSummary(open).label).toBe("2 open jobs");
    expect(openJobsSummary(open).applicants).toBe(0);
  });

  // An applicant on a job that is no longer open must not be counted - the
  // homeowner would tap through to find nothing waiting.
  it("ignores applicants on jobs that already have a pro", () => {
    const leads = [{ id: "a", contractor_id: "pro-1" }, { id: "b", contractor_id: null }];
    const byLead = new Map([["a", 5], ["b", 1]]);
    expect(openJobsSummary(leads, byLead).applicants).toBe(1);
  });
});

describe("liveApplicantsByLead", () => {
  // Mirrors what the job card itself counts: still 'applied', not refunded.
  it("counts only live applications", () => {
    const byLead = liveApplicantsByLead([
      { lead_id: "a", status: "applied", refunded_at: null },
      { lead_id: "a", status: "applied", refunded_at: null },
      { lead_id: "a", status: "applied", refunded_at: "2026-09-01" },
      { lead_id: "a", status: "withdrawn", refunded_at: null },
      { lead_id: "b", status: "chosen", refunded_at: null },
    ]);
    expect(byLead.get("a")).toBe(2);
    expect(byLead.get("b")).toBeUndefined();
  });

  it("is empty for no rows", () => {
    expect(liveApplicantsByLead([]).size).toBe(0);
  });
});
