import { isHomeownerPreview } from "@/lib/previewMode";

// The words OakTend uses to describe itself to a search engine, in ONE place.
//
// Four surfaces have to say the same thing about what OakTend is: the default
// <title> and meta description (src/app/layout.tsx), the Organization JSON-LD
// (same file), the "What is OakTend?" section on the landing page
// (src/app/page.tsx) and the About page (src/app/about/page.tsx). Search
// engines and AI answer tools build their one-line summary of a business from
// whichever of those they read first, so a description that drifts between
// them turns into four slightly different answers to "what is OakTend?".
//
// Plain module, no "server-only": the layout, the pages and vitest all import
// it. Functions rather than constants wherever the preview flag is read, for
// the same reason isHomeownerPreview() is a function (src/lib/previewMode.ts):
// a module-level constant would be frozen at first import and a test could not
// flip it with vi.stubEnv.

// THE FIXED ENTITY DESCRIPTION. Approved wording, used word for word wherever
// OakTend is defined. It names the category (home maintenance app), the place
// (Orange County, California) and the four things the product really does
// today. It makes no claim about pros, quotes, bookings or payments, so it is
// true with the preview flag on or off and does not need a variant.
export const ENTITY_DESCRIPTION =
  "OakTend is a free home maintenance app for Orange County, California homeowners. Add your home once and it builds a maintenance plan around the home's age and systems, keeps your photos, documents and warranties in one place, and gives you a home health score. Ask OakTend a question and it answers from your home's own record.";

// The one-sentence category line: under the landing page's H1 and anywhere a
// short definition is needed.
export const CATEGORY_SENTENCE =
  "OakTend is a free home maintenance app for Orange County homeowners.";

// The brand line the default <title> carried before it was aimed at a search.
// Still the non-preview default, and still on the page as the tagline.
const BRAND_TITLE = "OakTend: Your home, looked after";

// 52 characters, so it is not cut off in a search result.
const PREVIEW_TITLE = "OakTend: free home maintenance app for Orange County";

// Names the category, the county and the main features. No pro, quote,
// booking or payment claim: there is no pro network during the preview.
const PREVIEW_DESCRIPTION =
  "OakTend is a free home maintenance app for Orange County homeowners. Add your home once and get a maintenance plan, reminders, a home health score, and a safe place for documents and warranties.";

const FULL_DESCRIPTION =
  "Keep your house in good shape, know what needs attention, store your home docs, and reach a local pro when something breaks.";

// The site-wide default <title>: what the landing page shows, and what any
// page without a title of its own falls back to. Inner pages keep the
// "%s | OakTend" template in src/app/layout.tsx.
//
// PREVIEW ONLY, on purpose. "free" is a claim about price, and it is only
// unconditionally true while everything in the app is free. Outside the
// preview the brand line comes back untouched, and whoever retires the preview
// decides what the title should promise then.
export function siteTitle(): string {
  return isHomeownerPreview() ? PREVIEW_TITLE : BRAND_TITLE;
}

// The site-wide default meta description, which is also the text a link
// preview shows for any page without its own.
export function siteDescription(): string {
  return isHomeownerPreview() ? PREVIEW_DESCRIPTION : FULL_DESCRIPTION;
}
