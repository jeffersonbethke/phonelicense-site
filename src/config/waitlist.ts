/**
 * The 2027 waitlist — field labels, options and success copy.
 *
 * Deliberately simple (Jeff, 2026-09-22): ONE Kajabi tag marks a contact as
 * on the list; everything else they told us (which events, kids' ages,
 * travel, church leader) rides along as plain columns in the webhook
 * payload, so a Zapier → Google Sheet row is the whole "dump". No email
 * sequence yet — that's a later decision.
 *
 * COPPA: never a child's name — ages only.
 */

export const waitlist = {
  /** The one tag. Must match Kajabi + the Zap's form map exactly. */
  baseTag: 'Waitlist - 2027',
  pixelName: 'waitlist-2027',

  heading: 'Get first access.',
  sub: 'Two minutes. First access, then quiet.',
  button: 'Put us on the list',
  micro: 'No spam. One email when there’s something to say, and the date before anyone else. Never ask for a child’s name; ages only.',

  ages: ['Under 10', '10–12', '13–15', '16–18'],
  travel: {
    label: 'Would you travel to Franklin, TN for one Saturday?',
    options: ['Yes', 'Maybe', 'No'],
  },
  churchLabel: 'I lead a church or ministry group',

  success: {
    heading: 'You’re on the list.',
    body: 'When there’s a date, you’ll hear first — at a founding-family price. And if you haven’t started the course, it’s the best thing you can do while you wait.',
    backLabel: 'Back to the season',
    backHref: '/events',
  },
} as const;
