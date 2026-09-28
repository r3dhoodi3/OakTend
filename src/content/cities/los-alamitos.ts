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
    "Los Alamitos is a small city wrapped around a military airfield: the Joint Forces Training Base takes up 1,317 of its 2,619 acres in the general plan's 2013 table. It began in the 1890s as a sugar beet company town, grew when the Navy moved its air station here in World War II, and incorporated on March 1, 1960, and it has more apartments and fourplexes than single family homes.",
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
        text: "Of about 4,623 housing units, roughly 17.2 percent went up in the 1950s, 28.2 percent in the 1960s and 21.2 percent in the 1970s, about two thirds of the city in three decades; about 3.9 percent predate 1950 and 10.4 percent date from 2000 or later. About 42 percent of units are detached houses and about 32 percent sit in buildings of three to nine units.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0643224",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "In 1896 former Montana senator William Clark bought 8,139 acres of rancho land for sugar beets, planned the township and built a refinery with worker housing. After Pearl Harbor the Navy moved its aircraft training field from Terminal Island to a 1,300 acre tract here, which the city's history says revitalized a sleepy country town.",
        sourceUrl: "https://cityoflosalamitos.org/354/History-of-Los-Alamitos",
        sourceLabel: "City of Los Alamitos, History of Los Alamitos",
      },
      {
        text: "Unlike most Orange County cities, Los Alamitos has more multiple family units than single family homes: the 2035 General Plan's 2013 table counts 2,629 multiple family units, 1,680 single family homes and 112 mobile homes across 16 residential neighborhoods. In a shared building, the split of repairs between owner and association comes first.",
        sourceUrl:
          "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
        sourceLabel: "City of Los Alamitos 2035 General Plan, land use element",
      },
      {
        text: "The Airport Environs Land Use Plan sets noise restrictions around the base, and the general plan says approximately 50 homes in the Highlands and New Dutch Haven neighborhoods are exposed to more than 65 dBA CNEL and have been or should be sound attenuated to 45 dBA CNEL inside. Under the flight path, a replacement window's acoustic rating matters as much as its energy rating.",
        sourceUrl:
          "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
        sourceLabel: "City of Los Alamitos 2035 General Plan, public facilities and safety element",
      },
      {
        text: "The Rossmoor/Los Alamitos Area Sewer District, founded in 1952 when residents voted bonds to replace failing septic tanks, runs the mains down the center of the street: over 8,000 connections on a 54-mile system discharging to the Orange County Sanitation District. Before paying for work on your lateral, call the district at 562-431-2223 to ask where its responsibility ends.",
        sourceUrl: "https://www.rlasd.org/about-us",
        sourceLabel: "Rossmoor/Los Alamitos Area Sewer District, About Us",
      },
      {
        text: "The city's permit FAQ exempts only a short list of jobs, including up to 400 square feet of roofing in any 12 month period, block walls under 30 inches, and floor and countertop tile, so a full reroof needs a permit. Permits go to a licensed contractor or an owner living in the house or duplex, contractors need a Los Alamitos business license, and on a reroof the owner signs a form certifying smoke and carbon monoxide detectors are in.",
        sourceUrl: "https://cityoflosalamitos.org/Faq.aspx?TID=18",
        sourceLabel: "City of Los Alamitos, Building and Safety permits and submittals FAQ",
      },
      {
        text: "The division's water heater handout asks for seismic straps in the upper and lower thirds of the tank, the lower one at least 4 inches above the controls; a relief line piped outside ending 6 to 24 inches above grade; a gas burner at least 18 inches above a garage floor with vehicle protection; an expansion tank on a closed system; and a drain pan where a leak could do damage. It quotes the 2019 code, so confirm details against the 2025 codes now enforced.",
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
    note: "Names from Figure 2 of the 2035 General Plan, which maps 16 residential neighborhoods. It picks Old Town West, Old Town East and Apartment Row as the multifamily areas for coordinated property maintenance, puts the Highlands at the southwestern edge by Orville Lewis Park, and places a stormwater pump station at the Fenley Drive cul-de-sac in College Park North, a low spot that cannot drain by gravity. Rossmoor next door is unincorporated county land, though the plan treats it as the city's sphere of influence.",
    sourceUrl:
      "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
  },

  water: {
    utility: "Golden State Water Company, West Orange County system",
    utilityUrl: "https://www.gswater.com/los-alamitos",
    summary:
      "Water comes from Golden State Water, a subsidiary of American States Water Company with rates set by the California Public Utilities Commission, which has served Los Alamitos since 1929. Its West Orange County system, about 30,100 customers, blends Orange County basin groundwater with imported Colorado River and State Water Project water. In 2025 hardness averaged 237 ppm, or 13.8 grains per gallon, with a range of 62.9 to 369 ppm (3.67 to 21.6 grains), so a given tap depends on which sources feed it. The report found no lead or galvanized service lines needing replacement, and some groundwater sources had PFAS detections above notification levels in 2025, which the company says it monitors.",
    sourceUrl:
      "https://www.gswater.com/sites/main/files/file-attachments/water-quality-west-orange-county.pdf",
  },

  permits: {
    office: "City of Los Alamitos Building and Safety Division",
    portalUrl: "https://losalamitos.cts.city/",
    summary:
      "Since May 4, 2026 the walk-in counter at City Hall, 3191 Katella Avenue, opens only 7:30 to 10:00 a.m., Monday through Thursday. Everything else runs through the 24-hour online Permit Center: applications, PDF plan check, fees, revisions and inspections, which run 10 a.m. to noon or noon to 3:30 p.m. The 2025 California codes with local amendments apply from January 1, 2026. The city offers two pre-approved all-electric ADU plans, a 563 square foot one-bedroom and an 876 square foot two-bedroom. The division is at 562-431-3538, extension 302.",
    sourceUrl: "https://cityoflosalamitos.org/412/Building-Safety",
  },

  hazards: [
    {
      text: "The general plan says Los Alamitos has a characteristically high water table and cohesionless subsoils, the conditions that can liquefy in extreme shaking. It knows of no active or potentially active fault in the city or Rossmoor; the closest is the Newport-Inglewood fault zone, source of the 1933 Long Beach earthquake that devastated the area.",
      sourceUrl:
        "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
      sourceLabel: "City of Los Alamitos 2035 General Plan, public facilities and safety element",
    },
    {
      text: "The California Geological Survey's March 25, 1999 map for the Los Alamitos quadrangle shows a liquefaction zone of required investigation, and all 81 points checked on a grid across the city on September 20, 2026 fell inside it. That means a geotechnical investigation before most new development and a disclosure to buyers, not that an existing house is unsafe.",
      sourceUrl: "https://www.conservation.ca.gov/cgs/sh/seismic-hazard-zones",
      sourceLabel: "California Geological Survey, Seismic Hazard Zones (Los Alamitos quadrangle)",
    },
    {
      text: "Only the drainage channels sit in a 100-year flood zone; the rest of the city and Rossmoor is shaded Zone X. The everyday problem is street flooding along Portal Drive, Cherry Street, Serpentine Drive, low points on Katella Avenue and Kempton Drive, which the plan blames on nearly flat streets and too few catch basins, most built in the 1950s and 1960s.",
      sourceUrl:
        "https://cityoflosalamitos.org/DocumentCenter/View/436/2035-General-Plan-PDF",
      sourceLabel: "City of Los Alamitos 2035 General Plan, public facilities and safety element",
    },
    {
      text: "FEMA's current flood layer, checked September 20, 2026, labels the west side toward Coyote Creek as Zone X with reduced risk due to levee, the east side as Zone X at 0.2 percent annual chance, and the training base as Zone D, possible but undetermined hazard. A levee label means the protection depends on the channel walls holding.",
      sourceUrl: "https://msc.fema.gov/portal/search?AddressQuery=Los%20Alamitos%2C%20CA",
      sourceLabel: "FEMA Flood Map Service Center, National Flood Hazard Layer",
    },
    {
      text: "The general plan sees very little wildland fire risk in this urban area; the hazard is house and building fire. The city contracts with the Orange County Fire Authority, whose Station 2 at 3642 Green Avenue is staffed daily by a captain, an engineer and two firefighters, and the training base runs its own aircraft rescue station under mutual aid.",
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
        "About two thirds of the city's homes date from the 1950s through the 1970s.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Water averaging 13.8 grains per gallon, and a city handout that spells out the strapping.",
    },
    {
      href: "/guides/adu-cost",
      title: "ADU cost",
      blurb:
        "Los Alamitos offers two pre-approved plans, a 563 and an 876 square foot unit.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Clear gutters and yard drains before winter on streets the city says are nearly flat.",
    },
  ],

  neighbors: ["cypress", "seal-beach", "garden-grove"],

  faq: [
    {
      q: "When is the Joint Forces Training Base busiest?",
      a: "Weekends and training periods. The city's 2035 General Plan describes the base as relatively quiet on weekdays, with more activity on weekends and during training periods.",
    },
    {
      q: "Does the Los Alamitos building division handle permits in Rossmoor?",
      a: "No. The city's permit FAQ says it does not serve Rossmoor, which is unincorporated, so Rossmoor permits go to the County of Orange building department.",
    },
  ],

  updated: "2026-09-20",
};
