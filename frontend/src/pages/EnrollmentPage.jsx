import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OnlineClassForm from '@/components/forms/OnlineClassForm';
import OfflineClassForm from '@/components/forms/OfflineClassForm';
import { courses } from '@/data/courses';
import { GraduationCap, Sparkles, Globe, MapPin, Scissors } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function EnrollmentPage() {
    const [searchParams] = useSearchParams();
    const initialClassId = searchParams.get('classId');

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Legend Hero Header */}
            <section className="relative pt-6 pb-12 lg:pt-8 lg:pb-14 bg-muted/30 overflow-hidden border-b border-border/40">
                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Breadcrumbs />
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                                <GraduationCap className="h-3.5 w-3.5" />
                                Admissions Open
                            </div>
                            <h1 className="font-serif font-bold text-5xl lg:text-7xl text-foreground tracking-tight">
                                Applied <span className="text-primary italic">Learning</span>
                            </h1>
                            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                                Join our academy and begin your journey into the world of traditional and modern couture.
                            </p>
                        </motion.div>
                    </div>
                </div>
                {/* Background Decoration */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            </section>

            <section className="container mx-auto px-4 py-16 lg:py-24 max-w-5xl">
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                >
                    <Card className="shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-none bg-white/80 backdrop-blur-xl rounded-[3rem] overflow-hidden">
                        <CardContent className="p-8 lg:p-16">
                            <Tabs defaultValue="online" className="w-full">
                                <div className="flex flex-col items-center mb-16 space-y-8">
                                    <div className="flex items-center gap-4 text-center">
                                        <div className="h-px w-12 bg-border"></div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Select Mode</span>
                                        <div className="h-px w-12 bg-border"></div>
                                    </div>
                                    <TabsList className="grid w-full max-w-md grid-cols-2 p-1.5 h-16 rounded-2xl bg-muted/50 border border-border/50">
                                        <TabsTrigger value="online" className="rounded-xl text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                                            <Globe className="mr-2 h-4 w-4" />
                                            Online
                                        </TabsTrigger>
                                        <TabsTrigger value="offline" className="rounded-xl text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            Offline
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="online" className="space-y-12">
                                    <div className="flex items-start gap-6 p-8 rounded-[2rem] bg-indigo-50/50 border border-indigo-100/50 text-indigo-900 group">
                                        <div className="p-3 rounded-2xl bg-white shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                            <Globe className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-lg">Global Live Sessions</h3>
                                            <p className="text-sm font-light leading-relaxed text-indigo-700/80">
                                                Join our interactive live cohorts from anywhere in the world. Real-time feedback and high-definition demonstrations.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="max-w-3xl mx-auto">
                                        <OnlineClassForm classes={courses} initialClassId={initialClassId} />
                                    </div>
                                </TabsContent>

                                <TabsContent value="offline" className="space-y-12">
                                    <div className="flex items-start gap-6 p-8 rounded-[2rem] bg-emerald-50/50 border border-emerald-100/50 text-emerald-900 group">
                                        <div className="p-3 rounded-2xl bg-white shadow-sm text-emerald-600 group-hover:scale-110 transition-transform">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-lg">Atelier Experience</h3>
                                            <p className="text-sm font-light leading-relaxed text-emerald-700/80">
                                                Immerse yourself in our professional studio environment. Hands-on guidance and access to industrial machinery.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="max-w-3xl mx-auto">
                                        <OfflineClassForm classes={courses} initialClassId={initialClassId} />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>
                
                {/* Additional Trust Marker */}
                <div className="mt-16 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">Master Instruction</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Scissors className="h-5 w-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">Industry Hardware</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">Certified Program</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

