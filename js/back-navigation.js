/**
 * BackNavigation - Handles all back navigation functionality
 * Manages back button clicks, browser back button, escape key, and scroll restoration
 */

class BackNavigation {
  constructor(router, viewManager) {
    this.router = router;
    this.viewManager = viewManager;
    this.scrollPositions = new Map();
    this.escapeHandler = null;
  }

  /**
   * Initialize back navigation handlers
   */
  init() {
    // Listen for route changes to manage scroll positions
    this.router.onRouteChange((newRoute, oldRoute) => {
      this.handleRouteChange(newRoute, oldRoute);
    });

    // Set up global escape key handler
    this.setupGlobalEscapeHandler();
  }

  /**
   * Handle route changes for scroll position management
   * @param {Object} newRoute - New route object
   * @param {Object} oldRoute - Previous route object
   */
  handleRouteChange(newRoute, oldRoute) {
    // Save scroll position when leaving a route
    if (oldRoute) {
      this.saveScrollPosition(oldRoute);
    }

    // Restore scroll position when entering a route
    // Use setTimeout to ensure DOM is rendered
    setTimeout(() => {
      this.restoreScrollPosition(newRoute);
    }, 350); // Wait for view transition animation
  }

  /**
   * Save current scroll position for a route
   * @param {Object} route - Route object
   */
  saveScrollPosition(route) {
    const key = this.getRouteKey(route);
    const position = {
      x: window.scrollX,
      y: window.scrollY,
      timestamp: Date.now()
    };
    
    this.scrollPositions.set(key, position);
    console.log(`Saved scroll position for ${key}:`, position);
  }

  /**
   * Restore scroll position for a route
   * @param {Object} route - Route object
   */
  restoreScrollPosition(route) {
    const key = this.getRouteKey(route);
    const position = this.scrollPositions.get(key);
    
    if (position) {
      // Restore saved position
      window.scrollTo({
        left: position.x,
        top: position.y,
        behavior: 'instant' // Use instant to avoid animation conflicts
      });
      console.log(`Restored scroll position for ${key}:`, position);
    } else {
      // Default: scroll to top for new routes
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'instant'
      });
    }
  }

  /**
   * Generate unique key for route
   * @param {Object} route - Route object
   * @returns {string} Route key
   */
  getRouteKey(route) {
    if (!route) return 'unknown';
    
    switch (route.type) {
      case 'browse-hub':
        return 'browse-hub';
      case 'category':
        return `category:${route.params.categorySlug}`;
      case 'detail':
        return `detail:${route.params.categorySlug}/${route.params.itemSlug}`;
      default:
        return route.type;
    }
  }

  /**
   * Set up global escape key handler
   */
  setupGlobalEscapeHandler() {
    // Remove existing handler if any
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }

    // Create new handler
    this.escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.handleEscapeKey(e);
      }
    };

    // Add event listener
    document.addEventListener('keydown', this.escapeHandler);
  }

  /**
   * Handle escape key press
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleEscapeKey(e) {
    const currentRoute = this.router.getCurrentRoute();
    
    // Only handle escape on detail pages
    if (currentRoute && currentRoute.type === 'detail') {
      e.preventDefault();
      console.log('Escape key pressed - navigating back to browse hub');
      this.navigateBack();
    }
  }

  /**
   * Navigate back to browse hub
   */
  navigateBack() {
    // Use router to navigate back
    this.router.navigateToBrowseHub();
  }

  /**
   * Set up back button click handler
   * @param {HTMLElement} backButton - Back button element
   */
  setupBackButton(backButton) {
    if (!backButton) return;

    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Back button clicked');
      this.navigateBack();
    });
  }

  /**
   * Set up close button click handler
   * @param {HTMLElement} closeButton - Close button element
   */
  setupCloseButton(closeButton) {
    if (!closeButton) return;

    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Close button clicked');
      this.navigateBack();
    });
  }

  /**
   * Initialize detail page navigation buttons
   * Called by ViewManager after rendering detail page
   */
  initializeDetailPageButtons() {
    const backButton = document.querySelector('.back-button');
    const closeButton = document.querySelector('.close-button');

    this.setupBackButton(backButton);
    this.setupCloseButton(closeButton);
  }

  /**
   * Clear saved scroll positions (useful for cleanup)
   */
  clearScrollPositions() {
    this.scrollPositions.clear();
  }

  /**
   * Get all saved scroll positions (for debugging)
   * @returns {Map} Map of scroll positions
   */
  getScrollPositions() {
    return this.scrollPositions;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BackNavigation;
}
