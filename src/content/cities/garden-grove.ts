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
    "Garden Grove is a 1950s city: the Census counted 5,762 people here in 1950 and 84,238 in 1960, and more than a third of the homes standing today were built in that one decade. The median build year is 1964, the oldest of any large Orange County city we have researched so far, so original drain lines, panels and supply plumbing are an everyday topic rather than an exception. The city's own safety element adds two things most Orange County pages cannot say: a majority of the city sits on ground subject to liquefaction, and the eastern third is in a FEMA 100-year flood zone.",
  metaDescription:
    "Garden Grove's median home dates to 1964. What 1950s tracts, hard city well water, online permits and a mapped flood zone mean for upkeep.",
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
        text: "Garden Grove's median year built is 1964. Of about 52,475 housing units, roughly 36.4 percent went up in the 1950s alone, another 24.5 percent in the 1960s, and only about 4.6 percent date from 2000 or later. About four in five homes here predate 1980, which puts original sewer laterals, electrical panels and supply plumbing on the agenda for most of the city at once.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0629000",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "The city's own history explains the age. Garden Grove incorporated on June 18, 1956 with a population of 41,238 and about 1,400 people moving in each month, as soldiers who had been stationed in Orange County during the war came back to settle. The city says it was named the fastest growing city in America in the late 1950s, with new homes selling for an average of $7,000.",
        sourceUrl: "https://ggcity.org/history",
        sourceLabel: "City of Garden Grove, city history",
      },
      {
        text: "The sewer lateral from the house to the public main belongs to the homeowner here. The city states that property owners are responsible for the maintenance, repair and cleaning of that line, while the Garden Grove Sanitary District handles the public sewer and refuse system. On a 1950s or 1960s lot, a camera inspection of the lateral is worth doing before a remodel or a purchase.",
        sourceUrl: "https://ggcity.org/sewers",
        sourceLabel: "City of Garden Grove, sewers",
      },
      {
        text: "Garden Grove is inland but not far inland. The city's safety element puts its annual average maximum temperature at 76.7 degrees, projected to reach 78.2 by 2040, and notes that the city benefits from its proximity to the Pacific with cooler summers than areas farther inland. Expect less marine-layer cooling than the coast gets, and plan HVAC and attic ventilation for warm summers rather than extreme ones.",
        sourceUrl:
          "https://ggcity.org/sites/default/files/2021-09/SafetyElement_Redlinedr.pdf",
        sourceLabel: "City of Garden Grove General Plan, safety element",
      },
      {
        text: "Fire service here comes from the Orange County Fire Authority. The city's page says the authority is responsible for fire protection services for the City of Garden Grove, and that it also performs fire safety inspections of existing structures and fire plan review and inspection of new developments. The page lists seven authority stations in the city, numbered 80 through 86.",
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
    note: "Garden Grove has irregular boundaries, and West Garden Grove, west of Beach Boulevard, is largely separated from the rest of the city by Stanton. Orange County Koreatown is the two-mile stretch of Garden Grove Boulevard between Beach Boulevard and Brookhurst Street; the city council gave it that name in 2019, and it was known as the Korean Business District before that. Little Saigon spans Garden Grove and Westminster. Main Street, at Garden Grove Boulevard, is where the original village grew up around its first schoolhouse and post office, and it got the town's first telephone, gas and electric service. This list is short on purpose: other names in circulation trace back to real-estate marketing rather than to the city or a documented history.",
    sourceUrl: "https://en.wikipedia.org/wiki/Garden_Grove,_California",
  },

  water: {
    utility: "City of Garden Grove Water Services Division",
    utilityUrl: "https://ggcity.org/docs/Water-Quality-Report",
    summary:
      "The city runs its own water system. Its current water quality report describes the supply as a blend of mostly groundwater from city wells in the Orange County groundwater basin, plus treated surface water imported by the Metropolitan Water District. The two sources are not equally hard: in 2025 testing the city's groundwater averaged 303 ppm, about 18 grains per gallon, with a range of 187 to 346 ppm, while the imported Metropolitan water averaged 236 ppm, about 14 grains per gallon, with a range of 191 to 280 ppm. Both count as hard, and because the blend is mostly groundwater, scale in water heaters and on fixtures is a routine maintenance item here. The report does not publish a single blended figure for the tap.",
    sourceUrl:
      "https://ggcity.org/sites/default/files/garden-grove-2026-wq-report-english-web_0.pdf",
  },

  permits: {
    office: "City of Garden Grove Building and Safety Division",
    portalUrl: "https://ch.ggcity.org/permitsoft/start/index",
    summary:
      "Garden Grove is unusually clear about what can be done online. The division's permit FAQ says owners and contractors can apply and pay online for water heaters, sewer lateral repairs, HVAC change outs, electric service upgrades (the city asks for an Edison SR number), temporary power poles and reroofs. Projects that need plan check are a separate track, with fees collected when the plans are submitted.",
    sourceUrl: "https://ggcity.org/building-and-safety/permit-issuance-faqs",
  },

  hazards: [
    {
      text: "Liquefaction is the seismic issue the city itself singles out. The safety element says the seismic threats of particular concern in Garden Grove are liquefaction and dynamic settlement of underlying soils, and that a majority of the city is subject to liquefaction. Check your own address on the state's Seismic Hazard Zone lookup before foundation, addition or major drainage work.",
      sourceUrl:
        "https://ggcity.org/sites/default/files/2021-09/SafetyElement_Redlinedr.pdf",
      sourceLabel: "City of Garden Grove General Plan, safety element",
    },
    {
      text: "Storm flooding is the primary hazard for the eastern third of the city, associated with the East Garden Grove-Wintersburg Channel. The safety element says FEMA's flood insurance rate map designates that part of the city Flood Zone A, land subject to the 1 percent annual chance flood, often called the 100-year flood. Flood zoning is set parcel by parcel, so look up your own address on FEMA's map before buying, insuring or remodeling there.",
      sourceUrl:
        "https://ggcity.org/sites/default/files/2021-09/SafetyElement_Redlinedr.pdf",
      sourceLabel: "City of Garden Grove General Plan, safety element",
    },
    {
      text: "Wildfire is not the concern here. The city's safety element states that Garden Grove is not at risk of a wildfire because there are no high fire severity zones or wildland-urban interface areas within the city. That document predates the state's 2025 map update, which we could not confirm for this city, so the state's Fire Hazard Severity Zone viewer remains the address-level check.",
      sourceUrl:
        "https://ggcity.org/sites/default/files/2021-09/SafetyElement_Redlinedr.pdf",
      sourceLabel: "City of Garden Grove General Plan, safety element",
    },
    {
      text: "Garden Grove runs a Home Repair Program for income-qualified owner-occupants: a grant of up to $5,000 toward code violations, substandard conditions and health and safety repairs, including exterior paint, windows, electrical, plumbing, HVAC and accessibility work. The owner contributes at least $500, and prior recipients wait five years to reapply. Income limits are on the city's page.",
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
        "Typical range, and the signs that a panel sized for a 1950s household is not carrying a modern one.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "How to catch one early in an older slab-foundation tract home, before the water bill tells you.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Price range and when a repair still makes sense, on well water that averages about 18 grains per gallon.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including the water heater flush that 18-grain well water calls for and drain checks before winter storms.",
    },
  ],

  neighbors: ["westminster", "anaheim", "santa-ana", "stanton"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater in Garden Grove?",
      a: "Yes, and it is one of the permits the city lets you handle online. The Building and Safety Division's permit FAQ lists water heaters, HVAC change outs, reroofs, sewer lateral repairs and electric service upgrades among the permit types owners and contractors can apply and pay for online. A licensed plumber normally pulls the permit as part of the job. If a quote never mentions one, ask why before you sign.",
    },
    {
      q: "Is Garden Grove's water hard?",
      a: "Yes. The city's current water quality report shows its groundwater averaging about 18 grains per gallon and the imported Metropolitan water averaging about 14, and the city describes its supply as mostly groundwater. Both figures are in the hard range, so scale in water heaters, on shower glass and in fixtures is normal here. The report does not give one blended number for the tap, so treat those two averages as the bracket.",
    },
    {
      q: "Is my Garden Grove home in a flood zone?",
      a: "It might be if you are on the east side. The city's safety element says the eastern third of Garden Grove is designated FEMA Flood Zone A, tied to the East Garden Grove-Wintersburg Channel. Flood zones are drawn parcel by parcel, so the real answer comes from looking up your address on FEMA's Flood Map Service Center, and it matters for insurance as well as for what a remodel has to account for.",
    },
    {
      q: "Who is responsible for the sewer line at my Garden Grove house?",
      a: "You are, up to the public main. The city states that property owners are responsible for maintaining, repairing and cleaning the sewer lateral from the house to the public sewer system. With most Garden Grove homes built before 1980, an original lateral is common, and the city lists sewer lateral repairs among the permits that can be pulled online.",
    },
    {
      q: "Should I worry about liquefaction in Garden Grove?",
      a: "It is worth knowing about rather than worrying about. The city's own safety element says a majority of Garden Grove is subject to liquefaction, which is about how saturated, loose soil behaves in strong shaking. For an existing house it mostly matters when you plan an addition, foundation work or a purchase. Look your address up on the state's Seismic Hazard Zone map and bring the result to whoever engineers the work.",
    },
    {
      q: "Who provides fire service in Garden Grove?",
      a: "The Orange County Fire Authority. The city's own page says the authority is responsible for fire protection services for Garden Grove and lists seven authority stations in the city, numbered 80 through 86. The authority also handles fire safety inspections of existing structures and fire plan review for new developments here.",
    },
  ],

  updated: "2026-09-20",
};
