# Cookie and Tracking Notice

Last updated: {{PRIVACY_EFFECTIVE_DATE}}

**Plain-language summary:** {{BRAND}} uses a small number of cookies and browser-storage items to keep you signed in and make the app work correctly. None of them are advertising cookies. We use a cookieless analytics service from our hosting provider that sets no cookie at all. On our public pages, and only if you tap "Allow analytics," we also use Google Analytics, which sets two cookies to count visits. It never runs while you are signed in, inside the {{BRAND}} iPhone or Android app, or on account pages, sign-in screens, or invite links, and it is off if your browser sends Global Privacy Control or Do Not Track. You can change your choice at any time at the top of this page or on our Your Privacy Choices page, and you can control or delete cookies through your own browser settings.

This notice supplements our Privacy Policy and lists, specifically, the cookies and similar technologies {{BRAND}} uses.

## Cookies we set

All of the following are first-party cookies: set by {{BRAND}} itself, read only by {{BRAND}}, never by an advertiser or a tracking network.

| Cookie | Purpose | Duration | First or Third Party |
|---|---|---|---|
| `sb-*-auth-token` (Supabase) | Keeps you signed in between visits | Managed automatically by Supabase's authentication library | First-party (set by our server through Supabase) |
| `oaktend_did` | A random device identifier, used only to notice when the same device is being used to claim more than one free trial | 400 days | First-party, httpOnly (a page script cannot read it) |
| `oaktend_fp` | A hash of a few browser characteristics, used the same way as `oaktend_did`, to help link accounts that look like the same person | Same lifetime as `oaktend_did` | First-party, set by page script, not httpOnly |
| `oaktend_pwrecovery` | Lets the "set a new password" screen work after you click a password-reset link, and stops a stranger from reaching that screen just by typing its address | 15 minutes | First-party, httpOnly and secure |
| `oaktend_seen` | Records your last activity, so a device that goes 30 days without visiting is automatically signed out | 35 days | First-party, httpOnly and secure; this is a security control and cannot be turned off |
| `oaktend_active_home` | Remembers which property is currently active, for anyone managing more than one home | 1 year | First-party, httpOnly, functional only |
| `oaktend_flash` | Carries a one-time confirmation or error message, such as "Job posted," which is read once and cleared right after | About 30 seconds | First-party, functional only |
| `oaktend_last_reason` | Remembers why you were shown a paywall or upgrade prompt (for example, after asking a question or filing a report), so we can show the right message on the next page | Short-lived | First-party, functional only |
| `oaktend_ho_chat_seen` / `oaktend_chat_seen` | Tracks which chat threads and messages you've already viewed, so unread counts are accurate | 180 days | First-party, functional only |
| `oaktend_campaign` | Remembers which referral or campaign link brought you here, so that if you sign up we can credit the right one | 30 days | First-party, httpOnly |
| `oaktend_gpc_seen` | Records that your browser's Global Privacy Control signal was noticed during this visit | Until you close your browser | First-party, httpOnly |

Cookies set before our September 2026 name change carry the earlier prefix. We still read them during a transition period that ends December 31, 2026, and after that they are ignored.

## Google Analytics cookies (only if you allow them)

These are set only after you tap "Allow analytics" in our cookie notice or on this page, and only on our public pages, such as the home page, guides, city pages, pricing, and these legal pages, while you are signed out. They are never set while you are signed in, inside the {{BRAND}} app, or on account pages, sign-in screens, or invite links. If you allow analytics, Google, a third party, collects information about your visits to our public pages; with Google Signals off, we do not let Google connect it to your activity on other sites.

| Cookie | Purpose | Duration | Provider |
|---|---|---|---|
| `_ga` | Tells one visit from another, with a random number, so we can count returning visitors | Up to 13 months after your last visit | Google LLC (Google Analytics), set on our domain |
| `_ga_<id>` (the part after `_ga_` is our Google Analytics measurement ID) | Keeps track of the current visit, so pages viewed in one visit are counted together | Up to 13 months after your last visit | Google LLC (Google Analytics), set on our domain |

