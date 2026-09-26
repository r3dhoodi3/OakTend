import type { LaunchCityName } from "@/lib/serviceArea";

// How old Orange County's housing is, city by city: the data behind
// /guides/orange-county-home-age, rendered by src/components/OcHomeAgeTable.tsx.
//
// WHERE EVERY NUMBER COMES FROM. U.S. Census Bureau, American Community Survey
// 5-year estimates 2020-2024, read through the Census Reporter API
// (api.censusreporter.org, release acs2024_5yr) on 2026-09-26:
//
//   units         B25034 row 1, total housing units.
//   pre1980       Our sum of the "1970 to 1979", "1960 to 1969", "1950 to
//                 1959", "1940 to 1949" and "1939 or earlier" rows of B25034,
//                 over the total, as a percent to one decimal. So "built
//                 before 1980" means built in 1979 or earlier.
//   pre1980Moe    Our approximate 90 percent margin of error for that share,
//                 from the published row margins, using the Census Bureau's
//                 formula for a derived proportion. Rounded to one decimal.
//   since2000     Our sum of the "2000 to 2009", "2010 to 2019" and "2020 or
//                 later" rows, over the total.
//   medianYear    B25035, median year structure built, as published, with
//                 its published margin of error in medianYearMoe.
//
// The same B25034 sums, rounded to whole percents, are the "built before 1980"
// column on the remodel and trade cost guides (OC_PRE_1980 and `pre1980` in
// src/lib/ocRemodelCities.ts): Orange County 56.8 here is 57 there, Fountain
// Valley 82.3 is 82, Irvine 20.7 is 21. src/lib/ocHomeAgeAndRebates.test.ts
// holds the two files to each other.
//
// All 34 incorporated cities plus the county. Unincorporated communities
// (Ladera Ranch, Midway City and the rest) are left out: the census places for
// them are not cities, and mixing the two would invite a comparison the table
// is not built for. Sorted by pre1980, oldest first.
//
// WHEN THE NEXT 5-YEAR RELEASE COMES OUT: re-pull both tables for every row
// at once, never one city at a time (the Census Bureau advises against
// comparing overlapping 5-year periods), and update ocRemodelCities.ts in the
// same change.

export type OcHomeAgeRow = {
  name: LaunchCityName;
  units: number;
  pre1980: number;
  pre1980Moe: number;
  since2000: number;
  medianYear: number;
  medianYearMoe: number;
};

export const OC_HOME_AGE_COUNTY = {
  name: "Orange County",
  units: 1146169,
  pre1980: 56.8,
  pre1980Moe: 0.5,
  since2000: 17.7,
  medianYear: 1977,
  medianYearMoe: 1,
} as const;

