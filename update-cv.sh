#!/usr/bin/env bash
# Sync CV.pdf on the website with the CV project (~/CV by default).
#
# Usage: ./update-cv.sh [--push]
#   Rebuilds the CV if its sources changed, copies cv.pdf here as CV.pdf and
#   commits it if it differs. With --push, also pushes the site to origin.
#   Set CV_DIR to point at a different CV project.
set -euo pipefail

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CV_DIR="${CV_DIR:-$HOME/CV}"
SRC="$CV_DIR/cv.pdf"
DEST="$SITE_DIR/CV.pdf"

push=false
case "${1:-}" in
  --push) push=true ;;
  "") ;;
  *) echo "Usage: $0 [--push]" >&2; exit 2 ;;
esac

if ! make -C "$CV_DIR" >/dev/null; then
  echo "CV build failed, see $CV_DIR/cv.log" >&2
  exit 1
fi

if cmp -s "$SRC" "$DEST"; then
  echo "CV.pdf is already up to date."
else
  cp "$SRC" "$DEST"
  git -C "$SITE_DIR" commit -m "Update CV" -- CV.pdf
  echo "CV.pdf updated and committed."
fi

if $push; then
  git -C "$SITE_DIR" push
fi
