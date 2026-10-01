// The walkthrough's "Install year or age" box takes either a 4-digit year
// (2015) or an age in years (10), since "about 10 years old" is what most
// owners actually know.
//
// A year uses the same 1700-2100 range as the profile edit and the vision
// route (properties.year_built accepts back to 1700, so an 1885 home keeps
// its year). Number.isFinite screens out NaN, which would otherwise slip
// through a ?? fallback (NaN is not nullish) and null out a good value.
// Lives outside actions.ts because a "use server" file may only export async
// functions.
export function parseInstallYear(
  raw: string | null,
  now: Date = new Date()
): number | null {
  if (raw == null || raw.trim() === "") return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return null;
  const whole = Math.trunc(n);
  if (whole >= 1700 && whole <= 2100) return whole;
  if (whole <= 150) return now.getFullYear() - whole;
  return null;
}
