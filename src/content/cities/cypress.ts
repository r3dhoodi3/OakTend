import type { CityContent } from "./types";

// Cypress. Researched 2026-09-20 for the third city wave. Every number below
// was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: Dairy City. The city's
// own history page says it incorporated under that name in 1956, renamed
// itself by a 208 to 41 straw vote in 1957, and once had about 1,000 residents
// and more than 13,000 cows. The tracts that replaced the dairies went up in
// two decades (about two in three homes date from the 1960s and 1970s), and
// the Los Alamitos Race Course, which sits inside Cypress, had its buildout
// plan approved by the City Council on August 25, 2026.
//
// WATER NUMBERS are from Golden State Water Company's current West Orange
// County report (2025 sampling, published 2026), downloaded from gswater.com
// and read as text. The report gives ONE system-wide hardness row, not
// separate groundwater and imported columns, so none are published here. The
// research file's defense.gov copy of the report was not used.
//
// THE GENERAL PLAN IS OLD. The safety and land use elements cited here were
// adopted in 2001 and the safety element's flood map source is a 1989
// FEMA map. The city says a safety element update is under way. The page says
// so wherever it leans on those documents.
//
// LEFT OUT ON PURPOSE. "Waterville" and the artesian wells (only Wikipedia
// says it; the city's history page says only "natural water sources"), any
// closing date for the race course (the city's page covers the approved
// buildout, not a closure), rainfall and temperature figures (no official or
// US Climate Data page for Cypress turned up), Fire Hazard Severity Zone
// status (not confirmed on a state or city page), Station 12 (the 2001 plan
// lists it, the fire authority's current station list does not), and which
// permit types can be finished online (the portal is a login app we could not
// read past its front page).

