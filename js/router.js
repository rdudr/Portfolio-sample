/**
 * Router - Hash-based routing for single-page navigation
 * Manages URL changes and view transitions
 * 
 * Supported route patterns:
 * - #/ or empty → Browse Hub (all categories)
 * - #/category-slug → Browse Hub filtered to category
 * - #/category-slug/item-slug → Detail Page
 * - #/search?q=query → Search results
 */

class Router {
  constructor(viewManager) {
    this.viewManager = viewManager;
    this.currentRoute = null;
    this.previousRoute = null;
    this.routeChangeCallbacks = [];
    this.scrollPositions = new Map();
  }

  /**
   * Initialize router and set up event listeners
   */
  init() {
    // Listen for hash changes (back/forward navigation)
    window.addEventListener('hashchange', () => this.handleRouteChange());
    
    // Listen for popstate (browser back/forward buttons)
    window.addEventListener('popstate', () => this.handleRouteChange());
    
    // Handle initial route on page load
    this.handleRouteChange();
  }

  /**
   * Parse current URL hash into route object
   * @returns {Object} Route object with type, params, and query
   */
  parseRoute() {
    let hash = window.location.hash.slice(1) || '/';
    
    // Separate query string if present
    const queryIndex = hash.indexOf('?');
    let path = hash;
    let queryString = '';
    
    if (queryIndex !== -1) {
      path = hash.slice(0, queryIndex);
      queryString = hash.slice(queryIndex + 1);
    }
    
    // Parse query parameters
    const query = this.parseQueryString(queryString);
    
    // Split path into parts
    const parts = path.split('/').filter(part => part !== '');

    // Route: #/ or empty → Browse Hub
    if (parts.length === 0) {
      return { 
        type: 'browse-hub', 
        params: {},
        query 
      };
    }

    // Route: #/category-slug → Category filtered view
    if (parts.length === 1) {
      return { 
        type: 'category', 
        params: { categorySlug: parts[0] },
        query
      };
    }

    // Route: #/category-slug/item-slug → Detail Page
    if (parts.length === 2) {
      return { 
        type: 'detail', 
        params: { 
          categorySlug: parts[0], 
          itemSlug: parts[1] 
        },
        query
      };
    }

    // Invalid route → 404
    return { 
      type: 'not-found', 
      params: {},
      query,
      invalidPath: hash
    };
  }

  /**
   * Parse query string into object
   * @param {string} queryString - Query string without '?'
   * @returns {Object} Query parameters
   */
  parseQueryString(queryString) {
    const params = {};
    if (!queryString) return params;
    
    const pairs = queryString.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
    }
    
    return params;
  }

  /**
   * Handle route changes
   */
  handleRouteChange() {
    // Save scroll position of previous route
    if (this.currentRoute) {
      this.saveScrollPosition(this.currentRoute);
    }
    
    // Store previous route
    this.previousRoute = this.currentRoute;
    
    // Parse new route
    const route = this.parseRoute();
    this.currentRoute = route;
    
    // Log route change for debugging
    console.log('Route changed:', route);

    // Trigger route change callbacks
    this.triggerRouteChangeCallbacks(route, this.previousRoute);

    // Render appropriate view
    try {
      switch (route.type) {
        case 'browse-hub':
          this.viewManager.renderBrowseHub();
          break;
        
        case 'category':
          this.viewManager.renderBrowseHub(route.params.categorySlug);
          break;
        
        case 'detail':
          this.viewManager.renderDetailPage(
            route.params.categorySlug,
            route.params.itemSlug
          );
          break;
        
        case 'not-found':
        default:
          this.handleNotFound(route);
          break;
      }
    } catch (error) {
      console.error('Error rendering route:', error);
      this.handleNotFound(route);
    }
  }

  /**
   * Handle 404/not found routes
   * @param {Object} route - Route object
   */
  handleNotFound(route) {
    const invalidPath = route.invalidPath || window.location.hash;
    console.warn('Route not found:', invalidPath);
    
    // Use error handler if available
    if (window.errorHandler) {
      window.errorHandler.log(`404 - Route not found: ${invalidPath}`, 'warn', { route });
    }
    
    // Try to render 404 page, or fallback to browse hub
    if (this.viewManager.renderNotFound) {
      this.viewManager.renderNotFound(invalidPath);
    } else {
      // Fallback: redirect to browse hub after a brief delay
      console.log('Redirecting to browse hub...');
      setTimeout(() => {
        this.navigate('/');
      }, 2000);
    }
  }

  /**
   * Navigate to a new route
   * @param {string} path - Path to navigate to (e.g., '/category/item')
   * @param {boolean} replace - Replace current history entry instead of adding new one
   */
  navigate(path, replace = false) {
    // Ensure path starts with /
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    if (replace) {
      // Replace current history entry
      window.location.replace('#' + path);
    } else {
      // Add new history entry
      window.location.hash = path;
    }
  }

  /**
   * Navigate back to browse hub
   * @param {boolean} replace - Replace current history entry
   */
  navigateToBrowseHub(replace = false) {
    this.navigate('/', replace);
  }

  /**
   * Navigate back (browser back button)
   */
  navigateBack() {
    window.history.back();
  }

  /**
   * Navigate forward (browser forward button)
   */
  navigateForward() {
    window.history.forward();
  }

  /**
   * Get current route
   * @returns {Object} Current route object
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Get previous route
   * @returns {Object} Previous route object
   */
  getPreviousRoute() {
    return this.previousRoute;
  }

  /**
   * Register callback for route changes
   * @param {Function} callback - Function to call on route change
   */
  onRouteChange(callback) {
    if (typeof callback === 'function') {
      this.routeChangeCallbacks.push(callback);
    }
  }

  /**
   * Trigger all route change callbacks
   * @param {Object} newRoute - New route object
   * @param {Object} oldRoute - Previous route object
   */
  triggerRouteChangeCallbacks(newRoute, oldRoute) {
    this.routeChangeCallbacks.forEach(callback => {
      try {
        callback(newRoute, oldRoute);
      } catch (error) {
        console.error('Error in route change callback:', error);
      }
    });
  }

  /**
   * Save scroll position for current route
   * @param {Object} route - Route object
   */
  saveScrollPosition(route) {
    const key = this.getRouteKey(route);
    this.scrollPositions.set(key, {
      x: window.scrollX,
      y: window.scrollY
    });
  }

  /**
   * Restore scroll position for route
   * @param {Object} route - Route object
   */
  restoreScrollPosition(route) {
    const key = this.getRouteKey(route);
    const position = this.scrollPositions.get(key);
    
    if (position) {
      window.scrollTo(position.x, position.y);
    } else {
      // Default: scroll to top
      window.scrollTo(0, 0);
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
   * Check if current route matches a pattern
   * @param {string} type - Route type to check
   * @returns {boolean} True if current route matches type
   */
  isCurrentRoute(type) {
    return this.currentRoute && this.currentRoute.type === type;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
