# Project Structure

## Directory Layout

```
portfolio-website/
├── index.html              # Main HTML structure with all 8 sections
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
└── .kiro/
    ├── specs/             # Requirements, design, and task documents
    └── steering/          # AI assistant guidance documents
```

## File Organization Principles

- **Separation of Concerns**: CSS split by purpose (reset, variables, layout, components, animations)
- **Modular JavaScript**: Each JS file handles a specific feature area
- **Single HTML File**: All content in one file for simplicity (SPA approach)
- **Asset Organization**: All images in dedicated assets/images directory

## Key Components

1. **Header Component**: Fixed navigation with search and tab switcher
2. **Hero Panel Component**: Full-screen sections with background images and dark overlays
3. **Image Carousel Component**: Rotating image display with dot navigation
4. **Floating Image Card Component**: Single image with elevated card styling
5. **CTA Button Component**: Call-to-action buttons with hover effects

## Content Sections (8 total)

1. About Me
2. Education
3. Experience
4. Technical Activities
5. Learning & Courses
6. Projects
7. Awards
8. Skills & Interests

## Styling System

- **CSS Custom Properties**: Centralized in `variables.css` for colors, typography, spacing, borders, shadows, transitions
- **Responsive Breakpoints**: Mobile (<768px), Tablet (768-1023px), Desktop (≥1024px)
- **Layout Strategy**: CSS Grid for desktop two-column layout, Flexbox for mobile stacking
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body text
