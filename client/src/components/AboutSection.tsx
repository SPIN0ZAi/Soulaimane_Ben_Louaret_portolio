import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LogoLoop from './LogoLoop';
import { SiC, SiPython, SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiGit, SiDocker } from 'react-icons/si';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'C', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'JavaScript', level: 85 },
      { name: 'Assembly', level: 75 },
      { name: 'Haskell', level: 70 },
      { name: 'MATLAB', level: 65 },
    ],
  },
  {
    title: 'Web Technologies',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'React', level: 85 },
      { name: 'Discord.js', level: 75 },
    ],
  },
  {
    title: 'Databases & Tools',
    skills: [
      { name: 'SQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 70 },
      { name: 'Lua scripting', level: 80 },
    ],
  },
  {
    title: 'Hardware',
    skills: [
      { name: 'Computer Repair', level: 95 },
      { name: 'Phone Repair', level: 90 },
      { name: 'Electronics Troubleshooting', level: 85 },
    ],
  },
];

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 md:py-32 px-6 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-center text-foreground uppercase tracking-wider" data-testid="text-about-title">
          About Me
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-accent to-primary mx-auto mb-12 rounded-full"></div>

        <Card className="p-8 mb-12 bg-card backdrop-blur-sm border-2 border-card-border rounded-3xl shadow-lg">
          <p className="font-sans text-lg text-card-foreground leading-relaxed text-center" data-testid="text-about-summary">
            Computer Engineering student at Universidad de Castilla-La Mancha with deep passion for
            technology and programming. From repairing electronics in my father's shop to mastering
            assembly language, I bring curiosity, persistence, and hands-on experience to every
            challenge.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 * idx, duration: 0.5 }}
            >
              <Card className="p-6 h-full bg-card border-2 border-card-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="font-serif text-xl font-semibold mb-4 text-card-foreground uppercase tracking-wide" data-testid={`text-skill-category-${idx}`}>
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-sans text-sm font-medium text-card-foreground" data-testid={`text-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>{skill.name}</span>
                        <span className="font-sans text-sm text-card-foreground font-semibold bg-accent/20 px-2 py-1 rounded-full">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-background/30 rounded-full overflow-hidden border border-accent/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                          className="h-full bg-gradient-to-r from-accent to-primary rounded-full shadow-sm"
                          data-testid={`progress-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="font-serif text-2xl font-bold mb-6 text-center text-foreground uppercase tracking-wider">Tech Stack</h3>
          <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
            <LogoLoop
              logos={[
                { node: <SiC />, title: 'C' },
                { node: <SiPython />, title: 'Python' },
                { node: <SiJavascript />, title: 'JavaScript' },
                { node: <SiReact />, title: 'React' },
                { node: <SiNodedotjs />, title: 'Node.js' },
                { node: <SiMongodb />, title: 'MongoDB' },
                { node: <SiGit />, title: 'Git' },
                { node: <SiDocker />, title: 'Docker' },
              ]}
              speed={60}
              direction="left"
              logoHeight={48}
              gap={48}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#0F172A"
              ariaLabel="Technology stack"
            />
          </div>
        </motion.div>

        <Card className="p-8 bg-gradient-to-r from-card/80 to-muted/60 border-2 border-card-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="font-serif text-2xl font-bold mb-4 text-center text-card-foreground uppercase tracking-wider" data-testid="text-unique-title">
            What Makes Me Unique
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="secondary" className="font-sans text-sm px-4 py-2 bg-accent/80 text-accent-foreground border border-accent rounded-full hover:bg-accent transition-all shadow-md">
              1 year electronics repair experience
            </Badge>
            <Badge variant="secondary" className="font-sans text-sm px-4 py-2 bg-primary/80 text-primary-foreground border border-primary rounded-full hover:bg-primary transition-all shadow-md">
              YouTube content creation
            </Badge>
            <Badge variant="secondary" className="font-sans text-sm px-4 py-2 bg-secondary/80 text-secondary-foreground border border-secondary rounded-full hover:bg-secondary transition-all shadow-md">
              Gaming expertise
            </Badge>
            <Badge variant="secondary" className="font-sans text-sm px-4 py-2 bg-accent/80 text-accent-foreground border border-accent rounded-full hover:bg-accent transition-all shadow-md">
              Complex assembly language programming
            </Badge>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
