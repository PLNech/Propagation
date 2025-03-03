import React from 'react';
import { EthicalAction, GameResources } from '@/types';

interface EthicalActionCardProps {
  action: EthicalAction;
  resources: GameResources;
  onPerform: (actionId: string) => void;
}

/**
 * Card component for displaying an ethical action that can be performed
 */
const EthicalActionCard: React.FC<EthicalActionCardProps> = ({ action, resources, onPerform }) => {
  // Check if player can afford this action
  const canAfford = Object.entries(action.cost).every(([resource, amount]) => {
    return resources[resource as keyof GameResources] >= (amount || 0);
  });

  return (
    <div className={`
      border rounded-lg p-4
      ${action.performed 
        ? 'bg-blue-900 border-blue-500' 
        : canAfford 
          ? 'bg-gray-800 border-green-500 hover:border-green-400' 
          : 'bg-gray-800 border-gray-600 opacity-75'
      }
    `}>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{action.name}</h3>
        {!action.performed && (
          <button
            onClick={() => onPerform(action.id)}
            disabled={!canAfford}
            className={`px-3 py-1 rounded text-sm ${
              canAfford 
                ? 'bg-green-600 hover:bg-green-500' 
                : 'bg-gray-700 cursor-not-allowed'
            }`}
          >
            Agir
          </button>
        )}
        {action.performed && (
          <span className="px-3 py-1 rounded text-sm bg-blue-700">
            Réalisé
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-300 mt-2 mb-3">{action.description}</p>
      
      {!action.performed && (
        <div className="mt-2">
          <h4 className="text-sm font-medium mb-1">Coût:</h4>
          <div className="grid grid-cols-2 gap-1 text-sm">
            {Object.entries(action.cost).map(([resource, amount]) => (
              <div key={resource} className="flex justify-between">
                <span>{resource}:</span>
                <span className={resources[resource as keyof GameResources] >= (amount || 0) 
                  ? 'text-green-400' 
                  : 'text-red-400'
                }>
                  {amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-3">
        <h4 className="text-sm font-medium mb-1">Effets:</h4>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="flex justify-between">
            <span>Éthique:</span>
            <span className="text-green-400">+{action.ethicalGain}</span>
          </div>
          <div className="flex justify-between">
            <span>Pensée critique:</span>
            <span className="text-blue-400">+{action.criticalThinkingGain}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicalActionCard;