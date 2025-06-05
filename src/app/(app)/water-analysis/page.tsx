'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Label as RechartsLabel, Area } from 'recharts';
import { Search, Bell, ChevronDown, SlidersHorizontal, Share2, LayoutDashboard, BarChart2, List, Zap, TrendingUp, Users2, Power, DollarSign, Filter, Activity, Droplets, Combine, UserCheck, Columns, Sparkles, X, CalendarDays, Building, Menu, Moon, Sun, Download, Settings, AlertCircle, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

// ===============================
// DESIGN SYSTEM & CONSTANTS
// ===============================

const COLORS = {
  primary: '#4E4456',
  primaryLight: '#7E708A',
  primaryDark: '#3B3241',
  accent: '#6A5ACD',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  error: '#EF4444',
  chart: ['#6A5ACD', '#FFA07A', '#20B2AA', '#FF69B4', '#9370DB', '#F08080', '#4682B4', '#32CD32', '#FF6347', '#4169E1']
};

// ===============================
// WATER SYSTEM DATA
// ===============================

const waterRawDataString = `Meter Label,Acct #,Zone,Type,Parent Meter,Label,Jan-24,Feb-24,Mar-24,Apr-24,May-24,Jun-24,Jul-24,Aug-24,Sep-24,Oct-24,Nov-24,Dec-24,Jan-25,Feb-25,Mar-25,Apr-25
Main Bulk (NAMA),C43659,Main Bulk,Main BULK,NAMA,L1,32803,27996,23860,31869,30737,41953,35166,35420,41341,31519,35290,36733,32580,44043,34915,46039
Village Square (Zone Bulk),4300335,Zone_VS,Zone Bulk,Main Bulk (NAMA),L2,819,698,595,795,768,1049,879,885,1033,787,882,918,814,1101,873,1150
ZONE 8 (Bulk Zone 8),4300342,Zone_08,Zone Bulk,Main Bulk (NAMA),L2,1891,1612,1373,1835,1769,2411,2023,2030,2371,1811,2026,2106,1871,2533,2010,2649
ZONE 3A (Bulk Zone 3A),4300343,Zone_03_(A),Zone Bulk,Main Bulk (NAMA),L2,4267,3637,3098,4142,3996,5449,4571,4592,5360,4095,4583,4765,4232,5728,4545,5994
ZONE 3B (Bulk Zone 3B),4300344,Zone_03_(B),Zone Bulk,Main Bulk (NAMA),L2,4016,3423,2916,3898,3760,5127,4299,4319,5044,3854,4313,4483,3982,5389,4277,5639
ZONE 5 (Bulk Zone 5),4300345,Zone_05,Zone Bulk,Main Bulk (NAMA),L2,2893,2465,2100,2807,2708,3693,3099,3114,3635,2777,3107,3230,2869,3883,3082,4063
ZONE FM ( BULK ZONE FM ),4300346,Zone_01_(FM),Zone Bulk,Main Bulk (NAMA),L2,1513,1289,1098,1468,1416,1931,1620,1627,1900,1452,1624,1688,1499,2029,1611,2124
Hotel Main Building,4300334,MAIN,Retail,Main Bulk (NAMA),DC,8451,7199,6131,8201,7908,10784,9046,9085,10609,8105,9070,9427,8370,11327,8996,11857
Al Adrak Construction,4300347,Zone_01_(FM),Retail,Main Bulk (NAMA),DC,1134,966,823,1100,1061,1447,1214,1220,1425,1089,1218,1266,1124,1521,1207,1591
Community Mgmt - Technical Zone STP,4300336,Zone_01_(FM),MB_Common,Main Bulk (NAMA),DC,2567,2187,1863,2492,2404,3280,2752,2764,3227,2467,2760,2870,2548,3447,2736,3606
Irrigation Tank 01 (Inlet),4300323,Zone_01_(FM),IRR_Servies,Main Bulk (NAMA),DC,3456,2943,2507,3353,3233,4409,3698,3715,4337,3314,3709,3856,3424,4633,3679,4849
PHASE 02 MAIN ENTRANCE,4300338,Zone_01_(FM),MB_Common,Main Bulk (NAMA),DC,567,483,412,551,531,724,607,610,713,545,610,634,563,762,605,798
Irrigation Tank 04 Z08,4300294,Zone_08,IRR_Servies,Main Bulk (NAMA),DC,2789,2376,2024,2707,2609,3559,2985,2999,3502,2677,2995,3114,2765,3742,2970,3915
Sales Center Common Building,4300295,MAIN,MB_Common,Main Bulk (NAMA),DC,1234,1051,896,1199,1156,1576,1322,1328,1551,1186,1326,1379,1225,1657,1316,1734
Building (Security),4300297,MAIN,MB_Common,Main Bulk (NAMA),DC,678,577,492,658,635,866,726,730,852,651,728,757,673,910,723,953
Building (ROP),4300299,MAIN,MB_Common,Main Bulk (NAMA),DC,456,388,331,442,427,582,488,490,573,438,490,509,452,612,486,641
Irrigation Controller UP,4300340,Zone_03_(A),IRR_Servies,Main Bulk (NAMA),DC,1876,1598,1361,1821,1756,2395,2009,2018,2357,1801,2016,2095,1860,2518,1999,2635
Irrigation Controller DOWN,4300341,Zone_03_(B),IRR_Servies,Main Bulk (NAMA),DC,1567,1335,1137,1521,1467,2001,1679,1686,1969,1505,1684,1751,1555,2104,1671,2202
Al Adrak Camp,4300348,Zone_01_(FM),Retail,Main Bulk (NAMA),DC,789,672,573,766,739,1008,846,849,992,758,848,882,783,1059,841,1108
Z5-17,4300001,Zone_05,Residential (Villa),ZONE 5 (Bulk Zone 5),L3,99,51,53,62,135,140,34,132,63,103,54,148,112,80,81,90
Z3-42 (Villa),4300002,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,61,33,36,47,39,42,25,20,44,57,51,75,32,46,19,62
Z3-52 Villa,4300103,Zone_03_(A),Residential (Villa),ZONE 3A (BULK ZONE 3A),L3,67,64,66,70,75,72,73,76,70,73,72,69,73,70,75,78
Z3-58(3B) Building,4300104,Zone_03_(B),Residential (Apart),ZONE 3B (BULK ZONE 3B),L3,156,150,153,164,175,168,171,178,164,171,169,162,171,164,175,181
Z8-12 Villa,4300108,Zone_08,Residential (Villa),ZONE 8 (Bulk Zone 8),L3,134,128,131,140,149,143,146,152,140,146,144,138,146,140,149,154
Coffee Shop VS,4300110,Village_Square,Retail,Village Square (Zone Bulk),L3,234,225,230,246,263,252,257,268,246,257,254,244,257,246,263,271
Supermarket VS,4300111,Village_Square,Retail,Village Square (Zone Bulk),L3,456,438,447,478,511,491,501,523,478,501,494,474,501,478,511,527`;

interface WaterDataRow {
  "Meter Label": string;
  "Acct #": string;
  Zone: string;
  Type: string;
  "Parent Meter": string;
  Label: string;
  [month: string]: string | number; // For the monthly consumption data
}

interface ParsedWaterData {
  id: number;
  meterLabel: string;
  acctNo: string;
  zone: string;
  type: string;
  parentMeter: string;
  label: string;
  consumption: { [key: string]: number }; // Use index signature for dynamic month keys
  totalConsumption: number;
}

const parseWaterSystemData = (rawData: string): ParsedWaterData[] => {
  const lines = rawData.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthColumns = headers.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split(',').map(v => v.trim());
    const consumption: { [key: string]: number } = {};
    let totalConsumption = 0;

    monthColumns.forEach((month, i) => {
      const consumptionValue = parseFloat(values[6 + i]) || 0;
      consumption[month] = consumptionValue;
      totalConsumption += consumptionValue;
    });

    return {
      id: index + 1,
      meterLabel: values[0] || 'N/A',
      acctNo: values[1] || 'N/A',
      zone: values[2] || 'N/A',
      type: values[3] || 'N/A',
      parentMeter: values[4] || 'N/A',
      label: values[5] || 'N/A',
      consumption: consumption,
      totalConsumption: parseFloat(totalConsumption.toFixed(2)),
    };
  });
};

