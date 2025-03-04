# Instructions finales d'intégration

Voici les étapes pour intégrer les fichiers créés dans votre projet Next.js. J'ai modifié les composants pour corriger les bugs et implémenter les améliorations demandées.

## Fichiers à remplacer/ajouter

1. **Correction du bug d'affichage des théories propagées**
   - Remplacer `TheoryCard.tsx` par la version corrigée
   - Remplacer `TheoriesTab.tsx` par la version mise à jour pour gérer les statuts de propagation

2. **Ajout d'icônes pour les ressources**
   - Remplacer `ResourceDisplay.tsx` par la version avec icônes

3. **Ton plus ironique et provocateur**
   - Remplacer `EthicsTab.tsx` par la version avec ton plus subtil
   - Remplacer `PropagationGame.tsx` par la version finale

4. **Méta-conspirations**
   - Les méta-conspirations sont intégrées dans tous les fichiers mis à jour, en particulier:
     - `PropagationGame.tsx` avec des événements aléatoires
     - `TheoriesTab.tsx` avec des commentaires cryptiques
     - `EthicsTab.tsx` avec des messages ironiques

## Checklist d'intégration

1. Vérifiez que tous les imports sont correctement configurés dans les fichiers
2. Assurez-vous que `NotificationType` est correctement exporté depuis NotificationSystem
3. Testez le bug corrigé d'affichage des théories (succès/échec)
4. Vérifiez que les icônes s'affichent correctement pour chaque ressource
5. Testez les méta-événements aléatoires en jouant un moment

## Améliorations notables

### 1. Correction du bug
- Les statuts de propagation (succès/échec) sont maintenant visibles sur les cartes de théories
- Un indicateur visuel montre clairement le résultat de la propagation
- Le statut est effacé après 5 secondes

### 2. Design avec icônes
- Chaque ressource a maintenant une icône distinctive
- Les couleurs correspondent aux thèmes des ressources:
  - Bleu pour la crédibilité
  - Violet pour l'influence
  - Vert pour les réseaux
  - Rouge pour la manipulation

### 3. Ton plus subtil et ironique
- Les textes éducatifs explicites ont été remplacés par des messages plus provocateurs
- L'ironie légère est présente dans tous les textes descriptifs
- Les messages de confirmation ont un ton moins didactique

### 4. Méta-conspirations
- Événements aléatoires suggérant que le jeu change quand le joueur ne regarde pas
- Notifications occasionnelles qui brisent le quatrième mur
- Easter eggs textuels qui apparaissent rarement pour maintenir le mystère
- Messages cryptiques suggérant que les règles du jeu pourraient changer

## Notes techniques supplémentaires

- Le système de propagation utilise maintenant un état local pour suivre les statuts
- Les méta-événements ont une probabilité faible pour ne pas surcharger l'utilisateur
- Un compteur d'interactions permet de ne déclencher les événements que lorsque le joueur est engagé

## Pour aller plus loin

Vous pourriez envisager ces ajouts pour renforcer encore la dimension "méta" du jeu:

1. **Sauvegarde altérée**: Modifier subtilement certaines valeurs sauvegardées entre les sessions
2. **Bugs "intentionnels"**: Implémenter des "bugs" qui sont en fait des fonctionnalités cachées
3. **Interface changeante**: Faire varier légèrement les couleurs ou positions des éléments
4. **Messages cachés**: Ajouter des messages visibles uniquement dans certaines conditions

Ces modifications transforment "Propagation" en une expérience plus engageante et méta-réflexive, questionnant la nature même du jeu tout en restant amusant et provocateur plutôt qu'explicitement éducatif.

# Gaslighting

# Guide d'Intégration Finale - Propagation

Ce guide vous aidera à intégrer les nouveaux systèmes de gaslighting amélioré et de sauvegarde dans votre projet React Next.js existant pour le jeu "Propagation".

## 1. Structure des Fichiers

Voici comment organiser les nouveaux fichiers dans votre projet :

```
src/
├── components/
│   └── game/
│       ├── types.ts                  # Types mis à jour
│       ├── gameReducer.ts            # Réducteur avec sauvegarde
│       ├── saveService.ts            # Nouveau service de sauvegarde
│       ├── gaslightingService.ts     # Nouveau service de gaslighting
│       ├── SaveManager.tsx           # Nouveau composant de gestion des sauvegardes
│       ├── GameControls.tsx          # Contrôles mis à jour
│       ├── PropagationGame.tsx       # Composant principal mis à jour
│       └── TheoryCard.tsx            # Carte de théorie avec correction
├── styles/
│   └── gaslighting.css               # Styles pour les effets de gaslighting
```

## 2. Ordre d'Intégration Recommandé

Suivez cet ordre pour minimiser les conflits et faciliter le débogage :

1. Ajouter les fichiers CSS et services d'abord
2. Mettre à jour les composants UI existants
3. Intégrer le nouveau réducteur de jeu
4. Mettre à jour le composant principal

### 2.1 Fichiers à Ajouter

Commencez par ajouter ces nouveaux fichiers :
- `saveService.ts`
- `gaslightingService.ts`
- `gaslighting.css` (dans le dossier styles)
- `SaveManager.tsx`

### 2.2 Fichiers à Mettre à Jour

Ensuite, mettez à jour ces fichiers existants :
- `types.ts` - Ajouter le support pour `LOAD_GAME`
- `GameControls.tsx` - Ajouter l'ID pour le bouton manipuler
- `TheoryCard.tsx` - Corriger le bug d'affichage des statuts
- `gameReducer.ts` - Ajouter le support pour les sauvegardes

### 2.3 Intégration Finale

Enfin, mettez à jour le composant principal :
- `PropagationGame.tsx` - Intégrer les systèmes de gaslighting et sauvegarde

## 3. Modifications dans Next.js

### 3.1 Importation des Styles CSS

Dans votre fichier `_app.tsx` ou équivalent, importez les styles CSS :

```tsx
// _app.tsx
import '../styles/gaslighting.css';
```

### 3.2 Configuration du localStorage dans Next.js

Comme Next.js s'exécute aussi côté serveur, ajoutez cette vérification dans vos services :

```typescript
// Au début de saveService.ts
const isServer = typeof window === 'undefined';
const getLocalStorage = () => (isServer ? null : window.localStorage);
```

Et modifiez les fonctions pour utiliser `getLocalStorage()` au lieu de `localStorage` directement.

## 4. Étapes d'Intégration Détaillées

### 4.1 Préparation

1. **Sauvegardez votre code actuel** avant de commencer les modifications
2. **Installez les dépendances** si nécessaire (aucune nouvelle dépendance n'est requise)

### 4.2 Intégration des Services

1. Ajoutez `saveService.ts` et `gaslightingService.ts`
2. Ajoutez `gaslighting.css` dans le dossier styles
3. Importez `gaslighting.css` dans votre fichier principal ou _app.tsx

### 4.3 Mise à Jour des Composants

1. Mettez à jour `GameControls.tsx` avec la nouvelle prop `manipulateButtonId`
2. Remplacez `TheoryCard.tsx` par la version corrigée qui gère les statuts

### 4.4 Intégration de la Sauvegarde

1. Ajoutez le composant `SaveManager.tsx`
2. Mettez à jour `gameReducer.ts` pour gérer l'action `LOAD_GAME`
3. Mettez à jour `types.ts` avec les nouveaux types pour les sauvegardes

### 4.5 Intégration du Composant Principal

1. Remplacez `PropagationGame.tsx` par la version complète
2. Vérifiez que toutes les importations pointent vers les bons fichiers

## 5. Tests Post-Intégration

Après l'intégration, testez les fonctionnalités suivantes :

### 5.1 Système de Sauvegarde
- [x] Sauvegarde manuelle
- [x] Chargement de sauvegarde
- [x] Auto-sauvegarde
- [x] Export/Import de sauvegardes
- [x] Réinitialisation du jeu

### 5.2 Système de Gaslighting
- [x] Effets de notification
- [x] Effets visuels sur l'interface
- [x] Fréquence appropriée (non intrusive)
- [x] Variété des messages

### 5.3 Corrections de Bugs
- [x] Affichage correct des statuts de propagation de théories
- [x] Interactions avec le système d'ères

## 6. Dépannage

### 6.1 Problèmes de Sauvegarde

**Problème**: Les sauvegardes ne fonctionnent pas
**Solution**: Vérifiez que `localStorage` est disponible (mode privé de certains navigateurs le bloque)

**Problème**: Erreur "localStorage is not defined"
**Solution**: Utilisez la vérification `typeof window !== 'undefined'` avant d'accéder à `localStorage`

### 6.2 Problèmes de Gaslighting

**Problème**: Effets trop fréquents
**Solution**: Ajustez les valeurs de probabilité dans `shouldTriggerGaslight()`

**Problème**: Effets visuels ne fonctionnent pas
**Solution**: Vérifiez que `gaslighting.css` est correctement importé

### 6.3 Problèmes de Type

**Problème**: Erreurs TypeScript avec le nouveau réducteur
**Solution**: Assurez-vous que `ExtendedGameAction` est correctement défini et utilisé

## 7. Personnalisation

Le système est conçu pour être facilement personnalisable :

### 7.1 Ajuster la Fréquence du Gaslighting
Modifiez les valeurs dans `shouldTriggerGaslight()` dans `gaslightingService.ts`

### 7.2 Ajouter de Nouveaux Effets
Ajoutez de nouvelles entrées dans `gaslightEffects` dans `gaslightingService.ts`

### 7.3 Modifier l'Interface de Sauvegarde
Personnalisez le composant `SaveManager.tsx` selon vos besoins

## 8. Prochaines Étapes

Une fois l'intégration réussie, considérez ces améliorations futures :

1. **Persistance cloud** : Ajoutez une option de sauvegarde dans le cloud
2. **Effets sonores** : Intégrez des effets audio subtils pour le gaslighting
3. **Achievements** : Créez un système de succès pour récompenser la progression
4. **Statistiques avancées** : Ajoutez des graphiques de progression des ressources
5. **Mode multijoueur** : Permettez aux joueurs de partager leurs théories/stats

Ces systèmes élèvent "Propagation" d'un simple jeu incrémental à une expérience méta-réflexive unique qui renforce son thème central tout en offrant une expérience utilisateur améliorée.