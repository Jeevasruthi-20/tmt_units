import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';

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

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <Link to="/stitching">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Skirts Measurements
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your perfect skirt with accurate measurements and our expert guidance
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Measurement Guide */}
          <div>
            <h2 className="font-serif font-bold text-2xl text-foreground mb-6">
              How to Measure
            </h2>
            <img
              src="/images/measurement.jpg"
              alt="Chudi measurement guide"
              className="rounded-lg mb-6 w-full object-cover shadow-md"
            />
            <MeasurementGuide measurements={measurements} />
          </div>

          {/* Measurement Form */}
          <div>
            <h2 className="font-serif font-bold text-2xl text-foreground mb-6">
              Submit Your Measurements
            </h2>
            <div className="bg-white rounded-xl shadow-lg border p-6 lg:p-8 sticky top-24">
              <MeasurementForm garmentType="Skirts" fields={formFields} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

