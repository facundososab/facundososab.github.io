import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { socialLinks } from '@/data'
import CrystalizedBall from '@/components/reactbits/CrystalizedBall'
import SpecularButton from '@/components/reactbits/SpecularButton'
import { AuroraText } from '@/components/magicui/AuroraText'
import { BlurFade } from '@/components/magicui/BlurFade'
import { cn } from '@/lib/utils'

const INTRO = "Hi, I'm Facundo Sosa Bianciotto,"
const ROLES = 'Systems Analyst & Systems Engineering Student'
const TOTAL_CHARS = INTRO.length + ROLES.length

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function HeroSection({ theme, onNavigate }) {
  const isDark = theme === 'dark'
  const [typedCount, setTypedCount] = useState(0)

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    if (prefersReducedMotion) {
      setTypedCount(TOTAL_CHARS)
      return undefined
    }

    let intervalId = null
    const startTimer = window.setTimeout(() => {
      let current = 0
      intervalId = window.setInterval(() => {
        current += 1
        setTypedCount(current)
        if (current >= TOTAL_CHARS && intervalId !== null) {
          window.clearInterval(intervalId)
          intervalId = null
        }
      }, 28)
    }, 180)

    return () => {
      window.clearTimeout(startTimer)
      if (intervalId !== null) {
        window.clearInterval(intervalId)
      }
    }
  }, [])

  const typedIntro = INTRO.slice(0, typedCount)
  const typedRoles =
    typedCount > INTRO.length ? ROLES.slice(0, typedCount - INTRO.length) : ''
  const onSecondLine = typedCount > INTRO.length
  const typingDone = typedCount >= TOTAL_CHARS

  const cursor = (
    <span
      className={cn(
        'inline-block font-semibold text-[var(--ink-primary)]',
        typingDone && 'animate-cursor-blink',
      )}
    >
      _
    </span>
  )

  return (
    <section
      id="hero"
      className="relative bg-[var(--bg-canvas)] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:min-h-[calc(100svh-1rem)] lg:flex lg:flex-col lg:justify-between"
    >
      <div className="mx-auto my-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-center gap-4">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex text-[var(--ink-primary)] opacity-80 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-100"
            >
              <LinkedInIcon />
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex text-[var(--ink-primary)] opacity-80 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-100"
            >
              <GitHubIcon />
            </a>
          </div>

          <h1 className="relative m-0">
            <span className="sr-only">
              {INTRO} {ROLES}
            </span>

            <span className="invisible select-none" aria-hidden="true">
              <span className="block text-[clamp(1.75rem,3.1vw,2.6rem)] font-normal leading-[1.2] tracking-[-0.025em] sm:whitespace-nowrap">
                {INTRO}
              </span>
              <span className="mt-2 block text-[clamp(1.85rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                {ROLES}_
              </span>
            </span>

            <span className="absolute inset-0" aria-hidden="true">
              <span className="block text-[clamp(1.75rem,3.1vw,2.6rem)] font-normal leading-[1.2] tracking-[-0.025em] text-[var(--ink-muted)] sm:whitespace-nowrap">
                {typedIntro}
                {!onSecondLine ? cursor : null}
              </span>
              {onSecondLine ? (
                <span className="mt-2 block text-[clamp(1.85rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--ink-primary)]">
                  {typedRoles ? (
                    <AuroraText
                      colors={
                        isDark
                          ? ['#fafafa', '#bfdbfe', '#60a5fa', '#3b82f6']
                          : ['#121212', '#1d4ed8', '#2563eb', '#3b82f6']
                      }
                    >
                      {typedRoles}
                    </AuroraText>
                  ) : null}
                  {cursor}
                </span>
              ) : null}
            </span>
          </h1>

          <div
            className={cn(
              'mt-9 transition-all delay-100 duration-500 ease-out',
              typingDone
                ? 'translate-y-0 opacity-100'
                : 'translate-y-3 opacity-0',
            )}
          >
            <div className="flex flex-wrap items-center gap-3.5">
              <SpecularButton
                href="#projects"
                onClick={(e) => onNavigate(e, '#projects')}
                size="md"
                radius={999}
                tint={isDark ? '#ffffff' : '#121212'}
                tintOpacity={isDark ? 0.08 : 0.92}
                textColor={isDark ? '#fafafa' : '#fdfff7'}
                lineColor={isDark ? '#93c5fd' : '#60a5fa'}
                baseColor={isDark ? '#3f3f46' : '#27272a'}
              >
                <span>Explore projects</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </SpecularButton>

              <a
                href="#contact"
                onClick={(e) => onNavigate(e, '#contact')}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-3 text-[0.9375rem] font-medium tracking-[-0.01em] text-[var(--ink-primary)] no-underline transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]"
              >
                <span>Get in touch</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <BlurFade delay={0.16} duration={0.65} offset={12}>
            <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]">
              <CrystalizedBall
                color={isDark ? '#5ea2ff' : '#2563eb'}
                theme={theme}
                size={0.78}
                strands={5}
                crackle={0.55}
                flares={0.55}
                glow={0.85}
                sparks={0.4}
                particleCount={15000}
                fill={0.6}
                motion="orbit"
                particleShape="round"
                depth={0.75}
                sway={0.7}
                twinkle={0.5}
                haze={0.6}
                speed={0.9}
                dustSpeed={0.85}
                interactive
                hoverStrength={0.75}
                intro
              />
            </div>
          </BlurFade>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-[1200px] justify-center px-6 lg:mt-0">
        <a
          href="#about"
          onClick={(e) => onNavigate(e, '#about')}
          className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--ink-muted)] no-underline transition-colors hover:text-[var(--ink-primary)]"
        >
          <span>View more</span>
          <ArrowDown
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  )
}
