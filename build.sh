#!/usr/bin/env bash
set -e
echo "Building project at commit $(git rev-parse --short HEAD)"
echo "Files in repo:"
ls -la
echo "Build complete."
