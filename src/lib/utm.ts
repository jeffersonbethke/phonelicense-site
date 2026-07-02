/**
 * First-touch UTM capture + persistence.
 *
 * On the very first page a visitor lands on, we snapshot the campaign params
 * and store them. Later touches never overwrite them (first-touch attribution).
 * Every outbound Kajabi checkout URL and every lead payload carries them along.
 *
 * Runs in the browser only.
 */

const STORAGE_KEY = 'pl_utms';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

// Ad-click ids worth keeping for match quality.
const CLICK_KEYS = ['fbclid', 'gclid'] as const;

export type Utms = Record<string, string>;

/** Capture UTMs on first touch. Safe to call on every page load. */
export function captureUtms(): Utms {
  if (typeof window === 'undefined') return {};

  const existing = getUtms();
  if (Object.keys(existing).length > 0) return existing; // first-touch wins

  const params = new URLSearchParams(window.location.search);
  const captured: Utms = {};

  for (const key of [...UTM_KEYS, ...CLICK_KEYS]) {
    const val = params.get(key);
    if (val) captured[key] = val;
  }

  // Record landing page + referrer for context even when no UTMs are present.
  if (Object.keys(captured).length > 0) {
    captured.landing_page = window.location.pathname;
    if (document.referrer) captured.referrer = document.referrer;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
    } catch {
      /* storage blocked — degrade silently */
    }
  }

  return captured;
}

/** Read the persisted first-touch UTMs. */
export function getUtms(): Utms {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Utms) : {};
  } catch {
    return {};
  }
}

/** Append persisted UTMs to an outbound URL (e.g. a Kajabi checkout link). */
export function appendUtms(url: string): string {
  const utms = getUtms();
  if (!url || Object.keys(utms).length === 0) return url;
  // Leave placeholder/anchor URLs untouched.
  if (url.startsWith('#')) return url;

  try {
    const u = new URL(url, window.location.origin);
    for (const [k, v] of Object.entries(utms)) {
      if (k === 'referrer' || k === 'landing_page') continue; // context only
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    }
    return u.toString();
  } catch {
    return url;
  }
}
