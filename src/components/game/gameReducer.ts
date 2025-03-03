import { GameState, GameAction, GameResources, HistoricalEra, Upgrade } from './types';
import { historicalEras } from './eraData';
import { upgrades } from './upgradeData';
import { conspiracyTheories } from './conspiracyData';

/**
 * Calculates resource multipliers based on active era and purchased upgrades
 * @param state Current game state
 * @returns Record of multipliers for each resource
 */
const calculateResourceMultipliers = (state: GameState): Record<keyof GameResources, number> => {
  // Start with base multipliers
  const multipliers: Record<keyof GameResources, number> = {
    credibility: 1,
    influence: 1,
    networks: 1,
    manipulationPoints: 1
  };
  
  // Find current era
  const currentEra = state.eras.find(era => era.id === state.currentEraId) || state.eras[0];
  
  // Apply era resource multipliers
  Object.entries(currentEra.resourceMultipliers).forEach(([resource, value]) => {
    if (value && resource in multipliers) {
      multipliers[resource as keyof GameResources] = value;
    }
  });
  
  // Apply multipliers from purchased upgrades
  state.upgrades
    .filter(upgrade => upgrade.purchased && upgrade.effect.type === 'multiplier')
    .forEach(upgrade => {
      if (upgrade.effect.target in multipliers) {
        multipliers[upgrade.effect.target as keyof GameResources] *= upgrade.effect.value;
      }
    });
  
  return multipliers;
};

/**
 * Calculate passive resource generation from purchased upgrades
 * @param state Current game state
 * @returns Record of passive generation values for each resource
 */
const calculatePassiveGeneration = (state: GameState): Partial<Record<keyof GameResources, number>> => {
  const passiveGen: Partial<Record<keyof GameResources, number>> = {};
  
  // Get passive generation from upgrades
  state.upgrades
    .filter(upgrade => upgrade.purchased && upgrade.effect.type === 'passive')
    .forEach(upgrade => {
      const target = upgrade.effect.target as keyof GameResources;
      if (!passiveGen[target]) {
        passiveGen[target] = 0;
      }
      passiveGen[target]! += upgrade.effect.value;
    });
  
  return passiveGen;
};

/**
 * Calculates updated resources based on time passed, active era, and upgrades
 * @param resources Current game resources
 * @param deltaTime Time passed since last update in milliseconds
 * @param multipliers Resource multipliers
 * @param passiveGen Passive generation values
 * @returns Updated resources
 */
const calculateResourcesUpdate = (
  resources: GameResources, 
  deltaTime: number,
  multipliers: Record<keyof GameResources, number>,
  passiveGen: Partial<Record<keyof GameResources, number>>
): GameResources => {
  // Calculate resource growth based on time passed and modifiers
  const timeMultiplier = deltaTime / 1000; // Convert milliseconds to seconds
  
  const updatedResources = { ...resources };
  
  // Base resource generation
  updatedResources.credibility += 0.1 * timeMultiplier * multipliers.credibility;
  updatedResources.influence += 0.05 * timeMultiplier * multipliers.influence;
  updatedResources.networks += 0.01 * timeMultiplier * multipliers.networks;
  updatedResources.manipulationPoints += 0.02 * timeMultiplier * multipliers.manipulationPoints;
  
  // Add passive generation
  Object.entries(passiveGen).forEach(([resource, value]) => {
    if (resource in updatedResources && value) {
      updatedResources[resource as keyof GameResources] += value * timeMultiplier;
    }
  });
  
  return updatedResources;
};

/**
 * Updates the visibility of upgrades based on prerequisites
 * @param state Current game state
 * @returns Updated upgrades array
 */
const updateUpgradeVisibility = (state: GameState): Upgrade[] => {
  return state.upgrades.map(upgrade => {
    // If already visible or not from current era, keep current visibility
    if (upgrade.visible || upgrade.eraId !== state.currentEraId) {
      return upgrade;
    }
    
    // Check if all prerequisites are purchased
    const prerequisitesMet = upgrade.prerequisiteUpgradeIds.length === 0 || 
      upgrade.prerequisiteUpgradeIds.every(prereqId => {
        const prereq = state.upgrades.find(u => u.id === prereqId);
        return prereq && prereq.purchased;
      });
    
    return {
      ...upgrade,
      visible: prerequisitesMet
    };
  });
};

/**
 * Checks if player can afford a purchase
 * @param resources Current resources
 * @param cost Cost to check against
 * @returns True if player can afford the cost
 */
const canAfford = (
  resources: GameResources, 
  cost: Partial<Record<keyof GameResources, number>>
): boolean => {
  return Object.entries(cost).every(([resource, amount]) => {
    return resources[resource as keyof GameResources] >= (amount || 0);
  });
};

/**
 * Spend resources for a purchase
 * @param resources Current resources
 * @param cost Resources to spend
 * @returns Updated resources after spending
 */
