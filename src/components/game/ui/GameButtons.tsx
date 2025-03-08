import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { GameResources } from '@/types';

interface GameButtonsProps {
  onManipulate: () => void;
  onNetworking: () => void;
  onCredibility: () => void;
  onInfluence: () => void;
  resources: GameResources;
  manipulateButtonId?: string;
  currentEra?: string;
  isGaslightActive?: boolean;
}

/**
 * Concentric circles game buttons representing the propagation of influence
 * with a clean right-side legend showing details
 */
const GameButtons: React.FC<GameButtonsProps> = ({
  onManipulate,
  onNetworking,
  onCredibility,
  onInfluence,
  resources,
  manipulateButtonId = 'manipulate-button',
  currentEra = 'ancient',
  isGaslightActive = false
}) => {
  // Track if features are unlocked based on manipulation points thresholds
  const isNetworkingUnlocked = resources.manipulationPoints >= 100 || resources.networks > 0;
  const isCredibilityUnlocked = resources.manipulationPoints >= 200 || resources.credibility > 0;
  const isInfluenceUnlocked = resources.manipulationPoints >= 400 || resources.influence > 0;

  // Button press tracking state
  const [pressedButtons, setPressedButtons] = useState<Record<string, boolean>>({
    manipulate: false,
    credibility: false,
    networking: false,
    influence: false
  });

  // Ripple effect state
  const [rippleEffects, setRippleEffects] = useState<Record<string, boolean>>({
    manipulate: false,
    credibility: false,
    networking: false,
    influence: false
  });

  // Hover state for tooltips
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // References for the button press intervals
  const buttonIntervals = useRef<Record<string, NodeJS.Timeout | null>>({
    manipulate: null,
    credibility: null,
    networking: null,
    influence: null
  });

  const buttonTypes = useMemo(() => ['manipulate', 'credibility', 'networking', 'influence'], []);
  
  // Button info with keyboard shortcuts, costs, and witty descriptions
  const buttonInfo = useMemo(() => ({
    manipulate: {
      key: "q",
      cost: 0,
      label: "Manipuler",
      icon: "🧠",
      unit: "MP",
      order: 1,
      color: "#dc2626", // Red
      descriptions: {
        ancient: "Tisser des mythes",
        medieval: "Répandre des rumeurs",
        industrial: "Fabriquer des faits",
        modern: "Déformer la réalité",
        digital: "Viraliser des mensonges"
      }
    },
    credibility: {
      key: "w",
      cost: 3,
      label: "Crédibilité",
      icon: "🛡️",
      unit: "CP",
      order: 2,
      color: "#2563eb", // Blue
      descriptions: {
        ancient: "Inventer des prophéties",
        medieval: "Imiter l'autorité",
        industrial: "Falsifier des sources",
        modern: "Établir des façades",
        digital: "Fabriquer des preuves"
      }
    },
    networking: {
      key: "e",
      cost: 2,
      label: "Réseautage",
      icon: "🌐",
      unit: "NP",
      order: 3,
      color: "#16a34a", // Green
      descriptions: {
        ancient: "Attirer des disciples",
        medieval: "Rassembler une cour",
        industrial: "Forger des alliances",
        modern: "Construire des contacts",
        digital: "Exploiter les algorithmes"
      }
    },
    influence: {
      key: "r",
      cost: 5,
      label: "Influence",
      icon: "✨",
      unit: "IP",
      order: 4,
      color: "#7e22ce", // Deep purple
      descriptions: {
        ancient: "Forcer l'opinion",
        medieval: "Manipuler le pouvoir",
        industrial: "Contrôler les médias",
        modern: "Façonner la perception",
        digital: "Hacker l'attention"
      }
    }
  }), []);
 
  // Button action mapping
  const buttonActions = useMemo(() => ({
    manipulate: onManipulate,
    credibility: onCredibility,
    networking: onNetworking,
    influence: onInfluence
  }), [onManipulate, onCredibility, onNetworking, onInfluence]);

  // Affordability and unlock checks
  const canAfford = useMemo(() => {
    // Check if player can afford each action
    const canAffordNetworking = resources.manipulationPoints >= 2 && isNetworkingUnlocked;
    const canAffordCredibility = resources.manipulationPoints >= 3 && isCredibilityUnlocked;
    const canAffordInfluence = resources.manipulationPoints >= 5 && isInfluenceUnlocked;

    return {
      manipulate: true,
      credibility: canAffordCredibility,
      networking: canAffordNetworking,
      influence: canAffordInfluence
    };
  }, [resources.manipulationPoints, isNetworkingUnlocked, isCredibilityUnlocked, isInfluenceUnlocked]);

  // Unlock status
  const isUnlocked = useMemo(() => ({
    manipulate: true,
    credibility: isCredibilityUnlocked,
    networking: isNetworkingUnlocked,
    influence: isInfluenceUnlocked
  }), [isCredibilityUnlocked, isNetworkingUnlocked, isInfluenceUnlocked]);

  // Trigger ripple effect and propagate to next level
  const triggerRippleEffect = useCallback((buttonType: string) => {
    const order = buttonInfo[buttonType as keyof typeof buttonInfo].order;
    
    // Reset all ripples first
    setRippleEffects({
      manipulate: false,
      credibility: false,
      networking: false,
      influence: false
    });
    
    // Activate ripple for the current button
    setRippleEffects(prev => ({ ...prev, [buttonType]: true }));
    
    // Find the next button in order to propagate the effect
    const nextButtonTypes = Object.keys(buttonInfo) as Array<keyof typeof buttonInfo>;
    const nextButton = nextButtonTypes.find(type => 
      buttonInfo[type].order === order + 1 && isUnlocked[type as keyof typeof isUnlocked]
    );
    
    // If there's a next button, trigger its ripple after a delay
    if (nextButton) {
      setTimeout(() => {
        setRippleEffects(prev => ({ ...prev, [nextButton]: true }));
      }, 150);
    }
    
    // Clear all ripples after animation completes
    setTimeout(() => {
      setRippleEffects({
        manipulate: false,
        credibility: false,
        networking: false,
        influence: false
      });
    }, 600);
  }, [buttonInfo, isUnlocked]);
  
  // End button press and clear interval
  const endButtonPress = useCallback((buttonType: string) => {
    setPressedButtons(prev => ({ ...prev, [buttonType]: false }));
    
    if (buttonIntervals.current[buttonType]) {
      clearInterval(buttonIntervals.current[buttonType] as NodeJS.Timeout);
      buttonIntervals.current[buttonType] = null;
    }
  }, []);

  
  // Start button press and set interval for repeated actions
  const startButtonPress = useCallback((buttonType: string) => {
    // Only proceed if the action is affordable
    if (!canAfford[buttonType as keyof typeof canAfford]) return;
    
    // Set the button as pressed
    setPressedButtons(prev => ({ ...prev, [buttonType]: true }));
    
    // Trigger ripple effect
    triggerRippleEffect(buttonType);
    
    // Execute action immediately
    buttonActions[buttonType as keyof typeof buttonActions]();
    
    // Set interval for continued presses while holding
    if (!buttonIntervals.current[buttonType]) {
      buttonIntervals.current[buttonType] = setInterval(() => {
        // Check affordability again since resources may have changed
        if (buttonType === 'manipulate' || 
            (buttonType === 'credibility' && resources.manipulationPoints >= 3) ||
            (buttonType === 'networking' && resources.manipulationPoints >= 2) ||
            (buttonType === 'influence' && resources.manipulationPoints >= 5)) {
          buttonActions[buttonType as keyof typeof buttonActions]();
        } else {
          // Stop the interval if no longer affordable
          endButtonPress(buttonType);
        }
      }, 250); // Repeat every 250ms while holding
    }
  }, [canAfford, resources.manipulationPoints, buttonActions, triggerRippleEffect, endButtonPress]);
 
  // Keyboard event handling
  useEffect(() => {
    // Store the current ref in a variable to use in cleanup
    const currentButtonIntervals = buttonIntervals.current;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent handling if in an input field
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      const key = e.key.toLowerCase();
      
      // Map keys to button types
      const keyToButton: Record<string, string> = {
        'q': 'manipulate',
        'w': 'credibility',
        'e': 'networking',
        'r': 'influence'
      };
      
      const buttonType = keyToButton[key];
      if (buttonType && !currentButtonIntervals[buttonType] && canAfford[buttonType as keyof typeof canAfford]) {
        startButtonPress(buttonType);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      const keyToButton: Record<string, string> = {
        'q': 'manipulate',
        'w': 'credibility',
        'e': 'networking',
        'r': 'influence'
      };
      
      const buttonType = keyToButton[key];
      if (buttonType) {
        endButtonPress(buttonType);
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      // Clear all intervals using the closure variable
      Object.keys(currentButtonIntervals).forEach(buttonType => {
        if (currentButtonIntervals[buttonType]) {
          clearInterval(currentButtonIntervals[buttonType] as NodeJS.Timeout);
          currentButtonIntervals[buttonType] = null;
        }
      });
    };
  }, [resources.manipulationPoints, canAfford, startButtonPress, endButtonPress]); // Added missing dependencies

  // Handle gaslighting effects on button text
  const getGaslightedLabel = (buttonType: string, originalLabel: string) => {
    if (isGaslightActive && Math.random() > 0.85) {
      // Occasionally swap labels or show misleading text
      const gaslightLabels: Record<string, string> = {
        "manipulate": "Révéler",
        "networking": "Isoler",
        "credibility": "Mentir",
        "influence": "Soumettre"
      };
      return gaslightLabels[buttonType] || originalLabel;
    }
    return originalLabel;
  };

  // Get witty description for the current era
  const getDescription = (buttonType: string) => {
    const validEra = ['ancient', 'medieval', 'industrial', 'modern', 'digital'].includes(currentEra) 
      ? currentEra 
      : 'ancient';
      
    return buttonInfo[buttonType as keyof typeof buttonInfo]?.descriptions[validEra as keyof typeof buttonInfo.manipulate.descriptions] || '';
  };

  // Get class for locked state
  const getLockedClass = (buttonType: string) => {
    if (!isUnlocked[buttonType as keyof typeof isUnlocked]) {
      return "opacity-30 filter grayscale cursor-not-allowed";
    }
    return "";
  };

  // Get class for disabled (but unlocked) button
  const getDisabledClass = (buttonType: string) => {
    if (isUnlocked[buttonType as keyof typeof isUnlocked] && !canAfford[buttonType as keyof typeof canAfford]) {
      return "opacity-60 cursor-not-allowed";
    }
    return "";
  };

  // Get class for pressed state
  const getPressedClass = (buttonType: string) => {
    return pressedButtons[buttonType] && canAfford[buttonType as keyof typeof canAfford] 
      ? "transform scale-95 brightness-90" 
      : "";
  };

  // Get ripple effect class
  const getRippleClass = (buttonType: string) => {
    return rippleEffects[buttonType] 
      ? "after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-br after:opacity-60 after:game-ripple after:z-10" 
      : "";
  };

  // Get button size based on its order
  const getButtonSize = (order: number) => {
    switch (order) {
      case 1: return "w-[15%] h-[15%]"; // Manipulate - smallest
      case 2: return "w-[46%] h-[46%]"; // Credibility - second
      case 3: return "w-[75%] h-[75%]"; // Networking - third
      case 4: return "w-full h-full";   // Influence - largest
      default: return "w-[15%] h-[15%]";
    }
  };

  // Get button position
  const getButtonPosition = () => {
    return "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2";
  };

  type ButtonHandler = {
    onClick: () => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };

  // Create a map of handlers for each button type at the component top level
  const buttonHandlersMap = useMemo(() => {
    const handlersMap: Record<string, ButtonHandler> = {};
    
    buttonTypes.forEach((buttonType) => {
      const isActionAvailable = canAfford[buttonType as keyof typeof canAfford];
      
      handlersMap[buttonType] = {
        onClick: () => isActionAvailable && startButtonPress(buttonType),
        onMouseDown: () => isActionAvailable && startButtonPress(buttonType),
        onMouseUp: () => endButtonPress(buttonType),
        onMouseEnter: () => setHoveredButton(buttonType),
        onMouseLeave: () => {
          setHoveredButton(null);
          if (pressedButtons[buttonType]) endButtonPress(buttonType);
        },
        onTouchStart: (e: React.TouchEvent) => {
          if (isActionAvailable) {
            e.preventDefault();
            setHoveredButton(buttonType);
            startButtonPress(buttonType);
          }
        },
        onTouchEnd: () => {
          setTimeout(() => setHoveredButton(null), 500);
          endButtonPress(buttonType);
        }
      };
    });
    
    return handlersMap;
  }, [canAfford, startButtonPress, endButtonPress, setHoveredButton, pressedButtons, buttonTypes]);
  

  // Find next button in the propagation sequence
  const getNextButtonInSequence = (currentType: string): string | null => {
    const currentOrder = buttonInfo[currentType as keyof typeof buttonInfo].order;
    const nextOrder = currentOrder + 1;
    
    const nextButton = Object.keys(buttonInfo).find(type => 
      buttonInfo[type as keyof typeof buttonInfo].order === nextOrder && 
      isUnlocked[type as keyof typeof isUnlocked]
    );
    
    return nextButton || null;
  };

  // Render minimal content for the buttons
  const renderButtonContent = (buttonType: string) => {
    const info = buttonInfo[buttonType as keyof typeof buttonInfo];
    const isLocked = !isUnlocked[buttonType as keyof typeof isUnlocked];
    
    if (isLocked) {
      return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full flex flex-col items-center">
          <span className="text-2xl">🔒</span>
          <span className="text-white text-xs font-bold">{buttonType === 'networking' ? '100' : buttonType === 'credibility' ? '200' : '400'} MP</span>
        </div>
      );
    }

    // Position content based on the button's order - all vertically aligned, center to top
    switch (info.order) {
      case 1: // Manipulate
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-3xl md:text-4xl font-bold">{info.icon}</span>
            <span className="text-white text-xs md:text-sm font-bold mt-1 bg-black/30 px-2 py-0.5 rounded">[{info.key.toUpperCase()}]</span>
          </div>
        );
      case 2: // Credibility
        return (
          <div className="absolute left-1/2 bottom-[70%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-white text-3xl md:text-3xl font-bold">{info.icon}</span>
            <span className="text-white text-xs md:text-sm font-bold mt-1 bg-black/30 px-2 py-0.5 rounded hidden md:inline-block">[{info.key.toUpperCase()}]</span>
          </div>
        );
      case 3: // Networking
        return (
          <div className="absolute left-1/2 bottom-[82%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-white text-3xl md:text-3xl font-bold">{info.icon}</span>
            <span className="text-white text-xs md:text-sm font-bold mt-1 bg-black/30 px-2 py-0.5 rounded hidden md:inline-block">[{info.key.toUpperCase()}]</span>
          </div>
        );
      case 4: // Influence
        return (
          <div className="absolute left-1/2 bottom-[88%] transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-white text-3xl md:text-3xl font-bold">{info.icon}</span>
            <span className="text-white text-xs md:text-sm font-bold mt-1 bg-black/30 px-2 py-0.5 rounded hidden md:inline-block">[{info.key.toUpperCase()}]</span>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-3xl md:text-4xl font-bold">{info.icon}</span>
            <span className="text-white text-xs md:text-sm font-bold mt-1 bg-black/30 px-2 py-0.5 rounded hidden md:inline-block">[{info.key.toUpperCase()}]</span>
          </div>
        );
    }
  };

  

  return (
    <div className="mt-8 flex flex-col md:flex-row w-full max-w-4xl mx-auto">
      {/* Circles container - 2/3 width on medium+ screens */}
      <div className="w-full md:w-2/3 relative">
        <div className="aspect-square relative flex items-center justify-center">
          {/* Generate buttons in reverse order (from largest to smallest) */}
          {Object.keys(buttonInfo)
            .sort((a, b) => buttonInfo[b as keyof typeof buttonInfo].order - buttonInfo[a as keyof typeof buttonInfo].order)
            .map(buttonType => {
              const info = buttonInfo[buttonType as keyof typeof buttonInfo];
              const nextButtonType = getNextButtonInSequence(buttonType);
              
              return (
                <div
                  key={buttonType}
                  className={`absolute rounded-full transition-all duration-200 border-4 border-white/20
                    ${isUnlocked[buttonType as keyof typeof isUnlocked] ? "" : "bg-gray-800"}
                    ${getLockedClass(buttonType)} 
                    ${canAfford[buttonType as keyof typeof canAfford] ? "cursor-pointer" : getDisabledClass(buttonType)} 
                    ${getPressedClass(buttonType)}
                    ${getRippleClass(buttonType)}
                    ${getButtonSize(info.order)}
                    ${getButtonPosition()}
                    overflow-hidden`}
                  style={{
                    backgroundColor: isUnlocked[buttonType as keyof typeof isUnlocked] ? info.color : undefined
                  }}
                  {...buttonHandlersMap[buttonType]}
                  id={buttonType === 'manipulate' ? manipulateButtonId : `${buttonType}-button`}
                >
                  {renderButtonContent(buttonType)}
                  
                  {/* Ripple/pulse animations */}
                  {buttonType === 'manipulate' && (
                    <div className={`absolute inset-0 rounded-full bg-white opacity-20 
                      ${pressedButtons.manipulate ? "game-ping-once" : "animate-pulse"}`}
                    ></div>
                  )}
                  
                  {/* Ripple effect animation for propagation */}
                  {rippleEffects[buttonType] && nextButtonType && (
                    <div 
                      className="absolute inset-0 rounded-full game-ripple-out" 
                      style={{
                        background: `radial-gradient(circle, ${info.color} 0%, transparent 70%)`
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
        </div>
        
        {/* Keyboard shortcut hint - centered below circles */}
        <div className="text-xs text-center text-gray-400 mt-2">
          Maintenez ou utilisez [Q,W,E,R] pour actions répétées
        </div>
      </div>
      
      {/* Legend/Details container - 1/3 width on medium+ screens */}
      <div className="w-full md:w-1/3 p-4 flex flex-col justify-center">
        <h3 className="text-white text-lg font-bold mb-4">Actions</h3>
        
        {/* Legend items */}
        {Object.keys(buttonInfo)
          .sort((a, b) => buttonInfo[a as keyof typeof buttonInfo].order - buttonInfo[b as keyof typeof buttonInfo].order)
          .map(buttonType => {
            const info = buttonInfo[buttonType as keyof typeof buttonInfo];
            const isAvailable = isUnlocked[buttonType as keyof typeof isUnlocked];
            
            if (!isAvailable) {
              return (
                <div key={buttonType} className="mb-4 opacity-50">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: "#666" }}>
                      <span className="text-white text-xs">🔒</span>
                    </div>
                    <span className="text-white font-bold">{info.label}</span>
                    <span className="text-gray-400 text-xs ml-2">Débloque à {buttonType === 'networking' ? '100' : buttonType === 'credibility' ? '200' : '400'} MP</span>
                  </div>
                </div>
              );
            }
            
            return (
              <div 
                key={buttonType} 
                className={`mb-4 ${!canAfford[buttonType as keyof typeof canAfford] ? "opacity-60" : ""}`}
                onMouseEnter={() => setHoveredButton(buttonType)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: info.color }}>
                    <span className="text-white text-xs">{info.icon}</span>
                  </div>
                  <span className="text-white font-bold">
                    {getGaslightedLabel(buttonType, info.label)}
                  </span>
                  <span className="text-gray-400 text-xs ml-2">[{info.key.toUpperCase()}]</span>
                  
                  {/* Afficher le coût MP pour tous les boutons sauf Manipuler */}
                  {buttonType !== 'manipulate' && (
                    <span className={`ml-auto text-sm ${canAfford[buttonType as keyof typeof canAfford] ? "text-white" : "text-red-400"}`}>
                      {buttonType === 'networking' ? '2' : buttonType === 'credibility' ? '3' : '5'} MP
                    </span>
                  )}
                </div>
                
                {/* Description only shows on hover */}
                {hoveredButton === buttonType && (
                  <div className="text-sm text-gray-300 mt-1 ml-8 italic">
                    {getDescription(buttonType)}
                  </div>
                )}
              </div>
            );
          })}
      </div>
      
      {/* No custom CSS here - using styles from globals.css */}
    </div>
  );
};

export default GameButtons;