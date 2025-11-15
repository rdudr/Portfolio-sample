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
      // 1. About Me
      {
        slug: 'about-me',
        title: 'About Me',
        description: 'Learn about my background and passion',
        items: [
          {
            slug: 'introduction',
            title: 'About Rishabh Dangi',
            subtitle: 'Electrical Engineer',
            image: 'assets/images/about me cover.png',
            thumbnail: 'assets/images/card 1.jpg',
            shortDescription: 'Passionate about IoT security and embedded systems',
            description: "I am an Electrical Engineer driven by a passion for continuous learning and innovation. My interests lie in IoT security, embedded systems, and cutting-edge product development. With a strong foundation in both hardware and software, I strive to create impactful solutions that bridge technology with real-world challenges. I'm dedicated to building scalable, efficient, and future-ready technologies contributing to India's innovation ecosystem.",
            details: {
              location: 'Udaipur, India',
              specialization: 'IoT Security, Embedded Systems, Product Development'
            },
            tags: ['engineer', 'iot', 'embedded', 'security', 'innovation']
          }
        ]
      },
      
      // 2. Education
      {
        slug: 'education',
        title: 'Education',
        description: 'Academic background and qualifications',
        items: [
          {
            slug: 'ctae-mtech',
            title: 'Master of Technology | Power Electronics',
            subtitle: 'College of Technology and Engineering (CTAE), Udaipur | 2027',
            image: 'assets/images/education cover.jpg',
            thumbnail: 'assets/images/card 2.jpg',
            shortDescription: 'Master of Technology in Power Electronics',
            description: 'Currently pursuing a Master of Technology with a specialization in Power Electronics at CTAE, Udaipur. Focusing on advanced power systems, control strategies, and modern power electronics applications.',
            date: '2027',
            location: 'Udaipur, India',
            tags: ['mtech', 'power electronics', 'engineering', 'ctae']
          },
          {
            slug: 'gits-btech',
            title: 'Bachelor of Technology | Electrical Engineering',
            subtitle: 'Geetanjali Institute of Technical Studies, Udaipur | 2024',
            image: 'assets/images/education cover.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?graduation,university,dark',
            shortDescription: 'Bachelor of Technology in Electrical Engineering',
            description: 'Completed a Bachelor of Technology in Electrical Engineering, providing a strong foundational knowledge in electrical systems, embedded systems, IoT, and power electronics.',
            date: '2024',
            location: 'Udaipur, India',
            tags: ['btech', 'electrical', 'engineering', 'gits']
          },
          {
            slug: 'central-academy',
            title: 'Senior Secondary | CBSE',
            subtitle: 'Central Academy Sr. Sec. School, Sec5 Udaipur, Raj.IN | 2020',
            image: 'assets/images/education cover.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?school,books,red',
            shortDescription: 'Higher Secondary Education',
            description: 'Completed senior secondary education under the CBSE curriculum with focus on science and mathematics, building a strong foundation for engineering studies.',
            date: '2020',
            location: 'Udaipur, India',
            tags: ['cbse', 'school', 'senior secondary']
          },
          {
            slug: 'indo-american',
            title: 'Secondary School | CBSE',
            subtitle: 'Indo American Public School, Udaipur, Raj. IN | 2018',
            image: 'assets/images/education cover.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?education,dark,red',
            shortDescription: 'Secondary Education',
            description: 'Completed secondary education under the CBSE curriculum with strong foundation in sciences and mathematics.',
            date: '2018',
            location: 'Udaipur, India',
            tags: ['cbse', 'school', 'secondary']
          }
        ]
      },
      
      // 3. Experience
      {
        slug: 'experience',
        title: 'Experience',
        description: 'Professional work experience',
        items: [
          {
            slug: 'aicte-idea-lab',
            title: 'Technical Assistant',
            subtitle: 'AICTE IDEA LAB Geetanjali Institute of Technical Studies | Sept 2025 - Till Now',
            image: 'assets/images/experience cover page.jpg',
            thumbnail: 'assets/images/experience/AICTE LAB.JPG',
            shortDescription: 'Supporting innovation and technical projects',
            description: 'Serving as a Technical Assistant at the AICTE IDEA Lab, supporting various innovation projects, technical initiatives, and helping students with their research and development activities.',
            date: 'Sept 2025 – Present',
            location: 'Udaipur, India',
            tags: ['technical', 'innovation', 'current', 'aicte']
          },
          {
            slug: 'shieldlink',
            title: 'Founder & CEO',
            subtitle: 'Shieldlink Technolytix Private limited. | August 2023 - Nov 2024',
            image: 'assets/images/experience cover page.jpg',
            thumbnail: 'assets/images/experience/shieldlink.jpeg',
            shortDescription: 'IoT Security Product Development',
            description: 'Founded Shieldlink Technolytix, focusing on technology building for IoT security of LoRa Tech. Led product development, team management, and strategic planning for innovative security solutions.',
            date: 'Aug 2023 – Nov 2024',
            location: 'Udaipur, India',
            tags: ['founder', 'iot', 'security', 'startup', 'lora']
          },
          {
            slug: 'oriana-power',
            title: '45 days Internship',
            subtitle: 'Oriana Power (Udaipur Cement Work Limited) | 25 July - 30 August 2022',
            image: 'assets/images/experience cover page.jpg',
            thumbnail: 'assets/images/experience/orina.webp',
            shortDescription: 'Solar energy systems internship',
            description: 'Worked as a Solar Technician during a 45-day internship, gaining hands-on experience with solar power systems, installation, maintenance, and troubleshooting.',
            date: '25 July – 30 Aug 2022',
            location: 'Udaipur, India',
            tags: ['solar', 'internship', 'renewable energy', 'power']
          }
        ]
      },
      
      // 4. Technical Activities
      {
        slug: 'technical-activities',
        title: 'Technical Activities',
        description: 'Training programs and technical workshops',
        items: [
          {
            slug: 'industrial-automation',
            title: 'Industrial Auto-mission',
            subtitle: 'Sofcon, Ahmedabad | 6 Jan - 4 April 2024',
            image: 'assets/images/technical activities cover page.png',
            thumbnail: 'assets/images/card 4.JPG',
            shortDescription: 'Industrial automation training',
            description: 'Completed the Industrial Auto-mission program in Ahmedabad, gaining comprehensive knowledge in industrial automation systems, processes, and modern manufacturing technologies.',
            date: '6 Jan - 4 April 2024',
            location: 'Ahmedabad, India',
            tags: ['automation', 'industrial', 'training', 'sofcon']
          },
          {
            slug: 'java-programming',
            title: 'Java programming',
            subtitle: 'MSME, Udaipur | 24 April 2023 - 25 May 2023',
            image: 'assets/images/technical activities cover page.png',
            thumbnail: 'https://source.unsplash.com/800x450/?code,java,dark',
            shortDescription: 'Java programming course',
            description: 'Java programming training at MSME, Udaipur. Covered core Java concepts, object-oriented programming, data structures, and application development.',
            date: '24 April 2023 - 25 May 2023',
            location: 'Udaipur, India',
            tags: ['java', 'programming', 'software', 'msme']
          },
          {
            slug: 'autocad-solidworks',
            title: 'AutoCAD & SolidWorks',
            subtitle: 'CADCAM Expert, Udaipur | May 2022 – June 2022',
            image: 'assets/images/technical activities cover page.png',
            thumbnail: 'https://source.unsplash.com/800x450/?3d,cad,modeling,red',
            shortDescription: 'CAD software training',
            description: 'Training in AutoCAD & SolidWorks from CADCAM Expert, Udaipur. Learned 2D drafting, 3D modeling, assembly design, and engineering documentation.',
            date: 'May 2022 – June 2022',
            location: 'Udaipur, India',
            tags: ['cad', 'design', 'software', 'autocad', 'solidworks']
          },
          {
            slug: 'industry-4-0',
            title: 'Industry 4.0: PLC+SCADA+IOT',
            subtitle: 'Vision Automation, Udaipur | 3 Nov 2022 – 3 Dec 2022',
            image: 'assets/images/technical activities cover page.png',
            thumbnail: 'https://source.unsplash.com/800x450/?automation,iot,industry,dark',
            shortDescription: 'Industry 4.0 technologies',
            description: 'Specialized training in Industry 4.0 technologies including PLC programming, SCADA systems, and IoT integration for smart manufacturing.',
            date: '3 Nov 2022 – 3 Dec 2022',
            location: 'Udaipur, India',
            tags: ['plc', 'scada', 'iot', 'industry 4.0', 'automation']
          },
          {
            slug: 'electrical-panel',
            title: 'Electrical System & panel designing',
            subtitle: 'Vision Automation, Udaipur | 4 July 2022 – 26 July 2022',
            image: 'assets/images/technical activities cover page.png',
            thumbnail: 'https://source.unsplash.com/800x450/?electrical,panel,engineering,red',
            shortDescription: 'Electrical panel design',
            description: 'Training in electrical system and panel design, covering circuit design, component selection, wiring diagrams, and safety standards.',
            date: '4 July 2022 – 26 July 2022',
            location: 'Udaipur, India',
            tags: ['electrical', 'panel design', 'systems', 'automation']
          },
          {
            slug: 'industrial-visit',
            title: 'Large Scale Industries Visit',
            subtitle: 'Adani Thermal Power Station (ADTPS) | Aug 2021',
            image: 'assets/images/technical activities cover page.png',
            thumbnail: 'https://source.unsplash.com/800x450/?power,plant,industrial,dark',
            shortDescription: 'Industrial visit to power station',
            description: 'Industrial visit to Adani Thermal Power Station, gaining insights into large-scale power generation, distribution systems, and industrial operations.',
            date: 'Aug 2021',
            location: 'Gujarat, India',
            tags: ['industrial visit', 'power', 'thermal', 'adani']
          }
        ]
      },
      
      // 5. Learning & Courses
      {
        slug: 'learning-and-courses',
        title: 'Learning & Courses',
        description: 'Online courses and certifications',
        items: [
          {
            slug: 'design-technology-innovation',
            title: 'Design, Technology and Innovation',
            subtitle: '8-week Course IIT Mumbai',
            image: 'assets/images/learning and course cover page.jpg',
            thumbnail: 'assets/images/card 5.jpg',
            shortDescription: 'Design thinking and innovation',
            description: 'An 8-week course on Design, Technology, and Innovation from IIT Mumbai, covering design thinking, innovation methodologies, and technology integration.',
            date: '8 weeks',
            provider: 'IIT Mumbai',
            tags: ['design', 'innovation', 'technology', 'iit']
          },
          {
            slug: 'soft-skills',
            title: 'Enhancing soft skills and Personality',
            subtitle: '8-weeks Course IIT Kanpur',
            image: 'assets/images/learning and course cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?presentation,skills,dark',
            shortDescription: 'Soft skills development',
            description: 'An 8-week course on enhancing soft skills and personality development from IIT Kanpur, focusing on communication, leadership, and professional skills.',
            date: '8 weeks',
            provider: 'IIT Kanpur',
            tags: ['soft skills', 'personality', 'communication', 'iit']
          },
          {
            slug: 'iot-introduction',
            title: 'Introduction of Internet of Things',
            subtitle: '12 Weeks course IIT Kharagpur',
            image: 'assets/images/learning and course cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?iot,abstract,red',
            shortDescription: 'IoT fundamentals',
            description: 'A 12-week course on IoT from IIT Kharagpur, covering IoT architecture, protocols, sensors, actuators, and application development.',
            date: '12 weeks',
            provider: 'IIT Kharagpur',
            tags: ['iot', 'internet of things', 'sensors', 'iit']
          },
          {
            slug: 'waste-energy',
            title: 'Waste energy conversion',
            subtitle: '8 Weeks Course IIT Roorkee',
            image: 'assets/images/learning and course cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?renewable,energy,dark',
            shortDescription: 'Energy conversion technologies',
            description: 'An 8-week course on waste energy conversion from IIT Roorkee, exploring renewable energy, waste-to-energy technologies, and sustainable solutions.',
            date: '8 weeks',
            provider: 'IIT Roorkee',
            tags: ['energy', 'renewable', 'waste conversion', 'iit']
          },
          {
            slug: 'digital-image-processing',
            title: 'Digital image processing',
            subtitle: '12 Weeks Course IIT Kharagpur',
            image: 'assets/images/learning and course cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?digital,image,pixels,red',
            shortDescription: 'Image processing techniques',
            description: 'A 12-week course on digital image processing from IIT Kharagpur, covering image enhancement, filtering, segmentation, and computer vision basics.',
            date: '12 weeks',
            provider: 'IIT Kharagpur',
            tags: ['image processing', 'computer vision', 'digital', 'iit']
          },
          {
            slug: 'dsa-java',
            title: 'DSA using JAVA',
            subtitle: '12 Weeks Course IIT Kharagpur',
            image: 'assets/images/learning and course cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?data,structure,algorithm,dark',
            shortDescription: 'Data structures and algorithms',
            description: 'A 12-week course on Data Structures and Algorithms using Java from IIT Kharagpur, covering arrays, linked lists, trees, graphs, sorting, and searching algorithms.',
            date: '12 weeks',
            provider: 'IIT Kharagpur',
            tags: ['dsa', 'java', 'algorithms', 'data structures', 'iit']
          },
          {
            slug: 'consumer-behaviour',
            title: 'Consumer behaviour',
            subtitle: '8 Weeks Course IIT Kharagpur',
            image: 'assets/images/learning and course cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?consumer,psychology,red',
            shortDescription: 'Consumer psychology and behavior',
            description: 'An 8-week course on consumer behaviour from IIT Kharagpur, exploring consumer psychology, decision-making processes, and market dynamics.',
            date: '8 weeks',
            provider: 'IIT Kharagpur',
            tags: ['consumer', 'behaviour', 'psychology', 'marketing', 'iit']
          }
        ]
      },
      
      // 6. Projects
      {
        slug: 'project',
        title: 'Projects',
        description: 'Technical projects and innovations',
        items: [
          {
            slug: 'star-delta-stator',
            title: 'Star Delta Stator',
            subtitle: 'Core Electrical Engineering Project',
            image: 'assets/images/project cover page.jpg',
            thumbnail: 'assets/images/card 6.jpg',
            shortDescription: 'Motor control system',
            description: 'A foundational project on Star Delta Stators, implementing motor control systems and understanding three-phase motor starting techniques.',
            tags: ['electrical', 'motor', 'stator', 'control']
          },
          {
            slug: 'star-delta-iot-plc',
            title: 'Star delta Stator using IOT and PLC Scada',
            subtitle: 'Industrial Automation Project',
            image: 'assets/images/project cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?plc,scada,automation,dark',
            shortDescription: 'Automated motor control',
            description: 'Advanced automation of Star Delta Stators using IoT, PLC, and SCADA systems for remote monitoring and control of industrial motors.',
            tags: ['iot', 'plc', 'scada', 'automation', 'industrial']
          },
          {
            slug: 'lora-detection',
            title: 'Detection usage of Lora Technology',
            subtitle: 'IoT Communication Project',
            image: 'assets/images/project cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?lora,wireless,signal,red',
            shortDescription: 'LoRa technology implementation',
            description: 'A project focused on the application and detection of LoRa Technology for long-range, low-power wireless communication in IoT applications.',
            tags: ['lora', 'iot', 'wireless', 'communication', 'lpwan']
          },
          {
            slug: 'ai-energy-management',
            title: 'AI-based energy management system',
            subtitle: 'Industrial and commercial facilities',
            image: 'assets/images/project cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?ai,energy,management,dark',
            shortDescription: 'Smart energy optimization',
            description: 'Developing an AI-based system for energy management in large facilities, optimizing power consumption, predicting demand, and reducing costs.',
            tags: ['ai', 'energy', 'management', 'optimization', 'smart']
          },
          {
            slug: 'milk-adulteration-detector',
            title: 'Smart device to detect adulterations in milk',
            subtitle: 'Consumer Tech Project',
            image: 'assets/images/project cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?smart,device,sensor,red',
            shortDescription: 'Food quality monitoring',
            description: 'Creating a smart device to ensure milk quality by detecting adulterations using sensors and IoT technology for consumer safety.',
            tags: ['iot', 'sensors', 'food safety', 'consumer', 'quality']
          },
          {
            slug: 'ecommerce-compliance',
            title: 'Automated Compliance Checker for E-Commerce',
            subtitle: 'Legal Metrology Declarations',
            image: 'assets/images/project cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?ecommerce,compliance,automation,dark',
            shortDescription: 'Regulatory compliance automation',
            description: 'An automated tool to check for legal metrology declarations on e-commerce platforms, ensuring regulatory compliance and consumer protection.',
            tags: ['ecommerce', 'compliance', 'automation', 'legal', 'metrology']
          },
          {
            slug: 'neurological-screening',
            title: 'Screening Tool for Early Detection of Neurological Conditions',
            subtitle: 'MedTech Project',
            image: 'assets/images/project cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?neurology,health,tech,red',
            shortDescription: 'Healthcare technology',
            description: 'A screening tool designed for the early detection of neurological conditions using AI and sensor technology for improved healthcare outcomes.',
            tags: ['medtech', 'neurology', 'ai', 'healthcare', 'screening']
          }
        ]
      },
      
      // 7. Awards
      {
        slug: 'award',
        title: 'Awards',
        description: 'Recognition and achievements',
        items: [
          {
            slug: 'kavach-2023',
            title: 'Winner | KAVACH CYBER HACKATHON 2023',
            subtitle: 'August 2023 | Prize: 1 Lakh',
            image: 'assets/images/award cover page.jpg',
            thumbnail: 'assets/images/card 7.JPG',
            shortDescription: 'National level hackathon winner',
            description: 'Winner of the KAVACH Cyber Hackathon 2023 for the project on "Detection Usage of LoRa", receiving a prize of 1 Lakh. The project focused on IoT security and wireless communication.',
            date: 'August 2023',
            prize: '₹1,00,000',
            tags: ['hackathon', 'winner', 'kavach', 'iot', 'lora']
          },
          {
            slug: 'sih-2023',
            title: 'Winner | SMART INDIA HACKATHON 2023',
            subtitle: 'December 2023 | Prize: 1 Lakh',
            image: 'assets/images/award cover page.jpg',
            thumbnail: 'https://source.unsplash.com/800x450/?trophy,award,spotlight,dark',
            shortDescription: 'National level hackathon winner',
            description: 'Winner of the Smart India Hackathon 2023 for the "AI Based Energy Management System" project, receiving a prize of 1 Lakh. The project addressed energy optimization in industrial facilities.',
            date: 'December 2023',
            prize: '₹1,00,000',
            tags: ['hackathon', 'winner', 'sih', 'ai', 'energy']
          }
        ]
      },
      
      // 8. Skills & Interests
      {
        slug: 'skills-and-interests',
        title: 'Skills & Interests',
        description: 'Technical skills and areas of interest',
        items: [
          {
            slug: 'programming',
            title: 'Programming',
            subtitle: 'Java, Arduino, MATLAB, Spring Boot, C & C++',
            image: 'assets/images/skill and interest cover page.png',
            thumbnail: 'assets/images/card 8.jpg',
            shortDescription: 'Programming languages and frameworks',
            description: 'Proficient in a range of programming languages and frameworks including Java, Arduino, MATLAB, Spring Boot, C & C++. Experienced in software development, embedded programming, and application development.',
            tags: ['programming', 'java', 'arduino', 'matlab', 'c++', 'spring boot']
          },
          {
            slug: 'software',
            title: 'Software',
            subtitle: 'Auto CAD, Solid Works, GNU Radio, WireShark, Photoshop, PSpice',
            image: 'assets/images/skill and interest cover page.png',
            thumbnail: 'https://source.unsplash.com/800x450/?software,tools,design,dark',
            shortDescription: 'Software tools and applications',
            description: 'Experienced with various software tools like Auto CAD, Solid Works, GNU Radio, WireShark, Photoshop, Illustrator, and PSpice for design, analysis, and development.',
            tags: ['software', 'cad', 'design', 'tools', 'engineering']
          },
          {
            slug: 'hardware',
            title: 'Hardware',
            subtitle: 'Robotics, PLC & Scada, UART, I2C, SPI, Lora, Bluetooth, NRF, RF',
            image: 'assets/images/skill and interest cover page.png',
            thumbnail: 'https://source.unsplash.com/800x450/?hardware,circuits,robotics,red',
            shortDescription: 'Hardware technologies and protocols',
            description: 'Knowledgeable in hardware technologies including Robotics, PLC & Scada, UART, I2C, SPI, LoRa, Bluetooth, NRF, and RF communication protocols for embedded systems and IoT.',
            tags: ['hardware', 'robotics', 'plc', 'iot', 'communication', 'embedded']
          }
        ]
      }
    ];
  }

  /**
   * Get all categories
   * @returns {Array} All categories
   */
  getAll() {
    return this.data;
  }

  /**
   * Get category by slug
   * @param {string} slug - Category slug
   * @returns {Object|null} Category object or null
   */
  getBySlug(slug) {
    return this.data.find(category => category.slug === slug) || null;
  }

  /**
   * Get item by category and item slug
   * @param {string} categorySlug - Category slug
   * @param {string} itemSlug - Item slug
   * @returns {Object|null} Item object or null
   */
  getItem(categorySlug, itemSlug) {
    const category = this.getBySlug(categorySlug);
    if (!category) return null;
    return category.items.find(item => item.slug === itemSlug) || null;
  }

  /**
   * Search across all content
   * @param {string} query - Search query
   * @returns {Array} Array of matching categories with filtered items
   */
  search(query) {
    if (!query || query.trim() === '') {
      return this.data;
    }

    const searchTerm = query.toLowerCase().trim();
    
    return this.data.map(category => {
      const matchingItems = category.items.filter(item => {
        return (
          item.title.toLowerCase().includes(searchTerm) ||
          item.subtitle.toLowerCase().includes(searchTerm) ||
          item.shortDescription.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      });

      return {
        ...category,
        items: matchingItems
      };
    }).filter(category => category.items.length > 0);
  }

  /**
   * Filter by category
   * @param {string} categorySlug - Category slug to filter by
   * @returns {Array} Array with single category or all categories
   */
  filterByCategory(categorySlug) {
    if (!categorySlug || categorySlug === 'all') {
      return this.data;
    }
    
    const category = this.getBySlug(categorySlug);
    return category ? [category] : [];
  }

  /**
   * Get all tags
   * @returns {Array} Array of unique tags
   */
  getAllTags() {
    const tags = new Set();
    this.data.forEach(category => {
      category.items.forEach(item => {
        if (item.tags) {
          item.tags.forEach(tag => tags.add(tag));
        }
      });
    });
    return Array.from(tags).sort();
  }
}

// Create and export global instance
const dataStore = new DataStore();
