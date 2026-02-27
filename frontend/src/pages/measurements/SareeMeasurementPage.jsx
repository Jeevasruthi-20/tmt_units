import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';

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
              Saree Measurements
            </h1>
            <p className="text-muted-foreground text-lg">
              Get perfectly fitted saree blouse with our detailed measurement guide
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
              <MeasurementForm garmentType="Saree" fields={formFields} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

