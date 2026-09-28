import type { CityContent } from "./types";

// La Palma. Researched 2026-09-20 for the fourth city wave. Every number below
// was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a dairy town (it
// incorporated in 1955 as Dairyland) that was rebuilt as tract housing inside
// one 20-year window, on flat ground with a water table the city's own general
// plan puts 5 to 13 feet below grade. The same general plan puts the whole city
// inside a state liquefaction hazard zone and inside the inundation maps of
// four dams, and the city still pumps nearly all of its tap water from two
// wells of its own.
//
// DOMAIN. cityoflapalma.org now redirects to lapalmaca.gov, so every city URL
// here is the lapalmaca.gov form.
//
// WATER NUMBERS are from the City of La Palma 2026 Water Quality Report
// (testing conducted during 2025), a text PDF on the city site. The report
// prints both ppm and grains per gallon, so no conversion was needed. The
// State Water Board report portal returned a 404 for this system (CA3010100)
// for 2025, so the city copy is the one cited. The 97 percent groundwater
// share, the two wells, the reservoirs, the main mileage and the connection
// count are from the city's 2025 Urban Water Management Plan (marked final
// draft, May 2026), linked from the city's plan page.
//
// GENERAL PLAN. The adopted June 2014 general plan is an 18 MB PDF at
// lapalmaca.gov/DocumentCenter/View/4845. The page links the city's General
// Plan page that carries it rather than the file itself.
//
// FIRE SERVICE. The city's own Fire Services page names the Orange County Fire
// Authority, and La Palma is on the authority's member cities page. Police is
// the city's own department.
//
// FIRE HAZARD ZONES. No city page addresses the State Fire Marshal's 2025
// maps. "No zone mapped here" comes from querying the State Fire Marshal's
// published map layer (March 24, 2025) over the city's bounding box: only the
// "NonWildland" polygon came back.
//
// LEFT OUT ON PURPOSE. The general plan's line that La Palma is geographically
// the smallest city in Orange County (a superlative, and the city's own
// documents disagree on the area: 1.76 square miles on the history page, 1.6
// at incorporation and two today in the general plan), any statement that the
// tract houses sit on slab foundations (no city document opened says so), any
// Alquist-Priolo statement (the general plan says only that no active or
// potentially active fault is in the city), climate averages (no local
// numbers in any city document opened), the Money magazine rankings, the crime
// rate claims, PFAS results (the water report has no PFAS table), and tract or
// neighborhood names, which turned up only on real-estate pages.

export const laPalma: CityContent = {
  name: "La Palma",
  slug: "la-palma",
  intro:
    "La Palma incorporated in 1955 as Dairyland, a town of 18 dairies where, by the general plan's account, the cows outnumbered the 500 residents, and took its present name in 1965. Virtually all of its housing went up between 1960 and 1980, on flat ground where the water table sits about 5 to 13 feet below grade. The city still pumps about 97 percent of its tap water from two wells of its own.",
  metaDescription:
    "La Palma was Dairyland until 1965. What 1960s and 1970s tracts, city well water, a high water table, liquefaction and dam flood maps mean for upkeep.",
  metaTitle: "La Palma homes: Dairyland tracts, city well water",

  population: {
    value: "About 15,272 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the city's 2025 water management plan uses 15,141, from the Center for Demographic Research at Cal State Fullerton",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0640256",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1972",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0640256",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 5,206 housing units, roughly 38.1 percent went up in the 1960s and 37.5 percent in the 1970s. About 5.5 percent predate 1960, 8.6 percent came in the 1980s, 2.3 percent in the 1990s and about 8 percent since 2000, and about two thirds of all units are detached single-family houses.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0640256",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The general plan says La Palma had about 500 people in 1955, almost 10,000 by 1970 and well over 15,000 by 1980, with very little growth since. The name changed from Dairyland to La Palma in 1965, after its main street, La Palma Avenue.",
        sourceUrl: "https://www.lapalmaca.gov/123/General-Plan",
        sourceLabel:
          "City of La Palma General Plan (adopted June 2014), introduction, with the city's history page",
      },
      {
        text: "The city's March 2024 draft housing element says most La Palma housing is now more than 40 years old. Its 2021 windshield survey found about 26 homes, roughly 0.5 percent, that appeared to need minor work such as paint, roofing or windows, and only one with major problems, caused by a recent fire.",
        sourceUrl: "https://www.lapalmaca.gov/688/2021-2029-Housing-Element-Update",
        sourceLabel:
          "City of La Palma, 2021-2029 Housing Element, revised draft of March 2024",
      },
      {
        text: "Municipal code section 10-211, amended by Ordinance 2025-02 on November 4, 2025, requires a fire-retardant covering rated at least Class B on any reroof or roof repair of an existing structure, and on the whole roof when more than 50 percent of it is replaced within one year. A companion subsection says Class A, so confirm the class with the Building Division before ordering material.",
        sourceUrl:
          "https://library.municode.com/ca/la_palma/codes/code_of_ordinances?nodeId=COOR_CH10BU_ARTIIITECO_DIV7RECO_S10-211AMADDE",
        sourceLabel: "La Palma Municipal Code, section 10-211",
      },
      {
        text: "Two city wells, Meadowlark at the city yard on the south side and Walker Street on the north side, supplied about 97 percent of the water in fiscal 2024-25; the rest was imported. The system has about 4,372 connections, 39.7 miles of mains, reservoirs of 2.5 and 2.0 million gallons, and one pressure zone because the city is so flat. Sand and gravel have cut the Walker Street well from a rated 1,500 gallons a minute to about 1,000, and a rehabilitation project is expected to restore it.",
        sourceUrl: "https://www.lapalmaca.gov/708/Urban-Water-Management-Plan",
        sourceLabel:
          "City of La Palma, 2025 Urban Water Management Plan (final draft, May 2026)",
      },
      {
        text: "City code puts every pipe past the curb meter on the owner. Section 42-6 says the city is not responsible for leaks between the meter and the premises or for damage from pipes on private property, and section 42-267 lets the city shut off service ten days after written notice if an owner does not fix leaking plumbing.",
        sourceUrl:
          "https://library.municode.com/ca/la_palma/codes/code_of_ordinances?nodeId=COOR_CH42WA_ARTIINGE_S42-6CORE",
        sourceLabel: "La Palma Municipal Code, sections 42-6 and 42-267",
      },
      {
        text: "The 2026 Water Quality Report says the city's lead service line inventory found every line in the system lead-free, including the customer-owned side. Of 30 homes tested at the tap in 2024, lead was detected in 3 and copper in 20, and none exceeded the action level.",
        sourceUrl:
          "https://www.lapalmaca.gov/DocumentCenter/View/14110/Water-Quality-Report-2026",
        sourceLabel: "City of La Palma, 2026 Water Quality Report",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Centerpointe",
      "Civic Center and Central Park",
      "La Palma Promenade",
      "El Rancho Verde Park",
    ],
    note: "The city does not name residential neighborhoods, so these are the landmarks it uses itself. Business and industrial land sits north of Orangethorpe Avenue, mostly north of State Route 91, where Centerpointe is the early-1980s business district with a high-rise hotel; south of that the city is almost all houses. With no classic downtown, Central Park and City Hall on Walker Street serve as the gathering place. The La Palma Promenade is about 24 acres of greenbelt along the Edison right-of-way from Valley View Street to Barbi Lane, with El Rancho Verde Park near Moody Street.",
    sourceUrl: "https://www.lapalmaca.gov/123/General-Plan",
  },

  water: {
    utility: "City of La Palma Water Division",
    utilityUrl: "https://www.lapalmaca.gov/205/Water-Division",
    summary:
      "The city's Public Works Department runs the water utility, blending Orange County basin groundwater with Colorado River and Northern California water imported by the Metropolitan Water District. The 2026 report shows the well water averaging 147 ppm, or 8.6 grains per gallon, and the imported water 236 ppm, or 14 grains, with a combined range of 138 to 280 ppm, so the tap gets harder when more imported water is in the mix. Groundwater arsenic averaged 6.8 parts per billion against a limit of 10. A small part of the city, including school and some residential properties, is served by Golden State Water Company instead.",
    sourceUrl:
      "https://www.lapalmaca.gov/DocumentCenter/View/14110/Water-Quality-Report-2026",
  },

  permits: {
    office: "City of La Palma Building & Safety Division",
    portalUrl: "https://cityoflapalmaca.portal.opengov.com/categories/1071",
    summary:
      "Permits are issued through the city's OpenGov portal, with a counter at City Hall, 7822 Walker Street. Bureau Veritas North America runs building and safety under contract, almost all plans need a plan check, and some also go to the Orange County Fire Authority. Inspections run Monday through Thursday, 8:30 a.m. to noon, booked on the portal 24 hours ahead, though a call before 8:30 a.m. may get a same-day slot. Staff answer code and plan questions from 7:30 to 8:30 a.m. those days at 714-690-3340 or building@lapalmaca.gov. A permit lapses if work does not start within 180 days, block walls 4 feet or taller need one, and every contractor working here needs a city business license.",
    sourceUrl: "https://www.lapalmaca.gov/127/Building-Safety",
  },

  hazards: [
    {
      text: "The general plan's safety element says the state's Seismic Hazard Zones map for the Los Alamitos quadrangle puts the entire city inside a Liquefaction Hazard Zone. That means a geotechnical report before most new development and a disclosure when a home sells, not that every lot will liquefy. No active fault crosses the city; the Los Alamitos, Newport-Inglewood and Whittier-Elsinore faults run within 15 miles.",
      sourceUrl: "https://www.lapalmaca.gov/123/General-Plan",
      sourceLabel:
        "City of La Palma General Plan (2014), Community Safety Element",
    },
    {
      text: "The city sits 46 feet above sea level and groundwater typically stands at 34 to 38 feet, about 5 to 13 feet below grade, which the safety element says has caused localized flooding and building design concerns. Ask about groundwater before digging a pool or a deep footing.",
      sourceUrl: "https://www.lapalmaca.gov/123/General-Plan",
      sourceLabel:
        "City of La Palma General Plan (2014), Community Safety Element",
    },
    {
      text: "The 2014 safety element puts all of La Palma in FEMA Zone X, and Coyote, Moody and Fullerton creeks are concrete lined. The city's flood page shows the western part at reduced risk behind the Coyote Creek levees and the rest at a 0.2 percent annual chance, so flood insurance is not required.",
      sourceUrl: "https://www.lapalmaca.gov/631/Whittier-Narrows-Dam",
      sourceLabel:
        "City of La Palma, Whittier Narrows Dam and flood risk page, with the 2014 Community Safety Element",
    },
    {
      text: "Brea, Carbon Canyon, Prado and Whittier Narrows dams all have La Palma on their inundation maps. The safety element says a Brea or Carbon Canyon failure would mostly affect land north of State Route 91 and a Prado Dam failure could flood the whole city, though it rates failure unlikely after seismic upgrades. The city's later page, citing a 2018 Army Corps study, says a storm with about a 1 in 900 annual chance at Whittier Narrows could bring zero to eight feet of water.",
      sourceUrl: "https://www.lapalmaca.gov/631/Whittier-Narrows-Dam",
      sourceLabel:
        "City of La Palma, Whittier Narrows Dam page, with the 2014 Community Safety Element",
    },
    {
      text: "The safety element calls wildfire risk minimal, and the State Fire Marshal's March 24, 2025 map data shows no Moderate, High or Very High zone inside the city. The Orange County Fire Authority provides fire and medical service, funded by a dedicated share of local property taxes.",
      sourceUrl: "https://www.lapalmaca.gov/317/Fire-Services",
      sourceLabel:
        "City of La Palma, Fire Services page, with the 2014 Community Safety Element and the State Fire Marshal's 2025 map data",
    },
  ],

  guides: [
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "Most homes here date from the 1960s and 1970s, and every pipe past the meter is yours.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "City well water tests at 8.6 grains per gallon and imported water at 14.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "City code requires a fire-retardant covering, Class B at minimum, on any reroof.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Clear yard drains before winter on ground where groundwater sits 5 to 13 feet down.",
    },
  ],

  neighbors: ["cypress", "buena-park"],

  faq: [
    {
      q: "Is there a separate permit form for a water heater in La Palma?",
      a: "No. One Building Permit application covers building, electrical, mechanical and plumbing work, and its plumbing section has a line for a water heater and vent. The portal says a permit is needed before any alteration or repair starts.",
    },
    {
      q: "Which fire stations respond in La Palma?",
      a: "Station 13 at 7792 Walker Street, next to the police department, is the one station inside city limits and the first to respond. The general plan says Station 12 in Cypress and Station 61 in Buena Park also respond. Police is separate: La Palma has run its own department almost since it was founded.",
    },
  ],

  updated: "2026-09-20",
};
