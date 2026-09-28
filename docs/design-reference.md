# Design reference — EYP National Committee survey

Survey of 31 NC homepages + eyp.org, captured 2026-08-22 with Playwright
(1440×900, screenshot + computed fonts/colors per site). Purpose: know what
the network looks like so eyp.az deliberately doesn't look like it, and
steal the few good ideas.

Not captured: eyp.am (timed out). eyp.az itself currently serves a cPanel
"Account Suspended" page — hosting has lapsed; flag at deploy time.

## What makes a site "look EYP" (the patterns to break)

1. **The IO WordPress template.** eyp.org, Bulgaria, Portugal, Romania,
   Serbia, Spain and UK run the exact same theme: Source Sans Pro, off-white
   `#F9F9F9` background, indigo `#3A4390` headings, low-poly flat Europe
   illustration, "Welcome to Young Europe!" headline. Seven sites,
   indistinguishable at a glance.
2. **EU indigo + star yellow.** Indigo/EU blue (`#3A4390`, `#394692`,
   `#2A4596`) as primary with yellow (`#EBCA10`–`#F8D320`) CTAs appears on
   ~20 of 30 sites. It's the flag plus the EYP stars logo, everywhere.
3. **Source Sans Pro / Source Sans 3** on 13+ sites (it's the EYP brand
   font, and it reads as "institutional EU project").
4. **Full-bleed photo hero, dark overlay, centered white headline** —
   Albania, Bosnia, Netherlands, Slovenia, Sweden, Switzerland, France,
   Greece, Finland, Croatia. The default move of the whole network.
5. **"Welcome to Young Europe!"** as the literal H1 or `<title>` on at
   least five sites (UK, Norway, Slovenia, Turkey, Bosnia in Bosnian).
6. **Same nav**: Home / About / (Our) Events / News / Join Us / Contact.
   Fine as information architecture, but nothing invites exploration.
7. Cookie banners, WordPress or Wix or Google Sites, yellow accent bar
   under a white header (Bosnia, Slovenia).

## Per-NC notes

