'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Invitation Page Component
 * Creates a printable invitation for the Propagation game with decorative elements
 */
const InvitationPage = function(){
  const searchParams = useSearchParams();
  
  // Get player name from query params or use default
  const [playerName, setPlayerName] = useState("Clément");
  
  // Get current date in French format
  const [currentDate, setCurrentDate] = useState("");
  
  // Get random absurd title
  const [absurdTitle, setAbsurdTitle] = useState("Futur Président Éternel de la Vérité");
  
  const generateAbsurdTitle = () => {
    // We're not using the random title generator anymore
    return "Futur Président Éternel de la Vérité";
  };
  
  useEffect(() => {
    // Handle query parameters
    const nameParam = searchParams.get('playerName');
    if (nameParam) {
      setPlayerName(nameParam);
    }
    
    const dateParam = searchParams.get('currentDate');
    if (dateParam) {
      setCurrentDate(dateParam);
    } else {
      // Format current date in French
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ];
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      setCurrentDate(`${day} ${month} ${year}`);
    }
    
    // Generate absurd title
    setAbsurdTitle(generateAbsurdTitle());
    
    // Add title for the printed page
    document.title = `Invitation pour ${playerName} | Propagation`;
  }, [searchParams]);

  // Decorative patterns
  const cornerOrnament = "╬";
  const horizontalPattern = "══════════════════════════";
  const verticalPattern = "║";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="screen-only mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Propagation - Invitation Imprimable</h1>
          <p className="text-center mb-6 text-gray-300">
            Cette page est conçue pour être imprimée. Utilisez la fonction d&apos;impression de votre navigateur (Ctrl+P ou Cmd+P) pour générer un PDF ou imprimer l&apos;invitation.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => window.print()} 
              className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimer l&apos;invitation
            </button>
          </div>
        </div>
        
        {/* A5 Landscape Flyer (to be printed on A4) */}
        <div className="print-container">
          {/* Recto side */}
          <div className="flyer recto">
            <div className="flyer-content">
              <div className="border-pattern">
                <div className="border-inner">
                  <div className="corner-ornament top-left">{cornerOrnament}</div>
                  <div className="corner-ornament top-right">{cornerOrnament}</div>
                  <div className="corner-ornament bottom-left">{cornerOrnament}</div>
                  <div className="corner-ornament bottom-right">{cornerOrnament}</div>
                </div>
              </div>
              
              <div className="flyer-header">
                <h1 className="flyer-title">PROPAGATION</h1>
                <div className="divider">{horizontalPattern}</div>
                <h2 className="flyer-subtitle">{absurdTitle}</h2>
              </div>
              
              <div className="flyer-body">
                <p className="text-sm">Par Décret du Collectif Propagation, vous êtes convié à assumer le rôle qui vous attend depuis toujours.</p>
                
                <div className="divider">❖ ❖</div>
                
                <p className="text-sm">Le monde cherche désespérément un guide, un phare dans l&apos;obscurité informationnelle, quelqu&apos;un capable de distinguer le vrai du faux.</p>
                
                <p className="text-center font-bold text-sm">{playerName}</p>
                
                <div className="divider">❖ ❖</div>
                
                <p className="text-sm font-italic">Le temps est venu de guider votre peuple vers la vérité et l&apos;esprit critique.</p>
                <div className="logo">
                  <svg viewBox="0 0 24 24" className="eye-logo" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <path d="M12 5C7 5 3 12 3 12C3 12 7 19 12 19C17 19 21 12 21 12C21 12 17 5 12 5Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                <div className="logo">
                  <svg viewBox="0 0 24 24" className="eye-logo" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <path d="M12 5C7 5 3 12 3 12C3 12 7 19 12 19C17 19 21 12 21 12C21 12 17 5 12 5Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>

              </div>
              
              <div className="flyer-footer">
                {/* <p className="date">{currentDate}</p> */}
              </div>
            </div>
          </div>
          
          {/* Verso side */}
          <div className="flyer verso">
            <div className="flyer-content">
              <div className="border-pattern">
                <div className="border-inner">
                  <div className="corner-ornament top-left">{cornerOrnament}</div>
                  <div className="corner-ornament top-right">{cornerOrnament}</div>
                  <div className="corner-ornament bottom-left">{cornerOrnament}</div>
                  <div className="corner-ornament bottom-right">{cornerOrnament}</div>
                </div>
              </div>
              
              <div className="flyer-body mission">
                <h3 className="mission-title">DIRECTIVES CONFIDENTIELLES</h3>
                <div className="divider">{horizontalPattern}</div>
                
                <ul className="mission-list">
                  <li>Semer des graines de curiosité qui fleurissent en réflexions autonomes</li>
                  <li>Créer des espaces où chacun peut développer sa propre voix critique</li>
                  <li>Partager le plaisir contagieux de questionner le monde avec bienveillance</li>
                  <li>Célébrer la diversité des perspectives comme richesse collective</li>
                </ul>
                
                <div className="divider">❖ ❖ ❖</div>
                
                <div className="acceptance">
                  <p className="text-sm">Acceptez-vous cette noble mission ?</p>
                  <div className="signature-line"></div>
                  <p className="text-xs text-center italic mt-1">(L&apos;humanité attend son Président Éternel de la Vérité)</p>
                </div>
                <div className="providence-eye">
                  <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="50,0 0,80 100,80" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="50" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M30,30 C30,30 40,15 50,15 C60,15 70,30 70,30 C70,30 60,45 50,45 C40,45 30,30 30,30 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <p className="verso-text text-xs mt-2">Le Collectif Propagation</p>
                </div>
              </div>
              
              <div className="flyer-footer">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationPage;