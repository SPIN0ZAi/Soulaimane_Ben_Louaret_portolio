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
    <section id="courses" className="py-20 md:py-32 px-6 bg-background">
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-courses-title">
              Academic Curriculum
            </h2>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
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
              <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-accent/30 rounded-3xl shadow-lg hover:shadow-xl hover:border-accent/50 transition-all duration-300">
                {/* Year Header */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-accent/50 shadow-md">
                    <Calendar className="h-7 w-7 text-accent drop-shadow-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground drop-shadow-sm" data-testid={`text-year-${academicYear.year}`}>
                      Academic Year {academicYear.year}
                    </h3>
                    <p className="text-base text-foreground/70 font-medium">
                      {academicYear.courses.length} courses
                    </p>
                  </div>
                  <div>
                    <Badge 
                      variant="secondary"
                      className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-accent to-primary text-primary-foreground border-2 border-accent/50 rounded-full shadow-lg"
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
                      <Card className="p-4 h-full bg-gradient-to-br from-muted/80 to-card/80 backdrop-blur-sm border-2 border-card-border hover:border-accent/60 hover:bg-accent/5 rounded-2xl transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center group-hover:bg-accent/30 group-hover:border-accent/50 transition-all shadow-sm">
                              <BookOpen className="h-5 w-5 text-accent drop-shadow-sm" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm md:text-base text-foreground leading-tight mb-1.5 group-hover:text-accent transition-colors">
                              {course.name}
                            </h4>
                            {course.code && (
                              <p className="text-xs md:text-sm text-foreground/60 font-medium">
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
          <Card className="p-6 text-center bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm border-2 border-accent/40 rounded-2xl shadow-lg hover:shadow-xl hover:border-accent/60 transition-all">
            <div className="text-4xl md:text-5xl font-bold text-accent drop-shadow-lg mb-2">
              {academicYears.reduce((sum, year) => sum + year.courses.length, 0)}
            </div>
            <div className="text-sm md:text-base text-foreground font-bold">
              Total Courses Completed
            </div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/40 rounded-2xl shadow-lg hover:shadow-xl hover:border-primary/60 transition-all">
            <div className="text-4xl md:text-5xl font-bold text-primary drop-shadow-lg mb-2">
              {academicYears.length}
            </div>
            <div className="text-sm md:text-base text-foreground font-bold">
              Academic Years
            </div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-secondary/20 to-accent/20 backdrop-blur-sm border-2 border-secondary/40 rounded-2xl shadow-lg hover:shadow-xl hover:border-secondary/60 transition-all">
            <div className="text-4xl md:text-5xl font-bold text-secondary drop-shadow-lg mb-2">
              UCLM
            </div>
            <div className="text-sm md:text-base text-foreground font-bold">
              Universidad de Castilla-La Mancha
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
