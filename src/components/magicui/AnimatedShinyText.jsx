import { cn } from '@/lib/utils'

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) {
  return (
    <span
      style={{
        '--shiny-width': `${shimmerWidth}px`,
      }}
      className={cn(
        'animate-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',
        'bg-linear-to-r from-transparent via-black/85 via-50% to-transparent dark:via-white/90',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
