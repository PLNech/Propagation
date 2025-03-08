import React, { useState, useEffect, useRef } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'ethical';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

/**
 * Component to display game notifications with different styles based on type
 */
const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onDismiss }) => {
  // Use a ref to track notification timeouts across renders
  const timeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
    
    
  useEffect(() => {
    // Create a copy of the current map to use in cleanup
    const currentTimeouts = timeoutRef.current;
    
    // For each notification, set up a timeout if it doesn't already have one
    notifications.forEach(notification => {
      // Only set a new timeout if this notification doesn't already have one
      if (!currentTimeouts.has(notification.id)) {
        console.log(`Setting timeout for notification ${notification.id}, duration: ${notification.duration}ms`);
        const timer = setTimeout(() => {
          console.log(`Auto-dismissing notification ${notification.id}`);
          onDismiss(notification.id);
        }, notification.duration);
        
        // Store the timeout ID
        currentTimeouts.set(notification.id, timer);
      }
    });
    
    // Cleanup function to clear timeouts for notifications that have been removed
    return () => {
      // Get all current notification IDs
      const currentIds = new Set(notifications.map(n => n.id));
      
      // Clear timeouts for notifications that are no longer present
      currentTimeouts.forEach((timer, id) => {
        if (!currentIds.has(id)) {
          clearTimeout(timer);
          currentTimeouts.delete(id);
        }
      });
    };
  }, [notifications, onDismiss]);

  // Get the appropriate styles for each notification type
  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-800 border-green-500';
      case 'error':
        return 'bg-red-800 border-red-500';
      case 'warning':
        return 'bg-yellow-800 border-yellow-500';
      case 'ethical':
        return 'bg-blue-800 border-blue-500';
      case 'info':
      default:
        return 'bg-gray-800 border-gray-500';
    }
  };
  
  // Get the appropriate icon for each notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'ethical':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-xs">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`${getNotificationStyles(notification.type)} border rounded-lg shadow-lg flex items-start p-4 transition-all duration-300 transform translate-x-0`}
        >
          <div className="mr-3 flex-shrink-0">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm">{notification.message}</p>
          </div>
          <button 
            className="ml-3 text-gray-400 hover:text-gray-200"
            onClick={() => onDismiss(notification.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const addNotification = (message: string, type: NotificationType = 'info', duration: number = 3000) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type, duration }]);
    return id;
  };
  
  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  return {
    notifications,
    addNotification,
    dismissNotification
  };
};

export default NotificationSystem;