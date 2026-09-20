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
    "Lake Forest was the community of El Toro until it incorporated in 1991, and it takes its name from two man-made lakes and about 400 acres of eucalyptus planted in the early 1900s. Nine years later the city annexed Foothill Ranch and Portola Hills, so it is really two places: a 1970s and 1980s flatland suburb, and newer foothill neighborhoods against the Santa Ana Mountains. The city's own hazard plan records the 2007 Santiago fire reaching the backyards of homes in those two foothill communities, which is the clearest way to explain why the maintenance advice changes as you go uphill.",
  metaDescription:
    "Lake Forest is two places: the older El Toro tracts and the Foothill Ranch hills. Three water districts, fire zones and permit steps, sourced.",

  population: {
    value: "About 87,164 people",
    asOf: "ACS 2024 one-year estimate, table B01003",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0639496",
  },

  homes: {
    exposure: "foothill",
    medianYearBuilt: "1985",
    facts: [
      {
        text: "Lake Forest's median year built is 1985. Of about 31,620 housing units, roughly 25.6 percent went up in the 1970s, 32.4 percent in the 1980s and 15.5 percent in the 1990s, only about 1 percent predates 1960, and about 15.1 percent has been built since 2010. The common house here is 35 to 50 years old: past its first roof and its first two water heaters, and often on original windows and ducting.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639496",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "The forest is real and man-made. A landowner named Dwight Whiting planted 400 acres of eucalyptus near Serrano Creek in the first decade of the 1900s as a lumber venture, and in the late 1960s the Occidental Petroleum company developed a residential community in and around the groves, which by then had spread and grown much denser. Mature eucalyptus beside a house means a standing job list: limb drop, gutter loads and roots near drains and hardscape.",
        sourceUrl: "https://en.wikipedia.org/wiki/Lake_Forest,_California",
        sourceLabel: "Wikipedia, Lake Forest history",
      },
      {
        text: "The foothill half came later. Foothill Ranch was completed in 1996 and the Portola Hills tracts were developed from the late 1980s through the early 1990s; the city's hazard plan says Lake Forest expanded to the northeast to take in both neighborhoods nine years after its 1991 incorporation. Those homes are now about 30 years old, the usual point for a first reroof and a second HVAC system.",
        sourceUrl: "https://en.wikipedia.org/wiki/Foothill_Ranch,_California",
        sourceLabel: "Wikipedia, Foothill Ranch",
      },
      {
        text: "The city's hazard plan gives the climate in one line: an average annual rainfall of 14 inches, an average summer high of 83 degrees and a winter average high of 67, at an average elevation of 489 feet. The same plan describes Santa Ana winds as a significant hazard for the area, able to reach 80 miles per hour with very low humidity, which is as much a roofing and fence question as a wildfire one.",
        sourceUrl:
          "https://www.lakeforestca.gov/Documents/Departments/Public%20Safety/Local%20Hazard%20Mitigation%20Plan/FINAL-City-of-Lake-Forest-LHMP-9-6-24.pdf",
        sourceLabel: "City of Lake Forest Local Hazard Mitigation Plan, 2024",
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
    note: "El Toro was the community's name from the 1860s until incorporation, and people still use it; the city incorporated on December 20, 1991 and took the name Lake Forest. The two man-made lakes are identified by their clubhouses, the Beach and Tennis Club and the Sun and Sail Club, and neighborhood associations manage them. Foothill Ranch and Portola Hills are the foothill communities annexed in 2000, with Portola Hills named for Gaspar de Portola. Baker Ranch is the newest large community, and it is listed here by name only because we could not find a home count or build dates for it outside of real-estate marketing.",
    sourceUrl: "https://en.wikipedia.org/wiki/Lake_Forest,_California",
  },

  water: {
    utility: "Irvine Ranch Water District, El Toro Water District and Trabuco Canyon Water District",
    utilityUrl:
      "https://www.lakeforestca.gov/community/resident_guide/utility_services.php",
    summary:
      "The city does not provide water or sewer service. Its resident guide lists three agencies: Irvine Ranch Water District, which it says serves most Lake Forest residents and was formerly the Los Alisos Water District here, El Toro Water District, and Trabuco Canyon Water District, with your provider depending on where your home is. Irvine Ranch says its customers in Lake Forest receive mostly imported water year-round and therefore have more consistently hard water. El Toro Water District's report for 2025 testing is the one set of numbers we could read: its Metropolitan supply averaged 236 ppm, about 14 grains per gallon, with a range of 191 to 280 ppm, and the water it takes from the Baker treatment plant averaged 293 ppm, about 17 grains, with a range of 269 to 322 ppm. We have no readable figures for the other two districts, so check the report from whichever agency is on your bill.",
    sourceUrl:
      "https://etwd.com/files/Water%20Quality%20Reports/2026ETWDCCR-v8-WEB-singlepages.pdf",
  },

  permits: {
    office: "City of Lake Forest Building Division",
    portalUrl:
      "https://cityoflakeforestca-energovweb.tylerhost.net/apps/selfservice#/home",
    summary:
      "The Building Division is part of Community Development. Its online portal, which the city calls eLakeForest, is where you submit certain permit types, pay invoices and see the daily inspection schedule, and the city offers automated plan review for residential rooftop solar retrofits. The permit handouts page includes a Water Heater Installation handout and a residential reroofing fee schedule effective July 1, 2025, so read those before you collect quotes. The city's pages do not say which permit types can be filed online and which need the counter, so confirm that with the division for your job.",
    sourceUrl:
      "https://www.lakeforestca.gov/departments/community_development/building/index.php",
  },

  hazards: [
    {
      text: "On March 24, 2025 Cal Fire sent Orange County cities new Fire Hazard Severity Zone maps, and Lake Forest's fire risk page says they identify Moderate, High and Very High zones in the city and expand the boundaries drawn on the 2007 map. The city's hazard plan says the Very High zone covers the Santa Ana Mountain range in the northeastern part of the city. The zone is assigned by parcel, so compare the two maps on the city's page for your own street.",
      sourceUrl: "https://www.lakeforestca.gov/departments/fire/fire_risk.php",
      sourceLabel: "City of Lake Forest, fire risk",
    },
    {
      text: "The hazard plan's fire history is specific about the foothills. It records that the Santiago Canyon fire, which started on October 21, 2007 and burned more than 28,000 acres, reached the backyards of residences in Foothill Ranch and Portola Hills, though no homes were lost in those communities. That is the practical case for ember-resistant vents, clean gutters and a clear five feet around the house on the uphill side of the city.",
      sourceUrl:
        "https://www.lakeforestca.gov/Documents/Departments/Public%20Safety/Local%20Hazard%20Mitigation%20Plan/FINAL-City-of-Lake-Forest-LHMP-9-6-24.pdf",
      sourceLabel: "City of Lake Forest Local Hazard Mitigation Plan, 2024",
    },
    {
      text: "Flooding in Lake Forest follows its creeks. The hazard plan names Borrego Canyon Wash, Serrano Creek and Aliso Creek as the waterways that influence floods in the city, and FEMA maps the 100-year and 500-year zones along them. If your lot backs onto one of those channels, look up the parcel on FEMA's map before you buy, insure or add on.",
      sourceUrl:
        "https://www.lakeforestca.gov/Documents/Departments/Public%20Safety/Local%20Hazard%20Mitigation%20Plan/FINAL-City-of-Lake-Forest-LHMP-9-6-24.pdf",
      sourceLabel: "City of Lake Forest Local Hazard Mitigation Plan, 2024",
    },
    {
      text: "On slopes, the same plan says the steeper areas in the Santa Ana Mountain foothills to the northeast and the San Joaquin Hills to the southwest are at risk of landslides, and rates that risk low to moderate under seismic conditions. For a hillside owner that translates into keeping slope drains, terrace drains and downspout lines clear, and getting a geotechnical opinion before a retaining wall or pool.",
      sourceUrl:
        "https://www.lakeforestca.gov/Documents/Departments/Public%20Safety/Local%20Hazard%20Mitigation%20Plan/FINAL-City-of-Lake-Forest-LHMP-9-6-24.pdf",
      sourceLabel: "City of Lake Forest Local Hazard Mitigation Plan, 2024",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, for foothill homes reaching their first reroof in a mapped fire zone.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs, and central AC versus a heat pump, for 1980s and 1990s houses.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on mostly imported water that stays hard all year.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including what to clear before Santa Ana wind season.",
    },
  ],

  neighbors: ["irvine", "mission-viejo", "laguna-hills"],

  faq: [
    {
      q: "Who provides water in Lake Forest?",
      a: "Not the city. Lake Forest's resident guide lists three separate agencies, Irvine Ranch Water District, El Toro Water District and Trabuco Canyon Water District, and says Irvine Ranch serves most residents while your own provider depends on where your home is. The name on your water bill is the quickest answer, and that agency's annual water quality report is the one that describes your tap.",
    },
    {
      q: "Is Lake Forest's water hard?",
      a: "Yes. Irvine Ranch Water District says its Lake Forest customers receive mostly imported water year-round and so have more consistently hard water. El Toro Water District's report, the one we could read in full, shows averages of about 14 and 17 grains per gallon for its two sources. Expect scale in water heaters and on glass, and spotting in the dishwasher, as normal upkeep.",
    },
    {
      q: "Is my Lake Forest home in a fire hazard severity zone?",
      a: "It depends mostly on how close you are to the foothills. The city says the state's 2025 maps identify Moderate, High and Very High zones in Lake Forest and expand on the 2007 boundaries, and its hazard plan places the Very High zone along the Santa Ana Mountains in the northeast. The zone is set by parcel. The city's fire risk page posts both maps side by side, which is the fastest way to see your own street.",
    },
    {
      q: "Has wildfire actually reached Lake Forest homes?",
      a: "It has reached the fence line. The city's hazard plan records that the 2007 Santiago Canyon fire reached the backyards of residences in Foothill Ranch and Portola Hills, and that no homes were lost in those communities. It is a good argument for the unglamorous work: ember-resistant vents, gutters kept clean through fall, and nothing combustible stored against the house.",
    },
    {
      q: "Where do I get a building permit in Lake Forest?",
      a: "From the city's Building Division, which runs an online portal called eLakeForest for submitting certain permit types, paying invoices and checking the inspection schedule. The city also posts handouts, including one on water heater installation. It does not spell out which permits are online and which are over the counter, so ask the division about your specific job. A licensed contractor normally pulls the permit as part of the work.",
    },
  ],

  updated: "2026-09-19",
};
