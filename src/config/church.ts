/**
 * The church program — the ONE place its commercial terms are defined.
 *
 * ONE model, decided 2026-08-04 — deliberately nothing else:
 *
 *   License   $495/year   EVERY church. Link, QR, share kit, kickoff night.
 *                         Fully self-serve: /churches/setup → Kajabi →
 *                         /churches/done.
 *   Families  $49         Half off the $99 retail price, through the church's
 *                         link/QR. Families pay it themselves.
 *
 * There is NO free-for-families / prepaid-seats product. That was removed on
 * purpose: free families need a 100%-off coupon, and any universal $0 entry
 * point loose on the internet is a giveaway with no floor. Capping it per
 * church requires either manual coupon-minting or a Stripe-webhook backend —
 * neither of which this "for now" model wants. A church that insists on
 * covering the cost is a human conversation (email), not a product. If that
 * demand becomes real, the plan of record is auto-minted seat-capped Stripe
 * codes — see the Aug 4 desktop-session discussion before building.
 *
 * The $49 path is safe on ONE universal code: the worst a leak can do is let
 * someone pay $49 instead of $99, and attribution rides on the SLUG, not the
 * code. That is what makes the whole funnel zero-touch. Never mint
 * per-church coupons — that reintroduces the manual step this system exists
 * to remove.
 */

export const church = {
  /** What a family pays on their own — the anchor the discount is measured against. */
  retailPrice: 99,
  /** What a family pays through their church's link. */
  familyPrice: 49,
  /** Annual, recurring. What a church pays for its link + QR + kit. */
  licensePrice: 495,

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

/** What the $495/year license includes — every church gets exactly this. */
export const licenseIncludes = [
  'Your church’s own share link + QR code',
  'Printable share kit for Sundays',
  'The kickoff night package',
  'Unlimited families — no seats to count',
  'Renews annually, cancel anytime',
] as const;

/** The family side of the deal, shown beside the license. */
export const familyIncludes = [
  `Half off — $${church.familyPrice} instead of $${church.retailPrice}`,
  'They pay it themselves — nothing billed to the church',
  'Tap your link or scan your QR, done in two minutes',
  'First-phone and reset families alike',
] as const;
