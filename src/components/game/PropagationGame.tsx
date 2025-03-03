import React, { useReducer, useEffect } from 'react';
import { gameReducer, initialGameState } from './gameReducer';
import ResourceDisplay from './ResourceDisplay';
import GameControls from './GameControls';

/**
 * Main game component that coordinates the game state and UI
 */
const PropagationGame: React.FC = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Propagation
        </h1>
        <h2 className="text-xl mb-6 text-center text-gray-300">
          Un Jeu Incrémental de Manipulation Sociale
        </h2>
        
        <ResourceDisplay resources={gameState.resources} />
        <GameControls onManipulate={handleManipulate} />
      </div>
    </div>
  );
};

export default PropagationGame;