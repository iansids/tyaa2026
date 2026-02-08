import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Hook for triggering animations on scroll
const useScrollReveal = () => {
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
      { threshold: 0.15 } // Trigger when 15% of the element is visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, hasRevealed];
};

export const LandingPage = ({ isAppReady }) => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  // Intersection Observers for lower sections
  const [aboutRef, aboutInView] = useScrollReveal();
  const [sponsorsRef, sponsorsInView] = useScrollReveal();

  useEffect(() => {
    // Only trigger Hero animations when the App-level loader is finished
    if (isAppReady) {
      const timer = setTimeout(() => setIsHeroLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isAppReady]);

  // Design Tokens
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 ease-in-out"

  // Entrance Animation Helper (for Hero)
  const revealHero = (delayClass) => `
    transition-all duration-[1400ms] cubic-bezier(0.16, 1, 0.3, 1)
    ${isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
    ${delayClass}
  `

  // Scroll Reveal Helper (for lower sections)
  const revealOnScroll = (inView, delay = "delay-0") => `
    transition-all duration-[1000ms] ease-out
    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
    ${delay}
  `

  return (
    <div className="w-full bg-[#0a1f1a] selection:bg-[#d4af37] selection:text-white">
      
      {/* Hero Section - Mobile */}
      <section className="md:hidden relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-[#0a1f1a]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#d4af37]/5 rounded-full blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#2d5a4d]/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 text-center space-y-4 flex flex-col items-center justify-center w-full">
          <div className={revealHero('delay-[200ms]')}>
            <div className="inline-block px-3 py-1.5 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
              <p className="text-[7px] uppercase tracking-[2px] text-[#d4af37] font-bold">SOCC Presents</p>
            </div>
          </div>

          <div className={`space-y-2 ${revealHero('delay-[400ms]')}`}>
            <span className={`text-4xl font-serif font-black leading-tight block ${goldText}`}>
              Thomasian Youth
            </span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-serif font-light text-white tracking-wide italic">
                Ambassador <span className="text-[#d4af37] not-italic">&</span> Ambassadress
              </span>
            </div>
          </div>

          <div className={`flex flex-col gap-3 w-full pt-2 ${revealHero('delay-[600ms]')}`}>
            <Link to="/candidates" className={`${goldBtn} px-6 py-2.5 rounded-sm font-bold text-[9px] text-[#0a1f1a] uppercase tracking-[1.5px] min-h-[44px] flex items-center justify-center w-full`}>
              Candidates
            </Link>
            <Link to="/voting" className="px-6 py-2.5 rounded-sm font-bold text-[9px] border border-[#d4af37]/50 text-[#d4af37] uppercase tracking-[1.5px] hover:bg-[#d4af37] hover:text-[#0a1f1a] transition-all duration-500 min-h-[44px] flex items-center justify-center w-full">
              Vote Now
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section - Desktop */}
      <section className="hidden md:flex relative min-h-screen items-center justify-center px-6 overflow-hidden pt-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2d5a4d]/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
        </div>

        <div className="relative max-w-5xl text-center z-10">
          <div className={revealHero('delay-[200ms]')}>
            <div className="inline-block mb-8 px-6 py-2 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[5px] text-[#d4af37] font-bold">
                The Student Organizations Coordinating Council Presents
              </p>
            </div>
          </div>

          <div className={`mb-10 flex flex-col items-center ${revealHero('delay-[400ms]')}`}>
            <span className="block text-base tracking-[0.8em] uppercase text-stone-400 font-light mb-4">The</span>
            <span className={`text-7xl lg:text-8xl font-serif font-black leading-[0.9] block ${goldText}`}>
              Thomasian Youth
            </span>
            <div className="relative mt-4 flex flex-col items-center">
              <span className="text-5xl lg:text-6xl font-serif font-light text-white tracking-[0.1em] flex items-center justify-center gap-4">
                <span className="italic">Ambassador</span>
                <span className="text-[#d4af37] not-italic font-normal font-serif">&</span>
                <span className="italic">Ambassadress</span>
              </span>
            </div>
          </div>

          <p className={`text-stone-400 text-lg font-light tracking-wide max-w-2xl mx-auto mb-12 ${revealHero('delay-[600ms]')}`}>
            Celebrating the <span className="text-[#d4af37]">Bastions of Hope</span>. Cast your vote for the leaders who redefine excellence through the heart of service.
          </p>

          <div className={`flex gap-6 justify-center ${revealHero('delay-[800ms]')}`}>
            <Link to="/candidates" className={`${goldBtn} px-12 py-5 rounded-sm font-bold text-[11px] text-[#0a1f1a] uppercase tracking-[3px] min-h-[44px] flex items-center justify-center`}>
              Meet Our Candidates
            </Link>
            <Link to="/voting" className="px-12 py-5 rounded-sm font-bold text-[11px] border border-[#d4af37]/50 text-[#d4af37] uppercase tracking-[3px] hover:bg-[#d4af37] hover:text-[#0a1f1a] transition-all duration-500 min-h-[44px] flex items-center justify-center">
              Cast Your Vote
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-24 lg:py-40 px-6 relative bg-[#081612] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className={`space-y-12 ${revealOnScroll(aboutInView)}`}>
              <h2 className={`text-5xl lg:text-7xl font-serif font-black leading-tight ${goldText}`}>
                The Heart of Service
              </h2>
              <div className="space-y-8 text-stone-400 text-lg lg:text-xl leading-relaxed font-light border-l border-[#d4af37]/20 pl-8">
                <p>
                  The <span className="text-white font-medium">Thomasian Youth Ambassador and Ambassadress</span> is not merely a title—it is a sovereign commitment to leadership.
                </p>
              </div>
              <div className="flex gap-16 pt-6">
                {[
                  { label: 'Royal Finalists', value: '18' },
                  { label: 'Academic Units', value: '18' },
                ].map((stat, i) => (
                  <div key={i} className="group flex-1 min-w-[120px]">
                    <p className={`text-5xl lg:text-6xl font-serif font-black ${goldText}`}>
                      {stat.value}
                    </p>
                    <div className="w-8 h-[2px] bg-[#d4af37] mt-3 mb-2"></div>
                    <p className="text-stone-500 text-[10px] uppercase tracking-[4px] font-bold">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`space-y-10 ${revealOnScroll(aboutInView, "delay-300")}`}>
              <div className="relative p-1 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/40 via-transparent to-[#d4af37]/10 rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-[#0a1f1a] p-10 lg:p-14 rounded-[calc(1.5rem-1px)] border border-white/5 overflow-hidden">
                  <h3 className={`text-2xl font-serif font-bold mb-6 tracking-wide ${goldText}`}>Our Mission</h3>
                  <p className="text-stone-300 text-lg leading-relaxed font-light italic">
                    "To recognize and celebrate individuals who demonstrate exceptional leadership, unwavering integrity, and a profound commitment to community service."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section ref={sponsorsRef} id="sponsors" className="py-24 lg:py-40 px-6 relative bg-[#0a1f1a]">
        <div className={`max-w-7xl mx-auto text-center relative z-10 ${revealOnScroll(sponsorsInView)}`}>
          <div className="mb-24">
            <h2 className={`text-4xl lg:text-6xl font-serif font-bold mb-6 tracking-tight ${goldText}`}>The Royal Partners</h2>
            <p className="text-stone-500 text-xs tracking-[0.6em] font-light uppercase">Honoring those who champion Thomasian Excellence</p>
          </div>

          <div className="mb-32">
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <h3 className="text-[#d4af37] text-sm tracking-[0.5em] uppercase font-black">Co-Presented By</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>
            <div className="h-32 lg:h-48 flex items-center justify-center transition-transform hover:scale-110 duration-700">
              <span className="text-8xl lg:text-9xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">🏛️</span>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row gap-12 justify-center items-center ${revealOnScroll(sponsorsInView, "delay-500")}`}>
            <div className="flex-1">
              <h3 className="text-stone-400 text-[10px] tracking-[0.4em] uppercase font-bold mb-12">In Collaboration With</h3>
              <div className="flex justify-center gap-12">
                <span className="text-5xl grayscale opacity-30 hover:opacity-100 transition-all">🏢</span>
                <span className="text-5xl grayscale opacity-30 hover:opacity-100 transition-all">🏢</span>
              </div>
            </div>
            <div className="hidden md:block w-[1px] h-32 bg-[#d4af37]/20"></div>
            <div className="flex-1">
              <h3 className="text-stone-400 text-[10px] tracking-[0.4em] uppercase font-bold mb-12">Sponsored By</h3>
              <div className="flex justify-center gap-12">
                <span className="text-3xl grayscale opacity-30 hover:opacity-100 transition-all">✨</span>
                <span className="text-3xl grayscale opacity-30 hover:opacity-100 transition-all">✨</span>
                <span className="text-3xl grayscale opacity-30 hover:opacity-100 transition-all">✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}