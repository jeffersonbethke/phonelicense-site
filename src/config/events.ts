/**
 * Event data — the SINGLE source of truth for every event surface: the
 * announcement bar (see ./announcement), the homepage season section, /events,
 * the three event pages, the quiz/church "event slot", titles and OG tags.
 * No event copy lives in a component.
 *
 * THE 2027 MODEL (reset 2026-09-22): three events, one per season, all in
 * `waitlist` state until a room is booked. No dates, venues, seat caps or
 * prices anywhere on the site — the copy names seasons, never months, so the
 * order can be shuffled without touching a word. The energy comes from first
 * access + a founding-family price, not a countdown.
 *
 * When a date IS booked: that's a Kajabi email ("The date is set") to the
 * list first, then a status change here. Until then, nothing else to flip.
 */

export type EventFormat = 'online' | 'in-person';
export type EventStatus = 'waitlist';

export interface EventConfig {
  slug: string; // route path
  /** Full name, e.g. "The Parent Summit: AI, chatbots & what’s coming". */
  name: string;
  /** Short name for cards/nav, e.g. "The Parent Summit". */
  shortName: string;
  /** Subtitle for headings that split name/theme, e.g. "AI, chatbots & what’s coming". */
  theme: string;
  season: 'Spring 2027' | 'Summer 2027' | 'Fall 2027';
  format: EventFormat;
  place: string; // 'Online' | 'Franklin, TN'
  /** Format line for cards, e.g. "Online, live, half a day". */
  formatLine: string;
  /** One-line promise used on /events cards. */
  oneLine: string;
  /** Shorter one-liner for the homepage season cards. */
  homeLine: string;
  /** The /events season-card paragraph. */
  cardBlurb: string;
  /** Condensed "You’ll leave with" for the /events card. */
  cardLeaveWith: [string, string, string];
  /** Promise line under the page heading. */
  promise: string;
  /** Two short paragraphs — the page body. */
  body: string[];
  leaveWith: [string, string, string];
  whoFor: string;
  recorded: boolean;
  /** Workshop only: travel note. */
  travel?: string;
  status: EventStatus;
  /** Kajabi tag applied when this event is ticked on the waitlist form. */
  tag: string;
  /** Label of this event's checkbox on the waitlist form. */
  formLabel: string;
  /** Third status-strip cell. */
  seatsLine: string;
  ogImage: string;
  description: string; // meta description
}

