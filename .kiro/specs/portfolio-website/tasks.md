# Implementation Plan

- [x] 1. Set up project structure and foundation files





  - Create directory structure (css/, js/, assets/images/)
  - Create index.html with semantic HTML5 structure
  - Create css/reset.css with CSS normalization
  - Create css/variables.css with CSS custom properties for colors, typography, spacing, borders, shadows, and transitions
  - _Requirements: 1.1, 1.4, 13.1, 13.2_

- [x] 2. Implement base HTML structure with scroll-snap container





  - Create main scroll container with scroll-snap-type: y mandatory
  - Add eight hero panel sections with data-section attributes for About Me, Education, Experience, Technical Activities, Learning & Courses, Projects, Awards, and Skills & Interests
  - Apply scroll-snap-align: start to each hero panel
  - _Requirements: 1.1, 1.2_
-

- [x] 3. Build header component with search and tab switcher




  - Create fixed header with site-header class
  - Implement search input with placeholder "Search"
  - Create tab switcher navigation with Video, Photos, and Audio buttons
  - Style header with semi-transparent background and backdrop-filter blur
  - Apply flexbox layout for space-between alignment
  - _Requirements: 2.1, 2.2, 2.4_

- [x] 4. Implement hero panel component structure and styling




  - Create hero-background, hero-overlay, and hero-content divs for each section
  - Style hero panels with 100vh height and full-screen background images
  - Apply dark overlay (rgba(0, 0, 0, 0.6)) for text readability
  - Implement two-column grid layout (60/40 split) for desktop
  - Add content-left and content-right containers

  - _Requirements: 1.1, 1.3, 1.4, 13.2_

- [x] 5. Create CTA button component with variants




  - Implement cta-button class with soft-rounded corners (border-radius: 25px)
  - Create default variant with subtle linear gradient background
  - Create red variant (data-variant="red") with #d32f2f background
  - Add hover effects with transform: translateY(-2px) and box-shadow increase
  - Apply smooth transitions (0.3s ease)
  - _Requirements: 4.4, 5.6, 6.6, 7.3_

- [x] 6. Implement floating image card component




  - Create image-card class with border-radius: 20px
  - Apply box-shadow with warm bevel effect (0 10px 40px rgba(0, 0, 0, 0.4) and inset highlight)
  - Add transform: translateZ(0) for GPU acceleration
  - Set max-width: 400px for desktop, 100% for mobile
  - _Requirements: 3.1, 3.2_
-

- [x] 7. Build image carousel component structure




  - Create carousel container with carousel-track and carousel-dots
  - Implement carousel-image elements with active class for first image
  - Create dot navigation buttons with data-index attributes
  - Style carousel with floating card appearance
  - Apply object-fit: cover and aspect-ratio: 3/4 to images
  - Position dots at bottom center
  - _Requirements: 3.3, 3.4_
-

- [x] 8. Implement carousel navigation JavaScript




  - Create js/carousel.js with carousel navigation logic
  - Implement navigateCarousel function with index validation
  - Add smooth fade transitions (300-500ms) between images
  - Implement active state toggling for dots and images
  - Add debounce to prevent rapid clicking
  - Use event delegation for dot click handlers
  - _Requirements: 3.4, 7.2_
- [x] 9. Implement tab switcher JavaScript functionality



- [ ] 9. Implement tab switcher JavaScript functionality

  - Create js/navigation.js for tab switcher logic
  - Add click event handlers for tab buttons
  - Implement active state toggling on tab click
  - Cache DOM references for performance
  - _Requirements: 2.3_

- [x] 10. Create layout.css with responsive grid system





  - Implement desktop grid layout (≥768px) with grid-template-columns: 1.5fr 1fr
  - Create mobile flexbox layout (<768px) with flex-direction: column
  - Add responsive spacing with CSS custom properties
  - Implement tablet breakpoint (768px-1023px) adjustments
  - _Requirements: 13.1, 13.2_
-

- [x] 11. Create components.css with reusable component styles




  - Style header component with fixed positioning and z-index layering
  - Style hero panel components with background positioning
  - Style image carousel with floating card appearance
  - Style CTA buttons with hover effects
  - Style floating image cards with elevation
  - _Requirements: 1.3, 1.4, 3.1, 3.2_
-

- [x] 12. Create animations.css with transitions and keyframes




  - Implement fadeInUp keyframe animation for hero content
  - Add carousel image fade transitions
  - Create button hover transition effects
  - Add smooth scroll behavior
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 13. Populate About Me section content





  - Add "About Me" heading with hero-heading class
  - Insert biography text from requirements
  - Add motorcycle and rocky landscape background image
  - Create carousel with profile photo and 2 additional images
  - Add "Know More" button with default variant
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
- [x] 14. Populate Education section content




