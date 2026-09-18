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

  // The home record feeds the draft description only. Nothing about the home
  // renders here: an age line inside the chips made the row ragged, and a
  // list above them duplicated the dashboard's Systems section. Both were
  // removed; every chip is the same one-line pill whatever the home holds.
  it("shows nothing about the home, only the same uniform chips", () => {
    const year = new Date().getFullYear();
    const systems: StarterSystem[] = [
      {
        system_type: "water_heater",
        install_year: year - 17,
        material_or_model: "Rheem",
        capacity: "40 gal",
      },
    ];
    const { container } = render(<ProjectChips systems={systems} />);
    expect(container.querySelector("ul")).toBeNull();
    expect(container.textContent).not.toMatch(/yrs old|home record/);
    const chips = Array.from(container.querySelectorAll("a"));
    expect(chips).toHaveLength(REMODEL_PROJECTS.length + 1);
    expect(new Set(chips.map((a) => a.className)).size).toBe(1);
    for (const a of chips) expect(a.querySelector("span")).toBeNull();
    // ...while the matching chip's draft still carries the record facts.
    const wh = chips.find((a) => a.textContent === "Water heater")!;
    const desc = new URL(wh.getAttribute("href")!, "https://oaktend.com")
      .searchParams.get("desc");
    expect(desc).toContain("Current unit on our record: Rheem, 40 gal");
  });
});
