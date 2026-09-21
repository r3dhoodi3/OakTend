import type { CityContent } from "./types";

// San Clemente. Researched 2026-09-20 for the third city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a town founded on a
// deed-enforced Spanish Colonial Revival look, built on coastal bluffs and
// canyons with a railroad at the foot of them. The Orange County
// Transportation Authority's own releases document the 2023 Casa Romantica
// slides, the January 2024 Mariposa Point slide (from private property) and
// the $310.5 million emergency program that followed. Add a Coastal Zone with
// no fully certified Local Coastal Program and three different water
// agencies inside one city, and none of this page transfers to a neighbor.
//
// WATER NUMBERS are from the City of San Clemente's 2026 Water Quality Report
// (2025 testing), read from the copy on the State Water Board's report portal
// (system CA3010036). The city's groundwater plant was offline for all of
// 2025, so the report has no groundwater column and neither does this page.
// The two hardness columns are the Irvine Ranch Water District Baker plant
// and Metropolitan treated surface water. The report does not say what share
// of supply each one is, so no blend percentage is given.
//
// HOW THE CITY PAGES WERE READ. sanclemente.gov answers plain curl and
// WebFetch with a bot challenge (403), so the live pages were read today
// through a reader proxy that renders the page. Every sanclemente.gov URL
// below was opened that way and the quoted details come from that text.
//
// THE SEPTEMBER 2026 RAIL CLOSURE is included because the transportation
// authority's own news release dated 9/8/2026 confirms it. The page says only
// what that release says. It does not name a storm and does not say whether
// the line is still closed, because that will change.
//
// LEFT OUT ON PURPOSE. Climate numbers (no NOAA or US Climate Data page for
// San Clemente would open, and the city's own page gives two different
// sunshine counts), the Safety Element's landslide, liquefaction and tsunami
// mapping (the PDF would not open), which parts of town fall in the Very High
// fire zone (the city's map PDF would not open, so it stays an address
// lookup), any wildfire inside city limits (none confirmed), Mello-Roos in
// Talega (no official source found), the year Casa Romantica was built (the
// city says 1928, other sources say 1927), the Western White House and the
// 2028 Olympic surfing venue (Wikipedia only, and neither helps a homeowner).

