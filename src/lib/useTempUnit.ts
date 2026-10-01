"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_TEMP_UNIT,
  readStoredTempUnit,
  storeTempUnit,
  TEMP_UNIT_EVENT,
  TEMP_UNIT_STORAGE_KEY,
  type TempUnit,
} from "@/lib/weatherUnits";

// The one Fahrenheit / Celsius state every temperature in the app reads from:
// the weather strip (which owns the toggle), HomeAlerts below it, and the
// notification bell's freeze/heat titles. Flipping the toggle in one updates
// all of them in place, with no reload, through storeTempUnit's window event;
// another tab's switch arrives through the native "storage" event.
//
// Starts at the US default rather than reading localStorage during render:
// these components are server rendered, and a first paint that disagreed with
// the server's markup is a hydration mismatch. The effect swaps in the stored
// choice right after mount, before any weather fetch has realistically
// resolved, so a returning Celsius user never sees a Fahrenheit number flash.
export function useTempUnit(): [TempUnit, (next: TempUnit) => void] {
  const [unit, setUnitState] = useState<TempUnit>(DEFAULT_TEMP_UNIT);

  useEffect(() => {
    const sync = () => setUnitState(readStoredTempUnit());
    const onStorage = (e: StorageEvent) => {
      // key null means storage was cleared, which reads back as the default.
      if (e.key === null || e.key === TEMP_UNIT_STORAGE_KEY) sync();
    };
    sync();
    window.addEventListener(TEMP_UNIT_EVENT, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(TEMP_UNIT_EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setUnit = useCallback((next: TempUnit) => {
    setUnitState(next);
    storeTempUnit(next);
  }, []);

  return [unit, setUnit];
}
