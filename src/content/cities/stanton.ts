import type { CityContent } from "./types";

// Stanton. Researched 2026-09-20 for the fourth city wave. Every number below
// was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: a city that incorporated
// twice. The city's own history page says 16 square miles were incorporated in
// May 1911 to block a sewage farm Anaheim proposed, that voters disincorporated
// in 1924 so the state could build roads, and that today's city dates from
// June 4, 1956. What got built afterward is a mix: the census file shows only
// about 27 percent detached houses and about 14 percent mobile homes, and the
// 2021-2029 Housing Element lists nine mobile home parks. The safety element
// puts the whole city in a liquefaction hazard zone, in FEMA flood zone X, and
// inside the Prado Dam and Carbon Canyon Dam inundation areas.
//
// FIRE SERVICE is the Orange County Fire Authority, confirmed on the city's
// About Stanton profile, the ocfa.org member city list and the Station 46
// entry on ocfa.org's station list.
//
// WATER NUMBERS are from Golden State Water Company's current West Orange
// County report (2025 sampling, published 2026), the same report cypress.ts
// cites, and the numbers match. It gives ONE system-wide hardness row.
//
// TWO ROOF RULES DISAGREE. The posted reroofing guide is stamped "Revised
// 1/20/05", cites the 2001 code and requires Class A with no wood roofing.
// Ordinance No. 1164, which adopted the 2025 codes, sets the floor at Class B.
// The page reports both and says to confirm with the Building Division.
//
// MOBILE HOME PERMITS. The state housing department (HCD) says it enforces in
// mobilehome parks unless a city has assumed that job. Stanton's pages say
// nothing either way and HCD's park search could not be read by script, so
// the page does not say which agency covers any Stanton park.
//
// LEFT OUT ON PURPOSE. "Largest city in Orange County by area" in 1911 (only
// the housing element says it, and it is an ordinal claim), the adoption date
// of Ordinance No. 1164 (signature pages are scans), the water company's PFAS
// detections and treatment project (the notice does not name the city the
// site is in), rainfall and temperature normals (no official table turned
// up), the current status of Tina-Pacific (the housing element is from June
// 2022), solar permit details, and any neighborhood name found only on
// real-estate pages.

