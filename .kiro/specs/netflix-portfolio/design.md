# Design Document

## Overview

This document outlines the technical design for a Netflix-style portfolio website featuring a browsing hub with horizontally scrolling content rows, card-based navigation, and individual detail pages. The architecture prioritizes performance, maintainability, and smooth user interactions through a data-driven approach with vanilla JavaScript, HTML5, and CSS3.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Application Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Router     │  │  View Manager│  │  Data Store  │  │
│  │  (routing.js)│  │  (views.js)  │  │ (data.js)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                   Presentation Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Browse Hub  │  │ Detail Page  │  │  Components  │  │
│  │  Template    │  │  Template    │  │  (cards.js)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                      UI Components                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Row Carousel  │  │Content Card  │  │  Navigation  │  │
│  │(carousel.js) │  │  (card.js)   │  │  (nav.js)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

- **HTML5**: Semantic markup with template elements
- **CSS3**: Grid, Flexbox, Custom Properties, Transforms
- **Vanilla JavaScript**: ES6+ modules for routing, state management, and UI
- **No Build System**: Direct browser execution for simplicity



## Components and Interfaces

### 1. Router Module (`js/router.js`)

**Purpose**: Manages hash-based URL routing and navigation between views

**Interface**:
```javascript
class Router {
  constructor(routes, viewManager)
  init()
  navigate(path)
  getCurrentRoute()
  onRouteChange(callback)
}
```

**Key Responsibilities**:
- Listen for `hashchange` events
- Parse URL hash into route parameters
- Match routes to view handlers
- Update browser history
- Trigger view transitions

**Route Patterns**:
- `/` or `#/` → Browse Hub
- `#/category-slug` → Category filtered view
- `#/category-slug/item-slug` → Detail Page
- `#/search?q=query` → Search results



### 2. View Manager (`js/view-manager.js`)

**Purpose**: Orchestrates view rendering and transitions

**Interface**:
```javascript
class ViewManager {
  constructor(appContainer)
  renderBrowseHub(filterCategory = null)
  renderDetailPage(category, itemSlug)
  renderNotFound()
  transitionTo(newView, duration = 500)
  getCurrentView()
}
```

**Key Responsibilities**:
- Render Browse Hub with all content rows
- Render Detail Pages with item data
- Handle view transitions with animations
- Manage scroll position restoration
- Clear and mount DOM elements



### 3. Data Store (`js/data.js`)

**Purpose**: Centralized content management and data access

**Data Structure**:
```javascript
const siteContent = [
  {
    slug: 'about-me',
    title: 'About Me',
    items: [
      {
        slug: 'introduction',
        title: 'Introduction',
        image: 'assets/images/about-hero.jpg',
        thumbnail: 'assets/images/about-thumb.jpg',
        subtitle: 'Electrical Engineer',
        description: 'Full bio text...',
        details: {
          location: 'Udaipur, India',
          specialization: 'IoT Security, Embedded Systems'
        }
      }
    ]
  },
  // ... other categories
]
```

**Interface**:
```javascript
class DataStore {
  getAllCategories()
  getCategoryBySlug(slug)
  getItemBySlug(categorySlug, itemSlug)
  searchItems(query)
  filterByCategory(categorySlug)
}
```



### 4. Row Carousel Component (`js/components/row-carousel.js`)

**Purpose**: Horizontal scrolling container for content cards

**Interface**:
```javascript
class RowCarousel {
  constructor(container, cards)
  init()
  scrollLeft()
  scrollRight()
  scrollToCard(index)
  updateArrowVisibility()
  enableTouchScroll()
}
```

**Features**:
- Smooth scroll animation (400ms)
- Navigation arrows with visibility logic
- Touch/swipe gesture support
- Scroll snap to card boundaries
- Lazy load images on scroll
- Keyboard navigation (arrow keys)

**HTML Structure**:
```html
<div class="row-carousel">
  <button class="carousel-arrow carousel-arrow-left" aria-label="Scroll left">
    <svg>...</svg>
  </button>
  <div class="carousel-track">
    <!-- Content cards -->
  </div>
  <button class="carousel-arrow carousel-arrow-right" aria-label="Scroll right">
    <svg>...</svg>
  </button>
</div>
```



### 5. Content Card Component (`js/components/content-card.js`)

**Purpose**: Individual card representing a portfolio item

**Interface**:
```javascript
class ContentCard {
  constructor(itemData, categorySlug)
  render()
  attachEventListeners()
  handleHover()
  handleClick()
  preloadDetailPage()
}
```

