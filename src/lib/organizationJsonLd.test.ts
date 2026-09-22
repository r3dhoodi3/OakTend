import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildOrganizationJsonLd, ORGANIZATION_SAME_AS } from "./organizationJsonLd";
import { ENTITY_DESCRIPTION } from "./siteMetadata";

// The Organization node is in the <head> of every page, so a wrong value here
// is wrong everywhere at once, and nobody sees it: it is not rendered. These
// pin the identity facts the owner supplied and the two shapes that are easy
// to regress: one county area rather than 36 cities, and each field stated once.

const org = buildOrganizationJsonLd("https://oaktend.com") as Record<string, any>;

describe("Organization JSON-LD", () => {
  it("keeps the stable @id everything else points at", () => {
    expect(org["@type"]).toBe("Organization");
    expect(org["@id"]).toBe("https://oaktend.com#organization");
    expect(org.url).toBe("https://oaktend.com");
    expect(org.logo).toBe("https://oaktend.com/icon-512.png");
  });

  it("carries the identity facts", () => {
    expect(org.name).toBe("OakTend");
    expect(org.legalName).toBe("OakTend LLC");
    expect(org.telephone).toBe("+1-714-468-5480");
    expect(org.foundingDate).toBe("2026-09-03");
    expect(org.slogan).toBe("Your home looked after");
    expect(org.description).toBe(ENTITY_DESCRIPTION);
  });

  it("places the business in Fountain Valley, CA with no street address", () => {
    expect(org.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Fountain Valley",
      addressRegion: "CA",
      addressCountry: "US",
    });
    expect(org.address.streetAddress).toBeUndefined();
    expect(org.address.postalCode).toBeUndefined();
  });

  it("serves one county, not a list of 36 cities", () => {
    expect(org.areaServed).toEqual({
      "@type": "AdministrativeArea",
      name: "Orange County, California",
    });
  });

  it("lists exactly the three profiles the owner supplied", () => {
    expect(org.sameAs).toEqual([
      "https://www.linkedin.com/company/oaktend",
      "https://www.crunchbase.com/organization/oaktend",
      "https://www.instagram.com/oaktend",
    ]);
    expect(ORGANIZATION_SAME_AS).toHaveLength(3);
  });

  it("states each field once", () => {
    // JSON.stringify of an object literal cannot repeat a key, so this guards
    // the merge with the wording branch's fields at the source level instead.
    const src = readFileSync(
      fileURLToPath(new URL("./organizationJsonLd.ts", import.meta.url)),
      "utf8"
    );
    for (const key of ["legalName:", "foundingDate:", "sameAs:", "description:", "slogan:"]) {
      expect(src.split(key).length - 1, key).toBe(1);
    }
  });
});
