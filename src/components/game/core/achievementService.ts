import { GameState } from '@/types';
import { Achievement, AchievementReward } from '@/types';

/**
 * Service for checking and unlocking achievements
 */

/**
 * Check if any achievements are unlocked based on the game state
 * @param state Current game state
 * @returns List of newly unlocked achievement IDs
 */
export const checkAchievements = (state: GameState): string[] => {
  const newlyUnlocked: string[] = [];
  
  // Get unlocked and locked achievements
  const lockedAchievements = state.achievementState.achievements.filter(a => !a.unlocked);
  
  // Check each locked achievement
  lockedAchievements.forEach(achievement => {
    const isUnlocked = checkAchievementCondition(achievement, state);
    
    if (isUnlocked) {
      newlyUnlocked.push(achievement.id);
    }
  });
  
  return newlyUnlocked;
};

/**
 * Check if a specific achievement's condition is met
 * @param achievement Achievement to check
 * @param state Current game state
 * @returns True if condition is met
 */
export const checkAchievementCondition = (achievement: Achievement, state: GameState): boolean => {
  const { condition } = achievement;
  
  switch (condition.type) {
    case 'resource_threshold':
      if (!condition.target || condition.threshold === undefined || !condition.compare) {
        return false;
      }
      
      // Handle different resource targets
      let value = 0;
      
      if (condition.target === 'credibility' || 
          condition.target === 'influence' || 
          condition.target === 'networks' ||
          condition.target === 'manipulationPoints') {
        value = state.resources[condition.target];
      } else if (condition.target === 'ethicalScore') {
        value = state.ethicalScore;
      } else if (condition.target === 'criticalThinking') {
        value = state.criticalThinking;
      }
      
      // Compare value against threshold
      switch (condition.compare) {
        case 'greater':
          return value > condition.threshold;
        case 'lesser':
          return value < condition.threshold;
        case 'equal':
          return value === condition.threshold;
        default:
          return false;
      }
    
    case 'action_count':
      if (!condition.target || condition.count === undefined) {
        return false;
      }
      
      let count = 0;
      
      // Handle different count targets
      switch (condition.target) {
        case 'manipulate_clicks':
          count = state.stats?.manipulateClicks || 0;
          break;
        case 'theories_propagated':
          count = state.ethicalStats.theoriesPropagated;
          break;
        case 'ethical_actions':
          count = state.ethicalStats.ethicalActionsPerformed;
          break;
        default:
          return false;
      }
      
      return count >= condition.count;
      
    case 'progression':
      if (!condition.target || condition.threshold === undefined || !condition.compare) {
        return false;
      }
      
      if (condition.target === 'era_unlocked') {
        // Count unlocked eras
        const unlockedEras = state.eras.filter(era => era.unlocked).length;
        
        // Find specific era's index
        const eraIndex = state.eras.findIndex(era => era.id === state.currentEraId);
        
        switch (condition.compare) {
          case 'greater':
            return unlockedEras > condition.threshold;
          case 'equal':
            return eraIndex === condition.threshold;
          default:
            return false;
        }
      }
      
      return false;
      
    case 'special_action':
      if (!condition.target) {
        return false;
      }
      
      switch (condition.target) {
        case 'first_achievement':
          // This is the first achievement - it's triggered automatically
          // Special case: we don't want infinite recursion
          return state.achievementState.totalUnlocked === 0;
          
        case 'switch_to_revelation':
          return state.gameMode === 'revelation' && state.stats?.previousGameMode === 'manipulation';
          
        case 'share_achievement':
          return state.stats?.hasSharedAchievement || false;
          
        case 'click_gaslight_effect':
          return state.stats?.hasClickedGaslightEffect || false;
          
        default:
          return false;
      }
      
    case 'specific_combination':
      if (condition.customCheck) {
        return condition.customCheck(state);
      }
      return false;
      
    default:
      return false;
  }
};

/**
 * Apply rewards from an achievement
 * @param reward Achievement reward to apply
 * @param state Current game state
 * @returns Updated game state
 */
export const applyAchievementReward = (reward: AchievementReward, state: GameState): GameState => {
  if (!reward) return state;
  
  const updatedState = { ...state };
  
  switch (reward.type) {
    case 'resource_multiplier':
      if (reward.target && reward.value) {
        if (reward.target === 'credibility' || 
            reward.target === 'influence' || 
            reward.target === 'networks' ||
            reward.target === 'manipulationPoints') {
          // Apply resource multiplier
          updatedState.resourceMultipliers = {
            ...updatedState.resourceMultipliers || {},
            [reward.target]: (updatedState.resourceMultipliers?.[reward.target] || 1) * reward.value
          };
        }
      }
      break;
      
    case 'resource_bonus':
      if (reward.target && reward.value) {
        if (reward.target === 'credibility' || 
            reward.target === 'influence' || 
            reward.target === 'networks' ||
            reward.target === 'manipulationPoints') {
          // Add resource bonus
          updatedState.resources = {
            ...updatedState.resources,
            [reward.target]: updatedState.resources[reward.target] + reward.value
          };
        } else if (reward.target === 'criticalThinking') {
          // Add to critical thinking
          updatedState.criticalThinking = Math.min(100, updatedState.criticalThinking + reward.value);
        }
      }
      break;
      
    case 'unlock_feature':
      // Would handle feature unlocking logic here
      break;
      
    case 'special_effect':
      // Special effects like triggering other achievements, etc.
      // This would need specific implementation for each special effect
      break;
  }
  
  return updatedState;
};


/**
 * Patches achievements in saved state with any new achievements from the initial state
 * @param savedAchievements The achievement state from a saved game
 * @param initialAchievements The current set of achievement definitions in the game
 * @returns Updated achievement state with new achievements added
 */
export const patchAchievementsWithNewOnes = (
    savedAchievements: Achievement[], 
    initialAchievements: Achievement[]
  ): Achievement[] => {
    // Create sets of IDs for faster lookup
    const existingIds = new Set(savedAchievements.map(a => a.id));
    
    // Find achievements that don't exist in the saved state
    const newAchievements = initialAchievements.filter(a => !existingIds.has(a.id));
    
    // If no new achievements, return the original array
    if (newAchievements.length === 0) {
      return savedAchievements;
    }
    
    // Combine existing achievements with new ones
    return [
      ...savedAchievements,
      ...newAchievements.map(achievement => ({
        ...achievement,
        unlocked: false // Ensure new achievements start as unlocked
      }))
    ];
  };