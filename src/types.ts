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
  propagated: boolean; // If already propagated
  visible: boolean; // If visible to the player
}

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
  | { type: 'RESET'; };      // Reset the game