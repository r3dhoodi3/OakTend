import { describe, expect, it } from "vitest";
import { clampOffset, coverScale, cropRect } from "./avatarCrop";

describe("avatar crop math", () => {
  it("cover scale fills the frame on the short side", () => {
    expect(coverScale(1000, 500, 256)).toBeCloseTo(0.512);
    expect(coverScale(500, 1000, 256)).toBeCloseTo(0.512);
  });
  it("clamps panning so the frame stays covered", () => {
    // 512 x 256 displayed in a 256 frame: 128 px of slack left and right only.
    expect(clampOffset(500, 50, 512, 256, 256)).toEqual({ x: 128, y: 0 });
    expect(clampOffset(-500, -50, 512, 256, 256)).toMatchObject({ x: -128 });
  });
  it("centered crop of a wide image takes the middle square", () => {
    const s = coverScale(1000, 500, 256);
    const r = cropRect(1000, 500, s, { x: 0, y: 0 }, 256);
    expect(r.sw).toBeCloseTo(500);
    expect(r.sx).toBeCloseTo(250);
    expect(r.sy).toBeCloseTo(0);
  });
  it("panned fully left shows the left edge", () => {
    const s = coverScale(1000, 500, 256);
    const r = cropRect(1000, 500, s, { x: 128, y: 0 }, 256);
    expect(r.sx).toBeCloseTo(0);
  });
});
