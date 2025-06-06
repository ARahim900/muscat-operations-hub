// ===============================
// UNIVERSAL FILTER BAR COMPONENT
// Enhanced filter bar for all sections with consistent styling
// ===============================

'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyledSelect } from './index';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  icon?: LucideIcon;
  disabled?: boolean;
}

interface UniversalFilterBarProps {
  filters: FilterConfig[];
  onResetFilters: () => void;
  resetLabel?: string;
  title?: string;
  className?: string;
  sticky?: boolean;
}

export const UniversalFilterBar: React.FC<UniversalFilterBarProps> = ({
  filters,
  onResetFilters,
  resetLabel = "Reset Filters",
  title,
  className,
  sticky = false
}) => {
  const baseClasses = cn(
    "bg-white shadow-md p-4 rounded-lg mb-6 print:hidden border border-slate-200",
    "dark:bg-slate-800 dark:border-slate-700",
    sticky && "sticky top-0 z-40",
    className
  );

  return (
    <div className={baseClasses}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            {title}
          </h3>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end">
        {filters.map((filter) => (
          <StyledSelect
            key={filter.id}
            id={filter.id}
            label={filter.label}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            options={filter.options}
            icon={filter.icon}
            disabled={filter.disabled}
          />
        ))}
        
        <button
          onClick={onResetFilters}
          className={cn(
            "text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200",
            "flex items-center justify-center space-x-2 h-[46px] w-full",
            "bg-slate-600 hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:outline-none",
            "hover:shadow-lg transform hover:scale-105",
            "dark:bg-slate-700 dark:hover:bg-slate-600"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{resetLabel}</span>
        </button>
      </div>
    </div>
  );
};

// Export convenience hook for filter management
export const useFilterState = <T extends Record<string, string>>(
  initialState: T
) => {
  const [filters, setFilters] = React.useState<T>(initialState);

  const updateFilter = React.useCallback((key: keyof T, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = React.useCallback(() => {
    setFilters(initialState);
  }, [initialState]);

  return {
    filters,
    updateFilter,
    resetFilters,
    setFilters
  };
};

export default UniversalFilterBar;
