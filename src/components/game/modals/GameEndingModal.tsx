import React from 'react';
import { GameEnding, EthicalStats } from '@/types';

interface GameEndingModalProps {
  ending: GameEnding;
  stats: EthicalStats;
  onAcknowledge: (endingId: string) => void;
}

/**
 * Modal component for displaying a game ending
 */
const GameEndingModal: React.FC<GameEndingModalProps> = ({ ending, stats, onAcknowledge }) => {
  // Different styling based on ending type
  const getEndingStyle = () => {
    switch (ending.id) {
      case 'masterManipulator':
      case 'shadowPuppeteer':
        return {
          bg: 'bg-red-900',
          border: 'border-red-700',
          button: 'bg-red-700 hover:bg-red-600'
        };
      case 'ethicalCompromiser':
        return {
          bg: 'bg-yellow-900',
          border: 'border-yellow-700',
          button: 'bg-yellow-700 hover:bg-yellow-600'
        };
      case 'truthSeeker':
      case 'enlightener':
        return {
          bg: 'bg-green-900',
          border: 'border-green-700',
          button: 'bg-green-700 hover:bg-green-600'
        };
      default:
        return {
          bg: 'bg-gray-900',
          border: 'border-gray-700',
          button: 'bg-gray-700 hover:bg-gray-600'
        };
    }
  };
  
  const style = getEndingStyle();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`max-w-2xl w-full ${style.bg} ${style.border} border-2 rounded-lg shadow-2xl overflow-hidden`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">{ending.title}</h2>
          
          <div className="mb-6">
            <p className="text-gray-200 leading-relaxed mb-4">
              {ending.description}
            </p>
          </div>
          
          <div className="mb-6 bg-black bg-opacity-30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Votre Impact sur le Monde:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Théories propagées:</span>
                <span>{stats.theoriesPropagated}</span>
              </li>
              <li className="flex justify-between">
                <span>Actions éthiques réalisées:</span>
                <span>{stats.ethicalActionsPerformed}</span>
              </li>
              <li className="flex justify-between">
                <span>Influence sacrifiée:</span>
                <span>{stats.influenceSacrificed.toFixed(0)}</span>
              </li>
              <li className="flex justify-between">
                <span>Vies impactées:</span>
                <span>{stats.livesImpacted.toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span>Pensée critique stimulée:</span>
                <span>+{stats.criticalThinkingRaised.toFixed(0)} points</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => onAcknowledge(ending.id)}
              className={`${style.button} px-6 py-2 rounded-lg font-semibold`}
            >
              Continuer à jouer
            </button>
            <p className="mt-2 text-xs text-gray-400">
              Vous pouvez continuer à explorer le jeu et découvrir d&apos;autres fins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEndingModal;