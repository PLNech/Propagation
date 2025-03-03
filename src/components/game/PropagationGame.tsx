import React, { useReducer, useEffect, useState } from 'react';
import { gameReducer, initialGameState } from './gameReducer';
import ResourceDisplay from './ResourceDisplay';
import GameControls from './GameControls';
import ProgressionTab from './ProgressionTab';
import UpgradesTab from './UpgradesTab';
import TheoriesTab from './TheoriesTab';
import { HistoricalEra } from './types';

// Tab types
type TabType = 'resources' | 'progression' | 'upgrades' | 'theories';

/**
 * Main game component with all systems
 */
const PropagationGame = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [activeTab, setActiveTab] = useState<TabType>('resources');
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Get the current era object
  const currentEra = gameState.eras.find(era => era.id === gameState.currentEraId) as HistoricalEra;

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
    showNotification(`Nouvelle ère débloquée: ${gameState.eras.find(e => e.id === eraId)?.name}`);
  };
  
  // Handle era selection
  const handleSelectEra = (eraId: string) => {
    dispatch({ type: 'SELECT_ERA', payload: { eraId } });
  };
  
  // Handle upgrade purchase
  const handlePurchaseUpgrade = (upgradeId: string) => {
    dispatch({ type: 'PURCHASE_UPGRADE', payload: { upgradeId } });
    const upgradeName = gameState.upgrades.find(u => u.id === upgradeId)?.name;
    showNotification(`Amélioration achetée: ${upgradeName}`);
  };
  
  // Handle theory propagation
  const handlePropagateTheory = (theoryId: string) => {
    const theory = gameState.conspiracyTheories.find(t => t.id === theoryId);
    if (!theory) return;
    
    dispatch({ type: 'PROPAGATE_THEORY', payload: { theoryId } });
    
    // Determine success based on theory's success rate
    const isSuccessful = Math.random() < theory.successRate;
    
    if (isSuccessful) {
      showNotification(`Théorie propagée avec succès: ${theory.name}`);
    } else {
      showNotification(`Échec de la propagation: ${theory.name}`, 'error');
    }
  };
  
  // Show notification
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), 3000);
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
        
        {/* Notification */}
        {notificationMessage && (
          <div className="fixed top-4 right-4 bg-gray-800 border border-green-500 p-3 rounded-lg shadow-lg z-50 max-w-xs">
            {notificationMessage}
          </div>
        )}
        
        {/* Current era display */}
        <div className="bg-gray-800 p-3 rounded-lg mb-4 text-center">
          <p className="text-sm text-gray-400">Ère actuelle</p>
          <p className="text-lg font-semibold">{currentEra.name}</p>
        </div>
        
        {/* Ethical score display */}
        <div className="bg-gray-800 p-3 rounded-lg mb-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Score Éthique</p>
            <p className={`text-lg font-semibold ${
              gameState.ethicalScore >= 80 ? 'text-green-400' : 
              gameState.ethicalScore >= 50 ? 'text-yellow-400' : 
              gameState.ethicalScore >= 30 ? 'text-orange-400' : 
              'text-red-400'
            }`}>
              {gameState.ethicalScore}
            </p>
          </div>
          <div className="h-8 w-full max-w-xs bg-gray-700 rounded-full overflow-hidden">
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
        
        {/* Educational note */}
        <div className="mt-8 p-3 bg-gray-800 rounded text-xs text-gray-400">
          <p>Note éducative: Ce jeu vise à sensibiliser aux mécanismes de propagation de la désinformation et à développer l'esprit critique. Les "points éthiques" représentent l'intégrité de l'information que vous partagez. Réfléchissez aux conséquences de la propagation d'informations non vérifiées.</p>
        </div>
      </div>
    </div>
  );
};

export default PropagationGame;