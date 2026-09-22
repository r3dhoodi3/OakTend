import SubmitButton from "@/components/SubmitButton";
import { JOB_UPDATE_MAX_LEN } from "@/lib/jobUpdates";

// One box per job: what we want to tell this homeowner. It reaches them as a
// notification (bell row now, email as soon as RESEND_API_KEY is set) through
// the same sendNotification door as everything else - see postJobUpdateAction
// in ./actions.ts.
//
// A PLAIN <form action={...}>, not a programmatic call: there is nothing to
// keep on screen afterwards and nothing to show inline, so the action's flash
// toast and a fresh render of the page are the whole feedback loop. The
// server action re-checks the team gate itself; this form is only the door.
//
// The placeholder is doing real work. The single most valuable thing to send
// during the preview is "here is who is calling you and when", and an empty
// box does not suggest that - it invites "we're looking into it", which tells
// the homeowner nothing they didn't already know.
export default function JobUpdateForm({
  leadId,
  action,
}: {
  leadId: string;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="lead_id" value={leadId} />
      <label htmlFor={`update-${leadId}`} className="sr-only">
        Update for this homeowner
      </label>
      <textarea
        id={`update-${leadId}`}
        name="message"
        rows={2}
        maxLength={JOB_UPDATE_MAX_LEN}
        placeholder="e.g. Ruiz Plumbing will call you this afternoon - (714) 555-0134. They quote on site."
        className="input w-full text-sm"
      />
      <div className="flex justify-end">
        <SubmitButton className="btn-secondary text-sm" pendingLabel="Sending…">
          Post an update
        </SubmitButton>
      </div>
    </form>
  );
}
