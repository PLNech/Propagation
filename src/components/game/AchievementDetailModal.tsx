import React from 'react';
import { Achievement } from '@/types';

interface AchievementDetailModalProps {
  achievement: Achievement;
  onClose: () => void;
  onShare: (achievement: Achievement) => void;
}

/**
 * Modal component to display detailed information about an achievement
 */
const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({ 
  achievement, 
  onClose,
  onShare
}) => {
  const { 
    name, 
    description, 
    icon, 
    color, 
    rarity, 
    category, 
    unlocked, 
    isSecret, 
    hint, 
    reward, 
    unlockedAt 
  } = achievement;
  
  // Define styles for rarity badges
  const rarityStyles = {
    common: 'bg-gray-200 text-gray-800',
    uncommon: 'bg-green-200 text-green-800',
    rare: 'bg-blue-200 text-blue-800',
    epic: 'bg-purple-200 text-purple-800',
    legendary: 'bg-yellow-200 text-yellow-800'
  };
  
  // Category styles
  const categoryStyles = {
    progression: 'bg-blue-200 text-blue-800',
    resources: 'bg-green-200 text-green-800',
    ethics: 'bg-purple-200 text-purple-800',
    manipulation: 'bg-red-200 text-red-800',
    meta: 'bg-yellow-200 text-yellow-800',
    secret: 'bg-gray-900 text-white'
  };
  
  // Is this a secret achievement that hasn't been unlocked yet?
  const isRedacted = isSecret && !unlocked;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full ${unlocked ? color : 'bg-gray-800'} rounded-lg shadow-xl overflow-hidden border-2 ${unlocked ? 'border-yellow-500' : 'border-gray-600'}`}>
        {/* Header */}
        <div className="p-4 border-b border-black border-opacity-10 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-4xl mr-3">{isRedacted ? '❓' : icon}</div>
            <h2 className="text-xl font-bold">{isRedacted ? 'Accomplissement Secret' : name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-800 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex space-x-2 mb-4">
            <div className={`px-2 py-0.5 text-xs rounded ${rarityStyles[rarity]}`}>
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </div>
            <div className={`px-2 py-0.5 text-xs rounded ${categoryStyles[category]}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            {isSecret && <div className="px-2 py-0.5 text-xs rounded bg-purple-200 text-purple-800">Secret</div>}
          </div>
          
          <p className="text-sm mb-4">
            {isRedacted ? 'Cet accomplissement est secret. Continuez à jouer pour le découvrir...' : description}
          </p>
          
          {hint && isSecret && !unlocked && (
            <div className="bg-purple-900 bg-opacity-20 p-3 rounded mb-4">
              <p className="text-sm italic">
                <span className="font-bold">Indice : </span>
                {hint}
              </p>
            </div>
          )}
          
          {reward && (isRedacted ? false : true) && (
            <div className="bg-yellow-900 bg-opacity-20 p-3 rounded mb-4">
              <p className="text-sm">
                <span className="font-bold">Récompense : </span>
                {reward.description}
              </p>
            </div>
          )}
          
          {unlocked && unlockedAt && (
            <div className="text-sm text-right mt-4">
              <span className="opacity-75">Débloqué le {new Date(unlockedAt).toLocaleDateString()} à {new Date(unlockedAt).toLocaleTimeString()}</span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-black border-opacity-10 flex justify-between">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm"
          >
            Fermer
          </button>
          
          {unlocked && (
            <button 
              onClick={() => onShare(achievement)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Partager
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementDetailModal;