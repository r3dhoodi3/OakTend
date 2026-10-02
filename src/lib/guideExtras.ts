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
      "/guides/orange-county-home-maintenance-checklist",
      "/guides/slab-leak-signs",
    ],
    cities: ["Anaheim", "Fullerton", "Garden Grove", "Orange", "Santa Ana"],
  },
  "/guides/hvac-replacement-cost": {
    guides: [
      "/guides/water-heater-replacement-cost",
      "/guides/electrical-panel-upgrade-cost",
      "/guides/orange-county-home-maintenance-checklist",
    ],
    cities: ["Irvine", "Lake Forest", "Mission Viejo", "Tustin", "Yorba Linda"],
  },
  "/guides/roof-replacement-cost": {
    guides: [
      "/guides/orange-county-home-maintenance-checklist",
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
      "/guides/solar-battery-orange-county",
      "/guides/orange-county-home-rebates-2026",
      "/guides/adu-cost",
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
  // Added 2026-09-26 (SEO plan section 2, new pages A).
  "/guides/garage-conversion-vs-adu-orange-county": {
    guides: [
      "/guides/adu-cost",
      "/guides/permits-orange-county",
      "/guides/hoa-coastal-commission-remodel-orange-county",
    ],
    cities: [
      "Newport Beach",
      "Anaheim",
      "Santa Ana",
      "Irvine",
      "Huntington Beach",
      "Garden Grove",
    ],
  },
  "/guides/slab-leak-signs": {
    guides: [
      "/guides/water-heater-replacement-cost",
      "/guides/orange-county-home-maintenance-checklist",
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
  "/guides/permits-orange-county": {
    guides: [
      "/guides/contractor-deposit-rules-california",
      "/guides/water-heater-replacement-cost",
      "/guides/new-homeowner-first-year-orange-county",
    ],
    cities: [
      "Irvine",
      "Fountain Valley",
      "Yorba Linda",
      "Garden Grove",
      "Santa Ana",
      "Newport Beach",
    ],
  },
  // Added 2026-09-26 (SEO plan section 2, new pages A).
  "/guides/hoa-coastal-commission-remodel-orange-county": {
    guides: [
      "/guides/garage-conversion-vs-adu-orange-county",
      "/guides/kitchen-remodel-cost",
      "/guides/permits-orange-county",
    ],
    cities: [
      "Seal Beach",
      "Laguna Beach",
      "Dana Point",
      "San Clemente",
      "Newport Beach",
      "Laguna Niguel",
    ],
  },
  "/guides/hard-water-orange-county": {
    guides: [
      "/guides/water-heater-replacement-cost",
      "/guides/repipe-orange-county",
      "/guides/orange-county-home-maintenance-checklist",
    ],
    cities: [
      "Fountain Valley",
      "Newport Beach",
      "Costa Mesa",
      "Yorba Linda",
      "Irvine",
      "Rancho Santa Margarita",
    ],
  },
  "/guides/slab-leak-repair-orange-county": {
    guides: [
      "/guides/slab-leak-signs",
      "/guides/repipe-orange-county",
      "/guides/permits-orange-county",
    ],
    cities: [
      "Fountain Valley",
      "Huntington Beach",
      "Garden Grove",
      "Westminster",
      "Anaheim",
      "Cypress",
    ],
  },
  "/guides/repipe-orange-county": {
    guides: [
      "/guides/slab-leak-repair-orange-county",
      "/guides/hard-water-orange-county",
      "/guides/permits-orange-county",
    ],
    cities: [
      "Santa Ana",
      "Fountain Valley",
      "Fullerton",
      "Orange",
      "Buena Park",
      "La Habra",
    ],
  },
  "/guides/termites-orange-county": {
    guides: [
      "/guides/orange-county-home-maintenance-checklist",
      "/guides/is-my-contractor-quote-fair",
      "/guides/new-homeowner-first-year-orange-county",
    ],
    cities: [
      "Huntington Beach",
      "Newport Beach",
      "Costa Mesa",
      "Seal Beach",
      "Tustin",
      "Orange",
    ],
  },
  // Added 2026-09-26 (seo/new-pages-c).
  "/guides/earthquake-retrofit-orange-county": {
    guides: [
      "/guides/new-homeowner-first-year-orange-county",
      "/guides/permits-orange-county",
      "/guides/water-heater-replacement-cost",
    ],
    cities: ["Anaheim", "Santa Ana", "Irvine", "Huntington Beach", "San Clemente"],
  },
  "/guides/sewer-line-orange-county": {
    guides: [
      "/guides/repipe-orange-county",
      "/guides/permits-orange-county",
      "/guides/is-my-contractor-quote-fair",
    ],
    cities: ["Anaheim", "Costa Mesa", "Huntington Beach", "Irvine", "Tustin"],
  },
  "/guides/santa-ana-wind-wildfire-home-prep": {
    guides: [
      "/guides/orange-county-home-maintenance-checklist",
      "/guides/roof-replacement-cost",
      "/guides/new-homeowner-first-year-orange-county",
    ],
    cities: [
      "Yorba Linda",
      "Lake Forest",
      "Rancho Santa Margarita",
      "Laguna Beach",
      "San Clemente",
      "Anaheim",
    ],
  },
  "/guides/new-homeowner-first-year-orange-county": {
    guides: [
      "/guides/permits-orange-county",
      "/guides/hard-water-orange-county",
      "/guides/orange-county-home-maintenance-checklist",
    ],
    cities: [
      "Irvine",
      "Mission Viejo",
      "Ladera Ranch",
      "Fountain Valley",
      "Huntington Beach",
      "Aliso Viejo",
    ],
  },
  "/guides/orange-county-home-maintenance-checklist": {
    guides: [
      "/guides/santa-ana-wind-wildfire-home-prep",
      "/guides/termites-orange-county",
      "/guides/hard-water-orange-county",
    ],
    // Laguna Woods, Villa Park and Midway City were linked only from the two
    // guides merged into this one, so they moved here to keep every city
    // page reachable from a guide.
    cities: [
      "Anaheim",
      "Irvine",
      "Huntington Beach",
      "Laguna Woods",
      "Villa Park",
      "Midway City",
    ],
  },
  // New pages B, 2026-09-26 (SEO plan section 2).
  "/guides/orange-county-home-age": {
    guides: [
      "/guides/electrical-panel-upgrade-cost",
      "/guides/repipe-orange-county",
      "/guides/new-homeowner-first-year-orange-county",
    ],
    cities: [
      "Laguna Woods",
      "Seal Beach",
      "Garden Grove",
      "Buena Park",
      "La Palma",
      "Irvine",
    ],
  },
  "/guides/orange-county-home-rebates-2026": {
    guides: [
      "/guides/water-heater-replacement-cost",
      "/guides/hvac-replacement-cost",
      "/guides/orange-county-home-maintenance-checklist",
    ],
    cities: [
      "Irvine",
      "Anaheim",
      "Costa Mesa",
      "Rancho Santa Margarita",
      "Mission Viejo",
    ],
  },
  // Added 2026-09-26 (seo/new-pages-d): windows and solar.
  "/guides/window-replacement-cost-orange-county": {
    guides: [
      "/guides/permits-orange-county",
      "/guides/santa-ana-wind-wildfire-home-prep",
      "/guides/is-my-contractor-quote-fair",
    ],
    cities: [
      "Garden Grove",
      "Santa Ana",
      "Fountain Valley",
      "Huntington Beach",
      "Newport Beach",
      "Laguna Beach",
    ],
  },
  "/guides/solar-battery-orange-county": {
    guides: [
      "/guides/electrical-panel-upgrade-cost",
      "/guides/roof-replacement-cost",
      "/guides/permits-orange-county",
    ],
    cities: [
      "Anaheim",
      "Irvine",
      "Huntington Beach",
      "Fountain Valley",
      "San Clemente",
      "Mission Viejo",
    ],
  },
  // Added 2026-09-30 (seo/home-maintenance-app-2026-09-30).
  "/guides/best-home-maintenance-apps": {
    guides: [
      "/guides/orange-county-home-maintenance-checklist",
      "/guides/new-homeowner-first-year-orange-county",
      "/guides/orange-county-home-age",
    ],
    cities: [
      "Irvine",
      "Anaheim",
      "Santa Ana",
      "Huntington Beach",
      "Costa Mesa",
      "Fountain Valley",
    ],
  },
  // Added 2026-10-01 (seo/comparison-pages-2026-10-01).
  "/guides/oaktend-vs-homezada": {
    guides: [
      "/guides/best-home-maintenance-apps",
      "/guides/orange-county-home-maintenance-checklist",
      "/guides/new-homeowner-first-year-orange-county",
    ],
    cities: ["Irvine", "Tustin", "Lake Forest", "Mission Viejo"],
  },
  "/guides/oaktend-vs-angi": {
    guides: [
      "/guides/is-my-contractor-quote-fair",
      "/guides/contractor-deposit-rules-california",
      "/guides/best-home-maintenance-apps",
    ],
    cities: ["Anaheim", "Orange", "Fullerton", "Garden Grove"],
  },
  "/guides/oaktend-vs-thumbtack": {
    guides: [
      "/guides/is-my-contractor-quote-fair",
      "/guides/permits-orange-county",
      "/guides/best-home-maintenance-apps",
    ],
    cities: ["Santa Ana", "Costa Mesa", "Newport Beach", "Westminster"],
  },
};

// SOURCES. The rule, and it is not negotiable: a source is listed here only
// if someone OPENED the page and it supports a figure or a rule that is
// already on the guide. `supports` says which one, in the guide's own terms,
// so the next editor can re-check it. Never add a link because it looks
// authoritative, and never add one for a number it does not actually state.
//
// A guide with no entry simply shows no Sources section. Since 2026-09-21 all
// twelve have one: every figure left on a guide is a figure one of these pages
// states, and the figures nobody could source (OakTend's own planning ranges,
// REPLACEMENT_INFO in src/lib/health.ts) came off the guides rather than
// getting a citation that does not support them.
//
// ORANGE COUNTY HAS NO LINE OF ITS OWN in any cost survey found so far. Where
// a guide gives a price it says which market and year the source covers (Los
// Angeles 2025 for Cost vs. Value, PG&E and SDG&E territory 2022 for the panel
// study) instead of calling it an Orange County price.
//
// COST VS. VALUE REUSE RULES (jlconline.com/cost-vs-value/2025/
// re-use-and-licensing-guidelines): narrative excerpts only, never a table or
// chart; data from at most FIVE projects across everything OakTend publishes;
// the report named as "Remodeling 2025 Cost vs. Value Report
// (www.costvsvalue.com)" and the copyright line on every page that excerpts
// it. The five in use: asphalt roof, minor kitchen, major midrange kitchen,
// midrange bath, ADU. Using a sixth means dropping one of those first.
//
// Every entry below was opened and checked on 2026-09-20 or 2026-09-21,
// except the three Zone 0 entries on the wildfire guide, opened 2026-09-25,
// and the ones added to the kitchen, bathroom and ADU guides on
// 2026-09-25 (older-home rules, energy code, HOA, coastal zone, the 2026 ADU
// bills, pre-approved plans, ACS 2020-2024 housing age), which were opened
// that day or were already on this list from 2026-09-21. The city table on
// those three guides links each city's own page inline; its rules are in
// src/lib/ocRemodelCities.ts. The same goes for the entries added to the
// roof, water heater, HVAC and electrical panel guides on 2026-09-25 (housing
// age, the Energy Commission's 2025 compliance manual and climate zone list,
// city permit pages, CSLB classes, the CPSC on aluminum wiring, and rebates
// from SoCalGas, SCE and TECH Clean California, each marked with the day it
// was checked because those programs change).
export type GuideSource = {
  href: string;
  /** Link text: who publishes it and what it is. */
  label: string;
  /** The statement on the guide this page supports. */
  supports: string;
};

export const GUIDE_SOURCES: Record<string, GuideSource[]> = {
  "/guides/water-heater-replacement-cost": [
    {
      href: "https://www.irwd.com/learn/water-quality-report/",
      label:
        "Irvine Ranch Water District: water quality questions and answers",
      supports:
        "Water with 10 grains of hardness or more is generally considered hard; imported Colorado River and Northern California water is typically hard and the district's well water is moderately hard; flush the water heater once a year.",
    },
    {
      href: "https://www.nachi.org/life-expectancy.htm",
      label: "InterNACHI: standard estimated life expectancy chart for homes",
      supports:
        "A conventional water heater lasts 6 to 12 years, and the mineral content of water can shorten a water heater's life.",
    },
    {
      href: "https://www.federalregister.gov/documents/2024/05/06/2024-09209/energy-conservation-program-energy-conservation-standards-for-consumer-water-heaters",
      label:
        "U.S. Department of Energy: energy conservation standards for consumer water heaters, final rule (Federal Register, May 6, 2024)",
      supports:
        "The Department of Energy estimates an average life of around 15 years for storage water heaters.",
    },
    {
      href: "https://www.energystar.gov/products/ask-the-experts/when-should-you-replace-your-water-heater",
      label: "ENERGY STAR: when should you replace your water heater",
      supports:
        "Once a water heater is more than 10 years old it is time to consider replacing it, and the warning signs: leaks, rust in the water, running short of hot water, rumbling.",
    },
    {
      href: "https://www.energystar.gov/products/ask-the-experts/what-goes-cost-installing-heat-pump-water-heater",
      label:
        "ENERGY STAR: what goes into the cost of installing a heat pump water heater",
      supports:
        "A heat pump water heater typically costs $1,500 to $3,000 for the unit, plus $1,000 to $3,000 for installation labor and materials (national figures).",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=19211",
      label: "California Health and Safety Code section 19211",
      supports:
        "All new, replacement and existing residential water heaters must be braced, anchored, or strapped against earthquake motion, and a seller must certify it in writing.",
    },
    {
      href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency",
      label:
        "California Energy Commission: 2025 Building Energy Efficiency Standards",
      supports:
        "The 2025 Energy Code applies to permits applied for on or after January 1, 2026.",
    },
    {
      href: "https://www.energy.ca.gov/filebrowser/download/8641?fid=8641",
      label:
        "California Energy Commission: 2025 Single-Family Residential Compliance Manual, chapter 9 (additions, alterations and repairs)",
      supports:
        "Replacing the existing water heater is an alteration covered by the Energy Code; heat pump water heaters have new mandatory requirements in 2025, including ventilation when one is installed.",
    },
    {
      href: "https://santa-ana.gov/permit-faqs/",
      label:
        "City of Santa Ana: permit FAQs",
      supports:
        "Simple water heater change-outs can be issued same day, over the counter; replacing any gas or plumbing system requires a permit.",
    },
    {
      href: "https://www.cslb.ca.gov/About_Us/Library/Licensing_Classifications/",
      label:
        "Contractors State License Board: licensing classifications",
      supports:
        "C-36 is the Plumbing Contractor classification.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit must hold a valid contractor license.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Contracts_And_Binding_Agreements.aspx",
      label:
        "Contractors State License Board: contracts and binding agreements",
      supports:
        "A contract should say who gets the permits.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Finding_The_Right_Contractor.aspx",
      label:
        "Contractors State License Board: finding the right contractor",
      supports:
        "Get at least three written bids based on identical scope, and do not automatically accept the lowest bid.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,16000US0625380,16000US0629000,16000US0669000,16000US0636000,16000US0602000,16000US0651182,16000US0648256,16000US0680854,16000US0636770",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25034 (year structure built), Orange County and nine cities",
      supports:
        "Share of housing units built before 1980 (our sum of the 1979-and-earlier rows, rounded): Orange County about 57 percent, Fountain Valley 82, Garden Grove 77, Santa Ana 74, Huntington Beach 69, Anaheim 65, Newport Beach 55, Mission Viejo 52, Tustin 47, Irvine 21.",
    },
  ],
  "/guides/hvac-replacement-cost": [
    {
      href: "https://www.nachi.org/life-expectancy.htm",
      label: "InterNACHI: standard estimated life expectancy chart for homes",
      supports:
        "Life expectancy of 7 to 15 years for a central air conditioner, 10 to 15 years for a heat pump, and 15 to 25 years for a furnace.",
    },
    {
      href: "https://www.energystar.gov/saveathome/heating-cooling/replace",
      label:
        "ENERGY STAR: when is it time to replace heating and cooling equipment",
      supports:
        "A heat pump or air conditioner more than 10 years old, or a furnace or boiler more than 15 years old, is a sign it is time to consider replacing.",
    },
    {
      href: "https://www.energystar.gov/saveathome/heating-cooling",
      label: "ENERGY STAR: heat and cool efficiently",
      supports:
        "Deal with the big air leaks in the house and the duct system before investing in a new system.",
    },
    {
      href: "https://www.fema.gov/sites/default/files/2020-07/fema_tb8_corrosion_protection_metal_connectors_coastal_areas.pdf",
      label:
        "FEMA: NFIP Technical Bulletin 8, corrosion protection for metal connectors and fasteners in coastal areas (June 2019)",
      supports:
        "Salt spray carried by onshore winds significantly accelerates the corrosion of metal, is greatest within 300 to 3,000 feet of the shoreline, and has been measured as far as 5 to 10 miles inland.",
    },
    {
      href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency",
      label:
        "California Energy Commission: 2025 Building Energy Efficiency Standards",
      supports:
        "The 2025 Energy Code applies to permits applied for on or after January 1, 2026.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit must hold a valid contractor license.",
    },
    {
      href: "https://www.energy.ca.gov/filebrowser/download/8641?fid=8641",
      label:
        "California Energy Commission: 2025 Single-Family Residential Compliance Manual, chapter 9 (additions, alterations and repairs)",
      supports:
        "Replacing an existing furnace, heat pump or central air conditioner, or extending or replacing a duct system, is an alteration covered by the Energy Code; refrigerant charge verification is required for heat pumps in all climate zones and for air conditioners in climate zones 2 and 8 to 15.",
    },
    {
      href: "https://www.energy.ca.gov/media/3560",
      label:
        "California Energy Commission: building climate zones by zip code",
      supports:
        "Coastal Orange County zip codes such as Huntington Beach (92646 to 92649), Newport Beach (92660 to 92663), Costa Mesa (92626, 92627) and Fountain Valley (92708) are in climate zone 6; inland ones such as Irvine (92618, 92620), Santa Ana (92701 to 92707), Anaheim (92801 to 92808), Tustin (92780, 92782) and Mission Viejo (92691, 92692) are in climate zone 8. Checked 2026-09-25.",
    },
    {
      href: "https://www.huntingtonbeachca.gov/departments/community_development/building___inspection/permit_center/express_permitting.php",
      label:
        "City of Huntington Beach: express permitting",
      supports:
        "Express permits are simple single-family permits with no plan review; furnace and air conditioning units, new or change-outs, are submitted with the CF1R form.",
    },
    {
      href: "https://www.newportbeachca.gov/government/departments/community-development/building-division/online-permitting-ipermit",
      label:
        "City of Newport Beach: online permitting (iPermit)",
      supports:
        "Replacing a furnace is a single-scope express permit you can apply for online.",
    },
    {
      href: "https://www.cslb.ca.gov/About_Us/Library/Licensing_Classifications/",
      label:
        "Contractors State License Board: licensing classifications",
      supports:
        "C-20 is the Warm-Air Heating, Ventilating and Air-Conditioning Contractor classification.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Contracts_And_Binding_Agreements.aspx",
      label:
        "Contractors State License Board: contracts and binding agreements",
      supports:
        "A contract should say who gets the permits.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Finding_The_Right_Contractor.aspx",
      label:
        "Contractors State License Board: finding the right contractor",
      supports:
        "Get at least three written bids based on identical scope, and do not automatically accept the lowest bid.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,16000US0625380,16000US0629000,16000US0669000,16000US0636000,16000US0602000,16000US0651182,16000US0648256,16000US0680854,16000US0636770",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25034 (year structure built), Orange County and nine cities",
      supports:
        "Share of housing units built before 1980 (our sum of the 1979-and-earlier rows, rounded): Orange County about 57 percent, Fountain Valley 82, Garden Grove 77, Santa Ana 74, Huntington Beach 69, Anaheim 65, Newport Beach 55, Mission Viejo 52, Tustin 47, Irvine 21.",
    },
  ],
  "/guides/roof-replacement-cost": [
    {
      href: "https://www.jlconline.com/cost-vs-value/2025/pacific/los-angeles-ca/",
      label:
        "Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com): Los Angeles, California",
      supports:
        "An asphalt shingle roof replacement (30 squares, tear-off included) averaged $36,417 in the Los Angeles market and $31,871 nationally in 2025. The report has no separate Orange County market.",
    },
    {
      href: "https://www.nachi.org/life-expectancy.htm",
      label: "InterNACHI: standard estimated life expectancy chart for homes",
      supports:
        "Life expectancy of 20 years for 3-tab asphalt shingles, 30 years for architectural shingles, and 100 years or more for clay or concrete tile; hot climates drastically reduce asphalt shingle life.",
    },
    {
      href: "https://www.fema.gov/sites/default/files/2020-07/fema_tb8_corrosion_protection_metal_connectors_coastal_areas.pdf",
      label:
        "FEMA: NFIP Technical Bulletin 8, corrosion protection for metal connectors and fasteners in coastal areas (June 2019)",
      supports:
        "Salt spray carried by onshore winds significantly accelerates the corrosion of metal, is greatest within 300 to 3,000 feet of the shoreline, and has been measured as far as 5 to 10 miles inland.",
    },
    {
      href: "https://forecast.weather.gov/glossary.php?word=santa%20ana",
      label: "National Weather Service glossary: Santa Ana wind",
      supports:
        "Santa Ana winds are strong, hot, dust-bearing winds that descend to the Pacific coast from the inland desert regions.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit must hold a valid contractor license.",
    },
    {
      href: "https://www.energy.ca.gov/filebrowser/download/8641?fid=8641",
      label:
        "California Energy Commission: 2025 Single-Family Residential Compliance Manual, chapter 9 (additions, alterations and repairs)",
      supports:
        "Reroofing is an alteration under the Energy Code, not a repair; cool roof requirements are triggered when 50 percent or more of the roof area is replaced, with steep-slope (2:12 or steeper) cool roof criteria in climate zones 4 and 8 to 15, low-slope criteria in zones 4 and 6 to 15, and exceptions such as R-38 ceiling insulation or an attic radiant barrier.",
    },
    {
      href: "https://www.energy.ca.gov/media/3560",
      label:
        "California Energy Commission: building climate zones by zip code",
      supports:
        "Coastal Orange County zip codes such as Huntington Beach (92646 to 92649), Newport Beach (92660 to 92663), Costa Mesa (92626, 92627) and Fountain Valley (92708) are in climate zone 6; inland ones such as Irvine (92618, 92620), Santa Ana (92701 to 92707), Anaheim (92801 to 92808), Tustin (92780, 92782) and Mission Viejo (92691, 92692) are in climate zone 8. Checked 2026-09-25.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Contracts_And_Binding_Agreements.aspx",
      label:
        "Contractors State License Board: contracts and binding agreements",
      supports:
        "A contract should say who gets the permits.",
    },
    {
      href: "https://www.cslb.ca.gov/About_Us/Library/Licensing_Classifications/",
      label:
        "Contractors State License Board: licensing classifications",
      supports:
        "C-39 is the Roofing Contractor classification.",
    },
    {
      href: "https://ggcity.org/building-and-safety/obtaining-building-permit-faqs",
      label:
        "City of Garden Grove: obtaining a building permit FAQs",
      supports:
        "A permit is needed to re-roof a home.",
    },
    {
      href: "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/index.php",
      label:
        "City of Huntington Beach: Building and Safety",
      supports:
        "Permits are required for re-roofs, among other work.",
    },
    {
      href: "https://www.newportbeachca.gov/government/departments/community-development/building-division/online-permitting-ipermit",
      label:
        "City of Newport Beach: online permitting (iPermit)",
      supports:
        "Replacing your roofing is a single-scope express permit you can apply for online.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,16000US0625380,16000US0629000,16000US0669000,16000US0636000,16000US0602000,16000US0651182,16000US0648256,16000US0680854,16000US0636770",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25034 (year structure built), Orange County and nine cities",
      supports:
        "Share of housing units built before 1980 (our sum of the 1979-and-earlier rows, rounded): Orange County about 57 percent, Fountain Valley 82, Garden Grove 77, Santa Ana 74, Huntington Beach 69, Anaheim 65, Newport Beach 55, Mission Viejo 52, Tustin 47, Irvine 21.",
    },
  ],
  "/guides/electrical-panel-upgrade-cost": [
    {
      href: "https://pda.energydataweb.com/api/view/2635/Service%20Upgrades%20for%20Electrification%20Retrofits%20Study%20FINAL.pdf",
      label:
        "NV5 and Redwood Energy for PG&E: Service Upgrades for Electrification Retrofits Study, final report (May 2022)",
      supports:
        "California electricians reported panel upgrades costing $2,000 to $4,500, with an average of $2,780; totals of $3,000 to more than $18,000 once utility-side work and extras are involved; $3,000 to $10,000 for panel relocations and overhead-to-underground conversions; permit fees of $130 to $170. The study covers PG&E and SDG&E territory, not Orange County.",
    },
    {
      href: "https://www.pecanstreet.org/2021/08/panel-size/",
      label:
        "Pecan Street: residential electric panel capacity (August 2021)",
      supports:
        "Panel upgrades can range from $1,000 to $5,000 nationally, and most all-electric homes will need at least a 200-amp panel.",
    },
    {
      href: "https://www.nachi.org/life-expectancy.htm",
      label: "InterNACHI: standard estimated life expectancy chart for homes",
      supports: "Life expectancy of about 60 years for a service panel.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 2024, table B25034 (year structure built), Orange County",
      supports:
        "Share of Orange County housing units by decade built: about 12 percent in the 1950s, 19 percent in the 1960s, and 22 percent in the 1970s.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit must hold a valid contractor license.",
    },
    {
      href: "https://www.cpsc.gov/s3fs-public/516.pdf",
      label:
        "U.S. Consumer Product Safety Commission: Repairing Aluminum Wiring, Publication 516 (June 2011)",
      supports:
        "Homes built before 1965 are unlikely to have aluminum branch circuit wiring; wiring installed between 1965 and the mid 1970s may be aluminum; a survey for CPSC found homes built before 1972 and wired with aluminum were 55 times more likely than copper-wired homes to have a connection at an outlet reach fire hazard conditions; failing connections seldom give warning signs.",
    },
    {
      href: "https://www.anaheim.net/3472/Residential-Electrical-Panel-Upgrade",
      label:
        "City of Anaheim: residential electrical panel upgrade",
      supports:
        "A residential panel upgrade up to 200 amps takes an electrical permit that can be obtained online, and Anaheim Public Utilities' meter spot report must be on site at the Building Division inspection. Re-checked 2026-10-01: call Anaheim Public Utilities at 714-765-6847 for a meter spot inspection, an inspector calls within 2-3 business days with the report; permit $126 with a $167 minimum permit fee; inspections for the electrical service meter and electrical final.",
    },
    {
      href: "https://santa-ana.gov/permit-faqs/",
      label:
        "City of Santa Ana: permit FAQs",
      supports:
        "Residential service meter upgrades can be issued same day, over the counter.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2622",
      label:
        "California Assembly Bill 2622 (2023-2024)",
      supports:
        "The small-job license exemption does not apply to work that needs a building permit.",
    },
    // Added 2026-10-01 for the electrical panel upgrade retarget, each opened
    // that day.
    {
      href: "https://www.sce.com/partners/consulting-services/building-renovations-planning-project-requests",
      label:
        "Southern California Edison: building, renovation and project planning requests",
      supports:
        "Panel upgrades (or meter spots) for an existing service are submitted online through the Building, Renovation, and Project Planning Portal; load management, energy-efficient equipment or design adjustments may support new loads without increasing service size; the Common Facility Cost Treatment Program, a 4-year CPUC-authorized pilot, offers single-family homes up to $10,000 toward utility-side costs, for panels under 100 amps going to no more than 200 amps in low-income, income-based or equity electrification programs that replace gas appliances with heat pumps and electrify at least two major end uses.",
    },
    {
      href: "https://www.sce.com/sites/default/files/custom-files/PDF_Files/Overview-of-the-Energization-Process-and-Project-Timing.pdf",
      label:
        "Southern California Edison: Energization Process Steps and Project Timing",
      supports:
        "SCE reviews an application in an average of 10 business days and a maximum of 45, and the clock starts once the application is deemed complete; main panel upgrade work fully under SCE's control is targeted at an average of 30 business days and a maximum of 45.",
    },
    {
      href: "https://evhome.sce.com/",
      label: "Southern California Edison: Charge Ready Home program",
      supports:
        "Up to $4,200 for an electrical panel upgrade and EV outlet installation, or up to $1,000 for an EV outlet only where the panel is already 200 amps or more; for income-qualified households or residents of disadvantaged communities in SCE territory; eligible customers can apply today.",
    },
    {
      href: "https://www.sce.com/clean-energy-efficiency/electric-vehicles/charging-your-ev",
      label: "Southern California Edison: charging your EV",
      supports:
        "Residential customers can call 1-800-4EV-INFO for a Home Fuel Advisor and an EV Power Plan; it is a good idea to have an electrician inspect your wiring before your first charge, even with a Level 1 cord.",
    },
    {
      href: "https://www.fountainvalley.gov/398/Plan-Check-Center",
      label: "City of Fountain Valley: Plan Check Center, expedited permits",
      supports: "Panel Upgrade (200 amp) is on the expedited permits list.",
    },
    {
      href: "https://www.nfpa.org/downloadable-resources/safety-tip-sheets/electrical-safety-tip-sheet",
      label: "National Fire Protection Association: Electrical Safety tip sheet (2018)",
      supports:
        "Call a qualified electrician for frequent blown fuses or tripped breakers, a tingle when touching an appliance, discolored or warm outlets, a burning or rubbery smell, flickering or dimming lights, or sparks from an outlet.",
    },
    {
      href: "https://www.cslb.ca.gov/About_Us/Library/Licensing_Classifications/Licensing_Classifications_Detail.aspx?Class=C10",
      label: "Contractors State License Board: C-10 Electrical Contractor classification",
      supports:
        "A C-10 electrical contractor places, installs, erects or connects electrical wires, fixtures, appliances and apparatus.",
    },
    {
      href: "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx",
      label: "Contractors State License Board: check a license",
      supports: "Look up a contractor's license number, status and classifications.",
    },
    {
      href: "https://www.dgs.ca.gov/BSC/Codes",
      label: "California Building Standards Commission: codes",
      supports:
        "The 2025 California Building Standards Code (Title 24) took effect January 1, 2026; the California Electrical Code (Part 3) is based on the NFPA model code.",
    },
    {
      href: "https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit",
      label: "IRS: energy efficient home improvement credit",
      supports:
        "Panelboards of 200 amps or more supporting qualifying property were eligible up to $600, for property placed in service on or after January 1, 2023 and before December 31, 2025.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Contracts_And_Binding_Agreements.aspx",
      label:
        "Contractors State License Board: contracts and binding agreements",
      supports:
        "A contract should say who gets the permits.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,16000US0625380,16000US0629000,16000US0669000,16000US0636000,16000US0602000,16000US0651182,16000US0648256,16000US0680854,16000US0636770",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25034 (year structure built), Orange County and nine cities",
      supports:
        "Share of housing units built before 1980 (our sum of the 1979-and-earlier rows, rounded): Orange County about 57 percent, Fountain Valley 82, Garden Grove 77, Santa Ana 74, Huntington Beach 69, Anaheim 65, Newport Beach 55, Mission Viejo 52, Tustin 47, Irvine 21.",
    },
  ],
  "/guides/kitchen-remodel-cost": [
    {
      href: "https://www.jlconline.com/cost-vs-value/2025/pacific/los-angeles-ca/",
      label:
        "Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com): Los Angeles, California",
      supports:
        "A minor midrange kitchen remodel averaged $29,765 in the Los Angeles market ($28,458 nationally) and recouped 126.9 percent at resale; a major midrange remodel averaged $86,214 ($82,793 nationally) and recouped 56.9 percent. Both describe a 200 square foot kitchen, 2025. The report has no separate Orange County market.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,16000US0625380,16000US0629000,16000US0669000,16000US0636000,16000US0602000,16000US0651182,16000US0648256,16000US0680854,16000US0636770",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25034 (year structure built), Orange County and nine cities",
      supports:
        "Share of housing units built before 1980 (our sum of the 1979-and-earlier rows, rounded): Orange County about 57 percent, Fountain Valley 82, Garden Grove 77, Santa Ana 74, Huntington Beach 69, Anaheim 65, Newport Beach 55, Mission Viejo 52, Tustin 47, Irvine 21.",
    },
    {
      href: "https://www.dir.ca.gov/title8/1529.html",
      label:
        "Cal/OSHA: California Code of Regulations, Title 8, section 1529 (asbestos in construction)",
      supports:
        "Thermal system insulation and surfacing material, such as acoustical plaster on ceilings, in buildings constructed no later than 1980 is presumed to contain asbestos.",
    },
    {
      href: "https://www.epa.gov/lead/lead-renovation-repair-and-painting-program",
      label:
        "U.S. EPA: Lead Renovation, Repair and Painting Program",
      supports:
        "Anyone paid to disturb painted surfaces in homes built before 1978 must be certified and follow lead-safe work practices.",
    },
    {
      href: "https://www.dir.ca.gov/title8/1532_1.html",
      label:
        "Cal/OSHA: California Code of Regulations, Title 8, section 1532.1 (lead in construction)",
      supports:
        "California's lead standard covers alteration, repair and renovation of structures that contain lead, with state certification for some residential lead work.",
    },
    {
      href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency",
      label:
        "California Energy Commission: 2025 Building Energy Efficiency Standards",
      supports:
        "The 2025 Energy Code applies to permits applied for on or after January 1, 2026, and expands the use of heat pumps in newly built homes.",
    },
    {
      href: "https://www.coastal.ca.gov/maps/czb/",
      label:
        "California Coastal Commission: coastal zone boundary maps",
      supports:
        "Where to check whether a lot is near or inside the coastal zone, with the Commission's warning that the digital maps may not replace a formal boundary determination.",
    },
  ],
  "/guides/bathroom-remodel-cost": [
    {
      href: "https://www.jlconline.com/cost-vs-value/2025/pacific/los-angeles-ca/",
      label:
        "Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com): Los Angeles, California",
      supports:
        "A midrange remodel of a 5 by 7 foot bathroom averaged $27,143 in the Los Angeles market ($26,138 nationally) and recouped 89.6 percent at resale, 2025. The report has no separate Orange County market.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,16000US0625380,16000US0629000,16000US0669000,16000US0636000,16000US0602000,16000US0651182,16000US0648256,16000US0680854,16000US0636770",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25034 (year structure built), Orange County and nine cities",
      supports:
        "Share of housing units built before 1980 (our sum of the 1979-and-earlier rows, rounded): Orange County about 57 percent, Fountain Valley 82, Garden Grove 77, Santa Ana 74, Huntington Beach 69, Anaheim 65, Newport Beach 55, Mission Viejo 52, Tustin 47, Irvine 21.",
    },
    {
      href: "https://www.irwd.com/learn/water-quality-report/",
      label:
        "Irvine Ranch Water District: water quality questions and answers",
      supports:
        "Imported water is typically hard, and the higher mineral content leaves white spots on glassware.",
    },
    {
      href: "https://www.dir.ca.gov/title8/1529.html",
      label:
        "Cal/OSHA: California Code of Regulations, Title 8, section 1529 (asbestos in construction)",
      supports:
        "Thermal system insulation and surfacing material, such as acoustical plaster on ceilings, in buildings constructed no later than 1980 is presumed to contain asbestos.",
    },
    {
      href: "https://www.epa.gov/lead/lead-renovation-repair-and-painting-program",
      label:
        "U.S. EPA: Lead Renovation, Repair and Painting Program",
      supports:
        "Anyone paid to disturb painted surfaces in homes built before 1978 must be certified and follow lead-safe work practices.",
    },
    {
      href: "https://www.dir.ca.gov/title8/1532_1.html",
      label:
        "Cal/OSHA: California Code of Regulations, Title 8, section 1532.1 (lead in construction)",
      supports:
        "California's lead standard covers alteration, repair and renovation of structures that contain lead, with state certification for some residential lead work.",
    },
    {
      href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency",
      label:
        "California Energy Commission: 2025 Building Energy Efficiency Standards",
      supports:
        "The 2025 Energy Code applies to permits applied for on or after January 1, 2026, and expands the use of heat pumps in newly built homes.",
    },
    {
      href: "https://www.coastal.ca.gov/maps/czb/",
      label:
        "California Coastal Commission: coastal zone boundary maps",
      supports:
        "Where to check whether a lot is near or inside the coastal zone, with the Commission's warning that the digital maps may not replace a formal boundary determination.",
    },
  ],
  "/guides/adu-cost": [
    {
      href: "https://www.jlconline.com/cost-vs-value/2025/pacific/los-angeles-ca/",
      label:
        "Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com): Los Angeles, California",
      supports:
        "A new 660 square foot, one-story detached ADU averaged $178,536 in the Los Angeles market ($166,406 nationally) and recouped 39.9 percent at resale, 2025. The report has no separate Orange County market.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66317",
      label: "California Government Code section 66317",
      supports:
        "The city must approve or deny a complete ADU application within 60 days, without a hearing, or it is deemed approved.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66321",
      label: "California Government Code section 66321",
      supports:
        "A city cannot cap ADU size below 850 square feet, or 1,000 square feet with more than one bedroom.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66315",
      label: "California Government Code section 66315",
      supports:
        "A local agency may not add an owner-occupancy requirement for an ADU.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=65852.27",
      label: "California Government Code section 65852.27",
      supports:
        "Every city and county had to set up a program for pre-approved ADU plans by January 1, 2025.",
    },
    {
      href: "https://pwds.oc.gov/service-areas/oc-development-services/planning-development/accessory-dwelling-units",
      label:
        "County of Orange, OC Development Services: accessory dwelling units",
      supports:
        "In unincorporated Orange County, ADU applications are processed ministerially and only require a building permit, and the county publishes pre-approved ADU plans.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit, or for work valued at $1,000 or more in combined labor and materials, must hold a valid contractor license.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB543",
      label:
        "California Senate Bill 543 (2025-2026), chaptered text (Chapter 520, approved October 10, 2025)",
      supports:
        "No impact fee on an ADU with 750 square feet or less of interior livable space or a junior ADU of 500 square feet or less; above 750 square feet, impact fees are proportional to the primary dwelling; units under 500 square feet of interior livable space are treated as not triggering school fees.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66333",
      label:
        "California Government Code section 66333 (as amended by AB 1154, effective January 1, 2026)",
      supports:
        "Owner-occupancy may be required for a junior ADU only when it shares sanitation facilities with the home, and a junior ADU rental must be for a term longer than 30 days.",
    },
    {
      href: "https://www.bwslaw.com/insights/public-law-update-2025-adu-legislative-update/",
      label:
        "Burke, Williams & Sorensen (law firm): 2025 ADU legislative update (December 15, 2025)",
      supports:
        "SB 543 takes effect January 1, 2026 with its fee limits in effect from October 10, 2025; under AB 462 an ADU coastal development permit runs concurrently and is deemed approved if not acted on within 60 days, and a detached ADU may get its certificate of occupancy before a primary dwelling destroyed in an emergency proclamation area.",
    },
    {
      href: "https://www.hcd.ca.gov/sites/default/files/docs/planning-and-community/lot-splits-and-duplexes-sb-9.pdf",
      label:
        "California Department of Housing and Community Development: Duplexes and Lot Splits (SB 9) fact sheet (April 2026)",
      supports:
        "A qualifying single-family lot in an urbanized area can be split into two lots of roughly equal size with up to two units on each, ministerially; a complete application is decided within 60 days; the applicant signs a three-year owner-occupancy affidavit; rentals must be longer than 30 days; exceptions include homes with a tenant in the last three years.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4751",
      label:
        "California Civil Code section 4751",
      supports:
        "HOA rules that effectively prohibit or unreasonably restrict an ADU or junior ADU on a single-family lot are void and unenforceable.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,16000US0625380,16000US0629000,16000US0669000,16000US0636000,16000US0602000,16000US0651182,16000US0648256,16000US0680854,16000US0636770",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25034 (year structure built), Orange County and nine cities",
      supports:
        "Share of housing units built before 1980 (our sum of the 1979-and-earlier rows, rounded): Orange County about 57 percent, Fountain Valley 82, Garden Grove 77, Santa Ana 74, Huntington Beach 69, Anaheim 65, Newport Beach 55, Mission Viejo 52, Tustin 47, Irvine 21.",
    },
    {
      href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency",
      label:
        "California Energy Commission: 2025 Building Energy Efficiency Standards",
      supports:
        "The 2025 Energy Code applies to permits applied for on or after January 1, 2026, and expands the use of heat pumps in newly built homes.",
    },
    {
      href: "https://www.huntingtonbeachca.gov/departments/community_development/planning_zoning/accessory_dwelling_units_(adus).php",
      label:
        "City of Huntington Beach: accessory dwelling units",
      supports:
        "Development in Huntington Beach's coastal zone may require a coastal development permit; the city's pre-approved ADU plan is a one-story, detached 490 square foot unit.",
    },
    {
      href: "https://www.coastal.ca.gov/maps/czb/",
      label:
        "California Coastal Commission: coastal zone boundary maps",
      supports:
        "Where to check whether a lot is near or inside the coastal zone, with the Commission's warning that the digital maps may not replace a formal boundary determination.",
    },
    {
      href: "https://cityofirvine.gov/building-permits-and-inspections/pre-approved-adu-plans-program",
      label:
        "City of Irvine: ADU Standard Plan Program",
      supports:
        "Irvine offers pre-approved architectural and structural ADU plans designed by licensed professionals.",
    },
    {
      href: "https://santa-ana.gov/pre-approved-adu-plans/",
      label:
        "City of Santa Ana: Pre-Approved ADU Plans",
      supports:
        "Santa Ana offers pre-approved studio, one-bedroom and two-bedroom detached ADU plans.",
    },
    {
      href: "https://www.anaheim.net/6351/Pre-Approved-Plan-Catalogue",
      label:
        "City of Anaheim: Pre-Approved Plan Catalogue (ADU Express)",
      supports:
        "Anaheim offers four free pre-approved ADU plans, from a 224 square foot studio to a 1,199 square foot three-bedroom unit.",
    },
    {
      href: "https://newportbeachadu.org/adu-plans-2",
      label:
        "City of Newport Beach: ADU standard plans",
      supports:
        "Newport Beach offers five standard ADU plans already reviewed by Building and Planning: three detached plans and two garage conversions.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.5",
      label:
        "California Business and Professions Code section 7159.5",
      supports:
        "The down payment cap: $1,000 or 10 percent of the contract amount, whichever is less.",
    },
  ],
  // Added 2026-09-26 (SEO plan section 2, new pages A). Every entry was
  // opened and checked that day.
  "/guides/garage-conversion-vs-adu-orange-county": [
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66313",
      label:
        "California Government Code section 66313",
      supports:
        "An ADU provides complete independent living facilities on a lot with a primary residence; a junior ADU is no more than 500 square feet of interior livable space and contained entirely within a single-family residence.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66314",
      label:
        "California Government Code section 66314",
      supports:
        "An ADU may be within or attached to the home, including an attached garage, or detached, including a detached garage (d)(3); no setback for an existing structure converted to an ADU, and no more than 4 feet side and rear for a new one (d)(7); no replacement of parking when a garage, carport or parking space is converted to or demolished for an ADU (d)(11); no fire sprinklers if the primary residence is not required to have them (d)(12).",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66317",
      label:
        "California Government Code section 66317 (as amended by SB 543, effective January 1, 2026)",
      supports:
        "ADU approval is ministerial with no hearing; the permitting agency has 15 business days to give written notice whether an application is complete; it must approve or deny within 60 days of a complete application when a dwelling exists, or the application is deemed approved; a denial comes with written comments; there is a written appeal process.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66321",
      label:
        "California Government Code section 66321",
      supports:
        "A city cannot cap ADU size below 850 square feet, or 1,000 square feet with more than one bedroom.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66322",
      label:
        "California Government Code section 66322",
      supports:
        "No parking standards for an ADU within one-half mile walking distance of public transit, or one that is part of the proposed or existing primary residence or an accessory structure, among other cases.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66323",
      label:
        "California Government Code section 66323",
      supports:
        "A city must ministerially approve any combination of one ADU and one junior ADU within the existing space of a single-family dwelling or accessory structure (up to 150 square feet of expansion of an accessory structure, limited to ingress and egress; exterior access; setbacks sufficient for fire and safety) and one detached new ADU with 4-foot side and rear setbacks, which a city may limit to no less than 800 square feet.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=66333",
      label:
        "California Government Code section 66333 (as amended by AB 1154, effective January 1, 2026)",
      supports:
        "A junior ADU needs a separate entrance and an efficiency kitchen; enclosed uses within the residence, such as attached garages, are part of the residence; owner-occupancy may be required only when the junior ADU shares sanitation facilities; a junior ADU rental must be for more than 30 days.",
    },
    {
      href: "https://www.hcd.ca.gov/sites/default/files/docs/policy-and-research/adu-handbook-update.pdf",
      label:
        "California Department of Housing and Community Development: Accessory Dwelling Unit Handbook (March 2026)",
      supports:
        "No parking may be required for a junior ADU, even when converted from an attached garage; junior ADUs are not allowed in detached accessory structures and only one is allowed per lot; ADU conversions are subject to all applicable building, health and safety, and fire standards for dwellings; the 150 square foot expansion example is a stairwell; ADU parking may not exceed one space per unit or bedroom; a demolition permit for a detached garage replaced by an ADU is issued at the same time as the ADU permit.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB543",
      label:
        "California Senate Bill 543 (2025-2026), chaptered text (Chapter 520, approved October 10, 2025)",
      supports:
        "No impact fee on an ADU with 750 square feet or less of interior livable space or a junior ADU of 500 square feet or less; above 750 square feet, impact fees are proportional to the primary dwelling; units under 500 square feet of interior livable space are treated as not triggering school fees.",
    },
    {
      href: "https://newportbeachadu.org/adu-plans-2",
      label:
        "City of Newport Beach: ADU standard plans",
      supports:
        "Newport Beach offers five pre-reviewed standard ADU plans: three detached units and two garage conversions (Plan 4, one-car garage; Plan 5, two-car garage); supplemental items such as a site plan and Title 24 energy analysis are still required.",
    },
    {
      href: "https://www.jlconline.com/cost-vs-value/2025/pacific/los-angeles-ca/",
      label:
        "Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com): Los Angeles, California",
      supports:
        "A new 660 square foot, one-story detached ADU averaged $178,536 in the Los Angeles market in 2025. The report has no separate Orange County market.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4751",
      label:
        "California Civil Code section 4751",
      supports:
        "HOA rules that effectively prohibit or unreasonably restrict an ADU or junior ADU on a single-family lot are void and unenforceable; reasonable restrictions are allowed.",
    },
  ],
  "/guides/slab-leak-signs": [
    {
      href: "https://www.nachi.org/life-expectancy.htm",
      label: "InterNACHI: standard estimated life expectancy chart for homes",
      supports: "Life expectancy of 50 to 70 years for copper water lines.",
    },
    {
      href: "https://www.epa.gov/watersense/fix-leak-week",
      label: "U.S. EPA WaterSense: Fix a Leak Week",
      supports:
        "The two-hour water meter test, and the 12,000 gallons a month winter threshold for a family of four.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 2024, table B25034 (year structure built), Orange County",
      supports:
        "Share of Orange County housing units by decade built: about 12 percent in the 1950s, 19 percent in the 1960s, and 22 percent in the 1970s.",
    },
  ],
  "/guides/is-my-contractor-quote-fair": [
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159",
      label: "California Business and Professions Code section 7159",
      supports:
        "A home improvement contract over $500 must be in writing and include the contractor's name, business address and license number, approximate start and completion dates, and a schedule of progress payments; a contractor may not collect payment for work not yet completed or materials not yet delivered.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.5",
      label: "California Business and Professions Code section 7159.5",
      supports:
        "The down payment cap: $1,000 or 10 percent of the contract amount, whichever is less.",
    },
  ],
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
        "A home improvement contract over $500 must be in writing and signed, and a contractor may not collect payment for work not yet completed or materials not yet delivered.",
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
    {
      href: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2622",
      label: "California Assembly Bill 2622 (2023-2024)",
      supports:
        "Assembly Bill 2622 raised the license exemption from under $500 to under $1,000.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit, or for work valued at $1,000 or more in combined labor and materials, must hold a valid contractor license.",
    },
  ],
  "/guides/permits-orange-county": [
    {
      href: "https://cityofirvine.gov/community-development/permits-not-required",
      label: "City of Irvine: permits not required",
      supports:
        "Irvine exempts fences not over 7 feet, sheds of 120 square feet or less and retaining walls not over 4 feet, says patio covers need a permit regardless of size, says exempt work must still meet code, and tells residents to check their HOA's CC&Rs.",
    },
    {
      href: "https://www.fountainvalley.gov/397/Building-Permits",
      label: "City of Fountain Valley: building permits",
      supports:
        "When permits are required in Fountain Valley, and its exempt list: fences not over 6 feet, block walls not over 3 feet, sheds of 120 square feet with a ceiling not over 7 feet, retaining walls not over 4 feet, and finish work.",
    },
    {
      href: "https://www.fountainvalley.gov/398/Plan-Check-Center",
      label: "City of Fountain Valley: Plan Check Center, expedited permits",
      supports:
        "Fountain Valley's expedited permits: residential reroof, water heater change-out, residential repipe, 200 amp panel upgrade, furnace and AC change-out, and city standard patio cover.",
    },
    {
      href: "https://www.fountainvalley.gov/DocumentCenter/View/488",
      label: "City of Fountain Valley: water heater handout",
      supports:
        "Earthquake straps in the top and bottom third of the tank, a relief valve drain piped to the outside, and a burner at least 18 inches above a garage floor.",
    },
    {
      href: "https://www.fountainvalley.gov/DocumentCenter/View/481",
      label: "City of Fountain Valley: re-roofing requirements",
      supports:
        "Final inspections are always required on a reroof, and sheathing is inspected when it is replaced or filled in.",
    },
    {
      href: "https://www.fountainvalley.gov/DocumentCenter/View/465",
      label: "City of Fountain Valley: heating and air conditioning requirements",
      supports:
        "A mechanical system may not be installed or replaced without a permit, outdoor equipment needs a site plan, and HOA approval is required in an HOA tract.",
    },
    {
      href: "https://www.fountainvalley.gov/1603/After-the-Fact-Permit-Process",
      label: "City of Fountain Valley: after-the-fact permit process",
      supports:
        "Work done without a permit can go through an after-the-fact process, under the code in effect at application, and compliance is the property owner's responsibility.",
    },
    {
      href: "https://www.yorbalindaca.gov/481/Permit-Exceptions",
      label: "City of Yorba Linda: permit exceptions",
      supports:
        "Yorba Linda's building, electrical, mechanical and plumbing exemption lists, including 6 foot wood fences, 3 foot masonry fences, and like-for-like breaker replacement.",
    },
    {
      href: "https://www.yorbalindaca.gov/DocumentCenter/View/5807",
      label: "City of Yorba Linda: plumbing project exemptions",
      supports:
        "Stopping leaks and swapping a toilet, sink, disposal or dishwasher need no permit, but replacing a defective concealed pipe with new material is new work that does.",
    },
    {
      href: "https://ggcity.org/index.php/building-and-safety/obtaining-building-permit-faqs",
      label: "City of Garden Grove: obtaining a building permit FAQ",
      supports:
        "Garden Grove requires permits for reroofs and masonry fences over 36 inches, advises having the contractor obtain the permit, and warns about financing and insurance when permits were skipped.",
    },
    {
      href: "https://santa-ana.gov/pbx-express-permit/",
      label: "City of Santa Ana: PBx Same Day Express Permit Program",
      supports:
        "Santa Ana issues water heater, like-for-like reroof, service meter, and residential repipe permits the same day without plan check.",
    },
    {
      href: "https://www.newportbeachca.gov/government/departments/community-development/building-division/permit-history-by-address-modifications",
      label: "City of Newport Beach: permit history by address",
      supports:
        "Newport Beach offers archived permit history by address online.",
    },
    {
      href: "https://pwds.oc.gov/",
      label: "OC Public Works: OC Development Services",
      supports:
        "OC Development Services handles permit processing and inspections for projects in the County's unincorporated areas.",
    },
    {
      href: "https://www.energy.ca.gov/programs-and-topics/programs/home-energy-rating-system-hers-program",
      label: "California Energy Commission: Home Energy Rating System program",
      supports:
        "Energy code testing may be mandatory depending on the work, properly permitted work triggers it, and a homeowner may hire a rater who is independent of the contractor.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=13113.7",
      label: "California Health and Safety Code section 13113.7",
      supports:
        "A permit for work over $1,000 cannot be signed off until the home has approved smoke alarms.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7110",
      label: "California Business and Professions Code section 7110",
      supports:
        "Willful disregard of building laws is cause for discipline against a licensed contractor.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Know_Risks_Of_Owner_-_Builder/",
      label: "Contractors State License Board: owner-builder risks",
      supports:
        "The board's warning to be wary of consultants or unlicensed individuals who talk homeowners into becoming an owner-builder.",
    },
  ],
  // Added 2026-09-26 (SEO plan section 2, new pages A). Every entry was
  // opened and checked that day.
  "/guides/hoa-coastal-commission-remodel-orange-county": [
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4000",
      label:
        "California Civil Code section 4000",
      supports:
        "The Civil Code part governing associations is the Davis-Stirling Common Interest Development Act.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4760",
      label:
        "California Civil Code section 4760",
      supports:
        "Any change in the exterior appearance of a separate interest must follow the governing documents and applicable law.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4765",
      label:
        "California Civil Code section 4765",
      supports:
        "Where governing documents require approval of a physical change: a fair, reasonable and expeditious written procedure with prompt deadlines and a maximum response time; decisions in good faith, not unreasonable, arbitrary or capricious, and not violating law or the building code; decisions in writing, with a denial explaining why and how to seek reconsideration; reconsideration by the board at an open meeting; an annual notice to members of what needs approval and the procedure.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4751",
      label:
        "California Civil Code section 4751",
      supports:
        "HOA rules that effectively prohibit or unreasonably restrict an ADU or junior ADU on a single-family lot are void and unenforceable; reasonable restrictions are allowed.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=714.3",
      label:
        "California Civil Code section 714.3",
      supports:
        "Restrictions that effectively prohibit or unreasonably restrict an ADU or junior ADU on a single-family lot are void; reasonable restrictions shall not include any fees or other financial requirements.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=714",
      label:
        "California Civil Code section 714",
      supports:
        "A restriction that effectively prohibits or restricts a solar energy system is void; an association must decide in writing, and an application not denied in writing within 45 days is deemed approved unless the delay is a reasonable request for more information.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4745",
      label:
        "California Civil Code section 4745",
      supports:
        "An association cannot effectively prohibit or unreasonably restrict an EV charging station in an owner's unit or designated parking space; an application not denied in writing within 60 days is deemed approved unless the delay is a reasonable request for more information.",
    },
    {
      href: "https://www.hcd.ca.gov/sites/default/files/docs/policy-and-research/adu-handbook-update.pdf",
      label:
        "California Department of Housing and Community Development: Accessory Dwelling Unit Handbook (March 2026)",
      supports:
        "Examples of an HOA effectively prohibiting an ADU include any delay in review beyond the timeframes required of local agencies (60 days).",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PRC&sectionNum=30600",
      label:
        "California Public Resources Code section 30600 (Coastal Act)",
      supports:
        "Anyone performing development in the coastal zone must obtain a coastal development permit, in addition to any other permit required by law.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PRC&sectionNum=30106",
      label:
        "California Public Resources Code section 30106 (Coastal Act)",
      supports:
        "Development includes placing or erecting any structure, grading, and construction, reconstruction, demolition, or alteration of the size of any structure.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PRC&sectionNum=30519",
      label:
        "California Public Resources Code section 30519 (Coastal Act)",
      supports:
        "Once a local coastal program is certified, permit authority over new development is delegated to the local government, except for appeals and for tidelands, submerged lands and public trust lands.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PRC&sectionNum=30603",
      label:
        "California Public Resources Code section 30603 (Coastal Act)",
      supports:
        "After certification, a local coastal permit decision can be appealed to the Commission for development between the sea and the first public road, within 300 feet of a beach, within 100 feet of a wetland or stream, or within 300 feet of the top of a coastal bluff, among others.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PRC&sectionNum=30610",
      label:
        "California Public Resources Code section 30610 (Coastal Act)",
      supports:
        "No coastal development permit is needed for improvements to existing single-family residences, except classes the Commission specifies by regulation, or for repair and maintenance that does not enlarge or expand the structure.",
    },
    {
      href: "https://www.law.cornell.edu/regulations/california/14-CCR-13250",
      label:
        "California Code of Regulations, title 14, section 13250 (Cornell Legal Information Institute)",
      supports:
        "Garages, pools, fences and sheds are part of a single-family residence for the exemption, but guest houses and self-contained residential units are not; improvements still need a permit on a beach, in a wetland, seaward of mean high tide, in an environmentally sensitive habitat area, in a highly scenic area, or within 50 feet of a bluff edge; between the sea and the first public road or within 300 feet of a beach, a 10 percent or larger floor area increase, a height increase over 10 percent, or a significant non-attached structure such as a garage, fence or shoreline protective works; or where the original permit said future improvements need one.",
    },
    {
      href: "https://documents.coastal.ca.gov/assets/rflg/LCPStatusSummaryChart.pdf",
      label:
        "California Coastal Commission: Summary of LCP Program Activity and LCP Status Chart, FY 2023-24 (October 9, 2024)",
      supports:
        "Year effectively certified: Huntington Beach 1985, Newport Beach 2017, Irvine 1982, Laguna Beach 1993, Laguna Niguel 1990, Dana Point 1989; Seal Beach and San Clemente listed with no certified LCP; uncertified areas include Huntington Beach's Sunset Beach annexation, Newport Banning Ranch and the Newport Coast annexation, and Laguna Beach's Hobo Canyon, Three Arch Bay, Blue Lagoon and Irvine Cove; the Commission keeps permit authority in uncertified areas.",
    },
    {
      href: "https://documents.coastal.ca.gov/reports/2026/5/w8c/w8c-5-2026-report.pdf",
      label:
        "California Coastal Commission: staff report, application 5-25-0754, Seal Beach (hearing May 13, 2026)",
      supports:
        "A Seal Beach single-family remodel with first and second floor additions went to the Commission because the City of Seal Beach does not have a certified Local Coastal Program.",
    },
    {
      href: "https://www.newportbeachca.gov/government/departments/community-development-/planning-division/local-coastal-program-launch-page/faq",
      label:
        "City of Newport Beach: Local Coastal Program FAQ",
      supports:
        "Newport Beach's LCP was certified effective January 30, 2017 and the city issues most coastal permits; the categorical exclusion removes single-unit and two-unit projects from the permit requirement except the first row of shoreline lots and the Bay Shores community; approvals in appeal areas can be appealed to the Commission.",
    },
    {
      href: "https://www.sanclemente.gov/295/Coastal-Planning",
      label:
        "City of San Clemente: Coastal Planning",
      supports:
        "The Commission certified San Clemente's LCP Land Use Plan update on August 10, 2018; the Implementation Plan is still being drafted, so the city does not yet have a fully certified LCP.",
    },
    {
      href: "https://www.coastal.ca.gov/maps/czb/",
      label:
        "California Coastal Commission: coastal zone boundary maps",
      supports:
        "Where to check whether a lot is near or inside the coastal zone, with the Commission's warning that the digital maps may not replace a formal boundary determination.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB462",
      label:
        "California Assembly Bill 462 (2025-2026), chaptered text (Chapter 491, approved October 10, 2025, urgency statute)",
      supports:
        "Takes effect immediately; amends Government Code section 66329: the local government approves or denies an ADU coastal development permit within 60 days of a complete application, concurrently with the ADU review and without public hearings, and that decision is not appealable under section 30603; without a certified LCP, the Commission has 60 days or the application is deemed approved, unless the ADU is filed with a new dwelling.",
    },
  ],
  "/guides/hard-water-orange-county": [
    {
      href: "https://www.usgs.gov/water-science-school/science/hardness-water",
      label: "U.S. Geological Survey: Hardness of Water",
      supports:
        "The four hardness bands (soft to very hard, in milligrams per liter), and that heated hard water forms scale that can shorten equipment life, raise heating costs and clog pipes.",
    },
    {
      href: "https://www.fountainvalley.gov/DocumentCenter/View/24438",
      label: "City of Fountain Valley: 2026 Water Quality Report",
      supports:
        "Fountain Valley local groundwater hardness: average 217 ppm, range 171 to 256, or 13 grains per gallon.",
    },
    {
      href: "https://www.newportbeachca.gov/home/showpublisheddocument/78695/639150596746970000",
      label: "City of Newport Beach: 2026 Annual Water Quality Report",
      supports:
        "Newport Beach groundwater hardness: average 232 ppm, range 47.5 to 475. Metropolitan imported water: average 236 ppm, range 191 to 280, or 14 grains per gallon.",
    },
    {
      href: "https://www.mesawater.org/sites/default/files/2026-06/final2026consumerconfidencereport.pdf",
      label: "Mesa Water District: 2026 Consumer Confidence Report",
      supports:
        "Mesa Water groundwater hardness: average 113 ppm, range 20.6 to 293, or 6.6 grains per gallon.",
    },
    {
      href: "https://smwd.com/DocumentCenter/View/6349/2026-Water-Quality-Report",
      label: "Santa Margarita Water District: 2026 Water Quality Report",
      supports:
        "Santa Margarita hardness: average 256 mg/L, range 210 to 300, or 15 grains per gallon, and a supply of imported, treated surface water.",
    },
    {
      href: "https://www.ylwd.com/services/your-water/water-quality/water-quality-faq/",
      label: "Yorba Linda Water District: water quality FAQ",
      supports:
        "Imported water averages 18 grains of hardness and the district's well water averages 20, and the district discourages self-regenerating softeners.",
    },
    {
      href: "https://www.irwd.com/learn/water-quality-report/",
      label: "Irvine Ranch Water District: water quality report and FAQ",
      supports:
        "Imported water is typically hard and well water moderately hard, hardness does not affect safety, and the district discourages self-regenerating softeners because brine is not removed when wastewater is recycled.",
    },
    {
      href: "https://etwd.com/your-water/water-quality/water-quality-faqs",
      label: "El Toro Water District: water quality FAQs",
      supports:
        "The district's water is generally considered hard, Colorado River water picks up calcium and magnesium, and hard water is an aesthetic issue, not a health concern.",
    },
    {
      href: "https://www.ocwd.com/learning-center/how-water-works-in-oc/",
      label: "Orange County Water District: how water works in OC",
      supports:
        "Agencies over the groundwater basin pump about 85 percent of demand and import about 15 percent, and about 600,000 people in south county rely mostly on imported water.",
    },
    {
      href: "https://www.tustinca.org/223/Flushing-Out-Your-Water-Heater",
      label: "City of Tustin: flushing out your water heater",
      supports:
        "Manufacturers recommend periodic flushing to remove sediment, and white particles may be calcium carbonate scale from the water heater.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=116785",
      label: "California Health and Safety Code section 116785",
      supports:
        "The conditions under which a residential water softener may be installed, including off-site regeneration or demand control and a salt efficiency rating.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=116786",
      label: "California Health and Safety Code section 116786",
      supports:
        "A local agency may limit or prohibit softeners that discharge to the sewer by ordinance, if it makes specific findings.",
    },
  ],
  "/guides/slab-leak-repair-orange-county": [
    {
      href: "https://www.irwd.com/get-help/meters-and-leaks/water-leaks/",
      label: "Irvine Ranch Water District: water leaks",
      supports:
        "Toilets, faucets and sprinklers are common sources of undetected leaks, and the district re-bills penalty-tier usage at a lower rate after a leak is found and repaired.",
    },
    {
      href: "https://www.yorbalindaca.gov/DocumentCenter/View/5807",
      label: "City of Yorba Linda: plumbing project exemptions",
      supports:
        "Stopping or repairing a leak needs no permit, but removing a defective concealed pipe and replacing it with new material is new work that needs a permit and inspection.",
    },
    {
      href: "https://www.cslb.ca.gov/About_Us/Library/Licensing_Classifications/Licensing_Classifications_Detail.aspx?Class=C36",
      label: "Contractors State License Board: C-36 Plumbing Contractor classification",
      supports:
        "The C-36 Plumbing Contractor classification covers water supply piping.",
    },
    {
      href: "https://www.epa.gov/lead/lead-renovation-repair-and-painting-program",
      label: "U.S. EPA: Lead Renovation, Repair and Painting Program",
      supports:
        "Anyone paid to disturb painted surfaces in homes built before 1978 must be certified in lead-safe work practices.",
    },
  ],
  "/guides/repipe-orange-county": [
    {
      href: "https://www.huduser.gov/portal/publications/pex_design_guide.pdf",
      label: "HUD User: Design Guide, Residential PEX Water Supply Plumbing Systems (NAHB Research Center, 2006)",
      supports:
        "PEX bends around obstructions with fewer fittings, uses mechanical fittings instead of solder, does not pit or corrode, and must be protected from sunlight within each manufacturer's exposure limit.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Finding_The_Right_Contractor.aspx",
      label: "Contractors State License Board: finding the right contractor",
      supports:
        "Get at least three written bids based on identical scope, and do not automatically accept the lowest bid.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Contracts_And_Binding_Agreements.aspx",
      label: "Contractors State License Board: contracts and binding agreements",
      supports:
        "What a contract should detail: the work, price, payment timing, who gets the permits, the finish date, and the contractor's address and license number.",
    },
    {
      href: "https://www.fountainvalley.gov/398/Plan-Check-Center",
      label: "City of Fountain Valley: Plan Check Center, expedited permits",
      supports:
        "Fountain Valley lists a residential repipe among its expedited permits.",
    },
    {
      href: "https://santa-ana.gov/pbx-express-permit/",
      label: "City of Santa Ana: PBx Same Day Express Permit Program",
      supports:
        "Santa Ana lists residential repipes on its same-day express permit list.",
    },
  ],
  "/guides/termites-orange-county": [
    {
      href: "https://ipm.ucanr.edu/home-and-landscape/drywood-termites/",
      label: "UC IPM Pest Notes: Drywood Termites",
      supports:
        "Drywood termite signs and swarm timing, whole-structure versus localized treatment, fumigation and heat details, no residual effect, and the d-limonene (orange oil) finding.",
    },
    {
      href: "https://ipm.ucanr.edu/home-and-landscape/subterranean-and-other-termites/",
      label: "UC IPM Pest Notes: Subterranean and Other Termites",
      supports:
        "Where each termite type lives, shelter tubes, subterranean swarm timing, barrier and bait treatments, and the prevention list.",
    },
    {
      href: "https://www.pestboard.ca.gov/forms/termites.pdf",
      label: "Structural Pest Control Board: Questions and Answers About Termites",
      supports:
        "Termite signs, the ant versus termite test, that only fumigation and whole-house heat ensure eradication in the entire structure, the false advertising warning, and the advice not to be rushed.",
    },
    {
      href: "https://www.pestboard.ca.gov/forms/fumigate.pdf",
      label: "Structural Pest Control Board: Fumigation for Pest Control",
      supports:
        "What must be removed or bagged before fumigation, that it can take six hours to one week, secondary locks, and re-entry only after the licensee certifies the house safe.",
    },
    {
      href: "https://www.pestboard.ca.gov/howdoi/terminspect.shtml",
      label: "Structural Pest Control Board: search for termite inspection information",
      supports:
        "The board's database shows whether a property was inspected within the last two years, and copies of the reports can be requested.",
    },
    {
      href: "https://www.pestboard.ca.gov/license.shtml",
      label: "Structural Pest Control Board: search for a license",
      supports:
        "Where to verify a structural pest control company or licensee before hiring.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=8516",
      label: "California Business and Professions Code section 8516",
      supports:
        "The inspection report is due within 10 business days, must separately identify evident infestation and conditions likely to lead to it, and a reinspection within four months cannot cost more than the original.",
    },
    {
      href: "https://www.socalgas.com/safety/safety-and-prevention/prepare-for-fumigation",
      label: "SoCalGas: how to prepare for fumigation",
      supports:
        "SoCalGas closes and restores gas service for a fumigation at no cost, needs two business days of notice, and only it or its certified contractors may operate the service shut-off valve.",
    },
  ],
  // Added 2026-09-26 (seo/new-pages-c). Every entry opened that day.
  "/guides/earthquake-retrofit-orange-county": [
    {
      href: "https://www.earthquakeauthority.com/strengthen-your-house",
      label: "California Earthquake Authority: strengthen your house",
      supports:
        "Older houses with steps up to the first floor can shift off their foundations in an earthquake; the fix is bracing crawl space walls and bolting the house to its foundation.",
    },
    {
      href: "https://www.crmp.org/our-seismic-retrofit-programs/the-retrofits/ebb-retrofit",
      label: "California Residential Mitigation Program: the Earthquake Brace + Bolt retrofit",
      supports:
        "Checked 2026-09-26: bolting uses anchor bolts or foundation plates; bracing attaches plywood or OSB sheathing along cripple walls; a frame sitting directly on the foundation gets bolting only; supplemental grant of up to $7,000; registration is open for a limited time each year.",
    },
    {
      href: "https://www.crmp.org/our-seismic-retrofit-programs/see-if-you-qualify",
      label: "California Residential Mitigation Program: see if you qualify for Earthquake Brace + Bolt",
      supports:
        "Checked 2026-09-26: grants of up to $3,000, and a supplemental grant for households with annual income of $94,480 or less, as funding permits.",
    },
    {
      href: "https://www.crmp.org/resources/program-zip-codes",
      label: "California Residential Mitigation Program: program ZIP codes",
      supports:
        "Checked 2026-09-26: the ZIP lookup listed many Orange County ZIP codes, including ones in Anaheim, Santa Ana, Irvine, Huntington Beach and San Clemente, with Brace + Bolt registration closed.",
    },
    {
      href: "https://www.crmp.org/sites/crmp/files/documents/2026/ebb-rules-regs_1-29-26_final-with-accessibility.pdf",
      label: "Earthquake Brace + Bolt Program: Rules for Participation (effective February 1, 2026)",
      supports:
        "Qualifying houses (pre-1980, one to four units, raised perimeter foundation, level or low slope, no mobile homes), Chapter A3, standard plans up to 4-foot cripple walls and engineered plans beyond, a typical retrofit cost of $3,000 to $7,000, permit issued after acceptance and solely for the retrofit, no work before approval, Class A or B license or the homeowner, one grant per parcel.",
    },
    {
      href: "https://www.earthquakeauthority.com/california-earthquake-insurance-policies/earthquake-insurance-policy-premium-discounts",
      label: "California Earthquake Authority: earthquake insurance premium discounts",
      supports:
        "Checked 2026-09-26: up to a 25% discount for a retrofitted pre-1980, wood-framed, one-to-four unit house on a raised foundation with a secured water heater, verified by the Dwelling Retrofit Verification form or a Brace + Bolt verification number.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=19211",
      label: "California Health and Safety Code section 19211",
      supports:
        "Residential water heaters must be braced, anchored or strapped against earthquake motion.",
    },
    {
      href: "https://www.socalgas.com/safety/emergency-information/shut-off-natural-gas",
      label: "SoCalGas: how to shut off your natural gas",
      supports:
        "Do not turn off the meter unless you smell gas, hear it escaping or see other signs of a leak, and do not turn it back on yourself.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=RTC&sectionNum=74.5",
      label: "California Revenue and Taxation Code section 74.5",
      supports:
        "Seismic retrofitting is not new construction for reassessment; notify the assessor before or within 30 days of completion and file documents within six months.",
    },
  ],
  "/guides/sewer-line-orange-county": [
    {
      href: "https://ocsan.gov/sanitation-district-clearance/",
      label: "Orange County Sanitation District (OC San): sanitation district clearance and local providers",
      supports:
        "OC San is only a regional sewer provider; the city is the local provider except Yorba Linda, Irvine, Tustin and unincorporated areas, which have their own districts.",
    },
    {
      href: "https://www.anaheim.net/DocumentCenter/View/49629",
      label: "City of Anaheim: Sewer Laterals, Property Owners Guide",
      supports:
        "The whole lateral is private property, including under the street; slow drains, a gurgling toilet and wet areas by the washer signal a blockage; most laterals are vitrified clay with a 30 to 50 year average service life; roots enter through existing defects; laterals are 4 to 6 inches; root killers are short term; get permits and more than one quote.",
    },
    {
      href: "https://www.cmsdca.gov/sewer/sewer_faqs.php",
      label: "Costa Mesa Sanitary District: sewer FAQs",
      supports:
        "Owners maintain the lateral until past the connection with the district's main; roots can break a pipe and collapse it; rodding is temporary, rod every year if roots are involved.",
    },
    {
      href: "https://www.cmsdca.gov/sewer/rebates/sewer_inspection_rebate_program.php",
      label: "Costa Mesa Sanitary District: Sewer Inspection Rebate Program",
      supports:
        "Checked 2026-09-26: up to $200 (camera from a ground clean-out), $250 (from a roof vent or toilet flange) or $500 (new clean-out, permit required); approval first; once every five years; video must show date, address, footage and the whole lateral; no permit for a camera inspection; digging needs a district inspection.",
    },
    {
      href: "https://www.huntingtonbeachca.gov/departments/public_works/water_and_sewer/sewer_lateral_program.php",
      label: "City of Huntington Beach: sewer lateral program",
      supports:
        "The city is responsible from its main to the property line, including the public right-of-way; the owner hires a contractor to clean and video the line and the city reviews it; slip lining is named as a repair.",
    },
    {
      href: "https://www.irwd.com/services/sewer",
      label: "Irvine Ranch Water District: wastewater collection and treatment",
      supports:
        "Property owners are responsible for pipes within the building and the upper lateral to the edge of the property line.",
    },
  ],
  "/guides/santa-ana-wind-wildfire-home-prep": [
    {
      href: "https://forecast.weather.gov/glossary.php?word=santa+ana",
      label: "National Weather Service glossary: Santa Ana Wind",
      supports:
        "The definition of a Santa Ana wind.",
    },
    {
      href: "https://forecast.weather.gov/glossary.php?word=red+flag+warning",
      label: "National Weather Service glossary: Red Flag Warning",
      supports:
        "A Red Flag Warning calls attention to weather that may result in extreme burning conditions.",
    },
    {
      href: "https://ocfa.org/ready-set-go/home-hardening/",
      label: "Orange County Fire Authority: home hardening",
      supports:
        "Flying embers destroy homes miles from wildland areas, and OCFA's part by part guidance on vents, gutters, fences, garages and roofs.",
    },
    {
      href: "https://ocfa.org/document/immediate-zone-flyer/",
      label: "Orange County Fire Authority: Immediate Zone flyer",
      supports:
        "The 0 to 5 foot zone recommendations: hardscape, no combustible mulch, low plants under 2 feet, firewood 30 feet away, and noncombustible fencing attached to the home.",
    },
    {
      href: "https://ocfa.org/document/red-flag-warning-2/",
      label: "Orange County Fire Authority: Red Flag Warning flyer",
      supports:
        "The conditions behind a Red Flag Warning (winds of 15 mph or more, humidity of 25 percent or less, temperatures above 75 degrees) and the yard work guidance.",
    },
    {
      href: "https://ocfa.org/ready-set-go/vegetation-management/",
      label: "Orange County Fire Authority: vegetation management",
      supports:
        "OCFA's plant spacing guidance, its list of flammable plants to remove, and its fire-resistive planting guide.",
    },
    {
      href: "https://ocfa.org/ready-set-go/home-assessment/",
      label: "Orange County Fire Authority: online home assessment",
      supports:
        "The online home assessment, the in-person assessment request, the phone number, and tile, asphalt and metal listed as noncombustible roof materials.",
    },
    {
      href: "https://ocfa.org/ready-set-go/defensible-space-disclosure/",
      label: "Orange County Fire Authority: defensible space disclosure",
      supports:
        "Civil Code 1102.19's seller documentation requirement in high and very high fire hazard severity zones, and which cities' own fire departments handle it.",
    },
    {
      href: "https://ocfa.org/about-us/member-cities/",
      label: "Orange County Fire Authority: member cities",
      supports:
        "OCFA serves 23 cities and all unincorporated areas.",
    },
    {
      href: "https://ocfa.org/ready-set-go/insurance/",
      label: "Orange County Fire Authority: insurance",
      supports:
        "Insurers are mandating home hardening and vegetation management, their requirements may be stricter than OCFA's, and OCFA does not do insurance inspections.",
    },
    {
      href: "https://ocfa.org/ready-set-go/set/",
      label: "Orange County Fire Authority: Ready, Set, Go!",
      supports:
        "Leaving early is the safest choice, and a supply kit should cover every household member for at least 3 days.",
    },
    {
      href: "https://ocfa.org/ready-set-go/other-wildfire-resources/",
      label: "Orange County Fire Authority: other wildfire resources",
      supports:
        "AlertOC is listed among OCFA's wildfire resources.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PRC&sectionNum=4291",
      label: "California Public Resources Code section 4291",
      supports:
        "100 feet of defensible space in state responsibility areas, the ember-resistant zone within 5 feet, and when that requirement takes effect for new and existing structures.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=51182",
      label: "California Government Code section 51182",
      supports:
        "100 feet of defensible space in locally designated very high fire hazard severity zones, a roof kept free of leaves and needles, and tree limbs kept 10 feet from a chimney outlet.",
    },
    // The three Zone 0 entries below were opened on 2026-09-25. OAL's
    // "emergency regulations under review" page was re-opened on 2026-09-26
    // and listed no Board of Forestry filing, which is what the guide's "as of
    // September 26" line rests on.
    {
      href: "https://www.bbklaw.com/resources/la090926-california-board-of-forestry-adopts-emergency-zone-0-regulations-under-ab-3074",
      label: "Best Best & Krieger: Board of Forestry adopts emergency Zone 0 regulations (September 9, 2026)",
      supports:
        "The Board adopted emergency Zone 0 regulations on August 19, 2026, submitted them to the Office of Administrative Law on August 28, and the comment period closed September 2; the adopted version applies throughout state responsibility areas and, in local responsibility areas, only to occupied structures in very high fire hazard severity zones; new structures wait for fuels-management guidance the Board has up to a year to post, and existing structures follow three years after new structures.",
    },
    {
      href: "https://www.publicceo.com/2026/09/california-board-of-forestry-adopts-emergency-zone-0-regulations-under-ab-3074/",
      label: "PublicCEO: California Board of Forestry adopts emergency Zone 0 regulations (September 15, 2026)",
      supports:
        "The same adoption, submission and comment dates, where the adopted version applies, and the timing for new and existing structures.",
    },
    {
      href: "https://oal.ca.gov/emergency_regulations/recent_actions_taken_on_emergency_regulations/",
      label: "California Office of Administrative Law: recent actions on emergency regulations",
      supports:
        "The Zone 0 filing (2026-0828-03E) is listed as withdrawn on September 8, 2026.",
    },
    {
      href: "https://www.sce.com/outages-safety/outage-preparedness/outage-types/public-safety-power-shutoff-psps",
      label: "Southern California Edison: Public Safety Power Shutoff",
      supports:
        "What a Public Safety Power Shutoff is, and that anyone can sign up for address level alerts.",
    },
  ],
  "/guides/new-homeowner-first-year-orange-county": [
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=19211",
      label: "California Health and Safety Code section 19211",
      supports:
        "Residential water heaters must be braced, anchored or strapped, and the seller must certify in writing that this was done.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=13113.8",
      label: "California Health and Safety Code section 13113.8",
      supports:
        "Every single-family home that is sold must have an operable smoke alarm.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=17926",
      label: "California Health and Safety Code section 17926",
      supports:
        "A carbon monoxide device is required in a home with a fossil fuel appliance, a fireplace or an attached garage.",
    },
    {
      href: "https://www.irwd.com/get-help/meters-and-leaks/water-leaks/",
      label: "Irvine Ranch Water District: water leaks",
      supports:
        "Where the house valve and the customer valve are, and what each one controls.",
    },
    {
      href: "https://ggcity.org/index.php/pw/shutoff-valves",
      label: "City of Garden Grove: shut-off valves",
      supports:
        "City water shut-off valves are not to be operated by customers except in an extreme emergency.",
    },
    {
      href: "https://www.socalgas.com/safety/emergency-information/shut-off-natural-gas",
      label: "SoCalGas: how to shut off your natural gas",
      supports:
        "Where the meter shut-off valve is, the quarter turn with a 12-inch wrench, when not to turn the gas off, and not turning it back on yourself.",
    },
    {
      href: "https://www.socalgas.com/safety/safety-and-prevention/earthquake-excess-flow-valves",
      label: "SoCalGas: earthquake and excess flow valves",
      supports:
        "An earthquake valve may be required by an insurer or a local building department, must go on the house line, and is installed by a qualified professional because SoCalGas no longer installs them.",
    },
    {
      href: "https://www.earthquakeauthority.com/california-earthquake-insurance-policies/homeowners",
      label: "California Earthquake Authority: homeowners policies",
      supports:
        "In most cases earthquake damage is not covered by a homeowners policy, and a separate policy is needed.",
    },
    {
      href: "https://octreasurer.gov/property-tax/informationfaqs/important-dates",
      label: "Orange County Treasurer-Tax Collector: important dates",
      supports:
        "Secured property tax installments are due November 1 and February 1, late after December 10 and April 10, with a 10 percent penalty.",
    },
    {
      href: "https://octreasurer.gov/property-tax/informationfaqs/new-home-buyers",
      label: "Orange County Treasurer-Tax Collector: new home buyers",
      supports:
        "Supplemental bills are generally one-time bills after a change of ownership, normally arrive within one year, and are not usually paid by mortgage companies.",
    },
    {
      href: "https://www.ocassessor.gov/tax-saving-programs/homeowners-exemptions",
      label: "Orange County Assessor: Homeowners' Exemptions",
      supports:
        "The Homeowners' Exemption exempts $7,000 of value, saves at least $70 a year, requires the home to be your principal residence on January 1, and has a February 15 deadline for the full amount.",
    },
    {
      href: "https://octreasurer.gov/melloroos",
      label: "Orange County Treasurer-Tax Collector: Mello-Roos information",
      supports:
        "What the Mello-Roos Act is, that the bonds are secured by special taxes billed on the property tax bill, and the county's map and bill description guide.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=53325.3",
      label: "California Government Code section 53325.3",
      supports:
        "A Mello-Roos tax is a special tax and not a special assessment.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4525",
      label: "California Civil Code section 4525",
      supports:
        "The HOA documents a seller must provide, including governing documents and a statement of assessments and fees.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=4775",
      label: "California Civil Code section 4775",
      supports:
        "Who maintains, repairs and replaces the common area, a separate interest and exclusive use common area, unless the declaration says otherwise.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=4216.2",
      label: "California Government Code section 4216.2",
      supports:
        "Notice to the regional notification center at least two working days before digging.",
    },
    {
      href: "https://www.socalgas.com/safety/safety-and-prevention/digging-and-yard-safety",
      label: "SoCalGas: contact 811 before you dig",
      supports:
        "Contacting 811 before digging is free.",
    },
  ],
  "/guides/orange-county-home-maintenance-checklist": [
    {
      href: "https://forecast.weather.gov/glossary.php?word=santa+ana",
      label: "National Weather Service glossary: Santa Ana Wind",
      supports:
        "The definition of a Santa Ana wind.",
    },
    {
      href: "https://forecast.weather.gov/glossary.php?word=marine+push",
      label: "National Weather Service glossary: Marine Push",
      supports:
        "A marine push replaces the air mass with ocean air that is much cooler and much more humid.",
    },
    {
      href: "https://ocfa.org/residents/sandbags/",
      label: "Orange County Fire Authority: sandbags",
      supports:
        "Most OCFA fire stations have empty sandbags, some also have sand, and residents should bring a shovel.",
    },
    {
      href: "https://www.tustinca.org/1642/Free-Sandbags",
      label: "City of Tustin: free sandbags",
      supports:
        "Tustin offers residents free fill-your-own sandbags at its maintenance facility and at self-serve sites.",
    },
    {
      href: "https://www.irwd.com/learn/save-water-money/watering-guide/",
      label: "Irvine Ranch Water District: watering guide",
      supports:
        "The district publishes a month by month irrigation schedule.",
    },
    {
      href: "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist",
      label: "ENERGY STAR heating and cooling maintenance checklist",
      supports:
        "Inspect, clean or change air filters once a month, and check cooling in spring and heating in fall before contractors get busy.",
    },
    {
      href: "https://ocfa.org/safety-programs/smoke-alarm-home-escape-plan/",
      label: "Orange County Fire Authority: smoke alarms and home escape plan",
      supports:
        "Test smoke alarms once a month, replace the battery every six months, and replace the alarm every 10 years.",
    },
    {
      href: "https://ipm.ucanr.edu/home-and-landscape/drywood-termites/",
      label: "UC IPM Pest Notes: Drywood Termites",
      supports:
        "Drywood termite swarmers fly during daytime hours in summer and fall.",
    },
    {
      href: "https://ipm.ucanr.edu/home-and-landscape/subterranean-and-other-termites/",
      label: "UC IPM Pest Notes: Subterranean and Other Termites",
      supports:
        "The common subterranean species swarms in the afternoon in spring or fall on clear days after a soaking rain.",
    },
    {
      href: "https://www.ocassessor.gov/tax-saving-programs/homeowners-exemptions",
      label: "Orange County Assessor: Homeowners' Exemptions",
      supports:
        "The February 15 deadline for the full Homeowners' Exemption.",
    },
    // Added 2026-09-25 when this guide became the maintenance hub: the NOAA
    // normals were fetched that day, the NWS bulletin and the CRMP page were
    // opened that day, and the FEMA, ENERGY STAR and IRWD pages came across
    // from the two merged guides, where they were opened on 2026-09-21.
    {
      href: "https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-monthly-1991-2020&stations=USW00093184&format=json&dataTypes=MLY-PRCP-NORMAL",
      label:
        "NOAA National Centers for Environmental Information: 1991-2020 monthly precipitation normals, Santa Ana John Wayne Airport (station USW00093184)",
      supports:
        "Monthly normals in inches: January 2.59, February 2.64, March 1.62, April 0.52, May 0.27, June 0.01, July 0.04, August 0.01, September 0.10, October 0.54, November 0.80, December 2.04. They sum to 11.18 a year, 8.89 of it December through March, 0.06 June through August.",
    },
    {
      href: "https://www.weather.gov/media/sti/climate/STIP/43CDPW/43cdpw-TMurphree.pdf",
      label:
        "National Weather Service Science and Technology Infusion Climate Bulletin: Santa Ana Events in California (Murphree, Szasz and Jones, 2018)",
      supports:
        "Santa Ana events are most common in October through March, and raise wildfire risk most when they occur during or soon after the end of the summer dry season.",
    },
    {
      href: "https://www.fema.gov/sites/default/files/2020-07/fema_tb8_corrosion_protection_metal_connectors_coastal_areas.pdf",
      label:
        "FEMA: NFIP Technical Bulletin 8, corrosion protection for metal connectors and fasteners in coastal areas (June 2019)",
      supports:
        "Salt spray carried by onshore winds significantly accelerates the corrosion of metal, is greatest within 300 to 3,000 feet of the shoreline, and has been measured as far as 5 to 10 miles inland.",
    },
    {
      href: "https://www.energystar.gov/saveathome/heating-cooling",
      label: "ENERGY STAR: heat and cool efficiently",
      supports:
        "Change the air filter when it looks dirty, and at least every 3 months.",
    },
    {
      href: "https://www.irwd.com/learn/water-quality-report/",
      label:
        "Irvine Ranch Water District: water quality questions and answers",
      supports:
        "Water imported from the Colorado River and Northern California is typically hard, and the district recommends flushing the water heater once a year.",
    },
  ],
  // New pages B, 2026-09-26. Every entry below was opened on 2026-09-26.
  "/guides/orange-county-home-age": [
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,160%7C05000US06059",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25034 (year structure built), Orange County and every place in it",
      supports:
        "Housing units by decade built, with margins of error, for the county and all 34 cities. The pre-1980 and 2000-or-later shares on the page are our sums of these rows: Orange County 56.8 percent built before 1980, Laguna Woods 89.7, Fountain Valley 82.3, Garden Grove 77.4, Huntington Beach 69.2, Newport Beach 54.9, Irvine 20.7, Rancho Santa Margarita 4.3.",
    },
    {
      href: "https://censusreporter.org/data/table/?table=B25035&geo_ids=05000US06059,160%7C05000US06059",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 5-year estimates 2020-2024, table B25035 (median year structure built)",
      supports:
        "Median year built as published: Orange County 1977, Garden Grove and Buena Park 1965, Irvine 2002.",
    },
    {
      href: "https://www.census.gov/programs-surveys/acs/guidance/comparing-acs-data.html",
      label: "U.S. Census Bureau: comparing ACS data",
      supports:
        "All ACS data are estimates because they come from a sample, a margin of error is published for every estimate, and overlapping 5-year periods should not be compared.",
    },
    {
      href: "https://www.census.gov/content/dam/Census/library/publications/2018/acs/acs_general_handbook_2018_ch07.pdf",
      label:
        "U.S. Census Bureau: Understanding and Using ACS Data, chapter 7 (understanding error)",
      supports:
        "The margins of error for published ACS estimates are provided at a 90 percent confidence level.",
    },
    {
      href: "https://www.cpsc.gov/s3fs-public/516.pdf",
      label:
        "U.S. Consumer Product Safety Commission: Repairing Aluminum Wiring, Publication 516 (June 2011)",
      supports:
        "Wiring installed between 1965 and the mid 1970s may be aluminum.",
    },
    {
      href: "https://www.dir.ca.gov/title8/1529.html",
      label:
        "Cal/OSHA: California Code of Regulations, Title 8, section 1529 (asbestos in construction)",
      supports:
        "Thermal system insulation and surfacing material, such as acoustical plaster on ceilings, in buildings constructed no later than 1980 is presumed to contain asbestos unless rebutted.",
    },
    {
      href: "https://www.epa.gov/lead/lead-renovation-repair-and-painting-program",
      label: "U.S. EPA: Lead Renovation, Repair and Painting Program",
      supports:
        "Anyone paid to do work that disturbs painted surfaces in homes built before 1978 must be certified and their employees trained.",
    },
    {
      href: "https://www.nachi.org/life-expectancy.htm",
      label: "InterNACHI: standard estimated life expectancy chart for homes",
      supports:
        "Cast iron waste pipe about 60 years above ground and 50 to 60 years below ground, as a general guideline and not a guarantee.",
    },
    {
      href: "https://www.crmp.org/our-seismic-retrofit-programs/the-retrofits/ebb-retrofit",
      label:
        "California Residential Mitigation Program: Earthquake Brace + Bolt retrofit",
      supports:
        "Grants of up to $3,000 for wood-framed homes built before 1980 on a raised foundation in listed ZIP codes; the retrofit bolts the house to its foundation, braces cripple walls with plywood and requires a strapped water heater.",
    },
  ],
  "/guides/orange-county-home-rebates-2026": [
    {
      href: "https://www.socalgas.com/savings/rebates-and-incentives",
      label: "SoCalGas: rebates and incentives",
      supports:
        "Checked 2026-09-26: storage water heaters $300 to $575 (UEF 0.64 or higher, 55 gallons or less); tankless $80 to $1,500 when replacing a tank-type unit in a single-family detached home; furnaces $1.40 to $25 per kBTUh (AFUE 92 percent or more, licensed contractor, proof of permit closure, one per household); first come, first served until December 31, 2026 or until funds run out.",
    },
    {
      href: "https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace",
      label: "Southern California Edison: rebates and SCE Marketplace",
      supports:
        "Checked 2026-09-26: Golden State Rebates instant coupons for air conditioners, smart thermostats, heat pump water heaters and gas water heaters with no amounts listed; a $75 smart thermostat bill credit on select rate plans; Home Performance Plus for disadvantaged communities; Comfortably CA offers no direct customer rebates.",
    },
    {
      href: "https://www.anaheim.net/5241/Appliance-Fixtures",
      label: "Anaheim Public Utilities: appliance and fixture rebates",
      supports:
        "Checked 2026-09-26: $400 for an ENERGY STAR certified heat pump water heater and $200 for an ENERGY STAR certified heat pump dryer.",
    },
    {
      href: "https://socalwatersmart.com/en/residential/rebates/available-rebates/turf-replacement-program/",
      label: "SoCal Water$mart (Metropolitan Water District): turf replacement program",
      supports:
        "Checked 2026-09-26: $2.00 per square foot up to 5,000 square feet a year; approval before the project starts and 180 days to finish; 3 plants per 100 square feet, a stormwater retention feature and irrigation changes; no synthetic turf; amounts subject to change.",
    },
    {
      href: "https://socalwatersmart.com/en/residential/",
      label: "SoCal Water$mart: residential rebates",
      supports:
        "Checked 2026-09-26: premium high-efficiency toilets $40, rotating nozzles $2 each with at least 30, clothes washers from $85; rebates vary by water agency and depend on funding.",
    },
    {
      href: "https://www.irwd.com/get-help/residential-rebates/",
      label: "Irvine Ranch Water District: residential rebates",
      supports:
        "Checked 2026-09-26: turf $2 per square foot, drip $0.25 per square foot, nozzles $4, rain barrels $35 (two), cisterns $250 to $350, soil moisture sensors up to $80 under an acre, hose bib controllers $35 (two), flow monitors $100 base, toilets $40 (up to nine), washers from $85, 50 percent of sprinkler repairs; confirm amounts before buying.",
    },
    {
      href: "https://www.mesawater.org/Rebates",
      label: "Mesa Water District: residential rebates",
      supports:
        "Checked 2026-09-26: turf from $3 per square foot, drip from $1 per square foot, controllers from $80 under an acre, soil moisture sensors up to $80, nozzles $2 (at least 15), rain barrels $35, cisterns $250 to $350, pool covers $50, flow monitors from $100, toilets from $40, washers from $85.",
    },
    {
      href: "https://smwd.com/rebates",
      label: "Santa Margarita Water District: rebates",
      supports:
        "Checked 2026-09-26: residential turf $2 per square foot plus $1,000 for design plans, smart timers $100, soil moisture sensors $200, flow monitors $100, rain barrels and cisterns $35 to $350, nozzles $5, hose bib controllers $35, washers $85, toilets $40, H2OC RainSmart up to $1,500.",
    },
    {
      href: "https://techcleanca.com/incentives/single-family-incentives/",
      label: "TECH Clean California: single-family incentives",
      supports:
        "Checked 2026-09-26: single-family heat pump water heater and heat pump HVAC incentives reserved statewide since November 14, 2025; HEEHRA fully reserved in Central and Southern California January 7, 2026 and statewide February 24, 2026; waitlisted projects qualify only if installed after approval.",
    },
    {
      href: "https://www.energy.ca.gov/programs-and-topics/programs/inflation-reduction-act-residential-energy-rebate-programs",
      label: "California Energy Commission: Inflation Reduction Act residential energy rebate programs",
      supports:
        "Checked 2026-09-26: HEEHRA single-family rebates fully reserved statewide as of February 24, 2026; up to $8,000 under 80 percent of area median income and up to $4,000 from 80 to 150 percent; HOMES rebates are not yet available; $291 million award approved January 2025.",
    },
    {
      href: "https://www.crmp.org/our-seismic-retrofit-programs/the-retrofits/ebb-retrofit",
      label: "California Residential Mitigation Program: Earthquake Brace + Bolt retrofit",
      supports:
        "Checked 2026-09-26: up to $3,000 for wood-framed homes built before 1980 on a raised foundation in listed ZIP codes; up to $7,000 more for households earning $94,480 or less, which may pay up to 100 percent of the cost; registration open a limited time each year; no 2026 dates posted.",
    },
  ],
  // Added 2026-09-26 (seo/new-pages-d). Every page below was opened that day,
  // except the climate zone list and FEMA TB 8, reused from the entries
  // checked 2026-09-25. HomeAdvisor is a contractor lead service: its figure
  // is labeled on the guide as national and survey-based, never as an Orange
  // County price.
  "/guides/window-replacement-cost-orange-county": [
    {
      href: "https://www.homeadvisor.com/cost/doors-and-windows/window-replacement/",
      label:
        "HomeAdvisor: window replacement cost guide (national figures from its customer surveys, updated June 17, 2026)",
      supports:
        "Replacing a window ranges from $300 to $2,100, with an average of $850; labor is $100 to $300 per window for a retrofit and $150 to $800 for full-frame; retrofit keeps the trim but only suits a sound frame, while full-frame needs trim work and lets the installer repair water damage. Checked 2026-09-26.",
    },
    {
      href: "https://www.energy.ca.gov/filebrowser/download/8641?fid=8641",
      label:
        "California Energy Commission: 2025 Single-Family Residential Compliance Manual, chapter 9 (additions, alterations and repairs)",
      supports:
        "Replacing windows is an alteration; prescriptive replacement windows need a maximum U-factor of 0.30 in climate zones 6 to 10 and 15 and a maximum SHGC of 0.23 in zones 2, 4 and 6 to 15; up to 75 square feet may instead meet 0.40 U-factor and 0.35 SHGC; windows must be caulked and sealed per Section 110.7; the performance approach is an alternative; windows in Fire Hazard Severity Zones fall under the wildland-urban interface code. Checked 2026-09-26.",
    },
    {
      href: "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency",
      label:
        "California Energy Commission: 2025 Building Energy Efficiency Standards",
      supports:
        "The 2025 Energy Code applies to permits applied for on or after January 1, 2026.",
    },
    {
      href: "https://www.energy.ca.gov/media/3560",
      label:
        "California Energy Commission: building climate zones by zip code",
      supports:
        "Coastal ZIP codes such as Huntington Beach and Newport Beach are in climate zone 6; inland ones such as Irvine, Santa Ana and Anaheim are in climate zone 8. Checked 2026-09-25.",
    },
    {
      href: "https://ggcity.org/building-and-safety/obtaining-building-permit-faqs",
      label: "City of Garden Grove: obtaining a building permit FAQ",
      supports:
        "Installing or replacing windows or skylights needs a permit. Checked 2026-09-26.",
    },
    {
      href: "https://santa-ana.gov/pbx-express-permit/",
      label: "City of Santa Ana: PBx Same Day Express Permit Program",
      supports:
        "Windows retrofit is on Santa Ana's same-day express permit list for residential replacements. Checked 2026-09-26.",
    },
    {
      href: "https://www.fountainvalley.gov/398/Plan-Check-Center",
      label: "City of Fountain Valley: Plan Check Center, expedited permits",
      supports:
        "Window and door replacement is an expedited permit, submitted with the Window Replacement Worksheet and a floor plan. Checked 2026-09-26.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=13113.7",
      label: "California Health and Safety Code section 13113.7",
      supports:
        "A permit for work over $1,000 cannot be signed off until the home has approved smoke alarms.",
    },
    {
      href: "https://www.epa.gov/lead/lead-renovation-repair-and-painting-program",
      label: "U.S. EPA: Lead Renovation, Repair and Painting Program",
      supports:
        "Anyone paid to disturb painted surfaces in homes built before 1978 must be certified and trained in lead-safe work practices.",
    },
    {
      href: "https://www.fema.gov/sites/default/files/2020-07/fema_tb8_corrosion_protection_metal_connectors_coastal_areas.pdf",
      label:
        "FEMA: NFIP Technical Bulletin 8, corrosion protection for metal connectors and fasteners in coastal areas (June 2019)",
      supports:
        "Salt spray significantly accelerates the corrosion of metal and is greatest within 300 to 3,000 feet of the shoreline.",
    },
  ],
  "/guides/solar-battery-orange-county": [
    {
      href: "https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/customer-generation/net-energy-metering-and-net-billing",
      label:
        "California Public Utilities Commission: Net Energy Metering and Net Billing",
      supports:
        "Since April 15, 2023, new PG&E, SCE and SDG&E customer-generators take service on the net billing tariff; exports are credited at their value to the grid, usually below retail but sometimes above it on late summer evenings; a specific electrification TOU rate (TOU-D-PRIME at SCE) is required; the original customer keeps the tariff for nine years; PG&E and SCE customers who apply before the end of 2027 get a nine-year export adder, SDG&E customers do not; bills are due monthly with credits rolling to the true-up; batteries maximize bill savings; NEM 2.0 customers may stay on it for 20 years from interconnection. Checked 2026-09-26.",
    },
    {
      href: "https://www.sce.com/clean-energy-efficiency/solar-generating-your-own-power/billing-incentives/solar-billing-plan",
      label: "Southern California Edison: how Solar Billing Plans work",
      supports:
        "SCE calls the tariff the Solar Billing Plan, its customers are on TOU-D-PRIME, and prices are highest on summer weekdays from 4 to 9 p.m. Checked 2026-09-26.",
    },
    {
      href: "https://www.sdge.com/more-information/our-company/about-us",
      label: "San Diego Gas & Electric: about us",
      supports:
        "SDG&E serves San Diego and southern Orange counties. Checked 2026-09-26.",
    },
    {
      href: "https://www.anaheim.net/636/Solar-Energy-and-Net-Metering",
      label: "Anaheim Public Utilities: Solar Energy and Net Metering",
      supports:
        "Anaheim is not going to NEM 3.0; its NEM 2.0 program is wholesale-based; grandfathered NEM 1.0 customers who expand move the whole system to NEM 2.0; permits under 10 kW are issued without review; the system can operate after the city signs off the permit, and the utility does not issue permission to operate. Checked 2026-09-26.",
    },
    {
      href: "https://www.anaheim.net/5587/NEM-20",
      label: "Anaheim Public Utilities: Net Energy Metering 2.0",
      supports:
        "Anaheim now offers wholesale-based rates for exported energy under NEM 2.0. Checked 2026-09-26.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=GOV&sectionNum=65850.52",
      label: "California Government Code section 65850.52 (SB 379)",
      supports:
        "Cities must offer an online automated permitting platform such as SolarAPP+ for residential solar up to 38.4 kW and paired storage, issued in real time to a licensed contractor; cities under 5,000 are exempt; cities of 50,000 or fewer by September 30, 2024 and larger ones by September 30, 2023; systems SolarAPP+ cannot process are not required to go through it. Checked 2026-09-26.",
    },
    {
      href: "https://www.huntingtonbeachca.gov/departments/community_development/building___inspection/solar_app.php",
      label: "City of Huntington Beach: SolarAPP+",
      supports:
        "Huntington Beach uses SolarAPP+ for residential PV permits, and the work is verified through city inspection. Checked 2026-09-26.",
    },
    {
      href: "https://www.fountainvalley.gov/1449/SolarAPP",
      label: "City of Fountain Valley: SolarAPP+",
      supports:
        "Fountain Valley accepts SolarAPP+ approvals through its Permit Center, with inspections requested after the permit. Checked 2026-09-26.",
    },
    {
      href: "https://www.fountainvalley.gov/988/Solar-Permit-Process",
      label: "City of Fountain Valley: solar PV permit process",
      supports:
        "Solar plans show code-compliant roof access pathways and the type and number of existing roof coverings. Checked 2026-09-26.",
    },
    {
      href: "https://cityofirvine.gov/building-permits-and-inspections/adding-rooftop-solar-energy-system",
      label: "City of Irvine: adding a rooftop solar energy system",
      supports:
        "Irvine issues residential solar and battery permits the same day, automatically, for rooftop systems up to 38.4 kW with no more than one battery. Checked 2026-09-26.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=714",
      label: "California Civil Code section 714",
      supports:
        "HOA rules that effectively prohibit solar are void; reasonable restrictions on a PV system may not add more than $1,000 or cut efficiency more than 10 percent; decisions must be in writing and an application not denied within 45 days is deemed approved unless delayed by a reasonable request for information. Checked 2026-09-26.",
    },
    {
      href: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit",
      label: "IRS: Residential Clean Energy Credit (page reviewed July 4, 2026)",
      supports:
        "The credit was 30 percent of qualified costs for solar installed from 2022 through December 31, 2025, and for batteries of at least 3 kWh from 2023; it is not available for property placed in service after December 31, 2025. Checked 2026-09-26.",
    },
  ],
  // Added 2026-09-30. Every app fact on the comparison guide comes from the
  // app's own site or its store listing, each opened 2026-09-30. Store prices
  // are the US App Store's in-app purchase list. Prices change: re-check every
  // entry before bumping this guide's date.
  "/guides/best-home-maintenance-apps": [
    {
      href: "https://homebeacon.app/",
      label: "HomeBeacon home page",
      supports:
        "HomeBeacon has a Free Forever plan with no credit card required, and a Google Play app. Checked 2026-09-30.",
    },
    {
      href: "https://apps.apple.com/us/app/id6754183939",
      label: "HomeBeacon on the App Store",
      supports:
        "Free for your first home; in-app purchases list HMS Pro at $9.99 monthly or $95.90 yearly; runs on iPhone, iPad and Mac; includes the Ask Pops AI assistant and warranty tracking. Checked 2026-09-30.",
    },
    {
      href: "https://www.homezada.com/homeowners/pricing",
      label: "HomeZada pricing",
      supports:
        "Essentials plan free; Premium $99 a year or $15.95 a month, adding home maintenance, projects and finances; Deluxe $189 a year for up to 3 properties. Checked 2026-09-30.",
    },
    {
      href: "https://apps.apple.com/us/app/homezada-mobile/id473722482",
      label: "HomeZada Mobile on the App Store",
      supports:
        "HomeZada has an iPhone and iPad app alongside its website. Checked 2026-09-30.",
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.homezada.mobile",
      label: "HomeZada Mobile on Google Play",
      supports: "HomeZada has an Android app. Checked 2026-09-30.",
    },
    {
      href: "https://apps.apple.com/us/app/homer-the-home-management-app/id1250049341",
      label: "Homer on the App Store",
      supports:
        "Free with in-app purchases; Homer Premium options are listed from $4.99 to $69.99; runs on iPhone, Mac and Apple Vision; finds owner's manuals automatically and stores receipts and warranties. Checked 2026-09-30.",
    },
    {
      href: "https://play.google.com/store/apps/details?id=se.homeowner",
      label: "Homer on Google Play",
      supports: "Homer has an Android app. Checked 2026-09-30.",
    },
    {
      href: "https://apps.apple.com/us/app/dwellin-home-rewards-care/id1566306121",
      label: "Dwellin on the App Store",
      supports:
        "Free; tracks appliances, repairs and maintenance while you earn points; an optional Premium rewards membership gives bonus points. Checked 2026-09-30.",
    },
    {
      href: "https://apps.apple.com/us/app/oply-home-maintenance-app/id6504293662",
      label: "Oply on the App Store",
      supports:
        "Free; personalized maintenance recommendations, an AI assistant, and matching with local pros to compare quotes. Checked 2026-09-30.",
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.myhomeservices.io",
      label: "Oply on Google Play",
      supports: "Oply has an Android app. Checked 2026-09-30.",
    },
    {
      href: "https://www.homerockr.com/en",
      label: "Homerockr home page",
      supports:
        "Free to start, with a paid Plus subscription; task planning, renovation planning, shared household tasks, and a web app at app.homerockr.com. Checked 2026-09-30.",
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.homerockr.app",
      label: "Homerockr on Google Play",
      supports: "Homerockr has an Android app. Checked 2026-09-30.",
    },
    {
      href: "https://apps.apple.com/us/app/home-keeper-home-maintenance/id6757248250",
      label: "Home Keeper on the App Store",
      supports:
        "Free; select your state and it builds a maintenance schedule for your climate; runs on iPhone, Mac and Apple Vision. Checked 2026-09-30.",
    },
    {
      href: "https://apps.apple.com/us/app/homequeue-shared-maintenance/id6761346682",
      label: "HomeQueue on the App Store",
      supports:
        "Free plan: 5 active jobs, 3 upkeep schedules, 1 household; HomeQueue Pro listed at $2.99 monthly, $29.99 yearly, or $99.99 for a Founders purchase. Checked 2026-09-30.",
    },
    {
      href: "https://homequeue.app/",
      label: "HomeQueue home page",
      supports:
        "Ranks repairs, upkeep and small jobs in one shared household list; available on the web, iOS and Android. Checked 2026-09-30.",
    },
    {
      href: "https://apps.apple.com/us/app/thumbtack-home-service-pros/id852703300",
      label: "Thumbtack on the App Store",
      supports:
        "Free to download; compare prices, read reviews, message and book local pros. Checked 2026-10-01.",
    },
    {
      href: "https://help.thumbtack.com/article/manage-home-care-plan",
      label: "Thumbtack Help: How to get a personalized plan for your home",
      supports:
        "The Thumbtack app builds a home profile and a personalized plan for your home. Checked 2026-10-01 by a person through web search, not fetched by a script.",
    },
    {
      href: "https://press.thumbtack.com/announcements/one-app-for-your-home-introducing-a-new-thumbtack-for-a-new-generation-of-homeowners/",
      label: "Thumbtack press release, April 2, 2024: One App for Your Home",
      supports:
        "Thumbtack's app plans let you set reminders and track progress. Checked 2026-10-01 by a person through web search, not fetched by a script.",
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.thumbtack.consumer",
      label: "Thumbtack on Google Play",
      supports: "Thumbtack has an Android app for customers. Checked 2026-09-30.",
    },
    {
      href: "https://realestateledger.io/guides/home-maintenance-schedule-app",
      label: "Real Estate Ledger: home maintenance schedule apps (June 4, 2026)",
      supports:
        "Lists Centriq as discontinued. Checked 2026-09-30.",
    },
  ],
  // Added 2026-10-01 for the three "OakTend vs" comparison guides. Every
  // entry opened that day. Competitor facts are paraphrased, never copied,
  // and come only from the company's own site, its store listings or its SEC
  // filing. Guardrails: OakTend-marketing/research-2026-10-01/
  // comparison-pages-legal.md. Re-check every entry before bumping a date.
  "/guides/oaktend-vs-homezada": [
    {
      href: "https://www.homezada.com/homeowners/pricing",
      label: "HomeZada homeowner pricing",
      supports:
        "Essentials free (10 Homeowner AI chats); Premium $99 a year or $15.95 a month, adding Home Maintenance, Home Remodel Projects and Home Finances (100 chats); Deluxe $189 a year for up to 3 properties (250 chats), each property above 3 a $99 a year add-on. Checked 2026-10-01.",
    },
    {
      href: "https://www.homezada.com/",
      label: "HomeZada home page",
      supports:
        "HomeZada describes itself as a digital home management platform for inventory, maintenance, remodel projects and finances, and says it is not a contractor marketplace. Checked 2026-10-01.",
    },
    {
      href: "https://apps.apple.com/us/app/homezada-mobile/id473722482",
      label: "HomeZada Mobile on the App Store",
      supports:
        "HomeZada has an app for iPhone and iPad (also listed for Mac and Apple Vision). Checked 2026-10-01.",
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.homezada.mobile",
      label: "HomeZada Mobile on Google Play",
      supports: "HomeZada has an Android app, from HomeZada, Inc. Checked 2026-10-01.",
    },
    {
      href: "https://www.homezada.com/terms-and-conditions",
      label: "HomeZada Terms and Conditions",
      supports:
        "HomeZada and Zada are registered trademarks of HomeZada, Inc. Checked 2026-10-01.",
    },
  ],
  "/guides/oaktend-vs-angi": [
    {
      href: "https://www.sec.gov/Archives/edgar/data/1705110/000170511026000011/angi-20251231.htm",
      label: "Angi Inc. Form 10-K for fiscal year 2025 (SEC)",
      supports:
        "Angi connects home pros with consumers in more than 500 categories through a nationwide network; matching, booking of pre-priced services and related tools are free to consumers once they register, and it also sells membership packages to consumers; revenue comes from fees pros pay for consumer matches, advertising and memberships; US lead revenue (fees pros pay for consumer matches) was 57% of Angi Inc.'s 2025 consolidated revenue. Checked 2026-10-01.",
    },
    {
      href: "https://apps.apple.com/us/app/angi-find-local-home-services/id432633172",
      label: "Angi: Find Local Home Services on the App Store",
      supports:
        "Free app from Angi Inc. for iPhone and iPad; lists home maintenance planner features. Checked 2026-10-01.",
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.servicemagic.consumer",
      label: "Angi: Hire Home Service Pros on Google Play",
      supports: "Angi has an Android app, from Angi Inc. Checked 2026-10-01.",
    },
  ],
  "/guides/oaktend-vs-thumbtack": [
    {
      href: "https://www.thumbtack.com/",
      label: "Thumbtack home page",
      supports:
        "Thumbtack is for finding local pros for repairs, upgrades and projects; it calls its app free. Checked 2026-10-01.",
    },
    {
      href: "https://www.thumbtack.com/pro",
      label: "Thumbtack for pros",
      supports:
        "Free for pros to join, with no subscription; pros pay for leads. Checked 2026-10-01.",
    },
    {
      href: "https://help.thumbtack.com/article/manage-home-care-plan",
      label: "Thumbtack Help: How to get a personalized plan for your home",
      supports:
        "The Thumbtack app builds a home profile and a personalized plan of projects for your home, with guides based on your home and the season. Checked 2026-10-01 by a person through web search, not fetched by a script.",
    },
    {
      href: "https://press.thumbtack.com/announcements/one-app-for-your-home-introducing-a-new-thumbtack-for-a-new-generation-of-homeowners/",
      label: "Thumbtack press release, April 2, 2024: One App for Your Home",
      supports:
        "Thumbtack's app added a Home Profile, Seasonal Upkeep Guides, and plans where you can set reminders and track progress. Checked 2026-10-01 by a person through web search, not fetched by a script.",
    },
    {
      href: "https://apps.apple.com/us/app/thumbtack-home-service-pros/id852703300",
      label: "Thumbtack on the App Store",
      supports:
        "Free iPhone app from Thumbtack, Inc.; get prices, read reviews, message pros and hire in the app. Checked 2026-10-01.",
    },
    {
      href: "https://play.google.com/store/apps/details?id=com.thumbtack.consumer",
      label: "Thumbtack on Google Play",
      supports: "Thumbtack has an Android app for customers. Checked 2026-10-01.",
    },
    {
      href: "https://www.thumbtack.com/brand/",
      label: "Thumbtack brand guidelines",
      supports:
        "Thumbtack's trademarks belong to Thumbtack, Inc., credited as such on this page. Checked 2026-10-01.",
    },
  ],
};

export function guideSources(path: string): GuideSource[] {
  return GUIDE_SOURCES[path] ?? [];
}
