/**
 * Site-wide config + environment values.
 *
 * Env vars are read once here so no component touches import.meta.env directly.
 * All are optional — the site builds with them blank (forms + pixel no-op
 * gracefully until real values land). See .env.example.
 */

const env = import.meta.env;

export const site = {
  name: 'Phone License',
  domain: 'phonelicense.co',
  url: 'https://phonelicense.co',
  tagline: 'Earn the phone. Keep the trust.',
  // Hero subhead must always name BOTH audiences (First Phone + Reset):
  twoAudienceLine:
    'Whether it’s their first phone or a fresh start on the one they already have.',

  // ── Integration endpoints (env-driven, safe placeholders) ──
  webhookUrl: env.PUBLIC_WEBHOOK_URL ?? '',
  // Optional second inbox for church-license records (e.g. a Basin form → its
  // own Google Sheet), so partner deals don't sit in the consumer lead stream.
  // Blank = church signups just go to the main webhook like every other form.
  churchWebhookUrl: env.PUBLIC_CHURCH_WEBHOOK_URL ?? '',
  metaPixelId: env.PUBLIC_META_PIXEL_ID ?? '',
  ga4Id: env.PUBLIC_GA4_ID ?? '',
  // "Planning something bigger" contact door. Decision (2026-08-04): no
  // Calendly — email is the door. Not env-driven on purpose.
  contactUrl: 'mailto:hello@phonelicense.co',

  // ── Feature flags ──
  /**
   * The "Family Phone Contract" free-download lead capture (footer band on every
   * page + the injected band on the homepage). Turned OFF for now — flip to true
   * to bring it back everywhere at once. Nothing else needs editing.
   */
  contractLead: false,

  // Convenience flags for conditional wiring / dev warnings.
  get webhookReady() {
    return this.webhookUrl.trim().length > 0;
  },
  get pixelReady() {
    return this.metaPixelId.trim().length > 0;
  },
} as const;

// Main site navigation — the whole funnel.
export const nav = [
  { label: 'How it works', href: '/#how' },
  { label: 'The course', href: '/#pricing' },
  { label: 'Free quiz', href: '/quiz' },
  { label: 'The Workshop', href: '/conference' },
  { label: 'Events', href: '/events' },
  { label: 'For churches', href: '/churches' },
] as const;

export type NavItem = (typeof nav)[number];
