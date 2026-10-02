// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import HomeZada, { metadata as homezadaMeta } from "@/app/guides/oaktend-vs-homezada/page";
import Angi, { metadata as angiMeta } from "@/app/guides/oaktend-vs-angi/page";
import Thumbtack, { metadata as thumbtackMeta } from "@/app/guides/oaktend-vs-thumbtack/page";
import { GUIDE_SOURCES } from "./guideExtras";

// The three "OakTend vs" guides. Pins the legal guardrails from
// OakTend-marketing/research-2026-10-01/comparison-pages-legal.md that code
// can check: plain-text names (no images at all), the trademark and
// non-affiliation line, a disclosure that OakTend wrote the page, sources only
// from the company's own pages, store listings or SEC filing, no superlatives,
// no ratings, and preview-aware OakTend claims.

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

const PAGES = [
  {
    path: "/guides/oaktend-vs-homezada",
    dir: "oaktend-vs-homezada",
    name: "HomeZada",
    owner: "HomeZada, Inc.",
    markOwner: "HomeZada, Inc.",
    Page: HomeZada,
    metadata: homezadaMeta,
    hosts: ["www.homezada.com", "apps.apple.com", "play.google.com"],
  },
  {
    path: "/guides/oaktend-vs-angi",
    dir: "oaktend-vs-angi",
    name: "Angi",
    owner: "Angi Inc.",
    markOwner: "Angi Inc. or its affiliates",
    Page: Angi,
    metadata: angiMeta,
    hosts: ["www.sec.gov", "apps.apple.com", "play.google.com"],
  },
  {
    path: "/guides/oaktend-vs-thumbtack",
    dir: "oaktend-vs-thumbtack",
    name: "Thumbtack",
    owner: "Thumbtack, Inc.",
    markOwner: "Thumbtack, Inc.",
    Page: Thumbtack,
    metadata: thumbtackMeta,
    hosts: [
      "www.thumbtack.com",
      "help.thumbtack.com",
      "press.thumbtack.com",
      "apps.apple.com",
      "play.google.com",
    ],
  },
];

describe.each(PAGES)("$path", ({ dir, name, owner, markOwner, Page, metadata, path, hosts }) => {
  it("is titled OakTend vs the competitor and fits the length limits", () => {
    expect(metadata.title).toBe(`OakTend vs ${name}`);
    expect(`${metadata.title} | OakTend`.length).toBeLessThan(60);
    expect(String(metadata.description).length).toBeLessThan(155);
  });

  it("names the competitor in text only, with the trademark line and the disclosure", () => {
    const src = readFileSync(
      resolve(process.cwd(), `src/app/guides/${dir}/page.tsx`),
      "utf8"
    );
    expect(src).not.toMatch(/<img|<Image|<svg|<picture|Logo/);
    const { container } = render(<Page />);
    const stop = owner.endsWith(".") ? "" : ".";
    expect(container).toHaveTextContent(
      `${name} is a trademark of ${markOwner}${markOwner.endsWith(".") ? "" : "."} OakTend is not affiliated with, endorsed by or sponsored by ${owner}${stop} We use`
    );
    expect(container.textContent).not.toContain("..");
    expect(container).toHaveTextContent("OakTend wrote this page");
    expect(screen.getByRole("columnheader", { name })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: `When ${name} is the better fit` })
    ).toBeInTheDocument();
  });

  it("cites only the competitor's own pages, store listings or SEC filing", () => {
    const sources = GUIDE_SOURCES[path];
    expect(sources.length).toBeGreaterThan(1);
    for (const s of sources) {
      expect(hosts, s.href).toContain(new URL(s.href).host);
      expect(s.supports, s.href).toContain("Checked 2026-10-01");
    }
  });

  it("says the pro network is closed during the preview", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const { container } = render(<Page />);
    expect(container).toHaveTextContent("Free during our preview");
    expect(container).toHaveTextContent("Our pro network isn't open");
    expect(container).not.toHaveTextContent("5%");
  });

  it("keeps the copy rules: no dashes, no superlatives, no ratings", () => {
    const src = readFileSync(
      resolve(process.cwd(), `src/app/guides/${dir}/page.tsx`),
      "utf8"
    );
    expect(src).not.toMatch(/[\u2013\u2014]/);
    const { container } = render(<Page />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(
      /\b(top-rated|lawsuits?|cheapest|fastest|only app|#1|number one|rating|ratings|stars|complaints?|scam)\b/i
    );
    const jsonLd = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]')
    ).map((s) => s.textContent ?? "");
    expect(jsonLd.join("")).not.toContain("aggregateRating");
  });
});
