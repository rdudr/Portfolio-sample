/**
 * Header Navigation - Active State Management
 * Highlights the current page in navigation
 */

(function() {
  'use strict';

  class HeaderNavigation {
    constructor() {
      this.navLinks = document.querySelectorAll('.nav-link');
      this.init();
    }

    init() {
      // Set initial active state
      this.updateActiveState();

      // Listen for hash changes
      window.addEventListener('hashchange', () => {
        this.updateActiveState();
      });

      // Listen for clicks on nav links
      this.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          // Remove active from all
          this.navLinks.forEach(l => l.classList.remove('active'));
          // Add active to clicked
          e.currentTarget.classList.add('active');
        });
      });

      console.log('HeaderNavigation initialized');
    }

    updateActiveState() {
      const hash = window.location.hash || '#/about-me';
      
      // Remove active from all links
      this.navLinks.forEach(link => link.classList.remove('active'));

      // Find matching link and set active
      this.navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Exact match
        if (href === hash) {
          link.classList.add('active');
          return;
        }

        // Partial match for detail pages (e.g., #/education/item)
        if (hash.startsWith(href + '/') && href !== '#/') {
          link.classList.add('active');
          return;
        }

        // Default to About Me if on home
        if (hash === '#/' && href === '#/about-me') {
          link.classList.add('active');
        }
      });
    }

    /**
     * Manually set active link by slug
     * @param {string} slug - Category slug
     */
    setActive(slug) {
      this.navLinks.forEach(link => {
        link.classList.remove('active');
        const dataNav = link.getAttribute('data-nav');
        if (dataNav === slug) {
          link.classList.add('active');
        }
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.headerNavigation = new HeaderNavigation();
    });
  } else {
    window.headerNavigation = new HeaderNavigation();
  }

})();
