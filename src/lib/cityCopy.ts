import {
  isHomeownerPreview,
  previewCityDescription,
  previewCityHeadline,
  previewCityTitle,
} from "@/lib/previewMode";

// EVERY WORD A CITY PAGE SAYS ABOUT PROS, IN ONE FUNCTION.
//
// The three city routes (src/app/fountain-valley, src/app/huntington-beach,
// src/app/oc/[city]) each need the same strings in two places that are
// nowhere near each other: the metadata export (title/description, which feed
// the tab, the search snippet, the OG card and the Twitter card) and the
// rendered page (the h1, in src/components/CityLandingPage.tsx). Before this
// they were hand-typed in both, per route, which is how /fountain-valley's
// <title> and its <h1> could have said different things without anyone
// noticing.
//
// PREVIEW MODE. With NEXT_PUBLIC_PREVIEW_MODE=homeowner there is no pro
// network to apply to, so the pro-promise half of each string is swapped for
// the approved wording in src/lib/previewMode.ts. With the flag OFF this
// returns exactly the strings these pages shipped before, character for
// character - the non-preview branches below are the old literals moved, not
// rewritten.
//
// IN src/lib, NOT IN THE COMPONENT, because it is pure string logic with no
// JSX in it: it can be unit-tested against both settings of the flag without
// rendering anything (src/lib/cityCopy.test.ts).
//
// Called at module scope by the two hand-written pages' `export const
// metadata`, which is the same build-time read of the flag src/app/layout.tsx
// already does for the site-wide description.

export type CityPageCopy = {
  /** <title>, OG title, Twitter title. */
  title: string;
  /** Meta description, OG description, Twitter description. */
  description: string;
  /** The page's one <h1>. */
  headline: string;
};

export function cityPageCopy(city: string): CityPageCopy {
  const preview = isHomeownerPreview();
  return {
    title: preview
      ? previewCityTitle(city)
      : `Home maintenance and local pros in ${city}, CA`,
    description: preview
      ? previewCityDescription(city)
      : `A maintenance plan built for your ${city} home, answers about your own systems, and license-checked local pros when something breaks. Free to start.`,
    headline: preview
      ? previewCityHeadline(city)
      : `Home maintenance and local pros in ${city}`,
  };
}
