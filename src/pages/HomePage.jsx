import { Link } from 'react-router-dom'
import useScrollAnimation from '../hooks/useScrollAnimation'
import { allPosts } from '../data/blogData'
import './HomePage.css'

/* ---- Hero ---- */
function HeroSection() {
  const ref1 = useScrollAnimation()
  return (
    <section className="hero section-padding dot-pattern" aria-label="Hero">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="container hero-content">
        <div className="hero-badge fade-up visible">
          <span>🔥</span> Trusted by 10,000+ Indian Developers
        </div>
        <h1 className="hero-headline">
          Your Cart of Tools.<br />
          <span className="accent-green">Your Path to Career.</span>
        </h1>
        <p className="hero-sub">
          Honest reviews, exclusive deals &amp; developer resources — curated by a developer, for developers.
          No fake hype. No hidden agendas.
        </p>
        <div className="hero-ctas">
          <Link to="/tools" className="btn-primary btn-pulse" id="hero-cta-primary">
            Explore Top Tools →
          </Link>
          <Link to="/blog" className="btn-ghost" id="hero-cta-secondary">
            Read Latest Reviews
          </Link>
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker-wrapper" aria-label="Featured tools">
        <div className="ticker-track">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="ticker-items">
                Hostinger &nbsp;•&nbsp; NordVPN &nbsp;•&nbsp; Canva Pro &nbsp;•&nbsp; GitHub Copilot &nbsp;•&nbsp;
                Notion &nbsp;•&nbsp; Coursera &nbsp;•&nbsp; DigitalOcean &nbsp;•&nbsp; Udemy &nbsp;•&nbsp;
                Scaler &nbsp;•&nbsp; MongoDB Atlas &nbsp;•&nbsp; VS Code &nbsp;•&nbsp; ChatGPT &nbsp;•&nbsp;
                Jasper AI &nbsp;•&nbsp; Surfshark &nbsp;•&nbsp; Bluehost &nbsp;•&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Categories ---- */
const categories = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    title: 'Web Hosting',
    desc: 'Best hosting for MERN, React & WordPress. Hostinger, Bluehost, Cloudways compared.',
    cta: 'View Hosting Deals →',
    badge: 'Highest Commission',
    badgeClass: 'badge-amber',
    id: 'category-hosting',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2H10a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/>
        <line x1="9" y1="21" x2="15" y2="21"/>
      </svg>
    ),
    title: 'AI Tools',
    desc: 'ChatGPT, Canva AI, Notion AI, Jasper — top AI tools for developers & students.',
    cta: 'Explore AI Tools →',
    badge: 'Trending 2026',
    badgeClass: 'badge-blue',
    id: 'category-ai',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'VPN & Security',
    desc: 'NordVPN, Surfshark, ExpressVPN — honest comparison for remote developers.',
    cta: 'Compare VPNs →',
    badge: 'High Payout',
    badgeClass: 'badge-green',
    id: 'category-vpn',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: 'Online Courses',
    desc: 'Coursera, Udemy, Scaler — best coding & career courses with discount links.',
    cta: 'Find Courses →',
    badge: 'Fresher Friendly',
    badgeClass: 'badge-purple',
    id: 'category-courses',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Developer Tools',
    desc: 'GitHub Copilot, MongoDB Atlas, VS Code extensions — tools pros actually use.',
    cta: 'Dev Tools →',
    badge: "Editor's Choice",
    badgeClass: 'badge-blue',
    id: 'category-devtools',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: 'Career & ATS',
    desc: 'ATS resume builders, interview prep tools, LinkedIn optimizers — get hired faster.',
    cta: 'Career Tools →',
    badge: 'Hot Right Now',
    badgeClass: 'badge-amber',
    id: 'category-career',
  },
]

