import type { CityContent } from "./types";
import { irvine } from "./irvine";
import { huntingtonBeach } from "./huntington-beach";
import { santaAna } from "./santa-ana";
import { fountainValley } from "./fountain-valley";
import { costaMesa } from "./costa-mesa";
import { newportBeach } from "./newport-beach";
import { anaheim } from "./anaheim";
import { missionViejo } from "./mission-viejo";
import { gardenGrove } from "./garden-grove";
import { orange } from "./orange";
import { fullerton } from "./fullerton";
import { tustin } from "./tustin";
import { westminster } from "./westminster";
import { lakeForest } from "./lake-forest";
import { yorbaLinda } from "./yorba-linda";

export type { CityContent, CityExposure, Fact } from "./types";

// The cities that have real, sourced content today. Partial on purpose: the
// other 21 Orange County cities and communities in LAUNCH_CITY_NAMES
// (src/lib/serviceArea.ts) still have pages, and those pages render exactly
// what they rendered before this module existed. A city joins this map only
// when a researcher has actually gathered its facts with sources, one file
// per city under this folder.
//
// Keys are the same slug the routes use: city name lowercased, spaces to
// hyphens, matching slugFor() in src/app/oc/[city]/page.tsx. Fountain Valley
// and Huntington Beach live at /fountain-valley and /huntington-beach rather
// than under /oc, but they are keyed by the same slug rule so there is one
// lookup, not two.
//
// src/content/cities/cities.test.ts asserts the invariants that keep this
// honest: every key matches its entry's slug, every source URL is https, no
// two cities share an intro or meta description, every guide href resolves to
// a real folder under src/app/guides, and every neighbor slug is a real
// launch city.
export const CITY_CONTENT: Partial<Record<string, CityContent>> = {
  [irvine.slug]: irvine,
  [huntingtonBeach.slug]: huntingtonBeach,
  [santaAna.slug]: santaAna,
  [fountainValley.slug]: fountainValley,
  [costaMesa.slug]: costaMesa,
  [newportBeach.slug]: newportBeach,
  [anaheim.slug]: anaheim,
  [missionViejo.slug]: missionViejo,
  // Second wave, researched 2026-09-19.
  [gardenGrove.slug]: gardenGrove,
  [orange.slug]: orange,
  [fullerton.slug]: fullerton,
  [tustin.slug]: tustin,
  [westminster.slug]: westminster,
  [lakeForest.slug]: lakeForest,
  [yorbaLinda.slug]: yorbaLinda,
};

// Content for a slug, or undefined when that city has not been researched
// yet. Callers treat undefined as "render the page the way it rendered
// before", never as an error: a city with no entry is the normal case today.
export function getCityContent(slug: string): CityContent | undefined {
  // hasOwnProperty rather than a bare index: this reads a plain object with a
  // value that arrives from the URL, and a bare lookup would happily return
  // Object.prototype's members for a crafted key. Same reasoning as
  // launchCityForZip() in src/lib/serviceArea.ts.
  return Object.prototype.hasOwnProperty.call(CITY_CONTENT, slug)
    ? CITY_CONTENT[slug]
    : undefined;
}
