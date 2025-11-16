/**
 * RowCarousel - Horizontal scrolling carousel for content rows
 * Handles smooth scrolling, navigation arrows, touch gestures, and scroll indicators
 */

class RowCarousel {
  /**
   * Create a RowCarousel instance
   * @param {HTMLElement} container - The row-carousel container element
   */
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    this.leftArrow = container.querySelector('.carousel-arrow-left');
    this.rightArrow = container.querySelector('.carousel-arrow-right');
    
    // Touch gesture state
    this.touchStartX = 0;
    this.touchStartScrollLeft = 0;
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.velocity = 0;
    this.lastX = 0;
    this.lastTime = 0;
    
    // Scroll animation
    this.isScrolling = false;
    this.scrollAnimationFrame = null;
  }

  /**
   * Initialize the carousel with event listeners
   */
  init() {
    if (!this.track) {
      console.warn('Carousel track not found');
      return;
    }

    // Initialize arrow visibility
    this.updateArrowVisibility();

    // Attach arrow click handlers
    if (this.leftArrow) {
      this.leftArrow.addEventListener('click', () => this.scrollLeft());
    }

    if (this.rightArrow) {
      this.rightArrow.addEventListener('click', () => this.scrollRight());
    }

    // Update arrow visibility on scroll
    this.track.addEventListener('scroll', () => {
      this.updateArrowVisibility();
    });

    // Enable touch gestures using TouchHandler
    this.initializeTouchHandler();

    // Enable mouse drag scrolling (optional enhancement)
    this.enableMouseDrag();

    // Handle window resize
    window.addEventListener('resize', () => {
      this.updateArrowVisibility();
    });
  }

  /**
   * Initialize TouchHandler for carousel
   */
  initializeTouchHandler() {
    // Check if TouchHandler is available
    if (typeof TouchHandler !== 'undefined') {
      this.touchHandler = new TouchHandler(this.container, {
        type: 'carousel',
        snapToCards: true,
        momentumEnabled: true,
        swipeThreshold: 50,
        velocityThreshold: 0.5
      });
      this.touchHandler.init();
    } else {
      // Fallback to legacy touch implementation
      this.enableTouchScroll();
    }
  }

  /**
   * Scroll carousel to the left
   */
  scrollLeft() {
    const scrollAmount = this.calculateScrollAmount();
    const targetScroll = Math.max(0, this.track.scrollLeft - scrollAmount);
    this.smoothScrollTo(targetScroll);
  }

  /**
   * Scroll carousel to the right
   */
  scrollRight() {
    const scrollAmount = this.calculateScrollAmount();
    const maxScroll = this.track.scrollWidth - this.track.offsetWidth;
    const targetScroll = Math.min(maxScroll, this.track.scrollLeft + scrollAmount);
    this.smoothScrollTo(targetScroll);
  }

  /**
   * Calculate scroll amount based on visible cards
   * Scrolls by 3-4 card widths as per requirements
   * @returns {number} Scroll amount in pixels
   */
  calculateScrollAmount() {
    const cards = this.track.querySelectorAll('.content-card');
    if (cards.length === 0) return this.track.offsetWidth * 0.8;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(this.track).gap) || 16;
    
    // Scroll by approximately 3-4 cards
    const cardsToScroll = 3.5;
    return (cardWidth + gap) * cardsToScroll;
  }

  /**
   * Smooth scroll to target position with easing
   * @param {number} targetPosition - Target scroll position
   * @param {number} duration - Animation duration in ms (default 400ms)
   * @param {string} easingType - Easing function type ('easeOutCubic', 'easeInOutQuart', 'easeOutQuint')
   */
  smoothScrollTo(targetPosition, duration = 400, easingType = 'easeOutCubic') {
    if (this.isScrolling) {
      cancelAnimationFrame(this.scrollAnimationFrame);
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.reducedMotionHandler 
      ? window.reducedMotionHandler.getPrefersReducedMotion() 
      : false;

    // Use instant scroll if reduced motion is preferred
    if (prefersReducedMotion) {
      this.track.scrollLeft = targetPosition;
      this.updateArrowVisibility();
      return;
    }

    const startPosition = this.track.scrollLeft;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    this.isScrolling = true;

    // Easing functions for smooth animations
    const easingFunctions = {
      // Cubic easing - smooth deceleration
      easeOutCubic: (t) => {
        return 1 - Math.pow(1 - t, 3);
      },
      // Quartic easing - more pronounced deceleration
      easeInOutQuart: (t) => {
        return t < 0.5 
          ? 8 * t * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 4) / 2;
      },
      // Quintic easing - very smooth, natural feel
      easeOutQuint: (t) => {
        return 1 - Math.pow(1 - t, 5);
      },
      // Exponential easing - fast start, slow end
      easeOutExpo: (t) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }
    };

    const easingFunction = easingFunctions[easingType] || easingFunctions.easeOutCubic;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easingFunction(progress);

      // Use transform for GPU acceleration when possible
      this.track.scrollLeft = startPosition + (distance * eased);

      if (progress < 1) {
        this.scrollAnimationFrame = requestAnimationFrame(animate);
      } else {
        this.isScrolling = false;
        this.updateArrowVisibility();
      }
    };

    this.scrollAnimationFrame = requestAnimationFrame(animate);
  }

  /**
   * Scroll to a specific card by index
   * @param {number} index - Card index
   */
  scrollToCard(index) {
    const cards = this.track.querySelectorAll('.content-card');
    if (index < 0 || index >= cards.length) return;

    const card = cards[index];
    const gap = parseFloat(getComputedStyle(this.track).gap) || 16;
    const targetScroll = card.offsetLeft - gap;

    this.smoothScrollTo(targetScroll);
  }

  /**
   * Update arrow visibility based on scroll position
   * Hide left arrow at start, hide right arrow at end
   */
  updateArrowVisibility() {
    if (!this.track || !this.leftArrow || !this.rightArrow) return;

    const isAtStart = this.track.scrollLeft <= 1;
    const isAtEnd = this.track.scrollLeft + this.track.offsetWidth >= this.track.scrollWidth - 1;

    // Update left arrow
    this.leftArrow.style.opacity = isAtStart ? '0' : '1';
    this.leftArrow.style.pointerEvents = isAtStart ? 'none' : 'auto';
    this.leftArrow.setAttribute('aria-hidden', isAtStart ? 'true' : 'false');

    // Update right arrow
    this.rightArrow.style.opacity = isAtEnd ? '0' : '1';
    this.rightArrow.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    this.rightArrow.setAttribute('aria-hidden', isAtEnd ? 'true' : 'false');
  }

  /**
   * Enable touch gesture scrolling for mobile devices
   */
  enableTouchScroll() {
    if (!this.track) return;

    // Touch start
    this.track.addEventListener('touchstart', (e) => {
      this.isDragging = true;
      this.touchStartX = e.touches[0].pageX;
      this.touchStartScrollLeft = this.track.scrollLeft;
      this.lastX = this.touchStartX;
      this.lastTime = Date.now();
      this.velocity = 0;

      // Cancel any ongoing scroll animation
      if (this.isScrolling) {
        cancelAnimationFrame(this.scrollAnimationFrame);
        this.isScrolling = false;
      }
    }, { passive: true });

    // Touch move
    this.track.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;

      const currentX = e.touches[0].pageX;
      const currentTime = Date.now();
      const deltaX = this.touchStartX - currentX;
      const deltaTime = currentTime - this.lastTime;

      // Calculate velocity for momentum scrolling
      if (deltaTime > 0) {
        this.velocity = (currentX - this.lastX) / deltaTime;
      }

      this.track.scrollLeft = this.touchStartScrollLeft + deltaX;

      this.lastX = currentX;
      this.lastTime = currentTime;
    }, { passive: true });

    // Touch end - apply momentum
    this.track.addEventListener('touchend', () => {
      if (!this.isDragging) return;
      this.isDragging = false;

      // Apply momentum scrolling with deceleration
      this.applyMomentum();
    }, { passive: true });

    // Touch cancel
    this.track.addEventListener('touchcancel', () => {
      this.isDragging = false;
    }, { passive: true });
  }

  /**
   * Apply momentum scrolling with deceleration after touch end
   * Uses physics-based deceleration for natural feel
   */
  applyMomentum() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.reducedMotionHandler 
      ? window.reducedMotionHandler.getPrefersReducedMotion() 
      : false;

    // Skip momentum animation if reduced motion is preferred
    if (prefersReducedMotion) {
      this.velocity = 0;
      this.snapToCard();
      return;
    }

    // Physics constants for natural momentum
    const friction = 0.95; // Deceleration rate (0.95 = 5% reduction per frame)
    const minVelocity = 0.5; // Minimum velocity threshold to stop animation
    const velocityMultiplier = 16; // Frame time approximation (60fps = ~16ms)

    let lastTime = performance.now();

    const animate = (currentTime) => {
      // Calculate actual time delta for consistent animation across frame rates
      const deltaTime = currentTime - lastTime;
      const frameMultiplier = deltaTime / 16; // Normalize to 60fps baseline
      
      // Stop animation if velocity is below threshold
      if (Math.abs(this.velocity) < minVelocity) {
        this.velocity = 0;
        this.snapToCard();
        return;
      }

      // Apply friction with frame-rate compensation
      this.velocity *= Math.pow(friction, frameMultiplier);
      
      // Update scroll position with velocity
      this.track.scrollLeft -= this.velocity * velocityMultiplier * frameMultiplier;

      lastTime = currentTime;
      requestAnimationFrame(animate);
    };

    // Only apply momentum if velocity is significant
    if (Math.abs(this.velocity) > minVelocity) {
      requestAnimationFrame(animate);
    } else {
      this.snapToCard();
    }
  }

  /**
   * Snap to nearest card boundary after scrolling
   * Uses smooth easing for natural snap behavior
   */
  snapToCard() {
    const cards = this.track.querySelectorAll('.content-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(this.track).gap) || 16;
    const scrollPosition = this.track.scrollLeft;
    const cardPlusGap = cardWidth + gap;

    // Find nearest card with intelligent rounding
    // If scrolled more than 30% to next card, snap to it
    const currentCardIndex = scrollPosition / cardPlusGap;
    const fractionalPart = currentCardIndex % 1;
    const snapThreshold = 0.3;
    
    let targetCard;
    if (fractionalPart < snapThreshold) {
      targetCard = Math.floor(currentCardIndex);
    } else if (fractionalPart > (1 - snapThreshold)) {
      targetCard = Math.ceil(currentCardIndex);
    } else {
      targetCard = Math.round(currentCardIndex);
    }

    const targetScroll = targetCard * cardPlusGap;

    // Check for reduced motion preference
    const prefersReducedMotion = window.reducedMotionHandler 
      ? window.reducedMotionHandler.getPrefersReducedMotion() 
      : false;

    // Use instant snap if reduced motion is preferred, otherwise smooth
    const duration = prefersReducedMotion ? 0 : 300;
    this.smoothScrollTo(targetScroll, duration, 'easeOutQuint');
  }

  /**
   * Enable mouse drag scrolling (desktop enhancement)
   */
  enableMouseDrag() {
    if (!this.track) return;

    // Mouse down
    this.track.addEventListener('mousedown', (e) => {
      // Only enable drag on track, not on cards (to preserve click)
      if (e.target.closest('.content-card')) return;

      this.isDragging = true;
      this.startX = e.pageX - this.track.offsetLeft;
      this.scrollLeft = this.track.scrollLeft;
      
      // Add class to track only, never to body
      this.track.classList.add('is-dragging');
      this.track.style.userSelect = 'none';

      e.preventDefault();
    });

    // Mouse leave
    this.track.addEventListener('mouseleave', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.track.classList.remove('is-dragging');
        this.track.style.userSelect = '';
      }
    });

    // Mouse up
    this.track.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.track.classList.remove('is-dragging');
        this.track.style.userSelect = '';
      }
    });

    // Mouse move
    this.track.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      e.preventDefault();
      const x = e.pageX - this.track.offsetLeft;
      const walk = (x - this.startX) * 2; // Scroll speed multiplier
      this.track.scrollLeft = this.scrollLeft - walk;
    });
  }

  /**
   * Get easing function by name
   * @param {string} name - Easing function name
   * @returns {Function} Easing function
   */
  static getEasingFunction(name) {
    const easingFunctions = {
      linear: (t) => t,
      easeInQuad: (t) => t * t,
      easeOutQuad: (t) => t * (2 - t),
      easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      easeInCubic: (t) => t * t * t,
      easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
      easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      easeInQuart: (t) => t * t * t * t,
      easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
      easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
      easeInQuint: (t) => t * t * t * t * t,
      easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
      easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
      easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      easeInOutExpo: (t) => {
        if (t === 0) return 0;
        if (t === 1) return 1;
        return t < 0.5 
          ? Math.pow(2, 20 * t - 10) / 2 
          : (2 - Math.pow(2, -20 * t + 10)) / 2;
      }
    };
    
    return easingFunctions[name] || easingFunctions.easeOutCubic;
  }

  /**
   * Check if browser supports smooth scrolling
   * @returns {boolean} True if smooth scrolling is supported
   */
  static supportsSmoothScroll() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  /**
   * Destroy the carousel and clean up event listeners
   */
  destroy() {
    if (this.scrollAnimationFrame) {
      cancelAnimationFrame(this.scrollAnimationFrame);
    }

    // Remove event listeners would go here if we stored references
    // For now, the garbage collector will handle it when the element is removed
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RowCarousel;
}
