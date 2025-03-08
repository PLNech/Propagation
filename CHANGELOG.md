# Development Log - Propagation

Sprint 13: Header Enhancement & Version Display (v0.11.2) - March 10, 2025
SUMMARY: Enhanced the sticky header component with improved responsive design, integrated save and about functionality, and added version display. Made the header adapt to screen size and scrolling behavior.
DEMAND:
```
Update the header on desktop to integrate the buttons it covers (Save top left, About top right)
Also, after about, add | v0.x.y.z if you can find a smart way to pull version from package.json at build time, good, otherwise don't complicate things just hardcode it
Only display those new header buttons when collapsed sticky, not when in the base ui
And when sticky, on large laptop screens, make the header full width and responsive adjust text for better breathing room readability
Only show Mode: Manipulation on sticky, in main layout it's redundant in header
Summarize our conversation sprint in a new changelog entry in our conv (no artifact here)
Make sure to include all my demands and debug requests as DEMAND of the new entry
version bump bug or feature semver style as you see fit
```

FEATURES:

Sticky Header Enhancements:

Added Save and About buttons that only appear when header is in sticky mode
Added version number display (v0.11.2) next to About button
Made game mode indicator only appear in sticky mode to avoid redundancy
Improved text sizing and spacing when header is sticky for better readability


Responsive Design Improvements:

Made the sticky header full-width on larger screens
Adjusted padding and text sizes dynamically based on header state
Created more breathing room in the layout for larger screens
Preserved compact layout for mobile devices



TECHNICAL IMPROVEMENTS:

Used conditional rendering based on sticky state
Implemented dynamic class application with Tailwind
Used refs and scroll event listeners for smooth transitions
Integrated version display from package.json (hardcoded for simplicity)

FILES:

Header.tsx (update) - Enhanced with conditional buttons and responsive design
PropagationGame.tsx (update) - Passed additional props to Header component

NOTES: This enhancement adds polish to the UI by providing easy access to important functions while maintaining a clean design. The sticky header now adapts intelligently to user behavior and screen size, showing only contextually relevant information.

## Sprint 12: Performance Optimization & Bug Fixes (v0.11.0 - v0.11.1) - March 9, 2025

**SUMMARY:** Resolved React hooks dependency issues across multiple components, improving performance and eliminating console warnings. Fixed notification timeouts and implemented proper cleanup for UI elements.

### DEMAND:
```
Fix React Hooks dependency warnings appearing in the console:

NotificationSystem.tsx has issues with timeoutRef.current in effect cleanup
GameButtons.tsx has multiple warnings related to buttonIntervals.current, missing dependencies in useEffect and useMemo hooks
SaveManager.tsx has issues with handler functions changing on every render
Fix circular dependencies in GameButtons.tsx
Ensure proper ref handling for cleanup functions
Implement useCallback and useMemo for functions and objects recreated on render
Address all warnings without changing component functionality
```

### v0.11.0: React Hooks Optimization

**FEATURES:**
- **Dependency Management:**
  - Implemented proper dependency tracking across all components
  - Used appropriate React hooks (useCallback, useMemo) to prevent unnecessary re-renders
  - Fixed circular dependency issues in GameButtons.tsx
  
- **Performance Improvements:**
  - Optimized rendering cycle with memoized components and handlers
  - Reduced memory usage from improper effect cleanup
  - Improved overall application performance

**FILES:**
- `NotificationSystem.tsx` (update) - Fixed timeoutRef handling in useEffect cleanup
- `GameButtons.tsx` (update) - Comprehensive refactoring of hooks and dependencies
- `SaveManager.tsx` (update) - Implemented useCallback for handler functions

### v0.11.1: Critical Bug Fixes

**FIXES:**
- **Proper Cleanup:**
  - Fixed timeout management in NotificationSystem to prevent memory leaks
  - Added defensive code to ensure button intervals are properly cleared
  - Fixed circular reference in GameButtons causing maximum depth exceeded errors

- **UI Improvements:**
  - Ensured consistent button behavior during rapid interactions
  - Fixed edge cases in SaveManager's keyboard shortcuts
  - Protected against potential race conditions in timer-based effects

**FILES:**
- Same as v0.11.0, with additional bug fixes and stability improvements

**NOTES:** These optimizations represent an important milestone in codebase stability, resolving all console warnings and preventing potential memory leaks. The changes maintain complete functionality while improving performance across all components.

Sprint 11: UX Improvements and Gender System (v0.10.0)

SUMMARY: Enhanced the notification system with stacked display, added player gender selection for personalized titles, and implemented achievement management features.

### DEMAND:
```
Achievements do display the timeout bar go down, but it doesn't dismiss on error, I think there is a bug.
However clicking the arrow does make them disappear.
Also now they stack it's a bit surprising that others await behind the current one when it displayed for long.
Can you show a bit of the next ones under the current achievement, as stacked cards visual?

Add a gender choice (le/la/notre Glorieux Leader).
This is used in the titles to be masculin/feminin/neutre gender forms in valid French (le Fondateur / la Fondatrice / notre Founder, le Sage / la Sage / juste [Sage nom], etc.).
And this is leveraged across the game UI to personalize further.

Add a reset achievements button in the achiev tabs. You reset with a single new secret achievement unlocked: Effacer l'Histoire, with a jokish description about new beginnings.

Keyboard shortcuts from save overlap with welcomemodal key input, can we make sure names inputs capture all keys?

Combine nom et genre dans une seule step UI de welcome, "votre nom" "et votre titre"? (implicite choix de forme pas explicite)

Suggere trois descriptions plus fun plus meta plus dans le lore.
Il faudrait subtilement integrer des stereotypes de genres, mais que ca sonne doucement feministe ironique plus que potentiellement macho.
```
FEATURES:

    Player Gender System:
        Added player gender choice (masculine/feminine/neutral) during onboarding
        Implemented gendered titles and honorifics throughout the game (e.g., "le Fondateur"/"la Fondatrice"/"Grand Fondateur")
        Personalized ruler titles based on eras and selected gender presentation
        Enhanced immersion with flavorful gender option descriptions
    Achievement Notification Improvements:
        Redesigned achievement notification system with stacked card visuals
        Fixed auto-dismiss functionality for smoother experience
        Implemented notification queue management with visual indicators
        Added animation for timer bar in notifications
        Prevented duplicate notifications in the same session
    Achievement Management:
        Added "Reset Achievements" functionality with confirmation modal
        Created new secret achievement "Effacer l'Histoire" for game reset
        Fixed UI bugs in achievement display
        Lowered starting ethics score to prevent unintended achievement triggers
    Technical Improvements:
        Fixed keyboard shortcut conflicts between save system and modal inputs
        Improved SaveManager to respect active input fields
        Enhanced notification system reliability with defensive code
        Optimized CSS animations by reusing existing keyframes

FILES:
    types.ts - Added player gender type definitions
    gameReducer.ts - Updated player info handling and reset functionality
    AchievementNotificationManager.tsx - Implemented stacked notification display
    AchievementNotification.tsx - Fixed animation and auto-dismiss
    WelcomeModal.tsx - Added gender selection with immersive UI
    Header.tsx - Updated to display gender-appropriate titles
    SaveManager.tsx - Fixed keyboard shortcut handling
    achievementData.ts - Added reset achievement and fixed initial values

NOTES: The gender system enhances player immersion while the notification improvements create a more polished user experience. Achievement management provides better control for players who want to restart with a clean slate.


## Sprint 10: Header Enhancement & Progressive Disclosure (v0.9.0) - March 9, 2025

**SUMMARY:** Implemented a fixed header with personalized player information, reorganized codebase for better maintainability, and added progressive disclosure system to improve game flow and learning curve.

