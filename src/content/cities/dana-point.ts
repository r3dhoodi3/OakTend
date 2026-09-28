import type { CityContent } from "./types";

// Dana Point. Researched 2026-09-20 for the third city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a young city (1989) made
// of older beach communities, where the ocean is the maintenance story. The
// city's own planning FAQ says most work on a bluff-top lot or on Beach Road
// needs a Coastal Development Permit, OC Parks documents the November 2018
// storm that took the Capistrano Beach boardwalk, and the city's hazard plan
// names the harbor, Doheny, Capistrano Beach, Beach Road and Doheny Village as
// the places most at risk from a tsunami.
//
// WATER NUMBERS. Two suppliers, never averaged. South Coast Water District
// figures are from its 2026 Water Quality Report (2025 data), a text PDF on
// scwd.org. Moulton Niguel Water District's 2025 report is a scanned PDF with
// no text layer, read from the rendered page images of the copy on the State
// Water Board's report portal (mnwd.com blocks scripted requests). The Doheny
// Ocean Desalination Project is described only as the district's project page
// describes it: in design, not operating.
//
// LEFT OUT ON PURPOSE. The 2020 Census count (the only place it turned up was
// Wikipedia, and the city's hazard plan attaches the same number to a
// different survey), which district serves which street (neither district
// publishes it in text), climate averages and every wildfire paragraph from
// the city's hazard plan (that section lists fires that burned nowhere near
// the city and misplaces the Santa Ana Mountains, so none of it is repeated
// here), the Strands Mello-Roos claim, Niguel Shores bluff erosion and the
// surf history (all Wikipedia only), and any statement about how much of the
// city lies inside the Coastal Zone (no city page opened gives a share).

