import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle2, AlertCircle, Send } from 'lucide-react'
import Plasma from '@/components/reactbits/Plasma'
import SpecularButton from '@/components/reactbits/SpecularButton'
import { BlurFade } from '@/components/magicui/BlurFade'
import { MagicCard } from '@/components/magicui/MagicCard'
import { cn } from '@/lib/utils'

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

export function ContactSection({ theme }) {
  const formRef = useRef(null)
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
    if (formState !== 'success' && formState !== 'error') {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      setFormState('idle')
    }, 3000)

    return () => window.clearTimeout(timeout)
  }, [formState])

  const charCount = formData.message.length
  const isDark = theme === 'dark'

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

    if (!firstInvalidKey) return

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

  const showSuccess = formState === 'success'
  const showError = formState === 'error'
  const showLoader = formState === 'loading'

  const inputBaseClass =
    'w-full rounded-xl border bg-[var(--bg-surface)] px-4 py-3 text-[0.9375rem] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] outline-none transition-colors focus:border-[var(--accent-primary)]'

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--bg-canvas)] px-5 py-20 sm:px-6 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Plasma
          color={isDark ? '#3b82f6' : '#2563eb'}
          speed={0.55}
          direction="forward"
          scale={1.15}
          twist={0.85}
          wave={0.8}
          softness={0.72}
          shine={0.75}
          brightness={isDark ? 0.6 : 0.8}
          grain={0.03}
          quality={0.7}
          fade={0.36}
          opacity={isDark ? 0.45 : 0.22}
          lightMode={!isDark}
          dpr={1.5}
          mouseInteractive
        />
        <div className="stage-vignette absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-[660px]">
        <BlurFade inView delay={0.05} offset={10}>
          <div className="mb-8 text-center">
            <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink-primary)]">
              Contact
            </h2>
            <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-[var(--ink-secondary)]">
              Have a system to design, an architectural challenge, or an
              opportunity to collaborate? Send a message directly.
            </p>
          </div>
        </BlurFade>

            <BlurFade inView delay={0.12} offset={14}>
              <MagicCard
                className="rounded-2xl shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]"
                surfaceClassName="bg-[var(--bg-frosted)] backdrop-blur-xl"
                gradientColor={
                  isDark
                    ? 'rgba(96, 165, 250, 0.12)'
                    : 'rgba(37, 99, 235, 0.08)'
                }
                gradientFrom={isDark ? '#60a5fa' : '#3b82f6'}
                gradientTo={isDark ? '#93c5fd' : '#93c5fd'}
              >
                <form
                  id="contact-form"
                  ref={formRef}
                  className="space-y-5 p-6 sm:p-8"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-[var(--ink-primary)]"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name…"
                      value={formData.name}
                      onChange={handleInputChange}
                      aria-invalid={submitAttempted && !validation.name}
                      required
                      className={cn(
                        inputBaseClass,
                        submitAttempted && !validation.name
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-[var(--border-subtle)]',
                      )}
                    />
                    {submitAttempted && !validation.name ? (
                      <p className="mt-1.5 text-xs text-red-500">
                        Please enter your name.
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[var(--ink-primary)]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      spellCheck={false}
                      placeholder="name@company.com…"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={submitAttempted && !validation.email}
                      required
                      className={cn(
                        inputBaseClass,
                        submitAttempted && !validation.email
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-[var(--border-subtle)]',
                      )}
                    />
                    {submitAttempted && !validation.email ? (
                      <p className="mt-1.5 text-xs text-red-500">
                        Please enter a valid email address.
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-[var(--ink-primary)]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      autoComplete="off"
                      placeholder="Your message…"
                      value={formData.message}
                      onChange={handleInputChange}
                      aria-invalid={submitAttempted && !validation.message}
                      required
                      maxLength={255}
                      className={cn(
                        inputBaseClass,
                        'resize-y',
                        submitAttempted && !validation.message
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-[var(--border-subtle)]',
                      )}
                    />
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      {submitAttempted && !validation.message ? (
                        <p className="text-xs text-red-500">
                          Please enter a message with up to 255 characters.
                        </p>
                      ) : (
                        <span />
                      )}
                      <span
                        id="charCount"
                        className="font-mono text-xs text-[var(--ink-muted)]"
                      >
                        {charCount} / 255
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <SpecularButton
                      type="submit"
                      id="submit-btn"
                      size="md"
                      radius={999}
                      disabled={showLoader}
                      tint={isDark ? '#ffffff' : '#121212'}
                      tintOpacity={isDark ? 0.08 : 0.92}
                      textColor={isDark ? '#fafafa' : '#fdfff7'}
                      lineColor={isDark ? '#93c5fd' : '#60a5fa'}
                      baseColor={isDark ? '#3f3f46' : '#27272a'}
                      className="w-full sm:w-auto"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>{showLoader ? 'Sending…' : 'Send message'}</span>
                    </SpecularButton>
                  </div>

                  <div aria-live="polite">
                    {showSuccess ? (
                      <p
                        id="form-success"
                        className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Your message has been sent successfully.</span>
                      </p>
                    ) : null}

                    {showError ? (
                      <p
                        id="form-error"
                        className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>
                          There was an error sending your message. Please try
                          again later.
                        </span>
                      </p>
                    ) : null}
                  </div>
                </form>
              </MagicCard>
            </BlurFade>
      </div>
    </section>
  )
}
