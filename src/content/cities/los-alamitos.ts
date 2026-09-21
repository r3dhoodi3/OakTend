import type { CityContent } from "./types";

// Los Alamitos. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a city that is half
// military airfield. The city's 2035 General Plan (adopted March 23, 2015)
// says the Joint Forces Training Base is roughly half of the land inside the
// city limits (1,317 of 2,619 acres in its 2013 land use table), that about 50
// homes in the Highlands and New Dutch Haven neighborhoods sit inside the 65
// dBA CNEL aircraft noise contour, and that Los Alamitos has more multiple
// family units than single family homes. The housing went up around cityhood
// (March 1, 1960): about two thirds of homes date from the 1950s to the 1970s.
//
// FIRE SERVICE. The city contracts with the Orange County Fire Authority:
// confirmed on the city's Fire page, the authority's member city list and its
// Division 1 station list (Station 2, 3642 Green Avenue). Police are the
// city's own department.
//
// WATER NUMBERS are from Golden State Water Company's current West Orange
// County report (2025 sampling, published 2026), downloaded from gswater.com
// today. It prints one system-wide hardness row in both ppm and grains per
// gallon, so no conversion of ours is on the page.
//
// TWO FACTS COME FROM MAP LAYERS, NOT DOCUMENTS. The liquefaction zone
// (California Geological Survey, 1999) and the flood zones (FEMA) were read
// by querying each agency's public map service on a grid of points across the
// city. The page says "points we checked" and tells readers to look up their
// own address.
//
// THE CITY'S BUILDING FAQ IS STALE IN PLACES (2019 codes, counter hours to
// 12:30). The newer Building and Safety page (2025 codes, counter 7:30 to
// 10:00 a.m. from May 4, 2026) wins wherever the two disagree.
//
// LEFT OUT ON PURPOSE. Any "first sugar factory" claim (the history page says
// first in Southern California, the general plan says first in Orange
// County), the 1933 earthquake's magnitude (the plan prints 6.3 and 6.4),
// runway length and the base in square miles (no primary source), the Los
// Alamitos Race Course (it is in Cypress), tsunami (the state hazard area
// reaches no point we checked), the State Fire Marshal's 2025 fire hazard map
// (its data layer shows no zone here, but no state page says so in words),
// dam inundation (the plan has one sentence, on Prado Dam, and no map), the
// old county office address in the city's FAQ, who owns the sewer lateral
// (the district's FAQ page would not load), a gas transmission line note, and
// rainfall or temperature figures (none found).

