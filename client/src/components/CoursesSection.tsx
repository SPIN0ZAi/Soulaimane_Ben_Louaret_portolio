import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, GraduationCap, Info } from 'lucide-react';

interface Course {
  name: string;
  code?: string;
  description?: string;
}

interface Semester {
  semester: string;
  courses: Course[];
}

interface AcademicYear {
  year: string;
  courses?: Course[];
  semesters?: Semester[];
  institution?: string;
  note?: string;
}

const academicYears: AcademicYear[] = [
  {
    year: '2025-26',
    institution: 'UCLM',
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
    institution: 'UCLM',
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
  {
    year: '2022-24',
    institution: 'FST Tanger',
    note: 'Foundational studies in Science & Technology. While credits were not transferred to UCLM, the experience and knowledge provided a strong foundation for future studies.',
    semesters: [
      {
        semester: 'Semester 1',
        courses: [
          { name: 'Analysis 1', description: 'Introductory Calculus' },
          { name: 'Algebra 1', description: 'Basic Algebra' },
          { name: 'Electricity', description: 'Electricity Fundamentals' },
          { name: 'Electric Circuits and Electronics', description: 'Basic Circuits & Electronics' },
          { name: 'Algorithms and Programming 1', description: 'First Programming Course' },
          { name: 'Languages and Communication', description: 'Communication Skills' },
        ],
      },
      {
        semester: 'Semester 2',
        courses: [
          { name: 'Analysis 2', description: 'Further Calculus' },
          { name: 'Algebra 2', description: 'Continuation of Algebra' },
          { name: 'Thermodynamics', description: 'Thermodynamics' },
          { name: 'Point Mechanics & Geometric Optics', description: 'Mechanics and Optics' },
          { name: 'Structure of Matter', description: 'Material Structure Basics' },
          { name: 'Languages and Communication 2', description: 'Languages & Communication' },
        ],
      },
      {
        semester: 'Semester 3',
        courses: [
          { name: 'Analysis 3', description: 'Higher-level Calculus' },
          { name: 'Descriptive Statistics / Probability', description: 'Statistics and Probability' },
          { name: 'Algorithms and Programming 2', description: 'Advanced Programming' },
          { name: 'Electromagnetism', description: 'Electromagnetism' },
          { name: 'Chemical Reactivity', description: 'Chemical Reactivity' },
          { name: 'Languages and Communication 3', description: 'Languages & Communication' },
        ],
      },
      {
        semester: 'Semester 4',
        courses: [
          { name: 'Analysis 4', description: 'Advanced Calculus' },
          { name: 'Quantum Mechanics & Relativity', description: 'Quantum Mechanics and Relativity' },
          { name: 'Solid Mechanics', description: 'Solid Mechanics' },
          { name: 'Data Structures in C', description: 'Data Structures in C' },
          { name: 'Inorganic Chemistry 1', description: 'Inorganic Chemistry' },
          { name: 'Organic Chemistry 1', description: 'Organic Chemistry' },
        ],
      },
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
        <div className="space-y-20">
          {academicYears.map((academicYear, yearIndex) => (
            <motion.div
              key={academicYear.year}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * yearIndex, duration: 0.5 }}
            >
              <Card className="p-8 bg-background/50 border border-accent/25 rounded-xl shadow-sm">
                {/* Year Header */}
                <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-accent/15">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/8 border border-accent/20">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1" data-testid={`text-year-${academicYear.year}`}>
                      {academicYear.institution && (
                        <span className="text-primary">{academicYear.institution}</span>
                      )}{' '}
                      Academic Year {academicYear.year}
                    </h3>
                    <p className="text-sm text-foreground/70 font-medium">
                      {academicYear.courses 
                        ? `${academicYear.courses.length} courses`
                        : academicYear.semesters 
                        ? `${academicYear.semesters.reduce((sum, sem) => sum + sem.courses.length, 0)} courses across ${academicYear.semesters.length} semesters`
                        : ''}
                    </p>
                  </div>
                  <div>
                    <Badge 
                      variant="secondary"
                      className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                        academicYear.year === '2025-26' 
                          ? 'bg-primary/90 text-white border-0' 
                          : 'bg-background border border-accent/25 text-muted-foreground'
                      }`}
                    >
                      {academicYear.year === '2025-26' ? 'Current' : academicYear.institution === 'FST Tanger' ? 'Foundation' : 'Completed'}
                    </Badge>
                  </div>
                </div>

                {/* Note for FST Tanger */}
                {academicYear.note && (
                  <div className="mb-8 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {academicYear.note}
                      </p>
                    </div>
                  </div>
                )}

                {/* Regular Course Grid */}
                {academicYear.courses && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {academicYear.courses.map((course, courseIndex) => (
                      <motion.div
                        key={course.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + yearIndex * 0.1 + courseIndex * 0.05, duration: 0.3 }}
                        className="group"
                      >
                        <Card className="p-4 h-full bg-muted/30 border border-accent/25 hover:border-accent/40 rounded-lg transition-colors duration-200">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <BookOpen className="h-4 w-4 text-primary" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm md:text-base text-card-foreground leading-snug mb-1.5">
                                {course.name}
                              </h4>
                              {course.code && (
                                <p className="text-xs md:text-sm text-card-foreground/60 font-medium">
                                  {course.code}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Semester-based Layout for FST Tanger */}
                {academicYear.semesters && (
                  <div className="space-y-10">
                    {academicYear.semesters.map((semester, semIndex) => (
                      <div key={semester.semester}>
                        <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3 pb-2">
                          <span className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                            S{semIndex + 1}
                          </span>
                          {semester.semester}
                          <div className="flex-1 h-px bg-accent/12" />
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {semester.courses.map((course, courseIndex) => (
                            <motion.div
                              key={course.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={inView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ delay: 0.3 + yearIndex * 0.1 + semIndex * 0.1 + courseIndex * 0.03, duration: 0.3 }}
                              className="group"
                            >
                              <Card className="p-3.5 h-full bg-muted/30 border border-accent/25 hover:border-accent/40 rounded-lg transition-colors duration-200">
                                <div className="flex items-start gap-2.5">
                                  <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                                      <BookOpen className="h-4 w-4 text-primary" />
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-semibold text-sm text-card-foreground leading-snug mb-1">
                                      {course.name}
                                    </h5>
                                    {course.description && (
                                      <p className="text-xs text-card-foreground/60 leading-relaxed">
                                        {course.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center bg-muted/30 border border-accent/25 rounded-lg shadow-sm">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {academicYears.reduce((sum, year) => {
                if (year.courses) return sum + year.courses.length;
                if (year.semesters) return sum + year.semesters.reduce((s, sem) => s + sem.courses.length, 0);
                return sum;
              }, 0)}
            </div>
            <div className="text-sm md:text-base text-card-foreground/70 font-medium">
              Total Courses Studied
            </div>
          </Card>
          <Card className="p-6 text-center bg-muted/30 border border-accent/25 rounded-lg shadow-sm">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              2
            </div>
            <div className="text-sm md:text-base text-card-foreground/70 font-medium">
              Universities
            </div>
          </Card>
          <Card className="p-6 text-center bg-muted/30 border border-accent/25 rounded-lg shadow-sm">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {academicYears.length}
            </div>
            <div className="text-sm md:text-base text-card-foreground/70 font-medium">
              Academic Periods
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
