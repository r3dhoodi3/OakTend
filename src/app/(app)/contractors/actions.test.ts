import { beforeEach, describe, expect, it, vi } from "vitest";

// postJobAction's failure floors.
//
// Every one of them used to end in setFlash() + redirect("/contractors"): a
// bare path with no query string. The page prefills the post-a-job form from
// searchParams, so dropping them reset the form to blank, and the flash
// travels in a cookie that FlashToast only reads when it re-renders - which a
// redirect to the SAME path does not guarantee. Two testers on 2026-08-28 hit
// exactly that and reported "Posting..., then a blank form, no error at all".
//
// These tests pin the fix: nothing is ever inserted, the owner keeps what they
// typed, and the reason travels in the URL as an ?error= code the page turns
// into a visible sentence under the Post job button.
//
// A NEXT_REDIRECT is not a crash - it is Next's own throw-to-navigate
// mechanism - so the mock reproduces that shape and the assertions catch only
// that marker. A raw `new Error(...)` escaping the action fails the test
// instead of being swallowed.

class RedirectSignal extends Error {
  constructor(public path: string) {
    super(`REDIRECT:${path}`);
  }
}

const sessionUser = {
  id: "user-1",
  email: "owner@example.com",
  user_metadata: {} as Record<string, unknown>,
};

// An Orange County home, already ownership-checked so the lazy RentCast
// re-check (and its parcel lookup) never runs in these tests.
const LAUNCH_PROPERTY = {
  id: "property-1",
  user_id: "user-1",
  address_line1: "123 Main St",
  unit: null,
  city: "Fountain Valley",
  state: "CA",
  zip: "92708",
  ownership_status: "verified",
  ownership_checked_at: "2026-08-01T00:00:00.000Z",
};

let activeProperty: Record<string, unknown> | null = LAUNCH_PROPERTY;
let rateLimitAnswers: (boolean | null)[] = [];

// Table handlers for the SUCCESS path. Null (the default) keeps the strict
// behavior every failure test relies on: touching a table throws, which is how
// "nothing was inserted" is proved rather than asserted. The one test that
// posts a job for real installs handlers here and takes them down after.
let dbTables: ((table: string) => unknown) | null = null;
let adminTables: ((table: string) => unknown) | null = null;
// Same paranoid default as dbTables/adminTables: only chooseApplicantAction
// tests set this, and every other test in this file must never reach an rpc
// call, so the default throws.
let clientRpc:
  | ((name: string, args: unknown) => Promise<{ data: unknown; error: unknown }>)
  | null = null;

vi.mock("@/lib/property", () => ({
  getActiveProperty: vi.fn(async () => activeProperty),
  formatAddressLine: vi.fn(
    (p: { address_line1?: string }) => p.address_line1 ?? ""
  ),
}));

// Any read or write through either client is a failure here: every path under
// test is supposed to turn the owner around BEFORE touching a table. A call
// therefore throws rather than returning a stub, so "nothing was inserted" is
// proved by the test rather than asserted about a mock nobody exercised.
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: { getUser: async () => ({ data: { user: sessionUser } }) },
    from: (table: string) => {
      if (dbTables) return dbTables(table);
      throw new Error(`postJobAction must not touch "${table}" on this path`);
    },
    rpc: (name: string, args: unknown) => {
      if (clientRpc) return clientRpc(name, args);
      throw new Error(`no test-side rpc handler installed for "${name}"`);
    },
    storage: {
      from: () => ({ remove: async () => ({ error: null }) }),
    },
  })),
}));

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: vi.fn(() => ({
    // The only admin call a rejected post is allowed to make: the fixed-window
    // rate limiter. Answers come off a queue so each test can decide which of
    // the two buckets (hourly, then daily) says no.
    rpc: vi.fn(async () => ({
      data: rateLimitAnswers.length ? rateLimitAnswers.shift() : true,
      error: null,
    })),
    from: (table: string) => {
      if (adminTables) return adminTables(table);
      throw new Error(`postJobAction must not write "${table}" on this path`);
    },
  })),
}));

vi.mock("@/lib/flash", () => ({ setFlash: vi.fn(async () => {}) }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({ get: () => undefined, set: () => {} })),
  headers: vi.fn(async () => ({ get: () => null })),
}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new RedirectSignal(path);
  }),
}));

vi.mock("@/lib/parcel", () => ({
  lookupParcel: vi.fn(() => {
    throw new Error("a metered parcel lookup must not run on a rejected post");
  }),
}));
vi.mock("@/lib/proAlerts", () => ({
  alertProsForNewLead: vi.fn(() => {
    throw new Error("pros must not be alerted about a job that was rejected");
  }),
}));
vi.mock("@/lib/notify", () => ({ sendNotification: vi.fn() }));
vi.mock("@/lib/subscription", () => ({ hasPlus: vi.fn(async () => false) }));
vi.mock("@/lib/blocks", () => ({ isBlockedBetween: vi.fn(async () => false) }));
// 0165 internal accounts. Mocked for the same reason @/lib/blocks is: the real
// module is "server-only", which has no Node resolution under vitest. The
// defaults say "nobody is internal", which is the state every test in this
// file assumes and the state a database without migration 0165 is in.
vi.mock("@/lib/internalAccounts", () => ({
  isInternalUser: vi.fn(async () => false),
  isInternalContractor: vi.fn(async () => false),
  internalUserIdsAmong: vi.fn(async () => new Set<string>()),
}));
// The team alert's recipient list (src/lib/teamAlerts.ts), mocked for the same
// "server-only" reason. A live getter so one test can put a founder on the
// list; the default is the empty list, i.e. nobody flagged and no founder
// account - which must still leave the homeowner's own receipt untouched.
let teamRecipients: { id: string; email: string | null }[] = [];
vi.mock("@/lib/teamAlerts", () => ({
  teamAlertRecipients: vi.fn(async () => teamRecipients),
}));

// The apply_credit_back notice (inside chooseApplicantAction below) describes
// a wallet-credit mechanic that is retired, so it is gated behind
// RETIRED_PRO_PROGRAMS_PAUSED (src/lib/retiredProPrograms.ts) as of
// 2026-09-15. Mocked with a live getter so a single test can flip it (paused
// is the default every other describe block in this file relies on).
let retiredProProgramsPaused = true;
vi.mock("@/lib/retiredProPrograms", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/lib/retiredProPrograms")>();
  return {
    ...actual,
    get RETIRED_PRO_PROGRAMS_PAUSED() {
      return retiredProProgramsPaused;
    },
  };
});

import { postJobAction, chooseApplicantAction } from "./actions";
import { POST_JOB_ERRORS } from "./postJobErrors";
import { setFlash } from "@/lib/flash";
import { redirect } from "next/navigation";
import { alertProsForNewLead } from "@/lib/proAlerts";
import { sendNotification } from "@/lib/notify";

