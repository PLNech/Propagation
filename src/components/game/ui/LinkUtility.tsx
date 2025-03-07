// src/components/game/ui/LinkUtility.tsx
import React from 'react';

// Pattern type for link definitions
export interface LinkPattern {
  regex: RegExp;
  url: string;
  title: string;
  category?: 'history' | 'philosophy' | 'propaganda' | 'cognitive-bias';
}

// Create separate pattern collections for different contexts
export const upgradePatterns: LinkPattern[] = [
  { 
    regex: /Arthashastra/g, 
    url: "https://en.wikipedia.org/wiki/Arthashastra", 
    title: "Arthashastra sur Wikipédia",
    category: "history"
  },
  { 
    regex: /Behistun/g, 
    url: "https://en.wikipedia.org/wiki/Behistun_Inscription", 
    title: "Inscription de Behistun sur Wikipédia",
    category: "history"
  },
  { 
    regex: /Thomas Paine/g, 
    url: "https://fr.wikipedia.org/wiki/Thomas_Paine", 
    title: "Thomas Paine sur Wikipédia",
    category: "history"
  },
  { 
    regex: /Common Sense/g, 
    url: "https://en.wikipedia.org/wiki/Common_Sense", 
    title: "Common Sense sur Wikipédia",
    category: "history"
  },
  { 
    regex: /The Federalist Papers/g, 
    url: "https://en.wikipedia.org/wiki/The_Federalist_Papers", 
    title: "The Federalist Papers sur Wikipédia",
    category: "history"
  },
  { 
    regex: /Edward Bernays/g, 
    url: "https://fr.wikipedia.org/wiki/Edward_Bernays", 
    title: "Edward Bernays sur Wikipédia",
    category: "propaganda"
  },
  { 
    regex: /Propaganda \(1928\)/g, 
    url: "https://en.wikipedia.org/wiki/Propaganda_(book)", 
    title: "Propaganda (livre) sur Wikipédia",
    category: "propaganda"
  },
  { 
    regex: /Chomsky/g, 
    url: "https://fr.wikipedia.org/wiki/Noam_Chomsky", 
    title: "Noam Chomsky sur Wikipédia",
    category: "propaganda"
  },
  { 
    regex: /Manufacturing Consent/g, 
    url: "https://fr.wikipedia.org/wiki/La_Fabrication_du_consentement", 
    title: "La Fabrication du consentement sur Wikipédia",
    category: "propaganda"
  },
  { 
    regex: /Daniel Kahneman/g, 
    url: "https://fr.wikipedia.org/wiki/Daniel_Kahneman", 
    title: "Daniel Kahneman sur Wikipédia",
    category: "cognitive-bias"
  },
  { 
    regex: /Thinking, Fast and Slow/g, 
    url: "https://fr.wikipedia.org/wiki/Système_1_/_Système_2_:_Les_deux_vitesses_de_la_pensée", 
    title: "Système 1 / Système 2 sur Wikipédia",
    category: "cognitive-bias"
  },
  { 
    regex: /Carl Sagan/g, 
    url: "https://fr.wikipedia.org/wiki/Carl_Sagan", 
    title: "Carl Sagan sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /The Demon-Haunted World/g, 
    url: "https://en.wikipedia.org/wiki/The_Demon-Haunted_World", 
    title: "The Demon-Haunted World sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /Yudkowsky/g, 
    url: "https://en.wikipedia.org/wiki/Eliezer_Yudkowsky", 
    title: "Eliezer Yudkowsky sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /Rationality \(2015\)/g, 
    url: "https://www.lesswrong.com/rationality", 
    title: "Rationality: From AI to Zombies",
    category: "philosophy"
  }
];

// Additional patterns for scenario content
export const scenarioPatterns: LinkPattern[] = [
  ...upgradePatterns,
  { 
    regex: /Oracle de Delphes/g, 
    url: "https://fr.wikipedia.org/wiki/Oracle_de_Delphes", 
    title: "Oracle de Delphes sur Wikipédia",
    category: "history"
  },
  { 
    regex: /Romulus et Remus/g, 
    url: "https://fr.wikipedia.org/wiki/Romulus_et_Rémus", 
    title: "Romulus et Rémus sur Wikipédia",
    category: "history"
  },
  { 
    regex: /hérésie/g, 
    url: "https://fr.wikipedia.org/wiki/Hérésie", 
    title: "Hérésie sur Wikipédia",
    category: "history"
  },
  { 
    regex: /Chevaliers Templiers/g, 
    url: "https://fr.wikipedia.org/wiki/Ordre_du_Temple", 
    title: "Ordre du Temple sur Wikipédia",
    category: "history"
  }
];

