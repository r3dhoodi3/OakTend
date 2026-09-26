import type { CityContent } from "./types";

// Santa Ana. Facts and sources: section 4 of
// OakTend-marketing/reports-2026-09-16/seo-research-city-pages.md.
//
// The angle that makes this page not interchangeable: the oldest housing
// stock of any large Orange County city, a city that
// pumps and treats its own water, and genuinely historic neighborhoods with
// review rules attached. Where the older-stock implications are regional
// rather than Santa Ana specific, they are labelled as regional rather than
// dressed up as a local statistic.
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
    "Santa Ana has some of the oldest housing stock of any large Orange County city: about a third of its homes predate 1960, roughly 80 percent went up before 1980, and only about 4.2 percent date from 2000 or later. That age shows up in predictable places, including electrical panels sized for a 1960s household, sewer laterals well into their service life, and water heaters already on their second or third replacement. The city also runs its own water utility, and the water is hard enough that scale is simply part of the maintenance calendar here.",
  metaDescription:
    "Santa Ana has some of Orange County's oldest big-city housing, most built before 1980. Panels, sewer laterals, hard city water, and city permits.",
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
        text: "Of Santa Ana's roughly 78,761 housing units, about 33.6 percent predate 1960, about 46.7 percent went up between 1960 and 1979, and only about 4.2 percent date from 2000 or later. No source we checked publishes a single median year built for the city, but the running total crosses half partway through the 1960s, so newer-construction advice written for South County or Irvine mostly does not apply here.",
        sourceUrl:
          "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/04/SCAG-Local-Housing-Data-for-City-of-Santa-Ana-April-2021.pdf",
        sourceLabel: "SCAG Local Housing Data for Santa Ana, April 2021",
      },
      {
        text: "General regional context rather than a Santa Ana specific statistic: pre-1970s California housing more commonly needs an electrical panel upgrade to carry modern loads, and more often still has its original sewer lateral. The city's own housing-age breakdown puts the single largest share of its homes in the 1970s, with the 1960s and 1950s close behind, so check your own title paperwork before assuming which of those eras you are in.",
        sourceUrl:
          "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/04/SCAG-Local-Housing-Data-for-City-of-Santa-Ana-April-2021.pdf",
        sourceLabel: "SCAG housing-age breakdown for Santa Ana",
      },
      {
        text: "Santa Ana sits roughly ten miles inland, where there is less marine-layer cooling than the coast gets, with summer highs averaging about 84 degrees and a locally defined extreme heat day of anything above 96.3 degrees. The city's own planning work projects those days climbing from a historical handful a year to an average of 11 by mid-century and 25 by the end of it, which is an argument for attic ventilation and roof condition rather than for freeze protection.",
        sourceUrl:
          "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/03/City-of-Santa-Ana-HMP-10.11.2022.pdf",
        sourceLabel: "City of Santa Ana Hazard Mitigation Plan, 2022",
      },
      {
        text: "Fire service in Santa Ana comes from the Orange County Fire Authority, which the city's own fire page describes as the fire agency serving the City of Santa Ana. That page says ten fire stations are located throughout the city, providing primary response for fire suppression and emergency medical services.",
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
    note: "Santa Ana's historic neighborhoods are genuinely historic, not a marketing label. Floral Park is a 1920s and 1930s neighborhood of Spanish Colonial, French Normandy, English Tudor and Italianate homes, added to the National Register in 2023 as the largest historic district in the city. Historic French Park, listed in 1999, is a roughly 20-block area of Victorian and Craftsman homes northeast of downtown with its own SD-19 zoning overlay and design guidelines, and Downtown Santa Ana is a third listed district. If your home sits in one of them, exterior work can need a Certificate of Appropriateness or a Neighborhood Review application that a 1970s tract home two miles away never sees, so check before you order materials.",
    sourceUrl: "https://santa-ana.gov/historic-preservation/",
  },

  water: {
    utility: "City of Santa Ana Water Services",
    utilityUrl: "https://santa-ana.gov/water-quality/",
    summary:
      "Santa Ana runs its own municipal water utility rather than buying everything through the wholesale district. The city's own water quality FAQ puts it plainly: about 77 percent of the water comes from local groundwater and the rest is imported from the Metropolitan Water District, and the city's hardness is about 250 parts per million, roughly 15 grains per gallon, which it classifies as hard. The utility also reports no known lead service lines in its distribution system.",
    sourceUrl: "https://santa-ana.gov/water-quality-faqs/",
  },

  permits: {
    office: "City of Santa Ana Building Safety Division",
    portalUrl: "https://santaana-prod.accela.com/portal/core/index",
    summary:
      "The Building Safety Division takes applications through Accela Citizen Access, which handles planning, building and public works permits, fee payment, status checks and inspection scheduling. The division also runs a same-day PBx Express over-the-counter program and Electronic Plan Review for building submittals. Which track your job takes depends on the job, so start from the Building Safety Division page rather than guessing, or call the division at 714-647-5800.",
    sourceUrl: "https://santa-ana.gov/departments/building-division/",
  },

  hazards: [
    {
      text: "Santa Ana's own 2022 FEMA-approved hazard mitigation plan ranks earthquake, flood, climate change and epidemic as the hazards that pose a significant threat to the city. Wildfire does not appear in that ranking at all, which is about as close to a citywide answer as a dense, flat, built-out inland city with no wildland edge gets from its own emergency planners.",
      sourceUrl:
        "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/03/City-of-Santa-Ana-HMP-10.11.2022.pdf",
      sourceLabel: "City of Santa Ana Hazard Mitigation Plan, 2022",
    },
    {
      text: "Mello-Roos is essentially a non-issue here. Most of Santa Ana was built out before the 1982 law that created Community Facilities Districts existed, which is the opposite of the South County picture. A parcel check with the county Treasurer-Tax Collector confirms it for a specific address.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
    {
      text: "Liquefaction is a real, mapped issue here rather than a theoretical one: the city's own 2022 hazard mitigation plan carries a state Department of Conservation liquefaction map and describes significant susceptibility across most of Santa Ana, a consequence of flat, low ground on the Santa Ana River floodplain with shallow groundwater. The plan also notes no known active fault runs through the city itself, though several regional faults can shake it. Worth checking before foundation, drainage or addition work.",
      sourceUrl:
        "https://storage.googleapis.com/proudcity/santaanaca/uploads/2022/03/City-of-Santa-Ana-HMP-10.11.2022.pdf",
      sourceLabel: "City of Santa Ana Hazard Mitigation Plan, 2022",
    },
    {
      text: "The city's own hazard plan puts the northern, southern and western portions of Santa Ana inside FEMA 100-year or 500-year flood zones, or in areas whose risk is reduced by a levee, while the part of the city east of Broadway sits outside the mapped zone. FEMA's Flood Map Service Center is the authoritative check for a specific parcel, and the answer affects insurance as well as what a remodel has to account for.",
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
        "The most common big-ticket item in a 1960s home, with the typical range and the signs your panel is undersized.",
    },
    {
      href: "/guides/slab-leak-signs",
      title: "Slab leak signs",
      blurb:
        "How to spot one early in an older slab-foundation home, before the water bill tells you.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical price range and when a repair still makes sense, on water around 250 ppm.",
    },
    {
      href: "/guides/orange-county-home-maintenance-checklist",
      title: "Orange County home maintenance checklist",
      blurb:
        "Month by month for this climate, including the attic ventilation and roof checks that inland heat makes worth doing.",
    },
  ],

  neighbors: ["tustin", "orange", "costa-mesa", "garden-grove"],

  faq: [
    {
      q: "Do I need a permit to replace a water heater in Santa Ana?",
      a: "Yes. The city's own permit guidance says replacing a water heater requires a permit, pulled before the work begins. That is the same answer as almost everywhere in California, since water heater installation is governed by the state plumbing code rather than a Santa Ana quirk. Applications go through the city's Accela portal, and a licensed plumber normally pulls the permit as part of the job.",
    },
    {
      q: "Is Santa Ana's water hard?",
      a: "Yes. The city's own water quality FAQ states hardness of about 250 parts per million, roughly 15 grains per gallon, and calls it hard water. Santa Ana runs its own utility, drawing about 77 percent from local groundwater and the rest imported from the Metropolitan Water District. In practice, expect white scale on fixtures, expect it in water heaters and valves too, and expect a tank to benefit from an annual flush more than the manual suggests.",
    },
    {
      q: "My Santa Ana home was built in the 1960s. What usually needs attention first?",
      a: "The honest answer is that this is regional rather than unique to Santa Ana: pre-1970s California housing most often runs into an undersized electrical panel, an original sewer lateral reaching the end of its life, and plumbing runs under a slab that develop slow leaks. None of that is guaranteed for your house. It is a list of what to check first given the era, and a walkthrough of your own systems beats any citywide average.",
    },
    {
      q: "Does Santa Ana have Mello-Roos?",
      a: "Almost nowhere. Community Facilities Districts were created by a 1982 state law, and most of Santa Ana was already built out by then, which is why the Mello-Roos assessments common in South County and Irvine's newer villages are rare here. The county Treasurer-Tax Collector's lookup confirms it for a specific parcel.",
    },
    {
      q: "Do historic neighborhood rules affect what I can change on my house?",
      a: "They can. Floral Park is on the National Register of Historic Places and Historic French Park is one of the city's oldest neighborhoods, and homes in that kind of district can carry review requirements for exterior changes that a nearby tract home does not. Check with the city before ordering windows, roofing or paint if your home is in one of them.",
    },
    {
      q: "Who provides fire service in Santa Ana?",
      a: "The Orange County Fire Authority. The city's own fire page describes the authority as the fire agency serving the City of Santa Ana, and says ten fire stations are located throughout the city, providing primary response for fire suppression and emergency medical services.",
    },
  ],

  updated: "2026-09-20",
};
