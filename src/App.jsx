import { useState, useEffect } from 'react'

const contestants = [
  { id: 1, name: "Maria Santos", age: 18, hometown: "Manila", bio: "A passionate advocate for youth empowerment and education.", initials: "MS" },
  { id: 2, name: "Angela Cruz", age: 19, hometown: "Cebu City", bio: "An aspiring environmental scientist dedicated to sustainability.", initials: "AC" },
  { id: 3, name: "Sofia Reyes", age: 17, hometown: "Davao City", bio: "A talented musician and mental health awareness advocate.", initials: "SR" },
  { id: 4, name: "Isabella Garcia", age: 18, hometown: "Quezon City", bio: "A community volunteer focused on helping underprivileged children.", initials: "IG" },
  { id: 5, name: "Camille Torres", age: 19, hometown: "Iloilo City", bio: "An athlete and advocate for women in sports.", initials: "CT" },
  { id: 6, name: "Nicole Fernandez", age: 18, hometown: "Baguio City", bio: "A cultural arts enthusiast preserving indigenous traditions.", initials: "NF" },
]

const App = () => {
  const [votes, setVotes] = useState({})
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  // Loading screen - fade out after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  // Handle Navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleVote = (candidateId) => {
    if (hasVoted) return
    setVotes(prev => ({ ...prev, [candidateId]: (prev[candidateId] || 0) + 1 }))
    setHasVoted(true)
    setSelectedCandidate(candidateId)
  }

  const scrollToSection = (id) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Golden Text Class
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] text-[#0a1f1a] hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500"

  return (
    <div className="min-h-screen bg-[#0a1f1a] text-stone-200 selection:bg-[#d4af37] selection:text-white">
      
      {/* Loading Screen */}
      {showLoading && (
        <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-[#0a1f1a] to-[#1a3d34] flex items-center justify-center animate-fade-out">
          <div className="text-center">
            {/* Animated Crown */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center text-7xl animate-bounce">👑</div>
            </div>
            
            {/* Loading Text */}
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent">
              TYAA 2026
            </h2>
            <p className="text-stone-400 text-lg tracking-widest uppercase font-light mb-8">
              People's Choice Award
            </p>
            
            {/* Loading Bar */}
            <div className="w-64 h-1 bg-[#1a3d34] rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] rounded-full animate-[slide_3s_ease-in-out_infinite]" style={{
                animation: 'slide 3s ease-in-out infinite'
              }}></div>
            </div>
          </div>
          
          <style>{`
            @keyframes slide {
              0%, 100% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
            }
            @keyframes fade-out {
              0% { opacity: 1; }
              90% { opacity: 1; }
              100% { opacity: 0; visibility: hidden; }
            }
            .animate-fade-out {
              animation: fade-out 3.5s ease-in-out forwards;
            }
          `}</style>
        </div>
      )}
      
      {/* Premium Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0a1f1a]/95 py-3 shadow-2xl backdrop-blur-lg border-b border-[#d4af37]/20' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 border-2 border-[#d4af37] rounded-full flex items-center justify-center rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
              <span className="-rotate-45 group-hover:-rotate-[225deg] transition-transform duration-700 text-xl">👑</span>
            </div>
            <span className={`text-2xl font-serif tracking-[0.2em] uppercase font-bold ${goldText}`}>TYAA</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['home', 'about', 'contestants', 'voting'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'contestants' ? 'gallery' : item)}
                className={`uppercase text-[11px] tracking-[3px] font-semibold hover:text-[#d4af37] transition-colors ${activeSection === item ? 'text-[#d4af37]' : 'text-stone-400'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero: The Grand Entrance */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1f1a]/80 to-[#0a1f1a]"></div>
        
        {/* Animated Gold Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#2d5a4d]/20 rounded-full blur-[120px]"></div>

        <div className="relative z-10 text-center px-4">
          <div className="mb-8 inline-block px-6 py-2 border border-[#d4af37]/30 rounded-full backdrop-blur-sm">
             <span className="text-[#d4af37] tracking-[5px] uppercase text-xs font-bold">Thomasian Youth Ambassador and Ambassadress</span>
          </div>
          <h1 className={`text-6xl md:text-8xl lg:text-9xl font-serif font-black mb-8 leading-tight ${goldText}`}>
            The Bastions of <br/> Hope
          </h1>
          <p className="max-w-2xl mx-auto text-stone-400 text-lg md:text-xl font-light tracking-wide leading-relaxed mb-10">
            Witness the strength of service and the heart of advocacy as we empower the next generation of Thomasian servant-leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('voting')}
              className={`px-10 py-5 rounded-full uppercase tracking-widest font-bold text-sm ${goldBtn}`}
            >
              Cast Your Vote
            </button>
          </div>
        </div>
      </section>

      {/* About: The Prestige Section */}
      <section id="about" className="py-32 relative border-y border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -inset-4 border border-[#d4af37]/20 rounded-2xl rotate-3"></div>
             <div className="relative h-[500px] bg-[#1a2f2a] rounded-2xl overflow-hidden border border-[#d4af37]/30 flex items-center justify-center">
                <span className="text-[200px] opacity-10 grayscale">👑</span>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0a1f1a] to-transparent">
                   <p className={`text-4xl font-serif ${goldText}`}>May 2, 2026</p>
                   <p className="text-stone-400 uppercase tracking-widest text-sm">UST Plaza Mayor</p>
                </div>
             </div>
          </div>
          
          <div className="space-y-8">
            <h2 className={`text-5xl font-serif ${goldText}`}>The Bastions of Hope in the Heart of Service</h2>
            <p className="text-stone-300 text-lg leading-relaxed font-light">
              TYAA is the leadership development and succession program of SOCC, composed of student delegates endorsed by their Local Student Councils. It serves as SOCC’s arm in forming servant-leaders who embody Thomasian values, equipping them to contribute to advocacy, community engagement, and organizational service through their designation in key SOCC committees.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
               <div className="border-l-2 border-[#d4af37] pl-6">
                  <h4 className="text-3xl font-serif text-white">##</h4>
                  <p className="text-stone-500 uppercase tracking-tighter text-xs">Finalists</p>
               </div>
               <div className="border-l-2 border-[#d4af37] pl-6">
                  <h4 className="text-3xl font-serif text-white">##</h4>
                  <p className="text-stone-500 uppercase tracking-tighter text-xs">Colleges</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery: Royal Portraits */}
      <section id="gallery" className="py-32 bg-[#081612]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-serif mb-4 ${goldText}`}>The Candidates</h2>
            <div className="w-24 h-[1px] bg-[#d4af37] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {contestants.map(c => (
              <div key={c.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-[#d4af37] to-transparent opacity-20 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-[#0a1f1a] p-1 overflow-hidden">
                  <div className="h-[400px] bg-[#1a2f2a] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
                    <span className="text-6xl font-serif text-[#d4af37]/20 italic">{c.initials}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f1a] via-transparent to-transparent"></div>
                  </div>
                  <div className="p-8 text-center">
                    <p className="text-[#d4af37] text-xs tracking-widest uppercase mb-2">Candidate 0{c.id}</p>
                    <h3 className="text-2xl font-serif text-white mb-2">{c.name}</h3>
                    <p className="text-stone-500 text-sm italic">{c.hometown}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voting: The Coronation Choice */}
      <section id="voting" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#112621] border border-[#d4af37]/30 rounded-[40px] p-12 lg:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
             
             <div className="text-center mb-16">
               <h2 className={`text-5xl font-serif mb-6 ${goldText}`}>The People's Choice</h2>
               <p className="text-stone-400 max-w-xl mx-auto">One queen will be chosen by the hearts of the people. Your choice defines the legacy.</p>
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {contestants.map(c => (
                 <div key={c.id} className={`p-8 rounded-3xl border transition-all duration-500 ${selectedCandidate === c.id ? 'bg-[#d4af37]/10 border-[#d4af37]' : 'bg-[#0a1f1a]/50 border-white/5 hover:border-[#d4af37]/50'}`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] font-serif">0{c.id}</div>
                      <div className="text-right">
                        <p className="text-3xl font-serif text-white">{votes[c.id] || 0}</p>
                        <p className="text-[10px] uppercase tracking-widest text-stone-500">Votes</p>
                      </div>
                    </div>
                    <h4 className="text-xl font-serif text-white mb-6">{c.name}</h4>
                    <button 
                      onClick={() => handleVote(c.id)}
                      disabled={hasVoted}
                      className={`w-full py-4 rounded-xl uppercase tracking-tighter text-xs font-bold transition-all duration-500 ${
                        selectedCandidate === c.id 
                        ? 'bg-[#d4af37] text-[#0a1f1a]' 
                        : hasVoted ? 'bg-stone-800 text-stone-600 cursor-not-allowed' : 'border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a1f1a]'
                      }`}
                    >
                      {selectedCandidate === c.id ? 'Sovereign Choice' : hasVoted ? 'Ballot Closed' : 'Cast Vote'}
                    </button>
                 </div>
               ))}
             </div>

             {hasVoted && (
                <div className="mt-12 text-center animate-bounce">
                  <p className={`text-xl font-serif ${goldText}`}>👑 Thank you for shaping the legacy!</p>
                </div>
             )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-[#d4af37]/10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className={`text-3xl font-serif mb-8 ${goldText}`}>TYAA 2026</p>
          <div className="flex justify-center gap-10 mb-10">
             {['Instagram', 'Facebook', 'Vogue'].map(social => (
               <a key={social} href="#" className="text-xs uppercase tracking-[3px] text-stone-500 hover:text-[#d4af37] transition-colors">{social}</a>
             ))}
          </div>
          <p className="text-stone-600 text-[10px] uppercase tracking-widest">© 2026 The Youth Achievers Awards • Excellence in Sovereignty</p>
        </div>
      </footer>
    </div>
  )
}

export default App