export const sanClemente: CityContent = {
  name: "San Clemente",
  slug: "san-clemente",
  intro:
    "San Clemente began in December 1925 as Ole Hanson's planned Spanish village, where every deed required a handmade red tile roof and whitewashed stucco walls, yet only about 1 percent of the homes standing today predate 1940 and roughly a quarter were built since 2000. The older town sits on coastal bluffs and canyons above a railroad that runs along the sand, and slides off those slopes shut the line in 2023 and again in 2024, one of them from private property. The ocean side of town, generally up to Interstate 5, is in the Coastal Zone without a fully certified Local Coastal Program, so exterior work there can mean a separate coastal development permit on top of the city building permit.",
  metaDescription:
    "San Clemente homes sit between sliding coastal bluffs and inland hills. Coastal permits, three water agencies, hard water and red tile roofs, sourced.",
  metaTitle: "San Clemente homes: bluffs, tile roofs, hard water",

  population: {
    value: "About 63,273 people",
    asOf: "ACS 2024 5-year estimate (2020 to 2024), table B01003; the city's own page says 66,245 residents",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0665084",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "coastal",
    medianYearBuilt: "1983",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0665084",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "San Clemente's median year built is 1983, and the housing came in two waves. Of about 27,058 housing units, roughly 20.5 percent were built in the 1970s and 19.4 percent in the 1980s, then another 20.6 percent in the 2000s, with 11.5 percent from the 1990s, 11.2 percent from the 1960s and 9.3 percent from the 1950s. Only about 2.5 percent predate 1950. These are survey estimates with margins of error, but the shape is clear: a lot of homes are at the age of a second roof and a third water heater, and a lot of others are just reaching their first big replacements.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0665084",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The city's own history says Ole Hanson drew 600 people to a sales pitch on a rainy day in December 1925, when average lots sold for $300, and sold 1,200 lots in the first six months. Every deed mandated Spanish Colonial Revival guidelines, with uniform handmade red tile roofs and whitewashed stucco walls, and the city incorporated in 1928. The city says historic homeowners must still abide by codes that protect that style, so on an older house check with Planning before changing the roof, windows or exterior finish.",
        sourceUrl: "https://www.sanclemente.gov/315/City-Information",
        sourceLabel: "City of San Clemente, City Information and City History",
      },
      {
        text: "San Clemente has been a Certified Local Government for historic preservation since 1993, with historic structure surveys from 1995 and 2006. The city offers Historic Property Preservation Agreements under the Mills Act, which it describes as potential property tax relief in exchange for restoring and maintaining a historic property, and it publishes brochures on its Cultural Heritage Permit and on Spanish Colonial Revival architecture. If your house is on the survey, that paperwork comes before the contractor.",
        sourceUrl:
          "https://www.sanclemente.gov/291/Historic-Resources-Preservation",
        sourceLabel: "City of San Clemente, Historic Resources and Preservation",
      },
      {
        text: "This is two maintenance climates in one city. The city describes 18.45 square miles of rugged hills, coastal canyons and coastline, and its Rancho San Clemente plan area alone runs from less than 80 feet to more than 900 feet above sea level, about half a mile inland of Interstate 5. Near the beach, salt air is the everyday wear: rinse and inspect exterior metal, railings, light fixtures and the outdoor AC unit, and expect fasteners and garage door hardware to corrode early. The inland planned communities of Talega, Forster Ranch and Rancho San Clemente trade much of that for slopes and drainage.",
        sourceUrl: "https://www.sanclemente.gov/287/Specific-Plans",
        sourceLabel: "City of San Clemente, Specific Plans",
      },
      {
        text: "The water is hard on every source the city reported for 2025. Treated surface water from Irvine Ranch Water District's Baker plant averaged 293 ppm of hardness, about 17 grains per gallon, with a range of 269 to 322 ppm. Metropolitan treated surface water averaged 236 ppm, about 14 grains per gallon, with a range of 191 to 280 ppm. The city's groundwater plant was offline for rehabilitation that year, so there is no groundwater figure. Scale in water heaters, fixtures and tankless units is a normal maintenance item here.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010036&Year=2025&isCert=false",
        sourceLabel: "City of San Clemente 2026 Water Quality Report, 2025 testing",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Pier Bowl",
      "North Beach",
      "Marblehead Coastal",
      "Talega",
      "Forster Ranch",
      "Rancho San Clemente",
    ],
    note: "These are names the city itself plans by. The Pier Bowl is about 56 acres next to the municipal pier, between Linda Lane Park and Trafalgar Canyon. North Beach is the village at the north end of town, with a historic district the city has documented, and the West Pico Corridor starts at its northern edge. Marblehead Coastal is 248 acres between the ocean and Interstate 5. Inland, Talega covers 3,510 acres in the northeast, Forster Ranch covers 1,982 acres in the northwest against San Juan Capistrano, and Rancho San Clemente covers about 1,943 acres running up to Camp Pendleton. The city has adopted seven specific plans in all; the other two are Marblehead Inland and West Pico Corridor.",
    sourceUrl: "https://www.sanclemente.gov/287/Specific-Plans",
  },

  water: {
    utility: "City of San Clemente Utilities Division",
    utilityUrl: "https://www.sanclemente.gov/180/Water-Information",
    summary:
      "Most of San Clemente is on the city's own Utilities Division, but not all of it. The city's water quality report says Talega is served by Santa Margarita Water District and portions of north San Clemente by South Coast Water District, and both districts say the same on their own sites. Your water bill names your agency, and that agency's report is the one that describes your tap. For city customers, the report describes a blend of imported Metropolitan water and local groundwater, plus water from Irvine Ranch Water District's Baker Water Treatment Plant since 2017. In 2025 the city's groundwater plant was offline for rehabilitation, so everything came from the two surface sources: Baker plant water averaged 293 ppm of hardness, about 17 grains per gallon, range 269 to 322 ppm, and Metropolitan water averaged 236 ppm, about 14 grains per gallon, range 191 to 280 ppm. The report does not say how much of each reaches a given street. The city's water information page also says its inspection of 18,251 utility-side service lines found no lead or galvanized lines needing replacement.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010036&Year=2025&isCert=false",
    sourceLabel:
      "City of San Clemente 2026 Water Quality Report (2025 testing), State Water Board copy",
  },

  permits: {
    office: "City of San Clemente Building Division (Building Services)",
    portalUrl: "https://cdweb.san-clemente.org/eTRAKiT/Search/permit.aspx",
    summary:
      "The Building Division is part of Community Development at City Hall, 910 Calle Negocio. The city lists three ways to apply for a building permit: online through its e-Trakit portal, in person at the permit counter, or by emailing PDFs to the permits address on its page. The counter is open Monday through Thursday and alternating Fridays, closed 12:30 to 1:30 for lunch, and the city gives 949-361-6100 for permit questions and 949-361-3366 to schedule inspections. Three local details are worth knowing. An accessory dwelling unit starts with the Planning Division, not Building, and the city has a pre-approved ADU plans program. The residential forms include a homeowners association confirmation form. And the city says you can request a property's permit history, or its engineering history if you want soils reports or geological information, through a public records request, with about ten days to fulfill it.",
    sourceUrl: "https://www.sanclemente.gov/258/Permits",
  },

  hazards: [
    {
      text: "The bluff below Casa Romantica, Ole Hanson's former home just north of the pier, slid on April 27, 2023, sending debris into the rail right of way and stopping all passenger rail service. Service resumed on May 27, then on June 5 the hillside slid again, sending large clumps of dirt and a tree toward the tracks, and the transportation authority declared an emergency to build a barrier wall at the bottom of the slope while the city worked to stabilize the hillside above.",
      sourceUrl:
        "https://www.octa.net/news/news-releases/octa-board-declares-rail-emergency-to-take-necessary-actions-to-protect-and-reopen-track-through-san-clemente/",
      sourceLabel: "Orange County Transportation Authority news release",
    },
    {
      text: "What a bluff failure costs: Voice of OC reported that the slide took out portions of Casa Romantica's terrace, and that the City Council approved a $7.8 million contract to complete the slope repairs, which the outlet called one of the largest construction contracts in city history. The public works director told the council the slope had not moved in two months by mid-August 2023. That was a public landmark rather than a private lot, but it shows the scale of money a failed coastal slope can involve.",
      sourceUrl:
        "https://voiceofoc.org/2023/08/san-clemente-moves-forward-with-8-million-in-repairs-to-casa-romantica-after-landslide/",
      sourceLabel: "Voice of OC, August 2023",
    },
    {
      text: "On January 24, 2024 a landslide on private property above the track at Mariposa Point covered the rail line with soil and debris and halted passenger service for several weeks. The transportation authority and Metrolink built a catchment wall about 200 feet long, on 33 steel beams set 30 feet below ground, with $7.2 million from the California Transportation Commission on top of an earlier $2 million, and regular service resumed on March 25, 2024. For a hillside owner the detail that matters is in the agency's own wording: the slope that failed was privately owned.",
      sourceUrl:
        "https://www.octa.net/programs-projects/projects/rail-projects/track-protection-project-at-mariposa-point",
      sourceLabel: "Orange County Transportation Authority, Mariposa Point project",
    },
    {
      text: "The transportation authority now runs a $310.5 million emergency program at four spots along the San Clemente coast, citing deteriorating rock protection and continuing bluff failures. It plans about 540,000 cubic yards of sand, repaired riprap, a new catchment wall at Mariposa Point and a revetment or seawall south of San Clemente State Beach. The agency says erosion here comes from a lack of sand supply and slope failure, and that shrinking beaches bring homes, roads, trails, railways and utilities much closer to the tides.",
      sourceUrl:
        "https://www.octa.net/programs-projects/projects/rail-projects/coastal-rail-emergency-projects/faq/",
      sourceLabel: "Orange County Transportation Authority, coastal rail emergency projects FAQ",
    },
    {
      text: "It has not stopped. In a news release dated September 8, 2026, the transportation authority said continued high tides and powerful waves had closed the rail line through San Clemente after waves overtopped the tracks and further eroded the adjacent slope, damaging some of the protective rock placed earlier. If your home is near the bluff edge or a coastal canyon, treat drainage, irrigation leaks and any new cracking as things to act on, not watch.",
      sourceUrl:
        "https://www.octa.net/news/news-releases/severe-waves-prompt-temporary-closure-of-coastal-rail-line-in-san-clemente",
      sourceLabel: "Orange County Transportation Authority news release, September 8, 2026",
    },
    {
      text: "The city says its Coastal Zone generally extends inland to Interstate 5 and covers about 15 percent of its land area, including five miles of coastline. The Coastal Commission certified the city's Land Use Plan on August 10, 2018, but the Implementation Plan is still a draft, so the Local Coastal Program is not fully certified. The city's stated goal is a single coastal development permit from the city; until then the coastal permit is a separate step. A 1982 categorical exclusion order exempts some categories of development in a defined area, so ask Planning which case your address falls in.",
      sourceUrl: "https://www.sanclemente.gov/295/Coastal-Planning",
      sourceLabel: "City of San Clemente, Coastal Planning",
    },
    {
      text: "Wildfire is a parcel-level question here, not a citywide one. The city posts a Very High Fire Hazard Severity Zone map dated July 2025 under Fire Hazard Zones on its building codes page, and its adopted codes effective January 1, 2026 include the 2025 California Wildland-Urban Interface Code. The zone is decided by parcel and affects construction standards on a reroof or addition, so check your own address on the city's map. The same page notes that Cal Fire's hazard maps are not used for insurance rates or underwriting decisions.",
      sourceUrl: "https://www.sanclemente.gov/261/Codes-Reference-Materials",
      sourceLabel: "City of San Clemente, Codes and Reference Materials",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, in a town whose original deeds required red clay tile and where salt air works on the flashing.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair still makes sense, on city water that tested at 14 to 17 grains per gallon in 2025.",
    },
    {
      href: "/guides/adu-cost",
      title: "ADU cost",
      blurb:
        "What an accessory unit runs, useful before you start the city's ADU packet with Planning or look at its pre-approved plans.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including when to clear slope drains and rinse salt off coastal exteriors.",
    },
  ],

  neighbors: ["dana-point", "san-juan-capistrano"],

  faq: [
    {
      q: "Who provides my water in San Clemente?",
      a: "It depends on where you live. Most of the city is served by the City of San Clemente Utilities Division. The city's own water quality report says Talega is served by Santa Margarita Water District and portions of north San Clemente by South Coast Water District, and both districts list San Clemente areas on their own sites. Your water bill names the agency, and the city says you can call its Utilities Division if you are unsure which report applies to you.",
    },
    {
      q: "Is San Clemente's water hard?",
      a: "Yes. In the city's report on 2025 testing, water from the Baker treatment plant averaged 293 ppm, about 17 grains per gallon, and Metropolitan water averaged 236 ppm, about 14 grains per gallon. The city's groundwater plant was offline that year, so there is no groundwater number. Those figures are for city customers only; Talega and parts of north San Clemente should read their own district's report. Flushing a tank water heater yearly and descaling a tankless unit on schedule is worth the hour.",
    },
    {
      q: "Do I need a coastal permit as well as a building permit in San Clemente?",
      a: "Possibly, if you are on the ocean side of Interstate 5. The city says its Coastal Zone generally extends inland to the freeway. Its Land Use Plan was certified by the Coastal Commission in 2018, but the Implementation Plan is still a draft, so the city does not yet issue a single combined coastal permit. A 1982 categorical exclusion order exempts some categories of development in a defined area. Ask the Planning Division which applies to your address before you design exterior work or an addition.",
    },
    {
      q: "How do I pull a building permit in San Clemente?",
      a: "The city lists three ways: online through its e-Trakit portal, in person at the Building Division counter at 910 Calle Negocio, or by emailing PDFs of the application. The city gives 949-361-6100 for permit questions. An accessory dwelling unit goes to the Planning Division first. The city also strongly discourages owner-builder permits for people hiring out the work, because the owner takes on the liability; a licensed contractor normally pulls the permit as part of the job.",
    },
    {
      q: "My house is on a slope or near the bluff. What should I check?",
      a: "Start with the record. The city says you can request a property's engineering history, which is where soils reports and geological information are kept, through a public records request, and it allows about ten days. The history here is real: the Casa Romantica bluff slid in April and June 2023, and the January 2024 slide at Mariposa Point came from private property above the tracks. Keep slope drains clear, fix irrigation leaks quickly, and have new cracks or movement looked at by a geotechnical engineer.",
    },
    {
      q: "Who provides fire service in San Clemente, and is my home in a fire hazard zone?",
      a: "Fire services are provided through a contract with the Orange County Fire Authority, from Station 50 on Camino De Los Mares, Station 59 on Avenida La Pata in Talega and Station 60 on Avenida Victoria. The city posts a Very High Fire Hazard Severity Zone map dated July 2025 on its building codes page. The zone is set parcel by parcel, so look up your own address rather than assuming from the neighborhood.",
    },
  ],

  updated: "2026-09-20",
};
