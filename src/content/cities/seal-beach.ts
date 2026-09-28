import type { CityContent } from "./types";

// Seal Beach. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a small beach town whose
// housing is dominated by one 1960s project, Leisure World (6,482 cooperative
// apartments by the general plan's count), where the Mutual, not the resident,
// replaces the roof. On the sand the city builds a winter berm every October
// and has no certified Local Coastal Program.
//
// WATER NUMBERS are from the City of Seal Beach 2026 Water Quality Report
// (2025 data), read from the State Water Board's report portal (PWS
// CA3010041). The copy on the city's Public Works page today is still the
// 2025 report (2024 data), so the page links the state copy. The report prints
// grains per gallon itself; nothing here is our conversion. The 65 and 35
// percent supply split is from the city's 2020 Urban Water Management Plan
// (fiscal year 2019-20) and is labeled with its year.
//
// DRAFT DOCUMENT. The berm, the storm history, the liquefaction and tsunami
// sentences and the sea level rise projections come from the city's draft
// Local Coastal Program Land Use Plan, May 2023, posted on the city's LCP
// page. It is uncertified, and the page calls it a draft wherever it is
// quoted. The general plan elements are dated December 2003 and say so.
//
// LEFT OUT ON PURPOSE. Every ordinal claim (the pier's length rank, Leisure
// World as the "first" of its kind, Anaheim Landing as the "first port"), the
// 1933 magnitude from city documents (the Safety Element prints both 6.3 and
// 6.2, so the USGS value is used), which beach erodes faster (the Safety
// Element appears to swap East and West Beach), the city's area (its pages
// give 11.3, 11.5 and 11.51 square miles), Hellman Ranch oil detail, fire
// hazard severity zones (not checked) and plan check turnaround times.

