import { useParams, Link } from 'react-router-dom'
import { contestants } from '../data/contestants'

export const CandidateDetailsPage = () => {
  const { id } = useParams()
  const candidate = contestants.find((c) => c.id === parseInt(id))
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#9a9e52] to-[#aa841e] hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300"

  if (!candidate) {
    return (
      <div className="w-full bg-[#0a1f1a] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className={`text-4xl font-serif font-bold ${goldText}`}>Candidate Not Found</h1>
          <p className="text-stone-400">Sorry, we couldn't find this candidate.</p>
          <Link to="/candidates" className={`${goldBtn} px-8 py-3 rounded font-bold text-[#0a1f1a] uppercase tracking-widest inline-block`}>
            Back to Candidates
          </Link>
        </div>
      </div>
    )
  }

  const relatedCandidates = contestants
    .filter((c) => c.college === candidate.college && c.id !== candidate.id)
    .slice(0, 3)

  return (
    <div className="w-full bg-[#0a1f1a] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <Link to="/candidates" className="text-[#d4af37] hover:text-[#fbf5e7] transition-colors text-[12px] md:text-sm fill-current">
          ← Back to Candidates
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-32">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Candidate Image & Info Card */}
          <div className="md:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Image Placeholder */}
              <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#1a3d34] to-[#081612] border border-[#d4af37]/30">
                <div className="aspect-square flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1f1a]/80"></div>
                  <div className="relative z-10 text-center space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa841e] flex items-center justify-center text-6xl font-serif font-bold text-[#0a1f1a]">
                      {candidate.initials}
                    </div>
                    <div>
                      <p className="text-[#d4af37] text-sm font-bold">
                        {candidate.gender === 'male' ? '👨 Ambassador' : '👩 Ambassadress'}
                      </p>
                      <p className="text-stone-500 text-[11px] uppercase tracking-[2px] mt-2">Candidate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Info Card */}
              <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#3d7a6a]/10 border border-[#d4af37]/30 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-stone-600 text-[11px] uppercase tracking-[2px] mb-1">From</p>
                  <p className="text-stone-200 font-semibold text-sm">{candidate.hometown}</p>
                </div>
                <div className="border-t border-[#d4af37]/10 pt-4">
                  <p className="text-stone-600 text-[11px] uppercase tracking-[2px] mb-1">Institution</p>
                  <p className={`font-serif font-bold text-lg ${goldText}`}>{candidate.college}</p>
                </div>
              </div>

              {/* Vote Button */}
              <Link
                to="/voting"
                className={`${goldBtn} w-full px-6 py-3 rounded font-bold text-[#0a1f1a] uppercase tracking-widest text-center text-[13px] md:text-sm`}
              >
                Vote for {candidate.name}
              </Link>
            </div>
          </div>

          {/* Candidate Details */}
          <div className="md:col-span-2 space-y-10">
            {/* Header */}
            <div className="space-y-4">
              <h1 className={`text-4xl md:text-5xl font-serif font-bold ${goldText}`}>
                {candidate.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/50 rounded text-[12px] font-bold text-[#d4af37] uppercase tracking-wider">
                  {candidate.college}
                </span>
                <span className="px-4 py-2 bg-[#3d7a6a]/20 border border-[#3d7a6a]/50 rounded text-[12px] font-bold text-[#9afff7] uppercase tracking-wider">
                  {candidate.gender === 'male' ? 'Ambassador' : 'Ambassadress'}
                </span>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-4 border-t border-[#d4af37]/10 pt-8">
              <h2 className={`text-2xl md:text-3xl font-serif font-bold ${goldText}`}>
                Biography
              </h2>
              <p className="text-stone-300 text-[14px] md:text-base leading-8">
                {candidate.bio}
              </p>
            </div>

            {/* Advocacy */}
            <div className="space-y-4 border-t border-[#d4af37]/10 pt-8">
              <h2 className={`text-2xl md:text-3xl font-serif font-bold ${goldText}`}>
                Advocacy
              </h2>
              <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#3d7a6a]/10 border border-[#d4af37]/20 rounded-lg p-6 md:p-8">
                <p className="text-stone-300 text-[14px] md:text-base leading-8 italic">
                  "{candidate.advocacy}"
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 border-t border-[#d4af37]/10 pt-8">
              <h3 className="text-lg font-semibold text-stone-300">
                Share your support for {candidate.name}
              </h3>
              <Link
                to="/voting"
                className={`${goldBtn} w-full md:w-auto px-8 py-3 rounded font-bold text-[#0a1f1a] uppercase tracking-widest inline-block text-[13px]`}
              >
                Cast Your Vote
              </Link>
            </div>
          </div>
        </div>

        {/* Related Candidates */}
        {relatedCandidates.length > 0 && (
          <div className="mt-20 md:mt-32 pt-12 md:pt-20 border-t border-[#d4af37]/10 space-y-8">
            <h2 className={`text-3xl md:text-4xl font-serif font-bold text-center ${goldText}`}>
              Other Candidates from {candidate.college}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCandidates.map((related) => (
                <Link key={related.id} to={`/candidates/${related.id}`} className="group">
                  <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-[#d4af37]/15 to-[#3d7a6a]/15 border border-[#d4af37]/30 hover:border-[#d4af37]/60 transition-all group-hover:shadow-lg group-hover:shadow-[#d4af37]/20">
                    <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-[#1a3d34] to-[#081612] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1f1a]/80"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa841e] flex items-center justify-center text-3xl font-serif font-bold text-[#0a1f1a] mb-2">
                          {related.initials}
                        </div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-[1px]">
                          {related.gender === 'male' ? '👨' : '👩'}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className={`font-serif font-bold text-sm group-hover:text-[#fbf5e7] transition-colors ${goldText}`}>
                        {related.name}
                      </h4>
                      <p className="text-stone-500 text-[11px]">{related.hometown}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
