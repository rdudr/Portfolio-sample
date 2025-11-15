# Image Asset Mapping Guide

## Current Image Assets in `assets/images/`

Based on the directory scan, here are your **exact filenames**:

### Cover/Hero Images (8 sections)
1. `about me cover.png` - About Me section
2. `education cover.jpg` - Education section
3. `experience cover page.jpg` - Experience section
4. `technical activities cover page.png` - Technical Activities section
5. `learing and course cover page.jpg` - Learning & Courses section (note: typo "learing")
6. `project cover page.HEIC` - Projects section (⚠️ HEIC format may need conversion)
7. `award cover page.jpg` - Awards section
8. `skill and intrest cover page.png` - Skills & Interests section (note: typo "intrest")

### Card Images (8 generic cards)
1. `card 1.jpg`
2. `card 2.jpg`
3. `card 3.jpg`
4. `card 4.JPG` (uppercase extension)
5. `card 5.jpg`
6. `card 6.jpg`
7. `card 7.JPG` (uppercase extension)
8. `card 8.jpg`

### Additional Images
- `education card 1.jpg` - Specific education card image

---

## Questions to Answer

### Question 1: Cover Page Images ✅ ANSWERED
**Exact filenames for the 8 section hero/background images:**

1. **About Me:** `about me cover.png`
2. **Education:** `education cover.jpg`
3. **Experience:** `experience cover page.jpg`
4. **Technical Activities:** `technical activities cover page.png`
5. **Learning & Courses:** `learing and course cover page.jpg`
6. **Projects:** `project cover page.HEIC` ⚠️
7. **Awards:** `award cover page.jpg`
8. **Skills & Interests:** `skill and intrest cover page.png`

**⚠️ Important Notes:**
- File naming is inconsistent (some have "cover", some have "cover page")
- "Learning" is misspelled as "learing"
- "Interest" is misspelled as "intrest"
- Projects cover is in HEIC format (may not work in browsers - needs JPG/PNG conversion)

---

### Question 2: Card Images Mapping ❓ NEEDS YOUR INPUT

**A) Exact filenames:** ✅ CONFIRMED
- `card 1.jpg`
- `card 2.jpg`
- `card 3.jpg`
- `card 4.JPG` (note: uppercase)
- `card 5.jpg`
- `card 6.jpg`
- `card 7.JPG` (note: uppercase)
- `card 8.jpg`

**B) How do these map to sections?** ❓ PLEASE CLARIFY

**Option A: One card per section (1:1 mapping)**
- `card 1.jpg` → About Me (first/only card)
- `card 2.jpg` → Education (first card in row)
- `card 3.jpg` → Experience (first card in row)
- `card 4.JPG` → Technical Activities (first card in row)
- `card 5.jpg` → Learning & Courses (first card in row)
- `card 6.jpg` → Projects (first card in row)
- `card 7.JPG` → Awards (first card in row)
- `card 8.jpg` → Skills & Interests (first card in row)

**Option B: Different mapping**
Please specify which card goes with which section.

---

### Question 3: Multiple Cards in One Section ❓ NEEDS YOUR INPUT

Several sections have multiple items that need card images:

#### **Education Section (4 items):**
1. MTech at CTAE - Use which image?
2. BTech at GITS - Use which image?
3. CBSE at Central Academy - Use which image?
4. CBSE at Indo American - Use which image?

**Available:** `education card 1.jpg` + generic cards

#### **Experience Section (3 items):**
1. AICTE IDEA Lab - Use which image?
2. Shieldlink - Use which image?
3. Oriana Power - Use which image?

#### **Technical Activities Section (multiple items):**
1. Embedded Systems - Use which image?
2. IoT Projects - Use which image?
3. Security Research - Use which image?
(etc.)

#### **Projects Section (multiple items):**
1. Project 1 - Use which image?
2. Project 2 - Use which image?
3. Project 3 - Use which image?
(etc.)

#### **Awards Section (multiple items):**
1. Award 1 - Use which image?
2. Award 2 - Use which image?
(etc.)

---

## Recommended Approach

### Option 1: Simple Mapping (Recommended for MVP)
Use the 8 generic card images as the **first card** in each section:
- About Me row: `card 1.jpg`
- Education row: `card 2.jpg` (or `education card 1.jpg` for first card)
- Experience row: `card 3.jpg`
- Technical Activities row: `card 4.JPG`
- Learning & Courses row: `card 5.jpg`
- Projects row: `card 6.jpg`
- Awards row: `card 7.JPG`
- Skills & Interests row: `card 8.jpg`

