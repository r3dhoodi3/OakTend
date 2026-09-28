import type { CityContent } from "./types";

// Placentia. Researched 2026-09-20 for the third city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a small city that runs
// things its own way and sits on an old oil field. Placentia has its own fire
// department (the city's fire page says the first shift was July 1, 2020), two
// retail water suppliers with different hardness numbers, and a safety element
// that says oil wells and pipelines still operate inside city limits and that
// most of the city west of Rose Drive is in the Carbon Canyon Dam inundation
// area.
//
// FIRE START DATE. The 2019 safety element says the city "transitioned"
// beginning July 2019; the city's own fire department page says the department
// "began their first shift" on July 1, 2020. Only the fire page's sentence is
// used here, because it is the one that describes service actually starting.
// No "first city to leave" claim is made: neither city page says it.
//
// WATER NUMBERS. Golden State Water's figures are from its Placentia-Yorba
// Linda report on 2025 data (one source water table, not split into
// groundwater and imported). Yorba Linda Water District's figures are from its
// report with data collected in 2025, read from the State Water Board's report
// portal, the same copy and the same numbers yorba-linda.ts uses. The two
// suppliers are never averaged together.
//
// FIRE HAZARD ZONES. The safety element's "no high-fire danger zones" line
// predates the state's 2025 maps. The city's own 2025 page says Placentia was
// added to the maps and the council adopted them on June 17, 2025; the map PDF
// shows one small zoned wedge at the far northern tip and the rest unzoned.
//
// LEFT OUT ON PURPOSE. Annual rainfall and monthly temperatures (no official
// or US Climate Data page for Placentia turned up), any split of the city
// between the two water suppliers beyond the city's own words "a majority"
// and "a small portion", the count of refugees and ruined homes in the 1938
// flood (the only figures found were countywide and on Wikipedia), the 2020
// Census count (the city's history page and other republishers disagree), the
// city's area in square miles (the city page's figure is garbled), a water
// heater permit claim (the city's pages never name water heaters), and the
// Kraemer, Alta Vista and Bradford names as neighborhoods (they are streets
// and a golf course on the city's maps, nothing more).

