#!/bin/bash

# Set up directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
BUILD_DIR="$ROOT_DIR/build/ideas"
DATE=$(date +%Y-%m-%d)
OUTPUT_FILE="$BUILD_DIR/$DATE.txt"

# Create directory if it doesn't exist
mkdir -p "$BUILD_DIR"

# Get file structure
FILE_STRUCTURE=$(find src -type f | sort)

# Get recent git activity
GIT_ACTIVITY=$(git log --pretty=format:"%h %ad %s" --date=short --numstat --no-merges -n 20)

# Generate the prompt for Claude
cat << EOF
You are the architectural intelligence behind Propagation, an incremental game about information manipulation across historical eras. As part of the Collective Propagation, you need to generate fresh ideas for our Patreon community.

Here is our current file structure:
$FILE_STRUCTURE

And here are our recent git commits:
$GIT_ACTIVITY

Based on the above context about our project, create three separate sections of ideas:

# 1. GAME DESIGN
Describe 2-3 innovative game mechanisms that would enhance our educational goal of teaching critical thinking through experience. Each idea should:
- Have a clear name and concept
- Explain how it works mechanically
- Detail how it serves our educational goal of revealing manipulation techniques
- Show how it fits into our historical progression (Antiquity → Medieval → Industrial → Cold War → Digital)
- Suggest any ethical dilemmas it might present to players
- Consider integration points with our existing features (achievements, ethics system, scenarios)
- Include minimal code examples (2-3 lines max) only where absolutely necessary

# 2. GAME PATTERNS
Analyze 2 design patterns we could implement in our TypeScript/React architecture to:
- Improve code maintainability
- Support our educational narrative
- Allow for future expansion of manipulation techniques
For each pattern, explain:
- What problem it solves
- How it would be implemented
- Where it fits into our current architecture (referring to specific directories like src/components/game/features, src/data, src/components/game/tabs)
- How it enhances the player's journey through manipulation mechanics

# 3. TOOLING
Propose 2 development tools or workflows that would help the Collective Propagation work more efficiently:
- One tool should focus on content creation/management for our data files (in src/data directory)
- One tool should focus on measuring player engagement with the educational aspects
Explain for each:
- What the tool does
- How it integrates into our development process
- Why it aligns with our goal of teaching about manipulation

Keep your ideas aligned with our metanarrative: the development tools and process itself should mirror the game's themes of revelation vs. manipulation.

VERY IMPORTANT: Make sure your ideas include elements that will:
- Give potential patrons a clear peek into our Patreon world
- Include at least one idea that could be teased in a public post but fully revealed in a patron-only post
- Suggest something we could poll our patrons about (feature preferences, ethical choices, or design directions)
- Offer a behind-the-scenes element that patrons would be excited to get exclusive access to

Write everything in a tone that suggests these ideas came from the collective intelligence of our group, rather than a single author. Use "we" and "our" language. Occasionally include cryptic references that only "those who understand" would recognize.

Remember: the first rule of Propagation is to question everything, including these ideas.
EOF