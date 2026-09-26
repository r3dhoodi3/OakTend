import { describe, it, expect, vi, afterEach } from "vitest";
import { insuranceLine } from "./insuranceDisclosure";

afterEach(() => vi.useRealTimers());

// The homeowner-facing replacement for the big-job insurance gate (migration
// 0173). What matters here is that it states a fact and never implies OakTend
// checked it.
describe("insuranceLine", () => {
  it("names the carrier and the month it expires", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-25T12:00:00Z"));
    expect(
      insuranceLine({
        insurance_carrier: "State Farm",
        insurance_expires: "2027-03-14",
      })
    ).toBe("Insurance on file: State Farm, expires Mar 2027");
  });

  // Shown, not hidden: "expired Jan 2025" is far more use to somebody choosing
  // a contractor than nothing at all, and suppressing it would be the same
  // paternalism the gate was removed for.
  it("says expired, and still names the month, for a lapsed date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-25T12:00:00Z"));
    expect(
      insuranceLine({
        insurance_carrier: "Acme Mutual",
        insurance_expires: "2025-01-04",
      })
    ).toBe("Insurance on file: Acme Mutual, expired Jan 2025");
  });

  it("copes with a carrier but no date, and a date but no carrier", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-25T12:00:00Z"));
    expect(insuranceLine({ insurance_carrier: "State Farm" })).toBe(
      "Insurance on file: State Farm"
    );
    expect(insuranceLine({ insurance_expires: "2027-03-14" })).toBe(
      "Insurance on file: expires Mar 2027"
    );
  });

  // null is the signal for the caller's explicit "No insurance on file" line -
  // stated out loud, because silence reads as "not applicable" and it is the
  // line that makes a homeowner ask the question.
  it("answers null when there is nothing on file", () => {
    expect(insuranceLine(null)).toBeNull();
    expect(insuranceLine(undefined)).toBeNull();
    expect(insuranceLine({})).toBeNull();
    expect(
      insuranceLine({ insurance_carrier: "   ", insurance_expires: "  " })
    ).toBeNull();
  });

  it("ignores a date it cannot parse rather than printing junk", () => {
    expect(
      insuranceLine({ insurance_carrier: "State Farm", insurance_expires: "soon" })
    ).toBe("Insurance on file: State Farm");
    expect(insuranceLine({ insurance_expires: "soon" })).toBeNull();
  });

  // It must never say "insured", "verified" or "covered" - the whole reason
  // the gate came out was that it implied a check nobody performed.
  it("never claims the coverage is verified", () => {
    const line = insuranceLine({
      insurance_carrier: "State Farm",
      insurance_expires: "2027-03-14",
    })!;
    for (const word of ["verified", "Verified", "Insured", "guaranteed", "covered"]) {
      expect(line).not.toContain(word);
    }
  });
});
