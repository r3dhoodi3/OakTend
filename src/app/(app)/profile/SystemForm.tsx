"use client";

import { useRef, useState } from "react";
import { addSystemAction } from "./actions";
import { SYSTEM_TYPES, materialLabel } from "@/lib/constants";
import PhotoUpload from "@/components/PhotoUpload";
import MonthYearInput from "@/components/MonthYearInput";
import MaterialSelect from "@/components/MaterialSelect";
import SelectMenu from "@/components/SelectMenu";
import SubmitButton from "@/components/SubmitButton";

export default function SystemForm({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);
  const [systemType, setSystemType] = useState<string>(SYSTEM_TYPES[0].value);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) {
    return (
      <button className="btn-primary" onClick={() => setOpen(true)}>
        + Add a system
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={async (fd) => {
        const res = await addSystemAction(fd);
        if (!res.ok) {
          setError(res.error);
          return;
        }
        setError(null);
        formRef.current?.reset();
        setOpen(false);
      }}
      className="card space-y-4"
    >
      <h3 className="font-semibold text-stone-900 dark:text-stone-100">Add a system</h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="label">Type</label>
          <SelectMenu
            name="system_type"
            options={[...SYSTEM_TYPES]}
            value={systemType}
            onChange={setSystemType}
            required
          />
        </div>
        {/* B7: "Other" needs a name - there's no type-specific label to fall
            back on. Inline, right under the type picker, not buried at the
            bottom of the form. */}
        {systemType === "other" && (
          <div>
            <label className="label" htmlFor="other-system-label">
              What is it?
            </label>
            <input
              id="other-system-label"
              name="other_label"
              className="input"
              placeholder="e.g. Pool pump"
              maxLength={80}
              required
            />
          </div>
        )}
        <div>
          <label className="label">{materialLabel(systemType)} (optional)</label>
          <MaterialSelect key={systemType} systemType={systemType} />
        </div>
        {/* Exact model + capacity: brand dropdown above is a starting point,
            but DIY owners want the real numbers off the data plate. Both are
            optional free text (migration 0102). */}
        <div>
          <label className="label">Model number (optional)</label>
          <input
            name="model_number"
            className="input"
            placeholder="XE50T10H45U0"
            maxLength={60}
          />
        </div>
        <div>
          <label className="label">Capacity / size (optional)</label>
          <input
            name="capacity"
            className="input"
            placeholder="50 gal / 3 ton / 200 sq ft"
            maxLength={60}
          />
        </div>
        <div>
          <label className="label">Install year</label>
          <input name="install_year" type="number" className="input" placeholder="2015" />
        </div>
        <div>
          <label className="label">Last serviced</label>
          <MonthYearInput name="last_serviced" />
        </div>
        <div>
          <label className="label">Condition</label>
          <SelectMenu
            name="condition_rating"
            defaultValue=""
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
        {/* HVAC only: filter size + reminder cadence, so OakTend can nudge the
            owner when it is time for a fresh filter (consumables autopilot). */}
        {systemType === "hvac" && (
          <>
            <div>
              <label className="label">Filter size (optional)</label>
              <input
                name="filter_size"
                className="input"
                placeholder="16x25x1"
                maxLength={20}
              />
            </div>
            <div>
              <label className="label">Reminder every</label>
              <SelectMenu
                name="filter_interval_months"
                defaultValue=""
                options={[
                  { value: "", label: "No reminder" },
                  { value: "1", label: "1 month" },
                  { value: "2", label: "2 months" },
                  { value: "3", label: "3 months" },
                  { value: "6", label: "6 months" },
                  { value: "12", label: "12 months" },
                ]}
              />
            </div>
          </>
        )}
      </div>

      <div>
        <label className="label">Notes</label>
        <textarea name="notes" className="textarea" rows={2} />
      </div>

      <PhotoUpload propertyId={propertyId} />

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <SubmitButton pendingLabel="Saving…">Save system</SubmitButton>
      </div>
    </form>
  );
}
