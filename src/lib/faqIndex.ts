// A small, shippable FAQ index the top-nav search can match against as you
// type. Every answer here is copied from (or built from the same constants as)
// a live page, never invented: the homeowner help FAQ
// (src/app/(app)/account/help/page.tsx), the public pricing page
// (src/app/pricing/page.tsx), the pro help page (src/app/pro/help/HelpView.tsx),
// the /pros marketing page, and the canonical guarantee sentences in
// src/lib/guaranteeCopy.ts. Numbers are read from src/lib/constants.ts so a
// price or limit change moves here automatically instead of drifting.
//
// Kept deliberately tiny (about two dozen entries, one to three sentences
// each) so it can ship in the client bundle and answer instantly with no
// network round trip. Matching lives in src/lib/searchSuggestions.ts.

import {
  FREE_ASK_PER_DAY,
  PLUS_INCLUDED_HOMES,
  PLUS_PLAN,
  PRO_PLAN,
} from "@/lib/constants";
import {
  NO_BIDDING_WARS_LINE,
  NO_CONTRACT_LINE,
} from "@/lib/guaranteeCopy";
import { isHomeownerPreview } from "@/lib/previewMode";

// Which side of the app an entry belongs to. "both" entries surface in the
// homeowner search and the pro search alike.
export type FaqSide = "homeowner" | "pro" | "both";

export type FaqEntry = {
  question: string;
  // One to three plain sentences, consistent with the live page the entry was
  // mined from. Rendered inline in the search dropdown when selected.
  answer: string;
  // Extra match words beyond the question's own, so "cost" finds pricing and
  // "ghost" finds the never-responded guarantee.
  keywords: string[];
  side: FaqSide;
  // Where "read more" goes when there is a real page to land on.
  href?: string;
};

