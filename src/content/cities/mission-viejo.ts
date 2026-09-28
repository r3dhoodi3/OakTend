import type { CityContent } from "./types";

// Mission Viejo. Facts and sources: the city research file for this wave
// (scratchpad/cities/mission-viejo.md).
//
// The angle that makes this page not interchangeable: one developer, one
// master plan, one tight build window, so the whole city hits the same
// maintenance milestones at the same time.
//
// TWO DELIBERATE GAPS, both stated on the page rather than papered over:
// 1. NEIGHBORHOODS. The commonly quoted Mission Viejo community names come
//    from real-estate marketing, not the city or Census. Only the two with a
//    documented history are named, and the note says so.
// 2. WATER HARDNESS. Three districts serve the city and no district's own
//    report was read for this page; the only number available came from an
//    aggregator, so no number is published. The city's own list of districts
//    goes out instead.
//
// FACT CHECK 2026-09-19. The page said two water districts; the city says
// three. Its water conservation page reads "Santa Margarita Water District,
// Moulton Niguel Water District, and El Toro Water District supply the water
// to Mission Viejo residents":
// https://www.missionviejo.gov/departments/public-works/water-conservation
// (The city's general utilities directory also lists Trabuco Canyon Water
// District under Water, but the sentence above is the city's explicit answer
// to "what water district serves my area", so the page follows it.) The water
// card used to label a district homepage "Water quality report"; it now links
// the city's pages and labels them as what they are.

export const missionViejo: CityContent = {
  name: "Mission Viejo",
  slug: "mission-viejo",
  intro:
    "Mission Viejo was built almost entirely by one company under one master plan: more than 90 percent of its homes went up between 1960 and 1999, and the median build year is 1979. The plan put the roads in the valleys and the stucco, barrel-tile houses on the hillsides, on terrain developers had written off before 1960.",
  metaDescription:
    "Mission Viejo was built to one master plan, median build year 1979. What that shared age means for tile roofs, three water districts, HOAs and permits.",
  metaTitle: "Mission Viejo: one master plan, one build window",

  population: {
    value: "About 91,600 to 93,700 people",
    asOf: "2024 ACS estimate and the 2020 Census count",
    sourceUrl:
      "https://censusreporter.org/profiles/16000US0648256-mission-viejo-ca/",
    sourceLabel: "Census Reporter, U.S. Census Bureau data",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1979",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0648256",
      sourceLabel: "Census Reporter, ACS 2024 table B25035",
    },
    facts: [
      {
        text: "Of 34,794 housing units, about 2.3 percent predate 1960, 52.3 percent went up between 1960 and 1979, 39.0 percent between 1980 and 1999, and only 6.4 percent in 2000 or later.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0648256",
        sourceLabel: "Census Reporter, ACS 2024 tables B25034 and B25035",
      },
      {
        text: "Houses and shopping centers are almost uniformly Spanish mission style, stucco and barrel tile, under a Mission Viejo Company master plan. The area was one of the last in Orange County to urbanize because of its geology, which matters before any grading, drainage or retaining-wall project.",
        sourceUrl: "https://en.wikipedia.org/wiki/Mission_Viejo,_California",
        sourceLabel: "Wikipedia, Mission Viejo history",
      },
      {
        text: "The Orange County Fire Authority serves Mission Viejo as a partner city, from Station 9 on Shops Boulevard, Station 24 on Marguerite Parkway and Station 31 on Olympiad Road.",
        sourceUrl: "https://www.missionviejo.gov/departments/fire-services",
        sourceLabel: "City of Mission Viejo, fire services",
      },
    ],
  },

  neighborhoods: {
    names: ["Lake Mission Viejo", "Deane Homes"],
    note: "Most community names quoted for this city come from real-estate marketing, so only two with a documented history are listed: Lake Mission Viejo, the private lake at the center of the community, dedicated in 1977, and the Deane Homes tract named in the city's own school-boundary history.",
    sourceUrl: "https://en.wikipedia.org/wiki/Lake_Mission_Viejo",
  },

  water: {
    utility: "Santa Margarita, Moulton Niguel and El Toro water districts",
    utilityUrl:
      "https://www.missionviejo.gov/services-guides/utilities-and-other-services",
    summary:
      "There is no city water utility. The city says Santa Margarita Water District, Moulton Niguel Water District and El Toro Water District supply its residents; your bill says which one is yours, and that district's report lists the hardness for your tap. No citywide number is printed here.",
    sourceUrl:
      "https://www.missionviejo.gov/departments/public-works/water-conservation",
    sourceLabel: "City of Mission Viejo, water districts",
  },

  permits: {
    office: "City of Mission Viejo Building Division",
    portalUrl: "https://portal.cityofmissionviejo.org/energovprod/selfservice",
    summary:
      "The city's building services page says all permits and inspections are submitted and scheduled through its Client Self Service portal. It does not spell out the process for a water heater or HVAC swap, so confirm the permit type and fee there or with the Building Division.",
    sourceUrl:
      "https://www.missionviejo.gov/departments/community-development/building-services",
  },

  hazards: [
    {
      text: "The city's eastern and southern edges meet undeveloped canyon and open space toward Trabuco Canyon and O'Neill Regional Park, the terrain where fire hazard zones get mapped. No city-adopted map says which streets carry a zone; the state's Fire Hazard Severity Zone viewer answers by address.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
    {
      text: "Mello-Roos districts follow new construction, and Mission Viejo's tracts are established, so the burden is generally lighter than in newer South County communities. Dollar figures on real-estate blogs are not county data; the Treasurer-Tax Collector's parcel lookup is.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "Membership in the Lake Mission Viejo Association, formed around the private lake dedicated in 1977, is tied to properties inside the original planned community, and tracts commonly carry their own associations too; any architectural review they require is separate from the city permit.",
      sourceUrl: "https://en.wikipedia.org/wiki/Lake_Mission_Viejo",
      sourceLabel: "Wikipedia, Lake Mission Viejo",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Barrel-tile roofs laid in the same decades reach the end of their run street by street.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Three districts, all hard water, and every permit filed online.",
    },
    {
      href: "/guides/hoa-coastal-commission-remodel-orange-county",
      title: "HOA and coastal permits in Orange County",
      blurb:
        "Lake association plus tract HOA: two reviews that sit apart from the city permit.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "A way to pace upkeep when a whole street was built in the same few years.",
    },
  ],

  neighbors: [
    "lake-forest",
    "laguna-hills",
    "rancho-santa-margarita",
    "ladera-ranch",
  ],

  faq: [
    {
      q: "Can I drop off a Mission Viejo permit at the counter?",
      a: "No. The in-person counter answers questions but does not take submittals; every permit and inspection goes through the online portal.",
    },
    {
      q: "Why do my neighbors all seem to need the same repairs at the same time?",
      a: "Because the houses are the same age. Half of Mission Viejo's homes went up in one 20-year stretch, so a roof or water heater a neighbor just replaced is a fair preview of yours.",
    },
  ],

  updated: "2026-09-20",
};
