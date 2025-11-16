/**
 * Main Application Entry Point
 * Initializes the Netflix-style portfolio application
 */

(function() {
  'use strict';

  // Application state
  let dataStore;
  let viewManager;
  let router;
  let backNavigation;
  let keyboardNavigation;
  let searchComponent;
  let categoryFilter;
  let lazyImageLoader;
  let preloadManager;
  let loadingStates;
  let errorHandler;

  /**
   * Initialize the application
   */
  function init() {
    try {
      // Get app container
      const appContainer = document.getElementById('app');
      
      if (!appContainer) {
        console.error('App container not found');
        return;
      }

      // Initialize error handler first - Requirements 3.5, 7.5, 19.4
      errorHandler = new ErrorHandler();
      errorHandler.init();
      console.log('ErrorHandler initialized');

      // Initialize loading states manager - Requirement 19.1, 19.2, 19.3, 19.4, 19.5
      loadingStates = new LoadingStates();
      loadingStates.startLoadTimer();
      console.log('LoadingStates initialized');

      // Show initial loading state
      loadingStates.showLoadingOverlay('Loading portfolio...');

      // Initialize data store
      dataStore = new DataStore();
      console.log('DataStore initialized with', dataStore.getAll().length, 'categories');

      // Initialize view manager
      viewManager = new ViewManager(appContainer, dataStore);
      console.log('ViewManager initialized');

      // Initialize router
      router = new Router(viewManager);
      console.log('Router initialized');

      // Initialize back navigation
      backNavigation = new BackNavigation(router, viewManager);
      backNavigation.init();
      viewManager.setBackNavigation(backNavigation);
      console.log('BackNavigation initialized');

      // Initialize keyboard navigation
      keyboardNavigation = new KeyboardNavigationHandler(router, viewManager);
      keyboardNavigation.init();
      console.log('KeyboardNavigationHandler initialized');

      // Start router
      router.init();
      console.log('Router started');

      // Hide loading overlay after initial render
      setTimeout(() => {
        loadingStates.hideLoadingOverlay();
        const loadTime = loadingStates.endLoadTimer();
        
        // Log performance metrics
        if (loadTime > 1500) {
          console.warn(`Initial render took ${loadTime.toFixed(2)}ms (target: <1500ms)`);
        } else {
          console.log(`✓ Initial render completed in ${loadTime.toFixed(2)}ms (target: <1500ms)`);
        }
      }, 100);

      // Expose router globally for ContentCard navigation
      window.router = router;

      // Initialize search component
      searchComponent = new SearchComponent(dataStore, viewManager);
      
      // Wait for initial view to render before initializing search
      setTimeout(() => {
        searchComponent.init();
        console.log('SearchComponent initialized');
      }, 100);

      // Initialize category filter
      categoryFilter = new CategoryFilter(dataStore, viewManager, router);
      
      // Wait for initial view to render before initializing filter
      setTimeout(() => {
        categoryFilter.init();
        console.log('CategoryFilter initialized');
      }, 100);

      // Initialize lazy image loader with 100px margin - Requirements 13.1, 19.3
      lazyImageLoader = new LazyImageLoader({
        rootMargin: '100px',
        threshold: 0.01
      });
      console.log('LazyImageLoader initialized (Intersection Observer supported:', lazyImageLoader.isSupported() + ')');

      // Observe initial lazy images
      setTimeout(() => {
        lazyImageLoader.refresh();
        
        // Initialize carousel dots
        if (window.carouselDots) {
          window.carouselDots.refresh();
          console.log('Carousel dots initialized');
        }
      }, 150);

      // Initialize preload manager - Requirements 13.3
      preloadManager = new PreloadManager(dataStore);
      
      // Wait for initial view to render before initializing preload manager
      setTimeout(() => {
        preloadManager.init();
        // Preload critical images (first row)
        preloadManager.preloadCriticalImages();
        console.log('PreloadManager initialized');
      }, 200);

      // Handle reduced motion preference
      handleReducedMotion();

      // Expose error handler globally
      window.errorHandler = errorHandler;

      console.log('Netflix-style portfolio application initialized successfully');
    } catch (error) {
      console.error('Failed to initialize application:', error);
      
      // Use error handler if available
      if (errorHandler) {
        errorHandler.handleError('Application Initialization Failed', error, { showUser: true });
      }
      
      showErrorMessage('Failed to load portfolio. Please refresh the page.');
    }
  }



  /**
   * Handle reduced motion preference
   */
  function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduce-motion');
    }

    // Listen for changes
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduce-motion');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    });
  }

  /**
   * Show error message
   * @param {string} message - Error message
   */
  function showErrorMessage(message) {
    const appContainer = document.getElementById('app');
    
    if (appContainer) {
      appContainer.innerHTML = `
        <div class="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>${message}</p>
          <button class="cta-button" onclick="location.reload()">
            Reload Page
          </button>
        </div>
      `;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for debugging
  window.NetflixPortfolioApp = {
    dataStore: () => dataStore,
    viewManager: () => viewManager,
    router: () => router,
    backNavigation: () => backNavigation,
    keyboardNavigation: () => keyboardNavigation,
    searchComponent: () => searchComponent,
    categoryFilter: () => categoryFilter,
    lazyImageLoader: () => lazyImageLoader,
    preloadManager: () => preloadManager,
    loadingStates: () => loadingStates,
    errorHandler: () => errorHandler,
    init
  };

})();
