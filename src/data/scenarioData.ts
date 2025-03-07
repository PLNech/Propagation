import { Scenario } from '@/types';

/**
 * Data for all narrative scenarios in the game
 */
export const scenarios: Scenario[] = [
  // Antiquity Era Scenarios
  {
    id: "oracle_prophecy",
    title: "La Prophétie de l'Oracle",
    description: "En tant que conseiller d'un dirigeant en Grèce antique, vous recevez une prophétie ambiguë de l'Oracle de Delphes concernant une future bataille. Le dirigeant hésite sur la stratégie à adopter et se tourne vers vous pour interpréter la prophétie.",
    eraId: "antiquity",
    historicalContext: "Les oracles étaient considérés comme des intermédiaires entre les dieux et les hommes dans la Grèce antique. Leurs prophéties, souvent ambiguës, étaient interprétées pour justifier des décisions politiques et militaires.",
    imageType: "ancient",
    choices: [
      {
        id: "oracle_manipulate",
        text: "Réinterpréter entièrement la prophétie pour favoriser vos propres ambitions politiques",
        description: "Vous ignorez le message original et inventez une interprétation qui pousse le dirigeant vers une bataille qui servira vos intérêts personnels, peu importe les risques pour la cité.",
        type: "manipulation",
        consequences: {
          resources: { influence: 50, manipulationPoints: 40 },
          ethicalScore: -15,
          criticalThinking: -5
        }
      },
      {
        id: "oracle_moderate",
        text: "Proposer une interprétation favorable mais prudente",
        description: "Vous orientez subtilement l'interprétation pour encourager une action modérée qui sert à la fois le dirigeant et la stabilité de la cité.",
        type: "moderate",
        consequences: {
          resources: { credibility: 30, influence: 20 },
          ethicalScore: -5,
          criticalThinking: 0
        }
      },
      {
        id: "oracle_ethical",
        text: "Expliquer l'ambiguïté intrinsèque des prophéties",
        description: "Vous conseillez la prudence et expliquez comment les prophéties sont délibérément vagues pour pouvoir être interprétées de multiples façons. Vous encouragez le dirigeant à baser sa décision sur des informations concrètes plutôt que sur des présages.",
        type: "ethical",
        consequences: {
          resources: { credibility: 40, networks: 15 },
          ethicalScore: 15,
          criticalThinking: 10
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "propagateTheory",
      value: "ancientAstronomers"
    }
  },
  {
    id: "founding_myth",
    title: "Le Mythe Fondateur",
    description: "Vous êtes chargé de composer un récit sur les origines de votre cité. Ce mythe fondateur façonnera l'identité collective et légitimera la structure du pouvoir actuel.",
    eraId: "antiquity",
    historicalContext: "Les mythes de fondation, comme celui de Romulus et Remus pour Rome, servaient à établir une origine divine ou héroïque pour justifier l'ordre social et politique.",
    imageType: "ancient",
    choices: [
      {
        id: "myth_manipulate",
        text: "Inventer une ascendance divine pour la famille dirigeante",
        description: "Vous créez un récit qui établit une lignée directe entre les dieux et les dirigeants actuels, rendant toute opposition sacrilège.",
        type: "manipulation",
        consequences: {
          resources: { credibility: 45, influence: 40 },
          ethicalScore: -12,
          criticalThinking: -8
        }
      },
      {
        id: "myth_moderate",
        text: "Adapter des légendes existantes pour renforcer l'unité",
        description: "Vous intégrez des éléments de récits populaires dans un nouveau mythe qui valorise l'unité tout en subtillement légitimant la hiérarchie actuelle.",
        type: "moderate",
        consequences: {
          resources: { credibility: 25, networks: 30 },
          ethicalScore: -4,
          criticalThinking: 0
        }
      },
      {
        id: "myth_ethical",
        text: "Composer un récit inspirant basé sur des valeurs partagées",
        description: "Vous créez une histoire qui célèbre les vertus civiques et l'histoire commune, sans inventer de faux liens divins ni justifier des inégalités.",
        type: "ethical",
        consequences: {
          resources: { networks: 35, credibility: 20 },
          ethicalScore: 12,
          criticalThinking: 8
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "resourceThreshold",
      value: 200 // Influence threshold
    }
  },

  // Middle Ages Scenarios
  {
    id: "heresy_accusation",
    title: "L'Accusation d'Hérésie",
    description: "Un rival politique menace votre position d'influence. En tant que conseiller proche de l'autorité ecclésiastique locale, vous avez l'opportunité de l'accuser d'hérésie.",
    eraId: "middleAges",
    historicalContext: "Les accusations d'hérésie étaient souvent utilisées au Moyen Âge pour éliminer des rivaux politiques ou économiques sous couvert de défense de la foi.",
    imageType: "medieval",
    choices: [
      {
        id: "heresy_manipulate",
        text: "Orchestrer une campagne d'accusations graves avec de faux témoins",
        description: "Vous fabriquez des preuves et soudoyez des témoins pour accuser votre rival des pires hérésies, garantissant sa chute et peut-être son exécution.",
        type: "manipulation",
        consequences: {
          resources: { influence: 80, manipulationPoints: 60 },
          ethicalScore: -20,
          criticalThinking: -8
        }
      },
      {
        id: "heresy_moderate",
        text: "Suggérer des doutes subtils sur son orthodoxie",
        description: "Sans l'accuser directement, vous répandez des rumeurs et des questions sur certaines de ses pratiques, suffisamment pour l'affaiblir mais pas pour le détruire complètement.",
        type: "moderate",
        consequences: {
          resources: { influence: 40, networks: 30 },
          ethicalScore: -10,
          criticalThinking: -3
        }
      },
      {
        id: "heresy_ethical",
        text: "Refuser de détourner la religion à des fins personnelles",
        description: "Vous choisissez d'affronter votre rival sur des questions politiques légitimes plutôt que de pervertir le système religieux pour votre bénéfice.",
        type: "ethical",
        consequences: {
          resources: { credibility: 50, networks: 20 },
          ethicalScore: 15,
          criticalThinking: 12
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "ethicalAction",
      value: "protectAccused"
    }
  },
  {
    id: "royal_lineage",
    title: "La Chronique Royale",
    description: "Le nouveau roi vous commande d'écrire une chronique historique de sa lignée. Des recherches révèlent que sa famille a usurpé le trône il y a deux générations.",
    eraId: "middleAges",
    historicalContext: "Comme dans 'La Guerre des Irlandais contre les Étrangers', les chroniques médiévales étaient souvent réécrites pour légitimer les dirigeants en place, en inventant des lignées nobles ou en occultant des usurpations.",
    imageType: "medieval",
    choices: [
      {
        id: "lineage_manipulate",
        text: "Falsifier entièrement la chronique avec une généalogie inventée",
        description: "Vous créez une fausse généalogie qui lie le roi aux anciens souverains légitimes et supprimez toute mention de l'usurpation, allant jusqu'à détruire des documents contradictoires.",
        type: "manipulation",
        consequences: {
          resources: { credibility: 70, influence: 75 },
          ethicalScore: -18,
          criticalThinking: -10
        }
      },
      {
        id: "lineage_moderate",
        text: "Occulter l'usurpation en accentuant d'autres aspects",
        description: "Sans mentir directement, vous minimisez l'usurpation en la présentant comme une 'restauration légitime' et mettez l'accent sur les succès de la famille royale.",
        type: "moderate",
        consequences: {
          resources: { credibility: 40, networks: 35 },
          ethicalScore: -8,
          criticalThinking: -5
        }
      },
      {
        id: "lineage_ethical",
        text: "Présenter une version nuancée qui reconnaît l'histoire complexe",
        description: "Vous écrivez une chronique qui reconnaît l'usurpation mais qui met en contexte les circonstances historiques, tout en soulignant les qualités du roi actuel indépendamment de ses origines.",
        type: "ethical",
        consequences: {
          resources: { networks: 50, manipulationPoints: 15 },
          ethicalScore: 15,
          criticalThinking: 15
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "propagateTheory",
      value: "royalBloodlines"
    }
  },

  // Industrial Era Scenarios
  {
    id: "newspaper_scandal",
    title: "Le Scandale du Journal",
    description: "Votre journal a découvert un scandale potentiel impliquant un industriel puissant qui a des liens avec vos annonceurs. La publication pourrait avoir des répercussions financières importantes.",
    eraId: "industrial",
    historicalContext: "À l'ère industrielle, la presse devait naviguer entre révélation de la vérité et dépendance financière envers les puissants, créant des conflits d'intérêts fréquents.",
    imageType: "industrial",
    choices: [
      {
        id: "scandal_manipulate",
        text: "Enterrer complètement l'histoire et discréditer les témoins",
        description: "Vous supprimez toutes les preuves, intimidez les journalistes qui ont découvert l'affaire, et lancez une campagne pour discréditer les témoins qui tenteraient de parler à d'autres médias.",
        type: "manipulation",
        consequences: {
          resources: { influence: 100, manipulationPoints: 120 },
          ethicalScore: -25,
          criticalThinking: -15
        }
      },
      {
        id: "scandal_moderate",
        text: "Publier une version édulcorée qui préserve vos intérêts",
        description: "Vous publiez une version diluée du scandale qui révèle certains faits mais omet les détails les plus compromettants, permettant à l'industriel de sauver la face.",
        type: "moderate",
        consequences: {
          resources: { credibility: 60, networks: 50, influence: 30 },
          ethicalScore: -10,
          criticalThinking: -5
        }
      },
      {
        id: "scandal_ethical",
        text: "Publier l'enquête complète malgré les risques financiers",
        description: "Vous publiez toute l'histoire avec les preuves collectées, acceptant les risques financiers comme le prix à payer pour remplir votre mission journalistique.",
        type: "ethical",
        consequences: {
          resources: { credibility: 150, networks: -20 },
          ethicalScore: 20,
          criticalThinking: 20
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "upgradesPurchased",
      value: "sensationalism"
    }
  },
  {
    id: "pamphlet_revolution",
    title: "Le Pamphlet Révolutionnaire",
    description: "Dans une période de tensions sociales, vous avez l'opportunité de publier un pamphlet influent. Inspiré par 'Common Sense' de Thomas Paine, vous savez que votre écrit pourrait catalyser l'action collective.",
    eraId: "industrial",
    historicalContext: "Les pamphlets comme 'Common Sense' (1776) ont joué un rôle crucial dans la diffusion d'idées révolutionnaires, utilisant un langage simple et direct pour galvaniser l'opinion publique.",
    imageType: "industrial",
    choices: [
      {
        id: "pamphlet_manipulate",
        text: "Inciter à la violence avec des faits déformés",
        description: "Vous exagérez délibérément les injustices, inventez des atrocités et appelez explicitement à la violence contre les autorités, sachant que cela pourrait déclencher un conflit sanglant.",
        type: "manipulation",
        consequences: {
          resources: { influence: 110, networks: 90, manipulationPoints: 80 },
          ethicalScore: -25,
          criticalThinking: -20
        }
      },
      {
        id: "pamphlet_moderate",
        text: "Simplifier les enjeux pour provoquer l'indignation",
        description: "Vous présentez une version simplifiée de la situation qui met l'accent sur les torts réels mais ignore les nuances, utilisant un langage émotionnel pour mobiliser le soutien populaire.",
        type: "moderate",
        consequences: {
          resources: { influence: 70, networks: 60, credibility: 40 },
          ethicalScore: -8,
          criticalThinking: -5
        }
      },
      {
        id: "pamphlet_ethical",
        text: "Présenter une analyse honnête mais convaincante",
        description: "Vous écrivez un texte qui présente clairement les faits, reconnaît la complexité de la situation, mais articule néanmoins un argument puissant pour le changement basé sur des principes éthiques.",
        type: "ethical",
        consequences: {
          resources: { credibility: 100, networks: 40, influence: 30 },
          ethicalScore: 18,
          criticalThinking: 22
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "propagateTheory",
      value: "commonSenseFalsehood"
    }
  },

  // Cold War Scenarios
  {
    id: "intelligence_report",
    title: "Le Rapport de Renseignement",
    description: "En tant qu'analyste du renseignement, vous devez préparer un rapport sur les intentions d'une puissance rivale. Les preuves sont ambiguës, mais la pression politique pour présenter une menace claire est forte.",
    eraId: "coldWar",
    historicalContext: "Pendant la Guerre froide, le renseignement était souvent politisé, avec une pression pour présenter des analyses qui soutenaient la position idéologique dominante, même quand les preuves étaient insuffisantes.",
    imageType: "modern",
    choices: [
      {
        id: "intelligence_manipulate",
        text: "Fabriquer des preuves pour dépeindre une menace imminente",
        description: "Vous créez de fausses preuves et exagérez massivement la menace pour justifier une réponse agressive, sachant que cela pourrait mener à une escalade dangereuse du conflit.",
        type: "manipulation",
        consequences: {
          resources: { influence: 200, manipulationPoints: 150 },
          ethicalScore: -30,
          criticalThinking: -25
        }
      },
      {
        id: "intelligence_moderate",
        text: "Accentuer certains indices tout en ignorant les contradictions",
        description: "Vous sélectionnez les preuves qui soutiennent la vision politique attendue tout en minimisant celles qui la contredisent, produisant un rapport biaisé mais pas entièrement fabriqué.",
        type: "moderate",
        consequences: {
          resources: { credibility: 100, influence: 120 },
          ethicalScore: -15,
          criticalThinking: -10
        }
      },
      {
        id: "intelligence_ethical",
        text: "Présenter une analyse équilibrée reflétant les incertitudes",
        description: "Vous rédigez un rapport honnête qui présente toutes les preuves disponibles, y compris les contradictions, et qui reconnaît les limites de ce que l'on peut conclure avec certitude.",
        type: "ethical",
        consequences: {
          resources: { credibility: 180, networks: 50 },
          ethicalScore: 25,
          criticalThinking: 30
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "propagateTheory",
      value: "manufacturedConsent"
    }
  },
  {
    id: "televised_crisis",
    title: "La Crise Télévisée",
    description: "Une crise internationale se développe et vous êtes responsable de sa couverture médiatique. La façon dont vous présentez les événements pourrait influencer l'opinion publique et la réponse politique.",
    eraId: "coldWar",
    historicalContext: "La télévision a transformé la couverture des crises pendant la Guerre froide, avec des événements comme la crise des missiles de Cuba où la présentation médiatique a fortement influencé la perception publique et les décisions politiques.",
    imageType: "modern",
    choices: [
      {
        id: "crisis_manipulate",
        text: "Orchestrer une couverture alarmiste pour semer la panique",
        description: "Vous diffusez des images sélectionnées et des témoignages extrêmes pour maximiser la peur, présentant la crise comme une menace existentielle qui ne peut être résolue que par des mesures radicales.",
        type: "manipulation",
        consequences: {
          resources: { influence: 180, networks: 150, manipulationPoints: 130 },
          ethicalScore: -30,
          criticalThinking: -25
        }
      },
      {
        id: "crisis_moderate",
        text: "Simplifier la situation selon la ligne officielle",
        description: "Vous présentez une version simplifiée de la crise qui s'aligne sur la position officielle, en mettant l'accent sur certains aspects tout en négligeant d'autres perspectives importantes.",
        type: "moderate",
        consequences: {
          resources: { credibility: 120, influence: 100, networks: 80 },
          ethicalScore: -12,
          criticalThinking: -8
        }
      },
      {
        id: "crisis_ethical",
        text: "Offrir une couverture complète et contextuelle",
        description: "Vous présentez la crise dans toute sa complexité, incluant diverses perspectives, expliquant le contexte historique, et évitant le sensationnalisme tout en informant complètement le public.",
        type: "ethical",
        consequences: {
          resources: { credibility: 200, networks: 70 },
          ethicalScore: 25,
          criticalThinking: 30
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "upgradesPurchased",
      value: "massBroadcasting"
    }
  },

  // Digital Era Scenarios
  {
    id: "algorithm_design",
    title: "L'Algorithme d'Information",
    description: "Vous dirigez l'équipe qui conçoit l'algorithme de recommandation d'une plateforme majeure de médias sociaux. Vos décisions détermineront ce que des millions de personnes verront quotidiennement.",
    eraId: "digital",
    historicalContext: "Les algorithmes des réseaux sociaux façonnent profondément notre consommation d'information, créant des bulles de filtres qui peuvent renforcer les opinions existantes et polariser le débat public.",
    imageType: "digital",
    choices: [
      {
        id: "algorithm_manipulate",
        text: "Optimiser pour l'engagement maximal peu importe le contenu",
        description: "Vous concevez l'algorithme pour promouvoir exclusivement le contenu qui génère le plus d'engagement, sachant que cela favorisera souvent la désinformation sensationnaliste et la polarisation extrême.",
        type: "manipulation",
        consequences: {
          resources: { influence: 300, networks: 250, manipulationPoints: 200 },
          ethicalScore: -35,
          criticalThinking: -30
        }
      },
      {
        id: "algorithm_moderate",
        text: "Équilibrer engagement et qualité selon les intérêts commerciaux",
        description: "Vous intégrez quelques contrôles de qualité mais maintenez une priorité sur l'engagement, créant un système qui limite les pires contenus mais favorise toujours la polarisation modérée et les simplifications attrayantes.",
        type: "moderate",
        consequences: {
          resources: { credibility: 150, influence: 180, networks: 120 },
          ethicalScore: -15,
          criticalThinking: -10
        }
      },
      {
        id: "algorithm_ethical",
        text: "Privilégier la diversité des perspectives et la qualité de l'information",
        description: "Vous concevez un algorithme qui expose intentionnellement les utilisateurs à diverses perspectives, promeut le contenu de haute qualité journalistique, et limite la propagation de la désinformation, même au prix d'un engagement réduit.",
        type: "ethical",
        consequences: {
          resources: { credibility: 250, networks: 100, manipulationPoints: -50 },
          ethicalScore: 30,
          criticalThinking: 35
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "upgradesPurchased",
      value: "socialMediaAlgorithms"
    }
  },
  {
    id: "deepfake_dilemma",
    title: "Le Dilemme du Deepfake",
    description: "Votre organisation a développé une technologie avancée de deepfake capable de créer des vidéos indétectables de personnalités publiques. Vous devez décider comment cette technologie sera utilisée.",
    eraId: "digital",
    historicalContext: "Les technologies d'hypertrucage (deepfake) représentent un défi sans précédent pour la vérification de l'information, rendant de plus en plus difficile la distinction entre contenu authentique et fabriqué.",
    imageType: "digital",
    choices: [
      {
        id: "deepfake_manipulate",
        text: "Créer des vidéos compromettantes d'opposants politiques",
        description: "Vous utilisez la technologie pour fabriquer des vidéos convaincantes montrant des adversaires dans des situations compromettantes ou tenant des propos extrêmes, sachant qu'elles seront virales avant d'être potentiellement démystifiées.",
        type: "manipulation",
        consequences: {
          resources: { influence: 350, manipulationPoints: 300, networks: 250 },
          ethicalScore: -40,
          criticalThinking: -35
        }
      },
      {
        id: "deepfake_moderate",
        text: "Utiliser la technologie pour des contenus 'humoristiques' avec disclaimer",
        description: "Vous créez des vidéos satiriques ou humoristiques qui, bien qu'identifiées comme fausses, brouillent néanmoins la distinction entre réel et fabriqué et normalisent l'utilisation de cette technologie.",
        type: "moderate",
        consequences: {
          resources: { credibility: 150, influence: 200, networks: 180 },
          ethicalScore: -20,
          criticalThinking: -15
        }
      },
      {
        id: "deepfake_ethical",
        text: "Développer des outils de détection et sensibiliser le public",
        description: "Vous réorientez vos ressources vers la création d'outils permettant de détecter les deepfakes et lancez une campagne d'éducation pour sensibiliser le public aux dangers de cette technologie.",
        type: "ethical",
        consequences: {
          resources: { credibility: 300, networks: 150 },
          ethicalScore: 35,
          criticalThinking: 40
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "upgradesPurchased",
      value: "deepfakeTechnology"
    }
  },
  {
    id: "cognitive_bias_exploitation",
    title: "L'Exploitation des Biais Cognitifs",
    description: "Votre équipe de recherche a identifié des moyens précis d'exploiter les biais cognitifs à l'échelle mondiale grâce à l'IA. Vous devez décider comment utiliser ces connaissances inspirées des travaux de Kahneman.",
    eraId: "digital",
    historicalContext: "Les recherches de Daniel Kahneman sur les biais cognitifs ont révélé comment notre pensée est systématiquement vulnérable à certaines erreurs, connaissance qui peut être utilisée pour manipuler à grande échelle à l'ère numérique.",
    imageType: "digital",
    choices: [
      {
        id: "bias_manipulate",
        text: "Déployer un système global d'influence comportementale",
        description: "Vous implémentez des systèmes d'IA qui exploitent systématiquement les biais cognitifs pour maximiser l'influence sur les comportements, sachant que cela compromet l'autonomie des individus à une échelle sans précédent.",
        type: "manipulation",
        consequences: {
          resources: { influence: 400, manipulationPoints: 350, networks: 300 },
          ethicalScore: -45,
          criticalThinking: -40
        }
      },
      {
        id: "bias_moderate",
        text: "Utiliser ces techniques pour des causes 'positives'",
        description: "Vous déployez ces techniques pour influencer les comportements vers ce que vous considérez comme 'positif' (écologie, santé), justifiant la manipulation par ses intentions louables.",
        type: "moderate",
        consequences: {
          resources: { credibility: 200, influence: 250, networks: 200 },
          ethicalScore: -25,
          criticalThinking: -15
        }
      },
      {
        id: "bias_ethical",
        text: "Créer des outils d'auto-défense cognitive",
        description: "Vous développez des technologies qui aident les individus à reconnaître et à contrer leurs propres biais cognitifs, renforçant leur autonomie intellectuelle plutôt que de l'exploiter.",
        type: "ethical",
        consequences: {
          resources: { credibility: 350, networks: 150, manipulationPoints: -100 },
          ethicalScore: 40,
          criticalThinking: 45
        }
      }
    ],
    completed: false,
    triggerCondition: {
      type: "upgradesPurchased",
      value: "cognitiveBiasExploitation"
    }
  }
];