export const FAQ_INDEX: FaqEntry[] = [
  // ---- Homeowner ----
  {
    question: "Is OakTend free?",
    answer: isHomeownerPreview()
      ? "Yes. Everything is free during our preview, with no card. Memberships (OakTend Plus) are coming soon, and nothing can be bought yet."
      : "Your first home is free to track, with no card. OakTend Plus is an optional subscription for extra tools on top.",
    keywords: ["price", "pricing", "cost", "pay", "plan", "subscription"],
    side: "homeowner",
    href: "/pricing",
  },
  {
    // Conditional wording on purpose: trial availability depends on the
    // account (paywall experiment, src/lib/paywallExperiment.ts, plus normal
    // once-per-account eligibility), and this static index has no user
    // context. The plan picker itself always states the exact deal for the
    // account before any charge.
    question: "How does the OakTend Plus trial work?",
    answer: `When your account is offered the free trial, the first ${PLUS_PLAN.trialDays} days cost nothing and you can cancel before they end without being charged. The plan picker always shows your exact deal, and after any free days the plan renews at its own price until you cancel.`,
    keywords: ["trial", "free days", "billing", "renew", "plus"],
    side: "homeowner",
    href: "/pricing",
  },
  {
    question: "How do I cancel OakTend Plus?",
    answer:
      "You can cancel anytime from your account with one button, nothing to call or email. If your plan started with free trial days and you cancel during them you are never charged, and if you cancel later you keep Plus until the end of the period you already paid for.",
    keywords: ["cancel", "unsubscribe", "refund", "billing", "plus"],
    side: "homeowner",
    href: "/plus",
  },
  {
    question: "How many questions can I ask OakTend a day?",
    answer: `Ask OakTend is capped at ${FREE_ASK_PER_DAY} text questions a day on Free, so it stays fast and available for everyone. Plus raises that limit and adds photo answers.`,
    keywords: ["ask", "limit", "cap", "ai", "questions", "daily"],
    side: "homeowner",
    href: "/chats?lead=ask-oaktend",
  },
  {
    question: "What is Ask OakTend?",
    answer:
      "Ask OakTend is your home assistant. It answers questions using your own systems and their ages, reads photos of labels or documents, and can log issues, set reminders, and post jobs for you.",
    keywords: ["ask", "ai", "assistant", "chat", "help"],
    side: "homeowner",
    href: "/chats?lead=ask-oaktend",
  },
  {
    question: "How does OakTend know about my home?",
    answer:
      "When you claim your address, OakTend looks up public property records and builds a starter profile. You can add or edit your systems, their ages, and their condition at any time from the Home page.",
    keywords: ["claim", "address", "property", "records", "systems", "profile"],
    side: "homeowner",
    href: "/dashboard",
  },
  {
    question: "How do I get quotes from contractors?",
    answer: isHomeownerPreview()
      ? "Our pro network isn't open yet. You can post a job from the Post a Job page or ask OakTend to help, and it is saved to your home's record. During our preview the OakTend team may look for a local pro by hand, with no promise that we find one. Once pros open, they will message you in the app and any price they send in chat is captured so you can compare."
      : "Post a job from the Post a Job page or ask OakTend to help. Local pros can then message you, and any price they send in chat is captured so you can compare them side by side.",
    keywords: ["quote", "contractor", "pro", "hire", "estimate", "job"],
    side: "homeowner",
    href: "/contractors",
  },
  {
    question: "Is my data private?",
    answer:
      "Your home data is yours. Your home's record is private to your account and the people you share it with, and you can delete your account at any time from Account > Privacy. A few records, like invoices, are kept where the law requires it, as our Privacy Policy explains.",
    keywords: ["privacy", "data", "delete", "security", "sell"],
    side: "homeowner",
    href: "/account/privacy",
  },
  {
    question: "How does OakTend decide when something needs maintenance?",
    answer:
      "OakTend uses your system's typical lifespan and the age you gave it to flag what is coming due.",
    keywords: ["maintenance", "reminder", "schedule", "due", "lifespan"],
    side: "homeowner",
    href: "/guides/orange-county-home-maintenance-checklist",
  },
  {
    question: "How do I know if a contractor's quote is fair?",
    answer:
      "Ask OakTend to read the quote with you, or check it against the red flags in our guide.",
    keywords: ["quote", "fair", "price", "overcharge", "analyzer"],
    side: "homeowner",
    href: "/guides/is-my-contractor-quote-fair",
  },
  {
    question: "How many homes can I track?",
    answer: `Your first home is free. OakTend Plus lets you track up to ${PLUS_INCLUDED_HOMES} homes in one place.`,
    keywords: ["homes", "multiple", "properties", "second", "rental"],
    side: "homeowner",
    href: "/pricing",
  },

  // ---- Pro ----
  {
    question: "How much does OakTend charge pros?",
    answer:
      "Nothing to apply, quote, or message a homeowner. OakTend charges a 5% success fee (minimum $15, capped at $1,000) only when a homeowner hires you for the job. During the preview period, nothing is charged at all.",
    keywords: ["lead", "price", "pricing", "fee", "fees", "cost", "apply", "success fee", "how much"],
    side: "pro",
    href: "/pro/help#lead-pricing",
  },
  {
    question: "What if the homeowner never responds?",
    answer:
      "Nothing changes for you: you never pay to apply or message, so a homeowner who goes quiet costs you nothing.",
    keywords: ["ghost", "respond", "guarantee"],
    side: "pro",
    href: "/pro/help",
  },
  {
    question: "What if the homeowner picks someone else?",
    answer:
      "Nothing changes for you there either: applying and messaging are always free, so it costs you nothing if they choose another pro. The 5% success fee only applies if a job you're on becomes a hire through OakTend.",
    keywords: ["lost", "lose", "picked", "chosen", "guarantee"],
    side: "pro",
    href: "/pro/help",
  },
  {
    question: "Is there a contract or a fee just to be listed?",
    answer: NO_CONTRACT_LINE,
    keywords: ["contract", "listed", "subscription", "commitment", "sign"],
    side: "pro",
    href: "/pro/help",
  },
  {
    question: "Do I bid against other pros?",
    answer: NO_BIDDING_WARS_LINE,
    keywords: ["bid", "bidding", "auction", "compete", "flat"],
    side: "pro",
    href: "/pro/leads",
  },
  {
    question: "How does license verification work?",
    answer:
      "We check your license number against the state's public database and show homeowners a verified badge on your public profile page. Free, not a membership perk.",
    keywords: ["license", "cslb", "verified", "badge", "check"],
    side: "pro",
    href: "/pro/profile",
  },
  {
    question: "Do I need to upload insurance?",
    answer:
      "Big-ticket jobs (roofing, structural, remodeling) need current proof of insurance on file before you can apply. Upload it once in Business, and you get a heads-up before it expires. Everything else works without it.",
    keywords: ["insurance", "insured", "compliance", "expire", "upload", "big job", "major"],
    side: "pro",
    href: "/pro/business",
  },
  {
    question: "What does Pro membership get me?",
    // Price and trial length come from PRO_PLAN (src/lib/constants.ts), the
    // one place these numbers live, instead of being retyped as literals
    // here where they could silently drift out of sync with a real change.
    answer: `Pro membership costs $${PRO_PLAN.monthly.toFixed(2)} a month or $${PRO_PLAN.yearly.toFixed(2)} a year, with a ${PRO_PLAN.trialDays}-day free trial. It does not change whether you can apply to a job or the 5% success fee, but members get priority support. Cancel from your account any time, no penalty.`,
    keywords: ["membership", "member", "plus", "perks", "subscribe", "price"],
    side: "pro",
    href: "/pro/plus",
  },

  // ---- Both sides ----
  {
    question: "How do I switch between my home and my business?",
    answer:
      "Open the profile menu at the top right and choose the switch entry. Each side keeps its own pages, messages, and settings.",
    keywords: ["switch", "side", "business", "homeowner", "account", "toggle"],
    side: "both",
  },
  {
    question: "How do I report a bug or reach support?",
    answer:
      "Send a message from the Help page in the profile menu and we will get back to you. Bug reports go through the same form.",
    keywords: ["bug", "support", "contact", "help", "problem", "broken"],
    side: "both",
  },
];
