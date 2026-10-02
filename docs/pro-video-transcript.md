# Pro Landing Page Demo Video: Transcript and Caption Timeline

Source component: `src/components/ProDemoPlayer.tsx` (pro landing page, `src/app/pros/page.tsx`; hidden during the homeowner preview, when /pros shows the coming-soon page).
Voiceover files: `public/demo-vo/pro/*.mp3` (6 clips, msedge-tts `en-US-AvaNeural` at rate -8%, `audio-24khz-96kbitrate-mono-mp3`). All six were re-recorded on 2026-10-01 with `OakTend-marketing/video-script-2026-10-01/gen-vo.mjs`, which also writes each word's start time. Those word times live in `VO_WORD_MS` in the component and drive the captions.
Timing basis: 160 BPM, 375 ms per beat, 81 beats total, 30.375 s runtime at 1x speed. The win hit stays on beat 65; the FINAL hit moved from beat 72 to 74 so it lands on the end-card cut. Script decisions: `OakTend-marketing/video-script-2026-10-01/final-v1.md`.

## Full voiceover transcript

How many paid leads went nowhere for you this year? Local homeowners can post here. Applying is free. No leads to buy. Tap apply. OakTend writes the first draft for you. Talk, quote, and invoice in one thread. No extra apps. You pay 5% only when you're hired. See nearby jobs.

## Scenes and cues

| Scene | Window (s) | Clip | Cue | Clip length | Ends | On screen |
|---|---|---|---|---|---|---|
| hook | 0.000 - 4.875 | hook.mp3 | 0.250 | 3.096 | 3.346 | Leads board, one open plumbing job |
| leads | 4.875 - 10.875 | leads.mp3 | 4.875 | 5.808 | 10.683 | Hand rests on "Applying is free." |
| apply | 10.875 - 16.500 | apply.mp3 | 10.875 | 4.056 | 14.931 | Apply, "Draft a message for me", Send application |
| chat | 16.500 - 23.250 | chat.mp3 | 16.875 | 5.160 | 22.035 | Thread with Dana M., "Send a quote" / "Send an invoice" |
| won | 23.250 - 27.750 | won.mp3 | 24.450 | 2.976 | 27.426 | "You got the job" badge at 24.375 s |
| end | 27.750 - 30.375 | end.mp3 | 27.938 | 1.944 | 29.882 | End card: fee terms, button "See nearby jobs" |

## Captions

- The hook question shows whole on two lines ("How many paid leads went / nowhere for you this year?") from its first word until the leads line replaces it at the scene cut.
- Every other line shows in chunks of up to 2 words, never across a sentence end. Each chunk appears when its first word is spoken and the caption clears when the clip ends.
- Mid-video chip at 21.0 s: "Free to apply, no leads to buy".
- Chromium check on 2026-10-01: every chunk appeared 33 to 61 ms after its word was spoken, every caption cleared within 10 ms of its clip ending, and no clip overran its scene.
