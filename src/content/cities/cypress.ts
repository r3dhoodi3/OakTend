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
    "Cypress incorporated in 1956 as Dairy City, when the city's history says the area had about 1,000 residents and more than 13,000 cows. The dairies gave way to tracts fast, and about two in three homes standing today went up in the 1960s and 1970s. The Los Alamitos Race Course sits inside Cypress, and in August 2026 the City Council approved a buildout of about 134 acres around it.",
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
        text: "Of about 16,920 housing units, roughly 38.9 percent went up in the 1960s and 28.7 percent in the 1970s; only about 8.3 percent predate 1960 and about 9.6 percent date from 2000 or later. With three in four homes older than 1980, drain lines, panels and supply plumbing tend to come due across whole streets at once.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0617750",
        sourceLabel: "Census Reporter, ACS 2024 5-year tables B25034 and B25035",
      },
      {
        text: "By the 1940s dairy farming led and the area was nicknamed Moo Valley. Cypress incorporated as Dairy City on July 24, 1956, and on August 6, 1957 residents voted 208 to 41 in a straw ballot to rename it after the cypress trees planted around the 1895 schoolyard as a windbreak. Cypress College followed in 1966 and the Civic Center in 1967.",
        sourceUrl: "https://www.cypressca.org/resident/cypress-70",
        sourceLabel: "City of Cypress, 70th anniversary city history",
      },
      {
        text: "The 2001 land use element says most single-family neighborhoods were built in the 1960s on converted farmland, at up to five homes per acre. The main later exception is the 671-unit Sorrento Homes tract, first completed in 1991 and built out through the 1990s.",
        sourceUrl:
          "https://www.cypressca.org/home/showpublisheddocument/13079/638792775966630000",
        sourceLabel: "City of Cypress General Plan, land use element",
      },
      {
        text: "The Los Alamitos Race Course applied to build out about 134 acres of the Cypress Town Center and Commons Specific Plan 3.0 area, assuming 1,791 homes and 440,000 square feet of commercial space, and the City Council approved it at its August 25, 2026 hearing. The city's project page carries the approval and environmental documents.",
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
    note: "Most of Cypress is unnamed 1960s and 1970s tracts, so these are the names the land use element uses. Sorrento is the 1990s tract with its own specific plan. Tanglewood is the condominium development on the western border by Ball Road. Lincoln Avenue is the main commercial street, under a 1999 specific plan. Gay and Denni Streets in the north is a rural residential area built to county standards before its 1988 annexation. The Cypress Business Park is the 587-acre employment area in the south.",
    sourceUrl:
      "https://www.cypressca.org/home/showpublisheddocument/13079/638792775966630000",
  },

  water: {
    utility: "Golden State Water Company, West Orange County system",
    utilityUrl: "https://www.gswater.com/los-alamitos",
    summary:
      "Cypress has no city water department. Golden State Water, a subsidiary of the publicly traded American States Water Company, serves about 30,100 customers in its West Orange County system across Cypress, Los Alamitos, Stanton and parts of Garden Grove, La Palma, Rossmoor and Seal Beach. It blends Orange County basin groundwater with imported Colorado River and State Water Project water. In 2025 sampling, hardness averaged 237 ppm, about 13.8 grains per gallon, ranging from 62.9 to 369 ppm (3.67 to 21.6 grains), so a given tap depends on which sources feed that part of the system.",
    sourceUrl:
      "https://www.gswater.com/sites/main/files/file-attachments/water-quality-west-orange-county.pdf",
  },

  permits: {
    office: "City of Cypress Building Division",
    portalUrl: "https://cypressca.portal.opengov.com/categories/1083",
    summary:
      "The Apply Here button on the Building Division page opens the city's OpenGov portal. The city's permit list includes kitchen remodels, re-roofs, heating and air conditioning units, water heaters, patio covers, room additions, solar panels and window change-outs. Plan check takes 10 working days for a first submittal and 5 for a recheck; inspections run Monday through Friday, 8:00 a.m. to 4:00 p.m., with two days' notice recommended. The 2025 California codes took effect January 1, 2026. Questions: (714) 229-6730 or buildingpermits@cypressca.org.",
    sourceUrl:
      "https://www.cypressca.org/departments/community-development/building-division",
  },

  hazards: [
    {
      text: "The 2001 safety element, citing a 1989 FEMA map, says the projected 100-year flood stays inside the Carbon Creek and Bolsa Chica storm channels, while a 500-year flood may cause widespread flooding across the city. Six storm drain channels cross Cypress, including Coyote Creek and Carbon Creek. FEMA's current map is the up-to-date check.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "Cypress lies in the inundation areas of Prado, Carbon Canyon and Whittier Narrows dams. If Carbon Canyon Dam in Brea exceeded capacity, the part of Cypress below Orange Avenue could be completely covered; the city has evacuation plans for all three.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "No active or potentially active fault runs through Cypress, and it has no Alquist-Priolo zone; the Newport-Inglewood Fault is expected to cause the worst shaking. The local issue is soil: granular, sandy and wet, which may liquefy in extreme shaking.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "Part of southern Cypress, mostly business park, lies under the approach path of the Army airfield at the Joint Forces Training Center in Los Alamitos, used mainly for helicopter training. The city applies noise and building height rules there.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "Periodic high winds, including Santa Ana winds, speed the spread of fire here. The safety element says no large housing tracts have wood or shake roofs, though a few apartment complexes do, and the setback rules in force when most houses were built help limit spread.",
      sourceUrl:
        "https://www.cypressca.org/home/showpublisheddocument/714/639010710852270000",
      sourceLabel: "City of Cypress General Plan, safety element",
    },
    {
      text: "The Orange County Fire Authority has served Cypress since May 16, 1980. Its Station 17 at 4991 Cerritos Avenue, a career station from 1969, runs Medic Engine 17, Truck 17 and Engine 117 with 24 firefighters.",
      sourceUrl: "https://ocfa.org/fire-stations/",
      sourceLabel: "Orange County Fire Authority, fire stations, with the city safety element",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb: "Most Cypress panels were sized for a 1960s or 1970s household.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "Golden State Water averages about 13.8 grains per gallon here.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb: "Original supply plumbing in Dairy City-era tracts is at leak age.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Includes roof and gutter checks before Santa Ana wind season.",
    },
  ],

  neighbors: ["los-alamitos", "stanton", "buena-park", "la-palma"],

  faq: [
    {
      q: "Is the Los Alamitos Race Course actually in Cypress?",
      a: "Yes. The city's land use element places the race track in southwestern Cypress, even though its mailing address says Los Alamitos. The city's project page gives no construction start date for the approved buildout.",
    },
    {
      q: "Does Cypress have its own police department?",
      a: "Yes. The safety element says Cypress runs its own police department at 5275 Orange Avenue, while fire service comes from the Orange County Fire Authority.",
    },
  ],

  updated: "2026-09-20",
};
