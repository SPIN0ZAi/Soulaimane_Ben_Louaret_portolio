import mongoose from 'mongoose';
import { User, Profile, Project } from '../models';
import { config } from '../config';

// Sample portfolio data for Soulaimane Ben Louaret
const portfolioData = {
  admin: {
    username: 'soulaimane',
    email: 'soulaimane.benlouaret@gmail.com',
    password: 'admin123!', // Will be hashed automatically
    role: 'admin'
  },
  
  profile: {
    fullName: 'Soulaimane Ben Louaret',
    title: 'Full-Stack Developer & Software Engineer',
    bio: 'Passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions that solve real-world problems. With a strong foundation in both frontend and backend development, I specialize in building scalable, user-friendly applications using cutting-edge technologies like React, Node.js, MongoDB, and TypeScript.',
    shortBio: 'Full-stack developer passionate about creating innovative web solutions with React, Node.js, and modern technologies.',
    email: 'soulaimane.benlouaret@gmail.com',
    phone: '+213 123 456 789',
    location: 'Algeria',
    profileImage: 'https://via.placeholder.com/400x400/2563eb/ffffff?text=SBL',
    resumeUrl: 'https://drive.google.com/file/d/your-resume-id/view',
    
    skills: [
      // Frontend
      { name: 'React', category: 'frontend', level: 'advanced', yearsOfExperience: 3 },
      { name: 'TypeScript', category: 'frontend', level: 'advanced', yearsOfExperience: 2 },
      { name: 'JavaScript', category: 'frontend', level: 'expert', yearsOfExperience: 4 },
      { name: 'HTML5', category: 'frontend', level: 'expert', yearsOfExperience: 5 },
      { name: 'CSS3', category: 'frontend', level: 'expert', yearsOfExperience: 5 },
      { name: 'Tailwind CSS', category: 'frontend', level: 'advanced', yearsOfExperience: 2 },
      { name: 'Next.js', category: 'frontend', level: 'intermediate', yearsOfExperience: 1 },
      { name: 'Vue.js', category: 'frontend', level: 'intermediate', yearsOfExperience: 1 },
      
      // Backend
      { name: 'Node.js', category: 'backend', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Express.js', category: 'backend', level: 'advanced', yearsOfExperience: 3 },
      { name: 'Python', category: 'backend', level: 'intermediate', yearsOfExperience: 2 },
      { name: 'Java', category: 'backend', level: 'intermediate', yearsOfExperience: 2 },
      { name: 'PHP', category: 'backend', level: 'intermediate', yearsOfExperience: 1 },
      
      // Database
      { name: 'MongoDB', category: 'database', level: 'advanced', yearsOfExperience: 2 },
      { name: 'MySQL', category: 'database', level: 'intermediate', yearsOfExperience: 2 },
      { name: 'PostgreSQL', category: 'database', level: 'intermediate', yearsOfExperience: 1 },
      { name: 'Redis', category: 'database', level: 'beginner', yearsOfExperience: 1 },
      
      // DevOps
      { name: 'Git', category: 'devops', level: 'advanced', yearsOfExperience: 4 },
      { name: 'Docker', category: 'devops', level: 'intermediate', yearsOfExperience: 1 },
      { name: 'AWS', category: 'devops', level: 'beginner', yearsOfExperience: 1 },
      { name: 'Vercel', category: 'devops', level: 'intermediate', yearsOfExperience: 2 },
      
      // Design
      { name: 'Figma', category: 'design', level: 'intermediate', yearsOfExperience: 2 },
      { name: 'Adobe Photoshop', category: 'design', level: 'intermediate', yearsOfExperience: 3 }
    ],
    
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/soulaimane', icon: 'github' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/soulaimane-ben-louaret', icon: 'linkedin' },
      { platform: 'Twitter', url: 'https://twitter.com/soulaimane_bl', icon: 'twitter' },
      { platform: 'Instagram', url: 'https://instagram.com/soulaimane.bl', icon: 'instagram' },
      { platform: 'Email', url: 'mailto:soulaimane.benlouaret@gmail.com', icon: 'mail' }
    ],
    
    experience: [
      {
        title: 'Full-Stack Developer',
        company: 'Tech Solutions Co.',
        location: 'Algeria (Remote)',
        startDate: new Date('2022-01-01'),
        endDate: null,
        description: 'Developing and maintaining web applications using React, Node.js, and MongoDB. Leading frontend development initiatives and implementing responsive designs with modern CSS frameworks.',
        technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
        isCurrentJob: true
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Agency',
        location: 'Algeria',
        startDate: new Date('2021-06-01'),
        endDate: new Date('2021-12-31'),
        description: 'Created responsive and interactive user interfaces for various client projects. Collaborated with designers and backend developers to deliver high-quality web applications.',
        technologies: ['JavaScript', 'React', 'CSS3', 'HTML5', 'Git'],
        isCurrentJob: false
      },
      {
        title: 'Junior Web Developer',
        company: 'StartupXYZ',
        location: 'Algeria',
        startDate: new Date('2020-09-01'),
        endDate: new Date('2021-05-31'),
        description: 'Assisted in developing company website and internal tools. Gained experience in full-stack development and modern web technologies.',
        technologies: ['JavaScript', 'PHP', 'MySQL', 'Bootstrap', 'jQuery'],
        isCurrentJob: false
      }
    ],
    
    education: [
      {
        degree: 'Master\'s in Computer Science',
        institution: 'University of Science and Technology',
        location: 'Algeria',
        startDate: new Date('2020-09-01'),
        endDate: new Date('2022-06-30'),
        gpa: '16.5/20',
        description: 'Specialized in Software Engineering and Web Development. Completed advanced coursework in algorithms, data structures, and modern web technologies.',
        isCurrentStudy: false
      },
      {
        degree: 'Bachelor\'s in Computer Science',
        institution: 'University of Technology',
        location: 'Algeria',
        startDate: new Date('2017-09-01'),
        endDate: new Date('2020-06-30'),
        gpa: '15.2/20',
        description: 'Foundation in computer science principles, programming languages, and software development methodologies.',
        isCurrentStudy: false
      }
    ],
    
    languages: [
      { name: 'Arabic', proficiency: 'native' },
      { name: 'French', proficiency: 'fluent' },
      { name: 'English', proficiency: 'fluent' },
      { name: 'Spanish', proficiency: 'basic' }
    ],
    
    certifications: [
      {
        name: 'Full Stack Web Development',
        issuer: 'FreeCodeCamp',
        issueDate: new Date('2021-03-15'),
        credentialUrl: 'https://freecodecamp.org/certification/soulaimane/full-stack'
      },
      {
        name: 'React Developer Certification',
        issuer: 'Meta',
        issueDate: new Date('2022-01-20'),
        credentialUrl: 'https://coursera.org/verify/certificate123'
      },
      {
        name: 'Node.js Application Development',
        issuer: 'IBM',
        issueDate: new Date('2021-11-10'),
        credentialUrl: 'https://ibm.com/verify/certificate456'
      }
    ],
    
    availability: {
      isAvailable: true,
      status: 'available',
      message: 'Available for new opportunities and freelance projects'
    },
    
    stats: {
      projectsCompleted: 25,
      yearsOfExperience: 4,
      clientsSatisfied: 15,
      linesOfCode: 50000
    }
  },
  
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with user authentication, product management, and payment integration.',
      longDescription: 'Built a comprehensive e-commerce solution featuring user registration/login, product catalog, shopping cart, order management, and secure payment processing. Implemented admin dashboard for inventory management and sales analytics.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Tailwind CSS'],
      features: [
        'User authentication and authorization',
        'Product catalog with search and filtering',
        'Shopping cart and checkout process',
        'Payment integration with Stripe',
        'Admin dashboard for management',
        'Responsive design for all devices'
      ],
      githubUrl: 'https://github.com/soulaimane/ecommerce-platform',
      demoUrl: 'https://ecommerce-demo.soulaimane.dev',
      imageUrl: 'https://via.placeholder.com/600x400/2563eb/ffffff?text=E-Commerce',
      category: 'web',
      status: 'completed',
      priority: 9,
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-03-15'),
      isPublic: true
    },
    {
      name: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      longDescription: 'Developed a modern task management solution similar to Trello/Asana with real-time collaboration, drag-and-drop functionality, file attachments, and team management features.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB', 'Cloudinary'],
      features: [
        'Real-time collaboration with Socket.io',
        'Drag and drop task management',
        'File attachments and comments',
        'Team management and permissions',
        'Email notifications',
        'Mobile-responsive design'
      ],
      githubUrl: 'https://github.com/soulaimane/task-manager',
      demoUrl: 'https://tasks.soulaimane.dev',
      imageUrl: 'https://via.placeholder.com/600x400/059669/ffffff?text=Task+Manager',
      category: 'web',
      status: 'completed',
      priority: 8,
      startDate: new Date('2022-10-01'),
      endDate: new Date('2022-12-20'),
      isPublic: true
    },
    {
      name: 'Weather Dashboard',
      description: 'A beautiful weather application with location-based forecasts and interactive maps.',
      longDescription: 'Created a responsive weather dashboard that provides current weather conditions, 7-day forecasts, weather maps, and location-based recommendations. Features include geolocation support and multiple city tracking.',
      technologies: ['React', 'TypeScript', 'OpenWeather API', 'Mapbox', 'Chart.js'],
      features: [
        'Current weather and 7-day forecast',
        'Interactive weather maps',
        'Geolocation support',
        'Multiple city tracking',
        'Weather charts and statistics',
        'Beautiful animations and transitions'
      ],
      githubUrl: 'https://github.com/soulaimane/weather-dashboard',
      demoUrl: 'https://weather.soulaimane.dev',
      imageUrl: 'https://via.placeholder.com/600x400/0ea5e9/ffffff?text=Weather+App',
      category: 'web',
      status: 'completed',
      priority: 7,
      startDate: new Date('2022-07-01'),
      endDate: new Date('2022-08-15'),
      isPublic: true
    },
    {
      name: 'Chat Application',
      description: 'Real-time chat application with private messaging, group chats, and file sharing.',
      longDescription: 'Built a modern chat application featuring real-time messaging, group chats, private conversations, file sharing, emoji reactions, and user presence indicators.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Cloudinary', 'JWT'],
      features: [
        'Real-time messaging with Socket.io',
        'Private and group conversations',
        'File and image sharing',
        'Emoji reactions and typing indicators',
        'User presence and status',
        'Message search and history'
      ],
      githubUrl: 'https://github.com/soulaimane/chat-app',
      demoUrl: 'https://chat.soulaimane.dev',
      imageUrl: 'https://via.placeholder.com/600x400/7c3aed/ffffff?text=Chat+App',
      category: 'web',
      status: 'completed',
      priority: 8,
      startDate: new Date('2022-04-01'),
      endDate: new Date('2022-06-30'),
      isPublic: true
    },
    {
      name: 'Portfolio Website',
      description: 'Modern, responsive portfolio website with admin panel and contact form.',
      longDescription: 'Designed and developed a professional portfolio website featuring project showcase, contact form, admin dashboard, and blog functionality. Built with modern technologies and best practices.',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Responsive design with animations',
        'Project showcase and filtering',
        'Contact form with email notifications',
        'Admin dashboard for content management',
        'Blog functionality',
        'SEO optimization'
      ],
      githubUrl: 'https://github.com/soulaimane/portfolio',
      demoUrl: 'https://soulaimane.dev',
      imageUrl: 'https://via.placeholder.com/600x400/dc2626/ffffff?text=Portfolio',
      category: 'web',
      status: 'completed',
      priority: 10,
      startDate: new Date('2023-10-01'),
      endDate: new Date('2023-10-30'),
      isPublic: true
    },
    {
      name: 'Blog Platform',
      description: 'A full-featured blogging platform with markdown support and user management.',
      longDescription: 'Created a comprehensive blogging platform with markdown editor, comment system, user authentication, category management, and SEO optimization.',
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'NextAuth.js', 'Tailwind CSS'],
      features: [
        'Markdown editor with live preview',
        'Comment system and user interactions',
        'Category and tag management',
        'SEO optimization and meta tags',
        'User authentication and profiles',
        'Admin panel for content management'
      ],
      githubUrl: 'https://github.com/soulaimane/blog-platform',
      demoUrl: 'https://blog.soulaimane.dev',
      imageUrl: 'https://via.placeholder.com/600x400/16a34a/ffffff?text=Blog+Platform',
      category: 'web',
      status: 'in-progress',
      priority: 6,
      startDate: new Date('2023-11-01'),
      isPublic: true
    }
  ]
};

