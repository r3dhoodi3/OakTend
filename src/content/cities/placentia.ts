import type { CityContent } from "./types";

// Placentia. Researched 2026-09-20 for the third city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a small city that runs
// things its own way and sits on an old oil field. Placentia has its own fire
// department (the city's fire page says the first shift was July 1, 2020), two
// retail water suppliers with different hardness numbers, and a safety element
// that says oil wells and pipelines still operate inside city limits and that
// most of the city west of Rose Drive is in the Carbon Canyon Dam inundation
// area.
//
// FIRE START DATE. The 2019 safety element says the city "transitioned"
// beginning July 2019; the city's own fire department page says the department
// "began their first shift" on July 1, 2020. Only the fire page's sentence is
// used here, because it is the one that describes service actually starting.
// No "first city to leave" claim is made: neither city page says it.
//
// WATER NUMBERS. Golden State Water's figures are from its Placentia-Yorba
// Linda report on 2025 data (one source water table, not split into
// groundwater and imported). Yorba Linda Water District's figures are from its
// report with data collected in 2025, read from the State Water Board's report
// portal, the same copy and the same numbers yorba-linda.ts uses. The two
// suppliers are never averaged together.
//
// FIRE HAZARD ZONES. The safety element's "no high-fire danger zones" line
// predates the state's 2025 maps. The city's own 2025 page says Placentia was
// added to the maps and the council adopted them on June 17, 2025; the map PDF
// shows one small zoned wedge at the far northern tip and the rest unzoned.
//
// LEFT OUT ON PURPOSE. Annual rainfall and monthly temperatures (no official
// or US Climate Data page for Placentia turned up), any split of the city
// between the two water suppliers beyond the city's own words "a majority"
// and "a small portion", the count of refugees and ruined homes in the 1938
// flood (the only figures found were countywide and on Wikipedia), the 2020
// Census count (the city's history page and other republishers disagree), the
// city's area in square miles (the city page's figure is garbled), a water
// heater permit claim (the city's pages never name water heaters), and the
// Kraemer, Alta Vista and Bradford names as neighborhoods (they are streets
// and a golf course on the city's maps, nothing more).

