import type { CityContent } from "./types";

// La Habra. Researched 2026-09-20 for the third city wave. Every number below
// was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: an Orange County city
// whose basics come from across the county line. The city's own pages say fire
// service is the Los Angeles County Fire Department under contract (never cite
// the Orange County Fire Authority here), and its 2025 Urban Water Management
// Plan says about 73 percent of supply is Main San Gabriel Basin groundwater
// bought from California Domestic Water Company. Add a 1968 median build year,
// the 2014 earthquake the city's hazard plan names after the town, and a 2025
// fire hazard map with a zoned band along the southern hills.
//
// WATER NUMBERS are from the report the city lists as its 2026 Water Quality
// Report (reporting year 2025), page 8, table "2025 City of La Habra
// Groundwater and Imported MWD Drinking Water Quality". The text layer was
// checked against the rendered page image. The report gives one "range of
// detections" column for all sources, so the range is not pinned to a source.
//
// FIRE ZONE GEOGRAPHY. The city's fire hazard page names no streets. The
// description of where the zones sit was read off the city's copy of the State
// Fire Marshal's map (rendered image), and is kept to edges and corners.
//
// LEFT OUT ON PURPOSE. The Hass avocado mother tree: the historical marker
// record places it on West Road in La Habra Heights, a separate city, so it is
// not a La Habra fact. Annual rainfall (aggregators gave 8 and 12 inches and no
// official figure turned up). The 2020 Census count (census.gov would not open).
// The hazard plan's own date and depth for the 2014 earthquake, which disagree
// with the USGS catalog; the USGS date is used. Liquefaction, landslide and
// fault-zone claims (the hazard plan defines them but maps none inside the
// city). Las Lomas and the Cervetto, Fairfield, Lambert/Idaho and Voit plan
// names (not confirmed as names residents use).

