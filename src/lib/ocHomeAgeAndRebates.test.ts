import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { GUIDE_DATES, GUIDE_TITLES } from "./guides";
import { GUIDE_RELATED, GUIDE_SOURCES } from "./guideExtras";
import { OC_INCORPORATED_CITIES } from "./ocCities";
import { OC_HOME_AGE_CITIES, OC_HOME_AGE_COUNTY } from "./ocHomeAge";
import { OC_PRE_1980, OC_REMODEL_CITIES } from "./ocRemodelCities";

// The two county-level pages added on 2026-09-26 (SEO plan section 2):
// /guides/orange-county-home-age and /guides/orange-county-home-rebates-2026.
// Same rules as the other Orange County guides (src/lib/ocGuides.test.ts),
// kept in their own file, plus what is particular to each: the home age table
// has to cover every city and agree with the rounded figures on the remodel
// guides, and the rebates page has to date everything and send the reader to
// the program before they buy.

const GUIDES_DIR = fileURLToPath(new URL("../app/guides", import.meta.url));

const SLUGS = ["orange-county-home-age", "orange-county-home-rebates-2026"];

function pageSource(slug: string): string {
  return readFileSync(`${GUIDES_DIR}/${slug}/page.tsx`, "utf8");
}

// Visible copy only: code comments dropped.
function copyOf(slug: string): string {
  return pageSource(slug)
    .replace(/\/\/.*$/gm, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\s+/g, " ");
}

function constant(src: string, name: string): string {
  const match = new RegExp(`const ${name} =\\s+"((?:[^"\\\\]|\\\\.)*)";`).exec(src);
  expect(match, `${name} not found`).not.toBeNull();
  return match![1];
}

