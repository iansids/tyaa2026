import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Candidates', path: '/candidates' },
    { label: 'Vote', path: '/voting' },
  ]

  return (
    <div className="min-h-screen bg-[#0a1f1a] text-stone-200 selection:bg-[#d4af37] selection:text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0a1f1a]/95 py-2 md:py-3 shadow-2xl backdrop-blur-lg border-b border-[#d4af37]/20' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <div className="w-8 md:w-10 h-8 md:h-10 border border-[#d4af37] rounded-full flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg]">
              <span className="text-sm md:text-lg">👑</span>
            </div>
            <span className={`text-sm md:text-xl font-serif tracking-widest font-bold ${goldText}`}>TYAA</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`uppercase text-[10px] tracking-[3px] font-bold hover:text-[#d4af37] transition-colors ${
                  location.pathname === item.path ? 'text-[#d4af37]' : 'text-stone-400'
                }`}
              >
                {item.label}
              </Link>
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
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2 uppercase text-[10px] tracking-[2px] font-bold rounded transition-colors ${
                    location.pathname === item.path
                      ? 'bg-[#d4af37]/10 text-[#d4af37]'
                      : 'text-stone-400 hover:text-[#d4af37]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 md:pt-0">
        {children}
      </main>

      {/* Footer */}
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
    </div>
  )
}
