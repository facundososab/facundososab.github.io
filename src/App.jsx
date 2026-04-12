import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { projects, skills } from './data'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const initialForm = {
  name: '',
  email: '',
  message: '',
}

function validatePayload(payload) {
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)

  return {
    name: payload.name.trim().length > 0,
    email: emailIsValid,
    message: payload.message.trim().length > 0 && payload.message.length <= 255,
  }
}

function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, '-')
}

function App() {
  const navRef = useRef(null)
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [formData, setFormData] = useState(initialForm)
  const [formState, setFormState] = useState('idle')
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [submitAttempted, setSubmitAttempted] = useState(false)

  useEffect(() => {
    emailjs.init('SQwjMcWHR-RWQZs0O')
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      let currentSection = ''
      const sections = document.querySelectorAll('section')

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120
        const sectionHeight = section.clientHeight

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute('id') || ''
        }
      })

      setActiveSection(currentSection)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (!menuOpen) {
        return
      }

      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [menuOpen])

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onEscape)
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onEscape)
    }
  }, [selectedProject])

  useEffect(() => {
    if (formState !== 'success' && formState !== 'error') {
      return
    }

    const timeout = window.setTimeout(() => {
      setFormState('idle')
    }, 3000)

    return () => window.clearTimeout(timeout)
  }, [formState])

  const charCount = formData.message.length

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const handleNavClick = (href) => {
    setActiveSection(href.replace('#', ''))
    setMenuOpen(false)
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    const nextFormData = {
      ...formData,
      [id]: value,
    }

    setFormData(nextFormData)

    if (submitAttempted) {
      setValidation(validatePayload(nextFormData))
    }

    setFormState('idle')
  }

  const validateCurrent = () => {
    const nextValidation = validatePayload(formData)
    setValidation(nextValidation)
    return Object.values(nextValidation).every(Boolean)
  }

  const sendEmails = (payload) => {
    const sendToYou = emailjs.send('service_604rk54', 'template_hsaguau', {
      from_name: payload.name,
      from_email: payload.email,
      message: payload.message,
      to_email: 'facundososadev@gmail.com',
      subject: 'Mensaje desde portfolio',
    })

    const sendToSender = emailjs.send('service_604rk54', 'template_j2wgpsq', {
      from_name: payload.name,
      from_email: 'facundososadev@gmail.com',
      to_email: payload.email,
      subject: 'Mensaje recibido!',
      message: payload.message,
    })

    return Promise.all([sendToYou, sendToSender])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitAttempted(true)

    const isValid = validateCurrent()
    if (!isValid) {
      return
    }

    setFormState('loading')
    try {
      await sendEmails(formData)
      setFormData(initialForm)
      setValidation({
        name: false,
        email: false,
        message: false,
      })
      setSubmitAttempted(false)
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const showSuccess = formState === 'success'
  const showError = formState === 'error'
  const showLoader = formState === 'loading'

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" ref={navRef}>
        <div className="container">
          <a className="navbar-brand" href="#hero" onClick={() => handleNavClick('#hero')}>
            <img src="img/logo.svg" alt="Facundo Sosa Logo" className="img-fluid" />
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`navbar-collapse collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.href}>
                  <a
                    className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              id="theme-toggle"
              className="btn btn-outline-light ms-2"
              aria-label="Toggle light/dark mode"
              onClick={toggleTheme}
            >
              <i className={`bi ${theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'}`} />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section id="hero" className="min-vh-100 d-flex align-items-center text-center">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <h1 className="display-1 mb-3">Facundo Sosa</h1>
                <h2 className="lead mb-5">Web Developer & Designer</h2>
                <article className="position-relative my-4">
                  <div className="decoration-border-top" />
                  <p className="lead my-4">
                    I&apos;m passionate about technology and its power to <em>transform the world.</em> I&apos;m
                    driven to create <em>digital solutions</em> that tackle complex problems and improve
                    experiences for people.
                  </p>
                  <div className="decoration-border-bottom" />
                </article>
                <div className="social-links d-flex justify-content-center align-items-center gap-3 mt-5">
                  <a href="https://github.com/facundososab" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <i className="bi bi-github" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/facundo-sosa-bianciotto-3a0656216/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="bi bi-linkedin" />
                  </a>
                  <a
                    href="https://wa.me/34681281048"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="btn btn-whatsapp"
                  >
                    Text me <i className="bi bi-whatsapp" />
                  </a>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-center">
                <lottie-player
                  src="https://assets5.lottiefiles.com/packages/lf20_iorpbol0.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '300px', height: '300px' }}
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-5">
          <div className="container">
            <h2 className="text-center mb-3">About Me</h2>
            <div className="section-divider" />
            <p className="lead text-center">
              I&apos;m a web developer and designer with experience in front-end and back-end development. As a
              Systems Engineering student, I&apos;m constantly learning and experimenting with new technologies to
              expand my skill set.
            </p>
          </div>
        </section>

        <section id="projects" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-3">Projects</h2>
            <div className="section-divider" />
            <div className="row">
              {projects.map((project) => (
                <div className="col-md-6 mb-4" key={project.title}>
                  <div className="project-card" style={{ backgroundImage: `url('${project.image}')` }}>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-technologies">
                        <h4>Technologies:</h4>
                        <div className="d-flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <img
                              key={`${project.title}-${tech}`}
                              src={`img/skills-logos/${tech}.svg`}
                              alt={`${tech} logo`}
                              className="skill-logo"
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={() => setSelectedProject(project)}
                      >
                        View more
                      </button>
                    </div>
                    <div className="project-info-mobile">
                      <h3>{project.title}</h3>
                      <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={() => setSelectedProject(project)}
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-5">
          <div className="container">
            <h2 className="text-center mb-3">Skills</h2>
            <div className="section-divider" />
            <div className="skill-container">
              {skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <img src={`img/skills-logos/${skill.logo}`} alt={skill.name} className="skill-logo" />
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-3">Contact Me</h2>
            <div className="section-divider" />
            <p className="text-center mb-5 fs-3">Let&apos;s work together!</p>

            <form id="contact-form" className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${validation.name ? '' : submitAttempted ? 'is-invalid' : ''}`}
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Please enter your name.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${validation.email ? '' : submitAttempted ? 'is-invalid' : ''}`}
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Please enter a valid email address.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message (max 255 characters)
                </label>
                <textarea
                  className={`form-control ${validation.message ? '' : submitAttempted ? 'is-invalid' : ''}`}
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  maxLength="255"
                />
                <div className="invalid-feedback">Please enter a message (max 255 characters).</div>
                <div id="charCount" className="form-text">
                  {charCount} / 255
                </div>
              </div>

              <footer className="d-flex justify-content-center align-items-center flex-column gap-3">
                <button type="submit" className="btn btn-primary" id="submit-btn" disabled={showLoader}>
                  <i className="bi bi-envelope-fill" /> Send Message
                </button>

                {showLoader ? <div id="loader" className="spinner-border text-primary" role="status" /> : null}

                {showSuccess ? (
                  <div id="form-success" className="alert alert-success m-0">
                    Your message has been sent successfully!
                  </div>
                ) : null}

                {showError ? (
                  <div id="form-error" className="alert alert-danger m-0">
                    There was an error sending your message. Please try again later.
                  </div>
                ) : null}
              </footer>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-3 text-center">
        <div className="container">
          <p>&copy; 2025 Facundo Sosa. All rights reserved.</p>
        </div>
      </footer>

      {selectedProject ? (
        <div className="custom-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <div
            className="custom-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${slugify(selectedProject.title)}-label`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h5 className="modal-title" id={`${slugify(selectedProject.title)}-label`}>
                {selectedProject.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setSelectedProject(null)}
              />
            </div>
            <div className="modal-body">
              <img
                src={selectedProject.homepage_image}
                alt={`${selectedProject.title} Homepage`}
                className="img-fluid w-100"
              />
              <p className="mt-3">{selectedProject.description}</p>
              <div className="project-technologies mt-3">
                <h6>Technologies:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <img
                      key={`${selectedProject.title}-${tech}-modal`}
                      src={`img/skills-logos/${tech}.svg`}
                      alt={`${tech} logo`}
                      className="skill-logo"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default App
