# Inputs still needed — Phone License site

The site is built to run on placeholders. Drop real values into `.env` and
`/src/config/*` as they arrive — **no code changes required**. Claude re-surfaces
this list at the end of every phase.

## 🔴 Blocks going LIVE (fine for previews without them)

| # | Item | Where it goes | Status |
|---|------|---------------|--------|
| 1 | **Zapier/Make webhook URL** (the form inbox) | `.env` → `PUBLIC_WEBHOOK_URL` | ⬜ waiting |
| 2 | **Meta Pixel ID** (~15-digit number) | `.env` → `PUBLIC_META_PIXEL_ID` | ⬜ waiting |
| 3 | **Kajabi offer URLs** — $49 course | `src/config/offers.ts` | ⬜ waiting |
| 4 | **Exact Kajabi tag names + expected field keys** (what the Zap maps into Kajabi) | `src/config/*` tags | ⬜ waiting |

## 🟡 Needed per-phase (not yet)

| Item | Needed for | Where |
|------|-----------|-------|
| Church tier offer URLs ($349 / $899 / $1,999) | Phase 5 | `offers.ts` |
| Conference offer URL + how early-bird $399 is applied (coupon vs offer) | Phase 4 | `offers.ts` |
| Summit + All-Access offer URLs | Phase 4 | `offers.ts` |
| Calendly URL / mailto for church "planning something bigger" | Phase 5 | `.env` → `PUBLIC_CALENDLY_URL` |
| Optional GA4 Measurement ID | any | `.env` → `PUBLIC_GA4_ID` |
| Final quiz copy + weighted scoring (7–9 Qs, 3 score bands, both-path results, $49 pitch) | Phase 1 | `src/config/quiz.ts` |
| Free "Family Phone Contract" PDF (or ask Claude to draft) | Phase 2 | `public/` |

## 🟢 Placeholders that CANNOT ship as-is (from design README)

| Item | Current placeholder | Decision needed |
|------|--------------------|-----------------|
| Testimonials | 1 mock quote, marked `mock: true` | Real cleared quotes after Edition One |
| Invite video (conference) | placeholder frame | Recorded 90-sec video |
| Alumni returning-couple discount | `[XX]%` | Real number |
| Summit guest names (Haidt, Crouch) | "past & invited" | Confirm before listing as confirmed |
| "Refund at the door" guarantee + included supper | copy commitments | Business sign-off |
| Conference capacity | 200 | Confirm 200 vs 250 |
| Event dates / venues / prices / current status / real seat count / early-bird deadline | seed guesses in `events.ts` | Confirm each |

## Notes
- **Route names in use:** `/quiz`, `/conference`, `/summit-spring`, `/summit-fall`,
  `/events`, `/churches`. (README used nested `/events/...`; confirm if you'd rather.)
- The **live site (phonelicense.co) is untouched** — this work is on the
  `astro-rebuild` branch; production still serves the old `index.html` until we cut over.
