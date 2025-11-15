/**
 * Navigation Module
 * Handles tab switcher functionality for the portfolio header
 */

(function() {
  'use strict';

  // Cache DOM references for performance
  let tabButtons = null;

  /**
   * Initialize the tab switcher
   */
  function initTabSwitcher() {
    // Cache tab button references
    tabButtons = document.querySelectorAll('.tab-btn');

    if (!tabButtons.length) {
      console.warn('No tab buttons found');
      return;
    }

    // Add click event handlers to each tab button
    tabButtons.forEach(button => {
      button.addEventListener('click', handleTabClick);
    });
  }

  /**
   * Handle tab button click
   * @param {Event} event - Click event
   */
  function handleTabClick(event) {
    const clickedButton = event.currentTarget;
    const tabType = clickedButton.dataset.tab;

    // Don't do anything if the clicked tab is already active
    if (clickedButton.classList.contains('active')) {
      return;
    }

    // Remove active state from all tabs
    tabButtons.forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    });

    // Add active state to clicked tab
    clickedButton.classList.add('active');
    clickedButton.setAttribute('aria-pressed', 'true');

    // Log tab change for debugging (can be removed in production)
    console.log(`Tab switched to: ${tabType}`);

    // Future enhancement: Filter content based on selected tab
    // This is a placeholder for future functionality
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabSwitcher);
  } else {
    initTabSwitcher();
  }

  // Expose public API if needed for testing or external access
  window.NavigationModule = {
    init: initTabSwitcher
  };

})();
