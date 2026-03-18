import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';
import { 
  Sparkles, 
  ArrowLeft, 
  Scissors, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PantsMeasurementPage() {
  const pantTypes = [
    {
      id: 'normal',
      label: 'Normal Pant',
      description: 'Classic everyday fit with gentle taper for comfortable movement.',
      image: '/images/normal-pant.jpg'
    },
    {
      id: 'straight',
      label: 'Straight Pant',
      description: 'Straight cut from hip to hem for a clean, tailored look.',
      image: '/images/straight-pant.jpg'
    },
    {
      id: 'palazoo',
      label: 'Palazoo Pant',
      description: 'Wide flared bottoms with relaxed fit, perfect for flowy silhouettes.',
      image: '/images/palazoo-pant.jpg'
    },
    {
      id: 'patiyala',
      label: 'Patiyala Pant',
      description: 'Traditional pleated style with extra room around the hips and thighs.',
      image: '/images/patiyala-pant.jpg'
    },
    {
      id: 'gathering',
      label: 'Gathering Pant',
      description: 'Gathered waist and hem creating a soft, voluminous drape.',
      image: '/images/gathering-pant.jpg'
    },
  ];

  const { pantType } = useParams();
  const selectedPant = pantTypes.find((type) => type.id === pantType) ?? pantTypes[0];

  const measurements = [
    {
      name: 'Waist',
      instruction: 'Measure around your natural waistline where you normally wear your pants. The tape should be snug but comfortable.',
    },
    {
      name: 'Hip',
      instruction: 'Measure around the fullest part of your hips and buttocks, keeping the tape parallel to the floor.',
    },
    {
      name: 'Pant Length',
      instruction: 'Measure from your waistline down the outside of your leg to your desired length.',
    },
  ];

  const formFields = [
    { name: 'waist', label: 'Waist', required: true },
    { name: 'hip', label: 'Hip', required: true },
    { name: 'pantLength', label: 'Pant Length', required: true },
  ];

  const activeGarmentType = selectedPant ? `${selectedPant.label}` : 'Pants';

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.8 }
        }
    };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <section className="relative pt-10 pb-10 lg:pt-12 lg:pb-12 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <Breadcrumbs />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                  <Scissors className="h-3.5 w-3.5" />
                  Bespoke Bottomwear
                </div>
                <h1 className="font-serif font-bold text-5xl lg:text-7xl mb-6 leading-tight tracking-tight">
                  {selectedPant.label} <span className="text-primary italic">Profile</span>
                </h1>
                <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl font-light">
                  {selectedPant.description} Precise measurements ensure the perfect break and drape.
                </p>
              </div>
              <Link to="/stitching/pants">
                <motion.div whileHover={{ x: -4 }} className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-white px-6 py-3 rounded-2xl shadow-sm border border-border/50 bg-white/50 backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4" />
                  Variation Gallery
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Visual Guide */}
          <motion.div 
            className="lg:col-span-12 xl:col-span-7 space-y-16"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative glass-card rounded-[3rem] p-6 lg:p-12 overflow-hidden bg-white/80 backdrop-blur-xl border-white/40 shadow-2xl">
                <Carousel className="w-full">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                        <img
                          src="/images/pants-measurement.jpg"
                          alt="Pants Measurement Protocol"
                          className="w-full h-full object-contain bg-muted/20 transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3c2a21]/80 to-transparent p-8">
                          <p className="text-white text-lg font-serif italic italic">Measurement Reference Protocol</p>
                        </div>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                        <img
                          src={selectedPant.image}
                          alt={selectedPant.label}
                          className="w-full h-full object-contain bg-muted/20 transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3c2a21]/80 to-transparent p-8">
                          <p className="text-white text-lg font-serif italic italic">{selectedPant.label} Aesthetic Study</p>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="-left-4 lg:-left-6 bg-white/90 hover:bg-primary hover:text-white transition-all shadow-xl border-none" />
                  <CarouselNext className="-right-4 lg:-right-6 bg-white/90 hover:bg-primary hover:text-white transition-all shadow-xl border-none" />
                </Carousel>
                <div className="flex justify-center gap-4 mt-8">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                    <Maximize2 className="h-4 w-4" />
                    Interactive Blueprint View
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <h2 className="font-serif font-bold text-4xl text-foreground">Anatomical Metrics</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <div className="bg-muted/30 rounded-[2.5rem] p-6 lg:p-10 backdrop-blur-sm border border-white/20">
                <MeasurementGuide measurements={measurements} />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Submission Form */}
          <motion.div 
            className="lg:col-span-12 xl:col-span-5 xl:sticky xl:top-24"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-[3.5rem] blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative glass-card rounded-[3.5rem] p-8 lg:p-14 border-t-8 border-t-[#3c2a21] shadow-2xl bg-white/95 overflow-hidden">
                <div className="mb-12">
                  <h3 className="font-serif font-bold text-3xl mb-4 tracking-tight">Final Profile Logic</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/30 rounded-full mb-8"></div>
                  <p className="text-muted-foreground text-lg italic leading-relaxed font-light">
                    Initiate your tailoring dossier. Accurate capture guarantees an impeccable silhouette.
                  </p>
                </div>
                <div className="bg-transparent">
                  <MeasurementForm garmentType={activeGarmentType} fields={formFields} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


