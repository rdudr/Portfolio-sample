/**
 * PreloadManager - Manages preloading of images for faster navigation
 * Preloads detail page images on card hover and adjacent cards in carousels
 */

class PreloadManager {
  /**
   * Create a PreloadManager instance
   * @param {DataStore} dataStore - Reference to the data store
   */
  constructor(dataStore) {
    this.dataStore = dataStore;
    this.preloadTimers = new Map(); // Track hover timers by card element
    this.preloadedImages = new Set(); // Track already preloaded images
    this.preloadDelay = 500; // 500ms hover delay before preloading
    this.adjacentCardsToPreload = 2; // Number of adjacent cards to preload
  }

  /**
   * Initialize preload manager and attach to cards
   * @param {HTMLElement} container - Container element with cards
   */
  init(container = document) {
    // Attach hover listeners to all content cards
    this.attachCardListeners(container);
    
    // Preload adjacent cards when carousel scrolls
    this.attachCarouselListeners(container);
  }

  /**
   * Attach hover listeners to content cards
   * @param {HTMLElement} container - Container element
   */
  attachCardListeners(container) {
    const cards = container.querySelectorAll('.content-card');
    
    cards.forEach(card => {
      // Only attach to non-touch devices
      if (!this.isTouchDevice()) {
        card.addEventListener('mouseenter', () => this.handleCardHover(card));
        card.addEventListener('mouseleave', () => this.cancelCardPreload(card));
      }
    });
  }

