'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { useBackground } from '@/lib/background-context'

export function StarfieldBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesMeshRef = useRef<THREE.Points | null>(null)
  const shootingStarsRef = useRef<Array<any>>([])
  const animationFrameRef = useRef<number | null>(null)
  const motionEnabledRef = useRef(true)
  const starsVisibleRef = useRef(true)
  const lastShootingStarSpawnRef = useRef(0)

  const { theme } = useTheme()
  const { motionEnabled, starsVisible } = useBackground()

  const getThemeColor = () => {
    switch (theme) {
      case 'dark':
        return 0xf7f6f4 // #F7F6F4 (stars color per spec)
      case 'light':
        return 0x111111 // #111111 (stars color per spec)
      case 'sepia':
        return 0x5f4b32 // #5F4B32 (stars color per spec)
      case 'blue':
        return 0xe5eeff // #E5EEFF (stars color per spec)
      default:
        // Fallback for system theme
        return 0x111111
    }
  }

  const updateParticlesColor = (color: THREE.Color) => {
    if (particlesMeshRef.current) {
      (particlesMeshRef.current.material as THREE.PointsMaterial).color = color
    }
  }

  const updateShootingStarsColor = (color: number) => {
    shootingStarsRef.current.forEach((star) => {
      if (star.material) {
        star.material.color.setHex(color)
      }
    })
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 15

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80
      positions[i + 1] = (Math.random() - 0.5) * 60
      positions[i + 2] = (Math.random() - 0.5) * 80
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      color: getThemeColor(),
      size: 0.04,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer
    particlesMeshRef.current = particles

    // Animation loop
    let frameCount = 0
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      frameCount++

      // Use refs to get current state values
      if (motionEnabledRef.current && starsVisibleRef.current) {
        particles.rotation.y += 0.0001
        particles.rotation.x += 0.00005
      }

      // Update shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.life += 1
        if (star.life > star.maxLife) {
          scene.remove(star.mesh)
          return false
        }

        // Update position
        star.mesh.position.add(star.direction)

        // Update opacity based on lifecycle
        const lifeFraction = star.life / star.maxLife
        let opacity = 0.6

        if (lifeFraction < 0.3) {
          opacity = 0.6 * (lifeFraction / 0.3)
        } else if (lifeFraction > 0.6) {
          opacity = 0.6 * ((1 - lifeFraction) / 0.4)
        }

        if (star.material) {
          star.material.opacity = opacity
        }

        return true
      })

      // Create new shooting star occasionally - only when motion is enabled AND stars are visible
      // With cooldown to prevent multiple spawning at once
      const timeSinceLastSpawn = frameCount - lastShootingStarSpawnRef.current
      if (motionEnabledRef.current && starsVisibleRef.current && timeSinceLastSpawn > 40 && Math.random() < 0.008) {
        lastShootingStarSpawnRef.current = frameCount
        const startPos = new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 15 + 10,
          (Math.random() - 0.5) * 30
        )
        const endPos = startPos.clone()
        endPos.x -= 2
        endPos.y -= 1.5

        const geometry = new THREE.BufferGeometry().setFromPoints([startPos, endPos])
        const material = new THREE.LineBasicMaterial({
          color: getThemeColor(),
          transparent: true,
          opacity: 0.6,
        })

        const star = new THREE.Line(geometry, material)
        scene.add(star)

        // Vary maxLife between 150-180 frames (2.5-3 seconds at 60fps)
        const maxLife = 150 + Math.random() * 30

        shootingStarsRef.current.push({
          mesh: star,
          material: material,
          life: 0,
          maxLife: maxLife,
          direction: new THREE.Vector3(-0.008, -0.004, 0),
        })
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  // Update theme color
  useEffect(() => {
    const color = getThemeColor()
    console.log('StarfieldBackground: Theme changed', {
      theme,
      color,
      hexColor: '0x' + color.toString(16),
    })
    const themeColor = new THREE.Color(color)
    updateParticlesColor(themeColor)
    updateShootingStarsColor(color)
  }, [theme])

  // Update refs when state changes so animation loop can access current values
  useEffect(() => {
    motionEnabledRef.current = motionEnabled
    console.log('StarfieldBackground: Motion state changed', { motionEnabled })
  }, [motionEnabled])

  // Update visibility
  useEffect(() => {
    starsVisibleRef.current = starsVisible
    console.log('StarfieldBackground: Updating visibility', {
      starsVisible,
      particlesVisible: particlesMeshRef.current?.visible,
      shootingStarsCount: shootingStarsRef.current.length,
    })

    if (particlesMeshRef.current) {
      particlesMeshRef.current.visible = starsVisible
    }
    shootingStarsRef.current.forEach((star) => {
      if (star.mesh) {
        star.mesh.visible = starsVisible
      }
    })

    console.log('StarfieldBackground: Visibility updated to', starsVisible)
  }, [starsVisible])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
