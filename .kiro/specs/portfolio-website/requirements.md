# Requirements Document

## Introduction

This document outlines the requirements for a modern personal portfolio website for Rishabh Dangi. The website will feature a premium, elegant design with a dark-overlay aesthetic, full-screen background images, and smooth transitions between sections showcasing About Me, Education, and Experience information.

## Glossary

- **Portfolio System**: The complete web application that displays personal information, education, and experience
- **Hero Panel**: A full-screen section with background image and content overlay
- **Image Carousel**: A rotating display of multiple images with navigation dots
- **Tab Switcher**: A navigation component allowing users to switch between Video, Photos, and Audio views
- **Floating Card**: A rounded-corner image container with elevation styling
- **Scroll Snap**: A CSS feature that aligns sections to viewport boundaries during scrolling

## Requirements

### Requirement 1

**User Story:** As a visitor, I want to view a full-screen hero section for each major content area, so that I can focus on one topic at a time with an immersive experience

#### Acceptance Criteria

1. THE Portfolio System SHALL render eight full-screen hero panels for About Me, Education, Experience, Technical Activities, Learning & Courses, Projects, Awards, and Skills & Interests sections
2. WHEN a user scrolls, THE Portfolio System SHALL snap each hero panel to fill the viewport
3. THE Portfolio System SHALL apply a dark overlay to each background image to ensure text readability
4. THE Portfolio System SHALL display large serif headings at the top of each hero panel
5. THE Portfolio System SHALL render light-colored paragraph text with sufficient contrast against the dark overlay

### Requirement 2

**User Story:** As a visitor, I want to see a search bar and media type switcher in the header, so that I can navigate and filter content easily

#### Acceptance Criteria

1. THE Portfolio System SHALL display a search bar in the top-left corner with placeholder text "Search"
2. THE Portfolio System SHALL render a tab switcher in the top-right corner with three options: Video, Photos, and Audio
3. WHEN a user clicks a tab option, THE Portfolio System SHALL highlight the selected tab
4. THE Portfolio System SHALL maintain the header visibility across all sections

### Requirement 3

**User Story:** As a visitor, I want to view profile and contextual images in floating cards, so that I can see visual content alongside text information

#### Acceptance Criteria

1. THE Portfolio System SHALL display rounded-corner floating image cards on the right side of each hero panel
2. THE Portfolio System SHALL apply warm bevel shadows to create 3D-like elevation on image cards
3. WHEN multiple images are available for a section, THE Portfolio System SHALL render an image carousel with navigation dots at the bottom
4. WHEN a user clicks a navigation dot, THE Portfolio System SHALL transition to the corresponding image with a smooth animation
5. THE Portfolio System SHALL display 2-3 images in the About Me carousel including a profile photo

### Requirement 4

**User Story:** As a visitor, I want to read about Rishabh's background and interests, so that I can understand his professional profile

#### Acceptance Criteria

1. THE Portfolio System SHALL display "About Me" as the heading in the first hero panel
2. THE Portfolio System SHALL render the background image showing a motorcycle and rocky landscape
3. THE Portfolio System SHALL display the biography text: "I am an Electrical Engineer driven by a passion for continuous learning and innovation. My interests lie in IoT security, embedded systems, and cutting-edge product development. With a strong foundation in both hardware and software, I strive to create impactful solutions that bridge technology with real-world challenges. I'm dedicated to building scalable, efficient, and future-ready technologies contributing to India's innovation ecosystem."
4. THE Portfolio System SHALL render a "Know More" button with rounded corners below the biography text
5. THE Portfolio System SHALL display a profile photo and additional photos in a carousel on the right side

### Requirement 5

**User Story:** As a visitor, I want to view Rishabh's educational background, so that I can understand his academic qualifications

#### Acceptance Criteria

