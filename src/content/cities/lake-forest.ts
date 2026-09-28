import type { CityContent } from "./types";

// Lake Forest. Researched 2026-09-19 for the second city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: the city is two places
// joined in 2000. The original El Toro and Lake Forest tracts around the two
// man-made lakes and the eucalyptus grove, and the foothill communities of
// Foothill Ranch and Portola Hills, which back onto land the state rates Very
// High for fire. On top of that, three different water agencies serve it.
//
// WATER NUMBERS. Only El Toro Water District's report (2025 testing) was
// readable, so those are the only hardness numbers here. Irvine Ranch Water
// District, which serves most residents, publishes its report as an
// interactive flipbook we could not read; its own plain-language page about
// Lake Forest is quoted instead. Trabuco Canyon Water District's site blocks
// automated reads entirely.
//
// LEFT OUT ON PURPOSE. Which streets belong to which water district (the city
// publishes no boundary list), which fire zone tier covers which neighborhood
// (the 2025 map is an image), whether the council has adopted that map yet,
// evacuation details for the 2020 fires, Mello-Roos districts, the home count
// at Baker Ranch, the "Woods" and "Keys" neighborhood names (no source), and
// the humidity figure in the city's hazard plan, which is plainly a typo.

export const lakeForest: CityContent = {
  name: "Lake Forest",
  slug: "lake-forest",
  intro:
    "Lake Forest was the community of El Toro until it incorporated in 1991, and it takes its name from two man-made lakes and about 400 acres of eucalyptus planted in the early 1900s. In 2000 the city annexed Foothill Ranch and Portola Hills, so it is two places: a 1970s and 1980s flatland suburb, and newer foothill neighborhoods against the Santa Ana Mountains, where the fire and slope advice changes.",
  metaDescription:
    "Lake Forest is two places: the older El Toro tracts and the Foothill Ranch hills. Three water districts, eucalyptus, fire zones and permit steps, sourced.",
  metaTitle: "Lake Forest: El Toro tracts, foothill fire zones",

  population: {
    value: "About 87,164 people",
    asOf: "ACS 2024 one-year estimate, table B01003",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0639496",
  },

  homes: {
    exposure: "foothill",
    medianYearBuilt: "1985",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639496",
      sourceLabel: "Census Reporter, ACS 2024 one-year table B25035",
    },
    facts: [
      {
        text: "Of about 31,620 housing units, roughly 25.6 percent went up in the 1970s, 32.4 percent in the 1980s and 15.5 percent in the 1990s; about 1 percent predates 1960 and 15.1 percent is from 2010 or later. The common house is 35 to 50 years old, past its first roof and often on original windows and ducting.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639496",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "Dwight Whiting planted 400 acres of eucalyptus near Serrano Creek in the 1900s as a lumber venture, and in the late 1960s Occidental Petroleum built a residential community in and around the groves, which had spread and thickened by then. Mature eucalyptus beside a house means limb drop, heavy gutter loads and roots near drains and hardscape.",
        sourceUrl: "https://en.wikipedia.org/wiki/Lake_Forest,_California",
        sourceLabel: "Wikipedia, Lake Forest history",
      },
      {
        text: "Foothill Ranch was completed in 1996 and the Portola Hills tracts went up from the late 1980s through the early 1990s; the city's hazard plan says Lake Forest took in both nine years after its 1991 incorporation. Those homes are now about 30 years old, the usual point for a first reroof.",
        sourceUrl: "https://en.wikipedia.org/wiki/Foothill_Ranch,_California",
        sourceLabel: "Wikipedia, Foothill Ranch",
      },
      {
        text: "The city's hazard plan puts average rainfall at 14 inches a year, the average summer high at 83 degrees and the winter high at 67, at an average elevation of 489 feet. It calls Santa Ana winds a significant hazard, able to reach 80 miles per hour with very low humidity, which tests roofs and fences as well as wildfire defenses.",
        sourceUrl:
          "https://www.lakeforestca.gov/Documents/Departments/Public%20Safety/Local%20Hazard%20Mitigation%20Plan/FINAL-City-of-Lake-Forest-LHMP-9-6-24.pdf",
        sourceLabel: "City of Lake Forest Local Hazard Mitigation Plan, 2024",
      },
      {
        text: "The Orange County Fire Authority provides fire protection, inspections, paramedic service and hazardous material response, from three stations in the city: Station 19 on El Toro Road, Station 42 on Ridgeline Road and Station 54 on Pauling Avenue.",
        sourceUrl: "https://www.lakeforestca.gov/departments/fire/index.php",
        sourceLabel: "City of Lake Forest, fire services",
      },
    ],
  },

  neighborhoods: {
    names: [
      "El Toro",
      "Lake Forest Beach and Tennis Club area",
      "Sun and Sail Club area",
      "Foothill Ranch",
      "Portola Hills",
      "Baker Ranch",
    ],
    note: "El Toro was the community's name from the 1860s until the city incorporated as Lake Forest on December 20, 1991, and people still use it. The two lakes go by their clubhouses, the Beach and Tennis Club and the Sun and Sail Club, run by neighborhood associations. Foothill Ranch and Portola Hills, the latter named for Gaspar de Portola, are the foothill communities annexed in 2000. Baker Ranch is the newest large community; no sourced home count or build dates were found for it.",
    sourceUrl: "https://en.wikipedia.org/wiki/Lake_Forest,_California",
  },

  water: {
    utility: "Irvine Ranch Water District, El Toro Water District and Trabuco Canyon Water District",
    utilityUrl:
      "https://www.lakeforestca.gov/community/resident_guide/utility_services.php",
    summary:
      "The city runs no water or sewer service. Its resident guide lists Irvine Ranch Water District, which serves most residents and was formerly the Los Alisos Water District here, plus El Toro Water District and Trabuco Canyon Water District. Irvine Ranch says its Lake Forest customers get mostly imported water year-round, so it stays consistently hard. El Toro's report for 2025 testing shows its Metropolitan supply averaging 236 ppm, about 14 grains per gallon (range 191 to 280 ppm), and its Baker plant water averaging 293 ppm, about 17 grains (range 269 to 322 ppm). Readable figures for the other two districts were not available.",
    sourceUrl:
      "https://etwd.com/files/Water%20Quality%20Reports/2026ETWDCCR-v8-WEB-singlepages.pdf",
  },

  permits: {
    office: "City of Lake Forest Building Division",
    portalUrl:
      "https://cityoflakeforestca-energovweb.tylerhost.net/apps/selfservice#/home",
    summary:
      "The Building Division sits in Community Development. Its eLakeForest portal takes certain permit types, invoice payments and the daily inspection schedule, and residential rooftop solar retrofits get automated plan review. The handouts page has a Water Heater Installation handout and a residential reroofing fee schedule effective July 1, 2025.",
    sourceUrl:
      "https://www.lakeforestca.gov/departments/community_development/building/index.php",
  },

  hazards: [
    {
      text: "The Fire Hazard Severity Zone maps Cal Fire sent on March 24, 2025 identify Moderate, High and Very High zones in Lake Forest and expand the 2007 boundaries, and the city's fire risk page shows both maps side by side. The hazard plan puts the Very High zone along the Santa Ana Mountains in the northeast.",
      sourceUrl: "https://www.lakeforestca.gov/departments/fire/fire_risk.php",
      sourceLabel: "City of Lake Forest, fire risk",
    },
    {
      text: "The Santiago Canyon fire, which started on October 21, 2007 and burned more than 28,000 acres, reached the backyards of residences in Foothill Ranch and Portola Hills, according to the city's hazard plan, though no homes were lost in those communities.",
      sourceUrl:
        "https://www.lakeforestca.gov/Documents/Departments/Public%20Safety/Local%20Hazard%20Mitigation%20Plan/FINAL-City-of-Lake-Forest-LHMP-9-6-24.pdf",
      sourceLabel: "City of Lake Forest Local Hazard Mitigation Plan, 2024",
    },
    {
      text: "Flooding follows Borrego Canyon Wash, Serrano Creek and Aliso Creek, the waterways the hazard plan names, with FEMA's 100-year and 500-year zones mapped along them. A lot that backs onto one of those channels is worth checking on FEMA's map.",
      sourceUrl:
        "https://www.lakeforestca.gov/Documents/Departments/Public%20Safety/Local%20Hazard%20Mitigation%20Plan/FINAL-City-of-Lake-Forest-LHMP-9-6-24.pdf",
      sourceLabel: "City of Lake Forest Local Hazard Mitigation Plan, 2024",
    },
    {
      text: "The steeper ground in the Santa Ana Mountain foothills to the northeast and the San Joaquin Hills to the southwest carries landslide risk, which the plan rates low to moderate under seismic conditions. Slope and terrace drains are the part a hillside owner controls.",
      sourceUrl:
        "https://www.lakeforestca.gov/Documents/Departments/Public%20Safety/Local%20Hazard%20Mitigation%20Plan/FINAL-City-of-Lake-Forest-LHMP-9-6-24.pdf",
      sourceLabel: "City of Lake Forest Local Hazard Mitigation Plan, 2024",
    },
  ],

  guides: [
    {
      href: "/guides/santa-ana-wind-wildfire-home-prep",
      title: "Wildfire home prep in Orange County",
      blurb:
        "The 2007 fire reached Foothill Ranch backyards; vents, gutters and the first five feet matter most.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Foothill homes are reaching a first reroof inside the expanded 2025 fire zones.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Mostly imported water, hard all year, and the city posts its own water heater handout.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Eucalyptus litter in the gutters and clear slope drains before Santa Ana season.",
    },
  ],

  neighbors: ["irvine", "mission-viejo", "laguna-hills"],

  faq: [
    {
      q: "Which water district serves my Lake Forest address?",
      a: "Check the name on your water bill. The city publishes no street-by-street boundary list for its three agencies, and the annual water quality report from whichever one bills you is the one that describes your tap.",
    },
    {
      q: "Can I file a Lake Forest building permit online?",
      a: "Sometimes. eLakeForest accepts certain permit types, but the city's pages do not say which ones are online and which need the counter, so ask the Building Division about your specific job before you start.",
    },
  ],

  updated: "2026-09-20",
};
