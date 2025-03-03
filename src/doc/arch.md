# Propagation - Architecture Overview

## Core Architecture

The game follows a unidirectional data flow pattern with a centralized state, implementing a simplified Redux-like architecture:

- **State Management**: `useReducer` hook with a centralized state object and pure reducer functions
- **Component Structure**: Hierarchical component model with clear separation of concerns
- **Data Flow**: Top-down props passing for data, callback functions for state updates

## Key Components

### State Management

- `gameReducer.ts`: Pure function that processes all game actions and produces new state
- `types.ts`: TypeScript interfaces defining all game data structures
- `*Data.ts` files: Data modules that provide initial game content (eras, upgrades, theories, etc.)

### UI Components

- **Container Component**: `PropagationGame.tsx` - Manages game state and coordinates child components
- **Tab Components**: `ResourcesTab`, `ProgressionTab`, `UpgradesTab`, `TheoriesTab`, `EthicsTab`
- **Card Components**: `UpgradeCard`, `TheoryCard`, `EthicalActionCard` - Reusable presentation components
- **Utility Components**: `SaveManager`, `NotificationSystem` - Independent functional modules

### Services

- `saveService.ts`: Handles game state persistence using localStorage and base64 encoding
- `gaslightingService.ts`: Manages meta-narrative elements and fourth-wall breaking experiences

## File Organization

```
src/
├── components/
│   └── game/              # All game-specific components
│       ├── types.ts       # Core type definitions
│       ├── gameReducer.ts # State management
│       ├── *Tab.tsx       # Tab components
│       ├── *Card.tsx      # Card components
│       ├── *Service.ts    # Service modules
│       └── *Data.ts       # Game data/content
├── styles/                # CSS/styling files
└── app/                   # Next.js app structure
```

## Design Patterns

1. **Reducer Pattern**: Centralized state updates through pure functions
2. **Component Composition**: Building complex UI from simpler, reusable pieces
3. **Data/UI Separation**: Clear separation between game data and visual representation
4. **Progressive Disclosure**: Features unlock gradually based on player progress
5. **Conditional Rendering**: UI adapts based on game state and player choices

## Technical Decisions

1. **TypeScript**: Strict typing for robustness and developer experience
2. **React Hooks**: Functional components with hooks for state and effects
3. **Pure Functions**: Side-effect free logic for predictable behavior
4. **Immutable Updates**: Creating new state objects rather than mutating existing ones
5. **LocalStorage**: Client-side persistence without requiring a backend
6. **CSS-in-JS**: Tailwind combined with dynamic classes for interactive effects

## Layers of Gameplay

The game is built in conceptual layers:

1. **Resource Generation**: Core incremental mechanics (tick system, resource accumulation)
2. **Era Progression**: Historical contexts that modify base mechanics
3. **Upgrades System**: Strategic choices that optimize resource generation
4. **Theory Propagation**: Risk/reward mechanics with ethical implications
5. **Ethics System**: Meta-layer that offers alternative gameplay paths
6. **Gaslighting**: Fourth-wall breaking layer that enhances thematic resonance

Each layer builds upon previous ones, creating a progressively deeper experience while maintaining a cohesive whole.

## Extension Points

The architecture was designed with these extension points in mind:

1. **New Eras**: Add to `eraData.ts` without changing core mechanics
2. **New Upgrades/Theories**: Extend respective data files to add content
3. **New Game Actions**: Add action types to reducer with minimal changes to existing code
4. **New UI Components**: Plug into the tab system without affecting other components
5. **Data Persistence**: SaveService can be extended to support cloud saves or exports

## Performance Considerations

1. **Memoization**: Use React.memo for expensive renders
2. **Throttling**: Tick system uses controlled intervals
3. **Lazy Loading**: Some content only loads when needed (specific tabs)
4. **LocalStorage Limits**: Saves are compressed to avoid storage limits
5. **Effect Cleanup**: All effects properly clean up to prevent memory leaks