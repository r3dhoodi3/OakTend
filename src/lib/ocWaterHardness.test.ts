import { describe, expect, it } from "vitest";
import { GUIDE_SOURCES } from "./guideExtras";
import { MG_L_PER_GRAIN, OC_WATER_HARDNESS } from "./ocWaterHardness";

// The table on /guides/orange-county-water-hardness-by-provider. A test cannot
// open the reports, so it holds what it can: every row is linked to a listed
// source, and the two units each report printed agree with each other within
// the reports' own rounding.

const PATH = "/guides/orange-county-water-hardness-by-provider";

describe("the water hardness table", () => {
  it("lists each of the 14 providers once", () => {
    const names = OC_WATER_HARDNESS.map((r) => r.provider);
    expect(new Set(names).size).toBe(names.length);
    expect(names.length).toBe(14);
  });

  it("links every row to a report listed under Sources", () => {
    const hrefs = GUIDE_SOURCES[PATH].map((s) => s.href);
    for (const row of OC_WATER_HARDNESS) {
      expect(hrefs, row.provider).toContain(row.href);
    }
  });

  it("keeps grains per gallon and mg/L consistent (17.1 mg/L per grain)", () => {
    for (const row of OC_WATER_HARDNESS) {
      for (const r of row.readings) {
        expect(
          Math.abs(r.mgL / MG_L_PER_GRAIN - r.gpg),
          `${row.provider}: ${r.source}`
        ).toBeLessThanOrEqual(0.6);
      }
    }
  });

  it("puts every average inside its printed range", () => {
    for (const row of OC_WATER_HARDNESS) {
      const [low, high] = row.rangeMgL;
      expect(low, row.provider).toBeLessThan(high);
      for (const r of row.readings) {
        expect(r.mgL, row.provider).toBeGreaterThanOrEqual(low);
        expect(r.mgL, row.provider).toBeLessThanOrEqual(high);
      }
    }
  });
});
