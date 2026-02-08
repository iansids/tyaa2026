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

  // NEW: Handle Requesting Code with Timer
  const handleRequestCode = () => {
    if (isEmailValid) {
      setIsOtpSent(true);
      setTimer(30); // Starts countdown immediately upon request
      // Logic for backend API call would go here
    }
  };

  const handleFinalSubmit = () => {
    if (otp.length === 6) {
      localStorage.setItem('hasVoted', 'true');
      setHasVoted(true);
      setSubmitted(true);
    }
  };

  // --- Success State (Digital Receipt) ---
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

  // --- Reusable Candidate Card ---
  const CandidateCard = ({ candidate, selected, onSelect }) => (
    <button
      onClick={() => onSelect(candidate.id)}
      className={`relative group text-left transition-all duration-500 w-full rounded-sm overflow-hidden border ${
        selected ? 'border-[#d4af37] ring-1 ring-[#d4af37]' : 'border-white/10 hover:border-[#d4af37]/50'
      }`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#081612]">
        <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/5 transition-colors duration-500 z-10 pointer-events-none"></div>
        <img src={candidate.image} className={`w-full h-full object-cover transition-all duration-700 ${selected ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100'}`} alt={candidate.name}/>
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0a1f1a] to-transparent z-20">
          <p className="text-[9px] uppercase tracking-[3px] text-[#d4af37] font-bold mb-1">{candidate.college}</p>
          <h3 className="text-xl font-serif font-black uppercase tracking-tight text-white">{candidate.name}</h3>
        </div>
        {selected && <div className="absolute top-4 right-4 w-7 h-7 bg-[#d4af37] text-[#0a1f1a] rounded-full flex items-center justify-center z-30 animate-scale-in"><span className="text-xs font-black">✓</span></div>}
      </div>
    </button>
  );

  return (
    <div className="w-full bg-[#0a1f1a] min-h-screen text-stone-200">
      
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-[#d4af37] text-[10px] uppercase tracking-[15px] font-black opacity-60">Step 0{step} / 03</h3>
          <h1 className={`text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter ${goldText}`}>
            {step === 1 ? 'Select Ambassador' : step === 2 ? 'Select Ambassadress' : 'Identity Check'}
          </h1>
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-[2px] w-8 transition-all duration-500 ${step >= i ? 'bg-[#d4af37]' : 'bg-white/10'}`}></div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STEPS (1 & 2) */}
      {step < 3 && (
        <div className="max-w-7xl mx-auto px-6 pb-20 animate-fade-in space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(step === 1 ? ambassadors : ambassadresses).map((c) => (
              <CandidateCard 
                key={c.id} 
                candidate={c} 
                selected={(step === 1 ? ambassadorVote : ambassadressVote) === c.id} 
                onSelect={(id) => handleSelect(id, step === 1 ? 'ambassador' : 'ambassadress')} 
              />
            ))}
          </div>

          {/* ABSTAIN OPTION */}
          <div className="flex justify-center">
            <button 
              onClick={() => handleSelect('none', step === 1 ? 'ambassador' : 'ambassadress')}
              className="flex items-center gap-4 group py-4 px-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
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
          {/* Review Panel */}
          <div className="grid grid-cols-2 gap-8 border-b border-white/10 pb-10">
             <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-stone-600">Ambassador</span>
                <p className="text-white font-serif italic text-lg">{getSelectedName(ambassadorVote, ambassadors)}</p>
             </div>
             <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-stone-600">Ambassadress</span>
                <p className="text-white font-serif italic text-lg">{getSelectedName(ambassadressVote, ambassadresses)}</p>
             </div>
          </div>

          {/* Form Panel */}
          <div className="bg-white/[0.01] border border-white/5 p-8 md:p-12 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase tracking-[3px] text-stone-500 font-bold">UST Email</label>
                {email && <span className={`text-[9px] uppercase font-bold ${isEmailValid ? 'text-green-500' : 'text-[#d4af37]'}`}>{getEmailError() || "Ready"}</span>}
              </div>
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
              <div className="space-y-6 pt-6 animate-fade-in">
                <label className="text-[10px] uppercase tracking-[3px] text-stone-500 font-bold block text-center">6-Digit Verification Code</label>
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
                  className="w-full text-[10px] uppercase tracking-widest text-stone-500 hover:text-white disabled:opacity-30 transition-all underline underline-offset-8"
                >
                  {timer > 0 ? `Resend Available in ${timer}s` : "Resend Code"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FIXED NAVIGATION FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-white/10 flex items-center justify-between mb-20">
        <button 
          onClick={() => { if(step === 3) setIsOtpSent(false); setStep(s => Math.max(1, s - 1)); }} 
          className={`text-stone-500 hover:text-white text-[10px] uppercase tracking-[4px] font-black transition-all ${step === 1 ? 'invisible' : ''}`}
        >
          ← Back
        </button>
        <button
          onClick={step < 3 ? () => setStep(s => s + 1) : handleFinalSubmit}
          disabled={step === 1 ? !ambassadorVote : step === 2 ? !ambassadressVote : otp.length !== 6}
          className={`${goldBtn} px-14 py-5 rounded-sm text-[#0a1f1a] font-black uppercase tracking-[3px] text-xs disabled:opacity-20 transition-all`}
        >
          {step < 3 ? 'Continue' : 'Confirm Ballot'}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}} />
    </div>
  );
};