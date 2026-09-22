// @vitest-environment jsdom
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import GuideMeta from "@/components/GuideMeta";
import GuideRelated from "@/components/GuideRelated";
import { GUIDE_DATES, GUIDE_PATHS, GUIDE_TITLES } from "./guides";
import {
  GUIDE_RELATED,
  GUIDE_SOURCES,
  formatGuideDate,
  guideUpdated,
} from "./guideExtras";
import { cityPath } from "./ocRegions";
import { LAUNCH_CITY_NAMES } from "./serviceArea";

// Vitest globals are off in this repo, so testing-library's auto-cleanup never
// wires itself up on its own.
afterEach(() => cleanup());

const GUIDES = GUIDE_PATHS.filter((p) => p !== "/guides");
// Resolved from the repo root: under jsdom, import.meta.url is not a file URL.
const GUIDES_DIR = resolve(process.cwd(), "src/app/guides");

describe("the visible Updated date", () => {
  it("formats an ISO date without a timezone shifting the day", () => {
    expect(formatGuideDate("2026-09-03")).toBe("September 3, 2026");
    expect(formatGuideDate("2026-01-31")).toBe("January 31, 2026");
    expect(formatGuideDate("2026-12-01")).toBe("December 1, 2026");
    expect(formatGuideDate("not a date")).toBeNull();
    expect(formatGuideDate("2026-13-01")).toBeNull();
  });

  it("reads the same dateModified the sitemap and the Article node use", () => {
    for (const path of GUIDES) {
      expect(guideUpdated(path)!.iso).toBe(GUIDE_DATES[path].dateModified);
    }
    expect(guideUpdated("/guides/not-a-guide")).toBeNull();
  });

  it("renders the date in a <time> and a team byline that links to /about", () => {
    const path = "/guides/adu-cost";
    const { container } = render(<GuideMeta path={path} />);
    const time = container.querySelector("time");
    expect(time).toHaveAttribute("dateTime", GUIDE_DATES[path].dateModified);
    expect(time).toHaveTextContent(formatGuideDate(GUIDE_DATES[path].dateModified)!);
    expect(screen.getByRole("link", { name: "the OakTend team" })).toHaveAttribute(
      "href",
      "/about"
    );
  });

  it("drops the date, and keeps the byline, for a path with no date", () => {
    const { container } = render(<GuideMeta path="/guides/nope" />);
    expect(container.querySelector("time")).toBeNull();
    expect(container).toHaveTextContent("By the OakTend team.");
  });
});

describe("GUIDE_RELATED", () => {
  it("covers every guide and nothing else", () => {
    expect(Object.keys(GUIDE_RELATED).sort()).toEqual([...GUIDES].sort());
  });

  it("gives each guide 3 other real guides and 4 to 6 real cities, no repeats", () => {
    for (const [path, entry] of Object.entries(GUIDE_RELATED)) {
      expect(entry.guides, path).toHaveLength(3);
      expect(new Set(entry.guides).size, path).toBe(3);
      for (const href of entry.guides) {
        expect(href, `${path} links to itself`).not.toBe(path);
        expect(GUIDE_TITLES[href], `${path} -> ${href} is not a guide`).toBeDefined();
      }
      expect(entry.cities.length, path).toBeGreaterThanOrEqual(4);
      expect(entry.cities.length, path).toBeLessThanOrEqual(6);
      expect(new Set(entry.cities).size, path).toBe(entry.cities.length);
      for (const city of entry.cities) {
        expect(LAUNCH_CITY_NAMES as readonly string[], `${path}: ${city}`).toContain(city);
      }
    }
  });

  it("links every one of the 36 city pages from at least one guide", () => {
    const linked = new Set(Object.values(GUIDE_RELATED).flatMap((e) => e.cities));
    expect([...linked].sort()).toEqual([...LAUNCH_CITY_NAMES].sort());
  });

  it("renders the three guides, the cities and the county hub", () => {
    const path = "/guides/slab-leak-signs";
    render(<GuideRelated path={path} />);
    const entry = GUIDE_RELATED[path];
    for (const href of entry.guides) {
      expect(screen.getByRole("link", { name: GUIDE_TITLES[href] })).toHaveAttribute(
        "href",
        href
      );
    }
    for (const city of entry.cities) {
      expect(screen.getByRole("link", { name: city })).toHaveAttribute(
        "href",
        cityPath(city)
      );
    }
    expect(
      screen.getByRole("link", { name: "All Orange County cities" })
    ).toHaveAttribute("href", "/oc");
    // Every guide has verified sources since 2026-09-21, this one included.
    expect(screen.getByRole("heading", { name: "Sources" })).toBeInTheDocument();
  });
});

// A source is only ever a page someone opened that supports a statement on
// the guide. A test cannot open a web page, so what it CAN hold is the shape:
// an https link to a named publisher, with the supported statement written
// down beside it so the next editor can re-check it.
describe("GUIDE_SOURCES", () => {
  const ALLOWED_HOSTS = [
    "leginfo.legislature.ca.gov",
    "www.energystar.gov",
    "www.usfa.fema.gov",
    // Added 2026-09-21, each opened that day (see the guide sources report).
    "www.irwd.com",
    "www.ocwd.com",
    "www.nachi.org",
    "www.federalregister.gov",
    "www.energy.ca.gov",
    "www.fema.gov",
    "www.cslb.ca.gov",
    "www.jlconline.com",
    "forecast.weather.gov",
    "pda.energydataweb.com",
    "www.pecanstreet.org",
    "censusreporter.org",
    "pwds.oc.gov",
    "www.epa.gov",
    "ipm.ucanr.edu",
    "cityofirvine.gov",
    "www.fountainvalley.gov",
    "www.yorbalindaca.gov",
    "ggcity.org",
    "santa-ana.gov",
    "www.newportbeachca.gov",
    "www.usgs.gov",
    "www.mesawater.org",
    "smwd.com",
    "www.ylwd.com",
    "etwd.com",
    "www.tustinca.org",
    "www.huduser.gov",
    "www.pestboard.ca.gov",
    "www.socalgas.com",
    "ocfa.org",
    "www.sce.com",
    "www.earthquakeauthority.com",
    "www.crmp.org",
    "octreasurer.gov",
    "www.ocassessor.gov",
  ];

  it("lists sources for all 12 guides", () => {
    expect(Object.keys(GUIDE_SOURCES).sort()).toEqual([...GUIDES].sort());
  });

  it("only lists sources for real guides", () => {
    for (const path of Object.keys(GUIDE_SOURCES)) {
      expect(GUIDE_TITLES[path], path).toBeDefined();
    }
  });

  it("gives every source an https link on a checked host, a label and the statement it supports", () => {
    for (const [path, sources] of Object.entries(GUIDE_SOURCES)) {
      expect(sources.length, path).toBeGreaterThan(0);
      for (const source of sources) {
        const url = new URL(source.href);
        expect(url.protocol).toBe("https:");
        // A new host means a new page somebody has to open first. Add it here
        // in the same change that adds the source.
        expect(ALLOWED_HOSTS, source.href).toContain(url.host);
        expect(source.label.length).toBeGreaterThan(10);
        expect(source.supports.length).toBeGreaterThan(20);
      }
      const hrefs = sources.map((s) => s.href);
      expect(new Set(hrefs).size, path).toBe(hrefs.length);
    }
  });

  it("renders a Sources section with outbound links where a guide has them", () => {
    const path = "/guides/contractor-deposit-rules-california";
    render(<GuideRelated path={path} />);
    const section = screen
      .getByRole("heading", { level: 2, name: "Sources" })
      .closest("section") as HTMLElement;
    const links = within(section).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      GUIDE_SOURCES[path].map((s) => s.href)
    );
    for (const link of links) {
      expect(link).toHaveAttribute("rel", "noopener");
    }
  });

  it("marks a guide as updated when it gained sources", () => {
    for (const path of Object.keys(GUIDE_SOURCES)) {
      expect(GUIDE_DATES[path].dateModified >= "2026-09-20", path).toBe(true);
    }
  });
});

describe("all 20 guide pages", () => {
  const dirs = readdirSync(GUIDES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  it("render the byline and the related block, each with their own path", () => {
    expect(dirs).toHaveLength(20);
    for (const dir of dirs) {
      const src = readFileSync(`${GUIDES_DIR}/${dir}/page.tsx`, "utf8");
      expect(src, dir).toContain(`<GuideMeta path="/guides/${dir}" />`);
      expect(src, dir).toContain(`<GuideRelated path="/guides/${dir}" />`);
      // The byline sits right under the h1; the related block above the CTA.
      expect(src.indexOf("</h1>") < src.indexOf("<GuideMeta"), dir).toBe(true);
      expect(src.indexOf("<GuideRelated") < src.indexOf("<GuideCta"), dir).toBe(true);
    }
  });
});

describe("copy rules", () => {
  it("uses no em dash or en dash anywhere in the shared guide copy", () => {
    const text = JSON.stringify([GUIDE_RELATED, GUIDE_SOURCES]);
    expect(text).not.toMatch(/[\u2013\u2014]/);
  });
});
