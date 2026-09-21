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
    "Irvine's median home was built in 2002, the newest large-city housing stock in Orange County, and that changes what maintenance here actually looks like. Most Irvine homes are not fighting failing drains or undersized panels; they are reaching the first replacement of an original water heater, furnace, or roof, often a whole village at a time because the village went up in one stretch. Add architectural review in most villages and a permit system that has just moved to a new portal, and the real questions here are usually timing and approvals rather than whether something is about to fail.",
  metaDescription:
    "Irvine's median home was built in 2002. What that means for water heaters, HOA approvals, Irvine Ranch Water District water, and city permits.",
  metaTitle: "Irvine homes: whole villages aging in lockstep",

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
        text: "Irvine's median year built is 2002, the newest housing stock of any large Orange County city, and about 53.9 percent of its 121,814 housing units went up in 2000 or later. Most homes here are still on their original roof, water heater, and HVAC equipment rather than a second or third replacement, so the spending curve is about to steepen rather than having already peaked.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0636770",
        sourceLabel: "Census Reporter, ACS 2024 tables B25034 and B25035",
      },
      {
        text: "Irvine grew as master-planned villages rather than scattered infill, so neighborhoods age in lockstep: Woodbridge went up through the late 1970s and 1980s, Woodbury and Stonegate in the 2000s, the Great Park Neighborhoods in the 2010s. If your neighbor's water heater just failed, yours is the same age.",
        sourceUrl: "https://www.irvineconnection.com/irvines-22-villages/",
        sourceLabel: "Irvine Community Connection",
      },
      {
        text: "Irvine runs a hot-summer Mediterranean pattern: about 14.38 inches of rain in an average year, nearly all of it outside summer, with June to August highs averaging roughly 76 to 83 degrees. Freeze prep is not the seasonal job here. Sun load on roofing, sealants and exterior paint is, and so is making sure winter runoff actually leaves the lot.",
        sourceUrl:
          "https://usclimatedata.com/climate/irvine/california/united-states/usca2494",
        sourceLabel: "US Climate Data, Irvine",
      },
      {
        text: "Fire service in Irvine comes from the Orange County Fire Authority. The city appears on the authority's list of member cities, and the authority describes itself as a regional fire service agency serving 23 Orange County cities and all unincorporated areas from 78 fire stations across the county.",
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
    note: "Irvine is organized into villages, not loose neighborhoods, and the village tells you the build era: Turtle Rock dates to 1967, Woodbridge is a 1970s and 1980s build around its two man-made lakes, Northwood is the one village developed independently of the Irvine Company, and Woodbury, Stonegate, Orchard Hills, Cypress Village and the Great Park Neighborhoods are all 2000s or later.",
    sourceUrl: "https://www.irvineconnection.com/irvines-22-villages/",
  },

  water: {
    utility: "Irvine Ranch Water District",
    utilityUrl: "https://www.irwd.com/about-us",
    summary:
      "Irvine Ranch Water District serves all of Irvine plus parts of Lake Forest, Newport Beach, Tustin, Costa Mesa and Orange, about 181 square miles and roughly 450,000 residents, on a blend of local groundwater and water imported from Metropolitan. How hard it is depends on the source and the season: the district says its well water is moderately hard, while imported Colorado River and Northern California water is typically hard, with 10 grains per gallon as the usual line for hard. We are not printing a number, because we could not read the hardness rows of the district's report table reliably; if you need a precise figure to size a softener, pull the current water quality report from IRWD directly. IRWD also discourages self-regenerating salt softeners, because it recycles its wastewater.",
    sourceUrl: "https://www.irwd.com/learn/water-quality-report/",
    sourceLabel: "IRWD water quality report page",
  },

  permits: {
    office: "City of Irvine Building Permits and Inspections",
    portalUrl: "https://cityofirvine.gov/building-permits-and-inspections",
    summary:
      "Irvine moved new online applications onto PermitsDIRECT!, powered by Symbium, which replaced the legacy Irvine Permits site; the older system still handles plan-check inquiries, permit inquiries and inspection requests. Same-day permits are available for eligible permit types filed through PermitsDIRECT!. Whether a water heater or HVAC changeout is one of those eligible types is not spelled out on any city page we could reach, so plan on pulling a permit and call the city's Building Permits and Inspections line at 949-724-6470 to confirm which track it takes.",
    sourceUrl: "https://cityofirvine.gov/building-permits-and-inspections",
  },

  hazards: [
    {
      text: "Homeowners in Irvine's newer villages, the ones developed after the 1982 state law that created Mello-Roos districts, including parts of the Great Park Neighborhoods, Stonegate and Portola Springs, may be subject to a Mello-Roos special tax. There is no citywide yes or no and no sourced citywide percentage; it is a parcel-level answer, and the county Treasurer-Tax Collector's lookup is where you get it for your own address.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "This page will not tell you Irvine's fire hazard zone, because no city-adopted map was available to say so honestly, and the villages that back onto open space, such as Shady Canyon, Quail Hill and parts of Turtle Rock, are exactly where a citywide generalization would be wrong. The state's Fire Hazard Severity Zone viewer answers by parcel; check your own address there.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
    {
      text: "Architectural review is a real step in most Irvine villages before a roof, exterior paint or window change, but it is not universal. Associations exercise varying degrees of control from village to village, and Northwood, one of the original villages, is specifically noted as not having one at all. Check your own village rather than assuming, and treat association approval and the city permit as two separate steps on the calendar.",
      sourceUrl: "https://en.wikipedia.org/wiki/Irvine,_California",
      sourceLabel: "Wikipedia, Irvine villages and associations",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "The most common first big replacement in a 2000s-built Irvine home, with the typical price range and when repair is still the smarter call.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs, and central AC versus a heat pump, for homes reaching their first HVAC replacement.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, useful when a whole village's original roofs come due within a few years of each other.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including sun wear on roofing and paint and getting winter runoff off the lot.",
    },
  ],

  neighbors: ["tustin", "lake-forest", "newport-beach", "costa-mesa"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater in Irvine?",
      a: "Plan on yes. Water heater and HVAC replacement is code-regulated mechanical work that needs a permit essentially everywhere in California, and Irvine's building division handles exactly that kind of work through PermitsDIRECT!. Some permit types there are issued same day, but no city page we could reach says a water heater is one of them, so we are not going to promise you the fast lane. A licensed plumber normally pulls the permit as part of the job; the city's Building Permits and Inspections line at 949-724-6470 will confirm the type and fee before you start.",
    },
    {
      q: "Is Irvine's water hard?",
      a: "It depends on the source and the season. Irvine Ranch Water District's own answer is yes and no: it says its well water is moderately hard, imported Colorado River and Northern California water is typically hard, and water at 10 grains per gallon or more is generally considered hard. The blend reaching an address shifts during the year, so some scale in water heaters, valves and fixtures is a normal maintenance item here. We are deliberately not quoting a number: we could not read the hardness rows of the district's report reliably, and a softener sized off a number we cannot confirm is worse than no number. Pull the current water quality report from IRWD if you need the precise value.",
    },
    {
      q: "Does my Irvine home pay Mello-Roos?",
      a: "Some do and some do not, and it is decided by parcel rather than by city. Irvine's newer villages, including parts of the Great Park Neighborhoods, Stonegate and Portola Springs, commonly sit in an active Community Facilities District, while older villages such as Woodbridge or Northwood generally do not. The Orange County Treasurer-Tax Collector's Mello-Roos lookup answers it for a specific address; anyone quoting you a flat citywide answer is guessing.",
    },
    {
      q: "Do I need HOA approval before replacing my roof in Irvine?",
      a: "In most Irvine villages, yes, because architectural review is part of how the villages are governed. It is not universal, though: associations exercise varying degrees of control village by village, and Northwood, one of the original villages, is specifically noted as not having a homeowners association at all. Check your own village's rules before you order materials, and build the review time into your schedule, since association approval and the city permit are two separate steps.",
    },
    {
      q: "Is my Irvine home in a wildfire hazard zone?",
      a: "We are not going to answer that for you, and anyone who answers it for a whole city is guessing. No city-adopted fire hazard map was available for Irvine when this page was checked, and the villages that back onto open space, such as Shady Canyon, Quail Hill and parts of Turtle Rock, are precisely where a citywide answer would mislead. Look your own address up on the Cal Fire zone viewer; it answers by parcel.",
    },
    {
      q: "Who provides fire service in Irvine?",
      a: "The Orange County Fire Authority. Irvine is one of the member cities on the authority's list, and the authority says it serves 23 Orange County cities and all unincorporated areas from 78 fire stations across the county. For fire hazard zoning, the state's parcel lookup is still the place to check your own address.",
    },
  ],

  updated: "2026-09-20",
};
