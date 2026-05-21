import useScrollAnimation from '../hooks/useScrollAnimation'
import './AboutPage.css' // We can reuse AboutPage styles for layout

export default function ContactPage() {
  const titleRef = useScrollAnimation()

  return (
    <div className="about-page pt-24 pb-20 dot-pattern min-height-screen">
      <div className="container max-w-3xl">
        <div ref={titleRef} className="fade-up visible">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 font-heading">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 font-heading leading-tight">
            Contact Us
          </h1>
          <p className="text-slate-400 text-lg mb-10 font-body leading-relaxed">
            Have a question, partnership proposal, or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl shadow-xl backdrop-blur-md">
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold font-heading text-slate-300">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="John Doe" 
                  className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold font-heading text-slate-300">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="john@example.com" 
                  className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold font-heading text-slate-300">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  placeholder="How can we help you?" 
                  className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary py-3 font-bold uppercase tracking-wider mt-2">
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">Email</span>
                <a href="mailto:kannan585097@gmail.com" className="text-white hover:text-emerald-400 font-medium transition-colors">
                  kannan585097@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 font-heading">Instagram</span>
                <a href="https://instagram.com/devkart.in" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 font-medium transition-colors">
                  @devkart.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
