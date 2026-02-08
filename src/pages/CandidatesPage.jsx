import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { contestants } from '../data/contestants'

export const CandidatesPage = () => {
  const [selectedCollege, setSelectedCollege] = useState('All')
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"

  const colleges = useMemo(() => {
    const unique = ['All', ...new Set(contestants.map((c) => c.college))]
    return unique.sort((a, b) => a === 'All' ? -1 : a.localeCompare(b))
  }, [])

  const filteredContestants = useMemo(() => {
    if (selectedCollege === 'All') return contestants
    return contestants.filter((c) => c.college === selectedCollege)
  }, [selectedCollege])

  return (
    <div className="w-full bg-[#0a1f1a] min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl md:text-5xl font-serif font-bold text-center mb-4 ${goldText}`}>
            Meet Our Candidates
          </h1>
          <p className="text-center text-stone-400 text-[13px] md:text-base max-w-2xl mx-auto">
            Exceptional individuals representing excellence, leadership, and service from across our community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 md:top-4 space-y-6">
              <div>
                <h3 className={`text-lg md:text-xl font-serif font-bold mb-4 ${goldText}`}>
                  Filter by Institution
                </h3>
                <div className="space-y-2">
                  {colleges.map((college) => (
                    <button
                      key={college}
                      onClick={() => setSelectedCollege(college)}
                      className={`w-full text-left px-4 py-2 md:py-3 rounded text-[12px] md:text-sm transition-all ${
                        selectedCollege === college
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#aa841e] text-[#0a1f1a] font-bold'
                          : 'bg-[#1a3d34]/40 text-stone-400 hover:bg-[#1a3d34]/60 hover:text-stone-300'
                      }`}
                    >
                      {college}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Info */}
              <div className="hidden lg:block pt-6 border-t border-[#d4af37]/10">
                <h4 className={`text-sm font-serif font-bold mb-3 ${goldText}`}>Voting Categories</h4>
                <div className="space-y-3">
                  <div className="text-[12px] text-stone-500">
                    <p className="font-semibold text-stone-300 mb-1">👨 Ambassador</p>
                    <p>Male candidates</p>
                  </div>
                  <div className="text-[12px] text-stone-500">
                    <p className="font-semibold text-stone-300 mb-1">👩 Ambassadress</p>
                    <p>Female candidates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Candidates Grid */}
          <div className="lg:col-span-3">
            {filteredContestants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredContestants.map((candidate) => (
                  <Link
                    key={candidate.id}
                    to={`/candidates/${candidate.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#3d7a6a]/20 border border-[#d4af37]/30 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20">
                      {/* Image Placeholder */}
                      <div className="aspect-video bg-gradient-to-br from-[#1a3d34] to-[#081612] flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1f1a]/80"></div>
                        <div className="relative z-10 text-center space-y-2">
                          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa841e] flex items-center justify-center text-4xl font-serif font-bold text-[#0a1f1a]">
                            {candidate.initials}
                          </div>
                          <p className="text-stone-500 text-[10px] uppercase tracking-[2px]">
                            {candidate.gender === 'male' ? '👨 Ambassador' : '👩 Ambassadress'}
                          </p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 md:p-7 space-y-3">
                        <div>
                          <h3 className={`text-lg md:text-xl font-serif font-bold ${goldText}`}>
                            {candidate.name}
                          </h3>
                          <p className="text-stone-500 text-[12px] md:text-sm mt-1">
                            {candidate.college}
                          </p>
                        </div>

                        <p className="text-stone-400 text-[12px] md:text-sm line-clamp-2 leading-5">
                          {candidate.bio}
                        </p>

                        <div className="flex items-center text-[#d4af37] text-[12px] md:text-sm font-semibold group-hover:translate-x-2 transition-transform duration-300">
                          View Profile →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-stone-500 text-base">No candidates found for this institution.</p>
              </div>
            )}

            {/* Count Footer */}
            <div className="mt-12 pt-8 border-t border-[#d4af37]/10">
              <p className="text-center text-stone-600 text-[12px] md:text-sm uppercase tracking-[2px]">
                Showing {filteredContestants.length} of {contestants.length} candidates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
