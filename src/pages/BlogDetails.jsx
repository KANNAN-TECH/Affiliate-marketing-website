import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPostBySlug, getRelatedPosts, allPosts } from '../data/blogData'
import useScrollAnimation from '../hooks/useScrollAnimation'
import './BlogDetails.css'

/* ── Content Renderer ─────────────────────────────── */
function ContentBlock({ block }) {
  switch (block.type) {
    case 'intro':
      return <p className="bd-intro">{block.text}</p>
    case 'h2':
      return <h2 className="bd-h2">{block.text}</h2>
    case 'p':
      return <p className="bd-p">{block.text}</p>
    case 'list':
      return (
        <ul className="bd-list">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
    case 'code':
      return (
        <div className="bd-code-block">
          <div className="bd-code-header">
            <span className="bd-code-lang">{block.lang}</span>
            <button
              className="bd-code-copy"
              onClick={() => navigator.clipboard.writeText(block.text)}
              aria-label="Copy code"
            >
              Copy
            </button>
          </div>
          <pre><code>{block.text}</code></pre>
        </div>
      )
    case 'table':
      return (
        <div className="bd-table-wrap">
          <table className="bd-table">
            <thead>
              <tr>{block.headers.map(h => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

/* ── Share Buttons ────────────────────────────────── */
function ShareButtons({ title, slug }) {
  const url = `https://devkart.in/blog/${slug}`
  const encoded = encodeURIComponent(url)
  const text = encodeURIComponent(`${title} — DevKart`)
  return (
    <div className="share-sidebar" aria-label="Share article">
      <span className="share-label">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank" rel="noopener noreferrer"
        className="share-btn share-twitter" aria-label="Share on Twitter"
        title="Share on Twitter/X"
      >
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank" rel="noopener noreferrer"
        className="share-btn share-linkedin" aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <a
        href={`https://wa.me/?text=${text}%20${encoded}`}
        target="_blank" rel="noopener noreferrer"
        className="share-btn share-whatsapp" aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}

/* ── Related Card ─────────────────────────────────── */
function RelatedCard({ post }) {
  const ref = useScrollAnimation()
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="related-card card fade-up"
      ref={ref}
      aria-label={`Read: ${post.title}`}
    >
      <div className="related-card-img" style={{ background: post.gradient }} aria-hidden="true">
        <span className={`badge ${post.badgeClass}`}>{post.badge}</span>
      </div>
      <div className="related-card-body">
        <p className="related-title">{post.title}</p>
        <span className="related-meta">⏱ {post.readTime} read</span>
      </div>
    </Link>
  )
}

/* ── Blog Details Page ────────────────────────────── */
export default function BlogDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPostBySlug(slug)
  const related = post ? getRelatedPosts(post.relatedSlugs) : []

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Update document title & meta
  useEffect(() => {
    if (post) {
      document.title = post.seoTitle
      let desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', post.seoDesc)
    }
    return () => {
      document.title = 'DevKart — Best Dev Tools, Hosting & Career Resources for Indian Developers'
    }
  }, [post])

  if (!post) {
    return (
      <div className="bd-notfound">
        <div className="container">
          <h1>Article Not Found</h1>
          <p>This article doesn't exist or may have moved.</p>
          <Link to="/blog" className="btn-primary">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-details-page">
      {/* Hero */}
      <div className="bd-hero" style={{ background: post.gradient }}>
        <div className="bd-hero-overlay" aria-hidden="true" />
        <div className="container bd-hero-inner">
          {/* Breadcrumb */}
          <nav className="bd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/blog">Blog</Link>
            <span aria-hidden="true">›</span>
            <span className="bd-breadcrumb-current">{post.badge}</span>
          </nav>

          <span className={`badge ${post.badgeClass} bd-badge`}>{post.badge}</span>
          <h1 className="bd-title">{post.title}</h1>

          <div className="bd-meta-row">
            <div className="bd-author">
              <div className="bd-author-avatar" aria-hidden="true">K</div>
              <div>
                <span className="bd-author-name">{post.author}</span>
                <span className="bd-author-role">Developer & Founder, DevKart</span>
              </div>
            </div>
            <div className="bd-meta-right">
              <span className="bd-meta-item">📅 {post.date}</span>
              <span className="bd-meta-sep" aria-hidden="true">·</span>
              <span className="bd-meta-item">⏱ {post.readTime} read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="container bd-layout">
        {/* Sticky Share Sidebar */}
        <ShareButtons title={post.title} slug={post.slug} />

        {/* Main Content */}
        <article className="bd-article" aria-label="Article content">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}

          {/* Bottom CTA */}
          <div className="bd-bottom-cta">
            <h3>Found this helpful?</h3>
            <p>Subscribe to get articles like this every Sunday — free.</p>
            <div className="bd-cta-row">
              <Link to="/blog" className="btn-ghost">← Back to Blog</Link>
              <Link to="/tools" className="btn-primary">Explore Top Tools →</Link>
            </div>
          </div>
        </article>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bd-related" aria-labelledby="related-heading">
          <div className="container">
            <h2 id="related-heading" className="bd-related-title">Related Articles</h2>
            <div className="related-grid">
              {related.map(r => <RelatedCard key={r.id} post={r} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
