// src/components/game/tabs/TheoriesTab.tsx (update the component)

import React, { useState, useEffect, useMemo } from 'react';
import { ConspiracyTheory } from '@/types';
import TheoryCard from '@/game/cards/TheoryCard';

interface TheoriesTabProps {
  theories: ConspiracyTheory[];
  manipulationPoints: number;
  ethicalScore: number;
  currentEraId: string;
  onPropagateTheory: (theoryId: string) => void;
}

/**
 * Tab component for displaying and propagating conspiracy theories
 * with progressive reveal based on manipulation points
 */
const TheoriesTab: React.FC<TheoriesTabProps> = ({ 
  theories, 
  manipulationPoints, 
  ethicalScore,
  currentEraId, 
  onPropagateTheory 
}) => {
  const [showPropagated, setShowPropagated] = useState(false);
  // Tracking de statut de propagation par théorie
  const [propagationStatus, setPropagationStatus] = useState<Record<string, 'success' | 'failed' | null>>({});
  // Track theories that are partially affordable (>=50% of cost)
  const [partiallyAffordable, setPartiallyAffordable] = useState<Record<string, boolean>>({});
  
  // Filter theories for current era - using useMemo to prevent recreation on every render
  const currentEraTheories = useMemo(() => {
    return theories.filter(theory => theory.eraId === currentEraId);
  }, [theories, currentEraId]);
  
  // Update partially affordable theories whenever manipulation points change
  useEffect(() => {
    const newPartiallyAffordable: Record<string, boolean> = {};
    
    currentEraTheories.forEach(theory => {
      // Theory is partially affordable if player has at least 50% of the cost
      newPartiallyAffordable[theory.id] = manipulationPoints >= (theory.cost * 0.5);
    });
    
    setPartiallyAffordable(newPartiallyAffordable);
  }, [manipulationPoints, currentEraTheories]);
  
  // Split theories by propagation status and affordability - also memoize these
  const unpropagatedTheories = useMemo(() => {
    return currentEraTheories.filter(theory => 
      !theory.propagated && (theory.propagated || partiallyAffordable[theory.id])
    );
  }, [currentEraTheories, partiallyAffordable]);
  
  const propagatedTheories = useMemo(() => {
    return currentEraTheories.filter(theory => theory.propagated);
  }, [currentEraTheories]);
  
  // Get upcoming theories (not yet affordable)
  const upcomingTheories = useMemo(() => {
    return currentEraTheories.filter(theory => 
      !theory.propagated && !partiallyAffordable[theory.id]
    );
  }, [currentEraTheories, partiallyAffordable]);

  // Get ethical score color
  const getEthicalScoreColor = () => {
    if (ethicalScore >= 80) return 'text-green-400';
    if (ethicalScore >= 50) return 'text-yellow-400';
    if (ethicalScore >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  // Gestionnaire de propagation avec tracking de statut
  const handlePropagateTheory = (theoryId: string) => {
    const theory = theories.find(t => t.id === theoryId);
    if (!theory) return;
    
    // Déterminer succès ou échec
    const isSuccessful = Math.random() < theory.successRate;
    
    // Mettre à jour le statut
    setPropagationStatus(prev => ({
      ...prev,
      [theoryId]: isSuccessful ? 'success' : 'failed'
    }));
    
    // Appeler la fonction de propagation du parent
    onPropagateTheory(theoryId);
    
    // Effacer le statut après un délai
    setTimeout(() => {
      setPropagationStatus(prev => ({
        ...prev,
        [theoryId]: null
      }));
    }, 5000);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Croyances à Propager</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Score éthique:</span>
          <span className={`font-bold ${getEthicalScoreColor()}`}>{ethicalScore}</span>
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">La Zone Grise de l&apos;Information</h3>
        <p className="text-sm text-gray-300">
          Propager des théories peut vous apporter des récompenses substantielles. Certaines sont peut-être vraies... qui sait? 
          Après tout, l&apos;histoire est écrite par les vainqueurs, et la vérité est souvent plus étrange que la fiction.
        </p>
        <p className="text-sm text-gray-300 mt-2 italic">
          <span className="text-yellow-300">Note:</span> Des rumeurs circulent selon lesquelles jouer à ce jeu pourrait lui-même être une expérience sociale. 
          Les règles changent-elles quand vous ne regardez pas? Certains joueurs disent avoir remarqué des anomalies...
        </p>
      </div>
      
      {/* Filter toggle */}
      <div className="flex mb-4">
        <button
          className={`py-2 px-4 ${!showPropagated ? 'bg-blue-800 text-white' : 'bg-gray-700 text-gray-300'} rounded-l`}
          onClick={() => setShowPropagated(false)}
        >
          Disponibles ({unpropagatedTheories.length + upcomingTheories.length})
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
              <p className="text-gray-400">Vous n&apos;avez propagé aucune théorie dans cette ère.</p>
              <p className="text-gray-300 text-sm mt-2 italic">Mais qui sait ce qui se passe dans les ères que vous ne surveillez pas?</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {propagatedTheories.map(theory => (
                <TheoryCard
                  key={theory.id}
                  theory={theory}
                  manipulationPoints={manipulationPoints}
                  onPropagate={handlePropagateTheory}
                  propagationStatus={propagationStatus[theory.id]}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {unpropagatedTheories.length === 0 && upcomingTheories.length === 0 ? (
            <div className="text-center p-6 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Toutes les théories de cette ère ont été propagées.</p>
              <p className="text-gray-500 text-sm mt-2">Ou peut-être que de nouvelles théories apparaîtront quand vous ne regardez pas...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Available Theories */}
              {unpropagatedTheories.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Prêtes à Propager</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {unpropagatedTheories.map(theory => (
                      <TheoryCard
                        key={theory.id}
                        theory={theory}
                        manipulationPoints={manipulationPoints}
                        onPropagate={handlePropagateTheory}
                        propagationStatus={propagationStatus[theory.id]}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upcoming Theories */}
              {upcomingTheories.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Théories en Développement</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {upcomingTheories.map(theory => (
                      <div 
                        key={theory.id}
                        className="p-4 rounded-lg border border-gray-700 bg-gray-800 opacity-75"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{theory.name}</h3>
                            <p className="text-xs text-gray-400 mt-1">Théorie en cours d&apos;élaboration</p>
                          </div>
                          <div className="text-sm">
                            <span className={`${manipulationPoints < theory.cost ? 'text-red-400' : 'text-green-400'}`}>
                              {Math.floor(manipulationPoints)}/{theory.cost}
                            </span> points
                          </div>
                        </div>
                        
                        <div className="mt-3 bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full"
                            style={{ width: `${Math.min(100, (manipulationPoints / theory.cost) * 100)}%` }}
                          ></div>
                        </div>
                        
                        <p className="text-sm text-gray-400 mt-3">
                          Continuez à manipuler pour gagner suffisamment de points et débloquer cette théorie.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Easter egg message */}
      {Math.random() > 0.9 && (
        <div className="mt-8 text-xs text-gray-500 italic text-right">
          {"// Est-ce que vous venez de voir cette interface glitcher? Étrange..."}
        </div>
      )}
    </div>
  );
};

export default TheoriesTab;