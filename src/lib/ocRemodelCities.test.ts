import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { GUIDE_SOURCES } from "./guideExtras";
import {
  CENSUS_B25034_HREF,
  OC_PRE_1980,
  OC_REMODEL_CITIES,
  TRADE_RULE_FALLBACK,
  permitNoteFor,
  type OcTrade,
} from "./ocRemodelCities";
import { LAUNCH_CITY_NAMES } from "./serviceArea";

// Holds the city table on the kitchen, bathroom and ADU guides to the rules
// written at the top of src/lib/ocRemodelCities.ts, and keeps the numbers the
// guides quote in their own words in step with the table.

const GUIDES_DIR = fileURLToPath(new URL("../app/guides", import.meta.url));
const REMODEL_GUIDES = ["kitchen-remodel-cost", "bathroom-remodel-cost", "adu-cost"];

function pageSource(slug: string): string {
  return readFileSync(`${GUIDES_DIR}/${slug}/page.tsx`, "utf8");
}

describe("OC_REMODEL_CITIES", () => {
  it("only names real launch cities, once each", () => {
    const names = OC_REMODEL_CITIES.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
    for (const name of names) {
      expect(LAUNCH_CITY_NAMES as readonly string[]).toContain(name);
    }
  });

  // Costa Mesa's site could not be opened during research or on 2026-09-25.
  // Its permit details stay off these guides until someone checks it.
  it("leaves Costa Mesa out", () => {
    expect(OC_REMODEL_CITIES.map((c) => c.name)).not.toContain("Costa Mesa");
  });

  it("links every city to its own https page and keeps the cells filled", () => {
    for (const city of OC_REMODEL_CITIES) {
      expect(new URL(city.permitHref).protocol, city.name).toBe("https:");
      expect(city.permitLabel.length, city.name).toBeGreaterThan(3);
      expect(city.permitRule.length, city.name).toBeGreaterThan(20);
      if (city.aduPlans) {
        expect(new URL(city.aduPlans.href).protocol, city.name).toBe("https:");
      }
    }
  });

  it("lists the five cities with confirmed pre-approved ADU plans", () => {
    const withPlans = OC_REMODEL_CITIES.filter((c) => c.aduPlans).map((c) => c.name);
    expect(withPlans.sort()).toEqual(
      ["Anaheim", "Huntington Beach", "Irvine", "Newport Beach", "Santa Ana"].sort()
    );
  });

  it("orders cities from oldest housing to newest, with sane percents", () => {
    const pcts = OC_REMODEL_CITIES.map((c) => c.pre1980);
    expect([...pcts].sort((a, b) => b - a)).toEqual(pcts);
    for (const p of [...pcts, OC_PRE_1980]) {
      expect(Number.isInteger(p)).toBe(true);
      expect(p).toBeGreaterThan(0);
      expect(p).toBeLessThan(100);
    }
  });

  it("uses no em dash or en dash", () => {
    expect(JSON.stringify(OC_REMODEL_CITIES)).not.toMatch(/[–—]/);
  });
});

describe("the three remodel guides", () => {
  it("cite the same Census table the city table uses", () => {
    for (const slug of REMODEL_GUIDES) {
      const hrefs = GUIDE_SOURCES[`/guides/${slug}`].map((s) => s.href);
      expect(hrefs, slug).toContain(CENSUS_B25034_HREF);
    }
  });

  it("quote the county and city shares the table shows", () => {
    const pct = (name: string) => OC_REMODEL_CITIES.find((c) => c.name === name)!.pre1980;
    for (const slug of REMODEL_GUIDES) {
      const src = pageSource(slug).replace(/\s+/g, " ");
      expect(src, slug).toContain(`About ${OC_PRE_1980} percent`);
      expect(src, slug).toContain(`${pct("Fountain Valley")} percent`);
      expect(src, slug).toContain("<OcRemodelCityTable");
    }
  });

  it("keep the title short enough that it stays under 50 with the site suffix", () => {
    for (const slug of REMODEL_GUIDES) {
      const match = /const TITLE = "([^"]+)";/.exec(pageSource(slug));
      expect(match, slug).not.toBeNull();
      expect(`${match![1]} | OakTend`.length, slug).toBeLessThanOrEqual(50);
    }
  });

  it("carry the estimate checklist and the down payment rule", () => {
    for (const slug of REMODEL_GUIDES) {
      const src = pageSource(slug).replace(/\s+/g, " ");
      expect(src, slug).toContain("How to read the estimate");
      expect(src, slug).toContain("estimate ranges, not a quote");
      expect(src, slug).toMatch(/down payment (cannot exceed|is no more than) \$1,000 or 10 percent/);
    }
  });

  it("use no em dash or en dash in their copy", () => {
    for (const slug of REMODEL_GUIDES) {
      expect(pageSource(slug), slug).not.toMatch(/[–—]/);
    }
  });
});

