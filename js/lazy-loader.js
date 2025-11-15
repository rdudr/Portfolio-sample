/**
 * LazyImageLoader - Lazy load images using Intersection Observer
 * Loads images when they enter the viewport with configurable margin
 * Includes fallback for browsers without Intersection Observer support
 */

class LazyImageLoader {
  /**
   * Create a LazyImageLoader instance
   * @param {Object} options - Configuration options
   * @param {string} options.rootMargin - Margin around viewport (default: '100px')
   * @param {number} options.threshold - Intersection threshold (default: 0.01)
   */
  constructor(options = {}) {
    this.rootMargin = options.rootMargin || '100px';
    this.threshold = options.threshold || 0.01;
    this.observer = null;
    this.images = new Set();
    this.supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    this.init();
  }

  /**
   * Initialize the lazy loader
   */
  init() {
    if (this.supportsIntersectionObserver) {
      this.initIntersectionObserver();
    } else {
      // Fallback: load all images immediately
      this.loadAllImages();
    }
  }

  /**
   * Initialize Intersection Observer
   */
  initIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        rootMargin: this.rootMargin,
        threshold: this.threshold
      }
    );
  }

  /**
   * Handle intersection events
   * @param {Array} entries - Intersection observer entries
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        this.loadImage(img);
        this.observer.unobserve(img);
        this.images.delete(img);
      }
    });
  }

  /**
   * Load a single image
   * @param {HTMLImageElement} img - Image element to load
   */
  loadImage(img) {
    const src = img.dataset.src;
    
    if (!src) return;

    // Show loading state
    img.classList.add('lazy-loading');
    
    // Create a new image to preload
    const tempImg = new Image();
    
    tempImg.onload = () => {
      // Set the actual image source
      img.src = src;
      img.removeAttribute('data-src');
      
      // Remove loading state and add loaded state
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
      
      // Trigger custom event for tracking
      img.dispatchEvent(new CustomEvent('lazyloaded', {
        bubbles: true,
        detail: { src }
      }));
    };
    
    tempImg.onerror = () => {
      // Handle error - remove loading state and add error state
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
      
      // Set fallback or keep placeholder
      img.alt = 'Image failed to load';
      
      // Use error handler if available - Requirement 3.5
      if (window.errorHandler) {
        window.errorHandler.handleImageError(img, { showRetry: true });
      }
      
      // Trigger custom event for error tracking
      img.dispatchEvent(new CustomEvent('lazyerror', {
        bubbles: true,
        detail: { src }
      }));
    };
    
    // Start loading
    tempImg.src = src;
  }

  /**
   * Observe an image element
   * @param {HTMLImageElement} img - Image element to observe
   */
  observe(img) {
    if (!img || !(img instanceof HTMLImageElement)) return;
    
    // Skip if already loaded or no data-src
    if (!img.dataset.src || img.classList.contains('lazy-loaded')) return;
    
    if (this.supportsIntersectionObserver) {
      this.images.add(img);
      this.observer.observe(img);
    } else {
      // Fallback: load immediately
      this.loadImage(img);
    }
  }

  /**
   * Observe multiple image elements
   * @param {Array|NodeList} images - Array or NodeList of image elements
   */
  observeAll(images) {
    if (!images || !images.length) return;
    
    Array.from(images).forEach(img => this.observe(img));
  }

  /**
   * Unobserve an image element
   * @param {HTMLImageElement} img - Image element to unobserve
   */
  unobserve(img) {
    if (this.supportsIntersectionObserver && this.observer) {
      this.observer.unobserve(img);
    }
    this.images.delete(img);
  }

  /**
   * Load all images immediately (fallback for browsers without Intersection Observer)
   */
  loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => this.loadImage(img));
  }

  /**
   * Refresh - find and observe new lazy images in the DOM
   */
  refresh() {
    const lazyImages = document.querySelectorAll('img[data-src]:not(.lazy-loaded):not(.lazy-loading)');
    this.observeAll(lazyImages);
  }

  /**
   * Disconnect the observer and clean up
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.images.clear();
  }

  /**
   * Check if Intersection Observer is supported
   * @returns {boolean} True if supported
   */
  isSupported() {
    return this.supportsIntersectionObserver;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LazyImageLoader;
}
