# Row Carousel Implementation

## Overview

The RowCarousel component provides horizontal scrolling functionality for content rows in the Netflix-style portfolio. It implements smooth scrolling, navigation arrows, touch gestures, and visual scroll indicators.

## Features Implemented

### 1. Horizontal Scrolling with Smooth Behavior ✓
- **Requirement 2.3, 11.2**: Smooth CSS scroll-behavior and JavaScript-based smooth scrolling
- Easing function: Cubic ease-out for natural deceleration
- Default animation duration: 400ms
- Configurable scroll amount based on card widths

### 2. Consistent Card Spacing ✓
- **Requirement 2.4**: 1-1.5rem gap between cards
- Responsive spacing:
  - Mobile: 1rem
  - Tablet: 1.25rem
  - Desktop: 1.5rem
- Maintained through CSS flexbox gap property

### 3. Scroll Indicators / Fade Edges ✓
- **Requirement 2.5**: Visual fade edges on left and right
- 60px gradient overlays
- Automatically shown on hover
- Indicates scrollable content beyond viewport
- Pointer-events disabled to allow interaction with cards

### 4. Touch Gesture Support ✓
- **Requirement 11.1, 11.5, 20.1, 20.2, 20.4, 20.5**: Full touch gesture implementation
- Horizontal swipe detection
- Momentum scrolling with velocity calculation
- Natural deceleration (friction: 0.95)
- Snap-to-card boundary after scroll ends
- Passive event listeners for optimal performance

### 5. Navigation Arrows ✓
- **Requirement 2.6, 12.1-12.5**: Left and right arrow buttons
- Scroll by 3-4 card widths per click
- Auto-hide at start/end positions
- Smooth opacity transitions
- ARIA attributes for accessibility
- Hover effects for visual feedback

### 6. Mouse Drag Scrolling (Bonus)
- Desktop enhancement for better UX
- Grab cursor indication
- Prevents card clicks during drag
- 2x scroll speed multiplier for responsive feel

## File Structure

```
js/
├── row-carousel.js          # Main RowCarousel class
└── view-manager.js          # Updated to use RowCarousel

css/
└── components.css           # Updated with fade edges and cursor styles

test-row-carousel.html       # Comprehensive test page
```

## API Reference

### RowCarousel Class

```javascript
class RowCarousel {
  constructor(container)
  init()
  scrollLeft()
  scrollRight()
  scrollToCard(index)
  smoothScrollTo(targetPosition, duration)
  updateArrowVisibility()
  enableTouchScroll()
  enableMouseDrag()
  destroy()
}
```

### Constructor
```javascript
const carousel = new RowCarousel(containerElement);
```
- **Parameters**: 
  - `container` (HTMLElement): The `.row-carousel` element
- **Returns**: RowCarousel instance

### Methods

#### `init()`
Initializes the carousel with all event listeners and features.

```javascript
carousel.init();
```

#### `scrollLeft()`
Scrolls the carousel left by 3-4 card widths.

```javascript
carousel.scrollLeft();
```

#### `scrollRight()`
Scrolls the carousel right by 3-4 card widths.

```javascript
carousel.scrollRight();
```

#### `scrollToCard(index)`
Scrolls to a specific card by index.

```javascript
carousel.scrollToCard(5); // Scroll to 6th card (0-indexed)
```

#### `smoothScrollTo(targetPosition, duration)`
Smoothly scrolls to a specific pixel position.

```javascript
carousel.smoothScrollTo(500, 400); // Scroll to 500px in 400ms
```

#### `updateArrowVisibility()`
Updates arrow opacity based on scroll position. Called automatically on scroll.

```javascript
carousel.updateArrowVisibility();
```

#### `destroy()`
Cleans up the carousel and cancels any ongoing animations.

```javascript
carousel.destroy();
```

## Usage Example

### HTML Structure
```html
<section class="content-row">
  <h2 class="row-title">Category Title</h2>
  <div class="row-carousel">
    <button class="carousel-arrow carousel-arrow-left" aria-label="Scroll left">
      <svg>...</svg>
    </button>
    <div class="carousel-track">
      <!-- Content cards go here -->
    </div>
    <button class="carousel-arrow carousel-arrow-right" aria-label="Scroll right">
      <svg>...</svg>
    </button>
  </div>
</section>
```

### JavaScript Initialization
```javascript
// Get carousel container
const carouselContainer = document.querySelector('.row-carousel');

// Create and initialize
const carousel = new RowCarousel(carouselContainer);
carousel.init();
```

### Integration with ViewManager
```javascript
// In ViewManager.initializeBrowseHubComponents()
document.querySelectorAll('.row-carousel').forEach(carousel => {
  const rowCarousel = new RowCarousel(carousel);
  rowCarousel.init();
});
```

## CSS Styling

### Fade Edge Indicators
```css
.row-carousel::before,
.row-carousel::after {
  content: '';
  position: absolute;
  width: 60px;
  z-index: 5;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.row-carousel:hover::before,
.row-carousel:hover::after {
  opacity: 1;
}
```

### Cursor Styles
```css
.carousel-track {
  cursor: grab;
}

.carousel-track:active {
  cursor: grabbing;
}
```

