import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { fillLegalTokens } from "@/lib/legal";
import {
  hasCurrentInsurance,
  majorLeadInsuranceGate,
  isInsuranceGateSqlError,
  INSURANCE_REQUIRED_MESSAGE,
  INSURANCE_GATE_SQL_ERROR,
  INSURANCE_UPLOAD_HREF,
} from "./insuranceGate";

// Big-job insurance gate (migration 0153). The pure half is exercised
// directly; the SQL half is a SECURITY DEFINER function that only exists
// inside Postgres, so - same approach and same limits as
// src/lib/proLeadDiscount0149.test.ts and blocks0138.test.ts - reading the
// migration as text pins its shape (both charge functions carry the gate,
// with the raise text the actions match on, placed after each idempotent
// return and before any wallet read). It is not a substitute for running the
// migration's own VERIFY queries against the live database.

const repoFile = (rel: string) =>
  fileURLToPath(new URL(`../../${rel}`, import.meta.url));
// Line endings normalised on the way in. The repo is checked out CRLF
// (core.autocrlf=true), so a multi-line expected string written with a plain
// newline in this file could never match the file as READ - which is exactly
// why the SQL pins below had been failing. Normalising at the one door fixes
// every assertion at once and costs nothing: no test here cares which line
// ending a source file happens to use.
const read = (rel: string) =>
  readFileSync(repoFile(rel), "utf8").split("\r\n").join("\n");

// Dates far enough from today that these tests never flip on a real clock.
const FUTURE = "2099-01-01";
const PAST = "2001-01-01";

describe("hasCurrentInsurance", () => {
  it("fails with nothing on file", () => {
    expect(hasCurrentInsurance(null)).toBe(false);
    expect(hasCurrentInsurance(undefined)).toBe(false);
    expect(hasCurrentInsurance("")).toBe(false);
  });

  it("passes an unexpired date, fails an expired one", () => {
    expect(hasCurrentInsurance(FUTURE)).toBe(true);
    expect(hasCurrentInsurance(PAST)).toBe(false);
  });

  it("a date expiring soon still counts as on file, matching the compliance card", () => {
    // Tomorrow classifies as "expiring" (within 30 days) on the compliance
    // card; the pro is covered today, so the gate must not refuse them.
    const tomorrow = new Date(Date.now() + 86_400_000)
      .toISOString()
      .slice(0, 10);
    expect(hasCurrentInsurance(tomorrow)).toBe(true);
  });
});

describe("majorLeadInsuranceGate: the four verdicts", () => {
  it("major + no insurance = refused with the exact friendly message", () => {
    expect(majorLeadInsuranceGate("roof", null)).toBe(
      INSURANCE_REQUIRED_MESSAGE
    );
    expect(majorLeadInsuranceGate("structural", null)).toBe(
      INSURANCE_REQUIRED_MESSAGE
    );
    expect(majorLeadInsuranceGate("remodeling", null)).toBe(
      INSURANCE_REQUIRED_MESSAGE
    );
  });

  it("major + valid insurance = allowed", () => {
    expect(majorLeadInsuranceGate("roof", FUTURE)).toBeNull();
  });

  it("light tier + no insurance = allowed (the gate is big jobs only)", () => {
    expect(majorLeadInsuranceGate("cleaning", null)).toBeNull();
    expect(majorLeadInsuranceGate("handyman", null)).toBeNull();
    // Skilled tier is not major either.
    expect(majorLeadInsuranceGate("plumbing", null)).toBeNull();
    // Unknown/missing category can never be major.
    expect(majorLeadInsuranceGate(null, null)).toBeNull();
  });

  it("major + expired insurance = refused", () => {
    expect(majorLeadInsuranceGate("roof", PAST)).toBe(
      INSURANCE_REQUIRED_MESSAGE
    );
  });
});

