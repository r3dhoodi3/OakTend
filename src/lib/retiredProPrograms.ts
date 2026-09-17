import { NextResponse } from "next/server";

// Paused 2026-09-15 pending the success-fee rebuild. OakTend retired
// per-lead fees, wallet credits, ghost protection, first-apply guarantees,
// aging-lead markdowns, win-back credits, and referral credits on
// 2026-09-10 in favor of a 5% success fee charged only on hire. The cron
// jobs and actions behind those retired programs still exist (schedules and
// logic untouched) so nothing else shifts, but they must stop emailing or
// pushing contractors dollar figures about a fee model that no longer
// exists. Flip to false only when the new success-fee flow ships and each
// job's logic and copy is rebuilt for it.
export const RETIRED_PRO_PROGRAMS_PAUSED = true;

// A cron handler returns this instead of doing its normal work while paused,
// so the Vercel Cron scheduler still sees a plain 200 and never treats a
// paused program as a failed run.
export function retiredProgramPausedResponse(program: string) {
  return NextResponse.json({
    ok: true,
    skipped: "retired_program_paused",
    program,
  });
}
