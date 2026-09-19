import { afterEach, describe, expect, it, vi } from "vitest";
import { cityPageCopy } from "./cityCopy";

// The city landing pages are where a stranger meets OakTend for the first
// time, and they sold "local pros in <city>" in the h1, the title and the
// description. While the pro side is closed that is a promise the product
// cannot keep, so cityPageCopy swaps the wording.
//
// THE RULE, same as every other preview test in this repo: with the flag off,
// nothing changes. The "unchanged when the flag is off" cases below are the
// point of the file - a preview switch that quietly rewrites a live marketing
// page would be worse than no switch.

afterEach(() => {
  vi.unstubAllEnvs();
});

// Anything that reads as "pros are here and available". Deliberately includes
// the exact phrases the old copy used, so a partial revert is caught.
const PRO_PROMISES = [
  "local pros",
  "license-checked local pros",
  "when something breaks",
];

describe("cityPageCopy, preview off", () => {
  it("is the wording these pages have always shipped", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const copy = cityPageCopy("Fountain Valley");
    expect(copy.title).toBe(
      "Home maintenance and local pros in Fountain Valley, CA"
    );
    expect(copy.description).toBe(
      "A maintenance plan built for your Fountain Valley home, answers about your own systems, and license-checked local pros when something breaks. Free to start."
    );
    expect(copy.headline).toBe(
      "Home maintenance and local pros in Fountain Valley"
    );
  });

  it("interpolates whichever city it is handed", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const copy = cityPageCopy("Irvine");
    expect(copy.title).toContain("Irvine");
    expect(copy.description).toContain("Irvine");
    expect(copy.headline).toContain("Irvine");
  });
});

describe("cityPageCopy, preview on", () => {
  it("promises no pros in the title, description or headline", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const copy = cityPageCopy("Huntington Beach");
    for (const field of [copy.title, copy.description, copy.headline]) {
      for (const promise of PRO_PROMISES) {
        expect(field.toLowerCase()).not.toContain(promise);
      }
    }
  });

  it("says what actually happens instead, and still names the city", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const copy = cityPageCopy("Huntington Beach");
    expect(copy.headline).toBe("Home maintenance for Huntington Beach homeowners");
    expect(copy.title).toBe("Home maintenance for Huntington Beach, CA homeowners");
    // The same claim PREVIEW_JOB_POSTED_COPY makes to a homeowner the moment
    // they act on this page: the network is closed and a person does it.
    expect(copy.description).toContain("isn't open yet");
    expect(copy.description).toContain("by hand");
    expect(copy.description).toContain("Huntington Beach");
  });

  // The description is also the OG and Twitter description. A share card is
  // truncated hard, so the honest half has to come before the pitch.
  it("leads the description with the home, not the disclaimer", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const copy = cityPageCopy("Irvine");
    expect(copy.description.startsWith("A maintenance plan built for your Irvine home")).toBe(
      true
    );
  });
});
