/**
 * Lead capture → webhook (Zapier/Make → Kajabi). Fire-and-forget, graceful
 * failure: a down webhook must never block the UI or lose the user's flow.
 *
 * Every lead payload carries: name, email, tags[], the persisted first-touch
 * UTMs, any extra form fields, plus a pixel eventID for dedup. On submit we
 * POST to the webhook AND fire the Meta Pixel Lead event with the same eventID.
 *
 * COPPA: never collect a child's name or contact info. Parent name/email and
 * child AGE only. Callers are responsible for honoring this.
 *
 * Browser only.
 */

import { getUtms } from './utm';
import { lead as pixelLead, newEventId } from './pixel';

// Read the webhook URL injected into the page (see Base layout).
function webhookUrl(): string {
  return (typeof window !== 'undefined' && window.__PL?.webhookUrl) || '';
}

declare global {
  interface Window {
    __PL?: { webhookUrl: string; pixelId: string };
  }
}

export interface LeadInput {
  name?: string;
  email: string;
  tags: string[];
  /** arbitrary extra fields (quiz answers, church name, etc.) */
  fields?: Record<string, unknown>;
  /** pixel content name for the Lead event */
  pixelName?: string;
}

export interface LeadResult {
  ok: boolean;
  eventId: string;
}

/**
 * Submit a lead. Resolves true even on network failure of the pixel, but
 * reports webhook success in `ok`. Callers should proceed to the thank-you
 * state regardless (fire-and-forget) — never trap the user on an error.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const eventId = newEventId();
  const payload = {
    name: input.name ?? '',
    email: input.email,
    tags: input.tags,
    utms: getUtms(),
    fields: input.fields ?? {},
    eventId,
    submittedFrom: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // Fire the pixel Lead immediately (independent of the webhook).
  try {
    pixelLead(eventId, { content_name: input.pixelName ?? input.tags[0] ?? 'lead' });
  } catch {
    /* pixel not ready — ignore */
  }

  const url = webhookUrl();
  if (!url) {
    // No webhook configured yet (placeholder phase). Log for dev visibility.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[lead] webhook not configured — payload would be:', payload);
    }
    return { ok: false, eventId };
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Zapier catch-hooks accept simple CORS POSTs; keepalive lets the
      // request survive a navigation right after submit.
      keepalive: true,
    });
    return { ok: true, eventId };
  } catch {
    return { ok: false, eventId };
  }
}
