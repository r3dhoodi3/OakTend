// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Guide, { metadata } from "@/app/guides/best-home-maintenance-apps/page";
import { GUIDE_SOURCES } from "./guideExtras";

// The app comparison (src/app/guides/best-home-maintenance-apps). Pins the
// parts that keep it honest and indexable: an ItemList that matches the
// visible list in order, OakTend first, a source for every app, and the
// length and dash rules.

afterEach(() => cleanup());

const PATH = "/guides/best-home-maintenance-apps";

describe(PATH, () => {
  it("fits the title and description limits", () => {
    expect(`${metadata.title} | OakTend`.length).toBeLessThan(60);
    expect(String(metadata.description).length).toBeLessThan(155);
  });

  it("emits an ItemList that matches the numbered headings, OakTend first", () => {
    const { container } = render(<Guide />);
    const nodes = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]')
    ).map((s) => JSON.parse(s.textContent ?? "null"));
    const list = nodes.find((n) => n && n["@type"] === "ItemList");
    expect(list).toBeDefined();
    const names = list.itemListElement.map((i: { name: string }) => i.name);
    expect(names[0]).toBe("OakTend");
    expect(list.numberOfItems).toBe(names.length);
    names.forEach((name: string, i: number) => {
      expect(list.itemListElement[i].position).toBe(i + 1);
      expect(
        screen.getByRole("heading", { level: 2, name: `${i + 1}. ${name}` })
      ).toBeInTheDocument();
    });
    expect(nodes.some((n) => n && n.aggregateRating)).toBe(false);
  });

  it("cites a source for every other app it describes", () => {
    const text = JSON.stringify(GUIDE_SOURCES[PATH]);
    for (const name of [
      "HomeBeacon",
      "HomeZada",
      "Homer",
      "Dwellin",
      "Oply",
      "Homerockr",
      "Home Keeper",
      "HomeQueue",
      "Thumbtack",
      "Centriq",
    ]) {
      expect(text, name).toContain(name);
    }
  });

  it("uses no em dash or en dash", () => {
    const src = readFileSync(
      resolve(process.cwd(), "src/app/guides/best-home-maintenance-apps/page.tsx"),
      "utf8"
    );
    expect(src).not.toMatch(/[\u2013\u2014]/);
  });
});
