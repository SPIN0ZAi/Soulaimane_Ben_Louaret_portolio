import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, BookOpen, Award } from 'lucide-react';

export default function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const courses = [
    'Computer Architecture',
    'Software Engineering',
    'Operating Systems',
    'Computer Networks',
    'Data Structures',
  ];

  const certifications = ['CompTIA Network+', 'Cisco Networking', 'Network Security Diploma'];

  return (
    <section
      id="experience"
      className="py-20 md:py-32 px-6 bg-gradient-to-b from-primary/5 to-background"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center" data-testid="text-experience-title">
          Education & Experience
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent-foreground mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" data-testid="text-education-degree">
                    Computer Engineering Student
                  </h3>
                  <p className="text-muted-foreground mb-1" data-testid="text-education-university">
                    Universidad de Castilla-La Mancha
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">2024 - 2026</p>
                  <p className="text-sm">
                    Pursuing advanced studies in computer engineering with focus on software
                    development, algorithms, and system architecture.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-foreground/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" data-testid="text-work-title">
                    Electronics Repair Technician
                  </h3>
                  <p className="text-muted-foreground mb-1">1 year experience</p>
                  <p className="text-sm text-muted-foreground mb-4">Hardware & Electronics</p>
                  <p className="text-sm">
                    Specialized in hardware diagnostics, phone and computer repair, and customer
                    service. Developed strong problem-solving skills and technical expertise.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Current Courses</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {courses.map((course, idx) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-sm" data-testid={`badge-course-${idx}`}>
                      {course}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-6 w-6 text-accent-foreground" />
                <h3 className="text-xl font-bold">Certifications in Progress</h3>
              </div>
              <div className="space-y-2">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-2 w-2 bg-primary rounded-full"></div>
                    <span className="text-sm" data-testid={`text-cert-${idx}`}>{cert}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
