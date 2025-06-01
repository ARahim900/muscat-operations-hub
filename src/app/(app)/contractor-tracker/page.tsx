import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ContractorTrackerPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-card-foreground/5 p-6">
          <CardTitle className="text-3xl font-headline text-primary">Contractor Tracker</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Manage and monitor contractor performance, schedules, and compliance.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-6 text-lg text-foreground/90">
            This module allows for effective tracking of all contractor activities, including project progress,
            milestone completion, resource allocation, and adherence to safety and quality standards.
          </p>
          <div className="mt-8 p-6 bg-muted/50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-primary/90">Contractor Activity Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Active Contracts", value: "25", change: "+2", hint:"documents agreement" },
                { title: "Milestones Achieved", value: "150/200", change: "75% Completion", hint:"checklist tasks" },
                { title: "Compliance Score (%)", value: "98", change: "+1%", hint:"safety hardhat" },
              ].map(metric => (
                <Card key={metric.title} className="bg-background shadow-md rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-muted-foreground">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                    <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : metric.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>{metric.change.includes('%') ? metric.change : `${metric.change} from last week`}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-8 h-96 bg-background rounded-lg shadow-md flex items-center justify-center border border-border" data-ai-hint="team meeting">
            <Image src="https://placehold.co/600x300.png" alt="Placeholder for contractor activity dashboard" width={600} height={300} className="rounded-md" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Detailed contractor profiles, project timelines, and performance reviews will be accessible here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
