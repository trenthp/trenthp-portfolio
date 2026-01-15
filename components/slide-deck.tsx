'use client'

import { useState, useEffect, useCallback, useRef, ReactNode, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Context for slide navigation
interface SlideContextType {
  goToSlide: (index: number) => void
  currentSlide: number
  totalSlides: number
}

const SlideContext = createContext<SlideContextType | null>(null)

export function useSlideNavigation() {
  const context = useContext(SlideContext)
  if (!context) {
    throw new Error('useSlideNavigation must be used within a SlideDeck')
  }
  return context
}

interface SlideProps {
  children: ReactNode
  className?: string
}

export function Slide({ children, className = '' }: SlideProps) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center p-8 md:p-16 ${className}`}>
      {children}
    </div>
  )
}

interface SlideDeckProps {
  children: ReactNode[]
  className?: string
}

// Base width for scaling calculations (typical laptop width)
const BASE_WIDTH = 1440
// Threshold above which scaling kicks in
const SCALE_THRESHOLD = 1920

export function SlideDeck({ children, className = '' }: SlideDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<number>(0)
  const touchEndRef = useRef<number>(0)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const totalSlides = children.length

  // Calculate scale for large screens
  useEffect(() => {
    const calculateScale = () => {
      const width = window.innerWidth
      if (width > SCALE_THRESHOLD) {
        // Scale proportionally above the threshold
        // Max scale of 2x to prevent things getting too large
        const newScale = Math.min(width / BASE_WIDTH, 2)
        setScale(newScale)
      } else {
        setScale(1)
      }
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
    }
  }, [currentSlide, totalSlides])

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1)
      setCurrentSlide(prev => prev + 1)
    }
  }, [currentSlide, totalSlides])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(prev => prev - 1)
    }
  }, [currentSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToSlide(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goToSlide(totalSlides - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, totalSlides])

  // Scroll/wheel navigation with debounce
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isScrollingRef.current) return

      const threshold = 50
      if (Math.abs(e.deltaY) > threshold || Math.abs(e.deltaX) > threshold) {
        isScrollingRef.current = true

        if (e.deltaY > 0 || e.deltaX > 0) {
          nextSlide()
        } else {
          prevSlide()
        }

        // Debounce scroll events
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false
        }, 500)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [nextSlide, prevSlide])

  // Touch swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeThreshold = 50
    const diff = touchStartRef.current - touchEndRef.current

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  const contextValue = {
    goToSlide,
    currentSlide,
    totalSlides,
  }

  return (
    <SlideContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={`relative h-screen w-screen overflow-hidden bg-[#111111] ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
              }}
              className="h-full w-full"
            >
              {children[currentSlide]}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white/70"
          style={{
            left: `${1 * scale}rem`,
            padding: `${0.75 * scale}rem`,
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft style={{ width: `${1.5 * scale}rem`, height: `${1.5 * scale}rem` }} />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:hover:bg-white/10 disabled:hover:text-white/70"
          style={{
            right: `${1 * scale}rem`,
            padding: `${0.75 * scale}rem`,
          }}
          aria-label="Next slide"
        >
          <ChevronRight style={{ width: `${1.5 * scale}rem`, height: `${1.5 * scale}rem` }} />
        </button>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-white/10"
          style={{ height: `${0.25 * scale}rem` }}
        >
          <motion.div
            className="h-full bg-white/70"
            initial={false}
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Slide counter */}
        <div
          className="absolute z-10 rounded-full bg-white/10 text-white/70 backdrop-blur-sm"
          style={{
            bottom: `${1 * scale}rem`,
            right: `${1 * scale}rem`,
            padding: `${0.25 * scale}rem ${0.75 * scale}rem`,
            fontSize: `${0.875 * scale}rem`,
          }}
        >
          {currentSlide + 1} / {totalSlides}
        </div>

        {/* Dot indicators */}
        <div
          className="absolute left-1/2 z-10 flex -translate-x-1/2"
          style={{
            bottom: `${1 * scale}rem`,
            gap: `${0.5 * scale}rem`,
          }}
        >
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              style={{
                width: index === currentSlide ? `${1 * scale}rem` : `${0.5 * scale}rem`,
                height: `${0.5 * scale}rem`,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SlideContext.Provider>
  )
}
