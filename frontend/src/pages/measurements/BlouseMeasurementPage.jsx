import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';

export default function BlouseMeasurementPage() {
  const measurements = [
    { name: 'Around Bust', instruction: 'Measure around the fullest part of your bust.' },
    { name: 'Below Bust', instruction: 'Measure around your ribcage directly under your bust.' },
    { name: 'Shoulder', instruction: 'Measure from one shoulder point to the other across your back.' },
    { name: 'Short Sleeve Length', instruction: 'Measure from the shoulder point to your desired short sleeve end.' },
    { name: 'Long Sleeve Length', instruction: 'Measure from the shoulder point to your wrist for long sleeves.' },
    { name: 'Short Sleeve Round', instruction: 'Measure the circumference of your arm at the short sleeve end.' },
    { name: 'Long Sleeve Round', instruction: 'Measure the circumference of your wrist for long sleeves.' },
    { name: 'Arm Hole', instruction: 'Measure the circumference of your armhole.' },
    { name: 'Front Neck Depth', instruction: 'Measure from the high point of shoulder to desired front neck depth.' },
    { name: 'Back Depth', instruction: 'Measure from the high point of shoulder to desired back neck depth.' },
    { name: 'Height', instruction: 'Total height from shoulder to desired blouse length.' },
  ];

  const formFields = [
    { name: 'aroundBust', label: 'Around Bust', required: true },
    { name: 'belowBust', label: 'Below Bust', required: true },
    { name: 'shoulder', label: 'Shoulder', required: true },
    { name: 'shortSleeveLength', label: 'Short Sleeve Length' },
    { name: 'longSleeveLength', label: 'Long Sleeve Length' },
    { name: 'shortSleeveRound', label: 'Short Sleeve Round' },
    { name: 'longSleeveRound', label: 'Long Sleeve Round' },
    { name: 'armHole', label: 'Arm Hole', required: true },
    { name: 'frontNeckDepth', label: 'Front Neck Depth', required: true },
    { name: 'backDepth', label: 'Back Depth', required: true },
    { name: 'height', label: 'Height', required: true },
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

