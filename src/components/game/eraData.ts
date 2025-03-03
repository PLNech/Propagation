import { HistoricalEra } from './types';

/**
 * Data for all historical eras in the game
 */
export const historicalEras: HistoricalEra[] = [
  {
    id: "antiquity",
    name: "Antiquité",
    description: "L'ère des mythes et des récits fondateurs, où les croyances se transmettent par la narration orale et les rituels.",
    unlocked: true, // First era is unlocked by default
    unlockCost: 0,
    resourceMultipliers: {
      credibility: 1,
      influence: 1,
      networks: 1,
      manipulationPoints: 1
    },
    techniques: [
      {
        id: "myths",
        name: "Mythes Fondateurs",
        description: "Création de récits mythiques pour expliquer le monde et justifier l'ordre social.",
        effect: {
          resource: "credibility",
          multiplier: 1.2
        }
      },
      {
        id: "oracles",
        name: "Oracles et Prophéties",
        description: "Utilisation de prédictions vagues pouvant être interprétées de multiples façons.",
        effect: {
          resource: "influence",
          multiplier: 1.3
        }
      }
    ]
  },
  {
    id: "middleAges",
    name: "Moyen Âge",
    description: "Une période dominée par la superstition et l'autorité religieuse, où la vérité est contrôlée par les institutions.",
    unlocked: false,
    unlockCost: 50,
    resourceMultipliers: {
      credibility: 1.5,
      influence: 1.2,
      networks: 1.1,
      manipulationPoints: 1.3
    },
    techniques: [
      {
        id: "churchAuthority",
        name: "Autorité Ecclésiastique",
        description: "Invocation de la volonté divine pour justifier des positions politiques.",
        effect: {
          resource: "credibility",
          multiplier: 1.5
        }
      },
      {
        id: "heresyAccusation",
        name: "Accusations d'Hérésie",
        description: "Discréditer les opposants en les associant à des croyances interdites.",
        effect: {
          resource: "manipulationPoints",
          multiplier: 1.4
        }
      }
    ]
  },
  {
    id: "industrial",
    name: "Ère Industrielle",
    description: "L'avènement de la presse et des médias de masse permet la diffusion rapide d'informations et de désinformation.",
    unlocked: false,
    unlockCost: 200,
    resourceMultipliers: {
      credibility: 2,
      influence: 2.5,
      networks: 3,
      manipulationPoints: 2
    },
    techniques: [
      {
        id: "yellowJournalism",
        name: "Presse à Sensation",
        description: "Exagération et sensationnalisme pour vendre plus de journaux et influencer l'opinion.",
        effect: {
          resource: "influence",
          multiplier: 2
        }
      },
      {
        id: "massMarketing",
        name: "Marketing de Masse",
        description: "Techniques publicitaires persuasives ciblant les émotions plutôt que la raison.",
        effect: {
          resource: "networks",
          multiplier: 2.5
        }
      }
    ]
  },
  {
    id: "coldWar",
    name: "Guerre Froide",
    description: "Une période de propagande institutionnalisée où les superpuissances s'affrontent sur le terrain des idées.",
    unlocked: false,
    unlockCost: 800,
    resourceMultipliers: {
      credibility: 3,
      influence: 4,
      networks: 3.5,
      manipulationPoints: 3
    },
    techniques: [
      {
        id: "ideologicalWarfare",
        name: "Guerre Idéologique",
        description: "Promotion agressive d'une idéologie comme supérieure à toutes les autres.",
        effect: {
          resource: "influence",
          multiplier: 3
        }
      },
      {
        id: "disinformation",
        name: "Désinformation Systématique",
        description: "Création délibérée de fausses informations pour semer la confusion chez l'adversaire.",
        effect: {
          resource: "manipulationPoints",
          multiplier: 2.8
        }
      }
    ]
  },
  {
    id: "digital",
    name: "Ère Numérique",
    description: "L'âge des réseaux sociaux, des bulles de filtres et de la manipulation algorithmique de l'information.",
    unlocked: false,
    unlockCost: 3000,
    resourceMultipliers: {
      credibility: 5,
      influence: 8,
      networks: 10,
      manipulationPoints: 6
    },
    techniques: [
      {
        id: "filterBubbles",
        name: "Bulles de Filtres",
        description: "Isolation des individus dans des environnements informationnels qui renforcent leurs croyances.",
        effect: {
          resource: "credibility",
          multiplier: 4
        }
      },
      {
        id: "viralMarketing",
        name: "Marketing Viral",
        description: "Exploitation des mécanismes sociaux pour diffuser rapidement un message.",
        effect: {
          resource: "networks",
          multiplier: 7
        }
      },
      {
        id: "deepfakes",
        name: "Hypertrucages (Deepfakes)",
        description: "Création de contenu audio et vidéo falsifié mais indétectable à l'œil nu.",
        effect: {
          resource: "manipulationPoints",
          multiplier: 5
        }
      }
    ]
  }
];