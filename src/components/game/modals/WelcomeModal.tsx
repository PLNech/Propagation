// src/components/game/WelcomeModal.tsx (updated version)
import React, { useState, useEffect } from 'react';

interface WelcomeModalProps {
  onSubmit: (playerName: string, entityName: string) => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState('');
  const [entityName, setEntityName] = useState('');
  const [suggestedNames, setSuggestedNames] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  // Generate entity name suggestions based on player name
  const generateNameSuggestions = (name: string) => {
    if (!name || name.length < 2) return [];
    
    const baseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    
    // Name variations based on player name
    const nameVariations = [
      `${baseName}ium`,
      `${baseName}landia`,
      `${baseName}topia`,
      `${baseName}ville`,
      `Nouveau ${baseName}`,
    ];
    
    // Classical tribe names and formations
    const classicNames = [
      'Avaloria',
      'Thraconia',
      'Lemuria',
      'Eldoria',
      'Atlantea',
      'Hyperborea',
      'Arcadia',
      'Elysium',
      'Cameloria',
      'Olympia'
    ];
    
    // Mix player-based and classic names, prioritizing player variations
    const combined = [...nameVariations];
    
    // Add some random classic names
    const shuffled = [...classicNames].sort(() => 0.5 - Math.random());
    combined.push(...shuffled.slice(0, 3));
    
    return combined;
  };

  // Generate suggestions when player name changes
  useEffect(() => {
    if (playerName.length >= 2) {
      setSuggestedNames(generateNameSuggestions(playerName));
    }
  }, [playerName]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim().length < 2) {
      setError('Choisissez un nom d\'au moins 2 caractères.');
      return;
    }
    setError('');
    setShowSuggestions(true);
    setStep(2);
    setSuggestedNames(generateNameSuggestions(playerName));
    
    // Set default entity name if not explicitly choosing one
    if (!entityName) {
      setEntityName(suggestedNames[0] || `${playerName}ium`);
    }
  };

  const selectEntityName = (name: string) => {
    setEntityName(name);
  };

  const handleFinalSubmit = () => {
    if (!entityName) {
      setEntityName(suggestedNames[0] || `${playerName}ium`);
    }
    onSubmit(playerName, entityName);
  };

  const handleCustomEntityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntityName(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full bg-gray-800 border-2 border-purple-700 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">Bienvenue dans Propagation</h2>
          
          {step === 1 && (
            <>
              <p className="text-gray-200 leading-relaxed mb-4">
                Vous vous apprêtez à devenir un <span className="text-purple-300 font-semibold">Léviathan en devenir</span>, 
                une entité qui façonne l&apos;information et manipule la perception à travers les âges.
              </p>
    
              <p className="text-gray-200 leading-relaxed mb-4">
                D&apos;une simple tribu à l&apos;Antiquité jusqu&apos;à un vaste empire à l&apos;Ère Numérique, 
                votre influence grandira... mais à quel prix pour la vérité?
              </p>
              
              <form onSubmit={handleNameSubmit} className="mt-6">
                <div className="mb-4">
                  <label htmlFor="playerName" className="block text-gray-300 mb-2">Comment souhaitez-vous être appelé(e)?</label>
                  <input 
                    type="text" 
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded autofocus focus:border-purple-500 focus:outline-none"
                    placeholder="Votre nom"
                  />
                  {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-2 px-4 bg-purple-700 hover:bg-purple-600 rounded-lg font-semibold transition duration-200"
                >
                  Continuer
                </button>
              </form>
            </>
          )}
          
          {step === 2 && (
            <>
              <p className="text-gray-200 leading-relaxed mb-4">
                Excellent, <span className="text-purple-300 font-semibold">{playerName}</span>! 
                Maintenant, choisissez le nom de votre tribu primitive, qui évoluera au fil des âges.
              </p>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Suggestions basées sur votre nom:</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {suggestedNames.map((name, index) => (
                    <button
                      key={index}
                      onClick={() => selectEntityName(name)}
                      className={`p-2 rounded text-sm ${
                        entityName === name 
                          ? 'bg-purple-700 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="customEntityName" className="block text-gray-300 mb-2">Ou créez votre propre nom:</label>
                  <input 
                    type="text" 
                    id="customEntityName"
                    value={entityName}
                    onChange={handleCustomEntityNameChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:border-purple-500 focus:outline-none"
                    placeholder="Nom de votre entité"
                  />
                </div>
              </div>
              
              <button 
                onClick={handleFinalSubmit}
                className="w-full py-2 px-4 bg-purple-700 hover:bg-purple-600 rounded-lg font-semibold transition duration-200"
              >
                Commencer votre ascension
              </button>
            </>
          )}
          
          <p className="mt-4 text-xs text-gray-400 italic">
            &quot;Le grand art de la persuasion consiste autant à faire aimer la vérité qu&apos;à faire croire le mensonge.&quot; — Proverbe
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;