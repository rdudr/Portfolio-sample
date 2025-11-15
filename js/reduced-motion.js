/**
 * ReducedMotionHandler - Detects and respects user's reduced motion preference
 * Provides utilities for checking motion preferences and adjusting animations
 * 
 * Requirements: 15.5 - Respect prefers-reduced-motion media query
 */

class ReducedMotionHandler {
  constructor() {
    this.prefersReducedMotion = this.checkReducedMotionPreference();
    this.listeners = [];
    
    // Listen for changes to motion preference
    this.setupMediaQueryListener();
  }

  /**
   * Check if user prefers reduced motion
   * @returns {boolean} True if user prefers reduced motion
   */
  checkReducedMotionPreference() {
    // Check if matchMedia is supported
    if (!window.matchMedia) {
      return false;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  }

  /**
   * Setup listener for changes to motion preference
   */
  setupMediaQueryListener() {
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        this.notifyListeners(e.matches);
      });
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener((e) => {
        this.prefersReducedMotion = e.matches;
        this.notifyListeners(e.matches);
      });
    }
  }

  /**
   * Add listener for motion preference changes
   * @param {Function} callback - Callback function (receives boolean)
   */
  addListener(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  /**
   * Remove listener
   * @param {Function} callback - Callback function to remove
   */
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  /**
   * Notify all listeners of preference change
   * @param {boolean} prefersReducedMotion - New preference value
   */
  notifyListeners(prefersReducedMotion) {
    this.listeners.forEach(listener => {
      try {
        listener(prefersReducedMotion);
      } catch (error) {
        console.error('Error in reduced motion listener:', error);
      }
    });
  }

  /**
   * Get animation duration based on motion preference
   * @param {number} normalDuration - Normal animation duration in ms
   * @param {number} reducedDuration - Reduced duration in ms (default: 0)
   * @returns {number} Duration to use
   */
  getAnimationDuration(normalDuration, reducedDuration = 0) {
    return this.prefersReducedMotion ? reducedDuration : normalDuration;
  }

  /**
   * Get transition duration based on motion preference
   * @param {number} normalDuration - Normal transition duration in ms
   * @param {number} reducedDuration - Reduced duration in ms (default: 0)
   * @returns {number} Duration to use
   */
  getTransitionDuration(normalDuration, reducedDuration = 0) {
    return this.prefersReducedMotion ? reducedDuration : normalDuration;
  }

  /**
   * Get scroll behavior based on motion preference
   * @returns {string} 'auto' or 'smooth'
   */
  getScrollBehavior() {
    return this.prefersReducedMotion ? 'auto' : 'smooth';
  }

  /**
   * Execute callback only if animations are enabled
   * @param {Function} callback - Callback to execute
   */
  ifAnimationsEnabled(callback) {
    if (!this.prefersReducedMotion && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * Execute callback only if reduced motion is preferred
   * @param {Function} callback - Callback to execute
   */
  ifReducedMotion(callback) {
    if (this.prefersReducedMotion && typeof callback === 'function') {
      callback();
    }
  }

  /**
   * Get easing function based on motion preference
   * @param {string} normalEasing - Normal easing function
   * @param {string} reducedEasing - Reduced easing function (default: 'linear')
   * @returns {string} Easing function to use
   */
  getEasing(normalEasing, reducedEasing = 'linear') {
    return this.prefersReducedMotion ? reducedEasing : normalEasing;
  }

  /**
   * Check if user prefers reduced motion (static method)
   * @returns {boolean} True if user prefers reduced motion
   */
  static prefersReducedMotion() {
    if (!window.matchMedia) {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Apply reduced motion class to document if preference is set
   */
  applyReducedMotionClass() {
    if (this.prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }

  /**
   * Get current preference
   * @returns {boolean} True if user prefers reduced motion
   */
  getPrefersReducedMotion() {
    return this.prefersReducedMotion;
  }
}

// Create singleton instance
const reducedMotionHandler = new ReducedMotionHandler();

// Apply class on initialization
reducedMotionHandler.applyReducedMotionClass();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ReducedMotionHandler;
  module.exports.reducedMotionHandler = reducedMotionHandler;
}

// Make available globally
window.ReducedMotionHandler = ReducedMotionHandler;
window.reducedMotionHandler = reducedMotionHandler;
