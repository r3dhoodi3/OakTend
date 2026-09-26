import type { CityContent } from "./types";

// Brea. Researched 2026-09-20 for the third city wave. Every number below was
// read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: an oil town with a
// 1970s housing boom on the flat and fire, fault and slide country in the
// hills. The city's own 2024 Local Hazard Mitigation Plan (adopted by the City
// Council on October 15, 2024) gives the oil well count from the state oil
// regulator, puts the Whittier Fault through the eastern half of the city, and
// calls landsliding the dominant geologic hazard. The State Fire Marshal's
// March 24, 2025 map, published by the city, covers the northern hills and
// Carbon Canyon in the Very High tier.
//
// FIRE SERVICE. Brea has its own city fire department. The Orange County Fire
// Authority is cited here only as the author of the 2008 Freeway Complex Fire
// after action report, which documents the Brea part of that fire (the
// Landfill Fire). It is never described as Brea's fire service.
//
// WATER NUMBERS are from the City of Brea Water Division report for reporting
// year 2025. The copy linked from the city's Water Division page (the link
// still carries a "2023" file name) and the copy on the State Water Board's
// report portal are the same file, byte for byte. The report prints grains per
// gallon only for the imported Metropolitan water; the groundwater figure of
// about 13 grains is our conversion of its 225 ppm average.
//
// The groundwater and imported split (93 and 6 percent) is from the city's
// 2025 Urban Water Management Plan, final June 2026, a 300 MB PDF at
// cityofbrea.gov/DocumentCenter/View/19141/Brea_2025-UWMP. The page links the
// Water Division page that carries it rather than the 300 MB file itself. The
// water quality report gives no percentage.
//
// LEFT OUT ON PURPOSE. Any ordinal for Brea's incorporation (the city's
// history says sixth city in the county, its hazard plan says eighth),
// acreage inside each fire hazard tier (the city publishes the map but no
// acre count), monthly climate normals (the only
// table found was an uncited one on Wikipedia), the 2009 oil well count from
// Wikipedia (stale), Carbon Canyon Dam inundation detail, and tract names such
// as Blackstone, La Floresta, Tonner Hills and Country Hills (found only on
// real-estate pages).

