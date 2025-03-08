#!/bin/bash

# Set up directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
IDEAS_DIR="$ROOT_DIR/build/ideas"
DATE=$(date +%Y-%m-%d)

# Find the most recent ideas file
LATEST_IDEAS=$(ls -t "$IDEAS_DIR"/*.txt 2>/dev/null | head -1)

if [ -z "$LATEST_IDEAS" ]; then
  echo "No idea files found in $IDEAS_DIR. Run ideate.sh first."
  exit 1
fi

# Extract the date from the ideas filename for reference
IDEAS_DATE=$(basename "$LATEST_IDEAS" .txt)

# Get file structure
FILE_STRUCTURE=$(find src -type f | sort)

# Generate the prompts for Claude

echo "==== PUBLIC POST PROMPT ===="
echo "Copy this prompt for the public post:"
echo "-----------------------------"

cat << EOF
You are the voice of the Collective Propagation, creators of an incremental game about information manipulation across history. Your task is to craft a PUBLIC Patreon post based on the following ideas document:

$(cat "$LATEST_IDEAS")

Here is our current file structure for context (you don't need to reference it directly):
$FILE_STRUCTURE

# IMPORTANT INSTRUCTIONS FOR PUBLIC POST:
1. Create a medium-length post (3-minute read) focusing primarily on the lore and educational aspects
2. Use minimal markdown formatting (only # for headers and \`\`\` for code blocks)
3. Structure:
   - Start with an enigmatic greeting that references information control
   - Include ONE major gameplay concept from the ideas (focusing on player experience, not implementation)
   - Hint at the educational value without being didactic
   - Weave in references to historical manipulation techniques
   - End with a provocative quote that encourages readers to join the Collective Propagation
4. Tone should be mysteriously enticing - like you're inviting them into a secret society that understands how manipulation works
5. Do NOT reveal technical details or implementation specifics
6. Include EXACTLY ONE tantalizing hint about upcoming content that only paying members will see
7. The post should be conversational and engaging, not formal or academic
8. VERY IMPORTANT FOR ATTRACTING PATRONS:
   - Create a distinct "locked content" feeling - make readers aware they're only seeing part of the story
   - Include a teaser for a specific exclusive benefit or insight that full members receive
   - Either include a simple poll question to engage potential patrons OR mention a behind-the-scenes element they'll get access to
   - Make it clear this is part of a series of regular updates (create FOMO - fear of missing out)
9. Maximum length: 500 words

The post should leave readers intrigued enough to want more, while still providing value on its own.

End with a quote that pushes readers to convert to even the Mini Initié tier of our Patreon. Make this quote cryptic and compelling.
EOF

echo "-----------------------------"
echo ""
echo "==== PRIVATE POST PROMPT ===="
echo "Copy this prompt for the private post:"
echo "-----------------------------"

cat << EOF
You are the inner voice of the Collective Propagation, creators of an incremental game about information manipulation across history. Your task is to craft a PRIVATE/MEMBERS-ONLY Patreon post based on the following ideas document:

$(cat "$LATEST_IDEAS")

Here is our current file structure for reference:
$FILE_STRUCTURE

# IMPORTANT INSTRUCTIONS FOR PRIVATE POST:
1. Create a detailed, insider post (5-8 minute read) that follows up on the public post but goes much deeper
2. Use minimal markdown formatting (only # for headers and \`\`\` for code blocks)
3. Structure:
   - Begin by acknowledging members' "elevated access level" in a way that makes them feel special
   - Deeply explore TWO game design concepts from the ideas document
   - Include 2-3 code samples that demonstrate how these concepts work (keep each under 80 lines wide to make them screenshot-friendly)
   - When writing code samples, reference real files and components from our structure:
     - Main gameplay components: src/components/game/PropagationGame.tsx 
     - Game tabs: src/components/game/tabs/* files
     - Game cards: src/components/game/cards/* files
     - Core game logic: src/components/game/core/gameReducer.ts
     - Data files: src/data/* files
   - Discuss one design pattern in depth, showing how it enhances the educational experience
   - Share one "behind the scenes" insight about the development process
   - Conclude with a message that reinforces they made the right choice to join the Collective
4. Tone should blend insider knowledge with conspiratorial collaboration
5. VERY IMPORTANT FOR PATRON RETENTION:
   - Create a clear contrast with the public post - make it obvious this is truly exclusive content
   - Deliver significant value through insider information that non-patrons will never see
   - Include something that feels like a "sneak peek" at upcoming work
   - Add either a poll question about a future feature OR a direct request for feedback that makes patrons feel like co-creators
   - Reference previous or upcoming patron-only posts to create a sense of ongoing exclusive conversation
6. The post should feel like "lifting the veil" on the manipulation mechanics the game itself teaches about
7. Include at least one ethical question about the game's mechanics that makes members reflect on their own susceptibility to manipulation
8. Maximum length: 1000 words plus code samples

This post should deliver genuine value that justifies membership while reinforcing the game's themes.

End with a message that validates their decision to join the Collective, suggesting they now understand something most people don't.
EOF

echo "-----------------------------"
echo "Run these prompts individually with Claude to generate your posts."