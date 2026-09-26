import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

import { CITY_CONTENT, cityMetaTitle, getCityContent } from "./index";
import type { CityContent } from "./types";
import { LAUNCH_CITY_NAMES } from "@/lib/serviceArea";

// The invariants that keep the city content module from sliding back into the
// doorway-page pattern it was built to fix. Every rule here is one an SEO
// audit or the research brief
// (OakTend-marketing/reports-2026-09-16/seo-research-city-pages.md) called out
// by name, so a future city added by hand cannot quietly ship without a
// source, with a recycled paragraph, or with a guide link that 404s.

const entries = Object.entries(CITY_CONTENT) as [string, CityContent][];

function slugFor(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

const LAUNCH_SLUGS = new Set(LAUNCH_CITY_NAMES.map(slugFor));

// Every string in a city entry, flattened, so a rule like "no em dash" can be
// asserted over the whole entry rather than field by field.
function stringsIn(value: unknown, acc: string[] = []): string[] {
  if (typeof value === "string") {
    acc.push(value);
    return acc;
  }
  if (Array.isArray(value)) {
    for (const item of value) stringsIn(item, acc);
    return acc;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) stringsIn(item, acc);
  }
  return acc;
}

function everySourceUrl(city: CityContent): string[] {
  return [
    city.population.sourceUrl,
    ...(city.homes.medianYearBuiltSource
      ? [city.homes.medianYearBuiltSource.sourceUrl]
      : []),
    ...city.homes.facts.map((f) => f.sourceUrl),
    city.neighborhoods.sourceUrl,
    city.water.utilityUrl,
    city.water.sourceUrl,
    city.permits.portalUrl,
    city.permits.sourceUrl,
    ...city.hazards.map((h) => h.sourceUrl),
  ];
}

// Wording a researched city page must never carry. Two families:
//
// 1. PROMISES ABOUT OAKTEND PROS. The pro network is closed while the site runs
//    in homeowner preview, and the city content is plain data that does not
//    know which mode it renders in, so it may not promise pros, quotes, bids,
//    matching or hiring through OakTend in either mode. The first pattern stops
//    at a full stop so "OakTend covers all of Orange County. ... a licensed
//    plumber pulls the permit" does not trip it.
// 2. CLAIMS A REVIEW ALREADY CAUGHT ONCE. "No marine layer" is false anywhere
//    in Orange County (inland cities get less of it, not none), and "one of
//    three" / "one of the few" was the shape of two false rarity claims about
//    city-run water utilities.
const BANNED_PATTERNS: { pattern: RegExp; why: string }[] = [
  {
    pattern: /OakTend[^.]*\b(pros?|quotes?|bids?|match|hire)\b/i,
    why: "promises an OakTend pro, quote, bid, match or hire",
  },
  { pattern: /pay to apply/i, why: "describes the closed pro program" },
  {
    pattern: /license-checked pros apply/i,
    why: "describes the closed pro program",
  },
  { pattern: /no marine layer/i, why: "false: inland gets less, not none" },
  {
    pattern: /one of (three|the few)/i,
    why: "rarity claim of the kind a review found false twice",
  },
];

function guideDir(href: string): string {
  return fileURLToPath(new URL(`../../app${href}`, import.meta.url));
}

