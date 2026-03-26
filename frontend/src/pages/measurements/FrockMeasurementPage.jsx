import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';
import { Sparkles, Heart } from 'lucide-react';

export default function FrockMeasurementPage() {
  const measurements = [
    {
      name: 'Across Shoulder',
      instruction: 'Measure from one shoulder point to the other across the back.',
    },
    {
      name: 'Sleeve Length',
      instruction: 'Measure from the shoulder point to the desired sleeve end.',
    },
    {
      name: 'Chest',
      instruction: 'Measure around the fullest part of the chest.',
    },
    {
      name: 'Waist',
      instruction: 'Measure around the waistline where the bodice meets the skirt.',
    },
    {
      name: 'Length',
      instruction: 'Measure from the shoulder point straight down to the desired frock length.',
    },
  ];

  const formFields = [
    { name: 'acrossShoulder', label: 'Across Shoulder', required: true },
    { name: 'sleeveLength', label: 'Sleeve Length', required: true },
    { name: 'chest', label: 'Chest', required: true },
    { name: 'waist', label: 'Waist', required: true },
    { name: 'length', label: 'Length', required: true },
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp}>
            <Breadcrumbs />
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                <Heart className="h-3.5 w-3.5 fill-primary/20" />
                Timeless Elegance
              </div>
              <h1 className="font-serif font-bold text-5xl lg:text-7xl mb-8 leading-tight tracking-tight">
                Frock <span className="text-primary italic">Charm</span>
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl font-light">
                A frock is the embodiment of playful sophistication. Capture your unique form 
                with precision to ensure a fit that is as comfortable as it is beautiful.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10"></div>
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
            <div className="relative group">
            <div className="glass-card rounded-[2rem] p-2 lg:p-4 overflow-hidden group bg-white shadow-xl border border-[#3c2a21]/10">
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
                <img
                  src="/images/measurement-frock.jpg"
                  alt="Frock Measurement Protocol"
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3c2a21]/80 to-transparent p-6">
                  <span className="text-white font-serif italic text-lg shadow-text">Measurement Protocol Guide</span>
                </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <h2 className="font-serif font-bold text-4xl text-foreground whitespace-nowrap">Measurement Dossier</h2>
                <div className="h-px w-full bg-gradient-to-r from-border via-border/50 to-transparent"></div>
              </div>
              <div className="bg-muted/30 rounded-[2rem] p-4 lg:p-8 backdrop-blur-sm border border-white/20">
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
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-[3.5rem] blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative glass-card rounded-[3.5rem] p-8 lg:p-12 border-b-4 border-b-primary shadow-2xl bg-white/95 overflow-hidden">
                <div className="mb-12">
                  <h3 className="font-serif font-bold text-3xl mb-4">Submission Entry</h3>
                  <div className="w-12 h-1.5 bg-primary rounded-full mb-6"></div>
                  <p className="text-muted-foreground text-lg italic tracking-tight">Enter your precise details below to initiate the tailoring process.</p>
                </div>
                <div className="bg-transparent">
                  <MeasurementForm garmentType="Frock" fields={formFields} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


