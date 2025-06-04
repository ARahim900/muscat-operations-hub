// ===============================
// CONTRACTOR TRACKER DATA STORE
// Enhanced with actual Muscat Bay contractor data
// ===============================

import { ContractorData, ContractStatus, ContractType } from '../types';

export const CONTRACTOR_DATA: ContractorData[] = [
  {
    id: 'kone-assarain-llc',
    contractor: 'KONE Assarain LLC',
    serviceProvided: 'Lift Maintenance Services',
    status: 'Active' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    monthlyContract: '525 OMR',
    yearlyTotal: '11,550 OMR (Excl VAT)',
    note: '',
  },
  {
    id: 'owatco',
    contractor: 'Oman Water Treatment Company (OWATCO)',
    serviceProvided: 'Comprehensive STP Operation and Maintenance',
    status: 'Active' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2024-01-26',
    endDate: '2029-01-25',
    monthlyContract: '3,103.8 OMR',
    yearlyTotal: '37,245.4 OMR (Inc VAT)',
    note: 'New contract due to early termination of previous Contract with Celar Company',
  },
  {
    id: 'kalhat-fm',
    contractor: 'Kalhat',
    serviceProvided: 'Facility Management (FM)',
    status: 'Active' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2024-05-07',
    endDate: '2030-05-06',
    monthlyContract: '32,200.8 OMR',
    yearlyTotal: '386,409.718 OMR (Inc VAT)',
    note: 'New contract overlapping with COMO',
  },
  {
    id: 'future-cities-tadoom',
    contractor: 'Future Cities S.A.O.C (Tadoom)',
    serviceProvided: 'Supply and Installation of Smart Water Meters, Billing for Water Consumption',
    status: 'Active' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2024-09-24',
    endDate: '2032-09-23',
    monthlyContract: '2.7 Per Meter Collection',
    yearlyTotal: '184.3 OMR',
    note: 'New contract replacing OIFC',
  },
  {
    id: 'muna-noor-pest-control',
    contractor: 'Muna Noor International LLC',
    serviceProvided: 'Pest Control Services',
    status: 'Active' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2024-07-01',
    endDate: '2026-06-30',
    monthlyContract: '1,400 OMR/Month Inc VAT',
    yearlyTotal: '16,800 OMR (Inc VAT)',
    note: '',
  },
  {
    id: 'celar-water',
    contractor: 'Celar Water',
    serviceProvided: 'Comprehensive STP Operation and Maintenance',
    status: 'Expired' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2021-01-16',
    endDate: '2025-01-15',
    monthlyContract: '4,439 OMR/Month',
    yearlyTotal: '53,268 OMR',
    note: 'Transitioned to OWATCO before contract end',
  },
  {
    id: 'gulf-expert',
    contractor: 'Gulf Expert',
    serviceProvided: 'Chillers, BMS & Pressurisation Units',
    status: 'Active' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2024-06-03',
    endDate: '2025-06-02',
    monthlyContract: '770 OMR',
    yearlyTotal: '9,240 OMR (Inc VAT)',
    note: '',
  },
  {
    id: 'advanced-tech-projects',
    contractor: 'Advanced Technology and Projects Company',
    serviceProvided: 'BMS Non-Comprehensive Annual Maintenance',
    status: 'Expired' as ContractStatus,
    contractType: 'PO' as ContractType,
    startDate: '2023-03-26',
    endDate: '2024-03-25',
    monthlyContract: '316.67 OMR',
    yearlyTotal: '3,800 OMR/Year',
    note: '',
  },
  {
    id: 'al-naba-services',
    contractor: 'Al Naba Services LLC',
    serviceProvided: 'Garbage Removal Services',
    status: 'Expired' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2023-04-02',
    endDate: '2024-04-01',
    monthlyContract: '32 OMR/Skip Trip',
    yearlyTotal: '384 OMR (Estimated)',
    note: '',
  },
  {
    id: 'bahwan-engineering',
    contractor: 'Bahwan Engineering Company LLC',
    serviceProvided: 'Maintenance of Fire Alarm & Fire Fighting Equipment',
    status: 'Active' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2024-11-01',
    endDate: '2025-10-31',
    monthlyContract: '743.8 OMR',
    yearlyTotal: '8,925.6 OMR (Inc VAT)',
    note: '',
  },
  {
    id: 'oman-pumps-manufacturing',
    contractor: 'Oman Pumps Manufacturing Co.',
    serviceProvided: 'Supply, Installation, and Commissioning of Pumps',
    status: 'Expired' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2020-02-23',
    endDate: '2025-07-22',
    monthlyContract: 'N/A',
    yearlyTotal: '37,800 OMR on Delivery',
    note: '',
  },
  {
    id: 'rimal-global',
    contractor: 'Rimal Global',
    serviceProvided: 'Provision of Services',
    status: 'Expired' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2021-11-22',
    endDate: '2031-11-21',
    monthlyContract: 'N/A',
    yearlyTotal: '51,633 OMR on Delivery',
    note: '',
  },
  {
    id: 'como-fm',
    contractor: 'COMO',
    serviceProvided: 'Facility Management (FM)',
    status: 'Expired' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2022-03-01',
    endDate: '2025-02-28',
    monthlyContract: '44,382 OMR/Month',
    yearlyTotal: '532,584 OMR',
    note: 'Transitioned to Kalhat before contract end',
  },
  {
    id: 'muscat-electronics-daikin',
    contractor: 'Muscat Electronics LLC',
    serviceProvided: 'Daikin AC Chillers (Sale Center) Maintenance Services',
    status: 'Expired' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '2023-03-26',
    endDate: '2024-04-25',
    monthlyContract: '199.5 OMR/Service Quarter',
    yearlyTotal: '798 OMR',
    note: 'Nearing expiration, review for renewal needed',
  },
  {
    id: 'uni-gaz',
    contractor: 'Uni Gaz',
    serviceProvided: 'Gas Refilling for Flame Operation at Muscat Bay Main Entrance',
    status: 'Expired' as ContractStatus,
    contractType: 'PO' as ContractType,
    startDate: '',
    endDate: '',
    monthlyContract: 'N/A',
    yearlyTotal: 'N/A',
    note: '',
  },
  {
    id: 'genetcoo-york',
    contractor: 'Genetcoo',
    serviceProvided: 'York AC Chillers (Zone 01) Maintenance Services',
    status: 'Expired' as ContractStatus,
    contractType: 'Contract' as ContractType,
    startDate: '',
    endDate: '',
    monthlyContract: 'N/A',
    yearlyTotal: 'N/A',
    note: '',
  },
  {
    id: 'nmc-lagoon',
    contractor: 'NMC',
    serviceProvided: 'Lagoon Main Two Drain Pipes Cleaning',
    status: 'Active' as ContractStatus,
    contractType: 'PO' as ContractType,
    startDate: '',
    endDate: '',
    monthlyContract: 'N/A',
    yearlyTotal: 'N/A',
    note: '',
  },
];

