import type { CityContent } from "./types";

// Irvine. Facts and sources: section 4 of
// OakTend-marketing/reports-2026-09-16/seo-research-city-pages.md.
//
// The angle that makes this page not interchangeable with any other: Irvine
// has the NEWEST housing stock of any large Orange County city (median build
// year 2002) and grew village by village, so whole neighborhoods reach the
// same maintenance milestone in the same couple of years. Nothing on this
// page about failing cast-iron drains or 1960s panels, because that is Santa
// Ana's page, not this one.
//
// SOURCING PASS 2026-09-16 (second). Four things came off this page because
// the research file does not carry them: the USDA hardiness zone (the file
// says twice not to state a zone number for Irvine), the Civil Code 4765
// citation (not in the file at all), the liquefaction card (not sourced in
// that pass), and the "IrvineREADY!" system name plus the self-service
// framing on HVAC and water heater permits, which the research flagged as
// carried over rather than verified. The population range and the housing
// table now cite the Census Reporter API pull the research actually used.
//
// RECONCILED 2026-09-16. The old hardness numbers here (107 to 119 ppm
// groundwater, 265 to 308 imported) are gone. Two reads of the same IRWD
// report table disagreed with each other on surface and imported water, and
// only the groundwater figure came back the same both times, so that is the
// only number this page states. The wildfire line lost its "minimal" framing
// for the same reason: no city-adopted map was available, so the page asks
// the reader to look their own parcel up instead of characterizing the city.
//
// FACT CHECK 2026-09-19. The "about 343 ppm, roughly 20 grains per gallon"
// groundwater figure is gone. It was a misread: in the text layer of IRWD's
// report, 343 sits on the Total Dissolved Solids row, not the hardness row,
// and the hardness columns could not be matched to their sources with any
// confidence from that layer. IRWD's own water quality page says it in words
// instead: water with 10 grains or more is generally considered hard, imported
// Colorado River and Northern California water is typically hard, IRWD's well
// water is moderately hard, and the former Santiago County Water District
// sources are also hard. The page now says that and sends the reader to the
// report for a number. Source: https://www.irwd.com/learn/water-quality-report/
// Also: "average" build year became "median" (it is table B25035, a median),
// the Mello-Roos lines lost "from the 1980s onward" and "built after 1988"
// (neither was sourced; the 1982 Act date on the county page is), and the
// phone number is labelled the way the city's page labels it, as the Building
// Permits and Inspections contact number, not a "Permit Processing Center".

