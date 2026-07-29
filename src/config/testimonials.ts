/**
 * Config-driven testimonial slots. Consumed by sales page + event pages.
 *
 * TODO(inputs): the mockups ship MOCK testimonials (marked in-page). Replace
 * with real, cleared quotes after Edition One. Set `mock: true` on anything
 * not yet real so the UI can label or hide it before launch.
 */

export interface Testimonial {
  quote: string;
  name: string;
  detail: string; // e.g. "kids 9 & 13, Franklin TN"
  /** optional headshot path (e.g. '/assets/parent-matt.jpg'); initials shown if absent */
  image?: string;
  mock?: boolean;
}

/** Initials for the avatar fallback, e.g. "Matt & Jenny R." → "MJ". */
export function initials(name: string): string {
  return (name.match(/[A-Z]/g) || []).slice(0, 2).join('');
}

// First entry is the "feature" quote (big pull-quote on the conference page);
// the rest render as cards. Homepage shows the first three in a grid.
export const testimonials: Testimonial[] = [
  {
    quote: 'We walked in arguing about phones. We walked out with a plan we both actually believe in.',
    name: 'Matt & Jenny R.',
    detail: 'kids 9 & 13 · Franklin, TN',
    mock: true,
  },
  {
    quote:
      'Our 11-year-old mentioned a chatbot I’d never heard of. Because of this day, I knew exactly what it was — and exactly what to say.',
    name: 'Dana & Marcus T.',
    detail: 'kids 8 & 11',
    mock: true,
  },
  {
    quote:
      'One Saturday cost less than one month of the counseling we were headed for. I mean that literally.',
    name: 'Sarah & Ben K.',
    detail: 'kids 12 & 15',
    mock: true,
  },
  {
    quote: 'We drove home holding hands. That hasn’t happened in a while.',
    name: 'Rachel & Tom W.',
    detail: 'kid 14',
    mock: true,
  },
];

/**
 * Church-leader quotes for /churches.
 *
 * SHIPS EMPTY ON PURPOSE. The section on /churches renders only when this array
 * has entries, so the live page shows nothing rather than placeholder text or
 * invented quotes — this page is public and sells to pastors, and a fabricated
 * endorsement from a named church would be a real problem, not a design detail.
 *
 * To fill it: uncomment the shape below and replace with a real, cleared quote.
 * The section appears automatically — no other file to touch. Two or three is
 * plenty; `detail` should carry the church name and city, since that is the
 * social proof another pastor is actually looking for.
 *
 * Example:
 *   {
 *     quote: 'We ran it as a kickoff night and 40 families signed up that evening.',
 *     name: 'Pastor Dave Whitman',
 *     detail: 'Family Pastor · Grace Community, Franklin TN',
 *   },
 */
export const churchTestimonials: Testimonial[] = [];
