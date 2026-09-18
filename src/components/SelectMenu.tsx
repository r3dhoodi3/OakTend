"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

// One dropdown for the whole app. Native <select> menus are drawn by the
// browser, so every screen that used one looked like a different product: grey
// Windows menus next to our rounded bark-tinted fields. This renders the same
// panel CategoryFilter opens - that combobox is the source of truth for the
// look - on top of a real <select> that stays in the form.
//
// The hidden <select> is the whole trick: every existing `<form action={...}>`,
// `required`, `defaultValue` and `new FormData(form)` reader keeps working
// untouched, and a pick still fires a bubbling native "change" (PhotoTips and
// the auto-submitting status forms listen for one).

export type SelectOption = { value: string; label: string; disabled?: boolean };
export type SelectGroup = { label: string; options: SelectOption[] };

export type SelectMenuProps = {
  name?: string;
  id?: string;
  options: SelectOption[] | SelectGroup[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
  size?: "sm" | "md";
};

function isGroup(o: SelectOption | SelectGroup): o is SelectGroup {
  return "options" in o;
}

// One row of the open panel. Headings and the placeholder/disabled rows are
// there to read, not to pick: only enabled options take part in the highlight.
type Row =
  | { kind: "heading"; label: string }
  | { kind: "option"; option: SelectOption };

export default function SelectMenu({
  name,
  id,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  required,
  disabled,
  "aria-label": ariaLabel,
  className,
  size = "md",
}: SelectMenuProps) {
  // Flat list (groups unwrapped) for value lookups and the hidden <select>.
  const flat = useMemo(() => {
    const list = options as (SelectOption | SelectGroup)[];
    return list.flatMap((o) => (isGroup(o) ? o.options : [o]));
  }, [options]);

  // Mirrors what a native <select> starts on: the given value, else the first
  // option - unless a placeholder is holding the empty slot, the way a
  // `<option value="" disabled>` placeholder does.
  const initial =
    value ??
    defaultValue ??
    (placeholder ? "" : (flat.find((o) => !o.disabled)?.value ?? ""));
  // The seed is captured once so a form reset restores what the form was born
  // with, not whatever is selected now.
  const initialRef = useRef(initial);

  const [selected, setSelected] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [invalid, setInvalid] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hiddenRef = useRef<HTMLSelectElement>(null);
  const listId = useId();
  const optionId = (i: number) => `${listId}-opt-${i}`;

  // Controlled mode: the displayed selection only ever follows the prop.
  useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  const rows: Row[] = [];
  if (placeholder) {
    rows.push({
      kind: "option",
      option: { value: "", label: placeholder, disabled: true },
    });
  }
  for (const entry of options as (SelectOption | SelectGroup)[]) {
    if (isGroup(entry)) {
      rows.push({ kind: "heading", label: entry.label });
      for (const o of entry.options) rows.push({ kind: "option", option: o });
    } else {
      rows.push({ kind: "option", option: entry });
    }
  }

  // Only enabled rows take the highlight, so Arrow keys skip headings and
  // disabled options the way a native menu does.
  const pickable = rows
    .filter((r): r is Extract<Row, { kind: "option" }> => r.kind === "option")
    .map((r) => r.option)
    .filter((o) => !o.disabled);

  const selectedOption = flat.find((o) => o.value === selected);
  // Unknown values fall back to the raw value rather than going blank, so a
  // stored option we no longer list still shows something.
  const triggerLabel = selectedOption
    ? selectedOption.label
    : selected
      ? selected
      : (placeholder ?? "");
  const showingPlaceholder = !selectedOption && !selected;

  const close = useCallback(() => setOpen(false), []);

  function pick(option: SelectOption) {
    if (option.disabled) return;
    // Controlled: the parent's onChange is the only thing that may move it.
    if (value === undefined) setSelected(option.value);
    setInvalid(false);
    close();
    // React writing `value` fires nothing, so announce the pick ourselves for
    // the listeners the old <select> used to feed.
    const el = hiddenRef.current;
    if (el) {
      el.value = option.value;
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
    onChange?.(option.value);
  }

  // Opening starts on whatever is already chosen, falling back to the first
  // enabled row so Enter always has somewhere to land.
  useEffect(() => {
    if (!open) return;
    const i = pickable.findIndex((o) => o.value === selected);
    setActive(i >= 0 ? i : pickable.length > 0 ? 0 : -1);
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
  // so the panel is already gone by the time a tap on a button behind it lands.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, close]);

  // <form> reset still has to clear us: the hidden select is React-controlled,
  // so the browser's own reset would be overwritten on the next render.
  useEffect(() => {
    const form = hiddenRef.current?.form;
    if (!form) return;
    const onReset = () => {
      setInvalid(false);
      if (value === undefined) setSelected(initialRef.current);
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [value]);

  function move(delta: number) {
    if (pickable.length === 0) return;
    setActive((a) => {
      const next = a < 0 ? (delta > 0 ? 0 : pickable.length - 1) : a + delta;
      return (next + pickable.length) % pickable.length;
    });
  }

  // First-letter type-ahead, like a native menu: "m" jumps to the next option
  // starting with m. The buffer clears after a pause so "ma" and "m","a" can
  // mean different things.
  const typed = useRef({ text: "", at: 0 });
  function typeAhead(key: string) {
    const now = Date.now();
    typed.current.text = now - typed.current.at > 800 ? key : typed.current.text + key;
    typed.current.at = now;
    const q = typed.current.text.toLowerCase();
    const from = active < 0 ? 0 : active;
    for (let i = 1; i <= pickable.length; i += 1) {
      const idx = (from + i) % pickable.length;
      if (pickable[idx].label.toLowerCase().startsWith(q)) {
        setActive(idx);
        return;
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      else move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      else move(-1);
    } else if (e.key === "Home" && open) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && open) {
      e.preventDefault();
      setActive(pickable.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      // preventDefault on both: it stops Enter submitting the form and stops
      // the browser turning the key into a second click on this button.
      e.preventDefault();
      if (!open) setOpen(true);
      else if (active >= 0) pick(pickable[active]);
    } else if (e.key === "Escape") {
      if (!open) return;
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // Close but let focus move on.
      if (open) close();
    } else if (open && e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
      typeAhead(e.key);
    }
  }

  const trigger =
    size === "sm"
      ? "select !w-auto py-1 text-xs sm:text-xs"
      : "select";

  let optionIndex = -1;

  return (
    <div className={`relative${size === "sm" ? " inline-block" : ""}${className ? ` ${className}` : ""}`} ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={`${trigger} flex items-center justify-between gap-2 text-left ${
          invalid ? "border-red-500 " : ""
        }${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        // No aria-required here: a button role does not support it (eslint
        // jsx-a11y). The hidden native select below carries `required`.
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className={`truncate${showingPlaceholder ? " text-stone-400" : ""}`}>
          {triggerLabel}
        </span>
        {/* Same chevron as CategoryFilter, so the two controls read as one. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`pointer-events-none h-4 w-4 shrink-0 text-stone-400 transition-transform${
            open ? " rotate-180" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-stone-200 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-stone-800"
        >
          {rows.map((row, i) => {
            if (row.kind === "heading") {
              return (
                <div
                  key={`heading-${i}`}
                  className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-stone-500"
                >
                  {row.label}
                </div>
              );
            }
            const o = row.option;
            if (o.disabled) {
              return (
                <div
                  key={`disabled-${o.value}-${i}`}
                  role="option"
                  aria-disabled="true"
                  aria-selected={o.value === selected}
                  className="cursor-not-allowed px-3 py-2 text-sm text-stone-400 dark:text-stone-500"
                >
                  {o.label}
                </div>
              );
            }
            optionIndex += 1;
            const idx = optionIndex;
            const isActive = idx === active;
            const isSelected = o.value === selected;
            return (
              <div
                key={`${o.value}-${i}`}
                id={optionId(idx)}
                role="option"
                aria-selected={isSelected}
                // Keeps the click from blurring the trigger before the pick
                // registers.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(o)}
                onMouseEnter={() => setActive(idx)}
                // Two layers, same as CategoryFilter: the SELECTED row keeps
                // the solid highlight for as long as it is the choice; the
                // keyboard / hover cursor gets a lighter tint so it reads as
                // "where you are", not "what you picked".
                className={`cursor-pointer px-3 py-2 text-sm ${
                  isSelected
                    ? "bg-bark-100 font-medium dark:bg-stone-600"
                    : isActive
                      ? "bg-bark-50 dark:bg-stone-700"
                      : "hover:bg-bark-50 dark:hover:bg-stone-700"
                }`}
              >
                {o.label}
              </div>
            );
          })}
        </div>
      )}

      {/* The real field. sr-only rather than hidden/display:none so the browser
          still runs constraint validation on it. */}
      <select
        ref={hiddenRef}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        required={required}
        disabled={disabled}
        value={selected}
        onChange={() => {
          // Ours to fire, not to read - pick() already owns the state.
        }}
        onInvalid={(e) => {
          // A clipped select can't host the browser's validation bubble, so we
          // say it ourselves next to the control the owner can actually see.
          e.preventDefault();
          setInvalid(true);
          triggerRef.current?.focus();
        }}
      >
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {/* Flat: <optgroup> would only matter to a control nobody sees. */}
        {flat.map((o, i) => (
          <option key={`${o.value}-${i}`} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>

      {invalid && <p className="mt-1 text-xs text-red-600">Choose one.</p>}
    </div>
  );
}
