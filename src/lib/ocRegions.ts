import type { LaunchCityName } from "@/lib/serviceArea";

// The 36 launch cities grouped into the four areas people in Orange County
// actually use when they talk about the county. Read by the county hub page
// (src/app/oc/page.tsx).
//
// This is a READING AID for one page, not a product boundary. Nothing gates on
// it, nothing is stored against it, and the grouping is a judgement call at
// the edges (Costa Mesa touches the coast without having one; Seal Beach is
// both north and coastal). Where a city could sit in two groups it goes where
// its homes have more in common with their neighbours: salt air decides
// "Coastal", build era decides the rest.
//
// src/lib/ocRegions.test.ts checks that every launch city is in exactly one
// region, so a city added to LAUNCH_CITY_NAMES cannot silently go missing from
// the hub.

export type OcRegion = {
  /** Anchor id on the hub page. */
  id: string;
  name: string;
  cities: LaunchCityName[];
};

export const OC_REGIONS: OcRegion[] = [
  {
    id: "north",
    name: "North Orange County",
    cities: [
      "Anaheim",
      "Brea",
      "Buena Park",
      "Cypress",
      "Fullerton",
      "La Habra",
      "La Palma",
      "Los Alamitos",
      "Placentia",
      "Stanton",
      "Yorba Linda",
    ],
  },
  {
    id: "central",
    name: "Central Orange County",
    cities: [
      "Costa Mesa",
      "Fountain Valley",
      "Garden Grove",
      "Irvine",
      "Midway City",
      "Orange",
      "Santa Ana",
      "Tustin",
      "Villa Park",
      "Westminster",
    ],
  },
  {
    id: "coastal",
    name: "Coastal Orange County",
    cities: [
      "Dana Point",
      "Huntington Beach",
      "Laguna Beach",
      "Newport Beach",
      "San Clemente",
      "Seal Beach",
    ],
  },
  {
    id: "south",
    name: "South Orange County",
    cities: [
      "Aliso Viejo",
      "Ladera Ranch",
      "Laguna Hills",
      "Laguna Niguel",
      "Laguna Woods",
      "Lake Forest",
      "Mission Viejo",
      "Rancho Santa Margarita",
      "San Juan Capistrano",
    ],
  },
];

// Where a city's page lives. Fountain Valley and Huntington Beach keep their
// own hand-written top-level pages; every other city is /oc/<slug>
// (src/app/oc/[city]/page.tsx, same lowercase-and-hyphenate slug).
export function cityPath(city: string): string {
  if (city === "Fountain Valley") return "/fountain-valley";
  if (city === "Huntington Beach") return "/huntington-beach";
  return `/oc/${city.toLowerCase().replace(/\s+/g, "-")}`;
}
