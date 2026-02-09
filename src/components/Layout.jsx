import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // --- NEW: Scroll to top on route change ---
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false); // Close mobile menu when navigating
  }, [location.pathname]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Candidates', path: '/candidates' },
    { label: 'Vote', path: '/voting' },
  ]

  return (
    <div className="relative min-h-screen bg-[#0a1f1a] text-stone-200 selection:bg-[#d4af37] selection:text-white font-sans flex flex-col">
      
      {/* Navbar Container */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
        scrolled ? 'py-3' : 'py-8'
      }`}>
        <div className={`max-w-7xl mx-auto px-4 md:px-6 transition-all duration-700 ${
          scrolled ? 'md:max-w-5xl' : 'md:max-w-7xl'
        }`}>
          <div className={`relative flex justify-between items-center transition-all duration-700 px-6 py-3 rounded-full ${
            scrolled 
              ? 'bg-[#0a1f1a]/80 backdrop-blur-xl border border-[#d4af37]/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' 
              : 'bg-transparent border border-transparent'
          }`}>
            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="relative w-8 md:w-10 h-8 md:h-10 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#d4af37]/50 rounded-full transition-transform duration-1000 group-hover:rotate-[180deg]"></div>
                <span className="text-sm md:text-lg">👑</span>
              </div>
              <span className={`text-base md:text-2xl font-serif tracking-[0.2em] font-bold ${goldText}`}>TYAA</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="relative group py-2">
                  <span className={`uppercase text-[10px] tracking-[3px] font-bold transition-colors duration-500 ${
                    location.pathname === item.path ? 'text-[#d4af37]' : 'text-stone-400 group-hover:text-stone-100'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#d4af37]">
              <div className="w-6 h-5 relative">
                  <span className={`absolute left-0 block h-[1.5px] bg-[#d4af37] transition-all ${mobileMenuOpen ? 'w-6 top-2 rotate-45' : 'w-6 top-0'}`}></span>
                  <span className={`absolute left-0 top-2 block h-[1.5px] bg-[#d4af37] transition-all ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                  <span className={`absolute left-0 block h-[1.5px] bg-[#d4af37] transition-all ${mobileMenuOpen ? 'w-6 top-2 -rotate-45' : 'w-5 top-4'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mx-4 mt-2 bg-[#0a1f1a]/95 backdrop-blur-2xl border border-[#d4af37]/20 rounded-2xl p-4 shadow-2xl">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-6 py-4 uppercase text-[10px] tracking-[3px] font-bold mb-1 rounded-xl transition-all ${
                  location.pathname === item.path ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-stone-400 hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full">
        {children}
      </main>

      <footer className="bg-[#05110e] border-t border-[#d4af37]/20 pt-24 pb-12 relative w-full mt-auto">
        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20 text-left">
            
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-6">
                <img 
                  src="/images/SOCC_WHITE.png" 
                  alt="SOCC Logo" 
                  className="w-24 md:w-28 h-auto brightness-110"
                />
                <div className="space-y-1">
                  <h3 className="text-white text-[10px] uppercase tracking-[4px] font-black">Student Organizations</h3>
                  <h3 className="text-[#d4af37] text-[10px] uppercase tracking-[4px] font-black">Coordinating Council</h3>
                </div>
              </div>
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed max-w-sm font-light">
                The central coordinating body of all recognized student organizations in the University of Santo Tomas. We empower leaders to ignite change and foster a community of excellence.
              </p>
            </div>

            <div className="md:col-span-3 space-y-8 md:pl-10">
              <h4 className="text-white text-[10px] uppercase tracking-[4px] font-black border-b border-white/5 pb-4">Project TYAA</h4>
              <ul className="space-y-4">
                {navItems.map(item => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-stone-500 hover:text-[#d4af37] text-[10px] uppercase tracking-[2px] transition-all flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-px bg-[#d4af37] transition-all"></span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 space-y-8">
              <h4 className="text-white text-[10px] uppercase tracking-[4px] font-black border-b border-white/5 pb-4">Connect With Us</h4>
              <div className="space-y-4">
                <p className="text-stone-500 text-[10px] uppercase tracking-widest leading-relaxed">
                  Rm. 206, Tan Yan Kee Student Center, <br />
                  University of Santo Tomas, <br />
                  España Blvd., Manila
                </p>
                <a href="mailto:official.socc@ust.edu.ph" className="block text-[#d4af37] text-[10px] uppercase tracking-widest hover:text-white transition-colors italic underline underline-offset-4">
                  socc@ust.edu.ph
                </a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-1">
              <p className={`text-xl font-serif tracking-[0.4em] font-black ${goldText}`}>TYAA 2026</p>
              <p className="text-stone-700 text-[8px] uppercase tracking-[4px]">Thomasian Young Ambassador & Ambassadress</p>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="group flex flex-row items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-[#d4af37]/30 transition-all"
            >
              <span className="text-stone-500 text-[8px] uppercase tracking-[4px] group-hover:text-white">Back to Top</span>
              <span className="text-[#d4af37] text-xs">↑</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}