// The same table on the four trade guides (added 2026-09-25), keyed by the
// trade each one passes to <OcRemodelCityTable trade=...>.
const TRADE_GUIDES: Record<string, OcTrade> = {
  "roof-replacement-cost": "roof",
  "water-heater-replacement-cost": "waterHeater",
  "hvac-replacement-cost": "hvac",
  "electrical-panel-upgrade-cost": "panel",
};

describe("trade permit notes", () => {
  it("keep the remodel sentence when no trade is given", () => {
    for (const city of OC_REMODEL_CITIES) {
      expect(permitNoteFor(city)).toEqual({
        text: city.permitRule,
        href: city.permitHref,
        label: city.permitLabel,
      });
    }
  });

  it("fall back to a plain 'does not say' rather than a guess", () => {
    const mv = OC_REMODEL_CITIES.find((c) => c.name === "Mission Viejo")!;
    expect(permitNoteFor(mv, "roof").text).toBe(TRADE_RULE_FALLBACK);
    expect(permitNoteFor(mv, "roof").href).toBe(mv.permitHref);
  });

  it("give every trade rule real text and an https link", () => {
    for (const city of OC_REMODEL_CITIES) {
      for (const [trade, rule] of Object.entries(city.tradeRules)) {
        expect(rule.text.length, `${city.name} ${trade}`).toBeGreaterThan(20);
        expect(rule.text, `${city.name} ${trade}`).not.toMatch(/[–—]/);
        const note = permitNoteFor(city, trade as OcTrade);
        expect(new URL(note.href).protocol, `${city.name} ${trade}`).toBe("https:");
        if (rule.href) expect(rule.label, `${city.name} ${trade}`).toBeTruthy();
      }
    }
  });
});

describe("the four trade guides", () => {
  it("render the city table with their own trade", () => {
    for (const [slug, trade] of Object.entries(TRADE_GUIDES)) {
      expect(pageSource(slug), slug).toContain(`<OcRemodelCityTable trade="${trade}" />`);
    }
  });

  it("cite the Census table and quote the shares the table shows", () => {
    const pct = (name: string) => OC_REMODEL_CITIES.find((c) => c.name === name)!.pre1980;
    for (const slug of Object.keys(TRADE_GUIDES)) {
      const hrefs = GUIDE_SOURCES[`/guides/${slug}`].map((s) => s.href);
      expect(hrefs, slug).toContain(CENSUS_B25034_HREF);
      const src = pageSource(slug).replace(/\s+/g, " ");
      expect(src, slug).toContain(`About ${OC_PRE_1980} percent`);
      expect(src, slug).toContain(`${pct("Fountain Valley")} percent`);
      expect(src, slug).toContain("Why it costs more in Orange County");
    }
  });

  it("keep the title under 50 with the site suffix, and the share card in step", () => {
    for (const slug of Object.keys(TRADE_GUIDES)) {
      const match = /const TITLE = "([^"]+)";/.exec(pageSource(slug));
      expect(match, slug).not.toBeNull();
      expect(`${match![1]} | OakTend`.length, slug).toBeLessThanOrEqual(50);
      const og = readFileSync(`${GUIDES_DIR}/${slug}/opengraph-image.tsx`, "utf8");
      expect(og, slug).toContain(`"${match![1]}"`);
    }
  });

  it("carry the estimate checklist and the down payment rule", () => {
    for (const slug of Object.keys(TRADE_GUIDES)) {
      const src = pageSource(slug).replace(/\s+/g, " ");
      expect(src, slug).toContain("How to read the estimate");
      expect(src, slug).toContain("estimate ranges, not a quote");
      expect(src, slug).toMatch(/down payment (cannot exceed|is no more than) \$1,000 or 10 percent/);
    }
  });

  it("date every rebate and never call heat pump rebates open", () => {
    for (const slug of ["water-heater-replacement-cost", "hvac-replacement-cost"]) {
      const src = pageSource(slug).replace(/\s+/g, " ");
      expect(src, slug).toContain("Rebates, as of September 25, 2026");
      expect(src, slug).toContain("reserved statewide since November 14, 2025");
    }
  });

  it("use no em dash or en dash in their copy", () => {
    for (const slug of Object.keys(TRADE_GUIDES)) {
      expect(pageSource(slug), slug).not.toMatch(/[–—]/);
    }
  });
});
