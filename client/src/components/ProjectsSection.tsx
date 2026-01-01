import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import sbChanImage from '@assets/generated_images/Discord_bot_project_screenshot_cdb63aa0.png';
import assemblyImage from '@assets/generated_images/Assembly_pixel_renderer_project_5c49061d.png';
import brickBreakerImage from '@assets/generated_images/Brick_breaker_game_screenshot_ff6483d2.png';
import hotelImage from '@assets/generated_images/Hotel_simulation_system_interface_d99afd10.png';
import taskSchedulingImage from '@assets/generated_images/Task_scheduling_simulation_visualization_69b174e4.png';

const projects = [
  {
    title: 'Data Structures Visualizer',
    description: 'Interactive web application for visualizing fundamental data structures and algorithms with step-by-step animations',
    tech: ['React', 'TypeScript', 'Vite', 'SVG', 'React Router'],
    features: [
      'BST/AVL tree visualization with rotations',
      'Graph algorithms (DFS/BFS)',
      'Floyd-Warshall shortest path',
      'Huffman coding tree builder',
      'Tree traversals (Pre/In/Post/Level-order)',
    ],
    github: 'https://github.com/SPIN0ZAi/Data-Structures-Visualizer',
    demo: 'https://data-structures-visualizer-seven.vercel.app/',
    image: sbChanImage, // TODO: Replace with actual Data Structures Visualizer image
  },
  {
    title: 'SB-chan-bot',
    description: 'Multi-purpose Discord bot with GitHub integration and automated file handling',
    tech: ['JavaScript', 'Node.js', 'Discord.js', 'Lua', 'GitHub API'],
    features: [
      'Lua manifest fetching',
      'Auto file compression',
      '7MB+ file hosting',
      'Discord embed generation',
    ],
    github: 'https://github.com/SPIN0ZAi/SB-chan-bot',
    image: sbChanImage,
  },
  {
    title: 'Assembly Pixel Renderer',
    description: '2D sprite animation engine written in RISC-V Assembly language',
    tech: ['RISC-V Assembly', 'Ripes Simulator'],
    features: [
      'Directional movement',
      'Sprite animation',
      'Boundary detection',
      'Frame optimization',
    ],
    github: 'https://github.com/SPIN0ZAi/assembly-pixel-renderer',
    image: assemblyImage,
  },
  {
    title: 'Brick Breaker Game',
    description: 'Classic arcade-style game built with Java Swing',
    tech: ['Java', 'Swing', 'OOP'],
    features: [
      'Collision detection',
      'Score tracking',
      'Level progression',
      'Retro gameplay',
    ],
    github: 'https://github.com/SPIN0ZAi/Brick_Breaker_Game_in_Java',
    image: brickBreakerImage,
  },
  {
    title: 'Hotel Simulation Program',
    description: 'C-based hotel reservation management system',
    tech: ['C', 'Data Structures', 'Console UI'],
    features: [
      'Multi-floor management',
      'Reservation system',
      'Check-in/out logic',
      'Availability tracking',
    ],
    github: 'https://github.com/SPIN0ZAi/Hotel-simulation-program',
    image: hotelImage,
  },
  {
    title: 'Task Scheduling Simulation',
    description: 'Advanced task scheduling algorithm implementation in C',
    tech: ['C', 'Algorithms', 'Priority Systems'],
    features: [
      'Priority scheduling',
      'Task dependencies',
      'Unique identifiers',
      'Performance optimization',
    ],
    github: 'https://github.com/SPIN0ZAi/Task-Scheduling-Simulation',
    image: taskSchedulingImage,
  },
];

export default function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 md:py-32 px-6 bg-background">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-card-foreground" data-testid="text-projects-title">
          Featured Projects
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent-foreground mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
