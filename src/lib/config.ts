// ===============================
// MUSCAT BAY OPERATIONS HUB - CONFIGURATION
// Central configuration hub for the entire application
// ===============================

import { CONSTANTS } from './constants';

// ===============================
// APPLICATION METADATA
// ===============================

export const APP_CONFIG = {
  name: 'Muscat Bay Operations Hub',
  shortName: 'Muscat Bay OMS',
  description: 'Modern SAAS-style operations management system for Muscat Bay utilities and infrastructure',
  version: '2.0.0',
  author: 'Muscat Bay Operations Team',
  url: 'https://operations.muscatbay.com',
  logo: '/images/muscat-bay-logo.png',
  
  // Company Information
  company: {
    name: 'Muscat Bay',
    location: 'Muscat, Oman',
    timezone: 'Asia/Muscat',
    currency: 'OMR',
    website: 'https://muscatbay.com',
  },
  
  // Application Settings
  settings: {
    itemsPerPage: CONSTANTS.UI.ITEMS_PER_PAGE.DEFAULT,
    autoRefreshInterval: 300000, // 5 minutes
    chartAnimationDuration: CONSTANTS.UI.ANIMATIONS.NORMAL,
    enableNotifications: true,
    enableDarkMode: true,
    enableExports: true,
    enableAIAnalysis: true,
  }
} as const;

// ===============================
// MODULE CONFIGURATIONS
// ===============================

export const MODULE_CONFIG = {
  electricity: {
    enabled: true,
    title: 'Electricity Analysis',
    description: 'Power consumption analytics and cost management',
    features: {
      costAnalysis: true,
      aiInsights: true,
      exportData: true,
      realTimeMonitoring: true,
    },
    kpis: {
      targetEfficiency: 85, // %
      costPerKwh: CONSTANTS.RATES.OMR_PER_KWH,
      alertThreshold: 5000, // kWh high consumption
    }
  },
  
  water: {
    enabled: true,
    title: 'Water Management',
    description: 'Hierarchical water distribution and loss analysis',
    features: {
      lossDetection: true,
      hierarchicalAnalysis: true,
      qualityMonitoring: true,
      pressureAlerts: true,
    },
    kpis: {
      maxAcceptableLoss: 15, // %
      targetEfficiency: 85, // %
      pressureRange: CONSTANTS.PLANT.WATER_PRESSURE_RANGE,
    }
  },
  
  stp: {
    enabled: true,
    title: 'STP Plant Operations',
    description: 'Sewage treatment performance and capacity monitoring',
    features: {
      capacityMonitoring: true,
      efficiencyTracking: true,
      tseProduction: true,
      tankerAnalysis: true,
    },
    kpis: {
      designCapacity: CONSTANTS.PLANT.STP_DESIGN_CAPACITY,
      targetEfficiency: CONSTANTS.PLANT.TREATMENT_EFFICIENCY_TARGET,
      tseRecoveryTarget: CONSTANTS.PLANT.TSE_RECOVERY_TARGET,
      highUtilizationThreshold: 85, // %
    }
  },
  
  contractors: {
    enabled: true,
    title: 'Contractor Management',
    description: 'Contract tracking, performance monitoring, and renewal alerts',
    features: {
      expiryAlerts: true,
      performanceTracking: true,
      financialAnalysis: true,
      serviceCategories: true,
    },
    kpis: {
      expiryWarningDays: CONSTANTS.THRESHOLDS.CONTRACTOR.CONTRACT_EXPIRY_WARNING,
      highValueThreshold: CONSTANTS.THRESHOLDS.CONTRACTOR.HIGH_VALUE_CONTRACT,
      activeContractTarget: 15,
    }
  },
  
  anomalyDetection: {
    enabled: true,
    title: 'AI Anomaly Detection',
    description: 'Machine learning-powered anomaly detection and insights',
    features: {
      realTimeDetection: true,
      predictiveAnalysis: true,
      alertSystem: true,
      reportGeneration: true,
    },
    kpis: {
      detectionAccuracy: 95, // %
      falsePositiveRate: 5, // %
      alertResponseTime: 300, // seconds
    }
  }
} as const;

// ===============================
// DASHBOARD CONFIGURATION
// ===============================

export const DASHBOARD_CONFIG = {
  layout: {
    sidebar: {
      collapsible: true,
      defaultCollapsed: false,
      width: {
        expanded: 256, // 16rem
        collapsed: 64,  // 4rem
      }
    },
    
    header: {
      height: 72, // px
      showBreadcrumbs: true,
      showNotifications: true,
      showUserProfile: true,
      showSearch: true,
    },
    
    main: {
      padding: {
        mobile: 16, // px
        desktop: 32, // px
      },
      maxWidth: 1440, // px
    }
  },
  
  widgets: {
    kpiCards: {
      showTrends: true,
      animateOnLoad: true,
      refreshInterval: 60000, // 1 minute
    },
    
    charts: {
      defaultHeight: 350, // px
      enableInteractivity: true,
      showLegend: true,
      showTooltips: true,
      animationDuration: CONSTANTS.UI.ANIMATIONS.NORMAL,
    },
    
    tables: {
      itemsPerPage: CONSTANTS.UI.ITEMS_PER_PAGE.DEFAULT,
      enableSorting: true,
      enableFiltering: true,
      enableExport: true,
    }
  },
  
  notifications: {
    enabled: true,
    position: 'top-right',
    autoHide: true,
    autoHideDelay: 5000, // ms
    maxVisible: 5,
  }
} as const;

