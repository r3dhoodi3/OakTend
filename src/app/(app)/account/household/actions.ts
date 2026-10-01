"use server";

import { cookies } from "next/headers";
import { after } from "next/server";
import { sendEmailToAddress } from "@/lib/notify";
import {
  householdInviteSubject,
  householdInviteText,
  safeInviterName,
} from "@/lib/householdInviteEmail";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requestOriginFromHeaders } from "@/lib/requestOrigin";
import { setFlash } from "@/lib/flash";
import { type ActionResult, ok, err } from "@/lib/actionResult";
import {
  QR_SCAN_GRACE_SECONDS,
  QR_TOKEN_LIFETIME_SECONDS,
} from "@/lib/householdQr";
import { openHouseholdInvite } from "@/lib/householdInviteOpen";
import { ACTIVE_HOME_COOKIE } from "@/lib/property";
import { PENDING_JOIN_COOKIE, isInviteToken } from "@/lib/pendingJoin";

const HOUSEHOLD_PATH = "/account/household";
const MAX_MEMBERS_PER_HOME = 4;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Invite someone to share day to day access to a home the caller owns. RLS's
// "household_members owner insert" policy re-checks ownership server side, so
// this validation is about friendly error messages, not the real gate.
export async function inviteMemberAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const propertyId = (formData.get("property_id") as string) || "";
  // NOT sliced to a ceiling like other free-text fields: this address is mailed
  // an invite, and a truncated address still has an "@" and would reach a
  // stranger, so an over-length value is REJECTED below rather than trimmed.
  const email = ((formData.get("email") as string) || "").trim().toLowerCase();

  if (!propertyId) {
    setFlash("Choose a home to invite someone to.", "error");
    redirect(HOUSEHOLD_PATH);
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    setFlash("Enter a valid email address.", "error");
    redirect(HOUSEHOLD_PATH);
  }
  if (user.email && email === user.email.trim().toLowerCase()) {
    setFlash("You can't invite yourself.", "error");
    redirect(HOUSEHOLD_PATH);
  }

  // App side cap: count invited plus active rows on this home before insert.
  const { count, error: countError } = await supabase
    .from("household_members")
    .select("id", { count: "exact", head: true })
    .eq("property_id", propertyId);
  if (countError) {
    setFlash("Couldn't send the invite. Please try again.", "error");
    redirect(HOUSEHOLD_PATH);
  }
  if ((count ?? 0) >= MAX_MEMBERS_PER_HOME) {
    setFlash(
      `This home already has the maximum of ${MAX_MEMBERS_PER_HOME} members.`,
      "error"
    );
    redirect(HOUSEHOLD_PATH);
  }

  // An invite sends mail to an address the caller typed, so an unlimited invite
  // loop is a way to send mail to strangers with OakTend's name on it. The
  // per-home member cap above doesn't stop that on its own: a rejected or
  // deleted invite frees the slot again. Charged HERE, immediately before the
  // insert and only after every cheap check (property, email shape, not-self,
  // cap) has passed, so a mistyped or self-addressed invite never burns a slot.
  // Same fixed-window limiter (migration 0068) and same fail-open posture as
  // the rest of the spam-class buckets - only an explicit `allowed === false`
  // blocks - so a limiter outage never stops a real homeowner from adding their
  // partner.
  const rlAdmin = createAdminClient();
  const { data: allowed } = await rlAdmin.rpc("rate_limit_hit", {
    p_bucket: `invite:${user.id}`,
    p_limit: 10,
    p_window_seconds: 86400,
  });
  if (allowed === false) {
    setFlash(
      "You've sent a lot of invites today. Please try again tomorrow.",
      "error"
    );
    redirect(HOUSEHOLD_PATH);
  }

  const { error } = await supabase.from("household_members").insert({
    property_id: propertyId,
    invited_email: email,
    invited_by: user.id,
  });

  if (error) {
    // 23505: the unique index on (property_id, lower(invited_email)) caught a
    // duplicate invite, either already pending or already an active member.
    if (error.code === "23505") {
      setFlash("That email has already been invited to this home.", "error");
    } else {
      setFlash("Couldn't send the invite. Please try again.", "error");
    }
    redirect(HOUSEHOLD_PATH);
  }

  // The invite email. Before this, adding someone only wrote the row and the
  // invitee was never told, so from their side "the invite never came".
  // Sent after the response with after(), so the owner's page comes back
  // right away instead of waiting on the mail provider. Link base is the
  // configured site URL (oaktend.com), falling back to this request's own
  // origin only when it is unset (local dev), so a forged Host header can't
  // point the link somewhere else in production.
  const inviterName = safeInviterName(
    user.user_metadata?.full_name as string | undefined
  );
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    (await requestOriginFromHeaders());
  after(async () => {
    const sent = await sendEmailToAddress({
      to: email,
      subject: householdInviteSubject(inviterName),
      text: householdInviteText({
        inviterName,
        inviterEmail: user.email ?? null,
        inviteeEmail: email,
        link: `${base}/join/invite`,
      }),
    });
    if (!sent) {
      console.warn("inviteMemberAction: invite email not sent (no provider or rejected)");
    }
  });

  await setFlash(`Invite sent to ${email}.`);
  revalidatePath(HOUSEHOLD_PATH);
  redirect(HOUSEHOLD_PATH);
}

