/**
 * Main Application Initialization
 * Handles image lazy loading, error handling, and application setup
 */

(function() {
  'use strict';

  /**
   * Load an image with onload and onerror handlers
   * @param {HTMLElement} imgElement - The image element to load
   * @param {string} src - The image source URL
   * @returns {Promise} Promise that resolves when image loads or rejects on error
   */
  function loadImage(imgElement, src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        imgElement.src = src;
        imgElement.classList.add('loaded');
        imgElement.classList.remove('loading');
        resolve(imgElement);
      };
      
      img.onerror = () => {
        imgElement.classList.add('error');
        imgElement.classList.remove('loading');
        // Apply fallback styling - the CSS will handle the visual appearance
        console.warn(`Failed to load image: ${src}`);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      // Start loading
      imgElement.classList.add('loading');
      img.src = src;
    });
  }

  /**
   * Load background image for hero panels with error handling
   * @param {HTMLElement} bgElement - The background element
   * @param {string} imageUrl - The background image URL
   */
  function loadBackgroundImage(bgElement, imageUrl) {
    const img = new Image();
    
    img.onload = () => {
      bgElement.style.backgroundImage = `url('${imageUrl}')`;
      bgElement.classList.add('loaded');
      bgElement.classList.remove('loading');
    };
    
    img.onerror = () => {
      bgElement.classList.add('error');
      bgElement.classList.remove('loading');
      // Fallback background color will be applied via CSS
      console.warn(`Failed to load background image: ${imageUrl}`);
    };
    
    bgElement.classList.add('loading');
    img.src = imageUrl;
  }

  /**
   * Initialize lazy loading for images below the fold
   * Uses Intersection Observer API for efficient lazy loading
   */
  function initLazyLoading() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load all images immediately
      loadAllImages();
      return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src') || img.src;
          
          if (img.classList.contains('carousel-image') || img.classList.contains('card-image')) {
            // For carousel and card images
            if (!img.classList.contains('loaded') && !img.classList.contains('error')) {
              loadImage(img, src).catch(() => {
                // Error already handled in loadImage
              });
            }
          }
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      root: null,
      rootMargin: '50px', // Start loading 50px before entering viewport
      threshold: 0.01
    });

    // Observe all carousel and card images
    const images = document.querySelectorAll('.carousel-image, .card-image');
    images.forEach(img => {
      imageObserver.observe(img);
    });

    // Handle background images separately
    const backgroundObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bgElement = entry.target;
          const bgImage = bgElement.style.backgroundImage;
          
          if (bgImage && !bgElement.classList.contains('loaded') && !bgElement.classList.contains('error')) {
            // Extract URL from background-image style
            const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (urlMatch && urlMatch[1]) {
              loadBackgroundImage(bgElement, urlMatch[1]);
            }
          }
          
          observer.unobserve(bgElement);
        }
      });
    }, {
      root: null,
      rootMargin: '100px', // Start loading backgrounds earlier
      threshold: 0.01
    });

    // Observe all hero backgrounds
    const backgrounds = document.querySelectorAll('.hero-background');
    backgrounds.forEach(bg => {
      backgroundObserver.observe(bg);
    });
  }

  /**
   * Fallback: Load all images immediately (for browsers without Intersection Observer)
   */
  function loadAllImages() {
    const images = document.querySelectorAll('.carousel-image, .card-image');
    images.forEach(img => {
      const src = img.getAttribute('data-src') || img.src;
      if (!img.classList.contains('loaded') && !img.classList.contains('error')) {
        loadImage(img, src).catch(() => {
          // Error already handled
        });
      }
    });

    // Load all background images
    const backgrounds = document.querySelectorAll('.hero-background');
    backgrounds.forEach(bg => {
      const bgImage = bg.style.backgroundImage;
      if (bgImage && !bg.classList.contains('loaded') && !bg.classList.contains('error')) {
        const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (urlMatch && urlMatch[1]) {
          loadBackgroundImage(bg, urlMatch[1]);
        }
      }
    });
  }

  /**
   * Initialize the application
   */
  function init() {
    // Initialize lazy loading for images
    initLazyLoading();

    // Initialize carousel components (if not already initialized)
    if (window.CarouselModule && typeof window.CarouselModule.init === 'function') {
      window.CarouselModule.init();
    }

    // Initialize tab switcher (if not already initialized)
    if (window.NavigationModule && typeof window.NavigationModule.init === 'function') {
      window.NavigationModule.init();
    }

    console.log('Portfolio application initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for potential external use
  window.PortfolioApp = {
    loadImage,
    loadBackgroundImage,
    init
  };

})();
