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
// permits are handled, so an FAQ answer says so instead of guessing.
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
    "Westminster began in 1870 as a Presbyterian temperance colony, incorporated in 1957, and about three quarters of its homes predate 1980. The city pumps its own water, all of it groundwater in the latest report, while sewer and trash belong to a separate agency, the Midway City Sanitary District.",
  metaDescription:
    "Westminster's median home dates to 1970. City well water, a separate sanitary district that leaves sewer laterals to owners, flood channels and permits.",
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
        text: "Of about 28,953 housing units, roughly 16.5 percent went up in the 1950s, 29.6 percent in the 1960s and 24.5 percent in the 1970s, while only about 12.2 percent date from 2000 or later.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0684550",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "The Rev. Lemuel Webber founded Westminster in 1870 as a Presbyterian temperance colony. The city borders Seal Beach on the west, Garden Grove on the north and east, and Huntington Beach and Fountain Valley on the south.",
        sourceUrl: "https://en.wikipedia.org/wiki/Westminster,_California",
        sourceLabel: "Wikipedia, Westminster history and geography",
      },
      {
        text: "The Midway City Sanitary District, serving Westminster and Midway City since 1939, provides wastewater and solid waste service, so a sewer problem at the street goes to the district rather than City Hall.",
        sourceUrl: "https://www.midwaycitysanitaryca.gov/",
        sourceLabel: "Midway City Sanitary District",
      },
      {
        text: "The district's ordinance says house connections and street laterals are maintained by the owner of the property they serve. It also publishes a financial assistance policy for replacing laterals at single-family homes, with an application on its site.",
        sourceUrl: "https://www.midwaycitysanitaryca.gov/sewer-service-laterals",
        sourceLabel: "Midway City Sanitary District, sewer service laterals",
      },
      {
        text: "On average 85 percent of Westminster's drinking water comes from its own wells and 15 percent is imported, but in 2024 the city pumped 100 percent groundwater.",
        sourceUrl:
          "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010064&Year=2025&isCert=false",
        sourceLabel: "City of Westminster 2025 water quality report",
      },
      {
        text: "The Orange County Fire Authority has served Westminster since 1995 from three stations in the city: Station 64 at 7351 Westminster Boulevard, Station 65 at 6061 Hefley Street and Station 66 at 15061 Moran Street.",
        sourceUrl: "https://www.westminster-ca.gov/departments/fire",
        sourceLabel: "City of Westminster, OCFA fire service in Westminster",
      },
    ],
  },

  neighborhoods: {
    names: ["Little Saigon", "Civic Center", "Westminster Mall area"],
    note: "Before 1988 the Little Saigon area was known simply as Bolsa, after Bolsa Avenue; the Los Angeles Times first used the name Little Saigon in 1984. Its Tourist Commercial District is bounded by Westminster Boulevard, Bolsa Avenue, Magnolia Street and Euclid Street, though the community reaches well into Garden Grove. The Civic Center sits beside Sid Goldstein Freedom Park and its Vietnam War Memorial. Westminster Mall, south of the 405 between Goldenwest and Edwards streets, closed in October 2025.",
    sourceUrl: "https://en.wikipedia.org/wiki/Little_Saigon,_Orange_County",
  },

  water: {
    utility: "City of Westminster Water Division",
    utilityUrl:
      "https://www.westminster-ca.gov/departments/public-works/water-division/water-quality-and-pressure/water-quality-report",
    summary:
      "The city runs its own system from Orange County basin wells plus three connections for imported water. In 2024 testing, groundwater hardness averaged 243 ppm, about 14 grains per gallon, with a range of 134 to 363 ppm, wide enough that two addresses can see noticeably different scale.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010064&Year=2025&isCert=false",
  },

  permits: {
    office: "City of Westminster Building Division",
    portalUrl:
      "https://energovweb.westminster-ca.gov/energovprod/selfservice#/home",
    summary:
      "The Building Division, part of Community Development, issues building permits and business licenses, and the city's Westminster Build page sends applicants to an online self-service portal.",
    sourceUrl:
      "https://www.westminster-ca.gov/departments/community-development/building-division",
  },

  hazards: [
    {
      text: "The county and the Army Corps of Engineers are studying the Westminster watershed, where the East Garden Grove-Wintersburg Channel drains toward Outer Bolsa Bay and the Bolsa Chica Channel, with its Anaheim-Barber City and Westminster Channel tributaries, drains to Huntington Harbour. The county says more than 20,000 property owners across the watershed's cities must carry federal flood insurance.",
      sourceUrl:
        "https://pwip.oc.gov/service-areas/oc-infrastructure-programs/projects-and-studies/westminster-watershed-feasibility",
      sourceLabel: "OC Public Works, Westminster watershed study",
    },
    {
      text: "We could not confirm from an official source whether the state's 2025 fire hazard maps zone any part of Westminster. The State Fire Marshal's viewer answers by address.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
  ],

  guides: [
    {
      href: "/guides/sewer-line-orange-county",
      title: "Sewer line problems in Orange County",
      blurb:
        "The sanitary district leaves the lateral to the owner, on lots mostly built before 1980.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "Signs an original panel in a 1970-era Westminster home is falling behind.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "All-groundwater supply here averages about 14 grains per gallon.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Clear yard drains before winter storms fill the Wintersburg and Bolsa Chica channels.",
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
      q: "Is Midway City part of Westminster?",
      a: "No. Midway City is an unincorporated community that Westminster borders, and it refused to join when the city incorporated in 1957. The two share the sanitary district, but building permits for a Midway City address go through the county.",
    },
    {
      q: "How does Westminster handle water heater, reroof or panel permits?",
      a: "Plan on a permit for each, since they are permit work across California. The city's website blocks automated reads, so we could not check whether Westminster issues them over the counter or online; ask the Building Division before work starts.",
    },
  ],

  updated: "2026-09-20",
};
