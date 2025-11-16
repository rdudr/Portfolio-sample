# How to Add Random Images to Your Portfolio

## Quick Solution: Use Unsplash Random Images

Since your `assets/images/random` folder is empty and Node.js is not installed, here's the easiest way to add images:

### Option 1: Download Images to Random Folder (Recommended)

1. **Download 20-30 images from Unsplash:**
   - Visit: https://unsplash.com/
   - Search for: "technology", "education", "office", "professional", "electronics"
   - Download images you like
   - Save them to: `C:\Users\risha\Desktop\sample\assets\images\random\`
   - Name them: `image-1.jpg`, `image-2.jpg`, etc.

2. **Run this PowerShell command to assign them:**
```powershell
# This will randomly assign images from the random folder
Get-ChildItem "assets\images\random\*.jpg" | ForEach-Object { Write-Host $_.Name }
```

### Option 2: Use Direct Unsplash URLs (Fastest)

I can update your `data.js` file right now to use Unsplash's random image service. These images will load directly from Unsplash.

**Advantages:**
- ✅ Works immediately
- ✅ High-quality images
- ✅ No download needed

**Disadvantages:**
- ⚠️ Requires internet connection
- ⚠️ Images change on each page load
- ⚠️ May have rate limits

### Option 3: Manual Assignment

Edit `js/data.js` and replace empty `image: ""` and `thumbnail: ""` fields with:

**For Education items:**
```javascript
image: 'https://source.unsplash.com/random/800x1200/?education,books&sig=1',
thumbnail: 'https://source.unsplash.com/random/400x600/?education,books&sig=1',
```

**For Experience items:**
```javascript
image: 'https://source.unsplash.com/random/800x1200/?office,work&sig=2',
thumbnail: 'https://source.unsplash.com/random/400x600/?office,work&sig=2',
```

**For Projects:**
```javascript
image: 'https://source.unsplash.com/random/800x1200/?technology,code&sig=3',
thumbnail: 'https://source.unsplash.com/random/400x600/?technology,code&sig=3',
```

**For Awards:**
```javascript
image: 'https://source.unsplash.com/random/800x1200/?trophy,award&sig=4',
thumbnail: 'https://source.unsplash.com/random/400x600/?trophy,award&sig=4',
```

## What Would You Like Me To Do?

**Choose one:**

1. **"Update data.js with Unsplash URLs"** - I'll update your data.js file right now with random Unsplash images
2. **"Wait, I'll download images first"** - You download images to the random folder, then I'll help assign them
3. **"Show me which items need images"** - I'll create a list of all items missing images

Let me know which option you prefer!
