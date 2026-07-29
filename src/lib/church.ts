/**
 * Church funnel helpers — slug ↔ name, share links, QR, family checkout.
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE: a church link must resolve the instant
 * it is created, with no database, sheet, or directory row behind it. So the
 * display name is DERIVED from the slug (`slugToName`) rather than looked up.
 * Attribution rides on the slug, so a derived name is purely cosmetic — and a
 * cosmetic imperfection beats a 404 on a link a pastor already put on a slide.
 *
 * Safe to import at build time or in the browser (no window access at module
 * scope). Note: /c/[slug] resolves its slug from `location.pathname` because
 * the site builds static — see the rewrites in vercel.json.
 */

import { church } from '../config/church';
import { submitLead } from './lead';

/** localStorage keys — how the pastor's church survives the Kajabi round-trip. */
export const STORE = {
  product: 'pl_church_product',
  slug: 'pl_church_slug',
  name: 'pl_church_name',
} as const;

/** Value written to STORE.product, so a stale key from another product is ignored. */
export const PRODUCT = 'pl';

/** "Grace Community Church" → "grace-community-church" */
export function slugify(input: string): string {
  return (input || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "grace-community-church" → "Grace Community Church" */
export function slugToName(slug: string): string {
  return (slug || '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Pull the church slug out of a /c/{slug} or /c/{slug}/kit pathname. */
export function slugFromPath(pathname: string): string {
  const parts = (pathname || '').split('/').filter(Boolean);
  // ['c', slug] or ['c', slug, 'kit']
  return parts[0] === 'c' && parts[1] ? slugify(parts[1]) : '';
}

export function churchPath(slug: string): string {
  return `/c/${slug}`;
}

export function kitPath(slug: string): string {
  return `/c/${slug}/kit`;
}

/** Bare link for display — no scheme, because pastors read it aloud. */
export function displayLink(slug: string, domain = 'phonelicense.co'): string {
  return `${domain}${churchPath(slug)}`;
}

export function fullLink(slug: string, origin = 'https://phonelicense.co'): string {
  return `${origin}${churchPath(slug)}`;
}

/** QR image for a church's share link. Rendered by an external service — see note in kit page. */
export function qrUrl(link: string, size = 520): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=12&data=${encodeURIComponent(link)}`;
}

/**
 * Family checkout URL for a given church.
 *
 * Attribution is belt-and-braces on purpose: `ref` is ours alone and nothing
 * else writes it, while the UTMs are what actually show up in Kajabi's own
 * reporting. `appendUtms` (lib/utm.ts) only fills params that aren't already
 * set, so a family's first-touch ad UTMs can never overwrite these.
 */
export interface ChurchRecord {
  church_name: string;
  leader_name: string;
  role: string;
  email: string;
  city: string;
  size: string;
  slug: string;
  tier: string;
  source: string;
}

/**
 * Record a church signup. BEST-EFFORT BY CONTRACT: this resolves no matter what
 * fails, and callers must proceed to checkout regardless. A pastor's payment is
 * never gated on a spreadsheet.
 *
 * Two destinations, both optional:
 *   1. The main Zapier hook via submitLead — tagged, with UTMs + pixel dedup,
 *      the same path every other form on the site takes.
 *   2. PUBLIC_CHURCH_WEBHOOK_URL, if set — the raw record to its own sheet.
 *
 * Capped at `budgetMs` so a hanging request can't strand someone mid-funnel.
 */
export async function captureChurchSignup(rec: ChurchRecord, budgetMs = 1500): Promise<void> {
  const work = Promise.allSettled([
    submitLead({
      name: rec.leader_name,
      email: rec.email,
      tags: ['Church - License'],
      fields: { ...rec },
      pixelName: 'Church License',
    }),
    (async () => {
      const url = typeof window !== 'undefined' ? window.__PL?.churchWebhookUrl : '';
      if (!url) return;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rec),
        // Survives the navigation to Kajabi that happens milliseconds later.
        keepalive: true,
      });
    })(),
  ]);

  const timeout = new Promise<void>((resolve) => setTimeout(resolve, budgetMs));
  await Promise.race([work.then(() => undefined), timeout]);
}

export function familyCheckoutUrl(baseUrl: string, slug: string): string {
  if (!baseUrl || baseUrl.startsWith('#')) return baseUrl; // placeholder — leave alone
  try {
    const u = new URL(baseUrl);
    if (church.familyCode) u.searchParams.set(church.couponParam, church.familyCode);
    u.searchParams.set('ref', slug);
    u.searchParams.set('utm_source', 'church');
    u.searchParams.set('utm_medium', 'partner');
    u.searchParams.set('utm_campaign', slug);
    return u.toString();
  } catch {
    return baseUrl;
  }
}
