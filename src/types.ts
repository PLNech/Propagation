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
   * Main game state
   */
  export interface GameState {
    resources: GameResources;
    lastTick: number;      // Timestamp of the last update
    tickInterval: number;  // Time between updates in milliseconds
  }
  
  /**
   * Actions that can modify the game state
   */
  export type GameAction = 
    | { type: 'TICK'; payload: { currentTime: number } }  // Regular game update
    | { type: 'MANIPULATE'; }  // Player initiated action
    | { type: 'RESET'; };      // Reset the game