// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import PasswordInput from "./PasswordInput";

afterEach(() => cleanup());

describe("PasswordInput", () => {
  it("starts hidden and the eye reveals and re-hides what was typed", () => {
    render(<PasswordInput id="pw" defaultValue="hunter2" />);
    const input = document.getElementById("pw") as HTMLInputElement;
    expect(input.type).toBe("password");

    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(input.type).toBe("text");
    expect(input.value).toBe("hunter2");

    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input.type).toBe("password");
  });

  it("passes the input attributes through and keeps room for the eye", () => {
    render(
      <PasswordInput
        name="new_password"
        autoComplete="new-password"
        className="pl-9"
        minLength={8}
        required
      />
    );
    const input = document.querySelector('input[name="new_password"]') as HTMLInputElement;
    expect(input.autocomplete).toBe("new-password");
    expect(input.minLength).toBe(8);
    expect(input.required).toBe(true);
    expect(input.className).toContain("pr-10");
    expect(input.className).toContain("pl-9");
  });

  // Two boxes on one form (new + confirm, or current + new): revealing one
  // must not reveal the other.
  it("keeps each box's shown state to itself", () => {
    render(
      <>
        <PasswordInput id="a" />
        <PasswordInput id="b" />
      </>
    );
    fireEvent.click(screen.getAllByRole("button", { name: "Show password" })[0]);
    expect((document.getElementById("a") as HTMLInputElement).type).toBe("text");
    expect((document.getElementById("b") as HTMLInputElement).type).toBe("password");
  });
});
