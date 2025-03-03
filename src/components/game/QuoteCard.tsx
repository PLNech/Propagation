import React from 'react';
import { CriticalThinkingQuote } from '@/types';

interface QuoteCardProps {
  quote: CriticalThinkingQuote;
}

/**
 * Card component for displaying inspirational quotes about critical thinking
 */
const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-blue-500 mb-4">
      <blockquote className="text-gray-200 italic">
        &quot;{quote.quote}&quot;
      </blockquote>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-gray-400 text-sm">— {quote.author}</p>
        {quote.era && (
          <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
            {quote.era}
          </span>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;