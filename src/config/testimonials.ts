/**
 * Config-driven testimonial slots. Consumed by sales page + event pages.
 *
 * TODO(inputs): the mockups ship MOCK testimonials (marked in-page). Replace
 * with real, cleared quotes after Edition One. Set `mock: true` on anything
 * not yet real so the UI can label or hide it before launch.
 */

export interface Testimonial {
  quote: string;
  name: string;
  detail: string; // e.g. "kids 9 & 13, Franklin TN"
  mock?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We stopped fighting about the phone and started building something together. That alone was worth it.',
    name: 'Matt & Jenny R.',
    detail: 'kids 9 & 13, Franklin TN',
    mock: true,
  },
  {
    quote:
      'Our son had had a phone for two years and it was chaos. We reset the whole thing without taking it away — and he actually thanked us.',
    name: 'Dana & Marcus T.',
    detail: 'kids 8 & 11',
    mock: true,
  },
  {
    quote:
      'It felt less like a course and more like a rite of passage. The certificate is on our fridge.',
    name: 'Sarah & Ben K.',
    detail: 'kids 12 & 15',
    mock: true,
  },
];
