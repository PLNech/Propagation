import React, { useEffect } from 'react';
import { Achievement } from '@/types';

interface AchievementNotificationProps {
  achievement: Achievement;
  onDismiss: () => void;
  autoDismissDelay?: number; // Time in ms before auto-dismissing
}


/**
 * Displays a notification when an achievement is unlocked
 * with improved readability and auto-dismiss functionality
 */
const AchievementNotification: React.FC<AchievementNotificationProps> = ({ 
  achievement, 
  onDismiss,
  autoDismissDelay = 5000 // Default to 5 seconds
}) => {
  // Auto-dismiss after specified delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, autoDismissDelay);
    
    // Clean up the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [onDismiss, autoDismissDelay]);

  // Function to generate contrasting text color based on background
  const getTextColor = (bgColor: string): string => {
    // For common Tailwind color classes, return appropriate text color
    if (bgColor.includes('100') || bgColor.includes('200') || bgColor.includes('300') || bgColor.includes('400')) return 'text-black font-bold';
    if (bgColor.includes('600') || bgColor.includes('700') || bgColor.includes('800') || bgColor.includes('900')) return 'text-black font-bold';
    return bgColor.includes('bg-gray-900') ? 'text-white font-bold' : 'text-gray-900 font-bold';
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full transform transition-transform duration-300 ease-in-out">
      <div className={`${achievement.color} rounded-lg shadow-lg p-4 mb-4 border-2 border-gray-200`}>
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{achievement.icon}</span>
            <div>
              <h3 className={`font-bold ${getTextColor(achievement.color)}`}>
                Débloqué : {achievement.name}
              </h3>
              <p className={`text-sm mt-1 ${getTextColor(achievement.color)} opacity-90`}>
                {achievement.description}
              </p>
              
              {achievement.reward && (
                <div className="mt-2 py-1 px-2 rounded bg-black bg-opacity-20 inline-block">
                  <span className="text-sm font-bold text-white">
                    Récompense : {achievement.reward.description}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={onDismiss}
            className="ml-4 text-gray-700 hover:text-gray-900 focus:outline-none p-1 rounded hover:bg-gray-200"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="mt-3 w-full bg-gray-300 bg-opacity-30 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-white h-full rounded-full" 
            style={{ 
              width: '100%',
              animation: `shrink ${autoDismissDelay}ms linear forwards`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;
