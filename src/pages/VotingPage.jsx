import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { contestants } from '../data/contestants'

export const VotingPage = () => {
  const [ambassadorVote, setAmbassadorVote] = useState(null)
  const [ambassadressVote, setAmbassadressVote] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [hasVoted, setHasVoted] = useState(localStorage.getItem('hasVoted') === 'true')

  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#9a9e52] to-[#aa841e] hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300"

  const ambassadors = useMemo(() => contestants.filter((c) => c.gender === 'male'), [])
  const ambassadresses = useMemo(() => contestants.filter((c) => c.gender === 'female'), [])

  const handleVote = () => {
    if (ambassadorVote && ambassadressVote) {
      localStorage.setItem('hasVoted', 'true')
      setHasVoted(true)
      setSubmitted(true)
    }
  }

  if (hasVoted && submitted) {
    return (
      <div className="w-full bg-[#0a1f1a] min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-xl">
          <div className="text-6xl md:text-8xl mb-4">✨</div>
          <h1 className={`text-4xl md:text-5xl font-serif font-bold ${goldText}`}>
            Thank You for Voting!
          </h1>
          <p className="text-stone-400 text-[14px] md:text-base leading-7">
            Your votes have been recorded successfully. Your support for our candidates means everything to us.
          </p>
          <div className="pt-4 space-y-3">
            <p className="text-sm text-stone-500">
              You've selected:
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-stone-300">
                <span className="font-semibold">Ambassador:</span> {ambassadors.find((a) => a.id === ambassadorVote)?.name}
              </p>
              <p className="text-stone-300">
                <span className="font-semibold">Ambassadress:</span> {ambassadresses.find((a) => a.id === ambassadressVote)?.name}
              </p>
            </div>
          </div>
          <Link
            to="/candidates"
            className={`${goldBtn} px-8 py-3 rounded font-bold text-[#0a1f1a] uppercase tracking-widest inline-block text-sm mt-6`}
          >
            Explore More Candidates
          </Link>
        </div>
      </div>
    )
  }

  if (hasVoted) {
    return (
      <div className="w-full bg-[#0a1f1a] min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-xl">
          <h1 className={`text-3xl md:text-5xl font-serif font-bold ${goldText}`}>
            You've Already Voted
          </h1>
          <p className="text-stone-400 text-[14px] md:text-base">
            Thank you for participating in TYAA People's Choice Award voting. Each vote counts and helps us celebrate these exceptional individuals.
          </p>
          <Link
            to="/"
            className={`${goldBtn} px-8 py-3 rounded font-bold text-[#0a1f1a] uppercase tracking-widest inline-block text-sm`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#0a1f1a] min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-3xl md:text-5xl font-serif font-bold mb-4 ${goldText}`}>
            Cast Your Vote
          </h1>
          <p className="text-stone-400 text-[13px] md:text-base max-w-2xl mx-auto">
            Vote for one Ambassador and one Ambassadress. Your choice will help recognize the leaders who inspire our community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16 md:space-y-24">
        {/* Ambassador Voting Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="text-3xl md:text-4xl">👨</div>
            <h2 className={`text-2xl md:text-3xl font-serif font-bold ${goldText}`}>
              Vote for Ambassador
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambassadors.map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => setAmbassadorVote(candidate.id)}
                className={`group cursor-pointer transition-all duration-300 ${
                  ambassadorVote === candidate.id
                    ? 'ring-2 ring-[#d4af37] shadow-lg shadow-[#d4af37]/30'
                    : 'hover:shadow-lg hover:shadow-[#d4af37]/20'
                }`}
              >
                <div className={`relative rounded-lg overflow-hidden border transition-all ${
                  ambassadorVote === candidate.id
                    ? 'border-[#d4af37] bg-[#d4af37]/10'
                    : 'border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-[#3d7a6a]/10 hover:border-[#d4af37]/60'
                }`}>
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-[#1a3d34] to-[#081612] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1f1a]/80"></div>
                    <div className="relative z-10 text-center">
                      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-serif font-bold transition-all ${
                        ambassadorVote === candidate.id
                          ? 'bg-gradient-to-br from-[#d4af37] to-[#aa841e] text-[#0a1f1a]'
                          : 'bg-gradient-to-br from-[#d4af37]/60 to-[#aa841e]/60 text-[#d4af37]'
                      }`}>
                        {candidate.initials}
                      </div>
                    </div>
                  </div>

                  {/* Selector Indicator */}
                  {ambassadorVote === candidate.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#d4af37] rounded-full flex items-center justify-center">
                      <span className="text-[#0a1f1a] text-sm font-bold">✓</span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-5 md:p-6 space-y-2">
                    <h3 className={`font-serif font-bold text-base md:text-lg ${goldText}`}>
                      {candidate.name}
                    </h3>
                    <p className="text-stone-500 text-[11px] md:text-xs">{candidate.college}</p>
                    <p className="text-stone-400 text-[12px] line-clamp-2 leading-4 mt-2 text-left">
                      {candidate.bio}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ambassadress Voting Section */}
        <div className="border-t border-[#d4af37]/10 pt-12 md:pt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-3xl md:text-4xl">👩</div>
            <h2 className={`text-2xl md:text-3xl font-serif font-bold ${goldText}`}>
              Vote for Ambassadress
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambassadresses.map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => setAmbassadressVote(candidate.id)}
                className={`group cursor-pointer transition-all duration-300 ${
                  ambassadressVote === candidate.id
                    ? 'ring-2 ring-[#d4af37] shadow-lg shadow-[#d4af37]/30'
                    : 'hover:shadow-lg hover:shadow-[#d4af37]/20'
                }`}
              >
                <div className={`relative rounded-lg overflow-hidden border transition-all ${
                  ambassadressVote === candidate.id
                    ? 'border-[#d4af37] bg-[#d4af37]/10'
                    : 'border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-[#3d7a6a]/10 hover:border-[#d4af37]/60'
                }`}>
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-[#1a3d34] to-[#081612] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1f1a]/80"></div>
                    <div className="relative z-10 text-center">
                      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-serif font-bold transition-all ${
                        ambassadressVote === candidate.id
                          ? 'bg-gradient-to-br from-[#d4af37] to-[#aa841e] text-[#0a1f1a]'
                          : 'bg-gradient-to-br from-[#d4af37]/60 to-[#aa841e]/60 text-[#d4af37]'
                      }`}>
                        {candidate.initials}
                      </div>
                    </div>
                  </div>

                  {/* Selector Indicator */}
                  {ambassadressVote === candidate.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#d4af37] rounded-full flex items-center justify-center">
                      <span className="text-[#0a1f1a] text-sm font-bold">✓</span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-5 md:p-6 space-y-2">
                    <h3 className={`font-serif font-bold text-base md:text-lg ${goldText}`}>
                      {candidate.name}
                    </h3>
                    <p className="text-stone-500 text-[11px] md:text-xs">{candidate.college}</p>
                    <p className="text-stone-400 text-[12px] line-clamp-2 leading-4 mt-2 text-left">
                      {candidate.bio}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Section */}
        <div className="border-t border-[#d4af37]/10 pt-12 md:pt-16 flex flex-col items-center gap-6">
          <div className="text-center space-y-2">
            <p className="text-stone-400 text-[13px] md:text-sm">
              {ambassadorVote && ambassadressVote
                ? '✓ Both votes selected'
                : `${ambassadorVote ? '✓ Ambassador selected' : '○ Ambassador not selected'} • ${ambassadressVote ? '✓ Ambassadress selected' : '○ Ambassadress not selected'}`}
            </p>
          </div>

          <button
            onClick={handleVote}
            disabled={!ambassadorVote || !ambassadressVote}
            className={`${goldBtn} px-12 py-4 rounded font-bold text-[#0a1f1a] uppercase tracking-widest text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none`}
          >
            Submit Your Votes
          </button>

          <p className="text-stone-500 text-[11px] md:text-xs uppercase tracking-[2px] text-center">
            Note: You can only vote once. Please select carefully.
          </p>
        </div>
      </div>
    </div>
  )
}