export const stanton: CityContent = {
  name: "Stanton",
  slug: "stanton",
  intro:
    "Stanton has been a city twice: the city's own history says ranchers incorporated 16 square miles here in May 1911, with help from former Assembly Speaker Philip Stanton, to block a sewage farm that Anaheim proposed, then voted in 1924 to disincorporate so the state could build roads, and did not incorporate again until June 4, 1956. What stands today is 3.1 square miles of flat, built-out housing from the boom that followed, with a median build year of 1975 and the 1970s and the 1950s as the two biggest decades. It is not the usual tract-house picture either: only about 27 percent of the homes are detached houses, about 14 percent are mobile homes, and the rest are attached homes, fourplexes and apartments.",
  metaDescription:
    "Stanton incorporated twice, in 1911 and 1956. What 1950s and 1970s housing, mobile home parks, hard water and citywide liquefaction mean for upkeep.",
  metaTitle: "Stanton, CA homes: a city incorporated twice",

  population: {
    value: "About 39,402 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the city's own community profile lists 41,188 and its history page says more than 39,000",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0673962",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1975",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0673962",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Stanton's median year built is 1975. Of about 13,269 housing units, roughly 28.6 percent went up in the 1970s, 19.7 percent in the 1950s, 14.3 percent in the 1980s and 12.9 percent in the 1960s, while only about 4 percent predate 1950 and about 12.6 percent date from 2000 or later. About 61 percent of the homes were built between 1950 and 1979. At that age the second or third roof, original drain lines, the electrical panel and single-pane windows tend to come due close together.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0673962",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The city's history page explains why a place settled this early has so little early housing. The Pacific Electric Railway began running through the area in 1906, the community was known as Benedict before 1911, and the 16 square miles that Anaheim wanted for a sewage farm were incorporated in May 1911. Voters disincorporated on July 22, 1924 to allow the state to construct roads, and the city was officially incorporated again on June 4, 1956. The city's Housing Element adds that Stanton had a housing boom from the 1950s through the 1970s, mainly low density single-family homes and medium density triplexes and fourplexes.",
        sourceUrl: "https://www.stantonca.gov/community/history.php",
        sourceLabel: "City of Stanton, city history",
      },
      {
        text: "Detached houses are the minority here. The census file counts about 26.8 percent of Stanton's housing units as detached single-family homes, 14.1 percent as attached homes, 13.5 percent in buildings of two to four units, 31.3 percent in buildings of five or more units, and 14.2 percent, about 1,886 units, as mobile homes. Many owners here share a roof, a wall or a park with someone else, so check what the association or the park owner maintains before you price a repair.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25024&geo_ids=16000US0673962",
        sourceLabel: "Census Reporter, ACS 2024 5-year table B25024",
      },
      {
        text: "The city's 2021-2029 Housing Element, citing the state housing department's 2019 park listings, names nine mobile home parks in Stanton with a total of 1,301 permitted spaces, concentrated in the south part of the city, and calls the mobile home share high relative to the county's 3 percent. The state Department of Housing and Community Development says a permit is required before altering a mobilehome, and that it is the enforcement agency for mobilehome parks unless a city or county has assumed that job. Stanton's Building Division pages do not mention mobile homes, so look your park up in the state's park search to see which agency issues your permit.",
        sourceUrl:
          "https://www.stantonca.gov/City%20of%20Stanton%20Housing%20Element_Revised%20Adopted_6.27.pdf",
        sourceLabel: "City of Stanton, 2021-2029 Housing Element",
      },
      {
        text: "The same Housing Element is frank about condition. In the city's own survey, run from November 2020 through January 2021, 18.0 percent of respondents said their home needed a modest repair such as a new roof and 17.1 percent said it needed a major repair such as a new foundation, plumbing or electrical. The element describes a Homeowner Rehabilitation Program for roofing, windows, plumbing and electrical repairs, but states that the city no longer has an identified funding source for it. The city's housing page says to check back there for available loans or grants.",
        sourceUrl:
          "https://www.stantonca.gov/City%20of%20Stanton%20Housing%20Element_Revised%20Adopted_6.27.pdf",
        sourceLabel: "City of Stanton, 2021-2029 Housing Element",
      },
      {
        text: "The Building Division's posted reroofing guide says new roofing may not be applied without first obtaining a building permit, one permit per building, that a Class A roofing assembly is required and that wood roofing materials are not allowed regardless of class. It calls for a pre-roofing inspection and a final inspection, and says removed roofing must go to CR&R for recycling, with the receipt left with the job card or the permit will not be finaled. The guide is stamped as revised in January 2005, and the city's Ordinance No. 1164, which adopted the 2025 codes, sets the minimum at Class B, so confirm the current rule with the Building Division before you sign a roofing contract.",
        sourceUrl:
          "https://www.stantonca.gov/Document_center/Department/Community%20Development/Building%20Regulations/Informational%20Handouts%20and%20Forms/ReroofingInfo.pdf",
        sourceLabel: "City of Stanton Building Division, reroofing guide",
      },
      {
        text: "The city's water heater handout shows what the inspector looks for: seismic straps within the upper third and the lower third of the tank, with the lower strap at least 4 inches above the controls, a relief valve line piped to the outside and ending between 6 and 24 inches above the ground, and a gas burner at least 18 inches above a garage floor unless the heater is listed as flammable vapor ignition resistant. It also calls for an expansion tank on a closed system and a drain pan where a leak could do damage, such as an attic or upper floor. The handout quotes the 2019 plumbing code and the division's FAQ says the city now uses the 2025 codes, so treat it as a checklist, not the last word.",
        sourceUrl:
          "https://www.stantonca.gov/Document_center/Department/Community%20Development/Building%20Regulations/Informational%20Handouts%20and%20Forms/Water-Heater-Handout.pdf",
        sourceLabel: "City of Stanton Building Division, water heater handout",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Tina-Pacific",
      "Crow Village",
      "Little Mansions and Clover Park",
      "Santa Barbara",
      "Town Center",
    ],
    note: "Stanton is small and mostly unnamed tracts, so this list sticks to names the city's own planning documents use. The 2021-2029 Housing Element describes the Tina-Pacific neighborhood as 40 fourplex properties where the former redevelopment agency began a project in 2009 that the Stanton Housing Authority took over. It names the Little Mansions and Clover Park neighborhood, north of Chapman Avenue and west of Beach Boulevard, as a code enforcement target area, and lists Crow Village and the Santa Barbara neighborhood among areas with housing in need of major repair or substantial rehabilitation. Town Center is the general plan's mixed-use district close to the civic center, which now has its own Stanton Town Center Specific Plan. We did not find other neighborhood names in a city document, so none are listed.",
    sourceUrl:
      "https://www.stantonca.gov/City%20of%20Stanton%20Housing%20Element_Revised%20Adopted_6.27.pdf",
  },

  water: {
    utility: "Golden State Water Company, West Orange County system",
    utilityUrl: "https://www.gswater.com/los-alamitos",
    summary:
      "Stanton does not run its own water system. The city's new resident page lists Golden State Water for water service, and the company's own report describes it as a wholly owned subsidiary of American States Water Company, a publicly traded company, so this is not a city department. The company says it has served Los Alamitos and surrounding communities since 1929 and that it serves approximately 30,100 customers in Cypress, Los Alamitos, Stanton and portions of Garden Grove, La Palma, Rossmoor and Seal Beach. Its current report describes the water in the West Orange County system as a blend of treated groundwater pumped from the Orange County Groundwater Basin and imported Colorado River and State Water Project water delivered by the Metropolitan Water District. In 2025 sampling, hardness across the system averaged 237 ppm, or 13.8 grains per gallon, with a range of 62.9 to 369 ppm, or 3.67 to 21.6 grains per gallon. That average is very hard water, and the range is wide, so what reaches a given tap depends on which sources are feeding that part of the system. The report gives one system-wide row, and it also says the system has no lead or galvanized service lines that require replacement.",
    sourceUrl:
      "https://www.gswater.com/sites/main/files/file-attachments/water-quality-west-orange-county.pdf",
  },

  permits: {
    office: "City of Stanton Building Division",
    portalUrl: "https://stanton.cts.city/",
    summary:
      "The Building Division is part of Community and Economic Development at City Hall, 7800 Katella Avenue. Applications that need plan check go through the city's online Plan Check Center as PDF uploads, and the division's FAQ gives a 10 business day turnaround for most first reviews and 5 business days for a second review, counting Monday through Thursday. The counter is open Monday through Thursday, 7 a.m. to 6 p.m., closed for lunch from noon to 1 p.m., and City Hall is closed every Friday. Appointments are required when you need three or more permits issued, through the permit technician at 714-890-4286. Inspections run Monday through Thursday, 9 a.m. to 4 p.m., and must be scheduled at least 48 hours ahead at 714-890-4252. The division's page currently says online payments are temporarily not accepted and that a 2.6 percent fee applies to card payments. The fee schedule effective July 1, 2026 lists $236 for a water heater and $323 for a reroof of up to 1,500 square feet, before issuance and other add-on fees.",
    sourceUrl:
      "https://www.stantonca.gov/departments/community_development/building_regulations/index.php",
  },

  hazards: [
    {
      text: "The city's Community Health and Safety Element says the entire city of Stanton is located in a liquefaction hazard zone, citing the state's seismic hazard maps for the Los Alamitos, Anaheim and Newport Beach quadrangles. The ground is alluvium laid down by an ancestral Santa Ana River. The same element says there are no Alquist-Priolo Earthquake Fault Zones and no identified faults inside the city, so surface rupture is unlikely, but it lists the Newport-Inglewood, Whittier, Norwalk and Elysian Park faults nearby. For an older house, a strapped water heater, a bolted foundation and flexible gas connectors are the usual first steps.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton General Plan, Community Health and Safety Element",
    },
    {
      text: "According to the safety element, Stanton contains no natural, permanent water features, and FEMA places the entire city in flood zone X, which covers areas of 500-year flood, areas of 100-year flood with average depths under one foot, and areas protected by levees. The element's climate appendix adds that as a built-out, urbanized area Stanton is especially vulnerable to flooding because asphalt and concrete block rainwater from soaking in, and the findings in the city's Ordinance No. 1164 call Stanton flatlands where development needs special drainage precautions to prevent ponding. Keep yard drains, side-yard swales and gutters clear before the winter storms.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton General Plan, Community Health and Safety Element",
    },
    {
      text: "Stanton sits inside the dam inundation areas of both Prado Dam and Carbon Canyon Dam, according to the safety element. It says Prado Dam is about 23 miles northeast of the city on the Santa Ana River, and that Army Corps of Engineers inundation maps show a flood wave from a failure reaching Stanton in approximately 6.5 hours at approximately four feet deep. For Carbon Canyon Dam, about 12.5 miles to the northeast, the figures are approximately 7.5 hours and approximately one foot deep. This is a low-probability event, but it is a reason to register for Alert OC, the mass notification system the city's emergency preparedness page points residents to.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton General Plan, Community Health and Safety Element",
    },
    {
      text: "The climate vulnerability assessment attached to the safety element, dated November 2021, uses Cal-Adapt data to define an extreme heat day in Stanton as one above 97.2 degrees. It says the modeled 1961 to 1990 baseline averaged two such days a year, and that by mid-century the average is expected to reach seven days under a medium emissions scenario and nine under a high one. It also says the urban heat island effect is pronounced in a built-out city like Stanton. Attic insulation, shade on west-facing glass and a serviced air conditioner matter more here each decade.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton, Climate Vulnerability Assessment (safety element appendix A)",
    },
    {
      text: "Wildfire is not a mapped hazard in Stanton: the safety element says there are no CAL FIRE identified Fire Hazard Severity Zones or Very High Fire Hazard Severity Zones within the city, and the State Fire Marshal's 2025 local responsibility area data shows no zone inside the city limits either. Wind and structure fires are the local concern: the findings in the city's Ordinance No. 1164 describe a semi-arid climate with hot, dry Santa Ana winds that may reach 70 mph or greater, and the safety element names combustible roof coverings and high density wood frame apartments among the hard fire problems in an urban area.",
      sourceUrl:
        "https://www.stantonca.gov/Attach%20C%20Health%20Safety%20Element.pdf",
      sourceLabel: "City of Stanton General Plan, Community Health and Safety Element",
    },
  ],

  guides: [
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "What to watch for in older supply lines, in a city where about 61 percent of the homes were built between 1950 and 1979.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on water that averaged 13.8 grains per gallon in 2025 and with a $236 city permit line.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, in a city whose reroofing guide calls for a Class A assembly and does not allow wood roofing.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including clearing yard drains on a flat lot before winter and servicing the air conditioner before the heat.",
    },
  ],

  neighbors: ["anaheim", "garden-grove", "cypress"],

  faq: [
    {
      q: "Is Stanton's water hard?",
      a: "Yes. Golden State Water Company's current report for its West Orange County system, which serves Stanton, shows hardness averaging 237 ppm, or 13.8 grains per gallon, in 2025 sampling, with a range of 62.9 to 369 ppm. That average is very hard water. The report gives one system-wide figure, so there is no published number for Stanton alone. Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour.",
    },
    {
      q: "Who provides fire and police service in Stanton?",
      a: "Both are contract services. The city's community profile lists the Orange County Fire Authority for fire and the Orange County Sheriff's Department for police. The fire authority's station list shows Station 46 at 7871 Pacific Street in Stanton, established in 1956, with a daily staff of one captain, one engineer and three firefighters. The Sheriff's Department says it has provided law enforcement in Stanton since February 1988, when the city police department merged with it.",
    },
    {
      q: "Do I need a permit to replace a water heater in Stanton?",
      a: "The city's fee schedule effective July 1, 2026 has a plumbing permit line for water heaters at $236 before add-on fees, and the Building Division publishes a water heater handout showing what gets inspected: two seismic straps, a relief valve line piped to the outside, a burner at least 18 inches above a garage floor unless the unit is listed as vapor ignition resistant, and an expansion tank on a closed system. A licensed plumber normally pulls the permit as part of the job. Inspections need 48 hours notice at 714-890-4252.",
    },
    {
      q: "What does Stanton require for a reroof?",
      a: "The Building Division's reroofing guide says a building permit is required before new roofing goes on, with a pre-roofing inspection and a final inspection. It calls for a Class A roofing assembly, does not allow wood roofing, and wants the tear-off recycled through CR&R. The guide dates from 2005 and the city's 2025 code adoption ordinance sets a Class B minimum, so ask the division which applies. The current fee schedule lists $323 for a reroof of up to 1,500 square feet, before add-on fees.",
    },
    {
      q: "Is Stanton in a flood zone or a liquefaction zone?",
      a: "According to the city's safety element, the entire city is in FEMA flood zone X, which it defines as areas of 500-year flood, areas of 100-year flood with average depths under one foot, and areas protected by levees, and the entire city is also in a state-mapped liquefaction hazard zone. The element adds that Stanton is inside the Prado Dam and Carbon Canyon Dam inundation areas. It says there are no Alquist-Priolo fault zones in the city and no potential for landslides.",
    },
    {
      q: "Who issues permits for work on a mobile home in a Stanton park?",
      a: "Start with the state. The California Department of Housing and Community Development says a permit is required before altering a mobilehome, and that it is the enforcement agency for mobilehome parks unless a city or county has taken that role on. Stanton's Building Division pages do not address mobile homes, so use the state's online park search to see which agency covers your park.",
    },
  ],

  updated: "2026-09-20",
};
