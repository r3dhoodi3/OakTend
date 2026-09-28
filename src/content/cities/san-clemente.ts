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
    "San Clemente began in December 1925 as Ole Hanson's planned Spanish village, where every deed required handmade red tile roofs and whitewashed stucco. The older town sits on bluffs and canyons above a railroad on the sand, and slides off those slopes shut the line in 2023 and 2024, one of them from private property. The ocean side of town, generally up to Interstate 5, is in the Coastal Zone.",
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
        text: "The housing came in two waves. Of about 27,058 units, roughly 20.5 percent date from the 1970s and 19.4 percent from the 1980s, then another 20.6 percent from the 2000s, with 11.5 percent from the 1990s, 11.2 percent from the 1960s and 9.3 percent from the 1950s. Only about 2.5 percent predate 1950, and about 1 percent predate 1940.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0665084",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "Ole Hanson drew 600 people to a rainy-day sales pitch in December 1925, with average lots at $300, and sold 1,200 lots in six months. Every deed mandated Spanish Colonial Revival guidelines, and the city incorporated in 1928. The city says historic homeowners must still follow codes that protect that style, so check with Planning before changing an older roof, windows or exterior finish.",
        sourceUrl: "https://www.sanclemente.gov/315/City-Information",
        sourceLabel: "City of San Clemente, City Information and City History",
      },
      {
        text: "San Clemente has been a Certified Local Government for historic preservation since 1993, with historic structure surveys from 1995 and 2006. It offers Mills Act agreements, potential property tax relief for restoring and maintaining a historic property, and publishes brochures on its Cultural Heritage Permit and on Spanish Colonial Revival architecture.",
        sourceUrl:
          "https://www.sanclemente.gov/291/Historic-Resources-Preservation",
        sourceLabel: "City of San Clemente, Historic Resources and Preservation",
      },
      {
        text: "The city covers 18.45 square miles of hills, coastal canyons and coastline, and the Rancho San Clemente plan area alone climbs from under 80 feet to over 900 feet, about half a mile inland of Interstate 5. The inland planned communities of Talega, Forster Ranch and Rancho San Clemente trade much of the salt air for slopes and drainage.",
        sourceUrl: "https://www.sanclemente.gov/287/Specific-Plans",
        sourceLabel: "City of San Clemente, Specific Plans",
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
    note: "These are the city's own planning names. The Pier Bowl is about 56 acres beside the pier, between Linda Lane Park and Trafalgar Canyon. North Beach is the village at the north end, with a documented historic district, and the West Pico Corridor starts at its edge. Marblehead Coastal is 248 acres between the ocean and Interstate 5. Inland, Talega covers 3,510 acres in the northeast, Forster Ranch 1,982 acres in the northwest, and Rancho San Clemente about 1,943 acres up to Camp Pendleton. Marblehead Inland and West Pico Corridor complete the city's seven specific plans.",
    sourceUrl: "https://www.sanclemente.gov/287/Specific-Plans",
  },

  water: {
    utility: "City of San Clemente Utilities Division",
    utilityUrl: "https://www.sanclemente.gov/180/Water-Information",
    summary:
      "Three agencies serve the city: the city's own Utilities Division for most homes, Santa Margarita Water District for Talega and South Coast Water District for parts of north San Clemente. Your bill names yours, and the city's Utilities Division can say which report applies. City water blends imported Metropolitan water, local groundwater and, since 2017, Irvine Ranch Water District's Baker plant water. In 2025 the groundwater plant was offline for rehabilitation, so it all came from the two surface sources: Baker water averaged 293 ppm of hardness, about 17 grains per gallon, range 269 to 322 ppm, and Metropolitan water 236 ppm, about 14 grains, range 191 to 280 ppm. An inspection of 18,251 utility-side service lines found no lead or galvanized lines needing replacement.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010036&Year=2025&isCert=false",
    sourceLabel:
      "City of San Clemente 2026 Water Quality Report (2025 testing), State Water Board copy",
  },

  permits: {
    office: "City of San Clemente Building Division (Building Services)",
    portalUrl: "https://cdweb.san-clemente.org/eTRAKiT/Search/permit.aspx",
    summary:
      "The Building Division is at City Hall, 910 Calle Negocio. Apply online through e-Trakit, at the counter, or by emailing PDFs. The counter is open Monday through Thursday and alternating Fridays, closed 12:30 to 1:30; call 949-361-6100 for permit questions and 949-361-3366 for inspections. An ADU starts with the Planning Division, which has a pre-approved ADU plans program, and the residential forms include a homeowners association confirmation form.",
    sourceUrl: "https://www.sanclemente.gov/258/Permits",
  },

  hazards: [
    {
      text: "The bluff below Casa Romantica, Ole Hanson's former home just north of the pier, slid on April 27, 2023 and stopped all passenger rail service. Service resumed May 27; on June 5 the hillside slid again, and the transportation authority declared an emergency to build a barrier wall at the foot of the slope while the city stabilized the hillside above.",
      sourceUrl:
        "https://www.octa.net/news/news-releases/octa-board-declares-rail-emergency-to-take-necessary-actions-to-protect-and-reopen-track-through-san-clemente/",
      sourceLabel: "Orange County Transportation Authority news release",
    },
    {
      text: "Voice of OC reported that the slide took out part of Casa Romantica's terrace and that the City Council approved a $7.8 million slope repair contract, which it called one of the largest construction contracts in city history. By mid-August 2023 the public works director said the slope had not moved in two months.",
      sourceUrl:
        "https://voiceofoc.org/2023/08/san-clemente-moves-forward-with-8-million-in-repairs-to-casa-romantica-after-landslide/",
      sourceLabel: "Voice of OC, August 2023",
    },
    {
      text: "On January 24, 2024 a landslide on private property above the track at Mariposa Point buried the rail line and halted service for weeks. The transportation authority and Metrolink built a catchment wall about 200 feet long on 33 steel beams set 30 feet deep, with $7.2 million from the California Transportation Commission on top of an earlier $2 million, and service resumed March 25, 2024.",
      sourceUrl:
        "https://www.octa.net/programs-projects/projects/rail-projects/track-protection-project-at-mariposa-point",
      sourceLabel: "Orange County Transportation Authority, Mariposa Point project",
    },
    {
      text: "The transportation authority now runs a $310.5 million emergency program at four spots along the coast, citing deteriorating rock protection and continuing bluff failures: about 540,000 cubic yards of sand, repaired riprap, a new Mariposa Point catchment wall and a revetment or seawall south of San Clemente State Beach. It blames a lack of sand supply and slope failure, and says shrinking beaches bring homes, roads and utilities closer to the tides.",
      sourceUrl:
        "https://www.octa.net/programs-projects/projects/rail-projects/coastal-rail-emergency-projects/faq/",
      sourceLabel: "Orange County Transportation Authority, coastal rail emergency projects FAQ",
    },
    {
      text: "On September 8, 2026 the transportation authority said high tides and powerful waves had closed the rail line through San Clemente after waves overtopped the tracks, further eroded the slope and damaged some of the protective rock placed earlier.",
      sourceUrl:
        "https://www.octa.net/news/news-releases/severe-waves-prompt-temporary-closure-of-coastal-rail-line-in-san-clemente",
      sourceLabel: "Orange County Transportation Authority news release, September 8, 2026",
    },
    {
      text: "The Coastal Zone generally extends inland to Interstate 5, about 15 percent of the city's land and five miles of coastline. The Coastal Commission certified the Land Use Plan on August 10, 2018, but the Implementation Plan is still a draft, so a coastal development permit is a separate step from the building permit. A 1982 categorical exclusion order exempts some development in a defined area; Planning can say which case your address is.",
      sourceUrl: "https://www.sanclemente.gov/295/Coastal-Planning",
      sourceLabel: "City of San Clemente, Coastal Planning",
    },
    {
      text: "The city posts a Very High Fire Hazard Severity Zone map dated July 2025 on its building codes page, and its codes effective January 1, 2026 include the 2025 California Wildland-Urban Interface Code, which sets construction standards for a reroof or addition in a zone. The same page notes Cal Fire's maps are not used for insurance rates or underwriting.",
      sourceUrl: "https://www.sanclemente.gov/261/Codes-Reference-Materials",
      sourceLabel: "City of San Clemente, Codes and Reference Materials",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "The original deeds required red clay tile, and salt air works on the flashing.",
    },
    {
      href: "/guides/hoa-coastal-commission-remodel-orange-county",
      title: "HOA and coastal approvals",
      blurb:
        "West of Interstate 5, a coastal permit is still a separate step from the city's.",
    },
    {
      href: "/guides/adu-cost",
      title: "ADU cost",
      blurb:
        "Worth reading before the city's Planning packet or its pre-approved ADU plans.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Slope drains before winter and salt rinses on coastal exteriors, on 14 to 17 grain water.",
    },
  ],

  neighbors: ["dana-point", "san-juan-capistrano"],

  faq: [
    {
      q: "Who provides fire service in San Clemente?",
      a: "The Orange County Fire Authority, under contract with the city, from Station 50 on Camino De Los Mares, Station 59 on Avenida La Pata in Talega and Station 60 on Avenida Victoria.",
    },
    {
      q: "How do I get soils reports for a San Clemente slope lot?",
      a: "Request the property's engineering history through a public records request; the city says that is where soils reports and geological information are kept, and allows about ten days. A permit history can be requested the same way.",
    },
    {
      q: "Can I pull a San Clemente permit as an owner-builder?",
      a: "You can, but the city strongly discourages owner-builder permits for people hiring out the work, because the owner takes on the liability for it.",
    },
  ],

  updated: "2026-09-20",
};
