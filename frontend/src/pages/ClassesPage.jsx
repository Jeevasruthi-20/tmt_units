import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { courses } from '@/data/courses';

export default function ClassesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Our Classes
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Learn traditional crafts from expert instructors with flexible online and offline options
            </p>
          </div>
        </div>
      </section>

      {/* Classes Overview */}
      <section className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {courses.map((classItem) => {
            const Icon = classItem.icon;
            return (
              <Card key={classItem.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden rounded-t-lg shrink-0">
                  <img
                    src={classItem.image}
                    alt={classItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${classItem.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-xl h-14 flex items-center">{classItem.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{classItem.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-4 mb-4 flex-1">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-primary/5 p-2 rounded">
                        <span className="block font-semibold text-primary text-xs uppercase tracking-wider mb-1">Duration</span>
                        <span className="font-medium text-foreground">{classItem.duration}</span>
                      </div>
                      <div className="bg-secondary/5 p-2 rounded">
                        <span className="block font-semibold text-secondary text-xs uppercase tracking-wider mb-1">Fee</span>
                        <span className="font-medium text-foreground">{classItem.fee}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block font-semibold text-foreground text-sm mb-2">Course Coverage:</span>
                      <ul className="space-y-2">
                        {classItem.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1 shrink-0">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border mt-auto space-y-4">
                    <p className="text-sm text-muted-foreground italic">
                      <span className="font-semibold text-primary not-italic">Outcome: </span>
                      {classItem.outcome}
                    </p>
                    <Link to={`/classes/${classItem.id}`} className="block">
                      <Button variant="outline" className="w-full group hover:bg-primary hover:text-primary-foreground border-primary/20">
                        View More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
