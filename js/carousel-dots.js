/**
 * Carousel Dots - Navigation indicators for carousels
 */

class CarouselDots {
  constructor() {
    this.carousels = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupDots());
    } else {
      this.setupDots();
    }
  }

  setupDots() {
    const rows = document.querySelectorAll('.content-row');
    
    rows.forEach(row => {
      const dotsContainer = row.querySelector('.carousel-dots');
      const track = row.querySelector('.carousel-track');
      
      if (!dotsContainer || !track) return;
      
      const itemCount = parseInt(track.dataset.itemCount) || 0;
      if (itemCount <= 1) return;
      
      // Calculate number of pages based on visible cards
      const cardWidth = 280; // Default card width
      const gap = 16; // Gap between cards
      const trackWidth = track.offsetWidth;
      const cardsPerPage = Math.floor(trackWidth / (cardWidth + gap)) || 1;
      const pageCount = Math.ceil(itemCount / cardsPerPage);
      
      // Create dots
      for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Go to page ${i + 1}`);
        dot.dataset.page = i;
        
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => this.scrollToPage(track, i, cardsPerPage, cardWidth, gap));
        
        dotsContainer.appendChild(dot);
      }
      
      // Track scroll position to update active dot
      track.addEventListener('scroll', () => this.updateActiveDot(track, dotsContainer, cardsPerPage, cardWidth, gap));
      
      this.carousels.push({ track, dotsContainer, cardsPerPage, cardWidth, gap });
    });
  }

  scrollToPage(track, pageIndex, cardsPerPage, cardWidth, gap) {
    const scrollAmount = pageIndex * cardsPerPage * (cardWidth + gap);
    track.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  updateActiveDot(track, dotsContainer, cardsPerPage, cardWidth, gap) {
    const scrollLeft = track.scrollLeft;
    const currentPage = Math.round(scrollLeft / (cardsPerPage * (cardWidth + gap)));
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === currentPage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  refresh() {
    // Clear existing dots
    this.carousels = [];
    document.querySelectorAll('.carousel-dots').forEach(container => {
      container.innerHTML = '';
    });
    
    // Reinitialize
    this.setupDots();
  }
}

// Initialize
const carouselDots = new CarouselDots();

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.carouselDots = carouselDots;
}
