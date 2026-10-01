"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronRight } from "lucide-react";
import { confirmSystemAction } from "./actions";
import { labelFor, SYSTEM_TYPES, systemFieldExample } from "@/lib/constants";
import TakePhotoButton from "@/components/TakePhotoButton";
import Lightbox from "@/components/Lightbox";
import AiNotice from "@/components/AiNotice";
import SelectMenu from "@/components/SelectMenu";
import AnimatedDetails from "@/components/AnimatedDetails";
import ProgressBar, { useStagedProgress } from "@/components/ProgressBar";
import type { HomeSystem } from "@/lib/database.types";
import { fetchWithTimeout, isTimeoutError } from "@/lib/fetchWithTimeout";

// What /api/confirm-system does with the photo: read the data plate, then pull
// the brand, model, and year off it into the editable suggestion.
const READ_STAGES = ["Reading the label", "Pulling out brand, model and year"];

// What a useful photo looks like, said once on the photo tile. Short on
// purpose: the owner is standing in front of the system with a phone.
export const PHOTO_TIPS =
  "Good photos: the rating label with model and serial, the brand name, or the material.";

type Suggestion = {
  brand: string | null;
  model: string | null;
  serial: string | null;
  install_year: number | null;
};

const BLANK_SUGGESTION: Suggestion = {
  brand: null,
  model: null,
  serial: null,
  install_year: null,
};

// Read a File into base64 (no data: prefix). The fallback when the browser
// cannot decode the photo for downscaling (a HEIC on some desktops).
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = String(reader.result || "");
      resolve(res.includes(",") ? res.split(",")[1] : res);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Shrink the photo before it is sent. A phone photo is 3 to 10MB, and pushing
// that over a cell connection was most of the wait on "Reading the label".
// 1568px on the long edge is the most the vision model looks at anyway, so
// nothing readable is lost, and 0.85 JPEG keeps small label print sharp.
function downscale(file: File): Promise<{ data: string; mime: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const maxDim = 1568;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const scale = maxDim / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas context"));
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      resolve({ mime: "image/jpeg", data: dataUrl.split(",")[1] ?? "" });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("decode failed"));
    };
    img.src = url;
  });
}

async function encodePhoto(file: File): Promise<{ data: string; mime: string }> {
  try {
    const out = await downscale(file);
    if (out.data) return out;
  } catch {
    // Fall through to the original file.
  }
  return { data: await toBase64(file), mime: file.type || "image/jpeg" };
}

// Plain, honest readout of the score change. A data plate can show a system is
// older than the onboarding estimate guessed, so the score can go down too.
function scoreMessage(before: number, after: number): string {
  if (after > before) return `Home Health Score: ${before} to ${after}.`;
  if (after < before)
    return `Home Health Score: ${before} to ${after}, now that we know more.`;
  return `Home Health Score stays at ${after}.`;
}

