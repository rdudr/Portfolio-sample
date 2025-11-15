/**
 * ErrorHandler - Centralized error handling for the application
 * Requirements: 3.5, 7.5, 19.4
 * 
 * Handles:
 * - Image loading errors with fallback
 * - Route not found (404)
 * - User-friendly error messages
 * - Retry functionality for failed loads
 * - Error logging to console for debugging
 */

class ErrorHandler {
  constructor() {
    this.errorLog = [];
    this.maxLogSize = 100;
    this.retryAttempts = new Map();
    this.maxRetries = 3;
  }

  /**
   * Initialize error handler
   */
  init() {
    // Set up global error handlers
    this.setupGlobalErrorHandlers();
    
    // Log initialization
    this.log('ErrorHandler initialized', 'info');
  }

  /**
   * Set up global error handlers
   */
  setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(
        'Unhandled Promise Rejection',
        event.reason,
        { type: 'promise', event }
      );
    });

    // Handle global errors
    window.addEventListener('error', (event) => {
      // Skip if it's an image error (handled separately)
      if (event.target && event.target.tagName === 'IMG') {
        return;
      }
      
      this.handleError(
        'Global Error',
        event.error || event.message,
        { type: 'global', event }
      );
    });
  }

  /**
   * Handle image loading errors with fallback - Requirement 3.5
   * @param {HTMLImageElement} img - Image element that failed to load
   * @param {Object} options - Options for error handling
   * @returns {boolean} True if fallback was applied
   */
  handleImageError(img, options = {}) {
    if (!img || !(img instanceof HTMLImageElement)) {
      this.log('Invalid image element provided to handleImageError', 'warn');
      return false;
    }

    const src = img.src || img.dataset.src;
    const fallbackSrc = options.fallbackSrc || null;
    const fallbackColor = options.fallbackColor || 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)';
    const showRetry = options.showRetry !== false;

    // Log the error
    this.log(`Image failed to load: ${src}`, 'error', { src, element: img });

    // Get or create container
    const container = img.closest('.card-image-container') || 
                     img.closest('.detail-hero-background') ||
                     img.parentElement;

    if (!container) {
      this.log('No container found for failed image', 'warn');
      return false;
    }

    // Hide the broken image
    img.style.display = 'none';
    img.classList.add('image-error');

    // Try fallback image first
    if (fallbackSrc && !img.dataset.fallbackAttempted) {
      img.dataset.fallbackAttempted = 'true';
      img.src = fallbackSrc;
      img.style.display = '';
      return true;
    }

    // Apply fallback styling to container
    container.classList.add('card-image-error');
    container.style.background = fallbackColor;
    container.setAttribute('data-error', 'true');

    // Add error icon and retry button if requested
    if (showRetry && !container.querySelector('.image-error-overlay')) {
      const errorOverlay = this.createImageErrorOverlay(src, img);
      container.appendChild(errorOverlay);
    }

    return true;
  }

  /**
   * Create error overlay for failed images
   * @param {string} src - Original image source
   * @param {HTMLImageElement} img - Image element
   * @returns {HTMLElement} Error overlay element
   */
  createImageErrorOverlay(src, img) {
    const overlay = document.createElement('div');
    overlay.className = 'image-error-overlay';
    overlay.innerHTML = `
      <svg class="image-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
      <button class="image-retry-button" aria-label="Retry loading image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Retry
      </button>
    `;

    // Attach retry handler
    const retryButton = overlay.querySelector('.image-retry-button');
    if (retryButton) {
      retryButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.retryImageLoad(img, src, overlay);
      });
    }

    return overlay;
  }

  /**
   * Retry loading an image
   * @param {HTMLImageElement} img - Image element
   * @param {string} src - Image source to retry
   * @param {HTMLElement} errorOverlay - Error overlay to remove on success
   */
  retryImageLoad(img, src, errorOverlay) {
    const retryKey = `image:${src}`;
    const attempts = this.retryAttempts.get(retryKey) || 0;

    if (attempts >= this.maxRetries) {
      this.showUserMessage(
        'Unable to load image after multiple attempts',
        'error'
      );
      this.log(`Max retries reached for image: ${src}`, 'error');
      return;
    }

    // Increment retry count
    this.retryAttempts.set(retryKey, attempts + 1);
    this.log(`Retrying image load (attempt ${attempts + 1}): ${src}`, 'info');

    // Show loading state
    const container = img.parentElement;
    if (container) {
      container.classList.add('card-image-loading');
      container.classList.remove('card-image-error');
    }

    // Remove error overlay
    if (errorOverlay && errorOverlay.parentElement) {
      errorOverlay.remove();
    }

    // Reset image
    img.style.display = '';
    img.classList.remove('image-error');
    delete img.dataset.fallbackAttempted;

    // Attempt to reload with cache busting
    const cacheBuster = `?retry=${Date.now()}`;
    const newSrc = src.includes('?') ? `${src}&t=${Date.now()}` : src + cacheBuster;

    // Set up new handlers
    img.onload = () => {
      if (container) {
        container.classList.remove('card-image-loading');
        container.classList.add('card-image-loaded');
      }
      img.classList.add('loaded');
      this.retryAttempts.delete(retryKey);
      this.log(`Image loaded successfully after retry: ${src}`, 'info');
    };

    img.onerror = () => {
      this.handleImageError(img, { showRetry: true });
    };

    // Trigger reload
    img.src = newSrc;
  }

  /**
   * Handle route not found (404) - Requirement 7.5
   * @param {string} route - The route that was not found
   * @param {Object} options - Options for 404 handling
   * @returns {string} HTML for 404 page
   */
  handle404(route, options = {}) {
    const redirectDelay = options.redirectDelay || 3000;
    const showRetry = options.showRetry !== false;

    this.log(`404 - Route not found: ${route}`, 'warn', { route });

    const html = `
      <div class="error-page not-found-page">
        <div class="error-content">
          <svg class="error-icon error-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
          <h1 class="error-title">404 - Page Not Found</h1>
          <p class="error-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p class="error-submessage">
            ${redirectDelay > 0 ? `Redirecting to home in ${redirectDelay / 1000} seconds...` : ''}
          </p>
          <div class="error-actions">
            <button class="cta-button" onclick="window.location.hash = '/'">
              Return to Browse Hub
            </button>
            ${showRetry ? `
              <button class="secondary-button" onclick="window.location.reload()">
                Refresh Page
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Auto-redirect after delay
    if (redirectDelay > 0) {
      setTimeout(() => {
        if (window.location.hash.includes('404') || window.location.hash === route) {
          window.location.hash = '/';
        }
      }, redirectDelay);
    }

    return html;
  }

  /**
   * Handle general errors with user-friendly messages - Requirement 19.4
   * @param {string} title - Error title
   * @param {Error|string} error - Error object or message
   * @param {Object} context - Additional context
   */
  handleError(title, error, context = {}) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : null;

    // Log to console for debugging
    this.log(title, 'error', {
      message: errorMessage,
      stack: errorStack,
      context
    });

    // Show user-friendly message if appropriate
    if (context.showUser !== false) {
      this.showUserMessage(
        `${title}: ${errorMessage}`,
        'error'
      );
    }
  }

  /**
   * Create error message HTML with retry option
   * @param {string} title - Error title
   * @param {string} message - Error message
   * @param {Function} retryCallback - Optional retry callback
   * @returns {string} HTML string
   */
  createErrorMessage(title, message, retryCallback = null) {
    const retryId = retryCallback ? `retry-btn-${Date.now()}` : null;

    const html = `
      <div class="error-container">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2 class="error-title">${this.escapeHtml(title)}</h2>
        <p class="error-message">${this.escapeHtml(message)}</p>
        ${retryCallback ? `
          <button class="retry-button" id="${retryId}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            Try Again
          </button>
        ` : ''}
      </div>
    `;

    // Attach retry handler after DOM insertion
    if (retryCallback && retryId) {
      setTimeout(() => {
        const retryBtn = document.getElementById(retryId);
        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            this.log('User initiated retry', 'info');
            retryCallback();
          });
        }
      }, 0);
    }

    return html;
  }

  /**
   * Show user-friendly message (toast notification)
   * @param {string} message - Message to display
   * @param {string} type - Message type: 'info', 'warn', 'error', 'success'
   */
  showUserMessage(message, type = 'info') {
    // Remove existing toast if present
    const existingToast = document.querySelector('.error-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `error-toast error-toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    const icon = this.getIconForType(type);
    
    toast.innerHTML = `
      ${icon}
      <span class="error-toast-message">${this.escapeHtml(message)}</span>
      <button class="error-toast-close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    document.body.appendChild(toast);

    // Close button handler
    const closeBtn = toast.querySelector('.error-toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.classList.add('error-toast-exit');
        setTimeout(() => toast.remove(), 300);
      });
    }

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('error-toast-exit');
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }

  /**
   * Get icon SVG for message type
   * @param {string} type - Message type
   * @returns {string} SVG HTML
   */
  getIconForType(type) {
    const icons = {
      error: `<svg class="error-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>`,
      warn: `<svg class="error-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      success: `<svg class="error-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`,
      info: `<svg class="error-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>`
    };

    return icons[type] || icons.info;
  }

  /**
   * Log error to console and internal log - for debugging
   * @param {string} message - Log message
   * @param {string} level - Log level: 'info', 'warn', 'error'
   * @param {Object} data - Additional data to log
   */
  log(message, level = 'info', data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data
    };

    // Add to internal log
    this.errorLog.push(logEntry);

    // Trim log if too large
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    // Console output
    const consoleMessage = `[${timestamp}] ${message}`;
    
    switch (level) {
      case 'error':
        console.error(consoleMessage, data || '');
        break;
      case 'warn':
        console.warn(consoleMessage, data || '');
        break;
      case 'info':
      default:
        console.log(consoleMessage, data || '');
        break;
    }
  }

  /**
   * Get error log
   * @param {number} limit - Maximum number of entries to return
   * @returns {Array} Array of log entries
   */
  getErrorLog(limit = null) {
    if (limit) {
      return this.errorLog.slice(-limit);
    }
    return [...this.errorLog];
  }

  /**
   * Clear error log
   */
  clearErrorLog() {
    this.errorLog = [];
    this.log('Error log cleared', 'info');
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Create retry handler with exponential backoff
   * @param {Function} operation - Operation to retry
   * @param {Object} options - Retry options
   * @returns {Function} Retry function
   */
  createRetryHandler(operation, options = {}) {
    const maxRetries = options.maxRetries || this.maxRetries;
    const baseDelay = options.baseDelay || 1000;
    const maxDelay = options.maxDelay || 10000;

    return async (...args) => {
      let lastError;
      
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          return await operation(...args);
        } catch (error) {
          lastError = error;
          
          if (attempt < maxRetries) {
            // Calculate delay with exponential backoff
            const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
            
            this.log(
              `Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`,
              'info',
              { error: error.message }
            );
            
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      // All retries failed
      this.log(
        `Operation failed after ${maxRetries} retries`,
        'error',
        { error: lastError }
      );
      
      throw lastError;
    };
  }

  /**
   * Get error statistics
   * @returns {Object} Error statistics
   */
  getErrorStats() {
    const stats = {
      total: this.errorLog.length,
      byLevel: {
        error: 0,
        warn: 0,
        info: 0
      },
      recentErrors: this.errorLog.slice(-5)
    };

    this.errorLog.forEach(entry => {
      if (stats.byLevel[entry.level] !== undefined) {
        stats.byLevel[entry.level]++;
      }
    });

    return stats;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ErrorHandler;
}
