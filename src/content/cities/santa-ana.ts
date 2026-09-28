import type { CityContent } from "./types";

// Santa Ana. Facts and sources: section 4 of
// OakTend-marketing/reports-2026-09-16/seo-research-city-pages.md.
//
// The angle that makes this page not interchangeable: the oldest housing
// stock of any large Orange County city, a city that
// pumps and treats its own water, and genuinely historic neighborhoods with
// review rules attached. Regional older-stock advice (panels, sewer laterals)
// lives in the guides, not on this page.
//
// SOURCING PASS 2026-09-16 (second). The "1967" median build year is gone.
// No source in the research file publishes a single median year for Santa
// Ana; only a decade-by-decade distribution, from which a 1960s median is
// inferred. One live check of the Census Reporter API's B25035 table came
// back 1970, not 1967, which is reason enough not to print either as if it
// were settled. The unit count and the post-2000 share now match the SCAG
// housing data the research actually used (78,761 units, 4.2 percent), the
// USDA hardiness-zone fact is gone, and the permit section names PBx Express
// instead of an "Online Permit System" URL that appears in no source.
//
// RECONCILED 2026-09-16. The water numbers now cite the city's own Water
// Quality FAQ, which states the 77 percent groundwater split and the 250 ppm
// hardness figure in those words, rather than the general water services
// page. The liquefaction and wildfire hazards now cite the city's own 2022
// FEMA-approved Hazard Mitigation Plan, which maps significant liquefaction
// susceptibility across most of the city and does not rank wildfire as a
// significant hazard for Santa Ana at all.
//
// FACT CHECK 2026-09-19. "One of the few in the county that does" came off the
// city-run water utility line: many Orange County cities run their own retail
// water system, so the comparison was false. The meta description now hedges
// the housing-age claim the way the intro already did ("some of the oldest"),
// and "no marine layer to take the edge off" became "less marine-layer cooling
// than the coast", which is what ten miles inland actually means. The
// population line now names Census Reporter, which is what it links to.

