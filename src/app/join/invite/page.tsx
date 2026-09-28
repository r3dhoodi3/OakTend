import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SubmitButton from "@/components/SubmitButton";
import {
  acceptInviteAction,
  declineInviteAction,
} from "@/app/(app)/account/household/actions";

export const metadata: Metadata = {
  title: "Your home invites",
  description: "Accept an invite to share a home on OakTend.",
};

// Where the household invite EMAIL links to. Public (under /join/), so a
// signed-out reader gets the sign-in-or-sign-up chooser and comes back here
// afterward (/onboarding forwards any /join/ destination instead of asking
// them to claim a home). Signed in, it lists the pending invites addressed to
// their own email. The list is read under their own session: the
// "household_members invitee select" policy only returns invites for the
// signed-in email, and accepting runs through the "invitee claim" policy, so
// nothing here trusts a browser-supplied id beyond what RLS already allows.
export default async function JoinInvitePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const nextQuery = `?next=${encodeURIComponent("/join/invite")}`;
    return (
      <Shell>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Join a home
        </h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
          Sign in or create a free account with the email the invite was sent
          to. You&apos;ll come right back here to accept it.
        </p>
        <Link
          href={`/homeowner-signup${nextQuery}`}
          className="btn-primary mt-6 flex w-full"
        >
          Create your account
        </Link>
        <Link href={`/signin${nextQuery}`} className="btn-secondary mt-3 flex w-full">
          I have an account
        </Link>
      </Shell>
    );
  }

  const myEmail = (user.email ?? "").trim().toLowerCase();
  const { data } = await supabase
    .from("household_members")
    .select("id, created_at, invited_email")
    .eq("status", "invited")
    .is("member_user_id", null);
  const invites = (data ?? []).filter(
    (r) => r.invited_email.trim().toLowerCase() === myEmail
  );

  if (invites.length === 0) {
    return (
      <Shell>
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          No invites found
        </h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
          There&apos;s no open invite for {user.email ?? "this account"}. Check
          that you signed in with the email the invite went to, or ask the owner
          to send it again.
        </p>
        <Link href="/dashboard" className="btn-secondary mt-6 flex w-full">
          Go to OakTend
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
        {invites.length === 1 ? "You have an invite" : "You have invites"}
      </h1>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
        Joining lets you see and help with everything for that home.
      </p>
      <ul className="mt-5 space-y-3 text-left">
        {invites.map((invite) => (
          <li
            key={invite.id}
            className="rounded-xl border border-stone-200 p-4 dark:border-white/10"
          >
            <p className="text-sm text-stone-600 dark:text-stone-300">
              Invited on {new Date(invite.created_at).toLocaleDateString()}
            </p>
            <div className="mt-3 flex gap-2">
              <form action={acceptInviteAction} className="flex-1">
                <input type="hidden" name="id" value={invite.id} />
                <SubmitButton className="btn-primary w-full" pendingLabel="Joining...">
                  Join this home
                </SubmitButton>
              </form>
              <form action={declineInviteAction}>
                <input type="hidden" name="id" value={invite.id} />
                <SubmitButton className="btn-secondary" pendingLabel="Declining...">
                  Decline
                </SubmitButton>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <div className="card text-center">{children}</div>
    </main>
  );
}
