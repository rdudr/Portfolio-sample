/**
 * Image Compression Script
 * Requirement 13.2 - Compress all images to <200KB
 * 
 * This script helps identify images that need compression
 * and provides guidance on compression tools.
 * 
 * Usage: node scripts/compress-images.js
 */

const fs = require('fs');
const path = require('path');

const MAX_SIZE_KB = 200;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

// Image directories to check
const IMAGE_DIRS = [
  'assets/images',
  'assets/images/thumbnails',
  'assets/images/gallery',
  'assets/images/hero'
];

/**
 * Get file size in KB
 */
function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Check if file is an image
 */
function isImage(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

/**
 * Scan directory for images
 */
function scanDirectory(dirPath) {
  const results = {
    total: 0,
    oversized: [],
    optimized: []
  };

  if (!fs.existsSync(dirPath)) {
    console.log(`Directory not found: ${dirPath}`);
    return results;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively scan subdirectories
      const subResults = scanDirectory(filePath);
      results.total += subResults.total;
      results.oversized.push(...subResults.oversized);
      results.optimized.push(...subResults.optimized);
    } else if (isImage(file)) {
      results.total++;
      const sizeKB = getFileSizeKB(filePath);
      const sizeBytes = stats.size;

      if (sizeBytes > MAX_SIZE_BYTES) {
        results.oversized.push({
          path: filePath,
          size: sizeKB,
          excess: (sizeBytes - MAX_SIZE_BYTES) / 1024
        });
      } else {
        results.optimized.push({
          path: filePath,
          size: sizeKB
        });
      }
    }
  });

  return results;
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('Image Compression Analysis');
  console.log('Requirement: All images must be < 200KB');
  console.log('='.repeat(60));
  console.log('');

  let totalImages = 0;
  let totalOversized = 0;
  let allOversized = [];

  IMAGE_DIRS.forEach(dir => {
    console.log(`Scanning: ${dir}`);
    const results = scanDirectory(dir);
    
    totalImages += results.total;
    totalOversized += results.oversized.length;
    allOversized.push(...results.oversized);

    if (results.total === 0) {
      console.log('  No images found');
    } else {
      console.log(`  Total images: ${results.total}`);
      console.log(`  Optimized: ${results.optimized.length}`);
      console.log(`  Oversized: ${results.oversized.length}`);
    }
    console.log('');
  });

  console.log('='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Total images scanned: ${totalImages}`);
  console.log(`Images needing compression: ${totalOversized}`);
  console.log('');

  if (totalOversized > 0) {
    console.log('Oversized Images:');
    console.log('-'.repeat(60));
    allOversized.forEach(img => {
      console.log(`${img.path}`);
      console.log(`  Current size: ${img.size} KB`);
      console.log(`  Needs reduction: ${img.excess.toFixed(2)} KB`);
      console.log('');
    });

    console.log('='.repeat(60));
    console.log('Compression Recommendations:');
    console.log('='.repeat(60));
    console.log('');
    console.log('1. Online Tools (No installation required):');
    console.log('   - TinyPNG: https://tinypng.com/');
    console.log('   - Squoosh: https://squoosh.app/');
    console.log('   - Compressor.io: https://compressor.io/');
    console.log('');
    console.log('2. Command Line Tools:');
    console.log('   - ImageMagick: convert input.jpg -quality 85 output.jpg');
    console.log('   - cwebp: cwebp -q 80 input.jpg -o output.webp');
    console.log('   - pngquant: pngquant --quality=65-80 input.png');
    console.log('');
    console.log('3. Batch Processing:');
    console.log('   - Use the provided compress-images.sh script');
    console.log('   - Or install sharp: npm install sharp');
    console.log('');
    console.log('4. Recommended Settings:');
    console.log('   - JPEG Quality: 80-85%');
    console.log('   - PNG: Use pngquant or convert to WebP');
    console.log('   - WebP Quality: 75-85%');
    console.log('   - Max dimensions: 1920x1080 for hero images');
    console.log('   - Max dimensions: 800x450 for thumbnails');
    console.log('');
  } else {
    console.log('✓ All images are optimized and under 200KB!');
    console.log('');
  }

  console.log('='.repeat(60));
}

// Run the script
main();
