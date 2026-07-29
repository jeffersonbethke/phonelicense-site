# Inputs still needed — Phone License site

**Build status: all 6 phases complete** (foundation, quiz, sales homepage, event
promo layer, event pages, churches, tracking + polish). Live site is untouched —
everything is on the `astro-rebuild` branch / preview until you cut over.

**Lighthouse (mobile, production conditions):** homepage, quiz, conference all
**Perf 100 · A11y 94–98 · Best Practices 96 · SEO 100.** (Previews show SEO ~60
only because Vercel adds a `noindex` header to preview URLs — gone in production.)

The site runs on placeholders. Drop real values into `.env` and `/src/config/*`
as they arrive — **no code changes required**. See `/admin/config` for a
plain-English guide.

## ✅ How to verify tracking once the Pixel ID is in
1. Add `PUBLIC_META_PIXEL_ID` to `.env`, redeploy.
2. Install the **Meta Pixel Helper** Chrome extension.
3. Visit the homepage → expect `PageView` + `ViewContent`.
4. Submit any form → expect `Lead` (with an eventID).
5. Click a buy button → expect `InitiateCheckout` with the offer value.
   (Kajabi fires `Purchase` itself after checkout.)

## 🚀 Go-live (when you're ready — your call, fully reversible)
1. Fill real values in `.env` + `src/config/offers.ts` + confirm `src/config/events.ts`.
2. Merge `astro-rebuild` → `main` (or run `vercel deploy --prod`).
3. Vercel builds Astro and phonelicense.co serves the new site.
   Rollback = redeploy the previous build (seconds).

## 🔴 Blocks going LIVE (fine for previews without them)

| # | Item | Where it goes | Status |
|---|------|---------------|--------|
| 1 | **Zapier/Make webhook URL** (the form inbox) | `.env` → `PUBLIC_WEBHOOK_URL` | ⬜ waiting |
| 2 | **Meta Pixel ID** (~15-digit number) | `.env` → `PUBLIC_META_PIXEL_ID` | ⬜ waiting |
| 3 | **Kajabi offer URLs** — $99 course | `src/config/offers.ts` | ⬜ waiting |
| 4 | **Exact Kajabi tag names + expected field keys** (what the Zap maps into Kajabi) | `src/config/*` tags | ⬜ waiting |

## ⛪ Church funnel — self-serve (built, needs 4 values)

Pastor journey: `/churches` → `/churches/setup` → Kajabi → `/churches/done`
(link + QR appear instantly) → shares `/c/{slug}` → families check out at $49.

**Model:** church pays **$495/year**, families pay **$49** (vs $99 retail).
Prepaid alternative — $25/family, families free, 20-family minimum — is
deliberately *not* self-serve and routes to `PUBLIC_CALENDLY_URL`.
All terms live in one file: `src/config/church.ts`.

| # | Item | Where it goes | Status |
|---|------|---------------|--------|
| 1 | **Church License checkout URL** ($495/yr recurring) | `offers.ts` → `churchLicense.url` | ⬜ waiting |
| 2 | **Church-family checkout URL** ($49) — either a dedicated offer, or the $99 offer + coupon | `offers.ts` → `courseChurch.url` | ⬜ waiting |
| 3 | **The universal coupon code** + confirm Kajabi's coupon query param (`coupon` vs `coupon_code`) | `church.ts` → `familyCode` / `couponParam` | ⬜ waiting |
| 4 | **Kickoff Night talk** — film it, then set `kickoff.filmed = true` + swap the placeholder video frame | `church.ts` → `kickoff` | ⬜ waiting |

### 🔑 The ONE thing Ian must do
Set the Church License offer's **post-purchase thank-you redirect → `/churches/done`**
in Kajabi. Nothing else about the funnel needs a human. Without it the pastor
still gets their link (the `/churches/done` fallback form rebuilds it from the
church name), but the magic moment is lost.

### Why there is no per-church coupon
Attribution rides on the **slug**, never on a code — that's what keeps this
zero-touch. One universal 50%-off code is safe in the wild (worst case someone
pays $49 instead of $99). A 100%-off code would not be, which is exactly why the
free-families option stays a talk-to-us deal. Don't "improve" this by minting a
coupon per church; it reintroduces the manual step the whole system removes.

### Notes for whoever touches this next
- `/c/{slug}` and `/c/{slug}/kit` work for **any** slug, instantly, with no
  directory or database — the name is title-cased from the slug. Two rewrites in
  `vercel.json` make that true at the CDN. Verified: Vercel checks the filesystem
  *before* these rewrites, so real pages still win.
- Capture is best-effort and time-capped everywhere. A dead webhook must never
  block a pastor reaching checkout. Optional second inbox:
  `.env` → `PUBLIC_CHURCH_WEBHOOK_URL` (falls back to the main webhook).
- The two `is:inline` scripts on the `/c` pages must stay **inside** the layout
  slot. Moved outside, Astro emits them after `</html>` and the church name
  flashes. (This bit us once already.)

## 🟡 Needed per-phase (not yet)

| Item | Needed for | Where |
|------|-----------|-------|
| **Premium Kit price** — $79 was set against the old $49 course and is now *below* the $99 base. Needs a new number or folding into the $24 bump. Inert until then (nothing links to it). | Phase 2 | `offers.ts` |
| Conference offer URL + how early-bird $399 is applied (coupon vs offer) | Phase 4 | `offers.ts` |
| Summit + All-Access offer URLs | Phase 4 | `offers.ts` |
| Calendly URL / mailto for church "planning something bigger" | Phase 5 | `.env` → `PUBLIC_CALENDLY_URL` |
| Optional GA4 Measurement ID | any | `.env` → `PUBLIC_GA4_ID` |
| Final quiz copy + weighted scoring — **DRAFT in place, needs Jeff's review/replace** | Phase 1 ✅ built | `src/config/quiz.ts` |
| Free "Family Phone Contract" PDF — delivered by Kajabi email on `Lead - Contract PDF` tag (or ask Claude to draft) | Phase 2 ✅ built | Kajabi automation |
| **Premium Kit** offer URL + confirm price (drafted at $79) | Phase 2 ✅ built | `offers.ts` |

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
