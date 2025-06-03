// ===============================
// CUSTOM REACT HOOKS
// Data management and state hooks for Muscat Bay Operations Hub
// ===============================

'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  ElectricityConsumption, 
  WaterSystemData, 
  STPPlantData, 
  ContractorData,
  ElectricityKPIs,
  WaterSystemAnalysis,
  STPPlantKPIs,
  ContractorKPIs,
  FilterOptions
} from '@/lib/types';
import { utils } from '@/lib/utils';
import { CONSTANTS } from '@/lib/constants';
import config from '@/lib/config';

// ===============================
// CORE DATA HOOKS
// ===============================

/**
 * Hook for managing electricity data with filtering and analytics
 */
export function useElectricityData(rawData?: string) {
  const [data, setData] = useState<ElectricityConsumption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      if (rawData) {
        const parsedData = utils.parseElectricityData(rawData);
        setData(parsedData);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse electricity data');
    } finally {
      setIsLoading(false);
    }
  }, [rawData]);

  const calculateKPIs = useCallback((
    filteredData: ElectricityConsumption[], 
    selectedMonth: string
  ): ElectricityKPIs => {
    const totalConsumption = filteredData.reduce((acc, curr) => {
      return acc + (selectedMonth === 'All Months' ? curr.totalConsumption : (curr.consumption[selectedMonth] || 0));
    }, 0);

    const totalCost = utils.calculateElectricityCost(totalConsumption);
    const averageConsumptionPerUnit = filteredData.length > 0 ? totalConsumption / filteredData.length : 0;
    const activeMeters = filteredData.filter(d => 
      d.meterAccountNo !== 'N/A' && 
      d.meterAccountNo !== 'MISSING_METER' && 
      (selectedMonth === 'All Months' ? d.totalConsumption > 0 : (d.consumption[selectedMonth] || 0) > 0)
    ).length;

    return {
      totalConsumption: Math.round(totalConsumption),
      totalCost: Math.round(totalCost * 100) / 100,
      averageConsumptionPerUnit: Math.round(averageConsumptionPerUnit),
      activeMeters,
      period: selectedMonth
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    calculateKPIs,
    availableMonths: data.length > 0 ? Object.keys(data[0].consumption) : [],
    categories: [...new Set(data.map(d => d.category))].sort(),
  };
}

/**
 * Hook for managing water system data with hierarchical analysis
 */
export function useWaterData(rawData?: string) {
  const [data, setData] = useState<WaterSystemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      if (rawData) {
        const parsedData = utils.parseWaterSystemData(rawData);
        setData(parsedData);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse water data');
    } finally {
      setIsLoading(false);
    }
  }, [rawData]);

  const calculateWaterAnalysis = useCallback((
    selectedMonth: string
  ): WaterSystemAnalysis => {
    // A1 Level (L1) - Main Source
    const mainBulkMeter = data.find(item => item.label === 'L1');
    const A1_totalSupply = mainBulkMeter ? (mainBulkMeter.consumption[selectedMonth] || 0) : 0;

    // A2 Level = L2 + DC - Primary Distribution
    const zoneBulkMeters = data.filter(item => item.label === 'L2');
    const directConnections = data.filter(item => item.label === 'DC');
    const L2_total = zoneBulkMeters.reduce((sum, meter) => sum + (meter.consumption[selectedMonth] || 0), 0);
    const DC_total = directConnections.reduce((sum, meter) => sum + (meter.consumption[selectedMonth] || 0), 0);
    const A2_total = L2_total + DC_total;

    // A3 Level = L3 + DC - End-User Consumption
    const endUserMeters = data.filter(item => item.label === 'L3');
    const L3_total = endUserMeters.reduce((sum, meter) => sum + (meter.consumption[selectedMonth] || 0), 0);
    const A3_total = L3_total + DC_total;

    // Loss Calculations
    const stage1Loss = A1_totalSupply - A2_total;
    const stage2Loss = L2_total - L3_total;
    const totalLoss = A1_totalSupply - A3_total;

    // Percentage calculations
    const stage1LossPercent = A1_totalSupply > 0 ? (stage1Loss / A1_totalSupply) * 100 : 0;
    const stage2LossPercent = L2_total > 0 ? (stage2Loss / L2_total) * 100 : 0;
    const totalLossPercent = A1_totalSupply > 0 ? (totalLoss / A1_totalSupply) * 100 : 0;
    const systemEfficiency = 100 - Math.abs(totalLossPercent);

    return {
      A1_totalSupply: Math.round(A1_totalSupply),
      A2_total: Math.round(A2_total),
      A3_total: Math.round(A3_total),
      L2_total: Math.round(L2_total),
      L3_total: Math.round(L3_total),
      DC_total: Math.round(DC_total),
      stage1Loss: Math.round(stage1Loss * 10) / 10,
      stage2Loss: Math.round(stage2Loss * 10) / 10,
      totalLoss: Math.round(totalLoss * 10) / 10,
      stage1LossPercent: Math.round(stage1LossPercent * 10) / 10,
      stage2LossPercent: Math.round(stage2LossPercent * 10) / 10,
      totalLossPercent: Math.round(totalLossPercent * 10) / 10,
      systemEfficiency: Math.round(systemEfficiency * 10) / 10,
    };
  }, [data]);

  return {
    data,
    isLoading,
    error,
    calculateWaterAnalysis,
    availableMonths: data.length > 0 ? Object.keys(data[0]?.consumption || {}) : [],
    zones: [...new Set(data.map(d => d.zone))].filter(zone => zone !== 'MAIN'),
  };
}

