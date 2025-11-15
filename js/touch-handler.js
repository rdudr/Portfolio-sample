/**
 * TouchHandler - Comprehensive touch gesture support for carousels and detail pages
 * Handles horizontal swipe for scrolling, momentum scrolling, snap to boundaries,
 * and vertical swipe-down to close detail pages
 */

class TouchHandler {
  /**
   * Create a TouchHandler instance
   * @param {HTMLElement} element - The element to attach touch handlers to
   * @param {Object} options - Configuration options
   */
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      type: options.type || 'carousel', // 'carousel' or 'detail-page'
      onSwipeDown: options.onSwipeDown || null,
      onSwipeLeft: options.onSwipeLeft || null,
      onSwipeRight: options.onSwipeRight || null,
      snapToCards: options.snapToCards !== false,
      momentumEnabled: options.momentumEnabled !== false,
      swipeThreshold: options.swipeThreshold || 50, // Minimum distance for swipe
      velocityThreshold: options.velocityThreshold || 0.5, // Minimum velocity for momentum
      ...options
    };

    // Touch state
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.touchStartScrollLeft = 0;
    this.isDragging = false;
    this.isVerticalSwipe = false;
    this.isHorizontalSwipe = false;
    
    // Velocity tracking
    this.velocity = 0;
    this.velocityY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.lastTime = 0;
    
    // Animation frame
    this.momentumFrame = null;
  }

  /**
   * Initialize touch handlers
   */
  init() {
    if (!this.element) {
      console.warn('TouchHandler: No element provided');
      return;
    }

    if (this.options.type === 'carousel') {
      this.initCarouselTouch();
    } else if (this.options.type === 'detail-page') {
      this.initDetailPageTouch();
    }
  }

  /**
   * Initialize touch handlers for carousel
   */
  initCarouselTouch() {
    const track = this.element.querySelector('.carousel-track') || this.element;

    // Touch start
    track.addEventListener('touchstart', (e) => {
      this.handleTouchStart(e, track);
    }, { passive: true });

    // Touch move
    track.addEventListener('touchmove', (e) => {
      this.handleCarouselTouchMove(e, track);
    }, { passive: false });

    // Touch end
    track.addEventListener('touchend', (e) => {
      this.handleCarouselTouchEnd(e, track);
    }, { passive: true });

    // Touch cancel
    track.addEventListener('touchcancel', () => {
      this.handleTouchCancel();
    }, { passive: true });
  }

  /**
   * Initialize touch handlers for detail page
   */
  initDetailPageTouch() {
    // Touch start
    this.element.addEventListener('touchstart', (e) => {
      this.handleTouchStart(e, this.element);
    }, { passive: true });

    // Touch move
    this.element.addEventListener('touchmove', (e) => {
      this.handleDetailPageTouchMove(e);
    }, { passive: false });

    // Touch end
    this.element.addEventListener('touchend', (e) => {
      this.handleDetailPageTouchEnd(e);
    }, { passive: true });

    // Touch cancel
    this.element.addEventListener('touchcancel', () => {
      this.handleTouchCancel();
    }, { passive: true });
  }

  /**
   * Handle touch start event
   * @param {TouchEvent} e - Touch event
   * @param {HTMLElement} element - Element being touched
   */
  handleTouchStart(e, element) {
    this.isDragging = true;
    this.isVerticalSwipe = false;
    this.isHorizontalSwipe = false;
    
    this.touchStartX = e.touches[0].pageX;
    this.touchStartY = e.touches[0].pageY;
    this.touchStartTime = Date.now();
    
    if (element.scrollLeft !== undefined) {
      this.touchStartScrollLeft = element.scrollLeft;
    }
    
    this.lastX = this.touchStartX;
    this.lastY = this.touchStartY;
    this.lastTime = this.touchStartTime;
    this.velocity = 0;
    this.velocityY = 0;

    // Cancel any ongoing momentum animation
    if (this.momentumFrame) {
      cancelAnimationFrame(this.momentumFrame);
      this.momentumFrame = null;
    }
  }

  /**
   * Handle touch move for carousel
   * @param {TouchEvent} e - Touch event
   * @param {HTMLElement} track - Carousel track element
   */
  handleCarouselTouchMove(e, track) {
    if (!this.isDragging) return;

    const currentX = e.touches[0].pageX;
    const currentY = e.touches[0].pageY;
    const currentTime = Date.now();
    
    const deltaX = Math.abs(currentX - this.touchStartX);
    const deltaY = Math.abs(currentY - this.touchStartY);
    const deltaTime = currentTime - this.lastTime;

    // Determine swipe direction on first significant movement
    if (!this.isHorizontalSwipe && !this.isVerticalSwipe) {
      if (deltaX > 10 || deltaY > 10) {
        if (deltaX > deltaY) {
          this.isHorizontalSwipe = true;
        } else {
          this.isVerticalSwipe = true;
        }
      }
    }

    // Only handle horizontal swipes for carousel
    if (this.isHorizontalSwipe) {
      // Prevent default to stop page scrolling
      e.preventDefault();

      const scrollDelta = this.touchStartX - currentX;
      track.scrollLeft = this.touchStartScrollLeft + scrollDelta;

      // Calculate velocity for momentum scrolling
      if (deltaTime > 0) {
        this.velocity = (currentX - this.lastX) / deltaTime;
      }

      this.lastX = currentX;
      this.lastTime = currentTime;
    }
  }

  /**
   * Handle touch end for carousel
   * @param {TouchEvent} e - Touch event
   * @param {HTMLElement} track - Carousel track element
   */
  handleCarouselTouchEnd(e, track) {
    if (!this.isDragging) return;
    this.isDragging = false;

    // Only apply momentum if it was a horizontal swipe
    if (this.isHorizontalSwipe && this.options.momentumEnabled) {
      this.applyMomentumScrolling(track);
    }

    this.isHorizontalSwipe = false;
    this.isVerticalSwipe = false;
  }

  /**
   * Handle touch move for detail page
   * @param {TouchEvent} e - Touch event
   */
  handleDetailPageTouchMove(e) {
    if (!this.isDragging) return;

    const currentX = e.touches[0].pageX;
    const currentY = e.touches[0].pageY;
    const currentTime = Date.now();
    
    const deltaX = Math.abs(currentX - this.touchStartX);
    const deltaY = currentY - this.touchStartY; // Positive = swipe down
    const deltaTime = currentTime - this.lastTime;

    // Determine swipe direction on first significant movement
    if (!this.isHorizontalSwipe && !this.isVerticalSwipe) {
      if (deltaX > 10 || Math.abs(deltaY) > 10) {
        if (Math.abs(deltaY) > deltaX) {
          this.isVerticalSwipe = true;
        } else {
          this.isHorizontalSwipe = true;
        }
      }
    }

    // Handle vertical swipe down to close detail page
    if (this.isVerticalSwipe && deltaY > 0 && window.scrollY === 0) {
      // Only allow swipe-down when at top of page
      e.preventDefault();

      // Calculate velocity for swipe detection
      if (deltaTime > 0) {
        this.velocityY = (currentY - this.lastY) / deltaTime;
      }

      // Visual feedback: translate the detail page down
      const translateY = Math.min(deltaY, 200); // Cap at 200px
      this.element.style.transform = `translateY(${translateY}px)`;
      this.element.style.opacity = Math.max(0.5, 1 - (translateY / 400));

      this.lastY = currentY;
      this.lastTime = currentTime;
    }
  }

  /**
   * Handle touch end for detail page
   * @param {TouchEvent} e - Touch event
   */
  handleDetailPageTouchEnd(e) {
    if (!this.isDragging) return;
    this.isDragging = false;

    const deltaY = e.changedTouches[0].pageY - this.touchStartY;
    const swipeDistance = Math.abs(deltaY);
    const swipeVelocity = Math.abs(this.velocityY);

    // Check if swipe down gesture should close detail page
    if (this.isVerticalSwipe && 
        deltaY > 0 && 
        window.scrollY === 0 &&
        (swipeDistance > this.options.swipeThreshold || swipeVelocity > this.options.velocityThreshold)) {
      
      // Trigger close callback
      if (this.options.onSwipeDown) {
        this.options.onSwipeDown();
      }
    } else {
      // Reset transform if swipe wasn't strong enough
      this.element.style.transition = 'transform 300ms ease, opacity 300ms ease';
      this.element.style.transform = '';
      this.element.style.opacity = '';
      
      setTimeout(() => {
        this.element.style.transition = '';
      }, 300);
    }

    this.isHorizontalSwipe = false;
    this.isVerticalSwipe = false;
  }

  /**
   * Handle touch cancel
   */
  handleTouchCancel() {
    this.isDragging = false;
    this.isHorizontalSwipe = false;
    this.isVerticalSwipe = false;
    
    if (this.momentumFrame) {
      cancelAnimationFrame(this.momentumFrame);
      this.momentumFrame = null;
    }

    // Reset any transforms
    if (this.element.style.transform) {
      this.element.style.transition = 'transform 300ms ease, opacity 300ms ease';
      this.element.style.transform = '';
      this.element.style.opacity = '';
      
      setTimeout(() => {
        this.element.style.transition = '';
      }, 300);
    }
  }

  /**
   * Apply momentum scrolling with deceleration
   * @param {HTMLElement} track - Carousel track element
   */
  applyMomentumScrolling(track) {
    // Check for reduced motion preference
    const prefersReducedMotion = window.reducedMotionHandler 
      ? window.reducedMotionHandler.getPrefersReducedMotion() 
      : false;

    // Skip momentum animation if reduced motion is preferred
    if (prefersReducedMotion) {
      this.velocity = 0;
      if (this.options.snapToCards) {
        this.snapToCard(track);
      }
      return;
    }

    // Physics constants for natural momentum
    const friction = 0.95; // Deceleration rate (0.95 = 5% reduction per frame)
    const minVelocity = this.options.velocityThreshold; // Minimum velocity threshold
    const velocityMultiplier = 16; // Frame time approximation (60fps = ~16ms)

    let lastTime = performance.now();

    const animate = (currentTime) => {
      // Calculate actual time delta for consistent animation across frame rates
      const deltaTime = currentTime - lastTime;
      const frameMultiplier = deltaTime / 16; // Normalize to 60fps baseline
      
      // Stop animation if velocity is below threshold
      if (Math.abs(this.velocity) < minVelocity) {
        this.velocity = 0;
        
        // Snap to card boundary if enabled
        if (this.options.snapToCards) {
          this.snapToCard(track);
        }
        return;
      }

      // Apply friction with frame-rate compensation
      this.velocity *= Math.pow(friction, frameMultiplier);
      
      // Update scroll position with velocity
      track.scrollLeft -= this.velocity * velocityMultiplier * frameMultiplier;

      lastTime = currentTime;
      this.momentumFrame = requestAnimationFrame(animate);
    };

    // Only apply momentum if velocity is significant
    if (Math.abs(this.velocity) > minVelocity) {
      this.momentumFrame = requestAnimationFrame(animate);
    } else if (this.options.snapToCards) {
      this.snapToCard(track);
    }
  }

  /**
   * Snap to nearest card boundary
   * @param {HTMLElement} track - Carousel track element
   */
  snapToCard(track) {
    const cards = track.querySelectorAll('.content-card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    const scrollPosition = track.scrollLeft;
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

    // Smooth scroll to target position
    this.smoothScrollTo(track, targetScroll, 300);
  }

  /**
   * Smooth scroll to target position
   * @param {HTMLElement} element - Element to scroll
   * @param {number} targetPosition - Target scroll position
   * @param {number} duration - Animation duration in ms
   */
  smoothScrollTo(element, targetPosition, duration = 300) {
    // Check for reduced motion preference
    const prefersReducedMotion = window.reducedMotionHandler 
      ? window.reducedMotionHandler.getPrefersReducedMotion() 
      : false;

    // Use instant scroll if reduced motion is preferred
    if (prefersReducedMotion) {
      element.scrollLeft = targetPosition;
      return;
    }

    const startPosition = element.scrollLeft;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuint(progress);

      element.scrollLeft = startPosition + (distance * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Destroy touch handler and clean up
   */
  destroy() {
    if (this.momentumFrame) {
      cancelAnimationFrame(this.momentumFrame);
      this.momentumFrame = null;
    }

    // Reset any transforms
    if (this.element && this.element.style.transform) {
      this.element.style.transform = '';
      this.element.style.opacity = '';
      this.element.style.transition = '';
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TouchHandler;
}
