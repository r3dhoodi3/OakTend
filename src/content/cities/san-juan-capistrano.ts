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
    "San Juan Capistrano grew up around a mission founded on November 1, 1776, but it did not incorporate until April 19, 1961, and most of its houses are newer still: about 36 percent of the housing units date from the 1970s and the median build year is 1979. The city's general plan describes a coastal valley one mile from the ocean, and its safety element counts three major creeks on the valley floor and more than 600 feet of vertical relief in the hills above them, which is why it calls landslides and debris flows the dominant geologic hazard here. In 2025 the State Fire Marshal's new map raised the Very High fire hazard acreage inside the city from 401 to 2,636, according to the city's own agenda report.",
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
        text: "San Juan Capistrano's median year built is 1979. Of about 13,071 housing units, roughly 36.0 percent went up in the 1970s, 15.7 percent in the 1980s, 14.4 percent in the 1990s and 11.9 percent in the 1960s, with about 17 percent from 2000 or later and only about 2 percent from before 1950. About 56.5 percent are detached houses and 20.2 percent are attached. These are survey estimates with margins of error, but the shape is clear: the typical house here is 45 to 55 years old, the age when original plumbing, windows and a second roof all come due.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0668028",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "Mobile homes are a real part of the housing here. The city's 2021-2029 Housing Element (adopted February 2022, revised August 2022) counts seven mobile home parks with 1,394 units, about 11 percent of the 12,558 units it tallied, and says the city has a mobile home park rent control ordinance and a senior overlay on four of the parks. The newer ACS estimate puts mobile homes at about 1,296 units, or 9.9 percent. The city's permit page lists the state housing department's manufactured and mobile home program among the outside agencies an applicant may need.",
        sourceUrl:
          "https://sanjuancapistrano.org/DocumentCenter/View/2388/General-Element---Housing-Element-PDF",
        sourceLabel: "City of San Juan Capistrano Housing Element, 2022",
      },
      {
        text: "The city's history page dates Mission San Juan Capistrano to November 1, 1776, the seventh mission in the California chain. It also explains why so much open land and so many ridgelines are still bare: intense development pressure in the early 1970s led residents to write a new general plan, adopted in 1974, that preserved historic resources and open space, limited development density and provided for ridgeline preservation.",
        sourceUrl: "https://sanjuancapistrano.org/356/History",
        sourceLabel: "City of San Juan Capistrano, History",
      },
      {
        text: "The general plan's introduction says the community incorporated as a general law city on April 19, 1961,. It describes the city as a coastal valley one mile from the ocean, divided by Interstate 5, and bordered by Laguna Niguel, Mission Viejo, Dana Point, San Clemente and unincorporated Orange County.",
        sourceUrl:
          "https://sanjuancapistrano.org/DocumentCenter/View/1080/General-Plan---Introduction-PDF",
        sourceLabel: "City of San Juan Capistrano General Plan, Introduction",
      },
      {
        text: "The city's National Register page lists the Los Rios Street Historic District, 31600 to 31921 Los Rios Street, as added in 1983, and the Mission itself as added in 1971. It says the Montanez Adobe at 31745 Los Rios Street was built in 1794 and that three such adobes remain on the street. The Housing Element adds that only about 1.5 percent of the city's housing was built before 1940.",
        sourceUrl:
          "https://sanjuancapistrano.org/259/National-Register-of-Historic-Places",
        sourceLabel:
          "City of San Juan Capistrano, National Register of Historic Places",
      },
      {
        text: "Owning a designated landmark changes the permit path. The city's historic preservation page says that if an owner wishes to alter, add onto, relocate or demolish a landmark on its Inventory of Historic and Cultural Landmarks, a permit is required through the Site Plan Review process. In return, designated buildings are eligible for the State Historical Building Code and can apply for a Mills Act contract, which the page says can reduce property tax assessments by 15 to 60 percent according to county assessor staff. The Planning Division's number is 949-443-6331.",
        sourceUrl: "https://sanjuancapistrano.org/253/Historic-Preservation",
        sourceLabel: "City of San Juan Capistrano, Historic Preservation",
      },
      {
        text: "The pipes under the street are older than most of the houses. Santa Margarita Water District says some of the city's water infrastructure dates back to the 1920s, and that since it assumed water service in 2021 it has invested over 30 million dollars here, 11.9 million of it on water treatment. A March 2026 district post says the local groundwater plant, built in 2003 and brought online in 2006, now has a second reverse osmosis unit that lifted its capacity from 2.4 million to almost 5 million gallons a day.",
        sourceUrl: "https://www.smwd.com/SJC",
        sourceLabel:
          "Santa Margarita Water District, San Juan Capistrano system page",
      },
      {
        text: "San Juan Capistrano does not run its own fire department. The city's fire services page says it partners with the Orange County Fire Authority for fire and emergency medical services. The city's page for the authority's Station 7, at Del Obispo and Forster Lane, says it is staffed by five career firefighters daily, including two paramedics, plus reserve firefighters, and houses a structural engine, a Type 3 wildland engine, a patrol unit and a water tender that carries 1,800 gallons.",
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
    note: "These are names the city itself uses. The Housing Element says about half of the pre-1940 housing sits in the Historic Los Rios District, the Mission Flats and Mission Hills neighborhoods and the Spotted Bull neighborhood, and it names the Capistrano Villas neighborhood as the core of its community of focus. The city's landmark inventory page places the Los Rios district east of the train depot and the early 20th century Mission Hill-Mission Flats neighborhood east of the library. Hunt Club and McCracken Hill are the names of two of the city's adopted specific plans. Tract names that turn up only on real-estate pages were left out.",
    sourceUrl:
      "https://sanjuancapistrano.org/DocumentCenter/View/2388/General-Element---Housing-Element-PDF",
  },

  water: {
    utility: "Santa Margarita Water District",
    utilityUrl: "https://www.smwd.com/SJC",
    summary:
      "Santa Margarita Water District has owned and run San Juan Capistrano's water and sewer system since it acquired it from the city in November 2021, and it publishes a separate water quality report for the city. That report says the drinking water comes from three sources: local groundwater treated at the San Juan Groundwater Plant, water bought from Irvine Ranch Water District's Baker Water Treatment Plant, and imported Metropolitan Water District water from the Colorado River and the State Water Project. For 2025 it shows hardness in the city's distribution system averaging 210 ppm, or 12 grains per gallon, with a range of 89 to 290 ppm (5.2 to 17 grains). By source, Metropolitan water averaged 236 ppm (14 grains), Baker plant water 293 ppm (17 grains) and the groundwater plant's treated water only 2.9 ppm, so the blend at a given tap can swing widely. The same report says the district's 2024 service line inventory found no lead or galvanized lines requiring replacement. South Coast Water District also says its service area includes areas of San Juan Capistrano, so check the name on your bill.",
    sourceUrl:
      "https://www.smwd.com/DocumentCenter/View/6351/2026-Water-Quality-Report-ID-9---SJC",
  },

  permits: {
    office: "City of San Juan Capistrano Building Division",
    portalUrl: "https://etrakit.sanjuancapistrano.org/etrakit/Search/permit.aspx",
    summary:
      "Building permits go through the Building Division at City Hall, 32400 Paseo Adelanto, phone 949-443-6347. The city says City Hall is open by appointment only and that tenant improvements and residential remodels must be submitted as hard copy, in person, with a completed permit application needed to book the appointment; new construction is submitted electronically, and plans are not accepted by mail or courier. The public counter closes daily from 12:00 to 1:00 pm, and the eTRAKiT portal is for checking review status and inspection results. The city's target is 12 working days for a first building review and 7 for resubmittals, with no expedited review. Projects that need Orange County Fire Authority review go to the authority directly, because the city does not route plans, and exterior work inside a homeowners association needs written HOA approval first.",
    sourceUrl: "https://sanjuancapistrano.org/214/Apply-for-a-Permit",
  },

  hazards: [
    {
      text: "The fire map grew sharply in 2025. The city's July 15, 2025 agenda report says the State Fire Marshal's March 24, 2025 map raised the acreage in the Very High Fire Hazard Severity Zone inside the city from 401 to 2,636, and identified 2,658 acres as High and 727 acres as Moderate, tiers the 2011 map did not show. The report says a home in a Very High zone must keep at least 100 feet of defensible space, sellers in High or Very High zones must disclose the designation, and new construction there must meet the state's wildland-urban interface building standards.",
      sourceUrl:
        "https://sjc.granicus.com/MetaViewer.php?view_id=3&clip_id=3100&meta_id=191078",
      sourceLabel:
        "City of San Juan Capistrano agenda report, July 15, 2025, fire hazard severity zone maps",
    },
    {
      text: "Wildfire here has a record. The city's Safety Element says the 1958 Stewart Fire burned 2,500 acres inside the city and 69,444 acres in the region, and the 1988 Ortega Fire burned 2,384 acres. It says brush clearing rules in the Very High zones are enforced wholly by the Orange County Fire Authority. It also warns that mudslides in heavy rain are a common threat after a fire.",
      sourceUrl:
        "https://sanjuancapistrano.org/DocumentCenter/View/1081/General-Plan---Safety-Element-PDF",
      sourceLabel: "City of San Juan Capistrano General Plan, Safety Element (2022)",
    },
    {
      text: "The Safety Element says the terrain is mostly gently to steeply rolling hills with deep-cut canyons, with more than 600 feet of vertical relief, and that landslides and debris flows are the dominant geologic hazard risks in the city. It says the shales and siltstones under the hills do not hold together well when wet, especially around San Juan Creek, rates the debris flow risk as high, and notes that a relatively large part of the city has clay soils that can shrink and swell. On a hillside lot, keep roof and yard drainage moving away from the slope and watch for new cracks after a wet winter.",
      sourceUrl:
        "https://sanjuancapistrano.org/DocumentCenter/View/1081/General-Plan---Safety-Element-PDF",
      sourceLabel: "City of San Juan Capistrano General Plan, Safety Element (2022)",
    },
    {
      text: "The same element says no known active faults cross the city and the state has set no Alquist-Priolo fault zone here, so the chance of the ground rupturing is low. Shaking is another matter: it lists the Newport-Inglewood Fault Zone less than 5 miles to the southwest, with a probable magnitude range of 6.0 to 7.4, as the highest risk of damage to the city. It says a significant area of the city is vulnerable to liquefaction, particularly the floodways downstream of where San Juan Creek and Trabuco Creek meet.",
      sourceUrl:
        "https://sanjuancapistrano.org/DocumentCenter/View/1081/General-Plan---Safety-Element-PDF",
      sourceLabel: "City of San Juan Capistrano General Plan, Safety Element (2022)",
    },
    {
      text: "The city says it has taken part in the National Flood Insurance Program since 1978 for the sake of owners along San Juan, Trabuco, Horno and Oso creeks, and that participation currently earns property owners a 5 percent reduction on flood insurance. Its Engineering and Environmental Services Department gives flood zone determinations and base flood elevations for any address at 949-443-6337. The Safety Element adds that most of the creeks have not been channelized with concrete and that the city has FEMA zones A, AO and AE but none beginning with V.",
      sourceUrl:
        "https://sanjuancapistrano.org/285/FEMA---Floodplain-Management-Information",
      sourceLabel: "City of San Juan Capistrano, FEMA floodplain management information",
    },
    {
      text: "There are no dams inside the city, but the Safety Element says it lies in the inundation path of three: Trampas Canyon Dam, Lake Mission Viejo Dam and Upper Oso Reservoir. Trampas Canyon sits 2 miles east of the city limits on a tributary of San Juan Creek and has been converted to a recycled water reservoir with a capacity of 1.6 billion gallons. The element calls a catastrophic failure unlikely. Tsunami is not on the list: the city's emergency preparedness page says San Juan Capistrano is not in a tsunami inundation area.",
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
        "Price per square by material, in a city whose re-roof handout requires a Class A covering once half or more of a roof is redone within a year.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair still makes sense, on water the district measured at an average of 12 grains per gallon in 2025.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "What to watch for in a city where about 36 percent of the homes date from the 1970s and the original plumbing is near 50 years old.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month, including brush clearance before fire season and the drain and slope checks a hillside or creekside lot needs before winter storms.",
    },
  ],

  neighbors: ["dana-point", "laguna-niguel", "mission-viejo", "san-clemente"],

  faq: [
    {
      q: "Is San Juan Capistrano's water hard?",
      a: "Yes, on average. Santa Margarita Water District's report for 2025 shows hardness in the city's distribution system averaging 210 ppm, or 12 grains per gallon, with a range of 89 to 290 ppm. The imported sources run harder, 236 ppm for Metropolitan water and 293 ppm for Baker plant water, while the local groundwater plant's treated water averaged only 2.9 ppm, so your tap depends on the blend. Flush a tank water heater once a year and descale a tankless unit on the manufacturer's schedule.",
    },
    {
      q: "Who provides water and fire service in San Juan Capistrano?",
      a: "Neither is a city department. Santa Margarita Water District has owned and operated the water and sewer system since it acquired it from the city in November 2021, and South Coast Water District says its service area also includes areas of the city, so the name on your bill is the reliable answer. Fire and emergency medical service comes from the Orange County Fire Authority, whose Station 7 is at Del Obispo and Forster Lane.",
    },
    {
      q: "Do I need a permit to replace a water heater or a roof in San Juan Capistrano?",
      a: "Yes to both, going by the city's own handouts. The Building Division's tank water heater handout says all water heater installations and replacements require a permit and a final inspection, and it calls for two seismic straps. Its re-roof handout says planning approval and a building permit are required, asks for a pre-roofing inspection before the deck is covered, and requires a Class A roof covering when 50 percent or more of the roof is redone within a year. Both handouts still cite older code editions, so confirm details at 949-443-6347.",
    },
    {
      q: "Can I apply for a San Juan Capistrano building permit online?",
      a: "Not for a remodel. The city says City Hall is open by appointment only and that residential remodels and tenant improvements must be submitted in person as hard copy plans, with a completed building permit application needed to book the appointment. Only new construction is submitted electronically, and nothing is accepted by mail. The eTRAKiT portal is for checking status afterward. The city's target for a first building review is 12 working days.",
    },
    {
      q: "Is my house in a fire hazard severity zone?",
      a: "It may be, even if it was not before 2025. The city's July 15, 2025 agenda report says the State Fire Marshal's new map put 2,636 acres of the city in the Very High zone, up from 401, plus 2,658 acres in High and 727 in Moderate. The city posts the State Fire Marshal's map as a PDF. In a Very High zone you must keep at least 100 feet of defensible space, and the zone has to be disclosed when the house is sold.",
    },
  ],

  updated: "2026-09-20",
};
