import type { CityContent } from "./types";

// Buena Park. Researched 2026-09-20 for the third city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a city that incorporated
// in 1953 and built more than four in ten of its homes in that same decade
// (median build year 1960), sitting on ground the city's own safety element
// rates as highly susceptible to liquefaction across most of the city, worst
// south of Malvern Avenue, with one small Very High fire hazard zone at the
// north end by the regional park and the Los Coyotes golf course. It is also a
// city that issues water heater, repipe, rewire, panel and HVAC permits
// instantly online, which fits a 1950s housing stock.
//
// CENSUS. The Census place id is 16000US0608786 (the API response names
// "Buena Park, CA"); the 0608212 in the research notes is wrong. Release is
// ACS 2024 1-year, so the margins are wide and every share is written "about".
//
// WATER NUMBERS are from the city's 2025 Annual Water Quality Report (the file
// the city links as the 2026 report with data from 2025), text layer read
// directly. The report gives one combined range of detections for hardness,
// not one per source, and it does not state the supply split: the 70/30
// figure is from the city's Sources of Water page and is attributed to it.
//
// LEFT OUT ON PURPOSE. The 2020 Census count (only Wikipedia carried it and
// the Census API returned nothing), owner and renter shares (Wikipedia only),
// Knott's Berry Farm employee counts (Wikipedia only), the 1885 land purchase
// date (the city's history page says 1887), the Wikipedia rainfall figure
// (it disagrees with the safety element, which is used instead), any oil
// field claim (the safety element documents pipelines, not a field), any
// statement on marine layer reach (no source either way), fire station
// street addresses (on a different city page than the one cited), the
// Building Division phone on the permits block (it is not on the online
// permits page cited there, so it appears only with the page that prints it),
// and the "E-Zone" label (found on Wikipedia, not on the city pages opened).
// The safety element does not say where in the city FEMA Zone AO falls, so
// this page does not either.

export const buenaPark: CityContent = {
  name: "Buena Park",
  slug: "buena-park",
  intro:
    "Buena Park became a city in January 1953 and did most of its building that decade: about 43 percent of its roughly 25,800 homes date from the 1950s alone. Its safety element rates liquefaction susceptibility high across most of the city, worst south of Malvern Avenue. For that aging stock, the city issues water heater, repipe, rewire, panel and HVAC permits instantly online.",
  metaDescription:
    "Buena Park's median home dates to 1960. Instant online permits, hard city water, liquefaction south of Malvern Avenue and a small fire zone up north.",
  metaTitle: "Buena Park homes: 1950s tracts, instant permits",

  population: {
    value: "About 82,597 people",
    asOf: "ACS 2024 one-year estimate, table B01003; the city's own profile says about 83,000",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0608786",
    sourceLabel: "Census Reporter, ACS 2024 one-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1960",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0608786",
      sourceLabel: "Census Reporter, ACS 2024 one-year table B25035",
    },
    facts: [
      {
        text: "Of about 25,789 housing units, roughly 43.1 percent went up in the 1950s, 13.7 percent in the 1960s and 12.6 percent in the 1970s; only about 9.3 percent date from 2000 or later. About three in four homes predate 1980 and about 60 percent are detached houses, so original drain lines, supply plumbing and small panels are an everyday topic.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0608786",
        sourceLabel:
          "Census Reporter, ACS 2024 one-year tables B25024, B25034 and B25035",
      },
      {
        text: "James A. Whitaker founded Buena Park in 1887 on 690 acres bought from Abel Stearns, and the Pacific Creamery Company's condensed milk factory of 1889 was the first industry in Orange County. The city's first council was sworn in on January 27, 1953. Two early houses survive as city museums: the Whitaker-Jaynes Estate and the 1884 Bacon House, a rare example of single wall construction.",
        sourceUrl:
          "https://www.buenapark.com/residents/about_buena_park/history.php",
        sourceLabel: "City of Buena Park, history",
      },
      {
        text: "Citing Cal-Adapt, the safety element puts the historic annual average high at 75.8 degrees and rainfall at 12.8 inches. Days over 98 degrees average two a year now and are projected at about 11 by century's end, hitting hardest in poorly insulated older houses. It also records tornado-like winds in Buena Park and warns that high winds damage roofs, power lines and trees.",
        sourceUrl:
          "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
        sourceLabel:
          "City of Buena Park General Plan, safety element (updated September 2025)",
      },
      {
        text: "Block walls 4 feet or higher need a permit, and a permit voids if work does not start within 180 days or stops for 180 days. An owner may pull a permit for a one or two-family home only if living there and doing the work personally. Sheds of 120 square feet or less and fences up to 6 feet are exempt, though Planning still reviews fence and wall plans. The Building Division, (714) 562-3636, does not accept plans by mail, courier or electronic submission.",
        sourceUrl:
          "https://www.buenapark.com/city_departments/community_development/building_division/building_permits/index.php",
        sourceLabel: "City of Buena Park Building Division, building permits",
      },
      {
        text: "The city's Home Improvement Loan Program offers income-qualified owners (at or below 80 percent of county median income) a deferred loan, listed at $60,000, at one percent interest, due after 30 years or on sale, transfer or cash-out refinance. Eligible work includes plumbing and electrical upgrades, accessibility changes, kitchen and bath upgrades, interior paint and flooring.",
        sourceUrl:
          "https://www.buenapark.com/city_departments/economic_development/housing_programs/home_improvement_program.php",
        sourceLabel: "City of Buena Park, Home Improvement Loan Program",
      },
    ],
  },

  neighborhoods: {
    names: [
      "North Buena Park",
      "South Buena Park",
      "Los Coyotes",
      "Entertainment Corridor",
    ],
    note: "State Route 91 splits the city into North and South Buena Park. Los Coyotes is the housing on the low hills around Los Coyotes Country Club in the northeast corner, off Beach Boulevard and Malvern Avenue, and the part of town nearest the mapped fire zone. The Entertainment Corridor is the city's name for the Beach Boulevard stretch with Knott's Berry Farm, the dinner shows and the hotels.",
    sourceUrl: "https://en.wikipedia.org/wiki/Buena_Park,_California",
  },

  water: {
    utility: "City of Buena Park Water Department",
    utilityUrl:
      "https://www.buenapark.com/city_departments/public_works/utilities/water/index.php",
    summary:
      "The city runs its own water system: about 70 percent groundwater from the aquifer beneath north Orange County and 30 percent imported. In 2025 testing the groundwater averaged 207 ppm of hardness, about 12 grains per gallon, and the Metropolitan water 236 ppm, about 14 grains, with samples across both ranging from 44 to 376 ppm. The city inspected every service line for its lead inventory and found no lead or galvanized lines needing replacement, and no lead turned up in homes sampled at the tap in 2024.",
    sourceUrl:
      "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Public%20Works/Utilities/Water/OC%20Buena%20Park_WR_2026.pdf",
  },

  permits: {
    office: "City of Buena Park Building Division",
    portalUrl: "https://buenapark.edgesoftinc.com/cap/",
    summary:
      "The Citizen Access Portal issues instant permits for five residential jobs: HVAC changeout, house rewire, panel upgrade, house repipe and water heater replacement. A second portal takes applications for EV chargers and reroofs (tear-off and overlay), and solar and battery permits go through an automated plan check. Online permits are paid online by card or e-check. Everything else is filed in person, Monday through Thursday, 7:30 am to 5:30 pm. Contractors need a state license and an active Buena Park business license.",
    sourceUrl:
      "https://www.buenapark.com/city_departments/community_development/building_division/building_permits/online_building_permits.php",
  },

  hazards: [
    {
      text: "Citing state quadrangle maps, the safety element rates liquefaction susceptibility high across most of the city, worst south of Malvern Avenue; the north is generally not susceptible except next to Coyote Creek. The Norwalk Fault is the only fault in the city, with no surface trace and no Alquist-Priolo zone.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
    {
      text: "Moderately expansive soil is mapped in the west-central city near State Route 91, Valley View Street and Orangethorpe Avenue, and in the south near Carbon Creek. It shows up as sticking doors, stair-step cracks in block walls and lifted flatwork.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
    {
      text: "Most of the city is outside the 100-year flood zone, but parts lie in FEMA Zone AO, shallow flooding of one to three feet, and big winter storms flood streets locally, especially in the north. The Fullerton, Carbon and Coyote Creek channels are the only flood control structures, and Brea, Carbon Canyon, Fullerton and Prado dams pose an inundation hazard south of Malvern Avenue.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
    {
      text: "The state's March 2025 map puts a Very High fire zone at the north end just south of Rosecrans Avenue, around Ralph B. Clark Regional Park and the Los Coyotes Golf Course and on into Fullerton. Inside Buena Park it covers part of the Los Coyotes Village condominiums and three single-family parcels, and the city says it has not historically had wildfires.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
    {
      text: "In that zone, new buildings need 100 feet of defensible space and ignition-resistant construction under Building Code Chapter 7A, and a sale needs a natural hazard disclosure. The updated map replaces the one the city adopted in 2012, and the city's page links an address-level viewer.",
      sourceUrl:
        "https://www.buenapark.com/residents/disaster_preparedness/fire_hazard_severity_zones.php",
      sourceLabel: "City of Buena Park, fire hazard severity zone maps",
    },
    {
      text: "Fire, medical, hazardous materials and fire inspection service comes from the Orange County Fire Authority, which the city belongs to as a joint powers member. Three of its 78 stations are in Buena Park, and the average fire response time in 2024 was seven minutes, thirty-eight seconds.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb: "A 1950s panel is common here, and the upgrade permit is instant online.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb: "Supply lines in 1950s and 1960s houses are reaching the age of leaks.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "Buena Park water averages 12 to 14 grains per gallon.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Includes pre-storm drain checks for the north side's localized street flooding.",
    },
  ],

  neighbors: ["fullerton", "anaheim", "la-palma", "cypress"],

  faq: [
    {
      q: "Does a Buena Park addition need a soils report?",
      a: "Usually, in the liquefaction areas. The city's safety element makes it policy to require geologic and soils reports for new development, especially where liquefaction potential is high, so budget for one on an addition or major foundation job.",
    },
    {
      q: "Where do Buena Park fire sprinkler plans go?",
      a: "To the Orange County Fire Authority, not City Hall. The authority handles fire review for the city, so plans that need it, such as fire sprinkler plans, are submitted there.",
    },
  ],

  updated: "2026-09-20",
};
