# Before the board starts using /admin

The content and wiring checklist is in README.md → "Before launch". This list is only what
stands between the finished app and the board.

## Needs the production setup

- [ ] Set `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `GITHUB_TOKEN` and `GITHUB_BRANCH` in Vercel
      (README → "Setup in Vercel"). `GITHUB_BRANCH` must be the production branch.
- [ ] Try it on a Vercel preview first, with `GITHUB_BRANCH` set to a throwaway branch: log in,
      save text, upload a photo, confirm the site rebuilds and shows it.
- [ ] Check the 404 page on Vercel: `/az/nope/` answers in Azerbaijani, `/nope/` in English.

## Photos and the 4.5 MB request limit

The browser shrinks photos over 3.5 MB before sending and the server re-encodes to 2000 px.
Tested locally (headless Chrome, then the dev server): a 12 MB, 4032x3024 JPEG became 1.8 MB in
the browser and was saved as a 735 KB, 2000x1500 JPEG with no metadata. A raw 12 MB file posted
without the shrink is refused with "too large (over 4 MB)". Every form has one photo input, so
one save never carries several photos.

- [ ] Repeat with a real phone photo on the Vercel preview (confirms the 4.5 MB cap itself).
- [ ] iPhone HEIC photos are not accepted (JPG, PNG, WebP only): test it, or tell the board
      (the board guide does).
- [ ] A PNG logo that is still over 4 MB after the browser shrink is refused. Unlikely.

## Content and people

- [ ] Replace the "Example:" board, partner, session and news entries and the `example.org`
      emails with real ones.
- [ ] Privacy and legal pages: real text from a lawyer (README → "Blocking").
- [ ] Decide who holds the shared password.
- [ ] Hand over `docs/board-guide.md`.

## Known, not blocking

- [ ] Two people saving the same entry with photos at the same moment can overwrite each other.
- [ ] Any GitHub 409/422 shows as "Someone else changed this".
- [ ] The admin login rate-limit map never drops addresses that do not come back.
- [ ] Open Graph image.
