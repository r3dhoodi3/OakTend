import { describe, it, expect } from "vitest";
import {
  buildAlertOutbound,
  buildAlertNotificationRows,
  nextCollapsedAlertTitle,
  collapsedAlertBody,
  planAlertFanout,
  type AlertRecipientRow,
} from "./proAlertBatch";

// These helpers carry the per-recipient semantics the batched job-post fan-out
// has to keep identical to sendNotification's single-recipient path. The rules
// under test, restated from src/lib/notify.ts:
//   - externalChannels false means no contact details leave this module at all,
//     which is how email/SMS are held back without the fan-out knowing anything
//     about Resend or Twilio.
//   - contractors.contact_phone wins over users.phone (onboarding writes the
//     former and never the latter).
//   - sms_consent must be exactly true; anything else is no consent on file.
//   - a recipient with neither an email nor a phone has nothing to send on.
//   - a missing users row means "unknown", not "opted out".

const PAYLOAD = {
  kind: "new_lead",
  title: "New plumbing job just posted",
  body: "Timing: this week.",
  url: "/pro",
};

function rows(
  entries: [string, AlertRecipientRow][]
): Map<string, AlertRecipientRow> {
  return new Map(entries);
}

describe("buildAlertOutbound", () => {
  // This used to return an empty list, which silently took web push down with
  // email and SMS - see the "unverified posting" block at the foot of this
  // file. The recipients are kept now, with every contact detail blanked, so
  // the two costly channels remain impossible and the free one still works.
  it("withholds every contact detail when externalChannels is off", () => {
    const out = buildAlertOutbound(["u1", "u2"], {
      externalChannels: false,
      rowByUser: rows([
        ["u1", { email: "a@example.com", phone: "+15551112222", sms_consent: true }],
        ["u2", { email: "b@example.com" }],
      ]),
      contactPhoneByUser: new Map([["u1", "+15559998888"]]),
    });
    expect(out.map((r) => r.userId)).toEqual(["u1", "u2"]);
    for (const r of out) {
      expect(r.email).toBeNull();
      expect(r.phone).toBeNull();
      expect(r.smsConsent).toBe(false);
    }
  });

  it("prefers the contractor contact_phone over users.phone", () => {
    const [r] = buildAlertOutbound(["u1"], {
      externalChannels: true,
      rowByUser: rows([["u1", { email: null, phone: "+15551112222" }]]),
      contactPhoneByUser: new Map([["u1", "+15559998888"]]),
    });
    expect(r.phone).toBe("+15559998888");
  });

  it("falls back to users.phone when the contractor has no contact_phone", () => {
    const [r] = buildAlertOutbound(["u1"], {
      externalChannels: true,
      rowByUser: rows([["u1", { phone: "+15551112222" }]]),
      contactPhoneByUser: new Map(),
    });
    expect(r.phone).toBe("+15551112222");
  });

  it("treats anything but a literal true as no SMS consent", () => {
    const rowByUser = rows([
      ["yes", { phone: "+1", sms_consent: true }],
      ["no", { phone: "+1", sms_consent: false }],
      ["null", { phone: "+1", sms_consent: null }],
      ["absent", { phone: "+1" }],
    ]);
    const out = buildAlertOutbound(["yes", "no", "null", "absent"], {
      externalChannels: true,
      rowByUser,
      contactPhoneByUser: new Map(),
    });
    expect(out.map((r) => [r.userId, r.smsConsent])).toEqual([
      ["yes", true],
      ["no", false],
      ["null", false],
      ["absent", false],
    ]);
  });

  // A pro with neither an address nor a number used to be dropped here, which
  // silently cost them their web PUSH too: push needs no contact detail at all
  // (sendOutboundChannels starts it before it looks at them, precisely so a
  // caller holding neither still reaches a phone), but it can only do that for
  // a recipient this function actually returns. They are kept now, with both
  // contact fields null, so email and SMS still cannot fire.
  it("keeps a recipient with no email and no phone, so push still reaches them", () => {
    const out = buildAlertOutbound(["has-email", "has-phone", "has-neither"], {
      externalChannels: true,
      rowByUser: rows([
        ["has-email", { email: "a@example.com", phone: null }],
        ["has-phone", { email: null, phone: "+15551112222" }],
        ["has-neither", { email: null, phone: null }],
      ]),
      contactPhoneByUser: new Map(),
    });
    expect(out.map((r) => r.userId)).toEqual([
      "has-email",
      "has-phone",
      "has-neither",
    ]);
    expect(out[2].email).toBeNull();
    expect(out[2].phone).toBeNull();
    expect(out[2].push).toBe(true);
  });

  // ...but only while push is actually wanted. With every channel off there is
  // genuinely nothing to do, and the recipient is dropped as before.
  it("drops a recipient with no contact details who also turned push off", () => {
    const out = buildAlertOutbound(["nothing-at-all"], {
      externalChannels: true,
      rowByUser: rows([
        [
          "nothing-at-all",
          {
            email: null,
            phone: null,
            notification_prefs: { pro_alert_push: false },
          },
        ],
      ]),
      contactPhoneByUser: new Map(),
    });
    expect(out).toHaveLength(0);
  });

  // The per-channel switches (src/lib/proAlertPrefs.ts). Enforced by
  // withholding the contact detail, so a channel a pro turned off cannot fire
  // however the downstream rules change.
  describe("per-channel job-alert switches", () => {
    const full = {
      email: "a@example.com",
      phone: "+15551112222",
      sms_consent: true,
    };
    const build = (prefs?: Record<string, unknown>) =>
      buildAlertOutbound(["p"], {
        externalChannels: true,
        rowByUser: rows([["p", { ...full, notification_prefs: prefs as any }]]),
        contactPhoneByUser: new Map(),
      })[0];

    it("defaults every channel on for a pro who never opened the settings", () => {
      expect(build()).toMatchObject({
        email: "a@example.com",
        phone: "+15551112222",
        smsConsent: true,
        push: true,
      });
    });

    it("blanks the address when email is switched off, keeping the rest", () => {
      const r = build({ pro_alert_email: false });
      expect(r.email).toBeNull();
      expect(r.phone).toBe("+15551112222");
      expect(r.push).toBe(true);
    });

    it("blanks the number AND the consent when texts are switched off", () => {
      const r = build({ pro_alert_sms: false });
      expect(r.phone).toBeNull();
      // Not just the number: consent is reported false too, so nothing
      // downstream can reconstruct a send from some fallback number.
      expect(r.smsConsent).toBe(false);
      expect(r.email).toBe("a@example.com");
    });

    it("reports push off without touching email or SMS", () => {
      const r = build({ pro_alert_push: false });
      expect(r.push).toBe(false);
      expect(r.email).toBe("a@example.com");
      expect(r.phone).toBe("+15551112222");
    });

    // Only a literal false is off, matching proAlertChannelOn: a legacy row
    // holding null, a string or a 1 must not read as "switched off" and go
    // dark on somebody.
    it("treats anything but a literal false as on", () => {
      expect(build({ pro_alert_email: null }).email).toBe("a@example.com");
    });
  });

  it("reads the CAN-SPAM opt-out off the batched prefs, and only on a literal true", () => {
    const out = buildAlertOutbound(["out", "in", "empty-prefs"], {
      externalChannels: true,
      rowByUser: rows([
        [
          "out",
          { email: "a@example.com", notification_prefs: { email_opt_out: true } },
        ],
        [
          "in",
          { email: "b@example.com", notification_prefs: { email_opt_out: false } },
        ],
        ["empty-prefs", { email: "c@example.com", notification_prefs: null }],
      ]),
      contactPhoneByUser: new Map(),
    });
    expect(out.map((r) => [r.userId, r.emailOptOut])).toEqual([
      ["out", true],
      ["in", false],
      ["empty-prefs", false],
    ]);
  });

  it("reports an unknown opt-out (not an opt-in) when the users row is missing", () => {
    // A pro whose users row didn't come back still has a phone from the
    // contractors table, so there is something to send. sendEmail must fall
    // open on unknown, the same as when its own lookup fails, so the flag has
    // to be undefined rather than false.
    const [r] = buildAlertOutbound(["ghost"], {
      externalChannels: true,
      rowByUser: new Map(),
      contactPhoneByUser: new Map([["ghost", "+15559998888"]]),
    });
    expect(r.emailOptOut).toBeUndefined();
    expect(r.email).toBeNull();
    expect(r.phone).toBe("+15559998888");
  });
});

describe("buildAlertNotificationRows", () => {
  it("writes one identical row per target, keyed by user", () => {
    expect(buildAlertNotificationRows(["u1", "u2"], PAYLOAD)).toEqual([
      { user_id: "u1", kind: "new_lead", title: PAYLOAD.title, body: PAYLOAD.body, url: "/pro" },
      { user_id: "u2", kind: "new_lead", title: PAYLOAD.title, body: PAYLOAD.body, url: "/pro" },
    ]);
  });

  it("normalizes a missing body and url to null, like the single-row insert", () => {
    const [row] = buildAlertNotificationRows(["u1"], {
      kind: "new_lead",
      title: "New job",
    });
    expect(row.body).toBeNull();
    expect(row.url).toBeNull();
  });

  it("produces no rows for no targets, so an empty fan-out inserts nothing", () => {
    expect(buildAlertNotificationRows([], PAYLOAD)).toEqual([]);
  });
});

// CR5#6: same-pro alerts posted close together collapse into one message.
describe("nextCollapsedAlertTitle", () => {
  it("turns a single-job title into the first collapsed count", () => {
    expect(nextCollapsedAlertTitle("New plumbing job just posted")).toBe(
      "2 new jobs in your trades"
    );
  });

  it("increments an already-collapsed title", () => {
    expect(nextCollapsedAlertTitle("2 new jobs in your trades")).toBe(
      "3 new jobs in your trades"
    );
    expect(nextCollapsedAlertTitle("9 new jobs in your trades")).toBe(
      "10 new jobs in your trades"
    );
  });

  it("tolerates stray whitespace on the stored title", () => {
    expect(nextCollapsedAlertTitle("  2 new jobs in your trades  ")).toBe(
      "3 new jobs in your trades"
    );
  });
});

