import type { CityContent } from "./types";

// Stanton. Researched 2026-09-20 for the fourth city wave. Every number below
// was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a city that incorporated
// twice. The city's own history page says 16 square miles were incorporated in
// May 1911 to block a sewage farm Anaheim proposed, that voters disincorporated
// in 1924 so the state could build roads, and that today's city dates from
// June 4, 1956. What got built afterward is a mix: the census file shows only
// about 27 percent detached houses and about 14 percent mobile homes, and the
// 2021-2029 Housing Element lists nine mobile home parks. The safety element
// puts the whole city in a liquefaction hazard zone, in FEMA flood zone X, and
// inside the Prado Dam and Carbon Canyon Dam inundation areas.
//
// FIRE SERVICE is the Orange County Fire Authority, confirmed on the city's
// About Stanton profile, the ocfa.org member city list and the Station 46
// entry on ocfa.org's station list.
//
// WATER NUMBERS are from Golden State Water Company's current West Orange
// County report (2025 sampling, published 2026), the same report cypress.ts
// cites, and the numbers match. It gives ONE system-wide hardness row.
//
// TWO ROOF RULES DISAGREE. The posted reroofing guide is stamped "Revised
// 1/20/05", cites the 2001 code and requires Class A with no wood roofing.
// Ordinance No. 1164, which adopted the 2025 codes, sets the floor at Class B.
// The page reports both and says to confirm with the Building Division.
//
// MOBILE HOME PERMITS. The state housing department (HCD) says it enforces in
// mobilehome parks unless a city has assumed that job. Stanton's pages say
// nothing either way and HCD's park search could not be read by script, so
// the page does not say which agency covers any Stanton park.
//
// LEFT OUT ON PURPOSE. "Largest city in Orange County by area" in 1911 (only
// the housing element says it, and it is an ordinal claim), the adoption date
// of Ordinance No. 1164 (signature pages are scans), the water company's PFAS
// detections and treatment project (the notice does not name the city the
// site is in), rainfall and temperature normals (no official table turned
// up), the current status of Tina-Pacific (the housing element is from June
// 2022), solar permit details, and any neighborhood name found only on
// real-estate pages.

export const stanton: CityContent = {
  name: "Stanton",
  slug: "stanton",
  intro:
    "Stanton has been a city twice: ranchers incorporated 16 square miles here in May 1911 to block a sewage farm Anaheim proposed, voted in 1924 to disincorporate so the state could build roads, and incorporated again on June 4, 1956. Only about 27 percent of today's homes are detached houses and about 14 percent are mobile homes, on 3.1 flat, built-out square miles.",
  metaDescription:
    "Stanton incorporated twice, in 1911 and 1956. What 1950s and 1970s housing, mobile home parks, hard water and citywide liquefaction mean for upkeep.",
  metaTitle: "Stanton, CA homes: a city incorporated twice",

  population: {
    value: "About 39,402 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the city's own community profile lists 41,188 and its history page says more than 39,000",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0673962",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1975",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0673962",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 13,269 housing units, roughly 28.6 percent went up in the 1970s, 19.7 percent in the 1950s, 14.3 percent in the 1980s and 12.9 percent in the 1960s. Only about 4 percent predate 1950 and about 12.6 percent date from 2000 or later, so about 61 percent were built between 1950 and 1979.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0673962",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The Pacific Electric Railway reached the area in 1906, and the community was known as Benedict before 1911. Voters disincorporated on July 22, 1924, which is why so little early housing survives. The Housing Element says the boom came from the 1950s through the 1970s, mostly single-family homes plus triplexes and fourplexes.",
        sourceUrl: "https://www.stantonca.gov/community/history.php",
        sourceLabel: "City of Stanton, city history, with the Housing Element",
      },
      {
        text: "The census file counts about 26.8 percent of units as detached houses, 14.1 percent attached, 13.5 percent in buildings of two to four units, 31.3 percent in buildings of five or more, and 14.2 percent, about 1,886 units, as mobile homes. Many owners share a roof, a wall or a park, so check what the association or park owner maintains before pricing a repair.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25024&geo_ids=16000US0673962",
        sourceLabel: "Census Reporter, ACS 2024 5-year table B25024",
      },
      {
        text: "The 2021-2029 Housing Element, citing the state's 2019 park listings, names nine mobile home parks with 1,301 permitted spaces, mostly in the south part of the city, against a county mobile home share of 3 percent. In the city's 2020-21 survey, 18.0 percent of respondents said their home needed a modest repair such as a roof and 17.1 percent a major one such as foundation, plumbing or electrical. The city's rehabilitation program for those repairs currently has no identified funding source.",
        sourceUrl:
          "https://www.stantonca.gov/City%20of%20Stanton%20Housing%20Element_Revised%20Adopted_6.27.pdf",
        sourceLabel: "City of Stanton, 2021-2029 Housing Element",
      },
      {
        text: "The Building Division's reroofing guide requires a permit per building, a Class A assembly, no wood roofing of any class, a pre-roofing and a final inspection, and a CR&R recycling receipt left with the job card before the permit is finaled. The guide dates from January 2005, and Ordinance No. 1164, which adopted the 2025 codes, sets the minimum at Class B, so ask the division which rule applies.",
        sourceUrl:
          "https://www.stantonca.gov/Document_center/Department/Community%20Development/Building%20Regulations/Informational%20Handouts%20and%20Forms/ReroofingInfo.pdf",
        sourceLabel: "City of Stanton Building Division, reroofing guide",
      },
      {
        text: "The city's water heater handout lists what the inspector checks: straps in the upper and lower thirds of the tank with the lower one at least 4 inches above the controls, a relief line piped outside ending 6 to 24 inches above the ground, a burner at least 18 inches above a garage floor unless the unit is vapor ignition resistant, an expansion tank on a closed system, and a drain pan where a leak could do damage. It quotes the 2019 plumbing code; the city now uses the 2025 codes.",
        sourceUrl:
          "https://www.stantonca.gov/Document_center/Department/Community%20Development/Building%20Regulations/Informational%20Handouts%20and%20Forms/Water-Heater-Handout.pdf",
        sourceLabel: "City of Stanton Building Division, water heater handout",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Tina-Pacific",
      "Crow Village",
      "Little Mansions and Clover Park",
      "Santa Barbara",
      "Town Center",
    ],
    note: "These are the names the city's planning documents use. Tina-Pacific is 40 fourplex properties where the former redevelopment agency began a project in 2009 that the Stanton Housing Authority took over. Little Mansions and Clover Park, north of Chapman Avenue and west of Beach Boulevard, is a code enforcement target area, and Crow Village and Santa Barbara are listed among areas with housing in need of major repair. Town Center is the mixed-use district near the civic center, with its own specific plan.",
    sourceUrl:
      "https://www.stantonca.gov/City%20of%20Stanton%20Housing%20Element_Revised%20Adopted_6.27.pdf",
  },

  water: {
    utility: "Golden State Water Company, West Orange County system",
    utilityUrl: "https://www.gswater.com/los-alamitos",
    summary:
      "Water comes from Golden State Water Company, a subsidiary of the publicly traded American States Water Company, not a city department. Its West Orange County system serves about 30,100 customers in Cypress, Los Alamitos, Stanton and parts of nearby cities with a blend of local groundwater and imported Colorado River and State Water Project water. In 2025 sampling, hardness averaged 237 ppm, or 13.8 grains per gallon, with a range of 3.67 to 21.6 grains, reported as one system-wide figure. The report says the system has no lead or galvanized service lines that need replacing.",
    sourceUrl:
      "https://www.gswater.com/sites/main/files/file-attachments/water-quality-west-orange-county.pdf",
  },

  permits: {
    office: "City of Stanton Building Division",
    portalUrl: "https://stanton.cts.city/",
    summary:
      "Plan check goes through the online Plan Check Center as PDF uploads, with about 10 business days for a first review and 5 for a second, counting Monday through Thursday. The counter at City Hall, 7800 Katella Avenue, is open Monday to Thursday, 7 a.m. to 6 p.m., closed noon to 1; City Hall is closed Fridays. Three or more permits at once need an appointment at 714-890-4286. Inspections run Monday to Thursday, 9 a.m. to 4 p.m., booked 48 hours ahead at 714-890-4252. Online payment is temporarily off, and cards carry a 2.6 percent fee. The fee schedule effective July 1, 2026 lists $236 for a water heater and $323 for a reroof up to 1,500 square feet, before add-on fees.",
    sourceUrl:
      "https://www.stantonca.gov/departments/community_development/building_regulations/index.php",
  },

  hazards: [
    {
      text: "The safety element puts the entire city in a state liquefaction hazard zone, on alluvium laid down by an ancestral Santa Ana River. It finds no Alquist-Priolo fault zones or identified faults inside the city, but lists the Newport-Inglewood, Whittier, Norwalk and Elysian Park faults nearby.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton General Plan, Community Health and Safety Element",
    },
    {
      text: "Stanton has no natural, permanent water features, and FEMA places the entire city in flood zone X. The safety element calls the built-out city especially vulnerable to flooding because pavement keeps rain from soaking in, and Ordinance No. 1164 calls Stanton flatlands where development needs special drainage precautions to prevent ponding.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton General Plan, Community Health and Safety Element",
    },
    {
      text: "Stanton sits inside the inundation areas of Prado Dam, about 23 miles northeast, and Carbon Canyon Dam, about 12.5 miles northeast. Army Corps maps show a Prado failure reaching the city in about 6.5 hours at about four feet deep, and a Carbon Canyon failure in about 7.5 hours at about one foot. The city points residents to Alert OC for warnings.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton General Plan, Community Health and Safety Element",
    },
    {
      text: "The city's November 2021 climate assessment defines an extreme heat day in Stanton as one above 97.2 degrees. The 1961 to 1990 baseline averaged two a year; by mid-century it expects seven under a medium emissions scenario and nine under a high one, and it calls the urban heat island effect pronounced here.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton, Climate Vulnerability Assessment (safety element appendix A)",
    },
    {
      text: "No fire hazard severity zone is mapped in Stanton, in the safety element or in the State Fire Marshal's 2025 data. The local concern is wind and structure fire: Ordinance No. 1164 cites Santa Ana winds that may reach 70 mph or more, and the safety element names combustible roofs and dense wood-frame apartments among the city's hard fire problems.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton General Plan, Community Health and Safety Element",
    },
  ],

  guides: [
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "About 61 percent of Stanton homes were built between 1950 and 1979, on their original supply lines.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Stanton water averaged 13.8 grains in 2025, and the city permit line is $236.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "The city's reroofing guide bans wood roofing and calls for a Class A assembly.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Flat lots that pond in winter and more 97-degree days each decade set the seasonal list here.",
    },
  ],

  neighbors: ["anaheim", "garden-grove", "cypress"],

  faq: [
    {
      q: "Who provides fire and police service in Stanton?",
      a: "Both are contract services: the Orange County Fire Authority and the Orange County Sheriff's Department. Station 46 at 7871 Pacific Street, established in 1956, is the city's fire station, and the Sheriff has policed Stanton since February 1988, when the city police department merged with it.",
    },
    {
      q: "Who issues permits for work on a mobile home in a Stanton park?",
      a: "Start with the state. The Department of Housing and Community Development says a permit is required before altering a mobilehome and that it enforces in mobilehome parks unless a city has taken that role, and Stanton's Building Division pages do not address mobile homes, so use the state's park search to see which agency covers yours.",
    },
  ],

  updated: "2026-09-20",
};
