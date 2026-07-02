/**
 * Event data — the SINGLE source of truth for every event surface:
 * announcement bar, homepage Live Events section, hub cards, and the full
 * event pages. Flip one `state` value here and the bar, homepage, cards, and
 * page all update with zero component edits (that's the whole contract).
 *
 * Scarcity honesty: `seatsRemaining` is set MANUALLY by a human and is never
 * faked or decremented client-side. Set it to `null` when the true number is
 * unknown — the UI then hides seat counts and progress bars.
 *
 * TODO(inputs): confirm dates/venues/prices, set the real `state` per event,
 * the true `seatsRemaining`, `earlyBirdDeadline`, and paste Kajabi `ticketsUrl`.
 */

import type { OfferId } from './offers';

export type EventState =
  | 'interest' // list-building, not on sale — CTAs open email capture
  | 'earlybird' // on sale at early-bird price
  | 'onsale' // on sale at full price
  | 'almostfull' // on sale, low seats (amber urgency)
  | 'soldout' // full — waitlist capture
  | 'replay'; // past — replay available

export type EventKind = 'workshop' | 'summit';

export interface EventConfig {
  slug: string; // route path, e.g. 'conference'
  kind: EventKind;
  title: string;
  edition: string; // year mark, e.g. '2026'
  season?: 'spring' | 'fall'; // summits only
  themeLine?: string; // summit topic, e.g. 'AI, chatbots & what’s coming'

  dateISO: string; // machine date (for .ics, sorting)
  dateDisplay: string; // human date
  timeDisplay?: string;
  venue: string;
  city: string;

  offerId: OfferId; // which Kajabi offer this ticket buys
  price: number;
  priceUnit: string; // 'per couple' | 'per family'
  earlyBirdPrice?: number;
  earlyBirdDeadline?: string; // ISO date; drives "ends July 31" copy

  capacity: number | null;
  seatsRemaining: number | null; // MANUAL. null = unknown → hide scarcity

  state: EventState;
  promote: boolean; // show in the site-wide announcement bar?

  ticketsUrl: string; // Kajabi checkout (TODO until provided)
  interestTag: string; // webhook tag when capturing interest/waitlist
}

const TODO_TICKETS = '#TODO-kajabi-tickets-url';

// ── Seed data from the approved mockups (flag placeholders per README) ──
export const events: Record<string, EventConfig> = {
  conference: {
    slug: 'conference',
    kind: 'workshop',
    title: 'Parenting the Screen Age',
    edition: '2026',
    dateISO: '2026-10-17',
    dateDisplay: 'Sat, Oct 17 2026',
    venue: 'The Factory at Franklin',
    city: 'Franklin, TN',
    offerId: 'conference',
    price: 499,
    priceUnit: 'per couple',
    earlyBirdPrice: 399,
    earlyBirdDeadline: '2026-07-31',
    capacity: 200, // README flag: client mentioned possibly 250
    seatsRemaining: null, // TODO: set the real number, or leave null to hide
    state: 'interest', // TODO: confirm current state
    promote: true,
    ticketsUrl: TODO_TICKETS,
    interestTag: 'Conference-2026-Interested',
  },

  'summit-fall': {
    slug: 'summit-fall',
    kind: 'summit',
    season: 'fall',
    title: 'The Parent Summit',
    edition: '2026',
    themeLine: 'AI, chatbots & what’s coming',
    dateISO: '2026-09-12',
    dateDisplay: 'Sat, Sept 12 2026',
    timeDisplay: '9am–1pm CT',
    venue: 'Live virtual',
    city: 'Online',
    offerId: 'summit',
    price: 99,
    priceUnit: 'per family',
    capacity: null,
    seatsRemaining: null,
    state: 'interest', // TODO: confirm (README seed showed onsale)
    promote: false,
    ticketsUrl: TODO_TICKETS,
    interestTag: 'Summit-Fall-Interested',
  },

  'summit-spring': {
    slug: 'summit-spring',
    kind: 'summit',
    season: 'spring',
    title: 'The Parent Summit',
    edition: '2026',
    themeLine: 'Social media readiness',
    dateISO: '2026-03-14', // TODO: confirm real spring date
    dateDisplay: 'Spring 2026',
    timeDisplay: '9am–1pm CT',
    venue: 'Live virtual',
    city: 'Online',
    offerId: 'summit',
    price: 99,
    priceUnit: 'per family',
    capacity: null,
    seatsRemaining: null,
    state: 'replay', // spring already happened in README seed
    promote: false,
    ticketsUrl: TODO_TICKETS,
    interestTag: 'Summit-Spring-Interested',
  },
};

export type EventSlug = keyof typeof events;

export function getEvent(slug: string): EventConfig | undefined {
  return events[slug];
}

/** The single event flagged for the announcement bar (or null). */
export function promotedEvent(): EventConfig | null {
  return Object.values(events).find((e) => e.promote) ?? null;
}

/** Next upcoming, still-relevant event — for the "event slot" on thank-you pages. */
export function nextEvent(): EventConfig | null {
  const upcoming = Object.values(events)
    .filter((e) => e.state !== 'replay')
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  return upcoming[0] ?? null;
}

// ── Badge presentation, derived from state (README badge set) ──
export interface BadgeInfo {
  label: string;
  tone: 'blue' | 'amber' | 'red' | 'neutral';
}

export function badgeFor(state: EventState): BadgeInfo {
  switch (state) {
    case 'interest':
      return { label: 'Get first access', tone: 'neutral' };
    case 'earlybird':
      return { label: 'Early-bird', tone: 'blue' };
    case 'onsale':
      return { label: 'On sale', tone: 'blue' };
    case 'almostfull':
      return { label: 'Almost full', tone: 'amber' };
    case 'soldout':
      return { label: 'Sold out', tone: 'red' };
    case 'replay':
      return { label: 'Replay available', tone: 'neutral' };
  }
}

/** Only show a seat count / progress bar when it is truthful. */
export function showScarcity(e: EventConfig): boolean {
  return (
    e.seatsRemaining !== null &&
    e.capacity !== null &&
    (e.state === 'earlybird' || e.state === 'almostfull' || e.state === 'onsale')
  );
}
