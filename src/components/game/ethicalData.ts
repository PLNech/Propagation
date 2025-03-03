import { 
    EthicalAction, 
    EducationalContent, 
    CriticalThinkingQuote, 
    GameEnding, 
    EthicalStats 
  } from './types';
  
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
    }
  ];
  
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
      id: "appealToAuthority",
      title: "L'Appel à l'Autorité",
      content: "Au Moyen Âge, l'invocation de l'autorité religieuse était suffisante pour faire accepter une idée. Aujourd'hui, l'appel à l'autorité prend des formes plus subtiles : experts autoproclamés, titres impressionnants, ou institutions prestigieuses citées hors contexte. Apprendre à évaluer la pertinence et la légitimité des autorités citées est essentiel pour résister à cette forme de manipulation.",
      eraId: "middleAges"
    },
    {
      id: "yellowJournalism",
      title: "Le Journalisme à Sensation",
      content: "Né à l'ère industrielle, le journalisme à sensation privilégie l'émotion sur les faits. En exagérant, dramatisant et simplifiant à l'extrême, il capte l'attention mais déforme la réalité. Cette technique exploite nos biais cognitifs comme notre tendance à retenir ce qui est choquant ou inhabituel plutôt que ce qui est nuancé ou complexe.",
      eraId: "industrial"
    },
    {
      id: "systematicDisinformation",
      title: "La Désinformation Systématique",
      content: "Développée pendant la Guerre froide, cette stratégie consiste à inonder l'espace public d'informations contradictoires pour créer confusion et apathie. Quand tout peut être faux, rien n'est certain, et le public finit par abandonner la recherche de vérité. Cette technique est particulièrement efficace pour neutraliser des faits dérangeants pour ceux au pouvoir.",
      eraId: "coldWar"
    },
    {
      id: "filterBubbles",
      title: "Les Bulles de Filtres",
      content: "Les algorithmes des réseaux sociaux nous exposent principalement à des contenus qui confirment nos croyances existantes, créant des 'bulles de filtres'. Cette personnalisation renforce les opinions existantes et polarise les sociétés. Reconnaître ce phénomène est la première étape pour diversifier activement ses sources d'information.",
      eraId: "digital"
    },
    {
      id: "deepfakes",
      title: "Les Hypertrucages (Deepfakes)",
      content: "Les technologies d'intelligence artificielle permettent aujourd'hui de créer des contenus audio et vidéo falsifiés pratiquement indétectables. Ces 'deepfakes' ébranlent notre confiance dans les preuves visuelles et sonores, autrefois considérées comme fiables. Développer des compétences de vérification multimodale devient essentiel pour naviguer dans ce nouvel environnement informationnel.",
      eraId: "digital"
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
      id: "sagan",
      quote: "Des affirmations extraordinaires nécessitent des preuves extraordinaires.",
      author: "Carl Sagan",
      era: "digital"
    },
    {
      id: "neil",
      quote: "L'un des plus grands défis de notre monde n'est pas que les gens ne savent pas assez, mais qu'ils savent trop de choses qui ne sont pas vraies.",
      author: "Neil deGrasse Tyson",
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