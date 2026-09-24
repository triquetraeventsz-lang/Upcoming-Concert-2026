// Campaign configuration for the concert teaser page.
// Update these values as real event details are confirmed — nothing here
// should be treated as final until it's explicitly set.

export const eventConfig = {
  // Set this once the actual reveal date/time is locked, e.g.:
  //   revealDate: new Date('2026-11-15T19:00:00+05:30'),
  // Leave it as null until then — the Countdown component shows a
  // "to be announced" state instead of a fake ticking countdown.
  revealDate: null,

  signupEnabled: true,

  // Waitlist ("Join the List") submissions are delivered here via Web3Forms.
  waitlistEmail: 'hello@triquetraevents.co.in',

  // Add real handles only once accounts exist for this campaign, e.g.:
  //   instagram: 'https://instagram.com/...'
  socialLinks: {},

  // Campaign contact details shown in the footer.
  contact: {
    email: 'hello@triquetraevents.co.in',
    phones: ['+91 8800119668', '+91 8800119840'],
  },
}
