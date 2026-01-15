'use client'

import { useState, useEffect } from 'react'
import { SlideDeck, Slide, useSlideNavigation } from '@/components/slide-deck'
import { ImageLightbox } from '@/components/image-lightbox'
import { Lock } from 'lucide-react'

const CORRECT_PASSWORD = 'meta2025'

// Slide indices for navigation
const OPTAVIA_SLIDE_INDEX = 2
const GROUPNOM_SLIDE_INDEX = 8

function ClosingSlideContent() {
  const { goToSlide } = useSlideNavigation()

  return (
    <div className="flex max-w-4xl flex-col items-center text-center">
      <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl">
        Two Sides of My Experience
      </h2>
      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <button
          onClick={() => goToSlide(OPTAVIA_SLIDE_INDEX)}
          className="group rounded-xl bg-white/5 p-8 text-left transition-all hover:bg-white/10"
        >
          <p className="mb-4 text-xl font-medium text-white">OPTAVIA</p>
          <p className="text-white/60">Proven results when stakes are high</p>
          <p className="mt-4 text-sm text-white/40 transition-colors group-hover:text-white/60">
            Click to revisit &rarr;
          </p>
        </button>
        <button
          onClick={() => goToSlide(GROUPNOM_SLIDE_INDEX)}
          className="group rounded-xl bg-white/5 p-8 text-left transition-all hover:bg-white/10"
        >
          <p className="mb-4 text-xl font-medium text-white">Group Nom</p>
          <p className="text-white/60">Actively learning what comes next</p>
          <p className="mt-4 text-sm text-white/40 transition-colors group-hover:text-white/60">
            Click to revisit &rarr;
          </p>
        </button>
      </div>
      <p className="text-xl text-white/70">
        Meta is building that &ldquo;what comes next.&rdquo;
      </p>
      <p className="mt-4 text-xl text-white">
        I want to be part of it.
      </p>
      <p className="mt-12 text-white/50">
        Happy to dive deeper on anything.
      </p>
    </div>
  )
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem('meta-presentation-auth', 'true')
      onSuccess()
    } else {
      setError(true)
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#111111] p-4">
      <div
        className={`w-full max-w-sm ${isShaking ? 'animate-shake' : ''}`}
        style={{
          animation: isShaking ? 'shake 0.5s ease-in-out' : 'none',
        }}
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 rounded-full bg-white/10 p-4">
            <Lock className="h-8 w-8 text-white/70" />
          </div>
          <h1 className="text-xl font-medium text-white">Protected Presentation</h1>
          <p className="mt-2 text-center text-sm text-white/50">
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
            className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-white/50 ${
              error ? 'border-red-500' : 'border-white/10'
            }`}
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-400">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-white py-3 font-medium text-[#111111] transition-colors hover:bg-white/90"
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

export default function MetaPresentation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem('meta-presentation-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111111]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <SlideDeck>
      {/* Title Slide */}
      <Slide>
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/trent_circle.png"
            alt="Trent Holms Petersen"
            className="mb-8 h-32 w-32 rounded-full"
          />
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Trent Holms Petersen
          </h1>
          <p className="mb-6 text-xl text-white/70 md:text-2xl">
            Product Design Leader Who Codes
          </p>
          <p className="max-w-2xl text-lg text-white/50">
            12+ years leading teams and shipping B2C/B2B products with an AI-native approach to strategy, design, and development.
          </p>
        </div>
      </Slide>

      {/* Thesis Slide */}
      <Slide>
        <div className="flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl">
            The Question I&apos;m Obsessed With
          </h2>
          <p className="text-2xl leading-relaxed text-white/80 md:text-3xl">
            &ldquo;What happens to our craft when AI can do the busy work?&rdquo;
          </p>
          <div className="mt-12 flex flex-col gap-4 text-left text-lg text-white/60">
            <p>Two stories that represent both sides:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li><strong className="text-white/80">OPTAVIA</strong> &mdash; Proven results at scale</li>
              <li><strong className="text-white/80">Group Nom</strong> &mdash; Active learning on the frontier</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* Case Study 1: OPTAVIA - Context */}
      <Slide>
        <div className="flex max-w-5xl flex-col items-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            Case Study 1
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl">
            App Store Turnaround
          </h2>
          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <ImageLightbox
                src="/images/projects/presentations/optavia_appStore_before.png"
                alt="OPTAVIA app before - 2.3 stars"
                className="mb-4 h-auto w-full max-w-[280px] rounded-xl"
              />
              <p className="text-2xl font-bold text-red-400">2.3 Stars</p>
              <p className="text-white/60">Before</p>
            </div>
            <div className="flex flex-col items-center">
              <ImageLightbox
                src="/images/projects/presentations/optavia_appStore_after.png"
                alt="OPTAVIA app after - 4.7+ stars"
                className="mb-4 h-auto w-full max-w-[280px] rounded-xl"
              />
              <p className="text-2xl font-bold text-green-400">4.7+ Stars</p>
              <p className="text-white/60">After</p>
            </div>
          </div>
          <p className="text-lg text-white/70">
            OPTAVIA &bull; Director of UX Product Design
          </p>
        </div>
      </Slide>

      {/* OPTAVIA - The Problem */}
      <Slide>
        <div className="flex max-w-4xl flex-col">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            The People Problem
          </p>
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            The App Was Solving the Wrong Problem
          </h2>
          <div className="space-y-6 text-lg text-white/70">
            <p>
              <strong className="text-white">B2B2C complexity:</strong> Coaches recruit clients, clients buy consumables, coaches get paid from proceeds.
            </p>
            <p>
              <strong className="text-white">The legacy behavior:</strong> Coaches placed orders on behalf of clients &mdash; legally problematic, clients cut off from information.
            </p>
            <p>
              <strong className="text-white">The agency solution:</strong> Built an ecommerce app assuming clients would self-serve.
            </p>
            <p>
              <strong className="text-white">The reality:</strong> App went unused. Coaches had no reason to change &mdash; it didn&apos;t solve their problems.
            </p>
          </div>
        </div>
      </Slide>

      {/* OPTAVIA - The Pivot */}
      <Slide>
        <div className="flex max-w-4xl flex-col">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            The Strategic Pivot
          </p>
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            Research Revealed the Real Opportunity
          </h2>
          <div className="space-y-6 text-lg text-white/70">
            <div className="rounded-xl bg-white/5 p-6">
              <p className="mb-2 font-medium text-white">Discovery</p>
              <p>Led research: app reviews, coach interviews, client interviews. The ecommerce problems needed to be fixed on web first, with coaches.</p>
            </div>
            <div className="rounded-xl bg-white/5 p-6">
              <p className="mb-2 font-medium text-white">Pivot Decision</p>
              <p>Changed app direction from ecommerce to <strong className="text-white">healthy habit tracking</strong> &mdash; digitizing the textbook-based program.</p>
            </div>
            <div className="rounded-xl bg-white/5 p-6">
              <p className="mb-2 font-medium text-white">Why This Worked</p>
              <p>Delivered real value to clients immediately, while buying time to fix the upstream problems.</p>
            </div>
          </div>
        </div>
      </Slide>

      {/* OPTAVIA - The Complexity */}
      <Slide>
        <div className="flex max-w-6xl flex-col md:flex-row md:items-center md:gap-12">
          <div className="flex-1">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
              The Design Challenge
            </p>
            <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
              Making Complexity Feel Simple
            </h2>
            <div className="space-y-3 text-base text-white/70">
              <p className="text-white/50">The meal tracking system had to account for:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li><strong className="text-white">6 meals per day</strong> &mdash; double the typical pattern</li>
                <li><strong className="text-white">Multiple product types</strong> &mdash; Fuelings vs. Lean & Green</li>
                <li><strong className="text-white">Variable servings</strong> &mdash; home-cooked meals for families</li>
                <li><strong className="text-white">Timed intervals</strong> &mdash; customizable eating schedules</li>
                <li><strong className="text-white">Reminders</strong> &mdash; clients forget to eat on restrictive programs</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex-1 md:mt-0">
            <ImageLightbox
              src="/images/projects/appScreens@2x.png"
              alt="OPTAVIA app screens showing meal tracking interface"
              className="h-auto w-full max-w-[400px] rounded-xl"
            />
          </div>
        </div>
      </Slide>

      {/* OPTAVIA - Results */}
      <Slide>
        <div className="flex max-w-6xl flex-col items-center md:flex-row md:gap-12">
          <div className="flex-1">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
              Results
            </p>
            <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
              Measurable Impact
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-3xl font-bold text-green-400">+35%</p>
                <p className="mt-1 text-sm text-white/60">User Retention</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-3xl font-bold text-green-400">+40%</p>
                <p className="mt-1 text-sm text-white/60">Daily Active Users</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-3xl font-bold text-green-400">-75%</p>
                <p className="mt-1 text-sm text-white/60">UX Support Tickets</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-3xl font-bold text-green-400">4.7+</p>
                <p className="mt-1 text-sm text-white/60">App Store Rating</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex-1 md:mt-0">
            <video
              src="/images/projects/presentations/optavia_walkthrough.mp4"
              className="h-auto w-full max-w-[300px] rounded-xl"
              autoPlay
              loop
              muted
              playsInline
            />
            <p className="mt-2 text-center text-sm text-white/40">App walkthrough</p>
          </div>
        </div>
      </Slide>

      {/* OPTAVIA - Reflection */}
      <Slide>
        <div className="flex max-w-4xl flex-col">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            Reflection
          </p>
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            What I&apos;d Do Differently
          </h2>
          <div className="rounded-xl bg-white/5 p-8">
            <p className="text-xl leading-relaxed text-white/80">
              Internal storytelling. I learned too late that more effective communication of user pain &mdash; translating issues into business language &mdash; would have unlocked broader support and quicker access to quality development resources.
            </p>
          </div>
        </div>
      </Slide>

      {/* Case Study 2: Group Nom - Intro */}
      <Slide>
        <div className="flex max-w-4xl flex-col">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            Case Study 2
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-5xl">
            Group Nom
          </h2>
          <p className="mb-8 text-xl text-white/70">
            Learning &ldquo;Product Production&rdquo; in the AI Era
          </p>
          <div className="rounded-xl bg-white/5 p-6">
            <p className="text-lg text-white/70">
              After OPTAVIA, I asked: <strong className="text-white">if AI can accelerate every part of product work, what does that mean for product designers?</strong>
            </p>
          </div>
          <p className="mt-6 text-white/50">
            Group Nom became my vehicle for finding out.
          </p>
        </div>
      </Slide>

      {/* Group Nom - The Product */}
      <Slide>
        <div className="flex max-w-6xl flex-col md:flex-row md:items-center md:gap-12">
          <div className="flex-1">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
              The Product
            </p>
            <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
              Solving &ldquo;Where Should We Eat?&rdquo;
            </h2>
            <div className="space-y-4 text-base text-white/70">
              <p>
                <strong className="text-white">The problem:</strong> Every friend group knows the endless back-and-forth of rejected suggestions and decision paralysis.
              </p>
              <div className="rounded-xl bg-white/5 p-4">
                <p className="mb-3 font-medium text-white">The solution:</p>
                <ul className="ml-5 list-disc space-y-1">
                  <li>Create a session, share a link or code</li>
                  <li>Swipe together on nearby restaurants</li>
                  <li>Match instantly when everyone agrees</li>
                </ul>
              </div>
              <p className="text-white/50">
                No app download. No sign-up friction.
              </p>
            </div>
          </div>
          <div className="mt-8 flex-1 md:mt-0">
            <video
              src="/images/projects/presentations/groupnom_walkthrough.mp4"
              className="mx-auto h-auto w-full max-w-[280px] rounded-xl"
              autoPlay
              loop
              muted
              playsInline
            />
            <p className="mt-2 text-center text-sm text-white/40">Live at groupnom.com</p>
          </div>
        </div>
      </Slide>

      {/* Group Nom - The Journey */}
      <Slide>
        <div className="flex max-w-4xl flex-col">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            The AI Journey
          </p>
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            From Basic HTML to Full-Stack App
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <div className="h-2 w-2 rounded-full bg-white/30" />
              <p className="text-white/70">Started with basic HTML/CSS/JS, limited database knowledge</p>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <p className="text-white/70">No/low-code tools (Lovable, Bubble) &mdash; too limited</p>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <div className="h-2 w-2 rounded-full bg-white/50" />
              <p className="text-white/70">Gemini 2/2.5 &mdash; vibe coding began</p>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <p className="text-white/70">v0 + Vercel integrations &mdash; expanded possibilities</p>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">
              <div className="h-2 w-2 rounded-full bg-white" />
              <p className="text-white"><strong>Claude Code</strong> &mdash; rounded out the workflow</p>
            </div>
          </div>
        </div>
      </Slide>

      {/* Group Nom - What Became Possible */}
      <Slide>
        <div className="flex max-w-6xl flex-col">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            What Became Possible
          </p>
          <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
            Things I Couldn&apos;t Have Built Before
          </h2>
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="mb-1 text-sm font-medium text-white">Backend & APIs</p>
              <p className="text-xs text-white/60">Real-time sessions, data layer</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="mb-1 text-sm font-medium text-white">Database</p>
              <p className="text-xs text-white/60">Owned data system</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="mb-1 text-sm font-medium text-white">Frontend</p>
              <p className="text-xs text-white/60">Complex state, animations</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="mb-1 text-sm font-medium text-white">Brand System</p>
              <p className="text-xs text-white/60">Identity, typography</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <ImageLightbox src="/images/projects/groupNom/groupNom_slide-1.png" alt="Group Nom brand" className="rounded-lg" />
            <ImageLightbox src="/images/projects/groupNom/groupNom_slide-3.png" alt="Group Nom colors" className="rounded-lg" />
            <ImageLightbox src="/images/projects/groupNom/groupNom_slide-4.png" alt="Group Nom typography" className="rounded-lg" />
            <ImageLightbox src="/images/projects/groupNom/groupNom_slide-5.png" alt="Group Nom app screens" className="rounded-lg" />
          </div>
          <p className="mt-4 text-center text-sm text-white/50">
            Solo builder: product design, branding, development, marketing.
          </p>
        </div>
      </Slide>

      {/* Group Nom - Process Change */}
      <Slide>
        <div className="flex max-w-4xl flex-col">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            How My Process Changed
          </p>
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            New Ways of Working
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-4 font-medium text-red-400">Before</p>
              <ul className="space-y-2 text-white/60">
                <li>Figma for wireframes + prototypes</li>
                <li>Handoffs to engineering</li>
                <li>Long feedback loops</li>
                <li>&ldquo;As-if&rdquo; prototypes for testing</li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-medium text-green-400">Now</p>
              <ul className="space-y-2 text-white/60">
                <li>Figma for visual design only</li>
                <li>FigJam for mapping & planning</li>
                <li>Git workflows for production</li>
                <li>Real prototypes that become the product</li>
              </ul>
            </div>
          </div>
        </div>
      </Slide>

      {/* Group Nom - Human Judgment */}
      <Slide>
        <div className="flex max-w-4xl flex-col">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            Where Human Judgment Remains Essential
          </p>
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            AI Accelerates Execution. Direction Still Requires Critical Thinking.
          </h2>
          <div className="space-y-6 text-lg text-white/70">
            <p>
              <strong className="text-white">Knowing what matters</strong> &mdash; what&apos;s required, what&apos;s desired, what can wait
            </p>
            <p>
              <strong className="text-white">Diagnosing problems</strong> &mdash; gas stations and barber shops in results (API/search logic issues)
            </p>
            <p>
              <strong className="text-white">User feedback loops</strong> &mdash; invite code sharing wasn&apos;t discoverable enough
            </p>
            <p className="rounded-xl bg-white/5 p-6 text-xl">
              &ldquo;The only limitations are our ability to understand what our goals are and understand the concepts which connect together to make it real.&rdquo;
            </p>
          </div>
        </div>
      </Slide>

      {/* Paradigm Shift */}
      <Slide>
        <div className="flex max-w-4xl flex-col items-center text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            The Paradigm Shift
          </p>
          <h2 className="mb-8 text-2xl font-bold text-white md:text-4xl">
            The Printing Press Metaphor
          </h2>
          <div className="space-y-8 text-xl text-white/70">
            <p>
              Before the printing press, people handjammed each book. Transcribers would doodle in the margins with beautiful flourishes or important notes.
            </p>
            <p>
              After the printing press, books became cheaper to produce at scale. Those who doodled in the margins found themselves <strong className="text-white">a niche instead of the standard</strong>.
            </p>
            <p className="text-2xl font-medium text-white">
              We who were once handjammers, who like to doodle, are now handed a printing press. The most interesting thing will be what this enables us to do.
            </p>
          </div>
        </div>
      </Slide>

      {/* Closing Slide */}
      <Slide>
        <ClosingSlideContent />
      </Slide>
    </SlideDeck>
  )
}
