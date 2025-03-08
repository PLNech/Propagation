// src/components/game/ui/ResourceDisplay.tsx

import React from 'react';
import { GameResources } from '@/types';

interface ResourceDisplayProps {
  resources: GameResources;
  resourcesUnlocked: {
    manipulationPoints: boolean;
    credibility: boolean;
    influence: boolean;
    networks: boolean;
  };
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources, resourcesUnlocked }) => {
  return (
    <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
      {resourcesUnlocked.manipulationPoints && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-red-400">Points de Manipulation</h3>
            <span className="text-lg font-bold text-red-400">{resources.manipulationPoints.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            La ressource primaire qui vous permet de manipuler l'opinion.
          </p>
        </div>
      )}

      {resourcesUnlocked.credibility && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-blue-400">Crédibilité</h3>
            <span className="text-lg font-bold text-blue-400">{resources.credibility.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Détermine combien votre parole est considérée comme fiable.
          </p>
        </div>
      )}

      {resourcesUnlocked.networks && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-green-400">Réseaux</h3>
            <span className="text-lg font-bold text-green-400">{resources.networks.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Représente les canaux de diffusion à votre disposition.
          </p>
        </div>
      )}

      {resourcesUnlocked.influence && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-purple-400">Influence</h3>
            <span className="text-lg font-bold text-purple-400">{resources.influence.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Votre capacité à impacter les décisions et opinions des autres.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourceDisplay;