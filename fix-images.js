/**
 * Emergency Image Fix
 * Manually loads all images with data-src attribute
 * Use this if lazy loading isn't working
 */

(function() {
  'use strict';

  console.log('🔧 Image Fix Script Loading...');

  function loadAllImages() {
    // Find all images with data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    console.log(`Found ${lazyImages.length} images with data-src`);

    lazyImages.forEach((img, index) => {
      const src = img.dataset.src;
      
      if (src) {
        console.log(`Loading image ${index + 1}: ${src}`);
        
        // Set the src to load the image
        img.src = src;
        
        // Remove data-src attribute
        img.removeAttribute('data-src');
        
        // Add loaded class when image loads
        img.onload = function() {
          this.classList.add('loaded');
          console.log(`✓ Loaded: ${src}`);
        };
        
        // Handle errors
        img.onerror = function() {
          console.error(`✗ Failed to load: ${src}`);
          this.classList.add('error');
        };
      }
    });
  }

  // Run immediately
  loadAllImages();

  // Run again after a short delay (in case images are added dynamically)
  setTimeout(loadAllImages, 500);
  setTimeout(loadAllImages, 1000);
  setTimeout(loadAllImages, 2000);

  // Watch for new images being added
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        setTimeout(loadAllImages, 100);
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('✓ Image Fix Script Active');

  // Expose globally for manual triggering
  window.fixImages = loadAllImages;
})();
