'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { TextLoop } from '@/components/ui/text-loop'
import { MonitorIcon, MoonIcon, SunIcon, Play, Pause, Eye, EyeOff } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useBackground } from '@/lib/background-context'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-4 w-4" />,
  },
]

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AnimatedBackground
      className="pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800"
      defaultValue={theme}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChange={(id) => {
        setTheme(id as string)
      }}
    >
      {THEMES_OPTIONS.map((theme) => {
        return (
          <button
            key={theme.id}
            className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
            type="button"
            aria-label={`Switch to ${theme.label} theme`}
            data-id={theme.id}
          >
            {theme.icon}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}

function MotionToggle() {
  const [mounted, setMounted] = useState(false)
  const { motionEnabled, setMotionEnabled } = useBackground()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setMotionEnabled(!motionEnabled)}
      className="inline-flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors duration-100 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      aria-label={motionEnabled ? 'Pause motion' : 'Play motion'}
      title={motionEnabled ? 'Pause motion' : 'Play motion'}
    >
      {motionEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </button>
  )
}

function StarsToggle() {
  const [mounted, setMounted] = useState(false)
  const { starsVisible, setStarsVisible } = useBackground()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setStarsVisible(!starsVisible)}
      className="inline-flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors duration-100 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      aria-label={starsVisible ? 'Hide stars' : 'Show stars'}
      title={starsVisible ? 'Hide stars' : 'Show stars'}
    >
      {starsVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
    </button>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <TextLoop className="text-xs text-zinc-500">
            <span>© 2025 Trent Holms Petersen.</span>
            <span>Designed in Next.js & React.</span>
          </TextLoop>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <MotionToggle />
          <StarsToggle />
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
