import Link from "next/link";
import {
  PROJECT_STARTERS,
  starterFor,
  type ProjectStarter,
  type StarterLink,
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
// The chips themselves stay identical one-line pills no matter what: a first
// cut put the home-record line INSIDE the matching chips, which made the row
// ragged (two-line pills next to one-line ones) and was rejected as sloppy.
// The home-aware part lives in its own short list above the row instead - at
// most three rows, most urgent first - so the row stays uniform and the thing
// worth reading is not hidden in a pill.

// Sort key for the home-record list: the nudge text is the only signal, and
// its wording is fixed in starterFor(), so ranking on it is safe.
function urgency(nudge: string): number {
  if (nudge.includes("past its typical life")) return 0;
  if (nudge.includes("near the end")) return 1;
  if (nudge.startsWith("Yours is")) return 2;
  return 3;
}

const MAX_RECORD_ROWS = 3;

export default function ProjectChips({
  systems,
}: {
  systems?: StarterSystem[] | null;
}) {
  const chipClass =
    "focus-ring rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-700 shadow-sm hover:border-bark-500 hover:text-bark-700 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center dark:border-white/10 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-bark-600 dark:hover:text-stone-300";

  const resolved: { starter: ProjectStarter; link: StarterLink }[] =
    PROJECT_STARTERS.map((starter) => ({
      starter,
      link: starterFor(starter, systems),
    }));

  const fromRecord = resolved
    .filter((r): r is { starter: ProjectStarter; link: StarterLink & { nudge: string } } =>
      r.link.nudge !== null
    )
    .sort((a, b) => urgency(a.link.nudge) - urgency(b.link.nudge))
    .slice(0, MAX_RECORD_ROWS);

  return (
    <div className="space-y-3">
      {fromRecord.length > 0 && (
        <ul aria-label="From your home record" className="space-y-1.5">
          {fromRecord.map(({ starter, link }) => (
            <li key={starter.label}>
              <Link
                href={link.href}
                // Static per category, never the owner's own text. A separate
                // id from the chip row so the two entry points count apart.
                data-track={`project-record:${starter.category}`}
                className="focus-ring flex items-center justify-between gap-3 rounded-lg border border-bark-200 bg-bark-50 px-3 py-2 text-sm hover:border-bark-500 max-sm:min-h-11 dark:border-bark-700 dark:bg-bark-700/30 dark:hover:border-bark-600"
              >
                <span className="min-w-0">
                  <span className="font-medium text-stone-900 dark:text-stone-100">
                    {starter.label}
                  </span>
                  <span className="text-stone-600 dark:text-stone-300">
                    {": "}
                    {link.nudge}
                  </span>
                </span>
                <span className="shrink-0 font-medium text-bark-700 dark:text-stone-300">
                  Start →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2">
        {resolved.map(({ starter, link }) => (
          <Link
            key={starter.label}
            href={link.href}
            // Static per category, never the owner's own text.
            data-track={`project:${starter.category}`}
            className={chipClass}
          >
            {starter.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
