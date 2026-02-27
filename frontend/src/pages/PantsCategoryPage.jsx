import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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

export default function PantsCategoryPage() {
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
                  <BreadcrumbPage className="font-semibold text-primary">
                    Pants
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="max-w-2xl">
                <h1 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-2">
                  Pants Stitching
                </h1>
                <p className="text-muted-foreground text-base lg:text-lg">
                  Choose your pant style. On the next page you can enter detailed
                  measurements for a perfect, comfortable fit.
                </p>
              </div>
              <Link to="/stitching">
                <Button variant="ghost" size="sm" className="mt-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Stitching
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pant type grid */}
      <section className="container mx-auto px-4 py-10 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-bold text-2xl text-foreground mb-4">
            Choose Pant Type
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Select a pant category below. You will then be taken to the measurement page
            for that specific style.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pantTypes.map((type) => (
              <Link key={type.id} to={`/stitching/pants/${type.id}`} className="group">
                <div className="h-full rounded-xl border border-border/70 bg-white/80 px-4 py-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/70">
                  <div className="mb-3 h-32 w-full overflow-hidden rounded-lg border bg-muted/40">
                    <img
                      src="/images/pants.jpg"
                      alt={`${type.label} illustration`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary">
                    {type.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

