# Development Log - Propagation

## Sprint 4: Enhanced Gaslighting System and Save Functionality

**SUMMARY:** Implemented an improved gaslighting system with reduced frequency but increased variety and impact, along with a complete save/load system using localStorage and base64 encoding.

**DEMAND:**
```
* Le systeme de Gaslight marche tres bien, l'idee est top, mais c'est bcp trop frequent et repetitif. Developpe le, moins de notifs frequentes, mais plus variees - on veut par moment des boutons qui changent quand le gaslight est super fort, et une plus grande variete des messages de gaslighting. Certains tentent meme de decourager le joueur de jouer!
* Ajoute un systeme basique de sauvegarde : auto dans le localStorage, on Save/Restore en base64 for now
```

**FILES:**
- `saveService.ts` - Save/load service
- `gaslightingService.ts` - Advanced gaslighting system
- `gaslighting.css` - Visual effects styles
- `SaveManager.tsx` - Save management interface
- `GameControls.tsx` (update) - Support for button gaslighting
- `gameReducer.ts` (update) - Support for save loading
- `PropagationGame.tsx` (update) - Integration of new systems
- `systems-documentation.md` - New systems documentation
- `final-integration-guide.md` - Final integration guide

## Sprint 3: Ethical and Reflective Dimension

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

## Sprint 2: Upgrades and Theories System

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

## Sprint 1: Historical Eras Progression System

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

## Sprint 0: Basic Incremental Game Structure

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

## Sprint -1: Project Initialization

**SUMMARY:** Initial request to build an incremental game with React and TypeScript, focusing on clean and well-documented code.

**DEMAND:**
```
Build artifacts towards an actual React Next.js deployed game.
Think step by steps, keep it simple, document your code.
Make TypeScript that builds fine, with proper types everywhere.
```

**FILES:**
- `propagation-game.tsx` - Initial game component prototype