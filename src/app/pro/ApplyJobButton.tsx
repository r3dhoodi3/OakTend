"use client";

import { markPushMoment } from "@/lib/pushPrompt";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Sparkles } from "lucide-react";
import InlineSpinner from "@/components/InlineSpinner";
import { applyToJobAction } from "./actions";
import {
  readComposeDraft,
  saveComposeDraftDebounced,
  clearComposeDraft,
} from "@/lib/proComposeDraft";
import { fetchWithTimeout, isTimeoutError } from "@/lib/fetchWithTimeout";

// Submit button for the confirm form below. Needs its own component because
// useFormStatus only reports pending state inside a descendant of the <form>
// it belongs to, not the component rendering the form itself.
function SendApplicationButton() {
  const { pending } = useFormStatus();
    // Applying to a job is exactly the moment the push prompt is allowed to
    // appear: the pro now has a bid in and wants to know the second the
    // homeowner replies. markPushMoment only stamps localStorage; the prompt
    // itself decides whether to ask (see src/lib/pushPrompt.ts). Fired on the
    // tap rather than on a success callback because this is a plain server-
    // action form with no client success state - a rare failure means at worst
    // one prompt shown a moment early.
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={() => markPushMoment()}
      className="btn-primary flex-1 text-sm"
    >
      {pending && <InlineSpinner />}
      Send application
    </button>
  );
}

// Quick-apply starter templates: plain string substitution, no AI and no cost.
// They prefill the textarea so a pro can tap one, then personalize before
// sending. Kept short and generic on purpose: the pro's own message is what
// actually persuades a homeowner, these just remove the blank-page problem.
function quickApplyTemplates(category: string): { label: string; text: string }[] {
  return [
    {
      label: "Available this week",
      text: `Hi, I do ${category} work in your area and can take a look this week. A couple of questions first: `,
    },
    {
      label: "Can start right away",
      text: `Hi, I do ${category} work in your area and can start right away if you're ready. A couple of questions first: `,
    },
    {
      label: "Happy to give a free estimate",
      text: `Hi, I do ${category} work in your area and I'm happy to come give you a free estimate. A couple of questions first: `,
    },
    {
      label: "Done a lot of this nearby",
      text: `Hi, I've done a lot of ${category} work in your neighborhood and would be glad to help with yours too. A couple of questions first: `,
    },
    {
      label: "Happy to talk it through by phone",
      text: `Hi, I do ${category} work in your area. Happy to hop on a quick call first to talk through options if that's easier than typing. A couple of questions first: `,
    },
  ];
}

