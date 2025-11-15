/**
 * SearchComponent - Real-time search functionality
 * Filters content rows based on search query
 */

class SearchComponent {
  constructor(dataStore, viewManager) {
    this.dataStore = dataStore;
    this.viewManager = viewManager;
    this.searchInput = null;
    this.debounceTimer = null;
    this.debounceDelay = 300; // 300ms debounce
    this.originalRowsState = new Map(); // Store original visibility state
  }

  /**
   * Initialize search component
   */
  init() {
    this.searchInput = document.querySelector('.search-input');
    
    if (!this.searchInput) {
      console.warn('Search input not found');
      return;
    }

    // Attach event listeners
    this.attachEventListeners();
  }

  /**
   * Attach event listeners to search input
   */
  attachEventListeners() {
    // Input event with debounce
    this.searchInput.addEventListener('input', (e) => {
      this.handleInput(e.target.value);
    });

    // Clear search on Escape key
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch();
      }
    });

    // Prevent form submission if wrapped in form
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  }

  /**
   * Handle search input with debounce
   * @param {string} query - Search query
   */
  handleInput(query) {
    // Clear previous debounce timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new debounce timer
    this.debounceTimer = setTimeout(() => {
      this.filterResults(query);
    }, this.debounceDelay);
  }

  /**
   * Filter content rows based on search query
   * @param {string} query - Search query
   */
  filterResults(query) {
    const normalizedQuery = this.sanitizeInput(query).toLowerCase().trim();

    // If query is empty, restore all rows
    if (!normalizedQuery) {
      this.restoreAllRows();
      return;
    }

    // Get all content rows
    const contentRows = document.querySelectorAll('.content-row');
    
    if (contentRows.length === 0) {
      return;
    }

    // Store original state if not already stored
    if (this.originalRowsState.size === 0) {
      contentRows.forEach(row => {
        this.originalRowsState.set(row, {
          display: row.style.display || '',
          cards: new Map()
        });
      });
    }

    // Filter each row
    contentRows.forEach(row => {
      const cards = row.querySelectorAll('.content-card');
      let hasVisibleCards = false;

      cards.forEach(card => {
        const categorySlug = card.dataset.category;
        const itemSlug = card.dataset.slug;
        
        // Get item data
        const item = this.dataStore.getItemBySlug(categorySlug, itemSlug);
        
        if (item && this.matchesQuery(item, normalizedQuery)) {
          // Show matching card
          card.style.display = '';
          card.classList.remove('search-hidden');
          hasVisibleCards = true;
          
          // Highlight matching text
          this.highlightMatches(card, normalizedQuery);
        } else {
          // Hide non-matching card
          card.style.display = 'none';
          card.classList.add('search-hidden');
        }
      });

      // Show/hide row based on whether it has visible cards
      if (hasVisibleCards) {
        row.style.display = '';
        row.classList.remove('search-hidden');
      } else {
        row.style.display = 'none';
        row.classList.add('search-hidden');
      }
    });

    // Show "no results" message if all rows are hidden
    this.updateNoResultsMessage(normalizedQuery);
  }

  /**
   * Check if item matches search query
   * @param {Object} item - Item object
   * @param {string} query - Normalized search query
   * @returns {boolean} True if item matches query
   */
  matchesQuery(item, query) {
    // Build searchable text from item properties
    const searchableFields = [
      item.title || '',
      item.subtitle || '',
      item.description || '',
      item.shortDescription || '',
      ...(item.tags || [])
    ];

    const searchableText = searchableFields.join(' ').toLowerCase();
    
    return searchableText.includes(query);
  }

  /**
   * Highlight matching text in card
   * @param {HTMLElement} card - Card element
   * @param {string} query - Search query
   */
  highlightMatches(card, query) {
    // Remove existing highlights
    const highlightedElements = card.querySelectorAll('.search-highlight');
    highlightedElements.forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });

    // Add new highlights to title and subtitle
    const title = card.querySelector('.card-title');
    const subtitle = card.querySelector('.card-subtitle');
    const description = card.querySelector('.card-description');

    if (title) {
      this.highlightTextNode(title, query);
    }
    if (subtitle) {
      this.highlightTextNode(subtitle, query);
    }
    if (description) {
      this.highlightTextNode(description, query);
    }
  }

  /**
   * Highlight text within a node
   * @param {HTMLElement} element - Element to highlight within
   * @param {string} query - Search query
   */
  highlightTextNode(element, query) {
    const text = element.textContent;
    const lowerText = text.toLowerCase();
    const index = lowerText.indexOf(query);

    if (index === -1) return;

    // Create highlighted version
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    element.innerHTML = '';
    
    if (before) {
      element.appendChild(document.createTextNode(before));
    }
    
    const highlight = document.createElement('span');
    highlight.className = 'search-highlight';
    highlight.textContent = match;
    element.appendChild(highlight);
    
    if (after) {
      // Recursively highlight remaining text
      const afterSpan = document.createElement('span');
      afterSpan.textContent = after;
      element.appendChild(afterSpan);
      this.highlightTextNode(afterSpan, query);
    }
  }

  /**
   * Update or show "no results" message
   * @param {string} query - Search query
   */
  updateNoResultsMessage(query) {
    const visibleRows = document.querySelectorAll('.content-row:not(.search-hidden)');
    const container = document.querySelector('.content-rows-container');
    
    if (!container) return;

    // Remove existing no results message
    const existingMessage = container.querySelector('.no-results-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Show message if no visible rows
    if (visibleRows.length === 0) {
      const message = document.createElement('div');
      message.className = 'no-results-message';
      message.innerHTML = `
        <div class="no-results-content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>No results found</h3>
          <p>No items match your search for "<strong>${this.sanitizeInput(query)}</strong>"</p>
          <button class="clear-search-button">Clear search</button>
        </div>
      `;
      
      container.appendChild(message);

      // Attach clear button handler
      const clearButton = message.querySelector('.clear-search-button');
      if (clearButton) {
        clearButton.addEventListener('click', () => {
          this.clearSearch();
        });
      }
    }
  }

  /**
   * Restore all rows to original state
   */
  restoreAllRows() {
    const contentRows = document.querySelectorAll('.content-row');
    
    contentRows.forEach(row => {
      row.style.display = '';
      row.classList.remove('search-hidden');

      const cards = row.querySelectorAll('.content-card');
      cards.forEach(card => {
        card.style.display = '';
        card.classList.remove('search-hidden');
        
        // Remove highlights
        const highlightedElements = card.querySelectorAll('.search-highlight');
        highlightedElements.forEach(el => {
          const parent = el.parentNode;
          parent.replaceChild(document.createTextNode(el.textContent), el);
          parent.normalize();
        });
      });
    });

    // Remove no results message
    const noResultsMessage = document.querySelector('.no-results-message');
    if (noResultsMessage) {
      noResultsMessage.remove();
    }

    // Clear stored state
    this.originalRowsState.clear();
  }

  /**
   * Clear search input and restore all rows
   */
  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchInput.focus();
    }
    
    this.restoreAllRows();
  }

  /**
   * Sanitize user input to prevent XSS
   * @param {string} input - User input
   * @returns {string} Sanitized input
   */
  sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  /**
   * Destroy search component and clean up
   */
  destroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    this.restoreAllRows();
    
    if (this.searchInput) {
      this.searchInput.value = '';
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchComponent;
}
