/**
 * The Smartphone Readiness Assessment — all copy + weighted scoring.
 *
 * DRAFT COPY (2026-07-02): written in brand voice as a working first pass so
 * the flow is real and testable. Jeff to replace with final copy — every string
 * lives here, so edits need no code changes. Point values are editable too;
 * band thresholds are computed from the max achievable score, so re-weighting
 * never breaks the results.
 *
 * COPPA: we only ever ask about the PARENT (name, email) and the child's AGE
 * RANGE. Never the child's name or contact info.
 *
 * Flow: Q1 (sets First Phone vs Reset path) → scored questions → email gate →
 * result keyed on band × path.
 */

export type Path = 'first-phone' | 'reset';
export type Band = 'not-yet' | 'almost' | 'ready';

export interface Choice {
  label: string;
  /** readiness points; higher = more ready. Q1 choices carry 0. */
  points: number;
  /** Q1 only: which path this answer selects */
  path?: Path;
  /** captured for the webhook / personalization (e.g. age range) */
  meta?: string;
}

export interface Question {
  id: string;
  prompt: string;
  help?: string;
  /** Q1 sets the path and is not scored */
  kind?: 'path' | 'scored';
  choices: Choice[];
}

// ── Q1: the fork. Not-yet → First Phone; already has one → Reset. ──
export const pathQuestion: Question = {
  id: 'has_phone',
  kind: 'path',
  prompt: 'Does your child already have a phone?',
  help: 'This shapes everything that follows — there’s no wrong answer.',
  choices: [
    { label: 'Not yet', points: 0, path: 'first-phone', meta: 'not-yet' },
    { label: 'Yes — for under a year', points: 0, path: 'reset', meta: 'under-1yr' },
    { label: 'Yes — for over a year', points: 0, path: 'reset', meta: 'over-1yr' },
  ],
};

// ── Scored questions (one per screen) ──
export const questions: Question[] = [
  {
    id: 'age',
    prompt: 'How old is your child?',
    help: 'Age range only — we never ask for their name.',
    choices: [
      { label: '8 or under', points: 0, meta: '≤8' },
      { label: '9–10', points: 1, meta: '9–10' },
      { label: '11–12', points: 2, meta: '11–12' },
      { label: '13–14', points: 3, meta: '13–14' },
      { label: '15 or older', points: 3, meta: '15+' },
    ],
  },
  {
    id: 'responsibility',
    prompt: 'When you give them a real responsibility, how does it usually go?',
    choices: [
      { label: 'It slides unless I stay on top of it', points: 0 },
      { label: 'Hit or miss, depends on the day', points: 1 },
      { label: 'Mostly follows through with a reminder', points: 2 },
      { label: 'Owns it without me chasing', points: 3 },
    ],
  },
  {
    id: 'regulation',
    prompt: 'When they’re told to stop something they love, what happens?',
    help: 'Think screens, a game, a show.',
    choices: [
      { label: 'A meltdown almost every time', points: 0 },
      { label: 'Pushback, but they get there', points: 1 },
      { label: 'A little grumbling, then okay', points: 2 },
      { label: 'They can put it down themselves', points: 3 },
    ],
  },
  {
    id: 'exposure',
    prompt: 'How much are they on screens right now?',
    choices: [
      { label: 'Constantly — it’s a daily fight', points: 0 },
      { label: 'More than I’d like', points: 1 },
      { label: 'A fair amount, but bounded', points: 2 },
      { label: 'Pretty limited and calm', points: 3 },
    ],
  },
  {
    id: 'peers',
    prompt: 'How much of this is peer pressure — “everyone has one”?',
    choices: [
      { label: 'It’s the whole conversation right now', points: 0 },
      { label: 'It comes up a lot', points: 1 },
      { label: 'Sometimes, not constant', points: 2 },
      { label: 'Not really a factor for us', points: 3 },
    ],
  },
  {
    id: 'sleep',
    prompt: 'Where do devices end up at night?',
    choices: [
      { label: 'In the bedroom, honestly not sure', points: 0 },
      { label: 'In the room, but supposed to be off', points: 1 },
      { label: 'Usually out of the room', points: 2 },
      { label: 'Always charge outside the bedroom', points: 3 },
    ],
  },
  {
    id: 'rules',
    prompt: 'Right now, what do your family’s tech rules look like?',
    choices: [
      { label: 'Honestly, there aren’t really any', points: 0 },
      { label: 'A few, but they’re not enforced', points: 1 },
      { label: 'Some clear ones we mostly keep', points: 2 },
      { label: 'Clear, written, and we hold them', points: 3 },
    ],
  },
  {
    // Personalization only — 0 points, captured to tailor a tip.
    id: 'fear',
    prompt: 'What worries you most?',
    help: 'This just helps us tailor your results.',
    choices: [
      { label: 'What they’ll see', points: 0, meta: 'content' },
      { label: 'Who they’ll talk to', points: 0, meta: 'contact' },
      { label: 'Losing them to the screen', points: 0, meta: 'attention' },
      { label: 'The fight it’ll cause', points: 0, meta: 'conflict' },
    ],
  },
];

