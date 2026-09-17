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

  it("stays one line per chip when the home has no matching system", () => {
    const { container } = render(<ProjectChips systems={[]} />);
    expect(container.querySelectorAll("span")).toHaveLength(0);
  });

  it("adds a home-aware line only to the chip that matches a system", () => {
    const systems: StarterSystem[] = [
      {
        system_type: "water_heater",
        install_year: new Date().getFullYear() - 17,
        material_or_model: "Rheem",
        capacity: "40 gal",
        expected_lifespan_years: null,
      },
    ];
    const { container } = render(<ProjectChips systems={systems} />);
    const nudges = Array.from(container.querySelectorAll("span"));
    expect(nudges).toHaveLength(1);
    expect(nudges[0]).toHaveTextContent("Yours is 17 yrs old");
    const chip = nudges[0].closest("a")!;
    expect(chip).toHaveTextContent("Water heater");
    expect(chip.className).toContain("flex-col");
  });
});