export const OC_HOME_AGE_CITIES: OcHomeAgeRow[] = [
  { name: "Laguna Woods", units: 13336, pre1980: 89.7, pre1980Moe: 5.0, since2000: 1.7, medianYear: 1969, medianYearMoe: 1 },
  { name: "Seal Beach", units: 14632, pre1980: 88.9, pre1980Moe: 3.5, since2000: 5.0, medianYear: 1966, medianYearMoe: 1 },
  { name: "Fountain Valley", units: 19227, pre1980: 82.3, pre1980Moe: 3.0, since2000: 5.6, medianYear: 1972, medianYearMoe: 1 },
  { name: "Villa Park", units: 1971, pre1980: 81.5, pre1980Moe: 10.8, since2000: 4.3, medianYear: 1974, medianYearMoe: 2 },
  { name: "La Palma", units: 5206, pre1980: 81.1, pre1980Moe: 6.5, since2000: 8.0, medianYear: 1972, medianYearMoe: 2 },
  { name: "Garden Grove", units: 50960, pre1980: 77.4, pre1980Moe: 2.2, since2000: 7.2, medianYear: 1965, medianYearMoe: 1 },
  { name: "La Habra", units: 21225, pre1980: 76.6, pre1980Moe: 3.7, since2000: 7.7, medianYear: 1968, medianYearMoe: 2 },
  { name: "Buena Park", units: 24877, pre1980: 76.2, pre1980Moe: 3.3, since2000: 9.5, medianYear: 1965, medianYearMoe: 2 },
  { name: "Cypress", units: 16920, pre1980: 75.8, pre1980Moe: 4.1, since2000: 9.6, medianYear: 1971, medianYearMoe: 1 },
  { name: "Westminster", units: 29269, pre1980: 75.8, pre1980Moe: 3.2, since2000: 8.9, medianYear: 1971, medianYearMoe: 2 },
  { name: "Laguna Beach", units: 13598, pre1980: 75.6, pre1980Moe: 4.9, since2000: 8.9, medianYear: 1964, medianYearMoe: 2 },
  { name: "Santa Ana", units: 83701, pre1980: 73.9, pre1980Moe: 2.2, since2000: 11.1, medianYear: 1969, medianYearMoe: 1 },
  { name: "Fullerton", units: 50344, pre1980: 71.3, pre1980Moe: 2.4, since2000: 13.0, medianYear: 1969, medianYearMoe: 2 },
  { name: "Los Alamitos", units: 4623, pre1980: 70.5, pre1980Moe: 7.3, since2000: 10.4, medianYear: 1970, medianYearMoe: 3 },
  { name: "Huntington Beach", units: 82624, pre1980: 69.2, pre1980Moe: 1.6, since2000: 10.3, medianYear: 1974, medianYearMoe: 1 },
  { name: "Costa Mesa", units: 44427, pre1980: 68.3, pre1980Moe: 2.4, since2000: 11.0, medianYear: 1972, medianYearMoe: 2 },
  { name: "Stanton", units: 13269, pre1980: 65.2, pre1980Moe: 4.2, since2000: 12.6, medianYear: 1975, medianYearMoe: 2 },
  { name: "Anaheim", units: 110705, pre1980: 65.1, pre1980Moe: 1.8, since2000: 14.3, medianYear: 1973, medianYearMoe: 2 },
  { name: "Orange", units: 46952, pre1980: 64.3, pre1980Moe: 2.6, since2000: 12.7, medianYear: 1973, medianYearMoe: 2 },
  { name: "Placentia", units: 17890, pre1980: 59.5, pre1980Moe: 3.1, since2000: 14.3, medianYear: 1976, medianYearMoe: 1 },
  { name: "Newport Beach", units: 45185, pre1980: 54.9, pre1980Moe: 3.0, since2000: 19.0, medianYear: 1978, medianYearMoe: 2 },
  { name: "Brea", units: 17373, pre1980: 54.5, pre1980Moe: 4.0, since2000: 24.9, medianYear: 1978, medianYearMoe: 2 },
  { name: "Dana Point", units: 16484, pre1980: 53.1, pre1980Moe: 4.7, since2000: 7.6, medianYear: 1979, medianYearMoe: 1 },
  { name: "San Juan Capistrano", units: 13071, pre1980: 52.7, pre1980Moe: 4.4, since2000: 17.1, medianYear: 1979, medianYearMoe: 2 },
  { name: "Mission Viejo", units: 34285, pre1980: 52.2, pre1980Moe: 1.9, since2000: 7.9, medianYear: 1979, medianYearMoe: 2 },
  { name: "Laguna Hills", units: 12072, pre1980: 48.3, pre1980Moe: 4.4, since2000: 6.4, medianYear: 1980, medianYearMoe: 2 },
  { name: "Tustin", units: 28482, pre1980: 47.2, pre1980Moe: 2.8, since2000: 21.2, medianYear: 1983, medianYearMoe: 3 },
  { name: "San Clemente", units: 27058, pre1980: 43.5, pre1980Moe: 3.0, since2000: 25.5, medianYear: 1983, medianYearMoe: 2 },
  { name: "Yorba Linda", units: 23887, pre1980: 39.4, pre1980Moe: 2.7, since2000: 20.2, medianYear: 1984, medianYearMoe: 2 },
  { name: "Lake Forest", units: 31821, pre1980: 38.0, pre1980Moe: 1.9, since2000: 15.2, medianYear: 1984, medianYearMoe: 1 },
  { name: "Laguna Niguel", units: 27643, pre1980: 23.8, pre1980Moe: 2.0, since2000: 12.0, medianYear: 1986, medianYearMoe: 1 },
  { name: "Irvine", units: 120206, pre1980: 20.7, pre1980Moe: 0.9, since2000: 53.1, medianYear: 2002, medianYearMoe: 2 },
  { name: "Aliso Viejo", units: 20507, pre1980: 5.6, pre1980Moe: 1.3, since2000: 23.9, medianYear: 1995, medianYearMoe: 1 },
  { name: "Rancho Santa Margarita", units: 17498, pre1980: 4.3, pre1980Moe: 1.3, since2000: 9.8, medianYear: 1992, medianYearMoe: 1 },
];

// Census Reporter's table view for the county and every census place in it
// (the 34 cities plus the unincorporated places the table above leaves out).
export const CENSUS_B25034_ALL_HREF =
  "https://censusreporter.org/data/table/?table=B25034&geo_ids=05000US06059,160%7C05000US06059";
export const CENSUS_B25035_ALL_HREF =
  "https://censusreporter.org/data/table/?table=B25035&geo_ids=05000US06059,160%7C05000US06059";

// "1.0" prints as "1.0", not "1": every share on the page keeps its decimal.
export function formatShare(value: number): string {
  return value.toFixed(1);
}

export function formatUnits(value: number): string {
  return value.toLocaleString("en-US");
}
