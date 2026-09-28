// Shared numbers for household QR invites, read by the server action that
// mints a code and by the client component that shows it. A "use server"
// file may only export async functions, so constants the client also needs
// live here.

// Every code lives this long from the moment it is made. No rolling refresh:
// when it runs out the household tab offers a "New code" button.
export const QR_TOKEN_LIFETIME_SECONDS = 10 * 60;

// Opening the link while the code is still live gives THAT browser this much
// time from the open to finish joining (a new account has to sign up first).
// Nobody else gets it: see src/lib/qrScanProof.ts and migration 0174.
export const QR_SCAN_GRACE_SECONDS = 30 * 60;

// "9:05" style countdown text for the seconds left on a code.
export function formatCountdown(secondsLeft: number): string {
  const s = Math.max(0, Math.floor(secondsLeft));
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
