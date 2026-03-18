import { motion } from 'framer-motion';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';
import { Sparkles, Scissors } from 'lucide-react';

export default function SareeMeasurementPage() {
  const measurements = [
    {
      name: 'Bust',
      instruction: 'Measure around the fullest part of your bust, keeping the tape parallel to the floor. The tape should be snug but not tight.',
    },
    {
      name: 'Waist',
      instruction: 'Measure around your natural waistline (the narrowest part of your torso, usually above your belly button). Keep one finger between the tape and your body.',
    },
    {
      name: 'Hip',
      instruction: 'Measure around the fullest part of your hips and buttocks, usually about 7-9 inches below your waist. Keep the tape parallel to the floor.',
    },
    {
      name: 'Shoulder Width',
      instruction: 'Measure from the edge of one shoulder to the edge of the other shoulder across your back.',
    },
    {
      name: 'Sleeve Length',
      instruction: 'Measure from the shoulder point down to your wrist bone with your arm slightly bent.',
    },
    {
      name: 'Blouse Length',
      instruction: 'Measure from the shoulder down to where you want the blouse to end at your waist or hip.',
    },
  ];

  const formFields = [
    { name: 'bust', label: 'Bust', required: true },
    { name: 'waist', label: 'Waist', required: true },
    { name: 'hip', label: 'Hip', required: true },
    { name: 'shoulder', label: 'Shoulder Width', required: true },
    { name: 'sleeveLength', label: 'Sleeve Length', required: true },
    { name: 'blouseLength', label: 'Blouse Length', required: true },
    { name: 'armhole', label: 'Armhole' },
    { name: 'frontNeck', label: 'Front Neck Depth' },
    { name: 'backNeck', label: 'Back Neck Depth' },
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
      <section className="relative pt-10 pb-10 lg:pt-12 lg:pb-12 bg-muted/30 overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeInUp}>
            <Breadcrumbs />
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                <Scissors className="h-4 w-4" />
                Artisanal Blouse Tailoring
              </div>
              <h1 className="font-serif font-bold text-5xl lg:text-7xl mb-8 leading-tight tracking-tight">
                Saree <span className="text-primary italic">Sophistication</span>
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto font-light italic">
                A Saree blouse is the defining element of the drape. Capture your silhouette with 
                utmost precision to ensure an impeccable fit and unparalleled comfort.
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
            <div className="glass-card rounded-[2rem] p-2 lg:p-4 overflow-hidden group bg-white shadow-xl border border-[#3c2a21]/10 text-zinc-900 font-serif">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <img
                  src="/images/blouse.jpg"
                  alt="Saree Blouse Silhouette"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3c2a21]/80 to-transparent p-6">
                  <span className="text-white font-serif italic text-lg shadow-text">Stylized Draping Protocol</span>
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
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-[3.5rem] blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative glass-card rounded-[3.5rem] p-8 lg:p-12 border-t-4 border-t-primary shadow-2xl bg-white/95 overflow-hidden">
                <div className="mb-12">
                  <h3 className="font-serif font-bold text-3xl mb-4">Final Submission</h3>
                  <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
                  <p className="text-muted-foreground text-lg leading-relaxed font-light">Enter your specific metrics to begin the creation of your bespoke blouse.</p>
                </div>
                <div className="bg-transparent">
                  <MeasurementForm garmentType="Saree" fields={formFields} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


