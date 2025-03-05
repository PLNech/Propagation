import React, { useState } from 'react';
import { Achievement, AchievementCategory } from '@/types';
import AchievementCard from './AchievementCard';
import AchievementDetailModal from './AchievementDetailModal';

interface AchievementsTabProps {
  achievements: Achievement[];
  totalUnlocked: number;
  onAchievementClick: (achievementId: string) => void;
  onShareAchievement: (achievement: Achievement) => void;
}

/**
 * Tab component for displaying all achievements organized by category
 */
const AchievementsTab: React.FC<AchievementsTabProps> = ({ 
  achievements, 
  totalUnlocked,
  onAchievementClick,
  onShareAchievement
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<AchievementCategory | 'all'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  
  // Filter achievements based on current filters
  const filteredAchievements = achievements
    .filter(achievement => {
      if (filter === 'unlocked') return achievement.unlocked;
      if (filter === 'locked') return !achievement.unlocked;
      return true;
    })
    .filter(achievement => {
      if (categoryFilter === 'all') return true;
      return achievement.category === categoryFilter;
    })
    .filter(achievement => {
      // Don't show secret achievements that aren't unlocked yet
      return !(achievement.isSecret && !achievement.unlocked);
    });
  
  // Group achievements by category
  const achievementsByCategory = filteredAchievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {} as Record<AchievementCategory, Achievement[]>);
  
  // Calculate completion percentage
  const completionPercentage = Math.round((totalUnlocked / achievements.length) * 100);
  
  // Get achievement counts by category
  const getCategoryCounts = () => {
    const counts: Record<AchievementCategory | 'all', { total: number, unlocked: number }> = {
      all: { total: 0, unlocked: 0 },
      progression: { total: 0, unlocked: 0 },
      resources: { total: 0, unlocked: 0 },
      ethics: { total: 0, unlocked: 0 },
      manipulation: { total: 0, unlocked: 0 },
      meta: { total: 0, unlocked: 0 },
      secret: { total: 0, unlocked: 0 }
    };
    
    achievements.forEach(achievement => {
      counts.all.total++;
      counts[achievement.category].total++;
      
      if (achievement.unlocked) {
        counts.all.unlocked++;
        counts[achievement.category].unlocked++;
      }
    });
    
    return counts;
  };
  
  const categoryCounts = getCategoryCounts();
  
  // Handle achievement click
  const handleAchievementClick = (id: string) => {
    const achievement = achievements.find(a => a.id === id);
    if (achievement) {
      setSelectedAchievement(achievement);
    }
    onAchievementClick(id);
  };
  
  // Close achievement detail modal
  const handleCloseModal = () => {
    setSelectedAchievement(null);
  };
  
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Accomplissements</h2>
        <div className="text-sm text-gray-400">
          <span className="font-bold text-yellow-400">{totalUnlocked}</span> / {achievements.length} débloqués
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span>Progression</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-yellow-600"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap">
        <div className="mr-4 mb-2">
          <span className="text-sm text-gray-400 mr-2">Statut:</span>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-l-md ${filter === 'all' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={`px-3 py-1 text-sm ${filter === 'unlocked' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Débloqués
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-3 py-1 text-sm rounded-r-md ${filter === 'locked' ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Verrouillés
            </button>
          </div>
        </div>
        
        <div>
          <span className="text-sm text-gray-400 mr-2">Catégorie:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as AchievementCategory | 'all')}
            className="bg-gray-700 text-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="all">Toutes ({categoryCounts.all.unlocked}/{categoryCounts.all.total})</option>
            <option value="progression">Progression ({categoryCounts.progression.unlocked}/{categoryCounts.progression.total})</option>
            <option value="resources">Ressources ({categoryCounts.resources.unlocked}/{categoryCounts.resources.total})</option>
            <option value="ethics">Éthique ({categoryCounts.ethics.unlocked}/{categoryCounts.ethics.total})</option>
            <option value="manipulation">Manipulation ({categoryCounts.manipulation.unlocked}/{categoryCounts.manipulation.total})</option>
            <option value="meta">Méta ({categoryCounts.meta.unlocked}/{categoryCounts.meta.total})</option>
            <option value="secret">Secrets ({categoryCounts.secret.unlocked}/{categoryCounts.secret.total})</option>
          </select>
        </div>
      </div>
      
      {/* Achievement categories */}
      {Object.entries(achievementsByCategory).length > 0 ? (
        Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold mb-3 capitalize">
              {category === 'meta' ? 'Méta' : category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(categoryAchievements) && categoryAchievements.map((achievement: Achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  onClick={handleAchievementClick}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">Aucun accomplissement ne correspond à vos filtres.</p>
        </div>
      )}
      
      {/* Achievement detail modal */}
      {selectedAchievement && (
        <AchievementDetailModal
          achievement={selectedAchievement}
          onClose={handleCloseModal}
          onShare={onShareAchievement}
        />
      )}
    </div>
  );
};

export default AchievementsTab;