| NC | Notes |
| --- | --- |
| eyp.org (IO) | The template everyone copies: Source Sans Pro, `#F9F9F9`, indigo headings, poly-Europe art, key-numbers block (worth keeping as *content*). |
| Albania | Google Sites. Photo hero + centered white title. Nothing else. |
| Austria | **Standout.** Near-black grotesk (Source Sans 950) editorial headlines, typewriter effect ("We stand for community.\|"), tilted stacked polaroid photos, **orange** accent — one of two sites that dropped EU blue. |
| Belgium | Poppins/Inter Tight, grey `#EDEBEB`, photo hero. Generic modern. |
| Bosnia | Poppins, white header + yellow bar, video-still hero, all-caps white headline. |
| Bulgaria / Portugal / Romania / Serbia / Spain / UK | IO template clones (UK adds nothing beyond the poly map). |
| Croatia | Single flat indigo splash screen: logo + motto + values list. Barely a site. |
| Cyprus | **Standout.** No photos above the fold: three shades of flat blue in diagonal layered waves, white+yellow type, yellow pill CTA. Pure graphic composition. |
| Czech | Scada headings; the useful idea is **two audience-path cards** ("I'm a student" / "I'm a teacher") right under the hero. |
| Finland | Tidy WP: white header, photo hero, blue headline on translucent white chip. Plain. |
| France | **Standout.** Flat cornflower blue, Montserrat, photos in organic **blob masks**, illustration-forward, no dark-overlay hero. |
| Germany | **Standout.** CabinetGrotesk variable + Plus Jakarta Sans, pill nav, generous whitespace, muted palette, short page (1875px) that says one thing well. The bilingual switcher we're modeling. |
| Greece | Solid blue `#2A4596` page, light-blue headings, yellow buttons. Dated but committed to its palette. |
| Ireland | Dark `#222` background (only dark site), Fjalla One condensed headings. Distinct but heavy. |
| Italy | Wix. Donation popup over a photo hero over a cookie banner. Cautionary tale. |
| Kosovo | Google Sites. Giant logo on white. Placeholder. |
| Netherlands | Source Sans 3, photo hero, white headline. Network default. |
| Norway | Source Sans 3 on white, "Welcome to young Europe!" title. Network default. |
| Poland | **Standout.** White + near-black ink type, hand-drawn **yellow marker underlines/scribble circles** on headline words and stat numbers, photo **filmstrip carousel**, teal pill CTA. The freshest site in the network. |
| Slovenia | White header, blue/yellow split bar, photo carousel hero. Network default. |
| Sweden | Montserrat 900; hero branded for the **upcoming session** rather than the org — good instinct (also UK's old approach per the plan doc). |
| Switzerland | Photo hero, white text, Source Sans 3. Best *content* on session format/roles; design is default. |
| Turkey | Modern Wix: huge italic all-caps slab "WELCOME TO YOUNG EUROPE!" in indigo+yellow, dropdown nav, dark-mode toggle. Polished but still the cliché palette+phrase. |
| Ukraine | Yellow `#F8D320` headings on white, blue links — national colors doing the work. |
| Armenia | eyp.am timed out. |
| Azerbaijan (current) | Suspended cPanel page. |

## The old eyp.az (Wayback, Feb 2026 snapshot)

`web.archive.org/web/20260215143238/https://eyp.az/` — live site is
suspended; archive shows the 2011–2023 site ("Developed by Gerayzade",
last news Sep 2024, so it was stale well before hosting lapsed).

Design: pure network cliché — white header bar, EU-blue GET INVOLVED
button with yellow text, dark-overlay photo hero, all-caps white headline
("A programme for young people, run by young people"), Open Sans, grey
`#F1F1F1` body, solid-blue boilerplate band. Nothing to keep visually.

Content to carry forward:

- Nav was Home / About / Sessions / Projects / Contact + Get Involved.
- Three-pillar cards: **Raising Awareness / Skill Development / Forum for
  Expression** — decent "what is EYP" content, reusable restyled.
- Session naming conventions: Nth National Selection Conference, Nth
  School Selection Session, Nth University Selection Session (named, e.g.
  "THEIA"), Nth Summer Training Camp.
- **Baku 2023 — 99th International Session of the EYP network** hosted in
  Azerbaijan: the NC's flagship credential, belongs on the new Home.
- Video section (YouTube embeds) and a social "Keep in Touch" block
  existed; newsletter did not.

## Clichés to avoid

- Indigo `#3A4390` + yellow as the palette; Source Sans Pro anywhere.
- "Welcome to Young Europe!" and photo-with-dark-overlay heroes.
- Poly-Europe / EU-stars decorative art; centered white all-caps H1.
- Carousels as the primary hero; cookie-banner + popup stacking (Italy).

## Worth stealing (as content/structure, restyled)

- eyp.org's **key numbers** block (years active, sessions, alumni).
- Czech's **audience-path cards** (student / teacher / partner).
- Sweden's **next-session-first hero** — matches our event-forward brief.
- Poland's **stat treatment** and photo filmstrip (once real photos arrive).
- Germany's restraint: short pages, one message per screen, pill nav.

## Candidate directions for eyp.az

All light-mode, all deliberately off the network palette. Photos arrive
late, so the identity must not depend on them (Cyprus/France prove it can
work; Poland shows photos can be an accent, not the foundation).

**A. Editorial ink + marker accent** (Poland/Austria energy). Warm
off-white paper, near-black ink grotesk headlines, one hot accent —
e.g. Azerbaijani saffron or pomegranate red — used for hand-drawn
underlines, scribbles, and pill CTAs. Photos slot in later as filmstrips.
Feels young, energetic, print-like. Risk: marker gimmick is having a
moment; needs restraint to age well.

**B. Flat graphic geometry** (Cyprus/France direction, localized). Bold
flat color fields and shapes derived from Azerbaijani ornament — buta
(paisley), carpet gul medallions — as abstract section dividers and photo
masks instead of blobs. Strong grotesk, 2–3 flat colors (e.g. deep teal +
warm sand + ink). Zero photo dependence; the most *unmistakably ours*
option. Risk: ornament can tip into tourist-brochure if literal.

**C. Soft modern grotesk** (Germany direction). Variable grotesk
(Cabinet/General Sans class), pill nav, lots of air, muted base + single
accent, session-forward hero. Safest, cleanest, fastest to build; least
distinctive of the three — distinctiveness would come from type + accent
choice alone.

Decision deferred to the Home page design discussion (taste-skill dials).
A and B can hybridize: B's geometry as the base system, A's accent energy
on interactive elements.

## How NCs handle photos (for the photo-collection open item)

Conference-floor shots dominate: raised placards/hands in GA, delegates in
suits, teambuilding circles. Faces are shown plainly everywhere — no NC
blurs or crops minors out, none shows visible consent notices. Formats:
hero backgrounds (most), carousels/filmstrips (Poland, Slovenia), tilted
polaroid stacks (Austria), blob-masked inline images (France). Dedicated
gallery pages are rare. Ask the NC for: 1 GA wide shot, 2–3 committee-work
candids, 1 coffee-break/social shot, board headshots — that covers every
pattern above.

## Inspiration galleries (non-EYP references)

usenaive.ai · neobrutalism.com · ui.unlumen.com · magicui.design ·
recent.design · minimal.gallery · ui.aceternity.com · styles.refero.design
— plus the 73 brand DESIGN.md files in the local `awesome-design-md` skill
(`fd -td awesome-design-md ~` to locate it).

Raw captures: session scratchpad `nc-shots/` (`<slug>-top.png`,
`<slug>-full.jpg`, `results.json` with per-site computed styles).