/**
 * Hook for managing STP plant data with performance analytics
 */
export function useStpData(rawData?: string) {
  const [data, setData] = useState<STPPlantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      if (rawData) {
        const parsedData = utils.parseStpData(rawData);
        setData(parsedData);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse STP data');
    } finally {
      setIsLoading(false);
    }
  }, [rawData]);

  const calculateStpKPIs = useCallback((
    filteredData: STPPlantData[]
  ): STPPlantKPIs => {
    const totalDays = filteredData.length;
    
    if (totalDays === 0) {
      return {
        avgTreatedWater: 0,
        avgTseOutput: 0,
        avgEfficiency: 0,
        totalTankersDischarge: 0,
        avgTankerPercentage: 0,
        capacityUtilization: 0,
        totalDays: 0,
        totalTreatedWater: 0,
        totalTseOutput: 0,
        totalInputProcess: 0,
        avgTotalInput: 0,
      };
    }

    const totals = filteredData.reduce((acc, curr) => ({
      treatedWater: acc.treatedWater + curr.treatedWater,
      tseOutput: acc.tseOutput + curr.tseOutput,
      totalInlet: acc.totalInlet + curr.totalInlet,
      tankersDischarge: acc.tankersDischarge + curr.tankersDischarge,
      efficiency: acc.efficiency + curr.treatmentEfficiency,
      tankerPercentage: acc.tankerPercentage + curr.tankerPercentage,
    }), {
      treatedWater: 0,
      tseOutput: 0,
      totalInlet: 0,
      tankersDischarge: 0,
      efficiency: 0,
      tankerPercentage: 0,
    });

    const avgTreatedWater = totals.treatedWater / totalDays;
    const capacityUtilization = utils.calculateCapacityUtilization(
      avgTreatedWater, 
      CONSTANTS.PLANT.STP_DESIGN_CAPACITY
    );

    return {
      avgTreatedWater: Math.round(avgTreatedWater),
      avgTseOutput: Math.round(totals.tseOutput / totalDays),
      avgEfficiency: Math.round((totals.efficiency / totalDays) * 10) / 10,
      totalTankersDischarge: totals.tankersDischarge,
      avgTankerPercentage: Math.round((totals.tankerPercentage / totalDays) * 10) / 10,
      capacityUtilization: Math.round(capacityUtilization * 10) / 10,
      totalDays,
      totalTreatedWater: Math.round(totals.treatedWater),
      totalTseOutput: Math.round(totals.tseOutput),
      totalInputProcess: Math.round(totals.totalInlet),
      avgTotalInput: Math.round(totals.totalInlet / totalDays),
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    calculateStpKPIs,
    availableMonths: [...new Set(data.map(item => item.month))].filter(m => m !== 'N/A'),
  };
}

/**
 * Hook for managing contractor data with analytics
 */
export function useContractorData(rawData?: string) {
  const [data, setData] = useState<ContractorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      if (rawData) {
        const parsedData = utils.parseContractorData(rawData);
        setData(parsedData);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse contractor data');
    } finally {
      setIsLoading(false);
    }
  }, [rawData]);

  const calculateContractorKPIs = useCallback((): ContractorKPIs => {
    const totalContractors = data.length;
    const activeContracts = data.filter(c => c.status === 'Active').length;
    const expiredContracts = data.filter(c => c.status === 'Expired').length;

    // Calculate total values for active contracts
    const activeContractors = data.filter(c => c.status === 'Active');
    let totalYearlyValue = 0;
    let totalMonthlyValue = 0;

    activeContractors.forEach(contractor => {
      const yearlyValue = utils.extractContractValue(contractor.yearlyTotal);
      const monthlyValue = utils.extractContractValue(contractor.monthlyContract);
      
      totalYearlyValue += yearlyValue;
      totalMonthlyValue += monthlyValue;
    });

    const averageContractValue = activeContractors.length > 0 
      ? totalYearlyValue / activeContractors.length 
      : 0;

    return {
      totalContractors,
      activeContracts,
      expiredContracts,
      totalYearlyValue: Math.round(totalYearlyValue),
      totalMonthlyValue: Math.round(totalMonthlyValue),
      averageContractValue: Math.round(averageContractValue),
    };
  }, [data]);

  const getExpiringContracts = useCallback((daysThreshold = 90) => {
    return data.filter(contractor => 
      utils.isContractExpiringSoon(contractor.endDate, daysThreshold)
    );
  }, [data]);

  return {
    data,
    isLoading,
    error,
    calculateContractorKPIs,
    getExpiringContracts,
    statuses: [...new Set(data.map(d => d.status))],
    contractTypes: [...new Set(data.map(d => d.contractType))],
  };
}

