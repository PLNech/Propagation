/**
 * Game resources that can be accumulated
 */
export interface GameResources {
  credibility: number;    // Represents how believable your messages are
  influence: number;      // Represents your reach and impact
  networks: number;       // Represents communication channels
  manipulationPoints: number; // Main "currency" of the game
}

/**
 * Manipulation technique within an era
 */
export interface ManipulationTechnique {
  id: string;
  name: string;
  description: string;
  effect: {
    resource: keyof GameResources;
    multiplier: number;
  };
}

/**
 * Historical era with specific manipulation techniques
 */
export interface HistoricalEra {
  id: string;
  name: string; 
  description: string;
  unlocked: boolean;
  unlockCost: number; // Influence cost to unlock
  resourceMultipliers: Partial<Record<keyof GameResources, number>>;
  techniques: ManipulationTechnique[];
}

/**
 * Purchasable upgrade to enhance player capabilities
 */
export interface Upgrade {
  id: string;
  name: string;
  description: string;
  eraId: string; // The era this upgrade belongs to
  cost: Partial<Record<keyof GameResources, number>>; // Cost in resources
  effect: {
    type: 'multiplier' | 'passive' | 'unlock'; // Effect type
    target: keyof GameResources | string; // Affected resource or feature
    value: number; // Effect value (e.g., multiplier x1.5 = 1.5)
  };
  purchased: boolean;
  visible: boolean; // If visible to the player
  prerequisiteUpgradeIds: string[]; // Upgrades required before this one can be purchased
}

/**
 * Conspiracy theory that can be propagated
 */
export interface ConspiracyTheory {
  id: string;
  name: string;
  description: string;
  eraId: string; // The era this theory is appropriate for
  cost: number; // Cost in manipulation points
  successRate: number; // Probability of success (0-1)
  rewards: Partial<Record<keyof GameResources, number>>; // Resource rewards
  ethicalImpact: number; // Impact on ethical score (-10 to +10)
  criticalThinkingImpact: number; // Impact on critical thinking (-10 to +10)
  propagated: boolean; // If already propagated
  visible: boolean; // If visible to the player
}

/**
 * Ethical action that can be performed
 */
export interface EthicalAction {
  id: string;
  name: string;
  description: string;
  eraId: string; // The era this action is appropriate for
  cost: Partial<Record<keyof GameResources, number>>; // Cost in resources
  ethicalGain: number; // Gain in ethical score (0-100)
  criticalThinkingGain: number; // Gain in critical thinking (0-100)
  performed: boolean; // If already performed
  unlockCondition?: { // Optional condition to unlock this action
    type: 'ethicalScore' | 'criticalThinking' | 'propagatedTheories';
    value: number;
  };
}

/**
 * Educational content about manipulation techniques
 */
export interface EducationalContent {
  id: string;
  title: string;
  content: string;
  eraId: string; // Related era
  additionalResources?: string; // Optional links or references
}

/**
 * Inspirational quotes about critical thinking
 */
export interface CriticalThinkingQuote {
  id: string;
  quote: string;
  author: string;
  era?: string; // Optional era context
}

/**
 * Game ending based on player choices
 */
export interface GameEnding {
  id: string;
  title: string;
  description: string;
  condition: {
    ethicalScore: number; // Minimum ethical score required
    criticalThinking: number; // Minimum critical thinking required
    influence: number; // Minimum influence required
    requiredMode?: 'manipulation' | 'revelation'; // Optional required game mode
  };
  triggered: boolean; // If this ending has been triggered
}

/**
 * Statistics tracking ethical impact
 */
export interface EthicalStats {
  theoriesPropagated: number;
  ethicalActionsPerformed: number;
  influenceSacrificed: number;
  livesImpacted: number; // Simulated number of people affected by player actions
  criticalThinkingRaised: number;
  endingsUnlocked: number;
}

/**
 * Available game modes
 */
export type GameMode = 'manipulation' | 'revelation';

/**
 * Main game state
 */
export interface GameState {
  resources: GameResources;
  eras: HistoricalEra[];
  currentEraId: string;
  upgrades: Upgrade[];
  conspiracyTheories: ConspiracyTheory[];
  ethicalScore: number; // Score from 0 to 100, 100 being perfectly ethical
  criticalThinking: number; // Score from 0 to 100, 100 being maximum critical thinking
  ethicalActions: EthicalAction[];
  gameMode: GameMode; // Current game mode
  educationalContent: EducationalContent[];
  criticalThinkingQuotes: CriticalThinkingQuote[];
  gameEndings: GameEnding[];
  ethicalStats: EthicalStats;
  gameEnded: boolean; // If a game ending has been triggered
  activeEndingId: string | null; // ID of the active ending, if any
  lastTick: number;      // Timestamp of the last update
  tickInterval: number;  // Time between updates in milliseconds
}

/**
 * Actions that can modify the game state
 */
export type GameAction = 
  | { type: 'TICK'; payload: { currentTime: number } }  // Regular game update
  | { type: 'MANIPULATE'; }  // Player initiated action
  | { type: 'UNLOCK_ERA'; payload: { eraId: string } }  // Unlock a new era
  | { type: 'SELECT_ERA'; payload: { eraId: string } }  // Select an era as current
  | { type: 'PURCHASE_UPGRADE'; payload: { upgradeId: string } }  // Purchase an upgrade
  | { type: 'PROPAGATE_THEORY'; payload: { theoryId: string } }  // Propagate a conspiracy theory
  | { type: 'PERFORM_ETHICAL_ACTION'; payload: { actionId: string } }  // Perform an ethical action
  | { type: 'SWITCH_GAME_MODE'; payload: { mode: GameMode } }  // Switch between game modes
  | { type: 'ACKNOWLEDGE_ENDING'; payload: { endingId: string } }  // Acknowledge a game ending
  | { type: 'RESET'; };      // Reset the game