// Remove a member or cancel a pending invite. Only the property's owner can
// reach a row that still belongs to someone else, enforced by the
// "household_members owner delete" policy.
export async function removeMemberAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const id = (formData.get("id") as string) || "";
  const { error } = await supabase.from("household_members").delete().eq("id", id);
  if (error) {
    setFlash("Couldn't remove that person. Please try again.", "error");
    redirect(HOUSEHOLD_PATH);
  }
  setFlash("Removed from the home.");
  revalidatePath(HOUSEHOLD_PATH);
  redirect(HOUSEHOLD_PATH);
}

// Accept an invite addressed to the caller's own email. The
// "household_members invitee claim" policy is what actually enforces that
// this can only move a legitimate invite (status invited, no member yet, the
// caller's own email) into an active membership tied to the caller's uid.
export async function acceptInviteAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const id = (formData.get("id") as string) || "";
  // .select() returns the row only if RLS let the update through, so the
  // property id below is the one the database says this invite belongs to,
  // never a value from the form.
  const { data: accepted, error } = await supabase
    .from("household_members")
    .update({
      status: "active",
      member_user_id: user.id,
      accepted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("property_id")
    .maybeSingle();
  if (error || !accepted) {
    await setFlash("Couldn't accept that invite. Please try again.", "error");
    redirect(HOUSEHOLD_PATH);
  }
  // Land in the home they just joined.
  (await cookies()).set(ACTIVE_HOME_COOKIE, accepted.property_id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  await setFlash("You joined this home.");
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// Decline an invite before claiming it, covered by the
// "household_members invitee decline" policy.
export async function declineInviteAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const id = (formData.get("id") as string) || "";
  const { error } = await supabase.from("household_members").delete().eq("id", id);
  if (error) {
    setFlash("Couldn't decline that invite. Please try again.", "error");
    redirect(HOUSEHOLD_PATH);
  }
  setFlash("Invite declined.");
  revalidatePath(HOUSEHOLD_PATH);
  redirect(HOUSEHOLD_PATH);
}

// Leave a home the caller is an active member of, covered by the
// "household_members member leave" policy (member_user_id = auth.uid()).
export async function leaveHomeAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const id = (formData.get("id") as string) || "";
  const { error } = await supabase.from("household_members").delete().eq("id", id);
  if (error) {
    setFlash("Couldn't leave that home. Please try again.", "error");
    redirect(HOUSEHOLD_PATH);
  }
  setFlash("You've left that home.");
  revalidatePath("/", "layout");
  redirect(HOUSEHOLD_PATH);
}

// ---- QR invites (migrations 0095, 0097) -------------------------------------
//
// A second way to reach the exact same household_members row the invite/
// accept flow above produces: the owner shows a QR code, someone scans it
// and lands on /join/household/[token], and redeem_household_invite_token()
// (SECURITY DEFINER, runs as the joiner's own session) does the insert -
// same cap, same one-row-per-property-per-email constraint, idempotent for
// an already-active member. This action only ever mints the token; it never
// touches household_members itself.
//
// TTL: 10 minutes from mint (QR_TOKEN_LIFETIME_SECONDS), for everyone. A
// browser that opened the link inside those 10 minutes gets up to 30 minutes
// from that open to finish joining (src/lib/qrScanProof.ts, migration 0176);
// that extra time is tied to that browser and never extends the code for
// anyone else.
export interface HouseholdQrToken {
  token: string;
  joinUrl: string;
  expiresAt: string;
}

// Called directly (not as a <form action>) from the household tab's client
// component on mount, and again only when the owner taps "New code" (see
// HouseholdQrCode.tsx). A tap passes the code that card was showing as
// replaceToken, and that code stops working once the new one exists. The
// mount mint passes nothing, so a second tab or React's dev double mount never
// cancels a code that is still on screen somewhere. Returns a typed
// ActionResult (src/lib/actionResult.ts) rather than throwing, since the
// caller is a client component that needs to keep the tab's layout in place
// and show the failure inline, not an unhandled rejection or a thrown error
// that would otherwise surface as a generic error boundary.
export async function mintHouseholdQrTokenAction(
  propertyId: string,
  replaceToken?: string | null
): Promise<ActionResult<HouseholdQrToken>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return err("Please sign in.");

    // Owner only - a household member must not be able to mint invites for a
    // home they don't own, matching 0048's "a member cannot ... invite
    // anyone else." Checked against the row's actual user_id, not just
    // whether the select succeeds: RLS's "properties member select" policy
    // (0048) lets a member read this same row, so a successful select alone
    // isn't proof of ownership.
    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .select("id, user_id")
      .eq("id", propertyId)
      .maybeSingle();
    if (propertyError || !property || property.user_id !== user.id) {
      return err("You can only invite people to a home you own.");
    }

    const admin = createAdminClient();
    const expiresAt = new Date(Date.now() + QR_TOKEN_LIFETIME_SECONDS * 1000);

    // Live tokens are no longer swept on each mint (see below), so without a
    // cap a scripted loop could pile up rows. 30 codes per 10 minutes is far
    // above what a person tapping "New code" needs. Same fail-open posture as
    // the other spam-class buckets: only an explicit false blocks.
    const { data: mintAllowed } = await admin.rpc("rate_limit_hit", {
      p_bucket: `household_qr_mint:${user.id}`,
      p_limit: 30,
      p_window_seconds: 600,
    });
    if (mintAllowed === false) {
      return err("Too many new codes just now. Wait a few minutes and try again.");
    }

    // Self-cleanup: drop this owner's tokens for this home whose 10 minutes
    // AND finish-joining time are both over (expired more than 30 minutes
    // ago), so the table cannot quietly pile up stale rows while a person who
    // opened a code in time can still finish signing up.
    //
    // Live tokens are left alone, scanned or not. This used to delete every
    // unscanned token on each mint, and that was one way a code on screen
    // could read "isn't valid" when scanned: two open tabs (or React's dev
    // double mount) each minted a code and each mint deleted the other's, so
    // whichever code was still showing had already been swept. A live token
    // now simply runs out on its own 10 minute clock.
    const graceOverIso = new Date(
      Date.now() - QR_SCAN_GRACE_SECONDS * 1000
    ).toISOString();
    const { error: cleanupError } = await admin
      .from("household_invite_tokens")
      .delete()
      .eq("created_by", user.id)
      .eq("property_id", propertyId)
      .lte("expires_at", graceOverIso);
    if (cleanupError) {
      console.error("mintHouseholdQrTokenAction: cleanup failed", cleanupError);
      return err("Couldn't create an invite code. Try again.");
    }

    const { data: inserted, error: insertError } = await admin
      .from("household_invite_tokens")
      .insert({
        property_id: propertyId,
        created_by: user.id,
        expires_at: expiresAt.toISOString(),
      })
      .select("token, expires_at")
      .single();
    if (insertError || !inserted) {
      console.error("mintHouseholdQrTokenAction: insert failed", insertError);
      return err("Couldn't create an invite code. Try again.");
    }

    // "New code" cancels the code this card was showing, but only once the
    // new one exists (a failed mint leaves the old code working), only this
    // owner's own code for this home (created_by + property_id, so a token
    // from the browser can never delete anyone else's), and only while that
    // code is still inside its 10 minutes. A code that already ran out is left
    // for its finish-joining time, so tapping "New code" for the next person
    // does not cut off someone who scanned in time and is still signing up.
    const replace =
      typeof replaceToken === "string" ? replaceToken.trim().toLowerCase() : "";
    if (isInviteToken(replace) && replace !== inserted.token) {
      const { error: cancelError } = await admin
        .from("household_invite_tokens")
        .delete()
        .eq("token", replace)
        .eq("created_by", user.id)
        .eq("property_id", propertyId)
        .gt("expires_at", new Date().toISOString());
      if (cancelError) {
        console.error("mintHouseholdQrTokenAction: cancel failed", cancelError);
      }
    }

    // Absolute URL built from the Host header (requestOriginFromHeaders),
    // not NEXT_PUBLIC_SITE_URL or a hardcoded host: the code is read by a
    // phone camera, sometimes off a screenshot, so it must resolve to
    // whatever host this request actually came in on (localhost while
    // developing, the LAN IP, a tunnel, or the real domain in prod) - same
    // reasoning as requestOrigin() itself.
    const origin = await requestOriginFromHeaders();
    return ok({
      token: inserted.token,
      joinUrl: `${origin}/join/household/${inserted.token}`,
      expiresAt: inserted.expires_at,
    });
  } catch (e) {
    // Last-resort net: anything above this line that throws instead of
    // returning an `error` field (a network blip calling Supabase, a
    // missing Host header) still comes back as a typed failure, never an
    // unhandled rejection the client component would have to guess about.
    console.error("mintHouseholdQrTokenAction: unexpected failure", e);
    return err("Couldn't create an invite code. Try again.");
  }
}

