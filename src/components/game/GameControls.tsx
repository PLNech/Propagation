import React from 'react';

interface GameControlsProps {
  onManipulate: () => void;
  manipulateButtonId?: string; // ID optionnel pour la cible du gaslighting
}

/**
 * Component for game action buttons
 */
const GameControls: React.FC<GameControlsProps> = ({ 
  onManipulate,
  manipulateButtonId = 'manipulate-button' // Valeur par défaut
}) => {
  return (
    <div className="mt-4 flex justify-center">
      <button 
        id={manipulateButtonId}
        onClick={onManipulate}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow transition duration-200"
      >
        Manipuler
      </button>
    </div>
  );
};

export default GameControls;