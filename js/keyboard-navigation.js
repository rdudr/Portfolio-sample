/**
 * KeyboardNavigationHandler - Comprehensive keyboard navigation for portfolio
 * Supports arrow keys, Enter/Space, Escape, Home/End, and Tab navigation
 * 
 * Requirements:
 * - 14.2: Arrow keys to navigate between cards
 * - 14.3: Enter/Space to activate cards
 * - 18.5: Escape to close detail pages
 * - Additional: Home/End keys for carousel navigation
 */

class KeyboardNavigationHandler {
  /**
   * Create a KeyboardNavigationHandler instance
   * @param {Router} router - Router instance for navigation
   * @param {ViewManager} viewManager - ViewManager instance for view state
   */
  constructor(router, viewManager) {
    this.router = router;
    this.viewManager = viewManager;
    this.isEnabled = true;
  }

  /**
   * Initialize keyboard navigation
   */
  init() {
    // Listen for keydown events at document level
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    console.log('KeyboardNavigationHandler initialized');
  }

  /**
   * Handle keydown events
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyDown(e) {
    if (!this.isEnabled) return;

    // Don't interfere with input fields
    if (this.isInputFocused()) return;

    const currentRoute = this.router.getCurrentRoute();
    
    // Handle different keys based on current view
    switch (e.key) {
      case 'ArrowRight':
        this.handleArrowRight(e);
        break;
      
      case 'ArrowLeft':
        this.handleArrowLeft(e);
        break;
      
      case 'ArrowDown':
        this.handleArrowDown(e);
        break;
      
      case 'ArrowUp':
        this.handleArrowUp(e);
        break;
      
      case 'Enter':
      case ' ':
        this.handleActivate(e);
        break;
      
      case 'Escape':
        this.handleEscape(e);
        break;
      
      case 'Home':
        this.handleHome(e);
        break;
      
      case 'End':
        this.handleEnd(e);
        break;
      
      case 'Tab':
        // Let browser handle Tab naturally, but ensure proper focus management
        this.handleTab(e);
        break;
    }
  }

  /**
   * Handle right arrow key
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleArrowRight(e) {
    const focusedCard = this.getFocusedCard();
    
    if (focusedCard) {
      e.preventDefault();
      this.focusNextCard(focusedCard);
    } else {
      // No card focused - focus first card in first row
      const firstCard = document.querySelector('.content-card');
      if (firstCard) {
        e.preventDefault();
        firstCard.focus();
      }
    }
  }

  /**
   * Handle left arrow key
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleArrowLeft(e) {
    const focusedCard = this.getFocusedCard();
    
    if (focusedCard) {
      e.preventDefault();
      this.focusPreviousCard(focusedCard);
    }
  }

  /**
   * Handle down arrow key
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleArrowDown(e) {
    const focusedCard = this.getFocusedCard();
    
    if (focusedCard) {
      e.preventDefault();
      this.focusCardInNextRow(focusedCard);
    } else {
      // No card focused - focus first card
      const firstCard = document.querySelector('.content-card');
      if (firstCard) {
        e.preventDefault();
        firstCard.focus();
      }
    }
  }

  /**
   * Handle up arrow key
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleArrowUp(e) {
    const focusedCard = this.getFocusedCard();
    
    if (focusedCard) {
      e.preventDefault();
      this.focusCardInPreviousRow(focusedCard);
    }
  }

  /**
   * Handle Enter or Space key to activate focused element
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleActivate(e) {
    const focusedCard = this.getFocusedCard();
    
    if (focusedCard) {
      e.preventDefault();
      // Trigger click on the card
      focusedCard.click();
    } else {
      // Check if a button is focused
      const focusedButton = document.activeElement;
      if (focusedButton && (
        focusedButton.classList.contains('back-button') ||
        focusedButton.classList.contains('close-button') ||
        focusedButton.classList.contains('carousel-arrow')
      )) {
        e.preventDefault();
        focusedButton.click();
      }
    }
  }

  /**
   * Handle Escape key to close detail pages
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleEscape(e) {
    const currentRoute = this.router.getCurrentRoute();
    
    // If on detail page, navigate back to browse hub
    if (currentRoute && currentRoute.type === 'detail') {
      e.preventDefault();
      this.router.navigateBack();
    }
    
    // If search is focused, clear it
    const searchInput = document.querySelector('.search-input');
    if (searchInput && document.activeElement === searchInput) {
      e.preventDefault();
      searchInput.value = '';
      searchInput.blur();
      // Trigger input event to clear search results
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  /**
   * Handle Home key to jump to first card in carousel
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleHome(e) {
    const focusedCard = this.getFocusedCard();
    
    if (focusedCard) {
      e.preventDefault();
      const carousel = focusedCard.closest('.row-carousel');
      if (carousel) {
        const firstCard = carousel.querySelector('.content-card');
        if (firstCard) {
          firstCard.focus();
          this.scrollCardIntoView(firstCard);
        }
      }
    } else {
      // Jump to first card in first row
      const firstCard = document.querySelector('.content-card');
      if (firstCard) {
        e.preventDefault();
        firstCard.focus();
        this.scrollCardIntoView(firstCard);
      }
    }
  }

  /**
   * Handle End key to jump to last card in carousel
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleEnd(e) {
    const focusedCard = this.getFocusedCard();
    
    if (focusedCard) {
      e.preventDefault();
      const carousel = focusedCard.closest('.row-carousel');
      if (carousel) {
        const cards = carousel.querySelectorAll('.content-card');
        const lastCard = cards[cards.length - 1];
        if (lastCard) {
          lastCard.focus();
          this.scrollCardIntoView(lastCard);
        }
      }
    } else {
      // Jump to last card in first row
      const firstRow = document.querySelector('.row-carousel');
      if (firstRow) {
        const cards = firstRow.querySelectorAll('.content-card');
        const lastCard = cards[cards.length - 1];
        if (lastCard) {
          e.preventDefault();
          lastCard.focus();
          this.scrollCardIntoView(lastCard);
        }
      }
    }
  }

  /**
   * Handle Tab key for proper focus management
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleTab(e) {
    // Let browser handle Tab naturally
    // This method is here for potential future enhancements
  }

  /**
   * Focus next card in the same row
   * @param {HTMLElement} currentCard - Currently focused card
   */
  focusNextCard(currentCard) {
    const carousel = currentCard.closest('.row-carousel');
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll('.content-card'));
    const currentIndex = cards.indexOf(currentCard);
    
