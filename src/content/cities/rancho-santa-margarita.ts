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
    "Rancho Santa Margarita sits on the Plano Trabuco, a narrow river terrace between Trabuco and Tijeras creeks at the foot of the Santa Ana Mountains, and the State Fire Marshal's 2025 map puts most of the city in the Very High fire hazard tier. The first homes sold in 1986, and about 86 percent of the housing went up in the 1980s and 1990s, so whole streets come due for roofs and HVAC together.",
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
        text: "Of about 17,498 housing units, roughly 50.6 percent went up in the 1990s and 35.4 percent in the 1980s; only about 4.3 percent is older than 1980 and about 9.8 percent is from 2000 or later. About 54 percent are detached houses and about 20 percent attached.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0659587",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The area stayed fairly remote until 1986, when the first homes in the Rancho Santa Margarita master planned community sold; the same boom built Dove Canyon, Robinson Ranch and Wagon Wheel, and parkway extensions tied the area to the county in 1992. Voters joined the planned community with Robinson Ranch, Dove Canyon, Rancho Cielo, Trabuco Highlands and Walden in November 1999, and the city incorporated on January 1, 2000. It is a contract city, with police from the Orange County Sheriff and fire from the Orange County Fire Authority.",
        sourceUrl: "https://www.cityofrsm.org/399/History",
        sourceLabel: "City of Rancho Santa Margarita, city history",
      },
      {
        text: "Most facilities here are owned and maintained by private organizations, and the city lists seven associations: SAMLARC, SAMCORP, Dove Canyon, Rancho Cielo, Robinson Ranch, Trabuco Highlands and Walden. SAMLARC, the master association, covers approximately 13,650 homes, so exterior work usually needs association sign-off as well as a permit.",
        sourceUrl: "https://www.cityofrsm.org/414/Homeowners-Associations",
        sourceLabel:
          "City of Rancho Santa Margarita, homeowners associations list (SAMLARC home count from the city's 2025 Local Hazard Mitigation Plan)",
      },
      {
        text: "Every reroof must be Class A, inside a fire zone or not. Municipal code section 10.04.040, last amended by Ordinance 25-05 on October 8, 2025, requires at least a Class A fire-retardant covering on any roof alteration, repair or replacement, and on the whole roof when more than 50 percent is replaced within a year. Inside a fire hazard zone or wildland-urban interface area the roof must also meet the California Wildland-Urban Interface Code.",
        sourceUrl:
          "https://library.municode.com/ca/rancho_santa_margarita/codes/code_of_ordinances?nodeId=COOR_TIT10BUCO_CH10.04AMCARECO_S10.04.040AMSER9",
        sourceLabel:
          "Rancho Santa Margarita Municipal Code, section 10.04.040 (amendments to Residential Code section R902)",
      },
      {
        text: "Trabuco Canyon Water District serves Robinson Ranch, Trabuco Highlands, Dove Canyon, Rancho Cielo and Walden. Its 2025 supply was treated Metropolitan water averaging 236 ppm of hardness (14 grains per gallon), range 191 to 280 ppm, and Baker Water Treatment Plant water averaging 293 ppm (17 grains), range 269 to 322 ppm. Its customer line is 949-858-0277.",
        sourceUrl:
          "https://www.tcwd.ca.gov/home/showpublisheddocument/4871/639171268637070000",
        sourceLabel:
          "Trabuco Canyon Water District, 2026 Water Quality Report (reporting year 2025)",
      },
      {
        text: "Mello-Roos lines on tax bills here come from districts formed by the County of Orange, the Capistrano Unified and Saddleback Valley Unified school districts and Trabuco Canyon Water District. The city formed none of them and does not levy or collect the taxes; its page links a handout of district codes and the county's parcel search.",
        sourceUrl:
          "https://www.cityofrsm.org/301/Mello-Roos-Community-Facilities-Act",
        sourceLabel:
          "City of Rancho Santa Margarita, Mello-Roos Community Facilities Act page",
      },
      {
        text: "The hazard plan places the city about 10 miles northeast of the ocean. Santa Ana winds come annually between September and May and have brought down tree limbs and blocked roads and storm drains, and the city averages four extreme heat days a year, with anywhere from one to 12.",
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
    note: "The five communities voters joined to the planned community in 1999, each still on the city's association list. The hazard plan calls them the eastern part of the city, reached by roads that span Trabuco Canyon.",
    sourceUrl: "https://www.cityofrsm.org/399/History",
  },

  water: {
    utility:
      "Santa Margarita Water District (most of the city) and Trabuco Canyon Water District (the eastern communities)",
    utilityUrl: "https://www.smwd.com/",
    summary:
      "Santa Margarita Water District serves everything outside the five eastern communities. Its report for 2025 lists imported Metropolitan water from the Colorado River and State Water Project, plus water from Irvine Ranch Water District's Baker Water Treatment Plant, which also draws on Santiago Reservoir (Irvine Lake). The distribution system averaged 256 ppm of hardness, or 15 grains per gallon, range 210 to 300 ppm (12.3 to 17.5 grains). Customer line: 949-459-6420.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010101&Year=2025&isCert=false",
    sourceLabel:
      "Santa Margarita Water District, 2026 Water Quality Report (reporting year 2025)",
  },

  permits: {
    office: "City of Rancho Santa Margarita Building and Safety Division",
    portalUrl: "https://rsm.cts.city/",
    summary:
      "The counter is at City Hall, 22112 El Paseo, open Monday through Thursday 8 a.m. to noon and 1 to 4 p.m. and Friday 8 a.m. to noon; the permit technician is at 949-635-1800, extension 6101. Re-roofing, water heaters, electrical, solar, plumbing and HVAC all need permits. Most submittals still happen at the counter: application, fees, site plan, three sets of plans at least 18 by 24 inches and a written description. The online Permit Center takes solar, including SolarAPP+. Inspections run Monday through Friday 8:30 a.m. to 3 p.m. on extension 6100; a request left after 6 a.m. is inspected the next business day.",
    sourceUrl: "https://www.cityofrsm.org/196/Building-Safety",
  },

  hazards: [
    {
      text: "The State Fire Marshal's March 24, 2025 map, published by the city, shows the Very High tier over most of the city, including the eastern communities and canyon edges, with a large High area along the western side next to Mission Viejo. Only a strip through the middle is unzoned, ringed by Moderate and High bands. Zoned parcels face wildland-urban interface standards for new construction, defensible space rules and disclosure at sale; the city's page links a map viewer for your address.",
      sourceUrl:
        "https://www.cityofrsm.org/712/2025-Fire-Hazard-Severity-Zone-Map",
      sourceLabel:
        "City of Rancho Santa Margarita, 2025 Fire Hazard Severity Zone Map page",
    },
    {
      text: "The Airport Fire started September 9, 2024 on Trabuco Creek Road, sparked by heavy equipment. Robinson Ranch, Trabuco Highlands and the Trabuco Highlands apartments were ordered to evacuate; the fire burned 23,526 acres and destroyed 160 structures, all outside the city, as wind pushed it through the Cleveland National Forest. The hazard plan counts about 6,375 dwelling units and 20,200 residents in a fire hazard zone on the older maps and rates future wildfire probability as high.",
      sourceUrl:
        "https://www.cityofrsm.org/DocumentCenter/View/12685/RSM-2025-Final-LHMP",
      sourceLabel:
        "City of Rancho Santa Margarita, 2025 Local Hazard Mitigation Plan",
    },
    {
      text: "The state Board of Forestry and Fire Protection named the city a Fire Risk Reduction Community, on a list effective July 1, 2026 through July 1, 2028, crediting its planning, defensible space work and partnerships with the fire authority, associations and Firewise USA communities. The city says owners may qualify for insurance discounts through the state's Safer from Wildfires program.",
      sourceUrl:
        "https://www.cityofrsm.org/726/Wildfire-Preparedness---Fire-Risk-Reduct",
      sourceLabel:
        "City of Rancho Santa Margarita, Fire Risk Reduction Community designation",
    },
    {
      text: "The Holy Fire began August 6, 2018 in Trabuco Canyon and burned over 23,000 acres; that November a storm on the burn scar turned Trabuco Creek into a river of mud, ash and debris. Inside the city the plan records only one slope failure, in Bell Canyon in 2010, when rain and dead plant material blocked drains and buried a street in five to six feet of mud, and it rates future mudflows as likely. On a slope lot, clear terrace drains and swales before winter.",
      sourceUrl:
        "https://www.cityofrsm.org/DocumentCenter/View/12685/RSM-2025-Final-LHMP",
      sourceLabel:
        "City of Rancho Santa Margarita, 2025 Local Hazard Mitigation Plan",
    },
    {
      text: "The Safety Element, adopted July 9, 2025, says no known active fault passes through the city. The nearest are the Elsinore-Glen Ivy (10.1 miles), Chino (11.1) and Newport-Inglewood (14.4); the local Aliso and Cristianitos faults are thought inactive. Liquefaction susceptibility runs along Trabuco Canyon and Tijeras Canyon Creek, most of the city sits on competent alluvium, and the most expansive soils lie along the western boundary.",
      sourceUrl:
        "https://www.cityofrsm.org/DocumentCenter/View/12683/Safety-Element-Adopted-July-9-2025",
      sourceLabel:
        "City of Rancho Santa Margarita General Plan, Safety Element (July 2025)",
    },
    {
      text: "Federal flood maps show 100-year and 500-year areas along Arroyo Trabuco and Tijeras Canyon Creek, where storms off the mountains bring short flash floods and dense brush in the Trabuco channel may raise water levels. The Safety Element says no homes sit in either zone, the flood areas are open space, and no major dam is upstream, though Upper Oso Reservoir, in use since 1979 and holding 1.3 billion gallons, is in the city's northwest.",
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
        "Most roofs here are 30 to 40 years old, and city code requires Class A on every reroof.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "About 86 percent of homes date from the 1980s or 1990s, many on their second system.",
    },
    {
      href: "/guides/santa-ana-wind-wildfire-home-prep",
      title: "Santa Ana wind and wildfire prep",
      blurb:
        "Most of the city is mapped Very High, and the Airport Fire forced evacuations in 2024.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Brush and tree work before the fall winds, slope drains before winter, on 15-grain water.",
    },
  ],

  neighbors: ["mission-viejo", "lake-forest"],

  faq: [
    {
      q: "Which fire stations serve Rancho Santa Margarita?",
      a: "Station 45 at 30131 Aventura, in the business park, is the one inside the city. The city lists three more just outside it: Station 18 in Trabuco Canyon, Station 31 on Olympiad Road in Mission Viejo and Station 58 in Ladera Ranch. The fire authority also reviews fuel modification plans for new buildings in wildfire risk areas.",
    },
    {
      q: "What does the city require when a water heater is replaced?",
      a: "Its water heater handout, based on the 2025 California Plumbing Code, calls for earthquake straps in the top and bottom third of the tank, a relief valve piped to the outside, and an expansion tank where the water system is closed.",
    },
  ],

  updated: "2026-09-20",
};
