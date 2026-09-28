import type { CityContent } from "./types";

// Garden Grove. Researched 2026-09-19 for the second city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: the 1950s. Garden Grove
// has the oldest median build year in this batch (1964), more than a third of
// its homes date from one decade, and the city's own safety element says most
// of the city sits on ground subject to liquefaction, with the eastern third
// in a FEMA flood zone.
//
// WATER NUMBERS. Hardness comes from the city's current report (2025 testing),
// which is a scanned PDF with no text layer; the rows were read from the
// rendered page image. An older report listed 12 wells and the current one
// lists 9, so no well count is published here: it goes stale.
//
// LEFT OUT ON PURPOSE. Annual rainfall (two aggregator sites disagreed and no
// official figure turned up), the split between groundwater and imported
// water (the report says "mostly groundwater" and gives no percentage), and
// the "Eastgate" neighborhood name (traced only to real-estate marketing).

export const gardenGrove: CityContent = {
  name: "Garden Grove",
  slug: "garden-grove",
  intro:
    "Garden Grove went from 5,762 people in 1950 to 84,238 in 1960, and more than a third of its homes still date from that one decade. Its own safety element says a majority of the city sits on ground subject to liquefaction and puts the eastern third in a FEMA 100-year flood zone.",
  metaDescription:
    "Garden Grove's median home dates to 1964. Upkeep with 1950s tracts, 18-grain city well water, owner-side sewer laterals and an east-side flood zone.",
  metaTitle: "Garden Grove homes: 1950s tracts and a flood zone",

  population: {
    value: "About 172,331 people",
    asOf: "ACS 2024 one-year estimate, table B01003; the 2020 Census counted 171,949",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0629000",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1964",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0629000",
      sourceLabel: "Census Reporter, ACS 2024 one-year table B25035",
    },
    facts: [
      {
        text: "Of about 52,475 housing units, roughly 36.4 percent went up in the 1950s and 24.5 percent in the 1960s; only about 4.6 percent date from 2000 or later. About four in five predate 1980, so original sewer laterals, panels and supply plumbing come due across most of the city at once.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0629000",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "Garden Grove incorporated on June 18, 1956 with 41,238 people and about 1,400 more arriving each month, many of them soldiers who had been stationed in Orange County during the war. The city says it was named the fastest growing city in America in the late 1950s, with new homes averaging $7,000.",
        sourceUrl: "https://ggcity.org/history",
        sourceLabel: "City of Garden Grove, city history",
      },
      {
        text: "The sewer lateral from the house to the public main is the owner's to maintain, repair and clean; the Garden Grove Sanitary District handles the public sewer and refuse. On a 1950s or 1960s lot, a camera inspection before a remodel or purchase is worth doing.",
        sourceUrl: "https://ggcity.org/sewers",
        sourceLabel: "City of Garden Grove, sewers",
      },
      {
        text: "The safety element puts the annual average maximum temperature at 76.7 degrees, projected to reach 78.2 by 2040, and credits the nearby Pacific with cooler summers than areas farther inland.",
        sourceUrl:
          "https://ggcity.org/sites/default/files/2021-09/SafetyElement_Redlinedr.pdf",
        sourceLabel: "City of Garden Grove General Plan, safety element",
      },
      {
        text: "The Orange County Fire Authority provides fire protection, inspections of existing buildings and fire plan review here, from seven stations in the city numbered 80 through 86.",
        sourceUrl: "https://ggcity.org/fire/orange-county-fire-authority",
        sourceLabel: "City of Garden Grove, Orange County Fire Authority",
      },
    ],
  },

  neighborhoods: {
    names: [
      "West Garden Grove",
      "Orange County Koreatown",
      "Little Saigon",
      "Main Street",
    ],
    note: "West Garden Grove, west of Beach Boulevard, is largely cut off from the rest of the city by Stanton. Orange County Koreatown is the two-mile stretch of Garden Grove Boulevard between Beach and Brookhurst, named by the council in 2019. Little Saigon spans Garden Grove and Westminster. Main Street is where the original village grew up, with the first schoolhouse, post office, telephone, gas and electric service.",
    sourceUrl: "https://en.wikipedia.org/wiki/Garden_Grove,_California",
  },

  water: {
    utility: "City of Garden Grove Water Services Division",
    utilityUrl: "https://ggcity.org/docs/Water-Quality-Report",
    summary:
      "The city runs its own water system, mostly groundwater from city wells in the Orange County basin plus treated water imported by Metropolitan. In 2025 the groundwater averaged 303 ppm of hardness, about 18 grains per gallon (range 187 to 346), and the imported water 236 ppm, about 14 grains (range 191 to 280). The report gives no single blended figure for the tap.",
    sourceUrl:
      "https://ggcity.org/sites/default/files/garden-grove-2026-wq-report-english-web_0.pdf",
  },

  permits: {
    office: "City of Garden Grove Building and Safety Division",
    portalUrl: "https://ch.ggcity.org/permitsoft/start/index",
    summary:
      "Owners and contractors can apply and pay online for water heaters, sewer lateral repairs, HVAC change outs, electric service upgrades, temporary power poles and reroofs. Projects that need plan check are a separate track, with fees due when plans are submitted.",
    sourceUrl: "https://ggcity.org/building-and-safety/permit-issuance-faqs",
  },

  hazards: [
    {
      text: "The safety element names liquefaction and dynamic settlement of soils as the seismic threats of particular concern and says a majority of the city is subject to liquefaction. Check the state's Seismic Hazard Zone lookup before foundation, addition or drainage work.",
      sourceUrl:
        "https://ggcity.org/sites/default/files/2021-09/SafetyElement_Redlinedr.pdf",
      sourceLabel: "City of Garden Grove General Plan, safety element",
    },
    {
      text: "Storm flooding is the primary hazard for the eastern third of the city, along the East Garden Grove-Wintersburg Channel, which FEMA maps as Flood Zone A, the 1 percent annual chance flood. Check an address on FEMA's map before buying, insuring or remodeling there.",
      sourceUrl:
        "https://ggcity.org/sites/default/files/2021-09/SafetyElement_Redlinedr.pdf",
      sourceLabel: "City of Garden Grove General Plan, safety element",
    },
    {
      text: "The safety element says Garden Grove has no high fire severity zones or wildland-urban interface areas. It predates the state's 2025 map update, which was not confirmed for this city, so the state's viewer is the address-level check.",
      sourceUrl:
        "https://ggcity.org/sites/default/files/2021-09/SafetyElement_Redlinedr.pdf",
      sourceLabel: "City of Garden Grove General Plan, safety element",
    },
    {
      text: "The city's Home Repair Program gives income-qualified owner-occupants a grant of up to $5,000 for code, health and safety repairs, including exterior paint, windows, electrical, plumbing, HVAC and accessibility work. Income limits are on the city's page.",
      sourceUrl:
        "https://ggcity.org/neighborhood-improvement/home-repair-program",
      sourceLabel: "City of Garden Grove, Home Repair Program",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "A panel sized for a 1950s household, and the signs it is not carrying a modern one.",
    },
    {
      href: "/guides/sewer-line-orange-county",
      title: "Sewer line problems in Orange County",
      blurb:
        "The lateral is the owner's job here, and about four in five homes predate 1980.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "City well water near 18 grains per gallon wears tanks out early.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "The seasonal list, including drain checks before winter storms on the flood-mapped east side.",
    },
  ],

  neighbors: ["westminster", "anaheim", "santa-ana", "stanton"],

  faq: [
    {
      q: "What does Garden Grove ask for on an electric service upgrade permit?",
      a: "An Edison SR number. The Building and Safety permit FAQ asks for it when you apply for an electric service upgrade, one of the permits you can file and pay for online.",
    },
    {
      q: "Can I use Garden Grove's Home Repair grant more than once?",
      a: "Not within five years: prior recipients wait five years to reapply. The owner also contributes at least $500 toward the work.",
    },
  ],

  updated: "2026-09-20",
};
