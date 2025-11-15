/**
 * ViewManager - Orchestrates view rendering and transitions
 * Manages the display of Browse Hub and Detail Pages
 */

class ViewManager {
  constructor(appContainer, dataStore, backNavigation = null) {
    this.appContainer = appContainer;
    this.dataStore = dataStore;
    this.currentView = null;
    this.backNavigation = backNavigation;
    this.loadingStates = window.NetflixPortfolioApp ? window.NetflixPortfolioApp.loadingStates() : null;
  }

  /**
   * Render the Browse Hub view
   * @param {string|null} filterCategory - Optional category slug to filter by
   */
  renderBrowseHub(filterCategory = null) {
    const categories = filterCategory 
      ? [this.dataStore.getBySlug(filterCategory)].filter(Boolean)
      : this.dataStore.getAll();

    const browseHubHTML = `
      <div class="browse-hub view-enter">
        ${this.renderHeroSection()}
        <div class="content-rows-container">
          ${categories.map(category => this.renderContentRow(category)).join('')}
        </div>
      </div>
    `;

    // Use fade transition with 500ms duration for Browse Hub
    this.transitionTo(browseHubHTML, () => {
      this.currentView = 'browse-hub';
      this.initializeBrowseHubComponents();
    }, 500, 'fade');
  }

  /**
   * Render hero section
   * @returns {string} Hero section HTML
   */
  renderHeroSection() {
    return `
      <section class="hero-section">
        <div class="hero-background" style="background-image: url('assets/images/home photo.JPG')"></div>
        <div class="hero-content">
          <h1 class="hero-title">Rishabh Dangi</h1>
          <p class="hero-tagline">Electrical Engineer | IoT Security | Embedded Systems</p>
        </div>
      </section>
    `;
  }

