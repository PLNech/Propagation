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
* Option for a scenario choice
*/
export interface ScenarioChoice {
  id: string;
  text: string;
  description: string; // Describes the reasoning/approach
  type: 'manipulation' | 'moderate' | 'ethical'; // Type of approach
  consequences: {
    resources?: Partial<Record<keyof GameResources, number>>; // Resource gains/losses
    ethicalScore?: number; // Ethical score impact
    criticalThinking?: number; // Critical thinking impact
  };
}

/**
* Historical scenario with ethical dilemma
*/
export interface Scenario {
  id: string;
  title: string;
  description: string;
  eraId: string; // The era this scenario belongs to
  historicalContext?: string; // Optional historical background
  choices: ScenarioChoice[];
  completed: boolean;
  selectedChoiceId?: string; // ID of the choice made by the player
  imageType?: 'ancient' | 'medieval' | 'industrial' | 'modern' | 'digital'; // Visual theme for the scenario
  triggerCondition?: {
    type: 'propagateTheory' | 'ethicalAction' | 'upgradesPurchased' | 'resourceThreshold';
    value: number | string; // Threshold value or specific ID
  };
}

/**
* Available game modes
*/
export type GameMode = 'manipulation' | 'revelation';

/**
* Main game state
*/
export interface GameState {
  playerName: string;
  playerGender: 'masculine' | 'feminine' | 'neutral';
  entityName: string;
  entityType: 'Tribu' | 'Village' | 'Cité' | 'Pays' | 'Empire';
  resources: GameResources;
  resourcesUnlocked: {
    manipulationPoints: boolean;
    credibility: boolean;
    influence: boolean;
    networks: boolean;
  };
  eras: HistoricalEra[];
  highestEraReached: string,
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
  scenarios: Scenario[];
  activeScenarioId: string | null;
  completedScenarios: string[]; // IDs of completed scenarios
  gameEnded: boolean; // If a game ending has been triggered
  activeEndingId: string | null; // ID of the active ending, if any
  lastTick: number;      // Timestamp of the last update
  tickInterval: number;  // Time between updates in milliseconds
  achievementState: AchievementState;
  resourceMultipliers?: Partial<Record<keyof GameResources, number>>;
  featureDiscovered: {
    scenarios: boolean;
    theories: boolean;
    ethics: boolean;
    digital: boolean;
  };
  featureAcknowledged: {
    scenarios: boolean;
    theories: boolean;
    ethics: boolean;
    digital: boolean;
  };
  stats?: {
    manipulateClicks: number;
    previousGameMode?: GameMode;
    hasSharedAchievement: boolean;
    hasClickedGaslightEffect: boolean;
    lastTabVisited?: string;
    clickedLoreLinks?: string[]; // All clicked links
    clickedHistoryLinks?: string[]; // History-related links
    clickedPhilosophyLinks?: string[]; // Philosophy/rationality links
    clickedPropagandaLinks?: string[]; // Propaganda/manipulation links
    timeAtZeroEthics?: number; // Time spent at zero ethics
    gaslightEffectsClicked?: string[]; // IDs of clicked gaslight effects
    totalPlayTime?: number; // Total play time
  };
}

