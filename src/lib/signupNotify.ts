import "server-only";
import { after } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { deliverPlainEmail } from "@/lib/notify";
import { allowOutboundSend, outboundDisabled, stripControlChars } from "@/lib/outboundGuards";
import { isInternalUser } from "@/lib/internalAccounts";

// Tells the owner, by email, that somebody just created an OakTend account.
//
// WHERE IT FIRES. src/app/(auth)/recordTermsAcceptance.ts, for the two
// initial-signup docs ("terms" and "pro_terms"). That function is the one
// place every signup path reaches at the moment the account exists: the two
// signup pages (email and password, confirmation off), /auth/callback (email
// confirmation on, and Google or Apple through either signup door), the
// email-code screen, and the /welcome/role picker (Google or Apple with no
// side chosen yet). Hooking there covers every method without touching any
// of those files.
//
// WHAT IT SENDS. Account type, a first name, a city if one is already known,
// the sign-in method, a Pacific-time timestamp and the running account total.
// Never the email address, phone, street address or anything else about the
// person: this lands in a forwarded Gmail inbox, which is third-party
// retention we do not control. The builder below takes only those six fields,
// so a future edit cannot leak something by accident without changing its
// signature.
//
// ONCE PER ACCOUNT. recordTermsAcceptance is called more than once for the
// same signup on purpose (the signup page and /auth/callback both call it, a
// confirmation link can be opened twice, onboarding re-records as a
// backstop), and a homeowner who later adds the pro side records "pro_terms"
// for the first time months after signing up. Two guards, both required:
//   1. the auth account must have been created in the last
//      RECENT_SIGNUP_WINDOW_MS, so a later side-add or backfill is never a
//      "new signup";
//   2. an atomic claim on the rate_limits table (0070), keyed on the user id
//      with a limit of 1, so the two near-simultaneous entry points cannot
//      both send. The claim lives in the database, not in a read-then-write,
//      so it cannot race.
//
// NEVER THROWS, NEVER BLOCKS. scheduleOwnerSignupNotify hands the work to
// next/server after(), the same pattern the Stripe Connect account creation
// in src/app/pro/actions.ts uses, so the person signing up waits on none of
// it. Every failure is a log line.
//
// DORMANT UNTIL CONFIGURED. With OWNER_NOTIFY_EMAIL unset this returns before
// any database read. It also needs the email provider env vars that
// src/lib/notify.ts reads (SENDGRID_API_KEY + SENDGRID_FROM, or the older
// RESEND_API_KEY), and it honors OUTBOUND_DISABLED and the per-process send
// cap like every other email. Internal / test accounts (users.is_internal,
// migration 0165) are skipped.
//
// A flood guard on top: at most OWNER_NOTIFY_MAX_PER_HOUR alerts per hour
// across all signups, so a signup bot cannot turn the owner's inbox into the
// thing under attack.

export const RECENT_SIGNUP_WINDOW_MS = 30 * 60 * 1000;
export const OWNER_NOTIFY_MAX_PER_HOUR = 30;
// One year. rate_limit_hit buckets by fixed window, so the per-user claim
// only needs to outlive RECENT_SIGNUP_WINDOW_MS; a year makes a window
// boundary landing between the two entry points practically impossible.
const CLAIM_WINDOW_SECONDS = 365 * 24 * 60 * 60;

export type SignupAccountType = "homeowner" | "pro";

export type SignupNotifyFields = {
  accountType: SignupAccountType;
  firstName: string | null;
  city: string | null;
  method: string;
  at: Date;
  totalSignups: number | null;
};

// The subset of a Supabase auth user this module reads. Kept narrow on
// purpose: email and phone are not in it, so they cannot reach the message.
export type SignupAuthUser = {
  id: string;
  created_at?: string | null;
  app_metadata?: Record<string, unknown> | null;
  user_metadata?: Record<string, unknown> | null;
};

// The recipient, or null when the feature is off. A value that does not look
// like one plain address (whitespace, CR/LF, a list) is treated as unset
// rather than handed to the provider.
export function ownerNotifyAddress(): string | null {
  const raw = (process.env.OWNER_NOTIFY_EMAIL ?? "").trim();
  if (!raw) return null;
  if (!/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(raw)) {
    console.error("signupNotify: OWNER_NOTIFY_EMAIL is not a single address, skipping");
    return null;
  }
  return raw;
}

function clean(value: string, max: number): string {
  return stripControlChars(value).replace(/\s+/g, " ").trim().slice(0, max);
}

// First word of whatever name the provider gave us (Google and Apple fill
// name / full_name; an email signup has none until later). Only the first
// word ever leaves this function.
export function firstNameFrom(meta: Record<string, unknown> | null | undefined): string | null {
  if (!meta) return null;
  for (const key of ["first_name", "given_name", "full_name", "name"]) {
    const v = meta[key];
    if (typeof v !== "string") continue;
    const first = clean(v, 200).split(" ")[0] ?? "";
    // A name has a letter in it. An email address someone typed into the
    // name field does not count as a name.
    if (first && /\p{L}/u.test(first) && !first.includes("@")) {
      return first.slice(0, 40);
    }
  }
  return null;
}

export function signupMethodLabel(provider: unknown): string {
  switch (provider) {
    case "email":
      return "Email and password";
    case "google":
      return "Google";
    case "apple":
      return "Apple";
    default:
      return "Other";
  }
}

export function formatPacific(at: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  })
    .format(at)
    // Newer ICU puts a narrow no-break space before AM/PM; plain text mail
    // reads better with an ordinary one.
    .replace(/[  ]/g, " ");
}

// Pure. The only fields that can appear are the six in SignupNotifyFields.
export function buildSignupNotifyMessage(fields: SignupNotifyFields): {
  subject: string;
  text: string;
} {
  const type = fields.accountType === "pro" ? "Pro" : "Homeowner";
  const city = fields.city ? clean(fields.city, 60) : "";
  const name = fields.firstName ? clean(fields.firstName, 40) : "";
  const subject = city
    ? `New OakTend signup: ${type} in ${city}`
    : `New OakTend signup: ${type}`;
  const lines = [
    "Someone just created an OakTend account.",
    "",
    `Account type: ${type}`,
    `First name: ${name || "No name yet"}`,
    `City: ${city || "not set yet"}`,
    `Signed up with: ${fields.method}`,
    `When: ${formatPacific(fields.at)}`,
  ];
  if (typeof fields.totalSignups === "number" && fields.totalSignups > 0) {
    lines.push(`Total accounts so far: ${fields.totalSignups}`);
  }
  lines.push(
    "",
    "Email, phone and address are left out of this alert to keep them out of inboxes. Look the account up in Supabase if you need more."
  );
  return { subject, text: lines.join("\n") };
}

// Best-effort lookups. Each answers null on any failure.
async function cityFor(userId: string): Promise<string | null> {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("properties")
      .select("city")
      .eq("user_id", userId)
      .not("city", "is", null)
      .limit(1)
      .maybeSingle();
    const city = (data as { city?: unknown } | null)?.city;
    return typeof city === "string" && city.trim() ? city : null;
  } catch {
    return null;
  }
}

async function totalAccounts(): Promise<number | null> {
  try {
    const admin = createAdminClient();
    const { count, error } = await admin
      .from("users")
      .select("id", { count: "exact", head: true });
    return error || typeof count !== "number" ? null : count;
  } catch {
    return null;
  }
}

async function claim(bucket: string, limit: number, windowSeconds: number): Promise<boolean> {
  const admin = createAdminClient();
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_bucket: bucket,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });
  // Fails closed: a broken claim means we cannot promise "once", and a
  // missed alert costs nothing while a duplicate is noise.
  if (error) {
    console.error("signupNotify: claim failed", error.message ?? error);
    return false;
  }
  return data === true;
}

// Does the work. Exported for tests; production code calls
// scheduleOwnerSignupNotify. Resolves true only when an email was accepted.
export async function notifyOwnerOfSignup(
  user: SignupAuthUser,
  accountType: SignupAccountType,
  now: number = Date.now()
): Promise<boolean> {
  try {
    const to = ownerNotifyAddress();
    if (!to) return false;
    if (outboundDisabled()) return false;

    const createdAt = Date.parse(user.created_at ?? "");
    if (!Number.isFinite(createdAt) || now - createdAt > RECENT_SIGNUP_WINDOW_MS) {
      return false;
    }

    if (await isInternalUser(user.id)) return false;

    if (!(await claim(`signup-notify:${user.id}`, 1, CLAIM_WINDOW_SECONDS))) {
      return false;
    }
    if (!(await claim("signup-notify:all", OWNER_NOTIFY_MAX_PER_HOUR, 3600))) {
      console.warn("signupNotify: hourly cap reached, alert skipped");
      return false;
    }
    if (!allowOutboundSend()) return false;

    const [city, total] = await Promise.all([cityFor(user.id), totalAccounts()]);
    const { subject, text } = buildSignupNotifyMessage({
      accountType,
      firstName: firstNameFrom(user.user_metadata),
      city,
      method: signupMethodLabel(user.app_metadata?.provider),
      at: new Date(createdAt),
      totalSignups: total,
    });
    const ok = await deliverPlainEmail(to, subject, text);
    if (!ok) console.error("signupNotify: owner alert was not accepted by the provider");
    return ok;
  } catch (e) {
    console.error("signupNotify: threw", e instanceof Error ? e.message : e);
    return false;
  }
}

// Queue the alert to run after the response is sent. Never throws and never
// delays the caller. after() throws outside a request scope (a script, a
// test); the promise is then left to run on its own, still caught.
export function scheduleOwnerSignupNotify(
  user: SignupAuthUser,
  accountType: SignupAccountType
): void {
  if (!ownerNotifyAddress()) return;
  const run = () => notifyOwnerOfSignup(user, accountType).then(() => undefined);
  try {
    after(run);
  } catch {
    void run();
  }
}
