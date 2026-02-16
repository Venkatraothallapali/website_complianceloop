import { useEffect, useRef } from 'react'
import { services, keyFeatures } from '../data/services'
//import type { Service } from '../types'
import './Services.css'

const Services: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // On mount, either scroll to a specific service (if requested) or to top
    const targetServiceId = (() => {
      try {
        return window.sessionStorage.getItem('scrollToService')
      } catch {
        return null
      }
    })()

    setTimeout(() => {
      // Helper to scroll with an offset so content isn't hidden behind the fixed navbar
      const scrollToWithOffset = (element: HTMLElement, offset: number = 100) => {
        const rect = element.getBoundingClientRect()
        const absoluteTop = rect.top + window.scrollY
        window.scrollTo({
          top: absoluteTop - offset,
          behavior: 'smooth',
        })
      }

      if (targetServiceId) {
        const el = document.getElementById(`service-${targetServiceId}`)
        if (el) {
          scrollToWithOffset(el)
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        try {
          window.sessionStorage.removeItem('scrollToService')
        } catch {
          // ignore
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 150)
  }, [])

  return (
    <section id="services" className="services-section">
      <div className="services-header-section">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Our Services</h1>
            <p className="section-subtitle">
              Comprehensive AI-powered platform solutions tailored to your needs.
              Explore our full range of services below.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="services-list-container" ref={servicesRef}>
            {services.map((service, index) => (
              <div key={service.id} id={`service-${service.id}`} className="service-card">
                <div className="service-card-header">
                  <span className="service-number">{index + 1}</span>
                  <h2 className="service-title">{service.title}</h2>
                </div>
                {service.subtitle && (
                  <h3 className="service-subtitle">{service.subtitle}</h3>
                )}

                <div className="service-content">
                  <p className="service-description">{service.description}</p>

                  {service.howItHelps && (
                    <div className="service-section">
                      <h4 className="section-label">How Industry Iceberg (ii) Helps:</h4>
                      <p className="section-text">{service.howItHelps}</p>
                    </div>
                  )}

                  {service.benefits && service.benefits.length > 0 && (
                    <div className="service-section">
                      <h4 className="section-label">Key Benefits:</h4>
                      <ul className="benefits-list">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="benefit-item">
                            <span className="check-icon">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.services && service.services.length > 0 && (
                    <div className="service-section">
                      <h4 className="section-label">Services Include:</h4>
                      <ul className="services-list">
                        {service.services.map((item, idx) => (
                          <li key={idx} className="service-item">
                            <span className="bullet">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.storageTypes && service.storageTypes.length > 0 && (
                    <div className="service-section">
                      <h4 className="section-label">Storage Types:</h4>
                      <ul className="services-list">
                        {service.storageTypes.map((item, idx) => (
                          <li key={idx} className="service-item">
                            <span className="bullet">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.humanizedTouch && (
                    <div className="service-section humanized-section">
                      <h4 className="section-label">Humanized Touch:</h4>
                      <p className="humanized-text">{service.humanizedTouch}</p>
                    </div>
                  )}

                  {service.supportedTypes && service.supportedTypes.length > 0 && (
                    <div className="service-section">
                      <h4 className="section-label">
                        {service.subtitle || service.title} We Support:
                      </h4>
                      <div className="supported-types">
                        {service.supportedTypes.map((type, idx) => (
                          <span key={idx} className="type-badge">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="key-features-section">
              <h2 className="features-title">Key Features at a Glance</h2>
              <div className="features-grid">
                {keyFeatures.map((feature, index) => {
                  const icons = ['🔍', '⚙️', '🌐', '✅', '🔗', '💼'];
                  return (
                    <div key={index} className="feature-card">
                      <div className="feature-icon">
                        {icons[index] || '🔍'}
                      </div>
                      <p className="feature-text">{feature}</p>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Services
