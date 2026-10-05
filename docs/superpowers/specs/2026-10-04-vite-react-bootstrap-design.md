# One Puzzle Puzzle Hunt bootstrap

## Approved scope

Initialize the empty repository as Vite + React + TypeScript in `app/`, following
`dcep93.github.io/mac/newapp.sh`. Keep the entrypoint thin and application code
in `app/src/app_x`. Use npm consistently and commit its lockfile.

## Appearance

Reuse FantasyFilmBall's house style: background gradient from `#1a1411` to
`#0c0907`, brown surfaces, warm tan `#c99c6b` borders and details, pink `#ff7bc3`
headings, and Comic Sans with Comic Sans MS / Chalkboard SE fallbacks.
Show the title “One Puzzle Puzzle Hunt” and a small “Coming soon” panel with
“One puzzle. A whole hunt.” The initial screen is static, responsive, and
semantic. No puzzle mechanics, answer validation, accounts, or backend are
included in this initialization. Use rem/em sizing, visible keyboard focus for
any links, and reduced-motion-safe styling.

## Structure and documentation

Use `app/src/main.tsx`, `app/src/App.tsx`, `app/src/index.css`, and
`app/src/app_x/index.tsx` plus its theme stylesheet. Remove template logos,
counter, and demo styles. Set the page title, description, and a small custom
favicon. Document install/dev/build/lint/preview commands in the root README.
Record the house style and file organization in root AGENTS.md.

## Verification and delivery

Install dependencies, run TypeScript/production build and ESLint, and inspect
the page in a browser at desktop and mobile sizes. Add CI to repeat lint and
build on pushes and pull requests. Commit and push task-owned changes to main.
Hosting is outside this approved bootstrap; no Firebase project is configured.

## Review

The specification covers the approved scaffold and styling only. All colors,
copy, file locations, checks, and delivery behavior are defined. The user
approved the design and remaining workflow checkpoints with `yesi`.
