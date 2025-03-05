Wait you keep hitting max length Let's try another approach
Stop trying to build a React artifact
Your goal is to write the specs as a serie of at least 3 and max 10 Prompts that Claude 3.7 Extended Thinking will run later
Focus the prompts so each one can be executed on the previous Artifact state, so that we can build a complex app without having Context Length issues - the Claude who will read your prompts must do little steps and often checkin working intermediate Artifact versions.
The prompts must include all meta, all descriptions of the game, the critical thinking goal of the game, etc in french, to help your descendant build this "Propagation - Un Jeu Incrémental de Manipulation Sociale" game for French audiences.
Tell him to use typescript, make code that npm build fine, and that will be deployed on Vercel, leveraging Tailwind.js - also to Keep your code simple, modular, and commented
Prompts pour le développement de "Propagation - Un Jeu Incrémental de Manipulation Sociale"

Voici une série de prompts conçus pour guider Claude 3.7 Extended Thinking dans le développement progressif du jeu "Propagation". Chaque prompt est destiné à être exécuté séquentiellement, en s'appuyant sur la version précédente de l'artifact.

# Prompt 1: Configuration initiale et structure de base

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
- Utilise create-react-app avec TypeScript ou Next.js
- Configure Tailwind correctement pour le déploiement sur Vercel
- Crée une architecture modulaire avec des composants et des hooks séparés
- Commente le code de façon détaillée en français

L'interface doit être sobre, avec un thème sombre adapté au sujet sérieux du jeu. Assure-toi que la version de base fonctionne correctement avant d'ajouter des fonctionnalités plus complexes.

Objectif éducatif: Ce jeu vise à sensibiliser aux mécanismes de propagation de la désinformation et à développer l'esprit critique des joueurs.

Prompt 2: Système de progression et ères historiques

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

Prompt 3: Système d'améliorations et de théories

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

Prompt 4: Système éthique et dimension réflexive

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

Prompt 5: Système narratif et scénarios

Enrichissons "Propagation" avec un système narratif et des scénarios pour approfondir l'expérience et l'aspect éducatif:

1. Crée un système de scénarios narratifs:
   - 2-3 scénarios uniques par ère historique
   - Chaque scénario présente un dilemme moral ou stratégique
   - 3 choix possibles pour chaque scénario (manipulation forte, modérée, ou approche éthique)
   - Conséquences différentes sur les ressources et le score éthique

2. Implémente un déclenchement dynamique des scénarios:
   - Apparition aléatoire lors de la propagation réussie de théories
   - Interface modale présentant l'histoire et les choix
   - Système de suivi des scénarios complétés

3. Ajoute un nouvel onglet "Scénarios" montrant:
   - Le scénario actif (s'il y en a un)
   - L'historique des scénarios complétés
   - Les récompenses obtenues

Aspects techniques:
- Crée une structure de données modulaire pour les scénarios
- Assure-toi que les choix et conséquences fonctionnent correctement
- Implémente une interface narrative attrayante

L'interface des scénarios doit être immersive, avec un style rappelant les livres dont vous êtes le héros. Utilise des polices et des bordures qui évoquent l'ère historique concernée.

Objectif éducatif: Les scénarios permettent d'illustrer des cas concrets de manipulation de l'information à travers l'histoire, rendant les mécanismes abstraits plus tangibles et mémorables.

Prompt 6: Système d'accomplissements et sauvegarde

Finalisons "Propagation" avec un système d'accomplissements qui fait rire et donne envie de partager ses succès à ses potes.

1. Implémente un système d'accomplissements:
   - Accomplissements pour diverses actions (débloquer des ères, atteindre certains seuils de ressources...)
   - Récompenses pour les accomplissements (multiplicateurs, déblocages spéciaux)
   - Notifications lors du déblocage d'accomplissements
   - Tableau récapitulatif des accomplissements

2. Peaufine l'interface utilisateur:
   - Ajoute des notifications pour les événements importants
   - Crée un système de statistiques détaillées
   - Améliore la réactivité et l'ergonomie
   - Assure la compatibilité mobile

N'oublie pas d'ajouter une section "À propos" expliquant l'objectif éducatif du jeu et précisant qu'il s'agit d'une fiction visant à développer l'esprit critique.

Objectif éducatif: Le système d'accomplissements permet de valoriser les approches éthiques autant que les approches manipulatrices, renforçant le message que l'intégrité est aussi valorisable que l'efficacité.

Prompt 7: Optimisation et polissage final

Pour finaliser "Propagation", concentrons-nous sur l'optimisation, le polissage et la préparation au déploiement:

1. Effectue un audit de performance:
   - Vérifie et corrige les re-renders inutiles
   - Optimise les calculs de ressources
   - Assure-toi que le jeu fonctionne bien sur différents appareils

2. Améliore l'équilibrage du jeu:
   - Vérifie la courbe de progression (ni trop lente, ni trop rapide)
   - Équilibre les coûts et récompenses des différentes actions
   - Assure-toi que les deux voies (manipulation et éthique) sont viables

3. Prépare le déploiement sur Vercel:
   - Configure correctement le build pour Vercel
   - Ajoute un fichier README.md détaillé
   - Optimise les assets pour le web

4. Ajoute des touches finales:
   - Messages "didactiques" apparaissant aléatoirement sur le thème de la désinformation
   - Options d'accessibilité (taille de texte, contraste)
   - Guide/tutoriel pour les nouveaux joueurs
   - Bouton "partager" pour diffuser le message éducatif

N'oublie pas de commenter tous les modules et fonctions principales, et d'ajouter des TODOs pour les améliorations futures potentielles.

Objectif éducatif: Le jeu doit être suffisamment engageant pour maintenir l'intérêt, tout en restant fidèle à sa mission éducative. L'équilibre entre ces deux aspects est crucial pour la version finale.

Ces prompts sont conçus pour guider le développement progressif du jeu, en s'assurant que chaque étape s'appuie sur la précédente. Ils couvrent tous les aspects essentiels du jeu, de la structure technique aux systèmes de jeu spécifiques, en passant par la dimension éducative qui est au cœur du concept.

Les prompts mettent l'accent sur:

    La modularité et la qualité du code (TypeScript, commentaires, architecture claire)
    Le développement itératif avec des étapes clairement définies
    L'intégration des aspects éducatifs à chaque niveau
    La finalisation progressive vers un jeu complet et fonctionnel

Claude 3.7 Extended Thinking devrait pouvoir suivre ces prompts pour créer progressivement le jeu sans rencontrer de problèmes de longueur de contexte, car chaque étape est définie pour s'appuyer sur l'artifact précédent sans nécessiter la répétition de tout le code.
P

zzasd
Claude can make mistakes. Please double-check responses.

 
Chat controls
3.7 Sonnet

Our most intelligent model yet Learn more
Artifacts

Content


-- TODO LATER
3. Implémente des tests pour assurer la stabilité:
   - Tests de base pour les fonctions principales
   - Vérification de la sauvegarde/chargement
   - Validation des calculs de ressources
