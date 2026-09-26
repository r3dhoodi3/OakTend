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
    "Ladera Ranch is not a city: it is an unincorporated community governed by the County of Orange, so the county is the building department and a master homeowners association, LARMAC, reviews anything you change on the outside of the house. It was also built almost all at once. The association's own timeline has the first resident moving in on December 14, 1999 and the community selling out, apart from custom lots, by April 2007, and the census file agrees: about 83 percent of the homes date from 2000 to 2009. Whole streets reach the same age together here, on water the district measures at 15 grains per gallon and inside a ring of state fire hazard zones.",
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
        text: "Ladera Ranch's median year built is 2005. Of about 7,716 housing units in the census designated place, roughly 83.3 percent went up from 2000 to 2009, 5.7 percent in the 1990s and 6.9 percent since 2010; about 56.6 percent are detached houses and 24.8 percent attached. These are survey estimates, and the few percent the survey assigns to decades before 1990 are best read as sampling noise. A house from this decade is now about 17 to 26 years old: the first water heater is usually gone already, and the original air conditioner, furnace, garage door opener and exterior paint tend to come due on the same few streets in the same few years.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25034&geo_ids=16000US0639114",
        sourceLabel:
          "Census Reporter, ACS 2024 5-year tables B25034, B25035 and B25024",
      },
      {
        text: "The master association's own timeline dates the community precisely. Sales tours of bare dirt began in August 1999, the first resident moved in on December 14, 1999, 3,987 homes had sold by April 2003, and in April 2007, at 6,585 homes, the timeline says Ladera Ranch sells out except for custom lots. The association describes the result as a 4,000 acre master planned community organized into six villages and three districts.",
        sourceUrl: "https://laderalife.com/about/explore-ladera-ranch",
        sourceLabel: "LaderaLife.com (LARMAC and LARCS), Ladera Ranch through the years",
      },
      {
        text: "There is no city hall. The County of Orange's hazard plan lists Ladera Ranch among the planned communities in southern Orange County that county government serves directly, and the county places it in the Fifth Supervisorial District. The Ladera Ranch Civic Council describes itself as a private, volunteer nonprofit created in 2009 after the 2007 and 2008 protest over a proposed 47-megawatt peaker plant; it says plainly that it has no legal authority and that it advises the district supervisor. Police service comes from the Orange County Sheriff's Department, whose South Patrol lists Ladera Ranch among the unincorporated areas it covers.",
        sourceUrl: "https://bos5.oc.gov/fifth-district/overview",
        sourceLabel: "County of Orange, Fifth District overview",
      },
      {
        text: "Exterior work answers to two separate bodies. LARMAC, the Ladera Ranch Maintenance Corporation, says its Aesthetics Review Committee must approve all plans for architectural or landscaping modifications before they are made, from paint (a master palette of 125 schemes) to patio covers and solar panels, whose frames must be black or compatible with the roof color. Its standards also say committee approval is not a building department or County approval and that pulling building permits is the job of the homeowner and their contractor. Plan for both reviews before you sign a contract with a start date.",
        sourceUrl: "https://laderalife.com/aesthetic-standards",
        sourceLabel: "LARMAC Aesthetic Standards, adopted June 2024",
      },
      {
        text: "Fire and paramedic service comes from the Orange County Fire Authority, which says it serves 23 cities and all unincorporated areas of the county. Its Station 58 is inside the community at 58 Station Way: the authority lists it as a career station established in 2003 with Medic Engine 58, and as the headquarters of its Division 3, with the division chief on the daily staffing and a bulldozer, Dozer 3, on the apparatus list.",
        sourceUrl: "https://ocfa.org/about-us/departments/operations/",
        sourceLabel: "Orange County Fire Authority, Operations and station directory",
      },
      {
        text: "Santa Margarita Water District handles what goes down the drain as well as what comes out of the tap. The district says wastewater from Ladera Ranch flows to its Chiquita Water Reclamation Plant, through a collection system of more than 665 miles of pipe. It also delivers recycled water to parks, medians, slopes and schools in Ladera Ranch, and says recycled water meets 25 percent of its total demand. That irrigation supply is a separate system from the drinking water line to your house.",
        sourceUrl: "https://www.smwd.com/310/Wastewater",
        sourceLabel: "Santa Margarita Water District, Wastewater and Recycled Water pages",
      },
      {
        text: "The association's standards carry a plain warning about the ground: because of the nature of soils in south Orange County, they say, you should install steel reinforcement in concrete slabs and provide score lines or expansion joints to reduce cracking. They also require drainage devices and an outlet to the street through a curb core wherever new hardscape or planting would interrupt drainage to the street, and area drains in private yards. When a patio or side yard is redone, the drains matter as much as the finish.",
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
    note: "These are the village names the master association attaches to its clubhouses. Its timeline has the Oak Knoll Clubhouse opening in March 2000, Avendale's in June 2002, and the Flintridge and Covenant Hills clubhouses in December 2004. The association places Covenant Hills in the southeastern area of the community, and custom homesites there go through a separate design review. It says there are six villages and three districts in all, but the pages we could open do not name the others as villages (Terramor appears as an aquatic park and Bridgepark as a plaza), so they are not listed.",
    sourceUrl: "https://laderalife.com/amenities/clubhouses",
  },

  water: {
    utility: "Santa Margarita Water District",
    utilityUrl: "https://www.smwd.com/",
    summary:
      "Santa Margarita Water District supplies Ladera Ranch: the district's announcement of its 2026 Water Quality Report, which covers 2025, names Ladera Ranch among the communities the report is for. The report says the supply is all imported surface water: treated water from the Metropolitan Water District, which draws on the Colorado River and the State Water Project, and treated water from Irvine Ranch Water District's Baker Water Treatment Plant, which also uses Santiago Reservoir (Irvine Lake). Across the district's own distribution system in 2025, hardness averaged 256 ppm, or 15 grains per gallon, with a range of 210 to 300 ppm (12.3 to 17.5 grains). By source, Baker plant water averaged 293 ppm, 17 grains, with a range of 269 to 322 ppm, and Metropolitan water averaged 236 ppm, 14 grains, with a range of 191 to 280 ppm. That is very hard water, and the report itself notes that white scaling on faucets and showerheads may be caused by high levels of calcium carbonate. The district also reports that lead was not detected in any of the 52 homes it sampled at the tap in 2024.",
    sourceUrl:
      "https://ear.waterboards.ca.gov/Home/ViewCCR?PwsID=CA3010101&Year=2025&isCert=false",
  },

  permits: {
    office: "County of Orange, OC Development Services (OC Public Works)",
    portalUrl: "https://myoceservices.ocgov.com/",
    summary:
      "Ladera Ranch has no city building department: the County of Orange is the building department, through OC Development Services, which issues permits for the unincorporated areas. The county's permit FAQ says to apply online at myOCeServices.ocgov.com by creating an account and choosing permit applications. The public counter is on the first floor at 601 N. Ross Street in Santa Ana, open 8:00 AM to 4:00 PM Monday through Friday, and the main number is 714-667-8888, with 714-667-8811 for inspection questions. The FAQ says the property owner or an authorized agent, meaning a licensed contractor or someone holding a notarized letter from the owner, may obtain a permit, and that a permit expires if work has not started within one year of issuance, with one extension of up to 180 days. The county's residential handout adds that building permits are also required for re-roofing and that it is always wise to have the contractor obtain the permit. Approval from LARMAC is a separate step and does not replace a county permit.",
    sourceUrl:
      "https://pwds.oc.gov/service-areas/oc-development-services/permitting-services/faqs",
  },

  hazards: [
    {
      text: "The County of Orange says CAL FIRE released the updated Fire Hazard Severity Zone map for the unincorporated areas on March 24, 2025, and that the Board of Supervisors adopted it by Ordinance No. 25-015 on August 26, 2025. On that map the built-up middle of Ladera Ranch is unzoned, wrapped by Moderate and High bands, with the Very High tier running along the eastern edge and the north end of the community; the open land along Arroyo Trabuco on the west side sits in the state's own High zone. The county adds that buildings constructed in a Very High zone must use the fire-resistive features of California Building Code Chapter 7A. The zone is set parcel by parcel, so look up your address in the State Fire Marshal's viewer, which the county page links.",
      sourceUrl:
        "https://pwds.oc.gov/service-areas/oc-development-services/planning-development/current-projects/all-districts-projects/orange-county-fire-hazard-severity-zones-map",
      sourceLabel: "OC Development Services, Orange County Fire Hazard Severity Zones Map",
    },
    {
      text: "Brush fires do start close to the houses. On Tuesday, July 7, 2026, a brush fire started about 4:45 p.m. at Narrow Canyon Road and Acaster Way in Ladera Ranch, according to an Orange County Fire Authority captain quoted by MyNewsLA, who said at 6 p.m. that crews had stopped the spread toward homes. The authority declared the fire under control at 6:27 p.m. If the slope behind your fence is association land, LARMAC takes reports through its online maintenance request form; your own side of the fence is yours to keep clear.",
      sourceUrl:
        "https://mynewsla.com/orange-county/2026/07/07/orange-county-fire-authority-firefighters-control-blaze-in-ladera-ranch-2/",
      sourceLabel: "MyNewsLA, July 7, 2026",
    },
    {
      text: "The California Geological Survey's seismic hazard zone maps for this area, the San Juan Capistrano quadrangle released December 21, 2001 and the Canada Gobernadora quadrangle released September 23, 2002, place earthquake-induced landslide zones over a large share of the land inside Ladera Ranch and a liquefaction zone along Arroyo Trabuco on the west side. Both release dates fall in the years when the community was still being built. The state's Alquist-Priolo fault zone layer shows no fault zone inside the community's census boundary. The survey explains that a mapped zone means a site-specific geotechnical investigation before new development is permitted, and a Natural Hazard Disclosure Statement when a property in a zone is sold; its EQ Zapp tool checks a single address.",
      sourceUrl: "https://www.conservation.ca.gov/cgs/sh/seismic-hazard-zones",
      sourceLabel: "California Geological Survey, Seismic Hazard Zones",
    },
    {
      text: "Flood risk here is narrow and low-lying. FEMA's National Flood Hazard Layer puts nearly all of Ladera Ranch in Zone X, its area of minimal flood hazard, and shows Special Flood Hazard Areas (Zones A and AE, with a floodway) only along the creek bottom on the western edge. The USGS National Hydrography Dataset names that stream Arroyo Trabuco and names Horno Creek as the drainage running through the middle of the community. For most lots the water to manage is your own: roof runoff, yard drains and the swales on the slope behind the fence.",
      sourceUrl:
        "https://msc.fema.gov/portal/search?AddressQuery=Ladera%20Ranch%2C%20CA",
      sourceLabel: "FEMA Flood Map Service Center, National Flood Hazard Layer",
    },
    {
      text: "Ladera Ranch carries Mello-Roos special taxes. The County of Orange formed six community facilities districts for Ladera Ranch, numbered 99-1, 2000-1, 2001-1, 2002-1, 2003-1 and 2004-1, and its finance office filed annual bond reports for all six for the fiscal year that ended June 30, 2025, so the bonds are still being repaid. The Fifth District supervisor's office says the Board voted on October 4, 2022 to study refinancing the bonds, and the county's annual reports show refunding bonds for districts 2002-1, 2003-1 and 2004-1 issued on May 18, 2023; the supervisor's page says the refinanced bonds sunset in 2034. Which district a house is in, and what it pays, is on the tax bill.",
      sourceUrl: "https://cfo.oc.gov/page/2026-continuing-disclosure-reports",
      sourceLabel: "County of Orange, 2026 continuing disclosure reports (Ladera Ranch districts)",
    },
  ],

  guides: [
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair still makes sense, on district water that averaged 15 grains per gallon in 2025.",
    },
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a system runs when the original equipment dates from 2000 to 2009, as about 83 percent of the homes here do.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, where the county requires a permit to re-roof and the association reviews what shows.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including yard drains before winter and brush on the fence line before Santa Ana season.",
    },
  ],

  neighbors: ["mission-viejo", "san-juan-capistrano"],

  faq: [
    {
      q: "Is Ladera Ranch a city?",
      a: "No. Ladera Ranch is an unincorporated community, counted by the census as a census designated place, and the County of Orange governs it as part of the Fifth Supervisorial District. There is no city council or city hall. The Ladera Ranch Civic Council is a volunteer nonprofit that advises the district supervisor and says itself that it has no legal authority, and LARMAC, the master homeowners association, maintains the common areas and reviews exterior changes. Building permits come from the county.",
    },
    {
      q: "Is Ladera Ranch water hard?",
      a: "Yes, very. Santa Margarita Water District's report for 2025 shows hardness across its distribution system averaging 256 ppm, or 15 grains per gallon, with a range of 210 to 300 ppm. The supply is all imported: Metropolitan water averaged 14 grains per gallon and water from the Baker Water Treatment Plant averaged 17. Flush a tank water heater once a year and descale a tankless unit on the manufacturer's schedule.",
    },
    {
      q: "Who provides fire service in Ladera Ranch?",
      a: "The Orange County Fire Authority, which says it serves 23 cities and all unincorporated areas of the county. Its Station 58 is inside the community at 58 Station Way. The authority lists it as a career station established in 2003 with Medic Engine 58, and as the headquarters of its Division 3. Law enforcement is the Orange County Sheriff's Department, through its South Patrol.",
    },
    {
      q: "Do I need a permit to replace a water heater or reroof in Ladera Ranch?",
      a: "The county's own materials treat both as permitted work. Its permit FAQ lists a water heater under residential flat fee permits, closed out with a plumbing final inspection, and lists a re-roof permit whose first inspection is roof sheathing and framing; its residential handout says building permits are required for re-roofing. Apply through the county's myOCeServices portal or call OC Development Services at 714-667-8888. A licensed plumber or roofer normally pulls the permit as part of the job, and LARMAC's standards say exterior modifications need its review committee's approval as well.",
    },
    {
      q: "Is my Ladera Ranch home in a fire hazard severity zone?",
      a: "It depends how close you are to the edge. On the State Fire Marshal's March 24, 2025 map, which the Board of Supervisors adopted on August 26, 2025, the built-up middle of Ladera Ranch is unzoned, Moderate and High bands wrap around it, and the Very High tier runs along the eastern edge and the north end. The county says buildings constructed in a Very High zone must meet the Chapter 7A wildfire construction standards. Zones are set by parcel, so check your address in the viewer linked from the county's page.",
    },
    {
      q: "Do Ladera Ranch homes pay Mello-Roos?",
      a: "Homes inside one of the county's Ladera Ranch districts do. The County of Orange formed six community facilities districts for Ladera Ranch, numbered 99-1 through 2004-1, and was still filing annual bond reports for all six for the fiscal year that ended June 30, 2025. The county's reports show refunding bonds for three of them, 2002-1, 2003-1 and 2004-1, issued on May 18, 2023, and the Fifth District supervisor's office says the refinanced bonds sunset in 2034. The district and the amount for a given house are printed on its property tax bill.",
    },
  ],

  updated: "2026-09-20",
};
