import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';
import { Star } from 'lucide-react';

export default function TraditionalTopSkirtMeasurementPage() {
  const measurements = [
    {
      name: 'Shoulder Size',
      instruction: 'Measure from one shoulder point to the other across the back.',
    },
    {
      name: 'Top Height',
      instruction: 'Measure from the highest point of shoulder straight down to where the top should end.',
    },
    {
      name: 'Chest Size',
      instruction: 'Measure around the fullest part of the chest, keeping the tape parallel to the floor.',
    },
    {
      name: 'Hip Size',
      instruction: 'Measure around the fullest part of the hips.',
    },
    {
      name: 'Skirt Height',
      instruction: 'Measure from the waistline down to the desired skirt length.',
    },
  ];

  const formFields = [
    { name: 'shoulderSize', label: 'Shoulder Size', required: true },
    { name: 'topHeight', label: 'Top Height', required: true },
    { name: 'chestSize', label: 'Chest Size', required: true },
    { name: 'hipSize', label: 'Hip Size', required: true },
    { name: 'skirtHeight', label: 'Skirt Height', required: true },
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <section className="relative pt-10 pb-10 lg:pt-12 lg:pb-12 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp}>
            <Breadcrumbs />
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent-foreground text-xs font-bold uppercase tracking-widest mb-6 border border-accent/20">
                <Star className="h-4 w-4 fill-accent/20" />
                Heritage Ensemble
              </div>
              <h1 className="font-serif font-bold text-5xl lg:text-7xl mb-8 leading-tight tracking-tight">
                Traditional <span className="text-accent italic">Harmony</span>
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl font-light italic">
                The synergy between top and skirt defines traditional elegance. Capture your dimensions 
                using our specialized guide for a cohesive and impeccable ensemble.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Visual & Step-by-Step */}
          <motion.div 
            className="lg:col-span-7 space-y-16"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="glass-card rounded-[2rem] p-2 lg:p-4 overflow-hidden group bg-white shadow-xl border border-[#3c2a21]/10">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <img
                  src="/images/measurements-trad.jpg"
                  alt="Traditional Measurement Protocol"
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3c2a21]/80 to-transparent p-6">
                  <span className="text-white font-serif italic text-lg shadow-text">Measurement Protocol Guide</span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <h2 className="font-serif font-bold text-4xl text-foreground whitespace-nowrap">Unified Specifications</h2>
                <div className="h-px w-full bg-gradient-to-r from-border via-border/50 to-transparent"></div>
              </div>
              <div className="bg-muted/30 rounded-[2.5rem] p-4 lg:p-10 backdrop-blur-sm border border-white/10">
                <MeasurementGuide measurements={measurements} />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Submission Form */}
          <motion.div 
            className="lg:col-span-5 lg:sticky lg:top-24"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 via-primary/10 to-transparent rounded-[3.5rem] blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative glass-card rounded-[3.5rem] p-8 lg:p-12 border-l-4 border-l-accent shadow-2xl bg-white/95 overflow-hidden">
                <div className="mb-12">
                  <h3 className="font-serif font-bold text-3xl mb-4">Precision Metric Entry</h3>
                  <div className="w-16 h-1 bg-accent rounded-full mb-6"></div>
                  <p className="text-muted-foreground text-lg leading-relaxed font-light">Enter your specific metrics to begin the creation of your tailored traditional attire.</p>
                </div>
                <div className="bg-transparent">
                  <MeasurementForm garmentType="Traditional Top & Skirt" fields={formFields} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


