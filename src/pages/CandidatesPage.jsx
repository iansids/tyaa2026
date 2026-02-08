import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Replace with your actual import: import { contestants } from '../data/contestants'
export const contestants = [
  { 
    id: 1, 
    name: "Alexander Wright", 
    college: "Faculty of Engineering", 
    initials: "AW", 
    gender: "male", 
    bio: "A visionary leader committed to sustainable innovation and the integration of green technology in urban development." 
  },
  { 
    id: 2, 
    name: "Sophia Villareal", 
    college: "Faculty of Medicine and Surgery", 
    initials: "SV", 
    gender: "female", 
    bio: "Advocating for accessible healthcare and empathetic leadership through community-based medical missions." 
  },
  { 
    id: 3, 
    name: "Julian De Leon", 
    college: "College of Architecture", 
    initials: "JD", 
    gender: "male", 
    bio: "Designing inclusive spaces that foster community growth and preserve cultural heritage in the modern era." 
  },
  { 
    id: 4, 
    name: "Isabella Cruz", 
    college: "Faculty of Arts & Letters", 
    initials: "IC", 
    gender: "female", 
    bio: "Championing the power of literature and communication to bridge social divides and amplify marginalized voices." 
  },
  { 
    id: 5, 
    name: "Marcus Chen", 
    college: "College of Science", 
    initials: "MC", 
    gender: "male", 
    bio: "Exploring the frontiers of biotechnology to solve food security challenges and advance molecular research." 
  },
  { 
    id: 6, 
    name: "Elena Rodriguez", 
    college: "College of Education", 
    initials: "ER", 
    gender: "female", 
    bio: "Transforming the pedagogical landscape through digital literacy and inclusive classroom management strategies." 
  },
  { 
    id: 7, 
    name: "Nathaniel Thorne", 
    college: "College of Commerce and Business Administration", 
    initials: "NT", 
    gender: "male", 
    bio: "Redefining ethical business practices and promoting social entrepreneurship as a catalyst for national progress." 
  },
  { 
    id: 8, 
    name: "Clara Beaumont", 
    college: "Conservatory of Music", 
    initials: "CB", 
    gender: "female", 
    bio: "Bridging classical traditions with contemporary soul to create music that heals and inspires the modern spirit." 
  },
  { 
    id: 9, 
    name: "Dominic Varga", 
    college: "College of Nursing", 
    initials: "DV", 
    gender: "male", 
    bio: "Dedicated to the art of caregiving and elevating the standards of patient advocacy in emergency medicine." 
  },
  { 
    id: 10, 
    name: "Genevieve Shao", 
    college: "College of Fine Arts and Design", 
    initials: "GS", 
    gender: "female", 
    bio: "Utilizing visual storytelling and multi-media installations to provoke dialogue on environmental conservation." 
  },
  { 
    id: 11, 
    name: "Sebastian Valerius", 
    college: "Faculty of Civil Law", 
    initials: "SV", 
    gender: "male", 
    bio: "An aspiring jurist focused on human rights defense and the modernization of judicial transparency." 
  },
  { 
    id: 12, 
    name: "Amara Okafor", 
    college: "College of Information and Computing Sciences", 
    initials: "AO", 
    gender: "female", 
    bio: "Developing ethical AI solutions and advancing cyber-security frameworks for the protection of digital identities." 
  }
];

