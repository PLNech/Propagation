/**
 * Debug console helper for the Propagation game
 * This object will be exposed in the browser console as __SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
 * 
 * How to implement:
 * Add this code to src/components/game/PropagationGame.tsx inside the component but outside any effect or handler
 * Then add the line to expose it to window at the end of the useEffect(() => {}, []) that runs once on mount
 */

// Create the debug helper with various functions
export const createDebugHelper = (dispatch, getState) => {
    return {
      // Resource manipulation functions
      giveCredibility: (amount = 100) => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              resources: {
                ...state.resources,
                credibility: state.resources.credibility + amount
              }
            }
          }
        });
        console.log(`Added ${amount} credibility`);
      },
      
      giveInfluence: (amount = 100) => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              resources: {
                ...state.resources,
                influence: state.resources.influence + amount
              }
            }
          }
        });
        console.log(`Added ${amount} influence`);
      },
      
      giveNetworks: (amount = 100) => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              resources: {
                ...state.resources,
                networks: state.resources.networks + amount
              }
            }
          }
        });
        console.log(`Added ${amount} networks`);
      },
      
      giveManipulationPoints: (amount = 100) => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              resources: {
                ...state.resources,
                manipulationPoints: state.resources.manipulationPoints + amount
              }
            }
          }
        });
        console.log(`Added ${amount} manipulation points`);
      },
      
      // Give all resources at once
      giveAllResources: (amount = 100) => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              resources: {
                credibility: state.resources.credibility + amount,
                influence: state.resources.influence + amount,
                networks: state.resources.networks + amount,
                manipulationPoints: state.resources.manipulationPoints + amount
              }
            }
          }
        });
        console.log(`Added ${amount} to all resources`);
      },
      
      // Set ethics and critical thinking
      setEthics: (amount = 100) => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              ethicalScore: Math.min(100, Math.max(0, amount))
            }
          }
        });
        console.log(`Set ethics to ${Math.min(100, Math.max(0, amount))}`);
      },
      
      setCriticalThinking: (amount = 100) => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              criticalThinking: Math.min(100, Math.max(0, amount))
            }
          }
        });
        console.log(`Set critical thinking to ${Math.min(100, Math.max(0, amount))}`);
      },
      
      // Game progression helpers
      unlockAllEras: () => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              eras: state.eras.map(era => ({
                ...era,
                unlocked: true
              }))
            }
          }
        });
        console.log("All eras unlocked");
      },
      
      unlockAllUpgrades: () => {
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              upgrades: state.upgrades.map(upgrade => ({
                ...upgrade,
                purchased: true,
                visible: true
              }))
            }
          }
        });
        console.log("All upgrades unlocked and purchased");
      },
      
      // Game mode manipulation
      setGameMode: (mode) => {
        if (mode !== 'manipulation' && mode !== 'revelation') {
          console.error('Invalid mode. Use "manipulation" or "revelation"');
          return;
        }
        
        const state = getState();
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              gameMode: mode
            }
          }
        });
        console.log(`Set game mode to ${mode}`);
      },
      
      // Testing endings
      triggerEnding: (endingId) => {
        const state = getState();
        const ending = state.gameEndings.find(e => e.id === endingId);
        
        if (!ending) {
          console.error(`Ending with ID "${endingId}" not found. Available endings: ${state.gameEndings.map(e => e.id).join(', ')}`);
          return;
        }
        
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              gameEnded: true,
              activeEndingId: endingId
            }
          }
        });
        console.log(`Triggered ending: ${ending.title}`);
      },
      
      // Gaslighting system manipulation
      triggerRandomGaslighting: () => {
        const state = getState();
        const { selectGaslightEffect, applyUIChange } = window.require('./gaslightingService');
        
        const effect = selectGaslightEffect(state, 30);
        if (effect) {
          console.log(`Triggering gaslighting effect: ${effect.id} (${effect.type})`);
          
          if (effect.type === 'ui_change') {
            applyUIChange(effect);
          } else {
            const message = typeof effect.message === 'function' ? effect.message() : effect.message;
            console.log(`Gaslighting message: "${message}"`);
            alert(`[DEBUG GASLIGHTING] ${message}`);
          }
        } else {
          console.log("No gaslighting effect selected");
        }
      },
      
      // Stats and information getters
      getGameState: () => {
        return getState();
      },
      
      getEraProgress: () => {
        const state = getState();
        const unlockedEras = state.eras.filter(era => era.unlocked).length;
        const totalEras = state.eras.length;
        console.log(`Era progress: ${unlockedEras}/${totalEras} (${Math.round(unlockedEras/totalEras*100)}%)`);
        return { unlockedEras, totalEras, percentage: unlockedEras/totalEras };
      },
      
      getUpgradesProgress: () => {
        const state = getState();
        const purchasedUpgrades = state.upgrades.filter(upgrade => upgrade.purchased).length;
        const totalUpgrades = state.upgrades.length;
        console.log(`Upgrades progress: ${purchasedUpgrades}/${totalUpgrades} (${Math.round(purchasedUpgrades/totalUpgrades*100)}%)`);
        return { purchasedUpgrades, totalUpgrades, percentage: purchasedUpgrades/totalUpgrades };
      },
      
      // Utility for testing all endings
      showEndingSummary: () => {
        const state = getState();
        console.table(state.gameEndings.map(ending => ({
          id: ending.id,
          title: ending.title,
          triggered: ending.triggered,
          ethicalReq: ending.condition.ethicalScore,
          criticalReq: ending.condition.criticalThinking,
          influenceReq: ending.condition.influence,
          modeReq: ending.condition.requiredMode || 'any'
        })));
      },
      
      // Manipulation check (a useful debugging helper to see if player is close to meeting ending conditions)
      checkEndingRequirements: () => {
        const state = getState();
        
        console.group("Ending Requirements Check");
        
        state.gameEndings.forEach(ending => {
          const ethicalMet = state.ethicalScore >= ending.condition.ethicalScore;
          const criticalMet = state.criticalThinking >= ending.condition.criticalThinking;
          const influenceMet = state.resources.influence >= ending.condition.influence;
          const modeMet = !ending.condition.requiredMode || state.gameMode === ending.condition.requiredMode;
          
          console.group(`${ending.title} (${ending.id})`);
          console.log(`Ethics: ${state.ethicalScore}/${ending.condition.ethicalScore} [${ethicalMet ? '✓' : '✗'}]`);
          console.log(`Critical Thinking: ${state.criticalThinking}/${ending.condition.criticalThinking} [${criticalMet ? '✓' : '✗'}]`);
          console.log(`Influence: ${state.resources.influence}/${ending.condition.influence} [${influenceMet ? '✓' : '✗'}]`);
          if (ending.condition.requiredMode) {
            console.log(`Mode: ${state.gameMode}/${ending.condition.requiredMode} [${modeMet ? '✓' : '✗'}]`);
          }
          console.log(`All conditions met: ${ethicalMet && criticalMet && influenceMet && modeMet ? '✓' : '✗'}`);
          console.groupEnd();
        });
        
        console.groupEnd();
      },
      
      // Fun extras
      simulateIntenseGaslighting: () => {
        document.body.classList.add('gaslight-vignette');
        document.body.classList.add('gaslight-moire');
        
        const elements = document.querySelectorAll('button, h1, h2, h3, p');
        elements.forEach(el => {
          el.classList.add('gaslight-text-distort');
          
          // Random chance to apply stronger effects to some elements
          if (Math.random() > 0.7) {
            el.classList.add('gaslight-blur');
          }
        });
        
        setTimeout(() => {
          document.body.classList.remove('gaslight-vignette');
          document.body.classList.remove('gaslight-moire');
          elements.forEach(el => {
            el.classList.remove('gaslight-text-distort');
            el.classList.remove('gaslight-blur');
          });
        }, 5000);
        
        console.log("Simulated intense gaslighting effect for 5 seconds");
      },
      
      // Toggle development mode (extra console messages)
      toggleDevMode: () => {
        const state = getState();
        const devMode = !state.devMode; // Toggle current state
        
        dispatch({
          type: 'LOAD_GAME',
          payload: {
            state: {
              ...state,
              devMode: devMode
            }
          }
        });
        
        console.log(`Development mode ${devMode ? 'enabled' : 'disabled'}`);
        return devMode;
      },
      
      // Help function to list all available commands
      help: () => {
        console.group("Propagation Debug Console Helper Commands");
        console.log("Resource Commands:");
        console.log("  giveCredibility(amount = 100)");
        console.log("  giveInfluence(amount = 100)");
        console.log("  giveNetworks(amount = 100)");
        console.log("  giveManipulationPoints(amount = 100)");
        console.log("  giveAllResources(amount = 100)");
        console.log("\nGame State Commands:");
        console.log("  setEthics(amount = 100)");
        console.log("  setCriticalThinking(amount = 100)");
        console.log("  unlockAllEras()");
        console.log("  unlockAllUpgrades()");
        console.log("  setGameMode(mode) - 'manipulation' or 'revelation'");
        console.log("\nEnding Commands:");
        console.log("  triggerEnding(endingId)");
        console.log("  showEndingSummary()");
        console.log("  checkEndingRequirements()");
        console.log("\nGaslighting Commands:");
        console.log("  triggerRandomGaslighting()");
        console.log("  simulateIntenseGaslighting()");
        console.log("\nInformation Commands:");
        console.log("  getGameState()");
        console.log("  getEraProgress()");
        console.log("  getUpgradesProgress()");
        console.log("\nMisc Commands:");
        console.log("  toggleDevMode()");
        console.log("  help()");
        console.groupEnd();
      }
    };
  };
