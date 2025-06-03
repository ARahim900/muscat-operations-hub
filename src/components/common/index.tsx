// ===============================
// SHARED UI COMPONENTS
// Reusable components for Muscat Bay Operations Hub
// ===============================

'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MUSCAT_BAY_COLORS } from '@/lib/constants';

// ===============================
// KPI SUMMARY CARD
// ===============================

interface SummaryCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: string;
  trendColor?: string;
  icon?: LucideIcon;
  iconBgColor?: string;
  isLoading?: boolean;
  className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendColor = 'text-slate-500',
  icon: Icon,
  iconBgColor = MUSCAT_BAY_COLORS.primary,
  isLoading = false,
  className
}) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-slate-100",
      className
    )}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-slate-500 font-semibold text-md">{title}</h3>
        {Icon && (
          <div 
            className="p-3 rounded-full text-white shadow-md"
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-24 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-16"></div>
        </div>
      ) : (
        <>
          <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1.5">
            {value} {unit && <span className="text-base font-medium text-slate-500">{unit}</span>}
          </p>
          {trend && <p className={`text-xs sm:text-sm font-medium ${trendColor}`}>{trend}</p>}
        </>
      )}
    </div>
  );
};

// ===============================
// CHART WRAPPER
// ===============================

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  children,
  actions,
  className
}) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>
      <div className="mt-4" style={{ height: '350px' }}>
        {children}
      </div>
    </div>
  );
};

// ===============================
// STYLED SELECT
// ===============================

interface StyledSelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  id: string;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}

export const StyledSelect: React.FC<StyledSelectProps> = ({
  label,
  value,
  onChange,
  options,
  id,
  icon: Icon,
  disabled = false,
  className
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select 
          id={id} 
          value={value} 
          onChange={onChange} 
          disabled={disabled}
          className={cn(
            "appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:ring-[#5f5168] focus:border-[#5f5168]"
          )}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          {Icon ? <Icon size={16} /> : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

// ===============================
// LOADING SPINNER
// ===============================

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 24, 
  className 
}) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div 
        className="animate-spin rounded-full border-4 border-slate-200"
        style={{
          width: size,
          height: size,
          borderTopColor: MUSCAT_BAY_COLORS.primary
        }}
      ></div>
    </div>
  );
};

// ===============================
// STATUS BADGE
// ===============================

interface StatusBadgeProps {
  status: 'active' | 'expired' | 'pending' | 'suspended' | 'excellent' | 'good' | 'warning' | 'critical';
  children: React.ReactNode;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  children, 
  className 
}) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'expired':
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <span className={cn(
      "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
      getStatusStyles(status),
      className
    )}>
      {children}
    </span>
  );
};

// ===============================
// PROGRESS BAR
// ===============================

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = MUSCAT_BAY_COLORS.primary,
  className
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
          {showPercentage && <span className="text-sm text-slate-600">{percentage.toFixed(1)}%</span>}
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-3">
        <div 
          className="h-3 rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
    </div>
  );
};

// ===============================
// DATA TABLE
// ===============================

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns, 
  className,
  emptyMessage = "No data available"
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={cn("bg-white rounded-lg border border-slate-200 p-8 text-center", className)}>
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg border border-slate-200 overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider",
                    column.className
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn(
                      "px-6 py-4 whitespace-nowrap text-sm text-slate-900",
                      column.className
                    )}
                  >
                    {column.render 
                      ? column.render(item[column.key], item)
                      : item[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===============================
// SECTION HEADER
// ===============================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actions,
  className
}) => {
  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6", className)}>
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
      </div>
      {actions && (
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {actions}
        </div>
      )}
    </div>
  );
};

// ===============================
// METRIC CARD
// ===============================

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  className
}) => {
  const changeColor = change && change > 0 ? 'text-green-600' : change && change < 0 ? 'text-red-600' : 'text-slate-600';
  const changeIcon = change && change > 0 ? '↗' : change && change < 0 ? '↘' : '';
  
  return (
    <div className={cn("bg-white p-4 rounded-lg border border-slate-200", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {change !== undefined && (
            <p className={cn("text-xs", changeColor)}>
              {changeIcon} {Math.abs(change)}% {changeLabel}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon size={20} className="text-slate-600" />
          </div>
        )}
      </div>
    </div>
  );
};

// ===============================
// ALERT BANNER
// ===============================

interface AlertBannerProps {
  type: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  title,
  children,
  className,
  onDismiss
}) => {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  return (
    <div className={cn(
      "border rounded-lg p-4",
      getAlertStyles(type),
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <div>{children}</div>
        </div>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="ml-4 text-current hover:opacity-70"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
