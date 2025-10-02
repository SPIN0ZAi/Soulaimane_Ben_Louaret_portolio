import ProjectCard from '../ProjectCard';
import projectImage from '@assets/generated_images/Discord_bot_project_screenshot_cdb63aa0.png';

export default function ProjectCardExample() {
  return (
    <div className="max-w-md">
      <ProjectCard
        title="SB-chan-bot"
        description="Multi-purpose Discord bot with GitHub integration and automated file handling"
        tech={['JavaScript', 'Node.js', 'Discord.js']}
        features={['Lua manifest fetching', 'Auto file compression']}
        github="https://github.com/SPIN0ZAi/SB-chan-bot"
        image={projectImage}
        index={0}
      />
    </div>
  );
}