describe("city content module", () => {
  it("has at least one city", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("getCityContent answers for a known slug and undefined otherwise", () => {
    expect(getCityContent(entries[0][0])?.slug).toBe(entries[0][0]);
    expect(getCityContent("not-a-city")).toBeUndefined();
    // A prototype key must not resolve to Object.prototype's member.
    expect(getCityContent("toString")).toBeUndefined();
    expect(getCityContent("constructor")).toBeUndefined();
  });

  it("keys the map by the same slug rule the routes use", () => {
    for (const [key, city] of entries) {
      expect(city.slug).toBe(key);
      expect(slugFor(city.name)).toBe(key);
      expect(LAUNCH_SLUGS.has(key)).toBe(true);
    }
  });
});

describe.each(entries)("%s content", (key, city) => {
  // The research brief's minimum bar for "not a doorway page": at least 6
  // distinct, sourced, city-specific facts, not one swapped paragraph.
  it("carries at least 6 sourced facts", () => {
    const facts = [...city.homes.facts, ...city.hazards];
    expect(facts.length).toBeGreaterThanOrEqual(6);
    const texts = new Set(facts.map((f) => f.text));
    expect(texts.size).toBe(facts.length);
    for (const fact of facts) {
      expect(fact.text.length).toBeGreaterThan(40);
      expect(fact.sourceLabel.trim().length).toBeGreaterThan(0);
    }
  });

  it("has 4 to 6 FAQ entries with real answers", () => {
    expect(city.faq.length).toBeGreaterThanOrEqual(4);
    expect(city.faq.length).toBeLessThanOrEqual(6);
    const questions = new Set(city.faq.map((f) => f.q));
    expect(questions.size).toBe(city.faq.length);
    for (const item of city.faq) {
      expect(item.q.endsWith("?")).toBe(true);
      expect(item.a.length).toBeGreaterThan(60);
    }
  });

  it("links 2 to 4 guides that resolve to real routes", () => {
    expect(city.guides.length).toBeGreaterThanOrEqual(2);
    expect(city.guides.length).toBeLessThanOrEqual(4);
    const hrefs = new Set(city.guides.map((g) => g.href));
    expect(hrefs.size).toBe(city.guides.length);
    for (const guide of city.guides) {
      expect(guide.href.startsWith("/guides/")).toBe(true);
      const dir = guideDir(guide.href);
      expect(existsSync(dir), `${guide.href} has no folder under src/app`).toBe(
        true,
      );
      expect(statSync(dir).isDirectory()).toBe(true);
      expect(existsSync(`${dir}/page.tsx`)).toBe(true);
    }
  });

  it("links 2 to 4 nearby cities that are real launch cities", () => {
    expect(city.neighbors.length).toBeGreaterThanOrEqual(2);
    expect(city.neighbors.length).toBeLessThanOrEqual(4);
    expect(new Set(city.neighbors).size).toBe(city.neighbors.length);
    for (const slug of city.neighbors) {
      expect(LAUNCH_SLUGS.has(slug), `${slug} is not a launch city`).toBe(true);
      expect(slug).not.toBe(city.slug);
    }
  });

  it("links the SoCal maintenance calendar, the one guide that fits every city", () => {
    expect(
      city.guides.some(
        (g) => g.href === "/guides/socal-home-maintenance-calendar",
      ),
    ).toBe(true);
  });

  it("sources every claim over https", () => {
    for (const url of everySourceUrl(city)) {
      expect(url.startsWith("https://"), `${url} is not https`).toBe(true);
    }
  });

  it("keeps the meta description to 155 characters and leads with the city", () => {
    expect(city.metaDescription.length).toBeLessThanOrEqual(155);
    expect(city.metaDescription.length).toBeGreaterThan(70);
    expect(city.metaDescription.startsWith(city.name)).toBe(true);
  });

  // The root layout appends " | OakTend" (10 characters), so 50 here is 60 in
  // the tab and the search result. Leading with the city name is what makes
  // the title answer a "<city> home maintenance" search at a glance.
  it("has its own title: city name first, 25 to 50 characters", () => {
    expect(city.metaTitle).toBeTruthy();
    const title = city.metaTitle as string;
    expect(title.length).toBeGreaterThanOrEqual(25);
    expect(title.length).toBeLessThanOrEqual(50);
    expect(title.startsWith(city.name)).toBe(true);
    expect(title).not.toMatch(/[!?]|\bbest\b/i);
    expect(cityMetaTitle(city.slug, "shared title")).toBe(title);
  });

  it("writes an intro of 2 to 4 sentences", () => {
    const sentences = city.intro
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 0);
    expect(sentences.length).toBeGreaterThanOrEqual(2);
    expect(sentences.length).toBeLessThanOrEqual(4);
    expect(city.intro).toContain(city.name);
  });

  it("uses no em dash anywhere", () => {
    for (const text of stringsIn(city)) {
      // Escaped rather than written literally so this file does not itself
      // contain the character it bans.
      expect(text.includes("\u2014"), `em dash in: ${text}`).toBe(false);
    }
  });

  // Plain ASCII only: no en dash, curly quote, degree sign or accented letter.
  // Covers the en dash the rule above does not, and keeps a pasted "smart"
  // character out of a meta tag.
  it("is plain ASCII throughout", () => {
    for (const text of stringsIn(city)) {
      expect(/^[\x20-\x7E]*$/.test(text), `non-ASCII in: ${text}`).toBe(true);
    }
  });

  // City content is local facts. It does not talk about the product at all:
  // the page shell around it does that and follows the preview flag, which
  // this plain data cannot.
  it("does not mention the product by name", () => {
    for (const text of stringsIn(city)) {
      expect(/oaktend/i.test(text), `product name in: ${text}`).toBe(false);
    }
  });

  it("makes no OakTend pro promise and repeats no claim a review struck", () => {
    for (const text of stringsIn(city)) {
      for (const { pattern, why } of BANNED_PATTERNS) {
        expect(pattern.test(text), `${why}: ${text}`).toBe(false);
      }
    }
  });

  it("labels a median year built with where it came from, over https", () => {
    const source = city.homes.medianYearBuiltSource;
    if (!source) return;
    expect(city.homes.medianYearBuilt).toBeTruthy();
    expect(source.sourceUrl.startsWith("https://")).toBe(true);
    expect(source.sourceLabel.trim().length).toBeGreaterThan(0);
  });

  it("does not call a Census Reporter link the U.S. Census Bureau", () => {
    // The component falls back to "U.S. Census Bureau" when no label is set,
    // which is only truthful for a census.gov URL.
    if (city.population.sourceLabel) return;
    expect(new URL(city.population.sourceUrl).hostname).toMatch(
      /(^|\.)census\.gov$/,
    );
  });

  it("records when it was last checked", () => {
    expect(city.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("internal linking across the whole launch area", () => {
  it("has researched content for every launch city", () => {
    for (const slug of LAUNCH_SLUGS) {
      expect(getCityContent(slug), `${slug} has no content`).toBeDefined();
    }
    expect(entries.length).toBe(LAUNCH_SLUGS.size);
  });

  it("gives every city at least one inbound link from a neighbor", () => {
    const linked = new Set(entries.flatMap(([, city]) => city.neighbors));
    for (const [key] of entries) {
      expect(linked.has(key), `no city links to ${key}`).toBe(true);
    }
  });

  it("falls back to the shared title for a slug with no content", () => {
    expect(cityMetaTitle("not-a-city", "shared title")).toBe("shared title");
    expect(cityMetaTitle("toString", "shared title")).toBe("shared title");
  });
});

describe("no two cities share copy", () => {
  it("has a unique title per city", () => {
    const titles = entries.map(([, city]) => city.metaTitle);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("has a unique intro per city", () => {
    const intros = entries.map(([, city]) => city.intro);
    expect(new Set(intros).size).toBe(intros.length);
  });

  it("has a unique meta description per city", () => {
    const metas = entries.map(([, city]) => city.metaDescription);
    expect(new Set(metas).size).toBe(metas.length);
  });

  // The doorway-page test in one line: two cities must not be able to swap
  // names and read the same. Comparing the first sentence of each intro is a
  // cheap proxy that catches a copy-paste before it ships.
  it("has a unique opening sentence per city", () => {
    const openers = entries.map(
      ([, city]) => city.intro.split(/(?<=[.!?])\s+/)[0],
    );
    expect(new Set(openers).size).toBe(openers.length);
  });
});
