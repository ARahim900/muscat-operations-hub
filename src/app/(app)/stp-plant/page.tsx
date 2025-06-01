import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function StpPlantPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-card-foreground/5 p-6">
          <CardTitle className="text-3xl font-headline text-primary">STP Plant Operations</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Overview of Sewage Treatment Plant performance and environmental compliance.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-6 text-lg text-foreground/90">
            Monitor the operational status of the Sewage Treatment Plant (STP), including treatment efficiency,
            effluent quality, and compliance with environmental regulations. Analyze data to ensure optimal plant performance.
          </p>
          <div className="mt-8 p-6 bg-muted/50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-primary/90">STP Performance Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Influent Flow (m³/day)", value: "1,200", change: "+5%", hint: "water flow" },
                { title: "Effluent Quality (BOD mg/L)", value: "8", change: "Target Met", hint: "water test" },
                { title: "Energy Consumption (kWh/m³)", value: "0.45", change: "-2%", hint: "industrial plant" },
              ].map(metric => (
                <Card key={metric.title} className="bg-background shadow-md rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-muted-foreground">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                     <p className={`text-xs ${metric.change.startsWith('+') ? 'text-destructive' : metric.change.startsWith('-') ? 'text-green-600' : 'text-green-600'}`}>{metric.change !== "Target Met" ? `${metric.change} vs last cycle` : metric.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-8 h-96 bg-background rounded-lg shadow-md flex items-center justify-center border border-border" data-ai-hint="pipes factory">
             <Image src="https://placehold.co/600x300.png" alt="Placeholder chart for STP plant operations" width={600} height={300} className="rounded-md" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            This area will feature detailed analytics on STP processes, sludge management, and chemical usage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
