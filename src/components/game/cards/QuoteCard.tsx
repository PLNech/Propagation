
import React from 'react';
import { CriticalThinkingQuote, GameAction } from '@/types';

interface QuoteCardProps {
  quote: CriticalThinkingQuote;
  dispatch: React.Dispatch<GameAction>;
}

// Get Wikipedia link for author with tracking
const AuthorLink = ({ author, dispatch }: { author: string, dispatch: React.Dispatch<GameAction> }) => {
  const authorLinks: Record<string, { url: string, type: string }> = {
    "Socrate": { url: "https://fr.wikipedia.org/wiki/Socrate", type: "philosophy" },
    "Aristote": { url: "https://fr.wikipedia.org/wiki/Aristote", type: "philosophy" },
    "Francis Bacon": { url: "https://fr.wikipedia.org/wiki/Francis_Bacon_(philosophe)", type: "philosophy" },
    "René Descartes": { url: "https://fr.wikipedia.org/wiki/René_Descartes", type: "philosophy" },
    "Voltaire": { url: "https://fr.wikipedia.org/wiki/Voltaire", type: "philosophy" },
    "Thomas Paine": { url: "https://fr.wikipedia.org/wiki/Thomas_Paine", type: "philosophy" },
    "George Orwell": { url: "https://fr.wikipedia.org/wiki/George_Orwell", type: "literature" },
    "Isaac Asimov": { url: "https://fr.wikipedia.org/wiki/Isaac_Asimov", type: "literature" },
    "Edward Bernays": { url: "https://fr.wikipedia.org/wiki/Edward_Bernays", type: "media" },
    "Carl Sagan": { url: "https://fr.wikipedia.org/wiki/Carl_Sagan", type: "science" },
    "Noam Chomsky": { url: "https://fr.wikipedia.org/wiki/Noam_Chomsky", type: "linguistics" },
    "Daniel Kahneman": { url: "https://fr.wikipedia.org/wiki/Daniel_Kahneman", type: "psychology" },
    "Neil deGrasse Tyson": { url: "https://fr.wikipedia.org/wiki/Neil_deGrasse_Tyson", type: "science" },
    "Michael Shermer": { url: "https://en.wikipedia.org/wiki/Michael_Shermer", type: "skepticism" },
    "Eliezer Yudkowsky": { url: "https://en.wikipedia.org/wiki/Eliezer_Yudkowsky", type: "rationality" }
  };
  
  const linkInfo = authorLinks[author];
  
  if (!linkInfo) return <>{author}</>;
  
  return (
    <a 
      href={linkInfo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:underline"
      title={`En savoir plus sur ${author}`}
      onClick={() => {
        // Track the link click
        dispatch({ 
          type: 'CLICK_LORE_LINK', 
          payload: { 
            linkType: linkInfo.type,
            url: linkInfo.url 
          } 
        });
      }}
    >
      {author}
    </a>
  );
};

// Era link component with tracking
const EraLink = ({ era, dispatch }: { era: string, dispatch: React.Dispatch<GameAction> }) => {
  const eraLinks: Record<string, { url: string, type: string }> = {
    "antiquity": { url: "https://fr.wikipedia.org/wiki/Antiquité", type: "historical_era" },
    "middleAges": { url: "https://fr.wikipedia.org/wiki/Moyen_Âge", type: "historical_era" },
    "industrial": { url: "https://fr.wikipedia.org/wiki/Révolution_industrielle", type: "historical_era" },
    "coldWar": { url: "https://fr.wikipedia.org/wiki/Guerre_froide", type: "historical_era" },
    "digital": { url: "https://fr.wikipedia.org/wiki/Ère_numérique", type: "historical_era" }
  };
  
  const linkInfo = eraLinks[era];
  
  if (!linkInfo) return <>{era}</>;
  
  return (
    <a 
      href={linkInfo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-300 hover:underline"
      title={`En savoir plus sur cette période historique`}
      onClick={() => {
        // Track the link click
        dispatch({ 
          type: 'CLICK_LORE_LINK', 
          payload: { 
            linkType: linkInfo.type,
            url: linkInfo.url 
          } 
        });
      }}
    >
      {era}
    </a>
  );
};

/**
 * Card component for displaying inspirational quotes about critical thinking
 * Enhanced with links to author information
 */
const QuoteCard: React.FC<QuoteCardProps> = ({ quote, dispatch }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-blue-500 mb-4">
      <blockquote className="text-gray-200 italic">
        &quot;{quote.quote}&quot;
      </blockquote>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          — <AuthorLink author={quote.author} dispatch={dispatch} />
        </p>
        {quote.era && (
          <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
            <EraLink era={quote.era} dispatch={dispatch} />
          </span>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;