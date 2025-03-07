import React, { useState, useRef, useEffect } from 'react';

interface ResourceLink {
  title: string;
  url: string;
  description: string;
  category: 'critical-thinking' | 'propaganda' | 'cognitive-bias' | 'historical' | 'rationality';
}

/**
 * Star Wars style credits component
 */
const StarWarsCredits = ({ onClose }: { onClose: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Handle hidden achievement trigger for clicking on personal link
  const handleCreatorLinkClick = () => {
    // This would be connected to the achievement system in a real implementation
    if (window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
      (window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as any).dispatch({ 
        type: 'UNLOCK_SECRET_ACHIEVEMENT', 
        payload: { achievementId: 'found_creator_link' } 
      });
    }
  };

  // Set up animation loop
  useEffect(() => {
    // Play sound effect when credits open
    const achievementSound = new Audio('/achievement.mp3');
    achievementSound.volume = 0.5;
    achievementSound.play().catch(e => console.log('Audio playback prevented:', e));
    
    let startTime = performance.now();
    let prevTime = startTime;
    
    // Add escape key listener
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    // Add history state to handle mobile back button
    window.history.pushState({ creditsOpen: true }, '');
    const handlePopState = () => {
      onClose();
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('popstate', handlePopState);
    
    // Animation function
    const animate = (time: number) => {
      // Calculate time delta for smooth animation
      const deltaTime = time - prevTime;
      prevTime = time;
      
      // Slow scrolling speed (adjust the divisor for speed)
      const newPosition = scrollPosition + (deltaTime / 50);
      setScrollPosition(newPosition);
      
      // Loop the credits when they're scrolled enough
      if (creditsRef.current && containerRef.current) {
        const contentHeight = creditsRef.current.offsetHeight;
        const containerHeight = containerRef.current.offsetHeight;
        
        // Reset position when credits have scrolled out of view
        if (newPosition > contentHeight) {
          setScrollPosition(-containerHeight * 0.8);
        }
      }
      
      // Continue animation loop
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose, scrollPosition]);
  
  // Calculate responsive font sizes
  const fontSize = {
    title: "min(8vw, 4rem)",
    heading: "min(6vw, 3rem)",
    subheading: "min(5vw, 2.5rem)",
    text: "min(4vw, 2rem)",
    small: "min(3vw, 1.5rem)"
  };
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Stars background - using divs to create a starfield effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>
      
      {/* Credits content container with perspective effect */}
      <div 
        ref={containerRef}
        className="relative w-full h-full overflow-hidden" 
        style={{ perspective: '400px' }}
      >
        {/* Scrolling container */}
        <div 
          ref={creditsRef}
          className="absolute left-0 right-0 text-center text-yellow-300 w-full"
          style={{
            fontFamily: "'SF Distant Galaxy', Arial, sans-serif",
            transform: `translateY(${-scrollPosition}px) rotateX(25deg)`,
            transformOrigin: '50% 100%',
            paddingTop: '100vh',
            paddingBottom: '150vh'
          }}
        >
          {/* Credits content */}
          <div className="w-4/5 mx-auto">
            <h1 style={{ fontSize: fontSize.title, marginBottom: '3rem' }}>CREDITS</h1>
            
            <h2 style={{ fontSize: fontSize.heading, marginBottom: '2rem' }}>The Internet ❤️</h2>
            <p style={{ fontSize: fontSize.text, marginBottom: '4rem' }}>🔌</p>
            
            <h2 style={{ fontSize: fontSize.heading, marginBottom: '2rem' }}>
              <a 
                href="https://freesound.org/people/LaurenPonder/sounds/635665/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white"
              >
                Lauren Ponder
              </a>
            </h2>
            <p style={{ fontSize: fontSize.text, marginBottom: '4rem' }}>for the sound of Achievements</p>

            <h2 style={{ fontSize: fontSize.heading, marginBottom: '2rem' }}>HTML, JavaScript, et CSS</h2>
            <p style={{ fontSize: fontSize.text, marginBottom: '4rem' }}>the backbone of our Wonderland 🌎</p>

            <h2 style={{ fontSize: fontSize.heading, marginBottom: '2rem' }}>React, Next.js, Tailwind.css</h2>
            <p style={{ fontSize: fontSize.text, marginBottom: '4rem' }}>and the modern web stack 👏</p>

            <h2 style={{ fontSize: fontSize.heading, marginBottom: '2rem' }}>Modern IDEs and ctrl+space</h2>
            <p style={{ fontSize: fontSize.text, marginBottom: '4rem' }}>From the ancient Eclipse to the mighty Cursor 🚀</p>

            <h2 style={{ fontSize: fontSize.subheading, marginBottom: '3rem' }}>Huge thanks as well to</h2>

            <h3 style={{ fontSize: fontSize.subheading, marginBottom: '1.5rem' }}>Debuggers</h3>
            <p style={{ fontSize: fontSize.text, marginBottom: '1.5rem' }}>from console.log to breakpoint-hell,</p>
            <p style={{ fontSize: fontSize.text, marginBottom: '1.5rem' }}>variable introspection paradise,</p>
            <p style={{ fontSize: fontSize.text, marginBottom: '3rem' }}>and everything in between 🔦</p>

            <h3 style={{ fontSize: fontSize.subheading, marginBottom: '1.5rem' }}>Language Models</h3>
            <p style={{ fontSize: fontSize.text, marginBottom: '3rem' }}>from SpaCy to the one rephrasing this sentence 📜✒️</p>

            <h3 style={{ fontSize: fontSize.subheading, marginBottom: '1.5rem' }}>Anthropic</h3>
            <p style={{ fontSize: fontSize.text, marginBottom: '3rem' }}>for showing *how* it's done 🤗</p>

            <h3 style={{ fontSize: fontSize.subheading, marginBottom: '1.5rem' }}>and Claude</h3>
            <p style={{ fontSize: fontSize.text, marginBottom: '3rem' }}>for being a worthy _it_</p>

            <h3 style={{ fontSize: fontSize.subheading, marginBottom: '1.5rem' }}>
              <span>Thanks for bearing with</span>
              <a 
                href="https://me.plnech.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white"
                onClick={handleCreatorLinkClick}
              >
                me
              </a>
            </h3>
            <p style={{ fontSize: fontSize.text, marginBottom: '1.5rem' }}>as we discover together</p>
            <p style={{ fontSize: fontSize.text, marginBottom: '5rem' }}>this Brave New World &lt;3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * About page component with information about the game and educational resources
 */
const AboutPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'resources'>('about');
  const [showCredits, setShowCredits] = useState(false);
  
  // Organized educational resources
  const resources: ResourceLink[] = [
    // Critical Thinking Resources
    {
      title: "Pensée critique",
      url: "https://fr.wikipedia.org/wiki/Pensée_critique",
      description: "Aperçu du processus d'analyse et d'évaluation objective de l'information",
      category: "critical-thinking"
    },
    {
      title: "Scepticisme",
      url: "https://fr.wikipedia.org/wiki/Scepticisme",
      description: "La remise en question méthodique comme outil de recherche de vérité",
      category: "critical-thinking"
    },
    {
      title: "Méthode scientifique",
      url: "https://fr.wikipedia.org/wiki/Méthode_scientifique",
      description: "Processus systématique d'acquisition de connaissances basé sur l'observation et l'expérimentation",
      category: "critical-thinking"
    },
    {
      title: "LessWrong",
      url: "https://www.lesswrong.com/",
      description: "Communauté explorant les mécanismes de pensée rationnelle et de prise de décision",
      category: "rationality"
    },
    
    // Rationality Resources
    {
      title: "Rationalisme",
      url: "https://fr.wikipedia.org/wiki/Rationalisme",
      description: "Courant philosophique qui privilégie la raison comme source de connaissance",
      category: "rationality"
    },
    {
      title: "Rationalité",
      url: "https://fr.wikipedia.org/wiki/Rationalité",
      description: "Concept de conformité à la raison dans la pensée et l'action",
      category: "rationality"
    },
    {
      title: "Raisonnement",
      url: "https://fr.wikipedia.org/wiki/Raisonnement",
      description: "Processus cognitif permettant d'aboutir à une conclusion à partir de prémisses",
      category: "rationality"
    },
    {
      title: "Argumentation",
      url: "https://fr.wikipedia.org/wiki/Argumentation",
      description: "Art d'utiliser le raisonnement pour persuader de manière éthique",
      category: "rationality"
    },
    
    // Propaganda & Manipulation Resources
    {
      title: "Propagande",
      url: "https://fr.wikipedia.org/wiki/Propagande",
      description: "Techniques de diffusion d'information visant à influencer l'opinion publique",
      category: "propaganda"
    },
    {
      title: "Désinformation",
      url: "https://fr.wikipedia.org/wiki/Désinformation",
      description: "Diffusion délibérée d'informations fausses ou trompeuses",
      category: "propaganda"
    },
    {
      title: "Manipulation mentale",
      url: "https://fr.wikipedia.org/wiki/Manipulation_mentale",
      description: "Techniques visant à influencer la pensée et le comportement d'autrui",
      category: "propaganda"
    },
    {
      title: "Théorie du complot",
      url: "https://fr.wikipedia.org/wiki/Théorie_du_complot",
      description: "Explication d'événements par l'action secrète d'un groupe puissant",
      category: "propaganda"
    },
    {
      title: "Propaganda (livre)",
      url: "https://en.wikipedia.org/wiki/Propaganda_(book)",
      description: "Ouvrage d'Edward Bernays (1928) fondateur des relations publiques modernes",
      category: "propaganda"
    },
    
    // Cognitive Bias Resources
    {
      title: "Biais cognitif",
      url: "https://fr.wikipedia.org/wiki/Biais_cognitif",
      description: "Mécanismes de pensée qui dévient de la pensée logique ou rationnelle",
      category: "cognitive-bias"
    },
    {
      title: "Sophisme",
      url: "https://fr.wikipedia.org/wiki/Sophisme",
      description: "Raisonnement fallacieux conçu pour tromper",
      category: "cognitive-bias"
    },
    {
      title: "Pensée magique",
      url: "https://fr.wikipedia.org/wiki/Pensée_magique",
      description: "Croyance qu'une pensée ou action peut influencer la réalité sans lien causal",
      category: "cognitive-bias"
    },
    {
      title: "Psychologie cognitive",
      url: "https://fr.wikipedia.org/wiki/Psychologie_cognitive",
      description: "Étude des processus mentaux liés à l'acquisition et au traitement de l'information",
      category: "cognitive-bias"
    },
    
    // Historical Examples
    {
      title: "Inscription de Behistun",
      url: "https://en.wikipedia.org/wiki/Behistun_Inscription",
      description: "Monument de propagande de Darius I (515 av. J.-C.)",
      category: "historical"
    },
    {
      title: "Arthashastra",
      url: "https://en.wikipedia.org/wiki/Arthashastra",
      description: "Traité indien ancien (4e siècle av. J.-C.) détaillant des techniques de manipulation",
      category: "historical"
    },
    {
      title: "Common Sense",
      url: "https://en.wikipedia.org/wiki/Common_Sense",
      description: "Pamphlet de Thomas Paine (1776) qui a joué un rôle clé dans la révolution américaine",
      category: "historical"
    },
    {
      title: "The Federalist Papers",
      url: "https://en.wikipedia.org/wiki/The_Federalist_Papers",
      description: "Série d'articles (1787-1788) promouvant la ratification de la Constitution américaine",
      category: "historical"
    }
  ];

  // Filter resources by category
  const criticalThinkingResources = resources.filter(r => r.category === 'critical-thinking');
  const rationalityResources = resources.filter(r => r.category === 'rationality');
  const propagandaResources = resources.filter(r => r.category === 'propaganda');
  const biasResources = resources.filter(r => r.category === 'cognitive-bias');
  const historicalResources = resources.filter(r => r.category === 'historical');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full border border-gray-600 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">À propos de Propagation</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex mb-6 border-b border-gray-700">
            <button
              className={`py-2 px-4 ${activeTab === 'about' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('about')}
            >
              Le Projet
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'resources' ? 'border-b-2 border-green-500 text-green-300' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('resources')}
            >
              Ressources
            </button>
          </div>
          
          <div className="space-y-6">
            {activeTab === 'about' && (
              <>
                <section>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">L&apos;approche maïeutique</h3>
                  <p className="text-gray-300 mb-4">
                    <i>Propagation</i> emploie une philosophie éducative maïeutique — au lieu de vous dire quoi penser, il crée des conditions pour que vous découvriez des idées par l&apos;expérience.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Comme la <a href="https://fr.wikipedia.org/wiki/Maïeutique" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">méthode socratique</a> qui aide à accoucher de ses propres réalisations, <i>Propagation</i> ne prêche pas contre la désinformation. Au lieu de cela, il vous met aux commandes de sa création, vous fait expérimenter ses effets et confronter les conséquences.
                  </p>
                  <p className="text-gray-300">
                    Les systèmes du jeu sont conçus pour déclencher des moments de réflexion : &apos;Suis-je manipulé par un jeu sur la manipulation ?&apos; ou &apos;Pourquoi propager cette théorie du complot est-il si efficace mais troublant ?&apos;
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-300">Objectif éducatif</h3>
                  <p className="text-gray-300 mb-4">
                    Ce jeu vise à sensibiliser aux mécanismes de propagation de la désinformation et à développer l&apos;esprit critique des joueurs. En vous plaçant dans la position de celui qui manipule, vous comprenez mieux comment fonctionne la manipulation.
                  </p>
                  <p className="text-gray-300">
                    Les choix éthiques du jeu vous confrontent à des dilemmes réels : est-il justifiable de manipuler pour une &apos;bonne cause&apos; ? Comment équilibrer efficacité et intégrité ? Ces questions n&apos;ont pas de réponses simples, mais y réfléchir développe votre résistance aux manipulations du monde réel.
                  </p>
                </section>
                
                <section>
                  <h3 className="text-xl font-semibold mb-3 text-blue-300">Collaboration Humain × IA</h3>
                  <p className="text-gray-300 mb-4">
                    <i>Propagation</i> représente un nouveau type de partenariat créatif — une collaboration humain-IA où :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                  <li>La <span className="text-blue-300">direction humaine</span> a fourni la vision créative, les garde-fous éthiques et le contexte réel. Ah, et de la relecture/réécriture, de la sueur, du debug en veux-tu en voilà, du déblocage d'IA qui tourne en rond, et autre flexibilité bien humaine :P</li>
                  </ul>
                  <p className="text-gray-300">
                    Ce projet a évolué grâce à un dialogue significatif — des cycles itératifs de définition d&apos;objectifs humains, propositions de l&apos;IA, raffinement collaboratif et réflexion éthique.
                  </p>
                </section>

                {/* Credits button */}
                <section className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowCredits(true)}
                    className="px-6 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-md shadow transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Voir les Crédits
                  </button>
                </section>
              </>
            )}
            
            {activeTab === 'resources' && (
              <>
                <section>
                  <h3 className="text-xl font-semibold mb-3 text-green-300">Ressources éducatives</h3>
                  <p className="text-gray-300 mb-4">
                    Voici une collection de ressources pour approfondir votre compréhension des mécanismes de manipulation, de la pensée critique et de la rationalité.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-green-300">Pensée critique</h4>
                      <ul className="space-y-2">
                        {criticalThinkingResources.map(resource => (
                          <li key={resource.url} className="text-sm">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 hover:underline"
                            >
                              {resource.title}
                            </a>
                            <p className="text-gray-400 text-xs">{resource.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-yellow-300">Rationalité</h4>
                      <ul className="space-y-2">
                        {rationalityResources.map(resource => (
                          <li key={resource.url} className="text-sm">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 hover:underline"
                            >
                              {resource.title}
                            </a>
                            <p className="text-gray-400 text-xs">{resource.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-red-300">Propagande et manipulation</h4>
                      <ul className="space-y-2">
                        {propagandaResources.map(resource => (
                          <li key={resource.url} className="text-sm">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 hover:underline"
                            >
                              {resource.title}
                            </a>
                            <p className="text-gray-400 text-xs">{resource.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-orange-300">Biais cognitifs</h4>
                      <ul className="space-y-2">
                        {biasResources.map(resource => (
                          <li key={resource.url} className="text-sm">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 hover:underline"
                            >
                              {resource.title}
                            </a>
                            <p className="text-gray-400 text-xs">{resource.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-purple-300">Exemples historiques</h4>
                      <ul className="space-y-2">
                        {historicalResources.map(resource => (
                          <li key={resource.url} className="text-sm">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 hover:underline"
                            >
                              {resource.title}
                            </a>
                            <p className="text-gray-400 text-xs">{resource.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-300">Sites et communautés sur la rationalité</h4>
                    <ul className="space-y-2">
                      <li className="text-sm">
                        <a 
                          href="https://www.lesswrong.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline"
                        >
                          LessWrong
                        </a>
                        <p className="text-gray-400 text-xs">Communauté explorant les mécanismes de pensée rationnelle et de prise de décision</p>
                      </li>
                      <li className="text-sm">
                        <a 
                          href="https://www.overcomingbias.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline"
                        >
                          Overcoming Bias
                        </a>
                        <p className="text-gray-400 text-xs">Blog sur l&apos;amélioration des croyances humaines, fondé par Robin Hanson et Eliezer Yudkowsky</p>
                      </li>
                      <li className="text-sm">
                        <a 
                          href="https://rationality.org/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline"
                        >
                          Center for Applied Rationality
                        </a>
                        <p className="text-gray-400 text-xs">Organisation à but non lucratif qui enseigne des techniques pour améliorer la prise de décision</p>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-xs text-gray-400 italic mt-4">
                    Note: Ces ressources sont fournies à titre éducatif. 
                    Le jeu <i>Propagation</i> ne prétend pas être une source définitive d&apos;information 
                    sur ces sujets complexes, mais plutôt une invitation à la réflexion critique.
                  </p>
                </section>
              </>
            )}

            
            <div className="mt-8 pt-6 border-t border-gray-600 text-center">
              <p className="text-gray-400">
                <i>&apos;Rappelle-toi : remets tout en question — y compris ce jeu.&apos;</i>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Star Wars style credits modal */}
      {showCredits && <StarWarsCredits onClose={() => setShowCredits(false)} />}
    </div>
  );
};

export default AboutPage;