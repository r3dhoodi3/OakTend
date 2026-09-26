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
    "La Palma incorporated in 1955 as Dairyland, a town of 18 dairies where, by the general plan's account, the cows outnumbered the 500 residents, and it took its present name in 1965 once the dairies had gone. The houses arrived almost all at once: the general plan says virtually all of the housing was built in a brief 20-year period from 1960 to 1980, and the census survey puts about three quarters of today's roughly 5,200 homes in the 1960s and 1970s. The ground under them is flat and wet, with the same plan placing the water table about 5 to 13 feet below grade and the entire city inside a state liquefaction hazard zone. The city still pumps about 97 percent of its tap water from two wells of its own.",
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
        text: "La Palma's median year built is 1972. Of about 5,206 housing units, roughly 38.1 percent went up in the 1960s and 37.5 percent in the 1970s, so about three quarters of the city dates from those two decades. Only about 5.5 percent predate 1960, 8.6 percent came in the 1980s, 2.3 percent in the 1990s and about 8 percent since 2000, and about two thirds of all units are detached single-family houses. These are survey estimates with wide margins in a small city, but the shape is plain: most houses here are 45 to 65 years old, the age when original supply and drain lines, the electrical panel and a second or third roof come due.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0640256",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The city's general plan tells the same story from the other side. It says La Palma became a city in 1955 with only 500 people, that the population grew rapidly in the 1960s to almost 10,000 by 1970, and that ten years later most of the residential development seen today was in place and the population was well over 15,000, with very little growth since. In its own words, virtually all of the housing was built within a brief 20-year period, 1960 to 1980. The city's history page adds that the name changed from Dairyland to La Palma in 1965, after its main street, La Palma Avenue.",
        sourceUrl: "https://www.lapalmaca.gov/123/General-Plan",
        sourceLabel:
          "City of La Palma General Plan (adopted June 2014), introduction, with the city's history page",
      },
      {
        text: "The city's revised draft housing element, dated March 2024, says housing over 30 years old is likely to need work that may include new plumbing, roof repairs and foundation work, and that most of La Palma's housing is now more than 40 years old. It also reports how the stock is holding up: a 2021 windshield survey found approximately 26 homes, about 0.5 percent, that appeared to need minor work such as paint, roofing or windows, and only one with major problems, which was the result of a recent fire.",
        sourceUrl: "https://www.lapalmaca.gov/688/2021-2029-Housing-Element-Update",
        sourceLabel:
          "City of La Palma, 2021-2029 Housing Element, revised draft of March 2024",
      },
      {
        text: "La Palma writes a roofing rule into its own building code. Section 10-211 of the municipal code, last amended by Ordinance 2025-02 on November 4, 2025, changes the state residential code so that any roof covering applied in the alteration, repair or replacement of the roof of an existing structure must be a fire-retardant covering rated at least Class B, as must the whole roof when more than 50 percent of it is replaced within one year. A companion subsection repeats the same sentence with Class A, so confirm the required class with the Building Division before ordering material, and get the product's fire classification in writing on the bid.",
        sourceUrl:
          "https://library.municode.com/ca/la_palma/codes/code_of_ordinances?nodeId=COOR_CH10BU_ARTIIITECO_DIV7RECO_S10-211AMADDE",
        sourceLabel: "La Palma Municipal Code, section 10-211",
      },
      {
        text: "The city's 2025 Urban Water Management Plan describes a compact water system built for flat ground. Two city wells, the Meadowlark well at the city yard on the south side and the Walker Street well on the north side, supplied about 97 percent of the water in fiscal year 2024-25, with the remaining 3 percent imported. The plan counts approximately 4,372 service connections on 39.7 miles of water mains, two reservoirs of 2.5 and 2.0 million gallons, and a single pressure zone because the city has very little variation in elevation. It also says sand and gravel have cut the Walker Street well from a rated 1,500 gallons a minute to about 1,000, and that a rehabilitation project is expected to restore capacity.",
        sourceUrl: "https://www.lapalmaca.gov/708/Urban-Water-Management-Plan",
        sourceLabel:
          "City of La Palma, 2025 Urban Water Management Plan (final draft, May 2026)",
      },
      {
        text: "The city code draws the line for leaks at the meter. Section 42-6 says the city is not responsible for any leakage, breakage or seepage in a pipe between a meter installed at the curb and the premises it serves, or for damage from any pipe on private property. A separate section, 42-267, says an owner or occupant who does not keep the plumbing tight enough to prevent the loss of water through breaks and leaks can have service shut off ten days after written notice from the Water Superintendent. A meter that keeps turning with every fixture off is worth chasing down quickly.",
        sourceUrl:
          "https://library.municode.com/ca/la_palma/codes/code_of_ordinances?nodeId=COOR_CH42WA_ARTIINGE_S42-6CORE",
        sourceLabel: "La Palma Municipal Code, sections 42-6 and 42-267",
      },
      {
        text: "Lead pipe is not the worry here. The city's 2026 Water Quality Report says La Palma completed the lead service line inventory required by the federal Lead and Copper Rule Revisions and determined, through a records review and field investigations, that all service lines in the distribution system are lead-free, including the customer-owned side. Thirty homes were tested at the tap in 2024: lead was detected in 3 and copper in 20, and none exceeded the action level.",
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
    note: "The city documents we opened do not divide La Palma into named residential neighborhoods, so this list is the landmarks the city itself uses. The general plan puts all of the business and industrial land north of Orangethorpe Avenue, most of it north of State Route 91, where Centerpointe is the master-planned business district with a high-rise hotel, a redevelopment project the city's history dates to the early 1980s. South of that the city is almost entirely houses. The general plan says La Palma has no classic downtown and that Central Park and the City Hall complex on Walker Street serve as the gathering place. The La Palma Promenade is the general plan's name for the roughly 24 acres of greenbelt and walkway along the Edison right-of-way, which the city's parks page says runs from Valley View Street in the east to Barbi Lane in the west, with El Rancho Verde Park inside it near Moody Street. Tract names turned up only on real-estate pages, so they are not listed.",
    sourceUrl: "https://www.lapalmaca.gov/123/General-Plan",
  },

  water: {
    utility: "City of La Palma Water Division",
    utilityUrl: "https://www.lapalmaca.gov/205/Water-Division",
    summary:
      "The City of La Palma runs its own water utility through its Public Works Department. Its 2026 Water Quality Report, which covers testing done during 2025, describes the supply as groundwater from the Orange County basin managed by the Orange County Water District, plus treated Colorado River and Northern California surface water from the Metropolitan Water District, and the city's 2025 water management plan says groundwater made up about 97 percent of the supply in fiscal year 2024-25. That split matters for hardness. The report shows the local groundwater averaging 147 ppm, or 8.6 grains per gallon, and the Metropolitan water averaging 236 ppm, or 14 grains per gallon, with a combined range of 138 to 280 ppm, or 8.1 to 16 grains per gallon. So the usual tap water here is hard but noticeably softer than the imported supply, and it gets harder when more imported water is in the mix. The same report lists groundwater arsenic averaging 6.8 parts per billion against a limit of 10 and says the water meets all standards. The management plan notes that a small portion of the city, including school and some residential properties, is served by Golden State Water Company instead.",
    sourceUrl:
      "https://www.lapalmaca.gov/DocumentCenter/View/14110/Water-Quality-Report-2026",
  },

  permits: {
    office: "City of La Palma Building & Safety Division",
    portalUrl: "https://cityoflapalmaca.portal.opengov.com/categories/1071",
    summary:
      "La Palma issues building permits digitally through its OpenGov portal, with staff help available at the Building Permit Counter inside City Hall, 7822 Walker Street. The city contracts with Bureau Veritas North America for building and safety services and says almost all improvement plans need a plan check before a permit is issued; some also need review by the Orange County Fire Authority. The city has adopted the 2025 California Building Standards Codes with local amendments. Inspections run Monday through Thursday from 8:30 a.m. to noon, not on Fridays, and are booked on the portal with 24 hours of notice, though a call before 8:30 a.m. may get a same-day slot. Building staff take code and plan questions from 7:30 to 8:30 a.m. Monday through Thursday, at 714-690-3340 or building@lapalmaca.gov. The portal's permit description adds that a permit lapses if work does not start within 180 days, that block walls 4 feet or higher need a permit, and that every contractor working in La Palma needs a city business license.",
    sourceUrl: "https://www.lapalmaca.gov/127/Building-Safety",
  },

  hazards: [
    {
      text: "The general plan's safety element says that, according to the California Geological Survey's Seismic Hazard Zones map for the Los Alamitos quadrangle, the entire City of La Palma lies within a Liquefaction Hazard Zone. It explains that the zone does not mean every lot will liquefy: it marks where the potential is high enough that state law requires a geotechnical report before most new development is approved, and a disclosure when a property inside the zone is sold. The same element says no active or potentially active fault is located in the city, but that several cross within 15 miles, including the Los Alamitos, Newport-Inglewood and Whittier-Elsinore faults, and that strong shaking is the main expected effect.",
      sourceUrl: "https://www.lapalmaca.gov/123/General-Plan",
      sourceLabel:
        "City of La Palma General Plan (2014), Community Safety Element",
    },
    {
      text: "Groundwater sits close to the surface here. The safety element gives La Palma's elevation as 46 feet above mean sea level and says groundwater levels are typically around 34 to 38 feet above sea level, which works out to approximately 5 to 13 feet below grade, and that the high water table throughout town has caused localized flooding and building design concerns. For an existing house, that is a reason to keep roof and yard drainage moving away from the foundation and to ask about groundwater before digging a pool or a deep footing.",
      sourceUrl: "https://www.lapalmaca.gov/123/General-Plan",
      sourceLabel:
        "City of La Palma General Plan (2014), Community Safety Element",
    },
    {
      text: "Flood risk is rated moderate to low, not zero. The 2014 safety element says the entire city is FEMA Zone X, the band between the 100-year and 500-year floods, and that the three channels running through town, Coyote Creek, Moody Creek and Fullerton Creek, are concrete lined and fully improved for flood control. The city's flood page reads FEMA's map more finely: the western part of La Palma is shown as an area of reduced risk because of the levees along Coyote Creek, and the rest as having a 0.2 percent chance of flooding in any year. Because La Palma is not a high-risk area, the city says flood insurance is not required, though owners can still buy it.",
      sourceUrl: "https://www.lapalmaca.gov/631/Whittier-Narrows-Dam",
      sourceLabel:
        "City of La Palma, Whittier Narrows Dam and flood risk page, with the 2014 Community Safety Element",
    },
    {
      text: "Four dams have La Palma on their inundation maps: Brea, Carbon Canyon, Prado and Whittier Narrows. The 2014 safety element says a failure of Brea or Carbon Canyon Dam would generally affect areas north of State Route 91, and that Prado Dam, more than 25 miles away on the Santa Ana River, poses the most risk because its floodwaters could inundate all of La Palma; it rates failure as relatively unlikely because all four dams have been improved for seismic safety. The plan expected Whittier Narrows water to barely reach the western boundary, but the city's later page, citing the Army Corps of Engineers' 2018 dam safety study, says a storm with about a 1 in 900 chance in any year could put anywhere from zero to eight feet of water in La Palma, depending on the storm and the size of a breach.",
      sourceUrl: "https://www.lapalmaca.gov/631/Whittier-Narrows-Dam",
      sourceLabel:
        "City of La Palma, Whittier Narrows Dam page, with the 2014 Community Safety Element",
    },
    {
      text: "Wildfire is the hazard La Palma mostly does not have. The safety element calls the fire risk minimal because the city is largely developed at a traditional suburban scale, and the State Fire Marshal's March 24, 2025 local responsibility area map data shows no Moderate, High or Very High fire hazard severity zone inside the city. Fire and emergency medical service comes from the Orange County Fire Authority, which the city says is funded by a dedicated share of local property taxes; Station 13 at 7792 Walker Street, next to the police department, is the first responding station.",
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
        "How to spot a hidden leak early in a city where about three quarters of the homes date from the 1960s and 1970s and city code leaves every pipe past the meter to the owner.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on city well water that tested at 8.6 grains per gallon and imported water at 14.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, in a city whose code requires a fire-retardant covering, Class B at minimum, on any reroof.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including clearing yard drains before winter on ground where the water table sits 5 to 13 feet down.",
    },
  ],

  neighbors: ["cypress", "buena-park"],

  faq: [
    {
      q: "Is La Palma's water hard?",
      a: "Yes. The city's 2026 Water Quality Report, covering 2025 testing, shows its own well water averaging 147 ppm of hardness, or 8.6 grains per gallon, and the imported Metropolitan water averaging 236 ppm, or 14 grains per gallon, with a range of 138 to 280 ppm across both. The city's 2025 water management plan says about 97 percent of the supply was groundwater in fiscal year 2024-25, so the lower number is the usual one. That is still hard enough to scale a water heater, so flushing a tank yearly is worth the hour.",
    },
    {
      q: "Who provides fire service in La Palma?",
      a: "The Orange County Fire Authority. The city's Fire Services page says the authority provides fire protection and emergency medical service, paid for by a dedicated share of local property taxes, and that Station 13 at 7792 Walker Street is the one station inside city limits. The general plan adds that Station 12 in Cypress and Station 61 in Buena Park also respond. Police is different: La Palma has run its own police department almost since it was founded.",
    },
    {
      q: "Do I need a permit to replace a water heater or reroof in La Palma?",
      a: "The city's handout list has nothing specific to either job, so the general rule applies. The permit description on La Palma's OpenGov portal says a permit is required before starting work whenever a building or structure is altered, repaired or improved, and the single Building Permit application covers building, electrical, mechanical and plumbing work, with a line in its plumbing section for a water heater and vent. For a roof, the municipal code requires a fire-retardant covering, Class B at minimum, on any reroof. A licensed contractor with a La Palma business license normally pulls the permit, and the Building and Safety Division at 714-690-3340 will confirm what a specific job needs.",
    },
    {
      q: "Is La Palma in a flood zone?",
      a: "Not a high-risk one. The city's general plan says all of La Palma is FEMA Zone X, a moderate to low risk area, and the city's flood page says the western part is shown as protected by the Coyote Creek levees while the rest has a 0.2 percent chance of flooding in any year, so flood insurance is not required. The larger scenario is dam failure: the general plan says a Prado Dam failure could inundate the whole city, and the city's later page says a very rare storm at Whittier Narrows Dam could bring zero to eight feet of water.",
    },
    {
      q: "Is La Palma in a liquefaction zone?",
      a: "Yes, all of it. The general plan's safety element says the state's Seismic Hazard Zones map for the Los Alamitos quadrangle places the entire city in a Liquefaction Hazard Zone, and it puts groundwater only about 5 to 13 feet below the surface. The plan says the zone does not mean every property will liquefy. What it does mean is a geotechnical report before most new development and a disclosure statement when a home in the zone is sold.",
    },
  ],

  updated: "2026-09-20",
};