function fd(fields: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

// A completely filled-in post: category, timing, name, and a description well
// past the 20-character floor. Exactly what the testers submitted.
const FILLED = {
  category: "plumbing",
  timing: "asap",
  homeowner_name: "Jane Doe",
  message:
    "The kitchen sink has been dripping under the cabinet for about a week and the floor is starting to swell.",
};

// Runs the action and returns the path it redirected to, failing the test if
// anything other than a redirect came out.
async function runAndCatchRedirect(form: FormData): Promise<string> {
  let caught: unknown = null;
  try {
    await postJobAction(form);
  } catch (e) {
    caught = e;
  }
  expect(caught).toBeInstanceOf(RedirectSignal);
  return (caught as RedirectSignal).path;
}

beforeEach(() => {
  activeProperty = { ...LAUNCH_PROPERTY };
  teamRecipients = [];
  rateLimitAnswers = [];
  dbTables = null;
  adminTables = null;
  clientRpc = null;
  retiredProProgramsPaused = true;
  // Back to the strict default: on every REJECTED post, alerting pros is a
  // test failure. The success tests below opt out of this for their own run.
  vi.mocked(alertProsForNewLead).mockImplementation((() => {
    throw new Error("pros must not be alerted about a job that was rejected");
  }) as unknown as typeof alertProsForNewLead);
  vi.mocked(setFlash).mockClear();
  vi.mocked(redirect).mockClear();
  // postJobAction sends notifications of its own now (the homeowner's receipt
  // and the team alert), so the calls have to be cleared between tests or the
  // blocks below that read mock.calls[0] would pick up a previous test's.
  vi.mocked(sendNotification).mockClear();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("postJobAction failure paths", () => {
  it("a home outside the launch area keeps the typed values and names the reason", async () => {
    activeProperty = { ...LAUNCH_PROPERTY, zip: "90210", city: "Beverly Hills" };

    const path = await runAndCatchRedirect(fd(FILLED));
    const url = new URL(path, "https://example.test");

    expect(url.pathname).toBe("/contractors");
    expect(url.searchParams.get("error")).toBe("out_of_area");
    // The whole point: nothing the owner typed is lost.
    expect(url.searchParams.get("category")).toBe("plumbing");
    expect(url.searchParams.get("timing")).toBe("asap");
    expect(url.searchParams.get("desc")).toBe(FILLED.message);

    expect(setFlash).toHaveBeenCalledWith(
      POST_JOB_ERRORS.out_of_area,
      "error"
    );
  });

  it("the hourly post limit says so instead of resetting the form", async () => {
    rateLimitAnswers = [false];

    const url = new URL(
      await runAndCatchRedirect(fd(FILLED)),
      "https://example.test"
    );
    expect(url.searchParams.get("error")).toBe("rate_hour");
    expect(url.searchParams.get("desc")).toBe(FILLED.message);
    expect(setFlash).toHaveBeenCalledWith(POST_JOB_ERRORS.rate_hour, "error");
  });

  it("the daily post limit says so instead of resetting the form", async () => {
    // Hourly bucket allows, daily bucket refuses.
    rateLimitAnswers = [true, false];

    const url = new URL(
      await runAndCatchRedirect(fd(FILLED)),
      "https://example.test"
    );
    expect(url.searchParams.get("error")).toBe("rate_day");
    expect(url.searchParams.get("desc")).toBe(FILLED.message);
    expect(setFlash).toHaveBeenCalledWith(POST_JOB_ERRORS.rate_day, "error");
  });

  it("a forged category is refused with a message, not a blank form", async () => {
    const url = new URL(
      await runAndCatchRedirect(fd({ ...FILLED, category: "not_a_category" })),
      "https://example.test"
    );
    expect(url.searchParams.get("error")).toBe("category");
    // The rejected value is NOT echoed back. It used to be, to keep the
    // select from emptying under the owner - but the select can only ever
    // produce a value on the list, so anything else came from a forged or
    // stale post, and re-rendering it means putting attacker-chosen text back
    // into the page's own prefill. The flash says what went wrong; the select
    // falls back to its blank first option, which is honest. Same rule the
    // budget band has always followed.
    expect(url.searchParams.get("category")).toBeNull();
    expect(url.searchParams.get("desc")).toBe(FILLED.message);
    expect(setFlash).toHaveBeenCalledWith(POST_JOB_ERRORS.category, "error");
  });

  it("a too-short description is refused with a message and the text kept", async () => {
    const short = "leak";
    const url = new URL(
      await runAndCatchRedirect(fd({ ...FILLED, message: short })),
      "https://example.test"
    );
    expect(url.searchParams.get("error")).toBe("description");
    expect(url.searchParams.get("desc")).toBe(short);
    expect(setFlash).toHaveBeenCalledWith(POST_JOB_ERRORS.description, "error");
  });

  // B1: a lead with no way to reach the homeowner is dead weight for a pro
  // who just paid to apply. homeowner_email falls back to the signed-in
  // user's auth email (sessionUser.email), so this test blanks that out too
  // to actually exercise the "both are empty" floor.
  it("a post with no email and no phone is refused with a message", async () => {
    const originalEmail = sessionUser.email;
    sessionUser.email = "";
    try {
      const url = new URL(
        await runAndCatchRedirect(
          fd({ ...FILLED, homeowner_email: "", homeowner_phone: "" })
        ),
        "https://example.test"
      );
      expect(url.searchParams.get("error")).toBe("contact");
      expect(setFlash).toHaveBeenCalledWith(POST_JOB_ERRORS.contact, "error");
    } finally {
      sessionUser.email = originalEmail;
    }
  });

  it("a major-tier job with no budget is refused with a message", async () => {
    const url = new URL(
      await runAndCatchRedirect(fd({ ...FILLED, category: "remodeling" })),
      "https://example.test"
    );
    expect(url.searchParams.get("error")).toBe("budget");
    expect(url.searchParams.get("category")).toBe("remodeling");
    expect(url.searchParams.get("desc")).toBe(FILLED.message);
    expect(setFlash).toHaveBeenCalledWith(POST_JOB_ERRORS.budget, "error");
  });

  it("keeps a budget pick across a rejection, and never echoes a forged one", async () => {
    const kept = new URL(
      await runAndCatchRedirect(
        fd({ ...FILLED, message: "leak", budget_range: "1500-5000" })
      ),
      "https://example.test"
    );
    expect(kept.searchParams.get("error")).toBe("description");
    expect(kept.searchParams.get("budget")).toBe("1500-5000");

    const forged = new URL(
      await runAndCatchRedirect(
        fd({ ...FILLED, message: "leak", budget_range: "'; drop table --" })
      ),
      "https://example.test"
    );
    expect(forged.searchParams.get("budget")).toBeNull();
  });

  // The same rule the budget pick already followed, applied to the other two
  // <select> fields. out_of_area / rate_hour / rate_day all fire BEFORE the
  // authoritative category check further down, so a forged value used to ride
  // into the failure URL and back into the prefilled form unchecked.
  it("never echoes a forged category or timing into the failure URL", async () => {
    rateLimitAnswers = [false];
    const url = new URL(
      await runAndCatchRedirect(
        fd({
          ...FILLED,
          category: "<img src=x onerror=alert(1)>",
          timing: "'; drop table --",
        })
      ),
      "https://example.test"
    );
    expect(url.searchParams.get("error")).toBe("rate_hour");
    expect(url.searchParams.get("category")).toBeNull();
    expect(url.searchParams.get("timing")).toBeNull();
    // The description is free text, so it still comes back untouched.
    expect(url.searchParams.get("desc")).toBe(FILLED.message);
  });

  it("keeps a real category and timing across the same early rejection", async () => {
    rateLimitAnswers = [false];
    const url = new URL(
      await runAndCatchRedirect(fd(FILLED)),
      "https://example.test"
    );
    expect(url.searchParams.get("category")).toBe("plumbing");
    expect(url.searchParams.get("timing")).toBe("asap");
  });

  // The description rides in a URL that a redirect puts in a Location header,
  // so an unbounded paste turns a plain validation error into a request no
  // proxy will carry.
  it("caps the description it carries back at 1000 characters", async () => {
    rateLimitAnswers = [false];
    const huge = "x".repeat(5000);
    const url = new URL(
      await runAndCatchRedirect(fd({ ...FILLED, message: huge })),
      "https://example.test"
    );
    expect(url.searchParams.get("desc")).toHaveLength(1000);
  });

  it("no active home goes to onboarding rather than the crash boundary", async () => {
    activeProperty = null;
    const path = await runAndCatchRedirect(fd(FILLED));
    expect(path).toBe("/onboarding");
  });

  it("every failure code the action can send resolves to a real sentence", async () => {
    for (const message of Object.values(POST_JOB_ERRORS)) {
      expect(message.length).toBeGreaterThan(10);
    }
  });
});

// The success path, driven with the EXACT FormData the real form produces.
//
// Every test above proves a rejection. None of them proved the ordinary case,
// which is how the 2026-08-28 report ("Posting..., then a reset form, no
// banner, and no Your jobs anywhere") stayed ambiguous for so long: the action
// was in fact inserting the row and redirecting to ?posted=, and the missing
// half was on the page. So this pins the contract the page depends on - a good
// post ends at /contractors?posted=<something that changes>, never at a bare
// /contractors and never at an ?error= URL.
//
// The field names below are copied from the rendered form, not invented:
// issue_id (hidden), category (CategoryFilter's hidden input, the plain
// category - never the project-option key), timing, homeowner_name /
// homeowner_email / homeowner_phone, message (DescriptionField's textarea),
// budget_range (BudgetField, "" for "Prefer not to say"). photo_urls and the
// 0114 scope fields are absent from a plain no-photo, non-major post, exactly
// as they are absent from the real submit.
const REAL_SUBMIT = {
  issue_id: "",
  category: "plumbing",
  timing: "few_weeks",
  homeowner_name: "Jane Doe",
  homeowner_email: "jane@example.com",
  homeowner_phone: "(714) 555-0134",
  message:
    "The kitchen sink drain under the cabinet has been leaking steadily for three days and the cabinet floor is soaked.",
  budget_range: "",
};

// A PostgREST-shaped stub: filters and modifiers chain, and awaiting anywhere
// in the chain (directly, or via single/maybeSingle) resolves to whatever this
// table is set up to answer with. Reads answer off a queue so one table can
// give a different answer per call, which contractor_leads needs: the
// duplicate-post probe, then the insert, then the post-insert twin check.
function tableStub(
  reads: unknown[],
  // Where the rows handed to .insert() are collected, and what the insert's
  // own .select(...).single() answers with (the DB gives back id/created_at,
  // which the action needs for the post-insert twin check).
  sink?: { rows: Record<string, unknown>[]; returning: unknown }
) {
  const queue = [...reads];
  let inserted = false;
  const chain: Record<string, unknown> = {};
  for (const m of [
    "select",
    "eq",
    "neq",
    "is",
    "not",
    "in",
    "gte",
    "lte",
    "order",
    "limit",
    "contains",
    "update",
    "delete",
  ]) {
    chain[m] = () => chain;
  }
  chain.insert = (row: unknown) => {
    inserted = true;
    sink?.rows.push(row as Record<string, unknown>);
    return chain;
  };
  const answer = () => {
    if (inserted) {
      inserted = false;
      return { data: sink ? sink.returning : null, error: null, count: null };
    }
    return {
      data: queue.length ? queue.shift() : null,
      error: null,
      count: 0,
    };
  };
  chain.single = () => Promise.resolve(answer());
  chain.maybeSingle = () => Promise.resolve(answer());
  chain.then = (
    resolve: (v: unknown) => unknown,
    reject: (e: unknown) => unknown
  ) => Promise.resolve(answer()).then(resolve, reject);
  return chain;
}

describe("postJobAction success path", () => {
  it("inserts the job and redirects to ?posted= for a real form submit", async () => {
    const sink = {
      rows: [] as Record<string, unknown>[],
      // What the insert's own .select("id, created_at").single() answers with,
      // which the action needs for the post-insert duplicate check.
      returning: { id: "lead-1", created_at: "2026-08-28T12:00:00.000Z" },
    };
    // Reads, in order: the pre-insert duplicate probe (nothing recent), then
    // the twin check, which must name THIS row as the keeper so the action
    // does not turn round and delete what it just wrote.
    const leads = tableStub([null, [{ id: "lead-1" }]], sink);
    dbTables = (table: string) => {
      if (table === "contractor_leads") return leads;
      throw new Error(`unexpected table read on the success path: ${table}`);
    };
    // app_events (the post_job analytics write) and contractors (the matched-pro
    // nudge) are the only admin tables a good post touches.
    adminTables = () => tableStub([[]]);
    vi.mocked(alertProsForNewLead).mockImplementation(
      async () => new Set<string>()
    );

    const path = await runAndCatchRedirect(fd(REAL_SUBMIT));
    const url = new URL(path, "https://example.test");

    expect(url.pathname).toBe("/contractors");
    // The banner is gated on ?posted, and the form's React key is that same
    // value, so it has to be present AND change from post to post.
    expect(url.searchParams.get("posted")).toBeTruthy();
    expect(url.searchParams.get("posted")).not.toBe("");
    // A success must never carry a failure code, and a failure must never
    // arrive without one - the two halves of the contract the page reads.
    expect(url.searchParams.get("error")).toBeNull();

    expect(sink.rows).toHaveLength(1);
    const row = sink.rows[0];
    expect(row.property_id).toBe("property-1");
    expect(row.category).toBe("plumbing");
    expect(row.timing).toBe("few_weeks");
    expect(row.contractor_id).toBeNull();
    expect(row.status).toBe("new");
    expect(row.issue_description).toBe(REAL_SUBMIT.message);
    expect(row.homeowner_name).toBe("Jane Doe");
  });

  it("stamps ?posted with a fresh timestamp, not a fixed value", async () => {
    // The form's React key is ?posted, so a constant would leave the previous
    // post's text sitting in the textarea after the next one. Every success
    // path in the action - this one and both duplicate-submit shortcuts -
    // stamps a real clock value.
    const before = Date.now();
    const sink = {
      rows: [] as Record<string, unknown>[],
      returning: { id: "lead-1", created_at: "2026-08-28T12:00:00.000Z" },
    };
    dbTables = () => tableStub([null, [{ id: "lead-1" }]], sink);
    adminTables = () => tableStub([[]]);
    vi.mocked(alertProsForNewLead).mockImplementation(
      async () => new Set<string>()
    );

    const url = new URL(
      await runAndCatchRedirect(fd(REAL_SUBMIT)),
      "https://example.test"
    );
    const posted = Number(url.searchParams.get("posted"));
    expect(Number.isFinite(posted)).toBe(true);
    expect(posted).toBeGreaterThanOrEqual(before);
  });

  // trackServerEvent used to be a private copy of this function in this file;
  // it now comes from the shared src/lib/trackServer.ts (see that module's own
  // tests for the retry/degrade behavior). This pins the one thing specific to
  // THIS call site: the event name and a payload with no free text - not the
  // homeowner's message, not their name, just the category enum.
  it("records post_job with the category only, no free text", async () => {
    const sink = {
      rows: [] as Record<string, unknown>[],
      returning: { id: "lead-1", created_at: "2026-08-28T12:00:00.000Z" },
    };
    dbTables = () => tableStub([null, [{ id: "lead-1" }]], sink);
    const events = { rows: [] as Record<string, unknown>[], returning: null };
    adminTables = (table: string) => {
      if (table === "app_events") return tableStub([[]], events);
      return tableStub([[]]);
    };
    vi.mocked(alertProsForNewLead).mockImplementation(
      async () => new Set<string>()
    );

    await runAndCatchRedirect(fd(REAL_SUBMIT));

    expect(events.rows).toHaveLength(1);
    const tracked = events.rows[0];
    expect(tracked.event).toBe("post_job");
    expect(tracked.props).toEqual({ category: "plumbing" });
  });
});

// Before this, a posted job told the homeowner nothing (no bell row, no email)
// and told the OakTend team nothing at all - which during the preview, where
// every match is made by hand, meant a job nobody living had seen. See
// src/lib/jobUpdates.ts.
describe("postJobAction: the receipt and the team alert", () => {
  function installGoodPost() {
    const sink = {
      rows: [] as Record<string, unknown>[],
      returning: { id: "lead-1", created_at: "2026-08-28T12:00:00.000Z" },
    };
    dbTables = () => tableStub([null, [{ id: "lead-1" }]], sink);
    adminTables = () => tableStub([[]]);
    vi.mocked(alertProsForNewLead).mockImplementation(
      async () => new Set<string>()
    );
    return sink;
  }

  function sentTo(userId: string) {
    return vi
      .mocked(sendNotification)
      .mock.calls.map(([, input]) => input)
      .filter((input) => input.userId === userId);
  }

  it("sends the poster a receipt that points at the job they just posted", async () => {
    installGoodPost();

    await runAndCatchRedirect(fd(REAL_SUBMIT));

    const [receipt, ...extra] = sentTo("user-1");
    expect(extra).toHaveLength(0);
    expect(receipt.kind).toBe("job_posted");
    // The lead id the insert answered with, so a later team update lands the
    // owner on this same card.
    expect(receipt.url).toContain("job=lead-1");
    // The contact address typed on the posting wins over the account address.
    expect(receipt.email).toBe("jane@example.com");
    // A receipt for something they did seconds ago is not worth a text.
    expect(receipt.smsConsent).toBeUndefined();
  });

  it("alerts every team account except the one that posted", async () => {
    installGoodPost();
    teamRecipients = [
      { id: "user-1", email: "owner@example.com" },
      { id: "founder-2", email: "founder@oaktend.com" },
    ];

    await runAndCatchRedirect(fd(REAL_SUBMIT));

    // The poster gets their receipt and nothing else, even though they are on
    // the team list: nobody needs an alert about their own job.
    expect(sentTo("user-1").map((i) => i.kind)).toEqual(["job_posted"]);
    const [alert] = sentTo("founder-2");
    expect(alert.kind).toBe("job_posted_team");
    expect(alert.url).toBe("/backoffice/jobs");
    expect(alert.email).toBe("founder@oaktend.com");
    // Enough to act on without opening anything: where, and what.
    expect(alert.title).toContain("Fountain Valley");
    expect(alert.body).toContain("Jane Doe");
  });

  it("still posts the job when the notifications fail", async () => {
    installGoodPost();
    vi.mocked(sendNotification).mockRejectedValueOnce(
      new Error("resend is down")
    );

    // The lead row is already committed by this point; a notifier hiccup must
    // not turn a successful post into an error page.
    const url = new URL(
      await runAndCatchRedirect(fd(REAL_SUBMIT)),
      "https://example.test"
    );
    expect(url.searchParams.get("posted")).toBeTruthy();
    expect(url.searchParams.get("error")).toBeNull();
  });
});

// chooseApplicantAction's "apply_credit_back" notice tells every non-chosen
// applicant their fee came back as wallet credit - a mechanic OakTend
// retired 2026-09-10 for the 5% success-fee model. Paused 2026-09-15 behind
// RETIRED_PRO_PROGRAMS_PAUSED (src/lib/retiredProPrograms.ts): the pick
// itself must always still go through, only the stale notice is gated.
describe("chooseApplicantAction's retired apply_credit_back notice", () => {
  function installChoosePickFixtures() {
    // Two reads against "lead_applications": the chosen application's
    // lead_id, then every other still-applied, unrefunded, fee-bearing
    // applicant on that lead (the ones choose_applicant() is about to credit).
    // One shared stub instance so the second .from("lead_applications") call
    // continues the SAME queue instead of restarting a fresh one - a fresh
    // stub per call would hand the second query the FIRST queued answer
    // again (an object, not the applicants array), which .filter() then
    // throws on, silently swallowed by chooseApplicantAction's try/catch.
    const leadApplications = tableStub([
      { lead_id: "lead-1" },
      [{ contractor_id: "contractor-1", fee_cents: 5000 }],
    ]);
    dbTables = (table: string) => {
      if (table === "lead_applications") return leadApplications;
      throw new Error(`chooseApplicantAction must not touch "${table}" here`);
    };
    adminTables = (table: string) => {
      if (table === "contractors") {
        return tableStub([[{ id: "contractor-1", user_id: "user-2" }]]);
      }
      if (table === "users") {
        return tableStub([
          [
            {
              id: "user-2",
              email: "pro@example.com",
              phone: null,
              sms_consent: false,
            },
          ],
        ]);
      }
      // trackServerEvent's app_events write degrades gracefully on its own;
      // let it through cleanly rather than exercising that fallback here.
      if (table === "app_events") return tableStub([[]]);
      throw new Error(`chooseApplicantAction must not write "${table}" here`);
    };
    clientRpc = async (name: string) => {
      if (name === "choose_applicant") return { data: true, error: null };
      throw new Error(`unexpected rpc "${name}"`);
    };
  }

  it("still picks the applicant but sends no credit-back notice while paused (default)", async () => {
    installChoosePickFixtures();

    await chooseApplicantAction(fd({ application_id: "app-1" }));

    expect(setFlash).toHaveBeenCalledWith(
      "Pro selected. They now have your contact and can message you.",
      "success"
    );
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("sends the credit-back notice once RETIRED_PRO_PROGRAMS_PAUSED is false", async () => {
    retiredProProgramsPaused = false;
    installChoosePickFixtures();

    await chooseApplicantAction(fd({ application_id: "app-1" }));

    expect(setFlash).toHaveBeenCalledWith(
      "Pro selected. They now have your contact and can message you.",
      "success"
    );
    expect(sendNotification).toHaveBeenCalledTimes(1);
    const [, input] = vi.mocked(sendNotification).mock.calls[0];
    expect(input).toMatchObject({
      userId: "user-2",
      kind: "apply_credit_back",
      email: "pro@example.com",
    });
    expect(input.body).toContain("$50");
  });
});