export const placentia: CityContent = {
  name: "Placentia",
  slug: "placentia",
  intro:
    "Placentia had only about 5,000 residents in 1960 and nearly 25,000 by 1970, by the city's own count, and that burst still shows: about half of the housing units standing today were built in the 1960s and 1970s. It is also a city that does things its own way, with its own Placentia Fire and Life Safety Department, whose first shift was July 1, 2020, and two different water suppliers whose hardness numbers are not the same. The city's safety element adds what sits underneath: oil wells and pipelines still operate inside city limits, and the majority of the city, generally west of Rose Drive, is in the mapped inundation area for Carbon Canyon Dam.",
  metaDescription:
    "Placentia has its own fire department and two water suppliers. Hardness by provider, permits, oil wells, flood pockets and what 1960s-70s homes need.",
  metaTitle: "Placentia homes: two water suppliers and oil wells",

  population: {
    value: "About 52,826 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0657526",
    sourceLabel: "Census Reporter, ACS 2020-2024 five-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1976",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0657526",
      sourceLabel: "Census Reporter, ACS 2020-2024 five-year table B25035",
    },
    facts: [
      {
        text: "Placentia's median year built is 1976. Of about 17,890 housing units, roughly 25.3 percent went up in the 1960s and 24.8 percent in the 1970s, which together is half the city's housing. Another 13.0 percent date from the 1980s and 13.2 percent from the 1990s, about 9.5 percent predate 1960 and about 14.3 percent were built in 2000 or later. A house from the 1960s or 1970s is at the age where original supply plumbing, the electrical panel, windows and the second or third roof all come up together.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0657526",
        sourceLabel:
          "Census Reporter, ACS 2020-2024 five-year tables B25034 and B25035",
      },
      {
        text: "The city's own history explains the timing. It says Placentia earned a place on the map in 1910, when A.S. Bradford, Samuel Kraemer and others persuaded the Santa Fe Railroad to re-route its track through town for citrus shipments, and that the town's 500 citizens voted to incorporate on December 2, 1926. It stayed small for decades: the city says the population had reached only 5,000 in 1960 and then increased five-fold to nearly 25,000 by 1970.",
        sourceUrl: "https://placentia.org/1064/Historical-Resources",
        sourceLabel: "City of Placentia, historical resources",
      },
      {
        text: "Placentia runs its own fire department. The city's fire page says the Placentia Fire and Life Safety Department began its first shift on July 1, 2020, is made up of career firefighters, and works out of two stations: Station 1 at 110 South Bradford Avenue and Station 2 at 1530 North Valencia Avenue. For a homeowner the practical point is that fire inspection requests and fire plan submittals go to the city's own department, not to a county agency.",
        sourceUrl: "https://www.placentia.org/24/Fire",
        sourceLabel: "City of Placentia, Fire and Life Safety Department",
      },
      {
        text: "Heat and dry wind are the weather that wears on a house here. The city's safety element defines an extreme heat event in Placentia as a day above 99.8 degrees and, citing the California Heat Assessment Tool, forecasts approximately two heat waves a year lasting two to four days between 2020 and 2040. It also says Santa Ana winds pose a significant fire hazard to the city each year, typically from September to the first significant rain in December. Plan HVAC service before summer and check roof edges, fences and patio covers before fall.",
        sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
        sourceLabel: "City of Placentia General Plan, safety element",
      },
      {
        text: "A small portion of Placentia is served by Yorba Linda Water District instead of Golden State Water, and its water is harder. The district's report on 2025 testing shows its groundwater averaging 343 ppm of hardness, about 20 grains per gallon, with a range of 266 to 406 ppm, and its imported water averaging 236 ppm, about 14 grains per gallon, with a range of 191 to 280 ppm. The district says that on average 85 percent of what it serves is treated groundwater, and that hardness can shift during the year as sources change.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010037&Year=2025&isCert=false",
        sourceLabel: "Yorba Linda Water District, water quality report (2025 data)",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Old Town Placentia",
      "La Jolla",
      "Atwood",
      "Packing House District",
    ],
    note: "Old Town is the original downtown along Santa Fe Avenue and Bradford Avenue, where the city's safety element says construction is older and the structures are closer together; the city has a revitalization plan for it and refers to a Packing House District alongside it. La Jolla is the community in the southwest corner of the city, which the safety element names when it describes the flood zones. Atwood is the southeastern pocket south of Orangethorpe Avenue, roughly between Van Buren Street and Lakeview Avenue: it began as the separate town of Richfield, was annexed by Placentia in the early 1970s, and the safety element still lists the Atwood Channel among the city's storm drain channels. The list is short on purpose: other names in circulation here are street names, a golf course or real-estate labels rather than places the city itself describes.",
    sourceUrl: "https://en.wikipedia.org/wiki/Placentia,_California",
  },

  water: {
    utility: "Golden State Water Company and Yorba Linda Water District",
    utilityUrl: "https://www.gswater.com/placentia",
    summary:
      "Placentia has two retail water suppliers, and which one you have depends on your address. The city's new resident guide says Golden State Water Company is responsible for a majority of the city's residential water service and Yorba Linda Water District provides a small portion. Golden State Water says it has served the Placentia area since 1929, and that its Placentia-Yorba Linda system delivers a blend of treated groundwater from the Orange County Groundwater Basin and imported Metropolitan water from the Colorado River and the State Water Project. Its report on 2025 testing lists hardness in one source water table rather than by source: an average of 188 ppm, about 11 grains per gallon, with a range of 67.1 to 299 ppm, or 3.92 to 17.5 grains per gallon. Yorba Linda Water District's groundwater is harder, averaging 343 ppm, about 20 grains per gallon, in the same year. Both count as hard water, the wide Golden State range means the number at one tap can differ a lot from the average, and the two suppliers should not be averaged together: read the report from the company on your bill.",
    sourceUrl:
      "https://www.gswater.com/sites/main/files/file-attachments/water-quality-placentia-yorba-linda.pdf",
    sourceLabel:
      "Golden State Water Company, Placentia-Yorba Linda water quality report (2025 data)",
  },

  permits: {
    office: "City of Placentia Building and Safety Division",
    portalUrl: "https://ci-placentia-ca.smartgovcommunity.com/Public/Home",
    summary:
      "The Building and Safety Division is part of Development Services at City Hall, 401 E Chapman Avenue, and its page gives (714) 993-8124 as the number for the division. Note the schedule: the counter is open Monday through Thursday, 7:30 AM to 6:00 PM, and closed Friday through Sunday. Inspections are requested by phone for Monday through Thursday between 9:00 AM and 5:00 PM, the city does not schedule same day inspections, and a request left on voicemail is not confirmed until the division calls back. The city has an online SmartGov portal for submitting permits, looking up active and issued permits and paying fees, but its own page says the portal is in beta testing and asks applicants to contact Development Services before submitting anything through it.",
    sourceUrl: "https://www.placentia.org/58/Building-and-Safety",
  },

  hazards: [
    {
      text: "Oil is not just history here. The city's safety element says Placentia has numerous oil wells and pipelines operating within the city, regulated by its municipal code and by the state, and its well location map, which does not say which wells are still working, marks them clustered in the east and southeast, around Alta Vista Street, Rose Drive, Jefferson Street and the Orangethorpe Avenue and Richfield Road area, with another group in the north near Golden Avenue. It also warns that old pits and wells backfilled with undocumented fill may be subject to differential settlement, which shifts and damages structures. Before an addition, a pool or a purchase in those areas, look the parcel up on the state's oil and gas well map.",
      sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
      sourceLabel: "City of Placentia General Plan, safety element",
    },
    {
      text: "There are no Alquist-Priolo earthquake fault zones inside Placentia, but the safety element still rates seismic risk as high because of nearby faults, and it maps areas of high liquefaction potential using California Geological Survey data. On the city's exhibit those areas follow the drainage corridors down the middle of the city, from Imperial Highway past Palm Drive and Alta Vista Street, and cover a large block in the southeast around Orangethorpe Avenue and Richfield Road. The city says its building codes require structures in liquefaction areas to be designed for it, so expect a soils question on an addition there.",
      sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
      sourceLabel: "City of Placentia General Plan, safety element",
    },
    {
      text: "Most of Placentia is not in a flood hazard zone, the safety element says, but there are exceptions. Some areas on the east and south sides are in the 500-year flood zone, a small pocket of homes between Highway 57 and Orangethorpe Avenue is in the 100-year flood zone, and the La Jolla community in the southwest corner is in the 100-year zone with a portion in the 500-year zone. The city makes improving drainage a policy, with La Jolla first in line. Flood zones are set parcel by parcel, so check your address on FEMA's map before buying, insuring or remodeling there.",
      sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
      sourceLabel: "City of Placentia General Plan, safety element",
    },
    {
      text: "Two dams sit upstream. The safety element says a failure of Carbon Canyon Dam, an earth-filled Army Corps of Engineers flood control dam completed in 1961 about one mile north of the city, would affect the majority of Placentia generally west of Rose Drive and Tustin Avenue, with floodwater expected to follow the Carbon Canyon Creek Channel and possibly reach the 91 Freeway. A failure of Prado Dam, about 18 miles east, would affect the very southern portions of the city. The same document notes that Carbon Canyon Dam rarely contains threatening quantities of water, so read the inundation map as a what-if, not a forecast.",
      sourceUrl: "https://www.placentia.org/DocumentCenter/View/8402",
      sourceLabel: "City of Placentia General Plan, safety element",
    },
    {
      text: "The flood history is real. PBS SoCal's history of the Santa Ana River records that on March 3, 1938, after days of heavy rain, an eight-foot wall of water came out of Santa Ana Canyon and destroyed the communities of Atwood and La Jolla, killing 43. Prado Dam, which the city's safety element says was completed in 1941 to provide flood protection to the lower Santa Ana River basin, came after that flood, and both neighborhood names are still part of Placentia today.",
      sourceUrl:
        "https://www.pbssocal.org/shows/lost-la/the-santa-ana-river-how-it-shaped-orange-county",
      sourceLabel: "PBS SoCal, The Santa Ana River: How It Shaped Orange County",
    },
    {
      text: "Wildfire zoning is new here and very small. The city's 2019 safety element said there were no longer any high-fire danger zones in Placentia, but the city's fire hazard page says Placentia was added to the State Fire Marshal's 2025 Local Responsibility Area maps, and that the City Council adopted them by ordinance on June 17, 2025. The city's map shows the zoned land confined to a small wedge at the far northern tip of the city, north of Imperial Highway near Rose Drive, with the rest of Placentia unzoned. If you live up there, use the interactive map linked from the city's page to check your parcel.",
      sourceUrl:
        "https://www.placentia.org/1153/New-Local-Responsibility-Area-LRA-Fire-H",
      sourceLabel: "City of Placentia, 2025 fire hazard severity zone map",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Price range and when a repair still makes sense, on water that averages about 11 or about 20 grains per gallon depending on your supplier.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "How to catch one early, in a city where half the housing went up in the 1960s and 1970s.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs, for a city whose own safety element plans around heat waves above 99.8 degrees.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including what to do before the September to December Santa Ana wind season.",
    },
  ],

  neighbors: ["yorba-linda", "fullerton", "anaheim", "brea"],

  faq: [
    {
      q: "Who provides water to my Placentia home, and how hard is it?",
      a: "It depends on your address. The city says Golden State Water Company handles a majority of Placentia's residential water service and Yorba Linda Water District a small portion. Golden State Water's report on 2025 testing shows hardness averaging 188 ppm, about 11 grains per gallon, with a wide range of 67.1 to 299 ppm. Yorba Linda Water District's groundwater averaged 343 ppm, about 20 grains per gallon. Both are hard water, so check which company bills you and read that report.",
    },
    {
      q: "Does Placentia have its own fire department?",
      a: "Yes. The city's fire page says the Placentia Fire and Life Safety Department began its first shift on July 1, 2020, and that it provides 24-hour emergency response from two stations, at 110 South Bradford Avenue and 1530 North Valencia Avenue. Fire inspection requests go to the department by email, and the Building and Safety page has checklists showing which construction projects need fire department review.",
    },
    {
      q: "Is my Placentia home in a flood zone?",
      a: "Probably not, but a few areas are. The city's safety element says most of Placentia is outside any flood hazard zone, while a small pocket of homes between Highway 57 and Orangethorpe Avenue and the La Jolla community in the southwest corner are in the 100-year flood zone, and parts of the east and south sides are in the 500-year zone. Separately, the majority of the city west of Rose Drive is in the mapped Carbon Canyon Dam inundation area, which is about a dam failure rather than a storm. Look up your own address on FEMA's flood map for the answer that counts.",
    },
    {
      q: "Are there still oil wells in Placentia?",
      a: "Yes. The city's safety element says numerous oil wells and pipelines operate within the city today, and its well map marks wells concentrated in the east and southeast and in a smaller group near Golden Avenue in the north. For a homeowner the issue is less the working wells than the old ones: the city warns that pits and wells backfilled with undocumented fill can settle unevenly. Check the state's oil and gas well map for your parcel before an addition, a pool or a purchase.",
    },
    {
      q: "Is Placentia in a fire hazard severity zone?",
      a: "Almost none of it. The city's fire hazard page says Placentia was added to the State Fire Marshal's 2025 maps and that the council adopted them on June 17, 2025, but the city's map shows only a small wedge at the far northern tip, north of Imperial Highway, inside a zone. The rest of the city is unzoned, and the safety element calls structures, not wildland, the principal fire hazard here.",
    },
    {
      q: "How do I pull a building permit in Placentia?",
      a: "Start with the Building and Safety Division at City Hall, 401 E Chapman Avenue, which is open Monday through Thursday and closed Friday through Sunday. The city has an online SmartGov portal, but its own page says the portal is still in beta testing and asks applicants to contact Development Services first, at the (714) 993-8124 number printed on the division's page. A licensed contractor normally pulls the permit as part of the job, and inspections are booked by phone, never for the same day.",
    },
  ],

  updated: "2026-09-20",
};
