/**
 * The 2027 waitlist — field labels, options, success copy and every tag the
 * form can emit. The tags ARE the data (Kajabi contacts filtered by tag tell
 * you how many want each event, the age mix, who'd travel, who leads a
 * church), so the exact strings here must match the tags in Kajabi and the
 * form map in the Zapier code step.
 *
 * COPPA: never a child's name — ages only.
 *
 * Tag strings use "space hyphen space", like every other tag the site emits
 * (matches "Quiz - Ready", "Church - Lead", ...). "Church - Lead" is reused on
 * purpose: it already has a Kajabi form + automation, so ministry leaders get
 * the church pitch without a second form.
 */

export const waitlist = {
  /** Applied to every submission. Drives the "Events Waitlist 2027" sequence. */
  baseTag: 'Waitlist - 2027',
  churchTag: 'Church - Lead',
  pixelName: 'waitlist-2027',

  heading: 'Get first access.',
  sub: 'Two minutes. First access, then quiet.',
  button: 'Put us on the list',
  micro: 'No spam. One email now, three over the next month, and the date before anyone else.',

  ages: [
    { label: 'Under 10', tag: 'Kids - Under 10' },
    { label: '10–12', tag: 'Kids - 10-12' },
    { label: '13–15', tag: 'Kids - 13-15' },
    { label: '16–18', tag: 'Kids - 16-18' },
  ],
  travel: {
    label: 'Would you travel to Franklin, TN for one Saturday?',
    options: [
      { label: 'Yes', tag: 'Travel - Yes' },
      { label: 'Maybe', tag: 'Travel - Maybe' },
      { label: 'No', tag: 'Travel - No' },
    ],
  },
  churchLabel: 'I lead a church or ministry group',

  success: {
    heading: 'You’re on the list.',
    body: 'Check your inbox. There’s one question in it we’d love your answer to. And if you haven’t started the course, it’s the best thing you can do while you wait.',
    backLabel: 'Back to the season',
    backHref: '/events',
  },
} as const;

/** Every tag this form can emit, for the Kajabi + Zapier setup checklist. */
export const waitlistTags: string[] = [
  waitlist.baseTag,
  'Waitlist - Spring Summit',
  'Waitlist - Summer Summit',
  'Waitlist - Fall Workshop',
  ...waitlist.ages.map((a) => a.tag),
  ...waitlist.travel.options.map((t) => t.tag),
  waitlist.churchTag,
];
