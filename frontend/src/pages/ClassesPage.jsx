import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Sparkles, ChevronRight, Scissors } from 'lucide-react';
import { courses } from '@/data/courses';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function ClassesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-16 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>
        <div className="container relative z-10 px-4 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Breadcrumbs />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 border border-primary/20">
              <GraduationCap className="h-3.5 w-3.5" />
              Creative Academy
            </div>
            <h1 className="font-serif font-bold text-6xl lg:text-8xl text-foreground mb-8 leading-tight tracking-tight">
              Master the <span className="text-primary italic">Craft</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              From foundational techniques to advanced couture tailoring. Join our expert-led sessions designed for aspiring designers and enthusiasts.
            </p>
          </motion.div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Classes Overview */}
      <section className="container mx-auto px-4 py-24 lg:py-32">
        <div className="space-y-12 mb-16">
          <div className="flex items-center gap-6">
            <h2 className="font-serif font-bold text-4xl text-foreground whitespace-nowrap">Academic Programs</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {courses.map((classItem, index) => {
              const Icon = classItem.icon;
              return (
                <motion.div
                  key={classItem.id}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/classes/${classItem.id}`} className="group block h-full">
                    <Card className="h-full border-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white/50 backdrop-blur-sm group-hover:-translate-y-2">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={classItem.image}
                          alt={classItem.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className={`absolute top-6 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${classItem.color} flex items-center justify-center shadow-xl ring-4 ring-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                      </div>

                      <CardHeader className="p-10 pb-0">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="h-3 w-3 text-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Certified Course</span>
                        </div>
                        <CardTitle className="font-serif text-3xl font-bold tracking-tight h-16 flex items-start group-hover:text-primary transition-colors">
                          {classItem.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground font-light text-base leading-relaxed line-clamp-2 italic">
                          "{classItem.description}"
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-10 pt-8 flex-1 flex flex-col">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-muted/40 p-4 rounded-2xl border border-border/50">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Duration</span>
                            <span className="text-sm font-bold text-foreground">{classItem.duration}</span>
                          </div>
                          <div className="bg-muted/40 p-4 rounded-2xl border border-border/50">
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Tuition</span>
                            <span className="text-sm font-bold text-foreground">{classItem.fee}</span>
                          </div>
                        </div>

                        <div className="space-y-4 mb-10 flex-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                            <BookOpen className="h-3 w-3" />
                            Syllabus Overview
                          </div>
                          <ul className="space-y-3">
                            {classItem.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground font-light">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-8 border-t border-border/50 flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-widest group-hover:text-primary transition-colors">Course Details</span>
                          <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform group-hover:text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-zinc-950 text-white rounded-[4rem] mx-4 lg:mx-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-fabric.png')] opacity-20"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif font-bold text-4xl lg:text-6xl mb-6">Why The <span className="text-primary italic">Academy?</span></h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">Experience-led education designed to transform passion into professional mastery.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Industry Hardware', desc: 'Train on the same industrial machinery used by high-end couture houses.', icon: Scissors },
              { title: 'Certified Excellence', desc: 'Receive a recognized certification of mastery upon completion of our programs.', icon: GraduationCap },
              { title: 'Live Mentorship', desc: 'Direct access to master tailors with over a decade of industry experience.', icon: Sparkles }
            ].map((item, i) => (
              <div key={i} className="space-y-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-white/10">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold">{item.title}</h3>
                <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class FAQ Section */}
      <section className="py-32 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-serif font-bold text-4xl lg:text-5xl">Frequently Asked <span className="text-primary italic">Questions</span></h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid gap-8">
            {[
              { q: 'Do I need my own sewing machine?', a: 'For offline classes, we provide all machinery. For online classes, having a basic sewing machine at home is highly recommended for practice.' },
              { q: 'Is there a weekend batch available?', a: 'Yes, we offer special weekend intensives for working professionals. Enquire during enrollment for current schedules.' },
              { q: 'Are materials provided for Aari work?', a: 'Absolutely. For our Aari and Embroidery courses, we provide a complete starter kit with high-quality threads, beads, and frames.' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-muted/30 border border-border/50 space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {item.q}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed pl-5">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900 text-white p-12 lg:p-20 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520004481444-d4841911470b?q=80&w=2070')] opacity-20 bg-cover bg-center grayscale"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif font-bold text-4xl lg:text-5xl tracking-tight">Ready to Start?</h2>
            <p className="text-zinc-400 text-lg font-light italic">
              "We offer both online live sessions and offline classroom experiences. No matter where you are, you can start your creative journey with us today."
            </p>
            <Link to="/enroll">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-16 px-12 text-lg rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
                Apply For Admission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

