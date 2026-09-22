import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CATEGORY_SENTENCE,
  ENTITY_DESCRIPTION,
  siteDescription,
  siteTitle,
} from "./siteMetadata";

// The default <title> and meta description are the two strings a search
// result shows for the landing page, and the entity description is what an AI
// answer tool quotes. Three things can go wrong with them quietly: the title
// stops naming the search it is aimed at, a preview string starts promising
// something the preview has switched off, or the non-preview strings change
// when nobody meant them to.

afterEach(() => {
  vi.unstubAllEnvs();
});

// Words that would be a promise the preview cannot keep. "pro" is matched as a
// whole word so "property" and "professional" do not trip it.
const PREVIEW_PROMISES = [
  /\bpros?\b/i,
  /\bquotes?\b/i,
  /\bbook(ed|ing|ings)?\b/i,
  /\bmatch(ed|ing)?\b/i,
  /\bpay(ment|ments)?\b/i,
  /\bcontractors?\b/i,
];

describe("site title and description, preview mode", () => {
  it("aims the default title at the search: category plus county", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    expect(siteTitle()).toBe(
      "OakTend: free home maintenance app for Orange County"
    );
    // Long titles are cut off in a search result at roughly 60 characters.
    expect(siteTitle().length).toBeLessThanOrEqual(60);
  });

  it("names the category, the county and the main features in the description", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const d = siteDescription();
    expect(d).toContain("home maintenance app");
    expect(d).toContain("Orange County");
    for (const feature of ["maintenance plan", "reminders", "home health score", "documents"]) {
      expect(d).toContain(feature);
    }
  });

  it("promises no pros, quotes, bookings or payments", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    for (const text of [siteTitle(), siteDescription()]) {
      for (const promise of PREVIEW_PROMISES) {
        expect(text).not.toMatch(promise);
      }
    }
  });
});

describe("site title and description, preview off", () => {
  it("keeps the brand title and the original description", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    expect(siteTitle()).toBe("OakTend: Your home, looked after");
    expect(siteDescription()).toBe(
      "Keep your house in good shape, know what needs attention, store your home docs, and reach a local pro when something breaks."
    );
  });

  it("treats anything but the exact flag value as off", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "true");
    expect(siteTitle()).toBe("OakTend: Your home, looked after");
  });
});

describe("the fixed entity description", () => {
  it("is the approved wording, word for word", () => {
    expect(ENTITY_DESCRIPTION).toBe(
      "OakTend is a free home maintenance app for Orange County, California homeowners. Add your home once and it builds a maintenance plan around the home's age and systems, keeps your photos, documents and warranties in one place, and gives you a home health score. Ask OakTend a question and it answers from your home's own record."
    );
  });

  it("is true in either mode, so it makes no preview-dependent promise", () => {
    for (const text of [ENTITY_DESCRIPTION, CATEGORY_SENTENCE]) {
      for (const promise of PREVIEW_PROMISES) {
        expect(text).not.toMatch(promise);
      }
    }
  });

  it("has no em dash or en dash", () => {
    for (const text of [ENTITY_DESCRIPTION, CATEGORY_SENTENCE]) {
      expect(text).not.toMatch(/[\u2013\u2014]/);
    }
  });
});
