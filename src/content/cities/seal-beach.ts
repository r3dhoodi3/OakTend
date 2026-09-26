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
    "Every October the City of Seal Beach moves sand from the north side of its pier to the south side and piles it into a wall about 100 feet seaward of the houses along the boardwalk, then takes it down before May. Inland the housing story is just as specific: about 57 percent of all homes in the city date from the 1960s, the decade Leisure World opened, and the city's general plan counts 6,482 cooperative apartments there. The median build year is 1966. The city's own well water tests at about 4 grains per gallon of hardness, a fraction of what the imported water it blends in carries.",
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
        text: "Seal Beach's median year built is 1966. Of about 14,632 housing units, roughly 57.5 percent went up in the 1960s, 13.5 percent in the 1970s and 11.1 percent in the 1950s, with about 6.7 percent from before 1950 and only about 5 percent from 2000 or later. Only about 36 percent of units are detached single-family houses. These are survey estimates with margins of error, but the shape is plain: a 60-year-old building is past the first life of its roof, water lines, drain lines and electrical panel.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0670686",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The 1960s bulge has a name. The city's general plan describes Leisure World as a self-contained, age-restricted retirement community of 533 acres, about one square mile, fully built out with 6,482 cooperative apartments and 126 condominiums of roughly 800 to 1,100 square feet. Leisure World's own history page says the first residents arrived on June 8, 1962, that all 6,476 original units were sold by December 1964, and that the community now holds about 40 percent of the city's residents.",
        sourceUrl:
          "https://sealbeachca.gov/wp-content/uploads/2026/04/Land-Use-Element.pdf",
        sourceLabel:
          "City of Seal Beach General Plan, Land Use Element (December 2003), with lwsb.com history",
      },
      {
        text: "Inside Leisure World most of the building is not the resident's job. The community's FAQ says Mutuals 1 to 12 and 14 to 16 are stock cooperatives and Mutual 17 is a condominium project, each run by its own elected board, and that the Mutual share of the monthly assessment funds reserves for roof replacements, piping, painting and street repairs. The Golden Rain Foundation's Service Maintenance Department takes plumbing, electrical, painting and carpentry calls at (562) 431-3548 and treats water leaks, stoppages and electrical problems as urgent. Its buyer checklist tells shoppers to ask what permits a Mutual requires to change anything inside a unit.",
        sourceUrl: "https://www.lwsb.com/faq/",
        sourceLabel: "Leisure World Seal Beach (Golden Rain Foundation), FAQ",
      },
      {
        text: "Outside Leisure World the general plan describes neighborhoods that were finished long ago. Marina Hill was subdivided in the 1950s into 5,000-square-foot lots and holds 970 single-family homes. College Park East has 1,668 low-density homes north of the San Diego Freeway, and College Park West has 306 houses whose only access is through the City of Long Beach by College Park Drive. Surfside Colony, a private gated strip of about 250 homes subdivided in the early 1900s, has been turning from one-story beach cottages into custom three-story year-round houses.",
        sourceUrl:
          "https://sealbeachca.gov/wp-content/uploads/2026/04/Land-Use-Element.pdf",
        sourceLabel:
          "City of Seal Beach General Plan, Land Use Element (December 2003)",
      },
      {
        text: "The city's own page says the town was first known as Bay City, and that because a Bay City already existed in Northern California it took the name Seal Beach when it incorporated on October 25, 1915. The Navy arrived a generation later: the general plan says operations at the weapons facility on Anaheim Bay began in November 1944, and that the 5,256-acre Naval Weapons Station makes up the bulk of the city's landmass.",
        sourceUrl: "https://sealbeachca.gov/about-us/about-seal-beach/",
        sourceLabel:
          "City of Seal Beach, About Seal Beach, with the General Plan Land Use Element",
      },
      {
        text: "Seal Beach's own wells produce much softer water than the imported supply it is blended with. The city's 2026 water quality report, covering 2025 testing, shows its groundwater averaging 4.3 grains per gallon of hardness against 14 grains for Metropolitan's imported water, and the city's 2020 Urban Water Management Plan says the fiscal year 2019-20 supply was 65 percent groundwater and 35 percent imported. Scale here depends on the blend reaching your street, so look at your own kettle, shower glass and water heater before paying for a softener.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010041&Year=2025&isCert=false",
        sourceLabel:
          "City of Seal Beach 2026 Water Quality Report (2025 data), State Water Board copy",
      },
      {
        text: "Seal Beach does not run its own fire department. The city's fire services page says the Orange County Fire Authority serves Seal Beach as part of its Division 1, and the authority's station list shows two stations in the city: Station 44 at 718 Central Avenue, established in 1930, and Station 48 at 3131 North Gate Road, established in 1964, each with a medic engine and a daily crew of four. The general plan's Safety Element adds that the city has long required fire sprinklers in all new residential construction in Surfside, because of the small setbacks and narrow roads there.",
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
    note: "These are the names the city's general plan uses. Old Town and Surfside make up Planning Area 1, the strip between Pacific Coast Highway and the ocean that the plan says lies entirely inside the California Coastal Zone. Bridgeport is the residential neighborhood near Fifth Street and Pacific Coast Highway. Marina Hill sits north of Pacific Coast Highway beside the Hellman Ranch property, Leisure World lies south of the San Diego Freeway, and College Park East and College Park West are the two tracts north of it. The city's draft coastal plan refers to the homes bordering Hellman Ranch as the Hill neighborhood.",
    sourceUrl:
      "https://sealbeachca.gov/wp-content/uploads/2026/04/Land-Use-Element.pdf",
  },

  water: {
    utility: "City of Seal Beach Utilities Division (Public Works)",
    utilityUrl:
      "https://sealbeachca.gov/departments/public-works/maintenance-operations-division/",
    summary:
      "The City of Seal Beach runs its own water utility. Its 2026 water quality report describes the supply as a blend of groundwater pumped from three active local wells and water imported from Northern California and the Colorado River by the Municipal Water District of Orange County through the Metropolitan Water District. In 2025 testing the city's groundwater averaged 72.9 ppm of hardness, or 4.3 grains per gallon, with a range of 45.8 to 96.4 ppm, while Metropolitan's treated surface water averaged 236 ppm, or 14 grains per gallon, with a range of 191 to 280 ppm. The report does not say what share of each reaches a given street; the city's 2020 Urban Water Management Plan put the fiscal year 2019-20 supply at 65 percent groundwater and 35 percent imported. The Utilities Division's number is (562) 431-2527.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010041&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Seal Beach Building & Safety Division",
    portalUrl:
      "https://sealbeachca-energovpub.tylerhost.net/apps/selfservice#/home",
    summary:
      "Building & Safety is a division of the Department of Community Development at City Hall, 211 Eighth Street. The city takes building permit applications and plans electronically through its Civic Access Portal, and it says all inspection requests must go through the portal too, with inspections typically carried out within two business days. The public counter is open 8 a.m. to noon and 1 to 5 p.m., Monday through Friday. For building questions the city gives (562) 431-2527 extension 1323 and comdev@sealbeachca.gov. The city's FAQ lists window replacement, re-roofing, kitchen and bathroom remodeling, water heaters and heating and cooling replacements as work that needs a permit. In the Coastal Zone, ask the Planning Division at extension 1339 about coastal review first.",
    sourceUrl:
      "https://sealbeachca.gov/departments/community-development/building-safety/",
  },

  hazards: [
    {
      text: "Seal Beach has no certified Local Coastal Program. The city's own page says it started one in 2003 and again in 2008, could not get the 2008 version certified and sent a revised draft Land Use Plan to the Commission on May 9, 2023. The page explains that the Commission transfers coastal permitting authority to the city only once a program is certified, and the Commission's status chart dated October 9, 2024 lists the City of Seal Beach among the segments with no certified program. The general plan says the Coastal Zone extends approximately two miles inland, and the draft plan puts about 60 percent of the city inside it.",
      sourceUrl:
        "https://sealbeachca.gov/departments/community-development/local-coastal-plan-lcp-project/",
      sourceLabel: "City of Seal Beach, Local Coastal Plan (LCP) Project",
    },
    {
      text: "Each fall the city builds a wall of sand on its own beach. The May 2023 draft of the city's coastal Land Use Plan says the city moves sand every year from north of the municipal pier to the south of it to construct the winter berm, typically built in October and removed before May, about 100 feet seaward of the homes along the boardwalk, with a crest elevation of 20 to 23 feet and a width of 12 feet. The draft says the strategy has generally worked, although the berm has at times been overtopped or flanked by large waves during high tides. The city's FAQ says sandbags are available in the winter months at the fire stations, the 10th Street beach lot and the City yard.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Seal-Beach-LUP_DRAFT-compressed.pdf",
      sourceLabel:
        "City of Seal Beach, draft Local Coastal Program Land Use Plan (May 2023)",
    },
    {
      text: "The same draft lists what winter storms have done here. In the winter of 2016 to 2017 multiple strong storms overwhelmed the city's pumps in Old Town; the winter of 2022-23 brought significant damage to the pier and some flooding in Surfside and the beach parking lots; and in fall 2004 flooding stood three feet deep at homes near Anaheim Landing. The general plan's Safety Element, dated December 2003, adds that a majority of the city's storm drains were designed for the 25-year flood, which it calls inadequate for the 100-year standard.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Seal-Beach-LUP_DRAFT-compressed.pdf",
      sourceLabel:
        "City of Seal Beach, draft Local Coastal Program Land Use Plan (May 2023), with the Safety Element",
    },
    {
      text: "The Newport-Inglewood fault zone runs through the city. The Safety Element says the Seal Beach Fault, a segment of that zone, generally parallels the coastline from Long Beach through the Hellman Ranch property and the Naval Weapons Station toward Huntington Beach, is considered potentially active and is included in the state's Alquist-Priolo Earthquake Fault Zones. It calls the 1933 Long Beach earthquake, which the U.S. Geological Survey catalogs at magnitude 6.4, the most powerful and closest shock to hit Seal Beach in living memory. In a house from the 1950s or 1960s, foundation bolting, water heater strapping and a gas shutoff are worth checking.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Safety-Element.pdf",
      sourceLabel:
        "City of Seal Beach General Plan, Safety Element (December 2003), with the USGS catalog",
    },
    {
      text: "The city's draft coastal plan says the majority of Seal Beach is at risk of liquefaction, the loss of soil strength when saturated ground is shaken, and that the tsunami inundation zone inside its Coastal Zone covers Old Town and Main Beach and the Naval Weapons Station. The older Safety Element rates the tsunami hazard as low above the principal sea bluff and moderate for areas on the beach or below the bluff, and its policy is to require a soils and geology report for development projects as the municipal code specifies, so budget for one on an addition.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Seal-Beach-LUP_DRAFT-compressed.pdf",
      sourceLabel:
        "City of Seal Beach, draft Local Coastal Program Land Use Plan (May 2023), with the Safety Element",
    },
    {
      text: "The sea level rise study attached to the draft coastal plan projects about 40 feet of shoreline retreat along the Seal Beach waterfront and about 100 feet at Surfside with 1.6 feet of sea level rise. It calls the eastern waterfront and Surfside highly sensitive to any loss of beach, because the narrow sand there is backed by development, and says higher water will likely require higher berms placed closer to existing development. The Safety Element records the older fix: a 750-foot concrete sheet pile groin built beside the pier by the Army Corps of Engineers in 1959, after which sand replenishment was still required.",
      sourceUrl:
        "https://sealbeachca.gov/wp-content/uploads/2026/04/Seal-Beach-LUP_DRAFT-compressed.pdf",
      sourceLabel:
        "City of Seal Beach, Sea Level Rise Vulnerability Assessment (appendix to the draft Land Use Plan)",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, in a city where the median home dates from 1966 and the city lists re-roofing as permit work.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair makes sense, on a blend of 4 grain well water and 14 grain imported water.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "What an upgrade runs when the panel is original to a 1960s building, the decade that produced about 57 percent of the homes here.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month, including drains and sandbags before the winter storms the city builds its beach berm for.",
    },
  ],

  neighbors: ["los-alamitos", "huntington-beach", "westminster"],

  faq: [
    {
      q: "Is Seal Beach water hard?",
      a: "It depends on the blend. The city's 2026 water quality report, covering 2025 testing, shows its own well water averaging 72.9 ppm of hardness, or 4.3 grains per gallon, and the imported Metropolitan water averaging 236 ppm, or 14 grains per gallon, more than three times as hard. The city's 2020 water plan put the supply at 65 percent groundwater and 35 percent imported in fiscal year 2019-20. Check your own fixtures for scale before buying a softener.",
    },
    {
      q: "Who provides fire service in Seal Beach?",
      a: "The Orange County Fire Authority. The city's fire services page says the authority serves Seal Beach as part of its Division 1, and the authority's station list shows Station 44 at 718 Central Avenue and Station 48 at 3131 North Gate Road. Police are separate: the city has its own Seal Beach Police Department.",
    },
    {
      q: "Do I need a permit to replace a water heater or reroof in Seal Beach?",
      a: "Yes. The city's FAQ lists water heaters and re-roofing, along with window replacement and kitchen and bathroom remodeling, as examples of minor projects that require a permit. Applications and inspection requests go through the city's Civic Access Portal, and the Building Division answers questions at (562) 431-2527 extension 1323. A licensed contractor normally pulls the permit as part of the job.",
    },
    {
      q: "Does Seal Beach have its own coastal permit process?",
      a: "Not yet. The city's Local Coastal Plan page says its 2008 program was never certified and that a revised draft went to the Coastal Commission on May 9, 2023, and it explains that the Commission hands coastal permitting authority to a city only after certification. The Commission's October 2024 status chart lists Seal Beach with no certified program. If your house is in the Coastal Zone, which the general plan says reaches about two miles inland, call the Planning Division at (562) 431-2527 extension 1339 before you pay for plans.",
    },
    {
      q: "Why does Seal Beach build a sand berm every winter?",
      a: "To reduce flood damage from winter storm waves. The city's May 2023 draft coastal plan says the berm is typically built in October and removed before May, about 100 feet seaward of the homes along the boardwalk, using sand moved from the north side of the pier. It has generally worked, the draft says, though large waves at high tide have overtopped or flanked it before.",
    },
    {
      q: "Who fixes the roof or pipes in a Leisure World Seal Beach unit?",
      a: "Usually the Mutual, not the resident. Leisure World's FAQ says the Mutual share of the monthly assessment funds reserves for roof replacements, piping, painting and street repairs, and the Golden Rain Foundation's Service Maintenance Department handles plumbing, electrical, painting and carpentry calls at (562) 431-3548. Charges and rules vary by Mutual, so ask yours what permits it requires before changing anything inside a unit.",
    },
  ],

  updated: "2026-09-20",
};
