# Design Document

## Overview

This design document outlines the technical architecture and implementation approach for Rishabh Dangi's personal portfolio website. The website will be built as a single-page application (SPA) featuring eight full-screen hero sections with a dark-overlay aesthetic, smooth scroll-snap navigation, and responsive image carousels. The design emphasizes visual elegance, smooth animations, and mobile-first responsive behavior.

## Architecture

### Technology Stack

- **HTML5**: Semantic markup for content structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, CSS Custom Properties, and scroll-snap
- **Vanilla JavaScript**: Lightweight interactivity for carousel navigation, tab switching, and animations
- **No Framework Dependencies**: Pure web technologies for optimal performance and minimal bundle size

### Application Structure

```
portfolio-website/
├── index.html              # Main HTML structure
├── css/
│   ├── reset.css          # CSS reset/normalize
│   ├── variables.css      # CSS custom properties (colors, spacing, typography)
│   ├── layout.css         # Grid and layout systems
│   ├── components.css     # Reusable component styles
│   └── animations.css     # Transition and animation definitions
├── js/
│   ├── carousel.js        # Image carousel functionality
│   ├── navigation.js      # Tab switcher and search bar
│   └── main.js            # Application initialization
├── assets/
│   └── images/            # Background and content images
└── README.md
```

## Components and Interfaces

### 1. Header Component

**Purpose**: Persistent navigation bar with search and media type filtering

**Structure**:
```html
<header class="site-header">
  <div class="search-container">
    <input type="search" placeholder="Search" class="search-input">
  </div>
  <nav class="tab-switcher">
    <button class="tab-btn active" data-tab="photos">Photos</button>
    <button class="tab-btn" data-tab="video">Video</button>
    <button class="tab-btn" data-tab="audio">Audio</button>
  </nav>
</header>
```

**Styling**:
- Fixed positioning at top of viewport
- Semi-transparent background with backdrop-filter blur
- Z-index layering above content sections
- Flexbox layout for space-between alignment

**Behavior**:
- Tab buttons toggle active state on click
- Search input accepts text input (functionality placeholder for future enhancement)
- Header remains visible during scroll

### 2. Hero Panel Component

**Purpose**: Full-screen section displaying content with background image and dark overlay

**Structure**:
```html
<section class="hero-panel" data-section="about">
  <div class="hero-background" style="background-image: url(...)"></div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="content-left">
      <h1 class="hero-heading">About Me</h1>
      <p class="hero-text">...</p>
      <button class="cta-button">Know More</button>
    </div>
    <div class="content-right">
      <!-- Carousel or single image -->
    </div>
  </div>
</section>
```

**Styling**:
- Height: 100vh (full viewport height)
- CSS scroll-snap-align: start
- Background: cover, center positioning
- Dark overlay: rgba(0, 0, 0, 0.6) for text readability
- Two-column grid layout (60/40 split on desktop)

**Responsive Behavior**:
- Desktop (≥768px): Two-column layout
- Mobile (<768px): Single column, stacked vertically

### 3. Image Carousel Component

**Purpose**: Rotating display of multiple images with dot navigation

**Structure**:
```html
<div class="carousel">
  <div class="carousel-track">
    <img src="..." alt="..." class="carousel-image active">
    <img src="..." alt="..." class="carousel-image">
    <img src="..." alt="..." class="carousel-image">
  </div>
  <div class="carousel-dots">
    <button class="dot active" data-index="0"></button>
    <button class="dot" data-index="1"></button>
    <button class="dot" data-index="2"></button>
  </div>
</div>
```

**Styling**:
- Floating card appearance with border-radius: 20px
- Box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), warm bevel effect
- Images: object-fit: cover, aspect-ratio: 3/4
- Dots: positioned absolute at bottom, centered

**Behavior**:
- Click dot to navigate to specific image
- Smooth fade transition (300-500ms) between images
- Active dot highlighted with different color/size
- Auto-advance disabled (user-controlled only)

### 4. Floating Image Card Component

**Purpose**: Single image display with elevated card styling

**Structure**:
```html
<div class="image-card">
  <img src="..." alt="..." class="card-image">
</div>
```

**Styling**:
- Border-radius: 20px
- Box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 
              inset 0 1px 0 rgba(255, 255, 255, 0.1) (bevel effect)
- Transform: translateZ(0) for GPU acceleration
- Max-width: 400px on desktop, 100% on mobile

### 5. CTA Button Component

**Purpose**: Call-to-action buttons for "Know More" functionality

**Structure**:
```html
<button class="cta-button" data-variant="default">Know More</button>
<button class="cta-button" data-variant="red">Know More</button>
```

