'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface BackgroundContextType {
  motionEnabled: boolean
  setMotionEnabled: (enabled: boolean) => void
  starsVisible: boolean
  setStarsVisible: (visible: boolean) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined)

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [motionEnabled, setMotionEnabled] = useState(true)
  const [starsVisible, setStarsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedMotion = localStorage.getItem('motion')
    const savedStars = localStorage.getItem('stars')

    if (savedMotion !== null) {
      setMotionEnabled(savedMotion === 'enabled')
    }
    if (savedStars !== null) {
      setStarsVisible(savedStars === 'visible')
    }
    setMounted(true)
  }, [])

  // Save to localStorage when values change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('motion', motionEnabled ? 'enabled' : 'disabled')
    }
  }, [motionEnabled, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('stars', starsVisible ? 'visible' : 'hidden')
    }
  }, [starsVisible, mounted])

  return (
    <BackgroundContext.Provider value={{ motionEnabled, setMotionEnabled, starsVisible, setStarsVisible }}>
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
