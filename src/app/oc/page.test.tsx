// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LAUNCH_CITY_NAMES } from "@/lib/serviceArea";
import { cityPath } from "@/lib/ocRegions";

// Vitest globals are off in this repo, so testing-library's auto-cleanup never
// wires itself up on its own.
afterEach(() => cleanup());

// Both resolve the session in the browser; neither is what this page is about.
vi.mock("@/components/SessionCta", () => ({
  default: () => <a href="/homeowner-signup">Get started free</a>,
  useSignedIn: () => false,
}));
vi.mock("@/components/GuideCta", () => ({
  default: () => <div data-testid="guide-cta" />,
}));

import OrangeCountyHub, { metadata } from "./page";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function jsonLd(container: HTMLElement): any[] {
  return Array.from(
    container.querySelectorAll('script[type="application/ld+json"]')
  ).map((s) => JSON.parse(s.textContent ?? "null"));
}

function visibleWords(container: HTMLElement): number {
  const main = container.querySelector("main") as HTMLElement;
  const clone = main.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("script").forEach((s) => s.remove());
  return (clone.textContent ?? "").split(/\s+/).filter(Boolean).length;
}

describe("/oc, the Orange County hub", () => {
  it("has one h1 and a canonical that points at itself", () => {
    const { container } = render(<OrangeCountyHub />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Home maintenance for Orange County homeowners"
    );
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/oc`);
    expect(metadata.title).toEqual({
      absolute: "Home maintenance in Orange County, CA: all 36 cities | OakTend",
    });
  });

  it("links every one of the 36 cities to its real page, under four region headings", () => {
    render(<OrangeCountyHub />);
    for (const city of LAUNCH_CITY_NAMES) {
      expect(screen.getByRole("link", { name: city })).toHaveAttribute(
        "href",
        cityPath(city)
      );
    }
    expect(screen.getByRole("link", { name: "Fountain Valley" })).toHaveAttribute(
      "href",
      "/fountain-valley"
    );
    for (const name of [
      "North Orange County",
      "Central Orange County",
      "Coastal Orange County",
      "South Orange County",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });

  it("emits a BreadcrumbList and an ItemList of all 36 city URLs", () => {
    const { container } = render(<OrangeCountyHub />);
    const nodes = jsonLd(container);
    const crumbs = nodes.find((n) => n["@type"] === "BreadcrumbList");
    expect(crumbs.itemListElement.map((c: any) => c.name)).toEqual([
      "OakTend",
      "Orange County",
    ]);
    const list = nodes.find((n) => n["@type"] === "ItemList");
    expect(list.numberOfItems).toBe(36);
    expect(list.itemListElement).toHaveLength(36);
    expect(list.itemListElement.map((i: any) => i.position)).toEqual(
      Array.from({ length: 36 }, (_, i) => i + 1)
    );
    const listed = list.itemListElement.map((i: any) => i.url).sort();
    expect(listed).toEqual(
      LAUNCH_CITY_NAMES.map((c) => `${SITE_URL}${cityPath(c)}`).sort()
    );
  });

  it("links the local guides and the guides index", () => {
    render(<OrangeCountyHub />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    for (const href of [
      "/guides/orange-county-home-maintenance-checklist",
      "/guides/slab-leak-signs",
      "/guides/roof-replacement-cost",
      "/guides/adu-cost",
      "/guides/contractor-deposit-rules-california",
      "/guides",
    ]) {
      expect(hrefs).toContain(href);
    }
  });

  // Enough to be worth reading, short enough to stay a hub. City names and
  // link text count toward the total, so the floor is set above 350.
  it("carries a real page of copy, not a bare link list", () => {
    const { container } = render(<OrangeCountyHub />);
    const words = visibleWords(container);
    expect(words).toBeGreaterThan(400);
    expect(words).toBeLessThan(750);
  });

  it("promises no pros, quotes, bookings or payments, and uses no long dashes", () => {
    const { container } = render(<OrangeCountyHub />);
    const text = container.querySelector("main")!.textContent ?? "";
    for (const promise of [
      /\bpros?\b/i,
      /\bquotes?\b/i,
      /\bbook(ed|ing|ings)?\b/i,
      /\bmatch(ed|ing)?\b/i,
      /\bpay(ment|ments)?\b/i,
    ]) {
      expect(text).not.toMatch(promise);
    }
    expect(text).not.toMatch(/[\u2013\u2014]/);
    expect(String(metadata.description)).not.toMatch(/[\u2013\u2014]/);
  });
});
