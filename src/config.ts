/* Single place for the outward-facing links and endpoints the site needs.
   Everything here is front-end only — no secrets belong in this file. */

/** Newsletter provider endpoint (Buttondown / Brevo / Mailchimp form action).
    Empty until a provider is chosen: the footer renders the real field and
    button but disables them rather than pretending to accept an address. */
export const NEWSLETTER_ACTION_URL = '';

/** TODO: confirm the live handle with the board before launch. */
export const INSTAGRAM_URL = 'https://www.instagram.com/eyp.azerbaijan/';

export const CONTACT_EMAIL = 'info@eyp.az';
