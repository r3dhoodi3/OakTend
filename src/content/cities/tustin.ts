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
    "Tustin is three build eras sharing one name: tracts from the 1960s and 1970s such as Tustin Meadows, the Tustin Ranch planned community approved in 1986, and Tustin Legacy, which is still going up on the former Marine Corps air station. That mix is why the median build year of 1983 describes almost no actual street here. Which era you live in also decides who sends your water bill, because the city's own utility serves part of Tustin and Irvine Ranch Water District serves the rest.",
  metaDescription:
    "Tustin mixes 1960s tracts, Tustin Ranch and Tustin Legacy. Two water providers, very hard city well water, reroof rules and permit steps.",
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
        text: "Tustin's median year built is 1983, give or take about four years, and the spread behind it matters more than the median. Of about 30,118 housing units, roughly 42.1 percent date from the 1960s and 1970s, about 35.1 percent from the 1980s and 1990s, and about 18.7 percent from 2000 or later, with almost nothing older than 1960. A city split that evenly has no single maintenance profile, so start from your own tract's decade.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0680854",
        sourceLabel: "Census Reporter, ACS 2024 one-year tables B25034 and B25035",
      },
      {
        text: "The city's own history gives the first wave. Tustin incorporated in 1927 with a population just over 900, grew 220 percent in area through annexations in the 1950s, and then saw its population jump 1,012 percent in the 1960s, from 2,006 to 22,313. Tustin Meadows is the clearest example of that decade: the Tustin Area Historical Society records 900 homes built by the Robert H. Grant Company around an eight-acre park, opening in the city's centennial year of 1968.",
        sourceUrl: "https://www.tustinca.org/833/Tustin-History",
        sourceLabel: "City of Tustin, Tustin history",
      },
      {
        text: "Tustin Ranch is the second wave. The Irvine Company decided to build the planned community in 1982, the county approved it in 1986, and it was annexed to Tustin that same year on what had been a citrus ranch, with a plan calling for about 7,000 homes. A late 1980s or 1990s Tustin Ranch house is now at the age where the original roof underlayment, water heater and HVAC system have usually been replaced once, or are overdue.",
        sourceUrl: "https://en.wikipedia.org/wiki/Tustin_Ranch,_Tustin,_California",
        sourceLabel: "Wikipedia, Tustin Ranch",
      },
      {
        text: "Tustin Legacy is the third. It is a 1,600-acre planned community on the former Marine Corps Air Station Tustin, planned for about 4,600 homes; its first neighborhood, Tustin Field, was completed in 2006, and the city's own page counts 1,075 dwelling units in Columbus Square. These are the newest homes in the city, which usually means builder-grade equipment reaching its first replacement rather than aging structure.",
        sourceUrl: "https://en.wikipedia.org/wiki/Tustin_Legacy,_Tustin,_California",
        sourceLabel: "Wikipedia, Tustin Legacy",
      },
      {
        text: "Tustin averages about 13.87 inches of rain a year, nearly all of it between November and April, according to the NOAA normals reproduced in the city's Wikipedia entry. It sits far enough inland to get less marine-layer cooling than the coast, so summer sun on roofing, paint and west-facing windows is the everyday wear here.",
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
    note: "Old Town is the original townsite, begun when Columbus Tustin and a partner bought 1,300 acres of the old rancho and tried to sell homesites as Tustin City, and it carries a Cultural Resources Overlay District. Tustin Meadows dates to 1968. Tustin Ranch is the Irvine Company community annexed in 1986, and Tustin Legacy is the redevelopment of the former air station, which includes Columbus Square and Columbus Grove. North Tustin, on the city's northern edge, is an unincorporated community rather than part of the city, even though the city's water utility serves portions of it; a North Tustin address deals with the county, not Tustin City Hall, for permits.",
    sourceUrl: "https://en.wikipedia.org/wiki/Tustin,_California",
  },

  water: {
    utility: "City of Tustin Water Services",
    utilityUrl: "https://www.tustinca.org/1542/Water-System-Information",
    summary:
      "Tustin has two retail water providers. The city says residents receive water from either Tustin Water Services or Irvine Ranch Water District depending on where they live, and its page links a service area map; the city utility also serves portions of unincorporated North Tustin. For the city system, groundwater is the primary source, blended with imported Metropolitan water and some treated groundwater from East Orange County Water District. The city's report for 2025 lists average hardness of 377 ppm, about 22 grains per gallon, for Tustin's own groundwater, 333 ppm for the East Orange County supply and 236 ppm, about 14 grains per gallon, for imported water, with detections across the system ranging from 133 to 609 ppm. That is very hard water. If Irvine Ranch Water District serves your address, use its report instead; we could not read its current figures and are not going to guess them.",
    sourceUrl: "https://www.tustinca.org/DocumentCenter/View/20391",
  },

  permits: {
    office: "City of Tustin Building Division",
    portalUrl:
      "https://tustinca-energovpub.tylerhost.net/Apps/SelfService#/home",
    summary:
      "The Building Division is part of Community Development, and plans, applications and payments go through the city's Citizen Self Service portal. The city publishes user guides for the jobs homeowners actually do. Its water heater, furnace and air conditioner guide says a permit is required to install or replace any of them and that those permits may be issued over the counter. Its reroofing guide says permits are usually issued over the counter, requires a pre-roof inspection, sets Class B as the minimum roof covering and requires Class A assemblies in the Hillside District of the East Tustin Specific Plan, and says a home in the Cultural Resources Overlay District needs a Certificate of Appropriateness first. For projects that need plan check, the city estimates about 10 working days for a first review and five for resubmittals. Note that the water heater guide is dated 1999, so confirm current code details with the division.",
    sourceUrl: "https://www.tustinca.org/382/Forms-Handouts",
  },

  hazards: [
    {
      text: "Tustin is not all flatland for fire purposes. The city's fire hazard page says the Cal Fire map for the City of Tustin designates portions of the city within Very High, High and Moderate Fire Hazard Severity Zones, and it sends residents to the state's zone viewer to check a property. The city page does not name the neighborhoods, so neither will we: look up your own parcel.",
      sourceUrl: "https://www.tustinca.org/1600/Fire-Hazard-Severity-Zone",
      sourceLabel: "City of Tustin, fire hazard severity zone",
    },
    {
      text: "A Navy hangar at the former air station burned in November 2023. The city's release of December 1, 2023 announced the final hotspot extinguished after 24 days, described it as one of the largest all-wood buildings ever constructed, and told residents concerned about debris inside their homes to contact a Certified Asbestos Contractor and their insurer. If you are buying near Tustin Legacy, ask what inspection or clearance the property received.",
      sourceUrl: "https://www.tustinca.org/CivicAlerts.aspx?AID=755",
      sourceLabel: "City of Tustin press release, December 1, 2023",
    },
    {
      text: "The city's lead service line inventory found that all service lines in the distribution system are lead-free, but identified 120 customer-side service lines as galvanized and requiring replacement. The customer side is the owner's pipe. In an older Tustin home, find out what your service line is made of before you plan a repipe or chase a pressure problem.",
      sourceUrl: "https://www.tustinca.org/DocumentCenter/View/20391",
      sourceLabel: "City of Tustin water quality report, reporting year 2025",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on city groundwater that averages about 22 grains per gallon.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, for a city where the roof class depends on which district you are in.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a full system runs, for Tustin Ranch homes reaching their second system and Legacy homes reaching their first.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including the water heater flush that 22-grain city groundwater calls for and roof checks before the November to April rains.",
    },
  ],

  neighbors: ["irvine", "santa-ana", "orange"],

  faq: [
    {
      q: "Who provides my water in Tustin?",
      a: "It depends on your address. The city says residents are served by either Tustin Water Services or Irvine Ranch Water District depending on where they live, and its water system page links a map of the two service areas. It matters for more than the bill, because the two systems publish separate water quality reports, and the hardness figures on this page are the city system's only.",
    },
    {
      q: "Is Tustin's water hard?",
      a: "On the city system, very. The city's report lists its own groundwater at an average of about 22 grains per gallon and its imported water at about 14, with the actual blend at a given tap falling somewhere in the reported range. Scale in water heaters, on fixtures and in dishwashers is a normal maintenance item. If you are an Irvine Ranch Water District customer, read that district's report for your numbers.",
    },
    {
      q: "Do I need a permit to replace a water heater or furnace in Tustin?",
      a: "Yes. The city's user guide says a permit is required to install or replace a water heater, furnace or air conditioner, and that these permits may be issued over the counter. A licensed contractor normally pulls the permit as part of the job. The guide is an older document, so confirm current strapping, venting and drain pan details with the Building Division rather than relying on the handout alone.",
    },
    {
      q: "Does my Tustin reroof need a Class A roof?",
      a: "Possibly. The city's reroofing guide sets Class B as the minimum roof covering classification and requires Class A assemblies for buildings in the Hillside District defined in the East Tustin Specific Plan, or where the city's amended code table calls for it. Separately, the city's fire hazard page says parts of Tustin fall in state fire hazard severity zones. Ask your roofer to state the assembly rating on the quote, and confirm your district with the Building Division.",
    },
    {
      q: "Do I need special approval to work on a house in Old Town Tustin?",
      a: "For exterior work, expect an extra step. The city's reroofing guide says a home in the Cultural Resources Overlay District needs a Certificate of Appropriateness before the building permit is issued. Build that review into your schedule, and talk to the city before ordering windows, roofing or siding for an older Old Town house.",
    },
    {
      q: "Is North Tustin part of the City of Tustin?",
      a: "No. North Tustin is unincorporated Orange County, even though the city's water utility serves portions of it. That means building permits and code questions for a North Tustin address go to the county rather than to Tustin's Building Division, which is an easy thing to get wrong when the mailing address says Tustin.",
    },
  ],

  updated: "2026-09-19",
};
