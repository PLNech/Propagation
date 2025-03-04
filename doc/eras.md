# Système d'Ères Historiques - Propagation

Ce document décrit le nouveau système d'ères historiques implémenté dans le jeu "Propagation", un jeu incrémental sur la manipulation sociale et la désinformation.

## Concept

Le système d'ères représente l'évolution des techniques de manipulation et de propagande à travers l'histoire, de l'Antiquité à l'ère numérique moderne. Chaque ère offre:

- Une description contextuelle de la manipulation dans cette période
- Des techniques de manipulation spécifiques à l'époque
- Des multiplicateurs de ressources uniques
- Une progression narrative cohérente

## Structure de Données

### HistoricalEra

Représente une période historique avec ses spécificités:

```typescript
interface HistoricalEra {
  id: string;                // Identifiant unique de l'ère
  name: string;              // Nom affiché de l'ère
  description: string;       // Description narrative
  unlocked: boolean;         // Si l'ère est débloquée
  unlockCost: number;        // Coût en influence pour débloquer
  resourceMultipliers: {...}; // Multiplicateurs de production
  techniques: ManipulationTechnique[]; // Techniques disponibles
}
```

### ManipulationTechnique

Représente une méthode de manipulation propre à une ère:

```typescript
interface ManipulationTechnique {
  id: string;        // Identifiant unique
  name: string;      // Nom de la technique
  description: string; // Description et contexte historique
  effect: {          // Effet sur les ressources
    resource: keyof GameResources;
    multiplier: number;
  };
}
```

## Ères Implémentées

1. **Antiquité** (débloquée par défaut)
   - Narration mythique
   - Techniques: Mythes Fondateurs, Oracles et Prophéties

2. **Moyen Âge** (coût: 50 influence)
   - Superstition et autorité
   - Techniques: Autorité Ecclésiastique, Accusations d'Hérésie

3. **Ère Industrielle** (coût: 200 influence)
   - Presse et médias de masse
   - Techniques: Presse à Sensation, Marketing de Masse

4. **Guerre Froide** (coût: 800 influence)
   - Propagande institutionnalisée
   - Techniques: Guerre Idéologique, Désinformation Systématique

5. **Ère Numérique** (coût: 3000 influence)
   - Réseaux sociaux et bulles de filtres
   - Techniques: Bulles de Filtres, Marketing Viral, Hypertrucages

## Mécanique de Jeu

- Les joueurs débloquent de nouvelles ères en dépensant de l'influence
- Chaque ère débloquée peut être sélectionnée comme "ère active"
- L'ère active détermine les multiplicateurs appliqués à la génération de ressources
- Les ères plus avancées offrent des multiplicateurs plus puissants
- Le système montre visuellement la progression à travers une timeline

## Interface Utilisateur

- Onglet "Progression" dédié à l'exploration et au déverrouillage des ères
- Représentation visuelle de la timeline des ères
- Affichage détaillé des techniques de manipulation par ère
- Indicateur de l'ère active dans l'interface principale

## Objectif Éducatif

Ce système vise à montrer l'évolution des méthodes de manipulation sociale à travers l'histoire, tout en soulignant les mécanismes communs qui persistent. Les descriptions et techniques sont inspirées de phénomènes historiques réels pour sensibiliser les joueurs aux mécanismes de la désinformation dans différents contextes historiques.

## Évolutions Futures

- Événements historiques spécifiques à chaque ère
- Défis de manipulation propres à chaque période
- Missions éducatives liées aux techniques de l'ère
- Système de "vérité révélée" montrant l'impact des manipulations