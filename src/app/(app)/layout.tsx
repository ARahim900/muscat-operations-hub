import AppShell from '@/components/layout/app-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Muscat Operations Hub',
  description: 'Operational data dashboard.',
};

export default function AppPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
