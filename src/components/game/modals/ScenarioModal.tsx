import React, { useState } from 'react';
import { Scenario, ScenarioChoice } from '@/types';

interface ScenarioModalProps {
  scenario: Scenario;
  onMakeChoice: (scenarioId: string, choiceId: string) => void;
  onDismiss: () => void;
}

/**
 * Modal component for displaying active scenarios and letting players make choices
 */
const ScenarioModal: React.FC<ScenarioModalProps> = ({ scenario, onMakeChoice, onDismiss }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  // Get border and style classes based on the historical era
  const getEraStyles = () => {
    switch(scenario.imageType) {
      case 'ancient':
        return {
          border: 'border-amber-700',
          background: 'bg-amber-950',
          header: 'bg-amber-900',
          font: 'font-serif',
          ornament: '⚔️ 🏛️ 📜'
        };
      case 'medieval':
        return {
          border: 'border-red-800',
          background: 'bg-red-950',
          header: 'bg-red-900',
          font: 'font-serif',
          ornament: '⚜️ 🏰 ⚔️'
        };
      case 'industrial':
        return {
          border: 'border-gray-700',
          background: 'bg-gray-900',
          header: 'bg-gray-800',
          font: 'font-mono',
          ornament: '⚙️ 🏭 🔧'
        };
      case 'modern':
        return {
          border: 'border-blue-800',
          background: 'bg-blue-950',
          header: 'bg-blue-900',
          font: 'font-sans',
          ornament: '📻 📱 🔍'
        };
      case 'digital':
        return {
          border: 'border-purple-700',
          background: 'bg-purple-950',
          header: 'bg-purple-900',
          font: 'font-mono',
          ornament: '💻 🌐 🤖'
        };
      default:
        return {
          border: 'border-gray-600',
          background: 'bg-gray-800',
          header: 'bg-gray-700',
          font: 'font-sans',
          ornament: '📜 📚 🔍'
        };
    }
  };
  
  const styles = getEraStyles();
  
  // Choice card component
  const ChoiceCard = ({ choice }: { choice: ScenarioChoice }) => {
    const isSelected = selectedChoice === choice.id;
    
    // Color based on choice type
    const getChoiceColors = () => {
      switch(choice.type) {
        case 'manipulation':
          return {
            border: isSelected ? 'border-red-500' : 'border-red-900',
            hover: 'hover:border-red-500',
            bg: isSelected ? 'bg-red-900' : 'bg-red-950'
          };
        case 'moderate':
          return {
            border: isSelected ? 'border-yellow-500' : 'border-yellow-900',
            hover: 'hover:border-yellow-500',
            bg: isSelected ? 'bg-yellow-900' : 'bg-yellow-950'
          };
        case 'ethical':
          return {
            border: isSelected ? 'border-green-500' : 'border-green-900',
            hover: 'hover:border-green-500',
            bg: isSelected ? 'bg-green-900' : 'bg-green-950'
          };
        default:
          return {
            border: isSelected ? 'border-gray-400' : 'border-gray-600',
            hover: 'hover:border-gray-400',
            bg: isSelected ? 'bg-gray-700' : 'bg-gray-800'
          };
      }
    };
    
    const colors = getChoiceColors();
    
    return (
      <div 
        className={`p-4 rounded-lg ${colors.border} border-2 ${colors.bg} ${colors.hover} cursor-pointer transition-colors duration-200 mb-3`}
        onClick={() => setSelectedChoice(choice.id)}
      >
        <h3 className="text-lg font-semibold mb-2">{choice.text}</h3>
        <p className="text-sm text-gray-300">{choice.description}</p>
        
        {showResults && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <h4 className="text-sm font-medium mb-2">Conséquences:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {choice.consequences.resources && Object.entries(choice.consequences.resources).map(([resource, value]) => (
                <div key={resource} className="flex justify-between">
                  <span>{resource}:</span>
                  <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {value >= 0 ? '+' : ''}{value}
                  </span>
                </div>
              ))}
              
              {choice.consequences.ethicalScore && (
                <div className="flex justify-between">
                  <span>Éthique:</span>
                  <span className={choice.consequences.ethicalScore >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {choice.consequences.ethicalScore >= 0 ? '+' : ''}{choice.consequences.ethicalScore}
                  </span>
                </div>
              )}
              
              {choice.consequences.criticalThinking && (
                <div className="flex justify-between">
                  <span>Pensée critique:</span>
                  <span className={choice.consequences.criticalThinking >= 0 ? 'text-blue-400' : 'text-red-400'}>
                    {choice.consequences.criticalThinking >= 0 ? '+' : ''}{choice.consequences.criticalThinking}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className={`max-w-4xl w-full ${styles.border} border-2 ${styles.background} rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto ${styles.font}`}>
        {/* Header */}
        <div className={`${styles.header} p-5 border-b ${styles.border}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{scenario.title}</h2>
            <div className="text-lg">{styles.ornament}</div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-6 text-lg text-gray-200 leading-relaxed">
            {scenario.description}
          </div>
          
          {/* Historical context */}
          {scenario.historicalContext && (
            <div className="mb-6 p-4 border-l-4 border-gray-500 bg-gray-800 bg-opacity-50 italic text-gray-300">
              <p>{scenario.historicalContext}</p>
            </div>
          )}
          
          {/* Choices */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Choix</h3>
            {scenario.choices.map(choice => (
              <ChoiceCard key={choice.id} choice={choice} />
            ))}
          </div>
          
          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setShowResults(!showResults)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              {showResults ? 'Masquer les conséquences' : 'Voir les conséquences'}
            </button>
            
            <div className="space-x-3">
              <button
                onClick={onDismiss}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              >
                Reporter à plus tard
              </button>
              
              <button
                onClick={() => selectedChoice && onMakeChoice(scenario.id, selectedChoice)}
                disabled={!selectedChoice}
                className={`px-6 py-2 rounded text-sm ${
                  selectedChoice 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white font-bold' 
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirmer ce choix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioModal;