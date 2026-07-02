# Claude Code Prompts — Phone License Events Implementation

Copy-paste these prompts into Claude Code in order. Each assumes the `design_handoff_phone_license_events/` folder is in the repo root (or adjust paths).

---

## Prompt 0 — Orientation (run first)

```
Read design_handoff_phone_license_events/README.md fully. Then explore this codebase and tell me:
1. What framework/stack the site runs on and where pages/routes live
2. Which existing components map to the handoff's design system (buttons, nav, section headers, FAQ accordions) — the tokens should already exist on the Phone License landing page; find them
3. Your plan for implementing the five pages as routes, including how you'll model event state (interest/earlybird/onsale/almostfull/soldout/replay) as data rather than hardcoded copy
Do NOT write code yet. The HTML files in the handoff are design references to recreate in this codebase's patterns, not files to copy in.
```

## Prompt 1 — Shared foundation

```
From design_handoff_phone_license_events/README.md ("Design Tokens" + "State Management"):
1. Add/verify the design tokens (colors, type scale, radii, shadows, button variants) in our theme — reuse the landing page's existing tokens wherever they match; don't duplicate
2. Create an events data model: one config object per event with { slug, kind: 'workshop'|'summit', title, edition: '2026', date, venue, price, capacity, seatsRemaining, state, earlyBirdPrice, earlyBirdDeadline, links }
3. Build the shared components: pill nav with year mark, eyebrow, section head, pill buttons (primary/dark/white/ghost), status badge (all six states), mono seat chip + progress bar, FAQ accordion, sticky mobile CTA bar, photo card with bottom scrim, footer
Copy exact values from the reference HTML — measurements, colors, and copy in the README are final-intent.
```

## Prompt 2 — Conference page

```
Implement /events/raising-kids-in-a-digital-world from design_handoff_phone_license_events/"Raising Kids in a Digital World - 2026.html", per README section 1. Requirements:
- All 19 sections in order, mobile-first at 390px
- All 4 states driven by the event config (see the state table in the README) — every data-states element in the reference must map to conditional rendering
- In 'interest' state, all money CTAs open the first-access capture instead of checkout
- Photos from design_handoff_phone_license_events/assets/ (optimize; the base64 in the reference is prototype-only)
- Strip the black dev bar; page state comes from data
- Keep the placeholders flagged in README "Placeholders & pending decisions" as clearly-marked TODOs (video slot, alumni [XX]%, mock testimonials)
Compare your build against the reference HTML side by side before calling it done.
```

## Prompt 3 — Summit template

```
Implement /events/summit as a TEMPLATE per README section 2, rendering from a summit-edition config (theme, date, sessions[], topicChips[], guests[]). Seed it with the Fall 2026 AI edition from the reference. Two states: interest / onsale. Include the All-Access callout and the conference teaser card that links to the workshop page.
```

## Prompt 4 — Hub + homepage + capture

```
1. Implement /events per README section 3: season hero, photo-led flagship card + two summit cards (badges from event state), rhythm band with year pills, email capture. Cards link to the event pages.
2. Implement the two homepage drop-ins per README section 4: the dismissible announcement bar (style A default; style B when any event is in earlybird/almostfull) and the Live Events section with the two date-led rows. Wire "Events" into the main site nav → /events.
3. Implement the capture + confirmation moments per README section 5: first-access form (name + email only) as inline + modal, and the confirmation screen with exactly ONE next step → the free Readiness Assessment. Personalize with first name.
```

## Prompt 5 — Wiring & QA pass

```
Verify the full loop and fix anything broken:
- Nav: main site nav has Events → /events; every event page's pill nav anchors work; hub cards → event pages; summit teaser → conference; conference rhythm band mentions summits; footers cross-link
- State: flip each event's state in config and confirm every dependent surface updates (hero CTA, seat chip, price pin/amount, final CTA, sticky bar, hub badge, homepage row badge, announcement bar style) with no orphaned copy
- Scarcity honesty: seat counts render only from real data; bars hidden when unknown
- Capture: every confirmation ends at exactly one doorway (Readiness Assessment); no dead ends anywhere — every page ends with a CTA
- Mobile: check all pages at 390px; sticky bars only <900px; announcement bar one line, dismiss persists per state
- Accessibility: accordions keyboard-operable, images have alt text, form fields labeled
Report what you fixed as a checklist.
```

---

**Sequencing note:** run 0→5 in order; each builds on the last. If the site is on a no-code platform (Webflow/Framer) instead of a codebase, use the README as the spec and the HTML files as the visual reference for manual recreation — the state table still defines what varies.
