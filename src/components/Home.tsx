import { useEffect, useRef } from 'react'
import { Section } from '../types'
import './Home.css'
import logoImage from '../Public/image.png'

interface HomeProps {
  onNavigate?: (section: Section) => void
  activeSection?: Section
}

const Home: React.FC<HomeProps> = ({ onNavigate, activeSection }) => {
  const homeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentRef = homeRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (currentRef) {
      const elements = currentRef.querySelectorAll('.animate-on-scroll')
      elements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (currentRef) {
        const elements = currentRef.querySelectorAll('.animate-on-scroll')
        elements.forEach((el) => observer.unobserve(el))
      }
    }
  }, [])

  return (
    <section id="home" className="home-section" ref={homeRef}>
      <div className="home-hero">
        <div className="container">
          <h1 className="main-title animate-on-scroll">
            Compliance Loop
          </h1>
          <p className="subtitle-description animate-on-scroll">
            An AI-driven platform enabling life sciences companies to identify and engage compliant global partners.
          </p>
        </div>
      </div>

      <div className="home-content">
        <div className="container">
          <div className="story-section animate-on-scroll">
            <div className="story-content">
              <h2 className="section-heading">Our Story</h2>
              <p className="story-text">
                Industry Iceberg <strong>(ii)</strong> was born out of Masuu's
                vision, backed by over <strong>150 years of collective experience</strong> from our
                founders and Scientific Advisory Board. Shaped by insights from{' '}
                <strong>450+ pharmaceutical companies</strong>, we recognized a critical need for
                speed, trust, and regulatory clarity when selecting service
                partners—whether CMOs, CDMOs, CROs, preclinical and clinical
                labs, analytical testing labs, or stability and warehousing
                facilities.
              </p>
              <p className="story-text">
                That's why we created <strong>ii</strong>—an AI-powered discovery platform
                designed to help life sciences companies effortlessly identify
                and connect with the most compliant and capable global partners,
                ensuring regulatory and quality excellence at every step.
              </p>
            </div>
          </div>

          <div className="vision-section animate-on-scroll">
            <div className="content-card vision-card">
              <h3>Our Vision</h3>
              <p>
                Industry Iceberg believes that genuine enterprise transformation
                stems from fostering superior decision-making throughout an
                organization, leading to sustainable competitive advantage. Our
                profound expertise in AI, engineering, and design allows us to
                develop products and solutions that achieve{' '}
                <strong>billion-dollar impact</strong> for our clientele.
              </p>
            </div>
          </div>

          <div className="services-preview animate-on-scroll">
            <h2 className="section-heading">Featured Services</h2>
            <p className="services-intro-text">
              Our platform offers seamless access to a wide range of services,
              including:
            </p>
            <div className="services-grid">
              <div className="service-preview-item">
                <div className="service-icon">
                  <img
                    src="/ServisesIcons_images/CMO.png"
                    alt="CMO service icon"
                  />
                </div>
                <h4>Contract Manufacturing Organizations (CMO)</h4>
              </div>
              <div className="service-preview-item">
                <div className="service-icon">
                  <img
                    src="/ServisesIcons_images/CRO.png"
                    alt="CRO service icon"
                  />
                </div>
                <h4>Contract Research Organizations (CROs)</h4>
              </div>
              <div className="service-preview-item">
                <div className="service-icon">
                  <img
                    src="/ServisesIcons_images/Pre-Clinical.png"
                    alt="Pre-Clinical service icon"
                  />
                </div>
                <h4>Pre-Clinical</h4>
              </div>
              <div className="service-preview-item">
                <div className="service-icon">
                  <img
                    src="/ServisesIcons_images/Clinical.png"
                    alt="Clinical service icon"
                  />
                </div>
                <h4>Clinical</h4>
              </div>
              <div className="service-preview-item">
                <div className="service-icon">
                  <img
                    src="/ServisesIcons_images/Analytical%20Testing%20LAB(ATL).png"
                    alt="Analytical Testing Lab (ATL) service icon"
                  />
                </div>
                <h4>Analytical Testing Lab (ATL)</h4>
              </div>
              <div className="service-preview-item">
                <div className="service-icon">
                  <img
                    src="/ServisesIcons_images/Stability_Warehouse.png"
                    alt="Stability & Warehouse service icon"
                  />
                </div>
                <h4>Stability & Warehouse</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo-section">
            <img src={logoImage} alt="Industry Iceberg" className="footer-logo" />
            <div className="footer-brand">
              <span className="footer-brand-name">Compliance Loop</span>
            </div>
          </div>
          <nav className="footer-nav">
            <a
              href="#services"
              className="footer-link"
              onClick={(e) => {
                e.preventDefault()
                if (activeSection !== 'services') {
                  onNavigate?.('services')
                  window.location.hash = 'services'
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            >
              Services
            </a>
            <a
              href="#contact"
              className="footer-link"
              onClick={(e) => {
                e.preventDefault()
                if (activeSection !== 'contact') {
                  onNavigate?.('contact')
                  window.location.hash = 'contact'
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            >
              Contact
            </a>
          </nav>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Industry Iceberg (ii). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Home
