import { Award, ArrowUpRight, Globe } from 'lucide-react'
import { projects, technologyCatalog } from '@/data'
import { BlurFade } from '@/components/magicui/BlurFade'
import { MagicCard } from '@/components/magicui/MagicCard'
import SpecularButton from '@/components/reactbits/SpecularButton'

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function TechBadges({ projectId, technologies }) {
  return (
    <ul
      className="m-0 flex list-none flex-wrap gap-2 p-0"
      aria-label={`${projectId} technologies`}
    >
      {technologies.map((techKey) => {
        const tech = technologyCatalog[techKey]
        if (!tech) return null

        return (
          <li
            key={`${projectId}-${techKey}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--ink-secondary)]"
          >
            <img
              src={tech.logo}
              alt={tech.name}
              width="16"
              height="16"
              loading="lazy"
              decoding="async"
              className={`h-4 w-4 object-contain ${tech.darkInvert ? 'dark:invert' : ''}`}
            />
            <span>{tech.name}</span>
          </li>
        )
      })}
    </ul>
  )
}

function ProjectAction({ project, buttonThemeProps }) {
  if (project.websiteUrl) {
    return (
      <SpecularButton
        href={project.websiteUrl}
        target="_blank"
        rel="noreferrer"
        {...buttonThemeProps}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span>Visit website</span>
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </SpecularButton>
    )
  }

  if (project.githubUrl) {
    return (
      <SpecularButton
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        {...buttonThemeProps}
      >
        <GitHubIcon />
        <span>View on GitHub</span>
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </SpecularButton>
    )
  }

  return null
}

export function ProjectsSection({ theme }) {
  const isDark = theme === 'dark'
  const featuredProject = projects.find((project) => project.featured)
  const secondaryProjects = projects.filter((project) => !project.featured)

  const buttonThemeProps = {
    size: 'sm',
    radius: 999,
    tint: isDark ? '#ffffff' : '#121212',
    tintOpacity: isDark ? 0.06 : 0.9,
    textColor: isDark ? '#fafafa' : '#fdfff7',
    lineColor: isDark ? '#93c5fd' : '#60a5fa',
    baseColor: isDark ? '#3f3f46' : '#27272a',
  }

  return (
    <section
      id="projects"
      className="bg-[var(--bg-canvas)] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <BlurFade inView delay={0.05} offset={10}>
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[clamp(2.2rem,4vw,3.35rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink-primary)]">
                Projects
              </h2>
            </div>
            <p className="max-w-[42ch] text-sm leading-relaxed text-[var(--ink-muted)]">
              End-to-end systems built from requirements analysis and data
              modeling through maintainable production code.
            </p>
          </div>
        </BlurFade>

        {featuredProject ? (
          <BlurFade inView delay={0.08} offset={14} className="mb-6">
            <MagicCard
              className="rounded-2xl"
              gradientColor={
                isDark ? 'rgba(96, 165, 250, 0.12)' : 'rgba(37, 99, 235, 0.08)'
              }
              gradientFrom={isDark ? '#60a5fa' : '#3b82f6'}
              gradientTo={isDark ? '#93c5fd' : '#93c5fd'}
            >
              <article className="group/card grid grid-cols-1 items-center gap-8 p-6 sm:p-8 lg:grid-cols-12">
                <div className="flex flex-col lg:col-span-6">
                  <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--ink-primary)] sm:text-[1.75rem]">
                    {featuredProject.title}
                  </h3>

                  <p className="mt-3 max-w-[58ch] text-[0.96875rem] leading-relaxed text-[var(--ink-secondary)]">
                    {featuredProject.description}
                  </p>

                  <div className="mt-5">
                    <TechBadges
                      projectId={featuredProject.id}
                      technologies={featuredProject.technologies}
                    />
                  </div>

                  <div className="mt-7">
                    <ProjectAction
                      project={featuredProject}
                      buttonThemeProps={buttonThemeProps}
                    />
                  </div>
                </div>

                {featuredProject.image ? (
                  <div className="lg:col-span-6">
                    <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                      <img
                        src={featuredProject.image}
                        alt={`${featuredProject.title} preview`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.025]"
                      />
                    </div>
                  </div>
                ) : null}
              </article>
            </MagicCard>
          </BlurFade>
        ) : null}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {secondaryProjects.map((project, index) => (
            <BlurFade
              key={project.id}
              inView
              delay={0.1 + index * 0.06}
              offset={14}
              className="h-full"
            >
              <MagicCard
                className="h-full rounded-2xl"
                gradientColor={
                  isDark
                    ? 'rgba(96, 165, 250, 0.11)'
                    : 'rgba(37, 99, 235, 0.07)'
                }
                gradientFrom={isDark ? '#60a5fa' : '#3b82f6'}
                gradientTo={isDark ? '#93c5fd' : '#93c5fd'}
              >
                <article className="group/card flex h-full flex-col p-6">
                  {project.image ? (
                    <div className="mb-6 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        width={project.imageWidth}
                        height={project.imageHeight}
                        loading="lazy"
                        decoding="async"
                        className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.025]"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col">
                    {project.award ? (
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-[var(--accent-primary)] dark:text-[var(--accent-soft)]">
                          <Award className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{project.award}</span>
                        </span>
                      </div>
                    ) : project.tag ? (
                      <div className="mb-3">
                        <span className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)]">
                          {project.tag}
                        </span>
                      </div>
                    ) : null}

                    <h3 className="text-xl font-medium tracking-[-0.015em] text-[var(--ink-primary)]">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-[var(--ink-secondary)]">
                      {project.description}
                    </p>

                    <div className="mt-5">
                      <TechBadges
                        projectId={project.id}
                        technologies={project.technologies}
                      />
                    </div>

                    {project.websiteUrl || project.githubUrl ? (
                      <div className="mt-6 pt-2">
                        <ProjectAction
                          project={project}
                          buttonThemeProps={buttonThemeProps}
                        />
                      </div>
                    ) : null}
                  </div>
                </article>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
