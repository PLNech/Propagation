import { 
  GameState, 
  GameAction, 
  GameResources, 
  Upgrade,
  GameMode,
  GameEnding 
} from '@/types';
import { historicalEras } from './eraData';
import { upgrades } from './upgradeData';
import { conspiracyTheories } from './conspiracyData';
import { scenarios } from './scenarioData';
import { initialAchievementState } from './achievementData';
import { checkAchievements, applyAchievementReward, patchAchievementsWithNewOnes } from './achievementService';
import { 
  ethicalActions, 
  educationalContent, 
  criticalThinkingQuotes, 
  gameEndings,
  initialEthicalStats 
} from './ethicalData';

// Étendre le type GameAction pour inclure le chargement de sauvegardes
type ExtendedGameAction = GameAction | 
{ type: 'LOAD_GAME'; payload: { state: GameState } };

/**
* Calculates resource multipliers based on active era, purchased upgrades, and game mode
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
  
  // Apply game mode modifiers
  if (state.gameMode === 'revelation') {
    // In revelation mode, credibility and influence grow faster, manipulation points slower
    multipliers.credibility *= 1.5;
    multipliers.influence *= 1.2;
    multipliers.manipulationPoints *= 0.5;
    
    // Critical thinking level boosts credibility in revelation mode
    multipliers.credibility *= (1 + state.criticalThinking / 200); // Max +50% at 100 critical thinking
  } else {
    // In manipulation mode, low ethics boosts manipulation points
    const ethicsMultiplier = Math.max(0.5, 1 - (state.ethicalScore / 200)); // +50% at 0 ethics, no bonus at 100 ethics
    multipliers.manipulationPoints *= ethicsMultiplier;
  }
  
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
* Calculates updated resources based on time passed, active era, upgrades, and game mode
* @param resources Current game resources
* @param deltaTime Time passed since last update in milliseconds
* @param multipliers Resource multipliers
* @param passiveGen Passive generation values
* @param criticalThinking Critical thinking level (affects resource generation in revelation mode)
* @param gameMode Current game mode
* @returns Updated resources
*/
const calculateResourcesUpdate = (
  resources: GameResources, 
  deltaTime: number,
  multipliers: Record<keyof GameResources, number>,
  passiveGen: Partial<Record<keyof GameResources, number>>,
  criticalThinking: number,
  gameMode: GameMode
): GameResources => {
  // Calculate resource growth based on time passed and modifiers
  const timeMultiplier = deltaTime / 1000; // Convert milliseconds to seconds
  
  const updatedResources = { ...resources };
  
  // Base resource generation
  updatedResources.credibility += 0.1 * timeMultiplier * multipliers.credibility;
  updatedResources.influence += 0.05 * timeMultiplier * multipliers.influence;
  updatedResources.networks += 0.01 * timeMultiplier * multipliers.networks;
  
  // Manipulation points generation depends on game mode
  if (gameMode === 'manipulation') {
    updatedResources.manipulationPoints += 0.02 * timeMultiplier * multipliers.manipulationPoints;
  } else {
    // In revelation mode, manipulation points are generated slower but based on critical thinking
    const criticalThinkingBonus = 1 + (criticalThinking / 200); // Up to +50% at 100 critical thinking
    updatedResources.manipulationPoints += 0.01 * timeMultiplier * multipliers.manipulationPoints * criticalThinkingBonus;
  }
  
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
* Updates the ethical actions availability based on conditions
* @param state Current game state
* @returns Updated ethical actions array
*/
const updateEthicalActionsAvailability = (state: GameState) => {
  return state.ethicalActions.map(action => {
    // If no unlock condition or already performed, keep current state
    if (!action.unlockCondition || action.performed) {
      return action;
    }
    
    let conditionMet = false;
    
    switch (action.unlockCondition.type) {
      case 'ethicalScore':
      conditionMet = state.ethicalScore >= action.unlockCondition.value;
      break;
      case 'criticalThinking':
      conditionMet = state.criticalThinking >= action.unlockCondition.value;
      break;
      case 'propagatedTheories':
      const propagatedCount = state.conspiracyTheories.filter(theory => theory.propagated).length;
      conditionMet = propagatedCount >= action.unlockCondition.value;
      break;
    }
    
    return {
      ...action,
      // An action is available if from current era and condition met
      visible: action.eraId === state.currentEraId && conditionMet
    };
  });
};

/**
* Checks if any game ending conditions are met
* @param state Current game state
* @returns GameEnding that has been triggered, or null if none
*/
const checkGameEndings = (state: GameState): GameEnding | null => {
  // Only check if game has not ended yet or if no active ending is being displayed
  if (state.gameEnded && state.activeEndingId !== null) {
    return null;
  }
  
  // Find the first ending with met conditions
  const triggeredEnding = state.gameEndings.find(ending => {
    // Skip endings that have already been triggered
    if (ending.triggered) {
      return false;
    }
    
    // Check all required conditions
    const ethicalScoreMet = state.ethicalScore >= ending.condition.ethicalScore;
    const criticalThinkingMet = state.criticalThinking >= ending.condition.criticalThinking;
    const influenceMet = state.resources.influence >= ending.condition.influence;
    
    // Check mode requirement if specified
    const modeMet = !ending.condition.requiredMode || state.gameMode === ending.condition.requiredMode;
    
    return ethicalScoreMet && criticalThinkingMet && influenceMet && modeMet;
  });
  
  return triggeredEnding || null;
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
* Calculate the number of lives impacted based on influence and networks
* @param influence Current influence value
* @param networks Current networks value
* @returns Estimated number of lives impacted
*/
const calculateLivesImpacted = (influence: number, networks: number): number => {
  // Simple formula: influence * networks * 10 
  // This gives a sense of scale while keeping numbers manageable
  return Math.floor(influence * networks * 10);
};

/**
* Initial game state with resources, eras, upgrades, theories and ethical system
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
  conspiracyTheories: conspiracyTheories.map(theory => ({
    ...theory,
    // Add critical thinking impact (negative) to existing conspiracy theories
    criticalThinkingImpact: Math.min(-1, Math.floor(theory.ethicalImpact * 1.2)) 
  })),
  ethicalScore: 100, // Start with perfect ethics
  criticalThinking: 20, // Start with some critical thinking
  ethicalActions: ethicalActions,
  gameMode: 'manipulation', // Start in manipulation mode
  educationalContent: educationalContent,
  criticalThinkingQuotes: criticalThinkingQuotes,
  gameEndings: gameEndings,
  ethicalStats: initialEthicalStats,
  scenarios: scenarios,
  activeScenarioId: null,
  completedScenarios: [],
  gameEnded: false,
  activeEndingId: null,
  lastTick: Date.now(),
  tickInterval: 1000, // 1 second tick rate
  achievementState: initialAchievementState,
  resourceMultipliers: {
    credibility: 1,
    influence: 1,
    networks: 1,
    manipulationPoints: 1
  },
  stats: {
    manipulateClicks: 0,
    hasSharedAchievement: false,
    hasClickedGaslightEffect: false
  }
};

/**
* Game state reducer to handle all game actions
* @param state Current game state
* @param action Action to perform
* @returns New game state
*/
export const gameReducer = (state: GameState, action: ExtendedGameAction): GameState => {
  switch (action.type) {
    case 'TICK': {
      const { currentTime } = action.payload;
      const deltaTime = currentTime - state.lastTick;
      
      // Calculate resource multipliers and passive generation
      const multipliers = calculateResourceMultipliers(state);
      const passiveGen = calculatePassiveGeneration(state);
      
      // Update resources
      const updatedResources = calculateResourcesUpdate(
        state.resources, 
        deltaTime, 
        multipliers, 
        passiveGen,
        state.criticalThinking,
        state.gameMode
      );
      
      // Update upgrade visibility
      const updatedUpgrades = updateUpgradeVisibility(state);
      
      // Update ethical actions availability
      const updatedEthicalActions = updateEthicalActionsAvailability(state);
      
      // Update statistics
      const updatedStats = {
        ...state.ethicalStats,
        livesImpacted: calculateLivesImpacted(updatedResources.influence, updatedResources.networks)
      };
      
      // Check for game endings
      const triggeredEnding = checkGameEndings({
        ...state,
        resources: updatedResources,
        ethicalStats: updatedStats
      });
      
      const gameEnded = !!triggeredEnding;
      const activeEndingId = triggeredEnding ? triggeredEnding.id : null;
      
      // Update endings if one was triggered
      const updatedEndings = gameEnded 
      ? state.gameEndings.map(ending => 
        ending.id === activeEndingId ? { ...ending, triggered: true } : ending
      )
      : state.gameEndings;


    // Check for resource threshold scenario triggers
    if (!state.activeScenarioId) {
      const resourceThresholdScenario = state.scenarios.find(s => 
        !s.completed && 
        !state.completedScenarios.includes(s.id) &&
        s.triggerCondition?.type === 'resourceThreshold' &&
        typeof s.triggerCondition.value === 'number' &&
        state.resources.influence >= s.triggerCondition.value
      );
      
      if (resourceThresholdScenario) {
        return {
          ...state,
          lastTick: currentTime,
          resources: updatedResources,
          upgrades: updatedUpgrades,
          ethicalActions: updatedEthicalActions,
          ethicalStats: updatedStats,
          gameEndings: updatedEndings,
          gameEnded,
          activeEndingId,
          activeScenarioId: resourceThresholdScenario.id
        };
      }
    }
      
      return {
        ...state,
        lastTick: currentTime,
        resources: updatedResources,
        upgrades: updatedUpgrades,
        ethicalActions: updatedEthicalActions,
        ethicalStats: updatedStats,
        gameEndings: updatedEndings,
        gameEnded,
        activeEndingId
      };
    }
    
    case 'MANIPULATE': {
      let result: GameState;
      // Different behavior based on game mode
      if (state.gameMode === 'manipulation') {
        // In manipulation mode, generate manipulation points
        const multipliers = calculateResourceMultipliers(state);
        
        // Increment manipulation points with active multiplier
        result = {
          ...state,
          resources: {
            ...state.resources,
            manipulationPoints: state.resources.manipulationPoints + 1 * multipliers.manipulationPoints,
          },
        };
      } else {
        // In revelation mode, gain ethics and critical thinking instead
        result = {
          ...state,
          ethicalScore: Math.min(100, state.ethicalScore + 0.5),
          criticalThinking: Math.min(100, state.criticalThinking + 0.2),
        };
      }
      // Additionally, track manipulate clicks
      const updatedStats = {
        ...state.stats,
        manipulateClicks: (state.stats?.manipulateClicks || 0) + 1
      };
      
      result = {
        ...result,
        // your existing updates
        stats: {...updatedStats, 
          hasClickedGaslightEffect: state.stats?.hasClickedGaslightEffect || false,
          hasSharedAchievement: state.stats?.hasSharedAchievement || false
        }
      };
      
      // Check for achievements after updating
      const newlyUnlocked = checkAchievements(result);
      if (newlyUnlocked.length > 0) {
        // If any achievements unlocked, dispatch a CHECK_ACHIEVEMENTS action
        // This would typically be done through middleware or a useEffect in the UI
        // In a functional approach, we'd need to check achievements after each action
      }
      
      return result;
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
      
      // After changing era, update upgrade visibility and ethical actions
      const updatedState = {
        ...state as GameState,
        currentEraId: eraId
      };
      
      const updatedUpgrades = updateUpgradeVisibility(updatedState);
      const updatedEthicalActions = updateEthicalActionsAvailability(updatedState);
      
      return {
        ...updatedState,
        upgrades: updatedUpgrades,
        ethicalActions: updatedEthicalActions
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
      
      // In revelation mode, purchasing upgrades can increase critical thinking
      const updatedCriticalThinking = state.gameMode === 'revelation'
      ? Math.min(100, state.criticalThinking + 1)
      : state.criticalThinking;
      
      const updatedState = {
        ...state,
        resources: updatedResources,
        criticalThinking: updatedCriticalThinking,
        upgrades: state.upgrades.map(upgrade => 
          upgrade.id === upgradeId ? { ...upgrade, purchased: true } : upgrade
        )
      };
      
      // Update upgrade visibility based on new purchases
      const updatedUpgrades = updateUpgradeVisibility(updatedState);


      // Check if any scenario should be triggered by this upgrade
      const triggerableScenario = state.scenarios.find(s => 
        !s.completed && 
        !state.completedScenarios.includes(s.id) &&
        s.triggerCondition?.type === 'upgradesPurchased' &&
        s.triggerCondition.value === upgradeId
      );

      // If a scenario should be triggered, set it as active
      if (triggerableScenario) {
        return {
          ...updatedState,
          upgrades: updatedUpgrades,
          activeScenarioId: triggerableScenario.id
        };
      }
      
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
      
      // Calculate ethical impact and critical thinking impact
      const ethicalImpact = theoryToPropagate.ethicalImpact;
      const criticalThinkingImpact = theoryToPropagate.criticalThinkingImpact;
      
      const newEthicalScore = Math.max(0, Math.min(100, state.ethicalScore + ethicalImpact));
      const newCriticalThinking = Math.max(0, Math.min(100, state.criticalThinking + criticalThinkingImpact));
      
      // Update statistics
      const updatedStats = {
        ...state.ethicalStats,
        theoriesPropagated: state.ethicalStats.theoriesPropagated + 1
      };
      
      if (isSuccessful) {
        // Add rewards if successful
        const resourcesWithRewards = addRewards(updatedResources, theoryToPropagate.rewards);


      // Check if any scenario should be triggered by this theory
      const triggerableScenario = state.scenarios.find(s => 
        !s.completed && 
        !state.completedScenarios.includes(s.id) &&
        s.triggerCondition?.type === 'propagateTheory' &&
        s.triggerCondition.value === theoryId
      );
      
      // If a scenario should be triggered, set it as active
      if (triggerableScenario) {
        return {
          ...state,
          resources: resourcesWithRewards,
          ethicalScore: newEthicalScore,
          criticalThinking: newCriticalThinking,
          ethicalStats: updatedStats,
          conspiracyTheories: state.conspiracyTheories.map(theory => 
            theory.id === theoryId ? { ...theory, propagated: true } : theory
          ),
          activeScenarioId: triggerableScenario.id
        };
      }
        
        return {
          ...state,
          resources: resourcesWithRewards,
          ethicalScore: newEthicalScore,
          criticalThinking: newCriticalThinking,
          ethicalStats: updatedStats,
          conspiracyTheories: state.conspiracyTheories.map(theory => 
            theory.id === theoryId ? { ...theory, propagated: true } : theory
          )
        };
      } else {
        // Just update resources and ethical score if failed
        return {
          ...state,
          resources: updatedResources,
          ethicalScore: newEthicalScore,
          criticalThinking: newCriticalThinking,
          ethicalStats: updatedStats
        };
      }
    }
    
    case 'PERFORM_ETHICAL_ACTION': {
      const { actionId } = action.payload;
      const actionToPerform = state.ethicalActions.find(a => a.id === actionId);
      
      // If action doesn't exist, is already performed, or player can't afford it, do nothing
      if (
        !actionToPerform || 
        actionToPerform.performed || 
        !canAfford(state.resources, actionToPerform.cost)
      ) {
        return state;
      }
      
      // Spend resources
      const updatedResources = spendResources(state.resources, actionToPerform.cost);
      
      // Calculate influence sacrificed for statistics
      const influenceSacrificed = actionToPerform.cost.influence || 0;
      
      // Apply ethical and critical thinking gains
      const newEthicalScore = Math.min(100, state.ethicalScore + actionToPerform.ethicalGain);
      const newCriticalThinking = Math.min(100, state.criticalThinking + actionToPerform.criticalThinkingGain);
      
      // Update statistics
      const updatedStats = {
        ...state.ethicalStats,
        ethicalActionsPerformed: state.ethicalStats.ethicalActionsPerformed + 1,
        influenceSacrificed: state.ethicalStats.influenceSacrificed + influenceSacrificed,
        criticalThinkingRaised: state.ethicalStats.criticalThinkingRaised + actionToPerform.criticalThinkingGain
      };
      
      return {
        ...state,
        resources: updatedResources,
        ethicalScore: newEthicalScore,
        criticalThinking: newCriticalThinking,
        ethicalStats: updatedStats,
        ethicalActions: state.ethicalActions.map(action => 
          action.id === actionId ? { ...action, performed: true } : action
        )
      };
    }
    
    
    case 'TRIGGER_SCENARIO': {
      const { scenarioId } = action.payload;
      const scenario = state.scenarios.find(s => s.id === scenarioId);
      
      // If scenario doesn't exist or is already completed, do nothing
      if (!scenario || scenario.completed || state.completedScenarios.includes(scenarioId)) {
        return state;
      }
      
      return {
        ...state,
        activeScenarioId: scenarioId
      };
    }
    
    case 'MAKE_SCENARIO_CHOICE': {
      const { scenarioId, choiceId } = action.payload;
      const scenario = state.scenarios.find(s => s.id === scenarioId);
      
      // If scenario doesn't exist or is already completed, do nothing
      if (!scenario || scenario.completed || state.completedScenarios.includes(scenarioId)) {
        return state;
      }
      
      // Find the selected choice
      const choice = scenario.choices.find(c => c.id === choiceId);
      if (!choice) {
        return state;
      }
      
      // Apply consequences
      const updatedResources = { ...state.resources };
      let updatedEthicalScore = state.ethicalScore;
      let updatedCriticalThinking = state.criticalThinking;
      
      // Apply resource changes
      if (choice.consequences.resources) {
        Object.entries(choice.consequences.resources).forEach(([resource, value]) => {
          if (resource in updatedResources) {
            updatedResources[resource as keyof GameResources] += value || 0;
          }
        });
      }
      
      // Apply ethical score change
      if (choice.consequences.ethicalScore) {
        updatedEthicalScore = Math.max(0, Math.min(100, updatedEthicalScore + choice.consequences.ethicalScore));
      }
      
      // Apply critical thinking change
      if (choice.consequences.criticalThinking) {
        updatedCriticalThinking = Math.max(0, Math.min(100, updatedCriticalThinking + choice.consequences.criticalThinking));
      }
      
      // Update the scenario as completed with the choice made
      const updatedScenarios = state.scenarios.map(s => 
        s.id === scenarioId 
        ? { ...s, completed: true, selectedChoiceId: choiceId } 
        : s
      );
      
      return {
        ...state,
        resources: updatedResources,
        ethicalScore: updatedEthicalScore,
        criticalThinking: updatedCriticalThinking,
        scenarios: updatedScenarios,
        completedScenarios: [...state.completedScenarios, scenarioId],
        activeScenarioId: null
      };
    }
    
    case 'DISMISS_SCENARIO': {
      const { scenarioId } = action.payload;
      
      // Only dismiss if it's the active scenario
      if (state.activeScenarioId !== scenarioId) {
        return state;
      }
      
      return {
        ...state,
        activeScenarioId: null
      };
    }


    case 'CHECK_ACHIEVEMENTS': {
      // Check for newly unlocked achievements
      const newlyUnlocked = checkAchievements(state);
      
      if (newlyUnlocked.length === 0) {
        return state;
      }
      
      // Update achievements
      let updatedState = { ...state };
      
      // For each newly unlocked achievement
      newlyUnlocked.forEach(achievementId => {
        const achievement = state.achievementState.achievements.find(a => a.id === achievementId);
        
        if (achievement) {
          // Mark as unlocked with timestamp
          const updatedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: Date.now()
          };
          
          // Update achievement in state
          updatedState.achievementState = {
            ...updatedState.achievementState,
            achievements: updatedState.achievementState.achievements.map(a => 
              a.id === achievementId ? updatedAchievement : a
            ),
            totalUnlocked: updatedState.achievementState.totalUnlocked + 1,
            newUnlocked: [...updatedState.achievementState.newUnlocked, achievementId]
          };
          
          // Apply reward if any
          if (updatedAchievement.reward) {
            updatedState = applyAchievementReward(updatedAchievement.reward, updatedState);
          }
          
          // Special case: if this is the first achievement, immediately check for the 'first_achievement' achievement
          if (updatedState.achievementState.totalUnlocked === 1 && achievementId !== 'first_achievement') {
            const firstAchievement = updatedState.achievementState.achievements.find(a => a.id === 'first_achievement');
            
            if (firstAchievement && !firstAchievement.unlocked) {
              // Unlocak the meta achievement
              const updatedFirstAchievement = {
                ...firstAchievement,
                unlocked: true,
                unlockedAt: Date.now()
              };
              
              updatedState.achievementState = {
                ...updatedState.achievementState,
                achievements: updatedState.achievementState.achievements.map(a => 
                  a.id === 'first_achievement' ? updatedFirstAchievement : a
                ),
                totalUnlocked: updatedState.achievementState.totalUnlocked + 1,
                newUnlocked: [...updatedState.achievementState.newUnlocked, 'first_achievement']
              };
            }
          }
        }
      });
      
      return updatedState;
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const { achievementId } = action.payload;
      const achievement = state.achievementState.achievements.find(a => a.id === achievementId);
      
      if (!achievement || achievement.unlocked) {
        return state;
      }
      
      // Update the achievement
      const updatedAchievement = {
        ...achievement,
        unlocked: true,
        unlockedAt: Date.now()
      };
      
      let updatedState = {
        ...state,
        achievementState: {
          ...state.achievementState,
          achievements: state.achievementState.achievements.map(a => 
            a.id === achievementId ? updatedAchievement : a
          ),
          totalUnlocked: state.achievementState.totalUnlocked + 1,
          newUnlocked: [...state.achievementState.newUnlocked, achievementId]
        }
      };
      
      // Apply reward if any
      if (updatedAchievement.reward) {
        updatedState = applyAchievementReward(updatedAchievement.reward, updatedState);
      }
      
      return updatedState;
    }

    case 'VIEW_ACHIEVEMENT': {
      const { achievementId } = action.payload;
      
      return {
        ...state,
        achievementState: {
          ...state.achievementState,
          selectedAchievementId: achievementId,
          showAchievementModal: true
        }
      };
    }

    case 'DISMISS_ACHIEVEMENT_NOTIFICATION': {
      const { achievementId } = action.payload;
      
      return {
        ...state,
        achievementState: {
          ...state.achievementState,
          newUnlocked: state.achievementState.newUnlocked.filter(id => id !== achievementId)
        }
      };
    }

    case 'SHARE_ACHIEVEMENT': {
      // Update stats to mark that player has shared an achievement
      return {
        ...state,
        stats: {
          ...state.stats,
          manipulateClicks: state.stats?.manipulateClicks || 0,
          hasSharedAchievement: true,
          hasClickedGaslightEffect: state.stats?.hasClickedGaslightEffect || false
        }
      };
    }

    case 'CLICK_GASLIGHT_EFFECT': {
      // Update stats to mark that player has clicked a gaslight effect
      return {
        ...state,
        stats: {
          ...state.stats,
          manipulateClicks: state.stats?.manipulateClicks || 0,
          hasClickedGaslightEffect: true,
          hasSharedAchievement: state.stats?.hasSharedAchievement || false        }
      };
    }
    
    case 'NETWORKING': {
      // Check if player has enough manipulation points
      if (state.resources.manipulationPoints < 2) {
        return state;
      }
      
      // Calculate multipliers
      const multipliers = calculateResourceMultipliers(state);
      
      // Spend manipulation points and generate networks
      return {
        ...state,
        resources: {
          ...state.resources,
          manipulationPoints: state.resources.manipulationPoints - 2,
          networks: state.resources.networks + 1 * multipliers.networks,
        },
      };
    }
    
    case 'CREDIBILITY': {
      // Check if player has enough manipulation points
      if (state.resources.manipulationPoints < 3) {
        return state;
      }
      
      // Calculate multipliers
      const multipliers = calculateResourceMultipliers(state);
      
      // Spend manipulation points and generate credibility
      return {
        ...state,
        resources: {
          ...state.resources,
          manipulationPoints: state.resources.manipulationPoints - 3,
          credibility: state.resources.credibility + 1.5 * multipliers.credibility,
        },
      };
    }
    
    case 'INFLUENCE': {
      // Check if player has enough manipulation points
      if (state.resources.manipulationPoints < 5) {
        return state;
      }
      
      // Calculate multipliers
      const multipliers = calculateResourceMultipliers(state);
      
      // Spend manipulation points and generate influence
      return {
        ...state,
        resources: {
          ...state.resources,
          manipulationPoints: state.resources.manipulationPoints - 5,
          influence: state.resources.influence + 2 * multipliers.influence,
        },
      };
    }
    
    case 'SWITCH_GAME_MODE': {
      const { mode } = action.payload;
      
      // If already in this mode, do nothing
      if (state.gameMode === mode) {
        return state;
      }
      
      // Switching to revelation mode increases ethical score and critical thinking
      const ethicalBoost = mode === 'revelation' ? 10 : 0;
      const criticalThinkingBoost = mode === 'revelation' ? 5 : 0;
      
      return {
        ...state,
        gameMode: mode,
        ethicalScore: Math.min(100, state.ethicalScore + ethicalBoost),
        criticalThinking: Math.min(100, state.criticalThinking + criticalThinkingBoost),
        stats: {
          ...state.stats,
          manipulateClicks: state.stats?.manipulateClicks || 0,
          previousGameMode: state.gameMode,
          hasSharedAchievement: state.stats?.hasSharedAchievement || false,
          hasClickedGaslightEffect: state.stats?.hasClickedGaslightEffect || false
        }
      };
    }
   
    case 'CLICK_LORE_LINK': {
      const { linkType, url } = action.payload;
      
      // Update clicked links lists
      const clickedLoreLinks = [...(state.stats?.clickedLoreLinks || []), url];
      
      let clickedHistoryLinks = state.stats?.clickedHistoryLinks || [];
      let clickedPhilosophyLinks = state.stats?.clickedPhilosophyLinks || [];
      let clickedPropagandaLinks = state.stats?.clickedPropagandaLinks || [];
      
      // Update category-specific lists based on link type
      if (linkType === 'history') {
        clickedHistoryLinks = [...clickedHistoryLinks, url];
      } else if (linkType === 'philosophy') {
        clickedPhilosophyLinks = [...clickedPhilosophyLinks, url];
      } else if (linkType === 'propaganda') {
        clickedPropagandaLinks = [...clickedPropagandaLinks, url];
      }
      
      return {
        ...state,
        stats: {
          ...state.stats,
          manipulateClicks: state.stats?.manipulateClicks || 0,
          hasSharedAchievement: state.stats?.hasSharedAchievement || false,
          hasClickedGaslightEffect: state.stats?.hasClickedGaslightEffect || false,
          clickedLoreLinks,
          clickedHistoryLinks,
          clickedPhilosophyLinks,
          clickedPropagandaLinks
        }
      };
    }

    case 'ACKNOWLEDGE_ENDING': {
      const { endingId } = action.payload;
      
      // Update statistics if this ending wasn't already counted
      const ending = state.gameEndings.find(e => e.id === endingId);
      const endingAlreadyCounted = ending && ending.triggered;
      
      const updatedStats = endingAlreadyCounted 
      ? state.ethicalStats 
      : {
        ...state.ethicalStats,
        endingsUnlocked: state.ethicalStats.endingsUnlocked + 1
      };
      
      return {
        ...state,
        gameEnded: false, // Allow gameplay to continue
        activeEndingId: null,
        ethicalStats: updatedStats,
        gameEndings: state.gameEndings.map(ending => 
          ending.id === endingId ? { ...ending, triggered: true } : ending
        )
      };
    }
    
    case 'LOAD_GAME': {
      const loadedState = action.payload.state;
      console.log("Loading gameState:", loadedState);
      
      // Handle completely missing features in older save versions
      if (!loadedState.scenarios || !loadedState.achievementState) {
        const patched = {
          ...loadedState,
          scenarios: scenarios,
          activeScenarioId: null,
          completedScenarios: [],
          achievementState: initialAchievementState,
        };
        return patched;
      }
      
      // Patch the achievements with any new ones
      const patchedAchievements = patchAchievementsWithNewOnes(
        loadedState.achievementState.achievements,
        initialAchievementState.achievements
      );
      
      // If any new achievements were added, update the state
      if (patchedAchievements.length !== loadedState.achievementState.achievements.length) {
        console.log(`Patching ${patchedAchievements.length - loadedState.achievementState.achievements.length} new achievements into save`);
        
        // Create patched state with new achievements
        const patchedState = {
          ...loadedState,
          achievementState: {
            ...loadedState.achievementState,
            achievements: patchedAchievements,
            totalAchievements: initialAchievementState.totalAchievements // Use the current total
          }
        };
        
        return patchedState;
      }
      
      return loadedState;
    }
    
    case 'RESET': {

  // Save current achievement state
  const currentAchievementState = state.achievementState;
  
  // Reset game to initial state
  const newState = { ...initialGameState };
  
  // Restore achievement state
  newState.achievementState = currentAchievementState;
  
  return newState;
  }
    
    default:
    return state;
  }
};