describe("the two county data pages", () => {
  it("are registered, dated, titled, related and sourced", () => {
    for (const slug of SLUGS) {
      const path = `/guides/${slug}`;
      expect(GUIDE_DATES[path], path).toBeDefined();
      expect(GUIDE_TITLES[path], path).toBeDefined();
      expect(GUIDE_RELATED[path], path).toBeDefined();
      expect(GUIDE_SOURCES[path].length, path).toBeGreaterThanOrEqual(5);
    }
  });

  it("keep the full title, with the site suffix, at 50 characters or less", () => {
    for (const slug of SLUGS) {
      const src = pageSource(slug);
      const title = constant(src, "TITLE");
      const description = constant(src, "DESCRIPTION");
      expect(title, slug).toContain("Orange County");
      expect(`${title} | OakTend`.length, slug).toBeLessThanOrEqual(50);
      expect(description.length, slug).toBeLessThanOrEqual(155);
      // The share card repeats the title as a literal.
      const og = readFileSync(`${GUIDES_DIR}/${slug}/opengraph-image.tsx`, "utf8");
      expect(og, slug).toContain(`"${title}"`);
    }
  });

  it("carry Article and Breadcrumb data only: no FAQPage, HowTo, Dataset or LocalBusiness", () => {
    for (const slug of SLUGS) {
      const src = pageSource(slug);
      expect(src, slug).toContain("<GuideArticleJsonLd");
      expect(src, slug).toContain("<BreadcrumbJsonLd");
      expect(src, slug).not.toContain("application/ld+json");
      expect(copyOf(slug), slug).not.toMatch(/FAQPage|HowTo|Dataset|LocalBusiness/);
    }
  });

  it("ask four to six questions in visible headings", () => {
    for (const slug of SLUGS) {
      const headings = Array.from(
        pageSource(slug).matchAll(/<h2 [^>]*>\s*([^<]+?)\s*<\/h2>/g)
      ).map((m) => m[1]);
      const questions = headings.filter((h) => h.trim().endsWith("?"));
      expect(questions.length, slug).toBeGreaterThanOrEqual(4);
      expect(questions.length, slug).toBeLessThanOrEqual(6);
    }
  });

  it("link the county hub and at least four city pages in the body", () => {
    for (const slug of SLUGS) {
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
    for (const slug of SLUGS) {
      expect(pageSource(slug), slug).toContain('href="/homeowner-signup"');
      expect(copyOf(slug), slug).not.toMatch(
        /find (you )?a pro|match(ed|ing)? (you )?with|book a pro|get quotes|instant quote|vetted pros/i
      );
    }
  });

  it("write the brand as OakTend and use no em dash or en dash", () => {
    for (const slug of SLUGS) {
      const src = pageSource(slug);
      expect(src, slug).not.toMatch(/[–—]/);
      expect(src, slug).not.toMatch(/Oaktend|OAKTEND|oaktend\.com/);
    }
    const extras = JSON.stringify(SLUGS.map((s) => GUIDE_SOURCES[`/guides/${s}`]));
    expect(extras).not.toMatch(/[–—]/);
  });
});

describe("the home age table", () => {
  it("has one row for each of the 34 incorporated cities, no more", () => {
    const names = OC_HOME_AGE_CITIES.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
    expect([...names].sort()).toEqual([...OC_INCORPORATED_CITIES].sort());
  });

  it("is sorted oldest first, with sane numbers", () => {
    for (let i = 1; i < OC_HOME_AGE_CITIES.length; i++) {
      expect(OC_HOME_AGE_CITIES[i - 1].pre1980).toBeGreaterThanOrEqual(
        OC_HOME_AGE_CITIES[i].pre1980
      );
    }
    for (const row of [...OC_HOME_AGE_CITIES, OC_HOME_AGE_COUNTY]) {
      expect(row.pre1980 + row.since2000, row.name).toBeLessThanOrEqual(100);
      expect(row.units, row.name).toBeGreaterThan(1000);
      expect(row.medianYear, row.name).toBeGreaterThanOrEqual(1939);
      expect(row.medianYear, row.name).toBeLessThanOrEqual(2024);
      expect(row.pre1980Moe, row.name).toBeGreaterThan(0);
    }
  });

  it("agrees with the rounded figures on the remodel and trade cost guides", () => {
    expect(Math.round(OC_HOME_AGE_COUNTY.pre1980)).toBe(OC_PRE_1980);
    for (const city of OC_REMODEL_CITIES) {
      const row = OC_HOME_AGE_CITIES.find((r) => r.name === city.name);
      expect(row, city.name).toBeDefined();
      expect(Math.round(row!.pre1980), city.name).toBe(city.pre1980);
    }
  });

  it("keeps the figures the rest of the site already cites", () => {
    const byName = Object.fromEntries(OC_HOME_AGE_CITIES.map((r) => [r.name, r.pre1980]));
    expect(OC_HOME_AGE_COUNTY.pre1980).toBe(56.8);
    expect(byName["Fountain Valley"]).toBe(82.3);
    expect(byName["Garden Grove"]).toBe(77.4);
    expect(byName["Huntington Beach"]).toBe(69.2);
    expect(byName["Newport Beach"]).toBe(54.9);
    expect(byName["Irvine"]).toBe(20.7);
  });

  it("names the rules behind each era note", () => {
    const copy = copyOf("orange-county-home-age");
    expect(copy).toContain("Consumer Product Safety Commission");
    expect(copy).toContain("section 1529");
    expect(copy).toContain("before 1978");
    expect(copy).toContain("90 percent confidence level");
  });
});

describe("the rebates page", () => {
  const copy = copyOf("orange-county-home-rebates-2026");

  it("dates every program and says it is reviewed every quarter", () => {
    expect(pageSource("orange-county-home-rebates-2026")).toContain(
      'const CHECKED_ON = "October 2, 2026";'
    );
    // Every program block carries an AsOf line.
    expect((copy.match(/<AsOf\b/g) ?? []).length).toBeGreaterThanOrEqual(10);
    expect(copy).toContain("every quarter");
  });

  it("tells the reader to check with the program before buying", () => {
    expect(copy).toContain("Check with the program before you buy");
  });

  it("does not print an SCE rebate amount SCE's page does not state", () => {
    const sce = copy.slice(
      copy.indexOf("What does SCE offer"),
      copy.indexOf("Not every Orange County home")
    );
    const dollars = Array.from(sce.matchAll(/\$\d[\d,]*/g)).map((m) => m[0]);
    expect(dollars).toEqual(["$75"]);
  });

  it("gives the state heat pump programs their real status", () => {
    expect(copy).toContain("November 14, 2025");
    expect(copy).toContain("February 24, 2026");
    expect(copy).toContain("HOMES rebates are not yet available");
  });
});
