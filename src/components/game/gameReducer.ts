import { GameState, GameAction, GameResources, HistoricalEra } from './types';
import { historicalEras } from './eraData';

/**
 * Calculates updated resources based on time passed and current era
 * @param resources Current game resources
 * @param deltaTime Time passed since last update in milliseconds
 * @param currentEra The currently active historical era
 * @returns Updated resources
 */
const calculateResourcesUpdate = (
  resources: GameResources, 
  deltaTime: number,
  currentEra: HistoricalEra
): GameResources => {
  // Calculate resource growth based on time passed and current era multipliers
  const timeMultiplier = deltaTime / 1000; // Convert milliseconds to seconds
  
  return {
    credibility: resources.credibility + 0.1 * timeMultiplier * (currentEra.resourceMultipliers.credibility || 1),
    influence: resources.influence + 0.05 * timeMultiplier * (currentEra.resourceMultipliers.influence || 1),
    networks: resources.networks + 0.01 * timeMultiplier * (currentEra.resourceMultipliers.networks || 1),
    manipulationPoints: resources.manipulationPoints + 0.02 * timeMultiplier * (currentEra.resourceMultipliers.manipulationPoints || 1),
  };
};

/**
 * Apply technique multipliers from the current era to resource generation
 * @param resources Current resources
 * @param currentEra The active historical era
 * @returns Multipliers for each resource
 */
const getActiveMultipliers = (currentEra: HistoricalEra): Record<keyof GameResources, number> => {
  // Start with base multipliers
  const multipliers: Record<keyof GameResources, number> = {
    credibility: 1,
    influence: 1,
    networks: 1,
    manipulationPoints: 1
  };
  
  // Apply era resource multipliers
  Object.entries(currentEra.resourceMultipliers).forEach(([resource, value]) => {
    if (value && resource in multipliers) {
      multipliers[resource as keyof GameResources] = value;
    }
  });
  
  return multipliers;
};

/**
 * Initial game state with zero resources and first era unlocked
 */
export const initialGameState: GameState = {
  resources: {
    credibility: 0,
    influence: 0,
    networks: 0,
    manipulationPoints: 0,
  },
  eras: historicalEras,
  currentEraId: "antiquity", // Start in the Antiquity era
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
      
      // Find the current era object
      const currentEra = state.eras.find(era => era.id === state.currentEraId) || state.eras[0];
      
      return {
        ...state,
        lastTick: currentTime,
        resources: calculateResourcesUpdate(state.resources, deltaTime, currentEra),
      };
    }
    
    case 'MANIPULATE': {
      // Find the current era for its multiplier
      const currentEra = state.eras.find(era => era.id === state.currentEraId) || state.eras[0];
      const multipliers = getActiveMultipliers(currentEra);
      
      // Increment manipulation points with active era multiplier
      return {
        ...state,
        resources: {
          ...state.resources,
          manipulationPoints: state.resources.manipulationPoints + 1 * multipliers.manipulationPoints,
        },
      };
    }
    
    case 'UNLOCK_ERA': {
      const { eraId } = action.payload;
      const eraToUnlock = state.eras.find(era => era.id === eraId);
      
      // If era doesn't exist or is already unlocked or player doesn't have enough influence, do nothing
      if (!eraToUnlock || eraToUnlock.unlocked || state.resources.influence < eraToUnlock.unlockCost) {
        return state;
      }
      
      // Unlock the era and spend influence
      return {
        ...state,
        resources: {
          ...state.resources,
          influence: state.resources.influence - eraToUnlock.unlockCost
        },
        eras: state.eras.map(era => 
          era.id === eraId ? { ...era, unlocked: true } : era
        ),
        // Automatically select the newly unlocked era
        currentEraId: eraId
      };
    }
    
    case 'SELECT_ERA': {
      const { eraId } = action.payload;
      const targetEra = state.eras.find(era => era.id === eraId);
      
      // If era doesn't exist or is not unlocked, do nothing
      if (!targetEra || !targetEra.unlocked) {
        return state;
      }
      
      // Switch to the selected era
      return {
        ...state,
        currentEraId: eraId
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