import Link from "next/link";
import {
  OC_HOME_AGE_CITIES,
  OC_HOME_AGE_COUNTY,
  formatShare,
  formatUnits,
} from "@/lib/ocHomeAge";
import { cityPath } from "@/lib/ocRegions";

// The city table on /guides/orange-county-home-age. Data and where it comes
// from: src/lib/ocHomeAge.ts.
//
// Same two-layout pattern as src/components/OcRemodelCityTable.tsx: five
// columns do not fit a 390px phone without sideways scrolling, so below sm
// each city is a small card with labeled lines, and from sm up it is a real
// table. Only one is visible at a time (sm:hidden / hidden sm:block) and both
// carry the same numbers.
//
// Static on purpose: the rows arrive already sorted oldest first, so there is
// no client JS and nothing to hydrate. Each city name links to that city's
// OakTend page.

const linkClass =
  "font-medium text-bark-700 underline hover:no-underline dark:text-stone-300";
const thClass =
  "px-3 py-2.5 font-semibold text-stone-700 dark:text-stone-300";
const tdClass = "px-3 py-2.5 align-top text-stone-600 dark:text-stone-300";

export default function OcHomeAgeTable() {
  const county = OC_HOME_AGE_COUNTY;
  return (
    <div className="mt-3">
      {/* Phone: the county first, then one card per city. */}
      <ul className="space-y-3 sm:hidden">
        <li className="rounded-xl border border-bark-100 bg-bark-50 p-4 text-sm leading-relaxed dark:border-bark-700 dark:bg-bark-700/20">
          <p className="font-semibold text-stone-900 dark:text-stone-100">
            {county.name} (all)
          </p>
          <p className="mt-1 text-stone-600 dark:text-stone-300">
            Built before 1980: {formatShare(county.pre1980)}% (plus or minus{" "}
            {formatShare(county.pre1980Moe)}). Built 2000 or later:{" "}
            {formatShare(county.since2000)}%.
          </p>
          <p className="mt-1 text-stone-600 dark:text-stone-300">
            Median year built: {county.medianYear}. Housing units:{" "}
            {formatUnits(county.units)}.
          </p>
        </li>
        {OC_HOME_AGE_CITIES.map((city) => (
          <li
            key={city.name}
            className="rounded-xl border border-stone-200 p-4 text-sm leading-relaxed dark:border-white/10"
          >
            <p>
              <Link href={cityPath(city.name)} className={linkClass}>
                {city.name}
              </Link>
            </p>
            <p className="mt-1 text-stone-600 dark:text-stone-300">
              Built before 1980: {formatShare(city.pre1980)}% (plus or minus{" "}
              {formatShare(city.pre1980Moe)}). Built 2000 or later:{" "}
              {formatShare(city.since2000)}%.
            </p>
            <p className="mt-1 text-stone-600 dark:text-stone-300">
              Median year built: {city.medianYear}. Housing units:{" "}
              {formatUnits(city.units)}.
            </p>
          </li>
        ))}
      </ul>

      {/* sm and up: the table. */}
      <div className="hidden overflow-hidden rounded-xl border border-stone-200 sm:block dark:border-white/10">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            Share of housing built before 1980 and since 2000, median year
            built and housing units, Orange County cities, ACS 2020 to 2024,
            oldest first
          </caption>
          <thead>
            <tr className="bg-stone-50 text-left dark:bg-stone-800">
              <th scope="col" className={thClass}>
                City
              </th>
              <th scope="col" className={thClass}>
                Built before 1980
              </th>
              <th scope="col" className={thClass}>
                Built 2000 or later
              </th>
              <th scope="col" className={thClass}>
                Median year built
              </th>
              <th scope="col" className={`${thClass} text-right`}>
                Housing units
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-white/10">
            <tr className="bg-bark-50 dark:bg-bark-700/20">
              <th
                scope="row"
                className="px-3 py-2.5 text-left align-top font-semibold text-stone-900 dark:text-stone-100"
              >
                {county.name} (all)
              </th>
              <td className={tdClass}>
                {formatShare(county.pre1980)}%{" "}
                <span className="text-xs">&plusmn;{formatShare(county.pre1980Moe)}</span>
              </td>
              <td className={tdClass}>{formatShare(county.since2000)}%</td>
              <td className={tdClass}>{county.medianYear}</td>
              <td className={`${tdClass} text-right tabular-nums`}>
                {formatUnits(county.units)}
              </td>
            </tr>
            {OC_HOME_AGE_CITIES.map((city) => (
              <tr key={city.name}>
                <th scope="row" className="px-3 py-2.5 text-left align-top font-normal">
                  <Link href={cityPath(city.name)} className={linkClass}>
                    {city.name}
                  </Link>
                </th>
                <td className={tdClass}>
                  {formatShare(city.pre1980)}%{" "}
                  <span className="text-xs">&plusmn;{formatShare(city.pre1980Moe)}</span>
                </td>
                <td className={tdClass}>{formatShare(city.since2000)}%</td>
                <td className={tdClass}>{city.medianYear}</td>
                <td className={`${tdClass} text-right tabular-nums`}>
                  {formatUnits(city.units)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