export const events: Record<string, EventConfig> = {
  'summit-spring': {
    slug: 'summit-spring',
    name: 'The Parent Summit: AI, chatbots & what’s coming',
    shortName: 'The Parent Summit',
    theme: 'AI, chatbots & what’s coming',
    season: 'Spring 2027',
    format: 'online',
    place: 'Online',
    formatLine: 'Online, live, half a day',
    oneLine: 'The annual briefing on what changed on your kid’s phone this year, and what to do about it.',
    homeLine: 'The annual briefing on what changed.',
    cardBlurb: 'The annual briefing. Half a day, both parents, on what your kid’s phone can do this year that it couldn’t last year, and what to do about it. Darren and Jeff live, a live Q&A, and one worksheet you’ll actually use.',
    cardLeaveWith: ['The three settings that matter this year', 'A plain-English map of AI companions and chatbots', 'The 2027 update to your Family Agreement'],
    promise: 'The annual briefing on what changed on your kid’s phone this year, and what to do about it.',
    body: [
      'Every year the phone gets a new set of powers, and every year parents find out from their kids. The Parent Summit is the other way around. Half a day, live, both parents, in plain English: what AI companions and chatbots are actually doing in a teenager’s day, which new features matter and which are noise, and the three settings we’d change this year if we could only change three.',
      'Then a long, live Q&A with Darren and Jeff.',
    ],
    leaveWith: [
      'The 2027 settings list for iPhone and Android',
      'A plain-English map of AI companions, chatbots and the apps that hide them',
      'The 2027 addendum to your Family Agreement',
    ],
    whoFor: 'Parents of 10- to 18-year-olds, whether or not you’ve done the course. Licensed families get the addendum in the same format as their Agreement.',
    recorded: true,
    status: 'waitlist',
    tag: 'Waitlist - Spring Summit',
    formLabel: 'Spring summit, online',
    seatsLine: 'Live and recorded',
    ogImage: '/og-summit.png',
    description: 'The annual briefing on what changed on your kid’s phone this year, and what to do about it. Spring 2027, online, live. Join the list and hear first, at a founding-family price.',
  },

  'summit-summer': {
    slug: 'summit-summer',
    name: 'The Summer Reset',
    shortName: 'The Summer Reset',
    theme: 'The Summer Reset',
    season: 'Summer 2027',
    format: 'online',
    place: 'Online',
    formatLine: 'Online, live, 90 minutes',
    oneLine: 'The plan for the three months the phone has no schedule.',
    homeLine: 'The plan for the three months the phone has no schedule.',
    cardBlurb: 'Ninety minutes, right before school lets out. The plan for the three months the phone has no bedtime, no bus and no teacher: a summer addendum to your agreement, the boredom problem, sleep, the road trip, the cousins.',
    cardLeaveWith: ['A one-page summer addendum', 'The boredom list', 'The road-trip rules'],
    promise: 'The plan for the three months the phone has no schedule.',
    body: [
      'School gives a phone a rhythm without anyone trying: a bus, a bell, a bedtime that has to happen. Summer takes all of it away at once, and by July the agreement you signed in March is a memory.',
      'The Summer Reset is ninety minutes, right before school lets out, to write the summer version on purpose: sleep when there’s no morning, the boredom problem and what to do instead of scrolling through it, the road trip, the cousins’ house, and the one week the phone comes off the table entirely.',
    ],
    leaveWith: [
      'A one-page summer addendum to your Family Agreement',
      'The boredom list (thirty things that aren’t a screen, chosen by your kid)',
      'The road-trip and grandparents’-house rules',
    ],
    whoFor: 'Any family with a phone in the house and a summer coming.',
    recorded: true,
    status: 'waitlist',
    tag: 'Waitlist - Summer Summit',
    formLabel: 'Summer Reset, online',
    seatsLine: 'Live and recorded',
    ogImage: '/og-summer.png',
    description: 'The plan for the three months the phone has no schedule. Ninety minutes, online, live, right before school lets out. Join the list and hear first.',
  },

  conference: {
    slug: 'conference',
    name: 'The Workshop: Raising Kids in a Digital World',
    shortName: 'The Workshop',
    theme: 'Raising Kids in a Digital World',
    season: 'Fall 2027',
    format: 'in-person',
    place: 'Franklin, TN',
    formatLine: 'In person, Franklin, TN, one Saturday and a long-table supper in Leipers Fork',
    oneLine: 'Both of you in one room. The day couples talk about on the drive home.',
    homeLine: 'Both of you in one room, then supper in Leipers Fork.',
    cardBlurb: 'One Saturday. Both of you in a room small enough to talk in, then a long-table supper in Leipers Fork. It’s the day couples talk about on the drive home. Capped small; founding families sit first.',
    cardLeaveWith: ['A plan for the year, written together', 'A table of parents who get it', 'A supper you’ll remember'],
    promise: 'Both of you in one room. The day couples talk about on the drive home.',
    body: [
      'Once a year we stop doing this through a screen. One Saturday in Franklin, Tennessee, both parents, a room small enough to talk in. Darren teaches the framework from The Digital Fast; Jeff teaches the family rhythms that make it stick; the afternoon is the two of you at a table, writing the year.',
      'Then everyone drives out to Leipers Fork for a long-table supper.',
    ],
    leaveWith: [
      'A plan for the year, written together, in your own words',
      'A table of parents who get it',
      'A supper you’ll remember',
    ],
    whoFor: 'Couples. Bring the other parent. Single parents, bring the person who helps you raise them.',
    recorded: false,
    travel: 'Franklin is about half an hour south of Nashville. Hotels and details come with the date.',
    status: 'waitlist',
    tag: 'Waitlist - Fall Workshop',
    formLabel: 'The Workshop, in person in Franklin',
    seatsLine: 'Capped small',
    ogImage: '/og-workshop.png',
    description: 'Both of you in one room. The day couples talk about on the drive home. Fall 2027, one Saturday in Franklin, TN. The list picks the weekend; founding families sit first.',
  },
};

export type EventSlug = keyof typeof events;

/** Season order for every list on the site. */
export const season: EventConfig[] = [events['summit-spring'], events['summit-summer'], events['conference']];

export function getEvent(slug: string): EventConfig | undefined {
  return events[slug];
}

/** The other two events, for an event page's "Also this season" block. */
export function otherEvents(slug: string): EventConfig[] {
  return season.filter((e) => e.slug !== slug);
}

/** Eyebrow line for an event page/card: "SPRING 2027 · ONLINE · LIVE". */
export function eyebrowFor(e: EventConfig): string {
  const fmt = e.format === 'online' ? 'Online · Live' : `In person · ${e.place}`;
  return `${e.season} · ${fmt}`;
}

/** The three-part status strip every event page shows while waitlisted. */
export function statusStrip(e: EventConfig): { label: string; value: string }[] {
  return [
    { label: 'Date', value: 'The list picks the weekend' },
    { label: 'Price', value: 'Founding families first' },
    { label: e.format === 'online' ? 'Seats' : 'Room', value: e.seatsLine },
  ];
}

/** Per-event FAQ (when · how much · recorded). */
export function eventFaqs(e: EventConfig): { q: string; a: string }[] {
  return [
    {
      q: 'When exactly?',
      a: 'We don’t know yet, and we won’t pretend to. The list picks the weekend, and founding families get the date first.',
    },
    {
      q: 'How much?',
      a: 'Not set. Founding families on the list get the best price we ever offer on this event. Nothing is charged until there’s a date and a room.',
    },
    {
      q: 'Will it be recorded?',
      a: e.recorded
        ? 'Yes, for everyone registered.'
        : 'No. That’s the point of the room.',
    },
  ];
}

/** Title tag for an event page. */
export function eventTitle(e: EventConfig): string {
  return `${e.name} — ${e.season} · Phone License`;
}