function CategoriesSection() {
  const titleRef = useScrollAnimation()
  return (
    <section className="section-padding categories-section" aria-labelledby="categories-heading">
      <div className="container">
        <div className="section-header" ref={titleRef}>
          <h2 className="section-title fade-up" id="categories-heading">Browse by Category</h2>
          <p className="section-subtitle fade-up">
            Everything a developer, student or fresher needs — in one place.
          </p>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ cat, delay }) {
  const ref = useScrollAnimation()
  return (
    <article
      className="cat-card card fade-up"
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      id={cat.id}
    >
      <div className="cat-card-icon" aria-hidden="true">{cat.icon}</div>
      <span className={`badge ${cat.badgeClass} cat-badge`}>{cat.badge}</span>
      <h3 className="cat-card-title">{cat.title}</h3>
      <p className="cat-card-desc">{cat.desc}</p>
      <Link to="/tools" className="cat-card-cta">{cat.cta}</Link>
    </article>
  )
}

/* ---- Top Tools ---- */
const topTools = [
  {
    name: 'Hostinger',
    badge: '⭐ Editor\'s Choice',
    badgeClass: 'badge-amber',
    rating: 4.8,
    review: 'Best affordable hosting for Indian developers. Deploy MERN, WordPress & static sites in minutes. Excellent India server speeds.',
    commission: 'Earn up to ₹8,000/referral',
    code: 'Code: KADIGTECH20',
    cta: 'Get Hostinger Deal →',
    link: 'https://hostinger.com?ref=devkart',
    tags: ['Hosting', 'Beginner Friendly', 'MERN', 'Best Value'],
    id: 'tool-hostinger',
  },
  {
    name: 'NordVPN',
    badge: '🔥 Most Popular',
    badgeClass: 'badge-blue',
    rating: 4.7,
    review: 'Essential for developers on public WiFi. Military-grade encryption. Works perfectly for remote work from cafes or college.',
    commission: 'Earn ₹3,000–₹10,000/sale',
    code: null,
    cta: 'Get NordVPN Deal →',
    link: 'https://nordvpn.com?ref=devkart',
    tags: ['VPN', 'Security', 'Remote Work', 'High Commission'],
    id: 'tool-nordvpn',
  },
  {
    name: 'Canva Pro',
    badge: '💡 Best Recurring',
    badgeClass: 'badge-green',
    rating: 4.6,
    review: 'Not just design — developers use it for resumes, pitch decks, LinkedIn banners. Monthly recurring affiliate commission.',
    commission: '20% recurring monthly',
    code: null,
    cta: 'Try Canva Pro →',
    link: 'https://canva.com?ref=devkart',
    tags: ['AI Tools', 'Design', 'Recurring Commission'],
    id: 'tool-canva',
  },
]

function TopToolsSection() {
  const titleRef = useScrollAnimation()
  return (
    <section className="section-padding top-tools-section" aria-labelledby="top-tools-heading">
      <div className="container">
        <div className="section-header" ref={titleRef}>
          <h2 className="section-title fade-up" id="top-tools-heading">Top Picks This Month</h2>
          <p className="section-subtitle fade-up">
            Handpicked. Tested. No paid placements without disclosure.
          </p>
        </div>
        <div className="tools-list">
          {topTools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} delay={i * 100} />
          ))}
        </div>
        <div className="tools-viewall">
          <Link to="/tools" className="viewall-link">View all 50+ reviewed tools →</Link>
        </div>
      </div>
    </section>
  )
}

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '13px', marginLeft: '6px' }}>
        {rating}/5
      </span>
    </span>
  )
}

