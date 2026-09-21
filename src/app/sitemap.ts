import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMissingSchemaError } from "@/lib/dbErrors";
import { LAUNCH_CITY_NAMES } from "@/lib/serviceArea";
import { GUIDE_DATES, GUIDE_PATHS } from "@/lib/guides";
import { isHomeownerPreview } from "@/lib/previewMode";

// Sitemap for crawlers: the public landing pages, the two hand-written city
// landing pages (src/app/fountain-valley, src/app/huntington-beach) plus the
// other 34 Orange County cities/communities (src/app/oc/[city]), the
// Privacy/Terms/DMCA
// pages (src/app/privacy, src/app/terms, src/app/pro-terms, src/app/dmca),
// the AI disclosure (src/app/ai-disclosure), the public contact form
// (src/app/contact - the replacement for the FOUNDER.email mailto links
// those legal pages used to show), the public guide pages
// (src/app/guides/..., anon-readable, see the middleware allowlist), plus
// every pro's public page (/p/..., anon-readable by design). The contractors
// table is NOT publicly readable, so the list comes from the service-role
// admin client; only id/slug ever leave the query, both of which are already
// public via the /p/ pages themselves. That client bypasses RLS, so the pro
// query below has to re-state the visibility rules /p/<id> itself applies by
// hand, or the sitemap advertises pages the site hides. Slug URLs are
// preferred (0043); rows without a slug (pre-migration) fall back to their
// UUID URL.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Regenerate at most once an hour, and serve the cached XML in between.
//
// This file is read by crawlers, never by a signed-in person: it touches no
// cookies and no request headers, and its one query runs through the
// service-role admin client, so every visitor gets byte-identical output.
// Without this, the admin-client fetch underneath opts the route out of Next's
// data cache and every crawler hit re-runs the pro query and rebuilds the whole
// document. An hour is well inside how often a crawler re-reads a sitemap, and
// a pro who claims a page is picked up on the next regeneration rather than the
// next request - which is the same day either way, and Google's own recrawl
// latency dwarfs it.
export const revalidate = 3600;

// LASTMOD, AND WHY THESE ARE HARD-CODED DATES.
//
// This sitemap used to carry no <lastmod> at all. The tempting fix is
// `lastModified: new Date()`, which is what most Next sitemaps do and what
// this one was about to grow - and it is a lie on every single URL: it says
// "/terms changed today" every hour forever. Google's published guidance is
// that it drops a site's lastmod values entirely once it catches them not
// matching the page, so a fabricated date does not just fail to help, it
// costs the URLs whose dates are real.
//
// So: a per-page date, read once out of git history
// (`git log -1 --format=%cs -- <path>`) and written down. Not computed at
// request time - a serverless sitemap route cannot shell out to git, and
// Vercel builds from a shallow clone anyway.
//
// KEEPING IT HONEST: when you change what one of these pages SAYS, bump its
// date here in the same change. A refactor or a dependency bump is not a
// content change. If a page is missing from this map it simply gets no
// lastmod, which is the correct answer for "we don't know" - an absent
// lastmod tells a crawler to work it out itself, a wrong one teaches it to
// stop believing the rest of the file.
//
// The legal pages render markdown out of src/content/legal/*.md
// (src/components/LegalDocument.tsx), so their dates come from the .md file,
// not from the thin page.tsx wrapper around it - the wrapper is not where
// the words live.
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-09-20",
  "/pros": "2026-09-20",
  "/pricing": "2026-09-17",
  "/emergency-help": "2026-09-20",
  // The city pages: 2026-09-18, this pass. It rewrote their headline, title,
  // description and pro-promise copy for the preview (src/lib/previewMode.ts)
  // and added the breadcrumb line, so the words on the page really did change
  // today; their previous git date (2026-09-03) would now be wrong.
  "/fountain-valley": "2026-09-20",
  "/huntington-beach": "2026-09-20",
  // The county hub, src/app/oc/page.tsx. Its own date: see lastModifiedFor.
  "/oc": "2026-09-20",
  "/privacy": "2026-09-20",
  "/terms": "2026-09-20",
  "/pro-terms": "2026-09-20",
  "/pro-data-addendum": "2026-09-20",
  "/ai-disclosure": "2026-09-20",
  "/dmca": "2026-09-16",
  "/billing": "2026-09-20",
  "/sms-terms": "2026-09-20",
  "/accessibility": "2026-09-20",
  "/guidelines": "2026-09-20",
  "/security": "2026-09-03",
  "/law-enforcement": "2026-09-15",
  "/cookies": "2026-09-20",
  "/subprocessors": "2026-09-20",
  "/privacy-choices": "2026-09-20",
  "/contact": "2026-09-17",
  "/about": "2026-09-20",
};

