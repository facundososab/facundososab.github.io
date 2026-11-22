import { useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { brandLogo, navItems } from '@/data'
import { AnimatedThemeToggler } from '@/components/magicui/AnimatedThemeToggler'
import { ScrollProgress } from '@/components/magicui/ScrollProgress'
import { cn } from '@/lib/utils'

export function Navbar({
  theme,
  onThemeChange,
  activeSection,
  menuOpen,
  setMenuOpen,
  onNavigate,
  scrolled,
}) {
  const navRef = useRef(null)

  useEffect(() => {
    const onDocumentPointerDown = (event) => {
      if (!menuOpen) return
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', onDocumentPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onDocumentPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, setMenuOpen])

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-200',
        scrolled || menuOpen
          ? 'border-b border-[var(--border-subtle)] bg-[var(--bg-nav)] backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.3)]'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <ScrollProgress />

      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <a
          href="#hero"
          onClick={(e) => onNavigate(e, '#hero')}
          className="group inline-flex items-center no-underline"
        >
          <img
            src={brandLogo}
            alt="Facundo Sosa logo"
            width="36"
            height="36"
            className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {navItems.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => onNavigate(e, item.href)}
                    className={cn(
                      'inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium tracking-[-0.01em] no-underline transition-colors',
                      isActive
                        ? 'bg-[var(--bg-elevated)] text-[var(--ink-primary)]'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <AnimatedThemeToggler
            id="theme-toggle"
            theme={theme}
            onThemeChange={onThemeChange}
            variant="circle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
          />

          <button
            type="button"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-primary)] transition-colors hover:border-[var(--border-strong)] md:hidden"
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((prev) => !prev)
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="pointer-events-none inline-flex"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="pointer-events-none inline-flex"
                >
                  <Menu className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] md:hidden"
          >
            <ul className="m-0 flex list-none flex-col gap-1 px-6 py-4">
              {navItems.map((item, index) => {
                const id = item.href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                  >
                    <a
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) => onNavigate(e, item.href)}
                      className={cn(
                        'flex items-center rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition-colors',
                        isActive
                          ? 'bg-[var(--bg-elevated)] text-[var(--ink-primary)]'
                          : 'text-[var(--ink-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--ink-primary)]',
                      )}
                    >
                      <span>{item.label}</span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
