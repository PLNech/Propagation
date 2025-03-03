import React from 'react';
import { GameResources } from '@/types';

interface ResourceDisplayProps {
  resources: GameResources;
}

/**
 * Component to display the current game resources with icons
 */
const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resources }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-gray-800 p-4 rounded shadow">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Crédibilité</h2>
        </div>
        <p className="text-xl">{resources.credibility.toFixed(1)}</p>
        <p className="text-xs text-gray-400 mt-1">La puissance de votre parole</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded shadow">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Influence</h2>
        </div>
        <p className="text-xl">{resources.influence.toFixed(1)}</p>
        <p className="text-xs text-gray-400 mt-1">Votre portée sociale</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded shadow">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Réseaux</h2>
        </div>
        <p className="text-xl">{resources.networks.toFixed(1)}</p>
        <p className="text-xs text-gray-400 mt-1">Vos canaux de diffusion</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded shadow">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Manipulation</h2>
        </div>
        <p className="text-xl">{resources.manipulationPoints.toFixed(1)}</p>
        <p className="text-xs text-gray-400 mt-1">Votre arsenal persuasif</p>
      </div>
    </div>
  );
};

export default ResourceDisplay; 