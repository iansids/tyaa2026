import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      // Use a slightly higher threshold for a more deliberate transition
      setScrolled(window.scrollY > 20)
    }
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
      
      {/* Navbar Container */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
        scrolled 
          ? 'py-3' 
          : 'py-8'
      }`}>
        <div className={`max-w-7xl mx-auto px-4 md:px-6 transition-all duration-700 ${
          scrolled 
            ? 'md:max-w-5xl' // Shrinks width slightly for a "floating island" feel
            : 'md:max-w-7xl'
        }`}>
          <div className={`relative flex justify-between items-center transition-all duration-700 px-6 py-3 rounded-full ${
            scrolled 
              ? 'bg-[#0a1f1a]/80 backdrop-blur-xl border border-[#d4af37]/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' 
              : 'bg-transparent border border-transparent'
          }`}>
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="relative w-8 md:w-10 h-8 md:h-10 flex items-center justify-center">
                <div className="absolute inset-0 border border-[#d4af37]/50 rounded-full transition-transform duration-1000 group-hover:rotate-[180deg]"></div>
                <span className="text-sm md:text-lg">👑</span>
              </div>
              <span className={`text-base md:text-2xl font-serif tracking-[0.2em] font-bold ${goldText}`}>TYAA</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group py-2"
                >
                  <span className={`uppercase text-[10px] tracking-[3px] font-bold transition-colors duration-500 ${
                    location.pathname === item.path ? 'text-[#d4af37]' : 'text-stone-400 group-hover:text-stone-100'
                  }`}>
                    {item.label}
                  </span>
                  {/* Natural Underline Animation */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent transition-transform duration-500 origin-center ${
                    location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Mobile Toggle */}

            <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-[#d4af37] z-50"
            aria-label="Toggle Menu"
            >
            <div className="relative w-6 h-5">
                {/* Top Bar -> Becomes one half of the X */}
                <span className={`absolute left-0 block h-[1.5px] bg-[#d4af37] transition-all duration-500 ease-in-out ${
                mobileMenuOpen 
                    ? 'w-6 top-2 rotate-45' 
                    : 'w-6 top-0'
                }`}></span>

                {/* Middle Bar -> Disappears */}
                <span className={`absolute left-0 top-2 block h-[1.5px] bg-[#d4af37] transition-all duration-500 ease-in-out ${
                mobileMenuOpen 
                    ? 'w-0 opacity-0' 
                    : 'w-4 opacity-100'
                }`}></span>

                {/* Bottom Bar -> Becomes the other half of the X */}
                <span className={`absolute left-0 block h-[1.5px] bg-[#d4af37] transition-all duration-500 ease-in-out ${
                mobileMenuOpen 
                    ? 'w-6 top-2 -rotate-45' 
                    : 'w-5 top-4'
                }`}></span>
            </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Natural Slide Down */}
        <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mx-4 mt-2 bg-[#0a1f1a]/95 backdrop-blur-2xl border border-[#d4af37]/20 rounded-2xl p-4 shadow-2xl">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-6 py-4 uppercase text-[10px] tracking-[3px] font-bold mb-1 rounded-xl transition-all ${
                  location.pathname === item.path
                    ? 'bg-[#d4af37]/10 text-[#d4af37]'
                    : 'text-stone-400 hover:bg-white/5'
                }`}
              >
                {item.label}
                {location.pathname === item.path && <span className="text-xs">✦</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="transition-all duration-700">
        {children}
      </main>

      {/* Footer stays the same but added a subtle divider */}
      <footer className="py-20 border-t border-[#d4af37]/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d4af37]/5 opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/40"></div>
            <p className={`text-2xl font-serif tracking-[0.3em] ${goldText}`}>TYAA 2026</p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/40"></div>
          </div>
          <p className="text-stone-500 text-[10px] uppercase tracking-[4px] mb-4">The Bastions of Hope in the Heart of Service</p>
          <p className="text-stone-700 text-[9px] uppercase tracking-widest italic font-light">The Official Leadership Recognition Portal</p>
        </div>
      </footer>

      {/* Tailwind Plugin Suggestion: Ensure you have cubic-bezier transition support */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cubic-bezier {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}} />
    </div>
  )
}