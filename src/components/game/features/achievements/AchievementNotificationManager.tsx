import React, { useState, useEffect } from 'react';
import { Achievement } from '@/types';
import AchievementNotification from './AchievementNotification';

interface AchievementNotificationManagerProps {
  newlyUnlocked: string[];
  achievements: Achievement[];
  onDismiss: (achievementId: string) => void;
}

/**
 * Manages the queue of achievement notifications to prevent overlap
 * Only shows one notification at a time
 */
const AchievementNotificationManager: React.FC<AchievementNotificationManagerProps> = ({
  newlyUnlocked,
  achievements,
  onDismiss
}) => {
  const [currentNotification, setCurrentNotification] = useState<Achievement | null>(null);
  const [queue, setQueue] = useState<Achievement[]>([]);
  
  // Set up the notification queue whenever newlyUnlocked changes
  useEffect(() => {
    // Find achievement objects for all newly unlocked achievements
    const newAchievements = newlyUnlocked
      .map(id => achievements.find(a => a.id === id))
      .filter((a): a is Achievement => a !== undefined);
    
    if (newAchievements.length === 0) return;
    
    // Add new achievements to the queue
    setQueue(prevQueue => [...prevQueue, ...newAchievements]);
  }, [newlyUnlocked, achievements]);
  
  // Handle notification dismissal
  const handleDismiss = (achievement: Achievement) => {
    onDismiss(achievement.id);
    setCurrentNotification(null);
  };
  

  // Process the queue whenever it changes or when current notification is dismissed
  useEffect(() => {
    // If there's no current notification and the queue has items, show the next one
    if (!currentNotification && queue.length > 0) {
      const nextNotification = queue[0];
      setCurrentNotification(nextNotification);
      setQueue(prevQueue => prevQueue.slice(1));
    }
  }, [queue, currentNotification]);

  if (!currentNotification) return null;
  
  // Get up to 3 additional notifications to show as stacked
  const queuedNotifications = queue.slice(0, 3);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full">
      {/* Current notification */}
      <AchievementNotification
        achievement={currentNotification}
        onDismiss={() => handleDismiss(currentNotification)}
        autoDismissDelay={8000} // Increased time to read
      />
      
      {/* Stacked notifications */}
      
      {queuedNotifications.length > 0 && (
        <div className="mt-2 flex justify-end">
          {queuedNotifications.map((achievement, index) => (
            <div 
              key={`${achievement.id}-${index}`}
              className={`${achievement.color} rounded-lg w-12 h-12 shadow-lg flex items-center justify-center 
                border border-white`}
              style={{
                position: 'relative',
                marginRight: `-${index * 20}px`,
                zIndex: 50 - index,
                transform: `translateY(${index * 8}px) translateX(-${index * 8}px)`
              }}
            >
              <span className="text-xl">{achievement.icon}</span>
            </div>
          ))}
          
          {queue.length > 3 && (
            <div className="bg-gray-700 rounded-lg w-12 h-12 shadow-lg flex items-center justify-center border border-white text-white font-bold"
                style={{
                  position: 'relative',
                  marginRight: 0,
                  marginLeft: '-10px',
                  zIndex: 46,
                  transform: 'translateY(24px) translateX(-24px)'
                }}
            >
              +{queue.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AchievementNotificationManager;