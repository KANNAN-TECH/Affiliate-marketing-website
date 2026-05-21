import useScrollAnimation from '../hooks/useScrollAnimation'
import './PageHero.css'
import './AboutPage.css'

const values = [
  { icon: '🔍', title: 'Honest Reviews', desc: 'Every tool is genuinely tested or thoroughly researched. No paid positive reviews.' },
  { icon: '🚫', title: 'No Fake Hype', desc: 'We call out the bad along with the good. If a tool sucks, we\'ll say it.' },
  { icon: '🆓', title: 'Free Tools First', desc: 'We always mention free alternatives before recommending paid tools.' },
  { icon: '💰', title: 'Transparent Commissions', desc: 'Every affiliate link is clearly marked. We disclose commissions openly.' },
]

const stack = ['Java', 'Spring Boot', 'React', 'MySQL', 'Node.js', 'MongoDB', 'AWS', 'Docker']

export default function AboutPage() {
  const titleRef = useScrollAnimation()
  const founderRef = useScrollAnimation()
  const valuesRef = useScrollAnimation()

  return (
    <div className="about-page">
      {/* Page Hero */}
      <div className="page-hero dot-pattern">
        <div className="page-hero-glow" aria-hidden="true"></div>
        <div className="container page-hero-inner">
          <div className="fade-up visible" ref={titleRef}>
            <h1 className="page-title">About DevKart</h1>
            <p className="page-subtitle">
              A developer-built resource for developers — honest, transparent, and always free to use.
            </p>
          </div>
        </div>
      </div>

      <div className="container about-layout" style={{ paddingTop: '64px', paddingBottom: '96px' }}>
        {/* Story Section */}
        <section className="about-story" aria-labelledby="story-heading">
          <div className="about-story-inner card fade-up" ref={useScrollAnimation()}>
            <div className="story-accent" aria-hidden="true"></div>
            <div className="story-content">
              <span className="badge badge-green" style={{ marginBottom: '16px', display: 'inline-flex' }}>Our Story</span>
              <h2 id="story-heading" className="story-title">Why DevKart Exists</h2>
              <p className="story-text">
                DevKart was built by <strong>Kannan M</strong> — a fresher developer from Tiruvannamalai, Tamil Nadu.
              </p>
              <p className="story-text">
                After spending countless hours researching hosting plans, comparing VPNs, hunting for the best online courses,
                and trying to figure out which AI tools were actually worth paying for — I realized most review sites were
                either written by marketers or filled with fake, paid-for reviews.
              </p>
              <p className="story-text">
                I created DevKart to save other developers that time. Every review you read here is based on real usage,
                real testing, or thorough research. I built this as the resource I wish I had when I was starting out.
              </p>
              <p className="story-text">
                DevKart is free for you. I earn small affiliate commissions when you click my links — but that never
                influences my reviews. If a tool is bad, I'll say it's bad.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-values" aria-labelledby="values-heading">
          <div ref={valuesRef}>
            <h2 id="values-heading" className="section-title fade-up" style={{ marginBottom: '32px' }}>Our Values</h2>
            <div className="values-grid">
              {values.map((v, i) => (
                <ValueCard key={v.title} value={v} delay={i * 80} />
              ))}
            </div>
          </div>
        </section>

        {/* Founder Card */}
        <section className="about-founder" aria-labelledby="founder-heading">
          <div className="founder-card card fade-up" ref={founderRef}>
            <div className="founder-avatar" aria-label="Kannan M avatar">K</div>
            <div className="founder-info">
              <span className="badge badge-green" style={{ marginBottom: '12px', display: 'inline-flex' }}>Founder</span>
              <h2 id="founder-heading" className="founder-name">Kannan M</h2>
              <p className="founder-role">Developer & Founder, DevKart</p>
              <p className="founder-bio">
                Final year developer from Tiruvannamalai, Tamil Nadu. Building in public.
                Passionate about helping Indian students and freshers navigate the overwhelming world of dev tools.
              </p>
              <div className="founder-stack">
                <h3 className="founder-stack-label">Tech Stack:</h3>
                <div className="founder-tags">
                  {stack.map(s => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="founder-contacts">
                <a href="mailto:kannan585097@gmail.com" className="founder-contact-link">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  kannan585097@gmail.com
                </a>
                <a href="https://linkedin.com/in/kadigtech" target="_blank" rel="noopener noreferrer" className="founder-contact-link">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  linkedin.com/in/kadigtech
                </a>
                <a href="https://github.com/KANNAN-TECH" target="_blank" rel="noopener noreferrer" className="founder-contact-link">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  github.com/KANNAN-TECH
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ValueCard({ value, delay }) {
  const ref = useScrollAnimation()
  return (
    <div className="value-card card fade-up" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="value-icon" aria-hidden="true">{value.icon}</div>
      <h3 className="value-title">{value.title}</h3>
      <p className="value-desc">{value.desc}</p>
    </div>
  )
}
