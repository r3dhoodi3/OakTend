import type { CityContent } from "./types";

// Villa Park. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a 2.1 square mile city
// that citrus ranchers incorporated in 1962 to keep their half-acre zoning,
// almost completely encircled by the City of Orange, about 95 percent detached
// houses, about half built in the 1970s. It contracts out nearly everything a
// homeowner deals with: building (VCA Code), planning, engineering, police
// (the Sheriff) and fire. The building counter is open three mornings a week.
//
// FIRE SERVICE. The Orange County Fire Authority serves Villa Park: confirmed
// on the city's Public Safety page, the member cities list on ocfa.org and in
// municipal code section 11-1.2. The Station 23 location is from the city's
// Safety Element; the station page on ocfa.org loads by script and was unread.
//
// WATER NUMBERS are from the Serrano Water District report for reporting year
// 2025 on the district's own site. It prints hardness in ppm only; "about 20
// grains" is our conversion (ppm divided by 17.1). The lead that Serrano
// co-owns Irvine Lake is stale: the district's history page says it transferred
// its 25 percent share to Irvine Ranch Water District on January 15, 2025, and
// the state's September 2025 dam list shows Irvine Ranch as owner.
//
// TWO HAZARD PLANS. The adopted plan was approved by the City Council on June
// 22, 2021. A draft update dated January 29, 2026 is also on the city site.
// Facts in both are cited to the adopted plan; the Canyon Fire 2 sentence is
// only in the draft and is labeled as such. Both plans contradict themselves on
// Villa Park Dam (1963 on one page, 1956 on another), so the dam numbers come
// from the state dam list and the Safety Element, which agree on 1963. The
// Safety and Land Use Element PDFs are scans and were read as page images.
//
// LEFT OUT ON PURPOSE. "Orange County's smallest city" and "lowest crime rate
// in the county" (the city's claims, untested superlatives), the 42-acre Very
// High figure in the 2019 Safety Element (it describes the old map), the hazard
// plans' dollar loss estimates and their line that most homes lie in high fire
// hazard zones (the 2025 state map does not show that), their "2019 La Habra
// earthquake" (it was 2014), horse keeping, pools, climate normals (the plan's
// rainfall sentence is garbled), and tract names found only on real-estate
// pages.

