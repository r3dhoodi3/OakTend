import type { CityContent } from "./types";

// Midway City. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// NOT A CITY. Midway City is an unincorporated community governed by the
// County of Orange: no city hall, no city building department. It is a
// census-designated place (geoid 16000US0647430) and the ACS margins are wide
// for a place this small (population 7,999 plus or minus 1,252; median year
// built 1973 plus or minus 4). The page says so where it prints them.
//
// The angle that makes this page not interchangeable: who runs what. OC LAFCO
// lists four retail water providers for these four county islands, and an
// Orange County Fire Authority bulletin (IB 02-21, revised 7/9/2026) says three
// small mutual water companies each supply 200 to 300 homes from their own
// single deep well, with hydrant flow in one of them below the Fire Code
// minimum, which limits additions there.
//
// FIRE SERVICE. OCFA really is the fire service here (its member page says it
// serves all unincorporated areas; OC LAFCO lists it as the provider). Its
// directory lists Station 25 at 8171 Bolsa Avenue with the note "Moved to
// Station 64". No OCFA page explains the note, so the page quotes it only.
//
// WATER NUMBERS. Westminster: the city's 2025 Water Quality Report (2025
// testing) from the city's own page; the State Water Board portal still serves
// the older report. Midway City Mutual and Eastside: their 2025 reports on the
// state portal, each printing a 2023 hardness sample. South Midway City
// Mutual: the newest portal report with a hardness row is the one for 2022.
// Grains per gallon are all our conversion, ppm divided by 17.1.
//
// HAZARDS come from queries run today against state and federal map services
// (CGS seismic hazard zones, FEMA's National Flood Hazard Layer, the State
// Fire Marshal's March 24, 2025 LRA layer) using the Census CDP boundary. The
// county's 2021 hazard plan says nothing specific to Midway City.
//
// LEFT OUT ON PURPOSE. The origin of the name (sources disagree, none
// primary), the John Harper founding story (Wikipedia and a real-estate site
// only), Prado Dam inundation, any distance to the Newport-Inglewood fault, the
// name of any flood channel, OC LAFCO's dwelling unit counts (they conflict
// with the Census), annexation history, and water rates.

