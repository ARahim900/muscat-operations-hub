"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"
import {
  Bolt,
  ChevronsUpDown,
  Droplets,
  Factory,
  ClipboardList,
  AlertTriangle,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCircle,
  UserCog,
  Blocks,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sidebarVariants = {
  open: {
    width: "280px",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    }
  },
  closed: {
    width: "80px",
    transition: {
      type: "spring", 
      stiffness: 400,
      damping: 30,
    }
  },
};

const contentVariants = {
  open: { 
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1,
      duration: 0.2,
    }
  },
  closed: { 
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.15,
    }
  },
};

const iconVariants = {
  open: { 
    scale: 1,
    transition: { duration: 0.2 }
  },
  closed: { 
    scale: 1.1,
    transition: { duration: 0.2 }
  },
};

export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  
  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 shadow-xl"
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="flex h-full flex-col">
        {/* Header Section - Bold Text Only */}
        <div className="flex h-20 items-center justify-center border-b border-gray-100 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
          <motion.div 
            className="flex items-center justify-center w-full"
            initial={false}
            animate={isCollapsed ? "closed" : "open"}
          >
            <motion.div
              variants={contentVariants}
              className="text-center"
            >
              {!isCollapsed ? (
                <div>
                  <h1 className="text-lg font-black text-white tracking-tight">MUSCAT BAY</h1>
                  <p className="text-xs font-bold text-blue-100 tracking-widest uppercase">OPERATIONS</p>
                </div>
              ) : (
                <div className="text-white font-black text-xl tracking-tighter">MB</div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-hidden py-6">
          <div className="px-4 space-y-8">
            
            {/* MAIN OPERATIONS Section */}
            <div className="space-y-3">
              <motion.div
                variants={contentVariants}
                className="px-3"
              >
                {!isCollapsed && (
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
                    MAIN OPERATIONS
                  </h2>
                )}
              </motion.div>
              
              <div className="space-y-1">
                <NavItem
                  href="/dashboard"
                  icon={LayoutDashboard}
                  label="Dashboard"
                  isActive={pathname?.includes("dashboard")}
                  isCollapsed={isCollapsed}
                />
                
                <NavItem
                  href="/electricity-analysis"
                  icon={Bolt}
                  label="Electricity"
                  isActive={pathname?.includes("electricity")}
                  isCollapsed={isCollapsed}
                />
                
                <NavItem
                  href="/water-analysis"
                  icon={Droplets}
                  label="Water Analysis"
                  isActive={pathname?.includes("water")}
                  isCollapsed={isCollapsed}
                />
                
                <NavItem
                  href="/stp-plant"
                  icon={Factory}
                  label="STP Plant"
                  isActive={pathname?.includes("stp")}
                  isCollapsed={isCollapsed}
                />
              </div>
            </div>

            {/* MANAGEMENT Section */}
            <div className="space-y-3">
              <motion.div
                variants={contentVariants}
                className="px-3"
              >
                {!isCollapsed && (
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
                    MANAGEMENT
                  </h2>
                )}
              </motion.div>
              
              <div className="space-y-1">
                <NavItem
                  href="/contractor-tracker"
                  icon={ClipboardList}
                  label="Contractors"
                  isActive={pathname?.includes("contractor")}
                  isCollapsed={isCollapsed}
                />
                
                <NavItem
                  href="/anomaly-detection"
                  icon={AlertTriangle}
                  label="AI Detection"
                  isActive={pathname?.includes("anomaly")}
                  isCollapsed={isCollapsed}
                  badge="AI"
                />
              </div>
            </div>

            {/* SYSTEM Section */}
            <div className="space-y-3">
              <motion.div
                variants={contentVariants}
                className="px-3"
              >
                {!isCollapsed && (
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">
                    SYSTEM
                  </h2>
                )}
              </motion.div>
              
              <div className="space-y-1">
                <NavItem
                  href="/settings"
                  icon={Settings}
                  label="Settings"
                  isActive={pathname?.includes("settings")}
                  isCollapsed={isCollapsed}
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-100 p-4 bg-gray-50/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "h-auto w-full justify-start p-3 hover:bg-white hover:shadow-md transition-all duration-200",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-black">
                      AR
                    </AvatarFallback>
                  </Avatar>
                  <motion.div
                    variants={contentVariants}
                    className="flex flex-1 items-center justify-between overflow-hidden"
                  >
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-bold text-gray-900">A. Rahim</p>
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">OPS MANAGER</p>
                        </div>
                        <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                      </>
                    )}
                  </motion.div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 shadow-xl border-gray-200">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarFallback className="bg-white text-blue-700 font-black">
                    AR
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">A. Rahim</span>
                  <span className="text-xs font-semibold text-blue-100 uppercase tracking-wide">Operations Manager</span>
                </div>
              </div>
              <div className="p-2">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-3 p-3 font-semibold">
                    <UserCircle className="h-5 w-5 text-gray-600" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/team" className="flex items-center gap-3 p-3 font-semibold">
                    <UserCog className="h-5 w-5 text-gray-600" />
                    Manage Team
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/integrations" className="flex items-center gap-3 p-3 font-semibold">
                    <Blocks className="h-5 w-5 text-gray-600" />
                    Integrations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem className="flex items-center gap-3 p-3 font-semibold text-red-600 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  badge?: string;
}

function NavItem({ href, icon: Icon, label, isActive, isCollapsed, badge }: NavItemProps) {
  return (
    <Link href={href}>
      <motion.div
        className={cn(
          "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-200",
          "hover:bg-gray-50 hover:text-gray-900 hover:shadow-md hover:scale-[1.02]",
          isActive
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-[1.02]"
            : "text-gray-700",
          isCollapsed && "justify-center px-3"
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          variants={iconVariants}
          className={cn(
            "flex h-6 w-6 items-center justify-center",
            isActive ? "text-white" : "text-gray-600 group-hover:text-gray-800"
          )}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        
        <motion.div
          variants={contentVariants}
          className="flex flex-1 items-center justify-between overflow-hidden"
        >
          {!isCollapsed && (
            <>
              <span className="truncate font-bold tracking-wide">{label}</span>
              {badge && (
                <Badge 
                  variant="secondary"
                  className="ml-3 h-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black border-0 shadow-lg"
                >
                  {badge}
                </Badge>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </Link>
  );
}