**HTML Structure**:
```html
<article class="content-card" data-category="education" data-slug="gits-udaipur">
  <div class="card-image-container">
    <img src="thumbnail.jpg" alt="GITS Udaipur" class="card-image" loading="lazy">
    <div class="card-overlay"></div>
  </div>
  <div class="card-info">
    <h3 class="card-title">GITS, Udaipur</h3>
    <p class="card-subtitle">BTech Electrical Engineering</p>
    <p class="card-meta">2024</p>
  </div>
  <div class="card-hover-details">
    <p class="card-description">Additional details on hover...</p>
  </div>
</article>
```

**States**:
- Default: Standard appearance
- Hover: Scale 1.05-1.1, elevated shadow, show details
- Focus: Keyboard focus ring
- Loading: Skeleton or spinner
- Error: Fallback styling



### 6. Search Component (`js/components/search.js`)

**Purpose**: Real-time search across all portfolio content

**Interface**:
```javascript
class SearchComponent {
  constructor(dataStore, viewManager)
  init()
  handleInput(query)
  filterResults(query)
  highlightMatches(text, query)
  clearSearch()
}
```

**Search Algorithm**:
1. Normalize query (lowercase, trim)
2. Search across: title, subtitle, description, tags
3. Rank results by relevance (title match > description match)
4. Filter content rows to show only matching cards
5. Update UI in real-time (debounced 300ms)



## Data Models

### Category Model

```javascript
{
  slug: string,           // URL-friendly identifier
  title: string,          // Display name
  description: string,    // Optional category description
  icon: string,          // Optional icon class or SVG
  items: Array<Item>     // Array of portfolio items
}
```

### Item Model

```javascript
{
  slug: string,              // URL-friendly identifier
  title: string,             // Display name
  subtitle: string,          // Secondary text (role, degree, etc.)
  image: string,             // Full-size image URL
  thumbnail: string,         // Card thumbnail URL
  description: string,       // Full description for detail page
  shortDescription: string,  // Brief text for card hover
  date: string,              // Date or date range
  location: string,          // Geographic location
  tags: Array<string>,       // Searchable keywords
  links: Array<Link>,        // External links (GitHub, certificates, etc.)
  gallery: Array<string>,    // Additional images
  metadata: Object           // Category-specific fields
}
```

### Link Model

```javascript
{
  url: string,
  label: string,
  type: string  // 'github', 'certificate', 'website', etc.
}
```



## Page Layouts

### Browse Hub Layout

```
┌─────────────────────────────────────────────────────────┐
│                        Header                            │
│  [Logo]              [Search]         [Filter Buttons]  │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                      Hero Section                        │
│                   Rishabh Dangi                          │
│     Electrical Engineer | IoT Security | Embedded        │
│                     [CTA Button]                         │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  About Me                                          [→]   │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                    │
│  │Card│ │Card│ │Card│ │Card│ │Card│ ...                │
│  └────┘ └────┘ └────┘ └────┘ └────┘                    │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Education                                         [→]   │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                           │
│  │Card│ │Card│ │Card│ │Card│ ...                       │
│  └────┘ └────┘ └────┘ └────┘                           │
└─────────────────────────────────────────────────────────┘
│  [Additional rows: Experience, Technical Activities,    │
│   Learning & Courses, Project, Award, Skills]           │
└─────────────────────────────────────────────────────────┘
```

### Detail Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  [← Back]                                        [Close] │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                                                          │
│                   Hero Image Background                  │
│                                                          │
│                    Item Title                            │
│                    Subtitle                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  ┌──────────────────────┐  ┌──────────────────────┐    │
│  │   Main Content       │  │   Sidebar/Meta       │    │
│  │   - Description      │  │   - Date             │    │
│  │   - Details          │  │   - Location         │    │
│  │   - Achievements     │  │   - Links            │    │
│  │                      │  │   - Tags             │    │
│  └──────────────────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                    Image Gallery                         │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                           │
│  │Img │ │Img │ │Img │ │Img │                           │
│  └────┘ └────┘ └────┘ └────┘                           │
└─────────────────────────────────────────────────────────┘
```



## CSS Architecture

### File Structure

```
css/
├── reset.css              # CSS reset/normalize
├── variables.css          # CSS custom properties
├── layout.css             # Grid and layout systems
├── components/
│   ├── header.css         # Header and navigation
│   ├── hero.css           # Hero section
│   ├── content-row.css    # Content row container
│   ├── carousel.css       # Row carousel
│   ├── card.css           # Content card
│   ├── detail-page.css    # Detail page layout
│   └── search.css         # Search component
├── animations.css         # Transitions and keyframes
└── responsive.css         # Media queries
```

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-bg-primary: #141414;
  --color-bg-secondary: #1a1a1a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #b3b3b3;
  --color-accent: #e50914;
  --color-overlay: rgba(0, 0, 0, 0.7);
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 3rem;
  --spacing-xl: 4rem;
  
  /* Card Dimensions */
  --card-width-mobile: 85vw;
  --card-width-tablet: 40vw;
  --card-width-desktop: 20vw;
  --card-aspect-ratio: 16 / 9;
  --card-gap: 1rem;
  
  /* Transitions */
  --transition-fast: 200ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Z-index layers */
  --z-header: 1000;
  --z-modal: 2000;
  --z-overlay: 100;
}
```



### Responsive Breakpoints

```css
/* Mobile: < 768px */
@media (max-width: 767px) {
  .content-card {
    width: var(--card-width-mobile);
  }
  .carousel-track {
    gap: 0.75rem;
  }
  .hero-section {
    height: 50vh;
  }
}

/* Tablet: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  .content-card {
    width: var(--card-width-tablet);
  }
  .carousel-track {
    gap: 1rem;
  }
}

/* Desktop: >= 1024px */
@media (min-width: 1024px) {
  .content-card {
    width: var(--card-width-desktop);
  }
  .carousel-track {
    gap: 1.5rem;
  }
  .detail-page-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
```



## Animation Strategy

### Card Hover Animation

```css
.content-card {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
  will-change: transform;
}

.content-card:hover {
  transform: scale(1.08) translateZ(0);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  z-index: 10;
}

.card-hover-details {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity var(--transition-normal),
              transform var(--transition-normal);
}

.content-card:hover .card-hover-details {
  opacity: 1;
  transform: translateY(0);
}
```

### Page Transition Animation

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.view-enter {
  animation: fadeIn 500ms ease-out;
}

.view-exit {
  animation: fadeOut 300ms ease-in;
}
```

### Carousel Scroll Animation

```javascript
// Smooth scroll with easing
function smoothScrollTo(element, target, duration) {
  const start = element.scrollLeft;
  const distance = target - start;
  const startTime = performance.now();
  
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    
    element.scrollLeft = start + (distance * eased);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}
```



## Error Handling

### Image Loading Errors

```javascript
class ImageLoader {
  static loadWithFallback(imgElement, src, fallbackSrc) {
    return new Promise((resolve, reject) => {
      imgElement.src = src;
      
      imgElement.onload = () => {
        imgElement.classList.add('loaded');
        resolve(imgElement);
      };
      
      imgElement.onerror = () => {
        if (fallbackSrc) {
          imgElement.src = fallbackSrc;
        } else {
          imgElement.classList.add('error');
          imgElement.alt = 'Image failed to load';
        }
        reject(new Error(`Failed to load: ${src}`));
      };
    });
  }
}
```

### Route Not Found

```javascript
class Router {
  handleNotFound() {
    this.viewManager.renderNotFound();
    console.warn(`Route not found: ${window.location.hash}`);
  }
}
```

### Data Loading Errors

```javascript
class DataStore {
  async loadData() {
    try {
      // Load data from JSON or inline
      this.data = await this.fetchData();
    } catch (error) {
      console.error('Failed to load data:', error);
      this.showErrorMessage('Unable to load portfolio content');
    }
  }
}
```



## Testing Strategy

### Unit Testing

**Components to Test**:
- Router: Route parsing, navigation, history management
- DataStore: Data retrieval, filtering, search
- ContentCard: Rendering, event handling
- RowCarousel: Scroll logic, arrow visibility

**Testing Approach**:
- Manual testing in browser console
- Test data fixtures for edge cases
- Visual regression testing for UI components

### Integration Testing

**Scenarios**:
1. Navigate from Browse Hub to Detail Page
2. Use browser back button to return
3. Search and filter content
4. Scroll through carousels with keyboard
5. Test on different viewport sizes

### Performance Testing

**Metrics to Monitor**:
- Initial page load time (<2s)
- Time to Interactive (<3s)
- Card hover response time (<16ms for 60fps)
- Carousel scroll smoothness (60fps)
- Image lazy loading effectiveness

**Tools**:
- Chrome DevTools Performance tab
- Lighthouse audit
- Network throttling simulation



## Accessibility Implementation

### Keyboard Navigation

```javascript
class KeyboardNavigationHandler {
  init() {
    document.addEventListener('keydown', (e) => {
      const focusedCard = document.activeElement.closest('.content-card');
      
      if (focusedCard) {
        switch(e.key) {
          case 'ArrowRight':
            this.focusNextCard(focusedCard);
            break;
          case 'ArrowLeft':
            this.focusPreviousCard(focusedCard);
            break;
          case 'Enter':
          case ' ':
            focusedCard.click();
            break;
          case 'Escape':
            if (this.isDetailPage()) {
              this.navigateBack();
            }
            break;
        }
      }
    });
  }
}
```

### ARIA Labels

```html
<!-- Content Row -->
<section class="content-row" aria-labelledby="education-heading">
  <h2 id="education-heading" class="row-title">Education</h2>
  <div class="row-carousel" role="region" aria-label="Education items">
    <!-- Cards -->
  </div>
