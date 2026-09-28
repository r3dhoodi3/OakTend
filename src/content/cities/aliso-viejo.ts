import type { CityContent } from "./types";

// Aliso Viejo. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: the last 6,600 acres of
// the Moulton Ranch, sold from March 1982 and only a city since July 1, 2001.
// Half the homes date from the 1990s, only about a third are detached, and a
// master association (AVCA) keeps the slopes and enforces the CC&Rs while the
// city issues permits. The city's building checklist warns of expansive,
// high-sulfate soils, and the State Fire Marshal's March 24, 2025 map puts the
// edge along Aliso and Wood Canyons Wilderness Park in the Very High tier.
//
// WATER NUMBERS. Moulton Niguel's 2025 report is a scanned PDF, read from
// rendered page images of the State Water Board copy (mnwd.com blocks scripted
// requests). The city's utilities directory and 2026 Safety Element both say
// El Toro Water District serves the Via Iglesia area only; its figures are
// from its 2026 Water Quality Report (2025 data), a text PDF on etwd.com.
//
// FIRE SERVICE. Orange County Fire Authority, confirmed on the city's Fire
// Authority page and the ocfa.org member list. Two city pages disagree on how
// many cities the authority serves (18 and 23), so no count is printed.
//
// LEFT OUT ON PURPOSE. The hazard plan's Aliso Fire acreage ("over 200";
// Cal Fire says 175, used here) and its Coastal Fire damage count (12; the
// fire authority's report says 11), the $110,000 storm drain failure (the plan
// dates it 2010 in one table and 2020 in another), climate averages (the plan
// cites a commercial "best places" site), the names of the two other
// Mello-Roos districts (the city page does not name them), the association's
// architectural review steps (avca.net sits behind a captcha), municipal code
// text (codepublishing.com blocks scripted requests), any claim that a reroof
// by itself needs a permit (no city page opened says so), and tract names
// found only on real-estate pages.

