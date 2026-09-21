import type { CityContent } from "./types";

// Laguna Niguel. Researched 2026-09-20 for the third city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a master-planned city on
// graded hills. The city's own hazard mitigation plan traces it to a 1959
// corporate master plan, the city counts more than 120 homeowner associations,
// and the two events that shape upkeep here are both documented by agencies:
// the 1998 El Nino landslides (the city's plan) and the May 2022 Coastal Fire
// (the Orange County Fire Authority's after action report, which counts 98 of
// the fire's acres inside Laguna Niguel and places the home losses on the
// Laguna Niguel side). That fire burned inside city limits, which is why it is
// on this page.
//
// WATER NUMBERS are from the Moulton Niguel Water District 2025 water quality
// report, read from the copy on the State Water Board's report portal because
// the district's own site turns away automated requests. That copy is a scan
// with no text layer; the hardness rows and the district's 15.45 grains
// sentence were read from the rendered page images. The district gets water
// from two treatment plants and reports them in two tables, so both are given
// and they are not averaged here.
//
// LEFT OUT ON PURPOSE. The cause of the Coastal Fire (the fire authority's
// report only says it was originally reported as a downed power line, and the
// later finding was only seen in a law firm's summary of a news story). The
// Monarch Beach vote (sources disagree on the year and only one soft source
// opened). The claim that a developer's fill caused the 1998 Via Estoril slide
// (Wikipedia only). Any Mello-Roos detail. Any acreage for the 2025 fire hazard
// zones (the city's page gives none). The 151 ppm hardness figure from a
// third-party aggregator. The city plan's "2,000-acre" figure for the Coastal
// Fire, which conflicts with the fire authority's 202.10 acres.

export const lagunaNiguel: CityContent = {
  name: "Laguna Niguel",
  slug: "laguna-niguel",
  intro:
    "Laguna Niguel was drawn up before it was built: the city's hazard plan traces it to the Laguna Niguel Corporation's 1959 master plan for about 7,100 acres, and today the city counts more than 120 homeowner associations spread across graded coastal hills. The median build year is 1986, and nearly two in three homes date from the 1980s and 1990s. Two documented events shape upkeep here: the 1998 El Nino landslides that collapsed four houses on Via Estoril, and the May 2022 Coastal Fire, which the Orange County Fire Authority says destroyed 20 homes after embers blew past a maintained fuel modification zone above Aliso Canyon.",
  metaDescription:
    "Laguna Niguel: a 1986 median build year, 120-plus HOAs, hard all-imported water, hillside slope care and what the 2022 Coastal Fire showed about embers.",

  population: {
    value: "About 64,139 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003; the city's hazard mitigation plan lists the 2020 Census count as 64,355",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0639248",
    sourceLabel: "Census Reporter, ACS 2020-2024 five-year table B01003",
  },

  homes: {
    exposure: "near-coastal",
    medianYearBuilt: "1986",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639248",
      sourceLabel: "Census Reporter, ACS 2020-2024 five-year table B25035",
    },
    facts: [
      {
        text: "Laguna Niguel's median year built is 1986. Of about 27,643 housing units, roughly 43.8 percent went up in the 1980s, 20.4 percent in the 1990s and 16.2 percent in the 1970s, while only about 1.3 percent predate 1960 and about 12 percent date from 2000 or later. A late 1980s house is at the age where the original roof underlayment, the second or third water heater, and the first furnace and air conditioner all come due within a few years of each other.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639248",
        sourceLabel:
          "Census Reporter, ACS 2020-2024 five-year tables B25034 and B25035",
      },
      {
        text: "The city's hazard mitigation plan gives the history behind those dates. The Laguna Niguel Corporation was established in 1959 by Cabot, Cabot and Forbes to build a master planned community, and Victor Gruen and Associates drew the community plan for the roughly 7,100-acre site. Land sales began in 1961 and Avco Community Developer took over the plan in 1971. The plan's Census table shows 4,644 residents in 1970, 12,237 in 1980 and 44,400 in 1990. Voters approved cityhood with 89 percent in favor, and Laguna Niguel incorporated on December 1, 1989 as the 29th city in Orange County.",
        sourceUrl:
          "https://www.cityoflagunaniguel.org/DocumentCenter/View/27301/City-of-Laguna-Niguel-LHMP-2023",
        sourceLabel: "City of Laguna Niguel, Local Hazard Mitigation Plan",
      },
      {
        text: "Homeowner associations are the norm here. The city describes Laguna Niguel as a master-planned community with over 120 homeowner associations, each governed by its own covenants, conditions and restrictions, and it points out that the associations are still subject to the city's zoning code and ordinances. In practice an exterior project such as a reroof, new windows or solar can need two approvals, the association's and the city's, so check your association's rules before you order materials.",
        sourceUrl: "https://www.cityoflagunaniguel.org/1431/HOA-Resources",
        sourceLabel: "City of Laguna Niguel, HOA Resources",
      },
      {
        text: "The slope behind the house may be yours to maintain. The city's slope maintenance handout says many homes sit at the top or along the base of privately owned hillsides, and that where a slope is not maintained by an association, especially in the older neighborhoods, the individual owner is responsible in most cases; the city does not maintain or repair slopes or drainage devices on private property. Its advice is to clear v-ditches before the winter rains, repair cracks in them, never drain water over the top of a slope, avoid over-irrigating, and avoid ice plant because it is heavy and shallow rooted. Slope repairs can need a grading permit, and the handout gives 949-362-4327 for the city's grading engineers.",
        sourceUrl:
          "https://www.cityoflagunaniguel.org/DocumentCenter/View/10448/101-Residential-Guidelines-for-Slope-Maintenance",
        sourceLabel:
          "City of Laguna Niguel, Residential Guidelines for Slope Maintenance",
      },
      {
        text: "Laguna Niguel has no border on the ocean: the city's hazard mitigation plan notes that Dana Point sits between the city and the Pacific, with elevations running from near sea level to 936 feet at Niguel Hill. The plan describes an average low of 45 degrees in the winter months, an average high of about 78 in summer, and rainfall averaging 13.1 inches a year. It calls that average misleading, because recorded totals have ranged from one-third of normal to more than double, and the rain tends to fall in sporadic, heavy storms. On a hillside lot that makes autumn the time to clear drains and look over the slope.",
        sourceUrl:
          "https://www.cityoflagunaniguel.org/DocumentCenter/View/27301/City-of-Laguna-Niguel-LHMP-2023",
        sourceLabel: "City of Laguna Niguel, Local Hazard Mitigation Plan",
      },
      {
        text: "Two electric utilities serve the city. The city's utilities page lists both San Diego Gas and Electric and Southern California Edison, and sends residents to its street light reporter tool to find out which company serves their address. It matters before a panel upgrade, a solar installation or an EV charger, because the service request and the rate plans belong to whichever utility owns the lines on your street.",
        sourceUrl: "https://www.cityoflagunaniguel.org/296/Utilities",
        sourceLabel: "City of Laguna Niguel, Utilities",
      },
      {
        text: "Rooftop solar has a same-day permit path. The city says licensed contractors can submit residential roof-mounted solar, with or without a panel upgrade or battery storage, through the SolarAPP+ platform for systems up to 38.4 kilowatts, then enter the approval number in the city's Online Permit Center and pay the fees, and the permit is issued the same day. Ground-mounted systems and owner-builder projects go through a regular building permit instead. SolarAPP+ charges its own $25 administration fee on top of the city's permit fees.",
        sourceUrl:
          "https://www.cityoflagunaniguel.org/1705/Residential-Solar-Permits-with-SolarAPP",
        sourceLabel:
          "City of Laguna Niguel, Residential Solar Permits with SolarAPP+",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Rancho Niguel",
      "Niguel Summit",
      "Coronado Pointe",
      "Marina Hills",
      "Bear Brand",
      "Kite Hill",
    ],
    note: "These names come from the homeowner association map the city publishes on its HOA Resources page, which lists each association with its unit count. Rancho Niguel is the largest master association on that map at 2,306 units, and the name goes back to the Mexican-era Rancho Niguel that the city's hazard plan describes. Marina Hills is listed at 1,538 units and Bear Brand at Laguna Niguel at 1,400. Niguel Summit is a master association of about 1,200 units on the ridge above Aliso Canyon, and Coronado Pointe is one of its gated sub-associations, 72 units, on the street the fire authority's Coastal Fire report names as the first to be threatened. Kite Hill is listed at 603 units. The map names more than a hundred associations, so this is a sample of the larger ones rather than a full list.",
    sourceUrl: "https://www.cityoflagunaniguel.org/1431/HOA-Resources",
  },

  water: {
    utility: "Moulton Niguel Water District",
    utilityUrl: "https://www.mnwd.com/",
    summary:
      "The city says water and sewer service in Laguna Niguel is provided by Moulton Niguel Water District. The district's 2025 water quality report says all of its drinking water is imported from the Metropolitan Water District of Southern California, which draws on the Colorado River and the State Water Project, and its system summary puts the share of drinking water imported at 100 percent, so there is no local groundwater in the mix. The water is treated at the Diemer plant in Yorba Linda and the Baker plant in Lake Forest, and the district says what reaches the tap is a blend of the two. They are not equally hard: in 2025 testing the Metropolitan treated water averaged 236 ppm, about 13.8 grains per gallon, with a range of 191 to 280 ppm, and the Baker plant water averaged 293 ppm, about 17.1 grains per gallon, with a range of 269 to 322 ppm. The district's own summary says the hardness found in its water in 2025 averaged 15.45 grains per gallon. That is hard water, and the report notes it leaves mineral deposits on plumbing fixtures over time. The district also disinfects with chloramines, which the report says matters to people who keep fish ponds or aquariums and to kidney dialysis patients.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010073&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Laguna Niguel Building & Safety Division",
    portalUrl: "https://cityoflagunaniguel.org/css",
    summary:
      "The Building & Safety Division sits inside Community Development at City Hall, 30111 Crown Valley Parkway. The city says its Online Permit Center can be used to apply for all building permits as well as to request inspections, and asks applicants to allow 24 hours for processing. Inspections can be scheduled in the Online Permit Center or by phone at 949-362-4381, and the city posts a daily inspection schedule that it updates at 8:30 a.m. The public counter is open Monday through Friday, 8 a.m. to 4 p.m., and the division's number is 949-362-4360. Before any grading or building work, plans have to be submitted and reviewed against the zoning rules, the grading code and the building code, which on a hillside lot is more than a formality.",
    sourceUrl: "https://www.cityoflagunaniguel.org/113/Building-Safety",
  },

  hazards: [
    {
      text: "Laguna Niguel has Fire Hazard Severity Zones under the state's 2025 maps. The city's page says Cal Fire released the updated map for Laguna Niguel on March 24, 2025, that the maps classify areas as Very High, High or Moderate, that a city may not reduce a designation, and that the City Council adopted the state-mandated ordinance on June 3, 2025. Inside a zone the page lists three duties: defensible space around buildings, fire-resistive construction under Chapter 7A of the building code for new buildings, and disclosure to a buyer. The page carries an interactive map that takes an address, and it notes that the Orange County Fire Authority offers defensible space disclosure inspections to homeowners.",
      sourceUrl:
        "https://www.cityoflagunaniguel.org/1120/Fire-Hazard-Severity-Zones-FHSZ",
      sourceLabel: "City of Laguna Niguel, Fire Hazard Severity Zones",
    },
    {
      text: "The May 2022 Coastal Fire burned inside Laguna Niguel. The Orange County Fire Authority's after action report says it was reported at 2:43 p.m. on May 11, 2022 on the Laguna Beach side of Aliso Canyon, spotted across the canyon about an hour later, and ran up the steep slope toward the homes on Coronado Pointe with onshore gusts measured at up to 29 miles per hour. It burned 202.10 acres, 98 of them inside Laguna Niguel, destroyed 20 homes and damaged 11, and about 900 homes were under mandatory evacuation. No lives were lost, and full containment came on May 17.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-8-23-22-Coastal-Fire.pdf",
      sourceLabel:
        "Orange County Fire Authority, Coastal Incident after action report",
    },
    {
      text: "The same report explains why cleared brush was not enough. The association had just passed its fuel modification inspection, with 130 feet cleared and maintained downslope from the fence line, yet the report says the heat of the fire drove past that zone and deposited embers several streets beyond Coronado Pointe, including La Vue, La Port and Club House Drive. Its risk reduction section found quarter-inch mesh on vents allowing ember intrusion, and tile roofs built before underlayment beneath the tile became standard, also allowing ember intrusion. Crews also met low water pressure early on, with many large house fires drawing on the system at once. For an owner that points at vents, the roof assembly and what sits against the house, not only the brush line.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-8-23-22-Coastal-Fire.pdf",
      sourceLabel:
        "Orange County Fire Authority, Coastal Incident after action report",
    },
    {
      text: "Landslides are a known hazard in the city, in the words of its own hazard mitigation plan, which says Laguna Niguel sits mostly on graded coastal hills or in the valleys between them, that hillside development is subject to landslides and that development in valley and canyon bottoms is subject to liquefaction. The plan records three major slides in the El Nino winter of 1998. On Vista Plaza Drive a 50-foot-tall slide damaged two homes beyond repair. On Via Estoril Drive a 125-foot engineered slope that had been creeping gave way in March 1998: four houses collapsed between March 19 and March 29, and condominiums at the base of the slope were damaged and evacuated. Check the state's landslide and liquefaction zone maps for your address before an addition, a pool or major drainage work.",
      sourceUrl:
        "https://www.cityoflagunaniguel.org/DocumentCenter/View/27301/City-of-Laguna-Niguel-LHMP-2023",
      sourceLabel: "City of Laguna Niguel, Local Hazard Mitigation Plan",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, and why the underlayment under a 1980s tile roof matters in a city where embers got in under the tile.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on imported water the district measures at about 14 to 17 grains per gallon.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs for a house built around the 1986 median, and central AC versus a heat pump.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including clearing slope drains before the winter storms the city warns about.",
    },
  ],

  neighbors: ["dana-point", "aliso-viejo", "laguna-beach"],

  faq: [
    {
      q: "Is my Laguna Niguel home in a fire hazard severity zone?",
      a: "It depends on the parcel. The city's page says Cal Fire's 2025 map for Laguna Niguel classifies areas as Very High, High or Moderate, and the City Council adopted it on June 3, 2025. The page has an interactive map where you enter your address. If you are inside a zone, the city lists defensible space, fire-resistive construction for new buildings and disclosure to buyers as the requirements, and the Orange County Fire Authority offers defensible space disclosure inspections.",
    },
    {
      q: "What did the Coastal Fire show about protecting a house in Laguna Niguel?",
      a: "That embers, not the flame front, are the problem. The Orange County Fire Authority's report says the association's 130-foot fuel modification zone was clear and had just passed inspection, and the fire still threw embers several streets into the neighborhood, destroying 20 homes and damaging 11. The report found quarter-inch vent mesh and older tile roofs without underlayment let embers in. Ember-resistant vents, a sound roof assembly, clean gutters and nothing combustible against the walls are the practical takeaways.",
    },
    {
      q: "Is Laguna Niguel's water hard?",
      a: "Yes. Moulton Niguel Water District's 2025 report says the hardness in its water averaged 15.45 grains per gallon. Its two source tables show Metropolitan treated water averaging about 13.8 grains and Baker plant water about 17.1, and the tap gets a blend. All of it is imported, so there is no local well water in the mix. Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour.",
    },
    {
      q: "Who is responsible for the slope behind my Laguna Niguel house?",
      a: "Often you are. The city's slope maintenance handout says that where a hillside is not maintained by a homeowner association, responsibility for the slope and its drainage falls on the individual property owner in most cases, and the city does not maintain or repair slopes or drains on private property. Check your association's documents first. Then keep the v-ditches clear before winter, fix cracks in them, and do not let water drain over the top of the slope. Repairs can require a grading permit.",
    },
    {
      q: "How do I get a building permit in Laguna Niguel?",
      a: "Online, for most things. The Building & Safety Division says its Online Permit Center can be used to apply for all building permits and to request inspections, and asks for 24 hours to process an application. Licensed contractors can get roof-mounted residential solar permits the same day through SolarAPP+. The counter at City Hall is open weekdays from 8 a.m. to 4 p.m. A licensed contractor normally pulls the permit as part of the job, and your homeowner association may want its own approval too.",
    },
  ],

  updated: "2026-09-20",
};