// One card in the "walk your home" flow: snap the label, OakTend reads a
// SUGGESTION off it (never auto-written), the owner confirms or edits it, and
// the card shows the score change for that one system.
//
// The photo itself is never uploaded to storage: confirmSystemAction only
// ever writes the extracted fields (brand/model/serial/year), never a photo
// URL. The preview thumbnail is a local blob URL.
export default function SystemCaptureCard({
  system,
  manual = false,
  focusOnSwitch = false,
  onConfirmed,
}: {
  system: HomeSystem;
  // Photo or typing, chosen by the toggle at the top of the page. The card
  // follows it live (not only on first render), which is what makes
  // "Type it in" actually switch every card to its form.
  manual?: boolean;
  // Put the cursor in this card's Brand box when the owner switches to typing.
  // Only the first card gets it, so the page does not jump.
  focusOnSwitch?: boolean;
  // Told the moment the owner confirms, so the list keeps this card in place
  // (showing its score change) when the refreshed page marks it confirmed.
  onConfirmed?: (id: string) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "working" | "review" | "confirmed">(
    manual ? "review" : "idle"
  );
  const [note, setNote] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(
    manual ? BLANK_SUGGESTION : null
  );
  const [delta, setDelta] = useState<{ before: number; after: number } | null>(
    null
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [saving, startSave] = useTransition();
  const [focusBrand, setFocusBrand] = useState(false);
  const [dragging, setDragging] = useState(false);
  const brandRef = useRef<HTMLInputElement>(null);
  // Lets Cancel abort an in-flight read and lets the catch block tell an
  // owner cancel apart from a real failure.
  const abortRef = useRef<AbortController | null>(null);
  const cancelledRef = useRef(false);
  const progress = useStagedProgress(READ_STAGES, 8000);

  const name = labelFor(SYSTEM_TYPES, system.system_type);
  // Placeholders keyed to THIS system (see SYSTEM_FIELD_EXAMPLES). An empty
  // example means the system has no brand or model to give.
  const example = systemFieldExample(system.system_type);

  // Follow the page toggle. Skips the first render (the initial phase above
  // already matches), a read in flight, and a card already confirmed. A card
  // with a photo under review keeps it: switching modes never throws away a
  // read the owner is checking.
  const lastManual = useRef(manual);
  useEffect(() => {
    if (lastManual.current === manual) return;
    lastManual.current = manual;
    if (phase === "working" || phase === "confirmed") return;
    if (manual) {
      if (phase === "idle") {
        setSuggestion(BLANK_SUGGESTION);
        setNote(null);
        setPhase("review");
        if (focusOnSwitch) setFocusBrand(true);
      }
    } else if (!preview) {
      setSuggestion(null);
      setNote(null);
      setPhase("idle");
    }
  }, [manual, phase, preview, focusOnSwitch]);

  useEffect(() => {
    if (!focusBrand || phase !== "review") return;
    brandRef.current?.focus();
    setFocusBrand(false);
  }, [focusBrand, phase]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    input.value = ""; // allow re-picking the same file
    if (file) await readPhoto(file);
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    const file = Array.from(e.dataTransfer.files).find((f) =>
      f.type.startsWith("image/")
    );
    if (file) void readPhoto(file);
    else setNote("Drop a photo (JPG or PNG).");
  }

  async function readPhoto(file: File) {

    // Guard the size before reading it into memory (browser OOM). Anything
    // under this is downscaled before it is sent.
    const MAX_BYTES = 25 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      setNote("That photo is too large. Try a smaller one.");
      return;
    }

    // Pending state first, before any work, so the tap answers at once.
    setPhase("working");
    setNote(null);
    setSuggestion(null);
    setPreview(URL.createObjectURL(file));
    cancelledRef.current = false;
    progress.start();
    const controller = new AbortController();
    abortRef.current = controller;

    let read: Suggestion | null = null;
    let failNote = "Couldn't read it. Fill in what you can and confirm.";
    try {
      const photo = await encodePhoto(file);
      if (cancelledRef.current) return;
      const resp = await fetchWithTimeout("/api/confirm-system", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          image: photo.data,
          mime: photo.mime,
          system_id: system.id,
        }),
        signal: controller.signal,
      });
      abortRef.current = null;
      const data = await resp.json().catch(() => null);
      read = data?.suggestion ?? null;
      // Tell the truth about WHY nothing was read: a used-up daily AI limit
      // or an unconfigured key is not a bad photo.
      if (!read && resp.status === 413) {
        failNote = "That photo is too large. Fill in what you can and confirm.";
      } else if (!read && data?.reason === "rate_limited") {
        failNote =
          "You've hit today's AI limit. Fill in what you can and confirm.";
      } else if (!read && data?.reason === "busy") {
        failNote = "OakTend's AI is busy right now. Fill in what you can and confirm.";
      } else if (!read && data?.reason === "no_key") {
        failNote =
          "Automatic reading isn't set up yet. Fill in what you can and confirm.";
      }
    } catch (e) {
      abortRef.current = null;
      if (cancelledRef.current) {
        cancelledRef.current = false;
        return;
      }
      read = null;
      if (isTimeoutError(e)) {
        failNote = "That took too long. Fill in what you can and confirm.";
      }
    }

    progress.finish();
    setSuggestion(read ?? BLANK_SUGGESTION);
    setNote(read ? "Check what OakTend read, then confirm." : failNote);
    setPhase("review");
  }

  // Back to the photo tile from anywhere: a read in flight, a read under
  // review, or the typing form.
  function backToPhoto() {
    cancelledRef.current = phase === "working";
    abortRef.current?.abort();
    abortRef.current = null;
    progress.reset();
    if (preview) URL.revokeObjectURL(preview);
    setPhase("idle");
    setSuggestion(null);
    setPreview(null);
    setNote(null);
  }

  function typeItIn() {
    setSuggestion(BLANK_SUGGESTION);
    setNote(null);
    setPhase("review");
    setFocusBrand(true);
  }

  function confirm(formData: FormData) {
    // Optimistic: the card turns "Confirmed" the instant Confirm is tapped.
    // The score change fills in when the save returns, and a failed save puts
    // the form back with the reason.
    setPhase("confirmed");
    setNote(null);
    onConfirmed?.(system.id);
    startSave(async () => {
      let result: Awaited<ReturnType<typeof confirmSystemAction>>;
      try {
        result = await confirmSystemAction(formData);
      } catch {
        result = {
          ok: false,
          error: "Couldn't save that right now. Please try again.",
        };
      }
      if (!result.ok) {
        setNote(result.error);
        setPhase("review");
        return;
      }
      if (preview) URL.revokeObjectURL(preview);
      setDelta({ before: result.before, after: result.after });
    });
  }

  if (phase === "confirmed") {
    return (
      <li className="card space-y-1 border-green-200 bg-green-50/60 dark:border-green-900 dark:bg-green-950/30">
        <p className="flex items-center gap-2 font-medium text-stone-900 dark:text-stone-100">
          {name}
          <span className="chip bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-200">
            Confirmed
          </span>
        </p>
        <p
          className="text-sm text-green-800 dark:text-green-200"
          aria-live="polite"
        >
          {delta && !saving
            ? scoreMessage(delta.before, delta.after)
            : "Saving..."}
        </p>
      </li>
    );
  }

  const fromPhoto = preview != null;

  return (
    <li className="card space-y-3">
      <p className="flex items-center gap-2 font-medium text-stone-900 dark:text-stone-100">
        {name}
        <span className="chip bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300">
          Estimated
        </span>
      </p>

      {phase === "idle" && (
        <>
          {/* Tap to pick, or drag a photo onto it on a computer. */}
          <label
            onDragOver={(e) => {
              e.preventDefault();
              if (!dragging) setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 py-6 text-center hover:border-bark-500 hover:bg-bark-50 dark:hover:bg-bark-700/30 ${
              dragging
                ? "border-bark-500 bg-bark-50 dark:bg-bark-700/30"
                : "border-stone-200 dark:border-stone-700"
            }`}
          >
            <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
              Add a photo of the label
              <span className="max-sm:hidden"> or drop one here</span>
            </span>
            <span className="text-sm text-stone-600 dark:text-stone-300">
              {PHOTO_TIPS}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={onPick}
              className="hidden"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            {/* Phones get a straight-to-camera button; the tile above still
                opens the gallery for a photo taken earlier. */}
            <TakePhotoButton onPick={onPick} label="Open the camera" />
            <button
              type="button"
              onClick={typeItIn}
              className="btn-secondary max-sm:w-full"
            >
              Type it in
            </button>
          </div>
        </>
      )}

      {phase === "working" && (
        <>
          <ProgressBar
            value={progress.value}
            stages={READ_STAGES}
            stageIndex={progress.stageIndex}
            ariaLabel="Reading the label"
          />
          <button type="button" onClick={backToPhoto} className="btn-secondary">
            Cancel
          </button>
        </>
      )}

      {note && (
        <p role="status" className="text-sm text-stone-600 dark:text-stone-300">
          {note}
        </p>
      )}

      {phase === "review" && suggestion && (
        <form action={confirm} className="space-y-3">
          <input type="hidden" name="system_id" value={system.id} />

          {fromPhoto && (
            <>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="block cursor-zoom-in"
                aria-label={`View ${name} label photo full size`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt={`${name} label`}
                  className="max-h-32 rounded-lg border border-stone-200 object-contain dark:border-white/10"
                />
              </button>
              <Lightbox
                src={lightboxOpen ? preview : null}
                alt={`${name} label`}
                onClose={() => setLightboxOpen(false)}
              />
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor={`brand-${system.id}`}>
                Brand
              </label>
              <input
                id={`brand-${system.id}`}
                ref={brandRef}
                name="brand"
                className="input"
                placeholder={
                  example.brand ? `e.g. ${example.brand}` : "Not applicable"
                }
                defaultValue={suggestion.brand ?? ""}
              />
            </div>
            <div>
              <label className="label" htmlFor={`model-${system.id}`}>
                Model number
              </label>
              <input
                id={`model-${system.id}`}
                name="model"
                className="input"
                placeholder={
                  example.model ? `e.g. ${example.model}` : "Not applicable"
                }
                defaultValue={suggestion.model ?? ""}
              />
            </div>
            <div>
              <label className="label" htmlFor={`year-${system.id}`}>
                Install year or age
              </label>
              {/* A year (2015) or an age in years (10): the action tells the
                  two apart, since "about 10 years old" is what most owners
                  actually know. */}
              <input
                id={`year-${system.id}`}
                name="install_year"
                type="number"
                inputMode="numeric"
                min="0"
                className="input"
                placeholder="2015 or 10"
                defaultValue={suggestion.install_year ?? system.install_year ?? ""}
              />
            </div>
            <div className="col-span-2">
              <label className="label" htmlFor={`notes-${system.id}`}>
                Notes
              </label>
              <input
                id={`notes-${system.id}`}
                name="notes"
                className="input"
                maxLength={300}
                placeholder="Anything worth remembering"
              />
            </div>
          </div>

          {/* Secondary fields fold away so Confirm is what stands out. Open
              from the start when the photo already gave a serial, so a read
              value is never hidden. Closed <details> content still submits. */}
          <AnimatedDetails
            defaultOpen={Boolean(suggestion.serial)}
            summaryClassName="focus-ring flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-stone-700 [&::-webkit-details-marker]:hidden max-sm:min-h-11 dark:text-stone-300"
            summary={
              <>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-stone-400 transition-transform duration-300 group-data-[shown=true]:rotate-90 dark:text-stone-500"
                  aria-hidden="true"
                />
                Serial and condition (optional)
              </>
            }
            contentClassName="pt-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor={`serial-${system.id}`}>
                  Serial
                </label>
                <input
                  id={`serial-${system.id}`}
                  name="serial"
                  className="input"
                  defaultValue={suggestion.serial ?? ""}
                />
              </div>
              <div>
                <label className="label">Condition</label>
                <SelectMenu
                  name="condition_rating"
                  // Stored as a number; the dropdown deals in strings.
                  defaultValue={String(system.condition_rating ?? "")}
                  options={[
                    { value: "", label: "Not sure" },
                    { value: "5", label: "5 (like new)" },
                    { value: "4", label: "4 (good)" },
                    { value: "3", label: "3 (fair)" },
                    { value: "2", label: "2 (worn)" },
                    { value: "1", label: "1 (failing)" },
                  ]}
                />
              </div>
            </div>
          </AnimatedDetails>

          {/* Only when a model actually read something: typed-in details
              need no AI notice. */}
          {fromPhoto && (
            <AiNotice detail="Check every field before you confirm." />
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1"
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={backToPhoto}
            >
              {fromPhoto ? "Retake photo" : "Use a photo instead"}
            </button>
          </div>
        </form>
      )}
    </li>
  );
}
