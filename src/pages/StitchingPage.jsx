import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Ruler, Scissors, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function StitchingPage() {
  const services = [
    {
      title: 'Chudi',
      description: 'Traditional and contemporary chudi designs with perfect measurements',
      image: '/images/chudi.jpg',
      path: '/stitching/chudi',
      measurements: ['Bust', 'Waist', 'Hip', 'Length', 'Shoulder', 'Sleeve'],
      accent: 'border-primary/20'
    },
    {
      title: 'Pants',
      description: 'Custom-fitted pants and trousers for perfect comfort',
      image: '/images/pants.jpg',
      path: '/stitching/pants',
      measurements: ['Waist', 'Hip', 'Inseam', 'Outseam', 'Thigh', 'Bottom'],
      accent: 'border-secondary/20'
    },
    {
      title: 'Saree Blouse',
      description: 'Sophisticated custom-made blouses to complement your finest drapes',
      image: '/images/blouse.jpg',
      path: '/stitching/blouse',
      measurements: ['Back Length', 'Full Shoulder', 'Chest', 'Waist', 'Apex', 'Arm Hole'],
      accent: 'border-accent/20'
    },
    {
      title: 'Skirts',
      description: 'Stylish skirts crafted with precision measurements',
      image: '/images/skirts.jpg',
      path: '/stitching/skirts',
      measurements: ['Waist', 'Hip', 'Length', 'Thigh', 'Bottom Width'],
      accent: 'border-primary/20'
    },
    {
      title: 'Traditional Top & Skirt',
      description: 'Classic festive set with tailored top and flowing skirt',
      image: '/images/traditional-top-skirt.jpg',
      path: '/stitching/traditional-top-skirt',
      measurements: ['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Top Length', 'Skirt Length'],
      accent: 'border-secondary/20'
    },
    {
      title: 'Lehenga',
      description: 'Elegant lehengas with intricate detailing and perfect fit',
      image: '/images/lehenga.jpg',
      path: '/stitching/lehenga',
      measurements: ['Bust', 'Waist', 'Hip', 'Blouse Length', 'Sleeve', 'Lehenga Length', 'Dupatta Length'],
      accent: 'border-accent/20'
    },
    {
      title: 'Frock',
      description: 'Graceful frocks with flared silhouettes and detailed yokes',
      image: '/images/frock.jpg',
      path: '/stitching/frock',
      measurements: ['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Frock Length'],
      accent: 'border-primary/20'
    },
    {
      title: 'Anarkali',
      description: 'Classic Anarkali suits with elegant flares and intricate designs',
      image: '/images/anarkali.jpg',
      path: '/stitching/anarkali',
      measurements: ['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Anarkali Length'],
      accent: 'border-secondary/20'
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
    <div className="min-h-screen bg-background pb-20">
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
              <Scissors className="h-3.5 w-3.5" />
              Custom Tailoring Atelier
            </div>
            <h1 className="font-serif font-bold text-6xl lg:text-8xl text-foreground mb-8 leading-tight tracking-tight">
              Bespoke <span className="text-primary italic">Stitching</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              Experience the luxury of garments crafted specifically for your silhouette. Our expert artisans combine traditional techniques with modern precision.
            </p>
          </motion.div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20 mb-32">
          {[
            {
              step: '01',
              title: 'Curation',
              description: 'Select your preferred garment silhouette from our curated collection.',
              icon: Sparkles
            },
            {
              step: '02',
              title: 'Precision',
              description: 'Provide your detailed measurements following our anatomical guides.',
              icon: Ruler
            },
            {
              step: '03',
              title: 'Creation',
              description: "Our master tailors initiate the drafting and construction process.",
              icon: Scissors
            },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="text-[8rem] font-serif font-bold text-muted/20 absolute -top-12 -left-4 select-none">
                {item.step}
              </div>
              <div className="relative pt-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-border/50">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="font-serif font-bold text-2xl tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="space-y-12 mb-16">
          <div className="flex items-center gap-6">
            <h2 className="font-serif font-bold text-4xl text-foreground whitespace-nowrap">Service Menu</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                transition={{ delay: index * 0.1 }}
              >
                <Link to={service.path} className="group block h-full">
                  <Card className="h-full border-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 rounded-[2rem] overflow-hidden bg-white/50 backdrop-blur-sm group-hover:-translate-y-2">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-primary text-[10px] font-bold uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded-full">Artisan Choice</span>
                        </div>
                        <h3 className="font-serif font-bold text-3xl text-white tracking-tight drop-shadow-lg">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 line-clamp-2 italic">
                        "{service.description}"
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                          <Ruler className="h-3 w-3" />
                          Measurement Dossier
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {service.measurements.slice(0, 4).map((m, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg bg-muted text-[10px] font-medium border border-border/50">
                              {m}
                            </span>
                          ))}
                          {service.measurements.length > 4 && (
                            <span className="px-2.5 py-1 rounded-lg bg-muted text-[10px] font-medium border border-border/50">
                              +{service.measurements.length - 4} More
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between group-hover:text-primary transition-colors">
                        <span className="text-sm font-bold uppercase tracking-widest">Select Style</span>
                        <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Thangam Promise Section */}
      <section className="py-24 bg-[#3c2a21] text-white rounded-[4rem] mx-4 lg:mx-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-30"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Our Commitment</span>
                <h2 className="font-serif font-bold text-5xl lg:text-7xl leading-tight">The Thangam <br/><span className="text-primary italic">Atelier Promise</span></h2>
              </div>
              
              <div className="grid gap-8">
                {[
                  { title: 'Anatomical Precision', desc: 'Every pattern is drafted from scratch based on your unique body metrics.' },
                  { title: 'Artisan Construction', desc: 'Each garment is stitched by senior master tailors with a focus on interior finishing.' },
                  { title: 'Timeless Quality', desc: 'We select only the finest threads and reinforcements to ensure longevity.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative p-12 lg:p-20 rounded-[3rem] bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50"
            >
              <div className="space-y-8">
                <h3 className="font-serif font-bold text-4xl italic mb-6 text-primary">"Fashion fades, but a perfect fit is immortal."</h3>
                <div className="h-px w-full bg-gradient-to-r from-zinc-700 to-transparent"></div>
                <div className="flex gap-12">
                    <div>
                        <p className="text-4xl font-serif font-bold text-white mb-2">100%</p>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Fit Satisfaction</p>
                    </div>
                    <div>
                        <p className="text-4xl font-serif font-bold text-white mb-2">48h</p>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Rapid Response</p>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bespoke Excellence Section */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-[3rem] overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1558273109-60437a718744?q=80&w=2070" 
                 alt="Bespoke Tailoring" 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-10 left-10">
                 <p className="text-white font-serif font-bold text-3xl">The Human Touch</p>
               </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
               <h2 className="font-serif font-bold text-4xl lg:text-5xl text-zinc-900">Bespoke vs <span className="text-primary">Readymade</span></h2>
               <div className="h-1.5 w-24 bg-primary rounded-full"></div>
               <p className="text-zinc-500 text-lg leading-relaxed font-light">
                 Readymade garments are built for the average. At Thangam, we believe nobody is average. Our bespoke service offers:
               </p>
               <ul className="grid gap-6">
                 {[
                   'Zero-compromise silhouette matching',
                   'Premium reinforcement at stress points',
                   'Customized seam allowances for future adjustments',
                   'Ethically handcrafted in our local atelier'
                 ].map((item, i) => (
                   <li key={i} className="flex gap-4 items-center text-zinc-700">
                     <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                       <ArrowRight className="h-3 w-3" />
                     </div>
                     <span className="font-medium">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer Call to Action */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900 text-white p-12 lg:p-20 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?q=80&w=2070')] opacity-20 bg-cover bg-center grayscale"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif font-bold text-4xl lg:text-5xl tracking-tight">Need a Custom Design?</h2>
            <p className="text-zinc-400 text-lg font-light italic">
              "We believe every garment should be as unique as the person wearing it. If you have a specific vision, our master tailors are here to bring it to life."
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-16 px-12 text-lg rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
                Consult With A Master Tailor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


