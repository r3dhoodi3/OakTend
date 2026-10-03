// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  NATIVE_CLASS,
  NATIVE_CLASS_INIT_SCRIPT,
  applyNativeShellClass,
} from "./nativeShellClass";

// html.native is the one hook every native-only style hangs off. The rule that
// matters most: a normal browser tab never gets it, so the website cannot
// change. Pinned here for the inline <head> script and the runtime backstop.

type CapWindow = Window & { Capacitor?: unknown };

function runInitScript() {
  new Function(NATIVE_CLASS_INIT_SCRIPT)();
}

function html() {
  return document.documentElement;
}

beforeEach(() => {
  html().className = "";
  html().removeAttribute("data-platform");
});

afterEach(() => {
  delete (window as CapWindow).Capacitor;
  html().className = "";
  html().removeAttribute("data-platform");
});

describe("NATIVE_CLASS_INIT_SCRIPT", () => {
  it("adds nothing in a normal browser (no Capacitor bridge)", () => {
    runInitScript();
    expect(html().classList.contains(NATIVE_CLASS)).toBe(false);
    expect(html().hasAttribute("data-platform")).toBe(false);
    expect(html().className).toBe("");
  });

  it("adds nothing when the bridge says it is not native (Capacitor web build)", () => {
    (window as CapWindow).Capacitor = {
      isNativePlatform: () => false,
      getPlatform: () => "web",
    };
    runInitScript();
    expect(html().classList.contains(NATIVE_CLASS)).toBe(false);
    expect(html().hasAttribute("data-platform")).toBe(false);
  });

  it("adds nothing when isNativePlatform is missing or not a function", () => {
    (window as CapWindow).Capacitor = { isNativePlatform: true };
    runInitScript();
    expect(html().classList.contains(NATIVE_CLASS)).toBe(false);
  });

  it("adds html.native and data-platform inside the iOS shell", () => {
    (window as CapWindow).Capacitor = {
      isNativePlatform: () => true,
      getPlatform: () => "ios",
    };
    runInitScript();
    expect(html().classList.contains(NATIVE_CLASS)).toBe(true);
    expect(html().getAttribute("data-platform")).toBe("ios");
  });

  it("keeps existing classes (dark, font) intact", () => {
    html().className = "dark font-sans";
    (window as CapWindow).Capacitor = {
      isNativePlatform: () => true,
      getPlatform: () => "android",
    };
    runInitScript();
    expect(html().className).toBe("dark font-sans native");
    expect(html().getAttribute("data-platform")).toBe("android");
  });

  it("never throws, even if the bridge does", () => {
    (window as CapWindow).Capacitor = {
      isNativePlatform: () => {
        throw new Error("boom");
      },
    };
    expect(runInitScript).not.toThrow();
    expect(html().classList.contains(NATIVE_CLASS)).toBe(false);
  });
});

describe("applyNativeShellClass", () => {
  it("does nothing on web", () => {
    applyNativeShellClass(false, null);
    expect(html().className).toBe("");
    expect(html().hasAttribute("data-platform")).toBe(false);
  });

  it("adds the class and platform on native", () => {
    applyNativeShellClass(true, "ios");
    expect(html().classList.contains(NATIVE_CLASS)).toBe(true);
    expect(html().getAttribute("data-platform")).toBe("ios");
  });
});
