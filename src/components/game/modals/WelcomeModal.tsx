
import React, { useState, useEffect } from 'react';

interface WelcomeModalProps {
  onSubmit: (playerName: string, playerGender: 'masculine' | 'feminine' | 'neutral', entityName: string) => void;
}

// Famous name suggestions by category
const famousNameSuggestions = {
  rulers: ['Alexandre', 'Cléopâtre', 'Victoria', 'Akbar', 'Catherine', 'Charles', 'Élisabeth', 'Louis', 'Pierre', 'Justinien'],
  thinkers: ['Socrate', 'Simone', 'Confucius', 'Marie', 'Albert', 'Victor', 'Voltaire', 'Hypatie', 'René', 'Hannah'],
  icons: ['Elvis', 'Madonna', 'Freddie', 'Édith', 'Frida', 'Gandhi', 'Rosa', 'Mandela', 'Pelé', 'Maria']
};

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState('');
  const [entityName, setEntityName] = useState('');
  const [playerGender, setPlayerGender] = useState<'masculine' | 'feminine' | 'neutral'>('masculine');
  const [suggestedNames, setSuggestedNames] = useState<string[]>([]);
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
    onSubmit(playerName, playerGender, entityName);
  };

  const handleCustomEntityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntityName(e.target.value);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-auto">
      <div className="max-w-md w-full bg-gray-800 border-2 border-purple-700 rounded-lg shadow-2xl overflow-hidden my-4">
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
                <label htmlFor="playerName" className="block text-gray-300 mb-2">Quel est votre nom, cher Leader ?</label>
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

              {/* Famous name suggestions - NEW SECTION */}
              <div className="mb-6">
                <div className="grid grid-cols-1 gap-2 mb-2">
                  <select 
                    onChange={(e) => {
                      if (e.target.value) setPlayerName(e.target.value);
                    }}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:border-purple-500 focus:outline-none"
                    value=""
                  >
                    <option value="" disabled>Choisir une inspiration...</option>
                    <optgroup label="Grands dirigeants">
                      {famousNameSuggestions.rulers.map((name, i) => (
                        <option key={`ruler-${i}`} value={name}>{name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Grands penseurs">
                      {famousNameSuggestions.thinkers.map((name, i) => (
                        <option key={`thinker-${i}`} value={name}>{name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Figures emblématiques">
                      {famousNameSuggestions.icons.map((name, i) => (
                        <option key={`icon-${i}`} value={name}>{name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                <p className="text-xs text-gray-400 italic">
                  Vous pouvez sélectionner un nom ou saisir le vôtre ci-dessus.
                </p>
              </div>
              
                                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Et comment dois-je vous appeler, {playerName || 'Ô Sage'} ?</label>
                  <div className="space-y-2">
                    <label className={`block p-3 rounded-md cursor-pointer border ${playerGender === 'masculine' ? 'bg-purple-900 border-purple-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}>
                      <input 
                        type="radio" 
                        name="gender" 
                        value="masculine" 
                        checked={playerGender === 'masculine'}
                        onChange={() => setPlayerGender('masculine')} 
                        className="sr-only" 
                      />
                      <span className="flex items-center">
                        <span className="mr-2 text-xl">👑</span>
                        <span>
                          <span className="font-medium">{playerName || 'Nom'} le Grand</span>
                          <span className="block text-xs text-gray-400">Pour ceux qui croient que la force tient dans une barbe</span>
                        </span>
                      </span>
                    </label>
                    
                    <label className={`block p-3 rounded-md cursor-pointer border ${playerGender === 'feminine' ? 'bg-purple-900 border-purple-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}>
                      <input 
                        type="radio" 
                        name="gender" 
                        value="feminine" 
                        checked={playerGender === 'feminine'}
                        onChange={() => setPlayerGender('feminine')} 
                        className="sr-only" 
                      />
                      <span className="flex items-center">
                        <span className="mr-2 text-xl">👑</span>
                        <span>
                          <span className="font-medium">{playerName || 'Nom'} la Grande</span>
                          <span className="block text-xs text-gray-400">Pour gouverner d&apos;une main de fer dans un gant de velours</span>
                        </span>
                      </span>
                    </label>
                    
                    <label className={`block p-3 rounded-md cursor-pointer border ${playerGender === 'neutral' ? 'bg-purple-900 border-purple-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}>
                      <input 
                        type="radio" 
                        name="gender" 
                        value="neutral" 
                        checked={playerGender === 'neutral'}
                        onChange={() => setPlayerGender('neutral')} 
                        className="sr-only" 
                      />
                      <span className="flex items-center">
                        <span className="mr-2 text-xl">👑</span>
                        <span>
                          <span className="font-medium">Grand {playerName || 'Nom'}</span>
                          <span className="block text-xs text-gray-400">Parce que le vrai pouvoir transcende la grammaire</span>
                        </span>
                      </span>
                    </label>
                  </div>
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
                Parfait, <span className="text-purple-300 font-semibold">{playerName}</span>! 
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