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
  "/guides/permits-orange-county": {
    guides: [
      "/guides/contractor-deposit-rules-california",
      "/guides/water-heater-replacement-cost",
      "/guides/is-my-contractor-quote-fair",
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
  "/guides/hard-water-orange-county": {
    guides: [
      "/guides/water-heater-replacement-cost",
      "/guides/slab-leak-signs",
      "/guides/home-maintenance-schedule",
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
      "/guides/hard-water-orange-county",
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
// Every entry below was opened and checked on 2026-09-20 or 2026-09-21.
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
      href: "https://www.ocwd.com/about/",
      label: "Orange County Water District: about the district",
      supports:
        "The groundwater basin provides about 85 percent of the water supply for 2.5 million people in north and central Orange County.",
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
        "The 2025 Energy Code applies to permits applied for on or after January 1, 2026, and expands the use of heat pumps in newly built homes.",
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
        "The 2025 Energy Code applies to permits applied for on or after January 1, 2026, and expands the use of heat pumps in newly built homes.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit, or for work valued at $1,000 or more in combined labor and materials, must hold a valid contractor license.",
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
        "Anyone who contracts for a job that requires a building permit, or for work valued at $1,000 or more in combined labor and materials, must hold a valid contractor license.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.5",
      label: "California Business and Professions Code section 7159.5",
      supports:
        "The down payment cap: $1,000 or 10 percent of the contract amount, whichever is less.",
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
        "Anyone who contracts for a job that requires a building permit, or for work valued at $1,000 or more in combined labor and materials, must hold a valid contractor license.",
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
        "Anyone who contracts for a job that requires a building permit, or for work valued at $1,000 or more in combined labor and materials, must hold a valid contractor license.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2622",
      label: "California Assembly Bill 2622 (2023-2024)",
      supports:
        "The license exemption rose from under $500 to under $1,000, and does not apply to work that needs a building permit or to anyone who employs helpers.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159",
      label: "California Business and Professions Code section 7159",
      supports:
        "A home improvement contract over $500 must be in writing and signed.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.5",
      label: "California Business and Professions Code section 7159.5",
      supports:
        "The down payment cap: $1,000 or 10 percent of the contract amount, whichever is less.",
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
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 2024, table B25034 (year structure built), Orange County",
      supports:
        "Share of Orange County housing units by decade built: about 12 percent in the 1950s, 19 percent in the 1960s, and 22 percent in the 1970s.",
    },
    {
      href: "https://www.irwd.com/learn/water-quality-report/",
      label:
        "Irvine Ranch Water District: water quality questions and answers",
      supports:
        "Imported water is typically hard, and the higher mineral content leaves white spots on glassware.",
    },
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit, or for work valued at $1,000 or more in combined labor and materials, must hold a valid contractor license.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2622",
      label: "California Assembly Bill 2622 (2023-2024)",
      supports:
        "The license exemption rose from under $500 to under $1,000, and does not apply to work that needs a building permit or to anyone who employs helpers.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159",
      label: "California Business and Professions Code section 7159",
      supports:
        "A home improvement contract over $500 must be in writing and signed.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=7159.5",
      label: "California Business and Professions Code section 7159.5",
      supports:
        "The down payment cap: $1,000 or 10 percent of the contract amount, whichever is less.",
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
  ],
  "/guides/slab-leak-signs": [
    {
      href: "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059",
      label:
        "Census Reporter: U.S. Census Bureau American Community Survey 2024, table B25034 (year structure built), Orange County",
      supports:
        "Share of Orange County housing units by decade built: about 12 percent in the 1950s, 19 percent in the 1960s, and 22 percent in the 1970s.",
    },
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
  ],
  "/guides/home-maintenance-schedule": [
    {
      href: "https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist",
      label: "ENERGY STAR heating and cooling maintenance checklist",
      supports: "Checking the air filter once a month.",
    },
    {
      href: "https://www.energystar.gov/saveathome/heating-cooling",
      label: "ENERGY STAR: heat and cool efficiently",
      supports:
        "Changing the air filter when it looks dirty, and at least every 3 months.",
    },
    {
      href: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/smoke-alarms/",
      label: "U.S. Fire Administration: smoke alarms",
      supports:
        "Testing smoke alarms monthly, replacing batteries at least once a year, and replacing the alarms themselves every 10 years.",
    },
    {
      href: "https://www.irwd.com/learn/water-quality-report/",
      label:
        "Irvine Ranch Water District: water quality questions and answers",
      supports:
        "Flushing the water heater once a year; imported water is typically hard and the district's well water is moderately hard.",
    },
    {
      href: "https://ipm.ucanr.edu/home-and-landscape/drywood-termites/",
      label:
        "University of California Statewide IPM Program: drywood termites",
      supports:
        "Drywood termite swarmers are most often seen during daytime hours in summer and fall.",
    },
    {
      href: "https://forecast.weather.gov/glossary.php?word=santa%20ana",
      label: "National Weather Service glossary: Santa Ana wind",
      supports:
        "Santa Ana winds are strong, hot, dust-bearing winds that descend to the Pacific coast from the inland desert regions.",
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
    {
      href: "https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/What_Kind_Of_Contractor.aspx",
      label:
        "Contractors State License Board: what kind of contractor do you need",
      supports:
        "Anyone who contracts for a job that requires a building permit, or for work valued at $1,000 or more in combined labor and materials, must hold a valid contractor license.",
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
  "/guides/socal-home-maintenance-calendar": [
    {
      href: "https://www.fema.gov/sites/default/files/2020-07/fema_tb8_corrosion_protection_metal_connectors_coastal_areas.pdf",
      label:
        "FEMA: NFIP Technical Bulletin 8, corrosion protection for metal connectors and fasteners in coastal areas (June 2019)",
      supports:
        "Salt spray carried by onshore winds significantly accelerates the corrosion of metal, is greatest within 300 to 3,000 feet of the shoreline, and has been measured as far as 5 to 10 miles inland.",
    },
    {
      href: "https://www.irwd.com/learn/water-quality-report/",
      label:
        "Irvine Ranch Water District: water quality questions and answers",
      supports:
        "Imported water is typically hard, and the district recommends flushing the water heater once a year.",
    },
    {
      href: "https://ipm.ucanr.edu/home-and-landscape/drywood-termites/",
      label:
        "University of California Statewide IPM Program: drywood termites",
      supports:
        "Drywood termite swarmers are most often seen during daytime hours in summer and fall.",
    },
    {
      href: "https://forecast.weather.gov/glossary.php?word=santa%20ana",
      label: "National Weather Service glossary: Santa Ana wind",
      supports:
        "Santa Ana winds are strong, hot, dust-bearing winds that descend to the Pacific coast from the inland desert regions.",
    },
    {
      href: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/smoke-alarms/",
      label: "U.S. Fire Administration: smoke alarms",
      supports:
        "Testing smoke alarms monthly, replacing 9-volt batteries at least once a year, and replacing alarms after 10 years.",
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
        "Energy code testing may be mandatory depending on the work, properly permitted work triggers it, a homeowner may hire an independent rater, and the testing moved to the Energy Code Compliance program on January 1, 2026.",
    },
    {
      href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=19211",
      label: "California Health and Safety Code section 19211",
      supports:
        "All new, replacement and existing residential water heaters must be braced, anchored or strapped against earthquake motion.",
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
      href: "https://www.epa.gov/watersense/fix-leak-week",
      label: "U.S. EPA WaterSense: Fix a Leak Week",
      supports:
        "The meter test: check the water meter before and after a two-hour period with no water use, and if it changes you probably have a leak.",
    },
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
      href: "https://www.fountainvalley.gov/398/Plan-Check-Center",
      label: "City of Fountain Valley: Plan Check Center, expedited permits",
      supports:
        "Fountain Valley lists a residential repipe among its expedited permits.",
    },
    {
      href: "https://santa-ana.gov/pbx-express-permit/",
      label: "City of Santa Ana: PBx Same Day Express Permit Program",
      supports:
        "Santa Ana issues residential repipe and water piping permits through its same-day express program.",
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
        "A contract should say who gets the necessary building permits.",
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
};

export function guideSources(path: string): GuideSource[] {
  return GUIDE_SOURCES[path] ?? [];
}
