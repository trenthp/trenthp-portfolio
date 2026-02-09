'use client'
import Link from 'next/link'
import { Pause, Eye, EyeOff, MoonIcon, SunIcon, Palette } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useBackground } from '@/lib/background-context'
import { useTheme } from 'next-themes'

const THEME_ORDER = ['dark', 'light', 'sepia', 'blue'] as const
type ThemeName = typeof THEME_ORDER[number]

const THEME_CONFIG = {
  dark: { label: 'Dark', icon: <SunIcon className="h-4 w-4" /> },
  light: { label: 'Light', icon: <Palette className="h-4 w-4" /> },
  sepia: { label: 'Sepia', icon: <Palette className="h-4 w-4" /> },
  blue: { label: 'Blue', icon: <MoonIcon className="h-4 w-4" /> },
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
  const effectiveTheme = (theme && THEME_ORDER.includes(theme as ThemeName)) ? theme as ThemeName : 'dark'
  const currentIndex = THEME_ORDER.indexOf(effectiveTheme)
  const nextIndex = (currentIndex + 1) % THEME_ORDER.length
  const nextTheme = THEME_ORDER[nextIndex]
  const currentConfig = THEME_CONFIG[effectiveTheme as keyof typeof THEME_CONFIG]
  const nextConfig = THEME_CONFIG[nextTheme]

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors duration-100 text-zinc-900 hover:bg-gray-300 dark:text-zinc-100 dark:hover:bg-gray-900 sepia:text-amber-900 sepia:hover:bg-amber-300 blue:text-blue-100 blue:hover:bg-blue-700"
      aria-label={`Theme: ${currentConfig?.label}. Click to cycle to ${nextConfig?.label}`}
      title={`Theme: ${currentConfig?.label}`}
    >
      {currentConfig?.icon}
    </button>
  )
}

type StarMode = 'moving' | 'paused' | 'off'

const STAR_MODES = [
  {
    label: 'Stars Moving',
    id: 'moving' as StarMode,
    icon: <Pause className="h-4 w-4" />,
  },
  {
    label: 'Stars Paused',
    id: 'paused' as StarMode,
    icon: <EyeOff className="h-4 w-4" />,
  },
  {
    label: 'No Stars',
    id: 'off' as StarMode,
    icon: <Eye className="h-4 w-4" />,
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
      onClick={() => setStarMode(nextMode.id)}
      className="inline-flex h-7 w-7 items-center justify-center rounded transition-colors duration-100 text-zinc-900 hover:bg-gray-300 dark:text-zinc-100 dark:hover:bg-gray-900 sepia:text-amber-900 sepia:hover:bg-amber-300 blue:text-blue-100 blue:hover:bg-blue-700"
      aria-label={`Stars: ${currentMode?.label}. Click to cycle to ${nextMode?.label}`}
      title={`Stars: ${currentMode?.label}`}
    >
      {currentMode?.icon}
    </button>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-4 z-50 px-4 py-3 mb-8 flex flex-col-reverse items-end gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-24 transition-all duration-300 ${scrolled ? 'glass-header' : ''}`}>
      <div className="flex items-start gap-4 sm:items-center">
        <Link href="/" className={`flex-shrink-0 transition-all duration-300 ${scrolled ? 'h-10 w-10' : 'h-16 w-16'}`}>
          <img
            src="/images/trent_circle.png"
            alt="Trent Holms Petersen"
            className={`rounded-full transition-all duration-300 ${scrolled ? 'h-10 w-10' : 'h-16 w-16'}`}
          />
        </Link>
        <div>
          <Link href="/" className="font-medium header-link">
            Trent Holms Petersen
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <StarsControl />
        <ThemeToggle />
      </div>
    </header>
  )
}
