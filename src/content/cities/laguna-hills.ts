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
    "Laguna Hills was Lewis Moulton's sheep and cattle ranch until the early 1960s, and its largest neighborhood still keeps horses: the city's general plan counts 1,407 lots, an equestrian center and 20 miles of riding trails on the 1,350 acres of Nellie Gail Ranch. Nearly everything else arrived in one burst, with about 74 percent of the homes dating from the 1970s and 1980s and a median build year of 1980, a full decade before the city incorporated on December 20, 1991. A line north of Alicia Parkway splits the tap water between two districts, both very hard, and the State Fire Marshal's 2025 map puts fire hazard zones on the northwest corner of town.",
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
        text: "Laguna Hills' median year built is 1980. Of about 12,072 housing units, roughly 38.9 percent went up in the 1970s and 34.7 percent in the 1980s, with another 10.6 percent in the 1990s and 7.7 percent in the 1960s. Under 2 percent predate 1960 and only about 6.4 percent date from 2000 or later. About 54.7 percent are detached houses and 19.3 percent are attached single-family homes. A house built between 1975 and 1985 is at the age where the second roof, the original electrical panel, the furnace and air conditioner and the first drain line problems all come up together.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639220",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The city's history page explains the timing. The land was part of Rancho Niguel, granted to Juan Avila in 1842; Lewis Moulton bought it in 1895 and grew the ranch to 22,000 acres of dry farming, sheep and cattle, and the Moulton Ranch was subdivided in the early 1960s. Cityhood came later: 86 percent of voters approved incorporation on March 5, 1991, and Laguna Hills officially became a city on December 20, 1991. North Laguna Hills joined on July 1, 1996, and the Westside annexation of September 18, 2000 added 149 acres of homes and about 1,800 residents.",
        sourceUrl: "https://www.lagunahillsca.gov/247/History-of-Laguna-Hills",
        sourceLabel: "City of Laguna Hills, History of Laguna Hills",
      },
      {
        text: "The city's Housing Element, adopted March 26, 2024, says housing over 30 years old is likely to show needs such as new roofing, foundation work and new plumbing, and that most of the city's stock is that old. It also says owners here keep up: as of December 2021 it counted 37 homes out of 10,980 in need of rehabilitation. Between January 2013 and October 2020 the city issued 945 permits for roof work, 1,343 for alterations or additions and 2,769 for changes to residential electrical systems. The element names Via Lomas as the neighborhood where it will focus county-run repair loans and grants for lower-income owners.",
        sourceUrl:
          "https://www.lagunahillsca.gov/DocumentCenter/View/8440/Housing-Element",
        sourceLabel: "City of Laguna Hills General Plan, Housing Element (2024)",
      },
      {
        text: "The general plan calls Nellie Gail Ranch the largest residential development in the city: 1,407 lots on 1,350 acres between I-5, State Route 73 and La Paz Road, a mix of tract and custom homes from 1,700 to 17,000 square feet on large lots, designated Estate Residential. It has an equestrian center, 20 miles of equestrian trails, parks and substantial open space. For an owner that means more ground to look after than a tract lot has: a large lot, often on a slope, and for those who keep horses the equestrian side of the property as well.",
        sourceUrl:
          "https://www.lagunahillsca.gov/DocumentCenter/View/8443/Land-Use-Element",
        sourceLabel: "City of Laguna Hills General Plan, Land Use Element (2009)",
      },
      {
        text: "The Nellie Gail Ranch Owners Association says all exterior changes to a home or property require approval from its Architectural Review Committee, which typically meets on the second Tuesday of each month and wants submittals 10 business days ahead. It also offers a free 10 to 15 minute workshop with its consulting architect before you apply. The city's handout on exempt projects gives the same advice citywide: check your association's CC&Rs first, even on work that needs no permit.",
        sourceUrl:
          "https://nelliegailranch.org/homeowner-services/architectural-review-committee/",
        sourceLabel:
          "Nellie Gail Ranch Owners Association, Architectural Review Committee",
      },
      {
        text: "South of the water district line, the supplier is Moulton Niguel Water District. Its 2025 report says all of its water is imported through the Metropolitan Water District, treated at the Diemer plant in Yorba Linda and the Baker plant in Lake Forest, and delivered as a blend of the two. In 2025 testing the Metropolitan water averaged 236 ppm of hardness, or 13.8 grains per gallon, with a range of 191 to 280 ppm, and the Baker water averaged 293 ppm, or 17.1 grains, with a range of 269 to 322 ppm. The report notes that hard water leaves mineral deposits on plumbing fixtures over time.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010073&Year=2025&isCert=false",
        sourceLabel:
          "Moulton Niguel Water District, 2025 Consumer Confidence Report (State Water Board copy)",
      },
      {
        text: "The Building Division's list of common exempt projects draws the permit line in plain terms. No permit is needed for painting, flooring, countertops, cabinet replacement that leaves walls, plumbing and wiring alone, faucet or toilet replacement, or a detached accessory structure of 120 square feet or less with no wiring. Roof work is exempt only if it covers less than 10 percent of the existing roof, does not touch the framing and happens no more than once in 12 months. The list states that main panel replacements and upgrades need utility approval and a building permit.",
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
    note: "All five names are the city's own. Nellie Gail Ranch is the equestrian community south of La Paz Road between I-5 and State Route 73. The Urban Village is what the general plan calls the civic and retail center bounded by Paseo de Valencia, Los Alisos Boulevard and I-5, anchored by Saddleback Memorial Medical Center and the former Laguna Hills Mall property, where the City Council approved the Village at Laguna Hills project in 2022 and the developer has since applied for major modifications. North Laguna Hills and the Westside are the two areas the city's history page says were annexed in 1996 and 2000. Via Lomas is the neighborhood the Housing Element singles out for repair assistance. Other tract names turned up only on real-estate pages, so they are not listed.",
    sourceUrl:
      "https://www.lagunahillsca.gov/DocumentCenter/View/8443/Land-Use-Element",
  },

  water: {
    utility: "El Toro Water District and Moulton Niguel Water District",
    utilityUrl: "https://etwd.com/about-etwd/about-etwd",
    summary:
      "Laguna Hills has two water and sewer suppliers, and your bill names yours. The city's general plan says El Toro Water District serves the northern portion and Moulton Niguel Water District the southern portion, with the dividing line running through a neighborhood north of Alicia Parkway and south of Aliso Creek. El Toro says it serves portions of Laguna Hills along with all of Laguna Woods, and that about 21 percent of its roughly 5,430-acre service area is in Laguna Hills; Moulton Niguel's 2025 report lists Laguna Hills among the six cities it serves. Neither district reports local groundwater in the mix. El Toro's 2026 Water Quality Report, covering 2025, describes treated surface water from the Metropolitan Water District and from Irvine Ranch Water District's Baker plant, which also treats water from Santiago Reservoir. It shows the Metropolitan water averaging 236 ppm of hardness, or 14 grains per gallon, with a range of 191 to 280 ppm, and the Baker water averaging 293 ppm, or 17 grains per gallon, with a range of 269 to 322 ppm. Moulton Niguel's report gives an overall average of 15.45 grains per gallon for 2025. Either way this is very hard water. Both districts disinfect with chloramines, which both reports say matters to kidney dialysis patients and to anyone keeping fish ponds or aquariums, and El Toro reports no lead or galvanized service lines in its system.",
    sourceUrl:
      "https://etwd.com/files/Water%20Quality%20Reports/2026ETWDCCR-v8-WEB-singlepages.pdf",
  },

  permits: {
    office: "City of Laguna Hills Building & Safety Division",
    portalUrl:
      "https://cityoflagunahillsca-energovweb.tylerhost.net/apps/selfservice#/home",
    summary:
      "The Building & Safety Division, which the city says is currently staffed under contract by the consulting firm Charles Abbott Associates, has moved permit and inspection services to what it calls a 100 percent online system: you apply, pay, request inspections and look up records through the self-service portal. The division's page says applications submitted on or after January 1, 2026 must comply with the 2025 California Building Standards Code. Its panel upgrade handout says meter panel permits are issued through the portal once you upload the utility's service order, and that the utility generally disconnects in the morning and reconnects the same afternoon if the panel passes the city inspection. The counter is at City Hall, 24035 El Toro Road, open 1:00 to 5:00 p.m. Monday through Thursday and alternating Fridays; the main number is (949) 707-2600 and the inspection line is (949) 707-2660. Construction is allowed 7 a.m. to 8 p.m. on weekdays and 8 a.m. to 8 p.m. on Saturdays, and not at all on Sundays or federal holidays.",
    sourceUrl: "https://www.lagunahillsca.gov/173/BuildingSafety-Division",
  },

  hazards: [
    {
      text: "The city's 2022 Safety Element said no part of Laguna Hills was in a Very High Fire Hazard Severity Zone, only next to one. The State Fire Marshal's Local Responsibility Area map dated March 24, 2025, which the city links from its fire zone page and describes as the first update since 2007, now shows Very High, High and Moderate bands across the residential streets in the northwest corner of the city, on the side facing Irvine and the open space to the west. The rest of the city is unzoned. The zone is set by location, so check your address on the state's lookup map linked from the city's page.",
      sourceUrl: "https://www.lagunahillsca.gov/591/Fire-Hazard-Severity-Zone",
      sourceLabel: "City of Laguna Hills, Fire Hazard Severity Zone",
    },
    {
      text: "The city's page spells out what each tier means. In the Very High zone, new buildings need 100 feet of defensible space and ignition-resistant construction under Chapter 7A of the California Building Code, and a natural hazard disclosure is required when the property is sold. In the High zone the Chapter 7A rules and the sale disclosure apply, but the city says defensible space requirements do not currently apply, and in the Moderate zone it says there are currently no requirements. The Safety Element puts the peak of fire season in August, September and October, when Santa Ana winds meet dry vegetation.",
      sourceUrl: "https://www.lagunahillsca.gov/591/Fire-Hazard-Severity-Zone",
      sourceLabel:
        "City of Laguna Hills, Fire Hazard Severity Zone, potential impacts on property owners",
    },
    {
      text: "On faults, the Safety Element says the San Joaquin Hills thrust fault underlies the city and is believed capable of a large local earthquake, though it is considered unlikely to rupture in the near future. The nearest major active fault is the Newport-Inglewood Fault Zone, approximately three miles to the southwest. The element says there are no active faults in the city and that no faults within or near it are in a state Alquist-Priolo Earthquake Fault Zone, so the practical risk is shaking rather than the ground splitting. Strapped water heaters and braced chimneys are the homeowner side of that.",
      sourceUrl:
        "https://www.lagunahillsca.gov/DocumentCenter/View/8438/Safety-Element",
      sourceLabel: "City of Laguna Hills General Plan, Safety Element (2022)",
    },
    {
      text: "Liquefaction is mapped along the creek valleys, not the hills. The Safety Element lists four susceptible areas: drainages in the northern part of the city south of Lake Forest and along Ridge Route Drive, Aliso Creek around the former mall and its tributaries to the south including Alicia Parkway, Sulphur Creek and a tributary, and Oso Creek along southbound I-5. It adds that groundwater is only about 5 to 10 feet down along Sulphur, Aliso and Oso creeks. If you plan an addition, a pool or a deep footing in one of those strips, ask Building and Safety early what soils investigation the lot will need.",
      sourceUrl:
        "https://www.lagunahillsca.gov/DocumentCenter/View/8438/Safety-Element",
      sourceLabel: "City of Laguna Hills General Plan, Safety Element (2022)",
    },
    {
      text: "Slopes are the hazard the hills bring. The Safety Element says slopes steeper than 25 degrees, roughly 2 to 1, are potentially unstable and prone to surficial failures, mudflows, debris flows, soil creep and erosion, and that failures of human-made slopes could also occur in previously developed parts of the city. It also flags soils that may be expansive, compressible, erodible, corrosive or collapsible, with damage possible when water is added. On a graded lot that means keeping terrace drains, down drains and swales clear before winter, and keeping irrigation off the slope face as much as the planting allows.",
      sourceUrl:
        "https://www.lagunahillsca.gov/DocumentCenter/View/8438/Safety-Element",
      sourceLabel: "City of Laguna Hills General Plan, Safety Element (2022)",
    },
    {
      text: "Flood zones are small and specific. The Safety Element says FEMA's maps show the 1 percent annual chance floodplain around Aliso Creek, Veeh Reservoir, Mill Creek and a zone northwest of Alicia Parkway in the south of the city, with lower-risk areas along the La Paz Channel on the eastern border and along North Sulphur Creek near Moulton Parkway. It says most of the city is not downstream of a dam, but that a strong earthquake or intense storm could affect the residential area around Veeh Reservoir in the northwest, and that a failure at Lake Mission Viejo, Upper Oso or El Toro reservoir would send water down Oso Creek toward the southeastern edge of the city next to I-5.",
      sourceUrl:
        "https://www.lagunahillsca.gov/DocumentCenter/View/8438/Safety-Element",
      sourceLabel: "City of Laguna Hills General Plan, Safety Element (2022)",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, in a city where about 74 percent of the homes are 1970s and 1980s builds and only roof work under 10 percent skips the permit.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on water both districts report at roughly 14 to 17 grains per gallon.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "What an upgrade runs when the panel is original to a 1980 house, and why the city wants the utility's service order before it issues the permit.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including slope drains before winter and brush and gutters before the August to October wind season.",
    },
  ],

  neighbors: ["laguna-woods", "mission-viejo", "laguna-niguel"],

  faq: [
    {
      q: "Is the water hard in Laguna Hills?",
      a: "Yes, on both sides of town. El Toro Water District's report for 2025 shows its Metropolitan supply averaging 236 ppm of hardness, or 14 grains per gallon, and its Baker plant supply averaging 293 ppm, or 17 grains. Moulton Niguel Water District's 2025 report says the hardness in its water averaged 15.45 grains per gallon. Both districts deliver Metropolitan and Baker plant water, so there is no soft side of the city. Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour.",
    },
    {
      q: "Which water district serves my Laguna Hills address?",
      a: "One of two. The city's general plan says El Toro Water District serves the northern portion of Laguna Hills and Moulton Niguel Water District the southern portion, with the line running through a neighborhood north of Alicia Parkway and south of Aliso Creek. The same district handles your sewer service. The name on your water bill settles it, and El Toro publishes a zoomable service area map on its website.",
    },
    {
      q: "Who provides fire service in Laguna Hills?",
      a: "The Orange County Fire Authority. The city's Fire Protection page says fire protection services are provided under contract with the authority, and the authority lists the City of Laguna Hills among its member cities. The city's general plan, written in 2009, describes the city as served by Fire Station 22 on Paseo de Valencia in neighboring Laguna Woods.",
    },
    {
      q: "Do I need a permit to replace a water heater in Laguna Hills?",
      a: "Plan on one, and confirm with the Building Division at (949) 707-2600. Its list of exempt projects covers faucet and toilet replacement but not water heaters, and says projects that change pipes or major appliances need a permit and inspection. The division's water heater handout shows what gets checked: state-approved earthquake straps in the top and bottom thirds of the tank, a relief valve piped to the outside, an expansion tank if the house has a closed system, a drain pan where a leak could do damage, and in a garage a burner at least 18 inches off the floor unless the unit is listed as flammable vapor ignition resistant. Permits go through the city's online portal, and a licensed plumber normally pulls it.",
    },
    {
      q: "Do I need a permit to reroof in Laguna Hills?",
      a: "For anything beyond a small repair, yes. The city's exempt projects list excuses roof repairs or replacements only when they cover less than 10 percent of the existing roof, do not involve the underlying framing and happen no more than once in a 12-month period. A full reroof is outside that, so it goes through the Building & Safety Division's online portal. In Nellie Gail Ranch the owners association says all exterior changes need its approval too, so check with your association before ordering material.",
    },
    {
      q: "Is my Laguna Hills home in a fire hazard severity zone?",
      a: "Most are not, but the northwest corner is. The State Fire Marshal's March 24, 2025 map, linked from the city's Fire Hazard Severity Zone page, shows Very High, High and Moderate bands across the neighborhoods at the northwest edge of the city and leaves the rest unzoned. That is a change from the city's 2022 Safety Element, which said no part of Laguna Hills was in a Very High zone. Use the state's address lookup linked from the city page, because the zone drives sale disclosures and the rules for new buildings.",
    },
  ],

  updated: "2026-09-20",
};
