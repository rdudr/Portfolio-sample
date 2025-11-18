/**
 * Hamburger Menu - Mobile Navigation
 * Handles sidebar menu toggle and interactions
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.getElementById('mobileMenuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !mainNav || !overlay) {
      console.warn('Hamburger menu elements not found');
      return;
    }

    // Toggle menu
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        closeMenu();
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Close menu if window is resized to desktop
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
          closeMenu();
        }
      }, 250);
    });

    function toggleMenu() {
      const isActive = mainNav.classList.contains('active');
      
      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function openMenu() {
      menuToggle.classList.add('active');
      mainNav.classList.add('active');
      overlay.classList.add('active');
      document.body.classList.add('menu-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      
      // Focus first nav link
      const firstLink = mainNav.querySelector('.nav-link');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 300);
      }
    }

    function closeMenu() {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    // Trap focus within menu when open
    mainNav.addEventListener('keydown', (e) => {
      if (!mainNav.classList.contains('active')) return;

      if (e.key === 'Tab') {
        const focusableElements = mainNav.querySelectorAll('.nav-link');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });

    // Touch swipe to close
    let touchStartX = 0;
    let touchEndX = 0;

    mainNav.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mainNav.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      // Swipe left to close
      if (touchStartX - touchEndX > 50) {
        closeMenu();
      }
    }
  }
})();
