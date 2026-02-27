import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MeasurementGuide from '@/components/features/MeasurementGuide';
import MeasurementForm from '@/components/forms/MeasurementForm';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function PantsMeasurementPage() {
  const pantTypes = [
    {
      id: 'normal',
      label: 'Normal Pant',
      description: 'Classic everyday fit with gentle taper for comfortable movement.',
    },
    {
      id: 'straight',
      label: 'Straight Pant',
      description: 'Straight cut from hip to hem for a clean, tailored look.',
    },
    {
      id: 'palazoo',
      label: 'Palazoo Pant',
      description: 'Wide flared bottoms with relaxed fit, perfect for flowy silhouettes.',
    },
    {
      id: 'patiyala',
      label: 'Patiyala Pant',
      description: 'Traditional pleated style with extra room around the hips and thighs.',
    },
    {
      id: 'gathering',
      label: 'Gathering Pant',
      description: 'Gathered waist and hem creating a soft, voluminous drape.',
    },
  ];

  const { pantType } = useParams();
  const selectedPant =
    pantTypes.find((type) => type.id === pantType) ?? pantTypes[0];

  const measurements = [
    {
      name: 'Waist',
      instruction: 'Measure around your natural waistline where you normally wear your pants. The tape should be snug but comfortable.',
    },
    {
      name: 'Hip',
      instruction: 'Measure around the fullest part of your hips and buttocks, keeping the tape parallel to the floor. This is typically 7-9 inches below your waist, at the widest point of your hips. The tape should wrap around the fullest part of your buttocks and hips.',
    },
    {
      name: 'Inseam',
      instruction: 'Measure from the crotch seam down to where you want the pants to end (usually at your ankle bone). This is best done on a pair of well-fitting pants.',
    },
    {
      name: 'Outseam',
      instruction: 'Measure from your waistline down the outside of your leg to where you want the pants to end.',
    },
    {
      name: 'Thigh',
      instruction: 'Measure around the fullest part of your thigh, about 2-3 inches below the crotch.',
    },
    {
      name: 'Bottom Opening',
      instruction: 'Measure the circumference of the leg opening where the pants will end at your ankle.',
    },
  ];

  const formFields = [
    { name: 'waist', label: 'Waist', required: true },
    { name: 'hip', label: 'Hip', required: true },
    { name: 'inseam', label: 'Inseam', required: true },
    { name: 'outseam', label: 'Outseam', required: true },
    { name: 'thigh', label: 'Thigh', required: true },
    { name: 'knee', label: 'Knee' },
    { name: 'bottomOpening', label: 'Bottom Opening', required: true },
    { name: 'rise', label: 'Rise (Front)' },
  ];

  const activeGarmentType = selectedPant ? `${selectedPant.label}` : 'Pants';

  return (
    <div>
      {/* Header with breadcrumb */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-6 lg:py-10 border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/stitching">Stitching</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="font-medium">
                    <Link to="/stitching/pants">Pants</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-primary">
                    {selectedPant.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="max-w-2xl">
                <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-2">
                  {selectedPant.label}
                </h1>
                <p className="text-muted-foreground text-base lg:text-lg">
                  Enter your measurements for this pant style to get a perfect, comfortable fit.
                </p>
              </div>
              <Link to="/stitching/pants">
                <Button variant="ghost" size="sm" className="mt-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Pants list
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Measurement guide + form */}
      <section className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Measurement Guide */}
          <div>
            <h2 className="font-serif font-bold text-2xl text-foreground mb-6">
              How to Measure
            </h2>
            <img
              src="/images/measurement.jpg"
              alt="Pants measurement guide"
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
              <MeasurementForm garmentType={activeGarmentType} fields={formFields} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