const waterSystemData: ParsedWaterData[] = parseWaterSystemData(waterRawDataString);
const waterMonthsAvailable = waterSystemData.length > 0 && waterSystemData[0].consumption ? Object.keys(waterSystemData[0].consumption) : [];

// Add verification function
const verifyMonthlyTotals = () => {
  const monthlyTotals: { [key: string]: number } = {};
  
  waterSystemData.forEach(item => {
    Object.entries(item.consumption).forEach(([month, value]) => {
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += value;
    });
  });

  return Object.entries(monthlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({
      month,
      total: Math.round(total)
    }));
};

// Log verification results
console.log('Monthly Totals Verification:', verifyMonthlyTotals());

// ===============================
// SHARED COMPONENTS
// ===============================

interface WaterSummaryCardProps {
  title: string;
  value: string | number;
  icon: any; // Adjust with the correct LucideIcon type if available
  unit: string;
  trend?: string;
  trendColor?: string;
  iconBgColor?: string;
  isLoading?: boolean;
}

const WaterSummaryCard: React.FC<WaterSummaryCardProps> = ({ title, value, icon, unit, trend, trendColor, iconBgColor, isLoading }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-slate-500 font-semibold text-md dark:text-slate-400">{title}</h3>
        <div className={`p-3 rounded-full text-white shadow-md`} style={{backgroundColor: iconBgColor || COLORS.primary }}>
          <IconComponent size={22} />
        </div>
      </div>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-24 mb-2 dark:bg-slate-700"></div>
          <div className="h-4 bg-slate-200 rounded w-16 dark:bg-slate-700"></div>
        </div>
      ) : (
        <>
          <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1.5 dark:text-slate-100">
            {value} <span className="text-base font-medium text-slate-500 dark:text-slate-400">{unit}</span>
          </p>
          {trend && <p className={`text-xs sm:text-sm font-medium ${trendColor}`}>{trend}</p>}
        </>
      )}
    </div>
  );
};

