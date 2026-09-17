import type { CityContent } from "./types";

// Fountain Valley. Facts and sources: the city research file for this wave
// (scratchpad/cities/fountain-valley.md).
//
// The angle that makes this page not interchangeable: a city that went from
// farmland to built-out in a single decade, so its housing is all one age,
// sitting a few miles back from the Huntington Beach sand rather than on it.
//
// TWO NUMBERS ARE DELIBERATELY ABSENT. The median year built (aggregators say
// the early 1970s) could not be confirmed against Census table B25034, and the
// hardness figure the research found came from a regional reporting site
// rather than the city's own report. Neither is published here; the growth
// history and the city's own water quality report carry that weight instead.

export const fountainValley: CityContent = {
  name: "Fountain Valley",
  slug: "fountain-valley",
  intro:
    "Fountain Valley incorporated in 1957 with about 2,000 residents and then grew more than 1,400 percent in the following decade, which is why so much of the city reads as one continuous stretch of 1960s and 1970s tract housing. Homes of that era are well past the point where original plumbing runs, panels and roofing are still original by design rather than by luck. The city sits a few miles back from the Huntington Beach coastline, so marine air reaches it without a beachfront's constant salt load, and it sits directly over the Orange County groundwater basin on water hard enough to scale a water heater.",
  metaDescription:
    "Fountain Valley went from farmland to built out in one decade. What that shared build age means for permits, hard water, and repairs.",

  population: {
    value: "About 56,000 to 57,000 people",
    asOf: "2020 Census count and 2024 ACS estimates",
    sourceUrl: "https://www.census.gov/quickfacts/fountainvalleycitycalifornia",
  },

  homes: {
    exposure: "near-coastal",
    facts: [
      {
        text: "Fountain Valley incorporated in 1957, counted about 2,068 residents in the 1960 Census, and then grew 1,441.9 percent between 1960 and 1970 as tract housing went up on former farmland. That single decade is why so many homes here are the same age, and why maintenance tends to arrive in waves across a whole street rather than one house at a time.",
        sourceUrl: "https://en.wikipedia.org/wiki/Fountain_Valley,_California",
        sourceLabel: "Wikipedia, citing U.S. Census counts",
      },
      {
        text: "The city has roughly 19,227 housing units, plus or minus 635, per the 2024 American Community Survey five-year estimate. It is a small, essentially built-out city, which in practice means most of these homes were finished within a few years of each other and come due for the same replacements on roughly the same schedule.",
        sourceUrl:
          "https://censusreporter.org/profiles/16000US0625380-fountain-valley-ca/",
        sourceLabel: "Census Reporter, ACS 2024 five-year estimate",
      },
      {
        text: "About 64.8 percent of Fountain Valley households own their home rather than rent, per 2024 American Community Survey estimates. An owner-heavy city usually means homes with one or two long-term owners, which tends to be good for how a house was kept and bad for how long a deferred repair has been deferred.",
        sourceUrl: "https://datausa.io/profile/geo/fountain-valley-ca",
        sourceLabel: "Data USA, Census ACS",
      },
      {
        text: "Fountain Valley does not front the ocean; it borders Huntington Beach a few miles back from the sand. Marine air still reaches the city, so exterior paint, metal fixtures and outdoor equipment age faster than they would in Anaheim or Santa Ana, but the direct, everyday salt load of a beachfront street is not what a house here is fighting.",
        sourceUrl: "https://en.wikipedia.org/wiki/Fountain_Valley,_California",
        sourceLabel: "Wikipedia, city geography",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Talbert",
      "Southpark",
      "Green Valley",
      "Stratford Homes",
      "Los Caballeros",
      "Mile Square Park area",
    ],
    note: "Fountain Valley's neighborhood names are descriptive rather than official; the city has no formally bounded neighborhood map, and labels like West or East Fountain Valley are just how people talk. Talbert, at Talbert Avenue and Bushard Street, is the original settlement and the oldest name here, known locally as Gospel Swamp before drainage canals made the land farmable. Green Valley, Stratford Homes, Los Caballeros and the tracts ringing the 640-acre Mile Square Regional Park are the names people actually use for the residential areas. The Talbert and Gospel Swamp history comes from the city's Wikipedia entry; the source linked here is the one behind the modern neighborhood names.",
    sourceUrl:
      "https://www.sailproperties.com/property-management-blog/exploring-the-best-neighborhoods-in-fountain-valley-ca-a-guide-to-living-in-a-hidden-oc-gem",
  },

  water: {
    utility: "City of Fountain Valley Public Works Water Division",
    utilityUrl:
      "https://www.fountainvalley.gov/DocumentCenter/View/20813/2024-Water-Quality-Report",
    summary:
      "Fountain Valley is its own retail water utility rather than a customer of a separate district, and the city is a member agency of the Municipal Water District of Orange County, which is headquartered here on Ward Street. The city sits on the Orange County groundwater basin, and the Orange County Water District's Talbert barrier, which keeps ocean water from intruding into that basin, runs through Fountain Valley and Huntington Beach. Water here is hard the way basin water generally is; the city's own annual water quality report lists the current hardness, which is the number to use if you are sizing a softener.",
    sourceUrl:
      "https://www.fountainvalley.gov/DocumentCenter/View/20813/2024-Water-Quality-Report",
  },

  permits: {
    office: "City of Fountain Valley Building Division",
    portalUrl: "https://fountainvalley.cts.city",
    summary:
      "Applications go through the city's ePlan and Permit Center, where you create an account, upload PDF plans and pay by card. The city lists water heater change-out and standard furnace and air conditioner change-out as expedited permit categories, each of which still needs a site plan submitted with it. One quirk worth knowing before you start: anything that needs Fire Department review has to be submitted as paper plans through the Building Division instead of the portal.",
    sourceUrl: "https://www.fountainvalley.gov/398/Plan-Check-Center",
  },

  hazards: [
    {
      text: "Fountain Valley is flat, fully built-out coastal-plain terrain, but the Orange County Fire Authority does not publish a citywide yes or no on fire hazard zones. It points residents at the state's zone viewer for an address-level lookup, which is the honest answer here too: check your own parcel rather than trusting a city-level summary, including this one.",
      sourceUrl: "https://ocfa.org/residents/fhsz/",
      sourceLabel: "Orange County Fire Authority",
    },
    {
      text: "Most of Fountain Valley's housing went up in the 1960s and 1970s, well before the 1982 law that created Mello-Roos Community Facilities Districts, so the special taxes common in newer South County communities are unusual here. It is still a parcel-level answer, and the county Treasurer-Tax Collector's lookup, or the special assessment line on your tax bill, is where you get it for your own address.",
      sourceUrl: "https://www.octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "No Fountain Valley specific liquefaction map turned up in the sources we checked, so read this as a reason to look rather than an answer. The city's original settlement area was called Gospel Swamp, naturally boggy ground that only became farmable once drainage canals went in, and low, formerly wet land is the profile the state maps for liquefaction. Run the state's Seismic Hazard Zone lookup on your own address before foundation, drainage or addition work.",
      sourceUrl: "https://en.wikipedia.org/wiki/Fountain_Valley,_California",
      sourceLabel: "Wikipedia, Fountain Valley history",
    },
    {
      text: "The city borders the Santa Ana River and was wetland before it was farmland, so flood zoning is an address-level question here rather than a citywide one. FEMA's Flood Map Service Center is the authoritative check, and the answer affects both insurance and what a remodel has to account for.",
      sourceUrl: "https://msc.fema.gov/portal/search",
      sourceLabel: "FEMA Flood Map Service Center",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "Typical range and the signs a panel sized for a 1970s household is not carrying a modern one.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "How to catch one early in an older slab-foundation home, before the water bill tells you.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Price range, and when a repair still makes sense, on hard basin water that scales a tank early.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including what marine air a few miles inland actually does.",
    },
  ],

  neighbors: ["huntington-beach", "costa-mesa", "santa-ana"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater in Fountain Valley?",
      a: "Yes. The city lists water heater change-out as an expedited permit category, and it still asks for a site plan with the application, filed through the ePlan and Permit Center. A licensed plumber normally pulls it as part of the job. If a quote does not mention a permit at all, ask why before you sign.",
    },
    {
      q: "Is Fountain Valley's water hard?",
      a: "Yes. The city sits on the Orange County groundwater basin, and basin water in this part of the county runs hard, which is why scale in water heaters, valves and fixtures is a normal maintenance item rather than a sign something has gone wrong. For the actual number, read the city's own annual water quality report for the current year instead of a third-party estimate; that is the figure to size a softener against.",
    },
    {
      q: "Does Fountain Valley get the same salt air Huntington Beach does?",
      a: "Less of it. Fountain Valley sits a few miles back from the coastline rather than on it, so corrosion on outdoor HVAC equipment, exterior metal and paint is milder here than on a beachfront street, though not zero, since marine air still moves inland across this part of the county. It is a difference of degree, not a difference in kind.",
    },
    {
      q: "Does my Fountain Valley home pay Mello-Roos?",
      a: "Probably not, but it is a parcel-level answer. Most of the city was built in the 1960s and 1970s, before the 1982 law that created Mello-Roos districts existed, so the assessments that blanket parts of South County are unusual here. Check the Orange County Treasurer-Tax Collector's lookup, or the special assessment charges section of your property tax bill, for your specific address.",
    },
    {
      q: "Is my Fountain Valley home in a wildfire hazard zone?",
      a: "This is flat, fully urbanized coastal plain rather than canyon or hillside terrain, which in Orange County generally means low mapped hazard. That said, the Orange County Fire Authority does not publish a citywide answer, and neither will we: look your own address up on the state's Fire Hazard Severity Zone viewer, which is the only source that answers for your street.",
    },
    {
      q: "Does OakTend only serve Fountain Valley?",
      a: "No. OakTend covers all of Orange County. Fountain Valley has its own page because the build history, the basin water and the city's own permit process genuinely change the advice here, not because the service stops at the city line.",
    },
  ],

  updated: "2026-09-16",
};
