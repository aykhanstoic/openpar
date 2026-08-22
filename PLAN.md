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