**Styling**:
- Border-radius: 25px (soft-rounded)
- Padding: 12px 32px
- Default variant: Linear gradient background (subtle)
- Red variant: background: #d32f2f with hover darken
- Transition: all 0.3s ease
- Hover: transform: translateY(-2px), box-shadow increase

## Data Models

### Section Data Structure

Each hero panel section follows a consistent data model:

```javascript
const sectionData = {
  id: 'about-me',
  heading: 'About Me',
  backgroundImage: 'assets/images/motorcycle-background.jpg',
  content: {
    text: 'Biography paragraph...',
    items: null // or array of list items for Education, Experience, etc.
  },
  images: [
    { src: 'assets/images/profile-1.jpg', alt: 'Profile photo' },
    { src: 'assets/images/profile-2.jpg', alt: 'Additional photo' }
  ],
  buttonVariant: 'default' // or 'red'
};
```

### Content Data Arrays

**Education Data**:
```javascript
const educationData = [
  {
    institution: 'College of Technology and Engineering (CTAE), Udaipur',
    year: '2027',
    degree: 'MTech Power Electronics'
  },
  // ... additional entries
];
```

**Experience Data**:
```javascript
const experienceData = [
  {
    organization: 'AICTE IDEA Lab',
    role: 'Technical Assistant',
    period: 'Sept 2025 – Present',
    description: ''
  },
  // ... additional entries
];
```

**Skills Data**:
```javascript
const skillsData = {
  programming: ['Java', 'Arduino', 'MATLAB', 'Spring Boot', 'C & C++'],
  software: ['Auto CAD', 'Solid Works', 'GNU Radio', 'WireShark', 'Photoshop', 'Illustrator', 'PSpice'],
  hardware: ['Robotics', 'PLC & Scada', 'UART', 'I2C', 'SPI', 'Lora', 'Bluetooth', 'NRF', 'RF']
};
```

## Styling System

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #ffffff;
  --color-secondary: #f5f5f5;
  --color-accent-red: #d32f2f;
  --color-overlay: rgba(0, 0, 0, 0.6);
  --color-shadow: rgba(0, 0, 0, 0.3);
  
  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-heading: clamp(2.5rem, 5vw, 4rem);
  --font-size-body: clamp(1rem, 2vw, 1.125rem);
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  
  /* Borders */
  --border-radius-sm: 10px;
  --border-radius-md: 20px;
  --border-radius-lg: 25px;
  
  /* Shadows */
  --shadow-card: 0 10px 40px var(--color-shadow);
  --shadow-bevel: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### Typography Scale

