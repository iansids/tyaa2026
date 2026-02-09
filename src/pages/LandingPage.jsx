import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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
  const [aboutRef, aboutInView] = useScrollReveal();
  const [sponsorsRef, sponsorsInView] = useScrollReveal();

  useEffect(() => {
    if (isAppReady) {
      const timer = setTimeout(() => setIsHeroLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isAppReady]);

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
    <div className="w-full bg-[#0a1f1a] selection:bg-[#d4af37] selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden pt-0 border-b border-[#d4af37]/20">
        
        {/* PAGEANT STAGE BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#d4af37]/20 rounded-full blur-[100px] animate-pulse opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#2d5a4d]/30 rounded-full blur-[100px] opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4af37]/5 to-transparent rotate-12 -translate-x-full animate-beam-sweep pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60 mix-blend-screen animate-slowScroll"></div>
          <div className="absolute inset-0 bg-radial-vignette opacity-80"></div>
        </div>

        <div className="relative max-w-6xl text-center z-10 flex flex-col items-center w-full">
          
          {/* Badge / SOCC Presents */}
          <div className={revealHero('delay-[200ms]')}>
            <div className="inline-flex items-center gap-2 md:gap-4 mb-8 md:mb-10 px-4 md:px-8 py-2 md:py-2.5 border-x border-[#d4af37]/60 bg-[#0a1f1a]/80 backdrop-blur-xl shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              <span className="text-[#d4af37] text-[10px] animate-spin-slow">✧</span>
              <p className="text-[8px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.8em] text-[#d4af37] font-black whitespace-nowrap">SOCC Presents</p>
              <span className="text-[#d4af37] text-[10px] animate-spin-slow">✧</span>
            </div>
          </div>

          {/* Main Title Stack */}
          <div className={`mb-8 md:mb-12 flex flex-col items-center w-full ${revealHero('delay-[400ms]')}`}>
            <h1 className={`text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-black leading-[1.1] md:leading-[0.85] block relative ${goldText}`}>
              Thomasian Youth
            </h1>

            <div className="relative mt-6 md:mt-10 flex flex-col items-center w-full">
              <span className="text-xl sm:text-3xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-widest flex flex-wrap items-center justify-center gap-2 md:gap-6 italic drop-shadow-lg">
                Ambassador 
                <span className="text-[#d4af37] not-italic font-serif font-normal text-2xl md:text-6xl animate-glint">&</span> 
                Ambassadress
              </span>
              
              {/* Royal Seal / Year Divider */}
              <div className="mt-6 md:mt-8 flex items-center justify-center gap-4 md:gap-12 w-full px-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                <span className="text-[#d4af37] text-xs md:text-lg tracking-[0.4em] md:tracking-[0.8em] font-bold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">2026</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className={`text-stone-200 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed italic px-2 ${revealHero('delay-[600ms]')}`}>
            Celebrating the <span className="text-[#d4af37] font-semibold not-italic">Bastions of Hope</span>. Cast your vote for the leaders who redefine excellence through the heart of service.
          </p>

          {/* CTA Buttons - Mobile Stack, Desktop Row */}
          <div className={`flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full md:w-auto px-4 md:px-0 ${revealHero('delay-[800ms]')}`}>
            <Link to="/candidates" className={`${goldBtn} w-full md:w-auto px-10 md:px-14 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs text-[#0a1f1a] uppercase tracking-[2px] md:tracking-[3px] text-center`}>
              <span className="relative z-10 whitespace-nowrap">Meet Our Candidates</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/60 opacity-50 group-hover:animate-shine" />
            </Link>
            
            <Link to="/voting" className="w-full md:w-auto px-10 md:px-14 py-4 md:py-5 rounded-full font-black text-[10px] md:text-xs border-2 border-[#d4af37]/60 text-[#d4af37] uppercase tracking-[2px] md:tracking-[3px] hover:bg-[#d4af37] hover:text-[#0a1f1a] transition-all duration-700 backdrop-blur-md bg-[#0a1f1a]/20 text-center whitespace-nowrap">
              Cast Your Vote
            </Link>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      {/* Keeping content and styles as they are, but ensuring grid responsiveness is solid */}
      <section ref={aboutRef} id="about" className="py-20 md:py-40 px-6 relative bg-[#081612] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
            
            <div className={`space-y-8 md:space-y-12 ${revealOnScroll(aboutInView)}`}>
              <h2 className={`text-4xl md:text-7xl font-serif font-black leading-tight ${goldText}`}>
                The Heart of Service
              </h2>
              <div className="space-y-6 md:space-y-8 text-stone-300 text-base md:text-xl leading-relaxed font-light border-l-2 border-[#d4af37]/40 pl-6 md:pl-8">
                <p>
                  The <span className="text-white font-medium">Thomasian Youth Ambassador and Ambassadress</span> is not merely a title—it is a sovereign commitment to leadership and the pursuit of Thomasian excellence.
                </p>
                <p className="text-sm md:text-base text-stone-500 italic">
                  Rooted in the mission of the SOCC, we cultivate servant-leaders who navigate the complexities of a global landscape with compassion, competence, and commitment.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 md:gap-16 pt-4">
                {[
                  { label: 'Royal Finalists', value: '18' },
                  { label: 'Academic Units', value: '18' },
                ].map((stat, i) => (
                  <div key={i} className="group min-w-[100px]">
                    <p className={`text-4xl md:text-6xl font-serif font-black ${goldText}`}>
                      {stat.value}
                    </p>
                    <div className="w-10 md:w-12 h-[2px] bg-[#d4af37] mt-2 mb-2"></div>
                    <p className="text-stone-400 text-[8px] md:text-[10px] uppercase tracking-[2px] md:tracking-[4px] font-bold">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`space-y-8 md:space-y-10 ${revealOnScroll(aboutInView, "delay-300")}`}>
              <div className="relative p-1 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/60 via-transparent to-[#d4af37]/20 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-[#0a1f1a] p-8 md:p-14 rounded-[calc(1.5rem-1px)] border border-white/10 overflow-hidden shadow-2xl">
                  <h3 className={`text-xl md:text-2xl font-serif font-bold mb-4 md:mb-6 tracking-wide ${goldText}`}>Our Mission</h3>
                  <p className="text-stone-200 text-base md:text-lg leading-relaxed font-light italic">
                    "To recognize and celebrate individuals who demonstrate exceptional leadership, unwavering integrity, and a profound commitment to community service and personal excellence."
                  </p>
                </div>
              </div>

              <div className="relative bg-gradient-to-b from-[#112621] to-[#0a1f1a] border border-[#d4af37]/50 p-8 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-[#d4af37]/10 rounded-full blur-[60px] md:blur-[80px]"></div>
                <h3 className="text-[#d4af37] text-[8px] md:text-[10px] uppercase tracking-[3px] md:tracking-[5px] font-bold mb-4 md:mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_10px_#d4af37]"></span>
                  Official Declaration
                </h3>
                <p className="text-white text-xl md:text-4xl font-serif font-light leading-snug tracking-wide">
                  The <span className="text-[#d4af37] italic">Bastions of Hope</span> in the Heart of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPONSORS SECTION --- */}
      <section ref={sponsorsRef} id="sponsors" className="py-20 md:py-40 px-6 relative bg-[#0a1f1a]">
        <div className={`max-w-7xl mx-auto text-center relative z-10 ${revealOnScroll(sponsorsInView)}`}>
          <div className="mb-16 md:mb-24 px-4">
            <h2 className={`text-3xl md:text-6xl font-serif font-bold mb-4 md:mb-6 tracking-tight ${goldText}`}>The Royal Partners</h2>
            <p className="text-stone-400 text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] font-light uppercase">Honoring those who champion Thomasian Excellence</p>
          </div>

          <div className="mb-20 md:mb-32">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-10 md:mb-12">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
              <h3 className="text-[#d4af37] text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase font-black whitespace-nowrap">Co-Presented By</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent"></div>
            </div>
            <div className="h-24 md:h-48 flex items-center justify-center transition-transform hover:scale-110 duration-700">
              <span className="text-6xl md:text-9xl grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default filter drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">🏛️</span>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row gap-10 md:gap-12 justify-center items-center ${revealOnScroll(sponsorsInView, "delay-500")}`}>
            <div className="flex-1 w-full md:w-auto">
              <h3 className="text-stone-400 text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold mb-8 md:mb-12">In Collaboration With</h3>
              <div className="flex justify-center gap-8 md:gap-12">
                <span className="text-4xl md:text-5xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer">🏢</span>
                <span className="text-4xl md:text-5xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer">🏢</span>
              </div>
            </div>
            <div className="hidden md:block w-[1px] h-32 bg-[#d4af37]/30"></div>
            <div className="flex-1 w-full md:w-auto">
              <h3 className="text-stone-400 text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold mb-8 md:mb-12">Sponsored By</h3>
              <div className="flex justify-center gap-8 md:gap-12">
                <span className="text-2xl md:text-3xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer">✨</span>
                <span className="text-2xl md:text-3xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer">✨</span>
                <span className="text-2xl md:text-3xl grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slowScroll {
          from { background-position: 0 0; }
          to { background-position: 0 1000px; }
        }
        @keyframes shine {
          100% { left: 125%; }
        }
        @keyframes glint {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.6) drop-shadow(0_0_15px_#d4af37); }
        }
        @keyframes beam-sweep {
          0% { transform: translateX(-100%) rotate(12deg); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(100%) rotate(12deg); opacity: 0; }
        }
        .bg-radial-vignette {
          background: radial-gradient(circle, transparent 30%, rgba(10, 31, 26, 0.95) 100%);
        }
        .animate-slowScroll { animation: slowScroll 60s linear infinite; }
        .animate-shine { animation: shine 0.8s forwards; }
        .animate-glint { animation: glint 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        .animate-beam-sweep { animation: beam-sweep 8s ease-in-out infinite; }
      `}</style>
    </div>
  )
}