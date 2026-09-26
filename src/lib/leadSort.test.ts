import { describe, expect, it } from "vitest";
import {
  LEAD_SORT_OPTIONS,
  normalizeLeadSort,
  sortLeads,
} from "@/lib/leadSort";

// The ordering behind the leads board, shared by the server's first paint
// (src/app/pro/leads/page.tsx hands the board the order the URL asked for) and
// the client's instant re-sort (src/app/pro/leads/LeadsBoard.tsx).
//
// There is one order left. "Cheapest fee" was retired on 2026-09-24 with the
// per-lead fee itself (migration 0172 made applying free): every lead now
// costs the same nothing, so the sort had no axis. "Biggest deal" had already
// gone in C5 (2026-09-07) for competing with it.
//
// What these tests protect is the behaviour that matters while only one order
// exists: a stale ?sort= link from either retired sort must not throw, must
// not reorder anything, and must not resurrect a control the board no longer
// draws.

type Row = { id: string };

// Newest first, which is the order open_jobs_for_me already returns.
const rows: Row[] = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
const ids = (r: Row[]) => r.map((x) => x.id);

describe("normalizeLeadSort", () => {
  it("answers newest for everything, including the two retired sorts", () => {
    expect(normalizeLeadSort("new")).toBe("new");
    // A pro who bookmarked ?sort=fee (or the older ?sort=deal) lands on a
    // working board, not an error and not an empty list.
    expect(normalizeLeadSort("fee")).toBe("new");
    expect(normalizeLeadSort("deal")).toBe("new");
    expect(normalizeLeadSort(undefined)).toBe("new");
    expect(normalizeLeadSort(null)).toBe("new");
    expect(normalizeLeadSort("")).toBe("new");
  });
});

describe("sortLeads", () => {
  it("keeps the order it was given", () => {
    expect(ids(sortLeads(rows, "new"))).toEqual(["a", "b", "c", "d"]);
  });

  it("never mutates or drops the caller's array", () => {
    const input = rows.slice();
    const out = sortLeads(input, "new");
    expect(out).not.toBe(input);
    expect(ids(input)).toEqual(["a", "b", "c", "d"]);
    expect(out).toHaveLength(input.length);
  });
});

describe("LEAD_SORT_OPTIONS", () => {
  // The board hides the control entirely while this has one entry: a
  // single-option sort is a button that cannot change anything.
  it("offers only Newest, so the board draws no sort control", () => {
    expect(LEAD_SORT_OPTIONS).toEqual([{ value: "new", label: "Newest" }]);
    expect(LEAD_SORT_OPTIONS.length).toBeLessThan(2);
  });

  it("names no price, so no button can promise a cheaper lead", () => {
    for (const o of LEAD_SORT_OPTIONS) {
      expect(o.label.toLowerCase()).not.toContain("fee");
      expect(o.label).not.toContain("$");
    }
  });
});
