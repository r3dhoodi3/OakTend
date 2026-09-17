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
// 2. WATER HARDNESS. Two districts serve the city and neither district's own
//    report was readable; the only number available came from an aggregator,
//    so no number is published. The district link goes out instead.

export const missionViejo: CityContent = {
  name: "Mission Viejo",
  slug: "mission-viejo",
  intro:
    "Mission Viejo was built almost entirely under one master plan, by one company, inside one tight window: more than 90 percent of its homes went up between 1960 and 1999, and the median build year is 1979. The plan put the roads in the valleys and the houses on the hillsides, in stucco and barrel tile, which is why so much of the city looks alike and, more to the point, ages alike. The practical effect is that roofs, water heaters and furnaces on a Mission Viejo street tend to come due together rather than one house at a time.",
  metaDescription:
    "Mission Viejo was built to one master plan, median build year 1979. What that shared age means for roofs, water, HOAs, and permits.",

  population: {
    value: "About 91,600 to 93,700 people",
    asOf: "2024 ACS estimate and the 2020 Census count",
    sourceUrl:
      "https://censusreporter.org/profiles/16000US0648256-mission-viejo-ca/",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1979",
    facts: [
      {
        text: "Mission Viejo's median year built is 1979, and the distribution behind it is unusually tight: of 34,794 housing units, about 2.3 percent predate 1960, 52.3 percent went up between 1960 and 1979, 39.0 percent between 1980 and 1999, and only 6.4 percent in 2000 or later. Over 90 percent of the city was built inside a 40-year window, which is why neighbors hit the same replacements in the same years.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0648256",
        sourceLabel: "Census Reporter, ACS 2024 tables B25034 and B25035",
      },
      {
        text: "The city's houses and shopping centers are almost uniformly Spanish mission style, stucco walls and barrel-tile roofs, laid out under a Mission Viejo Company master plan that deliberately put roads in the valleys and homes on the hillsides. Before 1960 developers considered this terrain undevelopable, and the area was one of the last parts of Orange County to urbanize because of its geology, which is worth remembering before any grading, drainage or retaining-wall project.",
        sourceUrl: "https://en.wikipedia.org/wiki/Mission_Viejo,_California",
        sourceLabel: "Wikipedia, Mission Viejo history",
      },
      {
        text: "There is no single citywide water utility here. Santa Margarita Water District serves part of Mission Viejo as part of its South Orange County area, and Moulton Niguel Water District serves other parts, so the report that actually describes your tap water depends on which side of the district line your address falls on.",
        sourceUrl:
          "https://en.wikipedia.org/wiki/Moulton_Niguel_Water_District",
        sourceLabel: "Wikipedia, Moulton Niguel Water District",
      },
    ],
  },

  neighborhoods: {
    names: ["Lake Mission Viejo", "Deane Homes"],
    note: "This list is deliberately short, and that is an honesty problem rather than a Mission Viejo problem. Most of the community names quoted for this city come from real-estate marketing rather than any city or Census source, so this page names only the two areas with a documented history: Lake Mission Viejo, the private lake at the center of the community, dedicated in 1977 to an association whose members are property owners inside the original planned community, and the Deane Homes tract referenced in the city's own school-boundary history. If your tract is not listed, that is a gap in what we could verify, not a judgment about your neighborhood.",
    sourceUrl: "https://en.wikipedia.org/wiki/Lake_Mission_Viejo",
  },

  water: {
    utility: "Santa Margarita Water District",
    utilityUrl: "https://www.smwd.com/",
    summary:
      "Mission Viejo is split between two districts rather than served by one city utility: Santa Margarita Water District covers part of the city and Moulton Niguel Water District covers other parts, and your bill is what tells you which. Water here is hard, as South Orange County water generally is, but we are not going to print a citywide number: each district's own report lists hardness, and that report, for the district that serves your address, is the figure to size a softener against.",
    sourceUrl: "https://www.smwd.com/",
  },

  permits: {
    office: "City of Mission Viejo Building Division",
    portalUrl: "https://portal.cityofmissionviejo.org/energovprod/selfservice",
    summary:
      "Everything goes online here, which is a real quirk worth knowing: the city's own building services page says all permits and inspections have to be submitted and scheduled through its Client Self Service portal, and the in-person counter answers questions rather than taking submittals. Water heater and HVAC replacement is code-regulated work that needs a permit in California cities generally, but the city page does not spell out the process, so confirm the permit type and fee through the portal or the Building Division rather than taking a contractor's word that none is needed.",
    sourceUrl:
      "https://www.missionviejo.gov/departments/community-development/building-services",
  },

  hazards: [
    {
      text: "Mission Viejo's eastern and southern edges run against undeveloped canyon and open space toward Trabuco Canyon and O'Neill Regional Park, which is the kind of terrain where fire hazard zones get mapped. No city-adopted map was available to say which streets carry a zone, so the honest answer is the one we would give a neighbor: look your own address up on the state's Fire Hazard Severity Zone viewer before assuming either way.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
    {
      text: "Mello-Roos districts follow new construction, and Mission Viejo's tracts are established rather than new, so the burden here is generally lighter than in newer South County communities. The dollar figures quoted on real-estate blogs are not county data, though. The Treasurer-Tax Collector's parcel lookup, or the special assessment charges line on your own tax bill, is the answer that counts.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "The Lake Mission Viejo Association, formed around the private lake dedicated in 1977, ties membership to properties inside the original planned community, and individual tracts commonly carry their own associations on top of that. Expect an architectural review step to exist before exterior work, and expect it to be separate from anything the city requires.",
      sourceUrl: "https://en.wikipedia.org/wiki/Lake_Mission_Viejo",
      sourceLabel: "Wikipedia, Lake Mission Viejo",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, for tile roofs that reach the end of their run street by street.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs, and central AC versus a heat pump, for homes on their second system.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical price range and when a repair still makes sense on hard South County water.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "How to catch one early in a slab-foundation home built in the 1960s or 1970s.",
    },
  ],

  neighbors: ["lake-forest", "laguna-hills", "rancho-santa-margarita"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater in Mission Viejo?",
      a: "Almost certainly yes, and here is the honest version: water heater and HVAC replacement is code-regulated work that needs a permit in California cities generally, but Mission Viejo's building services page does not spell that specific requirement out, so we are not going to claim it does. Confirm through the city's Client Self Service portal or the Building Division. The local quirk is that there is no over-the-counter option at all: every permit and inspection has to be submitted and scheduled online.",
    },
    {
      q: "Is Mission Viejo's water hard?",
      a: "Yes, as South Orange County water generally is. We are not printing a citywide number, because two districts serve this city and neither one's own report was available to us; a blended figure from a third-party site is not the number to size a softener against. Find out from your bill whether Santa Margarita Water District or Moulton Niguel Water District serves your address, then read that district's current water quality report.",
    },
    {
      q: "Does my Mission Viejo home have an HOA?",
      a: "Very likely. The city was built almost entirely by one master-plan developer between the 1960s and 1980s, the era and model most associated with tract homeowners associations, and properties inside the original planned community can also carry membership in the Lake Mission Viejo Association tied to the lake and its amenities. No sourced citywide percentage exists, so check your own title paperwork, and expect any architectural review to be a step separate from the city permit rather than part of it.",
    },
    {
      q: "Is my Mission Viejo home in a wildfire hazard zone?",
      a: "It depends on how close you are to the eastern and southern edges of the city, where the tracts meet undeveloped canyon and open space toward Trabuco Canyon and O'Neill Regional Park. We could not find a city-adopted map that says which streets carry a mapped zone, so rather than guess in either direction: check your address on the state's Fire Hazard Severity Zone viewer. That is the same advice we would give for a canyon-edge address anywhere in the county.",
    },
    {
      q: "Why do my neighbors all seem to need the same repairs at the same time?",
      a: "Because the city was built that way. More than 90 percent of Mission Viejo's homes went up between 1960 and 1999, and half of them in a single 20-year stretch, so equipment installed at the same time reaches the end of its life at the same time. It is genuinely useful information: if two neighbors have replaced a water heater or a roof this year, yours is the same age, and planning the spend beats discovering it.",
    },
    {
      q: "Does OakTend only serve Mission Viejo?",
      a: "No. OakTend covers all of Orange County. Mission Viejo has its own page because a city built to one plan in one window ages differently from a city built piece by piece, not because the service stops at the city line.",
    },
  ],

  updated: "2026-09-16",
};
