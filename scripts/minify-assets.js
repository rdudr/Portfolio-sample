/**
 * Asset Minification Script
 * Requirement 13.2 - Minimize CSS and JavaScript files
 * 
 * This script minifies CSS and JavaScript files for production.
 * 
 * Usage: node scripts/minify-assets.js
 * 
 * Note: This is a simple minifier. For production, consider using:
 * - Terser for JavaScript
 * - cssnano for CSS
 * - Or a build tool like Vite, Webpack, or Parcel
 */

const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around special characters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons
    .replace(/;}/g, '}')
    // Remove unnecessary zeros
    .replace(/:0px/g, ':0')
    .replace(/ 0px/g, ' 0')
    // Trim
    .trim();
}

// Simple JavaScript minifier (basic)
function minifyJS(js) {
  return js
    // Remove single-line comments (but preserve URLs)
    .replace(/(?<!:)\/\/.*$/gm, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around operators (careful with this)
    .replace(/\s*([{}();,:])\s*/g, '$1')
    // Trim
    .trim();
}

// Get file size in KB
function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Process CSS files
function processCSSFiles() {
  const cssDir = 'css';
  const cssFiles = [
    'reset.css',
    'variables.css',
    'layout.css',
    'components.css',
    'animations.css',
    'performance.css'
  ];

  console.log('Processing CSS files...');
  console.log('-'.repeat(60));

  let totalOriginal = 0;
  let totalMinified = 0;

  cssFiles.forEach(file => {
    const inputPath = path.join(cssDir, file);
    const outputPath = path.join(cssDir, file.replace('.css', '.min.css'));

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${file} (not found)`);
      return;
    }

    const originalSize = getFileSizeKB(inputPath);
    const css = fs.readFileSync(inputPath, 'utf8');
    const minified = minifyCSS(css);
    
    fs.writeFileSync(outputPath, minified, 'utf8');
    const minifiedSize = getFileSizeKB(outputPath);
    
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    
    console.log(`${file}:`);
    console.log(`  Original: ${originalSize} KB`);
    console.log(`  Minified: ${minifiedSize} KB`);
    console.log(`  Savings: ${savings}%`);
    console.log('');

    totalOriginal += parseFloat(originalSize);
    totalMinified += parseFloat(minifiedSize);
  });

  console.log('CSS Summary:');
  console.log(`  Total original: ${totalOriginal.toFixed(2)} KB`);
  console.log(`  Total minified: ${totalMinified.toFixed(2)} KB`);
  console.log(`  Total savings: ${((1 - totalMinified / totalOriginal) * 100).toFixed(1)}%`);
  console.log('');
}

// Process JavaScript files
function processJSFiles() {
  const jsDir = 'js';
  const jsFiles = [
    'main-netflix.js',
    'router.js',
    'view-manager.js',
    'data.js',
    'content-card.js',
    'row-carousel.js',
    'back-navigation.js',
    'keyboard-navigation.js',
    'touch-handler.js',
    'search.js',
    'category-filter.js',
    'lazy-loader.js',
    'preload-manager.js',
    'reduced-motion.js'
  ];

  console.log('Processing JavaScript files...');
  console.log('-'.repeat(60));

  let totalOriginal = 0;
  let totalMinified = 0;

  jsFiles.forEach(file => {
    const inputPath = path.join(jsDir, file);
    const outputPath = path.join(jsDir, file.replace('.js', '.min.js'));

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${file} (not found)`);
      return;
    }

    const originalSize = getFileSizeKB(inputPath);
    const js = fs.readFileSync(inputPath, 'utf8');
    const minified = minifyJS(js);
    
    fs.writeFileSync(outputPath, minified, 'utf8');
    const minifiedSize = getFileSizeKB(outputPath);
    
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    
    console.log(`${file}:`);
    console.log(`  Original: ${originalSize} KB`);
    console.log(`  Minified: ${minifiedSize} KB`);
    console.log(`  Savings: ${savings}%`);
    console.log('');

    totalOriginal += parseFloat(originalSize);
    totalMinified += parseFloat(minifiedSize);
  });

  console.log('JavaScript Summary:');
  console.log(`  Total original: ${totalOriginal.toFixed(2)} KB`);
  console.log(`  Total minified: ${totalMinified.toFixed(2)} KB`);
  console.log(`  Total savings: ${((1 - totalMinified / totalOriginal) * 100).toFixed(1)}%`);
  console.log('');
}

// Main function
function main() {
  console.log('='.repeat(60));
  console.log('Asset Minification');
  console.log('Requirement: Minimize CSS and JavaScript files');
  console.log('='.repeat(60));
  console.log('');

  try {
    processCSSFiles();
    processJSFiles();

    console.log('='.repeat(60));
    console.log('Minification Complete!');
    console.log('='.repeat(60));
    console.log('');
    console.log('Next steps:');
    console.log('1. Review minified files (*.min.css, *.min.js)');
    console.log('2. Update HTML to use minified versions in production');
    console.log('3. Consider using a proper minifier for production:');
    console.log('   - Terser: npm install terser');
    console.log('   - cssnano: npm install cssnano');
    console.log('   - Or use a build tool like Vite or Webpack');
    console.log('');
  } catch (error) {
    console.error('Error during minification:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
