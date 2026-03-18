import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Target, Sparkles, Scissors, ShieldCheck, Zap } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'Creating opportunities for women to learn and earn through traditional crafts',
      color: 'text-rose-500',
      bg: 'bg-rose-50'
    },
    {
      icon: ShieldCheck,
      title: 'Reliability',
      description: 'Maintaining excellence in both education and custom stitching services',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive network of learners and craftswomen',
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Preserving and promoting traditional South Indian craft techniques',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
  ];

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
              <Sparkles className="h-3.5 w-3.5" />
              Our Legacy
            </div>
            <h1 className="font-serif font-bold text-6xl lg:text-8xl text-foreground mb-8 leading-tight tracking-tight">
              Crafting <span className="text-primary italic">Futures</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              Empowering women through the art of professional tailoring and traditional South Indian crafts since our inception.
            </p>
          </motion.div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl"></div>
            <img
              src="/images/about.jpg"
              alt="Traditional crafts"
              className="relative rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover ring-1 ring-border/50"
            />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-8 rounded-[2rem] shadow-2xl hidden lg:flex flex-col items-center justify-center text-center space-y-2 border border-border/50">
              <span className="font-serif font-bold text-4xl text-primary">10+</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Years Of Craft</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="font-serif font-bold text-4xl lg:text-6xl text-foreground tracking-tight">
                Our Genesis
              </h2>
              <div className="h-1.5 w-24 bg-primary rounded-full"></div>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light italic">
              <p>
                "Thangam Magalir Thaiyalagam was founded with a singular vision: to bridge the gap between traditional South Indian heritage and economic independence for women."
              </p>
              <div className="h-px w-full bg-gradient-to-r from-border to-transparent"></div>
              <p className="not-italic">
                Our journey began with a simple belief: every woman deserves the opportunity to learn, create, and thrive. Through our comprehensive classes and professional stitching services, we've helped hundreds of women discover their creative potential.
              </p>
              <p className="not-italic">
                Today, we stand as a premier institution for tailoring, Aari Work, and Embroidery, combining ancestral techniques with the precision of modern couture.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#3c2a21] py-24 lg:py-32 rounded-[4rem] mx-4 lg:mx-8 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif font-bold text-4xl lg:text-6xl text-white mb-6 tracking-tight">
              Foundational Values
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light">
              The ethical principles that guide our atelier and academy every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-800/50 border-zinc-700/50 backdrop-blur-sm hover:bg-zinc-800 transition-all duration-500 rounded-[2rem] overflow-hidden group">
                    <CardContent className="p-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${value.bg} ${value.color} mb-8 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-serif font-bold text-2xl mb-4 text-white">
                        {value.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed font-light">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-bold text-3xl">Our Mission</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                To empower women through skill development in traditional crafts, providing them with opportunities for economic independence and creative expression while preserving our cultural heritage.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-serif font-bold text-3xl">Our Vision</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                To become the leading institution for traditional craft education and custom tailoring services, recognized for excellence, innovation, and our commitment to women's empowerment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="rounded-[3rem] bg-zinc-950 p-12 lg:p-20 shadow-2xl border border-zinc-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            {[
              { value: '200+', label: 'Artisans Trained' },
              { value: '3', label: 'Couture Courses' },
              { value: '1000+', label: 'Orders Delivered' },
              { value: '10+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2 lg:border-r border-zinc-800 last:border-0 px-4">
                <p className="font-serif font-bold text-5xl lg:text-6xl bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-zinc-500 uppercase text-[10px] font-bold tracking-[0.3em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