  /**
   * Render a content row
   * @param {Object} category - Category object
   * @returns {string} Content row HTML
   */
  renderContentRow(category) {
    // Get the cover image from the first item in the category
    const coverImage = category.items && category.items.length > 0 ? category.items[0].image : '';
    
    return `
      <section class="content-row" data-category="${category.slug}" aria-labelledby="${category.slug}-heading">
        ${coverImage ? `<div class="section-backdrop" style="background-image: url('${coverImage}')"></div>` : ''}
        <div class="section-content">
          <h2 id="${category.slug}-heading" class="row-title">${category.title}</h2>
          <div class="row-carousel" role="region" aria-label="${category.title} items">
            <button class="carousel-arrow carousel-arrow-left" aria-label="Scroll left">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div class="carousel-track">
              ${category.items.map(item => this.renderContentCard(item, category.slug)).join('')}
            </div>
            <button class="carousel-arrow carousel-arrow-right" aria-label="Scroll right">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render a content card
   * @param {Object} item - Item object
   * @param {string} categorySlug - Category slug
   * @returns {string} Content card HTML
   */
  renderContentCard(item, categorySlug) {
    return `
      <article class="content-card" 
               data-category="${categorySlug}" 
               data-slug="${item.slug}"
               role="button"
               tabindex="0"
               aria-label="View details for ${item.title}">
        <div class="card-image-container">
          <img data-src="${item.thumbnail}" 
               alt="${item.title}" 
               class="card-image">
          <div class="card-overlay"></div>
        </div>
        <div class="card-info">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-subtitle">${item.subtitle || ''}</p>
          ${item.date ? `<p class="card-meta">${item.date}</p>` : ''}
        </div>
        <div class="card-hover-details">
          <p class="card-description">${item.shortDescription || ''}</p>
          <a href="#/${categorySlug}/${item.slug}" class="card-read-more">Read more →</a>
        </div>
      </article>
    `;
  }

  /**
   * Render detail page
   * @param {string} categorySlug - Category slug
   * @param {string} itemSlug - Item slug
   */
  renderDetailPage(categorySlug, itemSlug) {
    // Show loading state - Requirement 19.2
    if (this.loadingStates) {
      this.appContainer.innerHTML = this.loadingStates.createLoadingSpinner('large', 'Loading details...');
    }

    // Small delay to show loading state
    setTimeout(() => {
      const item = this.dataStore.getItem(categorySlug, itemSlug);
      
      if (!item) {
        this.renderNotFound();
        return;
      }

      this.renderDetailPageContent(item, categorySlug);
    }, 50);
  }

  /**
   * Render detail page content
   * @param {Object} item - Item data
   * @param {string} categorySlug - Category slug
   */
  renderDetailPageContent(item, categorySlug) {

    const detailPageHTML = `
      <div class="detail-page view-enter">
        <header class="detail-header">
          <button class="back-button" aria-label="Back to browse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back
          </button>
          <button class="close-button" aria-label="Close detail page">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>
        
        <section class="detail-hero">
          <div class="detail-hero-background loading" data-image="${item.image}"></div>
          <div class="detail-hero-overlay"></div>
          <div class="detail-hero-content">
            <h1 class="detail-title">${item.title}</h1>
            <p class="detail-subtitle">${item.subtitle || ''}</p>
          </div>
        </section>

        <div class="detail-content">
          <main class="detail-main">
            <section class="detail-description">
              <h2>About</h2>
              <p>${item.description}</p>
            </section>
            
            ${item.details ? this.renderDetailFields(item.details) : ''}
          </main>

          <aside class="detail-sidebar">
            ${item.date ? `<div class="detail-meta-item"><strong>Date:</strong> ${item.date}</div>` : ''}
            ${item.location ? `<div class="detail-meta-item"><strong>Location:</strong> ${item.location}</div>` : ''}
            ${item.tags ? `
              <div class="detail-tags">
                <strong>Tags:</strong>
                <div class="tag-list">
                  ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          </aside>
        </div>

        ${item.gallery ? this.renderGallery(item.gallery) : ''}
      </div>
    `;

    // Use slide transition with 600ms duration for Detail Page
    this.transitionTo(detailPageHTML, () => {
      this.currentView = 'detail';
      
      // Load hero image with loading state - Requirement 19.3
      const heroBackground = document.querySelector('.detail-hero-background');
      if (heroBackground && this.loadingStates) {
        const imageUrl = heroBackground.dataset.image;
        this.loadingStates.loadDetailPageImage(imageUrl, heroBackground);
      }
      
      this.initializeDetailPageComponents();
    }, 600, 'slide');
  }

  /**
   * Render detail fields
   * @param {Object} details - Details object
   * @returns {string} Detail fields HTML
   */
  renderDetailFields(details) {
    return `
      <section class="detail-fields">
        ${Object.entries(details).map(([key, value]) => `
          <div class="detail-field">
            <strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
            ${Array.isArray(value) ? value.join(', ') : value}
          </div>
        `).join('')}
      </section>
    `;
  }

  /**
   * Render image gallery
   * @param {Array} images - Array of image URLs
   * @returns {string} Gallery HTML
   */
  renderGallery(images) {
    return `
      <section class="detail-gallery">
        <h2>Gallery</h2>
        <div class="gallery-grid">
          ${images.map(img => `
            <img data-src="${img}" alt="Gallery image" class="gallery-image">
          `).join('')}
        </div>
      </section>
    `;
  }

  /**
   * Render 404 not found page
   * @param {string} route - The route that was not found
   */
  renderNotFound(route = '') {
    // Use error handler if available - Requirement 7.5
    let notFoundHTML;
    if (window.errorHandler) {
      notFoundHTML = `
        <div class="not-found view-enter">
          ${window.errorHandler.handle404(route, { redirectDelay: 3000, showRetry: true })}
        </div>
      `;
    } else if (this.loadingStates) {
      // Fallback to loading states error message
      notFoundHTML = `
        <div class="not-found view-enter">
          ${this.loadingStates.createErrorMessage(
            '404 - Not Found',
            "The page you're looking for doesn't exist.",
            () => { window.location.hash = '/'; }
          )}
        </div>
      `;
    } else {
      // Final fallback
      notFoundHTML = `
        <div class="not-found view-enter">
          <h1>404 - Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <button class="cta-button" onclick="window.location.hash = '/'">
            Return to Browse Hub
          </button>
        </div>
      `;
    }

    // Use fade transition with 400ms duration for 404 page
    this.transitionTo(notFoundHTML, () => {
      this.currentView = 'not-found';
    }, 400, 'fade');
  }

  /**
   * Transition to new view with animation
   * @param {string} newViewHTML - HTML for new view
   * @param {Function} callback - Callback after transition
   * @param {number} duration - Transition duration in ms (default: 500)
   * @param {string} transitionType - Type of transition: 'fade' or 'slide' (default: 'fade')
   */
  transitionTo(newViewHTML, callback, duration = 500, transitionType = 'fade') {
    const currentView = this.appContainer.firstElementChild;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.reducedMotionHandler 
      ? window.reducedMotionHandler.getPrefersReducedMotion() 
      : false;
    
    // Use instant transition if reduced motion is preferred
    const actualDuration = prefersReducedMotion ? 0 : duration;
    const exitDuration = prefersReducedMotion ? 0 : Math.floor(duration * 0.7);
    
    if (currentView) {
      // Determine exit animation class based on transition type
      const exitClass = transitionType === 'slide' ? 'view-exit-slide' : 'view-exit';
      
      // Add exit animation to current view (will be instant if reduced motion)
      currentView.classList.add(exitClass);
      
      // Wait for exit animation to complete before rendering new view
      setTimeout(() => {
        // Render new view
        this.appContainer.innerHTML = newViewHTML;
        
        // Scroll to top for new view
        window.scrollTo(0, 0);
        
        // Execute callback after new view is rendered
        if (callback) {
          // Small delay to ensure DOM is ready
          requestAnimationFrame(() => {
            callback();
          });
        }
      }, exitDuration);
    } else {
      // No current view, render immediately
      this.appContainer.innerHTML = newViewHTML;
      window.scrollTo(0, 0);
      
      if (callback) {
        requestAnimationFrame(() => {
          callback();
        });
      }
    }
  }

  /**
   * Initialize Browse Hub components (carousels, cards)
   */
  initializeBrowseHubComponents() {
    // Initialize row carousels
    document.querySelectorAll('.row-carousel').forEach(carousel => {
      this.initializeRowCarousel(carousel);
    });

    // Attach card click handlers
    document.querySelectorAll('.content-card').forEach(card => {
      this.attachCardClickHandler(card);
    });

    // Reinitialize search component if it exists
    if (window.NetflixPortfolioApp && window.NetflixPortfolioApp.searchComponent) {
      const searchComp = window.NetflixPortfolioApp.searchComponent();
      if (searchComp) {
        searchComp.init();
      }
    }

    // Reinitialize category filter if it exists
    if (window.NetflixPortfolioApp && window.NetflixPortfolioApp.categoryFilter) {
      const catFilter = window.NetflixPortfolioApp.categoryFilter();
      if (catFilter) {
        catFilter.reinitialize();
      }
    }

    // Refresh lazy image loader to observe new images
    if (window.NetflixPortfolioApp && window.NetflixPortfolioApp.lazyImageLoader) {
      const lazyLoader = window.NetflixPortfolioApp.lazyImageLoader();
      if (lazyLoader) {
        lazyLoader.refresh();
      }
    }

    // Reinitialize preload manager for new cards and carousels
    if (window.NetflixPortfolioApp && window.NetflixPortfolioApp.preloadManager) {
      const preloadMgr = window.NetflixPortfolioApp.preloadManager();
      if (preloadMgr) {
        preloadMgr.init(this.appContainer);
      }
    }
  }

  /**
   * Initialize row carousel
   * @param {HTMLElement} carousel - Carousel element
   */
  initializeRowCarousel(carousel) {
    // Create RowCarousel instance and initialize
    const rowCarousel = new RowCarousel(carousel);
    rowCarousel.init();
    
    // Store reference for potential cleanup later
    if (!this.carousels) {
      this.carousels = [];
    }
    this.carousels.push(rowCarousel);
  }

  /**
   * Attach click handler to content card
   * @param {HTMLElement} card - Card element
   */
  attachCardClickHandler(card) {
    const categorySlug = card.dataset.category;
    const itemSlug = card.dataset.slug;

    card.addEventListener('click', () => {
      window.location.hash = `/${categorySlug}/${itemSlug}`;
    });

    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.hash = `/${categorySlug}/${itemSlug}`;
      }
    });
  }

  /**
   * Initialize detail page components
   */
  initializeDetailPageComponents() {
    // Use BackNavigation to set up buttons if available
    if (this.backNavigation) {
      this.backNavigation.initializeDetailPageButtons();
    } else {
      // Fallback: direct navigation
      const backButton = document.querySelector('.back-button');
      const closeButton = document.querySelector('.close-button');

      if (backButton) {
        backButton.addEventListener('click', () => {
          window.location.hash = '/';
        });
      }

      if (closeButton) {
        closeButton.addEventListener('click', () => {
          window.location.hash = '/';
        });
      }
    }

    // Initialize touch handler for vertical swipe-down to close
    this.initializeDetailPageTouchHandler();

    // Refresh lazy image loader to observe new images in detail page
    if (window.NetflixPortfolioApp && window.NetflixPortfolioApp.lazyImageLoader) {
      const lazyLoader = window.NetflixPortfolioApp.lazyImageLoader();
      if (lazyLoader) {
        lazyLoader.refresh();
      }
    }

    // Observe images for loading states - Requirement 19.3
    if (this.loadingStates) {
      this.loadingStates.observeImages(document.querySelector('.detail-page'));
    }
  }

  /**
   * Initialize TouchHandler for detail page
   */
  initializeDetailPageTouchHandler() {
    const detailPage = document.querySelector('.detail-page');
    
    if (detailPage && typeof TouchHandler !== 'undefined') {
      // Clean up previous touch handler if exists
      if (this.detailPageTouchHandler) {
        this.detailPageTouchHandler.destroy();
      }

      this.detailPageTouchHandler = new TouchHandler(detailPage, {
        type: 'detail-page',
        swipeThreshold: 80,
        velocityThreshold: 0.8,
        onSwipeDown: () => {
          // Navigate back to browse hub on swipe down
          window.location.hash = '/';
        }
      });
      this.detailPageTouchHandler.init();
    }
  }

  /**
   * Get current view
   * @returns {string} Current view name
   */
  getCurrentView() {
    return this.currentView;
  }

  /**
   * Set back navigation handler
   * @param {BackNavigation} backNavigation - BackNavigation instance
   */
  setBackNavigation(backNavigation) {
    this.backNavigation = backNavigation;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ViewManager;
}
