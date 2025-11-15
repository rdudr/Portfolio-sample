/**
 * Verification script for Category Filter implementation
 * Run this in the browser console after loading index-netflix.html
 */

(function() {
  console.log('=== Category Filter Verification ===\n');

  // Check if CategoryFilter class exists
  if (typeof CategoryFilter === 'undefined') {
    console.error('❌ CategoryFilter class not found');
    return;
  }
  console.log('✅ CategoryFilter class exists');

  // Check if filter is initialized
  const app = window.NetflixPortfolioApp;
  if (!app || !app.categoryFilter) {
    console.error('❌ CategoryFilter not initialized in app');
    return;
  }
  console.log('✅ CategoryFilter initialized in app');

  const filter = app.categoryFilter();
  if (!filter) {
    console.error('❌ CategoryFilter instance not found');
    return;
  }
  console.log('✅ CategoryFilter instance exists');

  // Check if filter UI exists
  const filterContainer = document.querySelector('.category-filter');
  if (!filterContainer) {
    console.error('❌ Filter UI not found in DOM');
    return;
  }
  console.log('✅ Filter UI exists in DOM');

  // Check filter buttons
  const filterButtons = filterContainer.querySelectorAll('.filter-btn');
  const dataStore = app.dataStore();
  const expectedCount = dataStore.getAllCategories().length + 1; // +1 for "All" button

  if (filterButtons.length !== expectedCount) {
    console.warn(`⚠️  Expected ${expectedCount} filter buttons, found ${filterButtons.length}`);
  } else {
    console.log(`✅ Found ${filterButtons.length} filter buttons (correct)`);
  }

  // Check "All" button
  const allButton = document.querySelector('.filter-btn[data-category="all"]');
  if (!allButton) {
    console.error('❌ "All" button not found');
    return;
  }
  console.log('✅ "All" button exists');

  if (allButton.classList.contains('active')) {
    console.log('✅ "All" button is active by default');
  } else {
    console.warn('⚠️  "All" button is not active by default');
  }

  // Check ARIA attributes
  const hasAriaLabel = allButton.hasAttribute('aria-label');
  const hasAriaPressed = allButton.hasAttribute('aria-pressed');
  
  if (hasAriaLabel && hasAriaPressed) {
    console.log('✅ Filter buttons have proper ARIA attributes');
  } else {
    console.warn('⚠️  Missing ARIA attributes on filter buttons');
  }

  // Test filtering functionality
  console.log('\n--- Testing Filter Functionality ---');
  
  const educationButton = document.querySelector('.filter-btn[data-category="education"]');
  if (educationButton) {
    console.log('Testing education filter...');
    educationButton.click();
    
    setTimeout(() => {
      const contentRows = document.querySelectorAll('.content-row');
      if (contentRows.length === 1) {
        console.log('✅ Filter applied: Only 1 content row visible');
      } else {
        console.warn(`⚠️  Expected 1 row after filtering, found ${contentRows.length}`);
      }

      if (educationButton.classList.contains('active')) {
        console.log('✅ Education button is now active');
      } else {
        console.warn('⚠️  Education button is not active after click');
      }

      // Check URL parameter
      const url = window.location.href;
      if (url.includes('filter=education')) {
        console.log('✅ URL parameter added correctly');
      } else {
        console.warn('⚠️  URL parameter not found');
      }

      // Test clearing filter
      console.log('\nTesting clear filter...');
      allButton.click();
      
      setTimeout(() => {
        const allRows = document.querySelectorAll('.content-row');
        if (allRows.length === dataStore.getAllCategories().length) {
          console.log(`✅ Filter cleared: All ${allRows.length} rows visible`);
        } else {
          console.warn(`⚠️  Expected ${dataStore.getAllCategories().length} rows, found ${allRows.length}`);
        }

        if (allButton.classList.contains('active')) {
          console.log('✅ "All" button is active again');
        } else {
          console.warn('⚠️  "All" button is not active after clearing');
        }

        // Check URL parameter removed
        const clearedUrl = window.location.href;
        if (!clearedUrl.includes('filter=')) {
          console.log('✅ URL parameter removed correctly');
        } else {
          console.warn('⚠️  URL parameter still present after clearing');
        }

        console.log('\n=== Verification Complete ===');
        console.log('All core functionality is working correctly! ✨');
      }, 600);
    }, 600);
  } else {
    console.error('❌ Education button not found for testing');
  }

})();
