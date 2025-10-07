// Resume Page Three.js Background
class ResumeScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.mouse = { x: 0, y: 0 };
        this.scrollY = 0;

        this.setupLights();
        this.setupObjects();
        this.addEventListeners();
        this.animate();
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 0.5);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.4);
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);
    }

    setupObjects() {
        this.camera.position.z = 10;

        // Create floating document pages
        this.pages = [];

        for (let i = 0; i < 8; i++) {
            const geometry = new THREE.PlaneGeometry(1, 1.4);
            const material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                wireframe: true,
                emissive: 0xffffff,
                emissiveIntensity: 0.05,
                side: THREE.DoubleSide
            });

            const page = new THREE.Mesh(geometry, material);
            page.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 5
            );
            page.rotation.x = Math.random() * Math.PI;
            page.rotation.y = Math.random() * Math.PI;

            this.scene.add(page);
            this.pages.push({
                mesh: page,
                speed: 0.2 + Math.random() * 0.3,
                rotationSpeed: 0.0005 + Math.random() * 0.001
            });
        }

        // Add some geometric accents
        const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            wireframe: true,
            emissive: 0xffffff,
            emissiveIntensity: 0.1
        });
        this.torus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.torus.position.set(6, 3, -2);
        this.scene.add(this.torus);

        // Add particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 500;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 25;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.03,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.renderer.render(this.scene, this.camera);
    }

    update() {
        // Animate pages - slower
        this.pages.forEach(({ mesh, speed, rotationSpeed }) => {
            mesh.rotation.x += rotationSpeed;
            mesh.rotation.y += rotationSpeed * 1.5;
            mesh.position.y += Math.sin(Date.now() * 0.0005 * speed) * 0.001;
        });

        // Animate torus - slower
        if (this.torus) {
            this.torus.rotation.x += 0.002;
            this.torus.rotation.y += 0.003;
        }

        // Animate particles - slower
        if (this.particles) {
            this.particles.rotation.y += 0.00015;
        }

        // Mouse parallax - reduced
        this.camera.position.x += (this.mouse.x * 0.3 - this.camera.position.x) * 0.01;
        this.camera.position.y += (this.mouse.y * 0.3 - this.camera.position.y) * 0.01;

        // Scroll effect
        this.camera.position.y = -(this.scrollY * 0.002);
    }
}

// Initialize scene
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('resume-canvas');
    if (canvas) {
        new ResumeScene(canvas);
    }
});

// Smooth fade-in on load
window.addEventListener('load', () => {
    const container = document.querySelector('.resume-container');
    if (container) {
        container.style.opacity = '0';
        setTimeout(() => {
            container.style.transition = 'opacity 1s ease';
            container.style.opacity = '1';
        }, 100);
    }
});