</section>

<!-- Content Card -->
<article class="content-card" 
         role="button" 
         tabindex="0"
         aria-label="View details for GITS Udaipur">
  <!-- Card content -->
</article>

<!-- Carousel Arrows -->
<button class="carousel-arrow-left" 
        aria-label="Scroll left to see more education items">
  <svg aria-hidden="true">...</svg>
</button>
```

### Focus Management

```javascript
class FocusManager {
  saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  }
  
  restoreScrollPosition() {
    const position = sessionStorage.getItem('scrollPosition');
    if (position) {
      window.scrollTo(0, parseInt(position));
    }
  }
  
  focusFirstCard() {
    const firstCard = document.querySelector('.content-card');
    if (firstCard) {
      firstCard.focus();
    }
  }
}
```



## Performance Optimization

### Lazy Loading Strategy

```javascript
class LazyImageLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );
  }
  
  observe(images) {
    images.forEach(img => this.observer.observe(img));
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          this.observer.unobserve(img);
        }
      }
    });
  }
}
```

### Preloading Strategy

```javascript
class PreloadManager {
  preloadDetailPage(categorySlug, itemSlug) {
    // Preload on hover after 500ms
    this.preloadTimer = setTimeout(() => {
      const item = dataStore.getItemBySlug(categorySlug, itemSlug);
      if (item && item.image) {
        const img = new Image();
        img.src = item.image;
      }
    }, 500);
  }
  
  cancelPreload() {
    clearTimeout(this.preloadTimer);
  }
}
```

### Debouncing and Throttling

```javascript
// Debounce for search input
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const handleSearch = debounce((query) => {
  searchComponent.filterResults(query);
}, 300);

const handleScroll = throttle(() => {
  carousel.updateArrowVisibility();
}, 100);
```



## Mobile-Specific Considerations

### Touch Gesture Handling

```javascript
class TouchHandler {
  constructor(carousel) {
    this.carousel = carousel;
    this.startX = 0;
    this.scrollLeft = 0;
    this.isDown = false;
  }
  
  init() {
    const track = this.carousel.querySelector('.carousel-track');
    
    track.addEventListener('touchstart', (e) => {
      this.isDown = true;
      this.startX = e.touches[0].pageX - track.offsetLeft;
      this.scrollLeft = track.scrollLeft;
    });
    
    track.addEventListener('touchmove', (e) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - this.startX) * 2;
      track.scrollLeft = this.scrollLeft - walk;
    });
    
    track.addEventListener('touchend', () => {
      this.isDown = false;
      this.snapToCard();
    });
  }
  
  snapToCard() {
    // Snap to nearest card boundary
    const track = this.carousel.querySelector('.carousel-track');
    const cardWidth = track.querySelector('.content-card').offsetWidth;
    const gap = 16; // Card gap
    const scrollPosition = track.scrollLeft;
    const targetCard = Math.round(scrollPosition / (cardWidth + gap));
    
    track.scrollTo({
      left: targetCard * (cardWidth + gap),
      behavior: 'smooth'
    });
  }
}
```

### Mobile Menu

```html
<header class="site-header">
  <button class="mobile-menu-toggle" aria-label="Toggle menu">
    <svg>...</svg>
  </button>
  <nav class="main-nav" aria-label="Main navigation">
    <a href="#/">Home</a>
    <a href="#/about-me">About</a>
    <!-- Category links -->
  </nav>
</header>
```

### Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```



## File Structure

```
portfolio-website/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── layout.css
│   ├── components/
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── content-row.css
│   │   ├── carousel.css
│   │   ├── card.css
│   │   ├── detail-page.css
│   │   └── search.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js                    # Application entry point
│   ├── router.js                  # Hash routing
│   ├── view-manager.js            # View rendering
│   ├── data.js                    # Data store
│   ├── components/
│   │   ├── row-carousel.js        # Carousel component
│   │   ├── content-card.js        # Card component
│   │   ├── search.js              # Search component
│   │   └── detail-page.js         # Detail page component
│   └── utils/
│       ├── lazy-loader.js         # Image lazy loading
│       ├── preloader.js           # Content preloading
│       ├── keyboard-nav.js        # Keyboard navigation
│       └── helpers.js             # Utility functions
├── assets/
│   └── images/
│       ├── hero/
│       ├── thumbnails/
│       └── gallery/
└── data/
    └── content.json               # Optional: External data file
```

## Implementation Phases

### Phase 1: Core Infrastructure
1. Set up project structure
2. Implement Router module
3. Implement ViewManager
4. Create DataStore with sample data
5. Build basic HTML structure

### Phase 2: Browse Hub
1. Implement Hero section
2. Create ContentRow component
3. Build RowCarousel with scroll logic
4. Implement ContentCard component
5. Add navigation arrows
6. Style with CSS

### Phase 3: Detail Pages
1. Create DetailPage template
2. Implement routing to detail pages
3. Add back navigation
4. Style detail page layout
5. Add image gallery

### Phase 4: Interactions
1. Implement card hover effects
2. Add carousel scroll animations
3. Implement page transitions
4. Add keyboard navigation
5. Implement touch gestures

### Phase 5: Features
1. Build search functionality
2. Add category filtering
3. Implement lazy loading
4. Add preloading on hover
5. Optimize performance

### Phase 6: Polish
1. Add loading states
2. Implement error handling
3. Enhance accessibility
4. Mobile optimization
5. Cross-browser testing



## Design Decisions and Rationale

### Why Hash Routing?

**Decision**: Use hash-based routing (`#/category/item`) instead of HTML5 History API

**Rationale**:
- Works without server configuration
- Compatible with static hosting (GitHub Pages, Netlify)
- No 404 errors on direct URL access
- Simpler implementation for single-page app
- Browser back/forward work automatically

### Why Vanilla JavaScript?

**Decision**: No frameworks (React, Vue, etc.)

**Rationale**:
- Minimal bundle size (<50KB total)
- No build step required
- Faster initial load
- Direct browser execution
- Easier to understand and maintain
- Meets project requirements for simplicity

### Why Horizontal Carousels?

**Decision**: Horizontal scrolling rows instead of vertical grid

**Rationale**:
- Better content discoverability
- Familiar Netflix-style UX
- Efficient use of screen space
- Natural browsing flow
- Mobile-friendly swipe gestures
- Scalable for many items per category

### Why Data-Driven Architecture?

**Decision**: Centralized data model instead of hardcoded HTML

**Rationale**:
- Easy content updates
- Consistent structure
- Enables search and filtering
- Supports dynamic rendering
- Future-proof for CMS integration
- Reduces code duplication

### Why CSS Custom Properties?

**Decision**: Use CSS variables for theming

**Rationale**:
- Easy theme customization
- Consistent design tokens
- Runtime updates possible
- Better maintainability
- No preprocessor needed
- Native browser support



## Browser Compatibility

### Target Browsers
- Chrome 90+ (2021)
- Firefox 88+ (2021)
- Safari 14+ (2020)
- Edge 90+ (2021)
- Mobile Safari iOS 14+
- Chrome Mobile Android 10+

### Required Features
- CSS Grid (supported since 2017)
- CSS Custom Properties (supported since 2016)
- Intersection Observer (supported since 2019)
- ES6+ JavaScript (supported since 2015)
- CSS Transforms (supported since 2012)

### Fallbacks
- Intersection Observer: Load all images if not supported
- CSS Grid: Flexbox fallback for older browsers
- Smooth scroll: Instant scroll if not supported
- Touch events: Mouse events as fallback

## Security Considerations

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               img-src 'self' data: https:; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com;">
```

### XSS Prevention

```javascript
// Sanitize user input for search
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Use textContent instead of innerHTML for user data
element.textContent = userInput;
```

### Image Loading

```javascript
// Validate image URLs
function isValidImageUrl(url) {
  return url.startsWith('assets/') || 
         url.startsWith('https://trusted-cdn.com/');
}
```

## Summary

This design provides a comprehensive blueprint for implementing a Netflix-style portfolio website with:

- **Modular Architecture**: Separation of concerns with Router, ViewManager, DataStore
- **Component-Based UI**: Reusable ContentCard, RowCarousel, DetailPage components
- **Performance First**: Lazy loading, preloading, optimized animations
- **Accessibility**: WCAG AA compliance, keyboard navigation, ARIA labels
- **Mobile Optimized**: Touch gestures, responsive layout, mobile-first approach
- **Maintainable**: Data-driven, CSS custom properties, clear file structure

The implementation will be built in phases, starting with core infrastructure and progressively adding features, ensuring a solid foundation at each step.

