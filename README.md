# EYP Azerbaijan — website

Bilingual (EN/AZ) static site for EYP Azerbaijan, the National Committee of the European Youth
Parliament in Azerbaijan. Built with Astro 5 and Tailwind 4. Requirements live in [PLAN.md](PLAN.md).

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:4321. `npm run build` prerenders every public page as static HTML;
only the `/admin` editor runs as a Vercel Function (see below).

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

The wording of each page lives in `src/data/pages/<page>.json` as `{ "en": {...}, "az": {...} }`,
so members can edit it in `/admin`. `src/i18n/en.ts` and `az.ts` hold only the interface labels
(menu, buttons, statuses, footer) and pull each page's text in from those files.

The build checks every page file (`src/lib/page-text.ts`, run from `src/i18n/ui.ts`): a key
missing in one language, an empty text, or lists of different lengths stop the build, so Vercel
keeps the last good site online. To add a new piece of text to a page, add the key to both `en`
and `az` in its JSON file and use it in the page template; it then shows up in `/admin` by itself.

Adding a third language: add it to `languages` in `src/i18n/ui.ts` and create a dictionary. No
page needs to change.

### Content collections are the dashboard

Board members publish by adding a markdown file — no CMS to license, no database to hand over
between boards. Schemas are in `src/content.config.ts`.

| Collection | Folder | Notes |
| --- | --- | --- |
| `sessions` | `src/content/sessions/` | `outreach: true` switches the apply button from the Members Platform to a direct form |
| `news` | `src/content/news/` | `lang` is per-post; `session` cross-references a session entry |
| `board` | `src/content/board/` | `group` is `executive` or `supervisory` |
| `partners` | `src/content/partners/` | Renders on the partners page and the footer strip |

Two schema rules are enforced at build time: `endDate` cannot precede `startDate`, and a session
with `status: call-open` must have an `applyUrl`. A malformed entry fails the build instead of
shipping a broken card.

### The `/admin` editor

Members log in at `/admin` with one shared password (no GitHub account) and can change:

- **Page text**: every piece of wording on the 12 content pages, English and Azerbaijani side by
  side, with readable labels ("Mission — Text 2", "FAQ 3 — Answer"). They change words only;
  the keys and layout stay fixed, except the lists in `LISTS` (`src/lib/page-text.ts`: History
  milestones, Legal notice sections), which can grow and shrink.
- **Sessions, news, board members, partners**: add, edit, delete through forms.

A save is checked against the same rules as the build, written to the repo as a commit by a
server-side token, and Vercel rebuilds: the site updates about two minutes later. Each save asks
for the editor's name, which goes into the commit message, so the history shows who did what.

Code: `src/pages/admin/` (rendered on request, `prerender = false`); `src/lib/admin/` (password
check, GitHub storage, the field lists and rules for each collection in `collections.ts`);
`src/lib/page-text.ts` (page registry, labels, checks); `src/middleware.ts` (keeps `/admin` out
of the locale routing). A field added to a schema in `src/content.config.ts` must also be added
to `collections.ts`, or the form will not show it (an edit keeps fields it does not know).

**Setup in Vercel** (Project → Settings → Environment Variables, then redeploy):

| Variable | Value |
| --- | --- |
| `ADMIN_PASSWORD` | The shared password. At least 12 characters; shorter ones are refused. |
| `ADMIN_SESSION_SECRET` | A random string of 32+ characters (signs the login cookie). |
| `GITHUB_TOKEN` | A fine-grained GitHub token: only this repo, **Contents: Read and write**. |
| `GITHUB_REPO` / `GITHUB_BRANCH` | Optional. Default `aykhanstoic/openpar` / `dev`. Must be the branch Vercel deploys as production, or saves only reach previews. |

To remove someone's access, change `ADMIN_PASSWORD`: everyone is logged out and needs the new
one. Wrong passwords are slowed down (5 per 15 minutes per address, per function instance), so
the password's length is what really protects it.

**Trying it locally:** copy `.env.example` to `.env`, set the two `ADMIN_*` values, leave
`GITHUB_TOKEN` out and run `npm run dev`. Saves then change the files on your computer instead
of committing.

Not editable in `/admin`: the menu, buttons and footer labels (`src/i18n/*.ts`), and images
(session covers, board photos, partner logos). An image added by hand is kept when its entry is
edited.

### Design

Light mode only, per PLAN.md. The visual system follows the EYP network template shared by
eype.es (Spain) and eyp.pt (Portugal), as measured in-browser (computed styles, Sep 2026):

| Token | Value | Role |
| --- | --- | --- |
| `--color-deep` | `#3A4390` | EYP indigo — headlines, buttons, links, footer |
| `--color-sky` | `#D5E5F6` | The slanted band behind every page hero (`.slant`) |
| `--color-sun` | `#FFD92F` | Stacked-button offset, active-nav stroke, `.rule-amber` |
| `--color-cream` | `#F3F7FC` | Alternating section tint |
| `--color-ink` | `#1E1F1C` | Body text |

Signature pieces: the "stacked" button (`.btn-primary`, `.btn-amber`, `.btn-on-dark`) — a
faintly skewed face over a yellow offset, both drawn as pseudo-elements; square corners
throughout; kickers (`.eyebrow`) followed by a small yellow "bling" mark. The reference
footer is cyan `#009DD8`, but white text on it is ~3:1 and fails WCAG AA, so ours stays
indigo. Legacy token names (`amber`, `teal`, `cream`) still exist as aliases so old class
names keep working.

Type is Source Sans 3 (the open successor of the Source Sans Pro the reference uses). Its
`latin-ext` subset covers `U+0100–02BA`, which includes the Azerbaijani schwa `ə` — verified
against the font's `unicode-range`, not assumed. It is self-hosted through
`@fontsource-variable/source-sans-3` (full package CSS, imported in `Base.astro`), so pages
make no third-party font requests.

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

- [ ] **The newsletter form is inert by design.** It intercepts submit and shows a notice.
      Connect it to a provider that does **double opt-in** (a plan requirement), and add the
      provider's origin to `form-action` in the CSP in `vercel.json`. There is no contact form:
      contact is mailto only (decided 2026-10-01).
- [ ] **Azerbaijani needs a native review.** The translation is complete and idiomatic, but
      EYP-specific terms (`Ümumi Yığıncaq`, `qətnamə`, `komanda qurma`) should match the
      wording the committee already uses with schools.
- [ ] **Open Graph images** — meta tags are in place, but no image is set.
- [ ] **Analytics** — none installed. The plan suggests Plausible, or GA4 with a cookie banner.
- [ ] **`site` in `astro.config.mjs`** is `https://eyp.az`; confirm before deploying, since
      canonical and hreflang URLs derive from it.

## Licence

MIT. Covers the code, not the EYP name or emblem.
