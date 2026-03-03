'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Lock, ExternalLink } from 'lucide-react'

const CORRECT_PASSWORD = 'valencia2026'

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: '2010', label: '2010' },
  { id: '2013', label: '2013' },
  { id: '2014', label: '2014' },
  { id: '2018', label: '2018' },
  { id: '2020', label: '2020' },
  { id: '2026', label: '2026' },
  { id: 'closing', label: '◆' },
] as const

// ─── Helpers ────────────────────────────────────────────────────────

function LinkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors"
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  )
}

function YearBadge({ year }: { year: string }) {
  return (
    <span className="mb-6 inline-block rounded-full bg-[#0032D2] px-4 py-1 text-lg font-bold text-[#E5EEFF]">
      {year}
    </span>
  )
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

// ─── Password Gate ──────────────────────────────────────────────────

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem('valencia-presentation-auth', 'true')
      onSuccess()
    } else {
      setError(true)
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  return (
    <div className="pres-bg flex min-h-screen w-full items-center justify-center p-4">
      <div
        className={`w-full max-w-sm ${isShaking ? 'animate-shake' : ''}`}
        style={{
          animation: isShaking ? 'shake 0.5s ease-in-out' : 'none',
        }}
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="pres-card mb-4 rounded-full p-4">
            <Lock className="h-8 w-8 opacity-70" />
          </div>
          <h1 className="text-xl font-medium">Protected Presentation</h1>
          <p className="mt-2 text-center text-sm opacity-50">
            Enter the password to view this presentation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            placeholder="Enter password"
            className={`pres-input w-full rounded-lg border px-4 py-3 outline-none transition-colors ${
              error ? '!border-red-500' : ''
            }`}
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-400">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="pres-submit w-full rounded-lg py-3 font-medium transition-colors"
          >
            View Presentation
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}

// ─── Timeline Rail ──────────────────────────────────────────────────

function TimelineRail({
  activeSection,
  onNodeClick,
}: {
  activeSection: string
  onNodeClick: (id: string) => void
}) {
  return (
    <nav className="fixed left-4 top-1/2 z-10 -translate-y-1/2 md:left-8">
      <div className="relative flex flex-col items-center gap-6">
        {/* Vertical connecting line */}
        <div className="pres-rail-line absolute inset-y-0 left-1/2 w-px -translate-x-1/2 md:left-auto md:right-auto" />

        {SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => onNodeClick(id)}
              className="group relative z-10 flex items-center gap-3 !bg-transparent"
              aria-label={`Scroll to ${label}`}
            >
              {/* Dot */}
              <div
                className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-[#E5EEFF] bg-[#0032D2] shadow-[0_0_8px_rgba(0,50,210,0.4)]'
                    : 'border-current bg-transparent opacity-30 group-hover:opacity-60'
                }`}
              />
              {/* Label — hidden on mobile */}
              <span
                className={`hidden text-xs font-medium transition-opacity duration-300 md:block ${
                  isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Section wrapper with whileInView animation ─────────────────────

function Section({
  id,
  children,
  sectionRef,
}: {
  id: string
  children: React.ReactNode
  sectionRef: (el: HTMLElement | null) => void
}) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className="flex min-h-screen items-center justify-center px-4 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-4xl"
      >
        {children}
      </motion.div>
    </section>
  )
}

// ─── Main Presentation ─────────────────────────────────────────────

function Presentation() {
  const [activeSection, setActiveSection] = useState<string>('intro')
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const setSectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) sectionRefs.current.set(id, el)
      else sectionRefs.current.delete(id)
    },
    [],
  )

  // Intersection Observer for active-node detection
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      {
        root: container,
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px',
      },
    )

    sectionRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current.get(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="pres-bg relative h-screen w-full">
      <TimelineRail activeSection={activeSection} onNodeClick={scrollToSection} />

      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto pl-16 md:pl-32"
      >
        {/* Intro */}
        <Section id="intro" sectionRef={setSectionRef('intro')}>
          <div className="flex flex-col items-center text-center">
            <a
              href="https://www.figma.com/board/AWQRVFve6BD67ewLqkGOdj/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-8 text-[10px] opacity-10 transition-opacity hover:opacity-30"
            >
              FigJam
            </a>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              Trent Holms Petersen
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              A Career Timeline in Design &amp; Technology
            </p>
            <p className="text-base opacity-40">2010 &ndash; 2026</p>
          </div>
        </Section>

        {/* 2010 — HUMINT */}
        <Section id="2010" sectionRef={setSectionRef('2010')}>
          <YearBadge year="2010" />
          <h2 className="mb-8 text-3xl font-bold md:text-5xl">HUMINT</h2>
          <div className="space-y-6">
            <div className="pres-card rounded-xl p-6">
              <p className="mb-3 font-medium">Interrogatives</p>
              <p>Who, what, when, where, how, else</p>
            </div>
            <div className="pres-card rounded-xl p-6">
              <p className="mb-3 font-medium">&ldquo;Why&rdquo; gets meta</p>
              <p>Art vs design. Ethics in design.</p>
            </div>
            <div className="pres-card rounded-xl p-6">
              <p className="mb-3 font-medium">People make things up</p>
              <p>
                Information quality &mdash; access, recency, motivation
              </p>
            </div>
          </div>
        </Section>

        {/* 2013 — The Gap */}
        <Section id="2013" sectionRef={setSectionRef('2013')}>
          <YearBadge year="2013" />
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">The Gap</h2>
          <div className="mb-6 max-w-2xl">
            <YouTubeEmbed videoId="4T7uKzmfPIg" />
          </div>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0032D2]" />
              Directing someone into a design (like AI, like blindfold maze game)
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0032D2]" />
              Learn how to learn / feel what learning feels like
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0032D2]" />
              The Gap: good taste vs ability to produce
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0032D2]" />
              100 students metaphor (quantity &gt; perfection)
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0032D2]" />
              The tools change, but taste + output win
            </li>
          </ul>
        </Section>

        {/* 2014 — First Portfolio */}
        <Section id="2014" sectionRef={setSectionRef('2014')}>
          <YearBadge year="2014" />
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">First Portfolio</h2>
          <div className="pres-card mb-6 rounded-xl p-6">
            <p className="mb-3 text-lg">
              &ldquo;This got me my first job.&rdquo;
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkPill href="https://trenthp.github.io/">First Portfolio</LinkPill>
              <LinkPill href="https://fisheragservice.com/">Fisher Ag Service</LinkPill>
              <LinkPill href="https://trenthp.github.io/redrover/">Red Rover</LinkPill>
            </div>
          </div>
          <div className="max-w-2xl">
            <YouTubeEmbed videoId="IXXKqwrEql4" />
          </div>
        </Section>

        {/* 2018 — Growth */}
        <Section id="2018" sectionRef={setSectionRef('2018')}>
          <YearBadge year="2018" />
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">Growth</h2>
          <div className="space-y-6">
            <div className="pres-card rounded-xl p-6">
              <p className="mb-3 text-lg">
                &ldquo;This got me my second job.&rdquo;
              </p>
              <LinkPill href="https://trenthp.github.io/portfolio/">Second Portfolio</LinkPill>
            </div>
            <div className="pres-card rounded-xl p-6">
              <p className="mb-3 font-medium">Key learning</p>
              <LinkPill href="https://busterbenson.com/piles/cognitive-biases">
                Cognitive Bias Cheat Sheet
              </LinkPill>
            </div>
          </div>
        </Section>

        {/* 2020 — Enterprise */}
        <Section id="2020" sectionRef={setSectionRef('2020')}>
          <YearBadge year="2020" />
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">Enterprise</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <LinkPill href="https://trenthp.com/">Current Portfolio</LinkPill>
              <LinkPill href="https://preview.webflow.com/preview/flavor-studio">
                Agency Work (Webflow)
              </LinkPill>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkPill href="https://www.figma.com/board/AWQRVFve6BD67ewLqkGOdj/">
                Samplings of Work (Figma)
              </LinkPill>
              <LinkPill href="https://trenthp.com/projects/optavia-app-store">
                App Store Turnaround
              </LinkPill>
            </div>
          </div>
        </Section>

        {/* 2026 — Now */}
        <Section id="2026" sectionRef={setSectionRef('2026')}>
          <YearBadge year="2026" />
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">Now</h2>
          <div className="space-y-4">
            <div className="pres-card rounded-xl p-6">
              <div className="mb-3 flex flex-wrap gap-3">
                <LinkPill href="https://groupnom.com/">Group Nom</LinkPill>
              </div>
            </div>
            <div className="pres-card rounded-xl p-6">
              <p className="mb-3 font-medium">Pilot Checklist</p>
              <video
                src="/images/projects/presentations/pilotChecklist.mp4"
                className="h-auto w-full max-w-[280px] rounded-xl"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="pres-card rounded-xl p-6">
              <div className="mb-3 flex flex-wrap gap-3">
                <LinkPill href="https://www.roblox.com/games/91452921356250/Scorch-tag">
                  Scorch Tag (Roblox)
                </LinkPill>
              </div>
            </div>
            <div className="pres-card rounded-xl p-6">
              <p className="mb-3">
                &ldquo;Mix of strategy, design, and code. I help teams make things real.&rdquo;
              </p>
              <LinkPill href="https://madcatter.studio/">Mad Catter Studio</LinkPill>
            </div>
          </div>
        </Section>

        {/* Closing — The Printing Press */}
        <Section id="closing" sectionRef={setSectionRef('closing')}>
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-8 text-3xl font-bold md:text-5xl">
              The Printing Press
            </h2>
            <div className="space-y-8 text-xl">
              <p>
                Before the printing press, people handjammed each book. Transcribers would
                doodle in the margins with beautiful flourishes or important notes.
              </p>
              <p>
                After the printing press, books became cheaper to produce at scale. Those who
                doodled in the margins found themselves{' '}
                <strong>a niche instead of the standard</strong>.
              </p>
              <p className="text-2xl font-medium">
                We who were once handjammers, who like to doodle, are now handed a printing
                press. The most interesting thing will be what this enables us to do.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}

// ─── Page Export ─────────────────────────────────────────────────────

export default function ValenciaPresentation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem('valencia-presentation-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="pres-bg flex min-h-screen items-center justify-center">
        <div className="pres-spinner h-8 w-8 animate-spin rounded-full border-2" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />
  }

  return <Presentation />
}
