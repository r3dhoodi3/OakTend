// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LEGAL_LINKS } from "@/lib/legal";
import { ENTITY_DESCRIPTION } from "@/lib/siteMetadata";
import AboutPage, { metadata } from "./page";

// Vitest globals are off in this repo, so testing-library's auto-cleanup never
// wires itself up on its own.
afterEach(() => cleanup());

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// The About page is what a search engine, an AI answer tool and a careful
// homeowner all read to decide who is behind the site. These pin the parts
// that do that job: a canonical, one fixed definition, structured data that
// points at the one Organization node, and an honest note on sourcing.

describe("/about", () => {
  it("has a canonical and a description that names the category and the place", () => {
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/about`);
    const d = String(metadata.description);
    expect(d).toContain("home maintenance app");
    expect(d).toContain("Orange County, California");
    expect(d).toContain("OakTend LLC");
    expect(d).not.toMatch(/[\u2013\u2014]/);
  });

  it("opens with the fixed entity description, word for word", () => {
    render(<AboutPage />);
    expect(screen.getByText(ENTITY_DESCRIPTION)).toBeInTheDocument();
  });

  it("emits an AboutPage node that points at the one Organization by @id", () => {
    const { container } = render(<AboutPage />);
    const nodes = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]')
    ).map((s) => JSON.parse(s.textContent ?? "null"));
    const about = nodes.find((n) => n["@type"] === "AboutPage");
    expect(about).toBeDefined();
    expect(about.url).toBe(`${SITE_URL}/about`);
    expect(about.mainEntity).toEqual({ "@id": `${SITE_URL}#organization` });
    expect(about.about).toEqual({ "@id": `${SITE_URL}#organization` });
    // It must not restate the business: that is the layout's node's job.
    expect(nodes.some((n) => n["@type"] === "Organization")).toBe(false);
  });

  it("says how local facts are sourced, and how to report a mistake", () => {
    render(<AboutPage />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "How we source our local facts",
    });
    const section = heading.closest("section") as HTMLElement;
    expect(section).toHaveTextContent("rough planning figures, not quotes");
    expect(section).toHaveTextContent("a page we opened and checked");
    const hrefs = Array.from(section.querySelectorAll("a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(["/guides", "/contact"]);
  });

  // No founder is named in any public copy in this repo, so the page does not
  // name one either: it says "team".
  it("names the team, not individuals", () => {
    render(<AboutPage />);
    expect(screen.getByText(/small, founder-run\s+team/)).toBeInTheDocument();
    expect(screen.getByText(/based in Fountain Valley/)).toBeInTheDocument();
  });

  it("makes no claim that pros, quotes, bookings or payments are available", () => {
    const { container } = render(<AboutPage />);
    const text = container.textContent ?? "";
    expect(text).toContain("Our network of local pros is not open yet");
    expect(text).not.toMatch(/\bquotes come to you\b/i);
    expect(text).not.toMatch(/[\u2013\u2014]/);
  });
});

// Both site footers build their link row from LEGAL_LINKS, so About reaches
// the landing page footer and every guide footer from that one list.
describe("About is linked from the landing page and the guides footers", () => {
  it("is first in LEGAL_LINKS", () => {
    expect(LEGAL_LINKS[0]).toEqual({ href: "/about", label: "About" });
  });

  for (const file of ["../page.tsx", "../guides/layout.tsx"]) {
    it(`${file} renders LEGAL_LINKS in its footer`, () => {
      const src = readFileSync(
        fileURLToPath(new URL(file, import.meta.url)),
        "utf8"
      );
      expect(src).toMatch(/LEGAL_LINKS\.map\(/);
    });
  }
});
