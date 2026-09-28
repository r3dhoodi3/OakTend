import type { CityContent } from "./types";

// San Juan Capistrano. Researched 2026-09-20 for the fourth city wave. Every
// number below was read from the source document itself, not from a search
// summary.
//
// The angle that makes this page not interchangeable: a 1776 mission town that
// only became a city in 1961 and was mostly built in the 1970s, sitting in a
// creek valley under slide-prone hills. The city's Safety Element (adopted
// February 1, 2022) calls landslides and debris flows the dominant geologic
// hazard, names three creeks and three upstream dams, and the city's July 15,
// 2025 agenda report counts the acres the State Fire Marshal's new map put in
// each fire hazard tier. Permits are unusual too: the Building Division takes
// residential remodel submittals in person, by appointment, on paper.
//
// WATER NUMBERS are from Santa Margarita Water District's 2026 Water Quality
// Report "Serving San Juan Capistrano" (reporting year 2025, the district's
// ID9 system), a text PDF on smwd.com. The report prints both ppm and grains
// per gallon, so no figure here is our conversion. The November 2021 transfer
// date is SMWD's own wording ("since the acquisition in November of 2021").
// SMWD's news posts call the San Juan Groundwater Plant by two other names;
// the report's name is used here.
//
// The Safety Element PDF has a broken font map (every character shifted by 29
// code points); it was decoded by shifting back and read in full.
//
// LEFT OUT ON PURPOSE. The "oldest continuously occupied neighborhood in
// California" line about Los Rios (not in any city document opened), the count
// of National Register listings (the city says 13 on one page and lists 14 on
// another), the railroad's arrival year (history page 1887, general plan
// 1881), septic systems (the Housing Element says every parcel has water and
// sewer available), equestrian property rules, where the old 2011 Very High
// zones were, whether the fire map ordinance passed its August 5, 2025 second
// reading (minutes not opened), South Coast Water District hardness figures
// (its report was not opened for this page) and any street-level split
// between the two water districts.

export const sanJuanCapistrano: CityContent = {
  name: "San Juan Capistrano",
  slug: "san-juan-capistrano",
  intro:
    "San Juan Capistrano grew up around a mission founded in 1776 but did not incorporate until 1961, and about 36 percent of its homes date from the 1970s. Its safety element calls landslides and debris flows the dominant geologic hazard in this creek valley, and the State Fire Marshal's 2025 map raised the city's Very High fire acreage from 401 to 2,636.",
  metaDescription:
    "San Juan Capistrano homes are mostly 1970s stock in a creek valley under slide-prone hills. SMWD water, OCFA, in-person permits, 2025 fire map. Sourced.",
  metaTitle: "San Juan Capistrano: 1970s homes, creeks and hills",

  population: {
    value: "About 35,095 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0668028",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "near-coastal",
    medianYearBuilt: "1979",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0668028",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 13,071 housing units, roughly 36.0 percent went up in the 1970s, 15.7 percent in the 1980s, 14.4 percent in the 1990s and 11.9 percent in the 1960s, with about 17 percent from 2000 or later and only about 2 percent before 1950. About 56.5 percent are detached houses and 20.2 percent attached.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0668028",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The 2021-2029 Housing Element counts seven mobile home parks with 1,394 units, about 11 percent of the 12,558 units it tallied, under a mobile home park rent control ordinance and with a senior overlay on four parks. The newer ACS estimate puts mobile homes at about 1,296 units, 9.9 percent. The city's permit page lists the state's manufactured and mobile home program among outside agencies an applicant may need.",
        sourceUrl:
          "https://sanjuancapistrano.org/DocumentCenter/View/2388/General-Element---Housing-Element-PDF",
        sourceLabel: "City of San Juan Capistrano Housing Element, 2022",
      },
      {
        text: "Mission San Juan Capistrano dates to November 1, 1776, the seventh mission in the California chain. Development pressure in the early 1970s led residents to write a 1974 general plan that preserved historic resources and open space, limited density and protected ridgelines, which is why so many hills are still bare.",
        sourceUrl: "https://sanjuancapistrano.org/356/History",
        sourceLabel: "City of San Juan Capistrano, History",
      },
      {
        text: "The city incorporated as a general law city on April 19, 1961. The general plan describes a coastal valley one mile from the ocean, divided by Interstate 5 and bordered by Laguna Niguel, Mission Viejo, Dana Point, San Clemente and unincorporated county land.",
        sourceUrl:
          "https://sanjuancapistrano.org/DocumentCenter/View/1080/General-Plan---Introduction-PDF",
        sourceLabel: "City of San Juan Capistrano General Plan, Introduction",
      },
      {
        text: "The Los Rios Street Historic District, 31600 to 31921 Los Rios Street, joined the National Register in 1983 and the Mission in 1971. The Montanez Adobe at 31745 Los Rios Street dates to 1794, and three such adobes remain on the street. The Housing Element puts only about 1.5 percent of the city's housing before 1940.",
        sourceUrl:
          "https://sanjuancapistrano.org/259/National-Register-of-Historic-Places",
        sourceLabel:
          "City of San Juan Capistrano, National Register of Historic Places",
      },
      {
        text: "Altering, adding onto, moving or demolishing a building on the city's Inventory of Historic and Cultural Landmarks requires a permit through Site Plan Review. Designated buildings can use the State Historical Building Code and apply for a Mills Act contract, which the city says can cut property tax assessments by 15 to 60 percent. Planning: 949-443-6331.",
        sourceUrl: "https://sanjuancapistrano.org/253/Historic-Preservation",
        sourceLabel: "City of San Juan Capistrano, Historic Preservation",
      },
      {
        text: "Santa Margarita Water District says some of the city's water infrastructure dates to the 1920s and that it has invested over 30 million dollars here since 2021, 11.9 million on treatment. A March 2026 post says the local groundwater plant, built in 2003 and online in 2006, added a second reverse osmosis unit, lifting capacity from 2.4 million to almost 5 million gallons a day.",
        sourceUrl: "https://www.smwd.com/SJC",
        sourceLabel:
          "Santa Margarita Water District, San Juan Capistrano system page",
      },
      {
        text: "Fire and emergency medical service comes from the Orange County Fire Authority. Its Station 7, at Del Obispo and Forster Lane, is staffed by five career firefighters daily, two of them paramedics, plus reserves, with a structural engine, a Type 3 wildland engine, a patrol unit and a 1,800-gallon water tender.",
        sourceUrl: "https://sanjuancapistrano.org/325/OCFA-Fire-Station-7",
        sourceLabel: "City of San Juan Capistrano, OCFA Fire Station 7",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Los Rios Historic District",
      "Mission Flats",
      "Mission Hill",
      "Spotted Bull",
      "Capistrano Villas",
      "Hunt Club",
      "McCracken Hill",
    ],
    note: "The Housing Element puts about half of the pre-1940 housing in the Los Rios district, the Mission Flats and Mission Hills neighborhoods and Spotted Bull, and names Capistrano Villas as the core of its community of focus. Los Rios lies east of the train depot and Mission Hill-Mission Flats east of the library. Hunt Club and McCracken Hill are two of the city's specific plans.",
    sourceUrl:
      "https://sanjuancapistrano.org/DocumentCenter/View/2388/General-Element---Housing-Element-PDF",
  },

  water: {
    utility: "Santa Margarita Water District",
    utilityUrl: "https://www.smwd.com/SJC",
    summary:
      "Santa Margarita Water District has owned the city's water and sewer system since November 2021; South Coast Water District also serves some areas, so check your bill. The district's city report lists three sources: groundwater treated at the San Juan Groundwater Plant, Irvine Ranch Water District's Baker plant, and imported Metropolitan water. In 2025 hardness averaged 210 ppm, or 12 grains per gallon, range 89 to 290 ppm (5.2 to 17 grains). Metropolitan water averaged 236 ppm, Baker water 293 ppm and the groundwater plant's water only 2.9 ppm, so the blend at a tap swings widely. The 2024 service line inventory found no lead or galvanized lines needing replacement.",
    sourceUrl:
      "https://www.smwd.com/DocumentCenter/View/6351/2026-Water-Quality-Report-ID-9---SJC",
  },

  permits: {
    office: "City of San Juan Capistrano Building Division",
    portalUrl: "https://etrakit.sanjuancapistrano.org/etrakit/Search/permit.aspx",
    summary:
      "Residential remodels go on paper, in person. City Hall, 32400 Paseo Adelanto (949-443-6347), is open by appointment only, and a completed permit application is needed to book one; only new construction is submitted electronically, nothing by mail or courier. The counter closes daily from noon to 1 pm, and eTRAKiT is for checking status and inspection results. First building review targets 12 working days, resubmittals 7, with no expedited option. Projects needing fire authority review go to the authority directly, and exterior work in an association needs written HOA approval first.",
    sourceUrl: "https://sanjuancapistrano.org/214/Apply-for-a-Permit",
  },

  hazards: [
    {
      text: "The city's July 15, 2025 agenda report says the State Fire Marshal's March 24, 2025 map raised Very High acreage inside the city from 401 to 2,636 and added 2,658 acres of High and 727 of Moderate, tiers the 2011 map did not show. Very High homes must keep at least 100 feet of defensible space, sellers in High or Very High zones must disclose it, and new construction must meet wildland-urban interface standards.",
      sourceUrl:
        "https://sjc.granicus.com/MetaViewer.php?view_id=3&clip_id=3100&meta_id=191078",
      sourceLabel:
        "City of San Juan Capistrano agenda report, July 15, 2025, fire hazard severity zone maps",
    },
    {
      text: "The 1958 Stewart Fire burned 2,500 acres inside the city and 69,444 in the region, and the 1988 Ortega Fire burned 2,384 acres. The fire authority alone enforces brush clearing in the Very High zones, and the Safety Element warns that mudslides in heavy rain commonly follow a fire.",
      sourceUrl:
        "https://sanjuancapistrano.org/DocumentCenter/View/1081/General-Plan---Safety-Element-PDF",
      sourceLabel: "City of San Juan Capistrano General Plan, Safety Element (2022)",
    },
    {
      text: "The hills are rolling to steep with deep canyons and more than 600 feet of relief. The shales and siltstones under them do not hold together well when wet, especially around San Juan Creek, the element rates debris flow risk high, and a relatively large part of the city has clay soils that shrink and swell.",
      sourceUrl:
        "https://sanjuancapistrano.org/DocumentCenter/View/1081/General-Plan---Safety-Element-PDF",
      sourceLabel: "City of San Juan Capistrano General Plan, Safety Element (2022)",
    },
    {
      text: "No known active fault crosses the city and there is no Alquist-Priolo zone here. The Newport-Inglewood Fault Zone, less than 5 miles southwest with a probable magnitude of 6.0 to 7.4, is the biggest shaking risk, and a significant area is vulnerable to liquefaction, especially the floodways below where San Juan and Trabuco creeks meet.",
      sourceUrl:
        "https://sanjuancapistrano.org/DocumentCenter/View/1081/General-Plan---Safety-Element-PDF",
      sourceLabel: "City of San Juan Capistrano General Plan, Safety Element (2022)",
    },
    {
      text: "The city has been in the National Flood Insurance Program since 1978 for owners along San Juan, Trabuco, Horno and Oso creeks, which earns them a 5 percent flood insurance reduction. Engineering gives flood zone determinations and base flood elevations for any address at 949-443-6337. Most creeks are not concrete-lined, and the city has FEMA zones A, AO and AE but no V zones.",
      sourceUrl:
        "https://sanjuancapistrano.org/285/FEMA---Floodplain-Management-Information",
      sourceLabel: "City of San Juan Capistrano, FEMA floodplain management information",
    },
    {
      text: "No dams sit inside the city, but it lies in the inundation path of Trampas Canyon Dam, Lake Mission Viejo Dam and Upper Oso Reservoir; Trampas Canyon, 2 miles east, is now a 1.6 billion gallon recycled water reservoir. The element calls a catastrophic failure unlikely, and the city's preparedness page says San Juan Capistrano is not in a tsunami inundation area.",
      sourceUrl:
        "https://sanjuancapistrano.org/DocumentCenter/View/1081/General-Plan---Safety-Element-PDF",
      sourceLabel: "City of San Juan Capistrano General Plan, Safety Element (2022)",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "The city's re-roof handout requires Class A once half a roof is redone within a year.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "District water averaged 12 grains per gallon in 2025, and every swap needs a permit.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "About 36 percent of homes here are 1970s builds on plumbing near 50 years old.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Brush clearance before fire season, and slope and drain checks before winter storms.",
    },
  ],

  neighbors: ["dana-point", "laguna-niguel", "mission-viejo", "san-clemente"],

  faq: [
    {
      q: "What does San Juan Capistrano require to replace a water heater?",
      a: "A permit and a final inspection for every installation or replacement, according to the Building Division's tank water heater handout, which also calls for two seismic straps. The handout cites an older code edition, so confirm details at 949-443-6347.",
    },
    {
      q: "What does San Juan Capistrano require for a new roof?",
      a: "Planning approval and a building permit, per the city's re-roof handout, plus a pre-roofing inspection before the deck is covered and a Class A covering when 50 percent or more of the roof is redone within a year. It also cites an older code edition, so confirm with the Building Division.",
    },
  ],

  updated: "2026-09-20",
};
