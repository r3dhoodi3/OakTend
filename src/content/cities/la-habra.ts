import type { CityContent } from "./types";

// La Habra. Researched 2026-09-20 for the third city wave. Every number below
// was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: an Orange County city
// whose basics come from across the county line. The city's own pages say fire
// service is the Los Angeles County Fire Department under contract (never cite
// the Orange County Fire Authority here), and its 2025 Urban Water Management
// Plan says about 73 percent of supply is Main San Gabriel Basin groundwater
// bought from California Domestic Water Company. Add a 1968 median build year,
// the 2014 earthquake the city's hazard plan names after the town, and a 2025
// fire hazard map with a zoned band along the southern hills.
//
// WATER NUMBERS are from the report the city lists as its 2026 Water Quality
// Report (reporting year 2025), page 8, table "2025 City of La Habra
// Groundwater and Imported MWD Drinking Water Quality". The text layer was
// checked against the rendered page image. The report gives one "range of
// detections" column for all sources, so the range is not pinned to a source.
//
// FIRE ZONE GEOGRAPHY. The city's fire hazard page names no streets. The
// description of where the zones sit was read off the city's copy of the State
// Fire Marshal's map (rendered image), and is kept to edges and corners.
//
// LEFT OUT ON PURPOSE. The Hass avocado mother tree: the historical marker
// record places it on West Road in La Habra Heights, a separate city, so it is
// not a La Habra fact. Annual rainfall (aggregators gave 8 and 12 inches and no
// official figure turned up). The 2020 Census count (census.gov would not open).
// The hazard plan's own date and depth for the 2014 earthquake, which disagree
// with the USGS catalog; the USGS date is used. Liquefaction, landslide and
// fault-zone claims (the hazard plan defines them but maps none inside the
// city). Las Lomas and the Cervetto, Fairfield, Lambert/Idaho and Voit plan
// names (not confirmed as names residents use).

