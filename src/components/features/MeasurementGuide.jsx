import { Card, CardContent } from '@/components/ui/card';

export default function MeasurementGuide({ measurements }) {
  return (
    <div className="space-y-4">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Measurement Tips:</span> Use a flexible measuring tape and wear fitted clothing. Measurements should be snug but not tight. For best results, have someone help you measure.
        </p>
      </div>

      {/* Measurement Instructions */}
      <div className="grid gap-4">
        {measurements.map((measurement, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-5">
              <h3 className="font-serif font-semibold text-lg mb-2 text-foreground">
                {measurement.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {measurement.instruction}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