// ===============================
// API CONFIGURATION
// ===============================

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: CONSTANTS.API.TIMEOUT,
  retries: CONSTANTS.API.RETRY_ATTEMPTS,
  retryDelay: CONSTANTS.API.RETRY_DELAY,
  
  endpoints: CONSTANTS.API.ENDPOINTS,
  
  // Rate limiting
  rateLimit: {
    requests: 100,
    window: 60000, // 1 minute
  },
  
  // Cache settings
  cache: {
    defaultTTL: 300000, // 5 minutes
    kpiTTL: 60000,      // 1 minute
    staticDataTTL: 3600000, // 1 hour
  },
  
  // Real-time updates
  realTime: {
    enabled: true,
    reconnectDelay: 5000, // ms
    maxReconnectAttempts: 5,
  }
} as const;

// ===============================
// FEATURE FLAGS
// ===============================

export const FEATURE_FLAGS = {
  // Core Features
  enableAIAnalysis: process.env.NEXT_PUBLIC_ENABLE_AI === 'true',
  enableRealTimeUpdates: process.env.NEXT_PUBLIC_ENABLE_REALTIME === 'true',
  enableNotifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS !== 'false',
  enableDarkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false',
  
  // Module Features
  enableElectricityModule: process.env.NEXT_PUBLIC_ENABLE_ELECTRICITY !== 'false',
  enableWaterModule: process.env.NEXT_PUBLIC_ENABLE_WATER !== 'false',
  enableStpModule: process.env.NEXT_PUBLIC_ENABLE_STP !== 'false',
  enableContractorModule: process.env.NEXT_PUBLIC_ENABLE_CONTRACTORS !== 'false',
  enableAnomalyModule: process.env.NEXT_PUBLIC_ENABLE_ANOMALY !== 'false',
  
  // Advanced Features
  enableExports: process.env.NEXT_PUBLIC_ENABLE_EXPORTS !== 'false',
  enableAdvancedAnalytics: process.env.NEXT_PUBLIC_ENABLE_ADVANCED_ANALYTICS === 'true',
  enablePredictiveAnalysis: process.env.NEXT_PUBLIC_ENABLE_PREDICTIONS === 'true',
  enableMobileApp: process.env.NEXT_PUBLIC_ENABLE_MOBILE === 'true',
  
  // Development Features
  enableDevTools: process.env.NODE_ENV === 'development',
  enableDebugMode: process.env.NEXT_PUBLIC_DEBUG === 'true',
  enableMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
} as const;

// ===============================
// ENVIRONMENT CONFIGURATION
// ===============================

export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isPreview: process.env.VERCEL_ENV === 'preview',
  
  // Firebase Configuration
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
  
  // Analytics Configuration
  analytics: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
  
  // Monitoring Configuration
  monitoring: {
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
  }
} as const;

// ===============================
// VALIDATION
// ===============================

export function validateConfig() {
  const errors: string[] = [];
  
  // Check required environment variables
  if (ENV_CONFIG.isProduction) {
    if (!ENV_CONFIG.firebase.apiKey) {
      errors.push('NEXT_PUBLIC_FIREBASE_API_KEY is required in production');
    }
    if (!ENV_CONFIG.firebase.projectId) {
      errors.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID is required in production');
    }
  }
  
  // Validate numeric configurations
  if (API_CONFIG.timeout <= 0) {
    errors.push('API timeout must be positive');
  }
  
  if (DASHBOARD_CONFIG.widgets.charts.defaultHeight <= 0) {
    errors.push('Chart height must be positive');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// ===============================
// CONFIGURATION GETTERS
// ===============================

export function getModuleConfig(moduleId: keyof typeof MODULE_CONFIG) {
  return MODULE_CONFIG[moduleId];
}

export function isFeatureEnabled(feature: keyof typeof FEATURE_FLAGS): boolean {
  return FEATURE_FLAGS[feature] === true;
}

export function getApiEndpoint(endpoint: keyof typeof API_CONFIG.endpoints): string {
  return `${API_CONFIG.baseUrl}${API_CONFIG.endpoints[endpoint]}`;
}

// ===============================
// EXPORT MAIN CONFIGURATION
// ===============================

const config = {
  app: APP_CONFIG,
  modules: MODULE_CONFIG,
  dashboard: DASHBOARD_CONFIG,
  api: API_CONFIG,
  features: FEATURE_FLAGS,
  env: ENV_CONFIG,
  
  // Helper functions
  validate: validateConfig,
  getModule: getModuleConfig,
  isFeatureEnabled,
  getApiEndpoint,
} as const;

export default config;

// Type exports for better TypeScript support
export type AppConfig = typeof APP_CONFIG;
export type ModuleConfig = typeof MODULE_CONFIG;
export type DashboardConfig = typeof DASHBOARD_CONFIG;
export type ApiConfig = typeof API_CONFIG;
export type FeatureFlags = typeof FEATURE_FLAGS;
export type EnvConfig = typeof ENV_CONFIG;