interface WaterChartWrapperProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
}

const WaterChartWrapper: React.FC<WaterChartWrapperProps> = ({ title, children, subtitle, actions }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex space-x-2">{actions}</div>}
    </div>
    <div className="mt-4" style={{ height: '350px' }}>
      {children}
    </div>
  </div>
);

interface WaterStyledSelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  id: string;
  icon?: any; // Adjust with the correct LucideIcon type if available
  disabled?: boolean;
  className?: string;
}

const WaterStyledSelect: React.FC<WaterStyledSelectProps> = ({
    label,
    value,
    onChange,
    options,
    id,
    icon: Icon,
    disabled,
    className
  }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-300">{label}</label>
            <div className="relative">
                <select
                  id={id}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  className={cn(
                    "appearance-none w-full p-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:outline-none bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:ring-primaryLight",
                    className
                  )}
                >
                    {options.map(option => ( <option key={option.value} value={option.value}>{option.label}</option> ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 dark:text-slate-400">
                    {Icon ? <Icon size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>
        </div>
    );
  };

// ===============================
// WATER ANALYSIS MODULE
// ===============================

const WaterAnalysisModule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWaterMonth, setSelectedWaterMonth] = useState(waterMonthsAvailable.length > 0 ? waterMonthsAvailable[waterMonthsAvailable.length -1] : 'Mar-25');
  const [activeWaterSubSection, setActiveWaterSubSection] = useState('Overview');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [isClientDarkMode, setIsClientDarkMode] = useState(false);

  useEffect(() => {
    setIsClientDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Water System Calculations based on hierarchical structure
  const waterCalculations = useMemo(() => {
    const monthData = selectedWaterMonth;
    
    const mainBulkMeter = waterSystemData.find(item => item.label === 'L1');
    const A1_totalSupply = mainBulkMeter ? mainBulkMeter.consumption[monthData] || 0 : 0;

    const zoneBulkMeters = waterSystemData.filter(item => item.label === 'L2');
    const directConnections = waterSystemData.filter(item => item.label === 'DC');
    const L2_total = zoneBulkMeters.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);
    const DC_total = directConnections.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);
    const A2_total = L2_total + DC_total;

    const endUserMeters = waterSystemData.filter(item => item.label === 'L3');
    const L3_total = endUserMeters.reduce((sum, meter) => sum + (meter.consumption[monthData] || 0), 0);
    const A3_total = L3_total + DC_total; 

    const stage1Loss = A1_totalSupply - A2_total;
    const stage2Loss = L2_total - L3_total; 
    const totalLoss = A1_totalSupply - A3_total;
    
    const stage1LossPercent = A1_totalSupply > 0 ? (stage1Loss / A1_totalSupply) * 100 : 0;
    const stage2LossPercent = L2_total > 0 ? (stage2Loss / L2_total) * 100 : 0;
    const totalLossPercent = A1_totalSupply > 0 ? (totalLoss / A1_totalSupply) * 100 : 0;
    const systemEfficiency = 100 - Math.abs(totalLossPercent);

    return {
      A1_totalSupply, A2_total, A3_total, L2_total, L3_total, DC_total,
      stage1Loss, stage2Loss, totalLoss,
      stage1LossPercent, stage2LossPercent, totalLossPercent, systemEfficiency,
      zoneBulkMeters, directConnections, endUserMeters
    };
  }, [selectedWaterMonth]);

  const monthlyWaterTrendData = useMemo(() => {
    return waterMonthsAvailable.map(month => {
      const mainBulkMeter = waterSystemData.find(item => item.label === 'L1');
      const A1_supply = mainBulkMeter ? mainBulkMeter.consumption[month] || 0 : 0;
      
      const L2_meters = waterSystemData.filter(item => item.label === 'L2');
      const DC_meters = waterSystemData.filter(item => item.label === 'DC');
      const L2_total = L2_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
      const DC_total = DC_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
      const A2_total = L2_total + DC_total;

      const L3_meters = waterSystemData.filter(item => item.label === 'L3');
      const L3_total = L3_meters.reduce((sum, meter) => sum + (meter.consumption[month] || 0), 0);
      const A3_total = L3_total + DC_total;

      return {
        name: month.replace('-24', '').replace('-25', ''),
        A1: A1_supply, A2: A2_total, A3: A3_total
      };
    });
  }, []);

  const zoneConsumptionData = useMemo(() => {
    const monthData = selectedWaterMonth;
    const zoneData: { [key: string]: { zone: string; consumption: number; type: string } } = {};

    const L2_meters = waterSystemData.filter(item => item.label === 'L2');
    L2_meters.forEach(meter => {
      const zone = meter.zone;
      if (!zoneData[zone]) {
        zoneData[zone] = { zone: zone, consumption: 0, type: 'Zone Bulk' };
      }
      zoneData[zone].consumption += meter.consumption[monthData] || 0;
    });

    // Add other meter types to zoneData as needed, ensuring they have the same structure
    const DC_meters = waterSystemData.filter(item => item.label === 'DC');
    DC_meters.forEach(meter => {
      const zone = meter.zone; // Assuming DC meters also have a zone property
       if (!zoneData[zone]) {
        zoneData[zone] = { zone: zone, consumption: 0, type: meter.type || 'Direct Connection' }; // Use meter.type or a default
      }
       zoneData[zone].consumption += meter.consumption[monthData] || 0;
    });

    // Filter out zones if a specific zone is selected
    const filteredZoneData = selectedZone === 'All Zones'
        ? Object.values(zoneData)
        : Object.values(zoneData).filter(z => z.zone === selectedZone);

    return filteredZoneData.map(zone => ({
      ...zone,
      name: zone.zone, // Add a name property for charts
      value: zone.consumption, // Add a value property for charts
    }));
  }, [selectedWaterMonth, selectedZone, waterSystemData]); // Added waterSystemData and selectedZone to dependencies

  const topWaterConsumers = useMemo(() => {
    const monthData = selectedWaterMonth;
    return waterSystemData
      .filter(item => item.consumption[monthData] > 0)
      .map(item => ({
        name: item.meterLabel,
        consumption: item.consumption[monthData] || 0,
        type: item.type,
        zone: item.zone,
        label: item.label
      }))
      .sort((a, b) => b.consumption - a.consumption)
      .slice(0, 10);
  }, [selectedWaterMonth]);

  const WaterSubNav = () => {
    const isClientDarkMode = typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false;
    const waterSubSections = [
      { id: 'Overview', name: 'Overview', icon: LayoutDashboard },
      { id: 'Detailed Analysis', name: 'Detailed Analysis', icon: BarChart2 },
      { id: 'Meter Data', name: 'Meter Data', icon: List },
    ];

    return (
        <div className="mb-6 print:hidden flex justify-center">
            <div className="bg-background shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-border dark:bg-slate-800 dark:border-slate-700">
                {waterSubSections.map((tab) => {
                    const isActive = activeWaterSubSection === tab.id;
                    return ( 
                      <button 
                        key={tab.id} 
                        onClick={() => setActiveWaterSubSection(tab.id)} 
                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105`} 
                        style={{ 
                            backgroundColor: isActive ? COLORS.primary : 'transparent', 
                            color: isActive ? 'white' : (isClientDarkMode ? COLORS.primaryLight : COLORS.primaryDark), 
                        }} 
                        onMouseOver={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = COLORS.primaryLight; e.currentTarget.style.color = 'white';} }} 
                        onMouseOut={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = (isClientDarkMode ? COLORS.primaryLight : COLORS.primaryDark);}}}>
                        <tab.icon size={18} style={{ color: isActive ? 'white' : COLORS.primary }}/> 
                        <span>{tab.name}</span> 
                      </button> 
                    );
                })}
            </div>
        </div>
    );
  };

  const WaterFilterBar = () => {
    const monthOptions = [{ value: "All Months", label: "All Months" }, ...waterMonthsAvailable.map(m => ({ value: m, label: m }))];
    const zoneOptions = [{ value: "All Zones", label: "All Zones" }, ...[...new Set(waterSystemData.map(d => d.zone))].filter(Boolean).sort().map(z => ({ value: z, label: z }))];
    
    return (
        <div className="bg-white shadow p-4 rounded-lg mb-6 print:hidden fixed top-4 left-4 right-4 z-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                <WaterStyledSelect 
                  id="waterMonthFilter" 
                  label="Filter by Month" 
                  value={selectedWaterMonth} 
                  onChange={(e) => setSelectedWaterMonth(e.target.value)} 
                  options={monthOptions} 
                  icon={CalendarDays}
                />
                <WaterStyledSelect 
                  id="waterZoneFilter" 
                  label="Filter by Zone" 
                  value={selectedZone} 
                  onChange={(e) => setSelectedZone(e.target.value)} 
                  options={zoneOptions} 
                  icon={Building}
                  disabled={zoneOptions.length <= 1}
                />
                <button 
                  onClick={() => { setSelectedWaterMonth('All Months'); setSelectedZone('All Zones'); }} 
                  className="text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 h-[46px] w-full lg:w-auto hover:shadow-lg" 
                  style={{ backgroundColor: COLORS.primaryDark }} 
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.primary} 
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.primaryDark}
                > 
                  <Filter size={16}/> 
                  <span>Reset Filters</span> 
                </button>
            </div>
        </div>
    );
  };

  const a2DistributionData = useMemo(() => {
    const monthData = selectedWaterMonth;
    const typeBreakdown: { [key: string]: number } = {};
    const zoneBreakdown: { [key: string]: number } = {};

    // Calculate type breakdown
    waterSystemData.forEach(item => {
      if (item.label === 'L2' || item.label === 'DC') {
        const type = item.type;
        if (!typeBreakdown[type]) {
          typeBreakdown[type] = 0;
        }
        typeBreakdown[type] += item.consumption[monthData] || 0;

        // Calculate zone breakdown
        const zone = item.zone;
        if (!zoneBreakdown[zone]) {
          zoneBreakdown[zone] = 0;
        }
        zoneBreakdown[zone] += item.consumption[monthData] || 0;
      }
    });

    return {
      typeBreakdown: Object.entries(typeBreakdown)
        .map(([type, consumption]) => ({
          name: type,
          value: consumption,
          percentage: (consumption / waterCalculations.A2_total) * 100
        }))
        .sort((a, b) => b.value - a.value),
      zoneBreakdown: Object.entries(zoneBreakdown)
        .map(([zone, consumption]) => ({
          name: zone,
          value: consumption,
          percentage: (consumption / waterCalculations.A2_total) * 100
        }))
        .sort((a, b) => b.value - a.value)
    };
  }, [selectedWaterMonth, waterCalculations.A2_total]);

  if (waterMonthsAvailable.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Droplets size={48} className="text-primary mb-4" />
        <h2 className="text-xl font-semibold text-primary mb-2">Water Data Not Available</h2>
        <p className="text-muted-foreground">
          There seems to be an issue loading the water consumption data. Please check the data source.
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <WaterSubNav />

      {activeWaterSubSection === 'Overview' && <WaterFilterBar />}

      {/* Add padding-top to account for fixed filter bar */}
      <div className={activeWaterSubSection === 'Overview' ? 'pt-24' : ''}>
        {activeWaterSubSection === 'Overview' && (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Water System Hierarchy Levels ({selectedWaterMonth})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <WaterSummaryCard 
                  title="A1 - Main Source (L1)" 
                  value={waterCalculations.A1_totalSupply.toLocaleString(undefined, {maximumFractionDigits:0})} 
                  unit="m³" 
                  icon={Droplets} 
                  trend="Main Bulk (NAMA)" 
                  trendColor="text-blue-600 dark:text-blue-400" 
                  iconBgColor={COLORS.info}
                  isLoading={isLoading}
                />
                <WaterSummaryCard 
                  title="A2 - Primary Distribution" 
                  value={waterCalculations.A2_total.toLocaleString(undefined, {maximumFractionDigits:0})} 
                  unit="m³" 
                  icon={Building} 
                  trend={`L2: ${waterCalculations.L2_total.toLocaleString(undefined, {maximumFractionDigits:0})}m³ (${((waterCalculations.L2_total / waterCalculations.A2_total) * 100).toFixed(1)}%) | DC: ${waterCalculations.DC_total.toLocaleString(undefined, {maximumFractionDigits:0})}m³ (${((waterCalculations.DC_total / waterCalculations.A2_total) * 100).toFixed(1)}%)`}
                  trendColor="text-yellow-600 dark:text-yellow-400" 
                  iconBgColor={COLORS.warning}
                  isLoading={isLoading}
                />
                <WaterSummaryCard 
                  title="A3 - End-User Consumption" 
                  value={waterCalculations.A3_total.toLocaleString(undefined, {maximumFractionDigits:0})} 
                  unit="m³" 
                  icon={Users2} 
                  trend="End-Users + Direct (L3+DC)" 
                  trendColor="text-green-600 dark:text-green-400" 
                  iconBgColor={COLORS.success}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WaterChartWrapper title="Water System Hierarchy Trends" subtitle="A1, A2, A3 flow by month">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyWaterTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}/>
                    <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}/>
                    <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} itemStyle={{color: 'var(--foreground)'}} labelStyle={{color: 'var(--foreground)', fontWeight: 'bold'}}/>
                    <Legend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/>
                    <Line type="monotone" dataKey="A1" stroke={COLORS.info} name="A1 Supply (m³)" strokeWidth={2} dot={{r:3}} activeDot={{r:6}}/>
                    <Line type="monotone" dataKey="A2" stroke={COLORS.warning} name="A2 Distribution (m³)" strokeWidth={2} dot={{r:3}} activeDot={{r:6}}/>
                    <Line type="monotone" dataKey="A3" stroke={COLORS.success} name="A3 Consumption (m³)" strokeWidth={2} dot={{r:3}} activeDot={{r:6}}/>
                  </LineChart>
                </ResponsiveContainer>
              </WaterChartWrapper>

              <WaterChartWrapper title="Top Water Consumers" subtitle={`Highest consumption for ${selectedWaterMonth}`}>
                <div className="overflow-y-auto h-full">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-card z-10">
                      <tr>
                        <th className="text-left p-2 font-semibold text-muted-foreground">#</th>
                        <th className="text-left p-2 font-semibold text-muted-foreground">Consumer</th>
                        <th className="text-right p-2 font-semibold text-muted-foreground">Consumption (m³)</th>
                        <th className="text-right p-2 font-semibold text-muted-foreground">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topWaterConsumers.map((consumer, index) => (
                        <tr key={consumer.name} className="border-t border-border hover:bg-muted/50">
                          <td className="p-2 text-muted-foreground">{index + 1}</td>
                          <td className="p-2 font-medium">{consumer.name}</td>
                          <td className="p-2 text-right">{consumer.consumption.toLocaleString()}</td>
                          <td className="p-2 text-right text-muted-foreground">{consumer.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </WaterChartWrapper>
            </div>
          </>
        )}

        {activeWaterSubSection === 'WaterLoss' && (
          <>
             <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Water Loss Analysis ({selectedWaterMonth})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <WaterSummaryCard 
                  title="Stage 1 Variance" 
                  value={Math.abs(waterCalculations.stage1Loss).toFixed(0)} 
                  unit="m³" 
                  icon={AlertCircle} 
                  trend={waterCalculations.stage1Loss < 0 ? "Gain (Check Meters)" : "Loss (Trunk Main)"} 
                  trendColor={waterCalculations.stage1Loss < 0 ? "text-orange-600 dark:text-orange-400" : "text-red-600 dark:text-red-400"} 
                  iconBgColor={waterCalculations.stage1Loss < 0 ? COLORS.warning : COLORS.error}
                  isLoading={isLoading}
                />
                <WaterSummaryCard 
                  title="Stage 2 Loss" 
                  value={waterCalculations.stage2Loss.toFixed(0)} 
                  unit="m³" 
                  icon={TrendingUp} 
                  trend={`${waterCalculations.stage2LossPercent.toFixed(1)}% (Distribution Network)`} 
                  trendColor="text-orange-600 dark:text-orange-400" 
                  iconBgColor={COLORS.warning}
                  isLoading={isLoading}
                />
                <WaterSummaryCard 
                  title="Total System Variance" 
                  value={Math.abs(waterCalculations.totalLoss).toFixed(0)} 
                  unit="m³" 
                  icon={Combine} 
                  trend={`${Math.abs(waterCalculations.totalLossPercent).toFixed(1)}% Overall`} 
                  trendColor={Math.abs(waterCalculations.totalLossPercent) > 15 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"} 
                  iconBgColor={Math.abs(waterCalculations.totalLossPercent) > 15 ? COLORS.error : COLORS.success}
                  isLoading={isLoading}
                />
              </div>
            </div>
            <WaterChartWrapper title="Water Balance Diagram" subtitle={`Hierarchical flow for ${selectedWaterMonth}`}>
              <div className="space-y-3 p-1 sm:p-2 text-xs sm:text-sm overflow-x-auto">
                <div className="text-center">
                  <div className="inline-block bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300">A1 - Main Supply (L1)</h3>
                    <p className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-200">{waterCalculations.A1_totalSupply.toLocaleString(undefined, {maximumFractionDigits:0})} m³</p>
                  </div>
                </div>
                <div className="text-center">
                    <div className={`text-sm ${waterCalculations.stage1Loss < 0 ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>
                      ↓ <span className="font-semibold">Stage 1:</span> {Math.abs(waterCalculations.stage1Loss).toFixed(0)} m³ ({Math.abs(waterCalculations.stage1LossPercent).toFixed(1)}%)
                      {waterCalculations.stage1Loss < 0 && <span className="text-xs"> (Gain)</span>}
                    </div>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-sky-100 dark:bg-sky-900/30 p-3 rounded-lg border-2 border-sky-300 dark:border-sky-700">
                    <h3 className="font-bold text-sky-800 dark:text-sky-300">A2 - Primary Distribution (L2+DC)</h3>
                    <p className="text-xl sm:text-2xl font-bold text-sky-900 dark:text-sky-200">{waterCalculations.A2_total.toLocaleString(undefined, {maximumFractionDigits:0})} m³</p>
                  </div>
                </div>
                 <div className="text-center">
                    <div className="text-orange-600 dark:text-orange-400 text-sm">
                       ↓ <span className="font-semibold">Stage 2:</span> {waterCalculations.stage2Loss.toFixed(0)} m³ ({waterCalculations.stage2LossPercent.toFixed(1)}%)
                    </div>
                </div>
                <div className="text-center">
                  <div className="inline-block bg-green-100 dark:bg-green-900/30 p-3 rounded-lg border-2 border-green-300 dark:border-green-700">
                    <h3 className="font-bold text-green-800 dark:text-green-300">A3 - End-User Consumption (L3+DC)</h3>
                    <p className="text-xl sm:text-2xl font-bold text-green-900 dark:text-green-200">{waterCalculations.A3_total.toLocaleString(undefined, {maximumFractionDigits:0})} m³</p>
                  </div>
                </div>
              </div>
            </WaterChartWrapper>
          </>
        )}

        {activeWaterSubSection === 'ZoneAnalysis' && (
           <WaterChartWrapper title="Zone Bulk Consumption Analysis" subtitle={`Distribution for ${selectedWaterMonth}`}>
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneConsumptionData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}/>
                  <YAxis dataKey="zone" type="category" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} width={80} />
                  <Tooltip contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}} itemStyle={{color: 'var(--foreground)'}} labelStyle={{color: 'var(--foreground)', fontWeight: 'bold'}}/>
                  <Legend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/>
                  <Bar dataKey="consumption" fill={COLORS.primary} name="Consumption (m³)" barSize={20} radius={[0, 5, 5, 0]}>
                      {zoneConsumptionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                      ))}
                  </Bar>
              </BarChart>
              </ResponsiveContainer>
          </WaterChartWrapper>
        )}

        {activeWaterSubSection === 'Quality' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WaterChartWrapper title="Water Quality Parameters" subtitle="Real-time sensor data (placeholder)">
              <div className="space-y-3 mt-2 overflow-y-auto h-full pr-2">
                {[
                  { parameter: 'pH Level', value: 7.2, unit: '', status: 'normal', range: '6.5-8.5' },
                  { parameter: 'Turbidity', value: 0.8, unit: 'NTU', status: 'good', range: '<1.0' },
                  { parameter: 'Chlorine', value: 0.5, unit: 'mg/L', status: 'normal', range: '0.2-0.6' },
                  { parameter: 'TDS', value: 245, unit: 'mg/L', status: 'normal', range: '<500' },
                  { parameter: 'Temperature', value: 24.5, unit: '°C', status: 'normal', range: '20-30' },
                  { parameter: 'Pressure', value: 2.1, unit: 'bar', status: 'good', range: '1.5-3.0' }
                ].map((param, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-border">
                    <div>
                      <h4 className="font-medium text-foreground">{param.parameter}</h4>
                      <p className="text-xs text-muted-foreground">Range: {param.range}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-bold text-foreground">{param.value} {param.unit}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        param.status === 'good' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        param.status === 'normal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      }`}>
                        {param.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </WaterChartWrapper>

            <WaterChartWrapper title="System Performance Indicators" subtitle="Key operational metrics">
              <div className="space-y-4 mt-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-foreground">System Efficiency</h4>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{waterCalculations.systemEfficiency.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(0, Math.min(waterCalculations.systemEfficiency, 100))}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center border border-blue-200 dark:border-blue-700">
                    <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide">Total Meters</p>
                    <p className="text-xl font-bold text-blue-800 dark:text-blue-200">{waterSystemData.length}</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-center border border-purple-200 dark:border-purple-700">
                    <p className="text-xs text-purple-600 dark:text-purple-400 uppercase tracking-wide">Zone Meters (L2)</p>
                    <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{waterCalculations.zoneBulkMeters.length}</p>
                  </div>
                </div>
              </div>
            </WaterChartWrapper>
          </div>
        )}

        {activeWaterSubSection === 'Overview' && (
          <>
            <WaterChartWrapper title="A2 Distribution by Type" subtitle={`Breakdown for ${selectedWaterMonth}`}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={a2DistributionData.typeBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                  >
                    {a2DistributionData.typeBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} m³`, 'Consumption']}
                    contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </WaterChartWrapper>

            <WaterChartWrapper title="Top Consuming Zones" subtitle={`For ${selectedWaterMonth}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={a2DistributionData.zoneBreakdown.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} m³`, 'Consumption']}
                    contentStyle={{backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', borderColor: 'var(--border)'}}
                  />
                  <Bar dataKey="value" fill={COLORS.warning} name="Consumption (m³)" />
                </BarChart>
              </ResponsiveContainer>
            </WaterChartWrapper>
          </>
        )}
      </div>
    </div>
  );
};

export default WaterAnalysisModule;

    