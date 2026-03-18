import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { courses } from '@/data/courses';
import { ArrowLeft, Clock, Banknote, Calendar, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClassDetailsPage() {
    const { classId } = useParams();
    const classItem = courses.find((c) => c.id === classId);

    if (!classItem) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold mb-4">Class Not Found</h2>
                <Link to="/classes">
                    <Button>Back to Classes</Button>
                </Link>
            </div>
        );
    }

    const Icon = classItem.icon;

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8 }
        }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${classItem.color} mb-8 shadow-2xl ring-4 ring-white/10 backdrop-blur-sm`}
                    >
                        <Icon className="h-12 w-12 text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="font-serif font-bold text-5xl lg:text-7xl mb-6 tracking-tight drop-shadow-lg"
                    >
                        {classItem.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
                    >
                        {classItem.description}
                    </motion.p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 -mt-32 relative z-20">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="lg:col-span-8 space-y-8"
                    >
                        {/* Overview Card */}
                        <motion.div variants={fadeInUp}>
                            <Card className="shadow-2xl border-none bg-card/50 backdrop-blur-xl overflow-hidden">
                                <CardContent className="p-8 lg:p-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                                            <Star className="h-6 w-6" />
                                        </div>
                                        <h2 className="font-serif text-3xl font-bold text-foreground">Course Highlights</h2>
                                    </div>
                                    <ul className="grid sm:grid-cols-2 gap-6">
                                        {classItem.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-background/50 hover:bg-background transition-colors border border-border/50">
                                                <CheckCircle2 className="text-primary mt-1 shrink-0 h-5 w-5" />
                                                <span className="text-foreground/80 font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Curriculum */}
                        {classItem.curriculum && (
                            <motion.div variants={fadeInUp}>
                                <Card className="shadow-2xl border-none bg-card/50 backdrop-blur-xl overflow-hidden">
                                    <CardContent className="p-8 lg:p-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-2 rounded-full bg-secondary/10 text-secondary">
                                                <ChevronRight className="h-6 w-6" />
                                            </div>
                                            <h2 className="font-serif text-3xl font-bold text-foreground">Detailed Curriculum</h2>
                                        </div>

                                        <Accordion type="single" collapsible className="w-full space-y-4">
                                            {classItem.curriculum.map((module, index) => (
                                                <AccordionItem key={index} value={`item-${index}`} className="border border-border/60 rounded-xl px-2 shadow-sm bg-background/40 data-[state=open]:bg-background/80 data-[state=open]:shadow-md transition-all duration-300">
                                                    <AccordionTrigger className="hover:no-underline py-5 px-4 group">
                                                        <div className="text-left flex-1 pr-4">
                                                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{module.title}</h3>
                                                            {module.duration && <p className="text-sm text-muted-foreground font-medium mt-1 flex items-center gap-1"><Clock className="h-3 w-3" /> {module.duration}</p>}
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="pt-2 pb-6 px-4">
                                                        {module.topics ? (
                                                            <ul className="space-y-3 mt-2 grid sm:grid-cols-2 gap-x-8">
                                                                {module.topics.map((topic, i) => (
                                                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                                                        <div className="w-2 h-2 rounded-full bg-primary/40 shrink-0 ring-2 ring-primary/20" />
                                                                        <span>{topic}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : null}

                                                        {module.items ? (
                                                            <div className="space-y-8 mt-4">
                                                                {module.items.map((subModule, i) => (
                                                                    <div key={i} className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                                                                        <h4 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                                                                            <span className="w-1.5 h-6 bg-secondary/80 rounded-full"></span>
                                                                            {subModule.subtitle}
                                                                        </h4>
                                                                        <ul className="space-y-3 pl-2 grid sm:grid-cols-2 gap-x-6">
                                                                            {subModule.topics.map((topic, j) => (
                                                                                <li key={j} className="flex items-center gap-3 text-muted-foreground">
                                                                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary/40 shrink-0" />
                                                                                    <span>{topic}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        {/* Key Details Card */}
                        <div className="sticky top-24">
                            <Card className="shadow-2xl border-none bg-card/80 backdrop-blur-xl overflow-hidden ring-1 ring-white/20">
                                <div className={`h-2 w-full bg-gradient-to-r ${classItem.color}`}></div>
                                <CardContent className="p-8 space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-6 text-foreground font-serif">Class At A Glance</h3>
                                        <div className="space-y-5">
                                            <div className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20 group">
                                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                    <Clock className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground text-sm uppercase tracking-wide">Duration</p>
                                                    <p className="text-base text-muted-foreground">{classItem.duration}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-secondary/20 group">
                                                <div className="p-2 rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                                                    <Banknote className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground text-sm uppercase tracking-wide">Course Fee</p>
                                                    <p className="text-base text-muted-foreground">{classItem.fee}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-accent-foreground/20 group">
                                                <div className="p-2 rounded-lg bg-accent/20 text-accent-foreground group-hover:bg-accent-foreground group-hover:text-accent transition-colors">
                                                    <Calendar className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground text-sm uppercase tracking-wide">Outcome</p>
                                                    <p className="text-base text-muted-foreground leading-snug">{classItem.outcome}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border">
                                        <Link to={`/enroll?classId=${classItem.id}`} className="block">
                                            <Button size="lg" className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 rounded-xl">
                                                Enroll Now <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                                            </Button>
                                        </Link>
                                        <p className="text-xs text-center text-muted-foreground mt-4 italic">
                                            * Limited seats available per batch
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
