import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import robots, { ALLOWED_PUBLIC_PATHS, DISALLOWED_PATHS } from "./robots";
import { isGuardedPath, isPublicPath } from "@/lib/supabase/middleware";

// robots.txt used to name six of the app's private segments and leave the
// other twenty-odd open to crawlers. Nothing leaked, because middleware
// redirects them all, but the redirect targets carry a `next=` parameter and
// /join carries an invite token, and neither belongs in a search index.
//
// The two directions below are what keep the file honest without anyone having
// to remember it exists:
//   1. everything the middleware guards is disallowed,
//   2. nothing PUBLIC is disallowed by accident.
// Source-text on the middleware side, the same trick
// src/lib/ownershipChecks.test.ts and src/lib/supabase/guardedSegments.test.ts
// use, because GUARDED_SEGMENTS is module-private by design.

function guardedSegmentsFromSource(): string[] {
  const src = readFileSync(
    fileURLToPath(new URL("../lib/supabase/middleware.ts", import.meta.url)),
    "utf8"
  );
  const block = /const GUARDED_SEGMENTS = new Set\(\[([\s\S]*?)\]\);/.exec(src);
  if (!block) throw new Error("GUARDED_SEGMENTS literal was not found");
  return Array.from(block[1].matchAll(/"([a-z0-9-]+)"/g)).map((m) => m[1]);
}

describe("robots.txt", () => {
  it("finds the middleware's guarded segment list", () => {
    const segments = guardedSegmentsFromSource();
    expect(segments.length).toBeGreaterThan(20);
    expect(segments).toContain("dashboard");
  });

  it("disallows every segment the middleware guards", () => {
    for (const segment of guardedSegmentsFromSource()) {
      const covered = DISALLOWED_PATHS.some(
        (p) => p === `/${segment}` || p === `/${segment}/`
      );
      expect(covered, `/${segment} is private but crawlable`).toBe(true);
    }
  });

  it("disallows nothing that is actually public", () => {
    for (const path of DISALLOWED_PATHS) {
      expect(isGuardedPath(path.replace(/\/$/, "")), `${path} is public`).toBe(
        true
      );
    }
  });

  // The landing pages, city pages, guides and public pro profiles are the
  // whole point of having a sitemap; a stray prefix here would delist them.
  it("leaves the public marketing surface crawlable", () => {
    for (const publicPath of [
      "/",
      "/pros",
      "/pricing",
      "/p/some-pro-slug",
      "/guides/roof-maintenance",
      "/fountain-valley",
      "/privacy",
      "/terms",
      "/contact",
    ]) {
      const blocked = DISALLOWED_PATHS.some((p) => publicPath.startsWith(p));
      expect(blocked, `${publicPath} must stay crawlable`).toBe(false);
    }
  });

  // THE PREFIX TRAP. "Disallow: /emergency" is right for the signed-in
  // /emergency screen, and it also prefix-matches the public /emergency-help
  // page, which is in the sitemap. A crawler resolves the clash by taking the
  // LONGEST matching rule (RFC 9309; Google and Bing both follow it), so the
  // fix is an explicit Allow that is longer than the Disallow it overlaps.
  function isCrawlable(path: string): boolean {
    const rule = robots().rules;
    const first = Array.isArray(rule) ? rule[0] : rule;
    const allows = ([] as string[]).concat(first.allow ?? []);
    const disallows = ([] as string[]).concat(first.disallow ?? []);
    const longest = (rules: string[]) =>
      Math.max(-1, ...rules.filter((r) => path.startsWith(r)).map((r) => r.length));
    // A tie goes to Allow, which is also what the spec says.
    return longest(allows) >= longest(disallows);
  }

  it("lets crawlers reach /emergency-help despite the /emergency prefix", () => {
    const first = ([] as any[]).concat(robots().rules)[0];
    expect(first.allow).toContain("/emergency-help");
    expect(isCrawlable("/emergency-help")).toBe(true);
    // And the private twin stays blocked.
    expect(isCrawlable("/emergency")).toBe(false);
    expect(isCrawlable("/emergency/gas")).toBe(false);
  });

  it("only lists an Allow exception for a page that is public and really collides", () => {
    for (const path of ALLOWED_PUBLIC_PATHS) {
      expect(isPublicPath(path), `${path} is not public`).toBe(true);
      expect(isGuardedPath(path), `${path} is guarded`).toBe(false);
      expect(
        DISALLOWED_PATHS.some((p) => path.startsWith(p)),
        `${path} needs no exception`
      ).toBe(true);
    }
  });

  it("blocks no sitemap-worthy public page by prefix", () => {
    for (const publicPath of [
      "/emergency-help",
      "/oc",
      "/oc/irvine",
      "/about",
      "/guides",
      "/pricing",
    ]) {
      expect(isCrawlable(publicPath), `${publicPath} is blocked`).toBe(true);
    }
  });
});
