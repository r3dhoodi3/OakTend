// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import SelectMenu from "./SelectMenu";

// Vitest globals are off in this repo, so testing-library's auto-cleanup never
// wires itself up (see CategoryFilter.test.tsx for the same note).
afterEach(() => cleanup());

const OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "few_weeks", label: "Next few weeks" },
  { value: "flexible", label: "Flexible" },
];

const trigger = () => screen.getByRole("button");
const hidden = (name: string) =>
  document.querySelector(`select[name="${name}"]`) as HTMLSelectElement;

describe("SelectMenu", () => {
  it("shows the placeholder until something is picked", () => {
    render(<SelectMenu name="timing" options={OPTIONS} placeholder="Pick one" />);

    expect(trigger()).toHaveTextContent("Pick one");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(hidden("timing").value).toBe("");
  });

  it("falls back to the first option when there is no placeholder, like a native select", () => {
    render(<SelectMenu name="timing" options={OPTIONS} />);

    expect(trigger()).toHaveTextContent("As soon as possible");
    expect(hidden("timing").value).toBe("asap");
  });

  it("opens on click and lists every option, with group headings", () => {
    render(
      <SelectMenu
        name="cat"
        options={[
          { label: "Services", options: [{ value: "roof", label: "Roof" }] },
          { label: "Projects", options: [{ value: "reno", label: "Kitchen reno" }] },
        ]}
      />
    );

    fireEvent.click(trigger());

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Roof" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Kitchen reno" })).toBeInTheDocument();
  });

  it("picks on click: hidden select updates, change bubbles to the form, onChange fires", () => {
    const onChange = vi.fn();
    const formChange = vi.fn();
    render(
      <form onChange={formChange}>
        <SelectMenu
          name="timing"
          options={OPTIONS}
          placeholder="Pick one"
          onChange={onChange}
        />
      </form>
    );

    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("option", { name: "Flexible" }));

    expect(trigger()).toHaveTextContent("Flexible");
    expect(hidden("timing").value).toBe("flexible");
    expect(onChange).toHaveBeenCalledWith("flexible");
    // PhotoTips and the auto-submitting status forms listen for this.
    expect(formChange).toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("picks with the keyboard (ArrowDown then Enter)", () => {
    render(<SelectMenu name="timing" options={OPTIONS} />);

    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    // Opens on the selected row ("asap"); one step down is "few_weeks".
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    fireEvent.keyDown(trigger(), { key: "Enter" });

    expect(trigger()).toHaveTextContent("Next few weeks");
    expect(hidden("timing").value).toBe("few_weeks");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("Escape closes without changing the value", () => {
    render(<SelectMenu name="timing" options={OPTIONS} defaultValue="flexible" />);

    fireEvent.click(trigger());
    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    fireEvent.keyDown(trigger(), { key: "Escape" });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger()).toHaveTextContent("Flexible");
    expect(hidden("timing").value).toBe("flexible");
  });

  it("keeps the solid highlight on the chosen row when reopened", () => {
    render(<SelectMenu name="timing" options={OPTIONS} placeholder="Pick one" />);

    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("option", { name: "Flexible" }));
    fireEvent.click(trigger());

    expect(screen.getByRole("option", { name: "Flexible" }).className).toContain(
      "bg-bark-100"
    );
    expect(screen.getByRole("option", { name: "Flexible" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("closes on a tap outside", () => {
    render(<SelectMenu name="timing" options={OPTIONS} />);
    fireEvent.click(trigger());
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.pointerDown(document.body);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("required + empty: shows our own message and puts focus on the trigger", () => {
    render(
      <form>
        <SelectMenu name="timing" options={OPTIONS} placeholder="Pick one" required />
      </form>
    );

    // The browser can't draw a bubble on a clipped select, so we say it here.
    fireEvent.invalid(hidden("timing"));

    expect(screen.getByText("Choose one.")).toBeInTheDocument();
    expect(trigger().className).toContain("border-red-500");
    expect(document.activeElement).toBe(trigger());

    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("option", { name: "Flexible" }));
    expect(screen.queryByText("Choose one.")).not.toBeInTheDocument();
  });

  it("controlled: the selection follows `value`, not the click", () => {
    function Harness() {
      const [v, setV] = useState("asap");
      return (
        <>
          <SelectMenu name="timing" options={OPTIONS} value={v} onChange={setV} />
          <button type="button" onClick={() => setV("flexible")}>
            outside
          </button>
        </>
      );
    }
    render(<Harness />);
    const box = () => screen.getAllByRole("button")[0];

    expect(box()).toHaveTextContent("As soon as possible");
    fireEvent.click(screen.getByText("outside"));
    expect(box()).toHaveTextContent("Flexible");

    fireEvent.click(box());
    fireEvent.click(screen.getByRole("option", { name: "Next few weeks" }));
    expect(box()).toHaveTextContent("Next few weeks");
  });

  it("controlled: ignores a pick the parent refuses", () => {
    render(<SelectMenu name="timing" options={OPTIONS} value="asap" />);

    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("option", { name: "Flexible" }));

    expect(trigger()).toHaveTextContent("As soon as possible");
  });

  it("disabled does not open", () => {
    render(<SelectMenu name="timing" options={OPTIONS} disabled />);

    fireEvent.click(trigger());

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(hidden("timing").disabled).toBe(true);
  });

  it("skips disabled options with the keyboard and on click", () => {
    render(
      <SelectMenu
        name="timing"
        options={[
          { value: "asap", label: "As soon as possible" },
          { value: "gone", label: "Not available", disabled: true },
          { value: "flexible", label: "Flexible" },
        ]}
      />
    );

    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("option", { name: "Not available" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(trigger(), { key: "ArrowDown" });
    fireEvent.keyDown(trigger(), { key: "Enter" });
    expect(trigger()).toHaveTextContent("Flexible");
  });

  it("a form reset restores the default", () => {
    render(
      <form>
        <SelectMenu name="timing" options={OPTIONS} defaultValue="asap" />
      </form>
    );

    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("option", { name: "Flexible" }));
    expect(hidden("timing").value).toBe("flexible");

    fireEvent.reset(hidden("timing").form as HTMLFormElement);

    expect(trigger()).toHaveTextContent("As soon as possible");
    expect(hidden("timing").value).toBe("asap");
  });

  it("labels focus the trigger through its id", () => {
    render(
      <>
        <label htmlFor="job-timing">Preferred timing</label>
        <SelectMenu id="job-timing" name="timing" options={OPTIONS} />
      </>
    );

    expect(screen.getByLabelText("Preferred timing")).toBe(trigger());
  });
});
