import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  demo?: string;
  image: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  tech,
  features,
  github,
  demo,
  image,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden h-full flex flex-col bg-card border-2 border-card-border hover:border-accent transition-all duration-300 rounded-3xl shadow-lg hover:shadow-2xl">
        {/* Image Section with Organic Overlay */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-project-${index}`}
          />
          
          {/* Organic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/20"></div>
          
          {/* Floating Action Button */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg hover:bg-primary transition-colors">
              <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          
          {/* Bottom Fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex-1 flex flex-col space-y-6">
          {/* Title with Editorial Typography */}
          <div>
            <h3 className="font-sans text-2xl md:text-3xl font-black uppercase tracking-wide text-card-foreground leading-tight mb-3" data-testid={`text-project-title-${index}`}>
              {title}
            </h3>
            <p className="font-body text-lg text-card-foreground/80 leading-relaxed" data-testid={`text-project-description-${index}`}>
              {description}
            </p>
          </div>

          {/* Tech Stack with Modern Badges */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-card-foreground mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <Badge 
                  key={t} 
                  variant="secondary" 
                  className="px-3 py-1 text-xs font-medium bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-full border border-secondary-border transition-colors"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features List with Modern Design */}
          <div className="flex-1">
            <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-card-foreground mb-3">Key Features</h4>
            <ul className="space-y-2">
              {features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="font-body text-sm text-card-foreground/70 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
              {features.length > 4 && (
                <li className="font-body text-sm text-accent font-medium">
                  +{features.length - 4} more features
                </li>
              )}
            </ul>
          </div>

          {/* Action Buttons with Editorial Style */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="default"
              className="flex-1 gap-3 font-semibold uppercase tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground border-0 rounded-2xl px-6 py-3 text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
              onClick={() => window.open(github, '_blank')}
              data-testid={`button-github-${index}`}
            >
              <Github className="h-4 w-4" />
              Source Code
            </Button>
            {demo && (
              <Button
                size="lg"
                variant="outline"
                className="aspect-square p-0 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-2xl transition-all duration-200 hover:scale-105"
                onClick={() => window.open(demo, '_blank')}
                data-testid={`button-demo-${index}`}
                title="Live Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            )}
            {!demo && (
              <Button
                size="lg"
                variant="outline"
                className="aspect-square p-0 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-2xl transition-all duration-200 hover:scale-105"
                onClick={() => window.open(github, '_blank')}
                data-testid={`button-external-${index}`}
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent/20 rounded-xl transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Card>
    </motion.div>
  );
}
