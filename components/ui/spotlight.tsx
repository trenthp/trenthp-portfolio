'use client'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useSpring, useTransform, SpringOptions } from 'motion/react'
import { cn } from '@/lib/utils'

export type SpotlightProps = {
  className?: string
  size?: number
  springOptions?: SpringOptions
  fromColor?: string
  viaColor?: string
  toColor?: string
}

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
  fromColor = '#c0c7d4',
  viaColor = '#d6dce6',
  toColor = '#e6eaf0',
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null)

  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`)
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`)

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement
      if (parent) {
        parent.style.position = 'relative'
        parent.style.overflow = 'hidden'
        setParentElement(parent)
      }
    }
  }, [])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return
      const { left, top } = parentElement.getBoundingClientRect()
      mouseX.set(event.clientX - left)
      mouseY.set(event.clientY - top)
    },
    [mouseX, mouseY, parentElement],
  )

  useEffect(() => {
    if (!parentElement) return

    parentElement.addEventListener('mousemove', handleMouseMove)
    parentElement.addEventListener('mouseenter', () => setIsHovered(true))
    parentElement.addEventListener('mouseleave', () => setIsHovered(false))

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove)
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true))
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false))
    }
  }, [parentElement, handleMouseMove])

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200',
        isHovered ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: spotlightLeft,
        top: spotlightTop,
        background: `radial-gradient(circle at center, ${fromColor}, ${viaColor}, ${toColor}, transparent 80%)`,
      }}
    />
  )
}
