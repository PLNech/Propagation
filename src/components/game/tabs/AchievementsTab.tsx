import React, { useState } from 'react';
import { Achievement, AchievementCategory } from '@/types';

interface AchievementsTabProps {
  achievements: Achievement[];
  totalUnlocked: number;
  onAchievementClick: (achievementId: string) => void;
  onShareAchievement: (achievement: Achievement) => void;
}

/**
 * Displays all achievements with improved visual hierarchy and filtering
 */
const AchievementsTab: React.FC<AchievementsTabProps> = ({
  achievements,
  totalUnlocked,
  onAchievementClick,
  onShareAchievement
}) => {
  const [activeCategory, setActiveCategory] = useState<AchievementCategory | 'all'>('all');
  const [showUnlocked, setShowUnlocked] = useState<boolean | null>(null); // null = show all
  
  // Categories for filtering
  const categories: { id: AchievementCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'progression', label: 'Progression' },
    { id: 'resources', label: 'Ressources' },
    { id: 'ethics', label: 'Éthique' },
    { id: 'manipulation', label: 'Manipulation' },
    { id: 'meta', label: 'Méta' },
    { id: 'secret', label: 'Secrets' }
  ];
  
  // Filter achievements by selected category and locked/unlocked state
  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = activeCategory === 'all' || achievement.category === activeCategory;
    const lockStateMatch = showUnlocked === null || achievement.unlocked === showUnlocked;
    
    // Don't show secret achievements that aren't unlocked unless explicitly filtering for secrets
    if (achievement.isSecret && !achievement.unlocked && activeCategory !== 'secret') {
      return false;
    }
    
    return categoryMatch && lockStateMatch;
  });
  
  return (
    <div className="mt-4">
      {/* Progress header */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Accomplissements</h2>
        <div className="flex items-center mb-2">
          <div className="flex-1">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600"
                style={{ width: `${(totalUnlocked / achievements.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="ml-4 text-sm font-medium">
            <span className="text-purple-400">{totalUnlocked}</span>
            <span className="text-gray-400"> / {achievements.length}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Vos succès racontent votre histoire de manipulation et révélation.
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="bg-gray-800 p-2 rounded-lg flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeCategory === category.id
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="bg-gray-800 p-2 rounded-lg flex gap-2 ml-auto">
          <button
            onClick={() => setShowUnlocked(null)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              showUnlocked === null
                ? 'bg-purple-700 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setShowUnlocked(true)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              showUnlocked === true
                ? 'bg-green-700 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Débloqués
          </button>
          <button
            onClick={() => setShowUnlocked(false)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              showUnlocked === false
                ? 'bg-red-700 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Verrouillés
          </button>
        </div>
      </div>
      
      {/* Achievement grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map(achievement => (
            <div
              key={achievement.id}
              className={`achievement-card p-4 rounded-lg cursor-pointer ${
                achievement.unlocked 
                  ? achievement.color 
                  : 'bg-gray-800 border border-gray-700'
              }`}
              onClick={() => onAchievementClick(achievement.id)}
            >
              <div className="flex items-start">
                <div className="text-3xl mr-3">{achievement.unlocked ? achievement.icon : '?'}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-bold ${achievement.unlocked ? '' : 'text-gray-400'}`}>
                      {achievement.unlocked || !achievement.isSecret 
                        ? achievement.name 
                        : 'Accomplissement secret'}
                    </h3>
                    <div className="ml-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${getRarityBadgeColor(achievement.rarity)}`}>
                        {getRarityLabel(achievement.rarity)}
                      </span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mt-1 ${achievement.unlocked ? '' : 'text-gray-500'}`}>
                    {achievement.unlocked || !achievement.isSecret
                      ? achievement.description
                      : achievement.hint || 'Accomplissement mystérieux à découvrir...'}
                  </p>
                  
                  {achievement.unlocked && achievement.reward && (
                    <div className="mt-2 reward-tag">
                      <span className="text-sm text-white">
                        {achievement.reward.description}
                      </span>
                    </div>
                  )}
                  
                  {achievement.unlocked && (
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-300">
                        {getTimeAgo(achievement.unlockedAt || 0)}
                      </span>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onShareAchievement(achievement);
                        }}
                        className="text-xs px-2 py-1 bg-gray-900 bg-opacity-30 hover:bg-opacity-40 rounded"
                      >
                        Partager
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center p-8 bg-gray-800 rounded-lg">
            <p className="text-gray-400">Aucun accomplissement ne correspond à vos filtres.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
const getRarityBadgeColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return 'bg-gray-600 text-white';
    case 'uncommon': return 'bg-green-600 text-white';
    case 'rare': return 'bg-blue-600 text-white';
    case 'epic': return 'bg-purple-600 text-white';
    case 'legendary': return 'bg-yellow-500 text-black font-bold';
    default: return 'bg-gray-600 text-white';
  }
};

const getRarityLabel = (rarity: string): string => {
  switch (rarity) {
    case 'common': return 'Commun';
    case 'uncommon': return 'Peu commun';
    case 'rare': return 'Rare';
    case 'epic': return 'Épique';
    case 'legendary': return 'Légendaire';
    default: return rarity;
  }
};

const getTimeAgo = (timestamp: number): string => {
  if (!timestamp) return '';
  
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);
  
  if (seconds < 60) return 'à l\'instant';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} min`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `il y a ${days} j`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `il y a ${months} mois`;
  
  const years = Math.floor(months / 12);
  return `il y a ${years} ans`;
};

export default AchievementsTab;