// Additional patterns for theories
export const theoryPatterns: LinkPattern[] = [
  ...upgradePatterns,
  { 
    regex: /astronomes anciens/gi, 
    url: "https://fr.wikipedia.org/wiki/Histoire_de_l%27astronomie", 
    title: "Histoire de l'astronomie sur Wikipédia",
    category: "history"
  },
  { 
    regex: /lignées royales/gi, 
    url: "https://fr.wikipedia.org/wiki/Dynastie", 
    title: "Dynasties sur Wikipédia",
    category: "history"
  },
  { 
    regex: /secrets des Templiers/gi, 
    url: "https://fr.wikipedia.org/wiki/Mythologie_templière", 
    title: "Mythologie templière sur Wikipédia",
    category: "history"
  },
  { 
    regex: /sabotage industriel/gi, 
    url: "https://fr.wikipedia.org/wiki/Sabotage", 
    title: "Sabotage sur Wikipédia",
    category: "history"
  },
  { 
    regex: /sociétés secrètes/gi, 
    url: "https://fr.wikipedia.org/wiki/Société_secrète", 
    title: "Société secrète sur Wikipédia",
    category: "history"
  },
  { 
    regex: /contrôle mental/gi, 
    url: "https://fr.wikipedia.org/wiki/Contrôle_mental", 
    title: "Contrôle mental sur Wikipédia",
    category: "propaganda"
  },
  { 
    regex: /extraterrestres/gi, 
    url: "https://fr.wikipedia.org/wiki/Vie_extraterrestre", 
    title: "Vie extraterrestre sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /surveillance/gi, 
    url: "https://fr.wikipedia.org/wiki/Surveillance_de_masse", 
    title: "Surveillance de masse sur Wikipédia",
    category: "propaganda"
  },
  { 
    regex: /nanopuces/gi, 
    url: "https://fr.wikipedia.org/wiki/Théorie_du_complot", 
    title: "Théorie du complot sur Wikipédia",
    category: "propaganda"
  },
  { 
    regex: /réalité virtuelle/gi, 
    url: "https://fr.wikipedia.org/wiki/Réalité_virtuelle", 
    title: "Réalité virtuelle sur Wikipédia",
    category: "philosophy"
  }
];

// Additional patterns for ethical actions
export const ethicsPatterns: LinkPattern[] = [
  ...upgradePatterns,
  { 
    regex: /dialogue socratique/gi, 
    url: "https://fr.wikipedia.org/wiki/Dialogue_socratique", 
    title: "Dialogue socratique sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /pensée critique/gi, 
    url: "https://fr.wikipedia.org/wiki/Pensée_critique", 
    title: "Pensée critique sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /méthode scientifique/gi, 
    url: "https://fr.wikipedia.org/wiki/Méthode_scientifique", 
    title: "Méthode scientifique sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /LessWrong/gi, 
    url: "https://www.lesswrong.com", 
    title: "LessWrong - Communauté de rationalité",
    category: "philosophy"
  },
  { 
    regex: /scepticisme/gi, 
    url: "https://fr.wikipedia.org/wiki/Scepticisme_scientifique", 
    title: "Scepticisme scientifique sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /vérification des faits/gi, 
    url: "https://fr.wikipedia.org/wiki/Vérification_des_faits", 
    title: "Vérification des faits sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /journalisme d'investigation/gi, 
    url: "https://fr.wikipedia.org/wiki/Journalisme_d%27investigation", 
    title: "Journalisme d'investigation sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /éducation aux médias/gi, 
    url: "https://fr.wikipedia.org/wiki/Éducation_aux_médias", 
    title: "Éducation aux médias sur Wikipédia",
    category: "philosophy"
  },
  { 
    regex: /détection des deepfakes/gi, 
    url: "https://fr.wikipedia.org/wiki/Deepfake", 
    title: "Deepfake sur Wikipédia",
    category: "propaganda"
  }
];

interface ReferenceLinksProps {
  text: string;
  patterns: LinkPattern[];
  className?: string;
  onLinkClick?: (link: LinkPattern) => void;
}

// Function to render text with embedded links
export const ReferenceLinks: React.FC<ReferenceLinksProps> = ({ 
  text, 
  patterns,
  className = "",
  onLinkClick
}) => {
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
            className={`text-blue-400 hover:underline ${className}`}
            title={pattern.title}
            onClick={() => onLinkClick && onLinkClick(pattern)}
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