import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { GraduationCap, Scissors, Sparkles, Users, Award, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const classes = [
    {
      id: 'tailoring',
      title: 'Tailoring Course',
      description: 'Master the art of garment construction and pattern making',
      icon: Scissors,
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 'aari',
      title: 'Aari Work Course',
      description: 'Learn traditional South Indian embroidery techniques',
      icon: Sparkles,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      id: 'embroidery',
      title: 'Embroidery Course',
      description: 'Create beautiful hand-embroidered designs and patterns',
      icon: Heart,
      color: 'bg-accent/20 text-accent-foreground',
    },
  ];

  const stitchingServices = [
    {
      title: 'Chudi',
      image: '/images/chudi.jpg',
      path: '/stitching/chudi',
    },
    {
      title: 'Pants',
      image: '/images/pants.jpg',
      path: '/stitching/pants',
    },
    {
      title: 'Blouse',
      image: '/images/blouse.jpg',
      path: '/stitching/blouse',
    },
    {
      title: 'Skirts',
      image: '/images/skirts.jpg',
      path: '/stitching/skirts',
    },
    {
      title: 'Frock',
      image: '/images/frock.jpg',
      path: '/stitching/frock',
    },
    {
      title: 'Lehenga',
      image: '/images/lehenga.jpg',
      path: '/stitching/lehenga',
    },
    {
      title: 'Traditional Top & Skirt',
      image: '/images/traditional-top-skirt.jpg',
      path: '/stitching/traditional-top-skirt',
    },
  ];

  const features = [
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from experienced professionals',
    },
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Perfect fit and premium finishing',
    },
    {
      icon: GraduationCap,
      title: 'Flexible Learning',
      description: 'Online and offline options',
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40 z-10"></div>
          <img
            src="/images/tailoring.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="container relative z-10 px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-block relative">
                <span className="relative z-10 inline-flex items-center gap-2 px-6 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary tracking-wide uppercase border border-primary/20">
                  <Sparkles className="h-4 w-4" />
                  Premium Tailoring & Education
                </span>
                <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full"></div>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-serif font-bold text-5xl lg:text-7xl leading-tight text-foreground">
                Crafting <span className="text-primary italic">Elegance</span>,<br />
                Stitching <span className="text-secondary italic">Dreams</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Experience the art of perfect fit with our bespoke tailoring services, or master the craft yourself through our professional courses.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/classes/tailoring">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                    Start Learning
                  </Button>
                </Link>
                <Link to="/stitching">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-2 hover:bg-secondary/5 transition-all hover:-translate-y-1">
                    Book Service
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-8 pt-8 border-t border-border/50">
                <div>
                  <div className="font-bold text-3xl text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground font-medium">Happy Students</div>
                </div>
                <div>
                  <div className="font-bold text-3xl text-foreground">1000+</div>
                  <div className="text-sm text-muted-foreground font-medium">Garments Stitched</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/tailoring.jpg"
                  alt="Tailoring workshop"
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-24 bg-muted/30 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif font-bold text-4xl lg:text-5xl text-foreground">
              Master the Craft
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional courses designed to take you from beginner to expert
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {classes.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none bg-background/50 backdrop-blur-sm group overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                      <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                        <Icon className="h-10 w-10" />
                      </div>
                      <h3 className="font-serif font-bold text-2xl mb-4 text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        {item.description}
                      </p>
                      <Link to={`/classes/${item.id}`} className="mt-auto w-full">
                        <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stitching Services */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 scale-110 z-0"></div>
        <div className="container px-4 mx-auto relative z-10">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="space-y-4">
                <h2 className="font-serif font-bold text-4xl lg:text-5xl text-foreground">
                  Custom Stitching
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Bespoke garments tailored to your unique measurements and style preference.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="bg-background rounded-full p-1 border border-border">
                  <CarouselPrevious className="static translate-y-0 translate-x-0 ml-0 hover:bg-primary hover:text-primary-foreground" />
                </div>
                <div className="bg-background rounded-full p-1 border border-border">
                  <CarouselNext className="static translate-y-0 translate-x-0 hover:bg-primary hover:text-primary-foreground" />
                </div>
              </div>
            </div>

            <CarouselContent className="-ml-4">
              {stitchingServices.map((service, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Link to={service.path} className="group block h-full">
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-serif font-bold text-2xl text-white mb-2">
                          {service.title}
                        </h3>
                        <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          Configure Design <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-border">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center px-4 pt-8 md:pt-0"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6 text-secondary transform group-hover:rotate-12 transition-transform">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/tailoring.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of satisfied customers and students who have chosen us for their tailoring needs.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="px-10 h-14 text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
