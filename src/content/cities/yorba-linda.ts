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
    "Yorba Linda sits where Santa Ana Canyon opens onto the county, a canyon the fire authority's own report calls a wind funnel, and the city says more than 4,700 of its acres are in the state's Very High fire hazard tier. It had about 1,198 residents when it incorporated in 1967, and most of today's houses went up in the two decades after.",
  metaDescription:
    "Yorba Linda sits at the mouth of Santa Ana Canyon. Fire hazard zones, lessons from the 2008 fire, very hard well water and which permits go online.",
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
        text: "Of about 22,701 housing units, roughly 32.8 percent went up in the 1980s, 21.4 percent in the 1970s and 14.9 percent in the 1960s, while only about 4.4 percent predate 1960 and about 16.3 percent date from 2000 or later.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0686832",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "The farming community of two and a half square miles incorporated on November 2, 1967, then grew 890 percent to 11,856 people by 1970, 28,254 by 1980 and past 52,000 by 1990. Today the city covers about 20 square miles of mostly homes, parkland, open space and trails.",
        sourceUrl: "https://www.yorbalindaca.gov/222/About-Yorba-Linda",
        sourceLabel: "City of Yorba Linda, About Yorba Linda",
      },
      {
        text: "The fire authority's report on the 2008 Freeway Complex Fire says Santa Ana Canyon's steep, east-west terrain acts as a wind funnel, and that this, with offshore winds, drove extremely rapid fire spread.",
        sourceUrl:
          "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
        sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
      },
      {
        text: "Yorba Linda averages about 15.46 inches of precipitation a year, arriving in a few winter storms, with an annual average high near 77 degrees.",
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
    note: "Main Street is the original downtown, grown from an unpaved road into a street of family businesses with several historic buildings still standing. Town Center is the shopping and dining district. Hidden Hills is the community the fire authority's 2008 report names again and again. Locke Ranch is a 400-acre strip of homes between the water district's older western area and newer eastern one. The city also has over 100 miles of trails for hikers, bikers and riders.",
    sourceUrl: "https://www.yorbalindaca.gov/158/Main-Street-Historic-District",
  },

  water: {
    utility: "Yorba Linda Water District",
    utilityUrl: "https://www.ylwd.com/about/service-area/",
    summary:
      "Yorba Linda Water District delivers on average about 85 percent treated groundwater and 15 percent imported Metropolitan water. In 2025 testing the groundwater averaged 343 ppm of hardness, about 20 grains per gallon (range 266 to 406), and the imported water 236 ppm, about 14 grains, and the district notes hardness shifts through the year as sources change. Its groundwater treatment plant, in service since December 2021, is by the district's account the largest ion-exchange PFAS facility in the nation.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010037&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Yorba Linda Building Division",
    portalUrl: "https://aca.accela.com/YORBALINDA/Default.aspx",
    summary:
      "Online applications go through the Accela Citizen Access portal, which takes AC and heating units, panel upgrades, EV chargers, repipes, like-for-like reroofs without engineering, roof solar and water heaters. A first electronic application can take up to ten city working days. Projects in a high fire or fuel modification zone may need extra code upgrades; call 714-961-7120 to check an address.",
    sourceUrl: "https://www.yorbalindaca.gov/790/Online-Permit-Process",
  },

  hazards: [
    {
      text: "Under the state's 2025 maps the city has Moderate, High and Very High Fire Hazard Severity Zones covering more than 6,500 acres, over 4,700 of them Very High. The zone applies by parcel and affects building standards, defensible space rules and sale disclosures; the city's page links the map.",
      sourceUrl:
        "https://www.yorbalindaca.gov/930/2025-CalFIRE-Fire-Hazard-Severity-Zone-M",
      sourceLabel: "City of Yorba Linda, 2025 Cal Fire fire hazard severity zone maps",
    },
    {
      text: "In the November 2008 Freeway Complex Fire, the fire authority counted 9,525 Yorba Linda residences threatened, 117 destroyed and 77 damaged, with structure and contents losses of about $124 million.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
      sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
    },
    {
      text: "That day in Hidden Hills, crews met low or no water pressure on several streets after heat shut down the Santiago booster pump station, and continued demand drained the reservoir serving Hidden Hills and nearby communities until district staff completed repairs.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
      sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
    },
    {
      text: "Since 1996 a city ordinance has required a Class A fire retardant roof assembly on new construction and reconstruction in Yorba Linda's Special Fire Protection Areas, the standard state code adopted in 2008.",
      sourceUrl:
        "https://storageocfaprod001.blob.core.windows.net/blobocfaprod01/2025/02/OCFA-AAR-Freeway-Complex-Fire.pdf",
      sourceLabel: "Orange County Fire Authority, Freeway Complex Fire after action report",
    },
  ],

  guides: [
    {
      href: "/guides/santa-ana-wind-wildfire-home-prep",
      title: "Santa Ana wind and wildfire prep",
      blurb:
        "Ember-resistant vents and roofing for a city with over 4,700 acres of Very High zone.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "In Yorba Linda's fire zones the Class A assembly rating matters as much as the price.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Sizing a new tank for district groundwater at about 20 grains per gallon.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Gutters, vents and clear drains before Santa Ana season and the few winter storms.",
    },
  ],

  neighbors: ["anaheim", "placentia", "brea"],

  faq: [
    {
      q: "What actually destroys homes in a Yorba Linda wildfire?",
      a: "Embers, according to the fire authority's review of the 2008 Freeway Complex Fire. It found the Yorba Linda homes destroyed or damaged were victims of ember intrusion rather than direct flame, some lit by a burning house next door, which points at attic and foundation vents, gutters and anything combustible against the walls.",
    },
    {
      q: "Does all of Yorba Linda get water from the same provider?",
      a: "Almost. The district's service area page says Locke Ranch gets its water from Golden State Water Company's Placentia system, with only sewer service from the district, so a Locke Ranch home should read Golden State's report for hardness.",
    },
  ],

  updated: "2026-09-19",
};