export const sealBeach: CityContent = {
  name: "Seal Beach",
  slug: "seal-beach",
  intro:
    "Every October the City of Seal Beach moves sand from the north side of its pier to the south side and piles it into a wall about 100 feet seaward of the boardwalk houses, then takes it down before May. Inland, about 57 percent of the city's homes date from the 1960s, the decade Leisure World opened its 6,482 cooperative apartments.",
  metaDescription:
    "Seal Beach homes are mostly 1960s, led by Leisure World co-ops. Mild well water, hard imports, a winter sand berm, coastal permits and the fault, sourced.",
  metaTitle: "Seal Beach, CA homes: 1960s co-ops, a winter berm",

  population: {
    value: "About 24,722 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003; the city's About page gives 25,282 from the 2020 census",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0670686",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "coastal",
    medianYearBuilt: "1966",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0670686",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 14,632 housing units, roughly 57.5 percent went up in the 1960s, 13.5 percent in the 1970s and 11.1 percent in the 1950s, with about 6.7 percent from before 1950 and about 5 percent from 2000 or later. Only about 36 percent are detached single-family houses.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0670686",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034 and B25024",
      },
      {
        text: "The general plan describes Leisure World as an age-restricted retirement community of 533 acres, fully built out with 6,482 cooperative apartments and 126 condominiums of roughly 800 to 1,100 square feet. Its own history page says the first residents arrived on June 8, 1962, all 6,476 original units were sold by December 1964, and it now holds about 40 percent of the city's residents.",
        sourceUrl:
          "https://sealbeachca.gov/wp-content/uploads/2026/04/Land-Use-Element.pdf",
        sourceLabel:
          "City of Seal Beach General Plan, Land Use Element (December 2003), with lwsb.com history",
      },
      {
        text: "Leisure World's FAQ says Mutuals 1 to 12 and 14 to 16 are stock cooperatives and Mutual 17 is a condominium project, each run by its own elected board. Its buyer checklist tells shoppers to ask what permits a Mutual requires to change anything inside a unit.",
        sourceUrl: "https://www.lwsb.com/faq/",
        sourceLabel: "Leisure World Seal Beach (Golden Rain Foundation), FAQ",
      },
      {
        text: "Marina Hill was subdivided in the 1950s into 5,000-square-foot lots and holds 970 single-family homes. College Park East has 1,668 homes north of the San Diego Freeway, and College Park West has 306 houses reachable only through Long Beach by College Park Drive. Surfside Colony, a private gated strip of about 250 homes subdivided in the early 1900s, has been turning from one-story beach cottages into three-story houses.",
        sourceUrl:
          "https://sealbeachca.gov/wp-content/uploads/2026/04/Land-Use-Element.pdf",
        sourceLabel:
          "City of Seal Beach General Plan, Land Use Element (December 2003)",
      },
      {
        text: "The town was first known as Bay City and took the name Seal Beach when it incorporated on October 25, 1915, because a Bay City already existed in Northern California. Navy operations on Anaheim Bay began in November 1944, and the 5,256-acre Naval Weapons Station makes up the bulk of the city's land.",
        sourceUrl: "https://sealbeachca.gov/about-us/about-seal-beach/",
        sourceLabel:
          "City of Seal Beach, About Seal Beach, with the General Plan Land Use Element",
      },
      {
        text: "Fire service comes from the Orange County Fire Authority's Division 1, with two stations in the city: Station 44 at 718 Central Avenue, established in 1930, and Station 48 at 3131 North Gate Road, established in 1964. The Safety Element says the city has long required fire sprinklers in all new homes in Surfside because of its small setbacks and narrow roads.",
        sourceUrl: "https://sealbeachca.gov/departments/fire/",
        sourceLabel: "City of Seal Beach, Fire Services, with the OCFA station list",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Old Town",
      "Surfside Colony",
      "Bridgeport",
      "Marina Hill",
      "Leisure World",
      "College Park East",
      "College Park West",
    ],
    note: "These are the general plan's names. Old Town and Surfside form the strip between Pacific Coast Highway and the ocean, entirely inside the Coastal Zone. Bridgeport sits near Fifth Street and Pacific Coast Highway, Marina Hill north of the highway beside Hellman Ranch, Leisure World south of the San Diego Freeway, and the two College Park tracts north of it.",
    sourceUrl:
      "https://sealbeachca.gov/wp-content/uploads/2026/04/Land-Use-Element.pdf",
  },

  water: {
    utility: "City of Seal Beach Utilities Division (Public Works)",
    utilityUrl:
      "https://sealbeachca.gov/departments/public-works/maintenance-operations-division/",
    summary:
      "The city runs its own water utility, blending groundwater from three local wells with imported Northern California and Colorado River water. In 2025 testing the wells averaged 72.9 ppm of hardness, or 4.3 grains per gallon, while the imported water averaged 236 ppm, or 14 grains. The city's 2020 water plan put the fiscal 2019-20 supply at 65 percent groundwater and 35 percent imported, so scale depends on the blend reaching your street. Utilities: (562) 431-2527.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010041&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Seal Beach Building & Safety Division",
    portalUrl:
      "https://sealbeachca-energovpub.tylerhost.net/apps/selfservice#/home",
    summary:
      "Applications, plans and inspection requests all go through the Civic Access Portal, and inspections usually happen within two business days. The counter at City Hall, 211 Eighth Street, is open 8 a.m. to noon and 1 to 5 p.m. weekdays; building questions go to (562) 431-2527 extension 1323. The city lists window replacement, re-roofing, kitchen and bath remodels, water heaters and heating and cooling replacements as permit work.",
    sourceUrl:
      "https://sealbeachca.gov/departments/community-development/building-safety/",
  },

  hazards: [
    {
      text: "Seal Beach has no certified Local Coastal Program, so coastal permits still run through the Coastal Commission. The city could not get its 2008 program certified and sent a revised draft to the Commission on May 9, 2023. The general plan says the Coastal Zone reaches about two miles inland, and the draft plan puts about 60 percent of the city inside it.",
      sourceUrl:
        "https://sealbeachca.gov/departments/community-development/local-coastal-plan-lcp-project/",
      sourceLabel: "City of Seal Beach, Local Coastal Plan (LCP) Project",
    },
    {
      text: "The draft coastal plan says the winter berm is built with a crest of 20 to 23 feet and a width of 12 feet, and that large waves at high tide have at times overtopped or flanked it. The city hands out sandbags in winter at the fire stations, the 10th Street beach lot and the City yard.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Seal-Beach-LUP_DRAFT-compressed.pdf",
      sourceLabel:
        "City of Seal Beach, draft Local Coastal Program Land Use Plan (May 2023)",
    },
    {
      text: "Storms in winter 2016-17 overwhelmed the city's pumps in Old Town, winter 2022-23 damaged the pier and flooded parts of Surfside, and in fall 2004 water stood three feet deep at homes near Anaheim Landing. The 2003 Safety Element says most city storm drains were designed for the 25-year flood, short of the 100-year standard.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Seal-Beach-LUP_DRAFT-compressed.pdf",
      sourceLabel:
        "City of Seal Beach, draft Local Coastal Program Land Use Plan (May 2023), with the Safety Element",
    },
    {
      text: "The Seal Beach Fault, part of the Newport-Inglewood zone, runs roughly along the coast through Hellman Ranch and the Naval Weapons Station and sits inside a state Alquist-Priolo Earthquake Fault Zone. The Safety Element calls the 1933 Long Beach earthquake, magnitude 6.4 in the USGS catalog, the strongest and closest shock in living memory.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Safety-Element.pdf",
      sourceLabel:
        "City of Seal Beach General Plan, Safety Element (December 2003), with the USGS catalog",
    },
    {
      text: "The draft coastal plan says most of Seal Beach is at risk of liquefaction and that the tsunami zone covers Old Town, Main Beach and the Naval Weapons Station. The Safety Element rates tsunami risk low above the main sea bluff and moderate below it, and calls for a soils and geology report on development projects.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Seal-Beach-LUP_DRAFT-compressed.pdf",
      sourceLabel:
        "City of Seal Beach, draft Local Coastal Program Land Use Plan (May 2023), with the Safety Element",
    },
    {
      text: "With 1.6 feet of sea level rise, the draft plan's study projects about 40 feet of shoreline retreat along the Seal Beach waterfront and about 100 feet at Surfside, likely requiring higher berms closer to homes. An earlier fix, a 750-foot concrete groin beside the pier, was built by the Army Corps of Engineers in 1959.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Seal-Beach-LUP_DRAFT-compressed.pdf",
      sourceLabel:
        "City of Seal Beach, Sea Level Rise Vulnerability Assessment (appendix to the draft Land Use Plan)",
    },
  ],

  guides: [
    {
      href: "/guides/hoa-coastal-commission-remodel-orange-county",
      title: "HOA and coastal approvals",
      blurb:
        "About 60 percent of the city sits in the Coastal Zone, and Leisure World Mutuals set their own rules.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Tank life on a blend of 4 grain well water and 14 grain imported water.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "The median home here dates from 1966, and the city lists re-roofing as permit work.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Drains and sandbags belong on the fall list in a town that builds a beach berm every October.",
    },
  ],

  neighbors: ["los-alamitos", "huntington-beach", "westminster"],

  faq: [
    {
      q: "Who fixes the roof or pipes in a Leisure World Seal Beach unit?",
      a: "Usually the Mutual, not the resident. Leisure World's FAQ says the Mutual share of the monthly assessment funds reserves for roof replacements, piping, painting and street repairs, and the Golden Rain Foundation's Service Maintenance Department takes plumbing, electrical, painting and carpentry calls at (562) 431-3548, treating leaks and electrical problems as urgent.",
    },
    {
      q: "Who do I call first about a remodel in the Seal Beach Coastal Zone?",
      a: "The city's Planning Division, at (562) 431-2527 extension 1339. The city says to ask it about coastal review before starting a project, since Seal Beach has no certified coastal program of its own yet.",
    },
  ],

  updated: "2026-09-20",
};
