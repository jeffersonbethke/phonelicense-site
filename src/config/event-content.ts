/**
 * Rich page content for the event pages, keyed by slug. Logistics + state live
 * in events.ts (the single source flipping status/prices); this holds the
 * page-body copy (agenda, "what changed", sessions, speakers). Still one place
 * to edit per event.
 *
 * DRAFT COPY from the design README — approved-direction. Placeholders per the
 * README "do not ship as-is" list are flagged inline.
 */

export interface WhatChanged {
  index: string; // "01"
  tag: 'NEW' | 'RISING' | 'SHIFT';
  h: string;
  d: string;
}
export interface AgendaSlot {
  time: string;
  h: string;
  note?: string;
  d?: string;
}
export interface Session {
  time: string;
  h: string;
  note?: string;
}

export interface ConferenceContent {
  kind: 'workshop';
  heroLede: string;
  feltNeed: string[];
  whatChanged: WhatChanged[];
  whyBoth: { h: string; d: string; highlight?: boolean }[];
  agenda: { title: string; slots: AgendaSlot[] }[];
  forYou: string[];
  notForYou: string[];
  faqs: { q: string; a: string }[];
  /** returning-couple alumni discount — TODO: set real number */
  alumniDiscount: string;
}

export interface SummitContent {
  kind: 'summit';
  heroLede: string;
  sessions: Session[];
  /** rotating curriculum chips for future editions */
  futureTopics: string[];
  /** past & invited guests — TODO: confirm before listing as confirmed */
  guests: { name: string; work: string }[];
  faqs: { q: string; a: string }[];
}

export const conference: ConferenceContent = {
  kind: 'workshop',
  heroLede: 'It’s harder than you think — and we’re here to help.',
  feltNeed: [
    'Do you feel like you’re losing them to a screen?',
    'Like there’s a whole world in their pocket — and you’re not in it?',
    'Like every rule turns into a fight you’re too tired to have?',
  ],
  whatChanged: [
    { index: '01', tag: 'NEW', h: 'AI companions', d: 'AI “friends” are now the default listener for a lonely 13-year-old. We’ll show you which ones — and what to say.' },
    { index: '02', tag: 'RISING', h: 'The apps that replaced the apps', d: 'Where the attention actually moved this year — and which “harmless” apps aren’t.' },
    { index: '03', tag: 'SHIFT', h: 'Middle-school currency', d: 'What status looks like in your kid’s grade this fall — so “everyone’s doing it” finally makes sense.' },
    { index: '04', tag: 'NEW', h: 'AI-generated everything', d: 'Deepfakes have reached the group chat. What’s circulating — and how to get ahead of it.' },
    { index: '05', tag: 'RISING', h: 'Vanish by default', d: 'Disappearing messages are the norm now. How to build trust that doesn’t depend on surveillance.' },
    { index: '06', tag: 'SHIFT', h: 'This year’s settings, in your hands', d: 'Every topic ends with the exact toggles, scripts, and moves that work this year.' },
  ],
  whyBoth: [
    { h: 'One aligned plan', d: 'One written approach you both actually agreed to.' },
    { h: 'No weak link', d: 'When you’ve both seen the same thing, “but Dad said” stops working.', highlight: true },
    { h: 'A shared reference point', d: '“Remember what they said in Franklin” — a shared language for the hard moments.' },
  ],
  agenda: [
    {
      title: 'Morning · Arrive · See it clearly',
      slots: [
        { time: '9:00', h: 'The 2026 Landscape', note: 'ALL', d: 'The world your kids actually live in — without the panic.' },
        { time: '10:30', h: 'Inside the Apps', note: 'LIVE DEMO', d: 'AI companions and this year’s apps, on screen, as kids see them.' },
        { time: '12:00', h: 'Lunch, Together', note: 'INCLUDED', d: 'Sit with couples in your kids’ exact stage.' },
      ],
    },
    {
      title: 'Afternoon · Solve it · Plan it',
      slots: [
        { time: '1:00', h: 'The Settings Lab', note: 'HANDS-ON', d: 'Phones out. The exact toggles, done together — not screenshots.' },
        { time: '2:30', h: 'The Conversations', note: 'COUPLES', d: 'Scripts by age for the talks you’ve been putting off.' },
        { time: '4:00', h: 'Your Family Plan', note: 'COUPLES', d: 'Your year on paper, signed by both of you. An issuance moment to close.' },
      ],
    },
  ],
  forYou: [
    'Your kids are 8–16 and you feel about a year behind',
    'You and your spouse keep having the same fight with different apps',
    'You want a written plan, not another podcast',
    'You’d rather be early than sorry',
  ],
  notForYou: [
    'You’re looking for someone to blame — tech, school, your kid',
    'You want one more app to spy with instead of a relationship',
    'You’re hoping to hear “it’s not that bad”',
  ],
  alumniDiscount: '[XX]', // TODO: set the real returning-couple discount
  faqs: [
    { q: 'Do we need to have taken the Phone License course first?', a: 'No. The course is day one — the phone handoff. The briefing is every year after. Plenty of families do the conference first and start the course the following week. Both stand on their own.' },
    { q: 'Why per-couple pricing? Can I come alone?', a: 'The whole point is two aligned parents. A ticket admits two, and we strongly encourage both to come. Single parents and co-parents are absolutely welcome — email us and we’ll take care of you.' },
    { q: 'Is this a faith-based event?', a: 'It’s built by people of faith and there’s an optional spiritual thread, but the landscape, tools, and plan are for every family. You will not feel out of place, whatever you believe.' },
    { q: 'What’s included in the ticket?', a: 'The full day for two, the printed workbook, the hands-on settings lab, your drafted family agreement, lunch, and the closing issuance ceremony. You leave with a plan, not just notes. <b>(Supper + guarantee pending business sign-off.)</b>' },
    { q: 'What if we can’t make it after we buy?', a: 'Full refund up to 30 days out. After that, your ticket transfers to another couple or rolls to next year’s edition — no fuss.' },
  ],
};

export const summit: SummitContent = {
  kind: 'summit',
  heroLede: 'Twice a year, we give the topic parents most need a full live morning — then hand you the policy, written.',
  sessions: [
    { time: '9:00', h: 'The state of it', note: 'ALL' },
    { time: '10:00', h: 'Inside the apps', note: 'LIVE WALKTHROUGH' },
    { time: '11:00', h: 'The conversation lab' },
    { time: '12:00', h: 'Your family policy, built live', note: 'LEAVE WITH IT WRITTEN' },
  ],
  futureTopics: [
    'Gaming & the group chat',
    'The first phone',
    'Sleep & the bedroom',
    'Porn — the talk',
    'Online friendship',
  ],
  // TODO: "past & invited" — do NOT present as confirmed without clearance.
  guests: [
    { name: 'Jonathan Haidt', work: 'The Anxious Generation' },
    { name: 'Andy Crouch', work: 'The Tech-Wise Family' },
  ],
  faqs: [
    { q: 'What do we get?', a: 'A live half-day on one topic, the written family policy you build during it, and the replay to keep.' },
    { q: 'Is one seat enough for our family?', a: 'Yes — one seat covers your whole household. Watch together.' },
    { q: 'Can’t make it live?', a: 'The replay is included with every seat. Watch when it works for you.' },
  ],
};

export function contentFor(slug: string): ConferenceContent | SummitContent | null {
  if (slug === 'conference') return conference;
  if (slug === 'summit-fall' || slug === 'summit-spring') return summit;
  return null;
}
