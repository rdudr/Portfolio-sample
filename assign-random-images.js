/**
 * Script to assign random images to portfolio items
 * This will update data.js with random Unsplash images for items without images
 */

const fs = require('fs');
const path = require('path');

// Unsplash random image URLs by category
const unsplashCategories = {
  'about-me': 'https://source.unsplash.com/random/800x1200/?portrait,professional',
  'education': 'https://source.unsplash.com/random/800x1200/?education,books,study',
  'experience': 'https://source.unsplash.com/random/800x1200/?office,work,business',
  'technical-activities': 'https://source.unsplash.com/random/800x1200/?technology,electronics,circuit',
  'learning-and-courses': 'https://source.unsplash.com/random/800x1200/?learning,online,course',
  'project': 'https://source.unsplash.com/random/800x1200/?project,development,code',
  'award': 'https://source.unsplash.com/random/800x1200/?trophy,award,achievement',
  'skills-and-interests': 'https://source.unsplash.com/random/800x1200/?skills,hobby,interest'
};

// Alternative: Use images from random folder if available
const randomFolder = path.join(__dirname, 'assets', 'images', 'random');
let randomImages = [];

try {
  if (fs.existsSync(randomFolder)) {
    randomImages = fs.readdirSync(randomFolder)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => `assets/images/random/${file}`);
  }
} catch (err) {
  console.log('Random folder not accessible, will use Unsplash URLs');
}

// Read current data.js
const dataPath = path.join(__dirname, 'js', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Function to get random image for a category
function getRandomImage(categorySlug, index) {
  if (randomImages.length > 0) {
    // Use local random images if available
    const randomIndex = (index * 7) % randomImages.length; // Pseudo-random but consistent
    return randomImages[randomIndex];
  } else {
    // Use Unsplash random images
    const baseUrl = unsplashCategories[categorySlug] || 'https://source.unsplash.com/random/800x1200/?professional';
    return `${baseUrl}&sig=${index}`; // Add signature to get different images
  }
}

// Parse the data structure (simplified approach)
console.log('🔍 Analyzing data.js for missing images...\n');

// Find all image: "" or thumbnail: "" patterns
const imagePattern = /(image|thumbnail):\s*['"]['"],?/g;
let matches = dataContent.match(imagePattern);

if (matches && matches.length > 0) {
  console.log(`Found ${matches.length} empty image fields\n`);
  
  // Strategy: Replace empty images with Unsplash URLs
  // We'll need to track which category we're in
  
  const categories = ['about-me', 'education', 'experience', 'technical-activities', 
                     'learning-and-courses', 'project', 'award', 'skills-and-interests'];
  
  let updatedContent = dataContent;
  let imageCounter = 0;
  
  categories.forEach(category => {
    const categoryRegex = new RegExp(`slug:\\s*['"]${category}['"]([\\s\\S]*?)(?=slug:|$)`, 'g');
    
    updatedContent = updatedContent.replace(categoryRegex, (match) => {
      // Replace empty images within this category
      return match.replace(/image:\s*['"]['"],?/g, () => {
        const newImage = getRandomImage(category, imageCounter++);
        console.log(`✅ Assigned image to ${category}: ${newImage}`);
        return `image: "${newImage}",`;
      }).replace(/thumbnail:\s*['"]['"],?/g, () => {
        const newImage = getRandomImage(category, imageCounter++);
        console.log(`✅ Assigned thumbnail to ${category}: ${newImage}`);
        return `thumbnail: "${newImage}",`;
      });
    });
  });
  
  // Write updated content
  fs.writeFileSync(dataPath, updatedContent, 'utf8');
  console.log(`\n✨ Successfully updated data.js with ${imageCounter} new images!`);
  console.log('\n📝 Note: Using Unsplash random images. Refresh your browser to see them.');
  console.log('💡 Tip: Download images you like and save them to assets/images/random/ for permanent use.');
  
} else {
  console.log('✅ All images are already assigned!');
}
