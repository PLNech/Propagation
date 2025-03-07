// src/components/game/cards/TheoryCard.tsx

import React from 'react';
import { ConspiracyTheory } from '@/types';

interface TheoryCardProps {
  theory: ConspiracyTheory;
  manipulationPoints: number;
  onPropagate: (theoryId: string) => void;
  propagationStatus?: 'success' | 'failed' | null;
  showProgressBar?: boolean; // New prop to show progress towards affordability
}

/**
 * Card component for displaying a conspiracy theory that can be propagated
 */
const TheoryCard: React.FC<TheoryCardProps> = ({ 
  theory, 
  manipulationPoints, 
  onPropagate,
  propagationStatus,
  showProgressBar = false
}) => {
  // Check if player can afford to propagate this theory
  const canAfford = manipulationPoints >= theory.cost;
  
  // Format success rate as percentage
  const successRatePercent = Math.round(theory.successRate * 100);
  
  // Format ethical impact with color
  const getEthicalImpactDisplay = () => {
    const value = theory.ethicalImpact;
    const color = value >= 0 ? 'text-green-400' : 'text-red-400';
    const sign = value >= 0 ? '+' : '';
    return <span className={color}>{sign}{value}</span>;
  };

  // Déterminer le style basé sur le statut
  const getStatusStyle = () => {
    if (theory.propagated) {
      return 'bg-purple-900 border-purple-500';
    }
    
    if (propagationStatus === 'success') {
      return 'bg-green-900 border-green-500';
    }
    
    if (propagationStatus === 'failed') {
      return 'bg-red-900 border-red-500';
    }
    
    return canAfford 
      ? 'bg-gray-800 border-yellow-500 hover:border-yellow-400' 
      : 'bg-gray-800 border-gray-600 opacity-75';
  };

  // Calculate progress percentage towards affordability
  const progressPercentage = Math.min(100, (manipulationPoints / theory.cost) * 100);

  return (
    <div className={`
      border rounded-lg p-4 relative
      ${getStatusStyle()}
    `}>
      {/* Indicateur de statut */}
      {propagationStatus && (
        <div className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-bold
          ${propagationStatus === 'success' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}
        `}>
          {propagationStatus === 'success' ? 'Réussite' : 'Échec'}
        </div>
      )}
    
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{theory.name}</h3>
        {!theory.propagated && (
          <div className="flex items-center">
            <div className="mr-2 text-sm">
              <span className={canAfford ? 'text-green-400' : 'text-red-400'}>
                {Math.floor(manipulationPoints)}/{theory.cost}
              </span>
            </div>
            <button
              onClick={() => onPropagate(theory.id)}
              disabled={!canAfford}
              className={`px-3 py-1 rounded text-sm ${
                canAfford 
                  ? 'bg-yellow-600 hover:bg-yellow-500' 
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              Propager
            </button>
          </div>
        )}
        {theory.propagated && (
          <span className="px-3 py-1 rounded text-sm bg-green-700">
            Propagée
          </span>
        )}
      </div>
      
      {/* Progress bar for affordability */}
      {!theory.propagated && !canAfford && showProgressBar && (
        <div className="mt-2 bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-yellow-600 h-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      )}
      
      <p className="text-sm text-gray-300 mt-2 mb-3">
        {theory.description}
        {theory.propagated && (
          <span className="block mt-2 italic text-xs text-blue-300">
            « {getRandomSuccessMessage()} »
          </span>
        )}
      </p>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Coût:</h4>
          <p className={`text-sm ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
            {theory.cost} <span className="text-xs">points de manipulation</span>
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Probabilité:</h4>
          <p className="text-sm text-yellow-400">
            {successRatePercent}%
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Impact éthique:</h4>
          <p className="text-sm">
            {getEthicalImpactDisplay()}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Risque:</h4>
          <p className="text-sm text-red-400">
            Perte des points
          </p>
        </div>
      </div>
      
      {!theory.propagated && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-1">Récompenses potentielles:</h4>
          <div className="grid grid-cols-2 gap-1 text-sm">
            {Object.entries(theory.rewards).map(([resource, amount]) => (
              <div key={resource} className="flex justify-between">
                <span>{resource}:</span>
                <span className="text-green-400">+{amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Messages aléatoires pour les théories propagées avec succès
const getRandomSuccessMessage = () => {
  const messages = [
    "Les gens y croient. C'est fascinant de voir comme la vérité est malléable, n'est-ce pas?",
    "Une théorie bien ancrée désormais. Après tout, qu'est-ce que la réalité sinon un consensus?",
    "Propagation réussie. La ligne entre fiction et réalité s'efface un peu plus.",
    "Le doute est semé. Et le doute, une fois installé, est presque impossible à déraciner.",
    "Et si c'était vrai, finalement? Même vous commencez à y croire un peu...",
    "Peut-être que le jeu lui-même fait partie d'une expérience plus vaste? Qui manipule qui?",
    "Les données changent. Ou peut-être avez-vous simplement déverrouillé un nouveau niveau de compréhension?",
    "Les règles semblent avoir changé. Ou les avez-vous juste interprétées différemment tout ce temps?"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export default TheoryCard;