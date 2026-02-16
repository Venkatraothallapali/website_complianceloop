import { useEffect, useState } from 'react'
import { Section } from '../types'
import './Navbar.css'
import logoImage from '../Public/image.png'

interface NavbarProps {
  activeSection: Section
  setActiveSection: (section: Section) => void
}

const serviceLinks = [
  { id: 'cmo', label: 'CMO' },
  { id: 'cdmo', label: 'CDMO' },
  { id: 'cro', label: 'CROs' },
  { id: 'preclinical', label: 'Pre-Clinical' },
  { id: 'clinical', label: 'Clinical' },
  { id: 'analytical-testing', label: 'Analytical Testing' },
  { id: 'stability-warehouse', label: 'Stability & Warehouse' },
]

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (section: Section) => {
    setActiveSection(section)
    setIsMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleServiceItemClick = (serviceId: string) => {
    const scrollToServiceWithOffset = (id: string, offset: number = 100) => {
      const el = document.getElementById(`service-${id}`)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const absoluteTop = rect.top + window.scrollY
      window.scrollTo({
        top: absoluteTop - offset,
        behavior: 'smooth',
      })
    }

    if (activeSection === 'services') {
      // Already on Services page – just scroll within the page
      setIsMobileMenuOpen(false)
      scrollToServiceWithOffset(serviceId)
    } else {
      // Not on Services yet – remember target and navigate
      try {
        window.sessionStorage.setItem('scrollToService', serviceId)
      } catch {
        // ignore if sessionStorage is not available
      }
      handleNavClick('services')
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="https://industryiceberg.com" className="nav-logo">
          <img src={logoImage} alt="Industry Iceberg" />
        </a>
        
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
        </button>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <a
              href="https://industryiceberg.com"
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            >
              Home
            </a>
          </li>
          <li className="services-dropdown">
            <a
              href="#services"
              className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('services')
              }}
            >
              Services
            </a>
            <ul className="services-dropdown-menu">
              {serviceLinks.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="nav-link services-dropdown-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleServiceItemClick(service.id)
                    }}
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a
              href="#contact"
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('contact')
              }}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="https://pharma.industryiceberg.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link sign-in-btn"
            >
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
