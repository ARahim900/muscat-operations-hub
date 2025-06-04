import React from 'react';
import Image from 'next/image';
import { Power } from 'lucide-react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  isCollapsed?: boolean;
}

// Muscat Bay Brand Colors
const COLORS = {
  primary: '#4E4456',
  accent: '#A8D5E3',
};

export default function Logo({ 
  size = 32, 
  className, 
  showText = true,
  isCollapsed = false 
}: LogoProps) {
  return (
    <div className="flex items-center gap-2" data-ai-hint="logo company">
      {/* Logo Icon - fallback to brand icon if image not available */}
      <div className="flex-shrink-0">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
          style={{backgroundColor: COLORS.accent}}
        >
          <Power size={24} />
        </div>
      </div>
      
      {/* Brand Text - only show when not collapsed */}
      {showText && !isCollapsed && (
        <div className="flex flex-col">
          <h1 className="text-white text-lg font-bold leading-tight">Muscat Bay</h1>
          <p className="text-gray-300 text-sm font-medium">Assets & Operation</p>
        </div>
      )}
    </div>
  );
}