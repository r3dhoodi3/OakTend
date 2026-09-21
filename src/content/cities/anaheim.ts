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
    "Anaheim is really two maintenance cities under one name. West and central Anaheim is flat, dense and old, with about a quarter of its homes built before 1960 and a citywide median build year of 1973, while Anaheim Hills is hillside and canyon, master-planned from 1971 onward, and the only part of the city with mapped Very High fire hazard land. The city also runs its own water utility, and its groundwater is very hard, averaging about 21 grains per gallon in the city's own testing.",
  metaDescription:
    "Anaheim is two cities: older flat tracts west and central, and Anaheim Hills in a Very High fire hazard zone. Water, permits, sources.",
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
        text: "Anaheim's median year built is 1973, and the shares behind that number are what matter: of about 113,613 housing units, roughly 25.3 percent predate 1960, about 40.1 percent went up between 1960 and 1979, and only about 17.3 percent date from 2000 or later. Two thirds of the city's homes are older than 1980, which puts panels, sewer laterals and original plumbing squarely on the agenda.",
        sourceUrl:
          "https://data.census.gov/table/ACSDT1Y2024.B25034?g=160XX00US0602000",
        sourceLabel: "Census ACS table B25034",
      },
      {
        text: "Anaheim Hills was master-planned from 1971, when Texaco Industries bought the Nohl ranch and laid out a low-density community of roughly 7,000 homes and estates on large lots; Mohler Loop and Peralta Hills predate that plan by decades, from the 1940s and 1950s. No Census or city housing source separates the hills' stock from the citywide figures, so treat that 1973 median as a blend of two very different places rather than a description of either.",
        sourceUrl:
          "https://en.wikipedia.org/wiki/Anaheim_Hills,_Anaheim,_California",
        sourceLabel: "Wikipedia, Anaheim Hills",
      },
      {
        text: "Anaheim sits inland and gets less marine-layer cooling than the coast, and the city's own planning documents put its historical average annual maximum temperature near 76 degrees, projected toward 80 by 2064, on about 14 inches of rain a year. Heat load on roofing, attic ventilation and HVAC capacity is the seasonal problem here; freeze protection is not.",
        sourceUrl: "https://anaheim.net/DocumentCenter/View/58325/Ch_05-18_WF",
        sourceLabel: "City of Anaheim General Plan PEIR",
      },
      {
        text: "Fire service in Anaheim comes from the city's own department, Anaheim Fire & Rescue. The department says it is made up of more than 250 trained fire professionals, and that its 11 fire stations cover a geographical area of 50 square miles that includes homes, commercial areas and areas that interface with wildlands.",
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
    note: "The split runs east to west. Anaheim Colony downtown grew out of the 1857 German-American founding settlement and is the largest of three downtown historic districts, with landmarks such as the 1857 Pioneer House. West Anaheim is older, flatter residential fabric. The Platinum Triangle around the stadium is an 820-acre rezoning from industrial land to high-density housing, so it is the newest construction in the city. Anaheim Hills at the eastern end is a hillside community of more than 80 planned sub-neighborhoods with 23 community associations, bordering the Cleveland National Forest, and it is where hillside grading rules, fire-zone building standards and evacuation routes actually apply.",
    sourceUrl:
      "https://en.wikipedia.org/wiki/Anaheim_Hills,_Anaheim,_California",
  },

  water: {
    utility: "Anaheim Public Utilities",
    utilityUrl:
      "https://www.anaheim.net/DocumentCenter/View/54599/2024-Water-Quality-Report",
    summary:
      "Anaheim runs its own water utility, Anaheim Public Utilities. The supply blends local groundwater from the Orange County basin with imported water from the State Water Project and the Colorado River, and the mix is shifting back toward groundwater as the utility brings PFAS treatment capacity back online. Hardness depends on which of those reaches your address: the city's own testing averaged 351 ppm for groundwater, about 21 grains per gallon, 278 ppm for water treated at the Lenain plant, and 131 ppm for Metropolitan water, with detections across the system ranging from 81 to 431 ppm.",
    sourceUrl:
      "https://www.anaheim.net/DocumentCenter/View/54599/2024-Water-Quality-Report",
  },

  permits: {
    office: "City of Anaheim Building Division",
    portalUrl: "https://aca-prod.accela.com/anaheim/default.aspx",
    summary:
      "Anaheim Next runs on Accela, but only three permit types are fully self-service online: residential solar, EV chargers and electrical panel upgrades. Everything else, water heaters and HVAC included, goes through staff review. The city's own water heater bulletin says a plumbing permit is required, offers an over-the-counter plan check if you bring a gas-pipe isometric drawing in the city's format, and calls for a pressure test at the final inspection on any new gas run over six feet. A water heater moved to the outside of the building also needs planning and zoning approval.",
    sourceUrl:
      "https://www.anaheim.net/DocumentCenter/View/719/Water-Heater-Replacement-or-Relocation",
  },

  hazards: [
    {
      text: "Anaheim Hills and the city's unincorporated sphere east of Highway 241 carry Very High Fire Hazard Severity Zone land on the city's own adopted map, and Very High is the only Cal Fire tier that applies inside city limits. The municipal code adopts that map and designates a wildland-urban interface fire area east of the 55 and south of the 91. Central and western Anaheim sit outside it.",
      sourceUrl: "https://www.anaheim.net/6660/Fire-Hazard-Severity-Zones",
      sourceLabel: "City of Anaheim, fire hazard severity zones",
    },
    {
      text: "A home inside that zone is subject to California Building Code Chapter 7A on new construction, additions and some remodels, covering roofing, attic vents, exterior walls, windows and decking, plus 100 feet of defensible space and an ember-resistant five feet around the structure. That makes a reroof or a window order a code decision in the hills, not just a price decision.",
      sourceUrl: "https://anaheim.net/DocumentCenter/View/58325/Ch_05-18_WF",
      sourceLabel: "City of Anaheim General Plan PEIR",
    },
    {
      text: "The city's own hazard documentation records two Anaheim Hills landslides: the 1993 Santiago slide, which destroyed more than 30 homes after an El Nino storm, and the 2005 Ramsgate slide, which took out three homes and a private street during a 20-day rain event. Eastern slopes are rated high for landslide susceptibility, overlapping the same ground as the fire zone, and hillside grading work needs an approved grading plan and a geological report.",
      sourceUrl: "https://anaheim.net/DocumentCenter/View/58325/Ch_05-18_WF",
      sourceLabel: "City of Anaheim hazard mitigation documentation",
    },
    {
      text: "Parts of Anaheim fall inside FEMA 100-year and 500-year floodplains, concentrated along the Santa Ana River and Carbon Creek on the west side and along the 91 corridor in the east. FEMA's Flood Map Service Center answers it for a specific parcel, which matters for insurance and for what a remodel has to account for.",
      sourceUrl: "https://anaheim.net/DocumentCenter/View/58325/Ch_05-18_WF",
      sourceLabel: "City of Anaheim General Plan PEIR, hydrology chapter",
    },
    {
      text: "Most of Anaheim was built before the 1982 law that created Mello-Roos districts, but the city's newest infill, including the high-density housing around the stadium, came long after it. There is no citywide yes or no; the county Treasurer-Tax Collector's parcel lookup, or the special assessment line on your tax bill, is the only real answer for an address.",
      sourceUrl: "https://octreasurer.gov/melloroos",
      sourceLabel: "OC Treasurer-Tax Collector",
    },
  ],

  guides: [
    {
      href: "/guides/roof-replacement-cost",
      title: "Roof replacement cost",
      blurb:
        "Price per square by material, and why the material question is a code question in the hills.",
    },
    {
      href: "/guides/electrical-panel-upgrade-cost",
      title: "Electrical panel upgrade cost",
      blurb:
        "The common big-ticket item in a pre-1980 home, and one of only three permit types Anaheim issues fully online.",
    },
    {
      href: "/guides/water-heater-replacement-cost",
      title: "Water heater replacement cost",
      blurb:
        "Typical range and when a repair is smarter, on some of the hardest water in the county.",
    },
    {
      href: "/guides/socal-home-maintenance-calendar",
      title: "SoCal home maintenance calendar",
      blurb:
        "Month by month for this climate, including the yearly water heater flush that very hard groundwater calls for and defensible space work in the hills.",
    },
  ],

  neighbors: ["orange", "fullerton", "garden-grove", "stanton"],

  faq: [
    {
      q: "Is my Anaheim home in a wildfire hazard zone?",
      a: "It depends which side of the city you are on, and for part of Anaheim the answer is genuinely yes. The city's own adopted map puts Very High Fire Hazard Severity Zone land in Anaheim Hills and the unincorporated area east of it, while central and western Anaheim sit outside any mapped zone. Anaheim Hills also has a long documented fire history, including the 2008 Freeway Complex fire, which crossed the 91 into Anaheim Hills and damaged or destroyed homes and apartments there, and the 2017 Canyon Fire 2. Confirm your own parcel on the city's fire hazard page rather than going by area reputation.",
    },
    {
      q: "Does a house in the Anaheim Hills fire zone need different roofing or vents?",
      a: "Yes, if the parcel is inside the Very High zone. New construction, additions and some remodels fall under California Building Code Chapter 7A, which governs roofing, attic vents, exterior walls, windows and decking, on top of defensible space rules of 100 feet around the structure and an ember-resistant five feet. Practically, that means the roofing and vent decisions on a reroof are constrained, so have any roofer you talk with price Chapter 7A compliant materials explicitly. A flatlands home outside the zone is not subject to those chapters.",
    },
    {
      q: "Is Anaheim's water hard?",
      a: "Yes, very. Anaheim Public Utilities' own testing averaged about 351 ppm, roughly 21 grains per gallon, for local groundwater, about 278 ppm for water treated at the Lenain plant and about 131 ppm for Metropolitan imported water, with detections ranging from 81 to 431 ppm depending on the blend reaching an address. As the utility shifts back toward groundwater, expect many addresses to sit at the higher end. Annual water heater flushing earns its hour here.",
    },
    {
      q: "Do I need a permit to replace my water heater in Anaheim?",
      a: "Yes. The city's Building Division requires a plumbing permit for a water heater replacement or relocation, and offers an over-the-counter plan check if you bring a gas-pipe isometric drawing in the city's format. A new gas run over six feet needs a pressure test at the final inspection, and a heater moved to the outside of the building also needs planning and zoning approval. Anaheim's online portal only self-issues solar, EV charger and panel upgrade permits, so this one goes through staff.",
    },
    {
      q: "Does my Anaheim home have an HOA or Mello-Roos?",
      a: "It depends heavily on which part of the city. Anaheim Hills has 23 documented community associations, including a large planned-community master association, so an architectural review step before exterior work is normal there. The older flatland tracts were mostly built before HOAs became standard in California development. Mello-Roos is a parcel-level answer either way: check the Orange County Treasurer-Tax Collector's lookup or the special assessment charges section of your tax bill.",
    },
    {
      q: "Who provides fire service in Anaheim?",
      a: "Anaheim Fire & Rescue, which is the city's own fire department. The department says it has more than 250 trained fire professionals and 11 fire stations serving about 50 square miles, including the areas that interface with wildlands. For a hills address, the city's fire hazard severity zone page is still the place to check whether the parcel is in a mapped zone.",
    },
  ],

  updated: "2026-09-20",
};
