// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

// Vitest globals are off in this repo (see vitest.config.ts), so
// testing-library's auto-cleanup never wires itself up on its own.
afterEach(() => cleanup());

// ./actions is a "use server" file: importing it for real drags in the
// Supabase server client and rentcastCache's `server-only` guard, neither of
// which resolves under vitest. The floor it enforces is covered in
// parcel.test.ts; what this file covers is the button's own half of the gate.
const refreshMarketValueAction = vi.fn();
vi.mock("./actions", () => ({
  refreshMarketValueAction: () => refreshMarketValueAction(),
}));

import RefreshValue from "./RefreshValue";

// One paid lookup per home per month (F2). The button is the honest half of
// that: inside the window it is visibly unavailable with the date it comes
// back, rather than a live button that spends a press to say "not yet".
describe("RefreshValue inside the refresh window", () => {
  // 19:00 UTC = noon Pacific, so the Pacific-time formatter prints the 18th.
  const nextAt = new Date(Date.UTC(2026, 9, 18, 19)).toISOString();

  it("disables the button and names the date it comes back", () => {
    render(<RefreshValue isPlus nextRefreshAt={nextAt} />);
    const button = screen.getByRole("button", { name: "Refresh estimate" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
    // Same .btn-secondary control, not a different-looking one.
    expect(button.className).toContain("btn-secondary");
    expect(
      screen.getByText("You can refresh again on October 18, 2026.")
    ).toBeInTheDocument();
  });

  it("is a live button again once the window has passed", () => {
    render(<RefreshValue isPlus nextRefreshAt={null} />);
    expect(
      screen.getByRole("button", { name: "Refresh estimate" })
    ).toBeEnabled();
    expect(screen.queryByText(/You can refresh again/)).not.toBeInTheDocument();
  });

  // A free account's control is a link to /plus and knows nothing about the
  // floor: that gate is shown before the tap and is unchanged here.
  it("still sends a free account to /plus", () => {
    render(<RefreshValue isPlus={false} nextRefreshAt={nextAt} />);
    expect(screen.getByRole("link", { name: /Refresh estimate/ })).toHaveAttribute(
      "href",
      "/plus?reason=value"
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("RefreshValue after a press", () => {
  // 19:00 UTC = noon Pacific, so the Pacific-time formatter prints the 18th.
  const nextAt = new Date(Date.UTC(2026, 9, 18, 19)).toISOString();

  it("reports the refresh and when the next one is available", async () => {
    refreshMarketValueAction.mockResolvedValue({
      ok: true,
      data: { nextRefreshAt: nextAt },
    });
    render(<RefreshValue isPlus nextRefreshAt={null} />);
    screen.getByRole("button", { name: "Refresh estimate" }).click();
    await waitFor(() =>
      expect(
        screen.getByText(
          "Estimate updated. You can refresh again on October 18, 2026."
        )
      ).toBeInTheDocument()
    );
    expect(screen.getByRole("button", { name: "Refresh estimate" })).toBeDisabled();
  });

  // The stale-tab case: the server's floor refused the press, so nothing was
  // updated and the line must not claim otherwise.
  it("shows the server's own line without claiming an update", async () => {
    refreshMarketValueAction.mockResolvedValue({
      ok: true,
      data: {
        note: "You can refresh again on October 18, 2026.",
        nextRefreshAt: nextAt,
      },
    });
    render(<RefreshValue isPlus nextRefreshAt={null} />);
    screen.getByRole("button", { name: "Refresh estimate" }).click();
    await waitFor(() =>
      expect(
        screen.getByText("You can refresh again on October 18, 2026.")
      ).toBeInTheDocument()
    );
    expect(screen.queryByText(/Estimate updated/)).not.toBeInTheDocument();
  });

  it("shows an error instead of a date when the action refuses", async () => {
    refreshMarketValueAction.mockResolvedValue({
      ok: false,
      error: "Add your home first.",
    });
    render(<RefreshValue isPlus nextRefreshAt={null} />);
    screen.getByRole("button", { name: "Refresh estimate" }).click();
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Add your home first.")
    );
  });
});
