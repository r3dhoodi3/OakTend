import type { CityContent } from "./types";

// Rancho Santa Margarita. Researched 2026-09-20 for the fourth city wave. Every
// number below was read from the source document itself, not from a search
// summary.
//
// The angle that makes this page not interchangeable: a city built almost all
// at once (first homes sold in 1986, about 86 percent of the housing from the
// 1980s and 1990s, incorporated January 1, 2000) on a mesa at the foot of the
// Santa Ana Mountains, where the State Fire Marshal's March 24, 2025 map puts
// most of the land in the Very High tier and the September 2024 Airport Fire
// forced evacuations in Robinson Ranch and Trabuco Highlands. Most of it comes
// from the city's history page, its 2025 Local Hazard Mitigation Plan (approved
// July 9, 2025, certified by FEMA August 15, 2025) and the Safety Element
// adopted the same night.
//
// FIRE SERVICE. The city contracts with the Orange County Fire Authority (city
// Fire Services page, and the member list at ocfa.org). Station 45 is in town.
//
// WATER NUMBERS. Two districts. Santa Margarita Water District figures are from
// its 2026 Water Quality Report (reporting year 2025); the smwd.com copy and
// the State Water Board portal copy are the same file, byte for byte. Trabuco
// Canyon Water District figures are from the report on tcwd.ca.gov, because the
// file under its id on the state portal is only the certification form. Both
// reports print grains per gallon themselves, so nothing here is a conversion.
//
// THE FIRE MAP has no text layer for the zones and was read as an image, so
// the description of where each tier falls is ours and kept general. The city
// page says the map had to be adopted by ordinance by July 22, 2025; we did
// not open a primary source for the vote, so the page does not claim it.
//
// LEFT OUT ON PURPOSE. The "33rd city" ordinal from the history page, the count
// of cities the fire authority serves (two city pages disagree, 23 and 24),
// the fence height exemption (the city's page says 7 feet, its code says 6),
// monthly rainfall (the hazard plan cites a consumer climate site), the Safety
// Element's stale line that the 2018 Holy Fire is the most recent fire, the
// 2007 Santiago Fire (only in a county table, no tie to the city), any share of
// the city inside each fire tier (seen only on a news aggregator), pipe
// material claims for 1980s and 1990s homes (no source), and tract names not
// found in a city document. Ladera Ranch is not a neighbor: the hazard plan
// puts Mission Viejo and Lake Forest to the west and unincorporated county
// land to the north and south.

