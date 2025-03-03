import React from 'react';
import { HistoricalEra } from './types';

interface ProgressionTabProps {
  eras: HistoricalEra[];
  currentEraId: string;
  influence: number;
  onUnlockEra: (eraId: string) => void;
  onSelectEra: (eraId: string) => void;
}

/**
 * Component for displaying and interacting with historical eras
 */
const ProgressionTab: React.FC<ProgressionTabProps> = ({ 
  eras, 
  currentEraId, 
  influence, 
  onUnlockEra, 
  onSelectEra 
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Progression Historique</h2>
      
      {/* Timeline visualization */}
      <div className="relative pb-12 mb-8">
        <div className="absolute h-1 w-full bg-gray-700 top-4"></div>
        <div className="flex justify-between relative">
          {eras.map((era) => {
            const isUnlocked = era.unlocked;
            const isActive = era.id === currentEraId;
            
            return (
              <div key={era.id} className="flex flex-col items-center z-10">
                <div 
                  className={`h-8 w-8 rounded-full z-10 flex items-center justify-center border-2 ${
                    isActive 
                      ? 'bg-purple-600 border-purple-300' 
                      : isUnlocked 
                        ? 'bg-blue-600 border-blue-300' 
                        : 'bg-gray-800 border-gray-600'
                  }`}
                >
                  {isUnlocked && <span className="text-xs">✓</span>}
                </div>
                <p className={`text-xs mt-1 ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                  {era.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="space-y-6">
        {eras.map((era) => (
          <div 
            key={era.id} 
            className={`p-4 rounded-lg border-2 transition-all ${
              era.unlocked 
                ? currentEraId === era.id 
                  ? 'bg-purple-900 border-purple-500' 
                  : 'bg-gray-800 border-gray-600 hover:border-purple-500' 
                : 'bg-gray-900 border-gray-700 opacity-75'
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{era.name}</h3>
              
              {era.unlocked ? (
                <button
                  onClick={() => onSelectEra(era.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentEraId === era.id 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-700 hover:bg-purple-600 text-gray-200'
                  }`}
                >
                  {currentEraId === era.id ? 'Active' : 'Activer'}
                </button>
              ) : (
                <button
                  onClick={() => onUnlockEra(era.id)}
                  disabled={influence < era.unlockCost}
                  className={`px-3 py-1 rounded text-sm ${
                    influence >= era.unlockCost 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : 'bg-gray-700 cursor-not-allowed'
                  }`}
                >
                  Débloquer ({era.unlockCost} Influence)
                </button>
              )}
            </div>
            
            <p className="mt-2 text-gray-300">{era.description}</p>
            
            {era.unlocked && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Techniques de manipulation:</h4>
                <div className="space-y-2">
                  {era.techniques.map(technique => (
                    <div key={technique.id} className="bg-gray-800 p-3 rounded">
                      <div className="flex justify-between">
                        <h5 className="font-medium">{technique.name}</h5>
                        <span className="text-sm text-green-400">
                          +{((technique.effect.multiplier - 1) * 100).toFixed(0)}% {technique.effect.resource}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{technique.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-800 rounded">
                  <h4 className="font-semibold mb-2">Multiplicateurs d&apos;ère:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(era.resourceMultipliers).map(([resource, multiplier]) => (
                      <div key={resource} className="flex justify-between">
                        <span className="text-sm">{resource}:</span>
                        <span className="text-sm text-blue-400">x{multiplier}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressionTab;