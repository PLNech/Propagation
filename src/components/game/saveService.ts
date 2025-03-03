import { GameState } from './types';

const SAVE_KEY = 'propagation_save_data';
const AUTO_SAVE_KEY = 'propagation_auto_save';

/**
 * Encode l'état du jeu en base64 pour le stockage
 * @param state État du jeu à encoder
 * @returns Chaîne encodée en base64
 */
export const encodeGameState = (state: GameState): string => {
  // Convertir l'état en chaîne JSON
  const jsonState = JSON.stringify(state);
  
  // Encoder en base64 (compatible avec le navigateur)
  return btoa(encodeURIComponent(jsonState));
};

/**
 * Décode une chaîne base64 en état de jeu
 * @param encodedState Chaîne encodée en base64
 * @returns État du jeu décodé ou null si échec
 */
export const decodeGameState = (encodedState: string): GameState | null => {
  try {
    // Décoder la chaîne base64
    const jsonState = decodeURIComponent(atob(encodedState));
    
    // Parser le JSON en objet
    return JSON.parse(jsonState) as GameState;
  } catch (error) {
    console.error('Erreur lors du décodage de la sauvegarde:', error);
    return null;
  }
};

/**
 * Sauvegarde l'état du jeu dans le localStorage
 * @param state État du jeu à sauvegarder
 * @param isAutoSave Indique s'il s'agit d'une sauvegarde automatique
 * @returns Succès de l'opération
 */
export const saveGame = (state: GameState, isAutoSave = false): boolean => {
  try {
    const key = isAutoSave ? AUTO_SAVE_KEY : SAVE_KEY;
    const encodedState = encodeGameState(state);
    localStorage.setItem(key, encodedState);
    
    // Stocker la date de sauvegarde
    localStorage.setItem(`${key}_timestamp`, Date.now().toString());
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};

/**
 * Charge l'état du jeu depuis le localStorage
 * @param useAutoSave Indique s'il faut charger la sauvegarde automatique
 * @returns État du jeu chargé ou null si échec
 */
export const loadGame = (useAutoSave = false): GameState | null => {
  try {
    const key = useAutoSave ? AUTO_SAVE_KEY : SAVE_KEY;
    const encodedState = localStorage.getItem(key);
    
    if (!encodedState) {
      return null;
    }
    
    return decodeGameState(encodedState);
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return null;
  }
};

/**
 * Vérifie si une sauvegarde existe
 * @param checkAutoSave Indique s'il faut vérifier la sauvegarde automatique
 * @returns Existence d'une sauvegarde et sa date
 */
export const hasSaveGame = (checkAutoSave = false): { exists: boolean, timestamp?: number } => {
  try {
    const key = checkAutoSave ? AUTO_SAVE_KEY : SAVE_KEY;
    const encodedState = localStorage.getItem(key);
    const timestampStr = localStorage.getItem(`${key}_timestamp`);
    
    if (!encodedState) {
      return { exists: false };
    }
    
    const timestamp = timestampStr ? parseInt(timestampStr, 10) : undefined;
    return { exists: true, timestamp };
  } catch (error) {
    console.log("Error: ", error);
    return { exists: false };
  }
};

/**
 * Supprime la sauvegarde du localStorage
 * @param removeAutoSave Indique s'il faut supprimer la sauvegarde automatique
 * @returns Succès de l'opération
 */
export const deleteSaveGame = (removeAutoSave = false): boolean => {
  try {
    const key = removeAutoSave ? AUTO_SAVE_KEY : SAVE_KEY;
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_timestamp`);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return false;
  }
};

/**
 * Configure une sauvegarde automatique périodique
 * @param state État du jeu à surveiller
 * @param interval Intervalle en millisecondes entre les sauvegardes
 * @returns Fonction pour arrêter la sauvegarde automatique
 */
export const setupAutoSave = (
  getState: () => GameState,
  interval = 60000 // Par défaut: sauvegarde toutes les minutes
): () => void => {
  const autoSaveId = setInterval(() => {
    const currentState = getState();
    saveGame(currentState, true);
  }, interval);
  
  // Retourner une fonction pour arrêter l'auto-sauvegarde
  return () => clearInterval(autoSaveId);
};

/**
 * Exporte la sauvegarde actuelle pour partage
 * @returns Chaîne de sauvegarde encodée en base64
 */
export const exportSave = (): string => {
  const encodedState = localStorage.getItem(SAVE_KEY);
  return encodedState || '';
};

/**
 * Importe une sauvegarde depuis une chaîne encodée
 * @param encodedState Chaîne encodée en base64
 * @returns État du jeu importé ou null si échec
 */
export const importSave = (encodedState: string): GameState | null => {
  try {
    const gameState = decodeGameState(encodedState);
    
    if (gameState) {
      // Sauvegarder l'état importé
      localStorage.setItem(SAVE_KEY, encodedState);
      localStorage.setItem(`${SAVE_KEY}_timestamp`, Date.now().toString());
    }
    
    return gameState;
  } catch (error) {
    console.error('Erreur lors de l\'importation:', error);
    return null;
  }
};