1. THE Portfolio System SHALL display "Education" as the heading in the second hero panel
2. THE Portfolio System SHALL render a graduation or fountain background image
3. THE Portfolio System SHALL display four education entries in chronological order with institution name, year, and degree/qualification
4. THE Portfolio System SHALL render the following education items:
   - College of Technology and Engineering (CTAE), Udaipur (2027) – MTech Power Electronics
   - GITS, Udaipur (2024) – BTech Electrical Engineering
   - Central Academy, Udaipur (2020) – CBSE
   - Indo American Public School, Udaipur (2018) – CBSE
5. THE Portfolio System SHALL display a rounded graduation picture card on the right side
6. THE Portfolio System SHALL render a red "Know More" button below the education list

### Requirement 6

**User Story:** As a visitor, I want to view Rishabh's professional experience, so that I can understand his work history and accomplishments

#### Acceptance Criteria

1. THE Portfolio System SHALL display "Experience" as the heading in the third hero panel
2. THE Portfolio System SHALL render a conference or exhibition background image
3. THE Portfolio System SHALL display three experience entries with organization name, role, dates, and description
4. THE Portfolio System SHALL render the following experience items:
   - AICTE IDEA Lab – Technical Assistant (Sept 2025 – Present)
   - Shieldlink Technolytix Pvt. Ltd — Founder & CEO (Aug 2023 – Nov 2024), IoT Security Product
   - Oriana Power – Solar Technician Internship (25 July – 30 Aug 2022)
5. THE Portfolio System SHALL display a carousel of conference photos and portrait on the right side
6. THE Portfolio System SHALL render a "Know More" button below the experience list

### Requirement 7

**User Story:** As a visitor, I want to experience smooth transitions and animations, so that the website feels polished and professional

#### Acceptance Criteria

1. WHEN a user scrolls between sections, THE Portfolio System SHALL apply smooth fade or slide animations
2. WHEN a user interacts with carousel navigation, THE Portfolio System SHALL transition between images with smooth animations lasting 300-500 milliseconds
3. WHEN a user hovers over buttons, THE Portfolio System SHALL apply smooth hover state transitions
4. THE Portfolio System SHALL apply soft-rounded corners with subtle gradients to all interactive buttons

### Requirement 8

**User Story:** As a visitor, I want to view Rishabh's technical activities and involvement, so that I can understand his contributions to the technical community

#### Acceptance Criteria

1. THE Portfolio System SHALL display "Technical Activities" as the heading in the fourth hero panel
2. THE Portfolio System SHALL render an appropriate background image for the technical activities section
3. THE Portfolio System SHALL display the following six technical activity entries with organization, location, and dates:
   - Industrial Auto-mission, [Sofcon, Ahmedabad] [6 Jan - 4 April 2024]
   - Java programming, MSME, Udaipur [24 April 2023 - 25 May 2023]
   - AutoCAD & SolidWorks, CADCAM Expert, Udaipur [May 2022 – June 2022]
   - Industry 4.0: PLC+SCADA+IOT, Vision Automation, Udaipur [3 Nov 2022 – 3 Dec 2022]
   - Electrical System & panel designing Vision Automation, Udaipur [4 July 2022 – 26 July 2022]
   - Large Scale Industries Adani Thermal Power Station (ADTPS) [Aug 2021 – Aug 2021]
4. THE Portfolio System SHALL render a floating image card or carousel on the right side showing relevant technical activity photos
5. THE Portfolio System SHALL render a "Know More" button below the technical activities list

### Requirement 9

**User Story:** As a visitor, I want to view Rishabh's learning journey and courses, so that I can understand his continuous education efforts

#### Acceptance Criteria

1. THE Portfolio System SHALL display "Learning & Courses" as the heading in the fifth hero panel
2. THE Portfolio System SHALL render an appropriate background image for the learning section
3. THE Portfolio System SHALL display the following eight course entries with course name, institution, and duration:
   - Design, Technology and Innovation, 8-week Course IIT Mumbai
   - Enhancing soft skills and Personality 8-weeks Course IIT Kanpur
   - Introduction to Internet of Things 4-weeks Course NPTEL
   - Joy of Computing using Python 12-weeks Course NPTEL
   - Programming, Data Structures and Algorithms using Python 12-weeks Course NPTEL
   - Introduction to Machine Learning 12-weeks Course NPTEL
   - Cloud Computing 12-weeks Course NPTEL
   - Cyber Security and Privacy 12-weeks Course NPTEL
