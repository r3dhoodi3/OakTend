import { describe, expect, it } from "vitest";
import {
  BUDGET_RANGES,
  REMODEL_PROJECTS,
  SYSTEM_TYPES,
  TIMING_OPTIONS,
} from "@/lib/constants";
import {
  OTHER_STARTER,
  PROJECT_STARTERS,
  starterFor,
  type StarterSystem,
} from "@/lib/projectStarters";

// The chip row is built from REMODEL_PROJECTS and the prefill from
// PROJECT_STARTERS. If those two lists ever diverge a chip either disappears or
// lands on a form with nothing in it, which is the whole bug this file exists
// to prevent.
describe("PROJECT_STARTERS", () => {
  const projectStarters = PROJECT_STARTERS.filter((s) => s !== OTHER_STARTER);

  it("has exactly one starter per remodel project, plus Other", () => {
    expect(projectStarters.map((s) => s.label)).toEqual(
      REMODEL_PROJECTS.map((p) => p.label)
    );
    expect(PROJECT_STARTERS.at(-1)).toBe(OTHER_STARTER);
    expect(new Set(PROJECT_STARTERS.map((s) => s.label)).size).toBe(
      PROJECT_STARTERS.length
    );
  });

  it("keeps each starter's category the one REMODEL_PROJECTS assigns", () => {
    for (const p of REMODEL_PROJECTS) {
      const starter = projectStarters.find((s) => s.label === p.label)!;
      expect(starter.category).toBe(p.category);
    }
  });

  // A budget or timing the form doesn't recognize is silently dropped, so the
  // chip would quietly prefill nothing.
  it("uses only real budget and timing values", () => {
    for (const s of PROJECT_STARTERS) {
      expect(BUDGET_RANGES.some((b) => b.value === s.budget)).toBe(true);
      expect(TIMING_OPTIONS.some((t) => t.value === s.timing)).toBe(true);
    }
  });

  // A systemType that isn't a SYSTEM_TYPES value can never match a home_systems
  // row, so the nudge would never fire and nobody would notice.
  it("names a real system type wherever one is set", () => {
    for (const s of PROJECT_STARTERS) {
      if (!s.systemType) continue;
      expect(SYSTEM_TYPES.some((t) => t.value === s.systemType)).toBe(true);
    }
  });

  it("gives every project a fill-in-the-blanks template", () => {
    for (const s of projectStarters) {
      expect(s.template).toMatch(/\[/);
      expect(s.template.length).toBeGreaterThan(40);
    }
  });
});

describe("starterFor", () => {
  const waterHeater = PROJECT_STARTERS.find((s) => s.label === "Water heater")!;
  const now = new Date("2026-06-01T00:00:00Z");

  it("carries the whole prefill in the href and nudges nothing without systems", () => {
    const { href, nudge, description } = starterFor(waterHeater, null, now);
    expect(nudge).toBeNull();
    expect(description).toBe(waterHeater.template);
    const params = new URL(href, "https://oaktend.com").searchParams;
    expect(params.get("category")).toBe("plumbing");
    expect(params.get("desc")).toBe(waterHeater.template);
    expect(params.get("budget")).toBe("1500-5000");
    expect(params.get("timing")).toBe("few_weeks");
    expect(params.get("starter")).toBe("1");
  });

  it("ages a matching system against its typical life", () => {
    const systems: StarterSystem[] = [
      {
        system_type: "water_heater",
        install_year: 2009,
        material_or_model: "Rheem",
        capacity: "40 gal",
        expected_lifespan_years: null,
      },
    ];
    const { nudge, description } = starterFor(waterHeater, systems, now);
    expect(nudge).toBe("Yours is 17 yrs old, past its typical life");
    expect(description.endsWith(
      "Current unit on our record: Rheem, 40 gal, installed 2009 (17 yrs old)."
    )).toBe(true);
    expect(description.startsWith(waterHeater.template)).toBe(true);
  });

  it("softens the wording near the end of the typical life", () => {
    const systems: StarterSystem[] = [
      {
        system_type: "water_heater",
        install_year: 2016,
        material_or_model: null,
        capacity: null,
        expected_lifespan_years: null,
      },
    ];
    // 10 of a typical 11 years: past 80%, not past the end.
    expect(starterFor(waterHeater, systems, now).nudge).toBe(
      "Yours is 10 yrs old, near the end of its typical life"
    );
  });

  // Never invent a number: no install year means no age, but we can still say
  // the system is on file.
  it("says only that the system is on file when the year is missing", () => {
    const systems: StarterSystem[] = [
      {
        system_type: "water_heater",
        install_year: null,
        material_or_model: "Rheem",
        capacity: null,
        expected_lifespan_years: null,
      },
    ];
    const { nudge, description } = starterFor(waterHeater, systems, now);
    expect(nudge).toBe("On your home record");
    expect(description).toContain("Current unit on our record: Rheem.");
  });

  it("ignores systems of a different type", () => {
    const systems: StarterSystem[] = [
      {
        system_type: "roof",
        install_year: 1990,
        material_or_model: "Owens Corning",
        capacity: null,
        expected_lifespan_years: null,
      },
    ];
    const { nudge, description } = starterFor(waterHeater, systems, now);
    expect(nudge).toBeNull();
    expect(description).toBe(waterHeater.template);
  });

  it("sends Other with a category and no description", () => {
    const { href, nudge, description } = starterFor(OTHER_STARTER, null, now);
    expect(nudge).toBeNull();
    expect(description).toBe("");
    const params = new URL(href, "https://oaktend.com").searchParams;
    expect(params.has("desc")).toBe(false);
    expect(params.get("category")).toBe("other");
    expect(params.get("starter")).toBe("1");
  });
});
