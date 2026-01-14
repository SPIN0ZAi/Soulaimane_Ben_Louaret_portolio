import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, GraduationCap } from 'lucide-react';

interface Course {
  name: string;
  code?: string;
}

interface AcademicYear {
  year: string;
  courses: Course[];
}

const academicYears: AcademicYear[] = [
  {
    year: '2025-26',
    courses: [
      { name: 'Data Structures', code: '25/26' },
      { name: 'Logic', code: '25/26' },
      { name: 'Operating Systems I', code: 'English Group' },
      { name: 'Computer Organization', code: '2025-26' },
      { name: 'Software Engineering I', code: '25-26' },
    ],
  },
  {
    year: '2024-25',
    courses: [
      { name: 'Algebra and Discrete Mathematics', code: 'Group I' },
      { name: 'Business Management Fundamentals' },
      { name: 'Calculus and Numerical Methods', code: '24/25' },
      { name: 'Computer Architecture Fundamentals' },
      { name: 'Computer Networks I', code: 'Group I' },
      { name: 'Programming Fundamentals I', code: 'Group I' },
      { name: 'Information Systems', code: 'Group I' },
      { name: 'Physics for Computing Science', code: 'Group I' },
      { name: 'Programming Fundamentals II', code: 'Group I' },
      { name: 'Computer Technology', code: 'Group I' },
    ],
  },
];

export default function CoursesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="courses" className="py-20 md:py-32 px-6 bg-gradient-to-b from-background to-muted/10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-10 w-10 text-accent" />
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground" data-testid="text-courses-title">
              Academic Curriculum
            </h2>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent-foreground mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Computer Engineering coursework at Universidad de Castilla-La Mancha
          </p>
        </div>

        {/* Academic Years */}
        <div className="space-y-8">
          {academicYears.map((academicYear, yearIndex) => (
            <motion.div
              key={academicYear.year}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * yearIndex, duration: 0.5 }}
            >
              <Card className="p-8 bg-card border-2 border-card-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Year Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border-2 border-accent/30">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-card-foreground" data-testid={`text-year-${academicYear.year}`}>
                      Academic Year {academicYear.year}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {academicYear.courses.length} courses
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge 
                      variant="secondary"
                      className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-full"
                    >
                      {academicYear.year === '2025-26' ? 'Current' : 'Completed'}
                    </Badge>
                  </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {academicYear.courses.map((course, courseIndex) => (
                    <motion.div
                      key={course.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + yearIndex * 0.1 + courseIndex * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.03 }}
                      className="group"
                    >
                      <Card className="p-4 h-full bg-gradient-to-br from-card to-muted/30 border border-card-border hover:border-accent/50 rounded-2xl transition-all duration-300 hover:shadow-md">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                              <BookOpen className="h-4 w-4 text-accent" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-card-foreground leading-tight mb-1 group-hover:text-accent transition-colors">
                              {course.name}
                            </h4>
                            {course.code && (
                              <p className="text-xs text-muted-foreground">
                                {course.code}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/20 rounded-2xl">
            <div className="text-3xl font-bold text-accent mb-2">
              {academicYears.reduce((sum, year) => sum + year.courses.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Total Courses Completed
            </div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 rounded-2xl">
            <div className="text-3xl font-bold text-primary mb-2">
              {academicYears.length}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Academic Years
            </div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-secondary/10 to-accent/10 border-2 border-secondary/20 rounded-2xl">
            <div className="text-3xl font-bold text-secondary mb-2">
              UCLM
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Universidad de Castilla-La Mancha
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
