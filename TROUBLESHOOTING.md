# 🔧 Troubleshooting: No Images Showing

## Quick Diagnosis

### Step 1: Open Simple Test
```
Open: simple-test.html
```

This will show if images can load at all.

### Step 2: Check Browser Console
1. Press `F12` to open Developer Tools
2. Go to "Console" tab
3. Look for errors (red text)
4. Take a screenshot and share

### Step 3: Check Network Tab
1. In Developer Tools, go to "Network" tab
2. Refresh the page
3. Look for failed requests (red)
4. Check if image files are being requested

---

## Common Issues & Solutions

### Issue 1: Images Not Loading (404 Error)

**Symptoms:**
- Broken image icons
- Console shows "404 Not Found"
- Network tab shows failed requests

**Solution:**
Check file paths are correct:
```
✓ Correct: assets/images/card 1.jpg
✗ Wrong: /assets/images/card 1.jpg
✗ Wrong: ./assets/images/card 1.jpg
```

**Fix:**
All paths in `js/data.js` should start with `assets/images/`

---

### Issue 2: Lazy Loading Not Working

**Symptoms:**
- Images have `data-src` attribute but never load
- No errors in console
- Images stay as placeholders

**Solution:**
The lazy loader might not be initializing.

**Check:**
1. Open `index-netflix.html`
2. Press F12 → Console
3. Type: `window.NetflixPortfolioApp`
4. Should show an object, not `undefined`

**Fix if undefined:**
Make sure `js/main-netflix.js` is loaded and running.

---

### Issue 3: CORS Error

**Symptoms:**
- Console shows "CORS policy" error
- Images fail to load
- Works when opening file directly

**Solution:**
You need to use a local server, not `file://` protocol.

**Options:**

**A) Use Live Server (VS Code):**
1. Install "Live Server" extension
2. Right-click `index-netflix.html`
3. Select "Open with Live Server"

**B) Use Python:**
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000/index-netflix.html`

**C) Use Node.js:**
```bash
npx serve .
```

---

### Issue 4: Case-Sensitive Filenames

**Symptoms:**
- Some images load, others don't
- Works on Windows, fails on Linux/Mac

**Solution:**
Check file extension case:
- `card 4.JPG` (uppercase)
- `card 7.JPG` (uppercase)
- All others are lowercase `.jpg`

**Fix:**
Make sure `js/data.js` matches exact case:
```javascript
'assets/images/card 4.JPG'  // Uppercase JPG
'assets/images/card 7.JPG'  // Uppercase JPG
```

---

### Issue 5: Spaces in Filenames

**Symptoms:**
- Images with spaces in names don't load
- Console shows 404 for encoded paths

**Solution:**
Spaces in filenames can cause issues.

**Your files with spaces:**
- `about me cover.png`
- `education cover.jpg`
- `experience cover page.jpg`
- `technical activities cover page.png`
- `learning and course cover page.jpg`
- `project cover page.jpg`
- `award cover page.jpg`
- `skill and interest cover page.png`

**These should work, but if not:**

**Option A: Rename files (remove spaces):**
```
about me cover.png → about-me-cover.png
education cover.jpg → education-cover.jpg
```

**Option B: URL encode in data.js:**
```javascript
'assets/images/about%20me%20cover.png'
```

---

## Diagnostic Tools

### Tool 1: Simple Test
```
File: simple-test.html
```
- Tests direct image loading
- Checks DataStore
- Shows console output

### Tool 2: Debug Images
```
File: debug-images.html
```
- Tests all 16 of your images
- Shows which load and which fail
- Displays full paths

### Tool 3: Data Loading Test
```
File: test-data-loading.html
```
- Tests complete data structure
- Shows all items with images
- Visual status indicators

---

## Step-by-Step Debugging

### 1. Test Basic Image Loading
```
Open: simple-test.html
```
- Do the 3 test images load?
- ✅ YES → Images work, issue is with lazy loading
- ❌ NO → Images don't work, check paths/server

### 2. Check Console for Errors
```
Press F12 → Console tab
```
Look for:
- ❌ "404 Not Found" → Wrong path
- ❌ "CORS policy" → Need local server
- ❌ "Failed to load" → Check file exists
- ✅ No errors → Lazy loading issue

### 3. Check Network Tab
```
Press F12 → Network tab → Refresh page
```
- Are image requests being made?
- What status codes? (200 = good, 404 = not found)
- Are paths correct in requests?

### 4. Verify File Structure
```
Your structure should be:
C:\Users\risha\Desktop\sample\
├── index-netflix.html
├── js/
│   └── data.js
└── assets/
    └── images/
        ├── card 1.jpg
        ├── card 2.jpg
        └── ...
```

### 5. Test DataStore
```
Open: simple-test.html
Click: "Run All Tests" button
Check console for output
```

---

## Quick Fixes

### Fix 1: Use Local Server
```powershell
# In your project folder:
python -m http.server 8000

# Then open:
http://localhost:8000/index-netflix.html
```

### Fix 2: Check File Paths
Open `js/data.js` and verify all paths start with:
```javascript
'assets/images/...'
```

NOT:
```javascript
'/assets/images/...'  // Wrong - leading slash
'./assets/images/...' // Wrong - dot slash
```

### Fix 3: Verify Files Exist
```powershell
# In PowerShell, check files:
Get-ChildItem assets\images\*.jpg
Get-ChildItem assets\images\*.png
```

Should show all 16 files.

---

## What to Check

### ✅ Checklist:
- [ ] Using local server (not file://)
- [ ] Files exist in `assets/images/`
- [ ] Filenames match exactly (case-sensitive)
- [ ] No console errors
- [ ] DataStore loads (check simple-test.html)
- [ ] Paths in data.js are correct

---

## Get Help

### Information to Provide:
1. **Browser Console Output:**
   - Press F12 → Console
   - Copy any errors (red text)

2. **Network Tab:**
   - Press F12 → Network
   - Refresh page
   - Screenshot failed requests

3. **Simple Test Results:**
   - Open `simple-test.html`
   - Do the 3 images load?
   - What does console show?

4. **File Structure:**
   - Run: `dir assets\images`
   - Copy the output

---

## Most Likely Issues

### 1. Not Using Local Server (90% of cases)
**Solution:** Use Live Server or `python -m http.server`

### 2. Wrong File Paths (5% of cases)
**Solution:** Check paths in `js/data.js`

### 3. Files Don't Exist (3% of cases)
**Solution:** Verify files in `assets/images/`

### 4. Case-Sensitive Names (2% of cases)
**Solution:** Match exact case (JPG vs jpg)

---

## Next Steps

1. Open `simple-test.html` first
2. Check if those 3 images load
3. If YES → Issue is with lazy loading
4. If NO → Issue is with paths or server
5. Check browser console for errors
6. Share console output for help

---

**Need more help?** Run `simple-test.html` and share:
- Do images load? (yes/no)
- Console output (copy/paste)
- Network tab screenshot
