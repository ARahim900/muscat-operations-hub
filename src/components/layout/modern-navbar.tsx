"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
  Zap
} from 'lucide-react';

const navigationItems = [
  { 
    href: '/electricity-analysis', 
    label: 'Electricity Analysis', 
    icon: Bolt,
    description: 'Power consumption & efficiency analytics'
  },
  { 
    href: '/water-analysis', 
    label: 'Water Analysis', 
    icon: Droplets,
    description: 'Water distribution & loss monitoring'
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
    description: 'Contractor management & tracking'
  },
  { 
    href: '/anomaly-detection', 
    label: 'Anomaly Detection', 
    icon: AlertTriangle,
    description: 'AI-powered anomaly alerts'
  },
];

interface ModernNavbarProps {
  children?: React.ReactNode;
}

export default function ModernNavbar({ children }: ModernNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-muscat-gradient backdrop-blur-glass border-b border-white/10 sticky top-0 z-50 shadow-muscat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-gradient rounded-xl flex items-center justify-center shadow-accent transition-all duration-300 hover:shadow-accent-lg hover:-translate-y-0.5 animate-float">
                <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-muscat-bay-primary" />
              </div>
              <div className="hidden sm:block">
                <Link href="/" className="group">
                  <h1 className="text-lg lg:text-xl font-bold text-white group-hover:text-muscat-bay-accent transition-colors duration-200">
                    Muscat Bay Operations
                  </h1>
                  <p className="text-xs lg:text-sm text-muscat-bay-accent font-medium -mt-0.5">
                    Assets & Operations Hub
                  </p>
                </Link>
              </div>
              <div className="sm:hidden">
                <Link href="/" className="text-lg font-bold text-white">
                  Muscat Bay
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group overflow-hidden",
                      isActive
                        ? "bg-accent-gradient text-muscat-bay-primary shadow-accent"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
                    
                    <div className="relative flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop User Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-muscat-bay-accent focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-white/10 hover:text-muscat-bay-accent transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">3</span>
                </span>
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-2 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/15 transition-all duration-200 cursor-pointer group">
                <div className="w-8 h-8 bg-accent-gradient rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-muscat-bay-primary" />
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-medium text-white">Operations Manager</p>
                  <p className="text-xs text-muscat-bay-accent">Administrator</p>
                </div>
                <ChevronDown className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-200" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-white hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-muscat-bay-primary-dark/95 backdrop-blur-lg shadow-muscat-lg">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border",
                      isActive
                        ? "bg-accent-gradient text-muscat-bay-primary border-muscat-bay-accent shadow-accent"
                        : "text-white/90 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <div>
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

            {/* Mobile User Section */}
            <div className="border-t border-white/10 px-4 py-4">
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
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">3</span>
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
