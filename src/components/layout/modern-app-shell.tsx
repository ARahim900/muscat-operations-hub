"use client";

import React from 'react';
import ModernNavbar from './modern-navbar';
import { Toaster } from "@/components/ui/toaster";

interface ModernAppShellProps {
  children: React.ReactNode;
}

export default function ModernAppShell({ children }: ModernAppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <ModernNavbar>
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </ModernNavbar>
      <Toaster />
    </div>
  );
}
