import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { PREVIEW_JOB_POSTED_COPY } from "@/lib/previewMode";

// Source test, same reason licenseVerifiedBadges.test.ts reads this same
// page.tsx as text: it pulls in the Supabase server client and
// getVerifiedUser() inside the component body, which throw when imported
// outside a real server render.
function src(rel: string): string {
  return readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
}

const page = src("./page.tsx");

// 2026-09-16: while the contractor side is closed (isHomeownerPreview(),
// src/lib/previewMode.ts), "Pros can see it now" and "Pros usually apply
// within a day or two" are both false - there is no pro network yet. Two
// spots on this page made that claim: the confirmation banner right after
// posting, and the per-job "awaiting applicants" card for the newest open
// job. Both now branch on isPreview and, in preview, show
// PREVIEW_JOB_POSTED_COPY instead - following the same one-constant-per-claim
// pattern as PREVIEW_MEMBERSHIP_COPY and PREVIEW_PROS_COPY.
describe("job-post confirmation is honest while pros are closed", () => {
  it("imports isHomeownerPreview and PREVIEW_JOB_POSTED_COPY", () => {
    expect(page).toContain(
      'import { isHomeownerPreview, PREVIEW_JOB_POSTED_COPY } from "@/lib/previewMode"'
    );
    expect(page).toContain("const isPreview = isHomeownerPreview();");
  });

  it("the posted-job banner branches on isPreview", () => {
    const start = page.indexOf('<ScrollIntoViewOnMount className="scroll-mt-20">');
    const end = page.indexOf("</ScrollIntoViewOnMount>", start);
    const banner = page.slice(start, end);

    expect(banner).toContain("{isPreview ? (");
    // Preview branch: the honest copy, nothing that promises pro activity.
    expect(banner).toContain(
      '<p className="font-medium">{PREVIEW_JOB_POSTED_COPY}</p>'
    );
    // Non-preview branch: the original copy is untouched.
    expect(banner).toContain("Your job is live. Pros can see it now.");
    expect(banner).toContain("We&apos;ll notify you the moment a pro");
  });

  it("the per-job awaiting-applicants card branches on isPreview", () => {
    const start = page.indexOf("An asap job shouldn't be told");
    const end = page.indexOf("Photos ride on the lead's issue", start);
    const explainer = page.slice(start, end);

    expect(explainer).toContain("isPreview ? (");
    expect(explainer).toContain("<p>{PREVIEW_JOB_POSTED_COPY}</p>");
    // Non-preview branch keeps the original estimate.
    expect(explainer).toContain(
      "Your job is live. Pros usually apply within a day or"
    );
    // The asap/emergency branch is untouched by preview: a real emergency
    // still gets pointed at the Emergency page either way.
    expect(explainer).toContain("/emergency");
  });

  it("PREVIEW_JOB_POSTED_COPY names the network as not open yet, without overclaiming", () => {
    expect(PREVIEW_JOB_POSTED_COPY).toBe(
      "Saved to your home's record. Our pro network isn't open yet; we'll match you with local pros when it launches."
    );
  });
});
