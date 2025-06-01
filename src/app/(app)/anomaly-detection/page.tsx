import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// This component may become a client component if form interactions are added.
// For now, it's a server component rendering static placeholder content.

export default function AnomalyDetectionPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-card-foreground/5 p-6">
          <CardTitle className="text-3xl font-headline text-primary">Anomaly Detection</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            AI-powered tool to identify unusual patterns in operational data.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-6 text-lg text-foreground/90">
            Utilize this advanced tool to analyze datasets from various operations (Electricity, Water, STP Plant)
            and detect potential anomalies. The AI intelligently flags deviations from normal patterns based on
            historical trends and real-time inputs.
          </p>
          
          <div className="mt-8 p-6 bg-muted/50 rounded-lg shadow-inner text-center">
            <h3 className="text-xl font-semibold mb-4 text-primary/90">Anomaly Detection Interface</h3>
            <p className="text-muted-foreground mb-4">
              The interactive form for submitting data and viewing AI-driven anomaly analysis will be available here.
              This will allow users to input operational data and receive insights on potential anomalies.
            </p>
            <Image src="https://placehold.co/500x300.png" alt="Placeholder for anomaly detection UI" width={500} height={300} className="rounded-md inline-block" data-ai-hint="data science"/>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Future enhancements will include a form to submit data directly to the AI model
            (<code>detectAnomaly</code> flow) and display the results, indicating whether an anomaly is
            detected and providing an explanation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
