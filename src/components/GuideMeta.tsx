import Link from "next/link";
import { guideUpdated } from "@/lib/guideExtras";

// The "who wrote this, and when" line under every guide's h1.
//
// The date is read from GUIDE_DATES (src/lib/guides.ts) through
// guideUpdated(), the same map the sitemap's <lastmod> and the Article node's
// dateModified use, so the date a reader sees and the two dates a crawler sees
// are one string. When a guide has no date the date half is left out rather
// than guessed.
//
// "The OakTend team", not a person's name: no individual author is named in
// any public copy, and an invented byline would be worse than an honest team
// one. It links to /about, which says who the team is and where the facts in
// these guides come from.
//
// A server component with no state, so it costs the guide pages no client JS.
export default function GuideMeta({ path }: { path: string }) {
  const updated = guideUpdated(path);
  return (
    <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
      {updated && (
        <>
          Updated <time dateTime={updated.iso}>{updated.label}</time>.{" "}
        </>
      )}
      By{" "}
      <Link
        href="/about"
        className="underline hover:text-bark-700 hover:no-underline dark:hover:text-stone-300"
      >
        the OakTend team
      </Link>
      .
    </p>
  );
}
