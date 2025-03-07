import React from 'react';
import { Upgrade, GameResources } from '@/types';

interface UpgradeCardProps {
  upgrade: Upgrade;
  resources: GameResources;
  onPurchase: (upgradeId: string) => void;
}

/**
 * Card component for displaying a purchasable upgrade
 */
const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade, resources, onPurchase }) => {
  // Check if player can afford this upgrade
  const canAfford = Object.entries(upgrade.cost).every(([resource, amount]) => {
    return resources[resource as keyof GameResources] >= (amount || 0);
  });
  
  // Format the effect description
  const getEffectDescription = () => {
    switch (upgrade.effect.type) {
      case 'multiplier':
        return `Multiplie ${upgrade.effect.target} par ${upgrade.effect.value.toFixed(1)}`;
      case 'passive':
        return `+${upgrade.effect.value.toFixed(1)} ${upgrade.effect.target} par seconde`;
      case 'unlock':
        return `Débloque ${upgrade.effect.target}`;
      default:
        return '';
    }
  };

  return (
    <div className={`
      border rounded-lg p-4
      ${upgrade.purchased 
        ? 'bg-purple-900 border-purple-500' 
        : canAfford 
          ? 'bg-gray-800 border-blue-500 hover:border-blue-400' 
          : 'bg-gray-800 border-gray-600 opacity-75'
      }
    `}>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{upgrade.name}</h3>
        {!upgrade.purchased && (
          <button
            onClick={() => onPurchase(upgrade.id)}
            disabled={!canAfford}
            className={`px-3 py-1 rounded text-sm ${
              canAfford 
                ? 'bg-blue-600 hover:bg-blue-500' 
                : 'bg-gray-700 cursor-not-allowed'
            }`}
          >
            Acheter
          </button>
        )}
        {upgrade.purchased && (
          <span className="px-3 py-1 rounded text-sm bg-green-700">
            Acquis
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-300 mt-2 mb-3">{upgrade.description}</p>
      
      {!upgrade.purchased && (
        <div className="mt-2">
          <h4 className="text-sm font-medium mb-1">Coût:</h4>
          <div className="grid grid-cols-2 gap-1 text-sm">
            {Object.entries(upgrade.cost).map(([resource, amount]) => (
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
        <h4 className="text-sm font-medium mb-1">Effet:</h4>
        <p className="text-sm text-blue-300">{getEffectDescription()}</p>
      </div>
    </div>
  );
};

export default UpgradeCard;