import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

// Source-pattern test, same reasoning as gate.test.ts: this route imports the
// service-role client, Stripe and Claude, so it cannot be imported and driven
// here. This pins the one sentence the copilot's system prompt uses to state
// the money model (5% success fee, minimum $15, capped at $1,000, charged
// only on hire), so it can never drift back toward the retired per-lead
// tiers, wallet, or ghost protection language (retired 2026-09-10).

function src(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

const route = src("./route.ts");

describe("pro-ask system prompt: the money model states the success fee", () => {
  it("states applying, quoting, and messaging are free, with no per-lead fee", () => {
    expect(route).toContain(
      "applying to a job, quoting it, and messaging the homeowner are always free, there is no per-lead fee to apply"
    );
  });

  it("states the 5% success fee, its minimum, its cap, and that it only fires on a hire", () => {
    expect(route).toContain(
      "The only charge is a 5% success fee (minimum $15, capped at $1,000) on the job's price, and it is only charged if a homeowner hires this pro through OakTend, never for a lead they did not win."
    );
  });

  it("tells the model never to mention a per-lead fee, wallet, ghost protection, or lead credit", () => {
    expect(route).toContain(
      "Never mention a per-lead fee, a wallet, ghost protection, or lead credit: those are retired, and nothing is charged until a homeowner actually hires this pro."
    );
  });

  it("keeps Pro membership separate from the success fee", () => {
    expect(route).toContain(
      "The 'Pro membership' line below is separate and optional; it never changes whether they can apply to a job or what the success fee costs."
    );
  });

  it("never imports the retired per-lead pricing constants", () => {
    expect(route).not.toContain("LEAD_TIER_FEES");
    expect(route).not.toContain("MAJOR_INTRO_FEE");
    expect(route).not.toContain("PRO_LEAD_DISCOUNT_PCT");
  });

  it("never states the old per-lead discount or aging-markdown sentences", () => {
    expect(route).not.toContain("off every one of those fees");
    expect(route).not.toContain("aging markdown");
    expect(route).not.toContain("is a FIXED price, and is never discounted further");
  });

  it("never tells the model to quote a per-lead price to anyone, member or not", () => {
    expect(route).not.toContain(
      "Never tell a NON-member their per-lead price is anything but the plain base tier number."
    );
  });
});
