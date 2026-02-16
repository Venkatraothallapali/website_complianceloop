import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Services from './components/Services'
//import Contact from './components/Contact'
import ScheduleDemo from './components/ScheduleDemo'
import { Section } from './types'

function App() {
  // Get initial section from URL hash, default to 'home'
  const getSectionFromHash = (): Section => {
    const hash = window.location.hash.slice(1) // Remove the '#'
    if (hash === 'services' || hash === 'contact' || hash === 'home') {
      return hash as Section
    }
    return 'home'
  }

  const [activeSection, setActiveSection] = useState<Section>(getSectionFromHash())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set initial hash if not present (only on first load)
    if (!window.location.hash || window.location.hash === '#') {
      // Don't enforce #home on initial load
    }
    
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const section = getSectionFromHash()
      setActiveSection(section)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Update URL hash when section changes
  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
    if (section === 'home') {
      // Remove hash for home section
      window.history.pushState(null, '', window.location.pathname + window.location.search)
    } else {
      window.location.hash = section
    }
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="app">
      {activeSection !== 'contact' && (
        <Navbar activeSection={activeSection} setActiveSection={handleSectionChange} />
      )}
      <main className={activeSection === 'contact' ? '' : 'main-content'}>
        {activeSection === 'home' && (
          <Home onNavigate={handleSectionChange} activeSection={activeSection} />
        )}
        {activeSection === 'services' && <Services />}
        {activeSection === 'contact' && <ScheduleDemo />}
      </main>
    </div>
  )
}

export default App
