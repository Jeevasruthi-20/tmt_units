import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';
import { Sparkles, Layers } from 'lucide-react';

export default function SkirtsMeasurementPage() {
  const measurements = [
    {
      name: 'Waist',
      instruction: 'Measure around your natural waistline where you want the skirt to sit. Keep the tape snug but comfortable.',
    },
    {
      name: 'Hip',
      instruction: 'Measure around the fullest part of your hips and buttocks, typically 7-9 inches below your waist. Stand straight and wrap the measuring tape around the widest part of your hips, ensuring the tape is parallel to the floor and goes around the fullest part of your buttocks.',
    },
    {
      name: 'Skirt Length',
      instruction: 'Measure from your waistline down to where you want the skirt to end (knee, midi, ankle, or floor length).',
    },
    {
      name: 'Thigh',
      instruction: 'For fitted skirts, measure around the fullest part of your thigh, about 2-3 inches below the hip.',
    },
    {
      name: 'Bottom Width',
      instruction: 'For A-line or flared skirts, this determines how wide the skirt will be at the bottom hem.',
    },
  ];

  const formFields = [
    { name: 'waist', label: 'Waist', required: true },
    { name: 'hip', label: 'Hip', required: true },
    { name: 'skirtLength', label: 'Skirt Length', required: true },
    { name: 'thigh', label: 'Thigh' },
    { name: 'knee', label: 'Knee (if applicable)' },
    { name: 'bottomWidth', label: 'Bottom Width' },
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/30 via-secondary to-secondary/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp}>
            <Breadcrumbs />
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-6 border border-secondary/20">
                <Layers className="h-4 w-4" />
                Tailored Dimensions
              </div>
              <h1 className="font-serif font-bold text-5xl lg:text-7xl mb-8 leading-tight tracking-tight">
                Skirts <span className="text-secondary italic">Volume</span>
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl font-light">
                Whether A-line or midi, the perfect skirt begins with impeccable metrics. 
                Follow our visual guide to ensure a silhouette that flows with grace.
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
            <div className="grid grid-cols-2 gap-6 group">
              <div className="glass-card rounded-[2rem] p-4 overflow-hidden bg-white/40 backdrop-blur-xl border-white/40 shadow-xl transition-all duration-500">
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
                  <img
                    src="/images/skirt-measurement.jpg"
                    alt="Skirt Measurement Guide"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3c2a21]/60 via-transparent to-transparent opacity-100 p-4">
                    <p className="text-white text-xs font-serif italic">Protocol</p>
                  </div>
                </div>
              </div>
              <div className="glass-card rounded-[2rem] p-4 overflow-hidden bg-white/40 backdrop-blur-xl border-white/40 shadow-xl transition-all duration-500">
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
                  <img
                    src="/images/skirts.jpg"
                    alt="Skirt Design"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3c2a21]/60 via-transparent to-transparent opacity-100 p-4">
                    <p className="text-white text-xs font-serif italic">Aesthetic</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <h2 className="font-serif font-bold text-4xl text-foreground whitespace-nowrap">Measurement Specification</h2>
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
              <div className="absolute -inset-1 bg-gradient-to-br from-secondary/30 via-primary/10 to-transparent rounded-[3.5rem] blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative glass-card rounded-[3.5rem] p-8 lg:p-12 border-b-4 border-b-[#3c2a21] shadow-2xl bg-white/95 overflow-hidden">
                <div className="mb-12">
                  <h3 className="font-serif font-bold text-3xl mb-4">Precision Metric Entry</h3>
                  <div className="w-16 h-1 bg-secondary rounded-full mb-6"></div>
                  <p className="text-muted-foreground text-lg leading-relaxed font-light">Enter your specific metrics to begin the creation of your tailored skirt.</p>
                </div>
                <div className="bg-transparent">
                  <MeasurementForm garmentType="Skirts" fields={formFields} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