// Every /oc/<city> page is the same file with a different city name in it
// (src/app/oc/[city]/page.tsx), so they all share one date. Its own constant
// rather than a "/oc" key in the map above, because "/oc" is a real page with
// a history of its own (the county hub, src/app/oc/page.tsx).
//
// PER-CITY DATES: not yet, because on this branch there is nothing to read
// one from - all 34 pages render from one template and one shared copy file.
// The researched city pages (src/content/cities/<slug>.ts, on the city-pages
// branch) are one file per city. When they merge, give each file a
// `lastUpdated` and add it to CITY_LAST_MODIFIED below; any city without an
// entry keeps the shared date, so a partial rollout stays honest.
const CITY_PAGES_LAST_MODIFIED = "2026-09-20";
const CITY_LAST_MODIFIED: Record<string, string> = {};

function lastModifiedFor(path: string): string | undefined {
  if (path.startsWith("/oc/")) {
    return CITY_LAST_MODIFIED[path] ?? CITY_PAGES_LAST_MODIFIED;
  }
  return LAST_MODIFIED[path];
}

// PREVIEW MODE: the three pro-side pages are left out while the pro side is
// closed. /pros is a short coming-soon page with a waitlist form, and the two
// pro legal documents govern a product nobody can sign up for yet. All three
// still exist and still return 200 (a pro following a link must reach them),
// so this is not a noindex - they are simply not pages worth asking a crawler
// to spend its visit on, and /pros at priority 0.8 was telling it the
// opposite. With the flag off all three are listed exactly as before.
const PREVIEW_HIDDEN_PATHS = new Set(["/pros", "/pro-terms", "/pro-data-addendum"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MODIFIED["/"],
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pros`,
      lastModified: LAST_MODIFIED["/pros"],
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Public and account-free (see isPublicPath in
    // src/lib/supabase/middleware.ts), each with its own metadata and
    // canonical, and each a real entry point: /pricing is where a homeowner
    // checks the cost before signing up, and /emergency-help is the anonymous
    // burst-pipe/gas-smell page someone reaches by searching mid-panic.
    // Neither was listed here, so crawlers had no sitemap signal for them.
    {
      url: `${SITE_URL}/pricing`,
      lastModified: LAST_MODIFIED["/pricing"],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/emergency-help`,
      lastModified: LAST_MODIFIED["/emergency-help"],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/fountain-valley`,
      lastModified: LAST_MODIFIED["/fountain-valley"],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/huntington-beach`,
      lastModified: LAST_MODIFIED["/huntington-beach"],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // The county hub that lists all 36 (src/app/oc/page.tsx). Above the city
    // pages in priority because it is the page aimed at the county-wide
    // search, and every city page's breadcrumb points up to it.
    {
      url: `${SITE_URL}/oc`,
      lastModified: LAST_MODIFIED["/oc"],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // The other 34 Orange County cities/communities (src/app/oc/[city]):
    // same list as the CITY_CHIPS on the homepage (src/app/page.tsx) and the
    // page's own generateStaticParams, all three reading LAUNCH_CITY_NAMES
    // (src/lib/serviceArea.ts) so they can't drift out of sync.
    ...LAUNCH_CITY_NAMES.filter(
      (city) => city !== "Fountain Valley" && city !== "Huntington Beach"
    ).map((city) => {
      const path = `/oc/${city.toLowerCase().replace(/\s+/g, "-")}`;
      return {
        url: `${SITE_URL}${path}`,
        lastModified: lastModifiedFor(path),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_MODIFIED["/privacy"],
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LAST_MODIFIED["/terms"],
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/pro-terms`,
      lastModified: LAST_MODIFIED["/pro-terms"],
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/pro-data-addendum`,
      lastModified: LAST_MODIFIED["/pro-data-addendum"],
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/ai-disclosure`,
      lastModified: LAST_MODIFIED["/ai-disclosure"],
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/dmca`,
      lastModified: LAST_MODIFIED["/dmca"],
      changeFrequency: "monthly",
      priority: 0.3,
    },
    // Rest of the legal document set (src/content/legal/*.md): same low
    // priority and monthly cadence as the legal pages above, since none of
    // these change often and none is a real entry point for a new visitor.
    ...(
      ["/billing", "/sms-terms", "/accessibility", "/guidelines", "/security", "/law-enforcement", "/cookies", "/subprocessors", "/privacy-choices"] as const
    ).map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: lastModifiedFor(path),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
    {
      url: `${SITE_URL}/contact`,
      lastModified: LAST_MODIFIED["/contact"],
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: LAST_MODIFIED["/about"],
      changeFrequency: "monthly",
      priority: 0.4,
    },
    // GUIDE_PATHS and the dates both come from src/lib/guides.ts, which is
    // also what src/components/GuideArticleJsonLd.tsx builds each guide's
    // Article node from. One map, so the <lastmod> here and the dateModified
    // in the page's own structured data are the same string by construction.
    ...GUIDE_PATHS.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: GUIDE_DATES[path]?.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const preview = isHomeownerPreview();
  const entries = preview
    ? allEntries.filter(
        (entry) => !PREVIEW_HIDDEN_PATHS.has(entry.url.slice(SITE_URL.length))
      )
    : allEntries;

  // PREVIEW MODE: NO /p/ URLs AT ALL, and this is not a judgement call.
  //
  // While NEXT_PUBLIC_PREVIEW_MODE=homeowner, every public pro page is
  // unreachable for an anonymous crawler, by two independent rules:
  //
  //   * src/app/p/[id]/page.tsx - a non-internal pro's profile is forced to
  //     null and the page calls notFound(). A real 404.
  //   * public_pro_profile() (0165 Part 9) - an INTERNAL pro's row only
  //     matches for an internal caller, and a crawler's auth.uid() is null,
  //     so it 404s for them too.
  //
  // Internal or not, /p/<anything> is a 404 to Googlebot right now, so
  // listing any of it would be handing a crawler a sitemap full of
  // guaranteed 404s - the single worst thing a sitemap can contain.
  //
  // The only other preview-dependent thing in this file is
  // PREVIEW_HIDDEN_PATHS above: the rest of the marketing pages all still
  // exist, they just say different things (src/lib/previewMode.ts).
  if (preview) return entries;

  try {
    const admin = createAdminClient();
    // Cast: the generated types predate the slug column (0043) and
    // database.types.ts is not regenerated here.
    //
    // THE THREE FILTERS, and where each comes from. This is a service-role
    // read, so RLS does not apply and none of these happen on their own; the
    // rule is that the sitemap must never list a URL that /p/<id> would 404.
    //
    //   user_id is not null    - public_pro_profile (0165 Part 9:
    //                            `c.user_id is not null`) and browse_pros
    //                            (0165 Part 8, same line). An unclaimed or
    //                            seeded row has no owner behind it, and the
    //                            RPC the page calls returns nothing for it,
    //                            so /p/<id> 404s.
    //   serves_orange_county   - the launch-market gate. public_pro_profile
    //                            has `coalesce(c.serves_orange_county, false)`
    //                            and browse_pros has
    //                            `c.serves_orange_county = true`; a pro
    //                            outside it 404s on /p/ as well as being
    //                            unreachable through the product.
    //   is_internal = false    - the team's own test pros (0165). Both RPCs
    //                            carry `coalesce(c.is_internal, false) =
    //                            is_internal_user(auth.uid())`, and a crawler
    //                            is anonymous, so is_internal_user() is false
    //                            and an internal row never matches. Listing
    //                            one would be advertising a guaranteed 404.
    //
    // NOT FILTERED, because there is nothing to filter on: contractors has no
    // hidden/suspended/noindex flag (checked against database.types.ts and
    // every `add column` in supabase/migrations), and /p/[id] sets no robots
    // noindex of its own. The three above are the whole rule.
    let { data, error } = await (admin.from("contractors") as any)
      .select("id, slug")
      .not("user_id", "is", null)
      .eq("serves_orange_county", true)
      .eq("is_internal", false)
      .order("created_at", { ascending: true })
      .limit(5000);
    // 0165 has not been pasted to this database yet: is_internal does not
    // exist, so Postgres rejects the WHOLE query rather than ignoring the
    // filter. Retry without it - nobody is internal on such a database, so
    // dropping the filter is exactly the pre-0165 result, and a sitemap with
    // no pro pages in it would be a real SEO regression to accept silently.
    if (error && isMissingSchemaError(error)) {
      ({ data, error } = await (admin.from("contractors") as any)
        .select("id, slug")
        .not("user_id", "is", null)
        .eq("serves_orange_county", true)
        .order("created_at", { ascending: true })
        .limit(5000));
    }
    if (!error && Array.isArray(data)) {
      for (const row of data as { id: string; slug: string | null }[]) {
        entries.push({
          url: `${SITE_URL}/p/${row.slug ?? row.id}`,
          // NO lastModified, deliberately. The contractors table has a
          // created_at and no updated_at (see database.types.ts), so there is
          // no column that says when this profile last changed. created_at
          // would answer "when the pro signed up", which is not the same
          // question and would freeze at a date the page has long since moved
          // past; `new Date()` would claim every profile changed this hour.
          // Omitting the field is the honest answer, and it is the one the
          // sitemap spec is built for.
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  } catch {
    // Env/DB hiccup: still serve the static entries rather than 500 the
    // sitemap route.
  }

  return entries;
}
