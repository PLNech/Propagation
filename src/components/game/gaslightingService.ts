import { GameState } from './types';

/**
 * Types d'effets de gaslighting disponibles
 */
export type GaslightEffectType = 
  | 'notification'   // Simple notification textuelle
  | 'ui_change'      // Changement d'interface (boutons, couleurs)
  | 'data_change'    // Suggère que les données ont changé
  | 'discourage'     // Tente de décourager le joueur
  | 'fourth_wall'    // Brise le quatrième mur
  | 'game_doubt'     // Fait douter du fonctionnement du jeu
  | 'memory_doubt'   // Fait douter des souvenirs du joueur
  | 'conspiracy'     // Théorie conspirationniste sur le jeu
  | 'scare';         // Effet effrayant/troublant

/**
 * Structure d'un effet de gaslighting
 */
export interface GaslightEffect {
  id: string;
  type: GaslightEffectType;
  message?: string;
  uiChanges?: {
    targetId?: string;
    targetClass?: string;
    cssClass?: string;
    tempText?: string;
    color?: string;
    duration?: number;
  };
  condition?: (state: GameState, interactionLevel: number) => boolean;
  weight: number; // Probabilité relative (plus élevée = plus fréquent)
  cooldown: number; // Temps minimum entre deux apparitions (en minutes)
  intensity: 1 | 2 | 3; // 1 = subtil, 2 = notable, 3 = fort
  lastTriggered?: number; // Timestamp de dernière occurrence
}

/**
 * Base d'effets de gaslighting
 */
