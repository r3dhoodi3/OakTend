// The `native` class on <html> (2026-10-02, iOS native-feel pass).
//
// Every native-only style in globals.css hangs off `html.native`: the top
// safe-area padding on the sticky headers, no long-press callouts on UI
// chrome, no whole-page rubber band. The class is added ONLY inside the
// Capacitor iOS/Android shell, so a normal browser tab (phone or desktop)
// never matches a single one of those rules and renders exactly as before.
//
// Same signal as isNativeApp() in src/lib/platform.ts: Capacitor's injected
// bridge object, window.Capacitor, answering isNativePlatform() === true. In
// the shell, Capacitor injects that object as a document-start user script,
// before any of the page's own scripts run, so the inline <head> script below
// can read it before first paint and the header never flashes under the
// status bar. A browser tab has no window.Capacitor at all, so the script is a
// no-op there.
//
// No "use client" on purpose: the root layout (a server component) imports
// the script string, and a plain value exported from a "use client" module
// reads as undefined on the server (see src/lib/nativeHeaderName.ts).
//
// UI hint only, like isNativeApp(): a class anyone can add in dev tools is
// never a security or billing signal.

export const NATIVE_CLASS = "native";

/**
 * Inline <head> script, same shape as themeInit in src/app/layout.tsx:
 * synchronous, self-contained, never throws.
 */
export const NATIVE_CLASS_INIT_SCRIPT = `(function () {
  try {
    var cap = window.Capacitor;
    if (!cap || typeof cap.isNativePlatform !== "function" || cap.isNativePlatform() !== true) return;
    var h = document.documentElement;
    h.classList.add("${NATIVE_CLASS}");
    var p = typeof cap.getPlatform === "function" ? cap.getPlatform() : null;
    if (p === "ios" || p === "android") h.setAttribute("data-platform", p);
  } catch (e) {}
})();`;

/**
 * Runtime twin of the inline script, called from NativeBootstrap's mount
 * effect as a backstop (for example if the bridge was injected late). The
 * caller passes whether it is native so this stays a pure DOM helper.
 */
export function applyNativeShellClass(
  isNative: boolean,
  platform: "ios" | "android" | null,
  root: HTMLElement = document.documentElement
): void {
  if (!isNative) return;
  root.classList.add(NATIVE_CLASS);
  if (platform) root.setAttribute("data-platform", platform);
}