export const placentia: CityContent = {
  name: "Placentia",
  slug: "placentia",
  intro:
    "Placentia still has working oil wells and pipelines inside city limits, and most of the city west of Rose Drive sits in the mapped inundation area of Carbon Canyon Dam. It went from about 5,000 residents in 1960 to nearly 25,000 by 1970, so half of today's housing dates from those two decades. It also runs its own fire department and is split between two water suppliers with different hardness.",
  metaDescription:
    "Placentia runs its own fire department and has two water suppliers. Hardness by provider, working oil wells, dam and flood maps, phone-only inspections.",
  metaTitle: "Placentia homes: two water suppliers and oil wells",

  population: {
    value: "About 52,826 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0657526",
    sourceLabel: "Census Reporter, ACS 2020-2024 five-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1976",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0657526",
      sourceLabel: "Census Reporter, ACS 2020-2024 five-year table B25035",
    },
    facts: [
      {
        text: "Of about 17,890 housing units, roughly 25.3 percent went up in the 1960s and 24.8 percent in the 1970s, half the city's housing. Another 13.0 percent date from the 1980s and 13.2 percent from the 1990s, about 9.5 percent predate 1960 and about 14.3 percent are from 2000 or later.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0657526",
        sourceLabel:
          "Census Reporter, ACS 2020-2024 five-year tables B25034 and B25035",
      },
      {
        text: "Placentia got on the map in 1910, when A.S. Bradford, Samuel Kraemer and others persuaded the Santa Fe Railroad to route its track through town for citrus shipments, and its 500 citizens voted to incorporate on December 2, 1926. The city says it had only 5,000 people in 1960, then grew five-fold to nearly 25,000 by 1970.",
        sourceUrl: "https://placentia.org/1064/Historical-Resources",
        sourceLabel: "City of Placentia, historical resources",
      },
      {
        text: "The city's Placentia Fire and Life Safety Department began its first shift on July 1, 2020, with career firefighters working out of Station 1 at 110 South Bradford Avenue and Station 2 at 1530 North Valencia Avenue.",
        sourceUrl: "https://www.placentia.org/24/Fire",
        sourceLabel: "City of Placentia, Fire and Life Safety Department",
      },
      {
        text: "The safety element defines an extreme heat day in Placentia as one above 99.8 degrees and, citing the California Heat Assessment Tool, expects about two heat waves a year of two to four days between 2020 and 2040. It also says Santa Ana winds pose a significant fire hazard each year, typically from September to the first significant rain in December.",
        sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
        sourceLabel: "City of Placentia General Plan, safety element",
      },
      {
        text: "Yorba Linda Water District serves a small portion of Placentia. Its report on 2025 testing shows its groundwater averaging 343 ppm of hardness, about 20 grains per gallon, range 266 to 406 ppm, and its imported water averaging 236 ppm, about 14 grains, range 191 to 280 ppm. On average 85 percent of what it serves is treated groundwater, and hardness can shift during the year as sources change.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010037&Year=2025&isCert=false",
        sourceLabel: "Yorba Linda Water District, water quality report (2025 data)",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Old Town Placentia",
      "La Jolla",
      "Atwood",
      "Packing House District",
    ],
    note: "Old Town is the original downtown along Santa Fe and Bradford avenues, where the safety element says buildings are older and closer together; the city's revitalization plan names a Packing House District beside it. La Jolla is the southwest corner. Atwood, the southeastern pocket south of Orangethorpe Avenue between roughly Van Buren Street and Lakeview Avenue, began as the town of Richfield and was annexed in the early 1970s; the Atwood Channel is still one of the city's storm drain channels.",
    sourceUrl: "https://en.wikipedia.org/wiki/Placentia,_California",
  },

  water: {
    utility: "Golden State Water Company and Yorba Linda Water District",
    utilityUrl: "https://www.gswater.com/placentia",
    summary:
      "Your supplier depends on your address. The city's new resident guide says Golden State Water Company serves a majority of homes and Yorba Linda Water District a small portion. Golden State Water, here since 1929, blends Orange County basin groundwater with imported Colorado River and State Water Project water. Its report on 2025 testing lists hardness averaging 188 ppm, about 11 grains per gallon, with a wide range of 67.1 to 299 ppm, or 3.92 to 17.5 grains. The two suppliers should not be averaged together, so read the report from the company on your bill.",
    sourceUrl:
      "https://www.gswater.com/sites/main/files/file-attachments/water-quality-placentia-yorba-linda.pdf",
    sourceLabel:
      "Golden State Water Company, Placentia-Yorba Linda water quality report (2025 data)",
  },

  permits: {
    office: "City of Placentia Building and Safety Division",
    portalUrl: "https://ci-placentia-ca.smartgovcommunity.com/Public/Home",
    summary:
      "Building and Safety is at City Hall, 401 E Chapman Avenue, (714) 993-8124, open Monday through Thursday, 7:30 AM to 6:00 PM, and closed Friday through Sunday. The online SmartGov portal takes submittals, permit lookups and fees, but the city's page says it is in beta and asks applicants to contact Development Services before submitting through it.",
    sourceUrl: "https://www.placentia.org/58/Building-and-Safety",
  },

  hazards: [
    {
      text: "The safety element says numerous oil wells and pipelines operate within the city. Its well map, which does not say which are active, clusters them in the east and southeast around Alta Vista Street, Rose Drive, Jefferson Street and the Orangethorpe Avenue and Richfield Road area, with another group near Golden Avenue. It warns that old pits and wells backfilled with undocumented fill can settle unevenly and damage structures, so check the state's oil and gas well map before an addition, pool or purchase there.",
      sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
      sourceLabel: "City of Placentia General Plan, safety element",
    },
    {
      text: "No Alquist-Priolo fault zone crosses Placentia, but the safety element rates seismic risk high because of nearby faults. Its liquefaction map follows the drainage corridors down the middle of the city, from Imperial Highway past Palm Drive and Alta Vista Street, and covers a large block around Orangethorpe Avenue and Richfield Road, where the building code requires structures designed for it.",
      sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
      sourceLabel: "City of Placentia General Plan, safety element",
    },
    {
      text: "Most of Placentia is outside any flood hazard zone, the safety element says. The exceptions are parts of the east and south sides in the 500-year zone, a small pocket of homes between Highway 57 and Orangethorpe Avenue in the 100-year zone, and the La Jolla community, mostly 100-year with a portion in the 500-year zone and first in line for the city's drainage work.",
      sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
      sourceLabel: "City of Placentia General Plan, safety element",
    },
    {
      text: "A failure of Carbon Canyon Dam, an Army Corps earth-filled flood control dam completed in 1961 about a mile north of the city, would affect most of Placentia generally west of Rose Drive and Tustin Avenue, following the Carbon Canyon Creek Channel toward the 91 Freeway. A Prado Dam failure, about 18 miles east, would reach the very southern edge. The safety element notes Carbon Canyon Dam rarely holds threatening amounts of water.",
      sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
      sourceLabel: "City of Placentia General Plan, safety element",
    },
    {
      text: "On March 3, 1938, after days of heavy rain, an eight-foot wall of water came out of Santa Ana Canyon and destroyed the communities of Atwood and La Jolla, killing 43. Prado Dam, completed in 1941, came after that flood.",
      sourceUrl:
        "https://www.pbssocal.org/shows/lost-la/the-santa-ana-river-how-it-shaped-orange-county",
      sourceLabel: "PBS SoCal, The Santa Ana River: How It Shaped Orange County",
    },
    {
      text: "Placentia was added to the State Fire Marshal's 2025 Local Responsibility Area maps, which the City Council adopted by ordinance on June 17, 2025, and the city's page links an interactive parcel map. The zoned land is a small wedge at the far northern tip, north of Imperial Highway near Rose Drive; the rest is unzoned, and the safety element calls structures, not wildland, the principal fire hazard here.",
      sourceUrl:
        "https://www.placentia.org/1153/New-Local-Responsibility-Area-LRA-Fire-H",
      sourceLabel: "City of Placentia, 2025 fire hazard severity zone map, with the safety element",
    },
  ],

  guides: [
    {
      href: "/guides/hard-water-orange-county",
      title: "Hard water in Orange County",
      blurb:
        "Placentia water runs about 11 or about 20 grains per gallon, depending on your supplier.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "Half of Placentia's housing went up in the 1960s and 1970s, on original supply lines.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "The city's own safety element plans for heat waves above 99.8 degrees.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Roof edges, fences and patio covers come before the September to December Santa Ana season.",
    },
  ],

  neighbors: ["yorba-linda", "fullerton", "anaheim", "brea"],

  faq: [
    {
      q: "Can I get a same-day building inspection in Placentia?",
      a: "No. Inspections are requested by phone for Monday through Thursday between 9:00 AM and 5:00 PM, the city does not schedule same day inspections, and a voicemail request is not confirmed until the division calls back.",
    },
    {
      q: "Does a Placentia project need fire department review?",
      a: "Some do. Fire plan submittals and fire inspection requests go to the city's own fire department, inspections by email, and the Building and Safety page has checklists showing which construction projects need its review.",
    },
  ],

  updated: "2026-09-20",
};
