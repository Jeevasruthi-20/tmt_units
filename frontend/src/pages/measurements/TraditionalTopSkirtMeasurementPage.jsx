import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';

export default function TraditionalTopSkirtMeasurementPage() {
  const measurements = [
    {
      name: 'Bust',
      instruction:
        'Measure around the fullest part of the bust, keeping the tape parallel to the floor. The tape should be snug but not tight.',
    },
    {
      name: 'Waist',
      instruction:
        'Measure around the natural waistline (the narrowest part of the torso). Keep one finger between the tape and body.',
    },
    {
      name: 'Hip',
      instruction:
        'Measure around the fullest part of the hips and buttocks, usually 7–9 inches below the waist, keeping the tape level.',
    },
    {
      name: 'Shoulder Width',
      instruction:
        'Measure from the edge of one shoulder to the edge of the other across the back.',
    },
    {
      name: 'Sleeve Length',
      instruction:
        'Measure from the shoulder point down to the desired sleeve end (above elbow, elbow or full length).',
    },
    {
      name: 'Top Length',
      instruction:
        'Measure from the shoulder point straight down to where you want the top to end.',
    },
    {
      name: 'Skirt Length',
      instruction:
        'Measure from the waistline down to where you want the skirt to end (calf, ankle or floor).',
    },
  ];

  const formFields = [
    { name: 'bust', label: 'Bust', required: true },
    { name: 'waist', label: 'Waist', required: true },
    { name: 'hip', label: 'Hip', required: true },
    { name: 'shoulder', label: 'Shoulder Width', required: true },
    { name: 'sleeveLength', label: 'Sleeve Length', required: true },
    { name: 'topLength', label: 'Top Length', required: true },
    { name: 'skirtLength', label: 'Skirt Length', required: true },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <Link to="/stitching">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Traditional Top &amp; Skirt Measurements
            </h1>
            <p className="text-muted-foreground text-lg">
              Provide accurate measurements for a comfortable traditional top and flowing skirt.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Measurement Guide */}
          <div>
            <h2 className="font-serif font-bold text-2xl text-foreground mb-6">
              How to Measure
            </h2>
            <img
              src="/images/measurement.jpg"
              alt="Measurement guide"
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
              <MeasurementForm garmentType="Traditional Top & Skirt" fields={formFields} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

