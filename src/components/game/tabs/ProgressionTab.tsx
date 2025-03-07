import React from 'react';
import { HistoricalEra } from '@/types';
import HistoricalContext from '@/game/HistoricalContext';

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
      <div className="mb-8">
        {/* Add the historical context for the current era */}
        <HistoricalContext era={eras.find(era => era.id === currentEraId) as HistoricalEra} />
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
      {/* Return to Antiquity Button for Industrial and Cold War Eras */}
      {(currentEraId === 'industrial' || currentEraId === 'coldWar' || currentEraId === 'digital') && (
        <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">
            Retour aux origines
          </h3>
          <p className="text-gray-300 mb-4">
            {currentEraId === 'industrial' ? 
              "Maintenant que vous maîtrisez la propagation des théories, pourquoi ne pas retourner à l'Antiquité pour appliquer ces techniques depuis le début ? Propagez vos théories favorites dès les premières ères !" : 
              "Avec votre connaissance du Mode Révélation, vous pouvez maintenant retourner à l'Antiquité et construire une histoire différente. Aidez l'humanité à voir à travers les manipulations !"}
          </p>
          <button
            onClick={() => onSelectEra('antiquity')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-white flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
            Retour à l'Antiquité
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressionTab;