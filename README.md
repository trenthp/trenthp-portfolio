# Portfolio Site - Trent Holms Petersen

## Design Philosophy

- **Pure black & white**: #000000 background with white text, minimal grays
- **Generous spacing**: Emphasis on white space and breathing room
- **Flat design**: No gradients or glass morphism, just clean lines
- **Subtle interactions**: Opacity changes instead of color shifts

## Tech Stack

- **HTML5/CSS3/Vanilla JavaScript**
- **Three.js**: Interactive 3D wireframe objects and particle systems
- **GSAP**: Scroll-triggered animations and transitions
- **Print-friendly**: Resume page optimized for PDF generation

## Features

### Main Portfolio (`index.html`)
- Hero section with 3D particle field and floating geometric shapes
- Design philosophy pillars (Product, People, Progress) with 3D icons
- Timeline-based experience section
- Case study showcases (3 placeholders ready for content)
- Skills categorization
- Contact section with 3D visual

### Resume Page (`resume.html`)
- Clean, printable layout
- Interactive web view with 3D floating document background
- Print-to-PDF functionality (Ctrl/Cmd + P)
- Complete professional experience and achievements

## File Structure

```
portfolio/
├── index.html          # Main portfolio page
├── resume.html         # Resume/CV page
├── styles.css          # Main stylesheet
├── resume.css          # Resume-specific styles
├── script.js           # Three.js scenes + GSAP animations
├── resume.js           # Resume page 3D background
├── assets/             # Images and textures
│   ├── blackhole.png
│   ├── gradient circle.png
│   ├── gradient ellipse.png
│   ├── mesh fuzzy.png
│   ├── mesh solid.png
│   ├── paper texture.png
│   └── ...
└── README.md           # This file
```

## Deployment

### Bluehost
1. Upload all files to public_html directory
2. Ensure index.html is in root
3. Files are static - no build process needed

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts for deployment

### GitHub Pages
1. Push to GitHub repository
2. Settings → Pages → Deploy from main branch
3. Set source to root directory

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-space-black: #000000;
    --color-text-primary: #ffffff;
    --color-text-secondary: #999999;
    /* ... */
}
```

### Fonts
Current: Didot (serif) + Helvetica Neue (sans-serif)
To change, update `--font-serif` and `--font-sans` variables

### 3D Effects
Adjust Three.js scenes in `script.js`:
- Particle count
- Geometry types
- Animation speeds
- Mouse parallax sensitivity

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized Three.js rendering (max 2x pixel ratio)
- Efficient GSAP scroll triggers
- Lazy-loaded 3D scenes
- Reduced motion support for accessibility

## License

Private portfolio - All rights reserved.
