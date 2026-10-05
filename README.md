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

The production output is `app/dist/`. The GitHub workflow comes directly from
`dcep93.github.io/mac/newapp.sh`: pushes to `main` record build metadata, build
the app, and deploy to Firebase using the repository's `SA_KEY` secret.

## Deployment

The Firebase project is `onepuzzlepuzzlehunt` and its Hosting URL is
<https://onepuzzlepuzzlehunt.web.app>.

The bootstrap's scripts live in `.github/workflows/`:

- `record_sha.sh`: writes the build time and latest commit to
  `app/src/app_x/config/sha_x.json`; `getShaX()` exposes it to app code.
- `build_react.sh`: runs `npm install`, `yarn build`, then removes `node_modules`.
- `deploy_to_firebase.sh`: takes the service-account JSON as argument 1, writes
  `app/gac.json`, installs Firebase CLI, authenticates with gcloud, generates
  Hosting configuration, and deploys to the project named in the key.

The one-time setup instructions printed by `newapp.sh` are preserved as comments
at the top of `deploy_to_firebase.sh`, just like the other app repos. Set
`GOOGLE_CLOUD_PROJECT=onepuzzlepuzzlehunt` in the shell for the intended project,
then copy the needed setup commands without their leading `#`. Running the
whole file performs deployment; it does not execute the commented setup steps.
Paste the complete generated `gac.json` into the repository's `SA_KEY` Actions
secret. The setup block includes the original billing-unlink and Hosting-init
commands.

## Organization

- `app/src/app_x/`: page components and house theme.
- `app/src/App.tsx`: thin re-export of the application.
- `app/src/main.tsx`: React entrypoint.
- `app/src/index.css`: shared reset and base typography.
- `app/public/`: static assets, including the favicon.
- `.github/workflows/workflow.yaml`: the bootstrap's build and deploy workflow.

The `--tan`, `--pink`, and `--display-font` CSS variables in
`app/src/app_x/styles.css` define the reusable theme. Headings prefer Comic Sans
MS, Comic Sans, or Chalkboard SE, with
Trebuchet MS and sans-serif fallbacks for systems without those fonts.

This layout follows the [personal bootstrap script](https://github.com/dcep93/dcep93.github.io/blob/master/mac/newapp.sh)
and the palette follows [FantasyFilmBall](https://github.com/dcep93/fantasyfilmball/blob/main/app/src/app_x/styles.css).
