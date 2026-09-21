import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Which public pages ask search engines not to index them. Source-text checks,
// the same trick src/app/robots.test.ts uses: two of these metadata exports
// sit in layouts that import server-only modules, and what matters here is the
// literal that ships, not the module graph around it.
//
// These are public routes (no login wall), so robots.txt does not cover them
// and must not: a page blocked in robots.txt can never be seen to carry a
// noindex. The meta tag is the right tool.

function source(relative: string): string {
  return readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");
}

const NOINDEX_FOLLOW = /index:\s*false,\s*follow:\s*true/;

describe("utility pages are noindex, follow", () => {
  for (const file of [
    "./signin/layout.tsx",
    "./contractor-signup/layout.tsx",
    "./reset-password/page.tsx",
    "./verify/layout.tsx",
  ]) {
    it(`${file} carries robots noindex, follow`, () => {
      expect(source(file)).toMatch(NOINDEX_FOLLOW);
    });
  }

  it("marks the contractor signup in both the preview and the normal variant", () => {
    const src = source("./contractor-signup/layout.tsx");
    expect(src.split("robots: NOINDEX_FOLLOW").length - 1).toBe(2);
  });

  // A route handler, not a page: it writes its own HTML, so the tag is in the
  // template string rather than a metadata export.
  it("keeps the unsubscribe confirmation page out of the index", () => {
    expect(source("./unsubscribe/route.ts")).toContain(
      '<meta name="robots" content="noindex" />'
    );
  });

  it("leaves the homeowner signup indexable: it is a real entry point", () => {
    const src = source("./homeowner-signup/layout.tsx");
    expect(src).not.toMatch(/index:\s*false/);
    expect(src).not.toMatch(/noindex/);
  });
});
