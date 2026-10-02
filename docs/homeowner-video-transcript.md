# Homeowner Landing Page Demo Video: Transcript and Caption Timeline

Source component: `src/components/HeroDemoPlayer.tsx` (homeowner landing page, `src/app/page.tsx`).
Voiceover files: `public/demo-vo/*.mp3` (7 clips, msedge-tts `en-US-AvaNeural` at rate -8%, `audio-24khz-96kbitrate-mono-mp3`). All seven were re-recorded on 2026-10-01 with `OakTend-marketing/video-script-2026-10-01/gen-vo.mjs`, which also writes each word's start time (TTS WordBoundary events). Those word times live in `VO_WORD_MS` in the component and drive the captions.
Timing basis: 160 BPM, 375 ms per beat, 82 beats total, 30.750 s runtime at 1x speed. Script decisions: `OakTend-marketing/video-script-2026-10-01/final-v1.md`.

## Full voiceover transcript

When did you last flush your water heater? Find out with just your address. OakTend tells you what's due. That overdue water heater? Done. Something leaking? Describe it once. Posting is free. Pros are coming soon. They pay us only if you hire. Booked, no phone tag. Want your free home plan? Add your address.

## Scenes and cues

| Scene | Window (s) | Clip | Cue | Clip length | Ends | On screen |
|---|---|---|---|---|---|---|
| hook | 0.000 - 4.875 | hook.mp3 | 0.700 | 2.448 | 3.148 | Dashboard framed on the overdue "Flush water heater" task (no logo card) |
| address | 4.875 - 8.250 | address.mp3 | 4.875 | 2.304 | 7.179 | Address typed, Continue |
| dash | 8.250 - 14.250 | dash.mp3 | 8.250 | 4.824 | 13.074 | Score counts to 71, water heater task checked off at 11.6 s |
| postjob | 14.250 - 19.500 | postjob.mp3 | 14.250 | 4.560 | 18.810 | Faucet job posted, "Posting a job is free." |
| chat | 19.500 - 27.000 | chat.mp3 | 19.875 | 4.056 | 23.931 | Tony R.'s message, homeowner reply |
| chat | (same) | booked.mp3 | 24.675 | 2.136 | 26.811 | Booked badge at 24.375 s |
| end | 27.000 - 30.750 | end.mp3 | 27.150 | 3.216 | 30.366 | End card: "Free during preview. No card needed." (outside preview: "Free for your first home. No card needed."), Get started free |

## Captions

- The hook question shows whole on two lines ("When did you last / flush your water heater?") from its first word until the address line replaces it at the scene cut.
- Every other line shows in chunks of up to 2 words, never across a sentence end. Each chunk appears when its first word is spoken (from `VO_WORD_MS`) and the caption clears when the clip ends.
- Mid-video chip at 21.0 s: "Free for you, no card needed".
- Chromium check on 2026-10-01: every chunk appeared 37 to 73 ms after its word was spoken, every caption cleared within 15 ms of its clip ending, and no clip overran its scene.