- [ ] 14. Populate Education section content

  - Add "Education" heading
  - Insert graduation or fountain background image
  - Create list of four education entries with institution, year, and degree
  - Add CTAE MTech, GITS BTech, Central Academy CBSE, and Indo American CBSE entries
  - Add rounded graduation picture card
  - Add red "Know More" button
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 15. Populate Experience section content





  - Add "Experience" heading
  - Insert conference or exhibition background image
  - Create list of three experience entries with organization, role, dates, and description
  - Add AICTE IDEA Lab, Shieldlink Technolytix, and Oriana Power entries
  - Add carousel with conference photos and portrait
  - Add "Know More" button
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_
-

- [x] 16. Populate Technical Activities section content




  - Add "Technical Activities" heading
  - Insert appropriate background image
  - Create list of six technical activity entries with organization, location, and dates
  - Add Industrial Auto-mission, Java programming, AutoCAD & SolidWorks, Industry 4.0, Electrical System designing, and Large Scale Industries entries
  - Add floating image card or carousel with technical activity photos
  - Add "Know More" button
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
-

- [x] 17. Populate Learning & Courses section content




  - Add "Learning & Courses" heading
  - Insert appropriate background image
  - Create list of eight course entries with course name, institution, and duration
  - Add Design Technology Innovation, Soft skills, IoT, Python, Data Structures, Machine Learning, Cloud Computing, and Cyber Security courses
  - Add floating image card or carousel with certificates
  - Add "Know More" button
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_



- [ ] 18. Populate Projects section content

  - Add "Projects" heading
  - Insert appropriate background image
  - Create list of seven project entries with project name and description
  - Add Star Delta Stator, IoT PLC Scada, Lora Detection, AI Energy Management, IoT Security, Embedded Systems, and Hardware-Software Integration projects
  - Add floating image card or carousel with project photos



  - Add "Know More" button
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 19. Populate Awards section content

  - Add "Awards" heading
  - Insert appropriate background image




  - Create list of two award entries with award name, date, project, and prize details
  - Add KAVACH CYBER HACKATHON 2023 and SMART INDIA HACKATHON 2023 entries
  - Add floating image card or carousel with award certificates
  - Add "Know More" button
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 20. Populate Skills & Interests section content

  - Add "Skills & Interests" heading


  - Insert appropriate background image
  - Create three skill categories: Programming, Software, and Hardware
  - Add Programming skills: Java, Arduino, MATLAB, Spring Boot, C & C++
  - Add Software skills: Auto CAD, Solid Works, GNU Radio, WireShark, Photoshop, Illustrator, PSpice
  - Add Hardware skills: Robotics, PLC & Scada, UART, I2C, SPI, Lora, Bluetooth, NRF, RF
  - Add personal interests with descriptions



  - Add floating image card or carousel with hobby photos
  - Add "Know More" button
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [x] 21. Implement responsive typography scaling





  - Apply clamp() function for heading sizes (2.5rem to 4rem)
  - Apply clamp() function for body text sizes (1rem to 1.125rem)
  - Set line-height: 1.6 for body text and 1.2 for headings
  - Ensure text color contrast meets WCAG AA standards



  - _Requirements: 1.5, 13.3_

- [ ] 22. Implement mobile layout adjustments

  - Stack content vertically for viewports <768px



  - Adjust image card sizes for mobile devices
  - Ensure touch targets are at least 44x44 pixels
  - Test layout on 320px, 375px viewports
  - _Requirements: 13.1, 13.4_




- [-] 23. Add accessibility features


  - Implement proper heading hierarchy (h1 for main, h2 for sections)
  - Add ARIA labels for carousel navigation
  - Add descriptive alt text for all images
  - Ensure keyboard navigation for tab switcher and carousel dots
  - Add role attributes for carousel (region, list, listitem, tablist, tab)
  - _Requirements: 1.4, 3.4_

- [ ] 24. Implement image lazy loading and error handling

  - Create loadImage function in js/main.js with onload and onerror handlers
  - Add fallback background colors for failed image loads
  - Implement lazy loading for images below the fold
  - Add loaded and error classes for styling states
  - _Requirements: 3.1, 13.5_

- [ ] 25. Create main.js for application initialization

  - Initialize carousel components for all sections
  - Set up tab switcher event listeners
  - Cache DOM references for performance
  - Initialize lazy loading for images
  - _Requirements: 3.3, 3.4, 2.3_

- [ ] 26. Optimize performance and finalize

  - Compress all images to <200KB
  - Minimize CSS and JavaScript files
  - Test scroll-snap behavior across all sections
  - Verify smooth transitions and animations
  - Test responsive behavior on multiple viewport sizes
  - Validate HTML and CSS
  - _Requirements: 1.2, 7.1, 7.2, 13.5_
