import React, { useState } from 'react';
import { EducationalContent, GameAction } from '@/types';

interface EducationalCardProps {
  content: EducationalContent;
  dispatch: React.Dispatch<GameAction>;
}

/**
* Card component for displaying educational content about manipulation techniques
*/
const EducationalCard: React.FC<EducationalCardProps> = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Function to add links to content
  const addLinksToContent = (text: string): React.ReactNode => {
    // Define patterns to match and replace with links
    const patterns = [
      { 
        regex: /Arthashastra/g, 
        url: "https://en.wikipedia.org/wiki/Arthashastra", 
        title: "Arthashastra sur Wikipédia",
        type: "history"
      },
      { 
        regex: /Behistun/g, 
        url: "https://en.wikipedia.org/wiki/Behistun_Inscription", 
        title: "Inscription de Behistun sur Wikipédia",
        type: "history"
      },
      { 
        regex: /Common Sense/g, 
        url: "https://en.wikipedia.org/wiki/Common_Sense", 
        title: "Common Sense sur Wikipédia",
        type: "history"
      },
      { 
        regex: /The Federalist Papers/g, 
        url: "https://en.wikipedia.org/wiki/The_Federalist_Papers", 
        title: "The Federalist Papers sur Wikipédia",
        type: "history"
      },
      { 
        regex: /Propaganda \(1928\)/g, 
        url: "https://en.wikipedia.org/wiki/Propaganda_(book)", 
        title: "Propaganda (livre) sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /Manufacturing Consent/g, 
        url: "https://fr.wikipedia.org/wiki/La_Fabrication_du_consentement", 
        title: "La Fabrication du consentement sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /Thinking, Fast and Slow/g, 
        url: "https://fr.wikipedia.org/wiki/Système_1_/_Système_2_:_Les_deux_vitesses_de_la_pensée", 
        title: "Système 1 / Système 2 sur Wikipédia",
        type: "cognitive"
      },
      { 
        regex: /biais cognitifs/g, 
        url: "https://fr.wikipedia.org/wiki/Biais_cognitif", 
        title: "Biais cognitif sur Wikipédia",
        type: "cognitive"
      },
      { 
        regex: /propagande/g, 
        url: "https://fr.wikipedia.org/wiki/Propagande", 
        title: "Propagande sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /pensée critique/g, 
        url: "https://fr.wikipedia.org/wiki/Pensée_critique", 
        title: "Pensée critique sur Wikipédia",
        type: "philosophy"
      },
      { 
        regex: /méthode scientifique/g, 
        url: "https://fr.wikipedia.org/wiki/Méthode_scientifique", 
        title: "Méthode scientifique sur Wikipédia",
        type: "philosophy"
      },
      { 
        regex: /Rationality \(2015\)/g, 
        url: "https://www.lesswrong.com/rationality", 
        title: "Rationality: From AI to Zombies",
        type: "philosophy"
      },
      { 
        regex: /The Demon-Haunted World/g, 
        url: "https://fr.wikipedia.org/wiki/The_Demon-Haunted_World", 
        title: "The Demon-Haunted World sur Wikipédia",
        type: "philosophy"
      },
      { 
        regex: /Darius I/g, 
        url: "https://fr.wikipedia.org/wiki/Darius_Ier", 
        title: "Darius Ier sur Wikipédia",
        type: "history"
      },
      { 
        regex: /inscription de Behistun/g, 
        url: "https://en.wikipedia.org/wiki/Behistun_Inscription", 
        title: "Inscription de Behistun sur Wikipédia",
        type: "history"
      },
      { 
        regex: /L'Arthashastra/g, 
        url: "https://en.wikipedia.org/wiki/Arthashastra", 
        title: "Arthashastra sur Wikipédia",
        type: "history"
      },
      { 
        regex: /'La Guerre des Irlandais contre les Étrangers'/g, 
        url: "https://en.wikipedia.org/wiki/Cogad_Gáedel_re_Gallaib", 
        title: "Cogad Gáedel re Gallaib sur Wikipédia",
        type: "history"
      },
      { 
        regex: /Dál gCais/g, 
        url: "https://en.wikipedia.org/wiki/D%C3%A1l_gCais", 
        title: "Dál gCais sur Wikipédia",
        type: "history"
      },
      { 
        regex: /'Common Sense'/g, 
        url: "https://en.wikipedia.org/wiki/Common_Sense", 
        title: "Common Sense sur Wikipédia",
        type: "history"
      },
      { 
        regex: /Thomas Paine/g, 
        url: "https://fr.wikipedia.org/wiki/Thomas_Paine", 
        title: "Thomas Paine sur Wikipédia",
        type: "history"
      },
      { 
        regex: /'The Federalist Papers'/g, 
        url: "https://en.wikipedia.org/wiki/The_Federalist_Papers", 
        title: "The Federalist Papers sur Wikipédia",
        type: "history"
      },
      { 
        regex: /Edward Bernays/g, 
        url: "https://fr.wikipedia.org/wiki/Edward_Bernays", 
        title: "Edward Bernays sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /'Propaganda'/g, 
        url: "https://en.wikipedia.org/wiki/Propaganda_(book)", 
        title: "Propaganda (livre) sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /Chomsky et Herman/g, 
        url: "https://fr.wikipedia.org/wiki/Noam_Chomsky", 
        title: "Noam Chomsky sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /'Manufacturing Consent'/g, 
        url: "https://fr.wikipedia.org/wiki/La_Fabrication_du_consentement", 
        title: "La Fabrication du consentement sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /Daniel Kahneman/g, 
        url: "https://fr.wikipedia.org/wiki/Daniel_Kahneman", 
        title: "Daniel Kahneman sur Wikipédia",
        type: "cognitive"
      },
      { 
        regex: /'Thinking, Fast and Slow'/g, 
        url: "https://fr.wikipedia.org/wiki/Syst%C3%A8me_1_/_Syst%C3%A8me_2_:_Les_deux_vitesses_de_la_pens%C3%A9e", 
        title: "Système 1 / Système 2 sur Wikipédia",
        type: "cognitive"
      },
      { 
        regex: /Carl Sagan/g, 
        url: "https://fr.wikipedia.org/wiki/Carl_Sagan", 
        title: "Carl Sagan sur Wikipédia",
        type: "philosophy"
      },
      { 
        regex: /'The Demon-Haunted World'/g, 
        url: "https://en.wikipedia.org/wiki/The_Demon-Haunted_World", 
        title: "The Demon-Haunted World sur Wikipédia",
        type: "philosophy"
      },
      { 
        regex: /Yudkowsky/g, 
        url: "https://en.wikipedia.org/wiki/Eliezer_Yudkowsky", 
        title: "Eliezer Yudkowsky sur Wikipédia",
        type: "philosophy"
      },
      { 
        regex: /bulles de filtres/g, 
        url: "https://fr.wikipedia.org/wiki/Bulle_de_filtre", 
        title: "Bulle de filtre sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /deepfakes/g, 
        url: "https://fr.wikipedia.org/wiki/Deepfake", 
        title: "Deepfake sur Wikipédia",
        type: "propaganda"
      },
      { 
        regex: /sophisme d'autorité/g, 
        url: "https://fr.wikipedia.org/wiki/Argument_d%27autorité", 
        title: "Argument d'autorité sur Wikipédia",
        type: "philosophy"
      },
      { 
        regex: /scepticisme/g, 
        url: "https://fr.wikipedia.org/wiki/Scepticisme", 
        title: "Scepticisme sur Wikipédia",
        type: "philosophy"
      }
    ];
    
    
    // Split text into chunks by pattern matches
    let parts: Array<React.ReactNode> = [text];
    
    // Apply each pattern to replace text with links
    patterns.forEach(pattern => {
      parts = parts.flatMap(part => {
        if (typeof part !== 'string') return [part];
        
        const splitParts: Array<React.ReactNode> = [];
        let lastIndex = 0;
        let match;
        
        // Use regex to find all instances
        const regex = new RegExp(pattern.regex);
        while ((match = regex.exec(part)) !== null) {
          // Add text before match
          if (match.index > lastIndex) {
            splitParts.push(part.substring(lastIndex, match.index));
          }
          
          // Add link for match
          splitParts.push(
            <a 
            key={`${pattern.url}-${match.index}`}
            href={pattern.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline" 
            title={pattern.title}
            >
            {match[0]}
            </a>
          );
          
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < part.length) {
          splitParts.push(part.substring(lastIndex));
        }
        
        return splitParts;
      });
    });
    
    return <>{parts}</>;
  };
  
  // Function to add links to additional resources
  const addLinksToResources = (resources: string): React.ReactNode => {
    // Simple link detector for adding hyperlinks
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    const parts = resources.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
          key={index}
          href={part}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
          >
          {part}
          </a>
        );
      }
      return part;
    });
  };
  
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
      {addLinksToContent(content.content)}
      </p>
      
      {content.additionalResources && (
        <div className="mt-4 text-sm">
        <h4 className="font-medium text-gray-400">Ressources supplémentaires:</h4>
        <p className="text-blue-400">{addLinksToResources(content.additionalResources)}</p>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Cliquez sur les termes soulignés pour en savoir plus</span>
      </div>
      </div>
    )}
    </div>
  );
};

export default EducationalCard;