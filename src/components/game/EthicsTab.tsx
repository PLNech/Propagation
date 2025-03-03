import React, { useState } from 'react';
import { 
  EthicalAction, 
  GameResources, 
  EducationalContent, 
  CriticalThinkingQuote, 
  EthicalStats,
  GameMode 
} from './types';
import EthicalActionCard from './EthicalActionCard';
import EducationalCard from './EducationalCard';
import QuoteCard from './QuoteCard';

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
}

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
  onSwitchGameMode
}) => {
  const [activeSection, setActiveSection] = useState<'actions' | 'education' | 'stats'>('actions');
  
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
      
      {/* Mode Switch */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Mode de Jeu</h3>
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
          >
            Révélation
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-300">
          {gameMode === 'manipulation' 
            ? "En mode Manipulation, vous exploitez les faiblesses des systèmes d'information pour répandre votre influence."
            : "En mode Révélation, vous exposez les mécanismes de manipulation et éduquez le public à la pensée critique."
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
          Éducation
        </button>
        <button
          className={`py-2 px-4 ${activeSection === 'stats' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveSection('stats')}
        >
          Statistiques
        </button>
      </div>
      
      {/* Actions Section */}
      {activeSection === 'actions' && (
        <div>
          <p className="text-gray-300 mb-4">
            Ces actions renforcent l'éthique et la pensée critique, mais nécessitent de sacrifier des ressources. 
            Chaque action représente un choix en faveur de l'intégrité plutôt que de la manipulation.
          </p>
          
          {currentEraActions.length === 0 && performedActions.length === 0 ? (
            <div className="text-center p-6 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Aucune action éthique disponible dans cette ère pour le moment.</p>
              <p className="text-gray-500 text-sm mt-2">Progressez davantage ou débloquez de nouvelles ères pour accéder à plus d'actions.</p>
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
            Ces informations expliquent les mécanismes de manipulation que vous utilisez ou contrez dans le jeu.
            Comprendre ces mécanismes est la première étape pour s'en protéger dans le monde réel.
          </p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Techniques de Manipulation</h3>
            {currentEraContent.map(content => (
              <EducationalCard key={content.id} content={content} />
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Citations sur la Pensée Critique</h3>
            {getRelevantQuotes().map(quote => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        </div>
      )}
      
      {/* Stats Section */}
      {activeSection === 'stats' && (
        <div>
          <p className="text-gray-300 mb-4">
            Ces statistiques reflètent l'impact cumulatif de vos actions tout au long du jeu,
            tant positives que négatives.
          </p>
          
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Impact Global</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-300">Diffusion d'Information</h4>
                <p className="text-2xl font-bold">{stats.livesImpacted.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Personnes impactées par vos actions</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-300">Fins Débloquées</h4>
                <p className="text-2xl font-bold">{stats.endingsUnlocked} / {5}</p>
                <p className="text-xs text-gray-400">Trajectoires narratives découvertes</p>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <h4 className="font-medium mb-2 text-gray-300">Intégrité vs Manipulation</h4>
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
                <h4 className="font-medium mb-2 text-gray-300">Sacrifice pour l'Éthique</h4>
                <p className="text-2xl font-bold">{stats.influenceSacrificed.toFixed(0)}</p>
                <p className="text-xs text-gray-400">Influence sacrifiée pour des actions éthiques</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Profil Éthique</h3>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthicsTab;