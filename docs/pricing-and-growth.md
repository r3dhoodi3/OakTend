# OakTend pricing

Rewritten 2026-09-20. The earlier version of this file described a pricing model that was retired on 2026-09-10 (fees to apply, a prepaid balance for pros, and a paid homeowner tier needed to reach pros). None of that is the plan any more, so the text was removed. The old version is in git history if anyone needs it.

## Where things stand today

OakTend is in a homeowner preview.

- Everything is free. No payments of any kind are taken.
- The pro side is closed. The public sees a coming-soon page with a waitlist.
- Memberships show as "coming soon" and cannot be bought.
- While the pro side is closed, the OakTend team looks for a local pro by hand for jobs homeowners post. We do not promise to find one. Any pro is an independent business, not our employee or agent, and we do not vet or guarantee their work. Homeowners are told to check the license at cslb.ca.gov and ask for proof of insurance before hiring.
- A homeowner's name, email, phone and address go to a pro only after the homeowner chooses that pro.

## The planned model, for when payments open

- Pros: applying, quoting and messaging are free. When a homeowner hires a pro through the app, the pro pays a success fee of 5% of the agreed job price, with a $15 minimum and a $1,000 cap.
- Payment for the work: the homeowner pays the pro's invoice inside the app, through Stripe, after the work is done. The money goes from the homeowner to the pro. OakTend does not hold it. There are no holds and no escrow.
- Homeowner Plus (optional): planned at $1.99 a week, $4.99 a month or $39.99 a year, with a 3-day free trial. Posting jobs and reaching pros never requires a membership.
- OakTend Pro membership (optional): planned at $29.99 a month or $239.88 a year, with a 3-day free trial. It never gates access to jobs.

The published source for all of this is the Billing policy (`src/content/legal/billing.md`), the Terms (`src/content/legal/terms.md`) and the Pro Terms (`src/content/legal/pro-terms.md`). If this file and those documents ever disagree, the published documents are right and this file needs fixing.

## Rules for growth work

- Never tell a homeowner or a pro something you have not checked is true.
- Do not describe any pro as vetted, trusted or guaranteed. OakTend shows a point-in-time CSLB license lookup and says exactly that.
- Say who you are. Anyone posting about OakTend in a community group says they work on OakTend.
- Ask every customer for a review, not only the happy ones.