### DEMAND:
```
Let's add a header with perso info (player name and tribe/city/etc with era scale name in book form) and resources for quick reading. On laptop it's a slick header bar. On mobile it's a header with text, then second line with resources, minimal in height.
Suggest minimal changes so that with an animation, when you start scrolling the header becomes fixed and stays visible ontop.
Add the name of the ruler in the header. As era advances, ruler name gets more intense (and a tad ridiculous a la Terry Pratchett, but in a French rationalist way).
Change "souverain" into era-relevant titles.
```

**FILES TO MODIFY:**
- `components/Header.tsx` - Create/update with fixed position on scroll
- `styles/header.css` - Add animation styles
- `data/eraData.ts` - Add era-specific ruler titles
- `types.ts` - Add player personalization types
- `gameReducer.ts` - Handle player name and title changes by era

### CODEBASE REORGANIZATION:

**DEMAND:**
```
The game folder is getting crazy. Help me refactor, just suggest a hierarchy I'll move stuff myself.
```

**RECOMMENDED STRUCTURE:**
```
src/
├── components/
│   ├── cards/         # All card components (UpgradeCard, TheoryCard, etc.)
│   ├── core/          # Core game logic (PropagationGame, gameReducer)
│   ├── features/      # Feature components (Achievements, Notifications)
│   ├── modals/        # All modal components
│   ├── tabs/          # Tab components
│   └── ui/            # UI components (Header, Buttons, etc.)
├── data/              # All game data files
├── services/          # Service files
├── styles/            # CSS files
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── app/               # Next.js app router structure
```

### CHARACTER ENCODING FIX:

**DEMAND:**
```
I write the site in French and thus get many encoding errors.
Can you either find a global solution (ideally), or write a script to fix this at scale, like I'm used to with python black tool?
```

**SOLUTION:**
Create a shell script to fix unescaped characters:

```bash
#!/bin/bash
# fix_unescaped.sh - Fix encoding issues in French text

find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/é/é/g; s/è/è/g; s/ê/ê/g; s/à/à/g; s/ô/ô/g; s/ç/ç/g; s/î/î/g; s/ï/ï/g; s/ë/ë/g; s/ù/ù/g; s/û/û/g; s/œ/œ/g'
```

### NOTIFICATION & ACHIEVEMENT TIMEOUT FIX:

**DEMAND:**
```
There's a bug achievements don't disappear after timeout. Same probleme with Notification they should have a decreasing bar and timeout too.
```

**FILES TO MODIFY:**
- `components/features/AchievementNotification.tsx` - Add timeout and decreasing progress bar
- `components/features/NotificationSystem.tsx` - Fix timeout handling with proper cleanup

### LINK ENHANCEMENT:

**DEMAND:**
```
Can you leverage the logic adding links from HistoricalContext, and use them in:
* Upgrades title and description once purchased
* Scenario text and content (Generate Wikipedia FR links I will check & replace them if needed)
* Theories, only once propagated, also generate links FR if possible else EN, I'll check them anyway
* Ethics, in descriptions of actions, generate also likely WP FR or WPEN or "LMGTFY Lesswrong.com keyword" links, I'll improve that later
```

**FILES TO MODIFY:**
- `components/cards/UpgradeCard.tsx` - Add link generation to purchased upgrades
- `components/cards/ScenarioCard.tsx` - Add French Wikipedia links to scenarios
- `components/cards/TheoryCard.tsx` - Add conditional links to propagated theories
- `components/tabs/EthicsTab.tsx` - Add mixed link sources to ethical actions
- `utils/linkGenerator.ts` (new) - Create utility for consistent link generation

### PROGRESSIVE DISCLOSURE SYSTEM:

**DEMAND:**
```
This is a refactoring to make the game easier to apprehend. Your goal is to add progressive reveal mechanisms to make each part of the game revealed at a later point.
E.g. all tabs are hidden at first. At first, you have only Manipulation, and by manipulating you start earning enough for upgrades. When no more upgrades, next era is available. Thus Upgrades become the scaling factor you grind for.
Adjust purchase costs as needed. Each era unlocks a feature:
* Moyen age opens Scenarios. They are hidden until then and appear then
* Industrial age brings Theories, and it must highlight how you can now return to earlier ages to bring them back. Add guidance towards that goal, achievements on that path, and a big button Back to Antiquite with copy suggesting it's worth going back in time to apply this new manipulation technique and propagate theories that interest you. Make it a soft reset, you need to unlock eras again
* Guerre Froide unlock Ethique, this too suggests you go back in time to see them and apply in a new light: help population see trough and resist manipulation. This unlocks Revelation, which until then has a mysterious popup on hover (mobile on hold)
* For now Ere numerique unlocks nothing, add a TODO comment with 3 different ideas of a new mechanism it could offer to soft reset an interesting new run with diff mechanics.

Additional progressive reveal mechanisms:
* Scenarios reveal only one by one, and not until you unlock their relevant era
* Theories reveal when you can afford 50% of their costs, the relative amount you have being displayed (xx/500)
* When resetting back to an earlier era to unlock new mechanisms, player should still see unlocked tabs, but not yet the "never reached" era unlocks
* Implement polynomial scaling for upgrade costs to make progression more challenging
```

**FILES TO MODIFY:**
- `core/PropagationGame.tsx` - Implement tab visibility based on game progress
- `core/gameReducer.ts` - Add feature unlocking logic tied to eras
- `data/eraData.ts` - Update era data with feature unlock information
- `types.ts` - Add feature discovery tracking to game state
- `components/ui/TabNavigation.tsx` - Show/hide tabs based on unlocked features
- `components/features/TimeTravel.tsx` (new) - Create time travel component for soft resets
- `data/achievementData.ts` - Add achievements for time travel milestones

## Sprint 9: The Last Fix (v0.8.0) - March 8, 2025

**SUMMARY:** Implemented critical fixes for React component handlers and French translations, ensuring the game runs smoothly across all platforms.

### DEMAND:
```
Fix GameButtons component to resolve React Hook errors and improve performance.
Fix NotificationSystem component related to timeout ref handling.
Eliminate explicit `any` types for better type safety.
Round manipulationPoints to eliminate .99999999 issue.
Fix "Maximum update depth exceeded" error.
Upgrade LOAD_GAME handler to patch achievements with default values for missing new entries, ensuring existing players can see new achievements.
Fix positioning and visibility issues with concentric GameButtons.
Update button colors: Manipulation (Red), Credibility (Blue), Networks (Green), Influence (Purple).
```

**FILES:**
- `GameButtons.tsx` (update) - Button handlers refactoring
- `NotificationSystem.tsx` (update) - Fixed timeout ref handling in effect cleanup

## Sprint 8: Utility & Accessibility (v0.7.0) - March 7-8, 2025

**SUMMARY:** Added extensive utility features, reorganized code structure, and implemented progressive discovery system to enhance player experience and development maintainability.

### DEMAND:
```
Create a LinkUtility component for improved navigation.
Enhance SaveManager with shortcuts.
Implement a progressive discovery system across multiple components.
Complete a major code reorganization into a more logical folder structure.
Add a new Header component for better navigation.
Implement a welcome modal with personalization options.
```

**FILES:**
- `LinkUtility.tsx` (new) - Navigation utility
- `SaveManager.tsx` - Added shortcuts
- Core components - Progressive discovery implementation
- Reorganized file structure
- `Header.tsx` (new) - Navigation header
- `WelcomeModal.tsx` (new) - Welcome and personalization

## Sprint 7: Achievements & Controls (v0.6.0) - March 5-6, 2025

**SUMMARY:** Implemented a comprehensive achievement system, enhanced game buttons, and added debug utilities for development.

