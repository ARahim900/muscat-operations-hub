"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Bolt, 
  Droplets, 
  Factory, 
  ClipboardList, 
  AlertTriangle, 
  Menu,
  X,
  Bell,
  User,
  Settings,
  Search,
  ChevronDown,
  Zap,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navigationItems = [
  { 
    href: '/dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard,
    description: 'Operations overview & KPIs'
  },
  { 
    href: '/electricity-analysis', 
    label: 'Electricity Analysis', 
    icon: Bolt,
    description: 'Power consumption & efficiency'
  },
  { 
    href: '/water-analysis', 
    label: 'Water Analysis', 
    icon: Droplets,
    description: 'Water distribution monitoring'
  },
  { 
    href: '/stp-plant', 
    label: 'STP Plant', 
    icon: Factory,
    description: 'Sewage treatment performance'
  },
  { 
    href: '/contractor-tracker', 
    label: 'Contractor Tracker', 
    icon: ClipboardList,
    description: 'Contractor management'
  },
  { 
    href: '/anomaly-detection', 
    label: 'Anomaly Detection', 
    icon: AlertTriangle,
    description: 'AI-powered alerts'
  },
];

interface ModernSidebarProps {
  children?: React.ReactNode;
}

export default function ModernSidebar({ children }: ModernSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col bg-muscat-gradient border-r border-white/10 shadow-muscat transition-all duration-300 ease-in-out relative",
        isCollapsed ? "w-20" : "w-72"
      )}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent-gradient rounded-xl flex items-center justify-center shadow-accent transition-all duration-300 hover:shadow-accent-lg hover:-translate-y-0.5 animate-float flex-shrink-0">
              <Zap className="h-6 w-6 text-muscat-bay-primary" />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <Link href="/dashboard" className="group">
                  <h1 className="text-xl font-bold text-white group-hover:text-muscat-bay-accent transition-colors duration-200 truncate">
                    Muscat Bay Operations
                  </h1>
                  <p className="text-sm text-muscat-bay-accent font-medium -mt-0.5 truncate">
                    Assets & Operations Hub
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-accent-gradient text-muscat-bay-primary shadow-accent"
                    : "text-white/90 hover:text-white hover:bg-white/10",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? item.label : ''}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
                
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0 relative z-10",
                  isActive ? "text-muscat-bay-primary" : "text-white/90 group-hover:text-white"
                )} />
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className={cn(
                      "font-medium truncate",
                      isActive ? "text-muscat-bay-primary" : "text-white/90 group-hover:text-white"
                    )}>
                      {item.label}
                    </div>
                    <div className={cn(
                      "text-xs opacity-75 truncate",
                      isActive ? "text-muscat-bay-primary-light" : "text-white/70"
                    )}>
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          {/* User Profile */}
          <div className={cn(
            "flex items-center bg-white/10 border border-white/20 rounded-xl p-3 hover:bg-white/15 transition-all duration-200 cursor-pointer group",
            isCollapsed && "justify-center"
          )}>
            <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-muscat-bay-primary" />
            </div>
            {!isCollapsed && (
              <>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Operations Manager</p>
                  <p className="text-xs text-muscat-bay-accent truncate">Administrator</p>
                </div>
                <ChevronDown className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-200 flex-shrink-0" />
              </>
            )}
          </div>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="mt-4 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 text-white hover:bg-white/10 hover:text-muscat-bay-accent transition-colors duration-200"
              >
                <Bell className="h-4 w-4 mr-1" />
                <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hover:text-muscat-bay-accent transition-colors duration-200"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-4 top-8 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          style={{ color: COLORS.primary }}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-muscat-bay-primary group-hover:text-muscat-bay-primary-dark" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-muscat-bay-primary group-hover:text-muscat-bay-primary-dark" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="relative w-80 max-w-sm bg-muscat-gradient border-r border-white/10 shadow-muscat-lg flex flex-col">
            {/* Mobile Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-gradient rounded-xl flex items-center justify-center shadow-accent">
                  <Zap className="h-5 w-5 text-muscat-bay-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Muscat Bay</h1>
                  <p className="text-xs text-muscat-bay-accent">Operations Hub</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                      isActive
                        ? "bg-accent-gradient text-muscat-bay-primary border-muscat-bay-accent shadow-accent"
                        : "text-white/90 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div>{item.label}</div>
                      <div className={cn(
                        "text-xs opacity-80",
                        isActive ? "text-muscat-bay-primary-light" : "text-white/70"
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-gradient rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-muscat-bay-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Operations Manager</p>
                    <p className="text-xs text-muscat-bay-accent">Administrator</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-white hover:bg-white/10"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white">
                      3
                    </Badge>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header (Mobile Menu + Search) */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 p-4 shadow-sm sticky top-0 z-40">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden text-muscat-bay-primary hover:bg-muscat-bay-accent/10"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-auto lg:ml-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search operations..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-muscat-bay-accent focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Desktop Notifications */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muscat-bay-primary hover:bg-muscat-bay-accent/10"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs border-2 border-white">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

// Add COLORS constant for the toggle button
const COLORS = {
  primary: '#4E4456',
};
