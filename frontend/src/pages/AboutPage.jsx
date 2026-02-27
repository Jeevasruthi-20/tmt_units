import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Target } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'Creating opportunities for women to learn and earn through traditional crafts',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Maintaining excellence in both education and custom stitching services',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive network of learners and craftswomen',
    },
    {
      icon: Target,
      title: 'Tradition',
      description: 'Preserving and promoting traditional South Indian craft techniques',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent py-16 lg:py-24">
        <div className="absolute inset-0 bg-embroidery-pattern"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-6">
              About Thangam Magalir Thaiyalagam
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Empowering women through traditional crafts and professional tailoring education since our inception
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/about.jpg"
              alt="Traditional crafts"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Thangam Magalir Thaiyalagam was founded with a vision to preserve and promote traditional South Indian crafts while empowering women with valuable skills that create both economic opportunities and artistic fulfillment.
              </p>
              <p>
                Our journey began with a simple belief: every woman deserves the opportunity to learn, create, and thrive. Through our comprehensive classes and professional stitching services, we've helped hundreds of women discover their creative potential and build successful careers in the textile and fashion industry.
              </p>
              <p>
                Today, we offer expert-led classes in Tailoring, Aari Work, and Embroidery, along with premium custom stitching services that combine traditional techniques with modern precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold text-xl mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="font-semibold text-primary">Our Mission</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower women through skill development in traditional crafts, providing them with opportunities for economic independence and creative expression while preserving our cultural heritage.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full">
                <span className="font-semibold text-secondary">Our Vision</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading institution for traditional craft education and custom tailoring services, recognized for excellence, innovation, and our commitment to women's empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '200+', label: 'Students Trained' },
              { value: '3', label: 'Specialized Courses' },
              { value: '1000+', label: 'Garments Stitched' },
              { value: '10+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div key={index} className="text-center text-white">
                <p className="font-serif font-bold text-3xl lg:text-4xl mb-2">{stat.value}</p>
                <p className="text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

