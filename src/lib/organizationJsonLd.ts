import { ENTITY_DESCRIPTION } from "@/lib/siteMetadata";

// The ONE Organization node, emitted by the root layout on every page
// (src/app/layout.tsx). Built here rather than inline so it can be tested
// without importing a layout that pulls in next/font.
//
// WHAT CHANGED 2026-09-20, AND WHY.
//
// areaServed used to be 36 City nodes built from LAUNCH_CITY_NAMES, repeated
// in the <head> of every page on the site. It is one AdministrativeArea now:
// OakTend serves all of Orange County, the county is the honest unit, and 36
// nodes on every page were weight without information. The per-city claim
// still exists where it belongs, on each city page's own Service node
// (src/components/CityLandingPage.tsx).
//
// The identity fields are the ones Google's Organization guidance asks for to
// tell one business from another with a similar name: legal name, phone,
// founding date, locality, and sameAs links to profiles the business really
// controls. Every value below is a fact the owner supplied. Do not add a
// profile URL here until the profile exists: a sameAs that 404s, or that
// points at somebody else's page, is worse than no sameAs.
//
// No street address, deliberately. OakTend has no storefront; the public
// business address is a registered agent's. Locality and region are enough to
// place the business, and this is an Organization, not a LocalBusiness.
//
// No WebSite node here. A separate branch adds one to the root layout; adding
// a second here would leave two after the merge.

export const ORGANIZATION_SAME_AS = [
  "https://www.linkedin.com/company/oaktend",
  "https://www.crunchbase.com/organization/oaktend",
  "https://www.instagram.com/oaktend",
];

export function buildOrganizationJsonLd(siteUrl: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "OakTend",
    legalName: "OakTend LLC",
    description: ENTITY_DESCRIPTION,
    slogan: "Your home looked after",
    foundingDate: "2026-09-03",
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    telephone: "+1-714-468-5480",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fountain Valley",
      addressRegion: "CA",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+1-714-468-5480",
      email: "hello@oaktend.com",
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: ORGANIZATION_SAME_AS,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Orange County, California",
    },
  };
}
