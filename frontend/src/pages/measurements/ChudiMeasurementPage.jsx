import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';
import { Sparkles } from 'lucide-react';

export default function ChudiMeasurementPage() {
  const measurements = [
    { name: 'Shoulder', instruction: 'Measure from one shoulder point to the other across the back.' },
    { name: 'Elbow Length', instruction: 'Measure from the shoulder point down to the elbow.' },
    { name: 'Bust', instruction: 'Measure around the fullest part of the bust.' },
    { name: 'Waist', instruction: 'Measure around the natural waistline.' },
    { name: 'Neck', instruction: 'Measure around the base of the neck or desired neck depth.' },
    { name: 'Hip', instruction: 'Measure around the fullest part of the hips.' },
    { name: 'Top Height', instruction: 'Measure from the highest point of shoulder straight down to the desired length.' },
    { name: 'Pant Waist', instruction: 'Measure around the waistline where you normally wear your pants.' },
    { name: 'Pant Hip', instruction: 'Measure around the fullest part of your hips for the pants.' },
    { name: 'Pant Length', instruction: 'Measure from the waistline down to the desired pant end.' },
  ];

  const formFields = [
    { name: 'shoulder', label: 'Shoulder', required: true },
    { name: 'elbowLength', label: 'Elbow Length', required: true },
    { name: 'bust', label: 'Bust', required: true },
    { name: 'waist', label: 'Waist', required: true },
    { name: 'neck', label: 'Neck', required: true },
    { name: 'hip', label: 'Hip', required: true },
    { name: 'topHeight', label: 'Top Height', required: true },
    { name: 'pantWaist', label: 'Pant Waist', required: true },
    { name: 'pantHip', label: 'Pant Hip', required: true },
    { name: 'pantLength', label: 'Pant Length', required: true },
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
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative pt-10 pb-10 lg:pt-12 lg:pb-12 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp}>
            <Breadcrumbs />
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20 animate-pulse">
                <Sparkles className="h-3 w-3" />
                Custom Tailoring
              </div>
              <h1 className="font-serif font-bold text-4xl lg:text-6xl text-foreground mb-6 leading-tight">
                Chudi <span className="text-primary italic">Measurement</span> Guide
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
                Precision is the hallmark of prestige. Follow our refined guide to capture 
                measurements that ensure a silhouette of absolute perfection.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual & Step-by-Step */}
          <motion.div 
            className="lg:col-span-7 space-y-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-[2rem] p-2 lg:p-4 overflow-hidden group bg-white shadow-xl border border-zinc-100 italic font-serif">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <img
                  src="/images/chudi-measurement.jpg"
                  alt="Chudi Measurement Protocol"
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3c2a21]/80 to-transparent p-6">
                  <span className="text-white font-serif italic text-lg shadow-text">Measurement Protocol Guide</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="font-serif font-bold text-3xl text-foreground">Detailed Instructions</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <MeasurementGuide measurements={measurements} />
            </div>
          </motion.div>

          {/* Right Column: Submission Form */}
          <motion.div 
            className="lg:col-span-5 sticky top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card rounded-[2.5rem] p-8 lg:p-10 border-t-4 border-t-primary shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="font-serif font-bold text-2xl mb-2">Finalize Your Order</h3>
                <p className="text-muted-foreground mb-8">Enter your precise metrics below to proceed with the bespoke creation.</p>
                <MeasurementForm garmentType="Chudi" fields={formFields} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


