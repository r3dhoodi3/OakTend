import type { CityContent } from "./types";

// Tustin. Researched 2026-09-19 for the second city wave. Every number below
// was read from the source document itself, not from a search summary.
//
// The angle that makes this page not interchangeable: Tustin is three build
// eras under one name (the 1960s and 1970s tracts, Tustin Ranch from the late
// 1980s, Tustin Legacy on the former air station), it is split between two
// water providers, and the city's own report puts its local groundwater at
// about 22 grains per gallon.
//
// WATER NUMBERS are from the city's report for reporting year 2025
// (tustinca.org DocumentCenter item 20391). The older report said 130
// galvanized customer-side service lines; the current one says 120, which is
// the figure used.
//
// LEFT OUT ON PURPOSE. Which parts of the city the state fire map covers (the
// city's page says zones exist but does not name areas, and the parcel counts
// in circulation came from a news summary), any Mello-Roos district numbers
// (the audit that lists them would not open), the air station's closure year,
// Irvine Ranch Water District hardness numbers (its report is an interactive
// flipbook we could not read), and the Old Town district boundaries (only a
// preservation nonprofit states them).

export const tustin: CityContent = {
  name: "Tustin",
  slug: "tustin",
  intro:
    "Tustin is three build eras sharing one name: 1960s and 1970s tracts such as Tustin Meadows, the Tustin Ranch planned community approved in 1986, and Tustin Legacy, still going up on the former Marine Corps air station. Which era you live in also decides who sends your water bill, because the city's own utility serves part of Tustin and Irvine Ranch Water District serves the rest.",
  metaDescription:
    "Tustin mixes 1960s tracts, Tustin Ranch and Tustin Legacy. Two water providers, very hard city well water, Hillside roof rules and Old Town permit steps.",
  metaTitle: "Tustin: three build eras and two water providers",

  population: {
    value: "About 78,864 people",
    asOf: "ACS 2024 one-year estimate, table B01003",
    sourceUrl:
      "https://data.census.gov/table/ACSDT1Y2024.B01003?g=160XX00US0680854",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "1983",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0680854",
      sourceLabel: "Census Reporter, ACS 2024 one-year table B25035",
    },
    facts: [
      {
        text: "The 1983 median, give or take about four years, describes almost no actual street. Of about 30,118 housing units, roughly 42.1 percent date from the 1960s and 1970s, 35.1 percent from the 1980s and 1990s and 18.7 percent from 2000 or later, with almost nothing older than 1960.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0680854",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "Tustin incorporated in 1927 with just over 900 people, grew 220 percent in area through 1950s annexations, and then grew 1,012 percent in population in the 1960s, from 2,006 to 22,313. The Tustin Area Historical Society records Tustin Meadows as 900 Robert H. Grant Company homes around an eight-acre park, opening in 1968.",
        sourceUrl: "https://www.tustinca.org/833/Tustin-History",
        sourceLabel: "City of Tustin, Tustin history",
      },
      {
        text: "The Irvine Company decided to build Tustin Ranch in 1982 on a former citrus ranch, and the county approved it in 1986, the year it was annexed to Tustin, with a plan for about 7,000 homes.",
        sourceUrl: "https://en.wikipedia.org/wiki/Tustin_Ranch,_Tustin,_California",
        sourceLabel: "Wikipedia, Tustin Ranch",
      },
      {
        text: "Tustin Legacy is a 1,600-acre planned community on the former Marine Corps Air Station Tustin, planned for about 4,600 homes. Its first neighborhood, Tustin Field, was completed in 2006, and the city counts 1,075 dwelling units in Columbus Square.",
        sourceUrl: "https://en.wikipedia.org/wiki/Tustin_Legacy,_Tustin,_California",
        sourceLabel: "Wikipedia, Tustin Legacy",
      },
      {
        text: "Tustin averages about 13.87 inches of rain a year, nearly all of it between November and April, according to the NOAA normals reproduced in the city's Wikipedia entry.",
        sourceUrl: "https://en.wikipedia.org/wiki/Tustin,_California",
        sourceLabel: "Wikipedia, Tustin climate table citing NOAA",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Old Town Tustin",
      "Tustin Meadows",
      "Tustin Ranch",
      "Tustin Legacy",
      "Columbus Square",
      "Columbus Grove",
    ],
    note: "Old Town is the original townsite, begun when Columbus Tustin and a partner bought 1,300 acres of the old rancho to sell homesites as Tustin City, and it carries a Cultural Resources Overlay District. Tustin Legacy, the redevelopment of the former air station, includes Columbus Square and Columbus Grove.",
    sourceUrl: "https://en.wikipedia.org/wiki/Tustin,_California",
  },

  water: {
    utility: "City of Tustin Water Services",
    utilityUrl: "https://www.tustinca.org/1542/Water-System-Information",
    summary:
      "Depending on the address, water comes from Tustin Water Services or Irvine Ranch Water District; the city's water page links a map of the two areas. The city system runs mainly on its own groundwater, blended with imported Metropolitan water and some East Orange County Water District supply. Its 2025 report lists average hardness of 377 ppm, about 22 grains per gallon, for city groundwater, 333 ppm for the East Orange County supply and 236 ppm, about 14 grains, for imported water, with detections from 133 to 609 ppm. Irvine Ranch customers should read that district's own report; we could not read its current figures.",
    sourceUrl: "https://www.tustinca.org/DocumentCenter/View/20391",
  },

  permits: {
    office: "City of Tustin Building Division",
    portalUrl:
      "https://tustinca-energovpub.tylerhost.net/Apps/SelfService#/home",
    summary:
      "Plans, applications and payments go through the Citizen Self Service portal. The city's guide says a water heater, furnace or air conditioner swap needs a permit, usually issued over the counter; the guide dates from 1999, so confirm current details. Reroof permits are also usually over the counter, with a pre-roof inspection. Class B is the minimum roof covering, and Class A is required in the Hillside District of the East Tustin Specific Plan. Plan check runs about 10 working days for a first review and five for resubmittals.",
    sourceUrl: "https://www.tustinca.org/382/Forms-Handouts",
  },

  hazards: [
    {
      text: "The city's fire hazard page says the Cal Fire map designates portions of Tustin within Very High, High and Moderate Fire Hazard Severity Zones, without naming neighborhoods, and sends residents to the state's zone viewer.",
      sourceUrl: "https://www.tustinca.org/1600/Fire-Hazard-Severity-Zone",
      sourceLabel: "City of Tustin, fire hazard severity zone",
    },
    {
      text: "A Navy hangar at the former air station burned in November 2023. The city announced the last hotspot out on December 1, 2023, after 24 days, and told residents worried about debris inside their homes to contact a Certified Asbestos Contractor and their insurer. Buyers near Tustin Legacy can ask what clearance a property received.",
      sourceUrl: "https://www.tustinca.org/CivicAlerts.aspx?AID=755",
      sourceLabel: "City of Tustin press release, December 1, 2023",
    },
    {
      text: "The city's lead service line inventory found every line in its distribution system lead-free, but 120 customer-side lines, the owner's pipe, are galvanized and need replacement.",
      sourceUrl: "https://www.tustinca.org/DocumentCenter/View/20391",
      sourceLabel: "City of Tustin water quality report, reporting year 2025",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Tustin city groundwater averages about 22 grains per gallon.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "In Tustin the required roof class depends on which district the house is in.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "Tustin Ranch homes are on their second system and Legacy homes near their first.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Roof checks before the November to April rains that bring nearly all of Tustin's 13.87 inches.",
    },
  ],

  neighbors: ["irvine", "santa-ana", "orange"],

  faq: [
    {
      q: "Do I need special approval to work on a house in Old Town Tustin?",
      a: "Yes, for a house in the Cultural Resources Overlay District. The city's reroofing guide says it needs a Certificate of Appropriateness before the building permit is issued, so talk to the city before ordering windows, roofing or siding.",
    },
    {
      q: "Is North Tustin part of the City of Tustin?",
      a: "No. North Tustin is unincorporated Orange County, even though the city's water utility serves portions of it, so permits for a North Tustin address go to the county, not Tustin's Building Division.",
    },
  ],

  updated: "2026-09-19",
};
