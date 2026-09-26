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
import { buenaPark } from "./buena-park";
import { laHabra } from "./la-habra";
import { placentia } from "./placentia";
import { brea } from "./brea";
import { sanClemente } from "./san-clemente";
import { lagunaNiguel } from "./laguna-niguel";
import { cypress } from "./cypress";
import { danaPoint } from "./dana-point";
import { alisoViejo } from "./aliso-viejo";
import { laPalma } from "./la-palma";
import { lagunaBeach } from "./laguna-beach";
import { lagunaHills } from "./laguna-hills";
import { lagunaWoods } from "./laguna-woods";
import { losAlamitos } from "./los-alamitos";
import { ranchoSantaMargarita } from "./rancho-santa-margarita";
import { sanJuanCapistrano } from "./san-juan-capistrano";
import { sealBeach } from "./seal-beach";
import { stanton } from "./stanton";
import { villaPark } from "./villa-park";
import { laderaRanch } from "./ladera-ranch";
import { midwayCity } from "./midway-city";

export type { CityContent, CityExposure, Fact } from "./types";

// The cities that have real, sourced content. As of the fourth wave
// (2026-09-20) that is all 36 names in LAUNCH_CITY_NAMES
// (src/lib/serviceArea.ts). The type stays Partial on purpose: a name added
// to the launch list later still gets a page, rendered the way pages rendered
// before this module existed, and joins this map only when a researcher has
// actually gathered its facts with sources, one file per city under this
// folder.
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
  // Third wave, researched 2026-09-20.
  [buenaPark.slug]: buenaPark,
  [laHabra.slug]: laHabra,
  [placentia.slug]: placentia,
  [brea.slug]: brea,
  [sanClemente.slug]: sanClemente,
  [lagunaNiguel.slug]: lagunaNiguel,
  [cypress.slug]: cypress,
  [danaPoint.slug]: danaPoint,
  // Fourth wave, researched 2026-09-20: the last 11 cities and the two
  // unincorporated communities (Ladera Ranch, Midway City), which cite the
  // County of Orange where a city would cite its own departments.
  [alisoViejo.slug]: alisoViejo,
  [laPalma.slug]: laPalma,
  [lagunaBeach.slug]: lagunaBeach,
  [lagunaHills.slug]: lagunaHills,
  [lagunaWoods.slug]: lagunaWoods,
  [losAlamitos.slug]: losAlamitos,
  [ranchoSantaMargarita.slug]: ranchoSantaMargarita,
  [sanJuanCapistrano.slug]: sanJuanCapistrano,
  [sealBeach.slug]: sealBeach,
  [stanton.slug]: stanton,
  [villaPark.slug]: villaPark,
  [laderaRanch.slug]: laderaRanch,
  [midwayCity.slug]: midwayCity,
};

// Content for a slug, or undefined when that city has not been researched
// yet. Callers treat undefined as "render the page the way it rendered
// before", never as an error.
export function getCityContent(slug: string): CityContent | undefined {
  // hasOwnProperty rather than a bare index: this reads a plain object with a
  // value that arrives from the URL, and a bare lookup would happily return
  // Object.prototype's members for a crafted key. Same reasoning as
  // launchCityForZip() in src/lib/serviceArea.ts.
  return Object.prototype.hasOwnProperty.call(CITY_CONTENT, slug)
    ? CITY_CONTENT[slug]
    : undefined;
}

// The <title> for a city page: the city's own metaTitle when it has researched
// content and has written one, otherwise the shared title the caller passes in
// (cityPageCopy(city).title from src/lib/cityCopy.ts, which follows the preview
// flag). One function so the three city routes cannot disagree about the rule.
// A metaTitle is local facts only and says nothing about pros (cities.test.ts
// sweeps it with every other string), so it is safe with the flag on or off.
export function cityMetaTitle(slug: string, fallback: string): string {
  return getCityContent(slug)?.metaTitle ?? fallback;
}
