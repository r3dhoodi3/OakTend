import Link from "next/link";
import { GUIDE_TITLES } from "@/lib/guides";
import { GUIDE_RELATED, guideSources } from "@/lib/guideExtras";
import { cityPath } from "@/lib/ocRegions";

// The block at the foot of every guide, above the call to action: the guide's
// sources (only when it has verified ones), three related guides, and a
// handful of city pages.
//
// All three lists come from src/lib/guideExtras.ts, keyed by the guide's path,
// so a guide page only has to say which guide it is. Read the rule on sources
// there before adding one.
//
// Source links open the publisher's own page. rel="noopener" only, on purpose:
// these are statutes and government pages cited as evidence, so there is no
// reason to mark them nofollow.
//
// A server component with no state. Plain text links in the same muted style
// as the rest of the guide, one column on a phone with 44px rows, two from sm
// up.

const headingClass =
  "text-lg font-semibold text-stone-900 dark:text-stone-100";
const listLinkClass =
  "flex min-h-11 items-center text-sm font-medium text-bark-700 hover:underline sm:min-h-0 sm:py-1 dark:text-stone-300";

export default function GuideRelated({ path }: { path: string }) {
  const related = GUIDE_RELATED[path];
  const sources = guideSources(path);
  if (!related && sources.length === 0) return null;

  return (
    <div className="mt-10 space-y-8 border-t border-stone-200 pt-8 dark:border-white/10">
      {sources.length > 0 && (
        <section>
          <h2 className={headingClass}>Sources</h2>
          <ul className="mt-2 space-y-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  rel="noopener"
                  className="font-medium text-bark-700 underline hover:no-underline dark:text-stone-300"
                >
                  {source.label}
                </a>
                <br />
                {source.supports}
              </li>
            ))}
          </ul>
        </section>
      )}

      {related && (
        <>
          <section>
            <h2 className={headingClass}>Related guides</h2>
            <ul className="mt-2">
              {related.guides.map((href) => (
                <li key={href}>
                  <Link href={href} className={listLinkClass}>
                    {GUIDE_TITLES[href]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={headingClass}>Home maintenance by city</h2>
            <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
              {related.cities.map((city) => (
                <li key={city}>
                  <Link href={cityPath(city)} className={listLinkClass}>
                    {city}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/oc" className={listLinkClass}>
                  All Orange County cities
                </Link>
              </li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
