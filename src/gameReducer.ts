import { GameState, GameAction, GameResources } from './types';

/**
 * Calculates updated resources based on time passed
 * @param resources Current game resources
 * @param deltaTime Time passed since last update in milliseconds
 * @returns Updated resources
 */
const calculateResourcesUpdate = (
  resources: GameResources, 
  deltaTime: number
): GameResources => {
  // Calculate resource growth based on time passed
  const timeMultiplier = deltaTime / 1000; // Convert milliseconds to seconds
  
  return {
    credibility: resources.credibility + 0.1 * timeMultiplier,
    influence: resources.influence + 0.05 * timeMultiplier,
    networks: resources.networks + 0.01 * timeMultiplier,
    manipulationPoints: resources.manipulationPoints + 0.02 * timeMultiplier,
  };
};

/**
 * Initial game state with zero resources
 */
export const initialGameState: GameState = {
  resources: {
    credibility: 0,
    influence: 0,
    networks: 0,
    manipulationPoints: 0,
  },
  lastTick: Date.now(),
  tickInterval: 1000, // 1 second tick rate
};

/**
 * Game state reducer to handle all game actions
 * @param state Current game state
 * @param action Action to perform
 * @returns New game state
 */
export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'TICK': {
      const { currentTime } = action.payload;
      const deltaTime = currentTime - state.lastTick;
      
      return {
        ...state,
        lastTick: currentTime,
        resources: calculateResourcesUpdate(state.resources, deltaTime),
      };
    }
    
    case 'MANIPULATE': {
      // For now, just increment manipulation points when button is clicked
      return {
        ...state,
        resources: {
          ...state.resources,
          manipulationPoints: state.resources.manipulationPoints + 1,
        },
      };
    }
    
    case 'RESET': {
      // Reset game to initial state
      return initialGameState;
    }
    
    default:
      return state;
  }
};