# 📢 PROPAGATION

<div align="center">
  
  ![Propagation Game Logo](public/og-image.jpg)
  
  **An incremental game about information, manipulation, and critical thinking**
  
  [Play Now](https://propagation.vercel.app) | [Learn More](#about-propagation) | [Development Log](CHANGELOG.md)
  
</div>

---

## 👁️ [Screenshot Gallery]

<div align="center">
  
  ![Gameplay Screenshot](assets/screen2.png)
  *Manipulate resources in different historical eras*
  
  ![Ethical Choices](assets/screen2.jpg)
  *Choose between manipulation and revelation*
  
</div>

---
## 🌐 À propos de Propagation

**Propagation**, ce n'est pas juste un énième jeu idle où tu clique frénétiquement pour voir des nombres augmenter (bon, ok, juste un poil). C'est une _exploration interactive_ de comment l'information se propage, comment les croyances se forment, et comment la manipulation fonctionne — à travers l'histoire jusqu'à nos smartphones addictifs d'aujourd'hui.

Au fil du jeu, vous traverserez diverses époques historiques — des mythes antiques aux bulles de filtres numériques — en maîtrisant des techniques d'influence de plus en plus sophistiquées tout en vous cognant contre quelques questions éthiques embarrassantes:

**Allez-vous manipuler ou révéler ? Embobiner ou éclairer ?**

Vos choix comptent, pas seulement pour progresser dans le jeu, mais aussi comme réflexion sur comment l'information façonne notre monde.  
Ou alors c'est juste un jeu pour faire passer le temps en réunion.  
À vous de voir.

> "Le jeu qui vous fait questionner les jeux auxquels vous jouez... et pourquoi vous avez encore 93 onglets ouverts."

## ✨ Caractéristiques Principales

### 🎮 Gameplay Qui Prend Aux Tripes (Ou Pas)
- **Progression Historique** à travers cinq ères de contrôle de l'information
- **Gestion de Ressources** équilibrant crédibilité, influence, réseaux et points de manipulation
- **Améliorations Stratégiques** spécifiques à chaque contexte historique
- **Théories du Complot** à propager (à vos risques et périls éthiques)
- **Fins Multiples** basées sur vos choix moraux (ou leur absence)

### 🧠 Éléments Meta-Gaming
- Expérimentez des **mécaniques de gaslighting** qui brouillent la frontière entre jeu et joueur
- Questionnez vos expériences quand le jeu **brise le quatrième mur** (parfois accidentellement, fragile ces saloperies !)
- Découvrez le jeu commentant sa propre nature manipulatrice (not yet rejected for being [too meta](https://xkcd.com/1447/))

### 🔄 Approche Éducative (On Essaie)
- Apprenez de vraies **techniques de propagande historiques** dans leur contexte
- Expérimentez les tensions éthiques du contrôle de l'information
- Développez des **compétences de pensée critique** applicables à la consommation médiatique moderne
- Plein de [liens](https://www.lesswrong.com/rationality) pour creuser les refs

## 🔍 L'Approche Maïeutique (Fancy!)

Propagation emploie une **philosophie éducative maïeutique** — au lieu de vous dire quoi penser, on crée les conditions pour que vous découvriez des insights par vous-même.  
_Comme ça, on peut prétendre que c'était votre idée depuis le début._

Comme la méthode de Socrate (sauf que notre ciguë à nous est numérique), Propagation ne prêche pas contre la désinformation. Au lieu de ça, on vous met au volant de sa création, pour en expérimenter les effets et faire face aux conséquences. Ou pour rigoler, c'est selon.

Le jeu est conçu pour déclencher des moments de réflexion comme:
- "Attends, est-ce que je suis manipulé par un jeu sur la manipulation?"
- "Pourquoi propager cette théorie du complot est si efficace mais troublant?"
- "Tiens, ces techniques historiques ressemblent vachement à ce que je vois sur TikTok..."

Cette approche crée une compréhension plus profonde que l'instruction didactique. Enfin, c'est ce qu'on dit pour justifier le temps passé à coder ce truc.

## 👥 Collaboration Humain × IA (et _beaucoup_ de café)

Propagation représente un nouveau type de partenariat créatif — une collaboration humain-IA où:

- **La direction humaine** a fourni la vision créative, les garde-fous éthiques, et le contexte réel
- **L'implémentation IA** a livré l'architecture technique, la génération de contenu, et la conception de systèmes
- **Le Café**: vous croyez que toutes ces nuits fiévreuses se font comme ça ? Gros merci pour les amis de [Kawa](https://kawa.coffee) <3

----

<div align="center">
  <img src="./public/this-is-fine.gif" />
  <p><i>Le <a href="https://x.com/karpathy/status/1886192184808149383">vibe coding</a> c'est... quelque chose
  </p>
</div>

### Vibe

Plutôt que simplement exécuter des instructions, ce projet a évolué à travers un dialogue significatif — des cycles itératifs de:

1. Humain fixant des objectifs et donnant du feedback
2. IA proposant et implémentant
3. Raffinement collaboratif
4. Réflexion éthique (parfois)

Le résultat n'est ni un travail purement humain, ni purement IA, mais quelque chose de véritablement émergent de l'interaction des deux intelligences. Et beaucoup de bugs non intentionnels. Mais une création bicéphale à grande vitesse, ça vaut bien un peu de débugging.

----

## 🛠️ Tech Stack

- **React** + **Next.js** for frontend framework
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- No backend required - runs entirely in browser with localStorage persistence

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/propagation.git

# Navigate to the project directory
cd propagation

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to see the game in action!

## 🤝 Contributing

We welcome contributions to Propagation! The game is primarily written in French, which can sometimes cause encoding issues in React.

### 🔧 Development Tools

#### French Character Encoding Fixer

The project includes a helpful script for handling French accented characters that can cause React "unescaped entity" errors:

```bash
# Check for potential encoding issues without fixing them
npm run accent-check

# Automatically fix encoding issues
npm run accent-fix
```

The script intelligently identifies and fixes unescaped French characters (é, è, ê, à, etc.) in JSX content while preserving them in JavaScript props and other contexts.

Options:
- `--help` - Show help information
- `--apply` - Apply fixes directly (instead of just showing what would change)
- `--backup` - Create backup files before making changes
- `--verbose` - Show detailed information about processing

#### Other Development Commands

```bash
# Run the development server with turbopack
npm run dev

# Build the project
npm run build

# Run linting
npm run lint
```

### 📝 Pull Request Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run accent-check` to ensure proper French character encoding
5. Submit a pull request with a clear description of your changes

### 📋 Release Process

When preparing a new release:

1. Update the CHANGELOG.md with details of your changes
2. Bump the version in package.json and in Header.tsx according to semantic versioning:
   - MAJOR version for incompatible API changes (x.0.0)
   - MINOR version for new functionality in a backward compatible manner (0.x.0)
   - PATCH version for backward compatible bug fixes (0.0.x)
3. Run `npm run tag` to create and push a git tag for the new version
4. Create a GitHub release corresponding to the new tag

#### Changelog Entry Prompt

Use this prompt to generate a changelog after a sprint:

> Create a concise changelog entry for Propagation from our conversation. 
> Use version [VERSION] following semantic versioning principles based on the changes.
> 
> Focus on:
> 1. A clear, brief summary (1-2 sentences)
> 2. Include all my original requests in a DEMAND section
> 3. Key features/fixes organized by category
> 4. Files modified with short descriptions
> 5. Any important technical notes
> 
> Reference format:
> 
> ## Sprint XX: [Feature Name] (v0.Y.Z) - [Date]
> 
> **SUMMARY:** [Brief summary of changes]
> 
> ### DEMAND:
> ```
> [Include ALL my original requests here verbatim, preserving every feature request and bugfix mentioned in our conversation. Capture my exact wording, add line breaks between topics.]
> ```
> **FEATURES:**
> - **[Category]:**
>   - [Feature description]
>   - [Feature description]
>   
> **FIXES:** (if applicable)
> - [Fix description]
> - [Fix description]
> 
> **FILES:**
> - `[filename]` ([update/new]) - [Description]
> - `[filename]` ([update/new]) - [Description]
> 
> **NOTES:** [Any additional context]
> 
> Please keep the features/fixes sections concise and technical. Include actual file paths from our conversation. Don't omit any of my original requests in the DEMAND section.


## 🤝 Credits

Propagation was created by:

- **Human Designer**: Creative direction, educational philosophy, ethical framework, balancing, refactoring and mechanism designs, lots of guidance on architecture, looots of debugging of various little issues 
- **Claude AI**: Code architecture, content generation, system implementation, refactoring suggestions, color palettes, UI suggestions, UI implementations, Copy suggestions, MVP section one-shots, Partner across countless conversations

*Special thanks to:*
- [Anthropic](https://anthropic.com) for developing Claude
- The rich academic literature and content creation online on propaganda, media literacy, and critical thinking
- You, for playing and reflecting

---

<div align="center">
  <p><i>Remember: Question everything—including this game.</i></p>
  
  [![Ethical Game Development](https://img.shields.io/badge/Ethical%20Game-Development-blue)](https://github.com/yourusername/propagation)
  [![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
  [![Human + AI Collaboration](https://img.shields.io/badge/Human%20%2B%20AI-Collaboration-blueviolet)](https://anthropic.com)
  
</div>