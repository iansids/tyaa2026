import { useState, useEffect, useMemo } from 'react'

/**
 * REPRESENTATIVE DATA
 * Replace initials with image URLs in the 'photo' field once available.
 * Current Colleges: Arts & Letters, Science, Engineering, Commerce, Accountancy, Architecture.
 */
const contestants = [
  // Faculty of Arts and Letters
  { id: 1, name: "Maria Santos", college: "Faculty of Arts and Letters", gender: "female", hometown: "Manila", initials: "MS" },
  { id: 2, name: "Julian Reyes", college: "Faculty of Arts and Letters", gender: "male", hometown: "Bulacan", initials: "JR" },

  // College of Science
  { id: 3, name: "Angela Cruz", college: "College of Science", gender: "female", hometown: "Cebu City", initials: "AC" },
  { id: 4, name: "Marcus Villanueva", college: "College of Science", gender: "male", hometown: "Pampanga", initials: "MV" },

  // Faculty of Engineering
  { id: 5, name: "Sofia Reyes", college: "Faculty of Engineering", gender: "female", hometown: "Davao City", initials: "SR" },
  { id: 6, name: "Nathaniel Chen", college: "Faculty of Engineering", gender: "male", hometown: "Batangas", initials: "NC" },

  // College of Commerce
  { id: 7, name: "Isabella Garcia", college: "College of Commerce", gender: "female", hometown: "Quezon City", initials: "IG" },
  { id: 8, name: "Ricardo De Leon", college: "College of Commerce", gender: "male", hometown: "Makati", initials: "RL" },

  // AMV College of Accountancy
  { id: 9, name: "Camille Torres", college: "AMV College of Accountancy", gender: "female", hometown: "Iloilo City", initials: "CT" },
  { id: 10, name: "Anthony Sy", college: "AMV College of Accountancy", gender: "male", hometown: "Cavite", initials: "AS" },

  // College of Architecture
  { id: 11, name: "Nicole Fernandez", college: "College of Architecture", gender: "female", hometown: "Baguio City", initials: "NF" },
  { id: 12, name: "Gabriel Pangilinan", college: "College of Architecture", gender: "male", hometown: "Rizal", initials: "GP" },
]

