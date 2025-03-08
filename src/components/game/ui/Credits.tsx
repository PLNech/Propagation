import { useEffect, useRef, useState } from "react";

/**
 * Star Wars style credits component
 */
export const StarWarsCredits = ({ onClose }: { onClose: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const creditsRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    
    // TODO: Handle hidden achievement trigger for clicking on personal link
    const handleCreatorLinkClick = () => {
      console.log("You found a secret link! TODO REWARD");
    //   // This would be connected to the achievement system in a real implementation
    //   if (window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
    //     window.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.dispatch({ 
    //       type: 'UNLOCK_SECRET_ACHIEVEMENT', 
    //       payload: { achievementId: 'found_creator_link' } 
    //     });
    //   }
    };
  
    // Set up animation loop
    useEffect(() => {
      // Play sound effect when credits open
      const achievementSound = new Audio('/achievement.mp3');
      achievementSound.volume = 0.5;
      achievementSound.play().catch(e => console.log('Audio playback prevented:', e));
      
      const startTime = performance.now();
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
            <div className="w-4/5 mx-auto text-3xl">
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
              <p style={{ fontSize: fontSize.text, marginBottom: '3rem' }}>for showing *how* it&apos;s done 🤗</p>
  
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
  