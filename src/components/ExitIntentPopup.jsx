import { useState, useEffect } from 'react';
import './ExitIntentPopup.css';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup this week
    const lastSeen = localStorage.getItem('devkart_exit_popup_seen');
    if (lastSeen) {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(lastSeen, 10) < oneWeek) {
        return; // Don't show if seen within a week
      }
    }

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        if (!hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
          localStorage.setItem('devkart_exit_popup_seen', Date.now().toString());
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="exit-overlay" onClick={handleClose}>
      <div className="exit-modal" onClick={e => e.stopPropagation()}>
        <button className="exit-close" onClick={handleClose} aria-label="Close dialog">×</button>
        
        {submitted ? (
          <div className="exit-success text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold font-heading text-white mb-2">You're in!</h3>
            <p className="text-slate-400 font-body">Check your inbox for exclusive developer deals.</p>
          </div>
        ) : (
          <div className="exit-content">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 block font-heading">Wait! Before You Go...</span>
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white leading-tight mb-3">
              Don't Miss the Next Big Dev Deal
            </h3>
            <p className="text-sm text-slate-300 font-body leading-relaxed mb-6">
              Join 10,000+ engineers getting exclusive tech discounts, tutorials, and career guides delivered every Sunday. No spam, ever.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="developer@example.com" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white font-body text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-heading text-sm uppercase tracking-wider rounded-lg transition-colors">
                Send Me Deals →
              </button>
            </form>
            <p className="text-[10px] text-slate-500 text-center mt-4 font-body">
              100% Free. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
