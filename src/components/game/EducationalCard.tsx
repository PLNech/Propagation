import React, { useState } from 'react';
import { EducationalContent } from './types';

interface EducationalCardProps {
  content: EducationalContent;
}

/**
 * Card component for displaying educational content about manipulation techniques
 */
const EducationalCard: React.FC<EducationalCardProps> = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800 mb-4">
      <div 
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-semibold">{content.title}</h3>
        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600">
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 border-t border-gray-700">
          <p className="text-gray-300 text-sm leading-relaxed">
            {content.content}
          </p>
          
          {content.additionalResources && (
            <div className="mt-4 text-sm">
              <h4 className="font-medium text-gray-400">Ressources supplémentaires:</h4>
              <p className="text-blue-400">{content.additionalResources}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationalCard;