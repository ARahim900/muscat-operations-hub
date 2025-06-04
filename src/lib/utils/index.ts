// ===============================
// MUSCAT BAY OPERATIONS HUB - UTILITIES
// ===============================

import { format, parseISO, isValid } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  ElectricityConsumption, 
  WaterSystemData, 
  STPPlantData, 
  ContractorData,
  ElectricityCategory 
} from '../types';
import { UTILITY_RATES, DATE_FORMATS, ELECTRICITY_CATEGORIES } from '../constants';

// ===============================
// GENERAL UTILITIES
// ===============================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'OMR'): string {
  return new Intl.NumberFormat('en-OM', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(date: Date | string, formatStr = DATE_FORMATS.DISPLAY): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isValid(dateObj) ? format(dateObj, formatStr) : 'Invalid Date';
}

export function safeParseFloat(value: string | number): number {
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

export function safeParseInt(value: string | number): number {
  if (typeof value === 'number') return isNaN(value) ? 0 : Math.floor(value);
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}

// ===============================
// ELECTRICITY UTILITIES
// ===============================

export function extractElectricityCategory(unitName: string): ElectricityCategory {
  if (!unitName) return 'Other';
  
  const lowerUnitName = unitName.toLowerCase();
  
  if (lowerUnitName.includes('pumping station')) return 'Pumping Station';
  if (lowerUnitName.includes('lifting station')) return 'Lifting Station';
  if (lowerUnitName.includes('street light')) return 'Street Light';
  if (lowerUnitName.includes('irrigation tank')) return 'Irrigation Tank';
  if (lowerUnitName.includes('actuator db')) return 'Actuator DB';
  if (lowerUnitName.includes('apartment')) return 'Apartment';
  if (lowerUnitName.includes('guard house') || 
      lowerUnitName.includes('security building') || 
      lowerUnitName.includes('rop building')) return 'Ancillary Building';
  if (lowerUnitName.includes('central park')) return 'Central Park';
  if (lowerUnitName.includes('village square')) return 'Village Square';
  if (lowerUnitName.includes('bank muscat')) return 'Commercial (Bank)';
  if (lowerUnitName.includes('cif kitchen')) return 'Commercial (Kitchen)';
  if (lowerUnitName.includes('landscape light')) return 'Landscape Light';
  if (lowerUnitName.includes('beachwell')) return 'Beachwell';
  if (lowerUnitName.includes('helipad')) return 'Helipad';
  
  return 'Other';
}

export function parseElectricityData(rawData: string): ElectricityConsumption[] {
  const lines = rawData.split('\n');
  const headerLine = lines[0].split('\t').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthsHeader = headerLine.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const unitName = values[4]?.trim() || 'N/A';
    
    const entry: ElectricityConsumption = {
      id: parseInt(values[0], 10) || index + 1,
      slNo: parseInt(values[0], 10) || index + 1,
      zone: values[1]?.trim() || 'N/A',
      type: values[2]?.trim() || 'N/A',
      muscatBayNumber: values[3]?.trim() || 'N/A',
      unitName: unitName,
      category: extractElectricityCategory(unitName),
      meterAccountNo: values[5]?.trim() || 'N/A',
      consumption: {},
      totalConsumption: 0,
    };

    let totalConsumption = 0;
    monthsHeader.forEach((month, i) => {
      const consumptionValue = safeParseFloat(values[6 + i]);
      entry.consumption[month] = consumptionValue;
      totalConsumption += consumptionValue;
    });
    
    entry.totalConsumption = parseFloat(totalConsumption.toFixed(2));
    return entry;
  });
}

export function calculateElectricityCost(consumption: number): number {
  return consumption * UTILITY_RATES.OMR_PER_KWH;
}

// ===============================
// WATER SYSTEM UTILITIES
// ===============================

export function parseWaterSystemData(rawData: string): WaterSystemData[] {
  const lines = rawData.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthColumns = headers.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    const entry: WaterSystemData = {
      id: index + 1,
      meterLabel: values[0] || 'N/A',
      acctNo: values[1] || 'N/A',
      zone: values[2] || 'N/A',
      type: values[3] as any || 'N/A',
      parentMeter: values[4] || 'N/A',
      label: values[5] as any || 'N/A',
      consumption: {},
      totalConsumption: 0,
    };

    let totalConsumption = 0;
    monthColumns.forEach((month, i) => {
      const consumptionValue = safeParseFloat(values[6 + i]);
      entry.consumption[month] = consumptionValue;
      totalConsumption += consumptionValue;
    });
    
    entry.totalConsumption = parseFloat(totalConsumption.toFixed(2));
    return entry;
  });
}

export function calculateWaterLoss(input: number, output: number): {
  loss: number;
  lossPercentage: number;
} {
  const loss = input - output;
  const lossPercentage = input > 0 ? (loss / input) * 100 : 0;
  return {
    loss: parseFloat(loss.toFixed(2)),
    lossPercentage: parseFloat(lossPercentage.toFixed(2))
  };
}

// ===============================
// STP PLANT UTILITIES
// ===============================

export function parseStpData(rawData: string): STPPlantData[] {
  const lines = rawData.split('\n');
  const dataLines = lines.slice(1); // Skip header

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const dateStr = values[0]?.trim();
    
    // Parse date
    let parsedDate = null;
    if (dateStr) {
      const [day, month, year] = dateStr.split('/');
      parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    const treatedWater = safeParseFloat(values[1]);
    const tseOutput = safeParseFloat(values[2]);
    const totalInlet = safeParseFloat(values[3]);
    const tankersDischarge = safeParseInt(values[4]);
    const expectedTankerVolume = safeParseFloat(values[5]);
    const directSewage = safeParseFloat(values[6]);

    return {
      id: index + 1,
      date: dateStr,
      parsedDate: parsedDate,
      month: parsedDate ? parsedDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : 'N/A',
      treatedWater,
      tseOutput,
      totalInlet,
      tankersDischarge,
      expectedTankerVolume,
      directSewage,
      treatmentEfficiency: totalInlet > 0 ? (treatedWater / totalInlet) * 100 : 0,
      irrigationEfficiency: treatedWater > 0 ? (tseOutput / treatedWater) * 100 : 0,
      tankerPercentage: totalInlet > 0 ? (expectedTankerVolume / totalInlet) * 100 : 0,
    };
  }).filter(item => item.date && item.date !== 'N/A');
}

export function calculateStpEfficiency(treated: number, input: number): number {
  return input > 0 ? parseFloat(((treated / input) * 100).toFixed(1)) : 0;
}

export function calculateCapacityUtilization(actual: number, capacity: number): number {
  return capacity > 0 ? parseFloat(((actual / capacity) * 100).toFixed(1)) : 0;
}

// ===============================
// CONTRACTOR UTILITIES
// ===============================

export function parseContractorData(rawData: string): ContractorData[] {
  const lines = rawData.split('\n');
  const dataLines = lines.slice(1); // Skip header

  return dataLines.map((line, index) => {
    const values = line.split('\t').map(v => v?.trim() || '');
    
    return {
      id: `contractor-${index + 1}`,
      contractor: values[0] || 'N/A',
      serviceProvided: values[1] || 'N/A',
      status: (values[2] as any) || 'Active',
      contractType: (values[3] as any) || 'Contract',
      startDate: values[4] || '',
      endDate: values[5] || '',
      monthlyContract: values[6] || '',
      yearlyTotal: values[7] || '',
      note: values[8] || '',
    };
  }).filter(item => item.contractor !== 'N/A');
}

export function extractContractValue(contractString: string): number {
  // Extract numeric value from contract string (e.g., "525 OMR" -> 525)
  const match = contractString.match(/[\d,]+\.?\d*/);
  if (match) {
    return safeParseFloat(match[0].replace(/,/g, ''));
  }
  return 0;
}

export function isContractExpiringSoon(endDate: string, daysThreshold = 90): boolean {
  if (!endDate) return false;
  
  try {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= daysThreshold && diffDays > 0;
  } catch {
    return false;
  }
}

// ===============================
// ANALYTICS UTILITIES
// ===============================

export function calculateTrend(current: number, previous: number): {
  value: number;
  percentage: number;
  direction: 'up' | 'down' | 'stable';
} {
  const diff = current - previous;
  const percentage = previous > 0 ? (diff / previous) * 100 : 0;
  
  let direction: 'up' | 'down' | 'stable' = 'stable';
  if (Math.abs(percentage) > 1) {
    direction = percentage > 0 ? 'up' : 'down';
  }
  
  return {
    value: parseFloat(diff.toFixed(2)),
    percentage: parseFloat(percentage.toFixed(1)),
    direction
  };
}

export function generateColors(count: number, baseColors: string[] = []): string[] {
  const defaultColors = [
    '#4E4456', '#A8D5E3', '#BFA181', '#0A1828', 
    '#5f5168', '#C3FBF4', '#F2F0EA', '#10B981', 
    '#EF4444', '#6A5ACD'
  ];
  
  const colors = [...baseColors, ...defaultColors];
  const result = [];
  
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  
  return result;
}

export function getStatusColor(value: number, thresholds: { good: number; excellent: number }): string {
  if (value >= thresholds.excellent) return '#10B981'; // success
  if (value >= thresholds.good) return '#3B82F6'; // info
  if (value >= thresholds.good * 0.7) return '#F59E0B'; // warning
  return '#EF4444'; // error
}

// ===============================
// EXPORT UTILITIES
// ===============================

export const utils = {
  // General
  cn,
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatDate,
  safeParseFloat,
  safeParseInt,
  
  // Electricity
  extractElectricityCategory,
  parseElectricityData,
  calculateElectricityCost,
  
  // Water
  parseWaterSystemData,
  calculateWaterLoss,
  
  // STP
  parseStpData,
  calculateStpEfficiency,
  calculateCapacityUtilization,
  
  // Contractors
  parseContractorData,
  extractContractValue,
  isContractExpiringSoon,
  
  // Analytics
  calculateTrend,
  generateColors,
  getStatusColor,
};

export default utils;
