import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { coreSkills, skills } from '@/data'
import { BlurFade } from '@/components/magicui/BlurFade'
import { Marquee } from '@/components/magicui/Marquee'
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/magicui/Terminal'

export function SkillsSection() {
  const [replayCount, setReplayCount] = useState(0)

  return (
    <section
      id="skills"
      className="bg-[var(--bg-canvas)] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <BlurFade inView delay={0.05} offset={10}>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-[clamp(2.2rem,4vw,3.35rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink-primary)]">
              Skills
            </h2>
            <button
              type="button"
              onClick={() => setReplayCount((c) => c + 1)}
              className="hidden cursor-pointer items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)] sm:inline-flex"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Replay terminal</span>
            </button>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.1} offset={12}>
          <Terminal
            key={replayCount}
            title="facundo@portfolio:~/skills"
            startOnView={replayCount === 0}
            className="max-h-none max-w-none w-full rounded-2xl border-[#2e2e33] bg-[#16161a] text-[#fafafa] shadow-[0_24px_56px_-24px_rgba(0,0,0,0.45)] [&>div:first-child]:border-[#2e2e33]"
          >
            <TypingAnimation key="core-cmd" duration={24} className="text-sky-400">
              {'> cat ./core-skills.md'}
            </TypingAnimation>
            {coreSkills.map((skill) => (
              <AnimatedSpan
                key={skill}
                className="flex items-start gap-2.5 text-[#e4e4e7]"
              >
                <span className="text-emerald-400">✔</span>
                <span>{skill}</span>
              </AnimatedSpan>
            ))}
          </Terminal>

          <div className="mt-4 flex sm:hidden">
            <button
              type="button"
              onClick={() => setReplayCount((c) => c + 1)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Replay terminal</span>
            </button>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.16} offset={12} className="mt-14">
          <h3 className="mb-5 text-[clamp(1.5rem,2.3vw,1.95rem)] font-medium leading-[1.12] tracking-[-0.025em] text-[var(--ink-primary)]">
            Technologies
          </h3>

          <Marquee
            pauseOnHover
            repeat={3}
            className="edge-fade-x [--duration:32s] [--gap:0.875rem]"
          >
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 transition-colors hover:border-[var(--border-strong)]"
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  width="24"
                  height="24"
                  loading="lazy"
                  decoding="async"
                  className={`h-6 w-6 shrink-0 object-contain ${skill.darkInvert ? 'dark:invert' : ''}`}
                />
                <span className="whitespace-nowrap text-sm font-medium text-[var(--ink-primary)]">
                  {skill.name}
                </span>
              </div>
            ))}
          </Marquee>
        </BlurFade>
      </div>
    </section>
  )
}
