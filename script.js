// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Three.js Scene Setup
class ThreeScene {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.options = options;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };

        this.setupLights();
        this.setupObjects();
        this.addEventListeners();
        this.animate();
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 0.6);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.4);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);
    }

    setupObjects() {
        // Override in subclasses
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.renderer.render(this.scene, this.camera);
    }

    update() {
        // Override in subclasses
    }
}

// Hero Scene - Particle Field with Geometric Objects
class HeroScene extends ThreeScene {
    setupObjects() {
        this.camera.position.z = 5;

        // Starfield - subtle and distant
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 800;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 30;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.025,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);

        // Shooting stars
        this.shootingStars = [];
        this.shootingStarTimer = 0;

        // Minimal 3D wireframe geometries - mystical and scientific
        this.geometries = [];

        // Icosahedron - platonic solid, sacred geometry
        const icoGeometry = new THREE.IcosahedronGeometry(0.7, 0);
        const icoEdges = new THREE.EdgesGeometry(icoGeometry);
        const icoMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });
        const icosahedron = new THREE.LineSegments(icoEdges, icoMaterial);
        icosahedron.position.set(-4.5, 2.5, -2);
        this.scene.add(icosahedron);
        this.geometries.push({ mesh: icosahedron, speed: 0.15 });

        // Octahedron - double pyramid, cosmic structure
        const octaGeometry = new THREE.OctahedronGeometry(0.6, 0);
        const octaEdges = new THREE.EdgesGeometry(octaGeometry);
        const octaMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });
        const octahedron = new THREE.LineSegments(octaEdges, octaMaterial);
        octahedron.position.set(4.5, -2.5, -2);
        this.scene.add(octahedron);
        this.geometries.push({ mesh: octahedron, speed: 0.2 });

        // Tetrahedron - simplest platonic solid
        const tetraGeometry = new THREE.TetrahedronGeometry(0.7, 0);
        const tetraEdges = new THREE.EdgesGeometry(tetraGeometry);
        const tetraMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.45
        });
        const tetrahedron = new THREE.LineSegments(tetraEdges, tetraMaterial);
        tetrahedron.position.set(0, -3.5, -2);
        this.scene.add(tetrahedron);
        this.geometries.push({ mesh: tetrahedron, speed: 0.12 });
    }

    createShootingStar() {
        const geometry = new THREE.BufferGeometry();
        const start = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10 + 5,
            (Math.random() - 0.5) * 5 - 5
        );
        const end = start.clone();
        end.x -= 2;
        end.y -= 1.5;

        geometry.setFromPoints([start, end]);

        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0
        });

        const star = new THREE.Line(geometry, material);
        this.scene.add(star);

        this.shootingStars.push({
            mesh: star,
            life: 0,
            maxLife: 3.5,
            start: start.clone(),
            direction: new THREE.Vector3(-1.2, -0.8, 0)
        });
    }

    update() {
        // Rotate starfield - slow drift
        if (this.particles) {
            this.particles.rotation.y += 0.0001;
            this.particles.rotation.x += 0.00005;
        }

        // Animate geometries - slow 3D rotation
        this.geometries.forEach(({ mesh, speed }) => {
            mesh.rotation.x += 0.002 * speed;
            mesh.rotation.y += 0.0015 * speed;
        });

        // Shooting stars - reduced frequency
        this.shootingStarTimer += 0.016;
        if (this.shootingStarTimer > 3 && Math.random() < 0.015) {
            this.createShootingStar();
            this.shootingStarTimer = 0;
        }

        // Update shooting stars
        for (let i = this.shootingStars.length - 1; i >= 0; i--) {
            const star = this.shootingStars[i];
            star.life += 0.016;

            if (star.life < star.maxLife) {
                // Fade in and out - slower, more gradual
                const progress = star.life / star.maxLife;
                if (progress < 0.3) {
                    // Slow fade in
                    star.mesh.material.opacity = progress * 2;
                } else if (progress > 0.6) {
                    // Slow fade out
                    star.mesh.material.opacity = (1 - progress) * 2.5;
                } else {
                    star.mesh.material.opacity = 0.6;
                }

                // Move the star - slower speed
                const positions = star.mesh.geometry.attributes.position.array;
                positions[0] += star.direction.x * 0.016;
                positions[1] += star.direction.y * 0.016;
                positions[2] += star.direction.z * 0.016;
                positions[3] += star.direction.x * 0.016;
                positions[4] += star.direction.y * 0.016;
                positions[5] += star.direction.z * 0.016;
                star.mesh.geometry.attributes.position.needsUpdate = true;
            } else {
                // Remove dead star
                this.scene.remove(star.mesh);
                this.shootingStars.splice(i, 1);
            }
        }

        // Mouse parallax - very subtle
        this.targetRotation.x = this.mouse.y * 0.02;
        this.targetRotation.y = this.mouse.x * 0.02;

        this.camera.rotation.x += (this.targetRotation.x - this.camera.rotation.x) * 0.01;
        this.camera.rotation.y += (this.targetRotation.y - this.camera.rotation.y) * 0.01;
    }
}

// Pillar Scene - 3D Platonic solids
class PillarScene extends ThreeScene {
    setupObjects() {
        this.camera.position.z = 3;

        const shape = this.options.shape || 'cube';
        let geometry;

        switch (shape) {
            case 'cube':
                // Cube - hexahedron platonic solid
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case 'pyramid':
                // Tetrahedron - fire element
                geometry = new THREE.TetrahedronGeometry(0.8, 0);
                break;
            case 'sphere':
                // Icosahedron - water element, closest to sphere
                geometry = new THREE.IcosahedronGeometry(0.7, 0);
                break;
            default:
                geometry = new THREE.BoxGeometry(1, 1, 1);
        }

        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });

        this.mesh = new THREE.LineSegments(edges, material);
        this.scene.add(this.mesh);
    }

    update() {
        if (this.mesh) {
            // Slow 3D rotation
            this.mesh.rotation.x += 0.003;
            this.mesh.rotation.y += 0.002;
        }
    }
}

// Experience Background Scene
class ExperienceScene extends ThreeScene {
    setupObjects() {
        this.camera.position.z = 5;

        // Minimal grid - more sparse, technical diagram
        const gridSize = 20;
        const divisions = 10;
        const gridHelper = new THREE.GridHelper(gridSize, divisions, 0xffffff, 0xffffff);
        gridHelper.rotation.x = Math.PI / 2;
        gridHelper.position.z = -2;
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.08;
        this.scene.add(gridHelper);

        this.grid = gridHelper;
    }

    update() {
        // Static - no animation
    }
}

// Case Study Scene - Small 3D platonic solids
class CaseStudyScene extends ThreeScene {
    setupObjects() {
        this.camera.position.z = 4;

        // Create minimal 3D shapes - scientific specimens
        this.shapes = [];

        const geometries = [
            { geom: new THREE.OctahedronGeometry(0.3, 0), pos: [-2, 1, -1] },
            { geom: new THREE.TetrahedronGeometry(0.25, 0), pos: [2, -1, -1] },
            { geom: new THREE.DodecahedronGeometry(0.25, 0), pos: [0, 2, -2] }
        ];

        geometries.forEach(({ geom, pos }) => {
            const edges = new THREE.EdgesGeometry(geom);
            const material = new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.4
            });
            const mesh = new THREE.LineSegments(edges, material);
            mesh.position.set(...pos);
            this.scene.add(mesh);
            this.shapes.push({ mesh });
        });
    }

    update() {
        // Slow 3D rotation
        this.shapes.forEach(({ mesh }) => {
            mesh.rotation.x += 0.001;
            mesh.rotation.y += 0.0008;
        });
    }
}

