// Pan and zoom math for AvatarCropper. Pure so it can be unit tested.
//
// The image is drawn centered in a square frame of `view` px, scaled by
// `scale`, then shifted by `offset`. The frame must always be fully covered.

// Smallest scale at which the image covers the whole frame.
export function coverScale(w: number, h: number, view: number): number {
  if (w <= 0 || h <= 0) return 1;
  return Math.max(view / w, view / h);
}

// Keep the scaled image (dispW x dispH) covering the frame.
export function clampOffset(
  x: number,
  y: number,
  dispW: number,
  dispH: number,
  view: number
): { x: number; y: number } {
  const maxX = Math.max(0, (dispW - view) / 2);
  const maxY = Math.max(0, (dispH - view) / 2);
  return {
    x: Math.min(maxX, Math.max(-maxX, x)),
    y: Math.min(maxY, Math.max(-maxY, y)),
  };
}

// The source rectangle (in the image's own pixels) the frame is showing.
export function cropRect(
  w: number,
  h: number,
  scale: number,
  offset: { x: number; y: number },
  view: number
): { sx: number; sy: number; sw: number; sh: number } {
  const dispW = w * scale;
  const dispH = h * scale;
  const left = (view - dispW) / 2 + offset.x; // image left edge in frame px
  const top = (view - dispH) / 2 + offset.y;
  const sw = view / scale;
  const sh = view / scale;
  const sx = Math.min(Math.max(0, -left / scale), Math.max(0, w - sw));
  const sy = Math.min(Math.max(0, -top / scale), Math.max(0, h - sh));
  return { sx, sy, sw, sh };
}
