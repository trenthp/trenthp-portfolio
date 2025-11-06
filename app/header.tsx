'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { Play, Pause, Eye, EyeOff, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useBackground } from '@/lib/background-context'
import { useTheme } from 'next-themes'
import { AnimatedBackground } from '@/components/ui/animated-background'

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

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Trent Holms Petersen
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Product Design Director
        </TextEffect>
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <MotionToggle />
        <StarsToggle />
        <ThemeSwitch />
      </div>
    </header>
  )
}
