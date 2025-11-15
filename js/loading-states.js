/**
 * LoadingStates - Manages loading states throughout the application
 * Requirements: 19.1, 19.2, 19.3, 19.4, 19.5
 */

class LoadingStates {
  constructor() {
    this.loadStartTime = null;
  }

  /**
   * Create skeleton cards for initial load - Requirement 19.1
   * @param {number} count - Number of skeleton cards to create
   * @returns {string} HTML string of skeleton cards
   */
  createSkeletonCards(count = 5) {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(`
        <div class="skeleton-card">
          <div class="skeleton-card-image"></div>
          <div class="skeleton-card-info">
            <div class="skeleton-card-title"></div>
            <div class="skeleton-card-subtitle"></div>
            <div class="skeleton-card-meta"></div>
          </div>
        </div>
      `);
    }
    return skeletons.join('');
  }

  /**
   * Create skeleton row for initial load
   * @param {string} title - Row title
   * @param {number} cardCount - Number of skeleton cards
   * @returns {string} HTML string of skeleton row
   */
  createSkeletonRow(title, cardCount = 5) {
    return `
      <section class="content-row skeleton-row">
        <h2 class="row-title">${title}</h2>
        <div class="row-carousel">
          <div class="carousel-track">
            ${this.createSkeletonCards(cardCount)}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Create loading spinner - Requirement 19.2
   * @param {string} size - Size of spinner: 'small', 'medium', 'large'
   * @param {string} text - Optional loading text
   * @returns {string} HTML string of loading spinner
   */
  createLoadingSpinner(size = 'medium', text = '') {
    const sizeClass = size === 'small' ? 'loading-spinner-small' : 
                      size === 'large' ? 'loading-spinner-large' : '';
    
    return `
      <div class="loading-spinner-container">
        <div class="loading-spinner ${sizeClass}"></div>
        ${text ? `<div class="loading-text">${text}</div>` : ''}
      </div>
    `;
  }

  /**
   * Show full page loading overlay
   * @param {string} text - Optional loading text
   */
  showLoadingOverlay(text = 'Loading...') {
    // Remove existing overlay if present
    this.hideLoadingOverlay();

    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'app-loading-overlay';
    overlay.innerHTML = this.createLoadingSpinner('large', text);
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-label', text);

    document.body.appendChild(overlay);
  }

  /**
   * Hide full page loading overlay
   */
  hideLoadingOverlay() {
    const overlay = document.getElementById('app-loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  /**
   * Add loading state to image - Requirement 19.3
   * @param {HTMLImageElement} img - Image element
   */
  addImageLoadingState(img) {
    if (!img || !(img instanceof HTMLImageElement)) return;

    const container = img.closest('.card-image-container') || img.parentElement;
    if (container) {
      container.classList.add('card-image-loading');
    }

    // Set up load and error handlers
    img.addEventListener('load', () => {
      this.handleImageLoad(img);
    }, { once: true });

    img.addEventListener('error', () => {
      this.handleImageError(img);
    }, { once: true });
  }

  /**
   * Handle successful image load
   * @param {HTMLImageElement} img - Image element
   */
  handleImageLoad(img) {
    const container = img.closest('.card-image-container') || img.parentElement;
    if (container) {
      container.classList.remove('card-image-loading');
      container.classList.add('card-image-loaded');
    }
    img.classList.add('loaded');
  }

  /**
   * Handle image load error
   * @param {HTMLImageElement} img - Image element
   */
  handleImageError(img) {
    const container = img.closest('.card-image-container') || img.parentElement;
    if (container) {
      container.classList.remove('card-image-loading');
      container.classList.add('card-image-error');
    }
    
    // Hide the broken image
    img.style.display = 'none';
    
    // Use error handler if available - Requirement 3.5
    if (window.errorHandler) {
      window.errorHandler.handleImageError(img, { showRetry: false });
    } else {
      console.warn(`Failed to load image: ${img.src || img.dataset.src}`);
    }
  }

  /**
   * Create error message with retry option - Requirement 19.4
   * @param {string} title - Error title
   * @param {string} message - Error message
   * @param {Function} retryCallback - Function to call on retry
   * @returns {string} HTML string of error message
   */
  createErrorMessage(title, message, retryCallback = null) {
    const retryId = `retry-btn-${Date.now()}`;
    
    const html = `
      <div class="error-container">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2 class="error-title">${title}</h2>
        <p class="error-message">${message}</p>
        ${retryCallback ? `<button class="retry-button" id="${retryId}">Try Again</button>` : ''}
      </div>
    `;

    // Attach retry handler after DOM insertion
    if (retryCallback) {
      setTimeout(() => {
        const retryBtn = document.getElementById(retryId);
        if (retryBtn) {
          retryBtn.addEventListener('click', retryCallback);
        }
      }, 0);
    }

    return html;
  }

  /**
   * Show error in container
   * @param {HTMLElement} container - Container element
   * @param {string} title - Error title
   * @param {string} message - Error message
   * @param {Function} retryCallback - Function to call on retry
   */
  showError(container, title, message, retryCallback = null) {
    if (!container) return;

    container.innerHTML = this.createErrorMessage(title, message, retryCallback);
  }

  /**
   * Start tracking initial render time - Requirement 19.5
   */
  startLoadTimer() {
    this.loadStartTime = performance.now();
  }

  /**
   * End tracking and log initial render time
   * @returns {number} Load time in milliseconds
   */
  endLoadTimer() {
    if (!this.loadStartTime) return 0;

    const loadTime = performance.now() - this.loadStartTime;
    console.log(`Initial render completed in ${loadTime.toFixed(2)}ms`);

    // Check if we met the 1.5 second requirement
    if (loadTime > 1500) {
      console.warn(`Initial render took ${loadTime.toFixed(2)}ms, exceeding 1.5s target`);
    }

    this.loadStartTime = null;
    return loadTime;
  }

  /**
   * Initialize loading states for browse hub
   * @param {HTMLElement} container - Browse hub container
   * @param {Array} categories - Array of category data
   */
  initializeBrowseHubLoading(container, categories) {
    if (!container) return;

    // Start load timer
    this.startLoadTimer();

    // Add loading class for staggered animation
    container.classList.add('browse-hub-loading');

    // Create skeleton rows for first 3 categories (above the fold)
    const skeletonHTML = categories.slice(0, 3).map(cat => 
      this.createSkeletonRow(cat.title || 'Loading...', 5)
    ).join('');

    container.innerHTML = skeletonHTML;

    // Remove loading class after content is rendered
    setTimeout(() => {
      container.classList.remove('browse-hub-loading');
    }, 100);
  }

  /**
   * Initialize loading state for detail page
   * @param {HTMLElement} container - Detail page container
   */
  initializeDetailPageLoading(container) {
    if (!container) return;

    container.innerHTML = this.createLoadingSpinner('large', 'Loading details...');
  }

  /**
   * Handle detail page image loading
   * @param {string} imageUrl - URL of the image to load
   * @param {HTMLElement} heroElement - Hero background element
   */
  loadDetailPageImage(imageUrl, heroElement) {
    if (!heroElement || !imageUrl) return;

    heroElement.classList.add('loading');

    const img = new Image();
    
    img.onload = () => {
      heroElement.style.backgroundImage = `url('${imageUrl}')`;
      heroElement.classList.remove('loading');
      heroElement.classList.add('loaded');
    };

    img.onerror = () => {
      heroElement.classList.remove('loading');
      heroElement.classList.add('error');
      
      // Use error handler if available - Requirement 3.5
      if (window.errorHandler) {
        window.errorHandler.log(`Failed to load detail page image: ${imageUrl}`, 'warn');
      } else {
        console.warn(`Failed to load detail page image: ${imageUrl}`);
      }
    };

    img.src = imageUrl;
  }

  /**
   * Observe all images in container and add loading states
   * @param {HTMLElement} container - Container element
   */
  observeImages(container) {
    if (!container) return;

    const images = container.querySelectorAll('img[data-src], img[src]');
    images.forEach(img => {
      // Only add loading state if image hasn't loaded yet
      if (!img.complete || img.naturalHeight === 0) {
        this.addImageLoadingState(img);
      }
    });
  }

  /**
   * Create a retry handler for failed operations
   * @param {Function} operation - Operation to retry
   * @param {number} maxRetries - Maximum number of retries
   * @returns {Function} Retry function
   */
  createRetryHandler(operation, maxRetries = 3) {
    let retryCount = 0;

    return async function retry() {
      try {
        return await operation();
      } catch (error) {
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`Retry attempt ${retryCount} of ${maxRetries}`);
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          return retry();
        } else {
          throw new Error(`Operation failed after ${maxRetries} retries: ${error.message}`);
        }
      }
    };
  }

  /**
   * Check if initial render meets performance target
   * @returns {boolean} True if under 1.5 seconds
   */
  meetsPerformanceTarget() {
    if (!this.loadStartTime) return false;
    const loadTime = performance.now() - this.loadStartTime;
    return loadTime <= 1500;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LoadingStates;
}
