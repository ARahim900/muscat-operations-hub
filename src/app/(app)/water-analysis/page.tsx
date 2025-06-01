import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function WaterAnalysisPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-card-foreground/5 p-6">
          <CardTitle className="text-3xl font-headline text-primary">Water Analysis</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Monitoring water usage, distribution efficiency, and conservation efforts.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-6 text-lg text-foreground/90">
            This section focuses on the analysis of water consumption patterns, network efficiency, and water quality. 
            Track usage trends, detect potential leaks, and evaluate the effectiveness of water conservation strategies.
          </p>
           <div className="mt-8 p-6 bg-muted/50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-primary/90">Key Water Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Total Water Usage (m³)", value: "45,600", change: "+1.8%", hint:"water tap" },
                { title: "Network Efficiency (%)", value: "92.5", change: "+0.5%", hint:"pipe system" },
                { title: "Water Quality Index", value: "8.2/10", change: "Stable", hint:"clean water" },
              ].map(metric => (
                <Card key={metric.title} className="bg-background shadow-md rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-muted-foreground">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-destructive' : metric.change.startsWith('-') ? 'text-green-600' : 'text-muted-foreground'}`}>{metric.change !== "Stable" ? `${metric.change} vs last month` : metric.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-8 h-96 bg-background rounded-lg shadow-md flex items-center justify-center border border-border" data-ai-hint="water drops">
            <Image src="https://placehold.co/600x300.png" alt="Placeholder chart for water analysis" width={600} height={300} className="rounded-md" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Detailed visualizations regarding water consumption, distribution losses, and quality parameters will be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
