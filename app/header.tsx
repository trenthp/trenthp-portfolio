'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { Play, Pause, Eye, EyeOff, MoonIcon, SunIcon, Palette } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useBackground } from '@/lib/background-context'
import { useTheme } from 'next-themes'

const THEME_ORDER = ['dark', 'light', 'sepia', 'blue'] as const

const THEME_CONFIG = {
  dark: { label: 'Dark', icon: <MoonIcon className="h-4 w-4" /> },
  light: { label: 'Light', icon: <SunIcon className="h-4 w-4" /> },
  sepia: { label: 'Sepia', icon: <Palette className="h-4 w-4" /> },
  blue: { label: 'Blue', icon: <Palette className="h-4 w-4" /> },
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Handle 'system' theme or undefined by defaulting to 'dark'
  const effectiveTheme = (theme && THEME_ORDER.includes(theme as any)) ? theme : 'dark'
  const currentIndex = THEME_ORDER.indexOf(effectiveTheme as any)
  const nextIndex = (currentIndex + 1) % THEME_ORDER.length
  const nextTheme = THEME_ORDER[nextIndex]
  const currentConfig = THEME_CONFIG[effectiveTheme as keyof typeof THEME_CONFIG]
  const nextConfig = THEME_CONFIG[nextTheme]

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="inline-flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors duration-100 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 sepia:text-amber-700 sepia:hover:bg-amber-100 blue:text-blue-300 blue:hover:bg-blue-900"
      aria-label={`Theme: ${currentConfig?.label}. Click to cycle to ${nextConfig?.label}`}
      title={`Theme: ${currentConfig?.label}`}
    >
      {currentConfig?.icon}
    </button>
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
        <ThemeToggle />
      </div>
    </header>
  )
}
