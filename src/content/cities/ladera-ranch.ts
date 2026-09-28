import type { CityContent } from "./types";

// Ladera Ranch. Researched 2026-09-20 for the fourth city wave. Every number
// below was read from the source document itself, not from a search summary.
//
// NOT A CITY. Ladera Ranch is an unincorporated community and a census
// designated place (geoid 16000US0639114). The County of Orange governs it
// (Fifth Supervisorial District): OC Development Services issues the permits,
// the Sheriff's Department patrols it, the Orange County Fire Authority covers
// it, Santa Margarita Water District handles water and sewer, and the master
// association LARMAC reviews exterior changes. The page component labels the
// permits source link "City building division"; the link goes to the county
// and the summary says so in its first sentence.
//
// The angle that makes this page not interchangeable: a community built in one
// decade. The association's timeline runs from the first resident on December
// 14, 1999 to "sells out except for custom lots" in April 2007, and the census
// file puts about 83 percent of the homes in 2000 to 2009. Whole streets reach
// the same age together, under two layers of review (county permit, LARMAC
// approval), inside a ring of state fire hazard zones.
//
// WATER NUMBERS are from Santa Margarita Water District's 2026 Water Quality
// Report (reporting year 2025). The smwd.com copy and the State Water Board
// portal copy (PwsID CA3010101) are the same file, byte for byte. The report
// prints grains per gallon itself, so nothing here is a conversion.
//
// MAP READINGS. Three hazard facts are our reading of official map layers
// against the census boundary, not sentences from a report: the State Fire
// Marshal's fire hazard layers (the data the county's adopted map prints), the
// California Geological Survey's seismic hazard zone layers, and FEMA's
// National Flood Hazard Layer, with stream names from the USGS National
// Hydrography Dataset. They are described in words only, no acreages.
//
// LEFT OUT ON PURPOSE. Acreage and unit totals from the 1990s county approval
// (Wikipedia and a developer case study only), Echo Ridge, Township, Bridgepark
// and Terramor as village names (the association pages we could open name four
// village clubhouses, a Terramor park and a Bridgepark plaza), the Capistrano
// Unified school facilities district and the Cristianitos fault (no primary
// source opened), the acreage of the July 2026 brush fire (the news report and
// the fire authority's own post disagree), climate averages, the fire
// authority's station page wording "City of Ladera Ranch", and the per-parcel
// savings from the 2023 bond refunding (that county staff report is served
// over plain http only).

