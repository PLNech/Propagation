'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Invitation Page Component
 * Creates a printable invitation for the Propagation game
 */
const InvitationPage = function(){
  const searchParams = useSearchParams();
  
  // Get player name from query params or use default
  const [playerName, setPlayerName] = useState("Gouverneur de la Vérité");
  
  // Get current date in French format
  const [currentDate, setCurrentDate] = useState("");
  
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
    
    // Add title for the printed page
    document.title = `Invitation pour ${playerName} | Propagation`;
  }, [searchParams]);

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
              <div className="flyer-header">
                <h1 className="flyer-title">Bienvenue au Club</h1>
                <h2 className="flyer-subtitle">Bienvenue, {playerName}</h2>
              </div>
              
              <div className="flyer-body">
                <p>En cette ère de surabondance informationnelle, peu sont ceux qui savent vraiment discerner le vrai du faux. Encore moins nombreux sont ceux capables de façonner cette distinction à leur avantage.</p>
                <p>Vous avez été sélectionné pour rejoindre une élite qui comprend la véritable nature de l&apos;information : malléable, fluide, et surtout, contrôlable.</p>
                <p>À présent, c&apos;est à votre tour de maîtriser la narrative, de manipuler les croyances, et de propager des idées qui serviront vos intérêts à travers les âges.</p>
                <p>Rejoignez-nous dans cette danse millénaire du pouvoir et de l&apos;influence.</p>
              </div>
              
              <div className="flyer-footer">
                <p className="date">{currentDate}</p>
                <div className="logo">
                  <svg viewBox="0 0 24 24" className="eye-logo" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <path d="M12 5C7 5 3 12 3 12C3 12 7 19 12 19C17 19 21 12 21 12C21 12 17 5 12 5Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Verso side */}
          <div className="flyer verso">
            <div className="flyer-content">
              <div className="flyer-body mission">
                <h3 className="mission-title">Votre Mission</h3>
                
                <ul className="mission-list">
                  <li>Maîtriser l&apos;art ancestral de la manipulation des foules à travers les époques</li>
                  <li>Cultiver votre crédibilité tout en tissant des réseaux d&apos;influence</li>
                  <li>Propager des théories qui servent vos intérêts, qu&apos;elles soient vraies ou non</li>
                  <li>Étouffer les voix dissidentes avant qu&apos;elles ne gagnent en influence</li>
                  <li>Adapter vos techniques aux évolutions technologiques et sociales</li>
                  <li>Garder le contrôle face aux rares individus dotés de pensée critique</li>
                  <li>Décider si vous manipulerez dans l&apos;ombre ou révélerez la vérité au monde</li>
                </ul>
                
                <div className="acceptance">
                  <p>Acceptes-tu ta glorieuse mission ?</p>
                  <div className="signature-line"></div>
                </div>
              </div>
              
              <div className="flyer-footer">
                <div className="providence-eye">
                  <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="50,0 0,80 100,80" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <circle cx="50" cy="30" r="10" fill="currentColor"/>
                    <path d="M30,30 C30,30 40,15 50,15 C60,15 70,30 70,30 C70,30 60,45 50,45 C40,45 30,30 30,30 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <path d="M20,40 C20,40 35,20 50,20 C65,20 80,40 80,40 C80,40 65,60 50,60 C35,60 20,40 20,40 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M10,50 C10,50 30,25 50,25 C70,25 90,50 90,50 C90,50 70,75 50,75 C30,75 10,50 10,50 Z" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                  </svg>
                </div>
                <p className="verso-text">La vérité est ce que nous décidons qu&apos;elle soit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InvitationPage;