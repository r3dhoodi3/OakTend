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
    "Fullerton was founded in 1887 and incorporated in 1904, which gives it something most Orange County cities lack: a real stock of homes from before 1950, including 16 identified historic districts. The Census then counted 13,958 people in 1950 and 56,180 in 1960, and that one decade of tract building is why the median build year sits at 1969. Add hillside neighborhoods beside the Coyote Hills, where the state's Very High fire hazard zone grew in 2025, and one page has to cover a 1920s bungalow, a 1950s ranch house and a hillside lot.",
  metaDescription:
    "Fullerton runs from 1920s bungalows to 1950s tracts to the Coyote Hills. Water hardness by area, permits, historic districts and fire zones.",
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
        text: "Fullerton's median year built is 1969. Of about 52,304 housing units, roughly 7.8 percent predate 1950, 20.9 percent went up in the 1950s, 23.0 percent in the 1960s and 19.5 percent in the 1970s, so about seven in ten homes are older than 1980, while about 14.3 percent date from 2000 or later. The pre-1950 share is the unusual part for this county, and those houses bring raised foundations, older wiring methods and plaster that the tract homes do not.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0628000",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "Decennial Census counts show when the building happened: 10,442 people in 1940, 13,958 in 1950, 56,180 in 1960 and 85,987 in 1970. The newest large neighborhood is Amerige Heights, built between 2001 and 2004 on the 293-acre former Hughes Aircraft Ground Systems campus in the western part of the city.",
        sourceUrl: "https://en.wikipedia.org/wiki/Fullerton,_California",
        sourceLabel: "Wikipedia, citing U.S. Census counts",
      },
      {
        text: "Fullerton has identified 16 historic districts, and property owners in 10 of them have asked for and received a residential preservation zone, which makes new development and additions follow the district's established historical character. A zone is applied only when a majority of owners in the district want it. If you own an older home near downtown, find out whether you are in one before you plan an addition, window change or second unit.",
        sourceUrl: "https://www.fullertonheritage.org/design-guidelines.php",
        sourceLabel: "Fullerton Heritage, historic districts and preservation zones",
      },
      {
        text: "Fullerton averages about 11.86 inches of rain a year, most of it from December through March, according to the NOAA normals reproduced in the city's Wikipedia entry. It gets less marine-layer cooling than the coast, so the long dry season's sun on roofing, paint and sealants is the everyday wear, and the short wet season is when drainage gets tested.",
        sourceUrl: "https://en.wikipedia.org/wiki/Fullerton,_California",
        sourceLabel: "Wikipedia, Fullerton climate table citing NOAA",
      },
      {
        text: "Fire service in Fullerton comes from the city's own department, the Fullerton Fire Department. The city's station page says the department is ready to respond from six city locations and lists Fire Stations 1 through 6 with the engines, trucks and ambulances assigned to them. Station 1 at 312 E. Commonwealth Avenue is the headquarters.",
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
    note: "Downtown is the 1887 townsite along the railroad, and the city itself brands the blocks south of Commonwealth Avenue as the SOCO District. Sunny Hills is the area around Laguna Lake. Amerige Heights is the 2001 to 2004 community on the former Hughes Aircraft site. West Coyote Hills was a major oil field dating back to 1890; extraction has long since ceased and most of it has been developed for homes and a park, while a 510-acre tract across the ridge has been the subject of a long development fight, including a 2012 referendum in which voters rejected building on it. Other hillside names are in everyday use, but we found build dates for them only on real-estate pages, so they are not described here.",
    sourceUrl: "https://en.wikipedia.org/wiki/West_Coyote_Hills",
  },

  water: {
    utility: "City of Fullerton Water System Management",
    utilityUrl:
      "https://www.cityoffullerton.com/government/departments/public-works/water-system/water-quality",
    summary:
      "Fullerton runs its own water system, and which water you get depends on where you live. The city's report maps three areas: Area 1 receives primarily groundwater, Area 3 receives imported water, and Area 2 receives a mix, with the caveat that sources can change in a drought or emergency. In 2025 testing the city's groundwater averaged 246 ppm of hardness, about 14 grains per gallon, with a range of 195 to 375 ppm. The imported Metropolitan water averaged 236 ppm from the Diemer plant and 234 ppm from the Weymouth plant, also about 14 grains per gallon, with a range of 189 to 280 ppm. Both are hard, and in 2025 they were close to each other, so the area map mattered less for scale than it does in some years.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010010&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Fullerton Building and Safety Division",
    portalUrl:
      "https://easydev.cityoffullerton.com/energov_prod/selfservice#/home",
    summary:
      "The Building and Safety Division is on the second floor of City Hall at 303 W Commonwealth Avenue, and the city takes residential and commercial online permit applications through its customer self service portal, which it calls EasyDev. The division's page lists 714-738-6541 as its direct line and a separate 24-hour inspection request line. The same page points homeowners to the state's Earthquake Brace and Bolt retrofit grants, which fits a city with this many older raised-foundation houses. We could not read the city's permit processing page, so we are not going to tell you which permits are issued over the counter; ask the division when you call.",
    sourceUrl:
      "https://www.cityoffullerton.com/government/departments/community-and-economic-development/building-and-safety",
  },

  hazards: [
    {
      text: "The Fullerton City Council adopted the state's updated Fire Hazard Severity Zone maps on May 6, 2025. As reported by the Fullerton Observer, the Very High zone in Fullerton grew from 1,186 acres to 1,516 acres, with a further 419 acres classed High and 426 acres Moderate, and the expansions center on the West and East Coyote Hills. New construction and major renovation in the High and Very High zones falls under the state's Chapter 7A fire-resistant building standards. Check your own parcel on the state's viewer.",
      sourceUrl:
        "https://fullertonobserver.com/2025/05/12/fullerton-adopted-updated-fire-hazard-severity-zones-what-residents-needed-to-know/",
      sourceLabel: "Fullerton Observer, report on the May 6, 2025 council vote",
    },
    {
      text: "Two federal flood control dams sit inside the city. The Army Corps of Engineers describes Brea Dam, completed in March 1942 just upstream of where Brea Boulevard and Harbor Boulevard fork, as a single purpose flood control project whose creek then runs through Fullerton's central business district. Low ground near Brea Creek is where a FEMA map lookup is worth the two minutes before you buy or remodel.",
      sourceUrl: "https://resreg.spl.usace.army.mil/pages/brea.php",
      sourceLabel: "U.S. Army Corps of Engineers, Brea Dam",
    },
    {
      text: "Fullerton Dam is the second. The Corps places it in the eastern part of the city just west of the 57 Freeway and Bastanchury Road, completed in May 1941, controlling 5.0 square miles of Fullerton Creek's drainage. Both dams were conceived under the Flood Control Act of 1936, and the concrete channels below them cross some of the city's older neighborhoods.",
      sourceUrl: "https://resreg.spl.usace.army.mil/pages/fltn.php",
      sourceLabel: "U.S. Army Corps of Engineers, Fullerton Dam",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "The common big-ticket item in a pre-1980 house, with the typical range and the warning signs.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, and why material choice is a code question near the Coyote Hills.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on water that averages about 14 grains per gallon.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, built around a wet season that runs December through March and a long dry stretch of sun on roofing and paint.",
    },
  ],

  neighbors: ["anaheim", "brea", "buena-park", "la-habra"],

  faq: [
    {
      q: "Is Fullerton's water hard?",
      a: "Yes. The city's report for 2025 shows both of its sources averaging about 14 grains per gallon, the groundwater a little higher in ppm and with a wider range than the imported water. The report also maps which of three areas gets mostly groundwater, mostly imported water or a mix. Either way, scale in water heaters and on fixtures is normal upkeep here rather than a sign that something is wrong.",
    },
    {
      q: "Is my Fullerton home in a fire hazard severity zone?",
      a: "Most of the city is not, but the hills are a different story. The council adopted the state's updated maps in May 2025, and local reporting on that vote put the growth in the Very High zone around the West and East Coyote Hills. The zone is assigned by parcel, so use the state's Fire Hazard Severity Zone viewer for your address. If you are in a High or Very High zone, roofing, vents and siding choices on a major project are governed by the state's fire-resistant building standards.",
    },
    {
      q: "Do I need approval to change the outside of an older Fullerton house?",
      a: "You might. Fullerton has identified historic districts, and owners in most of them have had a residential preservation zone applied, which makes additions and new construction follow the district's historical character. It only applies inside those districts. Ask the city whether your address is in one before you design an addition, and expect a review step beyond the ordinary building permit if it is.",
    },
    {
      q: "How do I apply for a building permit in Fullerton?",
      a: "Online, through the city's customer self service portal, which it calls EasyDev, or through the Building and Safety Division on the second floor of City Hall. We could not confirm which small jobs the city issues over the counter, so call the division's line on its page and ask. A licensed contractor normally pulls the permit for a water heater, panel or reroof as part of the job.",
    },
    {
      q: "Why does Fullerton have flood control dams?",
      a: "Because Brea Creek and Fullerton Creek run through it. The Army Corps of Engineers built Brea Dam and Fullerton Dam in the early 1940s as single purpose flood control projects, and Brea Creek continues through the central business district below the dam. For a homeowner the practical step is a FEMA flood map lookup for the address, especially on low ground near either creek or its channel.",
    },
    {
      q: "Who provides fire service in Fullerton?",
      a: "The Fullerton Fire Department, which is the city's own department. The city's station page says it responds from six city locations, Fire Stations 1 through 6, and lists the engines, trucks and ambulances assigned to them. Station 1 at 312 E. Commonwealth Avenue is the headquarters.",
    },
  ],

  updated: "2026-09-20",
};
