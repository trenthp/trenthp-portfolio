import * as THREE from 'three'

type SceneOptions = {
  shape?: string
}

// Base Three.js Scene Setup
export class ThreeScene {
  canvas: HTMLCanvasElement
  options: SceneOptions
  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  renderer!: THREE.WebGLRenderer
  mouse: { x: number; y: number } = { x: 0, y: 0 }
  targetRotation: { x: number; y: number } = { x: 0, y: 0 }
  initialized: boolean = false
  _handleMouseMove?: (e: MouseEvent) => void

  constructor(canvas: HTMLCanvasElement, options: SceneOptions = {}) {
    this.canvas = canvas
    this.options = options

    // Use canvas width/height if already set, otherwise use window dimensions
    const width = canvas.width || window.innerWidth
    const height = canvas.height || window.innerHeight

    try {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      )
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: window.devicePixelRatio <= 1,
        powerPreference: 'low-power',
      })
      this.renderer.setSize(width, height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      this.setupLights()
      this.setupObjects()
      this.addEventListeners()
      this.animate()
      this.initialized = true
    } catch (error) {
      console.error('WebGL initialization failed:', error)
      canvas.style.display = 'none'
    }
  }

  getThemeColor(): number {
    const theme = document.documentElement.getAttribute('data-theme')
    return theme === 'light' ? 0x000000 : 0xffffff
  }

  updateTheme(): void {
    // Override in subclasses
  }

  setupLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xffffff, 0.6)
    pointLight1.position.set(5, 5, 5)
    this.scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xffffff, 0.4)
    pointLight2.position.set(-5, -5, 5)
    this.scene.add(pointLight2)
  }

  setupObjects(): void {
    // Override in subclasses
  }

  addEventListeners(): void {
    const handleMouseMove = (e: MouseEvent) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Store for cleanup
    ;(this as any)._handleMouseMove = handleMouseMove
  }

  animate(): void {
    if (!this.renderer || !this.scene || !this.camera) return
    requestAnimationFrame(() => this.animate())
    this.update()
    this.renderer.render(this.scene, this.camera)
  }

  update(): void {
    // Override in subclasses
  }

  dispose(): void {
    window.removeEventListener('mousemove', (this as any)._handleMouseMove)
    this.renderer.dispose()
  }
}

// Hero Scene - Particle Field with Starfield and Shooting Stars
export class HeroScene extends ThreeScene {
  particles: THREE.Points | null = null
  particlesMaterial: THREE.PointsMaterial | null = null
  shootingStars: Array<any> = []
  shootingStarTimer: number = 0
  motionEnabled: boolean = true
  geometries: any[] = []
  geometryMaterials: any[] = []