function ToolCard({ tool, delay }) {
  const ref = useScrollAnimation()
  return (
    <article
      className="tool-card card fade-up"
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      id={tool.id}
    >
      <div className="green-bar" aria-hidden="true"></div>
      <div className="tool-card-inner">
        <div className="tool-card-header">
          <div>
            <span className={`badge ${tool.badgeClass}`}>{tool.badge}</span>
            <h3 className="tool-name">{tool.name}</h3>
            <StarRating rating={tool.rating} />
          </div>
          <div className="tool-commission">
            <span className="commission-chip">💰 {tool.commission}</span>
            {tool.code && <span className="code-chip">🏷️ {tool.code}</span>}
          </div>
        </div>

        <p className="tool-review">{tool.review}</p>

        <div className="tool-tags">
          {tool.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="tool-card-footer">
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary btn-sm"
            id={`${tool.id}-cta`}
          >
            {tool.cta}
          </a>
          <span className="affiliate-chip">*Affiliate link — we earn a small commission at no extra cost to you</span>
        </div>
      </div>
    </article>
  )
}

/* ---- Blog Posts ---- */
const blogPosts = allPosts.slice(0, 3)

function BlogSection() {
  const titleRef = useScrollAnimation()
  return (
    <section className="section-padding blog-section" aria-labelledby="blog-heading">
      <div className="container">
        <div className="section-header" ref={titleRef}>
          <h2 className="section-title fade-up" id="blog-heading">Latest from DevKart Blog</h2>
          <p className="section-subtitle fade-up">
            Tutorials, comparisons & career guides — written by a developer.
          </p>
        </div>
        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} delay={i * 100} />
          ))}
        </div>
        <div className="blog-viewall">
          <Link to="/blog" className="btn-ghost" id="blog-viewall-btn">View All Blog Posts →</Link>
        </div>
      </div>
    </section>
  )
}

function BlogCard({ post, delay }) {
  const ref = useScrollAnimation()
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="blog-card card fade-up"
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      id={post.id}
      aria-label={`Read article: ${post.title}`}
    >
      <div
        className="blog-card-img"
        style={{ background: post.gradient || 'linear-gradient(135deg, rgba(0,192,112,0.1), rgba(14,165,233,0.08))' }}
        aria-hidden="true"
      >
        <div className="blog-img-placeholder">
          <svg width="40" height="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
      </div>
      <div className="blog-card-body">
        <span className={`badge ${post.badgeClass}`}>{post.badge}</span>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-footer">
          <span className="blog-readtime">⏱ {post.readTime} read</span>
          <span className="blog-cta">Read Article →</span>
        </div>
      </div>
    </Link>
  )
}

/* ---- Trust Bar ---- */
const stats = [
  { value: '10,000+', label: 'Developers Helped' },
  { value: '50+', label: 'Tools Reviewed' },
  { value: '₹0', label: 'Hidden Promotions' },
  { value: '4.9★', label: 'Reader Trust Score' },
]

function TrustBar() {
  const ref = useScrollAnimation()
  return (
    <section className="trust-bar fade-up" ref={ref} aria-label="Site statistics">
      <div className="container">
        <div className="trust-grid">
          {stats.map((stat, i) => (
            <div className="trust-stat" key={stat.label}>
              <span className="trust-value" aria-label={stat.value}>{stat.value}</span>
              <span className="trust-label">{stat.label}</span>
              {i < stats.length - 1 && <div className="trust-sep" aria-hidden="true"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Newsletter ---- */
function NewsletterSection() {
  const ref = useScrollAnimation()
  return (
    <section className="section-padding newsletter-section" aria-labelledby="newsletter-heading">
      <div className="container">
        <div className="newsletter-card fade-up" ref={ref}>
          <div className="newsletter-inner">
            <div className="newsletter-avatars" aria-hidden="true">
              {['K', 'A', 'R'].map((l, i) => (
                <div key={i} className="avatar-circle" style={{ '--delay': i }}>{l}</div>
              ))}
              <span className="newsletter-count">Join 10,000+ developers</span>
            </div>
            <h2 className="newsletter-title" id="newsletter-heading">
              Get Weekly Dev Deals & Career Tips
            </h2>
            <p className="newsletter-sub">
              Join 10,000+ developers who get exclusive deals, tutorials & career hacks every Sunday morning.
            </p>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()} aria-label="Newsletter signup">
              <input
                type="email"
                placeholder="your@email.com"
                className="newsletter-input"
                aria-label="Email address"
                id="newsletter-email"
              />
              <button type="submit" className="btn-primary" id="newsletter-submit">
                Subscribe Free →
              </button>
            </form>
            <p className="newsletter-note">No spam. Unsubscribe anytime. 100% free.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- HOME PAGE ---- */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TopToolsSection />
      <TrustBar />
      <BlogSection />
      <NewsletterSection />
    </>
  )
}
