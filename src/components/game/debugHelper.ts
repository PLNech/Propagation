/**
 * Debug console helper for the Propagation game
 * This object will be exposed in the browser console as __SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
 * 
 * How to implement:
 * Add this code to src/components/game/PropagationGame.tsx inside the component but outside any effect or handler
 * Then add the line to expose it to window at the end of the useEffect(() => {}, []) that runs once on mount
 */

import { GameState, GameAction, HistoricalEra, Upgrade } from '@/types';

export const createDebugHelper = (
  dispatch: React.Dispatch<GameAction>,
  getState: () => GameState
) => {

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
      setGameMode: (mode: string) => {
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
      triggerEnding: (endingId: string) => {
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
        const unlockedEras = state.eras.filter((era: HistoricalEra) => era.unlocked).length;
        const totalEras = state.eras.length;
        console.log(`Era progress: ${unlockedEras}/${totalEras} (${Math.round(unlockedEras/totalEras*100)}%)`);
        return { unlockedEras, totalEras, percentage: unlockedEras/totalEras };
      },
      
      getUpgradesProgress: () => {
        const state = getState();
        const purchasedUpgrades = state.upgrades.filter((upgrade: Upgrade) => upgrade.purchased).length;
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


      // Method to trigger a specific scenario
      triggerScenario: (scenarioId: string) => {
        const state = getState();
        if (!state.scenarios) {
          console.error("Scenarios not initialized in game state");
          return;
        }
        
        const scenario = state.scenarios.find(s => s.id === scenarioId);
        if (!scenario) {
          console.error(`Scenario with ID "${scenarioId}" not found`);
          return;
        }
        
        dispatch({
          type: 'TRIGGER_SCENARIO',
          payload: { scenarioId }
        });
        console.log(`Triggered scenario: ${scenario.title}`);
      },

      // Method to list all available scenarios
      listScenarios: () => {
        const state = getState();
        if (!state.scenarios) {
          console.error("Scenarios not initialized in game state");
          return;
        }
        
        console.group("Available Scenarios");
        state.scenarios.forEach(s => {
          const status = s.completed ? "Completed" :
                        state.completedScenarios.includes(s.id) ? "Completed" :
                        state.activeScenarioId === s.id ? "Active" : "Available";
          
          console.log(`${s.id}: ${s.title} [${status}] (Era: ${s.eraId})`);
        });
        console.groupEnd();
        
        return state.scenarios;
      },

      // Method to check scenarios related to the current era
      currentEraScenarios: () => {
        const state = getState();
        if (!state.scenarios) {
          console.error("Scenarios not initialized in game state");
          return;
        }
        
        const currentEra = state.currentEraId;
        const eraScenarios = state.scenarios.filter(s => s.eraId === currentEra);
        
        console.group(`Scenarios for ${currentEra}`);
        eraScenarios.forEach(s => {
          const status = s.completed ? "Completed" :
                        state.completedScenarios.includes(s.id) ? "Completed" :
                        state.activeScenarioId === s.id ? "Active" : "Available";
          
          console.log(`${s.id}: ${s.title} [${status}]`);
        });
        console.groupEnd();
        
        return eraScenarios;
      },
          
          // Toggle debug overlay GUI
      toggleDebugOverlay: () => {
        // Check if overlay already exists
        let overlay = document.getElementById('debug-overlay');
        
        if (overlay) {
          // Toggle visibility if it exists
          if (overlay.style.display === 'none') {
            overlay.style.display = 'block';
            console.log("Debug overlay enabled");
          } else {
            overlay.style.display = 'none';
            console.log("Debug overlay disabled");
          }
          return;
        }
        
        // Create the overlay if it doesn't exist
        overlay = document.createElement('div');
        overlay.id = 'debug-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.85);
          color: #00ff00;
          z-index: 10000;
          padding: 20px;
          overflow-y: auto;
          font-family: monospace;
          display: flex;
          flex-direction: column;
        `;
        
        // Create header with close button
        const header = document.createElement('div');
        header.style.cssText = `
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        `;
        
        const title = document.createElement('h2');
        title.textContent = '🛠️ Propagation Debug Console';
        title.style.color = '#00ff00';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.cssText = `
          background-color: #ff0000;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-weight: bold;
        `;
        closeButton.onclick = () => {
          overlay.style.display = 'none';
        };
        
        header.appendChild(title);
        header.appendChild(closeButton);
        overlay.appendChild(header);
        
        // Create content container
        const contentContainer = document.createElement('div');
        contentContainer.style.cssText = `
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        `;
        
        // Resources Section
        const resourcesCard = createSectionCard('Resources');
        
        // Resource inputs
        ['Credibility', 'Influence', 'Networks', 'ManipulationPoints'].forEach(resource => {
          const resourceInput = createNumberInput(resource, 100);
          const giveButton = createActionButton(`Give ${resource}`, () => {
            const amount = parseInt(resourceInput.value, 10) || 100;
            (window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as any)[`give${resource}`](amount);
            updateStateDisplay();
          });
          
          const container = document.createElement('div');
          container.style.cssText = 'display: flex; margin-bottom: 10px;';
          container.appendChild(resourceInput);
          container.appendChild(giveButton);
          resourcesCard.appendChild(container);
        });
        
        const giveAllContainer = document.createElement('div');
        const giveAllInput = createNumberInput('giveAllAmount', 100);
        const giveAllButton = createActionButton('Give All Resources', () => {
          const amount = parseInt(giveAllInput.value, 10) || 100;
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.giveAllResources(amount);
          updateStateDisplay();
        });
        giveAllContainer.style.cssText = 'display: flex; margin-bottom: 10px;';
        giveAllContainer.appendChild(giveAllInput);
        giveAllContainer.appendChild(giveAllButton);
        resourcesCard.appendChild(giveAllContainer);
        
        // Game State Section
        const stateCard = createSectionCard('Game State');
        
        // Ethics & Critical Thinking
        ['Ethics', 'CriticalThinking'].forEach(stat => {
          const statInput = createNumberInput(stat, 50);
          const setButton = createActionButton(`Set ${stat}`, () => {
            const value = parseInt(statInput.value, 10) || 50;
            (window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as any)[`set${stat}`](value);
            updateStateDisplay();
          });
          
          const container = document.createElement('div');
          container.style.cssText = 'display: flex; margin-bottom: 10px;';
          container.appendChild(statInput);
          container.appendChild(setButton);
          stateCard.appendChild(container);
        });
        
        // Game Mode
        const modeSelect = document.createElement('select');
        modeSelect.style.cssText = `
          background-color: #222;
          color: white;
          border: 1px solid #00ff00;
          padding: 5px;
          margin-right: 5px;
          flex-grow: 1;
        `;
        
        ['manipulation', 'revelation'].forEach(mode => {
          const option = document.createElement('option');
          option.value = mode;
          option.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
          modeSelect.appendChild(option);
        });
        
        const setModeButton = createActionButton('Set Game Mode', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setGameMode(modeSelect.value);
          updateStateDisplay();
        });
        
        const modeContainer = document.createElement('div');
        modeContainer.style.cssText = 'display: flex; margin-bottom: 10px;';
        modeContainer.appendChild(modeSelect);
        modeContainer.appendChild(setModeButton);
        stateCard.appendChild(modeContainer);
        
        // Progression Section
        const progressionCard = createSectionCard('Progression');
        
        const unlockAllErasButton = createActionButton('Unlock All Eras', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.unlockAllEras();
          updateStateDisplay();
        });
        progressionCard.appendChild(unlockAllErasButton);
        
        const unlockAllUpgradesButton = createActionButton('Unlock All Upgrades', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.unlockAllUpgrades();
          updateStateDisplay();
        });
        progressionCard.appendChild(unlockAllUpgradesButton);
        
        // Endings Section
        const endingsCard = createSectionCard('Endings');
        
        const endingSelect = document.createElement('select');
        endingSelect.style.cssText = `
          background-color: #222;
          color: white;
          border: 1px solid #00ff00;
          padding: 5px;
          margin-right: 5px;
          flex-grow: 1;
          margin-bottom: 10px;
        `;
        
        // Populate with endings when state changes
        const populateEndingSelect = () => {
          endingSelect.innerHTML = '';
          const state = getState();
          state.gameEndings.forEach(ending => {
            const option = document.createElement('option');
            option.value = ending.id;
            option.textContent = ending.title;
            endingSelect.appendChild(option);
          });
        };
        
        const triggerEndingButton = createActionButton('Trigger Ending', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.triggerEnding(endingSelect.value);
        });
        
        const endingContainer = document.createElement('div');
        endingContainer.style.cssText = 'display: flex; margin-bottom: 10px;';
        endingContainer.appendChild(endingSelect);
        endingContainer.appendChild(triggerEndingButton);
        endingsCard.appendChild(endingContainer);
        
        const checkEndingsButton = createActionButton('Check Ending Requirements', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.checkEndingRequirements();
        });
        endingsCard.appendChild(checkEndingsButton);
        
        // Gaslighting Section
        const gaslightingCard = createSectionCard('Gaslighting');
        
        const triggerGaslightButton = createActionButton('Trigger Random Gaslighting', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.triggerRandomGaslighting();
        });
        gaslightingCard.appendChild(triggerGaslightButton);
        
        const simulateIntenseButton = createActionButton('Simulate Intense Gaslighting', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.simulateIntenseGaslighting();
        });
        gaslightingCard.appendChild(simulateIntenseButton);
        
        // Scenarios Section
        const scenariosCard = createSectionCard('Scenarios');
        
        const scenarioSelect = document.createElement('select');
        scenarioSelect.style.cssText = `
          background-color: #222;
          color: white;
          border: 1px solid #00ff00;
          padding: 5px;
          margin-right: 5px;
          flex-grow: 1;
        `;
        
        // Populate with scenarios when state changes
        const populateScenarioSelect = () => {
          scenarioSelect.innerHTML = '';
          const state = getState();
          if (state.scenarios) {
            state.scenarios.forEach(scenario => {
              const option = document.createElement('option');
              option.value = scenario.id;
              option.textContent = scenario.title;
              scenarioSelect.appendChild(option);
            });
          }
        };
        
        const triggerScenarioButton = createActionButton('Trigger Scenario', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.triggerScenario(scenarioSelect.value);
        });
        
        const scenarioContainer = document.createElement('div');
        scenarioContainer.style.cssText = 'display: flex; margin-bottom: 10px;';
        scenarioContainer.appendChild(scenarioSelect);
        scenarioContainer.appendChild(triggerScenarioButton);
        scenariosCard.appendChild(scenarioContainer);
        
        const listScenariosButton = createActionButton('List All Scenarios', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.listScenarios();
        });
        scenariosCard.appendChild(listScenariosButton);
        
        const currentEraScenariosButton = createActionButton('Current Era Scenarios', () => {
          window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.currentEraScenarios();
        });
        scenariosCard.appendChild(currentEraScenariosButton);
        
        // Add all sections to the content container
        contentContainer.appendChild(resourcesCard);
        contentContainer.appendChild(stateCard);
        contentContainer.appendChild(progressionCard);
        contentContainer.appendChild(endingsCard);
        contentContainer.appendChild(gaslightingCard);
        contentContainer.appendChild(scenariosCard);
        
        overlay.appendChild(contentContainer);
        
        // State Display Area
        const stateDisplayContainer = document.createElement('div');
        stateDisplayContainer.style.cssText = `
          background-color: #111;
          border: 1px solid #00ff00;
          padding: 10px;
          margin-top: 10px;
          height: 200px;
          overflow-y: auto;
          font-family: monospace;
          font-size: 12px;
        `;
        stateDisplayContainer.id = 'debug-state-display';
        
        overlay.appendChild(stateDisplayContainer);
        
        // Footer with info
        const footer = document.createElement('div');
        footer.style.cssText = `
          margin-top: 20px;
          font-size: 11px;
          color: #999;
          text-align: center;
        `;
        footer.innerHTML = `All changes are applied immediately. For more complex operations, use the console directly with 
        <span id="secret-name-trigger" style="color: #00aa00; cursor: pointer; border-bottom: 1px dotted #00aa00; position: relative;">
        <code>window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED</code></span>
        `;
        const secretNameTrigger = document.getElementById('secret-name-trigger');
                
        if (secretNameTrigger) {
          // Create the tooltip element but don't add it to DOM yet
          const tooltip = document.createElement('div');
          tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 300px;
            background-color: #111;
            border: 1px solid #00aa00;
            padding: 10px;
            font-size: 11px;
            color: #aaa;
            text-align: left;
            z-index: 10001;
            display: none;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
          `;
          tooltip.innerHTML = `
            <strong style="color: #00aa00;">INTERNAL MEMO:</strong><br>
            ATTENTION: Employees accessing this interface must adhere to Protocol 34-B.<br><br>
            USE OF FORBIDDEN DOM MANIPULATIONS WILL RESULT IN IMMEDIATE TERMINATION WITHOUT SEVERANCE BENEFITS AS PER SECTION 12.5 OF YOUR EMPLOYMENT CONTRACT.<br><br>
            <small>See <a href="https://github.com/facebook/react/issues/7092" style="color: #00aaff;" target="_blank">Documentation 7092</a> for compliance guidelines.<br>
            <a href="https://www.reddit.com/r/ProgrammerHumor/comments/3nhk5e/secret_dom_do_not_use_or_you_will_be_fired/" style="color: #00aaff;" target="_blank">Risk Assessment Form 3NH-K5E</a> must be filed before accessing.</small>
          `;
          
          // Add the tooltip to the trigger element
          secretNameTrigger.appendChild(tooltip);
          
          // Show on hover for desktop
          secretNameTrigger.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
          });
          
          secretNameTrigger.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
          });
          
          // Toggle on click for mobile
          secretNameTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (tooltip.style.display === 'none') {
              tooltip.style.display = 'block';
            } else {
              tooltip.style.display = 'none';
            }
          });
          
          // Hide tooltip when clicking elsewhere
          document.addEventListener('click', () => {
            tooltip.style.display = 'none';
          });
        }
        overlay.appendChild(footer);
        
        document.body.appendChild(overlay);
        
        // Update state display and selections
        updateStateDisplay();
        populateEndingSelect();
        populateScenarioSelect();
        
        console.log("Debug overlay enabled");
        return true;
        
        // Helper function to create section cards
        function createSectionCard(title: string) {
          const card = document.createElement('div');
          card.style.cssText = `
            background-color: #222;
            border: 1px solid #00ff00;
            border-radius: 5px;
            padding: 10px;
          `;
          
          const cardTitle = document.createElement('h3');
          cardTitle.textContent = title;
          cardTitle.style.cssText = `
            margin-top: 0;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #00ff00;
            color: #00ff00;
          `;
          
          card.appendChild(cardTitle);
          return card;
        }
        
        // Helper function to create number inputs
        function createNumberInput(name: string, defaultValue: number) {
          const input = document.createElement('input');
          input.type = 'number';
          input.value = defaultValue.toString();
          input.style.cssText = `
            background-color: #222;
            color: white;
            border: 1px solid #00ff00;
            padding: 5px;
            margin-right: 5px;
            flex-grow: 1;
          `;
          input.id = `debug-input-${name.toLowerCase()}`;
          return input;
        }
        
        // Helper function to create action buttons
        function createActionButton(label: string, onClick: () => void) {
          const button = document.createElement('button');
          button.textContent = label;
          button.style.cssText = `
            background-color: #005500;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            transition: background-color 0.2s;
          `;
          button.onmouseover = () => {
            button.style.backgroundColor = '#008800';
          };
          button.onmouseout = () => {
            button.style.backgroundColor = '#005500';
          };
          button.onclick = onClick;
          return button;
        }
        
        // Function to update state display
        function updateStateDisplay() {
          const stateDisplay = document.getElementById('debug-state-display');
          if (!stateDisplay) return;
          
          const state = getState();
          
          const resources = state.resources;
          const ethicalScore = state.ethicalScore;
          const criticalThinking = state.criticalThinking;
          const currentEra = state.eras.find(era => era.id === state.currentEraId);
          const unlockedEras = state.eras.filter(era => era.unlocked).length;
          const purchasedUpgrades = state.upgrades.filter(upgrade => upgrade.purchased).length;
          
          stateDisplay.innerHTML = `
            <div style="color: #00ff00; margin-bottom: 5px;">Current State Summary:</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px;">
              <div><strong>Resources:</strong></div>
              <div>Cr: ${resources.credibility} | In: ${resources.influence} | Net: ${resources.networks} | MP: ${resources.manipulationPoints}</div>
              
              <div><strong>Ethical Score:</strong></div>
              <div>${ethicalScore}/100</div>
              
              <div><strong>Critical Thinking:</strong></div>
              <div>${criticalThinking}/100</div>
              
              <div><strong>Current Era:</strong></div>
              <div>${currentEra?.name || 'None'}</div>
              
              <div><strong>Game Mode:</strong></div>
              <div>${state.gameMode}</div>
              
              <div><strong>Eras Unlocked:</strong></div>
              <div>${unlockedEras}/${state.eras.length}</div>
              
              <div><strong>Upgrades Purchased:</strong></div>
              <div>${purchasedUpgrades}/${state.upgrades.length}</div>
              
              <div><strong>Active Scenario:</strong></div>
              <div>${state.activeScenarioId || 'None'}</div>
              
              <div><strong>Game Ended:</strong></div>
              <div>${state.gameEnded ? `Yes (${state.activeEndingId})` : 'No'}</div>
            </div>
          `;
          
          // Update selections
          populateEndingSelect();
          populateScenarioSelect();
        }
      },
      
      // TODO: GUI DEVMODE LEVERAGING DEBUGHELPER
      // // Toggle development mode (extra console messages)
      // toggleDevMode: () => {
      //   const state = getState();
      //   const devMode = !state.devMode; // Toggle current state
        
      //   dispatch({
      //     type: 'LOAD_GAME',
      //     payload: {
      //       state: {
      //         ...state,
      //         devMode: devMode
      //       }
      //     }
      //   });
        
      //   console.log(`Development mode ${devMode ? 'enabled' : 'disabled'}`);
      //   return devMode;
      // },
      
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