describe("the copy itself", () => {
  it("is the owner-approved sentence, byte for byte", () => {
    expect(INSURANCE_REQUIRED_MESSAGE).toBe(
      "Big jobs need proof of insurance on file first. Add yours under Business profile > Credentials, it takes two minutes."
    );
  });

  // The message used to say "Business > Compliance" and the link used to point
  // at /pro/business#insurance, where the upload row sat inside a collapsed
  // <details> - a pro who followed the link landed on a page that showed them
  // nothing. Both now name the Credentials tab of /pro/profile, and they have
  // to keep naming the same place as each other.
  it("the upload link deep-links to the insurance row on the Credentials tab", () => {
    expect(INSURANCE_UPLOAD_HREF).toBe("/pro/profile#insurance");
  });

  it("names the screen the link actually opens", () => {
    expect(INSURANCE_UPLOAD_HREF.startsWith("/pro/profile")).toBe(true);
    expect(INSURANCE_REQUIRED_MESSAGE).toContain("Credentials");
    expect(INSURANCE_REQUIRED_MESSAGE).not.toContain("Compliance");
  });

  it("recognizes the SQL backstop's raise text, wrapped or bare", () => {
    expect(isInsuranceGateSqlError(INSURANCE_GATE_SQL_ERROR)).toBe(true);
    expect(
      isInsuranceGateSqlError("ERROR: Insurance required for big jobs")
    ).toBe(true);
    expect(isInsuranceGateSqlError("Job is full")).toBe(false);
    expect(isInsuranceGateSqlError(null)).toBe(false);
  });
});