export const irvine: CityContent = {
  name: "Irvine",
  slug: "irvine",
  intro:
    "Irvine's median home was built in 2002, the newest large-city housing in Orange County, and it went up village by village. The job here is usually the first replacement of an original water heater, furnace or roof, often for a whole village within a few years, with an association review in most villages on top of the city permit.",
  metaDescription:
    "Irvine's median home was built in 2002, village by village. First water heater and roof replacements, HOA review, IRWD water and the PermitsDIRECT! portal.",
  metaTitle: "Irvine home maintenance: what to check by home age",

  population: {
    value: "About 318,693 people",
    asOf: "ACS 2024 one-year estimate; the 2020 Census counted 307,670",
    sourceUrl:
      "https://censusreporter.org/profiles/16000US0636770-irvine-ca/",
    sourceLabel: "Census Reporter, U.S. Census Bureau data",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "2002",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0636770",
      sourceLabel: "Census Reporter, ACS 2024 table B25035",
    },
    facts: [
      {
        text: "About 53.9 percent of Irvine's 121,814 housing units went up in 2000 or later. Most homes are still on their original roof, water heater and HVAC, so the big replacement spending is ahead of them rather than behind.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0636770",
        sourceLabel: "Census Reporter, ACS 2024 tables B25034 and B25035",
      },
      {
        text: "Irvine grew as master-planned villages, so neighborhoods age in lockstep: Woodbridge went up through the late 1970s and 1980s, Woodbury and Stonegate in the 2000s, the Great Park Neighborhoods in the 2010s. If a neighbor's water heater just failed, yours is the same age.",
        sourceUrl: "https://www.irvineconnection.com/irvines-22-villages/",
        sourceLabel: "Irvine Community Connection",
      },
      {
        text: "Irvine averages about 14.38 inches of rain a year, nearly all outside summer, with June to August highs of roughly 76 to 83 degrees. Sun on roofing, sealants and paint is the seasonal wear, not frost.",
        sourceUrl:
          "https://usclimatedata.com/climate/irvine/california/united-states/usca2494",
        sourceLabel: "US Climate Data, Irvine",
      },
      {
        text: "Fire service comes from the Orange County Fire Authority, which lists Irvine as a member city and serves 23 Orange County cities and all unincorporated areas from 78 stations.",
        sourceUrl: "https://ocfa.org/about-us/member-cities/",
        sourceLabel: "Orange County Fire Authority, member cities",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Woodbridge",
      "Turtle Rock",
      "Northwood",
      "Woodbury",
      "Stonegate",
      "Orchard Hills",
      "Cypress Village",
      "Great Park Neighborhoods",
    ],
    note: "The village tells you the build era. Turtle Rock dates to 1967, Woodbridge is a 1970s and 1980s build around two man-made lakes, Northwood is the one village developed independently of the Irvine Company, and Woodbury, Stonegate, Orchard Hills, Cypress Village and the Great Park Neighborhoods are 2000s or later.",
    sourceUrl: "https://www.irvineconnection.com/irvines-22-villages/",
  },

  water: {
    utility: "Irvine Ranch Water District",
    utilityUrl: "https://www.irwd.com/about-us",
    summary:
      "Irvine Ranch Water District serves all of Irvine plus parts of Lake Forest, Newport Beach, Tustin, Costa Mesa and Orange, about 181 square miles and 450,000 residents, on local groundwater blended with water imported from Metropolitan. The district calls its well water moderately hard and imported Colorado River and Northern California water typically hard, with 10 grains per gallon as the usual line. No number is printed here because the hardness rows of the district's report could not be read reliably; IRWD's current report has it.",
    sourceUrl: "https://www.irwd.com/learn/water-quality-report/",
    sourceLabel: "IRWD water quality report page",
  },

  permits: {
    office: "City of Irvine Building Permits and Inspections",
    portalUrl: "https://cityofirvine.gov/building-permits-and-inspections",
    summary:
      "New applications go through PermitsDIRECT!, powered by Symbium, which replaced the legacy Irvine Permits site; the older system still handles plan-check inquiries, permit inquiries and inspection requests. Eligible permit types filed on PermitsDIRECT! can be issued the same day.",
    sourceUrl: "https://cityofirvine.gov/building-permits-and-inspections",
  },

  hazards: [
    {
      text: "Villages built after the 1982 Mello-Roos law, including parts of the Great Park Neighborhoods, Stonegate and Portola Springs, may carry a Mello-Roos special tax. There is no citywide yes or no: the county Treasurer-Tax Collector's lookup answers by parcel.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "No city-adopted fire hazard map was available for this page, and villages that back onto open space, such as Shady Canyon, Quail Hill and parts of Turtle Rock, are where a citywide answer would be wrong. The state's Fire Hazard Severity Zone viewer answers by parcel.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
    {
      text: "Most villages require architectural review before a roof, exterior paint or window change, but control varies by village, and Northwood, one of the originals, has no association at all. Association approval and the city permit are two separate steps on the calendar.",
      sourceUrl: "https://en.wikipedia.org/wiki/Irvine,_California",
      sourceLabel: "Wikipedia, Irvine villages and associations",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Usually the first big replacement in a 2000s-built Irvine home.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "Central AC versus a heat pump, for villages reaching their first system swap.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Useful when a whole village's original roofs come due within a few years of each other.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "The seasonal list, weighted toward sun wear on roofing and paint in a dry inland summer.",
    },
  ],

  neighbors: ["tustin", "lake-forest", "newport-beach", "costa-mesa"],

  faq: [
    {
      q: "Can I get a same-day permit for a water heater in Irvine?",
      a: "Not confirmed. No city page says a water heater or HVAC changeout is one of the same-day types on PermitsDIRECT!, so call Building Permits and Inspections at 949-724-6470 to learn which track it takes.",
    },
    {
      q: "Can I install a salt-based water softener in Irvine?",
      a: "IRWD discourages self-regenerating salt softeners, because the district recycles its wastewater. Ask the district before buying one.",
    },
  ],

  updated: "2026-09-20",
};
