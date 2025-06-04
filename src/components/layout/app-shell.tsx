"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import ModernSidebar from './modern-sidebar';

function AppHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={onToggleSidebar}
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Modern Sidebar */}
      <ModernSidebar 
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleSidebar}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppHeader onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-muted/40">
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}