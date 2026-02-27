import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';

export default function BlouseMeasurementPage() {
  const measurements = [
    {
      name: 'Bust',
      instruction: 'Measure around the fullest part of your bust, keeping the tape parallel to the floor and not too tight.',
    },
    {
      name: 'Waist',
      instruction: 'Measure around your natural waistline. This helps determine the blouse length and fit.',
    },
    {
      name: 'Shoulder Width',
      instruction: 'Measure from one shoulder edge to the other across your back for proper shoulder fit.',
    },
    {
      name: 'Sleeve Length',
      instruction: 'Measure from the shoulder point to where you want the sleeve to end (wrist, elbow, or short sleeve).',
    },
    {
      name: 'Blouse Length',
      instruction: 'Measure from the shoulder down to where you want the blouse to end at your waist or hip.',
    },
    {
      name: 'Armhole',
      instruction: 'Measure around your armhole from the shoulder point, under the arm, and back to the shoulder.',
    },
  ];

  const formFields = [
    { name: 'bust', label: 'Bust', required: true },
    { name: 'waist', label: 'Waist', required: true },
    { name: 'shoulder', label: 'Shoulder Width', required: true },
    { name: 'sleeveLength', label: 'Sleeve Length', required: true },
    { name: 'blouseLength', label: 'Blouse Length', required: true },
    { name: 'armhole', label: 'Armhole', required: true },
    { name: 'frontNeck', label: 'Front Neck Depth' },
    { name: 'backNeck', label: 'Back Neck Depth' },
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
              Blouse Measurements
            </h1>
            <p className="text-muted-foreground text-lg">
              Achieve a perfect blouse fit with our detailed measurement instructions
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
              alt="Blouse measurement guide"
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
              <MeasurementForm garmentType="Blouse" fields={formFields} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

