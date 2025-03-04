import React, { useState } from 'react';
import { HistoricalEra } from '@/types';

interface HistoricalContextProps {
  era: HistoricalEra;
}

// Function to render text with embedded links
const ReferenceLinks: React.FC<{ text: string }> = ({ text }) => {
  // Define patterns to match and replace with links
  const patterns = [
    { 
      regex: /Darius I/g, 
      url: "https://fr.wikipedia.org/wiki/Darius_Ier", 
      title: "Darius Ier sur Wikipédia" 
    },
    { 
      regex: /inscription de Behistun/g, 
      url: "https://en.wikipedia.org/wiki/Behistun_Inscription", 
      title: "Inscription de Behistun sur Wikipédia" 
    },
    { 
      regex: /L'Arthashastra/g, 
      url: "https://en.wikipedia.org/wiki/Arthashastra", 
      title: "Arthashastra sur Wikipédia" 
    },
    { 
      regex: /'La Guerre des Irlandais contre les Étrangers'/g, 
      url: "https://en.wikipedia.org/wiki/Cogad_Gáedel_re_Gallaib", 
      title: "Cogad Gáedel re Gallaib (The War of the Irish with the Foreigners) sur Wikipédia" 
    },
    { 
      regex: /Dál gCais/g, 
      url: "https://en.wikipedia.org/wiki/D%C3%A1l_gCais", 
      title: "Dál gCais sur Wikipédia" 
    },
    { 
      regex: /'Common Sense'/g, 
      url: "https://en.wikipedia.org/wiki/Common_Sense", 
      title: "Common Sense sur Wikipédia" 
    },
    { 
      regex: /Thomas Paine/g, 
      url: "https://fr.wikipedia.org/wiki/Thomas_Paine", 
      title: "Thomas Paine sur Wikipédia" 
    },
    { 
      regex: /'The Federalist Papers'/g, 
      url: "https://en.wikipedia.org/wiki/The_Federalist_Papers", 
      title: "The Federalist Papers sur Wikipédia" 
    },
    { 
      regex: /Edward Bernays/g, 
      url: "https://fr.wikipedia.org/wiki/Edward_Bernays", 
      title: "Edward Bernays sur Wikipédia" 
    },
    { 
      regex: /'Propaganda'/g, 
      url: "https://en.wikipedia.org/wiki/Propaganda_(book)", 
      title: "Propaganda (livre) sur Wikipédia" 
    },
    { 
      regex: /Chomsky et Herman/g, 
      url: "https://fr.wikipedia.org/wiki/Noam_Chomsky", 
      title: "Noam Chomsky sur Wikipédia" 
    },
    { 
      regex: /'Manufacturing Consent'/g, 
      url: "https://fr.wikipedia.org/wiki/La_Fabrication_du_consentement", 
      title: "La Fabrication du consentement sur Wikipédia" 
    },
    { 
      regex: /Daniel Kahneman/g, 
      url: "https://fr.wikipedia.org/wiki/Daniel_Kahneman", 
      title: "Daniel Kahneman sur Wikipédia" 
    },
    { 
      regex: /'Thinking, Fast and Slow'/g, 
      url: "https://fr.wikipedia.org/wiki/Syst%C3%A8me_1_/_Syst%C3%A8me_2_:_Les_deux_vitesses_de_la_pens%C3%A9e", 
      title: "Système 1 / Système 2 sur Wikipédia" 
    },
    { 
      regex: /Carl Sagan/g, 
      url: "https://fr.wikipedia.org/wiki/Carl_Sagan", 
      title: "Carl Sagan sur Wikipédia" 
    },
    { 
      regex: /'The Demon-Haunted World'/g, 
      url: "https://en.wikipedia.org/wiki/The_Demon-Haunted_World", 
      title: "The Demon-Haunted World sur Wikipédia" 
    },
    { 
      regex: /Yudkowsky/g, 
      url: "https://en.wikipedia.org/wiki/Eliezer_Yudkowsky", 
      title: "Eliezer Yudkowsky sur Wikipédia" 
    },
    { 
      regex: /biais cognitifs/g, 
      url: "https://fr.wikipedia.org/wiki/Biais_cognitif", 
      title: "Biais cognitifs sur Wikipédia" 
    },
    { 
      regex: /bulles de filtres/g, 
      url: "https://fr.wikipedia.org/wiki/Bulle_de_filtre", 
      title: "Bulle de filtre sur Wikipédia" 
    },
    { 
      regex: /deepfakes/g, 
      url: "https://fr.wikipedia.org/wiki/Deepfake", 
      title: "Deepfake sur Wikipédia" 
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

/**
 * Component to display historical context for the current era
 */
const HistoricalContext: React.FC<HistoricalContextProps> = ({ era }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Historical context information by era
  const getHistoricalContext = () => {
    switch(era.id) {
      case 'antiquity':
        return {
          title: "L'Antiquité et la Propagande Monumentale",
          content: "La propagande ne date pas d'hier. Dans l'Antiquité, les dirigeants comme Darius I de Perse utilisaient déjà des monuments comme l'inscription de Behistun (515 av. J.-C.) pour réécrire l'histoire et légitimer leur pouvoir. Ces récits gravés dans la pierre servaient à établir une version officielle des événements, souvent très éloignée de la réalité historique mais cruciale pour maintenir la stabilité du régime.",
          example: "L'Arthashastra, traité indien du 4ème siècle av. J.-C., détaillait déjà des techniques sophistiquées de manipulation pour maintenir le pouvoir, incluant l'usage d'espions, de désinformation et de récits mythiques.",
          reference: "Ces techniques antiques de contrôle de l'information trouvent leur écho moderne dans notre ère numérique, où les monuments numériques remplacent ceux de pierre.",
          links: [
            { text: "En savoir plus sur la propagande antique", url: "https://fr.wikipedia.org/wiki/Propagande" }
          ]
        };
      case 'middleAges':
        return {
          title: "Le Moyen Âge et la Réécriture de l'Histoire",
          content: "'La Guerre des Irlandais contre les Étrangers', chronique du 12ème siècle, illustre parfaitement comment l'histoire peut être réécrite à des fins politiques. Ce texte présentait la dynastie Dál gCais comme les défenseurs légitimes de l'Irlande, bien que leur ascension fût récente. Cette manipulation de l'histoire servait à justifier un ordre politique présent par un passé réinventé.",
          example: "L'autorité religieuse médiévale était souvent invoquée pour valider des décisions politiques, créant une forme de propagande basée sur la crainte divine et la superstition.",
          reference: "Cette fusion entre religion, politique et information perdure aujourd'hui sous des formes plus subtiles, où des arguments d'autorité remplacent souvent la rationalité.",
          links: [
            { text: "Découvrir le sophisme d'autorité", url: "https://fr.wikipedia.org/wiki/Sophisme" }
          ]
        };
      case 'industrial':
        return {
          title: "L'Ère Industrielle et la Persuasion de Masse",
          content: "'Common Sense' (1776) de Thomas Paine et 'The Federalist Papers' (1787-1788) montrent comment des documents écrits stratégiquement peuvent façonner l'opinion publique. Ces textes ont utilisé la simplification, l'appel aux émotions et parfois des pseudonymes pour créer l'illusion d'un consensus plus large qu'il ne l'était en réalité.",
          example: "L'avènement de la presse à grande échelle a permis une diffusion sans précédent de la propagande, créant les premières campagnes médiatiques coordonnées de l'histoire.",
          reference: "Ces techniques ont évolué mais restent fondamentalement similaires dans nos médias modernes, où la simplification excessive et l'appel aux émotions continuent de prévaloir sur la nuance.",
          links: [
            { text: "L'histoire de la propagande politique", url: "https://fr.wikipedia.org/wiki/Propagande_politique" }
          ]
        };
      case 'coldWar':
        return {
          title: "La Guerre Froide et la Propagande Scientifique",
          content: "Edward Bernays, dans 'Propaganda' (1928), et plus tard Chomsky et Herman dans 'Manufacturing Consent' (1988), ont théorisé comment manipuler scientifiquement l'opinion publique. Bernays, neveu de Freud, a appliqué la psychologie à la persuasion de masse, transformant la propagande explicite en 'relations publiques' plus subtiles.",
          example: "Les campagnes de désinformation systématique permettaient de créer une confusion telle que le public finissait par abandonner la recherche de vérité, phénomène que Chomsky appellerait plus tard la 'fabrication du consentement'.",
          reference: "Ces méthodes sophistiquées constituent la base théorique des techniques de manipulation contemporaines, désormais amplifiées par les technologies numériques.",
          links: [
            { text: "La désinformation et ses mécanismes", url: "https://fr.wikipedia.org/wiki/Désinformation" }
          ]
        };
      case 'digital':
        return {
          title: "L'Ère Numérique et l'Exploitation Cognitive",
          content: "Daniel Kahneman ('Thinking, Fast and Slow', 2011) et Carl Sagan ('The Demon-Haunted World', 1995) ont fourni des perspectives cruciales sur notre vulnérabilité cognitive à la manipulation. Kahneman a démontré comment nos biais cognitifs peuvent être systématiquement exploités, tandis que Sagan a proposé des outils pour lutter contre cette exploitation.",
          example: "Les 'bulles de filtres' algorithmiques, les deepfakes et l'exploitation ciblée des biais cognitifs représentent l'évolution ultime des techniques de propagande, rendues d'autant plus efficaces par les technologies d'IA et l'analyse de données massives.",
          reference: "Dans ce contexte, les outils de pensée critique proposés par Sagan et les approches rationnelles défendues par Yudkowsky deviennent essentiels pour naviguer dans un paysage informationnel délibérément conçu pour nous manipuler.",
          links: [
            { text: "Explorer les biais cognitifs", url: "https://fr.wikipedia.org/wiki/Biais_cognitif" },
            { text: "LessWrong et la rationalité", url: "https://www.lesswrong.com/" }
          ]
        };
      default:
        return {
          title: "Contexte Historique",
          content: "Information historique non disponible pour cette ère.",
          example: "",
          reference: "",
          links: []
        };
    }
  };
  
  const context = getHistoricalContext();
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4 border border-gray-700">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-semibold text-amber-300">Contexte : {context.title}</h3>
        <button className="text-gray-400 hover:text-gray-300">
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
        <div className="mt-3 space-y-3 text-sm text-gray-300">
          <p><ReferenceLinks text={context.content} /></p>
          {context.example && (
            <div className="border-l-2 border-amber-500 pl-3 py-1 italic bg-gray-900 bg-opacity-50 rounded">
              <p><ReferenceLinks text={context.example} /></p>
            </div>
          )}
          {context.reference && (
            <p className="text-amber-200 text-xs mt-2"><ReferenceLinks text={context.reference} /></p>
          )}
          
          {context.links && context.links.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-blue-300 space-y-1">
                {context.links.map((link, index) => (
                  <div key={index}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 010-5.656l4-4a4 4 0 015.656 5.656l-1.1 1.1" />
                      </svg>
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoricalContext;