// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { HomeSystem } from "@/lib/database.types";

vi.mock("./actions", () => ({
  confirmSystemAction: vi.fn(async () => ({ ok: true, before: 60, after: 64 })),
}));

import WalkthroughList from "./WalkthroughList";

// jsdom has no matchMedia; TakePhotoButton asks it whether this is a phone.
window.matchMedia = ((q: string) => ({
  matches: false,
  media: q,
  addEventListener() {},
  removeEventListener() {},
})) as unknown as typeof window.matchMedia;

afterEach(() => cleanup());

const sys = (id: string, system_type: string): HomeSystem =>
  ({
    id,
    system_type,
    property_id: "p1",
    confirmed_at: null,
    install_year: null,
    condition_rating: null,
    material_or_model: null,
    notes: null,
  }) as unknown as HomeSystem;

const systems = [sys("a", "water_heater"), sys("b", "hvac")];

// Owner feedback 2026-09-27 (item 16): "Type it in instead" changed nothing,
// because the cards only read the mode when they first mounted.
describe("WalkthroughList photo or typing toggle", () => {
  it("switches every card to text boxes and back", () => {
    render(<WalkthroughList systems={systems} initialManual={false} />);
    expect(screen.queryAllByLabelText("Brand")).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: "Type it in instead" }));
    expect(screen.getAllByLabelText("Brand")).toHaveLength(2);
    expect(screen.getAllByLabelText("Model number")).toHaveLength(2);
    expect(screen.getAllByLabelText("Install year or age")).toHaveLength(2);
    expect(screen.getAllByLabelText("Notes")).toHaveLength(2);
    // The cursor lands in the first card's first box.
    expect(document.activeElement).toBe(screen.getAllByLabelText("Brand")[0]);

    fireEvent.click(screen.getByRole("button", { name: "Take photos" }));
    expect(screen.queryAllByLabelText("Brand")).toHaveLength(0);
    expect(screen.getAllByText("Add a photo of the label")).toHaveLength(2);
  });

  it("opens straight on text boxes from ?mode=manual", () => {
    render(<WalkthroughList systems={systems} initialManual />);
    expect(screen.getAllByLabelText("Brand")).toHaveLength(2);
    // Typed details are not an AI read, so no AI notice.
    expect(screen.queryByText(/AI-generated/)).toBeNull();
  });

  it("per-card Type it in switches that card and a way back exists", () => {
    render(<WalkthroughList systems={systems} initialManual={false} />);
    fireEvent.click(screen.getAllByRole("button", { name: "Type it in" })[1]);
    expect(screen.getAllByLabelText("Brand")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Use a photo instead" }));
    expect(screen.queryAllByLabelText("Brand")).toHaveLength(0);
  });

  it("shows what makes a good photo", () => {
    render(<WalkthroughList systems={systems} initialManual={false} />);
    expect(
      screen.getAllByText(/rating label with model and serial/)
    ).toHaveLength(2);
  });
});