// ===============================
// UI STATE HOOKS
// ===============================

/**
 * Hook for managing filter state across modules
 */
export function useFilters(initialFilters: Partial<FilterOptions> = {}) {
  const [filters, setFilters] = useState<FilterOptions>({
    selectedMonth: 'All Months',
    selectedCategory: 'All Categories',
    selectedZone: 'All Zones',
    selectedMetric: 'All Metrics',
    ...initialFilters,
  });

  const updateFilter = useCallback(<K extends keyof FilterOptions>(
    key: K, 
    value: FilterOptions[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      selectedMonth: 'All Months',
      selectedCategory: 'All Categories',
      selectedZone: 'All Zones',
      selectedMetric: 'All Metrics',
    });
  }, []);

  return {
    filters,
    updateFilter,
    resetFilters,
  };
}

/**
 * Hook for managing loading states
 */
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback((errorMessage?: string) => {
    setIsLoading(false);
    if (errorMessage) {
      setError(errorMessage);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    clearError,
  };
}

/**
 * Hook for managing modal/dialog state
 */
export function useModal(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

// ===============================
// PERFORMANCE HOOKS
// ===============================

/**
 * Hook for debouncing values (useful for search/filter inputs)
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for managing local storage with SSR safety
 */
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

/**
 * Hook for managing theme (light/dark mode)
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}

/**
 * Hook for managing pagination
 */
export function usePagination<T>(
  data: T[], 
  itemsPerPage: number = CONSTANTS.UI.ITEMS_PER_PAGE.DEFAULT
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  return {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, data.length),
    totalItems: data.length,
  };
}

/**
 * Hook for auto-refresh functionality
 */
export function useAutoRefresh(
  callback: () => void, 
  interval: number = config.app.settings.autoRefreshInterval,
  enabled: boolean = true
) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, enabled]);
}

// ===============================
// UTILITY HOOKS
// ===============================

/**
 * Hook for managing window size
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/**
 * Hook for detecting if user is online
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
