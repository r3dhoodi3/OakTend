import { beforeEach, describe, expect, it, vi } from "vitest";

const jar = vi.hoisted(() => ({ value: null as string | null }));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    set: (_name: string, value: string) => {
      jar.value = value;
    },
    get: () => undefined,
  }),
}));

import { setFlash } from "./flash";
import { safeFlashHref, safeFlashLinkLabel } from "./flashLink";

function written() {
  return JSON.parse(jar.value ?? "null");
}

beforeEach(() => {
  jar.value = null;
});

describe("setFlash link", () => {
  it("stores a same-site href and its label", async () => {
    await setFlash("Added to your plan.", "success", {
      href: "/dashboard#this-month",
      linkLabel: "View plan",
    });
    expect(written()).toMatchObject({
      message: "Added to your plan.",
      type: "success",
      href: "/dashboard#this-month",
      linkLabel: "View plan",
    });
  });

  it("drops an off-site href entirely", async () => {
    await setFlash("Hi.", "info", { href: "https://evil.example", linkLabel: "Go" });
    const f = written();
    expect(f.href).toBeUndefined();
    expect(f.linkLabel).toBeUndefined();
  });

  it("leaves existing calls unchanged", async () => {
    await setFlash("Saved.");
    const f = written();
    expect(f).toMatchObject({ message: "Saved.", type: "success" });
    expect(f.href).toBeUndefined();
  });
});

describe("safeFlashHref", () => {
  it.each(["/dashboard", "/dashboard#this-month", "/forecast?x=1"])(
    "accepts %s",
    (h) => expect(safeFlashHref(h)).toBe(h)
  );
  it.each([
    "//evil.example",
    "https://evil.example",
    "/\\evil.example",
    "javascript:alert(1)",
    "dashboard",
    "",
    "/a b",
    "/a\nb",
    42,
    null,
  ])("rejects %s", (h) => expect(safeFlashHref(h)).toBeNull());
});

describe("safeFlashLinkLabel", () => {
  it("defaults and trims", () => {
    expect(safeFlashLinkLabel(undefined)).toBe("View");
    expect(safeFlashLinkLabel("   ")).toBe("View");
    expect(safeFlashLinkLabel(" View plan ")).toBe("View plan");
    expect(safeFlashLinkLabel("x".repeat(100)).length).toBe(24);
  });
});
