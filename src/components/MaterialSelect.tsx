"use client";

import { useState } from "react";
import { materialsForSystem } from "@/lib/constants";
import SelectMenu from "./SelectMenu";

const OTHER = "__other";

// Styled material / model picker: a normal app dropdown of the common options
// for this system type, plus an "Other" choice that reveals a text box for a
// custom entry. Submits the chosen (or typed) value as `material_or_model`.
export default function MaterialSelect({
  systemType,
  defaultValue = "",
}: {
  systemType: string;
  defaultValue?: string;
}) {
  const options = materialsForSystem(systemType);
  const known = defaultValue !== "" && options.includes(defaultValue);

  const [choice, setChoice] = useState(
    known ? defaultValue : defaultValue ? OTHER : ""
  );
  const [other, setOther] = useState(known ? "" : defaultValue);

  return (
    <>
      <SelectMenu
        aria-label="Material or model"
        value={choice}
        onChange={setChoice}
        options={[
          { value: "", label: "Select (optional)" },
          ...options.map((m) => ({ value: m, label: m })),
          { value: OTHER, label: "Other" },
        ]}
      />
      {choice === OTHER ? (
        <input
          name="material_or_model"
          className="input mt-2"
          placeholder="Type the material or model"
          value={other}
          onChange={(e) => setOther(e.target.value)}
        />
      ) : (
        <input type="hidden" name="material_or_model" value={choice} />
      )}
    </>
  );
}
