#!/bin/bash
# scripts/create_release_from_changelog.sh
# Creates a GitHub release for a specific tag using content from CHANGELOG.md

set -e  # Exit on error

# Configuration from environment variables with fallbacks
TAG_NAME="${1:-}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
CHANGELOG_FILE="CHANGELOG.md"

echo "=== Propagation Release Creator ==="
echo "This script creates a GitHub release for a specific tag using CHANGELOG.md content."
echo ""

# Check arguments
if [ -z "$TAG_NAME" ]; then
    echo "❌ Usage: $0 <tag_name>"
    echo "Example: $0 v0.1.0"
    exit 1
fi

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN environment variable is not set."
    echo "Please set it before running this script:"
    echo "    export GITHUB_TOKEN=your_github_token"
    exit 1
fi

# Check if CHANGELOG.md exists
if [ ! -f "$CHANGELOG_FILE" ]; then
    echo "❌ $CHANGELOG_FILE not found. Make sure you're in the right directory."
    exit 1
fi

# Get repository info from git
REPO_FULL_NAME=$(git config --get remote.origin.url | sed -n 's/.*github.com[:\/]\([^\/]*\/[^\/]*\).*/\1/p' | sed 's/\.git$//')
if [ -z "$REPO_FULL_NAME" ]; then
    echo "❌ Could not determine repository from git config."
    echo "Please run this from a git repository connected to GitHub."
    exit 1
fi

REPO_OWNER=$(echo "$REPO_FULL_NAME" | cut -d/ -f1)
REPO_NAME=$(echo "$REPO_FULL_NAME" | cut -d/ -f2)

echo "Repository: $REPO_OWNER/$REPO_NAME"
echo "Tag: $TAG_NAME"
echo ""

# Check if the tag exists
if ! git show-ref --tags "$TAG_NAME" --quiet; then
    echo "❌ Tag $TAG_NAME doesn't exist in the local repository."
    echo "Please create the tag first or use tag_from_history.sh."
    exit 1
fi

# Check if release already exists
release_exists=false
release_info=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/tags/$TAG_NAME")

if [[ "$release_info" != *"Not Found"* && "$release_info" != *"documentation_url"* ]]; then
    echo "⚠️ Release for $TAG_NAME already exists on GitHub."
    echo "Do you want to update it? (y/n)"
    read -r UPDATE_CONFIRM
    
    if [[ ! "$UPDATE_CONFIRM" =~ ^[Yy]$ ]]; then
        echo "Operation cancelled."
        exit 0
    fi
    
    release_exists=true
    release_id=$(echo "$release_info" | grep -o '"id": [0-9]*' | head -1 | cut -d' ' -f2)
fi

# Extract version number without 'v' prefix for grep
VERSION_NUM=$(echo "$TAG_NAME" | sed 's/^v//')

# Find section for this version in CHANGELOG
echo "📝 Extracting release notes for version $VERSION_NUM from $CHANGELOG_FILE..."

# Store the start line of the current version's section
START_LINE=$(grep -n "## Sprint.*($TAG_NAME)" "$CHANGELOG_FILE" | head -n 1 | cut -d: -f1)

if [ -z "$START_LINE" ]; then
    echo "❌ Could not find section for $TAG_NAME in $CHANGELOG_FILE"
    echo "Make sure the version appears in the format: ## Sprint X: Title ($TAG_NAME)"
    exit 1
fi

# Find the next version section or end of file
NEXT_LINE=$(grep -n "^## Sprint" "$CHANGELOG_FILE" | awk -v start="$START_LINE" '$1 > start {print $1; exit}')

# If there is no next section, use the end of file
if [ -z "$NEXT_LINE" ]; then
    NEXT_LINE=$(wc -l < "$CHANGELOG_FILE")
else
    # Subtract 1 to exclude the next version header
    NEXT_LINE=$((NEXT_LINE - 1))
fi

# Extract the relevant section
RELEASE_NOTES=$(sed -n "${START_LINE},${NEXT_LINE}p" "$CHANGELOG_FILE")

# Extract the release title from the first line
RELEASE_TITLE=$(echo "$RELEASE_NOTES" | head -n 1 | sed 's/^## //')

# Create a temporary file for the release notes
release_notes_file=$(mktemp)
echo "$RELEASE_NOTES" > "$release_notes_file"

echo "📋 Release notes preview:"
echo "-------------------------"
echo "$RELEASE_NOTES" | head -n 10
if [ $(echo "$RELEASE_NOTES" | wc -l) -gt 10 ]; then
    echo "... ($(( $(echo "$RELEASE_NOTES" | wc -l) - 10 )) more lines)"
fi
echo "-------------------------"

echo ""
echo "Proceed with creating/updating the release? (y/n)"
read -r PROCEED_CONFIRM

if [[ ! "$PROCEED_CONFIRM" =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    rm "$release_notes_file"
    exit 0
fi

if [ "$release_exists" = true ]; then
    # Update the release using the GitHub API
    echo "🔄 Updating release for $TAG_NAME..."
    if curl -s -X PATCH \
         -H "Authorization: token $GITHUB_TOKEN" \
         -H "Accept: application/vnd.github+json" \
         -H "Content-Type: application/json" \
         "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$release_id" \
         -d @- << EOF
{
  "tag_name": "$TAG_NAME",
  "name": "$RELEASE_TITLE",
  "body": $(jq -Rs . <"$release_notes_file")
}
EOF
    then
        echo "✅ Updated release for $TAG_NAME successfully!"
    else
        echo "❌ Failed to update release for $TAG_NAME."
    fi
else
    # Create the release using the GitHub API
    echo "🚀 Creating release for $TAG_NAME..."
    if curl -s -X POST \
         -H "Authorization: token $GITHUB_TOKEN" \
         -H "Accept: application/vnd.github+json" \
         -H "Content-Type: application/json" \
         "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases" \
         -d @- << EOF
{
  "tag_name": "$TAG_NAME",
  "name": "$RELEASE_TITLE",
  "body": $(jq -Rs . <"$release_notes_file"),
  "draft": false,
  "prerelease": false
}
EOF
    then
        echo "✅ Created release for $TAG_NAME successfully!"
    else
        echo "❌ Failed to create release for $TAG_NAME."
    fi
fi

# Clean up
rm "$release_notes_file"

echo ""
echo "✨ Done! Check your GitHub releases page:"
echo "    https://github.com/$REPO_OWNER/$REPO_NAME/releases"

exit 0