export const losAlamitos: CityContent = {
  name: "Los Alamitos",
  slug: "los-alamitos",
  intro:
    "Los Alamitos is a small city wrapped around a military airfield: the city's 2035 General Plan says the Joint Forces Training Base takes up roughly half of the land inside the city limits, 1,317 of 2,619 acres in its 2013 land use table. The town began in the 1890s as the company town for a sugar beet factory, the Navy moved its air station here during World War II, and cityhood came on March 1, 1960, which is why about two thirds of the homes date from the 1950s through the 1970s and the median build year is 1970. It is also as much a city of fourplexes and apartments as of tract houses: the same plan says Los Alamitos has more multiple family units than single family homes.",
  metaDescription:
    "Los Alamitos is half military airfield. What 1950s to 1970s homes, hard Golden State water, a morning-only permit counter and liquefaction soil mean.",
  metaTitle: "Los Alamitos homes: airfield city, hard water",

  population: {
    value: "About 11,794 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the city's general plan says it incorporated in 1960 with a population of 4,312",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0643224",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "near-coastal",
    medianYearBuilt: "1970",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0643224",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Los Alamitos's median year built is 1970. Of about 4,623 housing units, roughly 28.2 percent went up in the 1960s, 21.2 percent in the 1970s and 17.2 percent in the 1950s, which is about two thirds of the city in three decades, while only about 3.9 percent predate 1950 and about 10.4 percent date from 2000 or later. Table B25024 shows the mix: about 42 percent of units are detached houses and about 32 percent are in buildings of three to nine units. A house or fourplex from those decades is at the age where original drain lines, the electrical panel, supply plumbing and the second roof all come due close together.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0643224",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The city's own history explains the timing. In 1896 former Montana senator William Clark bought 8,139 acres of rancho land to raise sugar beets, planned the township of Los Alamitos and built a sugar refinery with housing for its workers. After Pearl Harbor the Navy moved its aircraft training field from Terminal Island to a 1,300 acre tract here, which the history says revitalized a sleepy country town and brought new settlers and businesses, and on March 1, 1960 Los Alamitos became a chartered city.",
        sourceUrl: "https://cityoflosalamitos.org/354/History-of-Los-Alamitos",
        sourceLabel: "City of Los Alamitos, History of Los Alamitos",
      },
      {
        text: "This is not a typical Orange County tract city. The 2035 General Plan says the Joint Forces Training Base is roughly half of the land within the city boundaries, and that unlike the majority of Orange County jurisdictions Los Alamitos has more multiple family housing units than single family homes: its 2013 table counts 2,629 multiple family units, 1,680 single family homes and 112 mobile homes, grouped into 16 residential neighborhoods. In a shared building, find out which repairs belong to you and which to the association or the building owner before you call anyone.",
        sourceUrl:
          "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
        sourceLabel: "City of Los Alamitos 2035 General Plan, land use element",
      },
      {
        text: "Aircraft noise is a mapped fact here, not a rumor. The general plan says a land use compatibility plan, the Airport Environs Land Use Plan, sets noise restrictions around the base, and that approximately 50 existing homes in the Highlands and New Dutch Haven neighborhoods are exposed to noise above 65 dBA CNEL. It says those homes have been or should be sound attenuated to an interior standard of 45 dBA CNEL. If you replace windows or doors under the flight path, the acoustic rating matters as much as the energy rating.",
        sourceUrl:
          "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
        sourceLabel: "City of Los Alamitos 2035 General Plan, public facilities and safety element",
      },
      {
        text: "The sewer under your street belongs to a special district, not the city. The Rossmoor/Los Alamitos Area Sewer District says it was founded in 1952, when residents voted for bonds to replace failing septic tanks, and that it now serves over 8,000 connections through a 54-mile system that discharges to the Orange County Sanitation District for treatment. The district and the city's utilities page both describe its job as the main lines that run down the center of the street. Before paying for work on the line between your house and the main, call the district at 562-431-2223 and ask where its responsibility ends.",
        sourceUrl: "https://www.rlasd.org/about-us",
        sourceLabel: "Rossmoor/Los Alamitos Area Sewer District, About Us",
      },
      {
        text: "The city's permit FAQ spells out the small jobs that need no permit, and the list is short: replacing up to 400 square feet of roofing in any 12 month period, block walls under 30 inches, and floor and countertop tile are among them. A full reroof is over that line. The same FAQ says a permit is issued to a licensed contractor or to an owner who lives in the single family house or duplex, that contractors and their subcontractors need a Los Alamitos business license, and that on a reroof, where the inspector does not go inside, the owner signs a form certifying that smoke and carbon monoxide detectors are installed.",
        sourceUrl: "https://cityoflosalamitos.org/Faq.aspx?TID=18",
        sourceLabel: "City of Los Alamitos, Building and Safety permits and submittals FAQ",
      },
      {
        text: "The Building and Safety Division's water heater handout shows what its inspector looks for: seismic straps within the upper third and the lower third of the tank, with the lower strap at least 4 inches above the controls, a temperature and pressure relief line piped to the outside and ending 6 to 24 inches above the ground, a gas burner at least 18 inches above a garage floor with protection from vehicles, an expansion tank on a closed system, and a drain pan where a leak could do damage, such as an attic or upper floor. The handout quotes the 2019 plumbing code and the city now enforces the 2025 codes, so confirm details first.",
        sourceUrl: "https://cityoflosalamitos.org/DocumentCenter/View/183/Water-Heater-PDF",
        sourceLabel: "City of Los Alamitos Building and Safety, water heater installations handout",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Old Town West",
      "Old Town East",
      "Apartment Row",
      "Carrier Row",
      "Highlands",
      "New Dutch Haven",
      "Old Dutch Haven",
      "College Park North",
      "Royal Oak Park",
    ],
    note: "These are names from Figure 2 of the city's 2035 General Plan, which maps 16 residential neighborhoods. The plan singles out Old Town West, Old Town East and Apartment Row as the multifamily neighborhoods where it wants coordinated property maintenance, places the Highlands at the southwestern edge of the city by Orville Lewis Park, and puts a city stormwater pump station at the Fenley Drive cul-de-sac in College Park North, a low spot that cannot drain by gravity. Rossmoor, the large tract next door, is an unincorporated county community and not part of the city, although the plan treats it as the city's sphere of influence.",
    sourceUrl:
      "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
  },

  water: {
    utility: "Golden State Water Company, West Orange County system",
    utilityUrl: "https://www.gswater.com/los-alamitos",
    summary:
      "Los Alamitos does not run its own water system. The city's utilities page says Golden State Water provides water service, and the company, a subsidiary of American States Water Company whose rates are set by the California Public Utilities Commission, says it has served Los Alamitos and the surrounding communities since 1929. Its West Orange County system serves approximately 30,100 customers in Cypress, Los Alamitos, Stanton and portions of Garden Grove, La Palma, Rossmoor and Seal Beach. The current report describes the water as a blend of treated groundwater pumped from the Orange County Groundwater Basin and imported Colorado River and State Water Project water delivered by the Metropolitan Water District. In 2025 sampling, hardness across the system averaged 237 ppm, which the report prints as 13.8 grains per gallon, with a range of 62.9 to 369 ppm, or 3.67 to 21.6 grains per gallon. That average is very hard water, and the wide range means what reaches a given tap depends on which sources are feeding that part of the system; the report gives one system-wide row and does not split groundwater from imported water. It also says the company's inventory found no lead or galvanized service lines that require replacement, and that some groundwater sources had PFAS detections above the current notification levels in 2025, which the company says it continues to monitor.",
    sourceUrl:
      "https://www.gswater.com/sites/main/files/file-attachments/water-quality-west-orange-county.pdf",
  },

  permits: {
    office: "City of Los Alamitos Building and Safety Division",
    portalUrl: "https://losalamitos.cts.city/",
    summary:
      "The Building and Safety Division, part of Development Services at City Hall, 3191 Katella Avenue, keeps short counter hours: the city's page says that effective May 4, 2026 the walk-in counter is open 7:30 a.m. to 10:00 a.m., Monday through Thursday, excluding federal holidays. For everything else the city points to its online Permit Center, open 24 hours a day, where you can fill out a permit application, upload PDF plans for plan check, pay fees, submit revisions and schedule inspections. Inspections run in a morning window of 10 a.m. to 12 p.m. and an afternoon window of 12 p.m. to 3:30 p.m. The page says the 2025 California Building Standards Code, with local amendments, has been enforced since January 1, 2026. The city also offers two pre-approved accessory dwelling unit plans, a 563 square foot one-bedroom and an 876 square foot two-bedroom, both all electric. The division's number is 562-431-3538, extension 302. The city's FAQ is blunt that it does not serve Rossmoor, which goes to the County of Orange building department.",
    sourceUrl: "https://cityoflosalamitos.org/412/Building-Safety",
  },

  hazards: [
    {
      text: "The city's general plan says liquefaction needs three things at once: loose sandy soil, groundwater less than 30 feet from the surface, and strong shaking. It says Los Alamitos has a characteristically high water table and cohesionless subsoils, so areas with those conditions may liquefy during extreme ground shaking. The same chapter says there are no known active or potentially active faults in the city or Rossmoor, so surface rupture is unlikely, and that the closest fault is the Newport-Inglewood fault zone, which produced the 1933 Long Beach earthquake that devastated the Los Alamitos and Rossmoor area.",
      sourceUrl:
        "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
      sourceLabel: "City of Los Alamitos 2035 General Plan, public facilities and safety element",
    },
    {
      text: "The state's map is less tentative than the city's wording. The California Geological Survey's seismic hazard zone map for the Los Alamitos quadrangle, released March 25, 1999, shows a liquefaction zone of required investigation, and all 81 points we checked on a grid across the city on September 20, 2026 fell inside it. The Survey says a mapped zone means a site-specific geotechnical investigation before most new development can be permitted, and that a seller must disclose the zone to a buyer. It does not mean an existing house is unsafe, but it is a reason to ask an engineer before adding a second story.",
      sourceUrl: "https://www.conservation.ca.gov/cgs/sh/seismic-hazard-zones",
      sourceLabel: "California Geological Survey, Seismic Hazard Zones (Los Alamitos quadrangle)",
    },
    {
      text: "On flooding, the general plan says only the drainage channels are in a 100-year flood zone, and that apart from the flood control facilities the entire city and Rossmoor are in shaded Zone X, the 0.2 percent annual chance or 500-year zone. The everyday problem is smaller: the plan lists localized flooding along Portal Drive, Cherry Street, Serpentine Drive, low points on Katella Avenue and Kempton Drive, and blames nearly flat streets and too few catch basins, most of them built in the 1950s and 1960s to older standards.",
      sourceUrl:
        "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
      sourceLabel: "City of Los Alamitos 2035 General Plan, public facilities and safety element",
    },
    {
      text: "FEMA's current National Flood Hazard Layer adds a detail the 2015 plan does not. At the points we checked on September 20, 2026, the western side of town toward Coyote Creek is labeled Zone X, area with reduced flood risk due to levee, the eastern side is Zone X, 0.2 percent annual chance flood hazard, and the training base is Zone D, which FEMA defines as possible but undetermined flood hazard. None of those is the 100-year zone, but a levee label means the protection depends on the channel walls holding, so look up your own address on FEMA's map before deciding whether flood insurance is worth it.",
      sourceUrl: "https://msc.fema.gov/portal/search?AddressQuery=Los%20Alamitos%2C%20CA",
      sourceLabel: "FEMA Flood Map Service Center, National Flood Hazard Layer",
    },
    {
      text: "Wildfire is not the concern here. The general plan says that because Los Alamitos, Rossmoor and the surrounding communities are urban there is very little risk of wildland fire, and that the primary fire hazard is urban fire in homes and commercial and industrial buildings. It says the city contracts with the Orange County Fire Authority, that the local station is Station 2 at 3642 Green Avenue, and that the training base runs its own fire station, trained for aircraft rescue, under a mutual aid agreement with the authority. The authority's own station list shows Station 2 staffed daily by a captain, an engineer and two firefighters.",
      sourceUrl:
        "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
      sourceLabel: "City of Los Alamitos 2035 General Plan, public facilities and safety element",
    },
  ],

  guides: [
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "What to watch for in a city where about two thirds of homes date from the 1950s through the 1970s and the water averages 237 ppm of hardness.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on water the 2025 report puts at 13.8 grains per gallon, plus what the city's strapping handout expects.",
    },
    {
      href: "/guides/adu-cost",
      title: "ADU cost",
      blurb:
        "What a backyard unit runs, in a city that offers two pre-approved plans: a 563 square foot one-bedroom and an 876 square foot two-bedroom.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including clearing gutters and yard drains before winter on streets the city says are nearly flat.",
    },
  ],

  neighbors: ["cypress", "seal-beach", "garden-grove"],

  faq: [
    {
      q: "Is Los Alamitos water hard?",
      a: "Yes. Golden State Water Company's current report for its West Orange County system, which serves Los Alamitos, shows hardness averaging 237 ppm, or 13.8 grains per gallon, in 2025 sampling, with a range of 62.9 to 369 ppm. That average is very hard water. Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour.",
    },
    {
      q: "Who provides fire service in Los Alamitos?",
      a: "The Orange County Fire Authority. The city's Fire page says Los Alamitos contracts with the authority for fire, emergency medical and rescue services, and the authority lists Station 2 at 3642 Green Avenue as serving the city. Police are different: Los Alamitos has its own police department.",
    },
    {
      q: "Do I need a permit to replace a water heater or reroof in Los Alamitos?",
      a: "The city's permit FAQ says a plumbing permit is required to install or modify a plumbing system and a building permit to modify a building, and the only roofing it exempts is replacement of up to 400 square feet in any 12 month period, so a full reroof needs a permit. The division's water heater handout covers seismic straps, the relief valve drain, garage clearances and venting. Applications go through the online Permit Center, since the walk-in counter is open only 7:30 to 10:00 a.m., Monday through Thursday, and a licensed plumber or roofer normally pulls the permit as part of the job.",
    },
    {
      q: "How much of Los Alamitos is the Joint Forces Training Base, and is aircraft noise an issue?",
      a: "The city's 2035 General Plan says the base is roughly half of the land within the city boundaries, 1,317 of 2,619 acres in its 2013 table. It describes the base as relatively quiet on weekdays with more activity on weekends and training periods, and says approximately 50 homes in the Highlands and New Dutch Haven neighborhoods are inside the 65 dBA CNEL aircraft noise contour.",
    },
    {
      q: "Is Los Alamitos in a liquefaction or flood zone?",
      a: "Liquefaction, yes: the California Geological Survey's 1999 seismic hazard map for the Los Alamitos quadrangle shows a liquefaction zone, and every point we checked across the city fell inside it, which sellers must disclose. Flood risk is lower: the city's general plan says only the drainage channels are in a 100-year flood zone and the rest of the city is in shaded Zone X. Look up your own address on both maps.",
    },
  ],

  updated: "2026-09-20",
};
