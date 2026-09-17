"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { useDraftJob } from "./DraftJobContext";
import { categoryForKey, projectOptions } from "./categoryOptionKey";

// The "what do you need?" picker for posting a job. Lists every service category
// a contractor can offer, plus common projects that map to one of them, so a
// homeowner's job reaches the right pros. Project options map to the matchable
// contractor category. defaultValue pre-fills it when arriving from a category
// link (e.g. a project chip on Home). When "Other" is chosen we nudge the owner
// to describe the service, since that free text is what matches them to a pro's
// custom services.

// One control, not two: this used to be a "Search job types…" box stacked on
// top of a native <select>, which read as two separate things to do. It is now
// a single combobox - a text input that drops the filtered list open on focus,
// click or typing - so searching and picking are the same gesture.

// projectKey/categoryForKey live in categoryOptionKey.ts (small pure helpers,
// unit-tested there): several REMODEL_PROJECTS entries share a category with
// a plain SERVICE_CATEGORIES option, or with each other (e.g. "Water heater"
// and "Plumbing" both map to "plumbing"), so the option a row stands for is
// tracked by its own namespaced key, never by the bare category it resolves to.

const OTHER_LABEL = "Other (describe it)";

// One row of the open panel. Headings and the no-match line are there to read,
// not to pick: only "option" rows take part in the highlight and in Enter.
type Row =
  | { kind: "heading"; label: string }
  | { kind: "option"; key: string; label: string }
  | { kind: "empty"; label: string };

