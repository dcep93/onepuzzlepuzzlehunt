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

The production output is `app/dist/`. GitHub Actions records build metadata,
installs locked dependencies, runs lint, and builds on pushes to `main` and pull
requests. Successful pushes to `main` also deploy to Firebase Hosting using the
repository's `SA_KEY` secret. The workflow can be run manually on `main` as well.

## Deployment

The Firebase project is `onepuzzlepuzzlehunt` and its Hosting URL is
<https://onepuzzlepuzzlehunt.web.app>.

The usual split scripts live in `.github/workflows/`:

- `record_sha.sh`: writes the build time and latest commit to
  `app/src/app_x/config/sha_x.json`; `getShaX()` exposes it to app code.
- `build_react.sh`: installs dependencies with `npm ci`, lints, and builds.
- `deploy_to_firebase.sh`: checks the service account's project, generates
  Hosting-only configuration, and deploys `app/dist`. Credentials are passed
  through `SA_KEY` and stored in a temporary file removed when the script exits.

One-time Firebase and service-account setup commands are included as comments
in `deploy_to_firebase.sh`. The GitHub secret must contain the service account's
complete JSON key. An existing `SA_KEY` can be reused; no new key is needed if
it belongs to this project and has Firebase Hosting deployment permissions.

## Organization

- `app/src/app_x/`: page components and house theme.
- `app/src/App.tsx`: thin re-export of the application.
- `app/src/main.tsx`: React entrypoint.
- `app/src/index.css`: shared reset and base typography.
- `app/public/`: static assets, including the favicon.
- `.github/workflows/workflow.yaml`: build, lint, and Firebase deployment.

The `--tan`, `--pink`, and `--display-font` CSS variables in
`app/src/app_x/styles.css` define the reusable theme. Headings prefer Comic Sans
MS, Comic Sans, or Chalkboard SE, with
Trebuchet MS and sans-serif fallbacks for systems without those fonts.

This layout follows the [personal bootstrap script](https://github.com/dcep93/dcep93.github.io/blob/master/mac/newapp.sh)
and the palette follows [FantasyFilmBall](https://github.com/dcep93/fantasyfilmball/blob/main/app/src/app_x/styles.css).
