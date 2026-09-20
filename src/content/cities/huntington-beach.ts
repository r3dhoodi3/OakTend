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
    "Huntington Beach's median home was built in 1972, so the typical house here is a postwar tract home past fifty, and it is doing that aging within a couple of miles of salt air. Coastal exposure is the difference that matters: paint, metal fixtures, roof flashing and outdoor HVAC equipment wear faster near the water than the same parts would inland. The city also runs its own water utility rather than buying through a wholesaler, and that water is hard, which quietly shortens the life of water heaters and fixtures across the whole city.",
  metaDescription:
    "Huntington Beach's median home was built in 1972, on the coast. Salt-air wear, hard city water, the HB permit portal, and guides that fit.",

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
        text: "Huntington Beach's median year built is 1972, roughly a generation older than Irvine's housing stock, and about two thirds of the city's 82,014 housing units went up between 1960 and 1979. A home of that vintage is typically on its second water heater, its first or second roof, and an electrical panel that was sized for a 1970s household rather than a modern one.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0636000",
        sourceLabel: "Census Reporter, ACS 2024 tables B25034 and B25035",
      },
      {
        text: "The city's own figures put local well water near 12 grains per gallon and imported water near 9, which works out to roughly 154 to 205 ppm depending on the blend your area is on. That is hard on the standard scale, so scale buildup in water heaters, valves and fixtures is a normal Huntington Beach maintenance item rather than a sign something has gone wrong.",
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
    note: "These are different maintenance problems, not just different addresses. Huntington Harbour is five man-made islands on canals, so dock hardware, seawalls and constant humidity are part of the picture there. Downtown and Sunset Beach sit closest to open water and take the most direct salt exposure. Seacliff and the Goldenwest area near Huntington Central Park sit further back, where the tract-age questions matter more than the salt ones.",
    sourceUrl: "https://www.redfin.com/blog/huntington-beach-ca-neighborhoods/",
  },

  water: {
    utility: "City of Huntington Beach Water Division",
    utilityUrl:
      "https://www.huntingtonbeachca.gov/departments/public_works/water_and_sewer/drinking_water_quality.php",
    summary:
      "Huntington Beach runs its own municipal water utility. Roughly 85 percent of the supply is local groundwater from city wells and about 15 percent is imported treated surface water from Metropolitan, a mix the city blends and shifts seasonally. The city puts its well water near 12 grains per gallon and the imported side near 9, which is roughly 154 to 205 ppm, squarely in the hard range.",
    sourceUrl:
      "https://www.huntingtonbeachca.gov/departments/public_works/water_and_sewer/drinking_water_quality.php",
  },

  permits: {
    office: "Huntington Beach Community Development, Building Division",
    portalUrl: "https://aca-prod.accela.com/cohb",
    summary:
      "Permits run through the HB ACA portal, an Accela Citizen Access system reachable at aca-prod.accela.com/cohb or through the city's engage site. One practical warning worth knowing before you start: the portal is not well supported on mobile Safari or mobile Firefox, so do the application on a desktop browser rather than fighting it on a phone.",
    sourceUrl: "https://engage.huntingtonbeachca.gov",
  },

  hazards: [
    {
      text: "Wildfire hazard here is lower than in the county's canyon cities but it is not zero: the Huntington Beach Fire Department states the city has areas the State Fire Marshal identifies as Moderate and High fire hazard severity zones, and no areas rated Very High. The city runs its own fire department rather than being served by OCFA, so confirm a specific address through the city's page or the state viewer rather than an OCFA map.",
      sourceUrl:
        "https://www.huntingtonbeachca.gov/departments/fire/our_community_and_risk_reduction/wildland_fire_hazard_severity_zones.php",
      sourceLabel: "Huntington Beach Fire Department",
    },
    {
      text: "Liquefaction zone boundaries for Huntington Beach parcels were not confirmed in the sources we checked, so this is a reason to look rather than an answer. The authoritative source is the California Geological Survey's seismic hazards liquefaction zone dataset, which answers by address; run it before a foundation, drainage or addition project instead of assuming a coastal lot is either fine or doomed.",
      sourceUrl:
        "https://data.ca.gov/dataset/cgs-seismic-hazards-program-liquefaction-zones",
      sourceLabel: "California Geological Survey, liquefaction zones",
    },
    {
      text: "Flood zone status for Huntington Beach parcels was not verified in the sources we checked, and we are not going to characterize a whole city on a guess. Given the harbor and the low, wetland-adjacent ground around Huntington Harbour, Sunset Beach and Bolsa Chica, it is worth checking: FEMA's Flood Map Service Center answers by address, and the answer affects insurance as well as what a remodel has to account for.",
      sourceUrl: "https://msc.fema.gov/",
      sourceLabel: "FEMA Flood Map Service Center",
    },
    {
      text: "Mello-Roos is less common here than in South County, since most of Huntington Beach was built out before the 1982 law existed. Whether newer coastal developments such as Brightwater at Bolsa Chica carry an assessment is genuinely unsettled: the secondary sources we found contradict each other, and neither is the county. Check the specific parcel on the county Treasurer-Tax Collector's Mello-Roos tools rather than assuming either way.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "Huntington Beach has a Local Coastal Program the Coastal Commission first certified in 1985 and the city last comprehensively updated in 2001. Inside the certified area the city issues coastal development permits itself, but the Commission keeps direct jurisdiction over tidelands, submerged lands and public trust lands, so pier, bulkhead or beach-adjacent work can go through the Commission instead. Find out which one your project falls under before assuming a city permit covers it.",
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
        "What a system runs, and why coil corrosion shortens equipment life closer to the water than it does inland.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, for roofs that take both sun and salt air on a 50-year-old tract home.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical price range and when a repair still makes sense, on water hard enough to scale a tank early.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "A month-by-month calendar written for this climate, including what coastal exteriors need and when.",
    },
  ],

  neighbors: ["fountain-valley", "costa-mesa", "westminster"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater in Huntington Beach?",
      a: "Plan on it, and confirm before you start. Water heater replacement and HVAC changeouts both appear as permit categories in the city's Accela building module, but we could not find a Huntington Beach page that states the requirement in plain words, so we are not going to claim the city says something it may not. The Building and Inspections office answers this directly at 714-536-5241, and the application goes through the HB ACA portal. Do the portal work on a desktop browser, since mobile Safari and mobile Firefox are not well supported there.",
    },
    {
      q: "Is Huntington Beach's water hard?",
      a: "Yes. The city puts its local well water, about 85 percent of the supply, near 12 grains per gallon and the imported side near 9, which is roughly 154 to 205 ppm depending on the blend in a given season. That is squarely in the hard range, which is why water heaters here collect sediment faster than the manual's schedule assumes, and why flushing the tank annually is worth the hour it takes.",
    },
    {
      q: "Does living near the beach really shorten the life of my HVAC?",
      a: "Near the water, yes, and it is the outdoor half that suffers. Salt air corrodes exposed metal, so condenser coils, fasteners, roof flashing, garage door hardware and exterior light fixtures all age faster within a couple of miles of the coast than the same parts would in Irvine or Anaheim. Coated coils and a routine freshwater rinse of the outdoor unit are the two cheapest things that help.",
    },
    {
      q: "Does my Huntington Beach home pay Mello-Roos?",
      a: "Most likely not. The city was largely built out before the 1982 Mello-Roos law existed, so the districts that blanket parts of South County are rare here. Newer coastal developments such as Brightwater at Bolsa Chica are the obvious place to check, and their status is genuinely disputed: the secondary sources we found say opposite things and neither is the county. It is a parcel-level answer either way, and the Orange County Treasurer-Tax Collector's lookup gives it for a specific address.",
    },
    {
      q: "Is my Huntington Beach home in a flood or liquefaction zone?",
      a: "It is worth checking, because this is one of the Orange County cities where the answer is sometimes yes. The city sits low between the Santa Ana River and the Bolsa Chica wetlands, so FEMA's Flood Map Service Center is the right check for flood zoning and the California Geological Survey's seismic hazard lookup is the right one for liquefaction. Both answer by address, not by city.",
    },
    {
      q: "Does OakTend only serve Huntington Beach?",
      a: "No. OakTend covers all of Orange County. Huntington Beach has its own page because coastal exposure and city-run water genuinely change the advice here, not because the service stops at the city line.",
    },
  ],

  updated: "2026-09-16",
};
