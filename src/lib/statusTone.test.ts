import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { STATUS_CARD_TONE, STATUS_TONE } from "@/lib/statusTone";
import { scoreBand } from "@/lib/health";
import { SEVERITY_STYLE } from "@/lib/proLeadCard";

const globalsCss = readFileSync(
  fileURLToPath(new URL("../app/globals.css", import.meta.url)),
  "utf8"
);

// The utilities inside one .chip-* @apply block, as a sorted list.
function chipUtilities(name: string): string[] {
  const start = globalsCss.indexOf(`.${name} {`);
  expect(start).toBeGreaterThan(-1);
  const body = globalsCss.slice(start, globalsCss.indexOf(";", start));
  return body
    .replace(`.${name} {`, "")
    .replace("@apply", "")
    .split(/\s+/)
    // "chip" and the bare "border" width live on the call site, not the tone.
    .filter((u) => u && u !== "chip" && u !== "border")
    .sort();
}

describe("status tones: green = good, red = bad, light and dark", () => {
  it("STATUS_TONE matches the .chip-* classes exactly", () => {
    const pairs: [keyof typeof STATUS_TONE, string][] = [
      ["ok", "chip-ok"],
      ["warn", "chip-warn"],
      ["danger", "chip-danger"],
    ];
    for (const [tone, cls] of pairs) {
      expect(STATUS_TONE[tone].split(" ").sort()).toEqual(chipUtilities(cls));
    }
  });

  it("good tones are green and bad tones are red in both themes", () => {
    for (const u of STATUS_TONE.ok.split(" ")) expect(u).toMatch(/green/);
    for (const u of STATUS_TONE.danger.split(" ")) expect(u).toMatch(/red/);
    for (const u of STATUS_CARD_TONE.ok.split(" ")) expect(u).toMatch(/green/);
    for (const u of STATUS_CARD_TONE.danger.split(" ")) expect(u).toMatch(/red/);
  });

  it("scoreBand is green for the healthy bands and red for the rest", () => {
    expect(scoreBand(95).tone).toBe(STATUS_CARD_TONE.ok);
    expect(scoreBand(70).tone).toBe(STATUS_CARD_TONE.ok);
    expect(scoreBand(50).tone).toBe(STATUS_CARD_TONE.danger);
    expect(scoreBand(10).tone).toBe(STATUS_CARD_TONE.danger);
    for (const s of [95, 70, 50, 10]) {
      expect(scoreBand(s).tone).not.toMatch(/bark|amber/);
    }
  });

  it("pro lead severity: urgent is red, low is neutral", () => {
    expect(SEVERITY_STYLE.urgent).toBe(STATUS_TONE.danger);
    expect(SEVERITY_STYLE.low).toBe(STATUS_TONE.muted);
  });
});