export const midwayCity: CityContent = {
  name: "Midway City",
  slug: "midway-city",
  intro:
    "Midway City is not a city: it is about 390 acres of unincorporated Orange County in four pieces surrounded by Westminster, so the County of Orange is the building department. Three tiny mutual water companies each serve 200 to 300 homes here from a single deep well of their own, and fewer than four in ten homes are detached houses.",
  metaTitle: "Midway City, CA homes: county permits, well water",
  metaDescription:
    "Midway City is unincorporated: county permits, Sheriff, OCFA, a 1939 sanitary district and three small mutual water companies. What that means for upkeep.",

  population: {
    value: "About 7,999 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003, for the Midway City census-designated place, with a margin of plus or minus 1,252; OC LAFCO's profile of the four islands counts 8,894 residents",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0647430",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "near-coastal",
    medianYearBuilt: "1973",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0647430",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "The median year built is 1973, plus or minus 4 years. Of about 2,862 housing units, roughly 26.4 percent date from the 1950s and 24.6 percent from the 1970s, with only about 8.6 percent from the 1960s between them; about 6 percent predate 1940 and 13.5 percent are infill from 2010 or later. Neighbors on one street can be sixty years apart in plumbing and wiring.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0647430",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "Single-family detached homes are about 37.8 percent of units, attached homes 14.6 percent, buildings of three or four units 14.3 percent, buildings of five or more roughly 23 percent, and mobile homes about 7.6 percent, all with wide margins. With that many shared walls and roofs, the first question on a repair is often who owns it.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25024&geo_ids=16000US0647430",
        sourceLabel: "Census Reporter, ACS 2024 5-year table B25024",
      },
      {
        text: "OC LAFCO treats Midway City as four unincorporated islands in Westminster's sphere of influence, about 391.60 acres in the First Supervisorial District. The County of Orange handles planning, code enforcement, street sweeping, library and animal control; the Sheriff handles law enforcement; the Orange County Fire Authority handles fire; the Midway City Sanitary District handles sewer and trash; and retail water is split among Westminster and three mutual water companies.",
        sourceUrl:
          "https://oclafco.org/wp-content/uploads/2024/01/Bolsa_Midway_Westminster.pdf",
        sourceLabel:
          "OC LAFCO, Westminster Islands unincorporated areas profile (fiscal year 2023-24 data)",
      },
      {
        text: "A fire authority bulletin revised July 9, 2026 says Midway City Mutual Water Company, Eastside Water Association and South Midway City Mutual Water Company each supply 200 to 300 homes from their own single deep well, with emergency connections to a neighbor or to Westminster. Its map puts Midway City Mutual between Beach Boulevard and roughly Monroe Street north of Bolsa Avenue, Eastside from there east to Newland Street, and South Midway in a strip south of Bolsa. Phone numbers: 714-532-9409, 714-894-8106 and 714-842-8080.",
        sourceUrl:
          "https://ocfa.org/document/midway-city-fire-water-flow-report-requirements/",
        sourceLabel:
          "Orange County Fire Authority, Informational Bulletin 02-21, Midway City fire water flow requirements",
      },
      {
        text: "Midway City Mutual's 2025 report names one working source, Well 02 at 14741 Jackson Street, plus an emergency connection, and lists hardness at 163 ppm from a 2023 sample, about 9.5 grains per gallon by conversion. Its 2025 lead and copper round of 10 homes found no lead. The board meets the second Tuesday of each month at 7 p.m.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010097&Year=2025&isCert=false",
        sourceLabel:
          "Midway City Mutual Water Company, 2025 Consumer Confidence Report, State Water Board portal",
      },
      {
        text: "Eastside Water Association draws from Well 04 at 8341 Madison Avenue and lists hardness at 153 ppm from a 2023 sample, about 9 grains per gallon by conversion. Its board meets the fourth Tuesday of each month at 7 p.m.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010008&Year=2025&isCert=false",
        sourceLabel:
          "Eastside Water Association, 2025 Consumer Confidence Report, State Water Board portal",
      },
      {
        text: "The Midway City Sanitary District formed in 1939 under the Sanitary District Act of 1923, held its first board meeting on January 13, 1939 at the Fire Hall in Midway City, and opened bids for the original sewer mains on January 22, 1953. Its first territory ran from Hazard to McFadden and Hoover to Newland; today it covers 10.4 square miles, all of Westminster and Midway City.",
        sourceUrl: "https://www.midwaycitysanitaryca.gov/about-us",
        sourceLabel: "Midway City Sanitary District, district history",
      },
      {
        text: "The district's regulations make house connections and street laterals the property owner's to maintain. Owner-occupied single-family homes, and duplexes or triplexes where the owner lives in a unit, can be reimbursed up to 50 percent of an approved lateral job, capped at $1,800. Apply with at least two written bids before work starts; the program ends each year when its budget runs out.",
        sourceUrl:
          "https://www.midwaycitysanitaryca.gov/sewer-lateral-assistance-program",
        sourceLabel: "Midway City Sanitary District, sewer lateral assistance program",
      },
      {
        text: "The fire authority's directory lists Station 25 at 8171 Bolsa Avenue, a career station established in 1935 with a daily captain, engineer and two firefighters, carrying the note 'Moved to Station 64' (7351 Westminster Boulevard) when checked. Law enforcement is the Sheriff's North Patrol, non-emergency 714-647-7000.",
        sourceUrl: "https://ocfa.org/about-us/departments/operations/",
        sourceLabel: "Orange County Fire Authority, operations and station directory",
      },
    ],
  },

  neighborhoods: {
    names: ["Bolsa/Midway", "Beach/McFadden", "Bolsa/Pacific", "McFadden/Monroe"],
    note: "These are OC LAFCO's names for the four islands, not signs on a street, and they match the four pieces of the Census boundary. Bolsa/Midway, east of Beach Boulevard and south of Hazard Avenue, is the main one at 296.85 acres. Beach/McFadden (40.77 acres) is west of Beach and north of McFadden, Bolsa/Pacific (21.14 acres) is south of Bolsa and west of Beach, and McFadden/Monroe (32.84 acres) is south of McFadden.",
    sourceUrl: "https://oclafco.org/agency-boundaries/county-unincorporated-areas/",
  },

  water: {
    utility: "Three mutual water companies and the City of Westminster, by address",
    utilityUrl:
      "https://ocfa.org/document/midway-city-fire-water-flow-report-requirements/",
    summary:
      "Your bill names your supplier: Westminster or one of the three mutual companies. The City of Westminster Water Division serves portions of Midway City; its 2025 report shows hardness averaging 251 ppm, about 14.7 grains per gallon by conversion (range 133 to 359 ppm), from 100 percent groundwater that year. The mutual wells test softer, 163 and 153 ppm. For South Midway City Mutual the newest report with a hardness figure is for 2022, at 260 ppm, and the state's record shows it also buys water from Westminster. All of it is hard water.",
    sourceUrl:
      "https://www.westminster-ca.gov/departments/public-works/water-division/water-quality-and-pressure/water-quality-report",
    sourceLabel:
      "City of Westminster water quality report page (mutual company reports are on the State Water Board portal)",
  },

  permits: {
    office: "County of Orange, OC Development Services",
    portalUrl: "https://myoceservices.ocgov.com/",
    summary:
      "OC Development Services, part of OC Public Works, is the building department. Permits go through the myOCeServices portal or the counter in the County Service Center, first floor of County Administration South, 601 North Ross Street in Santa Ana, weekdays 8 a.m. to 4 p.m. (714-667-8888, OCPWPermitting@ocpw.ocgov.com). The county typically requires permits for additions, remodels, pools, patios, retaining walls, electrical, HVAC, plumbing and re-roofing, and a plan check application expires if no permit is issued within 180 days. The 2025 California codes took effect January 1, 2026.",
    sourceUrl:
      "https://pwds.oc.gov/service-areas/oc-development-services/permitting-services",
  },

  hazards: [
    {
      text: "Hydrant tests in the Midway City Mutual system gave 320 to 390 gallons per minute at 20 psi, which the fire authority says is below the Fire Code minimum, on two 90,000 gallon tanks, 4-inch mains and 20 hydrants. Inside the shaded zone on its map, roughly Roosevelt Avenue to Bolsa Avenue along Adams, Jackson and Van Buren streets, no increase in building area will be approved, and other changes go case by case. Eastside tested at 800 to 900 and South Midway at over 1,500. Before paying for plans for an addition or ADU, call the authority's Planning and Development staff at 714-573-6100.",
      sourceUrl:
        "https://ocfa.org/document/midway-city-fire-water-flow-report-requirements/",
      sourceLabel:
        "Orange County Fire Authority, Informational Bulletin 02-21, revised July 9, 2026",
    },
    {
      text: "The California Geological Survey's April 15, 1998 maps for the Anaheim and Newport Beach quadrangles put all 44 points checked inside the Census boundary in a liquefaction zone: loose Holocene sandy soil with historic groundwater less than 40 feet down. The same layers show no Alquist-Priolo fault zone and no landslide zone.",
      sourceUrl: "https://maps.conservation.ca.gov/cgs/EQZApp/app/",
      sourceLabel:
        "California Geological Survey, Earthquake Zones of Required Investigation (Anaheim and Newport Beach quadrangles)",
    },
    {
      text: "FEMA panels 06059C0138J and 06059C0251J, effective December 3, 2009, show the whole community as Zone X, almost all of it the shaded 0.2 percent annual chance area and a small part reduced risk due to a levee. OC LAFCO counts about 2.6 miles of flood control channels in the main island.",
      sourceUrl: "https://msc.fema.gov/portal/search?AddressQuery=Midway%20City%2C%20CA",
      sourceLabel: "FEMA Flood Map Service Center, National Flood Hazard Layer",
    },
    {
      text: "The State Fire Marshal's March 24, 2025 local map data classes the area as non-wildland, with no Moderate, High or Very High zone within about a mile and a quarter, so the state's defensible space and wildland building rules do not apply. The fire risk here is structural, which is why hydrant flow matters.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel:
        "Office of the State Fire Marshal, fire hazard severity zones (Local Responsibility Area map of March 24, 2025)",
    },
  ],

  guides: [
    {
      href: "/guides/adu-cost",
      title: "ADU cost",
      blurb:
        "Check hydrant flow first: part of the Midway City Mutual zone cannot add building area.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Well water runs about 9 to nearly 15 grains per gallon, depending on your supplier.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "About a quarter of the homes here date from the 1950s.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Yard drains and gutters before winter, on flat Zone X ground with channels nearby.",
    },
  ],

  neighbors: ["westminster", "huntington-beach"],

  faq: [
    {
      q: "What does the county want for a tankless water heater permit in Midway City?",
      a: "A submittal checklist the county publishes asks for a plot plan, the unit's location, a gas line drawing and BTU calculations, filed through myOCeServices or the Santa Ana counter.",
    },
    {
      q: "Who do I call about a sewer backup in the street?",
      a: "The Midway City Sanitary District, at 714-893-3553. It runs the mains and trash service for Midway City and all of Westminster; the lateral from your house to the main is yours.",
    },
  ],

  updated: "2026-09-20",
};