export const alisoViejo: CityContent = {
  name: "Aliso Viejo",
  slug: "aliso-viejo",
  intro:
    "Aliso Viejo is the last piece of the old Moulton Ranch, sold as homes from March 1982 and a city only since July 1, 2001, so about half its housing dates from the 1990s and only about a third is detached. A master association keeps most slopes and enforces rules on paint and upkeep while the city issues permits. The western and southern edges, along Aliso and Wood Canyons Wilderness Park, sit in the State Fire Marshal's Very High fire hazard tier.",
  metaDescription:
    "Aliso Viejo homes: half built in the 1990s, only a third detached. Hard imported water, a master HOA, sulfate soils and canyon-edge fire zones, sourced.",
  metaTitle: "Aliso Viejo homes: 1990s builds, HOA, fire zones",

  population: {
    value: "About 51,113 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003; the city's 2024 hazard plan uses 51,943 from the 2017-2021 survey",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0600947",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "foothill",
    medianYearBuilt: "1995",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0600947",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 20,507 housing units, roughly 51.2 percent went up in the 1990s, 19.2 percent in the 1980s, 15.5 percent in the 2000s and 8.5 percent in the 2010s; only about 5.6 percent predate 1980. About 36.4 percent are detached houses, 24.5 percent attached single-family homes and about 38 percent units in buildings of two or more. At 25 to 35 years old, most are due for a first roof and original furnaces and air conditioners, and in an attached home the association's documents decide which of those are yours.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0600947",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "Aliso Viejo was part of the 22,000-acre Moulton Ranch. The Mission Viejo Company bought the last 6,600 acres in 1976, the county approved the master plan in 1979, and the first homes went on sale by March 1982. Voters approved cityhood on March 6, 2001 with 93.3 percent in favor, and the city incorporated on July 1, 2001 as Orange County's 34th city.",
        sourceUrl: "https://avcity.org/303/About-Aliso-Viejo",
        sourceLabel: "City of Aliso Viejo, About Aliso Viejo",
      },
      {
        text: "The city handles building and safety, fire safety, planning, police and public works. The Aliso Viejo Community Association, a master homeowners association, maintains common areas including parks, greenbelts, parkways and slopes, and enforces the CC&Rs, which the city says cover paint colors, property maintenance and many aesthetic issues. Association approval is a separate step from a city permit.",
        sourceUrl:
          "https://avcity.org/201/Role-of-City-Aliso-Viejo-Community-Assoc",
        sourceLabel:
          "City of Aliso Viejo, Role of City and Aliso Viejo Community Association",
      },
      {
        text: "The city's residential submittal checklist, updated December 31, 2025, says expansive soils are common here and asks for footings at least 24 inches below undisturbed soil. It also says high sulfate levels are common, so concrete in contact with soil must be 4,500 psi with Type V cement and a water-cement ratio of 0.45.",
        sourceUrl:
          "https://avcity.org/DocumentCenter/View/238/Residential-Submittal-Checklist-PDF",
        sourceLabel:
          "City of Aliso Viejo Building Department, Residential Submittal Checklist",
      },
      {
        text: "Every door and window replacement needs a building permit, filed on the online portal as a residential windows and doors application. The city's handout warns that a retrofit window set inside the old frame shrinks the opening by about 7 inches each way, which matters for bedroom escape windows, and requires tempered windows in the High and Very High fire severity zones.",
        sourceUrl:
          "https://avcity.org/DocumentCenter/View/246/Door-and-Window-Replacements-PDF",
        sourceLabel:
          "City of Aliso Viejo Building Department, Door and Window Replacements handout",
      },
      {
        text: "Fire protection comes from the Orange County Fire Authority. Station 57, at 57 Journey, houses five firefighters including two paramedics and serves as a division headquarters, and the city notes that most residential site improvements need some level of fire authority review.",
        sourceUrl: "https://avcity.org/198/Fire-Authority",
        sourceLabel: "City of Aliso Viejo, Fire Authority",
      },
    ],
  },

  neighborhoods: {
    names: ["Glenwood", "Vantis", "Ventana Ridge", "Via Iglesia"],
    note: "These names come from the city's own documents. Glenwood is a specific plan around an 18-hole golf course capped at 502 homes, Vantis covers townhomes and multi-family housing along Enterprise and Aliso Viejo Parkway, and Ventana Ridge is a residential specific plan. Via Iglesia is the one area the city lists as served by El Toro Water District.",
    sourceUrl: "https://avcity.org/301/General-Plan",
  },

  water: {
    utility: "Moulton Niguel Water District (El Toro Water District in the Via Iglesia area)",
    utilityUrl: "https://www.mnwd.com/",
    summary:
      "Moulton Niguel Water District serves the whole city except Via Iglesia, which El Toro Water District serves. Moulton Niguel's supply is all imported through the Metropolitan Water District from the Colorado River and the State Water Project, blended from the Diemer plant in Yorba Linda and the Baker plant in Lake Forest. In 2025, Diemer water averaged 236 ppm, 13.8 grains per gallon (range 191 to 280 ppm), Baker water 293 ppm, 17.1 grains (range 269 to 322 ppm), and the district puts its overall average at 15.45 grains per gallon. El Toro's 2026 report lists the same two sources at 14 and 17 grains.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010073&Year=2025&isCert=false",
    sourceLabel:
      "Moulton Niguel Water District 2025 water quality report, State Water Board copy",
  },

  permits: {
    office: "City of Aliso Viejo Building and Safety",
    portalUrl:
      "https://alisoviejoca-energovpub.tylerhost.net/apps/SelfService#/home",
    summary:
      "Building and Safety is at City Hall, 12 Journey, Suite 100, 949-425-2540, with applications, inspection requests and permit history on the Customer Self-Service portal. The counter is open Monday through Friday, 8:00 a.m. to 1:00 p.m. (last check-in 12:30), and City Hall closes alternate Fridays. Inspections requested before 4 p.m. are scheduled for the next business day. No construction on Sundays or federal holidays.",
    sourceUrl: "https://avcity.org/154/Building-Safety",
  },

  hazards: [
    {
      text: "The fire hazard map the city publishes, dated March 24, 2025, runs the Very High tier the length of the western side and around the south end, next to the wilderness park, with bands of High and then Moderate just inside it; the eastern part of the city is unzoned. The City Council adopted the maps by ordinance on May 21, 2025, and the Building and Safety page links a GIS address lookup.",
      sourceUrl:
        "https://avcity.org/DocumentCenter/View/4207/FHSZ_City_LRA_11x17_AlisoViejo",
      sourceLabel:
        "Cal Fire Fire Hazard Severity Zones map for Aliso Viejo, published by the city",
    },
    {
      text: "The Aliso Fire of June 2, 2018 started along a canyon trail near Soka University, burned 175 acres by Cal Fire's count and forced evacuations in Aliso Viejo and Laguna Beach without damaging structures. The May 11, 2022 Coastal Fire started in the wilderness park and burned 202.10 acres, none inside the city, destroying 20 homes in Laguna Niguel. The city's hazard plan says major wildfires have affected Aliso Viejo about once every five years since 2001.",
      sourceUrl:
        "https://avcity.org/DocumentCenter/View/3780/Local-Hazard-Mitigation-Plan-LHMP-PDF",
      sourceLabel:
        "City of Aliso Viejo 2024 Local Hazard Mitigation Plan, with Cal Fire and the Orange County Fire Authority's after action report",
    },
    {
      text: "The hazard plan calls landslides and debris flows the dominant geologic risk, because the hills are shales and siltstones that weaken when wet. Most land was mass graded with slide areas stabilized by engineered fill, and some slopes exceed 30 percent. On February 25, 2005 the association-maintained Hollyleaf slope collapsed, leaving a 17-by-70-foot gap a few feet from two homes.",
      sourceUrl:
        "https://avcity.org/DocumentCenter/View/3780/Local-Hazard-Mitigation-Plan-LHMP-PDF",
      sourceLabel: "City of Aliso Viejo 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "The Safety Element adopted March 4, 2026 finds no active faults, no Alquist-Priolo zones, no mapped tsunami zone and no dam inundation zone in the city. Shaking is the earthquake risk, with the San Joaquin Hills fault about 3.3 miles away. Liquefaction zones follow El Toro Road on the western border and the Aliso Creek watershed on the east, mostly in open space and parks.",
      sourceUrl: "https://avcity.org/DocumentCenter/View/395/Safety-Element-PDF",
      sourceLabel: "City of Aliso Viejo General Plan Safety Element, adopted March 4, 2026",
    },
    {
      text: "FEMA's 100-year and 500-year flood zones follow two channels: Aliso Creek on the east, near several parks and Aliso Niguel High School, and Wood Canyon along El Toro Road on the west. In December 2010, 14.90 inches of rain over six days pushed Wood Canyon's creek over its banks. FEMA's 2023 data shows 21 flood policies in the city, one paid loss and no repetitive loss properties.",
      sourceUrl:
        "https://avcity.org/DocumentCenter/View/3780/Local-Hazard-Mitigation-Plan-LHMP-PDF",
      sourceLabel: "City of Aliso Viejo 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "Mello-Roos is on most tax bills. The city has one district of its own, Community Facilities District 2005-01, covering a small number of properties with bonds maturing in 2038, and says two other Mello-Roos districts affect almost all properties in the city. The page does not name those two; your county tax bill lists them.",
      sourceUrl: "https://avcity.org/178/Mello-Roos",
      sourceLabel: "City of Aliso Viejo Financial Services, Mello-Roos",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Half the roofs here went on in the 1990s, and city rules allow no wood shake.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Imported water at 15.45 grains per gallon shortens tank life across the city.",
    },
    {
      href: "/guides/santa-ana-wind-wildfire-home-prep",
      title: "Santa Ana wind and wildfire prep",
      blurb:
        "For the Very High zone streets along Aliso and Wood Canyons Wilderness Park.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Includes the slope drain and brush checks a canyon-edge lot needs before fall.",
    },
  ],

  neighbors: ["laguna-niguel", "laguna-hills", "laguna-woods", "laguna-beach"],

  faq: [
    {
      q: "What does Aliso Viejo check on a water heater permit?",
      a: "The city's 2026-27 fee schedule lists tank and tankless water heaters as plumbing permit items and says starting work before the permit can double the fees; it also waives 25 percent of building permit fees for a whole-house gas tankless unit. The city's Water Heater Installation handout lists what the inspector looks for: seismic straps in the top and bottom thirds, a relief valve drained outside, and an expansion tank on a closed system.",
    },
    {
      q: "What roofing does Aliso Viejo require?",
      a: "Class A. The residential submittal checklist requires Class A roofing on all additions, requires the whole roof be replaced in Class A if the addition is 50 percent or more of the roof, and allows no wood shake or shingles. There is no separate reroof handout, so call Building and Safety at 949-425-2540 before a straight reroof.",
    },
  ],

  updated: "2026-09-20",
};