export default function CategoryFilter({
  category,
  id,
  otherDefault = "",
}: {
  category: string;
  // Lets a surrounding <label htmlFor> point at this combobox.
  id?: string;
  // Prefill for the inline "Other" free-text box. EditJobForm passes the name
  // it recovered from the job's stored description, so editing an "Other" job
  // doesn't force the owner to retype the service name (the field is
  // `required`). Empty on the post-a-job form, which starts blank.
  otherDefault?: string;
}) {
  // On the post-a-job form the category is shared through context, so a
  // photo-drafted category guess can preselect it (and we can tell when the
  // owner picked it themselves). Everywhere else the context is null and this
  // falls back to local state, unchanged.
  const ctx = useDraftJob();
  const [localValue, setLocalValue] = useState(category);
  const value = ctx ? ctx.category : localValue; // canonical category
  const setValue = (v: string) => (ctx ? ctx.setCategory(v) : setLocalValue(v));

  // A fresh ?category= (a project chip tapped on this same page - see
  // ProjectChips) lands as a new `category` prop, but a searchParams-only
  // navigation does not remount this component or its DraftJobProvider:
  // React reuses both across it. Without this, the chip updates the URL and
  // highlights itself while the box underneath silently keeps showing its
  // placeholder. Only take the new value when the owner hasn't made their own
  // pick yet, so a chip tapped after they've already chosen something never
  // stomps on it.
  useEffect(() => {
    if (!ctx || !ctx.categoryTouched) setValue(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Which exact option the box shows as chosen. Only ever set by our own
  // pick() below - never by an external change to `value` (a fresh
  // ?category= prefill, or DescriptionField's photo-draft guess) - so those
  // keep landing on the plain Service option for that category, same as
  // before this fix. Falls back to the canonical `value` itself whenever it
  // no longer resolves to the same category, which covers both of those
  // external cases automatically with no effect needed.
  const [pickedKey, setPickedKey] = useState<string | null>(null);
  const selectedKey =
    pickedKey && categoryForKey(pickedKey) === value ? pickedKey : value;

  const allProjects = useMemo(() => projectOptions(), []);

  // What the closed box reads. Derived from selectedKey rather than stored, so
  // a chip prefill or a photo-draft guess updates the visible text for free.
  // Unknown keys fall back to the key itself so a category we have no label
  // for still leaves the box non-empty (and so `required` still passes).
  const selectedLabel =
    selectedKey === ""
      ? ""
      : selectedKey === "other"
        ? OTHER_LABEL
        : (SERVICE_CATEGORIES.find((c) => c.value === selectedKey)?.label ??
          allProjects.find((p) => p.key === selectedKey)?.label ??
          selectedKey);

  // `search` is the typed query, and it only exists while the panel is open:
  // closing resets it, so the box drops back to the selected label and a
  // half-typed query never lingers looking like the value.
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  // Index into `options` (not `rows`) of the highlighted row.
  const [active, setActive] = useState(-1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const optionId = (i: number) => `${listId}-opt-${i}`;

  // Filters both groups by label as the owner types, so a long list is faster
  // to scan on a phone. The currently selected option always stays visible
  // even if it no longer matches the search text, so typing never silently
  // hides what's already chosen.
  const matchedServices = query
    ? SERVICE_CATEGORIES.filter((c) => c.label.toLowerCase().includes(query))
    : SERVICE_CATEGORIES;
  const selectedService = SERVICE_CATEGORIES.find(
    (c) => c.value === selectedKey
  );
  const visibleServices =
    query && selectedService && !matchedServices.includes(selectedService)
      ? [selectedService, ...matchedServices]
      : matchedServices;

  const matchedProjects = query
    ? allProjects.filter((p) => p.label.toLowerCase().includes(query))
    : allProjects;
  const selectedProject = allProjects.find((p) => p.key === selectedKey);
  const visibleProjects =
    query && selectedProject && !matchedProjects.includes(selectedProject)
      ? [selectedProject, ...matchedProjects]
      : matchedProjects;

  // "other" only hides when it plainly doesn't match what's typed, so
  // searching "roof" doesn't leave the fallback option in the list for no
  // reason, but the box always has somewhere to land.
  //
  // The second clause is the important one: searching for something the list
  // genuinely doesn't have ("chimney", "septic") matched no service, no
  // project, and not "other" either, which left the panel holding nothing at
  // all - a dead end at exactly the moment "Other (describe it)" is the right
  // answer.
  const otherMatches =
    !query ||
    "other".includes(query) ||
    (visibleServices.length === 0 && visibleProjects.length === 0);

  const rows: Row[] = [];
  if (visibleServices.length > 0) {
    rows.push({ kind: "heading", label: "Services" });
    for (const c of visibleServices)
      rows.push({ kind: "option", key: c.value, label: c.label });
  }
  // projectOptions(), not REMODEL_PROJECTS directly: two of those entries
  // repeat a Services label word for word ("Garage door", "Landscaping") and
  // were showing up twice in this one list.
  if (visibleProjects.length > 0) {
    rows.push({ kind: "heading", label: "Popular projects" });
    for (const p of visibleProjects)
      rows.push({ kind: "option", key: p.key, label: p.label });
  }
  if (visibleServices.length === 0 && visibleProjects.length === 0) {
    rows.push({ kind: "empty", label: "No match. Choose Other to describe it." });
  }
  if (otherMatches) rows.push({ kind: "option", key: "other", label: OTHER_LABEL });

  const options = rows.filter(
    (r): r is Extract<Row, { kind: "option" }> => r.kind === "option"
  );

  // Local free-text state for "Other". Value only, never validated here (the
  // combobox's `required` plus the server's own description floor already
  // cover the empty case) - this exists purely to show/hide the label text
  // and to give the field a stable controlled value across re-renders.
  const [otherDetail, setOtherDetail] = useState(otherDefault);

  function close() {
    setOpen(false);
    setSearch("");
  }

  // Sets the chosen option and closes; the box's text follows from
  // selectedKey, so there is no separate label to store.
  function pick(key: string) {
    setPickedKey(key);
    setValue(categoryForKey(key));
    ctx?.markCategoryTouched();
    inputRef.current?.setCustomValidity("");
    close();
    // PhotoTips (and anything else watching the form) reacts to a bubbling
    // change event, which the old <select> fired natively. The hidden field
    // below is written by React, which fires nothing, so announce the pick
    // ourselves - its listener defers the read a tick, past React's commit.
    hiddenRef.current?.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // Typing narrows the list, so the first match is the sensible landing spot
  // for Enter.
  useEffect(() => {
    if (!open) return;
    setActive(options.length > 0 ? 0 : -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Opening starts on whatever is already chosen, falling back to the first
  // row so Enter always has somewhere to land (never a submit by accident).
  useEffect(() => {
    if (!open) return;
    const i = options.findIndex((o) => o.key === selectedKey);
    setActive(i >= 0 ? i : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keyboard travel through a list taller than the panel has to bring the
  // highlighted row with it.
  useEffect(() => {
    if (!open || active < 0) return;
    document.getElementById(optionId(active))?.scrollIntoView?.({
      block: "nearest",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open]);

  // A tap outside closes, same as a native dropdown. pointerdown (not click)
  // so the panel is already gone by the time a tap on the Post button lands.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // The old <select> was `required`, which is what put a browser bubble in
  // front of an empty pick. A text input satisfies `required` with any typed
  // text, so custom validity is what keeps a half-typed query that matches
  // nothing from counting as an answer.
  useEffect(() => {
    inputRef.current?.setCustomValidity(
      value ? "" : "Choose a job type from the list"
    );
  }, [value, search]);

  function move(delta: number) {
    if (options.length === 0) return;
    setActive((a) => {
      const next = a < 0 ? (delta > 0 ? 0 : options.length - 1) : a + delta;
      return (next + options.length) % options.length;
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (open) move(-1);
    } else if (e.key === "Home" && open) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && open) {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter") {
      if (!open || active < 0) return;
      // Pick the highlighted row instead of submitting the form.
      e.preventDefault();
      pick(options[active].key);
    } else if (e.key === "Escape") {
      if (!open) return;
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // Close but let focus move on.
      if (open) close();
    }
  }

  let optionIndex = -1;

  return (
    <>
      <div className="relative" ref={wrapRef}>
        <input
          ref={inputRef}
          id={id}
          type="text"
          className="input pr-9"
          role="combobox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={
            open && active >= 0 ? optionId(active) : undefined
          }
          autoComplete="off"
          placeholder="Search or choose a job type…"
          required
          value={open ? search : selectedLabel}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={onKeyDown}
          onBlur={(e) => {
            // Only a blur that leaves the box entirely; the option rows
            // preventDefault their mousedown so a pick never blurs at all.
            if (!wrapRef.current?.contains(e.relatedTarget as Node | null))
              close();
          }}
        />
        {/* Reads as a dropdown rather than a plain search field. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
        {open && (
          <div
            id={listId}
            role="listbox"
            className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-stone-200 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-stone-800"
          >
            {rows.map((row, i) => {
              if (row.kind !== "option") {
                return (
                  <div
                    key={`${row.kind}-${i}`}
                    className={
                      row.kind === "heading"
                        ? "px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-stone-500"
                        : "px-3 py-2 text-sm text-stone-500 dark:text-stone-400"
                    }
                  >
                    {row.label}
                  </div>
                );
              }
              optionIndex += 1;
              const idx = optionIndex;
              const isActive = idx === active;
              const isSelected = row.key === selectedKey;
              return (
                <div
                  key={row.key}
                  id={optionId(idx)}
                  role="option"
                  aria-selected={isSelected}
                  // Keeps the click from blurring the input before the pick
                  // registers.
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(row.key)}
                  onMouseEnter={() => setActive(idx)}
                  className={`cursor-pointer px-3 py-2 text-sm hover:bg-bark-50 dark:hover:bg-stone-700 ${
                    isActive ? "bg-bark-100 dark:bg-stone-700" : ""
                  } ${isSelected ? "font-medium" : ""}`}
                >
                  {row.label}
                  {isSelected && <span aria-hidden="true"> &#10003;</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* postJobAction / updateJobAction only ever read/validate this plain
          category value (e.g. "plumbing") - never which specific project
          option was picked. The list above exists purely so each subtype
          stays visually distinct once chosen; this hidden field is what
          actually reaches the server. */}
      <input type="hidden" name="category" value={value} ref={hiddenRef} />
      {value === "other" && (
        <div className="mt-1.5">
          <label className="label" htmlFor={`${id ?? "job-category"}-other`}>
            What service do you need?
          </label>
          <input
            type="text"
            id={`${id ?? "job-category"}-other`}
            name="other_service_name"
            className="input"
            placeholder="e.g. Chimney sweep"
            value={otherDetail}
            onChange={(e) => setOtherDetail(e.target.value)}
            maxLength={80}
            required
          />
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            We add this to the details pros see so we can match you to one who
            offers it.
          </p>
        </div>
      )}
    </>
  );
}