  /**
   * Attach scroll listeners to carousels for adjacent card preloading
   * @param {HTMLElement} container - Container element
   */
  attachCarouselListeners(container) {
    const carousels = container.querySelectorAll('.carousel-track');
    
    carousels.forEach(carousel => {
      // Throttle scroll events to avoid excessive preloading
      let scrollTimeout;
      carousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          this.preloadAdjacentCards(carousel);
        }, 200);
      });
      
      // Initial preload of visible and adjacent cards
      this.preloadAdjacentCards(carousel);
    });
  }

  /**
   * Handle card hover - start preload timer
   * @param {HTMLElement} card - Card element
   */
  handleCardHover(card) {
    const categorySlug = card.getAttribute('data-category');
    const itemSlug = card.getAttribute('data-slug');
    
    if (!categorySlug || !itemSlug) return;

    // Start timer for delayed preload
    const timer = setTimeout(() => {
      this.preloadDetailPageImage(categorySlug, itemSlug);
      this.preloadTimers.delete(card);
    }, this.preloadDelay);

    // Store timer reference
    this.preloadTimers.set(card, timer);
  }

  /**
   * Cancel preload if hover ends before delay
   * @param {HTMLElement} card - Card element
   */
  cancelCardPreload(card) {
    const timer = this.preloadTimers.get(card);
    
    if (timer) {
      clearTimeout(timer);
      this.preloadTimers.delete(card);
    }
  }

  /**
   * Preload detail page image for a specific item
   * @param {string} categorySlug - Category slug
   * @param {string} itemSlug - Item slug
   */
  preloadDetailPageImage(categorySlug, itemSlug) {
    const item = this.dataStore.getItem(categorySlug, itemSlug);
    
    if (!item || !item.image) return;

    // Skip if already preloaded
    if (this.preloadedImages.has(item.image)) return;

    // Preload the full-size image (not thumbnail)
    const img = new Image();
    img.src = item.image;
    
    // Mark as preloaded
    this.preloadedImages.add(item.image);
    
    // Optional: Preload gallery images if they exist
    if (item.gallery && Array.isArray(item.gallery)) {
      item.gallery.forEach(galleryImage => {
        if (!this.preloadedImages.has(galleryImage)) {
          const galleryImg = new Image();
          galleryImg.src = galleryImage;
          this.preloadedImages.add(galleryImage);
        }
      });
    }
  }

  /**
   * Preload adjacent cards in carousel
   * @param {HTMLElement} carousel - Carousel track element
   */
  preloadAdjacentCards(carousel) {
    const cards = Array.from(carousel.querySelectorAll('.content-card'));
    if (cards.length === 0) return;

    // Find visible cards
    const visibleCards = this.getVisibleCards(carousel, cards);
    
    // Preload adjacent cards (before and after visible range)
    visibleCards.forEach(visibleCard => {
      const index = cards.indexOf(visibleCard);
      
      // Preload cards before
      for (let i = 1; i <= this.adjacentCardsToPreload; i++) {
        const prevIndex = index - i;
        if (prevIndex >= 0) {
          this.preloadCardImage(cards[prevIndex]);
        }
      }
      
      // Preload cards after
      for (let i = 1; i <= this.adjacentCardsToPreload; i++) {
        const nextIndex = index + i;
        if (nextIndex < cards.length) {
          this.preloadCardImage(cards[nextIndex]);
        }
      }
    });
  }

  /**
   * Get visible cards in carousel viewport
   * @param {HTMLElement} carousel - Carousel track element
   * @param {Array} cards - Array of card elements
   * @returns {Array} Array of visible card elements
   */
  getVisibleCards(carousel, cards) {
    const carouselRect = carousel.getBoundingClientRect();
    const visibleCards = [];

    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      
      // Check if card is at least partially visible
      const isVisible = (
        cardRect.right > carouselRect.left &&
        cardRect.left < carouselRect.right
      );
      
      if (isVisible) {
        visibleCards.push(card);
      }
    });

    return visibleCards;
  }

  /**
   * Preload thumbnail image for a card
   * @param {HTMLElement} card - Card element
   */
  preloadCardImage(card) {
    const categorySlug = card.getAttribute('data-category');
    const itemSlug = card.getAttribute('data-slug');
    
    if (!categorySlug || !itemSlug) return;

    const item = this.dataStore.getItem(categorySlug, itemSlug);
    if (!item) return;

    // Preload thumbnail if not already loaded
    const thumbnailSrc = item.thumbnail || item.image;
    if (thumbnailSrc && !this.preloadedImages.has(thumbnailSrc)) {
      const img = new Image();
      img.src = thumbnailSrc;
      this.preloadedImages.add(thumbnailSrc);
    }
  }

  /**
   * Preload all images for a specific category
   * @param {string} categorySlug - Category slug
   */
  preloadCategory(categorySlug) {
    const category = this.dataStore.getBySlug(categorySlug);
    if (!category) return;

    category.items.forEach(item => {
      // Preload thumbnail
      const thumbnailSrc = item.thumbnail || item.image;
      if (thumbnailSrc && !this.preloadedImages.has(thumbnailSrc)) {
        const img = new Image();
        img.src = thumbnailSrc;
        this.preloadedImages.add(thumbnailSrc);
      }
    });
  }

  /**
   * Preload critical images (first row, hero, etc.)
   */
  preloadCriticalImages() {
    const categories = this.dataStore.getAll();
    
    // Preload first category's items (About Me)
    if (categories.length > 0) {
      this.preloadCategory(categories[0].slug);
    }
    
    // Preload first few items from second category (Education)
    if (categories.length > 1) {
      const secondCategory = categories[1];
      const itemsToPreload = Math.min(3, secondCategory.items.length);
      
      for (let i = 0; i < itemsToPreload; i++) {
        const item = secondCategory.items[i];
        const thumbnailSrc = item.thumbnail || item.image;
        
        if (thumbnailSrc && !this.preloadedImages.has(thumbnailSrc)) {
          const img = new Image();
          img.src = thumbnailSrc;
          this.preloadedImages.add(thumbnailSrc);
        }
      }
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
   * Clear all preload timers
   */
  clearAllTimers() {
    this.preloadTimers.forEach(timer => clearTimeout(timer));
    this.preloadTimers.clear();
  }

  /**
   * Reset preloaded images cache
   */
  resetCache() {
    this.preloadedImages.clear();
  }

  /**
   * Get preload statistics
   * @returns {Object} Statistics about preloaded images
   */
  getStats() {
    return {
      preloadedCount: this.preloadedImages.size,
      activeTimers: this.preloadTimers.size,
      preloadedImages: Array.from(this.preloadedImages)
    };
  }

  /**
   * Destroy the preload manager and clean up
   */
  destroy() {
    this.clearAllTimers();
    this.resetCache();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PreloadManager;
}
