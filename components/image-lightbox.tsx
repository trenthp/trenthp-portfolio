'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

interface ImageLightboxProps {
  src: string
  alt: string
  className?: string
}

export function ImageLightbox({ src, alt, className = '' }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openLightbox = useCallback(() => setIsOpen(true), [])
  const closeLightbox = useCallback(() => setIsOpen(false), [])

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeLightbox])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Thumbnail */}
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in transition-opacity hover:opacity-80 ${className}`}
        onClick={openLightbox}
      />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Full-size image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] cursor-zoom-out rounded-lg object-contain"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
            />

            {/* Caption */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50">
              Click anywhere or press Escape to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
