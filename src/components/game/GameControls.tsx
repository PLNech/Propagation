import React from 'react';

interface GameControlsProps {
  onManipulate: () => void;
}

/**
 * Component for game action buttons
 */
const GameControls: React.FC<GameControlsProps> = ({ onManipulate }) => {
  return (
    <div className="mt-4 flex justify-center">
      <button 
        onClick={onManipulate}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow transition duration-200"
      >
        Manipuler
      </button>
    </div>
  );
};

export default GameControls;