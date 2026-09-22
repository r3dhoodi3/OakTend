import type { LaunchCityName } from "@/lib/serviceArea";
import { guideDates } from "@/lib/guides";

// What every guide shows besides its own words: the visible "Updated" date,
// the related links at the bottom, and (where there are any) its sources.
// Data and pure helpers only, so all of it is testable without a DOM. The two
// components that render it are src/components/GuideMeta.tsx and
// src/components/GuideRelated.tsx.

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// "2026-09-03" -> "September 3, 2026". Split by hand rather than handed to
// Date: `new Date("2026-09-03")` is midnight UTC, which a Pacific-time
// formatter prints as September 2. The string is already the answer.
export function formatGuideDate(iso: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) return null;
  return `${month} ${Number(match[3])}, ${match[1]}`;
}

// The visible "Updated" date for one guide, from the SAME map the sitemap's
// <lastmod> and the Article node's dateModified read (GUIDE_DATES in
// src/lib/guides.ts), so the three can never disagree. Null when the guide has
// no date: the line is then left out rather than guessed.
export function guideUpdated(path: string): { iso: string; label: string } | null {
  const dates = guideDates(path);
  if (!dates) return null;
  const label = formatGuideDate(dates.dateModified);
  return label ? { iso: dates.dateModified, label } : null;
}

// RELATED LINKS. Three other guides and four to six city pages per guide.
//
// Guides used to link to at most one other guide and to no city page at all,
// so a reader who finished one had nowhere to go and a crawler had no path
// from the guides to the city pages. Hand-picked rather than computed: the
// three guides are the ones a person reading this one is most likely to want
// next, and the cities are spread so that between the twelve guides every one
// of the 36 city pages is linked at least once (src/lib/guideExtras.test.ts
// checks that, and that no guide links to itself).
export type GuideRelatedEntry = {
  guides: [string, string, string];
  cities: LaunchCityName[];
};

export const GUIDE_RELATED: Record<string, GuideRelatedEntry> = {
  "/guides/water-heater-replacement-cost": {
    guides: [
      "/guides/hvac-replacement-cost",
      "/guides/home-maintenance-schedule",
      "/guides/slab-leak-signs",
    ],
    cities: ["Anaheim", "Fullerton", "Garden Grove", "Orange", "Santa Ana"],
  },
  "/guides/hvac-replacement-cost": {
    guides: [
      "/guides/water-heater-replacement-cost",
      "/guides/electrical-panel-upgrade-cost",
      "/guides/socal-home-maintenance-calendar",
    ],
    cities: ["Irvine", "Lake Forest", "Mission Viejo", "Tustin", "Yorba Linda"],
  },
  "/guides/roof-replacement-cost": {
    guides: [
      "/guides/socal-home-maintenance-calendar",
      "/guides/is-my-contractor-quote-fair",
      "/guides/contractor-deposit-rules-california",
    ],
    cities: [
      "Costa Mesa",
      "Fountain Valley",
      "Huntington Beach",
      "Newport Beach",
      "Westminster",
    ],
  },
  "/guides/electrical-panel-upgrade-cost": {
    guides: [
      "/guides/hvac-replacement-cost",
      "/guides/adu-cost",
      "/guides/is-my-contractor-quote-fair",
    ],
    cities: ["Buena Park", "Cypress", "Fullerton", "La Habra", "Stanton"],
  },
  "/guides/kitchen-remodel-cost": {
    guides: [
      "/guides/bathroom-remodel-cost",
      "/guides/is-my-contractor-quote-fair",
      "/guides/contractor-deposit-rules-california",
    ],
    cities: ["Aliso Viejo", "Irvine", "Laguna Niguel", "Newport Beach", "Yorba Linda"],
  },
  "/guides/bathroom-remodel-cost": {
    guides: [
      "/guides/kitchen-remodel-cost",
      "/guides/is-my-contractor-quote-fair",
      "/guides/contractor-deposit-rules-california",
    ],
    cities: ["Brea", "Laguna Hills", "Mission Viejo", "Placentia", "Tustin"],
  },
  "/guides/adu-cost": {
    guides: [
      "/guides/contractor-deposit-rules-california",
      "/guides/electrical-panel-upgrade-cost",
      "/guides/is-my-contractor-quote-fair",
    ],
    cities: ["Anaheim", "Costa Mesa", "Garden Grove", "San Juan Capistrano", "Santa Ana"],
  },
  "/guides/slab-leak-signs": {
    guides: [
      "/guides/water-heater-replacement-cost",
      "/guides/home-maintenance-schedule",
      "/guides/is-my-contractor-quote-fair",
    ],
    cities: [
      "Cypress",
      "Fountain Valley",
      "Huntington Beach",
      "La Palma",
      "Los Alamitos",
      "Westminster",
    ],
  },
  "/guides/home-maintenance-schedule": {
    guides: [
      "/guides/socal-home-maintenance-calendar",
      "/guides/water-heater-replacement-cost",
      "/guides/hvac-replacement-cost",
    ],
    cities: [
      "Ladera Ranch",
      "Laguna Woods",
      "Lake Forest",
      "Rancho Santa Margarita",
      "Villa Park",
    ],
  },
  "/guides/is-my-contractor-quote-fair": {
    guides: [
      "/guides/contractor-deposit-rules-california",
      "/guides/roof-replacement-cost",
      "/guides/kitchen-remodel-cost",
    ],
    cities: ["Anaheim", "Huntington Beach", "Irvine", "Mission Viejo", "Orange"],
  },
  "/guides/contractor-deposit-rules-california": {
    guides: [
      "/guides/is-my-contractor-quote-fair",
      "/guides/adu-cost",
      "/guides/roof-replacement-cost",
    ],
    cities: ["Costa Mesa", "Dana Point", "Fullerton", "Garden Grove", "Santa Ana"],
  },
  "/guides/socal-home-maintenance-calendar": {
    guides: [
      "/guides/home-maintenance-schedule",
      "/guides/roof-replacement-cost",
      "/guides/slab-leak-signs",
    ],
    cities: [
      "Dana Point",
      "Laguna Beach",
      "Midway City",
      "Newport Beach",
      "San Clemente",
      "Seal Beach",
    ],
  },
};

// SOURCES. The rule, and it is not negotiable: a source is listed here only
// if someone OPENED the page and it supports a figure or a rule that is
// already on the guide. `supports` says which one, in the guide's own terms,
// so the next editor can re-check it. Never add a link because it looks
// authoritative, and never add one for a number it does not actually state.
//
// A guide with no entry simply shows no Sources section. That is the honest
// state for the cost guides today: their ranges come from OakTend's own
// planning figures (REPLACEMENT_INFO in src/lib/health.ts), not from a
// published source, and each guide already says they are rough planning
// numbers rather than quotes.
//
// Every entry below was opened and checked on 2026-09-20.
export type GuideSource = {
  href: string;
  /** Link text: who publishes it and what it is. */
  label: string;
  /** The statement on the guide this page supports. */
  supports: string;
};

export const GUIDE_SOURCES: Record<string, GuideSource[]> = {
  "/guides/contractor-deposit-rules-california": [
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.5",
      label: "California Business and Professions Code section 7159.5",
      supports:
        "The down payment cap: $1,000 or 10 percent of the contract amount, whichever is less.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159",
      label: "California Business and Professions Code section 7159",
      supports:
        "A home improvement contract over $500 must be in writing and signed.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7048",
      label: "California Business and Professions Code section 7048",
      supports:
        "The license exemption for jobs under $1,000 with no permit and no helpers, and the rule against splitting a job to stay under it.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7027.2",
      label: "California Business and Professions Code section 7027.2",
      supports:
        "An unlicensed person's advertisement has to say they are not licensed.",
    },
  ],
  "/guides/adu-cost": [
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66317",
      label: "California Government Code section 66317",
      supports:
        "The city must approve or deny a complete ADU application within 60 days.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66321",
      label: "California Government Code section 66321",
      supports:
        "A city cannot cap ADU size below 850 square feet, or 1,000 square feet with more than one bedroom.",
    },
  ],
  "/guides/home-maintenance-schedule": [
    {
      href: "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist",
      label: "ENERGY STAR heating and cooling maintenance checklist",
      supports: "Checking the air filter once a month.",
    },
    {
      href: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/smoke-alarms/",
      label: "U.S. Fire Administration: smoke alarms",
      supports:
        "Replacing smoke alarm batteries at least once a year and the alarms themselves every 10 years.",
    },
  ],
};

export function guideSources(path: string): GuideSource[] {
  return GUIDE_SOURCES[path] ?? [];
}
