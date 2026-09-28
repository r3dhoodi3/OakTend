import type { CityContent } from "./types";

// Laguna Beach. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: an old town (median
// build year 1964) wedged between the ocean and the San Joaquin Hills, with
// its own fire department, a fire zone over 87 percent of its land by the
// department's figure, a hazard plan that dates the 1993 fire, the Bluebird
// Canyon slides and the 2010 floods, and design review on most projects.
//
// SOURCE NOTES. lagunabeachcity.net answers scripted requests with a 403, so
// every city page and the 220-page 2023 Local Hazard Mitigation Plan were read
// through the r.jina.ai reader proxy. The Laguna Beach County Water District
// 2026 report was read twice (lbcwd.org copy through the proxy, State Water
// Board copy as a text PDF) and the hardness rows match. South Coast Water
// District's 2026 report is a text PDF. Two suppliers, never averaged.
//
// CONFLICTS RECORDED. The 1993 fire has two sets of numbers and both are given
// with their owner: the city's hazard plan (441 structures damaged or
// destroyed, about 14,440 acres) and the water district's account (366 homes
// destroyed, over 500 damaged, over 17,000 acres). The water district's web
// pages say its supply is groundwater plus imported water, while its 2026
// report describes the drinking water as imported surface water; the report
// is used because it is the dated document.
//
// LEFT OUT ON PURPOSE. The hazard plan's "first city in southern Orange
// County" line (an ordinal claim), its 92 mph wind figure and its
// inflation-adjusted cost of the 1993 fire (the adjusted number does not
// follow from the original), the 2014 call count on the fire operations page
// (stale), the "cottage" label for the old houses (no source opened uses it),
// what share of the city the 2025 state fire map covers (the 87 percent figure
// sits on a page that does not tie it to a map year, and this page says so),
// which street gets which water district, the South Laguna annexation date,
// and Mills Act tax savings.

