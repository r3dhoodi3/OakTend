import type { LaunchCityName } from "@/lib/serviceArea";

// The city table on the three remodel cost guides (kitchen, bathroom, ADU):
// where each city takes permit applications, what its own permit page says
// needs one, whether part of the city is in the coastal zone, and how much of
// its housing was built before 1980. The ADU guide adds a pre-approved plans
// column. Rendered by src/components/OcRemodelCityTable.tsx.
//
// ONLY CITIES SOMEONE CHECKED. Every row below was opened on 2026-09-24 (the
// SEO research pass) and again on 2026-09-25. Cities whose sites could not be
// read are left out rather than guessed: Costa Mesa's whole site blocked
// automated reads both days, so it has no row and no permit details anywhere
// on these guides until someone opens it in a browser.
//
// `permitRule` is what that city's own page says, trimmed, and nothing more.
// Where the page does not say what needs a permit, the cell says so instead
// of filling in the usual California pattern.
//
// `pre1980` is the share of housing units built in 1979 or earlier: the sum
// of the "1970 to 1979" through "1939 or earlier" rows of Census table B25034
// over its total, American Community Survey 5-year estimates 2020-2024, read
// through Census Reporter on 2026-09-25 (CENSUS_B25034_SOURCE below). Census
// does not publish that rollup itself, and the estimates carry sampling error,
// so they are rounded to whole percents.
//
// `aduPlans` is null where no pre-approved ADU plan program could be
// confirmed. That means "not confirmed", not "none": the table says so.

export type OcRemodelCity = {
  name: LaunchCityName;
  /** The city's own permit page or portal. */
  permitHref: string;
  /** Link text: the portal or page name the city uses. */
  permitLabel: string;
  /** What the city's page says needs a permit, or that it does not say. */
  permitRule: string;
  /** True when part of the city is in the California coastal zone. */
  coastal: boolean;
  /** Percent of housing units built before 1980, ACS 2020-2024. */
  pre1980: number;
  /** The city's pre-approved ADU plan program, or null if not confirmed. */
  aduPlans: { href: string; text: string } | null;
};

// Orange County as a whole, same table and vintage as the city rows.
export const OC_PRE_1980 = 57;

export const CENSUS_B25034_HREF =
  "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,16000US0625380,16000US0629000,16000US0669000,16000US0636000,16000US0602000,16000US0651182,16000US0648256,16000US0680854,16000US0636770";

// Oldest housing first, so the table reads as a gradient from the 1950s and
// 1960s tract cities to Irvine.
export const OC_REMODEL_CITIES: OcRemodelCity[] = [
  {
    name: "Fountain Valley",
    permitHref: "https://www.fountainvalley.gov/397/Building-Permits",
    permitLabel: "Building permits page",
    permitRule:
      "Changing any electrical, gas, mechanical or plumbing system needs a permit. Paint, tile, cabinets and counters do not.",
    coastal: false,
    pre1980: 82,
    aduPlans: null,
  },
  {
    name: "Garden Grove",
    permitHref: "https://ggcity.org/building-and-safety/obtaining-building-permit-faqs",
    permitLabel: "Building permit FAQ",
    permitRule:
      "Alterations to a room, electrical, plumbing, heating or air conditioning work, and new or replaced windows or skylights need a permit.",
    coastal: false,
    pre1980: 77,
    aduPlans: null,
  },
  {
    name: "Santa Ana",
    permitHref: "https://santa-ana.gov/permit-faqs/",
    permitLabel: "Permit FAQs",
    permitRule:
      "Electrical, gas, mechanical and plumbing work needs a permit. Paint, tile, cabinets and counters do not.",
    coastal: false,
    pre1980: 74,
    aduPlans: {
      href: "https://santa-ana.gov/pre-approved-adu-plans/",
      text: "Yes: studio, one and two bedroom detached plans",
    },
  },
  {
    name: "Huntington Beach",
    permitHref:
      "https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/index.php",
    permitLabel: "HB ACA Portal (Building Division)",
    permitRule:
      "A permit is required to build, enlarge, alter, repair or demolish a building.",
    coastal: true,
    pre1980: 69,
    aduPlans: {
      href: "https://www.huntingtonbeachca.gov/departments/community_development/planning_zoning/accessory_dwelling_units_(adus).php",
      text: "Yes: one plan, a 490 sq ft one-story detached unit",
    },
  },
  {
    name: "Anaheim",
    permitHref: "https://www.anaheim.net/6015/Online-Permit-Center",
    permitLabel: "Online Permit Center",
    permitRule:
      "The city's residential remodel page lists the permit application and plan check checklist, not an exempt list.",
    coastal: false,
    pre1980: 65,
    aduPlans: {
      href: "https://www.anaheim.net/6351/Pre-Approved-Plan-Catalogue",
      text: "Yes: four free plans, 224 to 1,199 sq ft (ADU Express)",
    },
  },
  {
    name: "Newport Beach",
    permitHref:
      "https://www.newportbeachca.gov/government/departments/community-development/building-division/online-permitting-ipermit",
    permitLabel: "iPermit",
    permitRule: "The portal page does not list what needs a permit. Ask the Permit Center.",
    coastal: true,
    pre1980: 55,
    aduPlans: {
      href: "https://newportbeachadu.org/adu-plans-2",
      text: "Yes: five standard plans, including two garage conversions",
    },
  },
  {
    name: "Mission Viejo",
    permitHref: "https://www.missionviejo.gov/departments/community-development/building-services",
    permitLabel: "Client Self Service (Building Services)",
    permitRule: "The page does not list what needs a permit. Ask Building Services.",
    coastal: false,
    pre1980: 52,
    aduPlans: null,
  },
  {
    name: "Tustin",
    permitHref: "https://www.tustinca.org/409/Permits-Process",
    permitLabel: "Citizen Self Service (Permits Process)",
    permitRule:
      "Building, mechanical, plumbing and electrical plans go in through the portal. The page does not list exemptions.",
    coastal: false,
    pre1980: 47,
    aduPlans: null,
  },
  {
    name: "Irvine",
    permitHref: "https://cityofirvine.gov/node/69606",
    permitLabel: "IrvineReady! portal (interior remodels)",
    permitRule:
      "Interior remodels are submitted online. The city says to expect about five business days for the first plan check.",
    coastal: false,
    pre1980: 21,
    aduPlans: {
      href: "https://cityofirvine.gov/building-permits-and-inspections/pre-approved-adu-plans-program",
      text: "Yes: ADU Standard Plan Program",
    },
  },
];

// The Coastal Commission's boundary maps, for "am I in the coastal zone".
export const COASTAL_ZONE_MAP_HREF = "https://www.coastal.ca.gov/maps/czb/";
