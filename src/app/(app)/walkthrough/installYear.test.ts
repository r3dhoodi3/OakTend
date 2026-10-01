import { describe, expect, it } from "vitest";
import { parseInstallYear } from "./installYear";

const NOW = new Date("2026-09-27T12:00:00Z");

describe("parseInstallYear", () => {
  it("keeps a 4-digit year", () => {
    expect(parseInstallYear("2015", NOW)).toBe(2015);
    expect(parseInstallYear("1885", NOW)).toBe(1885);
  });

  it("turns an age in years into a year", () => {
    expect(parseInstallYear("10", NOW)).toBe(2016);
    expect(parseInstallYear("0", NOW)).toBe(2026);
  });

  it("drops blanks, junk and out-of-range values", () => {
    expect(parseInstallYear(null, NOW)).toBeNull();
    expect(parseInstallYear("", NOW)).toBeNull();
    expect(parseInstallYear("abc", NOW)).toBeNull();
    expect(parseInstallYear("-3", NOW)).toBeNull();
    expect(parseInstallYear("500", NOW)).toBeNull();
    expect(parseInstallYear("3000", NOW)).toBeNull();
  });
});
