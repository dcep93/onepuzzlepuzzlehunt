# One Puzzle Puzzle Hunt

A Vite + React + TypeScript starter for One Puzzle Puzzle Hunt, wearing the
familiar dark brown, pink, and Comic Sans house style. The initial screen is a
static “coming soon” page, ready for puzzle content.

## Development

Use Node.js 22.13+ (or a compatible newer release) and npm.

```sh
cd app
npm ci
npm run dev
```

Open the local URL printed by Vite. All commands below run inside `app/`:

```sh
npm run lint     # ESLint
npm run build    # TypeScript check and production build
npm run preview  # Preview the production build locally
```

The production output is `app/dist/`. GitHub Actions runs lint and build for
pushes to `main` and pull requests. Hosting is not configured yet.

## Organization

- `app/src/app_x/`: page components and house theme.
- `app/src/App.tsx`: thin re-export of the application.
- `app/src/main.tsx`: React entrypoint.
- `app/src/index.css`: shared reset and base typography.
- `app/public/`: static assets, including the favicon.
- `.github/workflows/ci.yml`: build and lint checks.

The `--tan`, `--pink`, and `--display-font` CSS variables in
`app/src/app_x/styles.css` define the reusable theme. Headings prefer Comic Sans
MS, Comic Sans, or Chalkboard SE, with
Trebuchet MS and sans-serif fallbacks for systems without those fonts.

This layout follows the [personal bootstrap script](https://github.com/dcep93/dcep93.github.io/blob/master/mac/newapp.sh)
and the palette follows [FantasyFilmBall](https://github.com/dcep93/fantasyfilmball/blob/main/app/src/app_x/styles.css).
