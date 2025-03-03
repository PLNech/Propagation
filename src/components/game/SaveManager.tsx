import React, { useState, useEffect } from 'react';
import { GameState } from './types';
import {
  saveGame,
  loadGame,
  hasSaveGame,
  deleteSaveGame,
  exportSave,
  importSave
} from './saveService';

interface SaveManagerProps {
  gameState: GameState;
  onLoadState: (state: GameState) => void;
  onSaveState: () => void;
  onResetGame: () => void;
}

/**
 * Composant de gestion des sauvegardes avec interface utilisateur
 */
const SaveManager: React.FC<SaveManagerProps> = ({
  gameState,
  onLoadState,
  onSaveState,
  onResetGame
}) => {
  const [showModal, setShowModal] = useState(false);
  const [importValue, setImportValue] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'loaded' | 'error'>('idle');
  const [manualSaveInfo, setManualSaveInfo] = useState<{ exists: boolean; timestamp?: number }>({ exists: false });
  const [autoSaveInfo, setAutoSaveInfo] = useState<{ exists: boolean; timestamp?: number }>({ exists: false });

  // Vérifier l'existence des sauvegardes au chargement
  useEffect(() => {
    setManualSaveInfo(hasSaveGame(false));
    setAutoSaveInfo(hasSaveGame(true));
  }, []);

  // Formater la date de sauvegarde
  const formatSaveDate = (timestamp?: number): string => {
    if (!timestamp) return 'Inconnue';
    
    return new Date(timestamp).toLocaleString();
  };

  // Sauvegarder le jeu
  const handleSave = () => {
    const success = saveGame(gameState);
    setSaveStatus(success ? 'saved' : 'error');
    
    // Mettre à jour les infos de sauvegarde
    setManualSaveInfo(hasSaveGame(false));
    
    // Appeler la fonction de callback
    if (success) {
      onSaveState();
    }
    
    // Réinitialiser le statut après un délai
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  // Charger le jeu
  const handleLoad = (useAutoSave = false) => {
    const loadedState = loadGame(useAutoSave);
    
    if (loadedState) {
      onLoadState(loadedState);
      setSaveStatus('loaded');
      
      // Fermer le modal
      setShowModal(false);
    } else {
      setSaveStatus('error');
    }
    
    // Réinitialiser le statut après un délai
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  // Exporter la sauvegarde
  const handleExport = () => {
    const saveData = exportSave();
    
    if (saveData) {
      // Copier dans le presse-papier
      navigator.clipboard.writeText(saveData)
        .then(() => {
          alert('Sauvegarde copiée dans le presse-papier.');
        })
        .catch(() => {
          alert('Erreur lors de la copie. Voici votre code de sauvegarde:\n\n' + saveData);
        });
    } else {
      alert('Aucune sauvegarde disponible à exporter.');
    }
  };

  // Importer une sauvegarde
  const handleImport = () => {
    if (!importValue.trim()) {
      alert('Veuillez entrer un code de sauvegarde.');
      return;
    }
    
    const loadedState = importSave(importValue);
    
    if (loadedState) {
      onLoadState(loadedState);
      setSaveStatus('loaded');
      setImportValue('');
      setShowModal(false);
    } else {
      setSaveStatus('error');
      alert('Code de sauvegarde invalide.');
    }
  };

  // Réinitialiser le jeu
  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser le jeu? Toute progression non sauvegardée sera perdue.')) {
      onResetGame();
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        Sauvegarde
      </button>

      {/* Indicateur de statut */}
      {saveStatus !== 'idle' && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 ${
          saveStatus === 'saved' ? 'bg-green-600' :
          saveStatus === 'loaded' ? 'bg-blue-600' :
          'bg-red-600'
        }`}>
          {saveStatus === 'saved' && 'Jeu sauvegardé!'}
          {saveStatus === 'loaded' && 'Jeu chargé!'}
          {saveStatus === 'error' && 'Erreur!'}
        </div>
      )}

      {/* Modal de sauvegarde */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Gestion des Sauvegardes</h2>
            
            <div className="space-y-4">
              {/* Section sauvegarde manuelle */}
              <div className="bg-gray-700 p-3 rounded">
                <h3 className="font-medium mb-2">Sauvegarde Manuelle</h3>
                {manualSaveInfo.exists ? (
                  <p className="text-sm text-gray-300 mb-2">
                    Dernière sauvegarde: {formatSaveDate(manualSaveInfo.timestamp)}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 mb-2">
                    Aucune sauvegarde disponible
                  </p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
                  >
                    Sauvegarder
                  </button>
                  {manualSaveInfo.exists && (
                    <button
                      onClick={() => handleLoad(false)}
                      className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm"
                    >
                      Charger
                    </button>
                  )}
                </div>
              </div>
              
              {/* Section sauvegarde auto */}
              <div className="bg-gray-700 p-3 rounded">
                <h3 className="font-medium mb-2">Sauvegarde Automatique</h3>
                {autoSaveInfo.exists ? (
                  <p className="text-sm text-gray-300 mb-2">
                    Dernière sauvegarde: {formatSaveDate(autoSaveInfo.timestamp)}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 mb-2">
                    Aucune sauvegarde auto disponible
                  </p>
                )}
                {autoSaveInfo.exists && (
                  <button
                    onClick={() => handleLoad(true)}
                    className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm"
                  >
                    Charger auto-save
                  </button>
                )}
              </div>
              
              {/* Section Import/Export */}
              <div className="bg-gray-700 p-3 rounded">
                <h3 className="font-medium mb-2">Import/Export</h3>
                <div className="flex space-x-2 mb-2">
                  <button
                    onClick={handleExport}
                    className="bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded text-sm"
                    disabled={!manualSaveInfo.exists}
                  >
                    Exporter
                  </button>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={importValue}
                    onChange={(e) => setImportValue(e.target.value)}
                    placeholder="Coller le code de sauvegarde ici"
                    className="w-full bg-gray-900 text-white px-3 py-2 rounded text-sm mb-2"
                  />
                  <button
                    onClick={handleImport}
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm"
                    disabled={!importValue.trim()}
                  >
                    Importer
                  </button>
                </div>
              </div>
              
              {/* Section Reset */}
              <div className="mt-4 pt-4 border-t border-gray-600">
                <button
                  onClick={handleReset}
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Réinitialiser le jeu
                </button>
              </div>
            </div>
            
            {/* Fermer */}
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveManager;