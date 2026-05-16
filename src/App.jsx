import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ToolsPage from './pages/ToolsPage'
import BlogPage from './pages/BlogPage'
import BlogDetails from './pages/BlogDetails'
import AboutPage from './pages/AboutPage'
import DisclosurePage from './pages/DisclosurePage'
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
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/affiliate-disclosure" element={<DisclosurePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
