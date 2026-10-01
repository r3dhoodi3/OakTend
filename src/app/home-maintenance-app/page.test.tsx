// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { isPublicPath } from "@/lib/supabase/middleware";
import Page, { metadata } from "./page";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function jsonLdNodes(container: HTMLElement): Record<string, any>[] {
  return Array.from(
    container.querySelectorAll('script[type="application/ld+json"]')
  ).flatMap((s) => {
    const parsed = JSON.parse(s.textContent ?? "null");
    return Array.isArray(parsed) ? parsed : [parsed];
  });
}

describe("/home-maintenance-app", () => {
  it("is public, canonical, and inside the title and description limits", () => {
    expect(isPublicPath("/home-maintenance-app")).toBe(true);
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/home-maintenance-app`);
    const title = (metadata.title as { absolute: string }).absolute;
    expect(title).toContain("Home Maintenance App");
    expect(title.length).toBeLessThan(60);
    expect(String(metadata.description).length).toBeLessThan(155);
  });

  it("leads with the brand and the category in the h1, and sends people to sign up", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent("OakTend: the home maintenance app for Orange County homeowners");
    const ctas = screen.getAllByRole("link", { name: "Get started free" });
    expect(ctas.length).toBeGreaterThan(0);
    for (const a of ctas) expect(a).toHaveAttribute("href", "/homeowner-signup");
    expect(
      screen.getByRole("link", { name: "best home maintenance apps in 2026" })
    ).toHaveAttribute("href", "/guides/best-home-maintenance-apps");
  });

  it("emits valid JSON-LD: the app with no rating, and an FAQ matching the visible questions", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const { container } = render(<Page />);
    const nodes = jsonLdNodes(container);
    const app = nodes.find((n) => n["@type"] === "WebApplication")!;
    expect(app).toBeDefined();
    expect(app.aggregateRating).toBeUndefined();
    expect(app.review).toBeUndefined();
    expect(app.offers.price).toBe("0");
    const faq = nodes.find((n) => n["@type"] === "FAQPage")!;
    for (const q of faq.mainEntity) {
      expect(screen.getByRole("heading", { level: 3, name: q.name })).toBeInTheDocument();
    }
  });

  it("makes no pro promise and prints no price during the preview", () => {
    vi.stubEnv("NEXT_PUBLIC_PREVIEW_MODE", "homeowner");
    const { container } = render(<Page />);
    expect(container.textContent).not.toMatch(/\$\d/);
    expect(container.textContent).toContain("Our pro network isn't open");
  });

  it("uses no em dash or en dash", () => {
    const src = readFileSync(
      resolve(process.cwd(), "src/app/home-maintenance-app/page.tsx"),
      "utf8"
    );
    expect(src).not.toMatch(/[\u2013\u2014]/);
  });
});
