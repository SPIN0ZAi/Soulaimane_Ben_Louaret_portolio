import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  image: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tech,
  features,
  github,
  image,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <Card className="overflow-hidden h-full flex flex-col hover-elevate">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            data-testid={`img-project-${index}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent"></div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-3" data-testid={`text-project-title-${index}`}>
            {title}
          </h3>
          <p className="text-muted-foreground mb-4" data-testid={`text-project-description-${index}`}>
            {description}
          </p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-6 flex-1">
            <h4 className="text-sm font-semibold mb-2">Features:</h4>
            <ul className="space-y-1">
              {features.map((feature, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="default"
              className="flex-1 gap-2"
              onClick={() => window.open(github, '_blank')}
              data-testid={`button-github-${index}`}
            >
              <Github className="h-4 w-4" />
              View Code
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => window.open(github, '_blank')}
              data-testid={`button-external-${index}`}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
