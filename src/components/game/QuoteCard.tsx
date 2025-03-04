import React from 'react';
import { CriticalThinkingQuote } from '@/types';

interface QuoteCardProps {
  quote: CriticalThinkingQuote;
}

/**
 * Card component for displaying inspirational quotes about critical thinking
 * Enhanced with links to author information
 */
const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  // Get Wikipedia link for author
  const getAuthorLink = (author: string): string | null => {
    const authorLinks: Record<string, string> = {
      "Socrate": "https://fr.wikipedia.org/wiki/Socrate",
      "Aristote": "https://fr.wikipedia.org/wiki/Aristote",
      "Francis Bacon": "https://fr.wikipedia.org/wiki/Francis_Bacon_(philosophe)",
      "René Descartes": "https://fr.wikipedia.org/wiki/René_Descartes",
      "Voltaire": "https://fr.wikipedia.org/wiki/Voltaire",
      "Thomas Paine": "https://fr.wikipedia.org/wiki/Thomas_Paine",
      "George Orwell": "https://fr.wikipedia.org/wiki/George_Orwell",
      "Isaac Asimov": "https://fr.wikipedia.org/wiki/Isaac_Asimov",
      "Edward Bernays": "https://fr.wikipedia.org/wiki/Edward_Bernays",
      "Carl Sagan": "https://fr.wikipedia.org/wiki/Carl_Sagan",
      "Noam Chomsky": "https://fr.wikipedia.org/wiki/Noam_Chomsky",
      "Daniel Kahneman": "https://fr.wikipedia.org/wiki/Daniel_Kahneman",
      "Neil deGrasse Tyson": "https://fr.wikipedia.org/wiki/Neil_deGrasse_Tyson",
      "Michael Shermer": "https://en.wikipedia.org/wiki/Michael_Shermer",
      "Eliezer Yudkowsky": "https://en.wikipedia.org/wiki/Eliezer_Yudkowsky"
    };
    
    return authorLinks[author] || null;
  };

  // Get era link
  const getEraLink = (era?: string): string | null => {
    if (!era) return null;
    
    const eraLinks: Record<string, string> = {
      "antiquity": "https://fr.wikipedia.org/wiki/Antiquité",
      "middleAges": "https://fr.wikipedia.org/wiki/Moyen_Âge",
      "industrial": "https://fr.wikipedia.org/wiki/Révolution_industrielle",
      "coldWar": "https://fr.wikipedia.org/wiki/Guerre_froide",
      "digital": "https://fr.wikipedia.org/wiki/Ère_numérique"
    };
    
    return eraLinks[era] || null;
  };

  const authorLink = getAuthorLink(quote.author);
  const eraLink = getEraLink(quote.era);

  return (
    <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-blue-500 mb-4">
      <blockquote className="text-gray-200 italic">
        &quot;{quote.quote}&quot;
      </blockquote>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          — {authorLink ? (
            <a 
              href={authorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
              title={`En savoir plus sur ${quote.author}`}
            >
              {quote.author}
            </a>
          ) : (
            quote.author
          )}
        </p>
        {quote.era && (
          <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
            {eraLink ? (
              <a 
                href={eraLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
                title={`En savoir plus sur cette période historique`}
              >
                {quote.era}
              </a>
            ) : (
              quote.era
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;