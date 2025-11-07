'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type StarMode = 'moving' | 'paused' | 'off'

interface BackgroundContextType {
  starMode: StarMode
  setStarMode: (mode: StarMode) => void
  // Legacy compatibility getters
  motionEnabled: boolean
  starsVisible: boolean
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined)

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [starMode, setStarMode] = useState<StarMode>('moving')
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedStarMode = localStorage.getItem('starMode')

    if (savedStarMode !== null && ['moving', 'paused', 'off'].includes(savedStarMode)) {
      setStarMode(savedStarMode as StarMode)
    }
    setMounted(true)
  }, [])

  // Save to localStorage when values change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('starMode', starMode)
    }
  }, [starMode, mounted])

  // Compute legacy values for starfield component compatibility
  const motionEnabled = starMode === 'moving'
  const starsVisible = starMode !== 'off'

  return (
    <BackgroundContext.Provider value={{ starMode, setStarMode, motionEnabled, starsVisible }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export function useBackground() {
  const context = useContext(BackgroundContext)
  if (context === undefined) {
    throw new Error('useBackground must be used within BackgroundProvider')
  }
  return context
}
