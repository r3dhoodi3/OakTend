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
    "Aliso Viejo is the last piece of the old Moulton Ranch: the city's history says the Mission Viejo Company bought the final 6,600 acres in 1976, the first homes went on sale in March 1982, and cityhood only arrived on July 1, 2001. It filled in fast and close together, so about 51 percent of the homes date from the 1990s alone, the median build year is 1995 and only about 36 percent are detached houses. Two things follow for upkeep. A master association, the Aliso Viejo Community Association, maintains most slopes and enforces the rules on paint colors and property upkeep while the city issues the permits, and the western and southern edges, where the streets meet Aliso and Wood Canyons Wilderness Park, sit in the State Fire Marshal's Very High fire hazard tier.",
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
        text: "Aliso Viejo's median year built is 1995. Of about 20,507 housing units, roughly 51.2 percent went up in the 1990s, 19.2 percent in the 1980s, 15.5 percent in the 2000s and 8.5 percent in the 2010s, with only about 5.6 percent estimated as older than 1980. The same survey's structure table counts about 36.4 percent as detached houses, 24.5 percent as attached single-family homes and about 38 percent as units in buildings of two or more. These are survey estimates with margins of error, but the shape is clear: most homes here are about 25 to 35 years old, the age when the first roof and the original furnace and air conditioner come due, and in an attached home the association's documents decide which of those are yours.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0600947",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The city's own history says Aliso Viejo was part of the 22,000-acre Moulton Ranch, that the Mission Viejo Company bought the last 6,600 acres in 1976 for a new master-planned community, and that the county approved the master plan in 1979. The first residential units were offered for sale by March 1982 and the first residents arrived about eight months later. Voters approved cityhood on March 6, 2001, with 93.3 percent in favor by the city's count, and Aliso Viejo incorporated on July 1, 2001 as Orange County's 34th city.",
        sourceUrl: "https://avcity.org/303/About-Aliso-Viejo",
        sourceLabel: "City of Aliso Viejo, About Aliso Viejo",
      },
      {
        text: "Aliso Viejo is both a city and a master-planned community, and the city's website spells out who does what. The city handles building and safety, fire safety, planning, police protection and public works. The Aliso Viejo Community Association, a master homeowners association, is responsible for common area maintenance including parks, greenbelts, parkways and slopes, and for enforcing the covenants, conditions and restrictions, which the city says cover things such as paint colors, property maintenance and many aesthetic issues. Before repainting or reroofing, read your CC&Rs as well as the city's permit rules.",
        sourceUrl:
          "https://avcity.org/201/Role-of-City-Aliso-Viejo-Community-Assoc",
        sourceLabel:
          "City of Aliso Viejo, Role of City and Aliso Viejo Community Association",
      },
      {
        text: "The Building Department's residential submittal checklist, updated December 31, 2025, says expansive soils are common in the City of Aliso Viejo and asks for footings at least 24 inches below undisturbed soil. It also says high levels of sulfates are common in the soils, so concrete in contact with soil must be 4,500 psi with Type V cement and a water-cement ratio of 0.45. For an owner, that is a reason to keep irrigation and roof runoff away from the slab and to take new cracks seriously.",
        sourceUrl:
          "https://avcity.org/DocumentCenter/View/238/Residential-Submittal-Checklist-PDF",
        sourceLabel:
          "City of Aliso Viejo Building Department, Residential Submittal Checklist",
      },
      {
        text: "Windows are a common first big project on a 1990s house, and the city's handout is blunt: all door and window replacements require a building permit, applied for through the online portal under the residential windows and doors application. It warns that a retrofit window set inside the old frame shrinks the opening by about 7 inches each way, which matters for bedroom escape windows, and it states in capital letters that homes in the High and Very High fire severity zones are required to have tempered windows.",
        sourceUrl:
          "https://avcity.org/DocumentCenter/View/246/Door-and-Window-Replacements-PDF",
        sourceLabel:
          "City of Aliso Viejo Building Department, Door and Window Replacements handout",
      },
      {
        text: "Moulton Niguel Water District's 2025 report says the hardness found in its water averaged 15.45 grains per gallon. The supply is all imported through the Metropolitan Water District and is a blend from two treatment plants, one averaging 236 ppm, or 13.8 grains per gallon, and the other 293 ppm, or 17.1 grains per gallon; the full ranges are in the water section of this page. That is hard water: flush a tank water heater yearly and descale a tankless unit on the manufacturer's schedule.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010073&Year=2025&isCert=false",
        sourceLabel:
          "Moulton Niguel Water District 2025 water quality report, State Water Board copy",
      },
      {
        text: "Aliso Viejo does not run its own fire department. The city's Fire Authority page says fire protection and emergency services are provided by the Orange County Fire Authority, and that Station 57, at 57 Journey, is home to five firefighters including two paramedics and also serves as a division headquarters. A separate city page notes that most improvements to residential sites require some level of fire authority review.",
        sourceUrl: "https://avcity.org/198/Fire-Authority",
        sourceLabel: "City of Aliso Viejo, Fire Authority",
      },
    ],
  },

  neighborhoods: {
    names: ["Glenwood", "Vantis", "Ventana Ridge", "Via Iglesia"],
    note: "The city does not publish a neighborhood list, so these are the residential names that appear in its own documents. Glenwood, Vantis and Ventana Ridge are specific plans on the city's General Plan page: the Glenwood plan describes a recreation-oriented community around an 18-hole golf course with housing not to exceed 502 homes, the Vantis plan covers townhomes and multi-family housing along Enterprise and Aliso Viejo Parkway, and Ventana Ridge is titled a residential specific plan. Via Iglesia is the area the city's utilities directory singles out as served by El Toro Water District. Individual tract and association names turned up only on real-estate pages and are left out here.",
    sourceUrl: "https://avcity.org/301/General-Plan",
  },

  water: {
    utility: "Moulton Niguel Water District (El Toro Water District in the Via Iglesia area)",
    utilityUrl: "https://www.mnwd.com/",
    summary:
      "The city's utilities directory lists Moulton Niguel Water District for all areas except Via Iglesia and El Toro Water District for the Via Iglesia area only, and the city's 2026 Safety Element says the same. Moulton Niguel's 2025 report says it relies on imported water from the Metropolitan Water District, drawn from the Colorado River and the State Water Project, treated at the Diemer plant in Yorba Linda and the Baker plant in Lake Forest and delivered as a blend. Its 2025 hardness rows: Diemer water averaged 236 ppm, 13.8 grains per gallon, with a range of 191 to 280 ppm, Baker water averaged 293 ppm, 17.1 grains per gallon, with a range of 269 to 322 ppm, and the district puts the average found in its water at 15.45 grains per gallon. El Toro's 2026 Water Quality Report, covering 2025, lists the same two sources at 236 ppm, or 14 grains, and 293 ppm, or 17 grains. Either way the water is hard.",
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
      "Building and Safety is at City Hall, 12 Journey, Suite 100, phone 949-425-2540. The city's handouts send permit applications through its online Customer Self-Service portal, which also handles inspection requests and permit history. Counter hours are Monday through Friday, 8:00 a.m. to 1:00 p.m., with last check-in at 12:30 p.m., and City Hall is closed on alternate Fridays. Inspections run Monday through Friday, and a request made before 4 p.m. is scheduled for the next business day. Construction is not allowed on Sundays or federal holidays. If you live in an association, its approval is a separate step from the city permit.",
    sourceUrl: "https://avcity.org/154/Building-Safety",
  },

  hazards: [
    {
      text: "The fire hazard map the city publishes, identified by the State Fire Marshal on March 24, 2025, shows the Very High tier running the length of the city's western side and wrapping around the south end, next to the wilderness park and the state-zoned open land beyond it. A band of High and then Moderate follows just inside it, and the rest of the city to the east is unzoned. The city's 2026 Safety Element says the City Council adopted these maps by ordinance on May 21, 2025. The city's GIS address lookup and the Cal Fire viewer are both linked from the Building and Safety page, so check your own lot.",
      sourceUrl:
        "https://avcity.org/DocumentCenter/View/4207/FHSZ_City_LRA_11x17_AlisoViejo",
      sourceLabel:
        "Cal Fire Fire Hazard Severity Zones map for Aliso Viejo, published by the city",
    },
    {
      text: "The canyon next door does burn. The city's 2024 hazard plan lists the Aliso Fire of June 2, 2018, which broke out along a trail in the canyon near Soka University, prompted evacuations in Aliso Viejo and Laguna Beach and ended with no injuries or structural damage; Cal Fire's incident page puts it at 175 acres. The plan also lists the May 11, 2022 Coastal Fire, which started in Aliso and Wood Canyons Wilderness Park. The Orange County Fire Authority's after action report counts 202.10 acres, none of them inside Aliso Viejo, and 20 homes destroyed in Laguna Niguel. The plan's own summary is that major wildfires have affected the city about once every five years since 2001.",
      sourceUrl:
        "https://avcity.org/DocumentCenter/View/3780/Local-Hazard-Mitigation-Plan-LHMP-PDF",
      sourceLabel: "City of Aliso Viejo 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "The city's hazard plan calls land sliding and debris flows the dominant geologic hazard risks in Aliso Viejo, because the hills sit on shales and siltstones that do not hold together well when wet. It says most developed land was mass graded, with potential slide areas stabilized by removal and engineered fill, and that some slopes are steeper than 30 percent. It records one local failure: on February 25, 2005 the Hollyleaf slope suddenly collapsed, leaving a gap of 17 by 70 feet a few feet from two homes, on a slope the community association was responsible for maintaining. If your lot backs onto a slope, find out who owns it and keep its drains clear.",
      sourceUrl:
        "https://avcity.org/DocumentCenter/View/3780/Local-Hazard-Mitigation-Plan-LHMP-PDF",
      sourceLabel: "City of Aliso Viejo 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "The Safety Element the City Council adopted on March 4, 2026 says Aliso Viejo has no identified active faults and no Alquist-Priolo zones, is not in a mapped tsunami zone and is not within any dam inundation zone. Shaking is the real earthquake risk: it puts the closest fault, the San Joaquin Hills, about 3.3 miles away. It places liquefaction zones along the western border following El Toro Road and along the Aliso Creek watershed on the east, largely in open space and parks.",
      sourceUrl: "https://avcity.org/DocumentCenter/View/395/Safety-Element-PDF",
      sourceLabel: "City of Aliso Viejo General Plan Safety Element, adopted March 4, 2026",
    },
    {
      text: "Flooding here follows two channels. The city's hazard plan says the FEMA 100-year and 500-year zones cover the Aliso Creek channel in the eastern part of the city, next to several parks and Aliso Niguel High School, and the Wood Canyon channel along the western border beside El Toro Road. It records 14.90 inches of rain over six days in December 2010, when the creek in Wood Canyon overflowed its banks. The plan's flood insurance table, using 2023 FEMA data, shows 21 policies in the city, one paid loss and no repetitive loss properties.",
      sourceUrl:
        "https://avcity.org/DocumentCenter/View/3780/Local-Hazard-Mitigation-Plan-LHMP-PDF",
      sourceLabel: "City of Aliso Viejo 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "Mello-Roos is part of most tax bills here. The city's finance page says the city itself has only one Mello-Roos district, Community Facilities District 2005-01, which affects a small number of properties, but that two other Mello-Roos districts affect almost all properties within the city. For its own district the city lists special tax bonds with a final maturity in 2038. The page does not name the other two, so read the line items on your county tax bill.",
      sourceUrl: "https://avcity.org/178/Mello-Roos",
      sourceLabel: "City of Aliso Viejo Financial Services, Mello-Roos",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, for a city where half the roofs went on in the 1990s and the city's checklist allows no wood shake or shingles.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair still makes sense, on imported water the district measures at 15.45 grains per gallon.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a new system runs, for the original 1990s furnaces and condensers now at the end of their service life.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month, including the slope drain checks and brush clearance a lot near the canyons needs before fall winds and winter rain.",
    },
  ],

  neighbors: ["laguna-niguel", "laguna-hills", "laguna-woods", "laguna-beach"],

  faq: [
    {
      q: "Is the water hard in Aliso Viejo?",
      a: "Yes. Moulton Niguel Water District, which the city lists for all areas except Via Iglesia, reports that the hardness found in its water averaged 15.45 grains per gallon in 2025. Its two imported sources averaged 13.8 grains from the Diemer plant and 17.1 grains from the Baker plant. El Toro Water District, which serves the Via Iglesia area, lists the same two sources at 14 and 17 grains. Flush a tank water heater once a year.",
    },
    {
      q: "Who provides fire service in Aliso Viejo?",
      a: "The Orange County Fire Authority. The city's Fire Authority page says it provides fire protection and emergency services for the city, along with fire inspections and plan review, and that Station 57 at 57 Journey houses five firefighters including two paramedics. Aliso Viejo is on the authority's own member list.",
    },
    {
      q: "Do I need a permit to replace a water heater in Aliso Viejo?",
      a: "Plan on one. The city's 2026-27 building fee schedule lists a water heater and a tankless water heater as plumbing permit items, and notes that starting work before obtaining a permit can double the fees. The city's Water Heater Installation handout covers what the inspector looks for: seismic straps in the top and bottom thirds, a relief valve drained to the outside and an expansion tank on a closed system. The fee schedule also waives 25 percent of building permit fees for a whole-house gas tankless unit. A licensed plumber normally pulls the permit through the online portal.",
    },
    {
      q: "What are the roofing rules for an addition or a new roof in Aliso Viejo?",
      a: "The city's residential submittal checklist says Class A roofing is required on all additions, that if the addition is 50 percent or more of the roof the whole roof must be replaced with Class A roofing, and that no wood shake or shingles are allowed. The city does not publish a separate reroof handout, so call Building and Safety at 949-425-2540 before a straight reroof, and check your association's rules on roof material and color.",
    },
    {
      q: "Do I need HOA approval as well as a city permit in Aliso Viejo?",
      a: "Treat them as two separate approvals. The city's website says the city is responsible for building and safety while the Aliso Viejo Community Association enforces the covenants, conditions and restrictions, which address things such as paint colors, property maintenance and many aesthetic issues. Read your own documents before ordering windows, paint or a roof.",
    },
    {
      q: "Is my Aliso Viejo home in a fire hazard severity zone?",
      a: "It may be if you live on the western or southern side of the city. The State Fire Marshal's March 24, 2025 map, which the city publishes, shows Very High, High and Moderate zones along the edge next to Aliso and Wood Canyons Wilderness Park and leaves the rest of the city to the east unzoned. The Building and Safety page links the city's GIS address lookup and the Cal Fire map viewer. Zone status matters in practice: the city's window handout requires tempered windows in the High and Very High zones.",
    },
  ],

  updated: "2026-09-20",
};
