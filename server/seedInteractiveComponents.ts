import mongoose from 'mongoose';
import { config } from './config';
import { EnhancedProject } from './models/EnhancedProject';
import { UIEffects } from './models/UIEffects';

const seedInteractiveComponents = async () => {
  try {
    console.log('🌱 Starting interactive components seeding...');
    
    // Connect to database
    await mongoose.connect(config.mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      EnhancedProject.deleteMany({}),
      UIEffects.deleteMany({})
    ]);
    console.log('🧹 Cleared existing interactive components data');

    // Seed UI Effects
    const uiEffects = [
      {
        name: 'Dither Effect',
        type: 'dither',
        isActive: true,
        globalSettings: {
          coverage: 'section',
          zIndex: 1000
        },
        componentSettings: {
          waveColor: [0.54, 0.36, 0.96], // Elegant purple
          colorNum: 6,
          waveAmplitude: 0.25,
          waveFrequency: 2.5,
          enableMouseInteraction: true,
          animationSpeed: 1.0,
          intensity: 0.8,
          coverage: 'section',
          zIndex: 1000
        }
      },
      {
        name: 'Spotlight Card Effect',
        type: 'spotlight',
        isActive: true,
        globalSettings: {},
        componentSettings: {
          enabled: true,
          spotlightColor: 'rgba(139, 92, 246, 0.3)', // Purple with opacity
          spotlightSize: 200,
          borderRadius: '1.5rem',
          backgroundColor: 'rgba(15, 15, 15, 0.95)', // Dark sophisticated
          borderColor: 'rgba(75, 85, 99, 0.3)', // Subtle gray border
          transition: 'all 0.3s ease',
          hoverScale: 1.02,
          glowIntensity: 0.5
        }
      },
      {
        name: 'Profile Card Effect',
        type: 'profile-card',
        isActive: true,
        globalSettings: {},
        componentSettings: {
          enableTilt: true,
          tiltMaxAngle: 15,
          tiltReverse: false,
          behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(262, 100%, 88%, var(--card-opacity)) 4%, hsla(262, 50%, 78%, calc(var(--card-opacity)*0.75)) 10%, hsla(262, 25%, 68%, calc(var(--card-opacity)*0.5)) 50%, hsla(262, 0%, 58%, 0) 100%), conic-gradient(from 124deg at 50% 50%, #8B5CF6 0%, #06B6D4 40%, #06B6D4 60%, #8B5CF6 100%)',
          innerGradient: 'linear-gradient(145deg, rgba(30, 27, 75, 0.9) 0%, rgba(67, 56, 202, 0.3) 100%)',
          showBehindGradient: true,
          cardOpacity: 0.8,
          borderRadius: '1.5rem',
          customColors: ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'],
          animations: {
            hover: true,
            float: false,
            glow: true
          }
        }
      },
      {
        name: 'Staggered Menu Effect',
        type: 'staggered-menu',
        isActive: true,
        globalSettings: {},
        componentSettings: {
          enabled: true,
          direction: 'horizontal',
          staggerDelay: 0.1,
          animationDuration: 0.6,
          ease: 'power2.out',
          initialOpacity: 0,
          finalOpacity: 1,
          transform: {
            initial: 'translateY(30px)',
            final: 'translateY(0px)'
          },
          socialLinks: [
            {
              name: 'GitHub',
              url: 'https://github.com/soulaimane',
              icon: 'github',
              color: '#8B5CF6',
              order: 1
            },
            {
              name: 'LinkedIn',
              url: 'https://linkedin.com/in/soulaimane',
              icon: 'linkedin',
              color: '#06B6D4',
              order: 2
            },
            {
              name: 'Twitter',
              url: 'https://twitter.com/soulaimane',
              icon: 'twitter',
              color: '#10B981',
              order: 3
            },
            {
              name: 'Email',
              url: 'mailto:contact@soulaimane.dev',
              icon: 'mail',
              color: '#F59E0B',
              order: 4
            }
          ]
        }
      },
      {
        name: 'Electric Border Effect',
        type: 'electric-border',
        isActive: true,
        globalSettings: {},
        componentSettings: {
          enabled: true,
          borderWidth: '2px',
          borderColor: '#8B5CF6',
          animationSpeed: 1.5,
          glowIntensity: 0.6,
          borderRadius: '1rem'
        }
      }
    ];

    const createdEffects = await UIEffects.insertMany(uiEffects);
    console.log(`✅ Created ${createdEffects.length} UI effects`);

    // Seed Enhanced Projects with interactive card settings
    const enhancedProjects = [
      {
        name: 'Assembly Pixel Renderer',
        description: 'High-performance pixel manipulation and rendering engine built with x86 Assembly for maximum speed and efficiency.',
        longDescription: 'A sophisticated graphics rendering system that demonstrates low-level programming mastery. Features custom memory management, SIMD optimizations, and direct hardware acceleration through Assembly language programming.',
        technologies: ['Assembly', 'x86', 'SIMD', 'C Integration', 'Memory Management'],
        features: [
          'Custom pixel manipulation algorithms',
          'SIMD-optimized operations',
          'Direct memory access',
          'Hardware acceleration',
          'Real-time rendering'
        ],
        githubUrl: 'https://github.com/soulaimane/assembly-pixel-renderer',
        imageUrl: '/attached_assets/generated_images/Assembly_pixel_renderer_project_5c49061d.png',
        category: 'desktop',
        status: 'completed',
        priority: 9,
        isPublic: true,
        isFeatured: true,
        cardSettings: {
          spotlightCard: {
            spotlightColor: 'rgba(139, 92, 246, 0.4)',
            borderRadius: '1.5rem',
            backgroundColor: 'rgba(15, 15, 15, 0.95)',
            borderColor: 'rgba(139, 92, 246, 0.3)',
            enableSpotlight: true
          },
          profileCard: {
            enableTilt: true,
            behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(262, 100%, 88%, var(--card-opacity)) 4%, hsla(262, 50%, 78%, calc(var(--card-opacity)*0.75)) 10%, hsla(262, 25%, 68%, calc(var(--card-opacity)*0.5)) 50%, hsla(262, 0%, 58%, 0) 100%), conic-gradient(from 124deg at 50% 50%, #8B5CF6 0%, #A855F7 40%, #C084FC 60%, #8B5CF6 100%)',
            innerGradient: 'linear-gradient(145deg, rgba(30, 27, 75, 0.9) 0%, rgba(67, 56, 202, 0.3) 100%)',
            showBehindGradient: true,
            customColors: ['#8B5CF6', '#A855F7', '#C084FC']
          },
          display: {
            accentColor: '#8B5CF6',
            textColor: '#F8FAFC',
            tags: ['Assembly', 'Graphics', 'Performance'],
            displayOrder: 1
          }
        },
        effectSettings: {
          dither: {
            waveColor: [0.54, 0.36, 0.96],
            colorNum: 8,
            waveAmplitude: 0.3,
            waveFrequency: 3.0
          }
        }
      },
      {
        name: 'Task Scheduling Simulation',
        description: 'Advanced operating system simulation demonstrating various CPU scheduling algorithms with real-time visualization.',
        longDescription: 'Comprehensive simulation of operating system scheduling algorithms including FCFS, SJF, Round Robin, and Priority scheduling. Features interactive visualization, performance metrics, and comparative analysis tools.',
        technologies: ['C++', 'Qt', 'Data Structures', 'Algorithms', 'System Programming'],
        features: [
          'Multiple scheduling algorithms',
          'Real-time visualization',
          'Performance analytics',
          'Interactive process management',
          'Comparative algorithm analysis'
        ],
        githubUrl: 'https://github.com/soulaimane/task-scheduling-sim',
        imageUrl: '/attached_assets/generated_images/Task_scheduling_simulation_visualization_69b174e4.png',
        category: 'desktop',
        status: 'completed',
        priority: 8,
        isPublic: true,
        isFeatured: true,
        cardSettings: {
          spotlightCard: {
            spotlightColor: 'rgba(6, 182, 212, 0.4)',
            borderRadius: '1.5rem',
            backgroundColor: 'rgba(15, 15, 15, 0.95)',
            borderColor: 'rgba(6, 182, 212, 0.3)',
            enableSpotlight: true
          },
          profileCard: {
            enableTilt: true,
            behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(190, 100%, 88%, var(--card-opacity)) 4%, hsla(190, 50%, 78%, calc(var(--card-opacity)*0.75)) 10%, hsla(190, 25%, 68%, calc(var(--card-opacity)*0.5)) 50%, hsla(190, 0%, 58%, 0) 100%), conic-gradient(from 124deg at 50% 50%, #06B6D4 0%, #0891B2 40%, #0E7490 60%, #06B6D4 100%)',
            innerGradient: 'linear-gradient(145deg, rgba(21, 40, 75, 0.9) 0%, rgba(30, 64, 175, 0.3) 100%)',
            showBehindGradient: true,
            customColors: ['#06B6D4', '#0891B2', '#0E7490']
          },
          display: {
            accentColor: '#06B6D4',
            textColor: '#F8FAFC',
            tags: ['C++', 'Algorithms', 'Simulation'],
            displayOrder: 2
          }
        },
        effectSettings: {
          dither: {
            waveColor: [0.02, 0.71, 0.83],
            colorNum: 6,
            waveAmplitude: 0.25,
            waveFrequency: 2.8
          }
        }
      },
      {
        name: 'Hotel Management System',
        description: 'Full-stack hotel management solution with modern interface and comprehensive booking system.',
        longDescription: 'Enterprise-grade hotel management system featuring room booking, customer management, payment processing, and administrative dashboard. Built with modern web technologies for scalability and performance.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Material-UI'],
        features: [
          'Real-time room availability',
          'Booking management system',
          'Customer relationship tools',
          'Payment integration',
          'Administrative dashboard',
          'Report generation'
        ],
        githubUrl: 'https://github.com/soulaimane/hotel-management',
        demoUrl: 'https://hotel-demo.soulaimane.dev',
        imageUrl: '/attached_assets/generated_images/Hotel_simulation_system_interface_d99afd10.png',
        category: 'web',
        status: 'completed',
        priority: 7,
        isPublic: true,
        isFeatured: true,
        cardSettings: {
          spotlightCard: {
            spotlightColor: 'rgba(16, 185, 129, 0.4)',
            borderRadius: '1.5rem',
            backgroundColor: 'rgba(15, 15, 15, 0.95)',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            enableSpotlight: true
          },
          profileCard: {
            enableTilt: true,
            behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(160, 100%, 88%, var(--card-opacity)) 4%, hsla(160, 50%, 78%, calc(var(--card-opacity)*0.75)) 10%, hsla(160, 25%, 68%, calc(var(--card-opacity)*0.5)) 50%, hsla(160, 0%, 58%, 0) 100%), conic-gradient(from 124deg at 50% 50%, #10B981 0%, #059669 40%, #047857 60%, #10B981 100%)',
            innerGradient: 'linear-gradient(145deg, rgba(20, 75, 60, 0.9) 0%, rgba(34, 197, 94, 0.3) 100%)',
            showBehindGradient: true,
            customColors: ['#10B981', '#059669', '#047857']
          },
          display: {
            accentColor: '#10B981',
            textColor: '#F8FAFC',
            tags: ['React', 'Full-Stack', 'Enterprise'],
            displayOrder: 3
          }
        },
        effectSettings: {
          dither: {
            waveColor: [0.06, 0.73, 0.51],
            colorNum: 7,
            waveAmplitude: 0.22,
            waveFrequency: 2.2
          }
        }
      },
      {
        name: 'Discord Bot Framework',
        description: 'Modular Discord bot framework with plugin architecture and advanced command handling.',
        longDescription: 'Sophisticated Discord bot development framework featuring modular plugin system, advanced command parsing, database integration, and comprehensive administration tools. Designed for scalability and ease of customization.',
        technologies: ['Node.js', 'Discord.js', 'TypeScript', 'PostgreSQL', 'Redis'],
        features: [
          'Modular plugin architecture',
          'Advanced command system',
          'Database integration',
          'Caching with Redis',
          'Admin dashboard',
          'Automated moderation'
        ],
        githubUrl: 'https://github.com/soulaimane/discord-bot-framework',
        imageUrl: '/attached_assets/generated_images/Discord_bot_project_screenshot_cdb63aa0.png',
        category: 'other',
        status: 'completed',
        priority: 6,
        isPublic: true,
        isFeatured: false,
        cardSettings: {
          spotlightCard: {
            spotlightColor: 'rgba(245, 158, 11, 0.4)',
            borderRadius: '1.5rem',
            backgroundColor: 'rgba(15, 15, 15, 0.95)',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            enableSpotlight: true
          },
          profileCard: {
            enableTilt: true,
            behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(45, 100%, 88%, var(--card-opacity)) 4%, hsla(45, 50%, 78%, calc(var(--card-opacity)*0.75)) 10%, hsla(45, 25%, 68%, calc(var(--card-opacity)*0.5)) 50%, hsla(45, 0%, 58%, 0) 100%), conic-gradient(from 124deg at 50% 50%, #F59E0B 0%, #D97706 40%, #B45309 60%, #F59E0B 100%)',
            innerGradient: 'linear-gradient(145deg, rgba(75, 65, 20, 0.9) 0%, rgba(217, 119, 6, 0.3) 100%)',
            showBehindGradient: true,
            customColors: ['#F59E0B', '#D97706', '#B45309']
          },
          display: {
            accentColor: '#F59E0B',
            textColor: '#F8FAFC',
            tags: ['Discord', 'TypeScript', 'Framework'],
            displayOrder: 4
          }
        },
        effectSettings: {
          dither: {
            waveColor: [0.96, 0.62, 0.04],
            colorNum: 5,
            waveAmplitude: 0.28,
            waveFrequency: 2.6
          }
        }
      },
      {
        name: 'Brick Breaker Game',
        description: 'Classic arcade-style brick breaker game with modern graphics and smooth gameplay mechanics.',
        longDescription: 'Reimagined classic brick breaker game featuring modern graphics, particle effects, power-ups, and progressive difficulty levels. Built with optimized game loop and collision detection systems.',
        technologies: ['JavaScript', 'Canvas API', 'Web Audio API', 'CSS3', 'HTML5'],
        features: [
          'Smooth 60fps gameplay',
          'Particle effect systems',
          'Power-up mechanics',
          'Progressive difficulty',
          'High score tracking',
          'Sound effects and music'
        ],
        githubUrl: 'https://github.com/soulaimane/brick-breaker',
        demoUrl: 'https://brick-breaker.soulaimane.dev',
        imageUrl: '/attached_assets/generated_images/Brick_breaker_game_screenshot_ff6483d2.png',
        category: 'game',
        status: 'completed',
        priority: 5,
        isPublic: true,
        isFeatured: false,
        cardSettings: {
          spotlightCard: {
            spotlightColor: 'rgba(239, 68, 68, 0.4)',
            borderRadius: '1.5rem',
            backgroundColor: 'rgba(15, 15, 15, 0.95)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
            enableSpotlight: true
          },
          profileCard: {
            enableTilt: true,
            behindGradient: 'radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(0, 100%, 88%, var(--card-opacity)) 4%, hsla(0, 50%, 78%, calc(var(--card-opacity)*0.75)) 10%, hsla(0, 25%, 68%, calc(var(--card-opacity)*0.5)) 50%, hsla(0, 0%, 58%, 0) 100%), conic-gradient(from 124deg at 50% 50%, #EF4444 0%, #DC2626 40%, #B91C1C 60%, #EF4444 100%)',
            innerGradient: 'linear-gradient(145deg, rgba(75, 20, 20, 0.9) 0%, rgba(220, 38, 38, 0.3) 100%)',
            showBehindGradient: true,
            customColors: ['#EF4444', '#DC2626', '#B91C1C']
          },
          display: {
            accentColor: '#EF4444',
            textColor: '#F8FAFC',
            tags: ['Game', 'JavaScript', 'Canvas'],
            displayOrder: 5
          }
        },
        effectSettings: {
          dither: {
            waveColor: [0.94, 0.27, 0.27],
            colorNum: 6,
            waveAmplitude: 0.35,
            waveFrequency: 3.2
          }
        }
      }
    ];

    const createdProjects = await EnhancedProject.insertMany(enhancedProjects);
    console.log(`✅ Created ${createdProjects.length} enhanced projects`);

    console.log('\n🎉 Interactive components seeding completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   • UI Effects: ${createdEffects.length}`);
    console.log(`   • Enhanced Projects: ${createdProjects.length}`);
    console.log(`\n🔗 Available API endpoints:`);
    console.log(`   • GET /api/ui-effects/active - Get active UI effects`);
    console.log(`   • GET /api/ui-effects/dither - Get dither effect settings`);
    console.log(`   • GET /api/ui-effects/spotlight - Get spotlight card settings`);
    console.log(`   • GET /api/ui-effects/profile-card - Get profile card settings`);
    console.log(`   • GET /api/ui-effects/staggered-menu - Get staggered menu settings`);
    console.log(`   • GET /api/enhanced-projects - Get enhanced projects with card settings`);
    console.log(`   • GET /api/enhanced-projects/featured - Get featured projects`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedInteractiveComponents();
}

export { seedInteractiveComponents };