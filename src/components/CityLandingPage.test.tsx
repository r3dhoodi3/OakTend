// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// The component reads NEXT_PUBLIC_SITE_URL once, at module load, for the
// breadcrumb JSON-LD, and the snapshots below contain that URL. Pin it BEFORE
// the component is imported (vi.hoisted runs ahead of the imports) so the
// snapshots say the same thing on a laptop with no .env, in CI, and on a
// machine that has the production site URL exported. The value is the
// component's own fallback, which is what the original snapshot recorded.
vi.hoisted(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
});

import CityLandingPage, { buildCityFaqJsonLd } from "./CityLandingPage";
import { huntingtonBeach } from "@/content/cities/huntington-beach";
import {
  PREVIEW_CITY_PROS_CARD_BODY,
  PREVIEW_CITY_PROS_CARD_TITLE,
  previewCityHeadline,
} from "@/lib/previewMode";

// Two jobs here, and the first one is the important one.
//
// 1. THE CITIES THAT HAVE NO CONTENT YET MUST NOT MOVE (21 of the 36 as of
//    2026-09-19; it was 28 when this file was written). The first snapshot
//    below was written by running this file against the component as it stood
//    on main BEFORE the content prop existed (breadcrumb trail and
//    BreadcrumbList included), so it is a record of what /oc/<city> shipped.
//    Any change to this component that alters the no-content render fails
//    here, which is exactly the tripwire every content wave needs: only the
//    researched cities are meant to change. A second snapshot pins the same
//    no-content render with homeowner preview mode on, which is the mode the
//    live site actually runs in.
//
// 2. A city WITH content renders the full section set, in order, with its FAQ
//    marked up so search engines read the same questions a person does.
//
// Preview mode is stubbed explicitly in every test rather than left to the
// ambient environment, because the pros card changes wording with it and a
// snapshot that depended on an unset variable would be a flake waiting to
// happen.

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

const PARAGRAPH =
  "Fountain Valley is mostly single-family tract homes built in the 1960s and 1970s, so a lot of the housing stock is now 50-plus years old, with original plumbing runs and systems well into or past their expected lifespan.";

describe("CityLandingPage without content", () => {
  it("renders the pre-content-module markup", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const { container } = render(
      <CityLandingPage city="Fountain Valley" housingParagraph={PARAGRAPH} />
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("renders the same template with homeowner preview mode on", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const { container } = render(
      <CityLandingPage city="Fountain Valley" housingParagraph={PARAGRAPH} />
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it("shows the shared housing paragraph and the fixed four guides", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    render(
      <CityLandingPage city="Fountain Valley" housingParagraph={PARAGRAPH} />
    );
    expect(screen.getByText(PARAGRAPH)).toBeInTheDocument();
    expect(screen.getByText("Slab leak signs")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /at a glance/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Nearby cities/i })
    ).not.toBeInTheDocument();
  });
});

describe("CityLandingPage with content", () => {
  function renderWithContent() {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    return render(
      <CityLandingPage
        city={huntingtonBeach.name}
        housingParagraph={PARAGRAPH}
        content={huntingtonBeach}
      />
    );
  }

  it("replaces the shared paragraph with the city intro", () => {
    renderWithContent();
    expect(screen.getByText(huntingtonBeach.intro)).toBeInTheDocument();
    expect(screen.queryByText(PARAGRAPH)).not.toBeInTheDocument();
  });

  it("renders every section heading, in order", () => {
    const { container } = renderWithContent();
    const headings = Array.from(container.querySelectorAll("h2")).map((h) =>
      h.textContent?.trim()
    );
    expect(headings).toEqual([
      "What OakTend does",
      "Huntington Beach's homes, at a glance",
      "Real neighborhoods in Huntington Beach",
      "Water, permits, and local rules in Huntington Beach",
      "Guides for Huntington Beach homeowners",
      "Nearby cities",
      "Questions from Huntington Beach homeowners",
      // GuideCta closes the page, unchanged.
      "Get the answer for YOUR home",
    ]);
  });

  it("shows the population line, median year built, and every sourced fact", () => {
    const { container } = renderWithContent();
    expect(
      screen.getByText(new RegExp(huntingtonBeach.population.value))
    ).toBeInTheDocument();
    // Scoped to its own line: the year also appears inside the intro and a
    // fact, so a bare text query would match several nodes.
    expect(
      screen.getByText(/Median year built:/).closest("p")
    ).toHaveTextContent(huntingtonBeach.homes.medianYearBuilt!);
    // The population link is labelled as what it links to (Census Reporter
    // here, not the Census Bureau), and the median year carries its own source.
    const populationLink = Array.from(container.querySelectorAll("a")).find(
      (a) => a.getAttribute("href") === huntingtonBeach.population.sourceUrl
    );
    expect(populationLink).toHaveTextContent(
      huntingtonBeach.population.sourceLabel!
    );
    const medianLink = Array.from(container.querySelectorAll("a")).find(
      (a) =>
        a.getAttribute("href") ===
        huntingtonBeach.homes.medianYearBuiltSource!.sourceUrl
    );
    expect(medianLink).toHaveTextContent(
      huntingtonBeach.homes.medianYearBuiltSource!.sourceLabel
    );
    for (const fact of [
      ...huntingtonBeach.homes.facts,
      ...huntingtonBeach.hazards,
    ]) {
      expect(screen.getByText(fact.text)).toBeInTheDocument();
      const link = Array.from(container.querySelectorAll("a")).find(
        (a) => a.getAttribute("href") === fact.sourceUrl
      );
      expect(link, `no source link for ${fact.sourceLabel}`).toBeTruthy();
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "nofollow noopener");
      expect(link).toHaveTextContent(fact.sourceLabel);
    }
  });

  it("names real neighborhoods and links the water utility and permit portal", () => {
    const { container } = renderWithContent();
    for (const name of huntingtonBeach.neighborhoods.names) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(
      screen.getByText(huntingtonBeach.neighborhoods.note)
    ).toBeInTheDocument();
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toContain(huntingtonBeach.water.utilityUrl);
    expect(hrefs).toContain(huntingtonBeach.permits.portalUrl);
  });

  it("links the city's own guides, not the fixed four", () => {
    renderWithContent();
    for (const guide of huntingtonBeach.guides) {
      expect(screen.getByText(guide.title)).toBeInTheDocument();
    }
    // Slab leak signs is in the shared fixed list but not in HB's set.
    expect(screen.queryByText("Slab leak signs")).not.toBeInTheDocument();
  });

  it("links nearby city pages, top-level route for the two hand-written ones", () => {
    const { container } = renderWithContent();
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toContain("/fountain-valley");
    expect(hrefs).toContain("/oc/costa-mesa");
    expect(hrefs).toContain("/oc/westminster");
    expect(screen.getByText("Fountain Valley")).toBeInTheDocument();
  });

  it("shows every FAQ answer as plain text, not behind a disclosure", () => {
    const { container } = renderWithContent();
    for (const item of huntingtonBeach.faq) {
      expect(screen.getByText(item.q)).toBeInTheDocument();
      expect(screen.getByText(item.a)).toBeInTheDocument();
    }
    expect(container.querySelectorAll("details").length).toBe(0);
  });

  it("emits FAQPage JSON-LD containing every question and answer", () => {
    const { container } = renderWithContent();
    const blocks = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]')
    ).map((s) => s.textContent ?? "");
    const faqBlock = blocks.find((b) => b.includes("FAQPage"));
    expect(faqBlock).toBeTruthy();
    // Escaped the same way the page files escape their JSON-LD.
    expect(faqBlock).not.toContain("<");
    const parsed = JSON.parse(faqBlock!.replace(/\\u003c/g, "<"));
    expect(parsed["@type"]).toBe("FAQPage");
    expect(parsed.mainEntity).toHaveLength(huntingtonBeach.faq.length);
    for (const item of huntingtonBeach.faq) {
      const question = parsed.mainEntity.find(
        (q: { name: string }) => q.name === item.q
      );
      expect(question, `missing question: ${item.q}`).toBeTruthy();
      expect(question.acceptedAnswer.text).toBe(item.a);
    }
  });
});

describe("buildCityFaqJsonLd", () => {
  it("maps every FAQ entry to a Question with an acceptedAnswer", () => {
    const json = buildCityFaqJsonLd(huntingtonBeach);
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("FAQPage");
    expect(json.mainEntity.map((q) => q.name)).toEqual(
      huntingtonBeach.faq.map((f) => f.q)
    );
  });
});

describe("the pros card follows preview mode", () => {
  // The preview wording is main's (src/lib/previewMode.ts), read from the
  // constants rather than re-typed so this file cannot drift from it.
  const OPEN_TITLE = "Local pros, no bidding war";
  const PREVIEW_TITLE = PREVIEW_CITY_PROS_CARD_TITLE;

  it("promises the pro network when preview mode is off", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    render(
      <CityLandingPage city="Fountain Valley" housingParagraph={PARAGRAPH} />
    );
    expect(screen.getByText(OPEN_TITLE)).toBeInTheDocument();
    expect(screen.queryByText(PREVIEW_TITLE)).not.toBeInTheDocument();
    expect(
      screen.getByText(/every pro who applies shows up in one place/)
    ).toBeInTheDocument();
  });

  it("promises nothing it cannot deliver while preview mode is on", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    render(
      <CityLandingPage city="Fountain Valley" housingParagraph={PARAGRAPH} />
    );
    expect(screen.getByText(PREVIEW_TITLE)).toBeInTheDocument();
    expect(screen.queryByText(OPEN_TITLE)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/every pro who applies shows up in one place/)
    ).not.toBeInTheDocument();
    expect(screen.getByText(PREVIEW_CITY_PROS_CARD_BODY)).toBeInTheDocument();
  });

  it("applies the swap on a city that has content too", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    render(
      <CityLandingPage
        city={huntingtonBeach.name}
        housingParagraph={PARAGRAPH}
        content={huntingtonBeach}
      />
    );
    expect(screen.getByText(PREVIEW_TITLE)).toBeInTheDocument();
  });

  it("keeps a researched city's page preview-safe and on one h1", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const { container } = render(
      <CityLandingPage
        city={huntingtonBeach.name}
        housingParagraph={PARAGRAPH}
        content={huntingtonBeach}
      />
    );
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(previewCityHeadline(huntingtonBeach.name));
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/local pros in/i);
    expect(text).not.toMatch(/every pro who applies/i);
    expect(text).not.toMatch(/pile of quotes/i);
  });
});