export async function seedDatabase(): Promise<void> {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    console.log('✅ Connected to MongoDB for seeding');
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Project.deleteMany({})
    ]);
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = new User(portfolioData.admin);
    await adminUser.save();
    console.log('✅ Admin user created');
    
    // Create profile
    console.log('📝 Creating profile...');
    const profile = new Profile(portfolioData.profile);
    await profile.save();
    console.log('✅ Profile created');
    
    // Create projects
    console.log('💼 Creating projects...');
    for (const projectData of portfolioData.projects) {
      const project = new Project(projectData);
      await project.save();
    }
    console.log(`✅ Created ${portfolioData.projects.length} projects`);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Admin user: ${portfolioData.admin.username}`);
    console.log(`   - Profile: ${portfolioData.profile.fullName}`);
    console.log(`   - Projects: ${portfolioData.projects.length}`);
    console.log(`   - Skills: ${portfolioData.profile.skills.length}`);
    console.log(`   - Experience entries: ${portfolioData.profile.experience.length}`);
    
    console.log('\n🔐 Admin Credentials:');
    console.log(`   Username: ${portfolioData.admin.username}`);
    console.log(`   Email: ${portfolioData.admin.email}`);
    console.log(`   Password: ${portfolioData.admin.password}`);
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('📦 Database connection closed');
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🌱 Seeding script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding script failed:', error);
      process.exit(1);
    });
}