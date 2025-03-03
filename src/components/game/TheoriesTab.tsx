import React, { useState } from 'react';
import { ConspiracyTheory } from './types';
import TheoryCard from './TheoryCard';

interface TheoriesTabProps {
  theories: ConspiracyTheory[];
  manipulationPoints: number;
  ethicalScore: number;
  currentEraId: string;
  onPropagateTheory: (theoryId: string) => void;
}

/**
 * Tab component for displaying and propagating conspiracy theories
 */
const TheoriesTab: React.FC<TheoriesTabProps> = ({ 
  theories, 
  manipulationPoints, 
  ethicalScore,
  currentEraId, 
  onPropagateTheory 
}) => {
  const [showPropagated, setShowPropagated] = useState(false);
  
  // Filter theories for current era
  const currentEraTheories = theories.filter(theory => theory.eraId === currentEraId);
  
  // Split theories by propagation status
  const unpropagatedTheories = currentEraTheories.filter(theory => !theory.propagated);
  const propagatedTheories = currentEraTheories.filter(theory => theory.propagated);
  
  // Get ethical score color
  const getEthicalScoreColor = () => {
    if (ethicalScore >= 80) return 'text-green-400';
    if (ethicalScore >= 50) return 'text-yellow-400';
    if (ethicalScore >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Théories à Propager</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Score éthique:</span>
          <span className={`font-bold ${getEthicalScoreColor()}`}>{ethicalScore}</span>
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">À propos de la propagation de théories</h3>
        <p className="text-sm text-gray-300">
          Propager des théories du complot peut vous apporter des récompenses substantielles, mais comporte des risques. 
          Chaque théorie a un taux de réussite qui détermine vos chances de gagner les récompenses. 
          En cas d'échec, vous perdrez vos points de manipulation investis.
        </p>
        <p className="text-sm text-gray-300 mt-2">
          Attention: propager des théories infondées diminuera votre score éthique, ce qui pourrait avoir des conséquences à long terme.
        </p>
      </div>
      
      {/* Filter toggle */}
      <div className="flex mb-4">
        <button
          className={`py-2 px-4 ${!showPropagated ? 'bg-blue-800 text-white' : 'bg-gray-700 text-gray-300'} rounded-l`}
          onClick={() => setShowPropagated(false)}
        >
          Disponibles ({unpropagatedTheories.length})
        </button>
        <button
          className={`py-2 px-4 ${showPropagated ? 'bg-purple-800 text-white' : 'bg-gray-700 text-gray-300'} rounded-r`}
          onClick={() => setShowPropagated(true)}
        >
          Propagées ({propagatedTheories.length})
        </button>
      </div>
      
      {/* Display theories based on filter */}
      {showPropagated ? (
        <>
          {propagatedTheories.length === 0 ? (
            <div className="text-center p-6 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Vous n'avez propagé aucune théorie dans cette ère.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {propagatedTheories.map(theory => (
                <TheoryCard
                  key={theory.id}
                  theory={theory}
                  manipulationPoints={manipulationPoints}
                  onPropagate={onPropagateTheory}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {unpropagatedTheories.length === 0 ? (
            <div className="text-center p-6 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Toutes les théories de cette ère ont été propagées.</p>
              <p className="text-gray-500 text-sm mt-2">Explorez d'autres ères pour découvrir de nouvelles théories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {unpropagatedTheories.map(theory => (
                <TheoryCard
                  key={theory.id}
                  theory={theory}
                  manipulationPoints={manipulationPoints}
                  onPropagate={onPropagateTheory}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TheoriesTab;