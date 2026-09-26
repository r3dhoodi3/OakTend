import { describe, it, expect } from "vitest";
import {
  PRO_ALERT_CHANNELS,
  PRO_ALERT_PREF_KEYS,
  carryProAlertPrefs,
  proAlertChannelOn,
  proAlertChannels,
} from "./proAlertPrefs";

describe("proAlertChannelOn: absent means on", () => {
  // The whole default. A pro who signs up and never finds the settings page
  // must still get their leads - a marketplace that delivers nothing until you
  // tick a box is worse than useless during a cold start.
  it("is on for a pro with no prefs at all", () => {
    for (const key of PRO_ALERT_PREF_KEYS) {
      expect(proAlertChannelOn(null, key)).toBe(true);
      expect(proAlertChannelOn(undefined, key)).toBe(true);
      expect(proAlertChannelOn({}, key)).toBe(true);
    }
  });

  it("is off only on a literal false", () => {
    expect(proAlertChannelOn({ pro_alert_email: false }, "pro_alert_email")).toBe(
      false
    );
    // A legacy or hand-edited row must not read as "off" and silently go dark.
    expect(proAlertChannelOn({ pro_alert_email: null }, "pro_alert_email")).toBe(
      true
    );
    expect(
      proAlertChannelOn(
        { pro_alert_email: 0 } as unknown as { pro_alert_email?: boolean },
        "pro_alert_email"
      )
    ).toBe(true);
  });

  it("switches channels independently", () => {
    expect(proAlertChannels({ pro_alert_sms: false })).toEqual({
      email: true,
      sms: false,
      push: true,
    });
  });
});

describe("carryProAlertPrefs: the homeowner form must not wipe these", () => {
  // saveNotificationPrefsAction rebuilds notification_prefs from its own
  // checkboxes and writes the whole jsonb back. Without carrying these three
  // across, a dual-side account (a founder testing both sides is exactly one)
  // would turn every pro alert channel back on just by saving an unrelated
  // homeowner toggle - because absent means ON.
  it("carries the switched-off channels onto a rebuilt blob", () => {
    const rebuilt = carryProAlertPrefs(
      { pro_alert_email: false, pro_alert_sms: true, email_opt_out: true },
      { reminders: true }
    );
    expect(rebuilt).toEqual({
      reminders: true,
      pro_alert_email: false,
      pro_alert_sms: true,
    });
  });

  it("carries nothing when the pro never set anything", () => {
    expect(carryProAlertPrefs(null, { reminders: true })).toEqual({
      reminders: true,
    });
    // A non-boolean is not a preference somebody set through the form, so it
    // is not carried either - it would only re-introduce a junk value.
    expect(
      carryProAlertPrefs({ pro_alert_email: "yes" }, { reminders: true })
    ).toEqual({ reminders: true });
  });
});

describe("PRO_ALERT_CHANNELS", () => {
  it("covers exactly the keys the fan-out honors", () => {
    expect(PRO_ALERT_CHANNELS.map((c) => c.key).sort()).toEqual(
      [...PRO_ALERT_PREF_KEYS].sort()
    );
  });

  // The SMS row has to say so: a pro ticking it without sms_consent on their
  // profile would otherwise expect texts that the TCPA gate will never send.
  it("tells a pro that texts need the separate consent", () => {
    const sms = PRO_ALERT_CHANNELS.find((c) => c.key === "pro_alert_sms")!;
    expect(sms.desc.toLowerCase()).toContain("agreed to texts");
  });
});
