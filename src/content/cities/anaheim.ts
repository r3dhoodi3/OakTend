import type { CityContent } from "./types";

// Anaheim. Facts and sources: the city research file for this wave
// (scratchpad/cities/anaheim.md).
//
// The angle that makes this page not interchangeable: Anaheim is two
// maintenance cities under one name. Flat, old, dense west and central
// Anaheim, and hillside Anaheim Hills, which is the one place on any of these
// pages where a city-adopted map actually puts homes in a Very High Fire
// Hazard Severity Zone. The exposure field is "foothill" because the city does
// run up into the foothills; the prose carries the split so the flatlands are
// not sold a wildfire story that is not theirs.
//
// Anaheim Hills is NOT broken out in any Census or housing-element source, so
// the citywide median year built is presented as the blend it is.
//
// FACT CHECK 2026-09-19. Five things changed after a review:
// 1. "One of three Orange County cities that run their own water utility" was
//    false (many do) and is gone. What is true, per Metropolitan's own member
//    agency list (https://www.mwdh2o.com/member-agencies/), is that Anaheim,
//    Fullerton and Santa Ana are the three Orange County member cities; the
//    page does not need the claim, so it simply is not made.
// 2. "The hardest water on any of these city pages" is gone: the Irvine figure
//    it was compared against was a misread, and Tustin's page reports a higher
//    groundwater average than Anaheim's 351 ppm. The 351 / 278 / 131 ppm row
//    (21 / 16 / 7.7 grains, range 81 to 431 ppm) was re-read in the city's
//    2024 Water Quality Report PDF and stands.
// 3. The 2020 Blue Ridge fire is out of the fire history: Cal Fire's incident
//    record places it north of the 91 in the Yorba Linda and Chino Hills area.
//    The 2008 Freeway Complex stays, per OCFA's after action report (embers
//    crossed the 91 into Anaheim Hills; the City of Anaheim lost or had damage
//    to 25 single-family homes and 60 apartment units):
//    https://web.archive.org/web/20160623020722/http://www.ocfamedia.org/_uploads/PDF/fcfaar.pdf
//    The 2017 Canyon Fire 2 stays, per Cal Fire's incident record (started off
//    East Santa Ana Canyon Road west of Gypsum Canyon, unified command with
//    Anaheim City): https://www.fire.ca.gov/incidents/2017/10/9/canyon-2-fire
// 4. "No marine-layer moderation" became "less marine-layer cooling than the
//    coast", which is the claim the geography actually supports.
// 5. Two other "one of the few" phrasings went with the new test sweep: the
//    panel guide blurb now says "one of only three permit types" (the permits
//    card already sources the three), and the wildfire FAQ no longer ranks
//    Anaheim against other cities, which no source here supported.
// The median year built now carries its own source (ACS 2024 one-year table
// B25035 via Census Reporter, which returns 1973 for Anaheim).

