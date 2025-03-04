  import React, { useReducer, useEffect, useState, useRef, useCallback } from 'react';
  import { gameReducer, initialGameState } from './gameReducer';
  import ResourceDisplay from './ResourceDisplay';
  import GameButtons from './GameButtons';
  import ProgressionTab from './ProgressionTab';
  import UpgradesTab from './UpgradesTab';
  import TheoriesTab from './TheoriesTab';
  import EthicsTab from './EthicsTab';
  import GameEndingModal from './GameEndingModal';
  import SaveManager from './SaveManager';
  import NotificationSystem, { useNotifications, NotificationType } from './NotificationSystem';
  import { HistoricalEra, GameMode, GameState } from '@/types';
  import { 
    selectGaslightEffect, 
    shouldTriggerGaslight, 
    applyUIChange,
    initializeGaslightingStyles,
    GaslightEffect
  } from './gaslightingService';
  import { 
    setupAutoSave, 
    saveGame, 
    loadGame, 
    hasSaveGame
  } from './saveService';
import TutorialModal from './TutorialModal';

  // Tab types
  type TabType = 'resources' | 'progression' | 'upgrades' | 'theories' | 'ethics';

  /**
   * Main game component with all systems including enhanced gaslighting and save/load
   */
  const PropagationGame = () => {
    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
    const [activeTab, setActiveTab] = useState<TabType>('resources');
    const { notifications, addNotification, dismissNotification } = useNotifications();
    const [showTutorial, setShowTutorial] = useState(true);
    const [theoryPropagationStatus, setTheoryPropagationStatus] = useState<Record<string, 'success' | 'failed' | null>>({});
    const lastTabChangeTime = useRef(Date.now());
    
    // Tracking des interactions pour les effets de gaslighting
    const interactionCount = useRef(0);
    const lastGaslightTime = useRef(0);
    const lastSaveTime = useRef(0);
    const hasLoadedSave = useRef(false);
    
    // Référence à l'état du jeu pour les sauvegardes
    const gameStateRef = useRef(gameState);
    
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

    // Initialiser les styles de gaslighting
    useEffect(() => {
      initializeGaslightingStyles();
    }, []);
    
    // Vérifier s'il y a une sauvegarde à charger
    useEffect(() => {
      const loadSavedGame = async () => {
        if (hasLoadedSave.current) {
          setShowTutorial(false);
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
          }
        }
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
    
    // Handle the manipulate button click
    const handleManipulate = () => {
      dispatch({ type: 'MANIPULATE' });
      interactionCount.current += 1;
      
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
    // const timeDiff = now - lastTabChangeTime.current; TODO: Was unused, use or remove?
      lastTabChangeTime.current = now;
    };
    
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
          
          {/* Save Manager */}
          <SaveManager
            gameState={gameState}
            onLoadState={handleLoadGame}
            onSaveState={handleSaveGame}
            onResetGame={handleResetGame}
          />
          
          {/* Game Ending Modal */}
          {gameState.gameEnded && activeEnding && (
            <GameEndingModal
              ending={activeEnding}
              stats={gameState.ethicalStats}
              onAcknowledge={handleAcknowledgeEnding}
            />
          )}
          
          {/* Notification System */}
          <NotificationSystem 
            notifications={notifications}
            onDismiss={dismissNotification}
          />
                    
          {showTutorial && (
            <TutorialModal onClose={() => setShowTutorial(false)} />
          )}
          {/* Current era display */}
          <div className="bg-gray-800 p-3 rounded-lg mb-4 text-center">
            <p className="text-sm text-gray-400">Ère actuelle</p>
            <p className="text-lg font-semibold">{currentEra.name}</p>
          </div>
          
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
            <button
              className={`py-2 px-4 ${activeTab === 'progression' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('progression')}
            >
              Progression
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'upgrades' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('upgrades')}
            >
              Améliorations
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'theories' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('theories')}
            >
              Théories
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'ethics' ? 'border-b-2 border-green-500 text-green-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => handleTabChange('ethics')}
            >
              Éthique
            </button>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'resources' && (
            <>
              {activeTab === 'resources' && (
                <>
                  <ResourceDisplay resources={gameState.resources} />
                  <GameButtons 
                    onManipulate={handleManipulate} 
                    onNetworking={handleNetworking}
                    onCredibility={handleCredibility}
                    onInfluence={handleInfluence}
                    resources={gameState.resources}
                    manipulateButtonId="manipulate-button" 
                  />
                  
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
                      className="mt-3 w-full py-1 text-sm bg-purple-800 hover:bg-purple-700 rounded"
                    >
                      Voir toutes les ères
                    </button>
                  </div>
                </>
              )}
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
                  className="mt-3 w-full py-1 text-sm bg-purple-800 hover:bg-purple-700 rounded"
                >
                  Voir toutes les ères
                </button>
              </div>
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
            />
          )}
          
          {/* Educational note subtler and more ironic */}
          <div className="mt-8 p-3 bg-gray-800 rounded text-xs text-gray-400">
            <p>
              Ce jeu explore les mécanismes de diffusion de l&apos;information et leurs conséquences. 
              Toute ressemblance avec des techniques réellement utilisées n&apos;est sans doute que pure coïncidence...
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default PropagationGame;