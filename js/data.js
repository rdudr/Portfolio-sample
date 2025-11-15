/**
 * DataStore - Centralized content management for portfolio
 * Manages all portfolio content organized by categories
 */

class DataStore {
  constructor() {
    this.data = this.initializeData();
  }

  /**
   * Initialize portfolio data structure
   * @returns {Array} Array of category objects
   */
  initializeData() {
    return [
      {
        slug: 'about-me',
        title: 'About Me',
        description: 'Learn about my background and passion',
        items: [
          {
            slug: 'introduction',
            title: 'Introduction',
            subtitle: 'Electrical Engineer',
            image: 'assets/images/about-hero.jpg',
            thumbnail: 'assets/images/profile-1.jpg',
            shortDescription: 'Passionate about IoT security and embedded systems',
            description: 'I am an Electrical Engineer driven by a passion for continuous learning and innovation. My interests lie in IoT security, embedded systems, and cutting-edge product development.',
            details: {
              location: 'Udaipur, India',
              specialization: 'IoT Security, Embedded Systems, Product Development'
            },
            tags: ['engineer', 'iot', 'embedded', 'security']
          }
        ]
      },
      {
        slug: 'education',
        title: 'Education',
        description: 'Academic background and qualifications',
        items: [
          {
            slug: 'ctae-mtech',
            title: 'College of Technology and Engineering (CTAE), Udaipur',
            subtitle: 'MTech Power Electronics',
            image: 'assets/images/graduation-background.jpg',
            thumbnail: 'assets/images/graduation-photo.jpg',
            shortDescription: 'Master of Technology in Power Electronics',
            description: 'Pursuing advanced studies in Power Electronics with focus on modern power systems and control.',
            date: '2027',
            location: 'Udaipur, India',
            tags: ['mtech', 'power electronics', 'engineering']
          },
          {
            slug: 'gits-btech',
            title: 'GITS, Udaipur',
            subtitle: 'BTech Electrical Engineering',
            image: 'assets/images/graduation-background.jpg',
            thumbnail: 'assets/images/graduation-photo.jpg',
            shortDescription: 'Bachelor of Technology in Electrical Engineering',
            description: 'Completed undergraduate studies with focus on electrical systems, embedded systems, and IoT.',
            date: '2024',
            location: 'Udaipur, India',
            tags: ['btech', 'electrical', 'engineering']
          },
          {
            slug: 'central-academy',
            title: 'Central Academy, Udaipur',
            subtitle: 'CBSE',
            image: 'assets/images/graduation-background.jpg',
            thumbnail: 'assets/images/graduation-photo.jpg',
            shortDescription: 'Higher Secondary Education',
            description: 'Completed higher secondary education with focus on science and mathematics.',
            date: '2020',
            location: 'Udaipur, India',
            tags: ['cbse', 'school']
          },
          {
            slug: 'indo-american',
            title: 'Indo American Public School, Udaipur',
            subtitle: 'CBSE',
            image: 'assets/images/graduation-background.jpg',
            thumbnail: 'assets/images/graduation-photo.jpg',
            shortDescription: 'Secondary Education',
            description: 'Completed secondary education with strong foundation in sciences.',
            date: '2018',
            location: 'Udaipur, India',
            tags: ['cbse', 'school']
          }
        ]
      },
      {
        slug: 'experience',
        title: 'Experience',
        description: 'Professional work experience',
        items: [
          {
            slug: 'aicte-idea-lab',
            title: 'AICTE IDEA Lab',
            subtitle: 'Technical Assistant',
            image: 'assets/images/conference-background.jpg',
            thumbnail: 'assets/images/experience-1.jpg',
            shortDescription: 'Supporting innovation and technical projects',
            description: 'Working as Technical Assistant supporting various innovation projects and technical initiatives.',
            date: 'Sept 2025 – Present',
            location: 'Udaipur, India',
            tags: ['technical', 'innovation', 'current']
          },
          {
            slug: 'shieldlink',
            title: 'Shieldlink Technolytix Pvt. Ltd',
            subtitle: 'Founder & CEO',
            image: 'assets/images/conference-background.jpg',
            thumbnail: 'assets/images/experience-2.jpg',
            shortDescription: 'IoT Security Product Development',
            description: 'Founded and led IoT security product development company, focusing on innovative security solutions for connected devices.',
            date: 'Aug 2023 – Nov 2024',
            location: 'Udaipur, India',
            tags: ['founder', 'iot', 'security', 'startup']
          },
          {
            slug: 'oriana-power',
            title: 'Oriana Power',
            subtitle: 'Solar Technician Internship',
            image: 'assets/images/conference-background.jpg',
            thumbnail: 'assets/images/experience-3.jpg',
            shortDescription: 'Solar energy systems internship',
            description: 'Gained hands-on experience with solar power systems, installation, and maintenance.',
            date: '25 July – 30 Aug 2022',
            location: 'Udaipur, India',
            tags: ['solar', 'internship', 'renewable energy']
          }
        ]
      },
      {
        slug: 'technical-activities',
        title: 'Technical Activities',
        description: 'Training programs and technical workshops',
        items: [
          {
            slug: 'industrial-automation',
            title: 'Industrial Auto-mission',
            subtitle: 'Sofcon, Ahmedabad',
            image: 'assets/images/technical-background.jpg',
            thumbnail: 'assets/images/technical-1.jpg',
            shortDescription: 'Industrial automation training',
            description: 'Comprehensive training in industrial automation systems and processes.',
            date: '6 Jan - 4 April 2024',
            location: 'Ahmedabad, India',
            tags: ['automation', 'industrial', 'training']
          },
          {
            slug: 'java-programming',
            title: 'Java programming',
            subtitle: 'MSME, Udaipur',
            image: 'assets/images/technical-background.jpg',
            thumbnail: 'assets/images/technical-2.jpg',
            shortDescription: 'Java programming course',
            description: 'Intensive Java programming training covering core concepts and applications.',
            date: '24 April 2023 - 25 May 2023',
            location: 'Udaipur, India',
            tags: ['java', 'programming', 'software']
          },
          {
            slug: 'autocad-solidworks',
            title: 'AutoCAD & SolidWorks',
            subtitle: 'CADCAM Expert, Udaipur',
            image: 'assets/images/technical-background.jpg',
            thumbnail: 'assets/images/technical-3.jpg',
            shortDescription: 'CAD software training',
            description: 'Professional training in AutoCAD and SolidWorks for engineering design.',
            date: 'May 2022 – June 2022',
            location: 'Udaipur, India',
            tags: ['cad', 'design', 'software']
          },
          {
            slug: 'industry-4-0',
            title: 'Industry 4.0: PLC+SCADA+IOT',
            subtitle: 'Vision Automation, Udaipur',
            image: 'assets/images/technical-background.jpg',
            thumbnail: 'assets/images/technical-1.jpg',
            shortDescription: 'Industry 4.0 technologies',
            description: 'Training in PLC, SCADA, and IoT integration for Industry 4.0 applications.',
            date: '3 Nov 2022 – 3 Dec 2022',
            location: 'Udaipur, India',
            tags: ['plc', 'scada', 'iot', 'industry 4.0']
          },
          {
            slug: 'electrical-panel',
            title: 'Electrical System & panel designing',
            subtitle: 'Vision Automation, Udaipur',
            image: 'assets/images/technical-background.jpg',
            thumbnail: 'assets/images/technical-2.jpg',
            shortDescription: 'Electrical panel design',
            description: 'Training in electrical system design and panel layout for industrial applications.',
            date: '4 July 2022 – 26 July 2022',
            location: 'Udaipur, India',
            tags: ['electrical', 'panel design', 'industrial']
          },
          {
            slug: 'adani-visit',
            title: 'Large Scale Industries',
            subtitle: 'Adani Thermal Power Station (ADTPS)',
            image: 'assets/images/technical-background.jpg',
            thumbnail: 'assets/images/technical-3.jpg',
            shortDescription: 'Industrial visit to thermal power station',
            description: 'Industrial visit to understand large-scale power generation and distribution systems.',
            date: 'Aug 2021 – Aug 2021',
            location: 'India',
            tags: ['power', 'industrial visit', 'thermal']
          }
        ]
      },
      {
        slug: 'learning-courses',
        title: 'Learning & Courses',
        description: 'Online courses and certifications',
        items: [
          {
            slug: 'design-tech-innovation',
            title: 'Design, Technology and Innovation',
            subtitle: 'IIT Mumbai',
            image: 'assets/images/learning-background.jpg',
            thumbnail: 'assets/images/certificate-1.jpg',
            shortDescription: '8-week course on design thinking',
            description: 'Comprehensive course on design thinking, technology innovation, and product development.',
            date: '8-week Course',
            location: 'Online',
            tags: ['design', 'innovation', 'iit']
          },
          {
            slug: 'soft-skills',
            title: 'Enhancing soft skills and Personality',
            subtitle: 'IIT Kanpur',
            image: 'assets/images/learning-background.jpg',
            thumbnail: 'assets/images/certificate-2.jpg',
            shortDescription: '8-week course on soft skills',
            description: 'Course focused on developing soft skills, communication, and personality development.',
            date: '8-weeks Course',
            location: 'Online',
            tags: ['soft skills', 'personality', 'iit']
          },
          {
            slug: 'intro-iot',
            title: 'Introduction to Internet of Things',
            subtitle: 'NPTEL',
            image: 'assets/images/learning-background.jpg',
            thumbnail: 'assets/images/certificate-3.jpg',
            shortDescription: '4-week IoT fundamentals',
            description: 'Foundational course covering IoT concepts, protocols, and applications.',
            date: '4-weeks Course',
            location: 'Online',
            tags: ['iot', 'nptel', 'online']
          },
          {
            slug: 'joy-computing-python',
            title: 'Joy of Computing using Python',
            subtitle: 'NPTEL',
            image: 'assets/images/learning-background.jpg',
            thumbnail: 'assets/images/certificate-1.jpg',
            shortDescription: '12-week Python programming',
            description: 'Comprehensive Python programming course covering fundamentals and applications.',
            date: '12-weeks Course',
            location: 'Online',
            tags: ['python', 'programming', 'nptel']
          },
          {
            slug: 'dsa-python',
            title: 'Programming, Data Structures and Algorithms using Python',
            subtitle: 'NPTEL',
            image: 'assets/images/learning-background.jpg',
            thumbnail: 'assets/images/certificate-2.jpg',
            shortDescription: '12-week DSA course',
            description: 'Advanced course on data structures, algorithms, and problem-solving using Python.',
            date: '12-weeks Course',
            location: 'Online',
            tags: ['dsa', 'python', 'algorithms', 'nptel']
          },
          {
            slug: 'intro-ml',
            title: 'Introduction to Machine Learning',
            subtitle: 'NPTEL',
            image: 'assets/images/learning-background.jpg',
            thumbnail: 'assets/images/certificate-3.jpg',
            shortDescription: '12-week ML fundamentals',
            description: 'Introduction to machine learning concepts, algorithms, and applications.',
            date: '12-weeks Course',
            location: 'Online',
            tags: ['machine learning', 'ai', 'nptel']
          },
          {
            slug: 'cloud-computing',
            title: 'Cloud Computing',
            subtitle: 'NPTEL',
            image: 'assets/images/learning-background.jpg',
            thumbnail: 'assets/images/certificate-1.jpg',
            shortDescription: '12-week cloud computing',
            description: 'Comprehensive course on cloud computing platforms, services, and architectures.',
            date: '12-weeks Course',
            location: 'Online',
            tags: ['cloud', 'computing', 'nptel']
          },
          {
            slug: 'cyber-security',
            title: 'Cyber Security and Privacy',
            subtitle: 'NPTEL',
            image: 'assets/images/learning-background.jpg',
            thumbnail: 'assets/images/certificate-2.jpg',
            shortDescription: '12-week security course',
            description: 'Course covering cybersecurity fundamentals, privacy, and security best practices.',
            date: '12-weeks Course',
            location: 'Online',
            tags: ['security', 'privacy', 'cyber', 'nptel']
          }
        ]
      },
      {
        slug: 'project',
        title: 'Project',
        description: 'Technical projects and implementations',
        items: [
          {
            slug: 'star-delta-stator',
            title: 'Star Delta Stator',
            subtitle: 'Motor Control System',
            image: 'assets/images/projects-background.jpg',
            thumbnail: 'assets/images/project-1.jpg',
            shortDescription: 'Advanced motor control system',
            description: 'Advanced motor control system implementation for industrial applications.',
            tags: ['motor control', 'electrical', 'automation']
          },
          {
            slug: 'star-delta-iot-plc',
            title: 'Star delta Stator using IOT and PLC Scada',
            subtitle: 'IoT-enabled Industrial Automation',
            image: 'assets/images/projects-background.jpg',
            thumbnail: 'assets/images/project-2.jpg',
            shortDescription: 'IoT and PLC integration',
            description: 'IoT-enabled industrial automation with PLC and SCADA integration for remote monitoring and control.',
            tags: ['iot', 'plc', 'scada', 'automation']
          },
          {
            slug: 'lora-detection',
            title: 'Detection usage of Lora Technology',
            subtitle: 'Long-range Wireless Communication',
            image: 'assets/images/projects-background.jpg',
            thumbnail: 'assets/images/project-3.jpg',
            shortDescription: 'LoRa communication system',
            description: 'Long-range wireless communication system for IoT applications using LoRa technology.',
            tags: ['lora', 'wireless', 'iot', 'communication']
          },
          {
            slug: 'ai-energy-management',
            title: 'AI Based Energy Management System',
            subtitle: 'Intelligent Energy Optimization',
            image: 'assets/images/projects-background.jpg',
            thumbnail: 'assets/images/project-1.jpg',
            shortDescription: 'AI-powered energy optimization',
            description: 'Intelligent energy optimization using machine learning algorithms for efficient power management.',
            tags: ['ai', 'energy', 'machine learning', 'optimization']
          },
          {
            slug: 'iot-security-product',
            title: 'IoT Security Product Development',
            subtitle: 'Comprehensive Security Solutions',
            image: 'assets/images/projects-background.jpg',
            thumbnail: 'assets/images/project-2.jpg',
            shortDescription: 'IoT security solutions',
            description: 'Comprehensive security solutions for IoT ecosystems, protecting connected devices and networks.',
            tags: ['iot', 'security', 'product', 'cybersecurity']
          },
          {
            slug: 'embedded-systems',
            title: 'Embedded Systems Integration Projects',
            subtitle: 'Real-time System Design',
            image: 'assets/images/projects-background.jpg',
            thumbnail: 'assets/images/project-3.jpg',
            shortDescription: 'Embedded system design',
            description: 'Real-time embedded system design and implementation for various applications.',
            tags: ['embedded', 'real-time', 'systems']
          },
          {
            slug: 'hardware-software-integration',
            title: 'Hardware-Software Integration Solutions',
            subtitle: 'Seamless Integration',
            image: 'assets/images/projects-background.jpg',
            thumbnail: 'assets/images/project-1.jpg',
            shortDescription: 'Hardware-software integration',
            description: 'Seamless integration of hardware components with software systems for complete solutions.',
            tags: ['hardware', 'software', 'integration']
          }
        ]
      },
      {
        slug: 'award',
        title: 'Award',
        description: 'Recognition and achievements',
        items: [
          {
            slug: 'kavach-2023',
            title: 'KAVACH CYBER HACKATHON 2023',
            subtitle: 'Winner - ₹1 Lakh Prize',
            image: 'assets/images/awards-background.jpg',
            thumbnail: 'assets/images/award-1.jpg',
            shortDescription: 'National cybersecurity hackathon winner',
            description: 'Won the KAVACH Cyber Hackathon 2023 with the project "Detection Usage of Lora" focusing on security in wireless communication.',
            date: 'August 2023',
            details: {
              project: 'Detection Usage of Lora',
              prize: '₹1 Lakh'
            },
            tags: ['hackathon', 'cybersecurity', 'winner', 'lora']
          },
          {
            slug: 'sih-2023',
            title: 'SMART INDIA HACKATHON 2023',
            subtitle: 'Winner - ₹1 Lakh Prize',
            image: 'assets/images/awards-background.jpg',
            thumbnail: 'assets/images/award-2.jpg',
            shortDescription: 'National innovation hackathon winner',
            description: 'Won the Smart India Hackathon 2023 with the project "AI Based Energy Management System" for intelligent power optimization.',
            date: 'December 2023',
            details: {
              project: 'AI Based Energy Management System',
              prize: '₹1 Lakh'
            },
            tags: ['hackathon', 'ai', 'winner', 'energy']
          }
        ]
      },
      {
        slug: 'skills-interests',
        title: 'Skills & Interests',
        description: 'Technical skills and personal interests',
        items: [
          {
            slug: 'programming-skills',
            title: 'Programming Skills',
            subtitle: 'Software Development',
            image: 'assets/images/skills-background.jpg',
            thumbnail: 'assets/images/hobby-1.jpg',
            shortDescription: 'Programming languages and frameworks',
            description: 'Proficient in Java, Arduino, MATLAB, Spring Boot, C & C++ for various applications.',
            details: {
              skills: ['Java', 'Arduino', 'MATLAB', 'Spring Boot', 'C & C++']
            },
            tags: ['programming', 'software', 'development']
          },
          {
            slug: 'software-tools',
            title: 'Software Tools',
            subtitle: 'Design and Analysis',
            image: 'assets/images/skills-background.jpg',
            thumbnail: 'assets/images/hobby-2.jpg',
            shortDescription: 'Engineering and design software',
            description: 'Experienced with AutoCAD, SolidWorks, GNU Radio, WireShark, Photoshop, Illustrator, and PSpice.',
            details: {
              skills: ['AutoCAD', 'SolidWorks', 'GNU Radio', 'WireShark', 'Photoshop', 'Illustrator', 'PSpice']
            },
            tags: ['software', 'tools', 'design']
          },
          {
            slug: 'hardware-skills',
            title: 'Hardware Skills',
            subtitle: 'Embedded Systems and IoT',
            image: 'assets/images/skills-background.jpg',
            thumbnail: 'assets/images/hobby-3.jpg',
            shortDescription: 'Hardware and communication protocols',
            description: 'Expertise in Robotics, PLC & SCADA, UART, I2C, SPI, LoRa, Bluetooth, NRF, and RF technologies.',
            details: {
              skills: ['Robotics', 'PLC & SCADA', 'UART', 'I2C', 'SPI', 'LoRa', 'Bluetooth', 'NRF', 'RF']
            },
            tags: ['hardware', 'embedded', 'iot', 'protocols']
          },
          {
            slug: 'personal-interests',
            title: 'Personal Interests',
            subtitle: 'Beyond Technology',
            image: 'assets/images/skills-background.jpg',
            thumbnail: 'assets/images/hobby-1.jpg',
            shortDescription: 'Continuous learning and innovation',
            description: 'Passionate about exploring new technologies, contributing to open-source projects, and staying updated with the latest innovations in IoT and embedded systems.',
            tags: ['interests', 'learning', 'innovation']
          }
        ]
      }
    ];
  }

