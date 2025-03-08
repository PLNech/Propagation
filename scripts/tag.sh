#!/bin/bash

# Ensure we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Error: Not on main branch. Please switch to main branch before tagging."
  exit 1
fi

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")
if [ -z "$VERSION" ]; then
  echo "Error: Could not find version in package.json"
  exit 1
fi

# Create tag
TAG="v$VERSION"

# Check if tag already exists
if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Tag already exists - pushing..."
  git push origin "$TAG"
else
  echo "Creating tag $TAG..."
  git tag "$TAG"
  git push origin "$TAG"
  echo "Successfully created and pushed tag $TAG"
fi