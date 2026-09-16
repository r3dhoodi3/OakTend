import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

// Source-level test, same reason src/app/pro/help/page.test.ts is one: this
// page reads getVerifiedUser() and isContractor(), which pull in Supabase
// clients that throw when imported outside a real server render.
function src(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

const page = src("./page.tsx");

// 2026-09-15: /pros was the one marketing page the fee-retirement wave
// missed. It used to state the retired per-lead pricing model (tiered lead
// fees, ghost-protection wallet credit, aging markdowns, pay-per-apply
// wallet deposits) via src/lib/guaranteeCopy.ts and src/lib/leadPricing.ts
// imports. This page now states the 5% success-fee model instead, and no
// longer imports either of those retired-model files.
describe("/pros states the success-fee model, not the retired per-lead model", () => {
  it("states the success fee: 5%, $15 minimum, $1,000 cap, only on hire", () => {
    expect(page).toContain("Free to apply and quote");
    expect(page).toContain("success fee");
    // Source-level test: these render as "$" + the interpolated constant, so
    // pin the literal constant declarations (the actual numbers) rather than
    // a rendered "$15"/"$1,000" string that never appears in the source text.
    expect(page).toContain("const SUCCESS_FEE_PCT = 5;");
    expect(page).toContain("const SUCCESS_FEE_MIN = 15;");
    expect(page).toContain("const SUCCESS_FEE_CAP = 1000;");
    expect(page).toContain("only when a homeowner hires you through");
  });

  it("never imports the retired per-lead pricing files or constants", () => {
    expect(page).not.toContain('from "@/lib/guaranteeCopy"');
    expect(page).not.toContain('from "@/lib/leadPricing"');
    expect(page).not.toContain("LEAD_TIER_FEES");
    expect(page).not.toContain("MAJOR_INTRO_FEE");
    expect(page).not.toContain("AGING_LEAD_TIERS");
    expect(page).not.toContain("GHOST_PROTECTION_GUARANTEE");
    expect(page).not.toContain("FIRST_APPLICATION_GUARANTEE");
    expect(page).not.toContain("CREDIT_NOT_CASH_LINE");
    expect(page).not.toContain("NO_CONTRACT_LINE");
    expect(page).not.toContain("NO_BIDDING_WARS_LINE");
  });

  it("never states the retired per-lead price range, ghost protection, or aging markdowns", () => {
    expect(page).not.toContain("Most leads cost");
    expect(page).not.toContain("your first big-ticket lead is");
    expect(page).not.toContain("Ghost protection");
    expect(page).not.toContain("marked down 15-30%");
    expect(page).not.toContain("Load your wallet with deposits from $10 and pay per application");
    expect(page).not.toContain("Your wallet is only charged for the jobs you choose to go after");
  });

  it("states the honest, currently-true trust facts instead of the retired guarantees", () => {
    expect(page).toContain("No pay-to-apply, ever");
    expect(page).toContain("Keep 100% of what you");
    expect(page).toContain("verified the");
    expect(page).toContain("homeowner");
    expect(page).toContain("ownership");
    expect(page).toContain("Cancel it any time");
  });

  it("states Pro membership pricing from the PRO_PLAN constant, not a hardcoded old price", () => {
    expect(page).toContain('from "@/lib/constants"');
    expect(page).toContain("PRO_PLAN.monthly");
    expect(page).toContain("PRO_PLAN.yearly");
    expect(page).toContain("PRO_PLAN.trialDays");
  });
});