describe("collapsedAlertBody", () => {
  it("matches the count in the title it was built from", () => {
    expect(collapsedAlertBody("3 new jobs in your trades")).toBe(
      "3 new jobs just posted in your trades. Check the board to apply."
    );
  });

  it("falls back to a plain word if the title shape is unexpected", () => {
    expect(collapsedAlertBody("New plumbing job just posted")).toBe(
      "Multiple new jobs just posted in your trades. Check the board to apply."
    );
  });
});

describe("planAlertFanout", () => {
  it("sends every target with no recent row to the fresh-insert group", () => {
    const plan = planAlertFanout(["u1", "u2"], new Map());
    expect(plan.freshTargets).toEqual(["u1", "u2"]);
    expect(plan.collapsedUpdates).toEqual([]);
  });

  it("routes a target with a recent row to a collapsed update instead", () => {
    const plan = planAlertFanout(
      ["u1", "u2"],
      new Map([["u1", "New plumbing job just posted"]])
    );
    expect(plan.freshTargets).toEqual(["u2"]);
    expect(plan.collapsedUpdates).toEqual([
      {
        userId: "u1",
        title: "2 new jobs in your trades",
        body: "2 new jobs just posted in your trades. Check the board to apply.",
      },
    ]);
  });

  it("keeps incrementing a pro who is alerted a third time inside the window", () => {
    const plan = planAlertFanout(
      ["u1"],
      new Map([["u1", "2 new jobs in your trades"]])
    );
    expect(plan.collapsedUpdates[0].title).toBe("3 new jobs in your trades");
  });
});

// The ownership gate (migration 0093) withholds the channels that cost money
// and can be aimed at somebody. It used to take web push down with them, which
// was collateral rather than intent: push has no per-message cost, no carrier,
// and can only reach someone who already installed OakTend and granted
// permission in their own browser.
describe("an unverified posting still reaches push, never email or SMS", () => {
  const full = {
    email: "pro@example.com",
    phone: "+15551112222",
    sms_consent: true,
  };

  it("keeps the recipient, with both contact fields blanked", () => {
    const out = buildAlertOutbound(["p"], {
      externalChannels: false,
      rowByUser: rows([["p", full]]),
      contactPhoneByUser: new Map([["p", "+15553334444"]]),
    });
    expect(out).toHaveLength(1);
    expect(out[0].email).toBeNull();
    expect(out[0].phone).toBeNull();
    // Consent is reported false too, so nothing downstream can reconstruct a
    // send from a fallback number.
    expect(out[0].smsConsent).toBe(false);
    expect(out[0].push).toBe(true);
  });

  it("still honors a pro who switched push off", () => {
    const out = buildAlertOutbound(["p"], {
      externalChannels: false,
      rowByUser: rows([
        ["p", { ...full, notification_prefs: { pro_alert_push: false } }],
      ]),
      contactPhoneByUser: new Map(),
    });
    // Nothing left on any channel, so there is nothing to send at all.
    expect(out).toHaveLength(0);
  });
});
