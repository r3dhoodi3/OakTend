import type { CityContent } from "./types";

// Costa Mesa. Facts and sources: the city research file for this wave
// (scratchpad/cities/costa-mesa.md).
//
// The angle that makes this page not interchangeable: an older, denser,
// majority-renter city a mile from the water, split between two water
// districts, one of which stopped importing water altogether.
//
// NO MEDIAN YEAR BUILT FIELD. The only median-year figure the research found
// came from a secondary aggregator and could not be checked against the Census
// table, so the page says "the early 1970s" in prose and does not print a year
// as if it were a Census number.
//
// FACT CHECK 2026-09-19. Two fixes. The fire hazard card cited the Orange
// County Fire Authority, which does not serve this city: OCFA's member city
// list (https://ocfa.org/about-us/member-cities/) has no Costa Mesa on it, and
// the city runs its own department, Costa Mesa Fire & Rescue
// (https://www.costamesaca.gov/government/departments-and-divisions/fire-rescue).
// The card now cites the State Fire Marshal's fire hazard severity zone page.
// And "seven wells" was stale: Mesa Water's 2026 Consumer Confidence Report
// (2025 data) says the groundwater is pumped "via Mesa Water's nine wells",
// and that report is now the water source link.
//
// PERMIT CHECK 2026-09-25. The old permit source (the city's general forms
// page) now returns "Page Not Found", and two claims rested only on it or on
// inference: that application data must be typed straight into TESSA, and
// that an Insta-Permit skips plan review. Both are gone. The permit card and
// FAQ now cite the city's Insta-Permit page, which lists water heater (tank
// only, no tankless conversion or re-pipe) and HVAC (single-family, no
// roof-top equipment) Insta-Permits with contractor and owner-builder tracks.

export const costaMesa: CityContent = {
  name: "Costa Mesa",
  slug: "costa-mesa",
  intro:
    "Costa Mesa is unusual for Orange County in that most households rent, so maintenance questions come as often from owners of small older buildings as from single-family tracts. Its southern edge sits about a mile from the Pacific. Mesa Water, which serves most of the city, now pumps essentially all of its supply from local wells.",
  metaDescription:
    "Costa Mesa sits a mile from the coast, rents more than it owns, and drinks all-local well water. Insta-Permits, two water districts and river-edge hazards.",
  metaTitle: "Costa Mesa: older homes and two water districts",

  population: {
    value: "About 109,000 to 112,000 people",
    asOf: "2020 Census count and 2024 ACS estimates",
    sourceUrl: "https://www.census.gov/quickfacts/costamesacitycalifornia",
  },

  homes: {
    exposure: "near-coastal",
    facts: [
      {
        text: "Census-based estimates put owner occupancy near 40 percent, with roughly 60 percent of households renting. The housing skews older than the county's master-planned cities, with aggregated summaries placing the typical build year in the early 1970s.",
        sourceUrl:
          "https://www.point2homes.com/US/Neighborhood/CA/Costa-Mesa-Demographics.html",
        sourceLabel: "Point2Homes, aggregated Census ACS",
      },
      {
        text: "The city's southern border is about a mile from the ocean, in a semi-arid climate averaging roughly 11 inches of rain a year, nearly all of it in winter.",
        sourceUrl: "https://en.wikipedia.org/wiki/Costa_Mesa,_California",
        sourceLabel: "Wikipedia, city geography and climate",
      },
      {
        text: "Mesa Water District's 18-square-mile territory covers most of Costa Mesa plus part of Newport Beach and John Wayne Airport; Irvine Ranch Water District serves the rest of the city. Your district decides which water quality report applies to your house.",
        sourceUrl: "https://www.mesawater.org/about-us",
        sourceLabel: "Mesa Water District",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Eastside Costa Mesa",
      "Westside Costa Mesa",
      "Mesa Verde",
      "College Park",
      "South Coast Metro",
    ],
    note: "Mesa Verde, bounded by the 405, Harbor Boulevard, Victoria Street and the Santa Ana River, was built mainly in the 1960s and 1970s around Fairview Park and two golf courses. Eastside mixes Craftsman-era cottages with condos near the 17th Street strip. Westside, the historically industrial corner above Newport Beach, is being redeveloped with housing and live-work units, and South Coast Metro at the north end is high-rise and attached.",
    sourceUrl:
      "https://www.neighborhoods.com/blog/which-costa-mesa-neighborhood-is-right-for-you",
  },

  water: {
    utility: "Mesa Water District",
    utilityUrl: "https://www.mesawater.org/about-us",
    summary:
      "Mesa Water says it delivers 100 percent local groundwater from nine wells in the Orange County basin, buying from Metropolitan only as occasional backup since it finished its reliability facility. Hardness differs from Irvine Ranch's supply, and softener-sales figures are neither district's own, so take the number from your district's current report.",
    sourceUrl:
      "https://www.mesawater.org/sites/default/files/2026-06/final2026consumerconfidencereport.pdf",
  },

  permits: {
    office: "City of Costa Mesa Building Safety Division",
    portalUrl: "https://permits.costamesaca.gov/energov_prod/selfservice",
    summary:
      "Applications go through TESSA, the city's self-service portal. For a few simple jobs it offers an Insta-Permit: fill in the city's standard plan, pay the fee, and the permit arrives by email, with separate tracks for licensed contractors and owner-builders.",
    sourceUrl: "https://www.costamesaca.gov/trending/insta-permit",
  },

  hazards: [
    {
      text: "Costa Mesa has its own department, Costa Mesa Fire & Rescue, not the Orange County Fire Authority. The State Fire Marshal's hazard maps answer by location, and for a locally protected area like this the state says to contact the local jurisdiction.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
    {
      text: "Mello-Roos districts follow new master-planned construction, and Costa Mesa is older and essentially built out, so those assessments are less likely here than in newer South County communities. The county Treasurer-Tax Collector's lookup answers it for an address.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "Fairview Park and the western edge of Mesa Verde run along the Santa Ana River, and low ground near river channels is where Orange County liquefaction zones tend to be mapped. The state's Seismic Hazard Zone lookup covers it before foundation or addition work.",
      sourceUrl: "https://en.wikipedia.org/wiki/Mesa_Verde_(Costa_Mesa)",
      sourceLabel: "Wikipedia, Mesa Verde and the Santa Ana River",
    },
    {
      text: "Flood zoning near the river and along the lower-lying southern edge of the city varies by address; FEMA's Flood Map Service Center is the authoritative check.",
      sourceUrl: "https://msc.fema.gov/",
      sourceLabel: "FEMA Flood Map Service Center",
    },
  ],

  guides: [
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb: "Outdoor units a mile from the ocean take marine air year round.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb: "Hardness depends on which of the two districts serves your house.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb: "Early-1970s housing often has a panel sized before modern loads.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb: "Includes the exterior metal and paint checks a mile from the water calls for.",
    },
  ],

  neighbors: ["newport-beach", "huntington-beach", "santa-ana", "fountain-valley"],

  faq: [
    {
      q: "Does Costa Mesa's water heater Insta-Permit cover a switch to tankless?",
      a: "No. It covers changing out an existing tank water heater only. Converting to tankless or re-piping falls outside it.",
    },
    {
      q: "Can I use Costa Mesa's HVAC Insta-Permit for a rooftop unit?",
      a: "No. It covers replacing equipment in a single-family home with outdoor units at ground level on the side or rear of the house, not on the roof.",
    },
  ],

  updated: "2026-09-16",
};