For additional cards in sections with multiple items, use:
- Placeholder images (generated)
- Duplicate the first card image
- Use a default fallback image

### Option 2: Specific Mapping (More Work)
You provide specific images for each individual card/item in every section.

---

## Issues to Address

### 1. HEIC Format ⚠️
**File:** `project cover page.HEIC`  
**Issue:** HEIC format is not supported in most browsers  
**Solution:** Convert to JPG or PNG

**Conversion Options:**
- Use online converter (e.g., cloudconvert.com)
- Use Windows Photos app (Open → Save As → JPG)
- Use command line: `magick convert "project cover page.HEIC" "project cover page.jpg"`

### 2. Inconsistent Naming
**Issues:**
- Some files: "cover", others: "cover page"
- Typos: "learing" (learning), "intrest" (interest)
- Mixed case extensions: `.jpg` vs `.JPG`

**Recommendation:** Standardize naming for easier maintenance

### 3. Missing Images
If you need more card images for multiple items per section, you'll need to either:
- Provide additional images
- Use placeholders
- Reuse existing images

---

## What Kiro Needs to Know

To write the perfect prompt for Kiro, please provide:

### 1. Cover Image Mapping (Confirmed ✅)
```
About Me → about me cover.png
Education → education cover.jpg
Experience → experience cover page.jpg
Technical Activities → technical activities cover page.png
Learning & Courses → learing and course cover page.jpg
Projects → project cover page.HEIC (needs conversion!)
Awards → award cover page.jpg
Skills & Interests → skill and intrest cover page.png
```

### 2. Card Image Mapping (Need Your Input ❓)
Please specify:
- Which `card X.jpg` goes with which section?
- For sections with multiple items, which images to use?

### 3. Fallback Strategy (Need Your Input ❓)
For items without specific images:
- [ ] Use placeholder images
- [ ] Duplicate the first card image
- [ ] Use a default fallback image
- [ ] Other: _______________

---

## Example Mapping (Please Confirm or Modify)

```javascript
// About Me (1 item)
items: [
  { image: 'assets/images/about me cover.png', thumbnail: 'assets/images/card 1.jpg' }
]

// Education (4 items)
items: [
  { image: 'assets/images/education cover.jpg', thumbnail: 'assets/images/education card 1.jpg' },
  { image: 'assets/images/education cover.jpg', thumbnail: 'assets/images/card 2.jpg' },
  { image: 'assets/images/education cover.jpg', thumbnail: 'assets/images/card 2.jpg' },
  { image: 'assets/images/education cover.jpg', thumbnail: 'assets/images/card 2.jpg' }
]

// Experience (3 items)
items: [
  { image: 'assets/images/experience cover page.jpg', thumbnail: 'assets/images/card 3.jpg' },
  { image: 'assets/images/experience cover page.jpg', thumbnail: 'assets/images/card 3.jpg' },
  { image: 'assets/images/experience cover page.jpg', thumbnail: 'assets/images/card 3.jpg' }
]

// ... and so on
```

---

## Next Steps

1. **Convert HEIC file** to JPG/PNG format
2. **Clarify card mapping** - which card goes with which section
3. **Decide on fallback strategy** for multiple items
4. **Provide any additional images** if needed
5. **Confirm or modify** the example mapping above

Once you provide these details, I can create the perfect prompt for Kiro!

---

## Quick Answer Template

Please copy and fill this out:

```
COVER IMAGES (Confirmed):
✅ Using the existing cover images as listed above

CARD MAPPING:
card 1.jpg → [Section name]
card 2.jpg → [Section name]
card 3.jpg → [Section name]
card 4.JPG → [Section name]
card 5.jpg → [Section name]
card 6.jpg → [Section name]
card 7.JPG → [Section name]
card 8.jpg → [Section name]

MULTIPLE ITEMS STRATEGY:
For sections with multiple items (Education, Experience, Projects, etc.):
[ ] Use the same card image for all items in that section
[ ] Use placeholder images for additional items
[ ] I will provide more images
[ ] Other: _______________

HEIC CONVERSION:
[ ] I will convert project cover page.HEIC to JPG
[ ] Use a placeholder for Projects section for now
[ ] Other: _______________
```
