// ===============================
// MUSCAT BAY CONSTANTS
// Centralized constants for the Muscat Bay Operations Hub
// ===============================

// Muscat Bay Brand Colors
export const MUSCAT_BAY_COLORS = {
  primary: '#4E4456',        // Main brand color - Deep purple-gray
  primaryLight: '#5f5168',   // Lighter variant for hover states
  primaryDark: '#3B3241',    // Darker variant for active states
  accent: '#A8D5E3',         // Soft teal for highlights
  accentLight: '#C3FBF4',    // Light teal variant
  gold: '#BFA181',           // Muted gold for warnings/accents
  cream: '#F2F0EA',          // Cream background
  navy: '#0A1828',           // Deep classic blue
  
  // Status colors
  success: '#10B981',        // Green for positive metrics
  warning: '#F59E0B',        // Amber for warnings
  info: '#3B82F6',          // Blue for information
  error: '#EF4444',         // Red for errors
  
  // Chart colors palette
  chart: [
    '#6A5ACD', 
    '#FFA07A', 
    '#20B2AA', 
    '#FF69B4', 
    '#9370DB', 
    '#F08080', 
    '#4682B4', 
    '#32CD32', 
    '#FF6347', 
    '#4169E1'
  ]
};

// Operational Constants
export const OPERATIONAL_CONSTANTS = {
  OMR_PER_KWH: 0.025,
  GALLONS_PER_LITER: 0.264172,
  CUBIC_METERS_PER_GALLON: 0.00378541,
  
  // Time constants
  MONTHS_IN_YEAR: 12,
  DAYS_IN_MONTH: 30,
  HOURS_IN_DAY: 24,
  
  // Dashboard refresh intervals (in milliseconds)
  DASHBOARD_REFRESH_INTERVAL: 300000, // 5 minutes
  CHART_REFRESH_INTERVAL: 60000,      // 1 minute
  KPI_REFRESH_INTERVAL: 30000,        // 30 seconds
};

// Application Settings
export const APP_SETTINGS = {
  APP_NAME: 'Muscat Bay Operations Hub',
  APP_VERSION: '1.0.0',
  COMPANY_NAME: 'Muscat Bay',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 25,
  MAX_PAGE_SIZE: 100,
  
  // Chart dimensions
  DEFAULT_CHART_HEIGHT: 350,
  MOBILE_CHART_HEIGHT: 250,
  
  // Table settings
  MAX_TABLE_ROWS: 50,
  DEFAULT_TABLE_ROWS: 20,
};

// Zone Classifications
export const ZONE_TYPES = {
  INFRASTRUCTURE: 'Infrastructure',
  RESIDENTIAL: 'Zone 3',
  CENTRAL_PARK: 'Central Park',
  ANCILLARY: 'Ancillary',
  COMMERCIAL: 'Commercial',
} as const;

// Unit Categories
export const UNIT_CATEGORIES = {
  PUMPING_STATION: 'Pumping Station',
  LIFTING_STATION: 'Lifting Station',
  IRRIGATION_TANK: 'Irrigation Tank',
  ACTUATOR_DB: 'Actuator DB',
  STREET_LIGHT: 'Street Light',
  LANDSCAPE_LIGHT: 'Landscape Light',
  APARTMENT: 'Apartment',
  ANCILLARY_BUILDING: 'Ancillary Building',
  CENTRAL_PARK: 'Central Park',
  VILLAGE_SQUARE: 'Village Square',
  COMMERCIAL_BANK: 'Commercial (Bank)',
  COMMERCIAL_KITCHEN: 'Commercial (Kitchen)',
  BEACHWELL: 'Beachwell',
  HELIPAD: 'Helipad',
  OTHER: 'Other',
} as const;

// Status Types
export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  ERROR: 'error',
  PENDING: 'pending',
  EXCELLENT: 'excellent',
  GOOD: 'good',
  WARNING: 'warning',
  CRITICAL: 'critical',
} as const;

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  ELECTRICITY: '/api/electricity',
  WATER: '/api/water',
  CONTRACTORS: '/api/contractors',
  STP: '/api/stp',
  REPORTS: '/api/reports',
} as const;

// File Export Settings
export const EXPORT_SETTINGS = {
  FILENAME_PREFIX: 'muscat_bay_',
  DATE_FORMAT: 'YYYY-MM-DD',
  SUPPORTED_FORMATS: ['pdf', 'excel', 'csv'] as const,
  MAX_EXPORT_ROWS: 1000,
};

// Responsive Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  ELECTRICITY: {
    EXCELLENT: 0.95,
    GOOD: 0.85,
    WARNING: 0.75,
    CRITICAL: 0.65,
  },
  WATER: {
    EXCELLENT: 0.98,
    GOOD: 0.90,
    WARNING: 0.80,
    CRITICAL: 0.70,
  },
  STP: {
    EXCELLENT: 0.99,
    GOOD: 0.95,
    WARNING: 0.85,
    CRITICAL: 0.75,
  },
} as const;

// Default values
export const DEFAULTS = {
  PAGINATION_SIZE: 20,
  CHART_ANIMATION_DURATION: 300,
  TOAST_DURATION: 5000,
  DEBOUNCE_DELAY: 300,
  
  // Filter defaults
  DEFAULT_MONTH: 'All Months',
  DEFAULT_CATEGORY: 'All Categories',
  DEFAULT_ZONE: 'All Zones',
  DEFAULT_STATUS: 'All Statuses',
} as const;

export default {
  MUSCAT_BAY_COLORS,
  OPERATIONAL_CONSTANTS,
  APP_SETTINGS,
  ZONE_TYPES,
  UNIT_CATEGORIES,
  STATUS_TYPES,
  API_ENDPOINTS,
  EXPORT_SETTINGS,
  BREAKPOINTS,
  PERFORMANCE_THRESHOLDS,
  DEFAULTS,
};
