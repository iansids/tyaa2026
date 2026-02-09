import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contestants } from '../data/contestants';

export const VotingPage = () => {
  // Navigation State
  const [step, setStep] = useState(1); 
  
  // Selection States
  const [ambassadorVote, setAmbassadorVote] = useState(null); 
  const [ambassadressVote, setAmbassadressVote] = useState(null);
  
  // Verification States
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hasVoted, setHasVoted] = useState(localStorage.getItem('hasVoted') === 'true');

  // Sync Scroll on Step Change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Resend OTP Timer Logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Styling Constants
  const goldText = "bg-gradient-to-b from-[#fbf5e7] via-[#d4af37] to-[#aa841e] bg-clip-text text-transparent";
  const goldBtn = "bg-gradient-to-r from-[#d4af37] via-[#fbf5e7] to-[#aa841e] hover:brightness-110 transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]";

  // Data Filtering
  const ambassadors = useMemo(() => contestants.filter((c) => c.gender === 'male'), []);
  const ambassadresses = useMemo(() => contestants.filter((c) => c.gender === 'female'), []);

  // --- Logic Helpers ---
  const handleSelect = (id, type) => {
    if (type === 'ambassador') setAmbassadorVote(prev => prev === id ? null : id);
    else setAmbassadressVote(prev => prev === id ? null : id);
  };

  const isEmailValid = email.length > 0 && email.length < 200 && email.toLowerCase().endsWith('@ust.edu.ph');

  const getEmailError = () => {
    if (!email) return "University email required.";
    if (email.length >= 200) return "Character limit exceeded.";
    if (!email.toLowerCase().endsWith('@ust.edu.ph')) return "Please use your UST email";
    return null;
  };

  const getSelectedName = (id, list) => {
    if (id === 'none') return "Abstained";
    const found = list.find(c => c.id === id);
    return found ? found.name : "No Selection";
  };

  const handleRequestCode = () => {
    if (isEmailValid) {
      setIsOtpSent(true);
      setTimer(30);
    }
  };

  const handleFinalSubmit = () => {
    if (otp.length === 6) {
      localStorage.setItem('hasVoted', 'true');
      setHasVoted(true);
      setSubmitted(true);
    }
  };

  // --- Success State ---
  if (hasVoted && submitted) {
    const timestamp = new Date().toLocaleString();
    return (
      <div className="w-full bg-[#0a1f1a] min-h-screen flex items-center justify-center px-4 animate-fade-in">
        <div className="w-full max-w-lg border border-[#d4af37]/30 bg-[#081612] p-8 md:p-12 space-y-8 text-center shadow-2xl">
          <div className="flex justify-center">
            <div className="w-16 h-16 border border-[#d4af37] rounded-full flex items-center justify-center animate-pulse">
              <span className="text-[#d4af37] text-2xl">✦</span>
            </div>
          </div>
          <h1 className={`text-4xl font-serif font-black uppercase ${goldText}`}>Ballot Confirmed</h1>
          <div className="space-y-4 border-y border-white/5 py-6 text-left">
            <div className="flex justify-between"><span className="text-[10px] text-stone-500 uppercase">Ambassador</span><span className="text-sm italic">{getSelectedName(ambassadorVote, ambassadors)}</span></div>
            <div className="flex justify-between"><span className="text-[10px] text-stone-500 uppercase">Ambassadress</span><span className="text-sm italic">{getSelectedName(ambassadressVote, ambassadresses)}</span></div>
          </div>
          <Link to="/candidates" className={`${goldBtn} block w-full py-4 text-[#0a1f1a] font-black uppercase tracking-[3px] text-xs`}>Return to Home</Link>
          <p className="text-[9px] text-stone-600 uppercase tracking-widest">{timestamp}</p>
        </div>
      </div>
    );
  }

  // --- RESPONSIVE CARD COMPONENT ---
  const CandidateCard = ({ candidate, selected, onSelect }) => (
    <button
      onClick={() => onSelect(candidate.id)}
      className={`relative group text-left transition-all duration-500 w-full rounded-sm overflow-hidden border ${
        selected ? 'border-[#d4af37] ring-1 ring-[#d4af37]' : 'border-white/10 hover:border-[#d4af37]/50'
      } flex md:block p-4 md:p-0 items-center gap-4`}
    >
      {/* Mobile: Circle Image | Desktop: Full Aspect Image */}
      <div className="relative h-12 w-12 md:h-auto md:w-full md:aspect-[3/4] flex-shrink-0 overflow-hidden bg-[#081612] rounded-full md:rounded-none border border-[#d4af37]/20 md:border-none">
        <img 
          src={candidate.image} 
          className={`w-full h-full object-cover transition-all duration-700 ${selected ? 'grayscale-0 scale-110' : 'grayscale opacity-50 md:opacity-40 group-hover:opacity-100 group-hover:grayscale-0'}`} 
          alt={candidate.name}
        />
      </div>

      {/* Content */}
      <div className="flex-grow md:absolute md:inset-x-0 md:bottom-0 md:p-6 md:bg-gradient-to-t md:from-[#0a1f1a] md:to-transparent z-20">
        <p className="text-[8px] md:text-[9px] uppercase tracking-[2px] md:tracking-[3px] text-[#d4af37] font-bold mb-0.5 md:mb-1">
          {candidate.college}
        </p>
        <h3 className="text-sm md:text-xl font-serif font-black uppercase tracking-tight text-white leading-tight">
          {candidate.name}
        </h3>
      </div>

      {/* Checkmark Indicator */}
      <div className={`md:absolute md:top-4 md:right-4 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center z-30 transition-all ${
        selected ? 'bg-[#d4af37] text-[#0a1f1a] scale-100' : 'bg-white/5 text-transparent scale-75 border border-white/10'
      }`}>
        <span className="text-[10px] font-black">✓</span>
      </div>
    </button>
  );

  return (
    <div className="w-full bg-[#0a1f1a] min-h-screen text-stone-200">
      
      {/* HEADER SECTION */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-[#d4af37] text-[10px] uppercase tracking-[10px] md:tracking-[15px] font-black opacity-60">Step 0{step} / 03</h3>
          <h1 className={`text-4xl md:text-7xl font-serif font-black uppercase tracking-tighter ${goldText}`}>
            {step === 1 ? 'Ambassador' : step === 2 ? 'Ambassadress' : 'Verification'}
          </h1>
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-[2px] w-6 md:w-8 transition-all duration-500 ${step >= i ? 'bg-[#d4af37]' : 'bg-white/10'}`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTION PHASES */}
        {step < 3 && (
            <div className="max-w-7xl mx-auto px-6 pb-20 animate-fade-in space-y-8 md:space-y-12">
                
                {/* CHANGED FROM 'grid' TO 'flex flex-wrap' 
                    - 'justify-center' centers the items in the last row.
                    - 'gap-6' maintains spacing.
                */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {(step === 1 ? ambassadors : ambassadresses).map((c) => (
                    /* Give each card a base width for mobile and a 
                    fixed percentage width for the 5-per-row desktop look.
                    w-[calc(100%-1rem)] = Mobile (1 col)
                    sm:w-[calc(50%-1.5rem)] = Tablet (2 cols)
                    lg:w-[calc(20%-1.5rem)] = Desktop (5 cols)
                    */
                    <div 
                    key={c.id} 
                    className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] xl:w-[calc(20%-1.5rem)] min-w-[200px]"
                    >
                    <CandidateCard 
                        candidate={c} 
                        selected={(step === 1 ? ambassadorVote : ambassadressVote) === c.id} 
                        onSelect={(id) => handleSelect(id, step === 1 ? 'ambassador' : 'ambassadress')} 
                    />
                    </div>
                ))}
                </div>

            {/* ABSTAIN OPTION */}
            <div className="flex justify-center pt-4">
            <button 
                onClick={() => handleSelect('none', step === 1 ? 'ambassador' : 'ambassadress')}
                className="flex items-center gap-4 group py-4 px-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all w-full md:w-auto justify-center"
            >
                <div className={`w-5 h-5 border flex items-center justify-center transition-all ${
                (step === 1 ? ambassadorVote : ambassadressVote) === 'none' ? 'border-[#d4af37] bg-[#d4af37]' : 'border-white/30'
                }`}>
                {(step === 1 ? ambassadorVote : ambassadressVote) === 'none' && <span className="text-[#0a1f1a] text-xs font-black">✓</span>}
                </div>
                <span className={`text-[10px] uppercase tracking-[3px] ${(step === 1 ? ambassadorVote : ambassadressVote) === 'none' ? 'text-[#d4af37]' : 'text-stone-500'}`}>
                Abstain from this selection
                </span>
            </button>
            </div>
        </div>
        )}

      {/* VERIFICATION STEP (3) */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto px-6 pb-20 animate-fade-in space-y-12">
          <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-10">
             <div className="space-y-2 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-widest text-stone-600 font-bold">Ambassador</span>
                <p className="text-white font-serif italic text-base md:text-lg">{getSelectedName(ambassadorVote, ambassadors)}</p>
             </div>
             <div className="space-y-2 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-widest text-stone-600 font-bold">Ambassadress</span>
                <p className="text-white font-serif italic text-base md:text-lg">{getSelectedName(ambassadressVote, ambassadresses)}</p>
             </div>
          </div>

          <div className="bg-white/[0.01] border border-white/5 p-6 md:p-12 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[3px] text-stone-500 font-bold block">UST Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan.delacruz.cics@ust.edu.ph"
                disabled={isOtpSent}
                className="w-full bg-transparent border-b border-white/20 py-4 text-stone-200 focus:border-[#d4af37] transition-all outline-none"
              />
              {!isOtpSent && (
                <button 
                  onClick={handleRequestCode} 
                  disabled={!isEmailValid}
                  className="w-full py-4 bg-[#d4af37] text-[#0a1f1a] text-[10px] uppercase tracking-[4px] font-black disabled:opacity-20"
                >
                  Request Code
                </button>
              )}
            </div>

            {isOtpSent && (
              <div className="space-y-6 pt-6 animate-fade-in text-center">
                <label className="text-[10px] uppercase tracking-[3px] text-stone-500 font-bold block">6-Digit Code</label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="------"
                  className="w-full bg-transparent border-b border-[#d4af37] py-4 text-center text-4xl tracking-[0.5em] font-serif text-[#d4af37] outline-none"
                />
                <button 
                  onClick={handleRequestCode}
                  disabled={timer > 0}
                  className="text-[10px] uppercase tracking-widest text-stone-500 hover:text-white disabled:opacity-30 transition-all underline underline-offset-8"
                >
                  {timer > 0 ? `Resend Available in ${timer}s` : "Resend Code"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER NAV */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-white/10 flex items-center justify-between mb-20 bg-[#0a1f1a]/80 backdrop-blur-md sticky bottom-0">
        <button 
          onClick={() => { if(step === 3) setIsOtpSent(false); setStep(s => Math.max(1, s - 1)); }} 
          className={`text-stone-500 hover:text-white text-[10px] uppercase tracking-[4px] font-black transition-all ${step === 1 ? 'invisible' : ''}`}
        >
          ← Back
        </button>
        <button
          onClick={step < 3 ? () => setStep(s => s + 1) : handleFinalSubmit}
          disabled={step === 1 ? !ambassadorVote : step === 2 ? !ambassadressVote : otp.length !== 6}
          className={`${goldBtn} px-8 md:px-14 py-4 md:py-5 rounded-sm text-[#0a1f1a] font-black uppercase tracking-[3px] text-xs disabled:opacity-20 transition-all`}
        >
          {step < 3 ? 'Continue' : 'Finalize Vote'}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}} />
    </div>
  );
};