// The homeowner-preview switch, and the two copy strings every gated surface
// shows.
//
// WHAT PREVIEW MODE IS. Until the lawyer review lands, OakTend ships as a
// homeowner-only product: every homeowner feature is on and free, nothing
// anywhere can be paid for, and the contractor side is closed behind a
// "coming soon" page. When the review is done the whole thing flips back with
// one environment variable and a redeploy - there is no code change and no
// database change on the way back.
//
// NO "server-only" HERE, DELIBERATELY. Client components (the preview banner,
// the two native IAP screens) and vitest both import this, so it has to stay a
// plain module with no Node-only dependency. Everything that needs the admin
// client or a session lives in src/lib/previewModeServer.ts instead.
//
// NEXT_PUBLIC_, DELIBERATELY. A client component cannot read a private env
// var, and the banner and the native checkout screens are client components.
// The value is not a secret: it says "we are in preview", which every visitor
// can already see from the banner.
//
// READ AT CALL TIME, NOT AT MODULE LOAD. `const ON = process.env... === ...`
// at the top of this file would be evaluated once, when the module is first
// imported, which makes it impossible for a test to flip with vi.stubEnv and
// impossible for a dev server to pick up a changed .env.local without a
// restart. The function body re-reads the variable on every call; it is a
// string comparison, so the cost is nothing.
//
// EXACT-MATCH ON "homeowner", NOT A TRUTHINESS CHECK. `NEXT_PUBLIC_PREVIEW_MODE=false`
// or `=off` is a thing a person genuinely types when they mean "off", and a
// truthy check would read both as ON and close the contractor side of a live
// site. Only the one documented value turns this on; unset, empty, misspelled
// or anything else is normal behaviour.
export function isHomeownerPreview(): boolean {
  return process.env.NEXT_PUBLIC_PREVIEW_MODE === "homeowner";
}

// Shown wherever a membership, an upgrade, a trial or a checkout used to be.
// One constant rather than a literal per surface, so the answer a homeowner
// gets on /plus, in the profile menu, on the paywall banner and inside the
// native IAP screen is word-for-word the same.
export const PREVIEW_MEMBERSHIP_COPY =
  "Memberships are coming soon. Everything is free during our preview.";

// Shown wherever the contractor side used to be reachable.
export const PREVIEW_PROS_COPY = "Pros are coming soon.";

// The one message the pro waitlist form (src/app/pros/actions.ts) ever shows
// on its success path, whether the row was inserted, was already there, or was
// a bot's - it must never reveal whether an email was known. Lives here, not
// in the action file, because a "use server" module may export only async
// functions (the production build refuses a constant export).
export const PRO_WAITLIST_CONFIRMATION = "You're on the list.";

// Shown in place of "Pros can see it now" / "Pros usually apply within a day
// or two" on a just-posted job, in both spots /contractors makes that claim
// (the top banner right after posting, and the per-job "awaiting applicants"
// card). The job itself still saves normally - postJobAction never checks
// preview - so this corrects only the promise about pros, not the post
// itself. Decided 2026-09-17: posting stays OPEN during the preview and the
// team finds a pro for each job by hand, so the promise is "we'll find one
// for you", not "when it launches".
export const PREVIEW_JOB_POSTED_COPY =
  "Saved to your home's record. Our pro network isn't open yet. Our team may look for a local pro for this job by hand, but we can't promise to find one. If it's urgent, call a local licensed company now.";

// The intro under the "Post a job" heading during the preview. The normal
// line says "local pros apply", which is not what happens yet; this one says
// what does. One constant beside the banner copy above so the two agree.
export const PREVIEW_POST_JOB_INTRO =
  "Describe what you need and post it. Our pro network isn't open yet. Our team may look for a local pro by hand, but we can't promise to find one, so for anything urgent call a local licensed company.";

// ---------------------------------------------------------------------------
// CITY LANDING PAGES (/fountain-valley, /huntington-beach, /oc/<city>)
//
// These 36 pages are the ones Google actually sends strangers to, and every
// one of them sold "local pros in <city>" four times over: in the <h1>, in
// the <title>, in the meta description (which is also the OG and Twitter card
// text), and in a value card promising that "every pro who applies shows up
// in one place". During the preview no pro can apply, so all four were
// promises the product cannot keep to the exact visitor most likely to be
// meeting OakTend for the first time.
//
// City name is interpolated, so these are functions rather than the flat
// constants above - but they are the same idea: ONE place the wording lives,
// so the headline, the tab title, the search snippet and the share card can't
// drift from each other or from PREVIEW_JOB_POSTED_COPY, which is what a
// homeowner is shown the moment they act on any of them.
//
// Resolved through cityPageCopy() in src/components/CityLandingPage.tsx,
// which picks these or the normal wording. With the flag off, not one
// character of any city page changes.
// ---------------------------------------------------------------------------

// The <h1>. The normal one is "Home maintenance and local pros in <city>".
export function previewCityHeadline(city: string): string {
  return `Home maintenance for ${city} homeowners`;
}

// The <title>, which is also the OG/Twitter title. ", CA" is kept: it is the
// half of the normal title that does the local-search work, and it is true.
export function previewCityTitle(city: string): string {
  return `Home maintenance for ${city}, CA homeowners`;
}

// The meta description, which is also the OG/Twitter description. Says the
// same thing PREVIEW_JOB_POSTED_COPY says, in the shorter form a search
// snippet has room for.
export function previewCityDescription(city: string): string {
  return `A maintenance plan built for your ${city} home and answers about your own systems. Our pro network isn't open yet. Post a job and our team may look for a local pro by hand, with no promise of a match. Free during our preview.`;
}

// The third value card, which normally promises license-checked pros applying
// and a pile of quotes to compare.
export const PREVIEW_CITY_PROS_CARD_TITLE = "We may look for a local pro by hand";
export const PREVIEW_CITY_PROS_CARD_BODY =
  "Our pro network isn't open yet. Post your job and our team may look for a local pro by hand. We can't promise to find one. Any pro is an independent business we have not vetted, so check their license at cslb.ca.gov before you hire.";
