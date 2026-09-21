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
    "Newport Beach is a harbor city as much as a beach city, and whole neighborhoods sit on dredged islands and a sandspit where the water is on two sides of the house instead of one. Nearly the entire city lies inside the California Coastal Zone, so exterior work, additions and anything touching a dock, seawall or bulkhead usually needs a coastal development permit on top of the building permit. And if you own bayfront, the seawall in front of your house is yours to keep in good repair, an obligation almost nowhere else in Orange County carries.",
  metaDescription:
    "Newport Beach sits in the Coastal Zone, on a working harbor. Coastal permits, seawall duty, city water, and salt-air upkeep, sourced.",
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
        text: "Newport Beach's median year built is 1979, across roughly 44,000 housing units, and only about 46 percent of those are detached single-family homes, with roughly another 15 percent attached single-family homes such as townhomes. These are survey estimates with real margins of error, but the shape is clear. A lot of this city is close-set construction on small lots, which makes access and staging a real cost driver on work that would be routine elsewhere.",
        sourceUrl:
          "https://censusreporter.org/data/table/?table=B25024&geo_ids=16000US0651182",
        sourceLabel: "Census Reporter, ACS 2024 tables B25024 and B25035",
      },
      {
        text: "For most of the residential city, including the Balboa Peninsula, Balboa Island, Lido Isle and the harbor islands, the distance to open or bay water is close to zero. Newport Coast and the San Joaquin Hills sit above the coast instead and take offshore Santa Ana wind. Those are two different maintenance problems inside one city, and advice written for one does not transfer to the other.",
        sourceUrl: "https://en.wikipedia.org/wiki/Newport_Beach,_California",
        sourceLabel: "Wikipedia, city geography",
      },
      {
        text: "The city's own drinking water report puts its supply at about 80 percent groundwater, pumped from four city-owned wells in Fountain Valley, and about 20 percent imported treated surface water. Groundwater hardness averages about 225 ppm, roughly 13 grains per gallon, against about 160 ppm for the imported blend, so scale in water heaters and fixtures is a normal item on the calendar here.",
        sourceUrl: "https://www.newportbeachca.gov/Home/ShowDocument?id=18490",
        sourceLabel: "City of Newport Beach water quality report",
      },
      {
        text: "Fire service here comes from the city's own Newport Beach Fire Department. The department's page says its 152 full-time employees and more than 200 part-time and seasonal employees provide 24-hour protection and response, and it lists Fire Operations, Emergency Medical Services, Fire Prevention and Lifeguard Operations among its divisions.",
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
    note: "Several of these are literally man-made. Balboa Island was dredged and filled starting in 1906; Lido Isle was dredged from 1923, laid out with Italian street names and about 800 homes, roughly 250 of them waterfront. Bay Island has 23 homes and no car access. Newport Coast is a hillside master-planned community annexed into the city in 2001, and it is served by Irvine Ranch Water District rather than the city utility.",
    sourceUrl: "https://en.wikipedia.org/wiki/Newport_Beach,_California",
  },

  water: {
    utility: "City of Newport Beach Utilities Department",
    utilityUrl: "https://www.newportbeachca.gov/Home/ShowDocument?id=18490",
    summary:
      "Most of Newport Beach drinks water from the city's own utility, blended at about 80 percent groundwater from four wells the city owns in Fountain Valley and about 20 percent imported treated surface water. Not all of it: Newport Coast is served by Irvine Ranch Water District, and other pockets by Mesa Water District, and your bill is what tells you which. City groundwater averages about 225 ppm hardness, roughly 13 grains per gallon, against about 160 ppm for the imported side, so what reaches your tap depends on the blend your area is on.",
    sourceUrl: "https://www.newportbeachca.gov/Home/ShowDocument?id=18490",
  },

  permits: {
    office: "City of Newport Beach Building Division",
    portalUrl: "https://css.newportbeachca.gov/EnerGov_Prod/SelfService",
    summary:
      "Building permits run through iPermit, the city's online portal, which has a Residential Express Permit track for single-scope work such as a furnace, roofing, or windows and doors. Water heater replacement requires a permit here, unlike a faucet or switch swap. The thing that catches people out is the second approval: most of the city is in the Coastal Zone, so exterior work and anything harbor-facing often needs a coastal development permit alongside the building permit.",
    sourceUrl:
      "https://www.newportbeachca.gov/government/departments/community-development/building-division/plan-checks-permits-inspections",
  },

  hazards: [
    {
      text: "Nearly all of Newport Beach sits inside the California Coastal Zone. The city's Local Coastal Program was certified effective January 30, 2017, which moved most coastal development permit processing from the Coastal Commission's Long Beach office to the city itself, though the Commission keeps jurisdiction over tidelands and submerged lands and retains appeal rights over some local approvals. Budget schedule for that second approval, not just the building permit.",
      sourceUrl:
        "https://www.newportbeachca.gov/government/departments/community-development/planning-division/general-plan-codes-and-regulations/local-coastal-program",
      sourceLabel: "City of Newport Beach Local Coastal Program",
    },
    {
      text: "On most Newport Harbor bayfront parcels, private ownership stops at the bulkhead line and everything waterward is public tideland, but the bulkhead, seawall and dock are the owner's to keep in good repair at all times. That repair work sits in the Coastal Zone too, so it generally needs a coastal development permit as well as a contractor who has done harbor work before.",
      sourceUrl: "https://www.codepublishing.com/CA/NewportBeach/",
      sourceLabel: "Newport Beach Municipal Code, Title 17 Harbor Code",
    },
    {
      text: "The city's General Plan safety element maps liquefaction-susceptible ground along the coastline, including the Balboa Peninsula, the area in and around Newport Bay and Upper Newport Bay, and the Santa Ana River floodplain, most of it already built on. Balboa Village, West Newport Mesa, Mariners' Mile and the airport area are also listed as prone to seismically induced settlement.",
      sourceUrl:
        "https://www.newportbeachca.gov/PLN/General_Plan/12_Ch11_Safety_web.pdf",
      sourceLabel: "Newport Beach General Plan, safety element",
    },
    {
      text: "Parts of the Balboa Peninsula have been mapped in FEMA's high-risk VE zone for wave action, while ground nearer the harbor and Upper Newport Bay more often carries an AE designation, and a federally backed mortgage in either requires flood insurance. The map does move: the city got roughly 2,700 properties removed from an expanded 2016 flood zone, so check the current map for your own address.",
      sourceUrl:
        "https://ktla.com/news/local-news/fema-agrees-to-shrink-newport-beach-coastal-flood-zone-saving-property-owners-millions-in-insurance-costs/",
      sourceLabel: "KTLA, on the FEMA map revision",
    },
    {
      text: "Cal Fire and the city released updated Local Responsibility Area fire hazard severity zone maps in 2025, the first update for this area in 14 years, and the city runs an address lookup for them. Which Newport Beach parcels land in a mapped zone is an address-level answer, so use the city's tool rather than assuming the canyons answer or the flatlands answer applies to your street.",
      sourceUrl:
        "https://www.newportbeachca.gov/government/departments/fire/fire-prevention-division/state-lra-vhfhsz-maps",
      sourceLabel: "City of Newport Beach Fire Prevention",
    },
  ],

  guides: [
    {
      href: "/guides/hvac-replacement-cost",
      title: "HVAC replacement cost",
      blurb:
        "What a system runs, and why coil corrosion shortens equipment life this close to salt water.",
    },
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, for roofs taking sun, salt and harbor humidity together.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair still makes sense, on water around 13 grains per gallon.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including what coastal exteriors need and when.",
    },
  ],

  neighbors: ["costa-mesa", "irvine", "laguna-beach", "huntington-beach"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater in Newport Beach?",
      a: "Yes. The city's permit guidance draws the line clearly: a faucet or a light switch is a fixture swap, a water heater is a permit. It goes through the iPermit portal or the Community Development counter, and a licensed plumber normally handles it as part of the job. Simple single-scope work can often use the Residential Express Permit track rather than a full plan check.",
    },
    {
      q: "My house is near the water. Do I need approval beyond a building permit?",
      a: "Most likely yes. Nearly all of Newport Beach is inside the California Coastal Zone, so exterior work, additions and especially harbor-facing work like dock, seawall or bulkhead repair generally needs a coastal development permit as well. Since the city's Local Coastal Program was certified in 2017 the city processes most of those itself, which is faster than the old route through Long Beach, but the Coastal Commission still holds jurisdiction over tidelands and some appeals.",
    },
    {
      q: "Who is responsible for the seawall behind my bayfront house?",
      a: "You are. On most Newport Harbor bayfront parcels private ownership stops at the bulkhead line, with everything waterward held as public tideland, and the owner is responsible for keeping the bulkhead, seawall and dock in good repair. Most of that work also needs a coastal development permit, so plan it as a permitted project rather than a weekend fix.",
    },
    {
      q: "Is my Balboa Peninsula or Balboa Island home in a FEMA flood zone?",
      a: "It depends on the address. Parts of the peninsula have historically been mapped in the high-risk VE zone for coastal wave action, while ground closer to the harbor or Upper Newport Bay is more often in an AE zone, and a federally backed mortgage in either requires flood insurance. The city did get about 2,700 properties removed from an expanded 2016 zone, so the map has changed in living memory; check the current one for your parcel.",
    },
    {
      q: "Does my water come from the city or a different agency?",
      a: "It depends where you live. Most of Newport Beach is on the city's own utility, blended at roughly 80 percent groundwater and 20 percent imported water. Newport Coast is served by Irvine Ranch Water District, and some pockets by Mesa Water District. Your water bill names the agency, and that is the one whose water quality report actually describes what comes out of your tap.",
    },
    {
      q: "Who provides fire service in Newport Beach?",
      a: "The city's own Newport Beach Fire Department. Its page says 152 full-time employees and more than 200 part-time and seasonal employees provide 24-hour protection and response, across divisions that include Fire Operations, Emergency Medical Services, Fire Prevention and Lifeguard Operations. For fire hazard severity zones, the city runs an address lookup, so check your own street there.",
    },
  ],

  updated: "2026-09-20",
};
