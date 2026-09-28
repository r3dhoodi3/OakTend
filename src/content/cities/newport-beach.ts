import type { CityContent } from "./types";

// Newport Beach. Facts and sources: the city research file for this wave
// (scratchpad/cities/newport-beach.md).
//
// The angle that makes this page not interchangeable: a harbor city where the
// coastal zone, not the city, is the real permitting authority for a lot of
// exterior work, and where a bayfront owner maintains a seawall. Salt-air wear
// belongs here the way it belongs on Huntington Beach; the coastal development
// permit and the bulkhead obligation belong ONLY here.
//
// Fire hazard is deliberately left as an address lookup: the 2025 maps exist,
// but no source we have says which Newport Beach parcels fall in a zone.
//
// ONE-URL LIMIT ON THE NEIGHBORHOODS NOTE. The schema carries a single
// sourceUrl per section, and the note below draws on four separate Wikipedia
// articles rather than the one it links: Balboa_Island for the 1906 dredging,
// Lido_Isle for the 1923 build and the 800 homes / 250 waterfront counts,
// Bay_Island for the 23 homes and no car access, and Newport_Coast for the
// 2001 annexation and the IRWD service note. The main Newport Beach article
// is linked as the entry point to all four.
//
// FACT CHECK 2026-09-19. The housing card was attributed to Data USA, an
// aggregator. It now cites the ACS tables themselves through Census Reporter,
// with the figures the 2024 one-year release actually shows: B25035 median
// year built 1979 (plus or minus 3), and B25024 with 44,042 housing units, of
// which 20,060 are one-unit detached (45.5 percent) and 6,819 are one-unit
// attached (15.5 percent). The old card said 1978, 45,185 units and 17.5
// percent "attached duplexes and townhomes"; in B25024 duplexes are their own
// two-unit row, so the attached share is described as what the table says.

export const newportBeach: CityContent = {
  name: "Newport Beach",
  slug: "newport-beach",
  intro:
    "Newport Beach is a harbor city as much as a beach city, with whole neighborhoods on dredged islands and a sandspit where the water is on two sides of the house. Nearly all of it lies in the California Coastal Zone, and a bayfront owner keeps the seawall in front of the house in repair.",
  metaDescription:
    "Newport Beach sits in the Coastal Zone on a working harbor. Coastal permits, seawall duty, city well water, flood maps and salt-air upkeep, all sourced.",
  metaTitle: "Newport Beach homes: seawalls and coastal permits",

  population: {
    value: "About 82,970 people",
    asOf: "Census Vintage 2024 estimate; the 2020 Census counted 85,239",
    sourceUrl:
      "https://www.census.gov/quickfacts/fact/table/newportbeachcitycalifornia/PST045224",
  },

  homes: {
    exposure: "coastal",
    medianYearBuilt: "1979",
    medianYearBuiltSource: {
      sourceUrl:
        "https://censusreporter.org/data/table/?table=B25035&geo_ids=16000US0651182",
      sourceLabel: "Census Reporter, ACS 2024 table B25035",
    },
    facts: [
      {
        text: "Of roughly 44,000 housing units, only about 46 percent are detached single-family homes and roughly 15 percent attached single-family homes such as townhomes. Much of the city is close-set construction on small lots, where access and staging add real cost to routine work.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25024&geo_ids=16000US0651182",
        sourceLabel: "Census Reporter, ACS 2024 tables B25024 and B25035",
      },
      {
        text: "On the Balboa Peninsula, Balboa Island, Lido Isle and the harbor islands, the distance to open or bay water is close to zero. Newport Coast and the San Joaquin Hills sit above the coast instead and take offshore Santa Ana wind, a different maintenance problem inside the same city.",
        sourceUrl: "https://en.wikipedia.org/wiki/Newport_Beach,_California",
        sourceLabel: "Wikipedia, city geography",
      },
      {
        text: "The city runs its own Newport Beach Fire Department: 152 full-time and more than 200 part-time and seasonal employees, with divisions for Fire Operations, Emergency Medical Services, Fire Prevention and Lifeguard Operations.",
        sourceUrl:
          "https://www.newportbeachca.gov/government/departments/fire-department",
        sourceLabel: "Newport Beach Fire Department",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Corona del Mar",
      "Balboa Island",
      "Balboa Peninsula",
      "Lido Isle",
      "Newport Coast",
      "Bay Island",
    ],
    note: "Several of these are man-made. Balboa Island was dredged and filled starting in 1906; Lido Isle was dredged from 1923, laid out with Italian street names and about 800 homes, roughly 250 of them waterfront. Bay Island has 23 homes and no car access. Newport Coast is a hillside master-planned community annexed in 2001 and served by Irvine Ranch Water District rather than the city utility.",
    sourceUrl: "https://en.wikipedia.org/wiki/Newport_Beach,_California",
  },

  water: {
    utility: "City of Newport Beach Utilities Department",
    utilityUrl: "https://www.newportbeachca.gov/Home/ShowDocument?id=18490",
    summary:
      "The city utility blends about 80 percent groundwater, pumped from four city-owned wells in Fountain Valley, with about 20 percent imported treated surface water. The groundwater averages about 225 ppm of hardness, roughly 13 grains per gallon, against about 160 ppm for the imported side. Newport Coast is on Irvine Ranch Water District and some pockets on Mesa Water District; your bill names the agency.",
    sourceUrl: "https://www.newportbeachca.gov/Home/ShowDocument?id=18490",
  },

  permits: {
    office: "City of Newport Beach Building Division",
    portalUrl: "https://css.newportbeachca.gov/EnerGov_Prod/SelfService",
    summary:
      "Permits run through iPermit, the city's online portal, or the Community Development counter. A Residential Express Permit track covers single-scope work such as a furnace, roofing, or windows and doors without a full plan check. Exterior and harbor-facing work often needs a coastal development permit alongside the building permit.",
    sourceUrl:
      "https://www.newportbeachca.gov/government/departments/community-development/building-division/plan-checks-permits-inspections",
  },

  hazards: [
    {
      text: "The city's Local Coastal Program was certified effective January 30, 2017, which moved most coastal development permit processing from the Coastal Commission's Long Beach office to the city itself.",
      sourceUrl:
        "https://www.newportbeachca.gov/government/departments/community-development/planning-division/general-plan-codes-and-regulations/local-coastal-program",
      sourceLabel: "City of Newport Beach Local Coastal Program",
    },
    {
      text: "On most Newport Harbor bayfront parcels, private ownership stops at the bulkhead line and everything waterward is public tideland, but the bulkhead, seawall and dock are the owner's to keep in good repair at all times, and that work generally needs a coastal development permit.",
      sourceUrl: "https://www.codepublishing.com/CA/NewportBeach/",
      sourceLabel: "Newport Beach Municipal Code, Title 17 Harbor Code",
    },
    {
      text: "The General Plan safety element maps liquefaction-susceptible ground along the Balboa Peninsula, in and around Newport Bay and Upper Newport Bay, and on the Santa Ana River floodplain. Balboa Village, West Newport Mesa, Mariners' Mile and the airport area are listed as prone to seismically induced settlement.",
      sourceUrl:
        "https://www.newportbeachca.gov/PLN/General_Plan/12_Ch11_Safety_web.pdf",
      sourceLabel: "Newport Beach General Plan, safety element",
    },
    {
      text: "Parts of the Balboa Peninsula have been mapped in FEMA's high-risk VE zone for wave action, and ground nearer the harbor and Upper Newport Bay more often in AE; a federally backed mortgage in either requires flood insurance. The city got roughly 2,700 properties removed from an expanded 2016 flood zone, so the current map is the one to check.",
      sourceUrl:
        "https://ktla.com/news/local-news/fema-agrees-to-shrink-newport-beach-coastal-flood-zone-saving-property-owners-millions-in-insurance-costs/",
      sourceLabel: "KTLA, on the FEMA map revision",
    },
    {
      text: "Cal Fire and the city released updated Local Responsibility Area fire hazard severity zone maps in 2025, the first update here in 14 years, and the city's Fire Prevention page runs an address lookup for them.",
      sourceUrl:
        "https://www.newportbeachca.gov/government/departments/fire/fire-prevention-division/state-lra-vhfhsz-maps",
      sourceLabel: "City of Newport Beach Fire Prevention",
    },
  ],

  guides: [
    {
      href: "/guides/hoa-coastal-commission-remodel-orange-county",
      title: "HOA and coastal permits in Orange County",
      blurb:
        "Nearly all of Newport Beach is Coastal Zone, so plan for the second approval.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Roofs here take sun, salt and harbor humidity together.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "City well water runs around 13 grains per gallon, and every swap is a permit.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "When salt-air exteriors, railings and outdoor metal need attention.",
    },
  ],

  neighbors: ["costa-mesa", "irvine", "laguna-beach", "huntington-beach"],

  faq: [
    {
      q: "Is a water heater swap a permit job in Newport Beach?",
      a: "Yes. The city's permit guidance draws the line there: a faucet or light switch is a fixture swap, a water heater needs a permit, filed through iPermit or the Community Development counter.",
    },
    {
      q: "Does the Coastal Commission still review anything in Newport Beach?",
      a: "Yes, a little. The city handles most coastal development permits since 2017, but the Commission keeps jurisdiction over tidelands and submerged lands and retains appeal rights over some local approvals.",
    },
  ],

  updated: "2026-09-20",
};
