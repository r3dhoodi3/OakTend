import type { CityContent } from "./types";

// Yorba Linda. Researched 2026-09-19 for the second city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: fire, wind and water
// pressure. The city sits where Santa Ana Canyon opens up, its own page puts
// more than 4,700 acres in the state's Very High fire hazard tier, and the
// Orange County Fire Authority's after action report on the 2008 Freeway
// Complex Fire counts the homes lost inside city limits and explains why the
// hydrants in Hidden Hills ran low. That fire burned inside Yorba Linda, which
// is why it is on this page; fires that burned elsewhere are not.
//
// WATER NUMBERS are from the Yorba Linda Water District report with data
// collected in 2025, read from the copy on the State Water Board's report
// portal because the district's own copy is an interactive flipbook.
//
// LEFT OUT ON PURPOSE. Build years for East Lake Village, Vista Del Verde,
// Bryant Ranch, Travis Ranch and Kerrigan Ranch (only real-estate pages give
// them), any Mello-Roos detail (the one claim found came from an agent's
// blog), fault setback distances, landslide zones (the city's safety element
// would not open), and oil well history (nothing official that applies to a
// homeowner today).

export const yorbaLinda: CityContent = {
  name: "Yorba Linda",
  slug: "yorba-linda",
  intro:
    "Yorba Linda had about 1,198 residents when it incorporated in 1967, and most of what stands today was built in the two decades that followed, which is how the median build year lands at 1983. It sits where Santa Ana Canyon opens onto the county, a canyon the fire authority's own report calls a wind funnel, and the city says more than 4,700 of its acres are now in the state's Very High fire hazard tier. That makes roofing, vents and the first five feet around the house a bigger part of home maintenance here than almost anywhere else in Orange County.",
  metaDescription:
    "Yorba Linda sits at the mouth of Santa Ana Canyon. Fire hazard zones, very hard well water, online permits and what a 1983 median build year means.",
  metaTitle: "Yorba Linda: canyon wind, fire zones, hard water",

  population: {
    value: "About 66,487 people",
    asOf: "ACS 2024 one-year estimate, table B01003; the city itself says just over 68,000",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0686832",
  },

  homes: {
    exposure: "foothill",
    medianYearBuilt: "1983",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0686832",
      sourceLabel: "Census Reporter, ACS 2024 one-year table B25035",
    },
    facts: [
      {
        text: "Yorba Linda's median year built is 1983. Of about 22,701 housing units, roughly 32.8 percent went up in the 1980s, 21.4 percent in the 1970s and 14.9 percent in the 1960s, while only about 4.4 percent predate 1960 and about 16.3 percent date from 2000 or later. A 1980s house is at the age where the second roof, the second or third water heater and original windows all come due.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0686832",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "The city's own account of its growth: a farming community of two and a half square miles with approximately 1,198 residents incorporated on November 2, 1967, the population rose 890 percent that decade to 11,856 in 1970, reached 28,254 in 1980 and passed 52,000 by 1990. Growth has slowed since. The city describes itself today as about 20 square miles of mostly residential neighborhoods, parkland, open space and multi-use trails.",
        sourceUrl: "https://www.yorbalindaca.gov/222/About-Yorba-Linda",
        sourceLabel: "City of Yorba Linda, About Yorba Linda",
      },
      {
        text: "Wind is a documented local condition, not a figure of speech. The Orange County Fire Authority's after action report on the 2008 Freeway Complex Fire says Santa Ana Canyon's steep topography and east-west alignment serve as a wind funnel, and that this, together with offshore winds, resulted in extremely rapid fire spread. For a house that means roof edges, ridge caps, fences and patio covers take more wind load than they would a few miles west.",
        sourceUrl:
          "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
        sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
      },
      {
        text: "Yorba Linda averages about 15.46 inches of precipitation a year with an annual average high near 77 degrees. Rain arrives in a few winter storms rather than steadily, so hillside lots depend on clear drains, swales and downspouts for a handful of days a year, and sun and dry wind do the everyday wear on paint, sealants and roofing.",
        sourceUrl:
          "https://www.usclimatedata.com/climate/yorba-linda/california/united-states/usca1847",
        sourceLabel: "US Climate Data, Yorba Linda",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Main Street Historic District",
      "Yorba Linda Town Center",
      "Hidden Hills",
      "Locke Ranch",
    ],
    note: "Main Street is the city's original downtown, which the city describes as having grown from an unpaved road with scattered shops into today's street of family businesses, with several historic structures still standing; Yorba Linda Town Center is the shopping and dining district the city describes as the heart of town. Hidden Hills is the community the fire authority's 2008 report names repeatedly. Locke Ranch is a 400-acre strip of homes that the water district describes as cutting between its older western area and its newer eastern one. Plenty of other tract names are in everyday use here, but we could only find build years for them on real-estate pages, so they are not listed. The city also describes a citywide system of over 100 miles of trails coordinated for hikers, bikers and equestrians.",
    sourceUrl: "https://www.yorbalindaca.gov/158/Main-Street-Historic-District",
  },

  water: {
    utility: "Yorba Linda Water District",
    utilityUrl: "https://www.ylwd.com/about/service-area/",
    summary:
      "Yorba Linda Water District serves most of the city. The exception is Locke Ranch, which gets its water from Golden State Water Company's Placentia system and only its sewer service from the district. The district says that on average 85 percent of what it delivers is treated groundwater and about 15 percent is imported Metropolitan water. In 2025 testing the groundwater averaged 343 ppm of hardness, about 20 grains per gallon, with a range of 266 to 406 ppm, and the imported water averaged 236 ppm, about 14 grains per gallon, with a range of 191 to 280 ppm. That is very hard water by any household scale, and the district notes that taste and hardness can shift during the year as the sources change. The district also says its groundwater treatment plant, in service since December 2021, is the largest ion-exchange PFAS treatment facility in the nation.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010037&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Yorba Linda Building Division",
    portalUrl: "https://aca.accela.com/YORBALINDA/Default.aspx",
    summary:
      "The Building Division sits inside Community Development and takes online applications through its Accela Citizen Access portal. The city lists the projects eligible for online submittal: air conditioning and heating units, electrical service panel upgrades, EV charging stations, re-piping, like-for-like reroofs with no engineering calculations, roof mounted solar and water heaters. Two details matter locally. The city warns that some projects may require extra code upgrades if the address is within a high fire or fuel modification zone, and it says an initial electronic application may take up to ten city working days to process. The city's page gives 714-961-7120 as the number to confirm whether an address is in one of those zones.",
    sourceUrl: "https://www.yorbalindaca.gov/790/Online-Permit-Process",
  },

  hazards: [
    {
      text: "The city's own fire hazard page says Yorba Linda has Moderate, High and Very High Fire Hazard Severity Zones within its boundaries under the state's 2025 maps: more than 6,500 acres in total, with over 4,700 of those acres in the Very High tier. The zone applies by parcel and affects building standards, defensible space rules and real estate disclosure, so look up your own address on the map linked from that page.",
      sourceUrl:
        "https://www.yorbalindaca.gov/930/2025-CalFIRE-Fire-Hazard-Severity-Zone-M",
      sourceLabel: "City of Yorba Linda, 2025 Cal Fire fire hazard severity zone maps",
    },
    {
      text: "The November 2008 Freeway Complex Fire burned inside Yorba Linda. The fire authority's loss table for the city counts 9,525 residences threatened, 117 destroyed and 77 damaged, with structure and contents losses of about $124 million. Its assessment is the part worth remembering: the homes destroyed or damaged were victims of ember intrusion rather than direct flame, which points at attic vents, eaves, gutters and what is stored against the house.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
      sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
    },
    {
      text: "The same report documents what happened to water pressure in Hidden Hills that day. Fire crews met low or no pressure on several streets after heat shut down the Santiago booster pump station, and continued demand then drained the reservoir serving Hidden Hills and nearby communities until district staff completed repairs. It is a documented reason hillside owners here think about ember-resistant construction rather than counting on a hose.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
      sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
    },
    {
      text: "Yorba Linda has written its own fire construction rules for a long time. The report's code comparison shows the city's ordinance in effect from 1996 required a fire retardant Class A roof assembly on new construction and reconstruction in its designated Special Fire Protection Areas, the same roofing standard the state code adopted in 2008. On a reroof, ask for the Class A assembly rating in writing, not just the shingle brand.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
      sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, and why the assembly rating matters as much as the price in a fire zone.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on groundwater that averages about 20 grains per gallon.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs for a 1980s house, and central AC versus a heat pump.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including what to do before Santa Ana wind season.",
    },
  ],

  neighbors: ["anaheim", "placentia", "brea"],

  faq: [
    {
      q: "Is my Yorba Linda home in a fire hazard severity zone?",
      a: "There is a real chance it is, and it is decided parcel by parcel. The city's own page says Yorba Linda has Moderate, High and Very High zones under the state's 2025 maps, covering more than 6,500 acres, most of it in the Very High tier. Use the map linked from the city's fire hazard page to check your address, because the zone affects building standards on a reroof or addition, defensible space requirements and what has to be disclosed when you sell.",
    },
    {
      q: "What actually destroys homes in a Yorba Linda wildfire?",
      a: "Embers, according to the fire authority's review of the 2008 Freeway Complex Fire. Its assessment of the homes destroyed or damaged in Yorba Linda found they were victims of ember intrusion rather than direct flame, with some losses coming from one burning house igniting the homes beside it. In maintenance terms that means ember-resistant attic and foundation vents, clean gutters and roof valleys, and nothing combustible stacked against the walls.",
    },
    {
      q: "Is Yorba Linda's water hard?",
      a: "Very. Yorba Linda Water District's report shows its groundwater averaging about 20 grains per gallon and its imported water about 14, and the district says most of what it serves is groundwater. It also notes that hardness can change through the year as it switches sources. Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour here.",
    },
    {
      q: "Can I pull a permit online for a water heater or reroof in Yorba Linda?",
      a: "Yes. The city lists water heaters, air conditioning and heating units, electrical service panel upgrades, re-piping and like-for-like reroofs among the projects eligible for online submittal through its Accela portal. It also warns that a project inside a high fire or fuel modification zone may need extra code upgrades, so confirm your address with the Building Division before you order materials. A licensed contractor normally pulls the permit as part of the job.",
    },
    {
      q: "Does all of Yorba Linda get water from the same provider?",
      a: "Almost. Yorba Linda Water District serves most of the city, but the district's own service area page says the Locke Ranch area receives its water from Golden State Water Company's Placentia system while the district provides only the sewer service there. The hardness figures on this page are the district's, so a Locke Ranch home should read Golden State Water's report instead.",
    },
  ],

  updated: "2026-09-19",
};
