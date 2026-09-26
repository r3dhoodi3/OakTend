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
    "Laguna Beach is a narrow strip of coves, terraces and canyons between the Pacific and the San Joaquin Hills, and its own fire department says 87 percent of the city's land area is in a Very High Fire Hazard Severity Zone. The houses are old: the median build year is 1964, and about 16 percent of homes went up before 1940. The city's hazard plan lists what that setting has cost, from the October 27, 1993 Laguna Canyon Fire to the Bluebird Canyon landslides of 1978 and 2005 and the December 2010 storms that damaged more than 90 homes. On top of salt air, the city warns that a project here will most likely need discretionary approval, such as design review, before it can apply for a building permit.",
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
        text: "Laguna Beach's median year built is 1964. Of about 13,598 housing units, roughly 15.7 percent were built before 1940, 10.8 percent in the 1940s, 15.7 percent in the 1950s, 20.2 percent in the 1960s and 13.1 percent in the 1970s, with 9.7 percent from the 1980s, 5.9 percent from the 1990s and about 8.9 percent from 2000 or later. These are survey estimates with margins of error, but about 42 percent of homes predate 1960. In a house that age, ask about the wiring, the drain lines and the foundation before you ask about finishes.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639178",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The city's hazard plan tells the town's history in a few lines. The first American settler arrived in 1871, 15 families lived here permanently by 1888, and the settlement near the mouth of Laguna Canyon was called Lagona until 1904, with South Laguna a separate settlement. The area became a center for artists from 1903, investors bought North Laguna, then called Laguna Cliffs, from the Irvine Ranch, Pacific Coast Highway arrived in 1926, and the city incorporated in 1927 with approximately 1,900 people.",
        sourceUrl:
          "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
        sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, community profile",
      },
      {
        text: "The town's water district exists because the wells failed. The district's history says heavy pumping and saltwater intrusion ended the private Laguna Canyon supply in 1924, so five residents posing as a duck hunting club bought 120 acres of water-bearing land 20 miles north in Huntington Beach. Voters formed the Laguna Beach County Water District on May 4, 1925 by 359 to 0, approved a $600,000 bond on January 5, 1926 by 437 to 0, and water reached the reservoirs in spring 1927. When that groundwater turned salty too, the district began buying Colorado River water in 1943.",
        sourceUrl: "https://www.lbcwd.org/about-us/district-history",
        sourceLabel: "Laguna Beach County Water District, District History",
      },
      {
        text: "Utilities split between Laguna and South Laguna. The city's utilities page says Southern California Edison provides electricity to central and North Laguna and San Diego Gas and Electric to South Laguna, that Laguna Beach County Water District provides water to central and North Laguna, and that South Coast Water District provides water and sewer service to South Laguna. Sewers elsewhere belong to the city's own Water Quality Department. Know which side you are on before you call about an outage or a sewer backup.",
        sourceUrl:
          "https://www.lagunabeachcity.net/live-here/utilities-school-district-information",
        sourceLabel: "City of Laguna Beach, Utilities and School District Information",
      },
      {
        text: "South Laguna's water is a different blend from the rest of town. South Coast Water District's report for 2025 says approximately 85 percent of its supply is imported treated surface water, including water from the Baker Water Treatment Plant, and about 15 percent comes from its Groundwater Recovery Facility, which treats San Juan Basin groundwater by reverse osmosis. Its hardness rows: Metropolitan water averaged 236 ppm or 14 grains per gallon, Baker plant water 293 ppm or 17 grains with a range of 269 to 322 ppm, and recovery facility water 207 ppm, about 12 grains by conversion, with a range of 200 to 214 ppm.",
        sourceUrl:
          "https://www.scwd.org/South%20Coast%20Water%20District%202026%20Water%20Quality%20Report.pdf",
        sourceLabel: "South Coast Water District 2026 Water Quality Report",
      },
      {
        text: "Laguna Beach runs its own fire department. The department's operations page says it works out of four fire stations covering 9 square miles of coastline and backcountry, each staffed with a three-person engine company for an on-duty force of 12, and that its fleet includes a Type III wildland engine. It also takes part in the county-wide automatic mutual aid system that sends the closest available engine regardless of jurisdiction.",
        sourceUrl:
          "https://www.lagunabeachcity.net/government/departments/fire/operations",
        sourceLabel: "Laguna Beach Fire Department, Operations Division",
      },
      {
        text: "Plan for design review before you plan the kitchen. The city's design review page says a project will most likely require discretionary approval before structural drawings go to the Building Division. It starts with a zoning plan check of roughly 30 days, the municipal code requires early communication with neighbors, hearing notices are mailed to owners within 300 feet and tenants within 100 feet, and the Design Review Board meets twice a month. After a decision there is a 14-day appeal period during which no building permit application may be filed.",
        sourceUrl:
          "https://www.lagunabeachcity.net/government/departments/community-development/planning/design-review-process",
        sourceLabel: "City of Laguna Beach, Design Review Process",
      },
      {
        text: "Historic listing here is voluntary. The city's historic preservation page says a home goes on the Historic Register only when the owner agrees and the Heritage Committee finds it meets the criteria, and that a recorded preservation agreement then applies to later owners. A registered home can become eligible for a Mills Act contract, but the same page says Mills Act applications will not be accepted this year while the city reviews the program. If you are buying an older house, ask whether it is on the register and whether an agreement is recorded.",
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
    note: "These are names the city's own hazard plan uses. North Laguna, once called Laguna Cliffs, is the part developed north of Laguna Canyon, and South Laguna began as a separate settlement. Canyon Acres and Mystic Hills are named among the neighborhoods that lost homes in the 1993 fire, Top of the World was evacuated during the 2018 Aliso Fire, and Bluebird Canyon is where the 1978 and 2005 landslides happened. Emerald Bay, which the water district describes as an unincorporated community, is left off.",
    sourceUrl:
      "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
  },

  water: {
    utility: "Laguna Beach County Water District and South Coast Water District",
    utilityUrl: "https://www.lbcwd.org/your-water/water-quality",
    summary:
      "Laguna Beach has two water suppliers, and your bill names yours. The city's utilities page says Laguna Beach County Water District provides water to central and North Laguna and South Coast Water District provides water and sewer service to South Laguna. The county water district's 2026 report, covering 2025 testing, describes its drinking water as surface water imported by the Metropolitan Water District of Southern California from the Colorado River and the State Water Project. It lists total hardness averaging 236 ppm, or 14 grains per gallon, with a range of 191 to 280 ppm, or 11 to 16 grains. South Coast Water District's figures for South Laguna are listed separately above. Either way the water is hard: flush a tank water heater once a year and descale a tankless unit on the manufacturer's schedule.",
    sourceUrl:
      "https://www.lbcwd.org/home/showpublisheddocument/1471/639179875744500000",
    sourceLabel: "Laguna Beach County Water District 2026 Water Quality Report",
  },

  permits: {
    office: "City of Laguna Beach Building Division, Community Development Department",
    portalUrl: "https://lagunabeachca-energovweb.tylerhost.net/apps/SelfService",
    summary:
      "The Building Division is at City Hall, 505 Forest Avenue, and its number is (949) 497-0715. The city says building permits and zoning plan checks can be submitted through its Public Permit Portal. Counter hours are Monday to Thursday, 7:30 a.m. to 2:00 p.m., with the last sign-in at 12:45 p.m. and building plan review from 7:30 to 11:00 a.m., and City Hall is closed on alternate Fridays. To get a permit the city says you must hire a contractor licensed in the city or show proof of ownership and take on the liability yourself. Inspections are requested by email before 4:00 p.m. for the next business day, and a permit expires if an inspection is not passed every 180 days. Construction hours are 7:30 a.m. to 6:00 p.m. on weekdays only.",
    sourceUrl:
      "https://www.lagunabeachcity.net/live-here/community-development/building-and-permits",
  },

  hazards: [
    {
      text: "The State Fire Marshal issued its 2025 recommended Fire Hazard Severity Zone maps for Laguna Beach on March 24, 2025, and the city's page says the City Council adopted them on June 24, 2025. The page links a printable citywide map and two interactive maps where you can search an address and see whether it is rated Moderate, High or Very High. Check your own address rather than assuming from a neighbor's.",
      sourceUrl:
        "https://www.lagunabeachcity.net/government/departments/fire/fire-prevention/new-lra-fhsz-maps-for-public-comments",
      sourceLabel: "City of Laguna Beach, Fire Hazard Severity Zone Maps",
    },
    {
      text: "The fire department's wildfire mitigation page says 87 percent of the city's land area is within the Very High Fire Hazard Severity Zone, and that while much of that is open space, approximately 65 percent of the buildable property is too. The page does not say which map year that figure comes from. It lists four programs: annual spring weed abatement, fuel modification that new construction and major remodels must maintain in perpetuity, defensible space for other properties in the zone, and fuel breaks kept up by goat grazing and hand crews. The department offers a free wildfire consultation to all property owners.",
      sourceUrl:
        "https://www.lagunabeachcity.net/our-initiatives/wildfire-mitigation",
      sourceLabel: "City of Laguna Beach, Wildfire Mitigation",
    },
    {
      text: "The city's hazard plan calls the Laguna Canyon Fire, which began on October 27, 1993, the biggest wildfire in the city's history. It says the fire was started by arson, burned homes in Canyon Acres, Mystic Hills and Emerald Bay, injured 37 people with no deaths, damaged or destroyed 441 structures, burned approximately 14,440 acres and caused approximately $530 million in damage. The plan also lists the 2018 Aliso Fire, which forced about 1,500 Top of the World residents to evacuate.",
      sourceUrl:
        "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
      sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, wildfire history",
    },
    {
      text: "The water district keeps its own account of the 1993 fire, with different totals: 366 homes destroyed, over 500 more damaged and over 17,000 acres burned. It says six of its twenty-two reservoirs were completely drained. Since then the district says it has built two reservoirs totaling 8 million gallons, laid parallel pipelines for fire flow and set a goal of 3,000 gallons per minute at hydrants where open space meets houses.",
      sourceUrl:
        "https://www.lbcwd.org/about-us/district-history/1993-fire-storm",
      sourceLabel: "Laguna Beach County Water District, 1993 Fire Storm",
    },
    {
      text: "Landslides are a recorded, repeating hazard. The city's hazard plan says the October 2, 1978 slide damaged or destroyed 50 homes in Bluebird Canyon, covered about 3.5 acres and caused over $20 million in damage, and that on June 1, 2005 the slopes above Bluebird Canyon, weakened by winter rain, slid again, destroying 17 houses and damaging 11. It rates the slopes on either side of Laguna, Bluebird and Aliso canyons, the area north of Temple Hill and many coastal bluffs as high or very high risk. On a slope, where roof and yard water goes is a maintenance item.",
      sourceUrl:
        "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
      sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, landslide history",
    },
    {
      text: "Downtown sits at the bottom of Laguna Canyon, and the hazard plan says the largest 100-year flood plain covers the canyon and the part of downtown directly below it, with others at Emerald, Bluebird and Aliso canyons. Its flood table says a December 1997 storm dropped 7.2 inches of rain and damaged City Hall, and that December 2010 storms damaged over 90 homes and 70 businesses as well as the Main Beach boardwalk and broke sewer lines. Most beaches are in coastal flood zones, and the rest of the city is Zone X, minimal hazard.",
      sourceUrl:
        "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
      sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, flood history",
    },
    {
      text: "The same plan says all beaches in the city could be inundated by a tsunami, that near Main Beach the water could reach inland between Broadway and Forest Avenue, and that a tsunami could travel up Aliso Creek as far as The Ranch. It says a locally generated wave could arrive in less than 10 minutes. On earthquakes it says there are no known active faults inside an Alquist-Priolo zone in the city, and that liquefaction risk is mainly at the beaches and in the canyon bottoms, including the roads and properties of Laguna, Bluebird and Aliso canyons.",
      sourceUrl:
        "https://www.lagunabeachcity.net/home/showpublisheddocument/17422/638388384762330000",
      sourceLabel: "City of Laguna Beach 2023 Local Hazard Mitigation Plan, tsunami and seismic sections",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "What an upgrade runs, for a city where about 42 percent of homes were built before 1960.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, in a town with a 1964 median build year where the fire department says most of the land is in a Very High fire zone.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair still makes sense, on water both districts report at roughly 12 to 17 grains per gallon.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month, including spring weed abatement and the gutter cleaning and tree trimming the city asks for before storm season.",
    },
  ],

  neighbors: ["aliso-viejo", "laguna-niguel", "dana-point"],

  faq: [
    {
      q: "Is Laguna Beach water hard?",
      a: "Yes. Laguna Beach County Water District's 2026 report, covering 2025 testing, lists total hardness averaging 236 ppm, or 14 grains per gallon, with a range of 191 to 280 ppm. In South Laguna, South Coast Water District's 2025 averages run from 207 ppm for its Groundwater Recovery Facility water to 293 ppm, or 17 grains, for Baker plant water. Flush a tank water heater yearly and expect scale on fixtures and glass.",
    },
    {
      q: "Who provides fire service in Laguna Beach?",
      a: "The city's own Laguna Beach Fire Department. Its operations page says it runs four fire stations, each staffed with a three-person engine company, for an on-duty firefighting force of 12. It also takes part in the county-wide automatic mutual aid system, which sends the closest available engine regardless of jurisdiction, so an engine from a neighboring agency may answer a call here and a Laguna Beach engine may answer one elsewhere.",
    },
    {
      q: "Do I need a permit to replace a water heater or reroof in Laguna Beach?",
      a: "Almost certainly. The city's permit page says permits are required before constructing, altering or repairing a building or an electrical, mechanical or plumbing system, and its list of common projects that do not need one is short: interior painting, wallpapering, flooring, window coverings and portable plug-in appliances. It adds that if your project is not on that list, it probably requires a permit. A licensed plumber or roofer normally pulls it, and the Building Division's number is (949) 497-0715.",
    },
    {
      q: "Does my Laguna Beach remodel need design review or a Coastal Development Permit?",
      a: "Quite possibly both. The city's design review page says a project will most likely require discretionary approval before it reaches the Building Division, with a Coastal Development Permit filed as a companion application. A city FAQ says the Coastal Zone takes in all of Laguna Beach except the Sycamore Hills area. The city's Local Coastal Program was certified on January 13, 1993, which is why the city issues those permits, except in Blue Lagoon, Irvine Cove and Three Arch Bay, where the Coastal Commission still does.",
    },
    {
      q: "Why are there goats on the hillsides in Laguna Beach?",
      a: "They maintain the fuel breaks. The fire department says it started the fuel break program in 1991, after the Oakland Hills Fire, and that it now covers approximately 363 acres around most of the city's outer edge and in many interior canyons. Vegetation in a break is reduced by 50 to 90 percent. Approximately 285 of those acres are maintained by goat grazing and the rest by hand crews.",
    },
  ],

  updated: "2026-09-20",
};
