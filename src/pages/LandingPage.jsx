import { Link } from 'react-router-dom'

export const LandingPage = () => {
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#9a9e52] to-[#aa841e] hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300"

  return (
    <div className="w-full bg-[#0a1f1a]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-12 md:pt-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -right-40 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#3d7a6a]/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative max-w-4xl text-center space-y-6 md:space-y-8 z-10">
          <div className="inline-block px-4 md:px-6 py-2 md:py-3 border border-[#d4af37]/50 rounded-full">
            <p className="text-[10px] md:text-xs uppercase tracking-[3px] md:tracking-[4px] text-stone-400">Welcome to</p>
          </div>

          <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight">
            <span className={goldText}>TYAA</span>
            <span className="block text-stone-200 text-3xl md:text-5xl mt-2 md:mt-4">People's Choice Award</span>
          </h1>

          <p className="text-[13px] md:text-lg text-stone-500 leading-relaxed md:leading-8 max-w-2xl mx-auto">
            Celebrating excellence, leadership, and service. Cast your vote for the individuals who embody the spirit of achievement and community dedication.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2">
            <Link
              to="/candidates"
              className={`${goldBtn} px-8 md:px-10 py-3 md:py-4 rounded font-bold text-[13px] md:text-base text-[#0a1f1a] uppercase tracking-widest`}
            >
              Meet Our Candidates
            </Link>
            <Link
              to="/voting"
              className="px-8 md:px-10 py-3 md:py-4 rounded font-bold text-[13px] md:text-base border border-[#d4af37] text-[#d4af37] uppercase tracking-widest hover:bg-[#d4af37]/10 transition-colors"
            >
              Cast Your Vote
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 border-t border-[#d4af37]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-serif font-bold text-center mb-8 md:mb-16 ${goldText}`}>
            About TYAA 2026
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
            <div className="space-y-4 md:space-y-6 text-stone-300 text-[13px] md:text-base leading-7 md:leading-8">
              <p>
                The Youth Achievers Awards celebrates the remarkable achievements and dedicated service of outstanding individuals in our community. For years, TYAA has recognized those who embody excellence, integrity, and a passion for making a difference.
              </p>
              <p>
                Our People's Choice Award specifically honors the leaders chosen by the community—individuals whose actions have inspired others and whose commitment to service has left a lasting impact.
              </p>
              <p>
                This year's event brings together the finest candidates from institutions across the region, each bringing their unique perspective and demonstrated commitment to excellence.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#d4af37]/20 to-[#3d7a6a]/20 border border-[#d4af37]/30 rounded-lg p-6 md:p-8">
                <h3 className={`text-lg md:text-xl font-serif font-bold mb-4 ${goldText}`}>
                  Our Mission
                </h3>
                <p className="text-stone-400 text-[12px] md:text-sm leading-6">
                  To recognize and celebrate individuals who demonstrate exceptional leadership, unwavering integrity, and a profound commitment to community service and personal excellence.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#3d7a6a]/20 to-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg p-6 md:p-8">
                <h3 className={`text-lg md:text-xl font-serif font-bold mb-4 ${goldText}`}>
                  Tagline
                </h3>
                <p className="text-stone-400 text-[12px] md:text-sm leading-6 italic">
                  "The Bastions of Hope in the Heart of Service"
                </p>
              </div>
            </div>
          </div>

          {/* Event Details Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-12 md:py-16 border-t border-b border-[#d4af37]/10">
            {[
              { label: '2026', value: 'Edition Year' },
              { label: '12', value: 'Candidates' },
              { label: '6', value: 'Institutions' },
              { label: '2', value: 'Categories' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className={`text-2xl md:text-4xl font-serif font-bold ${goldText}`}>
                  {stat.label}
                </p>
                <p className="text-stone-600 text-[10px] md:text-xs uppercase tracking-[2px] mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-serif font-bold text-center mb-8 md:mb-16 ${goldText}`}>
            Our Partners
          </h2>

          <p className="text-center text-stone-400 text-[12px] md:text-sm uppercase tracking-[2px] mb-8 md:mb-12">
            Proudly Supported By
          </p>

          {/* Sponsors Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
              <div
                key={sponsor}
                className="aspect-square bg-gradient-to-br from-[#d4af37]/10 to-[#3d7a6a]/10 border border-[#d4af37]/20 rounded-lg flex items-center justify-center hover:border-[#d4af37]/40 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-[#d4af37]/20 flex items-center justify-center mb-3 mx-auto group-hover:bg-[#d4af37]/30 transition-colors">
                    <span className="text-2xl md:text-3xl">🏢</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-stone-500">Sponsor Logo</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-stone-500 text-[12px] md:text-sm mb-4">Interested in sponsoring?</p>
            <a href="mailto:info@tyaa2026.com" className="text-[#d4af37] hover:text-[#fbf5e7] transition-colors text-[13px] md:text-base font-medium">
              Get in touch with us →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
