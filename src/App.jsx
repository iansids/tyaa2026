import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { CandidateDetailsPage } from './pages/CandidateDetailsPage';
import { VotingPage } from './pages/VotingPage';

/**
 * LOADING SCREEN COMPONENT
 * Features: Tiered Typography, Synced Background Glow, and smooth scale transition.
 */
const LoadingScreen = ({ isVisible }) => {
  if (!isVisible) return null;

  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent";

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a1f1a] flex items-center justify-center">
      <div className="text-center animate-fadeOut px-6">
        
        {/* --- LOADER SECTION --- */}
        <div className="relative w-28 h-28 mx-auto mb-12">
          
          {/* DYNAMIC BACKGROUND GLOW: Rotates with the ring */}
          <div className="absolute inset-[-25%] animate-spin-premium pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#d4af37]/20 rounded-full blur-[40px]"></div>
          </div>
          
          {/* THE PREMIUM SHORT RING (90-degree arc) */}
          <div className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-[#d4af37] animate-spin-premium"></div>
          
          {/* Stationary Crown Motif */}
          <div className="absolute inset-0 flex items-center justify-center text-4xl filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            👑
          </div>
        </div>

        {/* --- REVAMPED TIERTED TITLE SECTION --- */}
        <div className="flex flex-col items-center">
          {/* Main Title Stack */}
          <div className="relative space-y-2">
            <h2 className="text-stone-200 text-xl md:text-2xl font-serif tracking-[0.2em] uppercase">
              Thomasian Youth
            </h2>
            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-[0.05em] uppercase leading-tight ${goldText}`}>
              Ambassador <span className="text-stone-300 font-extralight italic">&</span> Ambassadress
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN APP ENTRY POINT
 */
const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // 3.5s matches the duration of the fadeOut animation
    const timer = setTimeout(() => setShowLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isVisible={showLoading} />
      
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* HANDSHAKE: Pass isAppReady as a prop. 
                When showLoading becomes false, isAppReady becomes true.
            */}
            <Route 
              path="/" 
              element={<LandingPage isAppReady={!showLoading} />} 
            />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/candidates/:id" element={<CandidateDetailsPage />} />
            <Route path="/voting" element={<VotingPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      
      {/* GLOBAL PREMIUM STYLES */}
      <style>{`
        /* Import a Seriffed font for a more regal feel if not already present */
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');

        body {
          background-color: #0a1f1a;
          margin: 0;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .font-serif {
          font-family: 'Cinzel', serif;
        }

        /* Loading Screen Exit */
        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05); pointer-events: none; }
        }
        
        /* Subtle Title Entry Animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Linear spin for the ring and the background glow */
        @keyframes spin-premium {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-fadeOut {
          animation: fadeOut 3.5s forwards ease-in-out;
        }

        .animate-fadeIn {
          animation: fadeIn 1.2s forwards;
        }

        .animate-spin-premium {
          animation: spin-premium 2s linear infinite;
        }

        /* Custom Premium Gold Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #081612;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #aa841e, #d4af37);
          border-radius: 10px;
        }

        /* Selection styling */
        ::selection {
          background: rgba(212, 175, 55, 0.3);
          color: #fbf5e7;
        }
      `}</style>
    </>
  );
};

export default App;