export const CandidatesPage = () => {
  const [selectedCollege, setSelectedCollege] = useState('All');
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent";

  const colleges = useMemo(() => {
    const unique = ['All', ...new Set(contestants.map((c) => c.college))];
    return unique.sort((a, b) => (a === 'All' ? -1 : a.localeCompare(b)));
  }, []);

  const filteredContestants = useMemo(() => {
    if (selectedCollege === 'All') return contestants;
    return contestants.filter((c) => c.college === selectedCollege);
  }, [selectedCollege]);

  // For the seamless loop, we double the content
  const marqueeItems = [...contestants, ...contestants];

  return (
    <div className="w-full bg-[#0a1f1a] min-h-screen text-stone-200 selection:bg-[#d4af37]/30 overflow-x-hidden">
      
      {/* SECTION 1: INFINITE SEAMLESS HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-[#081612] flex items-center justify-center">
    {/* Ambient Glow */}
    <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#d4af37]/5 blur-[120px] rounded-full" />
    </div>

    {/* Content Overlay - Optimized for Fluidity */}
    <div className="absolute z-20 pointer-events-none text-center px-4 w-full max-w-[95vw] md:max-w-7xl mx-auto">
        <h1 className={`
        /* Mobile: Stacked and large | Desktop: Wide and elegant */
        text-[12vw] md:text-[8vw] lg:text-[7.5rem] 
        font-serif font-black 
        /* Tighter leading for a sophisticated 'poster' look */
        leading-[0.85] md:leading-[0.9] 
        tracking-tighter uppercase
        drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] 
        ${goldText}
        `}>
        The Bastions <br className="md:hidden" /> 
        <span className="md:inline">of Hope</span>
        </h1>
        
        {/* Optional sub-tag to ground the text */}
        <div className="mt-6 flex items-center justify-center gap-4 opacity-60">
        </div>
    </div>

    {/* THE SEAMLESS MARQUEE - Slightly lowered opacity to prioritize text legibility */}
    <div className="absolute inset-0 z-10 opacity-[0.15] flex items-center pointer-events-none">
        <div className="flex w-max animate-marquee-seamless">
        {marqueeItems.map((candidate, idx) => (
            <div 
            key={idx} 
            className="relative w-[280px] md:w-[450px] aspect-[3/4] mx-4 md:mx-8 overflow-hidden border border-white/5 rounded-sm bg-[#0a1f1a] flex-shrink-0"
            >
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10rem] md:text-[12rem] font-serif font-black text-[#d4af37]/10 uppercase">
                {candidate.initials}
                </span>
            </div>
            <div className="absolute bottom-10 left-10 text-left">
                <p className="text-[#d4af37] text-[10px] uppercase tracking-widest font-bold mb-1 opacity-60">Representative</p>
                <p className="text-white text-xl md:text-2xl font-serif italic">{candidate.college}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
    </section>

      {/* SECTION 2: THE REGISTRY GALLERY */}
      <div className="max-w-[1600px] mx-auto px-6 py-32">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
        {/* SIDEBAR */}
        <aside className="lg:w-96 w-full lg:sticky lg:top-32 space-y-12">
  <div className="space-y-8">
    {/* Header Section: Left Aligned */}
    <div className="flex items-center gap-4 px-4">
      <h3 className="text-[#d4af37] text-[11px] uppercase tracking-[5px] font-black whitespace-nowrap">
        Institutions
      </h3>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
    </div>
    
    <nav className="flex flex-col">
      {colleges.map((college) => (
        <button
          key={college}
          onClick={() => setSelectedCollege(college)}
          className={`group relative flex items-start gap-4 py-5 px-6 transition-all duration-500 border-l-2 ${
            selectedCollege === college
              ? 'border-[#d4af37] bg-[#d4af37]/5 text-[#d4af37]'
              : 'border-white/5 text-stone-500 hover:text-stone-300 hover:border-stone-700'
          }`}
        >
          {/* Active Indicator: Left Aligned */}
          <span className={`mt-0.5 text-[10px] transition-all duration-500 flex-shrink-0 ${
            selectedCollege === college ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            ✦
          </span>

          {/* College Name: Left Aligned and Wrapped */}
          <span className={`
            text-[11px] uppercase tracking-[2px] font-bold text-left leading-relaxed transition-transform duration-500
            ${selectedCollege === college ? 'translate-x-0' : '-translate-x-2'}
          `}>
            {college}
          </span>
        </button>
      ))}
    </nav>
  </div>
</aside>

          {/* MAIN GRID */}
          <main className="flex-1">
            {filteredContestants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-24">
                {filteredContestants.map((candidate) => (
                  <Link key={candidate.id} to={`/candidates/${candidate.id}`} className="group">
                    {/* GILDED IMAGE FRAME */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#081612] border border-white/5 transition-all duration-1000 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f1a] via-transparent to-transparent z-10"></div>
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[2000ms] group-hover:scale-125">
                        <span className="text-[12rem] font-serif font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity select-none">
                          {candidate.initials}
                        </span>
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#d4af37]/0 group-hover:border-[#d4af37]/40 transition-all duration-700"></div>
                      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-[#d4af37]/0 group-hover:border-[#d4af37]/40 transition-all duration-700"></div>

                      {/* Overlay Info */}
                      <div className="absolute inset-x-0 bottom-0 p-10 z-20 transform transition-transform duration-700 group-hover:-translate-y-2">
                        <p className="text-[#d4af37] text-[10px] uppercase tracking-[5px] font-black mb-4">
                          {candidate.gender === 'male' ? 'Ambassador' : 'Ambassadress'}
                        </p>
                        <h3 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight group-hover:text-[#fbf5e7] transition-colors">
                          {candidate.name}
                        </h3>
                        <p className="text-stone-500 text-[11px] uppercase tracking-[3px] mb-6">{candidate.college}</p>
                        
                        <div className="max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-1000 ease-out overflow-hidden">
                          <p className="text-stone-400 text-xs italic leading-relaxed line-clamp-3">{candidate.bio}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="h-[50vh] flex flex-col items-center justify-center border border-[#d4af37]/10 rounded-sm">
                <span className="text-6xl mb-8 opacity-20">🏛️</span>
                <p className="text-stone-500 font-serif italic text-xl">The registry is currently empty.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-seamless {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-seamless {
          animation: marquee-seamless 120s linear infinite;
        }
        /* Prevents flicker on some browsers */
        .w-max {
          width: max-content;
        }
      `}} />
    </div>
  );
};