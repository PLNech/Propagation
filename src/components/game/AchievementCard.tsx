import React from 'react';
import { Achievement } from '@/types';

interface AchievementCardProps {
  achievement: Achievement;
  onClick: (id: string) => void;
  compact?: boolean; // Optional prop for compact display
}

/**
 * Component to display a single achievement
 */
const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onClick, compact = false }) => {
  const { id, name, description, icon, color, rarity, unlocked, isSecret, reward } = achievement;
  
  // Define styles for rarity badges
  const rarityStyles = {
    common: 'bg-gray-200 text-gray-800',
    uncommon: 'bg-green-200 text-green-800',
    rare: 'bg-blue-200 text-blue-800',
    epic: 'bg-purple-200 text-purple-800',
    legendary: 'bg-yellow-200 text-yellow-800'
  };
  
  // If the achievement is secret and not unlocked, show redacted information
  const isRedacted = isSecret && !unlocked;
  
  // Determine the border style based on unlock status
  const borderStyle = unlocked 
    ? 'border-2 border-yellow-500' 
    : 'border border-gray-600';
  
  // Determine opacity based on unlock status
  const opacityStyle = unlocked ? 'opacity-100' : 'opacity-60';
  
  const handleClick = () => {
    onClick(id);
  };
  
  if (compact) {
    // Compact version (for notifications or summaries)
    return (
      <div 
        className={`flex items-center p-2 ${borderStyle} rounded-lg ${opacityStyle} ${unlocked ? color : 'bg-gray-800'} cursor-pointer hover:shadow-md transition-all duration-200`}
        onClick={handleClick}
      >
        <div className="text-2xl mr-2">{isRedacted ? '❓' : icon}</div>
        <div>
          <h3 className="font-bold text-sm">{isRedacted ? 'Accomplissement Secret' : name}</h3>
          {unlocked && <p className="text-xs opacity-75">Débloqué !</p>}
        </div>
      </div>
    );
  }
  
  // Full version
  return (
    <div 
      className={`p-4 ${borderStyle} rounded-lg ${opacityStyle} ${unlocked ? color : 'bg-gray-800'} cursor-pointer hover:shadow-md transition-all duration-200`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="text-3xl mr-3">{isRedacted ? '❓' : icon}</div>
          <h3 className="font-bold">{isRedacted ? 'Accomplissement Secret' : name}</h3>
        </div>
        <div className={`px-2 py-0.5 text-xs rounded ${rarityStyles[rarity]}`}>
          {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
        </div>
      </div>
      
      <p className="text-sm mb-2">
        {isRedacted ? 'Cet accomplissement est secret. Continuez à jouer pour le découvrir...' : description}
      </p>
      
      {isSecret && !isRedacted && unlocked && (
        <div className="bg-purple-900 bg-opacity-20 p-2 rounded text-xs mb-2">
          <span className="font-bold">Secret découvert !</span>
        </div>
      )}
      
      {reward && unlocked && (
        <div className="bg-yellow-900 bg-opacity-20 p-2 rounded text-xs mb-2">
          <span className="font-bold">Récompense :</span> {reward.description}
        </div>
      )}
      
      {!unlocked && !isRedacted && (
        <div className="mt-2 text-xs text-gray-400">
          Non débloqué
        </div>
      )}
      
      {unlocked && (
        <div className="mt-2 text-xs flex justify-between">
          <span>Débloqué !</span>
          {achievement.unlockedAt && (
            <span>{new Date(achievement.unlockedAt).toLocaleDateString()}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementCard;