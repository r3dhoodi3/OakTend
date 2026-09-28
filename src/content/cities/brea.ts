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
    "Brea is Spanish for tar, and the oil never fully left: the city's 2024 hazard plan, citing the state oil regulator, counts 879 oil and gas wells inside city limits, 261 still active. The houses came later with the 57 freeway and the Brea Mall, so more than a quarter date from the 1970s. North and east of that flat core the city climbs into hills in the Very High fire hazard tier, crossed by the Whittier Fault.",
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
        text: "Of about 17,373 housing units, roughly 27.3 percent went up in the 1970s, 16.3 percent in the 1960s and 15.3 percent in the 1980s, and only about 11 percent predate 1960. Brea kept building: about 24.9 percent of homes date from 2000 or later, most from the 2010s.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0608100",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "Drilling in the Brea-Olinda field began in 1896, a townsite map of about 230 lots was filed as Brea on January 19, 1911, and the city incorporated on February 23, 1917 after a 245 to 45 vote. The city's history ties the 1970s boom to the SR-57 freeway and the Brea Mall, and says over 2,000 homes were added from three master planned developments in the decade before its centennial.",
        sourceUrl:
          "https://www.cityofbrea.gov/DocumentCenter/View/3329/Brea-Condensed-History",
        sourceLabel: "City of Brea, condensed city history",
      },
      {
        text: "Every reroof in Brea must use Class A roofing, not only those in the hills, and a roof may have only two layers in total. The reroof guidelines ask for the product's ICC evaluation report, material specifications, square footage and valuation, and a construction waste management plan with the application.",
        sourceUrl:
          "https://www.cityofbrea.gov/DocumentCenter/View/14660/Template---Reroof-Permit-Submittal-Guidelines",
        sourceLabel: "City of Brea Building and Safety, reroof permit submittal guidelines",
      },
      {
        text: "Brea's tap water starts in Los Angeles County. In fiscal year 2024-25 about 93 percent was groundwater bought from California Domestic Water Company out of the Main San Gabriel Basin, about 6 percent was imported through the Municipal Water District of Orange County, and about 1 percent came from the city's one La Habra Basin well, used only for irrigation. The system has about 12,926 service connections on about 216 miles of mains.",
        sourceUrl: "https://www.cityofbrea.gov/428/Water-Division",
        sourceLabel:
          "City of Brea, 2025 Urban Water Management Plan, linked from the Water Division page",
      },
      {
        text: "The homeowner is responsible for every leak after the water meter. Public Works will shut the water off at the meter for repairs, and the Water Division offers free leak detection if you cannot find a leak; both at 714-990-7691.",
        sourceUrl: "https://www.cityofbrea.gov/Faq.aspx?QID=67",
        sourceLabel: "City of Brea, water FAQ",
      },
      {
        text: "The city's hazard plan puts rainfall at about 15 inches a year, with an average of 283 sunny days, temperatures between 70 and 85 degrees most of the year, and fall Santa Ana winds that dry the foothills and canyons further.",
        sourceUrl:
          "https://www.cityofbrea.gov/DocumentCenter/View/17657/City-of-Brea_LHMP_FINAL_with-Appendices",
        sourceLabel: "City of Brea, 2024 Local Hazard Mitigation Plan",
      },
    ],
  },

  neighborhoods: {
    names: ["Brea Downtown", "Olinda Village", "Olinda Ranch", "Carbon Canyon"],
    note: "Brea Downtown, around Brea Boulevard and Imperial Highway, was cleared and rebuilt with redevelopment funds in the 1990s. Carbon Canyon, east of town along Carbon Canyon Road, is about 1,758 acres of wildland and urban interface, with communities such as Olinda Village along the road. Olinda Ranch surrounds the Olinda Oil Museum and Trail on Santa Fe Road, where Olinda Oil Well Number One still stands.",
    sourceUrl: "https://www.cityofbrea.gov/364/Wildfire-Safety",
  },

  water: {
    utility: "City of Brea Water Division",
    utilityUrl: "https://www.cityofbrea.gov/428/Water-Division",
    summary:
      "The city's Water Division delivers a blend of groundwater bought from California Domestic Water Company in Whittier and Metropolitan Water District water from the Colorado River and the State Water Project. In 2025 testing the groundwater averaged 225 ppm of hardness, about 13 grains per gallon (range 210 to 240 ppm), and the Metropolitan water 236 ppm, or 14 grains (range 191 to 280 ppm). There is no soft side of town.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010002&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Brea Building & Safety Division",
    portalUrl: "https://aca-prod.accela.com/BREA/Welcome.aspx",
    summary:
      "Applications, payments and status for building, planning, engineering and fire run through the Online Permit Center. After uploading a requested document or resubmittal, email building@cityofbrea.gov so review is not delayed, and use a full browser, since some functions fail on a phone. The 2025 California codes apply from January 1, 2026, and card payments carry a 2.5 percent fee from March 1, 2026. The counter is at 1 Civic Center Circle, 8 a.m. to 5 p.m. Monday through Thursday and alternate Fridays, 714-990-7600.",
    sourceUrl: "https://www.cityofbrea.gov/124/Building-Safety-Division",
  },

  hazards: [
    {
      text: "The State Fire Marshal's March 24, 2025 map for Brea, published by the city, shows the Very High tier across the northern hills and along Carbon Canyon, edged by narrow High and Moderate bands; the flat southwest is unzoned. The city warns that many residents not previously in a high risk zone may now be in one.",
      sourceUrl: "https://www.cityofbrea.gov/CivicAlerts.aspx?AID=2423&ARC=5301",
      sourceLabel: "City of Brea, Cal Fire releases updated fire zone maps",
    },
    {
      text: "The November 2008 Freeway Complex Fire burned inside Brea. Its Landfill Fire, reported at 10:43 a.m. on November 15 near the Olinda Alpha Landfill, destroyed four Brea homes, damaged six, burned 980 acres and damaged Brea Olinda and Brea Canyon high schools. Investigators traced it to poorly maintained power lines feeding oil field equipment.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
      sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
    },
    {
      text: "Selling a home in a High or Very High zone requires a defensible space inspection under Assembly Bill 38 (Civil Code section 1102.19). A Brea Fire Prevention Bureau inspector checks vegetation clearance, combustible debris, spacing around woodpiles and outbuildings, and the state's Zone 0 standard before close of escrow.",
      sourceUrl:
        "https://www.cityofbrea.gov/1863/Defensible-Space-Disclosure-Inspections",
      sourceLabel: "City of Brea Fire Department, defensible space disclosure inspections",
    },
    {
      text: "Brea runs its own fire department: 54 fire professionals and four stations covering 12.43 square miles of residential, commercial and wildland interface areas.",
      sourceUrl: "https://www.cityofbrea.gov/297/Our-Department",
      sourceLabel: "City of Brea Fire Department, our department",
    },
    {
      text: "Two faults traverse Brea. The active Whittier Fault cuts northwest through the hills and the eastern half of the city inside a state Alquist-Priolo zone, and the Elysian Park Thrust lies about 6 to 10 miles down. Just over 12.6 percent of residents and about 1.5 square miles sit in a liquefaction zone, mainly along Tonner Canyon Creek, Brea Canyon and around Carbon Canyon Dam.",
      sourceUrl:
        "https://www.cityofbrea.gov/DocumentCenter/View/17657/City-of-Brea_LHMP_FINAL_with-Appendices",
      sourceLabel: "City of Brea, 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "Landslides and the debris flows that follow are Brea's dominant geologic hazard, most likely along Carbon Canyon Road and Brea Canyon. Slides closed Carbon Canyon Road twice in February 1998, mud came off slopes burned by the Freeway Complex Fire in December 2008, and the 2014 La Habra earthquake set off several slides in Carbon Canyon.",
      sourceUrl:
        "https://www.cityofbrea.gov/DocumentCenter/View/17657/City-of-Brea_LHMP_FINAL_with-Appendices",
      sourceLabel: "City of Brea, 2024 Local Hazard Mitigation Plan",
    },
    {
      text: "Oil is still a working land use. Citing CalGEM, the hazard plan counts 879 wells in the city: 261 active, 463 plugged, 152 idle and 3 canceled, with active wells in the hills close to neighborhoods, and says a large portion of the city is in a methane zone. CalGEM's Well Finder map shows wells by parcel.",
      sourceUrl:
        "https://www.cityofbrea.gov/DocumentCenter/View/17657/City-of-Brea_LHMP_FINAL_with-Appendices",
      sourceLabel: "City of Brea, 2024 Local Hazard Mitigation Plan, citing CalGEM",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb: "Brea requires Class A roofing on every reroof and caps a roof at two layers.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "Brea's blended water tests at 13 to 14 grains per gallon.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb: "The 1970s is Brea's largest housing decade, and many panels are original.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Includes clearing slope drains before winter on a Carbon Canyon or hillside lot.",
    },
  ],

  neighbors: ["la-habra", "fullerton", "yorba-linda", "placentia"],

  faq: [
    {
      q: "Does the City of Brea supply water to every address in town?",
      a: "No. The city's 2025 Urban Water Management Plan says its Water Division serves all of Brea except the Vesuvius tract at the eastern end, which Yorba Linda Water District serves.",
    },
    {
      q: "Who sends brush clearance notices in Brea?",
      a: "The Brea Fire Department's Fire Prevention Bureau, part of the city rather than the county fire authority. The same bureau does the defensible space inspection required when a home in a High or Very High zone is sold.",
    },
  ],

  updated: "2026-09-20",
};
