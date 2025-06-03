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
  Plus,
  Settings,
  UserCircle,
  UserCog,
  Blocks,
  Waves,
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
import { Separator } from "@/components/ui/separator";

const sidebarVariants = {
  open: {
    width: "280px",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    }
  },
  closed: {
    width: "80px",
    transition: {
      type: "spring", 
      stiffness: 300,
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
      className="fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 shadow-lg"
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className="flex h-full flex-col">
        {/* Header Section */}
        <div className="flex h-16 items-center justify-center border-b border-gray-100 px-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={false}
            animate={isCollapsed ? "closed" : "open"}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <motion.div
              variants={contentVariants}
              className="overflow-hidden"
            >
              {!isCollapsed && (
                <div>
                  <h1 className="text-sm font-bold text-gray-900">Muscat Bay</h1>
                  <p className="text-xs text-gray-500">Operations Hub</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full py-4">
            <div className="space-y-1 px-3">
              {/* Main Navigation */}
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

              {/* Separator */}
              <div className="py-2">
                <Separator className="mx-2" />
              </div>

              {/* System Section */}
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
          </ScrollArea>
        </div>

        {/* User Profile Section */}
        <div className="border-t border-gray-100 p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "h-auto w-full justify-start p-2 hover:bg-gray-50",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-semibold">
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
                          <p className="text-sm font-medium text-gray-900">A. Rahim</p>
                          <p className="text-xs text-gray-500">Operations Manager</p>
                        </div>
                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                      </>
                    )}
                  </motion.div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                    AR
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">A. Rahim</span>
                  <span className="text-xs text-gray-500">Operations Manager</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/team" className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  Manage Team
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/integrations" className="flex items-center gap-2">
                  <Blocks className="h-4 w-4" />
                  Integrations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600">
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
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
          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
          "hover:bg-gray-50 hover:text-gray-900",
          isActive
            ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
            : "text-gray-600",
          isCollapsed && "justify-center px-3"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          variants={iconVariants}
          className={cn(
            "flex h-5 w-5 items-center justify-center",
            isActive ? "text-blue-700" : "text-gray-500 group-hover:text-gray-700"
          )}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        
        <motion.div
          variants={contentVariants}
          className="flex flex-1 items-center justify-between overflow-hidden"
        >
          {!isCollapsed && (
            <>
              <span className="truncate">{label}</span>
              {badge && (
                <Badge 
                  variant="secondary"
                  className="ml-2 h-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium border-0"
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
