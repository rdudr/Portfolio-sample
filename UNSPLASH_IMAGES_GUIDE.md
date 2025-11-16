# Unsplash Images Guide

This guide will help you add remaining images from Unsplash to your portfolio project.

## How to Add Images

### Step 1: Download Images from Unsplash

Visit these Unsplash URLs and download high-quality images:

**Education Images:**
- https://unsplash.com/photos/books-and-pencils-on-table-OyCl7Y4y0Bk
- https://unsplash.com/photos/person-holding-white-printer-paper-5fNmWej4tAA
- https://unsplash.com/photos/macbook-pro-on-brown-wooden-table-376KN_ISplE

**Experience/Work Images:**
- https://unsplash.com/photos/person-using-laptop-computer-npxXWgQ33ZQ
- https://unsplash.com/photos/person-using-macbook-pro-on-table-hpjSkU2UYSU
- https://unsplash.com/photos/laptop-computer-on-glass-top-table-4Mw7nkQDByk

**Technical Activities Images:**
- https://unsplash.com/photos/black-and-silver-laptop-computer-on-table-iar-afB0QQw
- https://unsplash.com/photos/person-holding-black-and-white-electronic-device-ZV_64LdGoao
- https://unsplash.com/photos/black-flat-screen-computer-monitor-jLwVAUtLOAQ

**Learning & Courses Images:**
- https://unsplash.com/photos/person-holding-white-mini-bell-alarmclock-vWchRczcQwM
- https://unsplash.com/photos/person-writing-on-white-paper-s9CC2SKySJM
- https://unsplash.com/photos/macbook-pro-on-brown-wooden-table-376KN_ISplE

**Projects Images:**
- https://unsplash.com/photos/black-flat-screen-computer-monitor-jLwVAUtLOAQ
- https://unsplash.com/photos/person-using-laptop-computer-npxXWgQ33ZQ
- https://unsplash.com/photos/macbook-pro-displaying-group-of-people-hpjSkU2UYSU

**Awards Images:**
- https://unsplash.com/photos/gold-colored-trophy-on-brown-wooden-table-26MJGnCM0Wc
- https://unsplash.com/photos/person-holding-gold-and-silver-trophy-8OyKWQgBsKQ
- https://unsplash.com/photos/gold-and-silver-round-frame-magnifying-glass-5fNmWej4tAA

**Skills & Interests Images:**
- https://unsplash.com/photos/person-holding-white-printer-paper-5fNmWej4tAA
- https://unsplash.com/photos/macbook-pro-on-brown-wooden-table-376KN_ISplE
- https://unsplash.com/photos/person-using-laptop-computer-npxXWgQ33ZQ

### Step 2: Save Images to Your Project

1. Download each image from Unsplash
2. Rename them appropriately (e.g., `education-1.jpg`, `project-1.jpg`)
3. Save them to the appropriate folders:
   - `assets/images/education/`
   - `assets/images/experience/`
   - `assets/images/technical-activities/`
   - `assets/images/learning-courses/`
   - `assets/images/projects/`
   - `assets/images/awards/`
   - `assets/images/skills/`

### Step 3: Update data.js

After downloading and saving the images, update the `image` and `thumbnail` paths in `js/data.js` to point to your local files.

Example:
```javascript
{
  title: "Bachelor of Engineering",
  image: "assets/images/education/education-1.jpg",
  thumbnail: "assets/images/education/education-1.jpg",
  // ... rest of the data
}
```

## Alternative: Use Unsplash URLs Directly

If you want to use Unsplash images directly without downloading:

1. Go to the Unsplash photo page
2. Right-click on the image and select "Copy image address"
3. Use that URL in your data.js file

**Note:** Using direct Unsplash URLs requires internet connection and may have rate limits.

## Recommended Image Sizes

For best performance:
- **Thumbnail**: 400x600px (portrait) or 600x400px (landscape)
- **Full Image**: 1200x1800px (portrait) or 1920x1080px (landscape)

## Image Optimization

After adding images, consider compressing them:
```bash
# If you have the compression script
node scripts/compress-images.js
```

## Need Help?

If you need specific images for your portfolio content, let me know and I can suggest more relevant Unsplash searches!
