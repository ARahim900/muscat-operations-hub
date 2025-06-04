# 🏢 Muscat Bay Operations Hub

A modern, comprehensive web application for monitoring and managing operational data at Muscat Bay. Built with Next.js, TypeScript, and Tailwind CSS.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)

## 🚀 **DEPLOYMENT FIXES APPLIED**

### ✅ Fixed Issues:
1. **Netlify Configuration**: Added `netlify.toml` with proper Next.js static export settings
2. **Tailwind CSS**: Fixed custom color classes with safelist to ensure `text-muscat-bay-primary` and related classes are generated
3. **Next.js Config**: Updated for static export compatibility with Netlify
4. **Build Process**: Removed error ignoring to catch real TypeScript/ESLint issues
5. **Environment Variables**: Added `.env.example` template

### 🛠️ **Quick Deployment Guide:**

1. **In Netlify Dashboard:**
   - Build command: `npm run build`
   - Publish directory: `out` (for static export)
   - Node version: `18`

2. **Environment Variables** (if needed):
   - Copy `.env.example` to `.env.local`
   - Set any required values in Netlify environment variables

3. **Manual Deploy Test:**
   ```bash
   npm install
   npm run build
   ```

## 🎯 Features

- **Electricity Analysis**: Comprehensive monitoring of electrical consumption across all zones
- **Water Management**: Advanced water distribution tracking and loss analysis  
- **STP Plant Monitoring**: Real-time sewage treatment plant performance analytics
- **Contractor Tracking**: Complete project and contractor management system
- **Modern UI**: Professional, responsive design with Muscat Bay branding

## 🏗️ Architecture

```
src/
├── app/                 # Next.js App Router
│   ├── (app)/          # Main application routes
│   │   ├── dashboard/   # Operations dashboard
│   │   ├── electricity-analysis/
│   │   ├── water-analysis/
│   │   ├── stp-plant/
│   │   └── contractor-tracker/
│   ├── globals.css     # Global styles & CSS variables
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── layout/        # Layout components
│   └── common/        # Shared components
└── lib/               # Utilities and configuration
    ├── utils.ts       # Utility functions
    ├── types/         # TypeScript type definitions
    └── data/          # Data processing utilities
```

## 🎨 Design System

### Brand Colors
- **Primary**: `#4E4456` (Deep purple-gray)
- **Accent**: `#A8D5E3` (Soft teal)
- **Supporting**: `#BFA181` (Muted gold), `#0A1828` (Navy)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

## 📊 Data Modules

### 1. Electricity Analysis
- Real-time consumption monitoring
- Zone-based analysis and comparison
- Cost calculations (OMR per kWh)
- AI-powered consumption pattern analysis
- Interactive charts and visualizations

### 2. Water Analysis  
- Hierarchical water distribution tracking (A1→A2→A3 levels)
- Water loss analysis and efficiency metrics
- Zone consumption breakdowns
- Quality parameter monitoring

### 3. STP Plant Monitoring
- Daily treatment performance tracking
- Capacity utilization vs design specifications (750 m³/day)
- Efficiency metrics and process optimization
- Tanker vs direct sewage input analysis

### 4. Contractor Management
- Active project tracking
- Contract lifecycle management
- Performance metrics and completion rates
- Budget utilization monitoring

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/ARahim900/muscat-operations-hub.git

# Install dependencies
cd muscat-operations-hub
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
```

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Configure any required environment variables
3. Restart the development server

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Use the following build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18`

### Manual Deployment
```bash
npm run build
# Deploy the 'out' directory to your hosting provider
```

## 🛡️ Security Features
- Content Security Policy headers
- XSS Protection
- Frame Options security
- Input sanitization
- Environment variable protection

## 🔄 Data Updates
The application uses static data for demonstration purposes. In production:
- Connect to real-time APIs
- Implement database integration
- Add authentication and authorization
- Set up automated data synchronization

## 📈 Performance
- Optimized static export for fast loading
- Image optimization with Next.js
- CSS optimization with Tailwind
- Component lazy loading
- Responsive design for all devices

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
This project is proprietary to Muscat Bay and not for public distribution.

## 🆘 Troubleshooting

### Common Issues:

1. **Build Errors**: 
   - Check TypeScript errors: `npm run typecheck`
   - Run ESLint: `npm run lint`

2. **Missing Custom Classes**:
   - Verify Tailwind config includes safelist
   - Check CSS class names match configuration

3. **Deployment Failures**:
   - Ensure `netlify.toml` is present
   - Verify build command and publish directory
   - Check environment variables

4. **Styling Issues**:
   - Confirm CSS variables are defined in `globals.css`
   - Verify custom color usage matches Tailwind config

### Support
For technical support, contact the development team or create an issue in the repository.

---

**Muscat Bay Operations Hub** - *Modern Operations Management Made Simple*