  setupObjects(): void {
    this.camera.position.z = 5

    // Starfield - subtle and distant
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 800
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    this.particlesMaterial = new THREE.PointsMaterial({
      color: this.getThemeColor(),
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    this.particles = new THREE.Points(particlesGeometry, this.particlesMaterial)
    this.scene.add(this.particles)

    // Shooting stars
    this.shootingStars = []
    this.shootingStarTimer = 0
    this.motionEnabled = true
  }

  updateTheme(): void {
    const color = this.getThemeColor()
    if (this.particlesMaterial) {
      this.particlesMaterial.color.setHex(color)
    }
    this.geometryMaterials.forEach((material) => {
      material.color.setHex(color)
    })
    if (this.shootingStars) {
      this.shootingStars.forEach((star) => {
        if (star.material) {
          star.material.color.setHex(color)
        }
      })
    }
  }

  setMotionEnabled(enabled: boolean): void {
    this.motionEnabled = enabled
  }

  private createShootingStar(): void {
    const geometry = new THREE.BufferGeometry()
    const start = new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10 + 5,
      (Math.random() - 0.5) * 5 - 5
    )
    const end = start.clone()
    end.x -= 2
    end.y -= 1.5

    geometry.setFromPoints([start, end])

    const material = new THREE.LineBasicMaterial({
      color: this.getThemeColor(),
      transparent: true,
      opacity: 0,
    })

    const star = new THREE.Line(geometry, material)
    this.scene.add(star)

    this.shootingStars.push({
      mesh: star,
      material: material,
      life: 0,
      maxLife: 3.5,
      start: start.clone(),
      direction: new THREE.Vector3(-1.2, -0.8, 0),
    })
  }

  update(): void {
    if (this.motionEnabled) {
      if (this.particles) {
        this.particles.rotation.y += 0.0001
        this.particles.rotation.x += 0.00005
      }

      this.shootingStarTimer += 0.016
      if (this.shootingStarTimer > 3 && Math.random() < 0.015) {
        this.createShootingStar()
        this.shootingStarTimer = 0
      }

      for (let i = this.shootingStars.length - 1; i >= 0; i--) {
        const star = this.shootingStars[i]
        star.life += 0.016

        if (star.life < star.maxLife) {
          const progress = star.life / star.maxLife
          if (progress < 0.3) {
            star.mesh.material.opacity = progress * 2
          } else if (progress > 0.6) {
            star.mesh.material.opacity = (1 - progress) * 2.5
          } else {
            star.mesh.material.opacity = 0.6
          }

          const positions = star.mesh.geometry.attributes.position.array as Float32Array
          positions[0] += star.direction.x * 0.016
          positions[1] += star.direction.y * 0.016
          positions[2] += star.direction.z * 0.016
          positions[3] += star.direction.x * 0.016
          positions[4] += star.direction.y * 0.016
          positions[5] += star.direction.z * 0.016
          star.mesh.geometry.attributes.position.needsUpdate = true
        } else {
          this.scene.remove(star.mesh)
          this.shootingStars.splice(i, 1)
        }
      }
    }
    // Mouse parallax effect removed - starfield only rotates automatically
  }
}

// Pillar Scene - 3D Platonic solids
export class PillarScene extends ThreeScene {
  mesh: THREE.LineSegments | null = null
  material: THREE.LineBasicMaterial | null = null

  setupObjects(): void {
    this.camera.position.z = 3

    const shape = this.options.shape || 'cube'
    let geometry: THREE.BufferGeometry

    switch (shape) {
      case 'cube':
        geometry = new THREE.BoxGeometry(1, 1, 1)
        break
      case 'pyramid':
        geometry = new THREE.TetrahedronGeometry(0.8, 0)
        break
      case 'sphere':
        geometry = new THREE.IcosahedronGeometry(0.7, 0)
        break
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1)
    }

    const edges = new THREE.EdgesGeometry(geometry)
    this.material = new THREE.LineBasicMaterial({
      color: this.getThemeColor(),
      transparent: true,
      opacity: 0.6,
    })

    this.mesh = new THREE.LineSegments(edges, this.material)
    this.scene.add(this.mesh)
  }

  updateTheme(): void {
    const color = this.getThemeColor()
    if (this.material) {
      this.material.color.setHex(color)
    }
  }

  update(): void {
    if (this.mesh) {
      this.mesh.rotation.x += 0.003
      this.mesh.rotation.y += 0.002
    }
  }
}

// Experience Scene
export class ExperienceScene extends ThreeScene {
  grid: THREE.GridHelper | null = null

  setupObjects(): void {
    this.camera.position.z = 5

    const gridSize = 20
    const divisions = 10
    const color = this.getThemeColor()
    const gridHelper = new THREE.GridHelper(gridSize, divisions, color, color)
    gridHelper.rotation.x = Math.PI / 2
    gridHelper.position.z = -2
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.08
    this.scene.add(gridHelper)

    this.grid = gridHelper
  }

  updateTheme(): void {
    const color = this.getThemeColor()
    if (this.grid && this.grid.material) {
      this.grid.material.color.setHex(color)
    }
  }

  update(): void {
    // Static - no animation
  }
}

// Case Study Scene
export class CaseStudyScene extends ThreeScene {
  shapes: Array<any> = []

  setupObjects(): void {
    this.camera.position.z = 4

    const geometries = [
      { geom: new THREE.OctahedronGeometry(0.3, 0), pos: [-2, 1, -1] },
      { geom: new THREE.TetrahedronGeometry(0.25, 0), pos: [2, -1, -1] },
      { geom: new THREE.DodecahedronGeometry(0.25, 0), pos: [0, 2, -2] },
    ]

    geometries.forEach(({ geom, pos }) => {
      const edges = new THREE.EdgesGeometry(geom)
      const material = new THREE.LineBasicMaterial({
        color: this.getThemeColor(),
        transparent: true,
        opacity: 0.4,
      })
      const mesh = new THREE.LineSegments(edges, material)
      mesh.position.set(...(pos as [number, number, number]))
      this.scene.add(mesh)
      this.shapes.push({ mesh, material })
    })
  }

  updateTheme(): void {
    const color = this.getThemeColor()
    this.shapes.forEach(({ material }) => {
      if (material) {
        material.color.setHex(color)
      }
    })
  }

  update(): void {
    this.shapes.forEach(({ mesh }) => {
      mesh.rotation.x += 0.001
      mesh.rotation.y += 0.0008
    })
  }
}

// Skills Scene
export class SkillsScene extends ThreeScene {
  circles: Array<any> = []

  setupObjects(): void {
    this.camera.position.z = 5

    const radii = [1.5, 2.2, 2.9]

    radii.forEach((radius, i) => {
      const geometry = new THREE.TorusGeometry(radius, 0.008, 3, 48)
      const material = new THREE.MeshBasicMaterial({
        color: this.getThemeColor(),
        transparent: true,
        opacity: 0.15 - i * 0.03,
      })
      const circle = new THREE.Mesh(geometry, material)
      circle.rotation.x = Math.PI / 2
      this.scene.add(circle)
      this.circles.push({ mesh: circle, material })
    })
  }

  updateTheme(): void {
    const color = this.getThemeColor()
    this.circles.forEach(({ material }) => {
      if (material) {
        material.color.setHex(color)
      }
    })
  }

  update(): void {
    this.circles.forEach(({ mesh }, i) => {
      mesh.rotation.z += 0.0001 * (i + 1)
    })
  }
}

// Contact Scene
export class ContactScene extends ThreeScene {
  tetraFrame: THREE.LineSegments | null = null
  tetraMaterial: THREE.LineBasicMaterial | null = null
  linesMaterial: THREE.LineBasicMaterial | null = null
  internalLines: THREE.Line[] = []

  setupObjects(): void {
    this.camera.position.z = 4

    const tetraGeometry = new THREE.TetrahedronGeometry(1, 0)
    const tetraEdges = new THREE.EdgesGeometry(tetraGeometry)
    this.tetraMaterial = new THREE.LineBasicMaterial({
      color: this.getThemeColor(),
      transparent: true,
      opacity: 0.4,
    })
    const tetraFrame = new THREE.LineSegments(tetraEdges, this.tetraMaterial)
    this.scene.add(tetraFrame)

    this.linesMaterial = new THREE.LineBasicMaterial({
      color: this.getThemeColor(),
      transparent: true,
      opacity: 0.3,
    })

    this.internalLines = []

    const numLines = 12
    for (let i = 0; i < numLines; i++) {
      const t = i / numLines

      const startPoint = new THREE.Vector3(
        Math.cos(t * Math.PI * 2) * 0.3,
        0.5 - t * 1.2,
        Math.sin(t * Math.PI * 2) * 0.3
      )

      const endPoint = new THREE.Vector3(
        Math.cos(t * Math.PI * 2 + Math.PI) * 0.3,
        -0.5 + t * 1.2,
        Math.sin(t * Math.PI * 2 + Math.PI) * 0.3
      )

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint])
      const line = new THREE.Line(lineGeometry, this.linesMaterial)
      this.scene.add(line)
      this.internalLines.push(line)
    }

    this.tetraFrame = tetraFrame
  }

  updateTheme(): void {
    const color = this.getThemeColor()
    if (this.tetraMaterial) {
      this.tetraMaterial.color.setHex(color)
    }
    if (this.linesMaterial) {
      this.linesMaterial.color.setHex(color)
    }
  }

  update(): void {
    if (this.tetraFrame) {
      this.tetraFrame.rotation.x += 0.001
      this.tetraFrame.rotation.y += 0.0015

      this.internalLines.forEach((line) => {
        line.rotation.x = this.tetraFrame!.rotation.x
        line.rotation.y = this.tetraFrame!.rotation.y
      })
    }
  }
}
