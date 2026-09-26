import type { CityContent } from "./types";

// Westminster. Researched 2026-09-19 for the second city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: who runs what. The city
// pumps its own water (all of it groundwater in the most recent report), but
// sewer and trash belong to the Midway City Sanitary District, which also
// runs a financial assistance program for replacing a failed sewer lateral.
// Add the flood control channels the county is still studying and this is a
// page that could not be written about the city next door.
//
// WATER NUMBERS are from the city's 2025 water quality report (2024 testing),
// read from the copy on the State Water Board's report portal. That report
// has a hardness row for groundwater only.
//
// THE CITY WEBSITE BLOCKS AUTOMATED READS. The Building Division page was
// read through an archived copy from March 2025, and the permit portal address
// came from the archived redirect on the city's Westminster Build page. We
// could not read any page describing how water heater, HVAC, reroof or panel
// permits are handled, so the permits section says so instead of guessing.
//
// FIRE SERVICE (added 2026-09-20). The city's fire page was read through a
// reader proxy because the site blocks direct reads, and Westminster was
// confirmed on the Orange County Fire Authority's member cities list.
//
// LEFT OUT ON PURPOSE. Rainfall (the only figure came from a defunct weather
// site by way of Wikipedia), a liquefaction statement (no Westminster document
// was readable), any fire hazard zone claim, Prado Dam, the Indian Village
// neighborhood (only social media sources), and four names that appear on one
// property management blog and nowhere else.

export const westminster: CityContent = {
  name: "Westminster",
  slug: "westminster",
  intro:
    "Westminster began in 1870 as a Presbyterian temperance colony and did not incorporate until 1957, and its housing is mostly what went up around that incorporation: about three quarters of its homes predate 1980, with a median build year of 1970. What sets it apart for a homeowner is the split in who runs what. The city pumps its own water, all of it groundwater in the most recent report, while sewer and trash belong to a separate agency, the Midway City Sanitary District.",
  metaDescription:
    "Westminster's median home dates to 1970. City well water, a separate sanitary district for sewer lines, flood channels and permits, with sources.",
  metaTitle: "Westminster: city well water and a sewer district",

  population: {
    value: "About 89,547 people",
    asOf: "ACS 2024 one-year estimate, table B01003; the 2020 Census counted 90,911",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0684550",
  },

  homes: {
    exposure: "near-coastal",
    medianYearBuilt: "1970",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0684550",
      sourceLabel: "Census Reporter, ACS 2024 one-year table B25035",
    },
    facts: [
      {
        text: "Westminster's median year built is 1970. Of about 28,953 housing units, roughly 16.5 percent went up in the 1950s, 29.6 percent in the 1960s and 24.5 percent in the 1970s, so about three quarters of the city predates 1980, and only about 12.2 percent dates from 2000 or later. Homes of that age are typically on their second or third roof and at or past the point where original panels, drain lines and supply plumbing need a hard look.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0684550",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "Westminster was founded in 1870 by the Rev. Lemuel Webber as a Presbyterian temperance colony and incorporated in 1957. It is bordered by Seal Beach on the west, Garden Grove on the north and east, and Huntington Beach and Fountain Valley on the south, which puts it a few miles back from the sand rather than on it.",
        sourceUrl: "https://en.wikipedia.org/wiki/Westminster,_California",
        sourceLabel: "Wikipedia, Westminster history and geography",
      },
      {
        text: "Sewer and trash service in Westminster do not come from the city. The Midway City Sanitary District, which describes itself as serving Westminster and Midway City since 1939, provides wastewater and solid waste service. A sewer problem at the street is a call to the district rather than to City Hall.",
        sourceUrl: "https://www.midwaycitysanitaryca.gov/",
        sourceLabel: "Midway City Sanitary District",
      },
      {
        text: "The line from your house to the district's main is yours. The district's ordinance says house connections and street laterals shall be maintained by the owner of the property they serve. The district also publishes a policy for financial assistance to replace sewer laterals at single-family residences, with an application on its site, which is worth reading before paying for a replacement on a 1960s lot.",
        sourceUrl: "https://www.midwaycitysanitaryca.gov/sewer-service-laterals",
        sourceLabel: "Midway City Sanitary District, sewer service laterals",
      },
      {
        text: "The city's report says that on average 85 percent of Westminster's drinking water comes from its own groundwater wells and 15 percent is imported, but that in 2024 the city pumped 100 percent groundwater. Basin groundwater is mineral-rich, so the practical result is scale: in tank water heaters, on shower glass, in dishwasher and ice maker lines.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010064&Year=2025&isCert=false",
        sourceLabel: "City of Westminster 2025 water quality report",
      },
      {
        text: "Fire service in Westminster comes from a regional agency rather than a city department. The city's fire page says the Orange County Fire Authority, a joint powers authority that provides fire service to 23 cities and all unincorporated areas in the county, has served Westminster since 1995. The page lists three stations in the city: Station 64 at 7351 Westminster Boulevard, Station 65 at 6061 Hefley Street and Station 66 at 15061 Moran Street.",
        sourceUrl: "https://www.westminster-ca.gov/departments/fire",
        sourceLabel: "City of Westminster, OCFA fire service in Westminster",
      },
    ],
  },

  neighborhoods: {
    names: ["Little Saigon", "Civic Center", "Westminster Mall area"],
    note: "Little Saigon is the name that matters most here. Before 1988 the area was known simply as Bolsa, after Bolsa Avenue; the Los Angeles Times first used the name Little Saigon in 1984, and the Little Saigon Tourist Commercial District is defined by Westminster Boulevard, Bolsa Avenue, Magnolia Street and Euclid Street, though the community now extends well into Garden Grove and beyond. The Civic Center sits next to Sid Goldstein Freedom Park, home of the Vietnam War Memorial. Westminster Mall, south of the 405 between Goldenwest and Edwards streets, closed in October 2025. Midway City is not a Westminster neighborhood: it is an unincorporated community that the city borders, and it refused to join when Westminster incorporated in 1957. We left out several names that appear on a single property management blog and nowhere else.",
    sourceUrl: "https://en.wikipedia.org/wiki/Little_Saigon,_Orange_County",
  },

  water: {
    utility: "City of Westminster Water Division",
    utilityUrl:
      "https://www.westminster-ca.gov/departments/public-works/water-division/water-quality-and-pressure/water-quality-report",
    summary:
      "Westminster runs its own water system from groundwater wells in the Orange County basin plus three connections for imported water. In the city's 2025 report, which covers 2024 testing, groundwater hardness averaged 243 ppm, about 14 grains per gallon, with a range of 134 to 363 ppm. The report has no separate hardness row for imported water, and none was needed that year, because the city pumped only groundwater. That is hard water, and the range is wide enough that two addresses can have noticeably different scale.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010064&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Westminster Building Division",
    portalUrl:
      "https://energovweb.westminster-ca.gov/energovprod/selfservice#/home",
    summary:
      "The Building Division is part of Community Development and describes its job as issuing building permits and business licenses and helping applicants through the process. The city's Westminster Build page sends applicants to an online self-service portal for permits. We have to be straight about a limit here: the city's website blocks automated reads, so we could not check how Westminster handles a water heater, HVAC, reroof or panel permit, whether over the counter or online. Treat each of those as permit work, which it is everywhere in California, and ask the division which track yours takes before work starts.",
    sourceUrl:
      "https://www.westminster-ca.gov/departments/community-development/building-division",
  },

  hazards: [
    {
      text: "Flood control is an unfinished project here. The county and the Army Corps of Engineers are studying the Westminster watershed, where the East Garden Grove-Wintersburg Channel drains toward Outer Bolsa Bay and the Bolsa Chica Channel, with its Anaheim-Barber City and Westminster Channel tributaries, drains to Huntington Harbour. The county says that because of local flood risks more than 20,000 property owners across the watershed's cities must carry National Flood Insurance Program coverage. Look up your own parcel on FEMA's map.",
      sourceUrl:
        "https://pwip.oc.gov/service-areas/oc-infrastructure-programs/projects-and-studies/westminster-watershed-feasibility",
      sourceLabel: "OC Public Works, Westminster watershed study",
    },
    {
      text: "We could not confirm from any official source whether the state's 2025 fire hazard maps place any part of Westminster in a zone, so this page does not say. The city is flat and built out, but the honest answer is the state's Fire Hazard Severity Zone viewer, which responds by address and takes about a minute.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
  ],

  guides: [
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "How to spot one early in a 1960s slab-foundation home, before the water bill does it for you.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "Typical range, and the signs an original panel is not keeping up with a modern household.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Price range and when a repair still makes sense, on all-groundwater supply that averages about 14 grains per gallon.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including what to clear before the winter storms reach the channels.",
    },
  ],

  neighbors: [
    "garden-grove",
    "huntington-beach",
    "fountain-valley",
    "midway-city",
  ],

  faq: [
    {
      q: "Who do I call about a sewer problem in Westminster?",
      a: "The Midway City Sanitary District, not the city. The district provides wastewater and solid waste service for Westminster. If the problem is in the line between your house and the district's main, though, that line is yours: the district's ordinance says house connections and street laterals are maintained by the property owner. Check the district's financial assistance policy for lateral replacement at single-family homes before you pay for the work.",
    },
    {
      q: "Is Westminster's water hard?",
      a: "Yes. The city's most recent report shows groundwater hardness averaging about 14 grains per gallon with a wide range, and says the city pumped only groundwater that year. Scale in the water heater, on fixtures and in appliance lines is normal maintenance rather than a sign of a problem. If you are sizing a softener, read the city's current report for the figure rather than a third-party estimate.",
    },
    {
      q: "Do I need a permit to replace a water heater in Westminster?",
      a: "Plan on yes. Water heater replacement is permit work essentially everywhere in California, and Westminster's Building Division issues building permits through an online self-service portal. We could not read the city's own page on how that specific permit is handled, so we are not going to describe a process we have not seen. A licensed plumber normally pulls the permit as part of the job, and the division can confirm the track.",
    },
    {
      q: "Is my Westminster home in a flood zone?",
      a: "It could be, and the way to know is FEMA's map for your address. Orange County Public Works says flood risk in the Westminster watershed is serious enough that many thousands of property owners across its cities must carry federal flood insurance, and the county and the Army Corps of Engineers are still studying improvements to the channels. A flood zone affects insurance and what a remodel or addition has to account for.",
    },
    {
      q: "Is Midway City part of Westminster?",
      a: "No. Midway City is an unincorporated community that Westminster borders, and it refused to join when the city incorporated in 1957. The two share the sanitary district for sewer and trash, but building permits for a Midway City address go through the county rather than Westminster's Building Division.",
    },
    {
      q: "Who provides fire service in Westminster?",
      a: "The Orange County Fire Authority. The city's fire page says the authority has served Westminster since 1995 and lists three stations in the city, Station 64 on Westminster Boulevard, Station 65 on Hefley Street and Station 66 on Moran Street. The authority is a joint powers agency that the city's page says serves 23 cities and all unincorporated areas of the county.",
    },
  ],

  updated: "2026-09-20",
};
