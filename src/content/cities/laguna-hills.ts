import type { CityContent } from "./types";

// Laguna Hills. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a piece of the Moulton
// Ranch that was subdivided in the early 1960s, built almost entirely in the
// 1970s and 1980s, and only became a city on December 20, 1991. Its largest
// neighborhood, Nellie Gail Ranch, is still horse property (the city's general
// plan counts 1,407 lots on 1,350 acres with 20 miles of riding trails), and
// the city is split between two water districts along a line the general plan
// puts north of Alicia Parkway and south of Aliso Creek.
//
// WATER NUMBERS. Two suppliers, never averaged. El Toro Water District figures
// are from its 2026 Water Quality Report (2025 data), a text PDF on etwd.com.
// Moulton Niguel Water District's 2025 report is a scanned PDF, read from page
// images of the copy on the State Water Board's portal (mnwd.com blocks
// scripted requests). Both districts print grains per gallon themselves, so
// nothing here is our conversion; they round the same Metropolitan and Baker
// results differently (14 and 17 versus 13.8 and 17.1), each quoted as printed.
//
// FIRE SERVICE. The city's Fire Protection page says fire protection is
// provided under contract with the Orange County Fire Authority, and ocfa.org
// lists the city as a member. The Station 22 detail is from the 2009 general
// plan and is dated as such (the authority's station list would not load).
//
// FIRE ZONES. The 2022 Safety Element says no part of the city was in a Very
// High zone. The State Fire Marshal's March 24, 2025 map, linked from the
// city's Fire Hazard Severity Zone page, now shows Very High, High and
// Moderate bands across the northwest corner. The page says both things and
// dates each one.
//
// LEFT OUT ON PURPOSE. Any municipal code roofing rule (the code publisher's
// site refused every request), whether the city has adopted its fire zone
// ordinance yet (the city page gives no date), unit counts and the outcome of
// the Village at Laguna Hills modification (an application in process, not a
// result), acreage and street names inside each fire tier (the state map
// prints none), the Safety Element's heat projections (cut for length),
// rainfall normals, and tract names that only show up on real-estate pages.