export const anaheim: CityContent = {
  name: "Anaheim",
  slug: "anaheim",
  intro:
    "Anaheim is two maintenance cities under one name: flat, dense west and central neighborhoods where about a quarter of homes predate 1960, and Anaheim Hills, master-planned from 1971 and the only part of the city with mapped Very High fire hazard land. The city runs its own water utility, and its groundwater averages about 21 grains per gallon of hardness.",
  metaDescription:
    "Anaheim is two cities: older flat tracts west and central, and Anaheim Hills in a Very High fire zone. Its own hard water, landslides and permits, sourced.",
  metaTitle: "Anaheim: old flat tracts and hillside fire zones",

  population: {
    value: "About 344,000 to 347,000 people",
    asOf: "Census Vintage 2024 estimate and the 2020 Census count",
    sourceUrl:
      "https://www.census.gov/quickfacts/fact/table/anaheimcitycalifornia/PST045224",
  },

  homes: {
    exposure: "foothill",
    medianYearBuilt: "1973",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0602000",
      sourceLabel: "Census Reporter, ACS 2024 table B25035",
    },
    facts: [
      {
        text: "Of about 113,613 housing units, roughly 25.3 percent predate 1960, about 40.1 percent went up between 1960 and 1979, and only about 17.3 percent date from 2000 or later. Two thirds of the city is older than 1980, the age for panels, sewer laterals and original plumbing.",
        sourceUrl:
          "https://data.census.gov/table/ACSDT1Y2024.B25034?g=160XX00US0602000",
        sourceLabel: "Census ACS table B25034",
      },
      {
        text: "Anaheim Hills was master-planned from 1971, when Texaco Industries bought the Nohl ranch and laid out roughly 7,000 homes and estates on large lots; Mohler Loop and Peralta Hills date from the 1940s and 1950s. No Census or city source separates the hills from the citywide figures, so the 1973 median blends two very different places.",
        sourceUrl:
          "https://en.wikipedia.org/wiki/Anaheim_Hills,_Anaheim,_California",
        sourceLabel: "Wikipedia, Anaheim Hills",
      },
      {
        text: "The city's planning documents put the historical average annual high near 76 degrees, projected toward 80 by 2064, on about 14 inches of rain a year. Heat on roofs, attics and air conditioning is the seasonal load here, not freezing.",
        sourceUrl: "https://anaheim.net/DocumentCenter/View/58325/Ch_05-18_WF",
        sourceLabel: "City of Anaheim General Plan PEIR",
      },
      {
        text: "Anaheim Fire & Rescue is the city's own department: more than 250 fire professionals and 11 stations covering about 50 square miles, including homes, commercial areas and land that meets the wildlands.",
        sourceUrl: "https://www.anaheim.net/6096/Fire-Rescue",
        sourceLabel: "City of Anaheim, Anaheim Fire & Rescue",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Anaheim Colony",
      "West Anaheim",
      "Platinum Triangle",
      "Anaheim Canyon",
      "Anaheim Hills",
    ],
    note: "Anaheim Colony downtown grew from the 1857 German-American founding settlement and is the largest of three downtown historic districts, home to the 1857 Pioneer House. West Anaheim is older, flatter housing. The Platinum Triangle around the stadium is an 820-acre rezoning from industrial land to high-density housing, the newest construction in the city. Anaheim Hills, at the eastern end next to the Cleveland National Forest, has more than 80 planned sub-neighborhoods and 23 community associations, so architectural review before exterior work is common there.",
    sourceUrl:
      "https://en.wikipedia.org/wiki/Anaheim_Hills,_Anaheim,_California",
  },

  water: {
    utility: "Anaheim Public Utilities",
    utilityUrl:
      "https://www.anaheim.net/DocumentCenter/View/54599/2024-Water-Quality-Report",
    summary:
      "Anaheim Public Utilities blends Orange County basin groundwater with imported State Water Project and Colorado River water, and the mix is shifting back toward groundwater as PFAS treatment comes back online. Hardness depends on which water reaches your address: the city's testing averaged 351 ppm for groundwater (about 21 grains per gallon), 278 ppm for water treated at the Lenain plant and 131 ppm for Metropolitan water, with detections from 81 to 431 ppm.",
    sourceUrl:
      "https://www.anaheim.net/DocumentCenter/View/54599/2024-Water-Quality-Report",
  },

  permits: {
    office: "City of Anaheim Building Division",
    portalUrl: "https://aca-prod.accela.com/anaheim/default.aspx",
    summary:
      "Anaheim Next runs on Accela, but only three permit types are fully self-service online: residential solar, EV chargers and electrical panel upgrades. Everything else, water heaters and HVAC included, goes through staff review.",
    sourceUrl:
      "https://www.anaheim.net/DocumentCenter/View/719/Water-Heater-Replacement-or-Relocation",
  },

  hazards: [
    {
      text: "The city's adopted map puts Very High Fire Hazard Severity Zone land in Anaheim Hills and the unincorporated sphere east of Highway 241, and Very High is the only Cal Fire tier inside city limits. The municipal code also designates a wildland-urban interface fire area east of the 55 and south of the 91. Central and western Anaheim sit outside it.",
      sourceUrl: "https://www.anaheim.net/6660/Fire-Hazard-Severity-Zones",
      sourceLabel: "City of Anaheim, fire hazard severity zones",
    },
    {
      text: "Inside that zone, new construction, additions and some remodels fall under California Building Code Chapter 7A for roofing, attic vents, exterior walls, windows and decking, plus 100 feet of defensible space and an ember-resistant five feet around the house. A reroof or window order in the hills is a code decision, not just a price one.",
      sourceUrl: "https://anaheim.net/DocumentCenter/View/58325/Ch_05-18_WF",
      sourceLabel: "City of Anaheim General Plan PEIR",
    },
    {
      text: "The city records two Anaheim Hills landslides: the 1993 Santiago slide, which destroyed more than 30 homes after an El Nino storm, and the 2005 Ramsgate slide, which took three homes and a private street during a 20-day rain event. Eastern slopes rate high for landslide risk, on the same ground as the fire zone, and hillside grading needs an approved grading plan and a geological report.",
      sourceUrl: "https://anaheim.net/DocumentCenter/View/58325/Ch_05-18_WF",
      sourceLabel: "City of Anaheim hazard mitigation documentation",
    },
    {
      text: "FEMA 100-year and 500-year floodplains cover parts of Anaheim, mostly along the Santa Ana River and Carbon Creek on the west side and the 91 corridor in the east.",
      sourceUrl: "https://anaheim.net/DocumentCenter/View/58325/Ch_05-18_WF",
      sourceLabel: "City of Anaheim General Plan PEIR, hydrology chapter",
    },
    {
      text: "Most of Anaheim predates the 1982 law that created Mello-Roos districts, but newer infill such as the high-density housing around the stadium came long after it, so there is no citywide answer. The county Treasurer-Tax Collector's parcel lookup has yours.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "In the Anaheim Hills fire zone, the roofing material is set by Chapter 7A.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "Two thirds of Anaheim predates 1980, and the panel permit can be issued fully online.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "City groundwater averages about 21 grains per gallon, hard on tanks.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Includes the defensible space work a Very High zone lot in the hills needs.",
    },
  ],

  neighbors: ["orange", "fullerton", "garden-grove", "stanton"],

  faq: [
    {
      q: "Has Anaheim Hills burned before?",
      a: "Yes. The 2008 Freeway Complex fire crossed the 91 into Anaheim Hills and damaged or destroyed homes and apartments there, and the 2017 Canyon Fire 2 started off East Santa Ana Canyon Road west of Gypsum Canyon.",
    },
    {
      q: "What does Anaheim require for a water heater replacement?",
      a: "A plumbing permit, reviewed by staff rather than issued online. The city's bulletin offers an over-the-counter plan check if you bring a gas-pipe isometric drawing in its format, requires a pressure test at final inspection on any new gas run over six feet, and requires planning and zoning approval for a heater moved outside the building.",
    },
  ],

  updated: "2026-09-20",
};
