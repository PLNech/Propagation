import React, { useState } from 'react';
import { HistoricalEra } from '@/types';

interface HistoricalContextProps {
  era: HistoricalEra;
}

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
          reference: "Ces techniques antiques de contrôle de l'information trouvent leur écho moderne dans notre ère numérique, où les monuments numériques remplacent ceux de pierre."
        };
      case 'middleAges':
        return {
          title: "Le Moyen Âge et la Réécriture de l'Histoire",
          content: "'La Guerre des Irlandais contre les Étrangers', chronique du 12ème siècle, illustre parfaitement comment l'histoire peut être réécrite à des fins politiques. Ce texte présentait la dynastie Dál gCais comme les défenseurs légitimes de l'Irlande, bien que leur ascension fût récente. Cette manipulation de l'histoire servait à justifier un ordre politique présent par un passé réinventé.",
          example: "L'autorité religieuse médiévale était souvent invoquée pour valider des décisions politiques, créant une forme de propagande basée sur la crainte divine et la superstition.",
          reference: "Cette fusion entre religion, politique et information perdure aujourd'hui sous des formes plus subtiles, où des arguments d'autorité remplacent souvent la rationalité."
        };
      case 'industrial':
        return {
          title: "L'Ère Industrielle et la Persuasion de Masse",
          content: "'Common Sense' (1776) de Thomas Paine et 'The Federalist Papers' (1787-1788) montrent comment des documents écrits stratégiquement peuvent façonner l'opinion publique. Ces textes ont utilisé la simplification, l'appel aux émotions et parfois des pseudonymes pour créer l'illusion d'un consensus plus large qu'il ne l'était en réalité.",
          example: "L'avènement de la presse à grande échelle a permis une diffusion sans précédent de la propagande, créant les premières campagnes médiatiques coordonnées de l'histoire.",
          reference: "Ces techniques ont évolué mais restent fondamentalement similaires dans nos médias modernes, où la simplification excessive et l'appel aux émotions continuent de prévaloir sur la nuance."
        };
      case 'coldWar':
        return {
          title: "La Guerre Froide et la Propagande Scientifique",
          content: "Edward Bernays, dans 'Propaganda' (1928), et plus tard Chomsky et Herman dans 'Manufacturing Consent' (1988), ont théorisé comment manipuler scientifiquement l'opinion publique. Bernays, neveu de Freud, a appliqué la psychologie à la persuasion de masse, transformant la propagande explicite en 'relations publiques' plus subtiles.",
          example: "Les campagnes de désinformation systématique permettaient de créer une confusion telle que le public finissait par abandonner la recherche de vérité, phénomène que Chomsky appellerait plus tard la 'fabrication du consentement'.",
          reference: "Ces méthodes sophistiquées constituent la base théorique des techniques de manipulation contemporaines, désormais amplifiées par les technologies numériques."
        };
      case 'digital':
        return {
          title: "L'Ère Numérique et l'Exploitation Cognitive",
          content: "Daniel Kahneman ('Thinking, Fast and Slow', 2011) et Carl Sagan ('The Demon-Haunted World', 1995) ont fourni des perspectives cruciales sur notre vulnérabilité cognitive à la manipulation. Kahneman a démontré comment nos biais cognitifs peuvent être systématiquement exploités, tandis que Sagan a proposé des outils pour lutter contre cette exploitation.",
          example: "Les 'bulles de filtres' algorithmiques, les deepfakes et l'exploitation ciblée des biais cognitifs représentent l'évolution ultime des techniques de propagande, rendues d'autant plus efficaces par les technologies d'IA et l'analyse de données massives.",
          reference: "Dans ce contexte, les outils de pensée critique proposés par Sagan et les approches rationnelles défendues par Yudkowsky deviennent essentiels pour naviguer dans un paysage informationnel délibérément conçu pour nous manipuler."
        };
      default:
        return {
          title: "Contexte Historique",
          content: "Information historique non disponible pour cette ère.",
          example: "",
          reference: ""
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
          <p>{context.content}</p>
          {context.example && (
            <div className="border-l-2 border-amber-500 pl-3 py-1 italic bg-gray-900 bg-opacity-50 rounded">
              <p>{context.example}</p>
            </div>
          )}
          {context.reference && (
            <p className="text-amber-200 text-xs mt-2">{context.reference}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoricalContext;