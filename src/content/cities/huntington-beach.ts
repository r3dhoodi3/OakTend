import type { CityContent } from "./types";

// Huntington Beach. Facts and sources: section 4 of
// OakTend-marketing/reports-2026-09-16/seo-research-city-pages.md.
//
// The angle that makes this page not interchangeable: a 1972 median build
// year doing its aging within a couple of miles of salt air, on water the
// city pumps and treats itself. The coastal-corrosion material belongs here
// and on the other coastal cities, NEVER on Irvine, Santa Ana or Anaheim.
//
// SOURCING PASS 2026-09-16 (second). The population figure now matches the
// research file's own correction (about 193,000 to 193,200, 2024 vintage,
// against 198,711 at the 2020 Census) and cites Census Reporter, because
// census.gov blocked the fetch. The USDA hardiness-zone fact is gone: the
// research says in two places not to state a zone number for this city. The
// Brightwater Mello-Roos line and the water-heater permit answer are both
// hedged, because the research left both unresolved rather than settled.
//
// RECONCILED 2026-09-16 against the second research pass. Three numbers moved
// and all three were the draft guessing: the median year built is 1972 from
// Census table B25035, not 1974; the city's own current figures put hardness
// near 154 to 205 ppm, not 161 to 278; and the Fire Department says the city
// DOES have Moderate and High fire hazard severity zone area, which the draft
// had written off as minimal to none.
//
// FACT CHECK 2026-09-19. The FAQ gave 714-536-5511 as the Building Division's
// number; that is the City Hall main line printed in the footer of every city
// page. The Building and Inspections page gives its general office number as
// (714) 536-5241, for questions about when a permit is or is not required:
// https://www.huntingtonbeachca.gov/departments/community_development/building_inspection/index.php
// (The Permit Center, a separate counter, lists 714-536-5271.) Also: "average"
// build year became "median" in the meta description, since the figure is
// table B25035, and the population line now names Census Reporter, which is
// what it links to.

export const huntingtonBeach: CityContent = {
  name: "Huntington Beach",
  slug: "huntington-beach",
  intro:
    "Most Huntington Beach homes are 1960s and 1970s tracts now past fifty, aging within a couple of miles of salt air. The city pumps most of its own water from local wells, and that water is hard.",
  metaDescription:
    "Huntington Beach's median home was built in 1972, near the sand. Salt-air wear, hard city well water, the HB permit portal and the Local Coastal Program.",
  metaTitle: "Huntington Beach: 1972 tract homes in salt air",

  population: {
    value: "About 193,000 to 193,200 people",
    asOf: "2024 vintage estimates; the 2020 Census counted 198,711",
    sourceUrl:
      "https://censusreporter.org/profiles/16000US0636000-huntington-beach-ca/",
    sourceLabel: "Census Reporter, U.S. Census Bureau data",
  },

  homes: {
    exposure: "coastal",
    medianYearBuilt: "1972",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0636000",
      sourceLabel: "Census Reporter, ACS 2024 table B25035",
    },
    facts: [
      {
        text: "The median year built is 1972, roughly a generation older than Irvine, and about two thirds of the city's 82,014 housing units went up between 1960 and 1979. A house that age is usually on its second water heater, with a panel sized for a 1970s household.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0636000",
        sourceLabel: "Census Reporter, ACS 2024 tables B25034 and B25035",
      },
      {
        text: "The city puts its well water near 12 grains per gallon and imported water near 9, roughly 154 to 205 ppm depending on the blend. That is hard, so scale in water heaters, valves and fixtures is routine here.",
        sourceUrl:
          "https://www.huntingtonbeachca.gov/departments/public_works/water_and_sewer/drinking_water_quality.php",
        sourceLabel: "City of Huntington Beach water quality",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Downtown and the Main Street pier area",
      "Huntington Harbour",
      "Sunset Beach",
      "Seacliff",
      "Goldenwest",
    ],
    note: "Huntington Harbour is five man-made islands on canals, so docks, seawalls and humidity are part of upkeep there. Downtown and Sunset Beach take the most direct salt. Seacliff and the Goldenwest area near Huntington Central Park sit further back, where tract age matters more than salt.",
    sourceUrl: "https://www.redfin.com/blog/huntington-beach-ca-neighborhoods/",
  },

  water: {
    utility: "City of Huntington Beach Water Division",
    utilityUrl:
      "https://www.huntingtonbeachca.gov/departments/public_works/water_and_sewer/drinking_water_quality.php",
    summary:
      "The city runs its own water utility. About 85 percent of the supply is groundwater from city wells and about 15 percent is imported treated water from Metropolitan, blended and shifted by season.",
    sourceUrl:
      "https://www.huntingtonbeachca.gov/departments/public_works/water_and_sewer/drinking_water_quality.php",
  },

  permits: {
    office: "Huntington Beach Community Development, Building Division",
    portalUrl: "https://aca-prod.accela.com/cohb",
    summary:
      "Permits run through the HB ACA portal, an Accela Citizen Access system also reachable from the city's engage site. Use a desktop browser: the portal is not well supported on mobile Safari or mobile Firefox.",
    sourceUrl: "https://engage.huntingtonbeachca.gov",
  },

  hazards: [
    {
      text: "The city runs its own fire department rather than using OCFA, and the department says parts of Huntington Beach are State Fire Marshal Moderate and High fire hazard severity zones, with none rated Very High. Check an address on the city's page or the state viewer, not an OCFA map.",
      sourceUrl:
        "https://www.huntingtonbeachca.gov/departments/fire/our_community_and_risk_reduction/wildland_fire_hazard_severity_zones.php",
      sourceLabel: "Huntington Beach Fire Department",
    },
    {
      text: "Liquefaction zone boundaries for Huntington Beach parcels were not confirmed for this page. The California Geological Survey's liquefaction zone dataset answers by address; check it before foundation, drainage or addition work.",
      sourceUrl:
        "https://data.ca.gov/dataset/cgs-seismic-hazards-program-liquefaction-zones",
      sourceLabel: "California Geological Survey, liquefaction zones",
    },
    {
      text: "Flood zoning was not verified here either. The low, wetland-edge ground around Huntington Harbour, Sunset Beach and Bolsa Chica is where to check first, on FEMA's Flood Map Service Center, which answers by address.",
      sourceUrl: "https://msc.fema.gov/",
      sourceLabel: "FEMA Flood Map Service Center",
    },
    {
      text: "Most of the city was built before the 1982 Mello-Roos law, so the special tax is less common than in South County. Whether newer coastal tracts such as Brightwater at Bolsa Chica carry one is unsettled, since secondary sources disagree; the county Treasurer-Tax Collector's lookup answers by parcel.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "The Coastal Commission certified the city's Local Coastal Program in 1985, and the city last updated it comprehensively in 2001. The city issues coastal development permits inside that area, but the Commission keeps tidelands, submerged lands and public trust lands, so pier, bulkhead or beach-adjacent work may go to the Commission instead.",
      sourceUrl:
        "https://www.huntingtonbeachca.gov/departments/community_development/local_coastal_program.php",
      sourceLabel: "City of Huntington Beach Local Coastal Program",
    },
  ],

  guides: [
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "Replacement pricing for systems whose outdoor coils sit in salt air most of the year.",
    },
    {
      href: "/guides/hoa-coastal-commission-remodel-orange-county",
      title: "HOA and coastal permits in Orange County",
      blurb:
        "When harbor, pier or beachfront work here needs a coastal development permit, and from whom.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Well water near 12 grains per gallon scales tanks early here; this is what a new one costs.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "The seasonal list, including the extra exterior care a house near the sand needs.",
    },
  ],

  neighbors: ["fountain-valley", "costa-mesa", "westminster", "seal-beach"],

  faq: [
    {
      q: "Who can tell me whether a Huntington Beach job needs a permit?",
      a: "The Building and Inspections office, at 714-536-5241. Water heater replacement and HVAC changeouts are listed permit categories in the city's Accela module, but no city page states the rule in plain words, so call before you start.",
    },
    {
      q: "Does salt air shorten HVAC life in Huntington Beach?",
      a: "Yes, mostly on the outdoor unit. Salt corrodes condenser coils and fasteners faster within a couple of miles of the coast than in Irvine or Anaheim. Coated coils and a routine freshwater rinse of the outdoor unit are the two cheapest things that help.",
    },
  ],

  updated: "2026-09-16",
};