/** Max achievable score → drives band thresholds (edit points freely). */
export const maxScore = questions.reduce(
  (sum, q) => sum + Math.max(...q.choices.map((c) => c.points)),
  0
);

/** Score → band. Thresholds are fractions of maxScore. */
export function bandFor(score: number): Band {
  const pct = maxScore === 0 ? 0 : score / maxScore;
  if (pct >= 0.7) return 'ready';
  if (pct >= 0.4) return 'almost';
  return 'not-yet';
}

/** Webhook tag component for the band. */
export const bandTag: Record<Band, string> = {
  'not-yet': 'NotYet',
  almost: 'Almost',
  ready: 'Ready',
};

export const pathTag: Record<Path, string> = {
  'first-phone': 'First Phone',
  reset: 'Reset',
};

// ── Results: band × path. {name} interpolated client-side. ──
export interface Result {
  eyebrow: string;
  headline: string;
  summary: string;
  tips: string[];
  pitchHead: string;
  pitch: string;
  cta: string;
}

const firstPhone: Record<Band, Result> = {
  ready: {
    eyebrow: 'First phone · Ready',
    headline: 'They’re ready, {name} — and so are you.',
    summary:
      'The signals are strong: they follow through, they can put a screen down, and your home already has some rhythm. The phone won’t be the problem. The plan around it is what makes it stick.',
    tips: [
      'Say the yes out loud, with a start date. Anticipation is leverage — use it.',
      'Write the agreement before the phone shows up, not after. It’s easier to add freedoms than claw them back.',
      'Charge it outside the bedroom from night one. That single rule prevents most of what parents regret.',
    ],
    pitchHead: 'Give them a confident yes.',
    pitch:
      'The Phone License course walks you through the exact agreement, the settings, and the handoff conversation — so the first phone starts on trust instead of guesswork. One time, yours forever.',
    cta: 'Start the course — $49',
  },
  almost: {
    eyebrow: 'First phone · Almost',
    headline: 'You’re close, {name}. Let’s close the gap first.',
    summary:
      'There’s a lot going right — but a couple of things (regulation, rules, or sleep habits) are worth shoring up before the phone lands. Good news: that’s a few weeks of work, not a personality transplant.',
    tips: [
      'Pick the one weak spot and practice it off-phone for two weeks — like putting down a game the first time you ask.',
      'Draft your non-negotiables now (bedtime charging, which apps, screen-free zones) so the phone arrives into a plan.',
      'Name the path out loud: “Here’s what earns the phone.” Kids rise to a clear target.',
    ],
    pitchHead: 'Turn “almost” into a confident yes.',
    pitch:
      'The course gives you the readiness runway and the agreement to hand over when they’re there — Pass, Prove, Verify. No subscription, yours forever.',
    cta: 'Start the course — $49',
  },
  'not-yet': {
    eyebrow: 'First phone · Not yet',
    headline: 'Trust your gut, {name}. Not yet is a real answer.',
    summary:
      'A few foundations aren’t in place — and that’s completely normal for the age. This isn’t a no forever; it’s a not-yet with a plan. The clearer the path, the less “everyone has one” has power over the conversation.',
    tips: [
      'Give them something to earn. A “not yet” with a visible path beats a flat no every time.',
      'Start with a smaller step — a watch or a call-and-text device — while responsibility grows.',
      'Get ahead of the peer-pressure talk: “In our family, the phone is earned. Here’s how.”',
    ],
    pitchHead: 'Build the path to yes.',
    pitch:
      'The Phone License course gives you the step-by-step readiness plan and the exact agreement for the day they’re ready — so “not yet” has a finish line they can see. One time, yours forever.',
    cta: 'Get the plan — $49',
  },
};