export const laderaRanch: CityContent = {
  name: "Ladera Ranch",
  slug: "ladera-ranch",
  intro:
    "Ladera Ranch is an unincorporated community, so the County of Orange is the building department and a master homeowners association, LARMAC, reviews changes to the outside of the house. It went up almost at once: the first resident moved in on December 14, 1999, the community sold out apart from custom lots by April 2007, and about 83 percent of the homes date from 2000 to 2009.",
  metaDescription:
    "Ladera Ranch is unincorporated: county permits, LARMAC review, 83 percent of homes from 2000 to 2009, 15 grain water and fire zones on the edges, sourced.",
  metaTitle: "Ladera Ranch, CA: 2000s homes, county-run permits",

  population: {
    value: "About 23,793 people",
    asOf: "ACS 2024 5-year estimate (2020-2024), table B01003, for the Ladera Ranch census designated place; the margin of error is plus or minus 1,273",
    sourceUrl:
      "https://censusreporter.org/data/table/?table=B01003&geo_ids=16000US0639114",
    sourceLabel: "Census Reporter, ACS 2024 5-year table B01003",
  },

  homes: {
    exposure: "inland",
    medianYearBuilt: "2005",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0639114",
      sourceLabel: "Census Reporter, ACS 2024 5-year table B25035",
    },
    facts: [
      {
        text: "Of about 7,716 housing units in the census designated place, roughly 83.3 percent went up from 2000 to 2009, 5.7 percent in the 1990s and 6.9 percent since 2010; about 56.6 percent are detached houses and 24.8 percent attached. At 17 to 26 years old, the original air conditioners, furnaces, garage door openers and exterior paint tend to come due on the same streets in the same few years.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639114",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "Sales tours of bare dirt began in August 1999, 3,987 homes had sold by April 2003, and in April 2007, at 6,585 homes, the master association's timeline says Ladera Ranch sold out except for custom lots. The association describes a 4,000 acre master planned community of six villages and three districts.",
        sourceUrl: "https://laderalife.com/about/explore-ladera-ranch",
        sourceLabel: "LaderaLife.com (LARMAC and LARCS), Ladera Ranch through the years",
      },
      {
        text: "There is no city hall. The County of Orange lists Ladera Ranch among the southern Orange County planned communities that county government serves directly, in the Fifth Supervisorial District.",
        sourceUrl: "https://bos5.oc.gov/fifth-district/overview",
        sourceLabel: "County of Orange, Fifth District overview",
      },
      {
        text: "LARMAC's Aesthetics Review Committee must approve architectural and landscaping changes before they are made, from paint (a master palette of 125 schemes) to patio covers and solar panels, whose frames must be black or match the roof. Its standards say that approval is not County approval, and that pulling building permits is the homeowner's and contractor's job.",
        sourceUrl: "https://laderalife.com/aesthetic-standards",
        sourceLabel: "LARMAC Aesthetic Standards, adopted June 2024",
      },
      {
        text: "The Orange County Fire Authority serves all unincorporated areas of the county. Its Station 58 at 58 Station Way, a career station established in 2003 with Medic Engine 58, is the headquarters of Division 3 and keeps a bulldozer, Dozer 3.",
        sourceUrl: "https://ocfa.org/about-us/departments/operations/",
        sourceLabel: "Orange County Fire Authority, Operations and station directory",
      },
      {
        text: "Santa Margarita Water District also takes the wastewater, sending it through more than 665 miles of pipe to its Chiquita Water Reclamation Plant. It delivers recycled water, 25 percent of its total demand, to parks, medians, slopes and schools here, on a system separate from the drinking water line to your house.",
        sourceUrl: "https://www.smwd.com/310/Wastewater",
        sourceLabel: "Santa Margarita Water District, Wastewater and Recycled Water pages",
      },
      {
        text: "Because of south Orange County soils, the association's standards say to put steel reinforcement in concrete slabs and score lines or expansion joints to limit cracking. They also require drainage devices with a curb-core outlet to the street wherever new hardscape or planting would block drainage, and area drains in private yards.",
        sourceUrl:
          "https://laderalife.com/upload/FormsAndDocument/Document/2024-06/LARMAC%20Aesthetic%20Standards%20%20ADOPTED%206.12.24.pdf",
        sourceLabel: "LARMAC Aesthetic Standards, adopted June 2024 (PDF)",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Oak Knoll Village",
      "Avendale Village",
      "Flintridge Village",
      "Covenant Hills",
    ],
    note: "These are the villages the master association names for its clubhouses: Oak Knoll's opened in March 2000, Avendale's in June 2002, and Flintridge's and Covenant Hills' in December 2004. Covenant Hills is in the southeast, and its custom homesites go through a separate design review. The association counts six villages and three districts, but its pages do not name the others as villages.",
    sourceUrl: "https://laderalife.com/amenities/clubhouses",
  },

  water: {
    utility: "Santa Margarita Water District",
    utilityUrl: "https://www.smwd.com/",
    summary:
      "Santa Margarita Water District's report on 2025 names Ladera Ranch among the communities it serves, and the supply is all imported surface water: Metropolitan Water District water from the Colorado River and State Water Project, plus Irvine Ranch Water District's Baker plant, which also draws on Irvine Lake. Hardness across the district averaged 256 ppm, or 15 grains per gallon, ranging from 210 to 300 ppm; Baker water averaged 17 grains and Metropolitan water 14. Lead was not detected in any of the 52 homes sampled at the tap in 2024.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010101&Year=2025&isCert=false",
  },

  permits: {
    office: "County of Orange, OC Development Services (OC Public Works)",
    portalUrl: "https://myoceservices.ocgov.com/",
    summary:
      "OC Development Services issues permits for the unincorporated county, online at myOCeServices.ocgov.com or at the counter at 601 N. Ross Street in Santa Ana, 8:00 AM to 4:00 PM weekdays; call 714-667-8888, or 714-667-8811 for inspections. The owner, a licensed contractor or someone with a notarized letter from the owner can pull one. A permit expires if work has not started within one year, with one extension of up to 180 days, and re-roofing needs one. LARMAC approval is a separate step.",
    sourceUrl:
      "https://pwds.oc.gov/service-areas/oc-development-services/permitting-services/faqs",
  },

  hazards: [
    {
      text: "The Board of Supervisors adopted CAL FIRE's March 24, 2025 fire hazard map for the unincorporated county by Ordinance No. 25-015 on August 26, 2025. On it the built-up middle of Ladera Ranch is unzoned, wrapped by Moderate and High bands, with Very High along the eastern edge and north end and the state's own High zone on the Arroyo Trabuco open land to the west. New buildings in a Very High zone must meet California Building Code Chapter 7A.",
      sourceUrl:
        "https://pwds.oc.gov/service-areas/oc-development-services/planning-development/current-projects/all-districts-projects/orange-county-fire-hazard-severity-zones-map",
      sourceLabel: "OC Development Services, Orange County Fire Hazard Severity Zones Map",
    },
    {
      text: "On July 7, 2026, a brush fire started about 4:45 p.m. at Narrow Canyon Road and Acaster Way; an Orange County Fire Authority captain said crews had stopped its spread toward homes by 6 p.m., and it was under control at 6:27 p.m. LARMAC takes reports about association slopes through its online maintenance request form.",
      sourceUrl:
        "https://mynewsla.com/orange-county/2026/07/07/orange-county-fire-authority-firefighters-control-blaze-in-ladera-ranch-2/",
      sourceLabel: "MyNewsLA, July 7, 2026",
    },
    {
      text: "State seismic hazard maps for the San Juan Capistrano (2001) and Canada Gobernadora (2002) quadrangles, released while the community was being built, put earthquake-induced landslide zones over a large share of Ladera Ranch and a liquefaction zone along Arroyo Trabuco. No Alquist-Priolo fault zone falls inside the census boundary. A mapped zone means a geotechnical study before new development and a disclosure at sale.",
      sourceUrl: "https://www.conservation.ca.gov/cgs/sh/seismic-hazard-zones",
      sourceLabel: "California Geological Survey, Seismic Hazard Zones",
    },
    {
      text: "FEMA puts nearly all of Ladera Ranch in Zone X, minimal flood hazard, with Special Flood Hazard Areas and a floodway only along the creek bottom on the western edge. The USGS National Hydrography Dataset names that stream Arroyo Trabuco, and Horno Creek the drainage through the middle of the community.",
      sourceUrl:
        "https://msc.fema.gov/portal/search?AddressQuery=Ladera%20Ranch%2C%20CA",
      sourceLabel: "FEMA Flood Map Service Center, National Flood Hazard Layer",
    },
    {
      text: "The county formed six Mello-Roos community facilities districts here, 99-1, 2000-1, 2001-1, 2002-1, 2003-1 and 2004-1, and filed bond reports for all six for the year ended June 30, 2025. Refunding bonds for 2002-1, 2003-1 and 2004-1 were issued on May 18, 2023, after a Board vote on October 4, 2022, and the Fifth District office says the refinanced bonds sunset in 2034. The tax bill shows a home's district and amount.",
      sourceUrl: "https://cfo.oc.gov/page/2026-continuing-disclosure-reports",
      sourceLabel: "County of Orange, 2026 continuing disclosure reports (Ladera Ranch districts)",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "District water averaged 15 grains per gallon in 2025, hard on tanks.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "About 83 percent of homes here, and most original systems, date from 2000 to 2009.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb: "The county permits every re-roof, and LARMAC reviews what shows from the street.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Clear yard drains before winter and fence-line brush before Santa Ana season.",
    },
  ],

  neighbors: ["mission-viejo", "san-juan-capistrano"],

  faq: [
    {
      q: "Who represents Ladera Ranch without a city council?",
      a: "The Fifth District county supervisor. The Ladera Ranch Civic Council, a volunteer nonprofit formed in 2009 after the 2007 and 2008 protest over a proposed 47-megawatt peaker plant, advises the supervisor but says it has no legal authority. Police service comes from the Orange County Sheriff's Department's South Patrol.",
    },
    {
      q: "What inspections does a water heater or re-roof get in Ladera Ranch?",
      a: "A water heater is a county flat fee permit closed out with a plumbing final inspection. A re-roof permit's first inspection is the roof sheathing and framing, per the county's permit FAQ.",
    },
  ],

  updated: "2026-09-20",
};
