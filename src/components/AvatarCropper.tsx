"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clampOffset, coverScale, cropRect } from "@/lib/avatarCrop";

// Crop and adjust step for a profile picture or pro logo. Shown after a photo
// is picked and before anything uploads: drag to move, slider (or +/-) to
// zoom, then Save. The result is a 512px square JPEG drawn on a canvas, so
// what uploads is exactly what the frame showed. No dependency: pan and zoom
// are a few lines of math in src/lib/avatarCrop.ts, which is unit tested.
const VIEW = 256; // on-screen frame, CSS px
const OUT = 512; // uploaded image, px
const MAX_ZOOM = 3;

export default function AvatarCropper({
  file,
  shape,
  onCancel,
  onConfirm,
}: {
  file: File;
  shape: "round" | "square";
  onCancel: () => void;
  onConfirm: (blob: Blob) => void;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [saving, setSaving] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const u = URL.createObjectURL(file);
    setSrc(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  const scale = natural ? coverScale(natural.w, natural.h, VIEW) * zoom : 1;

  const setClamped = useCallback(
    (x: number, y: number, s = scale) => {
      if (!natural) return;
      setOffset(clampOffset(x, y, natural.w * s, natural.h * s, VIEW));
    },
    [natural, scale]
  );

  function onZoom(next: number) {
    if (!natural) return;
    const z = Math.min(MAX_ZOOM, Math.max(1, next));
    const s = coverScale(natural.w, natural.h, VIEW) * z;
    setZoom(z);
    // Keep the same point under the frame's center while zooming.
    const ratio = s / scale;
    setClamped(offset.x * ratio, offset.y * ratio, s);
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    drag.current = { id: d.id, x: e.clientX, y: e.clientY };
    setClamped(offset.x + dx, offset.y + dy);
  }
  function onPointerUp() {
    drag.current = null;
  }
  function onKeyDown(e: React.KeyboardEvent) {
    const step = 10;
    if (e.key === "ArrowLeft") setClamped(offset.x + step, offset.y);
    else if (e.key === "ArrowRight") setClamped(offset.x - step, offset.y);
    else if (e.key === "ArrowUp") setClamped(offset.x, offset.y + step);
    else if (e.key === "ArrowDown") setClamped(offset.x, offset.y - step);
    else return;
    e.preventDefault();
  }

  async function save() {
    const img = imgRef.current;
    if (!img || !natural) return;
    setSaving(true);
    const r = cropRect(natural.w, natural.h, scale, offset, VIEW);
    const canvas = document.createElement("canvas");
    canvas.width = OUT;
    canvas.height = OUT;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setSaving(false);
      return;
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, OUT, OUT);
    ctx.drawImage(img, r.sx, r.sy, r.sw, r.sh, 0, 0, OUT, OUT);
    canvas.toBlob(
      (blob) => {
        setSaving(false);
        if (blob) onConfirm(blob);
      },
      "image/jpeg",
      0.9
    );
  }

  const imgW = natural ? natural.w * scale : VIEW;
  const imgH = natural ? natural.h * scale : VIEW;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Adjust your photo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-pop dark:bg-stone-900">
        <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
          Adjust your photo
        </h2>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
          Drag to move. Use the slider to zoom.
        </p>

        <div
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label="Photo position. Use arrow keys to move."
          className={`relative mx-auto mt-4 touch-none select-none overflow-hidden bg-stone-100 outline-none focus-visible:ring-2 focus-visible:ring-bark-600 dark:bg-stone-800 ${
            shape === "round" ? "rounded-full" : "rounded-2xl"
          }`}
          style={{ width: VIEW, height: VIEW, cursor: "grab" }}
        >
          {src && (
            // eslint-disable-next-line @next/next/no-img-element -- a local blob: URL being cropped, not a hosted image
            <img
              ref={imgRef}
              src={src}
              alt=""
              draggable={false}
              onLoad={(e) =>
                setNatural({
                  w: e.currentTarget.naturalWidth,
                  h: e.currentTarget.naturalHeight,
                })
              }
              className="pointer-events-none absolute max-w-none"
              style={{
                width: imgW,
                height: imgH,
                left: (VIEW - imgW) / 2 + offset.x,
                top: (VIEW - imgH) / 2 + offset.y,
              }}
            />
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onZoom(zoom - 0.2)}
            className="btn-secondary h-9 w-9 p-0"
            aria-label="Zoom out"
          >
            -
          </button>
          <input
            type="range"
            min={1}
            max={MAX_ZOOM}
            step={0.01}
            value={zoom}
            onChange={(e) => onZoom(Number(e.target.value))}
            aria-label="Zoom"
            className="flex-1 accent-bark-700"
          />
          <button
            type="button"
            onClick={() => onZoom(zoom + 0.2)}
            className="btn-secondary h-9 w-9 p-0"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>

        <div className="mt-5 flex gap-2">
          <button type="button" onClick={onCancel} className="btn-secondary flex-1">
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!natural || saving}
            className="btn-primary flex-1"
          >
            {saving ? "Saving..." : "Save photo"}
          </button>
        </div>
      </div>
    </div>
  );
}
