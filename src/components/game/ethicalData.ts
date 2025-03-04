import { 
  EthicalAction, 
  EducationalContent, 
  CriticalThinkingQuote, 
  GameEnding, 
  EthicalStats 
} from '@/types';

/**
 * Data for all ethical actions in the game
 */
export const ethicalActions: EthicalAction[] = [
  // Antiquity Era Ethical Actions
  {
    id: "seekTruth",
    name: "Quête de Vérité",
    description: "Encouragez la recherche de la vérité à travers le dialogue socratique plutôt que l'acceptation aveugle des mythes.",
    eraId: "antiquity",
    cost: { influence: 20, manipulationPoints: 15 },
    ethicalGain: 10,
    criticalThinkingGain: 5,
    performed: false
  },
  {
    id: "questionOracles",
    name: "Questionner les Oracles",
    description: "Démontrez publiquement que les prédictions des oracles sont souvent vagues et peuvent s'appliquer à de nombreuses situations.",
    eraId: "antiquity",
    cost: { credibility: 30, influence: 25 },
    ethicalGain: 15,
    criticalThinkingGain: 10,
    performed: false,
    unlockCondition: {
      type: 'ethicalScore',
      value: 30
    }
  },
  {
    id: "arthashastraTruth",
    name: "Vérité de l'Arthashastra",
    description: "Inspiré par le traité de Chanakya (350-283 av. J.-C.), partagez ouvertement les techniques de manipulation plutôt que de les utiliser secrètement.",
    eraId: "antiquity",
    cost: { credibility: 40, influence: 35, manipulationPoints: 25 },
    ethicalGain: 20,
    criticalThinkingGain: 15,
    performed: false,
    unlockCondition: {
      type: 'ethicalScore',
      value: 40
    }
  },

  // Middle Ages Ethical Actions
  {
    id: "promoteLiteracy",
    name: "Promouvoir l'Alphabétisation",
    description: "Aidez les gens à lire par eux-mêmes plutôt que de dépendre uniquement des interprétations des autorités.",
    eraId: "middleAges",
    cost: { influence: 50, credibility: 40 },
    ethicalGain: 15,
    criticalThinkingGain: 15,
    performed: false
  },
  {
    id: "protectAccused",
    name: "Protéger les Accusés",
    description: "Défendez publiquement ceux qui sont injustement accusés d'hérésie, risquant votre propre réputation.",
    eraId: "middleAges",
    cost: { influence: 80, credibility: 60, manipulationPoints: 40 },
    ethicalGain: 25,
    criticalThinkingGain: 20,
    performed: false,
    unlockCondition: {
      type: 'ethicalScore',
      value: 40
    }
  },
  {
    id: "historicalContext",
    name: "Contextualisation Historique",
    description: "Révélez comment 'La Guerre des Irlandais contre les Étrangers' du 12e siècle a été manipulée pour justifier le pouvoir, offrant une perspective historique critique.",
    eraId: "middleAges",
    cost: { influence: 100, credibility: 80, networks: 50 },
    ethicalGain: 30,
    criticalThinkingGain: 25,
    performed: false,
    unlockCondition: {
      type: 'propagatedTheories',
      value: 1
    }
  },

  // Industrial Era Ethical Actions
  {
    id: "factChecking",
    name: "Vérification des Faits",
    description: "Établissez un processus rigoureux de vérification des faits dans les publications.",
    eraId: "industrial",
    cost: { credibility: 120, networks: 80 },
    ethicalGain: 20,
    criticalThinkingGain: 25,
    performed: false
  },
  {
    id: "investigativeJournalism",
    name: "Journalisme d'Investigation",
    description: "Investissez dans un journalisme approfondi qui révèle des vérités complexes plutôt que des sensations.",
    eraId: "industrial",
    cost: { influence: 150, networks: 120, manipulationPoints: 100 },
    ethicalGain: 30,
    criticalThinkingGain: 35,
    performed: false,
    unlockCondition: {
      type: 'propagatedTheories',
      value: 2
    }
  },
  {
    id: "federalistTransparency",
    name: "Transparence Fédéraliste",
    description: "Inspiré par 'The Federalist Papers' (1787-1788), révélez l'usage historique des pseudonymes pour influencer l'opinion tout en promouvant la transparence moderne.",
    eraId: "industrial",
    cost: { influence: 200, networks: 150, credibility: 180 },
    ethicalGain: 35,
    criticalThinkingGain: 40,
    performed: false,
    unlockCondition: {
      type: 'criticalThinking',
      value: 40
    }
  },

  // Cold War Ethical Actions
  {
    id: "transparencyInitiative",
    name: "Initiative de Transparence",
    description: "Créez une initiative qui expose les méthodes de propagande utilisées par les gouvernements.",
    eraId: "coldWar",
    cost: { influence: 300, credibility: 250 },
    ethicalGain: 30,
    criticalThinkingGain: 40,
    performed: false
  },
  {
    id: "counterPropaganda",
    name: "Contre-Propagande Éthique",
    description: "Développez des campagnes qui exposent la propagande sans recourir aux mêmes tactiques manipulatrices.",
    eraId: "coldWar",
    cost: { networks: 350, influence: 400, manipulationPoints: 300 },
    ethicalGain: 40,
    criticalThinkingGain: 45,
    performed: false,
    unlockCondition: {
      type: 'criticalThinking',
      value: 50
    }
  },
  {
    id: "bernaysRevelation",
    name: "Révélation de Bernays",
    description: "Inspiré par 'Propaganda' (1928) d'Edward Bernays, démontrez comment les relations publiques modernes ont évolué à partir de techniques de propagande, offrant aux citoyens les outils pour reconnaître ces méthodes.",
    eraId: "coldWar",
    cost: { networks: 450, influence: 500, credibility: 400 },
    ethicalGain: 45,
    criticalThinkingGain: 50,
    performed: false,
    unlockCondition: {
      type: 'propagatedTheories',
      value: 4
    }
  },

  // Digital Era Ethical Actions
  {
    id: "mediaLiteracy",
    name: "Éducation aux Médias",
    description: "Développez des programmes éducatifs qui enseignent comment identifier la désinformation en ligne.",
    eraId: "digital",
    cost: { networks: 600, influence: 500 },
    ethicalGain: 35,
    criticalThinkingGain: 50,
    performed: false
  },
  {
    id: "transparentAlgorithms",
    name: "Algorithmes Transparents",
    description: "Créez des outils qui révèlent comment les algorithmes manipulent l'information et les flux de contenu.",
    eraId: "digital",
    cost: { credibility: 800, networks: 700, manipulationPoints: 600 },
    ethicalGain: 45,
    criticalThinkingGain: 60,
    performed: false,
    unlockCondition: {
      type: 'ethicalScore',
      value: 70
    }
  },
  {
    id: "demonHauntedEducation",
    name: "Éducation contre les Démons",
    description: "Inspiré par 'The Demon-Haunted World' (1995) de Carl Sagan, créez une plateforme interactive pour enseigner la méthode scientifique et le scepticisme comme remparts contre la désinformation.",
    eraId: "digital",
    cost: { influence: 1000, credibility: 900, networks: 800 },
    ethicalGain: 50,
    criticalThinkingGain: 65,
    performed: false,
    unlockCondition: {
      type: 'criticalThinking',
      value: 70
    }
  },
  {
    id: "globalEthicsInitiative",
    name: "Initiative Éthique Mondiale",
    description: "Lancez un mouvement mondial pour des standards éthiques en matière d'information et de communication.",
    eraId: "digital",
    cost: { influence: 1500, credibility: 1200, networks: 1000, manipulationPoints: 800 },
    ethicalGain: 60,
    criticalThinkingGain: 70,
    performed: false,
    unlockCondition: {
      type: 'criticalThinking',
      value: 80
    }
  },
  {
    id: "rationalityFramework",
    name: "Cadre de Rationalité",
    description: "Basé sur 'Rationality: From AI to Zombies' (2015) de Yudkowsky, développez un framework accessible pour améliorer la prise de décision collective face à la désinformation.",
    eraId: "digital",
    cost: { influence: 2000, credibility: 1800, networks: 1500, manipulationPoints: 1000 },
    ethicalGain: 70,
    criticalThinkingGain: 80,
    performed: false,
    unlockCondition: {
      type: 'ethicalScore',
      value: 85
    }
  }
];

/**
 * Inspirational quotes about critical thinking
 */
export const criticalThinkingQuotes: CriticalThinkingQuote[] = [
  {
    id: "socrates",
    quote: "Une vie sans examen ne vaut pas la peine d'être vécue.",
    author: "Socrate",
    era: "antiquity"
  },
  {
    id: "aristotle",
    quote: "C'est la marque d'un esprit éduqué d'être capable d'entretenir une pensée sans l'accepter.",
    author: "Aristote",
    era: "antiquity"
  },
  {
    id: "bacon",
    quote: "Lis non pour contredire et réfuter, ni pour croire et tenir pour acquis, mais pour peser et considérer.",
    author: "Francis Bacon",
    era: "middleAges"
  },
  {
    id: "descartes",
    quote: "Ne jamais accepter aucune chose pour vraie que je ne la connusse évidemment être telle.",
    author: "René Descartes",
    era: "industrial"
  },
  {
    id: "voltaire",
    quote: "Ceux qui peuvent vous faire croire à des absurdités peuvent vous faire commettre des atrocités.",
    author: "Voltaire",
    era: "industrial"
  },
  {
    id: "paine",
    quote: "Il est dans l'intérêt de la tyrannie d'entretenir les préjugés.",
    author: "Thomas Paine",
    era: "industrial"
  },
  {
    id: "orwell",
    quote: "Dans une époque de tromperie universelle, dire la vérité est un acte révolutionnaire.",
    author: "George Orwell",
    era: "coldWar"
  },
  {
    id: "asimov",
    quote: "La violence est le dernier refuge de l'incompétent.",
    author: "Isaac Asimov",
    era: "coldWar"
  },
  {
    id: "bernays",
    quote: "La manipulation consciente et intelligente des opinions et des habitudes des masses joue un rôle important dans une société démocratique.",
    author: "Edward Bernays",
    era: "coldWar"
  },
  {
    id: "sagan",
    quote: "Des affirmations extraordinaires nécessitent des preuves extraordinaires.",
    author: "Carl Sagan",
    era: "digital"
  },
  {
    id: "chomsky",
    quote: "La propagande est aux démocraties ce que la violence est aux dictatures.",
    author: "Noam Chomsky",
    era: "digital"
  },
  {
    id: "kahneman",
    quote: "Notre confiance excessive dans ce que nous croyons savoir, et notre incapacité apparente à reconnaître les limites de notre connaissance, nous empêchent de protéger nos croyances de l'erreur.",
    author: "Daniel Kahneman",
    era: "digital"
  },
  {
    id: "neil",
    quote: "L'un des plus grands défis de notre monde n'est pas que les gens ne savent pas assez, mais qu'ils savent trop de choses qui ne sont pas vraies.",
    author: "Neil deGrasse Tyson",
    era: "digital"
  },
  {
    id: "shermer",
    quote: "Les théories du complot sont difficiles à réfuter car elles sont auto-scellantes - les preuves contre elles deviennent des preuves pour elles dans l'esprit du théoricien.",
    author: "Michael Shermer",
    era: "digital"
  },
  {
    id: "yudkowsky",
    quote: "Si vous connaissez la vérité, vous pouvez la défendre contre les arguments. Si vous ne connaissez que votre position, vous êtes perdu quand on l'attaque habilement.",
    author: "Eliezer Yudkowsky",
    era: "digital"
  }
];

/**
 * Game endings based on player choices
 */
export const gameEndings: GameEnding[] = [
  {
    id: "masterManipulator",
    title: "Maître Manipulateur",
    description: "Votre influence est immense, mais à quel prix ? Vous avez réussi à manipuler l'opinion publique à grande échelle, créant un réseau d'information entièrement sous votre contrôle. Votre nom restera dans l'histoire comme l'un des plus grands manipulateurs, mais votre héritage est construit sur des fondations de mensonges et de manipulation. Est-ce vraiment la marque que vous vouliez laisser sur le monde ?",
    condition: {
      ethicalScore: 0, // Maximum 30
      criticalThinking: 0, // Maximum 30
      influence: 5000, // Minimum 5000
      requiredMode: 'manipulation'
    },
    triggered: false
  },
  {
    id: "shadowPuppeteer",
    title: "Marionnettiste de l'Ombre",
    description: "Vous opérez dans l'ombre, tirant les ficelles sans jamais être vu. Votre réseau de manipulation est subtil mais puissant, influençant les décisions majeures sans laisser de traces. Vous avez sacrifié l'éthique pour le pouvoir, et bien que votre nom ne soit pas connu du grand public, votre impact sur la société est profond et troublant. Le monde ne saura jamais à quel point vous l'avez façonné.",
    condition: {
      ethicalScore: 0, // Maximum 40
      criticalThinking: 0, // Maximum 20
      influence: 3000, // Minimum 3000
      requiredMode: 'manipulation'
    },
    triggered: false
  },
  {
    id: "ethicalCompromiser",
    title: "Équilibriste Éthique",
    description: "Vous avez marché sur la fine ligne entre influence et éthique, utilisant certaines techniques de manipulation tout en gardant une conscience morale. Votre impact est significatif et relativement positif, mais les zones grises que vous avez explorées laissent une ambiguïté morale dans votre héritage. Avez-vous vraiment trouvé le bon équilibre, ou vous êtes-vous simplement raconté une histoire pour justifier vos méthodes ?",
    condition: {
      ethicalScore: 50, // Minimum 50
      criticalThinking: 40, // Minimum 40
      influence: 2000, // Minimum 2000
    },
    triggered: false
  },
  {
    id: "truthSeeker",
    title: "Chercheur de Vérité",
    description: "Vous avez choisi la voie difficile de l'intégrité et de la vérité. Plutôt que de manipuler, vous avez éduqué; plutôt que de tromper, vous avez révélé. Votre influence est peut-être moins grande que ce qu'elle aurait pu être, mais votre impact est authentique et durable. Vous avez contribué à construire une société plus résiliente face à la manipulation, où la pensée critique et la vérité sont valorisées. C'est un héritage dont vous pouvez être fier.",
    condition: {
      ethicalScore: 80, // Minimum 80
      criticalThinking: 70, // Minimum 70
      influence: 1000, // Minimum 1000
      requiredMode: 'revelation'
    },
    triggered: false
  },
  {
    id: "enlightener",
    title: "L'Éveilleur de Consciences",
    description: "Vous êtes devenu une figure légendaire de l'éveil des consciences. Votre travail a non seulement exposé les mécanismes de manipulation, mais a également inspiré un mouvement mondial pour la transparence et l'éthique de l'information. Des générations futures étudieront votre approche et votre courage. Dans un monde où la manipulation semblait inévitable, vous avez montré qu'une autre voie était possible, et vous avez changé le cours de l'histoire en conséquence.",
    condition: {
      ethicalScore: 90, // Minimum 90
      criticalThinking: 90, // Minimum 90
      influence: 2000, // Minimum 2000
      requiredMode: 'revelation'
    },
    triggered: false
  },
  {
    id: "rationalistLeader",
    title: "Leader Rationaliste",
    description: "Votre approche méthodique et factuelle de l'information a créé un nouveau modèle de leadership basé sur la rationalité et la transparence. En appliquant rigoureusement les principes de la pensée critique élaborés par des penseurs comme Yudkowsky et Sagan, vous avez développé des institutions capables de résister aux vagues de désinformation. Votre legs n'est pas seulement idéologique mais pratique : des outils concrets que les futures générations utiliseront pour maintenir l'intégrité informationnelle.",
    condition: {
      ethicalScore: 85, // Minimum 85
      criticalThinking: 95, // Minimum 95
      influence: 3000, // Minimum 3000
      requiredMode: 'revelation'
    },
    triggered: false
  }
];

/**
 * Initial ethical statistics
 */
export const initialEthicalStats: EthicalStats = {
  theoriesPropagated: 0,
  ethicalActionsPerformed: 0,
  influenceSacrificed: 0,
  livesImpacted: 0,
  criticalThinkingRaised: 0,
  endingsUnlocked: 0
};

/**
 * Educational content about manipulation techniques
 */
export const educationalContent: EducationalContent[] = [
  {
    id: "mythCreation",
    title: "La Création de Mythes",
    content: "Les mythes ont toujours été utilisés pour expliquer l'inexplicable, mais aussi pour justifier les structures de pouvoir. En créant des récits qui semblent expliquer le monde, les manipulateurs établissent une autorité basée sur une connaissance supposée supérieure. Cette technique reste présente aujourd'hui dans les récits simplistes qui prétendent expliquer des phénomènes complexes.",
    eraId: "antiquity"
  },
  {
    id: "behistunPropaganda",
    title: "La Propagande Monumentale",
    content: "L'inscription de Behistun (515 av. J.-C.) est l'un des premiers exemples documentés de propagande à grande échelle. Le roi Darius I a fait graver sur une falaise un récit de sa prise de pouvoir, présentant ses ennemis comme des menteurs et lui-même comme choisi par le dieu Ahura Mazda. Ce monument illustre comment les dirigeants ont utilisé des récits officiels gravés dans la pierre pour légitimer leur pouvoir et réécrire l'histoire.",
    eraId: "antiquity",
    additionalResources: "L'inscription est visible dans l'ouest de l'Iran moderne et a été cruciale pour déchiffrer les écritures cunéiformes."
  },
  {
    id: "appealToAuthority",
    title: "L'Appel à l'Autorité",
    content: "Au Moyen Âge, l'invocation de l'autorité religieuse était suffisante pour faire accepter une idée. Aujourd'hui, l'appel à l'autorité prend des formes plus subtiles : experts autoproclamés, titres impressionnants, ou institutions prestigieuses citées hors contexte. Apprendre à évaluer la pertinence et la légitimité des autorités citées est essentiel pour résister à cette forme de manipulation.",
    eraId: "middleAges"
  },
  {
    id: "historicalRevisionism",
    title: "Le Révisionnisme Historique",
    content: "L'œuvre 'La Guerre des Irlandais contre les Étrangers' (12e siècle) illustre comment l'histoire peut être réécrite pour servir des intérêts politiques. Ce texte présentait la dynastie Dál gCais comme les légitimes défenseurs de l'Irlande, bien que leur ascension fût récente. Cette technique consiste à reformuler sélectivement le passé pour justifier des positions présentes, créant des mythes fondateurs qui renforcent l'identité collective et légitiment l'autorité.",
    eraId: "middleAges"
  },
  {
    id: "yellowJournalism",
    title: "Le Journalisme à Sensation",
    content: "Né à l'ère industrielle, le journalisme à sensation privilégie l'émotion sur les faits. En exagérant, dramatisant et simplifiant à l'extrême, il capte l'attention mais déforme la réalité. Cette technique exploite nos biais cognitifs comme notre tendance à retenir ce qui est choquant ou inhabituel plutôt que ce qui est nuancé ou complexe.",
    eraId: "industrial"
  },
  {
    id: "commonSenseTactics",
    title: "Tactiques du 'Sens Commun'",
    content: "Le pamphlet 'Common Sense' (1776) de Thomas Paine, bien que servant une cause noble d'indépendance, a démontré l'efficacité de certaines techniques toujours utilisées : langage simple et accessible, appel aux émotions, et présentation d'idées complexes comme évidentes et indiscutables. Reconnaître ces méthodes est essentiel, même lorsqu'elles servent des causes avec lesquelles on est d'accord.",
    eraId: "industrial",
    additionalResources: "Ce pamphlet a joué un rôle crucial dans l'articulation de la demande d'indépendance américaine et reste un exemple classique de persuasion politique efficace."
  },
  {
    id: "systematicDisinformation",
    title: "La Désinformation Systématique",
    content: "Développée pendant la Guerre froide, cette stratégie consiste à inonder l'espace public d'informations contradictoires pour créer confusion et apathie. Quand tout peut être faux, rien n'est certain, et le public finit par abandonner la recherche de vérité. Cette technique est particulièrement efficace pour neutraliser des faits dérangeants pour ceux au pouvoir.",
    eraId: "coldWar"
  },
  {
    id: "manufacturedConsent",
    title: "Le Consentement Fabriqué",
    content: "Concept développé par Edward S. Herman et Noam Chomsky dans 'Manufacturing Consent' (1988), cette technique décrit comment les médias de masse peuvent servir d'instrument de propagande dans les démocraties. Grâce à la concentration de la propriété, la dépendance à la publicité, et la sélection de sources 'acceptables', certaines informations sont amplifiées tandis que d'autres sont marginalisées, créant une illusion de débat libre.",
    eraId: "coldWar",
    additionalResources: "Cette analyse des médias a profondément influencé la compréhension moderne de la propagande dans les sociétés démocratiques."
  },
  {
    id: "bernaysPropaganda",
    title: "L'Ingénierie du Consentement",
    content: "Edward Bernays, dans son ouvrage 'Propaganda' (1928), a formalisé comment manipuler l'opinion publique de façon scientifique. Neveu de Sigmund Freud, il a appliqué la psychologie à la persuasion de masse, transformant la propagande en 'relations publiques'. Ses techniques – création d'évènements pseudo-spontanés, association de produits à des émotions ou valeurs, utilisation de 'tiers indépendants' – sont désormais omniprésentes dans la publicité et la communication politique.",
    eraId: "coldWar"
  },
  {
    id: "filterBubbles",
    title: "Les Bulles de Filtres",
    content: "Les algorithmes des réseaux sociaux nous exposent principalement à des contenus qui confirment nos croyances existantes, créant des 'bulles de filtres'. Cette personnalisation renforce les opinions existantes et polarise les sociétés. Reconnaître ce phénomène est la première étape pour diversifier activement ses sources d'information.",
    eraId: "digital"
  },
  {
    id: "cognitiveBiases",
    title: "Les Biais Cognitifs Exploités",
    content: "Comme démontré dans 'Thinking, Fast and Slow' (2011) de Daniel Kahneman, nos processus de pensée sont vulnérables à de nombreux biais. Les manipulateurs exploitent ces failles – biais de confirmation, heuristique de disponibilité, ancrage – pour façonner nos perceptions. La reconnaissance de ces biais naturels est essentielle pour renforcer notre résistance cognitive à la manipulation.",
    eraId: "digital",
    additionalResources: "Ce travail sur les deux systèmes de pensée (rapide/intuitive et lente/analytique) a valu à Kahneman le prix Nobel d'économie."
  },
  {
    id: "deepfakes",
    title: "Les Hypertrucages (Deepfakes)",
    content: "Les technologies d'intelligence artificielle permettent aujourd'hui de créer des contenus audio et vidéo falsifiés pratiquement indétectables. Ces 'deepfakes' ébranlent notre confiance dans les preuves visuelles et sonores, autrefois considérées comme fiables. Développer des compétences de vérification multimodale devient essentiel pour naviguer dans ce nouvel environnement informationnel.",
    eraId: "digital"
  },
  {
    id: "demonHauntedWorld",
    title: "Le Kit de Détection des Absurdités",
    content: "Dans 'The Demon-Haunted World' (1995), Carl Sagan propose un 'kit de détection des absurdités' – une série d'outils intellectuels pour évaluer les affirmations. Ces principes incluent la recherche de confirmation indépendante, l'encouragement au débat, l'évitement de l'argument d'autorité, la considération de multiples hypothèses, et l'application du rasoir d'Occam. Cette approche scientifique de l'évaluation des informations reste un rempart puissant contre la désinformation.",
    eraId: "digital"
  }
];