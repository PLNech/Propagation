import React from 'react';
import { Upgrade, GameResources } from './types';
import UpgradeCard from './UpgradeCard';

interface UpgradesTabProps {
  upgrades: Upgrade[];
  resources: GameResources;
  currentEraId: string;
  onPurchaseUpgrade: (upgradeId: string) => void;
}

/**
 * Tab component for displaying and purchasing upgrades
 */
const UpgradesTab: React.FC<UpgradesTabProps> = ({ 
  upgrades, 
  resources, 
  currentEraId, 
  onPurchaseUpgrade 
}) => {
  // Filter upgrades for current era and visible ones
  const availableUpgrades = upgrades.filter(
    upgrade => upgrade.eraId === currentEraId && upgrade.visible
  );
  
  // Group upgrades by purchased status
  const purchasedUpgrades = availableUpgrades.filter(upgrade => upgrade.purchased);
  const unpurchasedUpgrades = availableUpgrades.filter(upgrade => !upgrade.purchased);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Améliorations Disponibles</h2>
      
      {unpurchasedUpgrades.length === 0 && purchasedUpgrades.length === 0 && (
        <div className="text-center p-6 bg-gray-800 rounded-lg">
          <p className="text-gray-400">Aucune amélioration disponible dans cette ère pour le moment.</p>
          <p className="text-gray-500 text-sm mt-2">Débloquez de nouvelles ères ou achetez des prérequis pour accéder à plus d'améliorations.</p>
        </div>
      )}
      
      {unpurchasedUpgrades.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">À Acheter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unpurchasedUpgrades.map(upgrade => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                resources={resources}
                onPurchase={onPurchaseUpgrade}
              />
            ))}
          </div>
        </div>
      )}
      
      {purchasedUpgrades.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Améliorations Achetées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchasedUpgrades.map(upgrade => (
              <UpgradeCard
                key={upgrade.id}
                upgrade={upgrade}
                resources={resources}
                onPurchase={onPurchaseUpgrade}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpgradesTab;