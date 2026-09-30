# EYP Azerbaijan Website — Plan

Static public website for EYP Azerbaijan (National Committee of the European
Youth Parliament). Primary audiences: prospective delegates and their
schools/parents, current members and alumni, partners/sponsors, and the
international EYP network.

Full background document: `EYP_Azerbaijan_Website_Plan.txt` (Riad's Downloads,
Aug 2026 draft). This file distills it into working requirements and records
decisions as they are made.

## Hard constraints

- Fully static site — no backend, no database, no logins, no server code.
- Applications and sign-ups via embedded/linked **Google Forms** (needed for
  outreach sessions, where delegates can't sign up through the Members
  Platform).
- Bilingual: **EN + AZ**, visible language switcher in the header
  (model: eyp.de, eypgreece.org).
- **Light mode only**, custom color palette (may borrow from other NC designs).
- Mobile-first, accessible (WCAG 2.1 AA contrast, keyboard nav, alt text).
- Website should not look like other NCs, it should have a unique design and usage.

## Requirements (from the final bullet list of the source doc)

- **Design**: new design; coloring can match EYP or borrow from other NCs.
  Light mode only, custom colors. We can customize it.
- **Sessions**: session entries can be added / modified / deleted through a
  simple content workflow ("dashboard"); a dedicated field marks **outreach
  sessions** (these get a Google Form link since the Members Platform can't
  take those sign-ups). Normal sessions get applied thru Members Platform.
  Only sessions that do not have a delegate application link in MP will be done
  thru Google Form wrapper (with our ui).
- **Language**: multilanguage, EN and AZ.
- **Contact**: separate page.
- **How to participate**: one page for getting involved — infographic style,
  photos + short paragraphs.
- **Partners**: separate page (or footer strip).
- **Google Form**: for sessions outside the Members Platform (outreach).
- **Newsletter**: subscription with confirmation email (double opt-in) —
  handled by an external email service, not our code; members coordination
  sends the emails.
- **Executive Board**: page, content managed like sessions.
- **Supervisory Board**: same as above.
- **News**: page for all types of news, highly correlated with sessions.
- **Privacy policy**: separate page.

## Sitemap (from source doc §3, trimmed to requirements)

Home · About Us (incl. Executive + Supervisory Board) · What is EYP? /
How to Participate · Sessions/Events · News · Partners · Contact ·
Privacy Policy

## Reference sites

- eyp.org — top-level nav (Who we are / Get involved / News), key-numbers block
- eyp.ch — best explanation of session format and roles for newcomers
- eypuk.co.uk — event-forward homepage announcing next session
- eyp.de — values-first messaging, clean bilingual switcher (our AZ/EN model)
- eypgreece.org — welcoming intro for schools/first-timers, bilingual
- eypbg.org — clear governance explanation for a national audience
- others

## Decisions log

| Date       | Decision                                                                                | Why                                                                          |
| ---------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 2026-08-22 | Work on branch `dev`; nothing committed without explicit go                             | Riad's workflow                                                              |
| 2026-08-22 | Tech stack **confirmed**: Astro + Tailwind CSS, pure static output | See "Tech stack" below |
| 2026-08-22 | First step: full static scaffold — base layout, EN/AZ routing + switcher, placeholder pages for the whole sitemap, content collections for sessions/news/board | Gives both branches a working shared base; design comes later |
| 2026-08-22 | Branch workflow: `dev` = shared integration branch (pushed to origin); Riad and teammate each work on personal branches off `dev` and merge back into `dev` | Two-person team |
| 2026-08-22 | Scaffold styling is deliberately neutral placeholder | Unique design is a separate later phase, must not copy other NCs |
| 2026-08-23 | Home structure fixed: header (logo · Join CTA · globe language button · burger nav) → session-forward hero → what-is-EYP + three pillars → upcoming sessions → footer + newsletter. Cut from Home: stats/Baku-2023 band, student/teacher/partner path cards, news teaser | Riad's review of the 8-section skeleton |
| 2026-08-23 | Upcoming-sessions section needs an empty state (no open calls → replacement card, e.g. next-session teaser + newsletter/Instagram prompt) instead of an empty list | Sessions are seasonal; homepage can't show a blank section |
| 2026-08-23 | Visual direction: **soft & friendly** (not loud/brutalist). Page background = white/warm ground + soft aurora wash + grain + hand-drawn strokes; palette evokes EYP AZ via softened flag hues (azure/coral/sage), one deeper coral as the single hot accent; local flavor = subtle nods only. The earlier A/B/C mock directions are rejected as-given | Riad's answers to the design questionnaire |
| 2026-08-23 | Design workflow: background layer first, tuned by Riad in a local editable playground (browser page with controls + settings-JSON export); components/type come after the background is locked | Riad wants to shape the design hands-on, not pick from fixed mocks |
| 2026-08-25 | Playground approach shelved. Design (mobile + web, background first) will likely come from an external designer working in Figma; we build from that design when it arrives | Riad's call — hands-on tooling wasn't landing |
| 2026-08-31 | Home page built end-to-end at 390px (desktop = same design widened): header, session-forward hero, what-is-EYP + 3 pillars, upcoming sessions incl. empty state, footer + newsletter | First page in the build order |
| 2026-08-31 | Typefaces: **Fraunces Variable** (`soft.css`, wght + SOFT axes) for display, **Plus Jakarta Sans Variable** for body, both self-hosted via fontsource | Only candidates that actually carry the Azerbaijani **ə** (U+0259). Verified by reading each font's cmap table, not by eyeballing a screenshot — Bricolage Grotesque, Syne, Outfit and Figtree all silently fall back, and Manrope has ə but not Ə |
| 2026-08-31 | Both font families are imported with their **full** package CSS (latin + latin-ext) | ə lives in latin-ext; ı ç ö ü ş ğ are latin. A latin-only subset renders half the alphabet and falls back on the rest |
| 2026-08-31 | Palette locked: ground `#FDFDFB`, ink `#22303B`, ink-muted `#546471`, accent `#E4604C` (24px+ display text and decoration only), accent-strong `#C93B23` (all CTA fills and small accent text). Azure / coral / sage stay decorative | AA contrast measured against **painted pixels**, not token math: the aurora wash drops the effective ground to ~`rgb(240,239,233)`, which puts bare accent under 4.5:1 for body-size text |
| 2026-08-31 | Menu JS lives in `public/menu.js`, loaded with `<script is:inline src="/menu.js" defer>` | Astro inlines small component scripts, and the site's `script-src 'self'` CSP blocks inline script. An external file is the only form that survives the policy |
| 2026-08-31 | Page background is **out of scope for us** — `src/components/SiteBackground.astro` is the single swap point for the designer's layer; the hero's lower void is its canvas | Design comes from the external designer (2026-08-25 decision) |
| 2026-08-31 | Session frontmatter carries optional `titleAz` / `themeAz` / `venueAz`; all rendering goes through `localizeSession()` in `src/lib/sessions.ts`, which falls back to English when a variant is missing | `title`/`theme`/`venue` were EN-only and rendered untranslated on `/az/` (AZ hero read "10th National Selection Conference…"). Optional fields keep "adding a session = one file" true |
| 2026-09-30 | **Inherit aykhan's branch wholesale**: his `[lang]` routing, split `en.ts`/`az.ts`, content schema, 12 pages and JSON API, in the EYP Spain/Portugal indigo + yellow look (Source Sans 3). **Supersedes** the soft & friendly direction and every 2026-08-31 row above on typefaces, palette, `menu.js`, `SiteBackground` and `localizeSession`. The earlier Home work stays in git history (`57cfee5`) | Riad's call. The other 11 pages already exist and build; re-skinning them was the bigger job |
| 2026-09-30 | All demo content is **explicit placeholder** — no half-real entries. Removed the two semi-real sessions (NSC '26, Ganja forum); three `sample-*` sessions remain, one per state (open/Members Platform, open/outreach, past) | A teammate filling the site must be able to tell demo from real at a glance |
| 2026-09-30 | Editing dashboard = a **git-backed CMS (Sveltia or Decap) at `/admin`** over the existing content files; logins are GitHub accounts, every save is a commit that triggers a rebuild. A custom password-gated dashboard that edits the site is **not** built | It would need a server and our own user store, which the hard constraints rule out. A git-backed CMS gives the same add/edit/delete screens with no backend of ours. Roadmap, not built yet |
| 2026-09-30 | eype.es (Spain) and eyp.pt (Portugal) are the **reference for what content goes on which page** and what the placeholders should be. Our site need not match them | Riad's call: same network, different NCs — borrow the information architecture, not the look |
| 2026-09-30 | Team preview lives at https://openpar.vercel.app/en/ | Riad set it up; `eyp.az` comes at launch |

## Tech stack (confirmed 2026-08-22)

**Astro + Tailwind CSS, pure static output**, free hosting (GitHub Pages or
Netlify/Vercel) — eventually at eyp.az.

- Sessions, news, and board members live as markdown/JSON content files
  ("content collections"). Adding a session = adding one file with
  frontmatter: dates, venue, theme, call status, `outreach: true/false`,
  `formUrl`. This satisfies the add/modify/delete requirement with no backend;
  if the board later wants a visual dashboard, a git-based CMS (Sveltia/Decap)
  can sit on top of the same files — still zero backend. Not built now.
- Built-in i18n routing → `/az/...` and `/en/...` with a header switcher.
- Ships zero JS by default → fast on phones.
- Newsletter double opt-in via an external service (e.g. Buttondown/Brevo
  embed) — deferred until the rest is live.

## Design phase — process (agreed 2026-08-23)

Design and build **one page at a time**. Per page: discuss components and
layout first (a "page" may collapse into a section/component of another
page), agree on the plan, then build it, then move to the next page.
Real photos arrive later from the NC — build with vibe-setting placeholders
and swap in real images when delivered.

Design research and direction live in `docs/design-reference.md`
(per-NC survey, network patterns, clichés to avoid, candidate directions).

Tooling for the design phase (installed as local agent skills, kept off git):

- **taste-skill** (`design-taste-frontend` + minimalist/brutalist/soft
  variants) — anti-slop design process: brief inference, design dials,
  anti-default discipline. Use when designing each page.
- **web-design-guidelines** (Vercel) — UI code audit against Web Interface
  Guidelines. Use when reviewing built pages.
- **awesome-design-md** — 73 DESIGN.md brand-language files (Linear, Stripe,
  Notion, …). Use as base design-language references.
- **Playwright** — screenshots and visual verification of our own pages.

Inspiration galleries/component references: usenaive.ai, neobrutalism.com,
ui.unlumen.com, magicui.design, recent.design, minimal.gallery,
ui.aceternity.com, styles.refero.design.

## Home page — implementation notes (2026-08-31)

> **Superseded 2026-09-30** — the home page described here was replaced when
> aykhan's branch was inherited (see the decisions log). Kept as a record; the
> files it mentions are gone from the tree and live in history at `57cfee5`.

Built and verified at 390px phone and 1440px desktop, in both locales.

- **Verification is a real-pixel audit**, not token arithmetic: a Playwright +
  pngjs script walks every text node, reads the computed colour and the
  actually-painted background pixel behind it, and asserts WCAG AA. Token maths
  lies here because the aurora wash sits between the ground colour and the text.
  Two of the three findings it first reported turned out to be sampler
  artifacts — pill-shaped elements let a bounding-box sample land on the page
  behind the cap arc, and a centre sample lands on the glyph, not the fill.
  Sample the interior only (x 15–85%, y 30–70%) and confirm any finding against
  the computed style before changing code.
- **No copy is hardcoded.** Every string is a key in `src/i18n/ui.ts`, which is
  a typed `Record<UIKey, string>` plus a runtime parity guard that throws on a
  missing, extra or empty AZ key — Astro does not typecheck during `astro
  build`, so the type alone would not catch it.
- **Dates are all UTC-pinned.** `z.coerce.date()` on a bare `YYYY-MM-DD` gives
  UTC midnight; any `Intl` formatter without `timeZone: 'UTC'` shifts a 12 Nov
  session to 11 Nov on any build machine west of Greenwich. The formatters in
  `src/lib/sessions.ts` all pin it.
- **`z.string().url()` accepts `javascript:` and `data:`.** Session
  `applyUrl` is board-authored and lands straight in an `href`, so
  `src/content.config.ts` refines it to http(s) at build time.
- **Vite base64-inlines small assets**, which turns the woff2 files into
  `data:` URLs and violates `font-src 'self'`. `assetsInlineLimit` in
  `astro.config.mjs` disables it.
- The site is static, so the CSP is a `<meta>` tag in `Base.astro` and is
  **PROD-only** (Vite's dev HMR needs inline script and a websocket).

## Roadmap (set 2026-09-30)

Detailed launch checklist (legal, content, wiring) lives in `README.md` →
"Before launch"; this is the order to tackle it in. Nothing here is urgent
"this second" — it is the sequence.

**Phase 0 — Land the code**
- Commit the aykhan merge, remove leftover home-page files, push `riad`, merge
  into `dev`, point the Vercel production branch at `dev`.
- Fix whatever the code review of aykhan's branch turns up.
- Tell aykhan to drop his editor launch-config folder from his branch (it
  is tracked there; our rule is no tooling traces in git).
- Housekeeping: `@fontsource-variable/*` deps and the `assetsInlineLimit`
  setting in `astro.config.mjs` are unused now; `docs/design-brief.md` and
  `docs/design-reference.md` describe the superseded direction.

**Phase 1 — Make it fillable (before inviting the EYP AZ team)**
- Content inventory: for each page, list the slots against eype.es and eyp.pt
  (what goes where, what the placeholder says). Mark every placeholder clearly.
- CMS dashboard at `/admin` (Sveltia or Decap) over sessions, news, board and
  partners; decide who gets editor access (GitHub accounts); confirm a save
  triggers a Vercel rebuild.
- Gather from the NC: board names + consent, 3–5 real news posts, partners,
  photos (50–80, consent for minors). Look at how other NCs post photos.

**Phase 2 — Legal (before any form is switched on)**
- Privacy policy, legal notice, safeguarding policy — modelled on the Spain and
  Portugal sites, written/reviewed by the right person. The site handles data
  from minors.

**Phase 3 — Wiring and hardening**
- Newsletter with double opt-in; contact form on a real service.
- Security that did not survive the merge: CSP (meta now, real headers at deploy
  for `frame-ancestors` + HSTS), referrer policy, `applyUrl` restricted to http(s).
- Fonts load from Google Fonts (a third-party request); self-host instead.
- Daily scheduled rebuild so finished sessions stop showing as upcoming, **plus**
  a deadline/end-date check in `SessionCard.astro` (`canApply` ignores
  `applyDeadline` today, so "Apply" stays live after the deadline). A build-time
  check only works together with the daily rebuild. Dates are UTC midnight, so a
  session moves to "past" at 04:00 Baku time on its last day.
- From the 2026-09-30 code review, not fixed yet: `sessions.lang` is never read
  (an `az`-only session still shows on `/en/`); the date formatters in
  `src/i18n/ui.ts` lack `timeZone: 'UTC'` (harmless on Vercel, wrong on a
  west-of-Greenwich build); the locale regex is hardcoded in `Base.astro` and
  `Header.astro`; mobile menu Escape doesn't return focus to the button and there
  are two `Primary` nav landmarks.
- Analytics, Open Graph image, native Azerbaijani review of EYP terms,
  confirm `site` URL.

**Phase 4 — Launch**
- eyp.az registrar access + DNS, production switch, Instagram link-in-bio,
  announce to schools.

## Build order (proposed)

1. Site shell (header, nav, EN/AZ switcher, footer) + Home
2. Sessions/Events (content collection, outreach flag, Google Form CTA)
3. How to Participate (infographic-style)
4. About Us + Executive/Supervisory Board
5. News
6. Partners, Contact, Privacy Policy
7. Newsletter integration, SEO/OG polish

## Open items (need Riad / the board)

- Color palette — EYP brand kit from the International Office, or borrow from
  another NC? - We will perhaps gather something from all NCs and then decide.
- eyp.az domain access (registrar) — needed only at deploy time. - We will have it.
- Photos from past sessions (consent for minors), board bios/headshots. - That we will have later bc we will need the NC to send us the pics in the first place. It would be nice to also gather info from other NC websites on how they post their pictures.
- Google Form URLs for the first outreach session call. - Ignore this, we dont need this now, ignore.
- `frame-ancestors` and HSTS cannot be set from a `<meta>` CSP — they must be
  real response headers, added in the host config at deploy time.
- `form-action 'self'` in the CSP must gain the newsletter provider's origin
  when the newsletter form is wired to a provider, or the subscribe POST will
  be blocked. (There is no CSP at all right now — see Roadmap, phase 3.)
- A static build freezes "now" at build time, so a session only stops being
  "upcoming" on the next deploy. Needs a scheduled rebuild (daily cron on the
  host) before launch.
- AZ header tagline wraps to two lines ("AVROPA GƏNCLƏR / PARLAMENTİ") where the
  EN one fits on one, making the AZ header pill slightly taller. Cosmetic;
  left as-is pending Riad's call.
