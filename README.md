# EYP Azerbaijan — website

Bilingual (EN/AZ) static site for EYP Azerbaijan, the National Committee of the European Youth
Parliament in Azerbaijan. Built with Astro 5 and Tailwind 4. Requirements live in [PLAN.md](PLAN.md).

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:4321. `npm run build` outputs a static site to `dist/`.

> **Windows note.** If `npm install` fails on esbuild's postinstall with
> `'node' is not recognized`, npm is handing `cmd.exe` a PATH without
> `C:\Program Files\nodejs`. Running the same command from PowerShell works.
> Keeping the repo out of a OneDrive-synced folder also avoids `EPERM` errors
> when npm rewrites `node_modules`.

## Architecture

### One route per page, not one per language

Pages live in `src/pages/[lang]/` and are rendered once per locale via a shared `getStaticPaths`
in `src/i18n/paths.ts`. There is no `en/` or `az/` page directory, so the two languages cannot
drift apart structurally — only their strings differ.

### Translations are type-checked

`src/i18n/en.ts` exports the copy **and** the `Dict` type derived from it. `src/i18n/az.ts` is
typed as `Dict`, so adding an English key without an Azerbaijani one is a build error rather than
a page that silently falls back to English.

Adding a third language: add it to `languages` in `src/i18n/ui.ts` and create a dictionary. No
page needs to change.

### Content collections are the dashboard

Board members publish by adding a markdown file — no CMS to license, no database to hand over
between boards. Schemas are in `src/content.config.ts`.

| Collection | Folder | Notes |
| --- | --- | --- |
| `sessions` | `src/content/sessions/` | `outreach: true` switches the apply button from the Members Platform to a direct form |
| `news` | `src/content/news/` | `lang` is per-post; `session` cross-references a session entry |
| `board` | `src/content/board/` | `body` is `executive` or `supervisory` |
| `partners` | `src/content/partners/` | Renders on the partners page and the footer strip |

Two schema rules are enforced at build time: `endDate` cannot precede `startDate`, and a session
with `status: call-open` must have an `applyUrl`. A malformed entry fails the build instead of
shipping a broken card.

If a future board wants a visual editor, any git-backed CMS (Decap, Sveltia, Tina) can be pointed
at these folders without schema changes.

### Design

Light mode only, per PLAN.md. The palette is deliberately **not** the royal blue that eyp.org,
eyp.de and most other NCs use:

| Token | Value | Role |
| --- | --- | --- |
| `--color-deep` | `#0B4F5C` | Primary — buttons, footer, headings |
| `--color-teal` | `#12A0AF` | Decorative only; too light for text |
| `--color-amber` | `#E8A33D` | Deadlines and open calls |
| `--color-cream` | `#FBF7F0` | Alternating sections |
| `--color-ink` | `#12242A` | Body text |

Type is Space Grotesk (display) + Inter (body). Both ship the `latin-ext` subset covering
`U+0100–02BA`, which includes the Azerbaijani schwa `ə` — verified against the Google Fonts
`unicode-range`, not assumed.

## Before launch

Everything below is a placeholder. Search for `PLACEHOLDER` to find them.

### Blocking

- [ ] **Privacy policy** — `src/i18n/en.ts` → `privacy` is a section skeleton with no legal
      force. The site collects data from minors. A lawyer or DPO must write the real text, and
      **no form may be switched on before that.**
- [ ] **Legal notice / imprint** — registered name, legal form, registration number, address.
- [ ] **Safeguarding policy** — referenced from the participate page; must exist and be linked.

### Content

- [ ] **Board members** — three `Name Surname` entries in `src/content/board/`. Role-based
      emails only; get consent before publishing photos.
- [ ] **Sessions** — three sample entries. Replace or delete.
- [ ] **News** — three placeholders. The plan asks for 3–5 real posts before launch.
- [ ] **Partners** — one placeholder; delete the file if there are none to show yet.
- [ ] **Contact addresses** — all five are `example.org`.
- [ ] **History and documents** — founding year, statutes, annual reports (About page).
- [ ] **Photography** — board cards fall back to initials; there is no session photography yet.
      The plan calls for 50–80 curated photos, with consent where minors are identifiable.

### Wiring

- [ ] **Forms are inert by design.** Both the contact and newsletter forms intercept submit and
      show a notice. Connect them to a form service, and the newsletter to a provider that does
      **double opt-in** (a plan requirement).
- [ ] **Azerbaijani needs a native review.** The translation is complete and idiomatic, but
      EYP-specific terms (`Ümumi Yığıncaq`, `qətnamə`, `komanda qurma`) should match the
      wording the committee already uses with schools.
- [ ] **Open Graph images** — meta tags are in place, but no image is set.
- [ ] **Analytics** — none installed. The plan suggests Plausible, or GA4 with a cookie banner.
- [ ] **`site` in `astro.config.mjs`** is `https://eyp.az`; confirm before deploying, since
      canonical and hreflang URLs derive from it.

## Licence

MIT. Covers the code, not the EYP name or emblem.
