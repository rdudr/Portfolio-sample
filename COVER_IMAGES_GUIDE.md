# 📸 Cover Images Guide

## All Cover Images Configured ✅

Your portfolio uses cover images for each section's detail page. Here's the complete mapping:

---

## Cover Image Mapping:

### 1. About Me
- **Cover Image:** `assets/images/about me cover.png`
- **Used For:** Detail page background when clicking About Me card
- **Status:** ✅ Configured

### 2. Education
- **Cover Image:** `assets/images/education cover.jpg`
- **Used For:** All 4 education items (MTech, BTech, Schools)
- **Status:** ✅ Configured

### 3. Experience
- **Cover Image:** `assets/images/experience cover page.jpg`
- **Used For:** All 3 experience items (AICTE, Shieldlink, Oriana)
- **Status:** ✅ Configured

### 4. Technical Activities
- **Cover Image:** `assets/images/technical activities cover page.png`
- **Used For:** All 6 technical activity items
- **Status:** ✅ Configured

### 5. Learning & Courses
- **Cover Image:** `assets/images/learning and course cover page.jpg`
- **Used For:** All 7 course items
- **Status:** ✅ Configured

### 6. Projects
- **Cover Image:** `assets/images/project cover page.jpg`
- **Used For:** All 7 project items
- **Status:** ✅ Configured

### 7. Awards
- **Cover Image:** `assets/images/award cover page.jpg`
- **Used For:** All 2 award items
- **Status:** ✅ Configured

### 8. Skills & Interests
- **Cover Image:** `assets/images/skill and interest cover page.png`
- **Used For:** All 3 skill items
- **Status:** ✅ Configured

---

## How Cover Images Work:

### Browse Hub (Main Page):
- Shows **card thumbnails** (card 1.jpg, card 2.jpg, etc.)
- Small images in horizontal rows

### Detail Page (When You Click a Card):
- Shows **cover image** as full-screen background
- Large, cinematic hero image
- Dark overlay for text readability

---

## File Locations:

All cover images are in:
```
C:\Users\risha\Desktop\sample\assets\images\
```

### Files:
1. ✅ `about me cover.png`
2. ✅ `education cover.jpg`
3. ✅ `experience cover page.jpg`
4. ✅ `technical activities cover page.png`
5. ✅ `learning and course cover page.jpg`
6. ✅ `project cover page.jpg`
7. ✅ `award cover page.jpg`
8. ✅ `skill and interest cover page.png`

---

## Testing Cover Images:

### How to See Cover Images:

1. **Open portfolio:**
   ```
   http://127.0.0.1:5500/index-netflix.html
   ```

2. **Click any card** in a row

3. **Detail page opens** with:
   - Cover image as background
   - Dark overlay
   - Content on top

### Example:
- Click "MTech CTAE" card
- See `education cover.jpg` as full-screen background
- Content displays over the image

---

## Image Specifications:

### Cover Images:
- **Size:** 1920x1080px or larger
- **Format:** JPG or PNG
- **Aspect Ratio:** 16:9
- **File Size:** < 500KB (recommended)
- **Usage:** Detail page backgrounds

### Card Images:
- **Size:** 800x450px
- **Format:** JPG
- **Aspect Ratio:** 16:9
- **File Size:** < 200KB (recommended)
- **Usage:** Browse hub thumbnails

---

## Current Setup:

### Data Structure:
```javascript
{
  slug: 'education',
  title: 'Education',
  items: [
    {
      title: 'MTech',
      image: 'assets/images/education cover.jpg',  // ← Cover image
      thumbnail: 'assets/images/card 2.jpg',       // ← Card image
      // ...
    }
  ]
}
```

### What Shows Where:
- **Browse Hub:** Uses `thumbnail` (card images)
- **Detail Page:** Uses `image` (cover images)

---

## All Images Summary:

### Cover Images (8 files):
1. About Me cover
2. Education cover
3. Experience cover page
4. Technical Activities cover page
5. Learning and Course cover page
6. Project cover page
7. Award cover page
8. Skill and Interest cover page

### Card Images (8 files):
1. card 1.jpg → About Me
2. card 2.jpg → Education
3. card 3.jpg → Experience
4. card 4.JPG → Technical Activities
5. card 5.jpg → Learning & Courses
6. card 6.jpg → Projects
7. card 7.JPG → Awards
8. card 8.jpg → Skills & Interests

### Unsplash Images (26 images):
- Auto-loaded for additional cards
- Dark/red/black theme
- Provides visual variety

---

## Verify Cover Images:

### Check Files Exist:
```powershell
dir assets\images\*cover*.*
```

Should show all 8 cover images.

### Test in Browser:
1. Open portfolio
2. Click any card
3. Check if cover image appears as background
4. Should see full-screen image with overlay

---

## Troubleshooting:

### If Cover Image Doesn't Show:
1. **Check file exists** in `assets/images/`
2. **Check filename** matches exactly (case-sensitive)
3. **Check browser console** (F12) for 404 errors
4. **Hard refresh** browser (Ctrl + F5)

### If Wrong Image Shows:
1. Check `data.js` file
2. Verify `image` field has correct path
3. Make sure not using `thumbnail` for cover

---

## Status:

✅ All 8 cover images configured  
✅ All paths correct in data.js  
✅ Files exist in assets/images/  
✅ Ready to use  

**Cover images are already set up and working!**

---

## How to Update Cover Images:

### To Change a Cover Image:

1. **Add new image** to `assets/images/`
2. **Name it** (e.g., `new-education-cover.jpg`)
3. **Update data.js:**
   ```javascript
   image: 'assets/images/new-education-cover.jpg'
   ```
4. **Refresh browser**

### To Add More Cover Images:

If you want different cover images for each item (instead of sharing):

1. Add more images to `assets/images/`
2. Update each item's `image` field in `data.js`
3. Each item can have its own unique cover

---

**Your cover images are already configured and ready to use!** 🎉

Just click any card to see the cover image as a full-screen background.
