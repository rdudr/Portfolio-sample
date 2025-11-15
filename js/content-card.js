/**
 * ContentCard - Individual card component for portfolio items
 * Handles rendering, interactions, and navigation for content cards
 */

class ContentCard {
  /**
   * Create a ContentCard instance
   * @param {Object} itemData - Portfolio item data
   * @param {string} categorySlug - Category slug for navigation
   */
  constructor(itemData, categorySlug) {
    this.itemData = itemData;
    this.categorySlug = categorySlug;
    this.element = null;
    this.preloadTimer = null;
  }

  /**
   * Render the card HTML element
   * @returns {HTMLElement} The card element
   */
  render() {
    // Create card article element
    const card = document.createElement('article');
    card.className = 'content-card';
    card.setAttribute('data-category', this.categorySlug);
    card.setAttribute('data-slug', this.itemData.slug);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${this.itemData.title}`);

    // Create image container with 16:9 aspect ratio
    const imageContainer = document.createElement('div');
    imageContainer.className = 'card-image-container';

    // Create image element with lazy loading
    const image = document.createElement('img');
    image.className = 'card-image';
    image.alt = this.itemData.title;
    image.loading = 'lazy';
    
    // Use thumbnail if available, otherwise use main image
    const imageSrc = this.itemData.thumbnail || this.itemData.image;
    
    if (imageSrc) {
      image.src = imageSrc;
      
      // Handle image load error with fallback - Requirement 3.5
      image.onerror = () => {
        // Use error handler if available
        if (window.errorHandler) {
          window.errorHandler.handleImageError(image, { 
            showRetry: false, // Don't show retry on cards to keep UI clean
            fallbackColor: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)'
          });
        } else {
          // Fallback error handling
          image.style.display = 'none';
          imageContainer.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)';
          imageContainer.setAttribute('data-error', 'true');
        }
      };
      
      // Handle successful image load
      image.onload = () => {
        image.classList.add('loaded');
      };
    } else {
      // No image available - use fallback background
      image.style.display = 'none';
      imageContainer.style.background = 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)';
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';

    // Append image and overlay to container
    imageContainer.appendChild(image);
    imageContainer.appendChild(overlay);

    // Create card info section
    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';

    // Card title
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = this.itemData.title;

    // Card subtitle (if available)
    const subtitle = document.createElement('p');
    subtitle.className = 'card-subtitle';
    subtitle.textContent = this.itemData.subtitle || '';

    // Card meta (date or other info)
    const meta = document.createElement('p');
    meta.className = 'card-meta';
    meta.textContent = this.itemData.date || this.itemData.location || '';

    // Append info elements
    cardInfo.appendChild(title);
    if (this.itemData.subtitle) {
      cardInfo.appendChild(subtitle);
    }
    if (this.itemData.date || this.itemData.location) {
      cardInfo.appendChild(meta);
    }

    // Create hover details overlay
    const hoverDetails = document.createElement('div');
    hoverDetails.className = 'card-hover-details';

    const description = document.createElement('p');
    description.className = 'card-description';
    description.textContent = this.itemData.shortDescription || this.itemData.description || '';

    hoverDetails.appendChild(description);

    // Assemble card
    card.appendChild(imageContainer);
    card.appendChild(cardInfo);
    card.appendChild(hoverDetails);

    // Store reference to element
    this.element = card;

    // Attach event listeners
    this.attachEventListeners();

    return card;
  }

  /**
   * Attach event listeners to the card
   */
  attachEventListeners() {
    if (!this.element) return;

    // Click event
    this.element.addEventListener('click', () => this.handleClick());

    // Keyboard navigation (Enter or Space)
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleClick();
      }
    });

    // Hover events for preloading (desktop only)
    if (!this.isTouchDevice()) {
      this.element.addEventListener('mouseenter', () => this.handleHover());
      this.element.addEventListener('mouseleave', () => this.cancelPreload());
    }

    // Focus events for accessibility
    this.element.addEventListener('focus', () => {
      this.element.classList.add('focused');
    });

    this.element.addEventListener('blur', () => {
      this.element.classList.remove('focused');
    });
  }

  /**
   * Handle card click - navigate to detail page
   */
  handleClick() {
    // Construct URL in format #/category-slug/item-slug
    const url = `/${this.categorySlug}/${this.itemData.slug}`;
    
    // Use router for navigation with proper history management
    if (window.router && typeof window.router.navigate === 'function') {
      // Router.navigate() will handle the hash, history, and transitions
      window.router.navigate(url);
    } else {
      // Fallback: direct hash update if router not available
      window.location.hash = url;
    }
  }

  /**
   * Handle hover - preload detail page content after delay
   */
  handleHover() {
    // Preload after 500ms hover delay
    this.preloadTimer = setTimeout(() => {
      this.preloadDetailPage();
    }, 500);
  }

  /**
   * Cancel preload if hover ends before delay
   */
  cancelPreload() {
    if (this.preloadTimer) {
      clearTimeout(this.preloadTimer);
      this.preloadTimer = null;
    }
  }

  /**
   * Preload detail page image
   */
  preloadDetailPage() {
    if (this.itemData.image && this.itemData.image !== this.itemData.thumbnail) {
      const img = new Image();
      img.src = this.itemData.image;
    }
  }

  /**
   * Check if device supports touch
   * @returns {boolean} True if touch device
   */
  isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  /**
   * Get the card element
   * @returns {HTMLElement} The card element
   */
  getElement() {
    return this.element;
  }

  /**
   * Destroy the card and clean up event listeners
   */
  destroy() {
    if (this.preloadTimer) {
      clearTimeout(this.preloadTimer);
    }
    
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentCard;
}
