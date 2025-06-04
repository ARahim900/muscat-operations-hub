"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { Bolt, Droplets, Factory, ClipboardList, AlertTriangle, Menu } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";

const menuItems = [
  { href: '/electricity-analysis', label: 'Electricity Analysis', icon: Bolt },
  { href: '/water-analysis', label: 'Water Analysis', icon: Droplets },
  { href: '/stp-plant', label: 'STP Plant', icon: Factory },
  { href: '/contractor-tracker', label: 'Contractor Tracker', icon: ClipboardList },
  { href: '/anomaly-detection', label: 'Anomaly Detection', icon: AlertTriangle },
];

function AppHeader() {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex-1">
        {/* Future: Breadcrumbs or dynamic page title can go here */}
      </div>
      {/* Future: User profile, notifications, etc. can go here */}
    </header>
  );
}


export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" side="left" variant="sidebar" className="border-r">
        <SidebarHeader className="p-4">
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.label, side: 'right', align: 'center' }}
                  className="justify-start"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-muted/40">
          {children}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
