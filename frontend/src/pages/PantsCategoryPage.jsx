import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const pantTypes = [
  {
    id: 'normal',
    label: 'Normal Pant',
    description: 'Classic everyday fit with gentle taper for comfortable movement.',
  },
  {
    id: 'straight',
    label: 'Straight Pant',
    description: 'Straight cut from hip to hem for a clean, tailored look.',
  },
  {
    id: 'palazoo',
    label: 'Palazoo Pant',
    description: 'Wide flared bottoms with relaxed fit, perfect for flowy silhouettes.',
  },
  {
    id: 'patiyala',
    label: 'Patiyala Pant',
    description: 'Traditional pleated style with extra room around the hips and thighs.',
  },
  {
    id: 'gathering',
    label: 'Gathering Pant',
    description: 'Gathered waist and hem creating a soft, voluminous drape.',
  },
];

export default function PantsCategoryPage() {
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
      {/* Header with breadcrumb */}
      <section className="relative pt-14 pb-12 lg:pt-16 lg:pb-14 bg-muted/30 overflow-hidden border-b border-border/40">
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl">
            <Breadcrumbs />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                <Scissors className="h-3.5 w-3.5" />
                Tailoring Selection
              </div>
              <h1 className="font-serif font-bold text-5xl lg:text-7xl text-foreground tracking-tight">
                Pants <span className="text-primary italic">Gallery</span>
              </h1>
              <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                Choose your preferred silhouette. Each style is meticulously crafted to ensure a perfect balance of comfort and elegance.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* Pant type grid */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-3xl text-foreground tracking-tight">Available Silhouettes</h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            <Link to="/stitching">
              <Button variant="ghost" size="sm" className="hover:bg-primary/5 hover:text-primary transition-all rounded-xl">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Stitching
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {pantTypes.map((type, index) => (
              <motion.div
                key={type.id}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/stitching/pants/${type.id}`} className="group block h-full">
                  <div className="h-full rounded-[2.5rem] border border-border/70 bg-white p-6 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] hover:border-primary/30">
                    <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-[2rem] border bg-muted/20">
                      <img
                        src="/images/pants.jpg"
                        alt={`${type.label} illustration`}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <div className="space-y-4 px-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-2xl text-foreground group-hover:text-primary transition-colors tracking-tight">
                          {type.label}
                        </h3>
                        <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-[-45deg]">
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-light italic">
                        "{type.description}"
                      </p>
                      
                      <div className="pt-4 flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">View Details</span>
                        <div className="h-px flex-1 bg-primary/20"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Helper Note */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto rounded-3xl bg-primary/5 p-8 lg:p-12 border border-primary/10 text-center">
          <p className="text-muted-foreground font-light text-lg">
            "Each silhouette is optimized for different fabric weights and drape. Not sure which one to pick? 
            <Link to="/contact" className="text-primary font-bold hover:underline ml-1">Consult with us</Link> for professional styling advice."
          </p>
        </div>
      </section>
    </div>
  );
}


