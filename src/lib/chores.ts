import type { GuideSource } from "@/lib/guideExtras";
import { CHORES } from "@/content/chores";
import { ALWAYS_SCHEDULE, SYSTEM_SCHEDULE } from "@/lib/maintenancePlan";
import { SYSTEM_TYPES, labelFor } from "@/lib/constants";

// The short how-to chore pages at /guides/how-to/<slug>, and their hub at
// /guides/how-to. Added 2026-10-01 (seo/chore-pages-2026-10-01).
//
// What these are: one page per home maintenance job, each answering "how do I
// do this, how often, and when do I stop and call someone", with the Orange
// County reason it matters. The longer topic guides under /guides stay the
// place for the deep version (hard water, wildfire prep, the month-by-month
// checklist); a chore page links to them instead of repeating them.
//
// What these are NOT: programmatic filler. Every page is hand written in
// src/content/chores.ts, every fact on it has a source someone opened (same
// rule as GUIDE_SOURCES in src/lib/guideExtras.ts), and a chore that could not
// be sourced was dropped rather than padded.
//
// The content lives in src/content/chores.ts. This file holds the types, the
// dates, the season grouping and the "does OakTend remind you" wiring.

export type ChoreSystem = "water" | "hvac" | "safety" | "appliances" | "outside";

export type ChoreSeason = "monthly" | "fall" | "spring" | "yearly";

export type Chore = {
  slug: string;
  /** The h1. Starts with "How to". */
  title: string;
  /** <title> and share cards. 50 characters or fewer before " | OakTend". */
  metaTitle: string;
  description: string;
  system: ChoreSystem;
  season: ChoreSeason;
  what: string;
  whyOC: string;
  howOften: string;
  tools: string[];
  steps: string[];
  callAPro: string;
  safety: string;
  /** Existing /guides pages to link to instead of repeating them. */
  relatedGuides: string[];
  sources: GuideSource[];
};

export const CHORE_HUB_PATH = "/guides/how-to";

export function chorePath(slug: string): string {
  return `${CHORE_HUB_PATH}/${slug}`;
}

export const CHORE_BY_SLUG: ReadonlyMap<string, Chore> = new Map(
  CHORES.map((c) => [c.slug, c])
);

export function getChore(slug: string): Chore | undefined {
  return CHORE_BY_SLUG.get(slug);
}

// Every chore page plus the hub, for the sitemap. Hub first.
export const CHORE_PATHS: string[] = [
  CHORE_HUB_PATH,
  ...CHORES.map((c) => chorePath(c.slug)),
];

// Dates, same rules as GUIDE_DATES in src/lib/guides.ts: the day the words
// were written, never computed, never in the future. Every chore page was
// first published in one commit, so they share one date. When one page's
// words change, give it its own entry in CHORE_DATE_OVERRIDES.
const CHORES_FIRST_PUBLISHED = "2026-10-01";
// The second batch of seven pages went up a day later, and the hub's list
// changed with it.
const CHORES_SECOND_BATCH = "2026-10-02";
const SECOND_BATCH_SLUGS = [
  "test-garage-door-auto-reverse",
  "replace-door-weatherstripping",
  "replace-washing-machine-hoses",
  "clean-refrigerator-coils",
  "clean-range-hood-filter",
  "check-roof-from-the-ground",
  "clear-yard-drains",
];
const CHORE_DATE_OVERRIDES: Record<string, { datePublished: string; dateModified: string }> = {
  [CHORE_HUB_PATH]: { datePublished: CHORES_FIRST_PUBLISHED, dateModified: CHORES_SECOND_BATCH },
  ...Object.fromEntries(
    SECOND_BATCH_SLUGS.map((slug) => [
      chorePath(slug),
      { datePublished: CHORES_SECOND_BATCH, dateModified: CHORES_SECOND_BATCH },
    ])
  ),
};

export function choreDates(path: string): { datePublished: string; dateModified: string } | null {
  if (!CHORE_PATHS.includes(path)) return null;
  return (
    CHORE_DATE_OVERRIDES[path] ?? {
      datePublished: CHORES_FIRST_PUBLISHED,
      dateModified: CHORES_FIRST_PUBLISHED,
    }
  );
}

export const SYSTEM_HEADINGS: Record<ChoreSystem, string> = {
  water: "Water heater and plumbing",
  hvac: "Heating, cooling and drafts",
  safety: "Safety checks",
  appliances: "Kitchen, bath and laundry",
  outside: "Outside, roof and yard",
};

export const SYSTEM_ORDER: ChoreSystem[] = [
  "safety",
  "water",
  "hvac",
  "appliances",
  "outside",
];

export const SEASON_HEADINGS: Record<ChoreSeason, string> = {
  monthly: "Every month",
  fall: "Fall, before the rain and the Santa Ana winds",
  spring: "Spring, before the summer heat",
  yearly: "Once a year, any month",
};

export const SEASON_ORDER: ChoreSeason[] = ["monthly", "fall", "spring", "yearly"];

// THE "OakTend can remind you" LINE, and the rule behind it: a chore page may
// only say OakTend reminds you when the maintenance plan generator really
// creates that task (ALWAYS_SCHEDULE / SYSTEM_SCHEDULE in
// src/lib/maintenancePlan.ts). Each entry names the exact plan task title and,
// for system tasks, the system that has to be on the home's list.
// src/lib/chores.test.ts fails if a title here stops matching the plan. Every
// other chore page says "add it as a reminder in OakTend" instead.
export const CHORE_PLAN_TASKS: Record<string, { planTitle: string; system?: string }> = {
  "test-smoke-and-co-alarms": { planTitle: "Test smoke and CO detectors" },
  "clean-gutters": { planTitle: "Clean gutters and downspouts" },
  "change-hvac-air-filter": { planTitle: "Replace HVAC air filter", system: "hvac" },
  "flush-tank-water-heater": { planTitle: "Flush the water heater", system: "water_heater" },
  "test-gfci-outlets": { planTitle: "Test GFCI outlets and breakers", system: "electrical_panel" },
  "clean-dryer-vent": {
    planTitle: "Clean the dryer vent and refrigerator coils",
    system: "appliance",
  },
  "toilet-leak-dye-test": {
    planTitle: "Check under sinks and around toilets for leaks",
    system: "plumbing",
  },
  "clean-refrigerator-coils": {
    planTitle: "Clean the dryer vent and refrigerator coils",
    system: "appliance",
  },
  "check-roof-from-the-ground": { planTitle: "Inspect roof and flashing", system: "roof" },
};

// True when the plan generator can produce this title for the given system
// (or always, when no system is named).
export function planCreatesTask(planTitle: string, system?: string): boolean {
  if (!system) return ALWAYS_SCHEDULE.some((t) => t.title === planTitle);
  return (SYSTEM_SCHEDULE[system] ?? []).some((t) => t.title === planTitle);
}

// The one sentence each chore page shows about reminders.
export function choreReminderLine(slug: string): string {
  const task = CHORE_PLAN_TASKS[slug];
  if (task && planCreatesTask(task.planTitle, task.system)) {
    if (!task.system) {
      return `OakTend can remind you: every maintenance plan includes "${task.planTitle}".`;
    }
    const label = labelFor(SYSTEM_TYPES, task.system).toLowerCase();
    return `OakTend can remind you: when your home's ${label} is on its list, the maintenance plan includes "${task.planTitle}".`;
  }
  return "Add it as a reminder in OakTend so it does not slip.";
}
