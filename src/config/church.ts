/**
 * The church program — the ONE place its commercial terms are defined.
 *
 * Two paths, priced by WHO pays:
 *
 *   License   $495/year   Church pays. Families join at $49 (half off $99).
 *                         Fully self-serve: /churches/setup → Kajabi → /churches/done.
 *   Prepaid   $25/family  Church pays per family. Families join free.
 *                         Talk-to-us only — deliberately NOT self-serve.
 *
 * Why prepaid can't be self-serve: free families need a 100%-off coupon, and a
 * universal 100%-off code loose on the internet is a giveaway with no floor.
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

export interface ChurchTier {
  id: string;
  name: string;
  /** Who this is for. */
  who: string;
  /** Price shown, already formatted. */
  price: string;
  /** Billing note under the price. */
  per: string;
  blurb: string;
  features: string[];
  /** Self-serve tiers go through /churches/setup; others go to `href`. */
  selfServe: boolean;
  href?: string;
  cta: string;
  featured?: boolean;
}

export const churchTiers: ChurchTier[] = [
  {
    id: 'license',
    name: 'Church License',
    who: 'Any church, any size',
    price: `$${church.licensePrice}`,
    per: 'per year',
    blurb: 'Your own link, QR code, and share kit — live the moment you check out.',
    features: [
      'Your church’s own share link + QR code',
      `Every family joins at $${church.familyPrice} instead of $${church.retailPrice}`,
      'Unlimited families — no seats to count',
      'Printable share kit for Sundays',
      'Renews annually, cancel anytime',
    ],
    selfServe: true,
    cta: 'Get your church link',
    featured: true,
  },
  {
    id: 'prepaid',
    name: 'Prepaid Seats',
    who: 'Churches covering the cost for their families',
    price: `$${church.prepaidPerFamily}`,
    per: 'per family',
    blurb: 'You cover it, your families join free. The highest-participation option.',
    features: [
      'Families pay nothing at all',
      `Bulk rate — $${church.prepaidPerFamily} a family instead of $${church.retailPrice}`,
      `${church.prepaidMinFamilies}-family minimum`,
      'Your church’s own link, QR code, and kit',
      'Progress summaries for your group',
    ],
    selfServe: false,
    href: site.calendlyUrl,
    cta: 'Talk to us',
  },
];

/** The tier a pastor self-serves through. */
export const licenseTier = churchTiers.find((t) => t.selfServe)!;