export const villaPark: CityContent = {
  name: "Villa Park",
  slug: "villa-park",
  intro:
    "Villa Park exists because citrus ranchers incorporated it in 1962 to keep the City of Orange from rezoning their groves, and the city's own history calls half-acre zoning their enduring legacy. Today it is 2.1 square miles almost completely encircled by Orange, about 95 percent detached houses, roughly half built in the 1970s. The ranchers' Serrano Water District still supplies the water, at about 20 grains per gallon of hardness.",
  metaDescription:
    "Villa Park is 2.1 square miles of half-acre lots, half built in the 1970s: very hard Serrano water, a three-morning permit counter, east-edge fire zones.",
  metaTitle: "Villa Park, CA homes: half-acre lots, 1970s builds",

  population: {
    value: "About 5,748 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the city's draft 2026 hazard plan cites a 2020 Census count of 5,951",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0682744",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "foothill",
    medianYearBuilt: "1974",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0682744",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 1,971 housing units, roughly 49 percent went up in the 1970s and 24 percent in the 1960s, while about 8 percent predate 1960 and about 4 percent date from 2000 or later. About 95 percent are detached single-family houses.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0682744",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "Settled around 1860 as Mountain View, the town took the name Villa Park with its post office because a Mountain View already existed up north. It grew grapes, walnuts and apricots, then citrus for about 60 years, and the ranchers left their names on the streets: Brewer, Nichols, Collins, Wulff, Durfee and others. The packing house landmark came down in 1983.",
        sourceUrl: "https://villapark.org/About-Us/History",
        sourceLabel: "City of Villa Park, history",
      },
      {
        text: "The Land Use Element puts 87 percent of the city's roughly 1,346 acres in the estate category of 1.75 homes per acre, with 11.55 acres of commercial land at the Towne Centre. In the small county area along Santiago Creek, the only border not shared with Orange, former sand and gravel pits up to 500 feet deep became flood control and water conservation basins.",
        sourceUrl:
          "https://villapark.org/Portals/0/Documents/Departments/Planning/General%20Plan/Land%20Use%20Element/II.%20Land%20Use%20Element.pdf",
        sourceLabel: "City of Villa Park General Plan, Land Use Element",
      },
      {
        text: "Most of Villa Park has a 20,000-square-foot minimum lot, and municipal code section 23-6.7 requires every new E-4 estate lot to be at least that size. The city's zoning page warns that owners often draw a house plan first and learn later it breaks the zoning, so read the standards before paying for plans for an addition or second unit.",
        sourceUrl: "https://villapark.org/Departments/Planning/Zoning-Code",
        sourceLabel: "City of Villa Park Planning, zoning code page",
      },
      {
        text: "The city owns its sewer system, about 29 miles of mains built mostly in the 1960s and 1970s, some shared with Orange, with treatment by the Orange County Sanitation District. Not every lot is connected: the Housing Element estimates about 26 septic systems still operate, and the hazard plan puts it at about 10.",
        sourceUrl:
          "https://villapark.org/Portals/0/Documents/Departments/Planning/Housing%20Element/Adopted%20Housing%20Element/Villa%20Park%202021%20Housing%20Element_2022-06-28_adopted.pdf",
        sourceLabel:
          "City of Villa Park, 2021-2029 Housing Element (adopted June 28, 2022)",
      },
      {
        text: "Construction is allowed 7 a.m. to 8 p.m. weekdays and 8 a.m. to 8 p.m. Saturdays, never on Sundays or federal holidays. Municipal code section 9-2.7 also sets deadlines: 12 months to finish a permitted project up to 5,000 square feet, 18 months up to 10,000 and 24 months beyond.",
        sourceUrl: "https://villapark.org/Departments/Building-and-Safety",
        sourceLabel:
          "City of Villa Park Building and Safety, and municipal code section 9-2.7",
      },
    ],
  },

  neighborhoods: {
    names: ["Villa Park Towne Centre", "The Orchards"],
    note: "The city has no named districts. The Towne Centre on Santiago Boulevard is the one commercial block, holding the shops, City Hall, the county library branch and a post office contract station. The Orchards is a 32-home planned community, Tract 13942. The north and east of the city are zoned entirely for 20,000-square-foot lots, with a band of 8,000 and 12,000 square foot lots along the western border.",
    sourceUrl:
      "https://villapark.org/Portals/0/Documents/Departments/Planning/Housing%20Element/Adopted%20Housing%20Element/Villa%20Park%202021%20Housing%20Element_2022-06-28_adopted.pdf",
  },

  water: {
    utility: "Serrano Water District",
    utilityUrl: "https://www.serranowater.org/",
    summary:
      "The Serrano Water District, an independent special district, serves about 6,500 people in Villa Park and a small part of Orange with 43 miles of pipe, two wells with PFAS filtration and two reservoirs. Supply blends basin groundwater with local and imported water from Irvine Lake, treated by Irvine Ranch Water District; the district owned a quarter of the lake for over 90 years before transferring it on January 15, 2025. Both sources are very hard: groundwater averaged 343 ppm (range 333 to 365, sampled 2024) and lake water 342 ppm (330 to 354, tested 2025), about 20 grains per gallon either way. The district found no lead service lines.",
    sourceUrl:
      "https://www.serranowater.org/files/bf77eda98/SWD+2025+Water+Quality+Report_CCR.pdf",
  },

  permits: {
    office: "City of Villa Park Building and Safety",
    portalUrl: "https://villapark.portal.iworq.net/portalhome/villapark",
    summary:
      "The city runs on four full-time and three part-time employees and contracts building services to VCA Code. Applications, PDF plan check and inspection requests go through the online portal. The counter at 17855 Santiago Boulevard, (714) 998-1500, is open only Monday, Wednesday and Friday, 8 to 11 a.m., and inspections run those same days from 11 a.m. to 2 p.m. with 24 hours of notice (a sidebar lists 9 to noon, so confirm). The permit list includes reroofs, repipes, water heater and softener change-outs, window and door swaps, panel upgrades, drywall, stucco and siding, pools and block walls over 6 feet. Applications from January 1, 2026 fall under the 2025 code.",
    sourceUrl: "https://villapark.org/Departments/Building-and-Safety",
  },

  hazards: [
    {
      text: "The State Fire Marshal's March 24, 2025 map zones only the eastern edge: east of Loma Street, from the northern tip down to about Taft Avenue, a Moderate band, then High, then a few Very High patches along the boundary with the solid Very High hills in Orange. The rest of the city, including the Towne Centre, is unzoned.",
      sourceUrl:
        "https://villapark.org/Portals/0/FHSZ_City_LRA_11x17_VillaPark.pdf",
      sourceLabel:
        "State Fire Marshal, fire hazard severity zones in Villa Park (March 24, 2025), on the city's site",
    },
    {
      text: "The city's hazard plan ranks wildfire first among its hazards. The October 1993 Stagecoach Fire, also called the Villa Park Fire, destroyed two homes and damaged 29 in Anaheim Hills and Villa Park, and the October 1982 Gypsum Canyon Fire burned 17,000 acres and destroyed 14 homes in Villa Park, Orange and Anaheim Hills.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Engineering-And-Public-Works/Villa%20Park%20LHMP%20Sec%201-7%20FINAL.pdf",
      sourceLabel:
        "City of Villa Park, Local Hazard Mitigation Plan (approved June 22, 2021)",
    },
    {
      text: "The Canyon Fire 2 of October 9, 2017 started in Anaheim in Santa Ana winds and burned 9,217 acres, destroying 14 homes and damaging 44, per the fire authority's after action report, which does not list Villa Park among evacuated or damaged communities. The city's draft 2026 hazard plan says it threatened Villa Park until the winds shifted southeast.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR_2017_Canyon_2_Fire.pdf",
      sourceLabel:
        "Orange County Fire Authority, Canyon 2 Fire after action report",
    },
    {
      text: "The Safety Element names Station 23, on Villa Park Road east of Hewes Street, as the nearest fire station, arriving within 7 minutes 20 seconds of a call 80 percent of the time. It credits the city's lower fire risk partly to a minimum Class A roofing requirement.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Planning/General%20Plan/Safety%20Element/VI.%20Safety%20Element.pdf",
      sourceLabel:
        "City of Villa Park General Plan, Safety Element (Resolution 2019-3467)",
    },
    {
      text: "Villa Park Dam, on Santiago Creek just upstream, is a County of Orange earth dam built in 1963, 118 feet high and holding 15,600 acre-feet, in satisfactory condition and rated extremely high for downstream hazard. The same September 2025 state list rates the older Santiago Creek Dam at Irvine Lake, farther upstream, as poor with a reservoir restriction.",
      sourceUrl:
        "https://water.ca.gov/-/media/DWR-Website/Web-Pages/Programs/All-Programs/Division-of-Safety-of-Dams/Files/Publications/Annual-Data-Release/2025/DAMS-WITHIN-JURISDICTION-OF-THE-STATE-OF-CALIFORNIA-DAMS-LISTED-ALPHABETICALLY-BY-COUNTY-SEPT-2025.pdf",
      sourceLabel:
        "California Division of Safety of Dams, jurisdictional dams by county (September 2025)",
    },
    {
      text: "Parts of the city are FEMA 100-year and 500-year flood areas, and city ordinance requires new construction or a substantial improvement in Flood Zone AO to have its finished floor at least one foot above the 100-year storm level. Detailed maps are at City Hall.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Planning/General%20Plan/Safety%20Element/VI.%20Safety%20Element.pdf",
      sourceLabel:
        "City of Villa Park General Plan, Safety Element (Resolution 2019-3467)",
    },
    {
      text: "The nearest faults are the El Modena and Peralta Hills faults, about 6 miles long with no recent activity and not expected to generate significant earthquakes. The Whittier Fault is about 8.5 miles away and the Newport-Inglewood about 14, and the northeastern part of the city has moderate slopes.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Planning/General%20Plan/Safety%20Element/VI.%20Safety%20Element.pdf",
      sourceLabel:
        "City of Villa Park General Plan, Safety Element (Resolution 2019-3467)",
    },
    {
      text: "A 16-inch, 1,600 psi petroleum pipeline managed by Kinder Morgan runs under Wanda Road. The hazard plan says third-party digging is the leading cause of pipeline accidents and that the law requires a call to 811 at least two working days before any excavation.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Engineering-And-Public-Works/Villa%20Park%20LHMP%20Sec%201-7%20FINAL.pdf",
      sourceLabel:
        "City of Villa Park, Local Hazard Mitigation Plan (approved June 22, 2021)",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Serrano water runs about 20 grains per gallon, and every change-out here needs a permit.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Half of Villa Park's houses date from the 1970s, under a Class A roofing rule.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "About three of every four homes here have panels from the 1960s or 1970s.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Brush and gutters before Santa Ana season matter most on the zoned east edge.",
    },
  ],

  neighbors: ["orange", "anaheim"],

  faq: [
    {
      q: "Who provides fire and police service in Villa Park?",
      a: "Both are contracted: fire from the Orange County Fire Authority, which lists Villa Park as a member city, and police from the Orange County Sheriff's Department, per the city's Public Safety page.",
    },
    {
      q: "Is Villa Park at risk if Villa Park Dam fails?",
      a: "Not from that dam alone, the city's hazard plan says. The reservoir is normally empty and the dam sits in a canyon with homes above its walls, so the plan finds too little water behind it to cause loss of life or major damage in Villa Park.",
    },
  ],

  updated: "2026-09-20",
};
