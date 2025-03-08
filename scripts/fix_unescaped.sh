#!/bin/bash
# fix_unescaped.sh - Fix React unescaped entities errors in TypeScript files
# 
# Usage: 
#   ./fix_unescaped.sh [options]
#
# Options:
#   --help     Show this help message
#   --apply    Apply fixes directly (instead of just printing commands)
#   --backup   Create backup files before making changes

# Show help if requested
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
  echo "fix_unescaped.sh - Fix React unescaped entities errors in TypeScript files"
  echo ""
  echo "Usage:"
  echo "  ./fix_unescaped.sh [options]"
  echo ""
  echo "Options:"
  echo "  --help     Show this help message"
  echo "  --apply    Apply fixes directly (instead of just printing commands)"
  echo "  --backup   Create backup files before making changes"
  exit 0
fi

# Process arguments
APPLY_FIXES=false
CREATE_BACKUP=false

for arg in "$@"; do
  case $arg in
    --apply)
      APPLY_FIXES=true
      ;;
    --backup)
      CREATE_BACKUP=true
      ;;
  esac
done

echo "Running npm lint to find errors..."
# Run npm lint and capture output
lint_output=$(npm run lint --silent 2>&1)

echo "Processing unescaped entity errors..."
echo ""

# Create a temporary file to process the output
temp_file=$(mktemp)
echo "$lint_output" > "$temp_file"

# Process the lint output to extract filenames and errors
current_file=""
fixes_found=false

while IFS= read -r line; do
  # Check if line contains a filename (starts with ./)
  if [[ "$line" =~ ^\./[[:alnum:]/_.-]+\.tsx? ]]; then
    current_file=$(echo "$line" | awk '{print $1}')
  elif [[ "$line" =~ "can be escaped with" ]]; then
    fixes_found=true
    # Extract line number and quote type
    line_number=$(echo "$line" | awk -F':' '{print $1}')
    
    if [[ "$line" =~ "\`'\`" ]]; then
      quote="'"
      replacement="&apos;"
    elif [[ "$line" =~ "\`\"\`" ]]; then
      quote='"'
      replacement="&quot;"
    else
      continue
    fi
    
    # Apply the fix directly using a safer approach for quotes
    if [[ "$APPLY_FIXES" == true ]]; then
      echo "Applying fix to $current_file line $line_number"
      if [[ "$CREATE_BACKUP" == true ]]; then
        # For single quote
        if [[ "$quote" == "'" ]]; then
          sed -i.bak "${line_number}s/'/\&apos;/g" "${current_file}"
        # For double quote
        else
          sed -i.bak "${line_number}s/\"/\&quot;/g" "${current_file}"
        fi
      else
        # For macOS compatibility
        if [[ "$OSTYPE" == "darwin"* ]]; then
          # For single quote
          if [[ "$quote" == "'" ]]; then
            sed -i "" "${line_number}s/'/\&apos;/g" "${current_file}"
          # For double quote
          else
            sed -i "" "${line_number}s/\"/\&quot;/g" "${current_file}"
          fi
        else
          # For single quote
          if [[ "$quote" == "'" ]]; then
            sed -i "${line_number}s/'/\&apos;/g" "${current_file}"
          # For double quote
          else
            sed -i "${line_number}s/\"/\&quot;/g" "${current_file}"
          fi
        fi
      fi
    else
      # Print the command in a way that's directly executable
      if [[ "$CREATE_BACKUP" == true ]]; then
        if [[ "$quote" == "'" ]]; then
          echo "sed -i.bak \"${line_number}s/'/\&apos;/g\" \"${current_file}\""
        else
          echo "sed -i.bak \"${line_number}s/\\\"/\&quot;/g\" \"${current_file}\""
        fi
      else
        if [[ "$OSTYPE" == "darwin"* ]]; then
          if [[ "$quote" == "'" ]]; then
            echo "sed -i \"\" \"${line_number}s/'/\&apos;/g\" \"${current_file}\""
          else
            echo "sed -i \"\" \"${line_number}s/\\\"/\&quot;/g\" \"${current_file}\""
          fi
        else
          if [[ "$quote" == "'" ]]; then
            echo "sed -i \"${line_number}s/'/\&apos;/g\" \"${current_file}\""
          else
            echo "sed -i \"${line_number}s/\\\"/\&quot;/g\" \"${current_file}\""
          fi
        fi
      fi
    fi
  fi
done < "$temp_file"

# Clean up
rm "$temp_file"

if [[ "$fixes_found" == false ]]; then
  echo "No unescaped entity errors found!"
elif [[ "$APPLY_FIXES" == true ]]; then
  echo ""
  echo "All fixes applied! Run npm lint again to verify all issues are resolved."
fi