What Google Analytics receives: the public page you viewed, with every part of the address that could identify you removed (all link parameters except standard campaign tags, and a pro's page is sent as "/p/[id]" with the title "Pro page"); the site you came from, reduced to its domain; how long you spend on the page; your device type, browser, screen size, and language; and your IP address, which Google uses to estimate an approximate location, such as country or region. We do not send your name, email, phone number, home address, account ID, or anything you type into a form. Google Signals and ad personalization are turned off, and we do not use Google Analytics for advertising, remarketing, or building ad audiences.

To turn it off: tap "Turn off analytics" at the top of this page or on Your Privacy Choices. We stop sending data right away and delete the `_ga` cookies from your browser. You can also turn on Global Privacy Control or Do Not Track in your browser, block or delete these cookies in your browser settings, or install Google's own opt-out browser add-on (tools.google.com/dlpage/gaoptout).

## Browser local storage (not cookies)

These values live only in your own browser's local storage. They are never sent to our servers, and clearing your browser's site data clears all of them.

- **Theme preference** (`oaktend-theme`): whether you're using light or dark mode.
- **Ask {{BRAND}} chat history** (keyed to your account, for example `oaktend_ask_chat:<your account id>`): the actual text of your conversations with Ask {{BRAND}}. This is the same chat history our Privacy Policy describes as never stored on our servers; it lives only in this browser, on this device.
- **Ask {{BRAND}} usage lock and retention preference**: whether you've already used today's questions, and how long you'd like your chat history kept in this browser.
- **Per-thread "seen" markers**: a timestamp of when you last opened a given message thread, so unread counts stay accurate without a server round trip.
- **Various "seen it" or "dismissed" flags**: for onboarding guides, walkthroughs, referral-ask prompts, the add-to-home-screen prompt, the "enjoying OakTend?" review prompt, push-notification prompts, and this cookie notice itself, so we don't show you the same nudge over and over.
- **Draft autosave**: in-progress onboarding form answers and pro message drafts, so you don't lose your typing if you navigate away.
- **Weather unit preference**: whether you'd rather see Fahrenheit or Celsius.
- **Analytics choice** (`oaktend_analytics_consent`): whether you allowed Google Analytics or chose "Only necessary," so we don't ask again on every page.

None of these local-storage items are shared across accounts or devices, and none of them are used for advertising.

## Third-party cookies

**Stripe.** When you check out for {{BRAND}} Plus or a pro membership, you are taken to Stripe's own hosted checkout page. Stripe may set its own cookies there, on Stripe's domain, for fraud prevention and to process your payment. {{BRAND}} does not set, read, or control these cookies; see Stripe's own privacy policy for what they do.

**Vercel.** Our hosting provider also provides Vercel Web Analytics, a cookieless page-view counter. It sets no cookie and stores nothing in your browser. It records page views, referrer, country and region, device type, and the outcome of a few in-app actions we define, without any identifier that lasts beyond a day. Details are in the Analytics section of our Privacy Policy.

**Google.** If you allow analytics, Google Analytics sets the cookies listed above, on our domain. See "Google Analytics cookies" above for what is sent and how to turn it off, and Google's own page on how it uses data from sites that use its services (policies.google.com/technologies/partner-sites).

**No advertising trackers, anywhere.** {{BRAND}} does not run Meta Pixel, PostHog, session-replay tools, Google Ads, or any other advertising service. We do not use retargeting, and we do not build an advertising profile of you from cookies or any other source.

## Your controls

You can block, delete, or be warned about cookies through your browser's own settings; every major browser has this built in. Blocking the Supabase authentication cookie will prevent you from staying signed in. Blocking `oaktend_pwrecovery` will prevent password reset from working. None of the other cookies are required for {{BRAND}} to function, though a few nudges and preferences may reappear if you clear your local storage. If you clear your local storage, we will ask about analytics again, and Google Analytics stays off until you answer.

You can turn Google Analytics on or off at any time at the top of this page or on our Your Privacy Choices page.

We honor the Global Privacy Control (GPC) signal, where your browser sends it, as a valid opt-out preference. We do not sell or share personal information in the first place, so GPC does not change what happens to your account data. It does turn Google Analytics off: with GPC on, we do not load Google Analytics, even if you allowed it before. We treat a "Do Not Track" browser signal the same way for Google Analytics.

For what we collect and why beyond cookies, see our [Privacy Policy](/privacy).
