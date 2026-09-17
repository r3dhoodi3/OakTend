import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

import { CITY_CONTENT, getCityContent } from "./index";
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
    ...city.homes.facts.map((f) => f.sourceUrl),
    city.neighborhoods.sourceUrl,
    city.water.utilityUrl,
    city.water.sourceUrl,
    city.permits.portalUrl,
    city.permits.sourceUrl,
    ...city.hazards.map((h) => h.sourceUrl),
  ];
}

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

  it("links 2 or 3 nearby cities that are real launch cities", () => {
    expect(city.neighbors.length).toBeGreaterThanOrEqual(2);
    expect(city.neighbors.length).toBeLessThanOrEqual(3);
    expect(new Set(city.neighbors).size).toBe(city.neighbors.length);
    for (const slug of city.neighbors) {
      expect(LAUNCH_SLUGS.has(slug), `${slug} is not a launch city`).toBe(true);
      expect(slug).not.toBe(city.slug);
    }
  });

  it("sources every claim over https", () => {
    for (const url of everySourceUrl(city)) {
      expect(url.startsWith("https://"), `${url} is not https`).toBe(true);
    }
  });

  it("keeps the meta description under 160 characters", () => {
    expect(city.metaDescription.length).toBeLessThan(160);
    expect(city.metaDescription.length).toBeGreaterThan(70);
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

  it("records when it was last checked", () => {
    expect(city.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("no two cities share copy", () => {
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