### DEMAND:
```
Add an achievements notification system.
Create an achievement manager.
Expand the catalog of achievements.
Implement sound effects for achievements.
Completely redesign the GameButtons component with keyboard shortcuts.
Implement a comprehensive debug helper utility with Shift+Debug keyboard shortcut.
Add an About page with credits and additional information.
```

**FILES:**
- `AchievementNotification.tsx`, `AchievementNotificationManager.tsx` - Achievement notifications
- `AchievementsTab.tsx`, `achievementData.ts` - Achievement system
- `GameButtons.tsx` - Redesigned with keyboard shortcuts
- `debugHelper.ts` - Debug utility
- `AboutPage.tsx` - About page and credits

## Sprint 6: Educational Features (v0.5.0) - March 3-4, 2025

**SUMMARY:** Added scenario system, educational content, historical context, and various enhancements to prepare for a wider release.

### DEMAND:
```
Implement a complete scenario system with modal and tab interfaces.
Add historical context information.
Create a tutorial modal.
Improve game interface.
Add an About page.
Make final adjustments before wider release, including Open Graph meta tags and favicon.
```

**FILES:**
- `ScenarioModal.tsx`, `ScenariosTab.tsx`, `scenarioData.ts` - Scenario system
- `HistoricalContext.tsx` - Historical information
- `TutorialModal.tsx` - Tutorial system
- `AboutPage.tsx` - About page
- `layout.tsx` - Added meta tags and favicons

## Sprint 4: Enhanced Gaslighting System and Save Functionality (v0.4.0)

**SUMMARY:** Implemented an improved gaslighting system with reduced frequency but increased variety and impact, along with a complete save/load system using localStorage and base64 encoding.

### DEMAND:
```
Le systeme de Gaslight marche tres bien, l'idee est top, mais c'est bcp trop frequent et repetitif. Developpe le, moins de notifs frequentes, mais plus variees - on veut par moment des boutons qui changent quand le gaslight est super fort, et une plus grande variete des messages de gaslighting. Certains tentent meme de decourager le joueur de jouer!
Ajoute un systeme basique de sauvegarde : auto dans le localStorage, on Save/Restore en base64 for now
```

**FILES:**
- `saveService.ts` - Save/load service
- `gaslightingService.ts` - Advanced gaslighting system
- `gaslighting.css` - Visual effects styles
- `SaveManager.tsx` - Save management interface
- `GameControls.tsx` (update) - Support for button gaslighting
- `gameReducer.ts` (update) - Support for save loading
- `PropagationGame.tsx` (update) - Integration of new systems

## Sprint 3: Ethical and Reflective Dimension (v0.3.0)

**SUMMARY:** Added an ethical dimension to the game with ethical score system, critical thinking gauge, ethical actions, and alternative "revelation" mode, along with an Ethics tab and multiple game endings.

**DEMAND:**
```
Ajoutons maintenant la dimension éthique et réflexive au jeu "Propagation", qui est au cœur de son objectif éducatif:
1. Implémente un système éthique complet:
   - Score d'éthique (0-100%) influencé par les actions du joueur
   - Jauge de "pensée critique" représentant la résistance collective à la manipulation
   - Actions "révélation éthique" permettant de sacrifier de l'influence pour gagner en éthique
   - Mode alternatif "révélation" où le joueur expose les mécanismes au lieu de les exploiter
2. Ajoute un onglet "Éthique" avec:
   - Statistiques détaillées sur l'impact des actions du joueur
   - Explications des mécanismes de manipulation représentés dans le jeu
   - Citations éducatives sur l'importance de l'esprit critique
   - Informations contextuelles sur la désinformation dans le monde réel
3. Crée un système de "fins de jeu" alternatives:
   - Fin "manipulation" si l'influence est très élevée mais l'éthique basse
   - Fin "éthique" si la pensée critique est très élevée et l'éthique haute
Aspects techniques:
- Implémente un système de notification pour les événements éthiques importants
- Assure-toi que le mode révélation fonctionne correctement comme alternative au mode standard
- Crée une interface claire pour les statistiques éthiques
L'interface de l'onglet éthique doit être particulièrement soignée, avec un design qui encourage la réflexion. Utilise des contrastes de couleurs entre les actions manipulatrices (rouge/violet) et éthiques (vert/bleu).
Objectif éducatif: C'est le cœur du jeu - faire comprendre aux joueurs les mécanismes de manipulation qu'ils utilisent, et leur offrir une alternative éthique. Le jeu ne doit jamais glorifier la manipulation, mais l'exposer pour mieux s'en prémunir.
```

