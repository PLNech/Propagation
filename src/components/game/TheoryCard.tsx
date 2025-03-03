import React from 'react';
import { ConspiracyTheory, GameResources } from './types';

interface TheoryCardProps {
  theory: ConspiracyTheory;
  manipulationPoints: number;
  onPropagate: (theoryId: string) => void;
}

/**
 * Card component for displaying a conspiracy theory that can be propagated
 */
const TheoryCard: React.FC<TheoryCardProps> = ({ theory, manipulationPoints, onPropagate }) => {
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

  return (
    <div className={`
      border rounded-lg p-4
      ${theory.propagated 
        ? 'bg-purple-900 border-purple-500' 
        : canAfford 
          ? 'bg-gray-800 border-yellow-500 hover:border-yellow-400' 
          : 'bg-gray-800 border-gray-600 opacity-75'
      }
    `}>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{theory.name}</h3>
        {!theory.propagated && (
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
        )}
        {theory.propagated && (
          <span className="px-3 py-1 rounded text-sm bg-green-700">
            Propagée
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-300 mt-2 mb-3">{theory.description}</p>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Coût:</h4>
          <p className={`text-sm ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
            {theory.cost} points de manipulation
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Taux de réussite:</h4>
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
          <h4 className="text-sm font-medium mb-1">Risque d'échec:</h4>
          <p className="text-sm text-red-400">
            Perte de {theory.cost} points
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

export default TheoryCard;