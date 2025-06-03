"use client";

import React from 'react';
import { SessionNavBar } from '@/components/ui/session-sidebar';
import { Toaster } from "@/components/ui/toaster";

interface AnimatedAppShellProps {
  children: React.ReactNode;
}

export default function AnimatedAppShell({ children }: AnimatedAppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex h-screen w-screen flex-row">
        <SessionNavBar />
        <main className="flex h-screen grow flex-col overflow-auto ml-12">
          <div className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
