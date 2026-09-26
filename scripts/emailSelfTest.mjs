#!/usr/bin/env node
// Send one real email through whichever provider is configured, and say
// exactly what the provider answered.
//
// WHY THIS EXISTS. Setting up a sender is a dashboard job with half a dozen
// ways to half-finish it: an unverified From, a proxied DNS record, a key
// with the wrong scope, a key pasted into the wrong Vercel environment. Every
// one of those fails the same way from inside the app - a notification that
// quietly never arrives - because sendEmail is best-effort by design and must
// never break the action it hangs off. This script is the opposite: it does
// the one send and prints the status code and the provider's own complaint.
//
// NOT USED BY THE APP. Nothing imports it, it ships no route, and it reads
// only env vars. The real sender is sendEmail in src/lib/notify.ts and stays
// the only thing that mails a customer; this deliberately duplicates the
// envelope rather than importing it, because importing "server-only" code
// into a plain node script is exactly the kind of setup friction it is here
// to remove.
//
//   node scripts/emailSelfTest.mjs you@example.com
//
// Reads .env.local if it is there, so it works with no shell setup. In CI or
// against production, export the vars instead.

import { readFileSync } from "node:fs";

// A deliberately small .env reader: KEY=value, ignores blanks, comments and
// the prose lines .env.local.example is full of. Does NOT expand variables or
// handle multi-line values - nothing needed here has them.
function loadEnvLocal() {
  let raw;
  try {
    raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  } catch {
    return;
  }
  for (const line of raw.split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue; // a real env var always wins
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

// Same parse as parseFromAddress in src/lib/notify.ts: "Name <a@b.c>" or a
// bare address.
function parseFrom(raw) {
  const match = /^\s*(.*?)\s*<\s*([^>]+?)\s*>\s*$/.exec(raw);
  if (!match) return { email: raw.trim() };
  const name = match[1].replace(/^"|"$/g, "").trim();
  return name ? { email: match[2], name } : { email: match[2] };
}

async function main() {
  const to = process.argv[2];
  if (!to || !to.includes("@")) {
    console.error("Usage: node scripts/emailSelfTest.mjs you@example.com");
    process.exit(2);
  }

  loadEnvLocal();

  const sendgridKey = process.env.SENDGRID_API_KEY;
  const sendgridFrom = process.env.SENDGRID_FROM;
  const resendKey = process.env.RESEND_API_KEY;
  // Optional, and worth testing for real: hit reply on the message this sends
  // and see where it goes. A Reply-To that points at a mailbox nobody reads is
  // invisible until a customer answers into it.
  const replyTo = process.env.EMAIL_REPLY_TO?.trim();

  // The same precedence sendEmail applies, restated out loud so a
  // misconfiguration is visible before anything is sent.
  if (sendgridKey && !sendgridFrom) {
    console.warn(
      "! SENDGRID_API_KEY is set but SENDGRID_FROM is not. SendGrid has no " +
        "sandbox sender, so the app treats this as unconfigured and falls " +
        "back to Resend. Set SENDGRID_FROM to a verified sender."
    );
  }

  const subject = "OakTend email self-test";
  const text =
    "If you are reading this, the sender is configured and DNS is doing its job.\n\n" +
    (replyTo
      ? `Hit reply: it should go to ${replyTo}, not to the From address.\n\n`
      : "No EMAIL_REPLY_TO is set, so a reply goes to the From address.\n\n") +
    `Sent ${new Date().toISOString()} by scripts/emailSelfTest.mjs.`;

  let response;
  let provider;
  if (sendgridKey && sendgridFrom) {
    provider = "sendgrid";
    console.log(`-> SendGrid, from ${sendgridFrom}, to ${to}`);
    response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: parseFrom(sendgridFrom),
        ...(replyTo ? { reply_to: parseFrom(replyTo) } : {}),
        subject,
        content: [{ type: "text/plain", value: text }],
      }),
    });
  } else if (resendKey) {
    provider = "resend";
    const from = process.env.RESEND_FROM || "OakTend <onboarding@resend.dev>";
    console.log(`-> Resend (fallback), from ${from}, to ${to}`);
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        // Resend takes the header as a plain string; SendGrid wants the two
        // halves apart. Same split as sendEmail.
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
    });
  } else {
    console.error(
      "No email provider configured. Set SENDGRID_API_KEY + SENDGRID_FROM " +
        "(or RESEND_API_KEY) in .env.local or the environment."
    );
    process.exit(1);
  }

  // Unlike the app, this prints the provider's own words: it is being run by
  // the person setting the account up, on purpose, about a message they
  // addressed themselves. There is no third-party recipient to protect here.
  const body = await response.text();
  console.log(`<- ${provider} HTTP ${response.status}`);
  if (body.trim()) console.log(body.trim());

  if (response.ok) {
    console.log(
      "\nAccepted. If it does not arrive in a minute, check the provider's " +
        "activity feed (SendGrid: Activity) for a drop, a bounce, or a spam " +
        "report - acceptance is not delivery."
    );
    process.exit(0);
  }

  // The failures worth naming, because each one has a specific fix and none
  // of them is obvious from the status code alone.
  if (response.status === 401 || response.status === 403) {
    console.error(
      "\n401/403 usually means one of:\n" +
        "  - the API key is wrong, or was revoked\n" +
        "  - the key lacks the Mail Send scope\n" +
        "  - the From address is not a verified sender on that account"
    );
  }
  process.exit(1);
}

main().catch((e) => {
  console.error("Request failed before the provider answered:", e?.message ?? e);
  process.exit(1);
});
