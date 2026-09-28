import type { CityContent } from "./types";

// Laguna Niguel. Researched 2026-09-20 for the third city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a master-planned city on
// graded hills. The city's own hazard mitigation plan traces it to a 1959
// corporate master plan, the city counts more than 120 homeowner associations,
// and the two events that shape upkeep here are both documented by agencies:
// the 1998 El Nino landslides (the city's plan) and the May 2022 Coastal Fire
// (the Orange County Fire Authority's after action report, which counts 98 of
// the fire's acres inside Laguna Niguel and places the home losses on the
// Laguna Niguel side). That fire burned inside city limits, which is why it is
// on this page.
//
// WATER NUMBERS are from the Moulton Niguel Water District 2025 water quality
// report, read from the copy on the State Water Board's report portal because
// the district's own site turns away automated requests. That copy is a scan
// with no text layer; the hardness rows and the district's 15.45 grains
// sentence were read from the rendered page images. The district gets water
// from two treatment plants and reports them in two tables, so both are given
// and they are not averaged here.
//
// LEFT OUT ON PURPOSE. The cause of the Coastal Fire (the fire authority's
// report only says it was originally reported as a downed power line, and the
// later finding was only seen in a law firm's summary of a news story). The
// Monarch Beach vote (sources disagree on the year and only one soft source
// opened). The claim that a developer's fill caused the 1998 Via Estoril slide
// (Wikipedia only). Any Mello-Roos detail. Any acreage for the 2025 fire hazard
// zones (the city's page gives none). The 151 ppm hardness figure from a
// third-party aggregator. The city plan's "2,000-acre" figure for the Coastal
// Fire, which conflicts with the fire authority's 202.10 acres.

