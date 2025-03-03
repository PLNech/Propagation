import React from 'react';
import { GameResources } from './types';

interface ResourceDisplayProps {
  resources: GameResources;
}

/**
 * Component to display the current game resources
 */
const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Crédibilité</h2>
        <p className="text-xl">{resources.credibility.toFixed(1)}</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Influence</h2>
        <p className="text-xl">{resources.influence.toFixed(1)}</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Réseaux</h2>
        <p className="text-xl">{resources.networks.toFixed(1)}</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Points de Manipulation</h2>
        <p className="text-xl">{resources.manipulationPoints.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default ResourceDisplay;