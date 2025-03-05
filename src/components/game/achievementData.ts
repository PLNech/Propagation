import { Achievement, GameState } from '@/types';

/**
 * List of all achievements in the game
 */
export const achievements: Achievement[] = [
  // Progression Achievements
  {
    id: 'first_steps',
    name: 'Premiers Pas dans la Manipulation',
    description: 'Cliquez 50 fois sur le bouton "Manipuler". Tout le monde commence quelque part.',
    category: 'progression',
    rarity: 'common',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'action_count',
      target: 'manipulate_clicks',
      count: 50
    },
    icon: '👣',
    color: 'bg-blue-100 text-blue-800',
    shareText: 'Je fais mes premiers pas dans l\'art de la manipulation dans #Propagation. Un long chemin vers l\'influence m\'attend !'
  },
  {
    id: 'middle_ages_unlocked',
    name: 'Obscurantisme Éclairé',
    description: 'Débloquez l\'ère du Moyen Âge. Les manuscrits enluminés cachent parfois des vérités sombres.',
    category: 'progression',
    rarity: 'common',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'progression',
      target: 'era_unlocked',
      threshold: 1, // index of Middle Ages
      compare: 'equal'
    },
    reward: {
      type: 'resource_multiplier',
      target: 'credibility',
      value: 1.1,
      description: '+10% de crédibilité'
    },
    icon: '🏰',
    color: 'bg-amber-100 text-amber-800',
    shareText: 'J\'ai débloqué le Moyen Âge dans #Propagation ! Qui a besoin de la Renaissance quand on peut manipuler avec des manuscrits ?'
  },
  {
    id: 'industrial_unlocked',
    name: 'Presse à Impressionner',
    description: 'Débloquez l\'ère Industrielle. La presse peut imprimer des journaux... ou des mensonges en masse.',
    category: 'progression',
    rarity: 'uncommon',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'progression',
      target: 'era_unlocked',
      threshold: 2, // index of Industrial era
      compare: 'equal'
    },
    reward: {
      type: 'resource_multiplier',
      target: 'networks',
      value: 1.2,
      description: '+20% de réseaux'
    },
    icon: '🏭',
    color: 'bg-gray-100 text-gray-800',
    shareText: 'L\'ère Industrielle est à moi dans #Propagation ! Propager des mensonges n\'a jamais été aussi efficace !'
  },
  {
    id: 'coldwar_unlocked',
    name: 'Rideau de Fumée',
    description: 'Débloquez l\'ère de la Guerre Froide. Dans un monde bipolaire, la vérité est la première victime.',
    category: 'progression',
    rarity: 'rare',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'progression',
      target: 'era_unlocked',
      threshold: 3, // index of Cold War era
      compare: 'equal'
    },
    reward: {
      type: 'resource_multiplier',
      target: 'influence',
      value: 1.3,
      description: '+30% d\'influence'
    },
    icon: '☢️',
    color: 'bg-red-100 text-red-800',
    shareText: 'La Guerre Froide débloquée dans #Propagation ! Je fais de la propagande comme au bon vieux temps de McCarthy !'
  },
  {
    id: 'digital_unlocked',
    name: 'Viralisateur',
    description: 'Débloquez l\'ère Numérique. Les bulles de filtres font de vous ce que vous voulez voir.',
    category: 'progression',
    rarity: 'epic',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'progression',
      target: 'era_unlocked',
      threshold: 4, // index of Digital era
      compare: 'equal'
    },
    reward: {
      type: 'resource_multiplier',
      target: 'manipulationPoints',
      value: 1.5,
      description: '+50% de points de manipulation'
    },
    icon: '💻',
    color: 'bg-purple-100 text-purple-800',
    shareText: 'Ère Numérique maîtrisée dans #Propagation ! Mes algorithmes vous font voir exactement ce que je veux que vous croyiez !'
  },
  
  // Resource Achievements
  {
    id: 'credibility_100',
    name: 'Voix de la Raison',
    description: 'Atteignez 100 points de Crédibilité. On commence à vous écouter.',
    category: 'resources',
    rarity: 'common',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'resource_threshold',
      target: 'credibility',
      threshold: 100,
      compare: 'greater'
    },
    icon: '👂',
    color: 'bg-green-100 text-green-800',
    shareText: 'On m\'écoute enfin dans #Propagation ! 100 de Crédibilité, c\'est comme ça qu\'on commence à contrôler l\'info !'
  },
  {
    id: 'influence_500',
    name: 'Influenceur en Herbe',
    description: 'Atteignez 500 points d\'Influence. Votre voix porte plus loin.',
    category: 'resources',
    rarity: 'uncommon',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'resource_threshold',
      target: 'influence',
      threshold: 500,
      compare: 'greater'
    },
    reward: {
      type: 'resource_bonus',
      target: 'networks',
      value: 50,
      description: '+50 réseaux'
    },
    icon: '🔊',
    color: 'bg-purple-100 text-purple-800',
    shareText: 'Avec 500 d\'Influence dans #Propagation, je suis plus influent que certains "experts" TV !'
  },
  {
    id: 'networks_1000',
    name: 'Tisseur de Toiles',
    description: 'Atteignez 1000 points de Réseaux. Votre toile s\'étend dans tous les coins.',
    category: 'resources',
    rarity: 'rare',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'resource_threshold',
      target: 'networks',
      threshold: 1000,
      compare: 'greater'
    },
    reward: {
      type: 'resource_bonus',
      target: 'credibility',
      value: 100,
      description: '+100 crédibilité'
    },
    icon: '🕸️',
    color: 'bg-blue-100 text-blue-800',
    shareText: 'Ma toile d\'influence atteint 1000 Réseaux dans #Propagation ! Une araignée serait jalouse de mon réseau !'
  },
  {
    id: 'manipulation_2000',
    name: 'Maestro des Esprits',
    description: 'Accumulez 2000 points de Manipulation. Les pensées des autres deviennent votre instrument.',
    category: 'resources',
    rarity: 'epic',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'resource_threshold',
      target: 'manipulationPoints',
      threshold: 2000,
      compare: 'greater'
    },
    reward: {
      type: 'resource_multiplier',
      target: 'manipulationPoints',
      value: 1.2,
      description: '+20% de génération de points de manipulation'
    },
    icon: '🎭',
    color: 'bg-red-100 text-red-800',
    shareText: 'Avec 2000 points de Manipulation dans #Propagation, je joue de l\'esprit humain comme d\'un violon ! 🎻'
  },
  {
    id: 'resource_millionaire',
    name: 'Oligarque de l\'Information',
    description: 'Possédez 1000 de chaque ressource simultanément. Le monde est votre échiquier.',
    category: 'resources',
    rarity: 'legendary',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'specific_combination',
      customCheck: (state: GameState) => {
        return state.resources.credibility >= 1000 &&
               state.resources.influence >= 1000 &&
               state.resources.networks >= 1000 &&
               state.resources.manipulationPoints >= 1000;
      }
    },
    reward: {
      type: 'special_effect',
      description: 'Débloque l\'accomplissement secret "Qu\'est-ce qu\'on fait maintenant ?"'
    },
    icon: '👑',
    color: 'bg-yellow-100 text-yellow-800',
    shareText: 'Je contrôle TOUTE l\'information dans #Propagation ! Avec 1000+ de chaque ressource, je suis pratiquement un dieu de la propagande !'
  },
  
  // Ethics Achievements
  {
    id: 'ethical_choice_first',
    name: 'Première Conscience',
    description: 'Effectuez votre première action éthique. La manipulation a-t-elle vraiment un prix?',
    category: 'ethics',
    rarity: 'common',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'action_count',
      target: 'ethical_actions',
      count: 1
    },
    icon: '🌱',
    color: 'bg-green-100 text-green-800',
    shareText: 'J\'ai fait ma première action éthique dans #Propagation ! Il paraît qu\'on peut gagner sans manipuler... on verra bien !'
  },
  {
    id: 'critical_thinking_50',
    name: 'Éveil du Doute',
    description: 'Atteignez 50 de Pensée Critique. Vous commencez à questionner vos propres méthodes.',
    category: 'ethics',
    rarity: 'uncommon',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'resource_threshold',
      target: 'criticalThinking',
      threshold: 50,
      compare: 'greater'
    },
    reward: {
      type: 'resource_multiplier',
      target: 'credibility',
      value: 1.15,
      description: '+15% de crédibilité'
    },
    icon: '🤔',
    color: 'bg-blue-100 text-blue-800',
    shareText: 'J\'atteins 50 de Pensée Critique dans #Propagation ! Je commence à me demander si ce jeu n\'est pas en train de ME manipuler... 🧐'
  },
  {
    id: 'ethical_score_75',
    name: 'Bonne Conscience',
    description: 'Atteignez un score Éthique de 75. Vous privilégiez la vérité à la manipulation.',
    category: 'ethics',
    rarity: 'rare',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'resource_threshold',
      target: 'ethicalScore',
      threshold: 75,
      compare: 'greater'
    },
    reward: {
      type: 'special_effect',
      description: 'Révèle un indice sur l\'accomplissement secret "Méta-éthique"'
    },
    icon: '😇',
    color: 'bg-green-100 text-green-800',
    shareText: 'Score Éthique 75+ dans #Propagation ! Je suis tellement moral que j\'en deviens presque ennuyeux...'
  },
  {
    id: 'ethical_mode_switch',
    name: 'Changement de Paradigme',
    description: 'Passez du mode Manipulation au mode Révélation. Est-ce un nouveau départ ou une manipulation plus subtile?',
    category: 'ethics',
    rarity: 'rare',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'special_action',
      target: 'switch_to_revelation'
    },
    icon: '🔄',
    color: 'bg-indigo-100 text-indigo-800',
    shareText: 'J\'ai basculé vers le mode Révélation dans #Propagation ! Plus de manipulation... ou est-ce juste une méta-manipulation ? 🤯'
  },
  
  // Manipulation Achievements
  {
    id: 'first_theory',
    name: 'Apprenti Conspirateur',
    description: 'Propagez votre première théorie du complot. C\'est si facile de semer le doute.',
    category: 'manipulation',
    rarity: 'common',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'action_count',
      target: 'theories_propagated',
      count: 1
    },
    icon: '🔍',
    color: 'bg-orange-100 text-orange-800',
    shareText: 'Je viens de lancer ma première théorie du complot dans #Propagation ! On dit que c\'est addictif... 👀'
  },
  {
    id: 'theory_master',
    name: 'Maître Complotiste',
    description: 'Propagez 10 théories du complot. Pourquoi se contenter d\'une simple vérité quand on peut en créer de multiples?',
    category: 'manipulation',
    rarity: 'epic',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'action_count',
      target: 'theories_propagated',
      count: 10
    },
    reward: {
      type: 'resource_multiplier',
      target: 'influence',
      value: 1.25,
      description: '+25% d\'influence'
    },
    icon: '🌪️',
    color: 'bg-red-100 text-red-800',
    shareText: 'J\'ai propagé 10 théories du complot dans #Propagation ! À ce stade, même moi je ne sais plus ce qui est vrai... 🤪'
  },
  {
    id: 'ethical_zero',
    name: 'Abîme Moral',
    description: 'Atteignez un score Éthique de 0. Vous êtes au-delà des considérations morales.',
    category: 'manipulation',
    rarity: 'legendary',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'resource_threshold',
      target: 'ethicalScore',
      threshold: 0,
      compare: 'equal'
    },
    reward: {
      type: 'resource_multiplier',
      target: 'manipulationPoints',
      value: 1.5,
      description: '+50% de points de manipulation'
    },
    icon: '😈',
    color: 'bg-black text-red-500',
    shareText: 'J\'ai atteint 0 d\'Éthique dans #Propagation ! Toute ressemblance avec des personnalités existantes serait purement fortuite... 😈'
  },
  
  // Meta Achievements
  {
    id: 'first_achievement',
    name: 'Méta-Récompense',
    description: 'Obtenez votre premier accomplissement. Oui, celui-ci. C\'est récursif.',
    category: 'meta',
    rarity: 'common',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'special_action',
      target: 'first_achievement'
    },
    icon: '🏆',
    color: 'bg-yellow-100 text-yellow-800',
    shareText: 'Je viens d\'obtenir un accomplissement pour avoir obtenu un accomplissement dans #Propagation ! C\'est méta, non ?'
  },
  {
    id: 'share_achievement',
    name: 'Propagateur Viral',
    description: 'Partagez un accomplissement sur les réseaux sociaux. La manipulation s\'étend au-delà du jeu.',
    category: 'meta',
    rarity: 'uncommon',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'special_action',
      target: 'share_achievement'
    },
    reward: {
      type: 'resource_bonus',
      target: 'networks',
      value: 100,
      description: '+100 réseaux'
    },
    icon: '📱',
    color: 'bg-blue-100 text-blue-800',
    shareText: 'Je viens de partager un accomplissement de #Propagation... ce qui m\'a donné cet accomplissement que je partage maintenant ! #PropagationCeption'
  },
  {
    id: 'spot_gaslight',
    name: 'Détecteur de Manipulation',
    description: 'Repérez et cliquez sur un effet de gaslighting. Vous commencez à voir à travers la matrice.',
    category: 'meta',
    rarity: 'rare',
    isSecret: false,
    unlocked: false,
    condition: {
      type: 'special_action',
      target: 'click_gaslight_effect'
    },
    reward: {
      type: 'resource_bonus',
      target: 'criticalThinking',
      value: 5,
      description: '+5 pensée critique'
    },
    icon: '👁️',
    color: 'bg-purple-100 text-purple-800',
    shareText: 'J\'ai repéré un effet de gaslighting dans #Propagation ! Le jeu essaie de me manipuler, mais je vois clair dans son petit jeu ! 👀'
  },
  
  // Secret Achievements
  {
    id: 'reverse_manipulation',
    name: 'Manipulant Manipulé',
    description: 'Cliquez 1000 fois sur Manipuler... pour découvrir que c\'est vous qui êtes manipulé par le jeu.',
    category: 'secret',
    rarity: 'epic',
    isSecret: true,
    hint: 'Parfois, celui qui croit manipuler est lui-même manipulé...',
    unlocked: false,
    condition: {
      type: 'action_count',
      target: 'manipulate_clicks',
      count: 1000
    },
    icon: '🪞',
    color: 'bg-indigo-100 text-indigo-800',
    shareText: 'Après 1000 clics dans #Propagation, j\'ai réalisé une vérité troublante : je manipule ou JE SUIS manipulé ? 🤯'
  },
  {
    id: 'schrodingers_ethics',
    name: 'Éthique de Schrödinger',
    description: 'Atteignez simultanément 100 de Pensée Critique et 0 d\'Éthique. Une conscience aiguisée au service d\'une morale éteinte.',
    category: 'secret',
    rarity: 'legendary',
    isSecret: true,
    hint: 'Peut-on voir clairement tout en choisissant l\'obscurité ?',
    unlocked: false,
    condition: {
      type: 'specific_combination',
      customCheck: (state: GameState) => {
        return state.criticalThinking >= 100 && state.ethicalScore <= 0;
      }
    },
    icon: '🐱',
    color: 'bg-gray-900 text-green-300',
    shareText: 'Dans #Propagation, j\'ai atteint l\'impossible : 100% de lucidité, 0% de morale. Je vois parfaitement le mal que je fais ! 🐱📦'
  },
  {
    id: 'what_now',
    name: 'Qu\'est-ce qu\'on fait maintenant ?',
    description: 'Débloqué toutes les ères et accumulé 10,000+ de chaque ressource. Vous avez "fini" le jeu... ou est-ce que le jeu vous a fini ?',
    category: 'secret',
    rarity: 'legendary',
    isSecret: true,
    hint: 'Au sommet de la montagne, quelle vue reste-t-il à conquérir ?',
    unlocked: false,
    condition: {
      type: 'specific_combination',
      customCheck: (state: GameState) => {
        const allErasUnlocked = state.eras.every(era => era.unlocked);
        return allErasUnlocked && 
               state.resources.credibility >= 10000 &&
               state.resources.influence >= 10000 &&
               state.resources.networks >= 10000 &&
               state.resources.manipulationPoints >= 10000;
      }
    },
    icon: '🏁',
    color: 'bg-black text-white',
    shareText: 'J\'ai "fini" #Propagation... ou ai-je seulement commencé à comprendre son vrai message ? 10,000+ de chaque ressource, et maintenant ? 🤔'
  },
  {
    id: 'meta_ethics',
    name: 'Méta-Éthique',
    description: 'Obtenez tous les accomplissements de la catégorie Éthique. Le jeu vous a-t-il vraiment rendu plus éthique, ou juste plus conscient de la manipulation ?',
    category: 'secret',
    rarity: 'epic',
    isSecret: true,
    hint: 'Comprendre l\'éthique et la pratiquer sont deux choses distinctes.',
    unlocked: false,
    condition: {
      type: 'specific_combination',
      customCheck: (state: GameState) => {
        const ethicsAchievements = state.achievementState.achievements.filter(
          a => a.category === 'ethics' && a.id !== 'meta_ethics'
        );
        return ethicsAchievements.every(a => a.unlocked);
      }
    },
    icon: '🧠',
    color: 'bg-green-900 text-white',
    shareText: 'J\'ai obtenu tous les accomplissements éthiques dans #Propagation ! Suis-je vraiment devenu plus éthique, ou juste plus conscient de ne pas l\'être ? 🤔'
  }
];

/**
 * Initial achievement state
 */
export const initialAchievementState = {
  achievements: achievements.map(achievement => ({ ...achievement, unlocked: false })),
  totalUnlocked: 0,
  totalAchievements: achievements.length,
  newUnlocked: [],
  showAchievementModal: false,
  selectedAchievementId: null
};