export const ranchoSantaMargarita: CityContent = {
  name: "Rancho Santa Margarita",
  slug: "rancho-santa-margarita",
  intro:
    "Rancho Santa Margarita was built almost all at once: the city's own history says the first homes in the master planned community were sold in 1986, and Census figures show about 86 percent of today's housing went up in the 1980s and 1990s. The original community sits on the Plano Trabuco, a long, narrow river terrace between Trabuco Creek and Tijeras Creek at the foot of the Santa Ana Mountains, and voters added Dove Canyon, Robinson Ranch, Trabuco Highlands, Rancho Cielo and Walden when the city incorporated on January 1, 2000. That foothill setting is the other half of the story: the State Fire Marshal's 2025 map puts most of the land inside city limits in the Very High fire hazard tier, and the September 2024 Airport Fire forced evacuations in Robinson Ranch and Trabuco Highlands.",
  metaDescription:
    "Rancho Santa Margarita went up almost all at once from 1986. What 1990s homes, 15-grain water, Class A roof rules and foothill fire zones mean for upkeep.",
  metaTitle: "Rancho Santa Margarita: 1990s homes, fire zones",

  population: {
    value: "About 46,990 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the city's 2025 hazard plan uses the earlier 2018-2022 estimate of 47,702",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0659587",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "foothill",
    medianYearBuilt: "1992",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0659587",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Rancho Santa Margarita's median year built is 1992. Of about 17,498 housing units, roughly 50.6 percent went up in the 1990s and 35.4 percent in the 1980s, so about 86 percent of the city dates from those two decades; only about 4.3 percent is older than 1980 and about 9.8 percent was built in 2000 or later. About 54 percent of units are detached houses and about 20 percent are attached houses. A house from that window is at the age where the first reroof, the second furnace and air conditioner, and the original windows all come due in the same few years, and the neighbors are on the same clock.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0659587",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The city's history page explains the narrow age band. It says the area stayed fairly remote until 1986, when the first homes in the new master planned community of Rancho Santa Margarita were sold, that the 1980s boom also fueled building in Dove Canyon, Robinson Ranch and Wagon Wheel, and that extensions of Oso, Antonio and Alicia parkways tied the area to the rest of the county in 1992. In November 1999 voters chose to incorporate the planned community together with Robinson Ranch, Dove Canyon, Rancho Cielo, Trabuco Highlands and Walden, and the city incorporated on January 1, 2000. It is a contract city: police service comes from the Orange County Sheriff and fire protection from the Orange County Fire Authority.",
        sourceUrl: "https://www.cityofrsm.org/399/History",
        sourceLabel: "City of Rancho Santa Margarita, city history",
      },
      {
        text: "Associations do a lot of what a city does elsewhere. The city's About page says most facilities in Rancho Santa Margarita are owned and maintained by private organizations, and its association list names seven: SAMLARC, SAMCORP, Dove Canyon, Rancho Cielo, Robinson Ranch, Trabuco Highlands and Walden. The city's 2025 hazard plan describes SAMLARC, the Rancho Santa Margarita Landscape and Recreation Corporation, as the master association for approximately 13,650 homes. For a reroof, new windows or exterior paint, check your association's rules as well as the city's permit counter.",
        sourceUrl: "https://www.cityofrsm.org/414/Homeowners-Associations",
        sourceLabel:
          "City of Rancho Santa Margarita, homeowners associations list (SAMLARC home count from the city's 2025 Local Hazard Mitigation Plan)",
      },
      {
        text: "Every reroof here has to be Class A, inside a fire zone or not. Section 10.04.040 of the municipal code, last amended by Ordinance 25-05 on October 8, 2025, says that outside the fire hazard severity zones any roof covering applied in the alteration, repair or replacement of an existing roof must be a fire-retardant covering of at least Class A, and that replacing more than 50 percent of a roof within one year means the entire roof covering must meet that standard. Inside a fire hazard severity zone or wildland-urban interface area, the roof must also comply with the California Wildland-Urban Interface Code. On a roofing bid, ask for the Class A listing of the assembly in writing.",
        sourceUrl:
          "https://library.municode.com/ca/rancho_santa_margarita/codes/code_of_ordinances?nodeId=COOR_TIT10BUCO_CH10.04AMCARECO_S10.04.040AMSER9",
        sourceLabel:
          "Rancho Santa Margarita Municipal Code, section 10.04.040 (amendments to Residential Code section R902)",
      },
      {
        text: "The east side of the city is on a different water system from the rest: the city's 2025 hazard plan says Trabuco Canyon Water District serves Robinson Ranch, Trabuco Highlands, Dove Canyon, Rancho Cielo and Walden. That district's report for 2025 says its supply that year was treated Metropolitan Water District water, averaging 236 ppm of hardness (14 grains per gallon), and Baker Water Treatment Plant water, averaging 293 ppm (17 grains). It is very hard water on both sides of town, so water heaters and fixtures scale up either way.",
        sourceUrl:
          "https://www.tcwd.ca.gov/home/showpublisheddocument/4871/639171268637070000",
        sourceLabel:
          "Trabuco Canyon Water District, 2026 Water Quality Report (reporting year 2025)",
      },
      {
        text: "Property tax bills here can carry Mello-Roos lines, and none of them are the city's. The city's page says community facilities districts formed by the County of Orange, the Capistrano Unified and Saddleback Valley Unified school districts and Trabuco Canyon Water District levy special taxes for roads, schools and water systems, and that the city does not levy, collect or use those taxes and formed none of the districts. It links a handout of the district codes that can appear on a tax bill and the county's parcel search tool, worth a look before you budget for a house here.",
        sourceUrl:
          "https://www.cityofrsm.org/301/Mello-Roos-Community-Facilities-Act",
        sourceLabel:
          "City of Rancho Santa Margarita, Mello-Roos Community Facilities Act page",
      },
      {
        text: "The city's 2025 hazard plan places Rancho Santa Margarita about 10 miles northeast of the Pacific Ocean in the foothills of the Santa Ana Mountains. It says Santa Ana winds occur annually between September and May and have brought down tree limbs and blocked roads and storm drains, and that the city averages four extreme heat days a year, with as few as one and as many as 12 in some years. For a house that means dry wind and sun do the everyday wear on paint, sealants and roofing, and trees near the house are worth trimming before the fall winds.",
        sourceUrl:
          "https://www.cityofrsm.org/DocumentCenter/View/12685/RSM-2025-Final-LHMP",
        sourceLabel:
          "City of Rancho Santa Margarita, 2025 Local Hazard Mitigation Plan",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Dove Canyon",
      "Robinson Ranch",
      "Trabuco Highlands",
      "Rancho Cielo",
      "Walden",
    ],
    note: "These are the five communities the city's history page says voters joined to the Rancho Santa Margarita Planned Community in the November 1999 incorporation vote, and each still appears by name on the city's list of homeowners associations. The city's hazard plan describes them as the eastern part of the city, says roads to the eastern portion have to span Trabuco Canyon, and puts all five in Trabuco Canyon Water District's service area. Other tract and village names are in everyday use, but we did not find them in a city document, so they are not listed.",
    sourceUrl: "https://www.cityofrsm.org/399/History",
  },

  water: {
    utility:
      "Santa Margarita Water District (most of the city) and Trabuco Canyon Water District (the eastern communities)",
    utilityUrl: "https://www.smwd.com/",
    summary:
      "Two water districts serve Rancho Santa Margarita. The city's 2025 hazard plan says Trabuco Canyon Water District serves Robinson Ranch, Trabuco Highlands, Dove Canyon, Rancho Cielo and Walden, and Santa Margarita Water District serves the rest. Santa Margarita Water District's report for 2025 says its drinking water is imported treated surface water from the Metropolitan Water District, which draws on the Colorado River and the State Water Project, plus treated water from Irvine Ranch Water District's Baker Water Treatment Plant, which also uses Santiago Reservoir (Irvine Lake) water. In 2025 testing the district's distribution system averaged 256 ppm of hardness, or 15 grains per gallon, with a range of 210 to 300 ppm (12.3 to 17.5 grains). Trabuco Canyon Water District's 2025 report lists the same two sources: Metropolitan water averaging 236 ppm, or 14 grains, with a range of 191 to 280 ppm, and Baker plant water averaging 293 ppm, or 17 grains, with a range of 269 to 322 ppm. That is very hard water on either system, and scale in water heaters, dishwashers and shower valves is the everyday result. Santa Margarita Water District's customer line is 949-459-6420 and Trabuco Canyon Water District's is 949-858-0277.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010101&Year=2025&isCert=false",
    sourceLabel:
      "Santa Margarita Water District, 2026 Water Quality Report (reporting year 2025)",
  },

  permits: {
    office: "City of Rancho Santa Margarita Building and Safety Division",
    portalUrl: "https://rsm.cts.city/",
    summary:
      "Building and Safety is a division of the city's Development Services Department, with its counter at City Hall, 22112 El Paseo, open Monday through Thursday from 8 a.m. to noon and 1 to 4 p.m. and Friday from 8 a.m. to noon; the permit technician is at 949-635-1800, extension 6101. The city's permit process page lists re-roofing or roof repairs, water heaters, electrical and solar systems, plumbing and heating and air conditioning systems among the common projects that need a permit. Most of this still happens at the counter: the city says a typical submittal is the application, the fees, a site plan, three sets of plans at least 18 by 24 inches and a written description of the work. The online Rancho Santa Margarita Permit Center is where the city takes solar permit applications, including SolarAPP+ projects. Inspections run Monday through Friday from 8:30 a.m. to 3 p.m. and are requested on extension 6100; a request left after 6 a.m. is inspected the following business day.",
    sourceUrl: "https://www.cityofrsm.org/196/Building-Safety",
  },

  hazards: [
    {
      text: "The State Fire Marshal's Local Responsibility Area map for Rancho Santa Margarita, dated March 24, 2025 and published by the city, shows the Very High fire hazard tier over most of the land inside city limits, including the eastern communities and the canyon edges, with a large High area along the western side next to Mission Viejo. Only a strip through the middle of the city is unzoned, and it is ringed by Moderate and High bands. The city's page says properties in a zone are subject to wildland-urban interface building standards for new construction, defensible space requirements and natural hazard disclosure at sale. The zone is set by parcel, so search your address in the map viewer linked from the city's page.",
      sourceUrl:
        "https://www.cityofrsm.org/712/2025-Fire-Hazard-Severity-Zone-Map",
      sourceLabel:
        "City of Rancho Santa Margarita, 2025 Fire Hazard Severity Zone Map page",
    },
    {
      text: "The Airport Fire is the recent reminder. The city's 2025 hazard plan says it started on September 9, 2024 along Trabuco Creek Road in Trabuco Canyon, sparked unintentionally by heavy equipment, and that Robinson Ranch, Trabuco Highlands and the Trabuco Highlands apartments were ordered to evacuate while other neighborhoods were under warnings. The fire burned 23,526 acres across Orange and Riverside counties and destroyed 160 structures, all outside the city, because wind carried it through the Cleveland National Forest and away from town. The same plan counts approximately 6,375 dwelling units and 20,200 residents inside a fire hazard zone, a count made on the older maps, and rates the probability of future wildfire as high.",
      sourceUrl:
        "https://www.cityofrsm.org/DocumentCenter/View/12685/RSM-2025-Final-LHMP",
      sourceLabel:
        "City of Rancho Santa Margarita, 2025 Local Hazard Mitigation Plan",
    },
    {
      text: "The city says the state Board of Forestry and Fire Protection has designated it a Fire Risk Reduction Community, on a list that took effect July 1, 2026 and runs until the next list on July 1, 2028. Its page credits emergency planning, defensible space work and partnerships with the Orange County Fire Authority, the community associations and Firewise USA communities. The practical part: the city says property owners may be eligible for insurance discounts through the state's Safer from Wildfires program, so ask your insurer.",
      sourceUrl:
        "https://www.cityofrsm.org/726/Wildfire-Preparedness---Fire-Risk-Reduct",
      sourceLabel:
        "City of Rancho Santa Margarita, Fire Risk Reduction Community designation",
    },
    {
      text: "Fire in the canyons comes back as mud. The city's hazard plan says the Holy Fire began on August 6, 2018 in Trabuco Canyon and burned over 23,000 acres, and that in November 2018 a late fall storm on the burn scar turned Trabuco Creek into a river of mud, ash and debris. Inside the city it records no significant landslides in city history, only one slope failure in Bell Canyon in 2010, when heavy rain and dead plant material blocked drains and covered a street with five to six feet of mud. The plan still rates future landslides and mudflows as likely, so on a slope lot keep the terrace drains, swales and downspout lines clear before winter.",
      sourceUrl:
        "https://www.cityofrsm.org/DocumentCenter/View/12685/RSM-2025-Final-LHMP",
      sourceLabel:
        "City of Rancho Santa Margarita, 2025 Local Hazard Mitigation Plan",
    },
    {
      text: "The city's Safety Element, adopted July 9, 2025, says no active faults are known to pass through Rancho Santa Margarita. The closest active faults are the Elsinore-Glen Ivy fault 10.1 miles away, the Chino fault 11.1 miles away and the Newport-Inglewood fault 14.4 miles away, and the two local faults, the Aliso and the Cristianitos, are thought to be inactive and carry no state Alquist-Priolo zone. It maps liquefaction susceptibility along Trabuco Canyon and Tijeras Canyon Creek, says most of the city sits on competent alluvial material, and places the soils most prone to shrinking and swelling along the western boundary of the city.",
      sourceUrl:
        "https://www.cityofrsm.org/DocumentCenter/View/12683/Safety-Element-Adopted-July-9-2025",
      sourceLabel:
        "City of Rancho Santa Margarita General Plan, Safety Element (July 2025)",
    },
    {
      text: "Flooding here is a creek problem, not a neighborhood one. The Safety Element says the federal flood maps show 100-year and 500-year flood areas along Arroyo Trabuco and Tijeras Canyon Creek, that storms run off the mountains quickly and produce short, sharp flash floods, and that dense trees and brush in the Trabuco Creek channel may raise flood levels. It also says no homes or structures are located within the 100-year or 500-year flood zones in the city, that the flood hazard areas sit in land kept as open space, and that no major dam is located upstream, though Upper Oso Reservoir, in use since 1979 and holding 1.3 billion gallons, lies in the northwestern portion of the city.",
      sourceUrl:
        "https://www.cityofrsm.org/DocumentCenter/View/12683/Safety-Element-Adopted-July-9-2025",
      sourceLabel:
        "City of Rancho Santa Margarita General Plan, Safety Element (July 2025)",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, in a city where most roofs are 30 to 40 years old and the municipal code requires Class A on every reroof.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a new furnace and air conditioner run when the house dates from the 1980s or 1990s, as about 86 percent of homes here do.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on water that both local districts report at 14 to 17 grains per gallon.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including brush and tree work before the Santa Ana season and slope drains before winter.",
    },
  ],

  neighbors: ["mission-viejo", "lake-forest"],

  faq: [
    {
      q: "Is the water hard in Rancho Santa Margarita?",
      a: "Yes, very. Santa Margarita Water District's report for 2025 shows its distribution system averaging 256 ppm of hardness, or 15 grains per gallon, with a range of 210 to 300 ppm. Trabuco Canyon Water District, which the city's hazard plan says serves Robinson Ranch, Trabuco Highlands, Dove Canyon, Rancho Cielo and Walden, reports Metropolitan water averaging 236 ppm (14 grains) and Baker Water Treatment Plant water averaging 293 ppm (17 grains). Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour.",
    },
    {
      q: "Who provides fire service in Rancho Santa Margarita?",
      a: "The Orange County Fire Authority. The city says it contracts with the authority for all fire safety services. One station is inside the city, Fire Station 45 at 30131 Aventura in the business park, and the city lists three more just outside it: Station 18 in Trabuco Canyon, Station 31 on Olympiad Road in Mission Viejo and Station 58 in Ladera Ranch. The authority also reviews fuel modification plans for new buildings in wildfire risk areas under the city's code.",
    },
    {
      q: "Do I need a permit to replace a water heater or a roof in Rancho Santa Margarita?",
      a: "Yes to both. The city's permit process page lists water heaters and re-roofing or roof repairs among the common projects that need a building permit. Its water heater handout, based on the 2025 California Plumbing Code, calls for earthquake straps in the top and bottom third of the tank, a relief valve piped to the outside, and an expansion tank where the water system is closed. For a roof, the municipal code requires a Class A covering. Applications go to the Building and Safety counter at City Hall, 949-635-1800 extension 6101, and a licensed contractor normally pulls the permit as part of the job.",
    },
    {
      q: "Is my Rancho Santa Margarita home in a fire hazard severity zone?",
      a: "There is a good chance. The State Fire Marshal's March 24, 2025 map for the city, which the city published, shows the Very High tier over most of the land inside city limits, a large High area on the western side, and only a strip through the middle of the city unzoned, edged by Moderate and High bands. The zone is set parcel by parcel, so search your address in the interactive map viewer linked from the city's Fire Hazard Severity Zone page.",
    },
    {
      q: "Did the Airport Fire reach Rancho Santa Margarita?",
      a: "No. The city's 2025 hazard plan says the fire started on September 9, 2024 in Trabuco Canyon and that Robinson Ranch, Trabuco Highlands and the Trabuco Highlands apartments were ordered to evacuate, but wind moved the fire through the Cleveland National Forest toward Riverside County and away from the city. The plan says the damaged and destroyed structures were all outside Rancho Santa Margarita.",
    },
  ],

  updated: "2026-09-20",
};
