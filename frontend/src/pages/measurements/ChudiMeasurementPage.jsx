import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';

export default function ChudiMeasurementPage() {
  const measurements = [
    {
      name: 'Total Length',
      instruction: 'Measure from the highest point of shoulder (HSP) straight down to the desired length of the kurti.',
    },
    {
      name: 'Shoulder Length',
      instruction: 'Measure from one shoulder point to the other across the back.',
    },
    {
      name: 'Across Bust',
      instruction: 'Measure around the fullest part of the bust.',
    },
    {
      name: 'Across Waist',
      instruction: 'Measure around the natural waistline.',
    },
    {
      name: 'Across Hip',
      instruction: 'Measure around the fullest part of the hips.',
    },
    {
      name: 'Armhole',
      instruction: 'Measure the circumference of the armhole.',
    },
    {
      name: 'Sleeve Lengths',
      instruction: 'Measure from the shoulder point for 1/2, 3/4, or Full sleeve length as required.',
    },
    {
      name: 'Slit Length',
      instruction: 'Measure from the shoulder or waist down to where the side slit starts.',
    },
    {
      name: 'Bottom Width',
      instruction: 'Measure the width of the kurti at the bottom hem.',
    },
  ];

  const formFields = [
    { name: 'totalLength', label: 'Total Length (from HSP)', required: true },
    { name: 'shoulderLength', label: 'Shoulder Length', required: true },
    { name: 'acrossBust', label: 'Across Bust', required: true },
    { name: 'acrossWaist', label: 'Across Waist', required: true },
    { name: 'acrossHip', label: 'Across Hip', required: true },
    { name: 'armhole', label: 'Armhole', required: true },
    { name: 'sleeveLengthHalf', label: '1/2 Sleeve Length' },
    { name: 'sleeveLengthThreeFourth', label: '3/4 Sleeve Length' },
    { name: 'sleeveLengthFull', label: 'Full Sleeve Length' },
    { name: 'slitLength', label: 'Slit Length' },
    { name: 'bottomWidth', label: 'Bottom Width' },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <Link to="/stitching">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-2">
              Chudi Measurements
            </h1>
            <p className="text-muted-foreground text-lg">
              Follow our detailed measurement guide to ensure a perfect fit for your custom chudi
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Measurement Guide */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif font-bold text-2xl text-foreground mb-4">
                How to Measure
              </h2>
              <MeasurementGuide measurements={measurements} />
            </div>

            <div className="bg-white rounded-xl shadow-lg border p-6">
              <h3 className="font-serif font-semibold text-xl mb-4">Visual Guide</h3>
              <img
                src="/src/assets/guides/chudi_guide_hd.png"
                alt="Chudi Measurement Guide"
                className="w-full h-auto rounded-lg shadow-inner"
              />
            </div>
          </div>

          {/* Measurement Form */}
          <div>
            <h2 className="font-serif font-bold text-2xl text-foreground mb-4">
              Submit Your Measurements
            </h2>
            <div className="bg-white rounded-xl shadow-lg border p-6 lg:p-8 sticky top-24">
              <MeasurementForm garmentType="Chudi" fields={formFields} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

