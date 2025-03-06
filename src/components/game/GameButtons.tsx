import React, { useState, useEffect, useRef } from 'react';
import { GameResources } from '@/types';

interface GameButtonsProps {
  onManipulate: () => void;
  onNetworking: () => void;
  onCredibility: () => void;
  onInfluence: () => void;
  resources: GameResources;
  manipulateButtonId?: string;
  currentEra?: string; // Added for era-specific witty text
  isGaslightActive?: boolean; // For gaslighting effects
}

/**
 * Enhanced game action buttons with keyboard shortcuts, hold functionality,
 * and era-specific witty descriptions
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
  // Check if player can afford each action
  const canAffordNetworking = resources.manipulationPoints >= 2;
  const canAffordCredibility = resources.manipulationPoints >= 3;
  const canAffordInfluence = resources.manipulationPoints >= 5;

  // Button press tracking state
  const [pressedButtons, setPressedButtons] = useState<Record<string, boolean>>({
    manipulate: false,
    networking: false,
    credibility: false,
    influence: false
  });

  // References for the button press intervals
  const buttonIntervals = useRef<Record<string, NodeJS.Timeout | null>>({
    manipulate: null,
    networking: null,
    credibility: null,
    influence: null
  });

  // Button info with keyboard shortcuts, costs, and witty descriptions
  const buttonInfo = {
    manipulate: {
      key: 'q',
      cost: 0,
      label: "Manipuler",
      icon: "🧠",
      unit: "MP",
      descriptions: {
        ancient: "Tisser des mythes",
        medieval: "R\u00e9pandre des rumeurs",
        industrial: "Fabriquer des faits",
        modern: "D\u00e9former la r\u00e9alit\u00e9",
        digital: "Viraliser des mensonges"
      }
    },
    networking: {
      key: 'w',
      cost: 2,
      label: "R\u00e9seautage",
      icon: "🌐",
      unit: "NP",
      descriptions: {
        ancient: "Attirer des disciples",
        medieval: "Rassembler une cour",
        industrial: "Forger des alliances",
        modern: "Construire des contacts",
        digital: "Exploiter les algorithmes"
      }
    },
    credibility: {
      key: 'e',
      cost: 3,
      label: "Cr\u00e9dibilit\u00e9",
      icon: "🛡️",
      unit: "CP",
      descriptions: {
        ancient: "Inventer des proph\u00e9ties",
        medieval: "Imiter l\u2019autorit\u00e9",
        industrial: "Falsifier des sources",
        modern: "\u00c9tablir des fa\u00e7ades",
        digital: "Fabriquer des preuves"
      }
    },
    influence: {
      key: 'r',
      cost: 5,
      label: "Influence",
      icon: "✨",
      unit: "IP",
      descriptions: {
        ancient: "Forcer l\u2019opinion",
        medieval: "Manipuler le pouvoir",
        industrial: "Contr\u00f4ler les m\u00e9dias",
        modern: "Fa\u00e7onner la perception",
        digital: "Hacker l\u2019attention"
      }
    }
  };

  // Button action mapping
  const buttonActions = {
    manipulate: onManipulate,
    networking: onNetworking,
    credibility: onCredibility,
    influence: onInfluence
  };

  // Affordability checks
  const canAfford = {
    manipulate: true,
    networking: canAffordNetworking,
    credibility: canAffordCredibility,
    influence: canAffordInfluence
  };

  // Start button press and set interval for repeated actions
  const startButtonPress = (buttonType: string) => {
    // Only proceed if the action is affordable
    if (!canAfford[buttonType as keyof typeof canAfford]) return;
    
    // Set the button as pressed
    setPressedButtons(prev => ({ ...prev, [buttonType]: true }));
    
    // Execute action immediately
    buttonActions[buttonType as keyof typeof buttonActions]();
    
    // Set interval for continued presses while holding
    if (!buttonIntervals.current[buttonType]) {
      buttonIntervals.current[buttonType] = setInterval(() => {
        // Check affordability again since resources may have changed
        if (buttonType === 'manipulate' || 
            (buttonType === 'networking' && resources.manipulationPoints >= 2) ||
            (buttonType === 'credibility' && resources.manipulationPoints >= 3) ||
            (buttonType === 'influence' && resources.manipulationPoints >= 5)) {
          buttonActions[buttonType as keyof typeof buttonActions]();
        } else {
          // Stop the interval if no longer affordable
          endButtonPress(buttonType);
        }
      }, 250); // Repeat every 250ms while holding
    }
  };

  // End button press and clear interval
  const endButtonPress = (buttonType: string) => {
    setPressedButtons(prev => ({ ...prev, [buttonType]: false }));
    
    if (buttonIntervals.current[buttonType]) {
      clearInterval(buttonIntervals.current[buttonType] as NodeJS.Timeout);
      buttonIntervals.current[buttonType] = null;
    }
  };

  // Keyboard event handling
  useEffect(() => {
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
        'w': 'networking',
        'e': 'credibility',
        'r': 'influence'
      };
      
      const buttonType = keyToButton[key];
      if (buttonType && !buttonIntervals.current[buttonType]) {
        startButtonPress(buttonType);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      const keyToButton: Record<string, string> = {
        'q': 'manipulate',
        'w': 'networking',
        'e': 'credibility',
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
      
      // Clear all intervals
      Object.keys(buttonIntervals.current).forEach(buttonType => {
        if (buttonIntervals.current[buttonType]) {
          clearInterval(buttonIntervals.current[buttonType] as NodeJS.Timeout);
          buttonIntervals.current[buttonType] = null;
        }
      });
    };
  }, [resources.manipulationPoints]); // Re-evaluate when resources change
  
  // Handle gaslighting effects on button text
  const getGaslightedLabel = (buttonType: string, originalLabel: string) => {
    if (isGaslightActive && Math.random() > 0.85) {
      // Occasionally swap labels or show misleading text
      const gaslightLabels: Record<string, string> = {
        "manipulate": "R\u00e9v\u00e9ler",
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

  // Button style creator 
  const getButtonStyle = (buttonType: string, isAffordable: boolean, isPressed: boolean) => {
    const baseStyle = "py-2 px-4 rounded shadow transition-all duration-200 w-full max-w-xs font-medium flex items-center justify-center gap-2";
    
    // Style variations based on button type
    const buttonStyles: Record<string, string> = {
      manipulate: "bg-purple-600 hover:bg-purple-700 active:bg-purple-800",
      networking: "bg-green-600 hover:bg-green-700 active:bg-green-800",
      credibility: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
      influence: "bg-purple-800 hover:bg-purple-900 active:bg-purple-950"
    };
    
    // Disabled style
    const disabledStyle = "bg-gray-600 text-gray-300 cursor-not-allowed";
    
    // Pressed style override
    const pressedStyle = isPressed ? "transform scale-95 shadow-inner" : "";
    
    // Occasional gaslighting visual effect
    const gaslightStyle = isGaslightActive && Math.random() > 0.9 ? "blur-[0.3px] opacity-95" : "";
    
    return `${baseStyle} ${isAffordable ? buttonStyles[buttonType] + " text-white font-bold" : disabledStyle} ${pressedStyle} ${gaslightStyle}`;
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Button order: manipulate first, followed by others */}
      {(["manipulate", "networking", "credibility", "influence"] as const).map(buttonType => {
        const info = buttonInfo[buttonType];
        const isAffordable = canAfford[buttonType];
        const isPressed = pressedButtons[buttonType];
        
        return (
          <div key={buttonType} className="flex justify-center relative">
            <button
              id={buttonType === "manipulate" ? manipulateButtonId : undefined}
              disabled={!isAffordable}
              className={getButtonStyle(buttonType, isAffordable, isPressed)}
              onMouseDown={() => startButtonPress(buttonType)}
              onMouseUp={() => endButtonPress(buttonType)}
              onMouseLeave={() => isPressed && endButtonPress(buttonType)}
              onTouchStart={() => startButtonPress(buttonType)}
              onTouchEnd={() => endButtonPress(buttonType)}
            >
              <div className="flex flex-col items-center">
                {/* Icon and main label */}
                <div className="flex items-center">
                  <span className="mr-1">{info.icon}</span>
                  <span>{getGaslightedLabel(buttonType, info.label)}</span>
                  <span className="text-xs ml-2 opacity-70">[{info.key.toUpperCase()}]</span>
                </div>
                
                {/* Cost and witty description */}
                <div className="text-xs mt-1">
                  {info.cost > 0 && <span className="font-mono">{info.cost} {info.unit}</span>}
                  <span className="italic ml-2 opacity-80">{getDescription(buttonType)}</span>
                </div>
              </div>
              
              {/* Visual effect for pressed state */}
              {isPressed && isAffordable && (
                <span className="absolute inset-0 bg-white opacity-10 rounded animate-pulse"></span>
              )}
            </button>
          </div>
        );
      })}
      
      {/* Keyboard shortcuts hint */}
      <div className="text-xs text-center text-gray-400 mt-1">
        Maintenez les boutons ou utilisez [Q,W,E,R] pour actions r\u00e9p\u00e9t\u00e9es
      </div>
    </div>
  );
};

export default GameButtons;