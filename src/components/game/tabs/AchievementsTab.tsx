import React, { useState } from 'react';
import { Achievement, AchievementCategory } from '@/types';

interface AchievementsTabProps {
  achievements: Achievement[];
  totalUnlocked: number;
  onAchievementClick: (achievementId: string) => void;
  onShareAchievement: (achievement: Achievement) => void;
  onResetAchievements?: () => void;
}

/**
 * Displays all achievements with improved visual hierarchy and filtering
 */
const AchievementsTab: React.FC<AchievementsTabProps> = ({
  achievements,
  totalUnlocked,
  onAchievementClick,
  onShareAchievement,
  onResetAchievements
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

  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    if (onResetAchievements) {
      onResetAchievements();
    }
    setShowResetModal(false);
  };

  const cancelReset = () => {
    setShowResetModal(false);
  };
  
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

      {/* Reset button */}
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleResetClick}
          className="px-3 py-1 text-sm bg-red-800 hover:bg-red-700 text-white rounded-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <p><b>Réécrire l&apos;histoire </b> (tout recommencer, ou presque...)</p>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border-2 border-red-600 max-w-md w-full">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-red-400">Réinitialiser les accomplissements?</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-300 mb-4">
                Êtes-vous sûr de vouloir <span className="font-bold text-red-400">réinitialiser entièrement le jeu</span>? Cette action ne peut pas être annulée et vous recommencerez depuis le début.
              </p>
              <p className="text-gray-400 text-sm italic mb-6">
                Toutes vos ressources, ères débloquées, et améliorations seront perdues. Un nouvel accomplissement secret sera toutefois débloqué...
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelReset}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmReset}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded text-white flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Tout réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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