export const danaPoint: CityContent = {
  name: "Dana Point",
  slug: "dana-point",
  intro:
    "Dana Point did not become a city until January 1, 1989, by which time most of its homes were already built. The ocean sets the terms: most work on a bluff-top house or on Beach Road needs a Coastal Development Permit, and at Capistrano Beach a November 2018 storm collapsed the county's boardwalk.",
  metaDescription:
    "Dana Point homes mostly date from the 1970s and 1980s. Two water districts, coastal permits on bluffs and Beach Road, erosion, tsunami zones and salt air.",
  metaTitle: "Dana Point homes: bluffs, salt air and hard water",

  population: {
    value: "About 32,790 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003; the city's own financial report says approximately 33,144",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0617946",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "coastal",
    medianYearBuilt: "1979",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0617946",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 16,484 housing units, roughly 31.6 percent went up in the 1970s and 31.2 percent in the 1980s, with 12.8 percent from the 1960s, 8.8 percent before 1960, 8.1 percent from the 1990s and about 7.6 percent since 2000. Most are 35 to 55 years old, when original windows, plumbing and a second roof come due.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0617946",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The city calls its 6.7 square miles a set of micro-communities: Capistrano Beach, Doheny Village, the harbor, the Lantern District along Pacific Coast Highway and Del Prado, Lantern Village, Dana Hills and Monarch Beach. Dana Point Harbor is inside the city but administered by the County of Orange.",
        sourceUrl:
          "https://www.danapoint.org/files/assets/city/v/1/finance/documents/annual-comprehensive-financial-reports/fy-2022-2023-annual-comprehensive-financial-report-acfr.pdf",
        sourceLabel: "City of Dana Point, annual comprehensive financial report, city profile",
      },
      {
        text: "Harbor construction started in the late 1960s with the rock breakwater jetties, and Dana Point Harbor was dedicated on July 31, 1971.",
        sourceUrl: "https://parks.oc.gov/beaches/dana-point-harbor/history",
        sourceLabel: "OC Parks, Dana Point Harbor history",
      },
      {
        text: "The street lanterns are about sixty years older than the city. The Dana Point Historical Society says Sidney Woodruff's Dana Point Syndicate installed them from about 1927 to 1929, and quotes the Santa Ana Daily Register of July 19, 1929 on Governor Young switching on 400 ornamental lights.",
        sourceUrl: "https://danapointhistorical.org/history/lanterns",
        sourceLabel: "Dana Point Historical Society, Dana Point's Legendary Lanterns",
      },
      {
        text: "Moulton Niguel Water District's 2025 report puts its average hardness at 15.45 grains per gallon, on an all-imported blend of Metropolitan's Diemer plant (236 ppm, 13.8 grains, range 191 to 280) and the Baker Water Treatment Plant (293 ppm, 17.1 grains, range 269 to 322).",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010073&Year=2025&isCert=false",
        sourceLabel: "Moulton Niguel Water District 2025 water quality report, State Water Board copy",
      },
      {
        text: "The Doheny Ocean Desalination Project is in design, not operating. South Coast Water District awarded a first-phase contract on October 24, 2024 and plans the plant between Pacific Coast Highway and Stonehill Drive beside San Juan Creek, online in 2029 at 5 million gallons a day.",
        sourceUrl:
          "https://www.scwd.org/about/district_projects/doheny_ocean_desalination_project/index.php",
        sourceLabel: "South Coast Water District, Doheny Ocean Desalination Project",
      },
      {
        text: "Fire service comes from the Orange County Fire Authority, whose Stations 29 and 30 inside the city give the primary response for fire and medical calls.",
        sourceUrl: "https://www.danapoint.org/City-Government/Public-Safety/OCFA",
        sourceLabel: "City of Dana Point, OCFA page",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Lantern District",
      "Lantern Village",
      "Capistrano Beach",
      "Doheny Village",
      "Dana Point Harbor",
      "Monarch Beach",
    ],
    note: "Capistrano Beach is the mainly residential south end, and Doheny Village beside it mixes shops with multi-family housing. The Lantern District runs along Pacific Coast Highway and Del Prado from Copper Lantern to Blue Lantern, with Lantern Village among the residential areas north of it. Monarch Beach, at the northwest edge, holds the two largest hotels, a golf course and large residential developments.",
    sourceUrl:
      "https://www.danapoint.org/files/assets/city/v/1/finance/documents/annual-comprehensive-financial-reports/fy-2022-2023-annual-comprehensive-financial-report-acfr.pdf",
  },

  water: {
    utility: "South Coast Water District and Moulton Niguel Water District",
    utilityUrl: "https://www.scwd.org/about/index.php",
    summary:
      "Two districts serve Dana Point: South Coast Water District, whose area also takes in South Laguna Beach and parts of San Clemente and San Juan Capistrano, and Moulton Niguel. South Coast's 2025 supply was about 85 percent imported and 15 percent from its Groundwater Recovery Facility, which treats San Juan Basin groundwater by reverse osmosis. Its hardness averages: Metropolitan water 236 ppm (14 grains, range 191 to 280), Baker plant 293 ppm (17 grains, range 269 to 322), and recovery facility 207 ppm (about 12 grains, range 200 to 214). Both districts deliver hard water.",
    sourceUrl:
      "https://www.scwd.org/South%20Coast%20Water%20District%202026%20Water%20Quality%20Report.pdf",
  },

  permits: {
    office: "City of Dana Point Building and Safety Division",
    portalUrl: "https://dana.csqrcloud.com/community-etrakit/",
    summary:
      "All building permit applications go through the city's eTRAKiT Permit Portal, with solar handled separately through Symbium; portal help is (949) 248-3564. The stated review time is 10 business days for a standard plan check and 15 to 20 for a first review of larger commercial, mixed-use or multifamily projects.",
    sourceUrl:
      "https://www.danapoint.org/Services/Permit-Center/Online-Building-Services",
  },

  hazards: [
    {
      text: "All development in the city's Coastal Zone needs a Coastal Development Permit unless exempted. Most improvements on Beach Road need one, with wave run-up elevation checked, and so does most work on a coastal bluff top beyond minor additions or maintenance, where soils stability and the top-of-bluff setback are reviewed. Some decisions can be appealed to the Coastal Commission; Planning is at (949) 248-3568.",
      sourceUrl:
        "https://www.danapoint.org/City-Government/Community-Development/Planning/FAQs",
      sourceLabel: "City of Dana Point Planning Division FAQs",
    },
    {
      text: "After a November 2018 storm, the wooden boardwalk at Capistrano Beach collapsed and the area around the basketball courts and restroom was so compromised that OC Parks demolished both the week of March 11, 2019. OC Public Works placed sand cubes, essentially large sandbags, along the shore to slow erosion.",
      sourceUrl: "https://parks.oc.gov/news/capistrano-beach-battles-erosion",
      sourceLabel: "OC Parks, Capistrano Beach Battles Erosion",
    },
    {
      text: "In February 2024, LAist reported tons of rock and debris sliding to the beach from the cliff below bluff-side homes off Scenic Drive during a storm; the city's geotechnical engineer and a building inspector assessed it and the city said the home faced no imminent threat. On a bluff lot, drainage, irrigation and where roof water goes are maintenance items.",
      sourceUrl:
        "https://laist.com/news/climate-environment/dana-point-landslide-mansion-cliffs-edge",
      sourceLabel: "LAist, February 13, 2024",
    },
    {
      text: "The city's Local Hazard Mitigation Plan names Dana Point Harbor, Doheny State Beach, Capistrano Beach, Beach Road, Doheny Village and other low coastal neighborhoods as most at risk from a tsunami. A distant one may allow hours of warning; a local one could arrive within minutes.",
      sourceUrl:
        "https://www.danapoint.org/files/assets/city/v/2/general-services/documents/2025-dana-point-lhmp-final.pdf",
      sourceLabel: "City of Dana Point Local Hazard Mitigation Plan",
    },
    {
      text: "The same plan puts liquefaction zones mainly along the coast and near San Juan Creek, with no documented liquefaction in the city to date. It names Salt Creek, San Juan Creek and the ocean as flood sources, dates the current FEMA flood map to March 21, 2019, and lists the Capistrano Beach bluff, Monarch Beach and the Headlands as prone to slope failure after heavy rain.",
      sourceUrl:
        "https://www.danapoint.org/files/assets/city/v/2/general-services/documents/2025-dana-point-lhmp-final.pdf",
      sourceLabel: "City of Dana Point Local Hazard Mitigation Plan",
    },
    {
      text: "The city's fire hazard zone page has an address lookup for the state's updated maps. It says Very High zones require 100 feet of defensible space, most intensive in the first 30 feet, seller disclosure of the zone, and Wildland-Urban Interface building standards for new construction and qualifying remodels.",
      sourceUrl:
        "https://www.danapoint.org/City-Government/Community-Development/Building-Safety/Fire-Hazard-Severity-Zones",
      sourceLabel: "City of Dana Point, Fire Hazard Severity Zones",
    },
  ],

  guides: [
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "Outdoor coils and cabinets this close to the harbor and surf wear out ahead of schedule.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Both districts deliver imported water at 14 to 17 grains per gallon, hard on tanks.",
    },
    {
      href: "/guides/hoa-coastal-commission-remodel-orange-county",
      title: "HOA and coastal permits in Orange County",
      blurb:
        "How the Coastal Development Permit works for Beach Road and bluff-top remodels.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "The seasonal list, including drain and slope checks on a bluff or canyon lot before winter storms.",
    },
  ],

  neighbors: [
    "laguna-niguel",
    "san-juan-capistrano",
    "san-clemente",
    "laguna-beach",
  ],

  faq: [
    {
      q: "Which district supplies my water in Dana Point?",
      a: "The one named on your water bill. Neither South Coast nor Moulton Niguel publishes a street-by-street list in text, and the district on the bill is the one whose water quality report describes your tap.",
    },
    {
      q: "Which Dana Point projects need a building permit?",
      a: "Almost all construction, per the city's Help for Homeowners page, including bathroom and kitchen renovations and deck and guardrail repairs. Most fences not over 6 feet are exempt.",
    },
    {
      q: "How do I know if my Dana Point house is in a tsunami area?",
      a: "The city's emergency preparedness page says ground less than 25 feet above sea level and within a mile of the shoreline is at greater risk. The city is NWS/NOAA certified Tsunami Ready, and the same page links the evacuation routes map.",
    },
  ],

  updated: "2026-09-20",
};
