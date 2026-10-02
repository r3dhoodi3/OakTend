import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideMeta from "@/components/GuideMeta";
import Breadcrumbs, { BreadcrumbJsonLd } from "@/components/Breadcrumbs";
import GuideArticleJsonLd from "@/components/GuideArticleJsonLd";
import { CHORES } from "@/content/chores";
import {
  CHORE_HUB_PATH,
  SYSTEM_HEADINGS,
  chorePath,
  choreReminderLine,
  getChore,
} from "@/lib/chores";
import { GUIDE_TITLES } from "@/lib/guides";

// One short how-to chore page (src/lib/chores.ts explains the section). The
// words live in src/content/chores.ts; this file only lays them out, in the
// same order on every page: what it is, why it matters here, how often, what
// you need, the steps, when to call a pro, safety, then sources.
//
// No FAQPage or HowTo JSON-LD on purpose, same as the guides: Article and
// BreadcrumbList only. Google retired HowTo rich results, and the steps are
// plain visible text either way.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// STATIC. Nothing here reads cookies(), headers(), searchParams or the
// database, so all pages prerender at build time (generateStaticParams) and
// an unknown slug is a real 404 (dynamicParams = false).
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return CHORES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const chore = getChore(slug);
  if (!chore) return {};
  const canonical = `${SITE_URL}${chorePath(slug)}`;
  return {
    title: chore.metaTitle,
    description: chore.description,
    alternates: { canonical },
    openGraph: {
      title: chore.metaTitle,
      description: chore.description,
      url: canonical,
      siteName: "OakTend",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: chore.metaTitle,
      description: chore.description,
    },
  };
}

const h2Class = "text-lg font-semibold text-stone-900 dark:text-stone-100";
const linkClass =
  "text-bark-700 underline hover:no-underline dark:text-stone-300";
const listLinkClass =
  "flex min-h-11 items-center text-sm font-medium text-bark-700 hover:underline sm:min-h-0 sm:py-1 dark:text-stone-300";

export default async function ChorePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const chore = getChore(slug);
  if (!chore) notFound();

  const path = chorePath(slug);
  const canonical = `${SITE_URL}${path}`;
  // Up to three other chores from the same system, for the "more" list.
  const more = CHORES.filter(
    (c) => c.system === chore.system && c.slug !== chore.slug
  ).slice(0, 3);

  return (
    <main className="mx-auto max-w-2xl px-6 pb-16 pt-10">
      <GuideArticleJsonLd
        path={path}
        headline={chore.title}
        description={chore.description}
        siteUrl={SITE_URL}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "How-tos", href: CHORE_HUB_PATH },
          { label: chore.metaTitle },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: "How-tos", href: CHORE_HUB_PATH },
          { name: chore.metaTitle, href: canonical },
        ]}
        siteUrl={SITE_URL}
      />

      <h1 className="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl dark:text-stone-100">
        {chore.title}
      </h1>
      <GuideMeta path={path} />

      <p className="mt-6 leading-relaxed text-stone-700 dark:text-stone-300">
        {chore.what}
      </p>

      <dl className="mt-6 grid gap-4 rounded-2xl border border-bark-100 bg-bark-50 p-5 sm:grid-cols-2 dark:border-bark-700 dark:bg-bark-700/20">
        <div>
          <dt className="text-sm font-medium text-stone-600 dark:text-stone-300">
            How often
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-stone-900 dark:text-stone-100">
            {chore.howOften}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-stone-600 dark:text-stone-300">
            What you need
          </dt>
          <dd className="mt-1 text-sm leading-relaxed text-stone-900 dark:text-stone-100">
            {chore.tools.join(", ")}
          </dd>
        </div>
      </dl>

      <div className="mt-8 space-y-6 text-stone-700 dark:text-stone-300">
        <section>
          <h2 className={h2Class}>Why it matters</h2>
          <p className="mt-2 leading-relaxed">{chore.whyOC}</p>
        </section>

        <section>
          <h2 className={h2Class}>Steps</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5 leading-relaxed">
            {chore.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className={h2Class}>When to call a pro</h2>
          <p className="mt-2 leading-relaxed">{chore.callAPro}</p>
        </section>

        <section>
          <h2 className={h2Class}>Safety</h2>
          <p className="mt-2 leading-relaxed">{chore.safety}</p>
        </section>

        {chore.relatedGuides.length > 0 && (
          <section>
            <h2 className={h2Class}>Go deeper</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed">
              {chore.relatedGuides.map((href) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {GUIDE_TITLES[href]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="rounded-xl border border-stone-200 bg-white p-5 text-center dark:border-stone-700 dark:bg-stone-800/40">
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            {choreReminderLine(slug)}
          </p>
          <Link href="/homeowner-signup" className="btn-primary mt-3 px-5 py-2">
            Get started free
          </Link>
        </div>

        <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">
          General information, not professional advice. Your equipment&apos;s
          manual comes first when it says something different.
        </p>
      </div>

      <div className="mt-10 space-y-8 border-t border-stone-200 pt-8 dark:border-white/10">
        <section>
          <h2 className={h2Class}>Sources</h2>
          <ul className="mt-2 space-y-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            {chore.sources.map((source) => (
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

        <section>
          <h2 className={h2Class}>More {SYSTEM_HEADINGS[chore.system].toLowerCase()}</h2>
          <ul className="mt-2">
            {more.map((c) => (
              <li key={c.slug}>
                <Link href={chorePath(c.slug)} className={listLinkClass}>
                  {c.metaTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link href={CHORE_HUB_PATH} className={listLinkClass}>
                All how-tos
              </Link>
            </li>
            <li>
              <Link
                href="/guides/orange-county-home-maintenance-checklist"
                className={listLinkClass}
              >
                Orange County home maintenance checklist
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
