import Link from "next/link";
import {
  PROJECT_STARTERS,
  starterFor,
  type StarterSystem,
} from "@/lib/projectStarters";

// The "Thinking about a project?" chip row, shared by the dashboard (desktop
// only now - it is max-sm:hidden there) and the top of /contractors (phone
// only). It used to be inline JSX on the dashboard alone; two copies of the
// same twenty-one chips would have drifted the moment either list changed, so
// the row lives here and both pages render the same markup.
//
// Every chip lands on a GENUINELY prefilled Post a job form: category, budget,
// timing and a fill-in-the-blanks description all ride in the URL (see
// src/lib/projectStarters.ts). It used to carry ?category= alone, which left
// the owner at an empty description box - the hardest part of posting.
//
// `systems` is this home's home_systems rows, when the caller already has them.
// A chip whose project replaces a system the owner actually owns gets one extra
// line ("Yours is 17 yrs old, past its typical life"); every other chip stays a
// one-line pill so the row does not get taller for everyone. Chips clear 44px
// on phone (max-sm:min-h-11) and are plain text labels - the REMODEL_PROJECTS
// icon field is not rendered anywhere.
export default function ProjectChips({
  systems,
}: {
  systems?: StarterSystem[] | null;
}) {
  const chipClass =
    "focus-ring rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700 shadow-sm hover:border-bark-500 hover:text-bark-700 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center dark:border-white/10 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-bark-600 dark:hover:text-stone-300";
  return (
    <div className="flex flex-wrap gap-2">
      {PROJECT_STARTERS.map((starter) => {
        const { href, nudge } = starterFor(starter, systems);
        return (
          <Link
            key={starter.label}
            href={href}
            // Static per category, never the owner's own text.
            data-track={`project:${starter.category}`}
            className={
              nudge
                ? // max-sm:items-start too: the base chip sets max-sm:items-center,
                  // which would center both lines of a two-line chip on phone.
                  `${chipClass} flex flex-col items-start text-left leading-tight max-sm:items-start`
                : chipClass
            }
          >
            {starter.label}
            {nudge && (
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {nudge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
