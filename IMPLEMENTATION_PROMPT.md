# Implementation Prompt for Portfolio Data Structure

## Task: Update data.js with Final Image Strategy

### Objective
Update the `js/data.js` file to use the approved hybrid image strategy:
1. User's cover images for detail page heroes
2. User's card images (card 1-8) for first card in each row
3. Unsplash images for additional cards (red/black theme)

### File Corrections Assumed
- `learing and course cover page.jpg` → `learning and course cover page.jpg`
- `skill and intrest cover page.png` → `skill and interest cover page.png`
- `project cover page.HEIC` → `project cover page.jpg`

### Complete Data Structure

The data structure follows this pattern:
```javascript
{
  slug: 'section-slug',
  title: 'Section Title',
  description: 'Section description',
  items: [
    {
      slug: 'item-slug',
      title: 'Item Title',
      subtitle: 'Item Subtitle',
      image: 'path/to/hero-image.jpg',        // Detail page background
      thumbnail: 'path/to/card-image.jpg',    // Card thumbnail
      shortDescription: 'Brief description',
      description: 'Full description for detail page',
      // Additional fields as needed
    }
  ]
}
```

### Image Mapping by Section

#### 1. About Me (1 item)
- Hero: `assets/images/about me cover.png`
- Card 1: `assets/images/card 1.jpg`

#### 2. Education (4 items)
- Hero: `assets/images/education cover.jpg`
- Card 1: `assets/images/card 2.jpg`
- Cards 2-4: Unsplash (university, graduation, books themes)

#### 3. Experience (3 items)
- Hero: `assets/images/experience cover page.jpg`
- Card 1: `assets/images/card 3.jpg`
- Cards 2-3: Unsplash (corporate, tech office themes)

#### 4. Technical Activities (6 items)
- Hero: `assets/images/technical activities cover page.png`
- Card 1: `assets/images/card 4.JPG`
- Cards 2-6: Unsplash (abstract tech, code themes)

#### 5. Learning & Courses (7 items)
- Hero: `assets/images/learning and course cover page.jpg`
- Card 1: `assets/images/card 5.jpg`
- Cards 2-7: Unsplash (online learning, certificates themes)

#### 6. Projects (7 items)
- Hero: `assets/images/project cover page.jpg`
- Card 1: `assets/images/card 6.jpg`
- Cards 2-7: Unsplash (IoT, hardware, microchips themes)

#### 7. Awards (2 items)
- Hero: `assets/images/award cover page.jpg`
- Card 1: `assets/images/card 7.JPG`
- Card 2: Unsplash (trophy, success themes)

#### 8. Skills & Interests (3 items)
- Hero: `assets/images/skill and interest cover page.png`
- Card 1: `assets/images/card 8.jpg`
- Cards 2-3: Unsplash (software, hardware, robotics themes)

### Unsplash Image Format
Use: `https://source.unsplash.com/800x450/?keyword1,keyword2,dark`

### Implementation Notes
- Maintain existing DataStore class structure
- Keep all existing methods (getAll, getBySlug, etc.)
- Ensure all slugs are URL-friendly
- Use consistent field names across all items
- Include tags for search functionality
