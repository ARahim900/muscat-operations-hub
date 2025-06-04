// ===============================
// MUSCAT BAY OPERATIONS HUB - CONSTANTS
// ===============================

// ===============================
// BRAND & DESIGN CONSTANTS
// ===============================

export const MUSCAT_BAY_COLORS = {
  // Primary Brand Colors
  primary: '#4E4456',        // Deep purple-gray (main brand)
  primaryLight: '#5f5168',   // Muted deep purple/gray from logo
  primaryDark: '#3B3241',    // Darker variant
  
  // Secondary Colors
  accent: '#A8D5E3',         // Soft teal for highlights
  success: '#10B981',        // Green for positive metrics
  warning: '#BFA181',        // Muted gold for warnings
  info: '#0A1828',          // Deep classic blue
  error: '#EF4444',         // Red for errors
  
  // Background Colors
  white: '#FFFFFF',
  offWhite: '#FFFEFF',
  cream: '#F2F0EA',
  
  // Chart Color Palette
  chart: [
    '#4E4456', '#A8D5E3', '#BFA181', '#0A1828', 
    '#5f5168', '#C3FBF4', '#F2F0EA', '#10B981', 
    '#EF4444', '#6A5ACD'
  ]
} as const;

// ===============================
// OPERATIONAL CONSTANTS
// ===============================

export const PLANT_SPECIFICATIONS = {
  STP_DESIGN_CAPACITY: 750, // m³/day
  WATER_PRESSURE_RANGE: { min: 1.5, max: 3.0 }, // bar
  TREATMENT_EFFICIENCY_TARGET: 90, // %
  TSE_RECOVERY_TARGET: 85, // %
} as const;

export const UTILITY_RATES = {
  OMR_PER_KWH: 0.025,        // Electricity rate
  WATER_RATE_TIER_1: 0.150,  // OMR per m³ (0-50 m³)
  WATER_RATE_TIER_2: 0.200,  // OMR per m³ (51-100 m³)
  WATER_RATE_TIER_3: 0.300,  // OMR per m³ (100+ m³)
} as const;

// ===============================
// SYSTEM CATEGORIES
// ===============================

export const ELECTRICITY_CATEGORIES = [
  'Pumping Station',
  'Lifting Station', 
  'Street Light',
  'Irrigation Tank',
  'Actuator DB',
  'Apartment',
  'Ancillary Building',
  'Central Park',
  'Village Square',
  'Commercial (Bank)',
  'Commercial (Kitchen)',
  'Landscape Light',
  'Beachwell',
  'Helipad',
  'Other'
] as const;

export const WATER_METER_TYPES = [
  'Main BULK',
  'Zone Bulk',
  'Retail',
  'MB_Common',
  'IRR_Servies',
  'Residential (Villa)',
  'Residential (Apart)'
] as const;

export const WATER_METER_LEVELS = ['L1', 'L2', 'L3', 'DC'] as const;

export const CONTRACT_STATUSES = ['Active', 'Expired', 'Pending', 'Suspended'] as const;
export const CONTRACT_TYPES = ['Contract', 'PO', 'Service Agreement'] as const;

// ===============================
// DATE & TIME CONSTANTS
// ===============================

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  MONTH_YEAR: 'MMM-yy',
  FULL: 'EEEE, MMMM dd, yyyy',
} as const;

export const TIMEZONE = 'Asia/Muscat';

// ===============================
// PERFORMANCE THRESHOLDS
// ===============================

export const PERFORMANCE_THRESHOLDS = {
  ELECTRICITY: {
    HIGH_CONSUMPTION: 5000, // kWh/month
    EFFICIENCY_GOOD: 85,    // %
    EFFICIENCY_EXCELLENT: 95, // %
  },
  WATER: {
    HIGH_LOSS: 15,          // % loss threshold
    EFFICIENCY_GOOD: 85,    // %
    PRESSURE_LOW: 1.5,      // bar
    PRESSURE_HIGH: 3.5,     // bar
  },
  STP: {
    CAPACITY_HIGH: 85,      // % utilization
    EFFICIENCY_TARGET: 90,  // % treatment efficiency
    TSE_TARGET: 85,         // % recovery
  },
  CONTRACTOR: {
    CONTRACT_EXPIRY_WARNING: 90, // days before expiry
    HIGH_VALUE_CONTRACT: 50000,  // OMR annually
  }
} as const;

// ===============================
// API CONFIGURATION
// ===============================

export const API_ENDPOINTS = {
  ELECTRICITY: '/api/electricity',
  WATER: '/api/water',
  STP: '/api/stp',
  CONTRACTORS: '/api/contractors',
  ANALYTICS: '/api/analytics',
  DASHBOARD: '/api/dashboard',
} as const;

export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// ===============================
// UI CONSTANTS
// ===============================

export const ITEMS_PER_PAGE = {
  DEFAULT: 10,
  SMALL: 5,
  LARGE: 25,
  CONTRACTORS: 15,
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ===============================
// MODULE NAVIGATION
// ===============================

export const MAIN_NAVIGATION = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    description: 'Overview of all systems'
  },
  {
    id: 'electricity-analysis',
    name: 'Electricity System',
    path: '/electricity-analysis',
    icon: 'Zap',
    description: 'Power consumption analytics'
  },
  {
    id: 'water-analysis',
    name: 'Water Analysis',
    path: '/water-analysis',
    icon: 'Droplets',
    description: 'Water distribution & loss analysis'
  },
  {
    id: 'stp-plant',
    name: 'STP Plant',
    path: '/stp-plant',
    icon: 'Combine',
    description: 'Sewage treatment performance'
  },
  {
    id: 'contractor-tracker',
    name: 'Contractor Tracker',
    path: '/contractor-tracker',
    icon: 'UserCheck',
    description: 'Contract management & tracking'
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection',
    path: '/anomaly-detection',
    icon: 'AlertTriangle',
    description: 'AI-powered anomaly detection'
  }
] as const;

// ===============================
// STATUS INDICATORS
// ===============================

export const STATUS_COLORS = {
  excellent: '#10B981',
  good: '#3B82F6',
  warning: '#F59E0B',
  critical: '#EF4444',
  offline: '#6B7280',
} as const;

export const STATUS_LABELS = {
  excellent: 'Excellent',
  good: 'Good',
  warning: 'Warning',
  critical: 'Critical',
  offline: 'Offline',
} as const;

// ===============================
// EXPORT ALL CONSTANTS
// ===============================

export const CONSTANTS = {
  COLORS: MUSCAT_BAY_COLORS,
  PLANT: PLANT_SPECIFICATIONS,
  RATES: UTILITY_RATES,
  CATEGORIES: {
    ELECTRICITY: ELECTRICITY_CATEGORIES,
    WATER_TYPES: WATER_METER_TYPES,
    WATER_LEVELS: WATER_METER_LEVELS,
    CONTRACT_STATUSES,
    CONTRACT_TYPES,
  },
  DATES: DATE_FORMATS,
  THRESHOLDS: PERFORMANCE_THRESHOLDS,
  API: API_CONFIG,
  UI: {
    ITEMS_PER_PAGE,
    ANIMATIONS: ANIMATION_DURATIONS,
    BREAKPOINTS,
  },
  NAVIGATION: MAIN_NAVIGATION,
  STATUS: {
    COLORS: STATUS_COLORS,
    LABELS: STATUS_LABELS,
  }
} as const;