/**
* Actions that can modify the game state
*/
export type GameAction = 
| { type: 'SET_PLAYER_INFO'; payload: { playerName: string, playerGender: "masculine" | "feminine" | "neutral", entityName: string } }
| { type: 'TICK'; payload: { currentTime: number } }  // Regular game update
| { type: 'MANIPULATE'; }  // Player initiated action
| { type: 'NETWORKING'; }  // Generate networks
| { type: 'CREDIBILITY'; }  // Generate credibility
| { type: 'INFLUENCE'; }  // Generate influence
| { type: 'UNLOCK_RESOURCE'; payload: { resource: keyof GameResources } }
| { type: 'UNLOCK_ERA'; payload: { eraId: string } }  // Unlock a new era
| { type: 'SELECT_ERA'; payload: { eraId: string } }  // Select an era as current
| { type: 'PURCHASE_UPGRADE'; payload: { upgradeId: string } }  // Purchase an upgrade
| { type: 'PROPAGATE_THEORY'; payload: { theoryId: string } }  // Propagate a conspiracy theory
| { type: 'PERFORM_ETHICAL_ACTION'; payload: { actionId: string } }  // Perform an ethical action
// Reveal
| { type: 'DISCOVER_FEATURE'; payload: { feature: string } }
| { type: 'ACKNOWLEDGE_FEATURE'; payload: { feature: string } }
// Scenarios
| { type: 'TRIGGER_SCENARIO'; payload: { scenarioId: string } }
| { type: 'MAKE_SCENARIO_CHOICE'; payload: { scenarioId: string, choiceId: string } }
| { type: 'DISMISS_SCENARIO'; payload: { scenarioId: string } }
// Achievements
| { type: 'UNLOCK_ACHIEVEMENT'; payload: { achievementId: string } }
| { type: 'VIEW_ACHIEVEMENT'; payload: { achievementId: string } }
| { type: 'DISMISS_ACHIEVEMENT_NOTIFICATION'; payload: { achievementId: string } }
| { type: 'SHARE_ACHIEVEMENT'; payload: { achievementId: string } }
| { type: 'CHECK_ACHIEVEMENTS'; }
| { type: 'RESET_ACHIEVEMENTS'; }
| { type: 'CLICK_GASLIGHT_EFFECT'; }
| { type: 'CLICK_LORE_LINK'; payload: { linkType: string, url: string } }
// Utils
| { type: 'SWITCH_GAME_MODE'; payload: { mode: GameMode } }  // Switch between game modes
| { type: 'ACKNOWLEDGE_ENDING'; payload: { endingId: string } }  // Acknowledge a game ending
| { type: 'LOAD_GAME'; payload: { state: GameState } } // Load a saved game
| { type: 'RESET'; };      // Reset the game


/**
* Achievement categories
*/
export type AchievementCategory = 
| 'progression'  // Era progression, upgrades
| 'resources'    // Resource accumulation 
| 'ethics'       // Ethical choices and critical thinking
| 'manipulation' // Manipulation techniques and theories
| 'meta'         // Meta-achievements (4th wall, game mechanics)
| 'secret';      // Hidden achievements

/**
* Rarity levels for achievements
*/
export type AchievementRarity = 
| 'common'     // Easy to obtain
| 'uncommon'   // Requires some effort
| 'rare'       // Challenging to obtain
| 'epic'       // Difficult, requiring dedication
| 'legendary'; // Very difficult to obtain

/**
* Reward types for completing achievements
*/
export interface AchievementReward {
  type: 'resource_multiplier' | 'resource_bonus' | 'unlock_feature' | 'special_effect';
  target?: keyof GameResources | string;
  value?: number;
  description: string;
}

/**
* Achievement data structure
*/
export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  isSecret: boolean;        // If true, not shown until unlocked
  hint?: string;            // Optional hint for secret achievements
  unlocked: boolean;        // If the achievement has been unlocked
  unlockedAt?: number;      // Timestamp when it was unlocked
  condition: {
    type: 'progression' | 'resource_threshold' | 'action_count' | 'special_action' | 'ethical_score' | 'specific_combination';
    target?: string;        // Target resource or action type
    threshold?: number;     // Required threshold value
    count?: number;         // Required count of actions
    compare?: 'greater' | 'lesser' | 'equal'; // Comparison operation
    customCheck?: (state: GameState) => boolean; // Custom checking function
  };
  reward?: AchievementReward; // Optional reward
  icon: string;              // Icon used in UI (can be emoji)
  color: string;             // Color theme (tailwind color class)
  shareText: string;         // Text shown when sharing the achievement
}

/**
* Achievement section in game state
*/
export interface AchievementState {
  achievements: Achievement[];
  totalUnlocked: number;
  totalAchievements: number; 
  newUnlocked: string[];    // IDs of newly unlocked achievements (for notifications)
  showAchievementModal: boolean;
  selectedAchievementId: string | null;
}

// Extend Window interface for gaslight-achievements integration
declare global {
  interface Window {
    handleGaslightClick?: () => void;
    __SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReturnType<typeof import('./components/game/core/debugHelper').createDebugHelper>;
  }
}