'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { Play, Pause, Eye, EyeOff, MoonIcon, SunIcon, Palette } from 'lucide-react'
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
    label: 'Sepia',
    id: 'sepia',
    icon: <Palette className="h-4 w-4" />,
  },
  {
    label: 'Blue',
    id: 'blue',
    icon: <Palette className="h-4 w-4" />,
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
      {THEMES_OPTIONS.map((themeOption) => {
        return (
          <button
            key={themeOption.id}
            className="inline-flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50"
            type="button"
            aria-label={`Switch to ${themeOption.label} theme`}
            data-id={themeOption.id}
          >
            {themeOption.icon}
          </button>
        )
      })}
    </AnimatedBackground>
  )
}

const STAR_MODES = [
  {
    label: 'Stars Moving',
    id: 'moving',
    icon: <Play className="h-4 w-4" />,
  },
  {
    label: 'Stars Paused',
    id: 'paused',
    icon: <Pause className="h-4 w-4" />,
  },
  {
    label: 'No Stars',
    id: 'off',
    icon: <EyeOff className="h-4 w-4" />,
  },
]

function StarsControl() {
  const [mounted, setMounted] = useState(false)
  const { starMode, setStarMode } = useBackground()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentMode = STAR_MODES.find((m) => m.id === starMode)
  const currentIndex = STAR_MODES.findIndex((m) => m.id === starMode)
  const nextIndex = (currentIndex + 1) % STAR_MODES.length
  const nextMode = STAR_MODES[nextIndex]

  return (
    <button
      onClick={() => setStarMode(nextMode.id as any)}
      className="inline-flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors duration-100 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      aria-label={`Stars: ${currentMode?.label}. Click to cycle to ${nextMode?.label}`}
      title={`Stars: ${currentMode?.label}`}
    >
      {currentMode?.icon}
    </button>
  )
}

export function Header() {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          Product Design Leader | Leading AI-empowered designers, Building Immersive, Intelligent Applications
        </TextEffect>
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <StarsControl />
        <ThemeSwitch />
      </div>
    </header>
  )
}
