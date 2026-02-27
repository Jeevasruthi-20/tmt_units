import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';

export default function LehengaMeasurementPage() {
  const measurements = [
    {
      name: 'Bust',
      instruction:
        'Measure around the fullest part of the bust, keeping the tape parallel to the floor. The tape should be snug but not tight.',
    },
    {
      name: 'Waist',
      instruction:
        'Measure around the natural waistline where the lehenga waistband will sit.',
    },
    {
      name: 'Hip',
      instruction:
        'Measure around the fullest part of the hips and buttocks, usually 7–9 inches below the waist, keeping the tape level.',
    },
    {
      name: 'Shoulder Width',
      instruction:
        'Measure from one shoulder edge to the other across the back for correct blouse fit.',
    },
    {
      name: 'Sleeve Length',
      instruction:
        'Measure from the shoulder point to where you want the sleeve to end (elbow, three‑quarter, or full length).',
    },
    {
      name: 'Blouse Length',
      instruction:
        'Measure from the shoulder down to where you want the lehenga blouse to end.',
    },
    {
      name: 'Lehenga Length',
      instruction:
        'Measure from the waistline down to the desired length (ankle or floor), preferably with the footwear you will wear.',
    },
    {
      name: 'Dupatta Length',
      instruction:
        'Measure from one shoulder across the body to where you want the dupatta to end, or use an existing dupatta you like.',
    },
  ];

  const formFields = [
    { name: 'bust', label: 'Bust', required: true },
    { name: 'waist', label: 'Waist', required: true },
    { name: 'hip', label: 'Hip', required: true },
    { name: 'shoulder', label: 'Shoulder Width', required: true },
    { name: 'sleeveLength', label: 'Sleeve Length', required: true },
    { name: 'blouseLength', label: 'Blouse Length', required: true },
    { name: 'lehengaLength', label: 'Lehenga Length', required: true },
    { name: 'dupattaLength', label: 'Dupatta Length' },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Link to="/stitching">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Lehenga Measurements
            </h1>
            <p className="text-muted-foreground text-lg">
              Share your detailed measurements for a perfectly fitted lehenga, blouse and dupatta.
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
              alt="Lehenga measurement guide"
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
              <MeasurementForm garmentType="Lehenga" fields={formFields} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

