'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Label as RechartsLabel, Area } from 'recharts';
import { Search, Bell, ChevronDown, SlidersHorizontal, Share2, LayoutDashboard, BarChart2, List, Zap, TrendingUp, Users2, Power, DollarSign, Filter, Activity, Droplets, Combine, UserCheck, Columns, Sparkles, X, CalendarDays, Building, Menu, Moon, Sun, Download, Settings, AlertCircle, CheckCircle, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { UniversalFilterBar, useFilterState } from '@/components/common/FilterBar';

// ===============================
// DESIGN SYSTEM & CONSTANTS
// ===============================

const OMR_PER_KWH = 0.025;

// Primary Color Scheme - Sophisticated Purple-Gray Palette
const COLORS = {
  primary: '#4E4456',        // Main brand color - Deep purple-gray
  primaryLight: '#7E708A',   // Lighter variant for hover states
  primaryDark: '#3B3241',    // Darker variant for active states
  accent: '#6A5ACD',         // Accent purple for highlights
  success: '#10B981',        // Green for positive metrics
  warning: '#F59E0B',        // Amber for warnings
  info: '#3B82F6',          // Blue for information
  error: '#EF4444',         // Red for errors
  
  // Chart colors palette
  chart: ['#6A5ACD', '#FFA07A', '#20B2AA', '#FF69B4', '#9370DB', '#F08080', '#4682B4', '#32CD32', '#FF6347', '#4169E1']
};

// ===============================
// DATA PARSING & UTILITIES
// ===============================

const rawDataString = `SL:no.	Zone	Type 	Muscat Bay Number	Unit Number (Muncipality) 	Electrical Meter Account  No	November-24	December-24	January-25	February-25	March-25	April-25
1	Infrastructure	MC	MC	Pumping Station 01 	R52330	1629	1640	1903	2095	3032	3940
2	Infrastructure	MC	MC	Pumping Station 03	R52329	0	179	32.5	137.2	130.7	276.6
3	Infrastructure	MC	MC	Pumping Station 04 	R52327	919	921	245.1	869.5	646.1	984.9
4	Infrastructure	MC	MC	Pumping Station 05 	R52325	2599	1952	2069	2521	2601	3317
5	Infrastructure	MC	MC	Lifting Station 02	R52328	0	0	0	0	0	0
6	Infrastructure	MC	MC	Lifting Station 03	R52333	91	185	28	40	58	83
7	Infrastructure	MC	MC	Lifting Station 04	R52324	686	631	701	638	572	750.22
8	Infrastructure	MC	MC	Lifting Station 05	R52332	2413	2643	2873	3665	3069	4201.4
9	Infrastructure	MC	MC	Irrigation Tank 01	R52324 (R52326)	1432	1268	1689	2214	1718	1663
10	Infrastructure	MC	MC	Irrigation Tank 02	R52331	974	1026	983	1124	1110	1830
11	Infrastructure	MC	MC	Irrigation Tank 03	R52323	269	417	840	1009	845	1205
12	Infrastructure	MC	MC	Irrigation Tank 04	R53195	212	213	39.7	233.2	234.9	447.2
13	Infrastructure	MC	MC	Actuator DB 01 (Z8)	R53196	34	29	7.3	27.7	24.4	27.1
14	Infrastructure	MC	MC	Actuator DB 02	R51900	232	161	33	134	138.5	211
15	Infrastructure	MC	MC	Actuator DB 03	R51904	220	199	55.7	203.3	196	211.6
16	Infrastructure	MC	MC	Actuator DB 04	R51901	172	173	186	161	227	253
17	Infrastructure	MC	MC	Actuator DB 05	R51907	18	16	4.2	17.8	14	17.7
18	Infrastructure	MC	MC	Actuator DB 06	R51909	49	44	47	45	38	46.9
19	Infrastructure	MC	MC	Street Light FP 01 (Z8)	R53197	3593	3147	787	3228	2663	3230
20	Infrastructure	MC	MC	Street Light FP 02	R51906	2361	2258	633	2298	1812	2153
21	Infrastructure	MC	MC	Street Light FP 03	R51905	2060	1966	1868	1974	1562	1847
22	Infrastructure	MC	MC	Street Light FP 04	R51908	2299	1389	325	1406	1401	2412.9
23	Infrastructure	MC	MC	Street Light FP 05	R51902	1477	1121	449	2069.9	1870.1	3233
24	Infrastructure	MC	MC	Beachwell	R51903	24383	37236	38168	18422	40	27749
25	Infrastructure	MC	MC	Helipad	R52334	0	0	0	0	0	0
26	Central Park	MC	MC	Central Park	R54672	9604	19032	22819	19974	14190	13846
27	Ancilary	Building	MC	Guard House	R53651	1225	814	798	936	879	1467
28	Ancilary	Building	MC	Security Building	R53649	5702	5131	5559	5417	4504	5978
29	Ancilary	Building	MC	ROP Building	R53648	3581	2352	2090	2246	1939	3537
30	Zone 3	SBJ Common Meter	D 44	Apartment	R53705	1377	764	647	657	650	1306
31	Zone 3	SBJ Common Meter	D 45	Apartment	R53665	1252	841	670	556	608	1069
32	Zone 3	SBJ Common Meter	D 46	Apartment	R53700	1577	890	724	690	752	1292
33	Zone 3	SBJ Common Meter	D 47	Apartment	R53690	1774	1055	887	738	792	1545
34	Zone 3	SBJ Common Meter	D 48	Apartment	R53666	1046	785	826	676	683	1092
35	Zone 3	SBJ Common Meter	D 49	Apartment	R53715	1608	1068	860	837	818	984
36	Zone 3	SBJ Common Meter	D 50	Apartment	R53672	1102	789	765	785	707	1331
37	Zone 3	SBJ Common Meter	D 51	Apartment	R53657	1855	710	661	682	642	904
38	Zone 3	SBJ Common Meter	D 52	Apartment	R53699	1986	1208	979	896	952	1651
39	Zone 3	SBJ Common Meter	D53	Apartment	R54782	1764	968	693	732	760	1281
40	Zone 3	SBJ Common Meter	D54	Apartment	R54793	1777	834	681	559	531	1042
41	Zone 3	SBJ Common Meter	D55	Apartment	R54804	1828	1035	677	616	719	1417
42	Zone 3	SBJ Common Meter	D56	Apartment	R54815	1805	937	683	731	765	1536
43	Zone 3	SBJ Common Meter	D57	Apartment	R54826	2262	1332	990	846	795	1732
44	Zone 3	SBJ Common Meter	D58	Apartment	R54836	1534	778	593	535	594	1415
45	Zone 3	SBJ Common Meter	D59	Apartment	R54847	1634	998	628	582	697	1138
46	Zone 3	SBJ Common Meter	D60	Apartment	R54858	1275	705	674	612	679	1069
47	Zone 3	SBJ Common Meter	D61	Apartment	R54869	1734	977	767	800	719	1394
48	Zone 3	SBJ Common Meter	D 62	Apartment	R53717	1630	957	715	677	595	800
49	Zone 3	SBJ Common Meter	D 74	Apartment	R53675	1303	766	639	566	463	1079
50	Zone 3	SBJ Common Meter	D 75	Apartment	R53668	1169	702	475	508	554	912
51		SBJ Common Meter		Village Square	R56628	6229	3695	3304	3335	3383	4415
52	Zone 3	SBJ Common Meter	FP-17	Zone-3 landscape light	R54872	0	0	0	0	0	0
53	Zone 3	SBJ Common Meter	FP-21	Zone-3 landscape light	R54873	40	48	12.9	56.6	46.5	55
54	Zone 3	SBJ Common Meter	FP-22	Zone-3 landscape light	R54874	6	8	0	0	0	0
55		SBJ Common Meter		Bank muscat	MISSING_METER	148	72	59	98	88	163
56		SBJ Common Meter		CIF kitchen	MISSING_METER	16742	15554	16788	16154	14971	18446`.trim();

const extractCategory = (unitName: string | undefined | null): string => {
    if (!unitName) return 'Other';
    const lowerUnitName = unitName.toLowerCase();
    if (lowerUnitName.includes('pumping station')) return 'Pumping Station';
    if (lowerUnitName.includes('lifting station')) return 'Lifting Station';
    if (lowerUnitName.includes('street light')) return 'Street Light';
    if (lowerUnitName.includes('irrigation tank')) return 'Irrigation Tank';
    if (lowerUnitName.includes('actuator db')) return 'Actuator DB';
    if (lowerUnitName.includes('apartment')) return 'Apartment';
    if (lowerUnitName.includes('guard house') || lowerUnitName.includes('security building') || lowerUnitName.includes('rop building')) return 'Ancillary Building';
    if (lowerUnitName.includes('central park')) return 'Central Park';
    if (lowerUnitName.includes('village square')) return 'Village Square';
    if (lowerUnitName.includes('bank muscat')) return 'Commercial (Bank)';
    if (lowerUnitName.includes('cif kitchen')) return 'Commercial (Kitchen)';
    if (lowerUnitName.includes('landscape light')) return 'Landscape Light';
    if (lowerUnitName.includes('beachwell')) return 'Beachwell';
    if (lowerUnitName.includes('helipad')) return 'Helipad';
    return 'Other';
};

const parseData = (rawData: string) => {
  const lines = rawData.split('\n');
  const headerLine = lines[0].split('\t').map(h => h.trim());
  const dataLines = lines.slice(1);
  const monthsHeader = headerLine.slice(6);

  return dataLines.map((line, index) => {
    const values = line.split('\t');
    const unitName = values[4]?.trim() || 'N/A';
    const entry = {
      id: parseInt(values[0], 10) || index + 1,
      slNo: parseInt(values[0], 10) || index + 1,
      zone: values[1]?.trim() || 'N/A',
      type: values[2]?.trim() || 'N/A',
      muscatBayNumber: values[3]?.trim() || 'N/A',
      unitName: unitName,
      category: extractCategory(unitName),
      meterAccountNo: values[5]?.trim() || 'N/A',
      consumption: {} as Record<string, number>,
      totalConsumption: 0, 
    };
    let currentOverallTotal = 0;
    monthsHeader.forEach((month, i) => {
      const consumptionValue = parseFloat(values[6 + i]);
      entry.consumption[month] = isNaN(consumptionValue) ? 0 : consumptionValue;
      if (!isNaN(consumptionValue)) {
        currentOverallTotal += consumptionValue;
      }
    });
    entry.totalConsumption = parseFloat(currentOverallTotal.toFixed(2));
    return entry;
  });
};

const initialElectricityData = parseData(rawDataString);
const availableMonths = initialElectricityData.length > 0 && initialElectricityData[0].consumption ? Object.keys(initialElectricityData[0].consumption) : [];


// ===============================
// SHARED COMPONENTS
// ===============================

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number }>;
  unit?: string;
  trend?: string;
  trendColor?: string;
  iconBgColor?: string;
  isLoading?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, unit, trend, trendColor, iconBgColor, isLoading }) => {
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

interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, children, subtitle, actions }) => (
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

const LoadingSpinner = ({ size = 24 }: { size?: number }) => (
  <div className="flex justify-center items-center">
    <div 
      className="animate-spin rounded-full border-4 border-slate-200 border-t-purple-600 dark:border-slate-700" 
      style={{
        width: size,
        height: size,
      }}
    ></div>
  </div>
);

// ===============================
// Electricity System Module
// ===============================
const ElectricitySystemModule: React.FC = () => {
  const [activeSubSection, setActiveSubSection] = useState<string>('Dashboard');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isClientDarkMode, setIsClientDarkMode] = useState<boolean>(false);

  // Filter state management using the new hook
  const { filters, updateFilter, resetFilters } = useFilterState({
    month: "All Months",
    category: "All Categories"
  });

  useEffect(() => {
    setIsClientDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const distinctCategories = useMemo(() => 
    [...new Set(initialElectricityData.map(d => d.category))].sort(), 
  []);
  
  const filteredElectricityData = useMemo(() => {
    return initialElectricityData.filter(item => {
      const categoryMatch = filters.category === "All Categories" || item.category === filters.category;
      return categoryMatch; 
    });
  }, [filters.category]);

  const kpiAndTableData = useMemo(() => {
    if (filters.month === "All Months") {
        return filteredElectricityData.map(item => ({ ...item, }));
    }
    return filteredElectricityData.map(item => ({ ...item, totalConsumption: item.consumption[filters.month] || 0, }));
  }, [filteredElectricityData, filters.month]);

  const totalConsumptionKWh = useMemo(() => kpiAndTableData.reduce((acc, curr) => acc + curr.totalConsumption, 0), [kpiAndTableData]);
  const totalCostOMR = useMemo(() => totalConsumptionKWh * OMR_PER_KWH, [totalConsumptionKWh]);
  const averageConsumptionPerUnit = useMemo(() => kpiAndTableData.length > 0 ? totalConsumptionKWh / kpiAndTableData.length : 0, [totalConsumptionKWh, kpiAndTableData]);
  const activeMeters = useMemo(() => kpiAndTableData.filter(d => d.meterAccountNo !== 'N/A' && d.meterAccountNo !== 'MISSING_METER' && d.totalConsumption > 0).length, [kpiAndTableData]);

  const monthlyTrendForAllMonths = useMemo(() => {
    return availableMonths.map(month => {
      const total = filteredElectricityData.reduce((acc, curr) => acc + (curr.consumption[month] || 0), 0);
      return { name: month.replace('-24', '').replace('-25', ''), total: parseFloat(total.toFixed(2)) };
    });
  }, [filteredElectricityData]);

  const consumptionByTypeChartData = useMemo(() => {
    const dataToUse = kpiAndTableData; 
    const typeData: Record<string, number> = {};
    dataToUse.forEach(d => { typeData[d.type] = (typeData[d.type] || 0) + d.totalConsumption; });
    return Object.entries(typeData).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) })).filter(item => item.value > 0).sort((a,b) => b.value - a.value);
  }, [kpiAndTableData]);

  // Filter configuration for the universal filter bar
  const filterConfig = [
    {
      id: 'monthFilter',
      label: 'Filter by Month',
      value: filters.month,
      onChange: (value: string) => updateFilter('month', value),
      options: [
        { value: "All Months", label: "All Months" },
        ...availableMonths.map(m => ({ value: m, label: m }))
      ],
      icon: CalendarDays
    },
    {
      id: 'categoryFilter',
      label: 'Filter by Unit Category',
      value: filters.category,
      onChange: (value: string) => updateFilter('category', value),
      options: [
        { value: "All Categories", label: "All Categories" },
        ...distinctCategories.map(c => ({ value: c, label: c }))
      ],
      icon: List
    }
  ];

  const handleAiAnalysis = async (): Promise<void> => {
    setIsAiModalOpen(true);
    setIsAiLoading(true);
    setAiAnalysisResult("");
    
    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysisResult(`AI Analysis Results for ${filters.month === "All Months" ? "All Months" : filters.month}:

• Beachwell shows significant consumption variation across months - from 40 kWh in March to 38,168 kWh in January, indicating potential equipment cycling or seasonal demand.

• Central Park consumption peaks at 22,819 kWh in January, suggesting higher lighting/irrigation needs during winter months.

• CIF Kitchen maintains consistently high consumption (14,971-18,446 kWh), indicating steady operational demand.

• Several Pumping Stations show increasing trend from November to April, particularly PS01 (1,629 to 3,940 kWh).

• Apartment units in Zone 3 show relatively stable consumption patterns, ranging 500-2,000 kWh monthly.

Recommendations:
• Investigate Beachwell's consumption patterns for potential optimization
• Monitor Central Park seasonal variations for efficiency improvements
• Consider load balancing strategies for high-consuming infrastructure units`);
      setIsAiLoading(false);
    }, 2000);
  };

  const ElectricitySubNav = () => {
    const subSections = [
        { name: 'Dashboard', id: 'Dashboard', icon: LayoutDashboard },
        { name: 'Performance', id: 'Performance', icon: TrendingUp },
        { name: 'Analytics', id: 'Analytics', icon: BarChart2 },
        { name: 'Unit Details', id: 'UnitDetails', icon: List },
    ];
    
    return (
        <div className="mb-6 print:hidden flex justify-center">
            <div className="bg-white shadow-md rounded-full p-1.5 inline-flex space-x-1 border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                {subSections.map((tab) => {
                    const isActive = activeSubSection === tab.id;
                    return ( 
                      <button 
                        key={tab.id} 
                        onClick={() => setActiveSubSection(tab.id)} 
                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-105`} 
                        style={{ 
                            backgroundColor: isActive ? COLORS.primary : 'transparent', 
                            color: isActive ? 'white' : (isClientDarkMode ? COLORS.primaryLight : COLORS.primaryDark), 
                        }} 
                        onMouseOver={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = COLORS.primaryLight; e.currentTarget.style.color = 'white';} }} 
                        onMouseOut={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = (isClientDarkMode ? COLORS.primaryLight : COLORS.primaryDark);}}}
                      > 
                        <tab.icon size={18} style={{ color: isActive ? 'white' : COLORS.primary }}/> 
                        <span>{tab.name}</span> 
                      </button> 
                    );
                })}
            </div>
        </div>
    );
  };

  return (
    <div className="space-y-6">
      <ElectricitySubNav />
      
      {/* Universal Filter Bar - shown on all sections */}
      <UniversalFilterBar
        filters={filterConfig}
        onResetFilters={resetFilters}
        title="Electricity Analysis Filters"
        sticky={true}
      />
      
      <div className="space-y-6">
        {activeSubSection === 'Dashboard' && (
          <>
            <div className="mb-6"> 
              <button 
                onClick={handleAiAnalysis} 
                className="flex items-center justify-center space-x-2 text-white py-2.5 px-5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all w-full sm:w-auto" 
                style={{ backgroundColor: COLORS.primary }} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.primaryDark} 
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.primary} 
                disabled={isAiLoading}
              > 
                <Sparkles size={18} /> 
                <span>{isAiLoading ? 'Analyzing...' : '✨ Analyze Consumption with AI'}</span> 
              </button> 
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard title="Total Consumption" value={totalConsumptionKWh.toLocaleString(undefined, {maximumFractionDigits:0})} unit="kWh" icon={Zap} trend={filters.month === "All Months" ? "Overall" : `For ${filters.month}`} trendColor={"text-slate-500 font-medium dark:text-slate-400"} iconBgColor={COLORS.primary} />
              <SummaryCard title="Total Est. Cost" value={totalCostOMR.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} unit="OMR" icon={DollarSign} trend="Based on selection" trendColor="text-slate-500 font-medium dark:text-slate-400" iconBgColor={COLORS.success} />
              <SummaryCard title="Avg. Consumption/Unit" value={averageConsumptionPerUnit.toLocaleString(undefined, {maximumFractionDigits:0})} unit="kWh" icon={BarChart2} trend={filters.month === "All Months" ? "Overall" : `For ${filters.month}`} trendColor={"text-slate-500 font-medium dark:text-slate-400"} iconBgColor={COLORS.warning} />
              <SummaryCard title="Active Meters" value={activeMeters} unit="units" icon={Users2} trend="In selection" trendColor="text-slate-500 font-medium dark:text-slate-400" iconBgColor={COLORS.info} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3"> 
                <ChartWrapper title="Consumption Trend (All Months)" subtitle={`For category: ${filters.category}`}> 
                  <ResponsiveContainer width="100%" height="100%"> 
                    <LineChart data={monthlyTrendForAllMonths} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}> 
                      <defs> 
                        <linearGradient id="colorTotalElectricity" x1="0" y1="0" x2="0" y2="1"> 
                          <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/> 
                          <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/> 
                        </linearGradient> 
                      </defs> 
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /> 
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} /> 
                      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} /> 
                      <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} itemStyle={{color: '#334155'}} labelStyle={{color: '#0f172a', fontWeight: 'bold'}}/> 
                      <Legend wrapperStyle={{fontSize: "12px", paddingTop: '10px'}}/> 
                      <Area type="monotone" dataKey="total" stroke={COLORS.primary} fillOpacity={1} fill="url(#colorTotalElectricity)" /> 
                      <Line type="monotone" dataKey="total" stroke={COLORS.primary} strokeWidth={3} activeDot={{ r: 7, strokeWidth: 2, fill: COLORS.primary }} dot={{r:4, fill: COLORS.primary}} name="Total kWh" /> 
                    </LineChart> 
                  </ResponsiveContainer> 
                </ChartWrapper> 
              </div>
              <div className="lg:col-span-2"> 
                <ChartWrapper title="Consumption by Type" subtitle={`For ${filters.month}`}> 
                  <ResponsiveContainer width="100%" height="100%"> 
                    <PieChart> 
                      <Pie data={consumptionByTypeChartData} dataKey="value" nameKey="name" cx="50%" cy="45%" innerRadius={60} outerRadius={90} fill="#8884d8" paddingAngle={2} cornerRadius={5}> 
                        {consumptionByTypeChartData.map((entry, index) => ( 
                          <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} className="focus:outline-none hover:opacity-80 transition-opacity" stroke="none"/> 
                        ))} 
                        <RechartsLabel value={`${consumptionByTypeChartData.reduce((sum, item) => sum + item.value, 0).toLocaleString(undefined, {maximumFractionDigits:0})}`} position="centerBottom" dy={-5} className="text-2xl font-bold fill-slate-700 dark:fill-slate-200"/> 
                        <RechartsLabel value="Total kWh" position="centerTop" dy={10} className="text-xs fill-slate-500 dark:fill-slate-400"/> 
                      </Pie> 
                      <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} itemStyle={{color: '#334155'}} labelStyle={{color: '#0f172a', fontWeight: 'bold'}}/> 
                      <Legend verticalAlign="bottom" wrapperStyle={{paddingTop: '15px'}}/> 
                    </PieChart> 
                  </ResponsiveContainer> 
                </ChartWrapper> 
              </div>
            </div>
          </>
        )}

        {activeSubSection === 'Performance' && (
          <>
            {/* Performance KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryCard title="Efficiency Rate" value="84.2" unit="%" icon={TrendingUp} trend="+2.1% vs last month" trendColor="text-green-600" iconBgColor={COLORS.success} />
              <SummaryCard title="Peak Demand" value={Math.max(...filteredElectricityData.flatMap(d => availableMonths.map(m => d.consumption[m] || 0))).toLocaleString()} unit="kWh" icon={Activity} trend="Highest single reading" trendColor="text-blue-600" iconBgColor={COLORS.info} />
              <SummaryCard title="Load Factor" value="72.5" unit="%" icon={BarChart2} trend="Above industry avg" trendColor="text-green-600" iconBgColor={COLORS.warning} />
              <SummaryCard title="Cost per kWh" value={OMR_PER_KWH.toFixed(3)} unit="OMR" icon={DollarSign} trend="Fixed rate" trendColor="text-slate-500" iconBgColor={COLORS.primary} />
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartWrapper title="Monthly Performance Comparison" subtitle="Efficiency metrics over time">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrendForAllMonths} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} />
                    <Legend />
                    <Bar dataKey="total" fill={COLORS.primary} name="Total Consumption (kWh)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <ChartWrapper title="Top 10 Consumers" subtitle="Highest consumption units">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredElectricityData.sort((a,b) => b.totalConsumption - a.totalConsumption).slice(0,10).map(d => ({name: d.unitName.length > 15 ? d.unitName.substring(0,15) + '...' : d.unitName, value: d.totalConsumption}))} layout="horizontal" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={100} />
                    <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} />
                    <Bar dataKey="value" fill={COLORS.accent} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>

            {/* Performance Insights */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">High Performers</h4>
                  <p className="text-sm text-green-700">Actuator DBs show consistent, efficient consumption patterns with minimal variance.</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Attention Required</h4>
                  <p className="text-sm text-yellow-700">Beachwell consumption shows high volatility requiring investigation.</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Optimization Potential</h4>
                  <p className="text-sm text-blue-700">Street lighting systems could benefit from smart scheduling controls.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSubSection === 'Analytics' && (
          <>
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChartWrapper title="Consumption Pattern Analysis" subtitle="Seasonal trends and anomalies">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrendForAllMonths} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} />
                      <Area type="monotone" dataKey="total" stroke={COLORS.accent} fillOpacity={1} fill="url(#analyticsGradient)" />
                      <Line type="monotone" dataKey="total" stroke={COLORS.accent} strokeWidth={3} dot={{r:4, fill: COLORS.accent}} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Anomaly Detection</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-red-800">High Variance</span>
                      </div>
                      <span className="text-xs text-red-600">Beachwell</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-800">Trend Change</span>
                      </div>
                      <span className="text-xs text-yellow-600">PS01</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-800">Normal</span>
                      </div>
                      <span className="text-xs text-green-600">Apartments</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Predictive Insights</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium text-slate-700 dark:text-slate-200">Next Month Forecast</p>
                      <p className="text-2xl font-bold text-blue-600">{Math.round(totalConsumptionKWh * 1.08).toLocaleString()} kWh</p>
                      <p className="text-xs text-slate-500">+8% projected increase</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-slate-700 dark:text-slate-200">Cost Projection</p>
                      <p className="text-xl font-bold text-green-600">{(totalConsumptionKWh * 1.08 * OMR_PER_KWH).toLocaleString(undefined, {minimumFractionDigits:2})} OMR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartWrapper title="Category Efficiency Comparison" subtitle="Average consumption by unit type">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distinctCategories.map(cat => ({
                    category: cat,
                    avgConsumption: filteredElectricityData.filter(d => d.category === cat).reduce((sum, d) => sum + d.totalConsumption, 0) / filteredElectricityData.filter(d => d.category === cat).length
                  })).filter(d => d.avgConsumption > 0)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} angle={-45} textAnchor="end" height={100} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} />
                    <Bar dataKey="avgConsumption" fill={COLORS.info} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <ChartWrapper title="Load Distribution" subtitle="Peak vs off-peak patterns">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={[
                        { name: 'Infrastructure', value: filteredElectricityData.filter(d => d.zone === 'Infrastructure').reduce((sum, d) => sum + d.totalConsumption, 0) },
                        { name: 'Residential', value: filteredElectricityData.filter(d => d.zone === 'Zone 3').reduce((sum, d) => sum + d.totalConsumption, 0) },
                        { name: 'Commercial', value: filteredElectricityData.filter(d => d.category.includes('Commercial')).reduce((sum, d) => sum + d.totalConsumption, 0) },
                        { name: 'Others', value: filteredElectricityData.filter(d => !['Infrastructure', 'Zone 3'].includes(d.zone) && !d.category.includes('Commercial')).reduce((sum, d) => sum + d.totalConsumption, 0) }
                      ].filter(d => d.value > 0)}
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80} 
                      fill="#8884d8"
                    >
                      {[
                        { name: 'Infrastructure', value: filteredElectricityData.filter(d => d.zone === 'Infrastructure').reduce((sum, d) => sum + d.totalConsumption, 0) },
                        { name: 'Residential', value: filteredElectricityData.filter(d => d.zone === 'Zone 3').reduce((sum, d) => sum + d.totalConsumption, 0) },
                        { name: 'Commercial', value: filteredElectricityData.filter(d => d.category.includes('Commercial')).reduce((sum, d) => sum + d.totalConsumption, 0) },
                        { name: 'Others', value: filteredElectricityData.filter(d => !['Infrastructure', 'Zone 3'].includes(d.zone) && !d.category.includes('Commercial')).reduce((sum, d) => sum + d.totalConsumption, 0) }
                      ].filter(d => d.value > 0).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </div>
          </>
        )}

        {activeSubSection === 'UnitDetails' && (
          <>
            {/* Unit Details Table */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Unit Details & Consumption Breakdown
                </h2>
                <p className="text-sm text-slate-500 mt-1">Detailed consumption data for all metered units</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-700">
                    <tr>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-200 text-sm">Unit</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-200 text-sm">Zone</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-200 text-sm">Category</th>
                      <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-200 text-sm">Meter No.</th>
                      <th className="text-right p-4 font-medium text-slate-700 dark:text-slate-200 text-sm">Total (kWh)</th>
                      <th className="text-right p-4 font-medium text-slate-700 dark:text-slate-200 text-sm">Cost (OMR)</th>
                      <th className="text-center p-4 font-medium text-slate-700 dark:text-slate-200 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                    {kpiAndTableData.slice(0, 20).map((unit) => (
                      <tr key={unit.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">{unit.unitName}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{unit.type}</p>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{unit.zone}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {unit.category}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-mono text-slate-600 dark:text-slate-400">{unit.meterAccountNo}</td>
                        <td className="p-4 text-right text-sm font-medium text-slate-900 dark:text-slate-100">
                          {unit.totalConsumption.toLocaleString(undefined, {maximumFractionDigits:1})}
                        </td>
                        <td className="p-4 text-right text-sm font-medium text-slate-900 dark:text-slate-100">
                          {(unit.totalConsumption * OMR_PER_KWH).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
                        </td>
                        <td className="p-4 text-center">
                          {unit.totalConsumption > 0 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                              <WifiOff className="w-3 h-3 mr-1" />
                              Inactive
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>Showing {Math.min(20, kpiAndTableData.length)} of {kpiAndTableData.length} units</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">View All Units</button>
                </div>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartWrapper title="Monthly Consumption Breakdown" subtitle="Individual unit consumption patterns">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={availableMonths.map(month => ({
                    month: month.replace('-24', '').replace('-25', ''),
                    ...kpiAndTableData.slice(0,5).reduce((acc, unit) => ({
                      ...acc,
                      [unit.unitName.substring(0,10)]: unit.consumption[month] || 0
                    }), {})
                  }))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{backgroundColor: 'white', borderRadius: '8px', borderColor: '#e2e8f0'}} />
                    <Legend />
                    {kpiAndTableData.slice(0,5).map((unit, index) => (
                      <Line 
                        key={unit.id}
                        type="monotone" 
                        dataKey={unit.unitName.substring(0,10)}
                        stroke={COLORS.chart[index % COLORS.chart.length]} 
                        strokeWidth={2}
                        dot={{r:3}}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartWrapper>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Unit Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Total Units</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{kpiAndTableData.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Active Meters</span>
                      <span className="font-medium text-green-600">{activeMeters}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Inactive Meters</span>
                      <span className="font-medium text-gray-600">{kpiAndTableData.length - activeMeters}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Missing Meters</span>
                      <span className="font-medium text-red-600">{kpiAndTableData.filter(d => d.meterAccountNo === 'MISSING_METER').length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Download className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Export Unit Data</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <Settings className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Meter Configuration</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print:hidden"> 
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto dark:bg-slate-800"> 
            <div className="flex justify-between items-center mb-4"> 
              <h3 className="text-xl font-semibold" style={{color: COLORS.primary}}>✨ AI Consumption Analysis</h3> 
              <button onClick={() => setIsAiModalOpen(false)} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"> 
                <X size={20} className="text-slate-600 dark:text-slate-300"/> 
              </button> 
            </div> 
            {isAiLoading ? ( 
              <div className="text-center py-8"> 
                <Sparkles size={48} className="mx-auto animate-pulse" style={{color: COLORS.primaryLight}} /> 
                <p className="mt-2 text-slate-600 dark:text-slate-400">AI is analyzing data, please wait...</p> 
              </div> 
            ) : ( 
              <div className="text-sm text-slate-700 space-y-3 whitespace-pre-wrap dark:text-slate-300"> 
                {aiAnalysisResult ? ( 
                  aiAnalysisResult.split('\n').map((line, index) => ( 
                    <p key={index}>{line.startsWith('* ') || line.startsWith('- ') ? `• ${line.substring(2)}` : line}</p> 
                  )) 
                ) : ( 
                  <p>No analysis available or an error occurred.</p> 
                )} 
              </div> 
            )} 
            <div className="mt-6 text-right"> 
              <button 
                onClick={() => setIsAiModalOpen(false)} 
                className="text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors" 
                style={{ backgroundColor: COLORS.primary }} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.primaryDark} 
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}
              > 
                Close 
              </button> 
            </div> 
          </div> 
        </div> 
      )}
    </div>
  );
};


export default function ElectricityAnalysisPage() {
  return <ElectricitySystemModule />;
}
