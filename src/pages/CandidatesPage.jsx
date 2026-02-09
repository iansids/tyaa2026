import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contestants } from '../data/contestants'; 

export const CandidatesPage = () => {
  useEffect(() => {
    document.title = "Candidates | TYAA 2026";
  }, []);

  const [selectedCollege, setSelectedCollege] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent";

  // --- LOGIC: Filtering & Pagination ---
  const colleges = useMemo(() => {
    const unique = ['All', ...new Set(contestants.map((c) => c.college))];
    return unique.sort((a, b) => (a === 'All' ? -1 : a.localeCompare(b)));
  }, []);

  const filteredContestants = useMemo(() => {
    if (selectedCollege === 'All') return contestants;
    return contestants.filter((c) => c.college === selectedCollege);
  }, [selectedCollege]);

  const totalPages = Math.ceil(filteredContestants.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredContestants.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredContestants, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCollege]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const gallerySection = document.getElementById('registry-gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [...contestants, ...contestants, ...contestants, ...contestants];

  return (
    <div className="w-full bg-[#0a1f1a] min-h-screen text-stone-200 selection:bg-[#d4af37]/30 overflow-x-hidden">
      
      {/* SECTION 1: INFINITE SEAMLESS HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-[#081612] flex items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#d4af37]/5 blur-[120px] rounded-full" />
        </div>

        <div className="absolute z-20 pointer-events-none text-center px-4 w-full max-w-[95vw] md:max-w-7xl mx-auto">
            <h1 className={`text-[12vw] md:text-[8vw] lg:text-[7.5rem] font-serif font-black leading-[0.85] md:leading-[0.9] tracking-tighter uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${goldText}`}>
              The Bastions <br className="md:hidden" /> 
              <span className="md:inline">of Hope</span>
            </h1>
        </div>

        <div className="absolute inset-0 z-10 opacity-30 flex flex-col items-stretch pointer-events-none overflow-hidden">
          {[
              { id: 'top', speed: '120s', direction: 'animate-marquee-forward', delay: '-2s' },
              { id: 'mid', speed: '240s', direction: 'animate-marquee-backward', delay: '-15s' },
              { id: 'bot', speed: '120s', direction: 'animate-marquee-forward', delay: '-8s' }
          ].map((row) => (
              <div key={row.id} className="flex-1 flex w-full overflow-hidden border-b border-white/5">
                <div className={`flex gap-0 w-max ${row.direction}`} style={{ animationDuration: row.speed, animationDelay: row.delay }}>
                    {marqueeItems.map((candidate, idx) => (
                    <div key={`${row.id}-${idx}`} className="relative h-full flex-shrink-0 overflow-hidden bg-[#081612]" style={{ width: '25vw', minWidth: '280px' }}>
                        <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover grayscale-[0.2] brightness-90" />
                        <div className="absolute inset-0 bg-[#0a1f1a]/10"></div>
                    </div>
                    ))}
                </div>
              </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: THE REGISTRY GALLERY */}
      <div id="registry-gallery" className="max-w-[1600px] mx-auto px-4 md:px-6 py-16 sm:py-24 md:py-32">
        <div className="w-full flex flex-col lg:flex-row gap-12 md:gap-20 items-start">
          
          {/* SIDEBAR */}
          <aside className="hidden lg:block lg:w-96 lg:sticky lg:top-32 space-y-6">
            <div className="flex items-center gap-4 px-3 mb-8">
              <h3 className="text-[#d4af37] text-[11px] uppercase tracking-[5px] font-black whitespace-nowrap">Institutions</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
            </div>
            <nav className="flex flex-col">
              {colleges.map((college) => (
                <button
                  key={college}
                  onClick={() => setSelectedCollege(college)}
                  className={`group relative flex items-start gap-4 py-5 px-6 transition-all duration-500 border-l-2 ${
                    selectedCollege === college ? 'border-[#d4af37] bg-[#d4af37]/5 text-[#d4af37]' : 'border-white/5 text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <span className={`mt-0.5 text-[10px] transition-all duration-500 ${selectedCollege === college ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>✦</span>
                  <span className={`text-[11px] uppercase tracking-[2px] font-bold text-left transition-transform duration-500 ${selectedCollege === college ? 'translate-x-0' : '-translate-x-2'}`}>{college}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* MAIN GRID */}
          <main className="w-full lg:flex-1">
            <div className="lg:hidden mb-10">
              <label className="text-[#d4af37] text-[10px] uppercase tracking-[3px] font-black block mb-3 opacity-70">Filter by Institution</label>
              <select 
                value={selectedCollege} 
                onChange={(e) => setSelectedCollege(e.target.value)} 
                className="w-full px-4 py-3 bg-[#081612] border border-[#d4af37]/30 text-white rounded-sm focus:border-[#d4af37] outline-none"
              >
                {colleges.map((college) => <option key={college} value={college}>{college}</option>)}
              </select>
            </div>

            {currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-12 gap-y-8 sm:gap-y-16 md:gap-y-24">
                  {currentItems.map((candidate) => (
                    <Link key={candidate.id} to={`/candidates/${candidate.id}`} className="group">
                      <div className="relative aspect-[3/4] overflow-hidden bg-[#081612] border border-white/5 transition-all duration-1000 group-hover:border-[#d4af37]/40 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                        <img 
                          src={candidate.image} 
                          alt={candidate.name} 
                          className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a1f1a] via-[#0a1f1a]/40 to-transparent flex flex-col justify-end p-3 sm:p-6 md:p-10 transition-all duration-700 group-hover:bg-[#0a1f1a]/60">
                            <div className="transform transition-transform duration-700 group-hover:-translate-y-2">
                              <p className="text-[#d4af37] text-[7px] sm:text-[10px] uppercase tracking-[2px] sm:tracking-[5px] font-black mb-1">
                                {candidate.gender === 'male' ? 'Ambassador' : 'Ambassadress'}
                              </p>
                              <h3 className="text-sm sm:text-xl md:text-2xl font-serif font-bold text-white mb-0 sm:mb-1 tracking-tight group-hover:text-[#fbf5e7] transition-colors leading-tight">
                                {candidate.name}
                              </h3>
                              <p className="text-stone-300 text-[7px] sm:text-[10px] uppercase tracking-[1px] sm:tracking-[2px] mb-1 sm:mb-4">
                                {candidate.college}
                              </p>
                              <div className="hidden sm:block max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-1000 ease-out overflow-hidden">
                                <p className="text-stone-400 text-[11px] leading-relaxed line-clamp-3 italic">
                                  {candidate.bio}
                                </p>
                              </div>
                            </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="mt-12 sm:mt-24 pt-8 sm:pt-12 border-t border-white/5 flex items-center justify-between px-1">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="text-[#d4af37] text-[9px] sm:text-[10px] uppercase tracking-[2px] sm:tracking-[4px] font-black disabled:opacity-20 transition-all"
                    >
                      ← Prev
                    </button>
                    <div className="flex items-center gap-1.5 sm:gap-4">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full text-[9px] sm:text-[10px] font-bold transition-all duration-500 border ${
                            currentPage === i + 1 
                              ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10' 
                              : 'border-white/5 text-stone-600'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="text-[#d4af37] text-[9px] sm:text-[10px] uppercase tracking-[2px] sm:tracking-[4px] font-black disabled:opacity-20 transition-all"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="h-[50vh] flex flex-col items-center justify-center">
                <p className="text-stone-500 font-serif italic text-xl">The registry is currently empty.</p>
              </div>
            )}
          </main>
        </div>
      </div>

     <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeForward { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeBackward { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee-forward { animation: marqueeForward linear infinite; }
        .animate-marquee-backward { animation: marqueeBackward linear infinite; }
        .w-max { width: max-content; }
        `}} />
    </div>
  );
};