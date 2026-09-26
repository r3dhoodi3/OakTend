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
    "Midway City is not a city: it is about 390 acres of unincorporated Orange County in four pieces, which the county's boundary commission describes as surrounded by the City of Westminster, so there is no city hall and the County of Orange is the building department. The water is more local still. An Orange County Fire Authority bulletin revised in July 2026 says three small mutual water companies each supply 200 to 300 homes here from their own single deep well, while the City of Westminster serves other portions. Housing here dates mostly from the 1950s and the 1970s with a newer layer of infill on top, and fewer than four in ten units are detached houses.",
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
        text: "Midway City is a census-designated place, not a city, and small enough that the survey margins are wide: the median year built is 1973, plus or minus 4 years. Of about 2,862 housing units, roughly 26.4 percent date from the 1950s and 24.6 percent from the 1970s, with only about 8.6 percent from the 1960s in between. About 6 percent predate 1940, and about 13.5 percent have gone up since 2010, which is infill on a street grid that was already full. Treat the shares as approximate, but the shape is clear: two old bulges and a recent one, so neighbors on the same street can be sixty years apart in plumbing and wiring.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0647430",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "Detached houses are the minority here. The same survey puts single-family detached homes at about 37.8 percent of units, attached homes at 14.6 percent, buildings of three or four units at 14.3 percent, buildings of five or more units at roughly 23 percent, and mobile homes at about 7.6 percent. The margins on each of those are large for a place this size. For upkeep it means a lot of shared walls and shared roofs, where the first question on any repair is who is responsible for it.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25024&geo_ids=16000US0647430",
        sourceLabel: "Census Reporter, ACS 2024 5-year table B25024",
      },
      {
        text: "Orange County's Local Agency Formation Commission treats Midway City as four unincorporated islands inside Westminster's sphere of influence, totaling approximately 391.60 acres, and lists who does what. Planning, code enforcement, street sweeping, library and animal control are the County of Orange; law enforcement is the Orange County Sheriff; fire protection is the Orange County Fire Authority; sewer and trash are the Midway City Sanitary District; and retail water is split among the City of Westminster and three mutual water companies. The islands sit in the county's First Supervisorial District. Apart from the water bill on some blocks, none of those calls goes to Westminster City Hall, even though Westminster is on every side.",
        sourceUrl:
          "https://oclafco.org/wp-content/uploads/2024/01/Bolsa_Midway_Westminster.pdf",
        sourceLabel:
          "OC LAFCO, Westminster Islands unincorporated areas profile (fiscal year 2023-24 data)",
      },
      {
        text: "Three of those water suppliers are tiny. An Orange County Fire Authority bulletin revised July 9, 2026 says Midway City Mutual Water Company, Eastside Water Association and South Midway City Mutual Water Company each independently supply 200 to 300 homes with drinking water and fire protection from their own single deep well. Its map puts Midway City Mutual between Beach Boulevard and roughly Monroe Street north of Bolsa Avenue, Eastside from there east to Newland Street, and South Midway in a strip south of Bolsa Avenue. The bulletin gives a phone number for each: 714-532-9409, 714-894-8106 and 714-842-8080. Your water bill names your supplier, and that is who to call about pressure, a meter or a shutoff.",
        sourceUrl:
          "https://ocfa.org/document/midway-city-fire-water-flow-report-requirements/",
        sourceLabel:
          "Orange County Fire Authority, Informational Bulletin 02-21, Midway City fire water flow requirements",
      },
      {
        text: "Midway City Mutual Water Company's report for 2025, filed with the state in June 2026, names one working source, Well 02 at 14741 Jackson Street, plus an emergency connection. It lists hardness at 163 ppm from a 2023 sample, which is about 9.5 grains per gallon by conversion, and its 2025 lead and copper round of 10 homes found no lead. The company's board meets on the second Tuesday of each month at 7 p.m., which is where a customer raises a service problem.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010097&Year=2025&isCert=false",
        sourceLabel:
          "Midway City Mutual Water Company, 2025 Consumer Confidence Report, State Water Board portal",
      },
      {
        text: "Eastside Water Association's 2025 report says its water comes from Well 04 at 8341 Madison Avenue in Midway City and lists hardness at 153 ppm from a 2023 sample, about 9 grains per gallon by conversion. Its board meets on the fourth Tuesday of each month at 7 p.m. Both of these wells test softer than the City of Westminster's supply next door, but this is still hard water, so a yearly flush of a tank water heater is worth doing on either side of the line.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010008&Year=2025&isCert=false",
        sourceLabel:
          "Eastside Water Association, 2025 Consumer Confidence Report, State Water Board portal",
      },
      {
        text: "Sewer and trash come from a special district that started here. The Midway City Sanitary District says it was formed in 1939 under the Sanitary District Act of 1923, that its board first met on January 13, 1939 at the Fire Hall in Midway City, and that bids for the original sewer mains were opened on January 22, 1953. Its original territory ran from Hazard to McFadden and from Hoover to Newland; today it covers 10.4 square miles and serves all of Westminster and Midway City. Mains bid in 1953 mean the oldest house laterals tied to them are now about seventy years old.",
        sourceUrl: "https://www.midwaycitysanitaryca.gov/about-us",
        sourceLabel: "Midway City Sanitary District, district history",
      },
      {
        text: "The pipe from your house to the sewer main is yours. The sanitary district's general regulations say all house connections and street laterals are maintained by the owner of the property served. The district does run a financial assistance program for owner-occupied single-family homes, and for duplexes and triplexes where the owner lives in one unit: approved applications are reimbursed up to 50 percent of the approved cost, not to exceed $1,800. The application, with at least two written bids, has to go in before any work starts, and the program ends each year when its budget runs out.",
        sourceUrl:
          "https://www.midwaycitysanitaryca.gov/sewer-lateral-assistance-program",
        sourceLabel: "Midway City Sanitary District, sewer lateral assistance program",
      },
      {
        text: "Fire and police are both county-level services. The Orange County Fire Authority says it serves 23 cities and all unincorporated areas, and its station directory lists Station 25 at 8171 Bolsa Avenue in Midway City as a career station established in 1935, with a daily crew of a captain, an engineer and two firefighters; when we checked, that listing carried the note 'Moved to Station 64', which is the authority's station at 7351 Westminster Boulevard. Law enforcement is the Sheriff's North Patrol, which names Midway City among the unincorporated communities it covers and gives 714-647-7000 for non-emergency dispatch.",
        sourceUrl: "https://ocfa.org/about-us/departments/operations/",
        sourceLabel: "Orange County Fire Authority, operations and station directory",
      },
    ],
  },

  neighborhoods: {
    names: ["Bolsa/Midway", "Beach/McFadden", "Bolsa/Pacific", "McFadden/Monroe"],
    note: "These are not neighborhood names anyone puts on a sign. They are the names Orange County's Local Agency Formation Commission gives the four separate pieces of unincorporated land that together make up Midway City, and they match the four pieces of the Census boundary. Bolsa/Midway, east of Beach Boulevard and south of Hazard Avenue, is the main one at 296.85 acres. Beach/McFadden (40.77 acres) is west of Beach Boulevard and north of McFadden Avenue, Bolsa/Pacific (21.14 acres) is south of Bolsa Avenue and west of Beach Boulevard, and McFadden/Monroe (32.84 acres) is south of McFadden Avenue. We found no county or district document that names smaller neighborhoods inside them, so none are listed.",
    sourceUrl: "https://oclafco.org/agency-boundaries/county-unincorporated-areas/",
  },

  water: {
    utility: "Three mutual water companies and the City of Westminster, by address",
    utilityUrl:
      "https://ocfa.org/document/midway-city-fire-water-flow-report-requirements/",
    summary:
      "There is no single Midway City water utility. OC LAFCO's profile lists four retail suppliers: the City of Westminster, Midway City Mutual Water Company, Eastside Water Association and South Midway City Mutual Water Company, and the fire authority's bulletin linked above maps the three mutual companies. The City of Westminster Water Division says it serves Westminster and portions of Midway City; its 2025 Water Quality Report, covering testing done in 2025, shows hardness averaging 251 ppm, about 14.7 grains per gallon by conversion, with a range of 133 to 359 ppm, and says the city pumped 100 percent groundwater that year. The mutual companies' own wells test softer: Midway City Mutual lists 163 ppm and Eastside 153 ppm, each from a 2023 sample, roughly 9 to 9.5 grains by conversion. For South Midway City Mutual, the newest report with a hardness figure on the State Water Board portal is the one for 2022, which listed 260 ppm, and the state's record shows that system also buys water from Westminster. All of it is hard water by the usual scale, so expect scale in water heaters and on fixtures whichever supplier is on your bill.",
    sourceUrl:
      "https://www.westminster-ca.gov/departments/public-works/water-division/water-quality-and-pressure/water-quality-report",
    sourceLabel:
      "City of Westminster water quality report page (mutual company reports are on the State Water Board portal)",
  },

  permits: {
    office: "County of Orange, OC Development Services",
    portalUrl: "https://myoceservices.ocgov.com/",
    summary:
      "Midway City has no city building division: the County of Orange is the building department, through OC Development Services, part of OC Public Works. Its permitting page describes a one-stop counter with over-the-counter plan review and online permits through the myOCeServices portal, reachable at 714-667-8888 or OCPWPermitting@ocpw.ocgov.com. The permit counter is in the County Service Center on the first floor of the County Administration South building, 601 North Ross Street in Santa Ana, open Monday through Friday from 8 a.m. to 4 p.m. The county's building permit page says permits are typically required for additions, remodels, pools, patios, retaining walls and electrical, HVAC and plumbing systems, and its residential permit guide adds that permits are also required for re-roofing. That guide says that if you are contracting the work out it is always wise to have the contractor obtain the permit, and that a plan check application expires if no permit is issued within 180 days. The county put the 2025 California building codes into effect on January 1, 2026.",
    sourceUrl:
      "https://pwds.oc.gov/service-areas/oc-development-services/permitting-services",
  },

  hazards: [
    {
      text: "Water supply limits what you can build in part of Midway City. The fire authority's bulletin says Midway City Mutual Water Company has two 90,000 gallon tanks, 4-inch water mains and 20 hydrants, and that recent hydrant tests gave 320 to 390 gallons per minute at 20 psi, which it says is below the Fire Code minimum. Projects inside the shaded zone on its map, roughly Roosevelt Avenue to Bolsa Avenue along Adams, Jackson and Van Buren streets, will not be approved with any increase to existing building area, and other changes are reviewed case by case. Eastside's hydrants tested at 800 to 900 gallons per minute and South Midway's at over 1,500. Before paying for plans for an addition or a backyard unit, call the authority's Planning and Development staff at 714-573-6100.",
      sourceUrl:
        "https://ocfa.org/document/midway-city-fire-water-flow-report-requirements/",
      sourceLabel:
        "Orange County Fire Authority, Informational Bulletin 02-21, revised July 9, 2026",
    },
    {
      text: "All of Midway City sits inside a state liquefaction zone. The California Geological Survey's seismic hazard zone maps for the Anaheim and Newport Beach quadrangles, released April 15, 1998, cover the whole community: every one of the 44 points we checked inside the Census boundary fell in the zone. The survey's report says these zones mark loose sandy soils of Holocene age where the historic shallowest groundwater is less than 40 feet down. The same state layers show no Alquist-Priolo fault zone and no landslide zone here. State law ties these zones to a site investigation before new development is approved and to a disclosure when a property is sold, and you can check an address on the state's map.",
      sourceUrl: "https://maps.conservation.ca.gov/cgs/EQZApp/app/",
      sourceLabel:
        "California Geological Survey, Earthquake Zones of Required Investigation (Anaheim and Newport Beach quadrangles)",
    },
    {
      text: "FEMA's National Flood Hazard Layer shows no high-risk flood zone in Midway City. The whole community is Zone X on panels 06059C0138J and 06059C0251J, effective December 3, 2009: almost all of it is the shaded kind, the 0.2 percent annual chance flood area, and a small part is mapped as an area with reduced flood risk due to a levee. OC LAFCO's profile counts about 2.6 miles of flood control channels in the main island. Zone X is outside the area where federal rules require flood insurance with a mortgage, which is not the same as saying water cannot reach a house, so keep yard drains and gutters clear before winter storms.",
      sourceUrl: "https://msc.fema.gov/portal/search?AddressQuery=Midway%20City%2C%20CA",
      sourceLabel: "FEMA Flood Map Service Center, National Flood Hazard Layer",
    },
    {
      text: "Wildfire zoning is not part of the picture here. The State Fire Marshal's Local Responsibility Area fire hazard severity zone data, from the map dated March 24, 2025, classes this whole area as non-wildland, and we found no Moderate, High or Very High zone within about a mile and a quarter of Midway City. The defensible space and wildland building rules that the state ties to those zones therefore do not come into play here. The fire risk that matters is the ordinary structural kind, which is why the hydrant flow numbers above are worth knowing.",
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
        "What a backyard unit runs, in a community where the fire authority will not approve added building area in part of the Midway City Mutual water zone.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on well water that tests from about 9 to nearly 15 grains per gallon depending on your supplier.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "What to watch for in an older house: about a quarter of Midway City's homes date from the 1950s, per the Census survey.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including clearing yard drains before winter in a community FEMA maps almost entirely as shaded Zone X.",
    },
  ],

  neighbors: ["westminster", "huntington-beach"],

  faq: [
    {
      q: "Is Midway City water hard?",
      a: "Yes, though how hard depends on who supplies your block. The City of Westminster's 2025 report shows hardness averaging 251 ppm, about 14.7 grains per gallon by conversion, with a range of 133 to 359 ppm. The two larger mutual companies' wells test softer: Midway City Mutual Water Company lists 163 ppm and Eastside Water Association 153 ppm, each from a 2023 sample, or roughly 9 to 9.5 grains. All of those count as hard water, so flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour.",
    },
    {
      q: "Who provides water in Midway City?",
      a: "It depends on the address. OC LAFCO lists four retail suppliers: the City of Westminster, Midway City Mutual Water Company, Eastside Water Association and South Midway City Mutual Water Company. An Orange County Fire Authority bulletin revised in July 2026 maps the three mutual companies and says each supplies 200 to 300 homes from its own single deep well, with emergency connections to a neighbor or to Westminster. Your bill names your supplier, and the bulletin lists a phone number for each company.",
    },
    {
      q: "Who provides fire and police service in Midway City?",
      a: "The Orange County Fire Authority and the Orange County Sheriff's Department, because Midway City is unincorporated. The fire authority says it serves all unincorporated areas of the county, and its directory lists Station 25 at 8171 Bolsa Avenue in Midway City, with a note when we checked that it had moved to Station 64 on Westminster Boulevard. The Sheriff's North Patrol covers Midway City and gives 714-647-7000 for non-emergency dispatch.",
    },
    {
      q: "Where do I get a building permit in Midway City?",
      a: "From the County of Orange, not from Westminster. OC Development Services takes applications online through the myOCeServices portal and at its counter at 601 North Ross Street in Santa Ana, open weekdays 8 a.m. to 4 p.m., phone 714-667-8888. The county lists plumbing, electrical and HVAC systems among the work that typically requires a building permit, and its residential guide says re-roofing requires one too. For a tankless water heater the county publishes a submittal checklist that asks for a plot plan, the unit's location, a gas line drawing and BTU calculations. A licensed contractor normally pulls the permit as part of the job.",
    },
    {
      q: "Who is responsible for the sewer line at a Midway City house?",
      a: "You are, up to the main. The Midway City Sanitary District, which provides sewer and trash service here, says house connections and street laterals are maintained by the property owner. The district offers owner-occupants reimbursement of up to 50 percent of an approved lateral replacement, capped at $1,800, but you have to apply with two written bids before the work starts. Sewer problems in the street go to the district at 714-893-3553.",
    },
    {
      q: "Is Midway City in a flood or liquefaction zone?",
      a: "Liquefaction, yes: the California Geological Survey's seismic hazard zone maps put the whole community in a liquefaction zone, which state law ties to a disclosure at sale and a site investigation for new development. Flood, not the high-risk kind: FEMA's current maps show Midway City as Zone X, mostly the shaded 0.2 percent annual chance area, outside the zones where federal rules require flood insurance with a mortgage. There is no state fire hazard severity zone here.",
    },
  ],

  updated: "2026-09-20",
};
