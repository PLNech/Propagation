#!/bin/bash
# scripts/tag_from_history.sh
# Tags historical commits with version numbers based on the development log

set -e  # Exit on error

# Function to scan the repository for existing tags and their commit hashes
scan_existing_tags() {
    echo "Scanning for existing tags..."
    
    # Get all existing tags and their commit hashes
    local existing_tags=$(git tag -l)
    local total_tags=$(echo "$existing_tags" | wc -l)
    
    if [ "$total_tags" -gt 0 ]; then
        echo "Found $total_tags existing tags in the repository."
        echo "Existing tags:"
        for tag in $existing_tags; do
            local commit=$(git rev-list -n 1 "$tag")
            local short_commit=$(git rev-parse --short "$commit")
            echo "  $tag -> $short_commit"
        done
        echo ""
    else
        echo "No existing tags found in the repository."
        echo ""
    fi
}

# Function to show recent commit history for reference
show_commit_history() {
    echo "Showing recent commit history for reference:"
    git log --oneline --max-count=15
    echo ""
    echo "To see more history, use: git log --oneline"
    echo ""
}

# Check if git working copy is clean
if ! git diff-index --quiet HEAD --; then
    echo "Error: Git working copy is not clean. Please commit or stash your changes first."
    exit 1
fi

echo "=== Propagation Version Tagging Tool ==="
echo "This script will tag historical commits with their version numbers."

# First scan for existing tags
scan_existing_tags

# Display recent commit history
show_commit_history

# Hardcoded version-to-commit mappings based on the project history
declare -A VERSION_TO_COMMIT=(
    ["v0.11.3"]="f98279d"  # 2025-03-08 feat: Invitation, history tag script
    ["v0.11.2"]="4d36889"  # 2025-03-08 chore: README minor
    ["v0.11.1"]="9569653"  # 2025-03-08 feat: header
    ["v0.11.0"]="9609b2a"  # 2025-03-08 chore: Version+changelog
    ["v0.10.0"]="070d0c2"  # 2025-03-08 feat: Founder gender
    ["v0.9.0"]="8f87379"  # 2025-03-08 chore(package): v0.10.0, with new script tools
    ["v0.8.0"]="f4be3bb"  # 2025-03-08 feat: Reset achievements
    ["v0.7.0"]="57971de"  # 2025-03-08 fix: Build
    ["v0.6.0"]="f485808"  # 2025-03-08 script: fix edge case
    ["v0.5.0"]="c98f3cb"  # 2025-03-08 fix: but maybe script
    ["v0.4.0"]="6f78836"  # 2025-03-08 fix: Solve flash tuto on save load
    ["v0.3.0"]="ad691bb"  # 2025-03-08 LinkUtility: MVP + Save shortcuts,warning loads
    ["v0.2.0"]="6c00095"  # 2025-03-07 feat: Progressive discovery
    ["v0.1.0"]="9b2702e"  # 2025-03-07 refactor: Sprint cleaning! Get ready for love
    ["v0.0.9"]="1a4eff4"  # 2025-03-07 feat: Reorg tabs
    ["v0.0.8"]="e6dc5ac"  # 2025-03-07 feat: Header
    ["v0.0.7"]="a4f9a33"  # 2025-03-07 feat: Welcome + Perso
    ["v0.0.6"]="8538260"  # 2025-03-07 fix: Various, from about to types
    ["v0.0.5"]="5319a58"  # 2025-03-06 feat: Achievements manager
    ["v0.0.4"]="5cd7dc5"  # 2025-03-06 Credits: MVP
    ["v0.0.3"]="56822e5"  # 2025-03-06 feat: GameButton iteration, shortcuts
    ["v0.0.2"]="cd7e118"  # 2025-03-05 feat: Achievements+fixes
    ["v0.0.1"]="ce26a4f"  # 2025-03-04 feat: Scenarios
    ["v0.0.0"]="34ea197"  # 2025-03-04 feat: About and debugHelper
)

# Tag each version
echo "Processing version tags..."
EXISTING_TAGS=$(git tag)

# Sort versions for consistent output
SORTED_VERSIONS=($(echo "${!VERSION_TO_COMMIT[@]}" | tr ' ' '\n' | sort -V))

for VERSION in "${SORTED_VERSIONS[@]}"; do
    COMMIT="${VERSION_TO_COMMIT[$VERSION]}"
    
    # Check if tag already exists
    if echo "$EXISTING_TAGS" | grep -q "^$VERSION$"; then
        echo "⚠️ Tag $VERSION already exists. Skipping."
        continue
    fi
    
    echo "🏷️ Tagging $VERSION at commit $COMMIT"
    
    # Verify commit exists
    if ! git cat-file -e "$COMMIT^{commit}" 2>/dev/null; then
        echo "❌ Error: Commit $COMMIT doesn't exist. Please check the VERSION_TO_COMMIT map."
        continue
    fi
    
    # Create tag
    git tag -a "$VERSION" "$COMMIT" -m "Version $VERSION"
    echo "✅ Created tag $VERSION at commit $COMMIT"
done

# Show git log with new tags for validation
echo ""
echo "==== Git Log with New Tags ===="
echo "Showing recent commits with tags to validate:"
git log --oneline --decorate -20

echo ""
echo "Is this tagging correct? Review the log above."
echo "Tags created. Do you want to push them to the remote repository? (y/n)"
read -r PUSH_CONFIRM

if [[ "$PUSH_CONFIRM" =~ ^[Yy]$ ]]; then
    echo "Pushing tags to remote..."
    git push --tags
    echo "✅ Tags pushed successfully!"
else
    echo "Tags created but not pushed. Use 'git push --tags' when ready."
    echo "To remove incorrect tags, use:"
    echo "    git tag -d <tagname>              # Remove locally"
    echo "    git push origin :refs/tags/<tagname>  # Remove from remote"
fi

echo ""
echo "💡 Note: If any mappings are incorrect, you can remove a tag with:"
echo "    git tag -d <tagname>                  # Remove locally"
echo "    git push origin :refs/tags/<tagname>  # Remove from remote"
echo ""
echo "💡 To create a release from a tag, use:"
echo "    ./scripts/create_release_from_changelog.sh <tagname>"
echo "        or"
echo "    git push origin <tagname>  # If you've configured the auto-release GitHub Action"

exit 0