export const cypress: CityContent = {
  name: "Cypress",
  slug: "cypress",
  intro:
    "Cypress incorporated in 1956 under the name Dairy City, a name earned in the years when the city's own history says the area had about 1,000 residents and more than 13,000 cows, and residents voted 208 to 41 the next year to rename it after the rows of cypress trees planted to block the wind around the first schoolhouse. The dairies gave way to tract housing fast: about two in three homes standing today were built in the 1960s and 1970s, and the median build year is 1971. The Los Alamitos Race Course sits inside the city despite its name, and in August 2026 the City Council approved a plan to build out about 134 acres of the specific plan area that covers it.",
  metaDescription:
    "Cypress began as Dairy City in 1956. What 1960s and 1970s tracts, hard Golden State Water, city permits and 2001 flood and dam maps mean for upkeep.",
  metaTitle: "Cypress homes: Dairy City tracts and hard water",

  population: {
    value: "About 49,498 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003; the city itself says approximately 50,000",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0617750",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1971",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0617750",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Cypress's median year built is 1971. Of about 16,920 housing units, roughly 38.9 percent went up in the 1960s and another 28.7 percent in the 1970s, while only about 8.3 percent predate 1960 and about 9.6 percent date from 2000 or later. About three in four homes here predate 1980, so original drain lines, electrical panels and supply plumbing tend to come due across whole streets at the same time.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0617750",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "The city's own history explains the timing. Dairy farming was the leading industry by the 1940s and the area was nicknamed Moo Valley. Cypress was officially incorporated as Dairy City on July 24, 1956, and on August 6, 1957 residents voted 208 to 41 in a straw ballot to rename it Cypress, a name that goes back to the cypress trees planted around the 1895 schoolyard to help block strong winds. Farmland then gave way to neighborhoods, with Cypress College arriving in 1966 and the Civic Center in 1967.",
        sourceUrl: "https://www.cypressca.org/resident/cypress-70",
        sourceLabel: "City of Cypress, 70th anniversary city history",
      },
      {
        text: "The city's land use element, adopted in 2001, says the majority of Cypress's low density single-family neighborhoods were constructed during the 1960s as land converted from agricultural uses to large tracts of single-family homes, at up to five homes per acre. The main later exception it names is the 671-unit Sorrento Homes tract, whose first houses were completed in 1991 and which was built out in the 1990s. If your house is not in Sorrento or a newer infill project, assume 1960s or 1970s construction until the permit record says otherwise.",
        sourceUrl:
          "https://www.cypressca.org/home/showpublisheddocument/13079/638792775966630000",
        sourceLabel: "City of Cypress General Plan, land use element",
      },
      {
        text: "The biggest change coming to Cypress housing is at the race course. The city's project page says the Los Alamitos Race Course applied for the planned buildout of approximately 134 acres within the Cypress Town Center and Commons Specific Plan 3.0 area, assuming 1,791 residential units and 440,000 square feet of commercial space, and that the City Council approved the project at its August 25, 2026 public hearing. The city's page lists the approval and the environmental documents, and it is the place to watch for what gets built and when.",
        sourceUrl:
          "https://www.cypressca.org/departments/community-development/information-on-notable-projects/ctcc-specific-plan-3-0-buildout-project",
        sourceLabel: "City of Cypress, CTCC Specific Plan 3.0 buildout project",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Sorrento",
      "Tanglewood",
      "Lincoln Avenue",
      "Gay and Denni Streets",
      "Cypress Business Park",
    ],
    note: "Cypress is mostly unnamed 1960s and 1970s tracts, so this list sticks to the names the city's own land use element uses. Sorrento is the 671-unit Sorrento Homes tract from the 1990s, which has its own specific plan. Tanglewood is the condominium development the element places along the city's western border by Ball Road. Lincoln Avenue is what the element calls the city's main commercial thoroughfare, with its own specific plan, adopted in 1999. The area around Gay and Denni Streets in the north is described as a unique rural residential neighborhood, built under county standards before it was annexed in 1988. The Cypress Business Park is the 587-acre master-planned employment area in southern Cypress. We did not find other neighborhood names in a city document, so none are listed.",
    sourceUrl:
      "https://www.cypressca.org/home/showpublisheddocument/13079/638792775966630000",
  },

  water: {
    utility: "Golden State Water Company, West Orange County system",
    utilityUrl: "https://www.gswater.com/los-alamitos",
    summary:
      "Cypress does not run its own water system. The city's utilities page lists Golden State Water, whose own report describes it as a wholly owned subsidiary of American States Water Company, a publicly traded company, so this is not a city department. The company says its West Orange County system serves approximately 30,100 customers in Cypress, Los Alamitos, Stanton and portions of Garden Grove, La Palma, Rossmoor and Seal Beach. Its current report describes the water as a blend of treated groundwater pumped from the Orange County Groundwater Basin and imported Colorado River and State Water Project water delivered by the Metropolitan Water District. In 2025 sampling, hardness across the system averaged 237 ppm, about 13.8 grains per gallon, with a range of 62.9 to 369 ppm, or 3.67 to 21.6 grains per gallon. That average is hard water, and the range is wide, so what reaches a given tap depends on which sources are feeding that part of the system. The report gives one system-wide row and does not split groundwater from imported water.",
    sourceUrl:
      "https://www.gswater.com/sites/main/files/file-attachments/water-quality-west-orange-county.pdf",
  },

  permits: {
    office: "City of Cypress Building Division",
    portalUrl: "https://cypressca.portal.opengov.com/categories/1083",
    summary:
      "The Building Division is the city's counter for building, grading, and construction and demolition needs, and the Apply Here button on its page opens the Building and Safety section of the city's OpenGov portal. The city's list of projects that need a permit includes kitchen remodels, re-roofs, heating and air conditioning units, water heaters, patio covers, room additions, solar panels and window change-outs. It quotes a plan check turnaround of 10 working days for a first submittal and 5 working days for a recheck, inspections Monday through Friday from 8:00 a.m. to 4:00 p.m. with two days' notice recommended, and says the 2025 California building codes took effect in Cypress on January 1, 2026. The city's page gives (714) 229-6730 and buildingpermits@cypressca.org for questions about whether a project needs a permit.",
    sourceUrl:
      "https://www.cypressca.org/departments/community-development/building-division",
  },

  hazards: [
    {
      text: "On flooding, the city's safety element says the projected 100-year flood for Cypress is contained within the Carbon Creek and Bolsa Chica storm drain channels, but that the projected 500-year flood may result in widespread flooding throughout the entire city. Six storm drain channels cross Cypress, including Coyote Creek and Carbon Creek. That element dates from 2001 and cites a 1989 FEMA map, so look up your own address on FEMA's current flood map before buying, insuring or remodeling.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "Cypress is inside the dam inundation area of three dams, according to the city's safety element: Prado, Carbon Canyon and Whittier Narrows. It says that if Carbon Canyon Dam in Brea were to exceed its capacity, the portion of Cypress below Orange Avenue could be completely covered, and that the city has prepared emergency evacuation plans for all three dams. It is a low-probability event, but it is a disclosure item worth understanding when you buy here.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "No earthquake fault runs through Cypress. The safety element says the city is not in an Alquist-Priolo Earthquake Fault Zone and has no active or potentially active faults, and that the Newport-Inglewood Fault is the one anticipated to generate the most destructive ground shaking here. The soil is the local issue: the element says Cypress, like most of Orange County, has granular sandy soil with a high water content, and that such areas may experience liquefaction during extreme shaking. Check your address on the state's Seismic Hazard Zone map before foundation or addition work.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "The Joint Forces Training Center is a military airfield in the neighboring city of Los Alamitos. Cypress's safety element says a portion of Cypress lies within the prevailing approach path of the Army airfield there, that the base is primarily used for helicopter training missions, and that this part of the city is primarily business park. The city applies land use rules on aircraft noise and building heights in that area. If you are buying in the southern part of the city, visit at different times of day and listen.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "Fire risk in Cypress is an urban question, and wind is part of it. The safety element says the city is subject to periodic high winds, including Santa Ana winds, which quicken the spread of fire. It also says the community has no large housing tracts with wood or shake roofs, though a few apartment complexes do, and that the separation and setback rules in effect when most houses were built help limit fire spread. After a wind event, check ridge caps, fence posts and patio covers.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "Cypress does not have its own fire department. The Orange County Fire Authority lists Station 17 at 4991 Cerritos Avenue as serving the City of Cypress: a career station established in 1969, with Medic Engine 17, Truck 17 and Engine 117 and a total staffing of 24 firefighters. The city's safety element says the fire authority has served Cypress since May 16, 1980.",
      sourceUrl: "https://ocfa.org/fire-stations/",
      sourceLabel: "Orange County Fire Authority, fire stations",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "Typical range, and the signs that a panel sized for a 1960s or 1970s household is not carrying a modern one.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Price range and when a repair still makes sense, on water that averages about 13.8 grains per gallon.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "How to catch one early in a tract house with its original supply plumbing, before the water bill tells you.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including roof and gutter checks before the Santa Ana winds the city's safety element describes.",
    },
  ],

  neighbors: ["los-alamitos", "stanton", "buena-park", "la-palma"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater or reroof in Cypress?",
      a: "Yes. The Cypress Building Division's own list of projects that require a building permit includes re-roofs, water heaters, heating and air conditioning units, kitchen remodels, window change-outs, patio covers and solar panels. Applications start from the Apply Here button on the division's page, which opens the city's OpenGov portal. A licensed contractor normally pulls the permit as part of the job, and the division's number for questions is (714) 229-6730.",
    },
    {
      q: "Is Cypress water hard?",
      a: "Yes, on average. Golden State Water Company's current report for its West Orange County system, which serves Cypress, shows hardness averaging 237 ppm, about 13.8 grains per gallon, in 2025 sampling. The range is wide, from 62.9 to 369 ppm, because the system blends local groundwater with imported water. Flushing a tank water heater yearly and descaling a tankless unit on the manufacturer's schedule is worth the hour here.",
    },
    {
      q: "Is my Cypress home in a flood zone?",
      a: "Probably not in the 100-year zone, but check. The city's safety element says the projected 100-year flood is contained within the Carbon Creek and Bolsa Chica storm drain channels, while a 500-year flood may cause widespread flooding across the whole city. That document is from 2001 and relies on a 1989 FEMA map, so the real answer comes from looking up your address on FEMA's Flood Map Service Center. The same element places Cypress inside the inundation areas of the Prado, Carbon Canyon and Whittier Narrows dams.",
    },
    {
      q: "Who provides fire service in Cypress?",
      a: "The Orange County Fire Authority. Cypress has no city fire department; the fire authority lists Station 17 at 4991 Cerritos Avenue as serving the City of Cypress, with a medic engine, a truck and a second engine. Police are a different story: the city's safety element says Cypress operates its own police department, at 5275 Orange Avenue.",
    },
    {
      q: "Is the Los Alamitos Race Course really in Cypress, and what is happening to it?",
      a: "It is. The city's land use element describes the Los Alamitos Race Track as located in the southwestern portion of Cypress, even though its mailing address says Los Alamitos. The city's project page says the race course applied for the buildout of approximately 134 acres of the Cypress Town Center and Commons Specific Plan 3.0 area, assuming 1,791 residential units and 440,000 square feet of commercial space, and that the City Council approved it on August 25, 2026. The city's page does not give a construction start date.",
    },
  ],

  updated: "2026-09-20",
};
