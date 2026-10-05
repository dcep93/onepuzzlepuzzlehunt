# Repository guidance

- Follow `~/repos/dcep93.github.io/mac/codex/AGENTS.md` when available.
- Keep application components and behavior in `app/src/app_x` and static assets
  in `app/public`. Keep `main.tsx` and `App.tsx` thin.
- Configuration, shared resets, docs, and CI may be updated when required by
  the task; avoid unrelated changes.
- Preserve the FantasyFilmBall-like house style: dark/night brown backgrounds,
  warm brown panels, tan borders, pink `#ff7bc3` accents, and playful Comic Sans
  / Chalkboard display typography. Use the existing theme variables.
- Prefer `rem` for layout and `em` for local sizing relative to text. Keep the
  UI responsive, semantic, and accessible, with visible focus for controls.
- Keep components focused and files reasonably small. Add dependencies only
  when they serve the requested scope.
- Use npm and commit `app/package-lock.json` with dependency changes.
- Run `npm run lint` and `npm run build` inside `app/` before delivery. Inspect
  visual changes at desktop and mobile sizes.
- Do not introduce puzzle mechanics, accounts, persistence, or hosting setup
  unless requested.
