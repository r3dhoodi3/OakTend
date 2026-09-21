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
    "Buena Park became a city in January 1953 and did most of its building right then: about 43 percent of its roughly 25,800 homes date from the 1950s alone, and the median build year is 1960. The city's own safety element rates liquefaction susceptibility as high across the majority of the city, with the ground south of Malvern Avenue the most exposed, and maps a small Very High fire hazard zone at the north end around the regional park and the Los Coyotes golf course. It is also a city that issues water heater, repipe, rewire and panel upgrade permits instantly online, which suits a place where about half the homes predate 1960.",
  metaDescription:
    "Buena Park's median home dates to 1960. Instant online permits, hard city water, liquefaction south of Malvern Avenue and a small fire zone up north.",

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
        text: "Buena Park's median year built is 1960. Of about 25,789 housing units, roughly 43.1 percent went up in the 1950s alone, another 13.7 percent in the 1960s and 12.6 percent in the 1970s, while only about 9.3 percent date from 2000 or later. About three in four homes predate 1980 and about 60 percent are detached single-family houses, so original drain lines, supply plumbing and small electrical panels are an everyday topic here. These are one-year survey estimates with wide margins, so read them as approximate.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0608786",
        sourceLabel:
          "Census Reporter, ACS 2024 one-year tables B25024, B25034 and B25035",
      },
      {
        text: "The city's own history explains the timing. It says James A. Whitaker founded Buena Park in 1887 when he bought 690 acres from Abel Stearns, and that the Pacific Creamery Company's condensed milk factory, built in 1889, was the first industry established in Orange County. The city incorporated in 1953, with its first city council sworn in on January 27 of that year, the same decade most of today's homes were built. The city still keeps two houses from the early years as museums: the Whitaker-Jaynes Estate and the 1884 Bacon House, which it describes as a rare surviving example of single wall construction.",
        sourceUrl:
          "https://www.buenapark.com/residents/about_buena_park/history.php",
        sourceLabel: "City of Buena Park, history",
      },
      {
        text: "The city's safety element, citing Cal-Adapt, puts Buena Park's historic annual average maximum temperature at 75.8 degrees and its historic annual precipitation at 12.8 inches. It counts an average of two extreme heat days a year, meaning days over 98 degrees, and projects about 11 a year by the end of the century, noting that the people most affected live in poorly insulated houses that do not meet current codes. The same document says tornado-like winds have occurred in Buena Park and that high winds can damage roofs, bring down power lines and blow over trees. For a 1950s house that points at attic insulation, cooling capacity, roof edges and the big trees over the driveway.",
        sourceUrl:
          "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
        sourceLabel:
          "City of Buena Park General Plan, safety element (updated September 2025)",
      },
      {
        text: "Buena Park spells out its permit rules plainly. A permit is required before starting work, all block walls 4 feet or higher need one, and a permit becomes void if work does not start within 180 days or stops for 180 days. An owner can pull a permit for a one or two-family home only if the owner lives or intends to live there and does the work personally. Exempt items include a detached shed of 120 square feet or less and a fence not over 6 feet, though the Planning Division still reviews fence and wall plans. The Building Division lists (714) 562-3636 for questions and does not accept plans by mail, courier or electronic submission.",
        sourceUrl:
          "https://www.buenapark.com/city_departments/community_development/building_division/building_permits/index.php",
        sourceLabel: "City of Buena Park Building Division, building permits",
      },
      {
        text: "The city runs a Home Improvement Loan Program for income-qualified owners: a deferred loan, with a listed loan amount of $60,000, at one percent interest, due after 30 years or when the home is sold, transferred or refinanced to take equity out. Household income has to be at or below 80 percent of the county median, and the city lists plumbing and electrical upgrades, accessibility modifications, kitchen and bath upgrades, interior painting and new flooring among the eligible work. Current income limits are on the city's page.",
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
    note: "State Route 91 cuts the city in two, and North Buena Park and South Buena Park are the everyday names for the halves. Los Coyotes is the residential area on the low hills around Los Coyotes Country Club in the northeast corner; the city's safety element describes it as suburban development along the western and southern flanks of the rise, connecting to Beach Boulevard and Malvern Avenue, and it is the part of town nearest the mapped fire hazard zone. The Entertainment Corridor is the city's own name for the Beach Boulevard stretch that holds Knott's Berry Farm, the dinner shows and the hotels. The list is short on purpose: other names in circulation trace to shopping centers or real-estate marketing rather than to the city or a documented history.",
    sourceUrl: "https://en.wikipedia.org/wiki/Buena_Park,_California",
  },

  water: {
    utility: "City of Buena Park Water Department",
    utilityUrl:
      "https://www.buenapark.com/city_departments/public_works/utilities/water/index.php",
    summary:
      "The city runs its own water system. Its Sources of Water page says approximately 70 percent of the supply is groundwater pumped from the aquifer beneath north Orange County, and the remaining 30 percent is imported water. The city's water quality report covering 2025 testing lists hardness for both: the local groundwater averaged 207 ppm, about 12 grains per gallon, and the imported Metropolitan Water District water averaged 236 ppm, about 14 grains per gallon. The report gives one range of detections across both sources, 44 to 376 ppm, or 2.6 to 22 grains per gallon. Both averages count as hard, so scale in water heaters and on fixtures is routine here, and the wide range shows that individual samples varied a lot. The same report says the city inspected every service line connection for its lead inventory and found no lead or galvanized service lines requiring replacement, and that lead was not detected in any of the homes sampled at the tap in 2024.",
    sourceUrl:
      "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Public%20Works/Utilities/Water/OC%20Buena%20Park_WR_2026.pdf",
  },

  permits: {
    office: "City of Buena Park Building Division",
    portalUrl: "https://buenapark.edgesoftinc.com/cap/",
    summary:
      "Buena Park is specific about what can be done online. Its Citizen Access Portal issues instant permits to homeowners and contractors for five residential jobs: HVAC upgrade or changeout, house rewire, panel upgrade, house repipe and water heater replacement. A second city permit portal takes standard online applications for electric vehicle chargers and for residential reroofs, both tear-off and overlay, and residential solar and battery storage permits are issued through an automated plan check service. Online permits must be paid online by credit card or e-check. Anything not on the city's list has to be applied for in person at the counter, which the city lists as open Monday through Thursday, 7:30 am to 5:30 pm. Contractors need a valid state license and an active Buena Park business license.",
    sourceUrl:
      "https://www.buenapark.com/city_departments/community_development/building_division/building_permits/online_building_permits.php",
  },

  hazards: [
    {
      text: "Liquefaction is the seismic issue the city's safety element spends the most time on. Citing California Geological Survey quadrangle maps, it says liquefaction susceptibility is considered high throughout the majority of the city, that the areas south of Malvern Avenue are most susceptible to earthquake damage because of it, and that the northern part is not generally susceptible except next to Coyote Creek. It also says the Norwalk Fault is the only fault within the city, with no surface trace and no state Alquist-Priolo zone. Look up your address on the state's Seismic Hazard Zone map before foundation, addition or major drainage work.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
    {
      text: "Soil movement is mapped in two parts of town. The safety element says moderately expansive soil potential occurs in the west-central portion of Buena Park, near State Route 91, Valley View Street and Orangethorpe Avenue, and in the southern portion near Carbon Creek. Expansive soil swells when wet and shrinks when dry, which shows up as sticking doors, stair-step cracks in block walls and lifted flatwork, so steady drainage away from the slab matters more there than a one-time crack repair.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
    {
      text: "Most of Buena Park is outside the 100-year flood zone, but the safety element says certain portions lie in FEMA Zone AO, a 100-year shallow flooding risk with average depths of one to three feet, and that large winter storms cause localized flooding especially in the northern part of the city. The Fullerton Creek, Carbon Creek and Coyote Creek channels are the only flood control structures in the city. The element also says four dams, Brea, Carbon Canyon, Fullerton and Prado, pose a potential inundation hazard to parts of the city south of Malvern Avenue. Flood zones are set parcel by parcel, so check your address on FEMA's map.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
    {
      text: "Wildfire exposure is small and specific. The safety element says the state's March 2025 map identifies a Very High Fire Hazard Severity Zone at the north end of the city just south of Rosecrans Avenue, including Ralph B. Clark Regional Park and the Los Coyotes Golf Course and extending into Fullerton. Inside Buena Park the zone takes in part of the Los Coyotes Village condominium development and three single-family parcels. The same document says Buena Park has not historically been subject to wildfires.",
      sourceUrl:
        "https://cms7files1.revize.com/buenaparkca/Document_center/City%20Departments/Community%20development/Planning%20Division/General%20plan/2035%20General%20Plan/Chapter%207%20-%20Safety%20Element%20(updated%20September%202025).pdf",
      sourceLabel:
        "City of Buena Park General Plan, safety element (updated September 2025)",
    },
    {
      text: "The city's fire hazard page explains what the zone means for an owner. In a Very High zone, new buildings require 100 feet of defensible space and ignition-resistant construction under Chapter 7A of the California Building Code, and a natural hazard disclosure is required when the property is sold. The page says the updated state map covers a small section in the northern part of Buena Park and replaces the map the city adopted in 2012, and it links an address-level map viewer.",
      sourceUrl:
        "https://www.buenapark.com/residents/disaster_preparedness/fire_hazard_severity_zones.php",
      sourceLabel: "City of Buena Park, fire hazard severity zone maps",
    },
    {
      text: "Buena Park does not run its own fire department. The safety element says the city is a member of the Orange County Fire Authority joint powers authority, which provides fire protection, emergency medical response, hazardous materials response and fire prevention inspection, and that three of the authority's 78 stations are located in the city. It reports an average fire response time of seven minutes, thirty-eight seconds in 2024.",
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
      blurb:
        "Typical range for a job Buena Park permits instantly online, and the signs a 1950s panel is past what it was sized for.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "How to catch a supply line leak early in a house from the 1950s or 1960s, before it turns into the repipe the city also permits online.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Price range and when a repair still makes sense, on city water that averages 12 to 14 grains per gallon.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs, in a city whose safety element projects extreme heat days rising from two a year to about eleven.",
    },
  ],

  neighbors: ["fullerton", "anaheim", "la-palma"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater in Buena Park?",
      a: "Yes, and it is one of the fastest permits to get. The Building Division lists water heater replacement among the five residential jobs that qualify for an instant permit through its Citizen Access Portal, along with HVAC changeouts, house rewires, panel upgrades and house repipes. Online permits have to be paid online by credit card or e-check. A licensed plumber normally pulls the permit as part of the job, and the city requires contractors to hold an active Buena Park business license.",
    },
    {
      q: "Is Buena Park's water hard?",
      a: "Yes. The city's water quality report covering 2025 testing shows its groundwater averaging 207 ppm, about 12 grains per gallon, and the imported Metropolitan water averaging 236 ppm, about 14 grains per gallon. The city says roughly 70 percent of its supply is groundwater. The report lists one range across both sources, 44 to 376 ppm, so hardness can vary a good deal. Flushing a tank water heater yearly and descaling a tankless unit on the maker's schedule is worth the hour.",
    },
    {
      q: "Is my Buena Park home in a fire hazard severity zone?",
      a: "Almost certainly not, unless you live at the far north end. The city's safety element says the Very High zone sits just south of Rosecrans Avenue around Ralph B. Clark Regional Park and the Los Coyotes Golf Course, and inside Buena Park it covers part of the Los Coyotes Village condominiums and three single-family parcels. The city's fire hazard page links a map viewer where you can check an address, and it notes that a sale inside the zone requires a natural hazard disclosure.",
    },
    {
      q: "Should I worry about liquefaction in Buena Park?",
      a: "It is worth knowing about rather than worrying about. The city's safety element says liquefaction susceptibility is considered high throughout the majority of the city and that the areas south of Malvern Avenue are the most susceptible to earthquake damage because of it. For an existing house it mostly matters when you plan an addition, foundation work or a purchase. The city's policy is to require geologic and soils reports for new development, especially in areas with high liquefaction potential, so budget for one on a major project.",
    },
    {
      q: "Is my Buena Park home in a flood zone?",
      a: "Probably not, but check. The safety element says the majority of the city is outside the 100-year flood zone, while certain portions lie in FEMA Zone AO, which means shallow flooding averaging one to three feet in a 100-year storm. It also says parts of the city south of Malvern Avenue fall inside dam inundation areas for Brea, Carbon Canyon, Fullerton and Prado dams. Flood zones are drawn parcel by parcel, so look up your address on FEMA's Flood Map Service Center before buying or insuring.",
    },
    {
      q: "Does Buena Park have its own fire department?",
      a: "No. Fire and emergency medical service comes from the Orange County Fire Authority, which the city belongs to as a member of its joint powers authority. The city's safety element says three of the authority's stations are located in Buena Park and reports an average fire response time of seven minutes, thirty-eight seconds in 2024. Plans that need fire review, such as fire sprinkler plans, go to the authority rather than to City Hall.",
    },
  ],

  updated: "2026-09-20",
};
