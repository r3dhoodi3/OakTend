import type { CityContent } from "./types";

// Laguna Woods. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a city that is, for
// practical purposes, one 1960s retirement community. The city's 2023 housing
// element puts 12,736 homes inside Laguna Woods Village (opened as Leisure
// World in 1964), split between a stock cooperative (United), a condominium
// mutual (Third) and two condominium towers. So nearly every project needs
// two approvals. The Village's Manor Alterations FAQ (PDF dated September 17,
// 2026) says the city will not issue a permit without an approved mutual
// consent, and the city's building page says association approvals are in
// addition to, not a substitute for, city permits.
//
// FIRE SERVICE. Orange County Fire Authority, confirmed on the city's Fire &
// Emergency Medical page (joint powers agreement) and on the member list at
// ocfa.org. The Fire Station 12 detail is from an OCFA notice the city posted
// on July 22, 2026. No station number is given for the existing station on
// Paseo de Valencia (the OCFA station list would not load in full).
//
// WATER NUMBERS are from El Toro Water District's 2026 Water Quality Report
// (data for January 1 to December 31, 2025), a text PDF on etwd.com. The
// report prints both ppm and grains per gallon, so no conversion was needed.
// It does not say what share of the supply comes from each plant.
//
// HAZARDS are from the General Plan Safety Element (April 16, 2014), still the
// one posted on the city's general plan page, and from the city's Fire Hazard
// Severity Zones page for the 2025 map. The element's dwelling count belongs
// to the zones the council designated in 2012, and the page says so.
//
// LEFT OUT ON PURPOSE. Any ranking of the city's median age (the city gives
// the number, 74.9, not a rank), the Village's "largest in the country" line
// and the city's "32nd city" ordinal, the Village's "255 days of sunshine"
// (marketing copy), any claim about failing original plumbing or wiring (no
// city or Village document opened says it; the housing element only makes the
// general 30-year statement), the Village population (the Village says
// 18,600, more than the census counts for the whole city), and gate or
// cul-de-sac names as neighborhoods.

