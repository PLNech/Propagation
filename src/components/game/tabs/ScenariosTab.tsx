import React, { useState } from 'react';
import { Scenario } from '@/types';

interface ScenariosTabProps {
  scenarios: Scenario[];
  completedScenarios: string[];
  currentEraId: string;
  activeScenarioId: string | null;
  onViewScenario: (scenarioId: string) => void;
}

/**
 * Tab component for displaying scenarios history and status
 */
const ScenariosTab: React.FC<ScenariosTabProps> = ({
  scenarios,
  completedScenarios,
  currentEraId,
  activeScenarioId,
  onViewScenario
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'era'>('all');
  

  // Filter scenarios based on selection and reveal them progressively
  const getFilteredScenarios = () => {
    // First, filter by current era and only show scenarios for eras the player has unlocked
    const eraProgression = ['antiquity', 'middleAges', 'industrial', 'coldWar', 'digital'];
    const currentEraIndex = eraProgression.indexOf(currentEraId);
    
    // Get eligible scenarios based on unlocked eras
    let filtered = scenarios.filter(scenario => {
      const scenarioEraIndex = eraProgression.indexOf(scenario.eraId);
      return scenarioEraIndex <= currentEraIndex; // Only show scenarios from current or previous eras
    });
    
    // Progressive revelation: show only next incomplete scenario for each era
    const revealedScenarios: Scenario[] = [];
    
    // Group by era
    const scenariosByEra: Record<string, Scenario[]> = {};
    filtered.forEach(scenario => {
      if (!scenariosByEra[scenario.eraId]) {
        scenariosByEra[scenario.eraId] = [];
      }
      scenariosByEra[scenario.eraId].push(scenario);
    });
    
    // For each era, add completed scenarios + the next incomplete one
    Object.values(scenariosByEra).forEach(eraScenarios => {
      // First add all completed scenarios
      const completedForEra = eraScenarios.filter(s => 
        s.completed || completedScenarios.includes(s.id)
      );
      revealedScenarios.push(...completedForEra);
      
      // Then add the next incomplete scenario if available
      const nextIncomplete = eraScenarios.find(s => 
        !s.completed && !completedScenarios.includes(s.id)
      );
      if (nextIncomplete) {
        revealedScenarios.push(nextIncomplete);
      }
    });
    
    // Now apply any additional filters
    switch (selectedFilter) {
      case 'active':
        // Show active scenarios
        return revealedScenarios.filter(scenario => 
          (activeScenarioId === scenario.id || !scenario.completed) && 
          !completedScenarios.includes(scenario.id)
        );
      case 'completed':
        // Show completed scenarios
        return revealedScenarios.filter(scenario => 
          scenario.completed || completedScenarios.includes(scenario.id)
        );
      case 'era':
        // Show scenarios from current era
        return revealedScenarios.filter(scenario => scenario.eraId === currentEraId);
      case 'all':
      default:
        // All revealed scenarios
        return revealedScenarios;
    }
  };
  
  const filteredScenarios = getFilteredScenarios();
  
  // Group scenarios by era
  const scenariosByEra = filteredScenarios.reduce((acc, scenario) => {
    if (!acc[scenario.eraId]) {
      acc[scenario.eraId] = [];
    }
    acc[scenario.eraId].push(scenario);
    return acc;
  }, {} as Record<string, Scenario[]>);
  
  // Get era name from ID
  const getEraName = (eraId: string) => {
    switch (eraId) {
      case 'antiquity': return 'Antiquité';
      case 'middleAges': return 'Moyen Âge';
      case 'industrial': return 'Ère Industrielle';
      case 'coldWar': return 'Guerre Froide';
      case 'digital': return 'Ère Numérique';
      default: return eraId;
    }
  };
  
  // Calculate total completed scenarios and rewards
  const totalCompleted = completedScenarios.length;
  const totalScenarios = scenarios.length;
  const completionPercentage = Math.round((totalCompleted / totalScenarios) * 100) || 0;
  
  // Calculate choice types made
  const choicesMade = scenarios
    .filter(s => s.completed && s.selectedChoiceId)
    .map(s => {
      const choice = s.choices.find(c => c.id === s.selectedChoiceId);
      return choice ? choice.type : null;
    })
    .filter(type => type !== null);
  
  const manipulationChoices = choicesMade.filter(type => type === 'manipulation').length;
  const moderateChoices = choicesMade.filter(type => type === 'moderate').length;
  const ethicalChoices = choicesMade.filter(type => type === 'ethical').length;
  
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Scénarios & Dilemmes Moraux</h2>
      
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Parcours Narratif</h3>
        <p className="text-sm text-gray-300 mb-4">
          Naviguez à travers des dilemmes moraux inspirés de vrais événements historiques. Vos choix façonneront votre influence et votre éthique, révélant le type de manipulateur ou de révélateur que vous êtes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-3 rounded">
            <h4 className="font-medium mb-1 text-blue-300">Progression des Scénarios</h4>
            <div className="flex items-center">
              <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm">{totalCompleted}/{totalScenarios}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Scénarios complétés</p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded">
            <h4 className="font-medium mb-1 text-purple-300">Vos Choix</h4>
            <div className="grid grid-cols-3 gap-1 text-center">
              <div>
                <span className="text-red-400 block">{manipulationChoices}</span>
                <span className="text-xs text-gray-400">Manipulation</span>
              </div>
              <div>
                <span className="text-yellow-400 block">{moderateChoices}</span>
                <span className="text-xs text-gray-400">Modérés</span>
              </div>
              <div>
                <span className="text-green-400 block">{ethicalChoices}</span>
                <span className="text-xs text-gray-400">Éthiques</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 p-3 rounded">
            <h4 className="font-medium mb-1 text-amber-300">Déclenchement</h4>
            <p className="text-sm">Les scénarios se déclenchent en:</p>
            <ul className="text-xs text-gray-300 mt-1 list-disc pl-5">
              <li>Propageant des théories</li>
              <li>Achetant certaines améliorations</li>
              <li>Atteignant des seuils de ressources</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap mb-4 border-b border-gray-700">
        <button
          className={`py-2 px-4 ${selectedFilter === 'all' ? 'border-b-2 border-blue-500 text-blue-300' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setSelectedFilter('all')}
        >
          Tous
        </button>
        <button
          className={`py-2 px-4 ${selectedFilter === 'active' ? 'border-b-2 border-green-500 text-green-300' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setSelectedFilter('active')}
        >
          Disponibles
        </button>
        <button
          className={`py-2 px-4 ${selectedFilter === 'completed' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setSelectedFilter('completed')}
        >
          Complétés
        </button>
        <button
          className={`py-2 px-4 ${selectedFilter === 'era' ? 'border-b-2 border-amber-500 text-amber-300' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setSelectedFilter('era')}
        >
          Ère Actuelle
        </button>
      </div>
      
      {/* Scenarios list grouped by era */}
      <div className="space-y-6">
        {Object.entries(scenariosByEra).map(([eraId, eraScenarios]) => (
          <div key={eraId} className="border-l-4 border-gray-600 pl-4">
            <h3 className="text-lg font-semibold mb-3">{getEraName(eraId)}</h3>
            
            {eraScenarios.length === 0 ? (
              <p className="text-gray-400 italic">Aucun scénario disponible</p>
            ) : (
              <div className="space-y-4">
                {eraScenarios.map(scenario => {
                  const isActive = activeScenarioId === scenario.id;
                  const isCompleted = scenario.completed || completedScenarios.includes(scenario.id);
                  
                  // Get the selected choice if completed
                  let choiceType = '';
                  let choiceLabel = '';
                  
                  if (isCompleted && scenario.selectedChoiceId) {
                    const choice = scenario.choices.find(c => c.id === scenario.selectedChoiceId);
                    if (choice) {
                      choiceType = choice.type;
                      choiceLabel = choice.text;
                      
                      // Truncate if too long
                      if (choiceLabel.length > 60) {
                        choiceLabel = choiceLabel.substring(0, 60) + '...';
                      }
                    }
                  }
                  
                  return (
                    <div 
                      key={scenario.id} 
                      className={`p-4 rounded-lg border ${
                        isActive 
                          ? 'border-green-600 bg-green-900 bg-opacity-20' 
                          : isCompleted 
                            ? 'border-purple-700 bg-purple-900 bg-opacity-10' 
                            : 'border-gray-700 bg-gray-800 hover:border-blue-600'
                      } cursor-pointer transition-colors duration-200`}
                      onClick={() => onViewScenario(scenario.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-lg">{scenario.title}</h4>
                          <p className="text-sm text-gray-300 mt-1">
                            {isCompleted ? 'Complété' : 'Disponible'}
                          </p>
                        </div>
                        
                        {isActive && (
                          <span className="px-3 py-1 bg-green-800 text-green-200 rounded-full text-xs">
                            Actif
                          </span>
                        )}
                      </div>
                      
                      {isCompleted && choiceType && (
                        <div className="mt-3 pt-3 border-t border-gray-600">
                          <p className="text-sm text-gray-400">Votre choix:</p>
                          <p className={`text-sm mt-1 ${
                            choiceType === 'manipulation' ? 'text-red-400' :
                            choiceType === 'moderate' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {choiceLabel}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        
        {Object.keys(scenariosByEra).length === 0 && (
          <div className="text-center p-6">
            <p className="text-gray-400">Aucun scénario ne correspond à votre sélection</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenariosTab;