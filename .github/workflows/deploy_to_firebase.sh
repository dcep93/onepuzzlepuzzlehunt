#!/bin/bash
set -euo pipefail

# One-time setup, if the Firebase project/service account does not exist yet:
# export GOOGLE_CLOUD_PROJECT=onepuzzlepuzzlehunt
# gcloud services enable firebase.googleapis.com --project="$GOOGLE_CLOUD_PROJECT"
# firebase projects:addfirebase "$GOOGLE_CLOUD_PROJECT"
# gcloud iam service-accounts create deployer-github --project="$GOOGLE_CLOUD_PROJECT"
# gcloud projects add-iam-policy-binding "$GOOGLE_CLOUD_PROJECT" \
#   --member="serviceAccount:deployer-github@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com" \
#   --role="roles/firebasehosting.admin"
# gcloud iam service-accounts keys create gac.json \
#   --iam-account="deployer-github@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com" \
#   --project="$GOOGLE_CLOUD_PROJECT"
# gh secret set SA_KEY --repo dcep93/onepuzzlepuzzlehunt < gac.json
# Hosting config is generated below; interactive `firebase init` is unnecessary.

SA_KEY="${SA_KEY:-${1:-}}"
if [[ -z "$SA_KEY" ]]; then
  echo "Expected service account JSON in SA_KEY or as arg 1." >&2
  exit 1
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$repo_root/app"

project_id="$(printf '%s' "$SA_KEY" | jq -er '.project_id')"
if [[ "$project_id" != "onepuzzlepuzzlehunt" ]]; then
  echo "Expected an SA_KEY for project onepuzzlepuzzlehunt." >&2
  exit 1
fi
if [[ ! -f dist/index.html ]]; then
  echo "Build the app before deploying: bash .github/workflows/build_react.sh" >&2
  exit 1
fi

credential_file="$(mktemp "${TMPDIR:-/tmp}/onepuzzlepuzzlehunt-gac.XXXXXX")"
trap 'rm -f "$credential_file"' EXIT
printf '%s' "$SA_KEY" > "$credential_file"
unset SA_KEY
export GOOGLE_APPLICATION_CREDENTIALS="$credential_file"

cat > firebase.json <<'EOF'
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{"source": "**", "destination": "/index.html"}]
  }
}
EOF

jq -n --arg project "$project_id" '{projects: {default: $project}}' > .firebaserc
npx --yes firebase-tools@15.32.1 deploy --only hosting --project "$project_id" --non-interactive