// Apply to an open job.
//
// APPLYING IS FREE as of migration 0172 - OakTend takes 5% of a paid invoice
// instead of charging per lead. Everything this component used to carry about
// money is gone with it: the price on the button, the struck-through
// member/aging/intro discounts, the "Pro members pay $X" line, the
// insufficient-balance branch that sent a pro to the deposit page, the
// ghost-protection credit-back promise, and the Cal. B&P 17538 pre-purchase
// disclosure (there is no purchase left to disclose).
//
// The confirm step STAYS. It is not a payment gate any more - it is where the
// pro writes the note the homeowner actually reads, which is the whole of what
// wins a job now.
export default function ApplyJobButton({
  leadId,
  category,
}: {
  leadId: string;
  // Job category label (already resolved via labelFor on the board), used to
  // personalize the quick-apply templates. Optional so nothing breaks if a
  // caller doesn't have it handy; the templates just fall back to "this".
  category?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState("");
  const [drafting, setDrafting] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Autosave (CR5#4): a dropped signal or a backgrounded app on a job site
  // must not lose a note a pro already typed. Restored once on mount, saved
  // debounced as the textarea below changes, cleared once the form actually
  // submits (near the confirm form's onSubmit).
  useEffect(() => {
    const draft = readComposeDraft("apply", leadId);
    if (draft) setMessage((current) => (current ? current : draft));
  }, [leadId]);

  // Prefill from a quick-apply template, then move the cursor to the end so
  // the pro can keep typing right where the template left off (never
  // auto-sends: this only touches the textarea's value). A hand-typed
  // message is never silently discarded: swapping between untouched
  // templates is free, but replacing custom text asks first.
  function applyTemplate(text: string) {
    const current = message.trim();
    const isTemplate = quickApplyTemplates(category || "this").some(
      (t) => t.text.trim() === current
    );
    if (current && !isTemplate) {
      const ok = window.confirm(
        "Replace the message you've written with this template?"
      );
      if (!ok) return;
    }
    setMessage(text);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.selectionStart = el.selectionEnd = text.length;
    });
  }

  // Ask the drafter route for a first-pass apply message and drop it into the
  // textarea, still fully editable. Errors show inline and never block typing
  // a message by hand.
  async function draftForMe() {
    setDrafting(true);
    setDraftError(null);
    try {
      // Timeout-guarded: a hung drafting call must not strand the button in
      // its busy state with no way to retry.
      const resp = await fetchWithTimeout("/api/draft-apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      if (resp.status === 401) {
        setDraftError("Please sign in and try again.");
        return;
      }
      const data = await resp.json().catch(() => ({}));
      if (data?.message) {
        setMessage(data.message as string);
      } else if (data?.reason === "locked") {
        // The business is not verified yet; copy comes from the server.
        setDraftError(
          data?.error || "Drafting opens once your business is verified."
        );
      } else if (data?.reason === "rate_limited") {
        setDraftError(
          "You've hit today's drafting limit. It resets at midnight."
        );
      } else if (data?.reason === "busy") {
        // A burst window or an owner-wide ceiling, not this pro's own daily
        // allowance. Saying "you've hit today's limit" for it sent pros to
        // billing over a few seconds' wait. Copy comes from the server
        // (src/lib/aiReason.ts); the fallback covers an older reply.
        setDraftError(data?.error || "Give it a minute and try again.");
      } else if (data?.reason === "no_key") {
        setDraftError("Can't draft right now. Try again in a minute.");
      } else {
        setDraftError(
          data?.error || "Couldn't draft a message. Try writing your own."
        );
      }
    } catch (e) {
      setDraftError(
        isTimeoutError(e)
          ? "That took too long. Try again."
          : "Something went wrong. Please try again."
      );
    } finally {
      setDrafting(false);
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        // Usage analytics: the lead card's Apply button, which OPENS the
        // confirm step rather than sending anything. The pro_apply event
        // (server-side) counts the applications that actually completed, so
        // these two together show how many pros open the note box and never
        // send it.
        data-track="lead_apply"
        className="btn-primary text-sm"
      >
        Apply
      </button>
    );
  }

  return (
    <form
      action={applyToJobAction}
      // The draft's job is done the moment this submits (CR5#4 autosave).
      onSubmit={() => clearComposeDraft("apply", leadId)}
      className="space-y-2 rounded-lg border border-stone-200 bg-stone-50 p-3 dark:border-white/10 dark:bg-stone-900"
    >
      <input type="hidden" name="id" value={leadId} />
      <div className="flex flex-wrap gap-1.5">
        {quickApplyTemplates(category || "this").map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => applyTemplate(t.text)}
            // Phone only: .chip is py-0.5 text-xs, about 20px tall, and
            // these chips fill the application message.
            className="chip border border-stone-200 bg-white text-stone-600 hover:border-bark-500 hover:text-bark-700 max-sm:min-h-11 max-sm:px-3 max-sm:text-sm dark:border-white/10 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-bark-500 dark:hover:text-stone-300"
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Phone only: a full-width, clearly-labelled button above the message
          box replaces the old small text link below it - a pro skimming the
          confirm card on a phone kept missing that AI drafting existed at
          all. Desktop keeps the original small link in its original spot
          (rendered again below the textarea), unchanged apart from the
          clearer label. */}
      <button
        type="button"
        onClick={draftForMe}
        disabled={drafting}
        className="btn-secondary w-full sm:hidden max-sm:min-h-11 max-sm:text-base"
      >
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        {drafting ? "Drafting..." : "Draft a message for me"}
      </button>
      <textarea
        ref={textareaRef}
        name="message"
        rows={3}
        // Phone only: grows past the old cramped 3-row/14px box to at least
        // 6 rows at 16px with roomier line spacing so a drafted message can
        // be read without zooming. No text-sm override here (unlike before)
        // lets .textarea's own text-base apply below sm; sm:text-sm in that
        // same class keeps the desktop box byte-identical.
        className="textarea w-full max-sm:min-h-40 max-sm:leading-relaxed"
        placeholder="Add a note to the homeowner (optional)"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          saveComposeDraftDebounced("apply", leadId, e.target.value);
        }}
      />
      <div className="flex flex-wrap items-center gap-2 max-sm:hidden">
        <button
          type="button"
          onClick={draftForMe}
          disabled={drafting}
          className="text-xs font-medium text-bark-700 hover:underline disabled:opacity-50 max-sm:inline-flex max-sm:min-h-11 max-sm:items-center max-sm:text-sm dark:text-stone-300"
        >
          {drafting ? "Drafting..." : "Draft a message for me"}
        </button>
      </div>
      {/* Matches the app's toast styling (see ToastProvider.tsx) so this reads
          as an error, not a stray line of text. This form lives inside a client
          component that isn't rendered from a server action, so it can't use
          the flash-cookie toast; a styled inline card is the smallest honest
          stand-in. */}
      {draftError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-800 dark:border-red-500/30 dark:bg-red-500/15 dark:text-red-300"
        >
          <span className="flex-1">{draftError}</span>
          <button
            type="button"
            onClick={() => setDraftError(null)}
            aria-label="Dismiss"
            // Phone only: a bare ~20px glyph is how you clear this error.
            className="shrink-0 text-red-400 hover:text-red-600 max-sm:flex max-sm:h-11 max-sm:w-11 max-sm:items-center max-sm:justify-center dark:text-red-500 dark:hover:text-red-400"
          >
            ✕
          </button>
        </div>
      )}
      {/* The price line, the discount chips, the "Pro members pay $X" nudge,
          the sentence naming the per-lead charge and its ghost-protection
          credit-back promise, the Cal. B&P 17538
          pre-purchase disclosure and the one-time big-ticket intro note all
          stood here. Applying is free (migration 0172), so every one of them
          described a charge that no longer happens. Nothing replaces them: a
          free action does not need a price explained. */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="btn-secondary text-sm"
        >
          Cancel
        </button>
        <SendApplicationButton />
      </div>
    </form>
  );
}
