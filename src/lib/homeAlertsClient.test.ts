import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchHomeAlerts, type CurrentWeather } from "./homeAlertsClient";

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