export const brea: CityContent = {
  name: "Brea",
  slug: "brea",
  intro:
    "Brea is Spanish for tar, the stuff that seeped out of these hills, and the oil never fully left: the city's 2024 hazard plan, citing the state oil regulator, counts 879 oil and gas wells inside city limits, 261 of them still active. The houses mostly came later, with the 57 freeway and the Brea Mall, which is why more than a quarter of the homes here date from the 1970s and the median build year is 1978. North and east of that flat 1970s core the city climbs into hills and canyons where the State Fire Marshal's 2025 map shows the Very High fire hazard tier and where, by the city's own account, the Whittier Fault cuts through the eastern half of town.",
  metaDescription:
    "Brea grew up on an oil field. What 1970s tracts, hard blended water, Class A reroof rules, the Whittier Fault and hillside fire zones mean for upkeep.",
  metaTitle: "Brea home upkeep: oil-field tracts and fire zones",

  population: {
    value: "About 47,469 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the Brea Fire Department describes a residential population of more than 47,000",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0608100",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "foothill",
    medianYearBuilt: "1978",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0608100",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Brea's median year built is 1978. Of about 17,373 housing units, roughly 27.3 percent went up in the 1970s, 16.3 percent in the 1960s and 15.3 percent in the 1980s, while only about 11 percent predate 1960. Brea also kept building: about 24.9 percent of its homes date from 2000 or later, most of those from the 2010s. A 1970s house is at the age where the second roof, original drain lines, the electrical panel and single-pane windows all come up at once.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0608100",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The city's own history explains both bulges. Drilling in the Brea-Olinda field began in 1896, a townsite map of about 230 lots was filed under the name Brea on January 19, 1911, and the city incorporated on February 23, 1917 after a 245 to 45 vote. The history says the 1970s ushered in major growth with the opening of the Orange (SR-57) freeway and construction of the Brea Mall, when entire new neighborhoods emerged, and that in the decade before the city's centennial over 2,000 new housing units were being added from three master planned developments.",
        sourceUrl:
          "https://www.cityofbrea.gov/DocumentCenter/View/3329/Brea-Condensed-History",
        sourceLabel: "City of Brea, condensed city history",
      },
      {
        text: "Every reroof in Brea has to use Class A roofing material, not only the ones in the hills. The Building and Safety Division's reroof submittal guidelines also allow only two layers of roofing in total (one existing plus one new), and ask for the product's ICC evaluation report, complete material specifications and a construction waste management plan with the permit application. On a bid, ask for the Class A rating and the evaluation report number in writing.",
        sourceUrl:
          "https://www.cityofbrea.gov/DocumentCenter/View/14660/Template---Reroof-Permit-Submittal-Guidelines",
        sourceLabel: "City of Brea Building and Safety, reroof permit submittal guidelines",
      },
      {
        text: "Brea's tap water starts in another county. The city's 2025 Urban Water Management Plan says that in fiscal year 2024-25 about 93 percent of the supply was groundwater purchased from California Domestic Water Company, pumped from the Main San Gabriel Basin in Los Angeles County, about 6 percent was imported water bought through the Municipal Water District of Orange County, and about 1 percent came from the city's one La Habra Basin well, which is used only for irrigation. The plan counts approximately 12,926 service connections on about 216 miles of water mains.",
        sourceUrl: "https://www.cityofbrea.gov/428/Water-Division",
        sourceLabel:
          "City of Brea, 2025 Urban Water Management Plan, linked from the Water Division page",
      },
      {
        text: "The city draws the line for water leaks at the meter. Its Water Division says the homeowner is responsible for all leaks after the water meter and inside the house, that Public Works will turn the water off at the meter so you or your plumber can make repairs, and that the Water Division offers free leak detection if you cannot pinpoint a leak. The number the city gives for both services is 714-990-7691.",
        sourceUrl: "https://www.cityofbrea.gov/Faq.aspx?QID=67",
        sourceLabel: "City of Brea, water FAQ",
      },
      {
        text: "The city's hazard plan describes the climate in round numbers: about 15 inches of rain a year, an average of 283 sunny days, and average temperatures between 70 and 85 degrees for most of the year. It adds that fall brings Santa Ana winds that dry out the foothills and canyons further. For a house that means sun and dry wind do the everyday wear on paint, sealants and roofing, and the drains and slopes only get tested a few days each winter.",
        sourceUrl:
          "https://www.cityofbrea.gov/DocumentCenter/View/17657/City-of-Brea_LHMP_FINAL_with-Appendices",
        sourceLabel: "City of Brea, 2024 Local Hazard Mitigation Plan",
      },
    ],
  },

  neighborhoods: {
    names: ["Brea Downtown", "Olinda Village", "Olinda Ranch", "Carbon Canyon"],
    note: "Brea Downtown is the rebuilt center around Brea Boulevard and Imperial Highway; the city's history says the old downtown was cleared and rebuilt with redevelopment funding in the 1990s into an entertainment, retail and restaurant district. Carbon Canyon is the canyon east of town that Carbon Canyon Road runs through: the city's wildfire page describes it as about 1,758 acres of wildland and urban interface and names the communities along the road, including Olinda Village. Olinda Ranch is the name the city uses for the neighborhood around the Olinda Oil Museum and Trail on Santa Fe Road, where the original Olinda Oil Well Number One still stands. Other tract names are in everyday use in Brea, but we could only trace them to real-estate pages, so they are not listed.",
    sourceUrl: "https://www.cityofbrea.gov/364/Wildfire-Safety",
  },

  water: {
    utility: "City of Brea Water Division",
    utilityUrl: "https://www.cityofbrea.gov/428/Water-Division",
    summary:
      "The City of Brea runs its own water utility, and its 2025 Urban Water Management Plan says the Water Division serves all of the city except the Vesuvius tract at the eastern end, which Yorba Linda Water District serves. The city's water quality report describes the supply as a blend of groundwater bought from California Domestic Water Company in Whittier, which originates in the Main San Gabriel groundwater basin, and surface water imported by the Metropolitan Water District from the Colorado River and the State Water Project. The management plan puts numbers on the blend: in fiscal year 2024-25 about 93 percent was the purchased groundwater and about 6 percent was imported water. In 2025 testing the groundwater averaged 225 ppm of hardness, about 13 grains per gallon, with a range of 210 to 240 ppm, and the Metropolitan water averaged 236 ppm, or 14 grains per gallon, with a range of 191 to 280 ppm. Either way this is very hard water, and scale in water heaters, fixtures and dishwashers is the everyday result.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010002&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Brea Building & Safety Division",
    portalUrl: "https://aca-prod.accela.com/BREA/Welcome.aspx",
    summary:
      "The Building & Safety Division takes permit and plan check applications through its Online Permit Center, which the city says is open around the clock for applications, payments, project status and record searches across building, planning, engineering and fire. Two practical details from the city's page: after you upload a requested document or a resubmittal you have to email building@cityofbrea.gov so the review is not delayed, and the portal should be used from a full web browser because some functions do not work on a phone. The city notes that the 2025 California Building Standards Code has been enforceable since January 1, 2026, and that a 2.5 percent service fee applies to credit card payments as of March 1, 2026. The counter is at 1 Civic Center Circle, open 8 a.m. to 5 p.m. Monday through Thursday and alternate Fridays, and the division's number is 714-990-7600.",
    sourceUrl: "https://www.cityofbrea.gov/124/Building-Safety-Division",
  },

  hazards: [
    {
      text: "The State Fire Marshal's Local Responsibility Area map for Brea, dated March 24, 2025 and published by the city, shows the Very High fire hazard tier across the hills on the north side of the city and along Carbon Canyon in the east, edged by narrow High and Moderate bands, while the flat southwest of the city is unzoned. The city's notice warns that many residents who were not previously in a high fire risk zone may now be in one. The zone is set by parcel and drives defensible space rules and sale disclosures, so check your own address on the map linked from the city's notice.",
      sourceUrl: "https://www.cityofbrea.gov/CivicAlerts.aspx?AID=2423&ARC=5301",
      sourceLabel: "City of Brea, Cal Fire releases updated fire zone maps",
    },
    {
      text: "The November 2008 Freeway Complex Fire burned inside Brea. The Orange County Fire Authority's after action report says a second fire, the Landfill Fire, was reported at 10:43 a.m. on November 15 near the Olinda Alpha Landfill, and that the Brea Fire Department and the authority both sent crews. In Brea it destroyed four homes and damaged six others, burned 980 acres of vegetation and damaged Brea Olinda and Brea Canyon high schools. Investigators traced it to inadequate maintenance of power lines supplying equipment in an oil field.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
      sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
    },
    {
      text: "Selling a home in a High or Very High zone in Brea means a defensible space inspection. The city's page explains that state law (Assembly Bill 38, Civil Code section 1102.19) requires the seller to give the buyer documentation that the property meets defensible space standards before close of escrow, and that a Brea Fire Prevention Bureau inspector does the inspection, checking vegetation clearance, combustible debris, spacing around woodpiles and outbuildings, and the state's Zone 0 standard. Brea's fire service is its own city department, which says it has 54 fire professionals and four stations covering 12.43 square miles.",
      sourceUrl:
        "https://www.cityofbrea.gov/1863/Defensible-Space-Disclosure-Inspections",
      sourceLabel: "City of Brea Fire Department, defensible space disclosure inspections",
    },
    {
      text: "The city's hazard plan says two known faults traverse Brea. The Whittier Fault cuts across the hills and through the eastern half of the city in a northwesterly direction, is considered active and carries a state Alquist-Priolo special study zone; the Elysian Park Thrust is buried about 6 to 10 miles down. Liquefaction is a smaller, mapped problem: the plan puts just over 12.6 percent of residents and about 1.5 square miles in a liquefaction zone, mainly along Tonner Canyon Creek, Brea Canyon and the area around Carbon Canyon Dam, and rates the rest of the city as minimal.",
      sourceUrl:
        "https://www.cityofbrea.gov/DocumentCenter/View/17657/City-of-Brea_LHMP_FINAL_with-Appendices",
      sourceLabel: "City of Brea, 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "The same plan calls landsliding and the debris and mud flows that come with it the dominant geologic hazard in Brea, with rockfall and mudflow most likely along Carbon Canyon Road and Brea Canyon. Its event list includes slides that closed Carbon Canyon Road twice in February 1998, mud and debris on the road in December 2008 below slopes burned by the Freeway Complex Fire, and several landslides in Carbon Canyon triggered by the 2014 La Habra earthquake. On a hillside lot, keep slope drains, swales and downspout lines clear before the winter storms.",
      sourceUrl:
        "https://www.cityofbrea.gov/DocumentCenter/View/17657/City-of-Brea_LHMP_FINAL_with-Appendices",
      sourceLabel: "City of Brea, 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "Oil is still a working land use here. The city's 2024 hazard plan, citing the California Geologic Energy Management Division (CalGEM), counts 879 oil and gas wells in the city: 261 active, 463 plugged, 152 idle and 3 canceled, with active wells in the surrounding hills close to neighborhoods. The plan also says a large portion of the city is classified as being within a methane zone. Before buying, adding on or digging a pool, look the parcel up on CalGEM's Well Finder map and ask Building and Safety what the lot requires.",
      sourceUrl:
        "https://www.cityofbrea.gov/DocumentCenter/View/17657/City-of-Brea_LHMP_FINAL_with-Appendices",
      sourceLabel: "City of Brea, 2024 Local Hazard Mitigation Plan, citing CalGEM",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, in a city that requires Class A roofing on every reroof and caps a roof at two layers.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on blended water that tests at 13 to 14 grains per gallon.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "What an upgrade runs when the panel is original to a 1970s tract, the largest single decade of Brea's housing.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including slope drains before winter and brush before Santa Ana season.",
    },
  ],

  neighbors: ["la-habra", "fullerton", "yorba-linda", "placentia"],

  faq: [
    {
      q: "Is my Brea home in a fire hazard severity zone?",
      a: "It depends on which side of town you are on. The State Fire Marshal's March 24, 2025 map for Brea, which the city published, shows the Very High tier across the northern hills and along Carbon Canyon, with thin High and Moderate bands at the edge and the flat southwest of the city unzoned. The city warned that many residents who were not in a high risk zone before may be in one now. The zone is set parcel by parcel, so look up your address on the map linked from the city's notice.",
    },
    {
      q: "Is Brea's water hard?",
      a: "Yes, very. The City of Brea Water Division's report for 2025 shows the groundwater it buys from California Domestic Water Company averaging 225 ppm of hardness, about 13 grains per gallon, and the imported Metropolitan water averaging 236 ppm, or 14 grains per gallon. The city delivers a blend that its 2025 water management plan puts at about 93 percent groundwater, so there is no soft side of town. Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour.",
    },
    {
      q: "Who provides fire service in Brea?",
      a: "The Brea Fire Department, which is a department of the city, not the county fire authority. The city says it has 54 trained fire professionals and four fire stations covering 12.43 square miles, including wildland interface areas. Its Fire Prevention Bureau also handles brush clearance notices and the defensible space inspections that state law requires when a home in a High or Very High fire hazard zone is sold.",
    },
    {
      q: "What does Brea require for a reroof permit?",
      a: "The Building and Safety Division's reroof guidelines ask for a completed building permit application, the roofing product's ICC evaluation report, complete material specifications, the square footage and valuation, and a construction waste management plan. The roofing must be Class A material, and only two layers are allowed in total, one existing plus one new. Applications go through the city's Online Permit Center, and a licensed roofer normally pulls the permit as part of the job.",
    },
    {
      q: "Are there oil wells near homes in Brea?",
      a: "Yes. The city's 2024 hazard plan, citing the state's oil regulator CalGEM, counts 879 oil and gas wells in the city, of which 261 were active, 463 plugged and 152 idle, and says active wells sit in the surrounding hills close to neighborhoods. It also says a large portion of the city is classified as a methane zone. CalGEM's Well Finder map shows wells by location, which is worth checking before you buy or build an addition.",
    },
    {
      q: "Is Brea on an earthquake fault?",
      a: "According to the city's hazard plan, yes. It says the Whittier Fault cuts across the hills and through the eastern half of the city, is considered active and has a state Alquist-Priolo special study zone around it, and that the deeper Elysian Park Thrust also runs beneath the city. The plan adds that hillside areas may be subject to earthquake-induced landslides, and the 2014 La Habra earthquake did cause slides that closed Carbon Canyon Road.",
    },
  ],

  updated: "2026-09-20",
};
