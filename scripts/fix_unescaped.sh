#!/bin/bash

# fix_unescaped.sh - A utility script to fix React unescaped entities errors
# 
# Usage: 
#   npm run lint | ./fix_unescaped.sh
#   xsel -ob | ./fix_unescaped.sh [options]
#
# Options:
#   --help          Display this help message
#   --apply         Automatically apply fixes (be careful!)
#   --backup        Create backup files before making changes
#   --dry-run       Just show what would be changed without making changes
#   --only-quotes   Only fix quote entities (default fixes all entity types)

# Display help if requested
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
  echo "fix_unescaped.sh - A utility script to fix React unescaped entities errors"
  echo
  echo "USAGE:"
  echo "  npm run lint | ./fix_unescaped.sh [options]"
  echo "  xsel -ob | ./fix_unescaped.sh [options]"
  echo
  echo "OPTIONS:"
  echo "  --help          Display this help message"
  echo "  --apply         Automatically apply fixes (be careful!)"
  echo "  --backup        Create backup files before making changes"
  echo "  --dry-run       Just show what would be changed without making changes"
  echo "  --only-quotes   Only fix quote entities (default fixes all entity types)"
  echo
  echo "EXAMPLES:"
  echo "  # Show sed commands to fix errors:"
  echo "  npm run lint | ./fix_unescaped.sh"
  echo
  echo "  # Automatically apply fixes with backups:"
  echo "  npm run lint | ./fix_unescaped.sh --apply --backup"
  echo
  exit 0
fi

# Process arguments
APPLY_FIXES=false
CREATE_BACKUP=false
DRY_RUN=false
ONLY_QUOTES=false

for arg in "$@"; do
  case $arg in
    --apply)
      APPLY_FIXES=true
      ;;
    --backup)
      CREATE_BACKUP=true
      ;;
    --dry-run)
      DRY_RUN=true
      ;;
    --only-quotes)
      ONLY_QUOTES=true
      ;;
  esac
done

# Read input from stdin
input=$(cat)

# Create a temp directory for processing if needed
if [[ "$APPLY_FIXES" == true && "$DRY_RUN" == false ]]; then
  TEMP_DIR=$(mktemp -d)
  trap 'rm -rf "$TEMP_DIR"' EXIT
fi

# Function to generate the sed command
generate_sed_command() {
  local filename="$1"
  local line_number="$2"
  local quote="$3"
  local replacement="$4"
  
  if [[ "$CREATE_BACKUP" == true ]]; then
    echo "sed -i.bak '${line_number}s/${quote}/${replacement}/g' ${filename}"
  else
    echo "sed -i '' '${line_number}s/${quote}/${replacement}/g' ${filename}"
  fi
}

# Process the input to extract relevant error lines
echo "$input" | grep -E "react/no-unescaped-entities" | while read -r line; do
  # Extract filename, line number, and error message using standard shell
  filename=$(echo "$line" | cut -d':' -f1)
  line_number=$(echo "$line" | cut -d':' -f2)
  error_msg=$(echo "$line" | cut -d':' -f4-)
  
  # Determine the quote character and suggested replacement
  if echo "$error_msg" | grep -q "'"; then
    quote="'"
    replacement="&apos;"
  elif echo "$error_msg" | grep -q "\""; then
    quote="\""
    replacement="&quot;"
  elif [[ "$ONLY_QUOTES" == false ]]; then
    # Handle other entity types if needed
    if echo "$error_msg" | grep -q "&"; then
      quote="&"
      replacement="&amp;"
    elif echo "$error_msg" | grep -q "<"; then
      quote="<"
      replacement="&lt;"
    elif echo "$error_msg" | grep -q ">"; then
      quote=">"
      replacement="&gt;"
    else
      # Skip if we don't recognize the entity
      continue
    fi
  else
    # Skip non-quote entities if --only-quotes is set
    continue
  fi
  
  # Generate the sed command
  sed_command=$(generate_sed_command "$filename" "$line_number" "$quote" "$replacement")
  
  if [[ "$APPLY_FIXES" == true && "$DRY_RUN" == false ]]; then
    # Actually run the command if --apply is specified
    echo "Applying fix: $sed_command"
    eval "$sed_command"
  elif [[ "$DRY_RUN" == true ]]; then
    # Show what would be changed
    echo "Would run: $sed_command"
    # Get the specific line content
    line_content=$(sed -n "${line_number}p" "$filename")
    echo "Original: $line_content"
    echo "Modified: $(echo "$line_content" | sed "s/${quote}/${replacement}/g")"
    echo
  else
    # Just output the command for manual execution
    echo "$sed_command"
  fi
done

if [[ "$APPLY_FIXES" == true && "$DRY_RUN" == false ]]; then
  echo "All fixes applied!"
  echo "You might want to run your lint command again to verify all issues are resolved."
fi
