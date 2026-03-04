import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StitchingPage() {
  const services = [
    {
      title: 'Chudi',
      description: 'Traditional and contemporary chudi designs with perfect measurements',
      // Image 5: Woman in kurti and pants (replace with side-measurement diagram)
      image: '/images/chudi.jpg',
      path: '/stitching/chudi',
      measurements: ['Bust', 'Waist', 'Hip', 'Length', 'Shoulder', 'Sleeve'],
    },
    {
      title: 'Pants',
      description: 'Custom-fitted pants and trousers for perfect comfort',
      // Image 4: Triptych of cropped trousers
      image: '/images/pants.jpg',
      path: '/stitching/pants',
      measurements: ['Waist', 'Hip', 'Inseam', 'Outseam', 'Thigh', 'Bottom'],
    },
    {
      title: 'Blouse',
      description: 'Elegant blouses tailored to your exact specifications',
      image: '/images/blouse.jpg',
      path: '/stitching/blouse',
      measurements: ['Bust', 'Waist', 'Shoulder', 'Sleeve', 'Blouse Length', 'Armhole'],
    },
    {
      title: 'Skirts',
      description: 'Stylish skirts crafted with precision measurements',
      // Image 6: Woman with black crop top and floral skirt
      image: '/images/skirts.jpg',
      path: '/stitching/skirts',
      measurements: ['Waist', 'Hip', 'Length', 'Thigh', 'Bottom Width'],
    },
    {
      title: 'Traditional Top & Skirt',
      description: 'Classic festive set with tailored top and flowing skirt',
      image: '/images/traditional-top-skirt.jpg',
      path: '/stitching/traditional-top-skirt',
      measurements: ['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Top Length', 'Skirt Length'],
    },
    {
      title: 'Lehenga',
      description: 'Elegant lehengas with intricate detailing and perfect fit',
      image: '/images/lehenga.jpg',
      path: '/stitching/lehenga',
      measurements: ['Bust', 'Waist', 'Hip', 'Blouse Length', 'Sleeve', 'Lehenga Length', 'Dupatta Length'],
    },
    {
      title: 'Frock',
      description: 'Graceful frocks with flared silhouettes and detailed yokes',
      image: '/images/frock.jpg',
      path: '/stitching/frock',
      measurements: ['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Frock Length'],
    },
    {
      title: 'Anarkali',
      description: 'Classic Anarkali suits with elegant flares and intricate designs',
      image: '/images/anarkali.jpg',
      path: '/stitching/anarkali',
      measurements: ['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Anarkali Length'],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-primary shadow-sm mb-6">
              <Ruler className="h-4 w-4" />
              Precision Measurements
            </div>
            <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Custom Stitching Services
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get perfectly fitted garments with our professional measurement-based stitching. Each piece is crafted with attention to detail and quality finishing.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif font-bold text-3xl text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Garment',
                description: 'Select the type of garment you want to stitch',
              },
              {
                step: '02',
                title: 'Provide Measurements',
                description: 'Fill in your measurements using our detailed guides',
              },
              {
                step: '03',
                title: 'Submit Order',
                description: "We'll contact you to confirm and start stitching",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <Card key={index} className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif font-bold text-2xl text-white mb-1 drop-shadow-md">
                    {service.title}
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">
                    {service.description}
                  </p>
                </div>
              </div>

              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-foreground mb-3">Required Measurements:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.measurements.map((measurement, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/90 text-xs text-foreground rounded-full border border-muted/10 shadow-sm"
                      >
                        {measurement}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <Link to={service.path}>
                    <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif font-bold text-3xl text-center text-foreground mb-12">
              Why Choose Our Stitching Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Perfect Fit',
                  description: 'Precise measurements ensure comfortable, well-fitted garments',
                },
                {
                  title: 'Quality Fabric',
                  description: 'Work with your choice of premium quality fabrics',
                },
                {
                  title: 'Expert Tailoring',
                  description: 'Skilled craftswomen with years of experience',
                },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-serif font-semibold text-lg mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

