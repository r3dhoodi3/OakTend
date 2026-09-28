import type { CityContent } from "./types";

// Fountain Valley. Facts and sources: the city research file for this wave
// (scratchpad/cities/fountain-valley.md).
//
// The angle that makes this page not interchangeable: a city that went from
// farmland to built-out in a single decade, so its housing is all one age,
// sitting a few miles back from the Huntington Beach sand rather than on it.
//
// TWO NUMBERS ARE DELIBERATELY ABSENT. The median year built (aggregators say
// the early 1970s) could not be confirmed against Census table B25034, and the
// hardness figure the research found came from a regional reporting site
// rather than the city's own report. Neither is published here; the growth
// history and the city's own water quality report carry that weight instead.
//
// FACT CHECK 2026-09-19. The fire hazard card and FAQ cited the Orange County
// Fire Authority, which does not serve this city: OCFA's member city list
// (https://ocfa.org/about-us/member-cities/) has no Fountain Valley on it, and
// the city runs its own Fountain Valley Fire Department
// (https://www.fountainvalley.gov/1470/Fire-Department). Both now cite the
// State Fire Marshal's fire hazard severity zone page and name the city's own
// department, the way the Huntington Beach page does.

export const fountainValley: CityContent = {
  name: "Fountain Valley",
  slug: "fountain-valley",
  intro:
    "Fountain Valley incorporated in 1957 and grew more than 1,400 percent in the 1960s, so much of the city is one continuous stretch of 1960s and 1970s tract housing. It sits a few miles back from the Huntington Beach sand, directly over the Orange County groundwater basin.",
  metaDescription:
    "Fountain Valley went from farmland to built out in one decade. What that shared build age means for permits, hard basin water, flood checks and repairs.",
  metaTitle: "Fountain Valley: a city built in a single decade",

  population: {
    value: "About 56,000 to 57,000 people",
    asOf: "2020 Census count and 2024 ACS estimates",
    sourceUrl: "https://www.census.gov/quickfacts/fountainvalleycitycalifornia",
  },

  homes: {
    exposure: "near-coastal",
    facts: [
      {
        text: "The city counted about 2,068 residents in the 1960 Census and grew 1,441.9 percent by 1970 as tract housing replaced farmland. That is why maintenance here tends to arrive across a whole street rather than one house at a time.",
        sourceUrl: "https://en.wikipedia.org/wiki/Fountain_Valley,_California",
        sourceLabel: "Wikipedia, citing U.S. Census counts",
      },
      {
        text: "Fountain Valley has roughly 19,227 housing units, plus or minus 635, per the 2024 American Community Survey. It is a small, essentially built-out city.",
        sourceUrl:
          "https://censusreporter.org/profiles/16000US0625380-fountain-valley-ca/",
        sourceLabel: "Census Reporter, ACS 2024 five-year estimate",
      },
      {
        text: "About 64.8 percent of households own rather than rent, per 2024 ACS estimates. Long-term owners tend to keep a house well, and also tend to have deferred a repair for a long time.",
        sourceUrl: "https://datausa.io/profile/geo/fountain-valley-ca",
        sourceLabel: "Data USA, Census ACS",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Talbert",
      "Southpark",
      "Green Valley",
      "Stratford Homes",
      "Los Caballeros",
      "Mile Square Park area",
    ],
    note: "The city has no formal neighborhood map. Talbert, at Talbert Avenue and Bushard Street, is the original settlement, once called Gospel Swamp before drainage canals made it farmable. Green Valley, Stratford Homes, Los Caballeros and the tracts around the 640-acre Mile Square Regional Park are the names people use for the residential areas.",
    sourceUrl:
      "https://www.sailproperties.com/property-management-blog/exploring-the-best-neighborhoods-in-fountain-valley-ca-a-guide-to-living-in-a-hidden-oc-gem",
  },

  water: {
    utility: "City of Fountain Valley Public Works Water Division",
    utilityUrl:
      "https://www.fountainvalley.gov/DocumentCenter/View/20813/2024-Water-Quality-Report",
    summary:
      "Fountain Valley is its own retail water utility and a member agency of the Municipal Water District of Orange County, which is headquartered here on Ward Street. The Orange County Water District's Talbert barrier, which keeps seawater out of the groundwater basin, runs through Fountain Valley and Huntington Beach. The water is hard; the city's annual water quality report lists the current figure for sizing a softener.",
    sourceUrl:
      "https://www.fountainvalley.gov/DocumentCenter/View/20813/2024-Water-Quality-Report",
  },

  permits: {
    office: "City of Fountain Valley Building Division",
    portalUrl: "https://fountainvalley.cts.city",
    summary:
      "Applications go through the city's ePlan and Permit Center: create an account, upload PDF plans and pay by card. Water heater change-outs and standard furnace and air conditioner change-outs are expedited categories, each still needing a site plan.",
    sourceUrl: "https://www.fountainvalley.gov/398/Plan-Check-Center",
  },

  hazards: [
    {
      text: "The city has its own Fountain Valley Fire Department rather than the Orange County Fire Authority. The State Fire Marshal's Fire Hazard Severity Zone maps answer by location, and for a locally protected area the state says to ask the local jurisdiction, here the city's fire department.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
    {
      text: "Most housing went up in the 1960s and 1970s, before the 1982 law that created Mello-Roos districts, so those special taxes are unusual here. The county Treasurer-Tax Collector's lookup, or the special assessment line on your tax bill, gives the answer for an address.",
      sourceUrl: "https://www.octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "No city-specific liquefaction map was found, but the original settlement was Gospel Swamp, boggy ground farmed only after drainage canals went in, and low, formerly wet land is what the state maps for liquefaction. Run the state's Seismic Hazard Zone lookup before foundation, drainage or addition work.",
      sourceUrl: "https://en.wikipedia.org/wiki/Fountain_Valley,_California",
      sourceLabel: "Wikipedia, Fountain Valley history",
    },
    {
      text: "The city borders the Santa Ana River and was wetland before it was farmland, so flood zoning varies by address. FEMA's Flood Map Service Center is the authoritative check, and the answer affects insurance.",
      sourceUrl: "https://msc.fema.gov/portal/search",
      sourceLabel: "FEMA Flood Map Service Center",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "Signs a panel sized for a 1970s household is not keeping up with a modern one.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "Catching one early in a 1960s slab-foundation tract home, before the water bill does.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Hard basin water scales tanks early here; what a replacement costs.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "The seasonal list, including what marine air a few miles inland actually does.",
    },
  ],

  neighbors: ["huntington-beach", "costa-mesa", "santa-ana", "westminster"],

  faq: [
    {
      q: "Can every Fountain Valley permit be filed online?",
      a: "No. Anything that needs Fire Department review has to go in as paper plans through the Building Division instead of the ePlan portal.",
    },
    {
      q: "Does Fountain Valley get the same salt air Huntington Beach does?",
      a: "Less of it. The city borders Huntington Beach a few miles back from the sand, so marine air still ages paint, metal and outdoor equipment faster than in Anaheim or Santa Ana, without a beachfront street's daily salt load.",
    },
  ],

  updated: "2026-09-16",
};
