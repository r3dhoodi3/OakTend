// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { LEGAL_LINKS } from "@/lib/legal";
import { LAUNCH_CITY_NAMES } from "@/lib/serviceArea";
import { GUIDE_LINKS } from "@/lib/guides";
import { CATEGORY_SENTENCE, ENTITY_DESCRIPTION } from "@/lib/siteMetadata";

// Vitest globals are off in this repo (see vitest.config.ts), so
// testing-library's auto-cleanup never wires itself up on its own.
afterEach(() => cleanup());

// The landing page now serves two different visitors from one file:
//
//  - DESKTOP gets the marketing page it always had, unchanged.
//  - PHONE gets PhoneLanding first, then a subset of the marketing sections
//    below it: the tour that used to scroll past here is now the post-login
//    guide (src/components/AppGuide.tsx), but the founder wants the feature
//    cards, the county line, the FAQ, the closing CTA, and the contractor
//    band visible on phone too (2026-09-16), so those five stay unhidden.
//
// The split is pure CSS: `sm:hidden` on the phone block, `max-sm:hidden` on
// every marketing section STILL phone-hidden. Nothing is deleted, so the
// copy still ships in the HTML for crawlers, and desktop cannot regress by
// accident. That makes the classes the thing worth testing - and the only
// thing a unit test CAN test, since jsdom does not evaluate media queries.
//
// Everything mocked below is a per-request dependency or a client widget that
// needs a browser (a lazy-loaded audio player, a photo cycler on a timer).
// The markup this covers is all page.tsx's own.

vi.mock("next/headers", () => ({
  cookies: async () => ({ getAll: () => [] }),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

vi.mock("@/lib/authCookie", () => ({
  hasAuthCookie: () => false,
}));

vi.mock("@/lib/auth", () => ({
  getVerifiedUser: vi.fn(async () => null),
}));

vi.mock("@/lib/contractor", () => ({
  getSides: vi.fn(async () => ({ homeowner: false, contractor: false })),
  landingFor: () => "/dashboard",
}));

// The signed-in redirect goes through the preview-aware wrapper now (it must
// never answer "/pro" to a viewer the pro side is closed to). Mocked rather
// than let through because the real module carries "server-only"; this suite
// renders the SIGNED-OUT page (hasAuthCookie is false above), so the value is
// never read - the mock only keeps the import resolvable.
vi.mock("@/lib/previewModeServer", () => ({
  previewAwareLanding: vi.fn(async () => "/dashboard"),
}));

// Stubbed, but with a marker so the section wrapper around the demo player is
// still findable below.
vi.mock("@/components/HeroDemoPlayerLazy", () => ({
  default: () => <div data-testid="hero-demo" />,
}));

vi.mock("@/components/HeroPhotoCycler", () => ({
  default: () => <div data-testid="hero-photos" />,
}));

import Home from "./page";

async function renderLanding() {
  const element = await Home({ searchParams: Promise.resolve({}) });
  return render(element as React.ReactElement);
}

describe("landing page, phone split", () => {
  it("puts the phone landing first, inside the warm band", async () => {
    const { container } = await renderLanding();
    const homeowner = screen.getByRole("link", { name: "I'm a homeowner" });
    expect(homeowner).toHaveAttribute("href", "/homeowner-signup");

    // The block itself is phone-only...
    const phoneBlock = homeowner.closest("div.sm\\:hidden");
    expect(phoneBlock).not.toBeNull();

    // ...and the contractor door and the header "Sign in" button are inside
    // it. Scoped, because the long desktop footer has a "Sign in" link of its
    // own. (Sign in moved from a text link under the doors into a solid header
    // button so a returning user has a one-tap door top-right.)
    expect(
      within(phoneBlock as HTMLElement).getByRole("link", {
        name: "I'm a contractor",
      })
    ).toHaveAttribute("href", "/contractor-signup");
    expect(
      within(phoneBlock as HTMLElement).getByRole("link", {
        name: "Sign in",
      })
    ).toHaveAttribute("href", "/signin");

    // ...and it is the first thing in the page, ahead of the desktop header.
    const header = container.querySelector("header");
    expect(header).not.toBeNull();
    expect(
      phoneBlock!.compareDocumentPosition(header!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("hides every marketing section on phone without deleting it", async () => {
    const { container } = await renderLanding();

    // Header, hero (copy + photo carousel), and the demo player's section.
    expect(container.querySelector("header")).toHaveClass("max-sm:hidden");
    expect(
      screen
        .getByRole("heading", {
          name: /Know what your home needs before it costs you/i,
          level: 1,
        })
        .closest("div.grid")
    ).toHaveClass("max-sm:hidden");
    // Rendered once in the desktop hero and once inside PhoneLanding, so
    // assert presence without assuming a single instance.
    expect(screen.getAllByTestId("hero-photos").length).toBeGreaterThan(0);
    expect(screen.getByTestId("hero-demo").closest("section")).toHaveClass(
      "max-sm:hidden"
    );

    // Everything below the fold that stays phone-hidden, by the heading a
    // reader would see.
    const hiddenSections = ["Find a pro for", "What we check", "How it works"];
    for (const heading of hiddenSections) {
      expect(screen.getByText(heading).closest("section")).toHaveClass(
        "max-sm:hidden"
      );
    }

    // These five are shown on phone too (founder request, 2026-09-16): the
    // feature cards, the county/contact trust band, the FAQ, the closing CTA,
    // and the contractor band. None of them carry max-sm:hidden any more.
    const shownSections = [
      "What OakTend watches for you",
      "Real people, real answers",
      "Quick questions",
      "For contractors",
    ];
    for (const heading of shownSections) {
      expect(screen.getByText(heading).closest("section")).not.toHaveClass(
        "max-sm:hidden"
      );
    }

    // The closing CTA repeats the h1's wording, so it is found by its button
    // instead; the hero uses the same label, and the closing one is second.
    // It is also shown on phone now.
    const getStarted = screen.getAllByRole("link", {
      name: "Get started free",
    });
    expect(getStarted).toHaveLength(2);
    expect(getStarted[1].closest("section")).not.toHaveClass("max-sm:hidden");

    // The long four-column footer.
    expect(screen.getByText("All guides").closest("footer")).toHaveClass(
      "max-sm:hidden"
    );
  });

  it("leaves a minimal phone footer with the full legal link set, which the block above has no door for", async () => {
    const { container } = await renderLanding();
    const phoneFooter = container.querySelector("footer.sm\\:hidden");
    expect(phoneFooter).not.toBeNull();
    // LEGAL_LINKS (src/lib/legal.ts) is the source of truth here, not a
    // hardcoded pair: the other doors ("I'm a contractor", "Emergency help")
    // are in PhoneLanding already, a few hundred pixels up the same short
    // screen, so this footer only ever needs to carry the legal set.
    const links = within(phoneFooter as HTMLElement).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      LEGAL_LINKS.map((l) => l.href)
    );
  });

  // ONE h1, and the phone/desktop split is exactly why it needs a test. Both
  // hero blocks ship in the HTML (the split is CSS: `sm:hidden` on one,
  // `max-sm:hidden` on the other), so when PhoneLanding's heading was also an
  // h1 the landing page handed every crawler two top-level headings. The one
  // that survives is the desktop hero's, which is the headline this page is
  // trying to rank on; PhoneLanding's is an h2 with identical classes.
  it("ships exactly one h1", async () => {
    const { container } = await renderLanding();
    const h1s = container.querySelectorAll("h1");
    expect(Array.from(h1s).map((h) => h.textContent?.trim())).toEqual([
      "Know what your home needs before it costs you",
    ]);
  });

  it("keeps the invisible structured data on every width", async () => {
    const { container } = await renderLanding();
    expect(
      container.querySelectorAll('script[type="application/ld+json"]').length
    ).toBeGreaterThan(0);
  });
});

// The words a search engine reads to work out WHAT OakTend is. The h1 is the
// brand promise and names no search anyone types, so these three pieces carry
// the category: one sentence under the h1, one fixed definition lower down,
// and a way from the landing page to every guide.
describe("landing page, what OakTend is", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("says the category in one sentence right under the h1, and on the phone landing too", async () => {
    await renderLanding();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.nextElementSibling).toHaveTextContent(CATEGORY_SENTENCE);

    const phoneBlock = screen
      .getByRole("link", { name: "I'm a homeowner" })
      .closest("div.sm\\:hidden") as HTMLElement;
    expect(phoneBlock).toHaveTextContent(CATEGORY_SENTENCE);
  });

  it("defines OakTend with the fixed description, word for word, on every width", async () => {
    await renderLanding();
    const section = screen
      .getByRole("heading", { level: 2, name: "What is OakTend?" })
      .closest("section") as HTMLElement;
    expect(section).not.toHaveClass("max-sm:hidden");
    expect(within(section).getByText(ENTITY_DESCRIPTION)).toBeInTheDocument();
    expect(section).toHaveTextContent("We never sell your personal information.");
    expect(
      within(section).getByRole("link", { name: "About OakTend" })
    ).toHaveAttribute("href", "/about");
  });

  it("links to all 17 guides on every width", async () => {
    await renderLanding();
    const section = screen
      .getByRole("heading", { level: 2, name: "Home maintenance guides" })
      .closest("section") as HTMLElement;
    expect(section).not.toHaveClass("max-sm:hidden");
    const hrefs = within(section)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(GUIDE_LINKS).toHaveLength(17);
    for (const guide of GUIDE_LINKS) {
      expect(hrefs).toContain(guide.href);
    }
    expect(hrefs).toContain("/guides");
  });

  // The pro side is closed during the preview, so nothing on this page may
  // read as a live promise of pros, leads or quotes. Wording only: the doors
  // themselves go where they always went.
  it("makes no pro promise in the chips, the contractor band or the price line during the preview", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    await renderLanding();
    expect(screen.queryByText("Find a pro for")).toBeNull();
    expect(screen.getByText("Common jobs to post")).toBeInTheDocument();
    expect(screen.queryByText(/Real local leads/)).toBeNull();
    expect(
      screen.getByText("Fix homes for a living? OakTend for Pros is coming soon.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Join the pro waitlist" })
    ).toHaveAttribute("href", "/pros");
    expect(
      screen.getByText(/Everything in the app is free during our preview/)
    ).toBeInTheDocument();
  });

  it("keeps the contractor band's normal wording outside the preview", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    await renderLanding();
    expect(
      screen.getByText("Fix homes for a living? Real local leads, honest pricing.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore OakTend for Pros" })
    ).toHaveAttribute("href", "/pros");
  });
});

describe("landing page, cities section", () => {
  const SORTED_CITIES = LAUNCH_CITY_NAMES.slice().sort((a, b) =>
    a.localeCompare(b)
  );

  it("lists all 36 cities alphabetically with no Launch city tag", async () => {
    await renderLanding();
    const heading = screen.getByRole("heading", {
      name: /OakTend serves homeowners across/i,
    });
    const section = heading.closest("section") as HTMLElement;

    expect(screen.queryByText("Launch city")).not.toBeInTheDocument();

    // Desktop chip grid: every city, in the same alphabetical order as
    // LAUNCH_CITY_NAMES sorted, each a single link (phone's list repeats
    // the first 8 - checked separately below - so this scopes to the
    // sm-and-up grid specifically).
    const desktopList = section.querySelector(
      "ul.max-sm\\:hidden"
    ) as HTMLElement;
    const desktopLinks = within(desktopList).getAllByRole("link");
    expect(desktopLinks).toHaveLength(SORTED_CITIES.length);
    expect(desktopLinks.map((a) => a.textContent)).toEqual(SORTED_CITIES);

    // The two hand-written routes still get their own pages; everything
    // else goes through the generic /oc/<slug> page.
    const fv = desktopLinks.find((a) => a.textContent === "Fountain Valley");
    const hb = desktopLinks.find((a) => a.textContent === "Huntington Beach");
    expect(fv).toHaveAttribute("href", "/fountain-valley");
    expect(hb).toHaveAttribute("href", "/huntington-beach");
    const irvine = desktopLinks.find((a) => a.textContent === "Irvine");
    expect(irvine).toHaveAttribute("href", "/oc/irvine");
  });

  it("links the county hub from under the city list, outside both list variants", async () => {
    await renderLanding();
    const hub = screen.getByRole("link", {
      name: "Home maintenance in Orange County, city by city",
    });
    expect(hub).toHaveAttribute("href", "/oc");
    // Not inside the phone-only list or the desktop-only grid, so it shows at
    // every width and neither list's link count changes.
    expect(hub.closest("div.sm\\:hidden")).toBeNull();
    expect(hub.closest("ul")).toBeNull();
  });

  it("caps the phone list at 8 cities and expands/collapses in place", async () => {
    await renderLanding();
    const heading = screen.getByRole("heading", {
      name: /OakTend serves homeowners across/i,
    });
    const section = heading.closest("section") as HTMLElement;
    const phoneBlock = section.querySelector("div.sm\\:hidden") as HTMLElement;

    expect(within(phoneBlock).getAllByRole("link")).toHaveLength(8);
    const seeAll = within(phoneBlock).getByRole("button", {
      name: `See all ${SORTED_CITIES.length} cities`,
    });

    fireEvent.click(seeAll);
    expect(within(phoneBlock).getAllByRole("link")).toHaveLength(
      SORTED_CITIES.length
    );
    const showFewer = within(phoneBlock).getByRole("button", {
      name: "Show fewer",
    });

    fireEvent.click(showFewer);
    expect(within(phoneBlock).getAllByRole("link")).toHaveLength(8);
  });
});
