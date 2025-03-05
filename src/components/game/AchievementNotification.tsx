import React, { useState, useEffect } from 'react';
import { Achievement } from '@/types';

interface AchievementNotificationProps {
  achievement: Achievement;
  onDismiss: () => void;
}

/**
 * Component to display a notification when an achievement is unlocked
 */
const AchievementNotification: React.FC<AchievementNotificationProps> = ({ 
  achievement, 
  onDismiss 
}) => {
  const [animateOut, setAnimateOut] = useState(false);
  
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
      
      // Wait for animation to complete before dismissing
      setTimeout(onDismiss, 500);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  // Handle manual dismiss
  const handleDismiss = () => {
    setAnimateOut(true);
    setTimeout(onDismiss, 500);
  };
  
  // Play sound effect when notification appears
  useEffect(() => {
    // Simple way to create a sound effect - in a real app, would preload audio
    try {
      const audio = new Audio('/achievement_unlocked.mp3'); // TODO Add a sound :)
      audio.volume = 0.5;
      audio.play();
    } catch (error) {
      // Fallback for browsers that block autoplay or if audio doesn't exist
      console.log('Could not play achievement sound:', error);
    }
  }, []);
  
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 max-w-sm w-full transition-all duration-500 
        ${animateOut ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
    >
      <div className={`${achievement.color} rounded-lg shadow-lg p-4 border-2 border-yellow-500`}>
        <div className="flex items-start">
          <div className="text-4xl mr-3 animate-pulse">{achievement.icon}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">Accomplissement débloqué !</h3>
                <h4 className="text-lg font-semibold">{achievement.name}</h4>
              </div>
              <button 
                onClick={handleDismiss}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-sm mt-1">{achievement.description}</p>
            
            {achievement.reward && (
              <div className="mt-2 bg-yellow-900 bg-opacity-20 p-2 rounded text-sm">
                <span className="font-bold">Récompense :</span> {achievement.reward.description}
              </div>
            )}
            
            <div className="mt-3 flex justify-between">
              <button 
                onClick={handleDismiss}
                className="px-3 py-1 rounded bg-gray-800 bg-opacity-30 hover:bg-opacity-50 text-sm"
              >
                OK
              </button>
              
              <button 
                className="px-3 py-1 rounded bg-blue-800 bg-opacity-30 hover:bg-opacity-50 text-sm flex items-center"
                onClick={() => {
                  // This would normally call a sharing function
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(achievement.shareText)}&hashtags=Propagation,GameAchievement`, '_blank');
                  handleDismiss();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Partager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;