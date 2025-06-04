// ===============================
// SHARED TYPES FOR MUSCAT BAY OPERATIONS HUB
// ===============================

// Base types
export interface BaseEntity {
  id: string | number;
  createdAt?: Date;
  updatedAt?: Date;
}

// ===============================
// ELECTRICITY SYSTEM TYPES
// ===============================

export interface ElectricityConsumption {
  id: number;
  slNo: number;
  zone: string;
  type: string;
  muscatBayNumber: string;
  unitName: string;
  category: ElectricityCategory;
  meterAccountNo: string;
  consumption: Record<string, number>; // Month-Year -> consumption
  totalConsumption: number;
}

export type ElectricityCategory = 
  | 'Pumping Station'
  | 'Lifting Station' 
  | 'Street Light'
  | 'Irrigation Tank'
  | 'Actuator DB'
  | 'Apartment'
  | 'Ancillary Building'
  | 'Central Park'
  | 'Village Square'
  | 'Commercial (Bank)'
  | 'Commercial (Kitchen)'
  | 'Landscape Light'
  | 'Beachwell'
  | 'Helipad'
  | 'Other';

export interface ElectricityKPIs {
  totalConsumption: number;
  totalCost: number;
  averageConsumptionPerUnit: number;
  activeMeters: number;
  period: string;
}

// ===============================
// WATER SYSTEM TYPES
// ===============================

export interface WaterSystemData {
  id: number;
  meterLabel: string;
  acctNo: string;
  zone: string;
  type: WaterMeterType;
  parentMeter: string;
  label: WaterMeterLevel;
  consumption: Record<string, number>; // Month-Year -> consumption
  totalConsumption: number;
}

export type WaterMeterType = 
  | 'Main BULK'
  | 'Zone Bulk'
  | 'Retail'
  | 'MB_Common'
  | 'IRR_Servies'
  | 'Residential (Villa)'
  | 'Residential (Apart)';

export type WaterMeterLevel = 'L1' | 'L2' | 'L3' | 'DC';

export interface WaterSystemAnalysis {
  A1_totalSupply: number;
  A2_total: number;
  A3_total: number;
  L2_total: number;
  L3_total: number;
  DC_total: number;
  stage1Loss: number;
  stage2Loss: number;
  totalLoss: number;
  stage1LossPercent: number;
  stage2LossPercent: number;
  totalLossPercent: number;
  systemEfficiency: number;
}

// ===============================
// STP PLANT TYPES
// ===============================

export interface STPPlantData {
  id: number;
  date: string;
  parsedDate: Date | null;
  month: string;
  treatedWater: number;
  tseOutput: number;
  totalInlet: number;
  tankersDischarge: number;
  expectedTankerVolume: number;
  directSewage: number;
  treatmentEfficiency: number;
  irrigationEfficiency: number;
  tankerPercentage: number;
}

export interface STPPlantKPIs {
  avgTreatedWater: number;
  avgTseOutput: number;
  avgEfficiency: number;
  totalTankersDischarge: number;
  avgTankerPercentage: number;
  capacityUtilization: number;
  totalDays: number;
  totalTreatedWater: number;
  totalTseOutput: number;
  totalInputProcess: number;
  avgTotalInput: number;
}

export interface STPMonthlyData {
  month: string;
  treatedWater: number;
  tseOutput: number;
  totalInlet: number;
  tankersDischarge: number;
  directSewage: number;
  days: number;
  avgDaily: number;
  efficiency: number;
  irrigationEff: number;
  capacityUtilization: number;
}

// ===============================
// CONTRACTOR TRACKER TYPES
// ===============================

export interface ContractorData extends BaseEntity {
  contractor: string;
  serviceProvided: string;
  status: ContractStatus;
  contractType: ContractType;
  startDate: string;
  endDate: string;
  monthlyContract: string;
  yearlyTotal: string;
  note: string;
}

export type ContractStatus = 'Active' | 'Expired' | 'Pending' | 'Suspended';
export type ContractType = 'Contract' | 'PO' | 'Service Agreement';

export interface ContractorKPIs {
  totalContractors: number;
  activeContracts: number;
  expiredContracts: number;
  totalYearlyValue: number;
  totalMonthlyValue: number;
  averageContractValue: number;
}

// ===============================
// COMMON CHART & UI TYPES
// ===============================

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}

export interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: string;
  trendColor?: string;
  icon?: any;
  iconBgColor?: string;
  isLoading?: boolean;
}

export interface FilterOptions {
  selectedMonth: string;
  selectedCategory: string;
  selectedZone: string;
  selectedMetric: string;
}

// ===============================
// DASHBOARD & ANALYTICS TYPES
// ===============================

export interface DashboardData {
  electricity: ElectricityKPIs;
  water: WaterSystemAnalysis;
  stp: STPPlantKPIs;
  contractors: ContractorKPIs;
  lastUpdated: Date;
}

export interface AnalyticsInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'insight';
  module: 'electricity' | 'water' | 'stp' | 'contractor';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
}

// ===============================
// API RESPONSE TYPES
// ===============================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
