#!/bin/bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$repo_root"
target_sha_path="app/src/app_x/config/sha_x.json"

if [[ ! -f "$target_sha_path" ]]; then
  echo "Expected build metadata at $target_sha_path." >&2
  exit 1
fi

jq -n \
  --arg time "$(TZ='America/New_York' date)" \
  --arg git_log "$(git log -1)" \
  '{time: $time, git_log: $git_log}' > "$target_sha_path"
