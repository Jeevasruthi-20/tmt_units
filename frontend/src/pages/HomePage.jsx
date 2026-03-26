import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { GraduationCap, Scissors, Sparkles, Users, Award, Heart, ArrowRight, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const classes = [
    {
      id: 'tailoring',
      title: 'Tailoring Course',
      description: 'Master the art of garment construction and pattern making with precision.',
      icon: Scissors,
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 'aari',
      title: 'Aari Work Course',
      description: 'Learn traditional South Indian embroidery techniques for a royal finish.',
      icon: Sparkles,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'embroidery',
      title: 'Embroidery Course',
      description: 'Create beautiful hand-embroidered designs and intricate patterns.',
      icon: Heart,
      color: 'bg-accent/20 text-accent-foreground',
    },
  ];

  const stitchingServices = [
    { title: 'Chudi', image: '/images/chudi.jpg', path: '/stitching/chudi' },
    { title: 'Pants', image: '/images/pants.jpg', path: '/stitching/pants' },
    { title: 'Blouse', image: '/images/blouse.jpg', path: '/stitching/blouse' },
    { title: 'Skirts', image: '/images/skirts.jpg', path: '/stitching/skirts' },
    { title: 'Frock', image: '/images/frock.jpg', path: '/stitching/frock' },
    { title: 'Lehenga', image: '/images/lehenga.jpg', path: '/stitching/lehenga' },
    { title: 'Traditional Top & Skirt', image: '/images/traditional-top-skirt.jpg', path: '/stitching/traditional-top-skirt' },
  ];

  const features = [
    { icon: Users, title: 'Expert Instructors', description: 'Learn from experienced professionals' },
    { icon: Award, title: 'Quality Craftsmanship', description: 'Perfect fit and premium finishing' },
    { icon: GraduationCap, title: 'Flexible Learning', description: 'Online and offline options' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div ref={containerRef} className="overflow-x-hidden selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
            <img 
                src="/images/hero.jpg" 
                alt="Luxury Tailoring" 
                className="w-full h-full object-cover opacity-10 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        </div>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[10%] -right-[5%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px]"
          />
          <motion.div 
            style={{ y: y2, rotate }}
            className="absolute -bottom-[10%] -left-[5%] w-[35rem] h-[35rem] bg-secondary/5 rounded-full blur-[100px]"
          />
        </div>

        <div className="container relative z-10 px-4 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-10"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-primary/10 shadow-lg shadow-primary/5">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-muted/20" />
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  The Gold Standard in Tailoring
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-serif font-bold text-6xl lg:text-8xl leading-[1.05] tracking-tight text-foreground">
                Bespoke <br />
                <span className="text-primary italic relative">
                  Artistry
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/30" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10.5C51 -1.5 249 -1.5 299 10.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
                <br />
                in Every Stitch
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl font-light">
                Meticulously crafted garments that tell your story. Join our masterclass or experience the luxury of custom tailoring.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link to="/classes" className="group">
                  <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95 overflow-hidden relative">
                    <span className="relative z-10 text-white font-bold">Discover All Classes</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary via-accent/20 to-primary"
                      animate={{ x: ['100%', '-100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </Button>
                </Link>
                <Link to="/stitching">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl border-2 border-zinc-200 hover:bg-secondary/5 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm text-zinc-900 font-bold">
                    Enquire Services
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-12 pt-10 border-t border-border/50">
                <div className="space-y-1">
                  <div className="font-serif font-bold text-4xl text-foreground tabular-nums">500+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Certified Students</div>
                </div>
                <div className="space-y-1">
                  <div className="font-serif font-bold text-4xl text-foreground tabular-nums">1.2k+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Bespoke Projects</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group">
                <img
                  src="/images/tailoring.jpg"
                  alt="Haute Couture Workshop"
                  className="w-full h-[700px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-40"></div>
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute bottom-12 right-12 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/50"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                    <Star className="h-6 w-6 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Verified Master</div>
                    <div className="text-xs text-muted-foreground">15+ Years Experience</div>
                  </div>
                </motion.div>
              </div>
              
              <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Process Section - New to reduce whitespace and add value */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div variants={fadeInUp} className="space-y-10">
              <div className="space-y-4">
                <div className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Proven Excellence</div>
                <h2 className="font-serif font-bold text-5xl lg:text-7xl text-zinc-900 leading-tight">Our Signature <br/><span className="italic text-primary">Creation Path</span></h2>
              </div>
              
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Consultation', text: 'We begin with an intimate dialogue to understand your aesthetic vision and functional needs.' },
                  { step: '02', title: 'Measurement', text: 'Using anatomical precision guides to ensure a silhouette that fits like a second skin.' },
                  { step: '03', title: 'Master Drafting', text: 'Our artisans translate metrics into custom paper patterns before the first cut.' },
                  { step: '04', title: 'Bespoke Finish', text: 'Meticulous construction followed by quality audits for the perfect reveal.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="text-3xl font-serif font-bold text-primary/20 group-hover:text-primary transition-colors">{item.step}</div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-zinc-900">{item.title}</h3>
                      <p className="text-zinc-500 font-light leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-3xl -z-10"></div>
                <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white/50 backdrop-blur-sm p-12 lg:p-16 border border-zinc-100">
                    <div className="space-y-8">
                        <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                        <h3 className="font-serif font-bold text-3xl italic">"We don't just stitch fabric; we weave confidence and heritage into every garment."</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-zinc-100 border border-zinc-200"></div>
                            <div>
                                <p className="font-bold text-zinc-900">The Atelier Director</p>
                                <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Thangam Magalir Thaiyalagam</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-32 bg-muted/20 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="container px-4 mx-auto">
          <div className="text-center mb-24 space-y-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              className="text-primary font-bold uppercase tracking-[0.3em] text-xs"
            >
              Educational Path
            </motion.div>
            <h2 className="font-serif font-bold text-5xl lg:text-6xl text-foreground">
              Master the <span className="text-primary italic">Craft</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {classes.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border-none bg-white/50 backdrop-blur-sm group overflow-hidden rounded-[2.5rem]">
                    <CardContent className="p-10 flex flex-col items-center text-center relative z-10 h-full">
                      <div className={`w-24 h-24 rounded-[2rem] ${item.color} flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-500 shadow-xl relative`}>
                        <Icon className="h-10 w-10 relative z-10" />
                        <div className="absolute inset-0 bg-white/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <h3 className="font-serif font-bold text-3xl mb-4 text-foreground tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-10 text-lg font-light">
                        {item.description}
                      </p>
                      <Link to={`/classes/${item.id}`} className="mt-auto w-full">
                        <Button variant="ghost" className="w-full h-14 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all gap-2 border-2 border-transparent group-hover:border-primary">
                          Explore Syllabus <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stitching Services Carousel */}
      <section className="py-32 relative bg-background overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] -skew-y-3 scale-110"></div>
        <div className="container px-4 mx-auto relative z-10">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
              <div className="space-y-6 max-w-2xl">
                <div className="text-secondary font-bold uppercase tracking-[0.3em] text-xs">Atelier Services</div>
                <h2 className="font-serif font-bold text-5xl lg:text-6xl text-foreground leading-tight">
                  Iconic <span className="text-secondary italic">Silhouettes</span>
                </h2>
                <p className="text-muted-foreground text-xl font-light">
                  Bespoke garments meticulously aligned to your unique profile and aesthetic vision.
                </p>
              </div>

              <div className="flex gap-4">
                <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-2xl border-2 hover:bg-secondary hover:text-white transition-all shadow-lg" />
                <CarouselNext className="static translate-y-0 h-14 w-14 rounded-2xl border-2 hover:bg-secondary hover:text-white transition-all shadow-lg" />
              </div>
            </div>

            <CarouselContent className="-ml-6">
              {stitchingServices.map((service, index) => (
                <CarouselItem key={index} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Link to={service.path} className="group block">
                    <div className="relative overflow-hidden rounded-[2.5rem] aspect-[3/4] shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                          <Sparkles className="h-4 w-4 text-secondary" />
                          <span className="text-secondary text-xs font-bold uppercase tracking-widest">Premium Fitting</span>
                        </div>
                        <h3 className="font-serif font-bold text-3xl text-white mb-4">
                          {service.title}
                        </h3>
                        <div className="flex items-center text-white/70 text-sm font-semibold group-hover:text-white transition-colors">
                          Configure Design <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-muted/10">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-16 relative">
            <div className="absolute inset-0 flex items-center pointer-events-none hidden md:flex">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            </div>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center px-6 relative bg-transparent group"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl mb-10 text-secondary transform group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out border border-white/50">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-light">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Call to Action */}
      <section className="py-24 px-4">
        <div className="container mx-auto px-0">
          <div className="relative rounded-[4rem] overflow-hidden bg-primary py-24 px-10 text-center shadow-[0_50px_100px_-20px_rgba(var(--primary-rgb),0.4)]">
            <div className="absolute inset-0 bg-[url('/images/tailoring.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay scale-110"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="font-serif font-bold text-5xl lg:text-7xl text-white leading-tight">Initiate Your <br />Artisan Journey</h2>
              <p className="text-primary-foreground/80 text-xl font-light max-w-2xl mx-auto italic">
                Join a community of connoisseurs and creators. Whether learning or wearing, excellence is guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="h-16 px-12 text-xl rounded-2xl shadow-2xl hover:scale-105 transition-all">
                    Contact The Atelier
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="ghost" className="h-16 px-12 text-xl rounded-2xl text-white hover:bg-white/10 border-2 border-white/20 backdrop-blur-sm">
                    Our Philosophy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

