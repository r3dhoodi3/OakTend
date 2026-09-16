import { describe, it, expect } from "vitest";
import {
  freeLockText,
  isFreeLocked,
  meterLabel,
  previewLockText,
  previewMeterLabel,
  shouldShowMeter,
} from "@/lib/askLimits";

describe("shouldShowMeter", () => {
  it("shows for a free homeowner from the first reply on", () => {
    expect(shouldShowMeter(2, 3)).toBe(true);
    expect(shouldShowMeter(1, 3)).toBe(true);
  });

  it("stays hidden when the server sent no allowance (member, pro copilot)", () => {
    expect(shouldShowMeter(null, null)).toBe(false);
    expect(shouldShowMeter(2, null)).toBe(false);
    expect(shouldShowMeter(null, 3)).toBe(false);
    expect(shouldShowMeter(undefined, undefined)).toBe(false);
  });

  it("stands down at zero, where the locked bar takes over", () => {
    expect(shouldShowMeter(0, 3)).toBe(false);
    expect(shouldShowMeter(-1, 3)).toBe(false);
  });

  it("still renders against a larger limit", () => {
    expect(shouldShowMeter(24, 25)).toBe(true);
    expect(shouldShowMeter(14, 15)).toBe(true);
  });
});

describe("isFreeLocked", () => {
  it("is true only once a known allowance is spent", () => {
    expect(isFreeLocked(0, 3)).toBe(true);
    expect(isFreeLocked(1, 3)).toBe(false);
    expect(isFreeLocked(null, null)).toBe(false);
    expect(isFreeLocked(0, null)).toBe(false);
  });
});

describe("meterLabel", () => {
  it("reads as a sentence", () => {
    expect(meterLabel(2, 3)).toBe("2 of 3 free questions left today");
    expect(meterLabel(1, 1)).toBe("1 of 1 free question left today");
  });
});

describe("freeLockText", () => {
  it("names the limit when it knows it", () => {
    expect(freeLockText(3)).toContain("3 free questions");
    expect(freeLockText(null)).toContain("free questions");
  });
});

// PREVIEW MODE (2026-09-15): the same shapes, worded for a cap that applies
// to everyone alike, never "free questions".
describe("previewMeterLabel", () => {
  it("reads as a sentence with no mention of 'free'", () => {
    expect(previewMeterLabel(2, 15)).toBe("2 of 15 questions today");
    expect(previewMeterLabel(1, 1)).toBe("1 of 1 question today");
  });
});

describe("previewLockText", () => {
  it("names the limit without calling the questions free", () => {
    expect(previewLockText(15)).toBe(
      "That's your 15 questions for today. They reset tomorrow."
    );
    expect(previewLockText(15)).not.toContain("free");
    expect(previewLockText(null)).toContain("questions");
    expect(previewLockText(null)).not.toContain("free");
  });
});
