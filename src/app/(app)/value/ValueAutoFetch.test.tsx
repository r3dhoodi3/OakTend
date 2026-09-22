// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, waitFor } from "@testing-library/react";

// ./actions is a "use server" file; the component only needs its one export.
const fetchAndSaveMarketValueAction = vi.fn();
vi.mock("./actions", () => ({
  fetchAndSaveMarketValueAction: () => fetchAndSaveMarketValueAction(),
}));
const refresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

import ValueAutoFetch from "./ValueAutoFetch";

const FLAG = "oaktend_avm_tried_p1";

beforeEach(() => {
  fetchAndSaveMarketValueAction.mockReset();
  refresh.mockReset();
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

// The once-per-browser flag is set on a real ANSWER, never on a failed
// attempt. It used to be set before the call, so a home whose first attempt
// failed (no key, a timeout, an outage) never got a value in that browser.
describe("ValueAutoFetch once-per-browser flag", () => {
  it("marks the home tried after a hit, and refreshes the page", async () => {
    fetchAndSaveMarketValueAction.mockResolvedValue({ ok: true, marketValue: 890_000 });
    render(<ValueAutoFetch needsFetch propertyId="p1" silent />);
    await waitFor(() => expect(window.localStorage.getItem(FLAG)).toBe("1"));
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("marks the home tried after a real miss, so a reopen does not re-ask", async () => {
    fetchAndSaveMarketValueAction.mockResolvedValue({ ok: false, reason: "miss" });
    render(<ValueAutoFetch needsFetch propertyId="p1" silent />);
    await waitFor(() => expect(window.localStorage.getItem(FLAG)).toBe("1"));
    expect(refresh).not.toHaveBeenCalled();
  });

  it("leaves the flag unset when the lookup could not be made, so the next visit tries again", async () => {
    fetchAndSaveMarketValueAction.mockResolvedValue({ ok: false, reason: "unavailable" });
    render(<ValueAutoFetch needsFetch propertyId="p1" silent />);
    await waitFor(() => expect(fetchAndSaveMarketValueAction).toHaveBeenCalledTimes(1));
    // Give the promise chain a turn to settle before asserting the negative.
    await new Promise((r) => setTimeout(r, 0));
    expect(window.localStorage.getItem(FLAG)).toBeNull();
    expect(refresh).not.toHaveBeenCalled();
  });

  it("does not ask at all once the flag is set", async () => {
    window.localStorage.setItem(FLAG, "1");
    render(<ValueAutoFetch needsFetch propertyId="p1" silent />);
    await new Promise((r) => setTimeout(r, 0));
    expect(fetchAndSaveMarketValueAction).not.toHaveBeenCalled();
  });

  it("does nothing when the home already has a value", async () => {
    render(<ValueAutoFetch needsFetch={false} propertyId="p1" silent />);
    await new Promise((r) => setTimeout(r, 0));
    expect(fetchAndSaveMarketValueAction).not.toHaveBeenCalled();
  });
});
