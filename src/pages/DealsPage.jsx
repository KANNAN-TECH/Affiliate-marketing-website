import { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { dealsData } from '../data/dealsData'
import useScrollAnimation from '../hooks/useScrollAnimation'
import './DealsPage.css'

const categories = [
  'All',
  'Web Hosting',
  'VPN',
  'AI Tools',
  'Cloud Platforms',
  'Developer Tools',
  'Coding Courses',
  'Productivity Apps',
  'Resume/ATS Tools',
  'SaaS Platforms',
  'DevOps/Cloud Tools'
]

const sortOptions = [
  { value: 'rating', label: 'Highest Rating' },
  { value: 'name', label: 'Alphabetical (A-Z)' },
  { value: 'commission', label: 'Earning Potential' }
]

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const remainder = rating - full
  const half = remainder >= 0.4 && remainder <= 0.8
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <div className="flex items-center gap-1 text-amber-400 font-bold deal-stars" aria-label={`Rating: ${rating} out of 5`}>
      <span className="text-[14px]">{'★'.repeat(full)}</span>
      {half && <span className="text-[14px]">½</span>}
      <span className="text-slate-600 text-[14px]">{'★'.repeat(empty)}</span>
      <span className="text-slate-400 text-xs font-semibold ml-1 font-body">{rating}/5</span>
    </div>
  )
}

export default function DealsPage() {
  const location = useLocation()

  const initialCategory = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const catParam = params.get('category')
    if (catParam && categories.includes(catParam)) {
      return catParam
    }
    return 'All'
  }, [location.search])

  const [activeFilter, setActiveFilter] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const titleRef = useScrollAnimation()

  useEffect(() => {
    setActiveFilter(initialCategory)
  }, [initialCategory])

  // Dynamic filter and search logic
  const filteredAndSortedDeals = useMemo(() => {
    let result = [...dealsData]

    // Category Filter
    if (activeFilter !== 'All') {
      result = result.filter(item => item.category === activeFilter)
    }

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.tagline.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sort Logic
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === 'commission') {
        // Simple priority sort for high earnings payouts
        const getPriority = (commStr) => {
          const str = commStr.toLowerCase()
          if (str.includes('1,000') || str.includes('500') || str.includes('10,000') || str.includes('8,000')) return 3
          if (str.includes('150') || str.includes('100') || str.includes('125') || str.includes('120')) return 2
          if (str.includes('45%') || str.includes('50%') || str.includes('40%')) return 1.5
          return 1
        }
        return getPriority(b.commission) - getPriority(a.commission)
      }
      return 0
    })

    return result
  }, [activeFilter, searchQuery, sortBy])

  return (
    <div className="deals-page pt-24 pb-20 dot-pattern">
      <Helmet>
        <title>Developer Blogs &amp; Reviews - DevKart</title>
        <link rel="canonical" href="https://devkart.in/blog" />
      </Helmet>
      <div className="deals-hero-glow" aria-hidden="true" />

      {/* Primary Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-8 pb-10" aria-labelledby="deals-title">
        <div ref={titleRef} className="fade-up visible">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 font-heading">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            100% Curated Developer Blogs
          </div>
          <h1 id="deals-title" className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading leading-tight">
            Developer Blogs &amp; <br />
            <span className="gradient-text">Affiliate Tool Hub</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-body">
            Maximize your pipeline, secure premium hosting discounts, automate with AI, and upgrade your stack. All links feature direct developer discount rates.
          </p>
        </div>
      </section>

      {/* Main Catalog Workspace */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Controls Panel */}
        <div className="flex flex-col gap-6 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-md mb-10 shadow-xl">
          {/* Search and Sort row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input Box */}
            <div className="deals-search-wrapper w-full md:max-w-md flex items-center px-4 py-3 gap-3">
              <svg className="text-slate-500 flex-shrink-0" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search blogs (e.g. Hostinger, cloud, AI, VPN)..."
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm border-none outline-none font-body"
                aria-label="Search all blogs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-500 hover:text-white transition-colors p-0.5"
                  title="Clear search"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Sorting Select Option */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-slate-400 text-sm font-semibold whitespace-nowrap font-heading">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="deals-select w-full md:w-52"
                aria-label="Sort options"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories Horizontal Scrolling List */}
          <div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3 font-heading">
              Filter by Category
            </div>
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide select-none -mx-2 px-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`deal-pill ${activeFilter === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter / Title */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-sm font-medium font-body">
            Showing <strong className="text-emerald-400 font-bold">{filteredAndSortedDeals.length}</strong> blog{filteredAndSortedDeals.length !== 1 ? 's' : ''} out of 100
          </p>
          {activeFilter !== 'All' && (
            <button
              onClick={() => setActiveFilter('All')}
              className="text-xs font-semibold text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-wider"
            >
              Reset Category
            </button>
          )}
        </div>

        {/* Card responsive grid */}
        {filteredAndSortedDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDeals.map((deal, idx) => (
              <article
                key={deal.id}
                className="deal-card card bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold font-heading text-slate-500 tracking-wide">
                      {deal.category}
                    </span>
                    <span className={`badge ${deal.badgeClass || 'badge-blue'} text-[10px]`}>
                      {deal.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white tracking-tight mb-1">
                    {deal.name}
                  </h3>
                  
                  <div className="text-xs font-semibold text-emerald-400 italic mb-2 tracking-wide font-heading">
                    {deal.tagline}
                  </div>

                  <div className="mb-4">
                    <StarRating rating={deal.rating} />
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5 font-body">
                    {deal.description}
                  </p>
                </div>

                {/* Footer and link CTA elements */}
                <div className="mt-auto border-t border-slate-800 pt-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {deal.tags.map(t => (
                      <span key={t} className="tag text-[10px] py-0.5 px-2 bg-slate-900 border border-slate-800 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold font-heading">
                        Earnings Potential
                      </span>
                      <span className="text-sm font-bold text-white font-body">
                        💰 {deal.commission}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={deal.link}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn-primary btn-sm flex items-center justify-center gap-1.5 w-full text-center text-sm font-bold tracking-wide"
                    >
                      View Deal →
                    </a>
                    <Link
                      to={`/blog/${deal.id}`}
                      className="btn-ghost btn-sm flex items-center justify-center gap-1.5 w-full text-center text-sm font-bold tracking-wide"
                    >
                      Read Review →
                    </Link>
                    <span className="text-[10px] text-slate-500 text-center font-medium font-body mt-1 select-none">
                      *Affiliate link
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-slate-900/40 border border-slate-800 rounded-2xl text-center backdrop-blur-md">
            <span className="text-4xl mb-4" role="img" aria-label="No results">🔍</span>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">No Blogs Found</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto mb-6 font-body">
              We couldn't find matches for "{searchQuery}" in this category. Try typing other keywords or clearing the search.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('All') }}
              className="btn-ghost btn-sm text-xs"
            >
              Clear Search Filters
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