// ---- Joining from a QR code -------------------------------------------------
//
// The ONLY way a QR token turns into a membership. /join/household/[token]
// used to redeem the token as a side effect of simply rendering (a GET), so
// any reload, prefetch, or second open of the page re-ran the redemption; a
// page that had just said "this code isn't working" could hand out access on
// the next reload. Rendering is now read only, and joining is this explicit
// POST behind a "Join this home" button.
//
// Every check lives in redeem_household_invite_token() (migration 0097),
// which runs under the joiner's OWN session: the token must exist and be
// unexpired AT THE MOMENT OF THIS CALL, the home must be under its member cap,
// and the row it writes is tied to auth.uid(). Nothing from the browser is
// trusted except the token string, which is itself the credential being
// checked. The property id used below for the active-home cookie comes back
// from that function, never from the form.
const REDEEM_FAIL_REASONS = new Set([
  "invalid_or_expired",
  "home_full",
  "rate_limited",
  "no_email",
  "error",
]);

export async function redeemHouseholdInviteAction(formData: FormData) {
  const token = String(formData.get("token") ?? "").trim().toLowerCase();
  if (!isInviteToken(token)) {
    redirect("/join/household/invalid");
  }
  const joinPath = `/join/household/${token}`;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/signin?next=${encodeURIComponent(joinPath)}`);
  }

  // Past the code's 10 minutes, the database only accepts it together with
  // its grace_key (migration 0176), a value that never leaves the server. It
  // is read and passed ONLY when this browser opened the link while the code
  // was still live, less than 30 minutes ago (openHouseholdInvite checks the
  // signed cookie from src/lib/qrScanProof.ts). Before 0176 is applied the
  // column read fails, no key is passed, and the code simply lasts its 10
  // minutes.
  let graceKey: string | null = null;
  const open = await openHouseholdInvite(token);
  if (open?.inGrace) {
    const { data: graceRow, error: graceError } = await createAdminClient()
      .from("household_invite_tokens")
      .select("grace_key")
      .eq("token", token)
      .maybeSingle();
    if (!graceError && graceRow?.grace_key) graceKey = graceRow.grace_key;
  }

  const { data, error } = await supabase.rpc(
    "redeem_household_invite_token",
    graceKey ? { p_token: token, p_grace_key: graceKey } : { p_token: token }
  );
  const row = (Array.isArray(data) ? data[0] : data) as
    | {
        ok: boolean;
        property_id: string | null;
        reason: string | null;
      }
    | undefined;

  if (error || !row) {
    console.error("redeemHouseholdInviteAction: rpc failed", error);
    redirect(`${joinPath}?failed=error`);
  }
  if (!row.ok || !row.property_id) {
    const reason =
      row.reason && REDEEM_FAIL_REASONS.has(row.reason)
        ? row.reason
        : "invalid_or_expired";
    redirect(`${joinPath}?failed=${reason}`);
  }

  const cookieStore = await cookies();
  // Land them IN the home they just joined, not whichever home was active
  // before (someone who already has a home of their own would otherwise see
  // their own dashboard and think nothing happened).
  cookieStore.set(ACTIVE_HOME_COOKIE, row.property_id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  cookieStore.delete(PENDING_JOIN_COOKIE);

  await setFlash(
    row.reason === "owner"
      ? "This is your own home."
      : row.reason === "already_member"
        ? "You're already in this home."
        : "You joined this home.",
    "success"
  );
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// "Not now" on the join page. Clears the invite breadcrumb so /onboarding
// stops sending a home-less account back to this invite, then carries on to
// the app (the layout routes someone with no home to setup).
export async function dismissPendingJoinAction() {
  (await cookies()).delete(PENDING_JOIN_COOKIE);
  redirect("/dashboard");
}