// ===============================
// CONTRACTOR ANALYTICS
// ===============================

export const getContractorAnalytics = () => {
  const totalContractors = CONTRACTOR_DATA.length;
  const activeContracts = CONTRACTOR_DATA.filter(c => c.status === 'Active').length;
  const expiredContracts = CONTRACTOR_DATA.filter(c => c.status === 'Expired').length;
  const pendingContracts = CONTRACTOR_DATA.filter(c => c.status === 'Pending').length;
  
  // Calculate total values
  const activeContractorsWithValues = CONTRACTOR_DATA.filter(c => 
    c.status === 'Active' && c.yearlyTotal && c.yearlyTotal !== 'N/A'
  );
  
  let totalYearlyValue = 0;
  let totalMonthlyValue = 0;
  
  activeContractorsWithValues.forEach(contractor => {
    // Extract yearly value
    const yearlyMatch = contractor.yearlyTotal.match(/[\d,]+\.?\d*/);
    if (yearlyMatch) {
      const yearlyValue = parseFloat(yearlyMatch[0].replace(/,/g, ''));
      totalYearlyValue += yearlyValue;
    }
    
    // Extract monthly value
    if (contractor.monthlyContract && contractor.monthlyContract !== 'N/A') {
      const monthlyMatch = contractor.monthlyContract.match(/[\d,]+\.?\d*/);
      if (monthlyMatch) {
        const monthlyValue = parseFloat(monthlyMatch[0].replace(/,/g, ''));
        totalMonthlyValue += monthlyValue;
      }
    }
  });
  
  const averageContractValue = activeContractorsWithValues.length > 0 
    ? totalYearlyValue / activeContractorsWithValues.length 
    : 0;
  
  return {
    totalContractors,
    activeContracts,
    expiredContracts,
    pendingContracts,
    totalYearlyValue: Math.round(totalYearlyValue),
    totalMonthlyValue: Math.round(totalMonthlyValue),
    averageContractValue: Math.round(averageContractValue),
  };
};