**FILES:**
- `types.ts` (update) - Types for ethical system
- `ethicalData.ts` - Ethical actions and educational content data
- `gameReducer.ts` (update) - Ethical system logic
- `EthicalActionCard.tsx` - Ethical action component
- `EducationalCard.tsx` - Educational content component
- `QuoteCard.tsx` - Critical thinking quotes component
- `GameEndingModal.tsx` - Game ending modal
- `EthicsTab.tsx` - Main ethics tab component
- `NotificationSystem.tsx` - Notification system
- `PropagationGame.tsx` (update) - Ethical system integration
- `ethical-system-docs.md` - Ethical system documentation

## Sprint 2: Upgrades and Theories System (v0.2.0) - First Deploy

**SUMMARY:** Developed purchasable upgrades system and conspiracy theory propagation mechanisms with risk/reward gameplay and ethical impact.

**DEMAND:**
```
Développons maintenant le système d'améliorations et les mécanismes de propagation des théories pour "Propagation":
1. Crée un système d'améliorations achetables:
   - Différentes améliorations pour chaque ère historique
   - Coûts en ressources (crédibilité, influence)
   - Effets variés (multiplicateurs, production passive, débloquage de fonctionnalités)
   - Interface claire montrant coûts, effets et prérequis
2. Implémente un système de "théories à propager":
   - Liste de théories du complot basées sur le document "conspiracy_theories_catalog.md"
   - Mécanisme de risque/récompense (chance d'échec avec pénalité)
   - Coûts en points de manipulation
   - Récompenses en influence et autres ressources
   - Impact sur le score éthique du joueur
3. Ajoute des onglets dédiés:
   - "Améliorations" pour acheter les upgrades
   - "Théories" pour propager des théories
Aspects techniques:
- Utilise des composants réutilisables pour les améliorations et théories
- Implémente un système de filtrage pour n'afficher que ce qui est disponible dans l'ère actuelle
- Assure-toi que les transactions de ressources fonctionnent correctement
L'interface doit être intuitive, avec des informations clairement présentées sur les coûts et bénéfices de chaque action. Utilise des couleurs pour indiquer si le joueur peut se permettre un achat.
Objectif éducatif: Illustrer comment la crédibilité et l'influence se construisent, et montrer le dilemme éthique entre efficacité (propager des théories non vérifiées) et intégrité (maintenir un haut score éthique).
```

**FILES:**
- `types.ts` (update) - Types for upgrades and theories
- `upgradeData.ts` - Purchasable upgrades data
- `conspiracyData.ts` - Conspiracy theories catalog
- `gameReducer.ts` (update) - Upgrades and theories logic
- `UpgradeCard.tsx` - Upgrade card component
- `TheoryCard.tsx` - Theory card component
- `UpgradesTab.tsx` - Upgrades tab
- `TheoriesTab.tsx` - Theories tab
- `PropagationGame.tsx` (update) - New tabs integration
- `system-documentation.md` - Systems documentation

## Sprint 1: Historical Eras Progression System (v0.1.0)

**SUMMARY:** Developed historical eras progression system with different time periods, specific manipulation techniques, and resource multipliers for each era.

**DEMAND:**
```
Maintenant, développons le système de progression et les ères historiques pour "Propagation". En partant de l'artifact existant:

1. Implémente un système d'ères représentant différentes périodes historiques de manipulation:
   - Antiquité (narration mythique)
   - Moyen Âge (superstition et autorité)
   - Ère Industrielle (presse et médias de masse)
   - Guerre Froide (propagande institutionnalisée)
   - Ère Numérique (réseaux sociaux et bulles de filtres)

2. Pour chaque ère:
   - Ajoute une description narrative en français
   - Définis des techniques de manipulation spécifiques
   - Crée un coût de déblocage (en influence)
   - Définir un multiplicateur de production de ressources

3. Implémente un onglet "Progression" permettant au joueur de visualiser et de débloquer les ères

Aspects techniques:
- Crée un module séparé pour gérer les données des ères
- Utilise des types TypeScript appropriés pour les structures de données
- Assure-toi que le système de progression s'intègre bien avec le système de ressources existant

L'interface doit illustrer visuellement la progression à travers les ères, peut-être avec une ligne temporelle. Chaque nouvelle ère débloquée doit donner une sensation d'évolution significative.

Objectif éducatif: Montrer comment les méthodes de manipulation ont évolué au fil du temps, tout en soulignant les mécanismes communs qui persistent à travers les époques.
```

**FILES:**
- `types.ts` (update) - Extended game types
- `eraData.ts` - Historical eras data
- `gameReducer.ts` (update) - Era progression logic
- `ProgressionTab.tsx` - Era progression interface
- `PropagationGame.tsx` (update) - Integration of era system
- `era-documentation.md` - Era system documentation

## Sprint 0: Basic Incremental Game Structure (v0.0.1)

**SUMMARY:** Created the foundation for an incremental game about social manipulation and misinformation, with basic resources, UI, and tick system.

**DEMAND:**
```
Crée un jeu incrémental/idle nommé "Propagation - Un Jeu Incrémental de Manipulation Sociale" qui explore les mécanismes de propagation des fausses croyances et de la manipulation sociale à travers différentes époques.
Pour cette première phase:
1. Configure un projet React avec TypeScript
2. Initialise Tailwind CSS
3. Crée la structure de base du jeu avec:
   - Un composant principal PropagationGame
   - Des états pour les ressources principales (crédibilité, influence, réseaux, points de manipulation)
   - Une interface utilisateur minimaliste avec affichage des ressources
   - Un système de mise à jour automatique des ressources (tick)
Aspects techniques:
- Sera integre avec un create-react-app avec TypeScript en Next.js app router, mais commence par un Artifact standalone
- Crée une architecture modulaire avec des composants
- Commente le code de façon détaillée en anglais
L'interface doit être sobre, avec un thème sombre adapté au sujet sérieux du jeu. Assure-toi que la version de base fonctionne correctement avant d'ajouter des fonctionnalités plus complexes.
Objectif éducatif: Ce jeu vise à sensibiliser aux mécanismes de propagation de la désinformation et à développer l'esprit critique des joueurs.
```

**FILES:**
- `types.ts` - Basic game types
- `gameReducer.ts` - Game state reducer
- `ResourceDisplay.tsx` - Resource display component
- `GameControls.tsx` - Basic game controls
- `PropagationGame.tsx` - Main game component
- `app/page.tsx` - Next.js page
- `app/layout.tsx` - Next.js layout
- `setup-instructions.md` - Setup instructions

## Sprint -1: Project Initialization (v0.0.0)

**SUMMARY:** Initial request to build an incremental game with React and TypeScript, focusing on clean and well-documented code.

**DEMAND:**
```
Build artifacts towards an actual React Next.js deployed game.
Think step by steps, keep it simple, document your code.
Make TypeScript that builds fine, with proper types everywhere.
```

**FILES:**
- `propagation-game.tsx` - Initial game component prototype