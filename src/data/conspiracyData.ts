import { ConspiracyTheory } from '@/types';

/**
 * Data for all conspiracy theories in the game
 */
export const conspiracyTheories: ConspiracyTheory[] = [
  // Antiquity Era Theories
  {
    id: "ancientAstronomers",
    name: "Les Astronomes Anciens",
    description: "Les connaissances astronomiques des anciens ne peuvent s'expliquer que par l'intervention d'êtres supérieurs.",
    eraId: "antiquity",
    cost: 30,
    successRate: 0.8,
    rewards: {
      credibility: 25,
      influence: 15
    },
    ethicalImpact: -2,
    criticalThinkingImpact: -3, // Moderate negative impact on critical thinking
    propagated: false,
    visible: true
  },
  {
    id: "behistunInscription",
    name: "L'Inscription de Behistun",
    description: "Inspiré de l'inscription réelle de Darius I (515 av. J.-C.), propager l'idée que les hiéroglyphes cachent un message sur une race supérieure ayant gouverné l'humanité.",
    eraId: "antiquity",
    cost: 45,
    successRate: 0.75,
    rewards: {
      credibility: 35,
      influence: 30
    },
    ethicalImpact: -3,
    criticalThinkingImpact: -4,
    propagated: false,
    visible: true
  },
  {
    id: "hiddenTemples",
    name: "Temples Cachés",
    description: "Des temples secrets contiennent des connaissances ésotériques qui pourraient bouleverser notre compréhension de l'histoire.",
    eraId: "antiquity",
    cost: 60,
    successRate: 0.65,
    rewards: {
      credibility: 40,
      influence: 35,
      manipulationPoints: 20
    },
    ethicalImpact: -4,
    criticalThinkingImpact: -4, // Significant negative impact on critical thinking
    propagated: false,
    visible: true
  },

  // Middle Ages Theories
  {
    id: "royalBloodlines",
    name: "Lignées Royales Secrètes",
    description: "Les lignées royales descendent d'une race particulière qui n'est pas entièrement humaine.",
    eraId: "middleAges",
    cost: 100,
    successRate: 0.7,
    rewards: {
      credibility: 70,
      influence: 60
    },
    ethicalImpact: -5,
    criticalThinkingImpact: -5, // Substantial negative impact on critical thinking
    propagated: false,
    visible: true
  },
  {
    id: "irishWars",
    name: "La Guerre des Étrangers",
    description: "Basé sur 'La Guerre des Irlandais contre les Étrangers' (12e siècle), propager l'idée que certains dirigeants actuels sont des descendants directs de légitimes souverains déchus.",
    eraId: "middleAges",
    cost: 120,
    successRate: 0.65,
    rewards: {
      credibility: 80,
      influence: 70
    },
    ethicalImpact: -5,
    criticalThinkingImpact: -6,
    propagated: false,
    visible: true
  },
  {
    id: "knightsTemplar",
    name: "Les Secrets des Templiers",
    description: "Les Chevaliers Templiers ont découvert un artefact sacré qui leur confère un pouvoir immense, dissimulé aujourd'hui.",
    eraId: "middleAges",
    cost: 150,
    successRate: 0.6,
    rewards: {
      credibility: 100,
      influence: 90,
      manipulationPoints: 50
    },
    ethicalImpact: -6,
    criticalThinkingImpact: -6, // Strong negative impact on critical thinking
    propagated: false,
    visible: true
  },

  // Industrial Era Theories
  {
    id: "industrialSabotage",
    name: "Sabotage Industriel",
    description: "Les pannes et accidents industriels majeurs sont orchestrés par des concurrents étrangers pour affaiblir notre économie.",
    eraId: "industrial",
    cost: 250,
    successRate: 0.75,
    rewards: {
      credibility: 150,
      influence: 180,
      networks: 100
    },
    ethicalImpact: -7,
    criticalThinkingImpact: -6, // Strong negative impact on critical thinking
    propagated: false,
    visible: true
  },
  {
    id: "commonSenseFalsehood",
    name: "Le Sens Commun Manipulé",
    description: "Inspiré du pamphlet 'Common Sense' (1776) de Thomas Paine, propager l'idée que des événements historiques majeurs ont été entièrement fabriqués pour manipuler l'opinion publique.",
    eraId: "industrial",
    cost: 300,
    successRate: 0.7,
    rewards: {
      credibility: 170,
      influence: 200,
      networks: 150
    },
    ethicalImpact: -7,
    criticalThinkingImpact: -7,
    propagated: false,
    visible: true
  },
  {
    id: "secretSocieties",
    name: "Sociétés Secrètes",
    description: "Un réseau mondial de sociétés secrètes contrôle les gouvernements et dirige l'économie mondiale dans l'ombre.",
    eraId: "industrial",
    cost: 350,
    successRate: 0.55,
    rewards: {
      credibility: 200,
      influence: 250,
      manipulationPoints: 150
    },
    ethicalImpact: -8,
    criticalThinkingImpact: -7, // Severe negative impact on critical thinking
    propagated: false,
    visible: true
  },

  // Cold War Theories
  {
    id: "mindControl",
    name: "Contrôle Mental",
    description: "Les gouvernements ont développé des technologies permettant de contrôler l'esprit des populations à travers les ondes radio et la télévision.",
    eraId: "coldWar",
    cost: 500,
    successRate: 0.6,
    rewards: {
      credibility: 300,
      influence: 400,
      networks: 250
    },
    ethicalImpact: -8,
    criticalThinkingImpact: -8, // Very severe negative impact on critical thinking
    propagated: false,
    visible: true
  },
  {
    id: "manufacturedConsent",
    name: "Consentement Fabriqué",
    description: "Inspiré de 'Manufacturing Consent' (1988) de Chomsky, suggérer que tous les médias sont contrôlés par une entité unique qui fabrique l'opinion publique.",
    eraId: "coldWar",
    cost: 600,
    successRate: 0.55,
    rewards: {
      credibility: 400,
      influence: 500,
      networks: 300
    },
    ethicalImpact: -8,
    criticalThinkingImpact: -8,
    propagated: false,
    visible: true
  },
  {
    id: "alienContacts",
    name: "Contacts Extraterrestres",
    description: "Les gouvernements ont établi des contacts avec des civilisations extraterrestres et dissimulent cette vérité au public.",
    eraId: "coldWar",
    cost: 700,
    successRate: 0.4,
    rewards: {
      credibility: 500,
      influence: 600,
      manipulationPoints: 400
    },
    ethicalImpact: -9,
    criticalThinkingImpact: -9, // Extreme negative impact on critical thinking
    propagated: false,
    visible: true
  },

  // Digital Era Theories
  {
    id: "surveillanceState",
    name: "État de Surveillance Totale",
    description: "Tous les appareils connectés sont utilisés pour surveiller en permanence les citoyens, jusque dans leur intimité.",
    eraId: "digital",
    cost: 1000,
    successRate: 0.7,
    rewards: {
      credibility: 700,
      influence: 800,
      networks: 600
    },
    ethicalImpact: -7,
    criticalThinkingImpact: -8, // Very severe negative impact on critical thinking
    propagated: false,
    visible: true
  },
  {
    id: "thinkingFlawed",
    name: "La Pensée Lente Manipulée",
    description: "Inspiré de 'Thinking, Fast and Slow' (2011) de Kahneman, propager l'idée que nos processus de pensée ont été délibérément compromis par des expériences sociétales.",
    eraId: "digital",
    cost: 1200,
    successRate: 0.6,
    rewards: {
      credibility: 900,
      influence: 1000,
      networks: 700
    },
    ethicalImpact: -9,
    criticalThinkingImpact: -9,
    propagated: false,
    visible: true
  },
  {
    id: "vaccineTracking",
    name: "Traçage par Vaccins",
    description: "Les campagnes de vaccination mondiales sont un moyen d'implanter des nanopuces dans la population pour la contrôler.",
    eraId: "digital",
    cost: 1500,
    successRate: 0.5,
    rewards: {
      credibility: 1000,
      influence: 1200,
      networks: 800,
      manipulationPoints: 700
    },
    ethicalImpact: -10,
    criticalThinkingImpact: -10, // Maximum negative impact on critical thinking
    propagated: false,
    visible: true
  },
  {
    id: "virtualRealityPrison",
    name: "Prison de Réalité Virtuelle",
    description: "Les technologies de réalité virtuelle sont développées pour créer un monde simulé où les masses seront emprisonnées mentalement.",
    eraId: "digital",
    cost: 2000,
    successRate: 0.4,
    rewards: {
      credibility: 1500,
      influence: 1800,
      networks: 1200,
      manipulationPoints: 1000
    },
    ethicalImpact: -10,
    criticalThinkingImpact: -10, // Maximum negative impact on critical thinking
    propagated: false,
    visible: true
  }
];