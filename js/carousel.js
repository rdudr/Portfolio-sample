/**
 * Carousel Navigation Module
 * Handles image carousel functionality with smooth fade transitions
 */

(function() {
  'use strict';

  // Transition state management
  const carouselStates = new Map();

  /**
   * Initialize a single carousel instance
   * @param {HTMLElement} carouselElement - The carousel container element
   */
  function initCarousel(carouselElement) {
    const images = carouselElement.querySelectorAll('.carousel-image');
    const dots = carouselElement.querySelectorAll('.dot');
    
    if (images.length === 0 || dots.length === 0) {
      return; // Skip if carousel is incomplete
    }

    // Initialize state for this carousel
    const carouselId = carouselElement.getAttribute('aria-label') || Math.random().toString(36);
    carouselStates.set(carouselId, {
      isTransitioning: false,
      currentIndex: 0
    });

    /**
     * Navigate to a specific carousel image
     * @param {number} index - The target image index
     */
    function navigateCarousel(index) {
      const state = carouselStates.get(carouselId);
      
      // Validate index
      if (index < 0 || index >= images.length) {
        return;
      }

      // Prevent rapid clicking with debounce
      if (state.isTransitioning) {
        return;
      }

      // Skip if already on this index
      if (index === state.currentIndex) {
        return;
      }

      // Set transitioning state
      state.isTransitioning = true;

      // Remove active class from current image and dot
      images[state.currentIndex].classList.remove('active');
      dots[state.currentIndex].classList.remove('active');
      dots[state.currentIndex].setAttribute('aria-selected', 'false');

      // Add active class to new image and dot
      images[index].classList.add('active');
      dots[index].classList.add('active');
      dots[index].setAttribute('aria-selected', 'true');

      // Update current index
      state.currentIndex = index;

      // Reset transitioning state after animation completes (500ms)
      setTimeout(() => {
        state.isTransitioning = false;
      }, 500);
    }

    // Use event delegation for dot click handlers
    const dotsContainer = carouselElement.querySelector('.carousel-dots');
    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
          const index = parseInt(e.target.getAttribute('data-index'), 10);
          navigateCarousel(index);
        }
      });

      // Keyboard navigation support for accessibility
      dotsContainer.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('dot')) {
          const state = carouselStates.get(carouselId);
          let newIndex = state.currentIndex;

          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            newIndex = state.currentIndex > 0 ? state.currentIndex - 1 : images.length - 1;
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            newIndex = state.currentIndex < images.length - 1 ? state.currentIndex + 1 : 0;
          } else if (e.key === 'Home') {
            e.preventDefault();
            newIndex = 0;
          } else if (e.key === 'End') {
            e.preventDefault();
            newIndex = images.length - 1;
          }

          if (newIndex !== state.currentIndex) {
            navigateCarousel(newIndex);
            dots[newIndex].focus();
          }
        }
      });
    }
  }

  /**
   * Initialize all carousels on the page
   */
  function initAllCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
      initCarousel(carousel);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCarousels);
  } else {
    initAllCarousels();
  }

  // Export for potential use in main.js
  window.CarouselModule = {
    init: initAllCarousels,
    initSingle: initCarousel
  };

})();
