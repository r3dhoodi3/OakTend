// The side-by-side table on the "OakTend vs X" guides
// (src/app/guides/oaktend-vs-*). One feature per <tbody>: the feature name
// spans both columns on its own row, and the two answers sit under it. That
// keeps the table two columns wide at every screen size, so a 390px phone
// reads it without a sideways scroll and a desktop reads it as a table.
//
// The competitor's name is plain text in a plain header cell, the same as
// OakTend's: no logo, no brand color (see the guardrails in
// src/app/guides/oaktend-vs-homezada/page.tsx).

// The trademark line at the foot of every comparison. `owner` is the company
// as its own terms or brand page name it.
//
// `markOwner`, when given, replaces `owner` in the trademark sentence only:
// the ANGI mark is registered to a subsidiary, so that line says "Angi Inc.
// or its affiliates" while the non-affiliation line names Angi Inc.
export function TrademarkNote({
  name,
  owner,
  markOwner,
}: {
  name: string;
  owner: string;
  markOwner?: string;
}) {
  const holder = markOwner ?? owner;
  // "Angi Inc." already ends in a period, so no second one after it.
  const holderStop = holder.endsWith(".") ? "" : ".";
  const stop = owner.endsWith(".") ? "" : ".";
  return (
    <p className="mt-8 text-xs leading-relaxed text-stone-600 dark:text-stone-300">
      {name} is a trademark of {holder}
      {holderStop} OakTend is not affiliated with, endorsed by or sponsored by{" "}
      {owner}
      {stop} We use the name only to compare the two products, from the
      company&apos;s own published information.
    </p>
  );
}

export type CompareRow = {
  label: string;
  oaktend: React.ReactNode;
  other: React.ReactNode;
};

export default function CompareTable({
  otherName,
  rows,
}: {
  otherName: string;
  rows: CompareRow[];
}) {
  return (
    <table className="mt-6 w-full table-fixed border-collapse text-left text-sm leading-relaxed">
      <caption className="sr-only">OakTend and {otherName} side by side</caption>
      <thead>
        <tr className="border-b border-stone-300 dark:border-white/20">
          <th
            scope="col"
            className="w-1/2 pb-2 pr-3 font-semibold text-stone-900 dark:text-stone-100"
          >
            OakTend
          </th>
          <th
            scope="col"
            className="w-1/2 pb-2 pl-3 font-semibold text-stone-900 dark:text-stone-100"
          >
            {otherName}
          </th>
        </tr>
      </thead>
      {rows.map((row) => (
        <tbody
          key={row.label}
          className="border-b border-stone-200 dark:border-white/10"
        >
          <tr>
            <th
              scope="colgroup"
              colSpan={2}
              className="pt-3 font-medium text-stone-900 dark:text-stone-100"
            >
              {row.label}
            </th>
          </tr>
          <tr>
            <td className="pb-3 pr-3 align-top text-stone-600 dark:text-stone-300">
              {row.oaktend}
            </td>
            <td className="pb-3 pl-3 align-top text-stone-600 dark:text-stone-300">
              {row.other}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
