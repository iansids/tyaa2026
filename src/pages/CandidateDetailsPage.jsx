import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { contestants } from '../data/contestants';

export const CandidateDetailsPage = () => {
  const { id } = useParams();
  const candidate = contestants.find((c) => c.id === parseInt(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent";
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] hover:brightness-110 transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]";

  if (!candidate) return null;

  return (
    <div className="w-full bg-[#0a1f1a] min-h-screen text-stone-200 selection:bg-[#d4af37]/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#0a1f1a] flex flex-col items-center justify-center">
        
        {/* BACK BUTTON */}
        <div className="absolute top-28 md:top-36 left-6 md:left-12 z-20">
          <Link 
            to="/candidates" 
            className="group flex items-center gap-3 px-5 py-2.5 bg-[#0a1f1a]/60 backdrop-blur-md border border-[#d4af37]/30 rounded-full text-[#d4af37] text-[10px] uppercase tracking-[4px] hover:bg-[#d4af37] hover:text-[#0a1f1a] transition-all duration-500 shadow-lg shadow-black/20"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform font-light">←</span>
            <span className="font-black">The Registry</span>
          </Link>
        </div>

        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src={candidate.image} 
            className="w-full h-full object-cover opacity-25 grayscale-[0.2] scale-110"
            alt=""
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.15)_0%,rgba(10,31,26,1)_80%)]"></div>
          <div className="absolute inset-0 opacity-10 animate-pulse-slow bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 pt-20 animate-fade-in">
          <div className="space-y-3 mb-6">
            <p className="text-[#d4af37] text-[11px] md:text-[13px] uppercase tracking-[12px] md:tracking-[18px] font-black opacity-80">
              {candidate.gender === 'male' ? 'Ambassador' : 'Ambassadress'}
            </p>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto"></div>
          </div>

          <h1 className={`text-[13vw] md:text-[8vw] lg:text-[7rem] font-serif font-black uppercase leading-[0.85] tracking-tighter drop-shadow-2xl ${goldText}`}>
            {candidate.name.split(' ').map((word, i) => (
              <span key={i} className="block md:inline md:mx-3">{word}</span>
            ))}
          </h1>
          
          <p className="mt-10 text-stone-400 text-[10px] md:text-sm uppercase tracking-[6px] font-light max-w-2xl mx-auto leading-relaxed">
            Representing the <br/>
            <span className="text-[#d4af37] font-bold tracking-[3px] mt-2 inline-block">
              {candidate.college}
            </span>
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a1f1a] via-[#0a1f1a]/40 to-transparent"></div>
      </section>

      {/* 2. MAIN DOSSIER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Portrait with Shine Effect */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
            
            <div className="relative group overflow-hidden bg-[#081612] border border-white/10 shadow-2xl rounded-sm">
               
               {/* SNAPPY SOFT SHIMMER: Reduced duration to 800ms and tightened translation */}
               <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/0 via-[#d4af37]/40 via-[#d4af37]/0 to-transparent blur-[50px] -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-[800ms] ease-out"></div>
               </div>

               {/* Decorative Corners */}
               <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#d4af37]/40 z-30 m-4 pointer-events-none"></div>
               <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#d4af37]/40 z-30 m-4 pointer-events-none"></div>
               
               <div className="relative aspect-[3/4] overflow-hidden">
                 <img 
                    src={candidate.image} 
                    alt={candidate.name}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                 />
                 
                 {/* Vignette Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f1a] via-transparent to-transparent opacity-80"></div>
                 
                 {/* Initials Accent */}
                 <span className="absolute bottom-6 right-6 text-7xl font-serif font-black text-[#d4af37]/10 uppercase select-none tracking-tighter">
                    {candidate.initials}
                 </span>
               </div>
            </div>

            {/* Voting Card */}
            <div className="p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-8">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] uppercase tracking-[3px] text-stone-500 font-bold">Official Registry Entry</span>
                    <span className="text-[10px] uppercase tracking-[3px] text-[#d4af37] font-black italic">✦ 0{candidate.id}</span>
                </div>
                
                <Link
                    to="/voting"
                    className={`${goldBtn} flex items-center justify-center w-full py-5 rounded-sm text-[#0a1f1a] font-black uppercase tracking-[4px] text-[10px] transform hover:-translate-y-1 transition-all`}
                >
                    Cast Your Support
                </Link>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-20 pt-4">
            <section className="relative">
                <h3 className="text-[#d4af37] text-[11px] uppercase tracking-[6px] font-black mb-8 flex items-center gap-4">
                    The Narrative <div className="h-[1px] flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
                </h3>
                <p className="text-xl md:text-3xl font-serif text-stone-200 leading-[1.7] italic font-light">
                    {candidate.bio}
                </p>
            </section>

            <section className="relative p-10 md:p-16 border border-[#d4af37]/15 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-sm group overflow-hidden">
                {/* SNAPPY SHIMMER for Advocacy Box */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/0 via-[#d4af37]/20 via-[#d4af37]/0 to-transparent blur-[60px] -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-[1000ms] ease-out"></div>
                </div>

                <span className="absolute -top-8 -left-4 text-[12rem] font-serif font-black text-[#d4af37]/5 leading-none select-none italic pointer-events-none">
                    "
                </span>
                <h3 className="text-[#d4af37] text-[11px] uppercase tracking-[6px] font-black mb-8 relative z-10">The Advocacy</h3>
                <p className="relative z-10 text-lg md:text-2xl text-stone-300 leading-relaxed tracking-wide font-serif italic">
                    {candidate.advocacy}
                </p>
            </section>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-slow { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.15; } }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};