export const laHabra: CityContent = {
  name: "La Habra",
  slug: "la-habra",
  intro:
    "La Habra sits in Orange County, but its fire engines belong to the Los Angeles County Fire Department under contract, and about 73 percent of its water in fiscal 2024-25 was Main San Gabriel Basin groundwater bought from California Domestic Water Company. The median home was built in 1968, and the state's 2025 fire map draws Very High, High and Moderate zones along the southern edge, in hills that were once the West Coyote Hills oil field.",
  metaDescription:
    "La Habra's median home dates to 1968. Los Angeles County fire service, hard San Gabriel basin water, online permits and the 2025 fire zone map.",
  metaTitle: "La Habra homes: LA County fire, San Gabriel water",

  population: {
    value: "About 61,970 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003; the city's own history page says nearly 62,000",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0639290",
    sourceLabel: "Census Reporter, ACS 2024 five-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1968",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639290",
      sourceLabel: "Census Reporter, ACS 2024 five-year table B25035",
    },
    facts: [
      {
        text: "Of about 21,225 housing units, roughly 28.3 percent went up in the 1950s, 19.3 percent in the 1960s and 23.2 percent in the 1970s, about 71 percent in one thirty-year stretch. Only about 5.8 percent predate 1950 and about 7.7 percent date from 2000 or later.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639290",
        sourceLabel: "Census Reporter, ACS 2024 five-year tables B25034 and B25035",
      },
      {
        text: "La Habra was founded in 1896 around a post office in a corner store, incorporated on January 20, 1925 with 3,000 people and had only nearly 5,000 by 1950. Before the tracts it was farm and oil country: water lines from the San Gabriel River area fed walnuts, citrus and avocados, Standard Oil opened the Coyote Hills District in 1912, and by 1928 La Habra was the largest avocado center in Southern California. The avocado is still the official city tree.",
        sourceUrl: "https://www.lahabraca.gov/531/History",
        sourceLabel: "City of La Habra, history",
      },
      {
        text: "In fiscal 2024-25, about 73 percent of supply was Main San Gabriel Basin groundwater bought from California Domestic Water Company, 22 percent came from the city's Idaho Street and Portola wells in the La Habra Basin, and 5 percent was imported. The tie is old: the La Habra Water Company, incorporated in October 1902, originally owned half of California Domestic's stock.",
        sourceUrl:
          "https://www.lahabraca.gov/1116/Urban-Water-Management-Plan",
        sourceLabel: "City of La Habra, 2025 Urban Water Management Plan",
      },
      {
        text: "The 2019 Hazard Mitigation Plan describes a semi-arid climate, averaging the high 80s in summer and the high 40s in winter, and ranks extreme heat second among its hazards, occurring more than once a year. It notes several area-wide power outages, typically blackouts caused by extreme heat.",
        sourceUrl:
          "https://www.lahabraca.gov/DocumentCenter/View/13447/La-Habra-HMP-2019",
        sourceLabel: "City of La Habra, 2019 Hazard Mitigation Plan",
      },
      {
        text: "The city's permit process page lists additions, demolitions, new interior walls, new plumbing lines and fixtures, new wiring or light fixtures, and replacing or installing HVAC equipment as work that needs a building permit. Carpet, non-structural flooring, paint and wallpaper do not.",
        sourceUrl: "https://www.lahabraca.gov/217/Permit-Process",
        sourceLabel: "City of La Habra Building and Safety, permit process",
      },
    ],
  },

  neighborhoods: {
    names: ["La Habra Boulevard", "La Habra Hills", "Westridge"],
    note: "La Habra Boulevard, formerly Central Avenue, served as the central business district for over forty years after 1925 and has had its own specific plan since 1988. La Habra Hills, south of Imperial Highway and east of Beach Boulevard, is about 380 acres laid out around a golf course under a 1992 specific plan. Westridge is the city's own name: it lists Vista del Valle (Westridge) Park on Risner Way.",
    sourceUrl: "https://www.lahabraca.gov/318/Specific-Plans",
  },

  water: {
    utility: "City of La Habra Water Division",
    utilityUrl: "https://www.lahabraca.gov/198/Water-Sewer-Division",
    summary:
      "The City of La Habra Water Division blends three sources, and its report on 2025 testing lists hardness for each. The city's two La Habra Basin wells averaged 275 ppm, about 16 grains per gallon; California Domestic water from the Main San Gabriel Basin averaged 225 ppm, about 13 grains; and imported Metropolitan water averaged 236 ppm, about 14 grains. Detections across all three ranged from 191 to 280 ppm, and the report publishes no single blended figure for the tap.",
    sourceUrl: "https://www.lahabraca.gov/DocumentCenter/View/16156",
  },

  permits: {
    office: "City of La Habra Building and Safety Division",
    portalUrl:
      "https://cityoflahabraca-energovweb.tylerhost.net/apps/selfservice#/home",
    summary:
      "Every plan submittal and permit application goes through the city's Customer Self Service portal, where staff take one to three business days to check an application for completeness before emailing payment instructions or a request for more information. Plan-review projects go in as one PDF of the full plan set, with other documents as separate PDFs. The counter at 110 East La Habra Boulevard is open Monday through Thursday, 7:30 a.m. to 1:00 p.m., for questions, over the counter permits and pickup; the phone is 562-383-4116.",
    sourceUrl: "https://www.lahabraca.gov/205/Building-Safety",
  },

  hazards: [
    {
      text: "Fire and paramedic service comes from the Los Angeles County Fire Department, which the city hires under contract, rather than the Orange County Fire Authority or a city department. It serves La Habra from Stations 191, 192, 193 and 194.",
      sourceUrl: "https://www.lahabraca.gov/223/Fire-Stations-in-La-Habra",
      sourceLabel: "City of La Habra, fire stations in La Habra",
    },
    {
      text: "Some permits also need plan review and inspection by the Los Angeles County Fire Department, most often a solar system covering 50 percent or more of the roof. Improvements to buildings with fire sprinklers are on the same list.",
      sourceUrl: "https://www.lahabraca.gov/225/Fire-Department-Plan-Review",
      sourceLabel: "City of La Habra, Fire Department plan review",
    },
    {
      text: "The State Fire Marshal's March 24, 2025 map, as the city publishes it, shows Very High, High and Moderate zones along the southern edge next to Fullerton and a small pocket at the northeast corner by the county line, with the rest of the city unzoned. The city warns that some homes are newly included and says it will adopt an ordinance designating its Very High zones.",
      sourceUrl:
        "https://www.lahabraca.gov/1568/Fire-Hazard-Severity-Zone-maps",
      sourceLabel: "City of La Habra, Fire Hazard Severity Zone maps",
    },
    {
      text: "The 2019 Hazard Mitigation Plan, written before the new maps, says wildfire risk is highest where La Habra borders La Habra Heights to the northeast and that the expected type is an urban fire. The one local fire it describes, two acres on July 4, 2017, suspected to have been started by illegal fireworks, burned in La Habra Heights rather than in the city.",
      sourceUrl:
        "https://www.lahabraca.gov/DocumentCenter/View/13447/La-Habra-HMP-2019",
      sourceLabel: "City of La Habra, 2019 Hazard Mitigation Plan",
    },
    {
      text: "The USGS records a magnitude 5.1 earthquake on the evening of March 28, 2014, centered about 2 kilometers northwest of Brea, the city next door to the east.",
      sourceUrl: "https://earthquake.usgs.gov/earthquakes/eventpage/ci15481673",
      sourceLabel: "USGS, M 5.1 earthquake of March 2014 near Brea",
    },
    {
      text: "The 2019 plan ranks earthquake as its only High hazard. It calls the 2014 event the La Habra Earthquake, reports no major damage in the city, and names the Whittier Fault along the Chino Hills, with probable magnitudes of 6.0 to 7.2, as long overdue.",
      sourceUrl:
        "https://www.lahabraca.gov/DocumentCenter/View/13447/La-Habra-HMP-2019",
      sourceLabel: "City of La Habra, 2019 Hazard Mitigation Plan",
    },
    {
      text: "The same plan ranks flood lowest: the city is not prone to urban flooding, FEMA's October 2017 maps place it in Zone X, and no properties were identified with repetitive flood losses.",
      sourceUrl:
        "https://www.lahabraca.gov/DocumentCenter/View/13447/La-Habra-HMP-2019",
      sourceLabel: "City of La Habra, 2019 Hazard Mitigation Plan",
    },
    {
      text: "The 1992 La Habra Hills Specific Plan says its roughly 380 acres are part of the 915-acre West Coyote Hills Field, then in oil production. Before a pool, addition or deep footing there, check the lot on the state's oil and gas well map.",
      sourceUrl: "https://www.lahabraca.gov/DocumentCenter/View/182",
      sourceLabel: "City of La Habra, La Habra Hills Specific Plan",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "Nearly half of La Habra's homes went up in the 1950s and 1960s, on panels sized for then.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "Every city water source tests between about 13 and 16 grains per gallon.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "The city's hazard plan ranks extreme heat second, and an HVAC swap needs a permit.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Service the air conditioning before summer, when heat-driven blackouts hit.",
    },
  ],

  neighbors: ["fullerton", "brea"],

  faq: [
    {
      q: "Does a La Habra fire zone change anything when I sell or landscape?",
      a: "Yes, if your parcel is zoned. The city notes that state law requires a disclosure to buyers for property in a High or Very High zone, and defensible space compliance in a Very High zone.",
    },
    {
      q: "How long does plan review take in La Habra?",
      a: "About two weeks for the first review, according to the city's permit process page. Structural work needs plans and calculations before it goes in.",
    },
  ],

  updated: "2026-09-20",
};
