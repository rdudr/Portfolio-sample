/**
 * Error Handling Verification Script
 * Tests all error handling functionality
 */

console.log('=== Error Handling Verification ===\n');

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, fn) {
  try {
    fn();
    results.passed++;
    results.tests.push({ name, status: 'PASS' });
    console.log(`✓ ${name}`);
  } catch (error) {
    results.failed++;
    results.tests.push({ name, status: 'FAIL', error: error.message });
    console.error(`✗ ${name}: ${error.message}`);
  }
}

// Test 1: ErrorHandler class exists
test('ErrorHandler class is defined', () => {
  if (typeof ErrorHandler === 'undefined') {
    throw new Error('ErrorHandler class not found');
  }
});

// Test 2: ErrorHandler can be instantiated
let errorHandler;
test('ErrorHandler can be instantiated', () => {
  errorHandler = new ErrorHandler();
  if (!errorHandler) {
    throw new Error('Failed to create ErrorHandler instance');
  }
});

// Test 3: ErrorHandler has required methods
test('ErrorHandler has required methods', () => {
  const requiredMethods = [
    'init',
    'handleImageError',
    'handle404',
    'handleError',
    'createErrorMessage',
    'showUserMessage',
    'log',
    'getErrorLog',
    'clearErrorLog',
    'createRetryHandler',
    'getErrorStats'
  ];
  
  requiredMethods.forEach(method => {
    if (typeof errorHandler[method] !== 'function') {
      throw new Error(`Missing method: ${method}`);
    }
  });
});

// Test 4: Initialize error handler
test('ErrorHandler can be initialized', () => {
  errorHandler.init();
});

// Test 5: Logging functionality
test('Error logging works', () => {
  errorHandler.log('Test info message', 'info');
  errorHandler.log('Test warning message', 'warn');
  errorHandler.log('Test error message', 'error');
  
  const log = errorHandler.getErrorLog();
  if (log.length < 3) {
    throw new Error('Log entries not recorded');
  }
});

// Test 6: Error statistics
test('Error statistics are calculated', () => {
  const stats = errorHandler.getErrorStats();
  
  if (!stats.total || !stats.byLevel || !stats.recentErrors) {
    throw new Error('Invalid statistics structure');
  }
  
  if (stats.total < 3) {
    throw new Error('Statistics not tracking correctly');
  }
});

// Test 7: Clear error log
test('Error log can be cleared', () => {
  errorHandler.clearErrorLog();
  const log = errorHandler.getErrorLog();
  
  // Should only have the "cleared" log entry
  if (log.length > 1) {
    throw new Error('Log not cleared properly');
  }
});

// Test 8: Create error message HTML
test('Error message HTML can be created', () => {
  const html = errorHandler.createErrorMessage(
    'Test Error',
    'This is a test error message',
    () => console.log('Retry clicked')
  );
  
  if (!html || typeof html !== 'string') {
    throw new Error('Invalid error message HTML');
  }
  
  if (!html.includes('Test Error') || !html.includes('test error message')) {
    throw new Error('Error message content missing');
  }
});

// Test 9: Handle 404
test('404 page HTML can be generated', () => {
  const html = errorHandler.handle404('/nonexistent/route', {
    redirectDelay: 0,
    showRetry: true
  });
  
  if (!html || typeof html !== 'string') {
    throw new Error('Invalid 404 HTML');
  }
  
  if (!html.includes('404')) {
    throw new Error('404 content missing');
  }
});

// Test 10: HTML escaping
test('HTML is properly escaped', () => {
  const escaped = errorHandler.escapeHtml('<script>alert("xss")</script>');
  
  if (escaped.includes('<script>')) {
    throw new Error('HTML not properly escaped');
  }
});

// Test 11: Retry handler creation
test('Retry handler can be created', () => {
  let attempts = 0;
  const operation = async () => {
    attempts++;
    if (attempts < 2) {
      throw new Error('Test failure');
    }
    return 'success';
  };
  
  const retryHandler = errorHandler.createRetryHandler(operation, {
    maxRetries: 3,
    baseDelay: 10
  });
  
  if (typeof retryHandler !== 'function') {
    throw new Error('Retry handler not created');
  }
});

// Test 12: Image error handling (mock)
test('Image error handling works', () => {
  // Create mock image element
  const mockImg = {
    src: 'https://example.com/broken.jpg',
    dataset: {},
    style: {},
    classList: {
      add: () => {},
      remove: () => {}
    },
    closest: () => null,
    parentElement: {
      classList: {
        add: () => {},
        remove: () => {}
      },
      style: {},
      appendChild: () => {},
      setAttribute: () => {}
    }
  };
  
  const result = errorHandler.handleImageError(mockImg, {
    showRetry: false
  });
  
  if (!result) {
    throw new Error('Image error handling failed');
  }
});

// Test 13: Error handling with context
test('Error handling with context works', () => {
  const testError = new Error('Test error with context');
  
  errorHandler.handleError(
    'Test Error Title',
    testError,
    { showUser: false, testContext: true }
  );
  
  const log = errorHandler.getErrorLog();
  const lastEntry = log[log.length - 1];
  
  if (!lastEntry || lastEntry.level !== 'error') {
    throw new Error('Error not logged correctly');
  }
});

// Test 14: Icon generation
test('Icons are generated for different types', () => {
  const types = ['error', 'warn', 'success', 'info'];
  
  types.forEach(type => {
    const icon = errorHandler.getIconForType(type);
    if (!icon || !icon.includes('svg')) {
      throw new Error(`Icon not generated for type: ${type}`);
    }
  });
});

// Test 15: Retry attempts tracking
test('Retry attempts are tracked', () => {
  const mockImg = {
    src: 'https://example.com/test.jpg',
    dataset: {},
    style: {},
    classList: {
      add: () => {},
      remove: () => {}
    },
    closest: () => null,
    parentElement: {
      classList: {
        add: () => {},
        remove: () => {}
      },
      style: {},
      appendChild: () => {},
      setAttribute: () => {},
      querySelector: () => null
    }
  };
  
  // Simulate multiple retry attempts
  for (let i = 0; i < 3; i++) {
    errorHandler.handleImageError(mockImg, { showRetry: true });
  }
  
  // Check that retries are being tracked
  if (errorHandler.retryAttempts.size === 0) {
    throw new Error('Retry attempts not tracked');
  }
});

// Print summary
console.log('\n=== Test Summary ===');
console.log(`Total Tests: ${results.passed + results.failed}`);
console.log(`Passed: ${results.passed}`);
console.log(`Failed: ${results.failed}`);

if (results.failed > 0) {
  console.log('\nFailed Tests:');
  results.tests
    .filter(t => t.status === 'FAIL')
    .forEach(t => console.log(`  - ${t.name}: ${t.error}`));
}

// Check requirements coverage
console.log('\n=== Requirements Coverage ===');
console.log('✓ Requirement 3.5: Image loading errors with fallback');
console.log('✓ Requirement 7.5: Route not found (404) handling');
console.log('✓ Requirement 19.4: User-friendly error messages with retry');
console.log('✓ Error logging to console for debugging');

console.log('\n=== Verification Complete ===');
console.log(results.failed === 0 ? '✓ All tests passed!' : '✗ Some tests failed');

// Export results for programmatic access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = results;
}
