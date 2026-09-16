import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

import { nestedStreamHoles, deferredRowRefs } from "@/lib/streamHoles";

// A source test, same reason src/app/pro/page.test.tsx is one: this page pulls
// in the service-role Supabase client at module scope (getCurrentContractor ->
// createAdminClient, which imports "server-only") and throws the moment it is
// imported outside a real server render.
function src(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

const page = src("./page.tsx");
const view = src("./HelpView.tsx");

// The regression this file exists for. See the long comment at the top of
// HelpView.tsx: /pro/help was the worst offender left after the DBG3 pass -
// measured live on 2026-08-30 its Flight row carried FOUR deferrals, all past
// byte ~4060 (the "Blocked accounts" link, then the feedback card, the app
// guide card and the membership footnote). Each deferral becomes an
// out-of-order SSR segment - a `<template id="P:n">` hole inside the page's own
// markup plus a late `$RS(...)` fill script - which is the shape that
// accompanies the React #418 hydration failure on the pro pages.
describe("pro help is one client component with plain-data props", () => {
  it('HelpView carries the "use client" directive', () => {
    // Comments may precede a directive prologue; statements may not.
    const firstStatement = view
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith("//"))[0];
    expect(firstStatement).toBe('"use client";');
  });

  it("leaves no markup in the server page", () => {
    expect(page).toContain("<HelpView");
    for (const tag of ["<div", "<h1", "<h2", "<p ", "<table", "<Link", "<a "]) {
      expect(page, tag).not.toContain(tag);
    }
  });

  it("passes plain data: booleans and already-defaulted strings", () => {
    for (const prop of [
      "member={member}",
      "trialEligible={trialEligible}",
      "sent={sent}",
    ]) {
      expect(page, prop).toContain(prop);
    }
    // The two fallbacks (company name, contact email) are resolved on the
    // server, where the auth user is.
    expect(page).toContain("contractor.owner_name || contractor.name");
    expect(page).toContain("contractor.contact_email || user?.email");
  });
});

describe("pro help keeps the content it always had", () => {
  it("keeps the success-fee section and its anchor, which /pro/billing links to", () => {
    expect(view).toContain('id="lead-pricing"');
    expect(view).toContain("How the success fee works");
    expect(view).toContain("5% success fee");
    expect(view).toContain("$15");
    expect(view).toContain("$1,000");
    expect(view).toContain("Stripe");
  });

  it("keeps the support form, the bug report card, safety, and the app guide", () => {
    expect(view).toContain('id="support-form"');
    expect(view).toContain("FEEDBACK_CARD_TITLE");
    expect(view).toContain("Report abuse or a safety concern");
    expect(view).toContain('href="/pro/blocks"');
    expect(view).toContain("<ShowAppGuideButton tone=\"pro\" />");
  });

  it("keeps the bug-report card evergreen, with no claimed-state branching (C7)", () => {
    // C7 (2026-09-07): every report goes to review, so there is no more
    // "already claimed" state to branch the headline on - the card always
    // shows the same title and the same pending-review copy.
    expect(view).not.toContain("feedbackClaimed");
    expect(view).toContain("FEEDBACK_WHAT_COUNTS");
    expect(view).toContain('href="/pro/feedback"');
  });
});

// 2026-09-15: the success-fee pivot retired the per-lead ghost protection,
// no-bidding-wars, and no-contract trust lines from this card along with the
// per-lead pricing table they used to sit under - all three assumed an
// upfront per-application charge that no longer exists. This card no longer
// imports src/lib/guaranteeCopy.ts at all.
describe("pro help no longer states the retired per-lead trust facts", () => {
  it("does not import or reference the retired per-lead guarantee lines", () => {
    expect(view).not.toContain('from "@/lib/guaranteeCopy"');
    expect(view).not.toContain("GHOST_PROTECTION_GUARANTEE");
    expect(view).not.toContain("NO_BIDDING_WARS_LINE");
    expect(view).not.toContain("NO_CONTRACT_LINE");
  });

  it("does not mention a wallet or lead credit in the success-fee card", () => {
    const cardStart = view.indexOf('id="lead-pricing"');
    const cardEnd = view.indexOf("</div>", cardStart);
    const card = view.slice(cardStart, cardEnd);
    expect(card.toLowerCase()).not.toContain("wallet");
    expect(card.toLowerCase()).not.toContain("credit-back");
  });
});

// The same check against a real streamed response. It needs a running server
// and a signed-in pro cookie, so it is opt-in:
//
//   OAKTEND_HELP_STREAM_URL=http://localhost:3106 \
//   OAKTEND_HELP_STREAM_COOKIE='sb-...' npx vitest run src/app/pro/help/page.test.ts
const streamBase = process.env.OAKTEND_HELP_STREAM_URL;

describe.skipIf(!streamBase)("served /pro/help has no deferred rows or nested holes", () => {
  // Row "6" is the page's own Flight row under the pro layout; rows 0/3 and
  // the low hex ids belong to the Next.js shell and defer on every route,
  // fixed or not, so this asserts on the page row rather than the total.
  const PAGE_ROW = "6";

  it("page row is emitted whole", async () => {
    const res = await fetch(streamBase + "/pro/help", {
      headers: { cookie: process.env.OAKTEND_HELP_STREAM_COOKIE ?? "" },
    });
    const html = await res.text();
    expect(res.status).toBe(200);
    expect(nestedStreamHoles(html)).toEqual([]);
    expect(deferredRowRefs(html)[PAGE_ROW] ?? 0).toBe(0);
  });
});
