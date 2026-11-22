import { aboutParagraphs } from '@/data'
import { BlurFade } from '@/components/magicui/BlurFade'
import DotGrid from '@/components/reactbits/DotGrid'

export function AboutSection({ theme }) {
  const isDark = theme === 'dark'

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[var(--bg-canvas)] py-20 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <DotGrid
          dotSize={3.5}
          gap={26}
          baseColor={isDark ? '#28282f' : '#d6d6ce'}
          activeColor={isDark ? '#60a5fa' : '#2563eb'}
          proximity={130}
          strength={0.9}
          bounce={0.55}
          tension={0.4}
          returnDuration={0.8}
          shockRadius={240}
          shockStrength={4.5}
          swell={0.75}
          stretch={0.45}
          glow={0.45}
          fade={0.38}
          opacity={isDark ? 0.85 : 0.72}
          dpr={1.5}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <BlurFade inView delay={0.05} offset={10}>
            <h2 className="text-[clamp(2.2rem,4vw,3.35rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink-primary)]">
              About
            </h2>
          </BlurFade>
        </div>

        <article className="max-w-[65ch] space-y-6 lg:col-span-8">
          {aboutParagraphs.map((paragraph, index) => (
            <BlurFade
              key={paragraph}
              inView
              delay={0.08 + index * 0.06}
              offset={10}
            >
              <p
                className={
                  index === 0
                    ? 'text-[1.125rem] font-normal leading-[1.75] text-[var(--ink-primary)]'
                    : 'text-[1.03125rem] font-normal leading-[1.78] text-[var(--ink-secondary)]'
                }
              >
                {paragraph}
              </p>
            </BlurFade>
          ))}
        </article>
      </div>
    </section>
  )
}
