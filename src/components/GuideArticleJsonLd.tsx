import { buildGuideArticleJsonLd } from "@/lib/guides";

// Article JSON-LD for one guide page. One shared component rather than the
// same twelve-line block copy-pasted into all 12 guides, for the same reason
// GuideCta is shared: a change to the schema shape, the publisher node, or
// the escaping has to happen in one place or it happens in eleven.
//
// Sits alongside each guide's existing FAQPage script, not instead of it:
// they describe different things (the page is an Article; the Q&A block
// inside it is an FAQPage), and Google reads both.
//
// Dates come from src/lib/guides.ts, the same map src/app/sitemap.ts reads
// its <lastmod> from, so the date in the markup and the date in the sitemap
// can never disagree. A path with no entry in that map renders nothing at
// all - an Article node with no dateModified is not worth emitting, and a
// made-up date is worse than none.
//
// Server component, no client JS: everything here is a build-time constant.
// Escaping matches StructuredData.tsx and the FAQ blocks: "<" goes to its
// unicode form so a value containing "</script>" cannot close the tag early.
export default function GuideArticleJsonLd({
  path,
  headline,
  description,
  siteUrl,
}: {
  /** The guide's own path, e.g. "/guides/adu-cost". Keyed into GUIDE_DATES. */
  path: string;
  headline: string;
  description: string;
  siteUrl: string;
}) {
  const data = buildGuideArticleJsonLd({ path, headline, description, siteUrl });
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