export const lagunaWoods: CityContent = {
  name: "Laguna Woods",
  slug: "laguna-woods",
  intro:
    "Laguna Woods is a city wrapped around one retirement community: the city's housing element counts 12,736 homes inside the gates of Laguna Woods Village, which opened as Leisure World on September 10, 1964 and only became a city on March 24, 1999. The age shows on both sides of the front door, with about 83 percent of homes dating from the 1960s and 1970s, a median build year of 1969 and, by the 2020 Census figure the city publishes, a median resident age of 74.9. It also means most projects here need two approvals, because the Village's own alterations FAQ says the city will not issue a permit for a manor alteration until the housing mutual has approved a mutual consent.",
  metaTitle: "Laguna Woods, CA homes: 1960s manors, two permits",
  metaDescription:
    "Laguna Woods is mostly 1960s and 1970s Village manors. Mutual consent plus a city permit, asbestos surveys, hard imported water and west-edge fire zones.",

  population: {
    value: "About 17,289 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the city reports 17,644 in the 2020 Census and a state estimate of 17,183 for January 1, 2025",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0639259",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1969",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639259",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Laguna Woods' median year built is 1969. Of about 13,336 housing units, roughly 49.4 percent went up in the 1960s and 33.7 percent in the 1970s, with 5.2 percent from the 1980s and only about 1.7 percent from 2000 or later. About 7 percent of units are detached houses, about 22 percent are attached single-unit homes, and the rest are in buildings of two or more units. These are survey estimates, but the shape is plain: a city of shared walls, shared roofs and buildings 50 to 60 years old.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639259",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The city's history page explains why the dates cluster. The roughly three square miles were part of the Moulton Ranch, dry farming and cattle land with a few ranch buildings, until developer Ross Cortese, who had already built Rossmoor and Leisure World Seal Beach, bought a portion in 1962. Leisure World Laguna Hills received its first residents in 1964. Cityhood first came up in 1971, went to a special election on March 2, 1999, and became official on March 24, 1999.",
        sourceUrl: "https://www.lagunawoods.gov/city-history/",
        sourceLabel: "City of Laguna Woods, city history",
      },
      {
        text: "The city's 2023 housing element says typical housing over 30 years old is likely to need work such as new plumbing, roof repairs and foundation work, and that about 98 percent of Laguna Woods' housing will be past that age by the end of the 2021 to 2029 planning period. It also reports that a drive-by survey of every residential unit in October 2021 found only five locations with minor issues, such as minor wood rot, and credits the on-site management of the private communities. Old and well kept is the honest summary, so the work that comes due is mostly behind the walls.",
        sourceUrl:
          "https://www.lagunawoods.gov/wp-content/uploads/2023/08/2023-08-16-General-Plan-Housing-Element-Adopted.pdf",
        sourceLabel: "City of Laguna Woods, General Plan Housing Element (August 16, 2023)",
      },
      {
        text: "Which mutual you are in decides who owns what. The Village's community fact sheet counts 12,736 units in 2,584 residential buildings: United Laguna Woods Mutual is stock cooperative housing with 6,323 memberships, Third Laguna Hills Mutual is condominium housing with 6,102, and Mutual No. Fifty, the two high-rise Towers on Paseo del Lago West, has 311 and is managed separately. It says all units built since 1968 are condominiums, and that in United the corporation holds title and owns the unaltered interior fixtures, including the appliances. Find out which mutual your manor belongs to before planning work.",
        sourceUrl:
          "https://attachments.lagunawoodsvillage.com/wp-content/uploads/2024/10/29133034/Community-Information.pdf",
        sourceLabel: "Laguna Woods Village, community information fact sheet",
      },
      {
        text: "Inside the Village, an alteration needs the mutual's approval before the city's. The Manor Alterations FAQ calls a mutual consent the mutual's approval of a proposed alteration and states that the City of Laguna Woods will not issue a permit without an approved one. It gives about seven to 10 business days for a complete standard application and about 30 to 60 days when a variance is needed. United does not allow owner-builder projects and requires a licensed contractor when the work exceeds $1,000 or needs a city permit. Build both timelines into a remodel schedule.",
        sourceUrl:
          "https://attachments.lagunawoodsvillage.com/wp-content/uploads/2021/06/17151319/Manor-Alterations-FAQ.pdf",
        sourceLabel: "Laguna Woods Village, Manor Alterations FAQ",
      },
      {
        text: "The same FAQ flags two things hidden in original manors. Original Village ceilings may contain electric radiant heating elements, and any penetration of such a ceiling voids the existing heating system and requires an alternate one, which matters before cutting in a ceiling fan. It also says manors were constructed when asbestos-containing materials were commonly used, so scraping a popcorn ceiling, retiling a shower, or disturbing original black mastic, vinyl flooring, drywall or joint compound can bring asbestos survey and abatement requirements with it.",
        sourceUrl:
          "https://attachments.lagunawoodsvillage.com/wp-content/uploads/2021/06/17151319/Manor-Alterations-FAQ.pdf",
        sourceLabel: "Laguna Woods Village, Manor Alterations FAQ",
      },
      {
        text: "Laguna Woods does not run its own fire department. The city says fire and emergency medical services are provided by the Orange County Fire Authority under a joint powers agreement, and its project page describes the existing Laguna Woods fire station as the one on Paseo de Valencia. In a notice the city posted on July 22, 2026, the authority said it is pursuing a permanent Fire Station 12 off Moulton Parkway, with design in fiscal year 2026-27, construction in 2027-28 and operations required to begin by December 31, 2029. Until then Engine 12 serves the city from Fire Station 19 near the Lake Forest border.",
        sourceUrl:
          "https://www.lagunawoods.gov/ocfa-focuses-efforts-on-permanent-fire-station-12-for-laguna-woods/",
        sourceLabel: "City of Laguna Woods, OCFA notice on permanent Fire Station 12",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Laguna Woods Village",
      "The Towers",
      "San Sebastian",
      "Whispering Fountains",
      "The Regency",
      "Las Palmas",
    ],
    note: "The city describes itself as home to five private communities, and its housing element names them. Laguna Woods Village, formerly Leisure World, is the gated community for people 55 and older that the element says covers about 2.7 of the city's 3.3 square miles; inside it, homes belong to a housing mutual (United, Third, or the Towers, the two high-rises of Mutual No. Fifty). San Sebastian and Whispering Fountains are age-restricted rental apartments with 134 and 140 units, and The Regency and Las Palmas are licensed residential care communities with 192 and 184. The Village numbers its gates and cul-de-sacs, but those are addresses rather than neighborhoods, so none are listed.",
    sourceUrl:
      "https://www.lagunawoods.gov/wp-content/uploads/2023/08/2023-08-16-General-Plan-Housing-Element-Adopted.pdf",
  },

  water: {
    utility: "El Toro Water District",
    utilityUrl: "https://etwd.com/about-etwd/about-etwd",
    summary:
      "El Toro Water District supplies drinking water, sewer and recycled water to the entire city of Laguna Woods, along with parts of Aliso Viejo, Laguna Hills, Lake Forest and Mission Viejo. Its 2026 Water Quality Report, covering 2025, describes two sources of treated surface water: the Metropolitan Water District of Southern California, drawing on the Colorado River and the State Water Project, and Irvine Ranch Water District's Baker Water Treatment Plant, which treats Metropolitan water and water from Santiago Reservoir (Irvine Lake). In 2025 the Metropolitan water averaged 236 ppm of hardness, or 14 grains per gallon, with a range of 191 to 280 ppm, and the Baker plant water averaged 293 ppm, or 17 grains per gallon, with a range of 269 to 322 ppm. The report does not say how the two are blended, but either way this is very hard water. The district also reports no lead or galvanized service lines in its system. In the Village, ask Manor Alterations before buying a softener: United's Standard 27 requires approval for every soft water unit and bars regenerative-type softeners.",
    sourceUrl:
      "https://etwd.com/files/Water%20Quality%20Reports/2026ETWDCCR-v8-WEB-singlepages.pdf",
  },

  permits: {
    office: "City of Laguna Woods Planning & Environmental Services Department",
    portalUrl: "https://www.lagunawoods.gov/schedule-building-inspections/",
    summary:
      "Building permits come from the permit counter at City Hall, 24264 El Toro Road, which the city says is open 7:30 a.m. to 2:30 p.m. Monday through Friday, closed from noon to 1 p.m. and on holidays, and by appointment at (949) 639-0500. The city's building page does not list an online application portal; the online tool it does offer is an inspection calendar, with bookings up to seven calendar days ahead. Its maximum plan review times for residential remodels are 5 weekdays for the first review and 3 for later ones. The page is blunt that homeowners association approvals are in addition to, and not a substitute for, city permits. The city's Rule 1403 sheet says state and air district rules generally require an asbestos survey by a California certified asbestos consultant before any demolition or renovation work, and that removing as little as one two-by-four from a load-bearing wall counts as demolition, which adds a 15-day air district notice before a permit. The city says it cannot waive those rules.",
    sourceUrl: "https://www.lagunawoods.gov/building-permitting/",
  },

  hazards: [
    {
      text: "The city's current fire hazard severity zones are the State Fire Marshal's map dated March 24, 2025, which the city says took effect locally on July 18, 2025. The map puts the Very High tier across the western end of the city, the open space and the neighborhoods that back onto Laguna Coast Wilderness Park, with narrow High and Moderate bands just east of it and the rest of the city unzoned. The city's page has a locator that looks up a zone by building number. The zones decide where state defensible space standards and wildland urban interface building codes apply.",
      sourceUrl: "https://www.lagunawoods.gov/fire-hazard-severity-zones/",
      sourceLabel: "City of Laguna Woods, Fire Hazard Severity Zones",
    },
    {
      text: "The 1993 Laguna Fire stopped short of the city. The safety element says it burned 16,682 acres in Laguna Beach and nearby unincorporated land, much of it close to the city's westernmost boundary in what is now Laguna Coast Wilderness Park, and brought heavy smoke but no burning or evacuations here. It records one wildfire in the city between 2003 and 2012, a half-acre fire on Avenida Majorca in 2005, against an average of 16 building fires a year. When the council designated zones in 2012, the element counted 2,564 dwelling units inside them.",
      sourceUrl:
        "https://www.lagunawoods.gov/wp-content/uploads/2015/06/Safety-Element-2014-04-16.pdf",
      sourceLabel: "City of Laguna Woods, General Plan Safety Element (2014)",
    },
    {
      text: "Flooding is rated a moderate risk. The safety element says FEMA special flood hazard areas cover about 26 acres of the city, and it lists major flood events in 1969, 1997, 2010 and 2011. The December 1997 storm displaced dozens of residents and did an estimated $700,000 of damage inside Laguna Woods Village; the January 2010 storms undermined part of El Toro Road and flooded City Hall. Aliso Creek crosses the Village under the Avenida Sevilla bridge, and the city joined the National Flood Insurance Program in 2004, so flood policies are available here.",
      sourceUrl:
        "https://www.lagunawoods.gov/wp-content/uploads/2015/06/Safety-Element-2014-04-16.pdf",
      sourceLabel: "City of Laguna Woods, General Plan Safety Element (2014)",
    },
    {
      text: "No state Alquist-Priolo earthquake fault zone crosses Laguna Woods, according to the safety element, which says the state considers approximately 256 acres of the city prone to liquefaction and approximately 77 acres prone to earthquake-induced landslides. Slopes have also failed without an earthquake: in 2004 a slope between Calle Sonora, a private Village road, and the Home Depot shopping center east of El Toro Road gave way because of excessive soil saturation. The element calls that approximately 400-foot slide the most significant in the city's recorded history, with an estimated 588 residents affected. Report broken irrigation and blocked slope drains to the mutual early.",
      sourceUrl:
        "https://www.lagunawoods.gov/wp-content/uploads/2015/06/Safety-Element-2014-04-16.pdf",
      sourceLabel: "City of Laguna Woods, General Plan Safety Element (2014)",
    },
    {
      text: "The safety element ties heat and power outages to who lives here. It rates energy shortages a significant risk, noting that Southern California Edison supplies all of the city's electricity and that losing power to home medical devices such as oxygen machines is a particular concern given local demography. It rates extreme heat a moderate risk, with special concern for people with chronic illness or limited access to air conditioning, and commits the city to designating a cooling center. Service the air conditioner before summer and keep a backup plan for anything medical that plugs in.",
      sourceUrl:
        "https://www.lagunawoods.gov/wp-content/uploads/2015/06/Safety-Element-2014-04-16.pdf",
      sourceLabel: "City of Laguna Woods, General Plan Safety Element (2014)",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on imported water that tests at 14 to 17 grains per gallon and in a city where a swap needs a permit.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a system runs, where original manors may still heat with radiant ceilings and a central system needs a mutual consent and a city permit.",
    },
    {
      href: "/guides/bathroom-remodel-cost",
      title: "Bathroom remodel cost",
      blurb:
        "What a remodel costs before the local extras: the Village says retiling a shower can expose asbestos-era materials, and the city asks for a survey first.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including air conditioner service before the heat and slope drains before winter storms.",
    },
  ],

  neighbors: ["laguna-hills", "aliso-viejo", "laguna-beach"],

  faq: [
    {
      q: "Do I need both a mutual consent and a city permit to remodel in Laguna Woods Village?",
      a: "Often, yes. The Village's Manor Alterations FAQ says a mutual consent is the housing mutual's approval of an alteration, that any alteration requiring a city permit needs the mutual consent first, and that the City of Laguna Woods will not issue a permit without it. The city's building page agrees: association approvals are in addition to, and not a substitute for, city permits. The Village quotes about seven to 10 business days for a standard application and 30 to 60 days if a variance is needed.",
    },
    {
      q: "Is the water hard in Laguna Woods?",
      a: "Yes, very. El Toro Water District's report for 2025 shows its Metropolitan Water District supply averaging 236 ppm of hardness, or 14 grains per gallon, and its Baker Water Treatment Plant supply averaging 293 ppm, or 17 grains per gallon. The district's own FAQ describes its water as generally considered hard. Flush a tank water heater yearly, and in the Village ask Manor Alterations before installing a softener, because United's standard requires approval and bars regenerative-type units.",
    },
    {
      q: "Who provides fire service in Laguna Woods?",
      a: "The Orange County Fire Authority. The city says fire and emergency medical services are provided by the authority under a joint powers agreement, and the authority lists Laguna Woods among its member cities. In July 2026 the authority said it is working toward a permanent Fire Station 12 off Moulton Parkway, with Engine 12 serving from Fire Station 19 meanwhile.",
    },
    {
      q: "What permit does a water heater replacement or a reroof need in Laguna Woods?",
      a: "Both are city building permits. The city's fee schedule lists a water heater change-out at $106 and a reroof at $178 for the first 1,000 square feet of tile or single-ply roofing, or $215 for other materials, rising by a dollar each on October 19, 2026. In the Village, the FAQ says a failed water heater may be replaced immediately as an emergency, with paperwork due the next business day: a mutual consent in United, a like-for-equivalent form in Third, whose form says the swap still requires a city permit. A licensed plumber normally pulls the permit.",
    },
    {
      q: "Do I need an asbestos test before remodeling a manor in Laguna Woods?",
      a: "Plan on it. The city's Rule 1403 information sheet says state and air district rules generally require a California certified asbestos consultant to survey the work area before any demolition or renovation work, and that the city is unable to waive this. If asbestos is found, a certified asbestos contractor must remove it, with proof shown before the city inspects. The Village's FAQ adds that manors were built when asbestos-containing materials were common, naming popcorn ceilings, black mastic, vinyl flooring and drywall joint compound.",
    },
    {
      q: "Is my Laguna Woods home in a fire hazard severity zone?",
      a: "Mostly a west side question. The State Fire Marshal's March 24, 2025 map, which took effect in the city on July 18, 2025, shows the Very High tier across the western end of the city next to Laguna Coast Wilderness Park, thin High and Moderate bands east of that, and most of the city unzoned. The city's Fire Hazard Severity Zones page has a locator where you enter your building number.",
    },
  ],

  updated: "2026-09-20",
};
