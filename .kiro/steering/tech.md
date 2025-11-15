# Technology Stack

## Core Technologies

- **HTML5**: Semantic markup for content structure
- **CSS3**: Modern styling with Grid, Flexbox, Custom Properties, scroll-snap
- **Vanilla JavaScript**: Lightweight interactivity (no framework dependencies)

## Build System

No build system required. Pure web technologies for optimal performance and minimal bundle size.

## Key Libraries & Frameworks

None - intentionally framework-free for simplicity and performance.

## Common Commands

Since this is a static website with no build process:

- **Development**: Open `index.html` in a browser or use a local server:
  - `python -m http.server 8000` (Python 3)
  - `npx serve .` (if Node.js is available)
  
- **Testing**: Open in browser and test manually across different viewports

- **Deployment**: Upload files to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Browser Targets

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Performance Goals

- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s
