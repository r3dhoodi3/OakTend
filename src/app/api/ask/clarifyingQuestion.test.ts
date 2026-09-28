import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Owner feedback 2026-09-27 (item 19): when the assistant needs more info it
// asked its question AND answered other things. The prompt now says the
// question is the whole reply. Source check on both sides' prompts.
const read = (rel: string) =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

describe("clarifying question is the whole reply", () => {
  it("homeowner Ask OakTend", () => {
    expect(read("./route.ts")).toContain("that question is your WHOLE reply");
  });
  it("pro assistant", () => {
    expect(read("../pro-ask/route.ts")).toContain("that question is your WHOLE reply");
  });
});
