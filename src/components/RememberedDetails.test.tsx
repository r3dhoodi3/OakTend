// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import RememberedDetails from "./RememberedDetails";
import { COLLAPSE_MS } from "./Collapse";

// Vitest globals are off in this repo, so testing-library's auto cleanup never
// wires itself up.
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

beforeEach(() => {
  window.localStorage.clear();
});

const KEY = "oaktend_details_closed_this-month-user-1";

function renderIt(props: { forceOpen?: boolean } = {}) {
  return render(
    <RememberedDetails
      storageKey="this-month-user-1"
      testId="remembered"
      summary="See this month's tasks"
      {...props}
    >
      <p>Task list</p>
    </RememberedDetails>
  );
}

function details(): HTMLDetailsElement {
  return screen.getByTestId("remembered") as HTMLDetailsElement;
}

// Since 2026-09-21 the summary click is taken over by AnimatedDetails (so the
// close can animate), so the user's act is a click on the summary, and a close
// only takes the `open` attribute off after the slide has finished.
function clickSummary() {
  fireEvent.click(details().querySelector("summary") as HTMLElement);
}

describe("RememberedDetails", () => {
  it("is open on a first visit, with nothing in storage", () => {
    renderIt();
    expect(details().open).toBe(true);
  });

  it("remembers a close and applies it on the next visit", () => {
    vi.useFakeTimers();
    renderIt();
    // Closing it is the user's own act, which is the only thing that may make
    // it start closed later. The flag is written at the click, not after the
    // animation, so a navigation mid-slide still remembers it.
    clickSummary();
    expect(window.localStorage.getItem(KEY)).toBe("1");
    act(() => {
      vi.advanceTimersByTime(COLLAPSE_MS + 1);
    });
    expect(details().open).toBe(false);

    cleanup();
    renderIt();
    expect(details().open).toBe(false);
  });

  it("forgets the close as soon as the user opens it again", () => {
    window.localStorage.setItem(KEY, "1");
    renderIt();
    expect(details().open).toBe(false);

    clickSummary();
    expect(details().open).toBe(true);
    expect(window.localStorage.getItem(KEY)).toBeNull();

    cleanup();
    renderIt();
    expect(details().open).toBe(true);
  });

  it("forceOpen wins over a remembered close and clears it", () => {
    window.localStorage.setItem(KEY, "1");
    renderIt({ forceOpen: true });
    expect(details().open).toBe(true);
    // ?plan=open is an explicit "show me": leaving the flag would snap it shut
    // again on the very next visit, which reads as the link not working.
    expect(window.localStorage.getItem(KEY)).toBeNull();
  });

  it("keys the flag by the storageKey, so one user's close is not another's", () => {
    window.localStorage.setItem("oaktend_details_closed_this-month-user-2", "1");
    renderIt();
    expect(details().open).toBe(true);
  });

  // A browser-driven open (find-in-page landing inside closed content) fires
  // toggle without a click; it must still clear the remembered close, or the
  // next visit would shut what the user just read.
  it("clears the remembered close when the browser opens it on its own", () => {
    window.localStorage.setItem(KEY, "1");
    renderIt();
    const el = details();
    el.open = true;
    fireEvent(el, new Event("toggle", { bubbles: false }));
    expect(window.localStorage.getItem(KEY)).toBeNull();
  });
});
