import { afterEach, describe, expect, it, vi } from "vitest";
import {
  alertTitle,
  fetchHomeAlerts,
  type CurrentWeather,
  type HomeAlert,
} from "./homeAlertsClient";
import { localizeTempText } from "./weatherUnits";

afterEach(() => {
  vi.unstubAllGlobals();
});

// The share window dedupes WeatherStrip and HomeAlerts into one call per page
// load. A FAILED call must not stay in it, or WeatherStrip's single retry
// would be handed the same settled null back instead of reaching the route.
describe("fetchHomeAlerts share window", () => {
  const payload = { weather: [], recalls: [], current: null, hasLocation: true };

  it("shares one call between two callers for the same home", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => payload });
    vi.stubGlobal("fetch", fetchMock);
    const [a, b] = await Promise.all([
      fetchHomeAlerts("share-ok"),
      fetchHomeAlerts("share-ok"),
    ]);
    expect(a).toEqual(payload);
    expect(b).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("drops a failed call from the window, so the next call refetches", async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error("aborted"))
      .mockResolvedValueOnce({ ok: true, json: async () => payload });
    vi.stubGlobal("fetch", fetchMock);
    expect(await fetchHomeAlerts("share-fail")).toBeNull();
    expect(await fetchHomeAlerts("share-fail")).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

// homeAlertsClient's types are consumed straight off the /api/home-alerts
// JSON response, so there's no runtime logic here to exercise directly.
// These are compile-time shape checks: if CurrentWeather ever drops or
// mistypes a field (in particular `timezone`, which WeatherStrip reads to
// resolve the home's real clock), this file fails `tsc --noEmit` even
// though nothing here throws at runtime.
describe("CurrentWeather shape", () => {
  it("accepts a real geocoded timezone alongside the rest of the payload", () => {
    const weather: CurrentWeather = {
      tempF: 72,
      code: 1,
      isDay: true,
      highF: 80,
      lowF: 60,
      city: "Huntington Beach",
      today: "2026-01-05",
      timezone: "America/Los_Angeles",
      daily: [],
    };
    expect(weather.timezone).toBe("America/Los_Angeles");
  });

  it("accepts a null timezone for a payload where Open-Meteo didn't return one", () => {
    const weather: CurrentWeather = {
      tempF: 72,
      code: 1,
      isDay: true,
      highF: 80,
      lowF: 60,
      city: "Huntington Beach",
      timezone: null,
      daily: [],
    };
    expect(weather.timezone).toBeNull();
  });
});

// The route still bakes "°F" into the title for older clients, but sends the
// headline and raw Fahrenheit beside it so the dashboard can follow the
// weather strip's F/C toggle.
describe("alertTitle", () => {
  const heat: HomeAlert = {
    kind: "heat",
    title: "Heat wave in 3 days (98°F)",
    headline: "Heat wave in 3 days",
    tempF: 98,
    detail: "Change your AC filter.",
  };
  const freeze: HomeAlert = {
    kind: "freeze",
    title: "Freeze coming tomorrow (31°F)",
    headline: "Freeze coming tomorrow",
    tempF: 31,
    detail: "Let indoor faucets drip overnight.",
  };

  it("shows Fahrenheit exactly as the route wrote it", () => {
    expect(alertTitle(heat, "F")).toBe("Heat wave in 3 days (98°F)");
    expect(alertTitle(freeze, "F")).toBe("Freeze coming tomorrow (31°F)");
  });

  it("converts to whole Celsius from the raw value", () => {
    // 98F = 36.7C, 31F = -0.6C (rounds to -1).
    expect(alertTitle(heat, "C")).toBe("Heat wave in 3 days (37°C)");
    expect(alertTitle(freeze, "C")).toBe("Freeze coming tomorrow (-1°C)");
  });

  it("rewrites the title of an older payload that has no structured fields", () => {
    const old: HomeAlert = {
      kind: "heat",
      title: "Heat wave today (104°F)",
      detail: "",
    };
    expect(alertTitle(old, "C")).toBe("Heat wave today (40°C)");
    expect(alertTitle(old, "F")).toBe("Heat wave today (104°F)");
  });

  it("leaves a recall alone in both units", () => {
    const recall: HomeAlert = {
      kind: "recall",
      title: "Possible recall: Carrier furnace",
      detail: "Verify on CPSC.",
    };
    expect(alertTitle(recall, "C")).toBe(recall.title);
    expect(alertTitle(recall, "F")).toBe(recall.title);
  });
});

describe("localizeTempText", () => {
  it("converts every Fahrenheit reading in a sentence and nothing else", () => {
    expect(
      localizeTempText("Freeze coming in 2 days (28°F), 2 hoses out", "C")
    ).toBe("Freeze coming in 2 days (-2°C), 2 hoses out");
    expect(localizeTempText("Low of -4°F and 32°F later", "C")).toBe(
      "Low of -20°C and 0°C later"
    );
  });

  it("passes text through untouched in Fahrenheit or with no reading", () => {
    expect(localizeTempText("Heat wave (98°F)", "F")).toBe("Heat wave (98°F)");
    expect(localizeTempText("New message", "C")).toBe("New message");
  });
});
