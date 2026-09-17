// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CategoryFilter from "./CategoryFilter";
import { DraftJobProvider } from "./DraftJobContext";

// Vitest globals are off in this repo, so testing-library's auto-cleanup never
// wires itself up (see dashboardShape.test.tsx for the same note).
afterEach(() => cleanup());

const box = () => screen.getByRole("combobox") as HTMLInputElement;
const hidden = () =>
  document.querySelector('input[name="category"]') as HTMLInputElement;

describe("CategoryFilter", () => {
  // Regression test: a project chip on /contractors sets ?category=x on the
  // SAME route. That re-renders the server page with a new `category` prop,
  // but a searchParams-only navigation does not remount this component or its
  // DraftJobProvider - React reuses both. Before this fix the URL updated and
  // the chip highlighted itself while the box underneath silently kept
  // showing its placeholder.
  it("fills the box when the category prop changes without a remount (DraftJobProvider)", () => {
    const { rerender } = render(
      <DraftJobProvider initialCategory="">
        <CategoryFilter category="" id="job-category" />
      </DraftJobProvider>
    );
    expect(box().value).toBe("");

    // Simulate the chip's navigation: the parent server component re-renders
    // with the new `category` search param, same component instance.
    rerender(
      <DraftJobProvider initialCategory="plumbing">
        <CategoryFilter category="plumbing" id="job-category" />
      </DraftJobProvider>
    );

    // The closed box reads the selected option's label...
    expect(box().value).toBe("Plumbing");
    // ...while the hidden field postJobAction actually reads keeps the
    // canonical category.
    expect(hidden().value).toBe("plumbing");
  });

  it("never overwrites a category the owner already picked themselves", () => {
    const { rerender } = render(
      <DraftJobProvider initialCategory="">
        <CategoryFilter category="" id="job-category" />
      </DraftJobProvider>
    );
    fireEvent.focus(box());
    fireEvent.click(screen.getByRole("option", { name: "Electrical" }));
    expect(box().value).toBe("Electrical");
    expect(hidden().value).toBe("electrical");

    // A chip navigation landing after the owner has already chosen something
    // themselves must not stomp on their pick.
    rerender(
      <DraftJobProvider initialCategory="plumbing">
        <CategoryFilter category="plumbing" id="job-category" />
      </DraftJobProvider>
    );

    expect(box().value).toBe("Electrical");
    expect(hidden().value).toBe("electrical");
  });

  it("fills the box without a DraftJobProvider too (standalone use, e.g. EditJobForm)", () => {
    const { rerender } = render(
      <CategoryFilter category="" id="job-category" />
    );
    expect(box().value).toBe("");

    rerender(<CategoryFilter category="roof" id="job-category" />);
    expect(box().value).toBe("Roof");
    expect(hidden().value).toBe("roof");
  });

  it("stays shut until focused, then lists both groups", () => {
    render(<CategoryFilter category="" id="job-category" />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(box()).toHaveAttribute("aria-expanded", "false");

    fireEvent.focus(box());

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(box()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Popular projects")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Plumbing" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Water heater" })
    ).toBeInTheDocument();
  });

  it("filters the open list by what is typed", () => {
    render(<CategoryFilter category="" id="job-category" />);
    fireEvent.change(box(), { target: { value: "water" } });

    expect(screen.getByRole("option", { name: "Water heater" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Plumbing" })).not.toBeInTheDocument();
    expect(screen.queryByText("Services")).not.toBeInTheDocument();
  });

  it("picks the highlighted option with the keyboard without submitting the form", () => {
    render(
      <DraftJobProvider initialCategory="">
        <CategoryFilter category="" id="job-category" />
      </DraftJobProvider>
    );
    fireEvent.focus(box());
    // Nothing chosen yet, so the first row starts highlighted; one step down
    // lands on the second service.
    fireEvent.keyDown(box(), { key: "ArrowDown" });
    fireEvent.keyDown(box(), { key: "Enter" });

    expect(box().value).toBe("Plumbing");
    expect(hidden().value).toBe("plumbing");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("maps a project option to its matchable contractor category", () => {
    render(
      <DraftJobProvider initialCategory="">
        <CategoryFilter category="" id="job-category" />
      </DraftJobProvider>
    );
    fireEvent.change(box(), { target: { value: "water heater" } });
    fireEvent.click(screen.getByRole("option", { name: "Water heater" }));

    expect(box().value).toBe("Water heater");
    // The server only ever sees the plain category.
    expect(hidden().value).toBe("plumbing");
  });

  it("offers Other (and says so) when nothing matches what was typed", () => {
    render(<CategoryFilter category="" id="job-category" />);
    fireEvent.change(box(), { target: { value: "chimney" } });

    expect(
      screen.getByText("No match. Choose Other to describe it.")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: "Other (describe it)" }));

    expect(hidden().value).toBe("other");
    // The inline free-text box is what actually matches them to a pro.
    expect(screen.getByLabelText("What service do you need?")).toBeInTheDocument();
  });

  it("restores the selected label when closed without a pick", () => {
    render(<CategoryFilter category="roof" id="job-category" />);
    fireEvent.focus(box());
    // Focusing clears the box to search; a half-typed query must not linger
    // looking like the answer.
    fireEvent.change(box(), { target: { value: "chim" } });
    fireEvent.keyDown(box(), { key: "Escape" });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(box().value).toBe("Roof");
    expect(hidden().value).toBe("roof");
  });

  it("closes on a tap outside", () => {
    render(<CategoryFilter category="" id="job-category" />);
    fireEvent.focus(box());
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.pointerDown(document.body);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("blocks submission until a job type is chosen", () => {
    render(<CategoryFilter category="" id="job-category" />);
    expect(box().validationMessage).toBe("Choose a job type from the list");

    fireEvent.focus(box());
    fireEvent.click(screen.getByRole("option", { name: "Roof" }));

    expect(box().validationMessage).toBe("");
  });
});