describe("migration 0153: the SQL backstop", () => {
  const MIGRATION = "supabase/migrations/0153_major_job_insurance_gate.sql";
  const sql = read(MIGRATION);

  // The body of one function, from its CREATE to its closing $$;.
  function bodyOf(text: string, name: string): string {
    const start = text.indexOf(
      `create or replace function public.${name}(`
    );
    expect(start, name).toBeGreaterThan(-1);
    const end = text.indexOf("$$;", start);
    expect(end, name).toBeGreaterThan(start);
    return text.slice(start, end);
  }

  const GATE =
    "if v_category in ('roof', 'structural', 'remodeling')\n     and (v_insurance_expires is null or v_insurance_expires < current_date) then\n    raise exception 'Insurance required for big jobs';";

  // 0153 ADDED this gate; migration 0173 took it out again. Both statements
  // are true of their own file, so 0153 is still pinned as the historical
  // record (it is what a reader diffing the two will compare against), and
  // the LIVE behaviour is pinned against 0173 below.
  for (const fn of ["apply_to_lead", "unlock_direct_request"]) {
    it(`${fn} carried the gate when 0153 introduced it`, () => {
      const body = bodyOf(sql, fn);
      expect(body).toContain(GATE);
      expect(body).toContain(`'${INSURANCE_GATE_SQL_ERROR}'`);
    });
  }

  // What is actually live. The gate refused roof / structural / remodeling
  // applications unless insurance_expires was a date today or later - a date
  // the contractor typed themselves, never checked against a carrier. It
  // implied a verification OakTend does not do, and was stricter than CSLB,
  // which does not require the coverage for most licence types. The fact is
  // disclosed to the homeowner on the applicant card instead.
  describe("migration 0173: the gate is gone", () => {
    const latest = read("supabase/migrations/0173_no_insurance_gate.sql");

    for (const fn of ["apply_to_lead", "unlock_direct_request"]) {
      it(`${fn} no longer refuses a big job over insurance`, () => {
        const body = bodyOf(latest, fn);
        expect(body).not.toContain(GATE);
        expect(body).not.toContain(`raise exception '${INSURANCE_GATE_SQL_ERROR}'`);
        // The column is not even read any more.
        expect(body).not.toContain("v_insurance_expires");
      });
    }

    // Removing one guard must not quietly remove its neighbours.
    it("keeps every other guard of apply_to_lead", () => {
      const body = bodyOf(latest, "apply_to_lead");
      for (const guard of [
        "if public.has_open_chargeback(v_contractor) then",
        "raise exception 'Confirm the cities you serve in your profile before applying to jobs';",
        "raise exception 'You cannot apply to your own job.';",
        "using hint = 'internal_account'",
        "public.blocked_between(auth.uid(), v_owner)",
        "raise exception 'Already working with this homeowner';",
      ]) {
        expect(body, guard).toContain(guard);
      }
    });
  });

  it("keeps every pre-existing guard of 0149's apply_to_lead verbatim", () => {
    const body = bodyOf(sql, "apply_to_lead");
    for (const guard of [
      "if public.has_open_chargeback(v_contractor) then",
      "raise exception 'Confirm the cities you serve in your profile before applying to jobs';",
      "raise exception 'Job is full';",
      "if v_owner is not null and public.blocked_between(auth.uid(), v_owner) then",
      "raise exception 'Already working with this homeowner';",
      "v_price := public.pro_lead_fee_cents(v_payout, v_created, v_is_member);",
      "v_price := public.major_lead_price_cents(v_contractor, v_category, v_price);",
    ]) {
      expect(body, guard).toContain(guard);
    }
  });

  it("refuses to run against an unready database (precheck before any CREATE)", () => {
    expect(sql).toContain("-- ---- PRECHECK:");
    expect(sql).toMatch(/raise exception 'PRECHECK:.*apply_to_lead/);
    expect(sql).toMatch(/raise exception 'PRECHECK:.*insurance_expires/);
    // The precheck DO block appears before either function body.
    expect(sql.indexOf("do $precheck$")).toBeLessThan(
      sql.indexOf("create or replace function")
    );
  });

  // The "live-DB paste twin" case that used to close this suite read
  // supabase/PASTE-ME-ALL-PENDING-2026-08-31.sql. That one-time paste has been
  // applied to the live database and removed from the repo.
});

// Both server actions carried a friendly pre-check that refused a big job
// before the RPC, mirroring the SQL gate. Both are gone with it (0173). The
// inverse is what matters now: nothing in the apply or unlock path may refuse
// over insurance, or the UI would promise something the action still blocks.
describe("the actions no longer gate on insurance", () => {
  const actions = read("src/app/pro/actions.ts");

  it("neither action pre-checks insurance or translates the old SQL raise", () => {
    expect(actions).not.toContain("majorLeadInsuranceGate(");
    expect(actions).not.toContain("isInsuranceGateSqlError");
    expect(actions).not.toContain("INSURANCE_REQUIRED_MESSAGE");
  });

  // The guards that are NOT about insurance have to survive the removal.
  it("keeps the self-apply and closed-job refusals", () => {
    expect(actions).toContain("You cannot apply to your own job.");
    expect(actions).toContain('rpc("apply_to_lead"');
  });
});

describe("/pro-terms: the insurance and venue clause (source pin)", () => {
  // /pro-terms moved from hand-written JSX to src/content/legal/pro-terms.md,
  // rendered by src/components/LegalDocument.tsx (see docs/LEGAL-TODO.md).
  // fillLegalTokens mirrors what actually renders: the raw file still carries
  // {{BRAND}}, not the literal word.
  const terms = fillLegalTokens(read("src/content/legal/pro-terms.md"));

  // The OBLIGATION on the pro stays - carrying insurance is still a term of
  // using OakTend. What went (migration 0173) is the claim that OakTend
  // enforces it by withholding big jobs, which stopped being true when the
  // gate was removed. A terms document that describes a gate the product does
  // not have is worse than no clause at all.
  it("requires liability insurance covering injury and property damage", () => {
    expect(terms).toContain("carry appropriate liability insurance");
    expect(terms).toContain("bodily injury and property damage");
  });

  it("no longer claims OakTend withholds jobs over insurance", () => {
    expect(terms).not.toContain("requires current proof of insurance");
    expect(terms).not.toContain("may withhold access to those jobs");
    expect(terms).toContain("{{BRAND}} does not enforce it for you".replace("{{BRAND}}", "OakTend"));
    // And it still says who the question actually sits with.
    expect(terms).toContain("matters between you and that homeowner");
  });

  it("states the venue relationship and sole responsibility", () => {
    expect(terms).toContain(
      "OakTend is a venue that connects homeowners with independent"
    );
    expect(terms).toContain("does not perform, supervise, or guarantee the");
    expect(terms).toContain("solely responsible for the work you perform");
  });

  it("flags the whole document set for counsel per docs/LEGAL-TODO.md", () => {
    // The old inline `{/* TODO(legal): ... */}` comments scattered through
    // the hand-written pages don't exist in published Markdown (they'd
    // render as visible text, not a hidden dev note). LEGAL-TODO.md is the
    // one place that now says every document, this clause included, still
    // needs attorney sign-off.
    const todo = read("docs/LEGAL-TODO.md");
    expect(todo).toContain("Attorney review of every document");
  });
});
