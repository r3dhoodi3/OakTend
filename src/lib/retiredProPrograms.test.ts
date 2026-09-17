import { describe, expect, it } from "vitest";
import {
  RETIRED_PRO_PROGRAMS_PAUSED,
  retiredProgramPausedResponse,
} from "./retiredProPrograms";

// One kill switch for the six retired-fee-model jobs (five crons plus the
// apply_credit_back notice), instead of six ad-hoc edits. Paused 2026-09-15
// pending the success-fee rebuild.

describe("RETIRED_PRO_PROGRAMS_PAUSED", () => {
  it("defaults to true (paused) until the success-fee rebuild ships", () => {
    expect(RETIRED_PRO_PROGRAMS_PAUSED).toBe(true);
  });
});

describe("retiredProgramPausedResponse", () => {
  it("returns a 200 with the skip shape the cron scheduler treats as success", async () => {
    const res = retiredProgramPausedResponse("ghost-protection");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({
      ok: true,
      skipped: "retired_program_paused",
      program: "ghost-protection",
    });
  });

  it("carries whatever program name it is given", async () => {
    const res = retiredProgramPausedResponse("aging-deals");
    const body = await res.json();
    expect(body.program).toBe("aging-deals");
  });
});