const reset: Record<Band, Result> = {
  ready: {
    eyebrow: 'Fresh start · Strong footing',
    headline: 'Solid ground, {name} — now make it official.',
    summary:
      'You’ve already got real habits in place. This isn’t about taking the phone away — it’s about re-issuing it under an agreement you both sign, so the good habits are named and the gray areas disappear.',
    tips: [
      'Reframe it as an upgrade, not a punishment: “We’re resetting the deal, together.”',
      'Put the unspoken rules in writing. What’s assumed gets argued; what’s written gets kept.',
      'Add one fresh boundary you’ve been meaning to (night charging, a new app rule) while the reset is happening.',
    ],
    pitchHead: 'Re-issue the phone the right way.',
    pitch:
      'The course gives you the exact re-set agreement and conversation — the phone stays, the terms get clear. Nothing confiscated. One time, yours forever.',
    cta: 'Start the reset — $49',
  },
  almost: {
    eyebrow: 'Fresh start · Rebuilding',
    headline: 'You can start over, {name} — without taking it away.',
    summary:
      'Some boundaries have slipped, and it’s worn you down. Here’s the relief: you don’t need a dramatic confiscation. You re-issue the same phone under a new agreement they earn back into — calm, clear, and mutual.',
    tips: [
      'Skip the lecture. Open with: “The phone stays. The deal is changing, and here’s why.”',
      'Rebuild one keystone habit first — usually night charging outside the bedroom.',
      'Trade freedoms for follow-through. Earn-back beats crackdown every time.',
    ],
    pitchHead: 'Start over without the standoff.',
    pitch:
      'The Phone License course is built for exactly this — the re-issue conversation, the new agreement, and the Pass/Prove/Verify rhythm that rebuilds trust without a war. Yours forever.',
    cta: 'Start the reset — $49',
  },
  'not-yet': {
    eyebrow: 'Fresh start · Time to reset',
    headline: 'This has been hard, {name}. There’s a calm way out.',
    summary:
      'Right now it probably feels like the phone is running the house. You are not failing — the terrain changed and nobody handed you a plan. You don’t have to confiscate anything. You re-issue the phone under a new agreement, one step at a time.',
    tips: [
      'Don’t grab the phone tonight. A calm reset holds; a confiscation just starts a war.',
      'Name it together: “We’re starting over. Same phone, new agreement — and I’ll help you earn it.”',
      'Pick the single biggest problem (sleep, a certain app) and reset that one thing first.',
    ],
    pitchHead: 'Get your calm back.',
    pitch:
      'The course gives you the whole re-set: the conversation that lands, the agreement they sign, and the week-by-week path back to trust — without taking the phone away. One time, yours forever.',
    cta: 'Start the reset — $49',
  },
};

export const results: Record<Path, Record<Band, Result>> = {
  'first-phone': firstPhone,
  reset,
};

export function getResult(path: Path, band: Band): Result {
  return results[path][band];
}