4. THE Portfolio System SHALL render a floating image card or carousel on the right side showing certificates or learning-related photos
5. THE Portfolio System SHALL render a "Know More" button below the courses list

### Requirement 10

**User Story:** As a visitor, I want to view Rishabh's projects, so that I can understand his practical work and innovations

#### Acceptance Criteria

1. THE Portfolio System SHALL display "Projects" as the heading in the sixth hero panel
2. THE Portfolio System SHALL render an appropriate background image for the projects section
3. THE Portfolio System SHALL display the following seven project entries with project name and description:
   - Star Delta Stator
   - Star delta Stator using IOT and PLC Scada
   - Detection usage of Lora Technology
   - AI Based Energy Management System
   - IoT Security Product Development
   - Embedded Systems Integration Projects
   - Hardware-Software Integration Solutions
4. THE Portfolio System SHALL render a floating image card or carousel on the right side showing project photos or demonstrations
5. THE Portfolio System SHALL render a "Know More" button below the projects list

### Requirement 11

**User Story:** As a visitor, I want to view Rishabh's awards and recognitions, so that I can understand his achievements and accomplishments

#### Acceptance Criteria

1. THE Portfolio System SHALL display "Awards" as the heading in the seventh hero panel
2. THE Portfolio System SHALL render an appropriate background image for the awards section
3. THE Portfolio System SHALL display the following award entries with award name, date, project, and prize details:
   - KAVACH CYBER HACKATHON 2023, August 2023, Detection Usage of Lora, Winner Got Winning prize of 1 Lakh
   - SMART INDIA HACKATHON 2023, December 2023, AI Based Energy Management System, Winner Got Winning prize of 1 Lakh
4. THE Portfolio System SHALL render a floating image card or carousel on the right side showing award certificates or ceremony photos
5. THE Portfolio System SHALL render a "Know More" button below the awards list

### Requirement 12

**User Story:** As a visitor, I want to view Rishabh's skills and interests, so that I can understand his technical capabilities and personal interests

#### Acceptance Criteria

1. THE Portfolio System SHALL display "Skills & Interests" as the heading in the eighth hero panel
2. THE Portfolio System SHALL render an appropriate background image for the skills section
3. THE Portfolio System SHALL display skills organized in three categories with the following specific skills:
   - Programming: Java, Arduino, Familiarity with MATLAB, Spring Boot, C & C++
   - Software: Auto CAD, Solid Works, GNU Radio, WireShark, Photoshop, Illustrator, PSpice
   - Hardware: Robotics, PLC & Scada, UART, I2C, SPI, Lora, Bluetooth, NRF, RF
4. THE Portfolio System SHALL display personal interests with descriptions
5. THE Portfolio System SHALL render a floating image card or carousel on the right side showing hobby or interest-related photos
6. THE Portfolio System SHALL render a "Know More" button below the skills and interests content

### Requirement 13

**User Story:** As a visitor using any device, I want the website to display correctly, so that I can access content on mobile phones, tablets, and desktop computers

#### Acceptance Criteria

1. WHEN the viewport width is less than 768 pixels, THE Portfolio System SHALL stack content vertically and adjust image card sizes
2. WHEN the viewport width is 768 pixels or greater, THE Portfolio System SHALL display content in a two-column layout with text on the left and images on the right
3. THE Portfolio System SHALL scale typography proportionally based on viewport size
4. THE Portfolio System SHALL maintain touch-friendly interaction targets of at least 44x44 pixels on mobile devices
5. THE Portfolio System SHALL ensure all images are responsive and maintain aspect ratios across different screen sizes