export const laHabra: CityContent = {
  name: "La Habra",
  slug: "la-habra",
  intro:
    "La Habra sits in Orange County, but its fire engines belong to the Los Angeles County Fire Department, which the city hires under contract, and about 73 percent of its water in fiscal 2024-25 was groundwater from the Main San Gabriel Basin, bought from California Domestic Water Company. The homes are mostly one postwar wave: the median build year is 1968 and about 71 percent of housing units went up between 1950 and 1979. The state's 2025 fire hazard map also draws a band of Very High, High and Moderate zones along the city's southern edge, the side of town where a city planning document describes the hills as part of the West Coyote Hills oil field.",
  metaDescription:
    "La Habra's median home dates to 1968. Los Angeles County fire service, hard San Gabriel basin water, online permits and the 2025 fire zone map.",
  metaTitle: "La Habra homes: LA County fire, San Gabriel water",

  population: {
    value: "About 61,970 people",
    asOf: "ACS 2020-2024 five-year estimate, table B01003; the city's own history page says nearly 62,000",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0639290",
    sourceLabel: "Census Reporter, ACS 2024 five-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1968",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639290",
      sourceLabel: "Census Reporter, ACS 2024 five-year table B25035",
    },
    facts: [
      {
        text: "La Habra's median year built is 1968. Of about 21,225 housing units, roughly 28.3 percent went up in the 1950s, 19.3 percent in the 1960s and 23.2 percent in the 1970s, which puts about 71 percent of the city's homes in one thirty-year stretch. Only about 5.8 percent predate 1950 and about 7.7 percent date from 2000 or later. Roughly three in four homes here predate 1980, the age where original panels, supply plumbing and sewer lines come due together.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639290",
        sourceLabel: "Census Reporter, ACS 2024 five-year tables B25034 and B25035",
      },
      {
        text: "The city's own history explains the pattern. La Habra was founded in 1896 around a post office in a corner store, incorporated on January 20, 1925 with a population of 3,000, and had reached only nearly 5,000 by 1950, so almost everything standing today came after that. Before the tracts it was farm and oil country: the city says water lines from the San Gabriel River area let walnuts, citrus and avocados flourish, that Standard Oil established the Coyote Hills District in 1912, and that by 1928 La Habra was the largest avocado center in Southern California. The avocado is still the official city tree.",
        sourceUrl: "https://www.lahabraca.gov/531/History",
        sourceLabel: "City of La Habra, history",
      },
      {
        text: "Most of what comes out of a La Habra tap is purchased groundwater. The city's 2025 Urban Water Management Plan says that in fiscal 2024-25 about 73 percent of supply was groundwater from the Main San Gabriel Basin bought from California Domestic Water Company, 22 percent came from the city's own two wells in the La Habra Basin, the Idaho Street Well and the Portola Well, and 5 percent was imported water. The tie is an old one: the plan says the La Habra Water Company, incorporated in October 1902, originally owned 50 percent of California Domestic's stock.",
        sourceUrl:
          "https://www.lahabraca.gov/1116/Urban-Water-Management-Plan",
        sourceLabel: "City of La Habra, 2025 Urban Water Management Plan",
      },
      {
        text: "Heat is the everyday weather hazard. The city's 2019 Hazard Mitigation Plan describes the climate as semi-arid, with average temperatures from the high 80s in summer to the high 40s in winter, and ranks extreme heat second among the hazards it scores, as a frequent event that occurs more than once a year. The plan also notes that La Habra has had several area-wide power outages, typically blackouts due to extreme heat. For a house that points at air conditioning that is sized and serviced before summer, attic ventilation and insulation.",
        sourceUrl:
          "https://www.lahabraca.gov/DocumentCenter/View/13447/La-Habra-HMP-2019",
        sourceLabel: "City of La Habra, 2019 Hazard Mitigation Plan",
      },
      {
        text: "The city's permit process page spells out where the line falls. It lists additions, demolitions, new interior walls, new plumbing lines and fixtures, new electrical wiring or lighting fixtures, and replacing or installing HVAC equipment among the projects that require a building permit, and it lists carpeting, non-structural flooring, painting and wallpapering as finish work that does not. Structural work needs plans and calculations, and the page says the first plan review takes about two weeks.",
        sourceUrl: "https://www.lahabraca.gov/217/Permit-Process",
        sourceLabel: "City of La Habra Building and Safety, permit process",
      },
    ],
  },

  neighborhoods: {
    names: ["La Habra Boulevard", "La Habra Hills", "Westridge"],
    note: "La Habra Boulevard, formerly Central Avenue, is what the city calls its historical main corridor: it was already there when the city incorporated in 1925 and served as the central business district for over forty years, and it has had its own specific plan since 1988. La Habra Hills is the hillside area at the south end of town, south of Imperial Highway and east of Beach Boulevard, laid out under a city specific plan dated 1992 that covers about 380 acres planned around a golf course. Westridge is a name the city itself uses: one of its parks is listed as Vista del Valle (Westridge) Park, on Risner Way. The list is short on purpose. The city's specific plan list also names Cervetto, Euclid Street, Fairfield, Lambert/Idaho and Voit, but we could not confirm those as names residents use.",
    sourceUrl: "https://www.lahabraca.gov/318/Specific-Plans",
  },

  water: {
    utility: "City of La Habra Water Division",
    utilityUrl: "https://www.lahabraca.gov/198/Water-Sewer-Division",
    summary:
      "The City of La Habra Water Division is the retail supplier. Its current water quality report, covering 2025 testing, describes the tap water as a blend of three sources: groundwater bought from California Domestic Water Company, which the report says originates in the Main San Gabriel Groundwater Basin, two city wells that draw from the La Habra Groundwater Basin, and treated surface water imported by the Metropolitan Water District. The report lists hardness for each source separately, and they are not averaged here. The city wells averaged 275 ppm, about 16 grains per gallon. California Domestic water, which the city's water management plan says was about 73 percent of supply in fiscal 2024-25, averaged 225 ppm, about 13 grains per gallon. Metropolitan water averaged 236 ppm, about 14 grains per gallon. The report gives one range of detections across the sources, 191 to 280 ppm. All three figures are in the hard range, so scale in water heaters, on shower glass and in fixtures is a routine maintenance item here. The report does not publish a single blended figure for the tap.",
    sourceUrl: "https://www.lahabraca.gov/DocumentCenter/View/16156",
  },

  permits: {
    office: "City of La Habra Building and Safety Division",
    portalUrl:
      "https://cityoflahabraca-energovweb.tylerhost.net/apps/selfservice#/home",
    summary:
      "La Habra runs permits through one online portal. The Building and Safety Division says all plan submittals and permit applications can be applied for through the city's Customer Self Service portal, where you register first, and that staff take one to three business days to review an application for completeness before emailing payment instructions or a request for more information. A project that needs plan review is submitted as one PDF of the full plan set with the other construction documents as separate PDFs. Walk-ins for questions, over the counter permits and pickup of approved online permits are welcome during counter hours, Monday through Thursday, 7:30 a.m. to 1:00 p.m., at 110 East La Habra Boulevard. The division's page lists 562-383-4116 as its phone number.",
    sourceUrl: "https://www.lahabraca.gov/205/Building-Safety",
  },

  hazards: [
    {
      text: "Fire and paramedic service here comes from Los Angeles County, not from an Orange County agency or a city department. The city states that it contracts with the Los Angeles County Fire Department for fire suppression and emergency medical services, and that the department operates from four fire stations, which the city lists as Stations 191, 192, 193 and 194.",
      sourceUrl: "https://www.lahabraca.gov/223/Fire-Stations-in-La-Habra",
      sourceLabel: "City of La Habra, fire stations in La Habra",
    },
    {
      text: "That contract reaches into permits. The city's Fire Department plan review page says certain construction projects need plan review and inspections by the Los Angeles County Fire Department, and the one most likely to touch a house is a photovoltaic system that covers 50 percent or more of the roof. Improvements to buildings equipped with fire sprinklers are on the same list, so ask your solar or remodel contractor whether the job needs that review before the schedule is set.",
      sourceUrl: "https://www.lahabraca.gov/225/Fire-Department-Plan-Review",
      sourceLabel: "City of La Habra, Fire Department plan review",
    },
    {
      text: "La Habra is on the state's 2025 Fire Hazard Severity Zone maps. The city's page warns that some homes not previously in a designated high fire risk zone may now be included, and says the city will adopt an ordinance to formally designate its Very High zones. The city's copy of the State Fire Marshal's map, dated March 24, 2025, shows a band of Very High, High and Moderate zones along the southern edge of the city where it meets Fullerton, and a smaller pocket at the northeast corner by the county line, with the rest of the city unzoned. The zone is set by parcel, so check your address on the interactive map linked from the city's page.",
      sourceUrl:
        "https://www.lahabraca.gov/1568/Fire-Hazard-Severity-Zone-maps",
      sourceLabel: "City of La Habra, Fire Hazard Severity Zone maps",
    },
    {
      text: "The city's 2019 Hazard Mitigation Plan, written before the 2025 maps, says the city is most susceptible to wildfires where it borders La Habra Heights on its northeast side, and that because La Habra is mainly urban terrain the expected type of fire is an urban fire. It notes that Santa Ana winds blow hot, dry air from the deserts toward the coast and make regional fires much harder to contain. The one local fire the plan describes, a two-acre fire on July 4, 2017 suspected to have been started by illegal fireworks, burned in the La Habra Heights area rather than inside La Habra.",
      sourceUrl:
        "https://www.lahabraca.gov/DocumentCenter/View/13447/La-Habra-HMP-2019",
      sourceLabel: "City of La Habra, 2019 Hazard Mitigation Plan",
    },
    {
      text: "The town has an earthquake named after it. The USGS catalog records a magnitude 5.1 earthquake on the evening of March 28, 2014, centered about 2 kilometers northwest of Brea, the city next door to the east. It is a useful reminder to strap the water heater, check that an older house is bolted to its foundation and know where the gas shutoff is.",
      sourceUrl: "https://earthquake.usgs.gov/earthquakes/eventpage/ci15481673",
      sourceLabel: "USGS, M 5.1 earthquake of March 2014 near Brea",
    },
    {
      text: "Earthquake is the single hazard the city's 2019 Hazard Mitigation Plan ranks High, ahead of extreme heat and wildfire. The plan calls the 2014 event the La Habra Earthquake, puts its epicenter about one mile east of the city and says there was no major damage in the city. Its larger concern is the Whittier Fault, which it describes as running along the Chino Hills range between Chino Hills and Whittier, with probable magnitudes of 6.0 to 7.2, and which it calls long overdue.",
      sourceUrl:
        "https://www.lahabraca.gov/DocumentCenter/View/13447/La-Habra-HMP-2019",
      sourceLabel: "City of La Habra, 2019 Hazard Mitigation Plan",
    },
    {
      text: "Flood ranks at the bottom of the city's hazard list. The 2019 Hazard Mitigation Plan says the city is not prone to urban flooding, that FEMA's flood insurance rate maps dated October 2017 place the city in Zone X, and that no properties were identified as having repetitive flood losses. Flood zones are still drawn parcel by parcel, so a lot beside a creek or channel is worth looking up on FEMA's map before buying or insuring.",
      sourceUrl:
        "https://www.lahabraca.gov/DocumentCenter/View/13447/La-Habra-HMP-2019",
      sourceLabel: "City of La Habra, 2019 Hazard Mitigation Plan",
    },
    {
      text: "The southern hills were an oil field before they were a neighborhood. The La Habra Hills Specific Plan the city publishes, dated March 1992, says its roughly 380 acres are part of the 915-acre West Coyote Hills Field, that the property was then in oil production, and that the plan transitions it from oil production to a master planned residential community. If you own there and plan a pool, an addition or deep footings, look the lot up on the state's oil and gas well map first and tell whoever engineers the work.",
      sourceUrl: "https://www.lahabraca.gov/DocumentCenter/View/182",
      sourceLabel: "City of La Habra, La Habra Hills Specific Plan",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "Typical range, and the signs that a panel from the 1950s or 1960s, when nearly half of La Habra's homes were built, is not carrying a modern household.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Price range and when a repair still makes sense, on supplies the city reports at about 13 to 16 grains per gallon.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs, in a city whose hazard plan ranks extreme heat second and whose permit page lists HVAC replacement as permit work.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including getting the air conditioning serviced before the summer heat the city's hazard plan ranks second.",
    },
  ],

  neighbors: ["fullerton", "brea"],

  faq: [
    {
      q: "Who provides fire service in La Habra?",
      a: "The Los Angeles County Fire Department, under contract. The city's own page says it contracts with that department for fire suppression and emergency medical services, and that the department operates from four fire stations, listed as Stations 191 through 194. La Habra is in Orange County, but it is not served by the Orange County Fire Authority and does not run a city fire department.",
    },
    {
      q: "Is La Habra's water hard?",
      a: "Yes. The city's current water quality report, covering 2025 testing, lists each source separately: the city's two wells averaged 275 ppm, about 16 grains per gallon, water bought from California Domestic Water Company averaged 225 ppm, about 13 grains, and imported Metropolitan water averaged 236 ppm, about 14 grains. The city's water management plan says California Domestic water was about 73 percent of supply in fiscal 2024-25. The report gives no single blended number, so treat 13 to 16 grains as the bracket and flush a tank water heater yearly.",
    },
    {
      q: "Is my La Habra home in a fire hazard severity zone?",
      a: "Most of the city is not zoned, but some of it is, and the answer is set parcel by parcel. The city's copy of the state's March 2025 map shows Very High, High and Moderate zones along the southern edge of the city next to Fullerton and in a small pocket at the northeast corner. Use the interactive map linked from the city's Fire Hazard Severity Zone page to check your address. The city notes that state law requires a disclosure to buyers for property in a High or Very High zone, and defensible space compliance in a Very High zone.",
    },
    {
      q: "Do I need a permit to replace an air conditioner or furnace in La Habra?",
      a: "Yes. The city's permit process page lists replacing or installing HVAC equipment among the projects that require a building permit, along with new plumbing lines and fixtures and new electrical wiring. Applications go through the city's online Customer Self Service portal, and the Building and Safety Division says to allow one to three business days for staff to review an application for completeness. A licensed contractor normally pulls the permit as part of the job, so ask about it if a quote never mentions one.",
    },
    {
      q: "Is La Habra in a flood zone?",
      a: "Not in a high-risk one, according to the city. Its 2019 Hazard Mitigation Plan says La Habra is not prone to urban flooding, that FEMA's maps place the city in Zone X, and that no repetitive loss properties were identified; flood is tied for the lowest score on the plan's hazard ranking. Flood zones are still mapped parcel by parcel, so look up your own address on FEMA's Flood Map Service Center before you buy or insure.",
    },
    {
      q: "How serious is earthquake risk in La Habra?",
      a: "It is the hazard the city takes most seriously. The 2019 Hazard Mitigation Plan ranks earthquake as its only High hazard, and the USGS catalog records a magnitude 5.1 earthquake on March 28, 2014 centered about 2 kilometers northwest of Brea, which the city's plan calls the La Habra Earthquake and says caused no major damage in the city. The plan's bigger concern is the Whittier Fault, which it describes as long overdue. For an older house the practical steps are foundation bolting, a strapped water heater and a known gas shutoff.",
    },
  ],

  updated: "2026-09-20",
};
