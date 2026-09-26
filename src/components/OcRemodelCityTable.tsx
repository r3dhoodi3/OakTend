import {
  COASTAL_ZONE_MAP_HREF,
  OC_PRE_1980,
  OC_REMODEL_CITIES,
  permitNoteFor,
  type OcTrade,
} from "@/lib/ocRemodelCities";

// The city table on the kitchen, bathroom and ADU cost guides, and (with a
// `trade`) on the roof, water heater, HVAC and electrical panel cost guides.
// Data and the rule for what may go in it live in src/lib/ocRemodelCities.ts.
//
// With a trade, the permit column shows what each city says about that work
// instead of the remodel sentence, and the coastal zone column is left out:
// it answers "does my exterior remodel need a coastal permit", which none of
// the four trade guides asks, and no city page read for them said so.
//
// Two layouts from one list. Five columns do not fit a 390px phone without
// sideways scrolling, so below sm each city is a small card with labeled
// lines; from sm up it is a real table. Only one of the two is visible at a
// time (hidden / sm:hidden), and both carry the same text.
//
// A server component with no state. Outbound links are the cities' own
// pages, rel="noopener" like the Sources list in GuideRelated.

const linkClass =
  "font-medium text-bark-700 underline hover:no-underline dark:text-stone-300";

export default function OcRemodelCityTable({
  showAduPlans = false,
  trade,
}: {
  /** The ADU guide adds a pre-approved plans column. */
  showAduPlans?: boolean;
  /** One of the four trade guides: trade permit notes, no coastal column. */
  trade?: OcTrade;
}) {
  const showCoastal = !trade;
  return (
    <div className="mt-3">
      {/* Phone: one card per city. */}
      <ul className="space-y-3 sm:hidden">
        {OC_REMODEL_CITIES.map((city) => (
          <li
            key={city.name}
            className="rounded-xl border border-stone-200 p-4 text-sm leading-relaxed dark:border-white/10"
          >
            <p className="font-semibold text-stone-900 dark:text-stone-100">
              {city.name}
            </p>
            <p className="mt-1 text-stone-600 dark:text-stone-400">
              Built before 1980: {city.pre1980}%.
              {showCoastal && (
                <> Coastal zone: {city.coastal ? "yes, in part" : "no"}.</>
              )}
            </p>
            <p className="mt-1 text-stone-600 dark:text-stone-400">
              {permitNoteFor(city, trade).text}
            </p>
            {showAduPlans && (
              <p className="mt-1 text-stone-600 dark:text-stone-400">
                Pre-approved ADU plans:{" "}
                {city.aduPlans ? (
                  <a href={city.aduPlans.href} rel="noopener" className={linkClass}>
                    {city.aduPlans.text}
                  </a>
                ) : (
                  "not confirmed"
                )}
              </p>
            )}
            <p className="mt-1">
              <a href={permitNoteFor(city, trade).href} rel="noopener" className={linkClass}>
                {permitNoteFor(city, trade).label}
              </a>
            </p>
          </li>
        ))}
      </ul>

      {/* sm and up: the table. */}
      <div className="hidden overflow-hidden rounded-xl border border-stone-200 sm:block dark:border-white/10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-stone-50 text-left dark:bg-stone-800">
              <th className="px-3 py-2.5 font-semibold text-stone-700 dark:text-stone-300">
                City
              </th>
              <th className="px-3 py-2.5 font-semibold text-stone-700 dark:text-stone-300">
                Built before 1980
              </th>
              {showCoastal && (
                <th className="px-3 py-2.5 font-semibold text-stone-700 dark:text-stone-300">
                  Coastal zone
                </th>
              )}
              <th className="px-3 py-2.5 font-semibold text-stone-700 dark:text-stone-300">
                {trade ? "What the city says about this work" : "What the city says needs a permit"}
              </th>
              {showAduPlans && (
                <th className="px-3 py-2.5 font-semibold text-stone-700 dark:text-stone-300">
                  Pre-approved ADU plans
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-white/10">
            {OC_REMODEL_CITIES.map((city) => (
              <tr key={city.name}>
                <td className="px-3 py-2.5 align-top font-medium text-stone-900 dark:text-stone-100">
                  {city.name}
                </td>
                <td className="px-3 py-2.5 align-top text-stone-600 dark:text-stone-400">
                  {city.pre1980}%
                </td>
                {showCoastal && (
                  <td className="px-3 py-2.5 align-top text-stone-600 dark:text-stone-400">
                    {city.coastal ? "Yes, in part" : "No"}
                  </td>
                )}
                <td className="px-3 py-2.5 align-top text-stone-600 dark:text-stone-400">
                  {permitNoteFor(city, trade).text}{" "}
                  <a href={permitNoteFor(city, trade).href} rel="noopener" className={linkClass}>
                    {permitNoteFor(city, trade).label}
                  </a>
                </td>
                {showAduPlans && (
                  <td className="px-3 py-2.5 align-top text-stone-600 dark:text-stone-400">
                    {city.aduPlans ? (
                      <a href={city.aduPlans.href} rel="noopener" className={linkClass}>
                        {city.aduPlans.text}
                      </a>
                    ) : (
                      "Not confirmed"
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        Built before 1980: our sum of the 1979-and-earlier rows of Census table
        B25034, American Community Survey 5-year estimates for 2020 to 2024,
        rounded (Orange County overall: {OC_PRE_1980}%). Estimates, not exact
        counts.
        {showCoastal && (
          <>
            {" "}Coastal zone lines follow the{" "}
            <a href={COASTAL_ZONE_MAP_HREF} rel="noopener" className={linkClass}>
              Coastal Commission boundary maps
            </a>
            ; ask your city whether a specific lot is inside.
          </>
        )}{" "}
        Permit notes are what each city&apos;s own page said when we read it in
        September 2026.
        {trade && " Where a page does not name the work, we say so rather than guess."}{" "}
        Costa Mesa is left out because we could not open its site to check.
      </p>
    </div>
  );
}