export const santaAna: CityContent = {
  name: "Santa Ana",
  slug: "santa-ana",
  intro:
    "Santa Ana has some of the oldest housing stock of any large Orange County city: about a third of its homes predate 1960 and only about 4.2 percent date from 2000 or later. Floral Park and French Park are National Register districts with review rules for exterior work, and the city pumps most of its own water, at about 15 grains of hardness.",
  metaDescription:
    "Santa Ana has some of Orange County's oldest big-city housing, most built before 1980. Historic district review, hard city water, flood maps and permits.",
  metaTitle: "Santa Ana homes: pre-1980 builds and hard water",

  population: {
    value: "About 310,000 to 316,000 people",
    asOf: "the 2020 Census counted 310,227; recent ACS estimates run near 316,200",
    sourceUrl:
      "https://censusreporter.org/profiles/16000US0669000-santa-ana-ca/",
    sourceLabel: "Census Reporter, U.S. Census Bureau data",
  },

  homes: {
    exposure: "inland",
    facts: [
      {
        text: "Of roughly 78,761 housing units, about 33.6 percent predate 1960, about 46.7 percent went up between 1960 and 1979, and only about 4.2 percent date from 2000 or later. The 1970s hold the single largest share, with the 1960s and 1950s close behind, and the running total crosses half partway through the 1960s.",
        sourceUrl:
          "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/04/SCAG-Local-Housing-Data-for-City-of-Santa-Ana-April-2021.pdf",
        sourceLabel: "SCAG Local Housing Data for Santa Ana, April 2021",
      },
      {
        text: "About ten miles inland, Santa Ana averages summer highs near 84 degrees and defines an extreme heat day as anything above 96.3. The city's planning work projects those days climbing from a historical handful a year to an average of 11 by mid-century and 25 by the end of it.",
        sourceUrl:
          "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/03/City-of-Santa-Ana-HMP-10.11.2022.pdf",
        sourceLabel: "City of Santa Ana Hazard Mitigation Plan, 2022",
      },
      {
        text: "Fire service comes from the Orange County Fire Authority, which the city's fire page says runs ten stations throughout the city for fire suppression and emergency medical response.",
        sourceUrl: "https://santa-ana.gov/departments/fire/",
        sourceLabel: "City of Santa Ana, Orange County Fire Authority page",
      },
    ],
  },

  neighborhoods: {
    names: [
      "Floral Park",
      "Historic French Park",
      "Wilshire Square",
      "Downtown Santa Ana",
    ],
    note: "Floral Park, a 1920s and 1930s neighborhood of Spanish Colonial, French Normandy, English Tudor and Italianate homes, joined the National Register in 2023 as the city's largest historic district. Historic French Park, listed in 1999, is about 20 blocks of Victorian and Craftsman homes northeast of downtown, and Downtown Santa Ana is a third listed district.",
    sourceUrl: "https://santa-ana.gov/historic-preservation/",
  },

  water: {
    utility: "City of Santa Ana Water Services",
    utilityUrl: "https://santa-ana.gov/water-quality/",
    summary:
      "The city runs its own water utility. Its water quality FAQ says about 77 percent of the supply is local groundwater and the rest is imported from the Metropolitan Water District, and puts hardness at about 250 parts per million, roughly 15 grains per gallon, which it classifies as hard. It reports no known lead service lines in its system.",
    sourceUrl: "https://santa-ana.gov/water-quality-faqs/",
  },

  permits: {
    office: "City of Santa Ana Building Safety Division",
    portalUrl: "https://santaana-prod.accela.com/portal/core/index",
    summary:
      "Applications, fees, status checks and inspection scheduling run through Accela Citizen Access, which covers planning, building and public works permits. The division also offers same-day PBx Express over-the-counter permits and Electronic Plan Review; the track depends on the job, so ask the division at 714-647-5800.",
    sourceUrl: "https://santa-ana.gov/departments/building-division/",
  },

  hazards: [
    {
      text: "The city's 2022 FEMA-approved hazard mitigation plan ranks earthquake, flood, climate change and epidemic as the significant threats to Santa Ana. Wildfire is not on the list.",
      sourceUrl:
        "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/03/City-of-Santa-Ana-HMP-10.11.2022.pdf",
      sourceLabel: "City of Santa Ana Hazard Mitigation Plan, 2022",
    },
    {
      text: "Most of Santa Ana was built out before the 1982 law that created Mello-Roos Community Facilities Districts, so those special taxes are rare here; the county Treasurer-Tax Collector's lookup answers for a specific parcel.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "The same plan carries a state liquefaction map showing significant susceptibility across most of the city, flat, low Santa Ana River floodplain with shallow groundwater. No known active fault runs through the city, though several regional faults can shake it.",
      sourceUrl:
        "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/03/City-of-Santa-Ana-HMP-10.11.2022.pdf",
      sourceLabel: "City of Santa Ana Hazard Mitigation Plan, 2022",
    },
    {
      text: "The northern, southern and western parts of the city sit in FEMA 100-year or 500-year flood zones or behind a levee, while the part east of Broadway is outside the mapped zone. FEMA's Flood Map Service Center answers for a specific parcel.",
      sourceUrl:
        "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/03/City-of-Santa-Ana-HMP-10.11.2022.pdf",
      sourceLabel: "City of Santa Ana Hazard Mitigation Plan, flood chapter",
    },
  ],

  guides: [
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "A third of Santa Ana's homes predate 1960, often on panels sized for that era.",
    },
    {
      href: "/guides/sewer-line-orange-county",
      title: "Sewer line problems in Orange County",
      blurb:
        "Original sewer laterals under pre-1980 Santa Ana homes are well into their service life.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "City water runs about 250 ppm, and a replacement needs a permit before work starts.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Attic ventilation and roof checks matter more as inland extreme heat days climb.",
    },
  ],

  neighbors: ["tustin", "orange", "costa-mesa", "garden-grove"],

  faq: [
    {
      q: "What review does a house in Floral Park or French Park need?",
      a: "Exterior work in a historic district can need a Certificate of Appropriateness or a Neighborhood Review application that a tract home elsewhere in the city never sees. French Park also has its own SD-19 zoning overlay and design guidelines, so check with the city before ordering windows, roofing or paint.",
    },
    {
      q: "When does a Santa Ana water heater swap need a permit?",
      a: "Always. The city's permit guidance says replacing a water heater requires a permit, pulled before the work begins, and applications go through the Accela portal.",
    },
  ],

  updated: "2026-09-20",
};