// Skills Background Scene - Concentric circles like orbital diagrams
class SkillsScene extends ThreeScene {
    setupObjects() {
        this.camera.position.z = 5;

        // Concentric circles - like orbital paths
        this.circles = [];
        const radii = [1.5, 2.2, 2.9];

        radii.forEach((radius, i) => {
            const geometry = new THREE.TorusGeometry(radius, 0.008, 3, 48);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.15 - (i * 0.03)
            });
            const circle = new THREE.Mesh(geometry, material);
            circle.rotation.x = Math.PI / 2;
            this.scene.add(circle);
            this.circles.push(circle);
        });
    }

    update() {
        // Very slow rotation
        this.circles.forEach((circle, i) => {
            circle.rotation.z += 0.0001 * (i + 1);
        });
    }
}

// Contact Scene - Dodecahedron (universe/ether element)
class ContactScene extends ThreeScene {
    setupObjects() {
        this.camera.position.z = 4;

        // Dodecahedron - the universe, esoteric fifth element
        const geometry = new THREE.DodecahedronGeometry(1, 0);
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });

        this.mesh = new THREE.LineSegments(edges, material);
        this.scene.add(this.mesh);
    }

    update() {
        if (this.mesh) {
            // Slow 3D rotation
            this.mesh.rotation.x += 0.001;
            this.mesh.rotation.y += 0.0015;
        }
    }
}

// Initialize Three.js scenes
document.addEventListener('DOMContentLoaded', () => {
    // Hero scene
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        new HeroScene(heroCanvas);
    }

    // Pillar scenes
    const pillarCanvases = document.querySelectorAll('.pillar-canvas');
    pillarCanvases.forEach(canvas => {
        const shape = canvas.dataset.shape;
        new PillarScene(canvas, { shape });
    });

    // Experience scene
    const experienceCanvas = document.getElementById('experience-canvas');
    if (experienceCanvas) {
        new ExperienceScene(experienceCanvas);
    }

    // Case study scenes
    const caseStudyCanvases = document.querySelectorAll('.case-study-canvas');
    caseStudyCanvases.forEach(canvas => {
        new CaseStudyScene(canvas);
    });

    // Skills scene
    const skillsCanvas = document.getElementById('skills-canvas');
    if (skillsCanvas) {
        new SkillsScene(skillsCanvas);
    }

    // Contact scene
    const contactCanvas = document.getElementById('contact-canvas');
    if (contactCanvas) {
        new ContactScene(contactCanvas);
    }
});

// GSAP Animations
gsap.from('.hero-text', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.from('.scroll-indicator', {
    opacity: 0,
    duration: 1,
    delay: 1.5,
    ease: 'power2.out'
});

// Animate sections on scroll
const sections = document.querySelectorAll('section:not(.hero)');
sections.forEach(section => {
    gsap.from(section.querySelector('.section-header'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Animate pillars
gsap.utils.toArray('.pillar').forEach((pillar, i) => {
    gsap.from(pillar, {
        scrollTrigger: {
            trigger: pillar,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Animate timeline items
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Animate case studies
gsap.utils.toArray('.case-study').forEach((study, i) => {
    gsap.from(study, {
        scrollTrigger: {
            trigger: study,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 80,
        duration: 1,
        ease: 'power3.out'
    });
});

// Animate skill categories
gsap.utils.toArray('.skill-category').forEach((category, i) => {
    gsap.from(category, {
        scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out'
    });
});

// Counter animation for stats
function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2;
    const increment = target / (duration * 60);
    let current = 0;
    const isDecimal = target % 1 !== 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = isDecimal ? target.toFixed(1) : Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(1) : Math.ceil(current);
        }
    }, 1000 / 60);
}

// Trigger counter animations on scroll
const statValues = document.querySelectorAll('.stat-value');
statValues.forEach(stat => {
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        once: true,
        onEnter: () => animateCounter(stat)
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
const modal = document.getElementById('case-study-modal');
const caseStudyBtns = document.querySelectorAll('.case-study-btn');
const modalClose = document.querySelector('.modal-close');

caseStudyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add active state to nav on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Parallax effect for background images (if using assets)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const canvas = section.querySelector('canvas');
        if (canvas && canvas.classList.contains('section-canvas')) {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            canvas.style.transform = `translateY(${yPos}px)`;
        }
    });
});
