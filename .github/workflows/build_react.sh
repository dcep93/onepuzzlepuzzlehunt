#!/bin/bash
set -euo pipefail

# npm create vite@latest app -- --template react-ts
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$repo_root/app"
npm ci
npm run lint
npm run build
