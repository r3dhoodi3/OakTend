# OakTend Launch Playbook: Fountain Valley + Huntington Beach

Compiled 2026-07-07 from four research lanes (marketplace liquidity, growth loops, homeowner acquisition, pro recruiting). Full sourced reports live in the session transcripts; this is the operational version.

Updated 2026-09-20: the pro scripts and rules below were rewritten for the current model (applying is free, a 5% success fee when hired, no prepaid balance of any kind) and for the homeowner preview (pro side closed, nothing charged). The earlier scripts described retired programs and must not be used.

**Rules that apply to everything in this playbook:**

- Never text or tell a homeowner or a pro something you have not checked is true at that moment.
- Only text people who have opted in to texts.
- Say "I work on OakTend" or "I'm the founder of OakTend" in every community post, comment and message. Never post as if you were only a resident.
- Ask every customer for a review, not only the happy ones.
- Never call a pro vetted, trusted or guaranteed. OakTend shows a point-in-time CSLB license lookup and says exactly that.

**Action zero: host the app publicly.** Nearly every channel below needs a live URL (QR codes, ads, Nextdoor, inspector co-branding). Vercel hobby tier is free, runs the crons, and gives the Stripe webhook a public URL.

---

## The launch shape

- 3-5 contiguous zip codes (start 92708 + adjacent HB), NOT metro-wide.
- 2 categories: plumbing (urgent; slab leaks are endemic in 1960s-70s FV/HB tract homes) + pest & termite control (recurring; coastal OC drywood pressure, swarm season Aug-Oct). Both categories exist in the app.
- 8-12 active pros per category. Each active pro needs 2-4 leads/month or they quit, so 10 pros need 25-40 jobs/month: demand is the scarce side.
- During the preview the team looks for a local pro by hand for each posted job. Tell the homeowner only what is true: "We are looking for a local pro for your job. We can't promise to find one. If it is urgent, call a local licensed company now." Ask the homeowner before passing their contact details to any pro, remind them the pro is an independent business we have not vetted, and tell them to check the license at cslb.ca.gov and ask for proof of insurance.

## Weekly dashboard (one spreadsheet row per week)

1. Jobs getting >= 1 application within 24h: target 80%+ (red alert under 50%)
2. Median time to first response: under 4 hours
3. Homeowner hire rate (jobs 14+ days old): 40%+
4. Pro application-to-win rate: 30%+ (under 15% = pros will churn)
5. Share of active pros getting 2+ leads/month: 70%+
6. Job-post completion rate: 60%+
7. Share of demand from repeats/referrals: trending up

The one signal that cannot be faked: pros who keep applying after their first win.
Kill trigger: fill rate under 50% or application-to-win under 15% for 3+ straight weeks despite concierge effort.

---

## Recruiting the first 25 pros

Recruit 30-40 signups to net 16-24 active (about half of cold-recruited supply never activates). Realistic yield at ~15 hrs/week: 2-4 signups/week.

**Ranked channels:**
1. Trade association meetings: CAPMA Orange County district (pest; renamed from PCOC in 2024, use the new name) meets the 2nd Thursday monthly, 5pm social, Dave & Buster's Irvine Spectrum. PHCC-ORSB (plumbing), Anaheim.
2. Supply-house counters: Ferguson, 1651 S. Ritchey St, Santa Ana, 6-8am weekdays. Ask the branch manager about a counter-day table.
3. Referrals: from pro #3 on, ask every signup "who else should be on this?"
4. Personalized cold email + phone follow-up (reference their actual reviews; owners reply most).
5. Facebook contractor groups / ContractorTalk: listen and DM individuals; never mass-post.

**Cold email (100-150 words):**
> Subject: Question about [Company] serving Fountain Valley
>
> Hi [Name], I'm [founder name], I live locally and I built a small jobs board called OakTend for FV and Huntington Beach homeowners. I'm choosing the first 10 [plumbers] for the launch and your reviews on [Google/Yelp specific detail] made you an obvious call.
>
> The honest version: we're new, so I won't promise volume. The pro side isn't open yet, so right now this is a waitlist. When it opens: applying, quoting and messaging are free. If a homeowner hires you, OakTend charges you 5% of the job, $15 minimum, $1,000 cap. There are no fees to apply and nothing to prepay.
>
> Worth 10 minutes this week? I'm the founder, this is my cell: [number].

**Supply-house counter, 30 seconds:**
> "Morning, quick one while you're in line. I'm [name], I'm the founder of OakTend, a jobs board for Orange County homeowners. Applying is free. If a homeowner hires you, OakTend charges you 5% of the job, $15 minimum, $1,000 cap. Nothing to prepay and no fees to apply. We are new, so I will not promise volume, and the pro side isn't open yet, so today it's a waitlist. Card's got my number on it, I answer it myself."

**Phone follow-up objection handling:**
- "Fake leads": every job is posted by the homeowner themselves. We do not verify the job, and we say so. You pay nothing unless you are hired.
- "What does it cost me if the homeowner goes quiet?": nothing. Applying and messaging are free, so there is nothing to refund.
- "Empty platform": concede immediately. We are new and the pro side isn't open yet. Joining the waitlist costs nothing.

**Never promise:** lead volume, income figures, "homeowners ready to hire" (that phrase is in the FTC's $7.2M HomeAdvisor order), exclusivity, or anything about a homeowner you have not checked.

**Keeping seed pros alive with zero jobs (first 30 days):**
- Day 0 onboarding call, founder does the typing: profile complete, license verified, one single-player win (AI estimate from an old invoice).
- Day 2 message: their public profile URL. Reviews on OakTend come only from homeowners who hired the pro through OakTend, and every such customer is asked, not only the happy ones.
- Day 7 personal check-in with an honest demand report. Over-communicate; silence kills.
- First matched job: a personal message alongside the alert, if the pro opted in to texts.
- Day 30 call: what would make you leave, who should I recruit next.

---

## Homeowner acquisition: 30-day action list

| # | Channel | First action | Cost | Honest yield |
|---|---------|-------------|------|--------------|
| 1 | Home inspectors | Email 10 serving 92708/92646-49: free co-branded digital binder, their report pre-loaded via /inspection | $0 | 2-3 partners = 5-20 signups/mo, compounding |
| 2 | FV Living Magazine | Call 714-202-7750 for the rate card (mailed to ALL ~25,000 92708 homes monthly) | ~$300-800/mo | One ad reaches every FV home |
| 3 | Facebook groups | Join FV Community Forum, Explore FV, HB CommUNITY Voice, HB Community Forum 2.0, HB4U, saying in your profile and posts that you are the founder of OakTend; 2 weeks of helpful answers; then offer admins a free FV/HB maintenance calendar | $0 | 10-30 signups from one well-received resource post |
| 4 | Nextdoor | Verified Business Page; answer "anyone know a good plumber" threads | $0 | 5-15/mo, highest intent |
| 5 | Farmers markets | Surf City Nights (Tuesdays, Main St HB) + Mile Square Fri market; booth: "free 5-min home health score" demo | $50-150/night | 10-25 signups/session; also meet realtors + pros |
| 6 | Door hangers | FIRST call FV City Clerk 714-593-4400 re Ch. 4.20 permit rules; then 1,000 hangers, founder-walked, one tract (Green Valley/Talbert), QR to seasonal checklist | ~$100-150 | 5-20 signups per 1,000 |
| 7 | Patch + Daily Pilot | Free bulletin posts (both cities); pitch the Pilot the founder story | $0 | A Pilot story = 50-150 signup spike |
| 8 | HOAs | Email GVHRA (1,048 homes) + Greenbrook: newsletter blurb + free workshop | $0 | One yes = 1,000+ households |
| 9 | Realtors | Ask recruited pros which 2 agents send them work; coffee; closing-gift pitch | $0 | 1 active agent = 2-5 new-buyer signups/mo |
| 10 | Library bulletin boards | One afternoon: HB Central + branches (submit per display policy) + FV Library | ~$20 | Trickle, nearly free |

**Message priority:** lead with privacy ("your number is never sold, and your contact details go only to the pro you choose"), second "your FV/HB home is 50+ years old, know what needs attention before it breaks." Do NOT lead with "AI-powered" to this demographic; keep AI as the live demo wow.

**Seasonal hooks (ready-made content calendar):** July-Sept AC strain, Aug-Oct drywood termite swarm season, September Santa Ana wind prep, Sept-Oct pre-rain roof/gutter.

**Google Business Profile:** one was created on 2026-09-16. An earlier version of this playbook warned that online-only marketplaces can be ineligible and risk suspension. Check what address and category the profile shows, and raise it with the attorney.

**Do NOT:** buy paid ads yet, use yard/bandit signs (code enforcement fines both cities), knock doors in FV without the Ch. 4.20 permit, booth at US Open/Pacific Airshow (tourist-heavy, event-scale pricing), lead with AI in first-touch copy.
