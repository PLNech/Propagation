// src/components/game/ui/Header.tsx

interface HeaderProps {
    playerName: string;
    playerGender: 'masculine' | 'feminine' | 'neutral';
    entityName: string;
    entityType: string;
    currentEra: HistoricalEra;
    resources: GameResources;
    ethicalScore: number;
    criticalThinking: number;
    gameMode: 'manipulation' | 'revelation';
    onStickyChange?: (isSticky: boolean, height: number) => void;
  }
  
  // Update generateRulerTitle function to use gender
  const generateRulerTitle = () => {
    const name = playerName || 'Anonyme';
    
    switch(currentEra.id) {
      case 'antiquity':
        if (playerGender === 'masculine') return `${name} le Fondateur`;
        if (playerGender === 'feminine') return `${name} la Fondatrice`;
        return `${name}, Guide Fondateur`;
      case 'middleAges':
        if (playerGender === 'masculine') return `${name} le Sage`;
        if (playerGender === 'feminine') return `${name} la Sage`;
        return `Sage ${name}`;
      case 'industrial':
        if (playerGender === 'masculine') return `Grand ${name} l'Orchestrateur`;
        if (playerGender === 'feminine') return `Grande ${name} l'Orchestratrice`;
        return `${name}, Grand Orchestrateur`;
      case 'coldWar':
        if (playerGender === 'masculine') return `Son Excellence ${name}`;
        if (playerGender === 'feminine') return `Son Excellence ${name}`;
        return `Excellence ${name}`;
      case 'digital':
        if (playerGender === 'masculine') return `${name} l'Omniscient`;
        if (playerGender === 'feminine') return `${name} l'Omnisciente`;
        return `${name}, Entité Omnisciente`;
      default:
        return name;
    }
  };
  
  // Update getRulerTitle function to use gender
  const getRulerTitle = () => {
    switch(currentEra.id) {
      case 'antiquity':
        if (playerGender === 'masculine') return 'Chef Tribal';
        if (playerGender === 'feminine') return 'Cheffe Tribale';
        return 'Guide Tribal';
      case 'middleAges':
        if (playerGender === 'masculine') return 'Seigneur';
        if (playerGender === 'feminine') return 'Dame';
        return 'Suzerain';
      case 'industrial':
        if (playerGender === 'masculine') return 'Maître de Presse';
        if (playerGender === 'feminine') return 'Maîtresse de Presse';
        return 'Maître des Médias';
      case 'coldWar':
        if (playerGender === 'masculine') return 'Commissaire';
        if (playerGender === 'feminine') return 'Commissaire';
        return 'Haut Commissaire';
      case 'digital':
        if (playerGender === 'masculine') return 'Architecte de Réalités';
        if (playerGender === 'feminine') return 'Architecte de Réalités';
        return 'Grand Architecte';
      default:
        if (playerGender === 'masculine') return 'Souverain';
        if (playerGender === 'feminine') return 'Souveraine';
        return 'Dirigeant Suprême';
    }
  };// src/components/game/Header.tsx
import React, { useState, useEffect } from 'react';
import { GameResources, HistoricalEra } from '@/types';

interface HeaderProps {
    playerName: string;
    playerGender: 'masculine' | 'feminine' | 'neutral';
    entityName: string;
    entityType: string;
    currentEra: HistoricalEra;
    resources: GameResources;
    ethicalScore: number;
    criticalThinking: number;
    gameMode: 'manipulation' | 'revelation';
    onStickyChange?: (isSticky: boolean, height: number) => void;
  }