- **Headings**: Playfair Display (serif), bold weight, large size (clamp 2.5rem-4rem)
- **Body Text**: Inter (sans-serif), regular weight, readable size (clamp 1rem-1.125rem)
- **Line Height**: 1.6 for body text, 1.2 for headings
- **Color**: White (#ffffff) for primary text, light gray (#f5f5f5) for secondary

### Layout Grid

**Desktop Layout** (≥768px):
```css
.hero-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--spacing-lg);
  align-items: center;
}
```

**Mobile Layout** (<768px):
```css
.hero-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
```

## Animations and Transitions

### Scroll Snap Behavior

```css
.hero-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.hero-panel {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

### Carousel Transitions

```css
.carousel-image {
  opacity: 0;
  transition: opacity var(--transition-slow);
  position: absolute;
}

.carousel-image.active {
  opacity: 1;
  position: relative;
}
```

### Button Hover Effects

```css
.cta-button {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
```

### Section Entry Animations

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}
```

## Error Handling

### Image Loading

- Implement lazy loading for background images
- Provide fallback background color if image fails to load
- Use low-quality image placeholders (LQIP) for initial render

```javascript
function loadImage(imgElement, src) {
  const img = new Image();
  img.onload = () => {
    imgElement.src = src;
    imgElement.classList.add('loaded');
  };
  img.onerror = () => {
    imgElement.classList.add('error');
    // Apply fallback styling
  };
  img.src = src;
}
```

### Carousel Navigation

- Validate dot index before transitioning
- Prevent rapid clicking with debounce
- Handle edge cases (empty carousel, single image)

```javascript
function navigateCarousel(index) {
  if (index < 0 || index >= images.length) return;
  if (isTransitioning) return;
  
  isTransitioning = true;
  // Perform transition
  setTimeout(() => {
    isTransitioning = false;
  }, 500);
}
```

## Responsive Design Strategy

### Breakpoints

- **Mobile**: 0-767px
- **Tablet**: 768px-1023px
- **Desktop**: 1024px+

### Mobile Optimizations

1. **Typography**: Reduce font sizes using clamp()
2. **Layout**: Stack content vertically
3. **Images**: Reduce carousel image sizes, maintain aspect ratios
4. **Touch Targets**: Ensure buttons are at least 44x44px
5. **Performance**: Serve smaller image assets via srcset

### Tablet Considerations

- Maintain two-column layout but with narrower gaps
- Adjust image card sizes proportionally
- Ensure touch-friendly interactions

## Performance Considerations

### Image Optimization

- Use WebP format with JPEG fallback
- Implement responsive images with srcset
- Lazy load images below the fold
- Compress images to <200KB per image

### CSS Optimization

- Use CSS containment for hero panels
- Minimize repaints with transform and opacity animations
- Leverage GPU acceleration with translateZ(0)

### JavaScript Optimization

- Debounce scroll and resize event handlers
- Use event delegation for carousel dots
- Minimize DOM queries with caching

```javascript
// Cache DOM references
const carouselDots = document.querySelectorAll('.dot');
const carouselImages = document.querySelectorAll('.carousel-image');

// Event delegation
document.querySelector('.carousel-dots').addEventListener('click', (e) => {
  if (e.target.classList.contains('dot')) {
    const index = parseInt(e.target.dataset.index);
    navigateCarousel(index);
  }
});
```

## Accessibility Considerations

### Semantic HTML

- Use proper heading hierarchy (h1 for main heading, h2 for section headings)
- Implement ARIA labels for carousel navigation
- Ensure all images have descriptive alt text

### Keyboard Navigation

- Tab switcher buttons accessible via Tab key
- Carousel dots navigable with arrow keys
- CTA buttons focusable and activatable with Enter/Space

### Screen Reader Support

```html
<div class="carousel" role="region" aria-label="Image carousel">
  <div class="carousel-track" role="list">
    <img role="listitem" aria-label="Profile photo 1 of 3">
  </div>
  <div class="carousel-dots" role="tablist">
    <button role="tab" aria-selected="true" aria-label="View image 1">
  </div>
</div>
```

### Color Contrast

- Ensure text meets WCAG AA standards (4.5:1 contrast ratio)
- Dark overlay provides sufficient contrast for white text
- Button text maintains contrast in all states

## Testing Strategy

### Browser Compatibility

**Target Browsers**:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

**Testing Approach**:
- Manual testing on physical devices
- BrowserStack for cross-browser validation
- Lighthouse audits for performance and accessibility

### Responsive Testing

**Viewports to Test**:
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1440px (Desktop)
- 1920px (Large desktop)

### Functional Testing

**Test Cases**:
1. Scroll snap behavior works across all sections
2. Carousel navigation transitions smoothly
3. Tab switcher highlights active tab
4. CTA buttons trigger hover effects
5. Images load correctly with fallbacks
6. Layout adapts to different viewport sizes
7. Touch interactions work on mobile devices
8. Keyboard navigation functions properly

### Performance Testing

**Metrics to Monitor**:
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s

**Tools**:
- Chrome DevTools Performance panel
- Lighthouse CI
- WebPageTest

## Implementation Phases

### Phase 1: Foundation
- Set up project structure
- Implement CSS reset and custom properties
- Create base HTML structure with all 8 sections
- Implement scroll-snap container

### Phase 2: Core Components
- Build header component with search and tab switcher
- Implement hero panel component structure
- Create floating image card styling
- Develop CTA button variants

### Phase 3: Interactivity
- Implement carousel navigation logic
- Add tab switcher functionality
- Create smooth scroll animations
- Implement button hover effects

### Phase 4: Content Population
- Add all section content (text, images)
- Populate education, experience, and other list data
- Integrate background images
- Configure image carousels for each section

### Phase 5: Responsive Design
- Implement mobile layout adjustments
- Add responsive typography scaling
- Optimize touch interactions
- Test across multiple devices

### Phase 6: Polish and Optimization
- Fine-tune animations and transitions
- Optimize image loading and performance
- Conduct accessibility audit
- Cross-browser testing and fixes

## Future Enhancements

1. **Search Functionality**: Implement actual search with content filtering
2. **Media Type Filtering**: Add functionality to filter content by Video/Photos/Audio
3. **Dark/Light Mode Toggle**: Allow users to switch between themes
4. **Smooth Scroll Navigation**: Add section navigation menu
5. **Contact Form**: Integrate contact form in final section
6. **Analytics Integration**: Track user interactions and page views
7. **Progressive Web App**: Add service worker for offline functionality
8. **Content Management**: Integrate headless CMS for easy content updates
