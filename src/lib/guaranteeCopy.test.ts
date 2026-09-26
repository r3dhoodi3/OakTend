import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  GHOST_PROTECTION_GUARANTEE,
  FIRST_APPLICATION_GUARANTEE,
  CREDIT_NOT_CASH_LINE,
  NO_CONTRACT_LINE,
  NO_BIDDING_WARS_LINE,
  ghostProtectionGuaranteeRich,
  firstApplicationGuaranteeRich,
  creditNotCashLineRich,
} from "./guaranteeCopy";
import { LEAD_TIER_FEES, PRO_PLAN } from "./constants";

// This module has no server-only imports (constants.ts is plain data), unlike
// most of the pro-side files that read the canonical strings, so it can be
// imported directly instead of read as source text.

function src(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

describe("ghost protection: never a bare refund, always credit-to-wallet", () => {
  it("says 'lead credit' and '(not cash)' in the sentence itself, not only in the paired CREDIT_NOT_CASH_LINE", () => {
    // Some surfaces render this line alone (see BusinessView.tsx's own inline
    // sentence below), so the "not cash" qualifier has to survive on its own.
    expect(GHOST_PROTECTION_GUARANTEE).toContain("lead credit (not cash)");
    expect(GHOST_PROTECTION_GUARANTEE).not.toMatch(/\brefund/i);
  });

  it("the *Rich helpers actually wrap the credit words in <strong>, not just bold-flavored plain text", () => {
    const ghostHtml = renderToStaticMarkup(
      createElement("span", null, ghostProtectionGuaranteeRich())
    );
    expect(ghostHtml).toContain(
      "<strong>you always get the fee back to your wallet as lead credit (not cash)</strong>"
    );

    const firstAppHtml = renderToStaticMarkup(
      createElement("span", null, firstApplicationGuaranteeRich())
    );
    expect(firstAppHtml).toContain(
      "<strong>you get 100% of that fee back too, every time, no limit</strong>"
    );
    expect(firstAppHtml).toContain("<strong>not cash</strong>");

    const creditLineHtml = renderToStaticMarkup(
      createElement("span", null, creditNotCashLineRich())
    );
    expect(creditLineHtml).toContain("<strong>OakTend credit in your wallet</strong>");
    expect(creditLineHtml).toContain("<strong>not money back to your card</strong>");
  });

  // A ghost-protection sentence that says "refund"/"refunded" without the
  // word "credit" nearby reads as a cash refund - the exact confusion the
  // owner flagged (2026-08-30). This runs the rule against every sentence
  // this file exports, and would catch a future edit that drops the
  // qualifier from any of them.
  it("no exported sentence uses 'refund' without 'credit' within 60 characters", () => {
    for (const sentence of [
      GHOST_PROTECTION_GUARANTEE,
      FIRST_APPLICATION_GUARANTEE,
      CREDIT_NOT_CASH_LINE,
    ]) {
      assertRefundPairedWithCredit(sentence);
    }
  });

  // Three surfaces used to state the ghost-protection promise in their own
  // words (LeadsBoard's pending-applications note, BusinessView's, and
  // DirectRequestActions' unlock confirm). All three are gone with the fee
  // they promised back - see the sweep test below.

  // The unlock-confirm line ("Unlocking accepts this request and charges the
  // $X lead fee... ghost protection puts the fee back as lead credit") is
  // gone: accepting a direct request is free as of migration 0172. Same for
  // the ghost-protection line on /pro/business above. What both must not do
  // is come back.
  it("the retired per-lead promises are not still being made anywhere", () => {
    for (const rel of [
      "../app/pro/DirectRequestActions.tsx",
      "../app/pro/ApplyJobButton.tsx",
      "../app/pro/leads/LeadsBoard.tsx",
    ]) {
      const text = src(rel);
      expect(text).not.toContain("lead credit (not cash)");
      expect(text).not.toContain("Ghost protection");
      expect(text).not.toContain("ghostProtectionGuaranteeRich");
    }
  });
});

describe("no-contract and no-bidding-wars lines say only what is true today", () => {
  it("NO_CONTRACT_LINE names the one real optional charge (Pro membership) and says it cancels any time", () => {
    // Pro membership is real (PRO_PLAN exists, monthly and yearly) - the line
    // must not claim there is no optional charge at all, only that it is not
    // a contract.
    expect(PRO_PLAN.monthly).toBeGreaterThan(0);
    expect(PRO_PLAN.yearly).toBeGreaterThan(0);
    expect(NO_CONTRACT_LINE).toContain("Pro membership");
    expect(NO_CONTRACT_LINE).toMatch(/cancel.*any time/i);
    expect(NO_CONTRACT_LINE).not.toMatch(/\bannual fee\b/i); // an annual cadence exists; "no annual fee" alone would overclaim
  });

  it("NO_BIDDING_WARS_LINE matches the success-fee model: free to apply, same 5% for everyone", () => {
    // Reworded 2026-09-20 (legal review H-10): the per-tier flat fee is the
    // retired model. The LEAD_TIER_FEES shape check stays until that constant
    // is deleted with the rest of the retired code.
    for (const fee of Object.values(LEAD_TIER_FEES)) {
      expect(typeof fee).toBe("number");
    }
    expect(NO_BIDDING_WARS_LINE).toContain("applying is free");
    expect(NO_BIDDING_WARS_LINE).toContain("same 5%");
    expect(NO_BIDDING_WARS_LINE).not.toContain("tier");
  });
});

// Grabs the <p>...</p> JSX block starting at `marker`, for a scoped assertion
// instead of matching anywhere in a multi-hundred-line file.
function sliceParagraph(text: string, marker: string): string {
  const start = text.indexOf(marker);
  expect(start, `marker not found: ${marker}`).toBeGreaterThan(-1);
  const end = text.indexOf("</p>", start);
  expect(end).toBeGreaterThan(start);
  return text.slice(start, end);
}

function assertRefundPairedWithCredit(text: string): void {
  const re = /refund\w*/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const windowStart = Math.max(0, m.index - 60);
    const windowEnd = Math.min(text.length, m.index + m[0].length + 60);
    const window = text.slice(windowStart, windowEnd);
    expect(window.toLowerCase(), `"refund" without "credit" nearby: "${window}"`).toMatch(
      /credit/
    );
  }
}