const Header: React.FC<HeaderProps> = ({
    playerName,
    playerGender,
    entityName,
    entityType,
    currentEra,
    resources,
    ethicalScore,
    criticalThinking,
    gameMode,
    onStickyChange
}) => {
    // Add state to track if header should be sticky
    const [isSticky, setIsSticky] = useState(false);
    const headerRef = React.useRef<HTMLDivElement>(null);
    

    // Update generateRulerTitle function to use gender
    const generateRulerTitle = () => {
        const name = playerName || 'Anonyme';
        
        switch(currentEra.id) {
        case 'antiquity':
            if (playerGender === 'masculine') return `${name} le Fondateur`;
            if (playerGender === 'feminine') return `${name} la Fondatrice`;
            return `${name}, Guide Fondateur`;
        case 'middleAges':
            if (playerGender === 'masculine') return `${name} le Sage`;
            if (playerGender === 'feminine') return `${name} la Sage`;
            return `Sage ${name}`;
        case 'industrial':
            if (playerGender === 'masculine') return `Grand ${name} l'Orchestrateur`;
            if (playerGender === 'feminine') return `Grande ${name} l'Orchestratrice`;
            return `${name}, Grand Orchestrateur`;
        case 'coldWar':
            if (playerGender === 'masculine') return `Son Excellence ${name}`;
            if (playerGender === 'feminine') return `Son Excellence ${name}`;
            return `Excellence ${name}`;
        case 'digital':
            if (playerGender === 'masculine') return `${name} l'Omniscient`;
            if (playerGender === 'feminine') return `${name} l'Omnisciente`;
            return `${name}, Entité Omnisciente`;
        default:
            return name;
        }
    };
    
    // Update getRulerTitle function to use gender
    const getRulerTitle = () => {
        switch(currentEra.id) {
        case 'antiquity':
            if (playerGender === 'masculine') return 'Chef Tribal';
            if (playerGender === 'feminine') return 'Cheffe Tribale';
            return 'Guide Tribal';
        case 'middleAges':
            if (playerGender === 'masculine') return 'Seigneur';
            if (playerGender === 'feminine') return 'Dame';
            return 'Suzerain';
        case 'industrial':
            if (playerGender === 'masculine') return 'Maître de Presse';
            if (playerGender === 'feminine') return 'Maîtresse de Presse';
            return 'Maître des Médias';
        case 'coldWar':
            if (playerGender === 'masculine') return 'Commissaire';
            if (playerGender === 'feminine') return 'Commissaire';
            return 'Haut Commissaire';
        case 'digital':
            if (playerGender === 'masculine') return 'Architecte de Réalités';
            if (playerGender === 'feminine') return 'Architecte de Réalités';
            return 'Grand Architecte';
        default:
            if (playerGender === 'masculine') return 'Souverain';
            if (playerGender === 'feminine') return 'Souveraine';
            return 'Dirigeant Suprême';
        }
    };
    
    // Setup scroll listener
    useEffect(() => {
        const handleScroll = () => {
            // Make header sticky after scrolling 50px
            const shouldBeSticky = window.scrollY > 50;
            if (isSticky !== shouldBeSticky) {
                setIsSticky(shouldBeSticky);
                if (onStickyChange && headerRef.current) {
                    onStickyChange(shouldBeSticky, headerRef.current.offsetHeight);
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSticky, onStickyChange]);
    
    // Resource icons mapping
    const resourceIcons = {
        manipulationPoints: "🧠",
        credibility: "🛡️",
        networks: "🌐",
        influence: "✨"
    };
    
    return (
        <div 
        ref={headerRef}
        className={`w-full bg-gray-800 rounded-lg shadow-md mb-4 transition-all duration-300 ${
            isSticky ? 'fixed top-0 left-0 right-0 z-50 rounded-none shadow-lg' : ''
        }`}
        >
        {/* Desktop header - horizontal layout */}
        <div className="hidden md:flex items-center justify-between p-3 max-w-3xl mx-auto">
        {/* Left side: Player & Entity info */}
        <div className="flex items-center space-x-4">
        <div className="border-r border-gray-700 pr-4">
        <p className="text-sm text-gray-400">{getRulerTitle()}</p>
        <p className="font-semibold">{generateRulerTitle()}</p>
        </div>
        <div className="border-r border-gray-700 pr-4">
        <p className="text-sm text-gray-400">{entityType}</p>
        <p className="font-semibold">{entityName}</p>
        </div>
        <div>
        <p className="text-sm text-gray-400">Ère</p>
        <p className="font-semibold">{currentEra.name}</p>
        </div>
        </div>
        
        {/* Center: Game mode indicator */}
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            gameMode === 'manipulation' ? 'bg-red-900/60 text-red-100' : 'bg-green-900/60 text-green-100'
        }`}>
        {gameMode === 'manipulation' ? 'Manipulation' : 'Révélation'}
        </div>
        
        {/* Right side: Condensed resources */}
        <div className="flex items-center space-x-3">
        <div className="flex items-center">
        <span>{resourceIcons.manipulationPoints}</span>
        <span className="ml-1 text-red-300">{resources.manipulationPoints.toFixed(0)}</span>
        </div>
        <div className="flex items-center">
        <span>{resourceIcons.credibility}</span>
        <span className="ml-1 text-blue-300">{resources.credibility.toFixed(0)}</span>
        </div>
        <div className="flex items-center">
        <span>{resourceIcons.networks}</span>
        <span className="ml-1 text-green-300">{resources.networks.toFixed(0)}</span>
        </div>
        <div className="flex items-center">
        <span>{resourceIcons.influence}</span>
        <span className="ml-1 text-purple-300">{resources.influence.toFixed(0)}</span>
        </div>
        <div className="flex items-center ml-2 pl-2 border-l border-gray-700">
        <div className="w-2 h-2 rounded-full mr-1" style={{
            backgroundColor: ethicalScore >= 80 ? '#4ade80' : 
            ethicalScore >= 50 ? '#facc15' : 
            ethicalScore >= 30 ? '#fb923c' : 
            '#ef4444'
        }}></div>
        <span className="text-xs">{ethicalScore}</span>
        <div className="w-2 h-2 rounded-full mx-1 bg-blue-500"></div>
        <span className="text-xs">{criticalThinking}</span>
        </div>
        </div>
        </div>
        
        {/* Mobile header - stacked layout */}
        <div className="md:hidden">
        {/* Top row: Entity & Era */}
        <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <div>
        <p className="text-xs text-gray-400">{entityType}</p>
        <p className="font-semibold text-sm">{entityName}</p>
        </div>
        <div>
        <p className="text-xs text-gray-400">{getRulerTitle()}</p>
        <p className="font-semibold text-sm">{generateRulerTitle()}</p>
        </div>
        <div className="text-right">
        <p className="text-xs text-gray-400">Ère</p>
        <p className="font-semibold text-sm">{currentEra.name}</p>
        </div>
        </div>
        
        {/* Bottom row: Resources */}
        <div className="flex justify-between items-center p-2">
        <div className="flex space-x-2">
        <div className="flex flex-col items-center">
        <span className="text-sm">{resourceIcons.manipulationPoints}</span>
        <span className="text-xs text-red-300">{resources.manipulationPoints.toFixed(0)}</span>
        </div>
        <div className="flex flex-col items-center">
        <span className="text-sm">{resourceIcons.credibility}</span>
        <span className="text-xs text-blue-300">{resources.credibility.toFixed(0)}</span>
        </div>
        <div className="flex flex-col items-center">
        <span className="text-sm">{resourceIcons.networks}</span>
        <span className="text-xs text-green-300">{resources.networks.toFixed(0)}</span>
        </div>
        <div className="flex flex-col items-center">
        <span className="text-sm">{resourceIcons.influence}</span>
        <span className="text-xs text-purple-300">{resources.influence.toFixed(0)}</span>
        </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs ${
            gameMode === 'manipulation' ? 'bg-red-900/60 text-red-100' : 'bg-green-900/60 text-green-100'
        }`}>
        {gameMode === 'manipulation' ? 'Manip.' : 'Révél.'}
        </div>
        </div>
        </div>
        </div>
    );
};

export default Header;