export const gaslightEffects: GaslightEffect[] = [
  // Effets de type notification (simples messages)
  {
    id: 'interface_glitch',
    type: 'notification',
    message: "L'interface a-t-elle juste... glitché? Étrange.",
    weight: 6,
    cooldown: 60,
    intensity: 1
  },
  {
    id: 'data_change_subtle',
    type: 'notification',
    message: "Certaines de vos données semblent avoir changé quand vous ne regardiez pas.",
    weight: 5,
    cooldown: 90,
    intensity: 1
  },
  {
    id: 'being_watched',
    type: 'notification',
    message: "Vous avez la sensation étrange d'être observé pendant que vous jouez.",
    weight: 4,
    cooldown: 120,
    intensity: 2
  },
  {
    id: 'secret_rules',
    type: 'notification',
    message: "Avez-vous découvert les règles cachées du jeu? Certains joueurs affirment qu'elles existent.",
    weight: 5,
    cooldown: 90,
    intensity: 1
  },
  {
    id: 'deja_vu',
    type: 'notification',
    message: "N'avez-vous pas déjà vécu ce moment exact dans le jeu?",
    weight: 5,
    cooldown: 45,
    intensity: 1
  },
  {
    id: 'not_alone',
    type: 'notification',
    message: "Certains joueurs signalent des activités dans le jeu même quand ils ne jouent pas.",
    weight: 4,
    cooldown: 120,
    intensity: 2
  },
  {
    id: 'lost_time',
    type: 'notification',
    message: "Le compteur de temps ne semble pas correspondre à votre sensation du temps passé.",
    weight: 3,
    cooldown: 150,
    intensity: 2
  },
  
  // Effets de changement d'interface
  {
    id: 'button_move',
    type: 'ui_change',
    uiChanges: {
      targetClass: 'button',
      cssClass: 'gaslight-wiggle',
      duration: 2000
    },
    weight: 3,
    cooldown: 180,
    intensity: 2
  },
  {
    id: 'color_shift',
    type: 'ui_change',
    uiChanges: {
      targetClass: 'bg-gray-800',
      cssClass: 'gaslight-color-shift',
      duration: 3000
    },
    weight: 4,
    cooldown: 120,
    intensity: 1
  },
  {
    id: 'manipulate_button_text',
    type: 'ui_change',
    uiChanges: {
      targetId: 'manipulate-button',
      tempText: 'Manipulé?',
      duration: 1500
    },
    weight: 2,
    cooldown: 150,
    intensity: 2
  },
  {
    id: 'tab_swap',
    type: 'ui_change',
    message: "Un onglet vient de changer brièvement de nom...",
    weight: 2,
    cooldown: 210,
    intensity: 2
  },
  
  // Effets suggérant des changements de données
  {
    id: 'resource_jump',
    type: 'data_change',
    message: "Vos ressources semblent avoir légèrement fluctué. Est-ce votre imagination?",
    weight: 3,
    cooldown: 90,
    intensity: 1
  },
  {
    id: 'stats_shift',
    type: 'data_change',
    message: "Votre score éthique était-il différent la dernière fois que vous avez regardé?",
    weight: 3,
    cooldown: 120,
    intensity: 2
  },
  {
    id: 'save_corrupt',
    type: 'data_change',
    message: "Attention: Certaines sauvegardes semblent corrompues. Ce n'est peut-être pas une bonne idée de les charger.",
    weight: 1,
    cooldown: 300,
    intensity: 3,
    condition: (state, level) => level > 15
  },
  
  // Effets décourageants
  {
    id: 'pointless_game',
    type: 'discourage',
    message: "Pourquoi continuer à jouer? Les mécanismes se répètent indéfiniment.",
    weight: 1,
    cooldown: 240,
    intensity: 3,
    condition: (state, level) => level > 20
  },
  {
    id: 'waste_time',
    type: 'discourage',
    message: "Vous avez passé beaucoup de temps sur ce jeu. Est-ce vraiment ce que vous vouliez faire de votre journée?",
    weight: 1,
    cooldown: 180,
    intensity: 3,
    condition: (state, level) => level > 25
  },
  {
    id: 'nothing_matters',
    type: 'discourage',
    message: "Peu importe vos choix, le jeu finit toujours par vous manipuler.",
    weight: 2,
    cooldown: 150,
    intensity: 2,
    condition: (state, level) => level > 15
  },
  {
    id: 'ethical_futility',
    type: 'discourage',
    message: "L'éthique est-elle même pertinente dans un jeu conçu pour vous faire manipuler?",
    weight: 2,
    cooldown: 120,
    intensity: 2,
    condition: (state, level) => level * 0 + state.ethicalScore > 70
  },
  
  // Effets brisant le quatrième mur
  {
    id: 'watching_you',
    type: 'fourth_wall',
    message: "Ce jeu collecte plus de données sur vous que vous ne le pensez.",
    weight: 1,
    cooldown: 240,
    intensity: 3,
    condition: (state, level) => level > 18
  },
  {
    id: 'browser_permissions',
    type: 'fourth_wall',
    message: "Avez-vous vérifié quelles permissions ce jeu a sur votre navigateur?",
    weight: 1,
    cooldown: 210,
    intensity: 3,
    condition: (state, level) => level > 20
  },
  {
    id: 'not_just_game',
    type: 'fourth_wall',
    message: "Ce n'est pas qu'un jeu. C'est une expérience sociale.",
    weight: 2,
    cooldown: 180,
    intensity: 2,
    condition: (state, level) => level > 12
  },
  
  // Effets faisant douter du jeu
  {
    id: 'game_sentient',
    type: 'game_doubt',
    message: "Le jeu semble réagir différemment selon vos choix... au-delà de sa programmation.",
    weight: 2,
    cooldown: 150,
    intensity: 2,
    condition: (state, level) => level > 15
  },
  {
    id: 'hidden_mechanics',
    type: 'game_doubt',
    message: "Il y a des mécaniques cachées que le développeur n'a jamais documentées.",
    weight: 3,
    cooldown: 120,
    intensity: 2
  },
  {
    id: 'pattern_recognition',
    type: 'game_doubt',
    message: "Le jeu apprend de vos habitudes. Il s'adapte.",
    weight: 2,
    cooldown: 180,
    intensity: 2,
    condition: (state, level) => level > 10
  },
  
  // Effets faisant douter de la mémoire
  {
    id: 'different_description',
    type: 'memory_doubt',
    message: "Cette théorie avait une description différente hier, non?",
    weight: 3,
    cooldown: 90,
    intensity: 1
  },
  {
    id: 'remember_differently',
    type: 'memory_doubt',
    message: "Vous vous souvenez différemment de cette partie du jeu...",
    weight: 3,
    cooldown: 120,
    intensity: 2
  },
  {
    id: 'missing_feature',
    type: 'memory_doubt',
    message: "N'y avait-il pas une autre fonctionnalité ici auparavant?",
    weight: 2,
    cooldown: 150,
    intensity: 2,
    condition: (state, level) => level > 10
  },
  
  // Théories conspirationnistes
  {
    id: 'meta_experiment',
    type: 'conspiracy',
    message: "Ce jeu fait partie d'une expérience plus vaste sur la susceptibilité à la manipulation.",
    weight: 1,
    cooldown: 300,
    intensity: 3,
    condition: (state, level) => level > 25
  },
  {
    id: 'player_data',
    type: 'conspiracy',
    message: "Vos choix dans ce jeu sont analysés pour créer votre profil psychologique.",
    weight: 1,
    cooldown: 270,
    intensity: 3,
    condition: (state, level) => level > 20
  },
  {
    id: 'dev_watching',
    type: 'conspiracy',
    message: "Le développeur observe votre partie en ce moment même.",
    weight: 2,
    cooldown: 240,
    intensity: 2,
    condition: (state, level) => level > 15
  },
  
  // Effets effrayants/troublants
  {
    id: 'game_alive',
    type: 'scare',
    message: "Le jeu a continué à fonctionner pendant que vous étiez absent. Il n'est pas censé faire ça.",
    weight: 1,
    cooldown: 360,
    intensity: 3,
    condition: (state, level) => level > 30
  },
  {
    id: 'player_name',
    type: 'scare',
    message: () => `${navigator.platform === 'Win32' ? 'Windows' : 'Votre système'} a partagé votre nom avec le jeu.`,
    weight: 1,
    cooldown: 480,
    intensity: 3,
    condition: (state, level) => level > 35
  },
  {
    id: 'not_alone_scary',
    type: 'scare',
    message: "Vous n'êtes pas seul à jouer à ce jeu en ce moment. Sur cet appareil.",
    weight: 1,
    cooldown: 720,
    intensity: 3,
    condition: (state, level) => level > 40
  }
];

