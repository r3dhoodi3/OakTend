"use client";

import { useState } from "react";
import Link from "next/link";

// The 36-city footer list (src/app/page.tsx) renders two different ways:
// desktop keeps the pill-chip grid it always had, but on phone a 36-chip
// wrap block runs long and reads as noise, so phone gets a compact
// two-column text list instead, capped to 8 rows with a "See all" toggle.
// page.tsx is a server component, so the toggle's state needs a small client
// component of its own - this one. The sm-and-up branch below is the same
// chip markup page.tsx used to render inline, byte-for-byte, just hidden
// below `sm` with the same max-sm:hidden convention the rest of the file
// uses, so desktop output is unchanged.
const PHONE_PREVIEW_COUNT = 8;

export default function CityList({
  cities,
}: {
  cities: { name: string; href: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? cities : cities.slice(0, PHONE_PREVIEW_COUNT);

  return (
    <>
      {/* Phone: plain-text two-column list, 14px type, 44px tap rows, no
          borders - a list to scan, not a grid of buttons. */}
      <div className="sm:hidden">
        <ul className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-x-4">
          {visible.map((city) => (
            <li key={city.name}>
              <Link
                href={city.href}
                className="flex min-h-11 items-center text-sm text-stone-700 dark:text-stone-300"
              >
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-1 text-center">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex min-h-11 items-center px-4 text-sm text-bark-500 hover:underline"
          >
            {expanded ? "Show fewer" : `See all ${cities.length} cities`}
          </button>
        </div>
      </div>

      {/* Desktop (sm and up): the original chip grid, unchanged. */}
      <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2 max-sm:hidden">
        {cities.map((city) => (
          <li key={city.name}>
            <Link
              href={city.href}
              className="pill-grow inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm font-medium text-stone-700 hover:border-bark-500 hover:text-bark-700 sm:min-h-0 sm:px-3.5 dark:border-white/10 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-bark-500 dark:hover:text-stone-100"
            >
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
