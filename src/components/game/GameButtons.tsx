import React from 'react';
import { GameResources } from '@/types';

interface GameButtonsProps {
  onManipulate: () => void;
  onNetworking: () => void;
  onCredibility: () => void;
  onInfluence: () => void;
  resources: GameResources;
  manipulateButtonId?: string;
}

/**
 * Component for game action buttons with resource costs
 */
const GameButtons: React.FC<GameButtonsProps> = ({ 
  onManipulate,
  onNetworking,
  onCredibility,
  onInfluence,
  resources,
  manipulateButtonId = 'manipulate-button'
}) => {
  // Check if player can afford each action
  const canAffordNetworking = resources.manipulationPoints >= 2;
  const canAffordCredibility = resources.manipulationPoints >= 3;
  const canAffordInfluence = resources.manipulationPoints >= 5;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex justify-center">
        <button 
          id={manipulateButtonId}
          onClick={onManipulate}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow transition duration-200 w-full max-w-xs"
        >
          Manipuler
        </button>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={onNetworking}
          disabled={!canAffordNetworking}
          className={`py-2 px-4 rounded shadow transition duration-200 w-full max-w-xs ${
            canAffordNetworking 
              ? 'bg-green-600 hover:bg-green-700 text-white font-bold' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Réseautage (2 pts)
        </button>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={onCredibility}
          disabled={!canAffordCredibility}
          className={`py-2 px-4 rounded shadow transition duration-200 w-full max-w-xs ${
            canAffordCredibility 
              ? 'bg-blue-600 hover:bg-blue-700 text-white font-bold' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Établir Crédibilité (3 pts)
        </button>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={onInfluence}
          disabled={!canAffordInfluence}
          className={`py-2 px-4 rounded shadow transition duration-200 w-full max-w-xs ${
            canAffordInfluence 
              ? 'bg-purple-800 hover:bg-purple-900 text-white font-bold' 
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          Étendre Influence (5 pts)
        </button>
      </div>
    </div>
  );
};

export default GameButtons;