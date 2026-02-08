import { Link } from 'react-router-dom'

export const LandingPage = () => {
  // Enhanced Gold Gradient for a more metallic look
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 ease-in-out"

  return (
    <div className="w-full bg-[#0a1f1a] selection:bg-[#d4af37] selection:text-white">
      {/* Hero Section - Mobile */}
      <section className="md:hidden relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-[#0a1f1a]">
        {/* Ambient Royal Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#d4af37]/5 rounded-full blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#2d5a4d]/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 text-center space-y-4 flex flex-col items-center justify-center w-full">
          {/* Badge */}
          <div className="inline-block px-3 py-1.5 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
            <p className="text-[7px] uppercase tracking-[2px] text-[#d4af37] font-bold">
              SOCC Presents
            </p>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <span className={`text-4xl font-serif font-black leading-tight block ${goldText}`}>
              Thomasian Youth
            </span>
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-serif font-light text-white tracking-wide flex items-center gap-1 flex-wrap justify-center">
                <span className="italic">Ambassador</span>
                <span className="text-[#d4af37]">&</span>
                <span className="italic">Ambassadress</span>
              </span>
              
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#d4af37]/60"></div>
                <span className="text-stone-400 text-[8px] tracking-[2px] uppercase font-bold">2026</span>
                <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#d4af37]/60"></div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-400 text-[11px] font-light tracking-wide leading-relaxed max-w-xs">
            Cast your vote for the leaders who redefine excellence through the heart of service.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full pt-2">
            <Link
              to="/candidates"
              className={`${goldBtn} px-6 py-2.5 rounded-sm font-bold text-[9px] text-[#0a1f1a] uppercase tracking-[1.5px] min-h-[44px] flex items-center justify-center w-full`}
            >
              Candidates
            </Link>
            <Link
              to="/voting"
              className="px-6 py-2.5 rounded-sm font-bold text-[9px] border border-[#d4af37]/50 text-[#d4af37] uppercase tracking-[1.5px] hover:bg-[#d4af37] hover:text-[#0a1f1a] transition-all duration-500 min-h-[44px] flex items-center justify-center w-full"
            >
              Vote Now
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section - Desktop */}
      <section className="hidden md:flex relative min-h-screen items-center justify-center px-6 overflow-hidden pt-0">
        {/* Ambient Royal Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2d5a4d]/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
        </div>

        <div className="relative max-w-5xl text-center z-10">
          {/* Badge */}
          <div className="inline-block mb-8 px-6 py-2 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[5px] text-[#d4af37] font-bold">
              The Student Organizations Coordinating Council Presents
            </p>
          </div>

          {/* Majestic Headline */}
          <div className="mb-10 flex flex-col items-center">
            <span className="block text-base tracking-[0.8em] uppercase text-stone-400 font-light mb-4">
              The
            </span>

            {/* Primary Focus */}
            <span className={`text-7xl lg:text-8xl font-serif font-black leading-[0.9] block ${goldText}`}>
              Thomasian Youth
            </span>

            {/* The "Special" Emphasis Section */}
            <div className="relative mt-4 flex flex-col items-center">
              <span className="text-5xl lg:text-6xl font-serif font-light text-white tracking-[0.1em] flex items-center justify-center gap-4">
                <span className="italic">Ambassador</span>
                <span className="text-[#d4af37] not-italic font-normal font-serif">&</span>
                <span className="italic">Ambassadress</span>
              </span>

              {/* Elegant Sub-label for the Year */}
              <div className="mt-6 flex items-center justify-center gap-8 w-full">
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent"></div>
                <span className="text-stone-400 text-sm tracking-[0.6em] uppercase font-bold whitespace-nowrap">
                  2026
                </span>
                <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-transparent"></div>
              </div>
            </div>
          </div>

          <p className="text-stone-400 text-lg font-light tracking-wide leading-relaxed max-w-2xl mx-auto mb-12">
            Celebrating the <span className="text-[#d4af37]">Bastions of Hope</span>. Cast your vote for the leaders who redefine excellence through the heart of service.
          </p>

          <div className="flex gap-6 justify-center">
            <Link
              to="/candidates"
              className={`${goldBtn} px-12 py-5 rounded-sm font-bold text-[11px] text-[#0a1f1a] uppercase tracking-[3px] min-h-[44px] flex items-center justify-center`}
            >
              Meet Our Candidates
            </Link>
            <Link
              to="/voting"
              className="px-12 py-5 rounded-sm font-bold text-[11px] border border-[#d4af37]/50 text-[#d4af37] uppercase tracking-[3px] hover:bg-[#d4af37] hover:text-[#0a1f1a] transition-all duration-500 min-h-[44px] flex items-center justify-center"
            >
              Cast Your Vote
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-24 lg:py-40 px-4 sm:px-6 relative bg-[#081612] overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[150px] -mr-64 -mt-64"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
        
          {/* Left Column: The Narrative */}
          <div className="relative z-10 space-y-6 md:space-y-8 lg:space-y-12">
            <div className="space-y-2 md:space-y-4">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-black leading-tight ${goldText}`}>
                The Heart of Service
              </h2>
            </div>
            
            <div className="space-y-4 md:space-y-8 text-stone-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light border-l border-[#d4af37]/20 pl-4 md:pl-8">
              <p>
                The <span className="text-white font-medium">Thomasian Youth Ambassador and Ambassadress</span> is not merely a title—it is a sovereign commitment to leadership and the pursuit of Thomasian excellence.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-stone-500 italic">
                Rooted in the mission of the SOCC, we cultivate servant-leaders who navigate the complexities of a global landscape with compassion, competence, and commitment.
              </p>
            </div>

            {/* Stats Section: High-End Minimalist */}
            <div className="flex gap-8 md:gap-12 lg:gap-16 pt-4 md:pt-6 flex-wrap">
              {[
                { label: 'Royal Finalists', value: '18' },
                { label: 'Academic Units', value: '18' },
              ].map((stat, i) => (
                <div key={i} className="relative group flex-1 min-w-[120px]">
                  <p className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black ${goldText} transition-transform duration-500 group-hover:-translate-y-2`}>
                    {stat.value}
                  </p>
                  <div className="w-6 md:w-8 h-[2px] bg-[#d4af37] mt-2 md:mt-3 mb-2"></div>
                  <p className="text-stone-500 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[2px] md:tracking-[4px] font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: The Bastions (Mission & Tagline) */}
          <div className="relative space-y-4 md:space-y-6 lg:space-y-10">
            {/* Mission Card: The Gilded Frame */}
            <div className="relative p-1 group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/40 via-transparent to-[#d4af37]/10 rounded-2xl md:rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative bg-[#0a1f1a] p-4 sm:p-6 md:p-10 lg:p-14 rounded-[calc(1rem-1px)] md:rounded-[calc(1.5rem-1px)] border border-white/5 overflow-hidden">
                {/* Corner Flourish */}
                <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-20">
                  <span className="text-2xl sm:text-3xl md:text-4xl text-[#d4af37]">✧</span>
                </div>
                
                <h3 className={`text-lg sm:text-xl md:text-2xl font-serif font-bold mb-3 md:mb-6 tracking-wide ${goldText}`}>
                  Our Mission
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-light italic">
                  "To recognize and celebrate individuals who demonstrate exceptional leadership, unwavering integrity, and a profound commitment to community service and personal excellence."
                </p>
              </div>
            </div>

            {/* Tagline Card: The Sovereign Seal */}
            <div className="relative bg-gradient-to-b from-[#112621] to-[#0a1f1a] border border-[#d4af37]/30 p-4 sm:p-6 md:p-10 lg:p-14 rounded-2xl md:rounded-3xl shadow-2xl group overflow-hidden">
              {/* Moving light effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4af37]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              
              <h3 className="text-[#d4af37] text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[3px] sm:tracking-[5px] font-bold mb-3 md:mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
                Official Declaration
              </h3>
              
              <p className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light leading-snug tracking-wide">
                The <span className="text-[#d4af37] italic">Bastions of Hope</span> in the Heart of Service
              </p>

              <div className="mt-4 md:mt-8 flex flex-wrap items-center gap-2 sm:gap-4 text-stone-500 uppercase text-[7px] sm:text-[8px] md:text-[9px] tracking-[2px] md:tracking-[4px]">
                <span>Est. 2026</span>
                <span className="w-1 h-1 bg-stone-700 rounded-full"></span>
                <span>SOCC Leadership Program</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-12 sm:py-16 md:py-24 lg:py-40 px-4 sm:px-6 relative bg-[#0a1f1a] overflow-hidden">
        {/* Radial Spotlight Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          
          {/* Section Header */}
          <div className="mb-12 md:mb-16 lg:mb-24">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif font-bold mb-3 md:mb-6 tracking-tight ${goldText}`}>
              The Royal Partners
            </h2>
            <p className="text-stone-500 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs uppercase tracking-[2px] sm:tracking-[3px] md:tracking-[0.6em] font-light">
              Honoring those who champion Thomasian Excellence
            </p>
          </div>

          {/* TIER 1: Co-Presented By - THE CROWN JEWEL */}
          <div className="mb-12 md:mb-16 lg:mb-32 flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 md:mb-12 w-full max-w-2xl px-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <h3 className="text-[#d4af37] text-[8px] sm:text-[9px] md:text-xs lg:text-sm tracking-[2px] sm:tracking-[3px] md:tracking-[0.5em] uppercase font-black whitespace-nowrap">
                Co-Presented By
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-[#d4af37]/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative h-20 sm:h-24 md:h-32 lg:h-48 flex items-center justify-center transition-all duration-700 transform group-hover:scale-105">
                <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">🏛️</span>
              </div>
              <p className="mt-3 md:mt-6 lg:mt-8 text-stone-300 text-[9px] md:text-sm tracking-[3px] md:tracking-[6px] uppercase font-serif font-light">
                Lead Principal Partner
              </p>
            </div>
          </div>

          {/* LOWER TIERS: In Collaboration With & Sponsored By (Horizontal Row) */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-6 lg:gap-0">
            
            {/* Left Wing: In Collaboration With */}
            <div className="flex-1 px-2 sm:px-4 md:px-8">
              <h3 className="text-stone-400 text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[0.4em] uppercase font-bold mb-6 md:mb-12 flex flex-col items-center">
                In Collaboration With
                <span className="mt-2 md:mt-4 w-6 md:w-8 h-[1px] bg-[#d4af37]/30"></span>
              </h3>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {[1, 2].map((i) => (
                  <div key={i} className="group flex items-center justify-center">
                    <div className="h-10 sm:h-12 md:h-16 w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      <span className="text-3xl md:text-5xl">🏢</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regal Center Divider */}
            <div className="hidden md:flex flex-col items-center min-h-[200px] lg:min-h-[300px]">
              <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent"></div>
              <div className="p-2 border border-[#d4af37]/20 rounded-full my-auto rotate-45">
                <div className="w-1.5 h-1.5 bg-[#d4af37]/40 rounded-full"></div>
              </div>
              <div className="w-[1px] flex-1 bg-gradient-to-t from-transparent via-[#d4af37]/20 to-transparent"></div>
            </div>

            {/* Right Wing: Sponsored By */}
            <div className="flex-1 px-2 sm:px-4 md:px-8">
              <h3 className="text-stone-400 text-[8px] sm:text-[9px] md:text-[10px] tracking-[2px] md:tracking-[0.4em] uppercase font-bold mb-6 md:mb-12 flex flex-col items-center">
                Sponsored By
                <span className="mt-2 md:mt-4 w-6 md:w-8 h-[1px] bg-[#d4af37]/30"></span>
              </h3>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group flex items-center justify-center">
                    <div className="h-6 sm:h-8 md:h-10 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-xl md:text-3xl">✨</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Final Decorative Footer */}
          <div className="mt-12 md:mt-16 lg:mt-32 flex flex-col items-center">
            <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-6 md:mb-12"></div>
            <a href="mailto:info@tyaa2026.com" className="group">
              <span className="text-stone-500 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[2px] sm:tracking-[3px] md:tracking-[5px] group-hover:text-[#d4af37] transition-all duration-700">
                The Bastion Partnership Program
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}