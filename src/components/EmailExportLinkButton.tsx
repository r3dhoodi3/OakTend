"use client";

import { useState, useTransition } from "react";
import InlineSpinner from "@/components/InlineSpinner";
import { emailDataExportLinkAction } from "@/lib/privacyExportActions";

// Second option next to "Download PDF": email the signed-in person a link to
// the same download. Pending state while sending, then a plain confirmation.
export default function EmailExportLinkButton({
  side,
}: {
  side: "homeowner" | "contractor";
}) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "sent" | string>("idle");

  function send() {
    startTransition(async () => {
      try {
        const res = await emailDataExportLinkAction(side);
        setStatus(res.ok ? "sent" : res.error);
      } catch {
        setStatus("Couldn't send the email. Try again.");
      }
    });
  }

  if (status === "sent") {
    return (
      <p role="status" className="text-sm text-stone-600 dark:text-stone-300">
        Sent. Check your email for the link.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <button
        type="button"
        onClick={send}
        disabled={pending}
        className="btn-secondary whitespace-nowrap"
      >
        {pending && <InlineSpinner />}
        {pending ? "Sending..." : "Email me a link"}
      </button>
      {status !== "idle" && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-300">
          {status}
        </p>
      )}
    </div>
  );
}
