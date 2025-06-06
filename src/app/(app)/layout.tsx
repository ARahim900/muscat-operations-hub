import AppShell from '@/components/layout/app-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Muscat Bay Operations Hub',
  description: 'Modern operational data dashboard with advanced analytics and monitoring.',
};

export default function AppPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}