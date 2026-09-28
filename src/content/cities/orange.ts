import type { CityContent } from "./types";

// Orange. Researched 2026-09-19 for the second city wave. Every number below
// was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: preservation. Old Towne
// is a one-square-mile National Register district, three Eichler tracts are
// locally designated historic districts with their own design standards, and
// exterior work in either is a review question before it is a permit
// question. No other Orange County city has that at this scale.
//
// WATER NUMBERS are from the city's 2025 Consumer Confidence Report, read from
// the State Water Board's report portal. That report has ONE hardness row for
// the whole system and does not split groundwater from imported water, so the
// page says exactly that.
//
// THE CITY WEBSITE BLOCKS AUTOMATED READS. The Building and Safety Services
// page was read through an archived copy from June 2026; the fire map vote is
// from the council's own minutes on Legistar.
//
// LEFT OUT ON PURPOSE. Which parts of the city the state fire map covers and
// how many acres (the adopted map itself was not readable), any home losses
// from the 2017 Canyon Fire 2 (the counts found belong to Anaheim Hills), the
// share of groundwater versus imported water, liquefaction and dam inundation
// (no city document was readable), rainfall (the only figure is countywide),
// build eras for Santiago Hills and Serrano Heights (real-estate pages only),
// and whether the Serrano Heights special tax is still being levied.

export const orange: CityContent = {
  name: "Orange",
  slug: "orange",
  intro:
    "Orange's Old Towne, the square mile around the Plaza, is described as the largest National Register district in California, and three 1960s Eichler tracts are local historic districts of their own. The rest of the city is mostly 1960s and 1970s suburb, with a median build year of 1973. In the historic districts exterior work starts with design review; everywhere else it starts with an ordinary permit.",
  metaDescription:
    "Orange pairs the Old Towne historic district and three Eichler tracts with 1960s suburbs. Design review, 18-grain water and online-only permits, sourced.",
  metaTitle: "Orange homes: Old Towne, Eichlers and hard water",

  population: {
    value: "About 137,957 people",
    asOf: "ACS 2024 one-year estimate, table B01003; the 2020 Census counted 139,911",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0653980",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1973",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0653980",
      sourceLabel: "Census Reporter, ACS 2024 one-year table B25035",
    },
    facts: [
      {
        text: "Of about 46,126 housing units, roughly 5.3 percent predate 1950, 12.6 percent date from the 1950s, 26.2 percent from the 1960s and 20.3 percent from the 1970s, close to two thirds before 1980. About 14.2 percent is from 2000 or later.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0653980",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "Founded in 1869 and incorporated on April 6, 1888, Orange stayed small for decades: 7,901 people in 1940 and 10,027 in 1950. It then grew to 26,444 in 1960 and 77,365 in 1970, which is why the nineteenth century core gives way to a 1960s suburb a few blocks from the Plaza.",
        sourceUrl: "https://en.wikipedia.org/wiki/Orange,_California",
        sourceLabel: "Wikipedia, citing U.S. Census counts",
      },
      {
        text: "The Old Towne Orange Historic District, one square mile centered on Plaza Park, joined the National Register of Historic Places on July 11, 1997. It holds many of the original post-incorporation buildings, including a large number of ordinary owner-occupied houses.",
        sourceUrl:
          "https://en.wikipedia.org/wiki/Old_Towne,_Orange_Historic_District",
        sourceLabel: "Wikipedia, Old Towne Orange Historic District",
      },
      {
        text: "The three Eichler tracts, Fairhaven, Fairmeadow and Fairhills, were built between 1960 and 1964 and total nearly 350 properties. In late 2018 the City Council made all three local historic districts with their own design standards. Post and beam framing, low-slope roofs and radiant slab heat make them their own maintenance category, and roofing and window choices are a design standards question.",
        sourceUrl:
          "https://www.preserveorangecounty.org/places/2019/5/21/the-eichlers-of-orange-fairhaven-fairmeadow-fairhills",
        sourceLabel: "Preserve Orange County, the Eichlers of Orange",
      },
      {
        text: "Fire service comes from the city's own Orange City Fire Department, which lists eight stations, numbered 1 through 8. Station 1 and the main office share 1176 E. Chapman Avenue, open Monday through Thursday, 7 a.m. to 6 p.m.",
        sourceUrl: "https://orangecityfire.org/locate-a-station",
        sourceLabel: "Orange City Fire Department, locate a station",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Old Towne",
      "The Plaza",
      "Fairhaven",
      "Fairmeadow",
      "Fairhills",
      "Serrano Heights",
    ],
    note: "Old Towne runs roughly between Walnut and La Veta avenues and Batavia and Cambridge streets, with more than 1,300 vintage buildings according to Preserve Orange County. Fairhaven, Fairmeadow and Fairhills are the Eichler tracts, and Serrano Heights is named in the city's community facilities district records.",
    sourceUrl:
      "https://www.preserveorangecounty.org/places/2018/10/4/orange-plaza-historic-district",
  },

  water: {
    utility: "City of Orange Water Division",
    utilityUrl: "https://www.cityoforange.org/ccr",
    summary:
      "The city runs its own water system. Its 2025 Consumer Confidence Report lists three sources: mainly groundwater from city wells drilled about 1,000 feet into the Santa Ana River aquifer, then Metropolitan Water District imports from the Colorado River and Northern California, and a small amount from the Serrano Water District. System hardness averages 300 ppm, about 18 grains per gallon, with a range of 130 to 380 ppm, or 8 to 22 grains. The report does not split hardness by source, so where your address falls in that range takes a tap test.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010027&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Orange Building and Safety Services",
    portalUrl: "https://h2.maintstar.co/orange/portal/#/",
    summary:
      "The Building Division accepts permit applications only through its Civic Portal, where you set up an account and a signature before the Building Division tab opens. The office is at 300 E. Chapman Avenue, 714-744-7200, with counter hours of 8 a.m. to 3 p.m., closed alternating Fridays. No readable city page describes the review track for water heater, HVAC, reroof or panel work, so plan on a permit for each.",
    sourceUrl:
      "https://www.cityoforange.org/business/building-and-safety-services",
  },

  hazards: [
    {
      text: "Orange has state-mapped fire hazard zones. On May 13, 2025 the City Council introduced Ordinance No. 07-25, adopting the State Fire Marshal's recommended Fire Hazard Severity Zone map for the city's local responsibility area, 5 to 0. The adopted map was not readable, so check your address on the state's zone viewer.",
      sourceUrl:
        "https://cityoforange.legistar.com/View.ashx?GUID=4E7CFC2A-AB1B-48F7-9FB6-748D486D73F3&ID=14230053&M=F",
      sourceLabel: "City of Orange, City Council minutes of May 13, 2025",
    },
    {
      text: "The Old Towne Preservation Association lists the historic design standards violations it sees most: vinyl windows, vinyl fences, solar panels and synthetic turf visible from the street, and replacing historic exterior fabric with inappropriate materials.",
      sourceUrl: "https://otpa.org/resources/drc/",
      sourceLabel: "Old Towne Preservation Association, design review",
    },
    {
      text: "The Mills Act lets the city grant property tax relief to owners of qualified historic properties who contract to maintain them to preservation standards for at least 10 years. Orange caps it at 20 new contracts per tax year, and the Planning Department keeps a waiting list.",
      sourceUrl: "https://otpa.org/preservation/mills-act/",
      sourceLabel: "Old Towne Preservation Association, Mills Act",
    },
    {
      text: "A City Council resolution records Community Facilities District No. 91-2, Serrano Heights Public Improvements, a Mello-Roos district with two improvement areas and a special tax lien. Whether a parcel still pays shows in the special assessments section of its tax bill.",
      sourceUrl:
        "https://citydocs.cityoforange.org/WebLink/edoc/244158106/RES-8623%20Notice%20of%20Special%20Tax%20Lien%20Community%20Facilities%20District%20No.%2091-2%20Serrano%20Heights.pdf?dbid=0&repo=CityofOrange",
      sourceLabel: "City of Orange, Resolution No. 8623",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "The 1960s are Orange's biggest decade of homes, and many still run their original panels.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Useful before design review, since Eichler and Old Towne roofing is held to district standards.",
    },
    {
      href: "/guides/hard-water-orange-county",
      title: "Hard water in Orange County",
      blurb:
        "City water averages about 18 grains per gallon and ranges up to 22.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "The yearly routine for an inland 1970s house, on water hard enough to scale a tank.",
    },
  ],

  neighbors: ["anaheim", "tustin", "santa-ana", "villa-park"],

  faq: [
    {
      q: "Is El Modena or Orange Park Acres part of the City of Orange?",
      a: "No, even though the mailing address says Orange. El Modena, North El Modena, Orange Park Acres and Olive are unincorporated county areas surrounded by the city, so permits and code enforcement there are the county's, not the city's.",
    },
    {
      q: "Do I need approval to replace windows on an Old Towne Orange house?",
      a: "Yes. Exterior changes in Old Towne and the Eichler districts go through design review against the city's standards before the building permit, as a separate step, so talk to the city's planning staff before you order.",
    },
  ],

  updated: "2026-09-20",
};
