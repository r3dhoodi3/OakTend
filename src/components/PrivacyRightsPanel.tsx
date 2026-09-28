import Link from "next/link";
import { CATEGORIES, THIRD_PARTIES } from "@/lib/privacy";
import EmailExportLinkButton from "@/components/EmailExportLinkButton";

// Your privacy rights: the one in-app surface for the California rights the
// Terms' governing law points at (CCPA/CPRA, Cal. Civ. Code 1798.100 et seq).
//
// Shared by the homeowner page (/account/privacy) and the pro page
// (/pro/privacy) for the same reason AccountSecurityPanel is shared: pros are
// bounced out of /account by the (app) layout, and two hand-maintained copies
// of a legal disclosure would drift. Only the links differ, so they're props.
//
// Two jobs. It explains each right in plain English, and - for the rights we
// can honour instantly - it gives the actual control rather than an address to
// write to: Download my data hits /api/privacy/export, and deletion links to
// the password-gated control on the caller's own security surface.
//
// The categories and third-party tables are imported from lib/privacy rather
// than retyped here, because the same lists are embedded in every export. One
// source of truth means the page and the file can't drift.

export default function PrivacyRightsPanel({
  // Where this side's password-gated delete + export controls live.
  securityHref,
  // Where this side edits its own identity details (right to correct).
  profileHref,
  profileLabel,
  // Monitored inbox for requests the buttons can't serve. Empty string drops
  // the row rather than rendering a dead mailto.
  contact,
  // This side's blocked-accounts list (/account/blocks or /pro/blocks).
  // Optional: omit it and the safety card below is simply not rendered.
  blocksHref,
  side = "homeowner",
  linkState = null,
}: {
  // Which side's page the "Email me a link" email points back to.
  side?: "homeowner" | "contractor";
  // Set by the page when it was opened from an emailed download link and the
  // link was checked against the signed-in account (verifyExportLink).
  linkState?: "ready" | "expired" | null;
  securityHref: string;
  profileHref: string;
  profileLabel: string;
  contact: string;
  blocksHref?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Your privacy rights
        </h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
          What OakTend collects, who we send it to, and how to get it, fix it, or
          delete it. For the full policy, see our{" "}
          <Link
            href="/privacy"
            className="font-medium text-bark-700 hover:underline dark:text-stone-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* Download. The right to know and the right to portability, honoured
          on the spot: the session is the verification. The PDF is the main
          format. "Email me a link" sends a signed, 24 hour link back to this
          page (src/lib/dataExportLink.ts). JSON stays available as a small
          secondary link because the right to portability asks for a
          machine-readable copy. */}
      <div className="card p-6">
        {linkState === "ready" && (
          <p
            role="status"
            className="mb-4 rounded-lg border border-green-300 bg-green-100 p-3 text-sm text-green-800 dark:border-green-500/30 dark:bg-green-500/15 dark:text-green-300"
          >
            Your download is ready. Tap Download PDF.
          </p>
        )}
        {linkState === "expired" && (
          <p
            role="status"
            className="mb-4 rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm text-stone-700 dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
          >
            That link has expired. You can still download below.
          </p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Download your data
            </p>
            <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
              Everything we hold for your account, as a PDF.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <a
              href="/api/privacy/export?format=pdf"
              download
              className="btn-primary whitespace-nowrap"
            >
              Download PDF
            </a>
            <EmailExportLinkButton side={side} />
          </div>
        </div>
        <p className="mt-3 text-xs text-stone-600 dark:text-stone-300">
          Moving your data to another service?{" "}
          <a
            href="/api/privacy/export?format=json"
            download
            className="font-medium text-bark-700 underline dark:text-stone-200"
          >
            Get a machine-readable copy (JSON)
          </a>
        </p>
      </div>

      {/* The rights themselves. */}
      <div className="card p-6">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-4 dark:border-white/10">
          <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
            Your rights as a California resident
          </h2>
        </div>
        <dl className="mt-5 space-y-5">
          <Right
            term="Know what we collect"
            detail="Ask what personal information we've collected about you, where it came from, why we collected it, and who we've sent it to. Download PDF above answers this right away."
          />
          <Right
            term="Get a copy you can take with you"
            detail="Receive your information in a portable, machine-readable format. That's the JSON copy linked under the download above."
          />
          <Right
            term="Delete your information"
            detail={
              <>
                Have us delete the personal information we collected from you.
                You can do this yourself from{" "}
                <Link
                  href={securityHref}
                  className="font-medium text-bark-700 hover:underline dark:text-stone-300"
                >
                  Account security
                </Link>
                . We may keep a narrow set of records the law requires us to
                keep, such as invoices and payment records.
              </>
            }
          />
          <Right
            term="Correct anything wrong"
            detail={
              <>
                Fix inaccurate personal information. Most of it you can edit
                directly:{" "}
                <Link
                  href={profileHref}
                  className="font-medium text-bark-700 hover:underline dark:text-stone-300"
                >
                  {profileLabel}
                </Link>{" "}
                covers your own details.
                {contact
                  ? " If something you can't edit is wrong, email us."
                  : ""}
              </>
            }
          />
          <Right
            term="Opt out of sale or sharing"
            detail="OakTend does not sell your personal information, and does not share it for cross-context behavioral advertising. There are no advertising trackers on this site. We use one cookieless page-view counter from our hosting provider. Because there is nothing to opt out of, there is no Do Not Sell or Share link."
          />
          <Right
            term="Limit how we use sensitive information"
            detail="Some of what you give us is sensitive: your home's precise location, financial details, and the contents of your messages. We use these only to provide OakTend itself - matching you with pros, running your maintenance plan, delivering your messages - never to infer characteristics about you and never for advertising. That is already the limited use this right entitles you to."
          />
          <Right
            term="No retaliation"
            detail="We will never deny you service, charge you a different price, or give you a worse experience for exercising any of these rights."
          />
        </dl>
      </div>

      {/* Categories collected. */}
      <details className="card group p-6">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 max-sm:min-h-11 [&::-webkit-details-marker]:hidden">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              What we collect and why
            </h2>
            {/* Notice at collection stays visible with the list closed: the
                category names are always shown, the details open below. */}
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
              {collectedSummary()} Open for examples, where each comes from,
              and why we use it.
            </p>
          </div>
          <span
            aria-hidden="true"
            className="text-stone-600 transition-transform group-open:rotate-180 dark:text-stone-300"
          >
            &#9662;
          </span>
        </summary>
        <div className="mt-4 border-t border-stone-100 dark:border-white/10" />
        <p className="mt-4 text-sm text-stone-600 dark:text-stone-300">
          We keep each of these for as long as your account is open. Deleting
          your account removes it, aside from a narrow set of records we&apos;re
          required to keep, such as invoices and payment records.
        </p>
        <div className="mt-5 space-y-5">
          {CATEGORIES.map((c) => (
            <div key={c.category}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {c.category}
                </p>
                {c.sensitive && <span className="chip chip-warn">Sensitive</span>}
              </div>
              <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
                {c.examples}
              </p>
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-300">
                <span className="font-medium">Where it comes from:</span>{" "}
                {c.source}
              </p>
              <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-300">
                <span className="font-medium">Why we use it:</span> {c.purpose}
              </p>
            </div>
          ))}
        </div>
      </details>

      {/* Third parties. */}
      <details className="card group p-6">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 max-sm:min-h-11 [&::-webkit-details-marker]:hidden">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100">
              Who else sees your information
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
              Service providers that run parts of OakTend for us, and the pros
              you contact. No one buys your data. Open for the list.
            </p>
          </div>
          <span
            aria-hidden="true"
            className="text-stone-600 transition-transform group-open:rotate-180 dark:text-stone-300"
          >
            &#9662;
          </span>
        </summary>
        <div className="mt-4 border-t border-stone-100 dark:border-white/10" />
        <p className="mt-4 text-sm text-stone-600 dark:text-stone-300">
          These companies process data on OakTend&apos;s behalf so the product can
          work. Each is limited by contract to doing only what we ask. None of
          them buys your data, and none of them is an advertising network.
        </p>
        <div className="mt-5 space-y-4">
          {THIRD_PARTIES.map((t) => (
            <div key={t.name}>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {t.name}{" "}
                <span className="font-normal text-stone-600 dark:text-stone-300">
                  &middot; {t.role}
                </span>
              </p>
              <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
                {t.receives}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-stone-600 dark:text-stone-300">
          If you post a job, the pros you talk to see your name, contact
          details, address, and what you wrote.
        </p>
      </details>

      {/* Safety controls. Not a privacy right under the CPRA, but this is the
          page people land on when they want to be left alone, and "who can
          reach me" belongs next to "what is held about me". */}
      {blocksHref && (
        <div className="card p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Blocked accounts
              </p>
              <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
                Someone you block cannot message you, and you will not be shown
                to each other for new work. You can undo it any time.
              </p>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
                To report content or behaviour instead,{" "}
                <Link
                  href="/contact?topic=abuse"
                  className="underline hover:text-stone-600 dark:hover:text-stone-300"
                >
                  tell us what happened
                </Link>
                .
              </p>
            </div>
            <Link href={blocksHref} className="btn-secondary whitespace-nowrap">
              Manage blocks
            </Link>
          </div>
        </div>
      )}

      {/* Anything the buttons can't do. */}
      {contact && (
        <div className="card p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Something else?
              </p>
              <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
                Email us for anything the controls above don&apos;t cover,
                including a request made on your behalf by someone you&apos;ve
                authorized. We&apos;ll confirm we got it within 10 business
                days and answer within 45.
              </p>
            </div>
            <a
              href={`mailto:${contact}?subject=${encodeURIComponent("California privacy request")}`}
              className="btn-secondary whitespace-nowrap"
            >
              Email us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function Right({
  term,
  detail,
}: {
  term: string;
  detail: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-sm font-semibold text-stone-900 dark:text-stone-100">
        {term}
      </dt>
      <dd className="mt-0.5 text-sm text-stone-600 dark:text-stone-300">
        {detail}
      </dd>
    </div>
  );
}

// "Identifiers, account credentials, ... and abuse-prevention identifiers."
// Built from the same CATEGORIES list the details use, so the always-visible
// line can never drift from them.
function collectedSummary(): string {
  const names = CATEGORIES.map((c, i) =>
    i === 0 ? c.category : c.category.charAt(0).toLowerCase() + c.category.slice(1)
  );
  if (names.length <= 1) return `${names[0] ?? ""}.`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}.`;
}
