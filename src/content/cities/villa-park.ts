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
    "Villa Park exists because citrus ranchers incorporated it in 1962 to keep the eastward-moving City of Orange from rezoning their groves, and the city's own history calls half-acre zoning their enduring legacy. The result is 2.1 square miles almost completely encircled by Orange, zoned for single-family houses apart from one shopping center that also holds City Hall, with about 95 percent of homes detached and about half of them built in the 1970s. Those same ranchers set up the Serrano Water District, which still supplies the water, and its 2025 report shows that water at about 343 ppm of hardness, roughly 20 grains per gallon.",
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
        text: "Villa Park's median year built is 1974. Of about 1,971 housing units, roughly 49 percent went up in the 1970s and 24 percent in the 1960s, while about 8 percent predate 1960 and only about 4 percent date from 2000 or later. About 95 percent of units are detached single-family houses. The city is small enough that these survey shares carry wide margins, but the picture is clear: a typical house here is about 50 years old, the age where the second roof, the original drain lines, the electrical panel and the first windows all come due.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0682744",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The city's history page says the area was settled around 1860 and was first called Mountain View; the name Villa Park came with the post office, because a Mountain View already existed in northern California. It grew grapes, then walnuts, then apricots, and finally citrus, which the city says was the major crop for about 60 years. The citrus ranchers organized the 1962 incorporation and left their names on the streets: Brewer, Nichols, Collins, Wulff, Durfee and others. The packing house that was the local landmark was torn down in 1983.",
        sourceUrl: "https://villapark.org/About-Us/History",
        sourceLabel: "City of Villa Park, history",
      },
      {
        text: "The general plan's Land Use Element counts about 1,346 acres in the city and puts 87 percent of them in the estate category of 1.75 homes per acre, with 11.55 acres of commercial land at the Towne Centre. It describes Villa Park as completely encircled by the City of Orange except for a small county area along Santiago Creek, where former sand and gravel pits, some as much as 500 feet deep, became flood control and water conservation basins. A lot this size means more of everything outside the walls: longer water and sewer runs, more irrigation, more fence and more trees to trim.",
        sourceUrl:
          "https://villapark.org/Portals/0/Documents/Departments/Planning/General%20Plan/Land%20Use%20Element/II.%20Land%20Use%20Element.pdf",
        sourceLabel: "City of Villa Park General Plan, Land Use Element",
      },
      {
        text: "The city's zoning page says the minimum net lot area is 20,000 square feet throughout most of Villa Park, and municipal code section 23-6.7 requires every newly created lot in the E-4 estate zone to be at least that size. The same page warns that owners often draw up a house plan first and find out later that it does not meet the zoning requirements, so read the development standards before paying for plans for an addition or a second unit.",
        sourceUrl: "https://villapark.org/Departments/Planning/Zoning-Code",
        sourceLabel: "City of Villa Park Planning, zoning code page",
      },
      {
        text: "Villa Park owns its sewer collection system, and the city's 2022 Housing Element says it was built primarily in the 1960s and 1970s: about 29 miles of mains, some shared with the City of Orange, with treatment by the Orange County Sanitation District. Not every lot is connected. The Housing Element estimates about 26 operating septic tank systems remain in the city, and the hazard plan puts the figure at about 10. If you are buying, find out which one the house has, and on a sewered lot assume the line to the street is as old as the house.",
        sourceUrl:
          "https://villapark.org/Portals/0/Documents/Departments/Planning/Housing%20Element/Adopted%20Housing%20Element/Villa%20Park%202021%20Housing%20Element_2022-06-28_adopted.pdf",
        sourceLabel:
          "City of Villa Park, 2021-2029 Housing Element (adopted June 28, 2022)",
      },
      {
        text: "Work hours are tight. The Building and Safety page allows construction Monday through Friday from 7 a.m. to 8 p.m. and Saturday from 8 a.m. to 8 p.m., with no construction on Sundays and no work of any kind on federal holidays. The municipal code also puts a clock on the job: section 9-2.7 gives a permitted project up to 5,000 square feet 12 months to finish, 18 months up to 10,000 square feet and 24 months beyond that. Put both in the contract schedule before work starts.",
        sourceUrl: "https://villapark.org/Departments/Building-and-Safety",
        sourceLabel:
          "City of Villa Park Building and Safety, and municipal code section 9-2.7",
      },
    ],
  },

  neighborhoods: {
    names: ["Villa Park Towne Centre", "The Orchards"],
    note: "Villa Park does not divide itself into named districts, so this list is short on purpose. The Towne Centre on Santiago Boulevard is the one commercial block: the Land Use Element says it holds the shops, City Hall, the Villa Park branch of the county library and a post office contract station. The Orchards is the one named development in the city's Housing Element, a 32-home planned community recorded as Tract 13942. The same document says the northerly and easterly portions of the city are zoned entirely for 20,000-square-foot estate lots, with a transition band of 8,000 and 12,000 square foot lots along the westerly border. Other tract names appear on real-estate pages, but we could not trace them to a city document, so they are not listed.",
    sourceUrl:
      "https://villapark.org/Portals/0/Documents/Departments/Planning/Housing%20Element/Adopted%20Housing%20Element/Villa%20Park%202021%20Housing%20Element_2022-06-28_adopted.pdf",
  },

  water: {
    utility: "Serrano Water District",
    utilityUrl: "https://www.serranowater.org/",
    summary:
      "Water comes from the Serrano Water District, not from the city. The district says it is an independent special district serving Villa Park and a small part of Orange: about 6,500 people, 43 miles of pipe, two wells fitted with PFAS filtration and two reservoirs. Its report for 2025 says the supply is a blend of local surface water and imported Metropolitan water held in Santiago Reservoir (Irvine Lake), treated by Irvine Ranch Water District, plus groundwater from the basin the Orange County Water District manages. The district's history page says it owned a quarter of Irvine Lake for over 90 years and transferred that share to Irvine Ranch Water District on January 15, 2025. Both sources are very hard: the report shows the groundwater averaging 343 ppm of hardness, with a range of 333 to 365 ppm (most recent sampling 2024), and the treated lake water averaging 342 ppm, with a range of 330 to 354 ppm (tested 2025). By conversion that is about 20 grains per gallon either way, so scale in water heaters, fixtures and dishwashers is the everyday result. The report also says the district found no lead service lines in its inventory.",
    sourceUrl:
      "https://www.serranowater.org/files/bf77eda98/SWD+2025+Water+Quality+Report_CCR.pdf",
  },

  permits: {
    office: "City of Villa Park Building and Safety",
    portalUrl: "https://villapark.portal.iworq.net/portalhome/villapark",
    summary:
      "Villa Park's adopted hazard plan says the city runs on four full-time and three part-time employees and contracts out most services. Building is one of them: the Building and Safety page says the city contracts with VCA Code. Applications, plan check submittals (PDF only) and inspection requests go through the city's online portal, and staff will help with an application at City Hall during counter hours. Those hours are short: Monday, Wednesday and Friday from 8 to 11 a.m. at 17855 Santiago Boulevard, phone (714) 998-1500. The page and the portal both say inspections happen only on those three days from 11 a.m. to 2 p.m. with at least 24 hours of notice; a sidebar on the same page lists 9 a.m. to noon, so confirm the window when you book. The city's one-page list of work that needs a permit includes reroofs, repipes, water heater and water softener change-outs, window and door change-outs, electrical panel upgrades, drywall replacement, stucco and siding, pools and spas, and block walls over 6 feet. Applications submitted on or after January 1, 2026 fall under the 2025 building code.",
    sourceUrl: "https://villapark.org/Departments/Building-and-Safety",
  },

  hazards: [
    {
      text: "The State Fire Marshal's Local Responsibility Area map for Villa Park, dated March 24, 2025 and hosted on the city's site, zones only the eastern edge of the city. East of Loma Street, from the northern tip down to about Taft Avenue, it shows a Moderate band, then High, then a few patches of Very High along the boundary, where the hills in Orange beyond the line are solid Very High. The rest of the city, including the Towne Centre, is unzoned. The zone is set by parcel and drives defensible space rules and sale disclosures, so check your own address.",
      sourceUrl:
        "https://villapark.org/Portals/0/FHSZ_City_LRA_11x17_VillaPark.pdf",
      sourceLabel:
        "State Fire Marshal, fire hazard severity zones in Villa Park (March 24, 2025), on the city's site",
    },
    {
      text: "Fire has reached Villa Park before. The city's adopted hazard plan says the Stagecoach Fire, also called the Villa Park Fire, destroyed two homes and damaged 29 others in Anaheim Hills and Villa Park in October 1993, and that the Gypsum Canyon Fire of October 1982 burned 17,000 acres and destroyed 14 homes in Villa Park, Orange and Anaheim Hills. It ranks wildfire first among the city's hazards and warns that a wind-driven fire in the hills toward Orange and Anaheim Hills would spread easily into Villa Park during a Santa Ana wind event.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Engineering-And-Public-Works/Villa%20Park%20LHMP%20Sec%201-7%20FINAL.pdf",
      sourceLabel:
        "City of Villa Park, Local Hazard Mitigation Plan (approved June 22, 2021)",
    },
    {
      text: "The most recent close call was the Canyon Fire 2 of October 9, 2017. The Orange County Fire Authority's after action report says it started in Anaheim in strong Santa Ana winds, burned 9,217 acres, destroyed 14 homes and damaged 44 others, with evacuation orders for parts of Anaheim Hills, Orange and North Tustin. The report does not list Villa Park among the communities evacuated or damaged. The city's draft 2026 hazard plan update says the fire threatened Villa Park but was diverted when the winds shifted southeast.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR_2017_Canyon_2_Fire.pdf",
      sourceLabel:
        "Orange County Fire Authority, Canyon 2 Fire after action report",
    },
    {
      text: "Fire protection is contracted. The city's Safety Element says the Orange County Fire Authority serves Villa Park as a member agency and that the nearest station is Station 23, on the south side of Villa Park Road east of Hewes Street, with providers reporting arrival within 7 minutes 20 seconds of the call 80 percent of the time. The same element credits lower fire risk partly to a requirement that roofing materials carry a minimum Class A rating. On a reroof bid, ask for the product's Class A rating in writing.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Planning/General%20Plan/Safety%20Element/VI.%20Safety%20Element.pdf",
      sourceLabel:
        "City of Villa Park General Plan, Safety Element (Resolution 2019-3467)",
    },
    {
      text: "Villa Park Dam sits on Santiago Creek just upstream. The state's September 2025 dam list shows a County of Orange earth dam built in 1963, 118 feet high, holding 15,600 acre-feet, in satisfactory condition and rated extremely high for downstream hazard, a label the city's Safety Element explains is based only on what lies downstream, not on the dam's condition. The Safety Element says there is normally no water behind it. The same state list rates the older Santiago Creek Dam at Irvine Lake, farther upstream, as poor with a reservoir restriction in place.",
      sourceUrl:
        "https://water.ca.gov/-/media/DWR-Website/Web-Pages/Programs/All-Programs/Division-of-Safety-of-Dams/Files/Publications/Annual-Data-Release/2025/DAMS-WITHIN-JURISDICTION-OF-THE-STATE-OF-CALIFORNIA-DAMS-LISTED-ALPHABETICALLY-BY-COUNTY-SEPT-2025.pdf",
      sourceLabel:
        "California Division of Safety of Dams, jurisdictional dams by county (September 2025)",
    },
    {
      text: "Part of the city is mapped flood zone. The Safety Element says Villa Park has areas FEMA designates as 100-year and 500-year flood hazard areas, and that city ordinance requires new construction or a substantial improvement inside Flood Zone AO to have its finished floor at least one foot above the 100-year storm level. Detailed maps are at City Hall and on FEMA's map service, and lenders generally require flood insurance on a mortgaged house inside the 100-year area.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Planning/General%20Plan/Safety%20Element/VI.%20Safety%20Element.pdf",
      sourceLabel:
        "City of Villa Park General Plan, Safety Element (Resolution 2019-3467)",
    },
    {
      text: "The Safety Element places Villa Park in the low foothills on the west flank of the Santa Ana Mountains and names the El Modena and Peralta Hills faults as the nearest: reverse faults about 6 miles long with no recent record of activity, which it says are not expected to generate significant earthquakes. It lists the Whittier Fault about 8.5 miles away and the Newport-Inglewood about 14. It also notes moderate slopes in the northeastern part of the city, so on a hillside lot keep swales and drain lines clear before winter.",
      sourceUrl:
        "https://villapark.org/Portals/0/Documents/Departments/Planning/General%20Plan/Safety%20Element/VI.%20Safety%20Element.pdf",
      sourceLabel:
        "City of Villa Park General Plan, Safety Element (Resolution 2019-3467)",
    },
    {
      text: "A fuel pipeline runs under one of the main streets. The city's hazard plan says a 16-inch, high-pressure (1,600 pounds per square inch) petroleum pipeline managed by Kinder Morgan runs under Wanda Road, and that third-party digging is the leading cause of pipeline accidents. The plan says the law requires a call to 811, which reaches DigAlert in Southern California, at least two working days before an excavation project. That applies to a fence post or a tree as much as to a trench.",
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
        "Typical range and when a repair is smarter, on Serrano water at about 20 grains per gallon, in a city that permits every change-out.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, where reroofs need a permit, the Safety Element calls for Class A roofing and half the houses date from the 1970s.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "What an upgrade runs when the panel is original to a house from the 1960s or 1970s, about three of every four homes here.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including brush and gutters before Santa Ana season on the east edge of the city.",
    },
  ],

  neighbors: ["orange", "anaheim"],

  faq: [
    {
      q: "Is Villa Park's water hard?",
      a: "Yes, very. The Serrano Water District's report for 2025 shows its groundwater averaging 343 ppm of hardness and the treated Irvine Lake water averaging 342 ppm, about 20 grains per gallon by conversion. Both sources test almost the same, so there is no softer side of town. Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour.",
    },
    {
      q: "Who provides fire and police service in Villa Park?",
      a: "Both are contracted. The city's Public Safety page says the Orange County Fire Authority serves Villa Park, and the fire authority's own member cities list includes it; the Safety Element names Station 23 on Villa Park Road east of Hewes Street as the nearest station. Police service comes from the Orange County Sheriff's Department under contract.",
    },
    {
      q: "Do I need a permit to replace a water heater or reroof in Villa Park?",
      a: "Yes to both. The city's list of work that requires a permit names reroofs and water heater and water softener change-outs, along with repipes, window and door change-outs and electrical panel upgrades. Applications go through the city's online portal, the counter at 17855 Santiago Boulevard is open Monday, Wednesday and Friday from 8 to 11 a.m., and inspections run on those same three days. A licensed plumber or roofer normally pulls the permit as part of the job.",
    },
    {
      q: "Is my Villa Park home in a fire hazard severity zone?",
      a: "Most are not, but the east edge is. The State Fire Marshal's March 24, 2025 map for Villa Park shows Moderate, High and a few Very High patches east of Loma Street, from the northern tip of the city down to about Taft Avenue, and leaves the rest unzoned. The hills across the line in Orange are Very High. The zone is set by parcel, so look up your own address on the state map.",
    },
    {
      q: "Is Villa Park at risk if Villa Park Dam fails?",
      a: "The city's hazard plan says not from that dam alone. It describes the reservoir as normally empty, says the dam sits in a canyon with homes above the canyon walls, and concludes there is not enough water behind it to cause loss of life or major property damage in Villa Park. The state lists the dam as built in 1963, in satisfactory condition and rated extremely high for downstream hazard, a label based on what lies downstream rather than on the dam itself.",
    },
  ],

  updated: "2026-09-20",
};
