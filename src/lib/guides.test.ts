import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  GUIDE_DATES,
  GUIDE_LINKS,
  GUIDE_PATHS,
  GUIDE_TITLES,
  buildGuideArticleJsonLd,
  guideDates,
} from "./guides";

// GUIDE_DATES is the one place the published/updated date of a guide is
// written down, and three things read it: each guide's Article JSON-LD, the
// sitemap's <lastmod>, and anything that shows a visible "Updated" line. The
// failure mode this file exists for is a guide being added (or renamed) in
// one place and forgotten in the others, which shows up as a guide with no
// dates at all or a sitemap URL whose lastmod is undefined.
//
// Source-text checks over the guide pages, the same trick
// src/app/robots.test.ts uses on the middleware: GUIDES in
// src/app/guides/page.tsx is module-private by design and exporting it from a
// route file just to test it would be the tail wagging the dog.

const GUIDES_DIR = fileURLToPath(new URL("../app/guides", import.meta.url));

function guideIndexSource(): string {
  return readFileSync(`${GUIDES_DIR}/page.tsx`, "utf8");
}

// Every href the guides index links to, from the GUIDES array literal.
function hrefsFromIndex(): string[] {
  return Array.from(
    guideIndexSource().matchAll(/href: "(\/guides\/[a-z0-9-]+)"/g)
  ).map((m) => m[1]);
}

// Every directory under src/app/guides that is a real route (has a page.tsx).
function guideRouteDirs(): string[] {
  return readdirSync(GUIDES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("GUIDE_DATES", () => {
  it("covers every path the sitemap lists, and nothing else", () => {
    expect(Object.keys(GUIDE_DATES).sort()).toEqual([...GUIDE_PATHS].sort());
  });

  it("gives every guide two real ISO dates, published no later than modified", () => {
    for (const path of GUIDE_PATHS) {
      const dates = guideDates(path);
      expect(dates, `${path} has no dates`).not.toBeNull();
      expect(dates!.datePublished, path).toMatch(ISO_DATE);
      expect(dates!.dateModified, path).toMatch(ISO_DATE);
      // String compare is enough for a fixed-width ISO date, and it cannot be
      // thrown off by a timezone the way Date parsing can.
      expect(
        dates!.datePublished <= dates!.dateModified,
        `${path} was modified before it was published`
      ).toBe(true);
    }
  });

  // A date in the future is the tell for a placeholder someone typed rather
  // than read out of git.
  it("claims no date in the future", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const path of GUIDE_PATHS) {
      const dates = guideDates(path)!;
      expect(dates.datePublished <= today, path).toBe(true);
      expect(dates.dateModified <= today, path).toBe(true);
    }
  });

  it("answers null for a path it does not know, rather than inventing a date", () => {
    expect(guideDates("/guides/not-a-guide")).toBeNull();
  });
});

describe("the guides section agrees with itself", () => {
  it("dates every guide the index links to", () => {
    const hrefs = hrefsFromIndex();
    expect(hrefs.length).toBe(19);
    for (const href of hrefs) {
      expect(GUIDE_DATES[href], `${href} is linked but undated`).toBeDefined();
    }
  });

  it("dates every guide route that exists on disk", () => {
    for (const dir of guideRouteDirs()) {
      expect(
        GUIDE_DATES[`/guides/${dir}`],
        `/guides/${dir} is a route but has no dates`
      ).toBeDefined();
    }
  });

  // The path each guide hands <GuideArticleJsonLd> is what keys into
  // GUIDE_DATES, so a typo there silently drops that guide's Article node.
  it("renders an Article node on all 19, each with a path the map knows", () => {
    const found: string[] = [];
    for (const dir of guideRouteDirs()) {
      const src = readFileSync(`${GUIDES_DIR}/${dir}/page.tsx`, "utf8");
      const match = /<GuideArticleJsonLd\s+path="([^"]+)"/.exec(src);
      expect(match, `/guides/${dir} renders no GuideArticleJsonLd`).not.toBeNull();
      expect(match![1]).toBe(`/guides/${dir}`);
      found.push(match![1]);
    }
    expect(found).toHaveLength(19);
  });
});

// GUIDE_TITLES is the link text the landing page, the /oc hub and the related
// block on every guide use. It repeats the index cards' titles on purpose (the
// index's GUIDES array is module-private), so this is what keeps the two from
// drifting.
describe("GUIDE_TITLES", () => {
  it("titles every guide and nothing else, the index excluded", () => {
    expect(Object.keys(GUIDE_TITLES).sort()).toEqual(
      GUIDE_PATHS.filter((p) => p !== "/guides").sort()
    );
    expect(GUIDE_LINKS).toHaveLength(19);
  });

  it("uses the same title the index card shows", () => {
    const src = guideIndexSource();
    for (const [href, title] of Object.entries(GUIDE_TITLES)) {
      const card = new RegExp(
        `href: "${href}",\\s+icon: \\w+,\\s+title: "([^"]+)"`
      ).exec(src);
      expect(card, `${href} has no index card`).not.toBeNull();
      expect(card![1]).toBe(title);
    }
  });
});

describe("buildGuideArticleJsonLd", () => {
  const args = {
    path: "/guides/adu-cost",
    headline: "ADU cost in Orange County: typical ranges by type (2026)",
    description: "What an ADU costs in Orange County.",
    siteUrl: "https://oaktend.com",
  };

  it("carries the real dates from the map, not today's", () => {
    const data = buildGuideArticleJsonLd(args)!;
    expect(data.datePublished).toBe(GUIDE_DATES["/guides/adu-cost"].datePublished);
    expect(data.dateModified).toBe(GUIDE_DATES["/guides/adu-cost"].dateModified);
  });

  it("names OakTend as author and publisher, pointing at the one Organization node", () => {
    const data = buildGuideArticleJsonLd(args) as Record<string, any>;
    expect(data["@type"]).toBe("Article");
    expect(data.author["@id"]).toBe("https://oaktend.com#organization");
    expect(data.publisher["@id"]).toBe("https://oaktend.com#organization");
    expect(data.publisher.logo.url).toBe("https://oaktend.com/icon-512.png");
    expect(data.mainEntityOfPage["@id"]).toBe("https://oaktend.com/guides/adu-cost");
  });

  it("emits nothing at all for a path with no dates", () => {
    expect(buildGuideArticleJsonLd({ ...args, path: "/guides/nope" })).toBeNull();
  });
});
