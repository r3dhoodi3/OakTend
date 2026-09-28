"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mintHouseholdQrTokenAction } from "./actions";
import InlineSpinner from "@/components/InlineSpinner";
import { formatCountdown } from "@/lib/householdQr";

// QR invite for one home's household tab. Mints one code on mount. Each code
// lives 10 minutes from when it was made (QR_TOKEN_LIFETIME_SECONDS in
// src/lib/householdQr.ts) and the card shows the time left. When it runs out
// the code is hidden and a "New code" button takes its place; nothing
// re-mints on a loop in the background. The real expiry is enforced server
// side by redeem_household_invite_token(), which checks expires_at itself.
export default function HouseholdQrCode({ propertyId }: { propertyId: string }) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [joinUrl, setJoinUrl] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const mountedRef = useRef(true);
  // Guards against a second mint racing the first (React's dev double mount,
  // a double tap on "New code").
  const inFlightRef = useRef(false);

  const mint = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setError(null);
    setPending(true);
    try {
      const result = await mintHouseholdQrTokenAction(propertyId);
      if (!mountedRef.current) return;
      if (!result.ok) {
        setError(result.error);
        return;
      }
      if (!result.data) {
        setError("Couldn't create an invite code. Try again.");
        return;
      }
      const expiresMs = new Date(result.data.expiresAt).getTime();
      // Loaded on demand so the encoder stays out of the account route's
      // first-load JS for everyone who never opens this tab.
      const { default: QRCode } = await import("qrcode");
      const dataUrl = await QRCode.toDataURL(result.data.joinUrl, {
        margin: 1,
        width: 240,
      });
      if (!mountedRef.current) return;
      setJoinUrl(result.data.joinUrl);
      setExpiresAt(expiresMs);
      setNow(Date.now());
      setQrDataUrl(dataUrl);
    } catch {
      if (!mountedRef.current) return;
      setError("Couldn't create an invite code. Try again.");
    } finally {
      inFlightRef.current = false;
      if (mountedRef.current) setPending(false);
    }
  }, [propertyId]);

  useEffect(() => {
    mountedRef.current = true;
    mint();
    return () => {
      mountedRef.current = false;
    };
  }, [mint]);

  // One-second tick for the countdown, only while a live code is showing.
  const expired = expiresAt != null && now >= expiresAt;
  useEffect(() => {
    if (expiresAt == null || expired) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [expiresAt, expired]);

  async function copyLink() {
    if (!joinUrl) return;
    try {
      await navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // No clipboard: the link is still shown as selectable text below.
    }
  }

  const showCode = qrDataUrl && !expired && !error;
  const secondsLeft = expiresAt != null ? (expiresAt - now) / 1000 : 0;

  return (
    <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-5 text-center dark:border-white/10 dark:bg-stone-800">
      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
        Scan to join this home
      </p>

      {showCode ? (
        // eslint-disable-next-line @next/next/no-img-element -- a client-generated data: URI, so there is no URL for next/image to optimize
        <img
          src={qrDataUrl}
          alt="QR code to join this home"
          className="mx-auto mt-3 h-48 w-48 rounded-lg border border-stone-100 bg-white p-2 dark:border-white/10"
          width={192}
          height={192}
        />
      ) : (
        <div className="mx-auto mt-3 flex h-48 w-48 flex-col items-center justify-center gap-3 rounded-lg border border-stone-200 text-sm text-stone-600 dark:border-white/10 dark:text-stone-300">
          {pending ? (
            <>
              <InlineSpinner />
              <span>Making a code...</span>
            </>
          ) : expired && !error ? (
            <>
              <span>This code expired.</span>
              <button
                type="button"
                onClick={() => mint()}
                className="btn-primary text-sm"
              >
                New code
              </button>
            </>
          ) : (
            <span>{error ? "Unavailable" : "Making a code..."}</span>
          )}
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-700 dark:text-red-300">
          {error}{" "}
          <button
            type="button"
            onClick={() => mint()}
            disabled={pending}
            className="inline-flex items-center justify-center gap-1.5 font-medium underline"
          >
            {pending && <InlineSpinner size={12} />}
            Try again
          </button>
        </p>
      )}

      {showCode && (
        <>
          <p
            className="mt-3 text-sm text-stone-600 dark:text-stone-300"
            aria-live="off"
          >
            Expires in {formatCountdown(secondsLeft)}
          </p>
          {joinUrl && (
            <div className="mt-3 flex flex-col items-center gap-2">
              <p className="break-all text-xs text-stone-600 dark:text-stone-300">
                {joinUrl}
              </p>
              <button
                type="button"
                onClick={copyLink}
                className="text-sm font-medium text-bark-700 underline dark:text-stone-200"
              >
                {copied ? "Link copied" : "Copy link"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
