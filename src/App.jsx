import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { coreSkills, projects, skills, technologyCatalog } from './data'
import brandLogo from '../img/logo.svg'

const navItems = [
  { href: '#about', label: 'About me' },
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

function App() {
  const navRef = useRef(null)
  const formRef = useRef(null)
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
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
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      let currentSection = ''
      const sections = document.querySelectorAll('main section[id]')

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180
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

  const smoothScrollTo = (targetY) => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  const handleNavClick = (href) => {
    setActiveSection(href.replace('#', ''))
    setMenuOpen(false)
  }

  const handleHeroScroll = (event) => {
    event.preventDefault()
    const aboutSection = document.getElementById('about')

    if (!aboutSection) {
      return
    }

    const navHeight = navRef.current?.offsetHeight || 0
    const sectionTop = aboutSection.getBoundingClientRect().top + window.scrollY
    const sectionHeight = aboutSection.offsetHeight
    const viewportHeight = window.innerHeight
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const targetY = isMobile
      ? Math.max(0, sectionTop - navHeight)
      : Math.max(
          0,
          sectionTop + sectionHeight / 2 - (navHeight + viewportHeight) / 2,
        )

    smoothScrollTo(targetY)
    handleNavClick('#about')
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

  const focusFirstInvalidField = (nextValidation) => {
    const firstInvalidKey = Object.entries(nextValidation).find(
      ([, isValid]) => !isValid,
    )?.[0]

    if (!firstInvalidKey) {
      return
    }

    window.requestAnimationFrame(() => {
      formRef.current?.querySelector(`#${firstInvalidKey}`)?.focus()
    })
  }

  const validateCurrent = () => {
    const nextValidation = validatePayload(formData)
    const isValid = Object.values(nextValidation).every(Boolean)

    setValidation(nextValidation)

    if (!isValid) {
      focusFirstInvalidField(nextValidation)
    }

    return isValid
  }

  const sendEmails = (payload) => {
    const sendToYou = emailjs.send('service_604rk54', 'template_hsaguau', {
      from_name: payload.name,
      from_email: payload.email,
      message: payload.message,
      to_email: 'facundososabianciotto@gmail.com',
      subject: 'Mensaje desde portfolio',
    })

    const sendToSender = emailjs.send('service_604rk54', 'template_j2wgpsq', {
      from_name: payload.name,
      from_email: 'facundososabianciotto@gmail.com',
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

  const getTechnology = (key) => technologyCatalog[key]
  const showSuccess = formState === 'success'
  const showError = formState === 'error'
  const showLoader = formState === 'loading'
  const currentYear = new Date().getFullYear()

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <nav
        className={`site-nav navbar navbar-expand-lg fixed-top ${menuOpen ? 'site-nav--menu-open' : ''}`}
        ref={navRef}
      >
        <div className="container nav-shell">
          <a
            className="brand-mark"
            href="#hero"
            onClick={() => handleNavClick('#hero')}
          >
            <img
              src={brandLogo}
              alt="Facundo Sosa logo"
              className="brand-mark__logo"
              width="44"
              height="44"
            />
          </a>

          <div
            className={`navbar-collapse collapse ${menuOpen ? 'show' : ''}`}
            id="navbarNav"
          >
            <div className="nav-panel">
              <ul className="navbar-nav nav-list">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '')

                  return (
                    <li className="nav-item" key={item.href}>
                      <a
                        className={`nav-link ${isActive ? 'active' : ''}`}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => handleNavClick(item.href)}
                      >
                        <span className="nav-link__index">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="nav-controls">
            <button
              type="button"
              id="theme-toggle"
              className="theme-switch"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              onClick={toggleTheme}
            >
              <span className="theme-switch__icon" aria-hidden="true">
                {theme === 'dark' ? '◐' : '◑'}
              </span>
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <button
              className="navbar-toggler nav-toggle"
              type="button"
              aria-controls="navbarNav"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="nav-toggle__icon"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="nav-toggle__icon"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              )}
              <span className="visually-hidden">
                {menuOpen ? 'Close menu' : 'Open menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        <section id="hero" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1 className="hero-title">Facundo Sosa Bianciotto</h1>
              <p className="hero-subtitle">
                Systems Analyst • Systems Engineering Student
              </p>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <lottie-player
                src="https://assets5.lottiefiles.com/packages/lf20_iorpbol0.json"
                className="hero-lottie"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>

          <a className="hero-scroll" href="#about" onClick={handleHeroScroll}>
            <span className="hero-scroll__label">View more</span>
            <span className="hero-scroll__arrows" aria-hidden="true">
              <i className="bi bi-chevron-down" />
              <i className="bi bi-chevron-down" />
            </span>
          </a>
        </section>

        <section id="about" className="content-section about-section">
          <div className="container section-shell">
            <div className="section-heading">
              <h2>About</h2>
            </div>

            <article className="narrative-block">
              <p>
                I am a Systems Analyst and currently in my final year of a
                Systems Engineering degree. I am passionate about technology,
                especially its ability to create innovative solutions that
                generate real value and solve real-world problems.
              </p>
              <p>
                I am particularly interested in focusing my professional career
                on software architecture and system design, building robust and
                scalable solutions by applying software engineering principles
                and best practices such as Clean Architecture. My goal is to
                develop maintainable, decoupled systems that can evolve over
                time.
              </p>
              <p>
                In my projects, I approach development end-to-end: from business
                requirements analysis and problem understanding, to architecture
                design, data modeling, and business logic implementation. I
                enjoy transforming ideas and needs into well-structured
                technical solutions.
              </p>
              <p>
                I am especially motivated by solving complex problems,
                optimizing processes, and designing efficient and reliable
                systems in real-world environments where technology has a
                tangible impact.
              </p>
              <p>
                I consider myself a curious, creative, and proactive person,
                with strong critical thinking skills and a continuous learning
                mindset, which allows me to quickly adapt to new challenges and
                technologies.
              </p>
            </article>
          </div>
        </section>

        <section
          id="projects"
          className="content-section content-section--muted"
        >
          <div className="container section-shell">
            <div className="section-heading">
              <h2>Projects</h2>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article
                  className={`project-entry ${project.image ? '' : 'project-entry--without-media'}`}
                  key={project.id}
                >
                  {project.image ? (
                    <div className="project-entry__media">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        width={project.imageWidth}
                        height={project.imageHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}

                  <div className="project-entry__body">
                    <div className="project-entry__meta">
                      <span className="project-badge">{project.badge}</span>
                    </div>

                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <ul
                      className="project-tech-list"
                      aria-label={`${project.title} technologies`}
                    >
                      {project.technologies.map((techKey) => {
                        const technology = getTechnology(techKey)

                        if (!technology) {
                          return null
                        }

                        return (
                          <li key={`${project.id}-${techKey}`}>
                            <img
                              src={technology.logo}
                              alt={technology.name}
                              title={technology.name}
                              width="32"
                              height="32"
                              loading="lazy"
                              decoding="async"
                            />
                          </li>
                        )
                      })}
                    </ul>

                    <div className="project-entry__actions">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button-link button-link--ghost"
                      >
                        <i className="bi bi-github" aria-hidden="true" />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="content-section">
          <div className="container section-shell">
            <div className="section-heading">
              <h2>Skills</h2>
            </div>

            <div className="skills-layout">
              <article className="content-block core-skills-block">
                <h3>Core Skills</h3>
                <ul className="core-skills-list">
                  {coreSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>

              <article className="content-block technologies-block">
                <h3>Technologies</h3>
                <div className="skills-cloud" aria-label="Technology logos">
                  {skills.map((skill) => (
                    <article className="skill-token" key={skill.id}>
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="skill-token__logo"
                        width="56"
                        height="56"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="skill-token__name">{skill.name}</span>
                    </article>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="content-section content-section--accent"
        >
          <div className="container section-shell">
            <div className="section-heading">
              <h2>Contact</h2>
            </div>

            <form
              id="contact-form"
              ref={formRef}
              className="contact-form-panel"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${validation.name ? '' : submitAttempted ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name…"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Please enter your name.</div>
              </div>

              <div className="form-row">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${validation.email ? '' : submitAttempted ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  spellCheck={false}
                  placeholder="name@company.com…"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className={`form-control ${validation.message ? '' : submitAttempted ? 'is-invalid' : ''}`}
                  id="message"
                  name="message"
                  rows="5"
                  autoComplete="off"
                  placeholder="Your message…"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  maxLength="255"
                />
                <div className="form-row__meta">
                  <div className="invalid-feedback">
                    Please enter a message with up to 255 characters.
                  </div>
                  <div id="charCount" className="form-text">
                    {charCount} / 255
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="button-link"
                  id="submit-btn"
                  disabled={showLoader}
                >
                  {showLoader ? 'Sending…' : 'Send message'}
                </button>
              </div>

              <div className="form-status" aria-live="polite">
                {showSuccess ? (
                  <p
                    id="form-success"
                    className="status-message status-message--success"
                  >
                    Your message has been sent successfully.
                  </p>
                ) : null}

                {showError ? (
                  <p
                    id="form-error"
                    className="status-message status-message--error"
                  >
                    There was an error sending your message. Please try again
                    later.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            &copy; {currentYear} Facundo Sosa Bianciotto. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
