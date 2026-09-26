"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

// A password box with the show/hide eye on its right edge. One component for
// every password field in the app (sign-in, both signups, reset, the account
// security panel) so the control looks and sits the same wherever a password
// is typed. Each box keeps its own shown/hidden state: revealing a new
// password should not also reveal the current one beside it.
//
// `leading` is an optional slot for a left-edge icon (the security panel's
// key/lock glyphs); the caller adds the matching left padding via className,
// exactly as it did on the plain input. The right padding for the eye is
// always applied here.
export default function PasswordInput({
  leading,
  className = "",
  ...input
}: InputHTMLAttributes<HTMLInputElement> & {
  leading?: ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      {leading}
      <input
        {...input}
        type={show ? "text" : "password"}
        className={`input pr-10 ${className}`.trim()}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        // Phone only: a slightly wider strip and a bigger glyph. The show/hide
        // toggle is how you check what you typed.
        className="focus-ring absolute inset-y-0 right-0 flex items-center px-3 text-stone-400 hover:text-stone-600 max-sm:px-3.5 dark:hover:text-stone-200"
      >
        {show ? (
          <EyeOff className="h-4 w-4 max-sm:h-5 max-sm:w-5" />
        ) : (
          <Eye className="h-4 w-4 max-sm:h-5 max-sm:w-5" />
        )}
      </button>
    </div>
  );
}
