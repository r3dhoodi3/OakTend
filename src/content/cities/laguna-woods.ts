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
    "Laguna Woods Village, which opened as Leisure World on September 10, 1964, holds 12,736 of the city's homes, and the city around it only incorporated on March 24, 1999. With a median build year of 1969 and a median resident age of 74.9 in the 2020 Census figure the city publishes, most projects here need two approvals: the housing mutual's consent first, then the city permit.",
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
        text: "Of about 13,336 housing units, roughly 49.4 percent went up in the 1960s and 33.7 percent in the 1970s, with 5.2 percent from the 1980s and about 1.7 percent from 2000 or later. About 7 percent are detached houses and 22 percent attached single-unit homes; the rest sit in buildings of two or more units, so walls and roofs are mostly shared.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639259",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The roughly three square miles were Moulton Ranch dry farming and cattle land until Ross Cortese, who had built Rossmoor and Leisure World Seal Beach, bought a portion in 1962. Leisure World Laguna Hills took its first residents in 1964. Cityhood first came up in 1971 and passed in a special election on March 2, 1999.",
        sourceUrl: "https://www.lagunawoods.gov/city-history/",
        sourceLabel: "City of Laguna Woods, city history",
      },
      {
        text: "The 2023 housing element says about 98 percent of the city's housing will be over 30 years old by 2029, the age when plumbing, roof and foundation work tend to come due. A drive-by survey of every residential unit in October 2021 found only five locations with minor issues such as wood rot, which the element credits to the private communities' on-site management.",
        sourceUrl:
          "https://www.lagunawoods.gov/wp-content/uploads/2023/08/2023-08-16-General-Plan-Housing-Element-Adopted.pdf",
        sourceLabel: "City of Laguna Woods, General Plan Housing Element (August 16, 2023)",
      },
      {
        text: "Which mutual you are in decides who owns what. The Village counts 12,736 units in 2,584 residential buildings: United Laguna Woods Mutual is a stock cooperative with 6,323 memberships, Third Laguna Hills Mutual is condominiums with 6,102, and Mutual No. Fifty, the two Towers on Paseo del Lago West, has 311. All units built since 1968 are condominiums, and in United the corporation holds title and owns the unaltered interior fixtures, including appliances.",
        sourceUrl:
          "https://attachments.lagunawoodsvillage.com/wp-content/uploads/2024/10/29133034/Community-Information.pdf",
        sourceLabel: "Laguna Woods Village, community information fact sheet",
      },
      {
        text: "The Village's Manor Alterations FAQ says the city will not issue a permit for an alteration without an approved mutual consent. A complete standard application takes about seven to 10 business days, and 30 to 60 days when a variance is needed. United bars owner-builder projects and requires a licensed contractor when work exceeds $1,000 or needs a city permit.",
        sourceUrl:
          "https://attachments.lagunawoodsvillage.com/wp-content/uploads/2021/06/17151319/Manor-Alterations-FAQ.pdf",
        sourceLabel: "Laguna Woods Village, Manor Alterations FAQ",
      },
      {
        text: "Original manor ceilings may hold electric radiant heating elements, and the same FAQ says cutting into one voids that heating system and requires an alternate, which matters before adding a ceiling fan. Manors were also built when asbestos was common, so popcorn ceilings, black mastic, vinyl flooring, drywall and joint compound can bring survey and abatement requirements.",
        sourceUrl:
          "https://attachments.lagunawoodsvillage.com/wp-content/uploads/2021/06/17151319/Manor-Alterations-FAQ.pdf",
        sourceLabel: "Laguna Woods Village, Manor Alterations FAQ",
      },
      {
        text: "Fire and emergency medical service comes from the Orange County Fire Authority under a joint powers agreement, from the existing station on Paseo de Valencia. In a notice the city posted on July 22, 2026, the authority said a permanent Fire Station 12 off Moulton Parkway must be operating by December 31, 2029, with design in fiscal 2026-27 and construction in 2027-28; until then Engine 12 serves the city from Fire Station 19 near the Lake Forest border.",
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
    note: "The housing element names five private communities. Laguna Woods Village, the 55-and-older gated community, covers about 2.7 of the city's 3.3 square miles, and every home in it belongs to a mutual (United, Third, or the Towers of Mutual No. Fifty). San Sebastian and Whispering Fountains are age-restricted rental apartments with 134 and 140 units, and The Regency and Las Palmas are licensed residential care communities with 192 and 184. Village gate and cul-de-sac numbers are addresses, not neighborhoods.",
    sourceUrl:
      "https://www.lagunawoods.gov/wp-content/uploads/2023/08/2023-08-16-General-Plan-Housing-Element-Adopted.pdf",
  },

  water: {
    utility: "El Toro Water District",
    utilityUrl: "https://etwd.com/about-etwd/about-etwd",
    summary:
      "El Toro Water District supplies drinking water, sewer and recycled water to the whole city, plus parts of Aliso Viejo, Laguna Hills, Lake Forest and Mission Viejo. Its 2026 report, covering 2025, lists two treated surface supplies: Metropolitan Water District water averaging 236 ppm of hardness, or 14 grains per gallon (range 191 to 280 ppm), and Irvine Ranch Water District's Baker plant averaging 293 ppm, or 17 grains per gallon (range 269 to 322 ppm). Either way it is very hard. The district reports no lead or galvanized service lines. In the Village, United's Standard 27 requires approval for any softener and bars regenerative-type units.",
    sourceUrl:
      "https://etwd.com/files/Water%20Quality%20Reports/2026ETWDCCR-v8-WEB-singlepages.pdf",
  },

  permits: {
    office: "City of Laguna Woods Planning & Environmental Services Department",
    portalUrl: "https://www.lagunawoods.gov/schedule-building-inspections/",
    summary:
      "Permits come from the counter at City Hall, 24264 El Toro Road, open 7:30 a.m. to 2:30 p.m. weekdays (closed noon to 1 p.m.) and by appointment at (949) 639-0500. There is no online application; the online tool is an inspection calendar that books up to seven days ahead. Maximum plan review for a residential remodel is 5 weekdays the first time and 3 after. The city says association approvals are in addition to, and not a substitute for, city permits.",
    sourceUrl: "https://www.lagunawoods.gov/building-permitting/",
  },

  hazards: [
    {
      text: "The State Fire Marshal's map dated March 24, 2025 took effect in the city on July 18, 2025. It puts the Very High tier across the western end, the open space and neighborhoods backing onto Laguna Coast Wilderness Park, with narrow High and Moderate bands just east and the rest unzoned. The city's zone page has a locator by building number.",
      sourceUrl: "https://www.lagunawoods.gov/fire-hazard-severity-zones/",
      sourceLabel: "City of Laguna Woods, Fire Hazard Severity Zones",
    },
    {
      text: "The 1993 Laguna Fire burned 16,682 acres, much of it near the city's western boundary, and brought heavy smoke but no burning or evacuations here. The safety element records one wildfire in the city from 2003 to 2012, a half-acre fire on Avenida Majorca in 2005, and counted 2,564 dwelling units inside the zones the council designated in 2012.",
      sourceUrl:
        "https://www.lagunawoods.gov/wp-content/uploads/2015/06/Safety-Element-2014-04-16.pdf",
      sourceLabel: "City of Laguna Woods, General Plan Safety Element (2014)",
    },
    {
      text: "FEMA special flood hazard areas cover about 26 acres. The December 1997 storm did an estimated $700,000 of damage inside the Village and displaced dozens of residents, and the January 2010 storms undermined part of El Toro Road and flooded City Hall. Aliso Creek crosses the Village under the Avenida Sevilla bridge, and the city joined the National Flood Insurance Program in 2004.",
      sourceUrl:
        "https://www.lagunawoods.gov/wp-content/uploads/2015/06/Safety-Element-2014-04-16.pdf",
      sourceLabel: "City of Laguna Woods, General Plan Safety Element (2014)",
    },
    {
      text: "No Alquist-Priolo fault zone crosses the city, but the state considers about 256 acres prone to liquefaction and 77 acres to earthquake-induced landslides. In 2004 a roughly 400-foot slope between Calle Sonora, a private Village road, and the Home Depot center east of El Toro Road failed from soil saturation, the most significant slide in city records, affecting an estimated 588 residents.",
      sourceUrl:
        "https://www.lagunawoods.gov/wp-content/uploads/2015/06/Safety-Element-2014-04-16.pdf",
      sourceLabel: "City of Laguna Woods, General Plan Safety Element (2014)",
    },
    {
      text: "The safety element rates energy shortages a significant risk here: Southern California Edison supplies all of the city's power, and outages that stop home medical devices such as oxygen machines are a particular concern. It rates extreme heat a moderate risk for people with chronic illness or limited air conditioning and commits the city to a cooling center.",
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
        "Imported water at 14 to 17 grains per gallon wears tanks, and every swap here needs a city permit.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "Original manors may still heat with radiant ceilings, and a new system needs mutual consent first.",
    },
    {
      href: "/guides/bathroom-remodel-cost",
      title: "Bathroom remodel cost",
      blurb:
        "Retiling a manor shower can expose asbestos-era materials, so budget for a survey before demolition.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Air conditioner service before the heat, and clear slope drains before the winter storms.",
    },
  ],

  neighbors: ["laguna-hills", "aliso-viejo", "laguna-beach"],

  faq: [
    {
      q: "What does a water heater or reroof permit cost in Laguna Woods?",
      a: "The city fee schedule lists $106 for a water heater change-out and $178 for the first 1,000 square feet of tile or single-ply reroof, or $215 for other materials, each rising a dollar on October 19, 2026. In the Village a failed water heater may be replaced immediately as an emergency, with a mutual consent (United) or a like-for-equivalent form (Third) due the next business day; Third's form says the city permit is still required.",
    },
    {
      q: "Do I need an asbestos survey before remodeling a manor?",
      a: "Plan on it. The city's Rule 1403 sheet says state and air district rules generally require a California certified asbestos consultant to survey before any demolition or renovation, that removing even one two-by-four from a load-bearing wall counts as demolition and adds a 15-day air district notice, and that the city cannot waive this. Any asbestos found must be removed by a certified asbestos contractor, with proof shown before the city inspects.",
    },
  ],

  updated: "2026-09-20",
};
