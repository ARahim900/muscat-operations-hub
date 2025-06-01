import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Management - Muscat Operations Hub',
  description: 'Overview of data sources for all sections.',
};

// Placeholder data - this would eventually come from a real data source or API
const dataSections = [
  { id: '1', name: 'Electricity Analysis', description: 'Data sources related to electricity consumption and analysis.', sourceCount: 2, status: 'Active' },
  { id: '2', name: 'Contractor Tracker', description: 'Databases for tracking contractor information and performance.', sourceCount: 1, status: 'Active' },
  { id: '3', name: 'STP Plant Operations', description: 'Data from Sewage Treatment Plant operations.', sourceCount: 3, status: 'Maintenance' },
  { id: '4', name: 'Water Analysis', description: 'Water quality and consumption data sources.', sourceCount: 2, status: 'Active' },
  { id: '5', name: 'Anomaly Detection', description: 'Datasets used for anomaly detection models.', sourceCount: 4, status: 'Active' },
];

export default function DataManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Data Sources Overview</h1>
      <p className="mb-8 text-muted-foreground">
        This page provides a centralized view of all data sources and databases used across the different operational sections.
      </p>
      <Table>
        <TableCaption>A list of all data sections and their sources.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Section Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Source Count</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSections.map((section) => (
            <TableRow key={section.id}>
              <TableCell className="font-medium">{section.name}</TableCell>
              <TableCell>{section.description}</TableCell>
              <TableCell className="text-right">{section.sourceCount}</TableCell>
              <TableCell className="text-right">{section.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
