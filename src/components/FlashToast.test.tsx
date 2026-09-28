// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/forecast",
}));

import ToastProvider from "./ToastProvider";
import FlashToast from "./FlashToast";

// A flash set by a server action (src/lib/flash.ts) lands as a cookie; this
// component reads it on the client and hands it to the toast stack. The link
// part is untrusted cookie data, so only same-site relative paths survive.

function setCookie(payload: unknown) {
  document.cookie = `oaktend_flash=${encodeURIComponent(
    JSON.stringify(payload)
  )}; path=/`;
}

function renderFlash() {
  return render(
    <ToastProvider>
      <FlashToast />
    </ToastProvider>
  );
}

beforeEach(() => {
  document.cookie = "oaktend_flash=; Max-Age=0; path=/";
});

afterEach(() => {
  cleanup();
  document.cookie = "oaktend_flash=; Max-Age=0; path=/";
});

describe("FlashToast", () => {
  it("shows a plain flash with no link", () => {
    setCookie({ message: "Saved.", type: "success", id: "a1" });
    renderFlash();
    expect(screen.getByText("Saved.")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders a same-site href as a focusable link inside the status region", () => {
    setCookie({
      message: "Added to your plan.",
      type: "success",
      id: "a2",
      href: "/dashboard#this-month",
      linkLabel: "View plan",
    });
    renderFlash();
    const link = screen.getByRole("link", { name: "View plan" });
    expect(link).toHaveAttribute("href", "/dashboard#this-month");
    expect(link.closest('[role="status"]')).not.toBeNull();
    link.focus();
    expect(link).toHaveFocus();
  });

  it.each([
    ["https://evil.example/", "absolute URL"],
    ["//evil.example/", "protocol-relative URL"],
    ["/\\evil.example", "backslash trick"],
    ["javascript:alert(1)", "javascript URL"],
    ["dashboard", "path without a leading slash"],
  ])("drops an unsafe href (%s, %s) but still shows the message", (href) => {
    setCookie({
      message: "Hello.",
      type: "info",
      id: `bad-${href}`,
      href,
      linkLabel: "Go",
    });
    renderFlash();
    expect(screen.getByText("Hello.")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("falls back to a default label when the cookie has none", () => {
    setCookie({ message: "Done.", type: "success", id: "a3", href: "/dashboard" });
    renderFlash();
    expect(screen.getByRole("link", { name: "View" })).toHaveAttribute(
      "href",
      "/dashboard"
    );
  });

  it("clears the cookie after showing it", () => {
    setCookie({ message: "Once.", type: "success", id: "a4" });
    renderFlash();
    expect(document.cookie).not.toContain("oaktend_flash=%7B");
  });
});
