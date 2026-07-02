/**
 * Meta Pixel wrapper. Kajabi fires Purchase on its own; this site fires:
 *   - PageView        (every page)
 *   - ViewContent     (key pages: sales page, quiz, event pages)
 *   - Lead            (every capture, with a dedup eventID)
 *   - InitiateCheckout(outbound Kajabi click, with offer value)
 *
 * eventID is generated per Lead so the same conversion can be de-duplicated if
 * a server-side Conversions API is added later. If no pixel id is configured,
 * every helper is a graceful no-op (nothing breaks in dev).
 *
 * Browser only.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _plPixelId?: string;
  }
}

function ready(): boolean {
  return typeof window !== 'undefined' && !!window.fbq && !!window._plPixelId;
}

/** RFC4122-ish id for event dedup. Uses crypto when available. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return 'evt-' + Math.abs(Date.now() ^ Math.floor(Math.random() * 1e9)).toString(36);
}

export function pageView(): void {
  if (ready()) window.fbq!('track', 'PageView');
}

export function viewContent(name?: string): void {
  if (ready()) window.fbq!('track', 'ViewContent', name ? { content_name: name } : {});
}

export function lead(eventId: string, params: Record<string, unknown> = {}): void {
  if (ready()) window.fbq!('track', 'Lead', params, { eventID: eventId });
}

export function initiateCheckout(value: number, contentName?: string): void {
  if (ready()) {
    window.fbq!('track', 'InitiateCheckout', {
      value,
      currency: 'USD',
      ...(contentName ? { content_name: contentName } : {}),
    });
  }
}
