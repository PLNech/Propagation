import React, { useReducer, useEffect, useState } from 'react';
import { gameReducer, initialGameState } from './gameReducer';
import ResourceDisplay from './ResourceDisplay';
import GameControls from './GameControls';
import ProgressionTab from './ProgressionTab';
import UpgradesTab from './UpgradesTab';
import TheoriesTab from './TheoriesTab';
import EthicsTab from './EthicsTab';
import GameEndingModal from './GameEndingModal';
import NotificationSystem, { useNotifications } from './NotificationSystem';
import { HistoricalEra, GameMode } from './types';

// Tab types
type TabType = 'resources' | 'progression' | 'upgrades' | 'theories' | 'ethics';

/**
 * Main game component with all systems including ethics
 */
const PropagationGame = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [activeTab, setActiveTab] = useState<TabType>('resources');
  const { notifications, addNotification, dismissNotification } = useNotifications();

  // Get the current era object
  const currentEra = gameState.eras.find(era => era.id === gameState.currentEraId) as HistoricalEra;
  
  // Get the active ending if game has ended
  const activeEnding = gameState.activeEndingId 
    ? gameState.gameEndings.find(ending => ending.id === gameState.activeEndingId) 
    : null;

  // Set up the tick system
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TICK', payload: { currentTime: Date.now() } });
    }, gameState.tickInterval);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [gameState.tickInterval]);

  // Handle the manipulate button click
  const handleManipulate = () => {
    dispatch({ type: 'MANIPULATE' });
  };
  
  // Handle era unlocking
  const handleUnlockEra = (eraId: string) => {
    dispatch({ type: 'UNLOCK_ERA', payload: { eraId } });
    const eraName = gameState.eras.find(e => e.id === eraId)?.name;
    addNotification(`Nouvelle ère débloquée: ${eraName}`, 'success');
  };
  
  // Handle era selection
  const handleSelectEra = (eraId: string) => {
    dispatch({ type: 'SELECT_ERA', payload: { eraId } });
    const eraName = gameState.eras.find(e => e.id === eraId)?.name;
    addNotification(`Ère sélectionnée: ${eraName}`, 'info');
  };
  
  // Handle upgrade purchase
  const handlePurchaseUpgrade = (upgradeId: string) => {
    dispatch({ type: 'PURCHASE_UPGRADE', payload: { upgradeId } });
    const upgradeName = gameState.upgrades.find(u => u.id === upgradeId)?.name;
    addNotification(`Amélioration achetée: ${upgradeName}`, 'success');
  };
  
  // Handle theory propagation
  const handlePropagateTheory = (theoryId: string) => {
    const theory = gameState.conspiracyTheories.find(t => t.id === theoryId);
    if (!theory) return;
    
    dispatch({ type: 'PROPAGATE_THEORY', payload: { theoryId } });
    
    // Determine success based on theory's success rate
    const isSuccessful = Math.random() < theory.successRate;
    
    if (isSuccessful) {
      addNotification(`Théorie propagée avec succès: ${theory.name}`, 'success');
      // Show ethical impact notification
      if (theory.ethicalImpact < 0) {
        addNotification(`Impact éthique: ${theory.ethicalImpact}`, 'ethical', 5000);
      }
    } else {
      addNotification(`Échec de la propagation: ${theory.name}`, 'error');
    }
  };
  
  // Handle ethical action
  const handlePerformEthicalAction = (actionId: string) => {
    const action = gameState.ethicalActions.find(a => a.id === actionId);
    if (!action) return;
    
    dispatch({ type: 'PERFORM_ETHICAL_ACTION', payload: { actionId } });
    
    addNotification(`Action éthique réalisée: ${action.name}`, 'ethical');
    addNotification(`Pensée critique +${action.criticalThinkingGain}`, 'info');
  };
  
  // Handle game mode switch
  const handleSwitchGameMode = (mode: GameMode) => {
    if (gameState.gameMode === mode) return;
    
    dispatch({ type: 'SWITCH_GAME_MODE', payload: { mode } });
    
    if (mode === 'manipulation') {
      addNotification('Mode Manipulation activé: exploitez les faiblesses des systèmes d\'information', 'warning');
    } else {
      addNotification('Mode Révélation activé: exposez les mécanismes de manipulation', 'ethical');
    }
  };
  
  // Handle game ending acknowledgement
  const handleAcknowledgeEnding = (endingId: string) => {
    dispatch({ type: 'ACKNOWLEDGE_ENDING', payload: { endingId } });
    addNotification('Fin débloquée! Continuez à explorer d\'autres possibilités.', 'info', 5000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Propagation
        </h1>
        <h2 className="text-xl mb-6 text-center text-gray-300">
          Un Jeu Incrémental de Manipulation Sociale
        </h2>
        
        {/* Game Ending Modal */}
        {gameState.gameEnded && activeEnding && (
          <GameEndingModal
            ending={activeEnding}
            stats={gameState.ethicalStats}
            onAcknowledge={handleAcknowledgeEnding}
          />
        )}
        
        {/* Notification System */}
        <NotificationSystem 
          notifications={notifications}
          onDismiss={dismissNotification}
        />
        
        {/* Current era display */}
        <div className="bg-gray-800 p-3 rounded-lg mb-4 text-center">
          <p className="text-sm text-gray-400">Ère actuelle</p>
          <p className="text-lg font-semibold">{currentEra.name}</p>
        </div>
        
        {/* Stats bar */}
        <div className="bg-gray-800 p-3 rounded-lg mb-4 grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Score Éthique</p>
              <p className={`text-sm font-semibold ${
                gameState.ethicalScore >= 80 ? 'text-green-400' : 
                gameState.ethicalScore >= 50 ? 'text-yellow-400' : 
                gameState.ethicalScore >= 30 ? 'text-orange-400' : 
                'text-red-400'
              }`}>
                {gameState.ethicalScore}/100
              </p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
              <div 
                className={`h-full ${
                  gameState.ethicalScore >= 80 ? 'bg-green-600' : 
                  gameState.ethicalScore >= 50 ? 'bg-yellow-600' : 
                  gameState.ethicalScore >= 30 ? 'bg-orange-600' : 
                  'bg-red-600'
                }`}
                style={{ width: `${gameState.ethicalScore}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Pensée Critique</p>
              <p className="text-sm font-semibold text-blue-400">
                {gameState.criticalThinking}/100
              </p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-blue-600"
                style={{ width: `${gameState.criticalThinking}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Game mode indicator */}
        <div className={`mb-4 p-2 rounded-lg flex justify-center items-center ${
          gameState.gameMode === 'manipulation' ? 'bg-red-900' : 'bg-green-900'
        }`}>
          <p className="text-sm font-medium">
            Mode: {gameState.gameMode === 'manipulation' ? 'Manipulation' : 'Révélation'}
          </p>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex flex-wrap mb-4 border-b border-gray-700">
          <button
            className={`py-2 px-4 ${activeTab === 'resources' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('resources')}
          >
            Ressources
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'progression' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('progression')}
          >
            Progression
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'upgrades' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('upgrades')}
          >
            Améliorations
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'theories' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('theories')}
          >
            Théories
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'ethics' ? 'border-b-2 border-green-500 text-green-300' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => setActiveTab('ethics')}
          >
            Éthique
          </button>
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'resources' && (
          <>
            <ResourceDisplay resources={gameState.resources} />
            <GameControls onManipulate={handleManipulate} />
            
            {/* Era benefits preview */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Avantages de l'ère: {currentEra.name}</h3>
              <p className="text-sm text-gray-300 mb-3">{currentEra.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(currentEra.resourceMultipliers).map(([resource, multiplier]) => (
                  <div key={resource} className="flex justify-between items-center">
                    <span>{resource}:</span>
                    <span className="text-blue-300">
                      x{multiplier}
                    </span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setActiveTab('progression')}
                className="mt-3 w-full py-1 text-sm bg-purple-800 hover:bg-purple-700 rounded"
              >
                Voir toutes les ères
              </button>
            </div>
          </>
        )}
        
        {activeTab === 'progression' && (
          <ProgressionTab
            eras={gameState.eras}
            currentEraId={gameState.currentEraId}
            influence={gameState.resources.influence}
            onUnlockEra={handleUnlockEra}
            onSelectEra={handleSelectEra}
          />
        )}
        
        {activeTab === 'upgrades' && (
          <UpgradesTab
            upgrades={gameState.upgrades}
            resources={gameState.resources}
            currentEraId={gameState.currentEraId}
            onPurchaseUpgrade={handlePurchaseUpgrade}
          />
        )}
        
        {activeTab === 'theories' && (
          <TheoriesTab
            theories={gameState.conspiracyTheories}
            manipulationPoints={gameState.resources.manipulationPoints}
            ethicalScore={gameState.ethicalScore}
            currentEraId={gameState.currentEraId}
            onPropagateTheory={handlePropagateTheory}
          />
        )}
        
        {activeTab === 'ethics' && (
          <EthicsTab
            ethicalScore={gameState.ethicalScore}
            criticalThinking={gameState.criticalThinking}
            ethicalActions={gameState.ethicalActions}
            resources={gameState.resources}
            gameMode={gameState.gameMode}
            currentEraId={gameState.currentEraId}
            educationalContent={gameState.educationalContent}
            quotes={gameState.criticalThinkingQuotes}
            stats={gameState.ethicalStats}
            onPerformEthicalAction={handlePerformEthicalAction}
            onSwitchGameMode={handleSwitchGameMode}
          />
        )}
        
        {/* Educational note */}
        <div className="mt-8 p-3 bg-gray-800 rounded text-xs text-gray-400">
          <p>Note éducative: Ce jeu vise à sensibiliser aux mécanismes de propagation de la désinformation et à développer l'esprit critique. Les "points éthiques" représentent l'intégrité de l'information que vous partagez. La "pensée critique" représente la capacité collective à remettre en question les informations reçues. Le jeu propose deux façons de jouer: exploiter ces mécanismes ou les révéler. À vous de choisir votre chemin.</p>
        </div>
      </div>
    </div>
  );
};

export default PropagationGame;