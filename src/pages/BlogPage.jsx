import { useState } from 'react'
import { Link } from 'react-router-dom'
import { allPosts } from '../data/blogData'
import useScrollAnimation from '../hooks/useScrollAnimation'
import './BlogPage.css'

const categories = ['All', 'Hosting', 'AI Tools', 'VPN', 'Career', 'Tutorials']

const categoryMeta = {
  All:      { color: '#00C070', bg: 'rgba(0,192,112,0.1)' },
  Hosting:  { color: '#00C070', bg: 'rgba(0,192,112,0.12)' },
  'AI Tools': { color: '#0EA5E9', bg: 'rgba(14,165,233,0.12)' },
  VPN:      { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
  Career:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  Tutorials:{ color: '#EC4899', bg: 'rgba(236,72,153,0.12)' },
}

/* ── Featured Spotlight Card ─────────────────── */
function FeaturedCard({ post }) {
  const ref = useScrollAnimation()
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="featured-card fade-up"
      ref={ref}
      aria-label={`Featured: ${post.title}`}
    >
      <div className="featured-img" style={{ background: post.gradient }} aria-hidden="true">
        <div className="featured-img-overlay" />
        <div className="featured-img-content">
          <span className="featured-eyebrow">✦ Featured Article</span>
          <span className={`badge ${post.badgeClass}`}>{post.badge}</span>
        </div>
      </div>
      <div className="featured-body">
        <div className="featured-meta">
          <span>{post.date}</span>
          <span className="meta-dot" aria-hidden="true">·</span>
          <span>⏱ {post.readTime} read</span>
          <span className="meta-dot" aria-hidden="true">·</span>
          <span>By {post.author}</span>
        </div>
        <h2 className="featured-title">{post.title}</h2>
        <p className="featured-excerpt">{post.excerpt}</p>
        <span className="featured-cta">
          Read Article
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}

/* ── Article Card ────────────────────────────── */
function ArticleCard({ post, delay, layout = 'grid' }) {
  const ref = useScrollAnimation()
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`article-card fade-up ${layout === 'list' ? 'article-card--list' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      aria-label={`Read: ${post.title}`}
    >
      <div className="article-thumb" style={{ background: post.gradient }} aria-hidden="true">
        <span className={`badge ${post.badgeClass} article-badge`}>{post.badge}</span>
      </div>
      <div className="article-body">
        <div className="article-meta">
          <span className="article-date">{post.date}</span>
          <span className="meta-dot" aria-hidden="true">·</span>
          <span className="article-read">⏱ {post.readTime}</span>
        </div>
        <h3 className="article-title">{post.title}</h3>
        <p className="article-excerpt">{post.excerpt}</p>
        <span className="article-cta">
          Read Article →
        </span>
      </div>
    </Link>
  )
}

/* ── Sidebar ─────────────────────────────────── */
function Sidebar({ activeFilter, setActiveFilter }) {
  const popular = allPosts.slice(0, 4)
  const stats = [
    { val: '8', label: 'Articles' },
    { val: '5', label: 'Categories' },
    { val: '10K+', label: 'Readers' },
  ]
  return (
    <aside className="blog-sidebar" aria-label="Blog sidebar">
      {/* Stats */}
      <div className="sidebar-stats">
        {stats.map(s => (
          <div key={s.label} className="sidebar-stat">
            <span className="sidebar-stat-val">{s.val}</span>
            <span className="sidebar-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="sidebar-widget">
        <p className="sidebar-label">Browse Topics</p>
        <div className="sidebar-topics">
          {categories.filter(c => c !== 'All').map(c => {
            const meta = categoryMeta[c] || categoryMeta.All
            const isActive = activeFilter === c
            return (
              <button
                key={c}
                onClick={() => setActiveFilter(isActive ? 'All' : c)}
                className={`topic-pill ${isActive ? 'active' : ''}`}
                style={isActive ? { background: meta.bg, borderColor: meta.color, color: meta.color } : {}}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="sidebar-widget">
        <p className="sidebar-label">Most Read</p>
        <div className="popular-list">
          {popular.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="popular-item"
            >
              <span className="popular-rank">0{i + 1}</span>
              <div className="popular-info">
                <span className="popular-title">{post.title}</span>
                <span className="popular-time">⏱ {post.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="sidebar-widget sidebar-newsletter-widget">
        <div className="newsletter-icon" aria-hidden="true">📬</div>
        <p className="sidebar-label">Weekly Digest</p>
        <p className="newsletter-sub-text">
          Get the best dev deals &amp; tutorials every Sunday. Free.
        </p>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="newsletter-field"
            id="sidebar-email"
            aria-label="Email for newsletter"
          />
          <button type="submit" className="newsletter-submit" id="sidebar-subscribe">
            Subscribe Free →
          </button>
        </form>
        <p className="newsletter-note-sm">No spam. Unsubscribe anytime.</p>
      </div>
    </aside>
  )
}

/* ── Blog Page ───────────────────────────────── */
export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [layout, setLayout] = useState('grid')
  const heroRef = useScrollAnimation()

  const featured = allPosts[0]
  const rest = allPosts.slice(1)

  const filtered = rest.filter(p => {
    const matchesCat = activeFilter === 'All' || p.category === activeFilter
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="blog-page">

      {/* ── Hero Banner ── */}
      <section className="blog-hero dot-pattern">
        <div className="blog-hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="blog-hero-inner fade-up visible" ref={heroRef}>
            <div className="blog-hero-eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              DevKart Journal
            </div>
            <h1 className="blog-hero-title">
              Dev Tutorials &amp;<br />
              <span className="accent-green">Career Guides</span>
            </h1>
            <p className="blog-hero-sub">
              Honest, in-depth articles written by a developer — no fluff, no paid promotions without disclosure.
            </p>
            <div className="blog-hero-stats">
              <span><strong>8</strong> Articles</span>
              <span className="stat-sep" aria-hidden="true">·</span>
              <span><strong>5</strong> Topics</span>
              <span className="stat-sep" aria-hidden="true">·</span>
              <span><strong>10,000+</strong> Readers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="container blog-body">

        {/* Left Column */}
        <div className="blog-main-col">

          {/* Toolbar */}
          <div className="blog-toolbar">
            {/* Search */}
            <div className="search-box">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-field"
                aria-label="Search articles"
                id="blog-search"
              />
            </div>

            {/* Category Tabs + Layout Toggle row */}
            <div className="toolbar-row">
              <div className="category-tabs" role="tablist" aria-label="Filter by category">
                {categories.map(c => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={activeFilter === c}
                    onClick={() => setActiveFilter(c)}
                    className={`cat-tab ${activeFilter === c ? 'active' : ''}`}
                    id={`tab-${c.toLowerCase().replace(/\s+/g,'-')}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Layout Toggle */}
              <div className="layout-toggle" aria-label="Toggle layout">
                <button
                  className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
                  onClick={() => setLayout('grid')}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <rect x="0" y="0" width="6.5" height="6.5" rx="1"/><rect x="9.5" y="0" width="6.5" height="6.5" rx="1"/>
                    <rect x="0" y="9.5" width="6.5" height="6.5" rx="1"/><rect x="9.5" y="9.5" width="6.5" height="6.5" rx="1"/>
                  </svg>
                </button>
                <button
                  className={`layout-btn ${layout === 'list' ? 'active' : ''}`}
                  onClick={() => setLayout('list')}
                  aria-label="List view"
                  title="List view"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="results-count">
            {activeFilter !== 'All' || search
              ? `${filtered.length} article${filtered.length !== 1 ? 's' : ''} found`
              : `${allPosts.length} articles`
            }
          </p>

          {/* Featured (only when no filter/search active) */}
          {activeFilter === 'All' && !search && (
            <FeaturedCard post={featured} />
          )}

          {/* Articles Grid / List */}
          {filtered.length > 0 ? (
            <div className={`articles-container ${layout === 'list' ? 'articles-list' : 'articles-grid'}`}>
              {filtered.map((post, i) => (
                <ArticleCard key={post.id} post={post} delay={i * 50} layout={layout} />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span className="empty-icon" aria-hidden="true">🔍</span>
              <h3>No articles found</h3>
              <p>Try different keywords or browse all categories.</p>
              <button className="btn-ghost" onClick={() => { setSearch(''); setActiveFilter('All') }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>
    </div>
  )
}
