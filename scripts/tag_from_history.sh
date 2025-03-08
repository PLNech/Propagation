
#!/bin/bash
# scripts/tag_from_history.sh
# Tags historical commits with version numbers based on the development log

set -e  # Exit on error

# Check if git working copy is clean
if ! git diff-index --quiet HEAD --; then
    echo "Error: Git working copy is not clean. Please commit or stash your changes first."
    exit 1
fi

echo "=== Propagation Version Tagging Tool ==="
echo "This script will tag historical commits with their version numbers."

# Hardcoded version-to-commit mappings based on the project history
declare -A VERSION_TO_COMMIT=(
    ["v0.11.3"]="4d36889"  # 2025-03-08 Documentation Enhancement
    ["v0.11.2"]="9569653"  # 2025-03-08 feat: header
    ["v0.11.1"]="57971de"  # 2025-03-08 fix: Build
    ["v0.11.0"]="a4b10d7"  # 2025-03-08 package: Align to changelog
    ["v0.10.0"]="8f87379"  # 2025-03-08 chore(package): v0.10.0, with new script tools
    ["v0.9.0"]="6c00095"  # 2025-03-07 feat: Progressive discovery
    ["v0.8.0"]="ad691bb"  # 2025-03-08 LinkUtility: MVP + Save shortcuts
    ["v0.7.0"]="9b2702e"  # 2025-03-07 refactor: Sprint cleaning! Get ready for love
    ["v0.6.0"]="1a4eff4"  # 2025-03-07 feat: Reorg tabs
    ["v0.5.0"]="3ba1454"  # 2025-03-08 tools: Readme, tag
    ["v0.4.0"]="9609b2a"  # 2025-03-08 chore: Version+changelog
    ["v0.3.0"]="070d0c2"  # 2025-03-08 feat: Founder gender
    ["v0.2.0"]="f485808"  # 2025-03-08 script: fix edge case
    ["v0.1.0"]="c98f3cb"  # 2025-03-08 fix: but maybe script
    ["v0.0.1"]="6f78836"  # 2025-03-08 fix: Solve flash tuto on save load
    ["v0.0.0"]="c9a1a20"  # 2025-03-08 chore: Readme update
)

# List existing tags to avoid conflicts
echo "Checking existing tags..."
EXISTING_TAGS=$(git tag)

# Tag each version
for VERSION in "${!VERSION_TO_COMMIT[@]}"; do
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
echo "    git tag -d <tagname>"
echo "    git push origin :refs/tags/<tagname> (to remove from remote)"

exit 0
