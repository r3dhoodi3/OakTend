import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CHORES } from "@/content/chores";
import {
  CHORE_HUB_PATH,
  CHORE_PATHS,
  CHORE_PLAN_TASKS,
  SEASON_ORDER,
  SYSTEM_ORDER,
  choreDates,
  choreReminderLine,
  chorePath,
  getChore,
  planCreatesTask,
} from "./chores";
import { GUIDE_TITLES, guideDates } from "./guides";

// The how-to chore pages are hand written data (src/content/chores.ts). These
// checks keep the data honest: required fields filled, the owner's copy rules
// (no em or en dashes, short titles), real sources, links that resolve, and
// the "OakTend can remind you" line only where the plan really makes the task.

const GUIDES_DIR = fileURLToPath(new URL("../app/guides", import.meta.url));

function allStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(allStrings);
  }
  return [];
}

describe("chore content", () => {
  it("has between 20 and 30 pages with unique slugs", () => {
    expect(CHORES.length).toBeGreaterThanOrEqual(20);
    expect(CHORES.length).toBeLessThanOrEqual(30);
    const slugs = CHORES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("does not reuse the name of a guide folder", () => {
    const dirs = readdirSync(GUIDES_DIR);
    for (const c of CHORES) expect(dirs).not.toContain(c.slug);
  });

  it.each(CHORES.map((c) => [c.slug, c] as const))(
    "%s is complete and follows the copy rules",
    (_slug, chore) => {
      expect(chore.title.startsWith("How to ")).toBe(true);
      expect(chore.metaTitle.length).toBeLessThanOrEqual(50);
      expect(chore.description.length).toBeGreaterThanOrEqual(90);
      expect(chore.description.length).toBeLessThanOrEqual(160);
      for (const field of [chore.what, chore.whyOC, chore.howOften, chore.callAPro, chore.safety]) {
        expect(field.trim().length).toBeGreaterThan(20);
      }
      expect(chore.tools.length).toBeGreaterThan(0);
      expect(chore.steps.length).toBeGreaterThanOrEqual(4);
      expect(chore.steps.length).toBeLessThanOrEqual(9);
      expect(SYSTEM_ORDER).toContain(chore.system);
      expect(SEASON_ORDER).toContain(chore.season);
      // No em dashes, no en dashes (owner rule), anywhere in the page data.
      for (const s of allStrings(chore)) {
        expect(s, s).not.toMatch(/[–—]/);
      }
      expect(chore.sources.length).toBeGreaterThanOrEqual(1);
      for (const source of chore.sources) {
        expect(source.href).toMatch(/^https:\/\//);
        expect(source.href).not.toMatch(/homezada/i);
        expect(source.label.length).toBeGreaterThan(5);
        expect(source.supports.length).toBeGreaterThan(10);
      }
      for (const href of chore.relatedGuides) {
        expect(GUIDE_TITLES[href], `${href} is not a guide`).toBeDefined();
      }
    }
  );
});

describe("chore paths and dates", () => {
  it("lists the hub first, then every chore", () => {
    expect(CHORE_PATHS[0]).toBe(CHORE_HUB_PATH);
    expect(CHORE_PATHS).toHaveLength(CHORES.length + 1);
    for (const c of CHORES) expect(CHORE_PATHS).toContain(chorePath(c.slug));
  });

  it("dates every chore path, through the same guideDates the guides use", () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const path of CHORE_PATHS) {
      const dates = guideDates(path);
      expect(dates, path).not.toBeNull();
      expect(dates).toEqual(choreDates(path));
      expect(dates!.datePublished <= dates!.dateModified).toBe(true);
      expect(dates!.dateModified <= today).toBe(true);
    }
    expect(choreDates("/guides/how-to/not-a-chore")).toBeNull();
  });

  it("dates the second batch, and the hub that lists it, to the day it went up", () => {
    const secondBatch = [
      "test-garage-door-auto-reverse",
      "replace-door-weatherstripping",
      "replace-washing-machine-hoses",
      "clean-refrigerator-coils",
      "clean-range-hood-filter",
      "check-roof-from-the-ground",
      "clear-yard-drains",
    ];
    for (const slug of secondBatch) {
      expect(getChore(slug), slug).toBeDefined();
      expect(choreDates(chorePath(slug))).toEqual({
        datePublished: "2026-10-02",
        dateModified: "2026-10-02",
      });
    }
    expect(choreDates(CHORE_HUB_PATH)).toEqual({
      datePublished: "2026-10-01",
      dateModified: "2026-10-02",
    });
    expect(choreDates(chorePath("clean-gutters"))?.datePublished).toBe("2026-10-01");
  });

  it("finds a chore by slug and nothing else", () => {
    expect(getChore(CHORES[0].slug)).toBe(CHORES[0]);
    expect(getChore("nope")).toBeUndefined();
  });
});

describe("the OakTend reminder line", () => {
  it("only claims a plan task the plan generator really creates", () => {
    for (const [slug, task] of Object.entries(CHORE_PLAN_TASKS)) {
      expect(getChore(slug), `${slug} is not a chore`).toBeDefined();
      expect(planCreatesTask(task.planTitle, task.system), slug).toBe(true);
      expect(choreReminderLine(slug)).toContain(task.planTitle);
    }
  });

  it("falls back to a manual reminder for chores the plan does not make", () => {
    const manual = CHORES.find((c) => !CHORE_PLAN_TASKS[c.slug]);
    expect(manual).toBeDefined();
    expect(choreReminderLine(manual!.slug)).toBe(
      "Add it as a reminder in OakTend so it does not slip."
    );
  });
});
