/**
 * CategoryFilter - Manages category filtering functionality
 * Allows users to filter content by category
 */

class CategoryFilter {
  constructor(dataStore, viewManager, router) {
    this.dataStore = dataStore;
    this.viewManager = viewManager;
    this.router = router;
    this.filterContainer = null;
    this.activeFilter = null;
  }

  /**
   * Initialize category filter
   */
  init() {
    this.createFilterUI();
    this.attachEventListeners();
    this.restoreFilterFromURL();
  }

  /**
   * Create filter UI in header
   */
  createFilterUI() {
    const headerCenter = document.querySelector('.header-center');
    
    if (!headerCenter) {
      console.warn('Header center not found, cannot create filter UI');
      return;
    }

    // Check if filter already exists
    if (document.querySelector('.category-filter')) {
      return;
    }

    // Create filter container
    this.filterContainer = document.createElement('div');
    this.filterContainer.className = 'category-filter';
    this.filterContainer.setAttribute('role', 'navigation');
    this.filterContainer.setAttribute('aria-label', 'Category filter');

    // Get all categories
    const categories = this.dataStore.getAll();

    // Create "All" button
    const allButton = this.createFilterButton('all', 'All', true);
    this.filterContainer.appendChild(allButton);

    // Create category buttons
    categories.forEach(category => {
      const button = this.createFilterButton(category.slug, category.title, false);
      this.filterContainer.appendChild(button);
    });

    // Insert after main nav
    const mainNav = headerCenter.querySelector('.main-nav');
    if (mainNav) {
      mainNav.insertAdjacentElement('afterend', this.filterContainer);
    } else {
      headerCenter.appendChild(this.filterContainer);
    }
  }

  /**
   * Create a filter button
   * @param {string} slug - Category slug or 'all'
   * @param {string} label - Button label
   * @param {boolean} isActive - Whether button is active
   * @returns {HTMLElement} Button element
   */
  createFilterButton(slug, label, isActive) {
    const button = document.createElement('button');
    button.className = 'filter-btn';
    button.dataset.category = slug;
    button.textContent = label;
    button.setAttribute('aria-label', `Filter by ${label}`);
    
    if (isActive) {
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.setAttribute('aria-pressed', 'false');
    }

    return button;
  }

  /**
   * Attach event listeners to filter buttons
   */
  attachEventListeners() {
    if (!this.filterContainer) return;

    this.filterContainer.addEventListener('click', (e) => {
      const button = e.target.closest('.filter-btn');
      if (!button) return;

      const categorySlug = button.dataset.category;
      this.applyFilter(categorySlug);
    });
  }

  /**
   * Apply category filter
   * @param {string} categorySlug - Category slug to filter by, or 'all' to clear
   */
  applyFilter(categorySlug) {
    // Update active button
    this.updateActiveButton(categorySlug);

    // Update active filter
    this.activeFilter = categorySlug === 'all' ? null : categorySlug;

    // Update URL with query parameter
    this.updateURL(categorySlug);

    // Re-render browse hub with filter
    if (categorySlug === 'all') {
      this.viewManager.renderBrowseHub();
    } else {
      this.viewManager.renderBrowseHub(categorySlug);
    }

    // Save filter state for back navigation
    this.saveFilterState(categorySlug);
  }

  /**
   * Update active button state
   * @param {string} categorySlug - Active category slug
   */
  updateActiveButton(categorySlug) {
    if (!this.filterContainer) return;

    const buttons = this.filterContainer.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
      const isActive = button.dataset.category === categorySlug;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  /**
   * Update URL with filter query parameter
   * @param {string} categorySlug - Category slug
   */
  updateURL(categorySlug) {
    const currentHash = window.location.hash;
    const basePath = currentHash.split('?')[0] || '#/';

    if (categorySlug === 'all') {
      // Remove query parameter
      window.history.replaceState(null, '', basePath);
    } else {
      // Add query parameter
      window.history.replaceState(null, '', `${basePath}?filter=${categorySlug}`);
    }
  }

  /**
   * Restore filter from URL query parameter
   */
  restoreFilterFromURL() {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const filterParam = urlParams.get('filter');

    if (filterParam) {
      this.activeFilter = filterParam;
      this.updateActiveButton(filterParam);
    }
  }

  /**
   * Save filter state for back navigation
   * @param {string} categorySlug - Category slug
   */
  saveFilterState(categorySlug) {
    sessionStorage.setItem('categoryFilter', categorySlug);
  }

  /**
   * Get saved filter state
   * @returns {string|null} Saved category slug or null
   */
  getSavedFilterState() {
    return sessionStorage.getItem('categoryFilter');
  }

  /**
   * Clear filter state
   */
  clearFilterState() {
    sessionStorage.removeItem('categoryFilter');
  }

  /**
   * Get current active filter
   * @returns {string|null} Active category slug or null
   */
  getActiveFilter() {
    return this.activeFilter;
  }

  /**
   * Reinitialize filter UI (called after view changes)
   */
  reinitialize() {
    // Remove existing filter
    const existingFilter = document.querySelector('.category-filter');
    if (existingFilter) {
      existingFilter.remove();
    }

    // Recreate filter UI
    this.createFilterUI();
    this.attachEventListeners();

    // Restore active filter state
    if (this.activeFilter) {
      this.updateActiveButton(this.activeFilter);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CategoryFilter;
}
