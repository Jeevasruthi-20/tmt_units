import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';
import { Sparkles } from 'lucide-react';

export default function BlouseMeasurementPage() {
  const measurements = [
    { name: 'Blouse Back Length', instruction: 'Measure from the top of the shoulder down to the desired back length.' },
    { name: 'Full Shoulder', instruction: 'Measure from one shoulder point to the other across the back.' },
    { name: 'Shoulder Strap', instruction: 'Measure the width of the shoulder strap from neck end to shoulder end.' },
    { name: 'Back Neck Depth', instruction: 'Measure from the shoulder point straight down to the desired back neck depth.' },
    { name: 'Front Neck Depth', instruction: 'Measure from the shoulder point straight down to the desired front neck depth.' },
    { name: 'Shoulder to Apex', instruction: 'Measure from the shoulder point down to the nipple point (apex).' },
    { name: 'Front Length', instruction: 'Measure from the shoulder point down to the desired front length.' },
    { name: 'Chest (Around)', instruction: 'Measure around the fullest part of the chest.' },
    { name: 'Waist (Around)', instruction: 'Measure around the waist where the blouse ends.' },
    { name: 'Sleeve Length', instruction: 'Measure from the shoulder point down to the desired sleeve end.' },
    { name: 'Arm Round', instruction: 'Measure the circumference of the upper arm.' },
    { name: 'Sleeve Round', instruction: 'Measure the circumference of the arm at the sleeve end.' },
    { name: 'Arm Hole', instruction: 'Measure the circumference of the armhole.' },
  ];

  const formFields = [
    { name: 'backLength', label: 'Blouse Back Length', required: true },
    { name: 'fullShoulder', label: 'Full Shoulder', required: true },
    { name: 'shoulderStrap', label: 'Shoulder Strap', required: true },
    { name: 'backNeckDepth', label: 'Back Neck Depth', required: true },
    { name: 'frontNeckDepth', label: 'Front Neck Depth', required: true },
    { name: 'shoulderToApex', label: 'Shoulder to Apex', required: true },
    { name: 'frontLength', label: 'Front Length', required: true },
    { name: 'chestAround', label: 'Chest (Around)', required: true },
    { name: 'waistAround', label: 'Waist (Around)', required: true },
    { name: 'sleeveLength', label: 'Sleeve Length', required: true },
    { name: 'armRound', label: 'Arm Round', required: true },
    { name: 'sleeveRound', label: 'Sleeve Round', required: true },
    { name: 'armHole', label: 'Arm Hole', required: true },
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
                Artisanal Stitching
              </div>
              <h1 className="font-serif font-bold text-4xl lg:text-6xl text-foreground mb-6 leading-tight">
                Blouse <span className="text-secondary italic">Excellence</span>
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
                A perfectly fitted blouse is the foundation of grace. Provide your dimensions
                using our curated guide for a tailored experience like no other.
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
            <div className="glass-card rounded-[2rem] p-2 lg:p-4 overflow-hidden group bg-white shadow-xl border border-[#3c2a21]/10">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <img
                  src="/images/measurement-blouse.jpg"
                  alt="Saree Blouse Measurement Guide"
                  className="w-full h-full object-contain bg-white hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-white font-serif italic text-lg shadow-text">Bespoke Blouse Protocol</span>
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
            <div className="glass-card rounded-[2.5rem] p-8 lg:p-10 border-t-4 border-t-secondary shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="font-serif font-bold text-2xl mb-2">Order Submission</h3>
                <p className="text-muted-foreground mb-8">Share your unique profile to begin the transformation process.</p>
                <MeasurementForm garmentType="Blouse" fields={formFields} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


