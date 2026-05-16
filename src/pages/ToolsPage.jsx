import { useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollAnimation from '../hooks/useScrollAnimation'
import './ToolsPage.css'

const allTools = [
  { name: 'Hostinger', category: 'Hosting', rating: 4.8, review: 'Best affordable hosting for Indian developers. MERN, WordPress & static sites in minutes.', commission: 'Up to ₹8,000/referral', badge: "Editor's Choice", badgeClass: 'badge-amber', link: 'https://hostinger.com?ref=devkart', id: 't-hostinger' },
  { name: 'NordVPN', category: 'VPN', rating: 4.7, review: 'Military-grade encryption. Essential for developers on public WiFi or remote work.', commission: '₹3,000–₹10,000/sale', badge: 'Most Popular', badgeClass: 'badge-blue', link: 'https://nordvpn.com?ref=devkart', id: 't-nordvpn' },
  { name: 'Canva Pro', category: 'AI Tools', rating: 4.6, review: 'AI design + resume builder. Monthly recurring affiliate commission.', commission: '20% recurring', badge: 'Best Recurring', badgeClass: 'badge-green', link: 'https://canva.com?ref=devkart', id: 't-canva' },
  { name: 'Coursera', category: 'Courses', rating: 4.5, review: 'World-class courses from top universities. Best for career transitions and upskilling.', commission: '15–45%/sale', badge: 'Top Learning', badgeClass: 'badge-purple', link: 'https://coursera.org?ref=devkart', id: 't-coursera' },
  { name: 'Udemy', category: 'Courses', rating: 4.4, review: 'Affordable courses on every tech topic. Best bang-for-buck learning platform.', commission: '10–15%/sale', badge: 'Budget Friendly', badgeClass: 'badge-green', link: 'https://udemy.com?ref=devkart', id: 't-udemy' },
  { name: 'DigitalOcean', category: 'Hosting', rating: 4.6, review: 'Developer-friendly cloud. Simple droplets, Kubernetes, managed databases.', commission: '$25–$100/referral', badge: 'Dev Favorite', badgeClass: 'badge-blue', link: 'https://digitalocean.com?ref=devkart', id: 't-do' },
  { name: 'GitHub Copilot', category: 'Dev Tools', rating: 4.7, review: 'AI pair programmer. Writes code, tests, and documentation right in your IDE.', commission: 'Variable', badge: 'AI Powered', badgeClass: 'badge-blue', link: 'https://github.com/copilot?ref=devkart', id: 't-copilot' },
  { name: 'Notion AI', category: 'AI Tools', rating: 4.5, review: 'All-in-one workspace with AI. Notes, docs, projects & wikis in one place.', commission: 'Variable', badge: 'Productivity', badgeClass: 'badge-purple', link: 'https://notion.so?ref=devkart', id: 't-notion' },
  { name: 'Surfshark', category: 'VPN', rating: 4.5, review: 'Budget VPN with unlimited devices. Great for families and dev teams.', commission: '40%/sale', badge: 'Best Value', badgeClass: 'badge-green', link: 'https://surfshark.com?ref=devkart', id: 't-surfshark' },
  { name: 'Bluehost', category: 'Hosting', rating: 4.3, review: 'Best WordPress hosting. One-click installs and free domain for first year.', commission: '$65+/referral', badge: 'WordPress Pro', badgeClass: 'badge-amber', link: 'https://bluehost.com?ref=devkart', id: 't-bluehost' },
  { name: 'MongoDB Atlas', category: 'Dev Tools', rating: 4.6, review: 'Managed MongoDB in the cloud. Free tier is perfect for side projects.', commission: 'Variable', badge: 'MERN Stack', badgeClass: 'badge-green', link: 'https://mongodb.com/atlas?ref=devkart', id: 't-mongo' },
  { name: 'Scaler', category: 'Courses', rating: 4.7, review: 'India\'s best coding bootcamp for placement. DSA, System Design, and more.', commission: 'Variable', badge: 'Placement Focus', badgeClass: 'badge-amber', link: 'https://scaler.com?ref=devkart', id: 't-scaler' },
]

const filters = ['All', 'Hosting', 'AI Tools', 'VPN', 'Courses', 'Dev Tools', 'Career']
const sortOptions = ['By Rating', 'By Commission', 'By Name']

function StarRating({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(Math.floor(rating))}
      <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '5px' }}>{rating}/5</span>
    </span>
  )
}

export default function ToolsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sort, setSort] = useState('By Rating')
  const titleRef = useScrollAnimation()

  const filtered = allTools
    .filter(t => activeFilter === 'All' || t.category === activeFilter)
    .sort((a, b) => {
      if (sort === 'By Rating') return b.rating - a.rating
      if (sort === 'By Name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="tools-page">
      <div className="page-hero dot-pattern">
        <div className="page-hero-glow" aria-hidden="true"></div>
        <div className="container page-hero-inner">
          <div className="fade-up visible" ref={titleRef}>
            <h1 className="page-title">All Reviewed Dev Tools — 2026</h1>
            <p className="page-subtitle">
              Handpicked tools reviewed by a developer. Honest ratings, real commission info.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '48px', paddingBottom: '96px' }}>
        {/* Filter & Sort Bar */}
        <div className="tools-controls">
          <div className="filter-pills" role="tablist" aria-label="Filter tools by category">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                role="tab"
                aria-selected={activeFilter === f}
                id={`filter-${f.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="sort-control">
            <label htmlFor="sort-select" className="sr-only">Sort tools</label>
            <select
              id="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tool Grid */}
        <div className="tools-grid">
          {filtered.map((tool, i) => (
            <ToolGridCard key={tool.id} tool={tool} delay={i * 60} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No tools found in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ToolGridCard({ tool, delay }) {
  const ref = useScrollAnimation()
  return (
    <article
      className="tool-grid-card card fade-up"
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      id={tool.id}
    >
      <div className="tool-grid-logo" aria-label={`${tool.name} logo`}>
        {tool.name.charAt(0)}
      </div>
      <div className="tool-grid-info">
        <div className="tool-grid-header">
          <h3 className="tool-grid-name">{tool.name}</h3>
          <span className={`badge ${tool.badgeClass}`}>{tool.badge}</span>
        </div>
        <StarRating rating={tool.rating} />
        <p className="tool-grid-review">{tool.review}</p>
        <div className="tool-grid-commission">
          <span>💰 {tool.commission}</span>
        </div>
        <div className="tool-grid-footer">
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary btn-sm"
            id={`${tool.id}-cta`}
          >
            View Deal →
          </a>
          <span className="affiliate-chip">*Affiliate link</span>
        </div>
      </div>
    </article>
  )
}
