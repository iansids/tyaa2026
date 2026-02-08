import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { CandidatesPage } from './pages/CandidatesPage'
import { CandidateDetailsPage } from './pages/CandidateDetailsPage'
import { VotingPage } from './pages/VotingPage'

const LoadingScreen = ({ isVisible }) => {
  if (!isVisible) return null

  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent"

  return (
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
  )
}

const App = () => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isVisible={showLoading} />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/candidates/:id" element={<CandidateDetailsPage />} />
            <Route path="/voting" element={<VotingPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      
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
          min-height: 44px;
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
    </>
  )
}

export default App