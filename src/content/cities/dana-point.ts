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
    "Dana Point did not become a city until January 1, 1989, by which time most of it was already built: about 63 percent of the homes standing today date from the 1970s and 1980s, and the median build year is 1979. The ocean sets the terms for owning one. The city says most improvements to a bluff-top house or a house on Beach Road need a Coastal Development Permit, and at Capistrano Beach a November 2018 storm collapsed the county's wooden boardwalk and led to the basketball courts and restroom being demolished. Salt air, not inland heat, does the everyday wear on metal, paint and outdoor equipment here.",
  metaDescription:
    "Dana Point homes mostly date from the 1970s and 1980s. Two water districts, coastal permits on bluffs and Beach Road, erosion and salt air, sourced.",
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
        text: "Dana Point's median year built is 1979. Of about 16,484 housing units, roughly 31.6 percent went up in the 1970s and 31.2 percent in the 1980s, with 12.8 percent from the 1960s, 8.8 percent from before 1960, 8.1 percent from the 1990s and only about 7.6 percent from 2000 or later. These are survey estimates with margins of error, but the shape is clear: most houses and condos here are roughly 35 to 55 years old, the age when original windows, plumbing and a second roof all come due.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0617946",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The city describes itself as about 6.7 square miles made up of what it calls unique micro-communities: Capistrano Beach at the south end, Doheny Village beside it, the harbor, the Lantern District along Pacific Coast Highway and Del Prado, the residential areas commonly called Lantern Village and Dana Hills, and Monarch Beach at the northwest edge. It incorporated on January 1, 1989. The same report notes that Dana Point Harbor sits inside the city but is administered by the County of Orange.",
        sourceUrl:
          "https://www.danapoint.org/files/assets/city/v/1/finance/documents/annual-comprehensive-financial-reports/fy-2022-2023-annual-comprehensive-financial-report-acfr.pdf",
        sourceLabel: "City of Dana Point, annual comprehensive financial report, city profile",
      },
      {
        text: "OC Parks dates the harbor plainly: construction started in the late 1960s with the rock breakwater jetties, and Dana Point Harbor was officially dedicated on July 31, 1971. For the homes on the flats and bluffs around it, the practical point is how close salt water is. Expect faster corrosion on air conditioner coils, garage door hardware, exterior light fixtures and fasteners than an inland house sees, and rinse and inspect them on a schedule rather than waiting for failure.",
        sourceUrl: "https://parks.oc.gov/beaches/dana-point-harbor/history",
        sourceLabel: "OC Parks, Dana Point Harbor history",
      },
      {
        text: "The lanterns behind the street names are about sixty years older than the city. The Dana Point Historical Society says the street lanterns were installed from about 1927 to 1929 by Sidney Woodruff's Dana Point Syndicate as part of his nautically themed development, and it quotes the Santa Ana Daily Register of July 19, 1929 on the ceremony where Governor Young threw the switch of 400 ornamental lights. The society also notes that several early residents are credited with the naming, so no single author is claimed here.",
        sourceUrl: "https://danapointhistorical.org/history/lanterns",
        sourceLabel: "Dana Point Historical Society, Dana Point's Legendary Lanterns",
      },
      {
        text: "Moulton Niguel Water District lists Dana Point among the six cities it serves, and its 2025 report says the hardness found in its water averaged 15.45 grains per gallon. Its supply is all imported, a blend from Metropolitan's Diemer plant, which the report shows averaging 236 ppm or 13.8 grains per gallon with a range of 191 to 280 ppm, and the Baker Water Treatment Plant, averaging 293 ppm or 17.1 grains per gallon with a range of 269 to 322 ppm. That is hard water: flush a tank water heater yearly.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010073&Year=2025&isCert=false",
        sourceLabel: "Moulton Niguel Water District 2025 water quality report, State Water Board copy",
      },
      {
        text: "The Doheny Ocean Desalination Project is planned, not operating. South Coast Water District's project page lists its status as design, says a first-phase design, build, operate and maintain contract was awarded on October 24, 2024, and gives a proposed schedule of design, construction and performance testing from 2023 to 2028 with the facility online in 2029. The district says the plant would sit between Pacific Coast Highway and Stonehill Drive next to San Juan Creek and produce 5 million gallons of drinking water a day when completed.",
        sourceUrl:
          "https://www.scwd.org/about/district_projects/doheny_ocean_desalination_project/index.php",
        sourceLabel: "South Coast Water District, Doheny Ocean Desalination Project",
      },
      {
        text: "Dana Point does not run its own fire department. The city's public safety page says fire services are provided by the Orange County Fire Authority, and that the authority's Stations 29 and 30 are located within the city and provide the primary response for fire suppression and emergency medical calls.",
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
    note: "These are the names the city itself uses in the profile at the front of its annual financial report. Capistrano Beach is the mainly residential south end of town, and Doheny Village, next to it on the west, mixes commercial and retail businesses with multi-family housing. The Lantern District is the commercial and multi-family strip along Pacific Coast Highway and Del Prado from Copper Lantern to Blue Lantern, and Lantern Village is one of the residential areas north of it. Monarch Beach, at the northwest edge, holds the city's two largest hotels, a golf course and large residential developments. The harbor is inside city limits but administered by the County of Orange.",
    sourceUrl:
      "https://www.danapoint.org/files/assets/city/v/1/finance/documents/annual-comprehensive-financial-reports/fy-2022-2023-annual-comprehensive-financial-report-acfr.pdf",
  },

  water: {
    utility: "South Coast Water District and Moulton Niguel Water District",
    utilityUrl: "https://www.scwd.org/about/index.php",
    summary:
      "Dana Point has two water suppliers, and your bill names yours. South Coast Water District says its service area includes the communities of Dana Point and South Laguna Beach plus parts of San Clemente and San Juan Capistrano, and Moulton Niguel Water District lists Dana Point among the cities it serves. South Coast's report for 2025 says approximately 85 percent of its water is imported treated surface water and about 15 percent comes from its own Groundwater Recovery Facility, which treats San Juan Basin groundwater by reverse osmosis. Its 2025 hardness rows: Metropolitan treated surface water averaged 236 ppm, 14 grains per gallon, with a range of 191 to 280 ppm; Baker Water Treatment Plant water averaged 293 ppm, 17 grains per gallon, with a range of 269 to 322 ppm; and Groundwater Recovery Facility water averaged 207 ppm, about 12 grains per gallon by conversion, with a range of 200 to 214 ppm. Moulton Niguel's own figures are listed separately above. Either way the water is hard.",
    sourceUrl:
      "https://www.scwd.org/South%20Coast%20Water%20District%202026%20Water%20Quality%20Report.pdf",
  },

  permits: {
    office: "City of Dana Point Building and Safety Division",
    portalUrl: "https://dana.csqrcloud.com/community-etrakit/",
    summary:
      "Building permits go through the Building and Safety Division, and the city says all building permit applications are submitted online through its eTRAKiT Permit Portal; solar permits are handled separately through a tool called Symbium. The city's stated typical review time is 10 business days for a standard plan check and 15 to 20 business days for a first review of larger commercial, mixed-use or multifamily projects. The number the city gives for help with the portal is (949) 248-3564. If the house is on a coastal bluff top or on Beach Road, expect a Coastal Development Permit from the Planning Division on top of the building permit.",
    sourceUrl:
      "https://www.danapoint.org/Services/Permit-Center/Online-Building-Services",
  },

  hazards: [
    {
      text: "The city's planning FAQ says all development inside its Coastal Zone requires a Coastal Development Permit unless specifically exempted, reviewed against the municipal code, the Local Coastal Program and the Coastal Act. It singles out two places. Most improvements on Beach Road need one, with wave run-up elevation among the items checked, and so do most improvements on a coastal bluff top beyond minor additions or maintenance, where soils stability and the setback from the top-of-bluff line are reviewed. Some decisions can be appealed to the Coastal Commission. The Planning Division number on that page is (949) 248-3568.",
      sourceUrl:
        "https://www.danapoint.org/City-Government/Community-Development/Planning/FAQs",
      sourceLabel: "City of Dana Point Planning Division FAQs",
    },
    {
      text: "Capistrano Beach is losing ground to the ocean, and the county has said so in writing. OC Parks reported that after a large storm in November 2018 the wooden boardwalk at Capistrano Beach collapsed, the area around the basketball courts and restroom building was seriously compromised, and removing both was necessary for public safety. Demolition took place the week of March 11, 2019, while OC Public Works placed sand cubes, essentially large sandbags, along the shoreline to slow erosion.",
      sourceUrl: "https://parks.oc.gov/news/capistrano-beach-battles-erosion",
      sourceLabel: "OC Parks, Capistrano Beach Battles Erosion",
    },
    {
      text: "Bluff failures happen here in wet winters. In February 2024, LAist reported that during a storm tons of rock and debris slid to the beach from the cliff below bluff-side homes off Scenic Drive. A city spokesperson said its geotechnical engineer and a building inspector assessed the site, and the city's statement said there was no imminent threat to the home. If you own on a bluff, drainage, irrigation and where roof water goes are maintenance items, not landscaping choices.",
      sourceUrl:
        "https://laist.com/news/climate-environment/dana-point-landslide-mansion-cliffs-edge",
      sourceLabel: "LAist, February 13, 2024",
    },
    {
      text: "The city's Local Hazard Mitigation Plan says the areas most at risk from a tsunami include Dana Point Harbor, Doheny State Beach, Capistrano Beach, Beach Road, Doheny Village and other low-lying coastal neighborhoods. It notes that a distant tsunami may allow several hours of warning while a locally generated one could reach the coast within minutes, and that the city has not been directly hit by a major destructive tsunami in recent history.",
      sourceUrl:
        "https://www.danapoint.org/files/assets/city/v/2/general-services/documents/2025-dana-point-lhmp-final.pdf",
      sourceLabel: "City of Dana Point Local Hazard Mitigation Plan",
    },
    {
      text: "The same plan says liquefaction zones are predominantly located along the coastal areas and near San Juan Creek, while adding that there are no documented instances of liquefaction within the city to date. It names Salt Creek, San Juan Creek and the Pacific as the sources of flooding, with low-lying ground near them most vulnerable, and gives March 21, 2019 as the date of the city's current effective FEMA flood insurance rate map. It also lists the Capistrano Beach bluff, Monarch Beach and the Headlands as particularly susceptible to slope failure after heavy rain.",
      sourceUrl:
        "https://www.danapoint.org/files/assets/city/v/2/general-services/documents/2025-dana-point-lhmp-final.pdf",
      sourceLabel: "City of Dana Point Local Hazard Mitigation Plan",
    },
    {
      text: "The city has a page for the state's updated Fire Hazard Severity Zone maps with an interactive map where you enter your address. It says properties in Very High zones must maintain 100 feet of defensible space, with the most intensive vegetation management in the first 30 feet, that sellers must disclose a property's zone designation, and that new construction and qualifying remodels must meet the state's Wildland-Urban Interface building standards. The page does not say how much of the city is zoned, so treat it as an address lookup.",
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
        "What a system runs, and why outdoor coils and cabinets age faster this close to the harbor and the surf.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair still makes sense, on imported water that runs 14 to 17 grains per gallon.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, for a city where most roofs sit on 1970s and 1980s houses and are on their second life.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month, including the drain and slope checks a bluff or canyon lot needs before winter storms.",
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
      q: "Do I need a Coastal Development Permit to remodel my Dana Point house?",
      a: "It depends on where the house is. The city's planning FAQ says all development inside its Coastal Zone needs a Coastal Development Permit unless it is specifically exempted, and it calls out two locations: most improvements on Beach Road, and most improvements on a coastal bluff top beyond minor additions or maintenance and repair. On a bluff lot the review looks at soils stability and the setback from the top-of-bluff line. Call the Planning Division at (949) 248-3568 before you pay for drawings.",
    },
    {
      q: "Who supplies my water in Dana Point?",
      a: "One of two districts. South Coast Water District says its service area includes the communities of Dana Point, and Moulton Niguel Water District also lists Dana Point among the cities it serves. Neither publishes a street-by-street list in text, so the reliable answer is the name on your water bill. That is also the agency whose water quality report describes what comes out of your tap.",
    },
    {
      q: "Is Dana Point's water hard?",
      a: "Yes, from either supplier. South Coast Water District's 2025 data shows its Metropolitan imported water averaging 236 ppm, or 14 grains per gallon, its Baker plant water averaging 293 ppm, or 17 grains, and its local Groundwater Recovery Facility water averaging 207 ppm. Moulton Niguel Water District reports an average of 15.45 grains per gallon for 2025. Flush a tank water heater once a year and descale a tankless unit on the manufacturer's schedule.",
    },
    {
      q: "Is the Doheny desalination plant supplying water yet?",
      a: "No. South Coast Water District's project page lists the Doheny Ocean Desalination Project as being in design. The district's proposed schedule shows design, construction and performance testing running from 2023 to 2028 and the facility online in 2029, producing 5 million gallons of drinking water a day when completed. Until then the district's drinking water is about 85 percent imported and about 15 percent from its Groundwater Recovery Facility.",
    },
    {
      q: "How do I apply for a building permit in Dana Point?",
      a: "Online. The city says all building permit applications are submitted through its eTRAKiT Permit Portal, with solar handled separately through Symbium, and it gives (949) 248-3564 for help with an account. Its Help for Homeowners page says permits are required for almost all construction, including bathroom and kitchen renovations and deck and guardrail repairs, while most fences not over 6 feet are exempt. A licensed contractor normally pulls the permit as part of the job.",
    },
    {
      q: "Is my house in a tsunami hazard area?",
      a: "If it is low and near the water, it may be. The city's hazard plan names Dana Point Harbor, Doheny State Beach, Capistrano Beach, Beach Road and Doheny Village among the areas most at risk, and the city's emergency preparedness page says areas less than 25 feet above sea level and within a mile of the shoreline are at greater risk. That page also says the city is NWS/NOAA certified Tsunami Ready and links the tsunami evacuation routes map.",
    },
  ],

  updated: "2026-09-20",
};
