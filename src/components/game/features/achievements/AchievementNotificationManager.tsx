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
    let timer: NodeJS.Timeout | null = null;
    
    // If there's no current notification and the queue has items, show the next one
    if (!currentNotification && queue.length > 0) {
      const nextNotification = queue[0];
      setCurrentNotification(nextNotification);
      setQueue(prevQueue => prevQueue.slice(1));
      
      // Set auto-dismiss timeout
      timer = setTimeout(() => {
        handleDismiss(nextNotification);
      }, 8000); // 8 seconds auto-dismiss
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [queue, currentNotification, handleDismiss]);

  
  if (!currentNotification) return null;
  
  return (
    <div className="achievement-notification-container">
      <AchievementNotification
        achievement={currentNotification}
        onDismiss={() => handleDismiss(currentNotification)}
        autoDismissDelay={8000} // Increased time to read
      />
    </div>
  );
};

export default AchievementNotificationManager;