// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// applyToJobAction pulls in the service-role Supabase client at module scope,
// which cannot be imported in a test process (same reasoning as
// src/app/pro/leads/LeadsBoard.test.tsx's stub of the same component's real
// neighbors). The button never actually submits in these tests, so the mock
// is never called.
vi.mock("./actions", () => ({ applyToJobAction: vi.fn() }));

import ApplyJobButton from "./ApplyJobButton";

afterEach(() => cleanup());

// This file used to pin the confirm step's PRICE line against
// bestLeadDiscount - the struck-through base, the "with Pro" suffix, the Pro
// chip, the aging markdown and the "Pro members pay $X" nudge. Applying is
// free as of migration 0172, so all of that is gone and what is worth pinning
// inverted: that no price, no discount and no route to a deposit page can come
// back by accident.
function bodyHas(text: string): boolean {
  return document.body.textContent?.includes(text) ?? false;
}

describe("ApplyJobButton: applying is free", () => {
  it("offers a bare Apply button, with no price on it", () => {
    render(<ApplyJobButton leadId="lead-1" category="Plumbing" />);
    const button = screen.getByRole("button", { name: "Apply" });
    expect(button).toBeInTheDocument();
    expect(button.textContent).not.toMatch(/\$/);
  });

  it("never renders a dollar amount, a discount, or a way to add funds", () => {
    render(<ApplyJobButton leadId="lead-1" category="Plumbing" />);
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));

    // The whole confirm card, not just the button: the fee sentence, the
    // credit-back promise and the intro-price note all lived down here.
    expect(document.body.textContent).not.toMatch(/\$/);
    expect(bodyHas("wallet")).toBe(false);
    expect(bodyHas("Add funds")).toBe(false);
    expect(bodyHas("lead fee")).toBe(false);
    expect(document.querySelector('a[href*="/pro/billing"]')).toBeNull();
  });

  it("still asks for confirmation, because the note is the point now", () => {
    render(<ApplyJobButton leadId="lead-1" category="Plumbing" />);
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));

    // A message box to write to the homeowner, and a send button - the confirm
    // step survives as a composer, not as a payment gate.
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send application/ })
    ).toBeInTheDocument();
  });

  it("posts no fee_cents, since there is no price for the action to check", () => {
    const { container } = render(
      <ApplyJobButton leadId="lead-1" category="Plumbing" />
    );
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(container.querySelector('input[name="fee_cents"]')).toBeNull();
    // The lead id still rides along - that is what the action applies to.
    expect(container.querySelector('input[name="id"]')).toHaveValue("lead-1");
  });
});
