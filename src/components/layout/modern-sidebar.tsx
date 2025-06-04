"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bolt, Droplets, Factory, ClipboardList, Settings, Power, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

// Muscat Bay Color Scheme
const COLORS = {
  primary: '#4E4456',        // Main brand color - Deep purple-gray
  primaryLight: '#5f5168',   // Lighter variant for hover states
  primaryDark: '#3B3241',    // Darker variant for active states
  accent: '#A8D5E3',         // Soft teal for highlights
  success: '#10B981',        // Green for positive metrics
  warning: '#BFA181',        // Muted gold for warnings
  info: '#0A1828',          // Deep classic blue for information
  textLight: '#E2E8F0',     // Light text
  textMuted: '#94A3B8',     // Muted text
};

interface ModernSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

const menuItems = [
  { href: '/electricity-analysis', label: 'Electricity System', icon: Bolt },
  { href: '/water-analysis', label: 'Water Analysis', icon: Droplets },
  { href: '/stp-plant', label: 'STP Plant', icon: Factory },
  { href: '/contractor-tracker', label: 'Contractor Tracker', icon: ClipboardList },
];

export default function ModernSidebar({ 
  isCollapsed = false, 
  onToggleCollapse,
  className 
}: ModernSidebarProps) {
  const pathname = usePathname();

  return (
    <div 
      className={cn(
        "h-screen flex flex-col transition-all duration-300 ease-in-out relative shadow-2xl",
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
      style={{backgroundColor: COLORS.primary}}
    >
      {/* Header Section */}
      <div className="p-6 border-b border-gray-600 border-opacity-30">
        <div className={cn(
          "flex items-center",
          isCollapsed ? 'justify-center' : 'space-x-3'
        )}>
          {/* Logo/Icon */}
          <div className="flex-shrink-0">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{backgroundColor: COLORS.accent}}
            >
              <Power size={24} />
            </div>
          </div>
          
          {/* Brand Text */}
          {!isCollapsed && (
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-tight">Muscat Bay</h1>
              <p className="text-gray-300 text-sm font-medium">Assets & Operation</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full flex items-center py-3 rounded-lg transition-all duration-200 ease-in-out group relative",
                isCollapsed ? 'justify-center px-3' : 'px-4',
                isActive 
                  ? 'text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
              )}
              style={{
                backgroundColor: isActive ? COLORS.accent : 'transparent',
              }}
              title={isCollapsed ? item.label : ''}
            >
              {/* Icon */}
              <IconComponent 
                size={22} 
                className={cn(
                  "flex-shrink-0 transition-transform",
                  isActive ? 'text-white' : 'text-gray-300 group-hover:text-white',
                  isActive && !isCollapsed ? 'scale-110' : ''
                )}
              />
              
              {/* Text */}
              {!isCollapsed && (
                <span className="ml-3 font-medium text-sm flex-1 text-left">
                  {item.label}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && !isCollapsed && (
                <div className="w-2 h-2 bg-white rounded-full opacity-75"></div>
              )}
              
              {/* Active dot for collapsed state */}
              {isActive && isCollapsed && (
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-600 border-opacity-30">
        {!isCollapsed ? (
          <div className="space-y-3">
            {/* Operations Suite Badge */}
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">Operations Management Suite</p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-50"></div>
            </div>
            
            {/* Settings Button */}
            <button 
              className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20 hover:text-white"
            >
              <Settings size={18} className="mr-2" />
              Global Settings
            </button>
          </div>
        ) : (
          <button 
            className="w-full flex items-center justify-center p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        )}
      </div>

      {/* Collapse Toggle Button */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-8 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 z-10"
          style={{ color: COLORS.primary }}
        >
          <Menu size={16} />
        </button>
      )}
    </div>
  );
}