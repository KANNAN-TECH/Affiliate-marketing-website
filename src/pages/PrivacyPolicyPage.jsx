import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './AboutPage.css'; // Re-use the clean styles from AboutPage

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page pt-20 pb-20 dot-pattern">
      <Helmet>
        <title>Privacy Policy &amp; Terms - DevKart</title>
        <meta name="description" content="Read our privacy policy, terms of service, and affiliate disclosure. We respect your data and privacy." />
        <link rel="canonical" href="https://devkart.in/privacy" />
      </Helmet>

      <div className="glow-orb orb-1" aria-hidden="true" />
      <div className="glow-orb orb-2" aria-hidden="true" />

      <div className="container relative z-10 pt-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black font-heading text-white mb-4">
              Privacy Policy &amp; Terms
            </h1>
            <p className="text-xl text-slate-400 font-body">
              Effective Date: May 20, 2026
            </p>
          </header>

          <main className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
            <section className="mb-10">
              <h2 className="text-2xl font-bold font-heading text-emerald-400 mb-4">1. Information We Collect</h2>
              <p className="text-slate-300 font-body leading-relaxed mb-4">
                When you visit DevKart, we may collect non-personally identifiable information such as browser type, device type, and basic analytics data to help improve user experience. If you subscribe to our newsletter, we collect your email address purely for communication purposes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold font-heading text-emerald-400 mb-4">2. Affiliate Tracking &amp; Cookies</h2>
              <p className="text-slate-300 font-body leading-relaxed mb-4">
                DevKart is an affiliate platform. When you click outbound links to software tools, web hosts, or courses, a cookie may be placed in your browser by the affiliate network to track referrals. This allows us to earn a small commission at zero extra cost to you. We do not control these third-party cookies and recommend reviewing their respective privacy policies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold font-heading text-emerald-400 mb-4">3. Data Security &amp; Retention</h2>
              <p className="text-slate-300 font-body leading-relaxed mb-4">
                Any data collected (such as email subscriptions) is securely encrypted and stored. We do not sell, rent, or distribute your personal information to third parties. You may unsubscribe from our communications at any time.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold font-heading text-emerald-400 mb-4">4. Third-Party Links</h2>
              <p className="text-slate-300 font-body leading-relaxed mb-4">
                Our site contains links to third-party platforms. Once you leave DevKart, we are not responsible for the privacy practices or the content of those external websites.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-heading text-emerald-400 mb-4">5. Contact Us</h2>
              <p className="text-slate-300 font-body leading-relaxed">
                If you have any questions regarding this Privacy Policy, please contact us at <strong>privacy@devkart.in</strong>.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