export const lagunaNiguel: CityContent = {
  name: "Laguna Niguel",
  slug: "laguna-niguel",
  intro:
    "Laguna Niguel was drawn up before it was built, from the Laguna Niguel Corporation's 1959 master plan for about 7,100 acres, and today it counts more than 120 homeowner associations across graded coastal hills. Two events shape upkeep here: the 1998 El Nino landslides that collapsed four houses on Via Estoril, and the May 2022 Coastal Fire, which destroyed 20 homes after embers blew past a maintained fuel modification zone above Aliso Canyon.",
  metaDescription:
    "Laguna Niguel: a 1986 median build year, 120-plus HOAs, hard all-imported water, hillside slope care and what the 2022 Coastal Fire showed about embers.",
  metaTitle: "Laguna Niguel home care: slopes, HOAs, ember risk",

  population: {
    value: "About 64,139 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003; the city's hazard mitigation plan lists the 2020 Census count as 64,355",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0639248",
    sourceLabel: "Census Reporter, ACS 2020-2024 five-year table B01003",
  },

  homes: {
    exposure: "near-coastal",
    medianYearBuilt: "1986",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639248",
      sourceLabel: "Census Reporter, ACS 2020-2024 five-year table B25035",
    },
    facts: [
      {
        text: "Of about 27,643 housing units, roughly 43.8 percent went up in the 1980s, 20.4 percent in the 1990s and 16.2 percent in the 1970s, while only about 1.3 percent predate 1960 and about 12 percent date from 2000 or later.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639248",
        sourceLabel:
          "Census Reporter, ACS 2020-2024 five-year tables B25034 and B25035",
      },
      {
        text: "Cabot, Cabot and Forbes set up the Laguna Niguel Corporation in 1959, Victor Gruen and Associates drew the community plan, land sales began in 1961 and Avco Community Developer took over in 1971. The population went from 4,644 in 1970 to 12,237 in 1980 and 44,400 in 1990, and 89 percent of voters approved cityhood; the city incorporated on December 1, 1989 as Orange County's 29th city.",
        sourceUrl:
          "https://www.cityoflagunaniguel.org/DocumentCenter/View/27301/City-of-Laguna-Niguel-LHMP-2023",
        sourceLabel: "City of Laguna Niguel, Local Hazard Mitigation Plan",
      },
      {
        text: "The city counts over 120 homeowner associations, each with its own covenants, conditions and restrictions, and notes that they remain subject to the city's zoning code, so a reroof, new windows or solar can need both the association's approval and the city's.",
        sourceUrl: "https://www.cityoflagunaniguel.org/1431/HOA-Resources",
        sourceLabel: "City of Laguna Niguel, HOA Resources",
      },
      {
        text: "Where an association does not maintain the slope behind a house, especially in older neighborhoods, the owner usually does; the city does not maintain or repair private slopes or drains. Its handout says to clear and patch v-ditches before winter, never drain water over the top of a slope, avoid over-watering and skip heavy, shallow-rooted ice plant. Repairs can need a grading permit; the city's grading engineers are at 949-362-4327.",
        sourceUrl:
          "https://www.cityoflagunaniguel.org/DocumentCenter/View/10448/101-Residential-Guidelines-for-Slope-Maintenance",
        sourceLabel:
          "City of Laguna Niguel, Residential Guidelines for Slope Maintenance",
      },
      {
        text: "Dana Point sits between the city and the Pacific, and elevations run from near sea level to 936 feet at Niguel Hill. Rain averages 13.1 inches a year, but the hazard plan calls that misleading: totals have ranged from a third of normal to more than double, mostly in sporadic heavy storms. Winter lows average 45 degrees and summer highs about 78.",
        sourceUrl:
          "https://www.cityoflagunaniguel.org/DocumentCenter/View/27301/City-of-Laguna-Niguel-LHMP-2023",
        sourceLabel: "City of Laguna Niguel, Local Hazard Mitigation Plan",
      },
      {
        text: "Two electric utilities serve the city: San Diego Gas and Electric and Southern California Edison. Service requests and rate plans for a panel upgrade, solar or an EV charger belong to whichever owns the lines on your street.",
        sourceUrl: "https://www.cityoflagunaniguel.org/296/Utilities",
        sourceLabel: "City of Laguna Niguel, Utilities",
      },
      {
        text: "Licensed contractors can submit roof-mounted solar up to 38.4 kilowatts, with or without a panel upgrade or battery, through SolarAPP+, which adds its own $25 fee. Ground-mounted and owner-builder systems go through a regular building permit.",
        sourceUrl:
          "https://www.cityoflagunaniguel.org/1705/Residential-Solar-Permits-with-SolarAPP",
        sourceLabel:
          "City of Laguna Niguel, Residential Solar Permits with SolarAPP+",
      },
      {
        text: "The city has no fire department of its own. It partners with the Orange County Fire Authority for fire and emergency medical service, with automatic and mutual aid from outside agencies on large incidents.",
        sourceUrl: "https://www.cityoflagunaniguel.org/939/Fire-Services",
        sourceLabel: "City of Laguna Niguel, Fire Services",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Rancho Niguel",
      "Niguel Summit",
      "Coronado Pointe",
      "Marina Hills",
      "Bear Brand",
      "Kite Hill",
    ],
    note: "These are among the larger associations on the city's HOA map, with unit counts. Rancho Niguel is the largest master association at 2,306 units, named for the Mexican-era rancho. Marina Hills has 1,538, Bear Brand at Laguna Niguel 1,400 and Kite Hill 603. Niguel Summit, about 1,200 units on the ridge above Aliso Canyon, includes the 72-unit gated Coronado Pointe, the first street the Coastal Fire threatened.",
    sourceUrl: "https://www.cityoflagunaniguel.org/1431/HOA-Resources",
  },

  water: {
    utility: "Moulton Niguel Water District",
    utilityUrl: "https://www.mnwd.com/",
    summary:
      "Moulton Niguel Water District provides water and sewer service, and all of its drinking water is imported from the Metropolitan Water District, from the Colorado River and the State Water Project, with no local groundwater. It is treated at the Diemer plant in Yorba Linda and the Baker plant in Lake Forest and blended. In 2025 the Metropolitan water averaged 236 ppm, about 13.8 grains per gallon, the Baker water 293 ppm, about 17.1 grains, and the district's overall average was 15.45 grains. It disinfects with chloramines, which matters for fish ponds, aquariums and dialysis patients.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010073&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Laguna Niguel Building & Safety Division",
    portalUrl: "https://cityoflagunaniguel.org/css",
    summary:
      "Building & Safety is part of Community Development at City Hall, 30111 Crown Valley Parkway, open weekdays 8 a.m. to 4 p.m., 949-362-4360. Every building permit can be applied for in the Online Permit Center, with 24 hours to process. Book inspections there or at 949-362-4381; the daily inspection schedule updates at 8:30 a.m. Plans for any grading or building work are checked against zoning, the grading code and the building code, which on a hillside lot is more than a formality.",
    sourceUrl: "https://www.cityoflagunaniguel.org/113/Building-Safety",
  },

  hazards: [
    {
      text: "Cal Fire released Laguna Niguel's updated fire hazard map on March 24, 2025, and the City Council adopted the state-mandated ordinance on June 3, 2025; a city may not lower a designation. Inside a zone the duties are defensible space, Chapter 7A construction for new buildings and disclosure to a buyer. The city's page has an address lookup, and the Orange County Fire Authority offers defensible space disclosure inspections.",
      sourceUrl:
        "https://www.cityoflagunaniguel.org/1120/Fire-Hazard-Severity-Zones-FHSZ",
      sourceLabel: "City of Laguna Niguel, Fire Hazard Severity Zones",
    },
    {
      text: "The Coastal Fire was reported at 2:43 p.m. on May 11, 2022 on the Laguna Beach side of Aliso Canyon, spotted across it about an hour later and ran upslope toward Coronado Pointe in onshore gusts up to 29 miles per hour. It burned 202.10 acres, 98 of them in Laguna Niguel, destroyed 20 homes, damaged 11 and put about 900 homes under evacuation. No one died, and it was contained on May 17.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-8-23-22-Coastal-Fire.pdf",
      sourceLabel:
        "Orange County Fire Authority, Coastal Incident after action report",
    },
    {
      text: "The association had just passed its fuel modification inspection, 130 feet cleared below the fence line, yet the fire's heat carried embers several streets past Coronado Pointe, to La Vue, La Port and Club House Drive. The fire authority found quarter-inch vent mesh and tile roofs built before underlayment under the tile became standard let embers in, and crews met low water pressure early as many houses burned at once.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-8-23-22-Coastal-Fire.pdf",
      sourceLabel:
        "Orange County Fire Authority, Coastal Incident after action report",
    },
    {
      text: "The hazard plan says the city sits mostly on graded coastal hills, where hillside homes face landslides, and valley and canyon bottoms face liquefaction. It records three major slides in the El Nino winter of 1998: a 50-foot slide on Vista Plaza Drive ruined two homes, and a creeping 125-foot engineered slope on Via Estoril Drive gave way, collapsing four houses between March 19 and 29 and forcing out the condominiums below.",
      sourceUrl:
        "https://www.cityoflagunaniguel.org/DocumentCenter/View/27301/City-of-Laguna-Niguel-LHMP-2023",
      sourceLabel: "City of Laguna Niguel, Local Hazard Mitigation Plan",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb: "Embers got in under older tile roofs here that lacked underlayment.",
    },
    {
      href: "/guides/santa-ana-wind-wildfire-home-prep",
      title: "Wildfire home prep in Orange County",
      blurb: "The Coastal Fire showed vents and roofs matter as much as the brush line.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "All-imported district water averaged 15.45 grains per gallon in 2025.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Clear slope v-ditches before the heavy winter storms.",
    },
  ],

  neighbors: ["dana-point", "aliso-viejo", "laguna-beach", "laguna-hills"],

  faq: [
    {
      q: "How do I tell which electric company serves my Laguna Niguel street?",
      a: "Use the street light reporter tool linked from the city's utilities page, which shows whether San Diego Gas and Electric or Southern California Edison serves your address.",
    },
    {
      q: "Can a Laguna Niguel solar permit be issued the same day?",
      a: "Yes, for a system that qualifies for SolarAPP+. Once the contractor enters the SolarAPP+ approval number in the city's Online Permit Center and pays the fees, the city issues the permit that day.",
    },
  ],

  updated: "2026-09-20",
};