// ===============================
// CONTRACT STATUS DISTRIBUTION
// ===============================

export const getContractStatusDistribution = () => {
  const statusCount: Record<ContractStatus, number> = {
    'Active': 0,
    'Expired': 0,
    'Pending': 0,
    'Suspended': 0,
  };
  
  CONTRACTOR_DATA.forEach(contractor => {
    statusCount[contractor.status]++;
  });
  
  return Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    value: count,
    color: getStatusColor(status as ContractStatus),
  }));
};

export const getStatusColor = (status: ContractStatus): string => {
  switch (status) {
    case 'Active': return '#10B981';
    case 'Expired': return '#EF4444';
    case 'Pending': return '#F59E0B';
    case 'Suspended': return '#6B7280';
    default: return '#94A3B8';
  }
};

// ===============================
// TOP CONTRACTORS BY VALUE
// ===============================

export const getTopContractorsByValue = (limit = 10) => {
  return CONTRACTOR_DATA
    .filter(c => c.status === 'Active' && c.yearlyTotal && c.yearlyTotal !== 'N/A')
    .map(contractor => {
      const yearlyMatch = contractor.yearlyTotal.match(/[\d,]+\.?\d*/);
      const value = yearlyMatch ? parseFloat(yearlyMatch[0].replace(/,/g, '')) : 0;
      
      return {
        contractor: contractor.contractor,
        service: contractor.serviceProvided,
        value,
        formattedValue: contractor.yearlyTotal,
        contractType: contractor.contractType,
        endDate: contractor.endDate,
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

// ===============================
// CONTRACTS EXPIRING SOON
// ===============================

export const getContractsExpiringSoon = (daysThreshold = 90) => {
  const now = new Date();
  const thresholdDate = new Date();
  thresholdDate.setDate(now.getDate() + daysThreshold);
  
  return CONTRACTOR_DATA
    .filter(contractor => {
      if (contractor.status !== 'Active' || !contractor.endDate) return false;
      
      try {
        const endDate = new Date(contractor.endDate);
        return endDate >= now && endDate <= thresholdDate;
      } catch {
        return false;
      }
    })
    .map(contractor => {
      const endDate = new Date(contractor.endDate);
      const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        ...contractor,
        daysUntilExpiry,
        urgency: daysUntilExpiry <= 30 ? 'high' : daysUntilExpiry <= 60 ? 'medium' : 'low',
      };
    })
    .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
};

// ===============================
// SERVICE CATEGORIES
// ===============================

export const getServiceCategories = () => {
  const categories: Record<string, number> = {};
  
  CONTRACTOR_DATA.forEach(contractor => {
    const service = contractor.serviceProvided.toLowerCase();
    let category = 'Other';
    
    if (service.includes('maintenance') || service.includes('repair')) {
      category = 'Maintenance & Repair';
    } else if (service.includes('fm') || service.includes('facility management')) {
      category = 'Facility Management';
    } else if (service.includes('stp') || service.includes('water') || service.includes('treatment')) {
      category = 'Water & STP';
    } else if (service.includes('security') || service.includes('fire')) {
      category = 'Security & Safety';
    } else if (service.includes('pest') || service.includes('cleaning') || service.includes('garbage')) {
      category = 'Cleaning & Pest Control';
    } else if (service.includes('lift') || service.includes('elevator')) {
      category = 'Vertical Transportation';
    } else if (service.includes('supply') || service.includes('installation')) {
      category = 'Supply & Installation';
    }
    
    categories[category] = (categories[category] || 0) + 1;
  });
  
  return Object.entries(categories).map(([category, count]) => ({
    name: category,
    value: count,
    color: getCategoryColor(category),
  }));
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Maintenance & Repair': '#3B82F6',
    'Facility Management': '#10B981',
    'Water & STP': '#06B6D4',
    'Security & Safety': '#EF4444',
    'Cleaning & Pest Control': '#8B5CF6',
    'Vertical Transportation': '#F59E0B',
    'Supply & Installation': '#84CC16',
    'Other': '#6B7280',
  };
  
  return colors[category] || '#94A3B8';
};

// ===============================
// EXPORT ALL
// ===============================

export {
  CONTRACTOR_DATA as default,
  getContractorAnalytics,
  getContractStatusDistribution,
  getTopContractorsByValue,
  getContractsExpiringSoon,
  getServiceCategories,
};
