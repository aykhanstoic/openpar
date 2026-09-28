# Design brief — eyp.az (EYP Azerbaijan)

Design the mobile web experience for EYP Azerbaijan (National Committee of
the European Youth Parliament). Audience: high-school/university students
arriving from Instagram links on their phones, plus teachers and partners.
Design mobile-first at 390px; desktop is a widening of the same design, not
a separate one.

## Hard constraints

- Fully static site (Astro output) — no logins, no backend, no dashboards.
- Light mode only.
- Bilingual EN/AZ. All display text must render the Azerbaijani letter
  **ə** (test with "EYP Azərbaycan") — many fonts lack it; Archivo covers it.
- Sign-ups are external: Members Platform link for national sessions,
  Google Form link for outreach sessions. No in-page forms except a
  newsletter email field.
- Accessible: WCAG 2.1 AA contrast, visible focus states, real buttons/links.

## Home page structure (decided — do not add or remove sections)

1. **Header**: wordmark ("EYP Azərbaycan" + small "European Youth
   Parliament"), Join CTA pill, globe icon button (language switch),
   burger menu.
2. **Hero — session-forward**: the next session is the headline (e.g.
   chip "Applications open" → "NSC ’26" → one-line session name → city ·
   dates · deadline → Apply CTA + secondary "How it works" link). Hero
   fits in one phone viewport, max ~4 text elements. Fallback when no
   session is upcoming: an org-level hero (same layout, mission-led copy).
3. **What is EYP**: short headline ("School, but the fun part." energy —
   warm, zero bureaucratese), one lead paragraph, three pillars as a list:
   Raising awareness / Skill development / Forum for expression.
4. **Upcoming sessions**: cards. Two kinds, visually distinguished:
   national selection (Members Platform apply link) vs outreach (open to
   all, Google Form sign-up). Empty state required: when nothing is open,
   replace with a "no open calls" card pointing to newsletter/Instagram.
5. **Footer**: short evocative line, newsletter email + subscribe button,
   two link columns, fine print.

## What it must NOT look like (the EYP network cliché set)

Nearly every EYP national site shares: indigo `#3A4390` + star-yellow
palette, Source Sans Pro, "Welcome to Young Europe!" headline, full-bleed
photo hero with dark overlay and centered white text, low-poly Europe
illustration. Avoid ALL of these. No photo-dependent hero at all — real
photos arrive months from now, the identity must stand without them.

## Visual direction candidates (pick one and commit; B is the working favourite)

- **A — Editorial ink + marker**: warm paper `#FAF6EE`, near-black ink
  `#171511`, Space Grotesk, everything monochrome except hand-drawn
  saffron `#F5B82E` marker underlines/scribbles; ink pill CTAs.
- **B — Flat geometry + hot accent**: warm paper `#FBF7EF`, ink `#16201D`,
  deep teal `#0F5C50`, saffron `#F2B33D`, pomegranate `#CE3B2C` (the one
  hot accent — CTAs only), Archivo variable (expanded ~110–115% for
  display). Flat abstract shapes derived from Azerbaijani ornament (buta
  paisley) as hero/section art — abstract, never tourist-brochure literal.
- **C — Soft modern grotesk**: off-white `#FBFBF9`, ink `#191A1D`, single
  cobalt accent `#2F52E0`, Manrope, soft grey cards `#F1F1EE`, generous
  whitespace.

Shared rules regardless of direction: one hot accent per page, locked
site-wide; pill radius for interactive elements, ~14–18px for cards, one
consistent scale; eyebrow labels used sparingly.

## Working copy (use as-is; data values are samples)

- Chip: "Applications open" · H1: "NSC ’26" · sub: "10th National
  Selection Conference of EYP Azerbaijan" · meta: "Baku · 14–17 May 2026 ·
  apply by 30 Apr" · CTAs: "Apply now" / "How it works".
- Pillars: "Raising awareness — European issues, argued by you — not read
  from a textbook." / "Skill development — public speaking, writing,
  teamwork — skills that outlast any exam." / "Forum for expression — a
  stage for your opinion, with people who actually listen."
- Session cards: "NSC ’26 — Baku … Apply on the Members Platform →" and
  "Ganja Regional Forum … First time? No membership needed — just sign
  up. Sign up — 2 minutes →".
- Footer line: "Once a year, Europe fits in one room." Newsletter
  placeholder: "Email for session calls".

## Credibility facts (available if needed, currently cut from Home)

Active since 2011 · 40+ sessions · 1,500+ alumni · host of the 99th
International Session of EYP (Baku 2023).
