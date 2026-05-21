import { Link } from 'react-router-dom'
import useScrollAnimation from '../hooks/useScrollAnimation'
import './PageHero.css'
import './DisclosurePage.css'

const sections = [
  {
    title: 'What is Affiliate Marketing?',
    content: 'Affiliate marketing is a performance-based marketing model where we earn a commission when you click our referral links and make a purchase. This is at absolutely no additional cost to you — in fact, our affiliate links often come with exclusive discounts that you wouldn\'t get by going directly to the site.',
  },
  {
    title: 'Our Commitment to Honesty',
    content: 'Our reviews and opinions are ALWAYS honest and independent. Affiliate relationships do not influence our editorial content. If a tool is mediocre or has significant drawbacks, we will say so clearly in our review — even if we have an affiliate relationship with that company. We only recommend tools we have personally used, tested, or thoroughly researched.',
  },
  {
    title: 'Which Links Are Affiliate Links?',
    content: 'Every affiliate link on DevKart is marked clearly. You\'ll see "Affiliate link" chips below every CTA button on tool cards and in our blog posts. This way, you always know when we might earn a commission from your click.',
  },
  {
    title: 'How We Use Affiliate Revenue',
    content: 'Revenue from affiliate commissions helps us keep DevKart completely free for you. It covers server costs, domain fees, time spent on research, writing, and maintaining the site. Without affiliate revenue, we could not provide this resource at no cost to you.',
  },
  {
    title: 'FTC Compliance',
    content: 'DevKart complies with FTC guidelines on affiliate marketing disclosure. This disclosure page, combined with per-link labeling, satisfies the FTC\'s requirement that material connections between advertisers and endorsers be disclosed.',
  },
  {
    title: 'Our Affiliate Programs',
    content: 'We participate in affiliate programs from: Hostinger, NordVPN, Canva, Notion, Coursera, Udemy, DigitalOcean, Surfshark, Bluehost, MongoDB, GitHub, and others. We may add or remove programs at any time.',
  },
]

export default function DisclosurePage() {
  const titleRef = useScrollAnimation()

  return (
    <div className="disclosure-page">
      <div className="page-hero dot-pattern">
        <div className="page-hero-glow" aria-hidden="true"></div>
        <div className="container page-hero-inner">
          <div className="fade-up visible" ref={titleRef}>
            <span className="badge badge-amber" style={{ marginBottom: '16px', display: 'inline-flex' }}>Legal & Transparency</span>
            <h1 className="page-title">Affiliate Disclosure</h1>
            <p className="page-subtitle">
              We believe in full transparency. Here's exactly how we work.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '64px', paddingBottom: '96px', maxWidth: '800px' }}>
        {/* Main Disclosure Card */}
        <div className="disclosure-main card fade-up" ref={useScrollAnimation()}>
          <div className="disclosure-highlight">
            <svg width="24" height="24" fill="none" stroke="var(--accent-green)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <p>
              <strong>DevKart participates in affiliate marketing programs.</strong> When you click our referral links and make a purchase,
              we may earn a commission at no additional cost to you. This helps us keep DevKart free and running.
              We only recommend tools and products we have personally used, tested, or thoroughly researched.
              Our reviews and opinions are always honest and independent — affiliate relationships do not influence
              our editorial content.
            </p>
          </div>
        </div>

        {/* Sections */}
        {sections.map((sec, i) => (
          <DisclosureSection key={sec.title} section={sec} delay={i * 80} index={i + 1} />
        ))}

        {/* Last Updated */}
        <div className="disclosure-updated fade-up" ref={useScrollAnimation()}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>Last updated: May 17, 2026 | Contact: <a href="mailto:kannan585097@gmail.com">kannan585097@gmail.com</a></span>
        </div>
      </div>
    </div>
  )
}

function DisclosureSection({ section, delay, index }) {
  const ref = useScrollAnimation()
  return (
    <div className="disclosure-section fade-up" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="disclosure-num" aria-hidden="true">{String(index).padStart(2, '0')}</div>
      <div className="disclosure-content">
        <h2 className="disclosure-title">{section.title}</h2>
        <p className="disclosure-text">{section.content}</p>
      </div>
    </div>
  )
}
