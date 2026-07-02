/**
 * Kajabi offer checkout URLs — the ONLY place buy CTAs are defined.
 * Never hardcode a checkout URL in a component; reference an offer id here.
 *
 * Kajabi is the system of record for commerce. This site only *links out* to
 * these checkout URLs; UTMs get appended at click time (see lib/utm.ts) and an
 * InitiateCheckout pixel fires with `pixelValue` (see lib/pixel.ts).
 *
 * The $24 order bump, $199 upsell, and $99 downsell live INSIDE Kajabi's
 * checkout/one-click flow — this site never links to them directly, so they
 * are documented here for reference but intentionally have no `url`.
 *
 * TODO(inputs): replace every `url: TODO` with the real Kajabi offer URL.
 */

const TODO = '#TODO-kajabi-offer-url';

export interface Offer {
  /** stable key used by components */
  id: string;
  /** human label for internal reference */
  label: string;
  /** display price in whole USD (used for copy + pixel value) */
  price: number;
  /** Kajabi checkout URL; TODO placeholder until provided */
  url: string;
  /** value sent with the InitiateCheckout pixel event */
  pixelValue: number;
  /** true = handled inside Kajabi's flow, this site does not link to it */
  kajabiInternal?: boolean;
}

export const offers = {
  // ── The core product ──
  course: {
    id: 'course',
    label: 'Phone License course',
    price: 49,
    url: TODO,
    pixelValue: 49,
  },

  // ── Inside Kajabi checkout (documented, not linked from this site) ──
  orderBump: { id: 'orderBump', label: 'Order bump', price: 24, url: '', pixelValue: 24, kajabiInternal: true },
  upsell: { id: 'upsell', label: 'One-click upsell', price: 199, url: '', pixelValue: 199, kajabiInternal: true },
  downsell: { id: 'downsell', label: 'Downsell', price: 99, url: '', pixelValue: 99, kajabiInternal: true },

  // ── Church licensing tiers ──
  church25: { id: 'church25', label: 'Church license · 25 seats', price: 349, url: TODO, pixelValue: 349 },
  church100: { id: 'church100', label: 'Church license · 100 seats', price: 899, url: TODO, pixelValue: 899 },
  church250: { id: 'church250', label: 'Church license · 250 seats', price: 1999, url: TODO, pixelValue: 1999 },

  // ── Live events ──
  // Early-bird discount is applied via a Kajabi COUPON on the same conference
  // offer (per contract). If Kajabi instead uses a separate offer URL for
  // early-bird, add a `conferenceEarlyBird` entry and point config/events at it.
  conference: { id: 'conference', label: 'Conference · couple ticket', price: 499, url: TODO, pixelValue: 499 },
  summit: { id: 'summit', label: 'Summit · family seat', price: 99, url: TODO, pixelValue: 99 },
  allAccess: { id: 'allAccess', label: 'All-Access', price: 0, url: TODO, pixelValue: 0 },
} satisfies Record<string, Offer>;

export type OfferId = keyof typeof offers;

/** Look up an offer by id (type-safe). */
export function getOffer(id: OfferId): Offer {
  return offers[id];
}