  /**
   * Get all categories
   * @returns {Array} All category objects
   */
  getAllCategories() {
    return this.data;
  }

  /**
   * Get category by slug
   * @param {string} slug - Category slug
   * @returns {Object|null} Category object or null if not found
   */
  getCategoryBySlug(slug) {
    return this.data.find(category => category.slug === slug) || null;
  }

  /**
   * Get item by category and item slug
   * @param {string} categorySlug - Category slug
   * @param {string} itemSlug - Item slug
   * @returns {Object|null} Item object or null if not found
   */
  getItemBySlug(categorySlug, itemSlug) {
    const category = this.getCategoryBySlug(categorySlug);
    if (!category) return null;
    
    return category.items.find(item => item.slug === itemSlug) || null;
  }

  /**
   * Search items across all categories
   * @param {string} query - Search query
   * @returns {Array} Array of matching items with category info
   */
  searchItems(query) {
    if (!query || query.trim() === '') return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    const results = [];

    this.data.forEach(category => {
      category.items.forEach(item => {
        const searchableText = [
          item.title,
          item.subtitle,
          item.description,
          item.shortDescription,
          ...(item.tags || [])
        ].join(' ').toLowerCase();

        if (searchableText.includes(normalizedQuery)) {
          results.push({
            ...item,
            categorySlug: category.slug,
            categoryTitle: category.title
          });
        }
      });
    });

    return results;
  }

  /**
   * Filter items by category
   * @param {string} categorySlug - Category slug to filter by
   * @returns {Array} Array of items in the category
   */
  filterByCategory(categorySlug) {
    const category = this.getCategoryBySlug(categorySlug);
    return category ? category.items : [];
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataStore;
}
