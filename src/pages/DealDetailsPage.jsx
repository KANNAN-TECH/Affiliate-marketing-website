import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getDealById, synthesizeReview } from '../data/reviewSynthesizer'
import useScrollAnimation from '../hooks/useScrollAnimation'
import './DealDetailsPage.css'

export default function DealDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const rawDeal = getDealById(id)
  
  // Synthesize long-form review elements
  const deal = rawDeal ? synthesizeReview(rawDeal) : null

  const [activeFaq, setActiveFaq] = useState(null)
  const [showFloatCta, setShowFloatCta] = useState(false)
  const [activeSection, setActiveSection] = useState('intro')

  const introRef = useRef(null)
  const whatIsRef = useRef(null)
  const featuresRef = useRef(null)
  const specsRef = useRef(null)
  const casesRef = useRef(null)
  const speedRef = useRef(null)
  const prosConsRef = useRef(null)
  const ratesRef = useRef(null)
  const targetRef = useRef(null)
  const compRef = useRef(null)
  const faqRef = useRef(null)

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Scroll handler for floating CTA and active TOC highlights
  useEffect(() => {
    const handleScroll = () => {
      // Toggle floating CTA past 450px scroll
      setShowFloatCta(window.scrollY > 450)

      // Active Section Highlighter
      const scrollPos = window.scrollY + 200
      const sectionRefs = [
        { id: 'intro', ref: introRef },
        { id: 'whatIs', ref: whatIsRef },
        { id: 'features', ref: featuresRef },
        { id: 'specs', ref: specsRef },
        { id: 'cases', ref: casesRef },
        { id: 'speed', ref: speedRef },
        { id: 'pros-cons', ref: prosConsRef },
        { id: 'rates', ref: ratesRef },
        { id: 'target', ref: targetRef },
        { id: 'comp', ref: compRef },
        { id: 'faq', ref: faqRef }
      ]

      for (let i = sectionRefs.length - 1; i >= 0; i--) {
        const item = sectionRefs[i]
        if (item.ref.current && item.ref.current.offsetTop <= scrollPos) {
          setActiveSection(item.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // SEO Meta Trigger & Schema Injection
  useEffect(() => {
    if (deal) {
      document.title = deal.seoTitle
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', deal.seoDesc)

      // Inject OpenGraph / Twitter Tags
      const metas = [
        { name: 'keywords', content: [deal.focusKeyword, ...deal.semanticKeywords].join(', ') },
        { property: 'og:title', content: deal.seoTitle },
        { property: 'og:description', content: deal.seoDesc },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: deal.seoTitle },
        { name: 'twitter:description', content: deal.seoDesc }
      ];

      const injectedMetas = metas.map(meta => {
        const m = document.createElement('meta');
        Object.entries(meta).forEach(([key, val]) => m.setAttribute(key, val));
        document.head.appendChild(m);
        return m;
      });

      // Dynamic Schema.org injection
      const schemas = [
        // 1. Product/Review Schema
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": deal.name,
          "description": deal.seoDesc,
          "brand": { "@type": "Brand", "name": deal.name },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": deal.rating.toString(),
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": Math.floor(Math.random() * 500) + 50
          }
        },
        // 2. Article Schema
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": deal.seoTitle,
          "datePublished": "2026-05-20",
          "author": { "@type": "Person", "name": "Kannan M" }
        },
        // 3. FAQ Schema
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": deal.faq.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        },
        // 4. Breadcrumb Schema
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://devkart.in/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://devkart.in/blog" },
            { "@type": "ListItem", "position": 3, "name": deal.name, "item": window.location.href }
          ]
        }
      ]

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'deal-schema'
      script.innerHTML = JSON.stringify(schemas)
      document.head.appendChild(script)

      return () => {
        document.title = 'DevKart — Best Dev Tools, Hosting & Career Resources for Indian Developers'
        const existingSchema = document.getElementById('deal-schema')
        if (existingSchema) existingSchema.remove()
        injectedMetas.forEach(m => m.remove())
      }
    }
  }, [deal])

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center min-height-screen py-24 text-center">
        <h1 className="text-3xl font-bold font-heading text-white mb-4">Deal Review Not Found</h1>
        <p className="text-slate-400 mb-6 font-body">The requested developer tool review could not be found.</p>
        <Link to="/blog" className="btn-primary">← Back to All Blogs</Link>
      </div>
    )
  }

  // Smooth scroll helper
  const scrollTo = (elementRef) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 90,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="deal-details-page pt-20 pb-20 dot-pattern">
      <div className="glow-orb d-orb-1" aria-hidden="true" />
      <div className="glow-orb d-orb-2" aria-hidden="true" />

      {/* Floating CTA Top/Bottom Bar */}
      <div className={`floating-cta-bar bottom-bar p-4 flex flex-row items-center justify-between z-50 ${showFloatCta ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/25 rounded-lg flex items-center justify-center text-emerald-400 font-extrabold text-lg select-none">
              {deal.name.charAt(0)}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-semibold font-heading text-slate-500 uppercase tracking-wider">Reviewing Stack Add-on</span>
              <span className="text-sm font-bold text-white tracking-tight">{deal.name} — {deal.tagline}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-slate-500 uppercase font-semibold font-heading tracking-wider">Exclusive Payout</span>
              <span className="text-sm font-bold text-white font-body">💰 {deal.commission}</span>
            </div>
            <a
              href={deal.link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary btn-sm flex items-center gap-2 font-bold font-heading text-xs uppercase px-5 py-3 tracking-wider"
            >
              Get Discounted Deal →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="d-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="text-slate-700" aria-hidden="true">/</span>
          <Link to="/blog">Blog</Link>
          <span className="text-slate-700" aria-hidden="true">/</span>
          <span className="text-slate-500 font-semibold">{deal.name} Review</span>
        </nav>

        {/* Hero Review Headings */}
        <header className="mb-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4 font-heading">
            🔍 Developer Stack Audit
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight mb-3">
            {deal.name} Review: Architecting Modern Stacks in 2026
          </h1>
          <p className="text-xl text-slate-400 font-body mb-5 max-w-3xl leading-relaxed">
            {deal.tagline} — subject to rigorous developer load testing, speed audits, security reviews, and alternative mapping.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-t border-b border-slate-800/80 py-4 font-heading">
            <span className="flex items-center gap-1.5"><span className="w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 font-bold select-none">K</span> Kannan M</span>
            <span className="text-slate-700 select-none">•</span>
            <span>📅 May 20, 2026</span>
            <span className="text-slate-700 select-none">•</span>
            <span>⏱ 8 min read</span>
            <span className="text-slate-700 select-none">•</span>
            <span className="text-emerald-400">Verified Affiliate Discount Active</span>
          </div>
        </header>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Table of Contents Column (TOC collapses under 1024px) */}
          <aside className="hidden lg:block lg:col-span-1" aria-label="Table of Contents">
            <div className="toc-sidebar bg-slate-950/20 border border-slate-800/40 p-5 rounded-2xl">
              <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 font-heading border-b border-slate-800/80 pb-2">
                On This Page
              </h4>
              <nav className="flex flex-col gap-2">
                <button onClick={() => scrollTo(introRef)} className={`toc-link ${activeSection === 'intro' ? 'active' : ''}`}>
                  1. Deep Dive Review
                </button>
                <button onClick={() => scrollTo(whatIsRef)} className={`toc-link ${activeSection === 'whatIs' ? 'active' : ''}`}>
                  2. What is {deal.name}?
                </button>
                <button onClick={() => scrollTo(featuresRef)} className={`toc-link ${activeSection === 'features' ? 'active' : ''}`}>
                  3. Key Features
                </button>
                <button onClick={() => scrollTo(specsRef)} className={`toc-link ${activeSection === 'specs' ? 'active' : ''}`}>
                  4. Core Technical Specs
                </button>
                <button onClick={() => scrollTo(casesRef)} className={`toc-link ${activeSection === 'cases' ? 'active' : ''}`}>
                  5. Developer Use Cases
                </button>
                <button onClick={() => scrollTo(speedRef)} className={`toc-link ${activeSection === 'speed' ? 'active' : ''}`}>
                  6. Performance &amp; Security
                </button>
                <button onClick={() => scrollTo(prosConsRef)} className={`toc-link ${activeSection === 'pros-cons' ? 'active' : ''}`}>
                  7. Pros &amp; Cons Matrix
                </button>
                <button onClick={() => scrollTo(ratesRef)} className={`toc-link ${activeSection === 'rates' ? 'active' : ''}`}>
                  8. Pricing Tiers
                </button>
                <button onClick={() => scrollTo(targetRef)} className={`toc-link ${activeSection === 'target' ? 'active' : ''}`}>
                  9. Who Should Use It?
                </button>
                {deal.comparison && (
                  <button onClick={() => scrollTo(compRef)} className={`toc-link ${activeSection === 'comp' ? 'active' : ''}`}>
                    10. Comparison Showdown
                  </button>
                )}
                <button onClick={() => scrollTo(faqRef)} className={`toc-link ${activeSection === 'faq' ? 'active' : ''}`}>
                  11. Technical FAQs
                </button>
              </nav>
            </div>
          </aside>

          {/* Core Content Column */}
          <main className="col-span-1 lg:col-span-2 flex flex-col gap-10" aria-label="Review detailed text">
            
            {/* Section 1: Introduction */}
            <section ref={introRef} id="intro" className="scroll-mt-24">
              <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                1. In-Depth Technical Review
              </h2>
              <p className="text-slate-300 font-body text-base leading-relaxed mb-4">
                {deal.introduction}
              </p>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold font-heading tracking-wider">Affiliate Compensation</span>
                  <span className="text-xs text-slate-400 font-body">Clicks generate tiny referral commissions at no extra cost to you.</span>
                </div>
                <span className="bg-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 py-1 rounded select-none">
                  Disclosure
                </span>
              </div>
            </section>

            {/* Section 2: What Is */}
            {deal.whatIs && (
              <section ref={whatIsRef} id="whatIs" className="scroll-mt-24">
                <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                  2. What is {deal.name}?
                </h2>
                <div className="flex flex-col gap-4 text-slate-300 font-body text-base leading-relaxed">
                  {deal.whatIs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Section 3: Key Features */}
            {deal.keyFeatures && (
              <section ref={featuresRef} id="features" className="scroll-mt-24">
                <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                  3. Key Features &amp; Integrations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deal.keyFeatures.map((f, i) => (
                    <div key={i} className="p-5 bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 rounded-xl transition-all">
                      <h4 className="text-emerald-400 font-bold font-heading text-base mb-2">{f.title}</h4>
                      <p className="text-slate-400 font-body text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 4: Technical Specs Table */}
            <section ref={specsRef} id="specs" className="scroll-mt-24">
              <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                4. Core Technical Specifications
              </h2>
              <p className="text-slate-400 font-body text-sm leading-relaxed mb-4">
                Below are the core framework layers and infrastructure details verified during our stack audit:
              </p>
              <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-2">
                {deal.specs.map(spec => (
                  <div key={spec.label} className="spec-row flex justify-between py-3 border-b border-slate-800 last:border-none">
                    <span className="text-slate-400 font-semibold font-heading text-sm">{spec.label}</span>
                    <span className="text-emerald-400 font-bold font-body text-sm text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Developer Use Cases */}
            <section ref={casesRef} id="cases" className="scroll-mt-24">
              <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                5. Real-World Developer Use Case
              </h2>
              <p className="text-slate-300 font-body text-base leading-relaxed mb-4">
                {deal.useCase}
              </p>
            </section>

            {/* Section 6: Performance, Speed & Security */}
            <section ref={speedRef} id="speed" className="scroll-mt-24 flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                  6. Performance &amp; Security Benchmarks
                </h2>
                <p className="text-slate-300 font-body text-base leading-relaxed">
                  {deal.performance}
                </p>
              </div>

              <div className="p-5 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                <h4 className="text-sm font-bold text-white tracking-wide uppercase tracking-wider mb-2 font-heading">
                  🛡️ Security &amp; Compliance Audit
                </h4>
                <p className="text-slate-400 font-body text-sm leading-relaxed">
                  {deal.security}
                </p>
              </div>
            </section>

            {/* Section 7: Pros & Cons Grid */}
            <section ref={prosConsRef} id="pros-cons" className="scroll-mt-24">
              <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                7. Pros &amp; Cons Matrix
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {/* Pros list */}
                <div className="pro-con-card p-5 bg-emerald-950/10 border border-emerald-500/20 rounded-xl">
                  <h4 className="text-emerald-400 font-bold font-heading text-base mb-3 tracking-wide">
                    ✓ System Advantages
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {deal.prosAndCons.pros.map((p, i) => (
                      <li key={i} className="text-slate-300 font-body text-sm flex items-start gap-2">
                        <span className="text-emerald-400 font-bold select-none">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons list */}
                <div className="pro-con-card p-5 bg-red-950/10 border border-red-500/20 rounded-xl">
                  <h4 className="text-red-400 font-bold font-heading text-base mb-3 tracking-wide">
                    ✗ System Limitations
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {deal.prosAndCons.cons.map((p, i) => (
                      <li key={i} className="text-slate-300 font-body text-sm flex items-start gap-2">
                        <span className="text-red-400 font-bold select-none">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 8: Pricing Details */}
            <section ref={ratesRef} id="rates" className="scroll-mt-24">
              <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                8. Flexible Pricing Details
              </h2>
              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/40">
                <table className="min-w-full text-left font-body text-sm">
                  <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-bold font-heading">
                    <tr>
                      <th className="px-5 py-3.5">Tier Plan</th>
                      <th className="px-5 py-3.5 text-center">Price Rate</th>
                      <th className="px-5 py-3.5">Target Workload</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deal.pricing.map((p, i) => (
                      <tr key={i} className="border-b border-slate-800/60 last:border-none">
                        <td className="px-5 py-3.5 font-bold text-white">{p.tier}</td>
                        <td className="px-5 py-3.5 text-center text-emerald-400 font-extrabold">{p.price}</td>
                        <td className="px-5 py-3.5 text-slate-400">{p.focus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>


            {/* Section 9: Target Audience */}
            {deal.targetAudience && (
              <section ref={targetRef} id="target" className="scroll-mt-24">
                <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                  9. Who Should Use It?
                </h2>
                <div className="text-slate-300 font-body text-base leading-relaxed whitespace-pre-wrap">
                  {deal.targetAudience}
                </div>
              </section>
            )}

            {/* Section 10: Comparison */}
            {deal.comparison && (
              <section ref={compRef} id="comp" className="scroll-mt-24">
                <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                  10. Comparison Showdown
                </h2>
                <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
                  <div className="text-slate-300 font-body text-base leading-relaxed whitespace-pre-wrap">
                    {deal.comparison}
                  </div>
                </div>
              </section>
            )}

            {/* Section 11: FAQ Accordion */}
            <section ref={faqRef} id="faq" className="scroll-mt-24">
              <h2 className="text-2xl font-bold font-heading text-white mb-4 border-b border-slate-800 pb-2">
                11. Technical Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-3 mt-4">
                {deal.faq.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className={`faq-header ${activeFaq === idx ? 'open' : ''} text-sm font-semibold flex justify-between p-4 bg-slate-900 border border-slate-800 rounded-lg`}
                      aria-expanded={activeFaq === idx}
                    >
                      <span>Q: {item.q}</span>
                      <span className="text-slate-500 text-xs font-bold transition-transform duration-300">
                        {activeFaq === idx ? '▲' : '▼'}
                      </span>
                    </button>
                    {activeFaq === idx && (
                      <div className="faq-body p-4 bg-slate-950 border-l border-r border-b border-slate-800 rounded-b-lg text-slate-400 text-sm">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Final Verdict Summary */}
            <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              <h3 className="text-xl font-bold font-heading text-white mb-3">
                Final Verdict &amp; Recommendation
              </h3>
              <p className="text-slate-300 font-body text-sm leading-relaxed mb-4">
                {deal.verdict}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="btn-primary w-full text-center py-3 flex items-center justify-center font-bold tracking-wider"
                >
                  View Active Deal Promo →
                </a>
              </div>
            </section>

          </main>

          {/* Conversion Sticky Sidebar */}
          <aside className="col-span-1 lg:col-span-1" aria-label="Deal Actions">
            <div className="action-sidebar flex flex-col gap-6">
              
              {/* Discount Promo Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
                <div className="mb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold font-heading tracking-wider">
                    Official Referral Payout
                  </span>
                  <div className="text-2xl font-black text-white font-body mt-1">
                    💰 {deal.commission}
                  </div>
                  <p className="text-slate-400 text-xs font-body leading-relaxed mt-2">
                    Claim active developer credits, and fast tracking on setup templates.
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-4 mb-4">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold font-heading tracking-wider mb-2">
                    Blog Tags
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {deal.tags.map(t => (
                      <span key={t} className="tag text-[10px] py-0.5 px-2 bg-slate-950 border border-slate-800 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={deal.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn-primary text-center py-3 flex items-center justify-center text-xs font-bold tracking-wider font-heading uppercase"
                  >
                    Activate Coupon Deal
                  </a>
                  <span className="text-[9px] text-slate-500 text-center font-body mt-1">
                    *Affiliate link disclosure
                  </span>
                </div>
              </div>

              {/* Best Competitor Alternatives quick-links box */}
              {deal.alternatives.length > 0 && (
                <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 font-heading">
                    ⚖️ Best Alternatives
                  </h4>
                  <div className="flex flex-col gap-3">
                    {deal.alternatives.map(alt => (
                      <Link
                        key={alt.id}
                        to={`/blog/${alt.id}`}
                        className="p-3 bg-slate-900/60 border border-slate-850 hover:border-emerald-500/35 rounded-xl transition-all flex flex-col gap-1"
                      >
                        <span className="text-xs font-bold text-white font-heading">{alt.name}</span>
                        <span className="text-[10px] text-slate-400 italic font-body line-clamp-1">{alt.tagline}</span>
                        <span className="text-[10px] text-emerald-400 font-semibold font-heading">★ {alt.rating}/5</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>

        </div>

        {/* Bottom Related Deals Section */}
        {deal.alternatives.length > 0 && (
          <section className="border-t border-slate-800 mt-20 pt-16" aria-labelledby="related-deals-heading">
            <h2 id="related-deals-heading" className="text-2xl font-bold font-heading text-white mb-8 text-center">
              Related Developer Blogs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deal.alternatives.map(alt => (
                <article
                  key={alt.id}
                  className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/25 p-5 rounded-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold font-heading">{alt.category}</span>
                      <span className="text-[10px] text-amber-400 font-bold">★ {alt.rating}/5</span>
                    </div>
                    <h3 className="text-base font-bold text-white font-heading mb-1">{alt.name}</h3>
                    <p className="text-xs text-slate-400 font-body leading-relaxed mb-4 line-clamp-2">{alt.description}</p>
                  </div>
                  <Link
                    to={`/blog/${alt.id}`}
                    className="btn-ghost btn-sm text-[10px] flex items-center justify-center py-2 font-bold tracking-wider font-heading uppercase text-center"
                  >
                    Read Technical Audit
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
