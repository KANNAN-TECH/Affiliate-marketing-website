import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DisclosurePage from './pages/DisclosurePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ContactPage from './pages/ContactPage'
import DealsPage from './pages/DealsPage'
import DealDetailsPage from './pages/DealDetailsPage'
import ExitIntentPopup from './components/ExitIntentPopup'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function App() {
  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<DealsPage />} />
          <Route path="/blog/:id" element={<DealDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/affiliate-disclosure" element={<DisclosurePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          {/* Automatic Redirects */}
          <Route path="/categories" element={<Navigate to="/blog" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ExitIntentPopup />
      <Footer />
    </div>
  )
}

export default App
