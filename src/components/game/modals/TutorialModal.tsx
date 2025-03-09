import React, { useState } from 'react';

interface TutorialModalProps {
  onClose: () => void;
}

/**
 * Modal component for introducing the game mechanics to new players
 */
const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  
  const getStepContent = () => {
    switch(step) {
      case 1:
        return {
          title: "Bienvenue dans Propagation",
          content: "Un jeu incrémental sur l'information, la manipulation et la pensée critique. Ce tutoriel vous guidera à travers les bases du jeu.",
          image: "📢"
        };
      case 2:
        return {
          title: "Les Ressources",
          content: "Générez des Points de Manipulation en cliquant sur 'Manipuler', puis dépensez-les pour obtenir d'autres ressources: Crédibilité (vérité perçue), Influence (portée sociale) et Réseaux (canaux de diffusion).",
          image: "🔄"
        };
      case 3:
        return {
          title: "Progression Historique",
          content: "Débloquez de nouvelles ères historiques pour accéder à des techniques de manipulation plus avancées. Chaque ère offre des multiplicateurs uniques et des améliorations à acheter.",
          image: "📜"
        };
      case 4:
        return {
          title: "Le Dilemme Éthique",
          content: "Vous pouvez propager des théories du complot pour gagner rapidement en influence, ou choisir des actions éthiques pour développer la pensée critique. Ce choix affectera votre fin de jeu.",
          image: "⚖️"
        };
      case 5:
        return {
          title: "Commencez Votre Voyage",
          content: "Allez-y doucement au début. Accumulez des Points de Manipulation, investissez dans d'autres ressources, et explorez l'onglet Progression dès que possible pour débloquer de nouvelles possibilités.",
          image: "🚀"
        };
      default:
        return {
          title: "Erreur",
          content: "Étape inconnue",
          image: "❓"
        };
    }
  };
  
  const content = getStepContent();
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black opacity-93 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-md w-full border border-gray-600 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">{content.title}</h2>
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col items-center mb-6">
            <div className="text-5xl mb-6">{content.image}</div>
            <p className="text-gray-300 text-center">{content.content}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className={`px-4 py-2 rounded ${
                step === 1 
                  ? 'bg-gray-700 cursor-not-allowed text-gray-500' 
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              Précédent
            </button>
            
            <div className="flex items-center">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 w-2 rounded-full mx-1 ${
                    index + 1 === step ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white"
            >
              {step === totalSteps ? 'Commencer' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialModal;