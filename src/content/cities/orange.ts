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
    "Orange incorporated in 1888, and the square mile around its Plaza is still there: Old Towne was listed on the National Register of Historic Places in 1997 and is described as the largest National Register district in California. Most of the city is far younger than that, built as the population went from 10,027 in 1950 to 77,365 in 1970, and the median build year is 1973. For a homeowner the practical split is this: in Old Towne and in the three Eichler tracts, exterior work starts with design review, and everywhere else it starts with an ordinary permit.",
  metaDescription:
    "Orange pairs a National Register historic district and Eichler tracts with 1960s suburbs. Design review, hard water and permit steps, sourced.",

  population: {
    value: "About 137,957 people",
    asOf: "ACS 2024 one-year estimate, table B01003; the 2020 Census counted 139,911",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0653980",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1973",
    facts: [
      {
        text: "Orange's median year built is 1973. Of about 46,126 housing units, roughly 5.3 percent predate 1950, 12.6 percent went up in the 1950s, 26.2 percent in the 1960s and 20.3 percent in the 1970s, which puts close to two thirds of the city before 1980, while about 14.2 percent dates from 2000 or later. The 1960s are the single biggest decade, so original panels, cast iron drains and first-generation central air are the common conversations.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0653980",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "Orange was founded in 1869 and incorporated on April 6, 1888, and it stayed small for decades: the Census counted 7,901 people in 1940 and 10,027 in 1950. Then it grew to 26,444 in 1960 and 77,365 in 1970. That is why a city with a nineteenth century core is mostly a 1960s suburb once you leave the blocks around the Plaza.",
        sourceUrl: "https://en.wikipedia.org/wiki/Orange,_California",
        sourceLabel: "Wikipedia, citing U.S. Census counts",
      },
      {
        text: "The Old Towne Orange Historic District is a one-square-mile district centered on Plaza Park, added to the National Register of Historic Places on July 11, 1997 and described as the largest National Register district in California. It contains many of the original structures built after the city's incorporation, which means a large number of ordinary owner-occupied houses, not just storefronts, sit inside a historic district.",
        sourceUrl:
          "https://en.wikipedia.org/wiki/Old_Towne,_Orange_Historic_District",
        sourceLabel: "Wikipedia, Old Towne Orange Historic District",
      },
      {
        text: "Orange has three Eichler tracts, Fairhaven, Fairmeadow and Fairhills, built between 1960 and 1964 and totaling nearly 350 properties. In late 2018 the City Council designated all three as local historic districts and adopted design standards for them. Post and beam construction, flat or low-slope roofs and radiant slab heating make these houses their own maintenance category, and roofing and window choices are now a design standards question as well.",
        sourceUrl:
          "https://www.preserveorangecounty.org/places/2019/5/21/the-eichlers-of-orange-fairhaven-fairmeadow-fairhills",
        sourceLabel: "Preserve Orange County, the Eichlers of Orange",
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
    note: "Old Towne is the historic square mile around the Plaza, roughly between Walnut and La Veta avenues and Batavia and Cambridge streets, with more than 1,300 vintage buildings according to Preserve Orange County. Fairhaven, Fairmeadow and Fairhills are the three Eichler tracts. Serrano Heights is a community named in the city's own community facilities district records. Several places people think of as Orange are not in the city at all: El Modena, North El Modena, Orange Park Acres and Olive are unincorporated county areas surrounded by the city, which changes who issues a permit there.",
    sourceUrl:
      "https://www.preserveorangecounty.org/places/2018/10/4/orange-plaza-historic-district",
  },

  water: {
    utility: "City of Orange Water Division",
    utilityUrl: "https://www.cityoforange.org/ccr",
    summary:
      "The city runs its own water system. Its 2025 Consumer Confidence Report says Orange's water comes from three sources: primarily groundwater from municipal wells drilled about 1,000 feet into the Santa Ana River aquifer, second, water imported by the Metropolitan Water District from the Colorado River and Northern California, and a small amount purchased from the Serrano Water District. The report lists total hardness for the system at an average of 300 ppm, about 18 grains per gallon, with a range of 130 to 380 ppm, or 8 to 22 grains. It does not break hardness out by source, so we cannot tell you the groundwater figure separately from the imported one. Either way it is hard water, and the range is wide enough that your address matters.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010027&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Orange Building and Safety Services",
    portalUrl: "https://h2.maintstar.co/orange/portal/#/",
    summary:
      "Orange has gone fully online for applications: the city's page says the Building Division accepts all permit applications only through its Civic Portal, where you create an account and a signature before the Building Division tab becomes useful. The office is at 300 E. Chapman Avenue, and its page lists 714-744-7200 and counter hours of 8 a.m. to 3 p.m., closed alternating Fridays. We could not read a city page describing how water heater, HVAC, reroof or panel permits are reviewed, so plan on a permit for each and let the portal or the counter tell you the track. In Old Towne and the Eichler districts, exterior changes also go through design review, so start that conversation before ordering materials.",
    sourceUrl:
      "https://www.cityoforange.org/business/building-and-safety-services",
  },

  hazards: [
    {
      text: "Orange has state-mapped fire hazard zones. At its May 13, 2025 meeting the City Council introduced Ordinance No. 07-25, adopting the State Fire Marshal's recommended Fire Hazard Severity Zone map for the city's local responsibility area, on a 5 to 0 vote. We could not read the adopted map itself, so this page will not name neighborhoods or acreage; the state's zone viewer answers by address.",
      sourceUrl:
        "https://cityoforange.legistar.com/View.ashx?GUID=4E7CFC2A-AB1B-48F7-9FB6-748D486D73F3&ID=14230053&M=F",
      sourceLabel: "City of Orange, City Council minutes of May 13, 2025",
    },
    {
      text: "Old Towne has real rules and a watchful neighborhood association. The Old Towne Preservation Association lists the most common violations of the city's historic design standards it sees: vinyl windows, vinyl fences, solar panels and synthetic turf visible from the street, and removing or replacing exterior historic fabric with inappropriate materials. If you own in the district, check the standards before you sign for windows, fencing, solar or a porch rebuild.",
      sourceUrl: "https://otpa.org/resources/drc/",
      sourceLabel: "Old Towne Preservation Association, design review",
    },
    {
      text: "The Mills Act can offset some of that cost. It lets the city grant property tax relief to owners of qualified historic properties who agree by contract to maintain them to preservation standards for at least 10 years. Orange caps the program at 20 new contracts per tax year and the Planning Department keeps a waiting list, so apply early if you plan to stay.",
      sourceUrl: "https://otpa.org/preservation/mills-act/",
      sourceLabel: "Old Towne Preservation Association, Mills Act",
    },
    {
      text: "Orange has at least one Mello-Roos district on the books. A City Council resolution records the City of Orange Community Facilities District No. 91-2, Serrano Heights Public Improvements, formed under the Mello-Roos Community Facilities Act of 1982 with two improvement areas and a special tax lien. Whether a given parcel still pays is a tax bill question: check the special assessments section of yours, or the county Treasurer-Tax Collector's lookup.",
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
        "Typical range and warning signs, for a city where the 1960s are the biggest single decade of homes.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, useful before a design review conversation in Old Towne or an Eichler tract.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Price range and when a repair still makes sense, on water that averages about 18 grains per gallon.",
    },
    {
      href: "/guides/is-my-contractor-quote-fair",
      title: "Is my contractor quote fair?",
      blurb:
        "How to read a quote line by line, including whether it accounts for historic district requirements.",
    },
  ],

  neighbors: ["anaheim", "tustin", "santa-ana"],

  faq: [
    {
      q: "Do I need approval to replace windows on an Old Towne Orange house?",
      a: "Expect a review, and do not assume vinyl will pass. Old Towne is a National Register historic district with city design standards, and the Old Towne Preservation Association names vinyl windows as one of the most common violations it reports. Talk to the city's planning staff about design review before you order, and treat that review and the building permit as two separate steps on the calendar.",
    },
    {
      q: "Are the Eichler homes in Orange protected?",
      a: "Yes. The three Eichler tracts, Fairhaven, Fairmeadow and Fairhills, were designated local historic districts by the City Council in late 2018, with design standards adopted alongside. For an owner that means exterior work such as roofing, windows, fencing and paint is measured against those standards. It also means the things that make the houses worth owning are less likely to disappear from the house next door.",
    },
    {
      q: "Is the City of Orange's water hard?",
      a: "Yes. The city's report lists total hardness averaging about 18 grains per gallon across the system, with a range wide enough that one address can be noticeably harder than another. The report does not separate groundwater from imported water, so there is no honest way to tell you which end of the range you are on without testing at your tap. Plan for scale in the water heater and on fixtures either way.",
    },
    {
      q: "How do I apply for a building permit in Orange?",
      a: "Online only. The city's Building and Safety Services page says the Building Division accepts all permit applications only through its Civic Portal, where you set up an account and signature first. A licensed contractor normally pulls the permit for a water heater, panel, HVAC or roofing job. If your house is in Old Towne or an Eichler district, settle design review for any exterior change before you apply.",
    },
    {
      q: "Is El Modena or Orange Park Acres part of the City of Orange?",
      a: "No, even though the mailing address says Orange. El Modena, North El Modena, Orange Park Acres and Olive are unincorporated county areas surrounded by the city. Permits and code enforcement for those addresses are the county's, not the city's, so confirm which jurisdiction your parcel is in before you apply anywhere.",
    },
  ],

  updated: "2026-09-19",
};
