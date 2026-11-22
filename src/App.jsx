import { useCallback, useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { SkillsSection } from '@/components/SkillsSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore storage errors
    }
  }, [theme])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)

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

        setActiveSection((current) =>
          current === currentSection ? current : currentSection,
        )
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavigate = useCallback((event, href) => {
    const id = href.replace('#', '')
    const target = document.getElementById(id)

    if (target) {
      event.preventDefault()
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const navOffset = id === 'hero' ? 0 : 68
      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - navOffset,
      )

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }

    setActiveSection(id === 'hero' ? '' : id)
    setMenuOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--ink-primary)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--ink-primary)] focus:px-3.5 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--bg-canvas)]"
      >
        Skip to content
      </a>

      <Navbar
        theme={theme}
        onThemeChange={setTheme}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onNavigate={handleNavigate}
        scrolled={scrolled}
      />

      <main id="main-content">
        <HeroSection theme={theme} onNavigate={handleNavigate} />
        <AboutSection theme={theme} />
        <ProjectsSection theme={theme} />
        <SkillsSection />
        <ContactSection theme={theme} />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App