const App = () => {
  const [votes, setVotes] = useState({})
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // --- Logic ---

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const colleges = useMemo(() => ['All', ...new Set(contestants.map(c => c.college))], [])

  const filteredContestants = useMemo(() => {
    return filter === 'All' ? contestants : contestants.filter(c => c.college === filter)
  }, [filter])

  const handleVote = (candidateId) => {
    if (hasVoted) return
    setVotes(prev => ({ ...prev, [candidateId]: (prev[candidateId] || 0) + 1 }))
    setHasVoted(true)
    setSelectedCandidate(candidateId)
  }

  const scrollToSection = (id) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // --- Styles ---
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] text-[#0a1f1a] hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500"

  return (
    <div className="min-h-screen bg-[#0a1f1a] text-stone-200 selection:bg-[#d4af37] selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. Loading Screen */}
      {showLoading && (
        <div className="fixed inset-0 z-[9999] bg-[#0a1f1a] flex items-center justify-center">
          <div className="text-center animate-fadeOut">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center text-7xl animate-bounce">👑</div>
            </div>
            <h2 className={`text-4xl font-serif font-bold mb-4 ${goldText}`}>TYAA 2026</h2>
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          </div>
        </div>
      )}

      {/* 2. Premium Navbar */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0a1f1a]/95 py-2 md:py-3 shadow-2xl backdrop-blur-lg border-b border-[#d4af37]/20' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="w-8 md:w-10 h-8 md:h-10 border border-[#d4af37] rounded-full flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg]">
              <span className="text-sm md:text-lg">👑</span>
            </div>
            <span className={`text-sm md:text-xl font-serif tracking-widest font-bold ${goldText}`}>TYAA</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {['home', 'about', 'gallery', 'voting'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className={`uppercase text-[10px] tracking-[3px] font-bold hover:text-[#d4af37] transition-colors ${activeSection === item ? 'text-[#d4af37]' : 'text-stone-400'}`}
              >
                {item === 'gallery' ? 'Candidates' : item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:text-[#d4af37] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1f1a]/95 backdrop-blur-lg border-t border-[#d4af37]/20 py-4">
            <div className="max-w-7xl mx-auto px-4 space-y-3">
              {['home', 'about', 'gallery', 'voting'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-2 uppercase text-[10px] tracking-[2px] font-bold rounded transition-colors ${activeSection === item ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-stone-400 hover:text-[#d4af37]'}`}
                >
                  {item === 'gallery' ? 'Candidates' : item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 3. Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 md:pt-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a3d34] via-[#0a1f1a] to-[#0a1f1a]"></div>
        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto my-auto">
          <div className="mb-4 md:mb-6 inline-block px-3 md:px-4 py-1.5 md:py-2 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
             <span className="text-[#d4af37] tracking-[2px] md:tracking-[4px] uppercase text-[8px] md:text-[10px] font-bold">Student Organizations Coordinating Council</span>
          </div>
          <div className="relative inline-block">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-black mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] tracking-tight ${goldText}`}>
              Thomasian Youth <br className="hidden sm:block" />
              <span className="italic font-light text-2xl sm:text-3xl md:text-5xl lg:text-6xl">Ambassador</span> 
              <span className="mx-1 md:mx-3 text-xl md:text-4xl lg:text-5xl font-light text-[#d4af37]/50 inline-block">&</span> 
              <span className="italic font-light text-2xl sm:text-3xl md:text-5xl lg:text-6xl">Ambassadress</span>
            </h1>
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-6 md:mb-12">
              <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
              <span className="text-[8px] md:text-[10px] tracking-[3px] md:tracking-[5px] uppercase text-stone-500 font-bold">2026</span>
              <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-stone-400 text-sm md:text-lg lg:text-xl font-light tracking-wide leading-relaxed mb-6 md:mb-10">
            Witness the strength of service and the heart of advocacy as we empower the next generation of Thomasian servant-leaders.
          </p>
          <button onClick={() => scrollToSection('voting')} className={`px-6 md:px-10 py-3 md:py-5 rounded-full uppercase tracking-[2px] md:tracking-[3px] font-bold text-xs md:text-sm ${goldBtn}`}>
            Cast Your Vote
          </button>
        </div>
      </section>

      {/* 4. About Section */}
      <section id="about" className="py-16 md:py-32 relative border-y border-[#d4af37]/10 bg-[#081612]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <div className="relative group">
             <div className="absolute -inset-4 border border-[#d4af37]/10 rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-1000"></div>
             <div className="relative h-[500px] bg-[#0a1f1a] rounded-2xl overflow-hidden border border-[#d4af37]/20 flex items-center justify-center">
                <span className="text-[200px] opacity-[0.03] select-none">UST</span>
                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-[#0a1f1a] to-transparent">
                   <p className={`text-4xl font-serif ${goldText}`}>May 2, 2026</p>
                   <p className="text-stone-500 uppercase tracking-widest text-xs font-bold mt-2">UST Plaza Mayor</p>
                </div>
             </div>
          </div>
          
          <div className="space-y-8">
            <h2 className={`text-5xl font-serif leading-tight ${goldText}`}>In the Heart <br/> of Service</h2>
            <p className="text-stone-300 text-sm md:text-base lg:text-lg leading-relaxed font-light">
              TYAA is the premier leadership development program of the <strong className="text-white">SOCC</strong>. We form servant-leaders who stand as <span className="italic text-[#d4af37]">bastions of strength</span>—rooted in protection, guided by hope, and dedicated to meaningful community action that leaves a lasting Thomasian impact.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
              {[
                "Strength rooted in service",
                "Advocacy through action",
                "Succession of leadership",
                "Heart of Thomasian values"
              ].map(item => (
                <div key={item} className="flex items-start gap-2 md:gap-3 text-[8px] md:text-xs uppercase tracking-widest text-stone-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 flex-shrink-0"></div>
                  <span className="leading-tight">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t border-[#d4af37]/10">
               <div>
                  <h4 className="text-2xl md:text-4xl font-serif text-white">##</h4>
                  <p className="text-[#d4af37] uppercase tracking-tighter text-[8px] md:text-[10px] font-bold mt-1">Delegates</p>
               </div>
               <div>
                  <h4 className="text-2xl md:text-4xl font-serif text-white">##</h4>
                  <p className="text-[#d4af37] uppercase tracking-tighter text-[8px] md:text-[10px] font-bold mt-1">Colleges</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Candidates Section (With Filtering) */}
      <section id="gallery" className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 ${goldText}`}>The Candidates</h2>
          <div className="w-12 md:w-20 h-[1px] bg-[#d4af37] mx-auto mb-8 md:mb-16"></div>

          {/* College Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-16 md:mb-20">
            {colleges.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 md:px-6 py-1.5 md:py-2 rounded-full text-[7px] md:text-[9px] tracking-[1px] md:tracking-[2px] uppercase font-bold border transition-all duration-500 ${
                  filter === c 
                    ? 'bg-[#d4af37] border-[#d4af37] text-[#0a1f1a] shadow-lg shadow-[#d4af37]/20' 
                    : 'border-[#d4af37]/20 text-stone-500 hover:border-[#d4af37]/60'
                }`}
              >
                {c.length > 20 ? c.substring(0, 20) + '...' : c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {filteredContestants.map(c => (
              <div key={c.id} className="group relative animate-fadeIn">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-[#d4af37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden md:block"></div>
                <div className="relative bg-[#0a1f1a] border border-white/5 p-1 md:p-2">
                  <div className="h-[300px] md:h-[400px] lg:h-[450px] bg-[#1a2f2a] flex items-center justify-center relative overflow-hidden">
                    <span className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#d4af37]/10 italic">{c.initials}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f1a] via-transparent to-transparent"></div>
                  </div>
                  <div className="p-4 md:p-6 lg:p-8">
                    <p className="text-[#d4af37] text-[8px] md:text-[10px] tracking-[3px] md:tracking-[4px] uppercase mb-2">Candidate 0{c.id}</p>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-serif text-white mb-2 group-hover:tracking-wider transition-all duration-500 line-clamp-2">{c.name}</h3>
                    <p className="text-stone-500 text-[8px] md:text-[10px] uppercase tracking-widest line-clamp-2">{c.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Voting Section */}
      <section id="voting" className="py-16 md:py-32 bg-[#081612]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-[#0a1f1a] border border-[#d4af37]/20 rounded-2xl md:rounded-[40px] p-6 md:p-10 lg:p-20 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
             
             <div className="text-center mb-10 md:mb-16 lg:mb-20">
               <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 ${goldText}`}>Cast Your Ballot</h2>
               <p className="text-stone-500 max-w-xl mx-auto font-light text-sm md:text-base">Your vote determines the People's Choice Award. Choose the representative who best embodies Thomasian service.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
               {filteredContestants.map(c => (
                 <div key={c.id} className={`p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border transition-all duration-500 ${selectedCandidate === c.id ? 'bg-[#d4af37]/5 border-[#d4af37]' : 'bg-white/5 border-white/5 hover:border-[#d4af37]/40'}`}>
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                      <div className="w-8 md:w-10 h-8 md:h-10 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] text-[10px] md:text-xs font-serif flex-shrink-0">0{c.id}</div>
                      <div className="text-right">
                        <p className="text-2xl md:text-3xl font-serif text-white">{votes[c.id] || 0}</p>
                        <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-600">Total Votes</p>
                      </div>
                    </div>
                    <h4 className="text-base md:text-lg lg:text-xl font-serif text-white mb-1 line-clamp-2">{c.name}</h4>
                    <p className="text-[#d4af37]/60 text-[8px] md:text-[10px] uppercase tracking-widest mb-6 md:mb-8 line-clamp-2">{c.college}</p>
                    <button 
                      onClick={() => handleVote(c.id)}
                      disabled={hasVoted}
                      className={`w-full py-2.5 md:py-4 rounded-lg md:rounded-xl uppercase tracking-[1px] md:tracking-[2px] text-[8px] md:text-[10px] font-bold transition-all duration-500 touch-target ${
                        selectedCandidate === c.id 
                        ? 'bg-[#d4af37] text-[#0a1f1a]' 
                        : hasVoted ? 'bg-stone-800 text-stone-600 cursor-not-allowed opacity-50' : 'border border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a1f1a]'
                      }`}
                    >
                      {selectedCandidate === c.id ? 'Sovereign Choice' : hasVoted ? 'Ballot Closed' : 'Confirm Vote'}
                    </button>
                 </div>
               ))}
             </div>

             {hasVoted && (
                <div className="mt-10 md:mt-16 text-center animate-bounce">
                  <p className={`text-base md:text-lg lg:text-xl font-serif ${goldText}`}>👑 Thank you for shaping the legacy!</p>
                </div>
             )}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-12 md:py-20 border-t border-[#d4af37]/10 text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-10">
            <div className="h-[1px] w-8 md:w-12 bg-[#d4af37]/30"></div>
            <p className={`text-xl md:text-2xl font-serif tracking-[0.2em] md:tracking-[0.3em] ${goldText}`}>TYAA 2026</p>
            <div className="h-[1px] w-8 md:w-12 bg-[#d4af37]/30"></div>
          </div>
          <p className="text-stone-600 text-[8px] md:text-[10px] uppercase tracking-[2px] md:tracking-[4px] mb-2 md:mb-4">The Bastions of Hope in the Heart of Service</p>
          <p className="text-stone-700 text-[7px] md:text-[9px] uppercase tracking-widest italic">Official People's Choice Award Voting Portal</p>
        </div>
      </footer>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeOut {
          animation: fadeOut 3.5s forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .touch-target {
          min-height: 44px; /* Apple's recommended minimum touch target */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Better scrollbar for mobile */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a1f1a;
        }
        ::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}

export default App