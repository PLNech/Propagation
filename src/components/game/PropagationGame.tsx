import React, { useReducer, useEffect, useState } from 'react';
import { gameReducer, initialGameState } from './gameReducer';
import ResourceDisplay from './ResourceDisplay';
import GameControls from './GameControls';
import ProgressionTab from './ProgressionTab';
import { HistoricalEra } from './types';

/**
 * Main game component with era progression system
 */
const PropagationGame = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [activeTab, setActiveTab] = useState<'resources' | 'progression'>('resources');

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
  };
  
  // Handle era selection
  const handleSelectEra = (eraId: string) => {
    dispatch({ type: 'SELECT_ERA', payload: { eraId } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Propagation
        </h1>
        <h2 className="text-xl mb-6 text-center text-gray-300">
          Un Jeu Incrémental de Manipulation Sociale
        </h2>
        
        {/* Current era display */}
        <div className="bg-gray-800 p-3 rounded-lg mb-4 text-center">
          <p className="text-sm text-gray-400">Ère actuelle</p>
          <p className="text-lg font-semibold">{currentEra.name}</p>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex mb-4 border-b border-gray-700">
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
        </div>
        
        {/* Content based on active tab */}
        {activeTab === 'resources' ? (
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
        ) : (
          <ProgressionTab
            eras={gameState.eras}
            currentEraId={gameState.currentEraId}
            influence={gameState.resources.influence}
            onUnlockEra={handleUnlockEra}
            onSelectEra={handleSelectEra}
          />
        )}
        
        {/* Educational note */}
        <div className="mt-8 p-3 bg-gray-800 rounded text-xs text-gray-400">
          <p>Note éducative: Ce jeu vise à sensibiliser aux mécanismes de propagation de la désinformation à travers l'histoire et à développer l'esprit critique des joueurs.</p>
        </div>
      </div>
    </div>
  );
};

export default PropagationGame;