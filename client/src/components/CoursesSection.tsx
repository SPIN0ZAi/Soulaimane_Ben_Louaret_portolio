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
          { name: 'Analyse 1', description: 'Introductory Calculus' },
          { name: 'Algèbre 1', description: 'Basic Algebra' },
          { name: 'Electricité', description: 'Electricity Fundamentals' },
          { name: 'Circuits électriques et électronique', description: 'Basic Circuits & Electronics' },
          { name: 'Algorithmique et programmation 1', description: 'First Programming Course' },
          { name: 'Langues et communication', description: 'Communication Skills' },
        ],
      },
      {
        semester: 'Semester 2',
        courses: [
          { name: 'Analyse 2', description: 'Further Calculus' },
          { name: 'Algèbre 2', description: 'Continuation of Algebra' },
          { name: 'Thermodynamique', description: 'Thermodynamics' },
          { name: 'Mécanique du point & Optique géométrique', description: 'Mechanics and Optics' },
          { name: 'Structure de la matière', description: 'Material Structure Basics' },
          { name: 'Langues et communication 2', description: 'Languages & Communication' },
        ],
      },
      {
        semester: 'Semester 3',
        courses: [
          { name: 'Analyse 3', description: 'Higher-level Calculus' },
          { name: 'Statistique descriptive / Probabilités', description: 'Statistics and Probability' },
          { name: 'Algorithmique et Programmation 2', description: 'Advanced Programming' },
          { name: 'Electromagnétisme', description: 'Electromagnetism' },
          { name: 'Réactivité chimique', description: 'Chemical Reactivity' },
          { name: 'Langues et communication 3', description: 'Languages & Communication' },
        ],
      },
      {
        semester: 'Semester 4',
        courses: [
          { name: 'Analyse 4', description: 'Advanced Calculus' },
          { name: 'Mécanique quantique & Relativité', description: 'Quantum Mechanics and Relativity' },
          { name: 'Mécanique du solide', description: 'Solid Mechanics' },
          { name: 'Structures de données en C', description: 'Data Structures in C' },
          { name: 'Chimie minérale 1', description: 'Inorganic Chemistry' },
          { name: 'Chimie organique 1', description: 'Organic Chemistry' },
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
                      {academicYear.institution && (
                        <span className="text-accent">{academicYear.institution}</span>
                      )}{' '}
                      Academic Year {academicYear.year}
                    </h3>
                    <p className="text-base text-foreground/70 font-medium">
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
                      className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-accent to-primary text-primary-foreground border-2 border-accent/50 rounded-full shadow-lg"
                    >
                      {academicYear.year === '2025-26' ? 'Current' : academicYear.institution === 'FST Tanger' ? 'Foundation' : 'Completed'}
                    </Badge>
                  </div>
                </div>

                {/* Note for FST Tanger */}
                {academicYear.note && (
                  <div className="mb-6 p-4 bg-primary/10 border-l-4 border-primary rounded-lg">
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
                )}

                {/* Semester-based Layout for FST Tanger */}
                {academicYear.semesters && (
                  <div className="space-y-6">
                    {academicYear.semesters.map((semester, semIndex) => (
                      <div key={semester.semester}>
                        <h4 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                            S{semIndex + 1}
                          </span>
                          {semester.semester}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {semester.courses.map((course, courseIndex) => (
                            <motion.div
                              key={course.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={inView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ delay: 0.3 + yearIndex * 0.1 + semIndex * 0.1 + courseIndex * 0.03, duration: 0.3 }}
                              whileHover={{ scale: 1.02 }}
                              className="group"
                            >
                              <Card className="p-3 h-full bg-gradient-to-br from-muted/80 to-card/80 backdrop-blur-sm border-2 border-card-border hover:border-accent/60 hover:bg-accent/5 rounded-xl transition-all duration-300 hover:shadow-md">
                                <div className="flex items-start gap-2">
                                  <div className="flex-shrink-0 mt-0.5">
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30 flex items-center justify-center group-hover:bg-accent/30 group-hover:border-accent/50 transition-all">
                                      <BookOpen className="h-4 w-4 text-accent" />
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-bold text-sm text-foreground leading-tight mb-1 group-hover:text-accent transition-colors">
                                      {course.name}
                                    </h5>
                                    {course.description && (
                                      <p className="text-xs text-foreground/60 font-medium leading-tight">
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
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm border-2 border-accent/40 rounded-2xl shadow-lg hover:shadow-xl hover:border-accent/60 transition-all">
            <div className="text-4xl md:text-5xl font-bold text-accent drop-shadow-lg mb-2">
              {academicYears.reduce((sum, year) => {
                if (year.courses) return sum + year.courses.length;
                if (year.semesters) return sum + year.semesters.reduce((s, sem) => s + sem.courses.length, 0);
                return sum;
              }, 0)}
            </div>
            <div className="text-sm md:text-base text-foreground font-bold">
              Total Courses Studied
            </div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/40 rounded-2xl shadow-lg hover:shadow-xl hover:border-primary/60 transition-all">
            <div className="text-4xl md:text-5xl font-bold text-primary drop-shadow-lg mb-2">
              2
            </div>
            <div className="text-sm md:text-base text-foreground font-bold">
              Universities
            </div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-secondary/20 to-accent/20 backdrop-blur-sm border-2 border-secondary/40 rounded-2xl shadow-lg hover:shadow-xl hover:border-secondary/60 transition-all">
            <div className="text-4xl md:text-5xl font-bold text-secondary drop-shadow-lg mb-2">
              {academicYears.length}
            </div>
            <div className="text-sm md:text-base text-foreground font-bold">
              Academic Periods
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
