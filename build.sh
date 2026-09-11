#!/usr/bin/env bash
set -euo pipefail
rm -rf app .output
mkdir -p app
base64 -d project.tar.gz.b64 | tar -xz -C app
cd app
npm install
npm run build
cd ..
rm -rf .output
mv app/.output .output
