import { Achievement, GameState } from '@/types';

export const initialAchievements: Achievement[] = [
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
  },
];


// 1. ENDING ACHIEVEMENTS - One for each game ending
export const endingAchievements: Achievement[] = [
    {
      id: 'ending_master_manipulator',
      name: 'Maître Manipulateur',
      description: 'Atteindre la fin "Maître Manipulateur". Votre influence est immense, mais à quel prix?',
      category: 'progression',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const ending = state.gameEndings.find(e => e.id === 'masterManipulator');
          return !!ending && ending.triggered;
        }
      },
      icon: '🎭',
      color: 'bg-red-100 text-red-800',
      shareText: 'J\'ai atteint la fin "Maître Manipulateur" dans #Propagation. Mon influence est immense, mais à quel prix?'
    },
    {
      id: 'ending_shadow_puppeteer',
      name: 'Marionnettiste de l\'Ombre',
      description: 'Atteindre la fin "Marionnettiste de l\'Ombre". Vous tirez les ficelles sans jamais être vu.',
      category: 'progression',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const ending = state.gameEndings.find(e => e.id === 'shadowPuppeteer');
          return !!ending && ending.triggered;
        }
      },
      icon: '🕸️',
      color: 'bg-red-100 text-red-800',
      shareText: 'J\'ai atteint la fin "Marionnettiste de l\'Ombre" dans #Propagation. Je tire les ficelles sans jamais être vu.'
    },
    {
      id: 'ending_ethical_compromiser',
      name: 'Équilibriste Éthique',
      description: 'Atteindre la fin "Équilibriste Éthique". Vous avez trouvé l\'équilibre entre influence et moralité.',
      category: 'progression',
      rarity: 'epic',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const ending = state.gameEndings.find(e => e.id === 'ethicalCompromiser');
          return !!ending && ending.triggered;
        }
      },
      icon: '⚖️',
      color: 'bg-yellow-100 text-yellow-800',
      shareText: 'J\'ai atteint la fin "Équilibriste Éthique" dans #Propagation. J\'ai trouvé l\'équilibre entre influence et moralité.'
    },
    {
      id: 'ending_truth_seeker',
      name: 'Chercheur de Vérité',
      description: 'Atteindre la fin "Chercheur de Vérité". Vous avez choisi la voie difficile de l\'intégrité.',
      category: 'progression',
      rarity: 'epic',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const ending = state.gameEndings.find(e => e.id === 'truthSeeker');
          return !!ending && ending.triggered;
        }
      },
      icon: '🔍',
      color: 'bg-green-100 text-green-800',
      shareText: 'J\'ai atteint la fin "Chercheur de Vérité" dans #Propagation. J\'ai choisi la voie difficile de l\'intégrité et de la vérité.'
    },
    {
      id: 'ending_enlightener',
      name: 'Éveilleur de Consciences',
      description: 'Atteindre la fin "L\'Éveilleur de Consciences". Vous êtes devenu une figure légendaire de l\'éveil des consciences.',
      category: 'progression',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const ending = state.gameEndings.find(e => e.id === 'enlightener');
          return !!ending && ending.triggered;
        }
      },
      icon: '💡',
      color: 'bg-green-100 text-green-800',
      shareText: 'J\'ai atteint la fin "Éveilleur de Consciences" dans #Propagation. Je suis devenu une légende de l\'éveil des esprits!'
    },
    {
      id: 'ending_rationalist_leader',
      name: 'Leader Rationaliste',
      description: 'Atteindre la fin "Leader Rationaliste". Votre approche méthodique a créé un nouveau modèle de leadership.',
      category: 'progression',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const ending = state.gameEndings.find(e => e.id === 'rationalistLeader');
          return !!ending && ending.triggered;
        }
      },
      icon: '🧠',
      color: 'bg-blue-100 text-blue-800',
      shareText: 'J\'ai atteint la fin "Leader Rationaliste" dans #Propagation. Mon approche méthodique a créé un nouveau modèle de leadership.'
    }
  ];
  
  // 2. LINK-CLICKING ACHIEVEMENTS - Educational exploration
  export const loreAchievements: Achievement[] = [
    {
      id: 'curious_reader',
      name: 'Lecteur Curieux',
      description: 'Cliquer sur 5 liens externes pour approfondir vos connaissances. La curiosité est le premier pas vers la sagesse.',
      category: 'meta',
      rarity: 'common',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          return (state.stats?.clickedLoreLinks?.length || 0) >= 5;
        }
      },
      icon: '📚',
      color: 'bg-blue-100 text-blue-800',
      shareText: 'Je suis un lecteur curieux dans #Propagation, explorant au-delà du jeu pour approfondir mes connaissances!'
    },
    {
      id: 'history_enthusiast',
      name: 'Passionné d\'Histoire',
      description: 'Cliquer sur 10 liens liés à l\'histoire. Le passé est le meilleur professeur pour comprendre le présent.',
      category: 'meta',
      rarity: 'uncommon',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          return (state.stats?.clickedHistoryLinks?.length || 0) >= 10;
        }
      },
      icon: '🏛️',
      color: 'bg-amber-100 text-amber-800',
      shareText: 'Je suis un passionné d\'histoire dans #Propagation. Connaître le passé, c\'est comprendre le présent!'
    },
    {
      id: 'philosophy_adept',
      name: 'Adepte de Philosophie',
      description: 'Cliquer sur 8 liens liés à la philosophie ou à la rationalité. Les idées sont les fondements de notre monde.',
      category: 'meta',
      rarity: 'uncommon',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          return (state.stats?.clickedPhilosophyLinks?.length || 0) >= 8;
        }
      },
      icon: '🧐',
      color: 'bg-indigo-100 text-indigo-800',
      shareText: 'Je suis un adepte de philosophie dans #Propagation. Les idées sont les véritables leviers du pouvoir!'
    },
    {
      id: 'propaganda_analyst',
      name: 'Analyste de Propagande',
      description: 'Cliquer sur 8 liens liés à la propagande et aux techniques de manipulation. Connaître ses méthodes pour mieux s\'en défendre.',
      category: 'meta',
      rarity: 'uncommon',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          return (state.stats?.clickedPropagandaLinks?.length || 0) >= 8;
        }
      },
      icon: '📢',
      color: 'bg-red-100 text-red-800',
      shareText: 'Je suis un analyste de propagande dans #Propagation. Connaître ses méthodes est la première défense contre la manipulation!'
    },
    {
      id: 'knowledge_seeker',
      name: 'Chercheur de Connaissance',
      description: 'Cliquer sur 25 liens externes au total. Votre soif de savoir est insatiable.',
      category: 'meta',
      rarity: 'rare',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          return (state.stats?.clickedLoreLinks?.length || 0) >= 25;
        }
      },
      reward: {
        type: 'resource_bonus',
        target: 'criticalThinking',
        value: 10,
        description: '+10 pensée critique'
      },
      icon: '🔭',
      color: 'bg-purple-100 text-purple-800',
      shareText: 'Je suis un véritable chercheur de connaissance dans #Propagation. J\'ai exploré bien au-delà des limites du jeu!'
    }
  ];
  
  // 3. ADDITIONAL ACHIEVEMENTS - Expanding existing categories
  export const additionalAchievements: Achievement[] = [
    // Progression Achievements
    {
      id: 'all_eras_unlocked',
      name: 'Maître du Temps',
      description: 'Débloquer toutes les ères historiques. Vous avez traversé l\'histoire de la manipulation de l\'information.',
      category: 'progression',
      rarity: 'epic',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => state.eras.every(era => era.unlocked)
      },
      reward: {
        type: 'resource_multiplier',
        target: 'credibility',
        value: 1.5,
        description: '+50% de crédibilité'
      },
      icon: '⏳',
      color: 'bg-purple-100 text-purple-800',
      shareText: 'J\'ai maîtrisé toutes les ères dans #Propagation! De l\'Antiquité à l\'ère numérique, l\'histoire de la manipulation n\'a plus de secrets pour moi.'
    },
    {
      id: 'master_upgrader',
      name: 'Maître des Améliorations',
      description: 'Acheter 20 améliorations différentes. Vous avez perfectionné vos techniques à travers les âges.',
      category: 'progression',
      rarity: 'epic',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => 
          state.upgrades.filter(upgrade => upgrade.purchased).length >= 20
      },
      reward: {
        type: 'resource_multiplier',
        target: 'manipulationPoints',
        value: 1.3,
        description: '+30% de points de manipulation'
      },
      icon: '🔧',
      color: 'bg-blue-100 text-blue-800',
      shareText: 'J\'ai maîtrisé 20 améliorations dans #Propagation! Mes techniques sont parfaitement affûtées à travers les âges.'
    },
    {
      id: 'scenario_master',
      name: 'Maître des Scénarios',
      description: 'Compléter 10 scénarios historiques différents. Vous avez façonné l\'histoire à travers vos choix.',
      category: 'progression',
      rarity: 'rare',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => 
          state.completedScenarios.length >= 10
      },
      icon: '📜',
      color: 'bg-amber-100 text-amber-800',
      shareText: 'J\'ai résolu 10 scénarios historiques dans #Propagation! Mes choix ont façonné l\'histoire de manières surprenantes.'
    },
    
    // Resource Achievements
    {
      id: 'credibility_1000',
      name: 'Parole d\'Or',
      description: 'Atteindre 1000 points de Crédibilité. Vos paroles ont le poids de la vérité absolue.',
      category: 'resources',
      rarity: 'rare',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'resource_threshold',
        target: 'credibility',
        threshold: 1000,
        compare: 'greater'
      },
      reward: {
        type: 'resource_bonus',
        target: 'influence',
        value: 200,
        description: '+200 influence'
      },
      icon: '👑',
      color: 'bg-yellow-100 text-yellow-800',
      shareText: 'Ma parole est d\'or dans #Propagation avec 1000 de Crédibilité! Qui oserait remettre en question ce que je dis?'
    },
    {
      id: 'influence_5000',
      name: 'Influenceur Suprême',
      description: 'Atteindre 5000 points d\'Influence. Des millions de personnes suivent vos directives sans question.',
      category: 'resources',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'resource_threshold',
        target: 'influence',
        threshold: 5000,
        compare: 'greater'
      },
      icon: '👁️',
      color: 'bg-purple-100 text-purple-800',
      shareText: 'Avec 5000 d\'Influence dans #Propagation, je suis l\'Influenceur Suprême! Des millions de personnes suivent mes directives sans question.'
    },
    {
      id: 'networks_5000',
      name: 'Omniréseau',
      description: 'Atteindre 5000 points de Réseaux. Aucune information ne circule sans passer par vos canaux.',
      category: 'resources',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'resource_threshold',
        target: 'networks',
        threshold: 5000,
        compare: 'greater'
      },
      icon: '🌐',
      color: 'bg-blue-100 text-blue-800',
      shareText: 'J\'ai atteint l\'Omniréseau dans #Propagation avec 5000 de Réseaux! Aucune information ne circule sans passer par mes canaux.'
    },
    {
      id: 'balanced_resources',
      name: 'Équilibre Parfait',
      description: 'Avoir exactement le même nombre (≥500) de points de Crédibilité, Influence et Réseaux simultanément.',
      category: 'resources',
      rarity: 'epic',
      isSecret: true,
      hint: 'L\'harmonie parfaite exige une attention méticuleuse aux détails...',
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const { credibility, influence, networks } = state.resources;
          return credibility >= 500 && 
                 credibility === influence && 
                 influence === networks;
        }
      },
      icon: '☯️',
      color: 'bg-gray-100 text-gray-800',
      shareText: 'J\'ai atteint l\'Équilibre Parfait dans #Propagation! Crédibilité, Influence et Réseaux en parfaite harmonie.'
    },
    
    // Ethics Achievements
    {
      id: 'ethical_saint',
      name: 'Saint Éthique',
      description: 'Maintenir un score Éthique de 100 tout en atteignant 2000 d\'Influence. La pureté morale n\'est pas incompatible avec le pouvoir.',
      category: 'ethics',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => 
          state.ethicalScore === 100 && state.resources.influence >= 2000
      },
      reward: {
        type: 'resource_multiplier',
        target: 'credibility',
        value: 2.0,
        description: '+100% de crédibilité'
      },
      icon: '😇',
      color: 'bg-green-100 text-green-800',
      shareText: 'Je suis un Saint Éthique dans #Propagation! J\'ai prouvé que l\'on peut avoir une morale parfaite tout en étant extrêmement influent.'
    },
    {
      id: 'critical_mastermind',
      name: 'Esprit Critique Suprême',
      description: 'Atteindre 100 de Pensée Critique. Votre esprit est une forteresse imprenable contre la manipulation.',
      category: 'ethics',
      rarity: 'epic',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'resource_threshold',
        target: 'criticalThinking',
        threshold: 100,
        compare: 'equal'
      },
      icon: '🧠',
      color: 'bg-blue-100 text-blue-800',
      shareText: 'J\'ai atteint l\'Esprit Critique Suprême dans #Propagation! Mon esprit est une forteresse imprenable contre toute manipulation.'
    },
    {
      id: 'ethical_actions_all',
      name: 'Champion de l\'Éthique',
      description: 'Réaliser toutes les actions éthiques disponibles dans le jeu. Vous êtes un phare moral dans l\'obscurité.',
      category: 'ethics',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const totalActions = state.ethicalActions.length;
          const performedActions = state.ethicalActions.filter(a => a.performed).length;
          return totalActions > 0 && performedActions === totalActions;
        }
      },
      icon: '🌟',
      color: 'bg-green-100 text-green-800',
      shareText: 'Je suis le Champion de l\'Éthique dans #Propagation! J\'ai réalisé toutes les actions éthiques possibles, un vrai phare moral dans l\'obscurité.'
    },
    
    // Manipulation Achievements
    {
      id: 'theory_specialist',
      name: 'Spécialiste des Théories',
      description: 'Propager avec succès 15 théories du complot différentes. Votre créativité n\'a pas de limites.',
      category: 'manipulation',
      rarity: 'epic',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'action_count',
        target: 'theories_propagated',
        count: 15
      },
      icon: '🔮',
      color: 'bg-purple-100 text-purple-800',
      shareText: 'Je suis un Spécialiste des Théories dans #Propagation! J\'ai propagé 15 théories du complot avec succès, façonnant la réalité selon mes désirs.'
    },
    {
      id: 'manipulation_god',
      name: 'Dieu de la Manipulation',
      description: 'Cliquer 10,000 fois sur le bouton Manipuler. Vos doigts sont des instruments de contrôle de masse.',
      category: 'manipulation',
      rarity: 'legendary',
      isSecret: false,
      unlocked: false,
      condition: {
        type: 'action_count',
        target: 'manipulate_clicks',
        count: 10000
      },
      reward: {
        type: 'resource_multiplier',
        target: 'manipulationPoints',
        value: 10.0,
        description: '+900% de points de manipulation'
      },
      icon: '👆',
      color: 'bg-red-100 text-red-800',
      shareText: 'Je suis devenu un Dieu de la Manipulation dans #Propagation avec 10,000 clics! Mes doigts sont des instruments de contrôle de masse.'
    },
    {
      id: 'absolute_zero',
      name: 'Zéro Absolu',
      description: 'Maintenir un score éthique de 0 pendant 10 minutes tout en ayant plus de 1000 d\'influence.',
      category: 'manipulation',
      rarity: 'epic',
      isSecret: true,
      hint: 'Le froid absolu de l\'immoralité a sa propre forme de pouvoir...',
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          // This would need additional tracking in the game state
          return state.ethicalScore === 0 && 
                 state.resources.influence >= 1000 &&
                 (state.stats?.timeAtZeroEthics || 0) >= 600000; // 10 minutes in ms
        }
      },
      icon: '❄️',
      color: 'bg-blue-900 text-white',
      shareText: 'J\'ai atteint le Zéro Absolu dans #Propagation! Une absence totale de morale combinée à une influence écrasante.'
    },
    
    // Meta & Secret Achievements
    {
      id: 'gaslight_master',
      name: 'Maître du Gaslighting',
      description: 'Cliquer sur 10 effets de gaslighting différents. Vous êtes conscient de la manipulation du jeu... ou l\'êtes-vous vraiment?',
      category: 'meta',
      rarity: 'epic',
      isSecret: true,
      hint: 'Le jeu essaie parfois de vous manipuler... ces effets peuvent être cliqués.',
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          return (state.stats?.gaslightEffectsClicked?.length || 0) >= 10;
        }
      },
      icon: '🔥',
      color: 'bg-purple-900 text-white',
      shareText: 'Je suis un Maître du Gaslighting dans #Propagation! Le jeu essaie de me manipuler, mais j\'ai retourné sa propre stratégie contre lui.'
    },
    {
      id: 'all_achievements',
      name: 'Complétionniste',
      description: 'Débloquer tous les autres accomplissements. Votre maîtrise du jeu est totale.',
      category: 'meta',
      rarity: 'legendary',
      isSecret: true,
      hint: 'La perfection est atteinte non pas quand il n\'y a plus rien à ajouter, mais quand il n\'y a plus rien à retirer.',
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          const totalAchievements = state.achievementState.achievements.length;
          const unlockedAchievements = state.achievementState.achievements.filter(a => a.unlocked).length;
          // Excluding itself
          return unlockedAchievements >= totalAchievements - 1;
        }
      },
      icon: '🏆',
      color: 'bg-yellow-400 text-black',
      shareText: 'J\'ai débloqué TOUS les accomplissements dans #Propagation! Ma maîtrise de la manipulation et de l\'éthique est absolue.'
    },
    {
      id: 'speed_manipulator',
      name: 'Manipulateur Éclair',
      description: 'Atteindre l\'ère numérique en moins de 30 minutes de jeu. Votre efficacité est terrifiante.',
      category: 'meta',
      rarity: 'epic',
      isSecret: true,
      hint: 'La vitesse est parfois plus importante que la subtilité...',
      unlocked: false,
      condition: {
        type: 'specific_combination',
        customCheck: (state: GameState) => {
          return state.currentEraId === 'digital' && 
                 (state.stats?.totalPlayTime || 0) <= 1800000; // 30 minutes in ms
        }
      },
      icon: '⚡',
      color: 'bg-yellow-100 text-yellow-800',
      shareText: 'Je suis un Manipulateur Éclair dans #Propagation! J\'ai atteint l\'ère numérique en moins de 30 minutes. Mon efficacité est terrifiante.'
    }
  ];
  
  // Combine all new achievements
  export const allNewAchievements = [
    ...endingAchievements,
    ...loreAchievements,
    ...additionalAchievements
  ];

  
/**
 * List of all achievements in the game
 */
  export const achievements = [
    ...initialAchievements,
    ...allNewAchievements
  ]

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

