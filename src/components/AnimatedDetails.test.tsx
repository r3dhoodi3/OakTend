// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import AnimatedDetails from "./AnimatedDetails";
import Collapse, { COLLAPSE_MS } from "./Collapse";

// Vitest globals are off in this repo, so RTL's auto-cleanup never registers.
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("AnimatedDetails", () => {
  it("stays a real details/summary, open by default when asked", () => {
    const { container } = render(
      <AnimatedDetails id="systems" defaultOpen summary="Your systems">
        <p>rows</p>
      </AnimatedDetails>
    );
    const details = container.querySelector("details#systems");
    expect(details).toHaveAttribute("open");
    expect(details).toHaveAttribute("data-shown", "true");
    expect(container.querySelector("#systems > summary")).toHaveTextContent(
      "Your systems"
    );
  });

  it("closes the content first and the details only after the animation", () => {
    vi.useFakeTimers();
    const { container } = render(
      <AnimatedDetails defaultOpen summary="Your systems">
        <p>rows</p>
      </AnimatedDetails>
    );
    const details = container.querySelector("details")!;

    fireEvent.click(screen.getByText("Your systems"));
    // Mid-close: the state has flipped (the chevron follows it) but the
    // content is still in the page to animate out.
    expect(details).toHaveAttribute("data-shown", "false");
    expect(details).toHaveAttribute("open");

    act(() => {
      vi.advanceTimersByTime(COLLAPSE_MS);
    });
    expect(details).not.toHaveAttribute("open");
  });

  it("reopens at once, and a fast second click cancels the pending close", () => {
    vi.useFakeTimers();
    const { container } = render(
      <AnimatedDetails defaultOpen summary="Your systems">
        <p>rows</p>
      </AnimatedDetails>
    );
    const details = container.querySelector("details")!;
    const summary = screen.getByText("Your systems");

    fireEvent.click(summary);
    fireEvent.click(summary);
    act(() => {
      vi.advanceTimersByTime(COLLAPSE_MS * 2);
    });
    expect(details).toHaveAttribute("open");
    expect(details).toHaveAttribute("data-shown", "true");
  });
});

describe("Collapse", () => {
  it("lazy: renders nothing until the first open, then keeps it mounted", () => {
    const { rerender } = render(
      <Collapse open={false} lazy>
        <p>detail</p>
      </Collapse>
    );
    expect(screen.queryByText("detail")).toBeNull();

    rerender(
      <Collapse open lazy>
        <p>detail</p>
      </Collapse>
    );
    expect(screen.getByText("detail")).toBeInTheDocument();

    rerender(
      <Collapse open={false} lazy>
        <p>detail</p>
      </Collapse>
    );
    expect(screen.getByText("detail")).toBeInTheDocument();
  });

  it("hides closed content from the tab order and screen readers", () => {
    const { container } = render(
      <Collapse open={false}>
        <button type="button">Edit</button>
      </Collapse>
    );
    expect(container.firstChild).toHaveStyle({ visibility: "hidden" });
  });
});
