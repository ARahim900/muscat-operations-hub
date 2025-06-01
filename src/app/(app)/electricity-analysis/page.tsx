import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ElectricityAnalysisPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-card-foreground/5 p-6">
          <CardTitle className="text-3xl font-headline text-primary">Electricity Analysis</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Insights into electricity consumption, efficiency, and operational trends.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-6 text-lg text-foreground/90">
            This section provides a comprehensive overview of electricity usage across various assets. 
            Analyze historical data, identify peak consumption periods, and monitor real-time performance
            to optimize energy efficiency and reduce operational costs.
          </p>
          <div className="mt-8 p-6 bg-muted/50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-primary/90">Key Metrics Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Total Consumption (kWh)", value: "1,250,340", change: "+2.5%", hint:"electricity meter" },
                { title: "Peak Demand (kW)", value: "870", change: "-1.2%", hint:"power lines" },
                { title: "Energy Cost ($)", value: "150,040", change: "+3.0%", hint:"money energy" },
              ].map(metric => (
                <Card key={metric.title} className="bg-background shadow-md rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-muted-foreground">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-destructive' : 'text-green-600'}`}>{metric.change} vs last month</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-8 h-96 bg-background rounded-lg shadow-md flex items-center justify-center border border-border" data-ai-hint="chart graph">
            <Image src="https://placehold.co/600x300.png" alt="Placeholder chart for electricity analysis" width={600} height={300} className="rounded-md" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Further detailed charts and data tables will be populated here, offering deeper dives into specific areas of electricity management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
