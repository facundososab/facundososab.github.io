import { brandLogo, navItems } from '@/data'

export function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--bg-canvas)] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <img
              src={brandLogo}
              alt="Facundo Sosa logo"
              width="28"
              height="28"
              className="h-full w-full object-cover"
            />
          </span>
          <p className="m-0 text-sm text-[var(--ink-muted)]">
            &copy; {currentYear} Facundo Sosa Bianciotto. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="m-0 flex list-none flex-wrap items-center gap-5 p-0">
            <li>
              <a
                href="#hero"
                onClick={(e) => onNavigate(e, '#hero')}
                className="text-sm text-[var(--ink-muted)] no-underline transition-colors hover:text-[var(--ink-primary)]"
              >
                Top
              </a>
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => onNavigate(e, item.href)}
                  className="text-sm text-[var(--ink-muted)] no-underline transition-colors hover:text-[var(--ink-primary)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
