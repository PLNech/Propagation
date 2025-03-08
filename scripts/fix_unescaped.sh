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
#   --verbose  Show detailed information about what's being processed

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
  echo "  --verbose  Show detailed information about what's being processed"
  echo ""
  echo "Note: This script only replaces quotes within JSX text content, not in props or JavaScript."
  exit 0
fi

# Process arguments
APPLY_FIXES=false
CREATE_BACKUP=false
VERBOSE=false

for arg in "$@"; do
  case $arg in
    --apply)
      APPLY_FIXES=true
      ;;
    --backup)
      CREATE_BACKUP=true
      ;;
    --verbose)
      VERBOSE=true
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
    if [[ "$VERBOSE" == true ]]; then
      echo "Processing file: $current_file"
    fi
  elif [[ "$line" =~ "can be escaped with" ]]; then
    fixes_found=true
    
    # Extract line number, column number, and error details
    line_parts=($(echo "$line" | awk -F':' '{print $1, $2}'))
    line_number=${line_parts[0]}
    column=${line_parts[1]}
    
    if [[ "$VERBOSE" == true ]]; then
      echo "Found error at line $line_number, column $column"
    fi
    
    # Determine quote type from error message
    if [[ "$line" =~ "\`'\`" ]]; then
      quote="'"
      replacement="&apos;"
    elif [[ "$line" =~ "\`\"\`" ]]; then
      quote='"'
      replacement="&quot;"
    else
      continue
    fi
    
    # Instead of replacing all quotes in the line, we'll create a more targeted fix
    # Extract the actual line content from the file
    line_content=$(sed -n "${line_number}p" "$current_file")
    
    if [[ "$VERBOSE" == true ]]; then
      echo "Original line: $line_content"
    fi
    
    # Create a temporary file for the line-by-line processing
    if [[ "$APPLY_FIXES" == true ]]; then
      # Only do a targeted replacement at the specified position
      # First, let's analyze the line and context
      
      # Check if the line contains JSX content by looking for tags or text
      if [[ "$line_content" =~ ">.*<" || "$line_content" =~ ">" || "$line_content" =~ "<" ]]; then
        if [[ "$VERBOSE" == true ]]; then
          echo "Line contains JSX content, creating targeted fix"
        fi
        
        # Use awk to create a modification that only changes quotes in JSX content, not in props
        temp_line_file=$(mktemp)
        
        # Write the current line to a temp file
        echo "$line_content" > "$temp_line_file"
        
        # Fetch a few characters around the problematic position to determine context
        # This helps ensure we're only replacing quotes in JSX text content
        
        # Apply the targeted fix
        if [[ "$CREATE_BACKUP" == true ]]; then
          cp "$current_file" "${current_file}.bak"
        fi
        
        # Extract the part of the line with the error
        error_context="${line_content:$column-10:20}"
        if [[ "$VERBOSE" == true ]]; then
          echo "Error context: $error_context"
        fi
        
        # Check if we're in a style prop by looking for patterns like style={{ or style={
        if [[ "$error_context" =~ "style=" || "$error_context" =~ "props=" || "$error_context" =~ "={" ]]; then
          echo "Skipping line $line_number in $current_file - looks like a prop, not JSX text"
          continue
        fi
        
        # Replace the quote at the specific position (+/- a char to account for potential counting differences)
        start_pos=$((column - 2))
        if [[ $start_pos -lt 0 ]]; then
          start_pos=0
        fi
        
        end_pos=$((column + 2))
        line_length=${#line_content}
        if [[ $end_pos -gt $line_length ]]; then
          end_pos=$line_length
        fi
        
        # Create a sed command that only replaces the quote at the exact position
        # by splitting the line into parts
        prefix="${line_content:0:$column-1}"
        suffix="${line_content:$column}"
        
        # Reconstruct the line with the replacement
        fixed_line="$prefix$replacement$suffix"
        
        if [[ "$VERBOSE" == true ]]; then
          echo "Fixed line: $fixed_line"
        fi
        
        # Write the fixed line back to the file
        # Use a temp file approach to avoid sed in-place issues
        temp_file_for_replacement=$(mktemp)
        sed "${line_number}s/.*/$fixed_line/" "$current_file" > "$temp_file_for_replacement"
        mv "$temp_file_for_replacement" "$current_file"
        
        echo "Fixed line $line_number in $current_file"
      else
        echo "Skipping line $line_number in $current_file - not JSX content"
      fi
    else
      # Just print the potential fix
      echo "Would fix line $line_number in $current_file:"
      echo "  Original: $line_content"
      echo "  Column: $column (contains $quote, should be $replacement)"
      echo ""
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
  echo "Note: Some fixes may have been skipped to avoid modifying JavaScript props."
fi

echo ""
echo "IMPORTANT: This script attempts to only fix quotes in JSX text content."
echo "Please review any changes manually to ensure they're correct."
echo "JavaScript object literals and style props should not be modified."