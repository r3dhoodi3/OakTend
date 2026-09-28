import type { CityContent } from "./types";

// Fullerton. Researched 2026-09-19 for the second city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: an 1887 railroad town
// with a real pre-1950 housing stock, a postwar boom on top of it, a water
// system whose source depends on which of three areas you live in, two Army
// Corps flood control dams inside city limits, and Coyote Hills land in the
// state's Very High fire hazard tier.
//
// WATER NUMBERS are from the city's report for reporting year 2025, read from
// the State Water Board's report portal. Plain text extraction scrambles the
// rows of that table, so the hardness rows were rebuilt from word positions
// on the page and checked against the prior year's report.
//
// THE CITY WEBSITE BLOCKS AUTOMATED READS. The Building and Safety page was
// read through an archived copy from May 2026. We could not read the permit
// processing page, so nothing here says which permits are over the counter.
// The fire hazard zone acreage comes from the local newspaper's report of the
// council vote because the city's own page was not reachable; it is labeled
// as such.
//
// LEFT OUT ON PURPOSE. The share of groundwater versus imported water (the
// current report gives none), methane and old oil well claims for the Coyote
// Hills (only a blog makes them), landslide and liquefaction statements (no
// city document was readable), Santa Ana wind claims, and the Sunny Hills,
// Golden Hills and Raymond Hills build eras (real-estate pages only).

export const fullerton: CityContent = {
  name: "Fullerton",
  slug: "fullerton",
  intro:
    "Fullerton was founded in 1887 and incorporated in 1904, so unlike most of Orange County it has a real stock of pre-1950 homes and 16 identified historic districts. Its population quadrupled in the 1950s, and the hillside lots beside the Coyote Hills sit in a Very High fire hazard zone that grew in 2025.",
  metaDescription:
    "Fullerton runs from 1920s bungalows to 1950s tracts to Coyote Hills lots. Water hardness by service area, EasyDev permits, historic districts, fire zones.",
  metaTitle: "Fullerton: 1920s bungalows to Coyote Hills lots",

  population: {
    value: "About 140,051 people",
    asOf: "ACS 2024 one-year estimate, table B01003; the 2020 Census counted 143,617",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0628000",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1969",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0628000",
      sourceLabel: "Census Reporter, ACS 2024 one-year table B25035",
    },
    facts: [
      {
        text: "Of about 52,304 housing units, roughly 7.8 percent predate 1950, 20.9 percent went up in the 1950s, 23.0 percent in the 1960s and 19.5 percent in the 1970s; about 14.3 percent date from 2000 or later. The pre-1950 houses bring raised foundations, older wiring and plaster that the tracts do not.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0628000",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "Census counts show when the building happened: 10,442 people in 1940, 13,958 in 1950, 56,180 in 1960 and 85,987 in 1970. The newest large neighborhood, Amerige Heights, went up from 2001 to 2004 on the 293-acre former Hughes Aircraft Ground Systems campus in the west of the city.",
        sourceUrl: "https://en.wikipedia.org/wiki/Fullerton,_California",
        sourceLabel: "Wikipedia, citing U.S. Census counts",
      },
      {
        text: "Owners in 10 of Fullerton's 16 historic districts have a residential preservation zone, which makes additions and new development follow the district's historical character.",
        sourceUrl: "https://www.fullertonheritage.org/design-guidelines.php",
        sourceLabel: "Fullerton Heritage, historic districts and preservation zones",
      },
      {
        text: "Fullerton averages about 11.86 inches of rain a year, mostly December through March, per NOAA normals. The long dry season's sun on roofing, paint and sealants is the everyday wear.",
        sourceUrl: "https://en.wikipedia.org/wiki/Fullerton,_California",
        sourceLabel: "Wikipedia, Fullerton climate table citing NOAA",
      },
      {
        text: "The city runs its own Fullerton Fire Department, responding from Fire Stations 1 through 6; Station 1 at 312 E. Commonwealth Avenue is headquarters.",
        sourceUrl:
          "https://www.cityoffullerton.com/government/departments/fire/about-us/fire-station-locations-fire-apparatus",
        sourceLabel: "City of Fullerton Fire Department, fire station locations",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Downtown Fullerton",
      "SOCO District",
      "Sunny Hills",
      "Amerige Heights",
      "West Coyote Hills",
    ],
    note: "Downtown is the 1887 townsite along the railroad, and the city brands the blocks south of Commonwealth Avenue the SOCO District. Sunny Hills surrounds Laguna Lake. West Coyote Hills was an oil field from 1890, now mostly homes and a park, while a 510-acre tract on the ridge has been fought over for years, including a 2012 referendum in which voters rejected building on it.",
    sourceUrl: "https://en.wikipedia.org/wiki/West_Coyote_Hills",
  },

  water: {
    utility: "City of Fullerton Water System Management",
    utilityUrl:
      "https://www.cityoffullerton.com/government/departments/public-works/water-system/water-quality",
    summary:
      "Fullerton runs its own water system, and the city's report maps three areas: Area 1 gets mostly groundwater, Area 3 imported water and Area 2 a mix, though sources can change in a drought or emergency. In 2025 the groundwater averaged 246 ppm of hardness, about 14 grains per gallon (range 195 to 375), and imported Metropolitan water averaged 236 ppm from the Diemer plant and 234 from Weymouth (range 189 to 280). Both are hard.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010010&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Fullerton Building and Safety Division",
    portalUrl:
      "https://easydev.cityoffullerton.com/energov_prod/selfservice#/home",
    summary:
      "Building and Safety is on the second floor of City Hall, 303 W Commonwealth Avenue, and takes online applications through its EasyDev self service portal. Its direct line is 714-738-6541, with a separate 24-hour inspection request line. The division's page also points owners of older raised-foundation houses to the state's Earthquake Brace and Bolt grants.",
    sourceUrl:
      "https://www.cityoffullerton.com/government/departments/community-and-economic-development/building-and-safety",
  },

  hazards: [
    {
      text: "The City Council adopted the state's updated Fire Hazard Severity Zone maps on May 6, 2025. Per the Fullerton Observer, the Very High zone grew from 1,186 to 1,516 acres, with 419 acres High and 426 Moderate, centered on the West and East Coyote Hills. Major work in High and Very High zones falls under the state's Chapter 7A fire-resistant building standards.",
      sourceUrl:
        "https://fullertonobserver.com/2025/05/12/fullerton-adopted-updated-fire-hazard-severity-zones-what-residents-needed-to-know/",
      sourceLabel: "Fullerton Observer, report on the May 6, 2025 council vote",
    },
    {
      text: "Brea Dam, a federal flood control dam completed in March 1942 just upstream of where Brea and Harbor boulevards fork, sits inside the city, and Brea Creek then runs through the central business district. Low ground near the creek is worth a FEMA flood map lookup.",
      sourceUrl: "https://resreg.spl.usace.army.mil/pages/brea.php",
      sourceLabel: "U.S. Army Corps of Engineers, Brea Dam",
    },
    {
      text: "Fullerton Dam, completed in May 1941 just west of the 57 Freeway and Bastanchury Road, controls 5.0 square miles of Fullerton Creek's drainage. Both dams came out of the Flood Control Act of 1936, and their concrete channels cross some of the older neighborhoods.",
      sourceUrl: "https://resreg.spl.usace.army.mil/pages/fltn.php",
      sourceLabel: "U.S. Army Corps of Engineers, Fullerton Dam",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "About seven in ten Fullerton homes predate 1980; typical upgrade costs and the warning signs.",
    },
    {
      href: "/guides/earthquake-retrofit-orange-county",
      title: "Earthquake retrofit in Orange County",
      blurb:
        "Bolting and bracing for the older raised-foundation houses near downtown, and the state grant.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Both city water sources average about 14 grains per gallon, hard enough to shorten a tank's life.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "The seasonal list, timed to a wet season that runs December through March.",
    },
  ],

  neighbors: ["anaheim", "brea", "buena-park", "la-habra"],

  faq: [
    {
      q: "Is my Fullerton house in a preservation zone?",
      a: "Only if it sits in one of the historic districts where a majority of owners asked for the zone. Ask the city before you design an addition, window change or second unit, and expect a review step beyond the building permit if it is.",
    },
    {
      q: "Which Fullerton permits are issued over the counter?",
      a: "Unconfirmed. The city's permit processing page could not be read for this page, so ask Building and Safety on its direct line before you plan around a same-day permit.",
    },
  ],

  updated: "2026-09-20",
};
