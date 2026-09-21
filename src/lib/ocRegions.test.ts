import { describe, expect, it } from "vitest";
import { OC_REGIONS, cityPath } from "./ocRegions";
import { LAUNCH_CITY_NAMES } from "./serviceArea";

// The county hub lists cities by region rather than reading LAUNCH_CITY_NAMES
// directly, so the failure to guard against is a city that was added to the
// launch list and never given a region: it would have a page and a sitemap
// entry and be missing from the one page that is supposed to list them all.

describe("OC_REGIONS", () => {
  const grouped = OC_REGIONS.flatMap((r) => r.cities);

  it("puts every launch city in a region, and nothing that is not one", () => {
    expect([...grouped].sort()).toEqual([...LAUNCH_CITY_NAMES].sort());
  });

  it("puts no city in two regions", () => {
    expect(new Set(grouped).size).toBe(grouped.length);
    expect(grouped).toHaveLength(36);
  });

  it("has four regions with unique anchor ids, each alphabetical", () => {
    expect(OC_REGIONS.map((r) => r.id)).toEqual(["north", "central", "coastal", "south"]);
    for (const region of OC_REGIONS) {
      expect(region.cities).toEqual(
        [...region.cities].sort((a, b) => a.localeCompare(b))
      );
    }
  });
});

describe("cityPath", () => {
  it("sends the two hand-written cities to their own pages", () => {
    expect(cityPath("Fountain Valley")).toBe("/fountain-valley");
    expect(cityPath("Huntington Beach")).toBe("/huntington-beach");
  });

  it("slugs every other city under /oc", () => {
    expect(cityPath("Irvine")).toBe("/oc/irvine");
    expect(cityPath("Rancho Santa Margarita")).toBe("/oc/rancho-santa-margarita");
    expect(cityPath("Midway City")).toBe("/oc/midway-city");
  });
});
