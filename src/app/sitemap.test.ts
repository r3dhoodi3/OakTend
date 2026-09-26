import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GUIDE_DATES, GUIDE_PATHS } from "@/lib/guides";

// The sitemap's two jobs, and the two ways it can quietly do real damage:
//
//   1. LASTMOD MUST NOT LIE. `lastModified: new Date()` is the default thing
//      to write here and it tells Google every legal page changed this hour,
//      forever. Google's stated behaviour is to stop trusting a site's
//      lastmod values once it catches them not matching the page - so a fake
//      date does not just fail to help, it costs the URLs whose dates are
//      real. Hence the hard-coded per-page map, and hence the test below that
//      no entry is stamped with today.
//
//   2. IT MUST NOT LIST A 404. While the homeowner preview is on, every /p/
//      page is unreachable for an anonymous crawler (see the comment in
//      sitemap.ts for the two independent rules that make it so), so the
//      sitemap must contain none of them.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// What the contractors query answers. Reassigned per test.
let proRows: { id: string; slug: string | null }[] = [];
let proError: { message: string; code?: string } | null = null;
// Every filter the sitemap applied, so the visibility rules can be asserted
// rather than taken on trust.
let filters: { method: string; args: unknown[] }[] = [];

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(() => ({
    from: (table: string) => {
      if (table !== "contractors") {
        throw new Error(`sitemap read went to "${table}", not contractors`);
      }
      // Chainable stub: every builder method records itself and returns the
      // same object, and awaiting it resolves to the row set.
      const builder: any = {
        then: (resolve: (v: unknown) => void) =>
          resolve({ data: proError ? null : proRows, error: proError }),
      };
      for (const method of ["select", "not", "eq", "order", "limit"]) {
        builder[method] = (...args: unknown[]) => {
          filters.push({ method, args });
          return builder;
        };
      }
      return builder;
    },
  })),
}));

import sitemap from "./sitemap";

beforeEach(() => {
  proRows = [];
  proError = null;
  filters = [];
});

afterEach(() => {
  vi.unstubAllEnvs();
});

function urls(entries: { url: string }[]): string[] {
  return entries.map((e) => e.url);
}

describe("sitemap lastModified", () => {
  it("stamps no URL with today's date", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const today = new Date().toISOString().slice(0, 10);
    // A guide that really was edited today carries today's date in GUIDE_DATES,
    // typed in by hand. That is a real date, not `new Date()`, and the test
    // further down pins that the sitemap reads it from that map. Without this
    // exemption the suite goes red on the very day a guide is honestly updated
    // and green again the next morning, which teaches people to backdate.
    const writtenDown = new Map<string, string>(
      GUIDE_PATHS.map((path) => [`${SITE_URL}${path}`, GUIDE_DATES[path].dateModified])
    );
    for (const entry of await sitemap()) {
      if (entry.lastModified == null) continue;
      if (writtenDown.get(entry.url) === entry.lastModified) continue;
      const stamped = new Date(entry.lastModified).toISOString().slice(0, 10);
      expect(stamped, `${entry.url} is stamped with now`).not.toBe(today);
    }
  });

  it("gives every static page a real date", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const entries = await sitemap();
    for (const entry of entries) {
      if (entry.url.includes("/p/")) continue;
      expect(entry.lastModified, `${entry.url} has no lastmod`).toBeDefined();
      expect(String(entry.lastModified)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("takes each guide's date from the same map the guide's Article node uses", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const entries = await sitemap();
    for (const path of GUIDE_PATHS) {
      const entry = entries.find((e) => e.url === `${SITE_URL}${path}`);
      expect(entry, `${path} is missing from the sitemap`).toBeDefined();
      expect(entry!.lastModified).toBe(GUIDE_DATES[path].dateModified);
    }
  });

  // contractors has a created_at and no updated_at (database.types.ts), so
  // there is no honest answer for a pro page - and an absent lastmod is the
  // correct way to say so.
  it("omits lastModified on pro pages rather than guessing", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    proRows = [{ id: "11111111-1111-1111-1111-111111111111", slug: "tonys-plumbing" }];
    const proEntries = (await sitemap()).filter((e) => e.url.includes("/p/"));
    expect(proEntries).toHaveLength(1);
    expect(proEntries[0].lastModified).toBeUndefined();
  });
});

describe("sitemap pro pages", () => {
  it("lists none at all while the homeowner preview is on", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    proRows = [
      { id: "11111111-1111-1111-1111-111111111111", slug: "tonys-plumbing" },
      { id: "22222222-2222-2222-2222-222222222222", slug: null },
    ];
    const entries = await sitemap();
    expect(urls(entries).some((u) => u.includes("/p/"))).toBe(false);
    // And it does not even ask the database, since the answer cannot matter.
    expect(filters).toHaveLength(0);
  });

  it("re-states the three visibility rules /p/<id> itself applies", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    await sitemap();
    // user_id is not null: public_pro_profile and browse_pros both require it.
    expect(filters).toContainEqual({
      method: "not",
      args: ["user_id", "is", null],
    });
    // The launch-market gate, and the internal/test-pro gate (0165).
    expect(filters).toContainEqual({
      method: "eq",
      args: ["serves_orange_county", true],
    });
    expect(filters).toContainEqual({ method: "eq", args: ["is_internal", false] });
  });

  it("prefers the slug URL and falls back to the id", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    proRows = [
      { id: "11111111-1111-1111-1111-111111111111", slug: "tonys-plumbing" },
      { id: "22222222-2222-2222-2222-222222222222", slug: null },
    ];
    const entries = await sitemap();
    expect(urls(entries)).toContain(`${SITE_URL}/p/tonys-plumbing`);
    expect(urls(entries)).toContain(
      `${SITE_URL}/p/22222222-2222-2222-2222-222222222222`
    );
  });

  it("still serves the static entries when the pro query fails", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    proError = { message: "boom" };
    const entries = await sitemap();
    expect(urls(entries)).toContain(`${SITE_URL}/`);
    expect(urls(entries).some((u) => u.includes("/p/"))).toBe(false);
  });
});

describe("sitemap coverage", () => {
  it("lists the marketing surface, both hand-written city pages and all 34 /oc pages", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const list = urls(await sitemap());
    for (const path of ["/", "/pros", "/pricing", "/emergency-help", "/contact"]) {
      expect(list).toContain(`${SITE_URL}${path}`);
    }
    expect(list).toContain(`${SITE_URL}/fountain-valley`);
    expect(list).toContain(`${SITE_URL}/huntington-beach`);
    expect(list.filter((u) => u.includes("/oc/"))).toHaveLength(34);
  });

  // The pro side is closed during the preview: /pros is a short coming-soon
  // page and the two pro legal documents cover a product nobody can join yet.
  // They stay reachable; they just are not worth a crawler's visit.
  it("leaves the three pro-side pages out while the homeowner preview is on", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const list = urls(await sitemap());
    for (const path of ["/pros", "/pro-terms", "/pro-data-addendum"]) {
      expect(list, `${path} is listed in preview`).not.toContain(`${SITE_URL}${path}`);
    }
    // Nothing else goes with them.
    for (const path of ["/", "/pricing", "/emergency-help", "/about", "/terms", "/privacy", "/guides"]) {
      expect(list).toContain(`${SITE_URL}${path}`);
    }
    expect(list.filter((u) => u.includes("/oc/"))).toHaveLength(34);
  });

  it("lists all three pro-side pages again once the preview is off", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const list = urls(await sitemap());
    for (const path of ["/pros", "/pro-terms", "/pro-data-addendum"]) {
      expect(list).toContain(`${SITE_URL}${path}`);
    }
  });

  it("lists the About page and the county hub in both modes", async () => {
    for (const mode of ["", "homeowner"]) {
      vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", mode);
      const list = urls(await sitemap());
      expect(list).toContain(`${SITE_URL}/about`);
      expect(list).toContain(`${SITE_URL}/oc`);
    }
  });

  it("has no duplicate URLs", async () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "");
    const list = urls(await sitemap());
    expect(new Set(list).size).toBe(list.length);
  });
});
