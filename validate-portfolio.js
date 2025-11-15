/**
 * Portfolio Validation Script
 * Validates HTML, CSS, and JavaScript for cross-browser compatibility
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60) + '\n');
}

function logTest(name, passed, details = '') {
  const status = passed ? '✓ PASS' : '✗ FAIL';
  const color = passed ? 'green' : 'red';
  log(`${status} - ${name}`, color);
  if (details) {
    console.log(`  ${details}`);
  }
}

function logWarning(name, details = '') {
  log(`⚠ WARNING - ${name}`, 'yellow');
  if (details) {
    console.log(`  ${details}`);
  }
}

// Validation Results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: []
};

function addResult(name, passed, isWarning = false) {
  if (isWarning) {
    results.warnings++;
  } else if (passed) {
    results.passed++;
  } else {
    results.failed++;
  }
  results.tests.push({ name, passed, isWarning });
}

// HTML Validation
function validateHTML() {
  logSection('HTML Validation');

  const htmlFile = 'index-netflix.html';
  
  if (!fs.existsSync(htmlFile)) {
    logTest('HTML file exists', false, `${htmlFile} not found`);
    addResult('HTML file exists', false);
    return;
  }

  const html = fs.readFileSync(htmlFile, 'utf8');

  // Test 1: DOCTYPE
  const hasDoctype = html.trim().startsWith('<!DOCTYPE html>');
  logTest('DOCTYPE declaration', hasDoctype);
  addResult('DOCTYPE declaration', hasDoctype);

  // Test 2: HTML lang attribute
  const hasLang = /<html[^>]+lang=["'][^"']+["']/.test(html);
  logTest('HTML lang attribute', hasLang);
  addResult('HTML lang attribute', hasLang);

  // Test 3: Meta charset
  const hasCharset = html.includes('<meta charset="UTF-8">');
  logTest('Meta charset UTF-8', hasCharset);
  addResult('Meta charset UTF-8', hasCharset);

  // Test 4: Viewport meta
  const hasViewport = html.includes('name="viewport"');
  logTest('Viewport meta tag', hasViewport);
  addResult('Viewport meta tag', hasViewport);

  // Test 5: Title tag
  const hasTitle = /<title>.*<\/title>/.test(html);
  logTest('Title tag present', hasTitle);
  addResult('Title tag present', hasTitle);

  // Test 6: Semantic HTML5 elements
  const semanticElements = ['<header', '<main', '<footer', '<nav'];
  semanticElements.forEach(element => {
    const hasElement = html.includes(element);
    logTest(`Semantic element ${element}>`, hasElement);
    addResult(`Semantic element ${element}>`, hasElement);
  });

  // Test 7: ARIA attributes
  const hasAria = /aria-label|aria-labelledby|role=/.test(html);
  logTest('ARIA attributes present', hasAria);
  addResult('ARIA attributes present', hasAria);

  // Test 8: Alt attributes on images
  const imgTags = html.match(/<img[^>]*>/g) || [];
  const imgsWithAlt = imgTags.filter(img => /alt=["'][^"']*["']/.test(img)).length;
  const allImgsHaveAlt = imgTags.length === 0 || imgsWithAlt === imgTags.length;
  logTest(`Images with alt text (${imgsWithAlt}/${imgTags.length})`, allImgsHaveAlt);
  addResult('Images with alt text', allImgsHaveAlt);

  // Test 9: No inline styles (best practice)
  const hasInlineStyles = /style=["']/.test(html);
  if (hasInlineStyles) {
    logWarning('Inline styles detected', 'Consider moving to CSS files');
    addResult('No inline styles', false, true);
  } else {
    logTest('No inline styles', true);
    addResult('No inline styles', true);
  }

  // Test 10: Script tags at end of body
  const scriptBeforeBody = /<script[^>]*>[\s\S]*<\/body>/.test(html);
  logTest('Scripts before closing body tag', scriptBeforeBody);
  addResult('Scripts before closing body tag', scriptBeforeBody);
}

// CSS Validation
function validateCSS() {
  logSection('CSS Validation');

  const cssFiles = [
    'css/reset.css',
    'css/variables.css',
    'css/layout.css',
    'css/components.css',
    'css/animations.css',
    'css/performance.css',
    'css/loading-states.css',
    'css/error-handling.css',
    'css/mobile-optimization.css'
  ];

  cssFiles.forEach(file => {
    const exists = fs.existsSync(file);
    logTest(`CSS file: ${file}`, exists);
    addResult(`CSS file: ${file}`, exists);

    if (exists) {
      const css = fs.readFileSync(file, 'utf8');

      // Check for vendor prefixes (warning only)
      const hasVendorPrefixes = /-webkit-|-moz-|-ms-|-o-/.test(css);
      if (hasVendorPrefixes) {
        logWarning(`Vendor prefixes in ${file}`, 'Consider using autoprefixer');
        addResult(`No vendor prefixes in ${file}`, false, true);
      }

      // Check for !important (warning only)
      const hasImportant = /!important/.test(css);
      if (hasImportant) {
        logWarning(`!important usage in ${file}`, 'Try to avoid !important');
        addResult(`Minimal !important in ${file}`, false, true);
      }

      // Check for CSS custom properties
      if (file.includes('variables.css')) {
        const hasCustomProps = /--[a-z-]+:/.test(css);
        logTest('CSS custom properties defined', hasCustomProps);
        addResult('CSS custom properties defined', hasCustomProps);
      }
    }
  });
}

// JavaScript Validation
function validateJavaScript() {
  logSection('JavaScript Validation');

  const jsFiles = [
    'js/data.js',
    'js/router.js',
    'js/view-manager.js',
    'js/row-carousel.js',
    'js/error-handler.js',
    'js/loading-states.js',
    'js/lazy-loader.js',
    'js/preload-manager.js',
    'js/touch-handler.js',
    'js/keyboard-navigation.js',
    'js/search.js',
    'js/category-filter.js',
    'js/back-navigation.js',
    'js/mobile-menu.js',
    'js/main-netflix.js'
  ];

  jsFiles.forEach(file => {
    const exists = fs.existsSync(file);
    logTest(`JS file: ${file}`, exists);
    addResult(`JS file: ${file}`, exists);

    if (exists) {
      const js = fs.readFileSync(file, 'utf8');

      // Check for console.log (warning only)
      const hasConsoleLog = /console\.log\(/.test(js);
      if (hasConsoleLog) {
        logWarning(`console.log in ${file}`, 'Remove before production');
        addResult(`No console.log in ${file}`, false, true);
      }

      // Check for strict mode
      const hasStrictMode = /'use strict'|"use strict"/.test(js);
      if (!hasStrictMode && js.trim().length > 0) {
        logWarning(`No strict mode in ${file}`, 'Consider adding "use strict"');
        addResult(`Strict mode in ${file}`, false, true);
      }

      // Check for ES6+ features
      const hasES6 = /const |let |=>|class /.test(js);
      if (hasES6) {
        logTest(`ES6+ syntax in ${file}`, true);
        addResult(`ES6+ syntax in ${file}`, true);
      }

      // Check for error handling
      const hasErrorHandling = /try|catch|throw/.test(js);
      if (hasErrorHandling) {
        logTest(`Error handling in ${file}`, true);
        addResult(`Error handling in ${file}`, true);
      }
    }
  });
}

// File Structure Validation
function validateFileStructure() {
  logSection('File Structure Validation');

  const requiredDirs = ['css', 'js', 'assets'];
  requiredDirs.forEach(dir => {
    const exists = fs.existsSync(dir);
    logTest(`Directory: ${dir}/`, exists);
    addResult(`Directory: ${dir}/`, exists);
  });

  const requiredFiles = [
    'index-netflix.html',
    'README-NETFLIX.md'
  ];
  requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    logTest(`File: ${file}`, exists);
    addResult(`File: ${file}`, exists);
  });
}

// Performance Checks
function validatePerformance() {
  logSection('Performance Checks');

  // Check CSS file sizes
  const cssFiles = fs.readdirSync('css').filter(f => f.endsWith('.css'));
  cssFiles.forEach(file => {
    const filePath = path.join('css', file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const isOptimal = stats.size < 50000; // 50KB
    
    if (isOptimal) {
      logTest(`${file} size (${sizeKB}KB)`, true);
      addResult(`${file} size optimal`, true);
    } else {
      logWarning(`${file} size (${sizeKB}KB)`, 'Consider minification');
      addResult(`${file} size optimal`, false, true);
    }
  });

  // Check JS file sizes
  const jsFiles = fs.readdirSync('js').filter(f => f.endsWith('.js'));
  jsFiles.forEach(file => {
    const filePath = path.join('js', file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const isOptimal = stats.size < 100000; // 100KB
    
    if (isOptimal) {
      logTest(`${file} size (${sizeKB}KB)`, true);
      addResult(`${file} size optimal`, true);
    } else {
      logWarning(`${file} size (${sizeKB}KB)`, 'Consider minification');
      addResult(`${file} size optimal`, false, true);
    }
  });
}

// Browser Compatibility Checks
function validateBrowserCompatibility() {
  logSection('Browser Compatibility Checks');

  const htmlFile = 'index-netflix.html';
  if (!fs.existsSync(htmlFile)) {
    return;
  }

  const html = fs.readFileSync(htmlFile, 'utf8');

  // Check for modern CSS features
  const cssFiles = fs.readdirSync('css')
    .filter(f => f.endsWith('.css'))
    .map(f => fs.readFileSync(path.join('css', f), 'utf8'))
    .join('\n');

  const modernFeatures = [
    { name: 'CSS Grid', pattern: /display:\s*grid/, supported: true },
    { name: 'CSS Flexbox', pattern: /display:\s*flex/, supported: true },
    { name: 'CSS Custom Properties', pattern: /var\(--/, supported: true },
    { name: 'CSS Transforms', pattern: /transform:/, supported: true },
    { name: 'CSS Transitions', pattern: /transition:/, supported: true },
  ];

  modernFeatures.forEach(({ name, pattern, supported }) => {
    const uses = pattern.test(cssFiles);
    if (uses) {
      logTest(`Uses ${name}`, supported);
      addResult(`Uses ${name}`, supported);
    }
  });

  // Check for polyfills or fallbacks
  const hasIntersectionObserver = /IntersectionObserver/.test(
    fs.readFileSync('js/lazy-loader.js', 'utf8')
  );
  logTest('Uses Intersection Observer', hasIntersectionObserver);
  addResult('Uses Intersection Observer', hasIntersectionObserver);
}

// Accessibility Checks
function validateAccessibility() {
  logSection('Accessibility Checks');

  const htmlFile = 'index-netflix.html';
  if (!fs.existsSync(htmlFile)) {
    return;
  }

  const html = fs.readFileSync(htmlFile, 'utf8');

  // Check for skip links
  const hasSkipLinks = /skip-to-content|skip-navigation/.test(html);
  if (hasSkipLinks) {
    logTest('Skip navigation links', true);
    addResult('Skip navigation links', true);
  } else {
    logWarning('No skip navigation links', 'Consider adding for keyboard users');
    addResult('Skip navigation links', false, true);
  }

  // Check for focus styles
  const cssFiles = fs.readdirSync('css')
    .filter(f => f.endsWith('.css'))
    .map(f => fs.readFileSync(path.join('css', f), 'utf8'))
    .join('\n');

  const hasFocusStyles = /:focus/.test(cssFiles);
  logTest('Focus styles defined', hasFocusStyles);
  addResult('Focus styles defined', hasFocusStyles);

  // Check for reduced motion support
  const hasReducedMotion = /@media.*prefers-reduced-motion/.test(cssFiles);
  logTest('Reduced motion support', hasReducedMotion);
  addResult('Reduced motion support', hasReducedMotion);

  // Check for color contrast (basic check)
  const hasColorVars = /--color-/.test(cssFiles);
  if (hasColorVars) {
    logTest('Color variables defined', true);
    addResult('Color variables defined', true);
  }
}

// Generate Summary Report
function generateSummary() {
  logSection('Validation Summary');

  const total = results.passed + results.failed + results.warnings;
  const passRate = ((results.passed / total) * 100).toFixed(1);

  log(`Total Tests: ${total}`, 'bright');
  log(`Passed: ${results.passed}`, 'green');
  log(`Failed: ${results.failed}`, 'red');
  log(`Warnings: ${results.warnings}`, 'yellow');
  log(`Pass Rate: ${passRate}%`, passRate >= 90 ? 'green' : passRate >= 70 ? 'yellow' : 'red');

  console.log('\n');

  if (results.failed === 0) {
    log('✓ All critical tests passed!', 'green');
  } else {
    log('✗ Some tests failed. Please review the issues above.', 'red');
  }

  if (results.warnings > 0) {
    log(`⚠ ${results.warnings} warnings detected. Consider addressing them.`, 'yellow');
  }

  console.log('\n');

  // Save report to file
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total,
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings,
      passRate: parseFloat(passRate)
    },
    tests: results.tests
  };

  fs.writeFileSync('validation-report.json', JSON.stringify(report, null, 2));
  log('Report saved to validation-report.json', 'cyan');
}

// Run all validations
function runValidation() {
  log('Starting Portfolio Validation...', 'bright');
  console.log('');

  validateFileStructure();
  validateHTML();
  validateCSS();
  validateJavaScript();
  validatePerformance();
  validateBrowserCompatibility();
  validateAccessibility();
  generateSummary();
}

// Execute
runValidation();
