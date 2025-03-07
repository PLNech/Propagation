import { Upgrade } from '@/types';

/**
 * Data for all purchasable upgrades in the game
 */
export const upgrades: Upgrade[] = [
  // Antiquity Era Upgrades
  {
    id: "storytelling",
    name: "Narration Captivante",
    description: "Améliorez vos capacités de narration pour rendre vos histoires plus convaincantes.",
    eraId: "antiquity",
    cost: { credibility: 20 },
    effect: {
      type: 'multiplier',
      target: 'credibility',
      value: 1.5
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: []
  },
  {
    id: "oralTradition",
    name: "Tradition Orale",
    description: "Établissez une tradition orale pour préserver et transmettre vos récits à travers les générations.",
    eraId: "antiquity",
    cost: { credibility: 50, influence: 20 },
    effect: {
      type: 'passive',
      target: 'credibility',
      value: 0.1 // +0.1 credibility per tick
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: ["storytelling"]
  },
  {
    id: "behistunMonuments",
    name: "Monuments de Propagande",
    description: "Comme l'Inscription de Behistun (515 av. J.-C.), créez des monuments gravés de vos récits pour en assurer l'autorité et la postérité.",
    eraId: "antiquity",
    cost: { influence: 60, credibility: 40 },
    effect: {
      type: 'multiplier',
      target: 'credibility',
      value: 1.7
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["oralTradition"]
  },
  {
    id: "ritualCeremonies",
    name: "Cérémonies Rituelles",
    description: "Organisez des cérémonies qui renforcent vos récits par l'expérience collective.",
    eraId: "antiquity",
    cost: { influence: 75, manipulationPoints: 30 },
    effect: {
      type: 'multiplier',
      target: 'influence',
      value: 1.8
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["oralTradition"]
  },
  {
    id: "arthashastraTactics",
    name: "Tactiques de l'Arthashastra",
    description: "Appliquez les techniques subtiles de manipulation décrites dans ce traité ancien (350-283 av. J.-C.) pour étendre votre influence.",
    eraId: "antiquity",
    cost: { manipulationPoints: 50, influence: 50 },
    effect: {
      type: 'passive',
      target: 'manipulationPoints',
      value: 0.15
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["ritualCeremonies"]
  },

  // Middle Ages Upgrades
  {
    id: "manuscriptProduction",
    name: "Production de Manuscrits",
    description: "Financez la production de manuscrits pour diffuser vos idées parmi les lettrés.",
    eraId: "middleAges",
    cost: { credibility: 100, influence: 80 },
    effect: {
      type: 'multiplier',
      target: 'networks',
      value: 1.6
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: []
  },
  {
    id: "religiousAuthority",
    name: "Autorité Religieuse",
    description: "Établissez des connexions avec les autorités religieuses pour donner plus de poids à vos messages.",
    eraId: "middleAges",
    cost: { credibility: 150, manipulationPoints: 100 },
    effect: {
      type: 'multiplier',
      target: 'credibility',
      value: 2.0
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: []
  },
  {
    id: "irishWarsHistoriography",
    name: "Historiographie Sélective",
    description: "Telle 'La Guerre des Irlandais contre les Étrangers' (12e siècle), réécrivez l'histoire pour légitimer votre autorité présente.",
    eraId: "middleAges",
    cost: { credibility: 180, manipulationPoints: 150 },
    effect: {
      type: 'multiplier',
      target: 'influence',
      value: 2.2
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["religiousAuthority"]
  },
  {
    id: "patronage",
    name: "Mécénat",
    description: "Obtenez le soutien de nobles puissants qui financent la diffusion de vos idées.",
    eraId: "middleAges",
    cost: { influence: 200, manipulationPoints: 120 },
    effect: {
      type: 'passive',
      target: 'influence',
      value: 0.2 // +0.2 influence per tick
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["religiousAuthority"]
  },

  // Industrial Era Upgrades
  {
    id: "printingPress",
    name: "Presse à Imprimer",
    description: "Investissez dans des presses à imprimer pour diffuser rapidement vos idées à grande échelle.",
    eraId: "industrial",
    cost: { credibility: 300, influence: 250 },
    effect: {
      type: 'multiplier',
      target: 'networks',
      value: 2.5
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: []
  },
  {
    id: "commonSenseApproach",
    name: "Approche 'Sens Commun'",
    description: "Faites comme le pamphlet de Thomas Paine (1776) : simplifiez vos messages en les présentant comme des évidences indiscutables.",
    eraId: "industrial",
    cost: { credibility: 350, manipulationPoints: 200 },
    effect: {
      type: 'multiplier',
      target: 'credibility',
      value: 2.3
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: ["printingPress"]
  },
  {
    id: "newspaperNetwork",
    name: "Réseau de Journaux",
    description: "Établissez un réseau de journaux qui diffusent vos narratifs de manière coordonnée.",
    eraId: "industrial",
    cost: { influence: 400, networks: 200 },
    effect: {
      type: 'multiplier',
      target: 'influence',
      value: 2.0
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: ["printingPress"]
  },
  {
    id: "federalistTechniques",
    name: "Techniques Fédéralistes",
    description: "Utilisez des pseudonymes et des perspectives multiples pour donner l'illusion d'un consensus large, comme l'ont fait les 'The Federalist Papers' (1787-1788).",
    eraId: "industrial",
    cost: { networks: 300, credibility: 250 },
    effect: {
      type: 'passive',
      target: 'networks',
      value: 0.3
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["newspaperNetwork"]
  },
  {
    id: "sensationalism",
    name: "Sensationnalisme",
    description: "Adoptez des techniques journalistiques sensationnalistes pour capter l'attention.",
    eraId: "industrial",
    cost: { manipulationPoints: 300, credibility: 150 },
    effect: {
      type: 'multiplier',
      target: 'manipulationPoints',
      value: 2.2
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["newspaperNetwork"]
  },

  // Cold War Upgrades
  {
    id: "statePropaganda",
    name: "Propagande d'État",
    description: "Développez des méthodes sophistiquées de propagande institutionnalisée.",
    eraId: "coldWar",
    cost: { influence: 800, credibility: 500 },
    effect: {
      type: 'multiplier',
      target: 'credibility',
      value: 3.0
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: []
  },
  {
    id: "bernaysMethods",
    name: "Méthodes Bernays",
    description: "Appliquez les techniques d'Edward Bernays de 'Propaganda' (1928) pour transformer la propagande en 'relations publiques' scientifiques.",
    eraId: "coldWar",
    cost: { manipulationPoints: 700, credibility: 600 },
    effect: {
      type: 'multiplier',
      target: 'manipulationPoints',
      value: 2.5
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: ["statePropaganda"]
  },
  {
    id: "massBroadcasting",
    name: "Diffusion de Masse",
    description: "Utilisez la radio et la télévision pour diffuser vos messages à des millions de personnes.",
    eraId: "coldWar",
    cost: { networks: 700, influence: 600 },
    effect: {
      type: 'multiplier',
      target: 'networks',
      value: 3.5
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: ["statePropaganda"]
  },
  {
    id: "manufacturedConsentSystem",
    name: "Système de Consentement Fabriqué",
    description: "Inspiré par Chomsky (1988), établissez un système médiatique qui crée l'illusion de débat tout en restreignant le spectre d'opinions acceptables.",
    eraId: "coldWar",
    cost: { influence: 800, networks: 600 },
    effect: {
      type: 'multiplier',
      target: 'influence',
      value: 3.2
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["massBroadcasting"]
  },
  {
    id: "disinformationCampaigns",
    name: "Campagnes de Désinformation",
    description: "Lancez des campagnes coordonnées pour semer la confusion chez vos adversaires.",
    eraId: "coldWar",
    cost: { manipulationPoints: 900, networks: 500 },
    effect: {
      type: 'passive',
      target: 'manipulationPoints',
      value: 0.5 // +0.5 manipulation points per tick
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["massBroadcasting"]
  },

  // Digital Era Upgrades
  {
    id: "socialMediaAlgorithms",
    name: "Algorithmes de Réseaux Sociaux",
    description: "Exploitez les algorithmes des réseaux sociaux pour amplifier la portée de vos messages.",
    eraId: "digital",
    cost: { networks: 1500, influence: 1200 },
    effect: {
      type: 'multiplier',
      target: 'networks',
      value: 5.0
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: []
  },
  {
    id: "cognitiveBiasExploitation",
    name: "Exploitation des Biais Cognitifs",
    description: "Forts de votre connaissance de 'Thinking, Fast and Slow' (2011) de Kahneman, exploitez systématiquement les vulnérabilités de la pensée humaine.",
    eraId: "digital",
    cost: { manipulationPoints: 1800, credibility: 1300 },
    effect: {
      type: 'multiplier',
      target: 'credibility',
      value: 3.5
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: ["socialMediaAlgorithms"]
  },
  {
    id: "dataHarvesting",
    name: "Récolte de Données",
    description: "Collectez et analysez des données utilisateur pour cibler précisément vos messages.",
    eraId: "digital",
    cost: { manipulationPoints: 2000, credibility: 1000 },
    effect: {
      type: 'multiplier',
      target: 'influence',
      value: 4.0
    },
    purchased: false,
    visible: true,
    prerequisiteUpgradeIds: ["socialMediaAlgorithms"]
  },
  {
    id: "saganiantTrapAvoidance",
    name: "Évitement des Contrevérités Détectables",
    description: "Vous opposant au travail de Carl Sagan, développez des techniques qui contournent les pièges de détection des fausses informations.",
    eraId: "digital",
    cost: { credibility: 2200, manipulationPoints: 1500 },
    effect: {
      type: 'passive',
      target: 'credibility',
      value: 0.8
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["dataHarvesting"]
  },
  {
    id: "aiGeneration",
    name: "Génération par IA",
    description: "Utilisez l'intelligence artificielle pour créer du contenu persuasif personnalisé à grande échelle.",
    eraId: "digital",
    cost: { networks: 2500, manipulationPoints: 3000 },
    effect: {
      type: 'multiplier',
      target: 'manipulationPoints',
      value: 6.0
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["dataHarvesting"]
  },
  {
    id: "deepfakeTechnology",
    name: "Technologie d'Hypertrucage",
    description: "Maîtrisez les technologies de deepfake pour créer des preuves visuelles et audio convaincantes.",
    eraId: "digital",
    cost: { credibility: 3000, manipulationPoints: 4000 },
    effect: {
      type: 'passive',
      target: 'credibility',
      value: 1.0 // +1.0 credibility per tick
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["aiGeneration"]
  },
  {
    id: "antiRationalityTools",
    name: "Outils Anti-Rationalité",
    description: "Face au grand 'Rationality' (2015) de Yudkowsky, développez des techniques pour gaslight les défenses rationnelles.",
    eraId: "digital",
    cost: { manipulationPoints: 5000, credibility: 4000, influence: 3000 },
    effect: {
      type: 'multiplier',
      target: 'manipulationPoints',
      value: 7.0
    },
    purchased: false,
    visible: false,
    prerequisiteUpgradeIds: ["deepfakeTechnology"]
  }
];