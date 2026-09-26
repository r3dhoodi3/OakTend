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
    "Costa Mesa's southern edge sits about a mile from the Pacific, close enough for marine mornings and some coastal wear without a beachfront's direct salt load. Its housing skews older than the Orange County average and, unusually for this county, most Costa Mesa households rent rather than own, so the maintenance questions here come as often from owners of small older buildings as from single-family tracts. Two water districts split the city, and Mesa Water, which serves most of it, now pumps essentially all of its supply from local wells instead of importing it.",
  metaDescription:
    "Costa Mesa sits a mile from the coast, rents more than it owns, and drinks all-local groundwater. Permits, water, hazards, with sources.",
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
        text: "Costa Mesa is unusual for Orange County in that most households rent: Census-based estimates put owner occupancy near 40 percent, with roughly 60 percent renting. The housing itself skews older than the county's master-planned cities, with aggregated Census summaries placing the typical build year in the early 1970s rather than a specific, verifiable year.",
        sourceUrl:
          "https://www.point2homes.com/US/Neighborhood/CA/Costa-Mesa-Demographics.html",
        sourceLabel: "Point2Homes, aggregated Census ACS",
      },
      {
        text: "The city's southern border is about a mile from the ocean, in a semi-arid climate that averages roughly 11 inches of rain a year, nearly all of it in winter. That is close enough for marine-layer mornings and faster wear on exterior metal and paint, and far enough back that the constant salt load of a beachfront street is not the daily condition here.",
        sourceUrl: "https://en.wikipedia.org/wiki/Costa_Mesa,_California",
        sourceLabel: "Wikipedia, city geography and climate",
      },
      {
        text: "Most of Costa Mesa is served by Mesa Water District, whose 18-square-mile territory covers most of the city plus part of Newport Beach and John Wayne Airport, while Irvine Ranch Water District serves other parts of the city. Which district you are on decides which water quality report actually applies to your house, and the two do not report the same numbers.",
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
    note: "These are genuinely different housing, not just different addresses. Mesa Verde, bounded by the 405, Harbor Boulevard, Victoria Street and the Santa Ana River, was built out mainly in the 1960s and 1970s around Fairview Park and two golf courses. Eastside mixes Craftsman-era cottages with condos near the 17th Street strip. Westside is the historically industrial corner above Newport Beach, now being redeveloped with housing and live-work units, and South Coast Metro at the north end is high-rise and attached rather than single-family.",
    sourceUrl:
      "https://www.neighborhoods.com/blog/which-costa-mesa-neighborhood-is-right-for-you",
  },

  water: {
    utility: "Mesa Water District",
    utilityUrl: "https://www.mesawater.org/about-us",
    summary:
      "Mesa Water District serves most of Costa Mesa and says it now delivers 100 percent local groundwater from nine wells in the Orange County basin, buying from Metropolitan only as occasional backup since it finished its reliability facility. The rest of the city sits in Irvine Ranch Water District instead. Hardness differs between the two supplies, and the figures floating around water-softener sales sites are not either district's own, so pull the current number from your district's water quality report before you size anything.",
    sourceUrl:
      "https://www.mesawater.org/sites/default/files/2026-06/final2026consumerconfidencereport.pdf",
  },

  permits: {
    office: "City of Costa Mesa Building Safety Division",
    portalUrl: "https://permits.costamesaca.gov/energov_prod/selfservice",
    summary:
      "Costa Mesa takes permit applications online through TESSA, its self-service portal. For a few simple jobs the city offers an Insta-Permit: you fill in the city's standard plan in TESSA, pay the fee, and the permit arrives by email. Two of them matter most for homeowners. The water heater Insta-Permit covers changing out an existing tank water heater only, not a switch to tankless or any re-piping. The HVAC Insta-Permit covers replacing equipment in a single-family home, with outdoor units at ground level on the side or rear of the house, not on the roof. Each has separate tracks for licensed contractors and owner-builders.",
    sourceUrl: "https://www.costamesaca.gov/trending/insta-permit",
  },

  hazards: [
    {
      text: "Costa Mesa is protected by its own city department, Costa Mesa Fire & Rescue, not by the Orange County Fire Authority. For fire hazard zoning the source is the State Fire Marshal's Fire Hazard Severity Zone maps, which answer by location rather than by city, and for a locally protected area the state says to contact the local jurisdiction. That is the honest answer to give here rather than a reassuring citywide sentence: look your own parcel up.",
      sourceUrl:
        "https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones",
      sourceLabel: "Cal Fire, Office of the State Fire Marshal",
    },
    {
      text: "Mello-Roos districts follow new master-planned construction, and Costa Mesa is an older, essentially built-out city, so the assessments common in newer South County communities are less likely here. It is still decided parcel by parcel: the county Treasurer-Tax Collector's lookup, or the special assessment charges line on your tax bill, is the only real answer for an address.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "Fairview Park and the western edge of Mesa Verde run along the Santa Ana River, and low ground near river channels is where liquefaction zones tend to be mapped in Orange County. The California Geological Survey publishes those zones with an address lookup, worth running before foundation, drainage or addition work.",
      sourceUrl: "https://en.wikipedia.org/wiki/Mesa_Verde_(Costa_Mesa)",
      sourceLabel: "Wikipedia, Mesa Verde and the Santa Ana River",
    },
    {
      text: "Flood zoning near the river and the lower-lying southern edge of the city is an address-level question, not a citywide one. FEMA's Flood Map Service Center is the authoritative check, and the answer affects insurance as well as what a remodel has to account for.",
      sourceUrl: "https://msc.fema.gov/",
      sourceLabel: "FEMA Flood Map Service Center",
    },
  ],

  guides: [
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a system runs, and central AC versus a heat pump, with the Insta-Permit path in mind.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical price range and when a repair is still the smarter call on an older tank.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "The big-ticket item in a home built before modern loads existed, and how to tell yours is undersized.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including what a mile from the water does to exteriors.",
    },
  ],

  neighbors: ["newport-beach", "huntington-beach", "santa-ana", "fountain-valley"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater or HVAC system in Costa Mesa?",
      a: "Yes to both. For a straightforward job the city offers an Insta-Permit through its TESSA portal: fill in the city's standard plan, pay the fee, and the permit arrives by email. The water heater version covers a like-for-like tank water heater change-out only; converting to tankless or re-piping is not covered by it. The HVAC version covers a single-family home with no roof-top equipment. Both have separate tracks for licensed contractors and owner-builders.",
    },
    {
      q: "Who supplies my water in Costa Mesa, and is it hard?",
      a: "Most of the city is on Mesa Water District, which now draws essentially all of its supply from nine local wells rather than importing. Part of the city falls in Irvine Ranch Water District instead, so check your bill to see which one you are on. Hardness differs between the two districts, so for an actual number, read the current water quality report from your own district rather than a citywide estimate.",
    },
    {
      q: "Is my Costa Mesa home in a fire or flood zone?",
      a: "That is an address-level question, and the process is the same one every Orange County homeowner uses: the state's Fire Hazard Severity Zone viewer for fire, FEMA's Flood Map Service Center for flood. Nothing in the sources we checked makes Costa Mesa a special case in either direction, which is itself worth saying plainly instead of inventing a local risk story.",
    },
    {
      q: "Does Costa Mesa have Mello-Roos?",
      a: "It is less likely here than in newer South County communities, because Mello-Roos districts were created by a 1982 law and Costa Mesa was largely built out before then. That is a reason, not a guarantee. Check the parcel on the Orange County Treasurer-Tax Collector's lookup or read the special assessment charges section of your property tax bill.",
    },
    {
      q: "Does being a mile from the ocean actually change home maintenance?",
      a: "Somewhat. You get marine-layer mornings and moderated summer heat, and exterior metal, paint and outdoor equipment age faster than they would in Anaheim or Santa Ana. You do not get the constant, direct salt exposure that beachfront blocks in Newport Beach or Huntington Beach deal with, so coastal-specific advice applies here in a milder form rather than not at all.",
    },
    {
      q: "Who provides fire service in Costa Mesa?",
      a: "The city's own department, Costa Mesa Fire & Rescue, not the Orange County Fire Authority. For fire hazard zoning, the State Fire Marshal's maps answer by location rather than by city, and for a locally protected area like this one the state says to contact the local jurisdiction, so look your own parcel up rather than relying on a citywide answer.",
    },
  ],

  updated: "2026-09-16",
};
