# Netflix-Style Portfolio - Project Structure

This document describes the Netflix-style portfolio implementation structure.

## Directory Structure

```
portfolio-website/
├── index-netflix.html          # Netflix-style main HTML file
├── css/
│   ├── reset.css              # CSS reset/normalize
│   ├── variables.css          # CSS custom properties
│   ├── layout.css             # Grid and layout systems (includes Netflix-style)
│   ├── components.css         # Component styles (includes Netflix-style)
│   └── animations.css         # Transitions and animations (includes Netflix-style)
├── js/
│   ├── data.js                # DataStore - centralized content management
│   ├── router.js              # Router - hash-based routing
│   ├── view-manager.js        # ViewManager - view rendering and transitions
│   ├── main-netflix.js        # Application initialization for Netflix-style
│   ├── carousel.js            # (Existing) Image carousel functionality
│   ├── navigation.js          # (Existing) Tab switcher and search
│   └── main.js                # (Existing) Original app initialization
├── assets/
│   └── images/                # Background and content images
├── data/
│   └── .gitkeep               # Data directory placeholder
└── index.html                 # (Existing) Original portfolio HTML
```

## Core Components

### 1. DataStore (`js/data.js`)
- Centralized content management
- Organizes portfolio content into 8 categories:
  - About Me
  - Education
  - Experience
  - Technical Activities
  - Learning & Courses
  - Project
  - Award
  - Skills & Interests
- Methods:
  - `getAllCategories()` - Get all categories
  - `getCategoryBySlug(slug)` - Get specific category
  - `getItemBySlug(categorySlug, itemSlug)` - Get specific item
  - `searchItems(query)` - Search across all content
  - `filterByCategory(categorySlug)` - Filter by category

### 2. Router (`js/router.js`)
- Hash-based routing for single-page navigation
- Route patterns:
  - `/` or `#/` → Browse Hub
  - `#/category-slug` → Category filtered view
  - `#/category-slug/item-slug` → Detail Page
- Methods:
  - `init()` - Initialize router
  - `navigate(path)` - Navigate to path
  - `getCurrentRoute()` - Get current route
  - `navigateToBrowseHub()` - Return to home

### 3. ViewManager (`js/view-manager.js`)
- Orchestrates view rendering and transitions
- Manages Browse Hub and Detail Pages
- Methods:
  - `renderBrowseHub(filterCategory)` - Render main view
  - `renderDetailPage(categorySlug, itemSlug)` - Render detail view
  - `renderNotFound()` - Render 404 page
  - `transitionTo(newViewHTML, callback)` - Animated transitions

### 4. Main Application (`js/main-netflix.js`)
- Application entry point
- Initializes all components
- Sets up search functionality
- Handles keyboard navigation
- Manages reduced motion preferences

## HTML Structure

### Browse Hub
```html
<div class="browse-hub">
  <section class="hero-section">
    <!-- Hero content -->
  </section>
  <div class="content-rows-container">
    <section class="content-row">
      <h2 class="row-title">Category Title</h2>
      <div class="row-carousel">
        <button class="carousel-arrow-left">←</button>
        <div class="carousel-track">
          <article class="content-card">
            <!-- Card content -->
          </article>
        </div>
        <button class="carousel-arrow-right">→</button>
      </div>
    </section>
  </div>
</div>
```

### Detail Page
```html
<div class="detail-page">
  <header class="detail-header">
    <button class="back-button">Back</button>
    <button class="close-button">Close</button>
  </header>
  <section class="detail-hero">
    <!-- Hero background and title -->
  </section>
  <div class="detail-content">
    <main class="detail-main">
      <!-- Main content -->
    </main>
    <aside class="detail-sidebar">
      <!-- Metadata and tags -->
    </aside>
  </div>
</div>
```

## CSS Architecture

### Variables (`css/variables.css`)
- Colors (dark theme)
- Typography (Inter font family)
- Spacing scale
- Transitions
- Z-index layers

### Layout (`css/layout.css`)
- Fixed header
- Responsive grid
- Footer layout
- Mobile-first approach

### Components (`css/components.css`)
- Browse Hub components
- Content cards (16:9 aspect ratio)
- Row carousels with arrows
- Detail page layout
- Loading states
- Error pages

### Animations (`css/animations.css`)
- View transitions (fade in/out)
- Card hover effects (scale + shadow)
- Carousel scroll animations
- Staggered content row animations
- Reduced motion support

## Key Features

### 1. Hash-Based Routing
- Works without server configuration
- Compatible with static hosting
- Browser back/forward support
- Direct URL access to detail pages

### 2. Responsive Design
- Mobile: 85vw card width
- Tablet: 40vw card width
- Desktop: 20vw card width
- Touch-optimized interactions

### 3. Performance
- Lazy loading for images
- GPU-accelerated animations
- Debounced search (300ms)
- Smooth scroll behavior

### 4. Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Reduced motion support
- Semantic HTML structure

### 5. Search Functionality
- Real-time filtering
- Searches titles, descriptions, tags
- Shows matching categories only
- Debounced for performance

## Usage

### To Use Netflix-Style Portfolio:
1. Open `index-netflix.html` in a browser
2. Or rename it to `index.html` to replace the original

### To Develop:
1. Serve files with a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```
2. Open `http://localhost:8000/index-netflix.html`

### To Add Content:
Edit the `initializeData()` method in `js/data.js` to add/modify portfolio items.

## Browser Support

- Chrome 90+ (2021)
- Firefox 88+ (2021)
- Safari 14+ (2020)
- Edge 90+ (2021)
- Mobile Safari iOS 14+
- Chrome Mobile Android 10+

## Requirements Met

This implementation satisfies task 1 requirements:
- ✅ Created directory structure (css/, js/, assets/, data/)
- ✅ Created semantic HTML5 structure (index-netflix.html)
- ✅ Set up CSS file organization (reset, variables, layout, components, animations)
- ✅ Created JavaScript module structure (data.js, router.js, view-manager.js, main-netflix.js)
- ✅ Follows requirements 8.1, 8.2, 8.3 (data-driven architecture)

## Next Steps

Refer to `.kiro/specs/netflix-portfolio/tasks.md` for the implementation plan:
- Task 2: Implement CSS reset and custom properties
- Task 3: Create centralized data store (✅ Complete)
- Task 4: Implement hash-based router (✅ Complete)
- Task 5: Create view manager (✅ Complete)
- And subsequent tasks...
