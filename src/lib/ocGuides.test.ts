import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { GUIDE_DATES, GUIDE_TITLES } from "./guides";
import { GUIDE_RELATED, GUIDE_SOURCES } from "./guideExtras";

// The eight Orange County guides added in September 2026. They follow the
// older guides' page pattern with three deliberate differences, and this file
// is what holds those differences in place:
//
//   1. No FAQPage and no HowTo JSON-LD. Google retired both rich results, so
//      the questions on these pages are visible headings only.
//   2. Every one ships with verified sources. The older cost guides are
//      allowed to have none (see the rule in src/lib/guideExtras.ts); these
//      are not, because they state rules, dates and measurements.
//   3. No printed price ranges on the three "what affects cost" guides. No
//      reputable Orange County figure exists, so they explain what drives the
//      price instead.
//
// Source-text checks over the page files, the same trick
// src/lib/guides.test.ts uses, so nothing has to be exported from a route.

const GUIDES_DIR = fileURLToPath(new URL("../app/guides", import.meta.url));

const OC_GUIDES = [
  "permits-orange-county",
  "hard-water-orange-county",
  "slab-leak-repair-orange-county",
  "repipe-orange-county",
  "termites-orange-county",
  "santa-ana-wind-wildfire-home-prep",
  "new-homeowner-first-year-orange-county",
  "orange-county-home-maintenance-checklist",
];

// The guides that talk about what a job costs without printing a number.
const NO_PRICE_GUIDES = [
  "slab-leak-repair-orange-county",
  "repipe-orange-county",
  "termites-orange-county",
];

function pageSource(slug: string): string {
  return readFileSync(`${GUIDES_DIR}/${slug}/page.tsx`, "utf8");
}

function constant(src: string, name: string): string {
  const match = new RegExp(`const ${name} =\\s+"((?:[^"\\\\]|\\\\.)*)";`).exec(src);
  expect(match, `${name} not found`).not.toBeNull();
  return match![1];
}

describe("the Orange County guides", () => {
  it("are all registered, dated and titled", () => {
    for (const slug of OC_GUIDES) {
      const path = `/guides/${slug}`;
      expect(GUIDE_DATES[path], path).toBeDefined();
      expect(GUIDE_TITLES[path], path).toBeDefined();
      expect(GUIDE_RELATED[path], path).toBeDefined();
    }
  });

  it("lead the title with the topic and Orange County, inside the length limits", () => {
    for (const slug of OC_GUIDES) {
      const src = pageSource(slug);
      const title = constant(src, "TITLE");
      const description = constant(src, "DESCRIPTION");
      expect(title, slug).toContain("Orange County");
      expect(title.length, `${slug} title`).toBeLessThanOrEqual(60);
      expect(description.length, `${slug} description`).toBeLessThanOrEqual(155);
    }
  });

  it("carry Article and Breadcrumb data only: no FAQPage, no HowTo", () => {
    for (const slug of OC_GUIDES) {
      const src = pageSource(slug);
      expect(src, slug).toContain("<GuideArticleJsonLd");
      expect(src, slug).toContain("<BreadcrumbJsonLd");
      expect(src, slug).not.toMatch(/"@type":\s*"(FAQPage|HowTo)"/);
      expect(src, slug).not.toContain("application/ld+json");
    }
  });

  it("ask their questions in visible headings", () => {
    for (const slug of OC_GUIDES) {
      const headings = Array.from(
        pageSource(slug).matchAll(/<h2 [^>]*>\s*([^<]+?)\s*<\/h2>/g)
      ).map((m) => m[1]);
      const questions = headings.filter((h) => h.trim().endsWith("?"));
      expect(questions.length, slug).toBeGreaterThanOrEqual(4);
      expect(questions.length, slug).toBeLessThanOrEqual(6);
    }
  });

  it("each list at least five verified sources", () => {
    for (const slug of OC_GUIDES) {
      const sources = GUIDE_SOURCES[`/guides/${slug}`];
      expect(sources, slug).toBeDefined();
      expect(sources.length, slug).toBeGreaterThanOrEqual(5);
    }
  });

  it("link the county hub and at least four city pages in the body", () => {
    for (const slug of OC_GUIDES) {
      const src = pageSource(slug);
      expect(src, slug).toContain('href="/oc"');
      const cityLinks = new Set(
        Array.from(
          src.matchAll(/href="(\/oc\/[a-z-]+|\/fountain-valley|\/huntington-beach)"/g)
        ).map((m) => m[1])
      );
      expect(cityLinks.size, slug).toBeGreaterThanOrEqual(4);
    }
  });

  it("say how OakTend helps without promising pros, quotes, bookings or payments", () => {
    for (const slug of OC_GUIDES) {
      const src = pageSource(slug);
      expect(src, slug).toContain('href="/homeowner-signup"');
      // Visible copy only: drop the code comments before looking.
      const copy = src.replace(/\/\/.*$/gm, "").replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
      expect(copy, slug).not.toMatch(
        /find (you )?a pro|match(ed|ing)? (you )?with|book a pro|get quotes|instant quote|vetted pros/i
      );
    }
  });

  it("print no dollar ranges on the guides that explain cost drivers instead", () => {
    for (const slug of NO_PRICE_GUIDES) {
      const copy = pageSource(slug)
        .replace(/\/\/.*$/gm, "")
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
      // The one dollar figure allowed is the $1,000 permit threshold in
      // Health and Safety Code 13113.7, which is a statute, not a price.
      const dollars = Array.from(copy.matchAll(/\$\d[\d,]*\d|\$\d/g)).map((m) => m[0]);
      expect(dollars.filter((d) => d !== "$1,000"), slug).toEqual([]);
    }
  });

  it("write the brand as OakTend and use no em dash or en dash", () => {
    for (const slug of OC_GUIDES) {
      const src = pageSource(slug);
      expect(src, slug).not.toMatch(/[\u2013\u2014]/);
      expect(src, slug).not.toMatch(/Oaktend|OAKTEND|oaktend\.com/);
    }
  });
});
