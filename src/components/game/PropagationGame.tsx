// This is the updated PropagationGame.tsx component with AboutPage integration

import React, { useReducer, useEffect, useState, useRef, useCallback } from 'react';
import { gameReducer, initialGameState } from './core/gameReducer';
import ResourceDisplay from './ui/ResourceDisplay';
import GameButtons from './ui/GameButtons';
import ProgressionTab from './tabs/ProgressionTab';
import UpgradesTab from './tabs/UpgradesTab';
import TheoriesTab from './tabs/TheoriesTab';
import EthicsTab from './tabs/EthicsTab';
import ScenarioModal from './modals/ScenarioModal';
import ScenariosTab from './tabs/ScenariosTab';
import AchievementsTab from './tabs/AchievementsTab';
import AchievementNotificationManager from './features/achievements/AchievementNotificationManager';
import GameEndingModal from './modals/GameEndingModal';
import WelcomeModal from './modals/WelcomeModal';  
import SaveManager from './ui/SaveManager';
import NotificationSystem, { useNotifications, NotificationType } from './NotificationSystem';
import { HistoricalEra, GameMode, GameState } from '@/types';
import { 
  selectGaslightEffect, 
  shouldTriggerGaslight, 
  applyUIChange,
  initializeGaslightingStyles,
  GaslightEffect
} from './core/gaslightingService';
import { 
  setupAutoSave, 
  saveGame, 
  loadGame, 
  hasSaveGame
} from './core/saveService';
import TutorialModal from './modals/TutorialModal';
import AboutPage from './ui/AboutPage';
import { createDebugHelper } from './core/debugHelper';
import Header from './ui/Header';

// Tab types
type TabType = 'resources' | 'progression' | 'upgrades' | 'theories' | 'ethics' | 'scenarios' | 'achievements';

/**
 * Main game component with all systems including enhanced gaslighting and save/load
 */
const PropagationGame = () => {
  const [isLoading, setIsLoading] = useState(true); // To avoir tutorial flashing
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [activeTab, setActiveTab] = useState<TabType>('resources');
  const { notifications, addNotification, dismissNotification } = useNotifications();
  const [showTutorial, setShowTutorial] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [headerInfo, setHeaderInfo] = useState({ isSticky: false, height: 0 });
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [theoryPropagationStatus, setTheoryPropagationStatus] = useState<Record<string, 'success' | 'failed' | null>>({});
  const lastTabChangeTime = useRef(Date.now());
  
  // Tracking des interactions pour les effets de gaslighting
  const interactionCount = useRef(0);
  const lastGaslightTime = useRef(0);
  const lastSaveTime = useRef(0);
  const hasLoadedSave = useRef(false);
    // Référence à l'état du jeu pour les sauvegardes
  const gameStateRef = useRef(gameState);
  const lastActionRef = useRef("NONE");
  
  // const getState = () => gameStateRef.current;

  // Helper functions to determine which features are unlocked
  const isUpgradesUnlocked = (): boolean => {
    return gameState.resources.manipulationPoints >= 10;
  };
  
  const isProgressionUnlocked = (): boolean => {
    // Check if any upgrades have been purchased or player has enough manipulation points
    return gameState.upgrades.some(upgrade => upgrade.purchased) || gameState.resources.manipulationPoints >= 50;
  };
  
  // Define era progression once
  const eraProgression = ['antiquity', 'middleAges', 'industrial', 'coldWar', 'digital'];
  
  // Helper function to check if an era has been reached
  const hasReachedEra = (requiredEra: string): boolean => {
    const requiredEraIndex = eraProgression.indexOf(requiredEra);
    const highestEraIndex = eraProgression.indexOf(gameState.highestEraReached);
    return highestEraIndex >= requiredEraIndex;
  };
  
  // const isScenariosUnlocked = (): boolean => {
  //   // Scenarios are unlocked once player has reached Middle Ages era
  //   return hasReachedEra('middleAges');
  // };
  
  const isTheoriesUnlocked = (): boolean => {
    // Theories are unlocked once player has reached Industrial era
    return hasReachedEra('industrial');
  };
  
  const isEthicsUnlocked = (): boolean => {
    // Ethics are unlocked once player has reached Cold War era
    return hasReachedEra('coldWar');
  };
  
  // Mettre à jour la référence quand l'état change
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Get the current era object
  const currentEra = gameState.eras.find(era => era.id === gameState.currentEraId) as HistoricalEra;
  
  // Get the active ending if game has ended
  const activeEnding = gameState.activeEndingId 
    ? gameState.gameEndings.find(ending => ending.id === gameState.activeEndingId) 
    : null;

  // Initialise gaslight
  useEffect(() => {
    initializeGaslightingStyles();
    // Expose the gaslight click handler to window for integration with the gaslighting service
    window.handleGaslightClick = handleGaslightClick;
    
    return () => {
      // Cleanup
      delete window.handleGaslightClick;
    };
  }, []);

  // Debug helper - separate useEffect for cleaner organization
  useEffect(() => {
    const getState = () => gameStateRef.current;
    window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = createDebugHelper(dispatch, getState);
    console.log("Debug helper loaded. Access via window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED");
    
    // Add keyboard shortcut (Shift+D) to toggle debug overlay
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'D') {
        e.preventDefault();
        window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.toggleDebugOverlay();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
    
  // Vérifier s'il y a une sauvegarde à charger
  useEffect(() => {
    const loadSavedGame = async () => {
      // Start with loading state
      setIsLoading(true);
      
      if (hasLoadedSave.current) {
        setShowTutorial(false);
        setIsLoading(false);
        return;
      }
      
      const saveExists = hasSaveGame(true);
      
      if (saveExists.exists) {
        const savedState = loadGame(true);
        if (savedState) {
          dispatch({ type: 'LOAD_GAME', payload: { state: savedState } });
          addNotification('Partie précédente chargée automatiquement', 'info', 3000);
          hasLoadedSave.current = true;
          setShowTutorial(false);
        } else {
          // No valid state, show welcome modal
          setShowWelcomeModal(true);
        }
      } else {
        // No save exists, show welcome modal
        setShowWelcomeModal(true);
      }
      
      // Mark loading as complete
      setIsLoading(false);
    };
    
    loadSavedGame();
  }, [addNotification]);

  // Configurer l'auto-sauvegarde
  useEffect(() => {
    const stopAutoSave = setupAutoSave(() => gameStateRef.current, 60000);
    
    return () => {
      stopAutoSave();
    };
  }, []);
  
  // Configurer l'économiseur d'écran de sauvegarde quand l'onglet perd le focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // L'utilisateur a quitté l'onglet, sauvegarder
        const now = Date.now();
        if (now - lastSaveTime.current > 10000) { // Éviter les sauvegardes trop fréquentes
          saveGame(gameStateRef.current, true);
          lastSaveTime.current = now;
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  useEffect(() => {
    // Check achievements when relevant state changes
    if (lastActionRef.current) {
      dispatch({ type: 'CHECK_ACHIEVEMENTS' });
    }
  }, [
    gameState.resources, 
    gameState.ethicalScore, 
    gameState.criticalThinking,
    gameState.ethicalStats.theoriesPropagated,
    gameState.ethicalStats.ethicalActionsPerformed,
    gameState.currentEraId,
    gameState.stats?.manipulateClicks
  ]);



  // Déclencher un effet de gaslighting
  const triggerGaslightEffect = useCallback((effect: GaslightEffect) => {
    switch (effect.type) {
      case 'notification':
        // Simple notification
        const message = typeof effect.message === 'function' ? effect.message() : effect.message;
        if (message) {
          addNotification(message, 'warning', 5000);
        }
        break;
        
      case 'ui_change':
        // Changement d'interface
        applyUIChange(effect);
        break;
        
      case 'data_change':
      case 'discourage':
      case 'fourth_wall':
      case 'game_doubt':
      case 'memory_doubt':
      case 'conspiracy':
      case 'scare':
        // Ces types sont principalement des messages, mais avec des tons différents
        const messageContent = typeof effect.message === 'function' ? effect.message() : effect.message;
        if (messageContent) {
          const messageType: NotificationType = 
            effect.type === 'scare' ? 'error' :
            effect.type === 'discourage' ? 'info' :
            effect.type === 'conspiracy' || effect.type === 'fourth_wall' ? 'warning' :
            'info';
          
          addNotification(messageContent, messageType, 6000);
        }
        break;
    }
  }, [addNotification]);

  // Fonction pour vérifier et déclencher des effets de gaslighting
  const checkForGaslightEffects = useCallback(() => {
    // N'exécute que si l'utilisateur a suffisamment interagi avec le jeu
    if (interactionCount.current < 5) return;
    
    const now = Date.now();
    
    // Limiter la fréquence des effets (au moins 2 minutes entre chaque)
    if (now - lastGaslightTime.current < 120000) return;
    
    // Vérifier si un effet doit être déclenché
    if (shouldTriggerGaslight(interactionCount.current)) {
      const effect = selectGaslightEffect(gameState, interactionCount.current);
      
      if (effect) {
        triggerGaslightEffect(effect);
        lastGaslightTime.current = now;
      }
    }
  }, [gameState, triggerGaslightEffect]);
  
  // Set up the tick system with gaslighting checks
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TICK', payload: { currentTime: Date.now() } });
      
      // Check for gaslighting effects with reduced frequency
      checkForGaslightEffects();
    }, gameState.tickInterval);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [gameState.tickInterval, checkForGaslightEffects]);
    
  const handlePlayerNameSubmit = (playerName: string, entityName: string) => {
    dispatch({ 
      type: 'SET_PLAYER_INFO', 
      payload: { playerName, entityName } 
    });
    setShowWelcomeModal(false);
    // Show tutorial after welcome modal
    setShowTutorial(true);
    setOnboardingCompleted(false);
  };

  // Handle the manipulate button click
  const handleManipulate = () => {
    dispatch({ type: 'MANIPULATE' });
    interactionCount.current += 1;
    lastActionRef.current = 'MANIPULATE';
    
    // Rare manipulation effect (gaslighting)
    if (Math.random() > 0.99 && interactionCount.current > 20) {
      setTimeout(() => {
        const manipulateBtn = document.getElementById('manipulate-button');
        if (manipulateBtn) {
          const originalText = manipulateBtn.innerText;
          manipulateBtn.innerText = "Manipulé";
          
          setTimeout(() => {
            manipulateBtn.innerText = originalText;
          }, 1500);
        }
      }, 500);
    }
  };
  
  // Handle era unlocking
  const handleUnlockEra = (eraId: string) => {
    dispatch({ type: 'UNLOCK_ERA', payload: { eraId } });
    const eraName = gameState.eras.find(e => e.id === eraId)?.name;
    addNotification(`Nouvelle ère débloquée: ${eraName}`, 'success');
    interactionCount.current += 5;
  };
  

  // Handle era selection
  const handleSelectEra = (eraId: string) => {
    dispatch({ type: 'SELECT_ERA', payload: { eraId } });
    interactionCount.current += 1;
    
    // Trigger achievement for returning to Antiquity after unlocking theories or ethics
    if (eraId === 'antiquity' && 
        (isTheoriesUnlocked() || isEthicsUnlocked()) && 
        !gameState.achievementState.achievements.find(a => a.id === 'time_traveler')?.unlocked) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: { achievementId: 'time_traveler' } });
    }
    
    // Rare gaslighting pour les sélections d'ères
    if (Math.random() > 0.95 && interactionCount.current > 15) {
      setTimeout(() => {
        const messages = [
          "Cette ère semble différente de votre dernière visite...",
          "Les règles de cette ère ont-elles subtilement changé?",
          "Certains détails de cette ère semblent avoir été altérés."
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];
        addNotification(message, 'info', 4000);
      }, 2000);
    }
  };  
  // Handle upgrade purchase
  const handlePurchaseUpgrade = (upgradeId: string) => {
    dispatch({ type: 'PURCHASE_UPGRADE', payload: { upgradeId } });
    const upgradeName = gameState.upgrades.find(u => u.id === upgradeId)?.name;
    addNotification(`Amélioration achetée: ${upgradeName}`, 'success');
    interactionCount.current += 3;
  };
  
  // Handle theory propagation
  const handlePropagateTheory = (theoryId: string) => {
    const theory = gameState.conspiracyTheories.find(t => t.id === theoryId);
    if (!theory) return;
    
    dispatch({ type: 'PROPAGATE_THEORY', payload: { theoryId } });
    interactionCount.current += 4;
    
    // Determine success based on theory's success rate
    const isSuccessful = Math.random() < theory.successRate;
    
    // Update propagation status for UI
    setTheoryPropagationStatus({
      ...theoryPropagationStatus,
      [theoryId]: isSuccessful ? 'success' : 'failed'
    });
    
    // Clear status after delay
    setTimeout(() => {
      setTheoryPropagationStatus(prev => ({
        ...prev,
        [theoryId]: null
      }));
    }, 5000);
    
    if (isSuccessful) {
      addNotification(`Théorie propagée: ${theory.name}`, 'success');
      // Show ethical impact notification
      if (theory.ethicalImpact < 0) {
        addNotification(`Impact éthique: ${theory.ethicalImpact}`, 'ethical', 5000);
      }
      
      // Rare gaslighting après plusieurs propagations réussies
      if (Math.random() > 0.9 && gameState.ethicalStats.theoriesPropagated > 5) {
        setTimeout(() => {
          const messages = [
            "Et si ces théories n'étaient pas si fictives que ça?",
            "Vous commencez à croire à vos propres théories...",
            "La frontière entre théorie et réalité devient floue."
          ];
          const message = messages[Math.floor(Math.random() * messages.length)];
          addNotification(message, 'warning', 4000);
        }, 3000);
      }
    } else {
      addNotification(`Échec de la propagation: ${theory.name}`, 'error');
    }
  };
  
  // Handle ethical action
  const handlePerformEthicalAction = (actionId: string) => {
    const action = gameState.ethicalActions.find(a => a.id === actionId);
    if (!action) return;
    
    dispatch({ type: 'PERFORM_ETHICAL_ACTION', payload: { actionId } });
    interactionCount.current += 3;
    
    addNotification(`Action éthique réalisée: ${action.name}`, 'ethical');
  };


  // Handle networking button click
  const handleNetworking = () => {
    if (gameState.resources.manipulationPoints >= 2) {
      dispatch({ type: 'NETWORKING' });
      interactionCount.current += 1;
    }
  };
  
  // Handle credibility button click
  const handleCredibility = () => {
    if (gameState.resources.manipulationPoints >= 3) {
      dispatch({ type: 'CREDIBILITY' });
      interactionCount.current += 1;
    }
  };
  
  // Handle influence button click
  const handleInfluence = () => {
    if (gameState.resources.manipulationPoints >= 5) {
      dispatch({ type: 'INFLUENCE' });
      interactionCount.current += 1;
    }
  };
    
  // Handle game mode switch
  const handleSwitchGameMode = (mode: GameMode) => {
    if (gameState.gameMode === mode) return;
    
    dispatch({ type: 'SWITCH_GAME_MODE', payload: { mode } });
    interactionCount.current += 5;
    
    if (mode === 'manipulation') {
      addNotification('Mode Manipulation activé: la fin justifie les moyens', 'warning');
    } else {
      addNotification('Mode Révélation activé: la vérité a un prix', 'ethical');
      
      // Gaslighting rare pour le mode révélation
      if (Math.random() > 0.8 && interactionCount.current > 15) {
        setTimeout(() => {
          const messages = [
            "Le mode Révélation cache ses propres formes de manipulation...",
            "Êtes-vous vraiment libre des mécanismes que vous révélez?",
            "La révélation est aussi une forme de contrôle."
          ];
          const message = messages[Math.floor(Math.random() * messages.length)];
          addNotification(message, 'info', 5000);
        }, 4000);
      }
    }
  };
  
  // Handle game ending acknowledgement
  const handleAcknowledgeEnding = (endingId: string) => {
    dispatch({ type: 'ACKNOWLEDGE_ENDING', payload: { endingId } });
    addNotification('Fin débloquée! Vous pouvez continuer à explorer.', 'info', 5000);
    interactionCount.current += 10;
  };
  
  // Handle tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    interactionCount.current += 1;
    
    // Check time since last tab change
    const now = Date.now();
    lastTabChangeTime.current = now;
  };

  const handleTutorialClose = () => {
    setShowTutorial(false);
    setOnboardingCompleted(true);
  }
  
  // Sauvegarder le jeu manuellement
  const handleSaveGame = () => {
    saveGame(gameState);
    
    // Mettre à jour le timestamp
    lastSaveTime.current = Date.now();
    
    // Rare gaslighting effect après sauvegarde
    if (Math.random() > 0.9 && interactionCount.current > 25) {
      setTimeout(() => {
        const messages = [
          "Les sauvegardes sont-elles vraiment fidèles à votre partie?",
          "Certains joueurs rapportent des altérations dans leurs sauvegardes...",
          "Le jeu continue parfois à évoluer même dans les sauvegardes."
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];
        addNotification(message, 'warning', 4500);
      }, 2000);
    }
  };
  
  // Charger une sauvegarde
  const handleLoadGame = (state: GameState) => {
    dispatch({ type: 'LOAD_GAME', payload: { state } });
    interactionCount.current = Math.max(10, interactionCount.current); // Conserver une partie de l'interaction
  };
  
  // Réinitialiser le jeu
  const handleResetGame = () => {
    dispatch({ type: 'RESET' });
    interactionCount.current = 0;
    setShowWelcomeModal(true); // Show welcome modal after reset
    setOnboardingCompleted(false); // Reset onboarding state
  };

  // Show the About page
  const handleShowAbout = () => {
    setShowAbout(true);
    interactionCount.current += 1;
  };

  // Hide the About page
  const handleCloseAbout = () => {
    setShowAbout(false);
  };


  const handleMakeScenarioChoice = (scenarioId: string, choiceId: string) => {
    dispatch({ type: 'MAKE_SCENARIO_CHOICE', payload: { scenarioId, choiceId } });
    
    // Add to interaction count for gaslighting system
    interactionCount.current += 3;
    
    // Show a notification with the choice theme
    const scenario = gameState.scenarios.find(s => s.id === scenarioId);
    const choice = scenario?.choices.find(c => c.id === choiceId);
    
    if (scenario && choice) {
      let notificationType: NotificationType = 'info';
      let message = `Vous avez fait un choix dans "${scenario.title}"`;
      
      // Different message and notification type based on choice type
      switch (choice.type) {
        case 'manipulation':
          message = `Vous avez choisi la manipulation pure dans "${scenario.title}". La fin justifie les moyens...`;
          notificationType = 'error';
          break;
        case 'moderate':
          message = `Vous avez choisi une approche modérée dans "${scenario.title}". Un compromis pragmatique.`;
          notificationType = 'warning';
          break;
        case 'ethical':
          message = `Vous avez pris position pour l'éthique dans "${scenario.title}". Une voie plus difficile mais plus noble.`;
          notificationType = 'ethical';
          break;
      }
      
      addNotification(message, notificationType, 4000);
    }
  };

  const handleDismissScenario = () => {
    if (gameState.activeScenarioId) {
      dispatch({ type: 'DISMISS_SCENARIO', payload: { scenarioId: gameState.activeScenarioId } });
    }
  };

  const handleViewScenario = (scenarioId: string) => {
    // If the scenario is completed, just show its details
    // If it's not completed, trigger it if not already active
    const scenario = gameState.scenarios.find(s => s.id === scenarioId);
    
    if (!scenario) return;
    
    if (!scenario.completed && !gameState.completedScenarios.includes(scenarioId)) {
      dispatch({ type: 'TRIGGER_SCENARIO', payload: { scenarioId } });
    }
    
    // If already completed, maybe show a modal with the story and the choice made
    // This could be implemented later as an enhancement
  };

  const handleGaslightClick = () => {
    dispatch({ type: 'CLICK_GASLIGHT_EFFECT' });
    lastActionRef.current = 'CLICK_GASLIGHT_EFFECT';
  };


  const handleResetAchievements = () => {
    // Unlock the secret achievement for resetting before the full reset
    const achievement = gameState.achievementState.achievements.find(a => a.id === 'reset_achievements');
    if (!achievement?.unlocked) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: { achievementId: 'reset_achievements' } });
    }
    
    // Use a timeout to ensure the achievement unlock is processed before the full reset
    setTimeout(() => {
      // Call the existing reset handler that resets the entire game
      handleResetGame();
      
      // Notify the user
      addNotification('Partie réinitialisée. Un nouveau départ commence...', 'warning', 5000);
      
      // Show welcome modal to let player start fresh
      setShowWelcomeModal(true);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Propagation
        </h1>
        <h2 className="text-xl mb-6 text-center text-gray-300">
          Un Jeu Incrémental de Manipulation Sociale
        </h2>
        {/* About Button */}
        <button
          onClick={handleShowAbout}
          className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          À propos
        </button>

        {/* Save Manager */}
        <SaveManager
          gameState={gameState}
          onLoadState={handleLoadGame}
          onSaveState={handleSaveGame}
          onResetGame={handleResetGame}
        />
            
        {/* Notification System */}
        <NotificationSystem 
          notifications={notifications}
          onDismiss={dismissNotification}
        />

        {/* Game Header - NEW! */}
        {gameState.playerName && (
          <>
            <Header 
              playerName={gameState.playerName}
              entityName={gameState.entityName}
              entityType={gameState.entityType}
              currentEra={currentEra}
              resources={gameState.resources}
              ethicalScore={gameState.ethicalScore}
              criticalThinking={gameState.criticalThinking}
              gameMode={gameState.gameMode}
              onStickyChange={(isSticky, height) => setHeaderInfo({ isSticky, height })}
            />
            {/* Placeholder div outside the Header component */}
            {headerInfo.isSticky && (
              <div style={{ height: `${headerInfo.height}px` }} className="transition-all duration-300"></div>
            )}
          </>
        )}
  
        {!isLoading && (
          <>
            {showWelcomeModal && (
              <WelcomeModal onSubmit={handlePlayerNameSubmit} />
            )}

            {!showWelcomeModal && showTutorial && (
              <TutorialModal onClose={handleTutorialClose} />
            )}
          </>
        )}

        {/* Only show other modals after onboarding is completed */}
        {onboardingCompleted && (
          <>
            {/* Game Ending Modal */}
            {gameState.gameEnded && activeEnding && (
              <GameEndingModal
                ending={activeEnding}
                stats={gameState.ethicalStats}
                onAcknowledge={handleAcknowledgeEnding}
              />
            )}

            {/* About Page Modal */}
            {showAbout && (
              <AboutPage onClose={handleCloseAbout} />
            )}

            {/* Scenario Modal - only show if onboarding is complete */}
            {gameState.activeScenarioId && (
              <ScenarioModal
                scenario={gameState.scenarios.find(s => s.id === gameState.activeScenarioId)!}
                onMakeChoice={handleMakeScenarioChoice}
                onDismiss={handleDismissScenario}
              />
            )}
          </>
        )}
        {/* About Page Modal */}
        {showAbout && (
          <AboutPage onClose={handleCloseAbout} />
        )}

        
        {/* Stats bar */}
        <div className="bg-gray-800 p-3 rounded-lg mb-4 grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Score Éthique</p>
              <p className={`text-sm font-semibold ${
                gameState.ethicalScore >= 80 ? 'text-green-400' : 
                gameState.ethicalScore >= 50 ? 'text-yellow-400' : 
                gameState.ethicalScore >= 30 ? 'text-orange-400' : 
                'text-red-400'
              }`}>
                {gameState.ethicalScore}/100
              </p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
              <div 
                className={`h-full ${
                  gameState.ethicalScore >= 80 ? 'bg-green-600' : 
                  gameState.ethicalScore >= 50 ? 'bg-yellow-600' : 
                  gameState.ethicalScore >= 30 ? 'bg-orange-600' : 
                  'bg-red-600'
                }`}
                style={{ width: `${gameState.ethicalScore}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Pensée Critique</p>
              <p className="text-sm font-semibold text-blue-400">
                {gameState.criticalThinking}/100
              </p>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-blue-600"
                style={{ width: `${gameState.criticalThinking}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Game mode indicator */}
        <div className={`mb-4 p-2 rounded-lg flex justify-center items-center ${
          gameState.gameMode === 'manipulation' ? 'bg-red-900' : 'bg-green-900'
        }`}>
          <p className="text-sm font-medium">
            Mode: {gameState.gameMode === 'manipulation' ? 'Manipulation' : 'Révélation'}
          </p>
        </div>
        

        {/* Navigation tabs */}
        <div className="flex flex-wrap mb-4 border-b border-gray-700">
          <button
            className={`py-2 px-4 ${activeTab === 'resources' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => handleTabChange('resources')}
          >
            Ressources
          </button>
          
          {isUpgradesUnlocked() && (
            <button
              className={`py-2 px-4 ${activeTab === 'upgrades' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('upgrades')}
            >
              Améliorations
            </button>
          )}
          
          {isProgressionUnlocked() && (
            <button
              className={`py-2 px-4 ${activeTab === 'progression' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('progression')}
            >
              Ères
            </button>
          )}
          
          {hasReachedEra('middleAges') && (
            <button
              className={`py-2 px-4 ${activeTab === 'scenarios' ? 'border-b-2 border-amber-500 text-amber-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('scenarios')}
            >
              Scénarios
            </button>
          )}
          
          {hasReachedEra('industrial') && (
            <button
              className={`py-2 px-4 ${activeTab === 'theories' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('theories')}
            >
              Théories
            </button>
          )}
          
          {hasReachedEra('coldWar') && (
            <button
              className={`py-2 px-4 ${activeTab === 'ethics' ? 'border-b-2 border-green-500 text-green-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('ethics')}
            >
              Éthique
            </button>
          )}
          
          <button
            className={`py-2 px-4 ${activeTab === 'achievements' ? 'border-b-2 border-yellow-500 text-yellow-300' : 'text-gray-400 hover:text-gray-200'}`}
            onClick={() => handleTabChange('achievements')}
          >
            Succès
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'resources' && (
          <>
            {activeTab === 'resources' && (
              <>
                <GameButtons 
                  onManipulate={handleManipulate} 
                  onNetworking={handleNetworking}
                  onCredibility={handleCredibility}
                  onInfluence={handleInfluence}
                  resources={gameState.resources}
                  manipulateButtonId="manipulate-button" 
                />
                <ResourceDisplay resources={gameState.resources} />
                
                {/* Era benefits preview */}
                <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Avantages de l&apos;ère: {currentEra.name}</h3>
                  <p className="text-sm text-gray-300 mb-3">{currentEra.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(currentEra.resourceMultipliers).map(([resource, multiplier]) => (
                      <div key={resource} className="flex justify-between items-center">
                        <span>{resource}:</span>
                        <span className="text-blue-300">
                          x{multiplier}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handleTabChange('progression')}
                    hidden={!isProgressionUnlocked()}
                    className="mt-3 w-full py-1 text-sm bg-purple-800 hover:bg-purple-700 rounded"
                  >
                    Voir toutes les ères
                  </button>
                </div>
              </>
            )}
          </>
        )}
        
        {activeTab === 'progression' && (
          <ProgressionTab
            eras={gameState.eras}
            currentEraId={gameState.currentEraId}
            influence={gameState.resources.influence}
            onUnlockEra={handleUnlockEra}
            onSelectEra={handleSelectEra}
          />
        )}
        
        {activeTab === 'upgrades' && (
          <UpgradesTab
            upgrades={gameState.upgrades}
            resources={gameState.resources}
            currentEraId={gameState.currentEraId}
            onPurchaseUpgrade={handlePurchaseUpgrade}
            dispatch={dispatch}
          />
        )}
        
        {activeTab === 'theories' && (
          <TheoriesTab
            theories={gameState.conspiracyTheories}
            manipulationPoints={gameState.resources.manipulationPoints}
            ethicalScore={gameState.ethicalScore}
            currentEraId={gameState.currentEraId}
            onPropagateTheory={handlePropagateTheory}
          />
        )}
        
        {activeTab === 'ethics' && (
          <EthicsTab
            ethicalScore={gameState.ethicalScore}
            criticalThinking={gameState.criticalThinking}
            ethicalActions={gameState.ethicalActions}
            resources={gameState.resources}
            gameMode={gameState.gameMode}
            currentEraId={gameState.currentEraId}
            educationalContent={gameState.educationalContent}
            quotes={gameState.criticalThinkingQuotes}
            stats={gameState.ethicalStats}
            onPerformEthicalAction={handlePerformEthicalAction}
            onSwitchGameMode={handleSwitchGameMode}
            dispatch={dispatch}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenariosTab
            scenarios={gameState.scenarios}
            completedScenarios={gameState.completedScenarios}
            currentEraId={gameState.currentEraId}
            activeScenarioId={gameState.activeScenarioId}
            onViewScenario={handleViewScenario}
          />
        )}


        {activeTab === 'achievements' && (
          <AchievementsTab
            achievements={gameState.achievementState.achievements}
            totalUnlocked={gameState.achievementState.totalUnlocked}
            onAchievementClick={(achievementId) => dispatch({ type: 'VIEW_ACHIEVEMENT', payload: { achievementId } })}
            onShareAchievement={(achievement) => {
              // Open share dialog (simplified for this example)
              try {
                navigator.share({
                  title: 'Propagation - Accomplissement débloqué !',
                  text: achievement.shareText,
                  url: window.location.href,
                });
              } catch (error) {
                console.log("Can't share via navigator:", error);
                // Fallback for browsers that don't support the Web Share API
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(achievement.shareText)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
              }
              
              // Mark as shared
              dispatch({ type: 'SHARE_ACHIEVEMENT', payload: { achievementId: achievement.id } });
            }}
            onResetAchievements={handleResetAchievements}
          />
        )}

        {/* Feature unlock notifications */}
        {gameState.currentEraId === 'middleAges' && !gameState.featureDiscovered?.scenarios && (
          <div className="fixed bottom-4 left-4 right-4 bg-amber-900 bg-opacity-90 p-4 rounded-lg shadow-lg z-40">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-amber-800 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-amber-300">Nouveauté : Scénarios débloqués !</h3>
                <p className="mt-1 text-sm text-amber-200">
                  Au Moyen Âge, vous pouvez désormais participer à des scénarios historiques. Vos choix façonneront votre influence et votre éthique.
                </p>
                <div className="mt-3">
                  <button 
                    onClick={() => {
                      dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'scenarios' }});
                      handleTabChange('scenarios');
                    }}
                    className="bg-amber-700 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Découvrir les scénarios
                  </button>
                </div>
              </div>
              <button 
                onClick={() => dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'scenarios' }})}
                className="ml-4 flex-shrink-0 text-amber-300 hover:text-amber-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {gameState.currentEraId === 'industrial' && !gameState.featureDiscovered?.theories && (
          <div className="fixed bottom-4 left-4 right-4 bg-purple-900 bg-opacity-90 p-4 rounded-lg shadow-lg z-40">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-800 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-purple-300">Nouveauté : Théories du complot !</h3>
                <p className="mt-1 text-sm text-purple-200">
                  L&lsquo;Ère Industrielle vous permet de propager des théories du complot pour un gain d&lsquo;influence rapide. Vous pouvez maintenant retourner aux ères précédentes pour y appliquer ces nouvelles techniques.
                </p>
                <div className="mt-3 flex space-x-3">
                  <button 
                    onClick={() => {
                      dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'theories' }});
                      handleTabChange('theories');
                    }}
                    className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Découvrir les théories
                  </button>
                  <button 
                    onClick={() => {
                      dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'theories' }});
                      handleSelectEra('antiquity');
                    }}
                    className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    Retour à l&lsquo;Antiquité
                  </button>
                </div>
              </div>
              <button 
                onClick={() => dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'theories' }})}
                className="ml-4 flex-shrink-0 text-purple-300 hover:text-purple-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {gameState.currentEraId === 'coldWar' && !gameState.featureDiscovered?.ethics && (
          <div className="fixed bottom-4 left-4 right-4 bg-green-900 bg-opacity-90 p-4 rounded-lg shadow-lg z-40">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-800 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-green-300">Nouveauté : Système Éthique et Mode Révélation !</h3>
                <p className="mt-1 text-sm text-green-200">
                  La Guerre Froide débloque le mode Révélation, qui vous permet d&lsquo;aider la population à voir à travers la manipulation. Vous pouvez maintenant choisir entre manipuler ou révéler la vérité.
                </p>
                <div className="mt-3 flex space-x-3">
                  <button 
                    onClick={() => {
                      dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'ethics' }});
                      handleTabChange('ethics');
                    }}
                    className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Découvrir l&apos;éthique
                  </button>
                  <button 
                    onClick={() => {
                      dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'ethics' }});
                      handleSelectEra('antiquity');
                      handleSwitchGameMode('revelation');
                    }}
                    className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    Recommencer en Révélation
                  </button>
                </div>
              </div>
              <button 
                onClick={() => dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'ethics' }})}
                className="ml-4 flex-shrink-0 text-green-300 hover:text-green-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {gameState.currentEraId === 'digital' && !gameState.featureDiscovered?.digital && (
          <div className="fixed bottom-4 left-4 right-4 bg-blue-900 bg-opacity-90 p-4 rounded-lg shadow-lg z-40">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-800 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium text-blue-300">Vous avez atteint l&lsquo;Ère Numérique !</h3>
                <p className="mt-1 text-sm text-blue-200">
                  Félicitations ! Vous avez atteint l&lsquo;ère la plus avancée. Continuez à explorer toutes les possibilités du jeu et à débloquer tous les succès.
                  
                  {/* TODO: Add new mechanics for Digital Era. Ideas:
                  1. Viral Campaigns: One-time events that provide massive but temporary boosts to all resources
                  2. Algorithm Manipulation: A new resource that can multiply or sabotage other resources
                  3. Reality Distortion: The ability to change the rules of the game temporarily for strategic advantage
                  */}
                </p>
              </div>
              <button 
                onClick={() => dispatch({ type: 'DISCOVER_FEATURE', payload: { feature: 'digital' }})}
                className="ml-4 flex-shrink-0 text-blue-300 hover:text-blue-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {gameState.achievementState.newUnlocked.length > 0 && (
          <AchievementNotificationManager
            newlyUnlocked={gameState.achievementState.newUnlocked}
            achievements={gameState.achievementState.achievements}
            onDismiss={(achievementId) => dispatch({ 
              type: 'DISMISS_ACHIEVEMENT_NOTIFICATION', 
              payload: { achievementId } 
            })}
          />
        )}

        
        {/* Educational note with link to About page */}
        <div className="mt-8 p-3 bg-gray-800 rounded text-xs text-gray-400">
          <p>
            Ce jeu explore les mécanismes de diffusion de l&apos;information et leurs conséquences. 
            Toute ressemblance avec des techniques réellement utilisées n&apos;est sans doute que pure coïncidence...
            <button 
              onClick={handleShowAbout}
              className="ml-2 text-blue-400 hover:underline"
            >
              En savoir plus
            </button>
          </p>
        </div>
      </div>
      {gameState.activeScenarioId && (
        <ScenarioModal
          scenario={gameState.scenarios.find(s => s.id === gameState.activeScenarioId)!}
          onMakeChoice={handleMakeScenarioChoice}
          onDismiss={handleDismissScenario}
        />
      )}
    </div>
  );
};

export default PropagationGame;