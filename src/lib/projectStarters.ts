import { BUDGET_RANGES, REMODEL_PROJECTS, TIMING_OPTIONS } from "@/lib/constants";
import type { HomeSystem } from "@/lib/database.types";

// What each "Thinking about a project?" chip should actually DO. The chips used
// to link to /contractors?category=x, which preselected the trade and left the
// owner staring at an empty "Details about your project" box - the hardest part
// of posting a job. A starter carries a budget band, a timing, and a short
// fill-in-the-blanks template, so the chip lands on a form that is already
// written and only needs editing.
//
// Values are derived from BUDGET_RANGES / TIMING_OPTIONS so a renamed band is a
// compile error here rather than a silently-ignored URL param.
type BudgetValue = (typeof BUDGET_RANGES)[number]["value"];
type TimingValue = (typeof TIMING_OPTIONS)[number]["value"];

export type ProjectStarter = {
  label: string;
  category: string;
  // The SYSTEM_TYPES value this project replaces, when there is one. Only
  // starters with one can pull the owner's unit off the home record into
  // the draft description.
  systemType?: string;
  budget: BudgetValue;
  timing: TimingValue;
  template: string;
};

// The per-label half of a starter. `category` is NOT repeated here: it comes
// from REMODEL_PROJECTS below, so the chip's trade and the form's trade cannot
// drift apart.
type StarterSpec = {
  systemType?: string;
  budget: BudgetValue;
  timing: TimingValue;
  template: string;
};

// Keyed by REMODEL_PROJECTS label. Typed as a Record over that literal union so
// adding a project without a starter (or keeping one for a project that was
// removed) fails to compile instead of shipping a dead chip.
const STARTER_SPECS: Record<(typeof REMODEL_PROJECTS)[number]["label"], StarterSpec> = {
  "Kitchen remodel": {
    budget: "25000-50000",
    timing: "flexible",
    template:
      "Kitchen remodel. Scope: [cabinets / countertops / backsplash / layout change]. We [are / are not] keeping the current layout.",
  },
  "Bathroom remodel": {
    budget: "15000-25000",
    timing: "flexible",
    template:
      "Bathroom remodel. Scope: [tub-to-shower / tile / vanity / full gut]. It's the [primary / hall / guest] bath.",
  },
  "Window replacement": {
    systemType: "windows",
    budget: "5000-15000",
    timing: "few_weeks",
    template:
      "Replace [number] windows: [single-hung / sliding / picture], [vinyl / fiberglass / wood] frames. Current windows are [single / dual] pane. Please quote supply and install.",
  },
  "Stairs & railings": {
    budget: "5000-15000",
    timing: "flexible",
    template:
      "Stairs and railings: [repair / rebuild / new railing]. [Interior / exterior], about [number] steps.",
  },
  Flooring: {
    budget: "5000-15000",
    timing: "flexible",
    template:
      "New flooring in [rooms]. Removing the existing [carpet / tile] is [needed / not needed].",
  },
  "Deck / patio": {
    systemType: "deck",
    budget: "15000-25000",
    timing: "flexible",
    template:
      "Deck / patio: [new build / replace / repair]. Attached to the house: [yes / no].",
  },
  "Interior painting": {
    budget: "1500-5000",
    timing: "few_weeks",
    template:
      "Interior painting: [rooms / whole interior], [number] rooms, ceilings [included / not included]. Walls are in [good / fair] shape. Color picked: [yes / not yet].",
  },
  "Garage door": {
    systemType: "garage_door",
    budget: "1500-5000",
    timing: "few_weeks",
    template:
      "Garage door: [replace door / replace opener / repair]. [Single / double] door. Current door is [steel / wood / aluminum]. Please quote supply and install.",
  },
  "Roof replacement": {
    systemType: "roof",
    budget: "15000-25000",
    timing: "few_weeks",
    template:
      "Roof replacement, [one / two] story, [low / moderate / steep] pitch. Any known leaks: [yes / no].",
  },
  "Panel upgrade": {
    systemType: "electrical_panel",
    budget: "1500-5000",
    timing: "few_weeks",
    template:
      "Electrical panel upgrade to [200] amps. Reason: [EV charger / solar / added load / old panel]. Current panel is [brand / amps] if known.",
  },
  "HVAC install": {
    systemType: "hvac",
    budget: "5000-15000",
    timing: "few_weeks",
    template:
      "HVAC: [replace system / add AC / heat pump]. Home is about [size] sq ft, [one / two] story. Current system is [gas furnace + AC / heat pump / none].",
  },
  "Water heater": {
    systemType: "water_heater",
    budget: "1500-5000",
    timing: "few_weeks",
    template:
      "Water heater replacement: [gas / electric], [40 / 50] gallon or [tankless]. Located in [garage / closet / outside]. Current unit is [working / leaking / no hot water].",
  },
  // The twelve above came with founder-supplied copy; the ten below follow the
  // same shape for the rest of the chip row.
  //
  // NO [size] sq ft and NO material placeholder in any roof / structural /
  // remodeling template: those categories render ProjectScopeFields, which
  // already has a square-footage box and a material-notes box, so the draft
  // asking for them again read as redundant (founder, 2026-09-17). Templates
  // for the other categories keep them because nothing else on the form asks.
  "Solar panels": {
    budget: "25000-50000",
    timing: "flexible",
    template:
      "Solar panels: [roof mount / ground mount]. We use about [number] kWh a month and the roof is [asphalt shingle / tile / metal]. Interested in [purchase / financing], battery backup [yes / no].",
  },
  Fencing: {
    systemType: "fence",
    budget: "5000-15000",
    timing: "flexible",
    template:
      "Fence: [new / replace / repair], about [number] linear feet, [4 / 6] ft tall. Material: [wood / vinyl / chain link / iron]. Gates needed: [number].",
  },
  Landscaping: {
    budget: "5000-15000",
    timing: "flexible",
    template:
      "Landscaping in the [front / back / both] yard, about [size] sq ft. Work wanted: [new plants / sod / regrade / retaining wall / irrigation]. Existing sprinklers: [yes / no].",
  },
  "Driveway / concrete": {
    systemType: "driveway",
    budget: "5000-15000",
    timing: "flexible",
    template:
      "Driveway / concrete: [replace / new pour / repair]. Removing the existing surface is [needed / not needed].",
  },
  Siding: {
    systemType: "siding",
    budget: "15000-25000",
    timing: "flexible",
    template:
      "Siding: [replace / repair], [one / two] story.",
  },
  "Gutter installation": {
    systemType: "gutters",
    budget: "1500-5000",
    timing: "few_weeks",
    template:
      "Gutters: [new / replace / repair], about [number] linear feet, [one / two] story. Gutter guards: [yes / no].",
  },
  Insulation: {
    budget: "1500-5000",
    timing: "flexible",
    template:
      "Insulation: [attic / walls / crawlspace]. Current insulation is [none / old batts / blown-in]. Main goal: [comfort / energy bills / noise].",
  },
  "Basement finishing": {
    budget: "25000-50000",
    timing: "flexible",
    template:
      "Basement finishing. Plan includes [bedroom / bathroom / living area / wet bar]. It is currently [unfinished / partly finished] and stays [dry / damp].",
  },
  "Smart home / security": {
    budget: "1500-5000",
    timing: "few_weeks",
    template:
      "Smart home / security: [cameras / doorbell / alarm / smart locks / thermostat]. Home is about [size] sq ft, [one / two] story. Wiring preference: [wired / wireless / whatever works].",
  },
  "Drywall repair": {
    budget: "500-1500",
    timing: "few_weeks",
    template:
      "Drywall repair in [rooms]: [number] spots, the largest about [hand-sized / dinner-plate / bigger]. Cause: [water / impact / settling / unknown]. Painting after: [yes / no].",
  },
};

// The trailing "Other" chip, for a project the row doesn't name. No template:
// there is nothing honest to prefill, so it carries the category alone.
export const OTHER_STARTER: ProjectStarter = {
  label: "Other",
  category: "other",
  budget: "not-sure",
  timing: "few_weeks",
  template: "",
};

// Built FROM REMODEL_PROJECTS (label + category), never alongside it.
export const PROJECT_STARTERS: ProjectStarter[] = [
  ...REMODEL_PROJECTS.map((p) => ({
    label: p.label,
    category: p.category,
    ...STARTER_SPECS[p.label],
  })),
  OTHER_STARTER,
];

// The home_systems columns the draft description needs. A Pick of the real Row
// so a column rename reaches this file, and small enough that callers can
// select just these.
export type StarterSystem = Pick<
  HomeSystem,
  "system_type" | "install_year" | "material_or_model" | "capacity"
>;

export type StarterLink = {
  href: string;
  description: string;
};

// Resolve a chip against this home's systems: where it links and what the
// description box gets prefilled with. The home record is used ONLY to add a
// sentence of facts to the draft post; it does not surface anywhere on the
// dashboard, because the Systems section there already shows each system's
// age and condition (a "yours is 17 yrs old" line on the chips duplicated it
// and was removed 2026-09-17).
export function starterFor(
  starter: ProjectStarter,
  systems: StarterSystem[] | null | undefined,
  now = new Date()
): StarterLink {
  const match = starter.systemType
    ? (systems ?? []).find((s) => s.system_type === starter.systemType) ?? null
    : null;

  const age =
    match && match.install_year ? now.getFullYear() - match.install_year : null;

  // One extra sentence built only from fields that exist - a pro reading the
  // post gets the brand/size off the owner's record instead of a blank.
  const facts: string[] = [];
  if (match?.material_or_model) facts.push(match.material_or_model);
  if (match?.capacity) facts.push(match.capacity);
  if (match?.install_year)
    facts.push(`installed ${match.install_year} (${age} yrs old)`);
  const sentence = facts.length
    ? `Current unit on our record: ${facts.join(", ")}.`
    : "";
  const description = [starter.template, sentence].filter(Boolean).join(" ");

  const params = new URLSearchParams({ category: starter.category });
  if (description) params.set("desc", description);
  params.set("budget", starter.budget);
  params.set("timing", starter.timing);
  // Tells /contractors this post was started for the owner, so it can say so.
  params.set("starter", "1");

  return { href: `/contractors?${params.toString()}`, description };
}