export const lagunaBeach: CityContent = {
  name: "Laguna Beach",
  slug: "laguna-beach",
  intro:
    "Laguna Beach is a narrow strip of coves, terraces and canyons between the Pacific and the San Joaquin Hills, and its own fire department says 87 percent of the city's land is in a Very High Fire Hazard Severity Zone. The median home was built in 1964, about 16 percent before 1940, and most projects need design review before they can even apply for a building permit.",
  metaDescription:
    "Laguna Beach homes: 1964 median build year, a city fire department, two water districts, design review, and a dated record of fire, slides and floods.",
  metaTitle: "Laguna Beach: older homes, canyons and fire zones",

  population: {
    value: "About 22,710 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003; the city's 2023 hazard plan cites a 2021 estimate of 23,121",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0639178",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "coastal",
    medianYearBuilt: "1964",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639178",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 13,598 housing units, roughly 15.7 percent were built before 1940, 10.8 percent in the 1940s, 15.7 percent in the 1950s, 20.2 percent in the 1960s and 13.1 percent in the 1970s, with 9.7 percent from the 1980s, 5.9 percent from the 1990s and about 8.9 percent since 2000. About 42 percent predate 1960.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639178",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The first American settler arrived in 1871, 15 families lived here by 1888, and the settlement at the mouth of Laguna Canyon was called Lagona until 1904. Artists came from 1903, North Laguna was bought from the Irvine Ranch, Pacific Coast Highway arrived in 1926, and the city incorporated in 1927 with about 1,900 people.",
        sourceUrl:
          "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
        sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, community profile",
      },
      {
        text: "When saltwater ended the Laguna Canyon well supply in 1924, five residents posing as a duck hunting club bought 120 acres of water-bearing land 20 miles north in Huntington Beach. Voters formed the Laguna Beach County Water District on May 4, 1925 by 359 to 0, approved a $600,000 bond on January 5, 1926 by 437 to 0, and water reached the reservoirs in spring 1927. When that groundwater turned salty too, the district began buying Colorado River water in 1943.",
        sourceUrl: "https://www.lbcwd.org/about-us/district-history",
        sourceLabel: "Laguna Beach County Water District, District History",
      },
      {
        text: "Utilities split at South Laguna. Southern California Edison serves central and North Laguna and San Diego Gas and Electric serves South Laguna; Laguna Beach County Water District supplies central and North Laguna, South Coast Water District supplies water and sewer to South Laguna, and the city's Water Quality Department runs the sewers elsewhere.",
        sourceUrl:
          "https://www.lagunabeachcity.net/live-here/utilities-school-district-information",
        sourceLabel: "City of Laguna Beach, Utilities and School District Information",
      },
      {
        text: "South Coast Water District's report for 2025 says about 85 percent of South Laguna's supply is imported treated surface water, including Baker plant water, and 15 percent is San Juan Basin groundwater treated by reverse osmosis at its Groundwater Recovery Facility. Hardness averaged 236 ppm, or 14 grains per gallon, for Metropolitan water, 293 ppm, or 17 grains, for Baker water, and 207 ppm, about 12 grains, for the recovery facility.",
        sourceUrl:
          "https://www.scwd.org/South%20Coast%20Water%20District%202026%20Water%20Quality%20Report.pdf",
        sourceLabel: "South Coast Water District 2026 Water Quality Report",
      },
      {
        text: "The city runs its own fire department from four stations covering 9 square miles of coastline and backcountry, each with a three-person engine company for an on-duty force of 12, plus a Type III wildland engine. It is part of the county-wide automatic mutual aid system, which sends the closest engine regardless of jurisdiction.",
        sourceUrl:
          "https://www.lagunabeachcity.net/government/departments/fire/operations",
        sourceLabel: "Laguna Beach Fire Department, Operations Division",
      },
      {
        text: "Design review comes before structural drawings go to the Building Division. It starts with a zoning plan check of about 30 days, the code requires early contact with neighbors, notices go to owners within 300 feet and tenants within 100 feet, and the Design Review Board meets twice a month. A 14-day appeal period follows a decision, and no building permit application may be filed during it.",
        sourceUrl:
          "https://www.lagunabeachcity.net/government/departments/community-development/planning/design-review-process",
        sourceLabel: "City of Laguna Beach, Design Review Process",
      },
      {
        text: "A home goes on the Historic Register only if the owner agrees and the Heritage Committee finds it qualifies, and a recorded preservation agreement then binds later owners. Registered homes can qualify for a Mills Act contract, but the city is not accepting Mills Act applications this year while it reviews the program.",
        sourceUrl:
          "https://www.lagunabeachcity.net/government/departments/community-development/planning-zoning/historic-preservation",
        sourceLabel: "City of Laguna Beach, Historic Preservation",
      },
    ],
  },

  neighborhoods: {
    names: [
      "North Laguna",
      "South Laguna",
      "Laguna Canyon",
      "Canyon Acres",
      "Mystic Hills",
      "Top of the World",
      "Bluebird Canyon",
      "Temple Hill",
    ],
    note: "These are the names the city's hazard plan uses. North Laguna, once Laguna Cliffs, lies north of Laguna Canyon, and South Laguna began as a separate settlement. Canyon Acres and Mystic Hills lost homes in the 1993 fire, Top of the World was evacuated during the 2018 Aliso Fire, and Bluebird Canyon slid in 1978 and 2005. Emerald Bay, an unincorporated community, is left off.",
    sourceUrl:
      "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
  },

  water: {
    utility: "Laguna Beach County Water District and South Coast Water District",
    utilityUrl: "https://www.lbcwd.org/your-water/water-quality",
    summary:
      "Your bill names your supplier. Laguna Beach County Water District serves central and North Laguna with Metropolitan Water District surface water from the Colorado River and the State Water Project, and its 2026 report on 2025 testing lists hardness averaging 236 ppm, or 14 grains per gallon, ranging from 191 to 280 ppm. South Laguna's water comes from South Coast Water District, whose figures are listed separately on this page.",
    sourceUrl:
      "https://www.lbcwd.org/home/showpublisheddocument/1471/639179875744500000",
    sourceLabel: "Laguna Beach County Water District 2026 Water Quality Report",
  },

  permits: {
    office: "City of Laguna Beach Building Division, Community Development Department",
    portalUrl: "https://lagunabeachca-energovweb.tylerhost.net/apps/SelfService",
    summary:
      "Permits and zoning plan checks go through the Public Permit Portal or the counter at City Hall, 505 Forest Avenue, (949) 497-0715, open Monday to Thursday 7:30 a.m. to 2:00 p.m. (last sign-in 12:45); City Hall closes alternate Fridays. The permit holder must be a contractor licensed in the city or an owner taking on the liability. Email inspection requests before 4:00 p.m. for the next business day; a permit expires unless an inspection passes every 180 days. Construction is weekdays only, 7:30 a.m. to 6:00 p.m.",
    sourceUrl:
      "https://www.lagunabeachcity.net/live-here/community-development/building-and-permits",
  },

  hazards: [
    {
      text: "The State Fire Marshal issued Laguna Beach's recommended Fire Hazard Severity Zone maps on March 24, 2025, and the City Council adopted them on June 24, 2025. The city's page links a printable map and two interactive maps that show whether an address is Moderate, High or Very High.",
      sourceUrl:
        "https://www.lagunabeachcity.net/government/departments/fire/fire-prevention/new-lra-fhsz-maps-for-public-comments",
      sourceLabel: "City of Laguna Beach, Fire Hazard Severity Zone Maps",
    },
    {
      text: "The fire department says 87 percent of the city's land, and about 65 percent of its buildable property, is in the Very High zone, without saying which map year the figure uses. Its programs are spring weed abatement, fuel modification that new construction and major remodels must maintain in perpetuity, defensible space elsewhere in the zone, and fuel breaks kept by goats and hand crews, and the department offers every owner a free wildfire consultation.",
      sourceUrl:
        "https://www.lagunabeachcity.net/our-initiatives/wildfire-mitigation",
      sourceLabel: "City of Laguna Beach, Wildfire Mitigation",
    },
    {
      text: "The hazard plan calls the arson-started Laguna Canyon Fire of October 27, 1993 the biggest in city history: it burned homes in Canyon Acres, Mystic Hills and Emerald Bay, injured 37 people, damaged or destroyed 441 structures, burned about 14,440 acres and caused about $530 million in damage. The 2018 Aliso Fire evacuated about 1,500 Top of the World residents.",
      sourceUrl:
        "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
      sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, wildfire history",
    },
    {
      text: "The water district counts 366 homes destroyed in 1993, over 500 damaged and over 17,000 acres burned, with six of its 22 reservoirs drained. It has since built two reservoirs totaling 8 million gallons, laid parallel pipelines for fire flow, and set a goal of 3,000 gallons per minute at hydrants where open space meets houses.",
      sourceUrl:
        "https://www.lbcwd.org/about-us/district-history/1993-fire-storm",
      sourceLabel: "Laguna Beach County Water District, 1993 Fire Storm",
    },
    {
      text: "The October 2, 1978 Bluebird Canyon slide damaged or destroyed 50 homes over about 3.5 acres and caused over $20 million in damage; on June 1, 2005 the rain-soaked slopes slid again, destroying 17 houses and damaging 11. The plan rates the slopes of Laguna, Bluebird and Aliso canyons, the area north of Temple Hill and many coastal bluffs as high or very high landslide risk.",
      sourceUrl:
        "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
      sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, landslide history",
    },
    {
      text: "The largest 100-year flood plain covers Laguna Canyon and the downtown below it, with others at Emerald, Bluebird and Aliso canyons. A December 1997 storm dropped 7.2 inches of rain and damaged City Hall, and December 2010 storms damaged over 90 homes, 70 businesses and the Main Beach boardwalk and broke sewer lines. Most beaches are in coastal flood zones; the rest of the city is Zone X.",
      sourceUrl:
        "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
      sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, flood history",
    },
    {
      text: "A tsunami could flood every beach, reach inland between Broadway and Forest Avenue near Main Beach and run up Aliso Creek as far as The Ranch, and a local one could arrive in under 10 minutes. No known active fault lies in an Alquist-Priolo zone in the city, and liquefaction risk is mainly at the beaches and in the Laguna, Bluebird and Aliso canyon bottoms.",
      sourceUrl:
        "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
      sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, tsunami and seismic sections",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb: "About 42 percent of homes here were built before 1960.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb: "Most of the city's land is in a Very High fire zone, which shapes what goes on top.",
    },
    {
      href: "/guides/hoa-coastal-commission-remodel-orange-county",
      title: "HOA and coastal permits in Orange County",
      blurb: "Nearly all of Laguna Beach is in the Coastal Zone.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Spring weed abatement, then gutters and tree trimming before storm season.",
    },
  ],

  neighbors: ["aliso-viejo", "laguna-niguel", "dana-point"],

  faq: [
    {
      q: "What work skips a permit in Laguna Beach?",
      a: "Very little: interior painting, wallpapering, flooring, window coverings and portable plug-in appliances. The city's permit page says building, altering or repairing a structure or its electrical, mechanical or plumbing systems needs one, and a project not on that short list probably does.",
    },
    {
      q: "Who issues coastal permits in Laguna Beach?",
      a: "The city, in most of town. The Coastal Zone covers all of Laguna Beach except Sycamore Hills, and since its Local Coastal Program was certified on January 13, 1993 the city issues Coastal Development Permits alongside design review. The Coastal Commission still issues them in Blue Lagoon, Irvine Cove and Three Arch Bay.",
    },
    {
      q: "Why are there goats on the hillsides in Laguna Beach?",
      a: "They maintain the fuel breaks. The fire department started the program in 1991, after the Oakland Hills Fire, and it now covers about 363 acres around most of the city's edge and in many interior canyons, with vegetation cut back 50 to 90 percent. Goats graze about 285 of those acres and hand crews do the rest.",
    },
  ],

  updated: "2026-09-20",
};
