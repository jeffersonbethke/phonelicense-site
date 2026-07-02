# Handoff: Phone License — Live Events Suite

## Overview
Five interconnected pages for Phone License's live-events funnel (phonelicense.co): an annual in-person workshop, twice-a-year virtual summits, an events hub, homepage drop-in components, and email-capture/confirmation moments. Everything shares one visual system, lifted exactly from the existing Phone License landing page.

**Positioning that shapes every page:** the $49 course solves day one (the phone handoff); the events solve every year after. Events carry a year identity ("2026 Edition", "The 2026 Season") to make the annual rhythm visible and this year's edition feel perishable. Voice: parent-to-parent, confident, hopeful — never fear-mongering, never hypey.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. Your task is to **recreate these designs in the target codebase's existing environment** (Next.js, Webflow, Framer, whatever phonelicense.co runs on) using its established patterns — or, if no environment exists yet, choose the most appropriate stack and implement the designs there.

Two prototype-only constructs to strip during implementation:
1. **The black dev bar** fixed at the top of each page (Pages nav + Mockup-state toggle). It exists so stakeholders can hop between pages and preview states. In production, page state comes from your ticketing/CMS data, not a toggle.
2. **Base64-inlined photos.** All photography is embedded as data URIs so the mockups are self-contained. Production should serve optimized image files (also included in `assets/`).

## Fidelity
**High-fidelity.** Colors, type, spacing, copy, and interactions are final-intent. Recreate pixel-perfectly with the codebase's existing component library. All copy is real and approved-direction (except items marked as placeholders — see "Placeholders & pending decisions").

## Design Tokens

Colors:
- `--bg: #faf9f6` — warm off-white page background
- `--bg-2: #f3f1ea` — secondary band background
- `--surface: #ffffff` — cards
- `--ink: #0f0f10` — near-black; dark bands, primary buttons, footer rows
- `--ink-2: #3a3a3d` — body text
- `--muted: #6b6b66` — secondary text
- `--line: rgba(15,15,16,0.08)`, `--line-2: rgba(15,15,16,0.14)` — hairlines
- `--blue: oklch(0.62 0.14 250)` — brand accent (≈ #4f83cc)
- `--blue-deep: oklch(0.52 0.16 250)` — hover / eyebrow text (≈ #3a68b5)
- `--blue-tint: oklch(0.96 0.03 250)` (≈ #eef2fa), `--blue-tint-2: oklch(0.92 0.05 250)` (≈ #dde7f7)
- Light-blue accent on dark backgrounds: `oklch(0.78 0.13 250)`
- Warning badge (almost full): bg `#f3e3c8` / text `#8a5a14`; sold-out pin: `#b23b3b`

Typography:
- Display/headings: `-apple-system, "SF Pro Display", "Inter", system-ui, sans-serif`, weight 700, letter-spacing −0.035em (heroes −0.04em), line-height ~1.02, `text-wrap: balance`
- Body: same stack ("SF Pro Text"), 15.5–20px, line-height 1.5–1.55, letter-spacing −0.005em
- Mono (eyebrows, badges, meta, dates): `"JetBrains Mono", ui-monospace, monospace`, 10–13px, letter-spacing 0.08–0.22em, uppercase
- Load Inter + JetBrains Mono from Google Fonts

Type scale (clamp-based): hero h1 `clamp(38–52px … 74–128px)`; section h2 `clamp(26px, 5–6vw, 44–60px)`; card h3/h4 17–30px; lede `clamp(18px, 2.5vw, 22px)`
Italic accent pattern: key phrase inside h1/h2 in `font-style:italic; font-weight:600`, usually `--blue-deep` (or light blue on dark)

Radii: pills/buttons 999px; small cards 14px; cards 22px; large cards/bands 32px
Shadows: sm `0 1px 2px rgba(15,15,16,0.04), 0 4px 14px rgba(15,15,16,0.05)`; md `0 8px 30px rgba(15,15,16,0.08), 0 2px 6px rgba(15,15,16,0.04)`; lg `0 30px 80px rgba(15,15,16,0.18), 0 8px 24px rgba(15,15,16,0.08)`
Buttons: pill, padding 15–16px × 24–26px, font 15.5–16px/500. Variants: primary (blue→blue-deep hover), dark (ink→black), white (on photos), ghost (1px line-2 border). All hover `translateY(-1px)`.
Section rhythm: 56–64px vertical padding; `.section-head` centered, max 680–780px, eyebrow → h2 → optional p
Brand mark: 22px rounded square (7px radius), gradient blue→blue-deep 135°, white "L" check via ::after borders
Breakpoints: mobile-first at 390px; grids go multi-column at 620/720/760/820/860/880/900px (see each file)

## Screens / Views

### 1. `Raising Kids in a Digital World - 2026.html` — the conference/workshop page (money page)
$499/couple, early-bird $399, once a year, capped at 200 couples, Sat Oct 17 2026, The Factory at Franklin TN. Section order:

1. **Floating pill nav** (sticky, blur backdrop): brand + "2026" year mark + anchors (This year / Agenda / Hosts / Tickets) + dark "Tickets" CTA pill
2. **Hero** (centered): pill eyebrow "2026 EDITION · ONCE A YEAR" → h1 "Raising Kids in a Digital World *Workshop*" (Workshop italic blue) → italic gut-punch lede "It's harder than you think — and we're here to help." → three meta dots (date / venue / capped at 200 couples) → CTA pair (state-dependent primary + "See the day →" ghost) → seat indicator (state-dependent chip + progress bar) → host avatars + "Hosted by Jefferson & Alyssa Bethke and Dr. Darren Whitehead"
3. **Invite video** — 16:9 rounded frame (dark gradient placeholder), white play button, "YOUR INVITE · 90 SEC" tag, caption. Wire to real video.
4. **Felt need** (centered, quiet): eyebrow "Be honest" → three escalating questions at decreasing opacity (1 / 0.8 / 0.6): "Do you feel like you're losing them to a screen?" / "Like there's a whole world in their pocket — and you're not in it?" / "Like every rule turns into a fight you're too tired to have?" → closing turn: "You're not failing. The terrain changed — and nobody briefed you. *That's what this day is for.*"
5. **Room band** — full-width photo (room-wide.jpg), 460px max height, floating mono caption pill bottom-center: "200 COUPLES · ONE ROOM · NO LECTURES"
6. **"What changed this year"** (ink band): 6-cell dossier grid (3-col ≥1000px, 2-col ≥680px), each cell = index (01/06) + status tag (NEW blue / RISING amber / SHIFT outline) + h4 + short copy. Topics: AI companions; the apps that replaced the apps; middle-school currency; AI-generated everything; vanish by default; this year's settings. "Refreshed for 2026" stamp above (rotated −2°, dashed-feel border, blue tint). Footer line: "Updated every year · because next year this list is different."
7. **Why both of you** — 3 cards (middle highlighted blue-tint): One aligned plan / No weak link / A shared reference point
8. **Agenda** (bg-2 band) — two timetable columns (Morning: "Arrive · See it clearly"; Afternoon: "Solve it · Plan it"), each with 3 time slots (9:00 Landscape [ALL], 10:30 Inside the Apps [LIVE DEMO], 12:00 Lunch Together [INCLUDED]; 1:00 Settings Lab [HANDS-ON], 2:30 The Conversations [COUPLES], 4:00 Your Family Plan [COUPLES])
9. **The Signing** — full-bleed emotional peak: couple-embrace photo at 0.52 opacity over ink + gradient scrim; centered "4:30 PM · THE SIGNING" → "The moment it becomes real." → copy ending "…the five minutes couples talk about on the drive home."
10. **Then we eat** (bg-2) — after-party: supper photo (large) + barn photo (small) grid, copy about the long-table supper in Leipers Fork at Jeff & Alyssa's place, note "supper included with every ticket"
11. **Come back every year** — 3-cell rhythm band (Spring Summit / Fall Conference dark middle / Every year repeat) + alumni card (blue tint) with `[XX]% off` returning-couple discount slot
12. **Hosts** — 2 photo cards: Dr. Darren Whitehead ("The Expert") + Jefferson & Alyssa Bethke ("The Family Builders"), role pills over photos
13. **Testimonials** (ink band) — big centered quote + avatar (Matt & Jenny R., kids 9 & 13, Franklin TN) + 3 cards with face crops (Dana & Marcus T. kids 8 & 11; Sarah & Ben K. kids 12 & 15; Rachel & Tom W. kid 14). Mono footnote marks these as MOCK.
14. **Who this day is for** — two columns: blue-tint "This is for you if…" (4 ✓ items) vs white "It's not for you if…" (3 ✕ items)
15. **Pricing** — single price card (label "COUPLE TICKET · ADMITS TWO", state-dependent price + pin, 5 ✓ inclusions, state-dependent CTA) → anchor line → **Aligned Plan Guarantee** (ink card w/ blue seal: full refund at the door, no form no fuss) → **Why only 200?** ("the afternoon is a lab, not a lecture — past 200 phones, that breaks")
16. **Scholarship** (bg-2) — "Send a couple" card w/ seal: sponsor scholarship couples; mission, not upsell
17. **FAQ** — 5 accordions (course-first? / per-couple & single parents / faith-based? / what's included / refunds-transfers). One open at a time, 45° rotating + icon
18. **Final CTA** (ink rounded band) — state-dependent headline + lede + primary CTA + "Read the FAQ" ghost; fine print "The course is day one · this is every year after"
19. **Footer** + **sticky mobile CTA bar** (<900px: title + state line + state CTA)

#### Conference page states (critical for implementation)
The prototype exposes 4 states via the dev toggle; production drives this from ticketing data. Every element carrying `data-states="…"` in the HTML swaps per state:

| Element | interest | earlybird | almostfull | soldout |
|---|---|---|---|---|
| Hero CTA | "Get first access" (dark) | "Claim early-bird — $399/couple" (blue) | "Reserve your seats — $499" (dark) | "Join the 2027 waitlist" (dark) |
| Seat chip | blue pulse "Doors open in July · first-access list forming" | blue pulse "Early-bird open · 142 of 200 couples remaining" + bar 29% | amber pulse "Almost full · only 18 couples left" + bar 91% | red pulse "Sold out · 2027 waitlist now open" |
| Price card pin | none | "Early-bird · ends July 31" (blue) | "Final release" (blue) | "Sold out" (#b23b3b) |
| Price display | $499 + "per couple · early-bird $399" | **$399** + struck $499 | $499 "final release" | $499 "2026 sold out" |
| Price CTA | Get first access | Claim early-bird — $399 | Reserve your seats — $499 | Join the 2027 waitlist |
| Final CTA h2 | "Get a year ahead — together." | same | same | "The room is full. Get first in line for 2027." |
| Sticky bar line | "Franklin · Oct 17 · first access" | "Early-bird $399 · 142 couples left" | "$499 · only 18 couples left" | "2026 sold out · 2027 waitlist" |

Implementation notes: seat counts (142/18) and bar widths are live data; only render scarcity when true. Early-bird deadline (July 31) should come from config. In `interest` state, all money CTAs open the first-access capture (page 5) instead of checkout.

### 2. `Summit - Fall 2026.html` — summit template (reusable per edition)
$99/family, live virtual half-day, Sat Sept 12 2026 9am–1pm CT, replay included. This is a **template**: spring/fall editions swap theme, date, sessions, and topic chips only.

Sections: nav (brand "The Parent Summit" + "Fall '26" year mark + Tickets pill) → hero (kicker "A TWICE-A-YEAR LIVE SUMMIT · FALL 2026 EDITION", h1 "AI, chatbots & *what's coming.*", lede "Twice a year, we give the topic parents most need a full live morning…", 3 meta dots, state CTAs, chip, note "One seat covers your whole family") → **Sessions** (4 rows on hairline dividers: 9:00 state of AI / 10:00 inside the companion apps [LIVE WALKTHROUGH] / 11:00 conversation lab / 12:00 family AI policy built live [LEAVE WITH IT WRITTEN]) → 2 note cards (Replay included / All-Access members: seat already included) → **rotating curriculum** (ink band): "Spring and fall. *A new topic every time.*", 3 frontier cells (Spring '26 Social Media Readiness · replay; Fall '26 current, blue outline; Spring '27 TBA) + "On the board for future editions" chips (Gaming & the group chat / The first phone / Sleep & the bedroom / Porn — the talk / Online friendship) → **guests band** (bg-2): "Voices worth a morning." 3 cards — Jonathan Haidt (The Anxious Generation), Andy Crouch (The Tech-Wise Family), hosts card (blue tint). Initial-circle placeholders; labeled "PAST & INVITED GUESTS" with per-edition confirmation note — **do not ship names as confirmed without clearance** → testimonial quote → price card ($99, 5 inclusions, state CTA) + All-Access callout → **conference teaser** (ink card): "The summit is the update. *The workshop is the full picture.*" → CTA to conference page → footer + sticky bar.

States: `interest` ("Get first access", "Tickets open in August") and `onsale` ("Get your family's seat — $99", "On sale now · live Sept 12").

### 3. `Events Hub.html` — /events
A **season announcement, not a store**. Sections: nav ("Phone License · Live" + "Get first access" pill) → hero: mono kicker "PHONE LICENSE LIVE", giant h1 "The 2026 *Season.*" (up to 128px), sub "Three live events a year… Then next year, we do it again — because it will all have changed.", mono strip Spring Summit → Fall Summit → The Workshop → **season cards** (photo-led, dark scrim bottom-heavy, white text):
- Flagship full-width: room photo, "03 · OCTOBER 17 · FRANKLIN, TN", kind pill "IN-PERSON WORKSHOP · ONCE A YEAR", h2 "Raising Kids in a Digital World", meta "One day. Both of you. One aligned plan for the year — then supper in Leipers Fork.", $499 + white "Reserve your seats →", badge top-right "GET FIRST ACCESS" (white)
- Two half-width summit cards: Spring (tables photo, "REPLAY AVAILABLE" outline badge, "Watch the replay →") + Fall (circle photo, "ON SALE" blue badge, "Get your seat →"), kind pill "LIVE VIRTUAL SUMMIT"
→ **rhythm band** (bg-2): "New apps every year. *New season every year.*" + year pills 2025 / **2026 · you are here** (ink) / 2027 / 2028 → **capture** (ink rounded): "Never hear about it late." + email input + blue CTA + fine print → footer.
Badge status set for cards: get first access / early bird / on sale / almost full / sold out / replay available.

### 4. `Homepage Components.html` — drop-ins for the existing homepage
Two components shown in real homepage context (existing nav + hero above, gray "rest of page" hint below):
1. **Announcement bar** (above nav, one line, dismissible ✕, two styles): Style A tint (blue-tint bg, dot, "**The 2026 Workshop is coming.** Oct 17 · Franklin, TN · 200 couples · Get first access →") — quiet, lives on every page; Style B ink ("2026 EDITION" blue pill + text + light-blue link) — louder, reserve for early-bird/almost-full windows. Dismiss = cookie; reappears when event state changes.
2. **Live Events section**: full-bleed room photo, bottom-weighted scrim, centered white head: eyebrow "LIVE EVENTS · THE 2026 SEASON" → h2 "You shouldn't have to *figure this out alone.*" → two-sentence sub → ink band with two **date-led rows** (SEP 12 / OCT 17 big date numerals, mono kind line, bold title, badge, →, hover lightens) → footer row: "One workshop a year · capped at 200 couples" + "See the full season →" ghost. Drops between existing "How it works" and "What's included" sections.

### 5. `First Access and Confirmation.html` — capture + confirmation moments
Three moments (toggle in prototype): **Inline card** (brand mark, eyebrow, "Be first through the doors.", first name + email only, dark CTA, fine print "No spam · one email per event · unsubscribe anytime") · **Modal** (over blurred page, scrim rgba(15,15,16,0.45), same form, blue CTA, "Name + email · nothing else") · **Confirmation** (blue seal ✓, "CONFIRMED · FIRST-ACCESS LIST", "You're on the list, {firstName}.", expectation line, then ONE next step in a blue-tint card: "While you wait · 3 minutes → Take the free Readiness Assessment" + blue CTA + trust nudge "It's the same assessment every conference couple takes before the day.").
**The circular funnel rule:** every confirmation gets exactly one doorway (assessment → course → events → back), never a dead end, never two CTAs.

## Interactions & Behavior
- Pill navs: sticky, `backdrop-filter: saturate(180%) blur(20px)`, translucent white
- FAQ accordions: max-height transition 0.35s, one open at a time, icon rotates 45°, opens ink-filled
- Cards/rows hover: `translateY(-3/-4px)` + shadow-md→lg, 0.25s ease; buttons `translateY(-1px)`
- State swapping: prototype pattern is `data-states="a b"` + `[hidden]` toggling — map to conditional rendering off event status
- Sticky mobile CTA bars: <900px only, translucent blur, safe-area padding
- Announcement bar dismiss: persist per event-state (cookie/localStorage), reappear on state change
- Forms: minimum fields (email, or first name + email). Confirmation personalizes with first name.
- Smooth-scroll anchors throughout
- No entrance animations required; design reads static-first

## State Management
- `eventState` per event: `interest | earlybird | onsale | almostfull | soldout | replay` (drives CTAs, chips, pins, prices, sticky bars, hub/homepage badges — single source of truth in CMS/ticketing)
- `seatsRemaining` / capacity (200): drives chip copy + progress bars; hide when not truthful
- `earlyBirdDeadline` (config) — "ends July 31" copy
- First-access list membership → which capture moment renders and confirmation personalization
- All-Access membership (summit): swaps price card for "your seat's already included"
- Menus/links must interconnect: announcement bar + homepage rows → event pages; event pages cross-link (summit teaser → conference; conference rhythm band → summits); hub ↔ all; every capture confirmation → Readiness Assessment. Add "Events" to the main site nav pointing at the hub.

## Assets (in `assets/`)
- `room-wide.jpg` — 200-couples wide room shot (hub flagship, homepage band, conference room band)
- `group-circle.png` — discussion circle (hub fall summit card; testimonial face crops)
- `couple-embrace.png` — couple arm-in-arm (conference "The Signing")
- `tables-laughing.png` — parents at tables (hub spring card; a face crop)
- `leipers-barn.png` + `leipers-supper.jpg` — after-party section
- `darren.jpg`, `jeff-family.jpg` — host portraits
Face crops for testimonial avatars are square crops from the event photos (see data URIs in the conference file). **Verify marketing clearance for every identifiable face before launch.**

## Placeholders & pending decisions (do not ship as-is)
1. Testimonials are **mock** (marked in-page) — replace after Edition One
2. Invite video is a placeholder frame — needs the recorded 90-sec video
3. Alumni discount is `[XX]%` — set the real number
4. Summit guest names (Haidt, Crouch) are "past & invited" — confirm before listing
5. Guarantee ("refund at the door") and included supper are copy commitments — confirm business sign-off
6. Seat counts / bar percentages are sample data
7. Capacity is 200 everywhere; client mentioned possibly 250 — make it a config value

## Files
- `Raising Kids in a Digital World - 2026.html` — conference (all 4 states)
- `Summit - Fall 2026.html` — summit template (2 states)
- `Events Hub.html` — /events season page
- `Homepage Components.html` — announcement bars + live-events section
- `First Access and Confirmation.html` — capture + confirmation moments
- `assets/` — production image files
