// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render } from "@testing-library/react";
import { REMODEL_PROJECTS } from "@/lib/constants";
import { PROJECT_STARTERS, type StarterSystem } from "@/lib/projectStarters";
import ProjectChips from "./ProjectChips";

// Vitest globals are off in this repo, so testing-library's auto-cleanup never
// wires itself up (see dashboardShape.test.tsx for the same note).
afterEach(() => cleanup());

// The chip row used to be inline JSX on the dashboard only. It is shared now:
// the dashboard renders it above sm, /contractors renders it below sm. If the
// two ever drift the phone shortcut silently stops matching the desktop list,
// which is exactly what pulling it into one component is meant to prevent.
describe("ProjectChips", () => {
  it("renders one chip per remodel project plus Other", () => {
    const { container } = render(<ProjectChips />);
    const links = Array.from(container.querySelectorAll("a"));
    expect(links).toHaveLength(REMODEL_PROJECTS.length + 1);
    expect(links.at(-1)).toHaveTextContent("Other");
    for (const p of REMODEL_PROJECTS) {
      expect(links.some((a) => a.textContent?.startsWith(p.label))).toBe(true);
    }
  });

  // The point of the chips: land on a form that is already written, not on an
  // empty description box with the trade preselected.
  it("prefills the whole post, not just the category", () => {
    const { container } = render(<ProjectChips />);
    const links = Array.from(container.querySelectorAll("a"));
    for (const a of links) {
      const params = new URL(a.getAttribute("href")!, "https://oaktend.com")
        .searchParams;
      expect(params.get("category")).toBeTruthy();
      expect(params.get("budget")).toBeTruthy();
      expect(params.get("timing")).toBeTruthy();
      expect(params.get("starter")).toBe("1");
      // Phone tap target: 44px minimum, same rule as every other chip row.
      expect(a.className).toContain("max-sm:min-h-11");
    }
    const first = new URL(links[0].getAttribute("href")!, "https://oaktend.com")
      .searchParams;
    expect(first.get("category")).toBe(REMODEL_PROJECTS[0].category);
    expect(first.get("desc")).toBe(PROJECT_STARTERS[0].template);
    // Other carries the category alone - there is nothing honest to prefill.
    const last = new URL(links.at(-1)!.getAttribute("href")!, "https://oaktend.com")
      .searchParams;
    expect(last.has("desc")).toBe(false);
  });

  it("tags every chip with its category for analytics, never free text", () => {
    const { container } = render(<ProjectChips />);
    for (const a of Array.from(container.querySelectorAll("a"))) {
      expect(a.getAttribute("data-track")).toMatch(/^project:[a-z_]+$/);
    }
  });

  it("renders no home-record list when the home has no matching system", () => {
    const { container } = render(<ProjectChips systems={[]} />);
    expect(container.querySelector("ul")).toBeNull();
    expect(container.querySelectorAll("a")).toHaveLength(REMODEL_PROJECTS.length + 1);
  });

  // The home-aware part is a short list ABOVE the row, never text inside a
  // chip: a two-line pill next to one-line pills made the row ragged and was
  // rejected. Every chip stays the same one-line pill.
  it("lists the matching system above the row and keeps every chip uniform", () => {
    const year = new Date().getFullYear();
    const systems: StarterSystem[] = [
      {
        system_type: "water_heater",
        install_year: year - 17,
        material_or_model: "Rheem",
        capacity: "40 gal",
        expected_lifespan_years: null,
      },
    ];
    const { container } = render(<ProjectChips systems={systems} />);
    const rows = Array.from(container.querySelectorAll("ul li"));
    expect(rows).toHaveLength(1);
    expect(rows[0]).toHaveTextContent("Water heater");
    expect(rows[0]).toHaveTextContent("Yours is 17 yrs old");
    expect(rows[0].querySelector("a")?.getAttribute("data-track")).toBe(
      "project-record:plumbing"
    );
    // The chip row itself: one link per project, all with the identical
    // class string and nothing but the label inside.
    const chips = Array.from(
      container.querySelectorAll('a[data-track^="project:"]')
    );
    expect(chips).toHaveLength(REMODEL_PROJECTS.length + 1);
    const classes = new Set(chips.map((a) => a.className));
    expect(classes.size).toBe(1);
    for (const a of chips) expect(a.querySelector("span")).toBeNull();
  });

  it("orders the list most urgent first and caps it at three", () => {
    const year = new Date().getFullYear();
    const systems: StarterSystem[] = [
      // Young: plain age line, ranks last.
      { system_type: "roof", install_year: year - 2, material_or_model: null, capacity: null, expected_lifespan_years: null },
      // Past its life: ranks first.
      { system_type: "water_heater", install_year: year - 17, material_or_model: null, capacity: null, expected_lifespan_years: null },
      // No install year: "On your home record", ranks after any dated one.
      { system_type: "hvac", install_year: null, material_or_model: null, capacity: null, expected_lifespan_years: null },
      // Near the end of a 20-year life.
      { system_type: "garage_door", install_year: year - 17, material_or_model: null, capacity: null, expected_lifespan_years: 20 },
    ];
    const { container } = render(<ProjectChips systems={systems} />);
    const rows = Array.from(container.querySelectorAll("ul li")).map(
      (li) => li.textContent ?? ""
    );
    expect(rows).toHaveLength(3);
    expect(rows[0]).toContain("Water heater");
    expect(rows[1]).toContain("Garage door");
    expect(rows[2]).toContain("Roof");
  });
});
