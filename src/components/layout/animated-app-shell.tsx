"use client";

import React from 'react';
import { SessionNavBar } from '@/components/ui/session-sidebar';
import { Toaster } from "@/components/ui/toaster";

interface AnimatedAppShellProps {
  children: React.ReactNode;
}

export default function AnimatedAppShell({ children }: AnimatedAppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <SessionNavBar />
      <main className="ml-20 min-h-screen transition-all duration-300 ease-in-out">
        <div className="h-full p-6">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
