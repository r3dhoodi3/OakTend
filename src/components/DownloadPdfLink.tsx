"use client";

import { useEffect, useRef, useState } from "react";
import InlineSpinner from "@/components/InlineSpinner";

// "Download PDF" for the data export. A plain download link gives no sign
// that anything is happening while the server builds the PDF, so after a tap
// it shows a spinner and "Preparing PDF..." for a few seconds. The browser's
// own download UI takes over from there; the link stays a real link, so it
// still works with scripts off.
export default function DownloadPdfLink({
  href,
  className,
}: {
  href: string;
  className: string;
}) {
  const [pending, setPending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  return (
    <a
      href={href}
      download
      aria-busy={pending || undefined}
      onClick={() => {
        setPending(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setPending(false), 5000);
      }}
      className={`${className} inline-flex items-center justify-center gap-2`}
    >
      {pending && <InlineSpinner size={14} />}
      {pending ? "Preparing PDF..." : "Download PDF"}
    </a>
  );
}
