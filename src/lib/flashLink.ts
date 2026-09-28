// Shared, dependency-free validation for the optional link a toast can carry.
//
// Lives in its own module (not src/lib/flash.ts) because flash.ts imports
// next/headers and must never reach the browser bundle, while FlashToast reads
// the same cookie on the client and has to run the same check. The flash cookie
// is user-writable, so the client side cannot trust what the server wrote.
//
// Only same-site relative paths are allowed: must start with "/", must not
// start with "//" (protocol-relative, would leave the site) and must not
// contain a backslash (some browsers normalise "/\evil.com" into "//evil.com").
// Control characters and whitespace are refused for the same reason.

export const FLASH_LINK_LABEL_MAX = 24;
const FLASH_HREF_MAX = 200;

export function safeFlashHref(href: unknown): string | null {
  if (typeof href !== "string") return null;
  if (href.length === 0 || href.length > FLASH_HREF_MAX) return null;
  if (!href.startsWith("/")) return null;
  if (href.startsWith("//")) return null;
  if (href.includes("\\")) return null;
  // eslint-disable-next-line no-control-regex
  if (/[\s\u0000-\u001f\u007f]/.test(href)) return null;
  return href;
}

// A short visible label for the link. Falls back to "View" so a link is never
// an unlabelled target.
export function safeFlashLinkLabel(label: unknown): string {
  if (typeof label !== "string") return "View";
  const trimmed = label.trim();
  if (!trimmed) return "View";
  return trimmed.slice(0, FLASH_LINK_LABEL_MAX);
}
