/**
 * Mobile Menu Handler
 * Manages mobile navigation menu toggle functionality
 * Requirements: Mobile menu functionality verification
 */

class MobileMenuHandler {
  constructor() {
    this.menuToggle = null;
    this.mainNav = null;
    this.isOpen = false;
    this.breakpoint = 768; // Mobile breakpoint
  }

  /**
   * Initialize mobile menu functionality
   */
  init() {
    // Create mobile menu toggle button if it doesn't exist
    this.createMenuToggle();
    
    // Get references to elements
    this.menuToggle = document.querySelector('.mobile-menu-toggle');
    this.mainNav = document.querySelector('.main-nav');
    
    if (!this.menuToggle || !this.mainNav) {
      console.warn('MobileMenuHandler: Required elements not found');
      return;
    }

    // Attach event listeners
    this.attachEventListeners();
    
    // Handle initial state
    this.handleResize();
    
    console.log('MobileMenuHandler: Initialized');
  }

  /**
   * Create mobile menu toggle button
   */
  createMenuToggle() {
    // Check if toggle already exists
    if (document.querySelector('.mobile-menu-toggle')) {
      return;
    }

    // Find header left section
    const headerLeft = document.querySelector('.header-left');
    if (!headerLeft) {
      console.warn('MobileMenuHandler: Header left section not found');
      return;
    }

    // Create toggle button
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = `
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;

    // Insert toggle button before logo
    headerLeft.insertBefore(toggle, headerLeft.firstChild);
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Toggle button click
    this.menuToggle.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Close menu when clicking nav links
    const navLinks = this.mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isOpen && window.innerWidth < this.breakpoint) {
          this.closeMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.mainNav.contains(e.target) && 
          !this.menuToggle.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
        this.menuToggle.focus();
      }
    });
  }

  /**
   * Toggle menu open/closed
   */
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /**
   * Open mobile menu
   */
  openMenu() {
    this.isOpen = true;
    this.mainNav.classList.add('open');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    
    // Toggle icons
    const menuIcon = this.menuToggle.querySelector('.menu-icon');
    const closeIcon = this.menuToggle.querySelector('.close-icon');
    if (menuIcon) menuIcon.style.display = 'none';
    if (closeIcon) closeIcon.style.display = 'block';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    // Focus first nav link for accessibility
    const firstLink = this.mainNav.querySelector('.nav-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  /**
   * Close mobile menu
   */
  closeMenu() {
    this.isOpen = false;
    this.mainNav.classList.remove('open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    
    // Toggle icons
    const menuIcon = this.menuToggle.querySelector('.menu-icon');
    const closeIcon = this.menuToggle.querySelector('.close-icon');
    if (menuIcon) menuIcon.style.display = 'block';
    if (closeIcon) closeIcon.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  /**
   * Handle window resize
   */
  handleResize() {
    const isMobile = window.innerWidth < this.breakpoint;
    
    // Show/hide toggle button based on viewport
    if (this.menuToggle) {
      this.menuToggle.style.display = isMobile ? 'flex' : 'none';
    }
    
    // Close menu if resizing to desktop
    if (!isMobile && this.isOpen) {
      this.closeMenu();
    }
    
    // Ensure nav is visible on desktop
    if (!isMobile && this.mainNav) {
      this.mainNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /**
   * Destroy mobile menu handler
   */
  destroy() {
    if (this.isOpen) {
      this.closeMenu();
    }
    
    // Remove toggle button
    if (this.menuToggle) {
      this.menuToggle.remove();
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileMenuHandler;
}

// Auto-initialize if DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.mobileMenuHandler = new MobileMenuHandler();
      window.mobileMenuHandler.init();
    });
  } else {
    window.mobileMenuHandler = new MobileMenuHandler();
    window.mobileMenuHandler.init();
  }
}