## Touch Gesture Implementation

### Swipe Detection
1. **touchstart**: Record initial touch position and scroll position
2. **touchmove**: Calculate delta and update scroll position
3. **touchend**: Apply momentum based on velocity
4. **Momentum**: Gradually decelerate with friction (0.95)
5. **Snap**: Align to nearest card boundary

### Velocity Calculation
```javascript
velocity = (currentX - lastX) / deltaTime
```

### Momentum Application
```javascript
while (Math.abs(velocity) > minVelocity) {
  velocity *= friction;
  scrollLeft -= velocity * frameTime;
}
```

## Performance Optimizations

1. **Passive Event Listeners**: Touch events use `{ passive: true }`
2. **RequestAnimationFrame**: All animations use RAF for 60fps
3. **Will-Change**: Cards use `will-change: transform` for GPU acceleration
4. **Debounced Updates**: Arrow visibility updates are throttled
5. **Smooth Scroll**: Native CSS `scroll-behavior: smooth` as fallback

## Accessibility Features

1. **ARIA Labels**: All arrows have descriptive labels
2. **ARIA Hidden**: Arrows marked hidden when disabled
3. **Keyboard Support**: Arrow keys work through card focus
4. **Focus Management**: Cards remain focusable during scroll
5. **Reduced Motion**: Respects `prefers-reduced-motion` preference

## Browser Compatibility

- **Chrome/Edge**: 90+ ✓
- **Firefox**: 88+ ✓
- **Safari**: 14+ ✓
- **Mobile Safari**: iOS 14+ ✓
- **Chrome Mobile**: Android 10+ ✓

### Required Features
- CSS Flexbox (2015+)
- Touch Events (2013+)
- RequestAnimationFrame (2012+)
- CSS Transforms (2012+)

## Testing

### Test File: `test-row-carousel.html`

The test file includes three test scenarios:

1. **Test 1**: Basic carousel with 12 cards
   - Tests arrow navigation
   - Tests scroll-to-card functionality
   - Tests scroll position tracking

2. **Test 2**: Small carousel with 4 cards
   - Tests arrow auto-hide behavior
   - Verifies arrows hide when all content is visible

3. **Test 3**: Touch gesture test
   - Tests swipe left/right
   - Tests momentum scrolling
   - Tests snap-to-card behavior

### Manual Testing Checklist

- [ ] Arrow buttons scroll by 3-4 cards
- [ ] Arrows hide at start/end positions
- [ ] Fade edges appear on hover
- [ ] Touch swipe works on mobile
- [ ] Momentum scrolling feels natural
- [ ] Cards snap to boundaries after scroll
- [ ] Mouse drag scrolling works
- [ ] Smooth animations at 60fps
- [ ] Keyboard navigation works
- [ ] Reduced motion is respected

## Requirements Coverage

| Requirement | Status | Implementation |
|------------|--------|----------------|
| 2.3 - Horizontal scroll with smooth behavior | ✓ | `smoothScrollTo()` with easing |
| 2.4 - Consistent card spacing (1-1.5rem) | ✓ | CSS flexbox gap |
| 2.5 - Scroll indicators or fade edges | ✓ | CSS pseudo-elements |
| 11.1 - Horizontal scroll via gestures | ✓ | Touch event handlers |
| 11.2 - Smooth scrolling with easing | ✓ | Cubic ease-out function |
| 11.5 - Momentum scrolling | ✓ | Velocity-based deceleration |

## Known Limitations

1. **Snap Behavior**: Snap-to-card only works after touch/momentum scroll, not during manual scroll
2. **Mouse Drag**: Disabled on cards to preserve click functionality
3. **Fade Edges**: Only visible on hover (desktop) to avoid visual clutter

## Future Enhancements

1. **Lazy Loading**: Load cards as they enter viewport
2. **Infinite Scroll**: Loop back to start after reaching end
3. **Keyboard Shortcuts**: Home/End keys to jump to start/end
4. **Scroll Progress**: Visual indicator showing position in carousel
5. **Auto-Play**: Automatic scrolling with pause on hover

## Troubleshooting

### Arrows Not Showing
- Check that `.carousel-arrow-left` and `.carousel-arrow-right` exist
- Verify carousel has overflow content
- Ensure `updateArrowVisibility()` is called after init

### Touch Gestures Not Working
- Verify touch events are not being prevented by parent elements
- Check that `enableTouchScroll()` is called during init
- Test on actual touch device (not just Chrome DevTools)

### Scroll Not Smooth
- Check browser support for `scroll-behavior: smooth`
- Verify `smoothScrollTo()` is being used instead of direct scroll
- Ensure no conflicting scroll event handlers

### Performance Issues
- Reduce number of cards rendered initially
- Implement lazy loading for off-screen cards
- Check for memory leaks in event listeners
- Verify GPU acceleration is active (check DevTools)

## Credits

Implemented as part of Task 10 in the Netflix-style portfolio specification.

**Requirements**: 2.3, 2.4, 2.5, 11.1, 11.2, 11.5  
**Date**: 2025  
**Version**: 1.0.0
