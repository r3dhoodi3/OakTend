import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { PREVIEW_JOB_POSTED_COPY, PREVIEW_POST_JOB_INTRO } from "@/lib/previewMode";

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
    // One import from the copy module, now multi-line: assert the names and
    // the source rather than the exact formatting of the statement.
    expect(page).toContain('} from "@/lib/previewMode";');
    expect(page).toContain("isHomeownerPreview,");
    expect(page).toContain("PREVIEW_JOB_POSTED_COPY,");
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

  it("PREVIEW_JOB_POSTED_COPY promises a hand-matched pro, not a launch date", () => {
    // Decided 2026-09-17: posting stays open in preview and the team finds a
    // pro for each job by hand, so the copy says that and nothing about pros
    // applying on their own.
    expect(PREVIEW_JOB_POSTED_COPY).toContain("find a local pro");
    expect(PREVIEW_JOB_POSTED_COPY).not.toMatch(/pros (can see|apply)/i);
  });
});

// 2026-09-17: a coming-soon card briefly replaced the form in preview; the
// founders reversed that the same night. The form, the chips and the bottom
// link render in every mode; only the intro line under the heading branches,
// because "Local pros apply" is not what happens during the preview.
describe("post-a-job stays open while pros are closed", () => {
  it("the form and the chips are not gated on preview", () => {
    expect(page).not.toContain("{!isPreview && (");
    expect(page).toContain(">Post a job</h1>");
  });

  it("the intro line branches to PREVIEW_POST_JOB_INTRO", () => {
    expect(page).toContain("? PREVIEW_POST_JOB_INTRO");
    expect(PREVIEW_POST_JOB_INTRO).toContain("by hand");
    expect(PREVIEW_POST_JOB_INTRO).not.toMatch(/pros apply/i);
  });

  it("the bottom Back link goes home, not to report-a-problem", () => {
    expect(page).toContain('data-track="post-job:back-home"');
    expect(page).not.toContain('href="/issues"');
  });
});