export const lagunaHills: CityContent = {
  name: "Laguna Hills",
  slug: "laguna-hills",
  intro:
    "Laguna Hills was Lewis Moulton's sheep and cattle ranch until the early 1960s, and its largest neighborhood still keeps horses: Nellie Gail Ranch has 1,407 lots, an equestrian center and 20 miles of riding trails. About 74 percent of the homes date from the 1970s and 1980s, a decade or more before the city incorporated on December 20, 1991, and a line north of Alicia Parkway splits the tap water between two very hard supplies.",
  metaDescription:
    "Laguna Hills is 1970s and 1980s tracts plus the horse lots of Nellie Gail Ranch. Two water districts, online-only permits and mapped hazards, sourced.",
  metaTitle: "Laguna Hills homes: horse lots, 1970s-80s tracts",

  population: {
    value: "About 30,740 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0639220",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1980",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639220",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 12,072 housing units, roughly 38.9 percent went up in the 1970s and 34.7 percent in the 1980s, with 10.6 percent in the 1990s and 7.7 percent in the 1960s. Under 2 percent predate 1960 and about 6.4 percent date from 2000 or later. About 54.7 percent are detached houses and 19.3 percent attached single-family homes.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639220",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The land was part of Rancho Niguel, granted to Juan Avila in 1842. Lewis Moulton bought it in 1895 and grew it to 22,000 acres of dry farming, sheep and cattle, and the ranch was subdivided in the early 1960s. 86 percent of voters approved cityhood on March 5, 1991; North Laguna Hills joined on July 1, 1996, and the Westside annexation of September 18, 2000 added 149 acres of homes and about 1,800 residents.",
        sourceUrl: "https://www.lagunahillsca.gov/247/History-of-Laguna-Hills",
        sourceLabel: "City of Laguna Hills, History of Laguna Hills",
      },
      {
        text: "The 2024 Housing Element says most homes are over 30 years old, yet only 37 of 10,980 homes needed rehabilitation as of December 2021. From January 2013 to October 2020 the city issued 945 roof permits, 1,343 for alterations or additions and 2,769 for residential electrical work. Via Lomas is where it will focus county-run repair loans and grants for lower-income owners.",
        sourceUrl:
          "https://www.lagunahillsca.gov/DocumentCenter/View/8440/Housing-Element",
        sourceLabel: "City of Laguna Hills General Plan, Housing Element (2024)",
      },
      {
        text: "The general plan calls Nellie Gail Ranch the city's largest residential development: 1,407 lots on 1,350 acres between I-5, State Route 73 and La Paz Road, tract and custom homes of 1,700 to 17,000 square feet on large Estate Residential lots, with an equestrian center, 20 miles of trails, parks and open space.",
        sourceUrl:
          "https://www.lagunahillsca.gov/DocumentCenter/View/8443/Land-Use-Element",
        sourceLabel: "City of Laguna Hills General Plan, Land Use Element (2009)",
      },
      {
        text: "In Nellie Gail Ranch, every exterior change needs the owners association's Architectural Review Committee, which usually meets the second Tuesday of the month and wants submittals 10 business days ahead. It offers a free 10 to 15 minute workshop with its consulting architect before you apply.",
        sourceUrl:
          "https://nelliegailranch.org/homeowner-services/architectural-review-committee/",
        sourceLabel:
          "Nellie Gail Ranch Owners Association, Architectural Review Committee",
      },
      {
        text: "South of the district line, Moulton Niguel Water District delivers only imported Metropolitan water, treated at the Diemer plant in Yorba Linda and the Baker plant in Lake Forest. In 2025 the Metropolitan water averaged 236 ppm of hardness, or 13.8 grains per gallon, and the Baker water 293 ppm, or 17.1 grains.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010073&Year=2025&isCert=false",
        sourceLabel:
          "Moulton Niguel Water District, 2025 Consumer Confidence Report (State Water Board copy)",
      },
      {
        text: "No permit is needed for painting, flooring, countertops, cabinets that leave walls, plumbing and wiring alone, faucet or toilet swaps, or a detached structure of 120 square feet or less with no wiring. Roof work is exempt only under 10 percent of the roof, with no framing touched, once in 12 months. Main panel replacements need utility approval and a building permit.",
        sourceUrl:
          "https://www.lagunahillsca.gov/DocumentCenter/View/7844/Common-Projects-Exempt-from-Permits",
        sourceLabel:
          "City of Laguna Hills Building Division, Common Projects Exempt from Building Permits",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Nellie Gail Ranch",
      "Urban Village",
      "North Laguna Hills",
      "Westside",
      "Via Lomas",
    ],
    note: "All five names are the city's own. Nellie Gail Ranch is the equestrian community south of La Paz Road. The Urban Village is the civic and retail center bounded by Paseo de Valencia, Los Alisos Boulevard and I-5, anchored by Saddleback Memorial Medical Center and the former Laguna Hills Mall, where the Council approved the Village at Laguna Hills project in 2022 and the developer has since applied for major changes. North Laguna Hills and the Westside are the 1996 and 2000 annexations, and Via Lomas is the Housing Element's repair-assistance focus.",
    sourceUrl:
      "https://www.lagunahillsca.gov/DocumentCenter/View/8443/Land-Use-Element",
  },

  water: {
    utility: "El Toro Water District and Moulton Niguel Water District",
    utilityUrl: "https://etwd.com/about-etwd/about-etwd",
    summary:
      "El Toro Water District supplies water and sewer in the north and Moulton Niguel Water District in the south, split through a neighborhood north of Alicia Parkway; about 21 percent of El Toro's roughly 5,430-acre service area is in Laguna Hills. El Toro's 2026 report on 2025 shows treated Metropolitan water averaging 236 ppm, or 14 grains per gallon, and Baker plant water, which also draws on Santiago Reservoir, averaging 293 ppm, or 17 grains; Moulton Niguel's overall average was 15.45 grains. Neither uses local groundwater, both disinfect with chloramines, which matters for dialysis patients and fish tanks, and El Toro reports no lead or galvanized service lines.",
    sourceUrl:
      "https://etwd.com/files/Water%20Quality%20Reports/2026ETWDCCR-v8-WEB-singlepages.pdf",
  },

  permits: {
    office: "City of Laguna Hills Building & Safety Division",
    portalUrl:
      "https://cityoflagunahillsca-energovweb.tylerhost.net/apps/selfservice#/home",
    summary:
      "Building & Safety, staffed under contract by Charles Abbott Associates, is fully online: apply, pay, book inspections and look up records on the portal. A meter panel permit issues once you upload the utility's service order, and the utility usually disconnects in the morning and reconnects that afternoon if the panel passes. The counter at City Hall, 24035 El Toro Road, is open 1:00 to 5:00 p.m. Monday through Thursday and alternating Fridays; call (949) 707-2600, or (949) 707-2660 for inspections. Construction runs 7 a.m. to 8 p.m. weekdays and 8 a.m. to 8 p.m. Saturdays, never Sundays or federal holidays.",
    sourceUrl: "https://www.lagunahillsca.gov/173/BuildingSafety-Division",
  },

  hazards: [
    {
      text: "The 2022 Safety Element said no part of the city was in a Very High Fire Hazard Severity Zone. The State Fire Marshal's March 24, 2025 map, the first update since 2007, now puts Very High, High and Moderate bands across the residential streets of the northwest corner facing Irvine and the open space to the west, and leaves the rest unzoned.",
      sourceUrl: "https://www.lagunahillsca.gov/591/Fire-Hazard-Severity-Zone",
      sourceLabel: "City of Laguna Hills, Fire Hazard Severity Zone",
    },
    {
      text: "In the Very High zone, new buildings need 100 feet of defensible space and Chapter 7A ignition-resistant construction, and a sale requires a hazard disclosure. In the High zone Chapter 7A and the disclosure apply but defensible space rules currently do not, and the Moderate zone currently has no requirements. Fire season peaks in August, September and October.",
      sourceUrl: "https://www.lagunahillsca.gov/591/Fire-Hazard-Severity-Zone",
      sourceLabel:
        "City of Laguna Hills, Fire Hazard Severity Zone, potential impacts on property owners",
    },
    {
      text: "The San Joaquin Hills thrust fault underlies the city and could produce a large local earthquake, though it is considered unlikely to rupture soon; the Newport-Inglewood Fault Zone is about three miles southwest. The Safety Element says no active fault is in the city and none nearby is in an Alquist-Priolo zone, so the risk is shaking, not ground rupture.",
      sourceUrl:
        "https://www.lagunahillsca.gov/DocumentCenter/View/8438/Safety-Element",
      sourceLabel: "City of Laguna Hills General Plan, Safety Element (2022)",
    },
    {
      text: "Liquefaction is mapped in the creek valleys: drainages in the north near Lake Forest and Ridge Route Drive, Aliso Creek around the former mall and its tributaries to the south including Alicia Parkway, Sulphur Creek, and Oso Creek along southbound I-5. Groundwater is only about 5 to 10 feet down along Sulphur, Aliso and Oso creeks.",
      sourceUrl:
        "https://www.lagunahillsca.gov/DocumentCenter/View/8438/Safety-Element",
      sourceLabel: "City of Laguna Hills General Plan, Safety Element (2022)",
    },
    {
      text: "Slopes steeper than 25 degrees, roughly 2 to 1, are potentially unstable and prone to surficial failures, mudflows, soil creep and erosion, and graded slopes in developed areas can fail too. Some soils may also be expansive or collapsible when water is added.",
      sourceUrl:
        "https://www.lagunahillsca.gov/DocumentCenter/View/8438/Safety-Element",
      sourceLabel: "City of Laguna Hills General Plan, Safety Element (2022)",
    },
    {
      text: "FEMA's 1 percent annual chance floodplain covers Aliso Creek, Veeh Reservoir, Mill Creek and a zone northwest of Alicia Parkway, with lower-risk areas along the La Paz Channel and North Sulphur Creek. Most of the city is not below a dam, but Veeh Reservoir could affect homes around it in the northwest, and a failure at Lake Mission Viejo, Upper Oso or El Toro reservoir would send water down Oso Creek toward the southeast edge by I-5.",
      sourceUrl:
        "https://www.lagunahillsca.gov/DocumentCenter/View/8438/Safety-Element",
      sourceLabel: "City of Laguna Hills General Plan, Safety Element (2022)",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb: "Only roof work under 10 percent of the roof skips the city permit.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "Both districts deliver water at roughly 14 to 17 grains per gallon.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb: "The city wants the utility's service order before it issues a panel permit.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Slope drains before winter, brush and gutters before the August to October fire peak.",
    },
  ],

  neighbors: ["laguna-woods", "mission-viejo", "laguna-niguel", "aliso-viejo"],

  faq: [
    {
      q: "Who provides fire service in Laguna Hills?",
      a: "The Orange County Fire Authority, under contract with the city, which is one of the authority's member cities. The 2009 general plan describes the city as served by Fire Station 22 on Paseo de Valencia in neighboring Laguna Woods.",
    },
    {
      q: "What does Laguna Hills check on a new water heater?",
      a: "Earthquake straps in the top and bottom thirds of the tank, a relief valve piped outside, an expansion tank on a closed system, a drain pan where a leak could do damage, and in a garage a burner at least 18 inches up unless the unit is flammable vapor ignition resistant. Water heaters are not on the exempt list, so plan on a permit.",
    },
    {
      q: "Is there a map of the Laguna Hills water district line?",
      a: "Yes. El Toro Water District publishes a zoomable service area map on its website, and the name on your water bill settles it too.",
    },
  ],

  updated: "2026-09-20",
};
