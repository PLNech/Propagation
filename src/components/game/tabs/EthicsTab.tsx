import React, { useEffect, useRef, useState } from 'react';
import { 
  EthicalAction, 
  GameResources, 
  EducationalContent, 
  CriticalThinkingQuote, 
  EthicalStats,
  GameMode, 
  GameAction
} from '@/types';
import EthicalActionCard from '../cards/EthicalActionCard';
import EducationalCard from '../cards/EducationalCard';
import QuoteCard from '../cards/QuoteCard';

interface EthicsTabProps {
  ethicalScore: number;
  criticalThinking: number;
  ethicalActions: EthicalAction[];
  resources: GameResources;
  gameMode: GameMode;
  currentEraId: string;
  educationalContent: EducationalContent[];
  quotes: CriticalThinkingQuote[];
  stats: EthicalStats;
  onPerformEthicalAction: (actionId: string) => void;
  onSwitchGameMode: (mode: GameMode) => void;
  dispatch: React.Dispatch<GameAction>;
}

  // Messages ironiques aléatoires
  const getRandomMessage = () => {
    const messages = [
      "Ah, l'éthique... cette relique d'une époque où on avait encore le temps d'y penser.",
      "Si vous lisez ceci, vous êtes parmi les rares à se soucier encore de l'éthique. Félicitations?",
      "Rappel: Les points d'éthique n'ont pas de valeur monétaire. Dommage.",
      "Être éthique dans un monde qui ne l'est pas... quel acte de rébellion.",
      "La pensée critique est le bug que personne n'a réussi à patcher.",
      "Certains joueurs affirment que ce jeu serait plus facile en ignorant cet onglet. Étrange...",
      "Cette section a-t-elle toujours existé? Vos souvenirs semblent flous à ce sujet...",
      "Les données de cette section pourraient différer de ce que d'autres joueurs voient. Coïncidence?",
      "L'éthique ? Ah oui, ce truc qui fait perdre du temps à ceux qui veulent gagner.",
      "Les leaders charismatiques ont une éthique. Ils savent juste quand l'ignorer.",
      "Vous êtes persuadé d'être une bonne personne ? Intéressant. Continuez.",
      "Choisissez bien vos valeurs. Après tout, elles définiront la manière dont vous expliquerez vos choix.",
      "La morale évolue avec le temps... ou avec les opportunités.",
      "Agir avec éthique, c'est bien. Faire croire aux autres qu'on agit avec éthique, c'est mieux.",
      "La bonne nouvelle ? Il y aura toujours pire que vous. Dormez tranquille.",
      "La pensée critique est un muscle. Heureusement, peu de gens lui font faire des reps.",
      "Le doute est une vertu… jusqu’à ce que vous le remettiez en question.",
      "On dit que la vérité libère. Mais pas toutes.",
      "Penser par soi-même est un art. Suivre la foule est une science.",
      "Les faits ne se soucient pas de votre opinion. Dommage que ça soit réciproque.",
      "Chaque mensonge bien raconté a un public prêt à y croire.",
      "Seuls les naïfs croient qu'ils ne sont jamais manipulés. Vous êtes naïf ?"
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };



/**
 * Tab component for ethics, educational content, and critical thinking
 */
const EthicsTab: React.FC<EthicsTabProps> = ({ 
  ethicalScore,
  criticalThinking,
  ethicalActions,
  resources,
  gameMode,
  currentEraId,
  educationalContent,
  quotes,
  stats,
  onPerformEthicalAction,
  onSwitchGameMode,
  dispatch
}) => {
  const [activeSection, setActiveSection] = useState<'actions' | 'education' | 'stats'>('actions');
  const [showGlitch, setShowGlitch] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const [randomMessage, setRandomMessage] = useState(getRandomMessage());
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Stocker l'ID de l'intervalle

  // Filter actions for current era
  const currentEraActions = ethicalActions.filter(
    action => action.eraId === currentEraId && !action.performed
  );
  
  const performedActions = ethicalActions.filter(
    action => action.performed
  );
  
  // Filter educational content for current era
  const currentEraContent = educationalContent.filter(
    content => content.eraId === currentEraId
  );
  
  // Get random quotes, preferring those matching current era
  const getRelevantQuotes = () => {
    const eraQuotes = quotes.filter(quote => quote.era === currentEraId);
    const otherQuotes = quotes.filter(quote => quote.era !== currentEraId);
    
    // Return 3 quotes, prioritizing era-relevant ones
    return [...eraQuotes, ...otherQuotes].slice(0, 3);
  };
  
  // Get ethical score color
  const getEthicalScoreColor = () => {
    if (ethicalScore >= 80) return 'text-green-400';
    if (ethicalScore >= 50) return 'text-yellow-400';
    if (ethicalScore >= 30) return 'text-orange-400';
    return 'text-red-400';
  };
  
  // Get critical thinking color
  const getCriticalThinkingColor = () => {
    if (criticalThinking >= 80) return 'text-blue-400';
    if (criticalThinking >= 50) return 'text-blue-300';
    if (criticalThinking >= 30) return 'text-blue-200';
    return 'text-gray-400';
  };

  // Random message glitch + fade effect
  useEffect(() => {
    if (intervalRef.current) return;
  
    intervalRef.current = setInterval(() => {
      setShowGlitch(true); // Début du glitch (disparition)
  
      setTimeout(() => {
        setShowGlitch(false); // Fin du glitch
        setRandomMessage(getRandomMessage()); // Changer le message
        setFadeIn(true); // Activer l’effet de fondu
  
        setTimeout(() => {
          setFadeIn(false); // Retirer l’effet après animation
        }, 1500); // Durée de fade-in
      }, 3000); // Temps de disparition glitch
  
    }, 10000); // Intervalle entre les messages
  
   return () => {        
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);
    
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Éthique & Réflexion</h2>
        <div className="flex space-x-4">
          <div>
            <span className="text-sm">Éthique:</span>
            <span className={`ml-1 font-bold ${getEthicalScoreColor()}`}>{ethicalScore}</span>
          </div>
          <div>
            <span className="text-sm">Pensée critique:</span>
            <span className={`ml-1 font-bold ${getCriticalThinkingColor()}`}>{criticalThinking}</span>
          </div>
        </div>
      </div>
      
      {/* Ironic message */}
      <div className="bg-gray-800 p-3 rounded-lg mb-4 text-sm text-gray-400 italic">
        <span className={`${showGlitch ? "glitch-fade-out" : ""} ${fadeIn ? "fade-in" : ""}`}>
          {randomMessage}
        </span>
      </div>
      
      {/* Mode Switch */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Choisissez votre camp</h3>
        <div className="flex">
          <button
            className={`flex-1 py-2 px-4 rounded-l-lg ${
              gameMode === 'manipulation' 
                ? 'bg-red-900 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => onSwitchGameMode('manipulation')}
          >
            Manipulation
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-r-lg ${
              gameMode === 'revelation' 
                ? 'bg-green-800 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => onSwitchGameMode('revelation')}
            title={currentEraId !== 'coldWar' && currentEraId !== 'digital' ? "Ce mode sera débloqué plus tard dans le jeu..." : ""}
            onTouchStart={(e) => {
              if (currentEraId !== 'coldWar' && currentEraId !== 'digital') {
                alert("Ce mode sera débloqué plus tard dans le jeu...");
                e.preventDefault();
              }
            }}
          >
            Révélation {currentEraId !== 'coldWar' && currentEraId !== 'digital' && '🔒'}
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-300">
          {gameMode === 'manipulation' 
            ? "Qui se soucie de la vérité quand le pouvoir est à portée de main? Continuez à manipuler l'information, c'est tellement plus efficace..."
            : "Ah, vous avez choisi le camp des idéalistes. Espérons que la vérité vous mènera quelque part, dans ce monde qui préfère les mensonges confortables."
          }
        </p>
      </div>
      
      {/* Section Navigation */}
      <div className="flex mb-4 border-b border-gray-700">
        <button
          className={`py-2 px-4 ${activeSection === 'actions' ? 'border-b-2 border-green-500 text-green-300' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveSection('actions')}
        >
          Actions Éthiques
        </button>
        <button
          className={`py-2 px-4 ${activeSection === 'education' ? 'border-b-2 border-blue-500 text-blue-300' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveSection('education')}
        >
          Techniques
        </button>
        <button
          className={`py-2 px-4 ${activeSection === 'stats' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveSection('stats')}
        >
          Impact
        </button>
      </div>
      
      {/* Actions Section */}
      {activeSection === 'actions' && (
        <div>
          <p className="text-gray-300 mb-4">
            Sacrifiez des ressources pour des &quot;principes&quot; — comme c&apos;est mignon. 
            Mais peut-être que dans ce jeu comme dans la vie, le chemin difficile a ses propres récompenses...
          </p>
          
          {currentEraActions.length === 0 && performedActions.length === 0 ? (
            <div className="text-center p-6 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Aucune action éthique disponible dans cette ère pour le moment.</p>
              <p className="text-gray-500 text-sm mt-2 italic">Étrange, il y en avait peut-être ici avant? Ou est-ce juste votre imagination...</p>
            </div>
          ) : (
            <>
              {currentEraActions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Actions Disponibles</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {currentEraActions.map(action => (
                      <EthicalActionCard
                        key={action.id}
                        action={action}
                        resources={resources}
                        onPerform={onPerformEthicalAction}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {performedActions.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Actions Réalisées</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {performedActions.map(action => (
                      <EthicalActionCard
                        key={action.id}
                        action={action}
                        resources={resources}
                        onPerform={onPerformEthicalAction}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* Education Section */}
      {activeSection === 'education' && (
        <div>
          <p className="text-gray-300 mb-4">
            Voici les techniques que vous utilisez — ou que vous combattez, selon votre humeur du jour.
            La frontière est si mince qu&apos;on pourrait la franchir sans s&apos;en apercevoir...
          </p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Techniques de l&apos;Ère</h3>
            {currentEraContent.map(content => (
              <EducationalCard key={content.id} content={content} dispatch={dispatch} />
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Paroles des Sages</h3>
            <p className="text-sm text-gray-400 italic mb-3">
              Ils étaient si confiants dans leurs vérités... Touchant, n&apos;est-ce pas?
            </p>
            {getRelevantQuotes().map(quote => (
              <QuoteCard key={quote.id} quote={quote} dispatch={dispatch} />
            ))}
          </div>
        </div>
      )}
      
      {/* Stats Section */}
      {activeSection === 'stats' && (
        <div>
          <p className="text-gray-300 mb-4">
            Les chiffres ne mentent pas... ou peut-être que si? Après tout, c&apos;est vous qui les fabriquez.
            Voici l&apos;impact que vous prétendez avoir sur ce monde virtuel.
          </p>
          
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Votre Héritage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-300">Diffusion d&apos;Information</h4>
                <p className="text-2xl font-bold">{stats.livesImpacted.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Esprits influencés (pour le meilleur ou le pire)</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-300">Fins Découvertes</h4>
                <p className="text-2xl font-bold">{stats.endingsUnlocked} / {5}</p>
                <p className="text-xs text-gray-400">Réalités alternatives explorées</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-300">Vérité vs Mensonge</h4>
                <div className="flex items-center">
                  <div className="flex-1 h-4 bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600"
                      style={{ width: `${(stats.ethicalActionsPerformed / (stats.ethicalActionsPerformed + stats.theoriesPropagated || 1)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="ml-2 text-sm">
                    <span className="text-green-400">{stats.ethicalActionsPerformed}</span>
                    <span className="text-gray-400"> / </span>
                    <span className="text-red-400">{stats.theoriesPropagated}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Actions éthiques vs Théories propagées</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-300">Prix de la Conscience</h4>
                <p className="text-2xl font-bold">{stats.influenceSacrificed.toFixed(0)}</p>
                <p className="text-xs text-gray-400">Influence sacrifiée sur l&apos;autel de l&apos;éthique</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Votre Profil</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Score Éthique</span>
                <span className={getEthicalScoreColor()}>{ethicalScore}/100</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    ethicalScore >= 80 ? 'bg-green-600' : 
                    ethicalScore >= 50 ? 'bg-yellow-600' : 
                    ethicalScore >= 30 ? 'bg-orange-600' : 
                    'bg-red-600'
                  }`}
                  style={{ width: `${ethicalScore}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1 italic">
                {ethicalScore < 30 ? "La morale est un luxe que vous ne pouvez plus vous permettre." :
                 ethicalScore < 60 ? "Assez d'éthique pour dormir la nuit, pas assez pour changer le monde." :
                 "Votre conscience est presque aussi propre que vous le prétendez."}
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>Pensée Critique</span>
                <span className={getCriticalThinkingColor()}>{criticalThinking}/100</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600"
                  style={{ width: `${criticalThinking}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1 italic">
                {criticalThinking < 30 ? "Pourquoi réfléchir quand on peut simplement croire?" :
                 criticalThinking < 60 ? "Vous commencez à voir les ficelles de la manipulation." :
                 "Vous voyez à travers le jeu... ou est-ce le jeu qui vous voit?"}
              </p>
            </div>
          </div>
          
          {/* Easter egg message with random chance */}
          {Math.random() > 0.8 && (
            <div className="mt-4 p-3 bg-gray-900 rounded text-xs text-gray-500 italic">
              {"// Les statistiques ont-elles changé depuis la dernière fois que vous les avez regardées? Un bug... ou autre chose?"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EthicsTab;