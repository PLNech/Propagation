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
 * Main game state
 */
export interface GameState {
  resources: GameResources;
  eras: HistoricalEra[];
  currentEraId: string;
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
  | { type: 'RESET'; };      // Reset the game