    if (currentIndex < cards.length - 1) {
      const nextCard = cards[currentIndex + 1];
      nextCard.focus();
      this.scrollCardIntoView(nextCard);
    } else {
      // At end of row - wrap to first card or move to next row
      const nextRow = this.getNextRow(carousel);
      if (nextRow) {
        const firstCardInNextRow = nextRow.querySelector('.content-card');
        if (firstCardInNextRow) {
          firstCardInNextRow.focus();
          this.scrollCardIntoView(firstCardInNextRow);
        }
      }
    }
  }

  /**
   * Focus previous card in the same row
   * @param {HTMLElement} currentCard - Currently focused card
   */
  focusPreviousCard(currentCard) {
    const carousel = currentCard.closest('.row-carousel');
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll('.content-card'));
    const currentIndex = cards.indexOf(currentCard);
    
    if (currentIndex > 0) {
      const previousCard = cards[currentIndex - 1];
      previousCard.focus();
      this.scrollCardIntoView(previousCard);
    } else {
      // At start of row - wrap to last card or move to previous row
      const previousRow = this.getPreviousRow(carousel);
      if (previousRow) {
        const cardsInPreviousRow = previousRow.querySelectorAll('.content-card');
        const lastCardInPreviousRow = cardsInPreviousRow[cardsInPreviousRow.length - 1];
        if (lastCardInPreviousRow) {
          lastCardInPreviousRow.focus();
          this.scrollCardIntoView(lastCardInPreviousRow);
        }
      }
    }
  }

  /**
   * Focus card in next row (same position if possible)
   * @param {HTMLElement} currentCard - Currently focused card
   */
  focusCardInNextRow(currentCard) {
    const currentCarousel = currentCard.closest('.row-carousel');
    if (!currentCarousel) return;

    const nextRow = this.getNextRow(currentCarousel);
    if (!nextRow) return;

    // Try to maintain same position in next row
    const currentCards = Array.from(currentCarousel.querySelectorAll('.content-card'));
    const currentIndex = currentCards.indexOf(currentCard);
    
    const nextRowCards = nextRow.querySelectorAll('.content-card');
    const targetIndex = Math.min(currentIndex, nextRowCards.length - 1);
    const targetCard = nextRowCards[targetIndex];
    
    if (targetCard) {
      targetCard.focus();
      this.scrollCardIntoView(targetCard);
    }
  }

  /**
   * Focus card in previous row (same position if possible)
   * @param {HTMLElement} currentCard - Currently focused card
   */
  focusCardInPreviousRow(currentCard) {
    const currentCarousel = currentCard.closest('.row-carousel');
    if (!currentCarousel) return;

    const previousRow = this.getPreviousRow(currentCarousel);
    if (!previousRow) return;

    // Try to maintain same position in previous row
    const currentCards = Array.from(currentCarousel.querySelectorAll('.content-card'));
    const currentIndex = currentCards.indexOf(currentCard);
    
    const previousRowCards = previousRow.querySelectorAll('.content-card');
    const targetIndex = Math.min(currentIndex, previousRowCards.length - 1);
    const targetCard = previousRowCards[targetIndex];
    
    if (targetCard) {
      targetCard.focus();
      this.scrollCardIntoView(targetCard);
    }
  }

  /**
   * Get next row carousel
   * @param {HTMLElement} currentCarousel - Current carousel element
   * @returns {HTMLElement|null} Next carousel or null
   */
  getNextRow(currentCarousel) {
    const currentRow = currentCarousel.closest('.content-row');
    if (!currentRow) return null;

    const nextRow = currentRow.nextElementSibling;
    if (!nextRow || !nextRow.classList.contains('content-row')) return null;

    return nextRow.querySelector('.row-carousel');
  }

  /**
   * Get previous row carousel
   * @param {HTMLElement} currentCarousel - Current carousel element
   * @returns {HTMLElement|null} Previous carousel or null
   */
  getPreviousRow(currentCarousel) {
    const currentRow = currentCarousel.closest('.content-row');
    if (!currentRow) return null;

    const previousRow = currentRow.previousElementSibling;
    if (!previousRow || !previousRow.classList.contains('content-row')) return null;

    return previousRow.querySelector('.row-carousel');
  }

  /**
   * Scroll card into view within its carousel
   * @param {HTMLElement} card - Card element to scroll into view
   */
  scrollCardIntoView(card) {
    const carousel = card.closest('.row-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    // Calculate card position relative to track
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const trackScrollLeft = track.scrollLeft;
    const trackWidth = track.offsetWidth;

    // Check if card is fully visible
    const cardRight = cardLeft + cardWidth;
    const visibleLeft = trackScrollLeft;
    const visibleRight = trackScrollLeft + trackWidth;

    // Scroll if card is not fully visible
    if (cardLeft < visibleLeft) {
      // Card is to the left - scroll left
      track.scrollTo({
        left: cardLeft - 20, // 20px padding
        behavior: 'smooth'
      });
    } else if (cardRight > visibleRight) {
      // Card is to the right - scroll right
      track.scrollTo({
        left: cardRight - trackWidth + 20, // 20px padding
        behavior: 'smooth'
      });
    }
  }

  /**
   * Get currently focused card
   * @returns {HTMLElement|null} Focused card or null
   */
  getFocusedCard() {
    const activeElement = document.activeElement;
    
    if (activeElement && activeElement.classList.contains('content-card')) {
      return activeElement;
    }
    
    return null;
  }

  /**
   * Check if an input field is currently focused
   * @returns {boolean} True if input is focused
   */
  isInputFocused() {
    const activeElement = document.activeElement;
    
    if (!activeElement) return false;
    
    const tagName = activeElement.tagName.toLowerCase();
    const isEditable = activeElement.isContentEditable;
    
    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      isEditable
    );
  }

  /**
   * Enable keyboard navigation
   */
  enable() {
    this.isEnabled = true;
  }

  /**
   * Disable keyboard navigation
   */
  disable() {
    this.isEnabled = false;
  }

  /**
   * Check if keyboard navigation is enabled
   * @returns {boolean} True if enabled
   */
  isNavigationEnabled() {
    return this.isEnabled;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KeyboardNavigationHandler;
}
