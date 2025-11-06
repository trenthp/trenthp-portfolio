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

  const { theme } = useTheme()
  const { motionEnabled, starsVisible } = useBackground()

  const getThemeColor = () => {
    return theme === 'dark' ? 0xffffff : 0x000000
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
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      if (motionEnabled && starsVisible) {
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

      // Create new shooting star occasionally
      if (motionEnabled && starsVisible && Math.random() < 0.015) {
        const startPos = new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 30 + 15,
          (Math.random() - 0.5) * 80
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

        shootingStarsRef.current.push({
          mesh: star,
          material: material,
          life: 0,
          maxLife: 3.5,
          direction: new THREE.Vector3(-1.2, -0.8, 0),
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
    const themeColor = new THREE.Color(color)
    updateParticlesColor(themeColor)
    updateShootingStarsColor(color)
  }, [theme])

  // Update visibility
  useEffect(() => {
    if (particlesMeshRef.current) {
      particlesMeshRef.current.visible = starsVisible
    }
    shootingStarsRef.current.forEach((star) => {
      if (star.mesh) {
        star.mesh.visible = starsVisible
      }
    })
  }, [starsVisible])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
