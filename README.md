# 🏗️ Muscat Bay Operations Hub

A comprehensive **modern SAAS-style operations management system** for Muscat Bay's utilities and infrastructure. Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Recharts** for advanced data visualization and analytics.

![Muscat Bay Operations](./IMG_3418.jpeg)

## 🌟 Features

### 📊 **Comprehensive Analytics Modules**
- **⚡ Electricity Analysis** - Power consumption tracking, cost analysis, and efficiency monitoring
- **💧 Water Management** - Hierarchical water distribution analysis with loss detection
- **🏭 STP Plant Operations** - Sewage treatment performance and capacity utilization
- **👥 Contractor Tracking** - Contract management, expiry alerts, and performance monitoring
- **🤖 AI-Powered Analytics** - Automated insights and anomaly detection

### 🎨 **Modern Design System**
- **Muscat Bay Brand Colors** - Professional purple-gray palette (#4E4456)
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Charts** - Advanced visualizations with Recharts
- **Component Library** - Reusable UI components with Radix UI

### 🛠️ **Technical Excellence**
- **Next.js 15** with Turbopack for ultra-fast development
- **TypeScript** for type safety and better developer experience
- **Real Data Integration** - Actual operational data from Muscat Bay
- **Firebase Integration** - Cloud-based data storage and authentication
- **AI/ML Capabilities** - GenKit integration for intelligent insights

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ARahim900/muscat-operations-hub.git
cd muscat-operations-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:9002`

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run genkit:dev   # Start GenKit AI development
npm run genkit:watch # Start GenKit with watch mode
```

## 📁 Project Structure

```
src/
├── app/                      # Next.js 15 App Router
│   ├── (app)/               # Route group for main application
│   │   ├── dashboard/       # Main dashboard
│   │   ├── electricity-analysis/  # Power consumption module
│   │   ├── water-analysis/  # Water management module
│   │   ├── stp-plant/       # STP operations module
│   │   ├── contractor-tracker/    # Contract management
│   │   └── anomaly-detection/     # AI anomaly detection
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
│
├── components/              # Reusable UI components
│   ├── common/             # Shared components (SummaryCard, ChartWrapper, etc.)
│   ├── layout/             # Layout components (Sidebar, Header)
│   ├── ui/                 # Base UI primitives (Radix UI)
│   └── demo/               # Demo components
│
├── lib/                    # Core utilities and configuration
│   ├── types/              # TypeScript type definitions
│   ├── constants/          # Application constants and configuration
│   ├── utils/              # Utility functions and helpers
│   └── data/               # Data stores and parsers
│       ├── index.ts        # Main data store with raw operational data
│       └── contractors.ts  # Enhanced contractor data with analytics
│
├── hooks/                  # Custom React hooks
├── ai/                     # AI/ML integration (GenKit)
└── ...
```

## 🎯 Modules Overview

### ⚡ Electricity Analysis
- **Real-time consumption tracking** for 56 electrical meters
- **Cost analysis** with OMR 0.025/kWh rate
- **Category-wise breakdown** (Pumping Stations, Street Lights, Apartments, etc.)
- **Trend analysis** and AI-powered insights
- **Interactive filtering** by month, category, and unit

### 💧 Water Analysis  
- **Hierarchical water system monitoring** (A1→A2→A3 levels)
- **Loss detection** between distribution stages
- **28 water meters** across zones and meter types
- **Efficiency calculations** and variance analysis
- **Quality metrics** and pressure monitoring

### 🏭 STP Plant Operations
- **Daily treatment performance** tracking
- **Capacity utilization** against 750 m³/day design capacity
- **TSE production** for irrigation reuse
- **Tanker vs. direct sewage** input analysis
- **Treatment efficiency** monitoring (target >90%)

### 👥 Contractor Tracking
- **17 active contractors** with comprehensive data
- **Contract expiry alerts** and renewal tracking
- **Financial analysis** - Total yearly value: ~450,000 OMR
- **Service categorization** and performance metrics
- **Status management** (Active, Expired, Pending, Suspended)

## 💡 Key Features

### 🔥 **Advanced Analytics**
- **AI-powered insights** with automated recommendations
- **Trend analysis** and predictive analytics
- **Performance benchmarking** against targets
- **Anomaly detection** for early issue identification

### 📱 **Responsive Design** 
- **Mobile-optimized** interface
- **Progressive Web App** capabilities
- **Offline support** for critical data
- **Touch-friendly** interactions

### 🎨 **Professional UI/UX**
- **Muscat Bay branding** throughout
- **Consistent design system** 
- **Intuitive navigation** with breadcrumbs
- **Loading states** and error handling

### 🔒 **Enterprise Ready**
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **Firebase** integration for scalability
- **Production-optimized** builds

## 🛠️ Development

### Code Structure Guidelines

#### **TypeScript Types**
All types are defined in `src/lib/types/index.ts`:
```typescript
import { ElectricityConsumption, WaterSystemData, STPPlantData } from '@/lib/types';
```

#### **Constants & Configuration**
Centralized in `src/lib/constants/index.ts`:
```typescript
import { MUSCAT_BAY_COLORS, PLANT_SPECIFICATIONS } from '@/lib/constants';
```

#### **Utility Functions**
Helper functions in `src/lib/utils/index.ts`:
```typescript
import { utils } from '@/lib/utils';
const parsedData = utils.parseElectricityData(rawData);
```

#### **Shared Components**
Reusable UI components in `src/components/common/index.tsx`:
```typescript
import { SummaryCard, ChartWrapper, StatusBadge } from '@/components/common';
```

### Adding New Modules

1. Create route in `src/app/(app)/your-module/`
2. Add types to `src/lib/types/index.ts`
3. Add constants to `src/lib/constants/index.ts`
4. Create data parser in `src/lib/utils/index.ts`
5. Add navigation entry to constants
6. Implement UI using shared components

## 📊 Data Sources

### Real Operational Data
- **Electricity consumption** - 6 months of actual meter readings
- **Water distribution** - 22 months of hierarchical flow data  
- **STP performance** - Daily treatment data from July 2024-May 2025
- **Contractor information** - Complete contract database with financials

### Data Processing
- **Automatic parsing** from CSV/raw formats
- **Type-safe** data structures
- **Real-time calculations** for KPIs and analytics
- **Caching** for performance optimization

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

## 📝 License

This project is proprietary software for **Muscat Bay Operations**. All rights reserved.

## 🆘 Support

For support and questions:
- **Repository Issues**: [GitHub Issues](https://github.com/ARahim900/muscat-operations-hub/issues)
- **Documentation**: See `/docs` folder for detailed guides
- **Email**: Contact the development team

---

**Built with ❤️ for Muscat Bay Operations Team**

*Modern Operations Management • Real-time Analytics • AI-Powered Insights*