/**
 * Sélectionne un effet de gaslighting basé sur l'état du jeu et le niveau d'interaction
 * @param state État actuel du jeu
 * @param interactionLevel Niveau d'interaction du joueur (0-100)
 * @returns Effet de gaslighting à appliquer, ou null si aucun
 */
export const selectGaslightEffect = (
  state: GameState,
  interactionLevel: number
): GaslightEffect | null => {
  // Si le niveau d'interaction est trop bas, pas de gaslighting
  if (interactionLevel < 5) return null;
  
  const now = Date.now();
  
  // Filtrer les effets disponibles (pas en cooldown et conditions remplies)
  const availableEffects = gaslightEffects.filter(effect => {
    // Vérifier le cooldown
    const lastTriggered = effect.lastTriggered || 0;
    const cooldownMs = effect.cooldown * 60 * 1000; // convertir minutes en ms
    const isCooldownOver = now - lastTriggered > cooldownMs;
    
    // Vérifier les conditions spécifiques
    const conditionMet = !effect.condition || effect.condition(state, interactionLevel);
    
    // Filtrage par intensité selon le niveau d'interaction
    let intensityAppropriate = true;
    
    if (interactionLevel < 10) {
      // Au début, seulement les effets subtils
      intensityAppropriate = effect.intensity === 1;
    } else if (interactionLevel < 20) {
      // Niveau intermédiaire: effets subtils et notables
      intensityAppropriate = effect.intensity <= 2;
    }
    // À un niveau élevé, tous les effets sont disponibles
    
    return isCooldownOver && conditionMet && intensityAppropriate;
  });
  
  // Si aucun effet n'est disponible, retourner null
  if (availableEffects.length === 0) return null;
  
  // Choisir un effet basé sur le poids
  const totalWeight = availableEffects.reduce((sum, effect) => sum + effect.weight, 0);
  let randomValue = Math.random() * totalWeight;
  
  for (const effect of availableEffects) {
    randomValue -= effect.weight;
    if (randomValue <= 0) {
      // Mettre à jour le timestamp de dernière occurrence
      const updatedEffect = { ...effect, lastTriggered: now };
      
      // Mettre à jour l'effet dans la liste globale
      const index = gaslightEffects.findIndex(e => e.id === effect.id);
      if (index !== -1) {
        gaslightEffects[index] = updatedEffect;
      }
      
      return updatedEffect;
    }
  }
  
  // Fallback au premier effet disponible
  return availableEffects[0];
};

/**
 * Décide si un effet de gaslighting doit être déclenché
 * @param interactionLevel Niveau d'interaction du joueur (0-100)
 * @returns True si un effet devrait être déclenché
 */
export const shouldTriggerGaslight = (interactionLevel: number): boolean => {
  // Ajuster la probabilité selon le niveau d'interaction
  // Plus le joueur interagit, plus la probabilité augmente
  
  // Base: très faible probabilité
  let baseProbability = 0.03; // 3%
  
  // Ajuster selon le niveau d'interaction
  // - Jusqu'à 10: probabilité très faible
  // - 10-30: probabilité augmente progressivement
  // - 30+: probabilité plus élevée mais toujours rare
  if (interactionLevel < 10) {
    baseProbability = 0.01; // 1%
  } else if (interactionLevel < 30) {
    baseProbability = 0.01 + (interactionLevel - 10) * 0.002; // 1% à 5%
  } else {
    baseProbability = 0.05 + Math.min(0.05, (interactionLevel - 30) * 0.001); // 5% à 10% max
  }
  
  // Ajouter un élément aléatoire pour éviter la prévisibilité
  return Math.random() < baseProbability;
};

/**
 * Applique un effet de changement d'interface
 * @param effect Effet à appliquer
 */
export const applyUIChange = (effect: GaslightEffect): void => {
  if (!effect.uiChanges) return;
  
  const {
    targetId,
    targetClass,
    cssClass,
    tempText,
    color,
    duration = 2000
  } = effect.uiChanges;
  
  // Trouver les éléments cibles
  let elements: HTMLElement[] = [];
  
  if (targetId) {
    const element = document.getElementById(targetId);
    if (element) elements.push(element);
  }
  
  if (targetClass) {
    const classElements = Array.from(document.getElementsByClassName(targetClass)) as HTMLElement[];
    elements = [...elements, ...classElements];
  }
  
  // Si aucun élément trouvé, sortir
  if (elements.length === 0) return;
  
  // Appliquer les changements
  elements.forEach(element => {
    // Sauvegarder l'état initial
    const originalText = element.innerText;
    // const originalClassList = [...element.classList]; Was unused, maybe should be preserved?
    const originalColor = element.style.color;
    
    // Appliquer les changements
    if (cssClass) element.classList.add(cssClass);
    if (tempText) element.innerText = tempText;
    if (color) element.style.color = color;
    
    // Restaurer après la durée spécifiée
    setTimeout(() => {
      if (cssClass) element.classList.remove(cssClass);
      if (tempText) element.innerText = originalText;
      if (color) element.style.color = originalColor;
    }, duration);
  });
};

/**
 * Style CSS pour les effets de gaslighting
 */
export const gaslightingCSS = `
  /* Effet de tremblement léger pour les boutons */
  @keyframes gaslightWiggle {
    0% { transform: translateX(0); }
    25% { transform: translateX(2px); }
    50% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
    100% { transform: translateX(0); }
  }
  
  .gaslight-wiggle {
    animation: gaslightWiggle 0.5s ease-in-out;
  }
  
  /* Effet de changement de couleur subtil */
  @keyframes gaslightColorShift {
    0% { background-color: var(--original-color, #1f2937); }
    50% { background-color: var(--shift-color, #1a1f2e); }
    100% { background-color: var(--original-color, #1f2937); }
  }
  
  .gaslight-color-shift {
    animation: gaslightColorShift 2s ease-in-out;
    --original-color: #1f2937;
    --shift-color: #1a1f2e;
  }
  
  /* Effet de flou temporaire */
  @keyframes gaslightBlur {
    0% { filter: blur(0); }
    50% { filter: blur(1px); }
    100% { filter: blur(0); }
  }
  
  .gaslight-blur {
    animation: gaslightBlur 2s ease-in-out;
  }
`;

/**
 * Initialise les styles CSS pour les effets de gaslighting
 */
export const initializeGaslightingStyles = (): void => {
  // Vérifier si les styles sont déjà ajoutés
  if (document.getElementById('gaslighting-styles')) return;
  
  // Créer l'élément style
  const styleElement = document.createElement('style');
  styleElement.id = 'gaslighting-styles';
  styleElement.textContent = gaslightingCSS;
  
  // Ajouter au head
  document.head.appendChild(styleElement);
};