#!/bin/bash
# scripts/changelog_to_releases.sh
# Creates GitHub releases from CHANGELOG.md entries

set -e  # Exit on error

# Configuration from environment variables with fallbacks
REPO_OWNER="${REPO_OWNER:-$(git config --get remote.origin.url | sed -n 's/.*github.com[:\/]\([^\/]*\)\/\([^\/]*\).*/\1/p')}"
REPO_NAME="${REPO_NAME:-$(git config --get remote.origin.url | sed -n 's/.*github.com[:\/]\([^\/]*\)\/\([^\/]*\).*/\2/p' | sed 's/\.git$//')}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
CHANGELOG_FILE="CHANGELOG.md"

echo "=== Propagation Changelog to GitHub Releases ==="
echo "This script creates GitHub releases from your CHANGELOG.md entries."
echo "Repository: $REPO_OWNER/$REPO_NAME"
echo ""

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

# Extract versions and content from CHANGELOG.md
extract_releases() {
    local changelog_content=$(<"$CHANGELOG_FILE")
    local current_version=""
    local current_content=""
    local in_version_block=false
    local releases=()
    
    # Read each line of the changelog
    while IFS= read -r line; do
        # Match version headers (Sprint X: Title (vX.Y.Z))
        if [[ "$line" =~ ^##[[:space:]]([^(]*)\(v([0-9]+\.[0-9]+\.[0-9]+)\) ]]; then
            # If we were processing a version, save it before moving to the next
            if [[ -n "$current_version" && -n "$current_content" ]]; then
                releases+=("$current_version|$current_content")
            fi
            
            # Extract title and version
            local title="${BASH_REMATCH[1]}"
            current_version="${BASH_REMATCH[2]}"
            current_content="# ${title}\n\n"
            in_version_block=true
            
        # If we're in a version block, add the line to current content
        elif [[ "$in_version_block" == true ]]; then
            # Check if this is the start of a new version block
            if [[ "$line" =~ ^##[[:space:]] && ! "$line" =~ ^###[[:space:]] ]]; then
                # Save current version before moving to next
                if [[ -n "$current_version" && -n "$current_content" ]]; then
                    releases+=("$current_version|$current_content")
                }
                in_version_block=false
                current_version=""
                current_content=""
            else
                # Add the line to current content
                current_content+="$line\n"
            fi
        fi
    done < <(echo "$changelog_content")
    
    # Don't forget the last version
    if [[ -n "$current_version" && -n "$current_content" ]]; then
        releases+=("$current_version|$current_content")
    fi
    
    # Return the releases array
    for release in "${releases[@]}"; do
        echo "$release"
    done
}

# Get list of releases from changelog
echo "📝 Parsing $CHANGELOG_FILE for versions and release notes..."
readarray -t RELEASES < <(extract_releases)

# Check if we found any releases
if [ ${#RELEASES[@]} -eq 0 ]; then
    echo "❌ No releases found in $CHANGELOG_FILE. Check the file format."
    exit 1
fi

echo "Found ${#RELEASES[@]} releases in changelog."
echo ""

# Display the releases we're going to create
echo "Preview of releases to create:"
for release in "${RELEASES[@]}"; do
    version=$(echo "$release" | cut -d'|' -f1)
    echo "- v$version"
done

echo ""
echo "Do you want to create these GitHub releases? (y/n)"
read -r CREATE_CONFIRM

if [[ ! "$CREATE_CONFIRM" =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    exit 0
fi

# Create releases on GitHub
echo "🚀 Creating GitHub releases..."
for release in "${RELEASES[@]}"; do
    # Split the release data
    version=$(echo "$release" | cut -d'|' -f1)
    content=$(echo "$release" | cut -d'|' -f2-)
    
    tag="v$version"
    
    echo "Creating release for $tag..."
    
    # Check if the tag exists
    if ! git show-ref --tags "$tag" --quiet; then
        echo "⚠️ Tag $tag doesn't exist in the local repository."
        echo "    Skipping this release. Use tag_from_history.sh first."
        continue
    fi
    
    # Check if release already exists on GitHub
    release_exists=false
    release_info=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                      "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/tags/$tag")
    
    if [[ "$release_info" != *"Not Found"* && "$release_info" != *"documentation_url"* ]]; then
        echo "⚠️ Release for $tag already exists on GitHub."
        echo "Do you want to update it? (y/n)"
        read -r UPDATE_CONFIRM
        
        if [[ "$UPDATE_CONFIRM" =~ ^[Yy]$ ]]; then
            release_id=$(echo "$release_info" | grep -o '"id": [0-9]*' | head -1 | cut -d' ' -f2)
            echo "Updating release $tag (ID: $release_id)..."
            
            # Create a temporary file for the release notes
            release_notes_file=$(mktemp)
            echo -e "$content" > "$release_notes_file"
            
            # Update the release using the GitHub API
            if curl -s -X PATCH \
                 -H "Authorization: token $GITHUB_TOKEN" \
                 -H "Accept: application/vnd.github+json" \
                 -H "Content-Type: application/json" \
                 "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$release_id" \
                 -d @- << EOF
{
  "tag_name": "$tag",
  "name": "$(echo "$content" | head -n 1)",
  "body": $(jq -Rs . <"$release_notes_file")
}
EOF
            then
                echo "✅ Updated release for $tag successfully!"
            else
                echo "❌ Failed to update release for $tag."
            fi
            
            # Clean up
            rm "$release_notes_file"
            continue
        else
            echo "Skipping update for $tag"
            continue
        fi
    fi
    
    # Create a temporary file for the release notes
    release_notes_file=$(mktemp)
    echo -e "$content" > "$release_notes_file"
    
    # Create the release using the GitHub API
    if curl -s -X POST \
         -H "Authorization: token $GITHUB_TOKEN" \
         -H "Accept: application/vnd.github+json" \
         -H "Content-Type: application/json" \
         "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases" \
         -d @- << EOF
{
  "tag_name": "$tag",
  "name": "$(echo "$content" | head -n 1)",
  "body": $(jq -Rs . <"$release_notes_file"),
  "draft": false,
  "prerelease": false
}
EOF
    then
        echo "✅ Created release for $tag successfully!"
    else
        echo "❌ Failed to create release for $tag."
    fi
    
    # Clean up
    rm "$release_notes_file"
done

echo ""
echo "✨ Process completed! Check your GitHub releases page:"
echo "    https://github.com/$REPO_OWNER/$REPO_NAME/releases"
echo ""
echo "To run this script in a CI/CD pipeline, make sure to set these environment variables:"
echo "    GITHUB_TOKEN - Your GitHub personal access token with 'repo' scope"
echo "    REPO_OWNER   - GitHub username or organization (optional if running in a git repo)"
echo "    REPO_NAME    - Repository name (optional if running in a git repo)"

exit 0