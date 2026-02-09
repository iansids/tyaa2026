import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { roadmap } from '../data/roadmap' 

const useScrollReveal = () => {
  useEffect(() => {
    document.title = "Thomasian Youth Ambassador & Ambassadress";
  }, []);

  const [hasRevealed, setHasRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, hasRevealed];
};

export const LandingPage = ({ isAppReady }) => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollX, setScrollX] = useState(0); 
  const timelineScrollRef = useRef(null);

  const [aboutRef, aboutInView] = useScrollReveal();
  const [timelineRef, timelineInView] = useScrollReveal();
  const [sponsorsRef, sponsorsInView] = useScrollReveal();

  useEffect(() => {
    if (isAppReady) {
      const timer = setTimeout(() => setIsHeroLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isAppReady]);

  const handleScroll = () => {
    if (timelineScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = timelineScrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
      setScrollX(scrollLeft);
      if (scrollLeft > 20) setHasScrolled(true);
    }
  };

  const goldText = "bg-gradient-to-b from-[#fff7e6] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]"
  const goldBtn = "relative overflow-hidden group bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-700 ease-in-out border border-[#fbf5e7]/30"

  const revealHero = (delayClass) => `
    transition-all duration-[1600ms] cubic-bezier(0.16, 1, 0.3, 1)
    ${isHeroLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
    ${delayClass}
  `

  const revealOnScroll = (inView, delay = "delay-0") => `
    transition-all duration-[1200ms] ease-out
    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
    ${delay}
  `

  return (
    <div className="w-full bg-[#0a1f1a] selection:bg-[#d4af37] selection:text-white overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden pt-0 border-b border-[#d4af37]/40 shadow-[inset_0_-10px_40px_rgba(212,175,55,0.1)]">
        {/* ENHANCED PRESTIGE BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#d4af37]/25 rounded-full blur-[120px] animate-pulse opacity-70"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#d4af37]/15 rounded-full blur-[100px] opacity-40"></div>
          
          {/* Spotlight Effect - Inspired by Pageant Stages */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-screen bg-gradient-to-b from-[#d4af37]/40 to-transparent blur-[2px] opacity-50"></div>
          
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4af37]/10 to-transparent rotate-12 -translate-x-full animate-beam-sweep pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60 mix-blend-screen animate-slowScroll"></div>
          
          {/* Subtle Filigree Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gold-algae.png')] opacity-[0.03] mix-blend-overlay"></div>
          
          <div className="absolute inset-0 bg-radial-vignette opacity-80"></div>
        </div>

        <div className="relative max-w-6xl text-center z-10 flex flex-col items-center w-full">
          <div className={revealHero('delay-[200ms]')}>
            {/* Ornate Badge Styling */}
            <div className="inline-flex items-center gap-2 md:gap-4 mb-8 md:mb-10 px-4 md:px-8 py-2 md:py-2.5 border border-[#d4af37]/40 bg-[#0a1f1a]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.25)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine-fast pointer-events-none"></div>
              <span className="text-[#d4af37] text-[10px] animate-spin-slow drop-shadow-[0_0_5px_#d4af37]">✧</span>
              <p className="text-[8px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.8em] text-[#fbf5e7] font-black whitespace-nowrap">SOCC Presents</p>
              <span className="text-[#d4af37] text-[10px] animate-spin-slow drop-shadow-[0_0_5px_#d4af37]">✧</span>
            </div>
          </div>

          <div className={`mb-8 md:mb-12 flex flex-col items-center w-full ${revealHero('delay-[400ms]')}`}>
            <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-black leading-[1.1] md:leading-[0.85] block relative ${goldText}`}>
              Thomasian Youth
            </h1>
            <div className="relative mt-6 md:mt-10 flex flex-col items-center w-full">
              <span className="text-xl sm:text-3xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-widest flex flex-wrap items-center justify-center gap-2 md:gap-6 italic drop-shadow-lg text-center px-4">
                Ambassador 
                <span className="text-[#d4af37] not-italic font-serif font-normal text-2xl md:text-6xl animate-glint drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">&</span> 
                Ambassadress
              </span>
              <div className="mt-6 md:mt-8 flex items-center justify-center gap-4 md:gap-12 w-full px-4">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_15px_#d4af37]"></div>
                <span className="text-[#d4af37] text-xs md:text-lg tracking-[0.4em] md:tracking-[0.8em] font-black drop-shadow-[0_0_12px_rgba(212,175,55,0.7)]">2026</span>
                <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent shadow-[0_0_15px_#d4af37]"></div>
              </div>
            </div>
          </div>

          <p className={`text-stone-200 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed italic px-6 ${revealHero('delay-[600ms]')}`}>
            Celebrating the <span className="text-[#d4af37] font-black not-italic drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">Bastions of Hope</span>. Cast your vote for the leaders who redefine excellence through the heart of service.
          </p>

          <div className={`flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full md:w-auto px-6 ${revealHero('delay-[800ms]')}`}>
            <Link to="/candidates" className={`${goldBtn} w-full md:w-auto px-10 md:px-14 py-4 md:py-5 rounded-none font-black text-[10px] md:text-xs text-[#0a1f1a] uppercase tracking-[2px] md:tracking-[3px] text-center border-2 border-[#fbf5e7]/50`}>
              <span className="relative z-10 whitespace-nowrap">Meet Our Candidates</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/60 opacity-50 group-hover:animate-shine" />
            </Link>
            <Link to="/voting" className="w-full md:w-auto px-10 md:px-14 py-4 md:py-5 rounded-none font-black text-[10px] md:text-xs border-2 border-[#d4af37] text-[#d4af37] uppercase tracking-[2px] md:tracking-[3px] hover:bg-[#d4af37] hover:text-[#0a1f1a] transition-all duration-700 backdrop-blur-md bg-[#0a1f1a]/20 text-center whitespace-nowrap shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              Cast Your Vote
            </Link>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section ref={aboutRef} id="about" className="py-20 md:py-40 px-6 relative bg-[#081612] overflow-hidden">
        {/* Damask Pattern Background - Inspired by Reference 4 */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/damask.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className={`space-y-8 md:space-y-12 ${revealOnScroll(aboutInView)}`}>
              <h2 className={`text-4xl md:text-7xl font-serif font-black leading-tight ${goldText}`}>
                The Heart of Service
              </h2>
              <div className="space-y-6 md:space-y-8 text-stone-300 text-base md:text-xl leading-relaxed font-light border-l-2 border-[#d4af37] pl-6 md:pl-8">
                <p>
                  The <span className="text-[#fbf5e7] font-semibold drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">Thomasian Youth Ambassador and Ambassadress</span> is not merely a title—it is a sovereign commitment to leadership and the pursuit of Thomasian excellence.
                </p>
                <p className="text-sm md:text-base text-stone-500 italic">
                  Rooted in the mission of the <span className="text-[#d4af37] font-bold">SOCC</span>, we cultivate servant-leaders who navigate the complexities of a global landscape with compassion, competence, and commitment.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 md:gap-16 pt-4">
                {[
                  { label: 'Royal Finalists', value: '18' },
                  { label: 'Academic Units', value: '18' },
                ].map((stat, i) => (
                  <div key={i} className="group min-w-[100px]">
                    <p className={`text-4xl md:text-6xl font-serif font-black ${goldText} transition-transform duration-500 group-hover:scale-110`}>
                      {stat.value}
                    </p>
                    <div className="w-10 md:w-12 h-[3px] bg-[#d4af37] mt-2 mb-2 shadow-[0_0_15px_#d4af37]"></div>
                    <p className="text-[#d4af37] text-[8px] md:text-[10px] uppercase tracking-[2px] md:tracking-[4px] font-black">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`space-y-8 md:space-y-10 ${revealOnScroll(aboutInView, "delay-300")}`}>
              <div className="relative p-1 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] via-transparent to-[#d4af37] rounded-none opacity-30 group-hover:opacity-100 transition-opacity duration-700"></div>
                {/* Ornate Corner Accents */}
                <div className="relative bg-[#0a1f1a] p-8 md:p-14 border border-[#d4af37]/30 overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] opacity-50"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] opacity-50"></div>
                  
                  <h3 className={`text-xl md:text-2xl font-serif font-bold mb-4 md:mb-6 tracking-wide ${goldText}`}>Our Mission</h3>
                  <p className="text-stone-200 text-base md:text-lg leading-relaxed font-light italic">
                    "To recognize and celebrate individuals who demonstrate exceptional leadership, unwavering integrity, and a profound commitment to community service and personal excellence."
                  </p>
                </div>
              </div>
              <div className="relative bg-gradient-to-b from-[#112621] to-[#0a1f1a] border-2 border-[#d4af37] p-8 md:p-14 rounded-none shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-[#d4af37]/20 rounded-full blur-[60px] md:blur-[80px]"></div>
                <h3 className="text-[#d4af37] text-[8px] md:text-[10px] uppercase tracking-[3px] md:tracking-[5px] font-black mb-4 md:mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_15px_#d4af37]"></span>
                  Official Declaration
                </h3>
                <p className="text-white text-xl md:text-4xl font-serif font-light leading-snug tracking-wide">
                  The <span className="text-[#d4af37] italic font-bold animate-glint">Bastions of Hope</span> in the Heart of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP SECTION --- */}
      <section ref={timelineRef} id="roadmap" className="py-20 md:py-48 relative bg-[#0a1f1a] overflow-hidden border-y border-[#d4af37]/30">
        
        {/* Ornate Background Filigree Ref Image 1 & 2 */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/vintage-speckle.png')] opacity-[0.15]"></div>

        {/* SIDE MASKS */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0a1f1a] to-transparent z-30 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#0a1f1a] to-transparent z-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className={revealOnScroll(timelineInView)}>
            <h2 className={`text-4xl md:text-7xl font-serif font-black tracking-tight text-center md:text-left ${goldText}`}>The Royal Path</h2>
            <p className="text-[#d4af37] text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] mt-2 font-black italic text-center md:text-left drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">Journey to the Throne</p>
          </div>

          <div className="hidden md:block w-80 h-[4px] bg-white/5 relative rounded-full overflow-hidden border border-[#d4af37]/30 shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] shadow-[0_0_20px_#d4af37] transition-all duration-500 ease-out"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>

        {/* SWIPE HINT */}
        {!hasScrolled && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none animate-bounce-horizontal md:hidden">
            <div className="bg-[#d4af37] px-5 py-3 rounded-none border border-white shadow-[0_0_30px_#d4af37]">
                <span className="text-[#0a1f1a] text-[10px] font-black uppercase tracking-[0.2em]">Swipe Journey</span>
            </div>
          </div>
        )}

        <div 
          ref={timelineScrollRef}
          onScroll={handleScroll}
          className={`flex overflow-x-auto pb-24 md:pb-32 px-12 md:px-[15%] hide-scrollbar snap-x snap-mandatory ${revealOnScroll(timelineInView, 'delay-300')}`}
        >
          <div className="flex gap-10 md:gap-32 relative min-w-max items-center h-[550px] md:h-[650px]">
            
            {/* CENTRAL GLOW LINE */}
            <div className="absolute top-1/2 left-0 right-0 h-[4px] md:h-[8px] bg-[#d4af37]/10 -translate-y-1/2 z-0 rounded-full">
                <div 
                    className="h-full bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] shadow-[0_0_40px_rgba(212,175,55,0.8)] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(scrollProgress, 5)}%` }}
                ></div>
            </div>

            {roadmap.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative w-[280px] md:w-[450px] snap-center z-10 group">
                  
                  {/* NUMERAL */}
                  <span 
                      className={`absolute left-1/2 -translate-x-1/2 font-serif font-black text-[#d4af37]/5 select-none pointer-events-none transition-all duration-500 group-hover:text-[#d4af37]/15
                        text-[120px] md:text-[250px]
                        ${isEven ? 'top-[58%]' : 'bottom-[58%]'}`}
                      style={{ 
                        transform: `translateX(calc(-50% + ${(scrollX * 0.05) % 20}px))` 
                      }}
                  >
                      {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* TIMELINE NODE */}
                  <div className="absolute top-1/2 left-0 w-6 h-6 md:w-10 md:h-10 -translate-y-1/2 -translate-x-1/2 bg-[#fbf5e7] border-[4px] md:border-[6px] border-[#aa841e] rounded-full shadow-[0_0_25px_#d4af37] z-20 group-hover:scale-125 transition-transform duration-500">
                     <div className="absolute inset-0 bg-[#fbf5e7] rounded-full animate-ping opacity-40"></div>
                  </div>

                  {/* CONTENT CARD */}
                  <div className={`transition-all duration-[1000ms] ease-out 
                    ${isEven ? '-translate-y-32 md:-translate-y-40 group-hover:-translate-y-36 md:group-hover:-translate-y-44' : 'translate-y-32 md:translate-y-40 group-hover:translate-y-36 md:group-hover:translate-y-44'}`}>
                    <div className="relative p-[2px] rounded-none bg-gradient-to-br from-[#d4af37] via-transparent to-[#aa841e]">
                      <div className="bg-[#081612]/95 backdrop-blur-3xl p-6 md:p-10 rounded-none border-t border-white/20 transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(212,175,55,0.4)]">
                          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
                              <span className="h-[2px] w-6 md:w-12 bg-[#d4af37] shadow-[0_0_15px_#d4af37] group-hover:w-20 transition-all duration-700"></span>
                              <span className="text-[#d4af37] text-[10px] md:text-[11px] font-black tracking-widest uppercase drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">{step.date}</span>
                          </div>
                          <h3 className="text-white text-xl md:text-3xl font-serif font-bold mb-2 md:mb-4 tracking-tight group-hover:text-[#fbf5e7] transition-colors line-clamp-2 leading-tight">
                            {step.title}
                          </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-[150px] md:w-[300px]"></div>
          </div>
        </div>
      </section>

      {/* --- SPONSORS SECTION --- */}
      <section ref={sponsorsRef} id="sponsors" className="py-20 md:py-40 px-6 relative bg-[#0a1f1a]">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_20px_#d4af37]"></div>
        
        <div className={`max-w-7xl mx-auto text-center relative z-10 ${revealOnScroll(sponsorsInView)}`}>
          <div className="mb-16 md:mb-24 px-4">
            <h2 className={`text-4xl md:text-7xl font-serif font-bold mb-4 md:mb-6 tracking-tight ${goldText}`}>The Royal Partners</h2>
          </div>

          <div className="mb-20 md:mb-32">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-10 md:mb-12">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
              <h3 className="text-[#fbf5e7] text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase font-black whitespace-nowrap">Co-Presented By</h3>
              <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            </div>
            <div className="h-24 md:h-48 flex items-center justify-center transition-transform hover:scale-110 duration-700">
              <span className="text-6xl md:text-9xl grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default filter drop-shadow-[0_0_60px_rgba(212,175,55,0.6)]">🏛️</span>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row gap-10 md:gap-12 justify-center items-center ${revealOnScroll(sponsorsInView, "delay-500")}`}>
            <div className="flex-1 w-full md:w-auto text-center p-8 border border-[#d4af37]/10 bg-[#0a1f1a]/40 backdrop-blur-sm">
              <h3 className="text-[#d4af37] text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-black mb-8 md:mb-12">In Collaboration With</h3>
              <div className="flex justify-center gap-8 md:gap-12">
                <span className="text-4xl md:text-5xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer drop-shadow-[0_0_15px_rgba(212,175,55,0)] hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">🏢</span>
                <span className="text-4xl md:text-5xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer drop-shadow-[0_0_15px_rgba(212,175,55,0)] hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">🏢</span>
              </div>
            </div>
            <div className="hidden md:block w-[2px] h-32 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent shadow-[0_0_10px_#d4af37]"></div>
            <div className="flex-1 w-full md:w-auto text-center p-8 border border-[#d4af37]/10 bg-[#0a1f1a]/40 backdrop-blur-sm">
              <h3 className="text-[#d4af37] text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-black mb-8 md:mb-12">Sponsored By</h3>
              <div className="flex justify-center gap-8 md:gap-12">
                <span className="text-2xl md:text-3xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer hover:drop-shadow-[0_0_15px_#d4af37]">✨</span>
                <span className="text-2xl md:text-3xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer hover:drop-shadow-[0_0_15px_#d4af37]">✨</span>
                <span className="text-2xl md:text-3xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer hover:drop-shadow-[0_0_15px_#d4af37]">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-horizontal {
          0%, 100% { transform: translate(-50%, -50%) translateX(-15px); }
          50% { transform: translate(-50%, -50%) translateX(15px); }
        }
        @keyframes slowScroll {
          from { background-position: 0 0; }
          to { background-position: 0 1000px; }
        }
        @keyframes glint {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.8) drop-shadow(0_0_35px_#d4af37); }
        }
        @keyframes beam-sweep {
          0% { transform: translateX(-100%) rotate(12deg); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: translateX(100%) rotate(12deg); opacity: 0; }
        }
        @keyframes shine { 100% { left: 125%; } }
        @keyframes shine-fast {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-bounce-horizontal { animation: bounce-horizontal 2s ease-in-out infinite; }
        .bg-radial-vignette {
          background: radial-gradient(circle, transparent 30%, rgba(10, 31, 26, 0.95) 100%);
        }
        .animate-slowScroll { animation: slowScroll 60s linear infinite; }
        .animate-glint { animation: glint 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        .animate-beam-sweep { animation: beam-sweep 8s ease-in-out infinite; }
        .animate-shine { animation: shine 0.8s forwards; }
        .animate-shine-fast { animation: shine-fast 3s infinite linear; }
      `}</style>
    </div>
  )
}