const spendResources = (
  resources: GameResources,
  cost: Partial<Record<keyof GameResources, number>>
): GameResources => {
  const updatedResources = { ...resources };
  
  Object.entries(cost).forEach(([resource, amount]) => {
    if (resource in updatedResources && amount) {
      updatedResources[resource as keyof GameResources] -= amount;
    }
  });
  
  return updatedResources;
};

/**
 * Add rewards to resources
 * @param resources Current resources
 * @param rewards Resources to add
 * @returns Updated resources after adding rewards
 */
const addRewards = (
  resources: GameResources,
  rewards: Partial<Record<keyof GameResources, number>>
): GameResources => {
  const updatedResources = { ...resources };
  
  Object.entries(rewards).forEach(([resource, amount]) => {
    if (resource in updatedResources && amount) {
      updatedResources[resource as keyof GameResources] += amount;
    }
  });
  
  return updatedResources;
};

/**
 * Initial game state with resources, eras, upgrades, and theories
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
  upgrades: upgrades,
  conspiracyTheories: conspiracyTheories,
  ethicalScore: 100, // Start with perfect ethics
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
      
      // Calculate resource multipliers and passive generation
      const multipliers = calculateResourceMultipliers(state);
      const passiveGen = calculatePassiveGeneration(state);
      
      // Update upgrade visibility
      const updatedUpgrades = updateUpgradeVisibility(state);
      
      return {
        ...state,
        lastTick: currentTime,
        resources: calculateResourcesUpdate(state.resources, deltaTime, multipliers, passiveGen),
        upgrades: updatedUpgrades
      };
    }
    
    case 'MANIPULATE': {
      // Calculate multipliers to apply to manual manipulation
      const multipliers = calculateResourceMultipliers(state);
      
      // Increment manipulation points with active multiplier
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
      
      // After changing era, update upgrade visibility
      const updatedState = {
        ...state,
        currentEraId: eraId
      };
      
      const updatedUpgrades = updateUpgradeVisibility(updatedState);
      
      return {
        ...updatedState,
        upgrades: updatedUpgrades
      };
    }
    
    case 'PURCHASE_UPGRADE': {
      const { upgradeId } = action.payload;
      const upgradeToPurchase = state.upgrades.find(u => u.id === upgradeId);
      
      // If upgrade doesn't exist, is already purchased, is not visible,
      // or player can't afford it, do nothing
      if (
        !upgradeToPurchase || 
        upgradeToPurchase.purchased || 
        !upgradeToPurchase.visible ||
        !canAfford(state.resources, upgradeToPurchase.cost)
      ) {
        return state;
      }
      
      // Purchase the upgrade and spend resources
      const updatedResources = spendResources(state.resources, upgradeToPurchase.cost);
      
      const updatedState = {
        ...state,
        resources: updatedResources,
        upgrades: state.upgrades.map(upgrade => 
          upgrade.id === upgradeId ? { ...upgrade, purchased: true } : upgrade
        )
      };
      
      // Update upgrade visibility based on new purchases
      const updatedUpgrades = updateUpgradeVisibility(updatedState);
      
      return {
        ...updatedState,
        upgrades: updatedUpgrades
      };
    }
    
    case 'PROPAGATE_THEORY': {
      const { theoryId } = action.payload;
      const theoryToPropagate = state.conspiracyTheories.find(t => t.id === theoryId);
      
      // If theory doesn't exist, is already propagated, or player can't afford it, do nothing
      if (
        !theoryToPropagate || 
        theoryToPropagate.propagated || 
        state.resources.manipulationPoints < theoryToPropagate.cost
      ) {
        return state;
      }
      
      // Spend manipulation points
      const updatedResources = {
        ...state.resources,
        manipulationPoints: state.resources.manipulationPoints - theoryToPropagate.cost
      };
      
      // Determine success based on success rate
      const isSuccessful = Math.random() < theoryToPropagate.successRate;
      
      // Calculate ethical impact
      const ethicalImpact = theoryToPropagate.ethicalImpact;
      const newEthicalScore = Math.max(0, Math.min(100, state.ethicalScore + ethicalImpact));
      
      if (isSuccessful) {
        // Add rewards if successful
        const resourcesWithRewards = addRewards(updatedResources, theoryToPropagate.rewards);
        
        return {
          ...state,
          resources: resourcesWithRewards,
          ethicalScore: newEthicalScore,
          conspiracyTheories: state.conspiracyTheories.map(theory => 
            theory.id === theoryId ? { ...theory, propagated: true } : theory
          )
        };
      } else {
        // Just update resources and ethical score if failed
        return {
          ...state,
          resources: updatedResources,
          ethicalScore: newEthicalScore
        };
      }
    }
    
    case 'RESET': {
      // Reset game to initial state
      return initialGameState;
    }
    
    default:
      return state;
  }
};