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
    { index: '01', tag: 'NEW', h: 'AI companions', d: 'Chatbot “friends” that never log off — and how they’re landing in middle-school bedrooms.' },
    { index: '02', tag: 'RISING', h: 'The apps that replaced the apps', d: 'Where kids actually are this year, and what moved since last year.' },
    { index: '03', tag: 'SHIFT', h: 'Middle-school currency', d: 'Streaks, close-friends lists, and the new social math of who’s in and who’s out.' },
    { index: '04', tag: 'NEW', h: 'AI-generated everything', d: 'Deepfakes, fake nudes, and homework — what’s real, what’s not, and how to talk about it.' },
    { index: '05', tag: 'RISING', h: 'Vanish by default', d: 'Disappearing messages and private accounts, and what visibility you can actually keep.' },
    { index: '06', tag: 'SHIFT', h: 'This year’s settings', d: 'The exact device + router settings that changed, walked through live.' },
  ],
  whyBoth: [
    { h: 'One aligned plan', d: 'You leave with the same rules, in writing — not two half-remembered versions.' },
    { h: 'No weak link', d: 'Kids find the gap between parents. When you’re aligned, there isn’t one.', highlight: true },
    { h: 'A shared reference point', d: 'When it gets hard at home, you both point back to the same day, the same agreement.' },
  ],
  agenda: [
    {
      title: 'Morning · Arrive · See it clearly',
      slots: [
        { time: '9:00', h: 'The Landscape', note: 'ALL' },
        { time: '10:30', h: 'Inside the Apps', note: 'LIVE DEMO' },
        { time: '12:00', h: 'Lunch Together', note: 'INCLUDED' },
      ],
    },
    {
      title: 'Afternoon · Solve it · Plan it',
      slots: [
        { time: '1:00', h: 'The Settings Lab', note: 'HANDS-ON' },
        { time: '2:30', h: 'The Conversations', note: 'COUPLES' },
        { time: '4:00', h: 'Your Family Plan', note: 'COUPLES' },
      ],
    },
  ],
  forYou: [
    'You’ve got a kid at or near the phone years — first phone or a reset',
    'You want a plan, not a panic',
    'You and your partner want to get on the same page',
    'You’d rather do the work now than clean up later',
  ],
  notForYou: [
    'You want someone to just take the phone away for you',
    'You’re looking for fear, not a framework',
    'You want a lecture you can sit passively through',
  ],
  alumniDiscount: '[XX]', // TODO: set the real returning-couple discount
  faqs: [
    { q: 'Do we need the course first?', a: 'No. The course solves day one — the handoff. The workshop is the annual briefing on everything that’s changed since. Many families do both; neither requires the other.' },
    { q: 'Is it per couple? What about single parents?', a: 'A ticket admits two — bring your partner, a co-parent, a grandparent, or a friend. Single parents are absolutely welcome; the “both of you” is about not raising kids on tech alone, however your family is built.' },
    { q: 'Is it faith-based?', a: 'It works for any family. Any spiritual framing is light and optional — take what’s useful, leave the rest.' },
    { q: 'What’s included?', a: 'The full day, lunch, all materials, your written family plan to take home, and supper in Leipers Fork that evening. <b>(Supper + guarantee are copy commitments pending business sign-off.)</b>' },
    { q: 'Refunds & transfers?', a: 'If it’s not for you, tell us at the door and we’ll refund you — no form, no fuss. Tickets are transferable if your plans change.' },
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
