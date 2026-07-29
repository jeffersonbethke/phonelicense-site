/**
 * The church program — the ONE place its commercial terms are defined.
 *
 * ONE license, then ONE choice:
 *
 *   License   $495/year   EVERY church, no exceptions. Link, QR, share kit,
 *                         kickoff night. Fully self-serve:
 *                         /churches/setup → Kajabi → /churches/done.
 *
 *   Then: who pays for the families?
 *     They pay  $49/family  (half off $99). Nothing more for the church.
 *     You pay   $25/family  Church covers it, families join free.
 *                           20-family minimum. Talk-to-us only — an UPGRADE
 *                           after the license, never a separate front door,
 *                           so no church bypasses the self-serve funnel.
 *
 * Why "you pay" can't be self-serve: free families need a 100%-off coupon, and
 * a universal 100%-off code loose on the internet is a giveaway with no floor.
 * That path needs a per-church, seat-limited coupon — a human step, which is
 * fine because those deals already involve a conversation.
 *
 * The $49 path is safe on ONE universal code: the worst a leak can do is let
 * someone pay $49 instead of $99, and attribution rides on the SLUG, not the
 * code. That is what makes the whole funnel zero-touch. Never mint a
 * per-church coupon for the license path — it would reintroduce the manual
 * step this system exists to remove.
 */

import { site } from './site';

export const church = {
  /** What a family pays on their own — the anchor the discount is measured against. */
  retailPrice: 99,
  /** What a family pays through their church's link. */
  familyPrice: 49,
  /** Annual, recurring. What a church pays for its link + QR + kit. */
  licensePrice: 495,

  /** Prepaid (enterprise) path: per-family bulk rate, families join free. */
  prepaidPerFamily: 25,
  /** Floor on prepaid, so enterprise plumbing isn't spun up for $75. */
  prepaidMinFamilies: 20,

  /**
   * The ONE universal discount code for church families.
   * TODO(inputs): confirm the real Kajabi coupon code.
   */
  familyCode: 'CHURCH50',
  /**
   * Query param Kajabi reads a coupon from at checkout.
   * TODO(inputs): confirm — Kajabi has used both `coupon` and `coupon_code`.
   * If Ian gives us a dedicated $49 offer URL instead, set `offers.courseChurch`
   * and leave this alone; the code is then unnecessary.
   */
  couponParam: 'coupon',
  /**
   * Query param that carries the church slug to the payment processor — this is
   * how a family's purchase gets credited to their church.
   *
   * Kajabi: 'ref' is fine; the UTMs we also set are what shows in its reporting.
   * Stripe: use 'client_reference_id'. Stripe Payment Links ignore arbitrary
   *   params, but persist client_reference_id onto the Checkout Session, so it
   *   is the ONLY one that survives to where you can read it. Getting this
   *   wrong means every church sale lands unattributed.
   * TODO(inputs): set to 'client_reference_id' if churches check out via Stripe.
   */
  attributionParam: 'ref',

  supportEmail: 'hello@phonelicense.co',
} as const;

/** Exactly $50. Truer and punchier than "50% off" ($49/$99 is 50.5%). */
export const familySavings = church.retailPrice - church.familyPrice;

/**
 * The Kickoff Night package — a church's launch event in a box, included with
 * every license. This is the closer: it turns "buy a discount code" into "host
 * a night," which is a thing a family pastor already knows how to say yes to.
 *
 * HONESTY GUARD: the talk is not filmed yet. `status` is printed on the page so
 * no church can think it's downloadable today, and the video frame is labelled
 * a preview. Update `status` (and set `filmed: true`) the day it ships — that
 * flips the copy and the badge everywhere it appears.
 *
 * TODO(inputs): replace `status` with the real month once the studio date is set.
 */
export const kickoff = {
  filmed: false,
  status: 'In production — included free when it lands',
  runtime: '45 minutes',
  includes: [
    {
      title: 'The talk',
      detail:
        'A 45-minute message on phones, adolescence, and what parents are actually up against — filmed in studio, ready to play. No guest speaker to book, no fee, no travel.',
    },
    {
      title: 'The run sheet',
      detail:
        'A minute-by-minute plan for the night: welcome, video, table time, close. Hand it to a volunteer and they can run it without you.',
    },
    {
      title: 'Table discussion questions',
      detail:
        'Printable cards that get parents talking to each other instead of listening to a stranger. The part that makes the night land.',
    },
    {
      title: 'Promo kit',
      detail:
        'Slides, a bulletin blurb, social graphics, and an invite text you can paste. Everything you need to fill the room.',
    },
    {
      title: 'The handoff',
      detail:
        'Families leave with Phone License already unlocked — your QR on the screen, they scan it before they stand up.',
    },
  ],
} as const;

/**
 * What the $495/year license includes — every church gets this, before (and
 * regardless of) the who-pays-for-families choice below.
 */
export const licenseIncludes = [
  'Your church’s own share link + QR code',
  'Printable share kit for Sundays',
  'The kickoff night package',
  'Unlimited families — no seats to count',
  'Renews annually, cancel anytime',
] as const;

export interface FamilyPlan {
  id: string;
  /** The column label — the actual choice: "They pay" / "You pay". */
  name: string;
  /** Who this is for. */
  who: string;
  /** Price shown, already formatted. Same unit both columns: per family. */
  price: string;
  /** Billing note under the price. */
  per: string;
  blurb: string;
  features: string[];
  /** Self-serve plans go through /churches/setup; others go to `href`. */
  selfServe: boolean;
  href?: string;
  cta: string;
  featured?: boolean;
}

/**
 * The ONE choice a church makes, in the SAME unit (dollars per family) so the
 * columns are actually comparable. The $495 license is shared context above,
 * never a competing option.
 */
export const familyPlans: FamilyPlan[] = [
  {
    id: 'they-pay',
    name: 'They pay',
    who: 'Families cover their own',
    price: `$${church.familyPrice}`,
    per: 'per family — they pay it',
    blurb: 'Share your link; every family unlocks the half-off price themselves.',
    features: [
      `Half off — $${church.familyPrice} instead of $${church.retailPrice}`,
      'Nothing more for the church — ever',
      'Families check out through your link in two minutes',
      'Working the moment you license',
    ],
    selfServe: true,
    cta: 'Get your church link',
    featured: true,
  },
  {
    id: 'you-pay',
    name: 'You pay',
    who: 'Church covers it',
    price: `$${church.prepaidPerFamily}`,
    per: 'per family — you cover it',
    blurb: 'Your families join free. The big-push, highest-participation option.',
    features: [
      'Families pay nothing at all',
      `$${church.prepaidPerFamily} a family, billed to the church`,
      `${church.prepaidMinFamilies}-family minimum`,
      'Progress summaries for your group',
      'We set it up with you after you license',
    ],
    selfServe: false,
    href: site.calendlyUrl,
    cta: 'Talk to us',
  },
];
